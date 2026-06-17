---
title: "Custom Audience Ad Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-audience/adaccounts"
scraped_at: "2026-02-01T14:26:21.532Z"
---

Versão Graph API

[v24.0](#)

# GET Custom Audience Ad Accounts

[](#)

## Leitura

Custom audience ad accounts

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bcustom-audience-id%7D%2Fadaccounts&version=v24.0)

```
GET /v24.0/{custom-audience-id}/adaccounts HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{custom-audience-id}/adaccounts',
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
    "/{custom-audience-id}/adaccounts",
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
    "/{custom-audience-id}/adaccounts",
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
                               initWithGraphPath:@"/{custom-audience-id}/adaccounts"
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

`permissions`

string

Optional permission filter for the shared ad account IDs. Values can be `targeting` for getting account IDs with only targeting permissions, or `targeting_and_insights` to get account IDs with both targeting and insights permissions.If not set, it will return all shared ad account IDs.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [CustomAudienceAdAccount](/docs/marketing-api/reference/custom-audience-ad-account/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

To share audiences with other ad accounts, a business must claim the owner ad account and recipient ad accounts.

The recipient ad account can include or exclude the shared custom audience in targeting spec. Optionally, the recipient ad account can also have the access to view the audience insights with the insights tool. If the optional permissions parameter is not set, the default is `targeting_and_insights`.

You can share audiences with other ad accounts via the [`ad_accounts`](https://developers.facebook.com/docs/marketing-api/reference/custom-audience/ad_accounts/#Creating) edge.

The destination account cannot modify the audience or use it as a seed audience to create lookalikes.

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You **can** also unshare an audience with an ad account by specifying [`delete`](https://developers.facebook.com/docs/marketing-api/reference/custom-audience/ad_accounts/#Deleting) to the same endpoint with the `ad_accounts` field set to the ad account you want to remove access. Any existing ads running from these accounts using this audience will be stopped and cannot be restarted.

Não é possível executar esta operação neste ponto de extremidade.

[](#)