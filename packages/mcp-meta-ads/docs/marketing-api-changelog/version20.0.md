---
title: "v20.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version20.0"
scraped_at: "2026-02-01T15:42:42.994Z"
---

# Versão 20.0

## API de Marketing

21 de maio de 2024 | **Disponível até** 6 de maio de 2025 | [Publicação de blog](https://developers.facebook.com/blog/post/2024/05/21/introducing-facebook-graph-and-marketing-api-v20/)

### Graph API do Instagram

#### Instagram User Insights

_Applies to v20.0+. Will apply to all versions on August 19, 2024._

The `last_14_days`, `last_30_days`, `last_90_days` and `prev_month` timeframes will no longer be supported for the `reached_audience_demographics` and `engaged_audience_demographics` metrics.

The following endpoints and metrics are affected:

-   [`GET /{ig-user-id}/insights`](/docs/instagram-api/reference/ig-user/insights)
    -   `engaged_audience_demographics`
    -   `reached_audience_demographics`

[](#)

### Auction Ads

#### Campaign Optimization of Impressions

_Applies to v20.0+. Will apply to all versions August 19, 2024._

The `optimization_goal` parameter will no longer accept the impressions value in combination with:

-   The legacy `POST_ENGAGEMENT` objective
-   The `ON_POST` destination\_type

**Note:** Optimizing for reach is still available.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)

#### Frequency Controls

_Applies to v20.0+. Will apply to all versions August 19, 2024._

The `frequency_control_specs` parameter should no longer be sent in an API call if the `optimization_goal` is set to Ad Recall Lift, Link Click Optimization, Post Engagement, or 2-second Video Views. Any campaigns of this type that are still running will be disabled beginning August 19, 2024.

Writes to this field are only available in ad sets where `REACH` and `THRUPLAY` are the performance goal.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)

### Offline Conversions API

#### Deprecation of Remaining Endpoints

_Applies to v20.0+._

The Offline Conversions API will be discontinued in May 2025. It was previously due to be deprecated in the third quarter of 2024. As we announced in [the v17.0 changelog](/docs/graph-api/changelog/version17.0#offline-conversions-api), the Offline Conversions API no longer supports offline events. Graph API v16.0 is the last version that supports offline events. The Offline Conversions API will be discontinued when v16.0 expires in May 2025.

Between now and May 2025, we will be deprecating the remaining Offline Conversions API endpoints on Marketing API v20.0.

The following endpoints are affected:

-   [`POST/GET/DELETE /{offline_event_set_id}`](/docs/graph-api/reference/offline-conversion-data-set/events)
-   [`POST/GET /{offline_event_set_id}/uploads`](/docs/graph-api/reference/offline-conversion-data-set/uploads/)
-   [`POST /{offline_event_set_id}/validate`](/docs/graph-api/reference/offline-conversion-data-set/validate/)
-   `POST /{offline_event_set_id}/ad_account`
-   [`GET /{offline_event_set_id}/stats`](/docs/graph-api/reference/offline-conversion-data-set/stats/)
-   [`GET /{offline_event_set_id}/shared_agencies`](/docs/graph-api/reference/offline-conversion-data-set/shared_agencies/)
-   [`POST/GET /{offline_event_set_id}/agencies`](/docs/graph-api/reference/offline-conversion-data-set/agencies/)
-   [`GET /{offline_event_set_id}/adaccounts`](/docs/graph-api/reference/offline-conversion-data-set/adaccounts/)
-   [`GET /{offline_event_set_id}/customconversions`](/docs/graph-api/reference/offline-conversion-data-set/customconversions/)
-   [`GET /{offline_event_set_id}/audiences`](/docs/graph-api/reference/offline-conversion-data-set/audiences/)
-   [`GET /{offline_event_set_id}/shared_accounts`](/docs/graph-api/reference/offline-conversion-data-set/shared_accounts/)
-   [`GET /{ad_account_id}/offline_conversion_data_sets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST/GET /{business_id}/offline_conversion_data_sets`](/docs/marketing-api/reference/business/offline_conversion_data_sets/)
-   `POST/GET/DELETE /{business_asset_group_id}/contained_offline_conversion_data_sets`

In February 2023, we announced that the Conversions API now fully supports offline events. We recommend that advertisers use the Conversions API for new integrations. We recommend that advertisers with Offline Conversions API integrations [convert their integration into a Conversions API integration](/docs/marketing-api/conversions-api/offline-events) before May 2025 and not update their Offline Conversions API until they have successfully done so. Learn more about [the Conversions API](/docs/marketing-api/conversions-api).

### Messaging Ads

#### Sponsored Messages

_Applies to v20.0+. Will apply to all versions August 19, 2024._

Creation of the sponsored messages ad type will no longer be available. This change will not affect other messaging ads ad types.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives)

[](#)

[](#)