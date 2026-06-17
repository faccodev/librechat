---
title: "Graph API Referência v24.0: Product Catalog"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/"
scraped_at: "2026-02-01T16:17:13.252Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog

[](#)

Represents a catalog for your business you can use to deliver ads with [dynamic ads](/docs/marketing-api/dynamic-ad).

**Example** — View all product catalogs associated to your business

```
curl -G \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/owned_product_catalogs"
```

You can associate pixels and apps with a product catalog and then display products in ads based on signals from pixels or apps.

**Example** — Make an `HTTP POST`

```
curl \
  -F 'external_event_sources=[<PIXEL_ID>,<APP_ID>]' \ 
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<PRODUCT_CATALOG_ID>/external_event_sources
```

## Permissions

You need the appropriate [Marketing API Access Level](/docs/marketing-api/access#limits) and must accept the [Terms of Service](https://business.facebook.com/legal/product_catalog_terms/) by creating your first catalog through [Business Manager](https://business.facebook.com/).

[](#)

## Leitura

Product catalogs contain a list of items like products, hotels or flights, and the information needed to display them in dynamic ads

### Parâmetros

Parâmetro

Descrição

`segment_use_cases`

array<enum {AFFILIATE\_SELLER\_STOREFRONT, AFFILIATE\_TAGGED\_ONLY\_DEPRECATED, COLLAB\_ADS, COLLAB\_ADS\_FOR\_MARKETPLACE\_PARTNER, COLLAB\_ADS\_SEGMENT\_WITHOUT\_SEGMENT\_SYNCING, DIGITAL\_CIRCULARS, FB\_LIVE\_SHOPPING, IG\_SHOPPING, IG\_SHOPPING\_SUGGESTED\_PRODUCTS, MARKETPLACE\_SHOPS, TEST}>

segment\_use\_cases

### Campos

Campo

Descrição

`id`

numeric string

ID of a catalog

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

Business that owns a catalog

`da_display_settings`

[ProductCatalogImageSettings](https://developers.facebook.com/docs/marketing-api/reference/product-catalog-image-settings/)

Image display settings such as background cropping and padding of items in the catalog for different Dynamic Ad formats

`default_image_url`

string

The URL for the default image, which is used for products without images, or when the product image is temporarily unavailable. If a product image matches the default image, this should be treated as if the image was not loaded

`fallback_image_url`

list<string>

The URL for the fallback image. This is used as the image for auto-generated dynamic items

`feed_count`

int32

The total number of feeds used by a catalog

`is_catalog_segment`

bool

Verify that you will create ads based on a catalog or catalog segment before you try to create Dynamic Ads. Call this field and determine value otherwise you may get and error when you try to create Dynamic Ads from catalog segments.

`is_local_catalog`

bool

is\_local\_catalog

`name`

string

The name of a catalog given by the creator

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_count`

int32

The total number of products in a catalog

`vertical`

enum

The type of catalog (for example: hotels, commerce, etc)

### Bordas

Borda

Descrição

[`agencies`](/docs/marketing-api/reference/product-catalog/agencies/)

Edge<Business>

Agencies that have access to a catalog

[`assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/)

Edge<AssignedUser>

Users assigned to this catalog

[`automotive_models`](/docs/marketing-api/reference/product-catalog/automotive_models/)

Edge<AutomotiveModel>

Automotive models that a catalog contains

[`categories`](/docs/marketing-api/reference/product-catalog/categories/)

Edge<ProductCatalogCategory>

Categories within the catalog for a given categorization criteria

[`check_batch_request_status`](/docs/marketing-api/reference/product-catalog/check_batch_request_status/)

Edge<CheckBatchRequestStatus>

Checks the status of a batch request

[`collaborative_ads_share_settings`](/docs/marketing-api/reference/product-catalog/collaborative_ads_share_settings/)

Edge<CollaborativeAdsShareSettings>

All the collaborative ads share settings for a catalog segment

[`data_sources`](/docs/marketing-api/reference/product-catalog/data_sources/)

Edge<ProductCatalogDataSource>

data\_sources updating catalog including feeds, session containers etc

[`destinations`](/docs/marketing-api/reference/product-catalog/destinations/)

Edge<Destination>

Destinations that a catalog contains

[`diagnostics`](/docs/marketing-api/reference/product-catalog/diagnostics/)

Edge<ProductCatalogDiagnosticGroup>

diagnostics

[`event_stats`](/docs/marketing-api/reference/product-catalog/event_stats/)

Edge<ProductEventStat>

Aggregated statistics on the matched and unmatchd events received from the pixels and apps associated to the catalog, broken down by DA event, source and device\_type

[`external_event_sources`](/docs/marketing-api/reference/product-catalog/external_event_sources/)

Edge<ExternalEventSource>

External event sources (including pixels) for catalog events like ViewContent

[`flights`](/docs/marketing-api/reference/product-catalog/flights/)

Edge<Flight>

Flights that a catalog contains

[`home_listings`](/docs/marketing-api/reference/product-catalog/home_listings/)

Edge<HomeListing>

Home listings that a catalog contains

[`hotel_rooms_batch`](/docs/marketing-api/reference/product-catalog/hotel_rooms_batch/)

Edge<ProductCatalogHotelRoomsBatch>

Batch operations with hotel rooms

[`hotels`](/docs/marketing-api/reference/product-catalog/hotels/)

Edge<Hotel>

Hotels that a catalog contains

[`pricing_variables_batch`](/docs/marketing-api/reference/product-catalog/pricing_variables_batch/)

Edge<ProductCatalogPricingVariablesBatch>

Batch operations with hotel room prices

[`product_groups`](/docs/marketing-api/reference/product-catalog/product_groups/)

Edge<ProductGroup>

Product groups that a catalog contains

[`product_sets`](/docs/marketing-api/reference/product-catalog/product_sets/)

Edge<ProductSet>

Product sets belonging to a catalog

[`product_sets_batch`](/docs/marketing-api/reference/product-catalog/product_sets_batch/)

Edge<ProductCatalogProductSetsBatch>

Batch operations with product sets

[`products`](/docs/marketing-api/reference/product-catalog/products/)

Edge<ProductItem>

Products that a catalog contains

[`vehicle_offers`](/docs/marketing-api/reference/product-catalog/vehicle_offers/)

Edge<VehicleOffer>

Vehicle offers that a catalog contains

[`vehicles`](/docs/marketing-api/reference/product-catalog/vehicles/)

Edge<Vehicle>

Vehicles that a catalog contains

### Error Codes

Erro

Descrição

100

Invalid parameter

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

200

Permissions error

2500

Error parsing graph query

[](#)

## Criando

### Examples

```
curl \
  -F 'name=Catalog' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/product_catalogs
```

You can make a POST request to `assigned_users` edge from the following paths:

-   [`/{product_catalog_id}/assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Parâmetros

Parâmetro

Descrição

`tasks`

array<enum {MANAGE, ADVERTISE, MANAGE\_AR, AA\_ANALYZE}>

Catalog permission tasks to assign this user

Obrigatório

`user`

UID

Business user id or system user id

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

200

Permissions error

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

You can make a POST request to `vehicles` edge from the following paths:

-   [`/{product_catalog_id}/vehicles`](/docs/marketing-api/reference/product-catalog/vehicles/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Parâmetros

Parâmetro

Descrição

`address`

JSON object

address

Obrigatório

`city`

string

Valor padrão: `""`

city

`city_id`

string

city\_id

`country`

string

Valor padrão: `""`

country

`latitude`

float

latitude

`longitude`

float

longitude

`neighborhoods`

array<string>

neighborhoods

`postal_code`

string

Valor padrão: `""`

postal\_code

`region`

string

Valor padrão: `""`

region

`street_address`

string

Valor padrão: `""`

street\_address

`applinks`

Object

applinks

`web`

`android`

`ios`

`ipad`

`iphone`

`windows_phone`

`availability`

enum {AVAILABLE, NOT\_AVAILABLE, PENDING, UNKNOWN}

availability

`body_style`

enum {CONVERTIBLE, COUPE, CROSSOVER, ESTATE, GRANDTOURER, HATCHBACK, MINIBUS, MINIVAN, MPV, PICKUP, ROADSTER, SALOON, SEDAN, SMALL\_CAR, SPORTSCAR, SUPERCAR, SUPERMINI, SUV, TRUCK, VAN, WAGON, OTHER, NONE}

body\_style

Obrigatório

`condition`

enum {EXCELLENT, VERY\_GOOD, GOOD, FAIR, POOR, OTHER, NONE}

condition

`currency`

ISO 4217 Currency Code

currency

Obrigatório

`date_first_on_lot`

string

date\_first\_on\_lot

`dealer_id`

string

dealer\_id

`dealer_name`

string

dealer\_name

`dealer_phone`

string

dealer\_phone

`description`

string

description

Obrigatório

`drivetrain`

enum {TWO\_WD, FOUR\_WD, AWD, FWD, RWD, OTHER, NONE}

drivetrain

`exterior_color`

string

exterior\_color

Obrigatório

`fb_page_id`

string

fb\_page\_id

`fuel_type`

enum {DIESEL, ELECTRIC, GASOLINE, FLEX, HYBRID, OTHER, PETROL, PLUGIN\_HYBRID, NONE}

fuel\_type

`images`

list<Object>

images

Obrigatório

`image_url`

URL

Obrigatório

`tags`

list<string>

`interior_color`

string

interior\_color

`make`

string

make

Obrigatório

`mileage`

JSON object

mileage

Obrigatório

`unit`

enum {KILOMETERS, MILES}

Valor padrão: `"MILES"`

unit

`value`

int64

Valor padrão: `0`

value

`model`

string

model

Obrigatório

`price`

int64

price

Obrigatório

`state_of_vehicle`

enum {NEW, USED, CPO}

state\_of\_vehicle

Obrigatório

`title`

string

title

Obrigatório

`transmission`

enum {AUTOMATIC, MANUAL, OTHER, NONE}

transmission

`trim`

string

trim

`url`

URI

url

Obrigatório

`vehicle_id`

string

vehicle\_id

Obrigatório

`vehicle_type`

enum {BOAT, CAR\_TRUCK, COMMERCIAL, MOTORCYCLE, OTHER, POWERSPORT, RV\_CAMPER, TRAILER}

vehicle\_type

`vin`

string

vin

Obrigatório

`year`

int64

year

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

10800

Duplicate retailer\_id when attempting to create a store collection

100

Invalid parameter

200

Permissions error

You can make a POST request to `owned_product_catalogs` edge from the following paths:

-   [`/{business_id}/owned_product_catalogs`](/docs/marketing-api/reference/business/owned_product_catalogs/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Parâmetros

Parâmetro

Descrição

`additional_vertical_option`

enum {LOCAL\_DA\_CATALOG, LOCAL\_PRODUCTS}

Additional catalog configurations that does not introduce either new verticals or subverticals

`business_metadata`

JSON object

business\_metadata

`page_id`

numeric string

page\_id

Obrigatório

`external_business_id`

string

external\_business\_id

`catalog_segment_filter`

A JSON-encoded rule

Provide filter for catalog to create a catalog segment.

`da_display_settings`

Object

Dynamic Ads display settings.

`carousel_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`single_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`destination_catalog_settings`

JSON object

Destination catalog settings.

`generate_items_from_pages`

boolean

Valor padrão: `false`

`flight_catalog_settings`

JSON object

Flight catalog settings.

`generate_items_from_events`

boolean

Valor padrão: `false`

`name`

UTF-8 encoded string

Name of the catalog.

Obrigatório

`parent_catalog_id`

numeric string or integer

Parent catalog ID.

`partner_integration`

JSON object

Partner integration settings

`external_access_token`

string

External access token

`external_merchant_id`

string

External merchant identifier

`store_catalog_settings`

JSON object

Store catalog settings.

`page_id`

numeric string

page\_id

Obrigatório

`vertical`

enum {adoptable\_pets, commerce, destinations, flights, generic, home\_listings, hotels, local\_service\_businesses, offer\_items, offline\_commerce, transactable\_items, vehicles}

Valor padrão: `commerce`

The catalog's industry or vertical, such as `commerce`.

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

190

Invalid OAuth 2.0 Access Token

804

Specified object already exists

102

Session key invalid or no longer valid

200

Permissions error

2310019

The business of this catalog is not onboarded to Collaborative Ads

[](#)

## Atualizando

You can update a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a POST request to [`/{product_catalog_id}`](/docs/marketing-api/reference/product-catalog/).

### Parâmetros

Parâmetro

Descrição

`additional_vertical_option`

enum {LOCAL\_DA\_CATALOG, LOCAL\_PRODUCTS}

Additional catalog configurations that does not introduce either new verticals or subverticals

`da_display_settings`

Object

The display settings object when used will determine which image transformations (like cropping or padding) will be applied for the item in the specified dynamic ad format.

`carousel_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`single_ad`

Object

Obrigatório

`transformation_type`

enum{background\_cropping\_and\_padding, background\_padding, none}

Obrigatório

`default_image_url`

URI

The URL for the default image, which is used for products without images or for the cases when the product image is temproarily unavailable. If a product image matches the default image, this should be treated as if the image was not loaded.

`destination_catalog_settings`

JSON object

Catalog setting for destination catalogs.

`generate_items_from_pages`

boolean

Valor padrão: `false`

`fallback_image_url`

URI

The URL for the fallback image. This is used as the image for the auto-generated dynamic items.

`flight_catalog_settings`

JSON object

Catalog setting for flight catalogs.

`generate_items_from_events`

boolean

Valor padrão: `false`

`name`

string

Name of the Product Catalog

`partner_integration`

JSON object

Partner integration settings

`external_access_token`

string

External access token

`external_merchant_id`

string

External merchant identifier

`store_catalog_settings`

JSON object

Catalog settings for store catalogs; the page with the location structure for all the stores within this settings will be used to validate the store number for feed uploading

`page_id`

numeric string

page\_id

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

You can update a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a POST request to [`/{product_catalog_id}/marketplace_partner_signals`](/docs/marketing-api/reference/product-catalog/marketplace_partner_signals/).

### Parâmetros

Parâmetro

Descrição

`event_id`

string

event\_id

Unique identifier for conversion events. If there are multiple conversion events tied to a single `mp_clid`, this field will be used to differentiate between those events

`event_name`

enum {PURCHASE, ADD\_TO\_CART, VIEW\_ITEM, TEST}

event\_name

`TEST` events can be used to send test data to confirm API functionality that Marketplace will ignore

Obrigatório

`event_source_url`

string

event\_source\_url

`event_time`

datetime/timestamp

event\_time

Obrigatório

`order_data`

JSON object

order\_data

`order_details`

array<JSON object>

Valor padrão: `[]`

order\_details

`item_price`

float

item\_price

Obrigatório

`item_quantity`

int64

item\_quantity

Obrigatório

`item_id`

string

item\_id

Obrigatório

`currency`

string

currency

Obrigatório

`order_total`

float

order\_total

Obrigatório

`user_data`

JSON object

user\_data

Obrigatório

`mp_clid`

string

mp\_clid

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`validation_status`: List \[

Struct {

`errors`: List \[

Struct {

`message`: string,

}

\],

`warnings`: List \[

Struct {

`message`: string,

}

\],

}

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Excluindo

### Examples

You can delete a product catalog with the following API. You cannot remove a product catalog from a Business Manager, or transfer a catalog from one Business Manager to another.

```
curl -X DELETE \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>
```

  
To do this in a batch call, specify the parameter in the query string for the URL:

```
curl \
  -F 'batch=[{
  "method":"DELETE",
  "relative_url":"<PRODUCT_CATALOG_ID>"
}]' \
 -F 'access_token=<TOKEN>' \
  https://graph.facebook.com
```

  
To remove the association between the catalog and a pixel or app, make an `HTTP DELETE`:

```
curl -X DELETE \
  -F 'external_event_sources=[<APP_ID>,<PIXEL_ID>]' \
  -F 'access_token=<TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/external_event_sources
```

  
To see all pixel and apps associated with a product catalog, make an `HTTP GET`:

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/external_event_sources
```

You can delete a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a DELETE request to [`/{product_catalog_id}`](/docs/marketing-api/reference/product-catalog/).

### Parâmetros

Parâmetro

Descrição

`allow_delete_catalog_with_live_product_set`

boolean

Valor padrão: `false`

If the catalog has live product sets, the deletion will be blocked by default. Set this parameter to true to enforce the deletion even if it has live product sets

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

3970

You must be assigned as an admin of this product catalog before you can delete it.

801

Invalid operation

100

Invalid parameter

You can dissociate a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) from a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) by making a DELETE request to [`/{product_catalog_id}/assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/).

### Parâmetros

Parâmetro

Descrição

`user`

UID

Business user id or system user id

Obrigatório

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