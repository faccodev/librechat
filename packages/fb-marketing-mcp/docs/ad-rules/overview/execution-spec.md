---
title: "Especificação de execução - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/overview/execution-spec"
scraped_at: "2026-02-01T14:25:23.060Z"
---

# Especificação de execução

A `execution_spec` de uma regra determina a ação que se aplica a todos os objetos que passam pela avaliação. [Regras baseadas em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules) e [regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules) aceitam diferentes ações. As ações estão listadas em `execution_type`.

Tipo de execução

Descrição

`NOTIFICATION`

Envia uma notificação com joias para o criador desta regra ou para a lista de usuários especificada em `user_ids`, se essa opção for fornecida.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`, `TRIGGER`

`PAUSE`

Pausa os objetos.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`, `TRIGGER`

`UNPAUSE`

Retoma os objetos.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`, `TRIGGER`

`CHANGE_BUDGET`

Muda os orçamentos com base em um [`change_spec`](/docs/marketing-api/ad-rules-examples/change-spec) definido. Isso aplica-se apenas a conjuntos de anúncios.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`

`CHANGE_CAMPAIGN_BUDGET`

Muda os orçamentos com base em um [`change_spec`](/docs/marketing-api/ad-rules-examples/change-spec) definido. Isso aplica-se apenas a campanhas de anúncios.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`

`CHANGE_BID`

Muda os lances com base em um [`change_spec`](/docs/marketing-api/ad-rules-examples/change-spec) definido. Isso aplica-se apenas a conjuntos de anúncios.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`

`ROTATE`

Pausa o anúncio atualmente ativo e ativa o próximo anúncio por identificação no conjunto de anúncios. Requer um filtro de `id` para os conjuntos de anúncios e um filtro de `entity_type` para um anúncio.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`

[`REBALANCE_BUDGET`](/docs/marketing-api/ad-rules-examples/rebalance-budget)

Pausa os objetos que correspondem aos critérios de avaliação e reequilibra seus orçamentos para o resto com base em um `rebalance_spec` definido. Isso aplica-se apenas a conjuntos de anúncios.

  

**Tipos de avaliação compatíveis:**`SCHEDULE`

`PING_ENDPOINT`

Envia um ping para a assinatura do app via Webhooks. Consulte [Trigger Based Rules](/docs/marketing-api/ad-rules/trigger-based-rules) para obter mais detalhes sobre a configuração.

  

**Tipos de avaliação compatíveis:**`TRIGGER`

## `execution_options`

Talvez você precise fornecer informações adicionais para realizar algumas dessas ações. O `execution_spec` fornece uma matriz de `execution_options` opcional para especificar esses parâmetros adicionais. A matriz contém uma lista de objetos `execution_option`, que são dicionários com chaves de `field`, `value` e `operator` assim como [objetos de `filter` da especificação de avaliação](/docs/marketing-api/ad-rules/evaluation-spec).

[Regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules) não exigem nenhuma opção de execução.

Veja a seguir as opções de execução compatíveis, quais valores de `execution_type` são aceitos e como estruturá-las. Atualmente, o único operador compatível para todas as opções é `EQUAL`.

Campo de opção de execução

Descrição

`user_ids`\*

Destinatários de notificações com joias para `NOTIFICATION` ou destinatários para emails de resumo de [Regras baseadas em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules) para cada `execution_type`.

  

**Tipos de execução compatíveis:** TODOS OS `execution_type` aceitos por [Regras baseadas em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules)

  

**Valor (exemplo):**`array ([123, 456])`

[`change_spec`](/docs/marketing-api/ad-rules-examples/change-spec)

Especifica `amount`, `limit`, `unit` e `target_field`. Obrigatório como um dicionário para os tipos compatíveis. Se `target_field` existir, a escala de lance ou orçamento baseada na diferença entre o valor atual do campo-alvo e o valor-alvo especificado em `amount`. O `target_field` deve ser um filtro de insights válido.

  

**Tipos de execução compatíveis:**`CHANGE_BUDGET`, `CHANGE_BID`

  

**Valor (exemplo):**[Ad Rules Change Spec Examples](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/change-spec)

`rebalance_spec`

Aceita diferentes opções que determinam como os orçamentos são reequilibrados. Veja este [exemplo](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/rebalance-budget) para obter mais detalhes.

  

**Tipos de execução compatíveis:**`REBALANCE_BUDGET`

  

**Valor (exemplo):**[Rebalance Budget Ad Rules](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/rebalance-budget)

`execution_count_limit`

Especifica o número máximo de vezes que uma ação de alteração de orçamento/lance é realizada para cada objeto de anúncio da regra. Se não for especificado, será definido como sem limite por padrão.

  

**Tipos de execução compatíveis:**`CHANGE_BUDGET`, `CHANGE_BID`

  

**Valor (exemplo):** int (123)

`action_frequency`

Especifica a quantidade mínima de minutos até que a mesma ação possa ser tomada em um objeto por uma regra. Por exemplo, se o valor for `10080` para uma regra `CHANGE_BUDGET`, e o orçamento foi aumentado por essa regra para o objeto A, essa regra não aumentará o orçamento do objeto A por pelo menos uma semana, mesmo que esse objeto passe na avaliação da regra durante essa semana.

  

**Tipos de execução compatíveis:**`CHANGE_BUDGET`, `CHANGE_BID`

  

**Valor (exemplo):** int (123)

[](#)

## `user_ids`

Se `user_ids` for fornecido para [regras baseadas em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules):

-   enviamos um email diário para resumir as ações realizadas pela sua regra nas últimas 24 horas;
    
-   enviamos as informações para a lista de usuários especificados em `user_ids`;
    
-   o email é enviado às 00:30, usando o fuso horário da conta de anúncios.
    

Este resumo de email agrega notificações de todas as regras nas quais cada usuário está inscrito. Se nenhuma ação for realizada por qualquer uma das regras inscritas, o usuário não receberá um email para esse dia.

[](#)