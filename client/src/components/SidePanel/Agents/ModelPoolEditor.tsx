import React, { useCallback, useMemo } from 'react';
import { useFieldArray, useWatch, useFormContext, Controller } from 'react-hook-form';
import { Plus, Trash2, Info } from 'lucide-react';
import { ControlCombobox } from '@librechat/client';
import { EModelEndpoint, type OptionWithIcon } from 'librechat-data-provider';
import { useGetEndpointsQuery } from '~/data-provider';
import { useAgentPanelContext } from '~/Providers';
import { useLocalize } from '~/hooks';
import type { AgentForm } from '~/common';

type PoolEntry = { provider: string; model: string };

/**
 * Round-robin model pool editor.
 *
 * Sits directly below the singular "Model" picker in the agent
 * editor. Lets the operator add/remove (provider, model) pairs;
 * each pair is a candidate the runtime picks from on every
 * request via an atomic counter (see
 * `packages/api/src/agents/pool.ts`).
 *
 * The singular `provider`/`model` fields remain the fallback when
 * the pool is empty, so this is purely additive — existing agents
 * with no pool keep their current behavior.
 *
 * The list is rendered as a vertical stack of (provider, model)
 * combos. Each row has a delete button; a footer "+ Adicionar"
 * button appends a new entry pre-seeded with the singular
 * `provider` so a user with a working model can replicate it as
 * a pool entry in one click.
 */
const ModelPoolEditor: React.FC = () => {
  const localize = useLocalize();
  const { control, setValue } = useFormContext<AgentForm>();
  const { fields, append, remove } = useFieldArray<AgentForm, 'models'>({
    control,
    name: 'models',
  });

  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { agentsConfig } = useAgentPanelContext();

  // Singular provider/model — used as the seed for new pool entries
  // and as the list of available models for the provider dropdown.
  const singularProvider = useWatch({ control, name: 'provider' });
  const singularModel = useWatch({ control, name: 'model' });

  const providerOptions: OptionWithIcon[] = useMemo(() => {
    if (!endpointsConfig) return [];
    return Object.entries(endpointsConfig)
      .filter(([key, value]) => key !== EModelEndpoint.agents && value?.type)
      .map(([key, value]) => ({
        value: key,
        label: (value as { title?: string; name?: string }).title
          || (value as { name?: string }).name
          || key,
        icon: (value as { iconURL?: string }).iconURL,
      }));
  }, [endpointsConfig]);

  const singularProviderValue = useMemo(() => {
    if (typeof singularProvider === 'string') return singularProvider;
    return (singularProvider as { value?: string } | undefined)?.value ?? '';
  }, [singularProvider]);

  const modelsForProvider = useCallback(
    (provider: string): OptionWithIcon[] => {
      if (!provider) return [];
      // Prefer the agent's effective model list (filtered by ACL),
      // fall back to the endpoint-level list when no config exists.
      const agentModelList = (agentsConfig as Record<string, string[]> | undefined)?.[provider];
      let names: string[] = [];
      if (agentModelList && agentModelList.length > 0) {
        names = agentModelList;
      } else {
        const endpointList = (endpointsConfig as Record<string, { models?: string[] }> | undefined)?.[
          provider
        ]?.models;
        names = Array.isArray(endpointList) ? endpointList : [];
      }
      return names.map((m) => ({ value: m, label: m }));
    },
    [agentsConfig, endpointsConfig],
  );

  const handleAdd = useCallback(() => {
    const seed: PoolEntry = {
      provider: singularProviderValue || '',
      model: singularModel || '',
    };
    append(seed);
  }, [append, singularProviderValue, singularModel]);

  const addDisabled = !singularProviderValue && fields.length === 0;

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-1.5">
        <label className="block text-sm font-medium text-token-text-primary">
          {localize('com_ui_model_pool_label')}
        </label>
        <span
          title={localize('com_ui_model_pool_hint')}
          className="text-text-secondary"
          aria-label={localize('com_ui_model_pool_hint')}
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      {fields.length === 0 ? (
        <p className="mb-2 text-xs text-text-secondary">
          {localize('com_ui_model_pool_empty')}
        </p>
      ) : (
        <ul className="mb-2 flex flex-col gap-2">
          {fields.map((field, index) => (
            <PoolRow
              key={field.id}
              index={index}
              control={control}
              setValue={setValue}
              onRemove={() => remove(index)}
              providerOptions={providerOptions}
              modelsForProvider={modelsForProvider}
            />
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={addDisabled}
        className="btn btn-neutral border-token-border-light relative h-8 w-full rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="mr-1 inline-block h-3.5 w-3.5" aria-hidden="true" />
        {localize('com_ui_model_pool_add')}
      </button>
    </div>
  );
};

interface PoolRowProps {
  index: number;
  control: ReturnType<typeof useFormContext<AgentForm>>['control'];
  setValue: ReturnType<typeof useFormContext<AgentForm>>['setValue'];
  onRemove: () => void;
  providerOptions: OptionWithIcon[];
  modelsForProvider: (provider: string) => OptionWithIcon[];
}

const PoolRow: React.FC<PoolRowProps> = ({
  index,
  control,
  setValue,
  onRemove,
  providerOptions,
  modelsForProvider,
}) => {
  const localize = useLocalize();
  const providerPath = `models.${index}.provider` as const;
  const modelPath = `models.${index}.model` as const;
  const rowProvider = useWatch({ control, name: providerPath });
  const rowModel = useWatch({ control, name: modelPath });

  const rowProviderValue = useMemo(() => {
    if (typeof rowProvider === 'string') return rowProvider;
    return (rowProvider as { value?: string } | undefined)?.value ?? '';
  }, [rowProvider]);

  const rowModelValue = typeof rowModel === 'string' ? rowModel : '';

  const modelOptions = useMemo(
    () => modelsForProvider(rowProviderValue),
    [modelsForProvider, rowProviderValue],
  );

  const handleProviderChange = useCallback(
    (next: string) => {
      setValue(providerPath, next);
      // Clear the model when the provider changes so the dropdown
      // doesn't silently carry a model name that the new provider
      // doesn't actually have. The next open of the combobox
      // will show the right model list.
      setValue(modelPath, '');
    },
    [setValue, providerPath, modelPath],
  );

  return (
    <li className="flex items-center gap-2 rounded-md border border-border-light bg-surface-secondary p-2">
      <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
        <Controller
          control={control}
          name={providerPath}
          render={({ field }) => (
            <ControlCombobox
              selectedValue={rowProviderValue}
              setValue={(v) => {
                field.onChange(v);
                handleProviderChange(v);
              }}
              items={providerOptions}
              ariaLabel={localize('com_ui_provider')}
              selectPlaceholder={localize('com_ui_select_provider')}
              isCollapsed={false}
              showCarat
            />
          )}
        />
        <Controller
          control={control}
          name={modelPath}
          render={({ field }) => (
            <ControlCombobox
              selectedValue={rowModelValue}
              setValue={(v) => {
                field.onChange(v);
                setValue(modelPath, v);
              }}
              items={modelOptions}
              ariaLabel={localize('com_ui_model')}
              selectPlaceholder={localize('com_ui_select_model')}
              isCollapsed={false}
              showCarat
            />
          )}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={localize('com_ui_delete')}
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </li>
  );
};

export default ModelPoolEditor;
