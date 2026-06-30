# Coolify / Linux VPS deployment

Production deployment guide for self-hosting LibreChat on a Linux VPS via [Coolify](https://coolify.io/) (or any plain Docker Compose host).

The repo ships **two** config files side-by-side:

| File | When to use |
| --- | --- |
| `librechat.yaml` | Local dev on Windows + Docker Desktop. Default. |
| `librechat_coolify.yaml` | Coolify / Linux VPS. Activated via the `CONFIG_PATH` env var. |

The `docker-compose.yml` is shared — it's already cross-platform (Linux paths, no Windows-specific mounts). You only need to flip the config file the api container reads.

---

## Quick start

### 1. Clone the repo on your VPS

```bash
cd /home/<user>/  # or wherever Coolify expects project sources
git clone <your-fork-url> librechat
cd librechat
cp .env.example .env
```

### 2. Set the production-only env vars

```bash
# Required for the api to load the Coolify-specific config
echo 'CONFIG_PATH=/app/librechat_coolify.yaml' >> .env

# All other keys (mongo, JWT, OPENAI_API_KEY, etc.) — fill per .env.example.
# On a fresh deploy, open .env and set:
#   - MEILI_MASTER_KEY, JWT_SECRET, JWT_REFRESH_SECRET (run `openssl rand -hex 32` 3x)
#   - CREDS_KEY, CREDS_IV (run `openssl rand -hex 32` and `openssl rand -hex 16`)
#   - DOMAIN_CLIENT and DOMAIN_SERVER to your public URL (e.g. https://chat.example.com)
#   - SESSION_COOKIE_SECURE=true (HTTPS in front)
#   - ALLOW_REGISTRATION=false if you want closed beta
```

### 3. Push to Coolify

In Coolify's UI:

1. **+ New Resource → Application → Private/Public Repository** (depending on your fork).
2. **Build Pack**: `Docker Compose`.
3. **Compose File Location**: `docker-compose.yml` (default — Coolify reads it as-is).
4. **Port Mapping**: expose `3080`. Coolify will assign a Traefik route automatically based on `coolify.managed=true` label.
5. **Environment Variables**: point Coolify at your `.env` (Coolify supports "dotenv" via the **Environment Variables** tab → "Load from .env file"). Or paste the vars inline.
6. **Persistent Storage**: by default Coolify creates **named volumes** for every service. That breaks the bind-mount on `/home/workspaces` (used by `api`, `mcp-browser`, `mcp-search`, `mcp-workspace`, `mcp-transcribe`, `rclone`). Two options:
   - **(a) Recommended — host bind mount**: in Coolify's "Persistent Storage" section for the `api` service, map `/home/workspaces` (host) → `/workspaces` (container). Same for the other services that bind `/workspaces`. Then on the host:
     ```bash
     sudo mkdir -p /home/workspaces && sudo chown 1000:1000 /home/workspaces
     ```
   - **(b) Named volume**: skip the host path, use a Docker named volume. Works, but the host's filesystem is no longer the source of truth — `rclone` can't sync a named volume to Drive without an extra layer.

7. **Deploy**. Coolify runs `docker compose build && docker compose up -d`. Watch the logs of the `api` service; you should see `librechat_coolify.yaml loaded` (or equivalent log line) once it's healthy.

### 4. Verify

```bash
# On the VPS
docker compose ps

# api should be (healthy) within ~90s
docker compose logs --tail 50 api

# Open in browser
curl -i https://chat.example.com/livez
# → 200 OK
```

---

## Differences from local dev

`librechat_coolify.yaml` differs from `librechat.yaml` in exactly 3 places:

1. **Built-in providers (`openAI`, `google`, `anthropic`) are not configured.** This is the "OmniRoute-only" deployment mode — the model selector exposes only the OmniRoute provider. If you want to re-enable a direct provider, copy the block from `librechat.yaml` into `librechat_coolify.yaml`.
2. **`actions.allowedDomains`** is kept minimal. On a public VPS you want fewer external domains the agent can fetch — fewer SSRF surface area.
3. **Header comments** call out the per-user identity forwarding to OmniRoute (X-User-Id / X-User-Email) — useful in multi-user production where you want per-user rate limits / audit.

Everything else is identical. If you add a new MCP server to `librechat.yaml` (local dev), copy the same block to `librechat_coolify.yaml` and redeploy.

---

## Files added / changed for Coolify

- **`librechat_coolify.yaml`** (new) — Coolify-specific LibreChat config. Activated via `CONFIG_PATH=/app/librechat_coolify.yaml`.
- **`docker-compose.yml`** (modified) — `api` service now mounts both `librechat.yaml` and `librechat_coolify.yaml`, and reads `CONFIG_PATH` from env (default: `/app/librechat.yaml`). Comment about `host.docker.internal` documents that it's Windows-only.
- **`scripts/up-with-profiles.sh`** (new) — Linux equivalent of `up-with-profiles.ps1`. Reads `ENABLE_OMNIROUTE` / `ENABLE_RCLONE` from `.env` and adds `--profile omniroute,rclone` accordingly.
- **`docs/coolify.md`** (this file) — production deploy guide.

---

## Optional services (OmniRoute, Rclone)

Both are off by default on Coolify, same as on local. To enable:

```bash
# In .env on the VPS
ENABLE_OMNIROUTE=true
OMNIROUTE_API_KEY=<paste the key from the OmniRoute dashboard>

# And/or
ENABLE_RCLONE=true
RCLONE_CONFIG_B64=<base64 of /home/<user>/.config/rclone/rclone.conf>
RCLONE_DRIVE_FOLDER_ID=<optional Google Drive folder ID>
```

Then redeploy via Coolify UI, or from the VPS CLI:

```bash
./scripts/up-with-profiles.sh --no-build
```

Coolify will pick up the new env vars and start the additional containers. See [docs/omniroute-and-rclone.md](./omniroute-and-rclone.md) for the full activation walkthrough.

---

## Updating the VPS deployment

```bash
cd /home/<user>/librechat
git pull

# If you changed librechat_coolify.yaml or librechat.yaml: no rebuild needed, just restart api.
docker compose restart api

# If you changed the api service (Dockerfile, packages/, etc.): rebuild.
docker compose build api && docker compose up -d api
```

For automatic rebuilds on push, set up a [Coolify webhook](https://coolify.io/docs/knowledge-base/webhooks) pointing at your git provider. Each push to `main` triggers a fresh build.

---

## Troubleshooting

**`api` keeps restarting with "Cannot find module /app/librechat_coolify.yaml"**
→ You didn't set `CONFIG_PATH=/app/librechat_coolify.yaml` in `.env`. Without it the api defaults to `/app/librechat.yaml` (the local-dev file), which the docker-compose doesn't actually mount on Coolify — wait, yes it does (both files are mounted). Check the `api` service's volume mount is `read-only` (`:ro` suffix would break the api at runtime — leave it read-write).
**Workspaces show empty in the UI but `mcp-workspace` can write to `/workspaces`**

→ The bind mount `/home/workspaces:/workspaces` only exists on the `api`, `mcp-browser`, `mcp-search`, `mcp-workspace`, `mcp-transcribe`, `rclone` services. If you added a new service that needs workspace access, copy the bind mount line.

**Traefik 502 Bad Gateway**
→ Coolify's Traefik routes to the `api` service via the `coolify.managed=true` label. If you removed that label accidentally, re-add it. Also check `docker compose logs api` — if the api is still booting (start_period: 90s), Traefik will return 502 until the healthcheck passes.

**`docker compose` works on the VPS but Coolify UI says "unhealthy"**
→ Coolify uses its own healthcheck, separate from the docker healthcheck. Configure the Coolify healthcheck to hit `http://api:3080/livez` (or use the same `wget` command as the docker healthcheck).

**Need to run a one-off command inside the api container?**
→ Coolify doesn't expose `docker exec` directly. SSH into the VPS:
```bash
docker compose exec api bash
```