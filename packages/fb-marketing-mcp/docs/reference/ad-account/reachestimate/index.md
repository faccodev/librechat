---
title: "Ad Account Reach Estimate"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/reachestimate/"
scraped_at: "2026-02-01T16:04:13.395Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Reachestimate

[](#)

## Leitura

Used to get the audience size estimation based on a targeting specification using this ad account. This endpoint returns a range-based size in the form of two fields: `users_lower_bound` and `users_upper_bound`.

### Limitations

Reach estimates for custom audiences may not be available for certain businesses.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=act_%3CAD_ACCOUNT_ID%3E%2Freachestimate%3Ftargeting_spec%3D%257B%2522geo_locations%2522%253A%257B%2522countries%2522%253A%255B%2522US%2522%255D%257D%252C%2522age_min%2522%253A20%252C%2522age_max%2522%253A40%257D&version=v24.0)

```
GET /v24.0/act_<AD_ACCOUNT_ID>/reachestimate?targeting_spec=%7B%22geo_locations%22%3A%7B%22countries%22%3A%5B%22US%22%5D%7D%2C%22age_min%22%3A20%2C%22age_max%22%3A40%7D HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/act_<AD_ACCOUNT_ID>/reachestimate?targeting_spec=%7B%22geo_locations%22%3A%7B%22countries%22%3A%5B%22US%22%5D%7D%2C%22age_min%22%3A20%2C%22age_max%22%3A40%7D',
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
    "/act_<AD_ACCOUNT_ID>/reachestimate",
    {
        "targeting_spec": "{\"geo_locations\":{\"countries\":[\"US\"]},\"age_min\":20,\"age_max\":40}"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("targeting_spec", "{\"geo_locations\":{\"countries\":[\"US\"]},\"age_min\":20,\"age_max\":40}");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/reachestimate",
    params,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"targeting_spec": @"{\"geo_locations\":{\"countries\":[\"US\"]},\"age_min\":20,\"age_max\":40}",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/reachestimate"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X GET -G \
  -d 'targeting_spec={
       "geo_locations": {
         "countries": [
           "US"
         ]
       },
       "age_min": 20,
       "age_max": 40
     }' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/reachestimate
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`object_store_url`

string

Used in mobile app campaign. The url of the app in the app store.

`targeting_spec`

Targeting object

The targeting structure for reach estimate. `countries` is required. See [targeting](/docs/marketing-api/targeting-specs).

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

A single [AdAccountReachEstimate](/docs/graph-api/reference/ad-account-reach-estimate/) node.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

613

Calls to this api have exceeded the rate limit.

200

Permissions error

190

Invalid OAuth 2.0 Access Token

2641

Your ad includes or excludes locations that are currently restricted

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