const { logger } = require('@librechat/data-schemas');
const { getAppConfig } = require('~/server/services/Config');

/**
 * This function retrieves the speechTab settings from the custom configuration
 * It first fetches the custom configuration
 * Then, it checks if the custom configuration and the speechTab schema exist
 * If they do, it sends the speechTab settings as a JSON response
 * If they don't, it throws an error
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 * @throws {Error} - If the custom configuration or the speechTab schema is missing, an error is thrown
 */
async function getCustomConfigSpeech(req, res) {
  try {
    const appConfig =
      req.config ??
      (await getAppConfig({
        role: req.user?.role,
        userId: req.user?.id,
        tenantId: req.user?.tenantId,
      }));

    if (!appConfig) {
      return res.status(200).send({
        message: 'not_found',
      });
    }

    const sttSchema = appConfig.speech?.stt;
    const ttsSchema = appConfig.speech?.tts;
    const sttExternal = !!sttSchema;
    /**
     * Surfaces a self-hosted faster-whisper server to the client so the
     * STT engine dropdown can offer a "Faster Whisper (servidor)" option
     * in addition to the browser-native path. Operators opt in by
     * configuring `speech.stt.fasterWhisper` in librechat.yaml; the
     * presence of the block (not its URL) is what flips this flag, so
     * a misconfigured URL still surfaces the option and the runtime
     * error tells the operator to fix it.
     */
    const sttFasterWhisper = !!sttSchema && Object.prototype.hasOwnProperty.call(sttSchema, 'fasterWhisper');
    const ttsExternal = !!ttsSchema;
    let settings = {
      sttExternal,
      sttFasterWhisper,
      ttsExternal,
    };

    if (!appConfig.speech?.speechTab) {
      return res.status(200).send(settings);
    }

    const speechTab = appConfig.speech.speechTab;

    if (speechTab.advancedMode !== undefined) {
      settings.advancedMode = speechTab.advancedMode;
    }

    if (speechTab.speechToText !== undefined) {
      if (typeof speechTab.speechToText === 'boolean') {
        settings.speechToText = speechTab.speechToText;
      } else {
        for (const key in speechTab.speechToText) {
          if (speechTab.speechToText[key] !== undefined) {
            settings[key] = speechTab.speechToText[key];
          }
        }
      }
    }

    if (speechTab.textToSpeech !== undefined) {
      if (typeof speechTab.textToSpeech === 'boolean') {
        settings.textToSpeech = speechTab.textToSpeech;
      } else {
        for (const key in speechTab.textToSpeech) {
          if (speechTab.textToSpeech[key] !== undefined) {
            settings[key] = speechTab.textToSpeech[key];
          }
        }
      }
    }

    return res.status(200).send(settings);
  } catch (error) {
    logger.error('Failed to get custom config speech settings:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = getCustomConfigSpeech;
