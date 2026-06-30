# Project Workspace Path — Implementação (rev. Fase 0)

Adicionar um campo `workspacePath` em cada projeto para que ferramentas MCP (filesystem, code-runner, etc.) saibam exatamente onde operar. Funciona como o Antigravity/Claude Code: cada projeto tem um caminho associado que é injetado automaticamente no contexto de todas as conversas daquele projeto.

**Diferencial vs. abordagem original:** o caminho é sempre **do servidor LibreChat**, validado contra uma allowlist admin-configurável, propagado via contrato JSON unificado (env stdio ou header HTTP), e re-validado no executor container antes de rodar qualquer código. Três camadas de defesa contra sandbox escape, sem prometer o que o browser não consegue entregar.

## Fluxo Geral

```
Projeto { workspacePath: "/workspaces/my-saas" }   ← canônico, validado contra WORKSPACE_ROOTS
    │
    │ chatProjectId (já existe) → lookup do projeto no agent init
    │ (re-validado contra WORKSPACE_ROOTS no lookup — não confia no DB)
    ▼
AgentClient options → system prompt injection
    │
    ├─ "# Project Workspace\nWorking directory: /workspaces/my-saas\n..."
    │
    └─ MCP project context propagation
         ├─ stdio: MCP_PROJECT_CONTEXT={"projectId":"...","workspacePath":"..."} no env
         └─ HTTP : X-Project-Context header (base64 do JSON) por request
```

## Architecture Decisions (fechar antes de codar)

### AD-1: Path é sempre do servidor, com allowlist

| Item | Decisão |
|---|---|
| Onde o path resolve | Sempre no **servidor** do LibreChat |
| Allowlist | `WORKSPACE_ROOTS` env var (comma-separated) |
| Default dev | `/workspaces` |
| Em SaaS | Admin configura com paths reais disponíveis |
| UI | Label claro "caminho do servidor"; sem `showDirectoryPicker` (não expõe path completo — é teatro) |

**Por quê:** respeita a realidade do deploy. Em local (docker-compose) funciona como Antigravity/Claude Code. Em SaaS, admin dá o catálogo e o user não inventa path que não vai resolver server-side.

### AD-2: Sandbox do mcp-workspace — três camadas de defesa

1. **Server-side no save** (`sanitizeProjectInput`): canonicaliza via `path.resolve` + `fs.realpath` (mata symlink escape), exige que caia dentro de algum `WORKSPACE_ROOTS`. Reject com 400.
2. **Server-side no lookup** (`initialize.js`): mesma checagem ao montar `endpointOption.projectContext`. Não confia no DB — pode ter sido populado por import/migration antiga.
3. **No executor container** (`mcp-workspace` `getSafePaths`): mesma checagem ao montar o bind mount. Não confia no caller. Throw `Path escapes workspace sandbox`.

**Por quê:** cada camada protege contra classe diferente de bug — user malicioso/descuidado, DB corrompido, bypass via outro MCP.

### AD-3: Propagação via contrato unificado `MCP_PROJECT_CONTEXT`

| Conceito | Nome | Onde | Quem lê |
|---|---|---|---|
| Host-global root | `WORKSPACES_BASE` (existente) | env mcp-workspace | mcp-workspace |
| Allowlist | `WORKSPACE_ROOTS` (novo) | env API + runner | validação |
| Per-conversation | `MCP_PROJECT_CONTEXT` | env stdio / header HTTP | cada MCP server |

Contrato JSON:
```json
{"projectId": "abc123", "workspacePath": "/workspaces/my-saas"}
```

- **stdio MCPs**: agent runtime spawna com `MCP_PROJECT_CONTEXT=<json>` no env.
- **HTTP MCPs** (mcp-workspace et al.): header `X-Project-Context: <base64-json>` por request. Env `RUNNER_PROJECT_CONTEXT_HEADER` (default `X-Project-Context`) controla o nome.
- **mcp-workspace** lê o header, parseia, usa `workspacePath` como override do `workspaceSubdir`. Adiciona `--label project=<id>` no spawn pra audit trail (`docker ps --filter label=project=<id>`).

**Por quê:** HTTP MCPs são containers persistentes (`restart: always`) — env não muda entre requests. Header é o canal natural. JSON unificado = mesma info pra todos os MCPs independente do transport.

---

## Proposed Changes

### Data Layer

#### [MODIFY] [chatProject.ts (schema)](file:///e:/Github/librechat/packages/data-schemas/src/schema/chatProject.ts)
- Adicionar campo `workspacePath: { type: String, default: null, trim: true, maxlength: 2048 }`

#### [MODIFY] [chatProject.ts (types)](file:///e:/Github/librechat/packages/data-schemas/src/types/chatProject.ts)
- Adicionar `workspacePath?: string | null` na interface `IChatProject`

#### [MODIFY] [chatProject.ts (methods)](file:///e:/Github/librechat/packages/data-schemas/src/methods/chatProject.ts)
- Adicionar `workspacePath?: string | null` em `CreateChatProjectInput` e `UpdateChatProjectInput`
- **NOVO** `sanitizeWorkspacePath(raw: string): Promise<string>`:
  - `path.resolve(raw)` para canonicalizar (mata `..`, `./`)
  - `fs.realpath(resolved)` para resolver symlinks; se não existir, usa o resolved (cria path novo é OK)
  - Valida que o resultado cai dentro de algum `getWorkspaceRoots()` (com `path.sep` no final pra evitar match parcial tipo `/workspaces-evil` batendo em `/workspaces`)
  - Throw `ValidationError` claro se fora
  - Retorna o path canônico (realpath ou resolved)
- `sanitizeProjectInput()` chama `sanitizeWorkspacePath()` quando `workspacePath` presente
- `updateChatProject()` persiste o valor já canônico (re-validado)

#### [MODIFY] [config.js](file:///e:/Github/librechat/packages/data-schemas/src/config.js)
- **NOVO** `getWorkspaceRoots(): string[]` — lê `WORKSPACE_ROOTS` do env, split por `,`, trim, filtra vazios, `path.resolve` em cada. Default = `['/workspaces']`. Cacheado (carrega uma vez).

### API / Backend

#### [MODIFY] [handlers.ts](file:///e:/Github/librechat/packages/api/src/projects/handlers.ts)
- `createProjectInput()` — extrair `workspacePath` do body e incluir no input
- `updateProject()` — extrair `workspacePath` do body e incluir no input de update
- Validação 400 acontece via `sanitizeProjectInput` (camada 1 da AD-2) — propagar mensagem de erro pro client

#### [MODIFY] [initialize.js](file:///e:/Github/librechat/api/server/services/Endpoints/agents/initialize.js)
- Após `await endpointOption.agent` (linha 251), quando há `chatProjectId`:
  - Buscar o projeto via `db.getChatProject(req.user.id, chatProjectId)`
  - **Se** `project.workspacePath` presente, re-validar via `sanitizeWorkspacePath` (camada 2 da AD-2)
  - Setar `endpointOption.projectContext = { projectId, workspacePath }` apenas se válido

#### [MODIFY] [client.js (AgentClient)](file:///e:/Github/librechat/api/server/controllers/agents/client.js)
- Receber `projectWorkspacePath` nas opções do construtor (lê do `endpointOption.projectContext`)
- Em `buildMessages()` ou equivalente, antepor ao system prompt:
  ```
  # Project Workspace
  Working directory for this project: {workspacePath}
  All file operations and code execution should use this directory as the base path.
  ```
- **NOVO** ao instanciar MCPs stdio: setar `MCP_PROJECT_CONTEXT=<JSON.stringify(projectContext)>` no env do spawn
- **NOVO** ao chamar MCPs HTTP: adicionar header `X-Project-Context: <base64(JSON.stringify(projectContext))>` em cada request

#### [NEW] [workspaces.js](file:///e:/Github/librechat/packages/api/src/workspaces/workspaces.js)
- Endpoint `GET /api/workspaces/available`:
  - Lê `WORKSPACE_ROOTS` via `getWorkspaceRoots()`
  - Para cada root, lista subdirs diretos (`fs.readdir` com `withFileTypes: true`, filtrar só diretórios)
  - Retorna `{ roots: [{ path: "/workspaces", subdirs: ["my-saas", "marketing", ...] }, ...] }`
- v1: sem ACL — qualquer user logado vê tudo que existe. v2: filtrar por ownership/permission.

### Frontend — Types & Data Provider

#### [MODIFY] [types.ts](file:///e:/Github/librechat/packages/data-provider/src/types.ts)
- Adicionar `workspacePath?: string | null` em `TChatProject`
- Adicionar `workspacePath?: string | null` em `TCreateChatProjectRequest` e `TUpdateChatProjectRequest`

#### [MODIFY] [data-service.ts](file:///e:/Github/librechat/packages/data-provider/src/data-service.ts)
- Hook `useAvailableWorkspaces()` que chama `GET /api/workspaces/available`
- Adicionar ao barrel export

### Frontend — UI Components

#### [NEW] WorkspacePathPicker.tsx
`client/src/components/Projects/WorkspacePathPicker.tsx`

Componente reutilizável com:
- Label: "**Caminho do projeto no servidor**" (não "Workspace path")
- Texto de ajuda: "Esse é o caminho **no servidor do LibreChat**, não na sua máquina. Em setups locais é o mesmo; em remotos, peça ao admin os caminhos disponíveis."
- Select (não input livre) populado por `useAvailableWorkspaces()`. Mostra paths canônicos do servidor. Quando `WORKSPACE_ROOTS` tem só `/workspaces`, lista os subdirs diretos como `<SelectItem value="/workspaces/foo">/workspaces/foo</SelectItem>`.
- Botão de clear (×) pra remover o path
- Ícone de pasta + display do path selecionado
- **Sem** `window.showDirectoryPicker()` — não funciona em deploy remoto e é teatro em local.

#### [MODIFY] [ProjectCreateDialog.tsx](file:///e:/Github/librechat/client/src/components/Projects/ProjectCreateDialog.tsx)
- Adicionar `<WorkspacePathPicker>` abaixo do campo "Name"
- Passar `workspacePath` no `createProject.mutateAsync({ name, workspacePath })`

#### [MODIFY] [ProjectWorkspace.tsx](file:///e:/Github/librechat/client/src/components/Projects/ProjectWorkspace.tsx)
- Exibir badge/pill com o workspace path no header (abaixo do `description`)
- Botão de edição (pencil icon) que abre `<WorkspacePathPicker>` em modo inline / dialog
- Usar `useUpdateProjectMutation` pra salvar alterações no path

#### [MODIFY] [ProjectLandingChip.tsx](file:///e:/Github/librechat/client/src/components/Chat/ProjectLandingChip.tsx)
- Exibir o workspace path em pill pequeno abaixo do nome do projeto
- Ícone de pasta + path truncado (tooltip com path completo)
- Se não houver path, **omitir o chip** (não mostrar placeholder vazio)

### MCP Runtime — mcp-workspace

#### [MODIFY] [runner.ts](file:///e:/Github/librechat/packages/mcp-workspace/src/runner.ts)
- **NOVO env** `RUNNER_PROJECT_CONTEXT_HEADER` (default `X-Project-Context`).
- **NOVO** `parseProjectContextHeader(raw: string | undefined): ProjectContext | null`:
  - base64-decode, JSON.parse, valida shape (`{ projectId: string, workspacePath: string }`)
  - Return null se header ausente; throw `InvalidProjectContextError` se presente mas inválido
- **MODIFICAR** `getSafePaths`: aceitar segundo arg `explicitWorkspacePath?: string`. Quando presente, usar como workspace em vez de `subdir`. **Re-validar contra `WORKSPACE_ROOTS`** (camada 3 da AD-2) — mesma lógica do `sanitizeWorkspacePath` mas inline (sem dep cross-package).
- **NOVO env** `WORKSPACE_ROOTS` lido no runner (default `['/workspaces']`). Parsing igual ao data-schemas.
- **MODIFICAR** `buildDockerArgs`: aceitar `projectId?: string`; quando presente, adiciona `--label project=<id>` no `docker run` (audit trail).
- **MODIFICAR** `runCode` / `runFile`: aceitar `projectContext?: ProjectContext` opcional; se presente, override do `workspaceSubdir` E passa `projectId` pro buildDockerArgs.

#### [MODIFY] [runner.spec.ts](file:///e:/Github/librechat/packages/mcp-workspace/src/runner.spec.ts)
- Novos testes:
  - `parseProjectContextHeader` — válido (base64 + JSON correto), inválido (base64 quebrado), ausente, shape errado
  - `getSafePaths` com `explicitWorkspacePath` — dentro do root (ok), fora (throw), com `..` (throw), WORKSPACE_ROOTS múltiplo (path no segundo root ok)
  - `WORKSPACE_ROOTS` env parsing — vazio cai no default, múltiplo split OK, paths com espaço trimmed

### Env vars (deploy)

#### [MODIFY] [.env.example](file:///e:/Github/librechat/.env.example)
- Adicionar `WORKSPACE_ROOTS=/workspaces` (comentado: lista de roots permitidos no servidor. Em SaaS, configure com paths reais.)
- Adicionar `RUNNER_PROJECT_CONTEXT_HEADER=X-Project-Context` (comentado: nome do header HTTP que carrega o project context até mcp-workspace.)

#### [MODIFY] [docker-compose.yml](file:///e:/Github/librechat/docker-compose.yml)
- `api` service: adicionar `WORKSPACE_ROOTS=${WORKSPACE_ROOTS:-/workspaces}` ao env
- `mcp-workspace` service: adicionar `WORKSPACE_ROOTS=${WORKSPACE_ROOTS:-/workspaces}` e `RUNNER_PROJECT_CONTEXT_HEADER=${RUNNER_PROJECT_CONTEXT_HEADER:-X-Project-Context}` ao env

---

## Verification Plan

### Unit Tests
- `data-schemas`: `sanitizeWorkspacePath` — path válido, path com `..`, path com symlink, path fora do root, WORKSPACE_ROOTS vazio (default), WORKSPACE_ROOTS múltiplo
- `mcp-workspace`: `parseProjectContextHeader` (válido/inválido/ausente/shape errado), `getSafePaths` com `explicitWorkspacePath` (dentro/fora/..), `WORKSPACE_ROOTS` env parsing
- `api/projects/handlers`: criação/update com workspacePath válido (200) e inválido (400 com mensagem)

### Integration Tests
- Criar projeto com `workspacePath=/workspaces/test-app` via API → 200 + persistido canônico
- Criar projeto com `workspacePath=/etc` → 400 com mensagem clara mencionando WORKSPACE_ROOTS
- Update projeto com `workspacePath=/etc/passwd` → 400
- Projeto existente sem workspacePath → `endpointOption.projectContext` undefined → comportamento atual preservado

### Manual Verification
1. **Local (docker-compose)**: criar projeto com `workspacePath=/workspaces/my-app` → abrir conversa → ver no system prompt "Working directory: /workspaces/my-app" → `run_code` cria arquivo em `/workspaces/my-app` via mcp-workspace
2. **Workspace context propagation**: chamar mcp-workspace HTTP direto (curl/Postman) sem header → roda no `WORKSPACES_BASE` default; com header `X-Project-Context` válido → roda no path do header
3. **Audit trail**: `docker ps --filter label=project=<id>` retorna os executors daquele projeto após rodar código
4. **UI Browse equivalent**: clicar "Ver disponíveis" no picker → lista `/workspaces/{subdir1, subdir2}` do servidor (vindos de `GET /api/workspaces/available`)
5. **Remoto (se configurado)**: `WORKSPACE_ROOTS=/srv/projects` no admin → picker só mostra subdirs de lá → user não consegue submeter path arbitrário (UI nem dá opção)

### Defense-in-Depth Verification
- Tentar bypassar camada 1 salvando direto no DB (`db.chatProjects.updateOne`) → camada 2 (no initialize) rejeita
- Tentar bypassar camada 2 mandando header malicioso direto pro mcp-workspace → camada 3 (no getSafePaths) rejeita
- Tentar symlink attack: criar `ln -s /etc /workspaces/escape` → `realpath` resolve pra `/etc` → rejeitado pela camada 1 (save) ou 2 (lookup)

---

## Scope Summary

| Arquivo | Mudança |
|---|---|
| `packages/data-schemas/src/schema/chatProject.ts` | +campo `workspacePath` |
| `packages/data-schemas/src/types/chatProject.ts` | +campo na interface |
| `packages/data-schemas/src/methods/chatProject.ts` | +`sanitizeWorkspacePath` + sanitize + persist |
| `packages/data-schemas/src/config.js` | +`getWorkspaceRoots()` helper |
| `packages/api/src/projects/handlers.ts` | extrair `workspacePath` do body |
| `packages/api/src/workspaces/workspaces.js` | [NEW] `GET /api/workspaces/available` |
| `packages/data-provider/src/types.ts` | +campos nos tipos TS |
| `packages/data-provider/src/data-service.ts` | `useAvailableWorkspaces()` hook |
| `api/server/services/Endpoints/agents/initialize.js` | lookup + re-validar + passar `projectContext` |
| `api/server/controllers/agents/client.js` | injetar path no prompt + propagar `MCP_PROJECT_CONTEXT` |
| `client/src/components/Projects/WorkspacePathPicker.tsx` | [NEW] componente select com label claro |
| `client/src/components/Projects/ProjectCreateDialog.tsx` | +`WorkspacePathPicker` |
| `client/src/components/Projects/ProjectWorkspace.tsx` | mostrar + editar path |
| `client/src/components/Chat/ProjectLandingChip.tsx` | exibir path no chip |
| `packages/mcp-workspace/src/runner.ts` | `X-Project-Context` parsing + override + re-validate + label audit |
| `packages/mcp-workspace/src/runner.spec.ts` | +testes do novo helper |
| `docker-compose.yml` (api + mcp-workspace) | +env `WORKSPACE_ROOTS` e `RUNNER_PROJECT_CONTEXT_HEADER` |
| `.env.example` | +novas env vars documentadas |

---

## Rollout

- **Fase 0** ← *este documento*: fechar ADs, validar escopo com o time
- **Fase 1** (data layer isolado): schema + types + methods + `sanitizeWorkspacePath` + `getWorkspaceRoots` + testes
- **Fase 2** (backend): handlers + initialize re-validation + projectContext injection + client.js prompt + MCP stdio env / HTTP header propagation
- **Fase 3** (mcp-workspace): header parsing + `getSafePaths` override + re-validation + label audit + testes
- **Fase 4** (API endpoint + hook): `GET /api/workspaces/available` + `useAvailableWorkspaces`
- **Fase 5** (UI): WorkspacePathPicker + integração nos 3 componentes existentes
- **Fase 6** (verify): e2e manual + defense-in-depth (symlink attack, bypass attempt)