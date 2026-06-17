---
title: "Graph API Referência v24.0: Ad Account Dsa Recommendations"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/dsa_recommendations"
scraped_at: "2026-02-01T15:34:39.692Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Dsa Recommendations

[](#)

As part of the requirements set forth by the European Union (EU) Digital Services Act (DSA), we've begun requiring ads targeting any part of the EU to provide string values defining the beneficiary and payor of the ad being created. In order to facilitate developers in providing this mandatory information, we're offering a new API that outputs a list of strings that we've identified to likely be the beneficiary/payer, based on recent activity of the ad account. See the [Ad Account DSA Recommendations](/docs/marketing-api/reference/ad-account-dsa-recommendations/) field reference for more information.

**Note:** Even though our data suggests that these predicted values often match up with what advertisers end up manually inputting for their DSA Beneficiary/Payor, we don't guarantee that these will be correct, and users should still review them before publishing their campaigns.

[](#)

## Leitura

AdAccountDsaRecommendations

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fdsa_recommendations&version=v24.0)

```
GET /v24.0/{ad-account-id}/dsa_recommendations HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/dsa_recommendations',
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
    "/{ad-account-id}/dsa_recommendations",
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
    "/{ad-account-id}/dsa_recommendations",
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
                               initWithGraphPath:@"/{ad-account-id}/dsa_recommendations"
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

Uma lista de nós [AdAccountDsaRecommendations](/docs/marketing-api/reference/ad-account-dsa-recommendations/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

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

Não é possível executar esta operação neste ponto de extremidade.

[](#)