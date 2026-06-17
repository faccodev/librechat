---
title: "Graph API Referência v24.0: Ad"
source: "https://developers.facebook.com/docs/marketing-api/reference/adgroup"
scraped_at: "2026-02-01T14:13:57.910Z"
---

Versão Graph API

[v24.0](#)

# Ad

[](#)

Contains information to display an ad and associate it with an ad set. Each ad is associated with an ad set and all ads in a set have the same daily or lifetime budget, schedule, and targeting. Creating multiple ads in an ad set helps optimize their delivery based on variations in images, links, video, text or placements.

Note that results returned by `synchronous_ad_review` does not represent the final decision made during full review of your ad.

### Ads with Political Content

To increase transparency of ads on Facebook, we require advertisers running ads with political content to complete authorization. We will begin enforcing this in the next few weeks. You must also indicate that your ad has political content and provide the name of the funding source for the ad:

-   Your ad account must be authorized by a Page admin to run political ads for this Page. This is done by a Page admin on the `Issue, Electoral or Political Ads` tab under `Page Settings`.
    
-   Ad account users must go through a verification process.
    

### Ads with Page Mentions

With Facebook's ads tools such as [Ads Manager](https://www.facebook.com/ads/manager/accounts) or light-weight interfaces, you can create an ad with a _Page Mention_. This displays a link in your ad which opens an advertiser's Facebook page. **We do not provide this functionality in Marketing API**. If you try to create an ad with the API with a Page Mention it will succeed, however we will deliver the ad without the mention. Instead, use one of Facebook's ads tools.

### Targeting DSA Regulated Locations (European Union)

To create or copy an ad which is in an ad set targeted in the European Union's Digital Services Act (DSA) regulated locations, please set the payor/beneficiary information first. For your convenience, if the `default_dsa_payor` and `default_dsa_beneficiary` are set in an ad account, during the copying process, even if the original ad set does not set payor or beneficiary, it will be filled with saved default values. For more information on copying ads that target DSA regulated locations in the EU, see the [Ad Copies reference documentation](/docs/marketing-api/reference/adgroup/copies/#targeting-dsa-regulated-locations--european-union-).

### Targeting Youth in European Union (EU), European Economic Area (EEA), and Switzerland

Meta will stop showing ads to youth in the EU, EEA, and Switzerland as early as the week of November 6, 2023. When creating new ad sets or updating existing ones that target youth in the EU, EEA, and Switzerland, they will be prevented. Existing ad sets targeting youth in the EU, EEA and Switzerland, will pause delivery as early as the week of November 6, 2023. Existing ad sets targeting youth in the EU, EEA, and Switzerland and in other regions will see a warning that the ads in the ad sets will no longer be delivered to youth in the EU, EEA, and Switzerland.

### Examples

Creating an ad:

```
v24.0
```

To create a political ad, provide `authorization_category` with the value `POLITICAL` . For example:

```
v24.0
```

See:

-   [Ad Campaign](/docs/reference/ads-api/adcampaign), [Ad Set](/docs/reference/ads-api/adset/), and [Ad Creative](/docs/reference/ads-api/adcreative/)
    
-   [Storing Ad Objects](/docs/ads-api/best-practices/storing_adobjects)
    

[](#)

## Leitura

An ad object contains the data necessary to visually display an ad and associate it with a corresponding ad set.

### By ad ID

```
v24.0
```

### By ad account

To read all ads from one ad account:

PHP SDKPython SDKcURL

```
use FacebookAds\Object\AdAccount;
use FacebookAds\Object\Fields\AdFields;

$account = new AdAccount($account_id);
$ads = $account->getAds(array(
  AdFields::NAME,
));

// Outputs names of Ads.
foreach ($ads as $ad) {
  echo $ad->name;
}
```

```
from facebookads.objects import AdAccount, Ad

account_id = 'act_<AD_ACCOUNT_ID>'
ad_account = AdAccount(account_id)
ad_iter = ad_account.get_ads(fields=[Ad.Field.name])
for ad in ad_iter:
    print ad[Ad.Field.name]
```

```
curl -G \
-d "fields=name" \
-d "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/ads"
```

### By ad campaign

Read all ads from a campaign:

```
v24.0
```

### By ad set

To read all ads from one ad set:

PHP SDKPython SDKcURL

```
use FacebookAds\Object\AdSet;
use FacebookAds\Object\Fields\AdSetFields;

$adset = new AdSet($adset_id);
$ads = $adset->getAds(array(
  AdFields::NAME,
));

// Outputs names of Ads .
foreach ($ads as $ad) {
  echo $ad->name;
}
```

```
from facebookads.objects import AdSet, Ad

adset_id = <AD_SET_ID>
ad_set = AdSet(adset_id)
ad_iter = ad_set.get_ads(fields=[Ad.Field.name])
for ad in ad_iter:
    print ad[Ad.Field.name]
```

```
curl \
-F "fields=name" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>/ads"
```

  
  

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

The ID of this ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_id`

numeric string

The ID of the ad account that this ad belongs to.

`ad_active_time`

numeric string

The time from when the ad was recently active

`ad_review_feedback`

[AdgroupReviewFeedback](https://developers.facebook.com/docs/marketing-api/reference/adgroup-review-feedback/)

The review feedback for this ad after it is reviewed.

`ad_schedule_end_time`

datetime

An optional parameter that defines the end time of an individual ad. If no end time is defined, the ad will run on the campaign’s schedule.

This parameter is only available for sales and app promotion campaigns.

`ad_schedule_start_time`

datetime

An optional parameter that defines the start time of an individual ad. If no start time is defined, the ad will run on the campaign’s schedule.

This parameter is only available for sales and app promotion campaigns.

`adlabels`

[list<AdLabel>](https://developers.facebook.com/docs/marketing-api/reference/ad-label/)

Ad labels associated with this ad

`adset`

[AdSet](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/)

Ad set that contains this ad

`adset_id`

numeric string

ID of the ad set that contains the ad

`bid_amount`

int32

Bid amount for this ad which will be used in auction. This value would be the same as the `bid_amount` field on the ad set.

`campaign`

[Campaign](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/)

Ad campaign that contains this ad

`campaign_id`

numeric string

ID of the ad campaign that contains this ad

`configured_status`

enum {ACTIVE, PAUSED, DELETED, ARCHIVED}

The configured status of the ad. Use `status` instead of this field.

`conversion_domain`

string

The domain where conversions happen. The field is no longer required for creation or update since June 2023. Note that this field should contain only the first and second level domains, and not the full URL. For example `facebook.com`.

`created_time`

datetime

Time when the ad was created.

`creative`

[AdCreative](https://developers.facebook.com/docs/marketing-api/reference/ad-creative/)

This field is required for create. The ID or creative spec of the ad creative to be used by this ad. You can read more about creatives [here](/docs/marketing-api/adcreative). You may supply the ID within an object as follows:  
  
`{"creative_id": <CREATIVE_ID>}`  
or creative spec as follow:  
  
`{"creative": {\"name\": \"<NAME>\", \"object_story_spec\": <SPEC>}}`

`creative_asset_groups_spec`

[AdCreativeAssetGroupsSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-asset-groups-spec/)

This field is used to create ads using the Flexible ad format. You can read more about that [here](/docs/marketing-api/flexible-ad-format)

`effective_status`

enum {ACTIVE, PAUSED, DELETED, PENDING\_REVIEW, DISAPPROVED, PREAPPROVED, PENDING\_BILLING\_INFO, CAMPAIGN\_PAUSED, ARCHIVED, ADSET\_PAUSED, IN\_PROCESS, WITH\_ISSUES}

The effective status of the ad. The status could be effective either because of its own status, or the status of its parent units. `WITH_ISSUES` is available for version 3.2 or higher. `IN_PROCESS` is available for version 4.0 or higher

`issues_info`

[list<AdgroupIssuesInfo>](https://developers.facebook.com/docs/marketing-api/reference/adgroup-issues-info/)

Issues for this ad that prevented it from delivering

`last_updated_by_app_id`

id

Indicates the app used for the most recent update of the ad.

`name`

string

Name of the ad.

`preview_shareable_link`

string

A link that enables users to preview ads in different placements

`recommendations`

list<AdRecommendation>

If there are recommendations for this ad, this field includes them. Otherwise, it is not included in the response. Field not included in redownload mode.

`source_ad`

[Ad](https://developers.facebook.com/docs/marketing-api/reference/adgroup/)

The source ad that this ad is copied from

`source_ad_id`

numeric string

The source ad id that this ad is copied from

`status`

enum {ACTIVE, PAUSED, DELETED, ARCHIVED}

The configured status of the ad. The field returns the same value as `configured_status`. Use this field, instead of `configured_status`.

`tracking_specs`

[list<ConversionActionQuery>](https://developers.facebook.com/docs/marketing-api/reference/conversion-action-query/)

With tracking specs, you log actions taken by people on your ad. This field takes arguments identical to action spec. See [Tracking and Conversion Specs](/docs/marketing-api/tracking-specs).

`updated_time`

datetime

Time when this ad was updated.

### Bordas

Borda

Descrição

[`adcreatives`](/docs/marketing-api/reference/adgroup/adcreatives/)

Edge<AdCreative>

Creative associated with this ad

[`adrules_governed`](/docs/marketing-api/reference/adgroup/adrules_governed/)

Edge<AdRule>

Ad rules that govern this ad - by default, this only returns rules that either directly mention the ad by id or indirectly through the set entity\_type

[`copies`](/docs/marketing-api/reference/adgroup/copies/)

Edge<Adgroup>

The copies of this ad

[`insights`](/docs/marketing-api/reference/adgroup/insights/)

Edge<AdsInsights>

insights

[`leads`](/docs/marketing-api/reference/adgroup/leads/)

Edge<UserLeadGenInfo>

Leads submitted for this ad

[`previews`](/docs/marketing-api/reference/adgroup/previews/)

Edge<AdPreview>

Preview of the ad

[`targetingsentencelines`](/docs/marketing-api/reference/adgroup/targetingsentencelines/)

Edge<TargetingSentenceLine>

The targeting description sentence for this ad

### Error Codes

Erro

Descrição

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

613

Calls to this api have exceeded the rate limit.

190

Invalid OAuth 2.0 Access Token

104

Incorrect signature

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

2500

Error parsing graph query

3018

The start date of the time range cannot be beyond 37 months from the current date

200

Permissions error

270

This Ads API request is not allowed for apps with development access level (Development access is by default for all apps, please request for upgrade). Make sure that the access token belongs to a user that is both admin of the app and admin of the ad account

[](#)

## Criando

Before you create an ad, you need an existing [ad set](/docs/reference/ads-api/adset) and [ad creative](/docs/reference/ads-api/adcreative). You can create ads synchronously and asynchronously.

**New ads are in pending state and do not run until Facebook approves or rejects them**. After we approve an ad it runs. If you do not want an ad to automatically run after approval, create it and set its ad set to `paused` (see [ad set](/docs/reference/ads-api/adset)). Run the [ad set](/docs/reference/ads-api/adset) when you are ready.

Due to iOS 14.5 changes, [Deferred Deep Linking](https://developers.facebook.com/docs/app-ads/deep-linking#deferred-deep-linking) is no longer available for [SKAdsNetwork Campaigns](https://developers.facebook.com/docs/audience-network/guides/SKAdNetwork).

### Synchronous Creation

Creates one ad at a time:

```
v24.0
```

### Asynchronous Creation

Create multiple ads at a time asynchronously. Receive a notification when all the ads in the request exist. Make an `HTTP POST` to: `https://graph.facebook.com/{API_VERSION}/act_{AD_ACCOUNT_ID}/asyncadrequestsets`

Use these fields:

Field

Description

**name**

type: string

Required.

Name of ad set for newly created ads.

**ad\_specs**

type: array of ad specs

Required.

Ads can be created for different ad sets inside the current ad account. To use images in ad creative, provide `image_hash` in ad spec after you upload the image at `https://graph.facebook.com/{API_VERSION}/act_{AD_ACCOUNT_ID}/adimages`.  
`image_file` inside ad\_specs.

**notification\_uri**

type: string

Optional.

Async job completed. This URI notifies the caller with a `POST` and ad set id.

**notification\_mode**

type: string

Optional.

Notification mode:  
`OFF` – No notification  
`ON_COMPLETE` – Send notification when all ads for set created.

  
  

For information on asynchronous request sets, see [Asynchronous Requests](/docs/marketing-api/asyncrequests).

### Limits

These are the maximum number of ads per object:

Limit

Value

Ads in regular ad account

5000 non-deleted ads

Ads in bulk ad account

50000 non-deleted ads

Ads in an ad set

50 non-deleted ads

Archived ads in an ad account

100,000 archived ads

### Examples

Download details for an ad:

```
v24.0
```

  
  

You can make a POST request to `copies` edge from the following paths:

-   [`/{ad_id}/copies`](/docs/marketing-api/reference/adgroup/copies/)

When posting to this edge, an [Ad](/docs/marketing-api/reference/adgroup/) will be created.

### Parâmetros

Parâmetro

Descrição

`adset_id`

numeric string or integer

Single ID of an adset object to make the parent of the copy. Ignore if you want to keep the copy under the original adset parent.

`creative_parameters`

AdCreative

Creative inputs which will be used to construct the creative in the new ad. Overwrites happen at the top level. If no input is provided, the new ad will be created with an identical ad creative. If some input is provided, those parameters will be assigned to the ad creative created by this API call.

Accepts all ad creative parameters as specified in https://developers.facebook.com/docs/marketing-api/reference/ad-account/adcreatives/

Supports Emoji

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

`status_option`

enum {ACTIVE, PAUSED, INHERITED\_FROM\_SOURCE}

Valor padrão: `PAUSED`

`ACTIVE`: the copied ad will have active status. `PAUSED`: the copied ad will have paused status. `INHERITED_FROM_SOURCE`: the copied ad will have the parent status.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `copied_ad_id` in the return type.

Struct {

`copied_ad_id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

You can make a POST request to `ads` edge from the following paths:

-   [`/act_{ad_account_id}/ads`](/docs/marketing-api/reference/ad-account/ads/)

When posting to this edge, an [Ad](/docs/marketing-api/reference/adgroup/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fads%3Fname%3DMy%2BAd%26adset_id%3D%253CAD_SET_ID%253E%26creative%3D%257B%2522creative_id%2522%253A%2522%253CCREATIVE_ID%253E%2522%257D%26status%3DPAUSED&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/ads HTTP/1.1
Host: graph.facebook.com

name=My+Ad&adset_id=%3CAD_SET_ID%3E&creative=%7B%22creative_id%22%3A%22%3CCREATIVE_ID%3E%22%7D&status=PAUSED
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/ads',
    array (
      'name' => 'My Ad',
      'adset_id' => '<AD_SET_ID>',
      'creative' => '{"creative_id":"<CREATIVE_ID>"}',
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
    "/act_<AD_ACCOUNT_ID>/ads",
    "POST",
    {
        "name": "My Ad",
        "adset_id": "<AD_SET_ID>",
        "creative": "{\"creative_id\":\"<CREATIVE_ID>\"}",
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
params.putString("name", "My Ad");
params.putString("adset_id", "<AD_SET_ID>");
params.putString("creative", "{\"creative_id\":\"<CREATIVE_ID>\"}");
params.putString("status", "PAUSED");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/ads",
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
  @"name": @"My Ad",
  @"adset_id": @"<AD_SET_ID>",
  @"creative": @"{\"creative_id\":\"<CREATIVE_ID>\"}",
  @"status": @"PAUSED",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/ads"
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
  -F 'name="My Ad"' \
  -F 'adset_id="<AD_SET_ID>"' \
  -F 'creative={
       "creative_id": "<CREATIVE_ID>"
     }' \
  -F 'status="PAUSED"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/ads
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`ad_schedule_end_time`

datetime

An optional parameter that defines the end time of an individual ad. If no end time is defined, the ad will run on the campaign’s schedule.

This parameter is only available for sales and app promotion campaigns.

`ad_schedule_start_time`

datetime

An optional parameter that defines the start time of an individual ad. If no start time is defined, the ad will run on the campaign’s schedule.

This parameter is only available for sales and app promotion campaigns.

`adlabels`

list<Object>

Ad labels associated with this ad

`adset_id`

int64

The ID of the ad set, required on creation.

`adset_spec`

Ad set spec

The ad set spec for this ad. When the spec is provided, adset\_id field is not required.

`audience_id`

string

The ID of the audience.

`bid_amount`

integer

**Deprecated.** We no longer allow setting the `bid_amount` value on an ad. Please set `bid_amount` for the ad set.

`conversion_domain`

string

The domain where conversions happen. Required to create or update an ad in a campaign that shares data with a pixel. This field will be auto-populated for existing ads by inferring from destination URLs . Note that this field should contain only the first and second level domains, and not the full URL. For example `facebook.com`.

`creative`

AdCreative

This field is required for create. The ID or creative spec of the ad creative to be used by this ad. You can read more about creatives [here](/docs/marketing-api/adcreative). You may supply the ID within an object as follows:  
  
`{"creative_id": <CREATIVE_ID>}`  
or creative spec as follow:  
  
`{"creative": {\"name\": \"<NAME>\", \"object_story_spec\": <SPEC>}}`

ObrigatórioSupports Emoji

`creative_asset_groups_spec`

string (CreativeAssetGroupsSpec)

creative\_asset\_groups\_spec

Supports Emoji

`date_format`

string

The format of the date.

`display_sequence`

int64

The sequence of the ad within the same campaign

`engagement_audience`

boolean

Flag to create a new audience based on users who engage with this ad

`execution_options`

list<enum{validate\_only, synchronous\_ad\_review, include\_recommendations}>

Valor padrão: `Set`

An execution setting  
`validate_only`: when this option is specified, the API call will not perform the mutation but will run through the validation rules against values of each field.  
`include_recommendations`: this option cannot be used by itself. When this option is used, recommendations for ad object's configuration will be included. A separate section [recommendations](/docs/marketing-api/reference/ad-recommendation) will be included in the response, but only if recommendations for this specification exist.  
`synchronous_ad_review`: this option should not be used by itself. It should always be specified with `validate_only`. When these options are specified, the API call will perform Ads Integrity validations, which include message language checking, image 20% text rule, and so on, as well as the validation logics.  
If the call passes validation or review, response will be `{"success": true}`. If the call does not pass, an error will be returned with more details. These options can be used to improve any UI to display errors to the user much sooner, e.g. as soon as a new value is typed into any field corresponding to this ad object, rather than at the upload/save stage, or after review.

`include_demolink_hashes`

boolean

Include the demolink hashes.

`name`

string

Name of the ad.

ObrigatórioSupports Emoji

`priority`

int64

Priority

`source_ad_id`

numeric string or integer

ID of the source Ad, if applicable.

`status`

enum{ACTIVE, PAUSED, DELETED, ARCHIVED}

Only `ACTIVE` and `PAUSED` are valid during creation. Other statuses can be used for update. When an ad is created, it will first go through ad review, and will have the ad status `PENDING_REVIEW` before it finishes review and reverts back to your selected status of `ACTIVE` or `PAUSED`. During testing, it is recommended to set ads to a `PAUSED` status so as to not incur accidental spend.

`tracking_specs`

Object

With Tracking Specs, you log actions taken by people on your ad. See [Tracking and Conversion Specs](/docs/marketing-api/tracking-specs).

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

613

Calls to this api have exceeded the rate limit.

368

The action attempted has been deemed abusive or is otherwise disallowed

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

194

Missing at least one required parameter

500

Message contains banned content

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

190

Invalid OAuth 2.0 Access Token

105

The number of parameters exceeded the maximum for this operation

[](#)

## Atualizando

Update certain fields:

```
v24.0
```

### Limitations

-   Only update fields that were used during ad creation can be updated.
    
-   `adset_id` and `social_prefs` can not be updated.
    
-   Ads with `status = ARCHIVED` have only two mutable fields: `name` and `status`. You can only change the latter to `DELETED`.
    
-   Ads with `status = DELETED` only can have `name` changed.
    
-   Ads in an ad set with `creative_sequence` set cannot be changed to `PAUSED`, `ARCHIVED`, or `DELETED`.
    
-   Trying to duplicate existing objective campaigns to use the new objective values (`OUTCOME_APP_PROMOTION`, `OUTCOME_AWARENESS`, `OUTCOME_ENGAGEMENT`, `OUTCOME_LEADS`, `OUTCOME_SALES`, `OUTCOME_TRAFFIC`) may throw an error.
    

### Examples

Update the name:

```
v24.0
```

Update the name and download ad information:

```
v24.0
```

Update the status:

```
v24.0
```

  
  

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

#### Deleting an ad

You can remove values for any optional fields by [updating](#update) the value to empty. You cannot delete ads in ad set with `creative_sequence` settings.

```
v24.0
```

  
  

You can delete an [Ad](/docs/marketing-api/reference/adgroup/) by making a DELETE request to [`/{ad_id}`](/docs/marketing-api/reference/adgroup/).

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=DELETE&path=%3CADGROUP_ID%3E%2F&version=v24.0)

```
DELETE /v24.0/<ADGROUP_ID>/ HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->delete(
    '/<ADGROUP_ID>/',
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
    "/<ADGROUP_ID>/",
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
    "/<ADGROUP_ID>/",
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
                               initWithGraphPath:@"/<ADGROUP_ID>/"
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
  https://graph.facebook.com/v24.0/<ADGROUP_ID>/
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

100

Invalid parameter

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)