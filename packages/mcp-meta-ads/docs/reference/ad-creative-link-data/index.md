---
title: "Graph API Referência v24.0: Ad Creative Link Data"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data/"
scraped_at: "2026-02-01T14:14:10.120Z"
---

Versão Graph API

[v24.0](#)

# Ad Creative Link Data

[](#)

## Leitura

The specification for a link ad or [carousel ad](/docs/marketing-api/guides/carousel-ads/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`ad_context`

string

String that represents the ad context provided by advertiser

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`additional_image_index`

int32

The index (zero based) of the image from the additional images array to use as the ad image for a [dynamic product ad](/docs/marketing-api/dynamic-product-ads/ads-management/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`app_link_spec`

[AdCreativeLinkDataAppLinkSpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-app-link-spec/)

Native deeplinks attached to the post

`attachment_style`

enum

The style of the attachment

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`boosted_product_set_id`

numeric string

Combined with “product\_set\_id” to promote a specific Product Set while including other products from the Product Catalog in ads. Use the All Products Product Set ID in the “product\_set\_id” field and the specific Product Set ID in the “boosted\_product\_set\_id” field. This will ensure products from the set are shown more often compared to other products from the Product Catalog.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`branded_content_shared_to_sponsor_status`

string

The branded content shared to sponsor option

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`branded_content_sponsor_page_id`

numeric string

The branded content sponsor page id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`branded_content_sponsor_relationship`

string

The branded content sponsor relationship option

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`call_to_action`

[AdCreativeLinkDataCallToAction](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-call-to-action/)

An optional call to action button. If not specified, on Instagram, a default CTA would be used, `{"type":"LEARN_MORE","value": {"link":<LINK VALUE OF LINK_DATA>,}}`. Note that `LIKE_PAGE` is not supported

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`caption`

string

Link caption. Overwrites the caption under the title in the link. The caption must be an actual URL and should accurately reflect the URL and associated advertiser or business someone visits when they click the link. See [Post, Reference](/docs/graph-api/reference/post) for more info. You do not use this setting in Instagram ads.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`child_attachments`

[list<AdCreativeLinkDataChildAttachment>](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-child-attachment/)

A 2-5 element array of link objects required for [carousel ads](/docs/marketing-api/guides/carousel-ads/). If `multi_share_optimized` is set to `true`, this array could have up to 10 objects. Facebook will automatically optimize the order in which the carousel cards are shown and display the top 5. We strongly recommend that you use at least 3 attachments for achieving optimal performance; allowing minimum of 2 attachments is for enabling lightweight integrations and using 2 objects might result in sub-optimal campaign results.  
If this ad creative is used for an [Instagram Carousel ad](/docs/marketing-api/guides/instagramads), you will need to have at least 3 attachments for `MOBILE_APP_INSTALLS` ads and 2 for the other objectives. If more than 5 are given, only the first 5 will be shown on Instagram, even if `multi_share_optimized` is `true`.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`collection_thumbnails`

list<AdCreativeCollectionThumbnailInfo>

List of Canvas media component IDs and their square cropping information provided by the advertiser for Collection style feed rendering

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`customization_rules_spec`

list<AdCustomizationRuleSpec>

Customization rules for a dynamic ad

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`description`

string

Link description. Overwrites the description in the link when your ad displays. See [Post, Reference](/docs/graph-api/reference/post) for more information. You do not use this setting for Instagram ads.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`event_id`

numeric string

The id of a Facebook event. This is only to be used if this creative is for a Website Clicks campaign, the Call To Action is Buy Tickets, and the `link` points to the ticketing website of this Facebook event

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`force_single_link`

bool

Whether to force the post to render in a single link format

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`format_option`

enum {carousel\_ar\_effects, carousel\_images\_multi\_items, carousel\_images\_single\_item, carousel\_slideshows, collection\_video, single\_image}

Options on how to render your ad. If not specified, default is `carousel_images_multi_items`. See [Dynamic Ads, Ads Management](/docs/marketing-api/dynamic-product-ads/ads-management/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_crops`

[AdsImageCrops](https://developers.facebook.com/docs/marketing-api/reference/ads-image-crops/)

How to the image should be cropped. You can use the crop spec with `100x100` key for Facebook Feed and Instagram.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_hash`

string

Hash of an image in your ad account's image library. Provide a value for this field or \`picture\` but not both

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_layer_specs`

[list<AdCreativeLinkDataImageLayerSpec>](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-image-layer-spec/)

How to render image overlays on a dynamic item in [Dynamic Ads](/docs/marketing-api/dynamic-product-ads/ads-management/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_overlay_spec`

[AdCreativeLinkDataImageOverlaySpec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-image-overlay-spec/)

How to render image overlays on a dynamic item in [Dynamic Ads](/docs/marketing-api/dynamic-product-ads/ads-management/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`link`

string

Link url. This url is required to be the same as the CTA link url. See [post](/docs/graph-api/reference/post) for more info. This field is required for a [carousel ad](/docs/marketing-api/guides/carousel-ads/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`message`

string

The main body of the post. See [post](/docs/graph-api/reference/post) for more info. This field is required for a [carousel ad](/docs/marketing-api/guides/carousel-ads/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`multi_share_end_card`

bool

If set to false, removes the end card which displays the page icon. Default is true. Used by [carousel ads](/docs/marketing-api/guides/carousel-ads/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`multi_share_optimized`

bool

If set to true, automatically select and order images and links. Default is true. Used by [carousel ads](/docs/marketing-api/guides/carousel-ads/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`name`

string

Name of the link. Overwrite the title of the link when you preview the ad. Facebook ignores this value when call-to-action type is LIKE\_PAGE. See [Post, Reference](/docs/graph-api/reference/post) for more information

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offer_id`

numeric string

The id of a Facebook native offer

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page_welcome_message`

string

The customized greeting message that is presented to the user when they are redirected from a click to Messenger or click to Whatsapp ad to the messaging app.

For click to Whatsapp ads, this string is a JSON object passed as a string. It can be an autofill message, an icebreaker or an automated greeting message with an optional call to action.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`picture`

string

URL of a picture to use in the post. Specify this field or `image_hash` but not both. See [post](/docs/graph-api/reference/post) for more info. The image specified at the URL will be saved into the ad accounts [image library](/docs/marketing-api/reference/ad-image)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`post_click_configuration`

AdCreativePostClickConfiguration

Customized contents provided by the advertiser for the ad post-click experience

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`preferred_image_tags`

list<string>

Select which image to display by its tag, if you have added tags to your images. Tags are specified in order of priority to try

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`preferred_video_tags`

list<string>

Selects which video to use, if you have added tags to your video.  
For any item, we choose the video as follows: we get the first tag in `preferred_video_tags` that has at least one video for the item, then render the most performant video for that tag and placement. If no tags correspond to a video, we serve the first video. If there are no videos, we fall back to image rendering.  
**Note:** `preferred_video_tags` will only be applied if your ad is opted into [Dynamic Media](/docs/marketing-api/advantage-catalog-ads/dynamic-media/#dynamic-media).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`retailer_item_ids`

list<string>

List of product IDs provided by the advertiser for Collections

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`show_multiple_images`

bool

Use with force\_single\_link = true in order to show a single dynamic item but in carousel format using multiple images from the catalog. See [dynamic product ad](/docs/marketing-api/dynamic-product-ads/ads-management/)

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`sponsorship_info`

AdCreativeLinkDataSponsorshipInfoSpec

Details of the sponsor for the event ad

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`static_fallback_spec`

AdCreativeStaticFallbackSpec

Give a fallback creative for dynamic ads

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`use_flexible_image_aspect_ratio`

bool

Default value is `true`. This field only applies if you do not provide a cropping spec. We ignore it if you provide one.  
  
If `true`, when the aspect ratio, or width:height ratio, is between 1.91:1 and 1:1, render the entire image. If the image is taller than the aspect ratio 1:1, automatically crop it to 1:1 and render the cropped image. If the image is wider than aspect ratio 1.91:1, automatically crop it to 1.91:1 and render the cropped image.  
  
If set to `false`, when the aspect ratio, or width:height ratio, is 1.91:1, render the entire image. If the image aspect ratio is not 1.91:1, automatically crop it to 1.91:1 aspect ratio and render the cropped image.  
  
Use this field only for single image ads, not carousel ads.  
  
This field is not supported for Donation ads, Offer ads, Dynamic Ads, ads with image overlays, and ads using stock images.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)