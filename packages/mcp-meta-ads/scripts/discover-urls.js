import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENTRYPOINT = 'https://developers.facebook.com/docs/marketing-api';
const URL_PATTERN = /^\/docs\/marketing-api/;
const MAX_DEPTH = 3;
const DELAY_MS = 1000; // Delay entre requisições

// Função para extrair links da página atual
async function extractLinks(page) {
  return page.evaluate((patternSource) => {
    const pattern = new RegExp(patternSource);
    const links = Array.from(document.querySelectorAll('a[href^="/docs/marketing-api"]'));
    return links.map(a => {
      const href = a.getAttribute('href');
      const cleanPath = href.split('#')[0].split('?')[0]; // Remove anchors e query
      return {
        name: a.textContent.trim(),
        path: cleanPath,
        link: `https://developers.facebook.com${cleanPath}`
      };
    }).filter(l => l.path && l.name && pattern.test(l.path));
  }, URL_PATTERN.source);
}

// BFS com controle de profundidade
async function discoverUrls() {
  console.log('🚀 Iniciando descoberta de URLs...');
  console.log(`📍 Entrypoint: ${ENTRYPOINT}`);
  console.log(`📊 Profundidade máxima: ${MAX_DEPTH}`);
  console.log('');

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Configurar user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1920, height: 1080 });

  const visited = new Set();
  const allLinks = new Map(); // path -> {name, path, link}
  const errors = [];
  const queue = [{ url: ENTRYPOINT, depth: 0 }];

  let processedCount = 0;

  while (queue.length > 0) {
    const { url, depth } = queue.shift();
    
    // Normalizar URL para evitar duplicados
    const normalizedUrl = url.split('#')[0].split('?')[0];
    
    if (visited.has(normalizedUrl) || depth > MAX_DEPTH) continue;
    visited.add(normalizedUrl);

    try {
      processedCount++;
      console.log(`[${processedCount}] [Depth ${depth}] Navegando: ${normalizedUrl}`);
      
      await page.goto(normalizedUrl, { 
        waitUntil: 'networkidle2', 
        timeout: 30000 
      });
      
      // Aguarda um pouco para JS carregar completamente
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));

      const links = await extractLinks(page);
      let newLinksCount = 0;

      for (const link of links) {
        if (!allLinks.has(link.path)) {
          allLinks.set(link.path, link);
          newLinksCount++;
          
          // Adiciona à queue se ainda não atingiu profundidade máxima
          if (depth < MAX_DEPTH && !visited.has(link.link)) {
            queue.push({ url: link.link, depth: depth + 1 });
          }
        }
      }

      console.log(`    ↳ Encontrados: ${links.length} links, Novos: ${newLinksCount}, Total único: ${allLinks.size}, Queue: ${queue.length}`);

    } catch (error) {
      console.error(`    ❌ Erro: ${error.message}`);
      errors.push({ url: normalizedUrl, error: error.message });
    }
  }

  await browser.close();

  console.log('');
  console.log('✅ Descoberta finalizada!');
  console.log(`📊 Páginas visitadas: ${visited.size}`);
  console.log(`🔗 URLs únicas descobertas: ${allLinks.size}`);
  console.log(`❌ Erros: ${errors.length}`);

  return {
    links: Array.from(allLinks.values()),
    errors,
    stats: {
      pagesVisited: visited.size,
      uniqueUrls: allLinks.size,
      errorsCount: errors.length
    }
  };
}

// Função para comparar com baseline
function compareWithBaseline(discovered) {
  const baselinePath = path.join(__dirname, '..', 'extracted-links.json');
  
  if (!fs.existsSync(baselinePath)) {
    console.log('⚠️  Baseline (extracted-links.json) não encontrado. Pulando comparação.');
    return;
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
  const baselinePaths = new Set(baseline.map(l => l.path));
  const discoveredPaths = new Set(discovered.map(l => l.path));

  const missing = [...baselinePaths].filter(p => !discoveredPaths.has(p));
  const newUrls = [...discoveredPaths].filter(p => !baselinePaths.has(p));

  console.log('');
  console.log('📊 Comparação com baseline:');
  console.log(`   Baseline: ${baselinePaths.size} URLs`);
  console.log(`   Descobertas: ${discoveredPaths.size} URLs`);
  console.log(`   Faltando no descoberto: ${missing.length}`);
  console.log(`   Novas (não no baseline): ${newUrls.length}`);

  if (missing.length > 0 && missing.length <= 20) {
    console.log('');
    console.log('   URLs faltando:');
    missing.slice(0, 20).forEach(p => console.log(`     - ${p}`));
  }

  if (newUrls.length > 0 && newUrls.length <= 20) {
    console.log('');
    console.log('   URLs novas:');
    newUrls.slice(0, 20).forEach(p => console.log(`     - ${p}`));
  }

  return { missing, newUrls };
}

// Main
async function main() {
  const startTime = Date.now();
  
  const result = await discoverUrls();
  
  // Salvar URLs descobertas
  const outputPath = path.join(__dirname, '..', 'discovered-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(result.links, null, 2));
  console.log(`💾 Salvo em: ${outputPath}`);

  // Salvar erros se houver
  if (result.errors.length > 0) {
    const errorsPath = path.join(__dirname, '..', 'discover-errors.json');
    fs.writeFileSync(errorsPath, JSON.stringify(result.errors, null, 2));
    console.log(`💾 Erros salvos em: ${errorsPath}`);
  }

  // Comparar com baseline
  compareWithBaseline(result.links);

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  console.log('');
  console.log(`⏱️  Tempo total: ${elapsed} minutos`);
}

main().catch(console.error);
