---
title: "Graph API Referência v24.0: Product Catalog Categories"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/categories/"
scraped_at: "2026-02-01T16:13:10.577Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Categories

[](#)

## Leitura

Categories and associated assets within given product catalog.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fcategories&version=v24.0)

```
GET /v24.0/{product-catalog-id}/categories HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/categories',
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
    "/{product-catalog-id}/categories",
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
    "/{product-catalog-id}/categories",
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
                               initWithGraphPath:@"/{product-catalog-id}/categories"
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

`categorization_criteria`

enum {BRAND, CATEGORY, PRODUCT\_TYPE}

Product property used to define categories

Obrigatório

`filter`

A JSON-encoded rule

SELF\_EXPLANATORY

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós ProductCatalogCategory.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

You can make a POST request to `categories` edge from the following paths:

-   [`/{product_catalog_id}/categories`](/docs/marketing-api/reference/product-catalog/categories/)

When posting to this edge, a [ProductCatalogCategory](/docs/graph-api/reference/product-catalog-category/) will be created.

### Parâmetros

Parâmetro

Descrição

`data`

list<JSON object>

Array of category specifications

Obrigatório

`categorization_criteria`

enum {BRAND, CATEGORY, PRODUCT\_TYPE}

Obrigatório

`criteria_value`

string

Obrigatório

`name`

UTF-8 string

Supports Emoji

`description`

UTF-8 string

Supports Emoji

`destination_uri`

URL

`image_url`

URL

`tokens`

JSON object {string : string}

### Return Type

Struct {

`updated`: integer,

`skipped`: integer,

`total`: integer,

`details`: Map {

string: List \[

Map {

string: string

}

\]

},

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)