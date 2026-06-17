---
title: "v22.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version22.0"
scraped_at: "2026-02-01T14:05:47.894Z"
---

# Versão 22.0

## API de Marketing

21 de janeiro de 2025 | **Disponível até** 10 de fevereiro de 2026 | [Blog](/blog/post/2025/01/21/introducing-graph-api-v22-and-marketing-api-v22)

### Ad Creatives

_Applies to v22.0+. Will apply to all versions September 9, 2025._

#### Field Deprecations

The `instagram_actor_id` field for the following endpoints is deprecated:

-   [`POST /{ad-account-id}/adcreatives`](/docs/marketing-api/reference/adcreative)
-   [`POST /{ad-account-id}/ads`](/docs/marketing-api/reference/ad-account/ads/)
-   [`POST /{ads-id}`](/docs/marketing-api/reference/adgroup)
-   [`POST /{ad-account-id}/asyncadrequestsets`](/docs/marketing-api/reference/ad-account/asyncadrequestsets)
-   [`GET /{ad-account_id}/generatepreviews`](/docs/marketing-api/reference/ad-account/generatepreviews)
-   [`GET /generatepreviews`](/docs/marketing-api/reference/generatepreviews)
-   [`GET /adcreative`](/docs/marketing-api/reference/ad-creative)
-   [`GET /adcreative/object_story_spec`](/docs/marketing-api/reference/ad-creative-object-story-spec)

Please migrate your API calls to use the new `instagram_user_id` field.

The `effective_instagram_story_id` field has been deprecated for the [`GET /adcreative` endpoint](/docs/marketing-api/reference/ad-creative#fields). Use the `effective_instagram_media_id` field instead.

The `instagram_story_id` field has been deprecated for the [`GET /adcreative` endpoint](/docs/marketing-api/reference/ad-creative#fields). Use the `source_instagram_media_id` field instead.

### Advantage+ Creative

#### Standard Enhancements

_Applies to v22.0+._

[Opting ads in to](/docs/marketing-api/advantage-catalog-ads/standard-enhancements) and [previewing ads](/docs/marketing-api/advantage-catalog-ads/creative-preview) using the `STANDARD_ENHANCEMENTS` bundle is no longer supported.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives)
-   [`POST /{ad-account-id}/ads`](/docs/marketing-api/reference/ad-account/ads)
-   [`GET /{ad-id}/previews`](/docs/marketing-api/reference/adgroup/previews)
-   [`GET /{ad-account-id}/generatepreviews`](/docs/marketing-api/generatepreview)

### Asset Feed Spec

#### Segment Asset Customization

_Applies to v22.0+._

[Segment Asset Customization](/docs/marketing-api/dynamic-creative/segment-asset-customization) is no longer supported.

### Audiences

#### Detailed Targeting - Employer Exclusions

_Applies to all versions._

An employer exclusion can now be created at the ad account level, which will be applied to all active campaigns.

The following endpoints are affected:

-   [`POST /{ad-account-id}/account_controls`](/docs/marketing-api/reference/ad-account/account_controls)
-   [`GET /{ad-account-id}/account_controls`](/docs/marketing-api/reference/ad-account/account_controls)

#### Detailed Targeting - Exclusions

_Applies to v22.0+. Will apply to all versions April 21, 2025._

-   When creating or updating an ad set, an error message will be shown when adding any new detailed targeting exclusions that are not within audience control exclusions at the account level.
-   When duplicating an ad set, detailed targeting exclusions (except audience control exclusions at the account level) will be removed in the new campaign.
-   When trying to get a delivery estimate, only employer exclusions will be allowed for detailed targeting.

As a result of this change, custom audiences will be deprecated within the `exclusions` field. You can still continue using custom audience exclusions by using the `excluded_custom_audiences` field instead. For more details see [Advanced Targeting: Custom Audiences](/docs/marketing-api/audiences/reference/advanced-targeting/#custom_audiences).

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{adset-id}/copies`](/docs/marketing-api/reference/ad-campaign/copies)
-   [`GET /{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate)

#### Reach People Interested in Selected Cities and Regions

_Applies to v22.0+._

Expands location targeting beyond an ad campaign's target cities or regions to deliver ads to people who have shown interest in a location.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`GET /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`GET /{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate)

### Commerce Platform

#### Promotions API – field deprecation

_Applies to v22.0+._

The `promotions` field has been deprecated and replaced by the `promotion_details` field. Please discontinue using the `promotions` field, as it does not contain complete information. Please migrate your API calls to the new `promotion_details` field.

The following endpoint is affected:

-   [`GET /{commerce-order-id}/promotion_details`](/docs/graph-api/reference/commerce-order/promotion_details/)

### Instagram Endpoints

_Applies to v22.0+. Will apply to all versions April 21, 2025._

The Instagram endpoints supported by the Marketing API have been deprecated.

The following endpoints are affected:

-   [`DELETE /{instagram-comment-id}`](/docs/marketing-api/reference/instagram-comment)
-   [`GET /{instagram-carousel-id}`](/docs/marketing-api/reference/instagram-carousel)
-   [`GET /{instagram-carousel-id}/comments`](/docs/marketing-api/reference/instagram-carousel/comments)
-   [`GET /{instagram-comment-id}`](/docs/marketing-api/reference/instagram-comment)
-   [`GET /{instagram-comment-id}/replies`](/docs/marketing-api/reference/instagram-comment/replies)
-   [`GET /{instagram-media-id}`](/docs/marketing-api/reference/instagram-media)
-   [`GET /{instagram-media-id}/comments`](/docs/marketing-api/reference/instagram-media/comments)
-   [`GET /{instagram-user-id}`](/docs/marketing-api/reference/instagram-user)
-   [`GET /{instagram-user-id}/agencies`](/docs/marketing-api/reference/instagram-user/agencies)
-   [`GET /{instagram-user-id}/ar_effects`](https://developers.facebook.com/docs/marketing-api/reference/instagram-user/ar_effects/)
-   [`GET /{instagram-user-id}/authorized_adaccounts`](/docs/marketing-api/reference/instagram-user/authorized_adaccounts)
-   [`GET /{instagram-user-id}/upcoming_events`](/docs/marketing-api/reference/instagram-user/upcoming_events)
-   [`POST /{instagram-user-id}/authorized_adaccounts`](/docs/marketing-api/reference/instagram-user/authorized_adaccounts)
-   [`POST /{instagram-carousel-id}/comments`](/docs/marketing-api/reference/instagram-carousel/comments)
-   [`POST /{instagram-comment-id}`](/docs/marketing-api/reference/instagram-comment)
-   [`POST /{instagram-comment-id}/replies`](/docs/marketing-api/reference/instagram-comment/replies)
-   [`POST /{instagram-media-id}`](/docs/marketing-api/reference/instagram-media)
-   [`POST /{instagram-user-id}/upcoming_events`](/docs/marketing-api/reference/instagram-user/upcoming_events)

Please migrate your API calls to use the following [Instagram Platform endpoints](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login):

-   [`IG User`](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user)
-   [`IG Media`](https://developers.facebook.com/docs/instagram-platform/reference/instagram-media)
-   [`IG Media Children`](https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/children)
-   [`IG Comment`](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-comment)
-   [`IG Comment Replies`](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-comment/replies)

### Special Ad Categories

We are providing an update regarding the previously considered restrictions on customer list custom audiences (CLCAs) for advertisers offering housing, employment, and financial products and services in or targeting audiences in the United States.

The rollout of these previously announced restrictions will not proceed.

Certain customer list custom audiences will become ineligible for usage in ad sets of housing, employment, and financial products and services, including credit, campaigns beginning March 2025. Learn more about the update [here](https://www.facebook.com/business/help/1452187872132363) and whether the restrictions apply to you.

#### Ad Sets for Special Ad Category Campaigns

_Applies to v22.0+. Will apply to all versions March 2025._

Starting with v22.0, you will be unable to create or update ad sets if their targeting options contain one or more ineligible customer list custom audiences. You will need to either [certify](https://www.facebook.com/legal/customer-list-custom-audience-certification) if eligible or remove any such audiences to successfully create or update the ad set. Starting early April 2025, existing campaigns/ad sets using customer list custom audiences which do not follow the requirements may be paused. If this happens, you will see errors in Ads Manager and the Marketing API with instructions.

The `is_sac_cfca_terms_certified` field will be added to the ad set API. You will be required to use this field to certify that any customer list custom audiences being used in an ad set of a housing, employment, and financial products and services, including credit, campaign comply with [Meta’s CLCA certification](https://www.facebook.com/legal/customer-list-custom-audience-certification).

This change affects the following endpoints when creating or updating ad sets:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign)

#### Custom Audiences

_Applies to all versions._

Starting on January 6, 2025, you can use the new `is_eligible_for_sac_campaigns` field to identify whether a custom audience can be used in ad sets of Special Ad Category campaigns. You must provide the intended `special_ad_categories` and `special_ad_category_countries` of the Special Ad Category campaign using the audience, as well as the `ad_account_id` which will use the audience to create or edit the ad set.

This change affects the following endpoints:

-   [`GET /{custom-audience-id}`](/docs/marketing-api/reference/custom-audience)

See [Special Ad Categories](https://developers.facebook.com/docs/marketing-api/audiences/special-ad-category) for more information about these changes.

[](#)

[](#)