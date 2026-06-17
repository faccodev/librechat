---
title: "Graph API Referência v24.0: Ad Adlabels"
source: "https://developers.facebook.com/docs/marketing-api/reference/adgroup/adlabels/"
scraped_at: "2026-02-01T14:31:52.241Z"
---

Versão Graph API

[v24.0](#)

# Ad Adlabels

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

You can update an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a POST request to [`/{ad_id}/adlabels`](/docs/marketing-api/reference/adgroup/adlabels/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specification of adlabels to be associated with the ad

Obrigatório

`execution_options`

list<enum{validate\_only}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

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