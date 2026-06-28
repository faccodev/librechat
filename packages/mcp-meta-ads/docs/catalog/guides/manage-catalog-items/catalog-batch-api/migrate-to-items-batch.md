---
title: "Migrate to the Items Batch Endpoint - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/manage-catalog-items/catalog-batch-api/migrate-to-items-batch"
scraped_at: "2026-02-01T15:54:36.046Z"
---

# Migrate to the /items\_batch Endpoint

This document will help you plan migration of your API integration from the legacy [/batch](/docs/marketing-api/reference/product-catalog/batch/) endpoint to its replacement the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint.

## Why You Should Migrate

-   The [/batch](/docs/marketing-api/reference/product-catalog/batch/) endpoint is no longer maintained and will eventually be deprecated.
-   The new [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint is more versatile and can handle all operations supported by the /batch endpoint.
-   The new [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint has support for [category-specific fields](/docs/commerce-platform/catalog/categories).

[](#)

## Differences Between the Endpoints

The [/batch](/docs/marketing-api/reference/product-catalog/batch/) and the new [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoints were designed, at different points in time, to solve the same problem. It is important to note the following differences between the two:

### Difference 1 - Additional item\_type parameter

Since the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint supports the concept of verticals, you are required to pass a value of the ‘item\_type’ parameter. If migrating from the /batch endpoint, you should always pass item\_type=PRODUCT\_ITEM.

### Difference 2 - Data for some fields is passed differently

/batch

/items\_batch

Comment

retailer\_id

id

The /batch endpoint has product retailer\_id passed as part of a request object.

In the case of the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint, the corresponding ‘id’ field is part of the ‘data’ field of the request object (see example requests below).

price, currency

price

Price may need to be divided by 100 depending on the currency (see [this documentation](/docs/marketing-api/currencies/)). The currency code needs to be appended.

Example: `99.99 USD`

sale\_price

sale\_price

For passing the sale\_price value to the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint, the value from the /batch payload needs to be divided by 100 (depending on the currency, see [documentation](/docs/marketing-api/currencies/)) and a currency code needs to be appended to it.

Example: `99.99 USD`

image\_url

image\_link

Same value, different field name

url

link

Same value, different field name

name

title

Same value, different field name

manufacturer\_part\_number

mpn

Same value, different field name

additional\_image\_urls

additional\_image\_link

Same value, different field name

category

google\_product\_category

Same value, different field name

shipping

shipping

Fields in the structures describing shipping are named differently.

/batch

/items\_batch

country

shipping\_country

price\_currency

shipping\_price\_currency

price\_value

shipping\_price\_value

region

shipping\_region

service

shipping\_service

Alternatively, the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint can handle shipping information passed as a single string consisting of comma-separated blobs (representing shipping options) in the following format: COUNTRY:STATE:SHIPPING\_TYPE:PRICE

Example: `US:CA:Ground:9.99 USD, US:NY:Air:15.99 USD`

additional\_variant\_attributes

additional\_variant\_attribute

The /batch endpoint expects this data to be passed as a label->value dictionary. The [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint expects this to be passed as an array of objects with two fields: variant\_label, variant\_value.

Example:

`[ {“variant_label”: “a1”, “variant_value”: “v1}, {“variant_label”: “a2”, “variant_value”: “v2} ]`

applinks

applink

The /batch endpoint expects app links to be passed as a dictionary where the key represents a platform name (such as ‘android’, ‘ios’, etc.) and the values are arrays of objects containing data related to the link. The same data should be passed to the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint as a flat object with the following fields:

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

retailer\_product\_group\_id

item\_group\_id

Same value, different field name

sale\_price\_start\_date, sale\_price\_end\_date

sale\_price\_effective\_date

The /batch endpoint receives the start and end dates of a sale as two separate fields. The [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint requires them to be passed as a single string with two dates separated by a slash.

Example: `2014-11-01T12:00-0300/2014-12-01T00:00-0300`

  
  

#### Example of Two Equivalent API Requests

  

/batch

/items\_batch

```
curl -i -X POST \
  https://graph.facebook.com/<CATALOG_ID>/batch \
  -F access_token=<TOKEN> \
  -F 'requests=[
      {
          "method":"UPDATE",
          "data":{
              "retailer_product_group_id": "g1",
              "price": 1400,
              "currency": "GBP",
              "image_url": "http://website.com/image4.jpg",
              "additional_variant_attributes": {"Scent": "Fruity", "Flavor": "Apple"},
              "applinks": {
                 "android": [{
                  "url": "a://b/c",
                  "package": "android.topwidgets",
                  "app_name": "TopWidgets"
                 }],
                 "ios": [{
                  "url": "d://e/f",
                  "app_store_id": 123456,
                  "app_name": "TopWidgets"
                 }]
              },
              "category": "543586",
              "url": "http://website.com/product.html",
              "manufacturer_part_number": "twp123",
              "sale_price": 1100,
              "shipping": [
               {
                   "country": "US",
                   "region": "CA",
                   "service": "Pick-up point",
                   "price_value": "4.90",
                   "price_currency": "USD"
               },
               {
                   "country": "US",
                   "region": "CA",
                   "service": "Home delivery",
                   "price_value": "7.90",
                   "price_currency": "USD"
               }
               ],
              "name": "Test Product Name",
          },
          "retailer_id": "legacy_batch_api_product_123",
      }
  ]'
```

```
curl -i -X POST \
  https://graph.facebook.com/<CATALOG_ID>/items_batch \
  -F access_token=<TOKEN> \
  -F 'requests=[
      {
          "method":"UPDATE",
          "data":{
              "id": "batch_api_product_123",
              "item_group_id": "g1",
              "price": "14 GBP",
              "image_link": "http://website.com/image4.jpg",
              "additional_variant_attribute": "Scent:Fruity,Flavor:Apple",
              "applink": {
                  "android_url": "a://b/c",
                  "android_package": "android.topwidgets",
                  "android_app_name": "TopWidgets",
                  "ios_url": "d://e/f",
                  "ios_app_store_id": "123456",
                  "ios_app_name": "TopWidgets"
              },
              "google_product_category": "543586",
              "link": "http://website.com/product.html",
              "mpn": "twp123",
              "sale_price": "11 GBP",
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
          }
      }
  ]' \
  -F item_type=PRODUCT_ITEM
```

### Difference 3 - /items\_batch warns about unsupported fields in the API response

The legacy /batch API endpoint ignores requests with unrecognized fields while the [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint issues a warning but still ingests the fields that it recognizes.

[](#)

## Recommended Process for Migrating to the /items\_batch Endpoint

At a high level the process should include the following two steps:

1.  Implement the code necessary to pass all the necessary inputs to the items\_batch endpoint. While doing so, you should take the differences listed above into account.
2.  Gradually migrate your integration from the legacy /batch endpoint to the new [/items\_batch](/docs/marketing-api/reference/product-catalog/items_batch/) endpoint.

If you run into issues when carrying out the migration, please reach out to your business partner or reach out to Meta support.

[](#)