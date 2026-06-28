---
title: "v23.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version23.0"
scraped_at: "2026-02-01T14:05:41.396Z"
---

# Versão 23.0

## API de Marketing

29 de maio de 2025 | **Disponível até** 9 de junho de 2026 | [Blog](https://developers.facebook.com/blog/post/2025/05/29/introducing-graph-api-v23-and-marketing-api-v23)

### Ad Campaigns

#### Advantage+ Shopping Campaigns and Advantage+ App Campaigns

_Applies to v23.0.+ Will apply to all versions with the release of v25.0._

The `advantage_state` field in `advantage_state_info` is a read-only field that indicates if a campaign has reached an optimal level of automation. Beginning with v25.0, the `smart_promotion_type` field will no longer be available for creating ad campaigns.

The following endpoints are affected:

-   [`GET /{ad-campaign-id}`](/docs/marketing-api/reference/ad-campaign-group)
-   [`GET /{ad-account-id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns)

### Audiences

#### Advanced Targeting

_Applies to v23.0+._

Age range and gender settings can now be used as suggestions in ad sets using individual\_setting's age and gender parameters inside targeting\_automation.

**Note:** When using suggestions, your ads will reach people outside of the setting when it's likely to improve performance of the ads.

The following endpoints are affected:

-   [`GET /{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate)
-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{adset-id}/copies`](/docs/marketing-api/reference/ad-campaign/copies)

#### Advantage+ Audience

_Applies to v23.0+._

Ad sets are now opted-in to Advantage+ audience by default if you're using the default or relaxed setup. You can opt-out in the audience settings when creating or updating an ad set.

This behavior applies only when creating a new ad set; updating an existing ad set will not exhibit this behavior on any version.

The following endpoints are affected:

-   [`GET /{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate)
-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{adset-id}/copies`](/docs/marketing-api/reference/ad-campaign/copies)

### Bidding

#### Reservation

_Applies to v23.0+._

Beginning with v23.0, the `instagram_destination_id` field will return the `ig_user_id` rather than the `instagram_actor_id`. The `instagram_actor_id` is also no longer supported in the `destination_ids` parameter; update your API calls to use the `ig_user_id` instead.

The following endpoints are affected:

-   [`GET /{rf-prediction-id}`](/docs/marketing-api/reference/reach-frequency-prediction)
-   [`GET /{ad-account-id}/reachfrequencypredictions`](/docs/marketing-api/reference/ad-account/reachfrequencypredictions)
-   [`POST /{ad-account-id}/reachfrequencypredictions`](/docs/marketing-api/reference/ad-account/reachfrequencypredictions)

### Product Item

#### Videos

_Applies to v23.0+._

The `videos` field has been added to allow for querying of the properties of videos associated with product items.

The following endpoints are affected:

-   [`GET /{product-item-id}`](/docs/marketing-api/reference/product-item/)

### Special Ad Catagories

#### Ad Sets for Special Ad Category Campaigns

_Applies to v23.0. Will Apply to all versions August 27, 2025._

The `is_sac_cfca_terms_certified` field should no longer be added to an ad set as the rollout of these requirements will not proceed.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{ad_set_id}`](/docs/marketing-api/reference/ad-campaign)

#### Custom Audiences

_Applies to v23.0. Will Apply to all versions August 27, 2025._

The `is_eligible_for_sac_campaigns` field should no longer be added to an ad set as the rollout of these requirements will not proceed.

The following endpoints are affected:

-   [`GET /{custom_audience_id}`](/docs/marketing-api/reference/custom-audience#Reading)

[](#)

[](#)