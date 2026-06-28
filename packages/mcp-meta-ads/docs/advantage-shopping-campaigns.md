---
title: "API de campanha de compras Advantage+ - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-shopping-campaigns"
scraped_at: "2026-02-01T13:53:30.225Z"
---

# Campanhas de compras Advantage+

Estamos introduzindo um processo novo, unificado e simplificado para a criação de campanhas, substituindo os fluxos de trabalho separados existentes para campanhas de compras Advantage+ (ASC) manuais e campanhas de app Advantage+.

A partir da versão 25.0, os desenvolvedores da API de Marketing não poderão mais usar a API da ASC com o campo `smart_promotion_type=AUTOMATED_SHOPPING_ADS` para criar campanhas ASC. Em vez disso, eles precisarão usar o [público Advantage+](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience), [orçamento de campanha Advantage+](/docs/marketing-api/bidding/guides/advantage-campaign-budget) e posicionamentos Advantage+ para criar campanhas com um `advantage_state` que reflita o tipo da campanha Advantage+. Consulte a [documentação das Campanhas Advantage+](/docs/marketing-api/advantage-campaigns) para começar a criar esse tipo de campanha hoje mesmo e evitar interrupções com os lançamentos das versões 24.0 e 25.0.

As campanhas de compras Advantage+ permitem que anunciantes de comércio eletrônico/varejo direto ao consumidor e marcas melhorem o desempenho, a personalização e a eficiência. Essas campanhas oferecem maior flexibilidade para controlar elementos como criativo, direcionamento, posicionamentos e orçamento, além de mais oportunidades para otimizar campanhas que geram conversões.

Com as campanhas de compras Advantage+, os anunciantes podem usar automação e IA para o seguinte:

-   Veicular campanhas em escala com desempenho consistente
    
-   Aumentar a eficiência com o mínimo de esforço para configurar e gerenciar diferentes campanhas
    

Elas substituem um portfólio de campanhas de vendas manuais usando uma combinação de configurações de direcionamento, lances, destino, criativo, posicionamento e orçamento em uma única campanha para testar até 150 combinações diferentes e otimizar para anúncios com melhor desempenho.

Saiba mais sobre o contexto e os benefícios das campanhas de compras Advantage+ no nosso [blog](https://developers.facebook.com/blog/post/2024/10/31/advantage-plus-shopping-campaigns-automated-ecommerce-advertising/).

## Configuração manual de campanha em comparação com as campanhas de compras Advantage+

Configuração manual da campanha BAU

Campanha de compras Advantage+

Várias campanhas BAU

Substituição de portfólio BAU

  

Direcionamento manual com 7 elementos

  

Segmentação automatizada, automação para aumentar a eficiência da configuração com entrada de 1 país

  

Alocações de orçamento rigorosas em várias campanhas

  

Liquidez do orçamento em 1 campanha

  

Teste de até 50 combinações de criativos

  

Uso de anúncios dinâmicos e estáticos com até 150 combinações de criativos

  

Este documento descreve as etapas que você precisa seguir para configurar sua integração de campanhas de compras Advantage+. Você precisará:

1.  [Definir clientes existentes](#step-1)
2.  [Criar uma campanha](#step-2)
3.  [Verificar a criação da campanha](#step-3)
4.  [Criar um conjunto de anúncios](#step-4)
5.  [Fornecer um criativo e criar anúncios](#step-5)
6.  [Incluir informações de restrição de idade mínima e exclusão geográfica](#step-6)[(documento de referência sobre controles da conta de anúncios)](https://developers.facebook.com/docs/marketing-api/reference/ad-account/account_controls/)
7.  Ter um `pixel_id` para configurar campanhas de compras Advantage+

Saiba mais sobre a [otimização para conversão entre canais em campanhas de compras Advantage+](/docs/marketing-api/guides/advantage-shopping-campaigns/cross-channel-conversion).

## Etapa 1: definir clientes existentes (opcional)

As campanhas de compras Advantage+ permitem que você defina seus clientes existentes como uma coleção de identificações de públicos personalizados. Clientes existentes são usuários que já estão familiarizados com seu negócio/produto. Depois que essa definição for configurada, você poderá usá-la para segmentar seu orçamento em campanhas de compras Advantage+ a fim de limitar os gastos com clientes existentes via `existing_customer_budget_percentage`. Também forneceremos métricas que mostram o desempenho das suas campanhas nesses diferentes segmentos. Essa etapa **não é obrigatória**, a menos que você planeje usar `existing_customer_budget_percentage`.

Parâmetro

Descrição

`existing_customers`

Array<string>

Matriz de identificações de públicos personalizados aos quais a conta de anúncios tem acesso. No momento, estas são as fontes compatíveis com público personalizado: site, atividade do app, lista de clientes, catálogo e atividade offline.

  

Para saber como criar um público personalizado, consulte [esta página](/docs/marketing-api/reference/custom-audience).

#### Exemplo

```
v24.0
```

Para saber como rastrear públicos novos e existentes em ferramentas de rastreamento de terceiros, confira os [parâmetros de URL de tipo de público](/docs/marketing-api/guides/advantage-shopping-campaigns/audience-type-url-parameters).

[](#)

## Etapa 2: criar uma campanha

Para começar, crie sua [campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group/). Para concluir essa etapa, faça uma solicitação `POST` para `/act_{ad_account_id}/campaigns`.

-   Defina campaign\_objective como `OUTCOME_SALES`.
    
-   Defina smart\_como `AUTOMATED_SHOPPING_ADS` para indicar que a campanha que você está criando é ASC.
    

ASC só pode ser criada com o objetivo da campanha `OUTCOME_SALES`.

#### Parâmetros

  

Parâmetro

Descrição

`name`  
_string_

**Obrigatório.**  
Nome da campanha de compras Advantage+.

`objective`  
_enumeração_

**Obrigatório.**  
Objetivo da campanha. Especifique `OUTCOME_SALES` para este tipo de anúncio

`special_ad_categories`

lista<Object>

**Obrigatório.**  
Categorias de anúncio especial associadas à campanha de compras Advantage+.

`adlabels`

lista<Object>

**Opcional.**  
Rótulos de anúncios associados à campanha de compras Advantage+.

`buying_type`  
_string_

**Opcional.**  
As campanhas de compras Advantage+ aceitam apenas o valor `AUCTION`.

`execution_options`

list<enum>

**Opcional.**  
Valor padrão: `set`. Outras opções são:

-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para [recomendação](/docs/marketing-api/reference/ad-recommendation) será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

`smart_promotion_type`  
_enumeração_

**Obrigatório.**  
Para especificar que esta é uma campanha de compras Advantage+, o tipo de promoção inteligente deve ser definido como `AUTOMATED_SHOPPING_ADS`.

`status`  
_enumeração_

**Opcional.**  
Opções válidas: `PAUSED` e `ACTIVE`.

  

Se o status for `PAUSED`, todos os respectivos conjuntos de anúncios e anúncios ativos serão pausados e terão status efetivo de `CAMPAIGN_PAUSED`.

### Exemplo de criação de campanha

```
v24.0
```

#### Resposta

```
{
   "id": "<campaign_id>"
}
```

### Atualização

É possível atualizar uma campanha fazendo uma solicitação `POST` para `/{campaign_id}`.

#### Parâmetros

  

Parâmetro

Descrição

`name`  
_string_

Nome da campanha de compras Advantage+.

`special_ad_categories`

lista<Object>

Categorias de anúncio especial associadas à campanha de compras Advantage+.

`adlabels`

lista<Object>

Rótulos de anúncios associados à campanha de compras Advantage+.

`execution_options`

list<enum>

Valor padrão: `set`. Outras opções são:

-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para [recomendação](/docs/marketing-api/reference/ad-recommendation) será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

`topline_id`  
_string numérica ou número inteiro_

Identificação da linha do pedido.

`status`  
_enumeração_

Você pode usar estes status em uma chamada de API de atualização:

-   `ACTIVE`
    
-   `PAUSED`
    
-   `DELETED`
    
-   `ARCHIVED`
    

Se uma campanha de anúncios for definida como `PAUSED`, os respectivos objetos derivados que estiverem ativos serão pausados e terão um status efetivo de `CAMPAIGN_PAUSED`.

### Exemplo de atualização de campanha

```
v24.0
```

[](#)

## Etapa 3: verificar a criação da campanha

Para verificar se você criou a campanha de compras Advantage+ com sucesso, faça uma solicitação `GET` para `/<AD_CAMPAIGN_ID>` com o campo `smart_promotion_type`.

Uma campanha de compras Advantage+ válida retornará o valor do campo `AUTOMATED_SHOPPING_ADS`.

#### Exemplo

```
v24.0
```

#### Resposta

```
{
  "smart_promotion_type": "AUTOMATED_SHOPPING_ADS",
  "id": <AD_CAMPAIGN_ID>
}
```

[](#)

## Etapa 4: criar um conjunto de anúncios

Depois da criação da campanha, você pode criar um [conjunto de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/) ASC. Faça uma solicitação `POST` para `/act_{ad_account_id}/adsets.`.

Somente **um** conjunto de anúncios pode ser associado a cada campanha ASC.

Nos conjuntos de anúncios com direcionamento para Taiwan, os campos `regional_regulated_categories` e`regional_regulation_identities` precisam ser definidos para identificar o nome no indivíduo ou da organização que está pagando ou se beneficiando pelos anúncios. Consulte [Ad Set](/docs/marketing-api/reference/ad-campaign/#fields) para saber mais.

Veja as etapas para uma criação leve de conjunto de anúncios:

-   Defina o objetivo de desempenho para maximizar o número de conversões (optimization\_goal=OFFSITE\_CONVERSIONS).
    
-   Use lances automáticos (bid\_strategy=LOWEST\_COST\_WITHOUT\_CAP).
    
-   Direcione por código de país ISO usando o campo geo\_locations.
    
-   Escolha um `daily_budget` ou `lifetime_budget.`. Ao especificar um `lifetime_budget`, você também deve definir o `end_time`.
    
-   Defina o local da conversão como o site em promoted\_object especificando o `pixel_id` do site e incluindo `custom_event_type=PURCHASE`.
    
-   Defina `billing_event=IMPRESSIONS.`. Esse é o único evento de cobrança compatível com ASC.
    

#### Parâmetros

  

Parâmetro

Descrição

`campaign_id`  
_string numérica ou número inteiro_

**Obrigatório.**  
Uma campanha de compras Advantage+ válida à qual você quer adicionar o conjunto de anúncios.

`name`  
_string_

**Obrigatório.**  
Nome da campanha de compras Advantage+.

`promoted_object`  
_Objeto_

**Obrigatório.**  
O objeto que o conjunto promove em todos os anúncios. Para campanhas de compras Advantage+, forneça o seguinte:

-   `pixel_id`
    
-   `custom_event_type`: o conjunto de anúncios de compras Advantage+ é compatível com estes eventos: `PURCHASE`, `ADD_TO_CART`, `INITIATED_CHECKOUT`, `ADD_PAYMENT_INFO`, `ADD_TO_WISHLIST`, `CONTENT_VIEW`, `COMPLETE_REGISTRATION`, `DONATE`, `START_TRIAL`, `SUBSCRIBE`, `SEARCH`, `DONATE` (local de conversão somente no site), `OTHER` (local de conversão somente no site para eventos personalizados) e [conversões personalizadas](https://developers.facebook.com/docs/marketing-api/reference/custom-conversion/).
    

**Restrições**

-   `optimization_goal=VALUE` é compatível somente com `PURCHASE` como evento de conversão.
    
-   Todos os eventos de conversão são compatíveis com `optimization_goal=OFFSITE_CONVERSIONS`.
    
-   Os locais da conversão site e loja são compatíveis somente com `PURCHASE` como evento de conversão. Se um anunciante selecionar qualquer outra coisa, a campanha será convertida para o local da conversão no site.
    

Existem dois tipos de configurações de conversão entre canais em `promoted_object`. A conversão entre canais é opcional. Para o local de conversão somente no site, especifique o `pixel_id` do site e inclua `custom_event_type=PURCHASE`.

1.  **Site e app:** use essa opção se puder rastrear os mesmos eventos da web e do app, como com um SDK do Facebook ou Pixel da Meta ativo. Você precisará especificar as informações do app em `promoted_object` usando `omnichannel_object`.
    
2.  **Site e loja:** use essa opção se a sua empresa tiver uma loja no site. Essa opção é para empresas com um app e uma loja qualificada. Especifique as informações da loja definindo `destination_type=SHOP_AUTOMATIC` e usando `omnichannel_object` em `promoted_object` para especificar `commerce_merchant_settings_id`.
    

Saiba mais sobre a [otimização para conversão entre canais em campanhas de compras Advantage+](https://developers.facebook.com/docs/marketing-api/guides/advantage-shopping-campaigns/cross-channel-conversion) e veja exemplos de configuração.

`targeting`  
_Objeto de direcionamento_

**Obrigatório.**  
Estrutura de direcionamento de um conjunto de anúncios de compras Advantage+. Só é possível especificar `geo_locations`.

`geo_locations`  
_matriz_

**Obrigatório.**  
Usado para limitar o público do conjunto de anúncios.

-   `countries`: direcionamento por país. Exige uma matriz de [códigos no formato ISO 3166 de 2 dígitos](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%3Ffbclid%3DIwAR1YmS49RmpBU82fxGYkzApeLmwUU3Df9w8EQuYnobkee-a4IT4YnkHSZmw%23home&h=AT20tKTsxucjAdF2b1GfVPezJqcE6hcBP94PjyS1BldF354qFtDXDBfOPyRCLlGJfvp-yQDc32XAIkufsZEG04ltHPrBufn2diOXATQXs4yhLhHBcOXFm_SN2mAA8zCtv2468YzjhXVEAQKBwO8rO4ukmHzNisVKFmqrKhOSTV0).  
    **Exemplo:**
    ```
    {
      "geo_locations": {
        "countries": [“US”]
      },
    }
    ```
    
-   `regions`: estado, província ou região. Consulte [Pesquisa de direcionamento: Regiões](/docs/reference/ads-api/get-autocomplete-data/#regions) para conferir os valores disponíveis. **Limite:** 200.  
    **Exemplo:**
    ```
    {
      "geo_locations": {
        "regions": [{"key":"3847"}]
      },
    }
    ```
    

`daily_budget`  
_int64_

**Opcional.**  
Orçamento diário definido na moeda da sua conta, permitido apenas para conjuntos de anúncios com duração (diferença entre `end_time` e `start_time`) maior que 24 horas.

  

`daily_budget` ou `lifetime_budget` precisa ser maior que "0".

`lifetime_budget`  
_int64_

**Opcional.**  
Orçamento total, definido na moeda da sua conta. Se for especificado, será preciso definir também um `end_time`.

  

`daily_budget` ou `lifetime_budget` precisa ser maior que "0".

`end_time`  
_datetime_

**Obrigatório quando `lifetime_budget` é especificado.**  
Ao criar um conjunto de anúncios com um `daily_budget`, especifique `end_time=0` para definir o conjunto como "em andamento", sem data de término. Registro de data e hora UNIX (UTC).

  

Exemplo: `2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`.

`optimization_goal`  
_enumeração_

**Opcional.**  
Selecione `OFFSITE_CONVERSIONS` a fim de direcionar a veiculação para indivíduos com mais probabilidade de executar uma ação específica no seu site.

Selecione `VALUE` como objetivo de otimização se você deseja direcionar a veiculação para indivíduos que tenham mais probabilidade de fazer compras de alto valor. No Gerenciador de Anúncios, exibimos a opção de valor mais alto como sua estratégia de lance.

O objetivo de otimização `VALUE` só está disponível para local da conversão no site e exige que `promoted_object` tenha um `pixel_id` do seu site especificado e `custom_event_type=PURCHASE`.

`bid_strategy`  
_enumeração_

**Opcional**

-   `LOWEST_COST_WITHOUT_CAP`: o Facebook dá um lance automático em seu nome e obtém os resultados de menor custo para você. É possível aumentar automaticamente seu lance efetivo conforme necessário para obter os resultados desejados com base na `optimization_goal`. Essa é a `bid_strategy` padrão quando a optimization\_goal é definida como `OFFSITE_CONVERSION` ou `VALUE`.
    
-   `LOWEST_COST_WITH_MIN_ROAS`: especifique a opção de lance para otimização de valor. Você precisa especificar um `roas_average_floor`, que representa o retorno mínimo desejado sobre o investimento em publicidade. Permite que os anunciantes mantenham o retorno sobre o investimento em publicidade em um valor médio durante a campanha. Você precisa especificar um `roas_average_floor`, que representa o retorno mínimo desejado sobre o investimento em publicidade, no objeto `bid_constraints`. Esta estratégia está disponível para o local da conversão somente no site. É compatível com VALUE como `optimization_goal`. Saiba mais sobre os [lances de retorno mínimo sobre o investimento em anúncios](/docs/marketing-api/bidding/overview/bid-strategy#min-roas-bidding).
    
-   `COST_CAP`: obtenha o melhor resultado possível enquanto nos esforçamos para manter o custo por ação definido por você. Você deve fornecer um número de limite no campo `bid_amount`. Permite que os anunciantes aumentem as conversões enquanto mantêm os custos em torno do CPA médio desejado. Você deve fornecer um limite no campo `bid_amount` para usar essa estratégia. Ela está disponível para locais da conversão no site e no site e app, além de ser compatível com `OFFSITE_CONVERSIONS` como `optimization_goal`.
    

A adesão ao limite máximo de custo não é garantida. Saiba mais sobre o [limite de custo](/docs/marketing-api/bidding/overview/bid-strategy#cap).

`bid_amount`

**Obrigatório se a bid\_strategy for definida como `COST_CAP`.**

`bid_constraints`  
_objeto JSON_

**Opcional**

-   `optimization_goal` precisar ser `VALUE`.
    
-   `bid_strategy` precisa ser `LOWEST_COST_WITH_MIN_ROAS`.
    
-   Os lances de retorno mínimo sobre o investimento em publicidade (ROAS) usam `bid_constraints` para transmitir o "ROAS mínimo", mas não é possível usar essa opção com `bid_constraints`. Em vez disso, use `roas_average_floor`. Saiba mais sobre os [lances de retorno mínimo sobre o investimento em anúncios](/docs/marketing-api/bidding/overview/bid-strategy#min-roas-bidding).
    
-   O intervalo válido de `roas_average_floor` é `[100, 10000000]`, incluso. Isso significa que o intervalo válido de "ROAS mínimo" é `[0.01, 1000.0]` ou `[1%, 100000.0%]`, incluso.
    

`billing_event`  
_enumeração_

**Obrigatório.**  
Um evento de cobrança do conjunto de anúncios. Somente `IMPRESSIONS` é compatível com campanhas de compras Advantage+.

`existing_customer_budget_percentage`  
_número_

**Opcional.**  
Especifica a porcentagem máxima do orçamento que pode ser gasta com clientes existentes associados à conta de anúncios. Valores baixos podem levar a custos por conversão mais elevados. Valores válidos: entre "0" e "100".

`adlabels`

lista<Object>

**Opcional**

Especifica uma lista de rótulos que serão associados ao objeto.

`start_time`  
_datetime_

**Opcional.**  
A hora de início do conjunto. Registro de data e hora UNIX (UTC).

  

Exemplo: `2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`.

`time_start`  
_datetime_

**Opcional**

Hora de início

`time_stop`  
_datetime_

**Opcional**

Hora de encerramento.

`attribution_spec`

list<JSON Object>

**Opcional.**  
Especificação da atribuição de conversão usada ao atribuir conversões para otimização.

### Exemplo de criação do conjunto de anúncios

```
v24.0
```

**Exemplo de resposta**

```
"id": "<adset_id>"
```

#### Exemplo de criação de conjunto de anúncios com `bid_strategy=COST_CAP`:

```
curl \
  -F 'name=My Ad Set' \
  -F 'optimization_goal=OFFSITE_CONVERSIONS \
  -F 'billing_event=IMPRESSIONS'
  -F 'bid_strategy=COST_CAP'
  -F 'bid_amount=200' \
  -F 'daily_budget=1000' \
  -F 'campaign_id=<CAMPAIGN_ID>' \
  -F 'targeting={"geo_locations":{"countries":["US"]}}' \
  -F 'status=PAUSED' \
  -F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/adsets
```

#### Exemplo de criação de conjunto de anúncios com `bid_strategy=LOWEST_COST_WITH_MIN_ROAS`:

```
curl \
  -F 'name=My Ad Set' \
  -F 'optimization_goal=OFFSITE_CONVERSIONS \
  -F 'billing_event=IMPRESSIONS'
  -F 'bid_strategy=LOWEST_COST_WITH_MIN_ROAS
  -F 'bid_constraints={"roas_average_floor": 1000} \
  -F 'daily_budget=1000' \
  -F 'campaign_id=<CAMPAIGN_ID>' \
  -F 'targeting={"geo_locations":{"countries":["US"]}}' \
  -F 'status=PAUSED' \
  -F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/adsets
```

### Atualização

Para atualizar um [conjunto de anúncios](/docs/marketing-api/reference/ad-campaign/), faça uma solicitação `POST` para `/{ad_set_id}`.

#### Parâmetros

  

Parâmetro

Descrição

`adlabels`

lista<Object>

Especifica uma lista de rótulos que serão associados ao objeto. Este campo é opcional.

`daily_budget`  
_int64_

Orçamento diário definido na moeda da sua conta, permitido apenas para conjuntos de anúncios com duração (diferença entre `end_time` e `start_time`) maior que 24 horas.

  

`daily_budget` ou `lifetime_budget` precisa ser maior que "0".

`existing_customer_budget_percentage`  
_número_

Especifica a porcentagem máxima do orçamento que pode ser gasta com clientes existentes associados à conta de anúncios. Valores baixos podem levar a custos por conversão mais elevados. Valores válidos: entre "0" e "100".

`end_time`  
_datetime_

Hora de término, obrigatória quando `lifetime_budget` for especificado.

  

Exemplo: `2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`.

  

Ao criar um conjunto de anúncios com um orçamento diário, especifique `end_time=0` para definir o conjunto como "em andamento", sem data de término.

  

Registro de data e hora UNIX (UTC).

`execution_options`

list<enum>

Valor padrão: `set`. Outras opções são:

-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para [recomendação](/docs/marketing-api/reference/ad-recommendation) será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

`start_time`  
_datetime_

A hora de início do conjunto. Precisa ser fornecida como um registro de data e hora UNIX (UTC).

  

Exemplo: `2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`.

`status`  
_enumeração_

Opções disponíveis para atualização:

-   `ACTIVE`
    
-   `PAUSED`
    
-   `DELETED`
    
-   `ARCHIVED`
    

Se for definido como `PAUSED`, todos os respectivos anúncios ativos serão pausados e terão um status efetivo de `ADSET_PAUSED`.

`lifetime_budget`  
_int64_

Orçamento total, definido na moeda da sua conta. Se for especificado, será preciso definir também um `end_time`.

  

`daily_budget` ou `lifetime_budget` precisa ser maior que "0".

`time_start`  
_datetime_

Hora de início

`time_stop`  
_datetime_

Hora de encerramento.

`targeting`  
_Objeto de direcionamento_

Estrutura de direcionamento do conjunto de anúncios. Valores válidos: `geo_locations`.

`geo_locations`  
_matriz_

**Obrigatório.**  
Usado para limitar o público do conjunto de anúncios.

-   `countries`: direcionamento por país. Exige uma matriz de [códigos no formato ISO 3166 de 2 dígitos](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%3Ffbclid%3DIwAR1YmS49RmpBU82fxGYkzApeLmwUU3Df9w8EQuYnobkee-a4IT4YnkHSZmw%23home&h=AT3GhRu3t9NLMDbCRRGzLAFVAI0PgWJMbZnw43Y80kDwJ-UnnAxZL5wbkHnp3P3LprLyfJ2o_n9Izm5OKO-pCnRrnkXE-2D5Ghsit-MioeubO6-QpVrkg6RsTRCD879_yB2kyaDk9SSDtgGgFhCd17SXFxm_BNuv95QAQwZZcwA).  
    **Exemplo:**
    ```
    {
      "geo_locations": {
        "countries": [“US”]
      },
    }
    ```
    
-   `regions`: estado, província ou região. Consulte [Pesquisa de direcionamento: Regiões](/docs/reference/ads-api/get-autocomplete-data/#regions) para conferir os valores disponíveis. **Limite:** 200.  
    **Exemplo:**
    ```
    {
      "geo_locations": {
        "regions": [{"key":"3847"}]
      },
    }
    ```
    

`attribution_spec`

list<JSON Object>

**Opcional.**  
Especificação da atribuição de conversão usada ao atribuir conversões para otimização.

### Exemplo de atualização do conjunto de anúncios

```
v24.0
```

[](#)

## Etapa 5: fornecer um criativo e criar anúncios

Quando o conjunto de anúncios estiver pronto, crie seu anúncio publicando no ponto de extremidade `/act_{ad_account_id}/ads`. A criação de anúncios em campanhas de compras Advantage+ segue o mesmo processo de campanhas de vendas manuais. Consulte os links abaixo para criar anúncios em campanhas de compras Advantage+:

-   [Manual Ads (non-Catalog Ads)](https://developers.facebook.com/docs/marketing-api/reference/adgroup)
    
-   [Anúncios de Catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/) (anteriormente "anúncios dinâmicos")
    
-   [Anúncios de Lojas](https://developers.facebook.com/docs/marketing-api/shops-ads/)
    
-   [Catálogos localizados](https://developers.facebook.com/docs/marketing-api/catalog/guides/localized-catalog/) (ou anúncios de catálogo Advantage+ para vários idiomas ou países)
    

#### Parâmetros

  

Parâmetro

Descrição

`name`  
_string_

**Obrigatório.**  
Nome do anúncio.

`adset_id`  
_int64_

**Obrigatório.**  
Identificação do conjunto de anúncios, necessária na criação.

`creative`  
_AdCreative_

**Obrigatório.**  
Especificação ou identificação do criativo que será usado pelo anúncio. Campos válidos:

-   `object_story_spec`
    
-   `product_set_id`
    
-   `use_page_actor_override`
    
-   `creative_id`
    

Leia mais sobre criativos [aqui](/docs/marketing-api/reference/ad-creative).

  

Forneça o criativo neste formato: `{"creative_id": <CREATIVE_ID>}`.

  

Ou informe uma especificação de criativo:

```
{
        "creative": {
          "name": <NAME>, 
          "object_story_spec": <SPEC>,
          "product_set_id": <PRODUCT_SET_ID>
        }
}
```

`status`  
_enumeração_

**Opcional.**  
Apenas os status `ACTIVE` e `PAUSED` são válidos durante a criação. Durante os testes, é recomendável definir um status `PAUSED` para os anúncios a fim de evitar gastos acidentais.

`adlabels`

lista<Object>

**Opcional.**  
Rótulos de anúncios associados ao anúncio.

`execution_options`

list<enum>

**Opcional.**  
Valor padrão: `set`.

-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `synchronous_ad_review`: esta opção não deve ser usada sozinha. Deve ser sempre especificada com `validate_only`. Quando essas opções forem especificadas, a chamada de API realizará validações de integridade de anúncios, que incluem verificação do idioma da mensagem, regra de texto de 20% de imagem e assim por diante, bem como as lógicas de validação.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para recomendação será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

### Exemplo de criação de anúncio

```
v24.0
```

### Programação de anúncios individuais

Com a programação de anúncios individuais, os anunciantes têm controle mais detalhado para veicular anúncios durante períodos específicos ao agendar os horários de início e fim. Esse recurso está disponível para todos os tipos de campanha.

#### Exemplo

```
{
  "ad_schedule_end_time": "2024-07-30T09:00:00+0100",
  "ad_schedule_start_time": "2024-07-26T12:00:32+0100"
}
```

Estes são os [parâmetros](https://developers.facebook.com/docs/marketing-api/reference/adgroup/#parameters-2).

### Campos do criativo

Para conferir uma lista completa de campos de criativo do anúncio, [clique aqui](/docs/marketing-api/reference/ad-creative#overview).

Campo

Descrição

`object_story_spec`  
_[AdCreativeObjectStorySpec](/docs/marketing-api/reference/ad-creative-object-story-spec/)_

**Obrigatório.**  
Use esta opção se quiser criar um novo post sem exibição na Página e transformá-lo em um anúncio. A identificação da Página e o conteúdo para criar um novo post sem exibição na Página.

`use_page_actor_override`  
_AdCreative_

**Obrigatório.**  
Ser for `true`, exibiremos a Página do Facebook associada aos anúncios de compras Advantage+.

### Exemplo de geração de criativo

```
v24.0
```

### Atualização

Para atualizar um [anúncio](/docs/marketing-api/reference/adgroup/), faça uma solicitação `POST` para `/{ad_id}`.

#### Parâmetros

  

Parâmetro

Descrição

`name`  
_string_

Novo nome do anúncio.

`adlabels`

lista<Object>

Rótulos de anúncios associados ao anúncio.

`execution_options`

list<enum>

Valor padrão: `set`. Outras opções são:

-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `synchronous_ad_review`: esta opção não deve ser usada sozinha. Deve ser sempre especificada com `validate_only`. Quando essas opções forem especificadas, a chamada de API realizará validações de integridade de anúncios, que incluem verificação do idioma da mensagem, regra de texto de 20% de imagem e assim por diante, bem como as lógicas de validação.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para recomendação será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

`status`  
_enumeração_

As opções são as seguintes:

-   `ACTIVE`
    
-   `PAUSED`
    
-   `DELETED`
    
-   `ARCHIVED`
    

Durante os testes, é recomendável definir um status `PAUSED` para os anúncios a fim de evitar gastos acidentais.

`creative`  
_AdCreative_

Especificação do criativo do anúncio que deve ser usada pelo anúncio. Campos válidos: `object_story_spec`, `asset_feed_spec` e `use_page_actor_override`, que podem ser visualizados [aqui](/docs/marketing-api/reference/ad-creative). Leia mais sobre criativos [aqui](/docs/marketing-api/reference/ad-creative).

  

Forneça o criativo no seguinte formato:

```
{
    "creative": {
      "name": <NAME>, 
      "object_story_spec": <SPEC>,
      "product_set_id": <PRODUCT_SET_ID>
    }
}
```

### Exemplo de atualização do anúncio

```
v24.0
```

[](#)

## Etapa 6: controles de conta de anúncios (opcional)

Se a sua empresa tiver restrições (por exemplo, se não for possível exibir anúncios para pessoas com menos de uma determinada idade ou enviar produtos para alguns países), você poderá usar os controles de conta de anúncios para definir como os anúncios serão veiculados. Essas restrições serão aplicadas a todas as campanhas novas e existentes (vendas manuais e ASC) na conta.

É possível definir estes recursos opcionais em nível de controle de conta de anúncios:

-   **Restrição de idade mínima:** você pode definir a idade mínima de 18 a 25. Não é possível definir a idade máxima.
    
-   **Excluir localizações geográficas:** você pode excluir determinadas localizações da veiculação de anúncios com base em país, estado/província, cidade, DMA ou código postal. Consulte [pesquisa de direcionamento](https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search#targeting-search) para ver os valores disponíveis.
    
-   **Inclusões geográficas:** você pode incluir localizações no nível do país.
    
-   **Exclusões de posicionamentos:** você pode excluir determinados posicionamentos para evitar que os anúncios apareçam em superfícies específicas. Os posicionamentos disponíveis para exclusão são o Audience Network, o Facebook Marketplace e a coluna da direita do Facebook. Consulte [valores disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ad-account/account_controls/#parameters-2) na API de Marketing.
    

### Definir restrições

Faça uma solicitação `POST` para `/act_{ad_account_id}/account_controls`.

-   Defina `age_min` como um valor entre 18 e 25.
    
-   Use `exclude_geo_locations` para excluir localizações onde você não quer que seus anúncios sejam veiculados.
    
-   Use `placement_exclusions` para excluir posicionamentos de anúncios onde você não quer que seus anúncios apareçam.
    
-   Inclua um país específico.
    

#### Exemplo de solicitação

```
v24.0
```

#### Exemplo de resposta

```
{
  "id": "<ad_account_business_constraints_id>",
  "success": true
}
```

[](#)

## Saiba mais

-   [Saiba como criar um público personalizado](/docs/marketing-api/reference/custom-audience)
    
-   [Campanhas](/docs/marketing-api/reference/ad-campaign-group/)
    
-   [Conjuntos de anúncios](/docs/marketing-api/reference/ad-campaign/)
    
-   [Anúncios](/docs/marketing-api/reference/adgroup/)
    
-   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
    
-   [Recomendações de anúncio](/docs/marketing-api/reference/ad-recommendation)
    
-   [Especificação para story do objeto de criativo do anúncio](/docs/marketing-api/reference/ad-creative-object-story-spec/)
    
-   [Otimização para conversão entre canais em campanhas de compras Advantage+](/docs/marketing-api/guides/advantage-shopping-campaigns/cross-channel-conversion)
    

[](#)