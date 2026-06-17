import duckduckgo_mcp_server.server as srv
import inspect

src = inspect.getsource(srv.main)
lines = src.splitlines()
print(f"=== main() total {len(lines)} lines ===")
for i, line in enumerate(lines, 1):
    print(f"{i:3} {line}")
