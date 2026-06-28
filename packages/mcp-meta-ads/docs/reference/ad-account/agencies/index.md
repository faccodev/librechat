---
title: "Graph API Referência v24.0: Ad Account Agencies"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/agencies/"
scraped_at: "2026-02-01T16:11:39.110Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Agencies

[](#)

## Leitura

Agencies associated with ad accounts

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fagencies&version=v24.0)

```
GET /v24.0/{ad-account-id}/agencies HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/agencies',
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
    "/{ad-account-id}/agencies",
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
    "/{ad-account-id}/agencies",
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
                               initWithGraphPath:@"/{ad-account-id}/agencies"
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

Uma lista de nós [Business](/docs/marketing-api/reference/business/).

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`access_requested_time`

datetime

The creation time of the access request

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`access_status`

enum

The status of the access request

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`access_updated_time`

datetime

The update time of the access request

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`permitted_tasks`

list<string>

The permissions of tasks associated with the access request

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

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

You can dissociate a [Business](/docs/marketing-api/reference/business/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/agencies`](/docs/marketing-api/reference/ad-account/agencies/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string

SELF\_EXPLANATORY

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)