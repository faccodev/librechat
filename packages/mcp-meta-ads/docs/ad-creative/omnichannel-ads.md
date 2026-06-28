---
title: "Anúncios omnichannel - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/omnichannel-ads"
scraped_at: "2026-02-01T13:53:56.418Z"
---

# Anúncios omnichannel

Os anúncios omnichannel são uma nova solução de otimização que permite impulsionar vendas na loja e no site usando uma campanha promocional. A solução também inclui novos recursos de anúncios de localização da loja para que os compradores saibam onde ficam os estabelecimentos mais próximos.

A configuração de anúncios omnichannel na interface do usuário do Gerenciador de Anúncios da Meta só está disponível para anunciantes, que também podem usar as APIs de Marketing para criar e configurar campanhas.

Veja a seguir as integrações de API necessárias para criar campanhas, conjuntos de anúncios e anúncios omnichannel.

## Pré-requisitos

### Permissão do app

Os apps devem ter as seguintes permissões:

-   `ads_management`
    
-   `ads_read`
    

Para encontrar informações mais detalhadas sobre permissões e acesso, [clique aqui](/docs/marketing-api/get-started/authorization#permissions-and-features).

### Ativos

Os anunciantes precisarão ter acesso aos seguintes ativos:

-   `AD_ACCOUNT_ID`: identificação da conta de anúncios à qual as campanhas, os conjuntos de anúncios e os anúncios serão associados. Para saber mais, [clique aqui](/docs/marketing-api/business-asset-management/guides/ad-accounts/).
    
-   `PIXEL_ID`: o ID do Pixel da Meta. Usado no `promoted_object` durante a criação do conjunto de anúncios. Para saber mais sobre configuração e permissões, [clique aqui](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).
    
-   `OFFLINE_CONVERSION_DATASET_ID`: a identificação do conjunto de dados offline. Usado no `promoted_object` durante a criação do conjunto de anúncios. Para saber mais sobre configuração e permissões, [clique aqui](/docs/marketing-api/conversions-api/offline-events/#prerequisites).
    

[](#)

## Recursos de anúncios compatíveis

Os anúncios omnichannel são compatíveis com muitos recursos de anúncios da Meta, incluindo:

-   [Anúncios de catálogo Advantage+](https://www.facebook.com/business/help/397103717129942?id=1913105122334058): mostre automaticamente às pessoas seus produtos mais relevantes com base em interesses, intenções e ações.
    
    -   Os anúncios omnichannel são compatíveis com anúncios de catálogo Advantage+ no nível da campanha. Para ativar o recurso, será preciso incluir o campo product\_catalog\_id no parâmetro promoted\_object durante a criação de uma campanha de anúncios omnichannel.
        
    -   Além do catálogo de comércio eletrônico, o catálogo de inventário local na loja (SBLI, pelas iniciais em inglês) também estará disponível por meio do mesmo fluxo de configuração. Ele fornecerpa, de forma eficiente, produtos relevantes disponíveis na loja próxima a uma pessoa.
        
    
-   [Campanha de compras Advantage+](https://www.facebook.com/business/help/1362234537597370): alcance públicos valiosos com menos tempo de configuração e maior eficiência.
    
    -   Os anúncios omnichannel são compatíveis com campanhas de compras Advantage+.
        
    
-   [Criativo Advantage+](https://www.facebook.com/business/help/297506218282224?id=649869995454285): otimize imagens e vídeos para aumentar a probabilidade de interação do público.
    
    -   Os anúncios omnichannel são compatíveis com o criativo Advantage+.
        
    -   A localização da loja é uma funcionalidade do criativo Advantage+ omnichannel de alto desempenho que ajuda a impulsionar conversões offline (disponível apenas para anúncios de catálogo que não sejam Advantage+). Para ativar o recurso, será preciso incluir o campo local\_store\_extension nas degrees\_of\_freedom\_spec ao gerar o criativo do anúncio.
        
    

[](#)

## Campanhas de anúncios omnichannel

Para criar uma nova campanha de anúncios omnichannel, faça uma solicitação `POST` ao ponto de extremidade `/campaigns` com os parâmetros a seguir:

-   `name`: o nome da campanha.
    
-   `objective`: o objetivo da campanha. O valor válido é `OUTCOME_SALES`.
    
-   `status`: o status da campanha. Os valores válidos são `ACTIVE` e `PAUSED`.
    
-   `promoted_object`: ao adicionar `product_catalog_id`, você habilitará os anúncios de catálogo Advantage+.
    

#### Exemplo:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/campaigns \
-F 'name=My Omni campaign' \
-F 'objective=OUTCOME_SALES' \
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

#### Exemplo de anúncios de catálogo Advantage+:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/campaigns \
-F 'name=My Omni campaign' \
-F 'objective=OUTCOME_SALES' \
-F 'promoted_object={"product_catalog_id":"<PRODUCT_CATALOG_ID>"}' \
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

### Exemplo de resposta

Uma resposta bem-sucedida retornará a identificação da nova campanha.

Exemplo:

```
{
  "id": "23845678901234567"
}
```

Uma resposta malsucedida retornará um objeto de erro com uma explicação para a causa do problema.

#### Exemplo:

```
{
    "error": {
"message": "Invalid parameter",
       "type": "OAuthException",
       "code": 100,
"is_transient": false
}
```

### Códigos de erro

Os [códigos de erro](/docs/marketing-api/reference/ad-account/campaigns/#error-codes-2) retornados durante a criação de uma campanha de anúncios omnichannel são os mesmos das campanhas padrão.

[](#)

## Conjuntos de anúncios omnichannel

Para criar um novo conjunto de anúncios omnichannel, faça uma solicitação `POST` ao ponto de extremidade `/adsets` com os parâmetros a seguir:

-   `name`: o nome do conjunto de anúncios.
    
-   `campaign_id`: a identificação da campanha à qual o conjunto de anúncios pertence.
    
-   `bid_strategy`: a estratégia de lances do anúncio é definida para atender às suas metas de negócios específicas.
    
-   `daily_budget`: o orçamento diário para o conjunto de anúncios.
    
-   `attribution_spec`: a especificação de atribuição de conversão usada ao atribuir conversões para otimização. Os anúncios omnichannel só são compatíveis com o `event_type` CLICK\_THROUGH com janela de 7 dias (`window_days`) e com o `event_type` VIEW\_THROUGH com janela de 1 dia (`window_days`).
    
-   `promoted_object`: o objeto que seu conjunto está promovendo em todos os anúncios.
    
    -   Para um conjunto de anúncios omnichannel, o `promoted_object` deve ter um `omnichannel_object` com pixel e objetos offline. PURCHASE é o único tipo de evento personalizado compatível com conjuntos de anúncios omnichannel. Veja o exemplo abaixo.
        
        -   Se você estiver usando um Pixel da Meta para rastrear eventos do site e um conjunto de dados separado para rastrear eventos offline, envie o ID do pixel e a identificação do conjunto de dados offline.Veja o exemplo 1 abaixo.
            
        -   Caso você esteja usando um único conjunto de dados para gerenciar seu site e eventos offline, use essa identificação do conjunto de dados em ambos os campos. Veja o [exemplo 2 abaixo](#example-2).
            
        
    -   Ao criar **anúncios de catálogo Advantage+** no nível da campanha, também será preciso adicionar `product_set_id` com o campo `variation` definido como PRODUCT\_SET\_AND\_IN\_STORE. Veja o [exemplo abaixo](#adv-plus-eg).
        
        -   Você também pode criar anúncios do **site, do app e na loja** com o catálogo Advantage+. Você precisará adicionar um `product_set_id`, um `pixel_id` que tenha um conjunto de dados de conversão offline associado, um ID do app e um ID do pixel. Você também precisará definir `variation` como PRODUCT\_SET\_WEBSITE\_APP\_AND\_INSTORE. Você não precisa de um `omnichannel_object`. Veja o [exemplo abaixo](#web-app-instore).
            
        
    
-   `targeting`: a especificação de segmentação para o conjunto de anúncios.
    
-   `optimization_goal`: OFFSITE\_CONVERSIONS, que otimizará para pessoas com maior probabilidade de gerar uma conversão no site e na loja.
    
-   `status`: o status do conjunto de anúncios. Os valores válidos são `ACTIVE` e `PAUSED`.
    

#### Exemplo 1 – Usar o Pixel da Meta para rastrear eventos do site e um conjunto de dados separado para rastrear eventos offline:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/adsets \
-F 'name=My Omni Adset' \
-F 'campaign_id=<OMNI_CAMPAIGN_ID>' \
-F 'bid_strategy=LOWEST_COST_WITHOUT_CAP' \
-F 'billing_event=IMPRESSIONS' \
-F 'daily_budget=10000' \
-F 'promoted_object={
"omnichannel_object":{
"offline":[{"offline_conversion_data_set_id":"<OFFLINE_CONVERSION_DATASET_ID>","custom_event_type":"PURCHASE"}],
"pixel":[{"pixel_id":"<PIXEL_ID>","custom_event_type":"PURCHASE"}]
}
}' \
-F 'attribution_spec=[
{"event_type":"CLICK_THROUGH","window_days":"7"},
{"event_type":"VIEW_THROUGH","window_days":"1"}
]' \
-F 'targeting={"facebook_positions":["feed"],"geo_locations":{"countries":["US"],"regions":[{"key":"4081"}],"cities":[{"key":777934,"radius":10,"distance_unit":"mile"}]},"genders":[1],"age_max":24,"age_min":20,"publisher_platforms":["facebook","audience_network"],"device_platforms":["mobile"],"flexible_spec":[{"interests":[{"id":"<INTEREST_ID>","name":"<INTEREST_NAME>"}]}]}' \
-F 'status=ACTIVE' \
-F 'optimization_goal=OFFSITE_CONVERSIONS' \
-F 'access_token=<ACCESS_TOKEN>'
```
  

#### Exemplo 2 – Usar um único conjunto de dados para rastrear eventos online e offline:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/adsets \
-F 'name=My Omni Adset' \
-F 'campaign_id=<OMNI_CAMPAIGN_ID>' \
-F 'bid_strategy=LOWEST_COST_WITHOUT_CAP' \
-F 'billing_event=IMPRESSIONS' \
-F 'daily_budget=10000' \
-F 'promoted_object={
"omnichannel_object":{
"offline":[{"offline_conversion_data_set_id":"<DATASET_ID>","custom_event_type":"PURCHASE"}],
"pixel":[{"pixel_id":"<DATASET_ID>","custom_event_type":"PURCHASE"}]
}
}' \
-F 'attribution_spec=[
{"event_type":"CLICK_THROUGH","window_days":"7"},
{"event_type":"VIEW_THROUGH","window_days":"1"}
]' \
-F 'targeting={"facebook_positions":["feed"],"geo_locations":{"countries":["US"],"regions":[{"key":"4081"}],"cities":[{"key":777934,"radius":10,"distance_unit":"mile"}]},"genders":[1],"age_max":24,"age_min":20,"publisher_platforms":["facebook","audience_network"],"device_platforms":["mobile"],"flexible_spec":[{"interests":[{"id":"<INTEREST_ID>","name":"<INTEREST_NAME>"}]}]}' \
-F 'status=ACTIVE' \
-F 'optimization_goal=OFFSITE_CONVERSIONS' \
-F 'access_token=<ACCESS_TOKEN>'
```
  

#### Exemplo de anúncios de catálogo Advantage+:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/adsets \
-F 'name=My Omni Adset' \
-F 'campaign_id=<OMNI_CAMPAIGN_ID>' \
-F 'bid_strategy=LOWEST_COST_WITHOUT_CAP' \
-F 'billing_event=IMPRESSIONS' \
-F 'daily_budget=10000' \
-F 'promoted_object={
"product_set_id":"<PRODUCT_SET_ID>",
"custom_event_type":"PURCHASE",
"variation":"PRODUCT_SET_AND_IN_STORE",
"omnichannel_object":{
"offline":[{"offline_conversion_data_set_id":"<OFFLINE_CONVERSION_DATASET_ID>","custom_event_type":"PURCHASE"}],
"pixel":[{"pixel_id":"<PIXEL_ID>","custom_event_type":"PURCHASE"}]
}
}' \
-F 'attribution_spec=[
{"event_type":"CLICK_THROUGH","window_days":"7"},
{"event_type":"VIEW_THROUGH","window_days":"1"}
]' \
-F 'targeting={"facebook_positions":["feed"],"geo_locations":{"countries":["US"],"regions":[{"key":"4081"}],"cities":[{"key":777934,"radius":10,"distance_unit":"mile"}]},"genders":[1],"age_max":24,"age_min":20,"publisher_platforms":["facebook","audience_network"],"device_platforms":["mobile"],"flexible_spec":[{"interests":[{"id":"<INTEREST_ID>","name":"<INTEREST_NAME>"}]}]}' \
-F 'status=ACTIVE' \
-F 'optimization_goal=OFFSITE_CONVERSIONS' \
-F 'access_token=<ACCESS_TOKEN>'
```
  

#### Exemplo de anúncios do site, do app e na loja:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/adsets \
-F 'name=My Web+App+In-store Adset' \
-F 'campaign_id=<OMNI_CAMPAIGN_ID>' \
-F 'bid_strategy=LOWEST_COST_WITHOUT_CAP' \
-F 'billing_event=IMPRESSIONS' \
-F 'daily_budget=10000' \
-F 'promoted_object={
  "pixel_id":"<PIXEL_ID>",
"product_set_id":"<PRODUCT_SET_ID>",
"custom_event_type":"PURCHASE",
"variation":"PRODUCT_SET_WEBSITE_APP_AND_INSTORE"
}' \
-F 'attribution_spec=[
{"event_type":"CLICK_THROUGH","window_days":"7"},
{"event_type":"VIEW_THROUGH","window_days":"1"}
]' \
-F 'targeting={"facebook_positions":["feed"],"geo_locations":{"countries":["US"],"regions":[{"key":"4081"}],"cities":[{"key":777934,"radius":10,"distance_unit":"mile"}]},"genders":[1],"age_max":24,"age_min":20,"publisher_platforms":["facebook","audience_network"],"device_platforms":["mobile"],"flexible_spec":[{"interests":[{"id":"<INTEREST_ID>","name":"<INTEREST_NAME>"}]}]}' \
-F 'status=ACTIVE' \
-F 'optimization_goal=OFFSITE_CONVERSIONS' \
-F 'access_token=<ACCESS_TOKEN>'
```

### Exemplo de resposta

Uma resposta bem-sucedida retornará a identificação do novo conjunto de anúncios.

#### Exemplo:

```
{
  "id": "23845678901234567"
}
```

Uma resposta malsucedida retornará um objeto de erro com uma explicação para a causa do problema.

#### Exemplo:

```
{
    "error": {
"message": "Invalid parameter",
       "type": "OAuthException",
       "code": 100,
"error_subcode": 3858449,
"is_transient": false,
"error_user_title": "Ad Account Ineligible For Omnichannel Ads",
"error_user_msg": "Omnichannel ads is only available for eligible Ad Account IDs. Use an eligible Ad Account ID or contact your Meta representative for more info.",
"fbtrace_id": "A8A163-BtrDGjzTEDskGTy"
}
```

### Códigos de erro

Os [códigos de erro](/docs/marketing-api/reference/ad-account/adsets/#error-codes-2) retornados durante a criação de uma campanha de anúncios omnichannel são os mesmos das campanhas padrão.

### Subcódigos de erro

Os códigos de erro a seguir podem ser retornados ao criar uma campanha:

Subcódigo

Descrição

`2446432`

Os anúncios omnichannel só são compatíveis com o objetivo OUTCOME\_SALES.

`3858449`

Os anúncios omnichannel estão disponíveis somente para identificações de contas de anúncios qualificadas. Use a identificação de uma conta qualificada ou entre em contato com seu representante da Meta para saber mais.

`3858450`

O conjunto de anúncios precisa do ID de um Pixel da Meta válido para anúncios omnichannel. Use um ID válido ou crie um pixel no Gerenciador de Eventos da Meta.

`3858451`

Os conjuntos de anúncios omnichannel precisam de um tipo de evento personalizado válido. "Purchase" é o único tipo de evento válido.

`3858452`

Os conjuntos de anúncios omnichannel precisam da identificação de um conjunto de dados offline válido. Use um conjunto de dados offline válido ou configure um no Gerenciador de Eventos.

`3858453`

Os conjuntos de anúncios omnichannel só são compatíveis com uma especificação de atribuição de cliques de 7 dias e de visualização de 1 dia.

`3858454`

Os conjuntos de anúncios omnichannel só são compatíveis com a meta de otimização offsite\_conversions.

`3858513`

Para conjuntos de dados, os campos ID do pixel e ID do conjunto de dados offline devem ser os mesmos.

`3858514`

O conjunto de dados deve conter um ID de conjunto de dados offline.

`3858515`

O conjunto de dados contém um ID de conjunto de dados offline inválido. Verifique a configuração do seu conjunto de dados unificado.

[](#)

## Criativo do anúncio omnichannel

Para criar um novo anúncio, faça uma solicitação `POST` ao ponto de extremidade `/adcreatives` com os parâmetros a seguir:

-   `name`: o nome do criativo do anúncio.
    
-   `object_story_spec`: as especificações de um criativo que incluem a identificação da Página e outro conteúdo para criar um post sem exibição na Página definido usando `link_data`, `photo_data`, `video_data`, `text_data` ou `template_data`.
    
-   `degrees_of_freedom_spec`: especifica os tipos de transformações que são habilitadas para o criativo fornecido.
    
    -   Por exemplo: especifique `local_store_extension` para um formato de anúncio omnichannel de alto desempenho. Disponível somente para anúncios de catálogo que não sejam Advantage+.
        
    
-   `product_set_id`: utilize o mesmo conjunto de produtos usado na criação do conjunto de anúncios se estiver criando anúncios de catálogo Advantage+.
    
-   Recommender\_settings: use para criar anúncios com SBLI. Defina `product_sales_channel` como `omni`.
    

#### Exemplo de anúncios de catálogo não Advantage+ com extensão de loja local:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/ads \
-F 'name=My Omni Ad Creative' \
-F object_story_spec={
"page_id":"<PAGE_ID>",
"link_data":{
"link":"<LINK>",
"call_to_action": {"type": "SHOP_NOW"}
}
}' \
-F 'degrees_of_freedom_spec={
"creative_features_spec": {
"standard_enhancements":{
"action_metadata":{"type":"STICKY"},
"enroll_status":"OPT_IN"
},
"local_store_extension":{
"action_metadata":{"type":"MANUAL"},
"enroll_status":"OPT_IN"
}
}
}' \
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

#### Exemplo de anúncios de catálogo Advantage+:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/ads \
-F 'name=My Omni Advantage+ Catalog Ad Creative'' \
-F 'object_story_spec={
"page_id":"<PAGE_ID>",
"template_data":{
"call_to_action":{"type":"SHOP_NOW"},
"link":"<LINK>",
"name":"Headline {{product.price}}",
"description": "Description {{product.description}}",
"message": "Test {{product.name | titleize}}",  
}
}' \
-F 'product_set_id="&lt;PRODUCT_SET_ID&gt;"' \
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

#### Exemplo de anúncios de catálogo Advantage+ com catálogo de inventário local na loja:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/ads \
-F 'name=My Omni Advantage+ Catalog Ad Creative'' \
-F 'object_story_spec={
"page_id":"<PAGE_ID>",
"template_data":{
"call_to_action":{"type":"SHOP_NOW"},
"link":"<LINK>",
"name":"Headline {{product.price}}",
"description": "Description {{product.description}}",
"message": "Test {{product.name | titleize}}",  
}
}' \
-F 'product_set_id="&lt;PRODUCT_SET_ID_FROM_SBLI_CATALOG&gt;"' \
-F 'recommender_settings={"product_sales_channel": "omni"}`
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

[](#)

## Anúncios omnichannel

Para criar um anúncio, faça uma solicitação `POST` ao ponto de extremidade `/ads` com os parâmetros a seguir:

-   `name`: o nome do anúncio.
    
-   `adset_id`: a identificação do conjunto ao qual o anúncio pertence.
    
-   `creative`: a especificação ou o ID do criativo do anúncio.
    
-   `status`: o status do anúncio. Os valores válidos são `ACTIVE` e `PAUSED`.
    

#### Exemplo:

```
curl -X POST \
https://graph.facebook.com/v20.0/act_<AD_ACCOUNT_ID>/ads \
-F 'name=My Omni Ad' \
-F 'adset_id=<OMNI_AD_SET_ID>' \
-F '{"creative_id":"<AD_CREATIVE_ID>"}' \
-F 'status=ACTIVE' \
-F 'access_token=<ACCESS_TOKEN>'
```

### Resposta esperada:

Uma resposta bem-sucedida retornará a identificação do novo anúncio.

#### Exemplo:

```
{
  "id": "23845678901234567"
}
```

### Códigos de erro

Os [códigos de erro](/docs/marketing-api/reference/ad-account/ads/#error-codes-2) retornados durante a criação de anúncios omnichannel são os mesmos dos anúncios padrão.

### Subcódigos de erro

Os códigos de erro a seguir podem ser retornados ao criar uma campanha:

Subcódigo

Descrição

`3858455`

Os anúncios omnichannel não são compatíveis com formatos flexíveis de criativos do anúncio. Por isso, use formatos de mídia única, como imagem ou vídeo, além de coleções ou carrosséis.

`3858456`

Os anúncios omnichannel não são compatíveis com o uso de criativos de posts existentes nem de modelos da Central de Criativos.

[](#)

## Outros recursos

-   [Visão geral da Graph API do Facebook da Meta](/docs/graph-api/overview)
    
-   [Autorização](/docs/marketing-api/get-started/authorization#permissions-and-features)
    
-   Referência da API
    
    -   [Ad Account, Ad Campaigns](/docs/marketing-api/reference/ad-account/campaigns/#Creating)
        
    -   [Ad Account Adsets](/docs/marketing-api/reference/ad-account/adsets/#Creating)
        
    -   [Ad Account Ads](/docs/marketing-api/reference/ad-account/ads/#Creating)
        
    -   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
        
    
-   [Criativo do anúncio](/docs/marketing-api/creative)
    
-   Evento de rastreamento de conversões offline e no site
    
    -   [Guia de configuração técnica omni: boas práticas e requisitos](/docs/marketing-apis/guides/omni-optimal-setup-guide)
        
    
-   Recursos em destaque
    
    -   [Ad Creative Features Spec](/docs/marketing-api/reference/ad-creative-features-spec/)
        
    -   [Introdução aos anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads/get-started)
        
    -   [Campanhas de compras Advantage+](/docs/marketing-api/advantage-shopping-campaigns/)
        
    

[](#)