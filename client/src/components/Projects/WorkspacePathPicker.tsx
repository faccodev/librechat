import { Label, SelectDropDown, Spinner } from '@librechat/client';
import { useAvailableProjectWorkspaces } from '~/data-provider';
import { useLocalize } from '~/hooks';

type WorkspacePathPickerProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
};

export default function WorkspacePathPicker({
  value,
  onChange,
  disabled,
}: WorkspacePathPickerProps) {
  const localize = useLocalize();
  const { data, isLoading } = useAvailableProjectWorkspaces();

  const workspaces = data?.workspaces ?? [];

  const options = [
    { value: '', label: `— ${localize('com_ui_project_workspace_path_clear')} —` },
    ...workspaces.map((w) => ({
      value: w.path,
      label: w.path,
    })),
  ];

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue || null);
  };

  const selectedValue = options.find((opt) => opt.value === value) || { value: '', label: '' };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-text-primary">
          {localize('com_ui_project_workspace_path')}
        </Label>
        {isLoading && <Spinner className="size-4" />}
      </div>

      {isLoading ? (
        <div className="text-sm text-text-secondary">
          {localize('com_ui_project_workspace_path_loading')}
        </div>
      ) : workspaces.length === 0 ? (
        <div className="text-sm text-text-secondary italic">
          {localize('com_ui_project_workspace_path_none')}
        </div>
      ) : (
        <SelectDropDown
          value={selectedValue}
          setValue={handleSelect}
          availableValues={options}
          disabled={disabled}
          placeholder={localize('com_ui_project_workspace_path_placeholder')}
          containerClassName="w-full"
        />
      )}

      <p className="text-xs text-text-secondary">
        {localize('com_ui_project_workspace_path_help')}
      </p>
    </div>
  );
}
