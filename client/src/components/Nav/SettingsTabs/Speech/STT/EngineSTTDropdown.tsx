import React from 'react';
import { useRecoilState } from 'recoil';
import { Dropdown } from '@librechat/client';
import { useLocalize } from '~/hooks';
import store from '~/store';

interface EngineSTTDropdownProps {
  external: boolean;
  /**
   * When true, the operator has configured `speech.stt.fasterWhisper`
   * in librechat.yaml (self-hosted faster-whisper server). The
   * dropdown exposes a "Faster Whisper (servidor)" option that
   * routes the audio to that endpoint instead of the browser
   * WebSpeech API. This replaces the older "External" generic
   * option (which was a catch-all for any operator-defined STT).
   */
  fasterWhisper?: boolean;
}

const EngineSTTDropdown: React.FC<EngineSTTDropdownProps> = ({
  external,
  fasterWhisper = false,
}) => {
  const localize = useLocalize();
  const [engineSTT, setEngineSTT] = useRecoilState<string>(store.engineSTT);

  /**
   * Build the option list. Order matters for the UI:
   * 1) Browser — always first (free fallback, no infra).
   * 2) Faster Whisper (servidor) — when configured, replaces
   *    the older "External" generic option, since faster-whisper
   *    IS the only server-side STT we currently support.
   * 3) External — shown only when the operator configured
   *    legacy STT providers (openai / azureOpenAI) without
   *    fasterWhisper, so operators who haven't migrated yet
   *    keep their working setup.
   */
  const endpointOptions: Array<{ value: string; label: string }> = [
    { value: 'browser', label: localize('com_nav_browser') },
  ];
  if (fasterWhisper) {
    endpointOptions.push({
      value: 'fasterWhisper',
      label: localize('com_nav_engine_faster_whisper'),
    });
  } else if (external) {
    endpointOptions.push({ value: 'external', label: localize('com_nav_external') });
  }

  const handleSelect = (value: string) => {
    setEngineSTT(value);
  };

  const labelId = 'engine-stt-dropdown-label';

  return (
    <div className="flex items-center justify-between">
      <div id={labelId}>{localize('com_nav_engine')}</div>
      <Dropdown
        value={engineSTT}
        onChange={handleSelect}
        options={endpointOptions}
        sizeClasses="w-[180px]"
        testId="EngineSTTDropdown"
        className="z-50"
        aria-labelledby={labelId}
      />
    </div>
  );
};

export default EngineSTTDropdown;
