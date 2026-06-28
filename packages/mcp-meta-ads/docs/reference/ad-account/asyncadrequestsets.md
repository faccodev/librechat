---
title: "Graph API Referência v24.0: Ad Account Asyncadrequestsets"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/asyncadrequestsets"
scraped_at: "2026-02-01T15:43:59.318Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Asyncadrequestsets

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `asyncadrequestsets` edge from the following paths:

-   [`/act_{ad_account_id}/asyncadrequestsets`](/docs/marketing-api/reference/ad-account/asyncadrequestsets/)

When posting to this edge, no Graph object will be created.

### Parâmetros

Parâmetro

Descrição

`ad_specs`

list<dictionary { non-empty string : <string> }>

Specs for ads in the request set

Obrigatório

`name`

UTF-8 encoded string

Name of the request set

Obrigatório

`notification_mode`

enum{OFF, ON\_COMPLETE}

Specify `0` for no notifications and `1` for notification on completion.

`notification_uri`

URL

If notifications are enabled, specify the URL to send them.

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