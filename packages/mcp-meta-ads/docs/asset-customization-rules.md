---
title: "Regras de personalização de ativo - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/asset-customization-rules"
scraped_at: "2026-02-01T14:16:41.585Z"
---

# Regras de personalização de ativo

Use esta solução para definir quais criativos você quer exibir nos seus anúncios. Durante a criação de anúncio, você poderá selecionar a combinação de ativos a ser exibida com base nas suas regras de personalização de ativo. Exemplos de ativos criativos incluem imagens, vídeos, texto e corpo de um anúncio.

Oferecemos três APIs que usam regras de personalização de ativo:

-   [**Personalização de ativo de posicionamento**](/docs/marketing-api/dynamic-creative/placement-asset-customization): personalize os ativos criativos exibidos em diferentes posicionamentos de anúncio.
    
-   [**Anúncios em vários idiomas**](/docs/marketing-api/dyn-language-optimization): personalize diferentes partes do criativo do anúncio (como a imagem, o vídeo, o texto e o corpo) para alcançar falantes de idiomas diferentes.
    
-   [**Personalização de ativo de segmento**](/docs/marketing-api/dynamic-creative/segment-asset-customization): personalize os ativos de anúncio conforme os tipos de direcionamento.
    

Todos os anúncios que usam `asset_feed_spec` precisam conter ao menos duas regras de personalização de direcionamento. Caso o criativo use `asset_feed_spec`**e** tenha menos de duas regras, não será possível criar o anúncio.

## Começar

-   Etapa 1: [criar uma campanha de anúncios e um conjunto de anúncios](#campaign).
    
-   Etapa 2: [fornecer o criativo do anúncio](#creative).
    
-   Etapa 3: [criar um anúncio](#ad).
    
-   Etapa 4: obter [insights](/docs/marketing-api/dynamic-creative/insights) e analisar os resultados.
    

[](#)

## Etapa 1: criar uma campanha de anúncios e um conjunto de anúncios

É possível criar uma [campanha de anúncios padrão](/docs/marketing-api/reference/ad-campaign-group) para regras de personalização de ativo, mas há limitações:

API

Objetivos de campanha compatíveis

Personalização de ativo de segmento

`APP_INSTALLS`, `BRAND_AWARENESS`, `CONVERSIONS`, `LINK_CLICKS`, `REACH`, `VIDEO_VIEWS`.

Personalização de ativo conforme o posicionamento

`APP_INSTALLS`, `BRAND_AWARENESS`, `CONVERSIONS`, `LEAD_GENERATION`, `LINK_CLICKS`, `REACH`, `VIDEO_VIEWS`.

Anúncios em vários idiomas

`APP_INSTALLS`, `BRAND_AWARENESS`, `CONVERSIONS`, `LINK_CLICKS`, `REACH`, `VIDEO_VIEWS`.

Para o conjunto de anúncios, use o [ponto de extremidade do conjunto de anúncios padrão](/docs/marketing-api/reference/ad-campaign/) e defina `is_dynamic_creative` como `false`.

Para criar um conjunto de anúncios em uma campanha com `optimization_goal` definido como `conversions`:

```
v24.0
```

Se você usar `asset_feed_spec` com um conjunto de anúncios otimizado para `APP_INSTALLS`, você precisará especificar `link_url` (por exemplo, `http://www.abc.com`). A `link_url`**deve ser igual à**`object_store_url` no `promoted_object`. Forneça apenas um parâmetro `link_url` no `asset_feed_spec`.

`asset_feed_spec` fornece o criativo para [criativo dinâmico](/docs/marketing-api/dynamic-creative/overview), [personalização de ativo de posicionamento](/docs/marketing-api/dynamic-creative/placement-asset-customization), [anúncios em vários idiomas](/docs/marketing-api/dyn-language-optimization) e [personalização de ativo de segmento](/docs/marketing-api/dynamic-creative/segment-asset-customization). O formato da especificação é diferente para cada solução.

[](#)

## Etapa 2: fornecer o criativo do anúncio

Forneça seu criativo por meio de `asset_feed_spec`. Um feed de ativos é uma coleção de diferentes elementos de criativo, como imagens, títulos, corpos e assim por diante. É possível especificar diferentes ativos criativos para cada tipo de ativo.

Crie um `asset_feed_spec` em [`/adcreative`](/docs/marketing-api/reference/ad-creative). Para aplicar as opções de personalização, defina `asset_customization_rules` em `asset_feed_spec`.

-   [Configuração do feed de ativo para personalização de ativo de posicionamento](/docs/marketing-api/dynamic-creative/placement-asset-customization#asset-feed)
    
-   [Configuração do feed de ativo para anúncios em vários idiomas](/docs/marketing-api/dyn-language-optimization#asset)
    
-   [Configuração do feed de ativo para personalizações de ativo de segmento](/docs/marketing-api/dynamic-creative/segment-asset-customization#add-creative)
    

Após a configuração, verifique seu `asset_feed_spec`:

```
v24.0
```

[](#)

## Etapa 3: criar um anúncio

Ao criar o anúncio, forneça uma referência para a identificação do criativo. É possível criar diversos anúncios por conjunto de anúncios.

```
v24.0
```

Após a criação:

-   Sua campanha aparecerá no [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage).
    
-   O Facebook [analisará o anúncio](#ad_review) e verificará se ele atende às nossas [Políticas de Publicidade](https://www.facebook.com/policies/ads/).
    

[](#)