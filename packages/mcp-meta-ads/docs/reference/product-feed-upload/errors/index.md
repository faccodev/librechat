---
title: "Product Feed Upload Errors Edge"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-feed-upload/errors/"
scraped_at: "2026-02-01T15:54:22.172Z"
---

Versão Graph API

[v24.0](#)

# Product Feed Upload Errors

[](#)

You may experience errors in your Product Feed, with varying severities.

Errors that are `fatal` mean those items are not created, while errors with a severity of `warning` are informational but items are created.

Even when you see items with severity `fatal` the rest of the products with no errors are created.

[](#)

## Leitura

Product feed upload errors

### Examples

```
curl -G \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<UPLOAD_ID>/errors
```

The response:

```
{
  "data": [
    { 
      "id" : 1510567479166488,
      "summary" : "Group Mismatch for Property: shipping.",
      "description" : "Property shipping must have the same value for all items in the same group.",
      "severity" : "fatal",  
      "row_number" : 10,
      "column_number" : 5
    },
    { 
      "id" : 275241589314958,
      "summary" : "Price Without Currency for Property: shipping_price_value, shipping_price_currency",
      "description" : "Property shipping_price_value, shipping_price_currency is a price that has been specified without a currency.",
      "severity" : "warning",  
      "row_number" : 17,
      "column_number" : 40
    }
  ]
}
```

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-feed-upload-id%7D%2Ferrors&version=v24.0)

```
GET /v24.0/{product-feed-upload-id}/errors HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-feed-upload-id}/errors',
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
    "/{product-feed-upload-id}/errors",
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
    "/{product-feed-upload-id}/errors",
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
                               initWithGraphPath:@"/{product-feed-upload-id}/errors"
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

`error_priority`

enum {HIGH, LOW, MEDIUM}

Filters errors based on their priorities (High, Medium or Low).

High priority errors are fatal severity errors, which prevent products from being persisted. Filtering by either Medium or Low priority will return all warnings.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [ProductFeedUploadError](/docs/marketing-api/reference/product-feed-upload-error/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

int32

Total number of objects on this edge

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

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