import axios from 'axios';
import { workspaceRaw } from 'librechat-data-provider';

/**
 * Triggers a save-as dialog for a workspace file. Uses axios (which
 * attaches the Bearer header) and the Blob + ObjectURL dance because
 * a plain `<a href>` wouldn't carry the JWT.
 */
export const downloadWorkspaceFile = async (
  path: string,
  filename: string,
): Promise<void> => {
  const { data } = await axios.get<Blob>(workspaceRaw({ path, download: true }), {
    responseType: 'blob',
  });
  const objectUrl = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Defer revoke a tick so the browser has time to start the download.
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
};
