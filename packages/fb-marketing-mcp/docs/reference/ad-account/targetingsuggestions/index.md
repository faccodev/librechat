---
title: "Graph API Referência v24.0: Ad Account Targetingsuggestions"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/targetingsuggestions/"
scraped_at: "2026-02-01T16:04:43.891Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Targetingsuggestions

[](#)

## Leitura

Retrieve suggestions for given targeting specs.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Ftargetingsuggestions&version=v24.0)

```
GET /v24.0/{ad-account-id}/targetingsuggestions HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/targetingsuggestions',
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
    "/{ad-account-id}/targetingsuggestions",
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
    "/{ad-account-id}/targetingsuggestions",
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
                               initWithGraphPath:@"/{ad-account-id}/targetingsuggestions"
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

`app_store`

enum {all\_app\_stores\_for\_android\_and\_ios, amazon\_app\_store, google\_play, itunes, itunes\_ipad, fb\_canvas, fb\_gameroom, windows\_store, fb\_android\_store, windows\_10\_store, roku\_channel\_store, instant\_game, oculus\_app\_store, horizon\_world, galaxy\_store, neon\_android\_store, digital\_turbine\_store, apk\_pure, apk\_monk, apk\_mirror, xiaomi, oppo, vivo, bemobi\_mobile\_store, aptoide\_a1\_store, uptodown, does\_not\_exist, none}

The app store for which this ad is being promoted. This is typically only for app install campaign objectives.

`limit_type`

enum {interests, user\_adclusters, behaviors, family\_statuses, home\_value, income, industries, life\_events, interested\_in, relationship\_statuses, education\_statuses, college\_years, work\_employers, work\_positions, education\_majors, education\_schools, location\_categories}

Used to limit the type of audience to be retrieved.

`regulated_categories`

array<enum {NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}>

The regulated categories of the campaign

`targeting_list`

list<JSON or object-like arrays>

List of targeting specs. Example: \[{"type":"interests", "id":1}, {"type":"interests", "id":2}, {"type":"behaviors", "id":3}\]

`type`

enum {interests, user\_adclusters, behaviors, family\_statuses, home\_value, income, industries, life\_events, interested\_in, relationship\_statuses, education\_statuses, college\_years, work\_employers, work\_positions, education\_majors, education\_schools, location\_categories}

`id`

int64

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AdAccountTargetingUnified.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

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