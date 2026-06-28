---
title: "Graph API Referência v24.0: Business China Business Onboarding Attributions"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/china_business_onboarding_attributions/"
scraped_at: "2026-02-01T16:11:11.657Z"
---

Versão Graph API

[v24.0](#)

# Business China Business Onboarding Attributions

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `china_business_onboarding_attributions` edge from the following paths:

-   [`/{business_id}/china_business_onboarding_attributions`](/docs/marketing-api/reference/business/china_business_onboarding_attributions/)

When posting to this edge, a [Business](/docs/marketing-api/reference/business/) will be created.

### Parâmetros

Parâmetro

Descrição

`advertiser_identifier`

string

\[Optional\] Advertiser identifiers used to analyze the customer acquisition lifecycle

`csi`

string

\[Optional\] Meta generated tracking id

`update_token_id`

numeric string

\[Optional\] ID for the OE Token to be updated. Providing this ID value will result in updating the existing OE Token instead of creating a new OE Token

`utm`

string

\[Optional\] Marketing campaign name

### Return Type

Struct {

`id`: numeric string,

`link_with_id`: string,

`utm`: string,

`csi`: string,

`advertiser_identifier`: string,

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

Não é possível executar esta operação neste ponto de extremidade.

[](#)