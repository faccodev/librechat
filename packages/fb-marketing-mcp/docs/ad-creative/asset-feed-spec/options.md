---
title: "Opções do feed de ativos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/options"
scraped_at: "2026-02-01T14:16:15.133Z"
---

# Opções de especificações do feed de ativos

Você pode usar as seguintes opções nas suas `asset_feed_spec`. Consulte [Ad Asset Feed Spec](/docs/marketing-api/reference/ad-asset-feed-spec/) para ver mais informações de referência.

Nome da propriedade

Descrição

`images`

tipo: matriz de lista

**Obrigatório para os formatos `SINGLE_IMAGE` e `CAROUSEL_IMAGE`.**

Matriz de imagens **qualificadas**. As imagens fornecidas nesta matriz devem ser incluídas na [biblioteca de imagens](/docs/marketing-api/reference/ad-image) da conta de anúncios.

  

Forneça este campo como uma matriz de lista contendo `{"url": "{IMAGE_URL}", "hash": "{IMAGE_HASH}", "url_tags": "{TAG}"}`. É obrigatório incluir `url` ou `hash`.

`videos`

tipo: matriz de lista

**Obrigatório para o formato `SINGLE_VIDEO`.**

Matriz de `video_id`s. Os [`video_id`s](/docs/marketing-api/advideo/) fornecidos nesta matriz devem pertencer à conta de anúncios.

  

Forneça este campo como uma matriz de lista contendo `{"video_id": "{VIDEO_ID}", "thumbnail_url": "{THUMBNAIL_URL}", "url_tags": "{TAG}"}`.

`carousels`  
Tipo: matriz de lista

**Opcional.**  
É uma matriz de `child_attachments` com os boolianos `multi_share_end_card` e `multi_share_optimized`, além de `adlabels`. Os `child_attachments` presentes na matriz devem pertencer à conta de anúncios.

Forneça os `child_attachments` como uma matriz de lista contendo `{"image_label": {"name": "{IMAGE_LABEL}"}, "video_label": {"name": "{VIDEO_LABEL}"}, "title_label": {"name": "{TITLE_LABEL}"}, "description_label": {"name": "{DESC_LABEL}", "link_url_label": {"name": "{LINK_URL}"}}`.  
**Observação:** é preciso incluir `image_label` ou `video_label`.

Consulte a seção [Especificação de campo](/docs/marketing-api/guides/videoads#spec) para saber mais.

`bodies`

tipo: matriz de lista

**Opcional.**

Uma matriz de corpos. A mensagem principal ou o texto do anúncio.

  

Forneça este campo como uma matriz de lista de `{"text": "{BODY_TEXT}", "url_tags": "{TAG}"}`.

`call_to_action_types`

tipo: matriz de lista

**Obrigatório para todos os objetivos, exceto `OUTCOME_AWARENESS`.**

Matriz de valores de chamada para ação.

  

Forneça este campo como uma matriz de lista de `{"{CALL_TO_ACTION}"}`. Você pode fornecer até 5 valores.

`titles`

tipo: matriz de lista

**Opcional.**

Matriz de títulos. Um título é um breve cabeçalho no anúncio, geralmente exibido ao lado de um link, uma imagem ou um vídeo.

  

Forneça este campo como uma matriz de lista de `{"text": "{TITLE}", "url_tags": "{TAG}"}`.

`descriptions`

tipo: matriz de lista

**Opcional.**

Matriz de texto descritivo secundário, exibido com menos destaque do que os corpos ou os títulos. Geralmente, aparece ao lado de um link, uma imagem ou um vídeo. Se não for especificado, o Facebook fará a raspagem do link que você forneceu para gerar esse valor. Use uma string vazia com espaço único para uma descrição em branco, caso não queira usar o texto da raspagem.

  

Forneça este campo como uma matriz de lista de `{"text": "{DESCRIPTION}", "url_tags": "{TAG}"}`.

`link_urls`

tipo: matriz de lista

**Obrigatório.**

Matriz de URLs de links.

  

Forneça este campo como uma matriz de lista de `{"website_url": "{URL}"}`.

`ad_formats`

tipo: matriz de strings

**Obrigatório.**

Uma matriz de formatos de anúncio do Facebook para criação de publicidade. Formatos aceitos: `SINGLE_IMAGE`, `CAROUSEL`, `SINGLE_VIDEO`, `AUTOMATIC_FORMAT`.

  

Forneça este campo como uma matriz de strings `["{AD_FORMAT}"]`.

`optimization_type`

tipo: cadeia de caracteres

**Opcional.**

Tipo de otimização usado no feed de ativos. Valores possíveis: `ASSET_CUSTOMIZATION`, `LANGUAGE`, `PLACEMENT` e `REGULAR`.

`message_extensions`

tipo: matriz de strings

**Opcional.**  
Tipo de extensão de mensagem usado no feed de ativos.

  

Valor possível: `whatsapp`.

`onsite_destinations`  
Tipo: matriz de lista

**Obrigatório para anúncios das Lojas.** Válido para anúncios estáticos nos formatos `SINGLE_IMAGE`, `SINGLE_VIDEO` ou `CAROUSEL`.  
Forneça este campo como uma matriz de lista contendo um dos seguintes valores para especificar o destino da sua loja no site.

```
{"storefront_shop_id": "<SHOP_STOREFRONT_ID>"}
or 
{"shop_collection_product_set_id": "<PRODUCT_SET_ID>" 
or 
{"details_page_product_id": "<PRODUCT_ID>"}
```

`shops_bundle`  
Tipo: booliano

**Obrigatório para anúncios das Lojas.** Válido para anúncios de catálogo Advantage+.  
Forneça este campo para a otimização da loja. Inclui os tipos de otimização da loja `reasons_to_shop` e `automated_product_tags`.  
Valores possíveis: `true`, `false`.

`reasons_to_shop`  
Tipo: booliano

**Obrigatório para anúncios das Lojas.** Válido para anúncios de catálogo Advantage+.  
Forneça este campo para a otimização da loja. Destaca automaticamente as informações do produto da sua loja, como "Envio grátis", "Em alta" ou "Baixo estoque".  
Valores possíveis: `true`, `false`.

## Restrições de especificações do feed de ativos

**Formatos do anúncio**

-   `ad_formats` aceitos: `SINGLE_IMAGE`, `CAROUSEL`, `SINGLE_VIDEO` e `AUTOMATIC_FORMAT`.
    
-   Apenas um `ad_format` é permitido por feed de ativos.
    
-   O `ad_format` é contabilizado como um ativo em um feed de ativos.
    

**Número de ativos**:

-   Total máximo de 30 ativos. Por exemplo, você tem 28 ativos com 10 `images`, 5 `bodies`, 5 `titles`, 5 `description`, 1 `ad_format`, 1 `link_url` e 1 `call_to_action_types`.
    
-   Número total de imagens: <= 10.
    
-   Número total de vídeos: <= 10. Se você usar o Instagram como posicionamento, apenas vídeos quadrados ou no formato paisagem serão permitidos.
    
-   Número total de corpos: <= 5.
    
-   Número total de chamadas para ação: <= 5.
    
-   Número total de títulos: <= 5.
    
-   Número total de links: <= 5.
    
-   Número total de descrições: <= 5.
    

**Requisitos de imagem**:

-   Especificações de imagem recomendadas: 1.9:1.
    
-   [Tamanho da imagem](https://www.facebook.com/business/ads-guide/clicks-to-website/links?toggle0=Photo) recomendado: 1.200 pixels x 628 pixels.
    
-   Para o formato `CAROUSEL_IMAGE`, é preciso fornecer pelo menos 2 imagens.
    
-   Se você usar o Instagram como posicionamento, escolha imagens quadradas para melhorar o desempenho.
    

**Requisitos de texto**:

-   Título e texto da descrição: comprimento máximo de 255 caracteres.
    
-   Texto do corpo: comprimento máximo de 1.024 caracteres.
    
-   Se você não especificar nenhuma descrição, faremos a raspagem do link fornecido para encontrar uma opção.
    
-   Para `CAROUSEL_IMAGE`, os títulos são opcionais.
    

`url_tags` são opcionais e estão disponíveis apenas para `images`, `videos`, `bodies`, `descriptions` e `titles`. O Facebook anexa `url_tags` ao URL do link como parâmetros para cada ativo em um anúncio.

Por exemplo, uma combinação de feed de ativos válida para o formato `SINGLE_IMAGE` é:

-   5 `images`
    
-   3 `bodies`
    
-   3 `titles`
    
-   3 `descriptions`
    
-   1 formato: `SINGLE_IMAGE`
    
-   2 `link_urls`
    

```
"link_urls=[{'website_url':'<WEBSITE_URL>'}, {'website_url':'<WEBSITE_URL>'}]"
```

[](#)

## Usar deep links

Você pode usar deep links nas especificações de feed de ativos para campanhas com os seguintes objetivos:

-   `APP_INSTALLS`
    
-   `CONVERSIONS`
    
-   `LINK_CLICKS`
    

Adicione o `deeplink_url` em `link_urls` ao criar suas `asset_feed_spec`.

```
v24.0
```

[](#)

## Anúncios do WhatsApp para o site

É possível criar anúncios que direcionam as pessoas ao seu site exibindo um botão do WhatsApp na parte inferior da tela para que elas possam entrar em contato com você instantaneamente. Isso ajudará as pessoas a se conectarem com você no WhatsApp enquanto visitam seu site.

Adicione o parâmetro `message_extensions` com `"type": "whatsapp"` ao criar suas `asset_feed_spec`.

```
v24.0
```

[](#)