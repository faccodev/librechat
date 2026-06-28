---
title: "Catálogo localizado para anúncios de catálogo Advantage+"
source: "https://developers.facebook.com/docs/marketing-api/catalog/localized-catalog-da"
scraped_at: "2026-02-01T15:51:29.623Z"
---

# Catálogo localizado para anúncios de catálogo Advantage+

## Visão geral

Use este guia ao configurar seu catálogo localizado para anúncios de catálogo Advantage+.

Seu [catálogo](/docs/marketing-api/catalog) é um objeto (ou contêiner) com informações sobre seus produtos, no qual você adiciona seu estoque.

### Como funciona

A Meta oferece a funcionalidade de catálogo localizado para que você promova itens em anúncios ou lojas para outros países. O caso de uso mais comum é localizar a moeda, o preço e o título ou a descrição. Também é possível criar um URL localizado para direcionar o cliente ao produto no site do país/idioma. Saiba como configurar o [catálogo localizado](/docs/marketing-api/catalog/localized-catalog/localized-catalog-setup).

## Criar um modelo para anúncios de catálogo Advantage+

Ao criar um modelo para os [Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management#create-template), você pode especificar personalizações no criativo em diferentes idiomas. Por exemplo, convém exibir um cabeçalho diferente para visualizadores do anúncio que falam outro idioma.

Além dos outros campos nos dados do modelo do criativo (na especificação da história do objeto), é possível especificar uma **matriz** de personalizações no campo `customization_rules_spec`, em que cada personalização tem este formato:

Nome do campo

Descrição

Aceita parâmetros de modelo

`customization_spec`

tipo: objeto

**Obrigatório.**

Descreve o idioma da personalização. Saiba como [criar anúncios de catálogo Advantage+ para vários idiomas e países](https://www.facebook.com/business/help/2144286692311411?locale=en_US).

Exemplo: `{'language' => 'en_XX'}`

Não

`message`

Tipo: string

**Opcional.**

Mensagem do anúncio, visível no Instagram.

Exemplo: `Test {{product.name | titleize}}`

Sim

`link`

Tipo: string

**Opcional.**

Link para seu site, usado para gerar a legenda do anúncio. Este campo sempre é substituído pelo campo `link` do seu feed de produtos, exceto o cartão final dos [anúncios em carrossel](https://developers.facebook.com/docs/marketing-api/guides/multi-product-ads#spec), que direcionam para ele. Não pode ser um URL em [Facebook.com](https://facebook.com/).

Exemplo: `//link.com`

  

Para anúncios de coleção, você pode usar `link` para fornecer um documento de experiências instantâneas, como detalhado em [Anúncios de coleção](https://developers.facebook.com/docs/marketing-api/guides/collection).

Exemplo: `https://fb.com/canvas_doc/CANVAS_ID`

Não

`name`

Tipo: string

**Opcional.**

Nome ou título do anúncio, visível no Instagram.

Exemplo: `Headline {{product.price}}`

Sim

`description`

Tipo: string

**Opcional.**

Descrição do anúncio. Não é visível no Instagram.

Exemplo: `Description {{product. description}}`

Sim

`template_url_spec`

tipo: objeto

**Opcional.**

Pode ser usado para fornecer um deep link da web, conforme detalhado em [Modelos e rastreamento de cliques](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/ads-management#create-template). **Observação**: apenas o deep link da web é compatível.

Exemplo: `{'web' => {'url' => DEEP_LINK}}`  
Exemplo: `{'web' => {'url' => 'example://link/?id={{product. retailer_id}}'}}`

Sim

`video_id`

tipo: número inteiro

**Opcional.**

Apenas para anúncios de coleção, é possível usar `video_id` para fornecer um vídeo para a mídia principal da coleção, conforme detalhado em [Anúncios de coleção](https://developers.facebook.com/docs/marketing-api/guides/collection).

Exemplo: `1234`

Não

`picture`

Tipo: string

**Opcional.**

Apenas para anúncios de coleção, é possível usar `picture` a fim de fornecer uma imagem para a mídia principal da coleção, conforme detalhado em [Anúncios de coleção](https://developers.facebook.com/docs/marketing-api/guides/collection).

Exemplo: `https://url/image.jpg`

Não

Ao especificar a matriz de personalizações, somente **uma** das personalizações deve definir somente o `customization_spec`. Isso identifica o idioma do texto não personalizado que foi usado em `template_data`.

Na renderização do anúncio, o idioma é escolhido com base no idioma da interface do usuário e em outros sinais. A Meta também usa propriedades de produtos do feed de idioma do catálogo para fazer a correspondência, conforme disponibilidade.

Veja também [Introdução aos anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management#create-template), [Campos compatíveis para produtos](/docs/marketing-api/catalog/reference#supported-fields) e [Formatos de feed compatíveis](/docs/marketing-api/catalog/reference#feed-format).

### Modelo para anúncios de coleção

Ao criar [anúncios de coleção](https://developers.facebook.com/docs/marketing-api/guides/collection), é possível especificar personalizações ao criativo, da mesma forma que os anúncios de catálogo Advantage+ em vários idiomas por meio de `customization_rules_spec`.

**Limitações**:

-   Nos anúncios de coleção, `link` precisa ser criado [usando modelos](https://developers.facebook.com/docs/marketing-api/guides/instant-experiences#templates) – Vitrine instantânea, antigo "Vender produtos, Grade (1932289657009030)"
    
-   O modelo para anúncios de coleção é veiculado apenas por meio de um posicionamento do feed do celular do Facebook.
    

### Exemplos

### Visualizar anúncios de catálogo Advantage+ em vários idiomas ou de vários países em outro idioma ou país

```
v24.0
```

### Criar um modelo de anúncios de catálogo Advantage+ em carrossel com vários idiomas

```
v24.0
```

### Criar um anúncio de coleção com mídia principal de imagem em vários idiomas

```
v24.0
```

### Criar um anúncio de coleção com mídia principal de vídeo em vários idiomas

```
v24.0
```

### Criar um anúncio de coleção com mídia principal de vídeo dinâmico em vários idiomas

```
v24.0
```

[](#)

## Saiba mais

-   [Localized Catalog Setup](/docs/marketing-api/catalog/localized-catalog-setup)
    
-   [Localized Catalog for Instagram Shopping](/docs/marketing-api/catalog/localized-catalog-ig)
    
-   [How to create a country or language feed to localize your catalog](https://www.facebook.com/business/help/2144286692311411?locale=en_US)
    
-   [Criar um modelo de criativo](/docs/marketing-api/dynamic-product-ads/ads-management#create-template)
    
-   [Catálogo](/docs/marketing-api/catalog)
    
-   [Supported Catalog Fields](/docs/marketing-api/catalog/reference#supported-fields)
    
-   [Supported Feed Formats](/docs/marketing-api/catalog/reference#feed-format)
    
-   [Introdução aos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management)
    

[](#)