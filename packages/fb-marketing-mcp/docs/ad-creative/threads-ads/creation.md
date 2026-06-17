---
title: "Criação de anúncios do Threads - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/creation"
scraped_at: "2026-02-01T14:12:53.071Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/ad-creative/threads-ads/creation/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 30 de jan  
Atualização em Português (Brasil): 16 de jan

# Threads Ads Creation

Some updates to Threads Ads may not be available to all users yet.

With Marketing API you can create, measure, and optimize ads on Threads in the main feed. To create your ads:

-   [Step 1: Get a Threads account ID](#step-1)
-   [Step 2: Create an ad campaign](#step-2)
-   [Step 3: Create an ad set](#step-3) — Pick a `placement` that includes Threads. Adding Instagram `stream` is a prerequisite if you want to select Threads `threads_stream` as a placement.
-   [Step 4: Provide an ad creative](#step-4)
-   [Step 5: Schedule ad delivery](#step-5)

### Limitations

-   There is a 1000 character limit on captions for ads targeting Threads. If your ad is over this limit, the request to create an ad will succeed for Instagram, but it will not be delivered on Threads.
-   Threads images must be at least 500px in width.
-   There is a limit of 30 hashtags per ad.

## Step 1: Get a Threads account ID

You need to know your Threads account's ID before you start creating ads. Depending on your account's type, you have different ways of getting an account ID:

-   [Instagram-associated Threads account](/docs/marketing-api/ad-creative/threads-ads#instagram-associated-threads-accounts) — Set up a connection from the Threads app via the OAuth flow and by [getting the Threads account ID](/docs/marketing-api/ad-creative/threads-ads/#get-the-instagram-associated-threads-account-id). Save the returned ID to use in your ads.
-   [Instagram-backed Threads account](/docs/marketing-api/ad-creative/threads-ads#instagram-backed-threads-accounts) — [Set up the Threads account using the API](/docs/marketing-api/ad-creative/threads-ads#create-an-instagram-backed-threads-account), then [get the Threads account ID](/docs/marketing-api/ad-creative/threads-ads/#get-the-instagram-backed-threads-account-id). Save the returned ID to use in your ads.

[](#)

## Step 2: Create an ad campaign

Creating ad objects for Threads is the same as it is for Instagram and Facebook ads. To start, [create an ad campaign](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) and specify your objective.

Threads compatible objectives vary according to your chosen ad placement:

Ad Placement

Compatible Objectives

Ads in Threads Feed (`threads_stream`)

`OUTCOME_AWARENESS`, `OUTCOME_TRAFFIC`, `OUTCOME_ENGAGEMENT`, `OUTCOME_SALES`

[](#)

## Step 3: Create an ad set

[Create an ad set](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) with the desired:

-   [Optimization goal](/docs/marketing-api/bidding/overview#opt): Your goal options depend on the objective set at the campaign level. Check the [validation rules](/docs/marketing-api/reference/ad-campaign-group#objective-validation).
-   [Targeting options](/docs/marketing-api/audiences/reference): You can use all the standard targeting options for your campaigns, including the [native basic targeting options](/docs/marketing-api/audiences/reference), [custom audiences](/docs/marketing-api/custom-audience-targeting), and [lookalike audiences](/docs/marketing-api/lookalike-audience-targeting).
-   [Budget](/docs/marketing-api/bidding/overview/budgets)
-   [Billing event](/docs/marketing-api/bidding/overview/billing-events): The `billing_event` depends on which `optimization_goal` you choose. Check the [validation rules](/docs/marketing-api/bidding/overview#opt-goal-validation).
-   [Schedule ad delivery](/docs/marketing-api/bidding/overview/pacing-and-scheduling)

### Placement

To deliver ads to Threads, include both `instagram` and `threads` under `publisher_platforms` in your ad set. Then, use the Threads `threads_stream` placement; remember you must select the Instagram `stream` placement too. If you choose multiple platforms, Meta optimizes delivery based on your target audience on each platform with [placement optimization](/docs/marketing-api/audiences/reference/placement-targeting).

### Examples

#### Create an ad set with Threads as a placement

```
v24.0
```

#### Create an ad set with Threads `threads_stream` as a targeted placement

```
v24.0
```

[](#)

## Step 4: Provide an ad creative

For creatives to be used with a Threads placement and the required Instagram placement, you need to supply your [Instagram account ID](/docs/marketing-api/guides/instagramads/get-started#account-id) and your [Threads account ID](#step-1) and your Facebook Page ID.

When you [provide the ad creative](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative), we create an unpublished post. You can see the unpublished post from the Page when you query the promotable feed using the Page ID. **Your Page information does not appear anywhere on your Threads ad.**

If the Threads account is associated with an Instagram account in the Business Portfolio (i.e., matching usernames) or is an Instagram-backed Threads Account, that Instagram account needs to be used.

**Note:** Businesses with an Instagram-associated Threads account created before Jaunary 29, 2026, will have their Threads account automatically added to their Business Portfolio with the same user access and permissions managed from the Instagram account. Developers can continue to use the same Instagram-associated Threads account IDs as they were using prior to January 29, 2026. New Threads accounts created after January 29, 2026, will need to be manually added to the Business Portfolio and managed like other account types.

Threads ads support image, video, and carousel image ads creation (with the same steps as [Instagram ads creation](/docs/instagram/ads-api/reference/media-requirements)). See [Media requirements](#media-requirements) for more information.

When new media setups and ad formats become compatible with Threads, both existing and newly created campaigns using them will automatically leverage your Threads profile or Instagram account to deliver to `threads_stream` if that placement is included. You can review and update your ad placements at any time.

### Hashtags

There is a limit of 30 hashtags per ad.

### Media requirements

#### Captions

There is a 1000 character limit on captions for ads targeting Threads. If your ad is over this limit, the request to create an ad will succeed for Instagram, but it will not be delivered on Threads. 80 to 160 characters is recommended.

**Note:** Hashtags and URLs are not supported in the caption.

#### Image Requirements

##### Aspect Ratio

1.91:1 to 9:16 are supported. Images with a taller ratio than 4:5 will be cropped and vertically centered to 4:5. Images with a ratio of 1.91:1 to 4:5 will not be cropped or altered.

##### Size

Threads images must be at least 500px in width.

#### Video Requirements

##### Aspect Ratio

1.91:1 to 9:16 are supported. Videos with a taller ratio than 4:5 will be cropped and centered to 4:5. Images with a ratio of 1.91:1 to 4:5 will not be cropped or altered.

#### Carousel Requirements

##### Aspect Ratio for images

1.91:1 to 9:16 are supported. Images with a ratio outside of 1:1 will be center cropped to 1:1. Images with a ratio of 1:1 will not be cropped or altered.

[](#)

## Step 5: Schedule ad delivery

[Create your ad object](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad) to link your creative to your ad set.

### Ad preview

For Threads ads, you can get a preview of:

-   [Existing ads or creatives](/docs/instagram/ads-api/guides/get-ad-preview#existing)
-   [New ads, before adding a creative](/docs/instagram/ads-api/guides/get-ad-preview#before-creative)

[](#)