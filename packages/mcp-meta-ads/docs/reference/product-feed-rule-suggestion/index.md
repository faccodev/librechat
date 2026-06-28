---
title: "Graph API Referência v24.0: Product Feed Rule Suggestion"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-feed-rule-suggestion/"
scraped_at: "2026-02-01T15:54:08.311Z"
---

Versão Graph API

[v24.0](#)

# Product Feed Rule Suggestion

[](#)

## Leitura

Specification for suggested rule

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_ProductFeedRuleSuggestion%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_ProductFeedRuleSuggestion} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_ProductFeedRuleSuggestion}',
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
    "...?fields={fieldname_of_type_ProductFeedRuleSuggestion}",
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
    "...?fields={fieldname_of_type_ProductFeedRuleSuggestion}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_ProductFeedRuleSuggestion}"
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

`attribute`

string

Attribute the ruleis going to be applied. e.g. Title, Description, Price

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`params`

list<KeyValue:string,string>

Parameters specification.  
**Note:** object is encoded as as list of {"key": key-string, "value": value-string} objects, while actual params is object {key-string: value-string}.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`type`

string

Type of the rule. Vaid values are: 'mapping\_rule', 'value\_mapping\_rule', 'letter\_case\_rule', 'fallback\_rule', 'regex\_replace\_rule'

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

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