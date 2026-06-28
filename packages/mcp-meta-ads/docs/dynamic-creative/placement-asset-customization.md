---
title: "Personalização de ativo conforme o posicionamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/dynamic-creative/placement-asset-customization"
scraped_at: "2026-02-01T14:21:57.019Z"
---

# Personalização de ativo conforme o posicionamento

Use esta solução para personalizar os ativos de criativos exibidos em diferentes [posicionamentos](/docs/marketing-api/buying-api/ad-units#placements) de anúncio. Mantenha o controle sobre o criativo enquanto usa vários posicionamentos diferentes.

A personalização de ativos por posicionamento é uma das nossas três APIs que usam regras de personalização de ativos. Saiba mais sobre as [regras de personalização de ativos](/docs/marketing-api/asset-customization-rules).

## Começar

-   Etapa 1: [criar uma campanha e um conjunto de anúncios](/docs/marketing-api/asset-customization-rules#campaign)
    
-   Etapa 2: [fornecer um criativo e personalizar os ativos](#asset-feed)
    
-   Etapa 3: [criar o anúncio](/docs/marketing-api/asset-customization-rules#ad)
    
-   Etapa 4 (opcional): consultar [insights](/docs/marketing-api/dynamic-creative/insights) e analisar os resultados
    
-   Etapa 5 (opcional): [ler o criativo do anúncio](#read-ad-creative)
    

A personalização de ativos por posicionamento com posts existentes não é mais compatível com a API. Só é possível usar essa opção no Gerenciador de Anúncios.

[](#)

## Etapa 2: fornecer um criativo

Use `asset_feed_spec` para fornecer seu criativo. Você pode especificar vários ativos de criativo para cada tipo, incluindo imagens, vídeos, carrosséis, títulos e corpo de texto. Forneça apenas uma descrição do link, já que ela não pode ser personalizada por posicionamento.

Para aplicar a personalização:

1.  Inclua [`asset_customization_rules`](/docs/marketing-api/asset-customization-rules) nas `asset_feed_spec`.
2.  Para cada regra, adicione `customization_spec` e rótulos de ativos.

Para a personalização de ativos por posicionamento, cada `asset_feed_spec` precisa ter mais de uma regra de personalização anexada a ela.

Consulte as [regras de personalização de ativos](/docs/marketing-api/asset-customization-rules).

### Propriedades aceitas

  

Nome da propriedade

Descrição

`customization_spec`

Tipo: [campos compatíveis](#supported-fields)

**Obrigatório.**

Posicionamentos onde você quer exibir os ativos.

`image_label`

Formato: `{"name": "{LABEL_NAME}"}`

**Obrigatório para o formato `SINGLE_IMAGE`.**

Rótulo da imagem que você quer exibir. Está anexado aos ativos de imagem nas `asset_feed_spec`.

`video_label`

Formato: `{"name": "{LABEL_NAME}"}`

**Obrigatório para o formato `SINGLE_VIDEO`.**

Rótulo do vídeo que você quer exibir. Está anexado aos ativos de vídeo nas `asset_feed_spec`.

`carousel_label`  
Formato: `{"name": "{LABEL_NAME}"}`

**Obrigatório para o formato `CAROUSELS`.**

Rótulo do carrossel que você quer exibir. Está anexado aos ativos de carrossel nas `asset_feed_spec`.

**Observação**: se estiver fornecendo carrosséis por meio do processo de personalização de ativos por posicionamento, todos os anexos derivados precisarão ser definidos nas especificações do feed de ativos e referenciados usando rótulos de anúncios. Os anexos derivados não podem ser definidos inline. Consulte [Opções de especificações do feed de ativos](https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/options) para saber mais sobre o formato `carousels`.

### Campos compatíveis nas `customization_spec`

  

Nome da propriedade

Descrição

`publisher_platforms`

**Obrigatório.**

Representa possíveis posicionamentos para seu anúncio. Opções aceitas: `facebook`, `instagram`, `messenger`, `audience_network` e `threads`.

`facebook_positions`

**Opcional; será necessário se o Facebook for selecionado em `publisher_platforms`.**

Posicionamento específico do Facebook. Opções compatíveis: `feed`, `right_hand_column`, `marketplace`, `video_feeds`, `search`, `story` e `notification`.

`instagram_positions`

**Opcional; será necessário se o Instagram for selecionado em `publisher_platforms`.**

Posicionamentos específicos do Instagram. Opções aceitas: `stream`, `story`, `explore`, `explore_home`, `profile_feed` e `ig_search`.

**Observação:** o posicionamento `explore_home` é compatível apenas com o formato `SINGLE_IMAGE`.

`messenger_positions`

**Opcional; será necessário se o Messenger for selecionado em `publisher_platforms`.**

Posicionamentos específicos do Messenger. Opções aceitas: `sponsored_messages` e `story`.

`audience_network_positions`

**Opcional; será necessário se o Audience Network for selecionado em `publisher_platforms`.**

Posicionamento específico do Audience Network. Opções aceitas: `classic`, `instream_video` e `rewarded_video`.

`threads_positions`

**Opcional, mas necessário se o Threads for selecionado em `publisher_platforms`.**

É um posicionamento específico do Threads: `threads_stream`

**Observação:**`publisher_platform: instagram` e `instagram_positions: stream` são necessários para selecionar `threads_positions: threads_stream`.

Saiba mais sobre nossas [opções de posicionamento disponíveis](/docs/marketing-api/audiences/reference/placement-targeting).

**Exemplo** – configuração do feed

```
v24.0
```

**Exemplo** – personalização de ativos na página Explorar do Instagram

```
v24.0
```

**Exemplo** – personalização de ativos nos resultados da pesquisa do Instagram

```
v24.0
```

**Exemplo** – configuração do feed do Threads

```
curl -X POST \ -F 'object_story_spec={ "page_id": "<PAGE_ID>", "instagram_user_id": "<IG_USER_ID>", "threads_user_id" : "<THREADS_USER_ID>", }' \ -F 'asset_feed_spec={ "videos": [{ "adlabels": [{"name": "labelfb"}], "video_id": "<VIDEO_ID>" }, { "adlabels": [{"name": "labelig"}], "video_id": "<VIDEO_ID>" }, { "adlabels": [{"name": "labelthreads"}], "video_id": "<VIDEO_ID>" }], "bodies": [{"text": "Begin Your Adventure"}], "link_urls": [{ "website_url": "<WEBSITE_URL>", "display_url": "<DISPLAY_URL>" }], "titles": [{"text": "Level Up"}], "ad_formats": ["SINGLE_VIDEO"], "call_to_action_types": ["WATCH_MORE"], "descriptions": [{"text": "Description"}], "asset_customization_rules": [{ "customization_spec": { "publisher_platforms": ["instagram"], "instagram_positions": ["stream"] }, "video_label": { "name": "labelig" } }, { "customization_spec": { "publisher_platforms": ["threads"], "threads_positions": ["threads_stream"] }, "video_label": { "name": "labelthreads" } }, { "customization_spec": {}, "video_label": { "name": "labelfb" } }], "optimization_type": "PLACEMENT" }' \ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v23.0/act_<AD_ACCOUNT_ID>/adcreatives
```

Veja todas as [opções disponíveis para especificação do feed de ativos](/docs/marketing-api/dynamic-creative/asset-feed-spec).

[](#)

## Etapa 5 (opcional): ler o criativo do anúncio

Para anúncios de personalização de ativos por posicionamento, os campos do criativo relacionados ao Instagram devem ser recuperados por meio de `act_<AD_ACCOUNT_ID>/ads`. Por exemplo:

```
v24.0
```

[](#)