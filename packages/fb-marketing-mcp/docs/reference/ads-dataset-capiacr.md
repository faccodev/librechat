---
title: "Graph API Referência v24.0: Ads Dataset CAPIACR"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-capiacr"
scraped_at: "2026-02-01T15:49:16.974Z"
---

Versão Graph API

[v24.0](#)

# Ads Dataset CAPIACR

[](#)

## Leitura

Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_AdsDatasetCAPIACR%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_AdsDatasetCAPIACR} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_AdsDatasetCAPIACR}',
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
    "...?fields={fieldname_of_type_AdsDatasetCAPIACR}",
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
    "...?fields={fieldname_of_type_AdsDatasetCAPIACR}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_AdsDatasetCAPIACR}"
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

`description`

string

Explanation for this metric. i.e. "In the last 7 days, you saw about 39.1% more conversions reported for Purchase events by using the Conversions API alongside the Meta Pixel."

`percentage`

float

Percentage value for this metric. i.e. 39.1%, for a given connected CAPI event, how much ACR was achieved thanks to CAPI

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