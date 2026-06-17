---
title: "Graph API Referência v24.0: Business Owned Ad Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/owned_ad_accounts/"
scraped_at: "2026-02-01T16:05:16.332Z"
---

Versão Graph API

[v24.0](#)

# Business Owned Ad Accounts

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `owned_ad_accounts` edge from the following paths:

-   [`/{business_id}/owned_ad_accounts`](/docs/marketing-api/reference/business/owned_ad_accounts/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`adaccount_id`

string

Ad account ID.

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`access_status`: string,

}

### Error Codes

Erro

Descrição

3979

You have exceeded the number of allowed ad accounts for your Business Manager at this time.

3994

Personal accounts that do not have any history of activity are not eligible for migration to a business manager. Instead create an ad account inside your business manager.

100

Invalid parameter

3980

One or more of the ad accounts in your Business Manager are currently in bad standing or in review. All of your accounts must be in good standing in order to create new ad accounts.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

3936

You've already tried to claim this ad account. You'll see a notification if your request is accepted.

368

The action attempted has been deemed abusive or is otherwise disallowed

3944

Your Business Manager already has access to this object.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)