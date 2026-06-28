---
title: "Referência da API - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/reference/"
scraped_at: "2026-02-01T14:20:33.275Z"
---

# Referência da API de Marketing

#### Nós raiz da API de Marketing

Esta é uma lista completa de nós raiz da API de Marketing do Facebook, com links para documentos de referência sobre cada item. Para saber mais sobre a arquitetura da API e ver como chamar nós raiz e as respectivas bordas, consulte [Visão geral](/docs/graph-api/using-graph-api).

Para acessar todas as informações de referência, entre no Facebook primeiro.

Nó

Descrição

[`/{AD_ACCOUNT_USER_ID}`](/docs/marketing-api/reference/ad-account-user)

Uma pessoa que cria anúncios no Facebook. Os usuários de anúncios podem ter funções em várias contas de anúncios.

[`/act_{AD_ACCOUNT_ID}`](/docs/marketing-api/reference/ad-account)

Representa a entidade empresarial que gerencia os anúncios.

[`/{AD_ID}`](https://developers.facebook.com/docs/marketing-api/reference/adgroup)

Contém informações sobre um anúncio, como elementos criativos e informações de mensuração.

[`/{AD_CREATIVE_ID}`](/docs/marketing-api/reference/ad-creative)

O formato de imagem, carrossel, coleção ou anúncio de vídeo.

[`/{AD_SET_ID}`](/docs/marketing-api/reference/ad-campaign)

Contém todos os anúncios com o mesmo orçamento, cronograma, lance e direcionamento.

[`/{AD_CAMPAIGN_ID}`](/docs/marketing-api/reference/ad-campaign-group)

Define o objetivo da sua campanha. Contém um ou mais conjuntos de anúncios.

[](#)

## Usuário

### Bordas

Borda

Descrição

[`/adaccounts`](https://developers.facebook.com/docs/graph-api/reference/user/adaccounts)

Todas as contas de anúncios associadas à pessoa.

[`/accounts`](https://developers.facebook.com/docs/graph-api/reference/user/accounts/)

Todas as páginas e os locais nos quais uma pessoa atua como administrador.

[`/promotable_events`](https://developers.facebook.com/docs/graph-api/reference/user/promotable_events/)

Todos os eventos criados ou de páginas que possam ser promovidos e que pertençam a páginas nas quais você atua como administrador.

[](#)

## Conta de anúncios

Todas as coleções de objetos de anúncio das APIs de Marketing pertencem a uma [conta de anúncios](/docs/reference/ads-api/adaccount).

### Bordas

As bordas mais populares do nó de conta de anúncios. Acesse a [referência de bordas da conta de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-account#edges) para ver uma lista com todas as bordas.

Borda

Descrição

[`/adcreatives`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adcreatives/)

Define a aparência e o conteúdo do anúncio.

[`/adimages`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adimages/)

Biblioteca de imagens para usar em criativos de anúncios. É possível carregar e gerenciar de forma independente.

[`/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/)

Os dados de um anúncio, como elementos criativos e informações de mensuração.

[`/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/)

Contém todos os anúncios com o mesmo orçamento, cronograma, lance e direcionamento.

[`/advideos`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/advideos/)

Biblioteca de vídeos para uso em criativos de anúncios. É possível carregar e gerenciar de forma independente.

[`/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/)

Define o objetivo das campanhas e contém um ou mais conjuntos de anúncios.

[`/customaudiences`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/customaudiences)

Os Públicos Personalizados que pertencem ou são compartilhados com essa conta de anúncios.

[`/insights`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights/)

Interface de informações. Elimina resultados duplicados em objetos filhos e fornece classificações e relatórios assíncronos.

[`/users`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/users/)

Lista de pessoas associadas a uma conta de anúncios.

[](#)

## Anúncio

Um anúncio individual associado ao conjunto de anúncios.

### Bordas

As bordas mais populares do nó de anúncio. Acesse a [referência de bordas de anúncios](https://developers.facebook.com/docs/marketing-api/reference/adgroup#edges) para ver uma lista com todas as bordas.

Borda

Descrição

[`/adcreatives`](https://developers.facebook.com/docs/marketing-api/reference/adgroup/adcreatives/)

Define a aparência e o conteúdo do anúncio.

[`/insights`](https://developers.facebook.com/docs/marketing-api/reference/adgroup/insights/)

Insights sobre seu desempenho de publicidade.

[`/leads`](https://developers.facebook.com/docs/marketing-api/reference/adgroup/leads/)

Os leads associados ao anúncio de lead.

[`/previews`](https://developers.facebook.com/docs/marketing-api/reference/adgroup/previews/)

Gera prévias com base em um anúncio existente.

[](#)

## Conjunto de anúncios

Um conjunto de anúncios é um grupo de anúncios com o mesmo orçamento diário ou total, programação, tipo de lance, informações do lance e dados de direcionamento.

### Bordas

As bordas mais populares do nó de conjunto de anúncios. Acesse a [referência de bordas do conjunto de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign) para ver uma lista com todas as bordas.

Borda

Descrição

[`/activities`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/activities/)

Registro das ações executadas no conjunto de anúncios.

[`/adcreatives`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/adcreatives/)

Define o conteúdo e a aparência do anúncio.

[`/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/ads/)

Os dados necessários de um anúncio, como elementos criativos e informações de mensuração.

[`/insights`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/insights/)

Insights sobre seu desempenho de publicidade.

[](#)

## Campanha de anúncio

A campanha é o nível mais alto da estrutura organizacional da conta de anúncios e deve representar um objetivo único para o anunciante.

### Bordas

As bordas mais populares do nó de campanha de anúncios. Acesse a [referência de bordas de campanha de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group) para ver uma lista com todas as bordas.

Borda

Descrição

[`/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/ads)

Os dados necessários de um anúncio, como elementos criativos e informações de mensuração.

[`/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group)

Contém todos os anúncios com o mesmo orçamento, cronograma, lance e direcionamento.

[`/insights`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/insights)

Insights sobre seu desempenho de publicidade.

[](#)

## Criativo do anúncio

O formato que fornece o layout e o conteúdo do anúncio.

### Bordas

As bordas mais populares do nó de criativo do anúncio. Acesse a [referência de bordas do criativo do anúncio](/docs/marketing-api/reference/ad-creative#edges) para ver uma lista com todas as bordas.

Borda

Descrição

[`/previews`](https://developers.facebook.com/docs/marketing-api/reference/ad-creative/previews/)

Gera prévias de anúncio com base em um objeto de criativo do anúncio existente.

[](#)