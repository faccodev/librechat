---
title: "Direcionamento de posicionamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/placement-targeting"
scraped_at: "2026-02-01T14:14:24.315Z"
---

# Direcionamento de posicionamento

Veicule anúncios em posicionamentos específicos, como apenas no feed do desktop ou do celular e nos vídeos com incentivo do Audience Network. **Dependendo do [objetivo da campanha](/docs/marketing-api/reference/ad-campaign-group), você só poderá usar algumas opções de posicionamento. Consulte [Campanha, objetivos e posicionamento](/docs/marketing-api/reference/ad-campaign-group#placement) para saber mais.**

As plataformas e as posições disponíveis são `device_platforms`, `publisher_platforms`, `facebook_positions`, `audience_network_positions`, `instagram_positions`, `threads_positions` e `messenger_positions`. Para mais informações, consulte a seção [Dispositivo, publisher e posições](#newplacement).

```
v24.0
```
  
  

Se você não especificar um determinado campo de posicionamento, o Facebook considerará **todas as posições-padrão possíveis** para esse campo. Por exemplo, se você selecionar `publisher_platforms` para `facebook`, mas não selecionar nada para `facebook_positions`, o Facebook considerará **todas as posições-padrão possíveis** do Facebook, como `feed`, `right_hand_column`, entre outras. Se você não selecionar uma opção de `publisher_platforms`, o Facebook considerará **todas as**`publisher_platforms`\-padrão. O Facebook também pode considerar automaticamente novas posições ou plataformas disponíveis.

No Audience Network, é possível limitar quais publishers exibem os anúncios. Exclua publishers por categoria ou crie uma lista customizada dos URLs da app store ou dos URLs de domínio que deseja remover.

Não é possível usar apenas `right_hand_column` como posicionamento para vídeo, coleção ou anúncios de canvas.

O filtro de inventário ajuda você a controlar se a publicidade será exibida ao lado de diferentes tipos anúncios no conteúdo (vídeos in-stream do Facebook, anúncios no Facebook Reels e anúncios no Instagram Reels), do Audience Network e de feed (Facebook, Instagram, Facebook Reels e Instagram Reels). Para saber mais sobre as categorias de conteúdo, consulte [Como usar o filtro de inventário no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/252190302162738?helpref=faq_content). Você pode escolher valores específicos para anúncios no conteúdo, do Audience Network e de feed. As opções incluem `Expanded`, `Moderate` e `Limited`. Para mais detalhes, veja `brand_safety_content_filter_levels` abaixo:

Nome

Descrição

`brand_safety_content_filter_levels`

matriz<string>

Para anúncios no conteúdo (in-stream do Facebook e anúncios no Facebook Reels), permitimos estes valores:

-   `EXPANDED`: `FACEBOOK_RELAXED`
    
-   `MODERATE`: `FACEBOOK_STANDARD`
    
-   `LIMITED`: `FACEBOOK_STRICT`
    

Permitimos os seguintes valores para o Audience Network:

-   `EXPANDED`: `AN_RELAXED`
    
-   `MODERATE`: `AN_STANDARD`
    
-   `LIMITED`: `AN_STRICT`
    

Para anúncios de feed (Facebook, Instagram, Facebook Reels e Instagram Reels), permitimos estes valores:

-   `EXPANDED`: `FEED_RELAXED`
    
-   `MODERATE`: `FEED_STANDARD`
    
-   `LIMITED`: `FEED_STRICT`
    

Exemplo: `"brand_safety_content_filter_levels":["FACEBOOK_STRICT", "AN_RELAXED"]`

**Observação:** quando um filtro é aplicado no nível da conta de anúncios, apenas opções mais restritivas ficam disponíveis no nível da campanha. Por exemplo, se a conta estiver definida como `MODERATE`, o usuário só poderá selecionar `MODERATE` ou `LIMITED` para uma campanha. Opções menos restritivas (neste exemplo, `EXPANDED`) não estarão disponíveis.

`excluded_publisher_categories`

matriz<string>

Inclui: `dating` e `gambling`

`excluded_publisher_list_ids`

matriz<strings numéricas>

Cada string é a identificação de uma lista de exclusões. Crie listas personalizadas no [Gerenciador de Anúncios](https://www.facebook.com/brand_safety/block_lists) ou na [API de Marketing, lista de bloqueio de publishers](/docs/marketing-api/reference/publisher-block-list).

  

**Exemplo:**  
`"excluded_publisher_list_ids":["{block_list_id_1}","{block_list_id_2}"]`

Por exemplo, usar `brand_safety_content_filter_levels`:

```
curl \
  -F 'name=My AdSet' \
  -F 'optimization_goal=REACH' \
  -F 'billing_event=IMPRESSIONS' \
  -F 'bid_amount=2' \
  -F 'daily_budget=1000' \
  -F 'campaign_id=CAMPAIGN_ID' \
  -F 'targeting= { "geo_locations":{"countries":["US"]}, "brand_safety_content_filter_levels":["FACEBOOK_STRICT","AN_STANDARD"]}' \
  -F 'status=ACTIVE' \
  -F 'access_token=ACCESS_TOKEN' \
  https://graph.facebook.com/VERSION/AD_ACCOUNT_ID/adsets
```

Para o Audience Network e o vídeo in-stream, também é possível excluir publishers por categoria:

Nome

Descrição

`excluded_publisher_categories`

matriz<string>

Inclui:

-   `debated_social_issues`
    
-   `mature_audiences`
    
-   `tragedy_and_conflict`
    

**Exemplo:**  
`"excluded_publisher_categories": ["debated_social_issues", "mature_audiences"]`

## Dispositivo, publisher e posições

Nome: opções

Descrição

`device_platforms`: `mobile` e `desktop`

**Opcional.**  
**Padrão**: todos  
Os tipos de dispositivos usados pela pessoa que vê o anúncio.

`publisher_platforms`: `facebook`, `instagram`, `threads`, `messenger` e `audience_network`

**Opcional.**  
**Padrão:** todos  
São os canais para publicação do anúncio. Configure a posição do canal de publicação em `facebook_positions`, `instagram_positions`, `threads_positions`, `audience_network_positions` ou `messenger_positions`.

**Observações:**

-   Se informado, o parâmetro `publisher_platforms` deve incluir `facebook` ou não fornecer o padrão para todas as posições.
    
-   Para veicular anúncios no Threads, inclua `instagram` e `threads` em `publisher_platforms` no seu conjunto de anúncios.
    

`facebook_positions`: `feed`, `right_hand_column`, `marketplace`, `video_feeds`, `story`, `search`, `instream_video`, `facebook_reels`, `facebook_reels_overlay`, `profile_feed` e `notification`

**Opcional.**  
**Padrão**: todos

  

**Observações:**

-   Se informado, o parâmetro `publisher_platforms` deve incluir `facebook` ou não fornecer o padrão para todos.
    
-   `feed` inclui o Feed do desktop e do celular.
    
-   Para campanhas direcionadas aos Estados Unidos (US), ao Reino Unido (GB), à França (FR), à Espanha (ES), à Alemanha (DE), ao México (MX), à Índia (IN) e à Tailândia (TH), use `instream_video` sem `feed` para os objetivos `VIDEO_VIEWS` e `POST_ENGAGEMENT`. O `instream_video` não é compatível com o objetivo `CONVERSIONS`.
    
-   Se você selecionar `story`, será necessário usar o `feed` do Facebook ou o `story` do Instagram e `device_platforms: mobile`, já que o Facebook Stories é exclusivo para dispositivos móveis.
    
-   Se você selecionar `marketplace`, `search`, `profile_feed` ou `notification`, será preciso usar `feed`.
    
-   A partir da versão 3.0, o parâmetro `right_hand_column` está disponível apenas para imagens ou vídeos únicos e formatos de carrossel com os objetivos `TRAFFIC`, `CONVERSIONS` e `PRODUCT_CATALOG_SALES`.
    

`instagram_positions`: `stream`, `story`, `explore`, `explore_home`, `reels`, `profile_feed`, `ig_search` e `profile_reels`

**Opcional.**  
**Padrão**: todos  
Você pode direcionar anúncios em carrossel do Instagram para `stream`, `story` ou `ig_search`. Se estiver usando um criativo em carrossel automático no Stories, não será possível selecionar ambas as opções para o mesmo conjunto de anúncios.  
Os anúncios que usam `story` serão exibidos nos feeds do Instagram na web para desktop e dispositivos móveis.

`threads_positions`: `threads_stream`

**Opcional.**  
Para usar o posicionamento `threads_stream` no Threads, selecione também o posicionamento `stream` no Instagram.

`audience_network_positions`: `classic` e `rewarded_video`

**Opcional.**  
**Padrão**: todos  
Por padrão, não retornamos `effective_audience_network_positions` ao ler as especificações de direcionamento de um conjunto de anúncios. Isso pode ser diferente do que foi configurado em `audience_network_positions`. Caso você especifique uma posição que não é compatível para um determinado objetivo, ela aparecerá na lista de posições configuradas, mas não na lista de posições eficazes.

`messenger_positions`: `sponsored_messages`, `story`

**Opcional.**  
**Padrão:**`story`

  

**Observações:**

-   Se você selecionar `story`, será necessário usar o `feed` do Facebook ou o `story` do Instagram e `device_platforms: mobile`, pois o Messenger Stories é exclusivo para dispositivos móveis. Use `story` para formatos de imagem e vídeo únicos em campanhas de anúncios com os objetivos `CONVERSIONS`, `TRAFFIC`, `REACH`, `BRAND_AWARENESS` e `APP_INSTALLS` de anúncios que direcionam o tráfego para sites e apps.
    
-   Você não pode usar `sponsored_messages` com outros posicionamentos, incluindo posicionamentos do Facebook.
    

### Lógica

-   A lógica para opções no mesmo parâmetro é `OR`.  
    Por exemplo, `publisher_platforms=['facebook','instagram']` significa veicular anúncio no Facebook e no Instagram.
    
-   A lógica entre parâmetros é `AND`.  
    Por exemplo, `publisher_platforms=['facebook']&device_platforms=['mobile']` significa veicular os anúncios apenas no Facebook para dispositivos móveis.
    
-   Se a lógica não apresentar resultados de direcionamento, como `publisher_platforms=['instagram']& device_platforms=['desktop']`, você verá um erro.
    

### Limitações

-   Você não pode usar o Audience Network sozinho, por isso, `publisher_platforms: audience_network` não pode ser selecionado sozinho.
    
-   O posicionamento `audience_network` com o objetivo `VIDEO_VIEWS` precisa ser usado com a meta de otimização `THRUPLAYS`.
    
-   Você não pode selecionar `story` para `facebook_positions` sozinho. Se você selecionar `story` para `facebook_positions`, será necessário selecionar também o `feed` do Facebook ou o `story` do Instagram.
    
-   Você não pode selecionar `story` para `messenger_positions` sozinho. Caso selecione `story` para `messenger_positions`, você também precisará selecionar o `feed` do Facebook ou o `story` do Instagram.
    
-   Você não pode selecionar somente `notification` para `facebook_positions`. Se você selecionar `notification` para `facebook_positions`, será necessário selecionar também `feed` do Facebook.
    
-   Os anúncios nos feeds do Instagram na web usam o posicionamento `stream`, e a elegibilidade deles é verificada para exibição em feeds da web para desktop e dispositivos móveis. Os objetivos compatíveis são `BRAND_AWARENESS`, `REACH`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `VIDEO_VIEWS` e `CONVERSIONS`.
    
-   Não é possível selecionar `threads_stream` para `threads_positions` isoladamente. Se você selecionar `threads_stream` para `threads_positions`, será preciso selecionar também `stream` do Instagram.
    

### Gastos limitados em posicionamentos excluídos

Se você usar controles de posicionamento para excluir posicionamentos específicos dos conjuntos de anúncios, poderá permitir que até 5% do seu gasto seja alocado a cada posicionamento excluído quando houver probabilidade de melhorar o desempenho.

#### Desativar com gastos limitados

Para desativar um posicionamento com gastos limitados, passe as posições de posicionamento desejadas com o campo `placement_soft_opt_out` ao criar ou atualizar um conjunto de anúncios.

As posições disponíveis são `facebook_positions`, `audience_network_positions`, `instagram_positions`, `threads_positions` e `messenger_positions`.

##### Exemplo de solicitação

```
"placement_soft_opt_out": { "facebook_positions": [ "marketplace", "profile_feed" ], "audience_network_positions": [ "classic", "rewarded_video" ] }
```

#### Recuperar as configurações de gastos limitados

Para ver quais posicionamentos têm um limite definido, consulte o campo `placement_soft_opt_out` de um conjunto de anúncios.

##### Exemplo de solicitação

```
v24.0
```

[](#)

## Exemplos

### Stories

Para usar o Facebook Stories como posicionamento:

```
curl \
  -F 'name=My Ad Set' 
  -F 'optimization_goal=CONVERSIONS' 
  -F 'billing_event=IMPRESSIONS' 
  -F 'bid_amount=2' 
  -F 'daily_budget=1000' 
  -F 'campaign_id=<AD_CAMPAIGN_ID>' 
  -F 'targeting={"geo_locations":{"countries":["US"]}, "publisher_platforms":["messenger", "facebook"], "facebook_positions":["story"], "messenger_positions":["story"]}' 
  -F 'status=ACTIVE'
  -F 'access_token=<ACCESS_TOKEN>' 
  https://graph.facebook.com/API_VERSION/act_AD_ACCOUNT_ID/adsets
```

### Vídeo in-stream

Para criar um conjunto de anúncios com apenas o posicionamento `instream_video` direcionado a um dos países da lista acima:

```
curl \
  -F 'name=My AdSet' \
  -F 'optimization_goal=REACH' \
  -F 'billing_event=IMPRESSIONS' \
  -F 'bid_amount=2' \
  -F 'daily_budget=1000' \
  -F 'campaign_id=CAMPAIGN_ID' \
  -F 'targeting={"geo_locations":{"countries":["US"]},"publisher_platforms":["facebook"], "facebook_positions":["instream_video"]}' \
  -F 'status=ACTIVE' \
  -F 'access_token=ACCESS_TOKEN' \
  https://graph.facebook.com/API_VERSION/act_AD_ACCOUNT_ID/adsets
```

### Audience Network

Para fazer o direcionamento do posicionamento dos vídeos de incentivo do Audience Network:

```
curl \
  -F 'name=My Ad Set' \
  -F 'optimization_goal=OFFSITE_CONVERSIONS' \
  -F 'billing_event=IMPRESSIONS' \
  -F 'is_autobid=true' \
  -F 'daily_budget=40000' \
  -F 'campaign_id=<AD_CAMPAIGN_ID>' \
  -F 'targeting={"app_install_state": "not_installed","geo_locations":{"countries":["US"]},"facebook_positions":["feed"],"device_platforms": ["mobile"],"audience_network_positions": ["classic","rewarded_video"],"user_device": ["Android_Smartphone","Android_Tablet"],"user_os": ["Android_ver_4.4_and_above"]}' \
  -F 'promoted_object={"application_id": "<APPLICATION_ID>","custom_event_type": "PURCHASE","object_store_url": "<OBJECT_STORE_URL>"}' \
  -F 'status=ACTIVE' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<APIVERSION>/<AD_ACCOUNT_ID>/adsets
```

Retorna:

```
{
  "targeting": {
    "audience_network_positions": [
      "classic",
      "rewarded_video"
    ],
    "effective_audience_network_positions": [
      "classic",
      "rewarded_video"
    ]
  },
  "id": "<AD_SET_ID>"
}
```

### Reels

Para usar o Facebook Reels como posicionamento:

```
curl \
  -F 'name=My AdSet' \
  -F 'optimization_goal=REACH' \
  -F 'billing_event=IMPRESSIONS' \
  -F 'bid_amount=2' \
  -F 'daily_budget=1000' \
  -F 'campaign_id=CAMPAIGN_ID' \
  -F 'targeting={"geo_locations":{"countries":["US"]},"publisher_platforms":["facebook"], "facebook_positions":["facebook_reels"]}' \
  -F 'status=ACTIVE' \
  -F 'access_token=ACCESS_TOKEN' \
  https://graph.facebook.com/API_VERSION/act_AD_ACCOUNT_ID/adsets
```

### Página inicial do Explorar do Instagram

Para criar um conjunto de anúncios com o posicionamento `explore_home` direcionado a um dos países compatíveis (por exemplo, "US"):

```
v24.0
```

### Resultados da pesquisa do Instagram

Para criar um conjunto de anúncios com o posicionamento `ig_search` direcionado a um dos países compatíveis (por exemplo, "US"):

```
v24.0
```

### Posicionamento de stream no Threads

```
v24.0
```

[](#)

## Posicionamento efetivo com direcionamento

Você cria conjuntos de anúncios com posicionamentos nas especificações de direcionamento. Entretanto, nem sempre você sabe se o Facebook veiculou o anúncio aos posicionamentos especificados. Isso ocorre porque a seleção de posicionamento talvez não se aplique ao objetivo de publicidade escolhido. Com a API de posicionamentos efetivos para direcionamento, você pode determinar em quais posicionamentos o anúncio será veiculado (considerando as opções de direcionamento) e receber mensagens de validação sobre por que alguns direcionamentos não estão sendo exibidos. Se você não fizer o direcionamento, ainda será possível determinar o posicionamento efetivo com base nas configurações dos conjuntos e das campanhas de anúncio.

Para ler um posicionamento efetivo com base no direcionamento, insira `effective_` antes do nome do campo de posicionamento. Por exemplo:

```
curl -G \
  -d "fields=targeting{effective_publisher_platforms,effective_facebook_positions,effective_device_platforms,effective_audience_network_positions,effective_instagram_positions}" \
  -d "access_token=<access_token>" \
  https://graph.facebook.com/<VERSION>/<AD_SET_ID>
```

Para ver por que alguns posicionamentos não são exibidos, use o campo `recommendation`:

```
curl -G \
  -d "fields=recommendations" \
  -d "access_token=<access_token>" \
  https://graph.facebook.com/<VERSION>/23842573364570019
```

Com os posicionamentos efetivos, você pode determinar quais deles o anúncio veiculará com base em `billing_event`, `optimization_goal` e `promoted_object` do seu conjunto de anúncios, bem como `buying_type` e `objective` da sua campanha de anúncios. Todos os parâmetros para `/ad_campaign_placement` incluem o seguinte:

-   `account_id` e token de acesso do anúncio
    
-   `billing_event`, como `IMPRESSIONS`
    
-   Tipo de compra, como `AUCTION`
    
-   Objetivo, como `POST_ENGAGEMENT`
    
-   Meta de otimização (opcional), como `POST_ENGAGEMENT`
    
-   Objeto promovido, como `PIXEL_ID`
    

Todos os parâmetros são obrigatórios, exceto `promoted_object` e `optimization_goal`. Se você fornecer o direcionamento, poderá usar a API de Marketing para determinar o posicionamento efetivo com base nos que são permitidos para suas configurações. Consulte [Posicionamento efetivo com direcionamento](/docs/marketing-api/targeting-specs#effective_placement). Por exemplo:

```
curl -G \
-d 'account_id=<ACCOUNT_ID>' \
-d 'billing_event=IMPRESSIONS' \
-d 'buying_type=AUCTION' \
-d 'objective=PAGE_LIKES' \
-d 'optimization_goal=IMPRESSIONS' \
https://graph.facebook.com/<VERSION>/ad_campaign_placement?access_token=<TOKEN>
```

A chamada retorna:

```
{
   "effective_device_platforms": [
      "mobile",
      "desktop"
   ],
   "effective_facebook_positions": [
      "feed",
      "right_hand_column"
   ],
   "effective_publisher_platforms": [
      "facebook"
   ],
   "recommendations": [
      {
         "title": "Placement Not Supported By Objective",
         "message": "Ads with PAGE_LIKES objective do not support facebook.instream_video, facebook.suggested_video, facebook.marketplace, audience_network.classic, audience_network.instream_video, audience_network.rewarded_video, instagram.stream, instagram.story",
         "code": 1815609,
         "importance": "LOW",
         "confidence": "HIGH",
         "blame_field": "targeting"
      },
      {
         "title": "Device Platform Not Supported By Objective",
         "message": "Ads with PAGE_LIKES objective do not support connected_tv.",
         "code": 1815610,
         "importance": "LOW",
         "confidence": "HIGH",
         "blame_field": "targeting"
      }
   ],     
   }
}
```

É possível usar o campo `code` desse resultado em uma chamada a `/ad-recommendation` para ver um motivo detalhado. Por exemplo, você pode consultar estas informações:

```
[{“code”: 1815610, “summary”: “Device Platform Not Supported By Objective”},]
```

Para mais informações, consulte as referências [Ad Recommendation](/docs/marketing-api/reference/ad-recommendation) e [Direcionamento avançado](/docs/marketing-api/targeting-specs#effective_placement).

[](#)