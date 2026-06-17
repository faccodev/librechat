---
title: "Graph API Referência v24.0: Custom Audience Ad Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-audience/ad_accounts/"
scraped_at: "2026-02-01T14:29:22.895Z"
---

Versão Graph API

[v24.0](#)

# POST and DELETE Custom Audience Ad Accounts

[](#)

A partir de 14 de setembro de 2021, estes campos retornarão erros para chamadas da versão 12.0 ou posteriores feitas por aplicativos sem as permissões necessárias do ponto de extremidade. Essa alteração será aplicada a todas as versões em 13 de dezembro de 2021.

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `ad_accounts` edge from the following paths:

-   [`/{custom_audience_id}/ad_accounts`](/docs/marketing-api/reference/custom-audience/ad_accounts/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`adaccounts`

list<numeric string>

Array of new ad account IDs to receive access to the custom audience

`permissions`

string

`targeting` or `targeting_and_insights`. If `targeting` the recipient ad account can target the audience in ads. `targeting_and_insights` also allows recipient account to view the audience in Audience Insights tool

`relationship_type`

array<string>

relationship\_type

`replace`

boolean

`true` or `false`. If `true` the list of `adaccounts` provided in the call will replace the existing set of ad accounts this audience is shared with.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`sharing_data`: List \[

Struct {

`ad_acct_id`: string,

`business_id`: numeric string,

`audience_share_status`: string,

`errors`: List \[

string

\],

}

\],

}

### Error Codes

Erro

Descrição

200

Permissions error

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate an [AdAccount](/docs/marketing-api/reference/ad-account/) from a [CustomAudience](/docs/marketing-api/reference/custom-audience/) by making a DELETE request to [`/{custom_audience_id}/ad_accounts`](/docs/marketing-api/reference/custom-audience/ad_accounts/).

### Parâmetros

Parâmetro

Descrição

`adaccounts`

list<numeric string>

Array of ad account IDs to revoke access to the custom audience

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)