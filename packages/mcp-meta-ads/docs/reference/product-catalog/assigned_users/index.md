---
title: "Graph API Referência v24.0: Product Catalog Assigned Users"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/assigned_users/"
scraped_at: "2026-02-01T14:19:33.724Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Assigned Users

[](#)

## Leitura

ProductCatalogAssignedUsers

### Permissions

-   `ads_management`
-   `catalog_management`

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fassigned_users&version=v24.0)

```
GET /v24.0/{product-catalog-id}/assigned_users HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/assigned_users',
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
    "/{product-catalog-id}/assigned_users",
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
    "/{product-catalog-id}/assigned_users",
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
                               initWithGraphPath:@"/{product-catalog-id}/assigned_users"
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

`business`

numeric string

The business associated with this catalog

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AssignedUser.

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`permitted_tasks`

list<string>

Tasks that are assignable on this object

`tasks`

list<string>

All unpacked roles/tasks of this particular user on this object

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

unsigned int32

Total number of business and system users assigned to this catalog

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Criando

You can make a POST request to `assigned_users` edge from the following paths:

-   [`/{product_catalog_id}/assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Permissions

-   `catalog_management`

### Parâmetros

Parâmetro

Descrição

`tasks`

array<enum {MANAGE, ADVERTISE, MANAGE\_AR, AA\_ANALYZE}>

Catalog permission tasks to assign this user

Obrigatório

`user`

UID

Business user id or system user id

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) from a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a DELETE request to [`/{product_catalog_id}/assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/).

### Parâmetros

Parâmetro

Descrição

`user`

UID

Business user id or system user id

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)