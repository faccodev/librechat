---
title: "Imagens com taxa de várias proporções - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/multi-ratio-images"
scraped_at: "2026-02-01T14:17:21.351Z"
---

# Como gerenciar imagens com taxa de várias proporções em anúncios de catálogo Advantage+

O feed do catálogo aceita o carregamento de várias imagens para um produto, e existem diversas opções para selecionar qual imagem será exibida ao cliente.

## Seleção de imagem por tag

Você pode usar tags de imagem no seu feed para selecionar a imagem que deseja exibir. Algumas tags são automaticamente correspondidas com base no posicionamento dos anúncios.

-   `INSTAGRAM_PREFERRED`: usada no Instagram (por exemplo, para exibir imagens diferentes entre o Instagram e o Facebook).
    
-   `STORY_PREFERRED`: usada para o Facebook e Instagram Stories (taxa 9:16).
    
-   `REELS_PREFERRED`: usada para o Facebook e Instagram Reels (taxa 9:16).
    
-   `ASPECT_RATIO_4_5_PREFERRED`: usada se o posicionamento for elegível para exibir imagens 4:5.
    
-   `ASPECT_RATIO_9_16_PREFERRED`: usada se o posicionamento for elegível para exibir imagens 9:16.
    

Existem 2 tags distintas para posicionamentos 9:16, porque há diferentes zonas seguras para Stories e Reels, e é possível carregar diversas imagens 9:16 para cada posicionamento.

Você também pode usar tags personalizadas (por exemplo, para selecionar imagens diferentes dependendo do anúncio exibido) utilizando o [parâmetro `preferred_image_tags`](/docs/marketing-api/reference/ad-creative-link-data/).

Outros tipos de seleções de imagens antigas, como por índice, não são recomendadas e posteriormente serão removidas.

[](#)

## Imagens com taxa de proporção de 9:16

Imagens com taxa de proporção de 9:16 podem ser exibidas em tela cheia para os clientes nos Stories e no Reels para anúncios em carrossel e de imagem única.

Para habilitar a exibição de tela cheia, é necessário ativar a opção **Adaptar ao posicionamento** nas otimizações de anúncios de catálogo Advantage+ no Gerenciador de Anúncios ou utilizar o [campo `adapt_to_placement`](/docs/marketing-api/advantage-creative-for-catalog/) no parâmetro `creative_spec`.

Quando a opção "Adaptar ao posicionamento" é ativada, tentamos analisar todas as imagens do seu produto para encontrar uma que corresponda a posicionamentos 9:16. Por exemplo, se você tiver uma imagem 1:1 e uma 9:16, a imagem 9:16 será usada para posicionamentos 9:16. Recomenda-se revisar as imagens 9:16 disponíveis no seu catálogo antes de ativar essa opção.

Você também pode usar tags no seu feed para selecionar a imagem se tiver várias imagens 9:16. A imagem marcada deve ter uma taxa de proporção de 9:16 para ser selecionada (caso contrário, voltaremos para a primeira imagem disponível de 9:16, se houver).

Depois de ativada, a opção "Adaptar ao posicionamento" também permite desativar o cartão de apresentação nos Instagram Stories, que mostra uma miniatura de 4 produtos em um cartão, a fim de exibir o primeiro produto selecionado em tela cheia.

**Nota:** no momento, o título e a legenda do produto não são mostrados nos Stories se a imagem for exibida em tela cheia.

### Fallback

Se você ativar a opção "Adaptar ao posicionamento" e nenhum dos produtos a ser exibido no carrossel tiver imagens 9:16, usaremos a exibição padrão. Se pelo menos um dos produtos tiver uma imagem de 9:16, preencheremos o resto da imagem com sua cor de fundo.

[](#)

## Suporte a várias taxas de `preferred_image_tags`

Você pode combinar a seleção de diferentes imagens para diversos anúncios com suporte a várias taxas. Em vez de fornecer uma tag simples, você pode substituir a tag por JSON serializado (e com escape) que pode fornecer tags diferentes para diversas taxas de proporção.

O JSON sem série deve ter este formato (as taxas são opcionais):

```
{
 "DEFAULT":"my-tag",
 "4_5":"my-tag-4-5",
 "9_16":"my-tag-9-16"
}
```

**Exemplo**

```
preferred_image_tags: ["{\"DEFAULT\":\"my_default_tag_1\",\"9_16\":\"my_9_16_tag_1\"}","{\"DEFAULT\":\"my_default_tag_2\",\"9_16\":\"my_9_16_tag_2\"}"]
```

Nesse caso, uma imagem com tag `my_9_16_tag_1` ou `my_9_16_tag_2` será usada para posicionamentos 9:16, e uma imagem com `my_default_tag_1` ou `my_default_tag_2` será usada de outra forma.

[](#)