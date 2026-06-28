/**
 * Utilitários para carregar e escanear arquivos Markdown
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface DocumentInfo {
  path: string;
  relativePath: string;
  title: string;
  description: string;
  content: string;
  source?: string;
  scrapedAt?: string;
}

/**
 * Obtém o caminho para a pasta docs/
 */
export function getDocsPath(): string {
  // Quando executado localmente: dist/utils/ está em ./dist/utils, docs/ está em ./docs
  let docsPath = path.resolve(__dirname, '../../docs');

  if (fs.existsSync(docsPath)) {
    return docsPath;
  }

  // Quando instalado via npm: dist/utils/ está em node_modules/fb-marketing-mcp/dist/utils
  // docs/ está em node_modules/fb-marketing-mcp/docs
  docsPath = path.resolve(__dirname, '../docs');
  if (fs.existsSync(docsPath)) {
    return docsPath;
  }

  // Fallback para diretório atual
  docsPath = path.resolve(process.cwd(), 'docs');
  if (fs.existsSync(docsPath)) {
    return docsPath;
  }

  throw new Error('Pasta docs/ não encontrada');
}

/**
 * Encontra todos os arquivos Markdown recursivamente
 */
export function findAllMarkdownFiles(dirPath: string): string[] {
  const files: string[] = [];

  function scanDir(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        // Ignorar pastas ocultas
        if (!entry.name.startsWith('.')) {
          scanDir(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  scanDir(dirPath);
  return files;
}

/**
 * Carrega um arquivo Markdown e extrai metadados
 */
export function loadMarkdownFile(filePath: string): DocumentInfo | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const docsPath = getDocsPath();
    const relativePath = path.relative(docsPath, filePath);

    // Extrair frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    let title = '';
    let source = '';
    let scrapedAt = '';

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\s*$/m);
      const sourceMatch = frontmatter.match(/source:\s*["']?(.+?)["']?\s*$/m);
      const scrapedMatch = frontmatter.match(/scraped_at:\s*["']?(.+?)["']?\s*$/m);

      if (titleMatch) title = titleMatch[1];
      if (sourceMatch) source = sourceMatch[1];
      if (scrapedMatch) scrapedAt = scrapedMatch[1];
    }

    // Se não tem título no frontmatter, extrair do primeiro H1
    if (!title) {
      const h1Match = content.match(/^#\s+(.+)$/m);
      if (h1Match) {
        title = h1Match[1];
      } else {
        // Usar nome do arquivo como fallback
        title = path.basename(filePath, '.md').replace(/-/g, ' ');
      }
    }

    // Extrair descrição (primeiro parágrafo após o título)
    const description = extractDescription(content);

    return {
      path: filePath,
      relativePath,
      title,
      description,
      content,
      source,
      scrapedAt,
    };
  } catch (error) {
    console.error(`Erro ao carregar arquivo: ${filePath}`, error);
    return null;
  }
}

/**
 * Extrai a descrição do conteúdo (primeiro parágrafo significativo)
 */
function extractDescription(content: string): string {
  // Remover frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Remover título
  const withoutTitle = withoutFrontmatter.replace(/^#\s+.+\n+/, '');

  // Pegar primeiro parágrafo
  const lines = withoutTitle.split('\n');
  let description = '';

  for (const line of lines) {
    const trimmed = line.trim();
    // Ignorar linhas vazias, headers, listas e código
    if (
      trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('-') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('`') &&
      !trimmed.startsWith('|')
    ) {
      description = trimmed;
      break;
    }
  }

  // Limitar tamanho
  if (description.length > 200) {
    description = description.substring(0, 197) + '...';
  }

  return description;
}

/**
 * Lista todas as seções (subpastas) da documentação
 */
export function listDocumentationSections(): string[] {
  const docsPath = getDocsPath();
  const entries = fs.readdirSync(docsPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();
}

/**
 * Conta arquivos em uma seção
 */
export function countFilesInSection(section: string): number {
  const docsPath = getDocsPath();
  const sectionPath = path.join(docsPath, section);

  if (!fs.existsSync(sectionPath)) {
    return 0;
  }

  return findAllMarkdownFiles(sectionPath).length;
}

/**
 * Cache de documentos para evitar re-leitura
 */
let documentsCache: DocumentInfo[] | null = null;

/**
 * Carrega todos os documentos (com cache)
 */
export function loadAllDocuments(): DocumentInfo[] {
  if (documentsCache) {
    return documentsCache;
  }

  const docsPath = getDocsPath();
  const files = findAllMarkdownFiles(docsPath);
  const documents: DocumentInfo[] = [];

  for (const file of files) {
    const doc = loadMarkdownFile(file);
    if (doc) {
      documents.push(doc);
    }
  }

  documentsCache = documents;
  return documents;
}

/**
 * Limpa o cache de documentos
 */
export function clearDocumentsCache(): void {
  documentsCache = null;
}
