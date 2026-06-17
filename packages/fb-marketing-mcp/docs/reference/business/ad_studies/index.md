---
title: "Graph API Referência v24.0: Business Ad Studies"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/ad_studies/"
scraped_at: "2026-02-01T16:06:27.770Z"
---

Versão Graph API

[v24.0](#)

# Business Ad Studies

[](#)

## Leitura

This business owns these ads-related studies. Includes lift studies, split tests and so on.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fad_studies&version=v24.0)

```
GET /v24.0/{business-id}/ad_studies HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/ad_studies',
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
    "/{business-id}/ad_studies",
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
    "/{business-id}/ad_studies",
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
                               initWithGraphPath:@"/{business-id}/ad_studies"
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

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [AdStudy](/docs/marketing-api/reference/ad-study/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

104

Incorrect signature

[](#)

## Criando

You can make a POST request to `ad_studies` edge from the following paths:

-   [`/{business_id}/ad_studies`](/docs/marketing-api/reference/business/ad_studies/)

When posting to this edge, an [AdStudy](/docs/marketing-api/reference/ad-study/) will be created.

### Parâmetros

Parâmetro

Descrição

`cells`

list<Object>

Describes the cells in the study.

Obrigatório

`description`

string

`id`

int64

`name`

string

`creation_template`

enum {AUTOMATIC\_PLACEMENTS, BRAND\_AWARENESS, FACEBOOK, FACEBOOK\_AUDIENCE\_NETWORK, FACEBOOK\_INSTAGRAM, FACEBOOK\_NEWS\_FEED, FACEBOOK\_NEWS\_FEED\_IN\_STREAM\_VIDEO, IN\_STREAM\_VIDEO, INSTAGRAM, MOBILE\_OPTIMIZED\_VIDEO, PAGE\_POST\_ENGAGEMENT, REACH, TV\_COMMERCIAL, TV\_FACEBOOK, VIDEO\_VIEW\_OPTIMIZATION, LOW\_FREQUENCY, MEDIUM\_FREQUENCY, HIGH\_FREQUENCY}

`adaccounts`

list<int64>

`adsets`

list<numeric string or integer>

`campaigns`

list<numeric string or integer>

`control_percentage`

float with at most two digits after decimal point

`treatment_percentage`

float with at most two digits after decimal point

`client_business`

numeric string or integer

Business associated with the study.

`confidence_level`

float

Confidence level used in power calculations and final study report.

`cooldown_start_time`

integer

Start of the pre-measurement cool-down period. This period ends when the study period starts.

`description`

string

The purpose of the study.

`end_time`

integer

Time when the study period ends.

Obrigatório

`name`

string

Name of the study.

Obrigatório

`objectives`

list<Object>

A vector of objects describing the objectives assigned to this study.

`id`

numeric string or integer

`is_primary`

boolean

`name`

string

`type`

enum {SALES, NONSALES, MAE, TELCO, FTL, MAI, PARTNER, BRANDLIFT, BRAND, MPC\_CONVERSION, CONVERSIONS}

`offsite_datasets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`adspixels`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`customconversions`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`applications`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`offline_conversion_data_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_catalogs`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`observation_end_time`

integer

The end of the observation period for this study. This period starts when the study period ends.

`start_time`

integer

The time when the study period starts.

Obrigatório

`type`

enum {LIFT, SPLIT\_TEST, CONTINUOUS\_LIFT\_CONFIG, GEO\_LIFT, BACKEND\_AB\_TESTING, CREATIVE\_SPEND\_ENFORCEMENT}

The type of ad study, such as `SPLIT_TEST` or `LIFT`.

`viewers`

list<int>

This study is shared with these people.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)