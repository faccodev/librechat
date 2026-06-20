import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';
import { installCloudFrontImageRetry } from '@librechat/client';
import {
  getTokenHeader,
  LocalStorageKeys,
  PermissionTypes,
  Permissions,
} from 'librechat-data-provider';
import type { TStartupConfig, TUser } from 'librechat-data-provider';
import { useMCPToolsQuery, useMCPServersQuery } from '~/data-provider';
import { cleanupTimestampedStorage } from '~/utils/timestamps';
import useSpeechSettingsInit from './useSpeechSettingsInit';
import { useHasAccess } from '~/hooks';
import store from '~/store';

function hexToHSL(hex: string) {
  const cleanedHex = hex.replace('#', '');
  let r = 0, g = 0, b = 0;
  if (cleanedHex.length === 3) {
    r = parseInt(cleanedHex[0] + cleanedHex[0], 16) / 255;
    g = parseInt(cleanedHex[1] + cleanedHex[1], 16) / 255;
    b = parseInt(cleanedHex[2] + cleanedHex[2], 16) / 255;
  } else if (cleanedHex.length === 6) {
    r = parseInt(cleanedHex.substring(0, 2), 16) / 255;
    g = parseInt(cleanedHex.substring(2, 4), 16) / 255;
    b = parseInt(cleanedHex.substring(4, 6), 16) / 255;
  } else {
    return null;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function useAppStartup({
  startupConfig,
  user,
}: {
  startupConfig?: TStartupConfig;
  user?: TUser;
}) {
  const [defaultPreset, setDefaultPreset] = useRecoilState(store.defaultPreset);
  const canUseMcp = useHasAccess({
    permissionType: PermissionTypes.MCP_SERVERS,
    permission: Permissions.USE,
  });

  useSpeechSettingsInit(!!user);
  const { data: loadedServers, isLoading: serversLoading } = useMCPServersQuery({
    enabled: canUseMcp,
  });

  useMCPToolsQuery({
    enabled:
      canUseMcp &&
      !serversLoading &&
      !!loadedServers &&
      Object.keys(loadedServers).length > 0 &&
      !!user,
  });

  /** Clean up old localStorage entries on startup */
  useEffect(() => {
    cleanupTimestampedStorage();
  }, []);

  /** Set the app title */
  useEffect(() => {
    const appTitle = startupConfig?.appTitle ?? '';
    if (!appTitle) {
      return;
    }
    document.title = appTitle;
    localStorage.setItem(LocalStorageKeys.APP_TITLE, appTitle);
  }, [startupConfig]);

  /** Apply custom favicon and accent color branding */
  useEffect(() => {
    const customFavicon = startupConfig?.customFavicon;
    const links = document.querySelectorAll("link[rel*='icon']");
    const appleTouchLinks = document.querySelectorAll("link[rel*='apple-touch-icon']");

    if (customFavicon) {
      if (links.length > 0) {
        links.forEach((link) => {
          (link as HTMLLinkElement).href = customFavicon;
        });
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = customFavicon;
        document.head.appendChild(link);
      }
      appleTouchLinks.forEach((link) => {
        (link as HTMLLinkElement).href = customFavicon;
      });
    } else if (startupConfig) {
      links.forEach((link) => {
        const sizes = (link as HTMLLinkElement).getAttribute('sizes');
        if (sizes === '16x16') {
          (link as HTMLLinkElement).href = 'assets/favicon-16x16.png';
        } else {
          (link as HTMLLinkElement).href = 'assets/favicon-32x32.png';
        }
      });
      appleTouchLinks.forEach((link) => {
        (link as HTMLLinkElement).href = 'assets/apple-touch-icon-180x180.png';
      });
    }

    const customAccentColor = startupConfig?.customAccentColor;
    if (customAccentColor) {
      document.documentElement.style.setProperty('--brand-purple', customAccentColor);

      const hsl = hexToHSL(customAccentColor);
      if (hsl) {
        const { h, s } = hsl;
        document.documentElement.style.setProperty('--green-50', `hsl(${h}, ${s}%, 96%)`);
        document.documentElement.style.setProperty('--green-100', `hsl(${h}, ${s}%, 90%)`);
        document.documentElement.style.setProperty('--green-200', `hsl(${h}, ${s}%, 82%)`);
        document.documentElement.style.setProperty('--green-300', `hsl(${h}, ${s}%, 72%)`);
        document.documentElement.style.setProperty('--green-400', `hsl(${h}, ${s}%, 60%)`);
        document.documentElement.style.setProperty('--green-500', `hsl(${h}, ${s}%, 48%)`);
        document.documentElement.style.setProperty('--green-550', `hsl(${h}, ${s}%, 42%)`);
        document.documentElement.style.setProperty('--green-600', `hsl(${h}, ${s}%, 36%)`);
        document.documentElement.style.setProperty('--green-700', `hsl(${h}, ${s}%, 28%)`);
        document.documentElement.style.setProperty('--green-800', `hsl(${h}, ${s}%, 20%)`);
        document.documentElement.style.setProperty('--green-900', `hsl(${h}, ${s}%, 14%)`);
        document.documentElement.style.setProperty('--green-950', `hsl(${h}, ${s}%, 8%)`);
      }
    } else {
      document.documentElement.style.removeProperty('--brand-purple');
      const greenKeys = [
        '--green-50',
        '--green-100',
        '--green-200',
        '--green-300',
        '--green-400',
        '--green-500',
        '--green-550',
        '--green-600',
        '--green-700',
        '--green-800',
        '--green-900',
        '--green-950',
      ];
      greenKeys.forEach((key) => document.documentElement.style.removeProperty(key));
    }
  }, [startupConfig]);

  /** Set the default spec's preset as default */
  useEffect(() => {
    if (defaultPreset && defaultPreset.spec != null) {
      return;
    }

    const modelSpecs = startupConfig?.modelSpecs?.list;

    if (!modelSpecs || !modelSpecs.length) {
      return;
    }

    const defaultSpec = modelSpecs.find((spec) => spec.default);

    if (!defaultSpec) {
      return;
    }

    setDefaultPreset({
      ...defaultSpec.preset,
      iconURL: defaultSpec.iconURL,
      spec: defaultSpec.name,
    });
  }, [defaultPreset, setDefaultPreset, startupConfig?.modelSpecs?.list]);

  useEffect(() => {
    return installCloudFrontImageRetry(startupConfig, { getAuthorizationHeader: getTokenHeader });
  }, [startupConfig]);

  useEffect(() => {
    if (startupConfig?.analyticsGtmId != null && typeof window.google_tag_manager === 'undefined') {
      const tagManagerArgs = {
        gtmId: startupConfig.analyticsGtmId,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, [startupConfig?.analyticsGtmId]);
}
