#!/bin/sh
set -e

echo "[entrypoint] Running Prisma migrations..."
npx prisma migrate deploy

echo "[entrypoint] Starting server..."
exec node dist/index.js --http --port "${PORT:-3000}"
