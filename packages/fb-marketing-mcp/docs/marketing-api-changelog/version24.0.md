---
title: "v24.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version24.0"
scraped_at: "2026-02-01T14:05:35.488Z"
---

# Versão 24.0

## API de Marketing

8 de outubro de 2025 | **Disponível até** A ser definido | [Blog](https://developers.facebook.com/blog/post/2025/10/08/introducing-graph-api-v24-and-marketing-api-v24/)

### Ad Creative

#### Website destination optimization

_Applies to v24.0+._

When you [optimize your website destination](https://www.facebook.com/business/help/1261275665394096), you allow Meta to determine which landing page on your website to send a customer to based on which URL we believe is most likely to result in a conversion. Using **Optimize website destination** means we may direct a customer to a page on your website that's most relevant to them, like your homepage, product page, collection page or another page on your website depending on where they're likely to convert.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives)
-   [`GET /{ad-creative-id}/?fields=destination_spec`](/docs/marketing-api/reference/ad-creative#fields)

### Ads that Click to Messenger

#### Messenger ads for leads deprecation

_Applies to v24.0+._

The ability to create [lead ads that generate leads in Messenger](/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger#leads) with the API is being deprecated. You will still be able to create Messenger ads for leads using Ads Manager.

The following endpoints are affected:

-   [`POST /{page-id}/messenger_lead_forms`](/docs/graph-api/reference/page/messenger_lead_forms)
-   [`POST /{ad-account-id}/adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives)
-   `GET /{messenger-lead-gen-template-id}`

### Advantage+ Campaigns

#### Advantage+ shopping campaigns and Advantage+ app campaigns deprecation

_Applies to v24.0+._

We are introducing a new, unified, and streamlined process for creating campaigns that will replace the existing workflows.

Beginning with v24.0, creation, duplication, and updates to [Advantage+ shopping campaigns](/docs/marketing-api/advantage-shopping-campaigns) and [Advantage+ app campaigns](/docs/app-ads/advantage-app-campaigns/) will no longer be allowed.

Refer to the [Advantage+ Campaigns documentation](/docs/marketing-api/advantage-campaigns) to learn how to [migrate your campaigns](/docs/marketing-api/advantage-campaigns/#migrate-advatage--shopping-campaigns-and-advantage--app-campaigns-into-advantage--campaigns), or create new Advantage+ campaigns to avoid disruption.

The following endpoints are affected:

-   [`POST /{ad-account-id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns/)
-   [`POST /{campaign-id}/copies`](/docs/marketing-api/reference/ad-campaign-group/copies/)

### Audiences

#### Customer file custom audiences

_Applies to v24.0+. Will apply to all versions January 6, 2026._

Updating [customer file custom audiences](/docs/marketing-api/audiences/guides/custom-audiences) that are [flagged custom audiences](/docs/marketing-api/reference/custom-audience/#flagged) will fail. Creating and updating lookalike audiences using flagged seed audiences will fail.

More information on this update and how to resolve flagged custom audiences can be found [here](https://www.facebook.com/business/help/1055828013359808).

The following endopints are affected:

-   [`POST {ad-account-id}/customaudiences`](/docs/marketing-api/reference/ad-account/customaudiences)
-   [`GET {custom-audience-id}`](/docs/marketing-api/reference/custom-audience)
-   [`POST {custom-audience-id}`](/docs/marketing-api/reference/custom-audience)
-   [`POST {custom-audience-id}/users`](/docs/marketing-api/reference/custom-audience/users)
-   [`POST {custom-audience-id}/usersreplace`](/docs/marketing-api/reference/custom-audience/usersreplace)
-   [`DELETE {custom-audience-id}/users`](/docs/marketing-api/reference/custom-audience/users)

#### Lookalike audience field type enforcement

_Applies to v24.0+. Will apply to all versions January 6, 2026._

When creating new [lookalike audiences](/docs/marketing-api/audiences/guides/lookalike-audiences), the `lookalike_spec` field is now required to match the valid types. Requests with a `lookalike_spec` field containing invalid subfields may fail to create a new lookalike audience.

The following endpoints are affected:

-   [`POST /{ad-account-id}/customaudiences`](docs/marketing-api/reference/custom-audience)

### Budgeting

#### Ad set budget sharing field conditionally required

_Applies to v24.0+._

[Ad set budget sharing](/docs/marketing-api/bidding/guides/adset-budget-sharing) allows you to share up to 20% of your budget with other ad sets in the same campaign. This is designed to improve performance for campaigns that are not using a campaign budget.

Beginning with v24.0, the `is_adset_budget_sharing_enabled` field is now required if you are planning to set a budget at the ad set level. Setting it to `true` is recommended in order to turn on this optimization.

The following endpoints are affected:

-   [`POST /{ad-account-id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns/)

#### Increasing daily budget flexibility

_Applies to v24.0+._

Daily budget flexibility is increasing from 25% to 75%. This means up to 75% over your [daily budget](/docs/marketing-api/bidding/overview/budgets) may be spent on days when better opportunities are available, and less on others.

Your daily budget is used as an average over a seven-day calendar week from Sunday through Saturday. Your weekly spend will not change, and will not be greater than 7 times your daily budget.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{ad-account-id}/campaigns`](/docs/marketing-api/reference/ad-account/campaigns/)
-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign/)
-   [`POST /{campaign-id}`](/docs/marketing-api/reference/ad-campaign-group)

### Conversions

#### Custom conversions

_Applies to v24.0+. Will apply to all versions January 6, 2026._

Updating [custom conversions](/docs/marketing-api/reference/custom-conversion/) that are [flagged custom conversions](/docs/marketing-api/reference/custom-conversion/#flagged-custom-conversions) will fail.

More information on this update and how to resolve flagged custom conversions can be found [here](https://www.facebook.com/business/help/2455915321411996).

The following endpoint is affected:

-   [`POST /{custom-conversion-id}`](/docs/marketing-api/reference/custom-conversion/)

### Campaigns

#### Campaign restrictions for custom conversions and audiences

_Applies to v24.0+. Will apply to all versions January 6, 2026._

Creating and updating campaigns that are using flagged [custom conversions](/docs/marketing-api/reference/custom-conversion/#flagged-custom-conversions) or [audiences](/docs/marketing-api/reference/custom-audience/#flagged) will fail.

More information on this update and how to resolve flagged custom conversions and audiences can be found [here](https://developers.facebook.com/blog/post/2025/10/08/introducing-graph-api-v24-and-marketing-api-v24/#marketing-api).

The following endpoints are affected:

-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign/)
-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)

### Catalog

#### New batch API payload request limit

_Applies to v24.0+._

We’ve added a new limit to the size of request payloads for the Catalog Items Batch API. Starting with v24.0, payload requests will be limited to 30 MB. Note that in terms of the number of items per request, the current limit of 5,000 items remains unchanged.

The following endpoint is affected:

-   [`POST /{product-catalog-id}/items_batch`](/docs/marketing-api/reference/product-catalog/items_batch/)

#### Product Item endpoint supports `allow_upsert`

_Applies to v24.0+._

The `allow_upsert` flag is now supported for the Product Item POST endpoint. That means users can now not only create product items using the Product Item POST endpoint, but also update existing items.

The following endpoint is affected:

-   [`POST /{product-catalog-id}/products`](/docs/marketing-api/reference/product-catalog/products/)

### Placements

#### Advantage+ placements limited spend

_Applies to v24.0+._

This update allows you to allocate up to 5% of your spend to specific placements you would otherwise exclude when it's likely to improve performance.

During ad set creation, you can now apply a [limited spend](/docs/marketing-api/audiences/reference/placement-targeting#limited-spend-on-excluded-placements) using the new `placement_soft_opt_out` parameter. There is no change in how placements are fully opted out with [Placement Targeting](/docs/marketing-api/audiences/reference/placement-targeting).

**Note:** This feature works with the Sales and Leads objectives.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign/)
-   [`GET /{ad-set-id}?fields=placement_soft_opt_out`](/docs/marketing-api/reference/ad-campaign#parameters)

#### Facebook video feeds ads placement deprecation

_Applies to v24.0+._

Delivery of Facebook video feeds ad placements will be stopped and campaign spending will be shifted to other placements automatically. Attempting to create or update an ad campaign with the Facebook video feeds ad placement will produce an error.

The Facebook Reels placement is the recommended replacement.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign/)

### Targeting

#### Detailed targeting

_Applies to v24.0+. Will apply to all versions January 6, 2026._

We are combining some of the interests currently available in [Detailed Targeting](/docs/marketing-api/audiences/reference/detailed-targeting) into relevant groupings.

Certain detailed targeting interest options will not be supported for new campaigns. When creating new or updating existing campaigns with affected interest options, you will encounter an error preventing you from publishing your changes. If an interest option has been combined, the search results will show the new, consolidated option.

Ad campaigns created before October 8, 2025 can continue to run, but will stop being delivered by January 15, 2026, unless removed or updated with suggested combined options.

Beginning October 8, 2025, duplicated campaigns using the affected interest options will automatically be replaced with suggested combined options for Marketing API v24.0 calls.

The following endpoints are affected:

-   [`POST /{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets)
-   [`POST /{ad-set-id}`](/docs/marketing-api/reference/ad-campaign/)
-   [`POST /{ad-set-id}/copies`](/docs/marketing-api/reference/ad-campaign/copies)
-   [`GET /{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate/)
-   [`GET /{ad-set-id}/delivery_estimate`](/docs/marketing-api/reference/ad-campaign/delivery_estimate/)
-   [`GET /{ad-account-id}/reachestimate`](/docs/marketing-api/reference/ad-account/reachestimate/)
-   [`GET /{ad-account-id}/targetingsearch`](/docs/marketing-api/reference/ad-account/targetingsearch/)
-   [`GET /{ad-account-id}/targetingsuggestions`](/docs/marketing-api/reference/ad-account/targetingsuggestions)
-   [`GET /{ad-account-id}/targetingvalidation`](/docs/marketing-api/reference/ad-account/targetingvalidation)
-   [`GET /search`](/docs/marketing-api/audiences/reference/basic-targeting/#interest-targeting)

[](#)

[](#)