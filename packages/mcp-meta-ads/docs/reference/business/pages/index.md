---
title: "Graph API Referência v24.0: Business Pages"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/pages/"
scraped_at: "2026-02-01T16:11:27.250Z"
---

Versão Graph API

[v24.0](#)

# Business Pages

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/pages`](/docs/marketing-api/reference/business/pages/).

### Parâmetros

Parâmetro

Descrição

`page_id`

Page ID

Page ID.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

42001

This Page can't be removed because it's already linked to an Instagram business profile. To remove this Page from Business Manager, go to Instagram and convert to a personal account or change the Page linked to your business profile.

200

Permissions error

3996

The page does not belong to this Business Manager.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

100

Invalid parameter

[](#)