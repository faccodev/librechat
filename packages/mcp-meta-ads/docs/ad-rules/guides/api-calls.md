---
title: "Chamadas de API - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/guides/api-calls"
scraped_at: "2026-02-01T13:56:45.427Z"
---

# Chamadas de API

Veja exemplos de chamadas de API para usar o mecanismo de regras de anúncio.

## Ler todas as regras de uma conta

```
curl -G   \
-d 'fields=name,evaluation_spec,execution_spec,status'   \
-d 'access_token=<ACCESS_TOKEN>'   \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

[](#)

## Ler uma regra

```
curl -G   \
-d 'fields=name,evaluation_spec,execution_spec,status'   \
-d 'access_token=<ACCESS_TOKEN>'   \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>
```

[](#)

## Atualizar uma regra

Para atualizar uma especificação, forneça todos os campos, **incluindo os que permanecerão inalterados**. Confira a seguir um exemplo de atualização do gatilho de regras para cada 1.000 impressões. Não é preciso alterar as especificações para atualizar o status de uma regra.

```
curl \
-F 'evaluation_spec={
      "evaluation_type": ...,
      "trigger" : {
        "type": "STATS_MILESTONE",
        "field": "impressions",
        "value": 1000,
        "operator": "EQUAL"
      },
      "filters": ...
     ]
   }' \
-F 'access_token=<ACCESS_TOKEN>'   \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>
```

Confira a seguir um exemplo de atualização dos filtros para selecionar todos os anúncios que receberam mais de 200 cliques. Outros filtros, como `entity_type` e `time_preset`, devem estar nessa atualização.

```
curl \
-F 'evaluation_spec={
      "evaluation_type": ...,
      "filters" : [
       {
         "field": "clicks",
         "value": 200,
         "operator": "GREATER_THAN",
       },
       {
       ...
     ]
   }' \
-F 'access_token=<ACCESS_TOKEN>'   \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>
```

[](#)

## Excluir uma regra

```
curl -X DELETE \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>
```

[](#)

## Acessar o histórico de execução de uma regra

Existe um ponto de extremidade para acessar dados históricos das execuções de cada regra. Por padrão, ele fornece dados relevantes, como resultados e ações. Você também pode verificar o estado da regra em cada execução para rastrear edições.

```
curl -G   \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>/history
```

Além disso, esse ponto de extremidade é compatível com três mecanismos de filtragem dos dados: `object_id`, `action` e `hide_no_changes`. É possível filtrar os resultados por `object_id` ou `action` para ver dados relacionados apenas a esse tipo de `object_id` ou `action`.

Você também pode filtrar os resultados usando a sinalização `hide_no_changes` a fim de excluir todas as execuções sem nenhuma alteração. Se quiser restringir ainda mais seus resultados, use uma combinação de filtros.

```
curl -G   \
-d 'object_id=123' \
-d 'action=CHANGED_BID' \
-d 'hide_no_changes=true' \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>/history
```

[](#)

## Acessar o histórico de execução de uma conta

Existe um ponto de extremidade que permite acessar dados históricos agregados para todas as regras da sua conta. Por padrão, ele fornece os mesmos dados relevantes que o [histórico de execução da regra](#history), mas também inclui a identificação das regras para cada entrada.

Essas entradas são ordenadas da mais recente para a mais antiga. Além disso, esse ponto de extremidade é compatível com os mesmos mecanismos de filtragem citados acima: `object_id`, `action` e `hide_no_changes`.

```
curl -G   \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_history
```

[](#)

## Ver a prévia de uma regra

Existe um ponto de extremidade para visualizar a avaliação de uma [regra baseada em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules). Quando uma solicitação `POST` é enviada, o ponto de extremidade retorna uma lista de objetos que correspondem a todos os filtros da regra especificados naquele momento.

```
curl \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>/preview
```

[](#)

## Executar manualmente uma regra

Existe um ponto de extremidade para executar manualmente uma [regra baseada em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules). Quando uma solicitação `POST` é enviada a ele, ocorre o agendamento imediato da regra para execução.

```
curl \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_RULE_ID>/execute
```

Será possível buscar os resultados no histórico quando a execução da regra for concluída.

[](#)

## Ler as regras que regem um objeto

Existem pontos de extremidade para ler todas as regras que regem cada anúncio, conjunto de anúncios e campanha. Por padrão, uma regra regerá um objeto se ela fizer referência a ele de modo estático pelo filtro `id` ou dinâmico pelo filtro `entity_type`.

Esse ponto de extremidade também é compatível com o campo `pass_evaluation` opcional. Isso permite que você limite ainda mais a lista de regras, dependendo da correspondência do objeto com os filtros da regra naquele momento. Se `pass_evaluation` for `true`, retornaremos todas as regras que, quando são [visualizadas](#preview), retornam o objeto. Caso seja `false`, retornaremos todas as regras que não resultam na mesma resposta.

```
curl \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/<AD_OBJECT_ID>/adrules_governed
```

[](#)