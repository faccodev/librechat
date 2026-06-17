---
title: "Parâmetros - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameters"
scraped_at: "2026-02-01T14:07:19.043Z"
---

# Parâmetros

Todos os parâmetros de dados de evento obrigatórios e outros parâmetros de dados que a API de Conversões precisa usar na otimização da veiculação e/ou na atribuição de anúncios.

Agora a [API de Conversões](/docs/marketing-api/conversions-api) é compatível com eventos de mensagens para empresas, da web, do app e offline.

Os eventos do site compartilhados por meio da API de Conversões exigirão os parâmetros [`client_user_agent`](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#client-user-agent), [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) e [`event_source_url`](/docs/marketing-api/conversions-api/parameters/server-event#event-source-url). Já os eventos que não são da web **precisarão apenas** de [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source). Esses parâmetros ajudam a melhorar a qualidade dos eventos usados na veiculação de anúncios e podem aprimorar o desempenho da campanha.

Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) seja preciso conforme seu conhecimento.

### [Parâmetros de corpo principal](/docs/marketing-api/conversions-api/parameters/main-body)

-   [`data`](/docs/marketing-api/conversions-api/parameters/main-body#data)
    
-   [`test_event_code`](/docs/marketing-api/conversions-api/parameters/main-body#test_event_code)
    

### [Parâmetros de informações do cliente](/docs/marketing-api/server-side-api/parameters/user-data)

-   [`em`: email](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#em) — Hashing obrigatório
    
-   [`ph`: número de telefone](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ph) — Hashing obrigatório
    
-   [`fn`: nome](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#fn) — Hashing obrigatório
    
-   [`ln`: sobrenome](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ln) — Hashing obrigatório
    
-   [`ge`: gênero](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ge) — Hashing obrigatório
    
-   [`db`: data de nascimento](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#db) — Hashing obrigatório
    
-   [`ct`: cidade](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ct) — Hashing obrigatório
    
-   [`st`: estado](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#st) — Hashing obrigatório
    
-   [`zp`: código postal](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#zp) — Hashing obrigatório
    
-   [`country`: país](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#country) — Hashing obrigatório
    
-   [`external_id`: ID externo](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#external-id) — Hashing recomendado
    
-   [`client_ip_address`: endereço IP do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#client-ip-address) — Não converter em hashes
    
-   [`client_user_agent`: agente do usuário do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#client-user-agent) — Não converter em hashes
    
-   [`fbc`: ID do clique](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#fbc) — Não converter em hashes
    
-   [`fbp`: ID do navegador](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#fbp) — Não converter em hashes
    
-   [`subscription_id`: ID da assinatura](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#subscription-id) — Não converter em hashes
    
-   [`fb_login_id`: ID de Login do Facebook](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#fb_login_id) — Não converter em hashes
    
-   [`lead_id`: ID de lead](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#lead_id) — Não converter em hashes
    
-   [`anon_id`: ID de instalação](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#anon_id) — Não converter em hashes (_**observação**: parâmetro válido somente para eventos do app_)
    
-   [`madid`: identificação do anunciante da plataforma móvel](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#madid) — Não converter em hashes (_**observação**: parâmetro válido somente para eventos do app_)
    
-   [`page_id`: identificação da página](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#page_id) — Não converter em hashes
    
-   [`page_scoped_user_id`: número de identificação do usuário no escopo da Página](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#page_scoped_user_id) — Não converter em hashes
    
-   [`ctwa_clid`: ID do clique para o WhatsApp](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ctwa_clid) — Não converter em hashes
    
-   [`ig_account_id`: identificação da conta do Instagram](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ig_account_id) — Não converter em hashes
    
-   [`ig_sid`: ID do clique para o Instagram](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#ig_sid) — Não converter em hashes
    

### [Parâmetros de evento do servidor](/docs/marketing-api/conversions-api/parameters/server-event)

-   [`event_name`](/docs/marketing-api/conversions-api/parameters/server-event#event-name)
    
-   [`event_time`](/docs/marketing-api/conversions-api/parameters/server-event#event-time)
    
-   [`user_data`](/docs/marketing-api/conversions-api/parameters/server-event#user-data)
    
-   [`custom_data`](/docs/marketing-api/conversions-api/parameters/server-event#custom-data)
    
-   [`event_source_url`](/docs/marketing-api/conversions-api/parameters/server-event#event-source-url)
    
-   [`opt_out`](/docs/marketing-api/conversions-api/parameters/server-event#opt-out)
    
-   [`event_id`](/docs/marketing-api/conversions-api/parameters/server-event#event-id)
    
-   [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source)
    
-   [`data_processing_options`](/docs/marketing-api/conversions-api/parameters/server-event#data-processing-options)
    
-   [`data_processing_options_country`](/docs/marketing-api/conversions-api/parameters/server-event#data-processing-options-country)
    
-   [`data_processing_options_state`](/docs/marketing-api/conversions-api/parameters/server-event#data-processing-options-state)
    
-   [`referrer_url`](/docs/marketing-api/conversions-api/parameters/server-event#referrer-url)
    
-   [`customer_segmentation`](/docs/marketing-api/conversions-api/parameters/server-event#customer-segmentation)
    

### [Parâmetros de dados do app](/docs/marketing-api/conversions-api/parameters/app-data)

-   [`advertiser_tracking_enabled`](/docs/marketing-api/conversions-api/parameters/app-data#advertiser-tracking-enabled)
    
-   [`application_tracking_enabled`](/docs/marketing-api/conversions-api/parameters/app-data#application-tracking-enabled)
    
-   [`extinfo`](/docs/marketing-api/conversions-api/parameters/app-data#extinfo)
    
-   [`campaign_ids`](/docs/marketing-api/conversions-api/parameters/app-data#campaign-ids)
    
-   [`install_referrer`](/docs/marketing-api/conversions-api/parameters/app-data#install-referrer)
    
-   [`installer_package`](/docs/marketing-api/conversions-api/parameters/app-data#installer-package)
    
-   [`url_schemes`](/docs/marketing-api/conversions-api/parameters/app-data#url-schemes)
    
-   [`windows_attribution_id`](/docs/marketing-api/conversions-api/parameters/app-data#windows-attribution-id)
    
-   [`anon_id`](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#anon_id)
    
-   [`madid`](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#madid)
    
-   [`vendor_id`](/docs/marketing-api/conversions-api/parameters/app-data#vendor-id)
    

_**Observação**: consulte a documentação [API de Conversões para eventos do app](/docs/marketing-api/conversions-api/app-events) para saber como integrar eventos do app._

### [Parâmetros padrão](/docs/marketing-api/conversions-api/parameters/custom-data)

Consulte uma lista com todos os [parâmetros padrão](/docs/marketing-api/conversions-api/parameters/custom-data) que os usuários podem enviar à Meta.

### [Original Event Data Parameters](/docs/marketing-api/conversions-api/parameters/original-event)

-   [`event_name`](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event#event-name-oed)
    
-   [`event_time`](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event#event-time-oed)
    
-   [`order_id`](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event#order-id-oed)
    
-   [`event_id`](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event#event-id-oed)
    

  

### API de Conversões para otimização de leads

Consulte o guia de [integração do CRM](/docs/marketing-api/conversions-api/guides/crm-integration) para saber quais são os campos necessários para integrar o sistema de CRM com a API de Conversões em eventos de lead.

### Veja também

-   Visão geral: parâmetros [`fbp` e `fbc`](/docs/marketing-api/server-side-api/parameters/fbp-and-fbc)
    

## Saiba mais

-   [API de Conversões: documentação](/docs/marketing-api/facebook-pixel/server-side-api)
    
-   [Como usar a API de Conversões](/docs/marketing-api/facebook-pixel/server-side-api/using-the-api)
    
-   [Meta Privacy and Data Use Guide](https://www.facebook.com/business/m/privacy-and-data?Data-Use-&-Ads)
    

[](#)