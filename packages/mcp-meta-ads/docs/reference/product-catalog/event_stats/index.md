---
title: "Graph API Referência v24.0: Product Catalog Event Stats"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/event_stats/"
scraped_at: "2026-02-01T16:14:20.669Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Event Stats

[](#)

## Leitura

Stats on pixel fires and app events from sources associated with this catalog.

Each result object contains the count of matched and unmatched content ids and the count of matched and unmatched unique content ids for each day over the previous 28 days. All results are automatically broken down by DA events (`ViewContent`, `AddToCart` and `Purchase`) and source of the event (pixel or app). Additional breakdowns like `device_type` can be requested for more granularity. Statistics about only those external event sources which the user making the request has access to, would be returned.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=%3CPRODUCT_CATALOG_ID%3E%2Fevent_stats&version=v24.0)

```
GET /v24.0/<PRODUCT_CATALOG_ID>/event_stats HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/<PRODUCT_CATALOG_ID>/event_stats',
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
    "/<PRODUCT_CATALOG_ID>/event_stats",
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
    "/<PRODUCT_CATALOG_ID>/event_stats",
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
                               initWithGraphPath:@"/<PRODUCT_CATALOG_ID>/event_stats"
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
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<PRODUCT_CATALOG_ID>/event_stats
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`breakdowns`

array<enum {DEVICE\_TYPE}>

The way your results will be broken down. If you specify `["device_type"]` your results will be grouped by device\_type, as well as by source and event. Results are always broken down by DA events (`ViewContent`, `AddToCart` and `Purchase`) and source of event (pixel or app) by default.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [ProductEventStat](/docs/marketing-api/reference/product-event-stat/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

270

This Ads API request is not allowed for apps with development access level (Development access is by default for all apps, please request for upgrade). Make sure that the access token belongs to a user that is both admin of the app and admin of the ad account

100

Invalid parameter

200

Permissions error

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