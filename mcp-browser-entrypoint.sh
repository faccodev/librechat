#!/bin/sh
# Entrypoint wrapper: re-assert ownership of the browser_profile volume
# mountpoint, then exec the MCP server. Required because:
#   1. Docker named volumes are created root:root on first attach, and
#      Puppeteer (running as root or pptruser) needs to write the
#      SingletonLock file there. Otherwise Chrome aborts with
#      "Failed to create /ms-browser/SingletonLock: Permission denied".
#   2. We tried dropping to pptruser via gosu, but the api container
#      doesn't grant CAP_SETUID, so the gosu call itself failed. The
#      @agent-infra server is fine running as root — it auto-passes
#      --no-sandbox to Chromium when it detects a container env.
set -e

# Re-claim the volume mountpoint as root so subsequent operations
# (mkdir, etc.) work, then chown the contents to pptruser to match
# any pre-existing files from prior runs. We use `|| true` because
# the chown of a non-root-owned dir without explicit permission
# would otherwise fail.
chown root:root /ms-browser 2>/dev/null || true
mkdir -p /ms-browser /ms-browser/output
# Hand the dir back to pptruser so the volume's persisted files keep
# matching the UID we use elsewhere (and so a future drop-to-user
# switch wouldn't need another fix).
chown -R 10042:999 /ms-browser 2>/dev/null || true

# Now drop the volume ownership so the mcp-server-browser process —
# which runs as root — can still write. The internal Chrome
# process inherits the container's root UID and can write anywhere
# root owns.
chown -R root:root /ms-browser

exec "$@"
