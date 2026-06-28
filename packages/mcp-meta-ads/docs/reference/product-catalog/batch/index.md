---
title: "Graph API Referência v24.0: Product Catalog Batch"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/batch/"
scraped_at: "2026-02-01T16:12:40.296Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Batch

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

There should be no new integrations with this endpoint. The `/items_batch` endpoint should be used instead. If you are still making calls to the `/batch` endpoint please use this [guide](https://developers.facebook.com/docs/marketing-api/catalog/guides/manage-catalog-items/catalog-batch-api/migrate-to-items-batch) to migrate to `/items_batch`.

You can make a POST request to `batch` edge from the following paths:

-   [`/{product_catalog_id}/batch`](/docs/marketing-api/reference/product-catalog/batch/)

When posting to this edge, a [ProductItem](/docs/marketing-api/reference/product-item/) will be created.

### Parâmetros

Parâmetro

Descrição

`allow_upsert`

boolean

Valor padrão: `true`

Parameters specifying whether non existing items that are being updated should be inserted or should throw the error

`requests`

list<JSON object>

Array of JSON objects containing batch requests. Each batch request consists of `retailer_id`, `method` and `data` fields.

```
`retailer_id` - retailer's ID for a
  product.


  `method` - an operation of a batch request, either `CREATE`, `UPDATE`
  or `DELETE`.


  `data` - JSON object containing fields and values for a product. See [Catalog Batch API](https://developers.facebook.com/docs/marketing-api/catalog-batch) to learn more the list of fields and values for the data object.
```

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`handles`: List \[

string

\],

`validation_status`: List \[

Struct {

`errors`: List \[

Struct {

`message`: string,

}

\],

`retailer_id`: string,

`warnings`: List \[

Struct {

`message`: string,

}

\],

}

\],

}

### Error Codes

Erro

Descrição

80014

There have been too many calls for the batch uploads to this catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#catalog.

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)