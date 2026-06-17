---
title: "Graph API Referência v24.0: Business Adaccount"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/adaccount/"
scraped_at: "2026-02-01T16:04:57.989Z"
---

Versão Graph API

[v24.0](#)

# Business Adaccount

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `adaccount` edge from the following paths:

-   [`/{business_id}/adaccount`](/docs/marketing-api/reference/business/adaccount/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`ad_account_created_from_bm_flag`

boolean

ad\_account\_created\_from\_bm\_flag

`currency`

ISO 4217 Currency Code

The currency used for the account

Obrigatório

`end_advertiser`

The entity the ads will target. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`. Note that once a value other than `NONE` or `UNFOUND` is set, it cannot be modified any more.

Obrigatório

`funding_id`

numeric string or integer

ID of the [payment method](/docs/marketing-api/businessmanager/#invoice-funding). If the account does not have a payment method it will still be possible to create ads but these ads will get no delivery.

`invoice`

boolean

If business manager has Business Manager Owned Normal Credit Line on file on the FB CRM, it will attach the ad account to that credit line.

`invoice_group_id`

numeric string

The ID of the invoice group this adaccount should be enrolled in

`invoicing_emails`

array<string>

Emails addressed where invoices will be sent.

`io`

boolean

If corporate channel is direct sales.

`media_agency`

string

The agency, this could be your own business. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`

Obrigatório

`name`

string

The name of the ad account

Obrigatório

`partner`

string

The advertising partner for this account, if there is one. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`.

Obrigatório

`po_number`

string

Purchase order number

`timezone_id`

unsigned int32

ID for the timezone. See [here](/docs/marketing-api/reference/ad-account/timezone-ids).

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: token with structure: AdAccount ID,

`account_id`: numeric string,

`business_id`: numeric string,

`end_advertiser_id`: string,

`media_agency_id`: string,

`partner_id`: string,

`seer_ad_account_restricted_by_soft_desc_challenge`: bool,

`soft_desc_challenge_credential_id`: string,

`soft_desc_challenge_localized_auth_amount`: int32,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

3979

You have exceeded the number of allowed ad accounts for your Business Manager at this time.

3980

One or more of the ad accounts in your Business Manager are currently in bad standing or in review. All of your accounts must be in good standing in order to create new ad accounts.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

3902

There was a technical issue and your new ad account wasn't created. Please try again.

457

The session has an invalid origin

190

Invalid OAuth 2.0 Access Token

23007

This credit card can't be set as your account's primary payment method, because your account is set up to be billed after your ads have delivered. This setup can't be changed. Please try a different card or payment method.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)