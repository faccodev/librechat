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

EXPOSE 8932

ENTRYPOINT ["./scripts/pull-images.sh"]
