---
title: "Aprimoramentos padrão - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/standard-enhancements"
scraped_at: "2026-02-01T14:18:14.849Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/advantage-catalog-ads/standard-enhancements/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 17 de set de 2025  
Atualização em Português (Brasil): 10 de jun de 2025

# Standard Enhancements for Advantage+ Creative

Starting with Marketing API v22.0, opting in or out of standard enhancements will no longer be available. Instead, you can opt in or out of individual Advantage+ Creative features by following the instructions in [Get Started with Advantage+ Creative](/docs/marketing-api/creative/advantage-creative/get-started). Opting in or out of sub-features within the standard enhancements bundle will have the same effect as previously opting in or out of standard enhancements.

The sub-features within the standard enhancement bundle for single image ads include `image_template`, `image_touchups`, `text_optimizations`, and `inline_comment`. For single video ads, the sub-features are `video_auto_crop`, `text_optimizations`, and `inline_comment`.

Standard enhancements is for ads using a single image, video, or carousel. It automatically creates multiple variations of your ad and shows a personalized variation to each Account Center account based on what they're most likely to respond to. You can create ads with standard enhancements using the `TRAFFIC` or `CONVERSIONS` objectives to help drive performance and deliver more tailored ads to each Account Center account. For more information, please see [About Advantage+ creative](https://www.facebook.com/business/help/297506218282224).

## API Support for Standard Enhancements

### Standalone Creative Creation

#### Before:

```
v24.0
```

#### After (new fields are in bold):

```
v24.0
```

### Ad Creation

#### Before:

```
v24.0
```

#### After (new fields are in bold):

```
v24.0
```

For more details, see [Ad Creative](/docs/marketing-api/reference/ad-creative#create_example).

### Parameters

Name

Description

`degrees_of_freedom_spec`

Specifies the types of transformations that are enabled for the given creative. For more information, see [Ad Creative Degrees Of Freedom Spec, Reference](/docs/marketing-api/reference/ad-creative-degrees-of-freedom-spec/).

The following features can be opted in the `creative_features_spec`:

Name

Description

`standard_enhancements`

Basic set of enhancements to optimize your ad creative and improve performance. This can include:

-   Automatically adjusting the aspect ratio of your image or video
-   Applying a template to your image to help it better fit certain ad placements
-   Displaying relevant Meta comments below your ad.

The `enroll_status` field can be set to `OPT_IN` or `OPT_OUT`. For more details, see [Ad Creative Features Details, Reference](/docs/marketing-api/reference/ad-creative-feature-details/).

[](#)

## Learn More

### Marketing API Reference

-   [Ad Creative](https://developers.facebook.com/docs/marketing-api/reference/ad-creative#fields)
    -   [Ad Creative Degrees Of Freedom Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-degrees-of-freedom-spec/)
    -   [Ad Creative Features Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-features-spec/)
    -   [Ad Creative Feature Details](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-feature-details/)
    -   [Ad Creative Object Story Spec](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-object-story-spec/)

[](#)