---
title: "Criativo Advantage+ para catálogo - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-creative-for-catalog"
scraped_at: "2026-02-01T14:16:09.904Z"
---

# Criativo Advantage+ para catálogo

Nos [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads), você tem a opção de usar um criativo Advantage+ para catálogo. Esse recurso exibe diferentes formatos e criativos de anúncio para contas da Central de Contas com base no conteúdo ao qual elas são mais propensas a responder.

Atualmente, os formatos disponíveis são [anúncios de coleção](/docs/marketing-api/guides/collection) e [anúncios em carrossel](/docs/marketing-api/guides/videoads). Ambos os formatos têm diferentes [opções para variação de criativos](#creative-variations). A opção a ser exibida será escolhida com base no conteúdo que tem mais probabilidade de repercutir com cada conta da Central de Contas que vê o anúncio. Definiremos um formato para cada impressão de anúncio, se uma descrição será mostrada e, se sim, qual das opções.

## Antes de começar

Se quiser usar o criativo Advantage+ para catálogo, siga as etapas 1 e 2 em [Introdução aos anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads/get-started) e prossiga para a [etapa 3](#provide_creative) abaixo.

-   [Etapa 1: criar uma campanha de anúncios](/docs/marketing-api/dynamic-product-ads/ads-management#campaign)
    
-   [Etapa 2: criar um conjunto de anúncios](/docs/marketing-api/dynamic-product-ads/ads-management#adset)
    

[](#)

## Etapa 3: fornecer um criativo do anúncio

Ao fornecer o criativo da campanha, especifique `FORMAT_AUTOMATION` como `optimization_type` em `asset_feed_spec` para usar o criativo Advantage+ para catálogo. Sua chamada de API deve incluir estes campos:

-   [`product_set_id`](#product-set-id)
    
-   [`template_data`](#template-data)
    
-   [`asset_feed_spec`](#asset-feed-spec)
    

### `product_set_id`

Forneça o ID do conjunto de produtos que será usado. Um conjunto de produtos é um grupo de itens relacionados em um catálogo veiculado em [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads).

### `template_data`

Você pode adicionar parâmetros de modelo ao criativo do anúncio. Esses parâmetros são renderizados no tempo de execução com base nos dados do feed de produtos. O objeto `template_data` em [`object_story_spec`](/docs/marketing-api/reference/ad-creative-object-story-spec/) permite que você crie o modelo.

Em criativos Advantage+ para catálogo, `template_data` tem os seguintes campos **obrigatórios**:

Nome

Descrição

`multi_share_end_card`

Se o anunciante quer usar o cartão final no formato de anúncio em carrossel. Se você estiver usando o cartão, defina como `true`; caso contrário, defina como `false`.

`name`

**Opcional**.

A tag de modelo a ser usada como nome do produto. Consulte as [tags de modelos compatíveis](#template-tags).

`link`

O link para a página de destino fora do site. Ao clicar no botão de chamada para ação, o usuário será direcionado para esse link.

`message`

**Opcional**.

A cópia do anúncio.

`call_to_action`

A chamada para ação que o usuário verá no anúncio. Use qualquer tipo de chamada para ação compatível com os anúncios de catálogo Advantage+.

### `asset_feed_spec`

Um feed de ativos é uma coleção de diferentes elementos de criativo, como imagens, títulos, corpos, entre outros. `asset_feed_spec` fornece as especificações para o feed de ativos.

Em criativos Advantage+ para catálogo, `asset_feed_spec` pode incluir:

Nome

Descrição

`optimization_type`

**Obrigatório.**

O tipo de otimização a ser usado. Defina como `FORMAT_AUTOMATION`.

`ad_formats`

**Obrigatório.**

Uma lista de formatos de anúncio. Defina como `["CAROUSEL", "COLLECTION"]`.

`descriptions`

**Opcional.**

Especifique uma opção de descrição. O texto é usado para anúncios em carrossel. Use [tags de anúncios](#template-tags) compatíveis ou uma mensagem em formato livre.

`images`

**Opcional**.

Use este campo para definir uma imagem personalizada como mídia de capa no anúncio de coleção. [Exemplo de chamada de API usando o campo](#custom-image).

`videos`

**Opcional**.

Use este campo para definir um vídeo personalizado como mídia de capa no anúncio de coleção. [Exemplo de chamada de API usando o campo](#custom-video).

### `creative_features_spec`

Você pode aceitar/recusar otimizações usando o `creative_features_spec` e os campos compatíveis com o Advantage+ para catálogo.

No Advantage+ para catálogo, `asset_feed_spec` pode incluir:

Nome

Descrição

`adapt_to_placement`

**Opcional.**

Aceite se quiser que as imagens de proporção 9:16 no catálogo sejam exibidas em posicionamentos compatíveis (Instagram Stories/Instagram Reels/Facebook Stories/Facebook Reels).

`media_type_automation`

**Opcional.**

Aceite se quiser que os vídeos do catálogo sejam exibidos (juntamente com imagens) em posicionamentos compatíveis. Consulte [Mídia dinâmica](/docs/marketing-api/advantage-catalog-ads/dynamic-media) para saber mais.

`dynamic_partner_content`

**Opcional.**

Ative se você quiser que os anúncios em parceria ativos de outras campanhas apareçam em uma coleção com itens do catálogo. Isso não afetará outras campanhas de anúncios. O campo `enroll_status` pode ser definido como `OPT_IN` ou `OPT_OUT`.

**Observação:** este recurso aparece como **Anúncios em parceria dinâmicos** no Gerenciador de Anúncios.

`add_text_overlay`

**Opcional.**

No Gerenciador de Anúncios, esse recurso aparece como "Adicionar sobreposições dinâmicas". Habilite o recurso se quiser adicionar informações dos itens do catálogo como sobreposição únicas visualmente.

O campo `enroll_status` pode ser definido como `OPT_IN` ou `OPT_OUT`.

Se você quiser controlar a forma como a sobreposição é renderizada, consulte [Ad Creative Link Data Image Layer Spec](/docs/marketing-api/reference/ad-creative-link-data-image-layer-spec/) para saber mais.

### Exemplo: comportamento padrão

Neste caso, a mídia de capa dos anúncios de coleção é predefinida como um vídeo de catálogo Advantage por padrão:

```
curl \
   -F 'name=Advantage+ creative for catalog test' \
   -F 'adset_id=<AD_SET_ID>' \
   -F 'creative={ 
     "name": "Creative for Advantage+ creative for catalog test",
     "product_set_id": "<PRODUCT_SET_ID>", 
     "object_type": "SHARE",
     "object_story_spec": { 
     "page_id": "<PAGE_ID>", 
     "template_data": { 
        "multi_share_end_card": "true",
        "name": "{{product.name}}", 
        "link": "<OFFSITE_LANDING_PAGE>",
        "message": "<AD_COPY>",
        "call_to_action": {"type": "SHOP_NOW"}, 
        }},
      "asset_feed_spec":{
        "optimization_type":"FORMAT_AUTOMATION",
        "ad_formats": ["CAROUSEL", "COLLECTION"]},
        "descriptions": [{"text": "{{product.brand}}", "From {{product.current_price}}", ...]}
   }' \
   -F 'url_tags=<URL_TAGS>' \
   -F 'tracking_specs=[{"action.type":"offsite_conversion","fb_pixel":<PIXEL_ID>}]' \
   -F 'access_token=<ACCESS_TOKEN>' \
   https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT>/ads
```

### Exemplo: imagem personalizada

Neste caso, a mídia de capa dos anúncios de coleção é definida como uma imagem personalizada:

```
curl \
  -F 'name=Advantage+ creative for catalog test - custom image' \
  -F 'adset_id=<AD_SET_ID>' \
  -F 'creative={ 
  "name": "Creative For Advantage+ creative for catalog test - custom image",
  "product_set_id": "<PRODUCT_SET_ID>", 
  "object_type": "SHARE",
  "object_story_spec": { 
    "page_id": "<PAGE_ID>", 
    "template_data": {
      "multi_share_end_card": "true",
      "name": "{{product.name}}", 
      "link": "<OFFSITE_LANDING_PAGE>",
      "message": "<AD_COPY>",
      "call_to_action": {"type": "SHOP_NOW"}, 
      }
  },
  "asset_feed_spec":{
    "optimization_type":"FORMAT_AUTOMATION",
    "ad_formats": ["CAROUSEL", "COLLECTION"],
    "images": [{"hash": "<customized_image_hash>"}],
    "descriptions": [{"text": "{{product.description}}", "From {{product.current_price}}", ...]
    } 
   }' \
   -F 'url_tags=<URL_TAGS>' \
   -F 'tracking_specs=[{"action.type":"offsite_conversion","fb_pixel":<PIXEL_ID>}]' \
   -F 'access_token=<ACCESS_TOKEN>' \
   https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT>/ads
```

### Exemplo: vídeo personalizado

Neste caso, a mídia de capa dos anúncios de coleção é definida como um vídeo personalizado:

```
curl \
  -F 'name=Advantage+ creative for catalog test - custom video' \
  -F 'adset_id=<AD_SET_ID>' \
  -F 'creative={ 
  "name": "Creative For Advantage+ creative for catalog test - custom video",
  "product_set_id": "<PRODUCT_SET_ID>", 
  "object_type": "SHARE",
  "object_story_spec": { 
    "page_id": "<PAGE_ID>", 
    "template_data": { 
      "multi_share_end_card": "true",
      "link": "<LINK>",
      "message": "<AD_COPY>",
      "call_to_action": {"type": "SHOP_NOW"}, 
       }
   },
  "asset_feed_spec":{
    "optimization_type":"FORMAT_AUTOMATION",
    "ad_formats": ["CAROUSEL", "COLLECTION"], 
    "videos": [{"video_id": "<VIDEO_ID>"}]},
    "descriptions": [{"text": "{{product.description}}", "From {{product.current_price}}", ...]}
   }' \
   -F 'tracking_specs=[{"action.type":"offsite_conversion","fb_pixel":<PIXEL_ID>}]' \
   -F 'access_token=<ACCESS_TOKEN>' \
   https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT>/ads
```

### Exemplo: aceite para otimização de adaptação ao posicionamento

Neste caso, as imagens de 9:16 no catálogo serão usadas para exibição em tela cheia em posicionamentos compatíveis.

Para o Instagram Stories, você tem a opção de remover o cartão de apresentação que mostra 4 pequenas imagens de produtos para ter a imagem de 9:16 do primeiro produto exibida usando `NONE` em vez de `AUTO` para o valor do parâmetro de personalização `showcase_card_display`.

```
v24.0
```

### Exemplo: aceite para otimização de automação de tipo de mídia

Neste caso, os vídeos no catálogo serão usados no anúncio em posicionamentos compatíveis. Consulte [Mídia dinâmica](/docs/marketing-api/advantage-catalog-ads/dynamic-media) para saber mais.

```
v24.0
```

[](#)

## Variações de criativo

### Resumo das opções disponíveis

Formato

Variações de criativo

[Anúncios de coleção](#collection-ads)

A mídia de capa pode ser uma destas opções:

-   Um vídeo de catálogo do Advantage _(padrão)_
    
-   Uma imagem personalizada
    
-   Um vídeo personalizado
    

É necessário escolher uma opção.

[Anúncios em carrossel](#carousel-ads)

A descrição pode ser uma destas opções:

-   Informações do produto com origem no catálogo
    
-   Mensagem personalizada em formato livre
    

Ambas as opções podem ser usadas simultaneamente.

### Anúncios de coleção

O formato de coleção conta com três produtos sob uma hero image ou um hero video que são abertos em uma experiência instantânea em tela cheia. A hero image ou o hero video também são chamados de mídia de capa. As chamadas de API do criativo Advantage+ para catálogo variam conforme a opção escolhida como mídia de capa.

O comportamento padrão é adicionar um vídeo de catálogo Advantage como mídia de capa do anúncio. Nesse caso, geramos automaticamente um vídeo de catálogo Advantage personalizado para cada usuário que vir o anúncio. O vídeo destaca os produtos mais relevantes para o usuário. Outra alternativa é fornecer uma imagem ou um vídeo próprio personalizado para a mídia de capa.

Consulte [Sobre os anúncios em coleção](https://www.facebook.com/business/help/11289146072381) na Central de Ajuda para saber mais.

### Anúncios em carrossel

Com o formato carrossel, é possível exibir duas ou mais imagens e vídeos, descrições e links ou chamadas para ação em um único anúncio. No criativo Advantage+ para catálogo, é possível selecionar variações possíveis de descrição.

Especifique as variações de descrição na chamada de API com o parâmetro `descriptions` em `asset_feed_spec`. Inclua as opções de descrição em `descriptions` e coloque a primeira em `description`.

As opções de descrição podem conter informações de catálogo ou novas mensagens curtas em formato livre, como "Frete grátis".

#### Tags de modelo

Para usar as informações disponíveis no catálogo, você pode incluir as seguintes tags de modelo:

**Produtos**

-   `{{product.price}}`
    
-   `{{product.current_price}}`
    
-   `{{product.description}}`
    
-   `{{product.short_description}}`
    
-   `{{product.brand}}`
    
-   `{{product.name}}`
    

**Hotéis**

-   `{{hotel.base_price}}`
    
-   `{{hotel.sale_price}}`
    
-   `{{hotel.total_price}}`
    
-   `{{hotel.brand}}`
    
-   `{{hotel.name}}`
    
-   `{{hotel.description}}`
    

**Voos**

-   `{{flight.price}}`
    
-   `{{flight.description}}`
    

**Destinos**

-   `{{destination.price}}`
    
-   `{{destination.name}}`
    
-   `{{destination.description}}`
    

**Classificados de imóveis**

-   `{{home_listing.price}}`
    
-   `{{home_listing.name}}`
    
-   `{{home_listing.description}}`
    

**Veículos**

-   `{{vehicle.price}}`
    
-   `{{vehicle.sale_price}}`
    
-   `{{vehicle.description}}`
    

**Ofertas de veículos**

-   `{{vehicle_offer.amount}}`
    
-   `{{vehicle_offer.price}}`
    
-   `{{vehicle_offer.description}}`
    

**Modelos automotivos**

-   `{{automotive_model.price}}`
    
-   `{{automotive_model.description}}`
    

Estas tags não podem ser usadas simultaneamente:

-   `{{product.price}}` e `{{product.current_price}}`
    
-   `{{product.description}}` e `{{product.short_description}}`
    
-   `{{hotel.base_price}}`, `{{hotel.sale_price}}` e `{{hotel.total_price}}`
    
-   `{{vehicle.price}}` e `{{vehicle.sale_price}}`
    
-   `{{vehicle_offer.amount}}` e `{{vehicle_offer.price}}`
    

#### Limitações

Lembre-se do seguinte:

-   A descrição pode ter apenas uma tag de modelo.
    
-   É possível incluir até três opções de descrição.
    
-   Apenas uma descrição em formato livre é aceita. A descrição em formato livre conta como uma das três opções permitidas. Se uma delas tiver formato livre, será possível adicionar mais duas com tags de modelo.
    
-   A mesma tag não pode ser usada em diferentes opções de descrição. Depois de usar uma tag, procure uma diferente para usar em outra descrição.
    

Consulte [Sobre os anúncios em carrossel](https://www.facebook.com/business/help/773889936018967) na Central de Ajuda para saber mais.

[](#)