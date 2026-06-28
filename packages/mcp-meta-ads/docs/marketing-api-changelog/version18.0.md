---
title: "v18.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version18.0"
scraped_at: "2026-02-01T14:09:15.491Z"
---

# Versão 18.0

## API de Marketing

**Lançada em** 12 de setembro de 2023 | **Disponível até** 13 de agosto de 2024 | [Publicação de blog](/blog/post/2023/09/12/introducing-facebook-graph-and-marketing-api-v18/)

### Catalog API

#### Credit Cards

_Applies to v18.0+._

The `{ad-account-id}/credit_cards` endpoint is no longer supported.

### Reach and Frequency

#### Reach and Frequency Campaigns

_Applies to v18.0+._

**Objective**

-   Target frequency can now be used for `REACH` and `VIDEO_VIEWS` objectives in reach and frequency campaigns.
-   The `objective` parameter will no longer accept `TRAFFIC` unless the `rf_prediction_id_to_share` parameter is set to a valid prediction ID.

**Optimizations**

-   Reach and frequency campaigns can now use the `REACH` optimization.
-   The `optimization_goal` parameter will no longer accept `POST_ENGAGEMENT` or `LINK_CLICKS` unless the `rf_prediction_id_to_share` parameter is set to a valid prediction ID.
-   The `frequency_cap` parameter will no longer accept any value greater than `0` if the `optimization_goal` parameter is set to `AD_RECALL_LIFT`. `AD_RECALL_LIFT` predictions will be generated without applying any frequency cap.

The following endpoints are affected:

-   [`POST /act_{ad-account-id}/reachfrequencypredictions`](/docs/marketing-api/reference/reach-frequency-prediction)

### Targeting

#### Location Targeting

_Applies to v18.0+. Will apply to all versions December 11, 2023._

When no `location_types` is sent in the API call, it will default to `['home', 'recent']`.

The following endpoints are affected:

-   [`GET /act_{ad-account-id}/reachestimate`](/docs/marketing-api/reference/ad-account/reachestimate/)
-   [`GET /act_{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate/)
-   [`POST /act_{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)

#### Location Targeting Deprecation

_Applies to v18.0+._

All options other than `['home','recent']` will be deprecated for `location_types`. Trying to use any options other than `['home', 'recent']` will result in an error.

The following endpoints are affected:

-   [`GET /act_{ad-account-id}/reachestimate`](/docs/marketing-api/reference/ad-account/reachestimate/)
-   [`GET /act_{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate/)
-   [`POST /act_{ad-account-id}/saved_audiences`](/docs/marketing-api/reference/saved-audience/)
-   [`POST /act_{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`POST /{saved-audience-id}`](/docs/marketing-api/reference/saved-audience/)

[](#)

[](#)