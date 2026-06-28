/**
 * Resources - Exposição dos Documentos via URI
 *
 * Expõe os arquivos de documentação como recursos acessíveis via URI scheme:
 * fb-marketing-docs://docs/{path}
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListResourceTemplatesRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { loadAllDocuments, loadMarkdownFile, getDocsPath, DocumentInfo } from './utils/fileLoader.js';
import * as path from 'path';

const URI_SCHEME = 'fb-marketing-docs';

/**
 * Converte um documento para formato de resource
 */
function documentToResource(doc: DocumentInfo): {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
} {
  return {
    uri: `${URI_SCHEME}://docs/${doc.relativePath}`,
    name: doc.title,
    description: doc.description || `Documentação: ${doc.relativePath}`,
    mimeType: 'text/markdown',
  };
}

/**
 * Extrai o caminho do arquivo de uma URI
 */
function extractPathFromUri(uri: string): string | null {
  const prefix = `${URI_SCHEME}://docs/`;
  if (uri.startsWith(prefix)) {
    return uri.substring(prefix.length);
  }
  return null;
}

/**
 * Registra handlers de resources no servidor
 */
export function registerResourceHandlers(server: Server): void {
  // Handler para listar recursos disponíveis
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const documents = loadAllDocuments();

    const resources = documents.map(documentToResource);

    return { resources };
  });

  // Handler para ler um recurso específico
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    const relativePath = extractPathFromUri(uri);
    if (!relativePath) {
      throw new Error(`URI inválida: ${uri}. Use o formato: ${URI_SCHEME}://docs/{caminho}`);
    }

    const docsPath = getDocsPath();
    const fullPath = path.join(docsPath, relativePath);

    const doc = loadMarkdownFile(fullPath);
    if (!doc) {
      throw new Error(`Documento não encontrado: ${relativePath}`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: 'text/markdown',
          text: doc.content,
        },
      ],
    };
  });

  // Handler para templates de recursos
  server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
    return {
      resourceTemplates: [
        {
          uriTemplate: `${URI_SCHEME}://docs/{path}`,
          name: 'Documento de documentação',
          description: 'Acessa um documento específico da documentação da Facebook Marketing API',
          mimeType: 'text/markdown',
        },
      ],
    };
  });
}
