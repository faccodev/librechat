import useSpeechToTextBrowser from './useSpeechToTextBrowser';
import useSpeechToTextExternal from './useSpeechToTextExternal';
import useGetAudioSettings from './useGetAudioSettings';

const useSpeechToText = (
  setText: (text: string) => void,
  onTranscriptionComplete: (text: string) => void,
): {
  isLoading?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  isProcessing?: boolean;
  stopRecording: () => void | (() => Promise<void>);
  startRecording: () => void | (() => Promise<void>);
  cancelRecording: () => void;
} => {
  const { speechToTextEndpoint } = useGetAudioSettings();
  /**
   * Server-side STT — any engine that's not the browser-native
   * WebSpeech API. `external` was the legacy catch-all (openai /
   * azureOpenAI, dispatched server-side); `fasterWhisper` is the new
   * self-hosted option. Both go through the same recording pipeline
   * (MediaRecorder → POST /api/stt), so the same hook handles both
   * — the server's `STTService` already picks the right provider
   * from the operator's librechat.yaml. This keeps the client tiny
   * (one recording path) while letting the dropdown offer the
   * operator-named option to the user.
   */
  const externalSpeechToText =
    speechToTextEndpoint === 'external' || speechToTextEndpoint === 'fasterWhisper';

  const {
    isListening: speechIsListeningBrowser,
    isLoading: speechIsLoadingBrowser,
    startRecording: startSpeechRecordingBrowser,
    stopRecording: stopSpeechRecordingBrowser,
    cancelRecording: cancelSpeechRecordingBrowser,
  } = useSpeechToTextBrowser(setText, onTranscriptionComplete);

  const {
    isListening: speechIsListeningExternal,
    isLoading: speechIsLoadingExternal,
    isProcessing: speechIsProcessingExternal,
    externalStartRecording: startSpeechRecordingExternal,
    externalStopRecording: stopSpeechRecordingExternal,
    cancelRecording: cancelSpeechRecordingExternal,
    isSpeaking: speechIsSpeakingExternal,
  } = useSpeechToTextExternal(setText, onTranscriptionComplete);

  const isListening = externalSpeechToText ? speechIsListeningExternal : speechIsListeningBrowser;
  const isLoading = externalSpeechToText ? speechIsLoadingExternal : speechIsLoadingBrowser;
  const isSpeaking = externalSpeechToText ? speechIsSpeakingExternal : true;
  const isProcessing = externalSpeechToText ? speechIsProcessingExternal : false;

  const startRecording = externalSpeechToText
    ? startSpeechRecordingExternal
    : startSpeechRecordingBrowser;
  const stopRecording = externalSpeechToText
    ? stopSpeechRecordingExternal
    : stopSpeechRecordingBrowser;
  const cancelRecording = externalSpeechToText
    ? cancelSpeechRecordingExternal
    : cancelSpeechRecordingBrowser;

  return {
    isLoading,
    isListening,
    isSpeaking,
    isProcessing,
    stopRecording,
    startRecording,
    cancelRecording,
  };
};

export default useSpeechToText;
