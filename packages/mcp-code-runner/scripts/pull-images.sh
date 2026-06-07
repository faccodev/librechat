#!/bin/sh

echo "Pre-pulling required Docker runner execution images..."
docker pull node:20-alpine || echo "Failed to pull node:20-alpine, execution might download it on demand."
docker pull python:3.12-slim || echo "Failed to pull python:3.12-slim, execution might download it on demand."
docker pull alpine:latest || echo "Failed to pull alpine:latest, execution might download it on demand."

echo "Starting MCP Code Runner server..."
exec node dist/index.js
