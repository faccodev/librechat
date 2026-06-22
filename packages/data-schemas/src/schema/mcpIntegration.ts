import { Schema } from 'mongoose';
import type { MCPIntegrationDocument } from '~/types';

const mcpIntegrationSchema = new Schema<MCPIntegrationDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    /**
     * Full MCPOptions shape (same as `librechat.yaml` `mcpServers.<name>`).
     * Sensitive fields inside are encrypted by the service layer
     * (apiKey.key, oauth.client_secret, literal env.* values) before save.
     * Mixed type because MCPOptions is a discriminated union and we want
     * the runtime to be able to consume the result as-is.
     */
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

mcpIntegrationSchema.index({ updatedAt: -1, _id: -1 });

export default mcpIntegrationSchema;
