---
title: "Compartilhamento do orçamento do conjunto de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/guides/adset-budget-sharing"
scraped_at: "2026-02-01T14:24:07.867Z"
---

# Compartilhamento do orçamento do conjunto de anúncios

Com o compartilhamento do orçamento do conjunto de anúncios, é possível compartilhar até 20% do seu orçamento diário com outros conjuntos de anúncios para melhorar o desempenho de campanhas sem usar um orçamento da campanha. Isso permite que você controle os orçamentos de cada conjunto de anúncios enquanto ajusta até 20% do orçamento dos seus conjuntos de anúncios para mais ou para menos em tempo real, dependendo de quando há mais oportunidades disponíveis para melhorar o desempenho geral da sua campanha.

Com o compartilhamento do orçamento do conjunto de anúncios, você pode:

-   Manter o controle do orçamento no nível do conjunto de anúncios e ter alguma flexibilidade com seu orçamento.
    
-   Diminuir as suposições manuais automatizando parte da sua alocação de orçamento com base no desempenho em tempo real.
    
-   Usar diferentes programações de conjuntos de anúncios enquanto mantém a flexibilidade nos conjuntos de anúncios. Observação: se os seus conjuntos de anúncios terminarem e só houver um conjunto de anúncios ativo em veiculação, o compartilhamento do orçamento do conjunto de anúncios não será aplicado, porque não haverá conjuntos de anúncios ativos com os quais compartilhar orçamentos.
    

Existem vários recursos que você pode usar com o compartilhamento do orçamento:

-   No momento, o compartilhamento do orçamento só pode ser usado nas campanhas com orçamento diário.
    
-   Você pode usar o compartilhamento do orçamento para todos os objetivos no leilão.
    
-   O compartilhamento do orçamento é compatível com várias estratégias de lance (automática, manual, entre outras). Contudo, a estratégia de lance tem que ser a mesma em todos os conjuntos de anúncios da campanha.
    
-   O compartilhamento do orçamento do conjunto de anúncios afetará apenas campanhas novas e duplicadas. As campanhas existentes não serão afetadas.
    
-   No momento, o compartilhamento do orçamento do conjunto de anúncios está disponível durante a criação da campanha e durante a veiculação. Você pode habilitar ou desabilitar esse recurso a qualquer momento.
    

## Quando usar o compartilhamento do orçamento do conjunto de anúncios

Você pode usar o compartilhamento do orçamento quando quiser aumentar as conversões, mas mantendo o controle sobre a maioria dos orçamentos com automação **parcial**, por exemplo, ao gerenciar controles de orçamento em

-   Públicos (por exemplo, ao fazer o redirecionamento e a prospecção de públicos)
    
-   Produtos ou promoções (por exemplo, para vendas ou eventos baseados em tempo)
    
-   Regiões (por exemplo, para pontos comerciais físicos)
    
-   Criativos (por exemplo, ao permitir a alocação de orçamento para criativos novos e existentes)
    

[](#)

## Qual é a diferença entre o compartilhamento do orçamento do conjunto de anúncios e o orçamento da campanha Advantage+

O compartilhamento do orçamento do conjunto de anúncios permite controlar a maioria dos locais para onde seu orçamento é alocado. Além disso, ele só pode ser usado com orçamentos diários. Este é um produto de automação parcial. Nele, até 20% do orçamento é flexível com outros conjuntos de anúncios na mesma campanha (somente quando houver chances de encontrar mais oportunidades).

O orçamento da campanha permite aproveitar a automação total e alcançar os resultados mais eficientes. Isso porque 100% do seu orçamento é flexível e alocado automaticamente para encontrar as melhores oportunidades. Com o orçamento da campanha, os anunciantes podem especificar limites de gastos mínimos e máximos do conjunto de anúncios.

[](#)

## Como o compartilhamento do orçamento do conjunto de anúncios funciona com o orçamento diário

Quando você usa o compartilhamento do orçamento com sua campanha, cada conjunto de anúncios não excederá 20% do seu orçamento semanal, independentemente de outros conjuntos de anúncios estarem dispostos a compartilhar até 20% do orçamento deles. O único caso em que pode exceder 20% é se o conjunto de anúncios não conseguir alcançar a veiculação para o orçamento alocado (por exemplo, para um público muito pequeno). O valor máximo que um conjunto de anúncios pode gastar diariamente é até 20% além do valor de flexibilidade diário (75%).

Por exemplo:

Conjunto de anúncios 1

Conjunto de anúncios 2

Descrição

Orçamento diário

US$ 10

US$ 20

Esta é a média que um conjunto de anúncios pode gastar por dia.

Flexibilidade do orçamento diário

75%

75%

Pode ser que, em alguns dias, oportunidades melhores sejam disponibilizadas. Nesses dias, poderemos gastar até 75% acima do seu orçamento diário.

Orçamento compartilhado por dia

US$ 2

US$ 4

Até 20% do seu orçamento é compartilhado com outros conjuntos de anúncios para maximizar o desempenho.

Orçamento compartilhado por semana

US$ 14

US$ 28

Isso é sete vezes seu orçamento do conjunto de anúncios compartilhado por dia.

Gasto diário máximo

US$ 21

US$ 42

Seu gasto diário máximo inclui flexibilidade do orçamento diário e orçamento compartilhado, ou seja: (orçamento diário + orçamento compartilhado por dia) x 1,75

Gasto semanal máximo do conjunto de anúncios

US$ 84

US$ 168

Seu gasto semanal máximo por conjunto de anúncios, ou seja: (orçamento diário + orçamento compartilhado por dia) x 7 dias

[](#)

## Leitura

Você pode ler o campo `is_adset_budget_sharing_enabled` fazendo um pedido de leitura para [campanha](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#Reading).

### Exemplo

```
curl -X GET \
  -d 'fields="is_adset_budget_sharing_enabled"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v23.0/<CAMPAIGN_ID>/
```

Para saber como usar a Graph API, leia nosso guia [Como usar a Graph API](https://developers.facebook.com/docs/graph-api/overview).

### Parâmetros

Parâmetro

Descrição

is\_adset\_budget\_sharing\_enabled

Se os conjuntos de anúncios secundários são gerenciados de acordo com o compartilhamento do orçamento do conjunto de anúncios. Com o compartilhamento do orçamento do conjunto de anúncios, os anunciantes agora podem compartilhar até 20% do orçamento deles com outros conjuntos de anúncios na mesma campanha.

### Tipo de retorno

```
{is_adset_budget_sharing_enabled: True }
```

### Códigos de erro

Erro

Descrição

613

As chamadas para esta API ultrapassaram o limite de volume.

[](#)

## Criação

Você pode habilitar o compartilhamento do orçamento do conjunto de anúncios durante a [criação da campanha](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#Creating) ao definir Verdadeiro para o campo `is_adset_budget_sharing_enabled`. A partir da versão 24.0 ou superior, é necessário definir “Verdadeiro” ou “Falso” para esse campo se você planeja configurar um orçamento no nível do conjunto de anúncios, ou seja, se não estiver definindo o orçamento da campanha durante a criação dela. Se você definir “Verdadeiro” para esse campo, a otimização será ativada. Você não precisa definir esse campo se estiver usando um orçamento de campanha, ou seja, se definir `daily_budget` ou `lifetime_budget` no nível da campanha.

### Exemplo

```
curl -X POST \
  -F 'name="My campaign"' \
  -F 'objective="OUTCOME_TRAFFIC"' \
  -F 'status="PAUSED"' \
  -F 'is_adset_budget_sharing_enabled="True"' \
  -F 'special_ad_categories=[]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v23.0/act_<AD_ACCOUNT_ID>/campaigns
```

Para saber como usar a Graph API, leia nosso guia [Como usar a Graph API](https://developers.facebook.com/docs/graph-api/overview).

### Parâmetros

Parâmetro

Descrição

is\_adset\_budget\_sharing\_enabled

Se os conjuntos de anúncios secundários são gerenciados de acordo com o compartilhamento do orçamento do conjunto de anúncios. Com o compartilhamento do orçamento do conjunto de anúncios, os anunciantes agora podem compartilhar até 20% do orçamento deles com outros conjuntos de anúncios na mesma campanha.

### Tipo de retorno

Retornará a identificação da campanha.

```
{ id: numeric string }
```

### Códigos de erro

Erro

Descrição

4834005

Você não pode habilitar o compartilhamento do orçamento do conjunto de anúncios sem a estratégia de lance.

4834002

Você não pode usar o compartilhamento do orçamento do conjunto de anúncios com o orçamento da campanha. Desabilite o compartilhamento do orçamento do conjunto de anúncios ou use o orçamento do conjunto de anúncios.

4834009

É necessário ter especificações uniformes ao criar um conjunto de anúncios com o compartilhamento do orçamento do conjunto de anúncios habilitado na campanha principal.

4834009

É necessário ter especificações uniformes ao criar um conjunto de anúncios com o compartilhamento do orçamento do conjunto de anúncios habilitado na campanha principal.

4834011

É necessário especificar Verdadeiro ou Falso no campo is\_adset\_budget\_sharing\_enabled. Esse campo é obrigatório a partir da versão 24 se você não estiver configurando o orçamento no nível da campanha

[](#)

## Atualização

No momento, não há suporte para a ativação do compartilhamento do orçamento do conjunto de anúncios durante a veiculação. No entanto, você pode desativá-lo durante a veiculação. Para isso, atualize a [campanha](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/#Updating) com o campo `is_adset_budget_sharing_enabled` definido como Falso.

```
curl -X POST \
  -F 'is_adset_budget_sharing_enabled="False"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v23.0/<CAMPAIGN_ID>/
```

Para saber como usar a Graph API, leia nosso guia [Como usar a Graph API](https://developers.facebook.com/docs/graph-api/overview).

### Parâmetros

Parâmetro

Descrição

is\_adset\_budget\_sharing\_enabled

Se os conjuntos de anúncios secundários são gerenciados de acordo com o compartilhamento do orçamento do conjunto de anúncios. Com o compartilhamento do orçamento do conjunto de anúncios, os anunciantes agora podem compartilhar até 20% do orçamento deles com outros conjuntos de anúncios na mesma campanha.

### Tipo de retorno

```
{ success: true }
```

### Códigos de erro

Erro

Descrição

3858418

A flexibilidade de orçamento não pode ser habilitada em uma campanha em veiculação. Crie uma nova campanha para usar a flexibilidade de orçamento.

4834006

Você não pode usar a estratégia de lance durante a veiculação quando o compartilhamento de conjunto de anúncios está habilitado

[](#)

## Exclusão

A operação de exclusão não é compatível com este ponto de extremidade. No entanto, você pode alcançar o mesmo resultado ao atualizar is\_adset\_budget\_sharing\_enabled com o valor Falso para desabilitar o compartilhamento do orçamento do conjunto de anúncios.

[](#)