---
title: "Account-Level Permissioning - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/partnership-ads/account-level-permissioning"
scraped_at: "2026-02-01T14:13:34.787Z"
---

# Account-Level Permissioning

Branded content ads are now called partnership ads.

The Account-Level Permissioning API allows brands to request partnership ad permission from creators and validate the status of these requests. With account-level permissions, advertisers can promote the creator's content that tags them in branded content (via the paid partnership label) or other non-branded content (@mentions, people tags, product tags, or Instagram Collab posts), as well as create new partnership ads without an existing organic post, without assigning permissions at the post-level.

1.  Request Partnership Ad Permissions: Allows third-party platforms to request account-level partnership ad permissions from creators on behalf of brands.
2.  View Partnership Ad Permissions: Allows third-party platforms to list existing partnership ad permissions for a brand.

When a creator accepts an advertiser's account-level permission request in the Instagram app, advertisers can:

-   Create partnership ads from the creator's handle without a pre-existing post.
-   Create partnership ads from any of the creator's existing posts that tag the advertiser (**Note:** the advertiser must be tagged using the paid partnership label, @mentions﹡, people tags﹡, product tags﹡, or Instagram Collabs﹡).
-   Include or exclude the creator's audience in their partnership ad campaign.

Creators can:

-   Tag the advertiser in the paid partnership label when making branded content posts.

﹡ Instagram only

## Send Partnership Ad Permission Request to Creator

Apps can request partnership ad permissions from creators on behalf of brands.

```
POST /<BRAND_IG_ID>/branded_content_ad_permissions
```

### Inputs

-   `BRAND_IG_ID` — Instagram user ID of the brand
-   `CREATOR_IG_ID` — Instagram user ID of the creator
-   `CREATOR_IG_USERNAME` — Instagram username of the creator
-   `ACCESS_TOKEN` — User access token

### Permissions

-   `instagram_branded_content_ads_brand` scoped on `BRAND_IG_ID`
-   `instagram_basic`
-   `business_management`

The `BRAND_IG_ID` must be owned or shared with the business. You must have at least advertiser permissions for the `BRAND_IG_ID`.

### Request

You can either request the permission using the `CREATOR_IG_ID` or `CREATOR_IG_USERNAME`.

```
v24.0
```

### Response

```
{
  "id": "<id_of_permission>"
}
```

[](#)

## View Partnership Ad Permission for a Brand

Apps can list existing partnership ad permissions (including pending) for a brand.

```
GET /<BRAND_IG_ID>/branded_content_ad_permissions
```

### Inputs

-   `BRAND_IG_ID` — Instagram user ID of the brand
-   `ACCESS_TOKEN` — User access token, will have the brand data

### Permissions

-   `instagram_branded_content_ads_brand` scoped on `BRAND_IG_ID`
-   `business_management`

### Request

```
v24.0
```

### Response

```
{
  "data": [
    {
      "creator_username": "jaspersmarket",
      "creator_id": "123",
     "creator_fb_page": "123",
			"brand_ig_user": {
        "id": "1234"
      }
      "permission_status": "APPROVED", // Creator approval status: REVOKED, PENDING, etc.
      "id": "<ID_OF_PERMISSION>",
    }
  ],
  "paging": {
    "cursors": {
      "before": "MTM4OTY1MDkwNzkyMTE4NQ==",
      "after": "MTAyMzMxNzA5NzY5MjU4NA=="
    }
  }
```

[](#)

## Revoking a Permission

Apps can revoke partnership ad permissions from creators on behalf of brands.

```
POST /<BRAND_IG_ID>/branded_content_ad_permissions
```

### Inputs

-   `BRAND_IG_ID` — Instagram user ID of the brand
-   `CREATOR_IG_ID` — Instagram user ID of the creator
-   `ACCESS_TOKEN` — User access token

### Permissions

-   `instagram_branded_content_ads_brand` scoped on `BRAND_IG_ID`
-   `Business_management`

The `BRAND_IG_ID` must be owned or shared with the business. You must have at least advertiser permissions for the `BRAND_IG_ID`.

### Request

```
v24.0
```

### Response

```
{
  "id": "<id_of_permission>"
}
```

[](#)