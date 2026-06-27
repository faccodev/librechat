# OmniRoute + Rclone — Optional services

Two optional services that you can enable / disable via simple flags in `.env`. Both
default to **off** so a fresh `docker compose up` stays exactly as it was before
this change.

| Service | Flag | What it does |
| --- | --- | --- |
| **OmniRoute** | `ENABLE_OMNIROUTE=true` | AI gateway (231 providers, 50+ free) exposed as a regular LibreChat provider. Dashboard at `http://localhost:20128`. |
| **Rclone** | `ENABLE_RCLONE=true` | Bidirectional sync between the host's `workspaces/` folder and a Google Drive folder. |

Both flip with a single line edit + `docker compose up -d <service>`.

---

## 1. OmniRoute — free AI gateway as a LibreChat provider

### What you get
- A single OpenAI-compatible endpoint (`http://omniroute:20128/v1`) that fronts 231 providers (Claude, GPT, Gemini, Mistral, Groq, DeepSeek, 50+ free tiers).
- Auto-fallback (quota out → next provider), token compression, per-model routing.
- A LibreChat provider called **OmniRoute** that appears in the model selector like any other.

### Activate

1. Edit `.env` (copy `.env.example` first if you don't have one):

   ```env
   ENABLE_OMNIROUTE=true
   OMNIROUTE_API_KEY=replace-me-after-first-start
   ```

2. Start the new services:

   ```bash
   docker compose up -d omniroute-redis omniroute
   ```

3. Open the dashboard at **http://localhost:20128**, complete the onboarding (pick a username + password — the dashboard asks for one on first run), then go to **Settings → API Keys** and create a new key.

4. Paste that key into `.env`'s `OMNIROUTE_API_KEY=`.

5. Restart LibreChat so it picks up the new endpoint:

   ```bash
   docker compose restart api
   ```

6. In LibreChat, the **OmniRoute** provider shows up in the model selector. Pick a model from the dropdown (or use `auto` to let OmniRoute score providers live).

### Use from outside LibreChat (Claude Code, Cursor, Codex, etc.)

OmniRoute is a standard OpenAI-compatible endpoint. Point any tool at:

```
http://localhost:20128/v1
```

with the bearer token from step 3. The official OmniRoute docs (https://omniroute.online) have copy-paste setup snippets for each tool.

### Deactivate

```bash
# .env
ENABLE_OMNIROUTE=false
```

```bash
docker compose up -d   # redis + omniroute are skipped
docker compose down omniroute omniroute-redis   # stop the running containers (optional)
```

---

## 2. Rclone — bidirectional sync of `/home/workspaces` ↔ Google Drive

### What you get
- Every file in the host's `workspaces/` folder (the same path the LibreChat `api` and `mcp-code-runner` services mount) is kept in sync with a Google Drive folder.
- Edit locally → it goes up. Edit on Drive → it comes down. Conflicts resolved by `RCLONE_CONFLICT_POLICY` (default: `newest` wins).
- Runs as a sidecar container, no host-side rclone install needed.

### Activate — one-time setup

You only need ONE env var: `RCLONE_CONFIG_B64`, which is the base64 of any `rclone.conf` you already have (the one rclone stores at `%APPDATA%\rclone\rclone.conf` on Windows or `~/.config/rclone/rclone.conf` on Linux). The container decodes it on start, runs a reachability check on the remote, and starts the bisync loop.

#### a) Encode your existing `rclone.conf`

If you already have rclone installed and configured locally:

```powershell
# Windows PowerShell — copies to clipboard, paste into .env
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:APPDATA\rclone\rclone.conf")) | Set-Clipboard
```

```bash
# Linux / macOS / WSL — prints to stdout, paste into .env
base64 -w 0 ~/.config/rclone/rclone.conf
```

If you don't have rclone set up yet, install it from https://rclone.org/downloads/ and run `rclone config` to add a Drive remote first.

#### b) Fill `.env`

```env
ENABLE_RCLONE=true
RCLONE_CONFIG_B64=<paste the base64 blob here, single line>
RCLONE_REMOTE=gdrive                       # must match a [section] in your conf
# RCLONE_DRIVE_FOLDER_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz   # optional, see below
RCLONE_SYNC_INTERVAL=300
RCLONE_CONFLICT_POLICY=newest
WORKSPACES_HOST_PATH=/home/workspaces              # Linux VPS
# WORKSPACES_HOST_PATH=e:/Github/librechat/workspaces   # Windows + Docker Desktop
```

`WORKSPACES_HOST_PATH` MUST match the path used by the `api` service in `docker-compose.yml` (it's the same env var).

**Scoping to a specific Drive folder (optional)** — by default the sync covers the whole "Meu Drive" root. To limit it to one folder, paste the folder ID into `RCLONE_DRIVE_FOLDER_ID`. You can find it in the Drive web UI URL:

```
https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
                                       └──────── this part ────────┘
```

The entrypoint rewrites (or appends) the `root_folder_id` line in the decoded `rclone.conf` at every container start. Leave it empty to keep whatever your conf already says.

#### c) Start

```bash
docker compose --profile rclone up -d
```

Watch the first sync:

```bash
docker compose logs -f rclone
```

The first run logs `First run after metadata init — using --resync to build initial state`. Subsequent runs are silent unless something changes.

### Deactivate

```bash
# .env
ENABLE_RCLONE=false
```

```bash
docker compose up -d   # rclone container is skipped
docker compose down rclone   # optional — stops the running container
```

Your Drive folder is not touched when you disable — it stays exactly as it was. Re-enabling later picks up where it left off (the `.metadata/` lives in the `rclone_cache` named volume, so it survives a `down`).

---

## Tuning

| Var | Default | Notes |
| --- | --- | --- |
| `ENABLE_OMNIROUTE` | `false` | Toggle read by `scripts/up-with-profiles.ps1`. Sets `--profile omniroute`. |
| `OMNIROUTE_DASHBOARD_PORT` | `20128` | Host port for the web dashboard. |
| `OMNIROUTE_API_PORT` | `20129` | Host port for the upstream `/v1` API. |
| `OMNIROUTE_API_KEY` | _(unset)_ | Bearer token. Required for LibreChat to authenticate. |
| `ENABLE_RCLONE` | `false` | Toggle read by `scripts/up-with-profiles.ps1`. Sets `--profile rclone`. |
| `RCLONE_CONFIG_B64` | _(unset)_ | base64 of your full `rclone.conf` (any rclone-supported remote). |
| `RCLONE_REMOTE` | `gdrive` | Name registered inside the decoded rclone.conf. |
| `RCLONE_DRIVE_FOLDER_ID` | _(unset)_ | Drive folder ID to scope the sync. Empty = Drive root (or whatever the conf says). |
| `RCLONE_SYNC_INTERVAL` | `300` | Seconds between bisync runs. |
| `RCLONE_CONFLICT_POLICY` | `newest` | `newest` \| `oldest` \| `larger` \| `smaller`. |
| `WORKSPACES_HOST_PATH` | `/home/workspaces` | Must match the path used by the `api` service. |

### How the toggle actually works

`docker compose` profiles are the only first-class way to make a service opt-in. The
`ENABLE_*` flags in `.env` are a friendlier layer on top — `scripts/up-with-profiles.ps1`
reads them and adds `--profile omniroute,rclone` to `docker compose up` automatically.

If you prefer to manage the profile yourself, use `COMPOSE_PROFILES`:

```bash
# Bash / WSL
COMPOSE_PROFILES=omniroute,rclone docker compose up -d

# PowerShell
$env:COMPOSE_PROFILES = "omniroute,rclone"
docker compose up -d
```

---

## Files touched

- `docker-compose.yml` — added 3 services (`omniroute-redis`, `omniroute`, `rclone`) + 3 volumes. All gated by `profiles: ["omniroute"]` / `["rclone"]`.
- `librechat.yaml` — added the `omniroute` custom endpoint at the top of `endpoints.custom`.
- `.env.example` — appended the OmniRoute + Rclone sections.
- `scripts/rclone-entrypoint.sh` — new. Writes `rclone.conf` from the 4 env vars and runs the bisync loop.
- `scripts/up-with-profiles.ps1` — new. Reads `ENABLE_OMNIROUTE` / `ENABLE_RCLONE` from `.env` and adds the right `--profile` flags to `docker compose up`.