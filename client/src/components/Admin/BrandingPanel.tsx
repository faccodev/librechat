import React, { useState, useEffect } from 'react';
import { Palette, Upload, Trash2 } from 'lucide-react';
import { Button, useToastContext, Spinner } from '@librechat/client';
import { useGetAdminBranding, useUpdateAdminBranding } from '~/data-provider';
import { useLocalize } from '~/hooks';

export default function BrandingPanel() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { data: brandingData, isLoading, refetch } = useGetAdminBranding();
  const updateBrandingMutation = useUpdateAdminBranding();

  const [appTitle, setAppTitle] = useState('');
  const [accentColor, setAccentColor] = useState('#ab68ff');
  const [logoLight, setLogoLight] = useState('');
  const [logoDark, setLogoDark] = useState('');
  const [favicon, setFavicon] = useState('');

  useEffect(() => {
    if (brandingData) {
      setAppTitle(brandingData.appTitle || 'LibreChat');
      setAccentColor(brandingData.accentColor || '#ab68ff');
      setLogoLight(brandingData.logoLight || '');
      setLogoDark(brandingData.logoDark || '');
      setFavicon(brandingData.favicon || '');
    }
  }, [brandingData]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024) {
        showToast({
          message: 'Image size exceeds 200KB. Please compress the image.',
          status: 'error',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandingMutation.mutate(
      {
        appTitle: appTitle.trim() || 'LibreChat',
        accentColor: accentColor.trim() || '#ab68ff',
        logoLight,
        logoDark,
        favicon,
      },
      {
        onSuccess: () => {
          showToast({ message: localize('com_ui_saved'), status: 'success' });
          refetch();
        },
        onError: (err: any) => {
          showToast({
            message: err?.message || 'Failed to save branding configurations',
            status: 'error',
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <Spinner className="size-6 text-purple-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 text-text-primary max-w-xl">
      <div>
        <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
          <Palette className="size-4 text-purple-600" />
          {localize('com_ui_admin_branding_title') ?? 'Branding & Whitelabel'}
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Customize application branding assets globally. Settings are stored directly in the database.
        </p>
      </div>

      <div className="space-y-4">
        {/* App Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">
            Application Title
          </label>
          <input
            type="text"
            required
            value={appTitle}
            onChange={(e) => setAppTitle(e.target.value)}
            placeholder="e.g. LibreChat"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Accent Color */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Accent Color
          </label>
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-lg border border-border-light overflow-hidden flex-shrink-0">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer border-0 p-0 bg-transparent"
              />
            </div>
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#ab68ff"
              className="h-9 flex-1 rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Logo Light */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Logo for Light Theme (shown on light background)
          </label>
          <div className="flex items-center gap-4">
            {logoLight ? (
              <div className="relative h-14 w-28 rounded-lg border border-border-light bg-gray-50 flex items-center justify-center p-2">
                <img src={logoLight} className="max-h-full max-w-full object-contain" alt="Light logo preview" />
                <button
                  type="button"
                  onClick={() => setLogoLight('')}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-sm"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ) : (
              <label className="flex h-14 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border-medium hover:bg-surface-secondary transition-colors">
                <Upload className="size-4 text-text-secondary" />
                <span className="text-[10px] text-text-secondary mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setLogoLight)}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-[10px] text-text-secondary flex-1 leading-relaxed">
              Recommended dimensions: rectangular, e.g. 120x40px. Transparent PNG or SVG. Max 200KB.
            </p>
          </div>
        </div>

        {/* Logo Dark */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Logo for Dark Theme (shown on dark background)
          </label>
          <div className="flex items-center gap-4">
            {logoDark ? (
              <div className="relative h-14 w-28 rounded-lg border border-border-light bg-gray-900 flex items-center justify-center p-2">
                <img src={logoDark} className="max-h-full max-w-full object-contain" alt="Dark logo preview" />
                <button
                  type="button"
                  onClick={() => setLogoDark('')}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-sm"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ) : (
              <label className="flex h-14 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border-medium hover:bg-surface-secondary transition-colors">
                <Upload className="size-4 text-text-secondary" />
                <span className="text-[10px] text-text-secondary mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setLogoDark)}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-[10px] text-text-secondary flex-1 leading-relaxed">
              Recommended dimensions: rectangular, e.g. 120x40px. Transparent PNG or SVG. Max 200KB.
            </p>
          </div>
        </div>

        {/* Favicon */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Favicon (Browser Tab Icon)
          </label>
          <div className="flex items-center gap-4">
            {favicon ? (
              <div className="relative h-12 w-12 rounded-lg border border-border-light flex items-center justify-center p-2 bg-surface-secondary">
                <img src={favicon} className="h-6 w-6 object-contain" alt="Favicon preview" />
                <button
                  type="button"
                  onClick={() => setFavicon('')}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-sm"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ) : (
              <label className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border-medium hover:bg-surface-secondary transition-colors">
                <Upload className="size-4 text-text-secondary" />
                <span className="text-[10px] text-text-secondary mt-0.5">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFavicon)}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-[10px] text-text-secondary flex-1 leading-relaxed">
              Recommended size: 32x32px. Format: ICO, PNG or SVG. Max 200KB.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border-light">
        <Button
          type="submit"
          variant="submit"
          disabled={updateBrandingMutation.isLoading}
        >
          {updateBrandingMutation.isLoading ? (
            <div className="flex items-center gap-1.5">
              <Spinner className="size-4" />
              <span>Saving...</span>
            </div>
          ) : (
            localize('com_ui_save')
          )}
        </Button>
      </div>
    </form>
  );
}
