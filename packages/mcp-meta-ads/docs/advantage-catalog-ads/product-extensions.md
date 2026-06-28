---
title: "Extensões de produto - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/product-extensions"
scraped_at: "2026-02-01T14:18:11.219Z"
---

# Extensões de produto para criativo Advantage+

As [extensões de produto (recurso "Adicionar itens de catálogo" no Gerenciador de Anúncios da Meta)](https://www.facebook.com/business/help/336325168874197) são uma otimização do criativo Advantage+ que mostra os produtos do seu catálogo abaixo da mídia única estática quando há probabilidade de melhorar o desempenho. Este documento mostra como utilizar os recursos de extensões de produto para anúncios.

#### Suporte à API para extensões de produto

A implementação do criativo de extensão de produto é compatível com todas as versões da API de Marketing. Porém, todas as solicitações de criação qualificadas para extensões de produto a partir da versão 20.0 precisam especificar se o anúncio usará a funcionalidade ou não. O campo `enroll_status` precisa ser fornecido com um valor `OPT_IN` ou `OPT_OUT`.

## Critérios de qualificação

-   Campanha com objetivo `SALES` ou `TRAFFIC`
    
-   Formato de anúncio de imagem ou vídeo único
    
-   Um catálogo
    

[](#)

## Antes de começar

Siga as etapas abaixo para configurar suas campanhas de anúncios.

1.  [Criar uma campanha](https://developers.facebook.com/docs/marketing-apis/get-started/#campaign)
2.  [Criar um conjunto de anúncios](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-set-budget)

### Implementação de criativo independente

#### Antes

```
v24.0
```

#### Depois (os campos novos são destacados em negrito)

```
v24.0
```

### Criação de anúncios

#### Antes

```
v24.0
```

#### Depois (os campos novos estão em negrito)

```
v24.0
```

### Parâmetros

Nome

Descrição

`product_extensions`

As extensões de produto são uma otimização de criativos Advantage+ que mostra os produtos do seu catálogo abaixo da mídia única estática quando houver probabilidade de melhorar o desempenho. Defina o campo `enroll_status` com `OPT_IN` para habilitá-lo.

Pode ser adicionado a `creative_features_spec`. Para obter mais detalhes, consulte a documentação de referência [Ad Creative Features Details](/docs/marketing-api/reference/ad-creative-feature-details/).

`associated_product_set_id`

Especifica a identificação do conjunto de produtos para extensões de produto na otimização do criativo Advantage+. Este conjunto de produtos será mostrado abaixo da sua mídia única.

Pode ser adicionado a `creative_sourcing_spec`. Para obter mais detalhes, consulte a documentação de referência [Ad Creative Sourcing Spec](/docs/marketing-api/reference/ad-creative-sourcing-spec/).

[](#)

## Saiba mais

### Central de Ajuda para Empresas

-   [Sobre Adicionar itens do catálogo](https://www.facebook.com/business/help/336325168874197)
    

### Referência da API de Marketing

-   [Ad Creative](https://developers.facebook.com/docs/marketing-api/reference/ad-creative#fields)
    
-   [Ad Creative Degrees Of Freedom Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-degrees-of-freedom-spec/)
    
-   [Ad Creative Features Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-features-spec/)
    
-   [Ad Creative Feature Details](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)
    
-   [Ad Creative Object Story Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-object-story-spec/)
    

[](#)