/**
 * Tools de Execução - API da Meta
 *
 * Estas tools requerem configuração de META_ACCESS_TOKEN.
 * Permitem criar, atualizar e gerenciar campanhas na plataforma Meta Ads.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { MetaClient, MetaClientError } from './meta-client.js';
import { getConfigurationError, getMetaConfig, isMetaConfigured } from './utils/config.js';
import { getAuthContext } from './utils/auth-context.js';
import { checkPermission } from './auth/permissions.js';
import {
  apiSchemas,
  validateArgs,
  formatValidationError,
  // Descoberta
  type DiscoverAdAccountsArgs,
  type ListFacebookPagesArgs,
  type GetInstagramAccountArgs,
  // Campanhas
  type CreateCampaignArgs,
  type UpdateCampaignArgs,
  type GetCampaignArgs,
  type ListCampaignsArgs,
  type PauseCampaignArgs,
  type ActivateCampaignArgs,
  // Ad Sets
  type ListAdsetsArgs,
  type GetAdsetArgs,
  type CreateAdsetArgs,
  type UpdateAdsetArgs,
  type PauseAdsetArgs,
  type ActivateAdsetArgs,
  // Ads
  type ListAdsArgs,
  type ListCampaignAdsArgs,
  type GetAdArgs,
  type CreateAdArgs,
  type UpdateAdArgs,
  type PauseAdArgs,
  type ActivateAdArgs,
  // Criativos
  type ListCreativesArgs,
  type GetCreativeArgs,
  type CreateCreativeArgs,
  // Insights
  type GetAccountInsightsArgs,
  type GetCampaignInsightsArgs,
  type GetAdsetInsightsArgs,
  type GetAdInsightsArgs,
  type GetAttributionComparisonArgs,
  type GetPerformanceSummaryArgs,
  type ListCampaignAdsWithInsightsArgs,
  // Audiências
  type ListCustomAudiencesArgs,
  type CreateCustomAudienceArgs,
  type GetReachEstimateArgs,
  // Pixels
  type ListPixelsArgs,
  // Upload de Imagem
  type UploadImageArgs,
  // Dataset Quality (EMQ)
  type GetDatasetQualityArgs,
  // Geolocalização
  type SearchGeolocationArgs,
  // API Customizada
  type ExecuteApiArgs,
  // Video
  type UploadVideoArgs,
  type GetVideoStatusArgs,
  // Value Rules
  type CreateValueRuleSetArgs,
  type ListValueRuleSetsArgs,
  type GetValueRuleSetArgs,
  type UpdateValueRuleSetArgs,
  type DeleteValueRuleSetArgs,
  // Ad Labels
  type CreateAdLabelArgs,
  type ListAdLabelsArgs,
  // Creative Preview
  type PreviewCreativeArgs,
  // Budget Schedule
  type CreateBudgetScheduleArgs,
  type GetBudgetSchedulesArgs,
  type UpdateBudgetScheduleArgs,
  type DeleteBudgetScheduleArgs,
} from './schemas/index.js';

/**
 * Define as tools de execução (API Meta) com JSON Schema manual
 */
export const apiTools = [
  // ==================== DESCOBERTA DE RECURSOS ====================
  {
    name: 'discover_ad_accounts',
    description:
      'Discover ad accounts — list all ad accounts for the authenticated user. Descobre as contas de anúncios do usuário. DEVE ser a primeira chamada de qualquer sessão para obter o ID real da conta (act_XXXXX). Evita erros de ID inventado.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, account_status, currency, timezone_name)',
        },
      },
    },
  },
  {
    name: 'list_facebook_pages',
    description:
      'List Facebook pages — get all pages owned by the user. Lista as páginas do Facebook do usuário. Necessário para obter o page_id usado na criação de criativos. Retorna também o access_token da página se necessário.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, access_token, category)',
        },
      },
    },
  },
  {
    name: 'get_instagram_account',
    description:
      'Get Instagram account — get the Instagram business account linked to a Facebook page. Obtém a conta do Instagram vinculada a uma página do Facebook. Retorna o ID correto do Instagram para usar no campo instagram_user_id ao criar criativos.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        page_id: { type: 'string', description: 'ID da página do Facebook' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: instagram_business_account, connected_instagram_account)',
        },
      },
      required: ['page_id'],
    },
  },

  // ==================== CAMPANHAS ====================
  {
    name: 'list_campaigns',
    description: `List campaigns — get all campaigns from an ad account with optional status filter. Lista campanhas da conta de anúncios. Suporta filtro por status.

FILTRAR POR STATUS:
- effective_status: ["ACTIVE"] → só campanhas ativas
- effective_status: ["PAUSED"] → só campanhas pausadas
- effective_status: ["ACTIVE", "PAUSED"] → ativas e pausadas

DICA: Use effective_status para economizar tokens retornando só o que precisa.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, status, objective)',
        },
        effective_status: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED', 'PENDING_REVIEW', 'DISAPPROVED', 'PREAPPROVED', 'PENDING_BILLING_INFO', 'CAMPAIGN_PAUSED', 'IN_PROCESS', 'WITH_ISSUES'],
          },
          description: 'Filtrar por status efetivo. Ex: ["ACTIVE"] retorna só campanhas ativas',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'get_campaign',
    description: 'Get campaign details — retrieve a specific campaign including budget info (CBO check). Obtém detalhes de uma campanha específica, incluindo informações de orçamento para verificar se é CBO (Campaign Budget Optimization). Campos padrão: id, name, status, objective, daily_budget, lifetime_budget, budget_remaining.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default inclui campos de orçamento para identificar CBO)',
        },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'create_campaign',
    description: `Create campaign — create a new ad campaign with objective, budget, and bid strategy. Cria uma nova campanha. Sempre criar com status PAUSED para revisão antes de ativar.

**OBJETIVOS DISPONÍVEIS:**
- OUTCOME_SALES (conversões) - requer promoted_object no ad set
- OUTCOME_LEADS (leads/formulários)
- OUTCOME_TRAFFIC (tráfego para site)
- OUTCOME_ENGAGEMENT (engajamento)
- OUTCOME_AWARENESS (reconhecimento de marca)
- OUTCOME_APP_PROMOTION (instalação de apps)

**FLUXO RECOMENDADO PARA CRIAR CAMPANHA COMPLETA:**
1. \`create_campaign\` - criar a campanha (este passo)
2. \`list_pixels\` - obter pixel_id (se objetivo for OUTCOME_SALES)
3. \`search_geolocation\` - obter keys de localização corretos
4. \`create_adset\` - criar ad set com targeting e promoted_object
5. \`create_creative\` - criar criativo (imagem/vídeo + texto)
6. \`create_ad\` - vincular ad set + criativo

**ORÇAMENTO:**
- Para CBO (Campaign Budget Optimization): defina daily_budget OU lifetime_budget na campanha
- Para ABO (Ad Set Budget): defina daily_budget nos ad sets individuais
- daily_budget e lifetime_budget são MUTUAMENTE EXCLUSIVOS
- lifetime_budget requer start_time e stop_time

**BID STRATEGY (CBO):**
- Quando daily_budget é definido sem bid_strategy, usa LOWEST_COST_WITHOUT_CAP automaticamente
- Para usar BID_CAP ou COST_CAP, defina bid_strategy explicitamente

**SPEND CAP:** Limite total de gasto da campanha. Mínimo ~$100 USD. Use 922337203685478 para remover.

**BUYING TYPE:** AUCTION (padrão) ou RESERVED (Reach & Frequency).`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome da campanha' },
        objective: {
          type: 'string',
          enum: ['OUTCOME_AWARENESS', 'OUTCOME_ENGAGEMENT', 'OUTCOME_LEADS', 'OUTCOME_SALES', 'OUTCOME_TRAFFIC', 'OUTCOME_APP_PROMOTION'],
          description: 'Objetivo da campanha',
        },
        status: { type: 'string', enum: ['PAUSED', 'ACTIVE'], description: 'Status inicial (default: PAUSED)' },
        daily_budget: { type: 'number', description: 'Orçamento diário em centavos (para CBO). Mutuamente exclusivo com lifetime_budget.' },
        lifetime_budget: { type: 'number', description: 'Orçamento vitalício em centavos. Mutuamente exclusivo com daily_budget. Requer start_time e stop_time.' },
        spend_cap: { type: 'number', description: 'Limite de gasto total da campanha em centavos. Mínimo ~$100 USD. Use 922337203685478 para remover.' },
        buying_type: { type: 'string', enum: ['AUCTION', 'RESERVED'], description: 'Tipo de compra (default: AUCTION). RESERVED para Reach & Frequency.' },
        special_ad_categories: {
          type: 'array',
          items: { type: 'string', enum: ['CREDIT', 'EMPLOYMENT', 'HOUSING', 'ISSUES_ELECTIONS_POLITICS'] },
          description: 'Categorias especiais de anúncios',
        },
        bid_strategy: {
          type: 'string',
          enum: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP', 'BID_CAP'],
          description: 'Estratégia de lance para CBO.',
        },
        is_adset_budget_sharing_enabled: {
          type: 'boolean',
          description: 'Permite compartilhamento de até 20% do orçamento entre ad sets (default: false)',
        },
        start_time: { type: 'string', description: 'Data/hora de início (ISO 8601). Obrigatório com lifetime_budget.' },
        stop_time: { type: 'string', description: 'Data/hora de fim (ISO 8601). Obrigatório com lifetime_budget.' },
        is_skadnetwork_attribution: { type: 'boolean', description: 'Habilitar atribuição SKAdNetwork para iOS 14+' },
        promoted_object: { type: 'object', description: 'Objeto promovido no nível da campanha (iOS 14+ SKAdNetwork)' },
      },
      required: ['account_id', 'name', 'objective'],
    },
  },
  {
    name: 'update_campaign',
    description: 'Update campaign — modify budget, bid strategy, status, schedule, or other campaign settings. Atualiza uma campanha existente.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
        name: { type: 'string', description: 'Novo nome' },
        status: { type: 'string', enum: ['ACTIVE', 'PAUSED'], description: 'Novo status' },
        daily_budget: { type: 'number', description: 'Novo orçamento diário em centavos' },
        lifetime_budget: { type: 'number', description: 'Novo orçamento vitalício em centavos' },
        spend_cap: { type: 'number', description: 'Novo limite de gasto total. Use 922337203685478 para remover.' },
        bid_strategy: {
          type: 'string',
          enum: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP', 'BID_CAP'],
          description: 'Nova estratégia de lance',
        },
        is_adset_budget_sharing_enabled: { type: 'boolean', description: 'Toggle CBO/ABO budget sharing' },
        special_ad_categories: {
          type: 'array',
          items: { type: 'string', enum: ['CREDIT', 'EMPLOYMENT', 'HOUSING', 'ISSUES_ELECTIONS_POLITICS'] },
          description: 'Categorias especiais de anúncios',
        },
        start_time: { type: 'string', description: 'Nova data/hora de início (ISO 8601)' },
        stop_time: { type: 'string', description: 'Nova data/hora de fim (ISO 8601)' },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'pause_campaign',
    description: 'Pause campaign — set campaign status to PAUSED. Pausa uma campanha.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'activate_campaign',
    description: 'Activate campaign — set a paused campaign to ACTIVE. Ativa uma campanha pausada.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
      },
      required: ['campaign_id'],
    },
  },

  // ==================== AD SETS ====================
  {
    name: 'list_adsets',
    description: `List ad sets — get all ad sets from an ad account with optional status filter. Lista conjuntos de anúncios da conta. Suporta filtro por status.

FILTRAR POR STATUS:
- effective_status: ["ACTIVE"] → só ad sets ativos
- effective_status: ["PAUSED", "CAMPAIGN_PAUSED"] → pausados (inclui pausados por campanha)

DICA: Use effective_status para economizar tokens.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: { type: 'array', items: { type: 'string' }, description: 'Campos a retornar' },
        effective_status: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED', 'PENDING_REVIEW', 'DISAPPROVED', 'PREAPPROVED', 'PENDING_BILLING_INFO', 'CAMPAIGN_PAUSED', 'ADSET_PAUSED', 'IN_PROCESS', 'WITH_ISSUES'],
          },
          description: 'Filtrar por status efetivo. Ex: ["ACTIVE"] retorna só ad sets ativos',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'get_adset',
    description: 'Get ad set details — retrieve targeting, budget, attribution, and excluded audiences. Obtém detalhes de um conjunto de anúncios específico.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        adset_id: { type: 'string', description: 'ID do ad set' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, status, campaign_id, daily_budget, targeting, is_incremental_attribution_enabled, attribution_spec). NOTA: excluded_custom_audiences é write-only.',
        },
      },
      required: ['adset_id'],
    },
  },
  {
    name: 'create_adset',
    description: `Create ad set — create a new ad set with targeting, budget, optimization, and schedule. Cria um novo conjunto de anúncios (Ad Set).

**ANTES DE CRIAR:**
1. Use \`list_pixels\` para obter pixel_id (se OFFSITE_CONVERSIONS)
2. Use \`search_geolocation\` para obter keys de localização corretos (CRÍTICO!)

**CAMPOS OBRIGATÓRIOS POR OBJETIVO:**
- OFFSITE_CONVERSIONS: promoted_object com pixel_id + custom_event_type
- APP_INSTALLS: promoted_object com application_id
- PAGE_LIKES: promoted_object com page_id

**ADVANTAGE+ AUDIENCE (v24.0):**
- advantage_audience é injetado automaticamente como 1 (ativado)
- CRÍTICO: Com Advantage+ ativado (1), a API REJEITA age_max < 65 ou age_min > 18 (erro 1870189)
- Use age_min: 18 e age_max: 65 com Advantage+ - a idade vira SUGESTÃO, o Meta pode entregar para qualquer idade
- Para controle RÍGIDO de idade, defina advantage_audience: 0

**LOCALIZAÇÃO - ATENÇÃO:**
NUNCA invente keys! Use search_geolocation para buscar os corretos.
Exemplo errado: key 3847 = California, US (NÃO São Paulo!)
Exemplo correto: key 460 = São Paulo, BR

**EXEMPLO COMPLETO PARA CONVERSÕES:**
\`\`\`json
{
  "name": "Ad Set Conversões",
  "campaign_id": "123456789",
  "optimization_goal": "OFFSITE_CONVERSIONS",
  "billing_event": "IMPRESSIONS",
  "daily_budget": 2000,
  "promoted_object": {
    "pixel_id": "326251992461180",
    "custom_event_type": "PURCHASE"
  },
  "targeting": {
    "geo_locations": {"regions": [{"key": "460"}]},
    "age_min": 18,
    "age_max": 65,
    "targeting_automation": {"advantage_audience": 1}
  }
}
\`\`\`

**Orçamento mínimo Brasil:** R$5,33 (533 centavos). Use 600+ para garantir.

**ORÇAMENTO CBO vs ABO (CRÍTICO):**
- Se a campanha pai tem daily_budget (é CBO): o ad set NÃO pode ter daily_budget próprio
- Se a campanha pai NÃO tem budget (é ABO): o ad set DEVE ter daily_budget
- Verificar com \`get_campaign\` se a campanha pai é CBO ou ABO antes de definir budget

**ATRIBUIÇÃO INCREMENTAL (Andromeda):**
- \`is_incremental_attribution_enabled: true\` otimiza para conversões CAUSADAS pelo anúncio
- Recurso crítico para contas com alto volume orgânico

**EXCLUSÃO DE AUDIÊNCIAS (v24.0):**
- Use \`excluded_custom_audiences\` no nível raiz (NÃO \`targeting.exclusions.custom_audiences\`)
- Exemplo: \`"excluded_custom_audiences": [{"id": "120210539323310649"}]\``,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome do ad set' },
        campaign_id: { type: 'string', description: 'ID da campanha pai' },
        daily_budget: { type: 'number', description: 'Orçamento diário em centavos (mínimo 533 no Brasil). Mutuamente exclusivo com lifetime_budget.' },
        lifetime_budget: { type: 'number', description: 'Orçamento vitalício em centavos. Mutuamente exclusivo com daily_budget. Requer end_time.' },
        billing_event: {
          type: 'string',
          enum: ['IMPRESSIONS', 'LINK_CLICKS', 'APP_INSTALLS', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'VIDEO_VIEWS'],
          description: 'Evento de cobrança',
        },
        optimization_goal: {
          type: 'string',
          enum: [
            // Alcance e impressões
            'REACH', 'IMPRESSIONS', 'AD_RECALL_LIFT',
            // Tráfego
            'LINK_CLICKS', 'LANDING_PAGE_VIEWS',
            // Conversões (OFFSITE_CONVERSIONS é o correto, não CONVERSIONS)
            'OFFSITE_CONVERSIONS', 'VALUE',
            // Engajamento
            'ENGAGED_USERS', 'EVENT_RESPONSES', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'THRUPLAY', 'VIDEO_VIEWS',
            // Leads
            'LEAD_GENERATION', 'QUALITY_LEAD',
            // Apps
            'APP_INSTALLS', 'APP_INSTALLS_AND_OFFSITE_CONVERSIONS',
            // Instagram/Mensagens
            'VISIT_INSTAGRAM_PROFILE', 'PROFILE_VISIT', 'CONVERSATIONS', 'MESSAGING_PURCHASE_CONVERSION', 'MESSAGING_APPOINTMENT_CONVERSION',
            // Outros
            'IN_APP_VALUE', 'SUBSCRIBERS', 'REMINDERS_SET', 'MEANINGFUL_CALL_ATTEMPT', 'QUALITY_CALL', 'DERIVED_EVENTS',
          ],
          description: 'Objetivo de otimização. Para conversões use OFFSITE_CONVERSIONS (não CONVERSIONS).',
        },
        targeting: { type: 'object', description: 'Especificação de targeting' },
        status: { type: 'string', enum: ['PAUSED', 'ACTIVE'], description: 'Status inicial' },
        bid_strategy: {
          type: 'string',
          enum: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP'],
          description: 'Estratégia de lance (default: LOWEST_COST_WITHOUT_CAP). Nota: BID_CAP é apenas para campanhas; em ad sets use LOWEST_COST_WITH_BID_CAP.',
        },
        bid_amount: { type: 'number', description: 'Valor do lance em centavos (obrigatório para LOWEST_COST_WITH_BID_CAP e COST_CAP)' },
        promoted_object: {
          type: 'object',
          description: 'Objeto promovido. OBRIGATÓRIO para: OFFSITE_CONVERSIONS (pixel_id + custom_event_type), APP_INSTALLS (application_id), PAGE_LIKES (page_id). Use list_pixels para obter pixel_id.',
          properties: {
            pixel_id: { type: 'string', description: 'ID do pixel (obrigatório para OFFSITE_CONVERSIONS). Use list_pixels para obter.' },
            custom_event_type: {
              type: 'string',
              enum: ['PURCHASE', 'LEAD', 'COMPLETE_REGISTRATION', 'ADD_TO_CART', 'INITIATE_CHECKOUT', 'ADD_PAYMENT_INFO', 'SEARCH', 'CONTENT_VIEW', 'VIEW_CONTENT', 'ADD_TO_WISHLIST', 'CONTACT', 'CUSTOMIZE_PRODUCT', 'DONATE', 'FIND_LOCATION', 'SCHEDULE', 'SUBMIT_APPLICATION', 'START_TRIAL', 'SUBSCRIBE', 'OTHER'],
              description: 'Tipo de evento de conversão',
            },
            application_id: { type: 'string', description: 'ID do app (obrigatório para APP_INSTALLS)' },
            object_store_url: { type: 'string', description: 'URL da app store' },
            page_id: { type: 'string', description: 'ID da página (obrigatório para PAGE_LIKES)' },
            event_id: { type: 'string', description: 'ID do evento' },
            custom_conversion_id: { type: 'string', description: 'ID de conversão customizada' },
            offline_conversion_data_set_id: { type: 'string', description: 'ID do dataset de conversão offline' },
            product_set_id: { type: 'string', description: 'ID do conjunto de produtos' },
          },
        },
        advantage_audience: {
          type: 'number',
          enum: [0, 1],
          description: 'Público Advantage+ (0=desativado, 1=ativado). OBRIGATÓRIO na v24.0. Default: 1. ATENÇÃO: Com Advantage+ ativado (1), a API REJEITA age_max < 65 ou age_min > 18 (erro 1870189). Use 18-65 com Advantage+.',
        },
        start_time: {
          type: 'string',
          description: 'Data/hora de início do ad set (formato ISO 8601, ex: "2026-02-10T00:00:00-0300")',
        },
        end_time: {
          type: 'string',
          description: 'Data/hora de fim do ad set (formato ISO 8601, ex: "2026-02-28T23:59:59-0300")',
        },
        attribution_spec: {
          type: 'array',
          description: 'Especificação de atribuição. Ex: [{"event_type": "CLICK_THROUGH", "window_days": 7}] para 7d click only.',
          items: {
            type: 'object',
            properties: {
              event_type: { type: 'string', description: 'Tipo de evento (ex: "CLICK_THROUGH", "VIEW_THROUGH")' },
              window_days: { type: 'number', description: 'Dias da janela de atribuição (ex: 1, 7, 28)' },
            },
          },
        },
        is_incremental_attribution_enabled: {
          type: 'boolean',
          description: 'Habilitar atribuição incremental. Quando true, o algoritmo otimiza para conversões CAUSADAS pelo anúncio (não apenas correlacionadas). Recurso-chave do Andromeda.',
        },
        excluded_custom_audiences: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID da custom audience' },
            },
          },
          description: 'Custom audiences para excluir do targeting. Campo TOP-LEVEL (NÃO dentro de targeting.exclusions, que foi depreciado na v24.0).',
        },
        destination_type: {
          type: 'string',
          enum: ['WEBSITE', 'APP', 'MESSENGER', 'WHATSAPP', 'INSTAGRAM_DIRECT', 'PHONE_CALL', 'SHOP', 'UNDEFINED'],
          description: 'Tipo de destino. Obrigatório para objetivos ODAX.',
        },
        is_dynamic_creative: {
          type: 'boolean',
          description: 'Habilitar Dynamic Creative (DCO). Quando true, aceita criativos com asset_feed_spec.',
        },
        adset_schedule: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              start_minute: { type: 'number', description: 'Minuto de início (0-1440)' },
              end_minute: { type: 'number', description: 'Minuto de fim (0-1440)' },
              days: { type: 'array', items: { type: 'number' }, description: 'Dias da semana (0=dom, 6=sáb)' },
              timezone_type: { type: 'string', enum: ['USER', 'ADVERTISER'] },
            },
          },
          description: 'Dayparting. REQUER lifetime_budget e pacing_type=["day_parting"]. Ex: [{start_minute: 480, end_minute: 1320, days: [1,2,3,4,5]}]',
        },
        pacing_type: {
          type: 'array',
          items: { type: 'string', enum: ['standard', 'day_parting', 'no_pacing'] },
          description: 'Tipo de ritmo de entrega. Use ["day_parting"] quando adset_schedule estiver definido.',
        },
        frequency_control_specs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              event: { type: 'string', description: 'Tipo de evento (IMPRESSIONS)' },
              interval_days: { type: 'number', description: 'Intervalo em dias' },
              max_frequency: { type: 'number', description: 'Frequência máxima' },
            },
          },
          description: 'Controle de frequência. Ex: [{event: "IMPRESSIONS", interval_days: 7, max_frequency: 3}]',
        },
        daily_min_spend_target: { type: 'number', description: 'Meta mínima de gasto diário em centavos (CBO)' },
        daily_spend_cap: { type: 'number', description: 'Limite máximo de gasto diário em centavos (CBO)' },
        bid_constraints: { type: 'object', description: 'Restrições de lance. Ex: {"roas_average_floor": 2.0}. Requer optimization_goal=VALUE e bid_strategy não-autobid.' },
        dsa_beneficiary: { type: 'string', description: 'Beneficiário DSA (EU compliance)' },
        dsa_payor: { type: 'string', description: 'Pagador DSA (EU compliance)' },
        adlabels: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' } } }, description: 'Labels para associar' },
      },
      required: ['account_id', 'name', 'campaign_id', 'billing_event', 'optimization_goal', 'targeting'],
    },
  },
  {
    name: 'update_adset',
    description: 'Update ad set — modify budget, bid strategy, targeting, schedule, or promoted object. Atualiza um conjunto de anúncios.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        adset_id: { type: 'string', description: 'ID do ad set' },
        name: { type: 'string', description: 'Novo nome' },
        status: { type: 'string', enum: ['ACTIVE', 'PAUSED'], description: 'Novo status' },
        daily_budget: { type: 'number', description: 'Novo orçamento diário em centavos' },
        lifetime_budget: { type: 'number', description: 'Novo orçamento vitalício em centavos' },
        targeting: { type: 'object', description: 'Nova especificação de targeting' },
        bid_strategy: {
          type: 'string',
          enum: ['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP'],
          description: 'Nova estratégia de lance. Nota: BID_CAP é apenas para campanhas.',
        },
        bid_amount: { type: 'number', description: 'Novo valor do lance em centavos' },
        bid_constraints: { type: 'object', description: 'Novas restrições de lance. Ex: {"roas_average_floor": 2.0}. Requer optimization_goal=VALUE.' },
        start_time: { type: 'string', description: 'Nova data/hora de início (ISO 8601)' },
        end_time: { type: 'string', description: 'Nova data/hora de fim (ISO 8601)' },
        optimization_goal: {
          type: 'string',
          enum: [
            'REACH', 'IMPRESSIONS', 'AD_RECALL_LIFT', 'LINK_CLICKS', 'LANDING_PAGE_VIEWS',
            'OFFSITE_CONVERSIONS', 'VALUE', 'ENGAGED_USERS', 'EVENT_RESPONSES', 'PAGE_LIKES',
            'POST_ENGAGEMENT', 'THRUPLAY', 'VIDEO_VIEWS', 'LEAD_GENERATION', 'QUALITY_LEAD',
            'APP_INSTALLS', 'APP_INSTALLS_AND_OFFSITE_CONVERSIONS', 'VISIT_INSTAGRAM_PROFILE',
            'PROFILE_VISIT', 'CONVERSATIONS', 'MESSAGING_PURCHASE_CONVERSION',
            'MESSAGING_APPOINTMENT_CONVERSION', 'IN_APP_VALUE', 'SUBSCRIBERS', 'REMINDERS_SET',
            'MEANINGFUL_CALL_ATTEMPT', 'QUALITY_CALL', 'DERIVED_EVENTS',
          ],
          description: 'Novo objetivo de otimização',
        },
        promoted_object: {
          type: 'object',
          description: 'Novo objeto promovido',
          properties: {
            pixel_id: { type: 'string' },
            custom_event_type: { type: 'string' },
            application_id: { type: 'string' },
            page_id: { type: 'string' },
          },
        },
        attribution_spec: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              event_type: { type: 'string' },
              window_days: { type: 'number' },
            },
          },
          description: 'Nova especificação de atribuição',
        },
        value_rule_set_id: { type: 'string', description: 'ID do value rule set' },
        value_rules_applied: { type: 'boolean', description: 'Habilitar regras de valor' },
        dsa_beneficiary: { type: 'string', description: 'Beneficiário DSA (EU compliance)' },
        dsa_payor: { type: 'string', description: 'Pagador DSA (EU compliance)' },
        adlabels: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' } } }, description: 'Labels' },
      },
      required: ['adset_id'],
    },
  },
  {
    name: 'pause_adset',
    description: 'Pause ad set — set ad set status to PAUSED. Pausa um conjunto de anúncios.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        adset_id: { type: 'string', description: 'ID do ad set' },
      },
      required: ['adset_id'],
    },
  },
  {
    name: 'activate_adset',
    description: 'Activate ad set — set a paused ad set to ACTIVE. Ativa um conjunto de anúncios pausado.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        adset_id: { type: 'string', description: 'ID do ad set' },
      },
      required: ['adset_id'],
    },
  },

  // ==================== ADS ====================
  {
    name: 'list_ads',
    description: 'List ads — get all ads from an ad account. Lista todos os anúncios da conta de anúncios.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, status, adset_id, effective_status)',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'list_campaign_ads',
    description: 'List campaign ads — get all ads from a specific campaign. Lista todos os anúncios de uma campanha específica.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, status, effective_status, adset_id, creative)',
        },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'get_ad',
    description: 'Get ad details — retrieve a specific ad including delivery status. Obtém detalhes de um anúncio específico, incluindo effective_status.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        ad_id: { type: 'string', description: 'ID do anúncio' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, status, effective_status, adset_id, creative, created_time)',
        },
      },
      required: ['ad_id'],
    },
  },
  {
    name: 'create_ad',
    description: `Create ad — create a new ad linking an ad set to a creative. Cria um novo anúncio.

**Novos campos:**
- tracking_specs: Especificações de rastreamento customizado
- ad_schedule_start_time / ad_schedule_end_time: Agendamento (Sales/App only)
- conversion_domain: Domínio de conversão (1st+2nd level)`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome do anúncio' },
        adset_id: { type: 'string', description: 'ID do ad set pai' },
        creative_id: { type: 'string', description: 'ID do criativo a usar' },
        status: { type: 'string', enum: ['PAUSED', 'ACTIVE'], description: 'Status inicial' },
        tracking_specs: {
          type: 'array',
          items: { type: 'object' },
          description: 'Especificações de rastreamento. Ex: [{"action.type": "offsite_conversion", "fb_pixel": "PIXEL_ID"}]',
        },
        ad_schedule_start_time: { type: 'string', description: 'Data/hora de início do ad (ISO 8601). Sales/App only.' },
        ad_schedule_end_time: { type: 'string', description: 'Data/hora de fim do ad (ISO 8601). Sales/App only.' },
        conversion_domain: { type: 'string', description: 'Domínio de conversão. Ex: "example.com"' },
        adlabels: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' } } }, description: 'Labels' },
      },
      required: ['account_id', 'name', 'adset_id', 'creative_id'],
    },
  },
  {
    name: 'update_ad',
    description: `Update ad — modify name, status, creative, or tracking specs. Atualiza um anúncio existente.

**Creative Swap:** Use creative: {"creative_id": "NEW_ID"} para trocar criativo sem recriar o ad.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        ad_id: { type: 'string', description: 'ID do anúncio' },
        name: { type: 'string', description: 'Novo nome' },
        status: { type: 'string', enum: ['ACTIVE', 'PAUSED'], description: 'Novo status' },
        creative: {
          type: 'object',
          properties: { creative_id: { type: 'string', description: 'ID do novo criativo' } },
          description: 'Trocar criativo sem recriar o ad',
        },
        tracking_specs: { type: 'array', items: { type: 'object' }, description: 'Novas especificações de rastreamento' },
        conversion_domain: { type: 'string', description: 'Novo domínio de conversão' },
        adlabels: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' } } }, description: 'Labels' },
      },
      required: ['ad_id'],
    },
  },
  {
    name: 'pause_ad',
    description: 'Pause ad — set ad status to PAUSED. Pausa um anúncio.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        ad_id: { type: 'string', description: 'ID do anúncio' },
      },
      required: ['ad_id'],
    },
  },
  {
    name: 'activate_ad',
    description: 'Activate ad — set a paused ad to ACTIVE. Ativa um anúncio pausado.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        ad_id: { type: 'string', description: 'ID do anúncio' },
      },
      required: ['ad_id'],
    },
  },

  // ==================== CRIATIVOS ====================
  {
    name: 'list_creatives',
    description: 'List creatives — get all ad creatives from an ad account. Lista todos os criativos da conta de anúncios.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, object_story_spec, thumbnail_url)',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'get_creative',
    description: 'Get creative details — retrieve a specific ad creative. Obtém detalhes de um criativo específico.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        creative_id: { type: 'string', description: 'ID do criativo' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, object_story_spec, thumbnail_url, effective_object_story_id)',
        },
      },
      required: ['creative_id'],
    },
  },
  {
    name: 'create_creative',
    description: `Create creative — create an ad creative (link, video, carousel, or DCO). Cria um novo criativo para anúncios. Suporta Link Ads, Video Ads, Carousel Ads e Dynamic Creative (DCO).

**Link Ad (object_story_spec.link_data):**
\`\`\`json
{
  "page_id": "ID_DA_PAGINA",
  "link_data": {
    "link": "https://seu-site.com",
    "message": "Texto do post",
    "name": "Título",
    "image_hash": "HASH_DE_UPLOAD_IMAGE",
    "call_to_action": { "type": "LEARN_MORE" }
  }
}
\`\`\`

**Video Ad (object_story_spec.video_data):**
\`\`\`json
{
  "page_id": "ID_DA_PAGINA",
  "video_data": {
    "video_id": "ID_DE_UPLOAD_VIDEO",
    "message": "Texto do post",
    "title": "Título",
    "call_to_action": { "type": "SHOP_NOW", "value": {"link": "https://..."} }
  }
}
\`\`\`

**Carousel Ad (object_story_spec.link_data.child_attachments):**
\`\`\`json
{
  "page_id": "ID_DA_PAGINA",
  "link_data": {
    "link": "https://seu-site.com",
    "message": "Texto do post",
    "child_attachments": [
      {"link": "https://url1.com", "image_hash": "HASH1", "name": "Card 1"},
      {"link": "https://url2.com", "image_hash": "HASH2", "name": "Card 2"}
    ]
  }
}
\`\`\`

**DCO (asset_feed_spec):** Requer is_dynamic_creative=true no ad set.

**Boosted Post (object_story_id):** Use PAGE_ID_POST_ID para promover post existente.

**CTAs:** LEARN_MORE, SHOP_NOW, SIGN_UP, BOOK_TRAVEL, CONTACT_US, DOWNLOAD, GET_QUOTE, APPLY_NOW, SUBSCRIBE, WATCH_MORE`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome do criativo' },
        object_story_spec: {
          type: 'object',
          description: 'Especificação do criativo. Suporta link_data (Link/Carousel), video_data (Video), photo_data (Image).',
          properties: {
            page_id: { type: 'string', description: 'ID da página do Facebook' },
            instagram_user_id: { type: 'string', description: 'ID do Instagram (obter via get_instagram_account)' },
            link_data: {
              type: 'object',
              description: 'Dados do link. Para carousel, inclua child_attachments.',
              properties: {
                link: { type: 'string', description: 'URL de destino' },
                message: { type: 'string', description: 'Texto do post' },
                name: { type: 'string', description: 'Título do anúncio' },
                description: { type: 'string', description: 'Descrição' },
                image_hash: { type: 'string', description: 'Hash da imagem (de upload_image)' },
                image_url: { type: 'string', description: 'URL externa da imagem' },
                call_to_action: {
                  type: 'object',
                  properties: { type: { type: 'string', description: 'Tipo do CTA' } },
                },
                child_attachments: {
                  type: 'array',
                  items: { type: 'object' },
                  description: 'Cards do carrossel (2-10 cards)',
                },
                multi_share_end_card: { type: 'boolean', description: 'Mostrar card final com página' },
                multi_share_optimized: { type: 'boolean', description: 'Otimizar ordem dos cards' },
              },
            },
            video_data: {
              type: 'object',
              description: 'Dados do vídeo. Requer video_id de upload_video.',
              properties: {
                video_id: { type: 'string', description: 'ID do vídeo' },
                image_hash: { type: 'string', description: 'Thumbnail hash' },
                message: { type: 'string', description: 'Texto do post' },
                title: { type: 'string', description: 'Título' },
                link_description: { type: 'string', description: 'Descrição do link' },
                call_to_action: { type: 'object', properties: { type: { type: 'string' } } },
              },
            },
            page_welcome_message: { type: 'string', description: 'Mensagem de boas-vindas (Click-to-WhatsApp/Messenger)' },
          },
        },
        object_story_id: { type: 'string', description: 'ID de post existente para promover (PAGE_ID_POST_ID). Alternativa a object_story_spec.' },
        image_hash: { type: 'string', description: 'Hash da imagem (de upload_image). Top-level.' },
        image_url: { type: 'string', description: 'URL externa da imagem. Top-level.' },
        url_tags: { type: 'string', description: 'Parâmetros UTM automáticos. Ex: "utm_source=facebook&utm_medium=cpc"' },
        asset_feed_spec: {
          type: 'object',
          description: 'Assets para Dynamic Creative (DCO). Requer is_dynamic_creative=true no ad set.',
          properties: {
            images: { type: 'array', items: { type: 'object' }, description: 'Imagens para DCO' },
            videos: { type: 'array', items: { type: 'object' }, description: 'Vídeos para DCO' },
            bodies: { type: 'array', items: { type: 'object' }, description: 'Textos do corpo' },
            titles: { type: 'array', items: { type: 'object' }, description: 'Títulos' },
            descriptions: { type: 'array', items: { type: 'object' }, description: 'Descrições' },
            call_to_action_types: { type: 'array', items: { type: 'string' }, description: 'CTAs' },
            link_urls: { type: 'array', items: { type: 'object' }, description: 'URLs de destino' },
          },
        },
        platform_customizations: { type: 'object', description: 'Customizações por plataforma (imagem diferente para Instagram vs Facebook)' },
        creative_features_spec: {
          type: 'object',
          description: 'Advantage+ Creative features. Cada feature aceita {"enroll_status": "OPT_IN"/"OPT_OUT"}.',
          properties: {
            image_touchups: { type: 'object', description: 'Auto crop/expand' },
            image_background_gen: { type: 'object', description: 'Backgrounds IA' },
            image_templates: { type: 'object', description: 'Overlays texto IA' },
            text_optimizations: { type: 'object', description: 'Texto dinâmico' },
            enhance_cta: { type: 'object', description: 'CTA aprimorado' },
            image_uncrop: { type: 'object', description: 'Expansão imagem IA' },
            video_auto_crop: { type: 'object', description: 'Vídeo auto crop' },
            media_type_automation: { type: 'object', description: 'Mídia dinâmica' },
            description_automation: { type: 'object', description: 'Descrições dinâmicas' },
          },
        },
      },
      required: ['account_id', 'name'],
    },
  },

  // ==================== INSIGHTS ====================
  {
    name: 'get_account_insights',
    description: `Get account insights — retrieve aggregated metrics (spend, impressions, conversions) for an ad account. Obtém métricas agregadas da conta de anúncios.

PARÂMETROS DE ATRIBUIÇÃO:
- action_attribution_windows: Quebra conversões por janela (1d_click, 7d_click, 1d_view, incrementality)
- use_unified_attribution_setting: false permite override das janelas

EXEMPLO COM ATRIBUIÇÃO:
fields: ["spend", "actions", "cost_per_action_type"]
action_attribution_windows: ["1d_click", "7d_click", "incrementality"]

INTERPRETAÇÃO:
- value = total com atribuição padrão
- 1d_click = conversões 1 dia após clique
- incrementality = conversões incrementais (impacto real)`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        date_preset: {
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período predefinido',
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
          description: 'Intervalo de datas personalizado',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Métricas a retornar (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)',
        },
        action_attribution_windows: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['1d_click', '7d_click', '28d_click', '1d_view', '7d_view', '28d_view', '1d_ev', 'incrementality', 'dda'],
          },
          description: 'Janelas de atribuição para quebrar métricas de conversão',
        },
        use_unified_attribution_setting: {
          type: 'boolean',
          description: 'Se false, permite especificar janelas manualmente (default: true)',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'get_campaign_insights',
    description: `Get campaign insights — retrieve performance metrics for a specific campaign. Obtém métricas de uma campanha específica.

PARÂMETROS DE ATRIBUIÇÃO AVANÇADA:
- action_attribution_windows: ["1d_click", "7d_click", "incrementality"] - quebra conversões por janela
- use_unified_attribution_setting: false - permite override das config do ad set

DICA: Para análise de eficiência real, use get_attribution_comparison que já formata a comparação entre modelos.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
        date_preset: { 
          type: 'string', 
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período predefinido' 
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
        },
        fields: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Métricas (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)',
        },
        action_attribution_windows: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['1d_click', '7d_click', '28d_click', '1d_view', '7d_view', '28d_view', '1d_ev', 'incrementality', 'dda'],
          },
          description: 'Janelas de atribuição para quebrar métricas de conversão',
        },
        use_unified_attribution_setting: {
          type: 'boolean',
          description: 'Se false, permite especificar janelas manualmente',
        },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'get_adset_insights',
    description: `Get ad set insights — retrieve performance metrics for a specific ad set. Obtém métricas de um conjunto de anúncios.

PARÂMETROS DE ATRIBUIÇÃO AVANÇADA:
- action_attribution_windows: ["1d_click", "7d_click", "incrementality"] - quebra conversões por janela
- use_unified_attribution_setting: false - permite override das config do ad set

DICA: Para análise de eficiência real, use get_attribution_comparison que já formata a comparação entre modelos.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        adset_id: { type: 'string', description: 'ID do ad set' },
        date_preset: { 
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
        },
        fields: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Métricas (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)',
        },
        action_attribution_windows: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['1d_click', '7d_click', '28d_click', '1d_view', '7d_view', '28d_view', '1d_ev', 'incrementality', 'dda'],
          },
          description: 'Janelas de atribuição para quebrar métricas de conversão',
        },
        use_unified_attribution_setting: {
          type: 'boolean',
          description: 'Se false, permite especificar janelas manualmente',
        },
      },
      required: ['adset_id'],
    },
  },
  {
    name: 'get_ad_insights',
    description: `Get ad insights — retrieve performance metrics for a specific ad. Obtém métricas de um anúncio específico. Completa a hierarquia de insights (conta > campanha > adset > ad).

PARÂMETROS DE ATRIBUIÇÃO AVANÇADA:
- action_attribution_windows: ["1d_click", "7d_click", "incrementality"] - quebra conversões por janela
- use_unified_attribution_setting: false - permite override das config do ad set

EXEMPLO DE USO:
fields: ["ad_name", "spend", "actions", "cost_per_action_type"]
action_attribution_windows: ["1d_click", "7d_click", "1d_view", "incrementality"]

DICA: Para comparação formatada entre modelos de atribuição, use get_attribution_comparison.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        ad_id: { type: 'string', description: 'ID do anúncio' },
        date_preset: {
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período predefinido',
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
          description: 'Intervalo de datas personalizado',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Métricas (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)',
        },
        action_attribution_windows: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['1d_click', '7d_click', '28d_click', '1d_view', '7d_view', '28d_view', '1d_ev', 'incrementality', 'dda'],
          },
          description: 'Janelas de atribuição para quebrar métricas de conversão',
        },
        use_unified_attribution_setting: {
          type: 'boolean',
          description: 'Se false, permite especificar janelas manualmente',
        },
      },
      required: ['ad_id'],
    },
  },
  {
    name: 'get_attribution_comparison',
    description: `Get attribution comparison — compare conversions across attribution models (all vs first vs incremental). Compara métricas de conversão entre diferentes modelos de atribuição.
    
QUANDO USAR:
- Análise de eficiência real de anúncios/campanhas
- Identificar se está pagando por conversões orgânicas
- Comparar CPA entre modelos de atribuição

INTERPRETAÇÃO:
- Se incrementality < 30% do all_conversions → alto risco de pagar por conversões orgânicas
- first_conversion é mais preciso para métricas de aquisição
- CPA incremental mostra o custo real por conversão adicional`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        object_id: { type: 'string', description: 'ID do objeto (ad, adset ou campaign)' },
        object_type: { 
          type: 'string', 
          enum: ['ad', 'adset', 'campaign'],
          description: 'Tipo do objeto' 
        },
        date_preset: {
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período (default: last_30d)',
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
          description: 'Intervalo de datas personalizado',
        },
        actions: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tipos de conversão para comparar (default: purchase, lead, initiate_checkout)',
        },
      },
      required: ['object_id', 'object_type'],
    },
  },
  {
    name: 'get_performance_summary',
    description: `Get performance summary — account performance overview with aggregated attribution metrics. Resumo de performance da conta com métricas agregadas por atribuição (all vs incremental).

RETORNA:
- spend total do período
- Para cada action_type: all_conversions, incremental, cpa_all, cpa_incremental, incremental_pct
- ROAS (apenas se purchase_conversion_value existir nos dados)

INTERPRETAÇÃO:
- incremental_pct < 30% → alto risco de pagar por conversões orgânicas
- CPA incremental mostra o custo real por conversão adicional
- ROAS incremental é o retorno real sobre investimento

EXEMPLO:
action_types: ["purchase", "lead"]  // opcional, default: ["purchase"]`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        date_preset: {
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período (default: last_30d)',
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
          description: 'Intervalo de datas personalizado',
        },
        action_types: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tipos de conversão para analisar (default: ["purchase"]). Ex: ["purchase", "lead"]',
        },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'list_campaign_ads_with_insights',
    description: `List campaign ads with insights — get all ads from a campaign with performance metrics included. Lista todos os anúncios de uma campanha JÁ COM métricas de insights.

RESOLVE O PROBLEMA N+1:
- Antes: list_campaign_ads → loop de get_ad_insights por ad
- Agora: Uma chamada só retorna ads + métricas

SUPORTA ATRIBUIÇÃO:
- action_attribution_windows: ["1d_click", "7d_click", "incrementality"]
- Retorna conversões quebradas por janela

RETORNO:
Para cada ad: id, name, status, effective_status, spend, impressions, clicks, actions (com atribuição se solicitado)`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        campaign_id: { type: 'string', description: 'ID da campanha' },
        date_preset: {
          type: 'string',
          enum: ['today', 'yesterday', 'last_7d', 'last_14d', 'last_30d', 'this_month', 'last_month'],
          description: 'Período (default: last_30d)',
        },
        time_range: {
          type: 'object',
          properties: {
            since: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
            until: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
          },
          description: 'Intervalo de datas personalizado',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Métricas de insights (default: spend, impressions, clicks, actions, cost_per_action_type)',
        },
        action_attribution_windows: {
          type: 'array',
          items: { 
            type: 'string',
            enum: ['1d_click', '7d_click', '28d_click', '1d_view', '7d_view', '28d_view', '1d_ev', 'incrementality', 'dda'],
          },
          description: 'Janelas de atribuição para quebrar métricas de conversão',
        },
      },
      required: ['account_id', 'campaign_id'],
    },
  },

  // ==================== AUDIÊNCIAS ====================
  {
    name: 'list_custom_audiences',
    description: 'List custom audiences — get all custom audiences from an ad account. Lista audiências customizadas da conta. NOTA: approximate_count depreciado, use approximate_count_lower_bound e approximate_count_upper_bound.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: { type: 'array', items: { type: 'string' }, description: 'Campos a retornar. Evite approximate_count (depreciado)' },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'create_custom_audience',
    description: `Create custom audience — create a custom audience (website, app, engagement, or lookalike). Cria uma audiência customizada.

**Subtipos e campos obrigatórios:**
- CUSTOM: Requer customer_file_source (ex: "USER_PROVIDED_ONLY")
- WEBSITE: Requer rule com pixel_id e retention
- APP: Requer rule com app_id
- ENGAGEMENT: Requer rule com page_id ou ig_business_id

**Exemplo para WEBSITE (visitantes do site 30 dias):**
\`\`\`json
{
  "name": "Visitantes Site 30D",
  "subtype": "WEBSITE",
  "rule": {
    "inclusions": {
      "operator": "or",
      "rules": [{
        "event_sources": [{"id": "PIXEL_ID", "type": "pixel"}],
        "retention_seconds": 2592000
      }]
    }
  }
}
\`\`\``,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome da audiência' },
        subtype: {
          type: 'string',
          enum: ['CUSTOM', 'WEBSITE', 'APP', 'OFFLINE_CONVERSION', 'LOOKALIKE', 'ENGAGEMENT'],
          description: 'Subtipo da audiência',
        },
        description: { type: 'string', description: 'Descrição da audiência' },
        customer_file_source: {
          type: 'string',
          enum: ['USER_PROVIDED_ONLY', 'PARTNER_PROVIDED_ONLY', 'BOTH_USER_AND_PARTNER_PROVIDED'],
          description: 'Fonte dos dados (obrigatório para CUSTOM)',
        },
        rule: {
          type: 'object',
          description: 'Regra de audiência (obrigatório para WEBSITE, APP, ENGAGEMENT)',
        },
        pixel_id: { type: 'string', description: 'ID do pixel (para WEBSITE)' },
        prefill: { type: 'boolean', description: 'Preencher com dados históricos' },
      },
      required: ['account_id', 'name', 'subtype'],
    },
  },
  {
    name: 'get_reach_estimate',
    description: 'Get reach estimate — estimate audience size for a targeting spec. Obtém estimativa de alcance para um targeting.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        targeting_spec: { type: 'object', description: 'Especificação de targeting' },
      },
      required: ['account_id', 'targeting_spec'],
    },
  },

  // ==================== PIXELS ====================
  {
    name: 'list_pixels',
    description: `List pixels — get all Meta pixels from an ad account. Lista os pixels da conta de anúncios.

**QUANDO USAR:**
- ANTES de criar ad sets com optimization_goal: OFFSITE_CONVERSIONS
- Para obter o pixel_id correto para o campo promoted_object

**RETORNA:**
- id: ID do pixel (use este valor no promoted_object.pixel_id)
- name: Nome do pixel
- last_fired_time: Última vez que o pixel disparou eventos

**EXEMPLO DE USO:**
1. Chamar list_pixels para obter os IDs disponíveis
2. Usar o pixel_id no create_adset:
\`\`\`json
{
  "promoted_object": {
    "pixel_id": "326251992461180",
    "custom_event_type": "PURCHASE"
  }
}
\`\`\``,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Campos a retornar (default: id, name, last_fired_time, is_created_by_business)',
        },
      },
      required: ['account_id'],
    },
  },

  // ==================== UPLOAD DE IMAGEM ====================
  {
    name: 'upload_image',
    description: `Upload image — upload an image to the ad account and get the image_hash. Faz upload de uma imagem para a conta de anúncios e retorna o image_hash.

**QUANDO USAR:**
- Antes de criar criativos que precisam de imagem
- O image_hash retornado deve ser usado em link_data.image_hash do object_story_spec

**RETORNA:**
- image_hash: Hash da imagem (usar em criativos)
- url: URL da imagem no Meta

**EXEMPLO DE USO:**
1. upload_image(image_url: "https://exemplo.com/imagem.jpg")
2. Usar image_hash no create_creative:
\`\`\`json
{
  "object_story_spec": {
    "page_id": "ID",
    "link_data": {
      "image_hash": "HASH_RETORNADO",
      "link": "https://seu-site.com"
    }
  }
}
\`\`\``,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        image_url: { type: 'string', description: 'URL da imagem para upload' },
      },
      required: ['account_id', 'image_url'],
    },
  },

  // ==================== DATASET QUALITY (EMQ) ====================
  {
    name: 'get_dataset_quality',
    description: `Get dataset quality — check pixel Event Match Quality (EMQ) score. Verifica a qualidade do dataset de um pixel.

**QUANDO USAR:**
- Verificar saúde da implementação CAPI (Conversions API)
- Auditar qualidade dos eventos antes de campanhas Andromeda
- Target: EMQ >= 6.0 para otimização eficiente

**RETORNA:**
- EMQ score por evento
- Event coverage (% de eventos cobertos pela CAPI)
- Feedback sobre deduplicação
- Freshness dos dados

**REFERÊNCIA ANDROMEDA:**
- EMQ >= 6.0 é requisito mínimo para Andromeda funcionar bem
- Event coverage >= 75% é recomendado`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        pixel_id: { type: 'string', description: 'ID do pixel/dataset. Use list_pixels para obter.' },
      },
      required: ['pixel_id'],
    },
  },

  // ==================== GEOLOCALIZAÇÃO ====================
  {
    name: 'search_geolocation',
    description: `Search geolocation — find location targeting keys (countries, regions, cities, zip codes). Busca localizações para targeting de anúncios.

**CRÍTICO:** SEMPRE use esta tool para obter os keys corretos de localização!
Os keys do Meta são ESPECÍFICOS e NÃO correspondem a códigos geográficos padrão.

**EXEMPLO DO PROBLEMA:**
- Key 3847 = California, US (NÃO é São Paulo!)
- Key 460 = São Paulo, BR (estado)
- Key 2430536 = São Paulo, BR (cidade)

**REFERÊNCIA RÁPIDA BRASIL:**
| Localização | Tipo | Key |
|-------------|------|-----|
| Brasil | country | BR |
| São Paulo (estado) | region | 460 |
| Rio de Janeiro (estado) | region | 461 |
| Minas Gerais (estado) | region | 462 |
| Paraná (estado) | region | 478 |
| São Paulo (cidade) | city | 2430536 |

**COMO USAR NO TARGETING:**
\`\`\`json
{
  "geo_locations": {
    "regions": [{"key": "460"}],
    "countries": ["BR"]
  }
}
\`\`\`

**DICA:** Para maior precisão, sempre busque pelo nome E verifique o country_code no resultado.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        q: { type: 'string', description: 'Termo de busca (ex: "São Paulo", "Brasil", "California")' },
        location_types: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['country', 'region', 'city', 'zip', 'geo_market', 'electoral_district'],
          },
          description: 'Tipos de localização para filtrar (default: todos). Ex: ["region", "city"]',
        },
        country_code: { type: 'string', description: 'Código do país para filtrar resultados (ex: "BR", "US")' },
        limit: { type: 'number', description: 'Número máximo de resultados (default: 25, máx: 100)' },
      },
      required: ['q'],
    },
  },

  // ==================== API CUSTOMIZADA ====================
  {
    name: 'execute_api',
    description: `Execute API — make a custom Meta Marketing API call for endpoints without a dedicated tool. Executa chamada customizada à API da Meta para endpoints sem tool específica.

CASOS DE USO:
- Duplicar campanha: POST {id}/copies (params: deep_copy, status_option)
- Listar ads de campanha: GET {campaign_id}/ads
- Obter delivery estimate: GET {adset_id}/delivery_estimate
- Descobrir ID da conta: GET me/adaccounts (FAÇA ISSO PRIMEIRO se não souber o ID!)
- Criar campanha com campos novos: POST {ad_account_id}/campaigns (incluir is_adset_budget_sharing_enabled)
- Criar ad set com bid_strategy: POST {ad_account_id}/adsets (incluir bid_strategy: LOWEST_COST_WITHOUT_CAP)

MULTI-CONTA:
- Cada tool que opera em nível de conta requer account_id explícito
- Use discover_ad_accounts para listar as contas disponíveis
- Passe account_id: "act_XXXXX" em cada chamada
- NUNCA invente IDs! Use discover_ad_accounts para obter IDs reais

LIMITAÇÕES DO /copies (deep_copy=true):
- Máx 3 objetos em chamada síncrona (erro 1885194 se exceder)
- Máx 51 objetos em chamada assíncrona (async batch)
- Campanhas na UE requerem dsa_payor e dsa_beneficiary configurados

DICA: Use search_documentation seguido de get_document_by_path nos documentos relevantes ou get_endpoint_reference para descobrir parâmetros disponíveis e como realizar a requisição.`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'ID da conta de anúncios para substituir {ad_account_id} no endpoint (opcional).' },
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'DELETE'],
          description: 'Método HTTP da requisição',
        },
        endpoint: {
          type: 'string',
          description: 'Endpoint da API (ex: "123456789/copies", "123456789/ads")',
        },
        params: {
          type: 'object',
          description:
            'Parâmetros da requisição. Para /copies: deep_copy (bool), status_option (PAUSED/ACTIVE/INHERITED_FROM_SOURCE)',
        },
      },
      required: ['method', 'endpoint'],
    },
  },

  // ==================== VÍDEO ====================
  {
    name: 'upload_video',
    description: `Upload video — upload a video to the ad account from a URL. Faz upload de um vídeo para a conta de anúncios via URL.

**QUANDO USAR:**
- Antes de criar criativos de vídeo
- O video_id retornado deve ser usado em video_data.video_id do object_story_spec

**RETORNA:** video_id para usar em create_creative

**EXEMPLO DE USO:**
1. upload_video(file_url: "https://exemplo.com/video.mp4")
2. get_video_status(video_id: "ID") - aguardar processamento
3. Usar video_id no create_creative com video_data`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        file_url: { type: 'string', description: 'URL do vídeo para upload' },
        title: { type: 'string', description: 'Título do vídeo' },
        description: { type: 'string', description: 'Descrição do vídeo' },
      },
      required: ['account_id', 'file_url'],
    },
  },
  {
    name: 'get_video_status',
    description: 'Get video status — check video processing status after upload. Verifica o status de processamento de um vídeo após upload.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        video_id: { type: 'string', description: 'ID do vídeo' },
      },
      required: ['video_id'],
    },
  },

  // ==================== VALUE RULES ====================
  {
    name: 'create_value_rule_set',
    description: 'Create value rule set — create conversion value rules (by age, gender, location). Cria um conjunto de regras de valor para otimizar conversões com valores diferenciados.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome do value rule set' },
        rules: { type: 'array', items: { type: 'object' }, description: 'Array de regras de valor. Cada regra: {name, adjust_sign: "INCREASE"|"DECREASE", adjust_value: 1-1000, criterias: [{criteria_type: "AGE"|"GENDER"|"LOCATION"|"OS_TYPE"|"DEVICE_PLATFORM"|"PLACEMENT", operator: "CONTAINS", criteria_values: [...], criteria_value_types: [...]}]}' },
      },
      required: ['account_id', 'name', 'rules'],
    },
  },
  {
    name: 'list_value_rule_sets',
    description: 'List value rule sets — get all value rule sets from an ad account. Lista todos os conjuntos de regras de valor da conta.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: { type: 'array', items: { type: 'string' }, description: 'Campos a retornar' },
      },
      required: ['account_id'],
    },
  },
  {
    name: 'get_value_rule_set',
    description: 'Get value rule set — retrieve details of a specific value rule set. Obtém detalhes de um conjunto de regras de valor específico.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        value_rule_set_id: { type: 'string', description: 'ID do value rule set' },
        fields: { type: 'array', items: { type: 'string' }, description: 'Campos a retornar' },
      },
      required: ['value_rule_set_id'],
    },
  },
  {
    name: 'update_value_rule_set',
    description: 'Update value rule set — modify an existing value rule set. Atualiza um conjunto de regras de valor existente.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        value_rule_set_id: { type: 'string', description: 'ID do value rule set' },
        name: { type: 'string', description: 'Novo nome' },
        rules: { type: 'array', items: { type: 'object' }, description: 'Novas regras' },
      },
      required: ['value_rule_set_id'],
    },
  },
  {
    name: 'delete_value_rule_set',
    description: 'Delete value rule set — remove a value rule set. Deleta um conjunto de regras de valor.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        value_rule_set_id: { type: 'string', description: 'ID do value rule set a deletar' },
      },
      required: ['value_rule_set_id'],
    },
  },

  // ==================== AD LABELS ====================
  {
    name: 'create_ad_label',
    description: 'Create ad label — create a label to organize campaigns, ad sets, and ads. Cria um label para organizar campanhas, ad sets e ads.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        name: { type: 'string', description: 'Nome do label' },
      },
      required: ['account_id', 'name'],
    },
  },
  {
    name: 'list_ad_labels',
    description: 'List ad labels — get all labels from an ad account. Lista todos os labels da conta de anúncios.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        account_id: { type: 'string', description: 'Ad account ID (e.g. act_123456789).' },
        fields: { type: 'array', items: { type: 'string' }, description: 'Campos a retornar' },
      },
      required: ['account_id'],
    },
  },

  // ==================== CREATIVE PREVIEW ====================
  {
    name: 'preview_creative',
    description: `Preview creative — generate an HTML preview of a creative in different ad formats. Gera um preview HTML de um criativo em diferentes formatos.

**Formatos disponíveis:**
- DESKTOP_FEED_STANDARD: Feed desktop
- MOBILE_FEED_STANDARD: Feed mobile
- INSTAGRAM_STANDARD: Feed Instagram
- INSTAGRAM_STORY: Story Instagram
- INSTAGRAM_REELS: Reels Instagram
- RIGHT_COLUMN_STANDARD: Coluna direita desktop`,
    inputSchema: {
      type: 'object' as const,
      properties: {
        creative_id: { type: 'string', description: 'ID do criativo' },
        ad_format: {
          type: 'string',
          enum: ['DESKTOP_FEED_STANDARD', 'MOBILE_FEED_STANDARD', 'MOBILE_FEED_BASIC', 'INSTAGRAM_STANDARD', 'INSTAGRAM_STORY', 'INSTAGRAM_REELS', 'RIGHT_COLUMN_STANDARD', 'MARKETPLACE_MOBILE', 'AUDIENCE_NETWORK_OUTSTREAM_VIDEO'],
          description: 'Formato do preview',
        },
      },
      required: ['creative_id', 'ad_format'],
    },
  },

  // ==================== BUDGET SCHEDULE ====================
  {
    name: 'create_budget_schedule',
    description: 'Create budget schedule — schedule a temporary budget increase for high-demand periods (HDP). Cria um agendamento de orçamento para períodos de alta demanda.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
        budget_value: { type: 'number', description: 'Valor do orçamento em centavos para o período' },
        budget_value_type: { type: 'string', enum: ['ABSOLUTE', 'MULTIPLIER'], description: 'Tipo do valor: ABSOLUTE (centavos) ou MULTIPLIER. Default: ABSOLUTE' },
        time_start: { type: 'string', description: 'Data/hora de início (ISO 8601)' },
        time_end: { type: 'string', description: 'Data/hora de fim (ISO 8601)' },
      },
      required: ['campaign_id', 'budget_value', 'time_start', 'time_end'],
    },
  },
  {
    name: 'get_budget_schedules',
    description: 'Get budget schedules — list all budget schedules for a campaign. Lista agendamentos de orçamento de uma campanha.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        campaign_id: { type: 'string', description: 'ID da campanha' },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'update_budget_schedule',
    description: '[DEPRECATED v24.0] Update budget schedule — modify budget schedule (deprecated, use delete + create instead). Atualiza um agendamento de orçamento.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        budget_schedule_id: { type: 'string', description: 'ID do budget schedule' },
        budget_value: { type: 'number', description: 'Novo valor do orçamento' },
        time_start: { type: 'string', description: 'Nova data/hora de início' },
        time_end: { type: 'string', description: 'Nova data/hora de fim' },
      },
      required: ['budget_schedule_id'],
    },
  },
  {
    name: 'delete_budget_schedule',
    description: 'Delete budget schedule — remove a budget schedule. Deleta um agendamento de orçamento.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        budget_schedule_id: { type: 'string', description: 'ID do budget schedule a deletar' },
      },
      required: ['budget_schedule_id'],
    },
  },

  // ==================== CONTEXTO ====================
  {
    name: 'get_skill',
    description: `Get skill guide — retrieve the Meta Ads traffic manager guide (SKILL.md). Retorna o conteúdo do SKILL.md - guia completo para atuar como gestor de tráfego Meta Ads.

Contém:
- Capacidades e tools disponíveis
- Fluxos de trabalho (criar campanha, auditoria, otimização)
- Guardrails de segurança
- Parâmetros obrigatórios (v24.0)
- CBO vs ABO
- Advantage+ Audience
- Exemplos de uso

Use esta tool no início da conversa para se configurar como gestor de tráfego.`,
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_playbook',
    description: `Get playbook — retrieve optimization rules and performance thresholds (PLAYBOOK.md). Retorna o conteúdo do PLAYBOOK.md - regras de otimização e thresholds específicos.

Contém:
- Thresholds de performance (CPA, ROAS, CTR, Hook Rate, Hold Rate)
- Regras de otimização por objetivo
- Valores específicos por localização
- Estratégia Andromeda (estrutura, criativos, CAPI)
- Fluxos de diagnóstico (Hot Ad Bias, Diversidade Criativa, CAPI/EMQ)
- Modelo híbrido ABO/CBO
- Critérios de pausa/ativação

Use esta tool quando precisar de regras específicas de otimização.`,
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_andromeda',
    description: `Get Andromeda guide — retrieve the Meta Andromeda machine learning system guide (ANDROMEDA.md). Retorna o conteúdo do ANDROMEDA.md - guia oficial sobre o Meta Andromeda para este MCP.

Contém:
- O que é Meta Andromeda e a mudança de paradigma
- Pilar 1: Diversidade Criativa (Framework P.D.A., Advantage+ Creative, Asset Feed Spec)
- Pilar 2: Targeting Amplo (Advantage+ Audience, exclusões estratégicas)
- Pilar 3: Dados e Sinais (CAPI, EMQ, deduplicação, Dataset Quality API)
- Pilar 4: Estrutura de Campanhas Consolidada (CBO, ABO, bid strategies, Advantage+)
- Pilar 5: Métricas e Atribuição (Hook/Hold Rate, MER, First Conversion)
- Problemas conhecidos (Hot Ad Bias, Similarity Detection, Performance Cliff)
- Checklist pré-flight Andromeda
- Roadmap de implementação com ações via MCP
- Referências cruzadas com documentação técnica da API (docs/)

Use esta tool quando o contexto envolver estratégia de campanhas no era Andromeda, diversidade criativa, broad targeting, CAPI, ou estrutura consolidada.`,
    inputSchema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
];

/**
 * Normaliza account_id para formato act_XXXXX
 */
function normalizeAccountId(accountId: string): string {
  return accountId.startsWith('act_') ? accountId : `act_${accountId}`;
}

/**
 * Verifica se a API está configurada antes de executar
 */
function requireApiConfig(): MetaClient {
  if (!isMetaConfigured()) {
    throw new Error(getConfigurationError());
  }
  return new MetaClient();
}

/**
 * Implementação das tools de API
 */
export async function handleApiTool(
  name: string,
  args: unknown
): Promise<{ content: Array<{ type: 'text'; text: string }>; isError?: boolean }> {
  try {
    // Tools que não requerem API configurada
    if (name === 'get_skill') {
      return await handleGetSkill();
    }
    if (name === 'get_playbook') {
      return await handleGetPlaybook();
    }
    if (name === 'get_andromeda') {
      return await handleGetAndromeda();
    }

    // ── Permission gate ──
    const authCtx = getAuthContext();
    if (authCtx?.permissions === 'read') {
      // For execute_api, check the HTTP method
      const method = (args as Record<string, unknown>)?.method as string | undefined;
      if (!checkPermission(name, 'read', method)) {
        return {
          content: [{ type: 'text', text: `Permission denied: "${name}" requires write access. Your API key has read-only permissions.` }],
          isError: true,
        };
      }
    }

    // Todas as outras tools requerem API configurada
    const client = requireApiConfig();

    switch (name) {
      // ==================== DESCOBERTA DE RECURSOS ====================
      case 'discover_ad_accounts': {
        const validation = validateArgs(apiSchemas.discover_ad_accounts, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleDiscoverAdAccounts(client, validation.data);
      }

      case 'list_facebook_pages': {
        const validation = validateArgs(apiSchemas.list_facebook_pages, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListFacebookPages(client, validation.data);
      }

      case 'get_instagram_account': {
        const validation = validateArgs(apiSchemas.get_instagram_account, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetInstagramAccount(client, validation.data);
      }

      // ==================== CAMPANHAS ====================
      case 'list_campaigns': {
        const validation = validateArgs(apiSchemas.list_campaigns, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListCampaigns(client, validation.data);
      }

      case 'get_campaign': {
        const validation = validateArgs(apiSchemas.get_campaign, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetCampaign(client, validation.data);
      }

      case 'create_campaign': {
        const validation = validateArgs(apiSchemas.create_campaign, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateCampaign(client, validation.data);
      }

      case 'update_campaign': {
        const validation = validateArgs(apiSchemas.update_campaign, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUpdateCampaign(client, validation.data);
      }

      case 'pause_campaign': {
        const validation = validateArgs(apiSchemas.pause_campaign, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handlePauseCampaign(client, validation.data);
      }

      case 'activate_campaign': {
        const validation = validateArgs(apiSchemas.activate_campaign, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleActivateCampaign(client, validation.data);
      }

      // ==================== AD SETS ====================
      case 'list_adsets': {
        const validation = validateArgs(apiSchemas.list_adsets, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListAdsets(client, validation.data);
      }

      case 'get_adset': {
        const validation = validateArgs(apiSchemas.get_adset, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAdset(client, validation.data);
      }

      case 'create_adset': {
        const validation = validateArgs(apiSchemas.create_adset, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateAdset(client, validation.data);
      }

      case 'update_adset': {
        const validation = validateArgs(apiSchemas.update_adset, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUpdateAdset(client, validation.data);
      }

      case 'pause_adset': {
        const validation = validateArgs(apiSchemas.pause_adset, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handlePauseAdset(client, validation.data);
      }

      case 'activate_adset': {
        const validation = validateArgs(apiSchemas.activate_adset, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleActivateAdset(client, validation.data);
      }

      // ==================== ADS ====================
      case 'list_ads': {
        const validation = validateArgs(apiSchemas.list_ads, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListAds(client, validation.data);
      }

      case 'list_campaign_ads': {
        const validation = validateArgs(apiSchemas.list_campaign_ads, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListCampaignAds(client, validation.data);
      }

      case 'get_ad': {
        const validation = validateArgs(apiSchemas.get_ad, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAd(client, validation.data);
      }

      case 'create_ad': {
        const validation = validateArgs(apiSchemas.create_ad, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateAd(client, validation.data);
      }

      case 'update_ad': {
        const validation = validateArgs(apiSchemas.update_ad, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUpdateAd(client, validation.data);
      }

      case 'pause_ad': {
        const validation = validateArgs(apiSchemas.pause_ad, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handlePauseAd(client, validation.data);
      }

      case 'activate_ad': {
        const validation = validateArgs(apiSchemas.activate_ad, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleActivateAd(client, validation.data);
      }

      // ==================== CRIATIVOS ====================
      case 'list_creatives': {
        const validation = validateArgs(apiSchemas.list_creatives, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListCreatives(client, validation.data);
      }

      case 'get_creative': {
        const validation = validateArgs(apiSchemas.get_creative, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetCreative(client, validation.data);
      }

      case 'create_creative': {
        const validation = validateArgs(apiSchemas.create_creative, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateCreative(client, validation.data);
      }

      // ==================== INSIGHTS ====================
      case 'get_account_insights': {
        const validation = validateArgs(apiSchemas.get_account_insights, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAccountInsights(client, validation.data);
      }

      case 'get_campaign_insights': {
        const validation = validateArgs(apiSchemas.get_campaign_insights, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetCampaignInsights(client, validation.data);
      }

      case 'get_adset_insights': {
        const validation = validateArgs(apiSchemas.get_adset_insights, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAdsetInsights(client, validation.data);
      }

      case 'get_ad_insights': {
        const validation = validateArgs(apiSchemas.get_ad_insights, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAdInsights(client, validation.data);
      }

      case 'get_attribution_comparison': {
        const validation = validateArgs(apiSchemas.get_attribution_comparison, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetAttributionComparison(client, validation.data);
      }

      case 'get_performance_summary': {
        const validation = validateArgs(apiSchemas.get_performance_summary, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetPerformanceSummary(client, validation.data);
      }

      case 'list_campaign_ads_with_insights': {
        const validation = validateArgs(apiSchemas.list_campaign_ads_with_insights, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListCampaignAdsWithInsights(client, validation.data);
      }

      // ==================== AUDIÊNCIAS ====================
      case 'list_custom_audiences': {
        const validation = validateArgs(apiSchemas.list_custom_audiences, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListCustomAudiences(client, validation.data);
      }

      case 'create_custom_audience': {
        const validation = validateArgs(apiSchemas.create_custom_audience, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateCustomAudience(client, validation.data);
      }

      case 'get_reach_estimate': {
        const validation = validateArgs(apiSchemas.get_reach_estimate, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetReachEstimate(client, validation.data);
      }

      // ==================== PIXELS ====================
      case 'list_pixels': {
        const validation = validateArgs(apiSchemas.list_pixels, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListPixels(client, validation.data);
      }

      // ==================== UPLOAD DE IMAGEM ====================
      case 'upload_image': {
        const validation = validateArgs(apiSchemas.upload_image, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUploadImage(client, validation.data);
      }

      // ==================== DATASET QUALITY (EMQ) ====================
      case 'get_dataset_quality': {
        const validation = validateArgs(apiSchemas.get_dataset_quality, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetDatasetQuality(client, validation.data);
      }

      // ==================== GEOLOCALIZAÇÃO ====================
      case 'search_geolocation': {
        const validation = validateArgs(apiSchemas.search_geolocation, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleSearchGeolocation(client, validation.data);
      }

      // ==================== API CUSTOMIZADA ====================
      case 'execute_api': {
        const validation = validateArgs(apiSchemas.execute_api, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleExecuteApi(client, validation.data);
      }

      // ==================== VIDEO ====================
      case 'upload_video': {
        const validation = validateArgs(apiSchemas.upload_video, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUploadVideo(client, validation.data);
      }

      case 'get_video_status': {
        const validation = validateArgs(apiSchemas.get_video_status, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetVideoStatus(client, validation.data);
      }

      // ==================== VALUE RULES ====================
      case 'create_value_rule_set': {
        const validation = validateArgs(apiSchemas.create_value_rule_set, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateValueRuleSet(client, validation.data);
      }

      case 'list_value_rule_sets': {
        const validation = validateArgs(apiSchemas.list_value_rule_sets, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListValueRuleSets(client, validation.data);
      }

      case 'get_value_rule_set': {
        const validation = validateArgs(apiSchemas.get_value_rule_set, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetValueRuleSet(client, validation.data);
      }

      case 'update_value_rule_set': {
        const validation = validateArgs(apiSchemas.update_value_rule_set, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUpdateValueRuleSet(client, validation.data);
      }

      case 'delete_value_rule_set': {
        const validation = validateArgs(apiSchemas.delete_value_rule_set, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleDeleteValueRuleSet(client, validation.data);
      }

      // ==================== AD LABELS ====================
      case 'create_ad_label': {
        const validation = validateArgs(apiSchemas.create_ad_label, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateAdLabel(client, validation.data);
      }

      case 'list_ad_labels': {
        const validation = validateArgs(apiSchemas.list_ad_labels, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleListAdLabels(client, validation.data);
      }

      // ==================== CREATIVE PREVIEW ====================
      case 'preview_creative': {
        const validation = validateArgs(apiSchemas.preview_creative, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handlePreviewCreative(client, validation.data);
      }

      // ==================== BUDGET SCHEDULE ====================
      case 'create_budget_schedule': {
        const validation = validateArgs(apiSchemas.create_budget_schedule, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleCreateBudgetSchedule(client, validation.data);
      }

      case 'get_budget_schedules': {
        const validation = validateArgs(apiSchemas.get_budget_schedules, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleGetBudgetSchedules(client, validation.data);
      }

      case 'update_budget_schedule': {
        const validation = validateArgs(apiSchemas.update_budget_schedule, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleUpdateBudgetSchedule(client, validation.data);
      }

      case 'delete_budget_schedule': {
        const validation = validateArgs(apiSchemas.delete_budget_schedule, args);
        if (!validation.success) return formatValidationError(validation.error);
        return await handleDeleteBudgetSchedule(client, validation.data);
      }

      default:
        return {
          content: [{ type: 'text', text: `Tool desconhecida: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    // Captura detalhada de qualquer tipo de erro
    let errorDetails: string;

    if (error instanceof MetaClientError) {
      // Erro estruturado da API Meta
      errorDetails = `# Erro da API Meta

**Código:** ${error.code}
**Tipo:** ${error.type}
**Mensagem:** ${error.message}
${error.errorSubcode ? `**Subcódigo:** ${error.errorSubcode}` : ''}
${error.errorUserTitle ? `\n**${error.errorUserTitle}**` : ''}
${error.errorUserMsg ? `${error.errorUserMsg}` : ''}
${error.errorData ? `**Dados:** ${error.errorData}` : ''}
${error.fbtraceId ? `\n**FB Trace ID:** ${error.fbtraceId}` : ''}

Consulte a documentação de erros com \`get_error_code_info\` para mais detalhes.`;
    } else if (error instanceof Error) {
      // Erro genérico (rede, timeout, etc.)
      errorDetails = `# Erro

**Tipo:** ${error.name}
**Mensagem:** ${error.message}
${error.stack ? `\n**Stack:**\n\`\`\`\n${error.stack}\n\`\`\`` : ''}`;
    } else {
      // Erro desconhecido
      errorDetails = `# Erro Desconhecido

\`\`\`json
${JSON.stringify(error, null, 2)}
\`\`\``;
    }

    return {
      content: [
        {
          type: 'text',
          text: errorDetails,
        },
      ],
      isError: true,
    };
  }
}

// ==================== DISCOVERY HANDLERS ====================

async function handleDiscoverAdAccounts(
  client: MetaClient,
  args: DiscoverAdAccountsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.discoverAdAccounts(args.fields);
  
  const accountsText = result.data.length > 0
    ? result.data.map(acc => {
        const statusMap: Record<number, string> = {
          1: 'ACTIVE',
          2: 'DISABLED',
          3: 'UNSETTLED',
          7: 'PENDING_RISK_REVIEW',
          8: 'PENDING_SETTLEMENT',
          9: 'IN_GRACE_PERIOD',
          100: 'PENDING_CLOSURE',
          101: 'CLOSED',
          201: 'ANY_ACTIVE',
          202: 'ANY_CLOSED',
        };
        const status = statusMap[acc.account_status] || `UNKNOWN (${acc.account_status})`;
        return `### ${acc.name}
- **ID:** ${acc.id}
- **Status:** ${status}
${acc.currency ? `- **Moeda:** ${acc.currency}` : ''}
${acc.timezone_name ? `- **Timezone:** ${acc.timezone_name}` : ''}`;
      }).join('\n\n')
    : 'Nenhuma conta de anúncios encontrada.';

  return {
    content: [
      {
        type: 'text',
        text: `# Contas de Anúncios Disponíveis\n\nEncontradas ${result.data.length} conta(s):\n\n${accountsText}\n\n---\n\n**Passe o \`account_id\` desejado em cada chamada de tool.** Ex: \`account_id: "act_123456789"\``,
      },
    ],
  };
}

async function handleListFacebookPages(
  client: MetaClient,
  args: ListFacebookPagesArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.listFacebookPages(args.fields);
  
  const pagesText = result.data.length > 0
    ? result.data.map(page => `### ${page.name}
- **ID:** ${page.id}
${page.category ? `- **Categoria:** ${page.category}` : ''}
${page.access_token ? `- **Access Token:** (disponível)` : ''}`
      ).join('\n\n')
    : 'Nenhuma página encontrada.';

  return {
    content: [
      {
        type: 'text',
        text: `# Páginas do Facebook\n\nEncontradas ${result.data.length} página(s):\n\n${pagesText}\n\n**Dica:** Use o ID da página para criar criativos ou obter a conta do Instagram vinculada.`,
      },
    ],
  };
}

async function handleGetInstagramAccount(
  client: MetaClient,
  args: GetInstagramAccountArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getInstagramAccount(args.page_id, args.fields);
  
  const igBusinessId = result.instagram_business_account?.id;
  const igConnectedId = result.connected_instagram_account?.id;
  const igId = igBusinessId || igConnectedId;
  
  let text: string;
  if (igId) {
    text = `# Conta do Instagram

**Page ID:** ${result.id}
**Instagram ID:** ${igId}
${igBusinessId ? `- Tipo: Business Account` : ''}
${igConnectedId && !igBusinessId ? `- Tipo: Connected Account` : ''}

**Como usar:**
Ao criar um criativo, use este ID no campo \`instagram_user_id\` dentro de \`object_story_spec\`:

\`\`\`json
{
  "object_story_spec": {
    "page_id": "${result.id}",
    "instagram_user_id": "${igId}",
    "link_data": { ... }
  }
}
\`\`\`

**Importante:** NÃO use o ID que aparece na UI do Meta Ads (formato antigo, depreciado na v22.0+).`;
  } else {
    text = `# Conta do Instagram

**Page ID:** ${result.id}

⚠️ Nenhuma conta do Instagram vinculada a esta página.

Para vincular uma conta do Instagram:
1. Acesse as configurações da página no Facebook
2. Vá em "Contas vinculadas" > "Instagram"
3. Conecte a conta do Instagram Business`;
  }

  return {
    content: [{ type: 'text', text }],
  };
}

// ==================== CAMPAIGN HANDLERS ====================

async function handleListCampaigns(
  client: MetaClient,
  args: ListCampaignsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listCampaigns(accountId, args.fields, args.effective_status);

  const filterNote = args.effective_status 
    ? `\n**Filtro:** ${args.effective_status.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Campanhas${filterNote}\nEncontradas ${result.data.length} campanha(s):\n\n${formatCampaigns(result.data)}`,
      },
    ],
  };
}

async function handleGetCampaign(
  client: MetaClient,
  args: GetCampaignArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const campaign = await client.getCampaign(args.campaign_id, args.fields);
  
  // Determinar se é CBO baseado na presença de orçamento na campanha
  const isCBO = !!(campaign.daily_budget || campaign.lifetime_budget);
  const budgetType = isCBO ? 'CBO (Campaign Budget Optimization)' : 'ABO (Ad Set Budget Optimization)';
  
  let budgetInfo = '';
  if (campaign.daily_budget) {
    budgetInfo = `\n**Orçamento Diário:** R$ ${(parseInt(campaign.daily_budget) / 100).toFixed(2)}`;
  }
  if (campaign.lifetime_budget) {
    budgetInfo += `\n**Orçamento Vitalício:** R$ ${(parseInt(campaign.lifetime_budget) / 100).toFixed(2)}`;
  }
  if (campaign.budget_remaining) {
    budgetInfo += `\n**Orçamento Restante:** R$ ${(parseFloat(campaign.budget_remaining as string) / 100).toFixed(2)}`;
  }

  return {
    content: [
      {
        type: 'text',
        text: `# Campanha: ${campaign.name}

**ID:** ${campaign.id}
**Status:** ${campaign.status}
**Objetivo:** ${campaign.objective || 'N/A'}
**Tipo de Orçamento:** ${budgetType}${budgetInfo}
${campaign.created_time ? `**Criada em:** ${campaign.created_time}` : ''}
${campaign.updated_time ? `**Atualizada em:** ${campaign.updated_time}` : ''}

---

**Dados completos:**
${formatObject(campaign)}`,
      },
    ],
  };
}

async function handleCreateCampaign(
  client: MetaClient,
  args: CreateCampaignArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // Validação: daily_budget e lifetime_budget são mutuamente exclusivos
  if (args.daily_budget && args.lifetime_budget) {
    return {
      content: [{
        type: 'text',
        text: `# Erro de Validação\n\n**daily_budget** e **lifetime_budget** são mutuamente exclusivos. Use apenas um deles.\n\n- daily_budget: orçamento por dia (CBO)\n- lifetime_budget: orçamento total no período (requer start_time e stop_time)`,
      }],
    };
  }

  const accountId = normalizeAccountId(args.account_id);

  // Sempre incluir is_adset_budget_sharing_enabled para evitar erro 4834011
  const is_adset_budget_sharing_enabled = args.is_adset_budget_sharing_enabled ?? false;

  // G-04: Default inteligente para bid_strategy em campanhas CBO
  const hasBudget = args.daily_budget || args.lifetime_budget;
  const bid_strategy = args.bid_strategy ?? (hasBudget ? 'LOWEST_COST_WITHOUT_CAP' : undefined);

  const result = await client.createCampaign(accountId, {
    name: args.name,
    objective: args.objective,
    status: args.status,
    daily_budget: args.daily_budget,
    lifetime_budget: args.lifetime_budget,
    spend_cap: args.spend_cap,
    buying_type: args.buying_type,
    bid_strategy,
    special_ad_categories: args.special_ad_categories,
    is_adset_budget_sharing_enabled,
    start_time: args.start_time,
    stop_time: args.stop_time,
    is_skadnetwork_attribution: args.is_skadnetwork_attribution,
    promoted_object: args.promoted_object,
  });

  let successMessage = `# Campanha Criada\n\n**ID:** ${result.id}\n**Nome:** ${args.name}\n**Objetivo:** ${args.objective}\n**Status:** ${args.status}\n**Budget Sharing:** ${is_adset_budget_sharing_enabled}`;
  if (bid_strategy) {
    successMessage += `\n**Bid Strategy:** ${bid_strategy}`;
  }
  if (args.daily_budget) {
    successMessage += `\n**Daily Budget:** R$ ${(args.daily_budget / 100).toFixed(2)}`;
  }
  if (args.lifetime_budget) {
    successMessage += `\n**Lifetime Budget:** R$ ${(args.lifetime_budget / 100).toFixed(2)}`;
  }
  if (args.spend_cap) {
    successMessage += `\n**Spend Cap:** R$ ${(args.spend_cap / 100).toFixed(2)}`;
  }
  if (args.buying_type) {
    successMessage += `\n**Buying Type:** ${args.buying_type}`;
  }
  if (args.start_time || args.stop_time) {
    successMessage += `\n**Agendamento:** ${args.start_time || 'imediato'} até ${args.stop_time || 'indefinido'}`;
  }

  return {
    content: [
      {
        type: 'text',
        text: successMessage,
      },
    ],
  };
}

async function handleUpdateCampaign(
  client: MetaClient,
  args: UpdateCampaignArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const { campaign_id, ...updateParams } = args;
  await client.updateCampaign(campaign_id, updateParams);
  return {
    content: [
      {
        type: 'text',
        text: `# Campanha Atualizada\n\n**ID:** ${campaign_id}\n\nAlterações aplicadas com sucesso.`,
      },
    ],
  };
}

async function handlePauseCampaign(
  client: MetaClient,
  args: PauseCampaignArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateCampaign(args.campaign_id, { status: 'PAUSED' });
  return {
    content: [
      {
        type: 'text',
        text: `# Campanha Pausada\n\n**ID:** ${args.campaign_id}\n\nA campanha foi pausada com sucesso.`,
      },
    ],
  };
}

async function handleActivateCampaign(
  client: MetaClient,
  args: ActivateCampaignArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateCampaign(args.campaign_id, { status: 'ACTIVE' });
  return {
    content: [
      {
        type: 'text',
        text: `# Campanha Ativada\n\n**ID:** ${args.campaign_id}\n\nA campanha foi ativada com sucesso.`,
      },
    ],
  };
}

// ==================== ADSET HANDLERS ====================

async function handleListAdsets(
  client: MetaClient,
  args: ListAdsetsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listAdSets(accountId, args.fields, args.effective_status);

  const filterNote = args.effective_status 
    ? `\n**Filtro:** ${args.effective_status.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Conjuntos de Anúncios${filterNote}\nEncontrados ${result.data.length} ad set(s):\n\n${formatAdSets(result.data)}`,
      },
    ],
  };
}

async function handleGetAdset(
  client: MetaClient,
  args: GetAdsetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const adset = await client.getAdSet(args.adset_id, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Ad Set: ${adset.name}\n\n${formatObject(adset)}`,
      },
    ],
  };
}

async function handleCreateAdset(
  client: MetaClient,
  args: CreateAdsetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // Sempre incluir bid_strategy para evitar erro 2490487
  const bid_strategy = args.bid_strategy ?? 'LOWEST_COST_WITHOUT_CAP';
  
  // Validar orçamento mínimo (533 centavos no Brasil)
  if (args.daily_budget && args.daily_budget < 533) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro de Validação\n\n**Orçamento muito baixo:** R$ ${(args.daily_budget / 100).toFixed(2)}\n\nO orçamento mínimo no Brasil é R$ 5,33 (533 centavos). Use pelo menos 600 centavos para garantir.`,
        },
      ],
    };
  }
  
  // Preparar targeting com targeting_automation (obrigatório na v24.0)
  const advantageAudience = args.advantage_audience ?? 1; // Default: ativado
  const targeting = args.targeting as Record<string, unknown>;
  
  // Injetar targeting_automation.advantage_audience se não existir
  if (!targeting.targeting_automation) {
    targeting.targeting_automation = { advantage_audience: advantageAudience };
  } else if (typeof targeting.targeting_automation === 'object') {
    const targetingAutomation = targeting.targeting_automation as Record<string, unknown>;
    if (targetingAutomation.advantage_audience === undefined) {
      targetingAutomation.advantage_audience = advantageAudience;
    }
  }
  
  // Coletar avisos para incluir na resposta
  const warnings: string[] = [];
  
  // Validação de aviso: age_max < 65 ou age_min > 18 com Advantage+ ativado
  // NOTA: A API Meta REJEITA essas combinações com erro 1870189
  if (advantageAudience === 1) {
    const ageMax = targeting.age_max as number | undefined;
    const ageMin = targeting.age_min as number | undefined;
    
    if (ageMax !== undefined && ageMax < 65) {
      warnings.push(`⚠️ **ERRO PREVISTO:** Com Advantage+ ativado (advantage_audience=1), age_max=${ageMax} será REJEITADO pela API (erro 1870189). Use age_max=65 ou defina advantage_audience=0 para controle rígido de idade.`);
    }
    if (ageMin !== undefined && ageMin > 18) {
      warnings.push(`⚠️ **ERRO PREVISTO:** Com Advantage+ ativado, age_min=${ageMin} será REJEITADO pela API (erro 1870189). Use age_min=18 ou defina advantage_audience=0 para controle rígido de idade.`);
    }
  }
  
  // Validação: daily_budget e lifetime_budget são mutuamente exclusivos
  if (args.daily_budget && args.lifetime_budget) {
    return {
      content: [{
        type: 'text',
        text: `# Erro de Validação\n\n**daily_budget** e **lifetime_budget** são mutuamente exclusivos. Use apenas um deles.`,
      }],
    };
  }

  // Validação: adset_schedule requer lifetime_budget
  if (args.adset_schedule && !args.lifetime_budget) {
    return {
      content: [{
        type: 'text',
        text: `# Erro de Validação\n\n**adset_schedule** (dayparting) requer **lifetime_budget**. Não é possível usar dayparting com daily_budget.`,
      }],
    };
  }

  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createAdSet(accountId, {
    name: args.name,
    campaign_id: args.campaign_id,
    billing_event: args.billing_event,
    optimization_goal: args.optimization_goal,
    targeting,
    daily_budget: args.daily_budget,
    lifetime_budget: args.lifetime_budget,
    status: args.status,
    bid_strategy,
    bid_amount: args.bid_amount,
    bid_constraints: args.bid_constraints,
    promoted_object: args.promoted_object,
    start_time: args.start_time,
    end_time: args.end_time,
    attribution_spec: args.attribution_spec,
    is_incremental_attribution_enabled: args.is_incremental_attribution_enabled,
    excluded_custom_audiences: args.excluded_custom_audiences,
    destination_type: args.destination_type,
    is_dynamic_creative: args.is_dynamic_creative,
    adset_schedule: args.adset_schedule,
    pacing_type: args.pacing_type,
    frequency_control_specs: args.frequency_control_specs,
    daily_min_spend_target: args.daily_min_spend_target,
    daily_spend_cap: args.daily_spend_cap,
    value_rule_set_id: args.value_rule_set_id,
    value_rules_applied: args.value_rules_applied,
    dsa_beneficiary: args.dsa_beneficiary,
    dsa_payor: args.dsa_payor,
    adlabels: args.adlabels,
  });
  
  let successMessage = `# Ad Set Criado\n\n**ID:** ${result.id}\n**Nome:** ${args.name}\n**Bid Strategy:** ${bid_strategy}\n**Advantage+ Audience:** ${advantageAudience === 1 ? 'Ativado' : 'Desativado'}`;
  
  if (args.is_incremental_attribution_enabled !== undefined) {
    successMessage += `\n**Atribuição Incremental:** ${args.is_incremental_attribution_enabled ? 'Ativada' : 'Desativada'}`;
  }
  
  if (args.excluded_custom_audiences && args.excluded_custom_audiences.length > 0) {
    successMessage += `\n**Audiências Excluídas:** ${args.excluded_custom_audiences.length} audiência(s)`;
  }
  
  if (args.promoted_object) {
    successMessage += `\n**Promoted Object:** ${JSON.stringify(args.promoted_object)}`;
  }
  
  if (args.start_time || args.end_time) {
    successMessage += `\n**Agendamento:** ${args.start_time || 'imediato'} até ${args.end_time || 'indefinido'}`;
  }
  
  if (args.attribution_spec) {
    successMessage += `\n**Attribution Spec:** ${JSON.stringify(args.attribution_spec)}`;
  }

  if (args.lifetime_budget) {
    successMessage += `\n**Lifetime Budget:** R$ ${(args.lifetime_budget / 100).toFixed(2)}`;
  }

  if (args.destination_type) {
    successMessage += `\n**Destination Type:** ${args.destination_type}`;
  }

  if (args.is_dynamic_creative) {
    successMessage += `\n**Dynamic Creative:** Ativado`;
  }

  if (args.adset_schedule) {
    successMessage += `\n**Dayparting:** ${args.adset_schedule.length} período(s) configurado(s)`;
  }

  if (args.frequency_control_specs) {
    successMessage += `\n**Frequency Control:** ${JSON.stringify(args.frequency_control_specs)}`;
  }

  if (warnings.length > 0) {
    successMessage += `\n\n---\n\n${warnings.join('\n\n')}`;
  }

  return {
    content: [
      {
        type: 'text',
        text: successMessage,
      },
    ],
  };
}

async function handleUpdateAdset(
  client: MetaClient,
  args: UpdateAdsetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const { adset_id, ...updateParams } = args;
  await client.updateAdSet(adset_id, updateParams);
  return {
    content: [
      {
        type: 'text',
        text: `# Ad Set Atualizado\n\n**ID:** ${adset_id}\n\nAlterações aplicadas com sucesso.`,
      },
    ],
  };
}

async function handlePauseAdset(
  client: MetaClient,
  args: PauseAdsetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateAdSet(args.adset_id, { status: 'PAUSED' });
  return {
    content: [
      {
        type: 'text',
        text: `# Ad Set Pausado\n\n**ID:** ${args.adset_id}\n\nO ad set foi pausado com sucesso.`,
      },
    ],
  };
}

async function handleActivateAdset(
  client: MetaClient,
  args: ActivateAdsetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateAdSet(args.adset_id, { status: 'ACTIVE' });
  return {
    content: [
      {
        type: 'text',
        text: `# Ad Set Ativado\n\n**ID:** ${args.adset_id}\n\nO ad set foi ativado com sucesso.`,
      },
    ],
  };
}

// ==================== AD HANDLERS ====================

async function handleListAds(
  client: MetaClient,
  args: ListAdsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listAds(accountId, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncios\n\nEncontrados ${result.data.length} anúncio(s):\n\n${formatAds(result.data)}`,
      },
    ],
  };
}

async function handleListCampaignAds(
  client: MetaClient,
  args: ListCampaignAdsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.listCampaignAds(args.campaign_id, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncios da Campanha ${args.campaign_id}\n\nEncontrados ${result.data.length} anúncio(s):\n\n${formatAds(result.data)}`,
      },
    ],
  };
}

async function handleGetAd(
  client: MetaClient,
  args: GetAdArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const ad = await client.getAd(args.ad_id, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncio: ${ad.name}\n\n${formatObject(ad)}`,
      },
    ],
  };
}

async function handleCreateAd(
  client: MetaClient,
  args: CreateAdArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createAd(accountId, {
    name: args.name,
    adset_id: args.adset_id,
    creative: { creative_id: args.creative_id },
    status: args.status,
    tracking_specs: args.tracking_specs,
    ad_schedule_start_time: args.ad_schedule_start_time,
    ad_schedule_end_time: args.ad_schedule_end_time,
    conversion_domain: args.conversion_domain,
    adlabels: args.adlabels,
  });

  let successMessage = `# Anúncio Criado\n\n**ID:** ${result.id}\n**Nome:** ${args.name}`;
  if (args.conversion_domain) {
    successMessage += `\n**Conversion Domain:** ${args.conversion_domain}`;
  }
  if (args.ad_schedule_start_time || args.ad_schedule_end_time) {
    successMessage += `\n**Agendamento:** ${args.ad_schedule_start_time || 'imediato'} até ${args.ad_schedule_end_time || 'indefinido'}`;
  }
  if (args.tracking_specs) {
    successMessage += `\n**Tracking Specs:** ${args.tracking_specs.length} spec(s) configurado(s)`;
  }
  if (args.adlabels) {
    successMessage += `\n**Labels:** ${args.adlabels.length} label(s)`;
  }

  return {
    content: [
      {
        type: 'text',
        text: successMessage,
      },
    ],
  };
}

async function handleUpdateAd(
  client: MetaClient,
  args: UpdateAdArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const { ad_id, ...updateParams } = args;
  await client.updateAd(ad_id, updateParams);
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncio Atualizado\n\n**ID:** ${ad_id}\n\nAlterações aplicadas com sucesso.`,
      },
    ],
  };
}

async function handlePauseAd(
  client: MetaClient,
  args: PauseAdArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateAd(args.ad_id, { status: 'PAUSED' });
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncio Pausado\n\n**ID:** ${args.ad_id}\n\nO anúncio foi pausado com sucesso.`,
      },
    ],
  };
}

async function handleActivateAd(
  client: MetaClient,
  args: ActivateAdArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateAd(args.ad_id, { status: 'ACTIVE' });
  return {
    content: [
      {
        type: 'text',
        text: `# Anúncio Ativado\n\n**ID:** ${args.ad_id}\n\nO anúncio foi ativado com sucesso.`,
      },
    ],
  };
}

// ==================== CREATIVE HANDLERS ====================

async function handleListCreatives(
  client: MetaClient,
  args: ListCreativesArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listCreatives(accountId, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Criativos\n\nEncontrados ${result.data.length} criativo(s):\n\n${formatCreatives(result.data)}`,
      },
    ],
  };
}

async function handleGetCreative(
  client: MetaClient,
  args: GetCreativeArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const creative = await client.getCreative(args.creative_id, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Criativo: ${creative.name}\n\n${formatObject(creative)}`,
      },
    ],
  };
}

async function handleCreateCreative(
  client: MetaClient,
  args: CreateCreativeArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // Validação: precisa de object_story_spec OU object_story_id
  if (!args.object_story_spec && !args.object_story_id) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro de Validação

É obrigatório fornecer \`object_story_spec\` ou \`object_story_id\`.

**object_story_spec** — criar novo criativo:
\`\`\`json
{
  "page_id": "ID_DA_PAGINA",
  "link_data": { "link": "https://seu-site.com", "message": "Texto" }
}
\`\`\`

**object_story_id** — promover post existente:
\`\`\`
"PAGE_ID_POST_ID"
\`\`\`

**Dica:** Use \`list_facebook_pages\` para obter o page_id.`,
        },
      ],
    };
  }

  // Se usar object_story_spec, validar page_id
  if (args.object_story_spec) {
    const spec = args.object_story_spec as { page_id?: string };
    if (!spec.page_id) {
      return {
        content: [
          {
            type: 'text',
            text: `# Erro de Validação\n\nO campo \`page_id\` é obrigatório no \`object_story_spec\`.\n\n**Dica:** Use \`list_facebook_pages\` para obter o ID da sua página.`,
          },
        ],
      };
    }
  }

  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createCreative(accountId, {
    name: args.name,
    object_story_spec: args.object_story_spec,
    object_story_id: args.object_story_id,
    creative_features_spec: args.creative_features_spec,
    asset_feed_spec: args.asset_feed_spec,
    image_hash: args.image_hash,
    image_url: args.image_url,
    url_tags: args.url_tags,
    platform_customizations: args.platform_customizations,
  });

  let successMessage = `# Criativo Criado\n\n**ID:** ${result.id}\n**Nome:** ${args.name}`;

  if (args.object_story_id) {
    successMessage += `\n**Post Existente:** ${args.object_story_id}`;
  }

  if (args.object_story_spec) {
    const spec = args.object_story_spec as { page_id?: string; instagram_user_id?: string };
    if (spec.page_id) successMessage += `\n**Page ID:** ${spec.page_id}`;
    if (spec.instagram_user_id) successMessage += `\n**Instagram ID:** ${spec.instagram_user_id}`;
  }

  if (args.creative_features_spec) {
    const features = Object.keys(args.creative_features_spec);
    successMessage += `\n**Advantage+ Creative:** ${features.length} feature(s) configurada(s) (${features.join(', ')})`;
  }

  if (args.url_tags) {
    successMessage += `\n**URL Tags:** ${args.url_tags}`;
  }

  if (args.platform_customizations) {
    successMessage += `\n**Platform Customizations:** Configurado`;
  }

  successMessage += `\n\n**Próximo passo:** Use este creative_id ao criar um anúncio com \`create_ad\`.`;

  return {
    content: [{ type: 'text', text: successMessage }],
  };
}

// ==================== INSIGHTS HANDLERS ====================

async function handleGetAccountInsights(
  client: MetaClient,
  args: GetAccountInsightsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.getAccountInsights(accountId, {
    date_preset: args.date_preset,
    time_range: args.time_range,
    fields: args.fields,
    action_attribution_windows: args.action_attribution_windows,
    use_unified_attribution_setting: args.use_unified_attribution_setting,
  });
  
  const hasAttribution = args.action_attribution_windows && args.action_attribution_windows.length > 0;
  const attributionNote = hasAttribution 
    ? `\n\n**Janelas de Atribuição:** ${args.action_attribution_windows?.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Insights da Conta${attributionNote}\n\n${formatInsights(result.data, hasAttribution)}`,
      },
    ],
  };
}

async function handleGetCampaignInsights(
  client: MetaClient,
  args: GetCampaignInsightsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getInsights(args.campaign_id, {
    date_preset: args.date_preset,
    time_range: args.time_range,
    fields: args.fields,
    action_attribution_windows: args.action_attribution_windows,
    use_unified_attribution_setting: args.use_unified_attribution_setting,
  });
  
  const hasAttribution = args.action_attribution_windows && args.action_attribution_windows.length > 0;
  const attributionNote = hasAttribution 
    ? `\n\n**Janelas de Atribuição:** ${args.action_attribution_windows?.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Insights da Campanha ${args.campaign_id}${attributionNote}\n\n${formatInsights(result.data, hasAttribution)}`,
      },
    ],
  };
}

async function handleGetAdsetInsights(
  client: MetaClient,
  args: GetAdsetInsightsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getInsights(args.adset_id, {
    date_preset: args.date_preset,
    time_range: args.time_range,
    fields: args.fields,
    action_attribution_windows: args.action_attribution_windows,
    use_unified_attribution_setting: args.use_unified_attribution_setting,
  });
  
  const hasAttribution = args.action_attribution_windows && args.action_attribution_windows.length > 0;
  const attributionNote = hasAttribution 
    ? `\n\n**Janelas de Atribuição:** ${args.action_attribution_windows?.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Insights do Ad Set ${args.adset_id}${attributionNote}\n\n${formatInsights(result.data, hasAttribution)}`,
      },
    ],
  };
}

async function handleGetAdInsights(
  client: MetaClient,
  args: GetAdInsightsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getInsights(args.ad_id, {
    date_preset: args.date_preset,
    time_range: args.time_range,
    fields: args.fields,
    action_attribution_windows: args.action_attribution_windows,
    use_unified_attribution_setting: args.use_unified_attribution_setting,
  });
  
  const hasAttribution = args.action_attribution_windows && args.action_attribution_windows.length > 0;
  const attributionNote = hasAttribution 
    ? `\n\n**Janelas de Atribuição:** ${args.action_attribution_windows?.join(', ')}\n` 
    : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `# Insights do Anúncio ${args.ad_id}${attributionNote}\n\n${formatInsights(result.data, hasAttribution)}`,
      },
    ],
  };
}

async function handleGetAttributionComparison(
  client: MetaClient,
  args: GetAttributionComparisonArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // Janelas para comparação completa
  const attributionWindows = [
    '1d_click',
    '7d_click', 
    '1d_view',
    '7d_view',
    'incrementality',
  ];
  
  const actionsToTrack = args.actions || ['purchase', 'lead', 'initiate_checkout'];
  
  // Buscar insights com todas as janelas de atribuição
  const result = await client.getInsights(args.object_id, {
    date_preset: args.date_preset || 'last_30d',
    time_range: args.time_range,
    fields: ['spend', 'actions', 'cost_per_action_type'],
    action_attribution_windows: attributionWindows,
    use_unified_attribution_setting: false, // Permite override
  });
  
  if (!result.data || result.data.length === 0) {
    return {
      content: [{
        type: 'text',
        text: `Nenhum dado de insights disponível para ${args.object_type} ${args.object_id}.`,
      }],
    };
  }
  
  const data = result.data[0];
  const spend = parseFloat(data.spend as string || '0');
  const actions = (data.actions as Array<Record<string, unknown>>) || [];
  const costs = (data.cost_per_action_type as Array<Record<string, unknown>>) || [];
  
  const lines: string[] = [
    `# Comparação de Atribuição - ${args.object_type.toUpperCase()} ${args.object_id}`,
    '',
    `**Período:** ${data.date_start || args.date_preset || 'last_30d'} a ${data.date_stop || 'hoje'}`,
    `**Gasto Total:** R$ ${spend.toFixed(2)}`,
    '',
    '## Análise por Tipo de Conversão',
    '',
  ];
  
  for (const actionType of actionsToTrack) {
    const action = actions.find(a => a.action_type === actionType);
    const costData = costs.find(c => c.action_type === actionType);
    
    if (action) {
      const allConversions = parseFloat(action.value as string || '0');
      const click1d = parseFloat(action['1d_click'] as string || '0');
      const click7d = parseFloat(action['7d_click'] as string || '0');
      const view1d = parseFloat(action['1d_view'] as string || '0');
      const incremental = parseFloat(action['incrementality'] as string || '0');
      
      // Calcular CPAs
      const cpaAll = allConversions > 0 ? spend / allConversions : 0;
      const cpaIncremental = incremental > 0 ? spend / incremental : 0;
      
      // Calcular % incremental
      const incrementalPct = allConversions > 0 ? (incremental / allConversions) * 100 : 0;
      
      // Alerta de risco
      let riskAlert = '';
      if (incrementalPct > 0 && incrementalPct < 30) {
        riskAlert = '\n⚠️ **ALERTA:** Menos de 30% das conversões são incrementais - alto risco de pagar por conversões orgânicas!';
      } else if (incrementalPct >= 30 && incrementalPct < 50) {
        riskAlert = '\n⚡ **ATENÇÃO:** Entre 30-50% incrementais - considere testar otimização First Conversion';
      }
      
      lines.push(`### ${actionType.toUpperCase()}`);
      lines.push('');
      lines.push('| Modelo | Conversões | CPA |');
      lines.push('|--------|------------|-----|');
      lines.push(`| All Conversions (padrão) | ${allConversions.toFixed(0)} | R$ ${cpaAll.toFixed(2)} |`);
      lines.push(`| 1d Click | ${click1d.toFixed(0)} | ${click1d > 0 ? `R$ ${(spend / click1d).toFixed(2)}` : '-'} |`);
      lines.push(`| 7d Click | ${click7d.toFixed(0)} | ${click7d > 0 ? `R$ ${(spend / click7d).toFixed(2)}` : '-'} |`);
      lines.push(`| 1d View | ${view1d.toFixed(0)} | ${view1d > 0 ? `R$ ${(spend / view1d).toFixed(2)}` : '-'} |`);
      lines.push(`| **Incremental** | **${incremental.toFixed(0)}** | **R$ ${cpaIncremental.toFixed(2)}** |`);
      lines.push('');
      lines.push(`**% Incremental:** ${incrementalPct.toFixed(1)}% das conversões totais`);
      if (riskAlert) lines.push(riskAlert);
      lines.push('');
    }
  }
  
  // Adicionar seção de interpretação
  lines.push('---');
  lines.push('');
  lines.push('## Como Interpretar');
  lines.push('');
  lines.push('| Modelo | Use quando... | Cuidado com... |');
  lines.push('|--------|---------------|----------------|');
  lines.push('| All Conversions | Quer volume máximo reportado | Inflaciona métricas |');
  lines.push('| First Conversion | Evitar contar mesmo usuário múltiplas vezes | CPA parece maior |');
  lines.push('| Incrementality | Quer saber impacto real dos anúncios | Número muito menor |');
  lines.push('');
  lines.push('**Regra prática:** Se `incrementality < 30%` do total, considere testar otimização First Conversion no ad set.');
  
  return {
    content: [{
      type: 'text',
      text: lines.join('\n'),
    }],
  };
}

async function handleGetPerformanceSummary(
  client: MetaClient,
  args: GetPerformanceSummaryArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const actionTypes = args.action_types || ['purchase'];

  // Buscar insights da conta com atribuição expandida
  const result = await client.getAccountInsights(accountId, {
    date_preset: args.date_preset || 'last_30d',
    time_range: args.time_range,
    fields: ['spend', 'actions', 'cost_per_action_type', 'action_values'],
    action_attribution_windows: ['1d_click', '7d_click', 'incrementality'],
    use_unified_attribution_setting: false,
  });
  
  if (!result.data || result.data.length === 0) {
    return {
      content: [{
        type: 'text',
        text: 'Nenhum dado de insights disponível para o período selecionado.',
      }],
    };
  }
  
  const data = result.data[0];
  const spend = parseFloat(data.spend as string || '0');
  const actions = (data.actions as Array<Record<string, unknown>>) || [];
  const actionValues = (data.action_values as Array<Record<string, unknown>>) || [];
  
  // Construir resumo
  const summary: {
    spend: number;
    period: string;
    conversions: Record<string, {
      all_conversions: number;
      incremental: number;
      cpa_all: number;
      cpa_incremental: number;
      incremental_pct: number;
    }>;
    roas: { all: number; incremental: number } | null;
    roas_note?: string;
  } = {
    spend,
    period: `${data.date_start || ''} a ${data.date_stop || ''}`,
    conversions: {},
    roas: null,
  };
  
  // Processar cada tipo de conversão
  for (const actionType of actionTypes) {
    const action = actions.find(a => a.action_type === actionType);
    
    if (action) {
      const allConversions = parseFloat(action.value as string || '0');
      const incremental = parseFloat(action['incrementality'] as string || '0');
      
      summary.conversions[actionType] = {
        all_conversions: allConversions,
        incremental,
        cpa_all: allConversions > 0 ? spend / allConversions : 0,
        cpa_incremental: incremental > 0 ? spend / incremental : 0,
        incremental_pct: allConversions > 0 ? (incremental / allConversions) * 100 : 0,
      };
    }
  }
  
  // Calcular ROAS se houver valor de conversão
  const purchaseValue = actionValues.find(av => av.action_type === 'purchase' || av.action_type === 'omni_purchase');
  
  if (purchaseValue && purchaseValue.value) {
    const totalValue = parseFloat(purchaseValue.value as string || '0');
    const incrementalValue = parseFloat(purchaseValue['incrementality'] as string || '0');
    
    summary.roas = {
      all: spend > 0 ? totalValue / spend : 0,
      incremental: spend > 0 ? incrementalValue / spend : 0,
    };
  } else {
    summary.roas_note = 'ROAS não disponível - configure purchase_conversion_value na conta para rastrear valor de conversão.';
  }
  
  // Formatar output
  const lines: string[] = [
    '# Resumo de Performance',
    '',
    `**Período:** ${summary.period}`,
    `**Gasto Total:** R$ ${summary.spend.toFixed(2)}`,
    '',
  ];
  
  // Métricas por tipo de conversão
  for (const [actionType, metrics] of Object.entries(summary.conversions)) {
    const riskEmoji = metrics.incremental_pct < 30 ? '⚠️' : (metrics.incremental_pct < 50 ? '⚡' : '✅');
    
    lines.push(`## ${actionType.toUpperCase()}`);
    lines.push('');
    lines.push(`| Métrica | All | Incremental |`);
    lines.push(`|---------|-----|-------------|`);
    lines.push(`| Conversões | ${metrics.all_conversions.toFixed(0)} | ${metrics.incremental.toFixed(0)} |`);
    lines.push(`| CPA | R$ ${metrics.cpa_all.toFixed(2)} | R$ ${metrics.cpa_incremental.toFixed(2)} |`);
    lines.push('');
    lines.push(`${riskEmoji} **% Incremental:** ${metrics.incremental_pct.toFixed(1)}%`);
    lines.push('');
  }
  
  // ROAS
  lines.push('## ROAS');
  lines.push('');
  if (summary.roas) {
    lines.push(`| Métrica | All | Incremental |`);
    lines.push(`|---------|-----|-------------|`);
    lines.push(`| ROAS | ${summary.roas.all.toFixed(2)}x | ${summary.roas.incremental.toFixed(2)}x |`);
  } else {
    lines.push(`*${summary.roas_note}*`);
  }
  lines.push('');
  
  // Interpretação
  lines.push('---');
  lines.push('');
  lines.push('**Interpretação:**');
  lines.push('- % Incremental < 30% ⚠️ = alto risco de pagar por conversões orgânicas');
  lines.push('- % Incremental 30-50% ⚡ = considere testar First Conversion');
  lines.push('- % Incremental > 50% ✅ = boa eficiência incremental');
  
  return {
    content: [{
      type: 'text',
      text: lines.join('\n'),
    }],
  };
}

async function handleListCampaignAdsWithInsights(
  client: MetaClient,
  args: ListCampaignAdsWithInsightsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // 1. Listar ads da campanha
  const adsResult = await client.listCampaignAds(args.campaign_id, ['id', 'name', 'status', 'effective_status']);
  
  if (!adsResult.data || adsResult.data.length === 0) {
    return {
      content: [{
        type: 'text',
        text: `Nenhum anúncio encontrado na campanha ${args.campaign_id}.`,
      }],
    };
  }
  
  const ads = adsResult.data;
  const insightsFields = args.fields || ['spend', 'impressions', 'clicks', 'actions', 'cost_per_action_type'];
  
  // 2. Buscar insights de cada ad em paralelo (batch interno)
  const insightsPromises = ads.map(async (ad) => {
    try {
      const insights = await client.getInsights(ad.id as string, {
        date_preset: args.date_preset || 'last_30d',
        time_range: args.time_range,
        fields: insightsFields,
        action_attribution_windows: args.action_attribution_windows,
        use_unified_attribution_setting: args.action_attribution_windows ? false : undefined,
      });
      return { ad, insights: insights.data?.[0] || null };
    } catch {
      // Se falhar para um ad específico, continuar com os outros
      return { ad, insights: null };
    }
  });
  
  const results = await Promise.all(insightsPromises);
  
  // 3. Formatar output
  const lines: string[] = [
    `# Anúncios da Campanha ${args.campaign_id}`,
    '',
    `**Total:** ${ads.length} anúncio(s)`,
    `**Período:** ${args.date_preset || 'last_30d'}`,
  ];
  
  if (args.action_attribution_windows) {
    lines.push(`**Atribuição:** ${args.action_attribution_windows.join(', ')}`);
  }
  lines.push('');
  
  for (const { ad, insights } of results) {
    const statusEmoji = ad.effective_status === 'ACTIVE' ? '✅' : (ad.effective_status === 'PAUSED' ? '⏸️' : '❌');
    
    lines.push(`## ${statusEmoji} ${ad.name}`);
    lines.push(`**ID:** ${ad.id} | **Status:** ${ad.effective_status}`);
    lines.push('');
    
    if (insights) {
      const spend = parseFloat(insights.spend as string || '0');
      const impressions = parseInt(insights.impressions as string || '0', 10);
      const clicks = parseInt(insights.clicks as string || '0', 10);
      const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
      
      lines.push(`| Métrica | Valor |`);
      lines.push(`|---------|-------|`);
      lines.push(`| Spend | R$ ${spend.toFixed(2)} |`);
      lines.push(`| Impressões | ${impressions.toLocaleString()} |`);
      lines.push(`| Cliques | ${clicks.toLocaleString()} |`);
      lines.push(`| CTR | ${ctr.toFixed(2)}% |`);
      
      // Processar actions se existirem
      const actions = (insights.actions as Array<Record<string, unknown>>) || [];
      if (actions.length > 0) {
        lines.push('');
        lines.push('**Conversões:**');
        for (const action of actions) {
          const actionType = action.action_type as string;
          const value = action.value as string;
          
          // Se tiver atribuição, mostrar breakdown
          if (args.action_attribution_windows) {
            const attrValues = args.action_attribution_windows.map((w: string) => {
              const v = action[w] as string | undefined;
              return v ? `${w}: ${v}` : null;
            }).filter(Boolean).join(', ');
            
            lines.push(`- ${actionType}: ${value} (${attrValues || 'sem dados de atribuição'})`);
          } else {
            lines.push(`- ${actionType}: ${value}`);
          }
        }
      }
    } else {
      lines.push('*Sem dados de insights disponíveis*');
    }
    
    lines.push('');
  }
  
  return {
    content: [{
      type: 'text',
      text: lines.join('\n'),
    }],
  };
}

// ==================== AUDIENCE HANDLERS ====================

async function handleListCustomAudiences(
  client: MetaClient,
  args: ListCustomAudiencesArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listCustomAudiences(accountId, args.fields);
  return {
    content: [
      {
        type: 'text',
        text: `# Audiências Customizadas\n\nEncontradas ${result.data.length} audiência(s):\n\n${formatAudiences(result.data)}`,
      },
    ],
  };
}

async function handleCreateCustomAudience(
  client: MetaClient,
  args: CreateCustomAudienceArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  // Validação de campos obrigatórios por subtipo
  if (args.subtype === 'CUSTOM' && !args.customer_file_source) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro de Validação\n\nPara audiências do tipo CUSTOM, o campo \`customer_file_source\` é obrigatório.\n\nValores aceitos: USER_PROVIDED_ONLY, PARTNER_PROVIDED_ONLY, BOTH_USER_AND_PARTNER_PROVIDED`,
        },
      ],
    };
  }
  
  if (['WEBSITE', 'APP', 'ENGAGEMENT'].includes(args.subtype) && !args.rule) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro de Validação\n\nPara audiências do tipo ${args.subtype}, o campo \`rule\` é obrigatório.\n\nConsulte a documentação para exemplos de regras.`,
        },
      ],
    };
  }

  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createCustomAudience(accountId, {
    name: args.name,
    subtype: args.subtype,
    description: args.description,
    customer_file_source: args.customer_file_source,
    rule: args.rule,
    pixel_id: args.pixel_id,
    prefill: args.prefill,
  });
  return {
    content: [
      {
        type: 'text',
        text: `# Audiência Criada\n\n**ID:** ${result.id}\n**Nome:** ${args.name}\n**Subtipo:** ${args.subtype}`,
      },
    ],
  };
}

async function handleGetReachEstimate(
  client: MetaClient,
  args: GetReachEstimateArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.getReachEstimate(accountId, {
    targeting_spec: args.targeting_spec,
  });
  return {
    content: [
      {
        type: 'text',
        text: `# Estimativa de Alcance\n\n**Alcance estimado:** ${result.data.users_lower_bound.toLocaleString()} - ${result.data.users_upper_bound.toLocaleString()} pessoas`,
      },
    ],
  };
}

// ==================== PIXELS HANDLERS ====================

async function handleListPixels(
  client: MetaClient,
  args: ListPixelsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listPixels(accountId, args.fields);

  if (result.data.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `# Pixels da Conta\n\nNenhum pixel encontrado nesta conta.\n\n**Dica:** Crie um pixel no Facebook Business Manager ou Events Manager antes de criar ad sets com OFFSITE_CONVERSIONS.`,
        },
      ],
    };
  }
  
  const pixelsTable = result.data.map(pixel => {
    const lastFired = pixel.last_fired_time 
      ? new Date(pixel.last_fired_time).toLocaleString('pt-BR')
      : 'Nunca';
    return `| ${pixel.id} | ${pixel.name} | ${lastFired} |`;
  }).join('\n');
  
  return {
    content: [
      {
        type: 'text',
        text: `# Pixels da Conta

Encontrados ${result.data.length} pixel(s):

| ID | Nome | Último Disparo |
|----|------|----------------|
${pixelsTable}

**Como usar no create_adset:**
\`\`\`json
{
  "promoted_object": {
    "pixel_id": "${result.data[0].id}",
    "custom_event_type": "PURCHASE"
  }
}
\`\`\``,
      },
    ],
  };
}

// ==================== UPLOAD DE IMAGEM HANDLERS ====================

async function handleUploadImage(
  client: MetaClient,
  args: UploadImageArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  try {
    const accountId = normalizeAccountId(args.account_id);
    const result = await client.uploadImageFromUrl(accountId, args.image_url);
    
    // A resposta do Meta vem como { images: { bytes: { hash, url, ... } } }
    const images = (result as Record<string, unknown>).images as Record<string, Record<string, string>> | undefined;
    
    if (images) {
      const firstKey = Object.keys(images)[0];
      const imageData = images[firstKey];
      
      return {
        content: [
          {
            type: 'text',
            text: `# Imagem Uploaded com Sucesso

**Image Hash:** ${imageData.hash}
**URL:** ${imageData.url || 'N/A'}

**Como usar no create_creative:**
\`\`\`json
{
  "object_story_spec": {
    "page_id": "ID_DA_PAGINA",
    "link_data": {
      "image_hash": "${imageData.hash}",
      "link": "https://seu-site.com",
      "message": "Texto do post"
    }
  }
}
\`\`\``,
          },
        ],
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `# Upload de Imagem\n\n**Resultado:**\n${formatObject(result as Record<string, unknown>)}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro no Upload de Imagem\n\n${error instanceof Error ? error.message : String(error)}\n\n**Possíveis causas:**\n- URL não é acessível publicamente\n- URL não aponta para uma imagem válida (JPG, PNG)\n- Imagem muito grande (limite: ~4MB para base64)\n- Formato de imagem não suportado\n\n**Dica:** A imagem é baixada e convertida para base64 antes do upload. Certifique-se de que a URL retorna o arquivo de imagem diretamente.`,
        },
      ],
    };
  }
}

// ==================== DATASET QUALITY (EMQ) HANDLERS ====================

async function handleGetDatasetQuality(
  client: MetaClient,
  args: GetDatasetQualityArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  try {
    const result = await client.getDatasetQuality(args.pixel_id);
    const resultObj = result as Record<string, unknown>;
    
    // Verificar se a resposta está vazia ou sem dados úteis
    const hasData = resultObj && Object.keys(resultObj).length > 0 && 
      !(Object.keys(resultObj).length === 1 && resultObj.id);
    
    if (!hasData) {
      return {
        content: [
          {
            type: 'text',
            text: `# Dataset Quality (EMQ)

**Pixel/Dataset ID:** ${args.pixel_id}

**Nenhum dado de qualidade disponível para este pixel.**

Possíveis causas:
- Pixel sem implementação Conversions API (CAPI) — EMQ requer eventos server-side
- Dados EMQ ainda não processados (pode levar até 48h após implementação)
- Pixel com volume insuficiente de eventos
- Pixel configurado apenas com browser-side tracking (sem CAPI)

**Próximos passos:**
1. Verifique se a CAPI está implementada: \`execute_api(endpoint="{pixel_id}/events", method="GET")\`
2. Implemente a CAPI seguindo: \`get_document_by_path(path="conversions-api/get-started/index.md")\`
3. Após implementar, aguarde 48h e consulte novamente

**Referência Andromeda:**
- EMQ >= 6.0: Requisito mínimo para Andromeda funcionar bem
- Event Coverage >= 75%: Recomendado para otimização eficiente`,
          },
        ],
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `# Dataset Quality (EMQ)\n\n**Pixel/Dataset ID:** ${args.pixel_id}\n\n${formatObject(resultObj)}\n\n**Referência Andromeda:**\n- EMQ >= 6.0: Bom para otimização\n- EMQ < 6.0: Requer melhorias na implementação CAPI\n- Event Coverage >= 75%: Recomendado`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `# Erro ao Consultar Dataset Quality\n\n${error instanceof Error ? error.message : String(error)}\n\n**Dica:** Verifique se o pixel_id está correto. Use \`list_pixels\` para obter IDs disponíveis.`,
        },
      ],
    };
  }
}

// ==================== GEOLOCALIZAÇÃO HANDLERS ====================

async function handleSearchGeolocation(
  client: MetaClient,
  args: SearchGeolocationArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.searchGeolocation({
    q: args.q,
    location_types: args.location_types,
    country_code: args.country_code,
    limit: args.limit,
  });
  
  if (result.data.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `# Busca de Localização

Nenhuma localização encontrada para "${args.q}".

**Dicas:**
- Tente um termo mais genérico
- Verifique a ortografia
- Use location_types para filtrar (ex: ["region", "city"])
- Use country_code para limitar a um país (ex: "BR")`,
        },
      ],
    };
  }
  
  const locationsTable = result.data.map(loc => {
    const countryInfo = loc.country_code ? `${loc.country_name || loc.country_code}` : '-';
    const regionInfo = loc.region || '-';
    return `| ${loc.key} | ${loc.name} | ${loc.type} | ${countryInfo} | ${regionInfo} |`;
  }).join('\n');
  
  return {
    content: [
      {
        type: 'text',
        text: `# Busca de Localização: "${args.q}"

Encontradas ${result.data.length} localização(ões):

| Key | Nome | Tipo | País | Região |
|-----|------|------|------|--------|
${locationsTable}

**Como usar no targeting do create_adset:**

Para países:
\`\`\`json
{
  "geo_locations": {
    "countries": ["BR"]
  }
}
\`\`\`

Para estados/regiões:
\`\`\`json
{
  "geo_locations": {
    "regions": [{"key": "${result.data[0].key}"}]
  }
}
\`\`\`

Para cidades:
\`\`\`json
{
  "geo_locations": {
    "cities": [{"key": "${result.data[0].key}"}]
  }
}
\`\`\`

**IMPORTANTE:** Use o valor da coluna "Key", NÃO invente IDs!`,
      },
    ],
  };
}

// ==================== API CUSTOMIZADA HANDLER ====================

/**
 * Processa o endpoint substituindo placeholders de conta
 */
function processEndpoint(endpoint: string, accountId?: string): { processedEndpoint: string; warnings: string[] } {
  const warnings: string[] = [];
  let processedEndpoint = endpoint;

  // Substituir placeholder {ad_account_id} se account_id fornecido
  if (accountId && processedEndpoint.includes('{ad_account_id}')) {
    processedEndpoint = processedEndpoint.replace('{ad_account_id}', accountId);
  }

  return { processedEndpoint, warnings };
}

/**
 * Remove access_token de URLs de paginação para não expor credenciais no output.
 */
function sanitizePagingUrls(obj: unknown): unknown {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizePagingUrls);

  const record = obj as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if ((key === 'next' || key === 'previous') && typeof value === 'string' && value.includes('access_token=')) {
      result[key] = value.replace(/access_token=[^&]+/, 'access_token=***');
    } else {
      result[key] = sanitizePagingUrls(value);
    }
  }
  return result;
}

async function handleExecuteApi(
  client: MetaClient,
  args: ExecuteApiArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const { method, endpoint, params } = args;
  const accountId = args.account_id ? normalizeAccountId(args.account_id) : undefined;

  // Processar endpoint (substituir placeholders)
  const { processedEndpoint, warnings } = processEndpoint(endpoint, accountId);

  let result: unknown;

  switch (method) {
    case 'GET': {
      // Converter params para Record<string, string> para GET
      const queryParams: Record<string, string> = {};
      if (params) {
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined && value !== null) {
            queryParams[key] = typeof value === 'object' ? JSON.stringify(value) : String(value);
          }
        }
      }
      result = await client.get(processedEndpoint, queryParams);
      break;
    }
    case 'POST': {
      result = await client.post(processedEndpoint, (params as Record<string, unknown>) || {});
      break;
    }
    case 'DELETE': {
      result = await client.delete(processedEndpoint);
      break;
    }
  }

  // Montar resposta com avisos se houver
  const warningsText = warnings.length > 0 ? `\n\n${warnings.join('\n')}\n` : '';

  // Sanitizar tokens de URLs de paginação para não expor access_token
  const sanitizedResult = sanitizePagingUrls(result);

  return {
    content: [
      {
        type: 'text',
        text: `# Resultado da API${warningsText}\n\n**Método:** ${method}\n**Endpoint:** ${processedEndpoint}\n\n\`\`\`json\n${JSON.stringify(sanitizedResult, null, 2)}\n\`\`\``,
      },
    ],
  };
}

// ==================== VIDEO HANDLERS ====================

async function handleUploadVideo(
  client: MetaClient,
  args: UploadVideoArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.uploadVideo(accountId, {
    file_url: args.file_url,
    title: args.title,
    description: args.description,
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Vídeo Enviado

**Video ID:** ${result.id}
${args.title ? `**Título:** ${args.title}` : ''}

**Próximos passos:**
1. Use \`get_video_status\` para verificar o processamento
2. Após processado, use o video_id no \`create_creative\`:

\`\`\`json
{
  "object_story_spec": {
    "page_id": "ID_DA_PAGINA",
    "video_data": {
      "video_id": "${result.id}",
      "message": "Texto do post"
    }
  }
}
\`\`\``,
      },
    ],
  };
}

async function handleGetVideoStatus(
  client: MetaClient,
  args: GetVideoStatusArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getVideoStatus(args.video_id);
  const resultObj = result as Record<string, unknown>;

  const status = resultObj.status as Record<string, unknown> | undefined;
  const processingPhase = status?.video_status as string || 'unknown';

  return {
    content: [
      {
        type: 'text',
        text: `# Status do Vídeo

**Video ID:** ${args.video_id}
**Status:** ${processingPhase}
${resultObj.title ? `**Título:** ${resultObj.title}` : ''}
${resultObj.length ? `**Duração:** ${resultObj.length}s` : ''}
${resultObj.source ? `**Source:** ${resultObj.source}` : ''}

${formatObject(resultObj)}`,
      },
    ],
  };
}

// ==================== VALUE RULES HANDLERS ====================

async function handleCreateValueRuleSet(
  client: MetaClient,
  args: CreateValueRuleSetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createValueRuleSet(accountId, {
    name: args.name,
    rules: args.rules,
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Value Rule Set Criado\n\n**ID:** ${result.id}\n**Nome:** ${args.name}\n**Regras:** ${args.rules.length} regra(s)\n\n**Próximo passo:** Use \`update_adset\` com \`value_rule_set_id: "${result.id}"\` e \`value_rules_applied: true\` para aplicar ao ad set.`,
      },
    ],
  };
}

async function handleListValueRuleSets(
  client: MetaClient,
  args: ListValueRuleSetsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listValueRuleSets(accountId, args.fields);
  const data = result.data || [];

  return {
    content: [
      {
        type: 'text',
        text: `# Value Rule Sets\n\nEncontrados ${data.length} rule set(s):\n\n${data.length > 0 ? data.map((rs: Record<string, unknown>) => `- **ID:** ${rs.id} | **Nome:** ${rs.name || 'N/A'}`).join('\n') : 'Nenhum rule set encontrado.'}`,
      },
    ],
  };
}

async function handleGetValueRuleSet(
  client: MetaClient,
  args: GetValueRuleSetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getValueRuleSet(args.value_rule_set_id, args.fields);
  const resultObj = result as Record<string, unknown>;

  return {
    content: [
      {
        type: 'text',
        text: `# Value Rule Set: ${resultObj.name || args.value_rule_set_id}\n\n${formatObject(resultObj)}`,
      },
    ],
  };
}

async function handleUpdateValueRuleSet(
  client: MetaClient,
  args: UpdateValueRuleSetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateValueRuleSet(args.value_rule_set_id, {
    name: args.name,
    rules: args.rules,
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Value Rule Set Atualizado\n\n**ID:** ${args.value_rule_set_id}\n\nAlterações aplicadas com sucesso.`,
      },
    ],
  };
}

async function handleDeleteValueRuleSet(
  client: MetaClient,
  args: DeleteValueRuleSetArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.deleteValueRuleSet(args.value_rule_set_id);

  return {
    content: [
      {
        type: 'text',
        text: `# Value Rule Set Excluído\n\n**ID:** ${args.value_rule_set_id}\n\nO rule set foi excluído com sucesso.`,
      },
    ],
  };
}

// ==================== AD LABELS HANDLERS ====================

async function handleCreateAdLabel(
  client: MetaClient,
  args: CreateAdLabelArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.createAdLabel(accountId, { name: args.name });

  return {
    content: [
      {
        type: 'text',
        text: `# Ad Label Criado\n\n**ID:** ${result.id}\n**Nome:** ${args.name}\n\n**Uso:** Adicione este label a campanhas, ad sets ou ads usando o campo \`adlabels: [{name: "${args.name}"}]\` ao criar ou atualizar.`,
      },
    ],
  };
}

async function handleListAdLabels(
  client: MetaClient,
  args: ListAdLabelsArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const accountId = normalizeAccountId(args.account_id);
  const result = await client.listAdLabels(accountId, args.fields);
  const data = result.data || [];

  return {
    content: [
      {
        type: 'text',
        text: `# Ad Labels\n\nEncontrados ${data.length} label(s):\n\n${data.length > 0 ? data.map((label: Record<string, unknown>) => `- **ID:** ${label.id} | **Nome:** ${label.name || 'N/A'}`).join('\n') : 'Nenhum label encontrado.'}`,
      },
    ],
  };
}

// ==================== CREATIVE PREVIEW HANDLER ====================

async function handlePreviewCreative(
  client: MetaClient,
  args: PreviewCreativeArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.previewCreative(args.creative_id, args.ad_format);
  const data = (result as { data?: Array<Record<string, unknown>> }).data || [];

  if (data.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `# Preview do Criativo\n\n**Creative ID:** ${args.creative_id}\n**Formato:** ${args.ad_format}\n\nNenhum preview disponível para este formato.`,
        },
      ],
    };
  }

  const preview = data[0];
  return {
    content: [
      {
        type: 'text',
        text: `# Preview do Criativo\n\n**Creative ID:** ${args.creative_id}\n**Formato:** ${args.ad_format}\n\n**HTML Preview:**\n\`\`\`html\n${preview.body || 'N/A'}\n\`\`\``,
      },
    ],
  };
}

// ==================== BUDGET SCHEDULE HANDLERS ====================

async function handleCreateBudgetSchedule(
  client: MetaClient,
  args: CreateBudgetScheduleArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.createBudgetSchedule(args.campaign_id, {
    budget_value: args.budget_value,
    budget_value_type: args.budget_value_type,
    time_start: args.time_start,
    time_end: args.time_end,
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Budget Schedule Criado\n\n**ID:** ${result.id}\n**Campanha:** ${args.campaign_id}\n**Budget:** R$ ${(args.budget_value / 100).toFixed(2)}\n**Período:** ${args.time_start} até ${args.time_end}`,
      },
    ],
  };
}

async function handleGetBudgetSchedules(
  client: MetaClient,
  args: GetBudgetSchedulesArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const result = await client.getBudgetSchedules(args.campaign_id);
  const data = (result as { data?: Array<Record<string, unknown>> }).data || [];

  return {
    content: [
      {
        type: 'text',
        text: `# Budget Schedules da Campanha ${args.campaign_id}\n\nEncontrados ${data.length} schedule(s):\n\n${data.length > 0 ? data.map((s: Record<string, unknown>) => `- **ID:** ${s.id} | **Budget:** ${s.budget_value} | **Período:** ${s.time_start} - ${s.time_end}`).join('\n') : 'Nenhum schedule encontrado.'}`,
      },
    ],
  };
}

async function handleUpdateBudgetSchedule(
  client: MetaClient,
  args: UpdateBudgetScheduleArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.updateBudgetSchedule(args.budget_schedule_id, {
    budget_value: args.budget_value,
    time_start: args.time_start,
    time_end: args.time_end,
  });

  return {
    content: [
      {
        type: 'text',
        text: `# Budget Schedule Atualizado\n\n**ID:** ${args.budget_schedule_id}\n\nAlterações aplicadas com sucesso.`,
      },
    ],
  };
}

async function handleDeleteBudgetSchedule(
  client: MetaClient,
  args: DeleteBudgetScheduleArgs
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  await client.deleteBudgetSchedule(args.budget_schedule_id);

  return {
    content: [
      {
        type: 'text',
        text: `# Budget Schedule Excluído\n\n**ID:** ${args.budget_schedule_id}\n\nO schedule foi excluído com sucesso.`,
      },
    ],
  };
}

// ==================== FORMATTERS ====================

function formatCampaigns(campaigns: Array<{ id: string; name: string; status: string; objective?: string }>): string {
  if (campaigns.length === 0) return 'Nenhuma campanha encontrada.';

  return campaigns
    .map(
      (c) => `### ${c.name}
- **ID:** ${c.id}
- **Status:** ${c.status}
- **Objetivo:** ${c.objective || 'N/A'}
`
    )
    .join('\n');
}

function formatAdSets(
  adsets: Array<{ id: string; name: string; status: string; campaign_id?: string; daily_budget?: string }>
): string {
  if (adsets.length === 0) return 'Nenhum ad set encontrado.';

  return adsets
    .map(
      (a) => `### ${a.name}
- **ID:** ${a.id}
- **Status:** ${a.status}
- **Campanha:** ${a.campaign_id || 'N/A'}
- **Orçamento diário:** ${a.daily_budget ? `R$ ${(parseInt(a.daily_budget) / 100).toFixed(2)}` : 'N/A'}
`
    )
    .join('\n');
}

function formatAds(
  ads: Array<{ id: string; name: string; status: string; effective_status?: string; adset_id?: string; creative?: object }>
): string {
  if (ads.length === 0) return 'Nenhum anúncio encontrado.';

  return ads
    .map(
      (a) => `### ${a.name}
- **ID:** ${a.id}
- **Status:** ${a.status}
- **Effective Status:** ${a.effective_status || 'N/A'}
- **Ad Set:** ${a.adset_id || 'N/A'}
${a.creative ? `- **Creative ID:** ${(a.creative as { id?: string }).id || 'N/A'}` : ''}
`
    )
    .join('\n');
}

function formatInsights(insights: Array<Record<string, unknown>>, hasAttribution: boolean = false): string {
  if (!insights || insights.length === 0) return 'Nenhum dado de insights disponível.';

  const data = insights[0];
  const lines: string[] = [];

  if (data.date_start && data.date_stop) {
    lines.push(`**Período:** ${data.date_start} a ${data.date_stop}\n`);
  }

  const metrics = [
    { key: 'impressions', label: 'Impressões' },
    { key: 'reach', label: 'Alcance' },
    { key: 'clicks', label: 'Cliques' },
    { key: 'spend', label: 'Gasto' },
    { key: 'cpc', label: 'CPC' },
    { key: 'cpm', label: 'CPM' },
    { key: 'ctr', label: 'CTR' },
  ];

  for (const { key, label } of metrics) {
    if (data[key] !== undefined) {
      let value = data[key];
      if (key === 'spend' || key === 'cpc' || key === 'cpm') {
        value = `R$ ${parseFloat(value as string).toFixed(2)}`;
      } else if (key === 'ctr') {
        value = `${parseFloat(value as string).toFixed(2)}%`;
      } else {
        value = parseInt(value as string).toLocaleString();
      }
      lines.push(`- **${label}:** ${value}`);
    }
  }

  // Formatar actions com breakdown por janela de atribuição
  if (data.actions && Array.isArray(data.actions)) {
    lines.push('\n## Conversões (Actions)\n');
    const actions = data.actions as Array<Record<string, unknown>>;
    
    for (const action of actions) {
      const actionType = action.action_type as string;
      const value = action.value as string;
      
      if (hasAttribution) {
        // Mostrar breakdown por janela
        lines.push(`### ${actionType}`);
        lines.push(`- **Total:** ${value}`);
        
        // Janelas de clique
        if (action['1d_click']) lines.push(`- **1d click:** ${action['1d_click']}`);
        if (action['7d_click']) lines.push(`- **7d click:** ${action['7d_click']}`);
        if (action['28d_click']) lines.push(`- **28d click:** ${action['28d_click']}`);
        
        // Janelas de view
        if (action['1d_view']) lines.push(`- **1d view:** ${action['1d_view']}`);
        if (action['7d_view']) lines.push(`- **7d view:** ${action['7d_view']}`);
        
        // Incremental
        if (action['incrementality']) {
          const incremental = parseFloat(action['incrementality'] as string);
          const total = parseFloat(value);
          const pct = total > 0 ? ((incremental / total) * 100).toFixed(1) : '0';
          lines.push(`- **Incremental:** ${action['incrementality']} (${pct}% do total)`);
        }
        
        lines.push('');
      } else {
        lines.push(`- **${actionType}:** ${value}`);
      }
    }
  }

  // Formatar cost_per_action_type
  if (data.cost_per_action_type && Array.isArray(data.cost_per_action_type)) {
    lines.push('\n## Custo por Conversão (CPA)\n');
    const costs = data.cost_per_action_type as Array<Record<string, unknown>>;
    
    for (const cost of costs) {
      const actionType = cost.action_type as string;
      const value = parseFloat(cost.value as string);
      
      if (hasAttribution) {
        lines.push(`### CPA - ${actionType}`);
        lines.push(`- **CPA Total:** R$ ${value.toFixed(2)}`);
        
        if (cost['1d_click']) lines.push(`- **CPA 1d click:** R$ ${parseFloat(cost['1d_click'] as string).toFixed(2)}`);
        if (cost['7d_click']) lines.push(`- **CPA 7d click:** R$ ${parseFloat(cost['7d_click'] as string).toFixed(2)}`);
        if (cost['incrementality']) lines.push(`- **CPA Incremental:** R$ ${parseFloat(cost['incrementality'] as string).toFixed(2)}`);
        
        lines.push('');
      } else {
        lines.push(`- **CPA ${actionType}:** R$ ${value.toFixed(2)}`);
      }
    }
  }

  return lines.join('\n');
}

function formatCreatives(
  creatives: Array<{ id: string; name: string; object_story_spec?: object; thumbnail_url?: string }>
): string {
  if (creatives.length === 0) return 'Nenhum criativo encontrado.';

  return creatives
    .map(
      (c) => `### ${c.name}
- **ID:** ${c.id}
${c.thumbnail_url ? `- **Thumbnail:** [Ver imagem](${c.thumbnail_url})` : ''}
${c.object_story_spec ? `- **Tipo:** ${getCreativeType(c.object_story_spec)}` : ''}
`
    )
    .join('\n');
}

function getCreativeType(objectStorySpec: object): string {
  const spec = objectStorySpec as Record<string, unknown>;
  if (spec.link_data) return 'Link Ad';
  if (spec.video_data) return 'Video Ad';
  if (spec.photo_data) return 'Image Ad';
  if (spec.text_data) return 'Text Ad';
  return 'Unknown';
}

function formatAudiences(
  audiences: Array<{ id: string; name: string; subtype: string; approximate_count?: number }>
): string {
  if (audiences.length === 0) return 'Nenhuma audiência encontrada.';

  return audiences
    .map(
      (a) => `### ${a.name}
- **ID:** ${a.id}
- **Subtipo:** ${a.subtype}
- **Tamanho aproximado:** ${a.approximate_count?.toLocaleString() || 'N/A'}
`
    )
    .join('\n');
}

function formatObject(obj: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      const formattedValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      lines.push(`- **${key}:** ${formattedValue}`);
    }
  }
  return lines.join('\n');
}

// ==================== HANDLERS DE CONTEXTO ====================

/**
 * Obtém o diretório raiz do projeto
 */
function getProjectRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Subir um nível de dist/ para a raiz do projeto
  return path.resolve(__dirname, '..');
}

/**
 * Handler para get_skill - retorna conteúdo do SKILL.md
 */
async function handleGetSkill(): Promise<{
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}> {
  try {
    const skillPath = path.join(getProjectRoot(), 'SKILL.md');
    
    if (!fs.existsSync(skillPath)) {
      return {
        content: [{ type: 'text', text: '# Erro\n\nArquivo SKILL.md não encontrado.' }],
        isError: true,
      };
    }
    
    const content = fs.readFileSync(skillPath, 'utf-8');
    
    return {
      content: [{ type: 'text', text: content }],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `# Erro\n\nFalha ao ler SKILL.md: ${error}` }],
      isError: true,
    };
  }
}

/**
 * Handler para get_playbook - retorna conteúdo do PLAYBOOK.md
 */
async function handleGetPlaybook(): Promise<{
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}> {
  try {
    const playbookPath = path.join(getProjectRoot(), 'PLAYBOOK.md');
    
    if (!fs.existsSync(playbookPath)) {
      return {
        content: [{ type: 'text', text: '# Erro\n\nArquivo PLAYBOOK.md não encontrado.' }],
        isError: true,
      };
    }
    
    const content = fs.readFileSync(playbookPath, 'utf-8');
    
    return {
      content: [{ type: 'text', text: content }],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `# Erro\n\nFalha ao ler PLAYBOOK.md: ${error}` }],
      isError: true,
    };
  }
}

/**
 * Handler para get_andromeda - retorna conteúdo do ANDROMEDA.md
 */
async function handleGetAndromeda(): Promise<{
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}> {
  try {
    const andromedaPath = path.join(getProjectRoot(), 'ANDROMEDA.md');
    
    if (!fs.existsSync(andromedaPath)) {
      return {
        content: [{ type: 'text', text: '# Erro\n\nArquivo ANDROMEDA.md não encontrado.' }],
        isError: true,
      };
    }
    
    const content = fs.readFileSync(andromedaPath, 'utf-8');
    
    return {
      content: [{ type: 'text', text: content }],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `# Erro\n\nFalha ao ler ANDROMEDA.md: ${error}` }],
      isError: true,
    };
  }
}

/**
 * Verifica se o nome é uma tool de API
 */
export function isApiTool(name: string): boolean {
  return apiTools.some((tool) => tool.name === name);
}
