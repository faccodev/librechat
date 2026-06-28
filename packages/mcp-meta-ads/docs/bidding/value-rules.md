---
title: "Regras de valor - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/value-rules"
scraped_at: "2026-02-01T13:55:03.524Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/bidding/value-rules/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 15 de dez de 2025  
Atualização em Português (Brasil): 10 de nov de 2025

# Value Rules

Value rules allow you to express value across audience, placement and conversion location criteria and consolidate campaigns to drive performance. When you use value rules, your campaigns can adjust delivery toward criteria and outcomes you value more.

Available criteria include age, gender, location, OS, device platform, and select placements and conversion locations.

With value rules, you can:

-   Create rules to tell us how much more certain audiences are worth to your business. Our system will optimize for outcomes based on these rules.
-   Maximize performance by focusing on the audiences that matter most.
-   Drive towards lower funnel goals such as lifetime value by prioritizing bidding in high lifetime value segments.
-   Apply rules for different audiences, placements and conversion locations within a single ad set, allowing you to consolidate multiple campaigns.

For example, if you know that men aged 25-44 have an average 60% higher lifetime value and women 25-44 have a 20% lower lifetime value relative to customers outside of these dimensions, you can use value rules to increase your bid by 60% for the male 25-44 age group and decrease your bid by 20% for the female 25-44 age group. People outside of these value rules will receive a non-adjusted bid.

When you create a value rule set, the order of your rules will prioritize which adjustments will take place in the ad auction. If you create rules with audience overlap, we'll only use the first applicable rule to adjust the bid. For example, rule 1 states you are willing to bid 20% more for women in California and rule 2 states you are willing to bid 10% more for women who use a particular mobile operating system. If a woman in California who uses that operating system is in your audience, then we will only apply Rule 1 to bid 20% more for her because it is the first rule in the order.

### Permissions

You will need the following permissions:

-   `ads_management`
-   `ads_read`

## When to use Value Rules, Audience Controls, and Audience Suggestions

Value Rules should be used when you want to identify higher or lower value audiences and are looking to pay accordingly.

**Note:** When you use value rules, you may see more conversions from your preferred audiences, but your overall cost per result may increase.

Goal

Use Audience Controls

Use Value Rules

Use Audience Suggestions

Must comply with regulations

YES

NO

NO

Willing to pay more for higher value audiences

NO

YES

NO

Guide Meta to reach audiences that are more likely to convert

NO

NO

YES

See [Use audience suggestions, audience controls and value rules to reach your preferred audience](https://www.facebook.com/business/help/2016171032241412?locale=en_US) for more information. Like with other campaigns, we suggest that when using value rules, keep targeting as broad as your business allows.

[](#)

## Create a Value Rule Set

To create a value rule set, you need to make a `POST` request to the `/act_{ad-account-id}/value_rule_set` endpoint. The request body for creating a value rule set should include the following parameters:

Name

Description

`name`

string

**Required.**  
A string that represents the name of the value rule set.

`rules`

list<object>

**Required.**  
An array of rules where each rule specifies a set of criteria (such as age or gender) and their corresponding bid adjustments. One rule set supports up to 10 rules.

**Note:** You can create up to 6 rule sets per ad account.

### The `rules` parameter

Name

Description

`name`

string

**Required.**  
A string that represents the name of the rule.

`adjust_sign`

string

**Required.**  
indicates if the adjustment is intended to increase or decrease the bid.

**Values:** `INCREASE`, `DECREASE`

`adjust_value`

integer

**Required.**  
A number to inform the percentage of the adjustment for the bid.

**Values**:

-   For `INCREASE`: between 1 and 1000
-   For `DECREASE`: between 1 and 90

`criteria`

list<object>

**Required.**  
An array of objects representing the audience criteria and its associated bid adjustment.

**Note:** You can create up to 10 rules per rule set.

### The `criteria` parameter

Name

Description

`criteria_type`

string

**Required.**  
Dimension intended for bid adjustment.

**Values:** `AGE`, `GENDER`, `OS_TYPE`, `DEVICE_PLATFORM`, `LOCATION`, `PLACEMENT`

`operator`

string

**Required.**  
Operator used when evaluating the criteria. Currently, the only supported operator is `CONTAINS`.

**Value:** `CONTAINS`

`criteria_values`

list<string>

**Required.**  
An array of strings that specifies the criteria value for the given `criteria_type`.

`criteria_value_types`

list<string>

**Required.**  
An array of strings that specifies the level of detail for the types of criteria being used. This allows for more precise targeting by defining the scope of the criteria.

**Note:** You can add up to 4 criteria per rule. Rule sets with >2 criteria will **not** be editable (read only) in Ads Manager UI, editing rule set is possible only via API.

### The `criteria_values` and `criteria_value_types` fields

The `criteria_values` and `criteria_value_types` arrays work together to define the values for a specific `criteria_type` or dimension used in the bid adjustment. Each value in the `criteria_values` array must have a corresponding type specified in the `criteria_value_types` array, with types listed in the same order as their respective values.

criteria\_type

criteria\_values

criteria\_value\_types

`AGE`

**1\. Predefined age range**  
“18-24”, “25-34”, "35-44", “45-55”, “55-64”, “65+”

**2\. Custom age range**  
Age ranges can be arbitrary (e.g., "18-26") or open-ended (e.g., "45+"). For example: \["18-26", "31-37", "48+"\].

**Important:** Using "65" as the upper limit of a range is not allowed; use “18+” instead of “18-65”.

**Note:** Rule sets using custom age ranges will **not** be editable (read only) in the Ads Manager UI, editing rule set is possible only via API.

`NONE`

`GENDER`

`MALE`, `FEMALE`

`NONE`

`OS_TYPE`

`ANDROID`, `IOS`

`NONE`

`DEVICE_PLATFORM`

`MOBILE`, `DESKTOP`

`NONE`

`LOCATION`

Multiple, dependent on `criteria_value_types`.

-   [`LOCATION_COUNTRY`](/docs/marketing-api/audiences/reference/targeting-search#countries)
-   [`LOCATION_REGION`](/docs/marketing-api/audiences/reference/targeting-search#regions)
-   [`LOCATION_CITY`](/docs/marketing-api/audiences/reference/targeting-search#cities)
-   [`LOCATION_DMA`](/docs/marketing-api/audiences/reference/targeting-search#geomarket-codes)

`LOCATION_COUNTRY`, `LOCATION_REGION`, `LOCATION_CITY`, `LOCATION_DMA`

`PLACEMENT`

`FB_FEED`, `FB_STORIES`, `FB_REELS`, `FB_MARKETPLACE`, `FB_SEARCH`, `FB_VIDEO`, `IG_FEED`, `IG_STORIES`, `IG_REELS`, `IG_EXPLORE`, `AUDIENCE_NETWORK`

**Note:** Rule sets using any of `FB_MARKETPLACE`, `FB_SEARCH`, `FB_VIDEO`, `IG_EXPLORE` placements will **not** be editable (read only) in the Ads Manager UI, editing rule set is possible only via API.

`NONE`

`OMNI_CHANNEL`

`APP`, `INSTANT_FORM`, `PHONE_CALL`, `WEBSITE`

`NONE`

For example, if you want to apply a bid adjustment to the age ranges `45-55` and `55-64`, here is what the criteria object would look like:

```
{
  "criteria_type": "AGE",
  "operator": "CONTAINS",
  "criteria_values": [
    "45-55", 
    "55-64"
  ],
  "criteria_value_types": [
    "NONE",
    "NONE"
  ]
}
```

Alternatively, if you want to apply a bid adjustment to the country of Brazil and the region of Alberta, Canada, here is what the criteria object would look like:

```
{
  "criteria_type": "LOCATION",
  "operator": "CONTAINS",
  "criteria_values": [
    "BR", 
    "527"
  ],
  "criteria_value_types": [
    "LOCATION_COUNTRY", 
    "LOCATION_REGION"
  ]
}
```

### Example request

```
v24.0
```

[](#)

## Retrieve a Value Rule Set

To read a value rule set for a given ad account, make a `GET` request to the `/act_{ad-account-id}/value_rule_set` endpoint and list any existing value rule set in this ad account. Alternatively, you can make a `GET` request to the `/{value-rule-set-id}` endpoint.

### Example request

```
v24.0
```

### Example response

```
{
  "data": [
    {
      "id": "1110000000003",
      "name": "My Value Rule Set",
      "rules": {
        "data": [
          {
            "name": "High age and gender",
            "adjust_sign": "INCREASE",
            "adjust_value": 20,
            "criterias": {
              "data": [
                {
                  "criteria_type": "AGE",
                  "operator": "CONTAINS",
                  "criteria_values": [
                    "18-24"
                  ],
                  "criteria_value_types": [
                    "NONE"
                  ],
                  "id": "1110000000000"
                },
                {
                  "criteria_type": "GENDER",
                  "operator": "CONTAINS",
                  "criteria_values": [
                    "male"
                  ],
                  "criteria_value_types": [
                    "NONE"
                  ],
                  "id": "1110000000001"
                }
              ]
            },
            "id": "1110000000002"
          },
        ]
      }
    }
  ]
}
```

[](#)

## Update a Value Rule Set

To update a value rule set, make a `POST` request to the `/{value-rule-set-id}` endpoint. The request body should include the ID of all existing objects you intend to update and added fields for the value rule set.

### Value rule set update workflow

The recommended workflow for updating a value rule set would be to first read the existing fields and IDs by performing a `GET` request, update the fields accordingly, and make a `POST` request with the updated payload.

#### Step 1: Retrieve the value rule set

Make a `GET` request to get all of the fields and IDs from the value rule set.

```
v24.0
```

The resulting response will be similar to this:

```
{
  "name": "Value Rule Set",
  "rules": {
    "data": [
      {
        "name": "High age",
        "adjust_sign": "INCREASE",
        "adjust_value": 20,
        "status": "ACTIVE",
        "criterias": {
          "data": [
            {
              "criteria_type": "AGE",
              "operator": "CONTAINS",
              "criteria_values": [
                "18-24"
              ],
              "criteria_value_types": [
                "NONE"
              ],
              "id": "1000000000000089"
            }
          ]
        },
        "id": "1000000000000099"
      }
    ]
  },
  "id": "1000000000000056",
}
```

#### Step 2: Update the value rule set

#### Example A:

If you want to include the age range `65+` in the existing criteria and add a gender criteria for `FEMALE`, the `POST` request for updating this value rule set should look like this:

```
v24.0
```

#### Example B:

If you want to remove the existing criteria for age, the `POST` request for updating this value rule set should look like this:

```
v24.0
```

#### Example C:

If you want to update the name of the rule set, the `POST` request for updating this value rule set should look like this:

```
v24.0
```

[](#)

## Deleting a Value Rule Set

To delete a value rule set, make a `POST` request to the `/{value-rule-set-id}/delete_rule_set` endpoint with an empty request body.

### Example request

With the ID of the rule set you want to delete, make a request like the following:

```
v24.0
```

### Example response if `VALUE_RULE_SET_ID` is a valid ID

```
{
  "success": true
}
```

### Example response if `VALUE_RULE_SET_ID` is an invalid ID

```
{
  "error": {
    "message": "Unsupported post request. Object with ID 'redacted' does not exist, cannot be loaded due to missing permissions, or does not support this operation. Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
    "type": "GraphMethodException",
    "code": 100,
    "error_subcode": 33,
    "fbtrace_id": "fbtrace_id"
  }
}
```

[](#)

## Creating an Ad Set with a Value Rule Set

To leverage a value rule set in an ad set, add the `value_rule_set_id` to the ad set creation request. To learn more about other ad set fields, see [Ad Set](/docs/marketing-api/reference/ad-campaign).

### Example request

```
v24.0
```

[](#)

## Attaching a Value Rule Set to an Existing Ad Set

To attach a value rule set to an existing ad set, make a `POST` request to the `/{ad_set_id}` endpoint. Within the request body, set `value_rules_applied` to `true` and the `value_rule_set_id` to the ID of an existing value rule set.

### Example request

```
v24.0
```

**Note:** Including `value_rules_applied` set to `true` is optional when adding a value rule set to ad sets.

[](#)

## Detaching a Value Rule Set from an Existing Ad Set

To remove the value rule set from an existing ad set, make a `POST` request to the `/{ad_set_id}` endpoint, setting the `value_rules_applied` field to `false` and omitting the `value_rule_set_id` field from the request body.

### Example request

```
v24.0
```

**Note:** If you include a valid `value_rule_set_id` field in the `POST` request, even with `value_rules_applied` set to `false`, the specified rule set will be attached to the campaign. To detach a value rule set, only include the `value_rules_applied` field set to `false`.

[](#)

## Replacing the Value Rule Set in an Existing Ad Set

To replace the value rule set in an existing ad set, make a `POST` request to the `/{ad_set_id}` endpoint and provide the new `value_rule_set_id` in the request body. This will overwrite the previous value rule set associated with the ad set.

### Example request

```
v24.0
```

**Note:** Including `value_rules_applied` set to `true` is optional when adding a value rule set to the Ad Set.

[](#)

## Eligible Ad Set Configurations for Value Rule Sets

A value rule set can be applied to all ad sets using the `LOWEST_COST_WITHOUT_CAP` bid strategy (also known as auto-bid) and not having `VALUE` as the optimization goal, with the exception of following configurations:

### 1\. Campaign Objective: `OUTCOME_SALES` with web and in-store conversion locations

```
{
  "optimization_goal": "OFFSITE_CONVERSIONS",
  "promoted_object": {
    "omnichannel_object": {
      "offline": [
        {
          "custom_event_type": "PURCHASE",
          "offline_conversion_data_set_id": "offline_conversion_data_set_id"
        }
      ],
      "pixel": [
        {
          "custom_event_type": "PURCHASE",
          "pixel_id": "pixel_id"
        }
      ]
    }
  }
}
```

### 2\. Campaign Objective: `OUTCOME_LEADS` with web and call conversion locations

```
{
  "optimization_goal": "OFFSITE_CONVERSIONS",
  "optimization_sub_event": "NONE",
  "promoted_object": {
    "pixel_id": "pixel_id",
    "custom_event_type": "LEAD"
  }
}
```

[](#)