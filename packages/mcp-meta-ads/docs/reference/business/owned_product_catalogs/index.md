---
title: "Graph API Referência v24.0: Business Owned Product Catalogs"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/owned_product_catalogs/"
scraped_at: "2026-02-01T14:19:21.390Z"
---

Versão Graph API

[v24.0](#)

# Business Owned Product Catalogs

[](#)

## Leitura

Product catalogs owned by this business.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fowned_product_catalogs&version=v24.0)

```
GET /v24.0/{business-id}/owned_product_catalogs HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/owned_product_catalogs',
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
    "/{business-id}/owned_product_catalogs",
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
    "/{business-id}/owned_product_catalogs",
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
                               initWithGraphPath:@"/{business-id}/owned_product_catalogs"
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

Uma lista de nós [ProductCatalog](/docs/marketing-api/reference/product-catalog/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80009

There have been too many calls to this Catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

190

Invalid OAuth 2.0 Access Token

104

Incorrect signature

[](#)

## Criando

You can make a POST request to `owned_product_catalogs` edge from the following paths:

-   [`/{business_id}/owned_product_catalogs`](/docs/marketing-api/reference/business/owned_product_catalogs/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Parâmetros

Parâmetro

Descrição

`additional_vertical_option`

enum {LOCAL\_DA\_CATALOG, LOCAL\_PRODUCTS}

Additional catalog configurations that does not introduce either new verticals or subverticals

`business_metadata`

JSON object

business\_metadata

`page_id`

numeric string

page\_id

Obrigatório

`external_business_id`

string

external\_business\_id

`catalog_segment_filter`

A JSON-encoded rule

Provide filter for catalog to create a catalog segment.

`da_display_settings`

Object

Dynamic Ads display settings.

`carousel_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`single_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`destination_catalog_settings`

JSON object

Destination catalog settings.

`generate_items_from_pages`

boolean

Valor padrão: `false`

`flight_catalog_settings`

JSON object

Flight catalog settings.

`generate_items_from_events`

boolean

Valor padrão: `false`

`name`

UTF-8 encoded string

Name of the catalog.

Obrigatório

`parent_catalog_id`

numeric string or integer

Parent catalog ID.

`partner_integration`

JSON object

Partner integration settings

`external_access_token`

string

External access token

`external_merchant_id`

string

External merchant identifier

`store_catalog_settings`

JSON object

Store catalog settings.

`page_id`

numeric string

page\_id

Obrigatório

`vertical`

enum {adoptable\_pets, commerce, destinations, flights, generic, home\_listings, hotels, local\_service\_businesses, offer\_items, offline\_commerce, transactable\_items, vehicles}

Valor padrão: `commerce`

The catalog's industry or vertical, such as `commerce`.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

804

Specified object already exists

102

Session key invalid or no longer valid

200

Permissions error

2310019

The business of this catalog is not onboarded to Collaborative Ads

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)