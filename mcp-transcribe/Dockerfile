# mcp-transcribe — Python MCP wrapper around faster-whisper REST.
# Installs httpx + mcp SDK and runs the server. Started by docker compose.
FROM python:3.12-slim

WORKDIR /app

# Only need the MCP SDK + httpx to call faster-whisper's /asr endpoint.
RUN pip install --no-cache-dir mcp httpx

COPY server.py /app/server.py

ENV FASTER_WHISPER_URL=http://mcp-faster-whisper:9000
ENV FASTER_WHISPER_LANGUAGE=pt

EXPOSE 8934

CMD ["python", "/app/server.py", "--transport", "streamable-http", "--host", "0.0.0.0", "--port", "8934"]
