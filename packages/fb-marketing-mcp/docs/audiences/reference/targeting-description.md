---
title: "Descrição do direcionamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-description"
scraped_at: "2026-02-01T14:28:25.711Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/audiences/reference/targeting-description/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 7 de nov de 2025  
Atualização em Português (Brasil): 16 de jul de 2024

# Targeting Description

Get a human-readable descriptions for a set of targeting specs. To read targeting descriptions for specific [`ads`](/docs/reference/ads-api/adgroup/) make an `HTTP GET` to `https://graph.facebook.com/{AD_ID}/targetingsentencelines`.

## Targeting Description for Existing Ads

To get `targetingsentencelines` connection of an existing ad:

```
v24.0
```

The response:

```
{
    "id": "<AD_ID>/targetingsentencelines",
    "targetingsentencelines": [
    {
        "content": "Location - Living In:",
        "children": [
            "Japan",
            "United States"
        ]
    },
    {
        "content": "Age:",
        "children": [
            "20 - 24"
        ]
    },
    {
        "content": "Gender:",
        "children": [
            "Male"
        ]
    }]
}
```

Responses contain these fields:

Name

Description

`id`

type: string

ID of `targetingsentencelines`.

`targetingsentencelines`

type: array of JSON objects

Human-readable description of the targeting spec. Each object contains `content` or targeting type, and `children` or targeting spec. This field only takes [effective placements](/docs/marketing-api/audiences/reference/placement-targeting#effective_placement) into consideration.

[](#)

## Targeting Description for Ad Accounts

You can also get targeting descriptions a targeting spec with a `HTTP GET` for an ads account at `https://graph.facebook.com/{AD_ACCOUNT_ID}/targetingsentencelines`.

For example, to get targeting descriptions for people who live in the US or Japan and are males between the age of 20-24:

```
v24.0
```

Response:

```
{
    "params": {
        "genders": [1],
        "age_min": 20,
        "age_max": 24,
        "geo_locations": {
            "countries": [
                "US",
                "JP"
            ]
        }
    },
    "targetingsentencelines": [{
        "content": "Location - Living In:",
        "children": [
            "Japan",
            "United States"
        ]
    }, {
        "content": "Age:",
        "children": [
            "20 - 24"
        ]
    }, {
        "content": "Gender:",
        "children": [
            "Male"
        ]
    }]
}
```

Additional parameters include:

Name

Description

`targeting_spec`

type: JSON object

**Required.**

Get targeting description for this targeting specs.

`hide_targeting_spec_from_return`

type: bool

**Optional.**

Whether response has requested `targeting_spec` included. Default `false`.

Responses have these fields:

Name

Description

`targetingsentencelines`

type: array of JSON objects

The human-readable description of targeting spec. Each object has `content` or targeting type and `children` or targeting spec.

`params`

type: JSON object

The targeting spec you provided.

[](#)