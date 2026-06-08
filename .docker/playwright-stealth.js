// Playwright stealth init script — runs in every page before any page script.
// Overrides the most obvious bot signals left by Playwright's default headless
// Chromium profile. Loaded via `--init-script /app/stealth.js`.
//
// What it covers (detected by sannysoft/bot.sannysoft, creepjs, basic
// FingerprintJS):
//   - navigator.webdriver: true  → undefined
//   - navigator.plugins: empty   → 3 fake plugins (Chrome, Edge, PDF)
//   - navigator.languages: ['en-US'] → ['pt-BR', 'pt', 'en-US', 'en']
//   - navigator.hardwareConcurrency: deterministic in headless → 8
//   - navigator.deviceMemory: undefined in headless → 8
//   - WebGL vendor/renderer: "Google Inc. (NVIDIA)" / "ANGLE (...)" →
//     realistic "Intel Inc." / "Intel Iris OpenGL Engine"
//   - chrome.runtime: undefined → {} (FingerprintJS checks this)
//
// What it does NOT cover (would need a different layer):
//   - CDP/Runtime.executionContextCreated leak (real Chrome fingerprint
//     difference vs Chromium)
//   - TLS/JA3 fingerprint (needs a real Chrome binary, not Chromium)
//   - canvas fingerprint (would need canvas noise injected at draw time)

(() => {
  // navigator.webdriver
  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
    configurable: true,
  });

  // navigator.languages — keep consistent with --locale-style behavior
  Object.defineProperty(navigator, 'languages', {
    get: () => ['pt-BR', 'pt', 'en-US', 'en'],
    configurable: true,
  });
  Object.defineProperty(navigator, 'language', {
    get: () => 'pt-BR',
    configurable: true,
  });

  // navigator.plugins — empty in headless, fake 3 entries
  Object.defineProperty(navigator, 'plugins', {
    get: () => {
      const plugins = [
        { name: 'PDF Viewer', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
        { name: 'Chrome PDF Viewer', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
        { name: 'Chromium PDF Viewer', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      ];
      plugins.length = 3;
      return plugins;
    },
    configurable: true,
  });

  // navigator.mimeTypes — must be consistent with plugins
  Object.defineProperty(navigator, 'mimeTypes', {
    get: () => {
      const mimes = [
        { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: null },
      ];
      mimes.length = 1;
      mimes[0].enabledPlugin = navigator.plugins[0];
      return mimes;
    },
    configurable: true,
  });

  // hardwareConcurrency / deviceMemory
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => 8,
    configurable: true,
  });
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => 8,
    configurable: true,
  });

  // chrome.runtime — present in real Chrome, missing in headless Chromium
  window.chrome = window.chrome || {};
  window.chrome.runtime = window.chrome.runtime || {};
  window.chrome.loadTimes = window.chrome.loadTimes || (() => ({}));
  window.chrome.csi = window.chrome.csi || (() => ({}));
  window.chrome.app = window.chrome.app || { isInstalled: false };

  // WebGL vendor/renderer — headless Chromium leaks "SwiftShader" or empty
  const patchWebGL = (proto) => {
    const originalGetParameter = proto.getParameter;
    proto.getParameter = function (param) {
      // UNMASKED_VENDOR_WEBGL = 0x9245
      if (param === 0x9245) return 'Intel Inc.';
      // UNMASKED_RENDERER_WEBGL = 0x9246
      if (param === 0x9246) return 'Intel Iris OpenGL Engine';
      return originalGetParameter.call(this, param);
    };
  };
  patchWebGL(WebGLRenderingContext.prototype);
  patchWebGL(WebGL2RenderingContext.prototype);

  // permissions.query — headless reports "denied" for notifications even when
  // not asked. Override to behave like a real Chrome.
  const originalQuery = navigator.permissions && navigator.permissions.query;
  if (originalQuery) {
    navigator.permissions.query = (parameters) =>
      parameters.name === 'notifications'
        ? Promise.resolve({ state: Notification.permission, onchange: null })
        : originalQuery(parameters);
  }

  // iframe.contentWindow — sometimes used to detect automation
  // (real Chrome's iframe has chrome.runtime, headless does not)
  // This is usually handled by the chrome.runtime shim above, but some
  // detectors look at the iframe specifically. Not patching here as it
  // would break legitimate use cases.

  // Canvas fingerprint perturbation
  try {
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
      const imageData = originalGetImageData.apply(this, arguments);
      if (w < 1000 && h < 1000) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 40) {
          const val = data[i];
          data[i] = val === 255 ? 254 : val + 1;
        }
      }
      return imageData;
    };

    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function () {
      if (this.width > 0 && this.height > 0 && this.width < 1000 && this.height < 1000) {
        try {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = this.width;
          tempCanvas.height = this.height;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.drawImage(this, 0, 0);
            const imgData = tempCtx.getImageData(0, 0, this.width, this.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 40) {
              const val = data[i];
              data[i] = val === 255 ? 254 : val + 1;
            }
            tempCtx.putImageData(imgData, 0, 0);
            return originalToDataURL.apply(tempCanvas, arguments);
          }
        } catch (e) {
          // fallback on tainting
        }
      }
      return originalToDataURL.apply(this, arguments);
    };

    const originalToBlob = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function (callback, ...args) {
      if (this.width > 0 && this.height > 0 && this.width < 1000 && this.height < 1000) {
        try {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = this.width;
          tempCanvas.height = this.height;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.drawImage(this, 0, 0);
            const imgData = tempCtx.getImageData(0, 0, this.width, this.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 40) {
              const val = data[i];
              data[i] = val === 255 ? 254 : val + 1;
            }
            tempCtx.putImageData(imgData, 0, 0);
            return originalToBlob.apply(tempCanvas, [callback, ...args]);
          }
        } catch (e) {
          // fallback
        }
      }
      return originalToBlob.apply(this, arguments);
    };
  } catch (canvasErr) {
    // console.warn('Stealth canvas perturbation failed to initialize:', canvasErr);
  }
})();
