---
title: "Graph API Referência v24.0: Ad Account Async Batch Requests"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/async_batch_requests/"
scraped_at: "2026-02-01T14:21:31.860Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Async Batch Requests

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `async_batch_requests` edge from the following paths:

-   [`/act_{ad_account_id}/async_batch_requests`](/docs/marketing-api/reference/ad-account/async_batch_requests/)

When posting to this edge, a [Campaign](/docs/marketing-api/reference/ad-campaign-group/) will be created.

### Parâmetros

Parâmetro

Descrição

`adbatch`

list<Object>

JSON encoded batch reqeust

Obrigatório

`name`

string

Obrigatório

`relative_url`

string

Obrigatório

`body`

UTF-8 encoded string

Obrigatório

`name`

UTF-8 encoded string

Name of the batch request for tracking purposes.

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

194

Missing at least one required parameter

100

Invalid parameter

2500

Error parsing graph query

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)