---
title: "Prévia dos aprimoramentos padrão - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/creative-preview"
scraped_at: "2026-02-01T14:18:19.912Z"
---

# Prévia dos aprimoramentos padrão

A partir da versão 22.0 da API de Marketing, as prévias dos [aprimoramentos padrão](/docs/marketing-api/advantage-catalog-ads/standard-enhancements/) não estarão mais disponíveis. Em vez disso, você poderá obter prévias de recursos individuais do criativo Advantage+ seguindo as instruções descritas no artigo [Introdução ao criativo Advantage+](/docs/marketing-api/creative/advantage-creative/get-started).

Os sub-recursos no pacote de aprimoramentos padrão para anúncios de imagem única incluem `image_template`, `image_touchups`, `text_optimizations` e `inline_comment`. Para anúncios de vídeo único, os sub-recursos são `video_auto_crop`, `text_optimizations` e `inline_comment`.

A API de Prévia para criativos Advantage+ é compatível com a geração de prévias antes e depois da publicação do anúncio.

-   Forneça a identificação do criativo ou do anúncio para ver as prévias de anúncios publicados.
    
-   Forneça as especificações do criativo para ver as prévias de anúncios não publicados.
    

## Funcionalidade atual

Consulte a [documentação da API de Prévia](/docs/marketing-api/generatepreview/v15.0) para saber mais sobre a funcionalidade atual.

1.  Forneça a identificação do criativo ou do anúncio e o posicionamento.
    ```
    v24.0
    ```
    
2.  Receba a resposta do iframe.
    ```
    {
      "data": [
        {
          "body": "<PREVIEW_LINK>",
        }
      ]
    }
    ```
    
3.  Clique no link para ver as prévias.

[](#)

## Funcionalidade atualizada

1.  Forneça a identificação do criativo ou do anúncio e o posicionamento **com os novos parâmetros**.
    ```
    v24.0
    ```
    
2.  Receba a resposta do iframe.
    ```
    {
      "data": [
        {
          "body": "<preview link>",
          "transformation_spec": {
            "standard_enhancements": [
              {
                "body": "<preview link>",
                "optimization_type_description": "Vary image aspect ratio",
                "status": "eligible"
              },
              {
                "body": "<preview link>",
                "optimization_type_description": "Image templates for Feed",
                "status": "eligible"
              }
            ]
          }
        }
      ]
    }
    ```
    
3.  Clique no link para ver as prévias.

### Parâmetros

Consulte a [documentação da API de Prévia](/docs/marketing-api/generatepreview/v16.0) para ver os parâmetros atuais. Os novos parâmetros aparecem listados abaixo.

Nome

Descrição

`creative_feature`

Recurso para criativos que será aplicado à prévia.  
**Valores possíveis:**`standard_enhancements`

### Limitações

-   No momento, as prévias para criativos Advantage+ são exibidas apenas nos posicionamentos `MOBILE_FEED_STANDARD`, `INSTAGRAM_STANDARD`, `INSTAGRAM_REELS` e `INSTAGRAM_STORY`.
    
-   As prévias de anúncios de imagem em `MOBILE_FEED_STANDARD` podem aparecer cortadas, mesmo que não tenham sido aplicados recortes manuais, porque o posicionamento só é compatível com algumas taxas de proporção. Consulte [Taxas de proporção compatíveis com posicionamentos no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/682655495435254?id=271710926837064&helpref=faq_content) para saber mais sobre as taxas de proporção que podem ser usadas em cada posicionamento.
    
-   As transformações nos aprimoramentos padrão a seguir não são compatíveis com o recurso de prévia:
    
    -   Comentário inline
        
    -   Liquidez de texto
        
    

[](#)