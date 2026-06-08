import { useEffect, useRef, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useToastContext } from '@librechat/client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useGetCustomConfigSpeechQuery } from 'librechat-data-provider/react-query';
import useGetAudioSettings from './useGetAudioSettings';
import { useLocalize } from '~/hooks';
import store from '~/store';

const useSpeechToTextBrowser = (
  setText: (text: string) => void,
  onTranscriptionComplete: (text: string) => void,
) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { speechToTextEndpoint } = useGetAudioSettings();
  const isBrowserSTTEnabled = speechToTextEndpoint === 'browser';
  const { data: speechConfig } = useGetCustomConfigSpeechQuery({ enabled: true });
  const sttExternal = Boolean(speechConfig?.sttExternal);

  const lastTranscript = useRef<string | null>(null);
  const lastInterim = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>();
  const [autoSendText] = useRecoilState(store.autoSendText);
  const [languageSTT] = useRecoilState<string>(store.languageSTT);
  const [autoTranscribeAudio] = useRecoilState<boolean>(store.autoTranscribeAudio);

  const {
    listening,
    finalTranscript,
    resetTranscript,
    interimTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const isListening = useMemo(() => listening, [listening]);

  useEffect(() => {
    if (interimTranscript == null || interimTranscript === '') {
      return;
    }

    if (lastInterim.current === interimTranscript) {
      return;
    }

    setText(interimTranscript);
    lastInterim.current = interimTranscript;
  }, [setText, interimTranscript]);

  useEffect(() => {
    if (finalTranscript == null || finalTranscript === '') {
      return;
    }

    if (lastTranscript.current === finalTranscript) {
      return;
    }

    setText(finalTranscript);
    lastTranscript.current = finalTranscript;
    if (autoSendText > -1 && finalTranscript.length > 0) {
      timeoutRef.current = setTimeout(() => {
        onTranscriptionComplete(finalTranscript);
        resetTranscript();
      }, autoSendText * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [setText, onTranscriptionComplete, resetTranscript, finalTranscript, autoSendText]);

  const toggleListening = () => {
    console.log('[STT Browser] toggleListening called. isListening:', isListening);
    if (!browserSupportsSpeechRecognition) {
      console.warn('[STT Browser] Browser does not support SpeechRecognition');
      showToast({
        message: sttExternal
          ? localize('com_ui_speech_not_supported_use_external')
          : localize('com_ui_speech_not_supported'),
        status: 'error',
      });
      return;
    }

    if (!isMicrophoneAvailable) {
      console.warn('[STT Browser] Microphone is not available');
      showToast({
        message: localize('com_ui_microphone_unavailable'),
        status: 'error',
      });
      return;
    }

    const recognition = (SpeechRecognition as any).default || SpeechRecognition;
    if (isListening === true) {
      console.log('[STT Browser] Stopping listening...');
      recognition.stopListening();
    } else {
      console.log('[STT Browser] Starting listening with language:', languageSTT, 'continuous:', autoTranscribeAudio);
      recognition.startListening({
        language: languageSTT,
        continuous: autoTranscribeAudio,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.code === 'KeyL' && !isBrowserSTTEnabled) {
        toggleListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cancelRecording = () => {
    console.log('[STT Browser] cancelRecording called.');
    const recognition = (SpeechRecognition as any).default || SpeechRecognition;
    recognition.stopListening();
    resetTranscript();
    setText('');
  };

  return {
    isListening,
    isLoading: false,
    startRecording: toggleListening,
    stopRecording: toggleListening,
    cancelRecording,
  };
};

export default useSpeechToTextBrowser;
