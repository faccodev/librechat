---
title: "Graph API Referência v24.0: Saved Audience"
source: "https://developers.facebook.com/docs/marketing-api/reference/saved-audience"
scraped_at: "2026-02-01T14:26:01.167Z"
---

Versão Graph API

[v24.0](#)

# Saved Audience

[](#)

To improve how advertisers create and manage their audiences, Saved Audiences that have not been used in any active ad sets in over two years will be automatically deleted on a rolling basis. For more information, see the [Custom Audiences Overview](/docs/marketing-api/audiences/overview#custom-audiences-deletion) documentation.

[](#)

## Leitura

Object representing a targeting spec that has been saved for later use.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bsaved-audience-id%7D&version=v24.0)

```
GET /v24.0/{saved-audience-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{saved-audience-id}',
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
    "/{saved-audience-id}",
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
    "/{saved-audience-id}",
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
                               initWithGraphPath:@"/{saved-audience-id}"
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

Campo

Descrição

`id`

numeric string

ID

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`approximate_count_lower_bound`

integer

Estimated lower bound on reach of this saved audience as a 64 bit int

`approximate_count_upper_bound`

integer

Estimated upper bound on reach of this saved audience as a 64 bit int

`description`

string

Description of this saved audience provided by owner

`name`

string

Name of this saved audience

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`permission_for_actions`

AudiencePermissionForActions

Permissions for actions to the audience

`run_status`

enum

Whether the saved audience is active or deleted

`sentence_lines`

list

The targeting sentence lines of this saved audience

`targeting`

Targeting

Target spec saved in this audience

`time_created`

datetime

Creation time of this saved audience

`time_updated`

datetime

Last time the saved audience being updated by its owner

### Error Codes

Erro

Descrição

100

Invalid parameter

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

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