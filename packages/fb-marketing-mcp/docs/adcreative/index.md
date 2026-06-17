---
title: "Graph API Referência v24.0: Ad Creative"
source: "https://developers.facebook.com/docs/marketing-api/adcreative/"
scraped_at: "2026-02-01T14:11:52.281Z"
---

Versão Graph API

[v24.0](#)

# Ad Creative

[](#)

Format which provides layout and contains content for the ad. To see available ad creatives, visit [Ads Guide](https://www.facebook.com/business/ads-guide). The guide also contains information on size requirements for each ad unit. See also [Facebook for Business](https://www.facebook.com/business/overview) and [Inline page post creation blog post](/ads/blog/post/2014/08/28/creative-page-post-api).

### Ads About Social Issues, Elections, and Politics

Advertisers running ads about social issues, elections, and politics need to specify [`special_ad_categories`](/docs/marketing-api/audiences/special-ad-category) while creating an ad campaign. In addition, businesses still have to set `authorization_category` to flag at the ad creative level. [Learn more about the requirements.](/docs/marketing-api/audiences/special-ad-category/#issues-elections-politics)

### Examples

For example, get information about an ad creative, such as the ID of the newly created unpublished page post:

```
v24.0
```

Create a link ad:

```
v24.0
```

You can replace `picture` with `image_hash` to specify an image from your ad account's image library. You can also specify image cropping with `image_crops` in `link_data`. See [Image Crop, Reference](/docs/reference/ads-api/image-crops/).

To create a political ad creative, use the field `authorization_category` with value `POLITICAL`. For example:

```
v24.0
```

Beginning January 9, 2024, to create an issue, electoral, or political ad creative that uses media that is digitally created or altered, use the `authorization_category` field with the `POLITICAL_WITH_DIGITALLY_CREATED_MEDIA` value. For example:

```
v24.0
```

For guidelines on Facebook ads see [Ad Guidelines](https://www.facebook.com/ad_guidelines.php).

## Related Resources

-   [App Ads](/docs/marketing-api/mobile-app-ads)
    
-   [Video & Carousel Ads](/docs/marketing-api/guides/videoads)
    
-   [Advantage+ Catalog Ads](/docs/marketing-api/advantage-catalog-ads)
    
-   [Instagram Ads](/docs/marketing-api/guides/instagramads)
    
-   [Ads that Click to WhatsApp](/docs/marketing-api/ad-creative/messaging-ads/click-to-whatsapp)
    
-   [Lead Ads](/docs/marketing-api/guides/lead-ads)
    

## Limits

Only returns 50,000 ad creatives, pagination past this is unavailable.

### Fields-Level Limits

Limit

Value

Maximum ad title length

25 characters, recommended

Minimum ad title length

1 character

Maximum ad body length

90 characters, recommended

Minimum ad body length

1 character

Maximum length of a URL

1000 characters

Maximum length of an individual word in title or body

30 characters, recommended

### Title and Body Limits

-   Should be between minimum and maximum title and body lengths.
    
-   Cannot start with punctuation `\ / ! . ? - * ( ) , ; :`
    
-   Cannot have consecutive punctuation except of three full-stops `...`
    
-   Words no longer than 30 characters
    
-   Only three 1-character words allowed
    

The following characters are not allowed:

-   IPA Symbols. Except: &#601;, &#602;, &#603;, &#604;, &#605;, &#606;, &#607;
    
-   Diacritical Marks. Precomposed version of a character + diacritical mark are allowed. Standalone diacritical marks are not allowed.
    
-   Superscript and subscript characters except &#8482; and &#8480;
    
-   These characters `^~_={}[]|<>`
    

### Exceptions

-   **Link Ads** cannot use special characters
    
-   **Page Posts Ads** allow special characters such as `★`
    

### Placement

See [Placement](/docs/marketing-api/creative/#placements) for restrictions on placement of your ad based on creative.

[](#)

## Leitura

An ad creative object is an instance of a specific creative which is being used to define the `creative` field of one or more [ads](/docs/marketing-api/adgroup/)

### Read Thumbnail

Request the thumbnail URL and dimensions:

```
v24.0
```

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=GET&path=%3CCREATIVE_ID%3E%2F%3Ffields%3Dasset_feed_spec&version=v24.0)

```
GET /v24.0/<CREATIVE_ID>/?fields=asset_feed_spec HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/<CREATIVE_ID>/?fields=asset_feed_spec',
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
    "/<CREATIVE_ID>/",
    {
        "fields": "asset_feed_spec"
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
params.putString("fields", "asset_feed_spec");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<CREATIVE_ID>/",
    params,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"fields": @"asset_feed_spec",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<CREATIVE_ID>/"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X GET -G \
  -d 'fields="asset_feed_spec"' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<CREATIVE_ID>/
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`thumbnail_height`

int64

Valor padrão: `64`

Rendered height of thumbnails provided in thumbnail\_url, in pixels

`thumbnail_width`

int64

Valor padrão: `64`

Rendered width of thumbnails accessible in thumbnail\_url, in pixels

### Campos

Campo

Descrição

`id`

numeric string

Unique ID for an ad creative, numeric string.

`account_id`

numeric string

Ad account ID for the account this ad creative belongs to.

`actor_id`

numeric string

The actor ID (Page ID or User ID) of this creative

`ad_disclaimer_spec`

[AdCreativeAdDisclaimer](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-ad-disclaimer/)

Ad disclaimer data on creative for additional information on ads.

`adlabels`

[list<AdLabel>](https://developers.facebook.com/docs/marketing-api/reference/ad-label/)

[Ad Labels](/docs/marketing-api/reference/ad-label) associated with this creative. Used to group it with related ad objects.

`applink_treatment`

enum

Used for [Dynamic Ads](/docs/marketing-api/dynamic-product-ads/ads-management). Specify what action should occur if a person clicks a link in the ad, but the business' app is not installed on their device. For example, open a webpage displaying the product, or open the app in an app store on the person's mobile device.

`asset_feed_spec`

[AdAssetFeedSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-asset-feed-spec/)

Used for [Dynamic Creative](/docs/marketing-api/dynamic-creative/dynamic-creative-optimization) to automatically experiment and deliver different variations of an ad's creative. Specifies an asset feed with multiple images, text and other assets used to generate variations of an ad. Formatted as a JSON string.

`authorization_category`

enum

Specifies whether ad was configured to be labeled as a political ad or not. See [Facebook Advertising Policies](https://www.facebook.com/policies/ads). This field cannot be used for [Dynamic Ads](https://developers.facebook.com/docs/marketing-api/dynamic-ad).

`body`

string

The body of the ad. Not supported for video post creatives

`branded_content`

[AdCreativeBrandedContentAds](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-branded-content-ads/)

branded\_content

`branded_content_sponsor_page_id`

numeric string

ID for page representing business which runs Branded Content ads. See [Creating Branded Content Ads](/docs/marketing-api/guides/branded-content).

`bundle_folder_id`

numeric string

The [Dynamic Ad's](/docs/marketing-api/dynamic-product-ads) bundle folder ID

`call_to_action`

[AdCreativeLinkDataCallToAction](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-call-to-action/)

Call to action for an ad created from existing Instagram post

`call_to_action_type`

enum {OPEN\_LINK, LIKE\_PAGE, SHOP\_NOW, PLAY\_GAME, INSTALL\_APP, USE\_APP, CALL, CALL\_ME, VIDEO\_CALL, INSTALL\_MOBILE\_APP, USE\_MOBILE\_APP, MOBILE\_DOWNLOAD, BOOK\_TRAVEL, LISTEN\_MUSIC, WATCH\_VIDEO, LEARN\_MORE, SIGN\_UP, DOWNLOAD, WATCH\_MORE, NO\_BUTTON, VISIT\_PAGES\_FEED, CALL\_NOW, APPLY\_NOW, CONTACT, BUY\_NOW, GET\_OFFER, GET\_OFFER\_VIEW, BUY\_TICKETS, UPDATE\_APP, GET\_DIRECTIONS, BUY, SEND\_UPDATES, MESSAGE\_PAGE, DONATE, SUBSCRIBE, SAY\_THANKS, SELL\_NOW, SHARE, DONATE\_NOW, GET\_QUOTE, CONTACT\_US, ORDER\_NOW, START\_ORDER, ADD\_TO\_CART, VIEW\_CART, VIEW\_IN\_CART, VIDEO\_ANNOTATION, RECORD\_NOW, INQUIRE\_NOW, CONFIRM, REFER\_FRIENDS, REQUEST\_TIME, GET\_SHOWTIMES, LISTEN\_NOW, TRY\_DEMO, WOODHENGE\_SUPPORT, SOTTO\_SUBSCRIBE, FOLLOW\_USER, RAISE\_MONEY, SEE\_SHOP, GET\_DETAILS, FIND\_OUT\_MORE, VISIT\_WEBSITE, BROWSE\_SHOP, EVENT\_RSVP, WHATSAPP\_MESSAGE, FOLLOW\_NEWS\_STORYLINE, SEE\_MORE, BOOK\_NOW, FIND\_A\_GROUP, FIND\_YOUR\_GROUPS, PAY\_TO\_ACCESS, PURCHASE\_GIFT\_CARDS, FOLLOW\_PAGE, SEND\_A\_GIFT, SWIPE\_UP\_SHOP, SWIPE\_UP\_PRODUCT, SEND\_GIFT\_MONEY, PLAY\_GAME\_ON\_FACEBOOK, GET\_STARTED, OPEN\_INSTANT\_APP, AUDIO\_CALL, GET\_PROMOTIONS, JOIN\_CHANNEL, MAKE\_AN\_APPOINTMENT, ASK\_ABOUT\_SERVICES, BOOK\_A\_CONSULTATION, GET\_A\_QUOTE, BUY\_VIA\_MESSAGE, ASK\_FOR\_MORE\_INFO, CHAT\_WITH\_US, VIEW\_PRODUCT, VIEW\_CHANNEL, GET\_IN\_TOUCH, WATCH\_LIVE\_VIDEO, SHOP\_WITH\_AI, TRY\_ON\_WITH\_AI}

Type of call to action button in your ad. This determines the button text and header text for your ad. See [Ads Guide](https://www.facebook.com/business/ads-guide/) for [campaign objectives](/docs/marketing-api/adcampaign/) and permitted call to action types.

`categorization_criteria`

enum

The [Dynamic Category Ad's](/docs/marketing-api/dynamic-product-ads) categorization field, e.g. brand

`category_media_source`

enum

The [Dynamic Ad's](/docs/marketing-api/dynamic-product-ads) rendering mode for category ads

`collaborative_ads_lsb_image_bank_id`

numeric string

Used for CPAS local delivery image bank

`contextual_multi_ads`

AdCreativeContextualMultiAds

contextual\_multi\_ads

`creative_sourcing_spec`

[AdCreativeSourcingSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-sourcing-spec/)

creative\_sourcing\_spec

`degrees_of_freedom_spec`

[AdCreativeDegreesOfFreedomSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-degrees-of-freedom-spec/)

Specifies the types of transformations that are enabled for the given creative

`destination_set_id`

numeric string

The ID of the Product Set for a Destination Catalog that will be used to link with Travel Catalogs

`dynamic_ad_voice`

string

Used for [Store Traffic Objective inside Dynamic Ads](/docs/marketing-api/guides/dynamic-ad/store-visits). Allows you to control the voice of your ad. If set to `DYNAMIC`, page name and profile picture in your ad post come from the nearest page location. If set to `STORY_OWNER`, page name and profile picture in your ad post come from the main page location.

`effective_authorization_category`

enum

Specifies whether ad is a political ad or not. See [Facebook Advertising Policies](https://www.facebook.com/policies/ads). This field cannot be used for [Dynamic Ads](https://developers.facebook.com/docs/marketing-api/dynamic-ad).

This value can be different than the authorization\_category value in case our systems have identified the ad as political even though it was not configured to be labeled as such.

`effective_instagram_media_id`

numeric string

The ID of an Instagram post to use in an ad

`effective_object_story_id`

token with structure: Post ID

The ID of a page post to use in an ad, regardless of whether it's an organic or unpublished page post

`enable_direct_install`

bool

Whether Direct Install should be enabled on supported devices

`enable_launch_instant_app`

bool

Whether Instant App should be enabled on supported devices

`facebook_branded_content`

AdCreativeFacebookBrandedContent

Stores fields for Facebook Branded Content

`image_crops`

[AdsImageCrops](https://developers.facebook.com/docs/marketing-api/reference/ads-image-crops/)

A JSON object defining crop dimensions for the image specified. See [image crop reference](/docs/marketing-api/image-crops/) for more details

`image_hash`

string

Image hash for ad creative. If provided, do not add `image_url`. See [image library](/docs/marketing-api/adimage/) for more details.

`image_url`

string

A URL for the image for this creative. We save the image at this URL to the ad account's image library. If provided, do not include `image_hash`.

`instagram_permalink_url`

string

URL for a post on Instagram you want to run as an ad. Also known as Instagram media.

`instagram_user_id`

numeric string

Instagram actor ID

`interactive_components_spec`

[AdCreativeInteractiveComponentsSpec](https://developers.facebook.com/docs/graph-api/reference/ad-creative-interactive-components-spec/)

Specification for all the interactive components that would show up on the ad

`link_destination_display_url`

string

Overwrites the display URL for link ads when `object_url` is set to a click tag

`link_og_id`

numeric string

The Open Graph (OG) ID for the link in this creative if the landing page has OG tags

`link_url`

string

Identify a specific landing tab on your Facebook page by the Page tab's URL. See [connection objects](/docs/reference/ads-api/connectionobjects/) for retrieving Page tab URLs. You can add [app\_data](/docs/facebook-login/manually-build-a-login-flow) parameters to the URL to pass data to a Page's tab.

`media_sourcing_spec`

[AdCreativeMediaSourcingSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-media-sourcing-spec/)

media sourcing spec to allow advertisers to specify additional media from various sources.

`messenger_sponsored_message`

string

Used for Messenger sponsored message. JSON string with message for this ad creative. See [Messenger Platform, Send API Reference](docs/messenger-platform/reference/send-api).

`name`

string

Name of this ad creative as seen in the ad account's library. This field has a limit of 100 characters.

`object_id`

numeric string

ID for Facebook object being promoted with ads or relevant to the ad or ad type. For example a page ID if you are running ads to generate Page Likes. See [promoted\_object](/docs/marketing-api/reference/ad-campaign/promoted-object).

`object_store_url`

string

iTunes or Google Play of the destination of an app ad

`object_story_id`

token with structure: Post ID

ID of a Facebook Page post to use in an ad. You can get this ID by [querying the posts of the page](/docs/graph-api/reference/page/feed/). If this post includes an image, it should not exceed 8 MB. Facebook will upload the image from the post to your ad account's [image library](/docs/marketing-api/adimage). If you create an unpublished page post via `object_story_spec` at the same time as creating the ad, this ID will be null. However, the `effective_object_story_id` will be the ID of the page post regardless of whether it's an organic or unpublished page post.

`object_story_spec`

[AdCreativeObjectStorySpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-object-story-spec/)

Use if you want to create a new unpublished page post and turn the post into an ad. The Page ID and the content to create a new unpublished page post. Specify `link_data`, `photo_data`, `video_data`, `text_data` or `template_data` with the content.

**Note:** The `object_story_spec` field may be null if the ad creative was generated through boosting an Instagram post.

`object_type`

enum {APPLICATION, DOMAIN, EVENT, OFFER, PAGE, PHOTO, SHARE, STATUS, STORE\_ITEM, VIDEO, INVALID, PRIVACY\_CHECK\_FAIL, POST\_DELETED}

The type of Facebook object you want to advertise. Allowed values are:  
`PAGE`  
`DOMAIN`  
`EVENT`  
`STORE_ITEM`: refers to an iTunes or Google Play store destination  
`SHARE`: from a page  
`PHOTO`  
`STATUS`: of a page  
`VIDEO`  
`APPLICATION`: app on Facebook  
`INVALID`: when an invalid object\_id was specified such as a deleted object or if you do not have permission to see the object. In very few cases, this field may be empty if Facebook is unable to identify the type of advertised object  
`PRIVACY_CHECK_FAIL`: you are missing the permission to load this object type  
`POST_DELETED`: this object\_type has been deleted

`object_url`

string

URL that opens if someone clicks your link on a link ad. This URL is not connected to a Facebook page.

`page_welcome_message`

string

Page welcome message for CTM ads

`photo_album_source_object_story_id`

string

photo\_album\_source\_object\_story\_id

`place_page_set_id`

numeric string

The ID of the page set for this creative. See the[Local Awareness guide](/docs/marketing-api/guides/local-awareness)

`platform_customizations`

[AdCreativePlatformCustomization](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-platform-customization/)

Use this field to specify the exact media to use on different Facebook [placements](/docs/marketing-api/targeting-specs/#placement). You can currently use this setting for images and videos. Facebook replaces the media originally defined in ad creative with this media when the ad displays in a specific placements. For example, if you define a media here for `instagram`, Facebook uses that media instead of the media defined in the ad creative when the ad appears on Instagram.

`playable_asset_id`

numeric string

The ID of the playable asset in this creative

`portrait_customizations`

AdCreativePortraitCustomizations

This field describes the rendering customizations selected for portrait mode ads like IG Stories, FB Stories, IGTV, etc

`product_data`

list<AdCreativeProductData>

product\_data

`product_set_id`

numeric string

Used for [Dynamic Ad](/docs/marketing-api/dynamic-product-ads). An ID for a product set, which groups related products or other items being advertised.

`recommender_settings`

AdCreativeRecommenderSettings

Used for [Dynamic Ads](/docs/marketing-api/dynamic-product-ads). Settings to display Dynamic ads based on product recommendations.

`referral_id`

numeric string

The ID of Referral Ad Configuration in this creative

`source_facebook_post_id`

numeric string

The ID of a Facebook post for creating ads

`source_instagram_media_id`

numeric string

The ID of an Instagram post for creating ads

`status`

enum {ACTIVE, IN\_PROCESS, WITH\_ISSUES, DELETED}

The status of the creative. `WITH_ISSUES` and `IN_PROCESS` are available for 4.0 or higher

`template_url`

string

Used for [Dynamic Ads](/docs/marketing-api/dynamic-product-ads) when you want to use third-party click tracking. See [Dynamic Ads, Click Tracking and Templates](/docs/marketing-api/dynamic-product-ads/ads-management#adtemplate).

`template_url_spec`

[AdCreativeTemplateURLSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-template-url-spec/)

Used for [Dynamic Ads](/docs/marketing-api/dynamic-product-ads) when you want to use third-party click tracking. See [Dynamic Ads, Click Tracking and Templates](/docs/marketing-api/dynamic-product-ads/ads-management#adtemplate).

`threads_user_id`

numeric string

threads\_user\_id

`thumbnail_id`

numeric string

thumbnail\_id

`thumbnail_url`

string

URL for a thumbnail image for this ad creative. You can provide dimensions for this with `thumbnail_width` and `thumbnail_height`. [See example](/docs/marketing-api/reference/ad-creative#thumbnail-example).

`title`

string

Title for link ad, which does not belong to a page.

`url_tags`

string

A set of query string parameters which will replace or be appended to urls clicked from page post ads, message of the post, and canvas app install creatives only

`use_page_actor_override`

bool

Used for [App Ads](/docs/app-ads). If `true`, we display the Facebook page associated with the app ads.

`video_id`

numeric string

Facebook object ID for video in this ad creative.

### Bordas

Borda

Descrição

[`previews`](/docs/marketing-api/reference/ad-creative/previews/)

Edge<AdPreview>

The HTML Snippets for previewing this creative

### Error Codes

Erro

Descrição

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

100

Invalid parameter

613

Calls to this api have exceeded the rate limit.

2500

Error parsing graph query

270

This Ads API request is not allowed for apps with development access level (Development access is by default for all apps, please request for upgrade). Make sure that the access token belongs to a user that is both admin of the app and admin of the ad account

190

Invalid OAuth 2.0 Access Token

200

Permissions error

[](#)

## Criando

Define creative as part of an ad set or standalone. In either case, we store your ad creative in your ad account's creative library to use in ads. If you try to add an creative that isn't unique, we do not generate it and return the creative ID of the existing ad creative. For example, create a Link Ad with a call to action:

```
v24.0
```

You use `link_caption` to pass the call to action object. By doing this, you can customize the call to action caption. To customize the call to action description, pass `link_description` in the call to action object.

Create a [carousel ad](/docs/reference/ads-api/multi-product-ads)

```
v24.0
```

### Partnership Ads Posts

As a partnership ads sponsor, you can create ads with posts where your brand is tagged. Create a campaign, ad set, as ads as your normally do. The only difference is in the ad creative.

Set the `sponsor_page_id` field for `facebook_branded_content` and/or the `sponsor_id` field for `instagram_branded_content` in the ad creative. For example:

```
curl \
 -F 'access_token=<TOKEN>' \
 -F 'facebook_branded_content':{'sponsor_page_id=<PAGE_ID>'}\
 // OR
 -F 'instagram_branded_content':{'sponsor_id=<Instagram_user_ID>'}\
 -F 'object_story_id=<OBJECT_STORY_ID>' \
https://graph.facebook.com/<VERSION>/<ACCOUNT_ID>/adcreatives
```

Where `object_story_id` is the post id in the format of: `postOwnerID_postID`.

### Inline Page Post Creation

Most ad creatives rely on page posts for creative content. While you may create page posts separately then reference them by ID, it is easier to create them in the same call you use to provide ad creative. Specify the page post content with `object_story_spec` which creates an unpublished page post. See [Inline Page Post, Blog](/ads/blog/post/2014/08/28/creative-page-post-api).

You can get the new ID by retrieving `object_story_id` from the ad creative. To get post ids created with `object_story_spec` through [`/promotable_posts`](/docs/graph-api/reference/page/feed/), pass `include_inline=true` in your `HTTP GET`. If `include_inline` value is `false`, we don't return any ids.

### Get Related Objects

Many ad creatives require `object_id` for a relevant Facebook object, app ID, or page tab's URL. See [Connection Objects](/docs/reference/ads-api/connectionobjects/) for more information.

### Examples

Create a Video Page Like ad:

```
v24.0
```

Create an ad from an existing page post

```
v24.0
```

Create a Photo Ad with [Branded Content](https://www.facebook.com/business/news/branded-content-update) from another page. This is available for photo, video, and link ads.

```
v24.0
```

Adding `url_tags` to an ad

```
v24.0
```

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

### Examples

```
v24.0
```

You can update an [AdCreative](/docs/marketing-api/reference/ad-creative/) by making a POST request to [`/{ad_creative_id}`](/docs/marketing-api/reference/ad-creative/).

### Parâmetros

Parâmetro

Descrição

`account_id`

numeric string

Ad account ID for the account this ad creative belongs to.

`adlabels`

list<Object>

[Ad Labels](/docs/marketing-api/reference/ad-label) associated with this creative. Used to group it with related ad objects.

`name`

string

The name of the creative in the creative library. This field takes a string of up to 100 characters.

`status`

enum {ACTIVE, IN\_PROCESS, WITH\_ISSUES, DELETED}

The status of this ad creative. See [Storing and Retrieving Ad Objects](/docs/marketing-api/best-practices/storing_adobjects).

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

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

## Excluindo

### Examples

```
v24.0
```

You can delete an [AdCreative](/docs/marketing-api/reference/ad-creative/) by making a DELETE request to [`/{ad_creative_id}`](/docs/marketing-api/reference/ad-creative/).

### Parâmetros

Parâmetro

Descrição

`account_id`

numeric string

Ad account ID for the account this ad creative belongs to.

`adlabels`

list<Object>

[Ad Labels](/docs/marketing-api/reference/ad-label) associated with this creative. Used to group it with related ad objects.

`name`

string

Name of this ad creative as seen in the ad account's library.

`status`

enum {ACTIVE, IN\_PROCESS, WITH\_ISSUES, DELETED}

The status of this ad creative. See [Storing and Retrieving Ad Objects](/docs/marketing-api/best-practices/storing_adobjects).

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

100

Invalid parameter

[](#)