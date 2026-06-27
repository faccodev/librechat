#!/bin/sh
# rclone-entrypoint.sh
# ------------------------------------------------------------------
# Mounted as the entrypoint of the `rclone` service in docker-compose.yml.
#
# Decodes RCLONE_CONFIG_B64 (base64 of a full rclone.conf) into
# /cache/rclone/rclone.conf, then runs `rclone bisync` in a loop.
#
# We accept the WHOLE rclone.conf as a single base64 blob (instead of
# splitting into client_id / client_secret / refresh_token / folder_id)
# because:
#   1. Users often already have a working rclone.conf on their host
#      (especially the Windows desktop install at %APPDATA%\rclone\rclone.conf).
#   2. The token block contains dozens of fields (access_token, expiry,
#      token_type, refresh_token, expires_in, ...) that don't all have
#      rclone env-var equivalents — splitting loses info and risks the
#      refresh_token failing silently.
#   3. .env is already in .gitignore — base64 vs. raw text doesn't change
#      the security story (both are equally exposed if .env leaks).
#
# Required env vars:
#   RCLONE_CONFIG_B64         base64-encoded content of rclone.conf
#   RCLONE_REMOTE             remote name (must match a [section] in the conf)
#   WORKSPACES_HOST_PATH      host path mounted at /data/source
# Optional:
#   RCLONE_SYNC_INTERVAL      seconds between bisync runs (default: 300)
#   RCLONE_CONFLICT_POLICY    newest | oldest | larger | smaller (default: newest)
# ------------------------------------------------------------------
set -eu

CONFIG_DIR="/cache/rclone"
CONFIG_FILE="${CONFIG_DIR}/rclone.conf"
REMOTE_NAME="${RCLONE_REMOTE:-gdrive}"
SYNC_INTERVAL="${RCLONE_SYNC_INTERVAL:-300}"
CONFLICT_POLICY="${RCLONE_CONFLICT_POLICY:-newest}"

mkdir -p "${CONFIG_DIR}"

log() { printf '[rclone-entrypoint] %s\n' "$*"; }
die() { printf '[rclone-entrypoint] FATAL: %s\n' "$*" >&2; exit 1; }

# --- Decode and write the rclone.conf ----------------------------
[ -n "${RCLONE_CONFIG_B64:-}" ] || die "RCLONE_CONFIG_B64 is empty (set it to base64 of your rclone.conf)"

# `base64 -d` is POSIX; on busybox/alpine it's `base64 -d` too. Decode
# directly into the config file. The base64 string MUST be the whole
# rclone.conf content with no leading/trailing whitespace.
printf '%s' "${RCLONE_CONFIG_B64}" | base64 -d > "${CONFIG_FILE}"
chmod 600 "${CONFIG_FILE}"

# Sanity-check the file is non-empty AND looks like an INI file
# (contains at least one `[section]` header). If not, base64 decode
# probably failed (e.g. wrong charset, truncated).
if [ ! -s "${CONFIG_FILE}" ]; then
    die "Decoded rclone.conf is empty — check RCLONE_CONFIG_B64"
fi
if ! grep -qE '^\[[^]]+\]' "${CONFIG_FILE}"; then
    die "Decoded rclone.conf has no [section] headers — base64 likely corrupted"
fi

log "rclone.conf decoded (size=$(wc -c < "${CONFIG_FILE}") bytes)"

# --- Verify the requested remote actually exists in the conf -----
if ! grep -qE "^\[${REMOTE_NAME}\]" "${CONFIG_FILE}"; then
    die "Remote [${REMOTE_NAME}] not found in decoded rclone.conf. Available sections: $(grep -oE '^\[[^]]+\]' "${CONFIG_FILE}" | tr '\n' ' ')"
fi
log "Remote [${REMOTE_NAME}] present in conf"

# --- Optional: override root_folder_id from RCLONE_DRIVE_FOLDER_ID -----
# If the user has a host-side rclone.conf with no root_folder_id (syncs
# from "Meu Drive" root), they can set RCLONE_DRIVE_FOLDER_ID=<id> to
# scope the sync to a specific subfolder instead — without needing to
# regenerate the OAuth token. Empty = honor whatever the conf says
# (typically empty root_folder_id = Drive root).
if [ -n "${RCLONE_DRIVE_FOLDER_ID:-}" ]; then
    log "RCLONE_DRIVE_FOLDER_ID set — overriding root_folder_id to ${RCLONE_DRIVE_FOLDER_ID}"

    # Strategy:
    #   1. If a root_folder_id line exists anywhere in the [REMOTE_NAME]
    #      section, rewrite it in-place.
    #   2. If the section exists but has no root_folder_id line, append one.
    # Step 2 is the hard part in awk. We do it in two passes with sed:
    #   pass 1: rewrite existing line (if any)
    #   pass 2: if pass 1 didn't touch the section, append at section end
    TMP="${CONFIG_FILE}.tmp"
    SECTION_LINE="^\[${REMOTE_NAME}\]"
    REPLACED=0

    # Pass 1: rewrite existing root_folder_id line under [REMOTE_NAME].
    awk -v section="${SECTION_LINE}" -v folder="${RCLONE_DRIVE_FOLDER_ID}" '
        $0 ~ section { in_section = 1; print; next }
        /^\[/        { in_section = 0; print; next }
        in_section && /^root_folder_id[ \t]*=/ {
            print "root_folder_id = " folder
            replaced = 1
            next
        }
        { print }
        END { print (replaced ? "1" : "0") > "/tmp/.rclone_replaced"
    ' "${CONFIG_FILE}" > "${TMP}" && mv "${TMP}" "${CONFIG_FILE}"

    REPLACED=$(cat /tmp/.rclone_replaced 2>/dev/null || echo 0)
    rm -f /tmp/.rclone_replaced

    # Pass 2: if no existing line, append a root_folder_id line at the
    # end of the [REMOTE_NAME] section.
    if [ "${REPLACED}" = "0" ]; then
        log "No existing root_folder_id found — appending new line"
        awk -v section="${SECTION_LINE}" -v folder="${RCLONE_DRIVE_FOLDER_ID}" '
            $0 ~ section { in_section = 1 }
            /^\[/        { if (in_section && !appended) { print "root_folder_id = " folder; appended = 1 } in_section = 0 }
            { print }
            END { if (in_section && !appended) print "root_folder_id = " folder }
        ' "${CONFIG_FILE}" > "${TMP}" && mv "${TMP}" "${CONFIG_FILE}"
    fi

    chmod 600 "${CONFIG_FILE}"
fi

# --- Probe the remote is reachable -------------------------------
# `rclone lsd remote:` lists top-level dirs; if OAuth refresh fails or
# the token is revoked, this exits non-zero BEFORE we enter the loop
# so the container's healthcheck flips to unhealthy immediately.
if ! rclone lsd "${REMOTE_NAME}:" --config "${CONFIG_FILE}" --max-depth 1; then
    die "Remote ${REMOTE_NAME}: is not reachable — token expired/revoked, or scope wrong"
fi
log "Remote [${REMOTE_NAME}] reachable"

# --- Helper: skip a sync cycle if both sides are empty -----------
needs_initial_resync() {
    [ -f "${CONFIG_DIR}/.metadata/registry.db" ] && return 1
    local local_count remote_count
    local_count=$(find /data/source -mindepth 1 -maxdepth 1 2>/dev/null | wc -l)
    remote_count=$(rclone ls "${REMOTE_NAME}:" --config "${CONFIG_FILE}" --max-depth 1 2>/dev/null | wc -l)
    if [ "${local_count}" -eq 0 ] && [ "${remote_count}" -eq 0 ]; then
        return 0
    fi
    return 1
}

log "Starting bisync loop (interval=${SYNC_INTERVAL}s, conflict_resolve=${CONFLICT_POLICY})"

# Map our friendly conflict-policy names onto rclone's --conflict-resolve
# values (none | path1 | path2 | newer | older | larger | smaller).
# "newest" / "oldest" / "larger" / "smaller" pass through. Default is "newer".
case "${CONFLICT_POLICY}" in
    newest) RESOLVE="newer" ;;
    oldest) RESOLVE="older" ;;
    larger) RESOLVE="larger" ;;
    smaller) RESOLVE="smaller" ;;
    none)    RESOLVE="none" ;;
    *)       RESOLVE="newer" ;;
esac

while true; do
    if needs_initial_resync; then
        log "Both sides empty — skipping sync cycle (waiting for content)."
    else
        if [ -f "${CONFIG_DIR}/.metadata/registry.db" ]; then
            EXTRA=""
        else
            log "First run after metadata init — using --resync to build initial state"
            EXTRA="--resync"
        fi

        # `bisync` (not `sync`) is the bidirectional variant. Flags:
        #   --compare size,modtime,checksum  → use checksums for change detection
        #   --conflict-resolve newer         → resolve conflicts by newer-mtime-wins
        #   --create-empty-src-dirs          → keep directory structure intact
        rclone bisync \
            /data/source \
            "${REMOTE_NAME}:" \
            --config "${CONFIG_FILE}" \
            --compare size,modtime,checksum \
            --conflict-resolve "${RESOLVE}" \
            --create-empty-src-dirs \
            --verbose \
            ${EXTRA:-} 2>&1 | while IFS= read -r line; do
                printf '[rclone-bisync] %s\n' "$line"
            done || log "Bisync finished with non-zero exit (will retry next cycle)"
    fi

    sleep "${SYNC_INTERVAL}"
done