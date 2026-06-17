---
title: "v21.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version21.0"
scraped_at: "2026-02-01T15:42:39.136Z"
---

# Versão 21.0

## API de Marketing

2 de outubro de 2024 | **Disponível até** 9 de setembro de 2025 | [Post de blog](https://developers.facebook.com/blog/post/2024/10/02/introducing-graph-api-v21-and-marketing-api-v21/)

### Objectives

#### Outcome-Driven Ad Experiences

_Applies to v21.0+._

Beginning with v21.0, you will no longer be able to create new ad sets or ads with non-Outcome-Driven Ad Experience (ODAX) objectives. Existing ad campaigns using older objectives can continue to run for now, but we encourage you to transition all your campaigns to the ODAX objectives. See the [Simplifying campaign objectives with Outcome-Driven Ad Experiences](https://developers.facebook.com/blog/post/2021/12/21/simplifying-campaign-objectives-outcome-driven-ad-experiences) blog entry and the [Outcome-Driven Ad Experiences documentation](/docs/marketing-api/reference/ad-campaign/#odax) for more information.

The following endpoints are affected:

-   [`POST /{ad_account_id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns)
-   [`POST /{ad_account_id}/ads`](/docs/marketing-api/reference/ad-account/ads)
-   [`POST /{ad_account_id}/adsets`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{campaign_id}`](/docs/marketing-api/reference/ad-campaign-group)
-   [`POST /{ad_group_id}`](/docs/marketing-api/reference/ad-group)

### Standard Enhancements

#### Image Expansion

_Applies to v21.0+._

For single media ads, the [Image Expansion feature](/docs/marketing-api/creative/generative-ai-features#image-expansion) will be included as part of Standard Enhancements. Therefore, if creating an ad or an ad creative opted-in to Image Expansion, please refer to this [link](/docs/marketing-api/advantage-catalog-ads/standard-enhancements/) for instructions to set `standard_enhancements` as a field inside the `creative_features_spec`.

The following endpoints are affected:

-   [`POST /{ad_account_id}/adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives)
-   [`POST /{ad_account_id}/ads`](/docs/marketing-api/reference/ad-account/ads)
-   [`GET /{ad_id}/previews`](/docs/marketing-api/reference/adgroup/previews)
-   [`GET /{ad_account_id}/generatepreviews`](/docs/marketing-api/generatepreview)

### Version 22 Upcoming Change

#### Product Catalog — Enforcing Country Override Specific Fields

Aplica-se a v22.0

This change applies to advertisers using country and language feeds to localize their product data. It standardizes which fields should be provided in a country feed versus a language feed (or a country and language feed via API) to help advertisers set up their product data in the most efficient way.

Price, sale price, unit price, base price, status (visibility), and availability must now only be provided in a country feed. This helps ensure customers see the correct localized product data.

If your language feed currently contains the `price`, `sale_price`, `base_price`, `status` or `availability` fields, move them to your country feed before the Graph API v22.0 release in Q1 2025 to ensure that the localized data continues to be uploaded to your products past this date.

Os seguintes pontos de extremidade foram afetados:

-   ``POST [`/{product-catalog-id}/localized_items_batch`](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/localized_items_batch/)``

[](#)

[](#)