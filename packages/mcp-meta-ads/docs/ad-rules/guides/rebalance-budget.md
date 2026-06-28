---
title: "Reequilibrar o orçamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/guides/rebalance-budget"
scraped_at: "2026-02-01T13:56:37.648Z"
---

# Regras de anúncios para reequilíbrio de orçamento

Para criar regras de reequilíbrio de orçamento baseadas em ROI, é importante compreender cada componente. ROI significa "retorno sobre o investimento".

Nesta página, você aprenderá sobre cada componente na regra de reequilíbrio e o impacto dos parâmetros no funcionamento da regra.

## Especificação de cronograma

Para regras de reequilíbrio, recomenda-se utilizar uma programação `DAILY` ou `CUSTOM`, pois a ação não deve ocorrer com frequência.

[](#)

## Especificação de avaliação

Os critérios de avaliação funcionam perfeitamente com o `rebalance_spec` para determinar as listas de objetos afetados pelo reequilíbrio.

Para todos os tipos de reequilíbrio, a lista de objetos que passam na avaliação é a fonte dos orçamentos. A lista de destinatários varia dependendo do tipo de reequilíbrio especificado; para a maioria deles (por exemplo, `EVEN`), os destinatários são os objetos que não passaram na avaliação.

Por exemplo, se o critério de regra de tipo `EVEN` for `cost_per_mobile_app_install` > `2.50`, isso significará que todos os conjuntos de anúncios que tenham custo por instalação de app para celular superior a 2,50 serão pausados, e seus orçamentos movidos para todos os conjuntos de anúncios que tenham custo inferior a ou igual a 2,50.

[](#)

## Especificação de execução

A `rebalance_spec` determina exatamente como os destinatários obtêm o orçamento. Existem cinco parâmetros:

Campo

Descrição

`type`

**Obrigatório.**

Determina como os orçamentos são atribuídos. Se o valor não for `EVEN`, um `target_field` também será obrigatório para realizar a classificação.

  

**Valores compatíveis:**`EVEN`, `PROPORTIONAL`, `NO_PAUSE_PROPORTIONAL`, `MATCHED_ONLY_PROPORTIONAL`.

`target_field`

**Opcional.**

Especifica a métrica Insights usada para classificar os destinatários. Isso será obrigatório se `type` não for `EVEN` ou se `target_count` também existir na especificação.

  

**Valores compatíveis:** um campo Insights, como `cpa` ou `impressions`.

`target_count`

**Opcional.**

Especifica o número (K) de destinatários. A combinação desse número, `type` e `target_field` determina os principais K destinatários que recebem o orçamento. É útil usar esse recurso quando não se deseja transferir o orçamento para todos os destinatários possíveis. Se K for maior que o número de destinatários, a regra será reequilibrada para todos. Se esse campo for especificado, `target_field` será obrigatório.

  

**Valores compatíveis:** um número inteiro positivo, como `5`.

`is_cross_campaign`

**Opcional.**

Especifica se você permite ou não que orçamentos sejam alocados em campanhas de anúncios. Se esse campo não for especificado ou for `false`, moveremos somente orçamentos nas campanhas de anúncios. Se esse campo for `true`, avaliaremos e executaremos todos os conjuntos de anúncios juntos, o que pode resultar na mudança de orçamentos entre as campanhas.

  

**Valores compatíveis:** um valor booliano, como `true` ou `false`.

`is_inverse`

**Opcional.**

Especifica se os destinatários devem ou não ser classificados do nível alto a baixo do inverso dos valores `target_field`. Esse recurso é útil caso você queira classificar os valores reais dos mais baixos para os mais altos.

  

**Valores compatíveis:** um valor booliano, como `true` ou `false`.

[](#)

## Nuances específicas

Existem algumas nuances específicas com relação a essa ação:

### Orçamentos diários e totais

Se os conjuntos de anúncios a serem reequilibrados tiverem orçamentos diários e totais, separamos os conjuntos de anúncios em dois grupos. Isso significa que os conjuntos de anúncios só movem orçamentos diários para outros que tenham orçamentos diários. O mesmo acontece com os orçamentos totais.

Nos conjuntos de anúncios com orçamentos totais, consideramos o orçamento restante deles (a diferença entre o orçamento total e o gasto total) para determinar o valor que pode ser alocado. Isso garante que o orçamento total no nível da campanha de anúncios permaneça inalterado.

### Tipos de `rebalance_spec`

Para tipos `EVEN` e `PROPORTIONAL`, pausamos os objetos correspondentes (os doadores do orçamento para os destinatários). Quando pausamos esses objetos, não ajustamos seus orçamentos de forma alguma, porque:

-   Não precisamos nos preocupar com a entrega, já que eles estão pausados
    
-   Não faz sentido não ter orçamento em nenhum conjunto de anúncios
    

Isso significa que, depois de habilitar novamente o conjunto de anúncios, ele manterá o mesmo orçamento que tinha antes. Isso pode ser observado ao interagir com o objeto pausado e obter seus dados de orçamento.

Para o tipo `NO_PAUSE_PROPORTIONAL`, não pausamos os objetos correspondentes. Determinamos quanto do orçamento deve ser ajustado analisando todos os objetos (doadores e destinatários) juntos e classificando seu desempenho. Isso garante que o orçamento só seja transferido de doadores para destinatários. Essa configuração evita uma situação em que o reequilíbrio resulta em uma doação de um conjunto de anúncios com bom desempenho para um conjunto de anúncios com baixo desempenho simplesmente devido à quantidade de orçamento. Para obter mais informações, veja o exemplo abaixo.

Para o tipo `MATCHED_ONLY_PROPORTIONAL`, analisamos somente os objetos correspondentes, ou seja, nós não os pausamos. Nós os classificamos entre si e redistribuímos seus orçamentos com base no desempenho deles em relação aos outros. Isso significa que tiramos o orçamento total de todos os doadores e dividimos proporcionalmente com a mesma lista de doadores. Para obter mais informações, veja o exemplo abaixo.

Para tipos que terminam em `PROPORTIONAL`, distribuímos mais orçamentos para conjuntos de anúncios que têm um melhor desempenho com base no `target_field` definido. Por exemplo, se a métrica for `reach`, e eu tiver dois conjuntos de anúncios de destinatários que têm `reach` 10 e 20, alocaremos 33,3% e 66,6% do montante do orçamento para esses conjuntos de anúncios, respectivamente. Se o tipo for `EVEN`, eles obterão 50% cada.

### Sinalização `is_inverse`

A sinalização `is_inverse` é útil para métricas, como `cost_per_mobile_app_install`, em que um número de métrica menor significa um conjunto de anúncios com desempenho melhor. Isso pode ser confirmado novamente no exemplo abaixo e significa que os conjuntos de anúncios com valor menor recebem uma porção maior da alocação do orçamento.

### Exemplo

Veja a seguir um exemplo de uma regra de reequilíbrio que:

-   pausa todos os conjuntos de anúncios com desempenho baixo na conta de anúncios;
    
-   muda seus orçamentos para o resto.
    

Definimos um desempenho baixo quando tem um alto `cost_per_mobile_app_install` estável. Alocamos proporcionalmente o orçamento de todos os conjuntos de anúncios com baixo desempenho para os 10 melhores conjuntos na conta de anúncios. Essa regra é executada às 8h todos os dias, quando os dados totais são analisados.

```
curl \
-F 'name=Test Rebalance Rule' \
-F 'schedule_spec={
     "schedule_type": "CUSTOM",
     "schedule": [
       {
          "start_minute": 480
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
         "field": "mobile_app_install",
         "value": 100,
         "operator": "GREATER_THAN"
       },
       {
         "field": "cost_per_mobile_app_install",
         "value": 3.0,
         "operator": "GREATER_THAN"
       }
     ]
   }' \
-F 'execution_spec={
     "execution_type": "REBALANCE_BUDGET",
     "execution_options": [
       {
         "field": "rebalance_spec",
         "value": {
           "type": "INVERSE_PROPORTIONAL",
           "target_field": "cost_per_mobile_app_install",
           "target_count": 10,
           "is_cross_campaign": true
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Esta regra:

-   pausa e reequilibra diariamente de maneira uniforme o orçamento de todos os conjuntos de anúncios que alcançaram uma porcentagem alta do tamanho do público;
    
-   não permite que os orçamentos mudem entre campanhas de anúncios.
    

```
curl \
-F 'name=Test Rebalance Rule' \
-F 'schedule_spec={
     "schedule_type": "DAILY"
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
         "field": "audience_reached_percentage",
         "value": 70,
         "operator": "GREATER_THAN"
       }
     ]
   }' \
-F 'execution_spec={
     "execution_type": "REBALANCE_BUDGET",
     "execution_options": [
       {
         "field": "rebalance_spec",
         "value": {
           "type": "EVEN"
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Este é um exemplo utilizando o tipo `NO_PAUSE_PROPORTIONAL`. Nesse caso, o orçamento é realocado a partir de conjuntos de anúncios dentro de campanhas de anúncios com uma quantidade baixa de visualizações do vídeo. No entanto, os conjuntos de anúncios não são pausados e ficam com um montante proporcional do orçamento.

Veja a seguir um exemplo na forma de números do que acontece:

-   Digamos que você tenha conjuntos de anúncios `1-5` com `video_view` de `1-5`, orçamento diário de `3000` cada e a regra descrita abaixo.
    
-   Primeiro, consideramos o orçamento `6000` a partir dos conjuntos de anúncios `1` e `2` e determinamos como distribuir isso proporcionalmente. Nesse caso, cada conjunto de anúncios tem proporções de `1/15` até `5/15`.
    
-   Como resultado, os conjuntos de anúncios acabam tendo valores de `400`, `800`, `4200`, `4600` e `5000` respectivamente. Com isso, os destinatários (conjuntos de anúncios `1`, `2` e `3`) têm a garantia de sempre aumentar seu orçamento.
    

```
curl \
-F 'name=Test Rebalance Rule' \
-F 'schedule_spec={
     "schedule_type": "DAILY"
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
         "field": "video_view",
         "value": 3,
         "operator": "LESS_THAN"
       },
     ]
   }' \
-F 'execution_spec={
     "execution_type": "REBALANCE_BUDGET",
     "execution_options": [
       {
         "field": "rebalance_spec",
         "value": {
           "type": "NO_PAUSE_PROPORTIONAL",
           "target_field": "video_view"
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

Por fim, veja a seguir um exemplo que utiliza `MATCHED_ONLY_PROPORCIONAL`. Nesse caso, você não precisa se preocupar com objetos não correspondentes. O foco está em conjuntos de anúncios que estejam em conformidade com os filtros da regra. É possível usar o mesmo exemplo acima, sem necessidade de determinar as duas listas com base no desempenho inferior dos conjuntos de anúncios.

Com o mesmo exemplo em números descrito acima, acabávamos usando todos os orçamentos no conjunto (`15000`) e distribuindo proporcionalmente. Como resultado, os conjuntos de anúncios `1-5` acabariam com um orçamento `1000-5000`.

A principal desvantagem desse `type` é que não há garantia de que conjuntos de anúncios com melhor desempenho não acabem perdendo orçamento, especialmente em casos de valores de orçamento desequilibrados. Todo o resto sendo igual, se o conjunto de anúncios `5` tivesse começado com o orçamento `18000`, ele acabaria perdendo `8000` do orçamento.

```
curl \
-F 'name=Test Rebalance Rule' \
-F 'schedule_spec={
     "schedule_type": "DAILY"
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
     ]
   }' \
-F 'execution_spec={
     "execution_type": "REBALANCE_BUDGET",
     "execution_options": [
       {
         "field": "rebalance_spec",
         "value": {
           "type": "MATCHED_ONLY_PROPORTIONAL",
           "target_field": "video_view"
         },
         "operator": "EQUAL"
       },
     ]
   }' \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<VERSION>/<AD_ACCOUNT_ID>/adrules_library
```

[](#)