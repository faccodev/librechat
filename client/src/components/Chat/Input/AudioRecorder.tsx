import { memo, useCallback, useRef, useState, useEffect } from 'react';
import { Trash2, Check } from 'lucide-react';
import { useToastContext, TooltipAnchor, ListeningIcon, Spinner } from '@librechat/client';
import { useLocalize, useSpeechToText, useGetAudioSettings } from '~/hooks';
import { useChatFormContext } from '~/Providers';
import { globalAudioId } from '~/common';
import { cn } from '~/utils';

const isExternalSTT = (speechToTextEndpoint: string) =>
  speechToTextEndpoint === 'external' || speechToTextEndpoint === 'fasterWhisper';

const barHeights = [4, 8, 14, 20, 28, 36, 28, 20, 14, 8, 4, 8, 14, 20, 28, 36, 28, 20, 14, 8, 4];

export default memo(function AudioRecorder({
  disabled,
  ask,
  methods,
  textAreaRef,
  isSubmitting,
}: {
  disabled: boolean;
  ask: (data: { text: string }) => void;
  methods: ReturnType<typeof useChatFormContext>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  isSubmitting: boolean;
}) {
  const { setValue, reset, getValues } = methods;
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { speechToTextEndpoint } = useGetAudioSettings();

  const existingTextRef = useRef<string>('');
  const isSubmittingRef = useRef(isSubmitting);
  isSubmittingRef.current = isSubmitting;

  const [seconds, setSeconds] = useState(0);

  const onTranscriptionComplete = useCallback(
    (text: string) => {
      if (isSubmittingRef.current) {
        showToast({
          message: localize('com_ui_speech_while_submitting'),
          status: 'error',
        });
        return;
      }
      if (text) {
        const globalAudio = document.getElementById(globalAudioId) as HTMLAudioElement | null;
        if (globalAudio) {
          console.log('Unmuting global audio');
          globalAudio.muted = false;
        }
        /** For external STT, append existing text to the transcription */
        const finalText =
          isExternalSTT(speechToTextEndpoint) && existingTextRef.current
            ? `${existingTextRef.current} ${text}`
            : text;
        ask({ text: finalText });
        reset({ text: '' });
        existingTextRef.current = '';
      }
    },
    [ask, reset, showToast, localize, speechToTextEndpoint],
  );

  const setText = useCallback(
    (text: string) => {
      let newText = text;
      if (isExternalSTT(speechToTextEndpoint)) {
        /** For external STT, the text comes as a complete transcription, so append to existing */
        newText = existingTextRef.current ? `${existingTextRef.current} ${text}` : text;
      } else {
        /** For browser STT, the transcript is cumulative, so we only need to prepend the existing text once */
        newText = existingTextRef.current ? `${existingTextRef.current} ${text}` : text;
      }
      setValue('text', newText, {
        shouldValidate: true,
      });
    },
    [setValue, speechToTextEndpoint],
  );

  const {
    isListening,
    isLoading,
    isSpeaking,
    isProcessing,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useSpeechToText(setText, onTranscriptionComplete);

  // Manage timer when recording is active
  useEffect(() => {
    if (!isListening) {
      setSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isListening]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!textAreaRef.current) {
    return null;
  }

  const handleStartRecording = async () => {
    existingTextRef.current = getValues('text') || '';
    startRecording();
  };

  const handleStopRecording = async () => {
    stopRecording();
    /** For browser STT, clear the reference since text was already being updated */
    if (!isExternalSTT(speechToTextEndpoint)) {
      existingTextRef.current = '';
    }
  };

  const handleCancelRecording = async () => {
    cancelRecording();
    existingTextRef.current = '';
  };

  const renderIcon = () => {
    if (isLoading === true) {
      return <Spinner className="stroke-text-secondary" />;
    }
    return <ListeningIcon className="stroke-text-secondary" />;
  };

  if (isListening === true || isProcessing === true) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-between rounded-t-3xl border border-border-light bg-surface-chat px-4 py-2 shadow-md transition-all duration-200 sm:rounded-3xl sm:px-6">
        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes bounce-bar {
            0%, 100% { transform: scaleY(0.25); }
            50% { transform: scaleY(1.25); }
          }
          .pulse-indicator {
            animation: pulse-dot 1.5s ease-in-out infinite;
          }
          .waveform-bar {
            animation: bounce-bar 0.8s ease-in-out infinite;
            transform-origin: center;
          }
        `}</style>

        {isProcessing === true ? (
          <div className="flex w-full items-center justify-center gap-3 py-2 text-brand-purple">
            <Spinner className="size-5" />
            <span className="text-sm font-semibold text-text-primary">
              {localize('com_ui_transcribing') || 'Transcribing...'}
            </span>
          </div>
        ) : (
          <>
            {/* Left: Timer and pulsing indicator */}
            <div className="flex items-center gap-2">
              <div className="pulse-indicator size-2.5 rounded-full bg-brand-purple" />
              <span className="text-sm font-medium tabular-nums text-text-primary">
                {formatTime(seconds)}
              </span>
            </div>

            {/* Center: Animated Waveform */}
            <div className="flex max-w-[200px] flex-1 items-center justify-center gap-1.5 overflow-hidden px-4 sm:max-w-md">
              {barHeights.map((height, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-1 rounded-full bg-brand-purple transition-all duration-300',
                    isSpeaking === true && 'waveform-bar',
                  )}
                  style={{
                    height: `${height}px`,
                    animationDelay: `${i * 0.045}s`,
                    animationDuration: '0.9s',
                    transform: isSpeaking === true ? undefined : 'scaleY(0.25)',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3">
              {/* Cancel button */}
              <button
                type="button"
                onClick={handleCancelRecording}
                aria-label={localize('com_ui_cancel')}
                className="flex size-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-hover hover:text-red-500"
                title={localize('com_ui_cancel')}
              >
                <Trash2 className="size-5" />
              </button>

              {/* Stop and Send/Transcribe button */}
              <button
                type="button"
                onClick={handleStopRecording}
                aria-label={localize('com_ui_stop')}
                className="flex size-9 items-center justify-center rounded-full bg-brand-purple text-white shadow-sm transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                title={localize('com_ui_stop')}
              >
                <Check className="size-5 stroke-[2.5]" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <TooltipAnchor
      description={localize('com_ui_use_micrphone')}
      render={
        <button
          id="audio-recorder"
          type="button"
          aria-label={localize('com_ui_use_micrphone')}
          onClick={handleStartRecording}
          disabled={disabled}
          className={cn(
            'flex size-9 items-center justify-center rounded-full p-1 transition-colors hover:bg-surface-hover',
          )}
          title={localize('com_ui_use_micrphone')}
          aria-pressed={false}
        >
          {renderIcon()}
        </button>
      }
    />
  );
});
