const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '..', '..'),
  uploads: path.resolve(__dirname, '..', '..', 'uploads'),
  clientPath: path.resolve(__dirname, '..', '..', 'client'),
  dist: path.resolve(__dirname, '..', '..', 'client', 'dist'),
  publicPath: path.resolve(__dirname, '..', '..', 'client', 'public'),
  fonts: path.resolve(__dirname, '..', '..', 'client', 'public', 'fonts'),
  assets: path.resolve(__dirname, '..', '..', 'client', 'public', 'assets'),
  /**
   * Image output root — persists user/agent/assistant avatars AND
   * generated images (DALL-E, Stable Diffusion, Gemini, etc.). Lives
   * under `uploads/` (the `librechat_uploads` named volume mounted at
   * `/app/uploads` in docker-compose.yml) so assets survive container
   * rebuilds. Previously pointed at `client/public/images/`, which is
   * part of the COPY layer in the Dockerfile and was wiped on every
   * rebuild.
   */
  imageOutput: path.resolve(__dirname, '..', '..', 'uploads', 'images'),
  structuredTools: path.resolve(__dirname, '..', '..', 'app', 'clients', 'tools', 'structured'),
  pluginManifest: path.resolve(__dirname, '..', 'app', 'clients', 'tools', 'manifest.json'),
};
