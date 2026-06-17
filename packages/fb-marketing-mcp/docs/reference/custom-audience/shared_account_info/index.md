---
title: "Custom Audience, Shared Account Info"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-audience/shared_account_info/"
scraped_at: "2026-02-01T14:29:51.169Z"
---

Versão Graph API

[v24.0](#)

# Custom Audience Shared Account Info

[](#)

Information specific to each ad account that has access to a custom audience shared with the account. Includes sharing status for the audience, such as `SHARED`, `IN_PROGRESS` and `NOT_SHARED`.

Only audiences shared outside of your business are covered by sharing agreements. Therefore this field is `null` in all other cases to avoid confusion.

For information about sharing a custom audiences between businesse, see [Business Manager API, Sharing Custom Audiences between Business Managers](/docs/marketing-api/businessmanager/assets#share) .

[](#)

## Leitura

CustomAudiencesharedAccountInfo

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bcustom-audience-id%7D%2Fshared_account_info&version=v24.0)

```
GET /v24.0/{custom-audience-id}/shared_account_info HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{custom-audience-id}/shared_account_info',
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
    "/{custom-audience-id}/shared_account_info",
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
    "/{custom-audience-id}/shared_account_info",
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
                               initWithGraphPath:@"/{custom-audience-id}/shared_account_info"
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

Uma lista de nós CustomAudiencesharedAccountInfo.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

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