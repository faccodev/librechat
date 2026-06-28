---
title: "Insights - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/insights"
scraped_at: "2026-02-01T14:16:30.522Z"
---

# Insights

Você pode ler insights sobre conjuntos e objetos de anúncios usando o [criativo dinâmico](/docs/marketing-api/ad-creative/asset-feed-spec/dynamic-creative), a [personalização de ativo de posicionamento](/docs/marketing-api/dynamic-creative/placement-asset-customization) e a [personalização de ativo de segmento](/docs/marketing-api/dynamic-creative/segment-asset-customization).

No Gerenciador de Anúncios, é possível visualizar os detalhamentos no nível do ativo. Ao usar a API, você pode obter os seguintes detalhamentos:

-   `body_asset`
    
-   `description_asset`
    
-   `image_asset`
    
-   `title_asset`
    
-   `call_to_action_asset`
    
-   `link_url_asset`
    
-   `video_asset`
    
-   `ad_format_asset`
    

É possível combinar essas opções nos seus resultados com os [detalhamentos](/docs/marketing-api/insights/breakdowns) a seguir:

-   `age`
    
-   `gender`
    
-   `age`, `gender`
    

No momento, para o processo de **criativo dinâmico**, mostramos apenas detalhamentos no nível do ativo do criativo, como métricas por `image`, `title`, `body` e `video`. Os insights sobre anúncios com veiculação completa podem ser encontrados sob `By Dynamic Creative Asset` no Gerenciador de Anúncios.

## Criar uma consulta

Obtenha os seguintes campos na sua consulta:

Campo

Descrição

`actions`

Número de ações realizadas no anúncio, agrupadas por tipo.

`clicks`

Número total de cliques no anúncio.

`impressions`

Número de vezes que o anúncio foi exibido.

O Facebook aceita diferentes valores derivados dos campos acima. Por exemplo, você pode recuperar `ctr` e `actions_per_impressions`.

[](#)

## Exemplos

Para recuperar insights sobre um **anúncio** com o detalhamento `body_asset`:

```
curl -G 
-d "breakdowns=body_asset" 
-d "fields=impressions" 
-d "access_token=<ACCESS_TOKEN>" 
https://graph.facebook.com/<API_VERSION>/<AD_ID>/insights
```

A resposta será semelhante a esta:

```
{
  "data": [
    {
      "impressions": "8801",
      "date_start": "2016-04-29",
      "date_stop": "2016-05-13",
      "body_asset": {
        "text": "Test text",
        "id": "6051732675652"
      }
    },
    {
      "impressions": "7558",
      "date_start": "2016-04-29",
      "date_stop": "2016-05-13",
      "body_asset": {
        "text": "Test ext new",
        "id": "6051732676452"
      }
    },
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MgZDZD"
    }
  }}
```

Para recuperar insights sobre um **conjunto de anúncios** detalhados por `image_asset` e `age`:

```
curl -G 
-d "breakdowns=image_asset,age" 
-d "fields=impressions" 
-d "access_token=<ACCESS_TOKEN>" 
https://graph.facebook.com/<API_VERSION>/<ADSET_ID>/insights
```

A resposta será semelhante a esta:

```
{
  "data": [
    {
      "impressions": "5497",
      "date_start": "2016-04-29",
      "date_stop": "2016-05-13",
      "image_asset": {
        "hash": "<REDACTED>",
        "url": "<REDACTED>",
        "id": "6051732672052"
      }
    },
    {
      "impressions": "5962",
      "date_start": "2016-04-29",
      "date_stop": "2016-05-13",
      "image_asset": {
        "hash": "<REDACTED>",
        "url": "<REDACTED>",
        "id": "6051732672652"
      }
    },
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MwZDZD"
    }
```

[](#)