---
title: "Graph API Referência v24.0: Ad Account Targetingvalidation"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/targetingvalidation"
scraped_at: "2026-02-01T15:43:27.314Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Targetingvalidation

[](#)

## Leitura

Query the ads framework for validation

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Ftargetingvalidation&version=v24.0)

```
GET /v24.0/{ad-account-id}/targetingvalidation HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/targetingvalidation',
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
    "/{ad-account-id}/targetingvalidation",
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
    "/{ad-account-id}/targetingvalidation",
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
                               initWithGraphPath:@"/{ad-account-id}/targetingvalidation"
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

`id_list`

list<int64>

List of IDs to validate. Supports interest and categories.

`is_exclusion`

boolean

Valor padrão: `false`

Whether the targeting IDs can be used in exclusion.

`name_list`

list<string>

List of names to validate. Supports interest and categories.

`targeting_list`

list<JSON or object-like arrays>

List with targeting type and ID pairs

`type`

enum {interests, education\_statuses, education\_schools, education\_majors, work\_positions, work\_employers, interested\_in, relationship\_statuses, college\_years, family\_statuses, industries, life\_events, political\_views, politics, behaviors, income, net\_worth, home\_type, home\_ownership, home\_value, ethnic\_affinity, generation, household\_composition, moms, office\_type, user\_adclusters}

`id`

int64

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

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

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