# Proposal: External Catalog — MCP Registry + Skill Import + Chat Intent

> Status: **approved, in progress** · Scope: LibreChat v0.x (next minor) ·
> Strategy: 3 sequential PRs · Authors: Mavis (under request of @danilofacco)

---

## 1. Summary

LibreChat gains the ability to discover, install, and use external MCP servers
and Skills from public catalogs — both for admins (global) and end-users
(per-user) — plus a lightweight chat intent that lets users say things like
"connect the GitHub MCP" and get routed to the install flow without typing
a slash command.

Three deliverable PRs, sequential, single contributor:

| PR  | Trilha     | Deliverable                                                       | Estimate |
|-----|------------|-------------------------------------------------------------------|----------|
| 1   | A + B      | MCP Registry browse (admin + user) + user install wizard          | 8 days   |
| 2   | C          | Skill import from any git URL                                     | 3 days   |
| 3   | D          | Chat intent detection (regex-based) for "install MCP X"           | 2 days   |
| **Total** |       |                                                                   | **13 days** |

User decisions baked in:
- A + B share the same catalog UI (one infrastructure, two surfaces)
- User installs: **remote transports only** (sse, streamable-http, websocket). Stdio stays admin-only.
- Skill import: **any git URL** with safeguards (URL allowlist for HTTP fallback; size + timeout cap for clone)
- Chat intent: **regex/keywords local detection** (no LLM classifier, no tool calling in chat loop)

---

## 2. PR 1 — MCP Registry browse + User install wizard

### 2.1 Goals

- Surface the Official MCP Registry (`registry.modelcontextprotocol.io`, v0.1
  API freeze since 2025-10-24) inside LibreChat.
- Two consumer surfaces:
  - **Admin** (`MCPIntegrationsPanel` → new "Browse Registry" tab): pre-fill
    the existing JSON editor with a converted `MCPOptions` config.
  - **User** (new "Add MCP" wizard in the MCP side panel): pre-fill the
    existing user-MCP creation form.
- Reuse 100% of existing credential plumbing
  (`mcpCredentials.ts`, `MCPConfigDialog`) and existing user-MCP CRUD
  (`createMCPServerController`, `MCPServerUserInputSchema`).
- No stdio for users (Trilha B v1): only sse / streamable-http / websocket
  transports are surfaced to the user wizard; stdio entries show a
  "Manual install required (admin only)" badge with a deep-link to the
  docs.

### 2.2 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ Browser                                                         │
│                                                                 │
│  Admin path:                                                    │
│   MCPIntegrationsPanel ─┬─ [ Custom ]   (existing)              │
│                         └─ [ Browse Registry ] (NEW)             │
│                            └── Card grid → drawer → "Install"   │
│                                → opens Custom tab pre-filled     │
│                                                                 │
│  User path:                                                     │
│   MCPServers side panel → "+ Add MCP" button (NEW)              │
│      └── Wizard step 1: source picker                           │
│          ├── Browse Registry (reuses admin RegistryTab)         │
│          ├── Manual config (JSON, current MCPServerUserInput)   │
│          └── Paste URL (auto-detect from registry-shaped URL)    │
│      └── Wizard step 2: required env vars / OAuth fields        │
│      └── Wizard step 3: review + Save → POST /api/mcp/servers   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ LibreChat API (Express)                                         │
│                                                                 │
│  api/server/routes/admin/mcpRegistry.js (NEW)                   │
│    GET  /api/admin/mcp-registry/servers?search&cursor&limit     │
│    GET  /api/admin/mcp-registry/servers/:name                   │
│    POST /api/admin/mcp-registry/servers/:name/preview           │
│    (all gated by requireJwtAuth + requireAdminAccess)            │
│                                                                 │
│  packages/api/src/mcp/registry/  (NEW, TS)                      │
│    client.ts    – fetch wrapper (5min LRU, UA, timeout, retry)  │
│    adapter.ts   – ServerJSON → LibreChat MCPOptions             │
│    cache.ts     – TTL LRU                                       │
│    types.ts     – strict types for the v0.1 schema              │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS
                              ▼
                https://registry.modelcontextprotocol.io/v0/...
```

### 2.3 Feature flag

`MCP_REGISTRY_ENABLED` (default `false`). When disabled:
- Browse Registry tab hidden.
- User wizard hides the "Browse Registry" source option.
- Proxy returns 404.

### 2.4 Caching & rate limits

- 5-min in-memory LRU keyed by `(search, cursor, limit)` and `name`.
- Server-side only; client never sees the upstream URL.
- Max 50 items per page.
- `User-Agent: LibreChat/<version>`.
- 5s upstream timeout, single retry on 5xx (no retry on 4xx).
- Failures **never** crash the UI — surface toast + degrade to existing
  Custom tab.

### 2.5 Adapter rules (ServerJSON → MCPOptions)

| Registry field                      | LibreChat `MCPOptions`                                     |
|--------------------------------------|------------------------------------------------------------|
| `remotes[type=streamable-http]`     | `{ type: 'streamable-http', url }`                         |
| `remotes[type=sse]`                 | `{ type: 'sse', url }`                                     |
| `remotes[type=websocket]`           | `{ type: 'websocket', url }`                               |
| `remotes` empty (stdio-only pkg)    | reject: "Manual install required, admin only" hint         |
| `packages[npm/pypi/oci]`            | no auto-conversion in v1; show repo link                   |
| multiple remotes                    | drawer dropdown picks one (default: first streamable-http)  |
| `repository.url`                    | `description` fallback                                     |
| required env vars                   | surfaced as placeholder chips in drawer (names only)        |
| OAuth required (description heuristic, see 2.6) | prefill `oauth: { client_id: '' }`, mark wizard step 2 as OAuth |

Adapter returns `MCPOptionsSchema.parse()`-validated object. Parse failure
marks the card "Preview unavailable" with the truncated error.

### 2.6 OAuth detection heuristic (temporary)

Registry v0.1 doesn't carry OAuth metadata yet. v1 heuristic:

```ts
function looksLikeOAuth(description: string): boolean {
  return /\boauth\b|\bauthorize\b|\bauth flow\b/i.test(description);
}
```

If matched, the drawer shows an OAuth badge and wizard step 2 includes an
OAuth client_id/secret pair. v2 (post-registry `_meta.oauth`): replace
with official metadata.

### 2.7 User wizard specifics (Trilha B)

- Entry point: `+ Add MCP` button in `MCPServers` sidebar (parity with
  existing `+ Create Skill`).
- Source picker step:
  - **Browse Registry** (reuses the admin RegistryTab in read-only mode)
  - **Manual config** (current JSON editor, no behavioral change)
  - **Paste URL** (best-effort: if URL matches registry-shaped
    `https://registry.modelcontextprotocol.io/v0/servers/<name>`, treat
    as registry link; else show "manual install" hint)
- Required env var step: chips with `MY_API_KEY` placeholders, sensitive
  fields masked behind `Show/Hide` (existing pattern).
- OAuth step: only if detected; collects `client_id` + `client_secret`,
  saved via existing `mcpCredentials`.
- Review step: shows final config JSON before save; submit hits
  `POST /api/mcp/servers` (existing controller, no changes).
- **Forbidden by construction**: user cannot pick stdio transports
  (filtered out at the wizard source). The OBO gate
  (`CONFIGURE_OBO` permission) remains enforced by the existing
  controller.

### 2.8 New files (PR 1)

- `packages/api/src/mcp/registry/client.ts`
- `packages/api/src/mcp/registry/adapter.ts`
- `packages/api/src/mcp/registry/cache.ts`
- `packages/api/src/mcp/registry/types.ts`
- `packages/api/src/mcp/registry/__tests__/adapter.spec.ts`
- `packages/api/src/mcp/registry/__tests__/client.spec.ts`
- `api/server/routes/admin/mcpRegistry.js`
- `api/server/routes/admin/mcpRegistry.spec.js`
- `client/src/data-provider/MCP/registry/queries.ts`
- `client/src/data-provider/MCP/registry/index.ts`
- `client/src/data-provider/MCP/registry/__tests__/queries.spec.ts`
- `client/src/components/Admin/MCPIntegrations/RegistryTab.tsx`
- `client/src/components/Admin/MCPIntegrations/RegistryCard.tsx`
- `client/src/components/Admin/MCPIntegrations/RegistryDrawer.tsx`
- `client/src/components/Admin/MCPIntegrations/RegistrySearchInput.tsx`
- `client/src/components/Admin/MCPIntegrations/__tests__/RegistryCard.spec.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/AddMCPWizard.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/SourcePicker.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/EnvVarsStep.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/OAuthStep.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/ReviewStep.tsx`
- `client/src/components/SidePanel/MCP/AddMCP/__tests__/AddMCPWizard.spec.tsx`
- `client/src/hooks/MCP/__tests__/useMCPInstallIntent.test.ts` (added in PR 3)

### 2.9 Modified files (PR 1)

- `client/src/components/Admin/MCPIntegrationsPanel.tsx` — add tab bar.
- `client/src/components/SidePanel/MCP/MCPServers.tsx` (or equivalent) —
  add "+ Add MCP" button.
- `client/src/data-provider/MCP/index.ts` — re-export new hooks.
- `packages/data-provider/src/keys.ts` — add registry query keys.
- `packages/data-provider/src/api-endpoints.ts` — add registry endpoint
  constants.
- `packages/data-provider/src/types/mcpIntegrations.ts` — response types.
- `api/server/routes/admin/index.js` — mount new router.
- `api/config/index.js` — read `MCP_REGISTRY_ENABLED`.
- `.env.example` — document the flag.
- `client/src/locales/en/translation.json` — ~25 new keys.
- `docs/configuration/mcp_integrations.md` — new section.
- `package.json` (root) — add `simple-git` (used in PR 2; declared here
  to land one dep change).

### 2.10 i18n keys (PR 1, English only — others auto-translated externally)

```
com_admin_mcp_registry_tab_label
com_admin_mcp_registry_search_placeholder
com_admin_mcp_registry_empty
com_admin_mcp_registry_error_unavailable
com_admin_mcp_registry_load_more
com_admin_mcp_registry_install_button
com_admin_mcp_registry_required_env_vars
com_admin_mcp_registry_oauth_required
com_admin_mcp_registry_no_remote_transport
com_admin_mcp_registry_preview_unavailable
com_admin_mcp_registry_transport_sse
com_admin_mcp_registry_transport_streamable_http
com_admin_mcp_registry_transport_websocket
com_user_mcp_add_button
com_user_mcp_wizard_step_source
com_user_mcp_wizard_step_env
com_user_mcp_wizard_step_oauth
com_user_mcp_wizard_step_review
com_user_mcp_wizard_source_browse
com_user_mcp_wizard_source_manual
com_user_mcp_wizard_source_url
com_user_mcp_wizard_save
com_user_mcp_wizard_cancel
com_user_mcp_wizard_stdio_blocked
```

### 2.11 Security review (PR 1)

- All new routes behind existing `requireAdminAccess`.
- Registry upstream is public; no auth headers forwarded.
- Adapter never receives secret values, only env var names (public
  metadata).
- No client-side fetch to upstream — proxy only.
- CSP unchanged.
- User MCP wizard inherits existing OBO lockdown
  (`OBO_USER_EDITABLE_FIELDS`) — stdio blocks at the source picker.
- User MCP wizard uses existing redaction (`redactServerSecrets`) before
  displaying current values.

### 2.12 Estimate (PR 1)

| Sub-area                                         | Days  |
|--------------------------------------------------|-------|
| Adapter + client + cache + types + tests         | 2.0   |
| Express proxy routes + tests                     | 0.5   |
| Frontend queries + types                         | 0.5   |
| Admin RegistryTab (cards, drawer, search)        | 1.5   |
| User AddMCP wizard (4 steps, validation)         | 2.0   |
| i18n keys                                        | 0.25  |
| Docs                                             | 0.25  |
| Manual smoke (docker-compose, install inference.sh end-to-end) | 0.5   |
| **PR 1 total**                                   | **~7.5** |

(Original A-only estimate was 6.5; B adds ~1.5 absorbed by shared UI.)

---

## 3. PR 2 — Skill import from any git URL (Trilha C)

### 3.1 Goals

- "Import from URL" option in the user Skills side panel.
- Paste any git URL → fetch `SKILL.md` files → preview → save as user's
  own Skill (per-user storage in existing `Skill` model).
- Support GitHub / GitLab / Bitbucket via HTTP API (no clone).
- Fallback to `simple-git` shallow clone for any other git host.

### 3.2 Allowed sources

- Any `https://` git URL with a recognized or unknown host (no SSH, no
  `git://`).
- Blocked: `localhost`, `127.0.0.1`, private RFC1918 ranges, link-local,
  loopback. Enforced at the URL parser, before any network call.
- Max 10 MB total payload per request (HTTP API mode).
- 30s timeout.

### 3.3 Architecture

```
POST /api/skills/import
  body: { url: string, ref?: string, path?: string }
  flow:
    1. URL validation (allowlist + private IP block)
    2. Host detection
       - github.com  → GET /repos/{owner}/{repo}/contents/{path}
       - gitlab.com  → GET /api/v4/projects/{path-encoded}/repository/tree
       - bitbucket.org → GET /2.0/repositories/{workspace}/{repo}/src/main/{path}
       - else        → simple-git shallow clone (--depth 1)
    3. Walk tree, find SKILL.md files (depth-1 + depth-2 catalog, mirror npx skills spec)
    4. Validate frontmatter (name, description required)
    5. Return preview list → user picks → POST /api/skills/import/{id}/save
```

### 3.4 Security

- All sources fetched server-side only.
- Clone target is a tmp dir under `os.tmpdir()` (auto-cleaned on save or
  1h TTL).
- SKILL.md content is parsed but **never executed**. No `bin/`, no
  hooks, no scripts read into execution paths.
- Frontmatter validated via `zod` schema before save.
- Imported skill stored with `metadata: { source: { url, ref, importedAt } }`
  for traceability and future re-update flow.

### 3.5 New files (PR 2)

- `packages/api/src/skills/import/{resolver,fetchers,validator,types}.ts`
- `packages/api/src/skills/import/fetchers/{github,gitlab,bitbucket,generic}.ts`
- `packages/api/src/skills/import/__tests__/resolver.spec.ts`
- `packages/api/src/skills/import/__tests__/validator.spec.ts`
- `api/server/routes/skills/import.js`
- `api/server/routes/skills/import.spec.js`
- `client/src/components/Skills/dialogs/ImportSkillDialog.tsx`
- `client/src/components/Skills/dialogs/__tests__/ImportSkillDialog.spec.tsx`
- `client/src/data-provider/Skills/import/queries.ts`

### 3.6 Modified files (PR 2)

- `client/src/components/Skills/sidebar/SkillsSidePanel.tsx` — add
  "Import from URL" entry to `+ Create` menu.
- `client/src/locales/en/translation.json` — ~8 new keys.
- `docs/features/skills.md` — new section.

### 3.7 Estimate (PR 2)

| Sub-area                                  | Days |
|-------------------------------------------|------|
| Resolver + host detection + URL safety    | 0.5  |
| GitHub fetcher                            | 0.25 |
| GitLab fetcher                            | 0.25 |
| Bitbucket fetcher                         | 0.25 |
| Generic clone fetcher (simple-git)        | 0.5  |
| Frontmatter validator                     | 0.25 |
| Express route + spec                      | 0.25 |
| ImportSkillDialog UI                      | 0.5  |
| Tests                                     | 0.25 |
| i18n + docs                               | 0.25 |
| **PR 2 total**                            | **~3** |

---

## 4. PR 3 — Chat intent detection for MCP install (Trilha D)

### 4.1 Goal

Detect "install MCP X" intent in chat input **before submit**, and route
the user to the existing AddMCP wizard pre-filled with the detected name.

### 4.2 Approach: regex/keywords local (D1, user-approved)

Pure-client, no LLM call, no chat loop changes.

**Detection regex** (PT + EN, simple patterns):

```ts
const INSTALL_INTENT_PATTERNS = [
  /\b(?:conecta|conectar|instala|instalar|adiciona|adicionar|cria|criar)\s+(?:o\s+)?(?:mcp|servidor|server)\s+(?:do\s+|da\s+|de\s+|from\s+)?([a-z0-9_.-]+)/i,
  /\b(?:add|install|connect|create)\s+(?:the\s+)?(?:mcp\s+)?(?:server\s+)?([a-z0-9_.-]+)/i,
  /\b(?:mcp\s+)?(?:connect|install)\s+([a-z0-9_.-]+)/i,
];
```

**Flow:**
1. `useChatSubmit` hook reads input.
2. If any pattern matches AND the captured name isn't already a
   configured server, intercept submission.
3. Open `AddMCPWizard` with `initialSource: 'browse-registry'` and
   `initialQuery: <captured name>`.
4. Suppress the actual chat message (don't send it).
5. If the user cancels the wizard, restore the input text.

### 4.3 False-positive controls

- Only intercept if length of captured name ∈ [2, 64] and matches
  `^[a-z0-9][a-z0-9_.-]*$`.
- Skip interception if the user is mid-conversation (input length > 200
  chars — assume it's a real message, not a command).
- Add a `librechat.yaml` flag `MCP_CHAT_INTENT: true` (default `false`
  for v1) so admins can disable globally.
- First-time-use toast: "Tip: you can also say things like 'install MCP
  github' to launch the wizard."

### 4.4 New files (PR 3)

- `client/src/hooks/MCP/useMCPInstallIntent.ts`
- `client/src/hooks/MCP/__tests__/useMCPInstallIntent.test.ts`
- `client/src/utils/intents/mcpInstallPatterns.ts`
- `client/src/utils/intents/__tests__/mcpInstallPatterns.test.ts`

### 4.5 Modified files (PR 3)

- `client/src/hooks/Chat/useChatSubmit.ts` (or equivalent entry point)
  — add the intent interception.
- `client/src/locales/en/translation.json` — 2-3 keys.
- `docs/features/chat_intents.md` (new doc).

### 4.6 Estimate (PR 3)

| Sub-area                                | Days  |
|-----------------------------------------|-------|
| Pattern definitions + tests             | 0.5   |
| useMCPInstallIntent hook + tests        | 0.5   |
| Chat submit integration                 | 0.5   |
| Feature flag + i18n + docs              | 0.25  |
| Manual QA (real chat scenarios)         | 0.25  |
| **PR 3 total**                          | **~2**|

---

## 5. Cross-cutting

### 5.1 Dependencies added

- `simple-git` (^11, MIT) — added in PR 1 even though only used in PR 2,
  to land one `package.json` change.

### 5.2 Config flags introduced

| Flag                          | Default | Scope |
|-------------------------------|---------|-------|
| `MCP_REGISTRY_ENABLED`        | `false` | server |
| `MCP_CHAT_INTENT`             | `false` | server (yaml) |

### 5.3 Telemetry

No PII leaves the server in any PR. We log only:
- PR 1: count of registry calls + cache hit/miss (debug level).
- PR 2: count of import attempts + host type (info level).
- PR 3: count of intercepted intents (debug level, only if feature on).

### 5.4 Rollout

Each PR ships behind its feature flag (`false`). After merge:
1. Enable in dev (docker-compose) → dogfood 1 week.
2. Enable in staging.
3. Flip default to `true` in the next minor release.
4. Document in release notes.

---

## 6. Open items (carry into PR review)

- Watch for registry `_meta.oauth` field landing — Trilha B OAuth
  heuristic can be replaced.
- Watch for `simple-git` LTS status (last release Apr 2026, active).
- Coordinate with whoever owns Skills per-user model
  (`packages/data-schemas/src/models/skill.ts`) for storage assumptions.

---

## 7. Decision log

| Decision                                | Choice                          | Why                                    |
|-----------------------------------------|---------------------------------|----------------------------------------|
| Catalog UI shared between admin + user  | Yes (single component)          | Less code, consistent UX               |
| User MCP transports                     | remotes only (no stdio)         | Security (stdio runs server-side)      |
| Skill import sources                    | any git URL + private-IP block  | Matches user requirement               |
| Chat intent detection method            | regex/keywords local            | Predictable, debuggable, no LLM cost   |
| PR strategy                             | sequential (P2)                 | Smaller reviews, fewer conflicts       |
| Git fetch lib                           | simple-git + HTTP API fallback  | Fast for known hosts, generic fallback |