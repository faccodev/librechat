---
title: "Tags de microdados - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/microdata-tags"
scraped_at: "2026-02-01T15:52:44.559Z"
---

# Tags de microdados

Os [microdados](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMicrodata_%28HTML%29&h=AT1uB_ZDj5-Hmp0IMaNMTUnTqcrqX5FAFznX_vHEf5XwXQ7Let9y2wZEUDots1N0JbzItCphiAYqzprYIKQZ8dzaeshJxD7nbJRDYiGg19nk5nZSX1B_-2_4nKbePijXI81ldWzTlgf8zloBufAHcRpjfl7fuVjEy9MiRDpsrS4) são uma especificação HTML usada para inserir metadados no conteúdo já existente das páginas da web. Eles usam um vocabulário de apoio para descrever um item e pares nome-valor para atribuir valores às respectivas propriedades.

Você pode usar tags de microdados no seu site para disponibilizar informações sobre seus produtos usando um formato padronizado. Aceitamos estes 3 formatos:

-   **[OpenGraph](#opengraph)**: posicione os microdados no elemento `head` do seu site.
    
-   **[Schema.org](#schema-org)**: posicione os microdados na página onde os produtos estão localizados.
    
-   **[JSON-LD para Schema.org](#json-ld)**: posicione os microdados dentro da tag "script" (veja o exemplo abaixo).
    

Dependendo do tipo de protocolo que você escolher, os microdados precisarão estar no local certo do seu site.

Para conferir se as tags de microdados estão funcionando, use esta [ferramenta de depuração de microdados](https://business.facebook.com/ads/microdata/debug).

Se você atualizar os microdados no seu site, as informações do produto não serão atualizadas no Gerenciador de Comércio até que seu pixel seja disparado pelo menos uma vez, indicando que alguém interagiu com o item no site. Caso o produto não receba tráfego no site depois que você atualizar os microdados, o item não será atualizado no seu catálogo.

## OpenGraph

Os catálogos baseados em pixel usam a atividade do seu pixel para adicionar produtos ao seu catálogo. Para poder incluir um produto no seu catálogo, primeiro você precisa adicionar tags obrigatórias que contenham informações sobre o item ("microdados") na página do produto. Confira as [tags obrigatórias e opcionais para OpenGraph](https://developers.facebook.com/docs/marketing-api/catalog/reference/#og-tags).

No momento, só é possível criar catálogos de comércio eletrônico, usando o pixel do Facebook.

**Exemplo** – OpenGraph

```
<meta property="og:title" content="Facebook T-Shirt">
<meta property="og:description" content="Unisex Facebook T-shirt, Small">
<meta property="og:url" content="https://example.org/facebook">
<meta property="og:image" content="https://example.org/facebook.jpg">
<meta property="product:brand" content="Facebook">
<meta property="product:availability" content="in stock">
<meta property="product:condition" content="new">
<meta property="product:price:amount" content="7.99">
<meta property="product:price:currency" content="USD">
<meta property="product:retailer_item_id" content="facebook_tshirt_001">
<meta property="product:item_group_id" content="fb_tshirts">
```

[](#)

## Schema.org

Confira as [tags obrigatórias para Schema.org](https://developers.facebook.com/docs/marketing-api/catalog/reference/#schema-og-required-tags).

**Exemplo**: Schema.org

```
<div itemscope itemtype="http://schema.org/Product">
  <meta itemprop="brand" content="facebook">
  <meta itemprop="name" content="Facebook T-Shirt">
  <meta itemprop="description" content="Unisex Facebook T-shirt, Small">
  <meta itemprop="productID" content="facebook_tshirt_001">
  <meta itemprop="url" content="https://example.org/facebook">
  <meta itemprop="image" content="https://example.org/facebook.jpg">
  <div itemprop="value" itemscope itemtype="http://schema.org/PropertyValue">
    <span itemprop="propertyID" content="item_group_id"></span>
    <meta itemprop="value" content="fb_tshirts"></meta>
  </div>
  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <link itemprop="availability" href="http://schema.org/InStock">
    <link itemprop="itemCondition" href="http://schema.org/NewCondition">
    <meta itemprop="price" content="7.99">
    <meta itemprop="priceCurrency" content="USD">
  </div>
</div>
```

[](#)

## JSON-LD para Schema.org

Confira as [tags obrigatórias de JSON-LD para Schema.org](https://developers.facebook.com/docs/marketing-api/catalog/reference/#json-ld).

**Exemplo**: JSON-LD para Schema.org

```
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Product",
  "productID":"facebook_tshirt_001",
  "name":"Facebook T-Shirt",
  "description":"Unisex Facebook T-shirt, Small",
  "url":"https://example.org/facebook",
  "image":"https://example.org/facebook.jpg",
  "brand":"facebook",
  "offers": [
    {
      "@type": "Offer",
      "price": "7.99",
      "priceCurrency": "USD",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  ],
  "additionalProperty": [{
    "@type": "PropertyValue",
    "propertyID": "item_group_id",
    "value": "fb_tshirts"
  }]
}
</script>
```

[](#)

## Saiba mais

-   [Ferramenta de depuração de microdados](https://business.facebook.com/ads/microdata/debug)
    
-   [Referência, Catálogo](https://developers.facebook.com/docs/marketing-api/catalog/reference)
    

[](#)