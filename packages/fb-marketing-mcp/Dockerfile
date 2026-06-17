# ── Build stage ──
FROM node:20-alpine AS builder
WORKDIR /app

ARG RAILWAY_GIT_COMMIT_SHA
RUN echo "build: ${RAILWAY_GIT_COMMIT_SHA:-local}"

COPY package*.json ./
RUN npm ci

COPY prisma/ ./prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# ── Production stage ──
FROM node:20-alpine
WORKDIR /app

ARG RAILWAY_GIT_COMMIT_SHA
RUN echo "deploy: ${RAILWAY_GIT_COMMIT_SHA:-local}"

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma/ ./prisma/
COPY prisma.config.ts ./

COPY --from=builder /app/dist/ ./dist/
COPY docs/ ./docs/
COPY scripts/docker-entrypoint.sh ./docker-entrypoint.sh
# Fix: two bugs in the upstream Dockerfile that surface on Windows checkouts.
# (a) The entrypoint isn't chmod +x, so tini fails with the misleading
#     "No such file or directory" on hosts where git doesn't preserve the
#     executable bit.
# (b) On Windows with `core.autocrlf=true` the source is CRLF. The shebang
#     `#!/bin/sh\r\n` makes the kernel look for `/bin/sh\r` which doesn't
#     exist — same misleading "No such file or directory" from tini.
# Normalize line endings first, then make executable. Both fixes are
# no-ops on LF/non-Windows hosts.
RUN sed -i 's/\r$//' ./docker-entrypoint.sh && chmod +x ./docker-entrypoint.sh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-3000}/health || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
