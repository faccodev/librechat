---
title: "Graph API Referência v24.0: Ad Creative Link Data Image Overlay Spec"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-image-overlay-spec"
scraped_at: "2026-02-01T14:11:11.743Z"
---

Versão Graph API

[v24.0](#)

# Ad Creative Link Data Image Overlay Spec

[](#)

## Leitura

How to render overlays on an image for a dynamic item in [Dynamic Ads](/docs/marketing-api/dynamic-product-ads/ads-management/). Image overlays are not supported on Instagram, if you use image overlays, the ad will be delivered to Instagram but the overlay will not render on the images.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`custom_text_type`

enum {free\_shipping, popular, sale}

Render custom text overlays on the image. This option only applies when `text_type` is `custom`.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`float_with_margin`

bool

Render margin between overlay and edge. This option only applies with `pill_with_text`

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`overlay_template`

enum {pill\_with\_text, circle\_with\_text, triangle\_with\_text}

Overlay creative template. This includes a background shape and text layout

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`position`

enum {top\_left, top\_right, bottom\_left, bottom\_right}

Position for overlay on an image. `pill_with_text` and `circle_with_text` templates allowed on all four positions. `triangle_with_text` only allowed on `top_left` and `top_right`

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_font`

enum {droid\_serif\_regular, lato\_regular, nunito\_sans\_bold, open\_sans\_bold, open\_sans\_condensed\_bold, pt\_serif\_bold, roboto\_medium, roboto\_condensed\_regular, noto\_sans\_regular, dynads\_hybrid\_bold}

Font type for text strings. If you choose a text type which shows prices, and there are items with currencies other than dollar and euro in the product set, you should use `dynads_hybrid_bold` for your font. If you choose another font, we default to `dynads_hybrid_bold` for items with non-dollar, non-euro currencies

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_template_tags`

list<string>

A list of template tags used to create custom content for a `particular text_type`. For example, when `text_type` is `price`, format price by passing in `["{{product.price round}}"]` in order to format `334.56` as `335`. Some businesses have multiple pricing options and this field enables you to customize the pricing option that appears in an ad. For example, for hotels, two pricing options are `["{{hotel.base_price}}"]` or `["{{hotel.sale_price}}"]`. If you use text types with multiple fields, such as `strikethrough` and `percentage_off`, you should provide the higher price to be the first element in the array.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_type`

enum {price, strikethrough\_price, percentage\_off, custom, from\_price, disclaimer, guest\_rating, star\_rating, sustainable, automated\_personalize}

Content type for text string that overlays a dynamic item. We display the actual text strings from your catalog. For `price` text type with `pill_with_text` template, limited to 13 characters, including whole price string with currency symbols. Limited to 6 characters for `price` text type with other templates. Limited to 6 characters for `strikethrough_price` text type with all templates. We do not display text overlay for any item with a price string longer than these limits

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`theme_color`

enum {background\_e50900\_text\_ffffff, background\_f78400\_text\_ffffff, background\_00af4c\_text\_ffffff, background\_0090ff\_text\_ffffff, background\_755dde\_text\_ffffff, background\_f23474\_text\_ffffff, background\_595959\_text\_ffffff, background\_000000\_text\_ffffff, background\_ffffff\_text\_c91b00, background\_ffffff\_text\_f78400, background\_ffffff\_text\_009c2a, background\_ffffff\_text\_007ad0, background\_ffffff\_text\_755dde, background\_ffffff\_text\_f23474, background\_ffffff\_text\_646464, background\_ffffff\_text\_000000}

Theme colors to use in overlay. Includes background color and text color. Valid themes must contain two sets of color themes: one for white background with color text and another for color background and white text

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