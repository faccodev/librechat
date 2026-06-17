---
title: "Anúncios em carrossel - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/creation/carousel-ads"
scraped_at: "2026-02-01T14:13:06.112Z"
---

# Anúncios em carrossel no Threads

Para criar [anúncios em carrossel](/docs/marketing-api/guides/videoads#carousel), forneça um criativo do anúncio com vários `child_attachments` em `link_data` para `threads_stream`. É necessário fornecer o `threads_user_id` e usar apenas [objetivos](/docs/marketing-api/ad-creative/threads-ads/creation#step-2--create-an-ad-campaign) compatíveis com os anúncios do Threads.

Há algumas diferenças entre os [anúncios em carrossel do Instagram](/docs/instagram/ads-api/guides/carousel-ads) e do Threads. Essas diferenças só acontecem com o posicionamento do Threads. Se você tiver um conjunto de anúncios com posicionamentos do Facebook, do Instagram e do Threads habilitados, o que funciona no Facebook e/ou no Instagram pode ser diferente no Threads.

-   Cada anexo precisa ter um `link` especificado, que é o destino do clique na imagem.
    
-   Não há botão de chamada para ação no anúncio. Se um título ou nome for fornecido para um anexo, ele substituirá o texto da chamada para ação. Se nenhum título ou nome for fornecido, o texto da chamada para ação será usado para o anexo.
    
-   A [criação inline](/docs/marketing-api/guides/videoads#inline) só é permitida para 10 crianças.
    

## Cartões de imagem

-   Cada anexo precisa conter um conjunto de `picture` ou de `image_hash`. Não definimos a imagem de `link_data` como padrão.
    
-   Confira os [requisitos de mídia](/docs/marketing-api/ad-creative/threads-ads/creation#media-requirements) para ver as especificações de imagem compatíveis.
    

[](#)

## Criar um criativo do anúncio em carrossel de imagens no Threads

### Exemplo de solicitação

```
v24.0
```

[](#)

## Saiba mais

-   [Anúncios em vídeo e em carrossel](/docs/marketing-api/guides/videoads#carousel)
    
-   [Anúncios em carrossel do Instagram](/docs/instagram/ads-api/guides/carousel-ads)
    
-   [Criação de anúncios do Threads: requisitos de mídia](/docs/marketing-api/ad-creative/threads-ads/creation#media-requirements)
    

[](#)