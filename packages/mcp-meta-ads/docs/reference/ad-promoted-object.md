---
title: "Ad Set Promoted Object"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-promoted-object"
scraped_at: "2026-02-01T14:22:17.787Z"
---

Versão Graph API

[v24.0](#)

# 

Ad Set, Promoted Object

[](#)

The object an ad set promotes, such as a Page or app. The campaign's `objective` and the ad set's `promoted_object` provide intent for your ads. When you create ad sets for campaigns with the certain objectives, `promoted_object` is required. See [Ad Set, Creating](/docs/marketing-api/reference/ad-campaign#Creating).

### Requirements

-   You must have permissions for objects you promote, including `page_id`, `application_id`, and `pixel_id`
    
-   If you use `page_id`, the creative must promote that `page_id`
    
-   If you use `pixel_id`, you must provide `custom_event_type`
    
-   If you use `object_store_url`, you must include `application_id`. This option is only available in [Ads Manager](https://www.facebook.com/ads/manager).
    
    -   `object_store_url` MUST be associated with that app. You can configure this under your [app settings](https://developers.facebook.com/apps).
        
    -   Mobile device targeting for the ad set must match supported platforms for your specified app.
        
    -   The ad creative must link to the specified `object_store_url`.
        
    

### Limitations

If you use `promoted_object`:

-   `promoted_object` is **immutable** in most cases. It is set on creation and cannot be changed. To promote a different object, create a new ad set. The exceptions are:
    
    -   Adding `application_id` or `product_catalog_id` if not already given
        
    -   Changing `pixel_id`, `pixel_rule` or `custom_event_type` to a new value when the following objectives and optimization goals are set:
        
        -   `CONVERSIONS`, `PRODUCT_CATALOG_SALES`
            
        -   `OFFSITE_CONVERSIONS`
            
        
    
-   You cannot set `promoted_object` for existing ad sets. You must create a new ad set except for the exceptions above.
    
-   If `promoted_object` is specified, Facebook automaticallly infers `conversion_specs` for your specified objectives. You cannot manually configure `conversion_specs`; we ignore any value you pass.
    
-   You can update all ad fields for existing ads in a legacy ad set without a `promoted_object` set.
    

[](#)

## Leitura

Promoted Object describes the object an ad set is promoting, such as the Page in a Page Like campaign. It is a generalized way of specifying a broad range of objects which are related to advertising objectives.  
  
Taken together, the campaign's objective and the ad set's promoted\_object should be enough to answer the question: "What is this ad set/campaign all about?". For example, "This campaign is meant to get more page likes for my Page X", or "This ad set is driving mobile app installs for my app Y".

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`application_id`

numeric string

The ID of a Facebook Application. Usually related to mobile or canvas games being promoted on Facebook for installs or engagement

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`boosted_product_set_id`

numeric string

Combined with “product\_set\_id” to promote a specific Product Set while including other products from the Product Catalog in ads. Use the All Products Product Set ID in the “product\_set\_id” field and the specific Product Set ID in the “boosted\_product\_set\_id” field. This will ensure products from the set are shown more often compared to other products from the Product Catalog.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`conversion_goal_id`

numeric string

The ID of conversion goal used for conversion specs and tracking specs generation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`custom_conversion_id`

numeric string

The ID of a Custom Conversion.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`custom_event_str`

string

The event from an App Event of a mobile app, which is not in the standard event list.

**`custom_event_type = OTHER` is required**

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`custom_event_type`

enum {AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

The event from an App Event of a mobile app, (Purchase, Lead or CompleteRegistration) event from Offline Conversion data, or `tag` of an [conversion pixel](/docs/marketing-api/offsite-pixels).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`event_id`

numeric string

The ID of a Facebook Event

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`lead_ads_custom_event_str`

string

lead\_ads\_custom\_event\_str

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`lead_ads_custom_event_type`

enum {AD\_IMPRESSION, RATE, TUTORIAL\_COMPLETION, CONTACT, CUSTOMIZE\_PRODUCT, DONATE, FIND\_LOCATION, SCHEDULE, START\_TRIAL, SUBMIT\_APPLICATION, SUBSCRIBE, ADD\_TO\_CART, ADD\_TO\_WISHLIST, INITIATED\_CHECKOUT, ADD\_PAYMENT\_INFO, PURCHASE, LEAD, COMPLETE\_REGISTRATION, CONTENT\_VIEW, SEARCH, SERVICE\_BOOKING\_REQUEST, MESSAGING\_CONVERSATION\_STARTED\_7D, LEVEL\_ACHIEVED, ACHIEVEMENT\_UNLOCKED, SPENT\_CREDITS, LISTING\_INTERACTION, D2\_RETENTION, D7\_RETENTION, OTHER}

lead\_ads\_custom\_event\_type

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`lead_ads_form_event_source_type`

enum

lead\_ads\_form\_event\_source\_type

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`lead_ads_offsite_conversion_type`

enum

lead\_ads\_offsite\_conversion\_type

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`mcme_conversion_id`

numeric string

mcme\_conversion\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`object_store_url`

string

The uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the "application\_id" this uniquely specifies an object which can be the subject of a Facebook advertising campaign.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offer_id`

numeric string

The ID of an Offer from a Facebook Page.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offline_conversion_data_set_id`

numeric string

The ID of the offline dataset.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`offsite_conversion_event_id`

numeric string

offsite\_conversion\_event\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`page_id`

numeric string

The ID of a Facebook Page

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`pixel_aggregation_rule`

string

A JSON rule that will decide whether an action from a pixel matches this promoted object spec based on aggregated results from previous pixel fires.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`pixel_id`

numeric string

The ID of a Facebook conversion pixel. Used with offsite conversion campaigns.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`pixel_rule`

string

A JSON rule that will decide whether an action from a pixel matches this promoted object spec

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`place_page_set_id`

numeric string

The ID of a Place Page Set for Dynamic Local Ads.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_catalog_id`

numeric string

The ID of a Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_set_id`

numeric string

The ID of a Product Set within an Ad Set level Product Catalog. Used with [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`product_set_optimization`

enum

product\_set\_optimization

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`retention_days`

string

Value for retention period for aggregation based rule for the promoted object.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`value_semantic_type`

enum

The semantic of the event value to be using for optimization

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`variation`

enum

variation

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`whats_app_business_phone_number_id`

numeric string

The ID of the associated WhatsApp business phone number for this promoted ad. It's of type WhatsAppBusinessAccountToNumberCurrentStatus.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`whatsapp_phone_number`

numeric string

The WhatsApp phone number for this promoted ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

[](#)

## Criando

When you create ad sets in campaigns with the certain objectives, you must provide `promoted_object`. See [Ad Set, Creating](/docs/marketing-api/reference/ad-campaign#Creating).

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)