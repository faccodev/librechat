#!/usr/bin/env node

/**
 * MCP Server para Facebook Marketing API
 *
 * Duas camadas de funcionalidade:
 * 1. Camada de Consulta (read-only): Busca e navegação na documentação
 * 2. Camada de Execução (operacional): Tools que executam ações na API da Meta
 *
 * Dois modos de transporte:
 * - stdio (default): Para uso local via MCP clients
 * - HTTP (--http): Para hospedagem remota via Streamable HTTP
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { docsTools, handleDocsTool, isDocsTool } from './docs-tools.js';
import { apiTools, handleApiTool, isApiTool } from './api-tools.js';
import { MetaClientError } from './meta-client.js';
import { registerResourceHandlers } from './resources.js';
import { registerPromptHandlers } from './prompts.js';

// Informações do pacote
const packageInfo = {
  name: 'mcp-meta-ads',
  version: '1.0.0',
};

/**
 * Cria e configura um MCP Server com todos os handlers.
 * Reutilizado por ambos os transportes (stdio e HTTP).
 */
function createMcpServer(): Server {
  const server = new Server(
    {
      name: packageInfo.name,
      version: packageInfo.version,
    },
    {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {},
      },
    }
  );

  // Registrar handlers de resources e prompts
  registerResourceHandlers(server);
  registerPromptHandlers(server);

  // Registrar handler para listar todas as tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [...docsTools, ...apiTools],
    };
  });

  // Registrar handler para executar tools
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    // Log para debug
    console.error(`[MCP] Executando tool: ${name}`);
    console.error(`[MCP] Args: ${JSON.stringify(args)}`);

    try {
      let result;

      if (isDocsTool(name)) {
        result = await handleDocsTool(name, args || {});
      } else if (isApiTool(name)) {
        result = await handleApiTool(name, args || {});
      } else {
        result = {
          content: [
            {
              type: 'text' as const,
              text: `Tool não encontrada: ${name}`,
            },
          ],
          isError: true,
        };
      }

      console.error(`[MCP] Resultado (isError: ${result.isError || false}): ${result.content[0]?.text?.substring(0, 200)}...`);

      return result;
    } catch (error) {
      console.error(`[MCP] ERRO CAPTURADO:`, error);

      let errorText: string;

      if (error instanceof MetaClientError) {
        errorText = `# Erro da API Meta

**Código:** ${error.code}
**Tipo:** ${error.type}
**Mensagem:** ${error.message}
${error.errorSubcode ? `**Subcódigo:** ${error.errorSubcode}` : ''}
${error.errorUserTitle ? `\n**${error.errorUserTitle}**` : ''}
${error.errorUserMsg ? `${error.errorUserMsg}` : ''}
${error.errorData ? `**Dados:** ${error.errorData}` : ''}
${error.fbtraceId ? `\n**FB Trace ID:** ${error.fbtraceId}` : ''}

Consulte a documentação de erros com \`get_error_code_info\` para mais detalhes.`;
      } else if (error instanceof Error) {
        errorText = `# Erro não tratado na execução da tool "${name}"\n\n**Tipo:** ${error.name}\n**Mensagem:** ${error.message}\n\n\`\`\`\n${error.stack || 'N/A'}\n\`\`\``;
      } else {
        errorText = `# Erro desconhecido\n\n\`\`\`json\n${JSON.stringify(error, null, 2)}\n\`\`\``;
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: errorText,
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

/**
 * Parse CLI args para determinar modo de transporte.
 */
function parseArgs(): { mode: 'stdio' | 'http'; port: number } {
  const args = process.argv.slice(2);
  const isHttp = args.includes('--http');

  let port = 3000;
  const portEqArg = args.find(a => a.startsWith('--port='));
  if (portEqArg) {
    port = parseInt(portEqArg.split('=')[1], 10);
  } else {
    const portIdx = args.indexOf('--port');
    if (portIdx !== -1 && args[portIdx + 1]) {
      port = parseInt(args[portIdx + 1], 10);
    }
  }

  return { mode: isHttp ? 'http' : 'stdio', port };
}

async function main() {
  const { mode, port } = parseArgs();

  if (mode === 'http') {
    // Dynamic import para não carregar Express no modo stdio
    const { startHttpServer } = await import('./transports/http-server.js');
    await startHttpServer({
      port,
      createServer: createMcpServer,
    });
  } else {
    // Modo stdio (compatibilidade com uso local)
    const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js');
    const server = createMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${packageInfo.name} v${packageInfo.version} iniciado (stdio)`);
  }
}

// Prevent silent crashes — log to stderr so MCP client can see the error
process.on('uncaughtException', (error) => {
  console.error('[MCP] Uncaught exception:', error);
});
process.on('unhandledRejection', (reason) => {
  console.error('[MCP] Unhandled rejection:', reason);
});

main().catch((error) => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
