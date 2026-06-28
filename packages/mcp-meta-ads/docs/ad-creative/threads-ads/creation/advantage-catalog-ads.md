---
title: "Anúncios de catálogo Advantage+ - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/creation/advantage-catalog-ads"
scraped_at: "2026-02-01T15:45:08.130Z"
---

# Anúncios de catálogo Advantage+ do Threads

Os [anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads/get-started) estão disponíveis para o Threads. Para garantir que um anúncio de catálogo Advantage+ seja veiculado no Threads, inclua `instagram` e `threads` em `publisher_platforms` no seu conjunto de anúncios. Depois, use o posicionamento `threads_stream` do Threads. Não se esqueça de selecionar também o posicionamento `stream` do Instagram.

Para criar um [criativo modelo](/docs/marketing-api/advantage-catalog-ads/get-started#step-3--provide-an-ad-creative) para [anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads) no Threads, defina `template_data` em `object_story_spec` para `threads_stream`. Também especifique o `product_set_id` no `promoted_object` do seu nível de conjunto de anúncios para promover os produtos do conjunto.

### Limitações

-   No momento, imagens e carrosséis de imagens são o único formato de criativo compatível com os anúncios de catálogo Advantage+. Não há compatibilidade com [apresentação multimídia, vídeo e cartões estáticos](/docs/marketing-api/advantage-catalog-ads/get-started#build-a-template-creative).
    
-   O engajamento com anúncios (responder, citar, salvar, compartilhar) está desabilitado para anúncios de catálogo Advantage+ no Threads.
    
-   `OUTCOME_APP_PROMOTION` não é um objetivo compatível.
    

## Como criar um criativo para anúncio de catálogo Advantage+ do Threads

-   Confira os [requisitos de mídia](/docs/marketing-api/ad-creative/threads-ads/creation#media-requirements) para ver as especificações de imagem compatíveis.
    
-   Para saber mais sobre os parâmetros e suas descrições para a criação de anúncios de catálogo Advantage+ do Threads, consulte a [seção sobre criação de criativos para esse tipo de anúncio](/docs/marketing-api/advantage-catalog-ads/get-started#step-3--provide-an-ad-creative). Todos os parâmetros são aceitos e esperam o mesmo comportamento para o Threads e o Instagram. Entretanto, observe o comportamento especial:
    
    -   Os anúncios de catálogo Advantage+ do Threads não renderizam vídeos de produtos do catálogo e sempre usam imagens de produtos do catálogo por padrão.
        
    -   Os anúncios de catálogo Advantage+ do Threads sempre procuram imagens em uma categoria e depois aplicam a colagem 2x2 como padrão.
        
    -   Os anúncios de catálogo Advantage+ com cartões estáticos antes de todos os anúncios desse tipo (também conhecidos como cartões de entrada) não são veiculados no Threads. Os anúncios de catálogo Advantage+ com cartões estáticos depois de todos os anúncios desse tipo são veiculados no Threads, mas os cartões estáticos não são exibidos.
        
    -   Os anúncios de catálogo Advantage+ do Threads usam sempre uma imagem única e um carrossel de imagens como padrão, mesmo para catálogos com vídeos e com a opção de formato de vídeo ou apresentação multimídia.
        
    

### Parâmetros

Nome

Descrição do comportamento no Threads

`child_attachments`  
([Criação de anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads/get-started#build-a-template-creative))

Cartões estáticos que aparecerem antes de todos os anúncios de catálogo Advantage+ farão com que o anúncio não seja veiculado no Threads. Anúncios com o cartão estático aparecendo após os anúncios ainda serão veiculados no Threads.

`preferred_video_tags`  
([Criação de anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads/get-started#build-a-template-creative))

Não são usados, pois os anúncios de catálogo Advantage+ do Threads não renderizam vídeos de produtos do catálogo e sempre usam imagens de produtos do catálogo por padrão.

`format_option`  
([Mídia dinâmica](/docs/marketing-api/advantage-catalog-ads/dynamic-media#create-ads-with-dynamic-media))

Quando o formato for `single_video`, o anúncio será veiculado no Threads como uma imagem única. Quando o formato for `carousel_slideshows`, todos os itens da apresentação multimídia serão renderizados como imagens estáticas. Quando o formato for `collection_video`, todos os itens da apresentação multimídia serão renderizados como imagens estáticas. Os formatos `carousel_images_single_item` e `carousel_images_multi_items` serão renderizados conforme o esperado (como imagem estática e carrossel de imagens, respectivamente).

`media_type_automation`  
([Mídia dinâmica](/docs/marketing-api/advantage-catalog-ads/dynamic-media#create-ads-with-dynamic-media))

Mesmo quando `media_type_automation` for definido como `OPT_IN`, os anúncios de catálogo Advantage+ do Threads não renderizarão vídeos de produtos do catálogo e sempre usarão imagens de produtos do catálogo por padrão.

### Exemplo de solicitação

A variável `product` na solicitação abaixo é um [parâmetro de modelo](/docs/marketing-api/advantage-catalog-ads/get-started#use-product-feed-data-in-your-template) que permite o uso dos dados de feed de produtos no modelo

```
v24.0
```

### Exemplo de resposta

A resposta a essa chamada é o ID de um novo criativo do modelo de anúncios de catálogo Advantage+.

```
{
  "id":"<AD_CREATIVE_ID>"
}
```

[](#)

## Saiba mais

-   [Anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads)
    
-   [Anúncios de catálogo Advantage+ – Introdução](/docs/marketing-api/advantage-catalog-ads/get-started)
    
-   [Anúncios de catálogo Advantage+ do Instagram](/docs/instagram/ads-api/guides/advantage-catalog-ads/)
    
-   [Criação de anúncios do Threads: requisitos de mídia](/docs/marketing-api/ad-creative/threads-ads/creation#media-requirements)
    

[](#)