#!/bin/sh
# Entry point: chown writable bind-mount directories to the same uid:gid
# that the api runs as (defaults to 1000:1000, the unprivileged `node`
# user baked into the base image), then exec the command.
#
# Rationale: when a directory on the host is bind-mounted into the
# container (e.g. /workspaces, /app/uploads, /app/logs), its files are
# typically owned by the host user that created them. Inside the
# container we run as `node` (uid 1000), so the api can't read or write
# those files and the user sees EACCES errors like
#     EACCES: permission denied, scandir '/workspaces/workspace/Empresa'
# even though the folder has standard permissions on the host. The fix
# is to chown the bind mount to node:node on every container start, then
# drop back to node before running the app. Existing file contents are
# preserved (we only change ownership, not mode), so this is safe to run
# on every boot.
#
# The chown step requires root, so this script runs as root. After the
# chown we drop privileges to the target user via su-exec (Alpine) or
# gosu (Debian-style), preferring whichever is available. The fallback
# is to just exec the command as root, which still works for the
# permission fix but is not ideal from a defense-in-depth perspective.
set -e

TARGET_UID="${TARGET_UID:-1000}"
TARGET_GID="${TARGET_GID:-1000}"
CHOWN_PATHS="${CHOWN_PATHS:-/workspaces /app/uploads /app/logs}"

for p in $CHOWN_PATHS; do
  if [ -d "$p" ]; then
    # Recursive chown, suppress errors for read-only mount points (e.g.
    # when the path exists but is bind-mounted read-only).
    chown -R "$TARGET_UID:$TARGET_GID" "$p" 2>/dev/null || \
      echo "[entrypoint] chown $p failed (non-fatal), continuing"
  fi
done

# Drop privileges and exec the command passed to the entrypoint (or
# whatever CMD was set on the Dockerfile). `su-exec` is part of Alpine's
# s6 package and is a minimal setuid-wrapper. We check well-known absolute
# paths because Alpine's busybox sh doesn't always populate $PATH for
# tools installed via apk at non-standard locations.
if [ -x /sbin/su-exec ]; then
  exec /sbin/su-exec "$TARGET_UID:$TARGET_GID" "$@"
fi
if [ -x /usr/sbin/su-exec ]; then
  exec /usr/sbin/su-exec "$TARGET_UID:$TARGET_GID" "$@"
fi
if [ -x /usr/local/bin/su-exec ]; then
  exec /usr/local/bin/su-exec "$TARGET_UID:$TARGET_GID" "$@"
fi
if command -v su-exec >/dev/null 2>&1; then
  exec su-exec "$TARGET_UID:$TARGET_GID" "$@"
fi

if [ -x /usr/sbin/gosu ]; then
  exec /usr/sbin/gosu "$TARGET_UID:$TARGET_GID" "$@"
fi
if command -v gosu >/dev/null 2>&1; then
  exec gosu "$TARGET_UID:$TARGET_GID" "$@"
fi

# No privilege-dropper available — run as root. The api still works
# (root can read everything) but this is a defence-in-depth regression.
echo "[entrypoint] warning: neither su-exec nor gosu is installed; running as root"
exec "$@"
