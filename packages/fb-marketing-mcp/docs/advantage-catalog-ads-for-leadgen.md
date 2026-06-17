---
title: "Anúncios de catálogo Advantage+ para geração de leads - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads-for-leadgen"
scraped_at: "2026-02-01T14:12:26.909Z"
---

# Anúncios de Catálogo Advantage+ para geração de leads

Gere leads com seus [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads). Se você tiver um [catálogo de produtos](/docs/marketing-api/catalog) pronto e veicular anúncios de catálogo Advantage+, poderá coletar leads com seus anúncios no Facebook. O Facebook seleciona os itens mais relevantes do seu conjunto de produtos, como faz com todos os anúncios de catálogo Advantage+, e exibe um formulário de geração de leads quando alguém clica em um item.

Quando você baixa os leads pela API ou como um arquivo, incluímos um `retailer_item_id`. Essa identificação mostra em quais itens a pessoa clicou e para os quais ela forneceu informações de lead.

## Criar anúncios de catálogo Advantage+ para geração de leads

Crie uma campanha com `objective` definido como `OUTCOME_LEADS`.

```
v24.0
```
  

Isso retornará um `campaign_id` que você poderá usar no conjunto de anúncios.

Como em todos os anúncios de catálogo Advantage+, é preciso especificar um `product_set_id` no `promoted_object` para o conjunto de anúncios. Isso permitirá anunciar produtos desse conjunto. Para geração de leads, defina `optimization_goal` como `LEAD_GENERATION`.

```
v24.0
```

`DYNAMIC_AUDIENCE_ID` se refere ao [público do produto](/docs/marketing-api/audiences/guides/dynamic-product-audiences) que visualiza seus anúncios. É possível omitir `DYNAMIC_AUDIENCE_ID` e definir o direcionamento com base no comportamento ou em dados demográficos para alcançar um público. Para isso, forneça o parâmetro `product_audience_specs` ou `excluded_product_audience_specs`.

Consulte [Introdução aos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-ads/get-started#adset) para saber mais.

[](#)

## Como fornecer o anúncio e o criativo

Primeiro, forneça o criativo do anúncio:

```
v24.0
```

Isso retornará um `creative_id` que você poderá usar para criar ou atualizar um [anúncio](/docs/marketing-api/adgroup):

```
v24.0
```

[](#)

## Como buscar leads

Se a identificação do lead vier de uma integração de CRM, por exemplo, você poderá solicitar detalhes, incluindo o `item_id`.

```
v24.0
```

Também é possível fazer consultas em lote de todos os leads para um formulário:

```
v24.0
```

Ou para um anúncio:

```
v24.0
```

[](#)