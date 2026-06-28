---
title: "Graph API Referência v24.0: Product Catalog Marketplace Partner Signals"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/marketplace_partner_signals/"
scraped_at: "2026-02-01T16:15:17.058Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Marketplace Partner Signals

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

You can update a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a POST request to [`/{product_catalog_id}/marketplace_partner_signals`](/docs/marketing-api/reference/product-catalog/marketplace_partner_signals/).

### Parâmetros

Parâmetro

Descrição

`event_id`

string

event\_id

Unique identifier for conversion events. If there are multiple conversion events tied to a single `mp_clid`, this field will be used to differentiate between those events

`event_name`

enum {PURCHASE, ADD\_TO\_CART, VIEW\_ITEM, TEST}

event\_name

`TEST` events can be used to send test data to confirm API functionality that Marketplace will ignore

Obrigatório

`event_source_url`

string

event\_source\_url

`event_time`

datetime/timestamp

event\_time

Obrigatório

`order_data`

JSON object

order\_data

`order_details`

array<JSON object>

Valor padrão: `[]`

order\_details

`item_price`

float

item\_price

Obrigatório

`item_quantity`

int64

item\_quantity

Obrigatório

`item_id`

string

item\_id

Obrigatório

`currency`

string

currency

Obrigatório

`order_total`

float

order\_total

Obrigatório

`user_data`

JSON object

user\_data

Obrigatório

`mp_clid`

string

mp\_clid

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`validation_status`: List \[

Struct {

`errors`: List \[

Struct {

`message`: string,

}

\],

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

100

Invalid parameter

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)