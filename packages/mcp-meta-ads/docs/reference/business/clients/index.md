---
title: "Graph API Referência v24.0: Business Clients"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/clients/"
scraped_at: "2026-02-01T16:08:20.207Z"
---

Versão Graph API

[v24.0](#)

# Business Clients

[](#)

## Leitura

List all businesses that gave you access to one or more of their assets.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fclients&version=v24.0)

```
GET /v24.0/{business-id}/clients HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/clients',
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
    "/{business-id}/clients",
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
    "/{business-id}/clients",
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
                               initWithGraphPath:@"/{business-id}/clients"
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

Uma lista de nós [Business](/docs/marketing-api/reference/business/).

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`adaccount_permissions`

list<AdAccountPermission>

Adaccount\_permissions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`application_permissions`

list<AppPermission>

Application\_permissions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page_permissions`

list<PagePermission>

Page\_permissions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`productcatalog_permissions`

list<ProductCatalogPermission>

Productcatalog\_permissions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`shared_ca_count`

int32

Shared\_ca\_count

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

unsigned int32

Total number of businesses.

### Error Codes

Erro

Descrição

190

Invalid OAuth 2.0 Access Token

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/clients`](/docs/marketing-api/reference/business/clients/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string

The client's business.

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