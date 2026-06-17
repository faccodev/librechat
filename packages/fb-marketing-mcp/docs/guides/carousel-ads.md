---
title: "Vídeo e carrossel - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/carousel-ads"
scraped_at: "2026-02-01T14:27:57.476Z"
---

# Anúncios em vídeo e em carrossel

Você pode criar, mensurar e otimizar facilmente anúncios de vídeo e em carrossel no Facebook por meio da API. Consulte [Anúncios em carrossel no Facebook para Empresas](https://www.facebook.com/business/a/online-sales/carousel-link-ads). Para ver os formatos de vídeo compatíveis com anúncios, acesse [Vídeos na Central de Ajuda para o Anunciante](https://www.facebook.com/business/help/1640701476174343?__mref=message_bubble).

### Limitações

-   O `video_id` precisa estar associado à conta de anúncios.
    

## Anúncios em vídeo

Siga estas etapas para criar um anúncio em vídeo em um objetivo `VIDEO_VIEWS` e otimizar o alcance do lance:

-   Etapa 1: [fornecer criativos do anúncio](#create-ad-creative)
    
-   Etapa 2: [criar campanha de anúncios](#create-ad-campaign)
    
-   Etapa 3: [criar um conjunto de anúncios](#create-ad-set)
    
-   Etapa 4: [criar um anúncio](#create-ad)
    

### Etapa 1: fornecer [criativos do anúncio](/docs/reference/ads-api/adcreative)

Crie um anúncio usando um ID de vídeo existente e um vídeo carregado no Facebook.

Requisitos:

-   As permissões `pages_read_engagement` e `ads_management`
    
-   Um [vídeo carregado](/docs/graph-api/video-uploads) para o ponto de extremidade `act_{ad-account-id}/advideos`
    

```
v24.0
```

### Etapa 2: criar [campanha de anúncios](/docs/reference/ads-api/adcampaign)

Defina o objetivo como `VIDEO_VIEWS`:

```
v24.0
```

Consulte [Referência: campanha](/docs/marketing-api/reference/ad-campaign-group), [AdObjectives em PHP](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-php-ads-sdk%2Fblob%2Fmaster%2Fsrc%2FFacebookAds%2FObject%2FValues%2FAdObjectives.php&h=AT1m6WwejhCE8eKe6jmAqFKW_sZTeJnqkcHYb2SD5MZbRbAOVZ11fbKbUQ7u7Cmr2PLvWzaIZWxopvN8n8BEGVdX8Ri3xIFvN9rhXzAHkpCKNCTe3RUuP_j6CPINExJ8mJXWGA0LK7SOZvLA4lacbobDwQO4cxAQqT9hddWK5oo) e [AdObjectives em Python](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-python-ads-sdk%2Fblob%2F199daddec0174ac45d4ee985490b987739cb13af%2Ffacebookads%2Fmixins.py%23L128&h=AT08BPOSUxhxYb14WMALmAX9hdvHpQh7hpm0LVT2W9ZZGdb7xkRcNbT-nO8dgskeTAS1wtX8Ucr4OHOuOvFFg9sE8ThZiFlUqBCs3Cv7oyiTkc8WvLWPYHRKzF-ml_kiRgJ7hBbY_sndelJSxLHyVWnPzimHabpT7x1O5QAk6to)

### Etapa 3: criar um [conjunto de anúncios](/docs/reference/ads-api/adset)

Se a meta for o menor custo por visualização possível, será necessário emparelhar o objetivo da campanha de visualização do vídeo com `optimization_goal=THRUPLAY` de um conjunto de anúncios. Você pode definir `bidding_event` como `IMPRESSIONS` ou `THRUPLAY` para pagar por impressão ou por visualização do vídeo. Consulte [Anúncios com custo por ação](/docs/marketing-api/cost-per-action-ads).

```
v24.0
```

As taxas de custo por visualização são menores para conjuntos de anúncios com `optimization_goal=THRUPLAY` se comparadas a CPVs de compras por alcance e frequência otimizadas para visualizações de vídeo. A data final deve estar no futuro. Consulte a [Referência: Ad Set](/docs/marketing-api/reference/ad-campaign).

### Etapa 4: criar um [anúncio](/docs/reference/ads-api/adgroup)

Use o conjunto de anúncios e o criativo do anúncio existentes:

```
v24.0
```
  

Quando um objetivo da campanha for `VIDEO_VIEWS`, por padrão, o anúncio terá as [especificações de rastreamento](/docs/reference/ads-api/tracking-specs) adequadas que definem as ações rastreadas de um anúncio. Por exemplo, visualizações do vídeo:

```
{'action.type':'video_view','post':'POST_ID','post.wall':'PAGE_ID'}
```

Consulte [Minhas campanhas do Gerenciador de Anúncios](https://www.facebook.com/ads/manager/account/campaigns/) e a [referência Anúncio](/docs/marketing-api/adgroup).

#### Exemplo de reconhecimento da marca

Consulte o [blog de reconhecimento da marca](/ads/blog/post/2015/12/09/brand-awareness/) para criar um anúncio em vídeo para essa finalidade.

#### Exemplo de alcance e frequência

Para disponibilizar um vídeo a mais pessoas, use o objetivo da campanha de visualização do vídeo com [alcance e frequência](/docs/reference/ads-api/reachandfrequency). Você precisará criar uma previsão, reservá-la e atribuí-la ao seu conjunto de anúncios.

Siga a [criação da visualização do vídeo](#video_create), mas aplique alcance e frequência ao seu conjunto de anúncios. Especifique estes parâmetros adicionais:

```
-F "rf_prediction_id=<RESERVATION_ID>" \
```

[](#)

## Vídeo para resposta direta

Para incentivar as pessoas a mudar do reconhecimento à ação, consulte [Criativo do vídeo no formato de carrossel](/ads/blog/post/2015/10/21/video-creative-in-carousel/).

-   **Alcance pessoas que assistiram a um vídeo**. Do reconhecimento a afinidade e consideração. Consulte [Remarketing](#remarketing).
    
-   **Tenha engajamento com marcas e produtos**. Adicione uma chamada para ação para visitar uma página específica no seu site. Consulte [Chamada para ação](#call_to_action).
    

### Remarketing

O remarketing de anúncios em vídeo oferece suporte para os anunciantes direcionarem para determinados públicos personalizados de vídeos orgânicos ou pagos no Facebook e Instagram. Use este recurso para mover pessoas do reconhecimento para os objetivos da parte mais inferior do funil, como afinidade e consideração. Consulte a [pesquisa Combinações de criativos que funcionam](https://www.facebook.com/business/news/creative-ad-sequencing).

Você precisa de permissão de anunciante para a página que contém um vídeo para criar um público para esse vídeo.

Para o público, defina `subtype=ENGAGEMENT`. Então, defina as regras para o público que você deseja criar. Cada regra tem um `object_id`, por exemplo, ID de vídeo e `event_name`. O `event_name` será uma das seguintes opções:

-   `video_watched` – o número de vezes em que o vídeo foi visto por um agregado de no mínimo 3 segundos ou por quase toda sua duração (o que acontecer primeiro).
    
-   `video_completed` – o número de vezes nas quais o vídeo foi visto até a marca que corresponde a 95% da duração, inclusive visualizações em que as pessoas pularam até esse ponto.
    
-   `video_view_10s` – o número de vezes em que o vídeo foi visto por um agregado de no mínimo 10 segundos ou por quase toda sua duração (o que acontecer primeiro).
    
-   `video_view_15s` – o número de vezes em que o vídeo foi visto por um agregado de no mínimo 15 segundos ou por quase toda sua duração (o que acontecer primeiro).
    
-   `video_view_25_percent` – o número de vezes nas quais o vídeo foi visto até a marca que corresponde a 25% da duração, inclusive visualizações em que as pessoas pularam até esse ponto.
    
-   `video_view_50_percent` – o número de vezes nas quais o vídeo foi visto até a marca que corresponde a 50% da duração, inclusive visualizações em que as pessoas pularam até esse ponto.
    
-   `video_view_75_percent` – o número de vezes nas quais o vídeo foi visto até a marca que corresponde a 75% da duração, inclusive visualizações em que as pessoas pularam até esse ponto.
    

Você pode combinar vídeos para criar um público baseado em vários vídeos e ações. Por exemplo, um público pode conter visualizações de três segundos do vídeo A e visualizações completas do vídeo B e C.

Isso cria um público dos últimos 14 dias de espectadores que visualizaram o vídeo 1 por mais de 3 segundos, e os espectadores que visualizaram o vídeo 2 completamente. O público também será preenchido automaticamente com espectadores antes que ele seja criado com `prefill=true`.

```
v24.0
```

A veiculação secundária é compatível com visualizações do vídeo depois de 16 de outubro de 2015.

### Chamada para ação

Os vídeos com comandos interativos de chamada para ação (CTA) estimulam as pessoas a saber mais e a visitar uma página específica em um site. Melhore o desempenho quando seu objetivo principal for gerar visualizações do vídeo ou reconhecimento da marca e seu objetivo secundário for gerar cliques fora do site. Você deve usar um anúncio de link de vídeo para o último. Como as CTAs funcionam:

-   Para dispositivos móveis e desktop, é mostrada como parte do post. Quando o vídeo é pausado, é exibida ao lado da opção Retomar.
    
-   Para dispositivos móveis, quando alguém clica em um vídeo para assistir em tela cheia, uma CTA flutuante aparece como uma imagem sobreposta do vídeo.
    
-   Os posts de link de vídeo externo não exibem CTAs.
    

Você pode usar o vídeo com CTAs apenas com os seguintes objetivos de campanha:

-   `PAGE_LIKES`
    
-   [`LEAD_GENERATION`](/docs/marketing-api/guides/lead-ads/create#video)
    
-   [`LOCAL_AWARENESS`](/docs/marketing-api/guides/local-awareness)
    
-   `LINK_CLICKS`
    
-   `CONVERSIONS`
    
-   [`APP_INSTALLS`](/docs/marketing-api/mobile-app-ads/#create_video)
    
-   `VIDEO_VIEWS`
    
-   `BRAND_AWARENESS`
    
-   [Ad for Mobile App](/docs/app-ads/formats/ad-for-mobile-app)
    

Consulte [Expansão de vídeo para objetivos adicionais](/ads/blog/post/2015/04/09/expansion-video-objectives/). Isso cria um anúncio em vídeo com a chamada para ação `GET_DIRECTIONS`:

```
v24.0
```

[](#)

## Métricas de vídeo

### Insights de post de vídeo, Orgânico

Saiba mais sobre o desempenho dos seus vídeos no Facebook e tome decisões mais informadas sobre o conteúdo de vídeo. Atualmente, oferecemos métricas apenas quando alguém começa a assistir aos vídeos. Essas métricas incluem visualizações do vídeo, visualizações do vídeo únicas, a duração média da visualização do vídeo e a retenção do público. Veja em quais partes as pessoas desistem do vídeo e as partes que as pessoas acham mais interessantes.

### Insights do anúncio em vídeo, Pago

Use a [API de Insights sobre Anúncios](/docs/marketing-api/insights-api). A [resposta](/docs/marketing-api/reference/ads-insights/) contém diversas métricas de vídeo.

### Tipo de vídeo

Recupere as estatísticas do anúncio em vídeo agrupadas por tipo de vídeo, como reprodução automática e clique para reproduzir. Inclua `action_video_type` em `action_breakdowns`. Os valores esperados para `action_video_type` são `total`, `click_to_play` e `auto_play`.

**Estamos fazendo testes limitados com a opção `action_video_type` no momento.** Para identificar clientes com o detalhamento, verifique `CAN_USE_VIDEO_METRICS_BREAKDOWN` da [conta de anúncios](/docs/reference/ads-api/adaccount).

```
v24.0
```

A resposta inclui objetos com `action_type` como `video_view` e contém um `action_video_type` importante:

```
{
  "data": [
    {
      "actions": [
        ...
        {
          "action_type": "video_play", 
          "value": 9898
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "total", 
          "value": 921129
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "auto_play", 
          "value": 915971
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "click_to_play", 
          "value": 5158
        }
      ], 
      "video_avg_pct_watched_actions": [
        {
          "action_type": "video_view", 
          "action_video_type": "total", 
          "value": 60.59
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "auto_play", 
          "value": 60.47
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "click_to_play", 
          "value": 80.63
        }
      ], 
      "video_complete_watched_actions": [
        {
          "action_type": "video_view", 
          "action_video_type": "total", 
          "value": 156372
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "auto_play", 
          "value": 154015
        }, 
        {
          "action_type": "video_view", 
          "action_video_type": "click_to_play", 
          "value": 2357
        }
      ], 
      "date_start": "2014-12-26", 
      "date_stop": "2015-03-25"
    }
  ], 
  "paging": {
    "cursors": {
      "before": "MA==", 
      "after": "MA=="
    }
  }
}
```

Consulte [API de Insights](/docs/marketing-api/insights-api/getting-started).

[](#)

## Anúncios em carrossel

Obtenha mais espaço para o criativo no Feed e leve as pessoas para seu site ou app para celular a fim de converter. Crie um anúncio em carrossel de duas formas:

-   Criar um anúncio e um post sem exibição na Página em uma chamada – [API do Criativo do Anúncio](/docs/reference/ads-api/adcreative/)
    
-   Criar uma [post sem exibição na Página](/docs/reference/ads-api/unpublished-page-posts/) e um [criativo do anúncio](/docs/reference/ads-api/adcreative/) por meio do post (indisponível para carrossel de vídeo)
    

**Os anúncios em carrossel não são compatíveis com o Facebook Stories.**

### Criar em linha

Crie um post da Página de anúncio em carrossel enquanto elabora um criativo do anúncio. Especifique o conteúdo do post da Página em `object_story_spec`. Isso criará um post sem exibição na Página a partir de `adcreatives`. Consulte os [criativos do anúncio](/docs/reference/ads-api/adcreative#object_story_spec). Por exemplo:

```
v24.0
```

A resposta é um ID do criativo:

```
{"id":"<CREATIVE_ID>"}
```

### Criar o post e depois o anúncio

Crie um post sem exibição na Página. `child_attachments` é uma [matriz de objetos de link](#spec). Em cada objeto de link, `picture`, `name` e `description` são opcionais. Você pode publicá-los apenas pela Página com um token de acesso à Página.

```
v24.0
```

Em seguida, forneça um criativo do anúncio com o post sem exibição na Página. Use `id` para `object_story_id` no seu criativo do anúncio.

```
v24.0
```

### Criar anúncio em carrossel com vídeos

Os anúncios em carrossel com vídeos podem ter "legenda" no anexo secundário para personalizar o URL de exibição no final da tela:

```
"child_attachments": [
 {
   "link": "https://www.facebookmarketingdevelopers.com/",
   "name": "Facebook Marketing Developers",
   "description": "Facebook Marketing Developers",
   "call_to_action": {
     "type": "APPLY_NOW",
     "value": {
      "link_title": "Facebook Marketing Developers"
     }
   },
   "video_id": "123",
   "caption": "mycustomlinkcaption.com"
  },
]
```

Para ver detalhes sobre os anexos secundários, use o ID e faça uma chamada à [Graph API, Vídeo, Referência](https://developers.facebook.com/docs/graph-api/reference/video).

### Criar anúncio de app para celular

Limitações:

-   Os anúncios de app para celular em carrossel oferecem suporte a apenas um app
    
-   Um mínimo de três imagens, em comparação com as duas imagens nos anúncios em carrossel que não são de app
    
-   Os anúncios de app para celular em carrossel devem ter uma chamada para ação
    
-   O cartão final que normalmente exibe a foto do perfil da Página não será exibido para anúncios de app para celular em carrossel. É necessário especificar o mesmo link da loja de apps em cada `child_attachment`. Você não precisa especificar o link novamente em `call_to_action:{'value':{'link':... }}}`.
    

Por exemplo, para criar um anúncio em carrossel para instalação de app para celular:

```
v24.0
```
  

Você pode publicar apenas seu post como a Página do Facebook associada ao app para celular. Você precisa usar um token de acesso à Página.

```
v24.0
```

Use o `id` da resposta para criar AdCreative:

```
v24.0
```

[](#)

## Especificação de campo

Este é um anúncio em carrossel no iOS, mostrando como os campos descritos são usados.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/10173489_1444762775783056_1702831218_n.png?_nc_cat=100&ccb=1-7&_nc_sid=34156e&_nc_ohc=J9lbK4HxyCwQ7kNvwEcugLE&_nc_oc=AdnruLomVuKdNFn5cosbTIvDNEhEW6v8zy_tZ24mLkjWd0riK86StHdZM_QfV1GjlXkMKC94PCtXJrpum_qYYoXc&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=_zIf8_4NbwHk4uhPoqf4JA&oh=00_AfscuxnFI7eI-0rPkyiswnTxgYWaUSyZJvfhZzN6BWtg6Q&oe=6985489B)

Nome

Descrição

`child_attachments`

tipo: objeto

Uma matriz de objetos de link com 2 a 10 elementos exigidos para anúncios em carrossel. **Use pelo menos 3 objetos para obter um desempenho otimizado. O uso de 2 objetos serve para permitir integrações leves e pode causar resultados abaixo do esperado para a campanha.**

`child_attachments.link`

tipo: string

URL do link ou URL da loja de apps anexado ao post. Obrigatório.

`child_attachments.picture`

Tipo: URL

A imagem de prévia associada a esse link. Taxa de proporção 1:1 e um mínimo de 458 x 458 px para melhor exibição. É preciso especificar `picture` ou `image_hash`.

`child_attachments.image_hash`

tipo: string

Hash de uma imagem de prévia associada ao link da sua [biblioteca de imagens](/docs/reference/ads-api/adimage). Use a taxa de proporção 1:1 e um mínimo de 458 x 458 px para uma melhor exibição. É preciso especificar `picture` ou `image_hash`.

`child_attachments.name`

tipo: string

Título da prévia do link. Se não especificado, o título da página vinculada será usado. Normalmente truncado depois de 35 caracteres. Defina um `name` único, já que as **interfaces** do Facebook mostram ações relatadas por `name`.

`child_attachments.description`

tipo: string

Um preço, desconto ou domínio de site. Se não especificado, o conteúdo da página vinculada será extraído e usado. Normalmente truncado depois de 30 caracteres.

`child_attachments.call_to_action`

tipo: objeto

Chamada para ação opcional. Consulte [Chamada para ação](/docs/marketing-api/unpublished-page-posts/#cta-spec). Você não precisa especificar o link novamente em `call_to_action:{'value':{'link':... }}}`.

`child_attachments.video_id`

tipo: string

ID do [vídeo do anúncio](/docs/marketing-api/reference/ad-account/advideos). Pode ser usado em qualquer elemento secundário. Se especificado, será necessário definir `image_hash` ou `picture`.

`message`

tipo: string

Corpo principal do post, também chamado de mensagem de status.

`link`

tipo: string

URL de um link para “Ver mais”. Obrigatório.

`caption`

tipo: string

URL para exibir no link “Ver mais”. Não aplicável para anúncios de app móvel em carrossel

`multi_share_optimized`

tipo: booliano

Se for definido como `true`, as imagens e links serão selecionadas e ordenadas de forma automática. Caso contrário, use a ordem original dos elementos secundários. O padrão é `true`.

`multi_share_end_card`

tipo: booliano

Se for definido como `false`, o cartão final que exibe o ícone da página será removido. O padrão é `true`.

[](#)

## Estatísticas do anúncio por produto

Reúna ações para anúncios em carrossel por produto com `actions_breakdown=['action_carousel_card_id', 'action_carousel_card_name']`. Cada `child_attachment` tem um ID de cartão diferente. `action_carousel_card_id` e `action_carousel_card_name` só se aplicam a anúncios em carrossel.

Obtenha as seguintes estatísticas por cartão:

-   `website_ctr` – disponível ao especificar `fields=['website_ctr']`.
    
-   `app_install`, `app_use`, `apps.uses`, `credit_spent`, `mobile_app_install`, `tab_view`, `link_click`, `mobile_app_install`, `app_custom_event.*` e `offsite_conversion.*` – disponíveis ao especificar `fields=['actions']`. Outras ações não estão disponíveis com um detalhamento do cartão.
    

```
v24.0
```

Resposta:

```
{
...
   "website_ctr": [
      {
         "action_carousel_card_id": "1",
         "action_type": "link_click",
         "value": 51.401869158878
      },
      {
         "action_carousel_card_id": "2",
         "action_type": "link_click",
         "value": 50.980392156863
      }
   ],
   "placement": "mobile_feed",
   "date_start": "2015-05-25",
   "date_stop": "2015-05-28"
}
```

Também é possível solicitar `cost_per_action_type` para recuperar o detalhamento dos custos por tipo de ação:

```
v24.0
```

Modelo de resposta:

```
{
   "data": [
      {
         "impressions": "1862555",
         "campaign_name": "My Campaign",
         "cost_per_action_type": [
            {
               "action_carousel_card_name": "My Carousel Card 1",
               "action_type": "app_custom_event.fb_mobile_activate_app",
               "value": 0.093347346315861
            },
            {
               "action_carousel_card_name": "My Carousel Card 2",
               "action_type": "app_custom_event.fb_mobile_activate_app",
               "value": 0.38324089579301
            },
            ...
         ],
      }
   ]
}
```

-   As métricas de detalhamento de carrossel de `action_report_time=impression` são imprecisas para datas anteriores a 20 de junho de 2015.
    
-   As métricas de detalhamento de carrossel de `action_report_time=conversion` são imprecisas para datas anteriores a 20 de julho de 2015.
    

[](#)

## Posicionamentos

Se você selecionar somente `right_hand_column` como o posicionamento, poderá usar apenas um formato de carrossel ou de vídeo único no grupo de anúncios. Não há compatibilidade com o formato de vídeo se apenas um posicionamento `right_hand_column` for selecionado. Consulte [Direcionamento e posicionamento avançados](/docs/marketing-api/targeting-specs).

Por exemplo, crie um conjunto de anúncios em que `right_hand_column` é o único posicionamento:

```
v24.0
```

Forneça um criativo de anúncio com vídeo:

```
v24.0
```

Ou forneça um formato de anúncio do Canvas para o criativo do anúncio:

```
v24.0
```

Se você tentar criar um anúncio com o conjunto de anúncios e o criativo do anúncio:

```
v24.0
```

Caso você receba um código de erro, forneça um criativo compatível ou altere o direcionamento.

[](#)

## Veja também

-   [Guia de carregamento de vídeos no Facebook](/docs/graph-api/video-uploads)
    
-   [Carrossel para anúncios de app para celular](/ads/blog/post/2015/05/11/carousel-app-ads)
    
-   [Referência da Graph API para Feed de Página](/docs/graph-api/reference/page/feed)
    
-   [Posts sem exibição na Página](/docs/reference/ads-api/unpublished-page-posts)
    
-   [Criativos do anúncio](/docs/reference/ads-api/adcreative)
    
-   [Anúncios em carrossel do Instagram](/docs/marketing-api/guides/instagramads/#carousel)
    

[](#)