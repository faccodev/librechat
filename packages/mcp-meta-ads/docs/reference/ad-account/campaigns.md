---
title: "Ad Account, Ad Campaigns"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns"
scraped_at: "2026-02-01T14:06:29.207Z"
---

Versão Graph API

[v24.0](#)

# Ad Account, Ad Campaigns

[](#)

The ad campaigns associated with a given ad account.

On May 1, 2018 with the release of Marketing API 3.0 we removed `kpi_custom_conversion_id`, `kpi_type`, and `kpi_results`.

Beginning September 15, 2022, with the release of Marketing API v15.0, advertisers will no longer be allowed to create incremental conversion optimization campaigns. Existing conversion optimization campaigns will behave normally.

### Ads About Social Issues, Elections, and Politics

Beginning with the release of Marketing API v15.0, advertisers will no longer be able to create Special Ad Audiences. See [Special Ad Audiences details here](/docs/marketing-api/audiences/special-ad-category/#special-ad-audiences) for more information.

[](#)

## Leitura

Returns the campaigns under this ad account. A request with no filters returns only campaigns that were not archived or deleted.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=act_%3CAD_ACCOUNT_ID%3E%2Fcampaigns%3Feffective_status%3D%255B%2522ACTIVE%2522%252C%2522PAUSED%2522%255D%26fields%3Dname%252Cobjective&version=v24.0)

```
GET /v24.0/act_<AD_ACCOUNT_ID>/campaigns?effective_status=%5B%22ACTIVE%22%2C%22PAUSED%22%5D&fields=name%2Cobjective HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/act_<AD_ACCOUNT_ID>/campaigns?effective_status=%5B%22ACTIVE%22%2C%22PAUSED%22%5D&fields=name%2Cobjective',
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
    "/act_<AD_ACCOUNT_ID>/campaigns",
    {
        "effective_status": "[\"ACTIVE\",\"PAUSED\"]",
        "fields": "name,objective"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("effective_status", "[\"ACTIVE\",\"PAUSED\"]");
params.putString("fields", "name,objective");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/campaigns",
    params,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"effective_status": @"[\"ACTIVE\",\"PAUSED\"]",
  @"fields": @"name,objective",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/campaigns"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X GET -G \
  -d 'effective_status=[
       "ACTIVE",
       "PAUSED"
     ]' \
  -d 'fields="name,objective"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/campaigns
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`date_preset`

enum{today, yesterday, this\_month, last\_month, this\_quarter, maximum, data\_maximum, last\_3d, last\_7d, last\_14d, last\_28d, last\_30d, last\_90d, last\_week\_mon\_sun, last\_week\_sun\_sat, last\_quarter, last\_year, this\_week\_mon\_today, this\_week\_sun\_today, this\_year}

Predefine date range used to aggregate insights metrics.

`effective_status`

list<enum{ACTIVE, PAUSED, DELETED, PENDING\_REVIEW, DISAPPROVED, PREAPPROVED, PENDING\_BILLING\_INFO, CAMPAIGN\_PAUSED, ARCHIVED, ADSET\_PAUSED, IN\_PROCESS, WITH\_ISSUES}>

Valor padrão: `Vec`

effective status for the campaigns

`is_completed`

boolean

If `true`, we return completed campaigns.

`time_range`

{'since':YYYY-MM-DD,'until':YYYY-MM-DD}

Date range used to aggregate insights metrics

`since`

datetime

A date in the format of "YYYY-MM-DD", which means from the beginning midnight of that day.

`until`

datetime

A date in the format of "YYYY-MM-DD", which means to the beginning midnight of the following day.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [Campaign](/docs/marketing-api/reference/ad-campaign-group/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=insights`).

Campo

Descrição

`insights`

Edge<AdsInsights>

Analytics summary for all objects

`total_count`

unsigned int32

Total number of objects

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

613

Calls to this api have exceeded the rate limit.

368

The action attempted has been deemed abusive or is otherwise disallowed

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

3018

The start date of the time range cannot be beyond 37 months from the current date

2500

Error parsing graph query

[](#)

## Criando

You can make a POST request to `campaigns` edge from the following paths:

-   [`/act_{ad_account_id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns/)

When posting to this edge, a [Campaign](/docs/marketing-api/reference/ad-campaign-group/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fcampaigns%3Fname%3DMy%2Bcampaign%26objective%3DOUTCOME_TRAFFIC%26status%3DPAUSED%26special_ad_categories%3D%255B%255D%26is_adset_budget_sharing_enabled%3D0&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/campaigns HTTP/1.1
Host: graph.facebook.com

name=My+campaign&objective=OUTCOME_TRAFFIC&status=PAUSED&special_ad_categories=%5B%5D&is_adset_budget_sharing_enabled=0
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/campaigns',
    array (
      'name' => 'My campaign',
      'objective' => 'OUTCOME_TRAFFIC',
      'status' => 'PAUSED',
      'special_ad_categories' => '[]',
      'is_adset_budget_sharing_enabled' => '0',
    ),
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
    "/act_<AD_ACCOUNT_ID>/campaigns",
    "POST",
    {
        "name": "My campaign",
        "objective": "OUTCOME_TRAFFIC",
        "status": "PAUSED",
        "special_ad_categories": "[]",
        "is_adset_budget_sharing_enabled": "0"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("name", "My campaign");
params.putString("objective", "OUTCOME_TRAFFIC");
params.putString("status", "PAUSED");
params.putString("special_ad_categories", "[]");
params.putString("is_adset_budget_sharing_enabled", "0");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/campaigns",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"name": @"My campaign",
  @"objective": @"OUTCOME_TRAFFIC",
  @"status": @"PAUSED",
  @"special_ad_categories": @"[]",
  @"is_adset_budget_sharing_enabled": @"0",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/campaigns"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X POST \
  -F 'name="My campaign"' \
  -F 'objective="OUTCOME_TRAFFIC"' \
  -F 'status="PAUSED"' \
  -F 'special_ad_categories=[]' \
  -F 'is_adset_budget_sharing_enabled=0' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/campaigns
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

[Ad Labels](/docs/marketing-api/reference/ad-label) associated with this campaign

`bid_strategy`[](#)

enum{LOWEST\_COST\_WITHOUT\_CAP, LOWEST\_COST\_WITH\_BID\_CAP, COST\_CAP, LOWEST\_COST\_WITH\_MIN\_ROAS}

Choose bid strategy for this campaign to suit your specific business goals. Each strategy has tradeoffs and may be available for certain `optimization_goal`s:  
`LOWEST_COST_WITHOUT_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` without limiting your bid amount. This is the best strategy if you care most about cost efficiency. However with this strategy it may be harder to get stable average costs as you spend. This strategy is also known as _automatic bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  
`LOWEST_COST_WITH_BID_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` while limiting actual bid to your specified amount. With a bid cap you have more control over your cost per actual optimization event. However if you set a limit which is too low you may get less ads delivery. If you select this, you must provide a bid cap in the `bid_amount` field for each ad set in this ad campaign. Note: during creation this is the default bid strategy if you don't specify. This strategy is also known as _manual maximum-cost bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  

**Notes:**

-   If you do not enable campaign budget optimization, you should set `bid_strategy` at ad set level.
-   `TARGET_COST` bidding strategy has been deprecated with [Marketing API v9](/docs/graph-api/changelog/version9.0).

`budget_schedule_specs`

list<JSON or object-like arrays>

Initial high demand periods to be created with the campaign.  
Provide list of `time_start`, `time_end`,`budget_value`, and `budget_value_type`.  
For example,  
\-F 'budget\_schedule\_specs=\[{  
"time\_start":1699081200,  
"time\_end":1699167600,  
"budget\_value":100,  
"budget\_value\_type":"ABSOLUTE"  
}\]'  
See [High Demand Period](https://developers.facebook.com/docs/graph-api/reference/high-demand-period/) for more details on each field.

`id`

int64

`time_start`

datetime

`time_end`

datetime

`budget_value`

int64

`budget_value_type`

enum{ABSOLUTE, MULTIPLIER}

`recurrence_type`

enum{ONE\_TIME, WEEKLY}

`weekly_schedule`

list<JSON or object-like arrays>

`days`

list<int64>

`minute_start`

int64

`minute_end`

int64

`timezone_type`

string

`buying_type`

string

Valor padrão: `AUCTION`

This field will help Facebook make optimizations to delivery, pricing, and limits. All ad sets in this campaign must match the buying type. Possible values are:  
`AUCTION` (default)  
`RESERVED` (for [reach and frequency ads](/docs/marketing-api/reachandfrequency)).

`campaign_optimization_type`

enum{NONE, ICO\_ONLY}

campaign\_optimization\_type

`daily_budget`

int64

Daily budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.

`execution_options`

list<enum{validate\_only, include\_recommendations}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
`include_recommendations`: this option cannot be used by itself. When this option is used, recommendations for ad object's configuration will be included. A separate section [recommendations](/docs/marketing-api/reference/ad-recommendation) will be included in the response, but only if recommendations for this specification exist.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

`is_skadnetwork_attribution`

boolean

To create an iOS 14 campaign, enable SKAdNetwork attribution for this campaign.

`is_using_l3_schedule`

boolean

is\_using\_l3\_schedule

`iterative_split_test_configs`

list<Object>

Array of Iterative Split Test Configs created under this campaign .

`lifetime_budget`

int64

Lifetime budget of this campaign. All adsets under this campaign will share this budget. You can either set budget at the campaign level or at the adset level, not both.

`name`

string

Name for this campaign

Supports Emoji

`objective`

enum{APP\_INSTALLS, BRAND\_AWARENESS, CONVERSIONS, EVENT\_RESPONSES, LEAD\_GENERATION, LINK\_CLICKS, LOCAL\_AWARENESS, MESSAGES, OFFER\_CLAIMS, OUTCOME\_APP\_PROMOTION, OUTCOME\_AWARENESS, OUTCOME\_ENGAGEMENT, OUTCOME\_LEADS, OUTCOME\_SALES, OUTCOME\_TRAFFIC, PAGE\_LIKES, POST\_ENGAGEMENT, PRODUCT\_CATALOG\_SALES, REACH, STORE\_VISITS, VIDEO\_VIEWS}

Campaign's objective. If it is specified the API will validate that any ads created under the campaign match that objective.  
Currently, with `BRAND_AWARENESS` objective, all creatives should be either only images or only videos, not mixed.  
See [Outcome Ad-Driven Experience Objective Validation](/docs/marketing-api/reference/ad-campaign-group/#odax) for more information.

`promoted_object`

Object

The object this campaign is promoting across all its ads. It’s required for Meta iOS 14+ app promotion (SKAdNetwork or Aggregated Event Measurement) campaign creation. Only `product_catalog_id` is used at the ad set level.

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

`source_campaign_id`

numeric string or integer

Used if a campaign has been copied. The ID from the original campaign that was copied.

`special_ad_categories`[](#)

array<enum {NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}>

special\_ad\_categories

Obrigatório

`special_ad_category_country`[](#)

array<enum {AC, AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CN, CO, CR, CU, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IR, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KP, KR, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SY, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW}>

special\_ad\_category\_country

`spend_cap`

int64

A spend cap for the campaign, such that it will not spend more than this cap. Defined as integer value of subunit in your currency with a minimum value of $100 USD (or approximate local equivalent). Set the value to 922337203685478 to remove the spend cap. Not available for Reach and Frequency or Premium Self Serve campaigns

`start_time`

datetime

start\_time

`status`

enum{ACTIVE, PAUSED, DELETED, ARCHIVED}

Only `ACTIVE` and `PAUSED` are valid during creation. Other statuses can be used for update. If it is set to `PAUSED`, its active child objects will be paused and have an effective status `CAMPAIGN_PAUSED`.

`stop_time`

datetime

stop\_time

`topline_id`

numeric string or integer

Topline ID

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

613

Calls to this api have exceeded the rate limit.

200

Permissions error

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

300

Edit failure

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [Campaign](/docs/marketing-api/reference/ad-campaign-group/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns/).

### Parâmetros

Parâmetro

Descrição

`before_date`

datetime

Set a before date to delete campaigns before this date

`delete_strategy`

enum{DELETE\_ANY, DELETE\_OLDEST, DELETE\_ARCHIVED\_BEFORE}

Delete strategy

Obrigatório

`object_count`

integer

Object count

### Return Type

Struct {

`objects_left_to_delete_count`: unsigned int32,

`deleted_object_ids`: List \[

numeric string

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)