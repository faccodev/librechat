"""Launcher for duckduckgo-mcp-server that relaxes FastMCP transport security.

The upstream CLI does not expose a way to widen the Streamable HTTP host
allowlist. By default FastMCP rejects requests whose ``Host`` header is not
``127.0.0.1`` or ``localhost`` (returning HTTP 421 Misdirected Request), which
breaks container-to-container calls inside the Coolify / docker-compose
network where the api container sends ``Host: mcp-search:8933``.

This launcher imports the package's server module, swaps in a permissive
``TransportSecuritySettings`` instance, and then delegates to the package's
own ``main()`` so any future CLI flag added upstream keeps working unchanged.

The listener is bound to ``0.0.0.0`` inside an isolated container network
namespace, so widening the allowlist to ``"*"`` only affects peers on the
same docker network.
"""

from __future__ import annotations

import sys


def _patch_transport_security() -> None:
    """Replace the package's transport security with permissive settings."""
    import duckduckgo_mcp_server.server as srv

    try:
        from mcp.server.transport_security import TransportSecuritySettings
    except ImportError:  # older mcp lib layout
        from mcp.server.fastmcp import TransportSecuritySettings

    srv.mcp.settings.transport_security = TransportSecuritySettings(
        allowed_hosts=["*"],
        allowed_origins=["*"],
    )


def main() -> int:
    _patch_transport_security()

    import duckduckgo_mcp_server.server as srv

    return srv.main()


if __name__ == "__main__":
    sys.exit(main())
