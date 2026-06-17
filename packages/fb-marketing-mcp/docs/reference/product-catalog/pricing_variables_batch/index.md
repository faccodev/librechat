---
title: "Graph API Referência v24.0: Product Catalog Pricing Variables Batch"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/pricing_variables_batch/"
scraped_at: "2026-02-01T16:15:25.829Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Pricing Variables Batch

[](#)

Batch upload pricing variables for items in a catalog. Used with Dynamic Ads for Travel, see [Dynamic Ads for Travel, Catalog Setup](/docs/marketing-api/dynamic-ads-for-travel/catalog). To get status of batch process:

```
curl -G \
-d "handle=<HANDLE>" \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/pricing_variables_batch
```

-   If you want to update a specific pricing variable, please make sure you provide a complete set of information in `<Result>`.
    
-   If you want to delete a specific pricing variable, specify the combination **without** providing any price-related info such as `<Baserate>`, `<Tax>`, `<OtherFees>`.
    

To delete one of the pricing variables for `hotel_1`, with check in 2016-05-01 for 1 night:

In `pricings_data_xml.xml`, provide:

```
<?xml version="1.0" encoding="UTF-8"?>
<Transaction>
  <Result>
    <Property>hotel_1</Property>
    <Checkin>2016-05-01</Checkin>
    <Nights>1</Nights>
  </Result>
</Transaction>
```

then make a HTTP POST to pricing\_variables\_batch:

```
curl \
-X POST \
-F "standard=google" \
-F file=@pricings_data_xml.xml \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/pricing_variables_batch
```

[](#)

## Leitura

pricing\_variables\_batch

### Example

Update one of the pricing variables for `hotel_1` with check in 2016-05-01 for 3 nights and delete one of the pricing variables for`hotel_2` with check in 2016-05-05 for 1 night:

In `pricings_data_xml.xml`, provide:

```
<?xml version="1.0" encoding="UTF-8"?>
<Transaction>
  <Result>
    <Property>hotel_1</Property>
    <Checkin>2016-05-01</Checkin>
    <Nights>3</Nights>
    <RoomBundle>
      <RoomID>single</RoomID>
      <Baserate currency="USD">189</Baserate>
      <Tax currency="USD">18.64</Tax>
      <OtherFees currency="USD">10.00</OtherFees>
    </RoomBundle>
  </Result>
  <Result>
    <Property>hotel_2</Property>
    <Checkin>2016-05-05</Checkin>
    <Nights>1</Nights>
  </Result>  
</Transaction>
```

then make a HTTP POST to pricing\_variables\_batch:

```
curl \
-X POST \
-F "standard=google" \
-F file=@pricings_data_xml.xml \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/pricing_variables_batch
```

  

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fpricing_variables_batch&version=v24.0)

```
GET /v24.0/{product-catalog-id}/pricing_variables_batch HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/pricing_variables_batch',
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
    "/{product-catalog-id}/pricing_variables_batch",
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
    "/{product-catalog-id}/pricing_variables_batch",
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
                               initWithGraphPath:@"/{product-catalog-id}/pricing_variables_batch"
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

`handle`

string

A unique handle of a batch request.

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós ProductCatalogPricingVariablesBatch.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

You can make a POST request to `pricing_variables_batch` edge from the following paths:

-   [`/{product_catalog_id}/pricing_variables_batch`](/docs/marketing-api/reference/product-catalog/pricing_variables_batch/)

When posting to this edge, a [ProductCatalogPricingVariablesBatch](/docs/graph-api/reference/product-catalog-pricing-variables-batch/) will be created.

### Parâmetros

Parâmetro

Descrição

`file`

file

Content of the file to be uploaded

`password`

string

If used url then the password for the file

`standard`

enum{google}

Uploaded file export standard

Obrigatório

`update_only`

boolean

Valor padrão: `false`

If true, rows missing in the file will not be deleted from Facebook database (only new and updated rows are applied)

`url`

URL

The url of the file to be downloaded by our system

`username`

string

If used url then the username for the file

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`handles`: List \[

string

\],

}

### Error Codes

Erro

Descrição

200

Permissions error

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)