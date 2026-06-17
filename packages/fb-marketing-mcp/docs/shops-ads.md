---
title: "Anúncios de Lojas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/shops-ads"
scraped_at: "2026-02-01T13:53:33.964Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/shops-ads/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 17 de dez de 2025  
Atualização em Português (Brasil): 4 de nov de 2025

# Shops Ads

Shops ads is a solution that improves your ad performance by sending potential customers to either your website or your shop, depending on where we think they are more likely to make a purchase.

## Before you begin

To create a product catalog sale or conversion ad using the website and shop conversion location, you will need:

-   A shop using Checkout with Facebook and Instagram.
-   A Facebook Page or Instagram account connected to your shop.
-   A catalog connected to your shop. See the [Catalog Fields](/docs/commerce-platform/catalog/fields) documentation for the required fields for commerce and ads.
-   [Commerce eligibility for Shops Ads](#commerce-eligibility-for-shops-ads).

[](#)

## Step 1: Create a campaign

Start by creating your [ad campaign](/docs/marketing-api/reference/ad-campaign-group/) with a `POST` request to `/act_{ad_account_id}/campaigns`.

At this level, you must set your advertising goal through the objective field. For Shops ads, the supported objectives are `PRODUCT_CATALOG_SALES` and `CONVERSIONS` for non-[Outcome-Driven Ad Experience](https://developers.facebook.com/blog/post/2021/12/21/simplifying-campaign-objectives-outcome-driven-ad-experiences/) (ODAX) and `OUTCOME_SALES` objective for ODAX.

-   For the `PRODUCT_CATALOG_SALES` objective, the `promoted_object` is product catalog ID. Note the product catalog has to be connected to an onsite shop to be eligible for Shops ads.
-   For the `CONVERSIONS` objective, the `promoted_object` field is not required.

### Examples for non-ODAX objectives

Example of creating a campaign with the `PRODUCT_CATALOG_SALES` objective

```
v24.0
```

Example of creating a campaign with the `CONVERSIONS` objective

```
v24.0
```

### Examples for ODAX objectives

Example of creating a `PRODUCT_CATALOG_SALES` campaign with the `OUTCOME_SALES` objective

```
v24.0
```

Example of creating a `CONVERSIONS` campaign with the `OUTCOME_SALES` objective

```
v24.0
```

[](#)

## Step 2: Create an ad set

For Shops ads, you must specify the destination type as `SHOP_AUTOMATIC` for your ad set.

-   If the objective of the campaign is set to `PRODUCT_CATALOG_SALES`, you must provide a product set ID in `promoted_object` to promote products from that product set.
-   If the object of the campaign is set to `CONVERSIONS`, define your `promoted_object` to be a commerce account with onsite checkout enabled.

Other requirements for Shops ads:

-   Shops ads only supports `PURCHASE` as a conversion event (`CUSTOM_EVENT_TYPE`) in the product set (if the objective is `PRODUCT_CATALOG_SALES`) or in the Meta Pixel (if the objective is `CONVERSIONS`).
-   Shops ads only supports optimizing for offsite conversions (`OFFSITE_CONVERSIONS` as `optimization_goal`).
-   Shops ads only supports a bid strategy without a cost cap.
-   In order for Shops ads to be delivered to the shop, targeting must include audiences in regions with onsite checkout support (currently, United States).
-   In order for Shops ads to be delivered to the shop, the placement must include at least one platform with onsite checkout support (currently, Facebook and Instagram).

Example of creating a Shops ads ad set with a campaign with the `PRODUCT_CATALOG_SALES` objective that is billed on `IMPRESSIONS`

```
v24.0
```

Example of creating a Shops ads ad set with a campaign with the `CONVERSIONS` objective that is billed on `IMPRESSIONS`

```
v24.0
```

[](#)

## Step 3: Provide a creative

With Shops ads ad sets, you can create

-   [Carousel ads](#carousel-ads-or-image-video-ads)
-   [Image/video ads](#carousel-ads-or-image-video-ads) (only when the objective of the campaign is `CONVERSIONS`)
-   [Advantage+ catalog ads with a carousel format](#advantage-catalog-ads-with-a-carousel-format)
-   [Ads with Advantage+ creative for catalog](#advantage-creative-for-catalog)

Shops ads do not support the following:

-   Image/video ad formats when the objective of the campaign is `PRODUCT_CATALOG_SALES`
-   [Collection ad formats](/docs/marketing-api/guides/collection)
-   Calls to action set to messaging a Page, Instagram, or WhatsApp
-   Destinations set to an app, event, or [Instant Experiences](/docs/marketing-api/guides/instant-experiences#create-an-ad-creative) when the objective is `CONVERSIONS`

### Carousel Ads or Image/Video Ads

You can create a [carousel ad](/docs/marketing-api/guides/videoads#carousel) just like non-Shops ads. If the objective of your campaign is `CONVERSIONS`, you can also create an [image](/docs/marketing-api/creative)/[video](/docs/marketing-api/guides/videoads#video_create) ad.

The `page_id` and/or `instagram_user_id` specified in `object_story_spec` must have at least one shop belonging to the commerce account you chose to promote in your ad set or the catalog you chose to promote in your campaign. They must also be connected to the same commerce account.

Additionally for Shops ads, you need to specify an onsite destination as an alternative destination for your offsite landing page. To do this, set the `onsite_destination` field in the `asset_feed_spec` of your creative.

Onsite destination must be one of:

-   Shop storefront page  
    The shop must belong to the commerce account you promote in your ad set.
    
-   A product set  
    The product set must belong to the catalog of the commerce account you promote in your ad set and must contain at least one visible in stock product.
    
-   A product  
    The product must belong to the catalog of the commerce account you promote in your ad set.
    

Example `onsite_destinations` field in `asset_feed_spec` set to shop storefront page

```
asset_feed_spec= {
  "onsite_destinations": [
    {
      "storefront_shop_id": "<SHOP_STOREFRONT_ID>"
    }
  ]
}
```

Example `onsite_destinations` field in `asset_feed_spec` set to product set

```
asset_feed_spec= {
  "onsite_destinations": [
    {
      "shop_collection_product_set_id": "<PRODUCT_SET_ID>"
    }
  ]
}
```

Example `onsite_destinations` field in `asset_feed_spec` set to a specific product

```
asset_feed_spec= {
  "onsite_destinations": [
    {
      "details_page_product_id": "<PRODUCT_ID>"
    }
  ]
}
```

Example of a creative for an image ad

```
v24.0
```

### Advantage+ catalog ads with a carousel format

To create a carousel ad promoting products from a product set, you can follow [Get Started with Advantage+ Catalog Ads - Step 3: Provide an Ad Creative](/docs/marketing-api/advantage-catalog-ads/get-started#step-3).

The `page_id` and/or `instagram_user_id` specified in `object_story_spec` must have at least one shop belonging to the commerce account you chose to promote in your ad set or the catalog you chose to promote in your campaign. They must also be connected to the same commerce account.

For the product set in the creative:

-   If you are setting up a campaign with `PRODUCT_CATALOG_SALES` as the objective, the product set you choose must belong to the catalog you set in your campaign and must be the same as the product set you choose to promote in your ad set.
-   If you are setting up a campaign with `CONVERSIONS` as the objective, the product set you choose must belong to the catalog of the commerce account you choose to promote in your ad set.

The additional features supported for Shops ads are optimizations for shops. If we think that it might improve your ad performance, we will automatically add different optimizations to your ads. To opt-in to this, set `shops_bundle` to `true` in the `asset_feed_spec` of your creative (This includes both automated product tags and reasons to shop at the moment, and potentially other optimizations in the future.)

Current supported shop optimizations are:

-   **Automated product tags:** We may automatically tag products in your ad. Product tags send people directly to the relevant product page in your shop.
-   **Reasons to shop:** We may automatically highlight product information from your shop, like "Free shipping", "Trending" or "Low stock". We may also add an existing offer, which lets customers save on selected items in your shop.

To opt-in to automated product tags, set `automated_product_tags` to `true` in the `template_data` of the `object_story_spec`. To opt-in to reasons to shop, set `reasons_to_shop` to `true` in the `asset_feed_spec` of your creative.

#### Examples of carousel ads promoting a product set with opt-in to fully automated shop optimizations

  

Opting in to `shops_bundle`

```
v24.0
```
  

Opting in to `automated_product_tags`

```
v24.0
```
  

Opting in to `reasons_to_shop`

```
v24.0
```

**Note:**

-   Shops ads does not support categories for Advantage+ catalog ads.
-   Automated product tags optimization is only supported on Instagram.

### Advantage+ creative for catalog

Shops ads also support [Advantage+ creative for catalog](/docs/marketing-api/advantage-creative-for-catalog). This feature displays different formats and ad creatives to different Account Center accounts based on what they are most likely to respond to.

You can follow the instructions in [Advantage+ Creative for Catalog - Step 3: Provide Ad Creative](/docs/marketing-api/advantage-creative-for-catalog#provide-creative) to set up your creative.

The `page_id` and/or `instagram_user_id` specified in `object_story_spec` must have at least one shop belonging to the commerce account you chose to promote in your ad set or the catalog you chose to promote in your campaign. They must also be connected to the same commerce account.

For the product set in the creative:

-   If you are setting up a campaign with `PRODUCT_CATALOG_SALES` as the objective, the product set you choose must belong to the catalog you set in your campaign and must be the same as the product set you choose to promote in your ad set.
-   If you are setting up a campaign with `CONVERSIONS` as objective, the product set you choose must belong to the catalog of the commerce account you choose to promote in your ad set.

Example of an Advantage+ creative for catalog

```
v24.0
```

[](#)

## Step 4: Create an ad

Finally, you can create an ad referencing an ad creative.

```
v24.0
```

[](#)

## Shops ads with Advantage+ Shopping Campaigns

Shops ads are supported together with Advantage+ shopping campaigns, which is believed to drive an even better performance when combined together.

To create an Advantage+ shopping campaign with Shops ads, follow the steps in [Advantage+ Shopping Campaigns - Step 2: Create Campaign](https://developers.facebook.com/docs/marketing-api/guides/advantage-shopping-campaigns#step-2) to create a campaign first.

When creating an ad set for Advantage+ shopping campaigns with Shops ads, similar to Shops ads alone, set the `destination_type` to be `SHOP_AUTOMATIC` and specify your commerce account in `promoted_object`.

```
v24.0
```

See [Cross-Channel Conversion Optimization for Advantage+ Shopping Campaigns](https://developers.facebook.com/docs/marketing-api/guides/advantage-shopping-campaigns/cross-channel-conversion) for more information.

When creating a creative and an ad for Advantage+ shopping campaigns with Shops ads, the spec is the same as Shops ads alone. See [Step 3: Provide a creative](#step-3) above for more detail.

[](#)

## Commerce Eligibility for Shops Ads

In order to get relevant IDs for Shops ads, you need to the `catalog_management` permission from your client.

To create Shops ads for a Page, the Page has to have an onsite visible shop. You can get this from

```
v24.0
```

**Sample Response**

```
{
  "id":"<commerce_account_id>",
  "shops": {
    "data": [
      {
        "fb_sales_channel": {
          "status": "STAGING",
          "fb_page": {
            "name": "Page 1",
            "id": "<page_id>"
          }
        },
        "id": "<shop_id_1>",
        "is_onsite_enabled": true,
        "shop_status": "INACTIVE"
      },
      {
        "fb_sales_channel": {
          "status": "ENABLED",
          "fb_page": {
            "name": "Page 2",
            "id": "<page_id>"
          }
        },
        "id": "<shop_id_2>",
        "is_onsite_enabled": true,
        "shop_status": "ACTIVE"
      }
    ],    
    // …
}
```

For the Page you wish to create Shops ads with, check if both `is_onsite_enabled` is `true` and `shop_status` is `ACTIVE`. If so, you will be able to create Shops ads for the Page through the instructions in the rest of this guide.

[](#)

## Get Commerce IDs for Creating Shops Ads

To create a Shops ad for a Page, you need:

-   Commerce Account ID (for [Step 2: Create an ad set](#step-2))
-   Catalog ID (for [Step 1: Create a campaign](#step-1))
-   Product set ID (for [Step 2: Create an ad set](#step-2) or [Advantage+ catalog ads with a carousel format](#advantage-catalog-ads-with-a-carousel-format))
-   Shop ID (for [Carousel Ads or Image/Video Ads](#carousel-ads-or-image-video-ads))
-   Product ID (for [Carousel Ads or Image/Video Ads](#carousel-ads-or-image-video-ads))

You can get the Commerce Account ID and Shop ID by running the previous query.

```
v24.0
```

A commerce account might have multiple shops, you need to get the one with the Page you want to create Shops ads with.

For catalog ID, product set ID and product ID

```
v24.0
```

**Sample Response**

```
{
  "id": "<commerce_account_id>",
  "product_catalogs": {
    "data": [
      {
        "id": "<product_catalog_id>",
        "product_sets": {
          "data": [
            {
              "id": "<product_set_id>",
              "name": "Product Set 1",
              "filter": "{\"product_item_id\":{\"is_any\":[]}}"
            },
          ],
        }
      }
    ]
  }
}
```

[](#)