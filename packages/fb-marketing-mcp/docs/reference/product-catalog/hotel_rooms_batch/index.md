---
title: "Graph API Referência v24.0: Product Catalog Hotel Rooms Batch"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/hotel_rooms_batch/"
scraped_at: "2026-02-01T16:14:54.305Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Hotel Rooms Batch

[](#)

## Leitura

hotel\_rooms\_batch

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fhotel_rooms_batch&version=v24.0)

```
GET /v24.0/{product-catalog-id}/hotel_rooms_batch HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/hotel_rooms_batch',
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
    "/{product-catalog-id}/hotel_rooms_batch",
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
    "/{product-catalog-id}/hotel_rooms_batch",
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
                               initWithGraphPath:@"/{product-catalog-id}/hotel_rooms_batch"
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

`handle`

string

A unique handle of a batch request.

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós ProductCatalogHotelRoomsBatch.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

You can make a POST request to `hotel_rooms_batch` edge from the following paths:

-   [`/{product_catalog_id}/hotel_rooms_batch`](/docs/marketing-api/reference/product-catalog/hotel_rooms_batch/)

When posting to this edge, a [ProductCatalogHotelRoomsBatch](/docs/graph-api/reference/product-catalog-hotel-rooms-batch/) will be created.

### Parâmetros

Parâmetro

Descrição

`file`

file

Content of the file to be uploaded

`password`

string

If used url then the password for the file

`standard`

enum{google}

Uploaded file export standard

Obrigatório

`update_only`

boolean

Valor padrão: `false`

If true, rows missing in the file will not be deleted from Facebook database (only new and updated rows are applied)

`url`

URL

The url of the file to be downloaded by our system

`username`

string

If used url then the username for the file

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`handles`: List \[

string

\],

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