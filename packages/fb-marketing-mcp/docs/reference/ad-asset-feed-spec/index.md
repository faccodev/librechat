---
title: "Graph API Referência v24.0: Ad Asset Feed Spec"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec/"
scraped_at: "2026-02-01T14:16:55.880Z"
---

Versão Graph API

[v24.0](#)

# Ad Asset Feed Spec

[](#)

## Leitura

Asset feed spec including specs of different ad assets, formats and call to actions

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`ad_formats`

list<enum>

Ad format spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`additional_data`

[AdAssetFeedAdditionalData](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-additional-data/)

Additional data for the asset feed

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`app_product_page_id`

string

Custom Product Page / Custom Store Listing ID for App Install ads. **Note**: Do not put the full URL into the field. Put only the ID.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`asset_customization_rules`

[list<AdAssetFeedSpecAssetCustomizationRule>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-asset-customization-rule/)

Target rules spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`audios`

list<AdAssetAudios>

The audio asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`autotranslate`

list<string>

List of auto translated languages

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`bodies`

[list<AdAssetFeedSpecBody>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-body/)

Ad body asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`call_ads_configuration`

AdAssetCallAdsConfigurationFeedSpec

call\_ads\_configuration

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`call_to_action_types`

list<enum {OPEN\_LINK, LIKE\_PAGE, SHOP\_NOW, PLAY\_GAME, INSTALL\_APP, USE\_APP, CALL, CALL\_ME, VIDEO\_CALL, INSTALL\_MOBILE\_APP, USE\_MOBILE\_APP, MOBILE\_DOWNLOAD, BOOK\_TRAVEL, LISTEN\_MUSIC, WATCH\_VIDEO, LEARN\_MORE, SIGN\_UP, DOWNLOAD, WATCH\_MORE, NO\_BUTTON, VISIT\_PAGES\_FEED, CALL\_NOW, APPLY\_NOW, CONTACT, BUY\_NOW, GET\_OFFER, GET\_OFFER\_VIEW, BUY\_TICKETS, UPDATE\_APP, GET\_DIRECTIONS, BUY, SEND\_UPDATES, MESSAGE\_PAGE, DONATE, SUBSCRIBE, SAY\_THANKS, SELL\_NOW, SHARE, DONATE\_NOW, GET\_QUOTE, CONTACT\_US, ORDER\_NOW, START\_ORDER, ADD\_TO\_CART, VIEW\_CART, VIEW\_IN\_CART, VIDEO\_ANNOTATION, RECORD\_NOW, INQUIRE\_NOW, CONFIRM, REFER\_FRIENDS, REQUEST\_TIME, GET\_SHOWTIMES, LISTEN\_NOW, TRY\_DEMO, WOODHENGE\_SUPPORT, SOTTO\_SUBSCRIBE, FOLLOW\_USER, RAISE\_MONEY, SEE\_SHOP, GET\_DETAILS, FIND\_OUT\_MORE, VISIT\_WEBSITE, BROWSE\_SHOP, EVENT\_RSVP, WHATSAPP\_MESSAGE, FOLLOW\_NEWS\_STORYLINE, SEE\_MORE, BOOK\_NOW, FIND\_A\_GROUP, FIND\_YOUR\_GROUPS, PAY\_TO\_ACCESS, PURCHASE\_GIFT\_CARDS, FOLLOW\_PAGE, SEND\_A\_GIFT, SWIPE\_UP\_SHOP, SWIPE\_UP\_PRODUCT, SEND\_GIFT\_MONEY, PLAY\_GAME\_ON\_FACEBOOK, GET\_STARTED, OPEN\_INSTANT\_APP, AUDIO\_CALL, GET\_PROMOTIONS, JOIN\_CHANNEL, MAKE\_AN\_APPOINTMENT, ASK\_ABOUT\_SERVICES, BOOK\_A\_CONSULTATION, GET\_A\_QUOTE, BUY\_VIA\_MESSAGE, ASK\_FOR\_MORE\_INFO, CHAT\_WITH\_US, VIEW\_PRODUCT, VIEW\_CHANNEL, GET\_IN\_TOUCH, WATCH\_LIVE\_VIDEO, SHOP\_WITH\_AI, TRY\_ON\_WITH\_AI}>

Ad call to action spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`call_to_actions`

[list<AdAssetFeedSpecCallToAction>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-call-to-action/)

Ad call to action spec in asset feed spec  
Visible only to intern apps or Special Ad Categories asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`captions`

[list<AdAssetFeedSpecCaption>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-caption/)

Ad caption asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ctwa_consent_data`

list<AdAssetCtwaConsentData>

Ctwa consent data asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`descriptions`

[list<AdAssetFeedSpecDescription>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-description/)

Ad description asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`events`

list<AdAssetFeedSpecEvents>

Ad event asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`groups`

[list<AdAssetFeedSpecGroupRule>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-group-rule/)

Groups spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`images`

[list<AdAssetFeedSpecImage>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-image/)

Ad image asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`link_urls`

[list<AdAssetFeedSpecLinkURL>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-link-url/)

Ad link urls asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`message_extensions`

list<AdAssetMessageExtensions>

message extensions indicates if advertisers opted in message extension feature

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`optimization_type`

enum

Optimization type used in asset feed. Possible values are [`ASSET_CUSTOMIZATION`](https://developers.facebook.com/docs/marketing-api/dyn-language-optimization#custom), [`LANGUAGE`](https://developers.facebook.com/docs/marketing-api/dyn-language-optimization), [`PLACEMENT`](https://developers.facebook.com/docs/marketing-api/buying-api/ad-units#placements), [`REGULAR`](https://developers.facebook.com/docs/marketing-api/asset-feed/), and [`FORMAT_AUTOMATION`](/docs/marketing-api/dynamic-ads-format-personalization).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`promotional_metadata`

[AdAssetPromotionalMetadata](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-promotional-metadata/)

Used to highlight promo codes to maximize conversions and optimize ad spend. Campaigns created with “highlight your promo codes” have shown a 9% median reduction in cost per purchase and a 10% median increase in conversions rate for website purchases.

When someone interacts with your ad that has this feature on, the promo code will be highlighted to them. If someone then goes to check out on your website within the in-app browser, the promo code can be automatically applied or easily copy-pasted to be applied at checkout.

The promo codes that are highlighted and applied are sourced from your ad creative, existing ad inventory, your website and/or any synced offers in your Commerce Manager. Meta will also automatically update active and eligible promo codes for the duration of your ad campaign.

Only supported for sales campaign with web (IAB) conversion location.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`titles`

[list<AdAssetFeedSpecTitle>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-title/)

Ad title asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`translations`

list<AdAssetTranslations>

translations

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`videos`

[list<AdAssetFeedSpecVideo>](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec-video/)

Ad video asset spec in asset feed spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)