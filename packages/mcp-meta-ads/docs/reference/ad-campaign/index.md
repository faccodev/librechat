---
title: "Graph API Referência v24.0: Ad Set"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/"
scraped_at: "2026-02-01T14:15:39.323Z"
---

Versão Graph API

[v24.0](#)

# Ad Set

[](#)

Beginning September 2, 2025, we will start to roll out more proactive restrictions on custom audiences and custom conversions that may suggest information not permitted under [our terms](https://www.facebook.com/legal/terms/businesstools?_rdr). For example, any custom audience or custom conversions suggesting specific health conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit score", "high income") will be flagged and prevented from being used to run ad campaigns.

**What these restrictions mean for your campaigns:**

-   You won’t be able to use flagged custom audiences or custom conversions when creating new campaigns.
-   If you have an active campaign using flagged custom audiences or custom conversions, you should promptly review and resolve the issues by following the resolution steps to avoid delivery and performance issues.

**For API developers:**

-   Starting September 2, 2025, if an ad set contains one or more flagged custom audiences and custom conversions, the [`issues_info` list](/docs/marketing-api/reference/ad-campaign#Reading) will be populated with one issue per flagged items.
-   Creation and editing of ad sets that contain flagged custom audiences and custom conversions will not be blocked, but campaign delivery and performance may be impacted unless the flags are resolved.

More information on this update and how to resolve flagged custom audiences can be found [here](https://www.facebook.com/business/help/1055828013359808), while information for resolving flagged custom conversions is available [here](https://www.facebook.com/business/help/2455915321411996).

An ad set is a group of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data. Ad sets enable you to group ads according to your criteria, and you can retrieve the ad-related statistics that apply to a set. See [Optimized CPM](/docs/marketing-api/optimizedcpm) and [Promoted Object](/docs/marketing-api/reference/ad-campaign/promoted-object).

For example, create an ad set with a daily budget:

```
v24.0
```

Create an ad set with a lifetime budget

```
v24.0
```

### Limits

The following are the limits on ad sets

Limit

Value

Maximum number of ad sets per regular ad account

5000 non-deleted ad sets

Maximum number of ad sets per bulk ad account

10000 non-deleted ad sets

Maximum number of ads per ad set

50 non-archived ads

### Housing, Employment and Credit Ads

Facebook is committed to protecting people from discrimination, and we are continually improving our ability to detect and deter potential abuse. It’s already against [our policies](https://www.facebook.com/policies/ads/prohibited_content/discriminatory_practices) to discriminate by wrongfully targeting or excluding specific groups of people. As part of a [historic settlement agreement](https://l.facebook.com/l.php?u=https%3A%2F%2Fnewsroom.fb.com%2Fnews%2F2019%2F03%2Fprotecting-against-discrimination-in-ads%2F&h=AT0QjCAZEjnsk7KcNH7qoHEEX0qnMVSlC7tgwp2IQU1REdGUJhET5Jw32hpTqr2g4e4tf2W1i83DAAKORamua-BDcHbPjNIkliFECA2a7Ok1z7p8Vwf3uOUHn_7w76lCCLMUQPpAYYUN99KT_VVD9I2EpesjkoWqap0ApPpNUgg), we are making changes to the way we manage housing, employment and credit ads.

Advertisers must specify a `special_ad_category` for ad campaigns that market housing, employment, and credit. In doing so, the set of targeting options available for ads in these campaigns will be restricted. See [Special Ad Category](/docs/marketing-api/special-ad-category) for more information.

### Flagged custom conversions, custom audiences and/or lookalike audiences

If an ad set contains one or more custom lookalike audiences flagged with an `operation_status` of `471`, the `issues_info` list will be populated with one issue per flagged audience as warning.

**Example**

```
{
  "effective_status": "ACTIVE",
  "issues_info": [
    {
      "level": "AD_SET",
      "error_code": 2460003,
      "error_summary": "Custom Audience is blocked",
      "error_message": "Custom Audience is blocked: Some of this ad set’s custom audiences and/or lookalikes are blocked because they suggest the use of information (e.g., health, financial) not allowed under Meta’s terms. Go to Audience Manager for more details, and you can either review each custom audience or lookalike and remove prohibited information, or choose a different one for your ad set or create a new one and make sure it does not include potentially prohibited information. You can also request a review in Audience Manager if you think any don’t use restricted information.",
      "error_type": "SOFT_ERROR",
      "additional_info": "Custom Audience ID: 120231141155310247"
    },
    {
      "level": "AD_SET",
      "error_code": 2460003,
      "error_summary": "Custom Audience is blocked",
      "error_message": "Custom Audience is blocked: Some of this ad set’s custom audiences and/or lookalikes are blocked because they suggest the use of information (e.g., health, financial) not allowed under Meta’s terms. Go to Audience Manager for more details, and you can either review each custom audience or lookalike and remove prohibited information, or choose a different one for your ad set or create a new one and make sure it does not include potentially prohibited information. You can also request a review in Audience Manager if you think any don’t use restricted information.",
      "error_type": "SOFT_ERROR",
      "additional_info": "Custom Audience ID: 120232742978230247"
    },
    {
      "level": "AD_SET",
      "error_code": 2460004,
      "error_summary": "Custom Conversion is blocked",
      "error_message": "Custom Conversion is blocked: This ad set’s custom conversion is blocked because it suggests the use of information (e.g., health, financial) not allowed under Meta’s terms. You can’t edit this custom conversion, but you can choose a different one for this ad set or create a new one that doesn’t use prohibited information. You can also request a review if you think your custom conversion doesn’t use prohibited information.",
      "error_type": "SOFT_ERROR",
      "additional_info": "Custom Conversion ID: 730362226205831"
    }
  ],
  "id": "120228591637010247"
}
```

In addition, attempting to create or modify ad sets containing any flagged custom audience, lookalike audience or custom conversion will fail with an error. The error will contain the list of IDs for the restricted assets.

##### For flagged custom audiences

```
{
  "error": {
    "error_subcode": 246003,
    "error_data": {
      "Restricted Custom Audience IDs": [
        "<CUSTOM_AUDIENCE_ID1>",
        "<CUSTOM_AUDIENCE_ID2>"
      ]
    }
    "error_user_title": "Your custom audience is currently blocked",
    "error_user_msg": "	This custom audience is blocked because it may contain information (e.g., health, financial) not allowed under Meta’s terms. Visit the audience manager to appeal this decision, edit your audience and remove prohibited information, or choose a different audience."
  },
}
```

##### For flagged custom conversions

```
{
  "error": {
    "error_subcode": 246004,
    "error_data": {
      "Restricted Custom Conversion ID": "<CUSTOM_CONVERSION_ID>"
    }
    "error_user_title": "Your custom conversion is currently blocked",
    "error_user_msg": "This custom conversion is blocked because it may contain information (e.g., health, financial) not allowed under Meta’s terms. Visit the events manager to appeal this decision, edit your custom conversion and remove prohibited information, or choose a different custom conversion."
  },
}
```

#### To resolve flagged audiences

If your custom or lookalike audiences are flagged, consider these options.

To resolve flagged custom audiences:

-   **Review flagged audiences**: Use Audience Manager to review your custom audience along with other information included in an audience, and remove any information that is not allowed under edit the audience to comply with [Meta's terms](https://www.facebook.com/legal/terms/businesstools/).
-   **Create new or choose different audiences**: Alternatively, you can create a new custom audience or choose a different existing custom audience and make sure that it does not include information not allowed under our terms and use that to run campaigns.

To resolve flagged lookalike audiences:

-   **Resolve issues with the underlying custom audience**: If the underlying custom audience (also known as the seed audience) of your lookalike audience is flagged, you will need to resolve the issue with the underlying custom audience on which the lookalike audience is built. Please refer to the preceding section on how to resolve flagged custom audiences.
-   **Create new audiences**: Consider developing new lookalike audiences and make sure that they don't include information that is not allowed under our terms.

##### Request a review

If you believe your custom audience or lookalike audience has been flagged in error and doesn't include non-permitted information, you can request a review via Ads Manager under the campaigns table or, or in Audience Manager by clicking on individual audiences and under the summary tab of the impacted audience.

#### To resolve flagged custom conversions

If any of your custom conversions are flagged for suggesting information that is not allowed under our terms, you may want to consider the following options.

To resolve a flagged custom conversion in a new campaign creation:

-   **Create new custom conversion**: Use a new custom conversion and make sure that it does not include information that is not allowed under our terms.
-   **Choose a different custom conversion**: Select a different existing custom conversion and make sure it does not include information that is not allowed under our terms.

To resolve a flagged custom conversion in an existing campaign:

-   **Duplicate your campaign and select an existing custom conversion**: If you have a running campaign that is flagged due to a flagged custom conversion, consider duplicating the campaign and selecting a different custom conversion that is not flagged before publishing the new duplicated campaign. **Note:** Once the campaign is published, you cannot remove or select a different custom conversion.

##### Request a review

If you believe your custom conversion has been flagged in error and doesn't include non-permitted information, you can request a review via Ads Manager under the campaigns table, or in Events Manager under the custom conversions page.

### Targeting European Union Ads

Beginning Tuesday, May 16, 2023 advertisers who include the European Union (EU), associated territories, or select global/worldwide in their ad targeting on Facebook and Instagram will be asked to include information about who benefits from the ad (the beneficiary) and who is paying for the ad (the payor) for each ad set. Advertisers will be prompted for this information in all ads buying surfaces including Ads Manager and the Marketing API. Beginning Wednesday, August 16, 2023, if beneficiary and payer information is not provided, the ad will not be published.

We are launching this requirement to respond to the EU Digital Services Act (DSA) which goes into full effect for Facebook and Instagram later this year.

Ad sets targeted to the EU and/or associated territories (see [here](https://www.facebook.com/business/help/605021638170961/) for a complete list) are required to provide beneficiary information (who benefits from the ad running), and payer information (who pays for the ad). This applies to new ads, duplicated ads, or significantly edited ads from May 16 forward, and without the required information, the API will respond with a wrong parameter error. For convenience the advertiser can set a saved beneficiary and payor in their ad account, which will be auto-populated during ad set creation, copying, and updating targets to include EU locations and ads under existing ad seta without configured the payor and beneficiary.. For more information about the ad account level parameters, `default_dsa_payor` and `default_dsa_beneficiary`, see to the check the [Ad Account reference document](/docs/marketing-api/reference/ad-account).

To facilitate the creation of ad sets targeting the EU, we're offering a new API which allows developers to get a list of likely beneficiary/payer strings, based on ad account activity. See [Ad Account DSA Recommendations](/docs/marketing-api/reference/ad-account/dsa_recommendations) for more information.

**Notice:**

-   When the default values are set in the ad account, during ad set creation, updating, and ad creation under an existing ad set, if one of them is not provided, the API will automatically fill the default value listed in the ad account. **Do not pass only one of them and expect the API to set the other one to be the same value.** For example, in the ad account settings, `default_dsa_payor` is `payor_default` and `default_dsa_beneficiary` is `beneficiary_default`. During ad set creation, if only `dsa_payor` is passed with the payor, the `dsa_beneficiary` will be automatically filled with value of `beneficiary_default` instead of `dsa_payor`.
-   If no saved default values are set or the values are unset, without explicitly passing the payor or beneficiary during ad set creation or when making updates, it will trigger an error and the request will fail.
-   The `payer` and the `beneficiary` fields are only for ad sets targeting the EU and/or associated territories.
-   For ad sets targeting regions other than the EU and/or associated territories, that information will not be saved even if it is provided.

To facilitate the creation of ad sets targeting the EU, we're offering a new API which allows developers to get a list of likely beneficiary/payer strings, based on ad account activity. See [Ad Account Dsa Recommendations](/docs/marketing-api/reference/ad-account/dsa_recommendations) for more information.

[](#)

## Leitura

An ad set is a group of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data. Ad sets enable you to group ads according to your criteria, and you can retrieve the ad-related statistics that apply to a set.

O parâmetro `date_preset = lifetime` foi desativado na Graph API v10.0 e substituído por `date_preset = maximum`, que retorna um máximo de 37 meses de dados. Para a v9.0 e versões anteriores, `date_preset = maximum` será ativado em 25 de maio de 2021, e todas as chamadas de `lifetime` serão definidas como `maximum` por padrão e retornarão somente 37 meses de dados.

[](#)

### Examples

```
v24.0
```

To retrieve date-time related fields in a UNIX timestamp format, use the `date_format` parameter:

```
v24.0
```

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=%3CAD_SET_ID%3E%2F%3Ffields%3Dadset_schedule&version=v24.0)

```
GET /v24.0/<AD_SET_ID>/?fields=adset_schedule HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/<AD_SET_ID>/?fields=adset_schedule',
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/<AD_SET_ID>/",
    {
        "fields": "adset_schedule"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("fields", "adset_schedule");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<AD_SET_ID>/",
    params,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"fields": @"adset_schedule",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<AD_SET_ID>/"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X GET -G \
  -d 'fields="adset_schedule"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<AD_SET_ID>/
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`date_preset`

enum{today, yesterday, this\_month, last\_month, this\_quarter, maximum, data\_maximum, last\_3d, last\_7d, last\_14d, last\_28d, last\_30d, last\_90d, last\_week\_mon\_sun, last\_week\_sun\_sat, last\_quarter, last\_year, this\_week\_mon\_today, this\_week\_sun\_today, this\_year}

Date Preset

`time_range`

{'since':YYYY-MM-DD,'until':YYYY-MM-DD}

Time Range. Note if time range is invalid, it will be ignored.

`since`

datetime

A date in the format of "YYYY-MM-DD", which means from the beginning midnight of that day.

`until`

datetime

A date in the format of "YYYY-MM-DD", which means to the beginning midnight of the following day.

### Campos

Campo

Descrição

`id`

numeric string

ID for the Ad Set

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_id`

numeric string

ID for the Ad Account associated with this Ad Set

`adlabels`

[list<AdLabel>](https://developers.facebook.com/docs/marketing-api/reference/ad-label/)

Ad Labels associated with this ad set

`adset_schedule`

list<DayPart>

Ad set schedule, representing a delivery schedule for a single day

`asset_feed_id`

numeric string

The ID of the asset feed that constains a content to create ads

`attribution_spec`

list<AttributionSpec>

Conversion attribution spec used for attributing conversions for optimization. Supported window lengths differ by optimization goal and campaign objective. See [Objective, Optimization Goal and `attribution_spec`](/docs/marketing-api/reference/ad-campaign-group#attribution_spec).

`bid_adjustments`

[AdBidAdjustments](https://developers.facebook.com/docs/marketing-api/reference/ad-bid-adjustments/)

Map of bid adjustment types to values

`bid_amount`

unsigned int32

Bid cap or target cost for this ad set. The bid cap used in a _lowest cost bid strategy_ is defined as the maximum bid you want to pay for a result based on your `optimization_goal`. The target cost used in a _target cost bid strategy_ lets Facebook bid on your behalf to meet your target on average and keep costs stable as you raise budget.

The bid amount's unit is cents for currencies like USD, EUR, and the basic unit for currencies like JPY, KRW. The bid amount for ads with `IMPRESSION` or `REACH` as `billing_event` is per 1,000 occurrences of that event, and the bid amount for ads with other `billing_event`s is for each occurrence.

`bid_constraints`

[AdCampaignBidConstraint](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-bid-constraint/)

Choose bid constraints for ad set to suit your specific business goals. It usually works together with `bid_strategy` field.

`bid_info`

map<string, unsigned int32>

Map of bid objective to bid value.

`bid_strategy`[](#)

enum {LOWEST\_COST\_WITHOUT\_CAP, LOWEST\_COST\_WITH\_BID\_CAP, COST\_CAP, LOWEST\_COST\_WITH\_MIN\_ROAS}

Bid strategy for this ad set when you use `AUCTION` as your buying type:  
`LOWEST_COST_WITHOUT_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` without limiting your bid amount. This is the best strategy if you care most about cost efficiency. However with this strategy it may be harder to get stable average costs as you spend. This strategy is also known as _automatic bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  
`LOWEST_COST_WITH_BID_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` while limiting actual bid to your specified amount. With a bid cap you have more control over your cost per actual optimization event. However if you set a limit which is too low you may get less ads delivery. Get your bid cap with the field `bid_amount`. This strategy is also known as _manual maximum-cost bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  
Notes:

-   If you enable campaign budget optimization, you should get `bid_strategy` at the parent campaign level.
-   `TARGET_COST` bidding strategy has been deprecated with [Marketing API v9](/docs/graph-api/changelog/version9.0).

`billing_event`

enum {APP\_INSTALLS, CLICKS, IMPRESSIONS, LINK\_CLICKS, NONE, OFFER\_CLAIMS, PAGE\_LIKES, POST\_ENGAGEMENT, THRUPLAY, PURCHASE, LISTING\_INTERACTION}

The billing event for this ad set:  
`APP_INSTALLS`: Pay when people install your app.  
`CLICKS`: Pay when people click anywhere in the ad.  
`IMPRESSIONS`: Pay when the ads are shown to people.  
`LINK_CLICKS`: Pay when people click on the link of the ad.  
`OFFER_CLAIMS`: Pay when people claim the offer.  
`PAGE_LIKES`: Pay when people like your page.  
`POST_ENGAGEMENT`: Pay when people engage with your post.  
`VIDEO_VIEWS`: Pay when people watch your video ads for at least 10 seconds.  
`THRUPLAY`: Pay for ads that are played to completion, or played for at least 15 seconds.

`brand_safety_config`

BrandSafetyCampaignConfig

brand\_safety\_config

`budget_remaining`

numeric string

Remaining budget of this Ad Set

`campaign`

[Campaign](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/)

The campaign that contains this ad set

`campaign_active_time`

numeric string

Campaign running length

`campaign_attribution`

enum

campaign\_attribution, a new field for app ads campaign, used to indicate a campaign's attribution type, eg: SKAN or AEM

`campaign_id`

numeric string

The ID of the campaign that contains this ad set

`configured_status`

enum {ACTIVE, PAUSED, DELETED, ARCHIVED}

The status set at the ad set level. It can be different from the effective status due to its parent campaign. Prefer using 'status' instead of this.

`contextual_bundling_spec`

ContextualBundlingSpec

specs of contextual bundling Ad Set setup, including signal of opt-in/out the feature

`created_time`

datetime

Time when this Ad Set was created

`creative_sequence`

list<numeric string>

Order of the adgroup sequence to be shown to users

`daily_budget`

numeric string

The daily budget of the set defined in your [account currency](/docs/marketing-api/adset/budget-limits).

`daily_min_spend_target`

numeric string

Daily minimum spend target of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`daily_spend_cap`

numeric string

Daily spend cap of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign.

`destination_type`

string

Destination of ads in this Ad Set.

Options include: `WEBSITE`, `APP`, `MESSENGER`, `INSTAGRAM_DIRECT`.

The `ON_AD`, `ON_POST`, `ON_VIDEO`, `ON_PAGE`, and `ON_EVENT` destination types are currently in limited beta testing. Trying to duplicate campaigns with existing destination types using these new destination types may throw an error. See the [Outcome-Driven Ads Experiences](#odax) section below for more information.

`dsa_beneficiary`

string

The beneficiary of all ads in this ad set.

`dsa_payor`

string

The payor of all ads in this ad set.

`effective_status`

enum {ACTIVE, PAUSED, DELETED, CAMPAIGN\_PAUSED, ARCHIVED, IN\_PROCESS, WITH\_ISSUES}

The effective status of the adset. The status could be effective either because of its own status, or the status of its parent campaign. `WITH_ISSUES` is available for version 3.2 or higher. `IN_PROCESS` is available for version 4.0 or higher.

`end_time`

datetime

End time, in UTC UNIX timestamp

`frequency_control_specs`

[list<AdCampaignFrequencyControlSpecs>](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-frequency-control-specs/)

An array of frequency control specs for this ad set. Writes to this field are only available in ad sets where `REACH` and `THRUPLAY` are the performance goal.

`instagram_user_id`[](#)

numeric string

Represents your Instagram account id, used for ads, including dynamic creative ads on Instagram.

`is_dynamic_creative`[](#)

bool

Whether this ad set is a dynamic creative ad set. dynamic creative ad can be created only under ad set with this field set to be true.

`is_incremental_attribution_enabled`

bool

Whether the campaign should use incremental attribution optimization.

`issues_info`[](#)

[list<AdCampaignIssuesInfo>](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-issues-info/)

Issues for this ad set that prevented it from deliverying

`learning_stage_info`

[AdCampaignLearningStageInfo](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-learning-stage-info/)

Info about whether the ranking or delivery system is still learning for this ad set. While the ad set is still in learning , we might unstablized delivery performances.

`lifetime_budget`

numeric string

The lifetime budget of the set defined in your [account currency](/docs/marketing-api/adset/budget-limits).

`lifetime_imps`

int32

Lifetime impressions. Available only for campaigns with `buying_type=FIXED_CPM`

`lifetime_min_spend_target`

numeric string

Lifetime minimum spend target of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`lifetime_spend_cap`

numeric string

Lifetime spend cap of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign.

`min_budget_spend_percentage`

numeric string

min\_budget\_spend\_percentage

`multi_optimization_goal_weight`

string

multi\_optimization\_goal\_weight

`name`

string

Name of the ad set

`optimization_goal`

enum {NONE, APP\_INSTALLS, AD\_RECALL\_LIFT, ENGAGED\_USERS, EVENT\_RESPONSES, IMPRESSIONS, LEAD\_GENERATION, QUALITY\_LEAD, LINK\_CLICKS, OFFSITE\_CONVERSIONS, PAGE\_LIKES, POST\_ENGAGEMENT, QUALITY\_CALL, REACH, LANDING\_PAGE\_VIEWS, VISIT\_INSTAGRAM\_PROFILE, ENGAGED\_PAGE\_VIEWS, VALUE, THRUPLAY, DERIVED\_EVENTS, APP\_INSTALLS\_AND\_OFFSITE\_CONVERSIONS, CONVERSATIONS, IN\_APP\_VALUE, MESSAGING\_PURCHASE\_CONVERSION, SUBSCRIBERS, REMINDERS\_SET, MEANINGFUL\_CALL\_ATTEMPT, PROFILE\_VISIT, PROFILE\_AND\_PAGE\_ENGAGEMENT, ADVERTISER\_SILOED\_VALUE, AUTOMATIC\_OBJECTIVE, MESSAGING\_APPOINTMENT\_CONVERSION}

The optimization goal this ad set is using.  
`NONE`: Only available in read mode for campaigns created pre-v2.4.  
`APP_INSTALLS`: Optimize for people more likely to install your app.  
`AD_RECALL_LIFT`: Optimize for people more likely to remember seeing your ads.  
`CLICKS`: Deprecated. Only available in read mode.  
`ENGAGED_USERS`: Optimize for people more likely to take a particular action in your app.  
`EVENT_RESPONSES`: Optimize for people more likely to attend your event.  
`IMPRESSIONS`: Show the ads as many times as possible.  
`LEAD_GENERATION`: Optimize for people more likely to fill out a lead generation form.  
`QUALITY_LEAD`: Optimize for people who are likely to have a deeper conversation with advertisers after lead submission.  
`LINK_CLICKS`: Optimize for people more likely to click in the link of the ad.  
`OFFSITE_CONVERSIONS`: Optimize for people more likely to make a conversion on the site.  
`PAGE_LIKES`: Optimize for people more likely to like your page.  
`POST_ENGAGEMENT`: Optimize for people more likely to engage with your post.  
`QUALITY_CALL`: Optimize for people who are likely to call the advertiser.  
`REACH`: Optimize to reach the most unique users for each day or interval specified in `frequency_control_specs`.  
`LANDING_PAGE_VIEWS`: Optimize for people who are most likely to click on and load your chosen landing page.  
`VISIT_INSTAGRAM_PROFILE`: Optimize for visits to the advertiser's Instagram profile.  
`VALUE`: Optimize for maximum total purchase value within the specified attribution window.  
`THRUPLAY`: Optimize delivery of your ads to people who are more likely to play your ad to completion, or play it for at least 15 seconds.  
`DERIVED_EVENTS`: Optimize for retention, which reaches people who are most likely to return to the app and open it again during a given time frame after installing. You can choose either two days, meaning the app is likely to be reopened between 24 and 48 hours after installation; or seven days, meaning the app is likely to be reopened between 144 and 168 hours after installation.  
`APP_INSTALLS_AND_OFFSITE_CONVERSIONS`: Optimizes for people more likely to install your app and make a conversion on your site.  
`CONVERSATIONS`: Directs ads to people more likely to have a conversation with the business.

`optimization_sub_event`

string

Optimization sub event for a specific optimization goal. For example: Sound-On event for Video-View-2s optimization goal.

`pacing_type`

list<string>

Defines the pacing type, standard or using ad scheduling

`promoted_object`

[AdPromotedObject](https://developers.facebook.com/docs/marketing-api/reference/ad-promoted-object/)

The object this ad set is promoting across all its ads.

`recommendations`

list<AdRecommendation>

If there are recommendations for this ad set, this field includes them. Otherwise, will not be included in the response. This field is not included in redownload mode.

`recurring_budget_semantics`

bool

If this field is `true`, your daily spend may be more than your daily budget while your weekly spend will not exceed 7 times your daily budget. More details explained in the [Ad Set Budget](/docs/marketing-api/adset/budget-limits) document. If this is `false`, your amount spent daily will not exceed the daily budget. This field is not applicable for lifetime budgets.

`regional_regulated_categories`

list<enum>

This param is used to specify `regional_regulated_categories`. Currently it supports `null` and the following values:

1.  TAIWAN\_FINSERV: Use this value to declare a Financial Service ad set if the ad targets Taiwan Audience
2.  AUSTRALIA\_FINSERV: Use this value to declare a Financial Service ad set if the ad set targets Australia Audience
3.  INDIA\_FINSERV: Use this value to declare a Securities and Investments ad set if the ad set targets India Audience
4.  TAIWAN\_UNIVERSAL: Use this value to declare an ad set if it targets Taiwan Audience
5.  SINGAPORE\_UNIVERSAL: Use this value to declare an ad set if it targets Singapore Audience
6.  THAILAND\_UNIVERSAL: Use this value to declare an ad set if it targets Thailand Audience and you are seeing "Beneficiary/payer is missing" errors (3858634, 3858636).
7.  BRAZIL\_REGULATION: Use this value to declare an Ad Set if it targets Thailand Audience and you are seeing "Beneficiary/payer is missing" errors (3858634, 3858636).

If an ad set is a Financial Service Ad and it targets Taiwan, it needs to declare both `TAIWAN_FINSERV` and `TAIWAN_UNIVERSAL`

Example: `null` or `[AUSTRALIA_FINSERV]` or `[TAIWAN_FINSERV, TAIWAN_UNIVERSAL]`

`regional_regulation_identities`

RegionalRegulationIdentities

This param is used to specify regional\_regulation\_identities used to represent the ad set. Currently it supports the following fields:

1.  taiwan\_finserv\_beneficiary: used for TAIWAN\_FINSERV category
2.  taiwan\_finserv\_payer: used for TAIWAN\_FINSERV category
3.  australia\_finserv\_beneficiary: used for AUSTRALIA\_FINSERV category
4.  australia\_finserv\_payer: used for AUSTRALIA\_FINSERV category
5.  india\_finserv\_beneficiary: used for INDIA\_FINSERV category
6.  india\_finserv\_payer: used for INDIA\_FINSERV category
7.  taiwan\_universal\_beneficiary: used for TAIWAN\_UNIVERSAL category
8.  taiwan\_universal\_payer: used for TAIWAN\_UNIVERSAL category
9.  singapore\_universal\_beneficiary: used for SINGAPORE\_UNIVERSAL category
10.  singapore\_universal\_payer: used for SINGAPORE\_UNIVERSAL category
11.  universal\_beneficiary: used for THAILAND\_UNIVERSAL category
12.  universal\_payer: used for THAILAND\_UNIVERSAL category
13.  universal\_beneficiary: used for BRAZIL\_REGULATION category
14.  universal\_payer: used for BRAZIL\_REGULATION category

Example:

`regional_regulation_identities: { "taiwan_finserv_beneficiary": <verified_identity_id>, "taiwan_finserv_payer": <verified_identity_id>, "taiwan_universal_beneficiary": <verified_identity_id>, "taiwan_universal_payer": <verified_identity_id>, }`

During creation and update, the passed identities fields need to correspond to declared categories. Both beneficiary and payer identities must be included, and they can use the same identity ID.

To update an existing ad set identities, you need to pass new values for both categories and identities to overwrite the identity id or `null` to remove existing id.

For example:

Upon creation, `regional_regulated_categories` is `[TAIWAN_FINSERV, TAIWAN_UNIVERSAL]` and `regional_regulation_identities` is

`regional_regulation_identities: { "taiwan_finserv_beneficiary": <id_123>, "taiwan_finserv_payer": <id_123>, "taiwan_universal_beneficiary": <id_456>, "taiwan_universal_payer": <id_456>, }`

For update, passing `[TAIWAN_UNIVERSAL]` and `regional_regulation_identities: { "taiwan_finserv_beneficiary": null "taiwan_finserv_payer": null, "taiwan_universal_beneficiary": <id_789>, "taiwan_universal_payer": <id_789>, }`

will remove `TAIWAN_FINSERV` declaration and update the identities ID of `TAIWAN_UNIVERSAL`

`review_feedback`

string

Reviews for dynamic creative ad

`rf_prediction_id`

id

Reach and frequency prediction ID

`source_adset`

[AdSet](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/)

The source ad set that this ad set was copied from

`source_adset_id`

numeric string

The source ad set id that this ad set was copied from

`start_time`

datetime

Start time, in UTC UNIX timestamp

`status`

enum {ACTIVE, PAUSED, DELETED, ARCHIVED}

The status set at the ad set level. It can be different from the effective status due to its parent campaign. The field returns the same value as `configured_status`, and is the suggested one to use.

`targeting`

Targeting

Targeting

`targeting_optimization_types`[](#)

list<KeyValue:string,int32>

Targeting options that are relaxed and used as a signal for optimization

`time_based_ad_rotation_id_blocks`

list<list<integer>>

Specify ad creative that displays at custom date ranges in a campaign as an array. A list of Adgroup IDs. The list of ads to display for each time range in a given schedule. For example display first ad in Adgroup for first date range, second ad for second date range, and so on. You can display more than one ad per date range by providing more than one ad ID per array. For example set `time_based_ad_rotation_id_blocks` to \[\[1\], \[2, 3\], \[1, 4\]\]. On the first date range show ad 1, on the second date range show ad 2 and ad 3 and on the last date range show ad 1 and ad 4. Use with `time_based_ad_rotation_intervals` to specify date ranges.

`time_based_ad_rotation_intervals`

list<unsigned int32>

Date range when specific ad creative displays during a campaign. Provide date ranges in an array of UNIX timestamps where each timestamp represents the start time for each date range. For example a 3-day campaign from May 9 12am to May 11 11:59PM PST can have three date ranges, the first date range starts from May 9 12:00AM to May 9 11:59PM, second date range starts from May 10 12:00AM to May 10 11:59PM and last starts from May 11 12:00AM to May 11 11:59PM. The first timestamp should match the campaign start time. The last timestamp should be at least 1 hour before the campaign end time. You must provide at least two date ranges. All date ranges must cover the whole campaign length, so any date range cannot exceed campaign length. Use with `time_based_ad_rotation_id_blocks` to specify ad creative for each date range.

`updated_time`

datetime

Time when the Ad Set was updated

`use_new_app_click`

bool

If set, allows Mobile App Engagement ads to optimize for LINK\_CLICKS

`value_rule_set_id`

numeric string

value\_rule\_set\_id

### Bordas

Borda

Descrição

[`activities`](/docs/marketing-api/reference/ad-campaign/activities/)

Edge<AdActivity>

The activities of this ad set

[`ad_studies`](/docs/marketing-api/reference/ad-campaign/ad_studies/)

Edge<AdStudy>

The ad studies containing this ad set

[`adcreatives`](/docs/marketing-api/reference/ad-campaign/adcreatives/)

Edge<AdCreative>

The creatives of this ad set

[`adrules_governed`](/docs/marketing-api/reference/ad-campaign/adrules_governed/)

Edge<AdRule>

Ad rules that govern this ad set - by default, this only returns rules that either directly mention the ad set by id or indirectly through the set `entity_type`

[`ads`](/docs/marketing-api/reference/ad-campaign/ads/)

Edge<Adgroup>

The ads under this ad set

[`asyncadrequests`](/docs/marketing-api/reference/ad-campaign/asyncadrequests/)

Edge<AdAsyncRequest>

Async ad requests for this ad set

[`copies`](/docs/marketing-api/reference/ad-campaign/copies/)

Edge<AdCampaign>

The copies of this ad set

[`delivery_estimate`](/docs/marketing-api/reference/ad-campaign/delivery_estimate/)

Edge<AdCampaignDeliveryEstimate>

The delivery estimate for this ad set

[`message_delivery_estimate`](/docs/marketing-api/reference/ad-campaign/message_delivery_estimate/)

Edge<MessageDeliveryEstimate>

Delivery estimation of the marketing message campaign

[`targetingsentencelines`](/docs/marketing-api/reference/ad-campaign/targetingsentencelines/)

Edge<TargetingSentenceLine>

The targeting description sentence for this ad set

### Error Codes

Erro

Descrição

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

200

Permissions error

2500

Error parsing graph query

[](#)

## Criando

For v20.0+, the Impressions optimization goal is deprecated for the legacy Post Engagement objective and the `ON_POST` destination\_type.

### Examples

Validate an ad set with a daily budget where the campaign objective is set to `APP_INSTALLS`.

```
v24.0
```

### Considerations

#### Bid/Budget Validations

**Note:**

-   All values in this section are in US Dollars.
    
-   Differenct currencies have different minimum daily budget limits.
    
-   Minimum values are defined in terms of the daily budget but apply to lifetime budgets as well.
    
-   Minimum budget takes the total spent budget into account.
    

When creating an ad set, there will be a minimum budget for different billing events (Clicks, Impressions, Actions). If the minimum daily budget is $5, a campaign lasting 5 days will need at least $25 for budget.

Budget amounts shown are for illustrative purposes only and can change based on situation.

If `bid_strategy` is set to `LOWEST_COST_WITHOUT_CAP` in the ad set:

Billing Event

Minimum Daily Budget

Impressions

$0.50

Clicks/Likes/Video Views

$2.50

Low-frequency Actions  
(Includes mobile app installs, offer claims, or canvas app installs)

$40  
**Important:** This minimum daily budget is the same for all countries.

If `bid_strategy` is set to `LOWEST_COST_WITH_BID_CAP` in the ad set:

Billing Event

Minimum Daily Budget

Impressions

At least the `bid_amount`. For example, if the bid amount is $10, then $10 will be the minimum budget required.

Clicks/Actions

5x the `bid_amount` for a Click or Action. For example, if the bid amount is $5 per click/action, then $25 will be the minimum budget required.

Budgets in non-USD currencies will be converted and validated upon time of ad set creation.

For ads belonging to ad accounts from countries in the list below, the minimum values are 2x the ones in the tables. For example, if the billing event is an Impression, the minimum daily budget is $0.50, but in the the following countries the minimum would be $1.00:

Australia, Austria, Belgium, Canada, Denmark, Finland, France, Germany, Greece, Hong Kong, Israel, Italy, Japan, Netherlands, New Zealand, Norway, Singapore, South Korea, Spain, Sweden, Switzerland, Taiwan, United Kingdom, United States of America.

The only exception to this rule are Low-Frequency Actions when `bid_strategy` is `LOWEST_COST_WITHOUT_CAP`.

#### Locale targeted page post

If you promote a Page post which has been targeted by locale the ad set targeting must include the same, or a subset of, locale targeting as the Page post.

E.g. if the Page post is targeted at locales 6 (US English) and 24 (UK English), then the ad set must be targeted at one or more of the same locales.

#### Mobile App Ads

Mobile app ad sets should

-   be used in conjunction with [targeting spec](/docs/reference/ads-api/targeting-specs#mobile) fields `user_device` and `user_os`
    
-   have a `MOBILE_APP_*` objective on the [campaign](/docs/marketing-api/adcampaign)
    

#### Desktop App Ads

Desktop app ad sets must

-   include a [targeting spec](/docs/reference/ads-api/targeting-specs) of either
    
    -   `'page_types':['desktopfeed']` or
        
    -   `'page_types':['rightcolumn']` or
        
    -   `'page_types':['desktop']` along with the other targeting options you have selected.
        
    
-   include a `CANVAS_APP_*` objective
    

#### Lookalike Expansion

Beginning with v13.0, for newly created ad sets that optimize for value, conversions, or app events, lookalike expansion will be turned on by default and cannot be disabled. When getting an ad set that optimizes for value, conversions, or app events, we will return a new lookalike property in the `targeting_optimization_types` map that indicates lookalike expansion is enabled and complements the existing `detailed_targeting` property for the detailed targeting expansion.

#### Targeting DSA Regulated Locations (EU)

For ad sets targeting the EU and/or associated territories, the `dsa_payor` and `dsa_beneficiary` fields are required. The information provided in these 2 fields will be shown to end users to indicate who is paying for the ad and who is the beneficiary of the ad.

**Request**  
Include the following fields in an API call to the `/{adset_id}` endpoint.

```
{
  "dsa_payor": "<PAYOR_NAME>",
  "dsa_beneficiary": "<BENEFICIARY_NAME>"
  ...
}
```

**Fields**

Name

Description

`dsa_payor`

string (max 512 char)

The payor of all ads in this ad set.

`dsa_beneficiary`

string (max 512 char)

The beneficiary of all ads in this ad set.

If these fields are not provided, the API may returns the following errors:  
**Payor missing error**

```
{
  "error": {
    "message": "Invalid parameter",
    "type": "FacebookApiException",
    "code": 100,
    "error_data": "{\"blame_field_specs\":[[\"dsa_payor\"]]}",
    "error_subcode": 3858079,
    "is_transient": false,
    "error_user_title": "No payor provided in DSA regulated region",
    "error_user_msg": "The DSA requires ads to provide payor information in regulated regions. Updating/creating ad needs to provide payor of the ad.",
    "fbtrace_id": "fbtrace_id"
  },
  "__fb_trace_id__": "fbtrace_id",
  "__www_request_id__": "request_id"
}
```
**Beneficiary missing error**
```
{
  "error": {
    "message": "Invalid parameter",
    "type": "FacebookApiException",
    "code": 100,
    "error_data": "{\"blame_field_specs\":[[\"dsa_beneficiary\"]]}",
    "error_subcode": 3858081,
    "is_transient": false,
    "error_user_title": "No payor/beneficiary provided in DSA regulated location",
    "error_user_msg": "The DSA requires ads to provide beneficiary information in regulated regions. Updating/creating ad needs to provide beneficiary of the ad.",
    "fbtrace_id": "fbtrace_id"
  },
  "__fb_trace_id__": "fbtrace_id",
  "__www_request_id__": "request_id"
}
```

You can make a POST request to `copies` edge from the following paths:

-   [`/{ad_set_id}/copies`](/docs/marketing-api/reference/ad-campaign/copies/)

When posting to this edge, an [AdSet](/docs/marketing-api/reference/ad-campaign/) will be created.

### Parâmetros

Parâmetro

Descrição

`campaign_id`

numeric string or integer

Single ID of a campaign to make parent of the copy. The copy inherits all campaign settings, such as budget from the parent.Ignore if you want to keep the copy under the original campaign parent.

`deep_copy`

boolean

Valor padrão: `false`

Whether to copy all the child ads. Limits: the total number of children ads to copy should not exceed 3 for a synchronous call and 51 for an asynchronous call.

`end_time`

datetime

The end time of the set, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp. When creating a set with a daily budget, specify `end_time=0` to set the set to be ongoing without end date. If not set, the copied adset will inherit the end time from the original set

`rename_options`

JSON or object-like arrays

Rename options

`rename_strategy`

enum {DEEP\_RENAME, ONLY\_TOP\_LEVEL\_RENAME, NO\_RENAME}

Valor padrão: `ONLY_TOP_LEVEL_RENAME`

`DEEP_RENAME`: will change this object's name and children's names in the copied object. `ONLY_TOP_LEVEL_RENAME`: will change the this object's name but won't change the children's name in the copied object. `NO_RENAME`: will change no name in the copied object

`rename_prefix`

string

A prefix to copy names. Defaults to null if not provided.

`rename_suffix`

string

A suffix to copy names. Defaults to null if not provided and appends a localized string of `- Copy` based on the ad account locale.

`start_time`

datetime

The start time of the set, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp. If not set, the copied adset will inherit the start time from the original set

`status_option`

enum {ACTIVE, PAUSED, INHERITED\_FROM\_SOURCE}

Valor padrão: `PAUSED`

`ACTIVE`: the copied adset will have active status. `PAUSED`: the copied adset will have paused status. `INHERITED_FROM_SOURCE`: the copied adset will have the status from the original set.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `copied_adset_id` in the return type.

Struct {

`copied_adset_id`: numeric string,

`ad_object_ids`: List \[

Struct {

`ad_object_type`: enum {unique\_adcreative, ad, ad\_set, campaign, opportunities, privacy\_info\_center, topline, ad\_account, product},

`source_id`: numeric string,

`copied_id`: numeric string,

}

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

190

Invalid OAuth 2.0 Access Token

2695

The ad set creation reached its campaign group(ios14) limit.

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

You can make a POST request to `adsets` edge from the following paths:

-   [`/act_{ad_account_id}/adsets`](/docs/marketing-api/reference/ad-account/adsets/)

When posting to this edge, an [AdSet](/docs/marketing-api/reference/ad-campaign/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fadsets%3Fname%3DMy%2BFirst%2BAdset%26lifetime_budget%3D20000%26start_time%3D2026-02-01T06%253A15%253A35-0800%26end_time%3D2026-02-11T06%253A15%253A35-0800%26campaign_id%3D%253CAD_CAMPAIGN_ID%253E%26bid_amount%3D100%26billing_event%3DLINK_CLICKS%26optimization_goal%3DLINK_CLICKS%26targeting%3D%257B%2522facebook_positions%2522%253A%255B%2522feed%2522%255D%252C%2522geo_locations%2522%253A%257B%2522countries%2522%253A%255B%2522US%2522%255D%257D%252C%2522publisher_platforms%2522%253A%255B%2522facebook%2522%252C%2522audience_network%2522%255D%257D%26status%3DPAUSED&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/adsets HTTP/1.1
Host: graph.facebook.com

name=My+First+Adset&lifetime_budget=20000&start_time=2026-02-01T06%3A15%3A35-0800&end_time=2026-02-11T06%3A15%3A35-0800&campaign_id=%3CAD_CAMPAIGN_ID%3E&bid_amount=100&billing_event=LINK_CLICKS&optimization_goal=LINK_CLICKS&targeting=%7B%22facebook_positions%22%3A%5B%22feed%22%5D%2C%22geo_locations%22%3A%7B%22countries%22%3A%5B%22US%22%5D%7D%2C%22publisher_platforms%22%3A%5B%22facebook%22%2C%22audience_network%22%5D%7D&status=PAUSED
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/adsets',
    array (
      'name' => 'My First Adset',
      'lifetime_budget' => '20000',
      'start_time' => '2026-02-01T06:15:35-0800',
      'end_time' => '2026-02-11T06:15:35-0800',
      'campaign_id' => '<AD_CAMPAIGN_ID>',
      'bid_amount' => '100',
      'billing_event' => 'LINK_CLICKS',
      'optimization_goal' => 'LINK_CLICKS',
      'targeting' => '{"facebook_positions":["feed"],"geo_locations":{"countries":["US"]},"publisher_platforms":["facebook","audience_network"]}',
      'status' => 'PAUSED',
    ),
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/act_<AD_ACCOUNT_ID>/adsets",
    "POST",
    {
        "name": "My First Adset",
        "lifetime_budget": "20000",
        "start_time": "2026-02-01T06:15:35-0800",
        "end_time": "2026-02-11T06:15:35-0800",
        "campaign_id": "<AD_CAMPAIGN_ID>",
        "bid_amount": "100",
        "billing_event": "LINK_CLICKS",
        "optimization_goal": "LINK_CLICKS",
        "targeting": "{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}",
        "status": "PAUSED"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("name", "My First Adset");
params.putString("lifetime_budget", "20000");
params.putString("start_time", "2026-02-01T06:15:35-0800");
params.putString("end_time", "2026-02-11T06:15:35-0800");
params.putString("campaign_id", "<AD_CAMPAIGN_ID>");
params.putString("bid_amount", "100");
params.putString("billing_event", "LINK_CLICKS");
params.putString("optimization_goal", "LINK_CLICKS");
params.putString("targeting", "{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}");
params.putString("status", "PAUSED");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/adsets",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"name": @"My First Adset",
  @"lifetime_budget": @"20000",
  @"start_time": @"2026-02-01T06:15:35-0800",
  @"end_time": @"2026-02-11T06:15:35-0800",
  @"campaign_id": @"<AD_CAMPAIGN_ID>",
  @"bid_amount": @"100",
  @"billing_event": @"LINK_CLICKS",
  @"optimization_goal": @"LINK_CLICKS",
  @"targeting": @"{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]},\"publisher_platforms\":[\"facebook\",\"audience_network\"]}",
  @"status": @"PAUSED",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/adsets"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X POST \
  -F 'name="My First Adset"' \
  -F 'lifetime_budget=20000' \
  -F 'start_time="2026-02-01T06:15:35-0800"' \
  -F 'end_time="2026-02-11T06:15:35-0800"' \
  -F 'campaign_id="<AD_CAMPAIGN_ID>"' \
  -F 'bid_amount=100' \
  -F 'billing_event="LINK_CLICKS"' \
  -F 'optimization_goal="LINK_CLICKS"' \
  -F 'targeting={
       "facebook_positions": [
         "feed"
       ],
       "geo_locations": {
         "countries": [
           "US"
         ]
       },
       "publisher_platforms": [
         "facebook",
         "audience_network"
       ]
     }' \
  -F 'status="PAUSED"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adsets
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`adlabels`

list<Object>

Specifies list of labels to be associated with this object. This field is optional

`adset_schedule`

list<Object>

Ad set schedule, representing a delivery schedule for a single day

`start_minute`

int64

A 0 based minute of the day representing when the schedule starts

Obrigatório

`end_minute`

int64

A 0 based minute of the day representing when the schedule ends

Obrigatório

`days`

list<int64>

Array of ints representing which days the schedule is active. Valid values are 0-6 with 0 representing Sunday, 1 representing Monday, ... and 6 representing Saturday.

Obrigatório

`timezone_type`

enum {USER, ADVERTISER}

Valor padrão: `USER`

`anchor_event_attribution_window_days`

int64

anchor\_event\_attribution\_window\_days

`attribution_spec`

list<JSON object>

Conversion attribution spec used for attributing conversions for optimization. Supported window lengths differ by optimization goal and campaign objective.

`event_type`

enum {CLICK\_THROUGH, VIEW\_THROUGH, ENGAGED\_VIDEO\_VIEW}

Obrigatório

`window_days`

int64

Obrigatório

`weight`

float

Valor padrão: `100`

`automatic_manual_state`

enum{UNSET, AUTOMATIC, MANUAL}

automatic\_manual\_state

`bid_amount`

integer

Bid cap or target cost for this ad set. The bid cap used in a _lowest cost bid strategy_ is defined as the maximum bid you want to pay for a result based on your `optimization_goal`. The target cost used in a _target cost bid strategy_ lets Facebook bid to meet your target on average and keep costs stable as you spend. If an ad level `bid_amount` is specified, updating this value will overwrite the previous ad level bid. Unless you are using [Reach and Frequency](/docs/marketing-api/reachandfrequency), `bid_amount` is required if `bid_strategy` is set to `LOWEST_COST_WITH_BID_CAP` or `COST_CAP`.  
The bid amount's unit is cents for currencies like USD, EUR, and the basic unit for currencies like JPY, KRW. The bid amount for ads with `IMPRESSION` or `REACH` as `billing_event` is per 1,000 occurrences, and has to be at least 2 US cents or more. For ads with other `billing_event`s, the bid amount is for each occurrence, and has a minimum value 1 US cents. The minimum bid amounts of other currencies are of similar value to the US Dollar values provided.

`bid_strategy`[](#)

enum{LOWEST\_COST\_WITHOUT\_CAP, LOWEST\_COST\_WITH\_BID\_CAP, COST\_CAP, LOWEST\_COST\_WITH\_MIN\_ROAS}

Choose bid strategy for this ad set to suit your specific business goals. Each strategy has tradeoffs and may be available for certain `optimization_goal`s:  
`LOWEST_COST_WITHOUT_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` without limiting your bid amount. This is the best strategy if you care most about cost efficiency. However with this strategy it may be harder to get stable average costs as you spend. This strategy is also known as _automatic bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  
`LOWEST_COST_WITH_BID_CAP`: Designed to get the most results for your budget based on your ad set `optimization_goal` while limiting actual bid to your specified amount. With a bid cap you have more control over your cost per actual optimization event. However if you set a limit which is too low you may get less ads delivery. If you select this, you must provide a bid cap with the `bid_amount` field. Note: during creation this bid strategy is set if you provide `bid_amount` only. This strategy is also known as _manual maximum-cost bidding_. Learn more in [Ads Help Center, About bid strategies: Lowest cost](https://www.facebook.com/business/help/721453268045071).  

Notes:

-   If you enable campaign budget optimization, you should set `bid_strategy` at the parent campaign level.
    
-   `TARGET_COST` bidding strategy has been deprecated with [Marketing API v9](/docs/graph-api/changelog/version9.0).
    

`billing_event`

enum{APP\_INSTALLS, CLICKS, IMPRESSIONS, LINK\_CLICKS, NONE, OFFER\_CLAIMS, PAGE\_LIKES, POST\_ENGAGEMENT, THRUPLAY, PURCHASE, LISTING\_INTERACTION}

The billing event that this ad set is using:  
APP\_INSTALLS: Pay when people install your app.  
CLICKS: Deprecated.  
IMPRESSIONS: Pay when the ads are shown to people.  
LINK\_CLICKS: Pay when people click on the link of the ad.  
OFFER\_CLAIMS: Pay when people claim the offer.  
PAGE\_LIKES: Pay when people like your page.  
POST\_ENGAGEMENT: Pay when people engage with your post.  
VIDEO\_VIEWS: Pay when people watch your video ads for at least 10 seconds.  
THRUPLAY: Pay for ads that are played to completion, or played for at least 15 seconds.

`budget_schedule_specs`

list<JSON or object-like arrays>

Initial high demand periods to be created with the ad set.  
Provide list of `time_start`, `time_end`,`budget_value`, and `budget_value_type`.  
For example,  
\-F 'budget\_schedule\_specs=\[{  
"time\_start":1699081200,  
"time\_end":1699167600,  
"budget\_value":100,  
"budget\_value\_type":"ABSOLUTE"  
}\]'  
See [High Demand Period](https://developers.facebook.com/docs/graph-api/reference/high-demand-period/) for more details on each field.

`id`

int64

`time_start`

datetime

`time_end`

datetime

`budget_value`

int64

`budget_value_type`

enum{ABSOLUTE, MULTIPLIER}

`recurrence_type`

enum{ONE\_TIME, WEEKLY}

`weekly_schedule`

list<JSON or object-like arrays>

`days`

list<int64>

`minute_start`

int64

`minute_end`

int64

`timezone_type`

string

`budget_source`

enum{NONE, RMN}

budget\_source

`budget_split_set_id`

numeric string or integer

budget\_split\_set\_id

`campaign_attribution`

enum{}

campaign\_attribution

`campaign_id`

numeric string or integer

The ad campaign you wish to add this ad set to.

`campaign_spec`

Campaign spec

Provide `name`, `objective` and `buying_type` for a campaign you want to create. Otherwise you need to provide `campaign_id` for an existing ad campaign. For example:  
\-F 'campaign\_spec={  
  "name": "Inline created campaign",  
  "objective": "CONVERSIONS",  
  "buying\_type": "AUCTION"  
}'  
  
Please refer to the [Outcome-Driven Ads Experiences mapping table](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) to find new objectives and their corresponding destination types, optimization goals and promoted objects.

`contextual_bundling_spec`

Object

settings of Contextual Bundle to support ads serving in Facebook contextual surfaces

`status`

enum{OPT\_OUT, OPT\_IN}

`creative_sequence`

list<numeric string or integer>

Order of the adgroup sequence to be shown to users

`daily_budget`

int64

The daily budget defined in your [account currency](/docs/marketing-api/adset/budget-limits), allowed only for ad sets with a duration (difference between `end_time` and `start_time`) longer than 24 hours.  
Either `daily_budget` or `lifetime_budget` must be greater than 0.

`daily_imps`

int64

Daily impressions. Available only for campaigns with `buying_type=FIXED_CPM`

`daily_min_spend_target`

int64

Daily minimum spend target of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`daily_spend_cap`

int64

Daily spend cap of the ad set defined in your account currency. To use this field, daily budget must be specified in the Campaign. Set the value to 922337203685478 to remove the spend cap.

`destination_type`

enum{WEBSITE, APP, MESSENGER, APPLINKS\_AUTOMATIC, WHATSAPP, INSTAGRAM\_DIRECT, FACEBOOK, MESSAGING\_MESSENGER\_WHATSAPP, MESSAGING\_INSTAGRAM\_DIRECT\_MESSENGER, MESSAGING\_INSTAGRAM\_DIRECT\_MESSENGER\_WHATSAPP, MESSAGING\_INSTAGRAM\_DIRECT\_WHATSAPP, SHOP\_AUTOMATIC, ON\_AD, ON\_POST, ON\_EVENT, ON\_VIDEO, ON\_PAGE, INSTAGRAM\_PROFILE, FACEBOOK\_PAGE, INSTAGRAM\_PROFILE\_AND\_FACEBOOK\_PAGE, INSTAGRAM\_LIVE, FACEBOOK\_LIVE, IMAGINE}

Destination of ads in this Ad Set. Options include: Website, App, Messenger, `INSTAGRAM_DIRECT`, `INSTAGRAM_PROFILE`.

`dsa_beneficiary`

string

dsa\_beneficiary

`dsa_payor`

string

dsa\_payor

`end_time`

datetime

End time, required when `lifetime_budget` is specified. e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. When creating a set with a daily budget, specify `end_time=0` to set the set to be ongoing and have no end date. UTC UNIX timestamp

`execution_options`

list<enum{validate\_only, include\_recommendations}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
`include_recommendations`: this option cannot be used by itself. When this option is used, recommendations for ad object's configuration will be included. A separate section [recommendations](/docs/marketing-api/reference/ad-recommendation) will be included in the response, but only if recommendations for this specification exist.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

`existing_customer_budget_percentage`

int64

existing\_customer\_budget\_percentage

`frequency_control_specs`

list<Object>

An array of frequency control specs for this ad set. Writes to this field are only available in ad sets where `REACH` and `THRUPLAY` are the performance goal.

`event`

enum{IMPRESSIONS, VIDEO\_VIEWS, VIDEO\_VIEWS\_2S, VIDEO\_VIEWS\_15S}

Event name, only `IMPRESSIONS` currently.

Obrigatório

`interval_days`

integer

Interval period in days, between 1 and 90 (inclusive)

Obrigatório

`max_frequency`

integer

The maximum frequency, between 1 and 90 (inclusive)

Obrigatório

`type`

enum{NONE, CAP, TARGET}

`is_dynamic_creative`[](#)

boolean

Indicates the ad set must only be used for dynamic creatives. Dynamic creative ads can be created in this ad set. Defaults to `false`

`is_sac_cfca_terms_certified`

boolean

is\_sac\_cfca\_terms\_certified

`lifetime_budget`

int64

Lifetime budget, defined in your [account currency](/docs/marketing-api/adset/budget-limits). If specified, you must also specify an `end_time`.  
Either `daily_budget` or `lifetime_budget` must be greater than 0.

`lifetime_imps`

int64

Lifetime impressions. Available only for campaigns with `buying_type=FIXED_CPM`

`lifetime_min_spend_target`

int64

Lifetime minimum spend target of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign. This target is not a guarantee but our best effort.

`lifetime_spend_cap`

int64

Lifetime spend cap of the ad set defined in your account currency. To use this field, lifetime budget must be specified in the Campaign. Set the value to 922337203685478 to remove the spend cap.

`max_budget_spend_percentage`

int64

max\_budget\_spend\_percentage

`min_budget_spend_percentage`

int64

min\_budget\_spend\_percentage

`multi_optimization_goal_weight`

enum{UNDEFINED, BALANCED, PREFER\_INSTALL, PREFER\_EVENT}

multi\_optimization\_goal\_weight

`name`

string

Ad set name, max length of 400 characters.

ObrigatórioSupports Emoji

`optimization_goal`

enum{NONE, APP\_INSTALLS, AD\_RECALL\_LIFT, ENGAGED\_USERS, EVENT\_RESPONSES, IMPRESSIONS, LEAD\_GENERATION, QUALITY\_LEAD, LINK\_CLICKS, OFFSITE\_CONVERSIONS, PAGE\_LIKES, POST\_ENGAGEMENT, QUALITY\_CALL, REACH, LANDING\_PAGE\_VIEWS, VISIT\_INSTAGRAM\_PROFILE, ENGAGED\_PAGE\_VIEWS, VALUE, THRUPLAY, DERIVED\_EVENTS, APP\_INSTALLS\_AND\_OFFSITE\_CONVERSIONS, CONVERSATIONS, IN\_APP\_VALUE, MESSAGING\_PURCHASE\_CONVERSION, SUBSCRIBERS, REMINDERS\_SET, MEANINGFUL\_CALL\_ATTEMPT, PROFILE\_VISIT, PROFILE\_AND\_PAGE\_ENGAGEMENT, ADVERTISER\_SILOED\_VALUE, AUTOMATIC\_OBJECTIVE, MESSAGING\_APPOINTMENT\_CONVERSION}

What the ad set is optimizing for.  
`APP_INSTALLS`: Will optimize for people more likely to install your app.  
`ENGAGED_USERS`: Will optimize for people more likely to take a particular action in your app.  
`EVENT_RESPONSES`: Will optimize for people more likely to attend your event.  
`IMPRESSIONS`: Will show the ads as many times as possible.  
`LEAD_GENERATION`: Will optimize for people more likely to fill out a lead generation form.  
`LINK_CLICKS`: Will optimize for people more likely to click in the link of the ad.  
`OFFER_CLAIMS`: Will optimize for people more likely to claim the offer.  
`OFFSITE_CONVERSIONS`: Will optimize for people more likely to make a conversion in the site  
`PAGE_ENGAGEMENT`: Will optimize for people more likely to engage with your page.  
`PAGE_LIKES`: Will optimize for people more likely to like your page.  
`POST_ENGAGEMENT`: Will optimize for people more likely to engage with your post.  
`REACH`: Optimize to reach the most unique users of each day or interval specified in `frequency_control_specs`.  
`SOCIAL_IMPRESSIONS`: Increase the number of impressions with social context. For example, with the names of one or more of the user's friends attached to the ad who have already liked the page or installed the app.  
`VALUE`: Will optimize for maximum total purchase value within the specified attribution window.  
`THRUPLAY`: Will optimize delivery of your ads to people are more likely to play your ad to completion, or play it for at least 15 seconds.  
`AD_RECALL_LIFT`: Optimize for people more likely to remember seeing your ads.  
`VISIT_INSTAGRAM_PROFILE`: Optimize for visits to the advertiser's instagram profile.

`optimization_sub_event`

enum{NONE, VIDEO\_SOUND\_ON, TRIP\_CONSIDERATION, TRAVEL\_INTENT, TRAVEL\_INTENT\_NO\_DESTINATION\_INTENT, TRAVEL\_INTENT\_BUCKET\_01, TRAVEL\_INTENT\_BUCKET\_02, TRAVEL\_INTENT\_BUCKET\_03, TRAVEL\_INTENT\_BUCKET\_04, TRAVEL\_INTENT\_BUCKET\_05, POST\_INTERACTION}

Optimization sub event for a specific optimization goal (ex: Sound-On event for Video-View-2s optimization goal)

`pacing_type`

list<string>

Defines the pacing type, standard by default or using [ad scheduling](/docs/marketing-api/adset/pacing)

`promoted_object`

Object

The object this ad set is promoting across all its ads. Required with certain campaign objectives.  
**CONVERSIONS**

-   `pixel_id` (Conversion pixel ID)
-   `pixel_id` (Facebook pixel ID) and `custom_event_type`
-   `pixel_id` (Facebook pixel ID) and `pixel_rule` and `custom_event_type`
-   `event_id` (Facebook event ID) and `custom_event_type`
-   `application_id`, `object_store_url`, and `custom_event_type` for mobile app events
-   `offline_conversion_data_set_id` (Offline dataset ID) and `custom_event_type` for offline conversions

**PAGE\_LIKES**

-   `page_id`

**OFFER\_CLAIMS**

-   `page_id`

**LINK\_CLICKS**

-   `application_id` and `object_store_url` for mobile app or Canvas app engagement link clicks

**APP\_INSTALLS**

-   `application_id` and `object_store_url`

**if the `optimization_goal` is `OFFSITE_CONVERSIONS`**

-   `application_id`, `object_store_url`, and `custom_event_type` (Standard Events)
-   `application_id`, `object_store_url`, `custom_event_type = OTHER` and `custom_event_str` (Custom Events)

**PRODUCT\_CATALOG\_SALES**

-   `product_set_id`
-   `product_set_id` and `custom_event_type`

When `optimization_goal` is `LEAD_GENERATION`, `page_id` needs to be passed as promoted\_object.  
  
Please refer to the [Outcome-Driven Ads Experiences mapping table](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) to find new objectives and their corresponding destination types, optimization goals and promoted objects.

`application_id`

int

The ID of a Facebook Application. Usually related to mobile or canvas games being promoted on Facebook for installs or engagement

`pixel_id`

numeric string or integer

The ID of a Facebook conversion pixel. Used with offsite conversion campaigns.

`custom_event_type`

enum{AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

The event from an App Event of a mobile app, not in the standard event list.

`object_store_url`

URL

The uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the "application\_id" this uniquely specifies an object which can be the subject of a Facebook advertising campaign.

`object_store_urls`

list<URL>

The vec of uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the "application\_id" this uniquely specifies an object which can be the subject of a Facebook advertising campaign.

`offer_id`

numeric string or integer

The ID of an Offer from a Facebook Page.

`page_id`

Page ID

The ID of a Facebook Page

`product_catalog_id`

numeric string or integer

The ID of a Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

`product_item_id`

numeric string or integer

The ID of the product item.

`instagram_profile_id`

numeric string or integer

The ID of the instagram profile id.

`product_set_id`

numeric string or integer

The ID of a Product Set within an Ad Set level Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

`event_id`

numeric string or integer

The ID of a Facebook Event

`offline_conversion_data_set_id`

numeric string or integer

The ID of the offline dataset.

`fundraiser_campaign_id`

numeric string or integer

The ID of the fundraiser campaign.

`custom_event_str`

string

The event from an App Event of a mobile app, not in the standard event list.

`mcme_conversion_id`

numeric string or integer

The ID of a MCME conversion.

`conversion_goal_id`

numeric string or integer

The ID of a Conversion Goal.

`offsite_conversion_event_id`

numeric string or integer

The ID of a Offsite Conversion Event

`boosted_product_set_id`

numeric string or integer

The ID of the Boosted Product Set within an Ad Set level Product Catalog. Should only be present when the advertiser has opted into Product Set Boosting.

`lead_ads_form_event_source_type`

enum{inferred, offsite\_crm, offsite\_web, onsite\_crm, onsite\_crm\_single\_event, onsite\_web, onsite\_p2b\_call, onsite\_messaging}

The event source of lead ads form.

`lead_ads_custom_event_type`

enum{AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

The event from an App Event of a mobile app, not in the standard event list.

`lead_ads_custom_event_str`

string

The event from an App Event of a mobile app, not in the standard event list.

`lead_ads_offsite_conversion_type`

enum{default, clo}

The offsite conversion type for lead ads

`value_semantic_type`

enum {VALUE, MARGIN, LIFETIME\_VALUE}

The semantic of the event value to be using for optimization

`variation`

enum {OMNI\_CHANNEL\_SHOP\_AUTOMATIC\_DATA\_COLLECTION, PRODUCT\_SET\_AND\_APP, PRODUCT\_SET\_AND\_IN\_STORE, PRODUCT\_SET\_AND\_OMNICHANNEL, PRODUCT\_SET\_AND\_PHONE\_CALL, PRODUCT\_SET\_AND\_WEBSITE, PRODUCT\_SET\_AND\_WEBSITE\_AND\_PHONE\_CALL, PRODUCT\_SET\_WEBSITE\_APP\_AND\_INSTORE}

Variation of the promoted object for a PCA ad

`passback_pixel_id`

numeric string or integer

ID of the pixel used for tracking passback events

`passback_application_id`

numeric string or integer

ID of the application used for tracking passback events

`product_set_optimization`

enum{enabled, disabled}

Enum defining whether or not the ad should be optimized for the promoted product set

`full_funnel_objective`

enum{OFFER\_CLAIMS, PAGE\_LIKES, EVENT\_RESPONSES, POST\_ENGAGEMENT, WEBSITE\_CONVERSIONS, LINK\_CLICKS, VIDEO\_VIEWS, LOCAL\_AWARENESS, PRODUCT\_CATALOG\_SALES, LEAD\_GENERATION, BRAND\_AWARENESS, STORE\_VISITS, REACH, APP\_INSTALLS, MESSAGES, OUTCOME\_AWARENESS, OUTCOME\_ENGAGEMENT, OUTCOME\_LEADS, OUTCOME\_SALES, OUTCOME\_TRAFFIC, OUTCOME\_APP\_PROMOTION}

Enum defining the full funnel objective of the campaign

`dataset_split_id`

numeric string or integer

ID of the dataset split used to perform additional optimization on the dataset

`dataset_split_ids`

array<numeric string>

IDs of the dataset splits used to perform additional optimization on the dataset

`lead_ads_selected_pixel_id`

numeric string or integer

The selected pixel id for lead ads conversion leads optimization

`multi_event_product`

int64

Identifies which action-to-action product the advertiser is using

`product_sales_channel`

enum {ONLINE, IN\_STORE, OMNI}

ProductSalesChannel of the promoted object for Omni L3 DA SBLI ads

`anchor_event_config`

JSON object

Configuration for anchor event in multi-event optimization campaigns

`multi_event_conversion_info`

JSON object

Configuration for multi-event conversion info in CLO campaigns

`live_video_destination`

enum{FACEBOOK, INSTAGRAM}

The live video destination type for live video ads

`omnichannel_object`

Object

`app`

array<JSON object>

`pixel`

array<JSON object>

Obrigatório

`onsite`

array<JSON object>

`whats_app_business_phone_number_id`

numeric string or integer

`whatsapp_phone_number`

string

`rf_prediction_id`

numeric string or integer

Reach and frequency prediction ID

`source_adset_id`

numeric string or integer

The source adset id that this ad is copied from (if applicable).

`start_time`

datetime

The start time of the set, e.g. `2015-03-12 23:59:59-07:00` or `2015-03-12 23:59:59 PDT`. UTC UNIX timestamp

`status`

enum{ACTIVE, PAUSED, DELETED, ARCHIVED}

Only `ACTIVE` and `PAUSED` are valid for creation. The other statuses can be used for update. If it is set to `PAUSED`, all its active ads will be paused and have an effective status `ADSET_PAUSED`.

`targeting`

Targeting object

An ad set's targeting structure. "countries" is required. See [targeting](/docs/marketing-api/targeting-specs).

`time_based_ad_rotation_id_blocks`

list<list<int64>>

Specify ad creative that displays at custom date ranges in a campaign as an array. A list of Adgroup IDs. The list of ads to display for each time range in a given schedule. For example display first ad in Adgroup for first date range, second ad for second date range, and so on. You can display more than one ad per date range by providing more than one ad ID per array. For example set `time_based_ad_rotation_id_blocks` to \[\[1\], \[2, 3\], \[1, 4\]\]. On the first date range show ad 1, on the second date range show ad 2 and ad 3 and on the last date range show ad 1 and ad 4. Use with `time_based_ad_rotation_intervals` to specify date ranges.

`time_based_ad_rotation_intervals`

list<int64>

Date range when specific ad creative displays during a campaign. Provide date ranges in an array of UNIX timestamps where each timestamp represents the start time for each date range. For example a 3-day campaign from May 9 12am to May 11 11:59PM PST can have three date ranges, the first date range starts from May 9 12:00AM to May 9 11:59PM, second date range starts from May 10 12:00AM to May 10 11:59PM and last starts from May 11 12:00AM to May 11 11:59PM. The first timestamp should match the campaign start time. The last timestamp should be at least 1 hour before the campaign end time. You must provide at least two date ranges. All date ranges must cover the whole campaign length, so any date range cannot exceed campaign length. Use with `time_based_ad_rotation_id_blocks` to specify ad creative for each date range.

`time_start`

datetime

Time start

`time_stop`

datetime

Time stop

`tune_for_category`

enum{NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}

tune\_for\_category

`value_rule_set_id`

numeric string or integer

Value Rule Set ID

`value_rules_applied`

boolean

value\_rules\_applied

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

368

The action attempted has been deemed abusive or is otherwise disallowed

2695

The ad set creation reached its campaign group(ios14) limit.

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

2641

Your ad includes or excludes locations that are currently restricted

190

Invalid OAuth 2.0 Access Token

900

No such application exists.

[](#)

## Atualizando

### Examples

```
v24.0
```

To update the `end_time` of an ad set, using ISO-8601 date-time format

PHP SDKPython SDKcURL

```
use FacebookAds\Object\AdSet;

$adset = new AdSet('<AD_SET_ID>');
$adset->end_time = '2013-10-02T00:00:00-0700';
$adset->update();
```

```
from facebookads.objects import AdSet

adset = AdSet('<AD_SET_ID>')
adset[AdSet.Field.end_time] = '2013-10-02T00:00:00-0700'
adset.remote_update()
```

```
curl \
-F "end_time=2013-10-02T00:00:00-0700" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>"
```

To update the status of an ad set to paused

PHP SDKPython SDKcURL

```
use FacebookAds\Object\AdSet;

$adset = new AdSet('<AD_SET_ID>');
$adset->campaign_status = AdSet::STATUS_PAUSED;
$adset->update();
```

```
from facebookads.objects import AdSet

adset = AdSet('<AD_SET_ID>')
adset[AdSet.Field.status] = AdSet.Status.paused
adset.remote_update()
```

```
curl \
-F "campaign_status=PAUSED" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>"
```

### Remarks

An archived ad set can only update two fields: `name` and `campaign_status`. The `campaign_status` field can only be changed to `DELETED`.

A deleted ad set can only change its `name`.

There are two considerations to take into account when adjusting an ad set's budget value or budget type:

-   When updating a set's lifetime or daily budget to a lower value, the new value must be at least 10% greater than the current amount spent already. For example: if an ad set has a $1000 lifetime budget and has spend $300 so far, the lowest new lifetime budget would be $330.
    
-   Since `v2.4`, ad sets have a minimum required budget. Any update must take that into consideration. Check the details at the [Create Considerations](#create-considerations) section from this page.
    

**Note:** When using the Reservation buying type, some fields may not be available to be updated through the API.

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

### Examples

```
v24.0
```

You can delete an [AdSet](/docs/marketing-api/reference/ad-campaign/) by making a DELETE request to [`/{ad_set_id}`](/docs/marketing-api/reference/ad-campaign/).

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=DELETE&path=%3CAD_SET_ID%3E%2F&version=v24.0)

```
DELETE /v24.0/<AD_SET_ID>/ HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->delete(
    '/<AD_SET_ID>/',
    array (),
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/<AD_SET_ID>/",
    "DELETE",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<AD_SET_ID>/",
    null,
    HttpMethod.DELETE,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<AD_SET_ID>/"
                                      parameters:params
                                      HTTPMethod:@"DELETE"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X DELETE -G \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<AD_SET_ID>/
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

[](#)

## Outcome-Driven Ads Experiences

### Example

**Outcome-Driven Ads Experiences (Engagement Outcome + `ON_PAGE` destination\_type)**

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=510023043449140&version=1756159753)

```
curl -i -X POST \
  -d "name=New ODAX Adset" \
  -d "autobid=true" \
  -d "optimization_goal=PAGE_LIKES" \
  -d "destination_type=ON_PAGE" \
  -d "billing_event=IMPRESSIONS" \
  -d "daily_budget=500" \
  -d "targeting={\"geo_locations\": {\"countries\": [\"US\"]}}" \
  -d "promoted_object={\"page_id\": PAGE_ID}" \
  -d "campaign_id=CAMPAIGN_ID" \
  -d "status=PAUSED" \
  -d "access_token=ACCESS_TOKEN" \
  https://graph.facebook.com/v11.0/
  act_AD_ACCOUNT_ID/adsets
```

**Legacy**

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=423919395898286&version=1756159753)

```
curl -i -X POST \
  -d "name=New ODAX Adset" \
  -d "autobid=true" \
  -d "optimization_goal=PAGE_LIKES" \
  -d "billing_event=IMPRESSIONS" \
  -d "daily_budget=500" \
  -d "targeting={\"geo_locations\": {\"countries\": [\"US\"]}}" \
  -d "promoted_object={\"page_id\": PAGE_ID}" \
  -d "campaign_id=CAMPAIGN_ID" \
  -d "status=PAUSED" \
  -d "access_token=ACCESS_TOKEN" \
  https://graph.facebook.com/v11.0/
  act_AD_ACCOUNT_ID/adsets
```

### Restrictions

There will be new restrictions on Outcome-Driven Ads Experiences (ODAX) campaigns as outlined in the table below. Refer to the [Outcome-Driven Ads Experiences mapping table](/docs/marketing-api/reference/ad-campaign-group#odax-mapping) to find the new objectives and their corresponding destination types, optimization goals and promoted objects.

ODAX Objectives

Conversion Location (L2)

Conversion Events (L2)

Optimization Goals (L2)

Legacy Objectives

**Awareness**  
_Reach the largest number of people who are likely to remember your ad._

N/A

N/A

Ad Recall Lift, Reach, Impressions

  

API enum {`AD_RECALL_LIFT`, `REACH`, `IMPRESSIONS`}

Reach, Brand Awareness

**Traffic**  
_Send people to a destination like your website, app or Shop._

Facebook Shops (closed beta)

N/A

Link Clicks

  

API enum {`LINK_CLICKS`}

Traffic

Website

N/A

Landing Page Views, Link Clicks, Impressions, Daily Unique Reach

  

API enum {`LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Traffic

App

N/A

Link Clicks, Daily Unique Reach

  

API enum {`LINK_CLICKS`, `REACH`}

Traffic

Messenger

N/A

Link Clicks, Impressions, Daily Unique Reach

  

API enum {`LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Traffic

WhatsApp

N/A

Link Clicks, Impressions, Daily Unique Reach

  

API enum {`LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Traffic

**Engagement**  
_Find people likely to interact with your business online, and take actions like starting a conversation or commenting on posts._

On Video

N/A

ThruPlay, 2 second continuous view

  

API enum {`THRUPLAY`, `TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`}

Video Views

On Post

N/A

Post Engagement, Impressions, Daily Unique Reach

  

API enum {`POST_ENGAGEMENT`, `IMPRESSIONS`, `REACH`}

Post Engagement

On Event

N/A

Event Response, Impressions, Post Engagement, Daily Unique Reach

  

API enum {`EVENT_RESPONSES`, `IMPRESSIONS`, `POST_ENGAGEMENT`, `REACH`}

Event Responses

Messenger

N/A

Conversations, Link Clicks

  

API enum {`CONVERSATIONS`, `LINK_CLICKS`}

Messages

WhatsApp

N/A

Conversations, Link Clicks

  

API enum {`CONVERSATIONS`, `LINK_CLICKS`}

Messages

Instagram

N/A

Conversations, Link Clicks

  

API enum {`CONVERSATIONS`, `LINK_CLICKS`}

Messages

Website

AddToWishlist, Contact, CustomizeProduct, Donate, FindLocation,, Schedule, Search, StartTrial, SubmitApplication, Subscribe, ViewContent

Conversions, Landing Page Views, Link Clicks, Impressions, Daily Unique Reach

  

API enum {`OFFSITE_CONVERSIONS`, `ONSITE_CONVERSIONS`, `LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

App

Achieve Level, Activate App, Add to Wishlist, Complete Tutorial, Contact, Customize Product, Donate, Find Location, In-App Ad Click, In-App Ad Impression, Rate, Schedule, Search, Spent Credits, Start Trial, Submit Application, Subscribe, Unlock Achievement, View Content

App Events, Link Clicks, Daily Unique Reach

  

API enum {`APP_INSTALLS_AND_OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `REACH`}

Conversions

On Page

N/A

Page Likes

  

API enum {`PAGE_LIKES`}

Engagement

**Leads**  
_Find people interested in your business who are likely to share their contact information._

Website

Lead, CompleteRegistration, Contact, FindLocation, Schedule, StartTrial, SubmitApplication, Subscribe

Conversions, Landing Page Views, Link Clicks, Impressions, Daily Unique Reach

  

API enum {`OFFSITE_CONVERSIONS`, `ONSITE_CONVERSIONS`, `LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

Instant Forms

N/A

Leads

  

API enum {`LEAD_GENERATION`, `QUALITY_LEAD`}

Lead Generation

Messenger

N/A

Leads

  

API enum {`LEAD_GENERATION`, `QUALITY_LEAD`}

Messages

Calls

N/A

Calls

  

API enum {`QUALITY_CALL`}

Lead Generation

App

Complete Registration, Complete Tutorial, Contact, Find Location, Schedule, Start Trial, Submit Application, Subscribe

App Events, Link Clicks, Daily Unique Reach

  

API enum {`APP_INSTALLS_AND_OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `REACH`}

Conversions

**App Promotion**  
_Find people likely to install your app._

N/A

All app events, including all custom events

Non-AAA: Link Clicks, App Installs, App Events, Value

  

API enum {`LINK_CLICKS`, `APP_INSTALLS`, `APP_INSTALLS_AND_OFFSITE_CONVERSIONS`, `VALUE`}

  

AAA: App Installs, App Installs w/ App Events, App Events, Value

  

API enum {`APP_INSTALLS`, `APP_INSTALLS_AND_OFFSITE_CONVERSIONS`, `VALUE`}

App Installs

**Sales**  
_Find people likely to make purchases or take other important actions online or in store._

Website & Facebook Shops (closed beta)

Purchase, InitiateCheckout, AddPaymentInfo, AddToCart, CompleteRegistration, Donate, StartTrial, Subscribe, ViewContent

(source of truth: same as today's Conversions objective + web and shop)

  

API enum {`OFFSITE_CONVERSIONS`, `VALUE`, `LINK_CLICKS`, `LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

Website

Purchase, InitiateCheckout, AddPaymentInfo, AddToCart, CompleteRegistration, Donate, StartTrial, Subscribe, ViewContent

Conversions, Value, Landing Page Views, Link Clicks, Impressions, Daily Unique Reach

  

API enum {`OFFSITE_CONVERSIONS`, `VALUE`, `LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

App

Purchase, Initiate Checkout, Add Payment Info, Add to Cart, Complete Registration, Donate, In-App Ad Click, In-App Ad Impression, Spent Credits, Start Trial, Subscribe, View Content

App Events, Link Clicks, Daily Unique Reach

  

API enum {`OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `REACH`}

Conversions

Website & App

Purchase, InitiateCheckout, AddPaymentInfo, AddToCart, CompleteRegistration, Donate, StartTrial, Subscribe, ViewContent

Conversions

  

API enum {`OFFSITE_CONVERSIONS`}

Conversions

Messenger

Purchase, InitiateCheckout, AddPaymentInfo, AddToCart, CompleteRegistration, Donate, StartTrial, Subscribe, ViewContent

Conversations, Conversions, Link Clicks, Impressions, Reach

  

API enum {`CONVERSATIONS`, `OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

WhatsApp

Purchase, InitiateCheckout, AddPaymentInfo, AddToCart, CompleteRegistration, Donate, StartTrial, Subscribe, ViewContent

Conversions, Link Clicks, Impressions, Reach

  

API enum {`OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH`}

Conversions

[](#)