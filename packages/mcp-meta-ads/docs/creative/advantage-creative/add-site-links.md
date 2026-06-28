---
title: "Adicionar links de site - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/advantage-creative/add-site-links"
scraped_at: "2026-02-01T14:18:06.503Z"
---

# Recurso Adicionar links de site

O [recurso **Adicionar links de site** no Gerenciador de Anúncios](https://www.facebook.com/business/help/1127018781828932) é uma otimização do criativo Advantage+ que exibe URLs adicionais abaixo da sua mídia única estática ou dinâmica (apenas no Feed do Facebook) quando há probabilidade de melhorar o desempenho. Este guia aborda o uso do recurso Adicionar links de site usando a API de Marketing.

#### Critérios de qualificação

Para poder usar essa funcionalidade, sua campanha de anúncios precisará ter o seguinte:

-   Tráfego, Engajamento, Leads ou Vendas como objetivo do anúncio
    
-   Site como local de conversão
    
-   Formato de anúncio de mídia única (imagem ou vídeo)
    

## Antes de começar

Configure suas campanhas de anúncios seguindo estas instruções:

1.  [Criar uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign)
2.  [Criar um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set)

[](#)

## Fornecer um criativo e um anúncio

### Implementação de criativo independente

#### Antes

```
v24.0
```

#### Depois

Os campos novos estão destacados em negrito.

```
v24.0
```

### Criação de anúncios

#### Antes

```
v24.0
```

#### Depois

Os campos novos estão destacados em negrito.

```
v24.0
```

### Parâmetros

Nome

Descrição

`site_link_title`

Especifica o rótulo de exibição do link do site.

Pode ser adicionado a `site_links_spec`, consulte o artigo [Ad Creative Site Links Spec](/docs/marketing-api/reference/ad-creative-site-links-spec/).

`site_link_url`

Especifica o URL do link do site.

Pode ser adicionado a `site_links_spec`, consulte o artigo [Ad Creative Site Links Spec](/docs/marketing-api/reference/ad-creative-site-links-spec/).

`site_link_image_hash`

Especifica a imagem do link do site. Use `site_link_image_hash` ou `site_link_image_url`. Quando os dois estiverem presentes, `site_link_image_url` será priorizado.

Pode ser adicionado a `site_links_spec`, consulte o artigo [Ad Creative Site Links Spec](/docs/marketing-api/reference/ad-creative-site-links-spec/).

`site_link_image_url`

Especifica a imagem do link do site. Use `site_link_image_hash` ou `site_link_image_url`. Quando os dois estiverem presentes, `site_link_image_url` será priorizado.

Pode ser adicionado a `site_links_spec`, consulte o artigo [Ad Creative Site Links Spec](/docs/marketing-api/reference/ad-creative-site-links-spec/).

`site_extensions`

"Adicionar links de site" é uma otimização do criativo Advantage+ que exibe URLs adicionais abaixo da sua mídia única estática ou mídia única dinâmica quando há probabilidade de melhorar o desempenho. Defina o campo `enroll_status` como `OPT_IN` para habilitar o recurso.

Pode ser adicionado a `creative_features_spec`. Para mais informações, consulte [Ad Creative Features Details](/docs/marketing-api/reference/ad-creative-feature-details/).

[](#)

## Saiba mais

### Central de Ajuda para Empresas

-   [Como criar anúncios com links de site no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/1127018781828932)
    

### Referência da API de Marketing

-   [Ad Creative](/docs/marketing-api/reference/ad-creative#fields)
    
    -   [Ad Creative Sourcing Spec](/docs/marketing-api/reference/ad-creative-sourcing-spec/)
        
    -   [Ad Creative Site Links Spec](/docs/marketing-api/reference/ad-creative-site-links-spec/)
        
    -   [Ad Creative Degrees Of Freedom Spec](/docs/marketing-api/reference/ad-creative-degrees-of-freedom-spec/)
        
    -   [Ad Creative Features Spec](/docs/marketing-api/reference/ad-creative-features-spec/)
        
    -   [Ad Creative Feature Details](/docs/marketing-api/reference/ad-creative-feature-details/)
        
    -   [Ad Creative Object Story Spec](/docs/marketing-api/reference/ad-creative-object-story-spec/)
        
    

[](#)