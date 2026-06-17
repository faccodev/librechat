---
title: "Formato de anúncio flexível - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/flexible-ad-format"
scraped_at: "2026-02-01T13:54:26.801Z"
---

# Introdução ao formato de anúncio flexível da Meta

Este documento explica como o formato de anúncio flexível permite a automação de criativos ao agrupar ativos relacionados em um único anúncio, sem a necessidade de selecionar um formato específico.

## Antes de começar

Para configurar as campanhas de anúncio em formato flexível, revise as instruções relacionadas a estas etapas:

1.  [Criar uma campanha](https://developers.facebook.com/docs/marketing-apis/get-started/#campaign)
2.  [Criar um conjunto de anúncios](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-set-budget)
3.  [Criar o anúncio ou um criativo independente](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-creative)
4.  [Habilitar o anúncio](https://developers.facebook.com/docs/marketing-apis/get-started/#book-ad)

### Limitações

-   Atualmente, somente os objetivos de campanha `OUTCOME_SALES` e `OUTCOME_APP_PROMOTION` são compatíveis com o formato de anúncio flexível.
    

## Criar um anúncio usando o formato flexível

É possível usar `creative_asset_groups_spec` para fornecer diferences criativo, com estas limitações:

-   Pelo menos um `image` ou `video` é necessário por grupo.
    
-   Todas as `call_to_actions` fornecidas precisam ser do mesmo `type`.
    
-   Não pode haver mais de 5 `texts` por `text_type` em um grupo.
    

Para criar um anúncio no formato flexível por meio do ponto de extremidade `/ads`:

```
v24.0
```

[](#)

## Ler o formato de anúncio flexível

Para verificar seu anúncio, leia `creative_asset_group_spec`:

```
v24.0
```
**Resposta**
```
{
  "creative_asset_groups_spec": {
    "groups": [
      {
        "images": [
          {
            "hash": <IMAGE_HASH_1>,
          },
          {
            "hash": <IMAGE_HASH_2>,
          }
        ],
        "texts": [
          {
            "text": "Summer Sale",
            "text_type": "primary_text"
          },
          {
            "text": "Everything 50% off",
            "text_type": "headline"
          }
        ],
        "videos": [
          {
            "video_id": <VIDEO_ID_1>,
            "image_hash": <VIDEO_THUMBNAIL_HASH_1>
          },
          {
            "video_id": <VIDEO_ID_2>,
            "image_hash": <VIDEO_THUMBNAIL_HASH_2>
          }
        ],
        "group_uuid": <GROUP_ID>
      }
    ]
  },
  "id": <AD_ID>
}
```

[](#)

## Veja também

Para saber mais sobre os componentes e conceitos mencionados neste documento, consulte estes guias:

-   [Ad Creative](/docs/marketing-api/reference/ad-creative)
    
-   [Grupo de anúncios](/docs/marketing-api/reference/adgroup/)
    
-   [Especificação para story do objeto de criativo do anúncio](/docs/marketing-api/reference/ad-creative-object-story-spec/)
    
-   [Recursos de IA generativa para anúncios](https://www.facebook.com/business/news/generative-ai-features-for-ads-coming-to-all-advertisers)
    

[](#)