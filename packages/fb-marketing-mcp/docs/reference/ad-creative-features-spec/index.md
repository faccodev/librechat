---
title: "Graph API Referência v24.0: Ad Creative Features Spec"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-creative-features-spec/"
scraped_at: "2026-02-01T14:18:52.481Z"
---

Versão Graph API

[v24.0](#)

# Ad Creative Features Spec

[](#)

## Leitura

Ad Creative Features Spec stores a list of creative transformation features an ad has opted in for, such as Standard Enhancements.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`adapt_to_placement`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

**Optional.**  

This feature is labeled ‘Image touch-ups’ in Ads Manager. Default is opt-in.  
  
Provide the field `enroll_status` to opt in/out of the feature.  
**Value:** OPT\_IN, OPT\_OUT  
  
`{"enroll_status": "OPT_OUT"}`

  
If you wish to control how the images are adjusted, you can use customizations field to control the settings. See the `aspect_ratio_config` and `image_crop_style` field in [Ad Creative Feature Customizations](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-customizations/) reference documentation for more details.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`add_text_overlay`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

Optional.

This feature is labeled ‘Add Dynamic Overlays’ in Ads Manager.Opt-in if you want to add information from catalog items as visually-unique overlays

The enroll\_status field can be set to OPT\_IN or OPT\_OUT.

If you want to have manual control on how the overlay is rendered, see the [Ad Creative Link Data Image Layer Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-image-layer-spec/) reference documentation for more details.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ads_with_benefits`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

ads\_with\_benefits

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`biz_ai`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

biz\_ai

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`creative_stickers`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

creative\_stickers

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`customize_product_recommendation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

customize\_product\_recommendation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`description_automation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

**Optional.**  

Opt in/opt out of Description Automation. Default is opt-in.  
  
Provide the field `enroll_status` to opt in/out of description automation.  
**Value:** OPT\_IN, OPT\_OUT  
  
`{"enroll_status": "OPT_OUT"}`

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`fb_feed_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

fb\_feed\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`fb_reels_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

fb\_reels\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`fb_story_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

fb\_story\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`generate_cta`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

generate\_cta

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`hide_price`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

hide\_price

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ig_feed_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

ig\_feed\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ig_reels_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

ig\_reels\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ig_stream_tag`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

ig\_stream\_tag

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_animation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

image\_animation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_background_gen`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

image\_background\_gen

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_templates`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

image\_templates

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`image_touchups`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

image\_touchups

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`inline_comment`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

Opt in/opt out of Relevant comments enhancement. Default is opt-in.

Provide the field enroll\_status to opt in/out of Relevant comments. Value: OPT\_IN, OPT\_OUT

{"enroll\_status": "OPT\_OUT"}

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`local_store_extension`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

local\_store\_extension

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`media_order`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

media order

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`media_type_automation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

media type automation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`multi_photo_to_video`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

multi\_photo\_to\_video

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`music_generation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

music\_generation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`pac_relaxation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

pac\_relaxation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_extensions`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

See [this page](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/product-extensions) for full details.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`profile_card`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

profile\_card

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`profile_extension`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

profile\_extension

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`replace_media_text`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

replace\_media\_text

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`reveal_details_over_time`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

reveal\_details\_over\_time

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`show_destination_blurbs`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

show\_destination\_blurbs

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`show_summary`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

show\_summary

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`site_extensions`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

site\_extensions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`standard_enhancements`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

See [this page](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/standard-enhancements/?locale=en_US&draft=644362790552674) for full details. Enroll in this feature in [AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`standard_enhancements_catalog`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

standard\_enhancements\_catalog

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_extraction_for_headline`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

text\_extraction\_for\_headline

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_extraction_for_tap_target`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

text\_extraction\_for\_tap\_target

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_optimizations`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

text\_optimizations

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_overlay_translation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

text\_overlay\_translation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`text_translation`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

text\_translation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`translate_voiceover`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

translate\_voiceover

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`video_highlights`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

video\_highlights

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`video_to_image`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

video\_to\_image

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`wa_mm_image_filtering`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

wa\_mm\_image\_filtering

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`wa_mm_text_truncation_length`

[AdCreativeFeatureDetails](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)

wa\_mm\_text\_truncation\_length

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