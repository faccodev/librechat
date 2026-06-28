---
title: "Graph API Referência v24.0: Product Catalog Diagnostics"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/diagnostics/"
scraped_at: "2026-02-01T16:14:15.175Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Diagnostics

[](#)

Learn more about the [Diagnostics API](/docs/marketing-api/catalog/guides/diagnostics-api), the detailed insights it provides, and guidance on resolving catalog issues that may be impacting ad performance.

[](#)

## Leitura

ProductCatalogDiagnostics

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fdiagnostics&version=v24.0)

```
GET /v24.0/{product-catalog-id}/diagnostics HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/diagnostics',
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
    "/{product-catalog-id}/diagnostics",
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
    "/{product-catalog-id}/diagnostics",
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
                               initWithGraphPath:@"/{product-catalog-id}/diagnostics"
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

`affected_channels`

list<enum{marketplace, marketplace\_ads\_deprecated, marketplace\_shops, b2c\_marketplace, c2c\_marketplace, da, daily\_deals\_legacy, daily\_deals, ig\_product\_tagging, offline\_conversions, universal\_checkout, mini\_shops, shops, whatsapp}>

Valor padrão: `Set`

affected\_channels

`affected_entities`

list<enum{product\_item, product\_catalog, product\_set, product\_event}>

Valor padrão: `Set`

affected\_entities

`affected_features`

list<enum{checkout, augmented\_reality}>

Valor padrão: `Set`

affected\_features

`severities`

list<enum{MUST\_FIX, OPPORTUNITY}>

Valor padrão: `Set`

severities

`types`

list<enum{AR\_VISIBILITY\_ISSUES, ATTRIBUTES\_INVALID, ATTRIBUTES\_MISSING, CATEGORY, CHECKOUT, DA\_VISIBILITY\_ISSUES, EVENT\_SOURCE\_ISSUES, IMAGE\_QUALITY, LOW\_QUALITY\_TITLE\_AND\_DESCRIPTION, POLICY\_VIOLATION, SHOPS\_VISIBILITY\_ISSUES}>

Valor padrão: `Set`

types

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [ProductCatalogDiagnosticGroup](/docs/graph-api/reference/product-catalog-diagnostic-group/).

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