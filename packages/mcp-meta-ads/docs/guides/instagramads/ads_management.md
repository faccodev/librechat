---
title: "Introdução - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/instagramads/ads_management"
scraped_at: "2026-02-01T14:12:47.375Z"
---

# Introdução

Com a API de Marketing, você pode criar, mensurar e otimizar anúncios no Instagram usando o **Stream** principal, os **Stories**, a aba **Explorar** e o **Reels**. Para criar anúncios:

-   Etapa 1: [obter a identificação da conta do Instagram](#account-id).
    
-   Etapa 2: [criar uma campanha](#campaign).
    
-   Etapa 3: [criar um conjunto de anúncios](#adset). Escolha um `placement` que inclua o Instagram. Recomendamos incluir o Facebook e o Instagram para que nosso sistema veicule automaticamente anúncios para os melhores públicos nas duas plataformas.
    
-   Etapa 4: [fornecer um criativo](#creative).
    
-   Etapa 5: [programar a veiculação](#ad).
    

É importante lembrar:

-   Os anúncios do Instagram não são compatíveis com todos os objetivos de anúncios.
    
-   Nem todos os formatos de criativos suportados pelo Facebook funcionam no Instagram.
    

Para usar os posts do Instagram e do Facebook como anúncios, consulte [Usar posts como anúncios do Instagram](/docs/instagram/ads-api/guides/use-posts-as-ads).

## Etapa 1: obter a identificação da conta do Instagram

Você precisa saber a identificação da sua conta do Instagram antes de começar a criar anúncios. Há diferentes maneiras de obter esse código, dependendo do tipo de conta:

Tipo de conta do Instagram

Como encontrar a identificação da conta

Conta do Instagram no Gerenciador de Negócios (Recomendado) – [Guia de implementação](/docs/instagram/ads-api/guides/ig-accounts-with-business-manager)

Consulte [Configurar contas do Instagram no Gerenciador de Negócios, Obter contas associadas](/docs/instagram/ads-api/guides/ig-accounts-with-business-manager#account_api). Salve a identificação para usar nos anúncios.

Contas do Instagram conectadas a uma Página – [Guia de implementação](/docs/instagram/ads-api/guides/pages-ig-account#via_page)

Consulte [Configurar contas do Instagram com Páginas, Obter a identificação da conta](/docs/instagram/ads-api/guides/pages-ig-account#get-account-id). Salve a identificação para usar nos anúncios.

Conta do Instagram associada a uma Página (PBIA) – [Guia de implementação](/docs/instagram/ads-api/guides/pages-ig-account#pbia)

Consulte [Configurar contas do Instagram com Páginas, Ler PBIA](/docs/instagram/ads-api/guides/pages-ig-account#read). Salve a identificação para usar nos anúncios.

[](#)

## Etapa 2: criar uma campanha

Gerar objetos de anúncio para o Instagram é equivalente a criar anúncios do Facebook. Para começar, [crie uma campanha de anúncios do Facebook](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) e especifique o objetivo.

Os objetivos compatíveis com o Instagram variam de acordo com o posicionamento do anúncio escolhido:

Posicionamento do anúncio

Objetivos compatíveis

Anúncios no Explorar

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `APP_INSTALLS`, `VIDEO_VIEWS`, `LEAD_GENERATION`, `MESSAGES`, `CONVERSIONS` e `PRODUCT_CATALOG_SALES`.

Anúncios na página inicial do Explorar do Instagram

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `APP_INSTALLS`, `VIDEO_VIEWS`, `LEAD_GENERATION`, `MESSAGES` e `CONVERSIONS`.

Anúncios no feed do perfil do Instagram

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `APP_INSTALLS`, `VIDEO_VIEWS`, `MESSAGES`, `CONVERSIONS` e `STORE_TRAFFIC`

Anúncios nos resultados da pesquisa do Instagram

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `APP_INSTALLS`, `VIDEO_VIEWS`, `LEAD_GENERATION`, `CONVERSIONS` e `PRODUCT_CATALOG_SALES`.

Anúncios no Reels

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `APP_INSTALLS`, `VIDEO_VIEWS`, `MESSAGES` e `CONVERSIONS`

Anúncios nos Stories

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `APP_INSTALLS`, `VIDEO_VIEWS`, `LEAD_GENERATION`, `MESSAGES`, `CONVERSIONS`, `PRODUCT_CATALOG_SALES` e `STORE_TRAFFIC`.

Anúncios em streams

`BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `APP_INSTALLS`, `VIDEO_VIEWS`, `LEAD_GENERATION`, `MESSAGES`, `CONVERSIONS`, `PRODUCT_CATALOG_SALES` e `STORE_TRAFFIC`.

O orçamento de gasto mínimo no Instagram é o mesmo dos anúncios de autoatendimento do Facebook, com diferentes [limites por moeda](/docs/marketing-api/adset/budget-limits) e [limites com base no `bid_amount`](/docs/marketing-api/reference/ad-campaign#Creating).

[Saiba mais sobre posicionamentos padrão para seus anúncios](/docs/marketing-api/audiences/reference/placement-targeting) e [`instagram_positions`.](/docs/marketing-api/audiences/reference/placement-targeting#newplacement)

Para campanhas de alcance e frequência, leia [Alcance e frequência do Instagram](/docs/marketing-api/reachandfrequency#instagram-reach---frequency).

[](#)

## Etapa 3: criar um conjunto de anúncios

[Crie um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com as preferências a seguir:

-   [Meta de otimização](/docs/marketing-api/bidding/overview#opt): suas opções de meta dependem do objetivo definido no nível da campanha. Leia nossas [regras de validação](/docs/marketing-api/reference/ad-campaign-group#objective-validation).
    
-   [Opções de direcionamento](/docs/marketing-api/audiences/reference): você pode usar todas as [opções de direcionamento do Facebook](/docs/marketing-api/audiences/reference) para campanhas do Instagram, incluindo [opções de direcionamento básico](/docs/marketing-api/audiences/reference/basic-targeting) nativas do Facebook, [Públicos Personalizados](/docs/marketing-api/custom-audience-targeting/) e [Públicos Semelhantes](/docs/marketing-api/lookalike-audience-targeting/).
    
-   [Orçamento](/docs/marketing-api/bidding/overview/budgets)
    
-   [Evento de cobrança](/docs/marketing-api/bidding/overview/billing-events): o `billing_event` depende da `optimization_goal` escolhida. Leia nossas [regras de validação](/docs/marketing-api/bidding/overview#opt-goal-validation).
    
-   [Programação](/docs/marketing-api/bidding/overview/pacing-and-scheduling)
    

Para campanhas de `APP_INSTALLS` e `CONVERSIONS`, um `promoted_object` também é necessário no nível do conjunto de anúncios.

Se você criar um conjunto de anúncios de [alcance e frequência](/docs/marketing-api/reachandfrequency), defina um `rf_prediction_id`. Os `destination_ids` da Previsão de alcance e frequência precisam conter a identificação da conta do Instagram.

### Posicionamento

Para veicular anúncios no Instagram, inclua `instagram` em [`publisher_platforms`](/docs/marketing-api/audiences/reference/placement-targeting#newplacement) no conjunto de anúncios. Use os posicionamentos `stream`, `story`, `explore`, `reels`, `explore_home` e `ig_search` do Instagram ou habilite várias plataformas, incluindo as opções do Instagram. Se você escolher diversas plataformas, o Facebook otimizará a veiculação com base no público-alvo em cada uma delas com a [otimização de posicionamento](/docs/marketing-api/audiences/reference/placement-targeting).

-   Para mostrar anúncios exclusivamente no stream ou nos Stories, especifique `stream` ou `story` no campo `instagram_positions`.
    
-   Anúncios com `"instagram_positions":["story"]` serão exibidos no feed do Instagram para desktop e para dispositivos móveis.
    
-   Se você quiser exibir os anúncios na aba **Explorar** do Instagram, selecione `stream` e `explore` como posicionamentos.
    
-   Se você quiser exibir os anúncios na **página inicial do Explorar** do Instagram, selecione `stream` e `explore` como posicionamentos.
    
-   Se você quiser exibir os anúncios no **resultado da pesquisa** do Instagram, selecione `stream` como posicionamento.
    
-   Os anúncios nos feeds do Instagram na web usam o posicionamento `stream`, e a elegibilidade deles é verificada para exibição em feeds da web para desktop e dispositivos móveis. Os objetivos compatíveis são `BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `VIDEO_VIEWS` e `CONVERSIONS`.
    

Se as `instagram_positions` não forem especificadas, veicularemos os anúncios nos quatro posicionamentos disponíveis no Instagram.

Para veicular anúncios apenas no Instagram Stories, use `story` somente em `instagram_positions`. Nesse caso, você também deve ter `instagram` como o único valor para `publisher_platforms`.

### Exemplos

Crie um conjunto de anúncios tendo o Instagram como posicionamento:

```
v24.0
```

Crie um conjunto de anúncios com a página inicial do Explorar do Instagram como posicionamento:

```
v24.0
```

Crie um conjunto de anúncios com o resultado da pesquisa do Instagram como posicionamento:

```
v24.0
```

[](#)

## Etapa 4: fornecer um criativo do anúncio

Nesse momento, você deve [fornecer o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative). Para os criativos que serão usados apenas no Instagram ou em posicionamentos mistos, você precisa fornecer a [identificação da conta do Instagram](/docs/marketing-api/guides/instagramads/get-started#account-id) e a identificação da Página do Facebook. As informações da sua Página não aparecerão em nenhum lugar do seu anúncio do Instagram. Se a conta do Instagram estiver conectada ou for associada a uma Página, a mesma Página deverá ser usada.

Quando você fornece um anúncio, criamos uma publicação sem exibição. Você pode ver a publicação sem exibição na Página ao consultar o [feed promovível](/docs/graph-api/reference/page/feed) usando a identificação da Página.

### Guias relevantes

-   [Usar publicações como anúncios do Instagram](/docs/instagram/ads-api/guides/use-posts-as-ads)
    
-   [Adicionar uma chamada para ação opcional](/docs/instagram/ads-api/guides/call-to-action)
    
-   [Obter uma prévia do anúncio](/docs/instagram/ads-api/guides/get-ad-preview)
    
-   [Instagram Advantage+ Catalog Ads](/docs/instagram/ads-api/guides/dynamic-ads)
    
-   [Anúncios em carrossel](/docs/instagram/ads-api/guides/carousel-ads): você pode criar anúncios em carrossel com o [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage) e com a API.
    
-   [Personalizar os Stories](/docs/instagram/ads-api/guides/customize-stories)
    
-   [Adicionar elementos interativos](/docs/instagram/ads-api/guides/add-interactive-elements)
    

[](#)

## Etapa 5: programar a veiculação

[Crie o objeto de anúncio para vincular seu criativo ao conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

### Processo de análise de anúncio

As políticas da análise de anúncio são as mesmas para o Facebook e o Instagram. Temos disponibilizado o Instagram para um número cada vez maior de empresas e queremos criar a mesma experiência de anúncio de alta qualidade que oferecemos no Facebook.

Para isso, precisamos entender melhor como a comunidade interage com os diferentes tipos de conteúdo do anunciante no Instagram. Como leva tempo para construir o mesmo tipo de modelo que aciona os anúncios do Facebook, atualmente contamos com um processo de análise humana para filtrar uma pequena porcentagem dos anúncios e fornecer sugestões de melhorias.

Nosso objetivo final é tornar a veiculação de campanhas no Facebook e no Instagram uma experiência integrada e fazer com que os anúncios sejam uma parte relevante e valiosa do produto Instagram.

[](#)