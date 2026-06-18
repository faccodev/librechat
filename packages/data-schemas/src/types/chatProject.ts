import type { Document, Types } from 'mongoose';

export interface IChatProject {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  user: string;
  conversationCount: number;
  lastConversationAt?: Date | null;
  lastConversationId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  tenantId?: string;
  /**
   * Canonicalised server-side filesystem path associated with this project.
   * Always `null` when the project has no workspace context, otherwise a path
   * that resolves strictly inside one of `WORKSPACE_ROOTS`. Never raw user
   * input — it must be the output of `sanitizeWorkspacePath`.
   */
  workspacePath: string | null;
}

export interface IChatProjectDocument extends Omit<IChatProject, '_id'>, Document {}