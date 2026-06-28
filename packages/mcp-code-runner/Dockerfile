FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

FROM node:20-alpine

# Install Docker CLI in order to execute docker commands from inside this container
RUN apk add --no-cache docker-cli

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY scripts/pull-images.sh ./scripts/pull-images.sh
RUN chmod +x ./scripts/pull-images.sh
# The executors/ directory holds Dockerfile.{alpine,node,python} that
# pull-images.sh builds into the per-language runner images at startup.
# Without this COPY, the script's $EXECUTORS_DIR=/app/executors resolves
# to a missing path, every local build fails with "path not found", and
# the script silently falls back to the upstream base images — which
# do not include git. That fallback is what made `git --version` return
# exit 127 from `run_code` despite commit 1837960 supposedly baking
# git into the executor.
COPY executors ./executors

EXPOSE 8932

ENTRYPOINT ["./scripts/pull-images.sh"]
