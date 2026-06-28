---
title: "Alterar especificações - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/overview/change-spec"
scraped_at: "2026-02-01T14:25:26.807Z"
---

# Alterar especificações de regras de anúncios

Esta página aborda em detalhes o `change_spec`, especificamente como criar a opção de execução e como usar os recursos mais avançados.

O `change_spec` é usado para tipos de execução como `CHANGE_BUDGET` e `CHANGE_BID` e contém estes parâmetros: `amount`, `limit`, `unit` e `target_field`.

Campo

Descrição

`amount`

**Obrigatório.**

Determina a quantia para alterar o orçamento ou lance. Os valores de outros parâmetros em `change_spec` determinam como essa quantia é usada.

  

**Valores compatíveis:** um valor numérico, como `3000` ou `-50`.

`limit`

**Opcional.**

Especifica a quantia máxima ou mínima do orçamento ou lance. Por exemplo, se o orçamento ou lance estiver sendo aumentado, esse número define um limite superior. Se `target_field` estiver presente, o valor especifica um intervalo entre o limite inferior e o superior de valores.

  

**Valores compatíveis:** moeda, como `5000` para representar US$ 50 ou, para `target_field`, um intervalo de moedas, como `[4000, 6000]` para representar de US$ 40 a US$ 60.

`unit`

**Obrigatório, a menos que `target_field` esteja presente.**

Especifica a unidade do valor `amount`. Por exemplo, se a unidade for `PERCENTAGE`, um `amount` de `-50` significa `-50%`.

  

**Valores compatíveis:**`ACCOUNT_CURRENCY` ou `PERCENTAGE`.

`target_field`

**Opcional.**

Especifica se os orçamentos ou lances devem ou não ser escalonados conforme um valor de destino. Se estiver presente, `amount` representa o valor de destino do campo de destino. O orçamento ou lance aumenta ou diminui proporcionalmente, dependendo se o valor atual do conjunto de anúncios para o campo de destino for mais baixo ou mais alto do que `amount`.

  

**Valores compatíveis:** um campo de insights, `cost_per_mobile_app_install` ou `mobile_app_purchase_roas`.

## Exemplos

Aqui está um exemplo de uma regra `CHANGE_BUDGET` que diminui os orçamentos em 30% para todos os conjuntos de anúncios com baixo desempenho (com `frequency` vitalícia alta de maneira estável). Essa regra só funciona à meia-noite nas terças e sextas-feiras.

```
curl \
-F 'name=Test Change Budget Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
          "start_minute": 0,
         "days": [2, 5]
       }
     ]
   }' \
-F 'evaluation_spec={
     "evaluation_type": "SCHEDULE",
     "filters": [
       {
         "field": "entity_type",
         "value": "ADSET",
         "operator": "EQUAL"
       },
       {
         "field": "time_preset",
         "value": "LIFETIME",
         "operator": "EQUAL"
       },
       {
         "field": "impressions",
         "value": 8000,
         "operator": "GREATER_THAN"
       },
       {
         "field": "frequency",
         "value": 5.0,
         "operator": "GREATER_THAN"
       }
     ]
   }' \
-F 'execution_spec={
     "execution_type": "CHANGE_BUDGET",
     "execution_options": [
       {
         "field": "change_spec",
         "value": {
           "amount": -30,
           "unit": "PERCENTAGE"
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Aqui está outro exemplo, onde o lance é escalonado diariamente com base em um valor de destino `cost_per_mobile_app_install` para o conjunto de anúncios `123`.

**Também adicionamos um filtro de intervalo para `cost_per_mobile_app_install` para lançar uma janela de tolerância de 10%.** Com isso, mudanças proporcionais pequenas não são realizadas se o valor atual estiver próximo o suficiente do valor de destino.

```
curl \
-F 'name=Test Change Bid Rule' \
-F 'schedule_spec={
     "schedule_type": "DAILY"
   }' \
-F 'evaluation_spec={
     "evaluation_type": "SCHEDULE",
     "filters": [
       {
         "field": "id",
         "value": [123],
         "operator": "IN"
       },
       {
         "field": "time_preset",
         "value": "LIFETIME",
         "operator": "EQUAL"
       },
       {
         "field": "mobile_app_install",
         "value": 100,
         "operator": "GREATER_THAN"
       },
       {
         "field": "cost_per_mobile_app_install",
         "value": [4.5, 5.5],
         "operator": "NOT_IN_RANGE"
       }
     ]
   }' \
-F 'execution_spec={
     "execution_type": "CHANGE_BID",
     "execution_options": [
       {
         "field": "change_spec",
         "value": {
           "amount": 5.0,
           "limit": [2.0, 10.0],
           "target_field": "cost_per_mobile_app_install"
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Por exemplo, se o valor atual for `4.0`, o lance aumentará em `25%`, pois essa é a diferença proporcional entre o valor de destino de `5.0` e o valor atual.

O limite impede que o lance aumente para mais de `10.0` e diminua para menos de `2.0`.

[](#)