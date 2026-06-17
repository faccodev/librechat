---
title: "Ad Account Ad Images"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/adimages/"
scraped_at: "2026-02-01T16:05:59.545Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Ad Images

[](#)

## Leitura

Ad Images that belong to this Ad Account.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fadimages&version=v24.0)

```
GET /v24.0/{ad-account-id}/adimages HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/adimages',
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
    "/{ad-account-id}/adimages",
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
    "/{ad-account-id}/adimages",
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
                               initWithGraphPath:@"/{ad-account-id}/adimages"
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

`biz_tag_id`

int64

Business tag ID to filter images.

`business_id`

numeric string or integer

Optional. Assists with filters such as recently used.

`hashes`

list<string>

Hash of the image.

`minheight`

int64

Minimum height of the image.

`minwidth`

int64

Minimum width of the image.

`name`

string

Image name used in image names filter.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [AdImage](/docs/marketing-api/reference/ad-image/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

int32

Total number of images in the Ad Account.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

[](#)

## Criando

You can make a POST request to `adimages` edge from the following paths:

-   [`/act_{ad_account_id}/adimages`](/docs/marketing-api/reference/ad-account/adimages/)

When posting to this edge, an [AdImage](/docs/marketing-api/reference/ad-image/) will be created.

### Parâmetros

Parâmetro

Descrição

`bytes`

Base64 UTF-8 string

Image file. Example: `bytes = <image content in bytes format>`

`copy_from`

JSON or object-like arrays

This copies the Ad Image from the source to the destination account.  
`{"source_account_id":"<SOURCE_ACCOUNT_ID>"`, `"hash":"02bee5277ec507b6fd0f9b9ff2f22d9c"}`

`source_account_id`

numeric string

`hash`

string

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `images` in the return type.

Map {

string: Map {

string: Struct {

`hash`: string,

`url`: string,

`url_128`: string,

`url_256`: string,

`url_256_height`: string,

`url_256_width`: string,

`height`: int32,

`width`: int32,

`name`: string,

}

}

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

613

Calls to this api have exceeded the rate limit.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate an [AdImage](/docs/marketing-api/reference/ad-image/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/adimages`](/docs/marketing-api/reference/ad-account/adimages/).

### Parâmetros

Parâmetro

Descrição

`hash`

string

Hash of the image you wish to delete.

Obrigatório

`image_id`

string

ID of the image you wish to delete.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

[](#)