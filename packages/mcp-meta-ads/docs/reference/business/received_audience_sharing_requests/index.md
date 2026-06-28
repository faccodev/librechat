---
title: "Graph API Referência v24.0: Business Received Audience Sharing Requests"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/received_audience_sharing_requests/"
scraped_at: "2026-02-01T16:10:48.595Z"
---

Versão Graph API

[v24.0](#)

# Business Received Audience Sharing Requests

[](#)

## Leitura

These are the audience sharing requests which are received by this business

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Freceived_audience_sharing_requests&version=v24.0)

```
GET /v24.0/{business-id}/received_audience_sharing_requests HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/received_audience_sharing_requests',
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
    "/{business-id}/received_audience_sharing_requests",
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
    "/{business-id}/received_audience_sharing_requests",
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
                               initWithGraphPath:@"/{business-id}/received_audience_sharing_requests"
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

`initiator_id`

numeric string

The id of the initiator business

`request_status`

enum {APPROVE, DECLINE, IN\_PROGRESS, EXPIRED, PENDING, PENDING\_INTEGRITY\_REVIEW, PENDING\_EMAIL\_VERIFICATION, CANCELED, MMA\_DIRECT\_ASSETS\_PENDING, MMA\_DIRECT\_ASSETS\_APPROVED, MMA\_DIRECT\_ASSETS\_DECLINED, MMA\_DIRECT\_ASSETS\_EXPIRED}

The status of the request

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós BusinessAssetSharingAgreement.

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`custom_audiences`

list<BusinessAssetSharingAgreementSharedAudienceResponseShape>

Pending custom audiences for sharing agreement

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

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