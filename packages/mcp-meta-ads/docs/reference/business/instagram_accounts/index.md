---
title: "Graph API Referência v24.0: Business Instagram Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/instagram_accounts/"
scraped_at: "2026-02-01T16:09:03.051Z"
---

Versão Graph API

[v24.0](#)

# Business Instagram Accounts

[](#)

## Leitura

This business can access these Instagram accounts.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Finstagram_accounts&version=v24.0)

```
GET /v24.0/{business-id}/instagram_accounts HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/instagram_accounts',
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
    "/{business-id}/instagram_accounts",
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
    "/{business-id}/instagram_accounts",
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
                               initWithGraphPath:@"/{business-id}/instagram_accounts"
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

Uma lista de nós [IGUser](/docs/graph-api/reference/shadow-ig-user/).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/instagram_accounts`](/docs/marketing-api/reference/business/instagram_accounts/).

### Parâmetros

Parâmetro

Descrição

`instagram_account`

numeric string

Instagram account ID.

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