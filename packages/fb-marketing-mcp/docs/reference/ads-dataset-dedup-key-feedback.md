---
title: "Graph API Referência v24.0: Ads Dataset Dedup Key Feedback"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-dedup-key-feedback"
scraped_at: "2026-02-01T15:49:30.654Z"
---

Versão Graph API

[v24.0](#)

# Ads Dataset Dedup Key Feedback

[](#)

## Leitura

Deduplication is a process used to prevent our system from counting the same event twice. In order for you to have high Event Coverage, covered events must have a proper deduplication setup.

Deduplication key feedback helps to identify any active issues with deduplication.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_AdsDatasetDedupKeyFeedback%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_AdsDatasetDedupKeyFeedback} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_AdsDatasetDedupKeyFeedback}',
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
    "...?fields={fieldname_of_type_AdsDatasetDedupKeyFeedback}",
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
    "...?fields={fieldname_of_type_AdsDatasetDedupKeyFeedback}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_AdsDatasetDedupKeyFeedback}"
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

`browser_events_with_dedupe_key`

[AdsDatasetDedupKeyFeedbackCoverage](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-dedup-key-feedback-coverage/)

The percentage of browser events that contain this dedupe key. i.e. 100%.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`dedupe_key`

string

Deduplication key, i.e. event\_id.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`overall_browser_coverage_from_dedupe_key`

[AdsDatasetDedupKeyFeedbackCoverage](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-dedup-key-feedback-coverage/)

The overall percentage of browser events that are deduped with CAPI events using this key. This percentage is incremental for each dedupe key. i.e. 14.91%.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`server_events_with_dedupe_key`

[AdsDatasetDedupKeyFeedbackCoverage](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-dedup-key-feedback-coverage/)

The percentage of server events that contain this dedupe key. i.e. 100%.

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