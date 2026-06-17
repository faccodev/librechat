---
title: "Regras baseadas em cronograma - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/guides/scheduled-based-rules"
scraped_at: "2026-02-01T13:56:20.268Z"
---

# Regras baseadas em cronograma

Monitore o status dos seus anúncios com uma periodicidade definida para determinar se cumprem os critérios descritos na [`evaluation_spec`](/docs/marketing-api/ad-rules/evaluation-spec). Para usar regras baseadas em cronograma, é necessário adicionar outra `schedule_spec`.

```
curl \
-F 'name=Rule 1' \
-F 'evaluation_spec={
    ...
   }' \
-F 'execution_spec={
    ...
   }' \
-F 'schedule_spec={
     "schedule_type": "DAILY"
   }' \

-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

## Especificação de cronograma

A `schedule_spec` de uma regra determina a frequência em que ela deve ser executada. Essa periodicidade é indicada no campo `schedule_type`.

Tipo de cronograma

Descrição

`DAILY`

Executar a regra à meia-noite no fuso horário da conta de anúncios.

`HOURLY`

Executar a regra no início de cada hora.

`SEMI_HOURLY`

Executar a regra a cada meia-hora a partir do início de uma hora.

`CUSTOM` ([Exemplo](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/advanced-scheduling))

Executar a regra em períodos personalizados.

Se `schedule_type` for definido como `CUSTOM`, também será necessário especificar a lista de períodos personalizados ou horários em que a regra deve ser executada.

Na lista `schedule`, cada especificação pode conter uma combinação dos seguintes campos. A única exigência é que ao menos um dos parâmetros `start_minute` e `days` esteja presente em cada especificação.

Campo

Descrição

`start_minute`

Horário, em minutos, após às 12 h. Deve ser um múltiplo de 30 minutos. Quando isso é definido e não há `end_minute`, essa opção determina o horário exato de execução da regra. Caso contrário, `end_minute` será usado para determinar uma faixa de tempo para executar a regra. Se essa opção não estiver definida, a regra executará `SEMI_HOURLY` para cada dia especificado em `days`.

`end_minute`

Horário, em minutos, após às 12 h. Deve ser múltiplo de 30 minutos e ser posterior a `start_minute`. Se definida, essa opção usa `start_minute` para determinar a faixa de tempo para executar a regra. Se `end_minute` for igual a `start_minute`, essa opção determinará o horário exato de execução da regra.

`days`

Lista de dias para executar a regra. Cada dia deve conter um valor de `0-6`, em que `0` representa domingo, `1`, representa segunda-feira, e assim por diante, com `6`, por fim, representando sábado. Se essa opção não estiver definida, a regra será executada em todos os 7 dias da semana de acordo com `start_minute` e `end_minute`, se houver.

Para obter mais informações sobre como usar os tipos de cronograma `CUSTOM`, acesse [Cronograma avançado](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/advanced-scheduling).

Veja um exemplo de `evaluation_spec`. Esta regra se aplica a todos os objetos da lista inicial de IDs que, nos últimos 7 dias, tiveram mais de `10000` impressões. Nesse caso, não é necessário usar o filtro `entity_type`, já que definimos uma lista estática de objetos iniciais usando um filtro de `id` sem prefixo.

```
curl \
-F 'name=Rule 1' \
-F 'schedule_spec={
    ...
   }' \
-F 'evaluation_spec={
      "evaluation_type" : "SCHEDULE",
      "filters" : [
       {
         "field": "time_preset",
         "value": "LAST_7_DAYS",
         "operator": "EQUAL"
       },
       {
         "field": "effective_status",
         "value": ["ACTIVE"],
         "operator": "IN"
       },
       {
         "field": "id",
         "value": [101, 102, 103],
         "operator": "IN"
       },
       {
         "field": "impressions",
         "value": 10000,
         "operator": "GREATER_THAN"
       }
     ]
   }' \
-F 'execution_spec={
    ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Veja outro exemplo aqui. Esta regra se aplica a todos os conjuntos de anúncio contidos nas campanhas de anúncio com IDs `101, 102, 103` que usam apenas orçamentos totais e foram criadas para durar menos de 48 horas. Nesse caso, não é preciso usar o filtro `time_preset`, já que não há filtros de insights.

```
curl \
-F 'name=Rule 1' \
-F 'schedule_spec={
    ...
   }' \
-F 'evaluation_spec={
      "evaluation_type" : "SCHEDULE",
      "filters" : [
       {
         "field": "entity_type",
         "value": "ADSET",
         "operator": "EQUAL"
       },
       {
         "field": "campaign.id",
         "value": [101, 102, 103],
         "operator": "IN"
       },
       {
         "field": "budget_reset_period",
         "value": ["LIFETIME"],
         "operator": "IN"
       },
       {
         "field": "hours_since_creation",
         "value": 48,
         "operator": "LESS_THAN"
       },
     ]
   }' \
-F 'execution_spec={
    ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Veja um exemplo de `execution_spec` aqui. Esta regra aumenta em 10% o orçamento de todos os objetos correspondentes, com um limite máximo de 5 execuções. Ou seja, para cada objeto correspondente, um aumento de 10% no orçamento só poderia acontecer no máximo cinco vezes.

```
curl \
-F 'name=Rule 1' \
-F 'schedule_spec={
    ...
   }' \
-F 'evaluation_spec={
    ...
   }' \
-F 'execution_spec={
     "execution_type": "CHANGE_BUDGET",
     "execution_options": [
       {
         "field": "change_spec",
         "value": {
           "amount": 10,
           "unit": "PERCENTAGE"
         },
         "operator": "EQUAL"
       },
       {
         "field": "execution_count_limit",
         "value": 5,
         "operator": "EQUAL"
       }
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Veja outro exemplo aqui. Esta regra pausa todos os objetos correspondentes e envia um e-mail a uma lista de usuários.

```
curl \
-F 'name=Rule 1' \
-F 'schedule_spec={
    ...
   }' \
-F 'evaluation_spec={
    ...
   }' \
-F 'execution_spec={
     "execution_type": "PAUSE",
     "execution_options": [
       {
         "field": "user_ids",
         "value": [1001, 1002],
         "operator": "EQUAL"
       }
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

[](#)