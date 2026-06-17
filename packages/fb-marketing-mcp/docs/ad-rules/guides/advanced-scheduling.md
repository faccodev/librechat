---
title: "Programação avançada - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/guides/advanced-scheduling"
scraped_at: "2026-02-01T13:56:29.794Z"
---

# Programação avançada

Esse documento fornece exemplos detalhados de `schedule_type` definido como `CUSTOM`.

Conforme mencionado na [documentação principal](/docs/marketing-api/ad-rules/overview/scheduled-based-rules):

Se `schedule_type` for definido como `CUSTOM`, também será necessário especificar a lista de períodos personalizados em que a regra deve ser executada. Na lista `schedule`, cada especificação individual pode ser composta por uma combinação dos campos a seguir, sendo obrigatória a inclusão de ao menos `start_minute` ou `days` em cada entrada.

Campo

Descrição

`start_minute`

Horário, em minutos, após às 12 h. Deve ser um múltiplo de 30 minutos. Quando isso é definido e não há `end_minute`, essa opção determina o horário exato de execução da regra. Caso contrário, `end_minute` será usado para determinar uma faixa de tempo para executar a regra. Se essa opção não estiver definida, a regra será executada `SEMI_HOURLY` para cada dia especificado em `days`.

`end_minute`

Horário, em minutos, após às 12 h. Deve ser múltiplo de 30 minutos e ser posterior a `start_minute`. Se definida, essa opção usa `start_minute` para determinar a faixa de tempo para executar a regra. Se `end_minute` for igual a `start_minute`, essa opção determinará o horário exato de execução da regra.

`days`

Lista de dias para executar a regra. Cada dia deve conter um valor de `0-6`, em que `0` representa domingo, `1`, representa segunda-feira, e assim por diante, com `6`, por fim, representando sábado. Se essa opção não estiver definida, a regra será executada em todos os 7 dias da semana de acordo com `start_minute` e `end_minute`, se houver.

Veja um exemplo de uso da Programação avançada para programar a regra para ser executada todos os dias às 10h. Ao omitir `days`, infere-se que essa especificação de programação será aplicada todos os dias.

```
curl \
-F 'name=Test Advanced Scheduling Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
         "start_minute": 600,
       }
     ]
   }' \
-F 'evaluation_spec={
     ...
   }' \
-F 'execution_spec={
     ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

## Exemplo

Veja um exemplo de uma regra que é executada a cada 30 minutos somente nos finais de semana. Ao omitir `start_minute`, infere-se que a regra será executada como `SEMI_HOURLY` nos dias especificados.

```
curl \
-F 'name=Test Advanced Scheduling Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
         "days": [0, 6]
       }
     ]
   }' \
-F 'evaluation_spec={
     ...
   }' \
-F 'execution_spec={
     ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Veja um exemplo de uma regra que é executada somente nas quartas-feiras às 2h. Ao omitir `end_minute`, infere-se que a regra só é executada em um horário específico, em vez de em uma faixa de tempo.

```
curl \
-F 'name=Test Advanced Scheduling Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
         "start_minute": 120,
         "days": [3]
       }
     ]
   }' \
-F 'evaluation_spec={
     ...
   }' \
-F 'execution_spec={
     ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Cada programação individual é calculada de maneira independente como uma OR com as outras programações. Veja um exemplo de uma regra executada o dia inteiro em dias da semana, mas somente das 12h às 13h nos finais de semana. Como há `end_minute` aqui, a faixa de tempo vai de `start_minute` até `end_minute`.

```
curl \
-F 'name=Test Advanced Scheduling Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
         "days": [1, 2, 3, 4, 5]
       },
       {
         "start_minute": 720,
         "end_minute": 780,
         "days": [0, 6]
       }
     ]
   }' \
-F 'evaluation_spec={
     ...
   }' \
-F 'execution_spec={
     ...
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Observe que não especificar `days` na segunda programação funcionará de maneira equivalente, pois a primeira especificação inclui a faixa das 12h às 13h em dias de semana.

[](#)