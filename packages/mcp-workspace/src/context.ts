import { AsyncLocalStorage } from 'async_hooks';

/**
 * Per-request context carried from the Express handler into the MCP
 * tool implementation. The MCP SDK passes JSON-RPC requests into the
 * `Server`'s request handlers, which do not have direct access to the
 * HTTP `req` object — so the only way to ship per-request state
 * (notably the `X-Project-Context` header) into `handleCallTool` is
 * to capture it at the Express boundary and retrieve it through the
 * async chain. `AsyncLocalStorage` is the right primitive for this:
 * the entire `transport.handleRequest` call is one async task, and
 * every `await` inside it stays in the same store.
 *
 * Why not a module-level variable: docker `run_code` calls can
 * interleave across sessions under load (Node's single-threaded event
 * loop interleaves Promises), so a plain `let` would race between
 * requests. ALS makes the value *per-call* without explicit plumbing.
 */
export interface RequestContext {
  /**
   * Parsed `X-Project-Context` header (base64-JSON), or `null` when
   * the header was absent. The parser is strict — an invalid header
   * is logged at the transport boundary and recorded as `null`
   * rather than poisoning the whole request.
   */
  projectContext: ProjectContext | null;
}

export type ProjectContext = {
  projectId: string;
  workspacePath: string;
};

export const requestContextStore = new AsyncLocalStorage<RequestContext>();

/** Read the current request's `ProjectContext` or `null` outside a request. */
export function getCurrentProjectContext(): ProjectContext | null {
  return requestContextStore.getStore()?.projectContext ?? null;
}
