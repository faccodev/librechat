---
title: "Feeds complementares - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/supplementary-feeds"
scraped_at: "2026-02-01T15:52:30.324Z"
---

# Supplementary Feeds

Supplementary Feeds are used to modify existing data sources by providing either new or updated product field values. They can only be used to update existing products, but cannot add or remove products.

This document outlines the steps required to build an API integration to enable Supplementary Feeds support in your applications.

For more high-level information about Supplementary Feeds and use cases, please see these Help Center articles:

-   [Create a Supplementary Feed for Your Facebook Catalog](https://www.facebook.com/business/help/884650838839678)
-   [Add a Supplementary Feed to Your Facebook Catalog](https://www.facebook.com/business/help/609872007120910)

## Requirements

Your application must have the `catalog_management` permission to create and read Supplementary Feeds.

[](#)

## Set Up Your Integration

Supplementary Feeds are files that represent a list of products. Under the hood, they map to existing products by attaching the Supplementary Feed to the primary data source that originally added the product.

A typical flow when doing an integration might look like this:

**Step 1**: Authenticate by using [Facebook Login](/docs/facebook-login/) with the `catalog_management` permission

**Step 2**: Create a catalog selection page for the user to choose which catalog to supplement. List catalogs functionality can be found here:

-   [For Commerce](/docs/commerce-platform/catalog/overview)
-   [For Marketing](/docs/marketing-api/reference/product-catalog/)

**Step 3**: Find the available primary data sources which populate the catalog:

```
GET https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/data_sources?ingestion_source_type=PRIMARY
```
  

**Step 4**: Create a Supplementary Feed using the [Feed API](/docs/commerce-platform/catalog/feed)

-   Supplementary Feeds require the fields `ingestion_source_type` and `primary_feed_ids` to be populated.
-   The Supplementary Feed file requires all items to have the `id` attribute populated. Each `id` must match an existing product from the attached primary data source(s). Read more about [Universal Basic Attributes](/docs/commerce-platform/catalog/fields/#universal-basic-attributes) and [Category Specific Fields](/docs/commerce-platform/catalog/categories/#cat-spec-fields).
-   The relationship between Supplementary feeds and Primary data sources is 1-to-many. In other words, a Supplementary Feed can be attached to multiple Primary data sources, but primary data source may only have up to 1 Supplementary Feed attached.

**Step 5**: Handle Feed Upload Errors

See the following docs to learn about handling upload errors:

-   [Handling Product Feed Upload Errors](https://developers.facebook.com/docs/commerce-platform/catalog/feed#errors)
-   [Download a Full Product Feed Errors Report](https://developers.facebook.com/docs/commerce-platform/catalog/feed#error_report)

[](#)

## Learn More

-   [Feed API Reference](/docs/marketing-api/catalog/guides/feed-api)
-   [Create a Supplementary Feed for Your Facebook Catalog (Business Help Center)](https://www.facebook.com/business/help/884650838839678)
-   [Add a Supplementary Feed to Your Facebook Catalog (Business Help Center)](https://www.facebook.com/business/help/609872007120910)

[](#)