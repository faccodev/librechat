#!/usr/bin/env bash
# scripts/up-with-profiles.sh
# ------------------------------------------------------------------
# Linux / VPS / Coolify equivalent of scripts/up-with-profiles.ps1.
# Reads ENABLE_OMNIROUTE / ENABLE_RCLONE from .env and adds the matching
# --profile flags to `docker compose up`. Falls through to plain
# `docker compose up -d` when both flags are false.
#
# Usage:
#   ./scripts/up-with-profiles.sh                # up -d, reads ENABLE_* from .env
#   ./scripts/up-with-profiles.sh --foreground   # up (attached)
#   ./scripts/up-with-profiles.sh --no-build     # skip --build
#   ./scripts/up-with-profiles.sh --pull         # pull images first
#
# Equivalent manual invocation:
#   COMPOSE_PROFILES=omniroute,rclone docker compose up -d
# ------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

FOREGROUND=0
NO_BUILD=0
PULL=0
for arg in "$@"; do
    case "$arg" in
        --foreground|-f) FOREGROUND=1 ;;
        --no-build)      NO_BUILD=1 ;;
        --pull)          PULL=1 ;;
        -h|--help)
            sed -n '2,18p' "${BASH_SOURCE[0]}" | sed 's/^# \?//'
            exit 0 ;;
        *) echo "Unknown arg: $arg" >&2; exit 2 ;;
    esac
done

# Parse .env without depending on python or dotenv.
if [[ ! -f .env ]]; then
    echo ".env not found in $REPO_ROOT" >&2
    echo "Copy .env.example to .env first." >&2
    exit 1
fi

get_flag() {
    # Return 0 (true) if the named var in .env is true / 1 / yes (case-insensitive).
    local name="$1"
    local value
    value=$(grep -E "^${name}=" .env | tail -n 1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | xargs)
    value=$(echo "$value" | tr '[:upper:]' '[:lower:]')
    case "$value" in
        true|1|yes|on) return 0 ;;
        *) return 1 ;;
    esac
}

PROFILES=()
if get_flag ENABLE_OMNIROUTE; then PROFILES+=("omniroute"); fi
if get_flag ENABLE_RCLONE;    then PROFILES+=("rclone"); fi

COMPOSE_ARGS=(docker compose)
if [[ ${#PROFILES[@]} -gt 0 ]]; then
    PROFILE_LIST=$(IFS=, ; echo "${PROFILES[*]}")
    COMPOSE_ARGS+=(--profile "$PROFILE_LIST")
    echo "Activating profiles: $PROFILE_LIST" >&2
else
    echo "No optional profiles enabled (ENABLE_OMNIROUTE / ENABLE_RCLONE both false)." >&2
fi

COMPOSE_ARGS+=(up)
if [[ $FOREGROUND -eq 0 ]]; then COMPOSE_ARGS+=(-d); fi
if [[ $PULL -eq 1 ]];         then COMPOSE_ARGS+=(--pull always); fi
if [[ $NO_BUILD -eq 0 ]];     then COMPOSE_ARGS+=(--build); fi

echo "Running: ${COMPOSE_ARGS[*]}" >&2
exec "${COMPOSE_ARGS[@]}"