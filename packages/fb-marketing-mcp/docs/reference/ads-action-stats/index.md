---
title: "Graph API Referência v24.0: Ads Action Stats"
source: "https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/"
scraped_at: "2026-02-01T14:20:16.641Z"
---

Versão Graph API

[v24.0](#)

# Ads Action Stats

[](#)

## Leitura

A single action for a Statistics result. Some fields that are marked `default` are returned only if you specify a breakdown for them.

  
Metrics will not be available under the following scenarios:

-   When there is an attempted aggregation across multiple attribution settings
    
-   When requested with impacted breakdowns like age, gender, etc. (this restriction only applies for off-Facebook & action types).
    

**Note:** Metrics will be available if querying with `action_attribution_windows=1d_click,7d_click,1d_view,incrementality` (not including the default window). Only conversion type metrics are eligible for setting values for attribution windows past 1 day.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`1d_click`

numeric string

Metric value of attribution window "1 day after clicking the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_click_all_conversions`

numeric string

Metric value of attribution window "1 day after clicking the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_click_first_conversion`

numeric string

Metric value of attribution window "1 day after clicking the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_ev`

numeric string

Metric value of attribution window "1 day after having an engaged view on the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_ev_all_conversions`

numeric string

Metric value of attribution window "1 day after having an engaged view on the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_ev_first_conversion`

numeric string

Metric value of attribution window "1 day after having an engaged view on the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_view`

numeric string

Metric value of attribution window "1 day after viewing the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_view_all_conversions`

numeric string

Metric value of attribution window "1 day after viewing the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`1d_view_first_conversion`

numeric string

Metric value of attribution window "1 day after viewing the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_click`

numeric string

Metric value of attribution window "28 days after clicking the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_click_all_conversions`

numeric string

Metric value of attribution window "28 days after clicking the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_click_first_conversion`

numeric string

Metric value of attribution window "28 days after clicking the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_view`

numeric string

Metric value of attribution window "28 days after viewing the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_view_all_conversions`

numeric string

Metric value of attribution window "28 days after viewing the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`28d_view_first_conversion`

numeric string

Metric value of attribution window "28 days after viewing the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_click`

numeric string

Metric value of attribution window "7 days after clicking the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_click_all_conversions`

numeric string

Metric value of attribution window "7 days after clicking the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_click_first_conversion`

numeric string

Metric value of attribution window "7 days after clicking the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_view`

numeric string

Metric value of attribution window "7 days after viewing the ad"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_view_all_conversions`

numeric string

Metric value of attribution window "7 days after viewing the ad". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`7d_view_first_conversion`

numeric string

Metric value of attribution window "7 days after viewing the ad". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_canvas_component_name`

string

Name of a component within a Canvas ad

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_carousel_card_id`

string

The ID of the specific carousel card that people engaged with when they saw your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_carousel_card_name`

string

The specific carousel card that people engaged with when they saw your ad. The cards are identified by their headlines.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_destination`

string

The destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_device`

string

The device on which the conversion event you're tracking occurred. For example, "Desktop" if someone converted on a desktop computer. Supported values are:  
`Other`  
`Desktop`  
`iPhone`  
`iPad`  
`iPod`  
`Android Smartphone`  
`Android Tablet`  
`Offline`  
`N/A`

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_reaction`

string

The number of reactions on your ads or boosted posts. The reactions button on an ad allows people to share different reactions on its content: Like, Love, Haha, Wow, Sad or Angry.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_target_id`

string

The id of destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK).

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_type`

string

The kind of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Action types include Page likes, app installs, conversions, event responses and more.  
Actions prepended by `app_custom_event` come from mobile [app events](/docs/app-events) and actions prepended by `offsite_conversion` come from the [Facebook Pixel](/docs/marketing-api/audiences-api/pixel).  
  
`app_custom_event.fb_mobile_achievement_unlocked`: Mobile App Feature Unlocks  
`app_custom_event.fb_mobile_activate_app`: Mobile App Starts  
`app_custom_event.fb_mobile_add_payment_info`: Mobile App Payment Details  
`app_custom_event.fb_mobile_add_to_cart`: Mobile App Adds To Cart  
`app_custom_event.fb_mobile_add_to_wishlist`: Mobile App Adds to Wishlist  
`app_custom_event.fb_mobile_complete_registration`: Mobile App Registrations  
`app_custom_event.fb_mobile_content_view`: Mobile App Content Views  
`app_custom_event.fb_mobile_initiated_checkout`: Mobile App Checkouts  
`app_custom_event.fb_mobile_level_achieved`: Mobile App Achievements  
`app_custom_event.fb_mobile_purchase`: Mobile App Purchases  
`app_custom_event.fb_mobile_rate`: Mobile App Ratings  
`app_custom_event.fb_mobile_search`: Mobile App Searchs  
`app_custom_event.fb_mobile_spent_credits`: Mobile App Credit Spends  
`app_custom_event.fb_mobile_tutorial_completion`: Mobile App Tutorial Completions  
`app_custom_event.other`: Other Mobile App Actions  
`app_install`: App Installs  
`app_use`: App Uses  
`checkin`: Check-ins  
`comment`: Post Comments  
`credit_spent`: Credit Spends  
`games.plays`: Game Plays  
`landing_page_view`: Landing Page Views  
`like`: Page Likes  
`link_click`: Link Clicks  
`mobile_app_install`: Mobile App Installs  
`offsite_conversion.custom.<custom_conv_id>`: Custom Conversions defined by the advertiser  
`offsite_conversion.fb_pixel_add_payment_info`: Adds Payment Info  
`offsite_conversion.fb_pixel_add_to_cart`: Adds To Cart  
`offsite_conversion.fb_pixel_add_to_wishlist`: Adds To Wishlist  
`offsite_conversion.fb_pixel_complete_registration`: Completed Registration  
`offsite_conversion.fb_pixel_custom`: Custom pixel events defined by the advertiser  
`offsite_conversion.fb_pixel_initiate_checkout`: Initiates Checkout  
`offsite_conversion.fb_pixel_lead`: Leads  
`offsite_conversion.fb_pixel_purchase`: Purchases  
`offsite_conversion.fb_pixel_search`: Searchs  
`offsite_conversion.fb_pixel_view_content`: Views Content  
`onsite_conversion.flow_complete`: On-Facebook Workflow Completions  
`onsite_conversion.messaging_block`: Blocked Messaging Conversations  
`onsite_conversion.messaging_conversation_started_7d`: Messaging Conversations Started  
`onsite_conversion.messaging_first_reply`: New Messaging Conversations  
`onsite_conversion.messaging_user_subscribed`: Messaging Subscriptions  
`onsite_conversion.post_save`: Post Saves  
`onsite_conversion.purchase`: On-Facebook Purchases  
`outbound_click`: Outbound Clicks  
`photo_view`: Page Photo Views  
`post`: Post Shares  
`post_reaction`: Post Reactions  
`rsvp`: Event Responses  
`video_view`: 3-Second Video Views  
`contact_total`: Contacts  
`contact_website`: Website Contacts  
`contact_mobile_app`: Mobile App Contacts  
`contact_offline`: Offline Contacts  
`customize_product_total`: Products Customized  
`customize_product_website`: Website Products Customized  
`customize_product_mobile_app`: Mobile App Products Customized  
`customize_product_offline`: Offline Products Customized  
`donate_total`: Donations  
`donate_website`: Website Donations  
`donate_on_facebook`: On Facebook Donations  
`donate_mobile_app`: Mobile App Donations  
`donate_offline`: Offline Donations  
`find_location_total`: Location Searches  
`find_location_website`: Website Location Searches  
`find_location_mobile_app`: Mobile App Location Searches  
`find_location_offline`: Offline App Location Searches  
`schedule_total`: Appointments Scheduled  
`schedule_website`: Website Appointments Scheduled  
`schedule_mobile_app`: Mobile App Appointments Scheduled  
`schedule_offline`: Offline App Appointments Scheduled  
`start_trial_total`: Trials Started  
`start_trial_website`: Website Trials Started  
`start_trial_mobile_app`: Mobile App Trials Started  
`start_trial_offline`: Offline Trials Started  
`submit_application_total`: Applications Submitted  
`submit_application_website`: Website Applications Submitted  
`submit_application_mobile_app`: Mobile App Applications Submitted  
`submit_application_offline`: Offline Applications Submitted  
`submit_application_on_facebook`: On Facebook Applications Submitted  
`subscribe_total`: Subscriptions  
`subscribe_website`: Website Subscriptions  
`subscribe_mobile_app`: Mobile App Subscriptions  
`subscribe_offline`: Offline Subscriptions  
`recurring_subscription_payment_total`: Recurring Subscription Payments  
`recurring_subscription_payment_website`: Website Recurring Subscription Payments  
`recurring_subscription_payment_mobile_app`: Mobile App Recurring Subscription Payments  
`recurring_subscription_payment_offline`: Offline Recurring Subscription Payments  
`cancel_subscription_total`: Canceled Subscriptions  
`cancel_subscription_website`: Website Canceled Subscriptions  
`cancel_subscription_mobile_app`: Mobile App Canceled Subscriptions  
`cancel_subscription_offline`: Offline Canceled Subscriptions  
`ad_click_mobile_app`: In-App Ad Clicks  
`ad_impression_mobile_app`: In-App Ad Impressions  
`click_to_call_call_confirm`: Estimated Call Confirmation Clicks  
`click_to_call_native_call_placed`: Calls Placed (Only available in select countries)  
`click_to_call_native_20s_call_connect`: 20s Calls Placed (Only available in select countries)  
`click_to_call_native_60s_call_connect`: 60s Calls Placed (Only available in select countries)  

  
**Grouped Action Types**:  
`page_engagement`: Page Engagement  
`post_engagement`: Post Engagement  
`onsite_conversion.lead_grouped`: All On-Facebook Leads  
`lead`: All offsite leads plus all On-Facebook leads  
`leadgen_grouped`: On-Facebook leads coming from Messenger and Instant Forms  
`omni_app_install`: App Installs  
`omni_purchase`: Purchases  
`omni_add_to_cart`: Adds to Cart  
`omni_complete_registration`: Registrations Completed  
`omni_view_content`: Content Views  
`omni_search`: Searches  
`omni_initiated_checkout`: Checkouts Initiated  
`omni_achievement_unlocked`: Achievements Unlocked  
`omni_activate_app`: App Activations  
`omni_level_achieved`: Levels Achieved  
`omni_rate`: Ratings Submitted  
`omni_spend_credits`: Credit Spends  
`omni_tutorial_completion`: Tutorials Completed  
`omni_custom`: Custom Events  

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_video_sound`

string

The sound status (on/off) when someone plays your video ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`action_video_type`

string

Video metrics breakdown.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`dda`

numeric string

Metric value of attribution window which is powered by data driven model

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`incrementality`

numeric string

Metric value of attribution window "Incremental Attribution"

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`incrementality_all_conversions`

numeric string

Metric value of attribution window "Incremental Attribution". All conversions counts every conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`incrementality_first_conversion`

numeric string

Metric value of attribution window "Incremental Attribution". First conversion counts only the first conversion that happens after someone views or clicks your ad.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`inline`

numeric string

Metric value of attribution window that can occurs on the ad itself

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`value`

numeric string

Metric value of default attribution window

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