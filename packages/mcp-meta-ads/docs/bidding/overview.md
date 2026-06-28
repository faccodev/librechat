---
title: "Visão geral - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/overview"
scraped_at: "2026-02-01T13:54:52.324Z"
---

# Visão geral dos lances

Um _lance_ expressa o quanto você valoriza que seu anúncio alcance um público-alvo e forneça resultados na `optimization_goal`. O `bid_amount` é o valor que você deseja gastar para adquirir um determinado evento com base na `optimization_goal`, e a `bid_strategy` define como você quer controlar seus gastos em determinado evento com base na `optimization goal`.

No leilão de anúncios do Facebook, o Facebook avalia a `bid strategy`, o `bid_amount` e a probabilidade de cumprir a `optimization_goal` para calcular um **lance efetivo**. Dessa forma, você só ganhará leilões e exibirá anúncios quando for possível atingir sua `optimization_goal` com certas restrições de lances, como custo por resultado.

Como parte dos nossos esforços para simplificar a oferta de produtos, otimizamos o alcance e as impressões para ajudar os anunciantes a alcançar objetivos com mais eficácia.

Quando a otimização de alcance for selecionada na API, o valor de "Impressões" será retornado em `optimization_goal` com a configuração de controle de frequência do anunciante.

Os conceitos principais dos lances e da otimização incluem o seguinte:

-   [**Estratégias de lance**](/docs/marketing-api/bidding/overview/bid-strategy): como você quer que os lances sejam feitos.
    
-   [**Metas de otimização**](#opt): as metas que você quer atingir quando o Facebook veicular seus anúncios.
    
-   [**Orçamentos**](/docs/marketing-api/bidding/overview/budgets)
    
-   [**Regularidade e programação**](/docs/marketing-api/pacing): como seu orçamento de anúncios é gasto ao longo do tempo.
    
-   [**Otimização do orçamento da campanha**](/docs/marketing-api/bidding/guides/campaign-budget-optimization): uma forma de otimizar a distribuição de um orçamento nos conjuntos de anúncios da sua campanha.
    
-   [**Eventos de cobrança**](/docs/marketing-api/bidding-and-optimization/billing-events): os eventos pelos quais você deseja pagar, como impressões, cliques ou ações diversas.
    

## Configuração de lance

Ao escolher seu lance:

-   leve em consideração o valor real: analise seu objetivo de publicidade e faça o lance do valor máximo que você se dispõe a pagar pelo objetivo em questão;
    
-   decida se quer maximizar o lucro ou o crescimento.
    

Também é possível definir `objective` e `billing_event`, mas isso não afetará diretamente o `bid_amount` ou seu lance efetivo. Se um `bid_amount` for definido, seu custo real por resultado geralmente será próximo a ou menor que `bid_amount`, dependendo das [**estratégias de lance**](/docs/marketing-api/bidding/overview/bid-strategy).

Por exemplo, use essas configurações para gastar cerca de US$ 10,00 por 1.000 visualizações diárias exclusivas:

-   `objective` da campanha – `APP_INSTALLS`
    
-   `optimization_goal` do conjunto de anúncios – `REACH`
    
-   `billing_event` do conjunto de anúncios – `IMPRESSIONS`
    

Por outro lado, para gastar US$ 10,00 **por instalação do app**, use as seguintes configurações:

-   `objective` da campanha – `APP_INSTALLS`
    
-   `optimization_goal` do conjunto de anúncios – `APP_INSTALLS`
    
-   `billing_event` do conjunto de anúncios – `IMPRESSIONS`
    

[](#)

## Metas de otimização

Defina as metas de anúncios que você deseja atingir quando o Facebook veicular seus anúncios. Usamos a `optimization_goal` do seu [conjunto de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign) para decidir quais pessoas receberão o anúncio. Por exemplo, para `APP_INSTALLS`, o Facebook veicula o anúncio às pessoas com maior probabilidade de instalar o app.

`optimization_goal` é uma meta associada ao seu `objective` por padrão. Por exemplo, se `objective` for `APP_INSTALLS`, `optimization_goal` será `APP_INSTALLS` por padrão.

### Validação

Estes objetivos antigos ficaram obsoletos a partir do lançamento da [versão 17.0 da API de Marketing](/docs/graph-api/changelog/version17.0#marketing-api). Consulte a tabela [Objective Mapping](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) para encontrar novos objetivos e os tipos de destino correspondentes, metas de otimização e objetos promovidos.

Alguns [`objectives` da campanha](/docs/reference/ads-api/adcampaign) aceitam apenas determinadas `optimization_goal`s dos conjuntos de anúncios:

Objetivo da campanha

optimization\_goal padrão

Outra optimization\_goal válida

`APP_INSTALLS`, promover um app de experiência instantânea

`APP_INSTALLS`

`IMPRESSIONS`, `POST_ENGAGEMENT`

`APP_INSTALLS`, promover um app para celular

`APP_INSTALLS`

`OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `REACH` e `VALUE`

`BRAND_AWARENESS`

`AD_RECALL_LIFT`

`REACH`

`CONVERSIONS`

`OFFSITE_CONVERSIONS`

`IMPRESSIONS`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `REACH`, `VALUE`, `LANDING_PAGE_VIEWS` e `CONVERSATIONS`

`EVENT_RESPONSES`, promover um evento

`EVENT_RESPONSES`

`IMPRESSIONS` e `REACH`

`EVENT_RESPONSES`, promover um post da Página

`EVENT_RESPONSES`

`IMPRESSIONS`, `POST_ENGAGEMENT` e `REACH`

`LEAD_GENERATION`

`LEAD_GENERATION`

`QUALITY_LEAD`, `LINK_CLICKS` e `QUALITY_CALL`

`LINK_CLICKS`

`LINK_CLICKS`

`IMPRESSIONS`, `POST_ENGAGEMENT`, `REACH` e `LANDING_PAGE_VIEWS`

`LINK_CLICKS`, promover um app de experiências instantâneas

`ENGAGED_USERS`

`APP_INSTALLS`, `IMPRESSIONS`, `POST_ENGAGEMENT` e `REACH`

`LINK_CLICKS`, promover um app para celular

`LINK_CLICKS`

`IMPRESSIONS`, `REACH` e `OFFSITE_CONVERSIONS`

`MESSAGES`

`CONVERSATIONS`

`IMPRESSIONS`, `POST_ENGAGEMENT`, `LEAD_GENERATION` e `LINK_CLICKS`

`PAGE_LIKES`

`PAGE_LIKES`

`IMPRESSIONS`, `POST_ENGAGEMENT` e `REACH`

`POST_ENGAGEMENT`

`POST_ENGAGEMENT`

`IMPRESSIONS`, `REACH` e `LINK_CLICKS`

`PRODUCT_CATALOG_SALES`

`OFFSITE_CONVERSIONS` ou `LINK_CLICKS`

`IMPRESSIONS`, `POST_ENGAGEMENT`, `REACH`, `CONVERSATIONS` e `VALUE`

`REACH`

`REACH`

`IMPRESSIONS`

`VIDEO_VIEWS`

`THRUPLAY`

* * *

[](#)

## Perguntas frequentes

[](#)

[Quais são os eventos cobertos por "POST\_ENGAGEMENT"?](#faq_2333218700033692)

A maioria das ações em um anúncio, incluindo cliques no link, instalações do aplicativo, visualizações do vídeo durante um período determinado, marcações de foto, curtidas, comentários, compartilhamentos e muito mais.

[Link permanente](#faq_2333218700033692)

[](#)