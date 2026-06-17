---
title: "Graph API Referência v24.0: Ad Creative Object Story Spec"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-creative-object-story-spec/"
scraped_at: "2026-02-01T14:14:04.277Z"
---

Versão Graph API

[v24.0](#)

# Ad Creative Object Story Spec

[](#)

## Leitura

The specifications of a creative containing the page id and other content to create a new unpublished page post specified using one of `link_data`, `photo_data`, `video_data`, `text_data` or `template_data`.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`instagram_user_id`

numeric string

The Instagram user account that the ad will be posted to

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`link_data`

[AdCreativeLinkData](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data/)

The spec for a link page post or [carousel ad](/docs/marketing-api/guides/carousel-ads/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page_id`

numeric string

ID of a Facebook page. An unpublished page post will be created on this page. User must have [Admin or Editor role](https://www.facebook.com/help/323502271070625/) for this page.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`photo_data`

[AdCreativePhotoData](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-photo-data/)

The spec for a photo page post.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_data`

list<AdCreativeProductData>

The spec for products to enable catalog related experience.

`template_data`

[AdCreativeLinkData](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data/)

The spec for a template link page post as used in [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads/).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_data`

[AdCreativeTextData](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-text-data/)

The spec for a text page post.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`video_data`

[AdCreativeVideoData](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-video-data/)

The spec for a video page post.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)