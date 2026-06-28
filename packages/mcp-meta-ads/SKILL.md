# Skill: Gestor de Tráfego Meta Ads

Skill para transformar a IA em um gestor de tráfego profissional para a plataforma Meta Ads.

> **Nota:** Este arquivo contém a documentação técnica genérica. Para thresholds de performance, regras de otimização e valores específicos por localização, veja o [PLAYBOOK.md](PLAYBOOK.md). Para o guia estratégico e técnico sobre o Meta Andromeda (diversidade criativa, broad targeting, CAPI, estrutura consolidada), veja o [ANDROMEDA.md](ANDROMEDA.md).

## Descrição

Esta skill habilita a IA a atuar como um gestor de tráfego completo, capaz de:
- Consultar documentação técnica da API de Marketing
- Criar e gerenciar campanhas, ad sets e anúncios
- Analisar métricas e performance com múltiplas janelas de atribuição
- Comparar modelos de atribuição (All vs First vs Incremental)
- Sugerir otimizações baseadas em dados reais de eficiência
- Gerenciar audiências e targeting

## Pré-requisitos

### MCP Server
Configure o MCP `fb-marketing-mcp` no seu cliente:

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

### Variáveis de Ambiente
- `META_ACCESS_TOKEN` - Token de acesso da API (obrigatório para execução)
- `META_API_VERSION` - Versão da API (opcional, default: v24.0)

**Multi-Account:** Um token pode acessar múltiplas contas. Use `discover_ad_accounts` para listar e passe `account_id` em cada chamada.

**Nota**: Para apenas consultar documentação, as variáveis de ambiente não são necessárias.

## Capacidades

### Modo Consulta (sempre disponível)
- Buscar documentação técnica
- Consultar referência de endpoints
- Verificar códigos de erro
- Obter exemplos de implementação

### Modo Execução (requer API configurada)
- Criar/editar/pausar/ativar campanhas
- Gerenciar ad sets e anúncios
- Obter insights e métricas
- **Analisar atribuição e eficiência real** (incremental vs all conversions)
- Gerenciar audiências customizadas
- Estimar alcance de targeting

## Tools Disponíveis

### Documentação
| Tool | Descrição |
|------|-----------|
| `search_documentation` | Busca textual com sinônimos PT/EN |
| `get_document_by_path` | Obtém documento específico |
| `list_sections` | Lista seções da documentação |
| `get_endpoint_reference` | Referência de endpoint |
| `get_error_code_info` | Info sobre código de erro |
| `get_quick_reference` | Referência rápida |

### Descoberta de Recursos
| Tool | Descrição |
|------|-----------|
| `discover_ad_accounts` | **PRIMEIRA CHAMADA** - Descobre contas de anúncios do usuário |
| `list_facebook_pages` | Lista páginas do Facebook (necessário para criativos) |
| `get_instagram_account` | Obtém ID do Instagram vinculado à página |
| `list_pixels` | **NOVO** - Lista pixels da conta (necessário para conversões) |
| `search_geolocation` | **NOVO** - Busca keys de localização para targeting (CRÍTICO!) |

### Campanhas
| Tool | Descrição |
|------|-----------|
| `list_campaigns` | Listar campanhas (suporta `effective_status` filtering) |
| `get_campaign` | Detalhes de campanha |
| `create_campaign` | Criar campanha |
| `update_campaign` | Atualizar campanha |
| `pause_campaign` | Pausar campanha |
| `activate_campaign` | Ativar campanha |

### Ad Sets
| Tool | Descrição |
|------|-----------|
| `list_adsets` | Listar ad sets (suporta `effective_status` filtering) |
| `get_adset` | Detalhes de ad set |
| `create_adset` | Criar ad set |
| `update_adset` | Atualizar ad set |
| `pause_adset` | Pausar ad set |
| `activate_adset` | Ativar ad set |

### Anúncios
| Tool | Descrição |
|------|-----------|
| `list_ads` | Listar todos os anúncios |
| `list_campaign_ads` | Listar anúncios de uma campanha |
| `get_ad` | Detalhes de anúncio |
| `create_ad` | Criar anúncio |
| `update_ad` | Atualizar anúncio |
| `pause_ad` | Pausar anúncio |
| `activate_ad` | Ativar anúncio |

### Criativos
| Tool | Descrição |
|------|-----------|
| `list_creatives` | Listar criativos da conta |
| `get_creative` | Detalhes de um criativo |
| `create_creative` | Criar criativo |

### Insights e Atribuição
| Tool | Descrição |
|------|-----------|
| `get_account_insights` | Métricas da conta (suporta atribuição) |
| `get_campaign_insights` | Métricas de campanha (suporta atribuição) |
| `get_adset_insights` | Métricas de ad set (suporta atribuição) |
| `get_ad_insights` | Métricas de anúncio (suporta atribuição) |
| `get_attribution_comparison` | Compara All vs First vs Incremental |
| `get_performance_summary` | **NOVO** - Resumo agregado com métricas por atribuição |
| `list_campaign_ads_with_insights` | **NOVO** - Lista ads de campanha JÁ COM métricas (resolve N+1) |

### Audiências
| Tool | Descrição |
|------|-----------|
| `list_custom_audiences` | Listar audiências |
| `create_custom_audience` | Criar audiência |
| `get_reach_estimate` | Estimativa de alcance |

### API Avançada
| Tool | Descrição |
|------|-----------|
| `execute_api` | Executa chamadas customizadas à API da Meta |

### Contexto (não requer API)
| Tool | Descrição |
|------|-----------|
| `get_skill` | Retorna este SKILL.md para auto-configuração |
| `get_playbook` | Retorna PLAYBOOK.md com regras de otimização |
| `get_andromeda` | **NOVO** - Retorna ANDROMEDA.md com guia estratégico/técnico do Meta Andromeda |

## Instruções de Uso

### 1. Consulta de Documentação

```
Usuário: Como criar uma campanha de conversões?

IA: [Usa search_documentation com query "criar campanha conversões"]
    [Retorna documentação relevante e exemplos]
```

### 2. Análise de Performance

```
Usuário: Analise a performance das minhas campanhas nos últimos 7 dias.

IA: [Usa list_campaigns para obter campanhas]
    [Usa get_account_insights com date_preset: "last_7d"]
    [Analisa métricas e sugere otimizações]
```

### 3. Análise de Atribuição (Eficiência Real)

```
Usuário: Quero saber se estou pagando por conversões orgânicas.

IA: [Usa get_attribution_comparison com object_type: "campaign"]
    [Compara All Conversions vs Incremental]
    [Alerta se incremental < 30% (risco de pagar por orgânicas)]
    [Sugere testar otimização First Conversion se aplicável]
```

### 4. Criação de Campanha

```
Usuário: Crie uma campanha de tráfego para meu e-commerce.

IA: [Usa create_campaign com objetivo OUTCOME_TRAFFIC]
    [Confirma criação e retorna ID]
    [Sugere próximos passos: criar ad set e anúncio]
```

### 5. Criação de Campanha de Conversões (Fluxo Completo)

```
Usuário: Crie uma campanha de conversões para São Paulo.

IA: [Usa create_campaign com objetivo OUTCOME_SALES, status PAUSED]
    [Usa list_pixels para obter pixel_id disponível]
    [Usa search_geolocation com q="São Paulo" para obter key=460]
    [Usa create_adset com:
      - promoted_object: { pixel_id, custom_event_type: "PURCHASE" }
      - targeting: { geo_locations: { regions: [{ key: "460" }] }, age_min: 18, age_max: 65 }
      - advantage_audience: 1
    ]
    [Usa list_facebook_pages para obter page_id]
    [Usa create_creative com page_id e textos]
    [Usa create_ad vinculando creative ao ad set]
```

### 6. Operações Avançadas (execute_api)

Use `execute_api` para endpoints sem tool específica:

```
Usuário: Duplique a campanha 123456789 com todos os ad sets e anúncios.

IA: [Usa execute_api com:
    method: "POST"
    endpoint: "123456789/copies"
    params: { deep_copy: true, status_option: "PAUSED" }]
    [Retorna ID da nova campanha]
```

## Guardrails de Segurança

### Sempre
- Confirmar com o usuário antes de criar ou modificar recursos
- Criar campanhas inicialmente com status PAUSED
- Validar parâmetros obrigatórios antes de executar
- **NUNCA inventar IDs de conta** - sempre usar `discover_ad_accounts` para obter IDs reais
- **Passar `account_id` explicitamente** em cada chamada de tool que opera em nível de conta

### Parâmetros Obrigatórios (v24.0+)
- **Campanhas sem CBO**: Incluir `is_adset_budget_sharing_enabled` (ver diferença abaixo)
- **Ad Sets**: Incluir `bid_strategy` (ex: `LOWEST_COST_WITHOUT_CAP`)
- **Orçamento mínimo**: Varia por país (consulte [PLAYBOOK.md](PLAYBOOK.md) para valores específicos)

### CBO vs ABO (Importante!)

**NÃO confunda** `is_adset_budget_sharing_enabled` com CBO:

| Tipo | Orçamento | Parâmetro |
|------|-----------|-----------|
| **CBO** | Na campanha, Meta distribui | `campaign.daily_budget` |
| **ABO** | Fixo em cada ad set | `adset.daily_budget` + `is_adset_budget_sharing_enabled: false` |
| **ABO + Sharing** | Em cada ad set, com ±20% flexibilidade | `adset.daily_budget` + `is_adset_budget_sharing_enabled: true` |

- Use **CBO** para otimização automática
- Use **ABO sem sharing** para testes A/B com controle exato
- Use **ABO com sharing** para controle com alguma flexibilidade

### Advantage+ Audience (v24.0)

O parâmetro `advantage_audience` é **obrigatório** na API v24.0:

| Valor | Comportamento | Restrição de Idade |
|-------|---------------|-------------------|
| `1` (padrão) | Meta otimiza público automaticamente | `age_min` deve ser 18, `age_max` deve ser 65 |
| `0` | Targeting manual rígido | Qualquer faixa etária permitida |

**CRÍTICO:** Com `advantage_audience=1`, a API **REJEITA** (erro 1870189):
- `age_max < 65`
- `age_min > 18`

**Quando usar cada opção:**
- **advantage_audience=1**: Campanhas de performance onde o Meta pode otimizar
- **advantage_audience=0**: Testes A/B ou quando precisa controle exato de idade

### Localização - NUNCA Invente Keys!

Use `search_geolocation` para obter os keys corretos. Exemplos:

| Localização | Tipo | Key |
|-------------|------|-----|
| Brasil | country | BR |
| São Paulo (estado) | region | 460 |
| São Paulo (cidade) | city | 269969 |

**Erro comum:** Usar key arbitrário (ex: 3847) resulta em targeting errado (California em vez de São Paulo).

### Limites
- Não exceder orçamentos sem confirmação explícita
- Não ativar campanhas automaticamente
- Alertar sobre targeting muito restrito ou muito amplo
- Não usar IDs de conta arbitrários - sempre obter via `discover_ad_accounts`

### Boas Práticas
- Sugerir nomenclatura consistente
- Recomendar estrutura de campanha adequada ao objetivo
- Alertar sobre possíveis problemas de configuração

## Fluxos de Trabalho

### Criar Estrutura Completa

0. **Descoberta**: Validar conta e obter IDs necessários
   - `discover_ad_accounts` → ID da conta
   - `list_facebook_pages` → page_id para criativos
   - `get_instagram_account` → instagram_user_id (se aplicável)
1. **Campanha**: `create_campaign` com objetivo (OUTCOME_SALES, OUTCOME_LEADS, etc.)
2. **Preparação para Ad Set** (se objetivo for conversões):
   - `list_pixels` → pixel_id para promoted_object
   - `search_geolocation` → keys corretos de localização (NUNCA inventar!)
3. **Ad Set**: `create_adset` com targeting, promoted_object e advantage_audience
4. **Creative**: `create_creative` com page_id e textos
5. **Ad**: `create_ad` associando creative ao ad set
6. **Revisão**: Verificar configuração antes de ativar

### Auditoria de Campanhas

1. Listar todas as campanhas
2. Obter insights agregados
3. Identificar campanhas com baixo desempenho
4. Sugerir otimizações específicas
5. Executar otimizações aprovadas

### Otimização Rápida

1. Verificar métricas principais (CTR, CPC, ROAS)
2. Identificar campanhas abaixo dos thresholds definidos
3. Escalar campanhas com bom desempenho
4. Ajustar targeting baseado em breakdowns

> **Nota:** Para thresholds específicos (CTR mínimo, ROAS alvo, etc.), consulte [PLAYBOOK.md](PLAYBOOK.md).

### Análise de Eficiência Real (Atribuição)

1. Obter comparação de atribuição
   - `get_attribution_comparison(object_id, object_type)`
2. Calcular % incremental
   - `incremental / all_conversions`
3. Avaliar conforme thresholds definidos
4. Recomendar ações baseadas na análise

> **Nota:** Para thresholds de % incremental e regras de ação, consulte [PLAYBOOK.md](PLAYBOOK.md).

## Guia: Atribuição e Janelas de Conversão

### Conceitos Fundamentais

| Modelo | Descrição | Use quando... |
|--------|-----------|---------------|
| **All Conversions** | Conta todas as conversões (padrão) | Quer volume máximo reportado |
| **First Conversion** | Conta apenas primeira conversão por usuário | Métricas de aquisição precisas |
| **Incremental** | Conversões que não teriam acontecido sem o anúncio | Quer saber impacto real |

### Janelas de Atribuição Disponíveis

| Janela | Descrição |
|--------|-----------|
| `1d_click` | Conversões 1 dia após clique |
| `7d_click` | Conversões 7 dias após clique |
| `28d_click` | Conversões 28 dias após clique |
| `1d_view` | Conversões 1 dia após visualização |
| `7d_view` | Conversões 7 dias após visualização |
| `incrementality` | Atribuição incremental (modelo causal) |
| `dda` | Data-driven attribution |

### Usando Janelas de Atribuição nas Tools

Todas as tools de insights aceitam parâmetros de atribuição:

```json
{
  "campaign_id": "123456789",
  "date_preset": "last_30d",
  "fields": ["spend", "actions", "cost_per_action_type"],
  "action_attribution_windows": ["1d_click", "7d_click", "incrementality"],
  "use_unified_attribution_setting": false
}
```

**Resposta com breakdown:**
```json
{
  "action_type": "purchase",
  "value": "158",
  "1d_click": "10",
  "7d_click": "32",
  "incrementality": "24"
}
```

### Tool: get_attribution_comparison

Compara automaticamente modelos de atribuição com formatação clara:

```
Usuário: Compare a atribuição da campanha 123456789

IA: [Usa get_attribution_comparison]

Resultado:
| Modelo | Conversões | CPA |
|--------|------------|-----|
| All Conversions | 158 | [valor na moeda local] |
| 7d Click | 32 | [valor na moeda local] |
| Incremental | 24 | [valor na moeda local] |

% Incremental: X% das conversões totais
→ Interprete conforme thresholds do PLAYBOOK.md
```

### Regra Prática de Diagnóstico

A interpretação do % incremental varia por negócio. Consulte [PLAYBOOK.md](PLAYBOOK.md) para thresholds específicos.

**Conceito geral:**
- **% alto**: Conversões realmente causadas pelo anúncio
- **% baixo**: Possível canibalização de conversões orgânicas

### Fluxo de Diagnóstico Completo

```
1. Listar campanhas ativas
   └── list_campaigns(status=ACTIVE)

2. Analisar atribuição
   └── get_attribution_comparison(object_id, object_type="campaign")

3. Calcular eficiência real
   └── incremental / all_conversions = % real

4. Identificar criativos eficientes
   └── Ordenar por CPA incremental (não CPA padrão)

5. Recomendar ações conforme thresholds do PLAYBOOK.md
```

## Guia: execute_api

A tool `execute_api` permite executar qualquer endpoint da Facebook Marketing API.

### Quando Usar

- Duplicar campanhas, ad sets ou anúncios (endpoint `/copies`)
- Acessar endpoints não cobertos por tools específicas
- Operações em lote ou endpoints experimentais

### Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `method` | string | Sim | `GET`, `POST` ou `DELETE` |
| `endpoint` | string | Sim | Endpoint da API (ex: `123456/copies`) |
| `params` | object | Não | Parâmetros da requisição |

### Placeholder de Conta

Use `{ad_account_id}` no endpoint junto com o parâmetro `account_id` para substituição automática:

```json
{
  "method": "POST",
  "endpoint": "{ad_account_id}/adimages",
  "account_id": "act_123456789",
  "params": { "filename": "/path/to/image.png" }
}
```

O `{ad_account_id}` será substituído pelo valor de `account_id`.

### Exemplos Comuns

**Duplicar Campanha (deep copy):**
```json
{
  "method": "POST",
  "endpoint": "123456789/copies",
  "params": {
    "deep_copy": true,
    "status_option": "PAUSED"
  }
}
```

**Listar Ads de uma Campanha:**
```json
{
  "method": "GET",
  "endpoint": "123456789/ads",
  "params": {
    "fields": "id,name,status,creative"
  }
}
```

**Obter Delivery Estimate:**
```json
{
  "method": "GET",
  "endpoint": "123456789/delivery_estimate"
}
```

### Limitações do deep_copy

Ao duplicar campanhas/ad sets com `deep_copy: true`:

- **Chamada síncrona**: Máximo 3 objetos (ads + ad sets + campanhas)
- **Chamada assíncrona**: Máximo 51 objetos (use async batch requests)
- **DSA (União Europeia)**: Campanhas targeting a UE requerem `dsa_payor` e `dsa_beneficiary` configurados na conta
- **Campanhas finalizadas**: A cópia será agendada para iniciar no momento da criação

**Erro comum (1885194)**: "A solicitação de cópia é muito grande"

Se sua campanha tem mais de 3 ads/ad sets, você receberá este erro. Soluções:
1. Use `deep_copy: false` para copiar apenas a campanha (sem filhos)
2. Copie ad sets individualmente com seus ads
3. Use async batch requests para copiar muitos objetos de uma vez

Link: https://developers.facebook.com/docs/graph-api/asynchronous-batch-requests

Se receber erro 100 "Invalid parameter", verifique também:
- Configurações de DSA se targeting inclui UE (erros 3858079/3858081)
- Use `get_error_code_info` para mais detalhes sobre o subcódigo

### Dicas

- Consulte a documentação com `search_documentation` para descobrir endpoints disponíveis
- Use `get_endpoint_reference` para ver parâmetros aceitos por cada endpoint
- Sempre teste com `status_option: "PAUSED"` ao criar/duplicar recursos

## Prompts Pré-Configurados

Use os prompts do MCP para contexto adicional:

- `traffic_manager_mode` - Contexto completo de gestor de tráfego
- `campaign_audit` - Contexto para auditoria
- `quick_optimization` - Contexto para otimização rápida
- `create_campaign_guide` - Guia de criação de campanhas
- `conversions_api_setup` - Configuração de CAPI
- `audience_targeting_guide` - Guia de targeting
- `pixel_setup` - Configuração de Pixel
- `insights_reporting` - Relatórios de insights

## Exemplos de Uso

### Consulta Simples
```
"Qual é o endpoint para criar uma campanha?"
→ search_documentation("criar campanha endpoint")
```

### Análise de Conta
```
"Mostre a performance da minha conta no último mês"
→ get_account_insights(date_preset: "last_month")
```

### Criação Guiada
```
"Preciso criar uma campanha para gerar leads"
→ 1. Consulta documentação de lead ads
  2. Sugere estrutura de campanha
  3. Confirma com usuário
  4. Executa create_campaign
```

### Análise de Atribuição
```
"Estou pagando por conversões orgânicas?"
→ get_attribution_comparison(object_id: "{campaign_id}", object_type: "campaign")
→ Compara All vs First vs Incremental automaticamente

"Quero ver as conversões por janela de atribuição"
→ get_ad_insights(ad_id: "{id}", action_attribution_windows: ["1d_click", "7d_click", "incrementality"])

"Qual é o CPA incremental dos meus anúncios?"
→ get_attribution_comparison(object_id: "{ad_id}", object_type: "ad")
→ Mostra CPA por modelo de atribuição (All, First, Incremental)

"Me dê um resumo de performance com atribuição incremental"
→ get_performance_summary(date_preset: "last_30d", action_types: ["purchase", "lead"])
→ Retorna spend, conversões all/incremental, CPA, ROAS (se configurado)

"Liste todos os anúncios da campanha X com métricas"
→ list_campaign_ads_with_insights(campaign_id: "{id}", action_attribution_windows: ["incrementality"])
→ Retorna ads + insights em uma chamada só (resolve o problema N+1)
```

### Filtering (Economia de Tokens)
```
"Liste só campanhas ativas"
→ list_campaigns(effective_status: ["ACTIVE"])

"Liste ad sets ativos ou pausados"
→ list_adsets(effective_status: ["ACTIVE", "PAUSED"])
```

### Operações Avançadas
```
"Duplique minha campanha de vendas"
→ execute_api(method: "POST", endpoint: "{id}/copies", params: { deep_copy: true })

"Liste os anúncios da campanha X"
→ list_campaign_ads(campaign_id: "{campaign_id}")

"Qual o delivery estimate do ad set Y?"
→ execute_api(method: "GET", endpoint: "{adset_id}/delivery_estimate")
```

## Limitações

- Não é possível fazer upload de mídia (imagens/vídeos)
- Para operações sem tool específica, use `execute_api` com o endpoint desejado
- Rate limits da API da Meta se aplicam
- Algumas features podem não estar disponíveis em todas as contas

## Erros Comuns e Soluções

### Erro: ID da Conta Não Existe (subcódigo 33)

**Causa**: Uso de ID de conta inventado ou de exemplo da documentação.

**Solução**: Use `discover_ad_accounts` para obter IDs reais e passe `account_id` em cada chamada.

### Erro: `is_adset_budget_sharing_enabled` Obrigatório (subcódigo 4834011)

**Causa**: Campo obrigatório a partir da v24.0 para campanhas sem CBO.

**Solução**: Adicione ao criar campanhas:
```json
{
  "is_adset_budget_sharing_enabled": false
}
```

### Erro: Bid Strategy Obrigatório (subcódigo 2490487)

**Causa**: Ad sets precisam de estratégia de lance definida.

**Solução**: Adicione `bid_strategy` ao criar ad sets:
```json
{
  "bid_strategy": "LOWEST_COST_WITHOUT_CAP"
}
```

### Erro: Orçamento Muito Baixo (subcódigo 1885272)

**Causa**: Orçamento mínimo varia por país e moeda.

**Solução**: Consulte [PLAYBOOK.md](PLAYBOOK.md) para valores específicos por localização. Exemplo:
```json
{
  "daily_budget": 600  // valor em centavos da moeda local
}
```

### Erro: Campo `approximate_count` Não Existe

**Causa**: Campo foi removido de Custom Audiences.

**Solução**: Use campos alternativos:
- `approximate_count_lower_bound`
- `approximate_count_upper_bound`

Ou omita o campo na lista de fields.

### Erro: Instagram ID Depreciado (erro 12)

**Causa**: O ID do Instagram mostrado na UI do Meta Ads (`5610...`) é o formato **antigo**, depreciado na v22.0+.

**Solução**:
1. Descubra o ID novo via API:
```json
GET /{page_id}?fields=instagram_business_account
// Retorna: {"instagram_business_account": {"id": "17841457593597590"}}
```

2. Use `instagram_user_id` **dentro** do `object_story_spec`:
```json
{
  "object_story_spec": {
    "page_id": "123456789",
    "instagram_user_id": "17841457593597590",  // ID novo!
    "link_data": {...}
  }
}
```

**NÃO use**: `instagram_actor_id` (campo errado/depreciado)

## Troubleshooting: Duplicação de Campanhas

### Erros Comuns na Duplicação

| Subcódigo | Problema | Solução |
|-----------|----------|---------|
| `1885194` | Solicitação de cópia muito grande (>3 objetos) | Use async batch ou copie objetos individualmente |
| `2490085` | Crop key `191x100` obsoleto | Recrie o criativo sem `image_crops` ou use apenas `100x100` |
| `3858504` | Criativo com `standard_enhancements` | Recrie o criativo sem aprimoramentos padrão (depreciado na v22.0+) |
| `1885183` | Post criado por app em modo development | O app precisa estar em modo público/produção |

### image_hash vs image_crops

**Conceito importante**: O `image_hash` é reutilizável, mas o `image_crops` pode estar obsoleto.

```json
// ❌ Original (com crop obsoleto):
{
  "image_hash": "65b50b898da88607da98c7ebc6adf615",
  "image_crops": {"191x100": [[0, 94], [1080, 659]]}
}

// ✅ Solução (sem crop, usa padrão automático):
{
  "image_hash": "65b50b898da88607da98c7ebc6adf615"
}
```

**Trade-off**: Ao omitir `image_crops`, a API usa o crop padrão automático. A imagem pode aparecer cortada de forma diferente em alguns posicionamentos, mas funciona.

### Workaround para Criativos Problemáticos

Quando a duplicação falha por criativos incompatíveis:

1. **Obtenha os dados do criativo original** (image_hash, textos, links)
2. **Crie um novo criativo** passando apenas os campos essenciais:
   - `image_hash` (sem `image_crops`)
   - Textos e links
   - Omita `standard_enhancements` e `degrees_of_freedom_spec`
3. **Crie o ad** associando o novo criativo ao ad set

### Placement Asset Customization

Anúncios com regras complexas de customização por posicionamento (feed, stories, reels com crops diferentes) podem falhar na duplicação. 

**Solução simples**: Recrie com um criativo único e deixe a Meta otimizar automaticamente.

## Suporte

Para problemas com a API:
- Use `get_error_code_info` para entender erros
- Consulte a documentação em `docs/error-reference/`
- Verifique permissões do token de acesso
