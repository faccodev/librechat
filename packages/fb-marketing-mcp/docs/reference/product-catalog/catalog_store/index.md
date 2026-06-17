---
title: "Graph API Referência v24.0: Product Catalog Catalog Store"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/catalog_store/"
scraped_at: "2026-02-01T16:12:47.199Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Catalog Store

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `catalog_store` edge from the following paths:

-   [`/{product_catalog_id}/catalog_store`](/docs/marketing-api/reference/product-catalog/catalog_store/)

When posting to this edge, a [StoreCatalogSettings](/docs/graph-api/reference/store-catalog-settings/) will be created.

### Parâmetros

Parâmetro

Descrição

`page`

numeric string

The parent page associated with the store product catalog

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)