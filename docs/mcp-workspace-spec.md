# MCP Workspace — Spec (2026-06-30)

> Substitui o `@modelcontextprotocol/server-filesystem` upstream e o antigo
> `mcp-code-runner` por um único MCP nosso, **`mcp-workspace`**. Roda em
> **todos os requests** — não precisa habilitar por conversa. Cobre leitura,
> escrita, busca e execução de código com edit cirúrgico (search/replace com
> layered matching, estilo OpenCode / RooCode).

---

## 1. Motivação

O `mcp-code-runner` atual expõe só 2 tools (`run_code`, `run_file`) — e toda
edição de arquivo precisa ser feita via shell dentro de container Docker
(`sed`, `cat <<EOF`, etc), o que (a) é lento (~500 ms pra subir container por
chamada), (b) substitui arquivo inteiro quando o LLM erra o `sed`, e (c)
não tem feedback estruturado.

O `@modelcontextprotocol/server-filesystem` oficial expõe 13 tools de
filesystem (read/write/edit/list/search) mas (a) é genérico, (b) o `edit_file`
dele é match exato — sem fuzzy, sem indentação inteligente, sem multi-edit
atômico, (c) está fora do nosso controle.

**Decisão:** consolidar tudo num único MCP nosso (`mcp-workspace`),
reaproveitando o sandbox Docker e o `getSafePaths` que o `mcp-code-runner`
já tem. Tools novos de filesystem compartilham a validação de path do runner.

---

## 2. Naming & deploy

Decisão do Danilo (2026-06-30): **renomear tudo** que era `mcp-code-runner`
pra `mcp-workspace`. Sem alias retrocompat. O pacote some com o nome antigo.

| Item | Decisão |
|---|---|
| Nome do **pacote npm** interno | `mcp-workspace` |
| Nome do **container Docker** | `mcp-workspace` |
| Nome do **serviço no docker-compose** | `mcp-workspace` |
| Nome no **librechat.yaml** | `workspace` (key do mcpServers) |
| Porta | `8932` (mantida) |
| Endpoint streamable-http | `/sse` (mantido) |
| Header do MCP server (handshake) | `"mcp-workspace"` |
| Alias retrocompat | **Nenhum** — é breaking change intencional |

**Arquivos a renomear / atualizar:**

| Antes | Depois |
|---|---|
| `packages/mcp-code-runner/` (dir) | `packages/mcp-workspace/` |
| `package.json` field `name` | `mcp-workspace` |
| `docker-compose.yml` service | `mcp-workspace` (context `./packages/mcp-workspace`) |
| `docker-compose.local.yml` service | idem |
| `librechat.yaml` / `librechat_coolify.yaml` mcpServers key | `workspace`, url `http://mcp-workspace:8932/sse` |
| `librechat.yaml` `mcpServers` placeholder list | `- 'mcp-workspace:8932'` |
| `package-lock.json` | regenerado via `npm install` |
| `MCP server name` (handshake JSON) | `"mcp-workspace"` |
| Logs / health endpoint JSON | `service: "mcp-workspace"` |
| Docs: `coolify.md`, `omniroute-and-rclone.md` | atualizar referências |
| Plan: `implementation_plan.md` | atualizar referências |
| Data-schema comment (`workspaceRoots.ts`) | atualizar referência |

**Migrar `librechat.yaml`:**
```diff
 mcpServers:
-  filesystem:
-    command: npx
-    args: ['-y', '@modelcontextprotocol/server-filesystem', '/workspaces/{{LIBRECHAT_USER_WORKSPACESUBDIR}}']
-  code-runner:
-    title: 'Código'
-    iconPath: '/assets/mcp/code.png'
-    type: streamable-http
-    url: 'http://mcp-code-runner:8932/sse'
+  workspace:
+    title: 'Workspace'
+    iconPath: '/assets/mcp/workspace.png'
+    type: streamable-http
+    url: 'http://mcp-workspace:8932/sse'
```

Depois de validar: remover entry `filesystem` do yaml e remover o bind mount
de `/workspaces` do filesystem MCP (não é mais usado).

---

## 3. Tools

Total: **14 tools** (vs 2 atuais + 13 do upstream filesystem). Todos
operam dentro do sandbox `WORKSPACE_ROOTS` validado por
`validateWorkspacePathAgainstRoots`.

### 3.1 Read (9 tools — read-only, idempotent)

#### `read_file`
```ts
{
  path: string,             // relativo ao workspaceSubdir
  head?: number,            // primeiras N linhas (não combina com tail)
  tail?: number,            // últimas N linhas (não combina com head)
  offset?: number,          // começa da linha N (1-indexed)
  limit?: number,           // máximo de linhas a retornar
  workspaceSubdir?: string  // default: contexto da conversa
}
```
Retorna: `{ content: string, totalLines: number, encoding: "utf-8" }`.
Erros: `NOT_FOUND`, `IS_DIRECTORY`, `PERMISSION_DENIED`.

#### `read_media_file`
```ts
{ path: string, workspaceSubdir?: string }
```
Retorna: `{ base64: string, mimeType: string, size: number }`.
Suporta: png, jpg, gif, webp, mp3, wav, ogg, mp4. Rejeita > 50 MB
(configurável via `MCP_WORKSPACE_MEDIA_MAX_BYTES`).

#### `read_multiple_files`
```ts
{ paths: string[], workspaceSubdir?: string }
```
Retorna: `{ results: Array<{ path, content?, error? }> }`. Falha de um
arquivo não aborta o batch.

#### `list_directory`
```ts
{ path: string, workspaceSubdir?: string }
```
Retorna: `"[FILE] foo.txt\n[DIR] subdir\n..."`. Ordenado alfabeticamente,
dotfiles incluídos. Sem recursion.

#### `list_directory_with_sizes`
```ts
{ path: string, sortBy?: "name"|"size", workspaceSubdir?: string }
```
Retorna: linhas + summary `{ totalFiles, totalDirs, totalBytes }`.

#### `directory_tree`
```ts
{
  path: string,
  excludePatterns?: string[],   // globs
  maxDepth?: number,            // default 8
  workspaceSubdir?: string
}
```
Retorna: JSON array recursivo `[{ name, type, children? }]`. Honra
`.gitignore` por default.

#### `search_files`
```ts
{
  path: string,
  pattern: string,              // glob
  excludePatterns?: string[],
  workspaceSubdir?: string
}
```
Retorna: paths absolutos dentro do workspace que casam.

#### `get_file_info`
```ts
{ path: string, workspaceSubdir?: string }
```
Retorna: `{ size, created, modified, accessed, type, mode, isDirectory, isFile }`.

#### `list_allowed_directories`
```ts
{}
```
Retorna: `{ directories: string[] }` (roots atuais do sandbox, já
validados). Útil pro LLM entender onde pode operar.

### 3.2 Write (4 tools — modify, com annotations corretas)

#### `write_file`
```ts
{
  path: string,
  content: string,
  encoding?: "utf-8" | "base64",     // default utf-8
  createParents?: boolean,            // default true (mkdir -p antes)
  workspaceSubdir?: string
}
```
- Se arquivo existe → sobrescreve (idempotent)
- Se não existe → cria com parents
- Annotations: `readOnlyHint: false, idempotentHint: true, destructiveHint: true`
- Backup automático opcional (veja § 5)

#### `create_directory`
```ts
{ path: string, workspaceSubdir?: string }
```
- `mkdir -p` sem erro se já existe (idempotent)
- Annotations: `readOnlyHint: false, idempotentHint: true, destructiveHint: false`

#### `move_file`
```ts
{ source: string, destination: string, workspaceSubdir?: string }
```
- Falha se destino existe (sem overwrite — mais seguro)
- Annotations: `readOnlyHint: false, idempotentHint: false, destructiveHint: true`

#### `edit_file` — **o carro-chefe** (detalhes em § 4)
```ts
{
  path: string,
  edits: Array<{
    oldText: string,
    newText: string,
    replaceGlobally?: boolean  // default false (espera 1 match)
  }>,
  dryRun?: boolean,             // default false
  workspaceSubdir?: string
}
```
Retorna (em sucesso): `{ applied: number, diff: string, matchInfo: [...] }`
Retorna (em dry-run): mesmo shape + `applied: 0`
Retorna (em falha): erro estruturado (veja § 4.5) com "did you mean...".

- Annotations: `readOnlyHint: false, idempotentHint: false, destructiveHint: true`
- Se `dryRun: true`: aplica matching/idêntico, mas não escreve no disco.
  Retorna o diff que **teria** sido aplicado.

### 3.3 Execute (2 tools — mantidas do code-runner atual)

#### `run_code` (já existe)
```ts
{ language: "node"|"python"|"sh", code: string, workspaceSubdir?: string, timeout?: number }
```

#### `run_file` (já existe)
```ts
{ file: string, workspaceSubdir?: string, language?: "node"|"python"|"sh", timeout?: number }
```

Mantidos **idênticos** ao que está hoje. Zero breaking change.

---

## 4. `edit_file` — algoritmo (núcleo do projeto)

Inspirado em OpenCode (`edit` tool) + RooCode (`MultiSearchReplaceDiffStrategy`)
+ Aider (layered matching). Implementado em `src/edit/matcher.ts` e
`src/edit/apply.ts`.

### 4.1 Entrada e saída

```ts
// Input
{
  path: "src/api/users.ts",
  edits: [
    { oldText: "export function getUser(id) {", newText: "export function getUser(id: string) {" },
    { oldText: "return db.users.find(u => u.id === id);", newText: "return db.users.findOne({ where: { id } });" }
  ],
  dryRun: false
}

// Output (sucesso)
{
  applied: 2,
  diff: "--- a/src/api/users.ts\n+++ b/src/api/users.ts\n@@ -1,4 +1,4 @@\n...",
  matchInfo: [
    { index: 0, matchOffset: 142, matchLength: 31, strategy: "exact", indentAdjusted: true },
    { index: 1, matchOffset: 220, matchLength: 38, strategy: "whitespace-trim", indentAdjusted: false }
  ]
}

// Output (falha)
{
  isError: true,
  content: [{
    type: "text",
    text: JSON.stringify({
      error: "SEARCH_NOT_FOUND",
      failedEditIndex: 1,
      expected: "return db.users.find(u => u.id === id);",
      suggestions: [
        { offset: 215, text: "  return db.users.find(u => u.id === id);", similarity: 0.96 },
        { offset: 412, text: "  return db.users.find(u => u.id == id);", similarity: 0.92 }
      ],
      hint: "Did you mean one of these actual lines from the file? Re-read the file and resend just the failed block."
    }, null, 2)
  }]
}
```

### 4.2 Algoritmo de matching (layered)

Pra cada `oldText`, tenta em ordem. **Primeiro sucesso vence**.

```
1. EXACT
   - Match exato byte-a-byte
   - Se replaceGlobally=false e achar >1: erro AMBIGUOUS_MATCH
   - Se replaceGlobally=true: substitui todas (Fisher-Yates shuffle das posições
     pra não bagunçar offsets durante aplicação)
   - Indentação: usa a do arquivo verbatim

2. WHITESPACE_TRIM
   - Match com trim de trailing whitespace em cada linha do oldText e do arquivo
   - Resolve o caso clássico "LLM colocou espaço extra no final"
   - Indentação: usa a do arquivo

3. LINE_TRIM
   - Match após trim de leading whitespace por linha (mantém estrutura relativa)
   - Resolve "LLM errou indent mas o resto bate"
   - Indentação: RE-CAPTURA do arquivo (relative indent preservation — § 4.3)

4. WHITESPACE_INSENSITIVE
   - Match ignorando TODOS whitespace runs (regex com \s*)
   - Resolve "tabs vs spaces" ou "dupla quebra de linha"
   - Indentação: RE-CAPTURA do arquivo

5. FUZZY (Levenshtein)
   - Para arquivos < 5 MB só
   - Sliding window do tamanho do oldText ± 20% pelo arquivo
   - Calcula distância de Levenshtein normalizada (0..1)
   - Threshold: ≤ 0.15 (85% similar) E maior similaridade entre todas as janelas
   - Top 3 janelas vão pra `suggestions` se nem essa estratégia bateu
   - Indentação: RE-CAPTURA do arquivo
```

**Importante:** `matchInfo.strategy` reporta qual camada venceu, pro debugging.

### 4.3 Indentação relativa (RooCode-style)

Quando a estratégia é LINE_TRIM, WHITESPACE_INSENSITIVE ou FUZZY, a
indentação original do arquivo é "perdida" no matching. Resgate:

```
1. Após achar o range matched [start, end) no arquivo original:
   - Capture `baseIndent = indent(first_line_of_matched_block)`

2. Compute `relativeIndent` de cada linha do newText:
   - Para linha L do newText:
     indent(L) = min(indent(L)) do newText
   - delta(L) = indent(L) - minIndent

3. Ao montar o bloco final a inserir:
   - Para cada linha L do newText:
     finalIndent(L) = baseIndent + delta(L)
   - Mantém tabs/spaces do arquivo original (detectado por maioria)

4. Edge case: newText é vazio (deleção de bloco)
   - Apenas remove o range matched. Preserva linhas adjacentes intactas.
```

### 4.4 Multi-edit atômico

Quando `edits.length > 1`:

```
1. Carrega arquivo UMA vez em memória
2. Para cada edit (em ordem):
   - Aplica o matching no ESTADO ATUAL do buffer (não no arquivo original)
   - Se matching falha, ABORTA e rollback (buffer descartado)
   - Se sucesso, atualiza buffer e registra posição pra diff
3. Se TODOS passaram:
   - Se dryRun: NÃO escreve, retorna diff do buffer vs arquivo original
   - Se !dryRun: escreve buffer atômico (write to tmp + rename)
4. Se ALGUM falhou:
   - Retorna erro indicando `failedEditIndex: N`
   - Informa quantos edits anteriores tinham sido "aplicados ao buffer"
     mas não ao disco (zero side-effect em dryRun ou erro)
```

**Atomicidade real**: `tmpfile.writeFile()` + `fs.rename(tmpfile, target)`.
No Linux é atômico. No Windows... quase — usa `fs.promises.rename` que
no NTFS é atômico se mesmo volume. Pra cross-volume, documenta caveat.

### 4.5 Schema de erro (rico, pro LLM se autocorrigir)

Todos os erros do `edit_file` retornam `isError: true` com JSON estruturado:

```ts
type EditError =
  | { error: "SEARCH_NOT_FOUND"; failedEditIndex: number; expected: string;
      suggestions: Array<{ offset: number; text: string; similarity: number }>;
      hint: string }
  | { error: "AMBIGUOUS_MATCH"; failedEditIndex: number; expected: string;
      occurrences: number; hint: string }
  | { error: "FILE_NOT_FOUND"; path: string }
  | { error: "INVALID_PATH"; path: string; reason: string }
  | { error: "READ_ERROR"; underlying: string }
  | { error: "ATOMIC_WRITE_FAILED"; underlying: string }
  | { error: "EDIT_INDEX_OUT_OF_RANGE"; failedEditIndex: number; totalEdits: number };
```

A mensagem de erro inclui SEMPRE:
- O `expected` que o LLM mandou
- Sugestões de linhas próximas com similarity score
- Hint textual: "Did you mean to match one of these? Re-read the file with read_file and resend just the failed block."

Inspirado em Aider (`SearchReplaceNoExactMatch` feedback).

### 4.6 Complexidade e performance

- Arquivo carregado **uma vez** em memória (string), mesmo com N edits
- Cada edit é O(M × N) onde M=tamanho do oldText, N=tamanho do arquivo
- FUZZY é O(N × W) onde W = janela de busca (tamanho do oldText × 1.2)
- Limite: arquivo > 5 MB → erro `FILE_TOO_LARGE` (configurável
  via `MCP_WORKSPACE_MAX_FILE_BYTES`, default 5 MB).
  Edit de arquivos grandes via `run_code` com shell (estratégia documentada).

### 4.7 Dry-run

`dryRun: true` faz tudo até o passo 3 de § 4.4, mas NÃO escreve. Retorna
o diff que teria sido aplicado. Crucial pra:
- LLM querer preview antes de aplicar
- UI do LibreChat mostrar "Diff Preview" antes de aprovar
- Testes automatizados validarem matching sem side-effect

---

## 5. Backups & rollback

### 5.1 Decisão: backup automático opt-in (env flag, default off)

**Decisão do Danilo (2026-06-30):** ele não viu razão clara pra ter backup;
deixei a decisão técnica comigo. Optei por **opt-in via
`MCP_WORKSPACE_BACKUP=true`**, default `off`.

Razões:
- Hardlink em Linux quebra silenciosamente quando o `edit_file` subsequente
  faz `rename(2)` (muda o inode do original, hardlink vira link morto).
- Workaround seria `copy` sempre — dobra o I/O por edit, ruim pra arquivos
  >1MB.
- Decidir copy vs hardlink vs reflink (btrfs/xfs) por filesystem detection
  é um rabbit hole.
- A solução real pra "não perder meu trabalho" é **git**: o executor image
  já tem `git` instalado (via `apk add git`), e o user pode fazer
  `git init && git add . && git commit -m "before AI edit"` antes de chamar
  o agente. Rollback vira `git checkout`. Documenta isso.

### 5.2 Comportamento quando `MCP_WORKSPACE_BACKUP=true`

Antes de cada `write_file`, `edit_file`, `move_file` destrutivo:
- Cria `.mcp-workspace-backups/<ISO-timestamp>-<short-hash>/<relative-path>`
- Hardlink se possível (`fs.link`), copy fallback (`fs.copyFile`) cross-device
- Mantém últimas 10 versões por arquivo (LRU trim em background, rodado
  por um `setInterval` de 1h)

### 5.3 Tool `restore_backup` (futuro, fora do escopo do MVP)

Roadmap. MVP não tem.

---

## 6. Estrutura do código

```
packages/mcp-workspace/src/
├── index.ts                # Express + MCP server (mantém o que tem, rename + log strings)
├── context.ts              # AsyncLocalStorage (mantém)
├── projectContext.ts       # X-Project-Context header (mantém)
├── runner.ts               # runCode/runFile Docker exec (mantém)
├── tools.ts                # TOOLS array + dispatch (ATUALIZA: adiciona 12 novos)
│
├── edit/                   # NOVO — núcleo do edit_file
│   ├── matcher.ts          # Layered matching (5 estratégias)
│   ├── indent.ts           # Relative indent preservation
│   ├── apply.ts            # Multi-edit transacional + atomic write
│   ├── diff.ts             # Unified diff generator (jsdiff ou custom)
│   └── errors.ts           # EditError discriminated union
│
├── fs/                     # NOVO — filesystem tools
│   ├── read.ts             # read_file, read_media_file, read_multiple_files
│   ├── list.ts             # list_directory, directory_tree, search_files
│   ├── write.ts            # write_file, create_directory, move_file
│   ├── info.ts             # get_file_info, list_allowed_directories
│   └── paths.ts            # Safe path resolution (wrapper sobre runner.ts)
│
└── tests/
    ├── edit/
    │   ├── matcher.spec.ts
    │   ├── indent.spec.ts
    │   ├── apply.spec.ts
    │   └── e2e.spec.ts     # Cenários reais estilo RooCode
    └── fs/
        ├── read.spec.ts
        ├── write.spec.ts
        └── paths.spec.ts
```

**Sem docker pra testar edit_file.** Testes usam tmp dirs e fs real
(`os.tmpdir()`). Mais rápido e mais fiel que mockar fs.

---

## 7. Tool Annotations MCP

Cada tool declara `annotations` pra o LibreChat UI renderizar hints:

```ts
{
  name: "edit_file",
  description: "...",
  inputSchema: { ... },
  annotations: {
    title: "Edit file",
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: false  // opera só dentro do sandbox
  }
}
```

Mapeamento completo:

| Tool | readOnly | destructive | idempotent |
|---|---|---|---|
| read_file | ✓ | – | – |
| read_media_file | ✓ | – | – |
| read_multiple_files | ✓ | – | – |
| list_directory | ✓ | – | – |
| list_directory_with_sizes | ✓ | – | – |
| directory_tree | ✓ | – | – |
| search_files | ✓ | – | – |
| get_file_info | ✓ | – | – |
| list_allowed_directories | ✓ | – | – |
| write_file | ✗ | ✓ | ✓ |
| create_directory | ✗ | ✗ | ✓ |
| move_file | ✗ | ✓ | ✗ |
| edit_file | ✗ | ✓ | ✗ |
| run_code | ✗ | ✓ | ✗ |
| run_file | ✗ | ✓ | ✗ |

---

## 8. Sandbox & segurança

Reaproveita 100% o que o runner.ts já tem:
- `validateWorkspaceSubdir` — chars permitidos no subdir
- `resolveSafeFilePath` — path não escapa do workspace
- `validateWorkspacePathAgainstRoots` — layer 3 contra symlink escape

**Novas considerações** (não cobertas pelo code-runner atual):
- `read_file` / `read_media_file` precisam **ler do HOST** (não do
  container). O sandbox atual foi feito pra montar host → container. Os
  filesystem tools operam direto no host path do workspace. **Não
  passam por Docker** — é tudo fs do Node direto, validado por
  `validateWorkspacePathAgainstRoots`.
- `write_file` / `edit_file` idem — escrevem direto no host path.
- `run_code` continua usando o sandbox Docker pra execução (zero mudança).

**Documentar:** filesystem tools NÃO são sandboxed no nível de processo
(um path traversal bug = leitura/escrita fora do workspace). Por isso a
validação rigorosa é crítica. Tests devem cobrir tentativas de escape:
- `..` em path
- symlinks apontando pra fora
- path absoluto
- Null bytes
- Caracteres de controle

---

## 9. Env vars

| Var | Default | Função |
|---|---|---|
| `PORT` | `8932` | HTTP port |
| `WORKSPACES_BASE` | `/workspaces` | Base path do sandbox (mantida) |
| `HOST_WORKSPACES_BASE` | `/workspaces` | Mount path (mantida) |
| `WORKSPACE_ROOTS` | (vazio) | Allowlist além do base (mantida) |
| `RUNNER_PROJECT_CONTEXT_HEADER` | `X-Project-Context` | (mantida) |
| `MCP_WORKSPACE_MAX_FILE_BYTES` | `5242880` (5 MB) | Limite de leitura/edição |
| `MCP_WORKSPACE_MEDIA_MAX_BYTES` | `52428800` (50 MB) | Limite de read_media_file |
| `MCP_WORKSPACE_FUZZY_ENABLED` | `true` | Liga/desliga fuzzy match |
| `MCP_WORKSPACE_BACKUP` | `false` | Liga backup automático (opt-in) |
| `MCP_WORKSPACE_LOG_LEVEL` | `info` | `debug`/`info`/`warn`/`error` |

Demais envs do runner (`RUNNER_MEMORY`, `RUNNER_IMAGE_*`, `MAX_TIMEOUT`)
continuam valendo só pros tools `run_*`.

---

## 10. Planos de teste

### 10.1 Unit (`*.spec.ts` ao lado de cada módulo)

- `matcher.spec.ts`:
  - Exact match em 1ª tentativa
  - Whitespace-trim resolve trailing space
  - Line-trim resolve indent errado do LLM
  - Whitespace-insensitive resolve tabs vs spaces
  - Fuzzy match encontra ~85% similar
  - AMBIGUOUS_MATCH dispara quando >1 match e replaceGlobally=false
  - SEARCH_NOT_FOUND dispara e retorna top-3 suggestions
- `indent.spec.ts`:
  - Captura base indent
  - Aplica relative indent preservando tabs
  - Edge case: newText vazio (delete)
  - Edge case: newText com indent mixto (tabs+spaces)
- `apply.spec.ts`:
  - Multi-edit: 3 edits todos com sucesso
  - Multi-edit: edit 2 falha → abort, buffer descartado, arquivo intacto
  - Atomic write: target + .tmp existe durante write
  - Dry-run não escreve
- `paths.spec.ts`:
  - `../../../etc/passwd` rejeitado
  - `/etc/passwd` rejeitado
  - Symlink pra fora do workspace rejeitado (via realpath)
  - Null byte rejeitado
  - Path com espaços/acentos/CJK/emoji aceito

### 10.2 Integração (e2e.spec.ts)

Cenários reais, baseados em problemas documentados nos blogs:

- Cenário Aider "fetchUserData" — adicionar try/catch em função
- Cenário RooCode "calculateTotal" — adicionar taxa
- Cenário Codex "function main" — mudar print
- Cenário Gemini CLI issue #1028 — old_text com whitespace sutil
  diferença → fuzzy deve achar; erro estruturado sugere linha certa

### 10.3 Sandbox (`fs/paths.spec.ts`)

- Tentar ler `/etc/shadow` via path traversal → erro
- Tentar criar symlink pra `/etc` → erro
- Edit em arquivo de 6 MB → `FILE_TOO_LARGE`
- Read de MP4 de 60 MB → `MEDIA_TOO_LARGE`

---

## 11. Plano de rollout

### Decisão de naming (Danilo, 2026-06-30)

**Renomear tudo de uma vez, sem alias retrocompat.** `mcp-code-runner`
some, vira `mcp-workspace` em pacote, container, serviço, yaml, docs.
É breaking change intencional — quem tiver deploy vai precisar rebuildar
a imagem do `api` e ajustar o `librechat.yaml`. Documentar no CHANGELOG.

### PR 1 — Rename + reorganização (BREAKING)
- Renomeia `packages/mcp-code-runner/` → `packages/mcp-workspace/`
- Atualiza `package.json` name e version
- Atualiza `MCP server name` no handshake de `"mcp-code-runner"` pra `"mcp-workspace"`
- Atualiza logs e health endpoint JSON
- Atualiza `docker-compose.yml` e `docker-compose.local.yml` (service name,
  context path, comentários)
- Atualiza `librechat.yaml` e `librechat_coolify.yaml` (mcpServers key +
  url + placeholder list)
- Atualiza docs (`coolify.md`, `omniroute-and-rclone.md`)
- Atualiza plan (`implementation_plan.md`)
- Atualiza comment em `packages/data-schemas/src/config/workspaceRoots.ts`
- Cria `src/edit/` e `src/fs/` com stubs vazios (pra tree ficar clara
  antes do PR 2)
- Roda `npm install` pra regenerar `package-lock.json`
- Valida: build OK, container sobe, health check responde, MCP handshake
  retorna o nome novo

### PR 2 — Read tools (9 novos read-only tools)
- Implementa os 9 read tools em `src/fs/`
- Tests em `src/fs/*.spec.ts`
- Tools continuam adicionadas ao `TOOLS` array em `tools.ts`
- Sem mudança no yaml ainda — `filesystem` MCP upstream ainda existe
  em paralelo
- User-side: nada muda (transição invisível)

### PR 3 — Write tools + `edit_file` (carro-chefe)
- `write_file`, `create_directory`, `move_file`
- `edit_file` completo (§ 4 — matching, indentação, multi-edit atômico,
  dry-run, erro estruturado)
- Tests extensivos em `src/edit/`
- Documenta exemplos nos `description` dos tools
- User-side: agora o agente tem acesso aos tools novos

### PR 4 — Remoção do `filesystem` upstream (BREAKING)
- Tool annotations MCP completas (tabela § 7)
- Mensagens de erro finais polidas
- Backups opt-in (§ 5) — só liga se alguém pedir
- Documenta em `docs/mcp-workspace.md` (user-facing)
- **Remove entry `filesystem` do `librechat.yaml`**
- Documenta no CHANGELOG: "filesystem MCP removido, use workspace
  do `mcp-workspace`"

### Compatibilidade entre PRs

- PRs 1 e 4 são breaking (rename + remoção). PRs 2 e 3 são silent — o
  agente passa a ter mais tools, mas nada quebra.
- Quem tá em PR 3 antes do PR 4 fica numa situação estranha: tem 2 MCPs
  de filesystem (upstream + nosso) com tools parecidos. Documenta isso
  no CHANGELOG do PR 4 ("remova o upstream ou o LLM vai confundir qual
  usar").

---

## 12. Decisões fechadas (Danilo, 2026-06-30)

| # | Pergunta | Decisão |
|---|---|---|
| 1 | Naming final | **Renomear tudo** — `mcp-code-runner` → `mcp-workspace`. Sem alias retrocompat. |
| 2 | Tool count no `tools/list` | **Flat** (14 tools no array, cada um com description rico). Motivo: MCP spec é flat; agrupar quebra clients. |
| 3 | `edit_file` aceita `edits: []` vazio? | **Rejeitar** com erro `EMPTY_EDITS`. Força LLM a mandar ≥1 edit. |
| 4 | `replaceGlobally: true` default? | **`false`** (espera 1 match exato). |
| 5 | Backup automático | **Opt-in** via `MCP_WORKSPACE_BACKUP=true`, default off. Documentar git como alternativa real. |
| 6 | Limite de tamanho de arquivo | **5 MB** (`MCP_WORKSPACE_MAX_FILE_BYTES=5242880`). |
| 7 | MCP `name` no handshake | **Muda** pra `"mcp-workspace"`. Sessions resetam (inevitável com rename). |

---

## 13. Não-objetivos (explícito)

Pra evitar scope creep:

- ❌ LSP integration (lint/typecheck no edit_file) — fora
- ❌ Git integration (commit/diff via tool) — user usa `run_code` com git CLI
- ❌ Versioning interno / undo stack — backup opt-in cobre 80%
- ❌ File watcher / hot reload — fora
- ❌ Multi-file atomic edit — fora; edit_file opera em 1 arquivo
- ❌ Streaming read pra arquivos gigantes — fora; usa `run_code`
- ❌ Compression on disk — fora

---

## 14. Métricas de sucesso

- Taxa de sucesso do `edit_file` (1ª tentativa): **>90%** (vs ~50% do
  upstream filesystem MCP em cenários típicos reportados)
- Latência média `edit_file`: **<50ms** pra arquivos <100KB
- Latência média `read_file`: **<20ms**
- Latência média `run_code` (inalterada): **~500ms** (sandbox Docker)
- Zero path-traversal escapes nos tests de fuzzing
- LLM consegue se autocorrigir com erro estruturado em **>80%** dos
  casos `SEARCH_NOT_FOUND` (medido via prompt com edits "imperfeitos"
  propositais)