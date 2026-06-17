---
title: "Graph API Referência v24.0: Ad Label"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-label/"
scraped_at: "2026-02-01T14:31:40.062Z"
---

Versão Graph API

[v24.0](#)

# Ad Label

[](#)

API users tend to create 1000s of campaigns/ad sets/ads, and would like to have the ability to group together sets of ad objects arbitrarily. For example, an advertiser may want to track all campaigns that are targeting men or women, or track all ads that are using the same creative. Or use external data, like, track all campaigns that were created by a particular team, as a part of a particular marketing initiative.

Until now this could be achieved by overloading the name of the ad object. API developers have come up with complicated naming schemes, creating campaigns with names like **“\[client\]-\[fmp\]-\[autogen\]-\[18-34-oregon\]-\[custaudience-141\]”**, and these names are used to parse out tags.

With the introduction of Labels API, we allow developers to tag ad objects with multiple "labels" (strings). Developers can query by these labels, so they can quickly collate and query ad objects such as campaigns, ad sets, ads and creatives that belong to the same “label”.

### Limits

The following are the limits on ad sets

Limit

Value

Maximum number of ad labels per regular ad account

100,000 non-deleted ad labels

Maximum number of ad labels specified in the spec (to be associated with an ad object)

50 ad labels spec

[](#)

## Leitura

An AdLabel

### Getting ad objects associated with a given label

For an ad account, one can retrieve ad objects associated with an ad label. This can be achieved by:

-   for campaigns, using endpoint `/campaignsbylabels`
    
-   for ad sets, using endpoint `/adsetsbylabels`
    
-   for ads, using endpoint `/adsbylabels`
    
-   for creatives, using endpoint `/adcreativesbylabels`
    

Supported operators are `ALL` and `ANY`: for ids and label names matching, partial string matching is not supported.

```
v24.0
```

Similarly, field filtering can be used for finding ads, ad sets, campaigns just as done on the insights edge.

The filtering parameter is an array of filter object. Each filter object has three fields: 'field', 'operator' and 'value'. Valid filter operator could be ('EQUAL', 'NOT\_EQUAL', 'GREATER\_THAN', 'GREATER\_THAN\_OR\_EQUAL', 'LESS\_THAN', 'LESS\_THAN\_OR\_EQUAL', 'IN\_RANGE', 'NOT\_IN\_RANGE', 'CONTAIN', 'NOT\_CONTAIN', 'IN', 'NOT\_IN', 'ANY', 'ALL', 'NONE').

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

numeric string

Ad Label ID

`created_time`

datetime

Created time

`name`

string

Ad Label name

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`updated_time`

datetime

Updated time

### Bordas

Borda

Descrição

[`adcreatives`](/docs/marketing-api/reference/ad-label/adcreatives/)

Edge<AdCreative>

Creatives associated with this label

[`ads`](/docs/marketing-api/reference/ad-label/ads/)

Edge<Adgroup>

Ads associated with this label

[`adsets`](/docs/marketing-api/reference/ad-label/adsets/)

Edge<AdCampaign>

Ad sets associated with this label

[`campaigns`](/docs/marketing-api/reference/ad-label/campaigns/)

Edge<AdCampaignGroup>

Campaigns associated with this label

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

You can make a POST request to `adlabels` edge from the following paths:

-   [`/act_{ad_account_id}/adlabels`](/docs/marketing-api/reference/ad-account/adlabels/)

When posting to this edge, an [AdLabel](/docs/marketing-api/reference/ad-label/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fadlabels%3Fname%3DMy%2BLabel&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/adlabels HTTP/1.1
Host: graph.facebook.com

name=My+Label
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/adlabels',
    array (
      'name' => 'My Label',
    ),
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
    "/act_<AD_ACCOUNT_ID>/adlabels",
    "POST",
    {
        "name": "My Label"
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
params.putString("name", "My Label");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/adlabels",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"name": @"My Label",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/adlabels"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X POST \
  -F 'name="My Label"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adlabels
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`name`

string

AdLabel name

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Atualizando

This endpoint overrides all set of labels associated with this object, whereas <OBJECT\_ID>/adlabels modifies (adds new or reuses specified). If only the label name is supplied, and a label with the name does not exist, then a new label is created and then associated with the ad object.

You can update an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a POST request to [`/{ad_label_id}`](/docs/marketing-api/reference/ad-label/).

### Parâmetros

Parâmetro

Descrição

`name`

string

AdLabel name

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can update an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a POST request to [`/{ad_creative_id}/adlabels`](/docs/marketing-api/reference/ad-creative/adlabels/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specification of ad labels to be associated with the creative

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can update an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a POST request to [`/{ad_id}/adlabels`](/docs/marketing-api/reference/adgroup/adlabels/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specification of adlabels to be associated with the ad

Obrigatório

`execution_options`

list<enum{validate\_only}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can update an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a POST request to [`/{campaign_id}/adlabels`](/docs/marketing-api/reference/ad-campaign-group/adlabels/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specification of ad labels to be associated with the campaign

Obrigatório

`execution_options`

list<enum{validate\_only}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Excluindo

You can delete an [AdLabel](/docs/marketing-api/reference/ad-label/) by making a DELETE request to [`/{ad_label_id}`](/docs/marketing-api/reference/ad-label/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)