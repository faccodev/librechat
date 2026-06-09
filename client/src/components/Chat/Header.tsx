import { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from '@librechat/client';
import {
  getConfigDefaults,
  PermissionTypes,
  Permissions,
  SystemRoles,
  EModelEndpoint,
} from 'librechat-data-provider';
import ModelSelector from './Menus/Endpoints/ModelSelector';
import { useGetStartupConfig } from '~/data-provider';
import ExportAndShareMenu from './ExportAndShareMenu';
import { OpenSidebar, PresetsMenu } from './Menus';
import BookmarkMenu from './Menus/BookmarkMenu';
import { TemporaryChat } from './TemporaryChat';
import AddMultiConvo from './AddMultiConvo';
import { useAuthContext, useHasAccess } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';

const defaultInterface = getConfigDefaults().interface;

function Header() {
  const { data: startupConfig } = useGetStartupConfig();
  const navVisible = useRecoilValue(store.sidebarExpanded);
  const { user } = useAuthContext();

  const interfaceConfig = useMemo(
    () => startupConfig?.interface ?? defaultInterface,
    [startupConfig],
  );

  const hasAccessToBookmarks = false; // Disabled as requested

  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const hasAccessToTemporaryChat = useHasAccess({
    permissionType: PermissionTypes.TEMPORARY_CHAT,
    permission: Permissions.USE,
  });

  // RBAC: for non-admin roles (USER / custom), the header is restricted to
  // the agent picker only — the model selector, presets, multi-convo, and
  // bookmarks dropdowns are all hidden. Admins see the full set.
  const isAdmin = user?.role === SystemRoles.ADMIN;
  const isRestrictedRole = !isAdmin;

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className="via-presentation/70 md:from-presentation/80 md:via-presentation/50 2xl:from-presentation/0 absolute top-0 z-10 flex h-[52px] w-full items-center justify-between bg-gradient-to-b from-presentation to-transparent p-2 font-semibold text-text-primary 2xl:via-transparent">
      <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
        <div className="mx-1 flex items-center">
          <OpenSidebar className="md:hidden" />
          {!(navVisible && isSmallScreen) && (
            <div
              className={cn(
                'flex items-center gap-2 pl-2',
                !isSmallScreen ? 'transition-all duration-200 ease-in-out' : '',
              )}
            >
              {/* Restricted role: only show the model selector if it would
                  yield the agents endpoint (the picker still shows agents,
                  but no other endpoints/models). Passing a fake startupConfig
                  with modelSpecs restricted to agents forces the selector
                  into agents-only mode for non-admin users. */}
              {isRestrictedRole ? (
                <ModelSelector
                  startupConfig={
                    startupConfig
                      ? ({
                          ...startupConfig,
                          interface: {
                            ...interfaceConfig,
                            modelSelect: true,
                            presets: false,
                          },
                          modelSpecs: {
                            ...(startupConfig.modelSpecs ?? {}),
                            list: (startupConfig.modelSpecs?.list ?? []).filter(
                              (spec) => spec.endpoint === EModelEndpoint.agents,
                            ),
                            addedEndpoints: [EModelEndpoint.agents],
                          },
                        } as typeof startupConfig)
                      : startupConfig
                  }
                />
              ) : (
                <>
                  <ModelSelector startupConfig={startupConfig} />
                  {/* Presets and Bookmarks are disabled as requested */}
                  {/* {interfaceConfig.presets === true && interfaceConfig.modelSelect && <PresetsMenu />} */}
                  {hasAccessToBookmarks === true && <BookmarkMenu />}
                  {hasAccessToMultiConvo === true && <AddMultiConvo />}
                </>
              )}
              {isSmallScreen && (
                <>
                  <ExportAndShareMenu
                    isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
                  />
                  {hasAccessToTemporaryChat === true && <TemporaryChat />}
                </>
              )}
            </div>
          )}
        </div>

        {!isSmallScreen && (
          <div className="flex items-center gap-2">
            <ExportAndShareMenu
              isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
            />
            {hasAccessToTemporaryChat === true && <TemporaryChat />}
          </div>
        )}
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = 'Header';

export default MemoizedHeader;
