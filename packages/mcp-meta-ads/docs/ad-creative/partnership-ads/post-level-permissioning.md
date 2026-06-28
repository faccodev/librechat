---
title: "Post-Level Permissioning - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/partnership-ads/post-level-permissioning"
scraped_at: "2026-02-01T14:13:29.320Z"
---

# Post-Level Permissioning

Branded content ads are now called partnership ads.

Post-Level Permissioning allows brands to add, remove and check creators who are on their approved list for tagging them in the paid partnership label on branded content posts. It also allows creators to give businesses permission to promote their organic branded content posts as partnership ads.

## Permissions

In order to use this API, you must have a Facebook User [access token](/docs/instagram-api/overview#authentication) with the following:

-   [Advanced Access](/docs/graph-api/overview/access-levels/#advanced-access) access level
-   [Permissions](/docs/pages/overview#permissions):
    -   `instagram_basic`
    -   `instagram_branded_content_brand` (for the `/branded_content_tag_approval` endpoint)
    -   `instagram_branded_content_creator` (for the `/branded_content_partner_promote` endpoint)

[](#)

## How it Works

The general flow for enabling post-level permissions is:

1.  Businesses can [see which creators are approved to tag them in the paid partnership label on branded content posts](#reading).
2.  Businesses can [add creator user IDs to the approved list](#updating).
3.  Businesses can [remove creator user IDs from the approved list](#deleting).
4.  Creators can [check which businesses they have given permission to promote a given organic post as a partnership ad](#business-partner-promotion-status).
5.  Creators can [give a business permission to promote the given organic post as a partnership ad](#allow-brand-partner-to-boost-setting).

[](#)

## Approve Creators

Business accounts have the option to restrict who can tag them in the paid partnership label on branded content posts. If restrictions are turned on, the business can allow users to tag them in branded content posts by adding them to their approved creator allowlist.

This endpoint allows business accounts to add, remove, and view the creators in their approved accounts list, if approval is required.

### Reading

#### Approval List

Queries the approval list for the existence of a set of creator account types and returns a list of approved user IDs.

##### Request

Access Token = BUSINESS\_ACCESS\_TOKEN

```
v24.0
```

##### Parameters

Name

Description

`user_ids`

**Required.**  
A comma-separated list of users IDs to check against the permission list. At most 100 IDs can be queried per request.

##### Response

This endpoint will return a list of approved creators, filtered by the account IDs provided.

```
{
 "data": [
  {
    "id": "<USER_ID>"
  }
 ]
}
```

### Updating

Adds users to the approval list and returns a Boolean.

#### Request

Access Token = BRAND\_ACCESS\_TOKEN

```
v24.0
```

#### Parameters

Name

Description

`user_ids`

**Required.**  
Users to add to the permission list.

#### Response

```
{
  "success": true 
  // false is returned if one or more IDs fail to update; in that case, no IDs will be added
}
```

### Deleting

Removes users from the approval list and returns a Boolean.

#### Request

Access Token = BUSINESS\_ACCESS\_TOKEN

```
v24.0
```

#### Parameters

Name

Description

`user_ids`

**Required.**  
Users to remove from permission list.

#### Response

```
{
  "success": true 
  // false is returned if one or more IDs fail to be deleted; in that case, no IDs will be deleted
}
```

[](#)

## Allow Brand Partner to Boost

In order for a business to promote a branded content post that they are tagged in with the "paid partnerships" tag as partnership ads, the creator must first give the business permission for individual posts.

### Business partner promotion status

This API call allows the creator to get the list of businesses that are approved to promote a given branded content post that they are tagged in.

#### Request

Access Token = CREATOR\_ACCESS\_TOKEN

```
v24.0
```

#### Response

```
{
  "approved": {comma-separated list of approved user IDs}
}
```

### Allow brand partner to boost setting

This API call allows the creator to turn on the **Allow brand partner to boost** setting outside of the Instagram app.

**Note:** Creators will create their post and tag the brand partner via the Instagram platform.

#### Request

Access Token = CREATOR\_ACCESS\_TOKEN

```
v24.0
```

#### Parameters

Name

Description

`permission`

**Required.**  
Set to `true` if permission is given to the tagged brand, or `false` if not.

#### Response

```
{
  "success": true 
  // false is returned on error; permission will not be granted
}
```

[](#)

## Learn More

-   [IG User](/docs/instagram-api/reference/ig-user)
-   [IG Media](/docs/instagram-api/reference/ig-media)
-   [Branded Content Policy](https://www.facebook.com/policies/brandedcontent)
-   [Ad Policy](https://www.facebook.com/policies/ads/)

[](#)