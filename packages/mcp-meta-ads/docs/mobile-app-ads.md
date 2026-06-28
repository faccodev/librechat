---
title: "Anúncios no App - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/mobile-app-ads"
scraped_at: "2026-02-01T13:52:43.415Z"
---

# Anúncios de app

Este documento descreve várias unidades de anúncio desenvolvidas para impulsionar mais instalações e engajamento com apps para celular e computador.

Use essa unidade de anúncio se quiser atrair pessoas ao seu app para computador ou celular para fins de instalação ou engajamento via foto, vídeo, [carrossel](/docs/marketing-api/guides/multi-product-ads) ou [criativos interativos](https://www.facebook.com/business/help/412951382532338).

Em termos conceituais, isso possibilita os seguintes anúncios:

Foto

Vídeo

Carrossel

Interativos

Anúncio de instalação de app para celular

✓

✓

✓

✓

Anúncio de engajamento de app para celular

✓

✓

✓

Anúncio de instalação para desktop

✓

✓

✓

Anúncio de engajamento para desktop

✓

✓

✓

Anúncios de app para desktop de mercadorias virtuais

✓

✓

✓

Os anúncios de app para desktop de mercadorias virtuais são um subconjunto do engajamento para desktop. Você pode usar ofertas de mercadorias virtuais para retomar o engajamento e convencer os pagantes a usar o app novamente. Por exemplo, um app pode oferecer desconto em um item ou um conjunto da moeda no app em um feed para envolver novamente os antigos clientes. Veja como configurar o app para aceitar pagamentos [aqui](/docs/payments/ads_virtual_goods).

Para sua referência, a unidade com a imagem de instalação no app para celular é assim:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/10173499_632629106829903_1423280175_n.png?_nc_cat=103&ccb=1-7&_nc_sid=34156e&_nc_ohc=kffIKOkn-EwQ7kNvwF3CzG1&_nc_oc=Adk9Lxlun0sp4HWePYePpJr37T8yjfi78_ppAj0VlcPeDpHyrOur_sKczREXyNypeupcXohdGJc-WKrjrOlR0F4a&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Lcz6RSvTjkVV3kjIXM-Jig&oh=00_AfutzbPZQguJD-th8I2QYDDftu5Hj8iF_fCQWcv_GLs2HQ&oe=6985322F)

O anúncio de app para desktop de mercadorias virtuais com imagem é assim:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/10333116_299934286850158_552026368_n.png?_nc_cat=105&ccb=1-7&_nc_sid=34156e&_nc_ohc=KgdENfAFfqMQ7kNvwEkzlB_&_nc_oc=AdnqQZfRmbaJZIWEix6_N2_A_7oeXDJMALDMxAAoRkEcfnOPOUim7uNM1EtOje6423_GM4fN_7vJ_aD2f_W0oTZe&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Lcz6RSvTjkVV3kjIXM-Jig&oh=00_AfsKv6Yr3QGa2RkfG0rxPFOhLtV5VtsDEMfi3iOVvjnMGQ&oe=69853E0B)

### Pré-requisitos

-   Para criar um anúncio de app, o desenvolvedor deverá concluir as etapas deste [tutorial](/docs/tutorials/mobile-app-ads/).
    
-   O anunciante deve ter uma Página do Facebook por meio da qual veiculará esses anúncios.
    

## Criar

Ao [criar](#create) o anúncio, observe os seguintes requisitos:

-   O objetivo da [campanha](/docs/marketing-api/adcampaign) deve ser `APP_INSTALLS`, `LINK_CLICKS` ou `CONVERSIONS`.
    
-   O [objeto promovido do conjunto de anúncios](/docs/marketing-api/adset/#promoted_object) deve ser definido.
    
-   [Direcionamento](/docs/marketing-api/targeting-specs).
    
-   Para anúncios de app para celular, é obrigatório usar o campo [`user_os` da especificação de direcionamento móvel](/docs/reference/ads-api/targeting-specs/#mobile). O [posicionamento](/docs/marketing-api/targeting-specs/#placement) deve ter um campo `device_platforms` com o valor \["`mobile`"\] e recomendar o uso dos outros campos da especificação para fazer o direcionamento de dispositivos móveis no Facebook. Opcionalmente, se quiser usar somente certas plataformas, você poderá especificar `publisher_platforms`.
    
-   Para anúncios de app de canvas, `device_platforms` deve ser `desktop`. Opcionalmente, será possível especificar `facebook_positions` se você não quiser o Feed nem a coluna do lado direito do Facebook para desktop.
    
-   Em caso de uso de `GET_OFFER` para mercadorias virtuais, deverá haver desconto no preço. Consulte a documentação sobre [mercadorias virtuais](/docs/payments/ads_virtual_goods) para saber mais.
    

### Chamadas para ação de anúncio de app:

As chamadas para ação adicionais listadas abaixo estão disponíveis para anúncios de app no campo `call_to_action` de um [post](/docs/graph-api/reference/page/feed) ou na [`object_story_spec` de um criativo do anúncio](/docs/marketing-api/adcreative/#object_story_spec). Você também pode especificar o deep link do app para celular no campo `app_link` ou o objeto de mercadoria virtual do app para computador no campo `product_link`.

Chave

Valor

Obrigatório

tipo

Tipos de chamada para ação de dispositivos móveis independentemente de instalação ou de engajamento:  
`SHOP_NOW`  
`BOOK_TRAVEL`  
`LEARN_MORE`  
`SIGN_UP`  
`DOWNLOAD`  
`INSTALL_MOBILE_APP`  
`USE_MOBILE_APP`  
`WATCH_VIDEO`  
`WATCH_MORE`  
`OPEN_LINK`  
Tipos de chamada para ação de instalação ou engajamento para computador:  
`USE_APP` (apps para computador)  
`PLAY_GAME` (apps de jogos para desktop)  
Tipos de chamada para ação para anúncios de app para desktop de mercadorias virtuais:  
`BUY_NOW`  
`GET_OFFER`

sim

valor

Dicionário JSON de `{"link": "<APP_STORE_LINK>",``"app_link": "<MOBILE_DEEP_LINK>",``"product_link": "<VIRTUAL_GOOD_DEEP_LINK>",``"link_title": "<NAME_FOR_LINK>"}`

sim

-   Apenas alguns valores são obrigatórios.
    

value.link

Faz referência a App Store, Google Play Store ou URL do app Canvas do Facebook, por exemplo: https://itunes.apple.com/br/app/facebook/id284882215

sim

value.app\_link

Definir o destino do [deep link](/docs/ads-for-apps/mobile-app-ads#deep-linking) somente para apps para celular, por exemplo, `myapp://product/12345`. Para especificar um deep link de apps para computador, determine-o diretamente no campo de link de URL.

Sim, apenas para anúncios de engajamento ou de instalação de app para celular.

value.product\_link

Para definir a URL que aponta para o objeto da mercadoria virtual Open Graph do produto. Saiba mais sobre os detalhes da configuração [aqui](/docs/payments/ads_virtual_goods).

Sim, somente para mercadorias virtuais para desktop.

value.link\_title

Permite personalizar o nome do link, que será exibido sob a imagem do anúncio.

não

#### Especificação de campos

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/10333117_1471965196378293_403106758_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=nWLAT8LdzNQQ7kNvwF12urC&_nc_oc=Adk7KhkaavJ4Sqn7k4_QNJbL6k_JVoABoqKgYN_M4NHVYZWGjAq_A54BgYlgUl8iyRSNN2sAH20r79b40qyxkfO7&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Lcz6RSvTjkVV3kjIXM-Jig&oh=00_AfulsXFpaLV_nU5dO69vSlxU84zaPOV5nYmpsAECAORnfA&oe=69852698)

### Criar com foto

Para criar um anúncio de app para celular ou desktop com uma foto, primeiro faça um post de link na Página com uma foto por meio do campo [`object_story_spec: {'link_data': ...}` do criativo do anúncio](/docs/marketing-api/adcreative/#object_story_spec).

**Exemplo:**

```
v24.0
```

Como alternativa, você pode criar o post da Página por meio do [ponto de extremidade do feed](/docs/graph-api/reference/page/feed) da Página e usar a identificação do post no criativo. Consulte abaixo a seção [Exemplos](#examples) para saber mais.

### Criar com carrossel

Para criar um anúncio de instalação do app para celular ou um anúncio de engajamento por meio do formato de anúncio em carrossel, siga as instruções nos [documentos sobre anúncios em carrossel](/docs/marketing-api/guides/multi-product-ads), mas especifique um link da loja de apps em cada campo `link` de `child_attachments`.

#### Considerações

-   No momento, os anúncios de app para celular em carrossel são compatíveis somente com um app.
    
-   Número mínimo de 3 imagens (em comparação com 2 nos anúncios em carrossel que não são de app).
    
-   Anúncios de app para celular em carrossel devem ter uma chamada para ação definida.
    
-   O cartão final (que normalmente mostra a foto de perfil da Página) não será exibido para anúncios de app para celular em carrossel.
    

É necessário especificar o mesmo link da loja de apps em cada `child_attachment`. Você não precisa especificar o link novamente em `call_to_action:{'value':{'link':... }}}`.

```
v24.0
```

### Criar com vídeo

Para criar um anúncio de app com um vídeo, primeiro carregue o vídeo em questão na [biblioteca de vídeos da conta de anúncios](/docs/marketing-api/advideo). Depois, use o ID do vídeo no campo [`object_story_spec: {'video_data':...}` do criativo do anúncio](/docs/marketing-api/adcreative/#object_story_spec).

**Exemplo:**

```
v24.0
```

Como alternativa, você pode criar o post por meio do [ponto de extremidade de vídeo](/docs/graph-api/reference/video) da Página e usar o ID do vídeo no criativo. Consulte abaixo a seção [Exemplos](#examples) para saber mais.

[](#)

## Ler

Para recuperar detalhes sobre seu post da Página, consulte os [documentos sobre post de link na Página](/docs/graph-api/reference/link) ou [post de vídeo na Página](/docs/graph-api/reference/video).

Você pode listar todos os posts da borda [`/promotable_posts`](/docs/graph-api/reference/page/feed/) da Página.

```
v24.0
```

Para recuperar detalhes do seu criativo do anúncio, consulte a [documentação sobre criativos do anúncio.](/docs/reference/ads-api/adcreative#read)

[](#)

## Mensuração de apps para celular

[Consulte a documentação principal dos anúncios de app.](/docs/app-ads/measuring-your-app-ad)

[](#)

## Deep links

### Antes de começar

-   Configure o app para que ele [aceite deep links](/docs/ads-for-apps/mobile-app-ads#deep-linking).
    
-   A [permissão `pages_manage_ads`](/docs/pages/overview#permissions).
    
-   Um token de acesso à Página solicitado por uma pessoa que possa executar a [tarefa `ADVERTISE`](/docs/pages/overview#tasks) na Página.
    
-   O [link do app](/docs/applinks/), se houver compatibilidade com esse tipo de link.
    

#### Exemplo de código

```
"call_to_action={ 'type':'LEARN_MORE', 'value':{ 'link':'https://itunes.apple.com/us/app/facebook/id284882215', 'app_link':'facebook://path/to/page' } }"
```

Antes de especificar um link de app, é necessário confirmar se ele foi extraído. Para isso, faça a chamada a seguir:

```
v24.0
```

[](#)

## Insights sobre o app para celular

Os insights são aplicados somente a anúncios com um [objeto promovido](/docs/marketing-api/adset/#promoted_object) que contenha o ID do app. Para obter esse ID, [inscreva](/docs/tutorials/mobile-app-ads) o app no Facebook.

A Meta fornecerá insights diários agregados sobre os dados demográficos das pessoas que instalaram o app. Para recuperar esses dados, use um token de acesso ao app e faça uma consulta

```
v24.0
```

Também é possível detalhar as estatísticas ao especificar um parâmetro adicional de URL, `breakdown`, equivalente a um dos valores a seguir. No momento, não é possível combinar detalhamentos.

Nome

Descrição

`gender_age`

Detalhe suas estatísticas sobre idade e gênero do público.

`country`

Detalhe suas estatísticas sobre o país do público.

`locale`

Detalhe suas estatísticas sobre a localidade do público.

**Exemplos:**

```
v24.0
```

[](#)

## Exemplos

### Criar um anúncio de imagem para instalação do app para celular

Etapa 1: crie o post da Página com a imagem. Lembre-se de que é necessário usar o `PAGE_ACCESS_TOKEN` e a sessão de API da Página para criar um post.

```
v24.0
```

Etapa 2: desenvolva o criativo do anúncio (`{STORY_ID}` está como `'{PAGE_ID}_{POST_ID}'`).

```
v24.0
```

Etapa 3: use o criativo em um anúncio.

```
v24.0
```

### Criar um anúncio de imagem para app para celular com um deep link, otimizando-o para cliques e pagando por impressões

Etapa 1: crie o post da Página com a imagem. Lembre-se de que é necessário usar o `PAGE_ACCESS_TOKEN` e a sessão de API da Página para criar um post.

```
v24.0
```

Etapa 2: desenvolva o criativo do anúncio.

```
v24.0
```

Etapa 3: defina os lances no conjunto de anúncios, otimizando para cliques e pagando por impressões.

```
v24.0
```

Etapa 4: use o criativo em um anúncio.

```
v24.0
```

### Criar um anúncio de imagem de engajamento com o app para celular com um [link de app](https://l.facebook.com/l.php?u=http%3A%2F%2Fapplinks.org%2F&h=AT0J2Sc1N_HgWhfIiAj_IC-O3XkCYxicbACGKfiX9hBHKLxEKES2aku-6LBrKLsmXYU-DloJu97bsV9CM5zRC2P5496gUeBKiaJqQ6X1eXM9rLR0y7tBXeMOQDiI-RwmWAsETdRPIOtwiSndXQSpRkjWP_IMeGHEmhGAM5QAAXU), otimizando para eventos do app e pagando por impressões

Etapa 1: crie o post da Página com a imagem. Lembre-se de que é necessário usar o `PAGE_ACCESS_TOKEN` e a sessão de API de Páginas para criar um post.

```
v24.0
```

Etapa 2: desenvolva o criativo do anúncio.

```
v24.0
```

Etapa 3: defina os lances no conjunto de anúncios, otimizando para obter mais eventos do app e pagando por impressões.

Observe que também é necessário definir o `promoted_object` do conjunto de anúncios para incluir um `custom_event_type` para a otimização. Consulte os [documentos sobre conjuntos de anúncios](/docs/marketing-api/reference/ad-campaign) para saber mais.

```
v24.0
```

Etapa 4: use o criativo em um anúncio.

```
v24.0
```

### Exemplos de anúncios de post da Página

Lembre-se de que é necessário usar o `PAGE_ACCESS_TOKEN` e a sessão de API de Páginas para criar um post.

### Criar um anúncio de vídeo para instalação do app para celular

```
v24.0
```

### Criar um anúncio de vídeo para apps para celular com um deep link

```
v24.0
```

### Criar um anúncio de vídeo para instalação do app para computador

```
v24.0
```

### Criar anúncios de app para computador para anúncio de imagem de mercadorias virtuais

```
v24.0
```

### Criar anúncios de app para computador para um anúncio de vídeo de mercadorias virtuais

```
v24.0
```

### Criar anúncios de app com objetivos Reconhecimento

Para fornecer tratamento universal de link para o objetivo Reconhecimento, é possível incluir o ID do app em `creative.template_url_spec`. Caso ele não seja fornecido, o anúncio levará os usuários para seu site.

```
v24.0
```

### Criar anúncios estáticos com o comportamento de app fallback da web do objetivo Tráfego

Quando um app é selecionado em um conjunto de anúncios, esta será a alteração em `object_story_spec` depois que o fallback da web for adicionado.

```
v24.0
```

Se o fallback precisar ser uma loja, forneça o respectivo URL no campo `link`. Se o fallback precisar ser um site, forneça o valor `object_store_urls` como uma lista com apenas um valor — o URL da loja de apps do app — e o campo `link` com o URL de fallback do site.

[](#)

## Anúncios de catálogo Advantage+ para instalação do app para celular

Os [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/) podem incentivar pessoas a instalar seu app para celular. Dessa forma, você pode redirecionar anúncios de instalação de app para celular às pessoas de acordo com o comportamento dos usuários.

Etapa 1: crie uma campanha para seu catálogo de produtos.

```
v24.0
```

Etapa 2: crie um conjunto de anúncios para um conjunto de produtos específico do catálogo de produtos acima.

```
v24.0
```

Etapa 3: desenvolva o criativo dos anúncios de catálogo Advantage+ usando o modelo.

```
v24.0
```

Etapa 4: use o criativo do anúncio acima em um anúncio.

```
v24.0
```

[](#)

## Carregar o arquivo HTML interativo na conta de anúncios

```
v24.0
```

-   `name`: nome que diferencia o ativo dos outros anúncios interativos na conta de anúncios, por exemplo, `{ad_name}` -> `{playable_asset_name}`
    
-   `source`: caminho absoluto do arquivo na sua máquina local.
    
-   `access_token`: pode ser gerado no [Explorador da Graph API](https://developers.facebook.com/tools/explorer/).
    
-   Você também pode usar um número de identificação do ativo interativo na conta de anúncios.
    

#### Metatag em arquivo HTML interativo

É possível adicionar duas tags de metadados ao seu arquivo HTML 5 interativo. Isso permite que a Meta atribua ao seu app o elemento interativo nos anúncios.

```
... <head> ... <meta name="ref-application-id" content="<YOUR_APP_ID>"><meta name="ref-asset-id" content="<YOUR_ASSET_ID>"> ... </head> ...
```

-   Forneça a identificação do app da Meta e a metatag do número de identificação do ativo no arquivo HTML interativo. Isso ajuda a Meta a fornecer insights precisos sobre o ativo quando ele aparecer no seu anúncio.
    
-   O número de identificação do ativo identifica esse elemento interativo no seu sistema.
    

#### Criar anúncios na conta de anúncios

-   Configure posicionamentos no Feed do Facebook. Apenas vídeo com incentivo e intersticial do Audience Network. Entre em contato com seu parceiro da Meta para obter mais informações.
    
-   O criativo só pode ser um vídeo com taxa de proporção >= 1.
    
-   Configurar o orçamento e a programação
    
-   Gere o criativo interativo na API:
    

```
v24.0
```

-   Crie o anúncio na API:
    

```
v24.0
```

[](#)

## Otimização de eventos do app

[Consulte a documentação sobre otimização de eventos do app para Anúncios no App](/docs/app-ads/optimizing-your-app-ad#app-events-opt-via-api).

### Otimização de valor

[Consulte a documentação sobre otimização de valor para Anúncios no App](/docs/app-ads/optimizing-your-app-ad#value-optimization).

[](#)

## Saiba mais

-   [Anúncios de app no Facebook](/docs/app-ads/creating-ads)
    
-   [Anúncios de engajamento no app para celular](/docs/app-ads/formats/engagement-ads)
    
-   [Anúncios do app para computador](/docs/ads-for-apps/installs-desktop)
    
-   [Deep linking dos apps para celular](/docs/app-ads/deep-linking)
    
-   [Audience Network](/docs/reference/ads-api/audience-network)
    

[](#)