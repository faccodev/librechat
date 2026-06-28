---
title: "Graph API Referência v24.0: Ad Account Saved Audiences"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/saved_audiences/"
scraped_at: "2026-02-01T16:04:23.124Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Saved Audiences

[](#)

## Leitura

saved audiences

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fsaved_audiences&version=v24.0)

```
GET /v24.0/{ad-account-id}/saved_audiences HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/saved_audiences',
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
    "/{ad-account-id}/saved_audiences",
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
    "/{ad-account-id}/saved_audiences",
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
                               initWithGraphPath:@"/{ad-account-id}/saved_audiences"
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

`business_id`

numeric string or integer

optional param assist with filters such as recently used

`fields`

list<string>

Fields to be retrieved. Default behavior is to return only the ids.

`filtering`

list<Filter Object>

Filters on the report data. This parameter is an array of filter objects.

`field`

string

Obrigatório

`operator`

enum {EQUAL, NOT\_EQUAL, GREATER\_THAN, GREATER\_THAN\_OR\_EQUAL, LESS\_THAN, LESS\_THAN\_OR\_EQUAL, IN\_RANGE, NOT\_IN\_RANGE, CONTAIN, NOT\_CONTAIN, CONTAINS\_ANY, CONTAINS\_ALL, NOT\_CONTAINS\_ANY, STEM\_MATCH, IN, NOT\_IN, STARTS\_WITH, ENDS\_WITH, ANY, ALL, AFTER, BEFORE, ON\_OR\_AFTER, ON\_OR\_BEFORE, NONE, TOP}

Obrigatório

`value`

string

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [SavedAudience](/docs/marketing-api/reference/saved-audience/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

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