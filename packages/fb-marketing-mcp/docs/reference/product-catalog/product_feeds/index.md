---
title: "product catalog product feed"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/product_feeds/"
scraped_at: "2026-02-01T16:15:40.618Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Product Feed

[](#)

Products feeds associated with a catalog. See [Dynamic Ads, Catalog Setup](/docs/marketing-api/dynamic-product-ads/product-catalog). For example, get a list of all product feeds:

```
curl -G \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/product_feeds
```

Or get a list of product items in a product feed:

```
curl -G \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/products
```

[](#)

## Leitura

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fproduct_feeds&version=v24.0)

```
GET /v24.0/{product-catalog-id}/product_feeds HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/product_feeds',
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
    "/{product-catalog-id}/product_feeds",
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
    "/{product-catalog-id}/product_feeds",
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
                               initWithGraphPath:@"/{product-catalog-id}/product_feeds"
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

Uma lista de nós [ProductFeed](/docs/marketing-api/reference/product-feed/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

80009

There have been too many calls to this Catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

[](#)

## Criando

You can make a POST request to `product_feeds` edge from the following paths:

-   [`/{product_catalog_id}/product_feeds`](/docs/marketing-api/reference/product-catalog/product_feeds/)

When posting to this edge, a [ProductFeed](/docs/marketing-api/reference/product-feed/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=%7Bproduct-catalog-id%7D%2Fproduct_feeds%3Fname%3DTest%2BFeed%26schedule%3D%257B%2522interval%2522%253A%2522DAILY%2522%252C%2522url%2522%253A%2522http%253A%252F%252Fwww.example.com%252Fsample_feed.tsv%2522%252C%2522hour%2522%253A%252222%2522%257D&version=v24.0)

```
POST /v24.0/{product-catalog-id}/product_feeds HTTP/1.1
Host: graph.facebook.com

name=Test+Feed&schedule=%7B%22interval%22%3A%22DAILY%22%2C%22url%22%3A%22http%3A%2F%2Fwww.example.com%2Fsample_feed.tsv%22%2C%22hour%22%3A%2222%22%7D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{product-catalog-id}/product_feeds',
    array (
      'name' => 'Test Feed',
      'schedule' => '{"interval":"DAILY","url":"http://www.example.com/sample_feed.tsv","hour":"22"}',
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
    "/{product-catalog-id}/product_feeds",
    "POST",
    {
        "name": "Test Feed",
        "schedule": "{\"interval\":\"DAILY\",\"url\":\"http:\/\/www.example.com\/sample_feed.tsv\",\"hour\":\"22\"}"
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
params.putString("name", "Test Feed");
params.putString("schedule", "{\"interval\":\"DAILY\",\"url\":\"http://www.example.com/sample_feed.tsv\",\"hour\":\"22\"}");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{product-catalog-id}/product_feeds",
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
  @"name": @"Test Feed",
  @"schedule": @"{\"interval\":\"DAILY\",\"url\":\"http://www.example.com/sample_feed.tsv\",\"hour\":\"22\"}",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{product-catalog-id}/product_feeds"
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
  -F 'name="Test Feed"' \
  -F 'schedule={
       "interval": "DAILY",
       "url": "http://www.example.com/sample_feed.tsv",
       "hour": "22"
     }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/{product-catalog-id}/product_feeds
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`country`

string

Valor padrão: `"US"`

Two letter country code where the products can be sold

`default_currency`

ISO 4217 Currency Code

Valor padrão: `USD`

The default currency used by provided feed if the currency is not specified in the feed file

`deletion_enabled`

boolean

Valor padrão: `true`

Default value: `false` (to be changed to `true` .from API v2.5)  
When `true`, this will remove products from a catalog that are no longer present in a feed. When `false`, uploading a product feed is additive and products will remain in the catalog even if they are removed from a feed. Once enabled, we do not allow this field to be disabled.

`delimiter`

enum {AUTODETECT, BAR, COMMA, TAB, TILDE, SEMICOLON}

Valor padrão: `AUTODETECT`

Product feed delimiter

`encoding`

enum {AUTODETECT, LATIN1, UTF8, UTF16LE, UTF16BE, UTF32LE, UTF32BE}

Valor padrão: `AUTODETECT`

The character encoding used by provided feed

`feed_type`

enum {AUTOMOTIVE\_MODEL, COLLECTION, DESTINATION, FLIGHT, HOME\_LISTING, HOTEL, HOTEL\_ROOM, LOCAL\_INVENTORY, MEDIA\_TITLE, OFFER, PRODUCT\_RATINGS\_AND\_REVIEWS, PRODUCTS, TRANSACTABLE\_ITEMS, VEHICLE\_OFFER, VEHICLES}

Type of the feed. Decides type of catalog item this feed will create

`file_name`

string

The name of the product feed. .tsv, .xml or compressed files (zip, gzip and bz2) are supported

`ingestion_source_type`

enum {PRIMARY\_FEED, SUPPLEMENTARY\_FEED}

ingestion\_source\_type to decide type of feed i.e. primary or supplementary

`item_sub_type`

enum {APPLIANCES, BABY\_FEEDING, BABY\_TRANSPORT, BEAUTY, BEDDING, CAMERAS, CELL\_PHONES\_AND\_SMART\_WATCHES, CLEANING\_SUPPLIES, CLOTHING, CLOTHING\_ACCESSORIES, COMPUTERS\_AND\_TABLETS, DIAPERING\_AND\_POTTY\_TRAINING, ELECTRONICS\_ACCESSORIES, FURNITURE, HEALTH, HOME\_GOODS, JEWELRY, NURSERY, PRINTERS\_AND\_SCANNERS, PROJECTORS, SHOES\_AND\_FOOTWEAR, SOFTWARE, TOYS, TVS\_AND\_MONITORS, VIDEO\_GAME\_CONSOLES\_AND\_VIDEO\_GAMES, WATCHES}

The sub type of items to be uploaded by this feed

`migrated_from_feed_id`

numeric string

Used to split an original feed into multiple new feeds, `migrated_from_feed_id` denotes the original feed's ID. Setting this field ensures that items from an original field can be migrated to a new one, without the need of deletion.  
This field is generally used when splitting a large feed into multiple smaller feeds.  
Example:

1.  You have a large feed called Feed A and want to split it.
2.  You create a new feed called Feed B and specify Feed A's ID under `migrated_from_feed_id`.
3.  You upload Feed B's catalog information, including the products you want to add to Feed B.
4.  The items from feed A have been moved to feed B. Going forward, you do not need to specify those items in Feed A and they can be removed from feed A.

**Guidance on splitting feeds that exceed file size or item limit**

If your data feed contains more items or exceeds the file size, split it into multiple feeds and upload them separately. You can upload as many data feeds as you want, but they must all contain different items.

You can split the data feed into smaller feeds using `migrated_from_feed_id`.

Steps:

1.  Create a new data feed file with items that need to be transferred from the old feed.
2.  Create a new data feed using `migrated_from_feed_id`.
3.  The ownership of items will be transferred from the old feed to the new feed when the first session completes on the new feed file.
4.  Subsequently, the items can be removed from the old feed. And the items must be managed by the new feed.

Example of how to create a new feed using `migrated_from_feed_id`:

```
curl -X POST \
  -F 'name="New Feed"' \
  -F 'schedule={
       "interval": "DAILY",
       "url": "http://www.example.com/new_feed_file.csv",
       "hour": "22"
     }' \
  -F 'migrated_from_feed_id=<OLD_FEED_ID>' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v22.0/{product-catalog-id}/product_feeds
```

5\. Additionally, ensure that once the data feeds are split into a new, smaller feed, all item updates come from the respective new feed.

`name`

UTF-8 encoded string

User specified name for the feed

`override_type`

enum {LANGUAGE, COUNTRY, VERSION, CATALOG\_SEGMENT\_CUSTOMIZE\_DEFAULT, LANGUAGE\_AND\_COUNTRY, BATCH\_API\_LANGUAGE\_OR\_COUNTRY, SMART\_PIXEL\_LANGUAGE\_OR\_COUNTRY, LOCAL}

If this is a secondary feed, this specifies the override type of the feed

`override_value`

string

Override value of the feed dependent on the override type (country or language).

`primary_feed_ids`

array<numeric string>

primary\_feed\_ids to which a supplementary feed should be linked

`quoted_fields_mode`[](#)

enum{autodetect, on, off}

Valor padrão: `autodetect`

Whether or not there will be quotes around each field, only for TSV feeds. If this field is provided, we use it instead of the parameter quoted\_fields

`rules`

list<JSON-encoded string>

A list of rules applied to feed uploads

`schedule`

JSON-encoded string

A JSON-encoded string representing a recurrent schedule for fetching the feed. Default timezone is America/Los\_Angeles. Learn more about [feed schedules](/docs/marketing-api/reference/product-feed-schedule/)

`selected_override_fields`

array<string>

Selected Override Fields of the feed, written as a list of fields which should be processed from the feed file. From whiltelisted\_properties

`update_schedule`

JSON-encoded string

The configuration for fetching updates to a feed in a recurrent manner. The uploads would only update the items in the feed or create new ones. No items would be deleted. This is useful for sending `price` and `availability` updates for selected items in the feed. Learn more about fields in a [feed schedule](/docs/marketing-api/reference/product-feed-schedule/)

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`errors`: List \[

Struct {

`error_subcode`: string,

`invalid_attribute`: string,

`error_message`: string,

}

\],

}

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

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)