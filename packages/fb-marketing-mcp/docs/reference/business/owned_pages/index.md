---
title: "Graph API Referência v24.0: Business Owned Pages"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/owned_pages/"
scraped_at: "2026-02-01T16:09:49.573Z"
---

Versão Graph API

[v24.0](#)

# Business Owned Pages

[](#)

## Leitura

Get all Facebook pages owned by this business.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fowned_pages&version=v24.0)

```
GET /v24.0/{business-id}/owned_pages HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/owned_pages',
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
    "/{business-id}/owned_pages",
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
    "/{business-id}/owned_pages",
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
                               initWithGraphPath:@"/{business-id}/owned_pages"
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

Uma lista de nós [Page](/docs/graph-api/reference/page/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

int32

Total number of pages for this business.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

200

Permissions error

190

Invalid OAuth 2.0 Access Token

104

Incorrect signature

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

80002

There have been too many calls to this Instagram account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

[](#)

## Criando

You can make a POST request to `owned_pages` edge from the following paths:

-   [`/{business_id}/owned_pages`](/docs/marketing-api/reference/business/owned_pages/)

When posting to this edge, a [Page](/docs/graph-api/reference/page/) will be created.

### Parâmetros

Parâmetro

Descrição

`entry_point`

string

entry point of claiming BusinessClaimAssetEntryPoint

`page_id`

Page ID

Page ID.

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`access_status`: string,

}

### Error Codes

Erro

Descrição

3944

Your Business Manager already has access to this object.

3977

To claim a Page in Business Manager, you must already be an Admin of the Page.

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

100

Invalid parameter

42001

This Page can't be removed because it's already linked to an Instagram business profile. To remove this Page from Business Manager, go to Instagram and convert to a personal account or change the Page linked to your business profile.

200

Permissions error

413

Invalid password

3982

You do not have sufficient permissions to import this asset into the given Business Manager.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)