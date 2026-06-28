# Meta Andromeda: Guia Oficial para o MCP

> **Documento oficial** do projeto fb-marketing-mcp. Cruza pesquisa de mercado com a documentacao tecnica da Meta Marketing API disponivel em `docs/`. Para thresholds de performance e regras de otimizacao, consulte o [PLAYBOOK.md](PLAYBOOK.md).

**Ultima atualizacao:** Fevereiro de 2026

---

## Indice

1. [O que e Meta Andromeda](#o-que-e-meta-andromeda)
2. [Impacto na Estrategia de Ads](#impacto-na-estrategia-de-ads)
3. [Pilar 1: Diversidade Criativa](#pilar-1-diversidade-criativa)
4. [Pilar 2: Targeting Amplo](#pilar-2-targeting-amplo-advantage-audience)
5. [Pilar 3: Dados e Sinais (CAPI)](#pilar-3-dados-e-sinais-capi)
6. [Pilar 4: Estrutura de Campanhas](#pilar-4-estrutura-de-campanhas-consolidada)
7. [Pilar 5: Metricas e Atribuicao](#pilar-5-metricas-e-atribuicao)
8. [Problemas Conhecidos e Solucoes](#problemas-conhecidos-e-solucoes)
9. [Checklist Pre-Flight Andromeda](#checklist-pre-flight-andromeda)
10. [Roadmap de Implementacao](#roadmap-de-implementacao)
11. [Referencias](#referencias)

---

## O que e Meta Andromeda

Meta Andromeda e o sistema de machine learning de proxima geracao para recuperacao personalizada de anuncios (ads retrieval engine), introduzido pela Meta em dezembro de 2024.

**Definicao oficial da Meta:**
> "Meta Andromeda is an innovative end-to-end hardware, software, machine learning co-designed system introduced in 2024, with Meta Training and Inference Accelerator (MTIA) and NVIDIA Grace Hopper Superchip."

### Mudanca de Paradigma

| Aspecto | Antes (Sistema Legado) | Depois (Andromeda) |
|---------|------------------------|---------------------|
| Pergunta central | "Quem deveria ver este anuncio?" | "Qual anuncio esta pessoa deveria ver?" |
| Targeting | Segmentacoes manuais (interesses, LALs) | Conteudo criativo como mecanismo de targeting |
| Capacidade | Centenas de anuncios candidatos | Dezenas de milhoes em milissegundos |
| Dados | Dependente de rastreamento detalhado | Inferencia de intencao sem tracking invasivo |
| Hardware | CPU/GPU clusters padrao | NVIDIA Grace Hopper + MTIA |

### Pipeline de 3 Fases

1. **Retrieval** - Andromeda escaneia dezenas de milhoes de anuncios elegiveis e reduz para milhares de candidatos usando Deep Neural Networks com aumento de 10.000x na capacidade do modelo
2. **Ranking** - Modelos mais sofisticados classificam candidatos por probabilidade de conversao
3. **Entrega** - Anuncio vencedor aparece no feed; cada interacao retroalimenta o sistema

### Resultados Oficiais (Meta Engineering Blog)

- +6% recall improvement no sistema de retrieval
- +8% ads quality em segmentos selecionados
- +22% ROAS increase para advertisers com Advantage+ creative habilitado
- +7% conversions para businesses usando image generation tools
- 10x boost em model inference efficiency

---

## Impacto na Estrategia de Ads

O Andromeda inverte a logica de otimizacao de campanhas. As cinco mudancas fundamentais:

| # | Mudanca | Antes | Agora |
|---|---------|-------|-------|
| 1 | **Fonte de targeting** | Inputs manuais (interesses, LALs) | Conteudo criativo e metadata |
| 2 | **Estrategia criativa** | Testes iterativos (cores, headlines) | Diversidade conceitual (angulos, personas) |
| 3 | **Estrutura** | Segmentada (muitos ad sets) | Consolidada (poucos ad sets, broad targeting) |
| 4 | **Dados** | Pixel browser-side | CAPI server-side + sinais limpos |
| 5 | **Volume** | 2-3 anuncios por ad set | 10-50 anuncios por ad set |

**Implicacao para o MCP:** Todas as tools de criacao (`create_campaign`, `create_adset`, `create_creative`, `create_ad`) devem ser usadas seguindo estes principios. Os pilares a seguir detalham como.

---

## Pilar 1: Diversidade Criativa

### Estrategia

Diversidade criativa e a nova segmentacao. O Andromeda usa o conteudo criativo como mecanismo primario de targeting, nao os inputs de audiencia do anunciante.

**O que NAO e diversidade:**
- 10 versoes do mesmo anuncio mudando cor de botao
- Pequenos ajustes de headline ou disposicao de elementos
- Duplicar anuncios com alteracoes cosmeticas

**O que E diversidade genuina:**
- Conceitos e angulos diferentes (problema/solucao vs. depoimento vs. demonstracao)
- Formatos variados (video curto, video longo, carrossel, estatica)
- Apelos emocionais vs. racionais
- Tons de voz distintos (casual vs. profissional vs. educativo)

### Framework P.D.A. (Persona, Desire, Awareness)

Metodo estruturado para gerar diversidade conceitual:

#### P - Persona (Quem)
Criativo endereça identidade, lifestyle ou demographic especificos.

**Exemplo fitness brand:**
- Criativo 1: "The Busy Executive" (eficiencia, economia de tempo)
- Criativo 2: "The Post-Partum Mom" (recuperacao, body positivity)

#### D - Desire (O Que)
Mesmo produto, razoes diferentes de compra: Health, Wealth, Status, Relationships, Security.

#### A - Awareness (Onde na Jornada)
Niveis de Eugene Schwartz:
1. **Unaware:** Foco em sintomas ("Por que voce se sente cansado as 14h?")
2. **Solution Aware:** Mecanismo de acao ("Por que nosso suplemento absorve 3x mais rapido")
3. **Most Aware:** Ofertas, escassez, urgencia, prova social

### Volume de Criativos Recomendado

| Nivel | Quantidade | Contexto |
|-------|------------|----------|
| Minimo viavel | 8-10 criativos | Menos que isso = algoritmo passa fome |
| Ideal | 15-25 criativos | Volume suficiente sem sobrecarregar producao |
| Avancado | 30-50 criativos | Maxima personalizacao, grandes budgets |

**Frequencia de refresh:** Adicionar novos criativos a cada 7-14 dias. NAO lancar novas campanhas; alimentar campanhas existentes.

### Execucao Tecnica via MCP

#### Advantage+ Creative (Otimizacao Automatica)

O sistema Advantage+ Creative permite que a Meta gere variacoes automaticamente a partir dos assets fornecidos.

**Referencia:** [docs/creative/advantage-creative/get-started.md](docs/creative/advantage-creative/get-started.md)

Ao criar criativos com `create_creative`, use o parametro nativo `creative_features_spec` para habilitar otimizacoes de IA:

```
create_creative(
  name: "Criativo Andromeda",
  object_story_spec: { ... },
  creative_features_spec: {
    "image_touchups": { "enroll_status": "OPT_IN" },
    "image_background_gen": { "enroll_status": "OPT_IN" },
    "text_optimizations": { "enroll_status": "OPT_IN" },
    "enhance_cta": { "enroll_status": "OPT_IN" },
    "image_uncrop": { "enroll_status": "OPT_IN" },
    "video_auto_crop": { "enroll_status": "OPT_IN" }
  }
)
```

> **NOTA:** `creative_features_spec` e um parametro nativo do `create_creative`. Nao e necessario usar `execute_api`.

**Features disponiveis:**

| Feature | Funcao |
|---------|--------|
| `image_touchups` | Auto crop/expand para placements |
| `image_background_gen` | Backgrounds gerados por IA |
| `image_templates` | Overlays de texto gerados por IA |
| `text_optimizations` | Texto dinamico otimizado |
| `enhance_cta` | CTA aprimorado |
| `image_uncrop` | Expansao de imagem por IA |
| `video_auto_crop` | Video auto crop/expand |
| `media_type_automation` | Midia dinamica (video/imagens) |
| `description_automation` | Descricoes dinamicas |

#### Asset Feed Spec (Multiplas Variacoes)

Para fornecer multiplos assets que o sistema combina automaticamente:

**Referencia:** [docs/ad-creative/asset-feed-spec.md](docs/ad-creative/asset-feed-spec.md)

```json
{
  "asset_feed_spec": {
    "images": [{"hash": "hash1"}, {"hash": "hash2"}],
    "bodies": [
      {"text": "Texto versao problema/solucao"},
      {"text": "Texto versao depoimento"},
      {"text": "Texto versao demonstracao"}
    ],
    "titles": [
      {"text": "Headline direto"},
      {"text": "Headline curiosidade"},
      {"text": "Headline prova social"}
    ],
    "ad_formats": ["AUTOMATIC_FORMAT"]
  }
}
```

**Regras importantes:**
- Use `["AUTOMATIC_FORMAT"]` em `ad_formats` para combinar imagens/videos automaticamente
- Nao e possivel converter anuncio com asset feed para anuncio estatico apos criacao
- Pode adicionar, remover ou substituir assets, mas nao mudar formato (ex: SINGLE_IMAGE para VIDEO)

#### Tools do MCP

| Tool | Uso no contexto Andromeda |
|------|--------------------------|
| `create_creative` | Criar criativos com `creative_features_spec` para Advantage+ Creative |
| `list_creatives` | Auditar volume e diversidade de criativos ativos |
| `list_campaign_ads` | Verificar quantidade de ads por campanha |
| `list_campaign_ads_with_insights` | Identificar criativos com baixa performance para rotacao |

### Visual Hook Testing

Para validar conceito sem triggerar similarity detection:
- **Manter:** Text hook ou script constante
- **Variar:** Delivery visual radicalmente (pessoa falando, text-on-screen, green screen, product demo)

---

## Pilar 2: Targeting Amplo (Advantage+ Audience)

### Estrategia

O Andromeda performa melhor com targeting amplo. Segmentacoes hiper-especificas (interest stacks, LALs rigidos) limitam a capacidade do algoritmo de explorar e encontrar conversoes de alto valor.

**Recomendacao:** Adotar broad targeting, usar Advantage+ Audience, permitir que o algoritmo faca otimizacoes proprias.

**O que muda:**
- **Lookalike audiences (LALs):** Agora servem como "signal inputs" ao inves de hard boundaries
- **Interest stacks:** Contraproducentes - limitam exploracao do algoritmo
- **Segmentacoes hiper-especificas:** Prejudicam performance ao encolher pool de dados

**Exclusoes estrategicas permanecem essenciais:**
- Clientes existentes (upload de emails/telefones via custom audience)
- Visitantes do site ultimos 7-30 dias
- Add-to-cart que nao compraram (campanha especifica)
- Engajadores de conteudo organico recente

### Execucao Tecnica via MCP

#### Advantage+ Audience na API

**Referencia:** [docs/audiences/reference/targeting-expansion/advantage-audience.md](docs/audiences/reference/targeting-expansion/advantage-audience.md)

O parametro `advantage_audience` controla se a Meta otimiza o publico automaticamente:

| Valor | Comportamento | Restricao de Idade |
|-------|---------------|-------------------|
| `1` (padrao v23.0+) | Meta otimiza publico automaticamente | `age_min` 18-25, `age_max` fixo em 65 |
| `0` | Targeting manual rigido | Qualquer faixa etaria permitida |

**Ao criar ad set com `create_adset`:**

```json
{
  "campaign_id": "123456789",
  "targeting": {
    "geo_locations": {
      "countries": ["BR"]
    },
    "age_min": 18,
    "age_max": 65,
    "targeting_automation": {
      "advantage_audience": 1
    }
  },
  "advantage_audience": 1
}
```

**CRITICO:** Com `advantage_audience=1`, a API rejeita (erro 1870189):
- `age_max < 65`
- `age_min > 25`

#### Exclusoes via Custom Audiences

Para proteger aquisicao de novos clientes, crie listas de exclusao:

> **IMPORTANTE (v24.0):** Custom audience exclusions devem usar `excluded_custom_audiences` no nivel RAIZ do ad set.
> O campo `targeting.exclusions.custom_audiences` foi **depreciado** e retorna erro 1870221.

```
1. create_custom_audience (lista de clientes existentes)
2. create_adset com excluded_custom_audiences (campo top-level, NAO dentro de targeting):
   {
     "excluded_custom_audiences": [{"id": "audience_id"}]
   }
```

**Exemplo completo:**
```
create_adset(
  name: "Ad Set Andromeda",
  campaign_id: "{id}",
  excluded_custom_audiences: [{"id": "120210539323310649"}],
  targeting: {
    "geo_locations": {"countries": ["BR"]},
    "age_min": 18,
    "age_max": 65
  },
  ...
)
```

#### Advantage+ Campaigns (Estrutura Unificada)

**Referencia:** [docs/advantage-campaigns/index.md](docs/advantage-campaigns/index.md)

Para habilitar Advantage+ completo, tres estados devem estar habilitados:

| Estado | Requisito |
|--------|-----------|
| `advantage_placement_state` | Sem exclusoes de placement; todos placements qualificados |
| `advantage_budget_state` | Budget no nivel da campanha com bid strategy compativel |
| `advantage_audience_state` | Advantage+ Audience habilitado OU apenas `geo_locations` no targeting |

Quando todos estao `ENABLED`, a campanha recebe `advantage_state_info` correspondente (ex: `ADVANTAGE_PLUS_SALES`).

#### Tools do MCP

| Tool | Uso no contexto Andromeda |
|------|--------------------------|
| `create_adset` | Criar ad set com `advantage_audience: 1` e broad targeting |
| `create_custom_audience` | Criar listas de exclusao (clientes, visitantes) |
| `get_reach_estimate` | Validar tamanho do publico (evitar muito restrito) |
| `search_geolocation` | Obter keys corretos de localizacao para targeting |

---

## Pilar 3: Dados e Sinais (CAPI)

### Estrategia

A Conversions API (CAPI) e nao-negociavel no contexto Andromeda. Browser-based pixel tracking nao e mais suficiente devido a iOS 14+, ITP e ad blockers.

**Por que CAPI e prioritario:**
- Andromeda prioriza advertisers usando CAPI nos quality scores
- Event Match Quality (EMQ) alto permite ao retrieval engine fazer match de conversoes com maior precisao
- Contas que usam apenas Pixel sao penalizadas com lower ad quality scores

**Implementacao ideal:**
- **Redundancia:** Enviar eventos via browser (Pixel) E servidor (CAPI)
- **Deduplication:** Usar `event_id` identico em ambos
- **EMQ target:** Acima de 6.0 para o optimization event (Purchase/Lead)

### Execucao Tecnica via MCP

#### Melhores Praticas CAPI

**Referencia:** [docs/conversions-api/best-practices.md](docs/conversions-api/best-practices.md)

**Parametros obrigatorios para todos os eventos:**
- `action_source` (obrigatorio)
- `event_source_url` (obrigatorio para eventos de website)
- `client_user_agent` (obrigatorio para eventos de website)

**Parametros recomendados para alta qualidade:**
- `event_id` (para deduplicacao)
- `external_id` (ID do usuario no seu sistema)

**Parametros de customer info de alta qualidade:**

| Parametro | Descricao | Impacto no EMQ |
|-----------|-----------|----------------|
| `em` | Email (hashed) | Alto |
| `client_ip_address` | IP do cliente | Alto |
| `fn`, `ln` | Nome e sobrenome (hashed) | Medio |
| `ph` | Telefone (hashed) | Medio |
| `ct`, `st`, `zp` | Cidade, estado, CEP | Complementar |

**Deduplicacao Pixel + CAPI:**

**Referencia:** [docs/conversions-api/deduplicate-pixel-and-server-events.md](docs/conversions-api/deduplicate-pixel-and-server-events.md)

Requisitos para deduplicacao correta:
1. Mesmo `event_name` para Pixel e CAPI
2. Incluir `event_id` OU combinacao de `external_id`/`fbp`
3. Incluir todos os parametros em ambos os eventos

#### Monitoramento de Qualidade via API

**Referencia:** [docs/conversions-api/integration-quality-api.md](docs/conversions-api/integration-quality-api.md)

Use a Dataset Quality API para monitorar qualidade programaticamente:

```
GET /{version}/dataset_quality?dataset_id={pixel_id}
```

**Metricas disponiveis:**

| Metrica | Descricao | Meta |
|---------|-----------|------|
| `event_match_quality` | Score 0-10 de qualidade de matching | >= 6.0 |
| `acr` | Additional Conversions Reported | Positivo |
| `event_coverage` | % de eventos Pixel cobertos pela CAPI | >= 75% |
| `dedup_key_feedback` | Feedback sobre chaves de deduplicacao | 100% com keys |
| `data_freshness` | Frescor dos dados | `real_time` |

**Diagnostico EMQ:**
- `composite_score`: Score geral
- `match_key_feedback`: Feedback por parametro de matching

#### Attribution: First Conversion

**O problema:** Default "All Conversions" pode criar optimization bias, fazendo o algoritmo otimizar para repeat purchasers ao inves de new customers.

**A solucao:** Usar "First Conversion" para forcar a IA a valorizar aquisicao.

**Regra pratica:**
- **Reporting:** Continue vendo "All Conversions" para revenue total
- **Optimization signal:** Use "First Conversion" para aquisicao de novos clientes

#### Tools do MCP

| Tool | Uso no contexto Andromeda |
|------|--------------------------|
| `list_pixels` | Verificar pixels disponiveis na conta |
| `get_attribution_comparison` | Comparar All vs First vs Incremental |
| `get_performance_summary` | Resumo com metricas por modelo de atribuicao |
| Prompt `conversions_api_setup` | Guia completo de configuracao CAPI |
| `execute_api` | Consultar Dataset Quality API para EMQ |

---

## Pilar 4: Estrutura de Campanhas Consolidada

### Estrategia

#### Modelo "One Campaign" (Consolidacao)

**Estrutura recomendada:**
- 1 campanha por objetivo (geralmente Sales ou Leads)
- Broad targeting (remover interest targeting, behavioral segments, LALs)
- Advantage+ Placements habilitado
- 1-2 ad sets por campanha
- 10-50 anuncios por ad set
- CBO (Campaign Budget Optimization) ativado

**Por que consolidar:**
- Andromeda precisa de densidade de dados para aprender
- Orcamentos fragmentados diluem sinais que IA precisa
- Estrutura consolidada melhora predictive accuracy

#### Modelo Hibrido (ABO + CBO)

Para mitigar Hot Ad Bias e permitir testes estruturados:

**Testing Campaign (ABO):**
- Estrutura granular: ad sets especificos com 1-2 variacoes por conceito
- Forced spend: Budget por ad set forca algoritmo a gastar em conceitos que ignoraria em CBO
- Estrategia "Half-CPA": CPA Cap = 50% do target CPA; Daily budget = 2x target CPA

**Scaling Campaign (CBO):**
- Poucos ad sets (1-2)
- Muitos criativos vencedores (15-30+)
- Lowest Cost bid strategy
- Broad targeting

### Execucao Tecnica via MCP

#### Campaign Budget Optimization (CBO)

**Referencia:** [docs/bidding-and-optimization/campaign-budget-optimization.md](docs/bidding-and-optimization/campaign-budget-optimization.md)

Ao criar campanha CBO com `create_campaign`:

```
create_campaign(
  name: "[SCALE] - Sales - Broad - 2026-02",
  objective: "OUTCOME_SALES",
  status: "PAUSED",
  daily_budget: 20000,
  bid_strategy: "LOWEST_COST_WITHOUT_CAP"
)
```

> **AVISO:** Sempre defina `bid_strategy` explicitamente ao usar CBO com `daily_budget`.
> Sem definir, o Meta pode inferir `LOWEST_COST_WITH_BID_CAP`, causando erro 1815857
> ("bid_amount is required for bid cap strategy") na criacao de ad sets.

**Controles no nivel do ad set (opcionais):**

| Campo | Funcao |
|-------|--------|
| `daily_min_spend_target` | Gasto minimo diario (garante exploracao) |
| `daily_spend_cap` | Limite diario de gasto (protege budget) |
| `lifetime_min_spend_target` | Gasto minimo no lifetime |
| `lifetime_spend_cap` | Limite de gasto no lifetime |

**Limitacoes:**
- `bid_strategy` definida no nivel da campanha (compartilhada por todos ad sets)
- Todos os optimization goals devem ser iguais para ad sets com auto-bid
- Campanhas com 70+ ad sets: nao e possivel editar bid strategy

#### Bid Strategies

**Referencia:** [docs/bidding/overview/bid-strategy.md](docs/bidding/overview/bid-strategy.md)

| Estrategia | Quando Usar | Parametros |
|------------|-------------|------------|
| `LOWEST_COST_WITHOUT_CAP` | Scaling campaigns (CBO) | Nenhum adicional |
| `COST_CAP` | Testing campaigns (ABO) | `bid_amount` obrigatorio |
| `LOWEST_COST_WITH_MIN_ROAS` | Otimizacao por valor | `roas_average_floor` em `bid_constraints` |
| `LOWEST_COST_WITH_BID_CAP` | Controle maximo de lance | `bid_amount` obrigatorio |

**Detalhes do ROAS Minimum:**
- Requer `optimization_goal=VALUE`
- `roas_average_floor` e inteiro x 10.000 (ex: 15000 = 1.5 ROAS)
- Range valido: [100, 10000000] = [0.01, 1000.0] ROAS
- NAO pode usar `bid_amount` junto com ROAS minimum

**Testing Campaign (ABO) com Half-CPA:**

```json
{
  "name": "[TEST] - Conceito PDA Exec - ABO - 2026-02",
  "objective": "OUTCOME_SALES",
  "status": "PAUSED",
  "special_ad_categories": [],
  "is_adset_budget_sharing_enabled": false
}
```

Ad set com Cost Cap (metade do CPA target):

```json
{
  "campaign_id": "...",
  "daily_budget": 20000,
  "bid_strategy": "COST_CAP",
  "bid_amount": 5000,
  "billing_event": "IMPRESSIONS",
  "optimization_goal": "OFFSITE_CONVERSIONS"
}
```

#### Advantage+ Shopping Campaigns (E-commerce)

**Referencia:** [docs/advantage-shopping-campaigns/index.md](docs/advantage-shopping-campaigns/index.md)

Para e-commerce, considere migrar para a estrutura Advantage+ unificada:

```json
{
  "objective": "OUTCOME_SALES",
  "smart_promotion_type": "GUIDED_CREATION",
  "special_ad_categories": []
}
```

**Nota:** `AUTOMATED_SHOPPING_ADS` esta depreciado na v25.0. Use `GUIDED_CREATION` ou migre campanhas existentes com `migrate_to_advantage_plus=true`.

#### Exemplo de Estrutura Completa

**Campanha 1: Aquisicao (CBO - Scaling)**
- 1 ad set, targeting amplo, `advantage_audience: 1`
- 15-30 criativos diversos (diferentes angulos P.D.A. + formatos)
- Exclusoes: clientes atuais, visitantes recentes
- `bid_strategy: LOWEST_COST_WITHOUT_CAP`

**Campanha 2: Remarketing**
- 1 ad set para visitantes que nao converteram
- 10-20 criativos focados em superar objecoes
- Ofertas especiais + urgencia

**Campanha 3: Testes (ABO)**
- Ad sets isolados para cada conceito novo
- Half-CPA strategy (`COST_CAP` a 50% do CPA target)
- Vencedores migram para Campanha 1

#### Tools do MCP

| Tool | Uso no contexto Andromeda |
|------|--------------------------|
| `create_campaign` | Criar campanhas CBO (scaling) ou ABO (testing) |
| `create_adset` | Configurar ad sets com bid strategy e targeting |
| `update_campaign` | Ajustar budget e bid strategy |
| `pause_campaign` / `activate_campaign` | Controlar ciclo de vida |
| `execute_api` | Migrar para Advantage+ (`migrate_to_advantage_plus=true`) |

---

## Pilar 5: Metricas e Atribuicao

### Estrategia

Metricas tradicionais como CTR e CPC perderam poder preditivo. O Andromeda prioriza post-click value e emotional relevance. Nova hierarquia de KPIs:

### Signal Metrics (Avaliar Criativo Antes de Venda)

| Metrica | Definicao | Benchmark |
|---------|-----------|-----------|
| **Hook Rate** | 3-second plays / impressions | 25-30% |
| **Hold Rate** | ThruPlays / 3-second plays | 40-50% |
| **Engagement Rate** | (Likes+Comments+Shares) / Impressions | Varia |
| **MER** | Total Revenue / Total Ad Spend | Norte star metric |

### Metricas de Fadiga Criativa

| Metrica | Sinal de Alerta |
|---------|-----------------|
| Creative Fatigue score | CPMs subindo consistentemente |
| Creative Similarity | Alto = falta diversidade, CPMs penalizados |

### Analise de Performance Criativa

**"Obvious Duds" (Pausar imediatamente):**
- Alto impressions + baixo CTR = desperdicando budget em low-intent users

**"Slow Burners" (Dar tempo):**
- Baixo spend MAS alto Hold Rate e bom Add-to-Cart ratio
- Sistema pode estar "holding" para micro-segments de alto valor
- Matar cedo = destruir portfolio effect que IA esta construindo

**Regra de ouro:** Se campaign ROAS esta saudavel, NAO interferir com alocacao da IA, mesmo se parecer desbalanceado no nivel do anuncio.

### Metricas Backend Criticas

Nao confie apenas no Ads Manager. Monitore:
- **NC ROAS** (New Customer ROAS) separadamente
- **CAC** (Customer Acquisition Cost) novos vs. recorrentes
- **% de novos clientes** no total de conversoes
- **LTV medio** das coortes adquiridas
- **Taxa de retencao** por cohort

### Execucao Tecnica via MCP

#### Atribuicao Incremental (Recurso Critico)

O campo `is_incremental_attribution_enabled` no ad set faz o algoritmo otimizar para conversoes **causadas pelo anuncio**, nao apenas correlacionadas. Este e o recurso mais impactante do Andromeda para contas com alto volume organico.

```
create_adset(
  name: "Ad Set Incremental",
  campaign_id: "{id}",
  is_incremental_attribution_enabled: true,
  optimization_goal: "OFFSITE_CONVERSIONS",
  ...
)
```

**Quando usar:**
- Contas onde % incremental < 30% do total de conversoes
- Produtos com alto volume de compra organica
- Quando CPA "all conversions" parece bom mas crescimento real e baixo

**Impacto:** Em testes reais, contas com 82% de conversoes nao-incrementais viram mudanca significativa no sinal de otimizacao ao ativar este campo.

#### Comparacao de Atribuicao

Use `get_attribution_comparison` para comparar modelos:

```
get_attribution_comparison(
  object_id: "{campaign_id}",
  object_type: "campaign"
)
```

Retorna automaticamente All vs First vs Incremental com CPA por modelo.

#### Performance Summary

Use `get_performance_summary` para visao agregada:

```
get_performance_summary(
  date_preset: "last_30d",
  action_types: ["purchase", "lead"]
)
```

Retorna spend, conversoes all/incremental, CPA e ROAS.

#### Insights com Janelas de Atribuicao

```
get_campaign_insights(
  campaign_id: "{id}",
  date_preset: "last_7d",
  fields: ["spend", "actions", "cost_per_action_type"],
  action_attribution_windows: ["1d_click", "7d_click", "incrementality"]
)
```

#### Ads com Metricas (Resolve N+1)

```
list_campaign_ads_with_insights(
  campaign_id: "{id}",
  action_attribution_windows: ["incrementality"]
)
```

Retorna ads + insights em uma chamada so.

#### Tools do MCP

| Tool | Uso no contexto Andromeda |
|------|--------------------------|
| `create_adset` | Criar ad set com `is_incremental_attribution_enabled: true` |
| `get_attribution_comparison` | Comparar All vs First vs Incremental |
| `get_performance_summary` | Resumo agregado com atribuicao |
| `get_campaign_insights` | Metricas de campanha com janelas de atribuicao |
| `get_ad_insights` | Metricas por anuncio individual |
| `list_campaign_ads_with_insights` | Todos ads com metricas em uma chamada |

---

## Problemas Conhecidos e Solucoes

### 1. Hot Ad Bias

**Sintoma:** 1 anuncio recebe 90%+ do spend em 24-48h. Outros criativos "morrem de fome".

**Causa:** Velocidade dos processadores MTIA identifica "winner" rapidamente e concentra budget.

**Solucoes via MCP:**

| Acao | Como executar |
|------|---------------|
| Usar ABO para testing | `create_campaign` sem CBO, ad sets isolados |
| Aplicar Cost Caps no winner | `update_adset` com `bid_strategy: COST_CAP` |
| Isolar "starved creatives" | `create_adset` novo com budget garantido, mover criativos |
| Monitorar distribuicao | `list_campaign_ads_with_insights` para ver spend por ad |

### 2. Similarity Detection Clustering

**Sintoma:** Multiplos criativos visualmente similares param de gastar simultaneamente.

**Causa:** Sistema os agrupa como "cluster" e suprime todos de uma vez.

**Solucoes:**
- **Diversidade visual radical:** Primeiros 3 segundos devem ser visualmente distintos
- **"Squint test":** Se voce estraba e os criativos parecem iguais (mesma paleta, layout), IA vai trata-los como mesmo sinal
- **Formatos variados:** Mix de UGC, static, high-production, text-only
- **Auditar:** `list_creatives` + `list_campaign_ads_with_insights` para identificar clusters

### 3. Otimizacao para Metricas Erradas

**Sintoma:** ROAS no Ads Manager alto, mas backend mostra estagnacao de receita.

**Solucoes via MCP:**

| Acao | Como executar |
|------|---------------|
| Verificar atribuicao | `get_attribution_comparison` → comparar All vs Incremental |
| First Conversion | Configurar attribution setting no ad set |
| Exclusoes dinamicas | `create_custom_audience` com lista de clientes |
| Dashboard cruzado | `get_performance_summary` + dados backend |

### 4. Performance Cliff (Queda Abrupta)

**Sintoma:** Campanha que performava bem de repente colapsa por creative fatigue severa.

**Solucoes:**
- **Rotacao proativa:** Refresh winners a cada 21-28 dias ANTES de performance declinar
- **Monitorar CPMs:** `get_campaign_insights` com `fields: ["cpm"]` - CPMs subindo = sinal de fadiga
- **Pipeline criativo:** Manter backlog de criativos prontos para rotacao

---

## Checklist Pre-Flight Andromeda

### Secao 1: Creative Assets (Layer de Targeting)

- [ ] **Concept Diversity (P.D.A. Check):** Ad set contem pelo menos 3 angulos distintos baseados em Persona, Desire ou Awareness?
- [ ] **Visual Hook Variance:** Formatos visuais sao significativamente diferentes nos primeiros 3 segundos?
- [ ] **Format Mix:** Mix de formatos (~50% Video, ~30% Static, ~20% Carousel)?
- [ ] **Squint Test:** Ao estrabar, os criativos parecem diferentes?
- [ ] **Volume:** Minimo 8-10 criativos por ad set?
- [ ] **Advantage+ Creative:** `creative_features_spec` configurado com features de IA?

### Secao 2: Primary Text e Headlines (Layer de Contexto)

- [ ] **5-Option Utilization:** Utilizou todos 5 slots de Primary Text disponiveis?
- [ ] **Semantic Distance:** Os 5 texts sao significativamente diferentes?
- [ ] **Headline Intent:** Headlines variam por psychological trigger (Direct Offer vs. Social Proof vs. Curiosity)?

### Secao 3: Targeting e Audiencia

- [ ] **Broad Targeting:** `advantage_audience: 1` habilitado?
- [ ] **Exclusoes:** Custom audiences de exclusao configuradas (clientes, visitantes)?
- [ ] **Geolocation:** Keys de localizacao validados via `search_geolocation`?

### Secao 4: Dados e Tracking

- [ ] **CAPI Health Check:** EMQ acima de 6.0 para optimization event?
- [ ] **Deduplicacao:** `event_id` configurado para deduplicacao Pixel + CAPI?
- [ ] **Event Coverage:** >= 75% dos eventos Pixel cobertos pela CAPI?
- [ ] **Attribution Setting:** Usando "First Conversion" se foco e new customer acquisition?

### Secao 5: Estrutura e Budget

- [ ] **Structure Check:** Campanha consolidada (evitar split de audiences em multiplos ad sets)?
- [ ] **CBO:** Budget no nivel da campanha para scaling?
- [ ] **ABO Testing:** Budget por ad set para conceitos novos?
- [ ] **Budget/Bid Testing:** Daily budget >= 2x target CPA? Cost Cap ~50% do CPA?

---

## Roadmap de Implementacao

### Fase 1: Auditoria e Infraestrutura (Semana 1)

**Acoes via MCP:**

```
1. Verificar CAPI
   - list_pixels → obter pixel_id
   - execute_api → GET /{version}/dataset_quality?dataset_id={pixel_id}
   - Verificar EMQ score (target: >= 6.0)
   - Verificar event_coverage (target: >= 75%)

2. Auditar estrutura atual
   - list_campaigns(effective_status: ["ACTIVE"])
   - get_account_insights(date_preset: "last_30d")
   - Mapear: quantas campaigns ativas? budget fragmentado?

3. Verificar atribuicao
   - get_attribution_comparison para cada campanha
   - Calcular % incremental
   - Se < 30%: configurar First Conversion
```

**Checklist:**
- [ ] Auditar implementacao CAPI (EMQ score)
- [ ] Verificar deduplication logic
- [ ] Avaliar se First Conversion e apropriado
- [ ] Mapear estrutura atual
- [ ] Planejar consolidacao para One Campaign model

### Fase 2: Pivot Criativo (Semanas 2-4)

**Acoes via MCP:**

```
1. Produzir criativos P.D.A.
   - Criar 10-15 criativos genuinamente diferentes
   - create_creative com creative_features_spec (Advantage+ Creative)
   - Garantir variacao de formatos

2. Deploy em testing campaign (ABO)
   - create_campaign (ABO, PAUSED)
   - create_adset por conceito (Half-CPA strategy)
   - create_ad vinculando criativos
   - activate_campaign

3. Monitorar sem interferir por 7-10 dias
   - list_campaign_ads_with_insights diariamente
   - NAO pausar prematuramente (learning phase)
```

**Checklist:**
- [ ] Definir 3 Personas, 3 Desires, 3 Awareness stages (Matriz P.D.A.)
- [ ] Produzir 10-15 criativos baseados na matriz
- [ ] Deploy em ABO testing campaign
- [ ] Monitorar por 7-10 dias sem interferir

### Fase 3: Otimizacao e Governanca (Continuo)

**Acoes via MCP:**

```
1. Identificar vencedores
   - list_campaign_ads_with_insights com attribution incremental
   - Migrar vencedores para scaling campaign (CBO)

2. Monitorar Hot Ad Bias
   - list_campaign_ads_with_insights diariamente
   - Se 1 ad > 90% spend em 24h: isolar starved ou aplicar cost caps

3. Rotacao proativa
   - Adicionar 5-10 novos criativos semanalmente
   - Refresh winners a cada 21-28 dias
   - Pausar consistent low performers (apos 7+ dias)

4. Dashboard de saude
   - get_performance_summary semanal
   - get_attribution_comparison mensal
   - Alertas: NC ROAS, % new customers, MER
```

**Checklist:**
- [ ] Migrar vencedores para CBO scaling
- [ ] Monitorar Hot Ad Bias diariamente nos primeiros 30 dias
- [ ] Rotacao proativa de criativos (semanal)
- [ ] Dashboard semanal de performance

---

## Referencias

### Documentacao Interna (docs/)

| Topico | Arquivo | Relevancia |
|--------|---------|------------|
| Advantage+ Audience | [docs/audiences/reference/targeting-expansion/advantage-audience.md](docs/audiences/reference/targeting-expansion/advantage-audience.md) | Pilar 2 |
| Advantage Targeting | [docs/audiences/reference/advantage-targeting.md](docs/audiences/reference/advantage-targeting.md) | Pilar 2 |
| Advantage+ Creative | [docs/creative/advantage-creative/get-started.md](docs/creative/advantage-creative/get-started.md) | Pilar 1 |
| Asset Feed Spec | [docs/ad-creative/asset-feed-spec.md](docs/ad-creative/asset-feed-spec.md) | Pilar 1 |
| Dynamic Creative | [docs/ad-creative/asset-feed-spec/dynamic-creative.md](docs/ad-creative/asset-feed-spec/dynamic-creative.md) | Pilar 1 |
| CAPI Best Practices | [docs/conversions-api/best-practices.md](docs/conversions-api/best-practices.md) | Pilar 3 |
| CAPI Deduplicacao | [docs/conversions-api/deduplicate-pixel-and-server-events.md](docs/conversions-api/deduplicate-pixel-and-server-events.md) | Pilar 3 |
| Integration Quality API | [docs/conversions-api/integration-quality-api.md](docs/conversions-api/integration-quality-api.md) | Pilar 3 |
| CBO | [docs/bidding-and-optimization/campaign-budget-optimization.md](docs/bidding-and-optimization/campaign-budget-optimization.md) | Pilar 4 |
| Bid Strategies | [docs/bidding/overview/bid-strategy.md](docs/bidding/overview/bid-strategy.md) | Pilar 4 |
| Advantage+ Campaigns | [docs/advantage-campaigns/index.md](docs/advantage-campaigns/index.md) | Pilar 4 |
| ASC (E-commerce) | [docs/advantage-shopping-campaigns/index.md](docs/advantage-shopping-campaigns/index.md) | Pilar 4 |

### Fontes Externas Oficiais

1. **Meta Engineering Blog - Andromeda Announcement (Dec 2024)**
   https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/

2. **Meta for Business - AI Innovation in Ads Ranking**
   https://www.facebook.com/business/news/ai-innovation-in-metas-ads-ranking-driving-advertiser-performance

### Fontes Externas Complementares

3. **Tyneside Marketing - Meta Andromeda Protocol (Dec 2025)**
   https://tynesidemarketing.co.uk/blog/ai-research/the-meta-andromeda-protocol-2025/

4. **AdMetrics - Meta Andromeda Retrieval Explained**
   https://www.admetrics.io/en/post/meta-andromeda-ads-retrieval-explained

5. **Jon Loomer - Meta Andromeda Ad Strategy**
   https://www.jonloomer.com/meta-andromeda/

6. **Jon Loomer - First Conversion Optimization**
   https://www.jonloomer.com/conversion-count-first-conversion-optimization/

### Documentos Relacionados neste Projeto

- [PLAYBOOK.md](PLAYBOOK.md) - Thresholds de performance, regras de otimizacao, fluxos de diagnostico
- [SKILL.md](SKILL.md) - Documentacao tecnica do MCP (tools, guardrails, fluxos)
- [CUSTOM_API_CALLS.md](CUSTOM_API_CALLS.md) - Chamadas recorrentes de API

---

**Documento criado em:** 06/02/2026
**Baseado em:** Relatorio de pesquisa (25+ fontes) + documentacao oficial Meta Marketing API (docs/)
