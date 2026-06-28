---
title: "Graph API Referência v24.0: Ad Account"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/"
scraped_at: "2026-02-01T14:21:43.191Z"
---

Versão Graph API

[v24.0](#)

# Ad Account

[](#)

Represents a business, person or other entity who creates and manages ads on Facebook. Multiple people can manage an account, and each person can have one or more levels of access to an account, see [Business Manager API](/docs/marketing-api/business-manager-api).

In response to Apple’s new policy, we are announcing breaking changes that will affect SDKAdNetwork, Marketing API and Ads Insights API endpoints.

To learn more about how Apple’s iOS 14.5 requirements will impact Facebook advertising, visit our Business Help Center aricles and changelog:

-   [Facebook SDK for iOS, App Events API and Mobile Measurement Partners Updates for Apple's iOS 14 Requirements](https://www.facebook.com/business/help/2750680505215705?id=428636648170202)
-   [Facebook Pixel Updates for Apple's iOS 14 Requirements](https://www.facebook.com/business/help/721422165168355)
-   [January 19, 2021 - Breaking Changes](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/jan-19-2021)

The `agency_client_declaration` field requires [Admin privileges](https://www.facebook.com/business/help/442345745885606?id=180505742745347) for all operations starting with v10.0 and will be required for all versions on May 25, 2021.

## Ad Volume

You can view the volume of ads _running or in review_ for your ad accounts. These ads will count against the ads limit per page that we will enact in early 2021. Query the number of ads running or in review for a given ad account.

Ad Limit Per Page enforcement begins for when a Page reaches its ad limit enforcement date. Enforcement date can be queried [here](https://developers.facebook.com/docs/marketing-api/insights-api/ads-volume).

When a Page is at its ad limit:

-   New ads (or ads scheduled to begin at that time) do not publish successfully.
-   Actions on existing ads are limited to pausing and archiving until the number of ads running or in review is below the ad limit.

To see the ads volume for your ad account:

```
curl -G 
  -d "access_token=<access_token>" 
  "https://graph.facebook.com/<API_VERSION>/act_<ad_account_ID>/ads_volume"
```

The response looks like this:

```
{"data":[{"ads_running_or_in_review_count":2}]}
```

For information on managing ads volume, see [About Managing Ad Volume](https://www.facebook.com/business/help/2720085414702598).

### Running Or In Review

To see if an ad is running or in review, we check `effective_status`, `configured_status`, and the ad account's status:

-   If an ad has `effective_status` of `1` - `active`, we consider it a _running_ or _in review_.
-   If an ad has `configured_status` of `active` and `effective_status` of `9` - `pending review`, or `17` - `pending processing` we consider it a _running_ or _in review_.
-   The ad can be _running_ or _in review_ only if the ad account status is in `1` - `active`, `8` - `pending settlement`, `9` - `in grace period`.

We also determine if an ad is running or in review based on the ad set's schedule.

-   If start time is before current time, and current time is before end time, then we consider the ad running or in review.
-   If start time is before current time and the ad set has no end time, we also consider it running or in review.

For example, if the ad set is scheduled to run in the future, the ads are not running or in review. However if the ad set is scheduled to run from now until three months from now, we consider the ads running or in review.

If you are using special ads scheduling features, such as _day-parting_, we consider the ad running or in review the _whole day_, not just for the part of the day when the ad starts running.

### Breakdown By Actors

We’ve added the `show_breakdown_by_actor` parameter to the `act_123/ads_volume` endpoint so you can query ad volume and ad limits-related information for each page. For more details, see [Breakdown by Actors](/docs/marketing-api/insights-api/ads-volume#breakdown-by-actors).

* * *

### Limits

Limit

Value

Maximum number of ad accounts per person

25

Maximum number of people with access, per ad account

25

Maximum number of ads per regular ad account

6,000 non-archived non-deleted ads

Maximum number of ads per bulk ad account

50,000 non-archived non-deleted ads

Maximum number of archived ads per ad account

100,000 archived ads

Maximum number of ad sets per regular ad account

6,000 non-archived non-deleted ad sets

Maximum number of ad sets per bulk ad account

10,000 non-archived non-deleted ad sets

Maximum number of archived ad sets per ad account

100,000 archived ad sets

Maximum number of ad campaigns per regular ad account

6,000 non-archived non-deleted ad campaigns

Maximum number of ad campaigns per bulk ad account

10,000 non-archived non-deleted ad campaigns

Maximum number of archived ad campaigns per ad account

100,000 archived ad campaigns

Maximum number of images per ad account

Unlimited

[](#)

## Leitura

An ad account is an account used for managing ads on Facebook

### Digital Services Act Saved Beneficiary/Payor Information

Use the following code examples to download the beneficiary and payor information.  
  

#### Android SDK

```
GraphRequest request = GraphRequest.newGraphPathRequest(
 accessToken,
 "/act_<AD_ACCOUNT_ID>",
 new GraphRequest.Callback() {
   @Override
   public void onCompleted(GraphResponse response) {
     // Insert your code here
   }
});

Bundle parameters = new Bundle();
parameters.putString("fields", "default_dsa_payor,default_dsa_beneficiary");
request.setParameters(parameters);
request.executeAsync();
iOS SDK
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/act_<AD_ACCOUNT_ID>"
           parameters:@{ @"fields": @"default_dsa_payor,default_dsa_beneficiary",}
           HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
Javascript SDK:
FB.api(
  '/act_<AD_ACCOUNT_ID>',
  'GET',
  {"fields":"default_dsa_payor,default_dsa_beneficiary"},
  function(response) {
      // Insert your code here
  }
);
```

#### cURL

```
v24.0
```
The return value is in JSON format. For example:
```
{"default_dsa_payor":"payor2","default_dsa_beneficiary":"bene2","id":"act_426197654150180"}
```

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

string

The string `act_{ad_account_id}`.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_id`

numeric string

The ID of the Ad Account.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_status`

unsigned int32

Status of the account:  
`1 = ACTIVE`  
`2 = DISABLED`  
`3 = UNSETTLED`  
`7 = PENDING_RISK_REVIEW`  
`8 = PENDING_SETTLEMENT`  
`9 = IN_GRACE_PERIOD`  
`100 = PENDING_CLOSURE`  
`101 = CLOSED`  
`201 = ANY_ACTIVE`  
`202 = ANY_CLOSED`  

`ad_account_promotable_objects`

[AdAccountPromotableObjects](https://developers.facebook.com/docs/graph-api/reference/ad-account-promotable-objects/)

Ad Account creation request purchase order fields associated with this Ad Account.

`age`

float

Amount of time the ad account has been open, in days.

`agency_client_declaration`

[AgencyClientDeclaration](https://developers.facebook.com/docs/marketing-api/reference/agency-client-declaration/)

Details of the agency advertising on behalf of this client account, if applicable. Requires Business Manager [Admin](https://www.facebook.com/business/help/442345745885606?id=180505742745347) privileges.

`amount_spent`

numeric string

Current amount spent by the account with respect to `spend_cap`. Or total amount in the absence of `spend_cap`. See [why amount spent is different in ad account spending limit](https://business.facebook.com/business/help/196476577203529?id=1792465934137726) for more info.

`attribution_spec`

list<AttributionSpec>

**Deprecated due to iOS 14 changes.** Please visit the [changelog](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/jan-19-2021) for more information.

`balance`

numeric string

Bill amount due for this Ad Account.

`brand_safety_content_filter_levels`

list<string>

Brand safety content filter levels set for in-content ads (Facebook in-stream videos and Ads on Facebook Reels) and Audience Network along with feed ads (Facebook Feed, Instagram feed, Facebook Reels feed and Instagram Reels feed) if applicable.

Refer to [Placement Targeting](https://developers.facebook.com/docs/marketing-api/audiences/reference/placement-targeting/#placement-targeting) for a list of supported values.

`business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

The [Business Manager](/docs/marketing-api/businessmanager), if this ad account is owned by one

`business_city`

string

City for business address

`business_country_code`

string

Country code for the business address

`business_name`

string

The business name for the account

`business_state`

string

State abbreviation for business address

`business_street`

string

First line of the business street address for the account

`business_street2`

string

Second line of the business street address for the account

`business_zip`

string

Zip code for business address

`can_create_brand_lift_study`

bool

If we can create a new automated brand lift study under the Ad Account.

`capabilities`

list<string>

List of capabilities an Ad Account can have. See [capabilities](/docs/marketing-api/reference/ad-account/capabilities)

`created_time`

datetime

The time the account was created in ISO 8601 format.

`currency`

string

The currency used for the account, based on the corresponding value in the account settings. See [supported currencies](/docs/marketing-api/currencies)

`default_dsa_beneficiary`

string

This is the default value for creating L2 object of dsa\_beneficiary

`default_dsa_payor`

string

This is the default value for creating L2 object of dsa\_payor

`direct_deals_tos_accepted`

bool

Whether DirectDeals ToS are accepted.

`disable_reason`

unsigned int32

The reason why the account was disabled. Possible reasons are:  
`0 = NONE`  
`1 = ADS_INTEGRITY_POLICY`  
`2 = ADS_IP_REVIEW`  
`3 = RISK_PAYMENT`  
`4 = GRAY_ACCOUNT_SHUT_DOWN`  
`5 = ADS_AFC_REVIEW`  
`6 = BUSINESS_INTEGRITY_RAR`  
`7 = PERMANENT_CLOSE`  
`8 = UNUSED_RESELLER_ACCOUNT`  
`9 = UNUSED_ACCOUNT`  
`10 = UMBRELLA_AD_ACCOUNT`  
`11 = BUSINESS_MANAGER_INTEGRITY_POLICY`  
`12 = MISREPRESENTED_AD_ACCOUNT`  
`13 = AOAB_DESHARE_LEGAL_ENTITY`  
`14 = CTX_THREAD_REVIEW`  
`15 = COMPROMISED_AD_ACCOUNT`  

`end_advertiser`

numeric string

The entity the ads will target. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID.

`end_advertiser_name`

string

The name of the entity the ads will target.

`existing_customers`

list<string>

The custom audience ids that are used by advertisers to define their existing customers. This definition is primarily used by Automated Shopping Ads.

`expired_funding_source_details`

FundingSourceDetails

`ID` = ID of the payment method  
`COUPON` = Details of the Facebook Ads Coupon from the payment method  
`COUPONS` = List of active Facebook Ads Coupon from the ad account  
`COUPON_ID` = ID of the Facebook Ads Coupon  
`AMOUNT` = Amount of Facebook Ads Coupon  
`CURRENCY` = Currency of the Facebook Ads Coupon  
`DISPLAY_AMOUNT` = How the amount of Facebook Ads Coupon is displayed  
`EXPIRATION` = When the coupon expired  
`START_DATE` = When the coupon started  
`DISPLAY_STRING` = How the payment method is shown  
`CAMPAIGN_IDS` = List of campaigns the coupon can be applied to, empty if the coupon is applied on the ad account level.  
`ORIGINAL_AMOUNT` = Amount of Facebook Ads Coupon When Issued  
`ORIGINAL_DISPLAY_AMOUNT` = How the Facebook Ads Coupon displayed When Issued  
`TYPE` = Type of the funding source  
`0 = UNSET`  
`1 = CREDIT_CARD`  
`2 = FACEBOOK_WALLET`  
`3 = FACEBOOK_PAID_CREDIT`  
`4 = FACEBOOK_EXTENDED_CREDIT`  
`5 = ORDER`  
`6 = INVOICE`  
`7 = FACEBOOK_TOKEN`  
`8 = EXTERNAL_FUNDING`  
`9 = FEE`  
`10 = FX`  
`11 = DISCOUNT`  
`12 = PAYPAL_TOKEN`  
`13 = PAYPAL_BILLING_AGREEMENT`  
`14 = FS_NULL`  
`15 = EXTERNAL_DEPOSIT`  
`16 = TAX`  
`17 = DIRECT_DEBIT`  
`18 = DUMMY`  
`19 = ALTPAY`  
`20 = STORED_BALANCE`  

To access this field, the user making the API call must have a `MANAGE` task permission for that specific ad account. See [Ad Account, Assigned Users](/docs/marketing-api/reference/ad-account/assigned_users/) for more information.

`extended_credit_invoice_group`

[ExtendedCreditInvoiceGroup](https://developers.facebook.com/docs/marketing-api/reference/extended-credit-invoice-group/)

The extended credit invoice group that the ad account belongs to

`failed_delivery_checks`

[list<DeliveryCheck>](https://developers.facebook.com/docs/marketing-api/adgroup/deliverychecks/)

Failed delivery checks

`fb_entity`

unsigned int32

fb\_entity

`funding_source`

numeric string

ID of the payment method. If the account does not have a payment method it will still be possible to create ads but these ads will get no delivery. Not available if the account is disabled

`funding_source_details`

FundingSourceDetails

`ID` = ID of the payment method  
`COUPON` = Details of the Facebook Ads Coupon from the payment method  
`COUPONS` = List of active Facebook Ads Coupon from the ad account  
`COUPON_ID` = ID of the Facebook Ads Coupon  
`AMOUNT` = Amount of Facebook Ads Coupon  
`CURRENCY` = Currency of the Facebook Ads Coupon  
`DISPLAY_AMOUNT` = How the amount of Facebook Ads Coupon is displayed  
`EXPIRATION` = When the coupon will expire  
`START_DATE` = When the coupon starts  
`DISPLAY_STRING` = How the payment method is shown  
`CAMPAIGN_IDS` = List of campaigns the coupon can be applied to, empty if the coupon is applied on the ad account level.  
`ORIGINAL_AMOUNT` = Amount of Facebook Ads Coupon When Issued  
`ORIGINAL_DISPLAY_AMOUNT` = How the Facebook Ads Coupon displayed When Issued  
`TYPE` = Type of the funding source  
`0 = UNSET`  
`1 = CREDIT_CARD`  
`2 = FACEBOOK_WALLET`  
`3 = FACEBOOK_PAID_CREDIT`  
`4 = FACEBOOK_EXTENDED_CREDIT`  
`5 = ORDER`  
`6 = INVOICE`  
`7 = FACEBOOK_TOKEN`  
`8 = EXTERNAL_FUNDING`  
`9 = FEE`  
`10 = FX`  
`11 = DISCOUNT`  
`12 = PAYPAL_TOKEN`  
`13 = PAYPAL_BILLING_AGREEMENT`  
`14 = FS_NULL`  
`15 = EXTERNAL_DEPOSIT`  
`16 = TAX`  
`17 = DIRECT_DEBIT`  
`18 = DUMMY`  
`19 = ALTPAY`  
`20 = STORED_BALANCE`  

To access this field, the user making the API call must have a `MANAGE` task permission for that specific ad account. See [Ad Account, Assigned Users](/docs/marketing-api/reference/ad-account/assigned_users/) for more information.

`has_migrated_permissions`

bool

Whether this account has migrated permissions

`has_page_authorized_adaccount`

bool

Indicates whether a Facebook page has authorized this ad account to place ads with political content. If you try to place an ad with political content using this ad account for this page, and this page has not authorized this ad account for ads with political content, your ad will be disapproved. See [Breaking Changes, Marketing API, Ads with Political Content](/docs/graph-api/changelog/breaking-changes#4-23-2018) and [Facebook Advertising Policies](https://www.facebook.com/policies/ads)

`io_number`

numeric string

The Insertion Order (IO) number.

`is_attribution_spec_system_default`

bool

If the attribution specification of ad account is generated from system default values

`is_direct_deals_enabled`

bool

Whether the account is enabled to run Direct Deals

`is_in_3ds_authorization_enabled_market`

bool

If the account is in a market requiring to go through payment process going through 3DS authorization

`is_notifications_enabled`

bool

Get the notifications status of the user for this ad account. This will return true or false depending if notifications are enabled or not

`is_personal`

unsigned int32

Indicates if this ad account is being used for private, non-business purposes. This affects how value-added tax (VAT) is assessed. **Note:** This is not related to whether an ad account is attached to a business.

`is_prepay_account`

bool

If this ad account is a prepay. Other option would be a postpay account.  
  

To access this field, the user making the API call must have a `ADVERTISE` or `MANAGE` task permission for that specific ad account. See [Ad Account, Assigned Users](https://developers.facebook.com/docs/marketing-api/reference/ad-account/assigned_users/) for more information.

`is_tax_id_required`

bool

If tax id for this ad account is required or not.  
  

To access this field, the user making the API call must have a `ADVERTISE` or `MANAGE` task permission for that specific ad account. See [Ad Account, Assigned Users](https://developers.facebook.com/docs/marketing-api/reference/ad-account/assigned_users/) for more information.

`line_numbers`

list<integer>

The line numbers

`media_agency`

numeric string

The agency, this could be your own business. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`.

`min_campaign_group_spend_cap`

numeric string

The minimum required spend cap of Ad Campaign.

`min_daily_budget`

unsigned int32

The minimum daily budget for this Ad Account

`name`

string

Name of the account. If not set, the name of the first admin visible to the user will be returned.

`offsite_pixels_tos_accepted`

bool

Indicates whether the offsite pixel Terms Of Service contract was signed. This feature can be accessible before v2.9

`opportunity_score`

float

On a 0-100 point scale, this score represents how optimized the ad account's campaigns, ad sets and ads are overall.

See [Opportunity Score](https://web.facebook.com/business/tools/opportunity-score) to learn more.

`owner`

numeric string

The ID of the account owner

`partner`

numeric string

This could be Facebook Marketing Partner, if there is one. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`.

`rf_spec`

ReachFrequencySpec

Reach and Frequency limits configuration. [See Reach and Frequency](/docs/marketing-api/reachandfrequency)

`show_checkout_experience`

bool

Whether or not to show the pre-paid checkout experience to an advertiser. If `true`, the advertiser is eligible for checkout, or they are already locked in to checkout and haven't graduated to postpay.

`spend_cap`

numeric string

The maximum amount that can be spent by this Ad Account. When the amount is reached, all delivery stops. A value of `0` means no spending-cap. Setting a new spend cap only applies to spend **AFTER** the time at which you set it. Value specified in basic unit of the currency, for example 'cents' for `USD`.

`tax_id`

string

Tax ID

`tax_id_status`

unsigned int32

VAT status code for the account.  
`0`: Unknown  
`1`: VAT not required- US/CA  
`2`: VAT information required  
`3`: VAT information submitted  
`4`: Offline VAT validation failed  
`5`: Account is a personal account

`tax_id_type`

string

Type of Tax ID

`timezone_id`

unsigned int32

The [timezone ID](/docs/marketing-api/reference/ad-account/timezone-ids) of this ad account

`timezone_name`

string

Name for the time zone

`timezone_offset_hours_utc`

float

Time zone difference from UTC (Coordinated Universal Time).

`tos_accepted`

map<string, int32>

Checks if this specific ad account has signed the Terms of Service contracts. Returns `1`, if terms were accepted.

`user_tasks`

list<string>

user\_tasks

`user_tos_accepted`

map<string, int32>

Checks if a user has signed the Terms of Service contracts related to the Business that contains a specific ad account. Must include user's access token to get information. This verification is not valid for [system users](/docs/marketing-api/businessmanager/systemuser).

### Bordas

Borda

Descrição

[`account_controls`](/docs/marketing-api/reference/ad-account/account_controls/)

Edge<AdAccountBusinessConstraints>

Account Controls is for Advantage+ shopping campaigns where advertisers can set audience controls for minimum age and excluded geo location.

[`activities`](/docs/marketing-api/reference/ad-account/activities/)

Edge<AdActivity>

The activities of this ad account

[`adcreatives`](/docs/marketing-api/reference/ad-account/adcreatives/)

Edge<AdCreative>

The ad creatives of this ad account

[`ads_reporting_mmm_reports`](/docs/marketing-api/reference/ad-account/ads_reporting_mmm_reports/)

Edge<AdsReportBuilderMMMReport>

Marketing mix modeling (MMM) reports generated for this ad account.

[`ads_reporting_mmm_schedulers`](/docs/marketing-api/reference/ad-account/ads_reporting_mmm_schedulers/)

Edge<AdsReportBuilderMMMReportScheduler>

Get all MMM report schedulers by this ad account

[`advertisable_applications`](/docs/marketing-api/reference/ad-account/advertisable_applications/)[](#)

Edge<Application>

All advertisable apps associated with this account

[`advideos`](/docs/marketing-api/reference/ad-account/advideos/)

Edge<Video>

The videos associated with this account

[`applications`](/docs/marketing-api/reference/ad-account/applications/)

Edge<Application>

Applications connected to the ad accounts

[`asyncadcreatives`](/docs/marketing-api/reference/ad-account/asyncadcreatives/)

Edge<AdAsyncRequestSet>

The async ad creative creation requests associated with this ad account.

[`broadtargetingcategories`](/docs/marketing-api/reference/ad-account/broadtargetingcategories/)

Edge<BroadTargetingCategories>

Broad targeting categories (BCTs) can be used for targeting

[`customaudiences`](/docs/marketing-api/reference/ad-account/customaudiences/)

Edge<CustomAudience>

The custom audiences owned by/shared with this ad account

[`customaudiencestos`](/docs/marketing-api/reference/ad-account/customaudiencestos/)

Edge<CustomAudiencesTOS>

The custom audiences term of services available to the ad account

[`customconversions`](/docs/marketing-api/reference/ad-account/customconversions/)

Edge<CustomConversion>

The custom conversions owned by/shared with this ad account

[`delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate/)

Edge<AdAccountDeliveryEstimate>

The delivery estimate for a given ad set configuration for this ad account

[`deprecatedtargetingadsets`](/docs/marketing-api/reference/ad-account/deprecatedtargetingadsets/)

Edge<AdCampaign>

Ad sets with deprecating targeting options for this ad account

[`dsa_recommendations`](/docs/marketing-api/reference/ad-account/dsa_recommendations/)

Edge<AdAccountDsaRecommendations>

dsa\_recommendations

[`generatepreviews`](/docs/marketing-api/reference/ad-account/generatepreviews/)

Edge<AdPreview>

Generate previews for a creative specification

[`impacting_ad_studies`](/docs/marketing-api/reference/ad-account/impacting_ad_studies/)

Edge<AdStudy>

The ad studies that contain this ad account or any of its descendant ad objects

[`instagram_accounts`](/docs/marketing-api/reference/ad-account/instagram_accounts/)

Edge<ShadowIGUser>

Instagram accounts connected to the ad accounts

[`mcmeconversions`](/docs/marketing-api/reference/ad-account/mcmeconversions/)

Edge<AdsMcmeConversion>

mcmeconversions

[`minimum_budgets`](/docs/marketing-api/reference/ad-account/minimum_budgets/)

Edge<MinimumBudget>

Returns minimum daily budget values by currency

[`promote_pages`](/docs/marketing-api/reference/ad-account/promote_pages/)

Edge<Page>

All pages that have been promoted under the ad account

[`reachestimate`](/docs/marketing-api/reference/ad-account/reachestimate/)

Edge<AdAccountReachEstimate>

The reach estimate of a given [targeting spec](/docs/marketing-api/targeting-specs) for this ad account

[`saved_audiences`](/docs/marketing-api/reference/ad-account/saved_audiences/)

Edge<SavedAudience>

Saved audiences in the account

[`targetingbrowse`](/docs/marketing-api/reference/ad-account/targetingbrowse/)

Edge<AdAccountTargetingUnified>

Unified browse

[`targetingsearch`](/docs/marketing-api/reference/ad-account/targetingsearch/)

Edge<AdAccountTargetingUnified>

Unified search

[`targetingsuggestions`](/docs/marketing-api/reference/ad-account/targetingsuggestions/)

Edge<AdAccountTargetingUnified>

Unified suggestions

[`targetingvalidation`](/docs/marketing-api/reference/ad-account/targetingvalidation/)

Edge<AdAccountTargetingUnified>

Unified validation

### Error Codes

Erro

Descrição

200

Permissions error

613

Calls to this api have exceeded the rate limit.

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

3018

The start date of the time range cannot be beyond 37 months from the current date

2500

Error parsing graph query

1150

An unknown error occurred.

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)

## Criando

To create a new ad account for your business you must specify `name`, `currency`, `timezone_id`, `end_advertiser`, `media_agency`, and `partner`. Provide `end_advertiser`, `media_agency`, and `partner`:

-   They must be Facebook Page Aliases, Facebook Page ID or an Facebook app ID. For example, to provide your company as an end advertiser you specify my company or `20531316728`.
    
-   The End Advertiser ID is the Facebook primary Page ID or Facebook app ID. Further reference to this field (for formatting and acceptable values) may be found [here](/docs/marketing-api/reference/business/adaccount/).
    
-   If your ad account has no End Advertiser, Media Agency, or Partner, specify `NONE`.
    
-   If your ad account has an End Advertiser, Media Agency, or Partner, that are not represented on Facebook by Page or app, specify `UNFOUND`.
    

**Once you set `end_advertiser` to a value other than `NONE` or `UNFOUND` you cannot change it.**

Create an ad account:

```
curl \
-F "name=MyAdAccount" \
-F "currency=USD" \
-F "timezone_id=1" \
-F "end_advertiser=<END_ADVERTISER_ID>" \
-F "media_agency=<MEDIA_AGENCY_ID>" \
-F "partner=NONE" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/adaccount"
```

If you have an extended credity line with Facebook, you can set `invoice` to `true` and we associate your new ad account to this credit line.

The response:

```
{
  "id": "act_<ADACCOUNT_ID>",
  "account_id": "<ADACCOUNT_ID>",
  "business_id": "<BUSINESS_ID>",
  "end_advertiser_id": "<END_ADVERTISER_ID>",
  "media_agency_id": "<MEDIA_AGENCY_ID>",
  "partner_id": "NONE"
}
```

You can make a POST request to `product_audiences` edge from the following paths:

-   [`/act_{ad_account_id}/product_audiences`](/docs/marketing-api/reference/ad-account/product_audiences/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fproduct_audiences%3Fname%3DTest%2BIphone%2BProduct%2BAudience%26product_set_id%3D%253CPRODUCT_SET_ID%253E%26inclusions%3D%255B%257B%2522retention_seconds%2522%253A86400%252C%2522rule%2522%253A%257B%2522and%2522%253A%255B%257B%2522event%2522%253A%257B%2522eq%2522%253A%2522AddToCart%2522%257D%257D%252C%257B%2522userAgent%2522%253A%257B%2522i_contains%2522%253A%2522iPhone%2522%257D%257D%255D%257D%257D%255D%26exclusions%3D%255B%257B%2522retention_seconds%2522%253A172800%252C%2522rule%2522%253A%257B%2522event%2522%253A%257B%2522eq%2522%253A%2522Purchase%2522%257D%257D%257D%255D&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/product_audiences HTTP/1.1
Host: graph.facebook.com

name=Test+Iphone+Product+Audience&product_set_id=%3CPRODUCT_SET_ID%3E&inclusions=%5B%7B%22retention_seconds%22%3A86400%2C%22rule%22%3A%7B%22and%22%3A%5B%7B%22event%22%3A%7B%22eq%22%3A%22AddToCart%22%7D%7D%2C%7B%22userAgent%22%3A%7B%22i_contains%22%3A%22iPhone%22%7D%7D%5D%7D%7D%5D&exclusions=%5B%7B%22retention_seconds%22%3A172800%2C%22rule%22%3A%7B%22event%22%3A%7B%22eq%22%3A%22Purchase%22%7D%7D%7D%5D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/product_audiences',
    array (
      'name' => 'Test Iphone Product Audience',
      'product_set_id' => '<PRODUCT_SET_ID>',
      'inclusions' => '[{"retention_seconds":86400,"rule":{"and":[{"event":{"eq":"AddToCart"}},{"userAgent":{"i_contains":"iPhone"}}]}}]',
      'exclusions' => '[{"retention_seconds":172800,"rule":{"event":{"eq":"Purchase"}}}]',
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
    "/act_<AD_ACCOUNT_ID>/product_audiences",
    "POST",
    {
        "name": "Test Iphone Product Audience",
        "product_set_id": "<PRODUCT_SET_ID>",
        "inclusions": "[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]",
        "exclusions": "[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]"
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
params.putString("name", "Test Iphone Product Audience");
params.putString("product_set_id", "<PRODUCT_SET_ID>");
params.putString("inclusions", "[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]");
params.putString("exclusions", "[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/product_audiences",
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
  @"name": @"Test Iphone Product Audience",
  @"product_set_id": @"<PRODUCT_SET_ID>",
  @"inclusions": @"[{\"retention_seconds\":86400,\"rule\":{\"and\":[{\"event\":{\"eq\":\"AddToCart\"}},{\"userAgent\":{\"i_contains\":\"iPhone\"}}]}}]",
  @"exclusions": @"[{\"retention_seconds\":172800,\"rule\":{\"event\":{\"eq\":\"Purchase\"}}}]",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/product_audiences"
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
  -F 'name="Test Iphone Product Audience"' \
  -F 'product_set_id="<PRODUCT_SET_ID>"' \
  -F 'inclusions=[
       {
         "retention_seconds": 86400,
         "rule": {
           "and": [
             {
               "event": {
                 "eq": "AddToCart"
               }
             },
             {
               "userAgent": {
                 "i_contains": "iPhone"
               }
             }
           ]
         }
       }
     ]' \
  -F 'exclusions=[
       {
         "retention_seconds": 172800,
         "rule": {
           "event": {
             "eq": "Purchase"
           }
         }
       }
     ]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/product_audiences
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`associated_audience_id`

int64

SELF\_EXPLANATORY

`creation_params`

dictionary { string : <string> }

SELF\_EXPLANATORY

`description`

string

SELF\_EXPLANATORY

`enable_fetch_or_create`

boolean

enable\_fetch\_or\_create

`event_sources`

array<JSON object>

event\_sources

`id`

int64

id

Obrigatório

`type`

enum {APP, OFFLINE\_EVENTS, PAGE, PIXEL}

type

Obrigatório

`exclusions`

list<Object>

SELF\_EXPLANATORY

`booking_window`

Object

`min_seconds`

int64

`max_seconds`

int64

`count`

Object

`event`

string

`type`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

`retention`

Object

`min_seconds`

integer

Obrigatório

`max_seconds`

integer

Obrigatório

`retention_days`

int64

`retention_seconds`

integer

`rule`

Object

`pixel_id`

int64

`inclusions`

list<Object>

SELF\_EXPLANATORY

`booking_window`

Object

`min_seconds`

int64

`max_seconds`

int64

`count`

Object

`event`

string

`type`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

`retention`

Object

`min_seconds`

integer

Obrigatório

`max_seconds`

integer

Obrigatório

`retention_days`

int64

`retention_seconds`

integer

`rule`

Object

`pixel_id`

int64

`name`

string

SELF\_EXPLANATORY

Obrigatório

`opt_out_link`

string

SELF\_EXPLANATORY

`parent_audience_id`

int64

SELF\_EXPLANATORY

`product_set_id`

numeric string or integer

SELF\_EXPLANATORY

Obrigatório

`subtype`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

SELF\_EXPLANATORY

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`message`: string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

2654

Failed to create custom audience

You can make a POST request to `ad_accounts` edge from the following paths:

-   [`/{custom_audience_id}/ad_accounts`](/docs/marketing-api/reference/custom-audience/ad_accounts/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`adaccounts`

list<numeric string>

Array of new ad account IDs to receive access to the custom audience

`permissions`

string

`targeting` or `targeting_and_insights`. If `targeting` the recipient ad account can target the audience in ads. `targeting_and_insights` also allows recipient account to view the audience in Audience Insights tool

`relationship_type`

array<string>

relationship\_type

`replace`

boolean

`true` or `false`. If `true` the list of `adaccounts` provided in the call will replace the existing set of ad accounts this audience is shared with.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`sharing_data`: List \[

Struct {

`ad_acct_id`: string,

`business_id`: numeric string,

`audience_share_status`: string,

`errors`: List \[

string

\],

}

\],

}

### Error Codes

Erro

Descrição

200

Permissions error

You can make a POST request to `owned_ad_accounts` edge from the following paths:

-   [`/{business_id}/owned_ad_accounts`](/docs/marketing-api/reference/business/owned_ad_accounts/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`adaccount_id`

string

Ad account ID.

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`access_status`: string,

}

### Error Codes

Erro

Descrição

3979

You have exceeded the number of allowed ad accounts for your Business Manager at this time.

3994

Personal accounts that do not have any history of activity are not eligible for migration to a business manager. Instead create an ad account inside your business manager.

100

Invalid parameter

3980

One or more of the ad accounts in your Business Manager are currently in bad standing or in review. All of your accounts must be in good standing in order to create new ad accounts.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

3936

You've already tried to claim this ad account. You'll see a notification if your request is accepted.

368

The action attempted has been deemed abusive or is otherwise disallowed

3944

Your Business Manager already has access to this object.

You can make a POST request to `adaccount` edge from the following paths:

-   [`/{business_id}/adaccount`](/docs/marketing-api/reference/business/adaccount/)

When posting to this edge, an [AdAccount](/docs/marketing-api/reference/ad-account/) will be created.

### Parâmetros

Parâmetro

Descrição

`ad_account_created_from_bm_flag`

boolean

ad\_account\_created\_from\_bm\_flag

`currency`

ISO 4217 Currency Code

The currency used for the account

Obrigatório

`end_advertiser`

The entity the ads will target. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`. Note that once a value other than `NONE` or `UNFOUND` is set, it cannot be modified any more.

Obrigatório

`funding_id`

numeric string or integer

ID of the [payment method](/docs/marketing-api/businessmanager/#invoice-funding). If the account does not have a payment method it will still be possible to create ads but these ads will get no delivery.

`invoice`

boolean

If business manager has Business Manager Owned Normal Credit Line on file on the FB CRM, it will attach the ad account to that credit line.

`invoice_group_id`

numeric string

The ID of the invoice group this adaccount should be enrolled in

`invoicing_emails`

array<string>

Emails addressed where invoices will be sent.

`io`

boolean

If corporate channel is direct sales.

`media_agency`

string

The agency, this could be your own business. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`

Obrigatório

`name`

string

The name of the ad account

Obrigatório

`partner`

string

The advertising partner for this account, if there is one. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID. In absence of one, you can use `NONE` or `UNFOUND`.

Obrigatório

`po_number`

string

Purchase order number

`timezone_id`

unsigned int32

ID for the timezone. See [here](/docs/marketing-api/reference/ad-account/timezone-ids).

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: token with structure: AdAccount ID,

`account_id`: numeric string,

`business_id`: numeric string,

`end_advertiser_id`: string,

`media_agency_id`: string,

`partner_id`: string,

`seer_ad_account_restricted_by_soft_desc_challenge`: bool,

`soft_desc_challenge_credential_id`: string,

`soft_desc_challenge_localized_auth_amount`: int32,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

3979

You have exceeded the number of allowed ad accounts for your Business Manager at this time.

3980

One or more of the ad accounts in your Business Manager are currently in bad standing or in review. All of your accounts must be in good standing in order to create new ad accounts.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

3902

There was a technical issue and your new ad account wasn't created. Please try again.

457

The session has an invalid origin

190

Invalid OAuth 2.0 Access Token

23007

This credit card can't be set as your account's primary payment method, because your account is set up to be billed after your ads have delivered. This setup can't be changed. Please try a different card or payment method.

[](#)

## Atualizando

**Notice:**

-   The `default_dsa_payor` and `default_dsa_beneficiary` values can be set to both of them or none of them. The API does not allow only one of them to exist in the data storage.
-   To unset the values: pass two empty strings at the same time, the values will be unset in the data storage. It does not allow you to unset only one of them.

You can update an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a POST request to [`/act_{ad_account_id}`](/docs/marketing-api/reference/ad-account/).

### Parâmetros

Parâmetro

Descrição

`agency_client_declaration`

dictionary { string : <string> }

Details of the agency advertising on behalf of this client account, if applicable. Requires Business Manager [Admin](https://www.facebook.com/business/help/442345745885606?id=180505742745347) privileges.

`attribution_spec`

list<Object>

**Deprecated due to iOS 14 changes.** Please visit the [changelog](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/jan-19-2021) for more information.

`event_type`

enum {CLICK\_THROUGH, VIEW\_THROUGH, ENGAGED\_VIDEO\_VIEW}

Obrigatório

`window_days`

int64

Obrigatório

`business_info`

dictionary { string : <string> }

Business Info

`custom_audience_info`

JSON object

Custom audience info for Automated Shopping Ads.

`new_customer_tag`

string

Label value for new customer in Automated Shoppings Ad's custom audience type URL parameter.

`existing_customer_tag`

string

Label value for existing customer in Automated Shoppings Ad's custom audience type URL parameter.

`audience_type_param_name`

string

field name for audience type in Automated Shoppings Ad's custom audience type UTM parameter.

`default_dsa_beneficiary`

string

This is the default value for creating L2 targeting EU's beneficiary.

`default_dsa_payor`

string

This is the default value for creating L2 targeting EU's payor.

`end_advertiser`

string

The entity the ads will target. Must be a Facebook Page Alias, Facebook Page ID or an Facebook App ID.

`is_notifications_enabled`

boolean

If notifications are enabled or not for this account

`media_agency`

string

The ID of a Facebook Page or Facebook App. Once it is set to any values other than `NONE` or `UNFOUND`, it cannot be modified any more

`name`

string

The name of the ad account

`partner`

string

The ID of a Facebook Page or Facebook App. Once it is set to any values other than `NONE` or `UNFOUND`, it cannot be modified any more

`spend_cap`

float

The total amount that this account can spend, after which all campaigns will be paused, based on `amount_spent`. A value of 0 signifies no spending-cap and setting a new spend cap only applies to spend AFTER the time at which you set it. Value specified in standard denomination of the currency, e.g. 23.50 for USD $23.50.

`spend_cap_action`

string

Setting this parameter to `reset` sets the `amount_spent` back to 0. Setting it to `delete` removes the `spend_cap` from the account.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

You can update an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a POST request to [`/act_{ad_account_id}/assigned_users`](/docs/marketing-api/reference/ad-account/assigned_users/).

### Parâmetros

Parâmetro

Descrição

`tasks`

array<enum {MANAGE, ADVERTISE, ANALYZE, DRAFT, AA\_ANALYZE}>

AdAccount permission tasks to assign this user

`user`

UID

Business user id or system user id

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

2620

Invalid call to update account permissions

[](#)

## Excluindo

You can dissociate an [AdAccount](/docs/marketing-api/reference/ad-account/) from an [AdsPixel](/docs/marketing-api/reference/ads-pixel/) by making a DELETE request to [`/{ads_pixel_id}/shared_accounts`](/docs/marketing-api/reference/ads-pixel/shared_accounts/).

### Parâmetros

Parâmetro

Descrição

`account_id`

numeric string

SELF\_EXPLANATORY

Obrigatório

`business`

numeric string or integer

SELF\_EXPLANATORY

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can dissociate an [AdAccount](/docs/marketing-api/reference/ad-account/) from a [CustomAudience](/docs/marketing-api/reference/custom-audience/) by making a DELETE request to [`/{custom_audience_id}/ad_accounts`](/docs/marketing-api/reference/custom-audience/ad_accounts/).

### Parâmetros

Parâmetro

Descrição

`adaccounts`

list<numeric string>

Array of ad account IDs to revoke access to the custom audience

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)