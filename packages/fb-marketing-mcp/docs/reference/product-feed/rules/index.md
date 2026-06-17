---
title: "Graph API Referência v24.0: Product Feed Rules"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-feed/rules/"
scraped_at: "2026-02-01T15:54:03.596Z"
---

Versão Graph API

[v24.0](#)

# Product Feed Rules

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `rules` edge from the following paths:

-   [`/{product_feed_id}/rules`](/docs/marketing-api/reference/product-feed/rules/)

When posting to this edge, a [ProductFeedRule](/docs/marketing-api/reference/product-feed-rule/) will be created.

### Parâmetros

Parâmetro

Descrição

`attribute`

string

The attribute to which the rules are going to be applied. Its value maps to the the property we are going to transform.  
**Note:** A feed can not have more than one rule with the same rule\_type and attribute.

Obrigatório

`params`

dictionary { string : <string> }

Specifies the parameters which are going to be used as the input of the rule.  
  
Each rule expects params object to be of particular form:  
mapping\_rule: {"map\_from": string}  
value\_mapping\_rule: {string: string}  
letter\_case\_rule: {"type": one of  
regex\_replace\_rule: {regex: string} //regex ==a valid regular expression eg: \[Cc\]olou?r"to\_upper", "to\_lower", "capitalize\_all", "capitalize\_first"}  
fallback\_rule: {"user\_default\_value": string}  

`rule_type`

enum{mapping\_rule, value\_mapping\_rule, letter\_case\_rule, fallback\_rule, regex\_replace\_rule}

A type of a rule. Defines the operation that is going to be applied to the attribute.

Obrigatório

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