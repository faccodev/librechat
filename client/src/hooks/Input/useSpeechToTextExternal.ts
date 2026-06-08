import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useToastContext } from '@librechat/client';
import { useSpeechToTextMutation } from '~/data-provider';
import useGetAudioSettings from './useGetAudioSettings';
import store from '~/store';

const useSpeechToTextExternal = (
  setText: (text: string) => void,
  onTranscriptionComplete: (text: string) => void,
) => {
  const { showToast } = useToastContext();
  const { speechToTextEndpoint } = useGetAudioSettings();
  const isExternalSTTEnabled = speechToTextEndpoint === 'external';
  const audioStream = useRef<MediaStream | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);
  const [permission, setPermission] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRequestBeingMade, setIsRequestBeingMade] = useState(false);
  const [audioMimeType, setAudioMimeType] = useState<string>(() => getBestSupportedMimeType());
  const volumeIntervalRef = useRef<number | null>(null);

  const [minDecibels] = useRecoilState(store.decibelValue);
  const [autoSendText] = useRecoilState(store.autoSendText);
  const [languageSTT] = useRecoilState<string>(store.languageSTT);
  const [speechToText] = useRecoilState<boolean>(store.speechToText);
  const [autoTranscribeAudio] = useRecoilState<boolean>(store.autoTranscribeAudio);

  const { mutate: processAudio, isLoading: isProcessing } = useSpeechToTextMutation({
    onSuccess: (data) => {
      const extractedText = data.text;
      setText(extractedText);
      setIsRequestBeingMade(false);

      if (autoSendText > -1 && speechToText && extractedText.length > 0) {
        setTimeout(() => {
          onTranscriptionComplete(extractedText);
        }, autoSendText * 1000);
      }
    },
    onError: () => {
      showToast({
        message: 'An error occurred while processing the audio, maybe the audio was too short',
        status: 'error',
      });
      setIsRequestBeingMade(false);
    },
  });

  function getBestSupportedMimeType() {
    const types = [
      'audio/webm',
      'audio/webm;codecs=opus',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/wav',
    ];

    for (const type of types) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
        return 'audio/mp4';
      } else if (ua.indexOf('firefox') !== -1) {
        return 'audio/ogg';
      }
    }

    return 'audio/webm';
  }

  const getFileExtension = (mimeType: string) => {
    if (mimeType.includes('mp4')) {
      return 'm4a';
    } else if (mimeType.includes('ogg')) {
      return 'ogg';
    } else if (mimeType.includes('wav')) {
      return 'wav';
    } else {
      return 'webm';
    }
  };

  const cleanup = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
  };

  const getMicrophonePermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const msg = 'Microphone access is not supported in this browser or requires a secure context (HTTPS/localhost).';
      console.error(`[STT] ${msg}`);
      showToast({
        message: msg,
        status: 'error',
      });
      setPermission(false);
      return;
    }
    try {
      console.log('[STT] Requesting microphone permission...');
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      console.log('[STT] Microphone permission granted successfully.');
      setPermission(true);
      audioStream.current = streamData ?? null;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('[STT] Failed to get microphone permission:', err);
      showToast({
        message: `Microphone permission denied: ${errMsg}`,
        status: 'error',
      });
      setPermission(false);
    }
  };

  const isCancelledRef = useRef(false);

  const handleStop = () => {
    if (isCancelledRef.current) {
      console.log('[STT] Discarding audio because recording was cancelled.');
      audioChunksRef.current = [];
      isCancelledRef.current = false;
      cleanup();
      return;
    }

    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: audioMimeType });
      const fileExtension = getFileExtension(audioMimeType);

      audioChunksRef.current = [];

      const formData = new FormData();
      formData.append('audio', audioBlob, `audio.${fileExtension}`);
      if (languageSTT) {
        formData.append('language', languageSTT);
      }
      setIsRequestBeingMade(true);
      cleanup();
      processAudio(formData);
    } else {
      showToast({ message: 'The audio was too short', status: 'warning' });
    }
  };

  const monitorSilence = (stream: MediaStream, stopRecording: () => void) => {
    const audioContext = new AudioContext();
    const audioStreamSource = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = minDecibels;
    audioStreamSource.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const domainData = new Uint8Array(bufferLength);
    let lastSoundTime = Date.now();

    const detectSound = () => {
      analyser.getByteFrequencyData(domainData);
      const isSoundDetected = domainData.some((value) => value > 0);

      if (isSoundDetected) {
        lastSoundTime = Date.now();
      }

      const timeSinceLastSound = Date.now() - lastSoundTime;
      const isOverSilenceThreshold = timeSinceLastSound > 3000;

      if (isOverSilenceThreshold) {
        stopRecording();
        return;
      }

      animationFrameIdRef.current = window.requestAnimationFrame(detectSound);
    };

    animationFrameIdRef.current = window.requestAnimationFrame(detectSound);
  };

  const startRecording = async () => {
    console.log('[STT] startRecording called, isRequestBeingMade:', isRequestBeingMade);
    if (isRequestBeingMade) {
      showToast({ message: 'A request is already being made. Please wait.', status: 'warning' });
      return;
    }

    setIsStarting(true);
    try {
      if (!audioStream.current) {
        await getMicrophonePermission();
      }

      console.log('[STT] audioStream:', audioStream.current);
      if (audioStream.current) {
        audioChunksRef.current = [];
        const bestMimeType = getBestSupportedMimeType();
        setAudioMimeType(bestMimeType);

        console.log('[STT] Creating MediaRecorder with MIME type:', bestMimeType);
        mediaRecorderRef.current = new MediaRecorder(audioStream.current, {
          mimeType: bestMimeType,
        });
        mediaRecorderRef.current.addEventListener('dataavailable', (event: BlobEvent) => {
          audioChunksRef.current.push(event.data);
        });
        mediaRecorderRef.current.addEventListener('stop', handleStop);
        mediaRecorderRef.current.start(100);
        
        // Setup volume/speaking detector
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;
            const source = audioContext.createMediaStreamSource(audioStream.current);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const checkVolume = () => {
              if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
                return;
              }
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
              }
              const average = sum / bufferLength;
              setIsSpeaking(average > 10); // low threshold to detect voice activity
              
              volumeIntervalRef.current = requestAnimationFrame(checkVolume);
            };
            
            checkVolume();
          }
        } catch (err) {
          console.error('[STT] Error setting up volume detector:', err);
        }
        
        if (!audioContextRef.current && autoTranscribeAudio && speechToText) {
          console.log('[STT] Starting silence monitor...');
          monitorSilence(audioStream.current, stopRecording);
        }
        setIsListening(true);
        console.log('[STT] Recording started successfully.');
      } else {
        console.warn('[STT] Recording failed to start: No audio stream available.');
      }
    } catch (error) {
      console.error('[STT] Error starting MediaRecorder:', error);
      showToast({ message: `Error starting recording: ${error}`, status: 'error' });
    } finally {
      setIsStarting(false);
    }
  };

  const stopRecording = () => {
    console.log('[STT] stopRecording called.');
    
    if (volumeIntervalRef.current !== null) {
      cancelAnimationFrame(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    
    setIsSpeaking(false);
    
    if (!mediaRecorderRef.current) {
      console.warn('[STT] MediaRecorder ref is null, nothing to stop.');
      return;
    }

    if (mediaRecorderRef.current.state === 'recording') {
      console.log('[STT] Stopping MediaRecorder...');
      mediaRecorderRef.current.stop();

      audioStream.current?.getTracks().forEach((track) => {
        console.log('[STT] Stopping audio track:', track.label);
        track.stop();
      });
      audioStream.current = null;

      if (animationFrameIdRef.current !== null) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      setIsListening(false);
    } else {
      console.warn('[STT] MediaRecorder state is not recording:', mediaRecorderRef.current.state);
      showToast({ message: 'MediaRecorder is not recording', status: 'error' });
    }
  };

  const cancelRecording = () => {
    console.log('[STT] cancelRecording called.');
    isCancelledRef.current = true;
    stopRecording();
  };

  const externalStartRecording = () => {
    if (isListening) {
      showToast({ message: 'Already listening. Please stop recording first.', status: 'warning' });
      return;
    }

    startRecording();
  };

  const externalStopRecording = () => {
    if (!isListening) {
      showToast({
        message: 'Not currently recording. Please start recording first.',
        status: 'warning',
      });
      return;
    }

    stopRecording();
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.shiftKey && e.altKey && e.code === 'KeyL' && isExternalSTTEnabled) {
      if (!window.MediaRecorder) {
        showToast({ message: 'MediaRecorder is not supported in this browser', status: 'error' });
        return;
      }

      if (permission === false) {
        await getMicrophonePermission();
      }

      if (isListening) {
        stopRecording();
      } else {
        startRecording();
      }

      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  return {
    isListening,
    isSpeaking,
    isProcessing,
    externalStopRecording,
    externalStartRecording,
    cancelRecording,
    isLoading: isProcessing || isStarting,
  };
};

export default useSpeechToTextExternal;
