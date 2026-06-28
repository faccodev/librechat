---
title: "Graph API Referência v24.0: Ad Account Activities"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/activities/"
scraped_at: "2026-02-01T14:33:24.090Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Activities

[](#)

## Leitura

Activities related to an Ad Account.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [AdActivity](/docs/marketing-api/reference/ad-activity/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

613

Calls to this api have exceeded the rate limit.

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

100

Invalid parameter

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)