---
title: "Graph API Referência v24.0: Ad Account Account Controls"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/account_controls"
scraped_at: "2026-02-01T15:44:18.786Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Account Controls

[](#)

## Leitura

Get default fields on an [AdAccountBusinessConstraints](/docs/marketing-api/reference/ad-account-business-constraints/) node associated with this [AdAccount](/docs/marketing-api/reference/ad-account). Refer to the [AdAccountBusinessConstraints](/docs/marketing-api/reference/ad-account-business-constraints/) reference for a list of these fields and their descriptions.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Faccount_controls&version=v24.0)

```
GET /v24.0/{ad-account-id}/account_controls HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/account_controls',
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
    "/{ad-account-id}/account_controls",
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
    "/{ad-account-id}/account_controls",
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
                               initWithGraphPath:@"/{ad-account-id}/account_controls"
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

Uma lista de nós [AdAccountBusinessConstraints](/docs/marketing-api/reference/ad-account-business-constraints/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

[](#)

## Criando

You can make a POST request to `account_controls` edge from the following paths:

-   [`/act_{ad_account_id}/account_controls`](/docs/marketing-api/reference/ad-account/account_controls/)

When posting to this edge, an [AdAccountBusinessConstraints](/docs/marketing-api/reference/ad-account-business-constraints/) will be created.

### Parâmetros

Parâmetro

Descrição

`audience_controls`

JSON or object-like arrays

audience\_controls

Obrigatório

`age_min`

int64

`geo_locations`

JSON or object-like arrays

`excluded_geo_locations`

JSON or object-like arrays

`exclusions`

JSON or object-like arrays

`placement_controls`

JSON or object-like arrays

This field contains another field called placement\_exclusion that provides information on which placements need to be excluded while targeting. All the other placements will be included. Each placement is denoted by a string that concatenates the publisher platform of the placement and a position inside the publisher platform, separated by an underscore. What is provided as parameter is a list of placements. For e.g. If we want to exclude the rewarded videos position from the audience network publisher platform, we provide the field as follows: { "placement\_controls": { "placement\_exclusions": \["audience\_network\_rewarded\_video"\] } } Only a few placements are allowed to be excluded: audience\_network\_classic (native, banner & interstitial positions of audience network) audience\_network\_rewarded\_video (rewarded videos of audience network) audience\_network\_instream\_video (instream videos of audience network) facebook\_marketplace (marketplace section inside facebook) facebook\_rhc (right hand column inside facebook)

`placement_exclusions`

array<enum {AUDIENCE\_NETWORK\_CLASSIC, AUDIENCE\_NETWORK\_REWARDED\_VIDEO, AUDIENCE\_NETWORK\_INSTREAM\_VIDEO, FACEBOOK\_MARKETPLACE, FACEBOOK\_RIGHT\_HAND\_COLUMN}>

`campaign_ids_to_set_ap`

array<numeric string>

### Return Type

Struct {

`id`: string,

`success`: bool,

`error_code`: string,

`error_message`: string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

2641

Your ad includes or excludes locations that are currently restricted

200

Permissions error

[](#)

## Atualizando

Use the [`POST /act_<AD_ACCOUNT_ID>/account_controls`](#Creating) endpoint to update the [AdAccountBusinessConstraints](/docs/marketing-api/reference/ad-account-business-constraints/) associated with this [AdAccount](/docs/marketing-api/reference/ad-account).

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)