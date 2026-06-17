---
title: "Especificação do feed de ativos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/dynamic-creative/dynamic-creative-optimization"
scraped_at: "2026-02-01T14:22:37.081Z"
---

# Especificação do feed de ativos

O campo `asset_feed_spec` permite que você veicule combinações distintas de um criativo do anúncio para diferentes usuários. Existem duas maneiras de configurar tais combinações:

-   **Automaticamente**: você fornece os ativos de criativo, e nós veiculamos automaticamente combinações distintas para diferentes usuários. Para usar essa opção, consulte [API de Criativo Dinâmico](/docs/marketing-api/ad-creative/asset-feed-spec/dynamic-creative/).
    
-   **Manualmente**: você fornece os ativos de criativo e cria regras sobre como exibi-los. Para usar essa opção, veja [Regras de personalização de ativo](/docs/marketing-api/asset-customization-rules).
    

A especificação do feed de ativos contém uma coleção de diferentes elementos criativos, como imagens, títulos, corpos de texto e assim por diante. É possível especificar vários ativos de criativo para cada tipo de ativo. O formato da especificação varia de acordo com o caso de uso. Veja também a [referência sobre a especificação do feed de ativos](/docs/marketing-api/reference/ad-asset-feed-spec).

## Criar um feed de ativos

Você pode usar a [`asset_feed_spec`](/docs/marketing-api/reference/ad-asset-feed-spec/) para fornecer vários ativos de criativo, considerando as seguintes limitações:

-   Para todas as [regras de personalização de ativo](/docs/marketing-api/asset-customization-rules), inclua pelo menos duas regras de personalização de direcionamento na `asset_feed_spec`.
    
-   Para [criativos dinâmicos](https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/dynamic-creative), a `asset_feed_spec`**não** deve ter regras de personalização. Nesse caso, você pode combinar imagens e vídeos em diferentes posicionamentos especificando `[“AUTOMATIC_FORMAT”]` em `ad_formats`.
    

Por exemplo, para criar uma `asset_feed_spec` para criativo dinâmico:

```
v24.0
```
  

Você também pode criar uma `asset_feed_spec` com duas alternativas de vídeo, corpo de texto e título:

```
curl \
-F 'object_story_spec={
       "page_id": "YOUR_PAGE_ID"
       "instagram_user_id" : "&lt;IG_USER_ID>",
    }' \
-F "asset_feed_spec={'videos': [{'video_id':'2053108854721025', 'thumbnail_url':'<thumnail_url>', 'url_tags':'video=video1'},{'video_id':'2104406249780616', 'thumbnail_url':'<thumnail_url>','url_tags':'video=video2'}], 'bodies': [{'text':'Begin Your Adventure'}, {'text':'Once a Trainer, always a Trainer.'}], 'titles': [{'text':'Level Up'}, {'text':'Swipe to evolve'}], 'descriptions': [{'text':'Begin Your Adventure'}], 'ad_formats': ['SINGLE_IMAGE'], 'link_urls': [{'website_url':'<WEBSITE_URL>'}]}" \
-F 'access_token=<ACCESS_TOKEN>'  \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/adcreatives
```

Veja todas as [opções disponíveis para a especificação do feed de ativos](/docs/marketing-api/dynamic-creative/asset-feed-spec).

[](#)

## Ler o feed de ativos

Para verificar seu criativo, leia `asset_feed_spec`:

```
curl -X GET \ -d 'fields="asset_feed_spec"' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v25.0/<CREATIVE_ID>/
```

Se você tiver um feed de criativos dinâmicos com várias opções de imagens e corpos de texto, a resposta será assim:

```
{  
   "asset_feed_spec":{  
      "images":[  
         {  
            "url_tags":"image=image1",
            "hash":"785095162a2034666e0d0cc4ea1faf89"
         },
         {  
            "url_tags":"image=image2",
            "hash":"3a24122c13923569599be35567ce4e9e"
         }
      ],
      "bodies":[  
         {  
            "text":"Begin Your Adventure"
         },
         {  
            "text":"Once a Trainer, always a Trainer."
         }
      ],
      "call_to_action_types":[  
         "LEARN_MORE"
      ],
      "call_to_actions":[  
         {  
            "type":"LEARN_MORE"
         }
      ],
      "descriptions":[  
         {  
            "text":"Begin Your Adventure"
         }
      ],
      "link_urls":[  
         {  
            "website_url":"<WEBSITE_URL>"
         }
      ],
      "titles":[  
         {  
            "text":"Swipe to evolve"
         },
         {  
            "text":"Level Up"
         }
      ],
      "ad_formats":[  
         "SINGLE_IMAGE"
      ],
      "optimization_type":"REGULAR"
   },
   "id":"<AD_CREATIVE_ID>",
}
```

Caso tenha um feed de criativos dinâmicos com vários vídeos, corpos de texto e títulos, a resposta será semelhante a esta:

```
{  
   "asset_feed_spec":{  
      "videos":[  
         {  
            "url_tags":"video=video1",
            "video_id":"2053108854721025",
            "thumbnail_url":"<thumnail_url>",
            "thumbnail_hash":"<thumnail_hash>"
         },
         {  
            "url_tags":"video=video2",
            "video_id":"2104406249780616",
            "thumbnail_url":"<thumnail_url>",
            "thumbnail_hash":"<thumnail_hash>"
         }
      ],
      "bodies":[  
         {  
            "text":"Begin Your Adventure"
         },
         {  
            "text":"Once a Trainer, always a Trainer."
         }
      ],
      "call_to_action_types":[  
         "LEARN_MORE"
      ],
      "call_to_actions":[  
         {  
            "type":"LEARN_MORE"
         }
      ],
      "descriptions":[  
         {  
            "text":"Begin Your Adventure"
         }
      ],
      "link_urls":[  
         {  
            "website_url":"<WEBSITE_URL>"
         }
      ],
      "titles":[  
         {  
            "text":"Swipe to evolve"
         },
         {  
            "text":"Level Up"
         }
      ],
      "ad_formats":[  
         "SINGLE_VIDEO"
      ],
      "optimization_type":"REGULAR"
   },
   "id":"<AD_CREATIVE_ID>",
}
```

[](#)

## Editar um feed de ativos

Você pode adicionar, substituir ou remover qualquer um dos ativos do criativo. Para fazer isso, forneça outro criativo com a nova `asset_feed_spec`.

Você pode:

-   Adicionar ativos
    
-   Remover ativos existentes
    
-   Substituir ativos por outros completamente novos
    

O que você **não pode** fazer:

-   Alterar os formatos do anúncio, como de `SINGLE IMAGE` para `VIDEO`
    
-   Transformar um anúncio de criativo baseado no feed de ativos em um anúncio de criativo não dinâmico, que não tenha uma `asset_feed_spec`
    

```
v24.0
```

Ao fornecer um novo criativo do anúncio para substituir o antigo, você ainda precisará cumprir todas as [restrições](/docs/marketing-api/dynamic-creative/asset-feed-spec) aplicáveis.

[](#)