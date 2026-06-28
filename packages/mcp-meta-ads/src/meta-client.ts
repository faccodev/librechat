/**
 * Cliente para a API da Meta (Facebook Marketing API)
 *
 * Abstrai chamadas HTTP para a Graph API da Meta.
 */

import { getMetaConfig, getConfigurationError, MetaConfig } from './utils/config.js';
import { getAuthContext } from './utils/auth-context.js';

const META_GRAPH_URL = 'https://graph.facebook.com';

/**
 * Tipos de resposta da API
 */
export interface MetaApiResponse<T = unknown> {
  data?: T;
  error?: MetaApiError;
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

export interface MetaApiError {
  message: string;
  type: string;
  code: number;
  error_subcode?: number;
  error_data?: string;
  error_user_title?: string;
  error_user_msg?: string;
  fbtrace_id?: string;
}

/**
 * Tipos para objetos da API
 */
export interface Campaign {
  id: string;
  name: string;
  status: string;
  objective?: string;
  created_time?: string;
  updated_time?: string;
  daily_budget?: string;
  lifetime_budget?: string;
  [key: string]: unknown;
}

export interface AdSet {
  id: string;
  name: string;
  status: string;
  campaign_id: string;
  daily_budget?: string;
  lifetime_budget?: string;
  targeting?: object;
  [key: string]: unknown;
}

export interface Ad {
  id: string;
  name: string;
  status: string;
  adset_id: string;
  creative?: object;
  [key: string]: unknown;
}

export interface AdCreative {
  id: string;
  name: string;
  object_story_spec?: object;
  [key: string]: unknown;
}

export interface InsightsResult {
  impressions?: string;
  clicks?: string;
  spend?: string;
  reach?: string;
  cpc?: string;
  cpm?: string;
  ctr?: string;
  actions?: Array<{ action_type: string; value: string }>;
  date_start?: string;
  date_stop?: string;
  [key: string]: unknown;
}

export interface CustomAudience {
  id: string;
  name: string;
  subtype: string;
  approximate_count?: number;
  [key: string]: unknown;
}

/**
 * Cliente para a Meta Marketing API
 */
export class MetaClient {
  private config: MetaConfig;

  /**
   * Cria MetaClient com resolução de credenciais:
   * 1. Auth context (HTTP multi-tenant, via AsyncLocalStorage)
   * 2. Env vars / .env (modo stdio)
   */
  constructor() {
    // Prioridade 1: Auth context do request HTTP
    const authCtx = getAuthContext();
    if (authCtx) {
      this.config = {
        accessToken: authCtx.accessToken,
        apiVersion: authCtx.apiVersion || 'v24.0',
      };
      return;
    }

    // Prioridade 2: Env vars (modo stdio)
    const config = getMetaConfig();
    if (!config) {
      throw new Error(getConfigurationError());
    }
    this.config = config;
  }

  /**
   * Verifica se o cliente está configurado (via auth context ou env vars)
   */
  static isConfigured(): boolean {
    return getAuthContext() !== null || getMetaConfig() !== null;
  }

  /**
   * Retorna mensagem de erro de configuração
   */
  static getConfigError(): string {
    return getConfigurationError();
  }

  /**
   * URL base da API
   */
  private get baseUrl(): string {
    return `${META_GRAPH_URL}/${this.config.apiVersion}`;
  }

  /**
   * Faz requisição GET para a API
   */
  async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    url.searchParams.set('access_token', this.config.accessToken);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    let response: Response;
    try {
      response = await fetch(url.toString());
    } catch (networkError) {
      // Erro de rede (DNS, conexão, etc.)
      throw new MetaClientError({
        message: `Erro de rede: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
        type: 'NetworkError',
        code: -1,
      });
    }

    let data: MetaApiResponse<T>;
    try {
      data = (await response.json()) as MetaApiResponse<T>;
    } catch (parseError) {
      // Erro ao fazer parse do JSON
      throw new MetaClientError({
        message: `Erro ao processar resposta (HTTP ${response.status}): ${parseError instanceof Error ? parseError.message : String(parseError)}`,
        type: 'ParseError',
        code: response.status,
      });
    }

    if (data.error) {
      throw new MetaClientError(data.error);
    }

    return data as T;
  }

  /**
   * Faz requisição POST para a API
   */
  async post<T>(endpoint: string, body: Record<string, unknown> = {}): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const formData = new URLSearchParams();
    formData.set('access_token', this.config.accessToken);

    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined && value !== null) {
        formData.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
    } catch (networkError) {
      throw new MetaClientError({
        message: `Erro de rede: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
        type: 'NetworkError',
        code: -1,
      });
    }

    let data: MetaApiResponse<T>;
    try {
      data = (await response.json()) as MetaApiResponse<T>;
    } catch (parseError) {
      throw new MetaClientError({
        message: `Erro ao processar resposta (HTTP ${response.status}): ${parseError instanceof Error ? parseError.message : String(parseError)}`,
        type: 'ParseError',
        code: response.status,
      });
    }

    if (data.error) {
      throw new MetaClientError(data.error);
    }

    return data as T;
  }

  /**
   * Faz requisição DELETE para a API
   */
  async delete(endpoint: string): Promise<{ success: boolean }> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    url.searchParams.set('access_token', this.config.accessToken);

    let response: Response;
    try {
      response = await fetch(url.toString(), { method: 'DELETE' });
    } catch (networkError) {
      throw new MetaClientError({
        message: `Erro de rede: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
        type: 'NetworkError',
        code: -1,
      });
    }

    let data: MetaApiResponse<{ success: boolean }>;
    try {
      data = (await response.json()) as MetaApiResponse<{ success: boolean }>;
    } catch (parseError) {
      throw new MetaClientError({
        message: `Erro ao processar resposta (HTTP ${response.status}): ${parseError instanceof Error ? parseError.message : String(parseError)}`,
        type: 'ParseError',
        code: response.status,
      });
    }

    if (data.error) {
      throw new MetaClientError(data.error);
    }

    return data as { success: boolean };
  }

  // ==================== DESCOBERTA DE RECURSOS ====================

  /**
   * Descobre contas de anúncios do usuário
   * Deve ser a primeira chamada para obter o ID real da conta
   */
  async discoverAdAccounts(
    fields: string[] = ['id', 'name', 'account_status', 'currency', 'timezone_name']
  ): Promise<{ data: Array<{ id: string; name: string; account_status: number; [key: string]: unknown }> }> {
    return this.get('me/adaccounts', { fields: fields.join(',') });
  }

  /**
   * Lista páginas do Facebook do usuário
   * Necessário para obter page_id para criar criativos
   */
  async listFacebookPages(
    fields: string[] = ['id', 'name', 'access_token', 'category']
  ): Promise<{ data: Array<{ id: string; name: string; access_token?: string; [key: string]: unknown }> }> {
    return this.get('me/accounts', { fields: fields.join(',') });
  }

  /**
   * Obtém conta do Instagram vinculada a uma página
   * Retorna o ID correto do Instagram (formato novo) para usar em criativos
   */
  async getInstagramAccount(
    pageId: string,
    fields: string[] = ['instagram_business_account', 'connected_instagram_account']
  ): Promise<{
    id: string;
    instagram_business_account?: { id: string };
    connected_instagram_account?: { id: string };
  }> {
    return this.get(pageId, { fields: fields.join(',') });
  }

  // ==================== CAMPANHAS ====================

  /**
   * Lista campanhas da conta
   */
  async listCampaigns(
    accountId: string,
    fields: string[] = ['id', 'name', 'status', 'objective', 'created_time'],
    effectiveStatus?: string[]
  ): Promise<{ data: Campaign[] }> {
    const params: Record<string, string> = {
      fields: fields.join(','),
    };

    // Adiciona filtro por effective_status se especificado
    if (effectiveStatus && effectiveStatus.length > 0) {
      params.filtering = JSON.stringify([{
        field: 'effective_status',
        operator: 'IN',
        value: effectiveStatus,
      }]);
    }

    return this.get<{ data: Campaign[] }>(`${accountId}/campaigns`, params);
  }

  /**
   * Obtém uma campanha específica
   * Inclui campos de orçamento por default para verificar se é CBO
   */
  async getCampaign(
    campaignId: string,
    fields: string[] = ['id', 'name', 'status', 'objective', 'daily_budget', 'lifetime_budget', 'budget_remaining', 'created_time', 'updated_time', 'spend_cap', 'bid_strategy', 'buying_type', 'effective_status', 'special_ad_categories', 'is_adset_budget_sharing_enabled', 'issues_info', 'start_time', 'stop_time']
  ): Promise<Campaign> {
    return this.get<Campaign>(campaignId, { fields: fields.join(',') });
  }

  /**
   * Cria uma nova campanha
   */
  async createCampaign(accountId: string, params: {
    name: string;
    objective: string;
    status?: string;
    special_ad_categories?: string[];
    daily_budget?: number;
    lifetime_budget?: number;
    spend_cap?: number;
    buying_type?: string;
    bid_strategy?: string;
    is_adset_budget_sharing_enabled?: boolean;
    start_time?: string;
    stop_time?: string;
    is_skadnetwork_attribution?: boolean;
    promoted_object?: object;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/campaigns`, {
      ...params,
      special_ad_categories: params.special_ad_categories || [],
      // Campo obrigatório a partir da v24.0 para campanhas sem CBO
      is_adset_budget_sharing_enabled: params.is_adset_budget_sharing_enabled ?? false,
    });
  }

  /**
   * Atualiza uma campanha
   */
  async updateCampaign(
    campaignId: string,
    params: {
      name?: string;
      status?: string;
      daily_budget?: number;
      lifetime_budget?: number;
      spend_cap?: number;
      bid_strategy?: string;
      is_adset_budget_sharing_enabled?: boolean;
      special_ad_categories?: string[];
      start_time?: string;
      stop_time?: string;
    }
  ): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(campaignId, params);
  }

  // ==================== AD SETS ====================

  /**
   * Lista ad sets da conta
   */
  async listAdSets(
    accountId: string,
    fields: string[] = ['id', 'name', 'status', 'campaign_id', 'daily_budget'],
    effectiveStatus?: string[]
  ): Promise<{ data: AdSet[] }> {
    const params: Record<string, string> = {
      fields: fields.join(','),
    };

    // Adiciona filtro por effective_status se especificado
    if (effectiveStatus && effectiveStatus.length > 0) {
      params.filtering = JSON.stringify([{
        field: 'effective_status',
        operator: 'IN',
        value: effectiveStatus,
      }]);
    }

    return this.get<{ data: AdSet[] }>(`${accountId}/adsets`, params);
  }

  /**
   * Obtém um ad set específico
   */
  async getAdSet(
    adsetId: string,
    fields: string[] = ['id', 'name', 'status', 'campaign_id', 'daily_budget', 'targeting', 'is_incremental_attribution_enabled', 'attribution_spec', 'effective_status', 'issues_info', 'created_time', 'updated_time', 'lifetime_budget', 'destination_type', 'learning_stage_info', 'promoted_object', 'optimization_goal', 'billing_event', 'bid_strategy']
  ): Promise<AdSet> {
    return this.get<AdSet>(adsetId, { fields: fields.join(',') });
  }

  /**
   * Cria um novo ad set
   */
  async createAdSet(accountId: string, params: {
    name: string;
    campaign_id: string;
    billing_event: string;
    optimization_goal: string;
    bid_amount?: number;
    bid_strategy?: string;
    bid_constraints?: object;
    daily_budget?: number;
    lifetime_budget?: number;
    targeting: object;
    status?: string;
    start_time?: string;
    end_time?: string;
    promoted_object?: {
      pixel_id?: string;
      custom_event_type?: string;
      application_id?: string;
      object_store_url?: string;
      page_id?: string;
      event_id?: string;
      custom_conversion_id?: string;
      offline_conversion_data_set_id?: string;
      product_set_id?: string;
    };
    attribution_spec?: Array<{
      event_type: string;
      window_days: number;
    }>;
    is_incremental_attribution_enabled?: boolean;
    excluded_custom_audiences?: Array<{ id: string }>;
    destination_type?: string;
    is_dynamic_creative?: boolean;
    adset_schedule?: Array<{
      start_minute: number;
      end_minute: number;
      days: number[];
      timezone_type?: string;
    }>;
    pacing_type?: string[];
    frequency_control_specs?: Array<{
      event: string;
      interval_days: number;
      max_frequency: number;
    }>;
    daily_min_spend_target?: number;
    daily_spend_cap?: number;
    value_rule_set_id?: string;
    value_rules_applied?: boolean;
    dsa_beneficiary?: string;
    dsa_payor?: string;
    adlabels?: Array<{ id: string }>;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/adsets`, {
      ...params,
      // Campo obrigatório a partir da v24.0
      bid_strategy: params.bid_strategy ?? 'LOWEST_COST_WITHOUT_CAP',
    });
  }

  /**
   * Atualiza um ad set
   */
  async updateAdSet(
    adsetId: string,
    params: {
      name?: string;
      status?: string;
      daily_budget?: number;
      lifetime_budget?: number;
      targeting?: object;
      bid_strategy?: string;
      bid_amount?: number;
      bid_constraints?: object;
      start_time?: string;
      end_time?: string;
      optimization_goal?: string;
      promoted_object?: object;
      attribution_spec?: Array<{ event_type: string; window_days: number }>;
      value_rule_set_id?: string;
      value_rules_applied?: boolean;
      dsa_beneficiary?: string;
      dsa_payor?: string;
      adlabels?: Array<{ id: string }>;
    }
  ): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(adsetId, params);
  }

  // ==================== ADS ====================

  /**
   * Lista anúncios da conta
   */
  async listAds(accountId: string, fields: string[] = ['id', 'name', 'status', 'adset_id', 'effective_status']): Promise<{ data: Ad[] }> {
    return this.get<{ data: Ad[] }>(`${accountId}/ads`, {
      fields: fields.join(','),
    });
  }

  /**
   * Lista anúncios de uma campanha específica
   */
  async listCampaignAds(
    campaignId: string,
    fields: string[] = ['id', 'name', 'status', 'effective_status', 'adset_id', 'creative']
  ): Promise<{ data: Ad[] }> {
    return this.get<{ data: Ad[] }>(`${campaignId}/ads`, {
      fields: fields.join(','),
    });
  }

  /**
   * Obtém um anúncio específico
   */
  async getAd(
    adId: string,
    fields: string[] = ['id', 'name', 'status', 'effective_status', 'adset_id', 'creative', 'created_time', 'tracking_specs', 'conversion_domain', 'updated_time', 'ad_review_feedback', 'issues_info']
  ): Promise<Ad> {
    return this.get<Ad>(adId, { fields: fields.join(',') });
  }

  /**
   * Cria um novo anúncio
   */
  async createAd(accountId: string, params: {
    name: string;
    adset_id: string;
    creative: { creative_id: string } | object;
    status?: string;
    tracking_specs?: Array<Record<string, unknown>>;
    ad_schedule_start_time?: string;
    ad_schedule_end_time?: string;
    conversion_domain?: string;
    adlabels?: Array<{ id: string }>;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/ads`, params);
  }

  /**
   * Atualiza um anúncio
   */
  async updateAd(
    adId: string,
    params: {
      name?: string;
      status?: string;
      creative?: { creative_id: string };
      tracking_specs?: Array<Record<string, unknown>>;
      conversion_domain?: string;
      adlabels?: Array<{ id: string }>;
    }
  ): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(adId, params);
  }

  // ==================== CRIATIVOS ====================

  /**
   * Lista criativos da conta
   */
  async listCreatives(accountId: string, fields: string[] = ['id', 'name', 'object_story_spec', 'thumbnail_url']): Promise<{ data: AdCreative[] }> {
    return this.get<{ data: AdCreative[] }>(`${accountId}/adcreatives`, {
      fields: fields.join(','),
    });
  }

  /**
   * Obtém um criativo específico
   */
  async getCreative(
    creativeId: string,
    fields: string[] = ['id', 'name', 'object_story_spec', 'thumbnail_url', 'effective_object_story_id', 'url_tags', 'image_hash', 'image_url', 'object_story_id', 'body', 'title', 'link_url']
  ): Promise<AdCreative> {
    return this.get<AdCreative>(creativeId, { fields: fields.join(',') });
  }

  /**
   * Cria um novo criativo
   */
  async createCreative(accountId: string, params: {
    name: string;
    object_story_spec?: object;
    object_story_id?: string;
    image_hash?: string;
    image_url?: string;
    url_tags?: string;
    asset_feed_spec?: object;
    degrees_of_freedom_spec?: object;
    creative_features_spec?: object;
    platform_customizations?: object;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/adcreatives`, params);
  }

  // ==================== UPLOAD DE IMAGEM ====================

  /**
   * Faz upload de uma imagem via URL para a conta de anúncios.
   * Fluxo: download da URL → conversão para base64 → POST com parâmetro 'bytes'.
   * A API da Meta aceita APENAS 'bytes' (base64) ou 'copy_from', NÃO aceita URL direta.
   */
  async uploadImageFromUrl(accountId: string, imageUrl: string): Promise<unknown> {
    // 1. Download da imagem
    let imageResponse: Response;
    try {
      imageResponse = await fetch(imageUrl);
    } catch (networkError) {
      throw new MetaClientError({
        message: `Erro ao baixar imagem da URL: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
        type: 'NetworkError',
        code: -1,
      });
    }

    if (!imageResponse.ok) {
      throw new MetaClientError({
        message: `Erro ao baixar imagem: HTTP ${imageResponse.status} ${imageResponse.statusText}. Verifique se a URL é acessível publicamente.`,
        type: 'ImageDownloadError',
        code: imageResponse.status,
      });
    }

    // 2. Converter para base64
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    if (base64Data.length === 0) {
      throw new MetaClientError({
        message: 'Imagem vazia após download. Verifique a URL.',
        type: 'ImageDownloadError',
        code: -1,
      });
    }

    // 3. Enviar como 'bytes' (parâmetro correto da API Meta)
    return this.post(`${accountId}/adimages`, {
      bytes: base64Data,
    });
  }

  // ==================== DATASET QUALITY (EMQ) ====================

  /**
   * Consulta a qualidade do dataset (EMQ) de um pixel.
   */
  async getDatasetQuality(pixelId: string): Promise<unknown> {
    return this.get(`dataset_quality`, {
      dataset_id: pixelId,
    });
  }

  // ==================== INSIGHTS ====================

  /**
   * Obtém insights de um objeto (conta, campanha, adset, ad)
   */
  async getInsights(
    objectId: string,
    params: {
      fields?: string[];
      date_preset?: string;
      time_range?: { since: string; until: string };
      level?: string;
      breakdowns?: string[];
      action_attribution_windows?: string[];
      use_unified_attribution_setting?: boolean;
    } = {}
  ): Promise<{ data: InsightsResult[] }> {
    const defaultFields = ['impressions', 'clicks', 'spend', 'reach', 'cpc', 'cpm', 'ctr'];

    const queryParams: Record<string, string> = {
      fields: (params.fields || defaultFields).join(','),
    };

    if (params.date_preset) {
      queryParams.date_preset = params.date_preset;
    }

    if (params.time_range) {
      queryParams.time_range = JSON.stringify(params.time_range);
    }

    if (params.level) {
      queryParams.level = params.level;
    }

    if (params.breakdowns) {
      queryParams.breakdowns = params.breakdowns.join(',');
    }

    // Suporte a janelas de atribuicao para quebrar conversoes
    if (params.action_attribution_windows && params.action_attribution_windows.length > 0) {
      queryParams.action_attribution_windows = JSON.stringify(params.action_attribution_windows);
    }

    // Controla se usa config de atribuicao do ad set ou permite override
    if (params.use_unified_attribution_setting !== undefined) {
      queryParams.use_unified_attribution_setting = String(params.use_unified_attribution_setting);
    }

    return this.get<{ data: InsightsResult[] }>(`${objectId}/insights`, queryParams);
  }

  /**
   * Obtém insights da conta de anúncios
   */
  async getAccountInsights(
    accountId: string,
    params: {
      fields?: string[];
      date_preset?: string;
      time_range?: { since: string; until: string };
      action_attribution_windows?: string[];
      use_unified_attribution_setting?: boolean;
    } = {}
  ): Promise<{ data: InsightsResult[] }> {
    return this.getInsights(accountId, params);
  }

  // ==================== AUDIÊNCIAS ====================

  /**
   * Lista audiências customizadas
   * NOTA: O campo approximate_count foi removido da API v24.0.
   * Use approximate_count_lower_bound e approximate_count_upper_bound se precisar do tamanho.
   */
  async listCustomAudiences(
    accountId: string,
    fields: string[] = ['id', 'name', 'subtype']
  ): Promise<{ data: CustomAudience[] }> {
    return this.get<{ data: CustomAudience[] }>(`${accountId}/customaudiences`, {
      fields: fields.join(','),
    });
  }

  /**
   * Cria uma audiência customizada
   */
  async createCustomAudience(accountId: string, params: {
    name: string;
    subtype: string;
    description?: string;
    customer_file_source?: string;
    rule?: object;
    pixel_id?: string;
    prefill?: boolean;
  }): Promise<{ id: string }> {
    // Construir params, convertendo rule para JSON string se necessário
    const apiParams: Record<string, unknown> = {
      name: params.name,
      subtype: params.subtype,
      ...(params.description && { description: params.description }),
      ...(params.customer_file_source && { customer_file_source: params.customer_file_source }),
      ...(params.rule && { rule: JSON.stringify(params.rule) }),
      ...(params.pixel_id && { pixel_id: params.pixel_id }),
      ...(params.prefill !== undefined && { prefill: params.prefill }),
    };
    return this.post<{ id: string }>(`${accountId}/customaudiences`, apiParams);
  }

  /**
   * Obtém estimativa de alcance
   */
  async getReachEstimate(accountId: string, params: { targeting_spec: object; optimize_for?: string }): Promise<{
    data: {
      users_lower_bound: number;
      users_upper_bound: number;
    };
  }> {
    return this.get(`${accountId}/reachestimate`, {
      targeting_spec: JSON.stringify(params.targeting_spec),
      ...(params.optimize_for && { optimize_for: params.optimize_for }),
    });
  }

  // ==================== PIXELS ====================

  /**
   * Lista pixels da conta de anúncios
   * Essencial para obter pixel_id ao criar ad sets com OFFSITE_CONVERSIONS
   */
  async listPixels(
    accountId: string,
    fields: string[] = ['id', 'name', 'last_fired_time', 'is_created_by_business']
  ): Promise<{ data: Array<{ id: string; name: string; last_fired_time?: string; [key: string]: unknown }> }> {
    return this.get<{ data: Array<{ id: string; name: string; last_fired_time?: string; [key: string]: unknown }> }>(
      `${accountId}/adspixels`,
      { fields: fields.join(',') }
    );
  }

  // ==================== GEOLOCALIZAÇÃO ====================

  /**
   * Busca localizações para targeting
   * IMPORTANTE: Use esta tool para obter os keys corretos de localização!
   * Keys são específicos do Meta e não correspondem a IDs geográficos padrão.
   */
  async searchGeolocation(params: {
    q: string;
    location_types?: string[];
    country_code?: string;
    limit?: number;
  }): Promise<{
    data: Array<{
      key: string;
      name: string;
      type: string;
      country_code?: string;
      country_name?: string;
      region?: string;
      region_id?: number;
      primary_city?: string;
      primary_city_id?: number;
      supports_city?: boolean;
      supports_region?: boolean;
      [key: string]: unknown;
    }>;
  }> {
    const queryParams: Record<string, string> = {
      q: params.q,
      type: 'adgeolocation',
    };

    if (params.location_types && params.location_types.length > 0) {
      queryParams.location_types = JSON.stringify(params.location_types);
    }

    if (params.country_code) {
      queryParams.country_code = params.country_code;
    }

    if (params.limit) {
      queryParams.limit = String(params.limit);
    }

    return this.get('search', queryParams);
  }

  // ==================== VÍDEO ====================

  /**
   * Faz upload de um vídeo via URL
   */
  async uploadVideo(accountId: string, params: {
    file_url: string;
    title?: string;
    description?: string;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/advideos`, params);
  }

  /**
   * Obtém status de processamento de um vídeo
   */
  async getVideoStatus(
    videoId: string,
    fields: string[] = ['id', 'status', 'length', 'source', 'title', 'created_time']
  ): Promise<Record<string, unknown>> {
    return this.get(videoId, { fields: fields.join(',') });
  }

  // ==================== VALUE RULES ====================

  async createValueRuleSet(accountId: string, params: {
    name: string;
    rules: Array<Record<string, unknown>>;
  }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/value_rule_set`, params);
  }

  async listValueRuleSets(
    accountId: string,
    fields: string[] = ['id', 'name', 'rules']
  ): Promise<{ data: Array<Record<string, unknown>> }> {
    return this.get(`${accountId}/value_rule_set`, { fields: fields.join(',') });
  }

  async getValueRuleSet(
    ruleSetId: string,
    fields: string[] = ['id', 'name', 'rules', 'status']
  ): Promise<Record<string, unknown>> {
    return this.get(ruleSetId, { fields: fields.join(',') });
  }

  async updateValueRuleSet(
    ruleSetId: string,
    params: { name?: string; rules?: Array<Record<string, unknown>> }
  ): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(ruleSetId, params);
  }

  async deleteValueRuleSet(ruleSetId: string): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(`${ruleSetId}/delete_rule_set`, {});
  }

  // ==================== AD LABELS ====================

  async createAdLabel(accountId: string, params: { name: string }): Promise<{ id: string }> {
    return this.post<{ id: string }>(`${accountId}/adlabels`, params);
  }

  async listAdLabels(
    accountId: string,
    fields: string[] = ['id', 'name', 'created_time']
  ): Promise<{ data: Array<Record<string, unknown>> }> {
    return this.get(`${accountId}/adlabels`, { fields: fields.join(',') });
  }

  // ==================== CREATIVE PREVIEW ====================

  async previewCreative(
    creativeId: string,
    adFormat: string
  ): Promise<{ data: Array<{ body: string }> }> {
    return this.get(`${creativeId}/previews`, { ad_format: adFormat });
  }

  // ==================== BUDGET SCHEDULE ====================

  async createBudgetSchedule(
    campaignId: string,
    params: { budget_value: number; budget_value_type: string; time_start: string; time_end: string }
  ): Promise<{ id: string }> {
    const apiParams = {
      budget_value: params.budget_value,
      budget_value_type: params.budget_value_type,
      time_start: Math.floor(new Date(params.time_start).getTime() / 1000),
      time_end: Math.floor(new Date(params.time_end).getTime() / 1000),
    };
    return this.post<{ id: string }>(`${campaignId}/budget_schedules`, apiParams);
  }

  async getBudgetSchedules(
    campaignId: string
  ): Promise<{ data: Array<Record<string, unknown>> }> {
    return this.get(`${campaignId}/budget_schedules`, {});
  }

  async updateBudgetSchedule(
    scheduleId: string,
    params: { budget_value?: number; time_start?: string; time_end?: string }
  ): Promise<{ success: boolean }> {
    const apiParams: Record<string, unknown> = {};
    if (params.budget_value !== undefined) apiParams.budget_value = params.budget_value;
    if (params.time_start) apiParams.time_start = Math.floor(new Date(params.time_start).getTime() / 1000);
    if (params.time_end) apiParams.time_end = Math.floor(new Date(params.time_end).getTime() / 1000);
    return this.post<{ success: boolean }>(scheduleId, apiParams);
  }

  async deleteBudgetSchedule(scheduleId: string): Promise<{ success: boolean }> {
    return this.delete(scheduleId);
  }
}

/**
 * Erro customizado para erros da API da Meta
 */
export class MetaClientError extends Error {
  code: number;
  errorSubcode?: number;
  errorData?: string;
  errorUserTitle?: string;
  errorUserMsg?: string;
  fbtraceId?: string;
  type: string;

  constructor(error: MetaApiError) {
    super(error.message);
    this.name = 'MetaClientError';
    this.code = error.code;
    this.errorSubcode = error.error_subcode;
    this.errorData = error.error_data;
    this.errorUserTitle = error.error_user_title;
    this.errorUserMsg = error.error_user_msg;
    this.fbtraceId = error.fbtrace_id;
    this.type = error.type;
  }

  /**
   * Formata o erro para exibição
   */
  toString(): string {
    let msg = `Erro da API Meta (${this.code}): ${this.message}`;
    if (this.errorSubcode) {
      msg += `\nSubcódigo: ${this.errorSubcode}`;
    }
    if (this.errorUserTitle) {
      msg += `\n\n**${this.errorUserTitle}**`;
    }
    if (this.errorUserMsg) {
      msg += `\n${this.errorUserMsg}`;
    }
    if (this.errorData) {
      msg += `\nDados: ${this.errorData}`;
    }
    if (this.fbtraceId) {
      msg += `\n\nFB Trace ID: ${this.fbtraceId}`;
    }
    return msg;
  }
}
