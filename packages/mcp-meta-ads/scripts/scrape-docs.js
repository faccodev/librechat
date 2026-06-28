import puppeteer from 'puppeteer';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURAÇÃO
// ============================================

const ENTRYPOINT = 'https://developers.facebook.com/docs/marketing-api';
const URL_PATTERN = /^\/docs\/marketing-api(?:\/|$)/;
const MAX_DEPTH = 3;
const MAX_RETRIES = 3;
const RATE_LIMIT_MS = 2000; // 2s entre requisições
const NAVIGATION_TIMEOUT = 30000;

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const INDEX_PATH = path.join(__dirname, '..', 'url-index.json');
const URLS_PATH = path.join(__dirname, '..', 'discovered-urls.json');
const ERRORS_PATH = path.join(__dirname, '..', 'scrape-errors.json');
const STATE_PATH = path.join(__dirname, '..', 'scrape-state.json');

// Flag para verificar se é modo resume
const isResumeMode = process.argv.includes('--resume');

// ============================================
// TURNDOWN SERVICE COM REGRAS CUSTOMIZADAS
// ============================================

function createTurndownService() {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-'
  });

  // Regra customizada para blocos de código
  turndown.addRule('codeBlock', {
    filter: ['pre'],
    replacement: (content, node) => {
      const codeElement = node.querySelector ? node.querySelector('code') : null;
      const code = codeElement ? codeElement.textContent : node.textContent;
      const language = codeElement?.className?.match(/language-(\w+)/)?.[1] || '';
      return `\n\`\`\`${language}\n${code.trim()}\n\`\`\`\n`;
    }
  });

  // Remove elementos indesejados
  turndown.addRule('removeUnwanted', {
    filter: ['script', 'style', 'noscript', 'iframe'],
    replacement: () => ''
  });

  return turndown;
}

// ============================================
// NAVEGAÇÃO COM RETRY
// ============================================

async function navigateWithRetry(page, url, retries = 0) {
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: NAVIGATION_TIMEOUT 
    });
    return true;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const delay = 2000 * (retries + 1); // 2s, 4s, 6s
      console.log(`    ⏳ Retry ${retries + 1}/${MAX_RETRIES} em ${delay/1000}s...`);
      await new Promise(r => setTimeout(r, delay));
      return navigateWithRetry(page, url, retries + 1);
    }
    throw error;
  }
}

// ============================================
// EXTRAÇÃO DE LINKS
// ============================================

async function extractLinks(page) {
  return page.evaluate((patternSource) => {
    const pattern = new RegExp(patternSource);
    const links = Array.from(document.querySelectorAll('a[href^="/docs/marketing-api"]'));
    return links.map(a => {
      const href = a.getAttribute('href');
      const cleanPath = href.split('#')[0].split('?')[0];
      return {
        name: a.textContent.trim(),
        path: cleanPath,
        link: `https://developers.facebook.com${cleanPath}`
      };
    }).filter(l => l.path && l.name && pattern.test(l.path));
  }, URL_PATTERN.source);
}

// ============================================
// EXTRAÇÃO DE CONTEÚDO COM SELETOR ESPECÍFICO
// ============================================

async function extractContent(page) {
  const result = await page.evaluate(() => {
    // Seletor específico para o conteúdo principal da documentação do Facebook
    const mainContent = document.querySelector('[data-click-area="main"]');
    
    if (mainContent) {
      const clone = mainContent.cloneNode(true);
      // Limpeza adicional
      clone.querySelectorAll('script, style, noscript').forEach(el => el.remove());
      return clone.innerHTML;
    }
    
    // Fallback para seletores genéricos caso o seletor principal não exista
    const fallbackSelectors = [
      '[role="main"] article',
      '[role="main"]',
      'article',
      'main'
    ];
    
    for (const selector of fallbackSelectors) {
      const el = document.querySelector(selector);
      if (el) {
        const clone = el.cloneNode(true);
        clone.querySelectorAll('nav, script, style, noscript').forEach(e => e.remove());
        return clone.innerHTML;
      }
    }
    
    return document.body.innerHTML;
  });

  const title = await page.title();
  return { html: result, title };
}

// ============================================
// MAPEAMENTO URL -> ARQUIVO (ESTRUTURA HIERÁRQUICA)
// ============================================

function urlToFilePath(urlPath) {
  // /docs/marketing-api -> index.md
  // /docs/marketing-api/overview -> overview.md
  // /docs/marketing-api/guides/videoads -> guides/videoads.md
  // /docs/marketing-api/creative/collection-ads -> creative/collection-ads.md
  // /docs/marketing-api/lookalike-audience-targeting/ -> lookalike-audience-targeting/index.md
  
  let cleanPath = urlPath.replace('/docs/marketing-api', '').replace(/^\//, '');
  
  if (!cleanPath) return 'index.md';
  
  // Se termina com /, é um diretório - usar index.md
  if (cleanPath.endsWith('/')) {
    return cleanPath + 'index.md';
  }
  
  // Manter estrutura de pastas, adicionar .md ao final
  return cleanPath + '.md';
}

// ============================================
// CRIAÇÃO DE DIRETÓRIOS
// ============================================

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ============================================
// CRIAÇÃO DO ARQUIVO MD COM FRONTMATTER
// ============================================

function createMarkdownFile(title, url, content) {
  const safeTitle = title.replace(/"/g, '\\"').replace(/\n/g, ' ');
  return `---
title: "${safeTitle}"
source: "${url}"
scraped_at: "${new Date().toISOString()}"
---

${content}`;
}

// ============================================
// COMPARAÇÃO DE CONTEÚDO (NORMALIZAÇÃO)
// ============================================

function normalizeContentForComparison(content) {
  return content
    // Remove a linha scraped_at
    .replace(/^scraped_at:.*$/m, '')
    // Remove query params de URLs (ex: ?foo=bar, ?locale=pt_BR)
    .replace(/\]\([^)]+\?[^)]*\)/g, (match) => {
      // Mantém a URL base, remove query params
      return match.replace(/\?[^)]*/, '');
    })
    // Remove links com query params no formato href
    .replace(/\?[a-zA-Z_]+=[\w%-]*/g, '')
    // Normaliza múltiplos espaços
    .replace(/[ \t]+/g, ' ')
    // Normaliza múltiplas quebras de linha
    .replace(/\n{3,}/g, '\n\n')
    // Remove espaços no final das linhas
    .replace(/[ \t]+$/gm, '')
    .trim();
}

function getFileStatus(filePath, newContent) {
  if (!fs.existsSync(filePath)) {
    return 'new';
  }
  
  try {
    const existingContent = fs.readFileSync(filePath, 'utf-8');
    const existingNormalized = normalizeContentForComparison(existingContent);
    const newNormalized = normalizeContentForComparison(newContent);
    
    if (existingNormalized === newNormalized) {
      return 'unchanged';
    }
    return 'modified';
  } catch (error) {
    return 'new';
  }
}

// ============================================
// ÍNDICE URL <-> ARQUIVO
// ============================================

const urlIndex = {
  urlToFile: {},
  fileToUrl: {},
  lastUpdated: null,
  stats: {
    totalUrls: 0,
    totalFiles: 0
  }
};

function updateIndex(urlPath, filename) {
  urlIndex.urlToFile[urlPath] = filename;
  urlIndex.fileToUrl[filename] = urlPath;
  urlIndex.stats.totalUrls = Object.keys(urlIndex.urlToFile).length;
  urlIndex.stats.totalFiles = Object.keys(urlIndex.fileToUrl).length;
  urlIndex.lastUpdated = new Date().toISOString();
}

function saveIndex() {
  fs.writeFileSync(INDEX_PATH, JSON.stringify(urlIndex, null, 2));
}

// ============================================
// ESTADO PARA RESUME
// ============================================

function saveState(visited, queue, allLinks, errors) {
  const state = {
    visited: Array.from(visited),
    queue: queue,
    allLinks: Array.from(allLinks.entries()),
    errors: errors,
    urlIndex: urlIndex,
    savedAt: new Date().toISOString()
  };
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) {
    return null;
  }
  try {
    const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    return {
      visited: new Set(state.visited),
      queue: state.queue,
      allLinks: new Map(state.allLinks),
      errors: state.errors || [],
      urlIndex: state.urlIndex
    };
  } catch (error) {
    console.error('⚠️  Erro ao carregar estado:', error.message);
    return null;
  }
}

function clearState() {
  if (fs.existsSync(STATE_PATH)) {
    fs.unlinkSync(STATE_PATH);
  }
}

// ============================================
// FUNÇÃO PRINCIPAL DE SCRAPING
// ============================================

async function scrapeDocs() {
  // Verificar modo resume
  let visited, allLinks, errors, queue;
  let resumedFrom = null;

  if (isResumeMode) {
    const savedState = loadState();
    if (savedState) {
      visited = savedState.visited;
      allLinks = savedState.allLinks;
      errors = savedState.errors;
      queue = savedState.queue;
      
      // Restaurar urlIndex
      Object.assign(urlIndex, savedState.urlIndex);
      
      resumedFrom = visited.size;
      console.log('🔄 Retomando scraping do estado salvo...');
      console.log(`   Já visitadas: ${visited.size} páginas`);
      console.log(`   Na fila: ${queue.length} URLs`);
      console.log(`   Links descobertos: ${allLinks.size}`);
      console.log('');
    } else {
      console.log('⚠️  Nenhum estado salvo encontrado. Iniciando do zero...');
      console.log('');
      visited = new Set();
      allLinks = new Map();
      errors = [];
      queue = [{ url: ENTRYPOINT, depth: 0 }];
    }
  } else {
    // Modo normal - começar do zero
    visited = new Set();
    allLinks = new Map();
    errors = [];
    queue = [{ url: ENTRYPOINT, depth: 0 }];
    
    // Limpar estado anterior se existir
    clearState();
  }

  console.log('🚀 Iniciando scraping da documentação...');
  console.log(`📍 Entrypoint: ${ENTRYPOINT}`);
  console.log(`📊 Profundidade máxima: ${MAX_DEPTH}`);
  console.log(`⏱️  Rate limit: ${RATE_LIMIT_MS}ms`);
  console.log(`🔄 Max retries: ${MAX_RETRIES}`);
  if (resumedFrom) {
    console.log(`📌 Retomando de: ${resumedFrom} páginas já processadas`);
  }
  console.log('');

  // Criar pasta docs se não existir
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1920, height: 1080 });

  const turndown = createTurndownService();

  let processedCount = resumedFrom || 0;
  let newCount = 0;
  let modifiedCount = 0;
  let unchangedCount = 0;

  // Salvar estado a cada N páginas
  const SAVE_STATE_INTERVAL = 10;

  try {
    while (queue.length > 0) {
      const { url, depth } = queue.shift();
      
      // Normalizar URL
      const normalizedUrl = url.split('#')[0].split('?')[0];
      const urlPath = new URL(normalizedUrl).pathname;
      
      if (visited.has(normalizedUrl) || depth > MAX_DEPTH) continue;
      visited.add(normalizedUrl);

      try {
        processedCount++;
        console.log(`[${processedCount}] [Depth ${depth}] ${normalizedUrl}`);
        
        // Navegar com retry
        await navigateWithRetry(page, normalizedUrl);
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS));

        // Extrair links para continuar BFS
        const links = await extractLinks(page);
        let newLinksCount = 0;

        for (const link of links) {
          if (!allLinks.has(link.path)) {
            allLinks.set(link.path, link);
            newLinksCount++;
            
            if (depth < MAX_DEPTH && !visited.has(link.link)) {
              queue.push({ url: link.link, depth: depth + 1 });
            }
          }
        }

        // Extrair conteúdo e salvar MD
        const { html, title } = await extractContent(page);
        const markdown = turndown.turndown(html);
        const filename = urlToFilePath(urlPath);
        const fullContent = createMarkdownFile(title, normalizedUrl, markdown);
        
        const filePath = path.join(DOCS_DIR, filename);
        ensureDirectoryExists(filePath);
        
        // Verificar status do arquivo
        const fileStatus = getFileStatus(filePath, fullContent);
        let statusIcon = '';
        
        if (fileStatus === 'new') {
          fs.writeFileSync(filePath, fullContent);
          newCount++;
          statusIcon = '🆕';
        } else if (fileStatus === 'modified') {
          fs.writeFileSync(filePath, fullContent);
          modifiedCount++;
          statusIcon = '📝';
        } else {
          // unchanged - não reescreve para preservar data original
          unchangedCount++;
          statusIcon = '✓';
        }

        // Atualizar índice
        updateIndex(urlPath, filename);

        console.log(`    ↳ Links: ${links.length} (${newLinksCount} novos) | ${statusIcon} ${filename} | Queue: ${queue.length}`);

        // Salvar estado periodicamente
        if (processedCount % SAVE_STATE_INTERVAL === 0) {
          saveState(visited, queue, allLinks, errors);
          console.log(`    💾 Estado salvo (${processedCount} páginas processadas)`);
        }

      } catch (error) {
        console.error(`    ❌ Erro após ${MAX_RETRIES} tentativas: ${error.message}`);
        errors.push({ 
          url: normalizedUrl, 
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        // Salvar estado em caso de erro também
        saveState(visited, queue, allLinks, errors);
      }
    }
  } catch (fatalError) {
    // Salvar estado antes de sair em caso de erro fatal
    console.error('❌ Erro fatal, salvando estado...');
    saveState(visited, queue, allLinks, errors);
    await browser.close();
    throw fatalError;
  }

  await browser.close();

  // Salvar resultados finais
  console.log('');
  console.log('💾 Salvando resultados...');

  // Salvar índice
  saveIndex();
  console.log(`   ✅ url-index.json (${urlIndex.stats.totalUrls} URLs)`);

  // Salvar lista de URLs descobertas
  const discoveredUrls = Array.from(allLinks.values());
  fs.writeFileSync(URLS_PATH, JSON.stringify(discoveredUrls, null, 2));
  console.log(`   ✅ discovered-urls.json (${discoveredUrls.length} URLs)`);

  // Salvar erros se houver
  if (errors.length > 0) {
    fs.writeFileSync(ERRORS_PATH, JSON.stringify(errors, null, 2));
    console.log(`   ⚠️  scrape-errors.json (${errors.length} erros)`);
  }

  // Limpar estado após conclusão bem-sucedida
  clearState();
  console.log('   🧹 Estado de progresso limpo (scraping completo)');

  // Estatísticas finais
  console.log('');
  console.log('✅ Scraping finalizado!');
  console.log(`📊 Páginas visitadas: ${visited.size}`);
  console.log(`🔗 URLs descobertas: ${allLinks.size}`);
  console.log(`📄 Arquivos:`);
  console.log(`   🆕 Novos: ${newCount}`);
  console.log(`   📝 Modificados: ${modifiedCount}`);
  console.log(`   ✓  Sem alteração: ${unchangedCount}`);
  console.log(`❌ Erros: ${errors.length}`);

  return {
    stats: {
      pagesVisited: visited.size,
      urlsDiscovered: allLinks.size,
      files: {
        new: newCount,
        modified: modifiedCount,
        unchanged: unchangedCount,
        total: newCount + modifiedCount + unchangedCount
      },
      errors: errors.length
    },
    errors
  };
}

// ============================================
// COMPARAÇÃO COM BASELINE
// ============================================

function compareWithBaseline() {
  const baselinePath = path.join(__dirname, '..', 'extracted-links.json');
  
  if (!fs.existsSync(baselinePath) || !fs.existsSync(URLS_PATH)) {
    console.log('⚠️  Arquivos para comparação não encontrados.');
    return;
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const discovered = JSON.parse(fs.readFileSync(URLS_PATH, 'utf-8'));

  const baselinePaths = new Set(baseline.map(l => l.path));
  const discoveredPaths = new Set(discovered.map(l => l.path));

  const missing = [...baselinePaths].filter(p => !discoveredPaths.has(p));
  const newUrls = [...discoveredPaths].filter(p => !baselinePaths.has(p));

  console.log('');
  console.log('📊 Comparação com baseline:');
  console.log(`   Baseline: ${baselinePaths.size} URLs`);
  console.log(`   Descobertas: ${discoveredPaths.size} URLs`);
  console.log(`   Faltando: ${missing.length}`);
  console.log(`   Novas: ${newUrls.length}`);

  if (missing.length > 0 && missing.length <= 10) {
    console.log('');
    console.log('   URLs faltando:');
    missing.forEach(p => console.log(`     - ${p}`));
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  const startTime = Date.now();
  
  try {
    await scrapeDocs();
    compareWithBaseline();
  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  console.log('');
  console.log(`⏱️  Tempo total: ${elapsed} minutos`);
}

main();
