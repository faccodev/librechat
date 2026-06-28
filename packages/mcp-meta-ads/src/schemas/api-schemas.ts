/**
 * Schemas Zod para Tools de API (Execução)
 */

import { z } from 'zod';

// Utility: coerce JSON strings into objects (MCP protocol serializes objects as strings)
const jsonObject = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (typeof val === 'string' ? JSON.parse(val) : val), schema);

// Utility: coerce string-encoded numbers (MCP protocol serializes numbers as strings)
const coerceNum = () => z.coerce.number();

// Campo reutilizável: account_id obrigatório para tools de conta
const accountIdField = z.string()
  .min(1)
  .describe('ID da conta de anúncios (ex: act_123456789). Use discover_ad_accounts para listar.');

// ==================== SCHEMAS DE DESCOBERTA ====================

export const discoverAdAccountsSchema = z.object({
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, account_status, currency, timezone_name)'),
});

export const listFacebookPagesSchema = z.object({
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, access_token, category)'),
});

export const getInstagramAccountSchema = z.object({
  page_id: z.string().min(1).describe('ID da página do Facebook'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: instagram_business_account, connected_instagram_account)'),
});

// ==================== SCHEMAS DE CAMPANHAS ====================

// Schema para filtrar por status efetivo
const effectiveStatusSchema = z.array(
  z.enum(['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED', 'PENDING_REVIEW', 'DISAPPROVED', 'PREAPPROVED', 'PENDING_BILLING_INFO', 'CAMPAIGN_PAUSED', 'ADSET_PAUSED', 'IN_PROCESS', 'WITH_ISSUES'])
).describe('Filtrar por status efetivo. Ex: ["ACTIVE"] retorna só campanhas ativas');

export const listCampaignsSchema = z.object({
  account_id: accountIdField,
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, status, objective)'),
  effective_status: effectiveStatusSchema.optional(),
});

export const getCampaignSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
});

export const createCampaignSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome da campanha'),
  objective: z
    .enum([
      'OUTCOME_AWARENESS',
      'OUTCOME_ENGAGEMENT',
      'OUTCOME_LEADS',
      'OUTCOME_SALES',
      'OUTCOME_TRAFFIC',
      'OUTCOME_APP_PROMOTION',
    ])
    .describe('Objetivo da campanha'),
  status: z.enum(['PAUSED', 'ACTIVE']).default('PAUSED').describe('Status inicial (default: PAUSED)'),
  daily_budget: z.coerce.number().positive().optional().describe('Orçamento diário em centavos (para CBO). Mutuamente exclusivo com lifetime_budget.'),
  lifetime_budget: z.coerce.number().positive().optional().describe('Orçamento vitalício em centavos. Mutuamente exclusivo com daily_budget. Requer start_time e stop_time.'),
  spend_cap: z.coerce.number().positive().optional().describe('Limite de gasto total da campanha em centavos. Mínimo ~$100 USD. Use 922337203685478 para remover.'),
  buying_type: z.enum(['AUCTION', 'RESERVED']).default('AUCTION').describe('Tipo de compra. AUCTION (padrão) ou RESERVED (Reach & Frequency).'),
  bid_strategy: z
    .enum(['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP', 'BID_CAP'])
    .optional()
    .describe('Estratégia de lance para CBO. Quando daily_budget é definido sem bid_strategy, usa LOWEST_COST_WITHOUT_CAP automaticamente.'),
  special_ad_categories: z
    .array(z.enum(['CREDIT', 'EMPLOYMENT', 'HOUSING', 'ISSUES_ELECTIONS_POLITICS']))
    .optional()
    .describe('Categorias especiais de anúncios'),
  is_adset_budget_sharing_enabled: z
    .boolean()
    .default(false)
    .describe('Permite compartilhamento de até 20% do orçamento entre ad sets (default: false)'),
  start_time: z.string().optional().describe('Data/hora de início da campanha (formato ISO 8601, ex: "2026-03-01T00:00:00-0300")'),
  stop_time: z.string().optional().describe('Data/hora de fim da campanha (formato ISO 8601, ex: "2026-03-31T23:59:59-0300")'),
  is_skadnetwork_attribution: z.boolean().optional().describe('Habilitar atribuição SKAdNetwork para iOS 14+'),
  promoted_object: z.object({
    pixel_id: z.string().optional(),
    custom_event_type: z.string().optional(),
    application_id: z.string().optional(),
    page_id: z.string().optional(),
  }).optional().describe('Objeto promovido no nível da campanha (usado com iOS 14+ SKAdNetwork)'),
});

export const updateCampaignSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
  name: z.string().min(1).optional().describe('Novo nome'),
  status: z.enum(['ACTIVE', 'PAUSED']).optional().describe('Novo status'),
  daily_budget: z.coerce.number().positive().optional().describe('Novo orçamento diário em centavos'),
  lifetime_budget: z.coerce.number().positive().optional().describe('Novo orçamento vitalício em centavos'),
  spend_cap: z.coerce.number().positive().optional().describe('Novo limite de gasto total em centavos. Use 922337203685478 para remover.'),
  bid_strategy: z
    .enum(['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP', 'BID_CAP'])
    .optional()
    .describe('Nova estratégia de lance'),
  is_adset_budget_sharing_enabled: z.boolean().optional().describe('Toggle CBO/ABO budget sharing'),
  special_ad_categories: z
    .array(z.enum(['CREDIT', 'EMPLOYMENT', 'HOUSING', 'ISSUES_ELECTIONS_POLITICS']))
    .optional()
    .describe('Categorias especiais de anúncios'),
  start_time: z.string().optional().describe('Nova data/hora de início (ISO 8601)'),
  stop_time: z.string().optional().describe('Nova data/hora de fim (ISO 8601)'),
});

export const pauseCampaignSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
});

export const activateCampaignSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
});

// ==================== SCHEMAS DE AD SETS ====================

export const listAdsetsSchema = z.object({
  account_id: accountIdField,
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
  effective_status: effectiveStatusSchema.optional(),
});

// Optimization goal enum reused in create and update
const optimizationGoalEnum = z.enum([
  // Alcance e impressões
  'REACH',
  'IMPRESSIONS',
  'AD_RECALL_LIFT',
  // Tráfego
  'LINK_CLICKS',
  'LANDING_PAGE_VIEWS',
  // Conversões (OFFSITE_CONVERSIONS é o correto, não CONVERSIONS)
  'OFFSITE_CONVERSIONS',
  'VALUE',
  // Engajamento
  'ENGAGED_USERS',
  'EVENT_RESPONSES',
  'PAGE_LIKES',
  'POST_ENGAGEMENT',
  'THRUPLAY',
  'VIDEO_VIEWS',
  // Leads
  'LEAD_GENERATION',
  'QUALITY_LEAD',
  // Apps
  'APP_INSTALLS',
  'APP_INSTALLS_AND_OFFSITE_CONVERSIONS',
  // Instagram/Mensagens
  'VISIT_INSTAGRAM_PROFILE',
  'PROFILE_VISIT',
  'CONVERSATIONS',
  'MESSAGING_PURCHASE_CONVERSION',
  'MESSAGING_APPOINTMENT_CONVERSION',
  // Outros
  'IN_APP_VALUE',
  'SUBSCRIBERS',
  'REMINDERS_SET',
  'MEANINGFUL_CALL_ATTEMPT',
  'QUALITY_CALL',
  'DERIVED_EVENTS',
]);

// Bid strategy enum for campaigns (includes BID_CAP)
const campaignBidStrategyEnum = z.enum(['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP', 'BID_CAP']);

// Bid strategy enum for ad sets (BID_CAP is campaign-only; use LOWEST_COST_WITH_BID_CAP instead)
const adsetBidStrategyEnum = z.enum(['LOWEST_COST_WITHOUT_CAP', 'LOWEST_COST_WITH_BID_CAP', 'COST_CAP']);

// Promoted object schema reused in create and update
const promotedObjectSchema = z.object({
  pixel_id: z.string().optional().describe('ID do pixel (obrigatório para OFFSITE_CONVERSIONS). Use list_pixels para obter.'),
  custom_event_type: z.enum([
    'PURCHASE', 'LEAD', 'COMPLETE_REGISTRATION', 'ADD_TO_CART',
    'INITIATE_CHECKOUT', 'ADD_PAYMENT_INFO', 'SEARCH', 'CONTENT_VIEW',
    'VIEW_CONTENT', 'ADD_TO_WISHLIST', 'CONTACT', 'CUSTOMIZE_PRODUCT',
    'DONATE', 'FIND_LOCATION', 'SCHEDULE', 'SUBMIT_APPLICATION',
    'START_TRIAL', 'SUBSCRIBE', 'OTHER',
  ]).optional().describe('Tipo de evento de conversão'),
  application_id: z.string().optional().describe('ID do app (obrigatório para APP_INSTALLS)'),
  object_store_url: z.string().optional().describe('URL da app store'),
  page_id: z.string().optional().describe('ID da página (obrigatório para PAGE_LIKES)'),
  event_id: z.string().optional().describe('ID do evento'),
  custom_conversion_id: z.string().optional().describe('ID de conversão customizada'),
  offline_conversion_data_set_id: z.string().optional().describe('ID do dataset de conversão offline'),
  product_set_id: z.string().optional().describe('ID do conjunto de produtos'),
});

// Attribution spec schema reused in create and update
const attributionSpecItemSchema = z.object({
  event_type: z.string().describe('Tipo de evento (ex: "CLICK_THROUGH", "VIEW_THROUGH")'),
  window_days: z.coerce.number().describe('Dias da janela de atribuição (ex: 1, 7, 28)'),
});

export const createAdsetSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome do ad set'),
  campaign_id: z.string().min(1).describe('ID da campanha pai'),
  daily_budget: z.coerce.number()
    .min(533, 'Orçamento mínimo no Brasil é R$ 5,33 (533 centavos)')
    .optional()
    .describe('Orçamento diário em centavos (mínimo 533 no Brasil). Mutuamente exclusivo com lifetime_budget.'),
  lifetime_budget: z.coerce.number()
    .positive()
    .optional()
    .describe('Orçamento vitalício em centavos. Mutuamente exclusivo com daily_budget. Requer end_time.'),
  billing_event: z
    .enum(['IMPRESSIONS', 'LINK_CLICKS', 'APP_INSTALLS', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'VIDEO_VIEWS'])
    .describe('Evento de cobrança'),
  optimization_goal: optimizationGoalEnum.describe('Objetivo de otimização'),
  targeting: z.record(z.string(), z.unknown()).describe('Especificação de targeting'),
  status: z.enum(['PAUSED', 'ACTIVE']).default('PAUSED').describe('Status inicial'),
  bid_strategy: adsetBidStrategyEnum
    .default('LOWEST_COST_WITHOUT_CAP')
    .describe('Estratégia de lance (default: LOWEST_COST_WITHOUT_CAP). Nota: BID_CAP é apenas para campanhas; em ad sets use LOWEST_COST_WITH_BID_CAP.'),
  bid_amount: z.coerce.number()
    .positive()
    .optional()
    .describe('Valor do lance em centavos (obrigatório para LOWEST_COST_WITH_BID_CAP e COST_CAP)'),
  bid_constraints: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('Restrições de lance. Ex: {"roas_average_floor": 2.0} para ROAS mínimo. Requer optimization_goal=VALUE e bid_strategy não-autobid.'),
  promoted_object: promotedObjectSchema
    .optional()
    .describe('Objeto promovido. OBRIGATÓRIO para OFFSITE_CONVERSIONS (pixel_id + custom_event_type), APP_INSTALLS (application_id), PAGE_LIKES (page_id).'),
  advantage_audience: z.coerce.number()
    .min(0)
    .max(1)
    .optional()
    .describe('Público Advantage+ (0=desativado, 1=ativado). OBRIGATÓRIO na v24.0. Default: 1. ATENÇÃO: Com Advantage+ ativado (1), a API REJEITA age_max < 65 ou age_min > 18 (erro 1870189). Use 18-65 com Advantage+.'),
  start_time: z
    .string()
    .optional()
    .describe('Data/hora de início do ad set (formato ISO 8601, ex: "2026-02-10T00:00:00-0300")'),
  end_time: z
    .string()
    .optional()
    .describe('Data/hora de fim do ad set (formato ISO 8601, ex: "2026-02-28T23:59:59-0300")'),
  attribution_spec: z
    .array(attributionSpecItemSchema)
    .optional()
    .describe('Especificação de atribuição. Ex: [{"event_type": "CLICK_THROUGH", "window_days": 7}] para 7d click only.'),
  is_incremental_attribution_enabled: z
    .boolean()
    .optional()
    .describe('Habilitar atribuição incremental. Quando true, o algoritmo otimiza para conversões CAUSADAS pelo anúncio, não apenas correlacionadas. Recurso-chave do Andromeda para contas com alto volume orgânico.'),
  excluded_custom_audiences: z
    .array(z.object({
      id: z.string().describe('ID da custom audience a excluir'),
    }))
    .optional()
    .describe('Custom audiences para excluir do targeting. Campo TOP-LEVEL (NÃO dentro de targeting.exclusions). A partir da v24.0, targeting.exclusions.custom_audiences foi depreciado.'),
  destination_type: z
    .enum(['WEBSITE', 'APP', 'MESSENGER', 'WHATSAPP', 'INSTAGRAM_DIRECT', 'PHONE_CALL', 'SHOP', 'UNDEFINED'])
    .optional()
    .describe('Tipo de destino. Obrigatório para objetivos ODAX (OUTCOME_*).'),
  is_dynamic_creative: z
    .boolean()
    .optional()
    .describe('Habilitar Dynamic Creative Optimization (DCO). Quando true, o ad set aceita criativos com asset_feed_spec.'),
  // Phase 2: Dayparting & Frequency Control
  adset_schedule: z
    .array(z.object({
      start_minute: z.coerce.number().describe('Minuto de início (0-1440). Ex: 480 = 8:00'),
      end_minute: z.coerce.number().describe('Minuto de fim (0-1440). Ex: 1320 = 22:00'),
      days: z.array(z.coerce.number()).describe('Dias da semana (0=domingo, 1=segunda, ..., 6=sábado)'),
      timezone_type: z.enum(['USER', 'ADVERTISER']).optional().describe('Timezone para o schedule (default: USER)'),
    }))
    .optional()
    .describe('Agendamento de dayparting. REQUER lifetime_budget (não daily_budget) e pacing_type=["day_parting"]. Ex: [{start_minute: 480, end_minute: 1320, days: [1,2,3,4,5]}] para seg-sex 8h-22h.'),
  pacing_type: z
    .array(z.string())
    .optional()
    .describe('Tipo de ritmo de entrega. Use ["day_parting"] quando adset_schedule estiver definido. Valores: "standard", "day_parting", "no_pacing".'),
  frequency_control_specs: z
    .array(z.object({
      event: z.string().describe('Tipo de evento (ex: "IMPRESSIONS")'),
      interval_days: z.coerce.number().describe('Intervalo em dias (ex: 7)'),
      max_frequency: z.coerce.number().describe('Frequência máxima (ex: 3)'),
    }))
    .optional()
    .describe('Controle de frequência. Ex: [{event: "IMPRESSIONS", interval_days: 7, max_frequency: 3}] para 3 impressões por 7 dias.'),
  // Phase 2: Budget Controls
  daily_min_spend_target: z.coerce.number()
    .positive()
    .optional()
    .describe('Meta mínima de gasto diário em centavos (CBO).'),
  daily_spend_cap: z.coerce.number()
    .positive()
    .optional()
    .describe('Limite máximo de gasto diário em centavos (CBO).'),
  // Phase 3: Value Rules
  value_rule_set_id: z
    .coerce.string()
    .optional()
    .describe('ID do value rule set para aplicar regras de valor às conversões.'),
  value_rules_applied: z
    .boolean()
    .optional()
    .describe('Habilitar regras de valor aplicadas ao ad set.'),
  // Phase 4: DSA Compliance
  dsa_beneficiary: z
    .string()
    .optional()
    .describe('Beneficiário DSA (EU Digital Services Act compliance).'),
  dsa_payor: z
    .string()
    .optional()
    .describe('Pagador DSA (EU Digital Services Act compliance).'),
  // Phase 4: Ad Labels
  adlabels: z
    .array(z.object({ id: z.string() }))
    .optional()
    .describe('Labels para associar ao ad set.'),
});

export const updateAdsetSchema = z.object({
  adset_id: z.string().min(1).describe('ID do ad set'),
  name: z.string().min(1).optional().describe('Novo nome'),
  status: z.enum(['ACTIVE', 'PAUSED']).optional().describe('Novo status'),
  daily_budget: z.coerce.number().positive().optional().describe('Novo orçamento diário em centavos'),
  lifetime_budget: z.coerce.number().positive().optional().describe('Novo orçamento vitalício em centavos'),
  targeting: z.record(z.string(), z.unknown()).optional().describe('Nova especificação de targeting'),
  bid_strategy: adsetBidStrategyEnum.optional().describe('Nova estratégia de lance. Nota: BID_CAP é apenas para campanhas; em ad sets use LOWEST_COST_WITH_BID_CAP.'),
  bid_amount: z.coerce.number().positive().optional().describe('Novo valor do lance em centavos'),
  bid_constraints: z.record(z.string(), z.unknown()).optional().describe('Novas restrições de lance. Ex: {"roas_average_floor": 2.0}. Requer optimization_goal=VALUE.'),
  start_time: z.string().optional().describe('Nova data/hora de início (ISO 8601)'),
  end_time: z.string().optional().describe('Nova data/hora de fim (ISO 8601)'),
  optimization_goal: optimizationGoalEnum.optional().describe('Novo objetivo de otimização'),
  promoted_object: promotedObjectSchema.optional().describe('Novo objeto promovido'),
  attribution_spec: z.array(attributionSpecItemSchema).optional().describe('Nova especificação de atribuição'),
  // Phase 3: Value Rules
  value_rule_set_id: z.string().optional().describe('ID do value rule set'),
  value_rules_applied: z.boolean().optional().describe('Habilitar regras de valor'),
  // Phase 4: DSA Compliance
  dsa_beneficiary: z.string().optional().describe('Beneficiário DSA'),
  dsa_payor: z.string().optional().describe('Pagador DSA'),
  // Phase 4: Ad Labels
  adlabels: z.array(z.object({ id: z.string() })).optional().describe('Labels para associar'),
});

export const getAdsetSchema = z.object({
  adset_id: z.string().min(1).describe('ID do ad set'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, status, campaign_id, daily_budget, targeting, is_incremental_attribution_enabled, attribution_spec). NOTA: excluded_custom_audiences é write-only e não pode ser lido via GET.'),
});

export const pauseAdsetSchema = z.object({
  adset_id: z.string().min(1).describe('ID do ad set'),
});

export const activateAdsetSchema = z.object({
  adset_id: z.string().min(1).describe('ID do ad set'),
});

// ==================== SCHEMAS DE ADS ====================

export const listAdsSchema = z.object({
  account_id: accountIdField,
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, status, adset_id, effective_status)'),
});

export const listCampaignAdsSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, status, effective_status, adset_id, creative)'),
});

export const getAdSchema = z.object({
  ad_id: z.string().min(1).describe('ID do anúncio'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, status, effective_status, adset_id, creative, created_time)'),
});

export const createAdSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome do anúncio'),
  adset_id: z.string().min(1).describe('ID do ad set pai'),
  creative_id: z.string().min(1).describe('ID do criativo a usar'),
  status: z.enum(['PAUSED', 'ACTIVE']).default('PAUSED').describe('Status inicial'),
  tracking_specs: z
    .array(z.record(z.string(), z.unknown()))
    .optional()
    .describe('Especificações de rastreamento. Ex: [{"action.type": "offsite_conversion", "fb_pixel": "PIXEL_ID"}]'),
  ad_schedule_start_time: z
    .string()
    .optional()
    .describe('Data/hora de início do agendamento do ad (ISO 8601). Apenas para campanhas Sales/App.'),
  ad_schedule_end_time: z
    .string()
    .optional()
    .describe('Data/hora de fim do agendamento do ad (ISO 8601). Apenas para campanhas Sales/App.'),
  conversion_domain: z
    .string()
    .optional()
    .describe('Domínio de conversão (1st+2nd level). Ex: "example.com"'),
  adlabels: z
    .array(z.object({ id: z.string() }))
    .optional()
    .describe('Labels para associar ao anúncio'),
});

export const updateAdSchema = z.object({
  ad_id: z.string().min(1).describe('ID do anúncio'),
  name: z.string().min(1).optional().describe('Novo nome'),
  status: z.enum(['ACTIVE', 'PAUSED']).optional().describe('Novo status'),
  creative: z.object({ creative_id: z.string() }).optional().describe('Trocar criativo sem recriar o ad. Ex: {"creative_id": "NEW_ID"}'),
  tracking_specs: z.array(z.record(z.string(), z.unknown())).optional().describe('Novas especificações de rastreamento'),
  conversion_domain: z.string().optional().describe('Novo domínio de conversão'),
  adlabels: z.array(z.object({ id: z.string() })).optional().describe('Labels para associar'),
});

export const pauseAdSchema = z.object({
  ad_id: z.string().min(1).describe('ID do anúncio'),
});

export const activateAdSchema = z.object({
  ad_id: z.string().min(1).describe('ID do anúncio'),
});

// ==================== SCHEMAS DE CRIATIVOS ====================

export const listCreativesSchema = z.object({
  account_id: accountIdField,
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, object_story_spec, thumbnail_url)'),
});

export const getCreativeSchema = z.object({
  creative_id: z.string().min(1).describe('ID do criativo'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, object_story_spec, thumbnail_url, effective_object_story_id)'),
});

// Schema para child_attachments (carousel cards)
const childAttachmentSchema = z.object({
  link: z.string().describe('URL de destino do card'),
  picture: z.string().optional().describe('URL da imagem do card'),
  image_hash: z.string().optional().describe('Hash da imagem (de upload_image)'),
  video_id: z.string().optional().describe('ID do vídeo (de upload_video)'),
  name: z.string().optional().describe('Título do card'),
  description: z.string().optional().describe('Descrição do card'),
  call_to_action: z.object({
    type: z.string().describe('Tipo do CTA'),
    value: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
}).passthrough();

// Schema detalhado para object_story_spec
const linkDataSchema = z.object({
  link: z.string().url().describe('URL de destino'),
  message: z.string().optional().describe('Texto do post'),
  name: z.string().optional().describe('Título do anúncio'),
  description: z.string().optional().describe('Descrição'),
  image_hash: z.string().optional().describe('Hash da imagem (de upload_image)'),
  image_url: z.string().optional().describe('URL externa da imagem'),
  call_to_action: z.object({
    type: z.string().describe('Tipo do CTA (LEARN_MORE, SHOP_NOW, SIGN_UP, etc.)'),
    value: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
  // Carousel fields
  child_attachments: z.array(childAttachmentSchema).optional().describe('Cards do carrossel (2-10 cards). Cada card tem link, image_hash/picture, name, description.'),
  multi_share_end_card: z.boolean().optional().describe('Mostrar card final com página (default: true para carrossel)'),
  multi_share_optimized: z.boolean().optional().describe('Otimizar ordem dos cards automaticamente (default: true)'),
}).passthrough();

// Schema para video_data
const videoDataSchema = z.object({
  video_id: z.string().describe('ID do vídeo (de upload_video)'),
  image_hash: z.string().optional().describe('Hash da imagem de thumbnail'),
  image_url: z.string().optional().describe('URL da imagem de thumbnail'),
  message: z.string().optional().describe('Texto do post'),
  title: z.string().optional().describe('Título do vídeo'),
  link_description: z.string().optional().describe('Descrição do link'),
  call_to_action: z.object({
    type: z.string().describe('Tipo do CTA'),
    value: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
}).passthrough();

const objectStorySpecSchema = z.object({
  page_id: z.string().min(1).describe('ID da página do Facebook'),
  instagram_user_id: z.string().optional().describe('ID do Instagram (obter via get_instagram_account)'),
  link_data: linkDataSchema.optional(),
  video_data: videoDataSchema.optional().describe('Dados de vídeo para Video Ad. Requer video_id de upload_video.'),
  photo_data: z.record(z.string(), z.unknown()).optional(),
  page_welcome_message: z.string().optional().describe('Mensagem de boas-vindas para Click-to-WhatsApp/Messenger ads'),
}).passthrough();

// Schema para creative_features_spec (Advantage+ Creative)
const creativeFeatureSchema = z.object({
  enroll_status: z.enum(['OPT_IN', 'OPT_OUT']).describe('Status de ativação da feature'),
}).passthrough();

// Schema para asset_feed_spec (Dynamic Creative)
const assetFeedSpecSchema = z.object({
  images: z.array(z.object({ hash: z.string().optional(), url: z.string().optional() }).passthrough()).optional().describe('Array de imagens para DCO'),
  videos: z.array(z.object({ video_id: z.string(), thumbnail_hash: z.string().optional(), thumbnail_url: z.string().optional() }).passthrough()).optional().describe('Array de vídeos para DCO'),
  bodies: z.array(z.object({ text: z.string() })).optional().describe('Array de textos do corpo para DCO'),
  titles: z.array(z.object({ text: z.string() })).optional().describe('Array de títulos para DCO'),
  descriptions: z.array(z.object({ text: z.string() })).optional().describe('Array de descrições para DCO'),
  call_to_action_types: z.array(z.string()).optional().describe('Array de tipos de CTA para DCO'),
  link_urls: z.array(z.object({ website_url: z.string() })).optional().describe('Array de URLs de destino para DCO'),
  ad_formats: z.array(z.string()).optional().describe('Formatos de anúncio para DCO'),
}).passthrough();

export const createCreativeSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome do criativo'),
  object_story_spec: objectStorySpecSchema.optional().describe('Especificação do criativo. Use para Link Ads, Video Ads, Carousel Ads.'),
  object_story_id: z.string().optional().describe('ID de post existente para promover (formato: PAGE_ID_POST_ID). Alternativa a object_story_spec.'),
  image_hash: z.string().optional().describe('Hash da imagem (de upload_image). Para uso top-level.'),
  image_url: z.string().url().optional().describe('URL externa da imagem. Para uso top-level.'),
  url_tags: z.string().optional().describe('Parâmetros UTM automáticos. Ex: "utm_source=facebook&utm_medium=cpc"'),
  asset_feed_spec: assetFeedSpecSchema.optional().describe('Especificação de assets para Dynamic Creative (DCO). Requer is_dynamic_creative=true no ad set.'),
  platform_customizations: z.record(z.string(), z.unknown()).optional().describe('Customizações por plataforma. Ex: imagem diferente para Instagram vs Facebook.'),
  creative_features_spec: z.object({
    image_touchups: creativeFeatureSchema.optional().describe('Auto crop/expand para placements'),
    image_background_gen: creativeFeatureSchema.optional().describe('Backgrounds gerados por IA'),
    image_templates: creativeFeatureSchema.optional().describe('Overlays de texto gerados por IA'),
    text_optimizations: creativeFeatureSchema.optional().describe('Texto dinâmico otimizado'),
    enhance_cta: creativeFeatureSchema.optional().describe('CTA aprimorado'),
    image_uncrop: creativeFeatureSchema.optional().describe('Expansão de imagem por IA'),
    video_auto_crop: creativeFeatureSchema.optional().describe('Vídeo auto crop/expand'),
    media_type_automation: creativeFeatureSchema.optional().describe('Mídia dinâmica (vídeo/imagens)'),
    description_automation: creativeFeatureSchema.optional().describe('Descrições dinâmicas'),
  }).passthrough().optional().describe('Advantage+ Creative features. Configure para habilitar otimizações de IA nos criativos.'),
});

// ==================== SCHEMAS DE INSIGHTS ====================

const timeRangeSchema = z.object({
  since: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('Data inicial (YYYY-MM-DD)'),
  until: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('Data final (YYYY-MM-DD)'),
});

const datePresetSchema = z.enum([
  'today',
  'yesterday',
  'last_7d',
  'last_14d',
  'last_30d',
  'this_month',
  'last_month',
  'this_quarter',
  'last_quarter',
  'this_year',
  'last_year',
]);

// Schema para janelas de atribuicao
const attributionWindowsSchema = z.array(
  z.enum([
    '1d_click',     // 1 dia apos clique
    '7d_click',     // 7 dias apos clique
    '28d_click',    // 28 dias apos clique
    '1d_view',      // 1 dia apos visualizacao
    '7d_view',      // 7 dias apos visualizacao
    '28d_view',     // 28 dias apos visualizacao
    '1d_ev',        // 1 dia engaged view
    'incrementality', // Atribuicao incremental (conversoes que nao teriam acontecido sem o anuncio)
    'dda',          // Data-driven attribution
  ])
).describe(`Janelas de atribuicao para quebrar metricas de conversao.
Cada action retorna com breakdown por janela:
- value: total com atribuicao padrao
- 1d_click: conversoes 1 dia apos clique
- 7d_click: conversoes 7 dias apos clique
- incrementality: conversoes incrementais (modelo causal da Meta)`);

export const getAccountInsightsSchema = z.object({
  account_id: accountIdField,
  date_preset: datePresetSchema.optional().describe('Período predefinido'),
  time_range: timeRangeSchema.optional().describe('Intervalo de datas personalizado'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Métricas a retornar (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)'),
  action_attribution_windows: attributionWindowsSchema.optional(),
  use_unified_attribution_setting: z.boolean().optional().describe(
    'Se false, permite especificar janelas de atribuicao manualmente. Default: true (usa config do ad set)'
  ),
});

export const getCampaignInsightsSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
  date_preset: datePresetSchema.optional().describe('Período predefinido'),
  time_range: timeRangeSchema.optional(),
  fields: z.array(z.string()).optional().describe('Métricas a retornar (inclua actions e cost_per_action_type para conversões)'),
  action_attribution_windows: attributionWindowsSchema.optional(),
  use_unified_attribution_setting: z.boolean().optional().describe(
    'Se false, permite especificar janelas de atribuicao manualmente'
  ),
});

export const getAdsetInsightsSchema = z.object({
  adset_id: z.string().min(1).describe('ID do ad set'),
  date_preset: datePresetSchema.optional().describe('Período predefinido'),
  time_range: timeRangeSchema.optional(),
  fields: z.array(z.string()).optional().describe('Métricas a retornar (inclua actions e cost_per_action_type para conversões)'),
  action_attribution_windows: attributionWindowsSchema.optional(),
  use_unified_attribution_setting: z.boolean().optional().describe(
    'Se false, permite especificar janelas de atribuicao manualmente'
  ),
});

export const getAdInsightsSchema = z.object({
  ad_id: z.string().min(1).describe('ID do anúncio'),
  date_preset: datePresetSchema.optional().describe('Período predefinido'),
  time_range: timeRangeSchema.optional().describe('Intervalo de datas personalizado'),
  fields: z
    .array(z.string())
    .optional()
    .describe('Métricas a retornar (impressions, clicks, spend, reach, cpc, cpm, ctr, actions, cost_per_action_type)'),
  action_attribution_windows: attributionWindowsSchema.optional(),
  use_unified_attribution_setting: z.boolean().optional().describe(
    'Se false, permite especificar janelas de atribuicao manualmente'
  ),
});

export const getAttributionComparisonSchema = z.object({
  object_id: z.string().min(1).describe('ID do objeto (ad, adset ou campaign)'),
  object_type: z.enum(['ad', 'adset', 'campaign']).describe('Tipo do objeto'),
  date_preset: datePresetSchema.optional().default('last_30d').describe('Período (default: last_30d)'),
  time_range: timeRangeSchema.optional(),
  actions: z
    .array(z.string())
    .optional()
    .default(['purchase', 'lead', 'initiate_checkout'])
    .describe('Tipos de conversao para comparar (default: purchase, lead, initiate_checkout)'),
});

export const getPerformanceSummarySchema = z.object({
  account_id: accountIdField,
  date_preset: datePresetSchema.optional().default('last_30d').describe('Período (default: last_30d)'),
  time_range: timeRangeSchema.optional(),
  action_types: z
    .array(z.string())
    .optional()
    .default(['purchase'])
    .describe('Tipos de conversao para analisar (default: purchase). Ex: ["purchase", "lead"]'),
});

export const listCampaignAdsWithInsightsSchema = z.object({
  account_id: accountIdField,
  campaign_id: z.string().min(1).describe('ID da campanha'),
  date_preset: datePresetSchema.optional().default('last_30d').describe('Período (default: last_30d)'),
  time_range: timeRangeSchema.optional(),
  fields: z
    .array(z.string())
    .optional()
    .default(['spend', 'impressions', 'clicks', 'actions', 'cost_per_action_type'])
    .describe('Métricas de insights a retornar'),
  action_attribution_windows: attributionWindowsSchema.optional().describe(
    'Janelas de atribuição para quebrar métricas de conversão'
  ),
});

// ==================== SCHEMAS DE AUDIÊNCIAS ====================

export const listCustomAudiencesSchema = z.object({
  account_id: accountIdField,
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
});

export const createCustomAudienceSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome da audiência'),
  subtype: z
    .enum(['CUSTOM', 'WEBSITE', 'APP', 'OFFLINE_CONVERSION', 'LOOKALIKE', 'ENGAGEMENT'])
    .describe('Subtipo da audiência'),
  description: z.string().optional().describe('Descrição da audiência'),
  customer_file_source: z
    .enum(['USER_PROVIDED_ONLY', 'PARTNER_PROVIDED_ONLY', 'BOTH_USER_AND_PARTNER_PROVIDED'])
    .optional()
    .describe('Fonte dos dados (obrigatório para subtype CUSTOM). USER_PROVIDED_ONLY = dados próprios'),
  rule: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('Regra de audiência (obrigatório para WEBSITE, APP, ENGAGEMENT). Ex: {"inclusions":{"operator":"or","rules":[{"event_sources":[{"id":"PIXEL_ID"}],"retention_seconds":2592000}]}}'),
  pixel_id: z
    .string()
    .optional()
    .describe('ID do pixel (para audiências WEBSITE)'),
  prefill: z
    .boolean()
    .optional()
    .describe('Preencher com dados históricos (default: true)'),
});

export const getReachEstimateSchema = z.object({
  account_id: accountIdField,
  targeting_spec: z.record(z.string(), z.unknown()).describe('Especificação de targeting'),
});

// ==================== PIXELS ====================

export const listPixelsSchema = z.object({
  account_id: accountIdField,
  fields: z
    .array(z.string())
    .optional()
    .describe('Campos a retornar (default: id, name, last_fired_time, is_created_by_business)'),
});

// ==================== GEOLOCALIZAÇÃO ====================

export const searchGeolocationSchema = z.object({
  q: z.string().min(1).describe('Termo de busca (ex: "São Paulo", "Brasil", "California")'),
  location_types: z
    .array(z.enum(['country', 'region', 'city', 'zip', 'geo_market', 'electoral_district']))
    .optional()
    .describe('Tipos de localização para filtrar (default: todos). Ex: ["region", "city"]'),
  country_code: z
    .string()
    .optional()
    .describe('Código do país para filtrar (ex: "BR", "US")'),
  limit: z.coerce.number()
    .min(1)
    .max(100)
    .optional()
    .describe('Número máximo de resultados (default: 25)'),
});

// ==================== API CUSTOMIZADA ====================

export const executeApiSchema = z.object({
  account_id: accountIdField.optional(),
  method: z.enum(['GET', 'POST', 'DELETE']).describe('Método HTTP'),
  endpoint: z.string().min(1).describe('Endpoint da API (ex: "123456789/copies")'),
  params: z.record(z.string(), z.unknown()).optional().describe('Parâmetros da requisição'),
});

// ==================== SCHEMAS DE VÍDEO (Phase 2) ====================

export const uploadVideoSchema = z.object({
  account_id: accountIdField,
  file_url: z.string().url().describe('URL do vídeo para upload. O vídeo será baixado e enviado para a conta de anúncios.'),
  title: z.string().optional().describe('Título do vídeo'),
  description: z.string().optional().describe('Descrição do vídeo'),
});

export const getVideoStatusSchema = z.object({
  video_id: z.string().min(1).describe('ID do vídeo para verificar status de processamento'),
});

// ==================== SCHEMAS DE VALUE RULES (Phase 3) ====================

export const createValueRuleSetSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome do value rule set'),
  rules: z.array(z.record(z.string(), z.unknown())).describe('Array de regras de valor. Cada regra: {name, adjust_sign: "INCREASE"|"DECREASE", adjust_value: 1-1000, criterias: [{criteria_type: "AGE"|"GENDER"|"LOCATION"|"OS_TYPE"|"DEVICE_PLATFORM"|"PLACEMENT", operator: "CONTAINS", criteria_values: [...], criteria_value_types: [...]}]}'),
});

export const listValueRuleSetsSchema = z.object({
  account_id: accountIdField,
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
});

export const getValueRuleSetSchema = z.object({
  value_rule_set_id: z.string().min(1).describe('ID do value rule set'),
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
});

export const updateValueRuleSetSchema = z.object({
  value_rule_set_id: z.string().min(1).describe('ID do value rule set'),
  name: z.string().optional().describe('Novo nome'),
  rules: z.array(z.record(z.string(), z.unknown())).optional().describe('Novas regras de valor'),
});

export const deleteValueRuleSetSchema = z.object({
  value_rule_set_id: z.string().min(1).describe('ID do value rule set a deletar'),
});

// ==================== SCHEMAS DE AD LABELS (Phase 4) ====================

export const createAdLabelSchema = z.object({
  account_id: accountIdField,
  name: z.string().min(1).describe('Nome do label'),
});

export const listAdLabelsSchema = z.object({
  account_id: accountIdField,
  fields: z.array(z.string()).optional().describe('Campos a retornar'),
});

// ==================== SCHEMAS DE CREATIVE PREVIEW (Phase 4) ====================

export const previewCreativeSchema = z.object({
  creative_id: z.string().min(1).describe('ID do criativo'),
  ad_format: z.enum([
    'DESKTOP_FEED_STANDARD',
    'MOBILE_FEED_STANDARD',
    'MOBILE_FEED_BASIC',
    'INSTAGRAM_STANDARD',
    'INSTAGRAM_STORY',
    'INSTAGRAM_REELS',
    'RIGHT_COLUMN_STANDARD',
    'MARKETPLACE_MOBILE',
    'AUDIENCE_NETWORK_OUTSTREAM_VIDEO',
  ]).describe('Formato do preview'),
});

// ==================== SCHEMAS DE BUDGET SCHEDULE (Phase 4) ====================

export const createBudgetScheduleSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
  budget_value: z.coerce.number().positive().describe('Valor do orçamento em centavos para o período de alta demanda'),
  budget_value_type: z.enum(['ABSOLUTE', 'MULTIPLIER']).default('ABSOLUTE').describe('Tipo do valor: ABSOLUTE (centavos) ou MULTIPLIER'),
  time_start: z.string().describe('Data/hora de início (ISO 8601)'),
  time_end: z.string().describe('Data/hora de fim (ISO 8601)'),
});

export const getBudgetSchedulesSchema = z.object({
  campaign_id: z.string().min(1).describe('ID da campanha'),
});

export const updateBudgetScheduleSchema = z.object({
  budget_schedule_id: z.string().min(1).describe('ID do budget schedule'),
  budget_value: z.coerce.number().positive().optional().describe('Novo valor do orçamento'),
  time_start: z.string().optional().describe('Nova data/hora de início'),
  time_end: z.string().optional().describe('Nova data/hora de fim'),
});

export const deleteBudgetScheduleSchema = z.object({
  budget_schedule_id: z.string().min(1).describe('ID do budget schedule a deletar'),
});

// ==================== TYPES ====================

// Descoberta
export type DiscoverAdAccountsArgs = z.infer<typeof discoverAdAccountsSchema>;
export type ListFacebookPagesArgs = z.infer<typeof listFacebookPagesSchema>;
export type GetInstagramAccountArgs = z.infer<typeof getInstagramAccountSchema>;

// Campanhas
export type ListCampaignsArgs = z.infer<typeof listCampaignsSchema>;
export type GetCampaignArgs = z.infer<typeof getCampaignSchema>;
export type CreateCampaignArgs = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignArgs = z.infer<typeof updateCampaignSchema>;
export type PauseCampaignArgs = z.infer<typeof pauseCampaignSchema>;
export type ActivateCampaignArgs = z.infer<typeof activateCampaignSchema>;

export type ListAdsetsArgs = z.infer<typeof listAdsetsSchema>;
export type GetAdsetArgs = z.infer<typeof getAdsetSchema>;
export type CreateAdsetArgs = z.infer<typeof createAdsetSchema>;
export type UpdateAdsetArgs = z.infer<typeof updateAdsetSchema>;
export type PauseAdsetArgs = z.infer<typeof pauseAdsetSchema>;
export type ActivateAdsetArgs = z.infer<typeof activateAdsetSchema>;

export type ListAdsArgs = z.infer<typeof listAdsSchema>;
export type ListCampaignAdsArgs = z.infer<typeof listCampaignAdsSchema>;
export type GetAdArgs = z.infer<typeof getAdSchema>;
export type CreateAdArgs = z.infer<typeof createAdSchema>;
export type UpdateAdArgs = z.infer<typeof updateAdSchema>;
export type PauseAdArgs = z.infer<typeof pauseAdSchema>;
export type ActivateAdArgs = z.infer<typeof activateAdSchema>;

export type ListCreativesArgs = z.infer<typeof listCreativesSchema>;
export type GetCreativeArgs = z.infer<typeof getCreativeSchema>;
export type CreateCreativeArgs = z.infer<typeof createCreativeSchema>;

export type GetAccountInsightsArgs = z.infer<typeof getAccountInsightsSchema>;
export type GetCampaignInsightsArgs = z.infer<typeof getCampaignInsightsSchema>;
export type GetAdsetInsightsArgs = z.infer<typeof getAdsetInsightsSchema>;
export type GetAdInsightsArgs = z.infer<typeof getAdInsightsSchema>;
export type GetAttributionComparisonArgs = z.infer<typeof getAttributionComparisonSchema>;
export type GetPerformanceSummaryArgs = z.infer<typeof getPerformanceSummarySchema>;
export type ListCampaignAdsWithInsightsArgs = z.infer<typeof listCampaignAdsWithInsightsSchema>;

export type ListCustomAudiencesArgs = z.infer<typeof listCustomAudiencesSchema>;
export type CreateCustomAudienceArgs = z.infer<typeof createCustomAudienceSchema>;
export type GetReachEstimateArgs = z.infer<typeof getReachEstimateSchema>;

// Pixels
export type ListPixelsArgs = z.infer<typeof listPixelsSchema>;

// Video
export type UploadVideoArgs = z.infer<typeof uploadVideoSchema>;
export type GetVideoStatusArgs = z.infer<typeof getVideoStatusSchema>;

// Value Rules
export type CreateValueRuleSetArgs = z.infer<typeof createValueRuleSetSchema>;
export type ListValueRuleSetsArgs = z.infer<typeof listValueRuleSetsSchema>;
export type GetValueRuleSetArgs = z.infer<typeof getValueRuleSetSchema>;
export type UpdateValueRuleSetArgs = z.infer<typeof updateValueRuleSetSchema>;
export type DeleteValueRuleSetArgs = z.infer<typeof deleteValueRuleSetSchema>;

// Ad Labels
export type CreateAdLabelArgs = z.infer<typeof createAdLabelSchema>;
export type ListAdLabelsArgs = z.infer<typeof listAdLabelsSchema>;

// Creative Preview
export type PreviewCreativeArgs = z.infer<typeof previewCreativeSchema>;

// Budget Schedule
export type CreateBudgetScheduleArgs = z.infer<typeof createBudgetScheduleSchema>;
export type GetBudgetSchedulesArgs = z.infer<typeof getBudgetSchedulesSchema>;
export type UpdateBudgetScheduleArgs = z.infer<typeof updateBudgetScheduleSchema>;
export type DeleteBudgetScheduleArgs = z.infer<typeof deleteBudgetScheduleSchema>;

// Upload de Imagem
export const uploadImageSchema = z.object({
  account_id: accountIdField,
  image_url: z.string().url().describe('URL da imagem para upload. A imagem será baixada e enviada para a conta de anúncios.'),
});
export type UploadImageArgs = z.infer<typeof uploadImageSchema>;

// Dataset Quality (EMQ)
export const getDatasetQualitySchema = z.object({
  pixel_id: z.string().min(1).describe('ID do pixel/dataset para verificar qualidade. Use list_pixels para obter.'),
});
export type GetDatasetQualityArgs = z.infer<typeof getDatasetQualitySchema>;

// Geolocalização
export type SearchGeolocationArgs = z.infer<typeof searchGeolocationSchema>;

export type ExecuteApiArgs = z.infer<typeof executeApiSchema>;

// ==================== SCHEMAS DE CONTEXTO ====================

export const getSkillSchema = z.object({});
export const getPlaybookSchema = z.object({});

export type GetSkillArgs = z.infer<typeof getSkillSchema>;
export type GetPlaybookArgs = z.infer<typeof getPlaybookSchema>;

// ==================== SCHEMA MAP ====================

export const apiSchemas = {
  // Descoberta
  discover_ad_accounts: discoverAdAccountsSchema,
  list_facebook_pages: listFacebookPagesSchema,
  get_instagram_account: getInstagramAccountSchema,
  // Campaigns
  list_campaigns: listCampaignsSchema,
  get_campaign: getCampaignSchema,
  create_campaign: createCampaignSchema,
  update_campaign: updateCampaignSchema,
  pause_campaign: pauseCampaignSchema,
  activate_campaign: activateCampaignSchema,
  // Ad Sets
  list_adsets: listAdsetsSchema,
  get_adset: getAdsetSchema,
  create_adset: createAdsetSchema,
  update_adset: updateAdsetSchema,
  pause_adset: pauseAdsetSchema,
  activate_adset: activateAdsetSchema,
  // Ads
  list_ads: listAdsSchema,
  list_campaign_ads: listCampaignAdsSchema,
  get_ad: getAdSchema,
  create_ad: createAdSchema,
  update_ad: updateAdSchema,
  pause_ad: pauseAdSchema,
  activate_ad: activateAdSchema,
  // Creatives
  list_creatives: listCreativesSchema,
  get_creative: getCreativeSchema,
  create_creative: createCreativeSchema,
  // Insights
  get_account_insights: getAccountInsightsSchema,
  get_campaign_insights: getCampaignInsightsSchema,
  get_adset_insights: getAdsetInsightsSchema,
  get_ad_insights: getAdInsightsSchema,
  get_attribution_comparison: getAttributionComparisonSchema,
  get_performance_summary: getPerformanceSummarySchema,
  list_campaign_ads_with_insights: listCampaignAdsWithInsightsSchema,
  // Audiences
  list_custom_audiences: listCustomAudiencesSchema,
  create_custom_audience: createCustomAudienceSchema,
  get_reach_estimate: getReachEstimateSchema,
  // Pixels
  list_pixels: listPixelsSchema,
  // Upload de Imagem
  upload_image: uploadImageSchema,
  // Dataset Quality (EMQ)
  get_dataset_quality: getDatasetQualitySchema,
  // Geolocalização
  search_geolocation: searchGeolocationSchema,
  // API Customizada
  execute_api: executeApiSchema,
  // Video
  upload_video: uploadVideoSchema,
  get_video_status: getVideoStatusSchema,
  // Value Rules
  create_value_rule_set: createValueRuleSetSchema,
  list_value_rule_sets: listValueRuleSetsSchema,
  get_value_rule_set: getValueRuleSetSchema,
  update_value_rule_set: updateValueRuleSetSchema,
  delete_value_rule_set: deleteValueRuleSetSchema,
  // Ad Labels
  create_ad_label: createAdLabelSchema,
  list_ad_labels: listAdLabelsSchema,
  // Creative Preview
  preview_creative: previewCreativeSchema,
  // Budget Schedule
  create_budget_schedule: createBudgetScheduleSchema,
  get_budget_schedules: getBudgetSchedulesSchema,
  update_budget_schedule: updateBudgetScheduleSchema,
  delete_budget_schedule: deleteBudgetScheduleSchema,
  // Contexto
  get_skill: getSkillSchema,
  get_playbook: getPlaybookSchema,
} as const;
