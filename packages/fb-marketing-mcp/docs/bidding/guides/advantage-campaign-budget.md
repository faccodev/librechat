---
title: "Orçamento de campanha Advantage - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/guides/advantage-campaign-budget"
scraped_at: "2026-02-01T14:14:19.083Z"
---

# Orçamento de campanha Advantage

Um orçamento de campanha Advantage é uma forma de otimizar a distribuição de um orçamento de campanha nos conjuntos de anúncios da sua campanha. Isso significa que o Facebook encontra de modo automático e contínuo as melhores oportunidades de resultados disponíveis nos conjuntos de anúncios e distribui seu orçamento de campanha em tempo real para obter esses resultados.

Você pode habilitar ou desabilitar um orçamento de campanha Advantage para uma campanha de anúncios. Se ele for desabilitado, você deverá fornecer orçamentos para todos os conjuntos de anúncios da campanha.

## Campos em nível de campanha

Nome

Descrição

`daily_budget`

O orçamento diário da campanha.

`lifetime_budget`

O orçamento total da campanha.

`pacing_type`

Tipo de regularidade compartilhado entre os conjuntos de anúncios nesta campanha. **Opções:**

-   `standard`
    
-   `no_pacing` (também conhecido como veiculação acelerada)
    
-   `day_parting` (também conhecido como programação de anúncios)
    

`budget_rebalance_flag`

**Não** use para orçamentos de campanha Advantage. Consulte [Reequilíbrio do orçamento do conjunto de anúncios](/docs/marketing-api/bidding-and-optimization#rebalance) abaixo.

`adset_budgets`

O orçamento do conjunto de anúncios que será usado para cada conjunto de anúncios na campanha. Use isso para _desabilitar_ um orçamento de campanha Advantage e _utilizar_ orçamentos individuais de conjuntos de anúncios.

`bid_strategy`

Estratégia de lances da campanha.  
**Opções:**

-   `LOWEST_COST_WITHOUT_CAP`
    
-   `COST_CAP`
    
-   `LOWEST_COST_WITH_BID_CAP`
    
-   `LOWEST_COST_WITH_MIN_ROAS`
    

Se você escolher `Value` como uma `optimization_goal` para `LOWEST_COST_WITHOUT_CAP` no [Gerenciador de Anúncios](https://www.facebook.com/ads/manager/accounts), exibiremos `Highest Value` como sua estratégia de lance.

`adset_bid_amounts`

Os valores de lances que serão usados para conjuntos de anúncios nesta campanha quando a estratégia de lance da campanha estiver definida para `LOWEST_COST_WITH_BID_CAP` ou `COST_CAP`. Você deve definir este campo juntamente com `bid_strategy`.

Veja [exemplos](#examples) abaixo para saber mais sobre como usar esses campos.

[](#)

## Controles em nível de conjunto de anúncios

Nome

Descrição

`daily_min_spend_target`

Objetivo diário de gastos mínimos para o conjunto de anúncios, na moeda da sua conta. Você deve especificar um orçamento diário no nível da campanha de anúncios. Esse objetivo não garante que você gaste esse valor, mas o Facebook faz o melhor esforço para alcançá-lo. Para remover `daily_min_spend_target` de um conjunto de anúncios, defina-o para `0` ou um valor vazio. Por exemplo, `daily_min_spend_target=0` ou `daily_min_spend_target=`.

`daily_spend_cap`

Limite de gastos diário do conjunto de anúncios definido na moeda da sua conta.

Você deve especificar o orçamento diário no nível da campanha de anúncios.

`lifetime_min_spend_target`

Objetivo de gasto mínimo total para um conjunto de anúncios definido na moeda da sua conta. Você deve especificar o orçamento total no nível da campanha de anúncios. Esse objetivo não garante que você o alcance, mas o Facebook faz o melhor esforço para atingi-lo. Para remover `lifetime_min_spend_target` de um conjunto de anúncios, defina-o para `0` ou um valor vazio. Por exemplo, `lifetime_min_spend_target=0` ou `lifetime_min_spend_target=`.

`lifetime_spend_cap`

Limite de gastos total do conjunto de anúncios definido na moeda da sua conta.  
Você deve especificar o orçamento total na campanha.

`bid_amount`

Valor do lance para este conjunto de anúncios. Ele somente está disponível quando o nível da campanha `is_autobid` está definido para `false`.

`bid_constraints`

Semelhante a um orçamento de conjunto de anúncios, _lances de retorno mínimo sobre os gastos com anúncios (ou seja, ROAS mínimo, pelas iniciais em inglês)_, use-o para fornecer o _limite do ROAS_ , mas não é possível utilizar `bid_amount` com `bid_constraints`. Veja [Exemplos](#examples) para usar o ROAS mínimo com um orçamento de campanha Advantage.

### Exemplos

#### `LOWEST_COST_WITHOUT_CAP`

Crie uma campanha usando um orçamento de campanha Advantage com `bid_strategy` definido para `LOWEST_COST_WITHOUT_CAP`. A campanha tem um orçamento diário de US$ 1.000 com lances automáticos:

```
v24.0
```

#### `LOWEST_COST_WITH_BID_CAP`

Crie uma campanha usando um orçamento de campanha Advantage com `bid_strategy` definido para `LOWEST_COST_WITH_BID_CAP`. A campanha tem um orçamento total de US$ 1.000:

```
v24.0
```

Depois, crie um conjunto de anúncios com o lance máximo limitado:

```
v24.0
```

#### `LOWEST_COST_WITH_MIN_ROAS`

Crie uma campanha usando um orçamento de campanha Advantage com `bid_strategy` definido para `LOWEST_COST_WITH_MIN_ROAS`. Por exemplo, a campanha tem um orçamento total de US$ 1.000 com _ROAS mínimo_ definido:

```
v24.0
```

Depois, crie um conjunto de anúncios com valores mínimos de retorno sobre os gastos com anúncios definidos:

```
v24.0
```

[](#)

## Atualize um orçamento de campanha Advantage ou opções de estratégia de lance

Você pode desabilitar um orçamento de campanha Advantage de uma campanha de anúncios e adicionar orçamento aos conjuntos de anúncios. Por exemplo, use o seguinte exemplo de código:

-   Remove o orçamento da campanha
    
-   Define o orçamento de `AD_SET_ID1` para `5000`
    
-   Define o orçamento de `AD_SET_ID1` para `7000`
    

```
v24.0
```

Ou você pode mudar sua bid\_strategy entre `COST_CAP` e `LOWEST_COST_WITH_BID_CAP`. Por exemplo, os seguintes conjuntos de exemplos de código:

-   Estratégia de lance para `LOWEST_COST_WITH_BID_CAP`
    
-   O lance de `AD_SET_ID1` para `1500`
    
-   O lance de `AD_SET_ID1` para `2000`
    

```
v24.0
```

[](#)

## Limitações e boas práticas

### Estratégia de lance

Defina uma estratégia de lance no nível da campanha. Todos os conjuntos de anúncios compartilham a mesma estratégia de lance definida no nível da campanha de anúncios. Você ainda pode definir diferentes valores de lance ou valores mínimos de retorno sobre os gastos com anúncios no nível do conjunto de anúncios para campanhas de lances não automáticas. Você pode utilizar essa mesma abordagem para o orçamento do conjunto de anúncios. No momento, para `LOWEST_COST_WITH_MIN_ROAS`, não é possível mudar para outras estratégias de lance depois de criar sua campanha. Consulte [Estratégias de lance](https://developers.facebook.com/docs/marketing-api/bidding-and-optimization#bid-strategy).

### Regularidade

Defina o `pacing_type` no nível da campanha, não no nível do conjunto de anúncios. Consulte [Regularidade e programação](https://developers.facebook.com/docs/marketing-api/pacing).

### Metas de otimização

Todas as metas de otimização devem ser as mesmas nos conjuntos de anúncios que possuem lances automáticos. Depois de veicular anúncios em uma campanha, não é possível editar metas de otimização. Consulte [Metas de otimização](https://developers.facebook.com/docs/marketing-api/bidding-and-optimization#opt).

### Campanhas com mais de 70 conjuntos de anúncios

Se a sua campanha tiver mais de 70 conjuntos de anúncios e utilizar um orçamento de campanha Advantage, você não poderá editar a estratégia de lance atual nem desativar o orçamento da campanha Advantage. [Saiba mais na Central de Ajuda para Empresas](https://www.facebook.com/business/help/519856662172206).

[](#)

## Saiba mais

-   [Sobre a otimização do orçamento da campanha](https://www.facebook.com/business/help/153514848493595)
    
-   [Entenda os relatórios de CBO ao usar a estratégia de lance de menor custo](https://www.facebook.com/business/help/258714594633281)
    

[](#)