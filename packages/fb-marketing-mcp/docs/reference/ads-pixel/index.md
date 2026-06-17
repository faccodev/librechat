---
title: "Graph API Referência v24.0: Ads Pixel"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/"
scraped_at: "2026-02-01T16:05:29.212Z"
---

Versão Graph API

[v24.0](#)

# Ad Pixel

[](#)

## Leitura

A Facebook pixel is a small piece of JavaScript code that an advertiser places on every page of their website. This piece of code provides a set of lightweight functionalities for sending user-specific events and event-specific custom data to Facebook. Advertisers can use the Facebook pixel to capture intent information about how people are using their website. A single Facebook pixel is added to all pages of a website, and is then used to create [website custom audiences](/docs/marketing-api/custom-audience-website/)

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bads-pixel-id%7D&version=v24.0)

```
GET /v24.0/{ads-pixel-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ads-pixel-id}',
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
    "/{ads-pixel-id}",
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
    "/{ads-pixel-id}",
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
                               initWithGraphPath:@"/{ads-pixel-id}"
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

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

numeric string

ID of the pixel

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`automatic_matching_fields`

list<enum>

Advanced matching fields which are enabled for automatic advanced matching

`can_proxy`

bool

can\_proxy

`code`

string

Pixel code to be placed on the website

`config`[](#)

string

The configuration to use for uploads to this dataset. Format determined by the method of upload (eg. UI or SDK)

`creation_time`

datetime

Time at which the pixel was created

`creator`

[User](https://developers.facebook.com/docs/graph-api/reference/user/)

The user who created this pixel

`data_use_setting`

enum

Setting to capture how pixel data should be used

`description`[](#)

string

SELF\_EXPLANATORY

`duplicate_entries`[](#)

integer

Number of duplicate entries for this dataset

`enable_auto_assign_to_accounts`[](#)

bool

Whether the dataset is auto assigned and auto tracked for all accounts that the owner business owns

`enable_automatic_matching`

bool

Represents whether automatic advanced matching is enabled for the pixel for identity matching purposes

`event_stats`[](#)

string

Event stats of this dataset

`event_time_max`[](#)

integer

Latest entry of this dataset

`event_time_min`[](#)

integer

Earliest entry of this dataset

`first_party_cookie_status`

enum

First party cookie status to indicate whether first party cookies can be set for this pixel

`has_1p_pixel_event`

bool

whether pixel has sent us 1p signals

`is_consolidated_container`[](#)

bool

A boolean value indicating whether this signal container has unified pixel and offline conversion data set

`is_created_by_business`

bool

Flag stands for if a pixel is created by business

`is_crm`

bool

True if a pixel contains lead gen data source config

`is_mta_use`[](#)

bool

Whether the dataset is restricted to MTA only

`is_restricted_use`[](#)

bool

Whether the dataset is restricted to Lift only

`is_unavailable`

bool

Whether this pixel is unavailable

`last_fired_time`

datetime

Time at which the pixel was last fired

`last_upload_app`[](#)

string

The app that made the most recent upload

`last_upload_app_changed_time`[](#)

integer

Time when the app that made the most recent upload last changed

`match_rate_approx`[](#)

int32

Approximate match rate percentage for the entries in this dataset

`matched_entries`[](#)

integer

Number of matched entries of this dataset

`name`

string

Name of the pixel

`owner_business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

ID of the business that owns this pixel or null if the pixel has not been claimed by any business yet.

`usage`[](#)

OfflineConversionDataSetUsage

Usage info for the dataset

`valid_entries`[](#)

integer

Number of valid entries of this dataset

### Bordas

Borda

Descrição

[`assigned_users`](/docs/marketing-api/reference/ads-pixel/assigned_users/)

Edge<AssignedUser>

assigned\_users

[`da_checks`](/docs/marketing-api/reference/ads-pixel/da_checks/)

Edge<DACheck>

A list of results after running Dynamic Ads checks on this pixel.

[`offline_event_uploads`](/docs/marketing-api/reference/ads-pixel/offline_event_uploads/)[](#)

Edge<OfflineConversionDataSetUpload>

The offline uploads associated with this event set

[`openbridge_configurations`](/docs/marketing-api/reference/ads-pixel/openbridge_configurations/)

Edge<OpenBridgeConfiguration>

Get all the openbridge configurations associated to this Pixel

[`shared_agencies`](/docs/marketing-api/reference/ads-pixel/shared_agencies/)

Edge<Business>

Agencies or other businesses this pixel is shared with

[`stats`](/docs/marketing-api/reference/ads-pixel/stats/)

Edge<AdsPixelStatsResult>

Stats data for this pixel

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

2500

Error parsing graph query

[](#)

## Criando

You can make a POST request to `adspixels` edge from the following paths:

-   [`/act_{ad_account_id}/adspixels`](/docs/marketing-api/reference/ad-account/adspixels/)

When posting to this edge, an [AdsPixel](/docs/marketing-api/reference/ads-pixel/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fadspixels%3Fname%3DMy%2BWCA%2BPixel&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/adspixels HTTP/1.1
Host: graph.facebook.com

name=My+WCA+Pixel
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/adspixels',
    array (
      'name' => 'My WCA Pixel',
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
    "/act_<AD_ACCOUNT_ID>/adspixels",
    "POST",
    {
        "name": "My WCA Pixel"
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
params.putString("name", "My WCA Pixel");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/adspixels",
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
  @"name": @"My WCA Pixel",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/adspixels"
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
  -F 'name="My WCA Pixel"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adspixels
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`name`

string

Name of the pixel

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

6202

More than one pixel exist for this account

6200

A pixel already exists for this account

100

Invalid parameter

200

Permissions error

[](#)

## Atualizando

You can update an [AdsPixel](/docs/marketing-api/reference/ads-pixel/) by making a POST request to [`/{ads_pixel_id}`](/docs/marketing-api/reference/ads-pixel/).

### Parâmetros

Parâmetro

Descrição

`automatic_matching_fields`

array<enum {em, fn, ln, ph, ge, zp, ct, st, country, db, external\_id}>

Advanced matching fields for which automatic advanced matching should be enabled

`data_use_setting`

enum {EMPTY, ADVERTISING\_AND\_ANALYTICS, ANALYTICS\_ONLY}

Setting to capture how pixel data should be used

`enable_automatic_matching`

boolean

Enable automatic advanced matching for the pixel for identity matching purposes

`first_party_cookie_status`

enum {EMPTY, FIRST\_PARTY\_COOKIE\_ENABLED, FIRST\_PARTY\_COOKIE\_DISABLED}

First party cookie status to indicate whether first party cookies can be set for this pixel

`name`

string

Name of the pixel

`server_events_business_ids`

array<numeric string>

server\_events\_business\_ids

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

190

Invalid OAuth 2.0 Access Token

100

Invalid parameter

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)