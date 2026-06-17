---
title: "Eventos de cobrança - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding-and-optimization/billing-events"
scraped_at: "2026-02-01T13:55:26.934Z"
---

# Eventos de cobrança

`billing_event` define eventos pelos quais você quer pagar (como impressões, cliques ou ações diversas). A cobrança depende do tamanho do público e do orçamento.

Por exemplo, para otimizar para `POST_ENGAGEMENT` e pagar por `IMPRESSIONS`:

```
v24.0
```

Ao selecionar `optimization_goal`, talvez você veja uma ou mais opções de `billing_event`. Consulte [Meta de otimização e eventos de cobrança](#opt_bids) e [CPA](/docs/marketing-api/cost-per-action-ads).

## Validação

### Tipo de compra e eventos de cobrança

`buying_type` é a forma pela qual o anunciante paga pela veiculação, definida no nível da [campanha](/docs/reference/ads-api/adcampaign). Na maioria das vezes, usamos apenas `AUCTION`. Porém, em casos especiais em que cobramos com base na previsão (conhecida como `RESERVED`) ou usamos um preço fixo como meio de negociação do custo que o anunciante pagará (conhecido como `FIXED_CPM`). As campanhas com `buying_type` exigem [conjuntos de anúncios](/docs/reference/ads-api/adset) com um `billing_event` definido.

`billing_event`s válidos para cada `buying_type`:

AUCTION

RESERVED

FIXED\_CPM

`IMPRESSIONS`

✓

✓

✓

`LINK_CLICKS`

✓

`PAGE_LIKES`

✓

`POST_ENGAGEMENT`

✓

`VIDEO_VIEWS`

✓

### Meta de otimização e eventos de cobrança

Para [campanhas](/docs/reference/ads-api/adcampaign) de `buying_type=AUCTION` com uma `optimization_goal` definida, restringimos qual `billing_event` você pode escolher para o [conjunto de anúncios](/docs/reference/ads-api/adset).

Nas restrições abaixo, presumimos que você especificou um `objective` no nível da [campanha](/docs/reference/ads-api/adcampaign).

\`optimization\_goal\`

"billing\_event" válido do conjunto de anúncios

`APP_INSTALLS`

`IMPRESSIONS`

`AD_RECALL_LIFT`

`IMPRESSIONS`

`ENGAGED_USERS`

`IMPRESSIONS`

`EVENT_RESPONSES`

`IMPRESSIONS`

`IMPRESSIONS`

`IMPRESSIONS`

`LEAD_GENERATION`

`IMPRESSIONS`

`LINK_CLICKS`

`LINK_CLICKS`, `IMPRESSIONS`

`OFFSITE_CONVERSIONS`

`IMPRESSIONS`

`PAGE_LIKES`

`IMPRESSIONS`

`POST_ENGAGEMENT`

`IMPRESSIONS`. A partir da versão 2.11, `POST_ENGAGEMENT` não está disponível.

`REACH`

`IMPRESSIONS`

`REPLIES`

`IMPRESSIONS`

`SOCIAL_IMPRESSIONS`

`IMPRESSIONS`

`THRUPLAY`

`IMPRESSIONS`, `THRUPLAY`

`TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

`IMPRESSIONS`, `TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

`IMPRESSIONS` e `VIDEO_VIEWS`

`VALUE`

`IMPRESSIONS`

`LANDING_PAGE_VIEWS`

`IMPRESSIONS`

[](#)