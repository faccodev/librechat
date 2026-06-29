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

# Clean up stale Chrome singleton locks. When the previous container
# instance crashed or was killed mid-request (Docker restart, OOM,
# `docker compose down` without grace), Chrome leaves behind
# SingletonLock / SingletonCookie / SingletonSocket files in the
# shared user-data-dir. The next launch sees those files, decides
# another Chrome is "still using" the profile on a different host,
# and aborts with:
#   "The profile appears to be in use by another Google Chrome
#    process (N) on another computer (HASH). Chrome has locked
#    the profile so that it doesn't get corrupted."
# The computer-id hash is read from SingletonLock symlink target
# (hostname of whoever created it) — that's why the message says
# "another computer" even though it's just our own prior container.
# Removing these files at boot is safe because:
#   - The previous Chrome is already dead (otherwise its host would
#     still hold the lock and we'd block, which is what we want).
#   - A live Chrome would have re-created these files between our
#     `rm` and its next launch attempt, so we only ever delete stale
#     ones. If the prior process is somehow still alive, the new
#     Chrome will refuse to launch anyway (and the OLD Chrome is
#     still serving — losing one request to a retry is fine).
# - We use a single `rm -f` glob so it works whether the volume
#   is fresh (no files → exit 0) or polluted (1+ files → removed).
rm -f /ms-browser/SingletonLock /ms-browser/SingletonLockSymlink \
      /ms-browser/SingletonCookie /ms-browser/SingletonSocket \
      /ms-browser/SingletonSocketSymlink 2>/dev/null || true

exec "$@"
