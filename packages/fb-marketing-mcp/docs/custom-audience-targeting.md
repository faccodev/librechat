---
title: "Custom Audience"
source: "https://developers.facebook.com/docs/marketing-api/custom-audience-targeting"
scraped_at: "2026-02-01T14:26:05.850Z"
---

Versão Graph API

[v24.0](#)

# Custom Audience

[](#)

Beginning September 2, 2025, we will start to roll out more proactive restrictions on custom audiences that may suggest information not permitted under our terms. For example, any custom audience or lookalike audience suggesting specific health conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit score", "high income") will be flagged and prevented from being used to run ad campaigns.

**What these restrictions mean for your campaigns:**

-   You won't be able to use flagged custom audiences when creating new campaigns.
-   If you have an active campaign using flagged custom audiences, you should edit or pause it and choose a different audience to avoid performance and delivery issues.

**For API developers:**

-   Beginning September 2, 2025, `operation_statu`s will return `471` to signal if your custom audiences have been flagged.

More information on this update and how to resolve flagged custom audiences can be found [here](https://www.facebook.com/business/help/1055828013359808).

Build an audience of your customers, website visitors, mobile app visitors or people similar to them. To add or remove users from a custom audience, see the [Custom Audience User reference](/docs/marketing-api/reference/custom-audience/users/).

To use custom audiences, business users must first sign our [Terms Of Service](/docs/marketing-api/audiences-api/custom-audience-terms-of-service).

To improve how audiences are created and managed, custom audiences that have not been used in any active ad sets in over two years will be deleted on a rolling basis automatically. See the [Custom Audiences: Overview: Deletion](/docs/marketing-api/audiences/overview#custom-audiences-deletion) for more information.

### Flagged custom and lookalike audiences

If one or more custom or lookalike audience is flagged with an `operation_status` of `471`, the `effective_status` field of the ad set will change to `WITH_ISSUES` and the `issues_info` list will be populated with one issue per flagged audience. The `fields_violating_integrity_policy` field will be populated with the list of flagged fields.

Attempting to edit a flagged custom audience without changing the custom audience fields listed in the `fields_violating_integrity_policy` field will result in an error.

```
{
  "error": {
    "message": "Invalid parameter",
    "code": 100,
    "error_subcode": 1713231,
    "error_user_title": "Update Restricted Fields and Rule",
    "error_user_msg": "This custom audience has integrity restrictions. To continue, you must update the restricted fields and the rule in your current edit",
  },
}
```

Attempting to edit a flagged lookalike audience or customer file custom audience (DFCA) will result in an error.

```
{
  "error": {
    "message": "Invalid parameter",
    "code": 100,
    "error_subcode": 1713228,
    "error_user_title": "Custom Audience Cannot Be Edited",
    "error_user_msg": "This audience cannot be edited due to integrity restrictions. Please appeal the restrictions or create a new audience",
  },
}
```

**Example**

```
{
    "account_id": "<OWNER_ACCOUNT_ID>",
    "approximate_count": 5000,
    "approximate_count_lower_bound": 4900,
    "approximate_count_upper_bound": 5100,
    "customer_file_source": "USER_PROVIDED_ONLY",
    "description": "Audience Description",
    "fields_violating_integrity_policy": ["<FIELD>", ...],
    "id": "<CUSTOM_AUDIENCE_ID>",
    "name": "Audience Name",
    "operation_status": {
        "code": 471,
        "description": "The custom audience or lookalike is blocked because it suggests the use of information (e.g., health, financial) not allowed under Meta's terms, and is restricted from running ads. Review the audience and remove prohibited information, or choose a different one."
    },
    "retention_days": 0,
    "subtype": "CUSTOM",
    "time_created": 1755083743,
    "time_updated": 1755083943,
    "time_content_updated": 1755083943,
    "owner_account_info": {
        "account_id": "<OWNER_ACCOUNT_ID>",
        "account_name": "Account Name",
        "business_id": "<OWNER_BUSINESS_ID>",
        "business_name": "Business Name"
    },
    ...
}
```

#### To resolve flagged audiences

If your custom or lookalike audiences are flagged, consider these options.

To resolve flagged custom audiences:

-   **Review flagged audiences**: Use Audience Manager to review your custom audience along with other information included in an audience, and remove any information that is not allowed under [Meta's terms](https://www.facebook.com/legal/terms/businesstools/).
-   **Create new or choose different audiences**: Alternatively, you can create a new custom audience or choose a different existing custom audience and make sure that it does not include information not allowed under our terms and use that to run campaigns.

To resolve flagged lookalike audiences:

-   **Resolve issues with the underlying custom audience**: If the underlying custom audience (also known as the seed audience) of your lookalike audience is flagged, you will need to resolve the issue with the underlying custom audience on which the lookalike audience is built. Please refer to the preceding section on how to resolve flagged custom audiences.
-   **Create new audiences**: Consider developing new lookalike audiences and make sure that they don't include information that is not allowed under our terms.

##### Request a review

If you believe your custom audience or lookalike audience has been flagged in error and doesn't include non-permitted information, you can request a review via Ads Manager under the campaigns table or, or in Audience Manager by clicking on individual audiences and under the summary tab of the impacted audience.

[](#)

## Leitura

Custom audiences are designed to provide advertisers the ability to target their ads to a specific set of people with whom they have already established a relationship on and off Facebook. Advertisers may choose to define audiences by email address, Facebook User IDs, phone numbers, names, date of birth, gender, locations, [app user IDs](/docs/app-ads/targeting/mobile-advertiser-ids), Apple's Advertising Identifier (IDFA), [Android's advertising ID](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Fads%2F%23apps&h=AT1gHIxHUG_40qnacFO6umveCptC1ZmwDsNKn2xXPxnVOAiXaqp9OHL_nCB29x5tsFjXzAgxAeCIXmfQk9780yrqtoFSr-miJVYhIhBNOXELgg6JFtHfMPN5W2yK2kLS78HOsVelaq_Qg3nYnyaeUnVfk59eG9ahfSuwKyPImDY) or by a combination of rules used to identify users who took specific actions on their website.

When utilizing Facebook User IDs please ensure you comply with [Facebook Platform Terms](/terms) and [Developer Policies](/devpolicy). You must accept the [Custom Audience Terms of Service](/docs/marketing-api/audiences-api/custom-audience-terms-of-service) in order to use custom audiences. You can query which terms have been accepted by checking the `tos_accepted` field of a given ad account. See [Ad Account](/docs/marketing-api/adaccount/) for more information.

### Example

```
v24.0
```

### Parâmetros

Parâmetro

Descrição

`ad_account_id`

numeric string

ID of the recipient ad account in which custom audience is used.

`special_ad_categories`

list<string>

special\_ad\_categories

`special_ad_category_countries`

list<string>

special\_ad\_category\_countries

### Campos

Campo

Descrição

`id`

numeric string

Custom audience ID

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_id`

numeric string

Ad Account ID

`approximate_count_lower_bound`

integer

Lower bound of the approximate number of people in this audience. A call for this field returns `-1` for [inactive lookalikes](/docs/marketing-api/lookalike-audience-targeting#inactive).

`approximate_count_upper_bound`

integer

Upper bound of the approximate number of people in this audience. A call for this field returns `-1` for [inactive lookalikes](/docs/marketing-api/lookalike-audience-targeting#inactive).

`customer_file_source`

string

Source of customer information in the uploaded file

`data_source`

[CustomAudienceDataSource](https://developers.facebook.com/docs/marketing-api/reference/custom-audience-data-source/)

JSON dictionary of `type`, `sub_type` to indicate by which method the custom audience was created.  
Note: Subtypes `IG_BUSINESS_EVENTS`, `FB_EVENT_SIGNALS` and `MULTI_DATA_EVENTS` can only be created through Ads Manager, Audience Manager, and not through the API.

`delivery_status`

CustomAudienceStatus

JSON dictionary of `code` and `description`. It indicates whether or not an audience can be used in ads. Possible values include:

-   `200`: Returned if the audience is active and ready to be used.
-   `300`: Returned if the audience is smaller than it should be. This audience is currently inactive and cannot be used.
-   `400` and above: Returned if the audience is not usable for a variety of reasons, including policy violation.

`description`

string

Custom audience description

`external_event_source`

[AdsPixel](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/)

Read-only JSON dictionary with `id` keys containing the Pixel ID whose traffic generated this custom audience. Will throw an error if the app making the call lacks the required permissions.

`fields_violating_integrity_policy`

list<string>

A list of custom audience fields (either name, description or rule) that are flagged for a custom audience that may suggest information not permitted under our terms.

`is_value_based`

bool

Whether the audience is used to seed value based lookalike

`lookalike_audience_ids`

list<numeric string>

The IDs of the lookalike audiences generated from this audience

`lookalike_spec`

LookalikeSpec

Generated only when the subtype is `LOOKALIKE`. More info at [Lookalike Audience](/docs/marketing-api/lookalike-audience-targeting/)

`name`

string

Custom audience name

`operation_status`

CustomAudienceStatus

JSON dictionary of `code` to int value and `description` to a description string. The operation status represents the status of the last operation performed on an audience. In general, it will have following states:

-   `0`: Status not available
-   `100`: If an audience hasn't been used in an active ad set for over 2 years, it will begin to expire. Expiring audiences that remain unused for 90 days will be deleted.
-   `200`: Normal. There is no updating or issues found
-   `400`: Warning. There is some message we would like advertisers to know
-   `410`: No upload. No file has been uploaded
-   `411`: Low match rate. Low rate of matched people
-   `412`: High rate of invalid entries in the last upload session. Customer file has unusable data
-   `414`: Replace in progress
-   `415`: Replace failed
-   `421`: No pixel. Your Facebook pixel hasn't been installed on your website yet
-   `422`: Pixel not firing. Your Facebook pixel isn't firing
-   `423`: Invalid pixel. Your Facebook pixel is invalid
-   `431`: Lookalike Audience refresh failed
-   `432`: Lookalike Audience build failed
-   `433`: Lookalike Audience build failed
-   `434`: Lookalike Audience build retrying
-   `441`: We're finding people who fit your audience criteria. You can start running ads with this audience right away, but be aware that your audience size will increase as the audience is populated
-   `442`: Your Custom Audience could not be prefilled
-   `450`: This audience either hasn't been used in an ad for at least 30 days or was created over 90 days ago and has never been used. For this reason, your audience is out of date.
-   `470`: The account that created this audience is no longer active
-   `471`: The audience has been flagged for integrity reasons.
-   `500`: Error: there is some error and advertisers need to take action items to fix the error

`opt_out_link`

string

Your opt-out URL so people can choose not to be targeted

`permission_for_actions`

AudiencePermissionForActions

JSON dictionary of permissions (string) to boolean value if the custom audience has that permission

`pixel_id`

numeric string

ID of the pixel which is collecting events for this Website Custom audience

`retention_days`

int32

Number of days to keep the user in this cluster. You can use any value between 1 and 180 days. Defaults to forever, if not specified. Only available for Customer File Custom Audience, including Custom Audiences created from CRM data.

`rule`

string

Audience rules to be applied on the referrer URL

`rule_aggregation`

string

Aggregation on top of the rule, examples of aggregations include: count, sum etc

`sharing_status`

CustomAudienceSharingStatus

Sharing status of this custom audience for the ad account

`subtype`

string

Type of custom audience, derived from original data source.  
Note: Subtypes `IG_BUSINESS`, `FB_EVENT`, `EXPERIMENTAL` and `MULTI_DATA` can only be created through Ads Manager, Audience Manager, and not through the API.

`time_content_updated`

unsigned int32

Last update of people in this custom audience, this field is only supported for Customer List Custom Audiences.

`time_created`

unsigned int32

Creation time

`time_updated`

unsigned int32

Last time this audience metadata was updated

### Bordas

Borda

Descrição

[`adaccounts`](/docs/marketing-api/reference/custom-audience/adaccounts/)

Edge<CustomAudienceAdAccount>

The ad account ids associated with this custom audience

[`ads`](/docs/marketing-api/reference/custom-audience/ads/)

Edge<Adgroup>

Ads that are using this custom audience

[`health`](/docs/marketing-api/reference/custom-audience/health/)

Edge<CustomAudienceHealth>

health

[`sessions`](/docs/marketing-api/reference/custom-audience/sessions/)

Edge<CustomAudienceSession>

Data upload sessions of this custom audience

[`shared_account_info`](/docs/marketing-api/reference/custom-audience/shared_account_info/)

Edge<CustomAudiencesharedAccountInfo>

List of Ad Accounts and Businesses this Audience is shared to

### Error Codes

Erro

Descrição

100

Invalid parameter

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

200

Permissions error

190

Invalid OAuth 2.0 Access Token

270

This Ads API request is not allowed for apps with development access level (Development access is by default for all apps, please request for upgrade). Make sure that the access token belongs to a user that is both admin of the app and admin of the ad account

2500

Error parsing graph query

[](#)

## Criando

### Limitations

-   The `subtype` field for engagement custom audiences is only supported for video.
-   Mobile app custom audiences for inclusion targeting is no longer supported for the `POST /{ad-account-id}/adsets` endpoint for iOS 14+ SKAdNetwork campaigns.
-   New iOS 14+ app install campaigns will no longer be able to use app connections targeting.

### Examples

Create a blank audience:

```
v24.0
```

You can make a POST request to `customaudiences` edge from the following paths:

-   [`/act_{ad_account_id}/customaudiences`](/docs/marketing-api/reference/ad-account/customaudiences/)

When posting to this edge, a [CustomAudience](/docs/marketing-api/reference/custom-audience/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=act_%3CAD_ACCOUNT_ID%3E%2Fcustomaudiences%3Fname%3DMy%2Bnew%2BCustom%2BAudience%26subtype%3DCUSTOM%26description%3DPeople%2Bwho%2Bpurchased%2Bon%2Bmy%2Bwebsite%26customer_file_source%3DUSER_PROVIDED_ONLY&version=v24.0)

```
POST /v24.0/act_<AD_ACCOUNT_ID>/customaudiences HTTP/1.1
Host: graph.facebook.com

name=My+new+Custom+Audience&subtype=CUSTOM&description=People+who+purchased+on+my+website&customer_file_source=USER_PROVIDED_ONLY
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/act_<AD_ACCOUNT_ID>/customaudiences',
    array (
      'name' => 'My new Custom Audience',
      'subtype' => 'CUSTOM',
      'description' => 'People who purchased on my website',
      'customer_file_source' => 'USER_PROVIDED_ONLY',
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
    "/act_<AD_ACCOUNT_ID>/customaudiences",
    "POST",
    {
        "name": "My new Custom Audience",
        "subtype": "CUSTOM",
        "description": "People who purchased on my website",
        "customer_file_source": "USER_PROVIDED_ONLY"
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
params.putString("name", "My new Custom Audience");
params.putString("subtype", "CUSTOM");
params.putString("description", "People who purchased on my website");
params.putString("customer_file_source", "USER_PROVIDED_ONLY");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/act_<AD_ACCOUNT_ID>/customaudiences",
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
  @"name": @"My new Custom Audience",
  @"subtype": @"CUSTOM",
  @"description": @"People who purchased on my website",
  @"customer_file_source": @"USER_PROVIDED_ONLY",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/act_<AD_ACCOUNT_ID>/customaudiences"
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
  -F 'name="My new Custom Audience"' \
  -F 'subtype="CUSTOM"' \
  -F 'description="People who purchased on my website"' \
  -F 'customer_file_source="USER_PROVIDED_ONLY"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/customaudiences
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`allowed_domains`

list<string>

A list of domains that the audience is restricted to.

`claim_objective`

enum {AUTOMOTIVE\_MODEL, COLLABORATIVE\_ADS, HOME\_LISTING, MEDIA\_TITLE, PRODUCT, TRAVEL, VEHICLE, VEHICLE\_OFFER}

Specifies the objective of audiences with `CLAIM` subtype.

`content_type`

enum {AUTOMOTIVE\_MODEL, DESTINATION, FLIGHT, GENERIC, HOME\_LISTING, HOTEL, LOCAL\_SERVICE\_BUSINESS, MEDIA\_TITLE, OFFLINE\_PRODUCT, PRODUCT, VEHICLE, VEHICLE\_OFFER}

Specifies a mandatory content type for `TRAVEL` claim objective.

`customer_file_source`

enum {USER\_PROVIDED\_ONLY, PARTNER\_PROVIDED\_ONLY, BOTH\_USER\_AND\_PARTNER\_PROVIDED}

Source of customer information in the uploaded file.

`dataset_id`

numeric string or integer

The offline conversion dataset associated with this audience.

`description`

string

The description for this custom audience

`enable_fetch_or_create`

boolean

If `true`, we fetch a custom audience instead of creating one when an identical custom audience already exists. Identical custom audiences must have same `name`, `claim_objective`, `content_type`, `event_source_group/event_sources/sliced_event_source_group`, inclusions, exclusions and rule.

`event_source_group`

numeric string or integer

Specifies event source group for `TRAVEL` claim objective.

`event_sources`

array<JSON object>

Specifies event sources for `TRAVEL` claim objective.

`id`

int64

id

Obrigatório

`type`

enum {APP, OFFLINE\_EVENTS, PAGE, PIXEL}

type

Obrigatório

`facebook_page_id`

numeric string or integer

facebook\_page\_id

`is_value_based`

boolean

Whether the audience is used to seed a new value based lookalike audience.

`list_of_accounts`

list<int64>

List of user and page accounts

`lookalike_spec`

JSON-encoded string

The specification for creating a [lookalike audience](/docs/marketing-api/lookalike-audience-targeting/).

`name`

string

The name of this custom audience.

`opt_out_link`

string

Your opt-out URL so people can choose not to be targeted.

`origin_audience_id`

numeric string or integer

The ID of origin Custom Audience.The origin audience you create must have a minimum size of 100.

`pixel_id`

numeric string or integer

The pixel associated with this audience

`prefill`

boolean

You can specify `true` or `false`. `true` includes website traffic recorded prior to the audience creation, and `false` only includes website traffic beginning at the time of the audience creation.

`product_set_id`

numeric string or integer

The Product Set to target with this audience

`retention_days`

int64

Number of days to keep the user in this cluster. You can use any value between `1` and `180` days. Defaults to forever, if not specified.

`rule`

string

Audience rule to be applied on the referrer URL. Used for [website custom audiences](/docs/marketing-api/custom-audience-website/#audiencerules), [product audiences](/docs/marketing-api/dynamic-product-ads/product-audiences/#productaudience), and [video remarketing audiences](/docs/marketing-api/guides/videoads/#remarketing).

`rule_aggregation`

string

Aggregation rule

`subscription_info`

list<enum {WHATSAPP, MESSENGER}>

subscription\_info

`subtype`

enum {CUSTOM, PRIMARY, WEBSITE, APP, OFFLINE\_CONVERSION, CLAIM, MANAGED, PARTNER, VIDEO, LOOKALIKE, ENGAGEMENT, BAG\_OF\_ACCOUNTS, STUDY\_RULE\_AUDIENCE, FOX, MEASUREMENT, REGULATED\_CATEGORIES\_AUDIENCE, BIDDING, EXCLUSION, MESSENGER\_SUBSCRIBER\_LIST}

Type of custom audience, derived from original data source.  
Note: `COMBINATION` subtype is only used by Ads Manager, and is not available through the API.  
  
Number of audiences limit for selected subtype:  
`CUSTOM`: 500  
`LOOKALIKE`: 10000  

`use_for_products`

list<enum {ADS, MARKETING\_MESSAGES}>

use\_for\_products

`use_in_campaigns`

boolean

Valor padrão: `true`

use\_in\_campaigns

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`message`: string,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

2654

Failed to create custom audience

2663

Terms of service has not been accepted. To accept, go to https://www.facebook.com/customaudiences/app/tos

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

2664

The corporate terms of service has not been accepted. To accept, go to https://business.facebook.com/ads/manage/customaudiences/tos.php

[](#)

## Atualizando

If a person opted out of being targeted, you must remove them from all custom audiences in which they appear. To opt-out a person from an audience after they have clicked through to your opt-out URL, make an `HTTP DELETE` call to:

```
v24.0
```

Provide the same fields as you do in a [user update](/docs/marketing-api/reference/custom-audience/users/). This will remove the people you specify from **ALL** custom file custom audiences belonging to the specified ad account.

### Examples

To update the audience name:

```
v24.0
```

To edit an opt-out link:

```
v24.0
```

You can update a [CustomAudience](/docs/marketing-api/reference/custom-audience/) by making a POST request to [`/{custom_audience_id}`](/docs/marketing-api/reference/custom-audience/).

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=%3CCUSTOM_AUDIENCE_ID%3E%2F%3Fname%3DUpdated%2BName%2Bfor%2BCA&version=v24.0)

```
POST /v24.0/<CUSTOM_AUDIENCE_ID>/ HTTP/1.1
Host: graph.facebook.com

name=Updated+Name+for+CA
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/<CUSTOM_AUDIENCE_ID>/',
    array (
      'name' => 'Updated Name for CA',
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
    "/<CUSTOM_AUDIENCE_ID>/",
    "POST",
    {
        "name": "Updated Name for CA"
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
params.putString("name", "Updated Name for CA");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<CUSTOM_AUDIENCE_ID>/",
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
  @"name": @"Updated Name for CA",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<CUSTOM_AUDIENCE_ID>/"
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
  -F 'name="Updated Name for CA"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<CUSTOM_AUDIENCE_ID>/
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`allowed_domains`

list<string>

A list of domains that the audience is restricted to

`claim_objective`

enum {AUTOMOTIVE\_MODEL, COLLABORATIVE\_ADS, HOME\_LISTING, MEDIA\_TITLE, PRODUCT, TRAVEL, VEHICLE, VEHICLE\_OFFER}

Specifies the objective of audiences with `subtype=CLAIM`

`content_type`

enum {AUTOMOTIVE\_MODEL, DESTINATION, FLIGHT, GENERIC, HOME\_LISTING, HOTEL, LOCAL\_SERVICE\_BUSINESS, MEDIA\_TITLE, OFFLINE\_PRODUCT, PRODUCT, VEHICLE, VEHICLE\_OFFER}

Specifies a mandatory content type for `claim_objective`: `TRAVEL`, `AUTO_OFFER`, `HOME_LISTING`, `VEHICLE`.

`customer_file_source`

enum {USER\_PROVIDED\_ONLY, PARTNER\_PROVIDED\_ONLY, BOTH\_USER\_AND\_PARTNER\_PROVIDED}

Source of customer information in the uploaded file

`description`

string

The description for this custom audience

`enable_fetch_or_create`

boolean

Fetch custom audience instead of create new one when there exists custom audience with identical name, claim\_objective, content\_type, event\_source\_group/event\_sources/sliced\_event\_source\_group, inclusions, exclusions and rule

`event_source_group`

numeric string or integer

Specifies a mandatory content type for `claim_objective`: `TRAVEL`, `AUTO_OFFER`, `HOME_LISTING`, `VEHICLE`.

`event_sources`

array<JSON object>

Specifies a mandatory content type for `claim_objective`: `TRAVEL`, `AUTO_OFFER`, `HOME_LISTING`, `VEHICLE`.

`id`

int64

id

Obrigatório

`type`

enum {APP, OFFLINE\_EVENTS, PAGE, PIXEL}

type

Obrigatório

`lookalike_spec`

JSON-encoded string

The specification for creating a [lookalike audience](/docs/marketing-api/lookalike-audience-targeting/)

`name`

string

The name of this custom audience

`opt_out_link`

string

Your opt-out URL so people can choose not to be targeted

`product_set_id`

numeric string or integer

The Product Set to target with this audience

`rule`

string

Audience rule to be applied on the referrer URL. Used for [website custom audiences](/docs/marketing-api/custom-audience-website/#audiencerules), [product audiences](/docs/marketing-api/dynamic-product-ads/product-audiences/#productaudience), and [video remarketing audiences](/docs/marketing-api/guides/videoads/#remarketing).

`rule_aggregation`

string

Aggregation rule

`use_for_products`

list<enum {ADS, MARKETING\_MESSAGES}>

use\_for\_products

`use_in_campaigns`

boolean

use\_in\_campaigns

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`message`: string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

2650

Failed to update the custom audience

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)

## Excluindo

When you delete a custom audience, it will be permanently removed from your account and your ads using it will stop running. You won't be able to restart any ads that used this audience in the past.

You can delete a [CustomAudience](/docs/marketing-api/reference/custom-audience/) by making a DELETE request to [`/{custom_audience_id}`](/docs/marketing-api/reference/custom-audience/).

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=DELETE&path=%3CCUSTOM_AUDIENCE_ID%3E%2F&version=v24.0)

```
DELETE /v24.0/<CUSTOM_AUDIENCE_ID>/ HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->delete(
    '/<CUSTOM_AUDIENCE_ID>/',
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
    "/<CUSTOM_AUDIENCE_ID>/",
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
    "/<CUSTOM_AUDIENCE_ID>/",
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
                               initWithGraphPath:@"/<CUSTOM_AUDIENCE_ID>/"
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
  https://graph.facebook.com/v24.0/<CUSTOM_AUDIENCE_ID>/
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

2656

Failed to delete custom audience because associated lookalikes exist

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

613

Calls to this api have exceeded the rate limit.

[](#)