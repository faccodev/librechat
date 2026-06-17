---
title: "Regras de público - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/guides/audience-rules"
scraped_at: "2026-02-01T13:57:40.895Z"
---

# Regras de público

As regras de público determinam se uma pessoa é adicionada ao seu público personalizado. As regras são aplicadas na URL de referência ou em eventos e dados específicos.

Forneça suas regras como strings codificadas em JSON estruturadas desta forma:

-   Uma [regra de público](#audience-rules-syntax) contém dois [conjuntos de regras](#rule_set_syntax).
    
-   Cada [conjunto de regras](#rule_set_syntax) pode conter uma [regra de inclusão ou exclusão](#inclusion-exclusion).
    
-   Cada [regra de inclusão ou exclusão](#inclusion-exclusion) pode conter [filtros](#filter) e [funções de agregação](#aggregate).
    
-   Cada filtro contém um [conjunto de filtros](#filter-set).
    

Use as regras de público para diferentes tipos de públicos personalizados, incluindo [públicos personalizados do site](/docs/marketing-api/audiences/guides/website-custom-audiences), [públicos personalizados de app para celular](/docs/marketing-api/audiences/guides/mobile-app-custom-audiences) e [públicos personalizados offline](/docs/marketing-api/audiences/guides/offline-custom-audiences). Para regras de engajamento, consulte [Públicos personalizados de engajamento](/docs/marketing-api/audiences/guides/engagement-custom-audiences#rules).

### Limitações

-   Cada público pode especificar até 10 regras na regra de público. Isso inclui o número de `rules` em `inclusions` ou `exclusions`.
    
-   Cada regra pode especificar até 100 filtros, conhecidos como _nós folha_.
    

## Sintaxe das regras de público

Para definir uma regra de público, a seguinte estrutura deve ser seguida:

```
rule: {
   "inclusions": <RULE_SET>,
   "exclusions": <RULE_SET>,
}
```

#### Campos disponíveis

Nome

Descrição

`inclusions`

tipo: string

**Obrigatório.**

A string JSON do conjunto de regras que define a inclusão. Consulte [Sintaxe do conjunto de regras](#rule_set_syntax).

`exclusions`

tipo: string

**Obrigatório.**

A string JSON do conjunto de regras que define a exclusão. Consulte [Sintaxe do conjunto de regras](#rule_set_syntax).

[](#)

## Sintaxe do conjunto de regras

Para cada conjunto de regras, siga esta estrutura:

```
{
  "operator" : <BOOLEAN_OPERATOR>,
  "rules" : <JSON_RULE>,
}
```

#### Campos disponíveis

Nome

Descrição

`operator`

tipo: string

**Obrigatório.**

`and` ou `or`.

`rules`

tipo: string

**Obrigatório.**

A string JSON das regras (matriz de regras). Consulte [Sintaxe da regra de inclusão e exclusão](#inclusion-exclusion).

[](#)

## Sintaxe da regra de inclusão e exclusão

Para cada regra de inclusão ou exclusão, siga esta estrutura:

```
{
  "event_sources" : <EVENT_SOURCE_DEFINITION>, 
  "retention_seconds" : <SECONDS>,
  "filter" : <FILTER>,
  "aggregation" : <AGGREGATION>, 
}
```

Os campos `aggregation` e `retention_seconds` podem ser editados. No entanto, a edição de `aggregation` e `retention_seconds` não apagará o público. As pessoas que somente corresponderem à regra ou à agregação antiga continuarão no público até a expiração.

#### Campos disponíveis

Nome

Descrição

`event_sources`

tipo: string

**Obrigatório.**

O objeto JSON que contém o `id` e o `type`.

  

-   Para [públicos personalizados do site que usam pixel](/docs/marketing-api/audiences/guides/website-custom-audiences), defina o `id` como a identificação do seu pixel e o `type` como `'pixel'`.
    
-   Para [públicos personalizados de app para celular](/docs/marketing-api/audiences/guides/mobile-app-custom-audiences), defina o `id` como a identificação do seu app e o `type` como `app`.
    

É possível adicionar outras fontes de eventos a `type` usando uma lista delimitada por vírgulas, como `"store_visits,pixel,app"`.

`retention_seconds`

tipo: número inteiro

**Obrigatório.**

Número inteiro (em segundos) referente à janela de retenção do público; deve ser menor que `retention_days`. Mínimo: 1 dia/ máximo: 365 dias.

`filter`

tipo: string

**Obrigatório.**

A string JSON das regras do filtro. Consulte [Filtros](#filter).

`aggregation`

tipo: número inteiro

**Opcional.**

A string JSON das funções de agregação. Consulte [Funções agregadas](#aggregate).

[](#)

## Filtros

A filtragem segue este formato geral:

```
"filter" : {
  "operator": <BOOLEAN_OPERATOR>,
  "filters": <FILTER_SET>,
  }
```

#### Campos disponíveis

Nome

Descrição

`operator`

tipo: string

**Obrigatório.**

`and` ou `or`

`filters`

tipo: string

**Obrigatório.**

A matriz de objetos JSON das regras do filtro. Consulte [Sintaxe das regras do filtro](#filter-rules).

[](#)

## Sintaxe do conjunto de filtros

```
{
    "field": <FIELD>,
    "operator": <COMPARISON_OPERATOR>,
    "value": <VALUE>,
}
```

#### Campos disponíveis

Nome

Descrição

`field`

tipo: string

**Obrigatório.**

  

-   Para [públicos personalizados do site](/docs/marketing-api/audiences/guides/website-custom-audiences), use `'event'` se o filtro for destinado a especificar um evento. Os parâmetros que correspondem a eventos enviados pelo pixel (por exemplo, `'ViewContent'` ou `'Purchase'`).
    
-   Para [públicos personalizados de app para celular](/docs/marketing-api/audiences/guides/mobile-app-custom-audiences), use `'event'` se o filtro for destinado a especificar um evento. Os parâmetros que correspondem a eventos do app enviados pelo app (por exemplo, "\_appVersion", "\_value" e assim por diante).
    

`operator`

tipo: string

**Obrigatório.**

-   `=`
    
-   `!=`
    
-   `>=`
    
-   `>`
    
-   `<=`
    
-   `<`
    
-   `i_contains`
    
-   `i_not_contains`
    
-   `contains`
    
-   `not_contains`
    
-   `is_any`
    
-   `is_not_any`
    
-   `i_is_any`
    
-   `i_is_not_any`
    
-   `i_starts_with`
    
-   `starts_with`
    
-   `"regex_match"[INFO]`
    

Se `field` for definido como `event`, use `=`.

`value`

tipo: string

**Obrigatório.**

Se o atributo `field` for definido como `"event"`, o `value` deverá ser configurado como um nome de evento. Use a API Eventos do App para ver eventos e parâmetros relatados pelo app.

[](#)

## Funções agregadas

Crie públicos personalizados com base na frequência e na intensidade do comportamento usando a `aggregation` no campo de regras de público. Dessa forma, você pode definir uma função agregada, por exemplo:

```
"aggregation" : {
  "type":"count",
  "operator":">",
  "value":1
}
```

#### Campos disponíveis

Nome

Descrição

`type`

tipo: string

**Obrigatório.**

O tipo de função de agregação.

-   Para públicos personalizados do site, as seguintes funções estão disponíveis: `'count'`, `'sum'`, `'avg'`, `'min'`, `'max'`, `'time_spent'` e `'last_event_time_field'`.
    
-   Para públicos personalizados de app para celular, as seguintes funções estão disponíveis: `"count"`,`"sum"`, `"avg"`, `"min"` e `"max"`.
    

`config`

Obrigatório para determinados tipos de funções de agregação.

`method`

tipo: string

**Opcional.**

`"absolute"`, que significa adicionar pessoas que registaram eventos em um intervalo especificado, ou `"percentile"`, que significa adicionar pessoas a partir de um intervalo de percentil especificado. Se você selecionar `percentile`, o operador deverá ser apenas `in_range` e `not_in_range`.

`field`

tipo: string

**Obrigatório. A menos que o tipo seja `count`.**

O parâmetro ao qual a função de agregação é aplicada.

`operator`

tipo: string

**Obrigatório.**

`=`, `!=`, `>=`, `>`, `<=`, `<`, `in_range`, `not_in_range`

`value`

tipo: string

**Obrigatório.**

O valor esperado do parâmetro.

Por exemplo:

```
"aggregation" : {
  "type":"count",
  "operator":">",
  "value":1
}
```

#### Operadores de comparação

Operador

Descrição

`>` ou `gt`

Verdadeiro se o valor do parâmetro do evento for maior que o especificado.

`>=` ou `gte`

Verdadeiro se o valor do parâmetro do evento for maior que ou igual ao especificado.

`<` ou `lt`

Verdadeiro se o valor do parâmetro do evento for menor que o especificado.

`<=` ou `lte`

Verdadeiro se o valor do parâmetro do evento for menor que ou igual ao especificado.

`=` ou `eq`

Verdadeiro se o valor do parâmetro do evento for igual ao especificado. Observação: isso é equivalente a não especificar um operador; ou seja, "'x' : { 'eq' : 'y' }" é o mesmo que "'x' : 'y' }.

`!=` ou `neq`

Verdadeiro se o valor do parâmetro do evento for diferente do especificado.

`contains`

Verdadeiro se o valor do parâmetro do evento, como string, contiver a string especificada. O valor "shoe12345" atenderá a "contains" se "shoe" for especificado.

`not_contains`

Verdadeiro se o valor do parâmetro do evento, como string, não contiver a string especificada. O valor "shoe12345" atenderá a "not\_contains" se "purse" for especificado.

`i_contains`

Contém, não diferencia maiúsculas de minúsculas.

`i_not_contains`

Não contém, não diferencia maiúsculas de minúsculas.

`is_any`

Verdadeiro se o valor do parâmetro do evento corresponder a quaisquer strings na matriz especificada.

`is_not_any`

Verdadeiro se o valor do parâmetro do evento não corresponder a nenhuma string na matriz especificada.

`i_is_any`

"is\_any", não diferencia maiúsculas de minúsculas.

`i_is_not_any`

"is\_not\_any", não diferencia maiúsculas de minúsculas.

`starts_with`

Verdadeiro se o valor do parâmetro do evento começar com a string especificada.

`i_starts_with`

"starts\_with", não diferencia maiúsculas de minúsculas.

`regex_match`

Corresponde a uma expressão regular, como \\"example\\.com.\*purchase$\\". Há compatibilidade com a gramática PCRE (expressões regulares compatíveis com o Perl).

[](#)

## Exemplos

### Públicos personalizados do site

Faça a correspondência de todas as URLs de referência que contêm a string "shoes" nos últimos 30 dias:

```
{
    "inclusions": {
        "operator": "or",
        "rules": [
            {
                "event_sources": [
                    {
                        "type": "pixel",
                        "id": "<PIXEL_ID>",
                    }
                ],
                "retention_seconds": 2592000,
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "field": "url",
                            "operator": "i_contains",
                            "value": "shoes"
                        }
                    ]
                },
            }
        ]
    }
}
```

Faça a correspondência dos eventos `ViewContent` em que o preço do artigo é maior que ou igual a US$ 100,00 nos últimos 30 dias. Considere usar essa regra no seguinte evento:

```
_fbq.push([ 'track', 'ViewContent', { productId: 1234, category: 'Men > Shoes', price: 199 } ]);
```
```
{
    "inclusions": {
        "operator": "or",
        "rules": [
            {
                "event_sources": [
                    {
                        "type": "pixel",
                        "id": "<PIXEL_ID>"
                    }
                ],
                "retention_seconds": 2592000,
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "field": "event",
                            "operator": "eq",
                            "value": "ViewContent"
                        },
                        {
                            "operator": "or",
                            "filters": [
                                {
                                    "field": "price",
                                    "operator": ">=",
                                    "value": "100"
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
}
```

### Públicos personalizados de app para celular

Consulte a seção que mostra um [exemplo das regras de público personalizado de app para celular](/docs/marketing-api/audiences/guides/mobile-app-custom-audiences#example_rules).

[](#)

## Operadores e dados ou eventos

As regras contêm os seguintes operadores e dados ou eventos:

Operadores

Tipo de filtro

`i_contains`

Contém substring (não diferencia maiúsculas de minúsculas)

`i_not_contains`

Não contém substring (não diferencia maiúsculas de minúsculas)

`contains`

Contém substring (diferencia maiúsculas de minúscula)

`not_contains`

Não contém substring (diferencia maiúsculas de minúsculas)

`eq`

Igual a (diferencia maiúsculas de minúsculas)

`neq`

Diferente de (diferencia maiúsculas de minúscula)

`lt`

Menor que (somente campos numéricos)

`lte`

Menor que ou igual a (somente campos numéricos)

`gt`

Maior que (somente campos numéricos)

`gte`

Maior que ou igual a (somente campos numéricos)

`regex_match`

Corresponde a uma expressão regular, como `\"example\\.com.*purchase$\"`. Há compatibilidade com a gramática PCRE (expressões regulares compatíveis com o Perl).

Dados

Dados que estão sendo filtrados

`url`

URL com escape completo do site acessado.

`domain`

Domínio do site acessado.

`path`

Caminho do site acessado, excluindo o domínio.

`event`

Nome do `event` de pixel, como `'ViewContent'`.

`device_type`

Dispositivo que acessou o site:

`desktop`

`mobile_android_phone`

`mobile_android_tablet`

`mobile_ipad`

`mobile_ipod`

`mobile_iphone`

`mobile_tablet`

`mobile_windows_phone`

_qualquer campo `customData`_

Qualquer campo adicionado a `customData` para disparos do pixel, como `productId`, `category` e `price`.

Forneça cada regra como uma string codificada em JSON.

[](#)