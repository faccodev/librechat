---
title: "Detalhamentos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights/action-breakdowns"
scraped_at: "2026-02-01T14:00:35.078Z"
---

# Detalhamentos da API de Insights

Agrupe os resultados da API de Insights em conjuntos diferentes usando detalhamentos.

A API de Insights pode retornar diversas métricas estimadas, em desenvolvimento ou ambas. Os valores do detalhamento de insights são estimados. Para obter mais informações, consulte [API de Insights, Métricas obsoletas e estimadas](/docs/marketing-api/insights/estimated-in-development).

## Limitações

### Campos indisponíveis

Os campos a seguir não podem ser solicitados na especificação de um detalhamento:

-   `app_store_clicks`
    
-   `newsfeed_avg_position`
    
-   `newsfeed_clicks`
    
-   `relevance_score`
    
-   `newsfeed_impressions`
    

### Restrições para métricas de ação fora da Meta

Os detalhamentos a seguir não estarão mais disponíveis para métricas de ação fora da Meta.

#### Tipo 1

-   `region`
    
-   `dma`
    
-   `hourly_stats_aggregated_by_audience_time_zone`
    
-   `hourly_stats_aggregated_by_advertiser_time_zone`
    

#### Tipo 2

-   `action_device`
    
-   `action_destination`
    
-   `action_target_id`
    
-   `product_id`
    
-   `action_carousel_card_id/action_carousel_card_name`
    
-   `action_canvas_component_name`
    

**Regras relacionadas a consultas que contêm os detalhamentos acima:**

-   **Tipo 1**: a API de Insights não retornará métricas fora do site incompatíveis (por exemplo, métricas de ação com detalhamentos do Tipo 1).
    
-   **Tipo 2**: as métricas da web fora do site continuarão a ser retornadas a partir da API, mas não conterão o valor de detalhamento. As métricas para dispositivos móveis não serão mais retornadas quando forem consultadas com os detalhamentos mencionados.
    

**Observação**: os detalhamentos listados acima ainda são compatíveis com métricas na Meta, como impressões, cliques no link, entre outras. As alterações não afetarão dados históricos anteriores a 27 de abril de 2021. Os detalhamentos desse tipo de dados continuarão disponíveis.

### Métricas de ação

As métricas não estarão disponíveis nas seguintes situações:

-   Quando houver uma tentativa de agregação em diversas configurações de atribuição.
    
-   Quando a solicitação incluir detalhamentos afetados. Essa restrição se aplica somente a tipos de ação e fora da Meta.
    

**Observação**: as métricas estarão disponíveis se a consulta for feita com `action_attribution_windows=1d_click,7d_click,1d_view,incrementality` (sem incluir a janela-padrão).

[](#)

## Detalhamentos genéricos

Os seguintes detalhamentos estão disponíveis:

Detalhamento

Descrição

`action_device`

O dispositivo no qual o evento de conversão que você está rastreando ocorreu. Por exemplo, \\"Desktop\\" se a conversão tiver sido feita em um desktop.

`action_canvas_component_name`

O nome de um componente em um anúncio do Canvas.

`action_carousel_card_id`

O ID do cartão do carrossel específico com o qual as pessoas se engajaram quando viram seu anúncio.

`action_carousel_card_name`

O cartão do carrossel específico com o qual as pessoas se engajaram quando viram seu anúncio. Os cartões são identificados pelos respectivos cabeçalhos.

`action_destination`

O destino das pessoas após clicarem no seu anúncio. Pode ser sua Página do Facebook, uma URL externa para seu pixel de conversão ou um app configurado com o kit de desenvolvimento de software (SDK, pelas iniciais em inglês).

`action_reaction`

O número de reações aos seus anúncios ou posts turbinados. O botão de reações em um anúncio permite que as pessoas reajam ao conteúdo com uma das seguintes opções: Curtida, Amei, Haha, Uau, Triste ou Grr.

`action_target_id`

O ID do destino das pessoas após clicarem no seu anúncio. Pode ser a sua Página do Facebook, uma URL externa para o seu pixel de conversão ou um app configurado com o kit de desenvolvimento de software (SDK, pelas iniciais em inglês).

`action_type`

O tipo de ação realizada quanto ao anúncio, à Página, ao app ou ao evento depois que o anúncio foi exibido a alguém, mesmo que essa pessoa não tenha clicado nele. Os tipos de ação incluem curtidas na Página, instalações do app, conversões, participações no evento e muito mais.

`action_video_sound`

O status do som (ligado/desligado) quando alguém reproduzir seu anúncio de vídeo.

`action_video_type`

Detalhamento das métricas de vídeo.

`ad_format_asset`

O número de identificação do ativo de formato do anúncio envolvido na impressão, no clique ou na ação

`age`

A faixa etária das pessoas que você alcançou.

`app_id`

O ID do app associado à campanha ou à conta de anúncios solicitada. As informações do app (incluindo o ID) podem ser visualizadas no [Painel de Apps](https://developers.facebook.com/apps/).

  

Esse detalhamento só é compatível com o campo `total_postbacks`.

`body_asset`

O ID do ativo de corpo envolvido na impressão, no clique ou na ação.

`call_to_action_asset`

O ID do ativo de chamada para ação envolvido na impressão, no clique ou na ação.

`country`

O país onde estão as pessoas que você alcançou. Isso se baseia em informações como cidade natal, cidade atual e localização geográfica de onde a pessoa geralmente visita a Meta.

`description_asset`

O ID do ativo de descrição envolvido na impressão, no clique ou na ação.

`device_platform`

O tipo de dispositivo, seja móvel ou desktop, usado pelas pessoas ao visualizar ou clicar em um anúncio, conforme exibido nos relatórios de anúncios.

`dma`

Regiões Designated Marketing Area (DMA) são as 210 áreas geográficas dos Estados Unidos em que a exibição da televisão local é mensurada pela The Nielsen Company.

`frequency_value`

O número de vezes que um anúncio da sua campanha de alcance e frequência foi exibido a cada conta da Central de Contas.

`gender`

O gênero das pessoas que você alcançou. As pessoas que não informarem um gênero serão exibidas na categoria "não especificado".

`hourly_stats_aggregated_by_advertiser_time_zone`

O detalhamento por hora agregado pelo horário em que os anúncios foram veiculados no fuso horário do anunciante. Por exemplo, se estiverem programados para veiculação das 9h às 11h, mas alcançarem públicos em diversos fusos horários, os anúncios poderão ser veiculados das 9h às 13h no fuso horário do anunciante. As estatísticas serão reunidas em quatro grupos: das 9h às 10h, das 10h às 11h, das 11h às 12h e das 12h às 13h.

`hourly_stats_aggregated_by_audience_time_zone`

O detalhamento por hora agregado pelo horário em que os anúncios foram veiculados no fuso horário dos públicos. Por exemplo, se estiverem programados para veiculação das 9h às 11h, mas alcançarem públicos em diversos fusos horários, os anúncios poderão ser veiculados das 9h às 13h no fuso horário do anunciante. As estatísticas serão reunidas em dois grupos: das 9h às 10h e das 10h às 11h.

`image_asset`

O ID do ativo de imagem envolvido na impressão, no clique ou na ação.

`impression_device`

O dispositivo no qual seu último anúncio foi exibido a alguém na Meta. Por exemplo, \\"iPhone\\" se alguém tiver visto o anúncio em um iPhone.

`is_conversion_id_modeled`

Uma sinalização em booliano que indica se os `conversion_bits` são modelados. `0` indica que `conversion_bits` não são modelados, e `1` indica que `conversion_bits` são modelados.

  

Esse detalhamento só é compatível com o campo `total_postbacks_detailed`.

`link_url_asset`

O ID do ativo de URL envolvido na impressão, no clique ou na ação.

`place_page_id`

A identificação da página do local envolvida na impressão ou clique.

  

Os insights no nível da conta e a `page_place_id` não são compatíveis entre si. Por isso, não podem ser consultados juntos.

`platform_position`

A posição na qual seu anúncio foi exibido em uma plataforma, por exemplo, no Feed do desktop no Facebook ou no Feed do celular no Instagram.

`product_id`

O ID do produto envolvido na impressão, no clique ou na ação.

`publisher_platform`

A plataforma na qual seu anúncio foi exibido, por exemplo, Facebook, Instagram ou Audience Network.

`region`

As regiões onde estão as pessoas que você alcançou. Isso se baseia em informações como cidade natal, cidade atual e localização geográfica de onde a pessoa geralmente visita o Facebook.

`skan_campaign_id`

A identificação da campanha bruta recebida como parte do postback da Skan no iOS 15 ou em versões posteriores.

  

**Observação**: esse detalhamento só é compatível com o campo `total_postbacks_detailed`.

`skan_conversion_id`

O número de identificação de conversão atribuído (também chamado de identificação de prioridade) do evento e/ou do pacote de eventos configurado no esquema de configuração da SKAdNetwork do aplicativo. É possível visualizar e ajustar a configuração de eventos do app no Gerenciador de Eventos da Meta. Saiba mais sobre como configurar os eventos do app para a SKAdNetwork da Apple [aqui](https://www.facebook.com/business/help/670955636925518).

  

**Observação**: esse detalhamento só é compatível com o campo `total_postbacks`.

`title_asset`

O ID do ativo de título envolvido na impressão, no clique ou na ação.

`user_segment_key`

Segmentação do usuário (por exemplo, novo ou existente) de Campanhas de Compras Advantage+. O usuário existente é especificado pelo público personalizado nas configurações das campanhas.

`video_asset`

O ID do ativo de vídeo envolvido na impressão, no clique ou na ação.

**Observações**

-   No momento, não há compatibilidade com a filtragem de `app_id` e `skan_conversion_id` usando o campo `filtering`.
    
-   O detalhamento `dma` não está disponível para as métricas `estimated_ad_recall_rate` e `video_thruplay_watched_actions`.
    
-   O detalhamento `dma` aplica uma metodologia de amostragem para computar métricas únicas como alcance. Quando houver um grande número de regiões DMA com volumes baixos, talvez elas não sejam representadas na amostra ou dimensionadas em potência de 2. Por isso, recomendamos consultar as impressões correspondentes para melhorar a precisão.
    
-   `frequency_value` é usado somente com `reach`. Por exemplo, com que frequência determinado usuário visualizou um anúncio.
    
-   Os detalhamentos `image_asset` e `video_asset` não estão disponíveis no nível da conta de anúncios para ativos usados no [criativo dinâmico](/docs/marketing-api/asset-feed).
    
-   As [ações de anúncio](/docs/marketing-api/reference/ads-action-stats/)`video_p25_watched_actions`, `video_p50_watched_actions`, `video_p75_watched_actions`, `video_p95_watched_actions` e `video_p100_watched_actions` não são compatíveis com o detalhamento `region`.
    
-   Os detalhamentos de ativos de criativo dinâmico aceitam somente um conjunto limitado de métricas:
    

Detalhamentos de criativo dinâmico

Métricas compatíveis com os detalhamentos de criativo dinâmico

-   `ad_format_asset`
    
-   `body_asset`
    
-   `call_to_action_asset`
    
-   `description_asset`
    
-   `image_asset`
    
-   `link_url_asset`
    
-   `title_asset`
    
-   `video_asset`
    

-   `impressions`
    
-   `clicks`
    
-   `spend`
    
-   `reach`
    
-   `actions`
    
-   `action_values`
    

A chamada a seguir agrupa os resultados por `age` e `gender`.

cURL

```
curl -G \
  -d "breakdowns=age,gender" \
  -d "fields=impressions" \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<AD_CAMPAIGN_ID>/insights"
```

Mostrar resposta

[](#)

## Detalhamento por hora

As estatísticas por hora agora são um detalhamento disponível usando o seguinte detalhamento:

-   `hourly_stats_aggregated_by_advertiser_time_zone`
    
-   `hourly_stats_aggregated_by_audience_time_zone`
    

Consulte [Como combinar detalhamentos](#combiningbreakdowns) para ver os limites de solicitações com o detalhamento por hora. O detalhamento por hora não é compatível com campos únicos, isto é, que têm os prefixos `unique_*`, `reach` ou `frequency`. Os campos `reach` e `frequency` retornarão 0 quando os detalhamentos por hora forem usados.

cURL

```
curl -G \
-d "fields=impressions" \
-d "breakdowns=hourly_stats_aggregated_by_audience_time_zone" \
-d "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_CAMPAIGN_ID>/insights"
```

Mostrar resposta

[](#)

## Detalhamento por ação

Agrupe resultados no campo `actions`. Os detalhamentos a seguir podem ser usados com `action_breakdowns`:

Os detalhamentos a seguir podem ser fornecidos no campo `action_breakdowns`.

-   `action_device`
    
-   `conversion_destination`
    
-   `matched_persona_id`
    
-   `matched_persona_name`
    
-   `signal_source_bucket`
    
-   `standard_event_content_type`
    
-   `action_canvas_component_name`
    
-   `action_carousel_card_id`
    
-   `action_carousel_card_name`
    
-   `action_destination`
    
-   `action_reaction`
    
-   `action_target_id`
    
-   `action_type`
    
-   `action_video_sound`
    
-   `action_video_type`
    
-   `is_business_ai_assisted`
    

Se o parâmetro `action_breakdowns` não for especificado, `action_type` será adicionado de forma implícita como `action_breakdowns`.

[](#)

## Contagem total em `actions`

A contagem total (soma) de todos os valores retornados nos resultados do grupo (`actions`).

O resultado pode não ser igual a `total_actions`, pois os campos retornados em `actions` são hierárquicos e incluem ações detalhadas que não foram contabilizadas.

```
total_actions - 33
    page_engagement - 10
        post_engagement - 10
            link_click - 2
            comment - 3
            post_reaction - 3
            like - 2
    mobile_app_install - 12
    app_custom_event - 11
        app_custom_event.fb_mobile_activate_app - 6
        app_custom_event.other - 5
```

Neste exemplo, `post_engagement` é a soma de `link_click`, `comment`, `like` e `post_reaction`, sendo `post_reaction` a contagem de todas as reações, inclusive curtidas. O campo `total_actions` representa a soma de ações de nível superior para um objeto, como `page_engagement`, `mobile_app_install` e `app_custom_event`.

[](#)

## Como combinar detalhamentos

Devido a restrições de armazenamento, apenas algumas alterações de detalhamento estão disponíveis. **As alterações marcadas com um asterisco (\*) poderão ser agrupadas com `action_type`, `action_target_id` e `action_destination`, que é o nome de `action_target_id`.**

Alteração

`action_converted_product_id` – disponibilidade limitada para Anúncios Colaborativos.

`action_type` \*

`action_type, action_converted_product_id` – disponibilidade limitada para Anúncios Colaborativos.

`action_target_id` \*

`action_device *`

`action_device, impression_device` \*

`action_device, publisher_platform` \*

`action_device, publisher_platform, impression_device` \*

`action_device, publisher_platform, platform_position` \*

`action_device, publisher_platform, platform_position, impression_device` \*

`action_reaction`

`action_type, action_reaction`

`age` \*

`gender` \*

`age, gender` \*

`app_id, skan_conversion_id`

`country` \*

`region` \*

`publisher_platform` \*

`publisher_platform, impression_device` \*

`publisher_platform, platform_position` \*

`publisher_platform, platform_position, impression_device` \*

`product_id` \*

`hourly_stats_aggregated_by_advertiser_time_zone` \*

`hourly_stats_aggregated_by_audience_time_zone` \*

`action_carousel_card_id / action_carousel_card_name`

`action_carousel_card_id / action_carousel_card_name`

`action_carousel_card_id / action_carousel_card_name, impression_device`

`action_carousel_card_id / action_carousel_card_name, country`

`action_carousel_card_id / action_carousel_card_name, age`

`action_carousel_card_id / action_carousel_card_name, gender`

`action_carousel_card_id / action_carousel_card_name, age, gender`

### Limitações

-   Os campos `video_*` não podem ser solicitados com detalhamentos de estatísticas por hora.
    
-   O campo `video_avg_time_watched_actions` não pode ser solicitado com o detalhamento por região.
    
-   `action_type` será adicionado de forma implícita como `action_breakdowns` quando o parâmetro `action_breakdowns` não for especificado.
    

[](#)