---
title: "Ad Account Custom Conversions"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/customconversions/"
scraped_at: "2026-02-01T14:34:36.367Z"
---

Versão Graph API

[v24.0](#)

# Ad Account, Custom Conversions

[](#)

Data on custom conversion events from event sources, such as a Meta Pixel. You can query this data to measure the effectiveness of our ads. Or use it to optimize ad delivery to target people who converted as defined by your customization and rules.

[](#)

## Leitura

Ad Account Custom Conversions

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fcustomconversions&version=v24.0)

```
GET /v24.0/{ad-account-id}/customconversions HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/customconversions',
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
    "/{ad-account-id}/customconversions",
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
    "/{ad-account-id}/customconversions",
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
                               initWithGraphPath:@"/{ad-account-id}/customconversions"
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

Uma lista de nós [CustomConversion](/docs/marketing-api/reference/custom-conversion/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)

## Criando

You can make a POST request to `customconversions` edge from the following paths:

-   [`/act_{ad_account_id}/customconversions`](/docs/marketing-api/reference/ad-account/customconversions/)

When posting to this edge, a [CustomConversion](/docs/marketing-api/reference/custom-conversion/) will be created.

### Parâmetros

Parâmetro

Descrição

`action_source_type`

enum {app, chat, email, other, phone\_call, physical\_store, system\_generated, website, business\_messaging}

Action source type the custom conversion is created from.

`advanced_rule`

string

Advanced ruleset for the custom conversion being created allowing multiple sources.

`custom_event_type`

enum {ADD\_PAYMENT\_INFO, ADD\_TO\_CART, ADD\_TO\_WISHLIST, COMPLETE\_REGISTRATION, CONTENT\_VIEW, INITIATED\_CHECKOUT, LEAD, PURCHASE, SEARCH, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, LISTING\_INTERACTION, FACEBOOK\_SELECTED, OTHER}

The custom event type of the conversion being created.

`default_conversion_value`

float

Valor padrão: `0`

The default conversion value of the conversion being created.

`description`

string

The description of the conversion being created.

`event_source_id`

numeric string or integer

Event source ID, where event sources are a Pixel, offline event sets and so on. Aggregate custom conversion data from these sources.

`name`

string

The name of the conversion being created.

Obrigatório

`rule`

string

Only count an event as a custom conversion if it fulfills this rule.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`is_custom_event_type_predicted`: numeric string,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)