---
title: "Ad Account Custom Audiences"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/customaudiences"
scraped_at: "2026-02-01T14:07:01.180Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Customaudiences

[](#)

## Leitura

The custom audiences associated with the ad account.

  
**Note:** To retrieve the IDs of lookalike audiences based on your custom audiences, use the `lookalike_audience_ids` field. See [Lookalike Audiences - Managing Audiences](/docs/marketing-api/audiences/guides/lookalike-audiences#read) for more information.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=act_%3CAD_ACCOUNT_ID%3E%2Fcustomaudiences%3Ffields%3Did&version=v24.0)

```
GET /v24.0/act_<AD_ACCOUNT_ID>/customaudiences?fields=id HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/act_<AD_ACCOUNT_ID>/customaudiences?fields=id',
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
    "/act_<AD_ACCOUNT_ID>/customaudiences",
    {
        "fields": "id"
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
params.putString("fields", "id");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/customaudiences",
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
  @"fields": @"id",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/customaudiences"
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
  -d 'fields="id"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/customaudiences
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`business_id`

numeric string or integer

Optional.  
This param assists with filters, such as recently used.

`fetch_primary_audience`

boolean

Valor padrão: `false`

fetch\_primary\_audience

`fields`

list<string>

Fields to be retrieved. Default behavior is to return only the IDs.

`filtering`

list<Filter Object>

Filters on the report data. This parameter is an array of filter objects.

`field`

string

Obrigatório

`operator`

enum {EQUAL, NOT\_EQUAL, GREATER\_THAN, GREATER\_THAN\_OR\_EQUAL, LESS\_THAN, LESS\_THAN\_OR\_EQUAL, IN\_RANGE, NOT\_IN\_RANGE, CONTAIN, NOT\_CONTAIN, CONTAINS\_ANY, CONTAINS\_ALL, NOT\_CONTAINS\_ANY, STEM\_MATCH, IN, NOT\_IN, STARTS\_WITH, ENDS\_WITH, ANY, ALL, AFTER, BEFORE, ON\_OR\_AFTER, ON\_OR\_BEFORE, NONE, TOP}

Obrigatório

`value`

string

Obrigatório

`pixel_id`

numeric string

Optional.  
This param fetches audiences associated to specific pixel.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [CustomAudience](/docs/marketing-api/reference/custom-audience/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

[](#)

## Criando

Your ability to create custom audiences may be limited.

It is expected that you have the same audience capabilities independent of your app's status, which could be _in development_ or _live_.

To create a custom audience you'll first need to create a blank audience. Then, you'll want to add people to the blank audience you just created by updating the [users edge](/docs/marketing-api/reference/custom-audience/users/) of the audience. **You can create a maximum of 500 custom audiences.**

  

You can make a POST request to `customaudiences` edge from the following paths:

-   [`/act_{ad_account_id}/customaudiences`](/docs/marketing-api/reference/ad-account/customaudiences/)

When posting to this edge, a [CustomAudience](/docs/marketing-api/reference/custom-audience/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fcustomaudiences%3Fname%3DMy%2Bnew%2BCustom%2BAudience%26subtype%3DCUSTOM%26description%3DPeople%2Bwho%2Bpurchased%2Bon%2Bmy%2Bwebsite%26customer_file_source%3DUSER_PROVIDED_ONLY&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/customaudiences HTTP/1.1
Host: graph.facebook.com

name=My+new+Custom+Audience&subtype=CUSTOM&description=People+who+purchased+on+my+website&customer_file_source=USER_PROVIDED_ONLY
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/customaudiences',
    array (
      'name' => 'My new Custom Audience',
      'subtype' => 'CUSTOM',
      'description' => 'People who purchased on my website',
      'customer_file_source' => 'USER_PROVIDED_ONLY',
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
    "/act_<AD_ACCOUNT_ID>/customaudiences",
    "POST",
    {
        "name": "My new Custom Audience",
        "subtype": "CUSTOM",
        "description": "People who purchased on my website",
        "customer_file_source": "USER_PROVIDED_ONLY"
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
params.putString("name", "My new Custom Audience");
params.putString("subtype", "CUSTOM");
params.putString("description", "People who purchased on my website");
params.putString("customer_file_source", "USER_PROVIDED_ONLY");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/customaudiences",
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
  @"name": @"My new Custom Audience",
  @"subtype": @"CUSTOM",
  @"description": @"People who purchased on my website",
  @"customer_file_source": @"USER_PROVIDED_ONLY",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/customaudiences"
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
  -F 'name="My new Custom Audience"' \
  -F 'subtype="CUSTOM"' \
  -F 'description="People who purchased on my website"' \
  -F 'customer_file_source="USER_PROVIDED_ONLY"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/customaudiences
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`allowed_domains`

list<string>

A list of domains that the audience is restricted to.

`claim_objective`

enum {AUTOMOTIVE\_MODEL, COLLABORATIVE\_ADS, HOME\_LISTING, MEDIA\_TITLE, PRODUCT, TRAVEL, VEHICLE, VEHICLE\_OFFER}

Specifies the objective of audiences with `CLAIM` subtype.

`content_type`

enum {AUTOMOTIVE\_MODEL, DESTINATION, FLIGHT, GENERIC, HOME\_LISTING, HOTEL, LOCAL\_SERVICE\_BUSINESS, MEDIA\_TITLE, OFFLINE\_PRODUCT, PRODUCT, VEHICLE, VEHICLE\_OFFER}

Specifies a mandatory content type for `TRAVEL` claim objective.

`customer_file_source`

enum {USER\_PROVIDED\_ONLY, PARTNER\_PROVIDED\_ONLY, BOTH\_USER\_AND\_PARTNER\_PROVIDED}

Source of customer information in the uploaded file.

`dataset_id`

numeric string or integer

The offline conversion dataset associated with this audience.

`description`

string

The description for this custom audience

`enable_fetch_or_create`

boolean

If `true`, we fetch a custom audience instead of creating one when an identical custom audience already exists. Identical custom audiences must have same `name`, `claim_objective`, `content_type`, `event_source_group/event_sources/sliced_event_source_group`, inclusions, exclusions and rule.

`event_source_group`

numeric string or integer

Specifies event source group for `TRAVEL` claim objective.

`event_sources`

array<JSON object>

Specifies event sources for `TRAVEL` claim objective.

`id`

int64

id

Obrigatório

`type`

enum {APP, OFFLINE\_EVENTS, PAGE, PIXEL}

type

Obrigatório

`facebook_page_id`

numeric string or integer

facebook\_page\_id

`is_value_based`

boolean

Whether the audience is used to seed a new value based lookalike audience.

`list_of_accounts`

list<int64>

List of user and page accounts

`lookalike_spec`

JSON-encoded string

The specification for creating a [lookalike audience](/docs/marketing-api/lookalike-audience-targeting/).

`name`

string

The name of this custom audience.

`opt_out_link`

string

Your opt-out URL so people can choose not to be targeted.

`origin_audience_id`

numeric string or integer

The ID of origin Custom Audience.The origin audience you create must have a minimum size of 100.

`pixel_id`

numeric string or integer

The pixel associated with this audience

`prefill`

boolean

You can specify `true` or `false`. `true` includes website traffic recorded prior to the audience creation, and `false` only includes website traffic beginning at the time of the audience creation.

`product_set_id`

numeric string or integer

The Product Set to target with this audience

`retention_days`

int64

Number of days to keep the user in this cluster. You can use any value between `1` and `180` days. Defaults to forever, if not specified.

`rule`

string

Audience rule to be applied on the referrer URL. Used for [website custom audiences](/docs/marketing-api/custom-audience-website/#audiencerules), [product audiences](/docs/marketing-api/dynamic-product-ads/product-audiences/#productaudience), and [video remarketing audiences](/docs/marketing-api/guides/videoads/#remarketing).

`rule_aggregation`

string

Aggregation rule

`subscription_info`

list<enum {WHATSAPP, MESSENGER}>

subscription\_info

`subtype`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

Type of custom audience, derived from original data source.  
Note: `COMBINATION` subtype is only used by Ads Manager, and is not available through the API.  
  
Number of audiences limit for selected subtype:  
`CUSTOM`: 500  
`LOOKALIKE`: 10000  

`use_for_products`

list<enum {ADS, MARKETING\_MESSAGES}>

use\_for\_products

`use_in_campaigns`

boolean

Valor padrão: `true`

use\_in\_campaigns

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`message`: string,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

2654

Failed to create custom audience

2663

Terms of service has not been accepted. To accept, go to https://www.facebook.com/customaudiences/app/tos

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

2664

The corporate terms of service has not been accepted. To accept, go to https://business.facebook.com/ads/manage/customaudiences/tos.php

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)