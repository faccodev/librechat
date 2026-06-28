---
title: "Graph API Referência v24.0: Ad Account Asyncadcreatives"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/asyncadcreatives/"
scraped_at: "2026-02-01T14:34:09.294Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Asyncadcreatives

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `asyncadcreatives` edge from the following paths:

-   [`/act_{ad_account_id}/asyncadcreatives`](/docs/marketing-api/reference/ad-account/asyncadcreatives/)

When posting to this edge, no Graph object will be created.

### Parâmetros

Parâmetro

Descrição

`creative_spec`

AdCreative

Specs for ad creative

ObrigatórioSupports Emoji

`name`

UTF-8 encoded string

Name of async job

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