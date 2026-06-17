---
title: "Graph API Referência v24.0: Ad Account Product Audiences"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/product_audiences/"
scraped_at: "2026-02-01T16:05:09.734Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Product Audiences

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `product_audiences` edge from the following paths:

-   [`/act_{ad_account_id}/product_audiences`](/docs/marketing-api/reference/ad-account/product_audiences/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fproduct_audiences%3Fname%3DTest%2BIphone%2BProduct%2BAudience%26product_set_id%3D%253CPRODUCT_SET_ID%253E%26inclusions%3D%255B%257B%2522retention_seconds%2522%253A86400%252C%2522rule%2522%253A%257B%2522and%2522%253A%255B%257B%2522event%2522%253A%257B%2522eq%2522%253A%2522AddToCart%2522%257D%257D%252C%257B%2522userAgent%2522%253A%257B%2522i_contains%2522%253A%2522iPhone%2522%257D%257D%255D%257D%257D%255D%26exclusions%3D%255B%257B%2522retention_seconds%2522%253A172800%252C%2522rule%2522%253A%257B%2522event%2522%253A%257B%2522eq%2522%253A%2522Purchase%2522%257D%257D%257D%255D&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/product_audiences HTTP/1.1
Host: graph.facebook.com

name=Test+Iphone+Product+Audience&product_set_id=%3CPRODUCT_SET_ID%3E&inclusions=%5B%7B%22retention_seconds%22%3A86400%2C%22rule%22%3A%7B%22and%22%3A%5B%7B%22event%22%3A%7B%22eq%22%3A%22AddToCart%22%7D%7D%2C%7B%22userAgent%22%3A%7B%22i_contains%22%3A%22iPhone%22%7D%7D%5D%7D%7D%5D&exclusions=%5B%7B%22retention_seconds%22%3A172800%2C%22rule%22%3A%7B%22event%22%3A%7B%22eq%22%3A%22Purchase%22%7D%7D%7D%5D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/product_audiences',
    array (
      'name' => 'Test Iphone Product Audience',
      'product_set_id' => '<PRODUCT_SET_ID>',
      'inclusions' => '[{"retention_seconds":86400,"rule":{"and":[{"event":{"eq":"AddToCart"}},{"userAgent":{"i_contains":"iPhone"}}]}}]',
      'exclusions' => '[{"retention_seconds":172800,"rule":{"event":{"eq":"Purchase"}}}]',
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
    "/act_<AD_ACCOUNT_ID>/product_audiences",
    "POST",
    {
        "name": "Test Iphone Product Audience",
        "product_set_id": "<PRODUCT_SET_ID>",
        "inclusions": "[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]",
        "exclusions": "[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]"
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
params.putString("name", "Test Iphone Product Audience");
params.putString("product_set_id", "<PRODUCT_SET_ID>");
params.putString("inclusions", "[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]");
params.putString("exclusions", "[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/product_audiences",
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
  @"name": @"Test Iphone Product Audience",
  @"product_set_id": @"<PRODUCT_SET_ID>",
  @"inclusions": @"[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]",
  @"exclusions": @"[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/product_audiences"
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
  -F 'name="Test Iphone Product Audience"' \
  -F 'product_set_id="<PRODUCT_SET_ID>"' \
  -F 'inclusions=[
       {
         "retention_seconds": 86400,
         "rule": {
           "and": [
             {
               "event": {
                 "eq": "AddToCart"
               }
             },
             {
               "userAgent": {
                 "i_contains": "iPhone"
               }
             }
           ]
         }
       }
     ]' \
  -F 'exclusions=[
       {
         "retention_seconds": 172800,
         "rule": {
           "event": {
             "eq": "Purchase"
           }
         }
       }
     ]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/product_audiences
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`associated_audience_id`

int64

SELF\_EXPLANATORY

`creation_params`

dictionary { string : <string> }

SELF\_EXPLANATORY

`description`

string

SELF\_EXPLANATORY

`enable_fetch_or_create`

boolean

enable\_fetch\_or\_create

`event_sources`

array<JSON object>

event\_sources

`id`

int64

id

Obrigatório

`type`

enum {APP, OFFLINE\_EVENTS, PAGE, PIXEL}

type

Obrigatório

`exclusions`

list<Object>

SELF\_EXPLANATORY

`booking_window`

Object

`min_seconds`

int64

`max_seconds`

int64

`count`

Object

`event`

string

`type`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

`retention`

Object

`min_seconds`

integer

Obrigatório

`max_seconds`

integer

Obrigatório

`retention_days`

int64

`retention_seconds`

integer

`rule`

Object

`pixel_id`

int64

`inclusions`

list<Object>

SELF\_EXPLANATORY

`booking_window`

Object

`min_seconds`

int64

`max_seconds`

int64

`count`

Object

`event`

string

`type`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

`retention`

Object

`min_seconds`

integer

Obrigatório

`max_seconds`

integer

Obrigatório

`retention_days`

int64

`retention_seconds`

integer

`rule`

Object

`pixel_id`

int64

`name`

string

SELF\_EXPLANATORY

Obrigatório

`opt_out_link`

string

SELF\_EXPLANATORY

`parent_audience_id`

int64

SELF\_EXPLANATORY

`product_set_id`

numeric string or integer

SELF\_EXPLANATORY

Obrigatório

`subtype`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

SELF\_EXPLANATORY

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`message`: string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

2654

Failed to create custom audience

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)