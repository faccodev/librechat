---
title: "Graph API Referência v24.0: Ads Pixel CAPIEvent ALYACR"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-pixel-capi-event-alyacr"
scraped_at: "2026-02-01T15:49:12.310Z"
---

Versão Graph API

[v24.0](#)

# Ads Pixel CAPIEvent ALYACR

[](#)

## Leitura

Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_AdsPixelCAPIEventALYACR%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_AdsPixelCAPIEventALYACR} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_AdsPixelCAPIEventALYACR}',
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
    "...?fields={fieldname_of_type_AdsPixelCAPIEventALYACR}",
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
    "...?fields={fieldname_of_type_AdsPixelCAPIEventALYACR}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_AdsPixelCAPIEventALYACR}"
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

Explanation for this metric. i.e. "Similar advertisers who set up Conversions API for Search events saw a median of 23.3% additional conversions reported versus those that only used Meta Pixel."

`percentage`

float

Percentage value for this metric. i.e. 23.3%, for a given unconnected CAPI event, how much ACR may be achieved if the event is connected to CAPI

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