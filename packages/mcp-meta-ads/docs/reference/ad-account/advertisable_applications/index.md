---
title: "Graph API Referência v24.0: Ad Account Advertisable Applications"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/advertisable_applications/"
scraped_at: "2026-02-01T14:33:50.306Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Advertisable Applications

[](#)

A call to this edge returns the Ad Account's advertisable applications.

### Restrictions

Applications in developer mode are only returned if the access token belongs to a user who is an admin on the app. The restrictions do not apply to apps that are live.

[](#)

## Leitura

Advertisable Applications edge

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fadvertisable_applications&version=v24.0)

```
GET /v24.0/{ad-account-id}/advertisable_applications HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/advertisable_applications',
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
    "/{ad-account-id}/advertisable_applications",
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
    "/{ad-account-id}/advertisable_applications",
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
                               initWithGraphPath:@"/{ad-account-id}/advertisable_applications"
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

`app_id`

numeric string or integer

Specify App ID for the specific application.

`business_id`

numeric string or integer

Specify Business ID for applications under a specific business.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [Application](/docs/graph-api/reference/application/).

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`advertisable_app_events`

list<string>

Available app events to be advertised

`cpa_access`

CPA

CPA Access for apps

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

3000

Reading insights of a Page, business, app, domain or event source group not owned by the querying user or application

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

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