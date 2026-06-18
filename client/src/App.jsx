import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { RouterProvider } from 'react-router-dom';
import * as RadixToast from '@radix-ui/react-toast';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toast, ThemeProvider, ToastProvider } from '@librechat/client';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ScreenshotProvider, useApiErrorBoundary } from './hooks';
import WakeLockManager from '~/components/System/WakeLockManager';
import { getThemeFromEnv } from './utils/getThemeFromEnv';
import { initializeFontSize } from '~/store/fontSize';
import { LiveAnnouncer } from '~/a11y';
import { router } from './routes';

const App = () => {
  const { setError } = useApiErrorBoundary();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Always attempt network requests, even when navigator.onLine is false
        // This is needed because localhost is reachable without WiFi
        networkMode: 'always',
      },
      mutations: {
        networkMode: 'always',
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error?.response?.status === 401) {
          setError(error);
        }
      },
    }),
  });

  useEffect(() => {
    initializeFontSize();
  }, []);

  /*
   * Safety net: react-remove-scroll (transitive via @radix-ui/react-dialog)
   * adds a `block-interactivity-{id}` class to <body> while a Radix dialog
   * is open. v2.5.5 occasionally leaves the class behind on close — usually
   * when the dialog unmounts mid-render (Monaco async load, React strict
   * mode, multiple modals reconciling). When no Radix dialog is in the DOM
   * (open or animating out), any leftover class is a leak: body stays
   * `pointer-events: none` and the page is dead until F5. Sweep it.
   *
   * Three layers:
   * 1) MutationObserver on body class — cheap, catches the "add" path.
   * 2) setInterval(2000) — catches the "stuck and not changing" path that the
   *    observer can't see. 2s is fast enough to be imperceptible to the user
   *    and slow enough to be a no-op on the hot path (single early-return
   *    querySelectorAll per tick).
   * 3) pointerdown listener — instant recovery on the user's first click,
   *    regardless of source (class, inline style, or anything else). If the
   *    user can't click anything, they WILL eventually try; the first attempt
   *    clears the body lock.
   *
   * The sweep also resets `body.style.pointerEvents` if it's been set to
   * 'none' inline — in case some other path applies it via inline style
   * instead of (or in addition to) the class.
   *
   * Note: we match ANY `[role="dialog"]` (not just `[data-state="open"]`) so
   * the class is preserved during the close animation — the dialog content
   * flips to `data-state="closed"` for ~100ms before Radix unmounts it, and
   * we don't want to strip the body class mid-fade and let the user click
   * through the still-visible overlay.
   */
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const sweep = () => {
      if (document.querySelector('[role="dialog"]')) return;
      const stale = document.body.className.match(/block-interactivity-\d+/g);
      if (stale) stale.forEach((cls) => document.body.classList.remove(cls));
      if (document.body.style.pointerEvents === 'none') {
        document.body.style.pointerEvents = '';
      }
    };

    const observer = new MutationObserver(sweep);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });

    const intervalId = window.setInterval(sweep, 2000);

    const onPointerDown = () => {
      if (document.querySelector('[role="dialog"]')) return;
      if (document.body.style.pointerEvents === 'none') {
        document.body.style.pointerEvents = '';
      }
    };
    document.addEventListener('pointerdown', onPointerDown, true);

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
      document.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, []);

  // Load theme from environment variables if available
  const envTheme = getThemeFromEnv();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <LiveAnnouncer>
          <ThemeProvider
            // Only pass initialTheme and themeRGB if environment theme exists
            // This allows localStorage values to persist when no env theme is set
            {...(envTheme && { initialTheme: 'system', themeRGB: envTheme })}
          >
            {/* The ThemeProvider will automatically:
                1. Apply dark/light mode classes
                2. Apply custom theme colors if envTheme is provided
                3. Otherwise use stored theme preferences from localStorage
                4. Fall back to default theme colors if nothing is stored */}
            <RadixToast.Provider>
              <ToastProvider>
                <DndProvider backend={HTML5Backend}>
                  <RouterProvider router={router} />
                  <WakeLockManager />
                  <ReactQueryDevtools initialIsOpen={false} position="top-right" />
                  <Toast />
                  <RadixToast.Viewport className="pointer-events-none fixed inset-0 z-[1000] mx-auto my-2 flex max-w-[560px] flex-col items-stretch justify-start md:pb-5" />
                </DndProvider>
              </ToastProvider>
            </RadixToast.Provider>
          </ThemeProvider>
        </LiveAnnouncer>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default () => (
  <ScreenshotProvider>
    <App />
    <iframe
      src="assets/silence.mp3"
      allow="autoplay"
      id="audio"
      title="audio-silence"
      style={{
        display: 'none',
      }}
    />
  </ScreenshotProvider>
);
