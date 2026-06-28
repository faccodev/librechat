---
title: "Graph API Referência v24.0: Business Pending Owned Ad Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/pending_owned_ad_accounts/"
scraped_at: "2026-02-01T16:10:19.007Z"
---

Versão Graph API

[v24.0](#)

# Business Pending Owned Ad Accounts

[](#)

## Leitura

This business requested ownership of these ad accounts. And the requests are still pending approval.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fpending_owned_ad_accounts&version=v24.0)

```
GET /v24.0/{business-id}/pending_owned_ad_accounts HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/pending_owned_ad_accounts',
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
    "/{business-id}/pending_owned_ad_accounts",
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
    "/{business-id}/pending_owned_ad_accounts",
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
                               initWithGraphPath:@"/{business-id}/pending_owned_ad_accounts"
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

Uma lista de nós BusinessAdAccountRequest.

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

int32

Total number of accounts.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

368

The action attempted has been deemed abusive or is otherwise disallowed

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