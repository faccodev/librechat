---
title: "Graph API Referência v24.0: Ads Dataset Event Coverage"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-event-coverage"
scraped_at: "2026-02-01T15:49:25.927Z"
---

Versão Graph API

[v24.0](#)

# Ads Dataset Event Coverage

[](#)

## Leitura

Event coverage is the 7-day average percent of pixel events that are covered by Conversions API, and share deduplication keys with events from Conversions API.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_AdsDatasetEventCoverage%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_AdsDatasetEventCoverage} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_AdsDatasetEventCoverage}',
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
    "...?fields={fieldname_of_type_AdsDatasetEventCoverage}",
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
    "...?fields={fieldname_of_type_AdsDatasetEventCoverage}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_AdsDatasetEventCoverage}"
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

Explanation for this metric. i.e. "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."

`goal_percentage`

float

Goal percentage for Event Coverage. i.e. 75%, is your goal for certain event to meet the best practices for Event Coverage.

`percentage`

float

Percentage value for this metric. i.e. 65%, the percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`potential_aly_acr_increase`

[AdsDatasetCAPIEventCoverageALYACR](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-capi-event-coverage-alyacr/)

Additional Conversions Reported (ACR) for Event Coverage is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel.

For event coverage, you can see the potential improvement in additional conversions reported if the event coverage and deduplication both meet the best practices.

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