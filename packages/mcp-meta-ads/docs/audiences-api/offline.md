---
title: "Públicos Personalizados offline - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences-api/offline"
scraped_at: "2026-02-01T13:59:07.660Z"
---

# Públicos Personalizados offline

Agrupe as pessoas que visitaram sua loja, ligaram para o seu atendimento ao cliente ou realizaram ações offline e direcione anúncios do Facebook para elas.

Por exemplo, se você quiser fazer o direcionamento para pessoas que gastaram mais de US$ 1.000 nos últimos 90 dias:

```
curl \
-F 'name=90d High Value' \
-F 'rule={"inclusions":{"operator":"or","rules":[{"retention_seconds":7776000,"event_sources":[{"id":"<OFFLINE_EVENT_SET_ID>","type":"offline_events"}],"filter":{"operator":"and","filters":[{"operator":"=","field":"event","value":"Purchase"}]},"aggregation":{"type":"sum","field":"value","operator":">","value":"1000"}}]}}' \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/customaudiences"
```

Os Públicos Personalizados de conversões offline são baseados em eventos de conversão carregados em um conjunto de eventos offline. Confira a documentação da [API de Conversões Offline](/docs/marketing-apis/offline-conversions/).

Desde setembro de 2018, não aceitamos `subtype` de públicos personalizados de sites, de aplicativos e de engajamento nem públicos de dados de conversão offline. A única exceção é que continuamos a aceitar `subtype` de públicos personalizados de engajamento para vídeo.

## Criar um público

Para criar um Público Personalizado do seu conjunto de eventos offline, a conta já deve ter aceitado os Termos de Serviço para Públicos Personalizados no [Gerenciador de Anúncios](https://www.facebook.com/ads/manage/powereditor/):

```
curl \
  -F 'name=My New Offline Event Set' \
  -F 'rule={"inclusions":{"operator":"or","rules":[{"retention_seconds":2592000,"event_sources":[{"id":"<OFFLINE_EVENT_SET_ID>","type":"offline_events"}],"filter":{"operator":"and","filters":[{"operator":"=","field":"event","value":"purchase"},{"operator":">","field":"value","value":"50+Sheet1!A2+Sheet1!A2+Sheet1!A2+"}]}}]}}'
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/customaudiences
```

Estes são os parâmetros mais relevantes para Públicos Personalizados do site:

Nome

Descrição

`name`

tipo: string

**Obrigatório.**

O nome do cluster.

`rule`

tipo: string

**Obrigatório.**

Regras de público que serão aplicadas à URL do referenciador.

`description`

tipo: string

**Opcional.**

Descrição do Público Personalizado.

[](#)

## Regras de público

As regras determinam se uma conta do Centro de Contas deve ser adicionada a esse público. Elas se aplicam a eventos offline enviados por meio da [API de Conversões Offline](https://developers.facebook.com/docs/marketing-apis/offline-conversions/) ou carregados manualmente com o gerenciador de eventos offline. As regras são aplicadas a eventos específicos ou ao campo `custom_data`. Consulte [Regras de público](/docs/marketing-api/audiences/overview/audience-rules) para saber mais. Veja também:

-   [Sintaxe das regras de público](/docs/marketing-api/audiences/overview/audience-rules#audience-rules-syntax).
    
-   [Sintaxe do conjunto de regras](/docs/marketing-api/audiences/overview/audience-rules#rule_set_syntax).
    
-   [Sintaxe das regras de inclusão e exclusão](/docs/marketing-api/audiences/overview/audience-rules#inclusion-exclusion): em `event_source`, defina `id` como sua identificação do pixel e `type` como `pixel`.
    
-   [Filtros](/docs/marketing-api/audiences/overview/audience-rules#filter).
    
-   [Regras de filtro](/docs/marketing-api/audiences/overview/audience-rules#filter-rules): em `field`, use `"event"` caso o filtro especifique um evento. Parâmetros que correspondem a eventos enviados pelo pixel (por exemplo, `'ViewContent'` ou `'Purchase'`).
    
-   [Funções agregadas](/docs/marketing-api/audiences/overview/audience-rules#aggregate).
    

### Exemplo de regras de Público Personalizado offline

```
//Match all referring `favorite_food` containing the string `'pizza'` in the last 30 days:

{
    "inclusions": {
        "operator": "or",
        "rules": [
            {
                "event_sources": [
                    {
                        "type": "offline_events",
                        "id": "<OFFLINE_EVENT_SET_ID>",
                    }
                ],
                "retention_seconds": 2592000,
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "field": "custom_data.favorite_food",
                            "operator": "i_contains",
                            "value": "pizza"
                        }
                    ]
                },
            }
        ]
    }
}
```

Corresponde aos eventos Purchase em que o custo é maior ou igual a US$ 100 nos últimos 30 dias. Considere usar essa regra no seguinte evento:

```
{
    "inclusions": {
        "operator": "or",
        "rules": [
            {
                "event_sources": [
                    {
                        "type": "offline_events",
                        "id": "<OFFLINE_EVENT_SET_ID>"
                    }
                ],
                "retention_seconds": 2592000,
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "field": "event",
                            "operator": "eq",
                            "value": "Purchase"
                        },
                        {
                            "operator": "or",
                            "filters": [
                                {
                                    "field": "value",
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

Corresponde aos eventos Purchase em que a cor do produto é `blue` definida por atributos de evento offline no campo `custom_data` chamado "color" nos últimos 30 dias. Considere usar essa regra no seguinte evento:

```
{
    "inclusions": {
        "operator": "or",
        "rules": [
            {
                "event_sources": [
                    {
                        "type": "offline_events",
                        "id": "<OFFLINE_EVENT_SET_ID>"
                    }
                ],
                "retention_seconds": 2592000,
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "field": "event",
                            "operator": "eq",
                            "value": "Purchase"
                        },
                        {
                            "operator": "or",
                            "filters": [
                                {
                                    "field": "custom_data.color",
                                    "operator": "eq",
                                    "value": "blue"
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

[](#)

## Boas práticas

-   Experimente com diferentes públicos, por exemplo, pessoas que compraram com frequência no passado e não voltaram recentemente ou pessoas que só compraram de uma categoria.
    
-   Crie públicos semelhantes com base nos públicos de melhor desempenho.
    

[](#)