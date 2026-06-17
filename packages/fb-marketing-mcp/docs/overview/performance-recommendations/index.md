---
title: "Recomendações de desempenho - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/overview/performance-recommendations/"
scraped_at: "2026-02-01T14:32:10.258Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/overview/performance-recommendations/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 29 de jan  
Atualização em Português (Brasil): 12 de jan

# Opportunity Score and Recommendations

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1287685952526348&version=1769736866)

[Opportunity score](https://www.facebook.com/business/help/804913634782260) and [recommendations](https://www.facebook.com/business/help/2086509315182746) enable advertisers to discover and implement best practices that can optimize their ad campaigns with Meta. This guide will help you understand the components of opportunity score and how to integrate them with your application.

Opportunity score is a tool for understanding how well-optimized an ad account is for achieving optimal performance and generates recommendations that could improve performance. It consists of two parts:

1.  Your opportunity score (range: 0–100) — Reflects how optimized your ad account is. A higher score indicates better optimality and a greater likelihood of improved performance over time.
    
    -   Opportunity score is provided as a [field of an ad account](/docs/marketing-api/reference/ad-account#fields).
    -   Opportunity score is updated in near real-time in response to campaign changes and the application of available recommendations.
2.  Recommendations — Experimentally-proven best practices that are personalized to each ad account. They may relate to your campaigns, ad sets, or ads, and have been rigorously tested to show they can deliver statistically significant performance improvements.\*
    
    -   Implementing recommendations will improve setup and increase opportunity score.
    -   Recommendations have assigned point values based on how much each is expected to improve your campaign performance.\*
    -   You may see recommendations related to a variety of categories including campaign objectives and goals, audience, automation, creative and placements, budget and bidding, or signals.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=24708171388806990&version=1769736866)

\* **Note:** Meta is frequently testing new types of recommendations on the Ads Manager Web UI. Under certain circumstances, there could be fewer recommendations returned by the API versus what is shown in Ads Manager.

By applying performance recommendations from Meta, you agree to the [Facebook Terms of Service](https://www.facebook.com/legal/terms) including your obligation to comply with the [Self-serve ad terms](https://www.facebook.com/legal/self_service_ads_terms), the [Commercial terms](https://www.facebook.com/legal/commercial_terms), and the [Facebook Advertising Policies](https://www.facebook.com/policies/ads).

## Supported Inventory and APIs

### Fetching recommendations

To fetch all the recommendations available for your ad account, make a `GET` request to the `/act_<AD_ACCOUNT_ID>/recommendations` endpoint where `<AD_ACCOUNT_ID>` is the ID for your Meta ad account.

#### Example request

```
v24.0
```

#### Example response

On success, your app receives a list of recommendations that Meta has generated. If this list is empty, Meta has not identified any changes that can be made to increase the ads performance in your ad account.

```
{
  "data": [
    {
      "recommendations": [
       {
         "recommendation_signature": "1234567",
         "type": "AUTOFLOW_OPT_IN",
         "object_ids": ["7656787679008", "2345678765423", ...],
         "recommendation_content": {
        	"lift_estimate": "Up to 3% more Traffic",
        	"body": "2 of your ad sets have similar objectives and creatives..",
        	"opportunity_score_lift": "14"
        },
         "url": "https://adsmanager.facebook.com/adsmanager/...."
      }
    ],
   }
  ]
  ...
}
```

#### Parameters

Name

Description

`recommendation_signature`

Unique identifier for this recommendation. Required to refer to this recommendation in the recommendation application API.

For recommendations that cannot be resolved in the API, this value will not be returned.

`type`

Enum value denoting what type of recommendation this is. Description of what each possible value means and what applying them entails is provided in the [Applying recommendations](#applying-recommendations) secion below.

`object_ids`

List of ads objects that pertain to this recommendation. May be a campaign, ad set, or ad.

`lift_estimate`

Describes the improvement that could see in accepting a given recommendation.

`body`

This is a description of the recommendation similar to the descriptions listed in teh [Performance recommendation types](#performance-recommendation-types) section below.

`opportunity_score_lift`

This is the lift in opportunity score that would be expected from applying this recommendation.

`url`

This is the URL that links directly to the user flow in Ads Manager to apply the recommendation.

### Applying recommendations

To apply a recommendation for your ad account, make a `POST` request to the `/act_<AD_ACCOUNT_ID>/recommendations` endpoint where `<AD_ACCOUNT_ID>` is the ID for your Meta ad account.

#### Parameters

The recommendation application API supports the following parameters.

Name

Description

`recommendation_signature`

string

**Required.**

Signature provided in the recommendation fetching API, which corresponds to a unique recommendation.

`music_parameters`

object

**Optional.**

Music recommendation parameters. Specific parameters are listed below.

`autoflow_parameters`

object

**Optional.**

Autoflow opt-in recommendation parameters. Specific parameters are listed below.

`fragmentation_parameters`

object

**Optional.**

Fragmentation recommendation parameters. Specific parameters are listed below.

#### The `music_parameters` object

Name

Description

`object_selection`

array of numeric strings

**Optional.**

A list of ad IDs to apply the music recommendation to. List must be a subset of provided IDs in `object_ids`.

#### The `autoflow_parameters` object

Name

Description

`object_selection`

array of numeric strings

**Optional.**

A list of ad IDs to apply the autoflow opt-in recommendation to. List must be a subset of provided IDs in `object_ids`.

#### The `fragmentation_parameters` object

Name

Description

`object_selection`

array of numeric strings

**Optional.**

A list of ad set IDs to apply the fragmentation recommendation to. List must be a subset of provided IDs in `object_ids`.

#### Example request

```
v24.0
```

#### Example response

On success, your app receives a Boolean value denoting whether the recommendation was successfully applied. If it was not successfully applied, your ad objects will remain unchanged.

```
{
  "success": true
}
```

### Performance recommendation types

These are the currently supported performance recommendation types and what happens when the recommendation is succcessfully applied.

Name

Description

`MUSIC`

Allow Meta to automatically select and add music to your ads, at no cost to you, based on their content.

Applying this recommendation will enable this functionality for the selected ads objects. If no selection is provided, it will be enabled for all listed ads objects.

Use of music in your ads is subject to the [Sound Collection Terms](https://facebook.com/sound/collection/terms).

`AUTOFLOW_OPT_IN`

Enable standard enhancements, which leverages Meta's data to deliver different variations of your ad when likely to improve performance.

Applying this recommendation will enable this functionality for the selected ads objects. If no selection is provided, it will be enabled for all listed ads objects.

`AUTOMATIC_PLACEMENTS`

Allow Meta to automatically select additional placements for your ad sets while making the most of your budget. Learn more about [Advantage+ Placements](https://web.facebook.com/business/help/196554084569964).

`UNCROP_IMAGE`

Expand your images to fit more placements. You can use generated images that expand the aspect ratios of your media, which can fit your ad into new placements and show them to more people.

Applying this recommendation will enable this functionality for the selected ads objects. If no selection is provided, it will be enabled for all listed ads objects.

`FRAGMENTATION`

Some of your ad sets have similar setups and creatives, but different audiences. As a result, they may take longer to exit the learning phase and spend more budget before performance has optimized. To optimize your ads spending, combine your similar ad sets into one ad set.

Applying this recommendation will perform the following changes:

-   **The top performing ad set will remain on, while the rest are turned off.** The top performing ad set will be the one listed in `object_ids`.
-   **Targeting selections from the ad sets which are turned off will be merged into top performing ad set.** For example, if Ad Set 1 targeted 18-25 year olds and Ad Set 2 targeted 35-40 year olds, your combined ad set would target 18-40 year olds. Your audience changes will include: Locations included.
-   **Ads from the ad sets which are turned off will be included in the top performing ad set.**
-   **Budgets from the ad sets which are turned off will be added to the budget of the top performing ad set.**

`CREATIVE_FATIGUE`

Cost per result for this ad set may be higher than ads you ran in the past because its image or ide has been show to parts of your audience too many times.

Applying this recommendation requires an ad ID and creative ID, and will create a copy of the provided ad, except with the provided new creative.

`CREATIVE_LIMITED`

Cost per result for this ad set may be higher than ads you ran in the past because its image or ide has been show to parts of your audience too many times.

Applying this recommendation requires an ad ID and creative ID, and will create a copy of the provided ad, except with the provided new creative.

`SIGNALS_GROWTH_CAPI`

By integrating the [Conversions API](https://web.facebook.com/business/tools/conversions-api), you can get more accurate data about the conversions from your Meta ads, which will improve audience targeting and help lower your cost per result.

Get started with the [Conversions API](/docs/marketing-api/conversions-api).

**Note:** This recommendation currently cannot be applied through Marketing API.

`CAPI_PERFORMANCE_MATCH_KEY`

Your ads performance can benefit from sending additional fields within your existing conversions reporting.

Please review your Meta Pixel integration in Events Manager.

**Note:** This recommendation currently cannot be applied through Marketing API.

`SCALE_GOOD_CAMPAIGN`

Some ad sets or campaigns have had stable delivery and a lower cost per result compared to ad sets and campaigns with the same optimization goal that you or your peers have run. Increase their budgets to further scale your results.

`SHOPS_ADS`

Multiple ad sets in your account use the website conversion location. Help improve your ad performance by selecting `website` and `shop` for their conversion location. This lets you automatically send traffic either to your website or shop on Facebook or Instagram.

`ADVANTAGE_PLUS_AUDIENCE`

Leverage Advantage+ audiences to let Meta automatically identify and target the most relevant audience segments for your ad sets, optimizing your budget for maximum impact. Learn more about [Advantage+ Audiences](https://www.facebook.com/business/help/273363992030035).

`AD_LIFT_RECALL_OPTIMIZATION_GOAL`

Create a new awareness campaign with the performance goal "Maximize ad recall lift" to help more people remember your brand.

`ADVANTAGE_PLUS_CATALOG_ADS`

Create a campaign using Advantage+ catalog to deliver personalized ads to new and existing interested shoppers based on their behaviors, interests, and intent.

`BACKGROUND_GENERATION`

Help your products stand out by using AI-generated backgrounds with eligible product images to show the version thats likely to perform best.

`BUDGET_LIMITED`

Your current budget may be limiting the performance of your campaigns. You could get more results by increasing the budget.

`CAPI_CRM_GUIDANCE`

Connect your CRM with the Conversions API to help optimize the quality of your leads, which can lead to more conversions.

`CONVERSION_LEADS_OPTIMIZATION`

Choose "Maximize number of conversion leads" as your performance goal to help lower the cost of reaching people most likely to convert.

`CTX_CREATION_PACKAGE`

Use a "Tailored messages" campaign to simplify campaign creation and help get more messages at the best value.

`CTX_HVS`

Duplicate your campaign as an "Engagement" campaign with "Maximize number of conversations" as the performance goal to help drive more conversations at a lower cost.

`DELIVERY_ERROR`

None of the ad sets within this campaign are running. Each ad set has at least one error that needs to be resolved.

`DYNAMIC_ADVANTAGE_CAMPAIGN_BUDGET`

Spend less of your budget on underperforming ad sets and more on ad sets with the best opportunities. You can set limits or scheduling for each ad set.

`LANDING_PAGE_VIEW_OPTIMIZATION_GOAL`

Create a campaign with the performance goal of "Maximize landing page views" to deliver ads to audiences who are most likely to visit your website.

`LEAD_ADS_GUIDANCE`

Lower your cost per lead and create your campaign in fewer steps using a tailored leads campaign, a preset with built-in best practices to help you get more leads at the best value.

`MESSAGING_EVENTS`

Set up your purchase events through WhatsApp or a messaging partner, then select the "Maximize purchases through Messaging" performance goal to help lower costs.

`MESSAGING_PARTNERS`

Work with a messaging partner to help manage incoming messages, generate leads, and provide extensive analytics to optimize your conversations and conversions.

`MIXED_FORMATS`

Use a mix of videos and images in your campaign to reach users in different ways.

`MULTI_TEXT`

Select more text options so they can be mixed and matched to create different versions of your ad. The version that may perform best will be shown for each placement.

`OFFSITE_CONVERSION`

Select the "Maximize number of conversions" performance goal to help drive new customers to your website and lower your cost per result.

`PERFORMANT_CREATIVE_REELS_OPT_IN`

Select "Reels" placements for ads already using media that works well in Reels placements, so people are more likely to interact with them.

`PIXEL_OPTIMIZATION_HIE`

Set up "Purchase events" with Meta Pixel, which helps deliver ads to the people most likely to convert and can lower your cost per purchase.

`PIXEL_UPSELL`

Connect your website using Meta Pixel to help improve audience targeting, better understand your conversions, and help reduce your cost per result over time.

`PIXELLESS_LPV_OPTIMIZATION_GOAL`

Update your performance goal to "Maximize number of landing page views", which no longer requires a Meta Pixel integration, to deliver your ads to audiences who are most likely to visit your website.

`SCALE_GOOD_CTX_CAMPAIGN`

These messaging ad sets and campaigns have had stable delivery and better performance compared to your ad sets and campaigns with the same goals. Consider increasing their budgets to scale the results further.

`REELS_PC_RECOMMENDATION`

Include a fullscreen vertical video (9:16) with audio in your Reels ads to improve performance.

`SHOPS_ADS_SAOFF`

Improve your ad performance by selecting "Website" and "Shop" conversion locations for ad sets currently using the Website conversion location. This lets you automatically send traffic either to your website or shop on Facebook or Instagram.

`UNIFIED_INBOX`

Answer unread customer messages within 5 hours of receipt to help increase their value.

`VALUE_OPTIMIZATION_GOAL`

Reach people more likely to generate higher value for your business by focusing on key events across the customer journey, like "Add to cart". Use the "Maximize value of conversions" performance goal to get started.

`WA_MESSAGING_PARTNERS`

Work with a messaging partner to help manage incoming messages, generate leads, and provide extensive analytics to optimize your conversations and conversions.

[](#)

## Best Practices for Querying Ads

### Use Time Range Filters

When querying for ads using the Marketing API, it is highly recommended to always apply a time range filter to your requests. This best practice ensures that your queries are efficient, performant, and return only the relevant data you need. By specifying a time range, you reduce the amount of data processed and transferred, which helps avoid unnecessary load on the system and improves response times.

For example, when using an API endpoint such as `/{ad-account-id}/ads`, you should include parameters that define the `start` and `end` dates for your query. This not only aligns with the performance recommendations outlined in this guide, but also helps you avoid common pitfalls like timeouts or excessive data retrieval.

#### Example request

```
v24.0
```

In this example, the `time_range` parameter restricts the results to ads active between December 1, 2025 and December 15, 2025. Always tailor the time range to your specific use case to maximize query performance and relevance.

[](#)