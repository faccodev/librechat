import duckduckgo_mcp_server.server as srv
import inspect

print("=== module top-level FastMCP-ish objects ===")
for n in dir(srv):
    if n.startswith("_"):
        continue
    obj = getattr(srv, n)
    cls = type(obj).__name__
    if cls in ("FastMCP", "Server") or "mcp" in n.lower():
        print(f"  {n}: {cls}")

print()
print("=== main signature ===")
print(inspect.signature(srv.main))

print()
print("=== main source (first 60 lines) ===")
src = inspect.getsource(srv.main)
for i, line in enumerate(src.splitlines()[:60], 1):
    print(f"{i:3} {line}")
