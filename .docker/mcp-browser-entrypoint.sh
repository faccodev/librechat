#!/bin/sh
# Entrypoint wrapper: fix ownership of bind-mounted dirs before launching
# the MCP server. Required because Docker named volumes are created as
# root:root and the Puppeteer process runs as pptruser (uid 10042), which
# would otherwise fail to create SingletonLock and every browser launch
# would error with "Permission denied (13)".
set -e

# Ensure the user-data-dir and output-dir exist and are owned by pptruser.
mkdir -p /ms-browser /ms-browser/output
chown -R 10042:999 /ms-browser

# Drop privileges and exec the original MCP server with the args compose
# passed. `exec` replaces this shell so signals (SIGTERM from docker stop)
# reach the node process directly.
exec su-exec 10042:999 "$@"
