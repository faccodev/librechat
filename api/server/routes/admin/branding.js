const express = require('express');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const mongoose = require('mongoose');

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

const brandingSchema = new mongoose.Schema({
  appTitle: { type: String, default: 'LibreChat' },
  logoLight: { type: String, default: '' },
  logoDark: { type: String, default: '' },
  favicon: { type: String, default: '' },
  accentColor: { type: String, default: '' }
}, { timestamps: true });

const Branding = mongoose.models.Branding || mongoose.model('Branding', brandingSchema);

router.use(requireJwtAuth, requireAdminAccess);

router.get('/', async (req, res) => {
  try {
    let branding = await Branding.findOne();
    if (!branding) {
      branding = await Branding.create({
        appTitle: 'LibreChat',
        logoLight: '',
        logoDark: '',
        favicon: '',
        accentColor: ''
      });
    }
    return res.status(200).json(branding);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { appTitle, logoLight, logoDark, favicon, accentColor } = req.body;
    let branding = await Branding.findOne();
    if (!branding) {
      branding = new Branding({});
    }
    if (appTitle !== undefined) branding.appTitle = appTitle;
    if (logoLight !== undefined) branding.logoLight = logoLight;
    if (logoDark !== undefined) branding.logoDark = logoDark;
    if (favicon !== undefined) branding.favicon = favicon;
    if (accentColor !== undefined) branding.accentColor = accentColor;
    
    await branding.save();
    return res.status(200).json(branding);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
