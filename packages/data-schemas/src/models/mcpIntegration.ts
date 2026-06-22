import mcpIntegrationSchema from '~/schema/mcpIntegration';
import type { MCPIntegrationDocument } from '~/types';

export function createMCPIntegrationModel(mongoose: typeof import('mongoose')) {
  return (
    mongoose.models.MCPIntegration ||
    mongoose.model<MCPIntegrationDocument>('MCPIntegration', mcpIntegrationSchema)
  );
}
