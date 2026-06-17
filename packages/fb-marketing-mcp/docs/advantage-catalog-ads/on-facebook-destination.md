---
title: "Anúncios de catálogo Advantage+ com destino no Facebook - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/on-facebook-destination"
scraped_at: "2026-02-01T14:17:42.270Z"
---

# Anúncios de catálogo Advantage+ com destino no Facebook

Os anúncios de catálogo Advantage+ com destino no Facebook levam os consumidores com intenção de compra a uma página de detalhes do produto formatada como o classificado de uma loja, aumentando as oportunidades de transformar leads em vendas.

Atualmente, os anúncios com destino no Facebook estão disponíveis apenas para catálogos de **automóveis**. Consulte [Sobre anúncios de inventário de automóveis com destino no Facebook](https://www.facebook.com/business/help/1940957349379686) para saber mais.

## Antes de começar

Antes de começar, você precisa ter um catálogo de automóveis válido e ter criado o público para o qual deseja direcionar os anúncios. Visite a página [Catalog: Get Started](/docs/marketing-api/catalog/get-started) para saber como configurar um catálogo e, depois, veja os requisitos específicos para automóveis a seguir.

A seção [Saiba mais](#learn-more) abaixo tem informações sobre como criar o público.

### Catálogo de automóveis válido

Os anúncios de catálogo Advantage+ com destino no Facebook para automóveis podem usar catálogos que atendem aos requisitos de [anúncios de automóveis](#auto-ads). Para estar qualificado, o catálogo precisa ter pelo menos um item.

#### Anúncios de automóveis

[Consulte a lista de campos obrigatórios para anúncios de inventário de automóveis.](https://www.facebook.com/business/help/143781049600895) Os campos opcionais podem ser encontrados aqui.

[](#)

## Implementação

Quando tiver o catálogo e o público, você poderá criar os anúncios por meio do Gerenciador de Anúncios ou da API. Para usar o Gerenciador de Anúncios, consulte [Configurar uma campanha de anúncios de inventário de automóveis com um destino no Facebook](https://www.facebook.com/business/help/230418171375635).

Para usar a API, siga estas etapas:

### Etapa 1: criar uma campanha de anúncios

Ao [criar a campanha de anúncios](/docs/marketing-apis/get-started#campaign), defina `PRODUCT_CATALOG_SALES` como o `objective` e especifique o catálogo em `promoted_object`.

### Etapa 2: criar um conjunto de anúncios e definir o destino

Quando tiver a campanha e o `campaign_id`, crie o conjunto de anúncios. O conjunto define as opções de lance e direcionamento dos anúncios.

Para criar um conjunto que use os anúncios de catálogo Advantage+ com destino no Facebook e leve para um classificado no Facebook, especifique `destination_type` como `FACEBOOK` nos dados do conjunto de anúncios. Para a personalização de posicionamentos, um `destination_type` do `FACEBOOK` é compatível com as seguintes opções:

-   `publisher_platforms` — `facebook`
    
-   `facebook_positions` — `feed`, `marketplace`, `search`, `story` e `right_hand_column`
    
-   `instagram_positions` – `stream`, `explore` e `story`
    

### Etapa 3: fornecer um criativo do anúncio

[Forneça um criativo usando tags de modelo](/docs/marketing-api/dynamic-product-ads/ads-management#adtemplate). Consulte [Template Tags for Vehicle](/docs/marketing-api/auto-ads/guides/ads-mgmt#templatetags_vehicle) para saber mais.

### Etapa 4: criar o anúncio

Use o `ad_set_id` e o `creative_id` para criar o anúncio:

```
v24.0
```

Assim, o anúncio ficará visível no Gerenciador de Anúncios no estado pausado.

[](#)

## Saiba mais

### Central de Ajuda para Empresas

-   [Sobre anúncios de inventário de automóveis com destino no Facebook](https://www.facebook.com/business/help/1940957349379686)
    
-   [Configurar um catálogo para anúncios de inventário de automóveis com destino no Facebook](https://www.facebook.com/business/help/891803694577177)
    
-   [Configurar uma campanha de anúncios de inventário de automóveis com um destino no Facebook](https://www.facebook.com/business/help/230418171375635)
    

### Criação de público

-   [Automotive Ads - Audience Management](/docs/marketing-api/auto-ads/guides/audience-mgmt)
    

[](#)