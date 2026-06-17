---
title: "Custom Conversions"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-conversion/"
scraped_at: "2026-02-01T15:43:10.624Z"
---

Versão Graph API

[v24.0](#)

# Custom Conversions

[](#)

Beginning September 2, 2025, we will start to roll out more proactive restrictions on custom conversions that may suggest information not permitted under [our terms](https://www.facebook.com/legal/terms/businesstools?_rdr). For example, any custom conversion suggesting specific health conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit score", "high income") will be flagged and prevented from being used to run ad campaigns.

**What these restrictions mean for your campaigns:**

-   You won’t be able to use flagged custom conversions when creating new campaigns.
-   If you have an active campaign using flagged custom conversions, you should either create a new campaign or duplicate your campaign and use a non-impacted custom conversion to avoid performance and optimization issues.

**For API developers:**

-   Beginning September 2, 2025, the field `is_unavailable` will return `true` to signal if your custom conversions have been flagged.

More information on this update and how to resolve flagged custom conversions can be found [here](https://www.facebook.com/business/help/2455915321411996).

Optimize ads delivery based on online and offline conversion events that you define. Track activity without adding new events Meta Pixel. Custom conversions objects are associated with an [Ad Account](/docs/marketing-api/reference/ad-account). Use them to describe events you want to measure and events you want to track to optimize ads delivery.

Specify actions that are different from the nine standard events. See also [Meta Pixel](/docs/marketing-api/facebook-pixel), [Conversion Tracking with Meta Pixel](/docs/marketing-api/facebook-pixel/conversion-tracking) and [Promoted Object](/docs/marketing-api/reference/ad-campaign/promoted-object).

**You need standard API access for this endpoint. See [Marketing API, Access Levels](https://developers.facebook.com/docs/marketing-api/access).**

For example, define a `PURCHASE` conversion as an event occuring when someone visits certain pages such as `thankyou.html` or `confirmation.html`:

```
curl \
-F 'name=URL based Custom Conversion' \
-F 'event_source_id=<FB_PIXEL_ID>' \
-F 'rule={"or":[{"url":{"i_contains": "thankyou.html"}},{"url":{"i_contains":"confirmation.html"}}]}' \
-F 'custom_event_type=PURCHASE' \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/customconversions'
```

In this example, events occur if someone visits those two `.html` pages, case-insensitive of the page name and extention.

### Limitations

Note that the maximum number of custom conversions you can have per ad account is 100.

If you use the Ads Insights API to get metrics on custom conversions, be aware of these limitations:

-   Getting product ID breakdowns are not supported.
    
-   Getting unique action counts are not supported.
    

[](#)

## Leitura

Custom conversions on Facebook allows you to optimize and track actions without having to add anything to your Facebook pixel base code. They also allow you to optimize for and track actions that are different from the 9 standard events that come with the Facebook pixel.

List of custom conversions for an account:

```
curl -G \
-d 'fields=["pixel","rule","custom_event_type"]' \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/customconversions
```

### Flagged custom conversions

If a custom conversion is flagged, the `is_unavailable` field will be set to `true`.
```
{
  "is_unavailable": true,
  "id": "30141209892193360"
}
```

Attempting to modify the flagged custom conversion will result in an error:

```
{
  "error": {
    "message": "Your custom audience is currently blocked",
    "code": 2700000,
    "error_subcode": 2460004,
    "error_user_title": "Your custom conversion is currently blocked",
    "error_user_msg": "This custom conversion is blocked because it may contain information (e.g., health, financial) not allowed under Meta’s terms. Visit the events manager to appeal this decision, edit your custom conversion and remove prohibited  information, or choose a different custom conversion.",
  },
}
```
**To resolve flagged custom conversions**  
If any of your custom conversions are flagged for suggesting information that is not allowed under our terms, you may want to consider the following options:  
  
To resolve a flagged custom conversion in a new campaign creation:  

-   **Create new custom conversion**: Use a new custom conversion and make sure that it does not include information that is not allowed under our terms.
    

-   **Choose a different custom conversion**: Select a different existing custom conversion and make sure it does not include information that is not allowed under our terms
    

To resolve a flagged custom conversion in an existing campaign:  

-   **Duplicate your campaign and select an existing custom conversion**: If you have a running campaign that is flagged due to a flagged custom conversion, consider duplicating the campaign and selecting a different custom conversion that is not flagged before publishing the new duplicated campaign. **Note:** Once the campaign is published, you cannot remove or select a different custom conversion.
    

**Request a review**  
If you believe your custom conversion has been flagged in error and doesn't include non-permitted information, you can request a review via Ads Manager under the campaigns table, or in Events Manager under the custom conversions page.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

numeric string

ID of the custom conversion

`account_id`

string

Ad Account ID assoicated to this custom conversion

`business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

Business that owns the custom conversion

`creation_time`

datetime

Time at which the conversion was created

`custom_event_type`

enum {ADD\_PAYMENT\_INFO, ADD\_TO\_CART, ADD\_TO\_WISHLIST, COMPLETE\_REGISTRATION, CONTENT\_VIEW, INITIATED\_CHECKOUT, LEAD, PURCHASE, SEARCH, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, LISTING\_INTERACTION, FACEBOOK\_SELECTED, OTHER}

The type of the conversion event, e.g. PURCHASE

`data_sources`

list<ExternalEventSource>

Event sources of the custom conversion

`default_conversion_value`

integer

When conversion is URL based, the default conversion value associated to each conversion

`description`

string

Description of the custom conversion

`event_source_type`

enum

Event source type of the custom conversion, e.g. pixel, app, etc.

`first_fired_time`

datetime

Time at which the pixel was first fired

`is_archived`

bool

Whether this conversion is archived. Archived conversions are no longer tracked in the system

`is_unavailable`

bool

Whether this conversion is unavailable

`last_fired_time`

datetime

Time at which the pixel was last fired

`name`

string

Name of the custom conversion

`pixel`

[AdsPixel](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/)

The pixel that will send events

`retention_days`

unsigned int32

Retention period for advanced rule

`rule`

string

Rule of the custom conversion

### Bordas

Borda

Descrição

[`stats`](/docs/marketing-api/reference/custom-conversion/stats/)

Edge<CustomConversionStatsResult>

Stats data for this conversion

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

When you create a custom conversion, provide `rule` with these operators and data:

Name

Description

Operators

The type of filter.

`i_contains`

Contains substring (case insensitive)

`i_not_contains`

Does not contain substring (case insensitive)

`contains`

Contains substring (case sensitive)

`not_contains`

Does not contain substring (case sensitive)

`eq`

Equal to (case sensitive)

`neq`

Not equal to (case sensitive)

`lt`

Less than (numeric fields only)

`lte`

Less than or equal to (numeric fields only)

`gt`

Greater than (numeric fields only)

`gte`

Greater than or equal to (numeric fields only)

`regex_match`

Matches a regular expression (eg: `"example\.com.*purchase$"`). The full PCRE grammar is supported

Data

The data being filtered.

`url`

The full escaped URL of the site visited

`event`

The name of the pixel event fired from your website. Example: `Purchase`

### Examples

Defines a high-value `PURCHASE` when someone triggers the `Purchase` standard event and purchase `value` is greater than 100:

```
curl \
-F 'name=High value Purchase Custom Conversion' \
-F 'event_source_id=<FB_PIXEL_ID>' \
-F 'rule={"and":[{"event":{"eq": "Purchase"}},{"value":{"gt":100}}]}' \
-F 'custom_event_type=PURCHASE' \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/customconversions'
```

Define a custom event then build a custom conversion for it. Specify a `PURCHASE` conversion that to track when a user-defined, `item-sold` custom event occurs. Track when someone purchases an item in a certain color.

Step 1: Define `item-sold` custom event in Facebook pixel on your website:

```
fbq('trackCustom', 'item-sold', {
   color: 'black',
   value: 1.00,
   currency: 'USD'
});
```

Step 2: Provide a `PURCHASE` conversion for the `item-sold` custom event for a given `color` by specifying it as a custom parameter:

```
curl \
-F 'name=Item Sold Custom Conversion' \
-F 'event_source_id=<FB_PIXEL_ID>' \
-F 'rule={"and":[{"event":{"eq": "item-sold"}},{"color":{"i_contains":"black"}}]}' \
-F 'custom_event_type=PURCHASE' \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/customconversions'
```

You can make a POST request to `claim_custom_conversions` edge from the following paths:

-   [`/{business_id}/claim_custom_conversions`](/docs/marketing-api/reference/business/claim_custom_conversions/)

When posting to this edge, a [CustomConversion](/docs/marketing-api/reference/custom-conversion/) will be created.

### Parâmetros

Parâmetro

Descrição

`custom_conversion_id`

numeric string

Custom conversion ID the business claims.

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

You can make a POST request to `customconversions` edge from the following paths:

-   [`/act_{ad_account_id}/customconversions`](/docs/marketing-api/reference/ad-account/customconversions/)

When posting to this edge, a [CustomConversion](/docs/marketing-api/reference/custom-conversion/) will be created.

### Parâmetros

Parâmetro

Descrição

`action_source_type`

enum {app, chat, email, other, phone\_call, physical\_store, system\_generated, website, business\_messaging}

Action source type the custom conversion is created from.

`advanced_rule`

string

Advanced ruleset for the custom conversion being created allowing multiple sources.

`custom_event_type`

enum {ADD\_PAYMENT\_INFO, ADD\_TO\_CART, ADD\_TO\_WISHLIST, COMPLETE\_REGISTRATION, CONTENT\_VIEW, INITIATED\_CHECKOUT, LEAD, PURCHASE, SEARCH, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, LISTING\_INTERACTION, FACEBOOK\_SELECTED, OTHER}

The custom event type of the conversion being created.

`default_conversion_value`

float

Valor padrão: `0`

The default conversion value of the conversion being created.

`description`

string

The description of the conversion being created.

`event_source_id`

numeric string or integer

Event source ID, where event sources are a Pixel, offline event sets and so on. Aggregate custom conversion data from these sources.

`name`

string

The name of the conversion being created.

Obrigatório

`rule`

string

Only count an event as a custom conversion if it fulfills this rule.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`is_custom_event_type_predicted`: numeric string,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

[](#)

## Atualizando

You can update a [CustomConversion](/docs/marketing-api/reference/custom-conversion/) by making a POST request to [`/{custom_conversion_id}`](/docs/marketing-api/reference/custom-conversion/).

### Parâmetros

Parâmetro

Descrição

`default_conversion_value`

float

The default conversion value of the conversion being created

`description`

string

Description of the custom conversion

`name`

string

Name of the custom conversion

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

[](#)

## Excluindo

You can delete a [CustomConversion](/docs/marketing-api/reference/custom-conversion/) by making a DELETE request to [`/{custom_conversion_id}`](/docs/marketing-api/reference/custom-conversion/).

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

[](#)