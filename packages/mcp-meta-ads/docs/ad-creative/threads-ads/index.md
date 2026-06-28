---
title: "Anúncios no Threads - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/"
scraped_at: "2026-02-01T14:13:02.436Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/ad-creative/threads-ads/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 30 de jan  
Atualização em Português (Brasil): 5 de jan

# Threads Ads

Some updates to Threads Ads may not be available to all users yet.

To run ads on Threads, you need a Threads account ID. You have two options for obtaining one:

-   [Instagram-associated Threads account](#instagram-associated-threads-accounts): A Threads account has an associated Instagram account with a matching username in the same Business Portfolio.  
    -   **Note:** Businesses with an Instagram-associated Threads account created before January 29, 2026, will have their Threads account automatically added to their Business Portfolio with the same user access and permissions managed from the Instagram account. Developers can continue to use the same Instagram-associated Threads account IDs as they were using prior to January 29, 2026. New Threads accounts created after January 29, 2026, will need to be manually added to the Business Portfolio and managed like other account types.
-   [Instagram-backed Threads account](#instagram-backed-threads-accounts): An Instagram account runs ads on behalf of a Threads account created for that purpose.

Make sure your Instagram account has the proper setup for [Instagram ads](/docs/instagram/ads-api/guides/pages-ig-account).

### Limitations

-   You cannot run ads on Threads without an Instagram-associated or Instagram-backed Threads account, and you cannot run ads on Threads if the associated Instagram account cannot run ads on Instagram.
-   You need to have at least an Advertiser role on the [Page that is linked to your Instagram account](/docs/instagram/ads-api/guides/pages-ig-account#via_page); Manager or Content Creator roles also work. Or you need to have the Instagram account [connected to a business account](/docs/instagram/ads-api/guides/ig-accounts-with-business-manager#claim_account) where you have the appropriate roles.
-   An Instagram account can have a link to only one Threads account ([Instagram-associated Threads account](#instagram-associated-threads-accounts)) in the Business Portfolio, as well as only one [Instagram-backed Threads account](#instagram-backed-threads-accounts). Verify whether a specific Instagram account has an [Instagram-associated Threads account](#get-the-instagram-associated-threads-account-id) or an [Instagram-backed Threads account](#get-the-instagram-backed-threads-account-id) before attempting to create a new one. If an account of the type you want to use already exists, use that one.
-   We are keeping the volume of ads in Threads intentionally low as we test and learn, therefore expect that delivery to Threads will be low. You will see this reflected in your placement breakdown reporting if your campaign delivers on Threads.
-   Threads ads creation only supports images, videos and carousel as the media format.
-   Ads cannot be created from an existing Threads post.

## Instagram-associated Threads accounts

### Permissions

To make API calls with an Instagram-associated Threads account you need a user access token with the following permissions:

-   `instagram_basic`
-   `threads_business_basic`
-   `pages_read_engagement`

If the app user was granted a role via the Business Manager on the Page connected to your app user's Instagram professional account, your app will also need one of:

-   `ads_management`
-   `ads_read`

**Note:** Anyone with access to create Instagram ads from the Instagram account can create Threads ads from the Instagram-associated Threads account.

### Before you begin

You need the following:

-   A business with the proper setup for [Instagram ads advertiser identities](/docs/instagram/ads-api/guides/pages-ig-account).
-   An Instagram account with a profile image that is not a [Private Account](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F138925576505882&h=AT2H-33GZnbGBPeq8kFaqrhCuMnVq5HRAwFIB0aIZjPF0k_ZOVc01hwS7YPr-tt0Iox-WCGR1u4V4GZTD2asHfaYiXFvO6B-RHZWe6S3bFzcHfrZ9ljNYhHeANl8m7kvKJWt9JOpH-rvKtDTcuHSsAHT9f4vHzUIxiJuwxlwJQ8) and has the appropriate advertiser permissions (See [How do I connect my Facebook Page and Instagram account?](https://www.facebook.com/help/1148909221857370)).
-   A Threads account associated with an Instagram account through a matching username in the same Business Portfolio. You can set this up by following the [Threads Business Portfolio Instructions](https://www.facebook.com/business/help/1888797071720635). Businesses with an Instagram-associated Threads account created before January 29, 2026, will have their Threads account automatically added to their Business Portfolio with the same user access and permissions managed from the Instagram account. New Threads accounts created after January 29, 2026, will need to be manually added to the Business Portfolio and managed like other account types.

### Get the Instagram-associated Threads account ID

Once you connect an Threads account to a valid Instagram account, you can call the [`/<IG_USER_ID>/connected_threads_user` endpoint](/docs/instagram-platform/instagram-graph-api/reference/ig-user/connected_threads_user) to get the Threads account ID.

#### Example request

```
v24.0
```

The result should be a Threads account object containing only the `threads_user_id`. Save this `threads_user_id` to use in your ads.

[](#)

## Instagram-backed Threads accounts

If you don't have a Threads profile, you can still create and deliver ads in Threads using an Instagram-backed Threads account.

These accounts are created with the API and function as if you are running ads _for_ a Threads account, however a mock Threads account is created specifically to run those ads.

You cannot log into Threads accounts created this way to manage posts.

### Create an Instagram-backed Threads account

You can create an Instagram-backed Threads account by sending a `POST` request to the [`/<IG_USER_ID>/instagram_backed_threads_user` endpoint](/docs/instagram-platform/instagram-graph-api/reference/ig-user#edges).

#### Example request

```
v24.0
```

This returns a Threads account ID on success. If an Instagram account already has a Instagram-backed Threads account, the call returns the existing Instagram-backed Threads account ID. Save the returned ID to run your ads.

### Get the Instagram-backed Threads account ID

To see if an Instagram account has an Instagram-backed Threads account, send a `GET` request to the `/<IG_USER_ID>/instagram_backed_threads_user` endpoint.

#### Example request

```
v24.0
```

This returns a Threads account object, if there is one. The object includes a `threads_user_id` that can be used to run Threads ads. If there is no Instagram-backed Threads account already set up, the API returns an empty response.

[](#)

## Ad Creatives with Threads Accounts

### Using Instagram-associated Threads accounts in ads

You can use any ad account, either owned by an individual or by a business, as long as you have access, to create ads for Instagram-associated Threads accounts.

When creating an ad creative, you should provide the `threads_user_id` and the `instagram_user_id` . The `instagram_user_id` of your ad creative must be for the Instagram account associated with this Threads account and with the matching username in your Business Portfolio. Businesses with an Instagram-associated Threads account created before January 29, 2026, will have their Threads account automatically added to their Business Portfolio with the same user access and permissions managed from the Instagram account. Developers can continue to use the same Instagram-associated Threads account IDs as they were using prior to January 29, 2026. New Threads accounts created after January 29, 2026, will need to be manually added to the Business Portfolio and managed like other account types.

### Using Instagram-backed Threads accounts in ads

You do not need to assign ad accounts to the Instagram-backed Threads account. When you provide an ad creative using a Instagram-backed Threads account, you can use any ad accounts that you have access to.

Once an Instagram-backed Threads account is created, you can use its ID as the `threads_user_id` in your ad creative, as you do with other types of Instagram accounts. The `instagram_user_id` of your ad creative must be for the Instagram account associated with this Instagram-backed Threads account.

### Examples

While the `instagram_user_id` must be included in the `object_story_spec` field, the `threads_user_id` can be included either in the `object_story_spec` field or on a higher level of the API call.

#### Included in the `object_story_spec` field

```
v24.0
```

#### Included at a higher level

```
v24.0
```

[](#)

## Next Steps

-   [Threads Ads Creation](/docs/marketing-api/ad-creative/threads-ads/creation)
-   [Threads Carousel Ads](/docs/marketing-api/ad-creative/threads-ads/creation/carousel-ads)
-   [Threads Ads Insights](/docs/marketing-api/ad-creative/threads-ads/insights)

[](#)