---
title: "Graph API Referência v24.0: Business Client Offsite Signal Container Business Objects"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/client_offsite_signal_container_business_objects/"
scraped_at: "2026-02-01T16:07:44.043Z"
---

Versão Graph API

[v24.0](#)

# Business Client Offsite Signal Container Business Objects

[](#)

## Leitura

BusinessClientOffsiteSignalContainerBusinessObjects

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fclient_offsite_signal_container_business_objects&version=v24.0)

```
GET /v24.0/{business-id}/client_offsite_signal_container_business_objects HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/client_offsite_signal_container_business_objects',
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
    "/{business-id}/client_offsite_signal_container_business_objects",
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
    "/{business-id}/client_offsite_signal_container_business_objects",
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
                               initWithGraphPath:@"/{business-id}/client_offsite_signal_container_business_objects"
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

Uma lista de nós OffsiteSignalContainerBusinessObject.

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`permitted_tasks`

list<string>

Tasks that are assignable to users on this asset

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

int32

total\_count

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Error Codes

Erro

Descrição

368

The action attempted has been deemed abusive or is otherwise disallowed

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