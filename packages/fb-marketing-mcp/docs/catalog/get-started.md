---
title: "Introdução - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/get-started"
scraped_at: "2026-02-01T14:08:36.242Z"
---

# Get Started

This guide explains how to enhance your catalog and maximize discoverability and distribution of your items.

## Before You Start

Before you start, please review these recommendations and guidelines:

-   If you manage multiple catalogs for different businesses or want an agency to access your catalogs, you may need to set up [Business Manager](https://business.facebook.com/home/accounts?business_id=117943258886315).
    
-   The `catalog_management` permission grants your app the ability to create, read, update, and delete business-owned product catalogs of which the user is an admin. This permission grants access to related endpoints. By default, your app may only have access to product catalogs that are owned by admins and developers of the app when in developer mode. See [Catalog Management Reference](/docs/facebook-login/permissions/#reference-catalog_management).
    
-   For a commerce catalog, before buyers can purchase items from you, you'll need to upload your products information into a [catalog](https://developers.facebook.com/docs/commerce-platform/catalog/overview). Learn how to create a new ecommerce catalog using the [Commerce Manager](https://business.facebook.com/products/catalogs/new).
    
-   The `business_management` permission is required to update your catalog.
    
-   To use the [Catalog Batch API](/docs/marketing-api/businessmanager/assets#product_catalog), you need the appropriate [Marketing API Access Level](/docs/marketing-api/access#limits) and must accept the [Terms of Service](https://business.facebook.com/legal/product_catalog_terms/) by creating your first catalog through [Business Manager](https://business.facebook.com/). See [Catalog Reference](/docs/marketing-api/reference/product-catalog).
    

[](#)

## Step 1: Set up your catalog feed

1.  Set up your catalog feed using the [supported feed formats](https://developers.facebook.com/docs/commerce-platform/catalog/fields#supported-feed-formats). See also [supported feed formats](/docs/marketing-api/catalog/reference/#feed-format), including [Google Sheets](https://developers.facebook.com/docs/marketing-api/catalog/reference#google-sheets) and [feed format to schedule feed fetches](https://developers.facebook.com/docs/marketing-api/catalog/reference#feed-format-use-case).
    
2.  Add inventory to your catalog with a set of [universal attributes](https://developers.facebook.com/docs/commerce-platform/catalog/fields#universal-basic-attributes), then add [recommended attributes](https://developers.facebook.com/docs/commerce-platform/catalog/fields#universal-basic-attributes) or [additional attributes](https://developers.facebook.com/docs/commerce-platform/catalog/categories#additional-attributes) that are specific to the category of your items. See also [supported fields for Advantage+ catalog ads](/docs/marketing-api/catalog/reference/#da-commerce).
    

To set up your catalog for localized shopping with multiple languages and countries, see [Localized Catalog Setup](/docs/marketing-api/catalog/localized-catalog-setup), [Localized Catalog for Advantage+ Catalog Ads](/docs/marketing-api/catalog/localized-catalog-da), and [Localized Catalog for Instagram Shopping](/docs/marketing-api/catalog/localized-catalog-ig). See also [localized catalog supported fields](https://developers.facebook.com/docs/marketing-api/catalog/reference#loc-cat-fields).

Learn more about [how to use catalog fields](https://developers.facebook.com/docs/commerce-platform/catalog/fields#fields).

[](#)

## Step 2: Choose a product category

Provide **at least one category** for your items to help customers understand what type of item you’re selling:

-   [Google Product Category](https://developers.facebook.com/docs/commerce-platform/catalog/categories#google-prod-cat)
-   [Facebook Product Category](https://developers.facebook.com/docs/commerce-platform/catalog/categories#fb-prod-cat)

If you use onsite checkout, one of these category types is required.

[](#)

## Step 3: Schedule your feed upload

See [Schedule your feed uploads](/docs/marketing-api/catalog/guides/scheduled-feeds). For localized catalogs, see [Upload your feeds via the API](https://developers.facebook.com/docs/marketing-api/catalog/localized-catalog/localized-catalog-setup#upload-via-api).

[](#)

## Learn More

**About Catalog**

-   [Catalogs, Ads Help Center](https://www.facebook.com/business/help/890714097648074?id=725943027795860)
-   [How to Use Catalog Fields, Commerce](https://developers.facebook.com/docs/commerce-platform/catalog/fields#fields)
-   [Supported Fields, Catalog](https://developers.facebook.com/docs/marketing-api/catalog/reference#supported-fields)
-   [Universal Attributes](https://developers.facebook.com/docs/commerce-platform/catalog/fields#universal-basic-attributes)
-   [Create a Data Feed File for Catalog Items](https://www.facebook.com/business/help/1898524300466211?id=725943027795860)
-   [Data Feed Specifications for Catalogs](https://www.facebook.com/business/help/120325381656392?id=725943027795860)
-   [Google product category for catalog items](https://www.facebook.com/business/help/526764014610932)
-   [Prepare and Set Up Catalog for Advantage+ Catalog Ads, Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219712%3Fcontent_id%3DMRY0h11ihTBfj6p&h=AT2SEVsaATTbpG99q-u8u0pZN6qGwmQB5tb5RZBW_Sx9xNo6u8QAUU7LUsC-keu5kDfXlx_Fi-ry3j_qrPy5xW7WUPNfCXBYMj2-Mv_LHqUcoNxQ5WEmgtFjtYCSlQVqJk_-wRu4y0CVYIn4zITeY18Yv_teZwZUH09-BQi_oXc)
-   [Live Training: Troubleshoot Catalog for Advantage+ Catalog Ads, Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpage%2F549922-troubleshoot-catalog-for-advantage-catalog-ads%3Fcontent_id%3Dsh69r7qh1rswXYa&h=AT1vTaEtk4TYWep7u7egcor8SVRH6FOddteB0MDjfseA6fDb5hSMdDBzukPFcMuFKZSmfwTG34wYSIBoGS7Kmz783p60Ykx5B-PnEGAWojqt-Z5zYlzdx5TwzNoS2a8yf7PauOBXH_eg66GvvWb9bLs0PQSrZbDUx6_ufzo3UfA)

**About Checkout**

-   [About Checkout on Facebook and Instagram](https://www.facebook.com/business/help/2509359009104717?id=533228987210412)
-   [Checkout on Facebook and Instagram](https://www.facebook.com/business/help/2509359009104717)

**Best Practices and Policies**

-   [Best Practices, Commerce Catalog](https://developers.facebook.com/docs/marketing-api/catalog/best-practices)
-   [FAQs: Advantage+ Catalog Ads](/docs/marketing-api/advantage-catalog-ads/faq)
-   [Purchase Protection policies and requirements](https://www.facebook.com/policies/purchase_protection)
-   [Google's product taxonomy](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT3gi1_WoSeI4YLhZFyjeZG_swb7pgbwRRlLppibMQvg3SY3qmkQMtQSLTK9A7FjU8cWD54R1og2m3lb28cwhS4-RkOGiYUn1G-l7PFwl8I5bjbXLxzmQs6kdgwsjINCbGvBREiRq2UPL7YlNNWMx8QJqMNUjfEoOzBik9z3PPU)
-   [Tax calculations](#tax-calculations)

[](#)