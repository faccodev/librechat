---
title: "Page Owned Catalog API - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/page-owned-product-catalog-api"
scraped_at: "2026-02-01T15:53:21.638Z"
---

# Page-Owned Product Catalog API

**Note**: This API currently has limited functionality and is being released incrementally. Access to it is limited.

This document explains how to create a catalog for a Facebook Page using the Pages-Owned Product Catalogs API.

## Before You Start

Before you start, you need the following:

-   A valid Facebook **Page ID** (passed in the URL).
-   A valid user access token with permissions to manage catalogs and Pages.
-   (_Optional_) Meta’s business ID managing the page you want to link to the catalog.
-   (_Optional_) External business ID/installation ID of third- party partner.
-   (_Optional_) Agency’s information to share catalog with the agency business.

[](#)

## API Use Cases

**When a page ID exists without a corresponding business ID**: By making a call without a `business_id`, the API will create a catalog for the page passed in the URL.

**When a business ID exists**: By passing the `business_id` as a parameter, the API will create a catalog & associate it with the business & the page passed in the URL.

**When you want to provide partial access to an agency business**: By providing both the `business_id` and `business_metadata` as parameters, the API will create a catalog, link it to the specified business and page from the URL, and share it with the agency `business_id` included in the `business_metadata`.

[](#)

## Limitations

Only the **commerce** vertical is supported. Any other value for `vertical` will result in API failure.

If the `agency` param is provided in `business_metadata`, both `business_id` and `permitted_tasks` inside the `agency` field are required.

[](#)

## Create a Product Catalog for a Page

To create a product catalog, send a `POST` request to the `/pages/{page_id}/owned_product_catalogs` endpoint.

Your request body should be comprised of:

Field

Description

`name`

**Required**  
The name of the catalog.

`vertical`

**Optional**  
The vertical type. Defaults to `commerce` if not provided.

`business_id`

**Optional**  
The Facebook business ID to link the catalog.

`business_metadata`

**Optional**  
Additional metadata consisting of external business ID and agency information.

  

Optional fields inside `business_metadata`:

Field

Description

`external_business_id`

**Optional**  
Partner's business ID for which the catalog is created.

`agency`

**Optional**  
If provided, must include both `business_id` (agency’s Facebook business ID) and `permitted_tasks` (240588526848665 to manage, 2015469438531460 to advertise, etc.).

In your API call you must include the access token which has permission for **catalog management** and **page metadata management**.

Ao testar uma chamada de API, você pode incluir o parâmetro `access_token` definido como seu token de acesso. No entanto, quando fizer chamadas seguras do seu app, use as [classes de token de acesso](https://developers.facebook.com/docs/facebook-login/guides/access-tokens#portabletokens).

Example request:

```
curl -X POST "https://api.facebook.com/{page_id}/owned_product_catalogs \
 -H  "Content-Type: application/json" \
 -H "Authorization: Bearer <ACCESS_TOKEN>" \
 -d '{
      "name":"My catalog",
      "vertical":"commerce",
      "business_id":"<META_BUSINESS_ID>",
      "business_metadata":{ 
        "external_business_id": "<PARTNER_EXTERNAL_ID>",
           "agency": {
              "business_id": "<AGENCY_META_BUSINESS_ID>",
              "permitted_tasks": ["240588526848665"],
           }
         } 
       }
```
  

On success, your app receives the following JSON response with the ID for the created catalog:

```
{ "id": "CATALOG_ID" }
```

[](#)

## See Also

To learn more about the components and concepts mentioned in this guide, refer to the following guides:

-   [Catalog](/docs/marketing-api/catalog)
-   [Business Owned Product Catalogs API](/docs/marketing-api/reference/business/owned_product_catalogs)
-   [Access Tokens Guide](/docs/facebook-login/guides/access-tokens#portabletokens)

[](#)