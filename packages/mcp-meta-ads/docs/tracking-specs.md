---
title: "Especificações de rastreamento e de conversão - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/tracking-specs"
scraped_at: "2026-02-01T13:59:43.319Z"
---

# Especificações de rastreamento e de conversão

`Tracking Specs` são usadas principalmente para monitoramento e relatórios. Essas especificações definem que ações do usuário que vê ou clica em um anúncio podem ser monitoradas e ajudam os anunciantes a entender como os usuários interagem com o conteúdo do anúncio e verificar se estão sendo geradas conversões fora do site, instalações de app ou outras ações importantes. As especificações de rastreamento não influenciam diretamente a otimização da veiculação do anúncio, mas são essenciais para coletar dados sobre a interação dos usuários.

`Conversion specs` são usadas para definir as condições para considerar uma conversão (uma ação do usuário desejada) como relacionada ao anúncio. Essas especificações são fundamentais para atribuir conversões a anúncios específicos e para otimizar o desempenho dos anúncios e são usadas no processo de otimização da veiculação de um anúncio, em que o sistema prevê e aumenta as taxas de conversão. As `Conversion_specs` são **somente leitura** desde a versão 2.4. O valor é extraído de `optimization_goal` do [conjunto de anúncios](/docs/marketing-api/reference/ad-campaign).

## Definir especificações de rastreamento

Use com qualquer combinação de tipo de lance e [criativo](/docs/reference/ads-api/creative-specs/). Para determinar especificações de rastreamento, você precisa de um campo adicional no [anúncio](/docs/reference/ads-api/adgroup/) com o nome de `tracking_specs`. O campo `tracking_specs` usa argumentos idênticos à [especificação de ação](/docs/marketing-api/reference/conversion-action-query/). Para criar um anúncio, consulte [Criação de anúncio](/docs/reference/ads-api/adgroup/).

[](#)

## Especificações de rastreamento padrão

Há um conjunto de especificações de rastreamento padrão para determinadas combinações de objetivo, bid\_type e criativo. Ao adicionar novas especificações de rastreamento, as especificações padrão continuarão disponíveis e não serão substituídas. No entanto, para os objetivos `APP_INSTALLS` e `OUTCOME_ENGAGEMENT`, **as especificações de rastreamento padrão serão substituídas**. Para usar o padrão, você precisa adicioná-los às especificações personalizadas.

Você pode usar notações de string ou matriz na especificação, como `'APPLICATION_ID'` ou `['APPLICATION_ID']`.

-   CPM se refere a `billing_event=IMPRESSIONS` e `optimization_goal=IMPRESSIONS`
    
-   CPC se refere a `billing_event=CLICKS` e `optimization_goal=CLICKS`
    
-   oCPM se refere a `billing_event=IMPRESSIONS` e `optimization_goal` definidos como uma ação
    
-   CPA se refere a `billing_event` e `optimization_goal` definidos como uma ação
    

Objetivo

Criativo e tipo de lance

Especificação de rastreamento

Descrição

CANVAS\_APP\_  
ENGAGEMENT

Anúncios de engajamento do app Canvas com `optimization_goal= APP_INSTALLS`

\[{'action.type':  
'app\_engagement',  
'application':  
'APPLICATION\_ID'}, {'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}\]

Consulte as [metaespecificações](#meta) app\_engagement e post\_engagement.

CANVAS\_APP\_  
INSTALLS

Anúncios de instalação do app Canvas em que a otimização **não** foi definida como `optimization_goal= APP_INSTALLS`

\[{'action.type':  
'app\_engagement',  
'application':  
'APPLICATION\_ID'}, {'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}\]

Consulte as [metaespecificações](#meta) app\_engagement e post\_engagement.

CONVERSIONS

Anúncios com link ou com foto em post da Página que contam com `promoted_object` definido como uma identificação do pixel e com `optimization_goal= OFFSITE_CONVERSIONS`

{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'},  
{'action.type':'like',  
'page':PAGE\_ID}

Especificações de curtida e de engajamento com o post da Página. Refere-se ao número de cliques no link em um post específico da Página se houver somente um link, à quantidade de engajamentos com o post e ao número de stories gerados ou de engajamentos de usuários com uma página.

CONVERSIONS

Anúncios com link ou com foto em post da Página em que a otimização **não** foi definida como `optimization_goal= OFFSITE_CONVERSIONS`

{'action.type':  
'offsite\_conversion',  
'fb\_pixel':  
'FACEBOOK\_PIXEL\_ID'}, {'action.type':{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'},  
{'action.type':'like',  
'page':PAGE\_ID}

Especificações de conversão, de curtida e de engajamento com o post da Página. Refere-se ao número de cliques no link em um post específico da Página se houver somente um link, à quantidade de engajamentos com o post e ao número de stories gerados ou de engajamentos de usuários com uma página.

CONVERSIONS

Anúncios de domínio que contam com `promoted_object` definido como uma identificação do pixel e com `optimization_goal= OFFSITE_CONVERSIONS`

{'action.type':  
'link\_click',  
'object':'PAGE\_ID'}, {'action.type':'like',  
'page':PAGE\_ID}

Especificações de curtidas na Página e de cliques no link. Refere-se ao número de cliques no link em um post específico da Página, se houver somente um link, à quantidade de engajamentos no post e ao número de stories gerados ou de engajamentos de usuários com uma Página.

CONVERSIONS

Anúncios de domínio em que a otimização **não** foi definida como `optimization_goal= OFFSITE_CONVERSIONS`

{'action.type':  
'offsite\_conversion',  
'fb\_pixel':  
'FACEBOOK\_PIXEL\_ID'}, {'action.type':  
'link\_click',  
'object':'PAGE\_ID'}, {'action.type':'like',  
'page':PAGE\_ID}

Especificações de conversão, de curtidas na Página e de cliques no link. Refere-se ao número de cliques no link em um post específico da Página, se houver somente um link, à quantidade de engajamentos no post e ao número de stories gerados ou de engajamentos de usuários com uma Página.

EVENT\_RESPONSES

Anúncios de evento em que a otimização **não** foi definida como `optimization_goal= EVENT_RESPONSES`

\[{'action.type':'rsvp' ,  
'response':'yes', 'event':'EVENT\_ID'},  
{'action.type':'rsvp' ,  
'response':'maybe', 'event':'EVENT\_ID'},  
\[{'action.type':'rsvp' ,  
'response':'no', 'event':'EVENT\_ID'}\]

O número de respostas aos convites de um evento (sim, talvez ou não).

EVENT\_RESPONSES

Anúncios de evento com `optimization_goal= EVENT_RESPONSES`

Campo vazio (a especificação de conversão incluirá as ações rastreadas)

O número de respostas aos convites de um evento (sim, talvez ou não).

LINK\_CLICKS

Anúncios com link ou com foto em post da Página com qualquer opção de lance

{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}

Engajamento com o post.  
Refere-se ao número de cliques nos links de um URL externa ou de um domínio de URL específico, bem como aos cliques nos links externos em uma Página ou um post.

LINK\_CLICKS

Anúncios de domínio com `optimization_goal= LINK_CLICKS`

{'action.type':'like',  
'page':PAGE\_ID}\]

Curtidas na Página.  
Refere-se ao número de cliques nos links de um URL externo ou de um domínio de URL específico, bem como aos cliques nos links externos em uma Página ou um post.

LINK\_CLICKS

Anúncios de domínio em que a otimização **não** foi definida como `optimization_goal= LINK_CLICKS`

{'action.type':  
'link\_click',  
'object':'PAGE\_ID'}, {'action.type':'like',  
'page':PAGE\_ID}

Cliques no site e curtidas na Página.  
Refere-se ao número de cliques nos links de um URL externo ou de um domínio de URL específico, bem como aos cliques nos links externos em uma Página ou um post.

MOBILE\_APP\_  
ENGAGEMENT

Anúncios de engajamento de app para celular com qualquer opção de lance

{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}  
**Para anúncios de engajamento de app, é necessário indicar explicitamente uma especificação de rastreamento por meio do ID do app do Facebook:**  
\[{'action.type': 'mobile\_app\_install', 'application': 'APP\_ID'}, {'action.type':  
'app\_custom\_event',  
'application':APP\_ID}\]

Consulte a [metaespecificação](#meta) post\_engagement. Além disso, refere-se ao número de ocorrências de um [evento do app](/docs/ios/app-events/).

MOBILE\_APP\_  
INSTALLS

Anúncios de instalação de app para celular com qualquer opção de lance

{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}  
**Para anúncios de instalação do app, é necessário indicar explicitamente uma especificação de rastreamento por meio do ID do app do Facebook:**  
\[{'action.type':  
'app\_custom\_event',  
'application':APP\_ID}, {'action.type': 'mobile\_app\_install', 'application': 'APP\_ID'}\]

Consulte a [metaespecificação](#meta) post\_engagement. Além disso, refere-se ao número de instalações feitas por usuários por meio de um [anúncio de instalação de app para celular](/docs/reference/ads-api/mobile-app-ads/), se houver versão para iOS/Android, e à quantidade de ocorrências de um [evento do app](/docs/ios/app-events/).

NONE

Qualquer tipo de anúncio

Veja as [especificações-padrão  
de rastreamento por tipo de anúncio](/docs/reference/ads-api/tracking-specs/#default_by_ad).

PAGE\_LIKES

Anúncios de curtida ou de post da Página com qualquer opção de lance

{'action.type':  
'page\_engagement', 'page':'PAGE\_ID'}

Consulte a [metaespecificação](#meta) de engajamento da Página.

POST\_ENGAGEMENT

Anúncios de post da Página em que a otimização **não** foi definida como `optimization_goal= POST_ENGAGEMENT`

{'action.type':  
'post\_engagement',  
'post':'POST\_ID', 'page':'PAGE\_ID'}

Consulte a [metaespecificação](#meta) de engajamento com o post da Página.

POST\_ENGAGEMENT

Anúncios de post da Página com `optimization_goal= POST_ENGAGEMENT`

vazio

Consulte a [metaespecificação](#meta) de engajamento com o post da Página.

POST\_ENGAGEMENT (em testes)

Qualquer um

{'action.type':  
'dwell',  
'post':'POST\_ID', 'page':'PAGE\_ID'}

Uma parcela pequena desse tipo de anúncio conta com o tipo de rastreamento `dwell`, com foco nos usuários que passam determinado tempo mínimo nos anúncios.

PRODUCT\_ CATALOG\_SALES

[Anúncios dinâmicos de produtos](/docs/marketing-api/dynamic-product-ads)

{'action.type': 'post\_engagement', 'page': PAGE\_ID, 'post': POST\_ID}

Refere-se ao número de cliques no link em um post específico da Página se houver somente um link, à quantidade de engajamentos com o post e ao número de stories gerados ou de engajamentos de usuários com uma página. É possível especificar um conjunto de produtos diferente daquele que está no objeto promovido. Contudo, o conjunto especificado no objeto promovido é o padrão.

[](#)

## Metaespecificações

É possível determinar diversos tipos de ações em um objeto por meio de uma única especificação.

Objeto

Especificação de conversão

Descrição

App

{"action.type":\["app\_engagement"\], "application":\["APPLICATION\_ID"\]}

Refere-se ao número de stories `app_story` gerados e de engajamentos de usuários com o conteúdo via app\_use, app\_install e credit\_spent.

Página

{"action.type":\["page\_engagement"\], "page":\["PAGE\_ID"\]}

Refere-se ao número de vezes que os usuários realizaram alguma das ações a seguir no contexto da Página especificada: fazer check-in, comentar, seguir, curtir, curtir post da Página, mencionar, postar na Página, compartilhar post e responder pergunta. Inclui também as seguintes ações no contexto da Página especificada: clicar em um link, visualizar uma foto e reproduzir um vídeo nativo do FB.

Post da Página

{"action.type":\["post\_engagement"\], "post":\["POST\_ID"\], "page":\["PAGE\_ID"\]}

Refere-se ao número de vezes que os usuários realizaram as ações a seguir no contexto do post especificado: comentar, seguir pergunta, curtir, compartilhar e responder pergunta. Inclui também as seguintes ações de usuários: clicar em link, curtir Página, visualizar foto, reproduzir vídeo hospedado no Facebook ou iniciar reprodução de vídeo inline do Youtube. Use link\_click para vídeos não incorporados.

[](#)

## Especificações de rastreamento personalizadas

Para criar suas próprias especificações de rastreamento, use a estrutura da especificação de ação. Consulte a [Referência de especificações de ação](/docs/marketing-api/reference/conversion-action-query/).

Ação (tipos de objeto)

Descrição e detalhes da especificação de rastreamento

Especificação de rastreamento ou de conversão

app\_custom\_event (app)

Evento personalizado em um app.  
Refere-se ao número de eventos personalizados em um app para celular.

{'action.type':  
'app\_custom\_event',  
'application':APP\_ID}

app\_install (app)

Instalar um app.  
Refere-se ao número de instalações  
no Canvas ou no app para celular.

\[{'action.type':'app\_install',  
'application':APP\_ID},  
{'action.type':  
'mobile\_app\_install',  
'application':APP\_ID}\]

app\_use (app)

Refere-se ao número de vezes que um app foi usado.

{'action.type':'app\_use',  
'application':APP\_ID}

checkin (local)

Fazer check-in em um local.  
Refere-se ao número de check-ins no local ou em qualquer derivado da Página.

{'action.type':'checkin',  
'page': PAGE\_ID},  
{'action.type':'checkin',  
'page.parent:PAGE\_ID}

comment (post)

Comentar em um post.  
Refere-se ao número de comentários em um post específico ou em qualquer post da Página.

{'action.type':'comment',  
'post.wall':PAGE\_ID},  
{'action.type':'comment',  
'post':POST\_ID,  
'post.wall':PAGE\_ID}

credit\_spend (app)

Refere-se aos gastos de crédito em um app.

'action.type':'credit\_spent',  
'application':APP\_ID}

follow (pergunta)

Assinar um objeto.  
Refere-se ao número de respostas ou de seguidas a uma pergunta.

{'action.type':'vote', 'question':QUESTION\_ID, 'question.creator':PAGE\_ID}, {'action.type':'follow', 'question':QUESTION\_ID, 'question.creator':PAGE\_ID}

leadgen\_quality\_conversion (pixel)

Eventos de conversão de lead do funil inferior (CRM).

{'action.type': 'leadgen\_quality\_conversion', 'fb\_pixel': 'FACEBOOK\_PIXEL\_ID'}, {'action.type': 'leadgen\_quality\_conversion', 'dataset': 'OFFLINE\_EVENT\_SET\_ID'}

like  
(Página ou post)

Curtir um objeto.  
Refere-se ao número de curtidas em uma Página ou post.

{'action.type':'like',  
'page':PAGE\_ID}  
, {'action.type':'like',  
'post.wall':PAGE\_ID}  
, {'action.type':'like',  
'post':POST\_ID,  
'post.wall':PAGE\_ID}

link\_click (Página, post, URL ou domínio de URL)

Clicar em um link.  
Refere-se ao número de cliques nos links de um URL externo ou de um domínio de URL específico, bem como aos cliques nos links externos em uma Página ou post.

{'action.type':\['link\_click'\],  
'object':\['PAGE\_ID'\]},  
{'action.type':\['link\_click'\],  
'object.domain':  
\['URL\_DOMAIN'\]},  
{'action.type':\['link\_click'\],  
'post.wall':\['PAGE\_ID'\]},  
{'action.type':\['link\_click'\],  
'post':\['POST\_ID'\],  
'post.wall':\['PAGE\_ID'\]}

mention (Página)

Mencionar uma Página.  
Refere-se ao número de menções de uma Página.

{'action.type':'mention',  
'object':PAGE\_ID'}

offsite\_conversion (pixel)

Refere-se ao número de conversões externas e de receitas acumuladas.

{'action.type':  
'offsite\_conversion',  
'fb\_pixel':  
'FACEBOOK\_PIXEL\_ID'}

photo\_view (Página)

Visualizar uma foto.  
Refere-se ao número de visualizações de foto,  
video\_plays ou link\_clicks das fotos/vídeos/compartilhamentos de links de um post qualquer ou específico de uma Página.

{'action.type':'photo\_view', 'post.wall':PAGE\_ID}  
{'action.type':'photo\_view', 'post':POST\_ID,  
'post.wall':PAGE\_ID}

post (post)

Compartilhar um story.  
Refere-se ao número de posts de usuários em uma Página.

{'action.type':'post',  
'post.wall':PAGE\_ID}

receive\_offer (oferta)

Obter uma oferta.  
Refere-se ao número de pessoas que obtiveram uma oferta específica.

{'action.type':'receive\_offer',  
'offer':OFFER\_ID}

rsvp (evento)

Responder ao convite de um evento.  
Refere-se ao número de respostas (sim e talvez) a um evento. Os valores válidos são `yes`, `maybe` e `no`.

{'action.type':'rsvp',  
'event': EVENT\_ID},

{'action.type':'rsvp',  
'response':'yes',  
'event': EVENT\_ID},

{'action.type':'rsvp',  
'response':'no',  
'event': EVENT\_ID},  
{'action.type':'rsvp',  
'response':'maybe',  
'event': EVENT\_ID}

tab\_view (Página)

Visualizar uma aba da Página.  
Refere-se ao número de visualizações de uma aba de Página específica. Especifique uma Página para obter as visualizações de todas as abas.

{'action.type':'tab\_view',  
'page.tab.name':  
'PAGE\_TAB\_NAME', 'page':PAGE\_ID},  
{'action.type':'tab\_view',  
'page':PAGE\_ID}

video\_play (post)

Assistir a um vídeo.  
Refere-se ao número de visualizações de um post de vídeo qualquer ou específico de uma Página.

{'action.type':'video\_play', 'post.wall':PAGE\_ID},{'action.type':'video\_play', 'post':POST\_ID,  
'post.wall':PAGE\_ID}

[](#)

## Exemplos

### Rastreamento de pixel

Para rastrear o desempenho de pixels diferentes em um anúncio, especifique o pixel de rastreamento no campo [tracking\_specs](/docs/reference/ads-api/tracking-specs/) do anúncio. Por exemplo:

```
tracking_specs="[
  {'action.type':'offsite_conversion','fb_pixel':1},
  {'action.type':'offsite_conversion','fb_pixel':2},
  {'action.type':'offsite_conversion','fb_pixel':3}
]"
```

Isso rastreia o desempenho dos pixels "1", "2" e "3". Se quiser otimizar somente o pixel “1”, defina o `promoted_object` do conjunto de anúncios principal. Isso é útil para otimizar `CHECKOUT` e, ao mesmo tempo, rastrear o número de `REGISTRATION` e `ADD_TO_CART`.

_Ao especificar a identificação do pixel em `promoted_object`, os pixels otimizados serão rastreados automaticamente. Dessa forma, não será necessário especificar esse pixel em `tracking_specs`._

[](#)

## Como usar especificações de conversão

`conversion_specs` é um campo para o [anúncio](/docs/reference/ads-api/adgroup/). Ele segue o formato `{'action.type':'{ACTION}', ... }`, em que cada ação se aplica a um objeto. Veja a seguir exemplos de especificações de conversão para diversos tipos de anúncio:

Tipo de anúncio

Especificação de conversão

Anúncio de domínio com contexto social

{'action.type':'link\_click', 'object':'PAGE\_ID'}

Anúncio de curtida na Página

{'action.type':'like', 'page':PAGE\_ID}

Anúncio com link para o post da Página

{'action.type':\['link\_click'\], 'post': \[POST\_ID\], 'post.wall':\[PAGE\_ID\]}

Todos os outros anúncios de post da Página

{'action.type':'post\_engagement', 'post':'POST\_ID', 'page':'PAGE\_ID'}

Anúncio de evento

{'action.type':'rsvp' , 'response':'yes', 'event':'EVENT\_ID'}

Anúncio de oferta

{'action.type':'receive\_offer', 'offer':OFFER\_ID, 'offer.creator':PAGE\_ID}

Anúncio de instalação de app para celular

Não se aplica – não é possível criar esse tipo de anúncio com um objetivo NONE

Anúncios de engajamento de app para celular

Não se aplica – somente tipos de lance de CPC e de CPM são compatíveis

Anúncio de instalação do app Canvas

Não se aplica – não é possível criar esse tipo de anúncio com um objetivo NONE

Anúncio de engajamento do app Canvas

Não se aplica – não é possível criar esse tipo de anúncio com um objetivo NONE

Algumas especificações de conversão contêm diversas ações que se aplicam a um único objeto. Elas são chamadas de _metaespecificações_. Veja exemplos a seguir:

Objeto

Especificação de conversão

Descrição

Página

{"action.type":\["page\_engagement"\], "page":\["PAGE\_ID"\]}

Refere-se ao número de vezes que alguém realiza as ações a seguir em uma Página específica: fazer check-in, comentar, seguir, curtir, curtir post da Página, mencionar, postar na Página, compartilhar post e responder pergunta. Inclui também as seguintes ações em uma Página específica: visualizar foto e reproduzir vídeo nativo do Facebook.

Post da Página

{"action.type":\["post\_engagement"\], "post":\["POST\_ID"\], "page":\["PAGE\_ID"\]}

Refere-se ao número de vezes que alguém realiza uma das ações a seguir em um post específico: comentar, seguir pergunta, curtir, compartilhar, obter oferta e responder pergunta. Inclui também as ações a seguir: clicar em link, curtir Página, visualizar foto, reproduzir vídeo hospedado no Facebook ou iniciar reprodução de vídeo inline do Youtube. Use `link_click` para vídeos não incorporados.

App

{"action.type":\["app\_engagement"\], "application":\["APPLICATION\_ID"\]}

Refere-se ao número de stories `app_story` gerados ou de engajamentos com o conteúdo como `app_use`, `app_install` ou `credit_spent`.

[](#)