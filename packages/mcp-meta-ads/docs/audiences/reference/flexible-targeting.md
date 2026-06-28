---
title: "Direcionamento flexível - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/flexible-targeting"
scraped_at: "2026-02-01T14:28:35.817Z"
---

# Direcionamento flexível

Combine diversas opções de direcionamento para alcançar um conjunto específico de usuários em `flexible_spec` com declarações `AND` e `OR`. O Facebook avalia o direcionamento em `flexible_spec` via `AND` com todos os segmentos que não fazem parte da especificação, como idade, gênero e geolocalização. Além disso, é feita uma avaliação de cada elemento de matriz principal em `flexible_spec` com `AND` e outra de elementos de matriz secundários com `OR`.

Os segmentos de direcionamento, como comportamentos especificados em `flexible_spec`, não estão disponíveis para uso fora de `flexible_spec`.

## Campos

Campo

Descrição

`flexible_spec`

Tipo: objeto JSON

Matriz de matrizes. Cada uma contém um segmento de direcionamento em um formato adequado, como interesses, comportamentos e dados demográficos. A matriz principal tem um limite de 25, enquanto a matriz secundária tem um limite de 1.000.

Use os seguintes campos no direcionamento flexível:

-   `custom_audiences`
    
-   `interests`
    
-   `behaviors`
    
-   `college_years`
    
-   `education_majors`
    
-   `education_schools`
    
-   `education_statuses`
    
-   `family_statuses`
    
-   `income`
    
-   `industries`
    
-   `life_events`
    
-   `user_adclusters`
    
-   `work_positions`
    
-   `work_employers`
    

[](#)

## Exemplos

#### Direcionamento flexível

Para direcionar conteúdo a pessoas que vivem nos EUA, com 18 a 43 anos de idade, que **não** se mudaram recentemente **e** que gostam de viajar, de futebol ou de filmes **e** são recém-casadas ou gostam de música:

```
curl \
  -F 'name=My AdSet' \
  -F 'optimization_goal=REACH' \
  -F 'billing_event=IMPRESSIONS' \
  -F 'bid_amount=150' \
  -F 'daily_budget=2000' \
  -F 'campaign_id=<CAMPAIGN_ID>' \
  -F 'targeting={ 
    "age_max": 43, 
    "age_min": 18, 
    "flexible_spec": [ 
      { 
        "behaviors": [{"id":6002714895372,"name":"Frequent Travelers"}], 
        "interests": [ 
          {"id":6003107902433,"name":"Association football (Soccer)"}, 
          {"id":6003139266461,"name":"Movies"} 
        ] 
      }, 
      { 
        "interests": [{"id":6003020834693,"name":"Music"}], 
        "life_events": [{"id":6002714398172,"name":"Newlywed (1 year)"}] 
      } 
    ], 
    "geo_locations": {"countries":["US"]} 
  }' \
  -F 'status=ACTIVE' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v2.11/act_<AD_ACCOUNT_ID>/adsets
```

Com esta especificação flexível, o público resultante é:

(segmento 1 `or` segmento 2 `or` segmento 3) **e** (segmento 4 `or` segmento 5) **e** segmento 6

```
flexible_spec=
[
  {
    'segment_type':[segment1, segment2], 
    'segment_type':[segment3]
  },
  { 
    'segment_type':[segment4, segment5]
  },
  { 
    'segment_type':[segment6]
  }
]
```

[](#)