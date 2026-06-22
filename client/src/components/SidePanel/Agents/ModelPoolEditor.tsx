import React, { useCallback, useMemo, useState } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { Info, Search, X } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
} from '@librechat/client';
import { EModelEndpoint, type OptionWithIcon } from 'librechat-data-provider';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { useGetEndpointsQuery } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { icons } from '~/hooks/Endpoint/Icons';
import type { AgentForm } from '~/common';
import { defaultTextProps, removeFocusOutlines } from '~/utils';
/**
 * Round-robin model pool editor.
 *
 * Sits directly below the singular "Model" picker in the agent
 * editor. Lets the operator manage (provider, model) pairs via
 * an accordion of providers and checkboxes for their models.
 */
const ModelPoolEditor: React.FC = () => {
  const localize = useLocalize();
  const { control, setValue } = useFormContext<AgentForm>();

  const [searchQuery, setSearchQuery] = useState('');

  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { data: modelsConfig } = useGetModelsQuery();

  const rawModels = useWatch({ control, name: 'models' });
  const models = useMemo(() => rawModels || [], [rawModels]);

  const providerOptions: OptionWithIcon[] = useMemo(() => {
    if (!endpointsConfig) {
      return [];
    }
    return Object.entries(endpointsConfig)
      .filter(([key, value]) => key !== EModelEndpoint.agents && value?.type)
      .map(([key, value]) => {
        const endpoint = value as { title?: string; name?: string; iconURL?: string };
        const IconComp =
          (icons as Record<string, React.ComponentType<{ className?: string }>>)[key] ??
          (icons as Record<string, React.ComponentType<{ className?: string }>>).unknown;
        let iconNode: React.ReactNode = null;
        if (IconComp) {
          iconNode = <IconComp className="h-4 w-4" />;
        } else if (endpoint.iconURL) {
          iconNode = (
            <img src={endpoint.iconURL} alt="" className="h-4 w-4 rounded-sm object-contain" />
          );
        }
        return {
          value: key,
          label: endpoint.title || endpoint.name || key,
          icon: iconNode,
        };
      });
  }, [endpointsConfig]);

  const modelsForProvider = useCallback(
    (provider: string): OptionWithIcon[] => {
      if (!provider) {
        return [];
      }
      const names = (modelsConfig?.[provider] ?? []) as string[];
      if (names.length > 0) {
        return names.map((m) => ({ value: m, label: m }));
      }

      const endpointList = (endpointsConfig as Record<string, { models?: string[] }> | undefined)?.[
        provider
      ]?.models;
      return Array.isArray(endpointList) ? endpointList.map((m) => ({ value: m, label: m })) : [];
    },
    [modelsConfig, endpointsConfig],
  );

  const modelsForProviderWithLegacy = useCallback(
    (provider: string): OptionWithIcon[] => {
      const catalog = modelsForProvider(provider);
      const legacy = models
        .filter((entry) => entry.provider === provider)
        .map((entry) => entry.model)
        .filter((modelName) => !catalog.some((c) => c.value === modelName));

      const legacyOptions = legacy.map((m) => ({
        value: m,
        label: `${m} (${localize('com_ui_legacy') || 'legacy'})`,
      }));

      return [...catalog, ...legacyOptions];
    },
    [modelsForProvider, models, localize],
  );

  const filteredProviders = useMemo(() => {
    return providerOptions.filter((provider) => {
      const allModels = modelsForProviderWithLegacy(provider.value);
      const matchingModels = allModels.filter((m) =>
        m.value.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const matchesProvider = provider.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesProvider || matchingModels.length > 0;
    });
  }, [providerOptions, modelsForProviderWithLegacy, searchQuery]);

  const handleToggle = useCallback(
    (provider: string, model: string, checked: boolean) => {
      if (checked) {
        if (!models.some((entry) => entry.provider === provider && entry.model === model)) {
          setValue('models', [...models, { provider, model }], { shouldDirty: true });
        }
      } else {
        setValue(
          'models',
          models.filter((entry) => !(entry.provider === provider && entry.model === model)),
          { shouldDirty: true },
        );
      }
    },
    [models, setValue],
  );

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-1.5">
        <label className="text-token-text-primary block text-sm font-medium">
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

      {/* Selected Models Summary */}
      {models.length > 0 && (
        <div className="mb-4">
          <div className="mb-1.5 text-xs font-semibold text-text-secondary">
            {localize('com_ui_selected_models') || 'Selected models'} ({models.length}):
          </div>
          <div className="bg-surface-secondary/50 flex max-h-36 flex-wrap gap-1.5 overflow-y-auto rounded-md border border-border-light p-1.5">
            {models.map((entry, idx) => (
              <div
                key={`${entry.provider}-${entry.model}-${idx}`}
                className="text-token-text-primary flex items-center gap-1 rounded border border-border-light bg-surface-primary px-2 py-0.5 text-xs"
              >
                <span className="font-semibold text-text-secondary">{entry.provider}:</span>
                <span className="break-all">{entry.model}</span>
                <button
                  type="button"
                  onClick={() => handleToggle(entry.provider, entry.model, false)}
                  className="ml-1 text-text-secondary transition-colors hover:text-red-500"
                  aria-label={localize('com_ui_delete') || 'Delete'}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-3">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder={localize('com_ui_search') || 'Search'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${defaultTextProps} ${removeFocusOutlines} flex w-full rounded-md border-border-light bg-surface-secondary py-1.5 pl-9 pr-3 text-sm focus-visible:ring-2 focus-visible:ring-ring-primary`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="hover:text-token-text-primary absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary"
            aria-label={localize('com_agents_clear_search') || 'Clear search'}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filteredProviders.length === 0 ? (
        <p className="mb-2 text-xs text-text-secondary">
          {localize('com_ui_no_results') || 'No results found'}
        </p>
      ) : (
        <Accordion
          type="multiple"
          className="bg-surface-secondary/20 w-full overflow-hidden rounded-md border border-border-light"
        >
          {filteredProviders.map((provider) => {
            const allModels = modelsForProviderWithLegacy(provider.value);
            const matchingModels = allModels.filter((m) =>
              m.value.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            const activeModelsForProvider = models.filter(
              (entry) => entry.provider === provider.value,
            );
            const activeCount = activeModelsForProvider.length;
            const totalCount = allModels.length;

            const isAllChecked =
              matchingModels.length > 0 &&
              matchingModels.every((m) =>
                models.some(
                  (entry) => entry.provider === provider.value && entry.model === m.value,
                ),
              );

            const handleSelectAll = (checked: boolean) => {
              let nextModels = [...models];
              if (checked) {
                matchingModels.forEach((m) => {
                  if (
                    !nextModels.some(
                      (entry) => entry.provider === provider.value && entry.model === m.value,
                    )
                  ) {
                    nextModels.push({ provider: provider.value, model: m.value });
                  }
                });
              } else {
                nextModels = nextModels.filter(
                  (entry) =>
                    !(
                      entry.provider === provider.value &&
                      matchingModels.some((m) => m.value === entry.model)
                    ),
                );
              }
              setValue('models', nextModels, { shouldDirty: true });
            };

            return (
              <AccordionItem
                key={provider.value}
                value={provider.value}
                className="border-b border-border-light last:border-0"
              >
                <AccordionTrigger className="text-token-text-primary hover:bg-surface-secondary/40 px-3 py-2.5 text-sm font-semibold transition-colors hover:no-underline">
                  <div className="flex items-center gap-2">
                    {provider.icon}
                    <span>{provider.label}</span>
                    <span className="text-xs font-normal text-text-secondary">
                      ({activeCount}/{totalCount})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3 pt-1">
                  <div className="flex flex-col gap-2">
                    {matchingModels.length > 1 && (
                      <>
                        <div className="flex items-center gap-2.5 py-1">
                          <Checkbox
                            id={`select-all-${provider.value}`}
                            checked={isAllChecked}
                            onCheckedChange={handleSelectAll}
                            aria-label={localize('com_ui_select_all') || 'Select All'}
                          />
                          <Label
                            htmlFor={`select-all-${provider.value}`}
                            className="cursor-pointer select-none text-xs font-semibold text-text-secondary"
                          >
                            {localize('com_ui_select_all') || 'Select All'}
                          </Label>
                        </div>
                        <div className="border-border-light/50 my-0.5 border-t" />
                      </>
                    )}

                    {matchingModels.map((m) => {
                      const isSelected = models.some(
                        (entry) => entry.provider === provider.value && entry.model === m.value,
                      );
                      const checkboxId = `model-checkbox-${provider.value}-${m.value}`;
                      return (
                        <div key={m.value} className="flex items-center gap-2.5 py-1">
                          <Checkbox
                            id={checkboxId}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleToggle(provider.value, m.value, !!checked)
                            }
                            aria-label={m.label}
                          />
                          <Label
                            htmlFor={checkboxId}
                            className="text-token-text-primary grow cursor-pointer select-none break-all text-sm font-normal"
                          >
                            {m.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default ModelPoolEditor;
