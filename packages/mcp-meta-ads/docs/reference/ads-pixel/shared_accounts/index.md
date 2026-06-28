---
title: "Graph API Referência v24.0: Ads Pixel Shared Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/shared_accounts/"
scraped_at: "2026-02-01T16:05:35.173Z"
---

Versão Graph API

[v24.0](#)

# Ads Pixel Shared Accounts

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `shared_accounts` edge from the following paths:

-   [`/{ads_pixel_id}/shared_accounts`](/docs/marketing-api/reference/ads-pixel/shared_accounts/)

When posting to this edge, no Graph object will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=%7Bpixel-id%7D%2Fshared_accounts%3Faccount_id%3D%257Bad-account-id%257D%26business%3D%257Bbusiness-id%257D&version=v24.0)

```
POST /v24.0/{pixel-id}/shared_accounts HTTP/1.1
Host: graph.facebook.com

account_id=%7Bad-account-id%7D&business=%7Bbusiness-id%7D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{pixel-id}/shared_accounts',
    array (
      'account_id' => '{ad-account-id}',
      'business' => '{business-id}',
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
    "/{pixel-id}/shared_accounts",
    "POST",
    {
        "account_id": "{ad-account-id}",
        "business": "{business-id}"
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
params.putString("account_id", "{ad-account-id}");
params.putString("business", "{business-id}");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{pixel-id}/shared_accounts",
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
  @"account_id": @"{ad-account-id}",
  @"business": @"{business-id}",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{pixel-id}/shared_accounts"
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
  -F 'account_id=null' \
  -F 'business=null' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/{pixel-id}/shared_accounts
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`account_id`

numeric string

SELF\_EXPLANATORY

Obrigatório

`business`

numeric string or integer

SELF\_EXPLANATORY

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate an [AdAccount](/docs/marketing-api/reference/ad-account/) from an [AdsPixel](/docs/marketing-api/reference/ads-pixel/) by making a DELETE request to [`/{ads_pixel_id}/shared_accounts`](/docs/marketing-api/reference/ads-pixel/shared_accounts/).

### Parâmetros

Parâmetro

Descrição

`account_id`

numeric string

SELF\_EXPLANATORY

Obrigatório

`business`

numeric string or integer

SELF\_EXPLANATORY

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)