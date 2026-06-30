#!/bin/sh
#
# Pre-build (or pull) the executor images used by mcp-workspace.
#
# The runner spawns a FRESH container of one of these images on every
# `run_code` / `run_file` call. Three images, one per language:
#
#   mcp-runner-alpine:latest  (sh / generic shell)
#   mcp-runner-node:latest    (node)
#   mcp-runner-python:latest  (python)
#
# Each is built locally from ./executors/Dockerfile.* and extends the
# upstream base image with `git` pre-installed, so agents can `git clone`
# inside `run_code` without paying the install cost on every call.
#
# If the local build fails (e.g. no docker.sock access in CI), we fall
# back to pulling the upstream base image directly. Without git in that
# case, but the runner still works for everything else.

set -e

EXECUTORS_DIR="$(cd "$(dirname "$0")/.." && pwd)/executors"

build_local() {
    local dockerfile="$1"
    local tag="$2"
    echo "Building local executor image: $tag"
    if docker build \
        --tag "$tag" \
        --file "$EXECUTORS_DIR/$dockerfile" \
        "$EXECUTORS_DIR" >/dev/null; then
        echo "  ok: $tag"
        return 0
    fi
    echo "  failed to build $tag"
    return 1
}

pull_upstream() {
    local image="$1"
    echo "Pulling upstream fallback: $image"
    if docker pull "$image"; then
        # Re-tag the upstream image under the local name so the runner can
        # resolve it regardless of which path succeeded.
        docker tag "$image" "$2" || true
        return 0
    fi
    echo "  failed to pull $image"
    return 1
}

# sh / alpine default
if ! build_local Dockerfile.alpine mcp-runner-alpine:latest; then
    echo "Falling back to upstream alpine:latest"
    pull_upstream alpine:latest mcp-runner-alpine:latest \
        || echo "WARNING: alpine executor image unavailable; sh executions may fail."
fi

# node
if ! build_local Dockerfile.node mcp-runner-node:latest; then
    echo "Falling back to upstream node:20-alpine"
    pull_upstream node:20-alpine mcp-runner-node:latest \
        || echo "WARNING: node executor image unavailable; node executions may fail."
fi

# python
if ! build_local Dockerfile.python mcp-runner-python:latest; then
    echo "Falling back to upstream python:3.12-slim"
    pull_upstream python:3.12-slim mcp-runner-python:latest \
        || echo "WARNING: python executor image unavailable; python executions may fail."
fi

echo "Starting MCP Workspace server..."
exec node dist/index.js