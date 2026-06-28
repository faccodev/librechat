/**
 * Tools de Consulta - Documentação (Read-Only)
 *
 * Estas tools funcionam sem configuração de API keys.
 * Permitem buscar e navegar pela documentação da Facebook Marketing API.
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  loadAllDocuments,
  loadMarkdownFile,
  listDocumentationSections,
  countFilesInSection,
  getDocsPath,
} from './utils/fileLoader.js';
import { searchDocuments, SearchResult } from './utils/search.js';
import {
  docsSchemas,
  validateArgs,
  formatValidationError,
  type SearchDocumentationArgs,
  type GetDocumentByPathArgs,
  type GetEndpointReferenceArgs,
  type GetErrorCodeInfoArgs,
} from './schemas/index.js';

/**
 * Define as tools de documentação com JSON Schema manual
 */
export const docsTools = [
  {
    name: 'search_documentation',
    description:
      'Busca textual na documentação da Facebook Marketing API. Suporta sinônimos em português e inglês.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Termo de busca (ex: "criar campanha", "insights", "conversions api")',
        },
        section: {
          type: 'string',
          description: 'Filtrar por seção (ex: "insights", "audiences", "conversions-api")',
        },
        limit: {
          type: 'number',
          description: 'Número máximo de resultados (default: 10)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_document_by_path',
    description: 'Obtém o conteúdo completo de um documento específico pelo caminho.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        path: {
          type: 'string',
          description: 'Caminho relativo do documento (ex: "insights/error-codes.md")',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'list_sections',
    description: 'Lista todas as seções disponíveis na documentação.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'get_endpoint_reference',
    description: 'Busca informações sobre um endpoint específico da API.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        endpoint: {
          type: 'string',
          description: 'Nome do endpoint (ex: "campaigns", "adsets", "insights", "customaudiences")',
        },
      },
      required: ['endpoint'],
    },
  },
  {
    name: 'get_error_code_info',
    description: 'Obtém informações sobre um código de erro específico da API.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        error_code: {
          type: 'string',
          description: 'Código de erro (ex: "100", "190", "1504022")',
        },
      },
      required: ['error_code'],
    },
  },
  {
    name: 'get_quick_reference',
    description: 'Obtém a referência rápida com os endpoints e exemplos mais comuns.',
    inputSchema: {
      type: 'object' as const,
      properties: {},
    },
  },
];

/**
 * Implementação das tools de documentação
 */
export async function handleDocsTool(
  name: string,
  args: unknown
): Promise<{ content: Array<{ type: 'text'; text: string }>; isError?: boolean }> {
  switch (name) {
    case 'search_documentation': {
      const validation = validateArgs(docsSchemas.search_documentation, args);
      if (!validation.success) {
        return formatValidationError(validation.error);
      }
      const { query, section, limit } = validation.data;
      return handleSearchDocumentation({ query, section, limit });
    }

    case 'get_document_by_path': {
      const validation = validateArgs(docsSchemas.get_document_by_path, args);
      if (!validation.success) {
        return formatValidationError(validation.error);
      }
      return handleGetDocumentByPath(validation.data);
    }

    case 'list_sections': {
      return handleListSections();
    }

    case 'get_endpoint_reference': {
      const validation = validateArgs(docsSchemas.get_endpoint_reference, args);
      if (!validation.success) {
        return formatValidationError(validation.error);
      }
      return handleGetEndpointReference(validation.data);
    }

    case 'get_error_code_info': {
      const validation = validateArgs(docsSchemas.get_error_code_info, args);
      if (!validation.success) {
        return formatValidationError(validation.error);
      }
      return handleGetErrorCodeInfo(validation.data);
    }

    case 'get_quick_reference': {
      return handleGetQuickReference();
    }

    default:
      return {
        content: [{ type: 'text', text: `Tool desconhecida: ${name}` }],
        isError: true,
      };
  }
}

// ==================== HANDLERS ====================

function handleSearchDocumentation(args: SearchDocumentationArgs): {
  content: Array<{ type: 'text'; text: string }>;
} {
  const { query, section, limit } = args;

  const documents = loadAllDocuments();
  const results = searchDocuments(documents, query, { section, limit });

  if (results.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Nenhum resultado encontrado para "${query}"${section ? ` na seção "${section}"` : ''}.`,
        },
      ],
    };
  }

  const formattedResults = formatSearchResults(results);
  return {
    content: [{ type: 'text', text: formattedResults }],
  };
}

function handleGetDocumentByPath(args: GetDocumentByPathArgs): {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
} {
  const { path: docPath } = args;
  const docsPath = getDocsPath();
  const fullPath = path.join(docsPath, docPath);

  if (!fs.existsSync(fullPath)) {
    return {
      content: [
        {
          type: 'text',
          text: `Documento não encontrado: ${docPath}\n\nUse 'list_sections' para ver as seções disponíveis ou 'search_documentation' para buscar.`,
        },
      ],
      isError: true,
    };
  }

  const doc = loadMarkdownFile(fullPath);
  if (!doc) {
    return {
      content: [{ type: 'text', text: `Erro ao carregar documento: ${docPath}` }],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: 'text',
        text: `# ${doc.title}\n\n**Caminho:** ${doc.relativePath}\n${doc.source ? `**Fonte:** ${doc.source}\n` : ''}\n---\n\n${doc.content}`,
      },
    ],
  };
}

function handleListSections(): { content: Array<{ type: 'text'; text: string }> } {
  const sections = listDocumentationSections();
  const sectionsWithCount = sections.map((section) => {
    const count = countFilesInSection(section);
    return `- **${section}/** (${count} arquivos)`;
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Seções da Documentação\n\nA documentação está organizada nas seguintes seções:\n\n${sectionsWithCount.join('\n')}\n\n**Total:** ${sections.length} seções\n\nUse \`search_documentation\` com o parâmetro \`section\` para filtrar buscas por seção.`,
      },
    ],
  };
}

function handleGetEndpointReference(args: GetEndpointReferenceArgs): {
  content: Array<{ type: 'text'; text: string }>;
} {
  const { endpoint } = args;
  const documents = loadAllDocuments();

  // Buscar na pasta reference/
  const referenceResults = searchDocuments(documents, endpoint, {
    section: 'reference',
    limit: 5,
  });

  // Buscar também em outras seções
  const generalResults = searchDocuments(documents, endpoint, {
    limit: 5,
  });

  // Combinar e deduplica
  const allResults = [...referenceResults];
  for (const result of generalResults) {
    if (!allResults.some((r) => r.document.relativePath === result.document.relativePath)) {
      allResults.push(result);
    }
  }

  if (allResults.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Nenhuma referência encontrada para o endpoint "${endpoint}".`,
        },
      ],
    };
  }

  const formattedResults = formatSearchResults(allResults.slice(0, 10));
  return {
    content: [
      {
        type: 'text',
        text: `# Referência: ${endpoint}\n\n${formattedResults}`,
      },
    ],
  };
}

function handleGetErrorCodeInfo(args: GetErrorCodeInfoArgs): {
  content: Array<{ type: 'text'; text: string }>;
} {
  const { error_code } = args;
  const documents = loadAllDocuments();

  // Buscar em documentos de erro
  const errorResults = searchDocuments(documents, `error ${error_code}`, {
    limit: 10,
  });

  // Filtrar para documentos que mencionam o código específico
  const relevantResults = errorResults.filter(
    (r) => r.document.content.includes(error_code) || r.document.relativePath.includes('error')
  );

  if (relevantResults.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Código de erro "${error_code}" não encontrado na documentação.\n\nConsulte a documentação geral de erros em:\n- error-reference/\n- insights/error-codes.md`,
        },
      ],
    };
  }

  // Extrair informações específicas do código de erro
  let errorInfo = `# Código de Erro: ${error_code}\n\n`;

  for (const result of relevantResults.slice(0, 3)) {
    const content = result.document.content;
    const lines = content.split('\n');

    // Encontrar linha com o código de erro
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(error_code)) {
        // Pegar contexto ao redor
        const start = Math.max(0, i - 2);
        const end = Math.min(lines.length, i + 5);
        const context = lines.slice(start, end).join('\n');

        errorInfo += `## ${result.document.title}\n\n\`\`\`\n${context}\n\`\`\`\n\n`;
        errorInfo += `**Arquivo:** ${result.document.relativePath}\n\n---\n\n`;
        break;
      }
    }
  }

  return {
    content: [{ type: 'text', text: errorInfo }],
  };
}

function handleGetQuickReference(): { content: Array<{ type: 'text'; text: string }> } {
  const docsPath = getDocsPath();
  const quickRefPath = path.join(docsPath, 'QUICK_REFERENCE.md');

  if (fs.existsSync(quickRefPath)) {
    const content = fs.readFileSync(quickRefPath, 'utf-8');
    return {
      content: [{ type: 'text', text: content }],
    };
  }

  // Fallback: gerar referência rápida básica
  const quickRef = `# Referência Rápida - Facebook Marketing API

## Estrutura de Anúncios

\`\`\`
Campaign (Campanha)
└── Ad Set (Conjunto de Anúncios)
    └── Ad (Anúncio)
        └── Creative (Criativo)
\`\`\`

## Endpoints Principais

| Recurso | Endpoint | Descrição |
|---------|----------|-----------|
| Campanhas | \`/{ad_account_id}/campaigns\` | Criar/listar campanhas |
| Ad Sets | \`/{ad_account_id}/adsets\` | Criar/listar conjuntos |
| Anúncios | \`/{ad_account_id}/ads\` | Criar/listar anúncios |
| Criativos | \`/{ad_account_id}/adcreatives\` | Criar/listar criativos |
| Insights | \`/{object_id}/insights\` | Obter métricas |
| Audiências | \`/{ad_account_id}/customaudiences\` | Gerenciar públicos |

## Objetivos de Campanha

- \`OUTCOME_AWARENESS\` - Reconhecimento
- \`OUTCOME_ENGAGEMENT\` - Engajamento
- \`OUTCOME_LEADS\` - Geração de leads
- \`OUTCOME_SALES\` - Conversões/Vendas
- \`OUTCOME_TRAFFIC\` - Tráfego
- \`OUTCOME_APP_PROMOTION\` - Promoção de app

## Status

- \`ACTIVE\` - Ativo
- \`PAUSED\` - Pausado
- \`DELETED\` - Excluído
- \`ARCHIVED\` - Arquivado

Use \`search_documentation\` para buscar mais detalhes sobre qualquer tópico.`;

  return {
    content: [{ type: 'text', text: quickRef }],
  };
}

// ==================== UTILS ====================

/**
 * Formata resultados de busca para exibição
 */
function formatSearchResults(results: SearchResult[]): string {
  let output = `Encontrados ${results.length} resultado(s):\n\n`;

  for (const result of results) {
    output += `### ${result.document.title}\n`;
    output += `**Caminho:** \`${result.document.relativePath}\`\n`;
    output += `**Relevância:** ${result.relevance}%\n\n`;
    output += `${result.snippet}\n\n`;
    output += `---\n\n`;
  }

  return output;
}

/**
 * Verifica se o nome é uma tool de documentação
 */
export function isDocsTool(name: string): boolean {
  return docsTools.some((tool) => tool.name === name);
}
