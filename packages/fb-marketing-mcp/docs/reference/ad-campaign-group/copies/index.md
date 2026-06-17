---
title: "Graph API Referência v24.0: Campaign Copies"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/copies/"
scraped_at: "2026-02-01T14:21:12.486Z"
---

Versão Graph API

[v24.0](#)

# Campaign Copies

[](#)

Create a duplicate campaign based on an existing one.

The Marketing API has it is own rate limiting logic. If you are encountering errors mentioning a reached limit, see [Rate Limiting](/docs/marketing-apis/rate-limiting).

[](#)

## Leitura

This endpoint returns copies of a specific ad campaign.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bcampaign-id%7D%2Fcopies&version=v24.0)

```
GET /v24.0/{campaign-id}/copies HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{campaign-id}/copies',
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
    "/{campaign-id}/copies",
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
    "/{campaign-id}/copies",
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
                               initWithGraphPath:@"/{campaign-id}/copies"
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

Parâmetro

Descrição

`date_preset`

enum{today, yesterday, this\_month, last\_month, this\_quarter, maximum, data\_maximum, last\_3d, last\_7d, last\_14d, last\_28d, last\_30d, last\_90d, last\_week\_mon\_sun, last\_week\_sun\_sat, last\_quarter, last\_year, this\_week\_mon\_today, this\_week\_sun\_today, this\_year}

Preset date range used to aggregate insights metrics

`effective_status`

list<enum{ACTIVE, PAUSED, DELETED, PENDING\_REVIEW, DISAPPROVED, PREAPPROVED, PENDING\_BILLING\_INFO, CAMPAIGN\_PAUSED, ARCHIVED, ADSET\_PAUSED, IN\_PROCESS, WITH\_ISSUES}>

Valor padrão: `Vec`

Filter adsets by effective status

`is_completed`

boolean

Filter adsets by completed status

`time_range`

{'since':YYYY-MM-DD,'until':YYYY-MM-DD}

Time range used to aggregate insights metrics

`since`

datetime

A date in the format of "YYYY-MM-DD", which means from the beginning midnight of that day.

`until`

datetime

A date in the format of "YYYY-MM-DD", which means to the beginning midnight of the following day.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [Campaign](/docs/marketing-api/reference/ad-campaign-group/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=insights`).

Campo

Descrição

`insights`

Edge<AdsInsights>

Analytics summary for all objects

`total_count`

unsigned int32

Total number of objects

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

100

Invalid parameter

104

Incorrect signature

[](#)

## Criando

You can make a POST request to `copies` edge from the following paths:

-   [`/{campaign_id}/copies`](/docs/marketing-api/reference/ad-campaign-group/copies/)

When posting to this edge, a [Campaign](/docs/marketing-api/reference/ad-campaign-group/) will be created.

### Parâmetros

Parâmetro

Descrição

`deep_copy`

boolean

Valor padrão: `false`

Whether to copy all the child ads. Limits: the total number of children ads to copy should not exceed 3 for a synchronous call and 51 for an asynchronous call.

`end_time`

datetime

For deep copy, the end time of the sets under the copied campaign, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp. When creating a set with a daily budget, specify `end_time=0` to set the set to be ongoing without end date. If not set, the copied sets will inherit the end time from the original set

`parameter_overrides`

Campaign spec

parameter\_overrides

`rename_options`

JSON or object-like arrays

Rename options

`rename_strategy`

enum {DEEP\_RENAME, ONLY\_TOP\_LEVEL\_RENAME, NO\_RENAME}

Valor padrão: `ONLY_TOP_LEVEL_RENAME`

`DEEP_RENAME`: will change this object's name and children's names in the copied object. `ONLY_TOP_LEVEL_RENAME`: will change the this object's name but won't change the children's name in the copied object. `NO_RENAME`: will change no name in the copied object

`rename_prefix`

string

A prefix to copy names. Defaults to null if not provided.

`rename_suffix`

string

A suffix to copy names. Defaults to null if not provided and appends a localized string of `- Copy` based on the ad account locale.

`start_time`

datetime

For deep copy, the start time of the sets under the copied campaign, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp. If not set, the copied sets will inherit the start time from the original set

`status_option`

enum {ACTIVE, PAUSED, INHERITED\_FROM\_SOURCE}

Valor padrão: `PAUSED`

`ACTIVE`: the copied campaign will have active status. `PAUSED`: the copied campaign will have paused status. `INHERITED_FROM_SOURCE`: the copied campaign will have the parent status.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `copied_campaign_id` in the return type.

Struct {

`copied_campaign_id`: numeric string,

`ad_object_ids`: List \[

Struct {

`ad_object_type`: enum {unique\_adcreative, ad, ad\_set, campaign, opportunities, privacy\_info\_center, topline, ad\_account, product},

`source_id`: numeric string,

`copied_id`: numeric string,

}

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

200

Permissions error

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)