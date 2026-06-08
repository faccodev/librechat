import { Document, Types } from 'mongoose';
import type {
  GraphEdge,
  AgentToolOptions,
  AgentToolResources,
  AgentSubagentsConfig,
} from 'librechat-data-provider';

export interface ISupportContact {
  name?: string;
  email?: string;
}

export interface IAgent extends Omit<Document, 'model'> {
  id: string;
  name?: string;
  description?: string;
  instructions?: string;
  avatar?: {
    filepath: string;
    source: string;
  };
  provider: string;
  model: string;
  /**
   * Optional pool of (provider, model) pairs for round-robin load
   * distribution + automatic failover. When present, each request
   * picks the next entry via an in-memory atomic counter (advances
   * per request, not per turn) and a 5xx/429/401/network error from
   * one entry causes the next to be tried. The legacy singular
   * `provider` + `model` fields are kept as the fallback when this
   * is empty/absent, so existing agents keep working unchanged.
   */
  models?: Array<{ provider: string; model: string }>;
  model_parameters?: Record<string, unknown>;
  artifacts?: string;
  access_level?: number;
  recursion_limit?: number;
  tools?: string[];
  skills?: string[];
  skills_enabled?: boolean;
  tool_kwargs?: Array<unknown>;
  actions?: string[];
  author: Types.ObjectId;
  authorName?: string;
  hide_sequential_outputs?: boolean;
  end_after_tools?: boolean;
  /** @deprecated Use edges instead */
  agent_ids?: string[];
  edges?: GraphEdge[];
  conversation_starters?: string[];
  tool_resources?: AgentToolResources;
  versions?: Omit<IAgent, 'versions'>[];
  category: string;
  support_contact?: ISupportContact;
  is_promoted?: boolean;
  /** MCP server names extracted from tools for efficient querying */
  mcpServerNames?: string[];
  /** Per-tool configuration (defer_loading, allowed_callers) */
  tool_options?: AgentToolOptions;
  /** Subagent spawning configuration — isolated-context child agents. */
  subagents?: AgentSubagentsConfig;
  /** Automatically make all configured MCP servers available under-the-hood (using deferred tool loading) */
  autoTools?: boolean;
  tenantId?: string;
}
