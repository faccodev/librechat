# FB Marketing MCP

MCP Server para Facebook Marketing API - Documentação e Execução.

## Deploy no Railway

O repo já vem com `Dockerfile`, `railway.json` e `.env.example`. Migrations
Prisma rodam automaticamente no start (via `scripts/docker-entrypoint.sh`).

**Passos:**

1. New Project → Deploy from GitHub repo → selecione este repo.
2. No mesmo project: **+ New → Database → Add PostgreSQL**.
3. No service da app, aba **Variables**, adicione (cole os valores
   literalmente — o Railway resolve as expressões `${{ ... }}` no deploy):
   - `DATABASE_URL` = `${{ Postgres.DATABASE_URL }}`
   - `MCP_BASE_URL` = `https://${{ RAILWAY_PUBLIC_DOMAIN }}`
   - `MCP_ENCRYPTION_KEY` = `${{ secret(64, "0123456789abcdef") }}`
4. Aba **Settings → Networking → Generate Domain** (público).
5. Redeploy. O healthcheck em `/health` confirma que subiu.

Para virar template "1 clique" (botão Deploy on Railway no README):
abra o projeto já configurado no dashboard → **⋯ → Create Template** →
Publish. Como as 3 variáveis usam `${{ Postgres.* }}`, `${{ RAILWAY_PUBLIC_DOMAIN }}`
e `${{ secret(...) }}`, nada precisa ser preenchido pelo usuário.
Cole o markdown do botão gerado aqui no README.


## Visão Geral

Este MCP (Model Context Protocol) permite que IAs:

1. **Consultem documentação** da Facebook Marketing API (713+ arquivos)
2. **Executem operações** na plataforma Meta Ads (campanhas, insights, audiências)

## Instalação

### Via npx (recomendado)

```json
{
  "mcpServers": {
    "fb-marketing-mcp": {
      "command": "npx",
      "args": ["-y", "fb-marketing-mcp"]
    }
  }
}
```

### Com execução habilitada

```json
{
  "mcpServers": {
    "fb-marketing-mcp": {
      "command": "npx",
      "args": ["-y", "fb-marketing-mcp"],
      "env": {
        "META_ACCESS_TOKEN": "seu_token_aqui"
      }
    }
  }
}
```

## Variáveis de Ambiente

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `META_ACCESS_TOKEN` | Para execução | Token de acesso da API |
| `META_API_VERSION` | Não | Versão da API (default: v24.0) |

> **Nota**: As variáveis de ambiente são necessárias apenas para as tools de execução. A consulta de documentação funciona sem configuração.

### Multi-Account

Um token Meta pode ter acesso a múltiplas contas de anúncio. O fluxo recomendado:

1. `discover_ad_accounts` → lista todas as contas disponíveis
2. Passe `account_id: "act_XXXXX"` em cada chamada de tool que opera em nível de conta

Não é necessário configurar um `account_id` padrão — ele é passado explicitamente em cada chamada.

## Funcionalidades

### Tools de Consulta (sempre disponíveis)

| Tool | Descrição |
|------|-----------|
| `search_documentation` | Busca textual com sinônimos PT/EN |
| `get_document_by_path` | Obtém documento específico |
| `list_sections` | Lista seções da documentação |
| `get_endpoint_reference` | Referência de endpoint |
| `get_error_code_info` | Info sobre código de erro |
| `get_quick_reference` | Referência rápida |

### Tools de Execução (requerem API key)

#### Descoberta e Utilitários
- `discover_ad_accounts`, `list_facebook_pages`, `get_instagram_account`
- `list_pixels` - **NOVO** - Lista pixels da conta (necessário para conversões)
- `search_geolocation` - **NOVO** - Busca keys de localização para targeting

#### Campanhas
- `list_campaigns` (suporta `effective_status` filtering), `get_campaign`
- `create_campaign`, `update_campaign`, `pause_campaign`, `activate_campaign`

#### Ad Sets
- `list_adsets` (suporta `effective_status` filtering), `get_adset`
- `create_adset`, `update_adset`, `pause_adset`, `activate_adset`

#### Anúncios
- `list_ads`, `list_campaign_ads`, `get_ad`
- `create_ad`, `update_ad`, `pause_ad`, `activate_ad`

#### Criativos
- `list_creatives`, `get_creative`, `create_creative`

#### Insights e Atribuição
- `get_account_insights`, `get_campaign_insights`, `get_adset_insights`, `get_ad_insights`
- `get_attribution_comparison` - Compara modelos de atribuição (All vs Incremental)
- `get_performance_summary` - **NOVO** - Resumo agregado com métricas por atribuição
- `list_campaign_ads_with_insights` - **NOVO** - Lista ads de campanha com métricas (resolve N+1)

#### Audiências
- `list_custom_audiences`, `create_custom_audience`, `get_reach_estimate`

#### API Customizada
- `execute_api` - Chamadas customizadas para endpoints sem tool específica

#### Contexto
- `get_skill` - Retorna conteúdo do SKILL.md (guia do gestor de tráfego)
- `get_playbook` - Retorna conteúdo do PLAYBOOK.md (regras de otimização)
- `get_andromeda` - **NOVO** - Retorna conteúdo do ANDROMEDA.md (guia Meta Andromeda)

### Prompts Pré-configurados

| Prompt | Descrição |
|--------|-----------|
| `traffic_manager_mode` | Modo gestor de tráfego completo |
| `campaign_audit` | Auditoria de campanhas |
| `quick_optimization` | Otimização rápida |
| `create_campaign_guide` | Guia de criação de campanhas |
| `conversions_api_setup` | Configuração de CAPI |
| `audience_targeting_guide` | Guia de targeting |
| `pixel_setup` | Configuração de Pixel |
| `insights_reporting` | Relatórios de insights |

### Resources

Documentação disponível via URI scheme:

```
fb-marketing-docs://docs/{path}
```

Exemplo: `fb-marketing-docs://docs/insights/error-codes.md`

## Uso

### Consulta de documentação

```
Usuário: Como criar uma campanha de conversões?
IA: [Usa search_documentation] → Retorna documentação relevante
```

### Análise de performance

```
Usuário: Analise minhas campanhas dos últimos 7 dias
IA: [Usa get_account_insights com date_preset: "last_7d"]
```

### Criação de campanha

```
Usuário: Crie uma campanha de tráfego
IA: [Usa create_campaign com objective: "OUTCOME_TRAFFIC"]
```

### Fluxo completo para campanhas de conversões

```
1. create_campaign (objective: "OUTCOME_SALES")
2. list_pixels → obter pixel_id
3. search_geolocation → obter keys de localização corretos
4. create_adset (com promoted_object, targeting, advantage_audience)
5. create_creative
6. create_ad
```

> **Importante (v24.0):** Ad sets com `advantage_audience=1` (padrão) requerem `age_min=18` e `age_max=65`. Para controle rígido de idade, use `advantage_audience=0`.

## Desenvolvimento

### Build

```bash
npm install
npm run build
```

### Executar localmente

```bash
npm start
```

### Usar código local no Cursor IDE

Para desenvolvimento e testes, configure o MCP para usar o código local em vez do pacote npm:

```json
{
  "mcpServers": {
    "fb-marketing-mcp": {
      "command": "node",
      "args": ["/caminho/absoluto/para/projeto/dist/index.js"],
      "env": {
        "META_ACCESS_TOKEN": "seu_token_aqui"
      }
    }
  }
}
```

> **Importante:** Após alterações no código TypeScript, execute `npm run build` e reinicie o MCP (Reload MCP Servers) para que as mudanças tenham efeito.

### Scripts de scraping (manutenção)

```bash
npm run scrape          # Scraping completo
npm run scrape:resume   # Retomar scraping
npm run retry-errors    # Retry de erros
npm run discover        # Descobrir URLs
```

## Estrutura do Projeto

```
├── src/
│   ├── index.ts          # Entry point
│   ├── docs-tools.ts     # Tools de documentação
│   ├── api-tools.ts      # Tools de execução
│   ├── meta-client.ts    # Cliente da API Meta
│   ├── resources.ts      # Resources (URI)
│   ├── prompts.ts        # Prompts pré-configurados
│   └── utils/
│       ├── config.ts     # Configuração
│       ├── fileLoader.ts # Carregamento de arquivos
│       └── search.ts     # Sistema de busca
├── docs/                 # 713+ arquivos de documentação
├── scripts/              # Scripts de scraping
├── SKILL.md              # Skill para ClawdBots
├── ANDROMEDA.md           # Guia oficial Meta Andromeda (estratégia + técnico)
└── PLAYBOOK.md            # Regras de negócio e otimização
```

## Documentação Incluída

A pasta `docs/` contém 713+ arquivos de documentação:

- **insights/** - API de Insights e métricas
- **audiences/** - Audiências e targeting
- **conversions-api/** - Conversions API (CAPI)
- **catalog/** - Catálogo de produtos
- **get-started/** - Primeiros passos
- **guides/** - Guias de recursos
- **reference/** - Referência técnica completa

## Documentação de Estratégia

| Arquivo | Descrição |
|---------|-----------|
| `SKILL.md` | Skill para ClawdBots - instruções para usar o MCP como gestor de tráfego |
| `ANDROMEDA.md` | Guia oficial Meta Andromeda - estratégia + referências técnicas da API |
| `PLAYBOOK.md` | Regras de negócio, thresholds, fluxos de diagnóstico e otimização |

## Licença

MIT
