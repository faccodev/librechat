---
title: "Anúncios de viagem - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/travel-ads"
scraped_at: "2026-02-01T14:17:32.093Z"
---

# Anúncios de viagem

Promova seu inventário de viagens no Facebook de forma automática. Os anúncios de viagem do Facebook usam sinais de intenção em todos os dispositivos para promover automaticamente as opções de viagem relevantes do inventário com criativos únicos no Facebook.

Os anúncios de viagem são compatíveis com **[anúncios de hotel](/docs/marketing-api/dynamic-ads-for-hotels)**, de **[voo](/docs/marketing-api/dynamic-ads-for-flights)** e de **[destino](/docs/marketing-api/dynamic-ads-for-destinations)**.

Este guia pressupõe que você já tenha feito o seguinte:

-   Criou um catálogo e um conjunto de produtos.
    
-   Configurou os eventos de viagem necessários no seu site ou app para celular.
    
-   Criou uma [Página do Facebook](https://www.facebook.com/pages/create/) e uma [conta de anúncios](https://www.facebook.com/ads/manager/accounts) (obrigatório).
    

## Estratégias de direcionamento

Os anúncios de viagem são compatíveis com diferentes estratégias de direcionamento. Impulsione diferentes objetivos de negócios ao combinar o público e o conjunto de produtos apropriado:

-   [Redirecionamento](#retargeting): mostre hotéis, destinos ou voos relevantes para pessoas que visitaram seu site ou app em busca de hotéis, destinos ou voos.
    
-   [Venda cruzada e upsell](#crosssell): direcione hotéis relevantes a pessoas que tenham comprado um voo ou faça upsell de embarque prioritário ou seleção de assentos.
    
-   [Prospecção](#prospecting): aumente o alcance do anúncio e encontre novos clientes com o direcionamento da [prospecção de públicos](#prospecting).
    

## Configurar anúncios de viagem

Para criar anúncios de viagem, siga o mesmo processo de configuração dos outros tipos de anúncio do Facebook com a API.

-   [**Etapa 1: criar uma campanha**](#campaign)
    
-   [**Etapa 2: criar um conjunto de anúncios**](#adset)
    
-   [**Etapa 3: fornecer um criativo do anúncio**](#creative)
    
-   [**Etapa 4: criar um anúncio**](#ad)
    
-   [**Próximas etapas**](#whatsnext)
    

## Etapa 1. criar uma campanha

Os anúncios de viagem usam o objetivo `PRODUCT_CATALOG_SALES`. Especifique um catálogo de viagens em `promoted_object` no nível da campanha:

```
v24.0
```

[](#)

## Etapa 2. criar um conjunto de anúncios

Assim que tiver a campanha e `campaign_id`, crie o [conjunto de anúncios](/docs/marketing-api/reference/ad-campaign). O conjunto define as opções de lance e direcionamento dos anúncios.

### Redirecionamento

Para **fazer o redirecionamento** de visitantes do site ou do app, use um público dinâmico do mesmo tipo que o conjunto de produtos que você está promovendo. Por exemplo, promova um conjunto de hotéis a um público de hotel, um conjunto de voos a um público de voo e um conjunto de destinos a um público de destino.

### Venda cruzada e upsell

Se quiser fazer **venda cruzada ou upsell** com clientes que compraram no seu site e/ou app, use um público dinâmico que contenha essas pessoas e promova opções de viagem de outro catálogo. Por exemplo, faça o direcionamento de um [público de compra de voo](/docs/marketing-api/dynamic-ads-for-travel/audience-management) com um conjunto de hotéis ou com outro conjunto de voos que destaque a escolha de assentos.

### Prospecção

-   Crie um público com direcionamento demográfico básico, por exemplo, mulheres nos EUA com mais de 18 anos.
    
-   Inclua clientes que foram alvo de campanhas de redirecionamento existentes, mas considere excluir as pessoas que fizeram compras nos últimos 10 dias.
    
-   Use um conjunto de produtos amplo com mais de 100 hotéis.
    
-   Faça a otimização de `OFFSITE_CONVERSIONS` com sinais de intenção mais fortes, por exemplo, `Purchase` ou `InitiateCheckout`.
    

Consulte também [Introdução aos Anúncios de Catálogo Advantage+ – Direcionamento a um público amplo](/docs/marketing-api/dynamic-product-ads/ads-management#adset-broad-audiences).

### Exemplo de criação de um conjunto de anúncios

```
v24.0
```

Os anúncios de viagem **não são compatíveis com especificações de direcionamento de público dinâmico inline no conjunto de anúncios**. Primeiro, você precisa [criar um público](/docs/marketing-api/dynamic-ads-for-travel/audience-management#create-audience) separadamente.

[](#)

## Etapa 3. fornecer um criativo do anúncio

Para anúncios de viagem, você pode usar **tags de modelo** nos [criativos do anúncio](/docs/marketing-api/reference/ad-creative). Quando o Facebook exibe seu anúncio, ele substitui as tags de modelo por escolhas reais de viagem da pessoa. É possível usar tags de modelo no próprio anúncio, bem como na URL visualizada pelas pessoas quando elas clicam no anúncio.

-   [Tags de modelo de hotéis](/docs/marketing-api/dynamic-ads-for-hotels/template-tags)
    
-   [Tags de modelo de destinos](/docs/marketing-api/dynamic-ads-for-destinations/template-tags)
    
-   [Tags de modelo de voos](/docs/marketing-api/dynamic-ads-for-flights/template-tags)
    

Use o campo `template_url_spec` para especificar a URL que aparecerá depois que alguém clicar no anúncio. Se a URL não for fornecida ou se não for possível obtê-la ao renderizar o anúncio, exibiremos a URL do catálogo. **Para anúncios de voo, este campo será obrigatório se você não fornecer uma URL no catálogo.**

Você pode exibir um item ou um carrossel com vários deles. Para anúncios de item único, você pode exibir várias imagens do mesmo item no carrossel caso o catálogo tenha diversas imagens por item. Também é possível mostrar cartões estáticos e cartões dinâmicos. Para mais informações sobre opções de criativo, consulte [Introdução aos Anúncios de Catálogo Advantage+ – Criar um modelo de criativo](/docs/marketing-api/dynamic-product-ads/ads-management/#adtemplate).

O exemplo a seguir mostra como gerar um criativo de carrossel para [anúncios de hotéis](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-hotels/v3.1). Os [anúncios de destinos](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-destinations/v3.1) e de [voos](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-flights/v3.1) são configurados de forma semelhante.

```
v24.0
```

### Upsell de voo (somente API v2.10 e versões posteriores)

Quanto a opções de upsell, como escolha de assentos ou embarque prioritário para um público que comprou voos, você precisará fazer o seguinte:

1.  Forneça um público ao incluir somente eventos de `PURCHASE`.
2.  Nas `recommender_settings` do criativo do anúncio, especifique eventos de `PURCHASE` para recomendar anúncios (preferencial).

```
curl \ -F 'name=Advantage+ Catalog Ad Template Creative Up-sell Sample' \ -F 'object_story_spec={ "page_id": "<PAGE_ID>", "template_data": { "additional_image_index": 0, "call_to_action": {"type":"LEARN_MORE"}, "description": "{{flight.description}}", "link": "<LINK>", "message": "Book extra leg room on your flight from {{flight.origin_city}} to {{flight.destination_city}}", } }' \ -F 'template_url_spec={ "config": {"app_id":"<APP_ID>"}, "ios": { "url": "example:\/\/home\/flight?id={{flight.origin_airport}}&startDate={{trip.departing_departure_date date_format:Y-m-d | urlencode}}&endDate={{trip.returning_departure_date date_format:Y-m-d | urlencode}}" }, "web": { "url": "http:\/\/www.example.com\/flight?id={{flight.origin_airport}}&startDate={{trip.checkin_date date_format:Y-m-d | urlencode}}&endDate={{trip.returning_departure_date date_format:Y-m-d | urlencode}}" } }' \ -F 'product_set_id=<FLIGHT_SET_ID>' \ -F 'recommender_settings'={"preferred_events":["Purchase"]}\ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/VERSION/act_<AD_ACCOUNT_ID>/adcreatives
```

### Design de sobreposição

As sobreposições permitem que os anunciantes adicionem informações de preços (como preço direto ou porcentagem de desconto) sobre cada item dos anúncios de catálogo Advantage+.

#### Opções de sobreposição por tipo de catálogo

É possível usar os seguintes tipos de sobreposição, dependendo do tipo de catálogo do conjunto de anúncios:

-   Hotel: `price`, `strikethrough` e `% off`
    
-   Destino: `price`
    
-   Voo: `price`
    

**Observação**: todas as tags de modelo relacionadas a preços de cada tipo de catálogo são compatíveis com as opções de sobreposição acima. Para ver as tags de modelo de cada tipo de catálogo, consulte as documentações sobre [hotéis](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-hotels/template-tags/v2.11), [destinos](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-destinations/template-tags/v2.11) e [voos](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-flights/template-tags/v2.11).

#### Opções de design de sobreposição

As informações de preços são obtidas de forma dinâmica a partir das colunas de preço e de preço de venda do feed. Os anunciantes podem escolher as seguintes personalizações para os anúncios de catálogo Advantage+:

-   Formatos: cápsula, círculo e triângulo.
    
-   Posições: 4 cantos fixos (`TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT` e `BOTTOM_RIGHT`). Para triângulo, apenas `TOP_LEFT` e `TOP_RIGHT` são compatíveis.
    
-   Fontes: lista de fontes predefinidas, como Droid Serif, Open Sans, entre outras.
    
-   Tipos compatíveis de sobreposição: `price`, `strikethrough` e `% off`. **Observação**: `strikethrough` e `% off` estão disponíveis somente para hotéis.
    

Saiba mais sobre [como adicionar sobreposições](https://www.facebook.com/business/help/1492206750869184).

#### Exemplo: sobreposição de preço com tachado para anúncio de hotel

```
curl \ -F 'name=Test Templates in Overlay' \ -F 'object_story_spec={ "page_id": "<PAGE_ID>", "template_data": { "description": "Description", "link": "<LINK>", "name": "Name: {{hotel.name}}", "message" : "Come visit {{hotel.city}}!", "image_overlay_spec": { "overlay_template":"pill_with_text", "text_font":"droid_serif_regular", "text_type":"strikethrough_price", "position":"top_left", "theme_color":"background_e50900_text_ffffff", "float_with_margin":"true", "text_template_tags": ["{{hotel.price round}}", "{{hotel.sale_price round}}"], } } }' \ -F 'product_set_id=<PRODUCT_SET_ID>' \ -F 'template_url=http://www.example.com' \ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v2.10/act_897427477067185/adcreatives
```

[](#)

## Etapa 4. Criar anúncio

Para criar o [anúncio](/docs/marketing-api/reference/adgroup), use `ad_set_id` e `creative_id`.

```
v24.0
```

[](#)

## Próximas etapas

### Ver uma prévia do anúncio

Você pode gerar uma prévia do Criativo Advantage+ para Catálogo com a [API de Prévias de Anúncio](/docs/reference/ads-api/generatepreview). Inclua o parâmetro `product_item_ids` para especificar quais itens do catálogo serão exibidos na prévia.

Gere uma prévia do anúncio com a [API de Prévias de Anúncio](/docs/reference/ads-api/generatepreview). Include the `product_item_ids` to specify which catalog items appears in the preview, `start_date`, and `end_date` to specify specific dates.

```
v24.0
```

#### Parâmetros

Tipo e nome do campo

Descrição

`product_item_ids`

Tipo: `array[string]`

-   **Hotel**: lista de tokens de identificação codificados em Base64url ou de FBIDs de hotel. Os tokens estão no formato `hotel_catalog:{catalog_id}:{base64urlencode(hotel_id)}`.
    
-   **Destino**: lista de tokens de identificação codificados em Base64url ou de FBIDs de destino. Os tokens estão no formato `destination_catalog:{catalog_id}:{base64urlencode(destination_id)}`.
    
-   **Voo**: token de identificação codificado em Base64url ou FBID de voo. Os tokens estão no formato `flight_catalog:{catalog_id}:{base64urlencode(destination_id)}`.
    

`start_date`

tipo: `string`

Renderiza a prévia com o sinal de intenção do usuário, por exemplo, 2016-12-24.

-   Para hotel, é o valor de `trip.checkin_date`.
    
-   Para destino, é o valor de `trip.travel_start`.
    
-   Para voo, é o valor de `trip.departing_departure_date`.
    

`end_date`

tipo: `string`

Renderiza a prévia com o sinal de intenção do usuário, por exemplo, 2017-01-01.

-   Para hotel, é o valor de `trip.checkout_date`.
    
-   Para destino, é o valor de `trip.travel_end`.
    
-   Para voo, é o valor de `trip.returning_departure_date`.
    

### Obter estatísticas e Insights sobre anúncios de viagem

Para obter Insights sobre anúncios para um objeto de viagem (como um hotel), faça uma chamada `GET` a [`/insights`](/docs/marketing-api/insights-api/getting-started). **Observação:** lembre-se de adicionar `product_id` ao parâmetro `breakdown`.

Para hotel e destino, o detalhamento `product id` será exibido para cada `hotel_id` ou `destination_id`. Para voo, o detalhamento `product id` exibirá `origin_airport:destination_airport`.

### Obter comentários e curtidas

Para recuperar comentários e curtidas de anúncios de catálogo Advantage+, use a [API de Publicação Dinâmica](/docs/graph-api/reference/rtb-dynamic-post/).

[](#)