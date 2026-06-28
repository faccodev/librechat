---
title: "Graph API Referência v24.0: Conversion Action Query"
source: "https://developers.facebook.com/docs/marketing-api/reference/conversion-action-query/"
scraped_at: "2026-02-01T14:30:21.156Z"
---

Versão Graph API

[v24.0](#)

# Conversion Action Query

[](#)

## Leitura

Conversion Action Query

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=...%3Ffields%3D%257Bfieldname_of_type_ConversionActionQuery%257D&version=v24.0)

```
GET v24.0/...?fields={fieldname_of_type_ConversionActionQuery} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '...?fields={fieldname_of_type_ConversionActionQuery}',
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
    "...?fields={fieldname_of_type_ConversionActionQuery}",
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
    "...?fields={fieldname_of_type_ConversionActionQuery}",
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
                               initWithGraphPath:@"...?fields={fieldname_of_type_ConversionActionQuery}"
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

`action.type`

list<(list) or (string)>

Action type

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`application`

list<(list) or (id)>

Application

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`conversion_id`

list<id>

Rule based offsite conversion

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`creative`

list<(list) or (id)>

Creative

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`dataset`

list<id>

Dataset

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`event`

list<string>

Event

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`event.creator`

list<id>

Event creator

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`event_type`

list<string>

Event Type

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`fb_pixel`

list<id>

Facebook pixel id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`fb_pixel_event`

list<string>

Facebook pixel event

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`leadgen`

list<id>

Leadgen

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`object`

list<id>

Object

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`object.domain`

list<id>

Object domain

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offer`

list<id>

Offer

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offer.creator`

list<id>

Offer creator

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offsite_pixel`

list<id>

Offsite pixel

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page`

list<id>

Page

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page.parent`

list<id>

Page parent

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`post`

list<id>

Post

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`post.object`

list<id>

Post object

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`post.object.wall`

list<id>

Post object wall

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`post.wall`

list<id>

Post wall

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`question`

list<id>

Question

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`question.creator`

list<id>

Question creator

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`response`

list<string>

Response

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`subtype`

list<string>

Subtype

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