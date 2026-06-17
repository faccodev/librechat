---
title: "Anúncios no Audience Network - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audience-network"
scraped_at: "2026-02-01T13:58:22.378Z"
---

# Anúncios no Audience Network

O [Audience Network](/products/app-monetization/audience-network/) do Facebook exibe anúncios em sites para celular e apps iOS e Android de outros publishers. Você pode usar as opções de direcionamento do Facebook para encontrar o seu público nesses apps e sites para celular.

Nesta página, veja as [Regras do Audience Network para posicionamento e criativo do anúncio](#creative-placement). Depois, veja como criar anúncios:

-   [Anúncio básico do Audience Network](#create-audience-network-ad)
    
-   [Anúncios para dispositivos móveis](#mobile-ads)
    
-   [Anúncios em carrossel](#example_carousel)
    
-   [Anúncios de vídeo](#example_video)
    
-   [Anúncios de Catálogo Advantage+](#example_dpa)
    

Saiba também como [ver uma prévia](#preview) e [mensurar](#measurement) o anúncio.

## Criativo do anúncio e posicionamento

O Audience Network do Facebook entrega a imagem do anúncio ao app de destino:

#### Criativo do anúncio compatível

-   [Anúncios de imagem no app para celular](/docs/reference/ads-api/mobile-app-ads)
    
-   [Anúncios de vídeo no app para celular](/docs/marketing-api/mobile-app-ads/#create_video)
    
-   [Anúncios com link](#example_link)
    
-   Anúncios de vídeo com link
    
-   [Link em carrossel e anúncios de app](/docs/marketing-api/guides/carousel-ads)
    
-   [Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads)
    

#### [Objetivos](/docs/marketing-api/reference/ad-campaign-group) compatíveis

-   `MOBILE_APP_INSTALLS`
    
-   `MOBILE_APP_ENGAGEMENT`
    
-   `LINK_CLICKS`, consulte [Blog, Expansões de vídeo para cliques para o site](/ads/blog/post/2015/06/09/video-website-clicks/)
    
-   `CONVERSIONS`, consulte [Blog, Opções extras para vídeos](/ads/blog/post/2015/04/09/expansion-video-objectives/#web_conv)
    
-   `PRODUCT_CATALOG_SALES`
    

#### Lances

Use a combinação de tipos de lance, `billing event` e `optimization goal`. Consulte [Simplificação da otimização](/docs/marketing-api/optimization_simplification).

#### Plataforma de publicação

É preciso usar `audience_network` com outra plataforma, como o `facebook`. **Não é possível exibir anúncios somente no Audience Network.**

publisher\_platform

Descrição

`audience_network`

Isso permite a exibição do anúncio no Audience Network.

#### Restrições

Os tamanhos IAB não são compatíveis.

[](#)

## Criar anúncio no Audience Network

Por exemplo, para criar um anúncio com link a ser veiculado:

#### Etapa 1

Crie uma campanha de anúncios. Defina `objective` como `LINK_CLICKS` ou `CONVERSIONS`:

```
v24.0
```

#### Etapa 2

Crie um conjunto de anúncios com posicionamento do Audience Network:

```
v24.0
```

Para o [conjunto de anúncios](/docs/reference/ads-api/adset), especifique um [posicionamento](/docs/reference/ads-api/targeting-specs/#placement) e defina `publisher_platforms` no `targeting` do anúncio como `audience_network`.

#### Etapa 3

Forneça o criativo do anúncio com link:

```
v24.0
```

#### Etapa 4

Crie um anúncio:

```
v24.0
```

[](#)

## Anúncios para dispositivos móveis

### Anúncio de imagem para o Audience Network

Para criar um anúncio de imagem para app para celular com o posicionamento do Audience Network:

#### Etapa 1

Crie uma campanha de anúncios. Defina `objective` como `APP_INSTALLS` ou [`MOBILE_APP_ENGAGEMENT`](/docs/app-ads/formats/engagement-ads):

```
v24.0
```

#### Etapa 2

Crie o conjunto de anúncios. Especifique o posicionamento do Audience Network e defina `promoted_object` como ID do app:

```
v24.0
```

#### Etapa 3

Elabore o criativo de imagem do anúncio de app para celular:

```
v24.0
```

#### Etapa 4

Crie um anúncio:

```
v24.0
```
  

Consulte [Anúncios de app para celular](/docs/reference/ads-api/mobile-app-ads).

### Anúncio de vídeo para o Audience Network

Para criar um anúncio de vídeo de app para celular com o posicionamento do Audience Network, siga as etapas 1 e 2 em **Anúncio de imagem para o Audience Network**. Em seguida, forneça o criativo do vídeo:

```
v24.0
```

Por fim, crie o anúncio. Veja a etapa 4 em **Anúncio de imagem para o Audience Network**.

### Anúncio de vídeo com link para o Audience Network

Para criar um anúncio de vídeo com link com o posicionamento do Audience Network:

#### Etapa 1

Crie uma campanha de anúncios com o `objective` definido como `LINK_CLICKS` ou `CONVERSIONS`:

```
v24.0
```

#### Etapa 2

Crie um conjunto de anúncios com posicionamento do Audience Network:

```
v24.0
```

#### Etapa 3

Carregue um vídeo com o link. Carregue um [vídeo na sua página](/docs/graph-api/reference/page/videos), que ainda não tenha sido publicado, com um link de chamada para ação. Também é possível carregar vídeos na [biblioteca de vídeos](/docs/marketing-api/advideo) da conta de anúncios:

```
v24.0
```
  

#### Etapa 4

Forneça o [criativo do anúncio](/docs/reference/ads-api/adcreative). Use a identificação do post da Página para fornecer:

```
v24.0
```

#### Etapa 5

Crie um anúncio:

```
v24.0
```

[](#)

## Anúncios em carrossel

No Audience Network, o Facebook exibe somente os dois primeiros `child_attachments` no seu carrossel, na ordem fornecida. Para anúncios em carrossel no Audience Network, observe que:

-   O `objective` da campanha precisa ser `MOBILE_APP_INSTALLS`, `MOBILE_APP_ENGAGEMENT`, `LINK_CLICKS` ou `CONVERSIONS`
    
-   A `targeting/publisher_platforms` do conjunto de anúncios precisa incluir `audience_network`
    

Consulte [Guia de anúncios de produtos](https://www.facebook.com/business/ads-guide/), [API de Prévia](/docs/marketing-api/generatepreview) e [Anúncios em carrossel](/docs/marketing-api/guides/carousel-ads#create).

[](#)

## Anúncios em vídeo

Especifique o posicionamento do Audience Network no direcionamento no nível do conjunto de anúncios:

```
"audience_network_positions": [ "classic", "instream_video"]
```

Consulte [Anúncios de vídeo](/docs/marketing-api/guides/videoads).

[](#)

## Anúncios de catálogo Advantage+

Para usar o Audience Network como posicionamento de Anúncios de Catálogo Advantage+:

-   A campanha precisa conter `objective=PRODUCT_CATALOG_SALES`
    
-   A `targeting/publisher_platforms` do conjunto de anúncios precisa incluir `audience_network`
    

Consulte [Advantage+ Catalog Ads](/docs/marketing-api/dynamic-product-ads/ads-management).

[](#)

## Prévia do anúncio

Para ver uma prévia do anúncio no Audience Network:

#### Etapa 1

Faça uma chamada do tipo `/previews` para o [anúncio](/docs/reference/ads-api/adgroup)

#### Etapa 2

Especifique `ad_format=`:

-   `MOBILE_BANNER` no caso de app para celular ou banner da web,
    
-   `MOBILE_INTERSTITIAL` no caso de app intersticial para celular ou
    
-   `MOBILE_NATIVE` no caso de app para celular ou prévias de formato nativo da web
    
-   `MOBILE_MEDIUM_RECTANGLE`
    
-   `MOBILE_FULLWIDTH`
    
-   `AUDIENCE_NETWORK_INSTREAM_VIDEO`
    
-   `AUDIENCE_NETWORK_OUTSTREAM_VIDEO`
    
-   `AUDIENCE_NETWORK_INSTREAM_VIDEO_MOBILE`
    
-   `AUDIENCE_NETWORK_REWARDED_VIDEO`
    
-   `AUDIENCE_NETWORK_NATIVE_BANNER`
    
-   `MESSENGER_MOBILE_INBOX_MEDIA`
    

#### Etapa 3

As prévias de web móvel são exibidas da mesma maneira que em apps para celular.

```
https://graph.facebook.com/<API_VERSION>/<AD_ID>/previews?ad_format=MOBILE_BANNER
https://graph.facebook.com/<API_VERSION>/<AD_ID>/previews?ad_format=MOBILE_INTERSTITIAL
https://graph.facebook.com/<API_VERSION>/<AD_ID>/previews?ad_format=MOBILE_NATIVE
```

A API retorna um iFrame que faz referência ao próprio CSS e gera a imagem da prévia. O iFrame é válido por apenas 24 horas. Consulte [referência sobre prévias do anúncio](/docs/reference/ads-api/generatepreview).

[](#)

## Mensuração

Para saber mais sobre o desempenho do anúncio em feeds de vídeos sugeridos, consulte `/insights` com `breakdowns=['publisher_platform']`. Veja a [Guia de Insights sobre anúncios](/docs/marketing-api/insights-api/getting-started). Os resultados têm esta aparência:

```
{
  ......
  "spend": 9.23,
  "today_spend": 0,
  "total_action_value": 0,
  "total_actions": 1,
  "total_unique_actions": 1,
  "link_clicks": 0,
  "placement": "mobile_feed"
}, 
{
  ......
  "spend": 7.73,
  "today_spend": 0,
  "total_action_value": 0,
  "total_actions": 6,
  "total_unique_actions": 5,
  "link_clicks": 3,
  "placement": "mobile_video_channel"
},
{
  ......
  "spend": 6.23,
  "today_spend": 0,
  "total_action_value": 0,
  "total_actions": 3,
  "total_unique_actions": 2,
  "link_clicks": 1,
  "placement": "desktop_video_channel"
},
```

`mobile_feed` refere-se ao Feed no Facebook para Celular, `mobile_video_channel` são feeds de vídeos sugeridos para celular e `desktop_video_channel` são feeds de vídeos sugeridos para desktop.

[](#)