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

const MAX_RETRIES = 3;
const RATE_LIMIT_MS = 2000; // 2s entre requisições
const NAVIGATION_TIMEOUT = 30000;

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const INDEX_PATH = path.join(__dirname, '..', 'url-index.json');
const ERRORS_PATH = path.join(__dirname, '..', 'scrape-errors.json');

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
// ÍNDICE URL <-> ARQUIVO
// ============================================

function loadIndex() {
  if (fs.existsSync(INDEX_PATH)) {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  }
  return {
    urlToFile: {},
    fileToUrl: {},
    lastUpdated: null,
    stats: { totalUrls: 0, totalFiles: 0 }
  };
}

function saveIndex(urlIndex) {
  urlIndex.lastUpdated = new Date().toISOString();
  urlIndex.stats.totalUrls = Object.keys(urlIndex.urlToFile).length;
  urlIndex.stats.totalFiles = Object.keys(urlIndex.fileToUrl).length;
  fs.writeFileSync(INDEX_PATH, JSON.stringify(urlIndex, null, 2));
}

// ============================================
// FUNÇÃO PRINCIPAL DE RETRY
// ============================================

async function retryErrors() {
  // Carregar erros
  if (!fs.existsSync(ERRORS_PATH)) {
    console.log('✅ Nenhum arquivo de erros encontrado (scrape-errors.json)');
    console.log('   Isso significa que não há URLs pendentes para reprocessar.');
    return;
  }

  const errors = JSON.parse(fs.readFileSync(ERRORS_PATH, 'utf-8'));
  
  if (errors.length === 0) {
    console.log('✅ Nenhum erro registrado para reprocessar.');
    return;
  }

  console.log('🔄 Reprocessando URLs que falharam...');
  console.log(`📊 Total de URLs com erro: ${errors.length}`);
  console.log(`⏱️  Rate limit: ${RATE_LIMIT_MS}ms`);
  console.log(`🔄 Max retries: ${MAX_RETRIES}`);
  console.log('');

  // Carregar índice existente
  const urlIndex = loadIndex();

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

  let successCount = 0;
  let failCount = 0;
  const stillFailing = [];

  for (let i = 0; i < errors.length; i++) {
    const errorEntry = errors[i];
    const url = errorEntry.url;
    
    try {
      console.log(`[${i + 1}/${errors.length}] ${url}`);
      
      // Navegar com retry
      await navigateWithRetry(page, url);
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS));

      // Extrair conteúdo e salvar MD
      const { html, title } = await extractContent(page);
      const markdown = turndown.turndown(html);
      const urlPath = new URL(url).pathname;
      const filename = urlToFilePath(urlPath);
      const fullContent = createMarkdownFile(title, url, markdown);
      
      const filePath = path.join(DOCS_DIR, filename);
      ensureDirectoryExists(filePath);
      
      // Salvar arquivo
      fs.writeFileSync(filePath, fullContent);

      // Atualizar índice
      urlIndex.urlToFile[urlPath] = filename;
      urlIndex.fileToUrl[filename] = urlPath;

      console.log(`    ✅ Sucesso! → ${filename}`);
      successCount++;

    } catch (error) {
      console.error(`    ❌ Falhou novamente: ${error.message}`);
      stillFailing.push({ 
        url, 
        error: error.message,
        timestamp: new Date().toISOString(),
        previousError: errorEntry.error
      });
      failCount++;
    }
  }

  await browser.close();

  // Salvar índice atualizado
  saveIndex(urlIndex);
  console.log('');
  console.log(`💾 url-index.json atualizado (${urlIndex.stats.totalUrls} URLs)`);

  // Atualizar arquivo de erros
  if (stillFailing.length > 0) {
    fs.writeFileSync(ERRORS_PATH, JSON.stringify(stillFailing, null, 2));
    console.log(`⚠️  scrape-errors.json atualizado (${stillFailing.length} erros restantes)`);
  } else {
    // Remover arquivo de erros se todos foram resolvidos
    fs.unlinkSync(ERRORS_PATH);
    console.log('🧹 scrape-errors.json removido (todos os erros resolvidos)');
  }

  // Estatísticas finais
  console.log('');
  console.log('✅ Retry finalizado!');
  console.log(`📊 Resultados:`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Ainda falhando: ${failCount}`);

  if (stillFailing.length > 0) {
    console.log('');
    console.log('⚠️  URLs que ainda estão falhando:');
    stillFailing.slice(0, 10).forEach(e => console.log(`   - ${e.url}`));
    if (stillFailing.length > 10) {
      console.log(`   ... e mais ${stillFailing.length - 10} URLs`);
    }
  }

  return {
    total: errors.length,
    success: successCount,
    failed: failCount,
    stillFailing
  };
}

// ============================================
// MAIN
// ============================================

async function main() {
  const startTime = Date.now();
  
  try {
    await retryErrors();
  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  console.log('');
  console.log(`⏱️  Tempo total: ${elapsed} minutos`);
}

main();
