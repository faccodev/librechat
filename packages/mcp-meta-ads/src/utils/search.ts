/**
 * Sistema de busca com sinônimos e cálculo de relevância
 * para documentação da Facebook Marketing API
 */

import { DocumentInfo } from './fileLoader.js';

/**
 * Dicionário de sinônimos bilíngue PT/EN para Marketing API
 */
export const SYNONYMS: Record<string, string[]> = {
  // Estrutura de Ads
  ad: ['anuncio', 'advertisement', 'anúncio', 'ads', 'anuncios', 'anúncios'],
  campaign: ['campanha', 'campanhas', 'campaigns'],
  adset: ['conjunto', 'ad set', 'adsets', 'conjunto de anuncios', 'conjunto de anúncios'],
  creative: ['criativo', 'criativos', 'creatives', 'arte', 'artes'],

  // Audiências
  audience: ['público', 'audiencia', 'audiência', 'publico', 'audiences', 'públicos'],
  targeting: ['segmentacao', 'segmentação', 'direcionamento', 'target', 'segmentar'],
  lookalike: ['semelhante', 'lookalikes', 'públicos semelhantes', 'similar'],
  custom: ['personalizado', 'personalizada', 'customizado', 'customizada'],

  // Tracking e Conversões
  pixel: ['tag', 'rastreamento', 'tracking', 'pixels'],
  conversion: ['conversao', 'conversão', 'conversions', 'conversoes', 'conversões'],
  event: ['evento', 'eventos', 'events'],
  capi: ['conversions api', 'server side', 'servidor', 'api de conversoes'],

  // Métricas e Insights
  insights: ['relatorios', 'relatórios', 'analytics', 'metricas', 'métricas', 'reports'],
  metric: ['metrica', 'métrica', 'metricas', 'métricas', 'metrics'],
  breakdown: ['detalhamento', 'detalhamentos', 'breakdowns', 'segmentação'],
  report: ['relatorio', 'relatório', 'reports', 'relatórios'],

  // Orçamento e Lances
  budget: ['orcamento', 'orçamento', 'verba', 'budgets', 'orçamentos'],
  bidding: ['lance', 'lances', 'bid', 'bids', 'licitação'],
  optimization: ['otimizacao', 'otimização', 'otimizar', 'optimize'],
  cbo: ['campaign budget optimization', 'otimização de orçamento', 'orcamento de campanha'],

  // Objetivos
  objective: ['objetivo', 'objetivos', 'meta', 'metas', 'objectives'],
  awareness: ['reconhecimento', 'conhecimento', 'alcance', 'brand awareness'],
  consideration: ['consideracao', 'consideração', 'engajamento', 'engagement'],
  conversions: ['conversoes', 'conversões', 'vendas', 'sales'],

  // Posicionamento
  placement: ['posicionamento', 'veiculacao', 'veiculação', 'placements', 'posicionamentos'],
  feed: ['timeline', 'feeds', 'linha do tempo'],
  stories: ['historias', 'histórias', 'story'],
  reels: ['reels', 'vídeos curtos'],

  // Catálogo
  catalog: ['catalogo', 'catálogo', 'products', 'produtos', 'catalogs'],
  product: ['produto', 'produtos', 'products', 'item', 'itens'],
  dynamic: ['dinamico', 'dinâmico', 'dinamica', 'dinâmica', 'dpa'],

  // Erros e Status
  error: ['erro', 'erros', 'errors', 'falha', 'falhas'],
  status: ['estado', 'situacao', 'situação', 'ativo', 'pausado'],
  active: ['ativo', 'ativa', 'ativos', 'ativas', 'running'],
  paused: ['pausado', 'pausada', 'pausados', 'pausadas', 'parar'],

  // API e Autenticação
  api: ['interface', 'endpoint', 'endpoints', 'apis'],
  token: ['acesso', 'access', 'tokens', 'credencial', 'credenciais'],
  authentication: ['autenticacao', 'autenticação', 'login', 'auth'],
  permission: ['permissao', 'permissão', 'permissoes', 'permissões', 'permissions'],

  // Business
  business: ['empresa', 'negocio', 'negócio', 'business manager', 'bm'],
  account: ['conta', 'contas', 'accounts'],
  user: ['usuario', 'usuário', 'usuarios', 'usuários', 'users'],
};

/**
 * Normaliza texto para busca (remove acentos, lowercase)
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Aplica stemming básico para PT/EN
 */
export function stemWord(word: string): string[] {
  const stems: string[] = [word];
  const normalized = normalizeText(word);

  // Português - gerúndio (-ando, -endo, -indo)
  if (normalized.endsWith('ando')) {
    stems.push(normalized.slice(0, -4) + 'ar');
    stems.push(normalized.slice(0, -4));
  } else if (normalized.endsWith('endo')) {
    stems.push(normalized.slice(0, -4) + 'er');
    stems.push(normalized.slice(0, -4));
  } else if (normalized.endsWith('indo')) {
    stems.push(normalized.slice(0, -4) + 'ir');
    stems.push(normalized.slice(0, -4));
  }

  // Português - plural (-s, -es, -ões)
  if (normalized.endsWith('oes')) {
    stems.push(normalized.slice(0, -3) + 'ao');
  } else if (normalized.endsWith('es') && normalized.length > 3) {
    stems.push(normalized.slice(0, -2));
    stems.push(normalized.slice(0, -1));
  } else if (normalized.endsWith('s') && normalized.length > 2) {
    stems.push(normalized.slice(0, -1));
  }

  // Inglês - gerúndio (-ing)
  if (normalized.endsWith('ing') && normalized.length > 4) {
    stems.push(normalized.slice(0, -3));
    stems.push(normalized.slice(0, -3) + 'e');
  }

  // Inglês - plural (-s, -es)
  if (normalized.endsWith('ies')) {
    stems.push(normalized.slice(0, -3) + 'y');
  } else if (normalized.endsWith('es') && normalized.length > 3) {
    stems.push(normalized.slice(0, -2));
  } else if (normalized.endsWith('s') && normalized.length > 2) {
    stems.push(normalized.slice(0, -1));
  }

  // Inglês - passado (-ed)
  if (normalized.endsWith('ed') && normalized.length > 3) {
    stems.push(normalized.slice(0, -2));
    stems.push(normalized.slice(0, -1));
  }

  return [...new Set(stems)];
}

/**
 * Expande query com sinônimos
 */
export function expandQueryWithSynonyms(query: string): string[] {
  const words = normalizeText(query).split(' ').filter(Boolean);
  const expandedTerms: string[] = [...words];

  for (const word of words) {
    // Adicionar stems
    expandedTerms.push(...stemWord(word));

    // Buscar sinônimos
    for (const [key, synonyms] of Object.entries(SYNONYMS)) {
      const normalizedKey = normalizeText(key);
      const normalizedSynonyms = synonyms.map(normalizeText);

      if (word === normalizedKey || normalizedSynonyms.includes(word)) {
        expandedTerms.push(normalizedKey);
        expandedTerms.push(...normalizedSynonyms);
      }
    }
  }

  return [...new Set(expandedTerms)];
}

/**
 * Calcula relevância de um documento para uma query
 */
export function calculateRelevance(doc: DocumentInfo, query: string): number {
  const normalizedQuery = normalizeText(query);
  const expandedTerms = expandQueryWithSynonyms(query);
  const normalizedContent = normalizeText(doc.content);
  const normalizedTitle = normalizeText(doc.title);
  const normalizedPath = normalizeText(doc.relativePath);

  let score = 0;

  // Match exato no título (peso alto)
  if (normalizedTitle.includes(normalizedQuery)) {
    score += 50;
  }

  // Match exato no caminho do arquivo (peso alto)
  if (normalizedPath.includes(normalizedQuery)) {
    score += 40;
  }

  // Match em termos expandidos no título
  for (const term of expandedTerms) {
    if (term.length < 2) continue;

    if (normalizedTitle.includes(term)) {
      score += 15;
    }

    // Contar ocorrências no conteúdo
    const regex = new RegExp(term, 'gi');
    const matches = normalizedContent.match(regex);
    if (matches) {
      // Pontuação diminui após certas ocorrências para evitar spam
      score += Math.min(matches.length * 2, 20);
    }
  }

  // Bônus para documentos mais específicos (paths mais profundos indicam especificidade)
  const pathDepth = doc.relativePath.split('/').length;
  if (pathDepth > 1) {
    score += Math.min(pathDepth * 2, 10);
  }

  // Bônus se o documento tem frontmatter completo (indica qualidade)
  if (doc.source) {
    score += 5;
  }

  return Math.min(100, score);
}

/**
 * Resultado de busca
 */
export interface SearchResult {
  document: DocumentInfo;
  relevance: number;
  snippet: string;
}

/**
 * Extrai snippet relevante do conteúdo
 */
function extractSnippet(content: string, query: string, maxLength: number = 300): string {
  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(' ').filter((t) => t.length > 2);

  // Remover frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Encontrar a primeira ocorrência de qualquer termo
  const normalizedContent = normalizeText(withoutFrontmatter);
  let bestIndex = -1;

  for (const term of terms) {
    const index = normalizedContent.indexOf(term);
    if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
      bestIndex = index;
    }
  }

  if (bestIndex === -1) {
    // Se não encontrou, retorna início do documento
    return withoutFrontmatter.substring(0, maxLength).trim() + '...';
  }

  // Extrair contexto ao redor do match
  const start = Math.max(0, bestIndex - 50);
  const end = Math.min(withoutFrontmatter.length, bestIndex + maxLength - 50);

  let snippet = withoutFrontmatter.substring(start, end).trim();

  if (start > 0) snippet = '...' + snippet;
  if (end < withoutFrontmatter.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Busca documentos por query
 */
export function searchDocuments(
  documents: DocumentInfo[],
  query: string,
  options: {
    section?: string;
    limit?: number;
    minRelevance?: number;
  } = {}
): SearchResult[] {
  const { section, limit = 10, minRelevance = 20 } = options;

  // Filtrar por seção se especificado
  let filteredDocs = documents;
  if (section) {
    const normalizedSection = normalizeText(section);
    filteredDocs = documents.filter((doc) => normalizeText(doc.relativePath).startsWith(normalizedSection));
  }

  // Calcular relevância para cada documento
  const results: SearchResult[] = filteredDocs
    .map((doc) => ({
      document: doc,
      relevance: calculateRelevance(doc, query),
      snippet: extractSnippet(doc.content, query),
    }))
    .filter((result) => result.relevance >= minRelevance)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  return results;
}
