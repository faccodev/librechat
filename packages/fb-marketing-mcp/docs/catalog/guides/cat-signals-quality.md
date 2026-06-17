---
title: "Qualidade do catálogo e dos sinais - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/cat-signals-quality"
scraped_at: "2026-02-01T15:52:01.124Z"
---

# Qualidade do catálogo e dos sinais

Oferecemos duas opções para obter feedback sobre a qualidade e o desempenho dos seus diferentes ativos de Anúncios de Catálogo Advantage+:

-   [Eventos do pixel e do app com e sem correspondência vinculados ao seu catálogo](#events_api)
    
-   [Pixel e apps vinculados ao seu catálogo](#checks_api)
    

## Feedback de Eventos do Pixel e do App para catálogos

Para identificar problemas de instalação do app ou pixel, verifique as estatísticas agregadas relacionadas aos eventos com e sem correspondência recebidos de diferentes pixels, apps e dispositivos.

Consulte a API de Eventos para ver as estatísticas dos eventos provenientes de fontes de eventos vinculados ao seu catálogo. Consulte a [referência da API de Eventos](/docs/marketing-api/reference/product-catalog/event_stats/) para ver mais detalhes.

### Estatísticas do evento

Você pode reunir estas informações no nível do catálogo:

```
v24.0
```

Esses dados geram uma matriz de elementos, um por cada tipo, origem e data do evento no último mês:

```
{
  "data": [
    {
      "date_start": "2017-03-16",
      "date_stop": "2017-03-16",
      "event": "AddToCart",
      "event_source": {
        "id": "<PIXEL_ID>",
        "source_type": "PIXEL"
      },
      "total_matched_content_ids": 1086,
      "total_content_ids_matched_other_catalogs": 10024,
      "total_unmatched_content_ids": 13024,
      "unique_matched_content_ids": 285,
      "unique_content_ids_matched_other_catalogs": 102,
      "unique_unmatched_content_ids": 2132
    },
    {
      "date_start": "2017-03-16",
      "date_stop": "2017-03-16",
      "event": "ViewContent",
      "event_source": {
        "id": "<APP_ID>",
        "source_type": "APP"
      },
      "total_matched_content_ids": 1007,
      "total_content_ids_matched_other_catalogs": 504,
      "total_unmatched_content_ids": 20206,
      "unique_matched_content_ids": 507,
      "unique_content_ids_matched_other_catalogs": 402,
      "unique_unmatched_content_ids": 8037
    },
    ...
  ]
}
```

Os campos apresentados para cada tipo, origem e data do evento são:

Contagem

Descrição

`total_matched_content_ids`

O número total de IDs de conteúdo dos eventos recebidos que correspondem a um item do catálogo. Essa contagem não elimina as duplicatas entre os IDs de conteúdo.

`total_content_ids_matched_other_catalogs`

Número total de IDs de conteúdo dos eventos recebidos que correspondem a um item de outro catálogo associado ao pixel ou app específico. Essa contagem não elimina as duplicatas entre os IDs de conteúdo.

`total_unmatched_content_ids`

Número total de IDs de conteúdo dos eventos recebidos que não correspondem a um item do catálogo. Essa contagem não elimina as duplicatas entre os IDs de conteúdo.

`unique_matched_content_ids`

Número de IDs únicos de conteúdo dos eventos recebidos que correspondem a um item do catálogo.

`unique_content_ids_matched_other_catalogs`

Número de IDs únicos de conteúdo dos eventos recebidos que correspondem a um item de outro catálogo associado ao pixel ou app específico que iniciou o evento.

`unique_unmatched_content_ids`

Número de IDs únicos de conteúdo dos eventos recebidos que não correspondem a um item do catálogo.

### Detalhamentos por tipo de dispositivo

Transmita `device_type` para detalhar os resultados:

```
v24.0
```

Esse código apresenta os resultados agrupados por dispositivo no qual ocorreram. Por exemplo, `desktop`, `mobile_iphone`, `mobile_android_phone`, entre outros:

```
{
  "data": [
    {
      "date_start": "2017-03-10",
      "date_stop": "2017-03-10",
      "event": "AddToCart",
      "event_source": {
        "id": "<PIXEL_ID>",
        "source_type": "PIXEL"
      },
      "device_type": "desktop",
      "total_matched_content_ids": 282,
      "total_content_ids_matched_other_catalogs": 524,
      "total_unmatched_content_ids": 4965,
      "unique_matched_content_ids": 102,
      "unique_content_ids_matched_other_catalogs": 402,
      "unique_unmatched_content_ids": 1427
    },
    ...
  ]
}
```

[](#)

## Feedback de Eventos do App e de pixel

**Exemplo** – use verificações para confirmar se há problemas nos eventos enviados pelo seu pixel.

```
v24.0
```

**Exemplo** – resposta

```
{
  "data": [
    {
      "description": "Pixel hasn't sent some or any events for Advantage+ catalog ads (ex: ViewContent, AddToCart, Purchase) at least once in the last 24 hours.",
      "key": "pixel_missing_dpa_event",
      "result": "failed",
      "title": "Pixel is not sending DPA events"
    },
    {
      "description": "Pixel events might be missing parameters some or all of the time.",
      "key": "pixel_missing_param_in_events",
      "result": "passed",
      "title": "Pixel missing parameter in DPA events"
    },
    {
      "action_uri": "https://www.facebook.com/ads/manage/pixels/?pixel_id=<PIXEL_ID>&amp;m2w=1",
      "description": "The number of pixel events has dropped to less than half of the weekly average.",
      "key": "pixel_decline",
      "result": "passed",
      "title": "Decline in number of pixel events"
    }
  ]
}
```

Você pode usar as seguintes verificações:

Verificação

Descrição

`pixel_missing_dpa_event`

Verifica se há eventos ausentes no pixel, conforme definido nos [Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/product-audiences/).

`pixel_missing_param_in_events`

Verifica se há eventos com parâmetros obrigatórios ausentes, conforme definido nos [anúncios dinâmicos](/docs/marketing-api/dynamic-product-ads/product-audiences/).

`pixel_decline`

Verifica se existe alguma recusa no número de eventos recebidos para o pixel nas últimas 24 horas.

Para mais detalhes, consulte a [referência Verificações de anúncios dinâmicos do pixel](/docs/marketing-api/reference/ads-pixel/da_checks/).

Confira valores possíveis para o campo `result`:

Status

Descrição

passed

Seu pixel passou nesta verificação.

failed

Seu pixel não passou nesta verificação.

unavailable

A verificação está indisponível para este pixel no momento. Tente novamente mais tarde.

Todas as verificações são retornadas por padrão, mas você pode determinar quais verificações quer executar, desta forma:

```
v24.0
```

## Para Eventos do App

Você pode verificar se existem problemas nos eventos enviados pelo seu app:

```
v24.0
```

Exemplo de resposta:

```
{
  "data": [
    {
      "description": "App hasn't sent some or any events for dynamic ads (ex: ViewContent, AddToCart, Purchase)...",
      "key": "app_missing_dpa_event",
      "result": "failed",
      "title": "App is not sending DPA events"
    },
    {
      "description": "App events might be missing parameters some or all of the time.",
      "key": "app_missing_param_in_events",
      "result": "passed",
      "title": "App missing parameter in DPA events"
    }
  ]
}
```

Verificação

Descrição

`app_missing_dpa_event`

Verifica se há eventos ausentes no app, conforme definido nos [anúncios dinâmicos](/docs/marketing-api/dynamic-product-ads/product-audiences/).

`app_missing_param_in_events`

Verifica se há eventos com parâmetros obrigatórios ausentes, conforme definido nos [anúncios dinâmicos](/docs/marketing-api/dynamic-product-ads/product-audiences/).

Para mais detalhes, consulte a [referência Verificações de DA do aplicativo](/docs/graph-api/reference/application/da_checks/).

Confira valores possíveis de retorno para `result`:

Status

Descrição

passed

Seu app passou nesta verificação.

failed

Seu app não passou nesta verificação.

unavailable

A verificação está indisponível para este app no momento. Tente novamente mais tarde.

Você pode solicitar valores para verificações específicas. Todas são retornadas por padrão, mas você pode determinar quais verificações quer executar aprovando-as na solicitação:

```
v24.0
```

[](#)