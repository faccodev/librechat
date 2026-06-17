"""Launcher for duckduckgo-mcp-server that disables FastMCP transport security.

The upstream CLI does not expose a way to disable DNS rebinding protection.
By default FastMCP 1.x rejects requests whose ``Host`` header is not
``127.0.0.1`` or ``localhost`` (returning HTTP 421 Misdirected Request),
which breaks container-to-container calls inside the Coolify / docker-compose
network where the api container sends ``Host: mcp-search:8933``.

Widening ``allowed_hosts`` to ``["*"]`` is **not** enough on its own: the
underlying ``_validate_host`` method does literal string matching and only
recognises ``host:*`` port-suffix patterns, not a bare ``"*"``. The actual
fix is to set ``enable_dns_rebinding_protection=False`` so the entire host
/ origin validation block is skipped.

This launcher imports the package's server module, swaps in a permissive
``TransportSecuritySettings`` instance, and then delegates to the package's
own ``main()`` so any future CLI flag added upstream keeps working unchanged.

The listener is bound to ``0.0.0.0`` inside an isolated container network
namespace, so disabling rebinding protection only affects peers on the
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
        # The host/origin allowlist only matches exact entries or `host:*`
        # port-suffix patterns; it does NOT treat a bare `*` as a wildcard.
        # Since this container only listens to the internal Docker network,
        # DNS rebinding protection is unnecessary and rejecting requests with
        # `Host: mcp-search:8933` would break the api container's MCP calls.
        enable_dns_rebinding_protection=False,
    )


def main() -> int:
    _patch_transport_security()

    import duckduckgo_mcp_server.server as srv

    return srv.main()


if __name__ == "__main__":
    sys.exit(main())
