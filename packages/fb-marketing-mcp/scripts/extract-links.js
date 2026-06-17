const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'output');
const allLinks = [];

// 1. Ler todos os arquivos .md
const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.md'));

// 2. Extrair links de cada arquivo
for (const file of files) {
  const content = fs.readFileSync(path.join(outputDir, file), 'utf-8');
  const regex = /\[([^\]]+)\]\((\/docs\/marketing-api[^)]*)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    allLinks.push({
      name: match[1],
      path: match[2],
      link: `https://developers.facebook.com${match[2]}`
    });
  }
}

// 3. Desduplicar pelo path
const uniqueMap = new Map();
for (const item of allLinks) {
  if (!uniqueMap.has(item.path)) {
    uniqueMap.set(item.path, item);
  }
}
const uniqueLinks = Array.from(uniqueMap.values());

// 4. Salvar JSON
const outputPath = path.join(__dirname, '..', 'extracted-links.json');
fs.writeFileSync(outputPath, JSON.stringify(uniqueLinks, null, 2));

console.log(`Total extraído: ${allLinks.length}`);
console.log(`Links únicos: ${uniqueLinks.length}`);
console.log(`Salvo em: ${outputPath}`);
