# Referência Rápida - Facebook Marketing API

Guia rápido com os endpoints e exemplos mais comuns para a API de Marketing do Facebook.

## Estrutura de Anúncios

```
Campaign (Campanha)
├── Objetivo de marketing
├── Orçamento (opcional CBO)
└── Ad Set (Conjunto de Anúncios)
    ├── Targeting (público-alvo)
    ├── Posicionamento
    ├── Orçamento e lance
    └── Ad (Anúncio)
        ├── Creative (criativo)
        └── CTA (call-to-action)
```

## Autenticação

### Token de Acesso

```bash
# Variáveis de ambiente necessárias
META_ACCESS_TOKEN=EAAxxxxxxx...
META_API_VERSION=v24.0  # opcional, default: v24.0
```

### Base URL

```
https://graph.facebook.com/{api_version}/
```

### Descobrir ID da Conta

**SEMPRE** descubra o ID real da conta antes de operações com `execute_api`:

```
GET /me/adaccounts?fields=id,name,account_status
```

Resposta:
```json
{
  "data": [
    {"id": "act_618288566086470", "name": "Minha Conta", "account_status": 1}
  ]
}
```

> **NUNCA** invente ou use IDs de exemplo da documentação. Use `discover_ad_accounts` ou `GET me/adaccounts` para obter IDs reais. Passe `account_id` em cada chamada de tool.

### Descobrir Páginas do Facebook

```
GET /me/accounts?fields=id,name,access_token
```

### Descobrir Conta do Instagram Vinculada

**IMPORTANTE:** O ID do Instagram mostrado na UI do Meta Ads é o formato **antigo** (depreciado v22.0+). Use a API para obter o ID correto:

```
GET /{page_id}?fields=instagram_business_account,connected_instagram_account
```

Resposta:
```json
{
  "instagram_business_account": {"id": "17841457593597590"},
  "connected_instagram_account": {"id": "17841457593597590"},
  "id": "104270431948334"
}
```

Use o ID de `instagram_business_account` no campo `instagram_user_id` do criativo.

## Endpoints Principais

### Campanhas

| Operação | Método | Endpoint |
|----------|--------|----------|
| Listar | GET | `/{ad_account_id}/campaigns` |
| Criar | POST | `/{ad_account_id}/campaigns` |
| Ler | GET | `/{campaign_id}` |
| Atualizar | POST | `/{campaign_id}` |
| Deletar | DELETE | `/{campaign_id}` |

**Exemplo - Criar campanha:**
```json
POST /{ad_account_id}/campaigns
{
  "name": "Minha Campanha",
  "objective": "OUTCOME_SALES",
  "status": "PAUSED",
  "special_ad_categories": [],
  "is_adset_budget_sharing_enabled": false
}
```

> **IMPORTANTE (v24.0+)**: O campo `is_adset_budget_sharing_enabled` é **obrigatório** para campanhas sem CBO. Veja a seção "CBO vs ABO" abaixo.

## CBO vs ABO vs Budget Sharing

| Tipo | Descrição | Orçamento em | Parâmetro |
|------|-----------|--------------|-----------|
| **CBO** | Campaign Budget Optimization - Meta distribui orçamento da campanha entre ad sets | Campanha | `campaign.daily_budget` |
| **ABO** | Ad Set Budget Optimization - Cada ad set tem orçamento fixo | Ad Set | `adset.daily_budget` |
| **ABO + Sharing** | ABO com compartilhamento de até 20% entre ad sets | Ad Set (flexível) | `is_adset_budget_sharing_enabled: true` |

```
CBO (orçamento na campanha):
Campaign [daily_budget: 10000]
├── Ad Set A (Meta decide quanto)
├── Ad Set B (Meta decide quanto)
└── Ad Set C (Meta decide quanto)

ABO sem sharing (is_adset_budget_sharing_enabled: false):
Campaign [sem orçamento]
├── Ad Set A [daily_budget: 3000] → gasta exatamente R$ 30
├── Ad Set B [daily_budget: 4000] → gasta exatamente R$ 40
└── Ad Set C [daily_budget: 3000] → gasta exatamente R$ 30

ABO com sharing (is_adset_budget_sharing_enabled: true):
Campaign [sem orçamento]
├── Ad Set A [daily_budget: 3000] → pode gastar R$ 24-36 (±20%)
├── Ad Set B [daily_budget: 4000] → pode gastar R$ 32-48 (±20%)
└── Ad Set C [daily_budget: 3000] → pode gastar R$ 24-36 (±20%)
```

**Quando usar cada um:**
- **CBO**: Quando quer que a Meta otimize a distribuição automaticamente
- **ABO sem sharing**: Quando precisa de controle exato do orçamento por ad set (ex: testes A/B)
- **ABO com sharing**: Quando quer controle por ad set mas com flexibilidade para otimização

### Ad Sets (Conjuntos de Anúncios)

| Operação | Método | Endpoint |
|----------|--------|----------|
| Listar | GET | `/{ad_account_id}/adsets` |
| Criar | POST | `/{ad_account_id}/adsets` |
| Ler | GET | `/{adset_id}` |
| Atualizar | POST | `/{adset_id}` |

**Exemplo - Criar ad set:**
```json
POST /{ad_account_id}/adsets
{
  "name": "Meu Ad Set",
  "campaign_id": "123456789",
  "daily_budget": 600,
  "billing_event": "IMPRESSIONS",
  "optimization_goal": "LINK_CLICKS",
  "bid_strategy": "LOWEST_COST_WITHOUT_CAP",
  "targeting": {
    "geo_locations": {
      "countries": ["BR"]
    },
    "age_min": 18,
    "age_max": 65
  },
  "status": "PAUSED"
}
```

> **IMPORTANTE**:
> - O `bid_strategy` é **obrigatório**. Use `LOWEST_COST_WITHOUT_CAP` para lance automático ou `COST_CAP`/`BID_CAP` com `bid_amount`.
> - Orçamento mínimo varia por país e moeda. Consulte a documentação local ou use `GET /act_{id}?fields=min_daily_budget` para descobrir o valor mínimo da conta.

### Anúncios

| Operação | Método | Endpoint |
|----------|--------|----------|
| Listar | GET | `/{ad_account_id}/ads` |
| Criar | POST | `/{ad_account_id}/ads` |
| Ler | GET | `/{ad_id}` |
| Atualizar | POST | `/{ad_id}` |

**Exemplo - Criar anúncio:**
```json
POST /{ad_account_id}/ads
{
  "name": "Meu Anúncio",
  "adset_id": "123456789",
  "creative": {
    "creative_id": "987654321"
  },
  "status": "PAUSED"
}
```

### Criativos

| Operação | Método | Endpoint |
|----------|--------|----------|
| Listar | GET | `/{ad_account_id}/adcreatives` |
| Criar | POST | `/{ad_account_id}/adcreatives` |

**Exemplo - Criar criativo com conta do Instagram:**

```json
POST /{ad_account_id}/adcreatives
{
  "name": "Meu Criativo",
  "object_story_spec": {
    "page_id": "123456789",
    "instagram_user_id": "17841457593597590",
    "link_data": {
      "link": "https://meusite.com",
      "message": "Texto do anúncio",
      "call_to_action": {"type": "LEARN_MORE"}
    }
  }
}
```

> **IMPORTANTE - Conta do Instagram:**
> 1. O campo correto é `instagram_user_id` **dentro** do `object_story_spec`
> 2. NÃO use `instagram_actor_id` (depreciado na v22.0+)
> 3. O ID mostrado na UI do Meta Ads é o formato **antigo** e não funciona
> 4. Descubra o ID novo via: `GET /{page_id}?fields=instagram_business_account`

### Insights (Métricas)

| Operação | Método | Endpoint |
|----------|--------|----------|
| Conta | GET | `/{ad_account_id}/insights` |
| Campanha | GET | `/{campaign_id}/insights` |
| Ad Set | GET | `/{adset_id}/insights` |
| Anúncio | GET | `/{ad_id}/insights` |

**Exemplo - Obter insights:**
```
GET /{ad_account_id}/insights?fields=impressions,clicks,spend,cpc,ctr&date_preset=last_7d
```

**Exemplo - Insights com Atribuição Incremental:**
```
GET /{campaign_id}/insights?fields=spend,actions,cost_per_action_type&action_attribution_windows=["1d_click","7d_click","incrementality"]&use_unified_attribution_setting=false
```

### Filtering por Status

Use `filtering` para retornar apenas objetos com status específico (economiza tokens):

**Exemplo - Listar só campanhas ativas:**
```
GET /{ad_account_id}/campaigns?fields=id,name,status&filtering=[{"field":"effective_status","operator":"IN","value":["ACTIVE"]}]
```

**Exemplo - Listar ad sets ativos ou pausados:**
```
GET /{ad_account_id}/adsets?fields=id,name,status&filtering=[{"field":"effective_status","operator":"IN","value":["ACTIVE","PAUSED"]}]
```

**Valores válidos para effective_status:**
- `ACTIVE`, `PAUSED`, `DELETED`, `ARCHIVED`
- `PENDING_REVIEW`, `DISAPPROVED`, `PREAPPROVED`
- `CAMPAIGN_PAUSED`, `ADSET_PAUSED` (status herdado)
- `IN_PROCESS`, `WITH_ISSUES`

### Audiências

| Operação | Método | Endpoint |
|----------|--------|----------|
| Listar | GET | `/{ad_account_id}/customaudiences` |
| Criar | POST | `/{ad_account_id}/customaudiences` |
| Estimativa | GET | `/{ad_account_id}/reachestimate` |

## Tools de Análise Avançada (MCP)

| Tool | Descrição |
|------|-----------|
| `get_performance_summary` | Resumo agregado com métricas por atribuição (all vs incremental) |
| `list_campaign_ads_with_insights` | Lista ads de campanha JÁ COM métricas (resolve N+1) |
| `get_attribution_comparison` | Compara modelos de atribuição com CPA formatado |

**get_performance_summary** - Retorna:
- Spend total do período
- Para cada action_type: all_conversions, incremental, cpa_all, cpa_incremental, % incremental
- ROAS (apenas se `purchase_conversion_value` existir)

**list_campaign_ads_with_insights** - Resolve o problema N+1:
- Antes: `list_campaign_ads` → loop de `get_ad_insights` por ad
- Agora: Uma chamada só retorna ads + métricas
- Suporta `action_attribution_windows` para análise de eficiência

## Objetivos de Campanha

| Objetivo | Descrição |
|----------|-----------|
| `OUTCOME_AWARENESS` | Reconhecimento de marca |
| `OUTCOME_ENGAGEMENT` | Engajamento (curtidas, comentários) |
| `OUTCOME_LEADS` | Geração de leads |
| `OUTCOME_SALES` | Conversões e vendas |
| `OUTCOME_TRAFFIC` | Tráfego para site/app |
| `OUTCOME_APP_PROMOTION` | Instalações de app |

## Status

| Status | Descrição |
|--------|-----------|
| `ACTIVE` | Ativo e veiculando |
| `PAUSED` | Pausado manualmente |
| `DELETED` | Excluído |
| `ARCHIVED` | Arquivado |
| `PENDING_REVIEW` | Em revisão |
| `DISAPPROVED` | Reprovado |

## Métricas Principais

| Métrica | Descrição |
|---------|-----------|
| `impressions` | Número de vezes que o anúncio foi exibido |
| `reach` | Número de pessoas únicas alcançadas |
| `clicks` | Total de cliques |
| `spend` | Valor gasto |
| `cpc` | Custo por clique |
| `cpm` | Custo por mil impressões |
| `ctr` | Taxa de cliques (%) |
| `frequency` | Média de vezes que cada pessoa viu |
| `actions` | Ações realizadas |
| `conversions` | Conversões rastreadas |

## Períodos Predefinidos (date_preset)

| Preset | Descrição |
|--------|-----------|
| `today` | Hoje |
| `yesterday` | Ontem |
| `last_7d` | Últimos 7 dias |
| `last_14d` | Últimos 14 dias |
| `last_30d` | Últimos 30 dias |
| `this_month` | Este mês |
| `last_month` | Mês passado |

## Targeting Básico

```json
{
  "targeting": {
    "geo_locations": {
      "countries": ["BR"],
      "regions": [{"key": "3658"}],
      "cities": [{"key": "2430536", "radius": 10, "distance_unit": "kilometer"}]
    },
    "age_min": 18,
    "age_max": 65,
    "genders": [1, 2],
    "interests": [{"id": "123456", "name": "Marketing"}],
    "behaviors": [{"id": "654321", "name": "Compradores online"}],
    "custom_audiences": [{"id": "audience_id"}],
    "excluded_custom_audiences": [{"id": "excluded_audience_id"}]
  }
}
```

## Billing Events

| Evento | Descrição |
|--------|-----------|
| `IMPRESSIONS` | Cobrança por impressão |
| `LINK_CLICKS` | Cobrança por clique |
| `APP_INSTALLS` | Cobrança por instalação |
| `PAGE_LIKES` | Cobrança por curtida na página |

## Optimization Goals

| Objetivo | Descrição |
|----------|-----------|
| `REACH` | Maximizar alcance |
| `IMPRESSIONS` | Maximizar impressões |
| `LINK_CLICKS` | Maximizar cliques |
| `LANDING_PAGE_VIEWS` | Maximizar visualizações de página |
| `CONVERSIONS` | Maximizar conversões |
| `VALUE` | Maximizar valor de conversão |

## Campos Depreciados/Alterados (v24.0)

| Campo | Objeto | Status | Alternativa |
|-------|--------|--------|-------------|
| `approximate_count` | CustomAudience | **Removido** | Use `approximate_count_lower_bound` e `approximate_count_upper_bound` |
| `is_adset_budget_sharing_enabled` | Campaign | **Obrigatório** | Sempre incluir ao criar campanhas sem CBO |
| `bid_strategy` | AdSet | **Obrigatório** | Sempre incluir (`LOWEST_COST_WITHOUT_CAP`, `COST_CAP`, `BID_CAP`) |
| `image_crops` (191x100) | Creative | **Depreciado** | Use apenas `100x100` ou omita para crop automático |
| `standard_enhancements` | Creative | **Removido v22.0+** | Omitir ao criar criativos |
| `instagram_actor_id` | Creative | **Depreciado v22.0+** | Use `instagram_user_id` dentro do `object_story_spec` |
| Instagram ID antigo (5610...) | Creative | **Depreciado v22.0+** | Descubra o novo ID via `GET /{page_id}?fields=instagram_business_account` |

## Códigos de Erro Frequentes

| Código | Descrição | Solução |
|--------|-----------|---------|
| `100` | Parâmetro inválido | Verificar parâmetros da requisição |
| `190` | Token inválido/expirado | Renovar token de acesso |
| `200` | Permissão negada | Verificar permissões do app |
| `1` | Erro desconhecido | Tentar novamente |
| `2` | Serviço temporariamente indisponível | Aguardar e tentar novamente |
| `4` | Limite de chamadas excedido | Implementar rate limiting |
| `17` | Limite de conta atingido | Reduzir frequência de chamadas |

### Subcódigos do Erro 100 (mais comuns)

| Subcódigo | Problema | Solução |
|-----------|----------|---------|
| `4834011` | `is_adset_budget_sharing_enabled` ausente | Adicione o campo ao criar campanhas sem CBO |
| `2490487` | Bid strategy/amount ausente | Adicione `bid_strategy` ao criar ad sets |
| `1885272` | Orçamento muito baixo | Use orçamento acima do mínimo da conta (varia por país/moeda) |
| `33` | Objeto não existe | Verifique se o ID está correto (use `me/adaccounts`) |
| `2238281` | `instagram_actor_id` não aceito em object_story_spec | Use `instagram_user_id` dentro do object_story_spec |

### Erros de Instagram em Criativos

| Código | Problema | Solução |
|--------|----------|---------|
| `12` | "Old Instagram ID is deprecated for versions v22.0+" | O ID na UI do Meta Ads é formato antigo. Descubra o novo via `GET /{page_id}?fields=instagram_business_account` |
| `100` | "instagram_actor_id must be a valid Instagram account id" | Use o ID novo do Instagram (formato 17841...) |
| `100` (sub `2238281`) | "instagram_actor_id não é compatível com object_story_spec" | Use `instagram_user_id` **dentro** do `object_story_spec`, não `instagram_actor_id` |

**Processo correto para criar criativo com Instagram:**
1. Obtenha a página: `GET /me/accounts`
2. Obtenha o ID do Instagram: `GET /{page_id}?fields=instagram_business_account`
3. Use `instagram_user_id` dentro do `object_story_spec` (não `instagram_actor_id`)

## Erros Comuns no Endpoint /copies

### Erro 100 - Invalid Parameter (Subcódigos)

| Subcódigo | Título | Causa | Solução |
|-----------|--------|-------|---------|
| `1885194` | Solicitação de cópia muito grande | Tentando copiar mais de 3 objetos (ads/ad sets) de uma vez | Use `deep_copy: false` ou async batch requests |
| `3858079` | DSA payor ausente | Campanha targeting UE sem informações de pagador | Configure `dsa_payor` na conta |
| `3858081` | DSA beneficiary ausente | Campanha targeting UE sem informações de beneficiário | Configure `dsa_beneficiary` na conta |

### Solução para Cópias Grandes

Para copiar campanhas com mais de 3 ads/ad sets, use async batch requests:

```bash
curl -F 'access_token=...' \
  -F 'asyncbatch=[{"method":"POST","relative_url":"<ad-set-id>/copies","body":"deep_copy=true"}]' \
  https://graph.facebook.com/v24.0
```

Documentação: https://developers.facebook.com/docs/graph-api/asynchronous-batch-requests

## Links Úteis

- [Documentação Oficial](https://developers.facebook.com/docs/marketing-api/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Referência de Erros](https://developers.facebook.com/docs/marketing-api/error-reference/)
- [Limites de Volume](https://developers.facebook.com/docs/marketing-api/overview/authorization#limits)
