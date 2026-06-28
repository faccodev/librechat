---
title: "Graph API Referência v24.0: Ad Account Customaudiencestos"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/customaudiencestos/"
scraped_at: "2026-02-01T14:34:31.279Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Customaudiencestos

[](#)

## Leitura

AdAccountCustomAudiencesTOS

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fcustomaudiencestos&version=v24.0)

```
GET /v24.0/{ad-account-id}/customaudiencestos HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/customaudiencestos',
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
    "/{ad-account-id}/customaudiencestos",
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
    "/{ad-account-id}/customaudiencestos",
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
                               initWithGraphPath:@"/{ad-account-id}/customaudiencestos"
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

Uma lista de nós [CustomAudiencesTOS](/docs/marketing-api/custom-audience-targeting/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

[](#)

## Criando

You can make a POST request to `customaudiencestos` edge from the following paths:

-   [`/act_{ad_account_id}/customaudiencestos`](/docs/marketing-api/reference/ad-account/customaudiencestos/)

When posting to this edge, no Graph object will be created.

### Parâmetros

Parâmetro

Descrição

`business_id`

string

SELF\_EXPLANATORY

`tos_id`

string

SELF\_EXPLANATORY

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)