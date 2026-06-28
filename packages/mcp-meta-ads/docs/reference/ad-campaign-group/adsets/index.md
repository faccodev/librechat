---
title: "Graph API Referência v24.0: Campaign Adsets"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/adsets/"
scraped_at: "2026-02-01T14:21:06.967Z"
---

Versão Graph API

[v24.0](#)

# Campaign Adsets

[](#)

## Leitura

Edge query from Ad Campaign to Ad Sets

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=%3CAD_CAMPAIGN_ID%3E%2Fadsets%3Ffields%3Dname%252Cstart_time%252Cend_time%252Cdaily_budget%252Clifetime_budget&version=v24.0)

```
GET /v24.0/<AD_CAMPAIGN_ID>/adsets?fields=name%2Cstart_time%2Cend_time%2Cdaily_budget%2Clifetime_budget HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/<AD_CAMPAIGN_ID>/adsets?fields=name%2Cstart_time%2Cend_time%2Cdaily_budget%2Clifetime_budget',
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
    "/<AD_CAMPAIGN_ID>/adsets",
    {
        "fields": "name,start_time,end_time,daily_budget,lifetime_budget"
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
params.putString("fields", "name,start_time,end_time,daily_budget,lifetime_budget");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<AD_CAMPAIGN_ID>/adsets",
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
  @"fields": @"name,start_time,end_time,daily_budget,lifetime_budget",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<AD_CAMPAIGN_ID>/adsets"
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
  -d 'fields="name,start_time,end_time,daily_budget,lifetime_budget"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<AD_CAMPAIGN_ID>/adsets
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

Uma lista de nós [AdSet](/docs/marketing-api/reference/ad-campaign/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=insights`).

Campo

Descrição

`insights`

Edge<AdsInsights>

An analytics summary result for an Ad object

`total_count`

unsigned int32

Total number of ad objects returned by the query

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

613

Calls to this api have exceeded the rate limit.

100

Invalid parameter

200

Permissions error

3018

The start date of the time range cannot be beyond 37 months from the current date

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

104

Incorrect signature

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

2500

Error parsing graph query

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