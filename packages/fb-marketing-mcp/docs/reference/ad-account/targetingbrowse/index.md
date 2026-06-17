---
title: "Graph API Referência v24.0: Ad Account Targetingbrowse"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/targetingbrowse/"
scraped_at: "2026-02-01T16:04:29.090Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Targetingbrowse

[](#)

## Leitura

Unified browse tree as a flat list. Use parent key to recreate the tree.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Ftargetingbrowse&version=v24.0)

```
GET /v24.0/{ad-account-id}/targetingbrowse HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/targetingbrowse',
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
    "/{ad-account-id}/targetingbrowse",
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
    "/{ad-account-id}/targetingbrowse",
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
                               initWithGraphPath:@"/{ad-account-id}/targetingbrowse"
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

`include_nodes`

boolean

Include searchable nodes, for example, work/edu entries. This parameter is set as false by default. Also it is for internal use only

`limit_type`

enum {interests, education\_schools, education\_majors, work\_positions, work\_employers, relationship\_statuses, interested\_in, user\_adclusters, college\_years, education\_statuses, family\_statuses, industries, life\_events, politics, behaviors, income, net\_worth, home\_type, home\_ownership, home\_value, ethnic\_affinity, generation, household\_composition, moms, office\_type, location\_categories}

Limit the type of audience to retrieve

`regulated_categories`

array<enum {NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}>

The regulated categories of the campaign

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AdAccountTargetingUnified.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

100

Invalid parameter

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