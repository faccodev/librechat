#!/usr/bin/env python3
"""
mcp-transcribe — MCP server wrapping faster-whisper REST API.

Tools exposed:
  - transcribe_file(path, language?)  → transcribe a local file (absolute or /workspaces/*)
  - transcribe_url(url, language?)    → download URL → transcribe
  - list_models()                     → show which faster-whisper model is loaded

Transports:
  - stdio (default) for local stdio consumers
  - streamable-http on --host/--port for LibreChat / docker MCP integration
"""
import argparse
import asyncio
import logging
import os
import sys
import time
from pathlib import Path
from typing import Optional

import httpx
from mcp.server.fastmcp import FastMCP

# Backend faster-whisper REST URL (override via env if needed)
FASTER_WHISPER_URL = os.environ.get("FASTER_WHISPER_URL", "http://mcp-faster-whisper:9000")
DEFAULT_LANGUAGE = os.environ.get("FASTER_WHISPER_LANGUAGE", "pt")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("mcp-transcribe")

mcp = FastMCP("transcribe")


def _post_transcribe(file_bytes: bytes, filename: str, language: str = DEFAULT_LANGUAGE) -> dict:
    """POST to /asr on faster-whisper, return the JSON response."""
    url = f"{FASTER_WHISPER_URL}/asr"
    params = {"task": "transcribe", "language": language, "output": "json"}
    files = {
        "audio_file": (filename, file_bytes, "application/octet-stream"),
    }
    log.info("Calling faster-whisper: file=%s lang=%s size=%d", filename, language, len(file_bytes))
    t0 = time.time()
    with httpx.Client(timeout=300) as client:
        r = client.post(url, params=params, files=files)
    log.info("faster-whisper responded in %.1fs with status %d", time.time() - t0, r.status_code)
    r.raise_for_status()
    return r.json()


@mcp.tool()
def transcribe_file(path: str, language: str = DEFAULT_LANGUAGE) -> dict:
    """Transcribe a local audio/video file using faster-whisper.

    Args:
        path: Absolute path or /workspaces/relative path. Supports mp3, wav, m4a, ogg, flac, mp4, webm.
        language: ISO 639-1 code (pt, en, es, ja, ...). Default: pt.

    Returns:
        dict with: text (the transcript), language, duration (seconds), segments (per-sentence)
    """
    p = Path(path).expanduser()
    if not p.exists():
        return {"error": f"file not found: {path}"}
    if not p.is_file():
        return {"error": f"not a file: {path}"}
    data = p.read_bytes()
    resp = _post_transcribe(data, p.name, language)
    return {
        "file": str(p),
        "size_bytes": len(data),
        "text": resp.get("text", "").strip(),
        "language": resp.get("language", language),
        "duration": resp.get("duration", None),
        "segments": resp.get("segments", []),
    }


@mcp.tool()
def transcribe_url(url: str, language: str = DEFAULT_LANGUAGE) -> dict:
    """Download an audio/video file from a URL and transcribe it.

    Args:
        url: http(s) URL pointing at an audio/video file. Supports direct file links
             (e.g. https://example.com/episode.mp3) and CDN-backed media.
        language: ISO 639-1 code. Default: pt.

    Returns:
        dict with: text, language, duration, segments, source_url
    """
    log.info("Downloading %s", url)
    with httpx.Client(timeout=300, follow_redirects=True) as client:
        r = client.get(url)
        r.raise_for_status()
        data = r.content
        filename = url.rsplit("/", 1)[-1] or "audio"
    log.info("Downloaded %d bytes", len(data))
    resp = _post_transcribe(data, filename, language)
    return {
        "source_url": url,
        "size_bytes": len(data),
        "text": resp.get("text", "").strip(),
        "language": resp.get("language", language),
        "duration": resp.get("duration", None),
        "segments": resp.get("segments", []),
    }


@mcp.tool()
def list_models() -> dict:
    """Return which faster-whisper model and config is currently loaded."""
    with httpx.Client(timeout=10) as client:
        try:
            r = client.get(f"{FASTER_WHISPER_URL}/")
            r.raise_for_status()
            return r.json()
        except Exception as e:
            return {"error": str(e), "url": FASTER_WHISPER_URL}


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--host", default="0.0.0.0")
    p.add_argument("--port", type=int, default=8934)
    p.add_argument("--transport", choices=["stdio", "streamable-http"], default="streamable-http")
    args = p.parse_args()

    log.info("Starting mcp-transcribe → %s on %s:%d (%s)", FASTER_WHISPER_URL, args.host, args.port, args.transport)
    if args.transport == "stdio":
        mcp.run(transport="stdio")
    else:
        mcp.settings.host = args.host
        mcp.settings.port = args.port
        mcp.run(transport="streamable-http")
