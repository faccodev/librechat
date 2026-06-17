---
title: "Graph API Referência v24.0: Product Catalog Items Batch"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/"
scraped_at: "2026-02-01T16:15:05.372Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Items Batch

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `items_batch` edge from the following paths:

-   [`/{product_catalog_id}/items_batch`](/docs/marketing-api/reference/product-catalog/items_batch/)

When posting to this edge, no Graph object will be created.

Use this endpoint to create, delete or update multiple items in a Catalog at a time. The [sample API call](#sample-api-call) illustrates how this API works in practice.

### Limitations

-   The `requests` parameter can contain up to 5000 items. It is recommended that the request size be kept under 3000 records for optimal performance.
    
-   The total size (in bytes) of the `requests` parameter should not exceed 30 MB.
    
-   For each catalog, you can make a number of calls per minute defined by the [Catalog Batch](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/#catalog) business use case rate limit formula. If that's not sufficient, please contact us.
    

### Parâmetros

Parâmetro

Descrição

`allow_upsert`

boolean

Valor padrão: `true`

Set this to true if you want to allow requests with method=UPDATE to create new items.

When set to false, update requests for items not existing in the catalog will not be completed.

`item_sub_type`

enum {APPLIANCES, BABY\_FEEDING, BABY\_TRANSPORT, BEAUTY, BEDDING, CAMERAS, CELL\_PHONES\_AND\_SMART\_WATCHES, CLEANING\_SUPPLIES, CLOTHING, CLOTHING\_ACCESSORIES, COMPUTERS\_AND\_TABLETS, DIAPERING\_AND\_POTTY\_TRAINING, ELECTRONICS\_ACCESSORIES, FURNITURE, HEALTH, HOME\_GOODS, JEWELRY, NURSERY, PRINTERS\_AND\_SCANNERS, PROJECTORS, SHOES\_AND\_FOOTWEAR, SOFTWARE, TOYS, TVS\_AND\_MONITORS, VIDEO\_GAME\_CONSOLES\_AND\_VIDEO\_GAMES, WATCHES}

Valor padrão: `"EMPTY"`

The sub vertical type of items in the request

`item_type`

string

The type of items in the request. Needs to be one of the values listed [here](https://developers.facebook.com/docs/marketing-api/catalog/guides/catalog-item-types). Note that the information specified in this field is NOT a [product category](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-categories/) (a concept used for item\_type=PRODUCT\_ITEM).

Obrigatório

`requests`

JSON object

This parameter should be a string no longer than 30 million characters. The string should be a JSON array with no more than 5000 records. It is recommended that the request size be kept under 3000 records for optimal performance. Each record should contain 2 fields:

-   method: one of CREATE/UPDATE/DELETE
-   data: a map containing catalog item field names and the corresponding values.
    -   When the method is CREATE, this object must contain all the required fields for the specified item\_type.
    -   When the method is UPDATE, it can contain any fields.
    -   A request with method=DELETE is expected to contain only the fields that are necessary to identify an item ([see below](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/#deleting-catalog-items))
    -   Note: see [Supported Fields](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/#supported-fields) for details on what can be specified for a catalog item.

The [Sample Call](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/#sample-api-call) below demonstrates how the ‘request’ parameter can be passed.

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`handles`: List \[

string

\],

`validation_status`: List \[

Struct {

`errors`: List \[

Struct {

`message`: string,

}

\],

`retailer_id`: string,

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

80014

There have been too many calls for the batch uploads to this catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#catalog.

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Response Payload Specification

### For a Successful Call

Field

Description

handles

An array of strings, containing either 0 or 1 value. An empty array means that nothing has been ingested. The handle returned here can be used to check the status of the submitted request via the [/check\_batch\_request\_status](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/check_batch_request_status/) API endpoint.

validation\_status

An array of `ValidationStatus` objects (see below)

A `ValidationStatus` object has the following fields:

Field

Description

retailer\_id

Row identifier from one of the records in the ‘requests’ parameter

errors

An array of `Error` objects (see below)

warnings

An array of `Error` objects (see below)

An `Error` object has the following structure

Field

Description

message

A human-readable string providing an explanation of what is the issue with provided product data.

### For a Failed Call

Failed calls return the standard [Error Payload](https://developers.facebook.com/docs/graph-api/guides/error-handling/).

[](#)

## Supported Fields

Fields that can be passed for items, depending on type

item\_type=PRODUCT\_ITEM

Field

Description

`additional_image_link`  

type: array< string >

Optional.

A JSON-array containing up to 50 image URLs.

`additional_variant_attribute`  

type: string

Optional.

Additional attributes to distinguish the product in its variant group. A comma-separated list of attribute+value pairs where the attribute name and its value are separated by a colon symbol (‘:’)

Example: `"Scent:Fruity,Flavor:Apple"`

`age_group`  

type: string

Optional.

Group of people who are the same age or a similar age. Accepted values are `newborn`, `infant`, `toddler`, `kids`, `adult`.

`applink`  

type: object< string >

Optional.

Links to mobile apps. A JSON object with string keys and string values. The following keys are supported:

-   ios\_url
-   ios\_app\_store\_id
-   ios\_app\_name
-   iphone\_url
-   iphone\_app\_store\_id
-   iphone\_app\_name
-   ipad\_url
-   ipad\_app\_store\_id
-   ipad\_app\_name
-   android\_url
-   android\_package
-   android\_class
-   android\_app\_name
-   windows\_phone\_url
-   windows\_phone\_app\_id
-   windows\_phone\_app\_name

`availability`  

type: string

Required.

Identifies availability status:

-   `in stock` - Item ships immediately
-   `out of stock` - No plan to restock
-   `available for order` - Ships in 1–2 weeks
-   `discontinued`

`brand`  

type: string

Required.

Brand of the item.

`color`  

type: string

Optional.

Max size: 100.

Item color.

`condition`  

type: string

Required.

Product condition: `new`, `refurbished`, or `used`.

-   `custom_label_0`
-   `custom_label_1`
-   `custom_label_2`
-   `custom_label_3`
-   `custom_label_4`

type: string

Optional.

Max character limit: 100

Additional information about item.

-   `custom_number_0`
-   `custom_number_1`
-   `custom_number_2`
-   `custom_number_3`
-   `custom_number_4`

type: integer

Optional.

Up to five custom fields for any additional number-related information you want to filter items by when you create sets. This field allows you to filter by number ranges (is greater than and is less than) when you create a set. For example, you could use this field to indicate the year a hotel was opened, and then filter a certain year range into a set.

This field supports whole numbers between 0 and 4294967295. It doesn't support negative numbers, decimal numbers or commas, such as -2, 5.5 or 10,000.

Example: `2022`

`description`

type: string

Required.

Max size: 5000.

Short text describing product.

`disabled_capabilities`

type: array< string >

Optional.

List of capabilities to be disabled. Possible values are: `marketplace`, `b2c_marketplace`, `buy_on_facebook`, `cpas_parent_catalog`, `marketplace_shops`, `shops`, `daily_deals`, `ig_onsite_shopping`, `ig_product_tagging`, `c2c_marketplace`, `groups`, `profile`, `da`, `whatsapp`, `ldp`, `mini_shops`, `business_inbox_in_messenger`, `neighborhoods`, `test_capability`.

`fb_product_category`

type: string

Optional.

Provide the most specific Facebook product category possible from this list: [Spreadsheet (.csv)](https://www.facebook.com/products/categories/en_US.csv) or [Plain text (.txt)](https://www.facebook.com/products/categories/en_US.txt). Enter either the category name (not case sensitive) or its ID number.

Examples:

-   `Clothing & Accessories > Clothing > Women's Clothing > Tops & T-Shirts`
-   `430`

Learn more about product categories by reading the [Business Help Center article](https://www.facebook.com/business/help/526764014610932).

Note: The category lists above are in US English. You can download other languages [here](https://www.facebook.com/business/help/526764014610932).

`gender`

type: string

Optional.

Gender for sizing. Values include `male`, `female`, `unisex`.

`google_product_category`

type: string

Optional.

Max size: 250. Predefined values (string or category ID) from [Google's product taxonomy](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT0fXBy3-v6IM58QIxEq3iMK-zojR1KNh0yX_jRPc-hhrpDZvrCplyrQdAJ1nQZwZRWSw-cKLGFbs_83EgknNsMGMqJdF6AXabtGFqYUnZ47YODDoAzImxUpPfWVd7dDdSkdhg0oyd3q184bUpX1zed2jCY9pJo6tcuQjRL0B6o).

Examples:

-   `Apparel & Accessories > Clothing > Dresses`
-   `2271`

`gtin`

type: string

Optional.

Max size: 70.

Global Trade Item Number (GTIN) can include UPC, EAN, JAN, and ISBN.

`expiration_date`

type: date

Optional.

Product expiration. If the product has expired, it won't be shown on Facebook. This date should follow the ISO‑8601 (YYYY‑MM‑DD) format.

`id`

type: string

Required.

Character limit: 100

A unique content ID for the item. Use the item's SKU if you can. Each content ID must appear only once in your catalog. To run dynamic ads this ID must exactly match the content ID for the same item in your Facebook pixel code.

`image`

type: array< object >

Required.

URLs and tags for images to be used in your ads or in shops.

A JSON array containing up to 21 records with the following fields:

-   `url`: the URL string of the image
-   `tag`: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

`image_link`

type: string

Optional.

Not required if `image` is provided.

We recommend using `image` instead. When `image` is provided, `image_link` and `additional_image_link` are ignored.

Link to item image used in the ad. Provide proper image sizes.

For single-image Advantage+ catalog ads:

-   Min image resolution requirement is 500px\*500px.
-   Min aspect ratio requirement is 4:5.
-   Max aspect ratio requirement is 1:91:1. If the image is outside this aspect ratio, Facebook crops it to be closest to either the minimum aspect ratio or the maximum aspect ratio, depending on its original aspect ratio.

For carousel image, Advantage+ catalog ads: Min image resolution requirement is 500px\*500px, and Facebook crops it to a 1:1 aspect ratio.

`importer_address`

type: JSON structure

Optional.

If the country of origin is not India, provide the operational address of the importer. This field uses a JSON structure, which contains the following fields:

-   `street1` - string, required. The first line of the street address
-   `street2` - string, optional. The second line of the street address.
-   `city` - string, required. The city name.
-   `region` - string, optional. The region, state or province. (In the US this is to be used for US State)
-   `postal_code` - string, optional (in the US this is to be used for Zip Code)
-   `country` - required. Enter the ISO Country code (2-letter country code)

The overall address will be displayed to users in the following format: `street1`, `street2` (if present), `city`, `region` (if present) `postal_code` (if present), `country` (full name, localized for the user).

This example value: `{ street1: "1 Hacker Way", street2: "Building 18", city: "Menlo Park", region: "CA", postal_code: "94025", country: "US" }`

will be rendered as "1 Hacker Way, Building 18, Menlo Park, CA 94025 United States of America"

`importer_name`

type: string

Optional.

If the country of origin is not India, provide the legal entity name of the item's importer

Example value: `Jasper's Market Inc.`

`internal_label`

type: array< string >

Optional.

Add internal labels to help filter items when you create product sets. For example, you could add a “summer” label to all items that are part of a summer promotion and then filter those items into a set. Labels are only visible to you

Character limit: Up to 5,000 labels per product and 110 characters per label.

Example `['summer','trending']`

Note: If you’re currently using custom labels (`custom_label_0` to `custom_label_4`) for filtering product sets, switching to internal labels (`internal_label`) instead is recommended. Unlike custom labels, you can add or update internal labels as often as needed without sending items through policy review each time, which can impact ad delivery.

This field was previously called `product_tags`. While we still support the old field name, we recommend that you use the new name.

`mobile_link`

type: string

Optional.

Link to a mobile-optimized page for the item on the merchant's website.

`quantity_to_sell_on_facebook`

type: integer

Optional.

The quantity of this item you have to sell on Facebook and Instagram with checkout. Must be 1 or higher or the item won't be buyable.

NOTE: The `quantity_to_sell_on_facebook` field is replacing the `inventory` field, which is being deprecated. While we will support the old field name in the near term, we recommend that you use the new name.

`item_group_id`

type: string

Optional.

The advertiser-supplied ID of a product group; not the FBID. Accepts strings. Can be used by advertisers to group a variety of different objects (product items, vehicles, hotels, flights, and so on together.

`link`

type: string

Required.

Link to merchant's site where someone can buy the item.

`material`

type: string

Optional.

Character limit: 200.

The material the item is made from, such as cotton, denim or leather.

`mpn`

type: string

Optional.

Unique manufacturer ID for product.

`ordering_index`

type: integer

Optional.

Zero-based index used for ordering items within a group.

Example value: `0`

`origin_country`

type: ISO 3166-1 alpha-2 (2 letter country code)

Optional.

The item's country of origin. Enter the two-letter ISO country code

Example value: `US`

`pattern`

type: string

Optional.

Max size: 100.

Pattern or graphic print on a product.

`price`

type: string

Required.

Price of the item. Format price as the cost, followed by the [3-digit ISO currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT0rYEbCuClzYrRDi7rBgHmnXOcRmZWH469PwvahmWYtBy5j3OOj3ro_wgywldo8FZmJlzrzT68_mH2brr8HdTsuMXBfYNWX7A_G3SGz8yDNFKeKuS-HSJ57n4C4XNhzMWhwc59ClHmp-vL0ddK2fxFZIkdf_kqsMWleYHrh1qc), with a space between cost and currency.

Example: `9.99 USD`

`product_type`

type: string

Optional.

Max size: 750.

Retailer-defined category for item.

Example: `Home & Garden > Kitchen & Dining > Appliances > Refrigerators`

`rating_count`

type: integer

Optional.

The number of ratings purchasers have provided for this product. Must be greater than 0. This should be used in conjunction with `user_rating`.

Example: `100`

`rich_text_description`

type: string

Optional.

A description of the item containing rich text (HTML) formatting such as bullet points or multiple paragraphs. We recommend using rich text if the description is longer than 200 characters to help make it easier to read. If this field is provided, it will be displayed instead of the description field wherever possible, but you must still provide description as a backup option. Character limit: 9,999.

Supported HTML tags: _html_, _form_, _fieldset_, _div_, _span_

Header tags: _header_, _h1_ .. _h6_

Table tags: _table_, _tbody_, _tfoot_, _thead_, _td_, _th_, _tr_

List tags: _ul_, _li_, _ol_, _dl_, _dd_, _dt_

Other formatting tags: _p_, _b_, _u_, _i_, _em_, _strong_, _title_, _small_, _br_, _div_, _sub_, _sup_, _pre_, _q_, _s_

Note: <script> and <style> tags aren't supported. If you include them, they'll be automatically removed.

Example: `<html><p>A comfortable royal blue women's T-shirt in organic cotton. Cap sleeves and relaxed fit. Perfect for warm summer days. Features graphic print of logo in white on upper left sleeve.</p> <ul> <li>100% organic cotton</li><li>Machine wash, tumble dry low</li> </ul> </html>`

`sale_price`

type: string

Optional.

Discounted price if the item is on sale. Format price as the cost, followed by the [3-digit ISO currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT1cUIws7S-LnGwkgCLh-unOaSd5GjzEKnwy2b9RONhWEtyzFYyID1rYIBkkJrmgSkFu9Bs65qnjDvQSJ273H79zjpRkL-aI3hLh7h2QBUb8RvAqRt_bfnewCeVUt94wwjht9_HwN7E9mMyQy6zcjooXb2wGyfh57a0_PJd1MDY), with a space between cost and currency.

Examples: `9.99 USD`, `25.00 EUR`

`sale_price_effective_date`

type: string

Optional.

Start and end date and time for the sale, separated by a slash. Write the start and end dates as YYYY-MM-DD. Add a "T" after each date and then include the time. Write the time in a 24-hour format (0:00 to 23:59).

Example: `2014-11-01T12:00-0300/2014-12-01T00:00-0300`

`shipping`

type: array< object >

Optional.

An array of JSON structures containing the following fields:

-   shipping\_country
-   shipping\_price\_currency
-   shipping\_price\_value
-   shipping\_region
-   shipping\_service

Example:

```
[
      {
        "shipping_country": "US",
        "shipping_region": "CA",
        "shipping_service": "Pick-up point",
        "shipping_price_value": "4.90",
        "shipping_price_currency": "USD"
      },
      {
        "shipping_country": "US",
        "shipping_region": "CA",
        "shipping_service": "Home delivery",
        "shipping_price_value": "7.90",
        "shipping_price_currency": "USD"
      }
]
```

The comma- and colon-separated format (`US:CA:Ground:9.99 USD, US:NY:Air:15.99 USD`) is discouraged but is also supported

`shipping_weight`

type: string

Shipping weight of the item in lb, oz, g, or kg.

Example: `10 kg`

`size`

type: string

Optional.

Size of item. Example: `Small` or `XL`.aasasd

`title`

type: string

Required.

Max size: 100.

Title of item.

`user_rating`

type: number

Optional.

The average rating purchasers have provided for this product. Range between 1.0 and 5.0. One decimal place allowed. This should be used in conjunction with `rating_count`.

Example: 4.5

`vendor_id`

type: string

Optional.

For marketplaces: the ID of the vendor/seller that sells the item.

`video`

type: array< object >

Optional.

URLs and tags for videos to be used in your ads or in shops. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Swimming pool”,”Gym”],
      }
]
```

NOTE: To delete video 1 if the product has video 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

item\_type=DESTINATION

Field

Description

`applink`  

type: object< string >

Optional.

Links to mobile apps. A JSON object with string keys and string values. The following keys are supported:

-   ios\_url
-   ios\_app\_store\_id
-   ios\_app\_name
-   iphone\_url
-   iphone\_app\_store\_id
-   iphone\_app\_name
-   ipad\_url
-   ipad\_app\_store\_id
-   ipad\_app\_name
-   android\_url
-   android\_package
-   android\_class
-   android\_app\_name
-   windows\_phone\_url
-   windows\_phone\_app\_id
-   windows\_phone\_app\_name

`address`  

type: object< string >

Required.

Address of the destination. A JSON object with string keys and string values. The following keys are supported.

Required fields:

-   city
-   country
-   region

Optional fields:

-   city\_id - identifier of the city to be used when constructing URLs
-   postal\_code
-   unit\_number

Example: `{ "city": "Shannon", "region": "Ireland", "country": "Ireland" }`

`description`  

type: string

Optional.

Max character limit: 5000.

Short paragraph describing the destination.

`destination_id`  

type: string

Required.

Max character limit: 100.

Unique ID for the destination.

`image`  

type: array< object >

Required.

URLs and tags for images to be used in your ads or in shops.

A JSON array containing up to 21 records with the following fields:

-   url: the URL string of the image
-   tag: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

`latitude`  

type: string

Required.

Latitude location of the destination.

`longitude`  

type: string

Required.

Longitude location of the destination.

`name`  

type: string

Required.

Name of the destination.

`neighborhood`  

type: array< string >

Optional.

Max number of neigborhoods allowed: 20. One or more neighborhood(s) for the destination.

Example: `["Soho", "Las Vegas Strip"]`

`price`  

type: string

Optional.

Lowest average cost and currency for the destination. Format the price as a number followed by the currency code; use [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT2iYA7YmO0CpBjq_s20guBcZutWI6cgQ5DB6z76XINekwMzuG1ucrXXYTn73ltcuePmVd3VkdjbOMlUHoF8tpOXt4v-KaVrJ3QxIsVXzjwvMb-Vq4ouUjHL_U0k86TZZHGZDVnIKKind5C0eVtGLbBrt345Ktyq174lWvib__U) standards. Use ""."" as the decimal for the price.

`price_change`  

type: string

Optional.

Price change. Can be used for building product sets and in the ad creative:

-   `0` - No price change
-   `-10` - 10% price drop
-   `20` - 20% price increase.

Example: `"0"`

`type`  

type: array< string >

Required.

Max number of destination types: 20. Type(s) of destination. A destination can have multiple types.

Example: `["resort", "beach"]`

`url`  

type: string

Required.

Link to the website where you can book the destination.

`video`  

type: array< object >

Optional.

URLs and tags for videos to be used in your ads or in shops. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Swimming pool”,”Gym”],
      }
]
```

NOTE: To delete video 1 if the destination has video 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

### Sample DESTINATION payload

```
{
 "address": {
   "city": "Menlo Park",
   "city_id": "MPK",
   "country": "USA",
   "postal_code": "94025",
   "region": "California"
 },
 "applink": {
   "android_url": "a://b/c",
   "android_package": "android.test",
   "android_app_name": "TestApp",
   "ios_url": "d://e/f",
   "ios_app_store_id": "123456",
   "ios_app_name": "TestApp"
 },
 "description": "Description of the test destination ",
 "destination_id": "abc",
 "image": [
   {
     "url": "https://facebook.com/1.jpg",
     "tag": [
       "image_tag"
     ]
   }
 ],
 "latitude": "42.0",
 "longitude": "42.0",
 "name": "Test Destination",
 "neighborhood": [
   "Silicon Valley",
   "Neighbourhood2"
 ],
 "price": "123 USD",
 "price_change": 0,
 "type": [
   "Family",
   "Sand",
   "Water"
 ],
 "url": "https://website.com/la_isla_bonita.html",
 "video": [
   {
     "url": "https://facebook.com/1.mp4",
     "tag": [
       "video_tag"
     ]
   }
 ]
}
```

item\_type=FLIGHT

Field

Description

`description`

type: string

Optional.

Max character limit: 5000.

Description of the flight.

`destination_airport`

type: string

Required.

Destination airport for the flight. Should be written as an [IATA code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fw%2Findex.php%3Ftitle%3DList_of_airports_by_IATA_airport_code&h=AT343kMH5hpwHpj_hCy1DaMIEVGP6upY6V8p36A8Fk2FDlJ6Vf6ksUbr_qPJUw7mAIZK2Pb6liyxgX7jhmMhwrFrwcEgYPT_xsyHS2zM2fcUABtLJhEWIzH0CukE1erVcnZ-q8-dgDgBDGJehpPb5jDiVnDULcJysyjRA1rXmPo).

Example: `SFO`.

`destination_city`

type: string

Optional.

Name of the destination city for the flight.

`image`

type: array< object >

Required.

Images to be used in the ads. A JSON array containing up to 21 records with the following fields:

-   url: the URL string of the image
-   tag: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

`origin_airport`

type: string

Required.

Origin airport for the flight. Should be written as an [IATA code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fw%2Findex.php%3Ftitle%3DList_of_airports_by_IATA_airport_code&h=AT1rVMIhkVzrlIBkb-LalOs-uvVlNUhRjK_G3nKPk5jcEv6L4hvRN8RDtEpsRXGK-tlevmMLfJOUkslxD2ZhQebwNiKfwAgc0U1DD9zWcLhs603B6pArYdWqkWEiHnTz5gxXIZ9BDLvdBpuhGiEC6g9WOdEdOJpwCMIdFNXEGpE).

Example: `LHR`.

`price`

type: string

Optional.

Cost and currency of the flight. The price is a number followed by the currency code; use [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT00W39oryw41BE72moIkE-zN2PIQOaA7CXUzbPaXk9CgZDQcqm7ZOgcoXW_nfGj-tyjsnEv61CQl_v8MYMspBaV_v_vL-JWcZOR0qtYY6WZk6LAYTQiB1Aql51O3DmNQOLzaXwzkGQJZM20kDn8Gl4VlN_GtruVrp1l9heTQKI5j4Be79H-hn4Q) standards. Use ""."" as the decimal for the price.

`url`

type: string

Optional.

Link to the website where you can book the flight.

`video`

type: array< object >

Optional.

URLs and tags for videos to be used in your ads. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Red Eye”],
      }
]
```

NOTE: To delete video 1 if the flight has video 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

### Sample FLIGHT payload

```
{
 "description": "test flight",
 "destination_airport": "SFO",
 "destination_city": "San Francisco",
 "image": [
   {
     "url": "https://www.facebook.com/images/plane.jpg",
     "tags": [
       "tag1",
       "tag2"
     ]
   }
 ],
 "origin_airport": "LAX",
 "origin_city": "Los Angeles",
 "price": "123 USD",
 "custom_label_0": "test flight label",
 "custom_number_0": 2025,
 "url": "https://www.facebook.com/sfo_lax_flight",
 "video": [
   {
     "url": "https://website.com/p123.mpg",
     "tag": [
       "cloud",
       "wing"
     ]
   }
 ]
}
```

item\_type=HOME\_LISTING

Field

Description

`home_listing_id`

type: string

Required.

Unique home (apartment/condo) listing ID; most granular ID possible.

Example: `FB_home_1234`

`home_listing_group_id`

type: string

Optional.

Building or apartment's unique ID. Must be unique per group.

`applink`

type: object< string >

Optional.

Links to mobile apps. A JSON object with string keys and string values. The following keys are supported:

-   ios\_url
-   ios\_app\_store\_id
-   ios\_app\_name
-   iphone\_url
-   iphone\_app\_store\_id
-   iphone\_app\_name
-   ipad\_url
-   ipad\_app\_store\_id
-   ipad\_app\_name
-   android\_url
-   android\_package
-   android\_class
-   android\_app\_name
-   windows\_phone\_url
-   windows\_phone\_app\_id
-   windows\_phone\_app\_name

`address`

type: object< string >

Required.

Street address for the property that must be resolvable to its location.

See [Address Object Parameters](https://developers.facebook.com/docs/marketing-api/real-estate-ads/get-started/#address-object).

`availability`

type: string

Required.

Current availability for the home listing. Supported values are: `for_sale`, `for_rent`, `sale_pending`, `recently_sold`, `off_market`, `available_soon`. For commerce, the only supported value is `for_rent`.

`available_dates_price_config`

type: array< object >

Optional.

List of dates and prices that a listing is available. When you provide values, Facebook can recommend listings based on their available dates and dynamically show the associated price in your ad.

See [Available Dates Object Parameters](https://developers.facebook.com/docs/marketing-api/real-estate-ads/get-started/#available_dates-object).

`description`

type: string

Optional.

Max character limit: 5000.

Short paragraph describing the home listing.

`image`

type: array< object >

Required.

URLs and tags for images to be used in your ads.

A JSON array containing up to 21 records with the following fields:

-   url: the URL string of the image
-   tag: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

See [Image Object Parameters](https://developers.facebook.com/docs/marketing-api/real-estate-ads/get-started/#image-object).

`latitude`

type: string

Optional.

Latitude location of the home listing.

`longitude`

type: string

Optional.

Longitude location of the home listing.

`listing_type`

type: string

Optional.

Type of property listing. Supported values for Advantage+ catalog ads: `for_rent_by_agent`, `for_rent_by_owner`, `for_sale_by_agent`, `for_sale_by_owner`, `foreclosed`, `new_construction`, `new_listing`. Supported values for commerce: `for_rent_by_agent`, `for_rent_by_owner`.

`name`

type: string

Required.

Name of the home listing.

`neighborhood`

type: array< string >

Optional.

Neighborhood for the home listing. Max number neighborhoods allowed: 20.

`num_rooms`

type: integer

Optional.

Total number of rooms in the property.

`num_baths`

type: integer

Optional.

Total number of bathrooms. For commerce, must be 1 at minimum.

`num_beds`

type: integer

Optional.

Total number of bedrooms. Can be 0 for Studios.

`num_units`

type: integer

Optional.

Number of units available. Use only for apartments or condos available for rent/lease.

`price`

type: string

Required.

Cost and currency for the home listing. The price is a number followed by the currency code; use [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT1Wzk4x-1NhUBHz5fkH7FaX64BSqj3w-e4JkY7eleqitImzZvtx_YEDN-yA2X3GNASymPHjeUjt9V6Fyh9tnEw0sLkKdAWAoph65NohjO8oEteu7mGbsRx9LXfd4E1gPYEECehPOMH50mtVCxrWhD1FrcHWCaMLrd78unavLgw) standards. Use ""."" as the decimal for the price.

`property_type`

type: string

Optional.

Type of property.

Supported values for Advantage+ catalog ads: `apartment`, `condo`, `house`, `land`, `manufactured`, `other`, `townhouse`.

Supported values for commerce: `apartment`, `builder_floor`, `condo`, `house`, `house_in_condominium`, `house_in_villa`, `loft`, `penthouse`, `studio`, `townhouse`, `other`.

`url`

type: string

Required.

Link to the website where you can view the listing.

`year_built`

type: string

Optional.

Year the property was built, using the YYYY format, 4 digit year.

`area_size`

type: integer

Not applicable for Advantage+ catalog ads. Required for commerce. Area or space of the floor plan's listing.

`area_unit`

type: string

Not applicable for Advantage+ catalog ads. Required for commerce. The units (square feet or square meters) of the floor area's value. Supported values: `sq_ft`, `sq_m`.

`ac_type`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce. Type of air conditioning. Supported values: `central`, `other`, `none`.

`furnish_type`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce. Type of heating installed in the property. Supported values: `central`, `gas`, `electric`, `radiator`, `other`, `none`.

`laundry_type`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce.

Type of laundry available. Supported values: `in_unit`, `in_building`, `other`, `none`.

`parking_type`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce.

Type of parking available on property. Supported values: `garage`, `street`, `off-street`, `other`, `none`.

`partner_verification`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce.

Whether the partner company has verified the listing. Supported values: `verified`, `none`.

`pet_policy`

type: string

Not applicable for Advantage+ catalog ads. Optional for commerce.

Indicates the pets allowed on the property: `cat`, `dog`, `all`, `none`.

`status`

type: string

Controls whether an item is active or archived in your catalog. Only active items can be seen by people in your ads, shops or any other channels. Supported values: `active`, `archived`. Items are active by default. Learn more about [archiving items](https://www.facebook.com/business/help/543317109402043?id=725943027795860).

Example: `active`

This field was previously called `visibility`. While we still support the old field name, we recommend that you use the new name.

`video`  

type: array< object >

Optional.

URLs and tags for videos to be used in your ads or in shops. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Swimming pool”,”Gym”],
      }
]
```

NOTE: To delete video 1 if the home listing has video 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

### Sample HOME\_LISTING payload

```
{
 "home_listing_id": "home_listing_123",
 "home_listing_group_id": "group_123",
 "address": {
   "addr1": "12 Test Street",
   "city": "Marília",
   "region": "SP",
   "country": "BR",
   "postal_code": "17515440"
 },
 "applink": {
   "android_url": "a://b/c",
   "android_package": "android.topwidgets",
   "android_app_name": "TopWidgets",
   "ios_url": "d://e/f",
   "ios_app_store_id": "123456",
   "ios_app_name": "TopWidgets"
 },
 "available_dates_price_config": [
   {
     "start_date": "2026-01-01",
     "end_date": "2027-01-01",
     "rate": "10000",
     "currency": "USD",
     "interval": "nightly"
   }
 ],
 "latitude": "-25.0",
 "longitude": "-45.0",
 "availability": "off_market",
 "description": "Nice house, has windows and doors",
 "image": [
   {
     "url": "https://facebook.com/123.jpg",
     "tag": [
       "image_tag"
     ]
   }
 ],
 "name": "House for Sale on Earth",
 "neighborhood": [
   "Jardim Maria Izabel",
   "RESIDENTIAL"
 ],
 "num_baths": 2,
 "num_beds": 2,
 "num_rooms": 4,
 "num_units": 2,
 "price": "4000000 JPY",
 "url": "https://facebook.com/123",
 "property_type": "house",
 "listing_type": "for_sale_by_agent",
 "agent_company": "Test Agency",
 "area_size": "123",
 "area_unit": "sq_m",
 "ac_type": "central",
 "furnish_type": "semi-furnished",
 "heating_type": "gas",
 "laundry_type": "in_unit",
 "parking_type": "off_street",
 "partner_verification": "verified",
 "pet_policy": "cat",
 "status": "archived",
 "video": [
   {
     "url": "https://facebook.com/123.mp4",
     "tag": [
       "video_tag"
     ]
   }
 ],
 "year_built": "2001"
}
```

item\_type=HOTEL

Field

Description

`address`

type: array< object >

Required.

Address of the hotel. See [Address Object Parameters](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#address-object).

`applink`

type: object

Optional.

Deep link straight to the hotel details page in your mobile app. See supported fields [here](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

`base_price`

type: string

Required.

Base price of the hotel room per night. Add the currency type to the price. Format price as the cost, followed by the [ISO currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT0aL6H_svE1PJ_z1RDZyZ4tjeTvEfhKkkqVZZEE0ifQxqiPa0quv_x3n6Mp0EVpN_lKyOv0MjUIS6cesAXDV0KfltNEnRXMS1yvL1ZiDD6PXcqvqS_60WwjCWuzY6fPfq_iBGxjwJMYNoGHAnuLq-UceIxEeeapUhQPMYJJD6E), with a space between cost and currency.

Example: `100 USD`

`priority`

type: integer

Optional.

An indicator of the priority of the hotel; value from 0(lowest priority) to 5(highest priority).

Example: `5`

`category`

type: string

Optional.

The type of property. The category can be any type of internal description desired.

Examples: `Resort`, `Day Room`

`number_of_rooms`

type: integer

Optional.

Total number of rooms/units in this hotel listing.

Example: `150`

`brand`

type: integer

Optional.

Brand of the hotel chain.

-   `custom_label_0`
-   `custom_label_1`
-   `custom_label_2`
-   `custom_label_3`
-   `custom_label_4`

type: string

Optional.

Max character limit: 100

Up to five custom fields for any additional information you want to filter items by when you create sets. For example, you could use a custom field to indicate all rooms that are part of a summer sale, and then filter those rooms into a set. This field supports any text value, including numbers.

Example: `Summer Sale`

-   `custom_number_0`
-   `custom_number_1`
-   `custom_number_2`
-   `custom_number_3`
-   `custom_number_4`

type: integer

Optional.

Up to five custom fields for any additional number-related information you want to filter items by when you create sets. This field allows you to filter by number ranges (is greater than and is less than) when you create a set. For example, you could use this field to indicate the year a hotel was opened, and then filter a certain year range into a set.

This field supports whole numbers between 0 and 4294967295. It doesn't support negative numbers, decimal numbers or commas, such as -2, 5.5 or 10,000.

Example: `2022`

`internal_label`

type: array< string >

Add internal labels to help filter items when you create [product sets](https://www.facebook.com/business/help/620275848114281?id=725943027795860). For example, you could add a “summer” label to all items that are part of a summer promotion and then filter those items into a set. Labels are only visible to you.

Character limit: Up to 5,000 labels per product and 110 characters per label.

Note: If you’re currently using custom labels (`custom_label_0` to `custom_label_4`) for filtering product sets, switching to internal labels (`internal_label`) instead is recommended. Unlike custom labels, you can add or update internal labels as often as needed without sending items through policy review each time, which can impact ad delivery.

This field was previously called `product_tags`. While we still support the old field name, we recommend that you use the new name.

`description`

type: string

Required.

Max character limit: 5000.

Short description of the hotel.

`guest_rating`

type: array< object >

Optional.

Guest ratings of the hotel. See [Guest Rating Object Parameters](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#guest_ratings-object).

`hotel_id`

type: string

Required.

Max length: 100

Your unique identifier for the hotel within the catalog. This ID is matched with any `content_ids` provided in your hotel app and pixel events. Tip: To improve performance, avoid using a space for this unique identifier field. Don't use duplicate IDs.

Example: `FB_hotel_1234`

`image`

type: array< object >

Required.

A JSON array containing up to 21 records with the following fields: \* url: the URL string of the image \* tag: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

See [Image Object Parameters](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#image-object).

`video`

type: array< object >

Optional.

URLs and tags for videos to be used in your ads or in shops. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Swimming pool”,”Gym”],
      }
]
```

NOTE: To delete video 1 if the product has video 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

`latitude`

type: string

Required.

Latitude location of the hotel.

Example: `12.345`

`longitude`

type: string

Required.

Longitude location of the hotel.

Example: `67.89`

`loyalty_program`

type: string

Optional.

Loyalty program you use to gain points for staying at the hotel.

`margin_level`

type: string

Optional.

Indicator of the hotel's profitability; value from 1 to 10.

Example: `7`

`name`

type: string

Required.

Name of the hotel.

`neighborhood`

type: array< string >

Optional.

One or more neighborhood(s) for the hotel. Max number of neigborhoods allowed: 20.

Example: `["Soho", "Las Vegas Strip"]`

`phone`

type: string

Optional.

Phone number with country code.

`status`

type: string

Optional.

Controls whether an item is active or archived in your catalog. Only active items can be seen by people in your ads, shops or any other channels. Supported values: `active`, `archived`. Items are active by default. Learn more about [archiving items](https://www.facebook.com/business/help/543317109402043?id=725943027795860).

Example: `active`

This field was previously called `visibility`. While we still support the old field name, we recommend that you use the new name.

`Sale price`

type: string

Optional.

Note: this field has a space character in its name

Sale price per night in the hotel. Use this to advertise discounts off the regular hotel price. Required: Add the currency type to the price. Format price as the cost, followed by the [ISO currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT0F0TUU4wC9N_v9SVWFZPpHryuD5lshLJ8GYyekFHH1iHBcnl_Sov_6Pc8tAyfPCSN7Kuw8Tgc2Ie8a2Oae1H14xQGxu5MNonvT1dzCS6d-u7vHYdP7qpKaWarGFha1NGmoMFb0jGxDh3492ThHkL2CXvVuro4vvOjKhUfnn08), with a space between cost and currency.

Example: `99 USD`

`Star rating`

type: Integer

Optional.

Hotel star rating. Number should be between 1 and 5.

Example: `3`

`uri`

type: string

Required.

Link to the website where you book the hotel room.

### Sample HOTEL payload

```
{
 "hotel_id": "1234",
 "name": "Test hotel",
 "description": "Test Hotel Description",
 "base_price": "100 USD",
 "Sale price": "99 USD",
 "priority": 4,
 "category": "Resort",
 "number_of_rooms": 2,
 "custom_label_0": "Test Label 0",
 "internal_label": [
   "label1",
   "label2"
 ],
 "custom_number_0": 2025,
 "brand": "Test Hotels Inc.",
 "guest_rating": [
   {
     "score": 4.4,
     "number_of_reviewers": 123,
     "rating_system": "Expedia",
     "max_score": 5
   }
 ],
 "address": {
   "country": "United States",
   "region": "California",
   "city": "Menlo Part",
   "addr1": "1 Hacker Way",
   "addr2": " ",
   "city_id": "",
   "postal_code": "94025"
 },
 "latitude": "12.345",
 "longitude": "67.890",
 "neighborhood": [
   "Silicon Valley"
 ],
 "Star rating": "4",
 "applink": {
   "android_app_name": "Test Apps",
   "android_package": "com.test.app",
   "android_url": "abc://dev/detail?no=1234",
   "ios_app_name": "com.test.app",
   "ios_app_store_id": "1234567890",
   "ios_url": "abc://def/detail?no=1234"
 },
 "image": [
   {
     "url": "https://facebook.com/1.jpg",
     "tags": [
       "main"
     ]
   }
 ],
 "video": [
   {
     "url": "https://facebook.com/1.mp4",
     "tags": [
       "main"
     ]
   }
 ],
 "url": "https://facebook.com/hotels/1234"
}
```

item\_type=HOTEL\_ROOM

Field

Description

`applink`

type: object< string >

Optional.

Deep link straight to the hotel room details page in your mobile app. See supported fields [here](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

`base_price`

type: string

Required.

Base price for 1 night. Currency should follow [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT0e78bAAmCRpVHLtcz71CxUUtagsGNgCdS_MzmF2hnWND_6-7Z-eeQfbaA78Ivk1mzsLJ09ymmrCVHpa6tBGBiywRu-igHcxOMD6bqnncFaQBGvdurTM-4XUx2yaeiQDvU8z519mDnQYfQj9El_FSaITty1uHvkpD6xIIwsI0I) currency codes.

Example: `9.99 USD`.

`description`

type: string

Required.

Max size: 5000.

Short text describing the room.

`hotel_retailer_id`

type: string

Required.

Unique ID for the hotel that the room is in.

`hotel_room_id`

type: string

Required.

Unique ID for the room.

`image`

type: array< object >

Required.

Images of the room. A JSON array containing up to 21 records with the following fields:

-   url: the URL string of the image
-   tag: a JSON array of strings. Tags are optional and, if used, should describe what is in the image.

See [Image Object Parameters](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#image-object).

`video`

type: array< object >

Optional.

URLs and tags for videos to be used in your ads or in shops. Supports up to 30,000 videos on the catalog level. Tags are optional and, if used, should describe what is in the video.

The maximum video file size is 200 MB. Supported formats include .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

Example:

```
"video": [
      {
        "url":"http://example.com/video_1.mp4",
        "tag": [“Swimming pool”,”Gym”],
      }
]
```

NOTE: To delete video 1 if the hotel room has videos 1, 2, remove video 1 from the array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": [
        {
          "url": "https://google.com/video_2.mp4",
          "tag": ["video_2"]
        }
      ]
    }
  }
]
```

To delete all videos, send an empty array:

```
[
  {
    "method": "UPDATE",
    "data": {
      "video": []
    }
  }
]
```

`margin_level`

type: string

Optional.

Indicator of the hotel's profitability; value from 1 to 10.

`name`

type: string

Required.

Max size: 100.

Name of the room.

`url`

type: string

Required.

Link to advertiser's site where someone can book the stay.

`status`

type: string

Controls whether an item is active or archived in your catalog. Only active items can be seen by people in your ads, shops or any other channels. Supported values: `published`, `archived`. Items are active by default. Learn more about [archiving items](https://www.facebook.com/business/help/543317109402043?id=725943027795860).

Example: `published`

This field was previously called visibility. While we still support the old field name, we recommend that you use the new name.

### Sample HOTEL\_ROOM payload

```
{
 "applink": {
   "android_app_name": "Test Apps",
   "android_package": "com.test.apps",
   "android_url": "abc://dev/detail?no=1234",
   "ios_app_name": "com.test.app",
   "ios_app_store_id": "1234567890",
   "ios_url": "abc://def/detail?no=1234"
 },
 "base_price": "100 USD",
 "sale_price": "99 USD",
 "description": "Test Hotel Room Description",
 "name": "The Fancy Suite",
 "hotel_retailer_id": "1234",
 "hotel_room_id": "fancy_room_42",
 "image": [
   {
     "url": "https://facebook.com/1.jpg",
     "tags": [
       "main"
     ]
   }
 ],
 "video": [
   {
     "url": "https://facebook.com/1.mp4",
     "tags": [
       "main"
     ]
   }
 ],
 "margin_level": 9,
 "url": "https://facebook.com/hotels/1234/rooms/fancy_room_42",
 "status": "published"
}
```

item\_type=STORE\_PRODUCT\_ITEM

Field

Description

`retailer_item_id`

type: string

**Required**.

Retailer ID

`store_code`

type: string

**Required**.

As given in [Store Locations](https://business.facebook.com/security/twofactor/reauth/?twofac_next=https%3A%2F%2Fbusiness.facebook.com%2Fbusiness_locations&type=avoid_bypass&app_id=0&save_device=0)

`price`

type: integer

**Optional**.

Optional unless you want local pricing to populate in the ads. If the price is not available for a product in the local feed, then that product's ad will fetch its price from the online feed.

`quantity`

type: number

**Optional**.

Quantity will be default to 0 if it's not provided, but items can still be delivered if availability is in stock.

`availability`

Type: string

**Optional**.

If not set, the item is assumed to be available (in stock) for the given store. If the item is not available in the given store, it doesn’t have to be provided in the local feed, but uploading it as “out of stock” availability may simplify “update-only” feed uploads.

Identifies availability status:

-   `in stock`
-   `out of stock`

`sale_price`

Type: integer

**Optional**.

Local sale price.

`sale_price_effective_date`

Type: string

**Optional**.

Date range over which the sale is valid. Format is 2020-02-28T12:00-0800/2020-05-08T12:00-0800, where / is the delimiter. You cannot give only a start or end date. You must give both. If you leave it blank, then the sale date will be permanent until the `sale_price` is changed to null.

`pickup_timeline`

Type: integer

**Optional**.

The timeline for when people can pick up the item. Can be “same day” or “next day".

`pickup_method`

Type: string

**Optional**.

The method by which people can pick up the item. Can be “buy,” “reserve” or “not supported".

item\_type=VEHICLE

For supported fields for the `CREATE` and `UPDATE` methods for type VEHICLE, see [Auto Inventory Catalog Fields - Vehicle](https://developers.facebook.com/docs/marketing-api/auto-ads/guides/catalog#feedspec).

Supported fields are available for [Vehicle](https://developers.facebook.com/docs/marketing-api/auto-ads/reference#vehicle) and [Dealership](https://developers.facebook.com/docs/marketing-api/auto-ads/reference#dealership).

### Sample VEHICLE payload

```
{
 "vehicle_id": "i2 2017 Ford Fusion",
 "availability": "AVAILABLE",
 "make": "Ford",
 "model": "Fusion",
 "year": "2017",
 "mileage": {
   "value": "1500",
   "unit": "KM"
 },
 "image": [
   {
     "url": "http://www.facebook.com/teapic.jpg",
     "tag": [
       "Car"
     ]
   }
 ],
 "fuel_type": "gasoline",
 "body_style": "sedan",
 "drivetrain": "FWD",
 "vin": "1FADP5AU6DL536022",
 "condition": "EXCELLENT",
 "description": "Turbocharged! Gasoline!",
 "title": "SE Ford Certified and 6-Speed Automatic.",
 "price": "18000 USD",
 "exterior_color": "white",
 "sale_price": "16000 USD",
 "state_of_vehicle": "new",
 "longitude": "52.35",
 "latitude": "42.1",
 "address": {
   "addr1": "550 Auto Center Dr",
   "city": "Watsonville",
   "region": "CA",
   "country": "US",
   "postal_code": "96075"
 },
 "url": "http://www.example.com/test",
 "status": "archived"
}
```

item\_type=VEHICLE\_OFFER

Refer to [Automotive Model Ads](https://developers.facebook.com/docs/marketing-api/auto-ads/reference#vehicle-offers-feed-file) documentation for the list of supported fields. Please note that while in CSV and TSV feed files the ‘image’ field is spread across multiple columns (such as ‘image\[0\].url’, ‘image\[0\].tag’, ‘image\[1\].url’ etc.). In the /items\_batch API endpoint there is no need to do so, instead the ‘image’ field is represented as a single JSON object (see example below). Same applies to the ‘dma\_codes’ field.

### Sample VEHICLE\_OFFER payload

```
{
 "vehicle_offer_id": "test_offer",
 "make": "Widget Motors",
 "availability": "AVAILABLE",
 "model": "Roller",
 "year": "2017",
 "offer_type": "finance",
 "title": "Buy this car now",
 "offer_description": "This is a great car",
 "url": "http://www.example.com/test",
 "offer_disclaimer": "Buy at your own risk",
 "image": [
   {
     "url": "http://www.facebook.com/teapic.jpg",
     "tag": [
       "Car"
     ]
   }
 ],
 "amount_percentage": 2,
 "amount_qualifier": "APR",
 "term_length": 36,
 "term_qualifier": "months",
 "downpayment": "1000 USD",
 "downpayment_qualifier": "due at signing + 1 month payment",
 "trim": "GT",
 "start_date": "2026-01-01T00:00:00+0000",
 "end_date": "2027-01-01T00:00:00+0000",
 "market_name": "EMEA",
 "dma_codes": [
   "502",
   "503"
 ],
 "generation": "4th gen",
 "transmission": "Automatic",
 "drivetrain": "FWD",
 "fuel_type": "gasoline",
 "body_style": "sedan",
 "status": "archived",
 "exterior_color": "white",
 "interior_color": "black",
 "interior_upholstery": "LEATHER"
}
```

[](#)

## Deleting Catalog Items

When method=DELETE is used, you only need to pass the fields necessary to identify the catalog item that needs to be deleted.

item\_type

fields

PRODUCT\_ITEM

id

DESTINATION

destination\_id

FLIGHT

destination\_airport, origin\_airport

HOME\_LISTING

home\_listing\_id

HOTEL

hotel\_id

HOTEL\_ROOM

hotel\_retailer\_id, hotel\_room\_id

STORE\_PRODUCT\_ITEM

retailer\_item\_id, store\_code

VEHICLE

vehicle\_id

VEHICLE\_OFFER

vehicle\_offer\_id

For example,

```
requests=[
    {
        "method":"DELETE",
        "data":{
         "destination_id": "abc321",
        }
    }
]
```

[](#)

## Sample API Call

[Try it in Graph Explorer](https://developers.facebook.com/tools/explorer/145634995501895/?method=POST&path=PASTE_CATALOG_ID_HERE%2Fitems_batch&version=v23.0&requests=[%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22method%22%3A%22UPDATE%22%2C%0A%20%20%20%20%20%20%22data%22%3A%7B%0A%20%20%20%20%20%20%20%20%20%20%22unknown_field%22%3A%20%22unknown_field_value%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20%22batch_api_product_123%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22item_group_id%22%3A%20%22g1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22price%22%3A%20%2214%20GBP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22image%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22http%3A%2F%2Fwebsite.com%2Fimage4.jpg%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22tag%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22t1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22t2%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20]%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22http%3A%2F%2Fwebsite.com%2Fimage5.jpg%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22tag%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22t1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22t2%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20]%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20]%2C%0A%20%20%20%20%20%20%20%20%20%20%22additional_variant_attribute%22%3A%20%22Scent%3AFruity%2CFlavor%3AApple%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22age_group%22%3A%20%22adult%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22applink%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22android_url%22%3A%20%22a%3A%2F%2Fb%2Fc%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22android_package%22%3A%20%22android.topwidgets%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22android_app_name%22%3A%20%22TopWidgets%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22ios_url%22%3A%20%22d%3A%2F%2Fe%2Ff%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22ios_app_store_id%22%3A%20%22123456%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22ios_app_name%22%3A%20%22TopWidgets%22%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%22brand%22%3A%20%22Top%20Widgets%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22color%22%3A%20%22yellow%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22condition%22%3A%20%22new%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22custom_label_0%22%3A%20%22label1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22custom_number_0%22%3A%202022%2C%0A%20%20%20%20%20%20%20%20%20%20%22description%22%3A%20%22Test%20description.%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rich_text_description%22%3A%20%22%3Cb%3ETest%3C%2Fb%3E%20%3Cu%3Edescription%3C%2Fu%3E.%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22disabled_capabilities%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22marketplace%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22b2c_marketplace%22%0A%20%20%20%20%20%20%20%20%20%20]%2C%0A%20%20%20%20%20%20%20%20%20%20%22fb_product_category%22%3A%20%22Apparel%20%26%20Accessories%20%3E%20Clothing%20%3E%20Suits%20%3E%20Tuxedos%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22gender%22%3A%20%22unisex%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22google_product_category%22%3A%20%22543586%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22gtin%22%3A%20%227798102151036%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22expiration_date%22%3A%20%222030-01-01%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22link%22%3A%20%22http%3A%2F%2Fwebsite.com%2Fproduct.html%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22importer_address%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22street1%22%3A%20%221%20Hacker%20Way%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22street2%22%3A%20%22Building%2018%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22city%22%3A%20%22Menlo%20Park%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22region%22%3A%20%22OK%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22postal_code%22%3A%20%2294025%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22country%22%3A%20%22US%22%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%22importer_name%22%3A%20%22Top%20Widgets%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22mobile_link%22%3A%20%22https%3A%2F%2Fm.topwidgets.com%2Fproducts%2Fbatch_api_product_123%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22quantity_to_sell_on_facebook%22%3A%2042%2C%0A%20%20%20%20%20%20%20%20%20%20%22material%22%3A%20%22stainless%20steel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22mpn%22%3A%20%22twp123%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ordering_index%22%3A%200%2C%0A%20%20%20%20%20%20%20%20%20%20%22origin_country%22%3A%20%22JP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pattern%22%3A%20%22stripes%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22product_type%22%3A%20%22Widgets%20%3E%20Metal%20Widgets%20%3E%20Striped%20Metal%20Widgets%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rating_count%22%3A%201002132%2C%0A%20%20%20%20%20%20%20%20%20%20%22sale_price%22%3A%20%2211%20GBP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22sale_price_effective_date%22%3A%20%222025-11-01T12%3A00-0300%2F2025-12-01T00%3A00-0300%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22size%22%3A%20%22Small%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22shipping%22%3A%20%22US%3ACA%3AGround%3A9.99%20USD%2CUS%3ANY%3AAir%3A15.99%20USD%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20%22Test%20Product%20Name%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22user_rating%22%3A%204.5%2C%0A%20%20%20%20%20%20%20%20%20%20%22vendor_id%22%3A%20%22marketplace_id_product_123%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22availability%22%3A%20%22in%20stock%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22internal_label%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22Literary%20Girl%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22Another%20tag%22%0A%20%20%20%20%20%20%20%20%20%20]%2C%0A%20%20%20%20%20%20%20%20%20%20%22video%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22https%3A%2F%2Fwebsite.com%2Fp123.mpg%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22tag%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22steel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22widget%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20]%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20]%0A%20%20%20%20%20%20%7D%0A%20%20%7D%0A]&item_type=PRODUCT_ITEM)

Updating the price, images and other properties of an item with item\_type=PRODUCT\_ITEM and id=‘batch\_api\_product\_123’

Request

```
curl -i -X POST \
   https://graph.facebook.com/<catalog-id>/items_batch \
   -F access_token=PASS_VALID_API_TOKEN_HERE \
   -F 'requests=[
       {
           "method":"UPDATE",
           "data":{
               "unknown_field": "unknown_field_value",
               "id": "batch_api_product_123",
               "item_group_id": "g1",
               "price": "14 GBP",
               "image": [
                   {
                       "url": "http://example.com/image4.jpg",
                       "tag": [
                       "t1",
                       "t2"
                       ]
                   },
                   {
                       "url": "http://example.com/image5.jpg",
                       "tag": [
                       "t1",
                       "t2"
                       ]
                   }
               ],
               "additional_variant_attribute": "Scent:Fruity,Flavor:Apple",
               "age_group": "adult",
               "applink": {
                   "android_url": "a://b/c",
                   "android_package": "android.topwidgets",
                   "android_app_name": "TopWidgets",
                   "ios_url": "d://e/f",
                   "ios_app_store_id": "123456",
                   "ios_app_name": "TopWidgets"
               },
               "brand": "Top Widgets",
               "color": "yellow",
               "condition": "new",
               "custom_label_0": "label1",
               "custom_number_0": 2022,
               "description": "Test description.",
               "rich_text_description": "<b>Test</b> <u>description</u>.",
               "disabled_capabilities": [
                   "marketplace",
                   "b2c_marketplace"
               ],
               "fb_product_category": "Apparel & Accessories > Clothing > Suits > Tuxedos",
               "gender": "unisex",
               "google_product_category": "543586",
               "gtin": "7798102151036",
               "expiration_date": "2030-01-01",
               "link": "http://example.com/product.html",
               "importer_address": {
                   "street1": "1 Hacker Way",
                   "street2": "Building 18",
                   "city": "Menlo Park",
                   "region": "OK",
                   "postal_code": "94025",
                   "country": "US"
               },
               "importer_name": "Top Widgets",
               "mobile_link": "https://m.example.com/products/batch_api_product_123",
               "quantity_to_sell_on_facebook": 42,
               "material": "stainless steel",
               "mpn": "twp123",
               "ordering_index": 0,
               "origin_country": "JP",
               "pattern": "stripes",
               "product_type": "Widgets > Metal Widgets > Striped Metal Widgets",
               "rating_count": 1002132,
               "sale_price": "11 GBP",
               "sale_price_effective_date": "2025-11-01T12:00-0300/2025-12-01T00:00-0300",
               "size": "Small",
               "shipping": [
                   {
                       "shipping_country": "US",
                       "shipping_region": "CA",
                       "shipping_service": "Pick-up point",
                       "shipping_price_value": "4.90",
                       "shipping_price_currency": "USD"
                   },
                   {
                       "shipping_country": "US",
                       "shipping_region": "CA",
                       "shipping_service": "Home delivery",
                       "shipping_price_value": "7.90",
                       "shipping_price_currency": "USD"
                   }
               ],
               "title": "Test Product Name",
               "user_rating": 4.5,
               "vendor_id": "marketplace_id_product_123",
               "availability": "in stock",
               "internal_label": [
                   "Literary Girl",
                   "Another tag"
               ],
               "video": [
                   {
                       "url": "https://example.com/p123.mpg",
                       "tag": [
                       "steel",
                       "widget"
                       ]
                   }
               ]
           }
       }
   ]' \
   -F item_type=PRODUCT_ITEM
```

Response

```
{
   "handles": [
"Acy_OJLm4aVJdxiRegHfiyhleq26r_CNVRc1wFGnSj1YpFC8azbIc-UscwUxuCWPJXPaSOcFZQZuMAccdE4wn816"
   ],
   "validation_status": [
       {
           "warnings": [
               {
                   "message": "Unrecognised field: A request for item batch_api_product_123 contains unrecognised field: 'unknown_field'"
               }
           ],
           "retailer_id": "batch_api_product_123"
       }
   ]
}
```

[](#)