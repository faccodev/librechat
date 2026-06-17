---
title: "Especificação de avaliação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules/evaluation-spec"
scraped_at: "2026-02-01T13:57:09.153Z"
---

# Especificação de avaliação

O objetivo principal da `evaluation_spec` de uma regra é determinar os objetos sobre os quais a regra deve executar a ação. O `evaluation_type` define o tipo de método de avaliação e inclui as seguintes opções:

Tipo de avaliação

Descrição

`SCHEDULE`

Para [regras baseadas em programação](/docs/marketing-api/ad-rules/overview/scheduled-based-rules).

`TRIGGER`

Para [regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules).

A `evaluation_spec` contém uma matriz de `filters`, o que permite restringir ainda mais a lista de objetos correspondentes. Por exemplo, você pode criar filtros em metadados de anúncios, conjuntos de anúncios e campanhas, assim como em métricas de insights. **Todos os filtros são avaliados juntos usando o operador `AND`.**

A matriz de `filters` contém uma lista de objetos de filtro. Esses objetos são dicionários com chaves de `field`, `value` e `operator`:

Chaves do objeto de filtro

Descrição

`field`

**Obrigatório.**

Campo do filtro, como dados de insights ou metadados.

`value`

**Obrigatório.**

Valor de filtro estático do campo.

`operator`

**Obrigatório.**

Operador lógico do campo.

Cada filtro tem uma lista de operadores lógicos compatíveis. Estes são os operadores lógicos aceitos em regras `SCHEDULE` e `TRIGGER`:

Operador lógico

Valor (exemplo)

`GREATER_THAN`

numérico (100)

`LESS_THAN`

numérico (100)

`EQUAL`

numérico (100)

`NOT_EQUAL`

numérico (100)

`IN_RANGE`

tupla (\[100, 200\])

`NOT_IN_RANGE`

tupla (\[100, 200\])

`IN`

lista (\["1", "2", "3"\])

`NOT_IN`

lista (\["1", "2", "3"\])

`CONTAIN`

string ("ABC")

`NOT_CONTAIN`

string ("ABC")

`ANY`

lista (\[1, 2, 3\])

`ALL`

lista (\[1, 2, 3\])

`NONE`

lista (\[1, 2, 3\])

A `evaluation_spec` requer um `trigger` para o tipo de avaliação `TRIGGER`. O gatilho contém um tipo e uma especificação de filtro subjacente. A especificação de filtro pode ser `field`, `value` e `operator`.

O gatilho determina dinamicamente se devemos ou não avaliar uma regra, e você pode ter apenas uma opção. Leia sobre as [regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules) para obter mais informações.

Abaixo, definimos alguns filtros especiais e grupos gerais que você pode usar.

## Filtros especiais

### `time_preset`

O filtro `time_preset` determina o período de tempo sobre o qual agregamos métricas de insights. No momento, apenas uma `time_preset` é permitida. Ela é aplicada a todos os filtros de estatísticas na regra, incluindo aquele usado para o gatilho, se for o caso.

O único operador aceito para `time_preset` é `EQUAL`, e ele será necessário enquanto houver um gatilho ou um filtro de insights presente. As regras baseadas em gatilho são compatíveis apenas com as predefinições de tempo que incluem `TODAY` porque a avaliação é executada em tempo real.

As predefinições de tempo para regras podem se comportar de maneira diferente de outras interfaces. Algumas das predefinições de tempo aqui incluem os dados de hoje. Isso ocorre porque os dados atuais são essenciais para regras executadas mais de uma vez por dia. Para outras interfaces, um valor predefinido de `LAST_N_DAYS` geralmente não inclui dados de hoje. Veja as descrições abaixo para obter mais detalhes.

```
{
  "field": "time_preset",
  "value": "TODAY",
  "operator": "EQUAL"
}
```

Valores de predefinição de tempo

Descrição

`LIFETIME`

Vida útil do objeto

`TODAY`

O dia atual começa a partir da meia-noite no fuso horário da conta de anúncios

`LAST_2_DAYS`

`YESTERDAY` e `TODAY`

`LAST_3_DAYS`

Últimos 2 dias inteiros e `TODAY`

`LAST_7_DAYS`

Últimos 6 dias inteiros e `TODAY`

`LAST_14_DAYS`

Últimos 13 dias inteiros e `TODAY`

`LAST_28_DAYS`

Últimos 27 dias inteiros e `TODAY`

`LAST_30_DAYS`

Últimos 29 dias inteiros e `TODAY`

`THIS_MONTH`

Este mês, incluindo `TODAY`

`THIS_WEEK_MON_TODAY`

Esta semana usando a segunda-feira como primeiro dia da semana, incluindo `TODAY`

`THIS_WEEK_SUN_TODAY`

Esta semana usando o domingo como primeiro dia da semana, incluindo `TODAY`

`YESTERDAY`

O dia inteiro anterior, excluindo `TODAY`

`LAST_2D`

Últimos 2 dias inteiros, excluindo `TODAY`

`LAST_3D`

Últimos 3 dias inteiros, excluindo `TODAY`

`LAST_7D`

Últimos 7 dias inteiros, excluindo `TODAY`

`LAST_14D`

Últimos 14 dias inteiros, excluindo `TODAY`

`LAST_28D`

Últimos 28 dias inteiros, excluindo `TODAY`

`LAST_30D`

Últimos 30 dias inteiros, excluindo `TODAY`

`LAST_ND_14_8`

Últimos 14 dias até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_30_8`

Últimos 30 dias até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_60_8`

Últimos 60 dias até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_120_8`

Últimos 120 dias até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_180_8`

Últimos 180 dias até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_LIFETIME_8`

Vida útil até os últimos 7 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_60_29`

Últimos 60 dias até os últimos 28 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_120_29`

Últimos 120 dias até os últimos 28 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_180_29`

Últimos 180 dias até os últimos 28 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

`LAST_ND_LIFETIME_29`

Vida útil até os últimos 28 dias para [retorno sobre o investimento em publicidade (ROAS)](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas)

### `attribution_window`

O filtro `attribution_window` determina a janela de lookback sobre a qual as métricas de insights são agregadas. Para obter mais informações, veja a documentação de insights sobre [janelas de atribuição](https://developers.facebook.com/docs/marketing-api/insights/#sample).

No momento, só é possível usar uma `attribution_window`, e ela será aplicada a todos os filtros de estatísticas na regra. O único operador aceito para `attribution_window` é `EQUAL`, e ele só é compatível com regras baseadas em programação.

Especificado ou não, o único `value` permitido para a `attribution_window` é `ACCOUNT_DEFAULT`.

```
{
  "field": "attribution_window",
  "value": "ACCOUNT_DEFAULT",
  "operator": "EQUAL"
}
```

Valores da janela de atribuição

Descrição

`ACCOUNT_DEFAULT`

Use a configuração da janela de atribuição do nível da conta.

[](#)

## Filtros de metadados

Com os filtros de metadados, você pode filtrar objetos com base no estado atual dos respectivos campos de metadados. Eles também são compatíveis com a filtragem multinível, o que significa que você pode usar prefixos para aplicar um filtro de metadados em um objeto "parent" ou "grandparent". Isso não afeta outros filtros. Os filtros de insights ainda se aplicam ao objeto normal.

Todos os filtros de metadados são compatíveis com regras de programação, mas apenas um subconjunto pode ser usado com regras de gatilho.

Por exemplo, se você quiser usar uma regra que se aplique a conjuntos de anúncios de campanhas cujo objetivo seja `WEBSITE_CLICKS`, será possível incluir dois filtros:

```
"filters" : [
  {
    "field": "entity_type",
    "value": "ADSET",
    "operator": "EQUAL",
  },
  {
    "field": "campaign.objective",
    "value": "WEBSITE_CLICKS",
    "operator": "EQUAL"
  }
]
```

### Filtros de metadados compatíveis com regras baseadas em programação e gatilho

Campo de metadados

Descrição

`id`

Objetos estáticos específicos aos quais a regra é aplicada.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `int`, `array(int)`

  

**Operadores compatíveis**: `EQUAL`, `IN`, `NOT_IN`

`entity_type`

Nível do objeto ao qual a regra é aplicada.

  

**Prefixos compatíveis**: nenhum

  

**Valores aceitos**: `AD`, `ADSET`, `CAMPAIGN`

  

**Operadores compatíveis**: `EQUAL`

`name`

Nome do objeto, por correspondência parcial ou completa.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `string`

  

**Operadores compatíveis**: `EQUAL`, `CONTAIN`, `NOT_CONTAIN`

`adlabel_ids`

Números de identificação de rótulos de anúncio do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `array(int)`

  

**Operadores compatíveis**: `ANY`, `ALL`, `NONE`

`objective`

Objetivo da campanha de anúncios do objeto.

  

**Prefixos compatíveis**: campanha de anúncios

  

**Valores aceitos**: `array(APP_INSTALLS, BRAND_AWARENESS, CONVERSIONS, EVENT_RESPONSES, LINK_CLICKS, ...)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`start_time`

Hora de início do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`stop_time`

Hora de término do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`

`buying_type`

Tipo de compra da campanha de anúncios do objeto.

  

**Prefixos compatíveis**: campanha de anúncios

  

**Valores aceitos**: `array(AUCTION, FIXED_CPM, RESERVED)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`billing_event`

Evento de cobrança do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `array(APP_INSTALLS, LINK_CLICKS, IMPRESSIONS, ...)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`optimization_goal`

Meta de otimização do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `array(APP_INSTALLS, LINK_CLICKS, IMPRESSIONS, ...)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`is_autobid`

Status de lance automático do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `array(bool)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`daily_budget`

Orçamento diário do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`lifetime_budget`

Orçamento total do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`spend_cap`

Limite de gastos da campanha de anúncios do objeto.

  

**Prefixos compatíveis**: campanha de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`bid_amount`

Valor do lance do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`created_time`

Hora de criação do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`updated_time`

Hora de atualização do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

### Filtros de metadados compatíveis apenas com regras baseadas em programação

Campo de metadados

Descrição

`effective_status`

Status efetivo do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `array(ACTIVE, PAUSED, ADSET_PAUSED, CAMPAIGN_PAUSED, PENDING_REVIEW, ARCHIVED, DELETED, DISAPPROVED, PREAPPROVED, PENDING_BILLING_INFO)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`placement.page_types`

Tipos de páginas para posicionamento do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `array(DESKTOPFEED, HOME, INSTAGRAMSTREAM, INSTAGRAMSTORY, ...)`

  

**Operadores compatíveis**: `ANY`, `ALL`, `NONE`

`budget_reset_period`

Período de redefinição do orçamento do conjunto de anúncios do objeto.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `array(DAY, LIFETIME)`

  

**Operadores compatíveis**: `IN`, `NOT_IN`

`hours_since_creation`

Horas transcorridas desde a `created_time` do objeto.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`estimated_budget_spending_percentage`

Porcentagem estimada do orçamento do conjunto de anúncios a ser gasta até o final da programação. Essa opção usa o mesmo mecanismo que o recurso de [rebalanceamento de orçamento dos conjuntos de anúncios](/docs/marketing-api/bidding-and-optimization#rebalance). Por isso, funciona com qualquer tipo de orçamento, mas exige 10 horas de veiculação por dia.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`audience_reached_percentage`

Porcentagem estimada do alcance do conjunto de anúncios em relação ao tamanho do público.

  

**Prefixos compatíveis**: conjunto de anúncios

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`active_time`

Segundos transcorridos desde que o objeto passou a ter um status efetivo de `ACTIVE`. Se o objeto não estiver `ACTIVE`, o valor retornado será `0`.

  

**Prefixos compatíveis**: anúncio, conjunto de anúncios, campanha

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

`current_time`

Hora atual.

  

**Prefixos compatíveis**: nenhum

  

**Valores aceitos**: `int`

  

**Operadores compatíveis**: `GREATER_THAN`, `LESS_THAN`, `IN_RANGE`, `NOT_IN_RANGE`

### `entity_type` e `id`

Para cada tipo de avaliação de `SCHEDULE` ou `TRIGGER`, você deve especificar um filtro `entity_type` ou `id`.

Ao especificar um filtro `entity_type`, você determina um nível de objeto dinâmico ao qual aplicar a regra. Por exemplo, se o `entity_type` for `AD`, essa regra avaliará automaticamente cada novo anúncio adicionado à conta de anúncios. Isso acontece independentemente de quando você cria a regra. Com a especificação de um filtro `id`, a regra só será aplicada a uma lista estática de objetos.

Quando você especifica um filtro `id`**sem prefixo**, calculamos automaticamente o nível do objeto ao qual aplicar a regra. Por exemplo, se você quiser aplicar uma regra a anúncios `[123, 456]`, só será necessário **um** campo de filtro `id`, valor `[123, 456]` e operador `IN`. Nesse caso, `entity_type` não é obrigatório, já que você forneceu uma lista estática inicial de objetos e podemos calcular o nível do objeto a partir desses objetos.

É possível usar `entity_type` e `id` com a filtragem multinível. Por exemplo, se você quiser uma regra que se aplique a todos os anúncios de conjuntos de anúncios específicos, será possível usar um filtro `entity_type` de `AD` e um filtro `adset.id` com os conjuntos especificados.

Por padrão, quando um filtro `effective_status` não é especificado, adicionamos implicitamente um filtro `effective_status` ao avaliamos a regra.

Para todos os tipos de execução que atuam sobre objetos ativos, esse filtro-padrão possui um operador de `IN` e um valor de `['ACTIVE', 'PENDING_REVIEW']`. Isso significa que a regra avalia apenas objetos que têm ou terão veiculação ativa. Para tipos de execução que não atuam em objetos ativos (`UNPAUSE`), adicionamos o filtro com um operador de `NOT_IN` e um valor de `['DELETED', 'ARCHIVED']`. O filtro-padrão é uma otimização interna para nossos tipos de execução.

[](#)

## Filtros de insights

Avaliamos os filtros de insights em relação aos valores atuais retornados pela API de Insights para uma determinada `time_preset`. Esses filtros se aplicam diretamente à lista ou ao nível de objetos e não são compatíveis com a filtragem multinível. Todos os filtros de insights são compatíveis com os seguintes operadores: `GREATER_THAN`, `LESS_THAN`, `EQUAL`, `IN_RANGE`, `NOT_IN_RANGE`.

As unidades representadas aqui seguem a moeda de base na API de Marketing. Por exemplo, para dólares americanos, a unidade de base é o centavo, o que significa que um valor de "1000" em gastos equivale a US$ 10,00.

Para obter uma descrição de cada um dos campos abaixo, consulte a [documentação sobre a API de Insights](https://developers.facebook.com/docs/marketing-api/insights/fields/). Todos os filtros mencionados são compatíveis com as regras baseadas em programação.

Veja uma lista de filtros de insights e confira se eles são compatíveis com as regras baseadas em gatilho:

Campo de insights

Permitido para regras baseadas em gatilho?

`mobile_app_purchase_roas` ([Exemplo](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas))

Não

`website_purchase_roas` ([Exemplo](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/roas))

Não

`impressions`

Sim

`unique_impressions`

Sim

`clicks`

Sim

`unique_clicks`

Sim

`spent`

Sim

`results`

Sim

`cost_per`

Sim

`cpc`

Sim

`cpm`

Sim

`ctr`

Sim

`cpa`

Sim

`cpp`

Sim

`reach`

Sim

`frequency`

Sim

`leadgen`

Sim

`link_ctr`

Sim

`cost_per_unique_click`

Sim

`result_rate`

Sim

`mobile_app_install`

Sim

`cost_per_mobile_app_install`

Sim

`app_custom_event`

Sim

`app_custom_event.fb_mobile_achievement_unlocked`

Sim

`app_custom_event.fb_mobile_activate_app`

Sim

`app_custom_event.fb_mobile_add_payment_info`

Sim

`app_custom_event.fb_mobile_add_to_cart`

Sim

`app_custom_event.fb_mobile_add_to_wishlist`

Sim

`app_custom_event.fb_mobile_complete_registration`

Sim

`app_custom_event.fb_mobile_content_view`

Sim

`app_custom_event.fb_mobile_initiated_checkout`

Sim

`app_custom_event.fb_mobile_level_achieved`

Sim

`app_custom_event.fb_mobile_purchase`

Sim

`app_custom_event.fb_mobile_rate`

Sim

`app_custom_event.fb_mobile_search`

Sim

`app_custom_event.fb_mobile_spent_credits`

Sim

`app_custom_event.fb_mobile_tutorial_completion`

Sim

`app_custom_event.other`

Sim

`cost_per_mobile_achievement_unlocked`

Sim

`cost_per_mobile_activate_app`

Sim

`cost_per_mobile_add_payment_info`

Sim

`cost_per_mobile_add_to_cart`

Sim

`cost_per_mobile_add_to_wishlist`

Sim

`cost_per_mobile_complete_registration`

Sim

`cost_per_mobile_content_view`

Sim

`cost_per_mobile_initiated_checkout`

Sim

`cost_per_mobile_level_achieved`

Sim

`cost_per_mobile_purchase`

Sim

`cost_per_mobile_rate`

Sim

`cost_per_mobile_search`

Sim

`cost_per_mobile_spent_credits`

Sim

`cost_per_mobile_tutorial_completion`

Sim

`offline_conversion`

Não

`offline_conversion.add_payment_info`

Não

`offline_conversion.add_to_cart`

Não

`offline_conversion.add_to_wishlist`

Não

`offline_conversion.complete_registration`

Não

`offline_conversion.initiate_checkout`

Não

`offline_conversion.lead`

Não

`offline_conversion.other`

Não

`offline_conversion.purchase`

Não

`offline_conversion.search`

Não

`offline_conversion.view_content`

Não

`cost_per_offline_conversion`

Não

`cost_per_offline_other`

Não

`offsite_conversion`

Sim

`offsite_conversion.fb_pixel_add_payment_info`

Sim

`offsite_conversion.fb_pixel_add_to_cart`

Sim

`offsite_conversion.fb_pixel_add_to_wishlist`

Sim

`offsite_conversion.fb_pixel_complete_registration`

Sim

`offsite_conversion.fb_pixel_initiate_checkout`

Sim

`offsite_conversion.fb_pixel_lead`

Sim

`offsite_conversion.fb_pixel_purchase`

Sim

`offsite_conversion.fb_pixel_search`

Sim

`offsite_conversion.fb_pixel_view_content`

Sim

`offsite_conversion.fb_pixel_other`

Sim

`cost_per_add_payment_info_fb`

Sim

`cost_per_add_to_cart_fb`

Sim

`cost_per_add_to_wishlist_fb`

Sim

`cost_per_complete_registration_fb`

Sim

`cost_per_initiate_checkout_fb`

Sim

`cost_per_lead_fb`

Sim

`cost_per_purchase_fb`

Sim

`cost_per_search_fb`

Sim

`cost_per_view_content_fb`

Sim

`link_click`

Sim

`cost_per_link_click`

Sim

`like`

Sim

`offsite_engagement`

Sim

`post`

Sim

`post_comment`

Sim

`post_engagement`

Sim

`cost_per_post_engagement`

Não

`post_like`

Sim

`post_reaction`

Sim

`view_content`

Sim

`video_play`

Sim

`vote`

Sim

`unique_clicks`

Não

`reach`

Não

`lifetime_impressions`

Não

`lifetime_spent`

Não

`today_spent`

Não

`yesterday_spent`

Não

[](#)

## Filtros avançados

Você pode personalizar e derivar campos avançados com base nos filtros de insights e metadados acima. Para obter mais informações, leia sobre os [filtros avançados da especificação de avaliação](https://developers.facebook.com/docs/marketing-api/ad-rules-examples/evaluation-spec/).

Os filtros avançados aceitam estes operadores: `GREATER_THAN`, `LESS_THAN`, `EQUAL`, `IN_RANGE`, `NOT_IN_RANGE`. **Eles são compatíveis apenas com regras baseadas em programação.**

Para alguns dos filtros avançados mais usados, aceitamos um alias como o filtro:

Alias de campo avançado

Derivação

`daily_ratio_spent`

`today_spent / adset.daily_budget`

`lifetime_ratio_spent`

`lifetime_spent / adset.lifetime_budget`

[](#)