---
title: "Graph API Referência v24.0: Campaign Adrules Governed"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/adrules_governed/"
scraped_at: "2026-02-01T14:20:56.197Z"
---

Versão Graph API

[v24.0](#)

# Campaign Adrules Governed

[](#)

## Leitura

Ad rules that govern this campaign - by default, this only returns rules that either directly mention the campaign by id or indirectly through the set entity\_type

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bcampaign-id%7D%2Fadrules_governed&version=v24.0)

```
GET /v24.0/{campaign-id}/adrules_governed HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{campaign-id}/adrules_governed',
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
    "/{campaign-id}/adrules_governed",
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
    "/{campaign-id}/adrules_governed",
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
                               initWithGraphPath:@"/{campaign-id}/adrules_governed"
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

`pass_evaluation`

boolean

If set, this will further filter the rules to only include those for which the campaign would evaluate to the boolean value of this param

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [AdRule](/docs/marketing-api/reference/ad-rule/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

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