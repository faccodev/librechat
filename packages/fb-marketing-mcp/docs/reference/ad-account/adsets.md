---
title: "Ad Set, Reference"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets"
scraped_at: "2026-02-01T14:06:35.454Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Adsets

[](#)

Due to the iOS 14.5 launch, changes have been made to this endpoint.

-   Mobile App Custom Audiences for inclusion targeting is no longer supported for the `POST /{ad-account-id}/adsets` endpoint for iOS 14.5 SKAdNetwork campaigns.
-   New iOS 14.5 app install campaigns will no longer be able to use app connections targeting.

[](#)

## Leitura

The adsets of this ad account

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=act_%3CAD_ACCOUNT_ID%3E%2Fadsets%3Ffields%3Dname%252Cid%252Cstatus&version=v24.0)

```
GET /v24.0/act_<AD_ACCOUNT_ID>/adsets?fields=name%2Cid%2Cstatus HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/act_<AD_ACCOUNT_ID>/adsets?fields=name%2Cid%2Cstatus',
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
    "/act_<AD_ACCOUNT_ID>/adsets",
    {
        "fields": "name,id,status"
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
params.putString("fields", "name,id,status");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/adsets",
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
  @"fields": @"name,id,status",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/adsets"
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
  -d 'fields="name,id,status"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adsets
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`date_preset`

enum {TODAY, YESTERDAY, THIS\_MONTH, LAST\_MONTH, THIS\_QUARTER, MAXIMUM, DATA\_MAXIMUM, LAST\_3D, LAST\_7D, LAST\_14D, LAST\_28D, LAST\_30D, LAST\_90D, LAST\_WEEK\_MON\_SUN, LAST\_WEEK\_SUN\_SAT, LAST\_QUARTER, LAST\_YEAR, THIS\_WEEK\_MON\_TODAY, THIS\_WEEK\_SUN\_TODAY, THIS\_YEAR}

Predefine date range used to aggregate insights metrics

`effective_status`

list<enum{ACTIVE, PAUSED, DELETED, PENDING\_REVIEW, DISAPPROVED, PREAPPROVED, PENDING\_BILLING\_INFO, CAMPAIGN\_PAUSED, ARCHIVED, ADSET\_PAUSED, IN\_PROCESS, WITH\_ISSUES}>

Effective status of adset

`is_completed`

boolean

Filter adset by completed status

`time_range`

{'since':YYYY-MM-DD,'until':YYYY-MM-DD}

Date range used to aggregate insights metrics

`since`

datetime

A date in the format of "YYYY-MM-DD", which means from the beginning midnight of that day.

`until`

datetime

A date in the format of "YYYY-MM-DD", which means to the beginning midnight of the following day.

`updated_since`

integer

Time since the Adset has been updated.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [AdSet](/docs/marketing-api/reference/ad-campaign/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=insights`).

Campo

Descrição

`insights`

Edge<AdsInsights>

Analytics summary for all objects. Use [nested parameters](https://developers.facebook.com/docs/graph-api/advanced#fieldexpansion) with this field. `insights.time_range({'until':'2018-01-01', 'since':'2017-12-12'}).time_increment(1)`

`total_count`

unsigned int32

Total number of objects

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

200

Permissions error

613

Calls to this api have exceeded the rate limit.

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

368

The action attempted has been deemed abusive or is otherwise disallowed

3018

The start date of the time range cannot be beyond 37 months from the current date

2500

Error parsing graph query

[](#)

## Criando

Mobile App Install CPA Billing will no longer be supported. The [billing event](https://developers.facebook.com/docs/marketing-api/bidding/overview/billing-events) cannot be App Install if the Optimization goal is App Install.

You can make a POST request to `adsets` edge from the following paths:

-   [`/act_{ad_account_id}/adsets`](/docs/marketing-api/reference/ad-account/adsets/)

When posting to this edge, an [AdSet](/docs/marketing-api/reference/ad-campaign/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fadsets%3Fname%3DMy%2BFirst%2BAdset%26lifetime_budget%3D20000%26start_time%3D2026-02-01T06%253A06%253A31-0800%26end_time%3D2026-02-11T06%253A06%253A31-0800%26campaign_id%3D%253CAD_CAMPAIGN_ID%253E%26bid_amount%3D100%26billing_event%3DLINK_CLICKS%26optimization_goal%3DLINK_CLICKS%26targeting%3D%257B%2522facebook_positions%2522%253A%255B%2522feed%2522%255D%252C%2522geo_locations%2522%253A%257B%2522countries%2522%253A%255B%2522US%2522%255D%257D%252C%2522publisher_platforms%2522%253A%255B%2522facebook%2522%252C%2522audience_network%2522%255D%257D%26status%3DPAUSED&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/adsets HTTP/1.1
Host: graph.facebook.com

name=My+First+Adset&lifetime_budget=20000&start_time=2026-02-01T06%3A06%3A31-0800&end_time=2026-02-11T06%3A06%3A31-0800&campaign_id=%3CAD_CAMPAIGN_ID%3E&bid_amount=100&billing_event=LINK_CLICKS&optimization_goal=LINK_CLICKS&targeting=%7B%22facebook_positions%22%3A%5B%22feed%22%5D%2C%22geo_locations%22%3A%7B%22countries%22%3A%5B%22US%22%5D%7D%2C%22publisher_platforms%22%3A%5B%22facebook%22%2C%22audience_network%22%5D%7D&status=PAUSED
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/adsets',
    array (
      'name' => 'My First Adset',
      'lifetime_budget' => '20000',
      'start_time' => '2026-02-01T06:06:31-0800',
      'end_time' => '2026-02-11T06:06:31-0800',
      'campaign_id' => '<AD_CAMPAIGN_ID>',
      'bid_amount' => '100',
      'billing_event' => 'LINK_CLICKS',
      'optimization_goal' => 'LINK_CLICKS',
      'targeting' => '{"facebook_positions":["feed"],"geo_locations":{"countries":["US"]},"publisher_platforms":["facebook","audience_network"]}',
      'status' => 'PAUSED',
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
    "/act_<AD_ACCOUNT_ID>/adsets",
    "POST",
    {
        "name": "My First Adset",
        "lifetime_budget": "20000",
        "start_time": "2026-02-01T06:06:31-0800",
        "end_time": "2026-02-11T06:06:31-0800",
        "campaign_id": "<AD_CAMPAIGN_ID>",
        "bid_amount": "100",
        "billing_event": "LINK_CLICKS",
        "optimization_goal": "LINK_CLICKS",
        "targeting": "{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}",
        "status": "PAUSED"
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
params.putString("name", "My First Adset");
params.putString("lifetime_budget", "20000");
params.putString("start_time", "2026-02-01T06:06:31-0800");
params.putString("end_time", "2026-02-11T06:06:31-0800");
params.putString("campaign_id", "<AD_CAMPAIGN_ID>");
params.putString("bid_amount", "100");
params.putString("billing_event", "LINK_CLICKS");
params.putString("optimization_goal", "LINK_CLICKS");
params.putString("targeting", "{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}");
params.putString("status", "PAUSED");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/adsets",
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
  @"name": @"My First Adset",
  @"lifetime_budget": @"20000",
  @"start_time": @"2026-02-01T06:06:31-0800",
  @"end_time": @"2026-02-11T06:06:31-0800",
  @"campaign_id": @"<AD_CAMPAIGN_ID>",
  @"bid_amount": @"100",
  @"billing_event": @"LINK_CLICKS",
  @"optimization_goal": @"LINK_CLICKS",
  @"targeting": @"{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}",
  @"status": @"PAUSED",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/adsets"
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
  -F 'name="My First Adset"' \
  -F 'lifetime_budget=20000' \
  -F 'start_time="2026-02-01T06:06:31-0800"' \
  -F 'end_time="2026-02-11T06:06:31-0800"' \
  -F 'campaign_id="<AD_CAMPAIGN_ID>"' \
  -F 'bid_amount=100' \
  -F 'billing_event="LINK_CLICKS"' \
  -F 'optimization_goal="LINK_CLICKS"' \
  -F 'targeting={
       "facebook_positions": [
         "feed"
       ],
       "geo_locations": {
         "countries": [
           "US"
         ]
       },
       "publisher_platforms": [
         "facebook",
         "audience_network"
       ]
     }' \
  -F 'status="PAUSED"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adsets
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specifies list of labels to be associated with this object. This field is optional

`adset_schedule`

list<Object>

Ad set schedule, representing a delivery schedule for a single day

`start_minute`

int64

A 0 based minute of the day representing when the schedule starts

Obrigatório

`end_minute`

int64

A 0 based minute of the day representing when the schedule ends

Obrigatório

`days`

list<int64>

Array of ints representing which days the schedule is active. Valid values are 0-6 with 0 representing Sunday, 1 representing Monday, ... and 6 representing Saturday.

Obrigatório

`timezone_type`

enum {USER, ADVERTISER}

Valor padrão: `USER`

`anchor_event_attribution_window_days`

int64

anchor\_event\_attribution\_window\_days

`attribution_spec`

list<JSON object>

Conversion attribution spec used for attributing conversions for optimization. Supported window lengths differ by optimization goal and campaign objective.

`event_type`

enum {CLICK\_THROUGH, VIEW\_THROUGH, ENGAGED\_VIDEO\_VIEW}

Obrigatório

`window_days`

int64

Obrigatório

`weight`

float

Valor padrão: `100`

`automatic_manual_state`

enum{UNSET, AUTOMATIC, MANUAL}

automatic\_manual\_state

`bid_amount`

integer

Bid cap or target cost for this ad set. The bid cap used in a _lowest cost bid strategy_ is defined as the maximum bid you want to pay for a result based on your `optimization_goal`. The target cost used in a _target cost bid strategy_ lets Facebook bid to meet your target on average and keep costs stable as you spend. If an ad level `bid_amount` is specified, updating this value will overwrite the previous ad level bid. Unless you are using [Reach and Frequency](/docs/marketing-api/reachandfrequency), `bid_amount` is required if `bid_strategy` is set to `LOWEST_COST_WITH_BID_CAP` or `COST_CAP`.  
The bid amount's unit is cents for currencies like USD, EUR, and the basic unit for currencies like JPY, KRW. The bid amount for ads with `IMPRESSION` or `REACH` as `billing_event` is per 1,000 occurrences, and has to be at least 2 US cents or more. For ads with other `billing_event`s, the bid amount is for each occurrence, and has a minimum value 1 US cents. The minimum bid amounts of other currencies are of similar value to the US Dollar values provided.

`bid_strategy`[](#)

enum{LOWEST\_COST\_WITHOUT\_CAP, LOWEST\_COST\_WITH\_BID\_CAP, COST\_CAP, LOWEST\_COST\_WITH\_MIN\_ROAS}

Choose bid strategy for this ad set to suit your specific business goals. Each strategy has tradeoffs and may be available for certain `optimization_goal`s:  
`LOWEST_COST_WITHOUT_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` without limiting your bid amount. This is the best strategy if you care most about cost efficiency. However with this strategy it may be harder to get stable average costs as you spend. This strategy is also known as _automatic bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  
`LOWEST_COST_WITH_BID_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` while limiting actual bid to your specified amount. With a bid cap you have more control over your cost per actual optimization event. However if you set a limit which is too low you may get less ads delivery. If you select this, you must provide a bid cap with the `bid_amount` field. Note: during creation this bid strategy is set if you provide `bid_amount` only. This strategy is also known as _manual maximum-cost bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  

Notes:

-   If you enable campaign budget optimization, you should set `bid_strategy` at the parent campaign level.
    
-   `TARGET_COST` bidding strategy has been deprecated with [Marketing API v9](/docs/graph-api/changelog/version9.0).
    

`billing_event`

enum{APP\_INSTALLS, CLICKS, IMPRESSIONS, LINK\_CLICKS, NONE, OFFER\_CLAIMS, PAGE\_LIKES, POST\_ENGAGEMENT, THRUPLAY, PURCHASE, LISTING\_INTERACTION}

The billing event that this ad set is using:  
APP\_INSTALLS: Pay when people install your app.  
CLICKS: Deprecated.  
IMPRESSIONS: Pay when the ads are shown to people.  
LINK\_CLICKS: Pay when people click on the link of the ad.  
OFFER\_CLAIMS: Pay when people claim the offer.  
PAGE\_LIKES: Pay when people like your page.  
POST\_ENGAGEMENT: Pay when people engage with your post.  
VIDEO\_VIEWS: Pay when people watch your video ads for at least 10 seconds.  
THRUPLAY: Pay for ads that are played to completion, or played for at least 15 seconds.

`budget_schedule_specs`

list<JSON or object-like arrays>

Initial high demand periods to be created with the ad set.  
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

`budget_source`

enum{NONE, RMN}

budget\_source

`budget_split_set_id`

numeric string or integer

budget\_split\_set\_id

`campaign_attribution`

enum{}

campaign\_attribution

`campaign_id`

numeric string or integer

The ad campaign you wish to add this ad set to.

`campaign_spec`

Campaign spec

Provide `name`, `objective` and `buying_type` for a campaign you want to create. Otherwise you need to provide `campaign_id` for an existing ad campaign. For example:  
\-F 'campaign\_spec={  
  "name": "Inline created campaign",  
  "objective": "CONVERSIONS",  
  "buying\_type": "AUCTION"  
}'  
  
Please refer to the [Outcome-Driven Ads Experiences mapping table](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) to find new objectives and their corresponding destination types, optimization goals and promoted objects.

`contextual_bundling_spec`

Object

settings of Contextual Bundle to support ads serving in Facebook contextual surfaces

`status`

enum{OPT\_OUT, OPT\_IN}

`creative_sequence`

list<numeric string or integer>

Order of the adgroup sequence to be shown to users

`daily_budget`

int64

The daily budget defined in your [account currency](/docs/marketing-api/adset/budget-limits), allowed only for ad sets with a duration (difference between `end_time` and `start_time`) longer than 24 hours.  
Either `daily_budget` or `lifetime_budget` must be greater than 0.

`daily_imps`

int64

Daily impressions. Available only for campaigns with `buying_type=FIXED_CPM`

`daily_min_spend_target`

int64

Daily minimum spend target of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`daily_spend_cap`

int64

Daily spend cap of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign. Set the value to 922337203685478 to remove the spend cap.

`destination_type`

enum{WEBSITE, APP, MESSENGER, APPLINKS\_AUTOMATIC, WHATSAPP, INSTAGRAM\_DIRECT, FACEBOOK, MESSAGING\_MESSENGER\_WHATSAPP, MESSAGING\_INSTAGRAM\_DIRECT\_MESSENGER, MESSAGING\_INSTAGRAM\_DIRECT\_MESSENGER\_WHATSAPP, MESSAGING\_INSTAGRAM\_DIRECT\_WHATSAPP, SHOP\_AUTOMATIC, ON\_AD, ON\_POST, ON\_EVENT, ON\_VIDEO, ON\_PAGE, INSTAGRAM\_PROFILE, FACEBOOK\_PAGE, INSTAGRAM\_PROFILE\_AND\_FACEBOOK\_PAGE, INSTAGRAM\_LIVE, FACEBOOK\_LIVE, IMAGINE}

Destination of ads in this Ad Set. Options include: Website, App, Messenger, `INSTAGRAM_DIRECT`, `INSTAGRAM_PROFILE`.

`dsa_beneficiary`

string

dsa\_beneficiary

`dsa_payor`

string

dsa\_payor

`end_time`

datetime

End time, required when `lifetime_budget` is specified. e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. When creating a set with a daily budget, specify `end_time=0` to set the set to be ongoing and have no end date. UTC UNIX timestamp

`execution_options`

list<enum{validate\_only, include\_recommendations}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
`include_recommendations`: this option cannot be used by itself. When this option is used, recommendations for ad object's configuration will be included. A separate section [recommendations](/docs/marketing-api/reference/ad-recommendation) will be included in the response, but only if recommendations for this specification exist.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

`existing_customer_budget_percentage`

int64

existing\_customer\_budget\_percentage

`frequency_control_specs`

list<Object>

An array of frequency control specs for this ad set. Writes to this field are only available in ad sets where `REACH` and `THRUPLAY` are the performance goal.

`event`

enum{IMPRESSIONS, VIDEO\_VIEWS, VIDEO\_VIEWS\_2S, VIDEO\_VIEWS\_15S}

Event name, only `IMPRESSIONS` currently.

Obrigatório

`interval_days`

integer

Interval period in days, between 1 and 90 (inclusive)

Obrigatório

`max_frequency`

integer

The maximum frequency, between 1 and 90 (inclusive)

Obrigatório

`type`

enum{NONE, CAP, TARGET}

`is_dynamic_creative`[](#)

boolean

Indicates the ad set must only be used for dynamic creatives. Dynamic creative ads can be created in this ad set. Defaults to `false`

`is_sac_cfca_terms_certified`

boolean

is\_sac\_cfca\_terms\_certified

`lifetime_budget`

int64

Lifetime budget, defined in your [account currency](/docs/marketing-api/adset/budget-limits). If specified, you must also specify an `end_time`.  
Either `daily_budget` or `lifetime_budget` must be greater than 0.

`lifetime_imps`

int64

Lifetime impressions. Available only for campaigns with `buying_type=FIXED_CPM`

`lifetime_min_spend_target`

int64

Lifetime minimum spend target of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`lifetime_spend_cap`

int64

Lifetime spend cap of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign. Set the value to 922337203685478 to remove the spend cap.

`max_budget_spend_percentage`

int64

max\_budget\_spend\_percentage

`min_budget_spend_percentage`

int64

min\_budget\_spend\_percentage

`multi_optimization_goal_weight`

enum{UNDEFINED, BALANCED, PREFER\_INSTALL, PREFER\_EVENT}

multi\_optimization\_goal\_weight

`name`

string

Ad set name, max length of 400 characters.

ObrigatórioSupports Emoji

`optimization_goal`

enum{NONE, APP\_INSTALLS, AD\_RECALL\_LIFT, ENGAGED\_USERS, EVENT\_RESPONSES, IMPRESSIONS, LEAD\_GENERATION, QUALITY\_LEAD, LINK\_CLICKS, OFFSITE\_CONVERSIONS, PAGE\_LIKES, POST\_ENGAGEMENT, QUALITY\_CALL, REACH, LANDING\_PAGE\_VIEWS, VISIT\_INSTAGRAM\_PROFILE, ENGAGED\_PAGE\_VIEWS, VALUE, THRUPLAY, DERIVED\_EVENTS, APP\_INSTALLS\_AND\_OFFSITE\_CONVERSIONS, CONVERSATIONS, IN\_APP\_VALUE, MESSAGING\_PURCHASE\_CONVERSION, SUBSCRIBERS, REMINDERS\_SET, MEANINGFUL\_CALL\_ATTEMPT, PROFILE\_VISIT, PROFILE\_AND\_PAGE\_ENGAGEMENT, ADVERTISER\_SILOED\_VALUE, AUTOMATIC\_OBJECTIVE, MESSAGING\_APPOINTMENT\_CONVERSION}

What the ad set is optimizing for.  
`APP_INSTALLS`: Will optimize for people more likely to install your app.  
`ENGAGED_USERS`: Will optimize for people more likely to take a particular action in your app.  
`EVENT_RESPONSES`: Will optimize for people more likely to attend your event.  
`IMPRESSIONS`: Will show the ads as many times as possible.  
`LEAD_GENERATION`: Will optimize for people more likely to fill out a lead generation form.  
`LINK_CLICKS`: Will optimize for people more likely to click in the link of the ad.  
`OFFER_CLAIMS`: Will optimize for people more likely to claim the offer.  
`OFFSITE_CONVERSIONS`: Will optimize for people more likely to make a conversion in the site  
`PAGE_ENGAGEMENT`: Will optimize for people more likely to engage with your page.  
`PAGE_LIKES`: Will optimize for people more likely to like your page.  
`POST_ENGAGEMENT`: Will optimize for people more likely to engage with your post.  
`REACH`: Optimize to reach the most unique users of each day or interval specified in `frequency_control_specs`.  
`SOCIAL_IMPRESSIONS`: Increase the number of impressions with social context. For example, with the names of one or more of the user's friends attached to the ad who have already liked the page or installed the app.  
`VALUE`: Will optimize for maximum total purchase value within the specified attribution window.  
`THRUPLAY`: Will optimize delivery of your ads to people are more likely to play your ad to completion, or play it for at least 15 seconds.  
`AD_RECALL_LIFT`: Optimize for people more likely to remember seeing your ads.  
`VISIT_INSTAGRAM_PROFILE`: Optimize for visits to the advertiser's instagram profile.

`optimization_sub_event`

enum{NONE, VIDEO\_SOUND\_ON, TRIP\_CONSIDERATION, TRAVEL\_INTENT, TRAVEL\_INTENT\_NO\_DESTINATION\_INTENT, TRAVEL\_INTENT\_BUCKET\_01, TRAVEL\_INTENT\_BUCKET\_02, TRAVEL\_INTENT\_BUCKET\_03, TRAVEL\_INTENT\_BUCKET\_04, TRAVEL\_INTENT\_BUCKET\_05, POST\_INTERACTION}

Optimization sub event for a specific optimization goal (ex: Sound-On event for Video-View-2s optimization goal)

`pacing_type`

list<string>

Defines the pacing type, standard by default or using [ad scheduling](/docs/marketing-api/adset/pacing)

`promoted_object`

Object

The object this ad set is promoting across all its ads. Required with certain campaign objectives.  
**CONVERSIONS**

-   `pixel_id` (Conversion pixel ID)
-   `pixel_id` (Facebook pixel ID) and `custom_event_type`
-   `pixel_id` (Facebook pixel ID) and `pixel_rule` and `custom_event_type`
-   `event_id` (Facebook event ID) and `custom_event_type`
-   `application_id`, `object_store_url`, and `custom_event_type` for mobile app events
-   `offline_conversion_data_set_id` (Offline dataset ID) and `custom_event_type` for offline conversions

**PAGE\_LIKES**

-   `page_id`

**OFFER\_CLAIMS**

-   `page_id`

**LINK\_CLICKS**

-   `application_id` and `object_store_url` for mobile app or Canvas app engagement link clicks

**APP\_INSTALLS**

-   `application_id` and `object_store_url`

**if the `optimization_goal` is `OFFSITE_CONVERSIONS`**

-   `application_id`, `object_store_url`, and `custom_event_type` (Standard Events)
-   `application_id`, `object_store_url`, `custom_event_type = OTHER` and `custom_event_str` (Custom Events)

**PRODUCT\_CATALOG\_SALES**

-   `product_set_id`
-   `product_set_id` and `custom_event_type`

When `optimization_goal` is `LEAD_GENERATION`, `page_id` needs to be passed as promoted\_object.  
  
Please refer to the [Outcome-Driven Ads Experiences mapping table](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) to find new objectives and their corresponding destination types, optimization goals and promoted objects.

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

`rf_prediction_id`

numeric string or integer

Reach and frequency prediction ID

`source_adset_id`

numeric string or integer

The source adset id that this ad is copied from (if applicable).

`start_time`

datetime

The start time of the set, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp

`status`

enum{ACTIVE, PAUSED, DELETED, ARCHIVED}

Only `ACTIVE` and `PAUSED` are valid for creation. The other statuses can be used for update. If it is set to `PAUSED`, all its active ads will be paused and have an effective status `ADSET_PAUSED`.

`targeting`

Targeting object

An ad set's targeting structure. "countries" is required. See [targeting](/docs/marketing-api/targeting-specs).

`time_based_ad_rotation_id_blocks`

list<list<int64>>

Specify ad creative that displays at custom date ranges in a campaign as an array. A list of Adgroup IDs. The list of ads to display for each time range in a given schedule. For example display first ad in Adgroup for first date range, second ad for second date range, and so on. You can display more than one ad per date range by providing more than one ad ID per array. For example set `time_based_ad_rotation_id_blocks` to \[\[1\], \[2, 3\], \[1, 4\]\]. On the first date range show ad 1, on the second date range show ad 2 and ad 3 and on the last date range show ad 1 and ad 4. Use with `time_based_ad_rotation_intervals` to specify date ranges.

`time_based_ad_rotation_intervals`

list<int64>

Date range when specific ad creative displays during a campaign. Provide date ranges in an array of UNIX timestamps where each timestamp represents the start time for each date range. For example a 3-day campaign from May 9 12am to May 11 11:59PM PST can have three date ranges, the first date range starts from May 9 12:00AM to May 9 11:59PM, second date range starts from May 10 12:00AM to May 10 11:59PM and last starts from May 11 12:00AM to May 11 11:59PM. The first timestamp should match the campaign start time. The last timestamp should be at least 1 hour before the campaign end time. You must provide at least two date ranges. All date ranges must cover the whole campaign length, so any date range cannot exceed campaign length. Use with `time_based_ad_rotation_id_blocks` to specify ad creative for each date range.

`time_start`

datetime

Time start

`time_stop`

datetime

Time stop

`tune_for_category`

enum{NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}

tune\_for\_category

`value_rule_set_id`

numeric string or integer

Value Rule Set ID

`value_rules_applied`

boolean

value\_rules\_applied

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

200

Permissions error

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

368

The action attempted has been deemed abusive or is otherwise disallowed

2695

The ad set creation reached its campaign group(ios14) limit.

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

2641

Your ad includes or excludes locations that are currently restricted

190

Invalid OAuth 2.0 Access Token

900

No such application exists.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

This operation has been deprecated with [Marketing API V8](/docs/graph-api/changelog/version8.0/#ad-accounts).

Não é possível executar esta operação neste ponto de extremidade.

[](#)