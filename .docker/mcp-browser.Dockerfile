# mcp-browser — @agent-infra/mcp-server-browser (ByteDance UI-TARS)
# Based on the upstream Dockerfile.http, but with no hardcoded ENTRYPOINT
# so docker-compose's `command:` controls transport/host/port/flags.
# Upstream: https://github.com/bytedance/UI-TARS-desktop/blob/main/packages/agent-infra/mcp-servers/browser/Dockerfile.http
FROM node:22-bookworm-slim

ENV LANG=en_US.UTF-8 \
    PPTRUSER_UID=10042 \
    PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    PUPPETEER_SKIP_DOWNLOAD=true \
    DBUS_SESSION_BUS_ADDRESS=autolaunch: \
    NODE_ENV=production

# System deps + Google Chrome stable. The apt-get lines mirror upstream so
# we get the same font/CJK/dbus support that Puppeteer needs to render real
# pages (especially the chinese/japanese fonts the upstream ships with).
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
         wget gnupg ca-certificates fonts-ipafont-gothic fonts-wqy-zenhei \
         fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 \
         dbus dbus-x11 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub \
         | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
         >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Non-root user matching upstream so the bind-mounted browser_profile volume
# stays owned by a stable UID across host rebuilds.
RUN groupadd -r pptruser && useradd -u ${PPTRUSER_UID} -rm -g pptruser -G audio,video pptruser

WORKDIR /home/pptruser

# Puppeteer + global install of the MCP server. `--unsafe-perm` is required
# for `npm install -g` to drop a symlink in /usr/local/bin when running as
# the non-root pptruser in some Docker setups.
RUN npm install puppeteer puppeteer-core @puppeteer/browsers \
    && npm install -g @agent-infra/mcp-server-browser@latest --unsafe-perm

USER ${PPTRUSER_UID}
WORKDIR /home/pptruser

# Pre-create the dirs that compose mounts as a named volume, so the volume
# inherits correct ownership on first attach. Without this, the volume is
# created by Docker as root:root and pptruser (uid 10042) can't write the
# Chrome SingletonLock — every browser launch fails with
# "Failed to create /ms-browser/SingletonLock: Permission denied (13)".
RUN mkdir -p /ms-browser /ms-browser/output \
    && chown -R ${PPTRUSER_UID}:${PPTRUSER_UID} /ms-browser

# No ENTRYPOINT — compose's `command:` drives the args. This avoids the
# upstream's `ENTRYPOINT [..., "--port", "8088"]` swallowing our overrides.
EXPOSE 8931
