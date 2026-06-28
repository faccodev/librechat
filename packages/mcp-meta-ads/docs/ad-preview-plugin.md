---
title: "Plugin de prévia do anúncio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-preview-plugin"
scraped_at: "2026-02-01T14:04:09.593Z"
---

# Plugin de prévia do anúncio

O plugin de prévia do anúncio é a maneira mais fácil para que anunciantes vejam prévias de anúncios nos próprios sites.

Ele permite gerar prévias de um anúncio na coluna da direita, no Feed ou em dispositivos móveis. Para isso, basta definir uma especificação do criativo, uma identificação do grupo de anúncios ou uma identificação do criativo. É possível gerar prévias por meio de um Plugin Social ou da Graph API.

[](#)

## Parâmetros

-   Obrigatório: `creative`, `creative_id` ou `adgroup_id`.
    
-   Obrigatório: `ad_format`, que substitui o parâmetro `page_type`.
    
-   Opcional: `ad_account_id`, `targeting` e `post`.
    

Para usar o plugin de prévia, é necessário se conectar via Login do Facebook. Caso você use `creative_id`, `adgroup_id` ou `ad_account_id`, será necessário ter também as permissões de acesso ao criativo, ao grupo de anúncios ou à conta de anúncios, respectivamente.

Configuração

Atributo HTML5

Descrição

`ad_account_id`

`data-ad-account-id`

Obrigatória ao especificar um criativo que usa `image_hash`.

`adgroup_id`

`data-adgroup-id`

Identificação do grupo de anúncios retornada em uma chamada da Graph API.

`creative`

`data-creative`

[Especificação do criativo](/docs/reference/ads-api/adcreative/) codificada em JSON.

`creative_id`

`data-creative-id`

Identificação do criativo retornada em uma chamada da Graph API.

`ad_format`

`data-ad-format`

Uma das seguintes opções: `RIGHT_COLUMN_STANDARD`, `DESKTOP_FEED_STANDARD`, `MOBILE_FEED_STANDARD` ou `FACEBOOK_STORY_MOBILE`.

`page_type`

`data-page-type`

Uma das seguintes opções: `rightcolumn`, `desktopfeed` ou `mobile`.

`targeting`

`data-targeting`

[Especificação de direcionamento](/docs/ads-api/targeting) codificada em JSON.

`post`

`data-post`

Especificação de publicação codificada em JSON de acordo com a [documentação da API de Páginas](/docs/graph-api/reference/page).

[](#)

## Graph API

Também é possível gerar prévias por meio da [Graph API](/docs/reference/ads-api/generatepreview/). Para gerar uma prévia em estilo de plugin, especifique o parâmetro adicional (`ad_format`) conforme descrito na tabela acima.

[](#)