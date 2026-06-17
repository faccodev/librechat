---
title: "Ad Account Estimated Daily Results"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/delivery_estimate/"
scraped_at: "2026-02-01T14:34:43.264Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Delivery Estimate

[](#)

Returns the delivery estimate for a given ad set configuration in this ad account. You are not able to retrieve this field for [inactive Lookalike Audiences](/docs/marketing-api/lookalike-audience-targeting#inactive).

[](#)

## Leitura

Delivery estimate for a given ad set configuration in this ad account.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fdelivery_estimate&version=v24.0)

```
GET /v24.0/{ad-account-id}/delivery_estimate HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/delivery_estimate',
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/{ad-account-id}/delivery_estimate",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{ad-account-id}/delivery_estimate",
    null,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{ad-account-id}/delivery_estimate"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`optimization_goal`

enum{NONE, APP\_INSTALLS, AD\_RECALL\_LIFT, ENGAGED\_USERS, EVENT\_RESPONSES, IMPRESSIONS, LEAD\_GENERATION, QUALITY\_LEAD, LINK\_CLICKS, OFFSITE\_CONVERSIONS, PAGE\_LIKES, POST\_ENGAGEMENT, QUALITY\_CALL, REACH, LANDING\_PAGE\_VIEWS, VISIT\_INSTAGRAM\_PROFILE, ENGAGED\_PAGE\_VIEWS, VALUE, THRUPLAY, DERIVED\_EVENTS, APP\_INSTALLS\_AND\_OFFSITE\_CONVERSIONS, CONVERSATIONS, IN\_APP\_VALUE, MESSAGING\_PURCHASE\_CONVERSION, SUBSCRIBERS, REMINDERS\_SET, MEANINGFUL\_CALL\_ATTEMPT, PROFILE\_VISIT, PROFILE\_AND\_PAGE\_ENGAGEMENT, ADVERTISER\_SILOED\_VALUE, AUTOMATIC\_OBJECTIVE, MESSAGING\_APPOINTMENT\_CONVERSION}

The optimization goal that you want the estimate for. You only get action predictions for optimization goals where actions make sense. See [optimization\_goals](/docs/marketing-api/reference/ad-campaign) for allowed values.

Obrigatório

`promoted_object`

Object

The promoted object for the ad set that you want an estimate for. This is the same format as when you [create an ad set](/docs/marketing-api/reference/ad-campaign).

`application_id`

int

The ID of a Facebook Application. Usually related to mobile or canvas games being promoted on Facebook for installs or engagement

`pixel_id`

numeric string or integer

The ID of a Facebook conversion pixel. Used with offsite conversion campaigns.

`custom_event_type`

enum{AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

The event from an App Event of a mobile app, not in the standard event list.

`object_store_url`

URL

The uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the "application\_id" this uniquely specifies an object which can be the subject of a Facebook advertising campaign.

`object_store_urls`

list<URL>

The vec of uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the "application\_id" this uniquely specifies an object which can be the subject of a Facebook advertising campaign.

`offer_id`

numeric string or integer

The ID of an Offer from a Facebook Page.

`page_id`

Page ID

The ID of a Facebook Page

`product_catalog_id`

numeric string or integer

The ID of a Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

`product_item_id`

numeric string or integer

The ID of the product item.

`instagram_profile_id`

numeric string or integer

The ID of the instagram profile id.

`product_set_id`

numeric string or integer

The ID of a Product Set within an Ad Set level Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

`event_id`

numeric string or integer

The ID of a Facebook Event

`offline_conversion_data_set_id`

numeric string or integer

The ID of the offline dataset.

`fundraiser_campaign_id`

numeric string or integer

The ID of the fundraiser campaign.

`custom_event_str`

string

The event from an App Event of a mobile app, not in the standard event list.

`mcme_conversion_id`

numeric string or integer

The ID of a MCME conversion.

`conversion_goal_id`

numeric string or integer

The ID of a Conversion Goal.

`offsite_conversion_event_id`

numeric string or integer

The ID of a Offsite Conversion Event

`boosted_product_set_id`

numeric string or integer

The ID of the Boosted Product Set within an Ad Set level Product Catalog. Should only be present when the advertiser has opted into Product Set Boosting.

`lead_ads_form_event_source_type`

enum{inferred, offsite\_crm, offsite\_web, onsite\_crm, onsite\_crm\_single\_event, onsite\_web, onsite\_p2b\_call, onsite\_messaging}

The event source of lead ads form.

`lead_ads_custom_event_type`

enum{AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

The event from an App Event of a mobile app, not in the standard event list.

`lead_ads_custom_event_str`

string

The event from an App Event of a mobile app, not in the standard event list.

`lead_ads_offsite_conversion_type`

enum{default, clo}

The offsite conversion type for lead ads

`value_semantic_type`

enum {VALUE, MARGIN, LIFETIME\_VALUE}

The semantic of the event value to be using for optimization

`variation`

enum {OMNI\_CHANNEL\_SHOP\_AUTOMATIC\_DATA\_COLLECTION, PRODUCT\_SET\_AND\_APP, PRODUCT\_SET\_AND\_IN\_STORE, PRODUCT\_SET\_AND\_OMNICHANNEL, PRODUCT\_SET\_AND\_PHONE\_CALL, PRODUCT\_SET\_AND\_WEBSITE, PRODUCT\_SET\_AND\_WEBSITE\_AND\_PHONE\_CALL, PRODUCT\_SET\_WEBSITE\_APP\_AND\_INSTORE}

Variation of the promoted object for a PCA ad

`passback_pixel_id`

numeric string or integer

ID of the pixel used for tracking passback events

`passback_application_id`

numeric string or integer

ID of the application used for tracking passback events

`product_set_optimization`

enum{enabled, disabled}

Enum defining whether or not the ad should be optimized for the promoted product set

`full_funnel_objective`

enum{OFFER\_CLAIMS, PAGE\_LIKES, EVENT\_RESPONSES, POST\_ENGAGEMENT, WEBSITE\_CONVERSIONS, LINK\_CLICKS, VIDEO\_VIEWS, LOCAL\_AWARENESS, PRODUCT\_CATALOG\_SALES, LEAD\_GENERATION, BRAND\_AWARENESS, STORE\_VISITS, REACH, APP\_INSTALLS, MESSAGES, OUTCOME\_AWARENESS, OUTCOME\_ENGAGEMENT, OUTCOME\_LEADS, OUTCOME\_SALES, OUTCOME\_TRAFFIC, OUTCOME\_APP\_PROMOTION}

Enum defining the full funnel objective of the campaign

`dataset_split_id`

numeric string or integer

ID of the dataset split used to perform additional optimization on the dataset

`dataset_split_ids`

array<numeric string>

IDs of the dataset splits used to perform additional optimization on the dataset

`lead_ads_selected_pixel_id`

numeric string or integer

The selected pixel id for lead ads conversion leads optimization

`multi_event_product`

int64

Identifies which action-to-action product the advertiser is using

`product_sales_channel`

enum {ONLINE, IN\_STORE, OMNI}

ProductSalesChannel of the promoted object for Omni L3 DA SBLI ads

`anchor_event_config`

JSON object

Configuration for anchor event in multi-event optimization campaigns

`multi_event_conversion_info`

JSON object

Configuration for multi-event conversion info in CLO campaigns

`live_video_destination`

enum{FACEBOOK, INSTAGRAM}

The live video destination type for live video ads

`omnichannel_object`

Object

`app`

array<JSON object>

`pixel`

array<JSON object>

Obrigatório

`onsite`

array<JSON object>

`whats_app_business_phone_number_id`

numeric string or integer

`whatsapp_phone_number`

string

`targeting_spec`

Targeting object

The targeting specification for delivery estimate. See [Advanced Targeting and Placement](/docs/marketing-api/targeting-specs).

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AdAccountDeliveryEstimate.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

100

Invalid parameter

613

Calls to this api have exceeded the rate limit.

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

2641

Your ad includes or excludes locations that are currently restricted

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

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