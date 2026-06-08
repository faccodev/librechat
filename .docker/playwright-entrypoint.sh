#!/bin/sh
# Playwright MCP entrypoint — garante que o browser `chrome-for-testing`
# está instalado antes de iniciar o server. Idempotente: só baixa se faltar.
# Persiste via volume `playwright_profile` montado em /ms-playwright.
set -e
echo "[entrypoint] Verifying chrome-for-testing browser..."
npx --yes @playwright/mcp install-browser chrome-for-testing 2>&1 | tail -3
echo "[entrypoint] Browser ready, starting MCP server..."
# Handoff to the original entrypoint behavior — exec replaces the shell
# so signals (SIGTERM, etc) propagate to the Node process.
exec node /app/cli.js "$@"
