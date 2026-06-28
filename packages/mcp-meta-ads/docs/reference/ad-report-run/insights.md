---
title: "Graph API Referência v24.0: Ad Report Run Insights"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-report-run/insights"
scraped_at: "2026-02-01T15:45:27.440Z"
---

Versão Graph API

[v24.0](#)

# Ad Report Run Insights

[](#)

## Leitura

AdReportRunInsights

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-report-run-id%7D%2Finsights&version=v24.0)

```
GET /v24.0/{ad-report-run-id}/insights HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-report-run-id}/insights',
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
    "/{ad-report-run-id}/insights",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{ad-report-run-id}/insights",
    null,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{ad-report-run-id}/insights"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AdsInsights.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=account_currency`).

Campo

Descrição

`account_currency`

string

account\_currency

`account_id`

numeric string

account\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`account_name`

string

account\_name

`action_values`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

action\_values

`actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

actions

`activity_recency`

string

activity\_recency

`ad_click_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

ad\_click\_actions

`ad_format_asset`

string

ad\_format\_asset

`ad_id`

numeric string

ad\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`ad_impression_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

ad\_impression\_actions

`ad_name`

string

ad\_name

`adset_id`

numeric string

adset\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`adset_name`

string

adset\_name

`advanced_actions_28d_view`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

advanced actions 28d view

`advanced_reach_1d_lookback`

numeric string

advanced reach 1d lookback

`advanced_reach_28d_lookback`

numeric string

advanced reach 28d lookback

`advanced_reach_7d_lookback`

numeric string

advanced reach 7d lookback

`age`

string

age

`age_targeting`

string

age\_targeting

`anchor_event_attribution_setting`

string

anchor event attribution setting

`anchor_events_performance_indicator`

string

anchor events performance indicator

`app_id`

string

app\_id

`attribution_setting`

string

attribution\_setting

`auction_bid`

numeric string

auction\_bid

`auction_competitiveness`

numeric string

auction\_competitiveness

`auction_max_competitor_bid`

numeric string

auction\_max\_competitor\_bid

`average_purchases_conversion_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

average\_purchases\_conversion\_value

`body_asset`

AdAssetBody

body\_asset

`buying_type`

string

buying\_type

`call_to_action_asset`

AdAssetCallToActionType

call\_to\_action\_asset

`campaign_id`

numeric string

campaign\_id

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`campaign_name`

string

campaign\_name

`canvas_avg_view_percent`

numeric string

canvas\_avg\_view\_percent

`canvas_avg_view_time`

numeric string

canvas\_avg\_view\_time

`catalog_segment_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

catalog\_segment\_actions

`catalog_segment_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

catalog\_segment\_value

`catalog_segment_value_mobile_purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

catalog\_segment\_value\_mobile\_purchase\_roas

`catalog_segment_value_omni_purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

catalog\_segment\_value\_omni\_purchase\_roas

`catalog_segment_value_website_purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

catalog\_segment\_value\_website\_purchase\_roas

`clicks`

numeric string

clicks

`coarse_conversion_value`

string

coarse\_conversion\_value

`comparison_node`

AdsInsightsComparison

comparison\_node

`comscore_market`

string

comscore market

`conversion_lead_rate`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

conversion\_lead\_rate

`conversion_leads`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

conversion\_leads

`conversion_rate_ranking`

string

conversion\_rate\_ranking

`conversion_values`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

conversion\_values

`conversions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

conversions

`converted_product_app_custom_event_fb_mobile_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product app custom event fb mobile purchase

`converted_product_app_custom_event_fb_mobile_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product app custom event fb mobile purchase value

`converted_product_offline_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product offline purchase

`converted_product_offline_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product offline purchase value

`converted_product_omni_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product omni purchase

`converted_product_omni_purchase_values`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product omni purchase values

`converted_product_quantity`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted\_product\_quantity

`converted_product_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted\_product\_value

`converted_product_website_pixel_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product website pixel purchase

`converted_product_website_pixel_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted product website pixel purchase value

`converted_promoted_product_app_custom_event_fb_mobile_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product app custom event fb mobile purchase

`converted_promoted_product_app_custom_event_fb_mobile_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product app custom event fb mobile purchase value

`converted_promoted_product_offline_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product offline purchase

`converted_promoted_product_offline_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product offline purchase value

`converted_promoted_product_omni_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product omni purchase

`converted_promoted_product_omni_purchase_values`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product omni purchase values

`converted_promoted_product_quantity`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted\_promoted\_product\_quantity

`converted_promoted_product_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted\_promoted\_product\_value

`converted_promoted_product_website_pixel_purchase`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product website pixel purchase

`converted_promoted_product_website_pixel_purchase_value`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

converted promoted product website pixel purchase value

`cost_per_15_sec_video_view`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_15\_sec\_video\_view

`cost_per_2_sec_continuous_video_view`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_2\_sec\_continuous\_video\_view

`cost_per_action_type`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_action\_type

`cost_per_ad_click`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_ad\_click

`cost_per_conversion`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_conversion

`cost_per_conversion_lead`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_conversion\_lead

`cost_per_dda_countby_convs`

numeric string

cost\_per\_dda\_countby\_convs

`cost_per_estimated_ad_recallers`

numeric string

cost\_per\_estimated\_ad\_recallers

`cost_per_inline_link_click`

numeric string

cost\_per\_inline\_link\_click

`cost_per_inline_post_engagement`

numeric string

cost\_per\_inline\_post\_engagement

`cost_per_objective_result`

list<AdsInsightsResult>

cost\_per\_objective\_result

`cost_per_one_thousand_ad_impression`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_one\_thousand\_ad\_impression

`cost_per_outbound_click`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_outbound\_click

`cost_per_result`

list<AdsInsightsResult>

cost\_per\_result

`cost_per_thruplay`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_thruplay

`cost_per_unique_action_type`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_unique\_action\_type

`cost_per_unique_click`

numeric string

cost\_per\_unique\_click

`cost_per_unique_conversion`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_unique\_conversion

`cost_per_unique_inline_link_click`

numeric string

cost\_per\_unique\_inline\_link\_click

`cost_per_unique_outbound_click`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

cost\_per\_unique\_outbound\_click

`country`

string

country

`cpc`

numeric string

cpc

`cpm`

numeric string

cpm

`cpp`

numeric string

cpp

`created_time`

string

created\_time

`creative_automation_asset_id`

AdAssetMedia

creative automation asset id

`creative_fingerprint`

string

creative\_fingerprint

`creative_media_type`

string

creative\_media\_type

`creative_relaxation_asset_type`

string

creative relaxation asset type

`ctr`

numeric string

ctr

`date_start`

string

date\_start

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`date_stop`

string

date\_stop

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`dda_countby_convs`

numeric string

dda\_countby\_convs

`dda_results`

list<AdsInsightsDdaResult>

dda\_results

`description_asset`

AdAssetDescription

description\_asset

`device_platform`

string

device\_platform

`dma`

string

dma

`engagement_rate_ranking`

string

engagement\_rate\_ranking

`estimated_ad_recall_rate`

numeric string

estimated\_ad\_recall\_rate

`estimated_ad_recall_rate_lower_bound`

numeric string

estimated\_ad\_recall\_rate\_lower\_bound

`estimated_ad_recall_rate_upper_bound`

numeric string

estimated\_ad\_recall\_rate\_upper\_bound

`estimated_ad_recallers`

numeric string

estimated\_ad\_recallers

`estimated_ad_recallers_lower_bound`

numeric string

estimated\_ad\_recallers\_lower\_bound

`estimated_ad_recallers_upper_bound`

numeric string

estimated\_ad\_recallers\_upper\_bound

`fidelity_type`

string

fidelity\_type

`flexible_format_asset_type`

string

flexible format asset type

`frequency`

numeric string

frequency

`frequency_value`

string

frequency\_value

`full_view_impressions`

numeric string

full\_view\_impressions

`full_view_reach`

numeric string

full\_view\_reach

`gen_ai_asset_type`

string

gen ai asset type

`gender`

string

gender

`gender_targeting`

string

gender\_targeting

`hourly_stats_aggregated_by_advertiser_time_zone`

string

hourly\_stats\_aggregated\_by\_advertiser\_time\_zone

`hourly_stats_aggregated_by_audience_time_zone`

string

hourly\_stats\_aggregated\_by\_audience\_time\_zone

`hsid`

string

hsid

`image_asset`

AdAssetImage

image\_asset

`impression_device`

string

impression\_device

`impressions`

numeric string

impressions

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`inline_link_click_ctr`

numeric string

inline\_link\_click\_ctr

`inline_link_clicks`

numeric string

inline\_link\_clicks

`inline_post_engagement`

numeric string

inline\_post\_engagement

`instagram_profile_visits`

numeric string

instagram profile visits

`instagram_upcoming_event_reminders_set`

numeric string

instagram\_upcoming\_event\_reminders\_set

`instant_experience_clicks_to_open`

numeric string

instant\_experience\_clicks\_to\_open

`instant_experience_clicks_to_start`

numeric string

instant\_experience\_clicks\_to\_start

`instant_experience_outbound_clicks`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

instant\_experience\_outbound\_clicks

`interactive_component_tap`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

interactive\_component\_tap

`is_auto_advance`

string

is auto advance

`is_conversion_id_modeled`

string

is\_conversion\_id\_modeled

`is_video`

string

is\_video

`labels`

string

labels

`landing_destination`

string

landing\_destination

`landing_page_view_actions_per_link_click`

numeric string

landing\_page\_view\_actions\_per\_link\_click

`landing_page_view_per_link_click`

numeric string

landing page view per link click

`landing_page_view_per_purchase_rate`

numeric string

landing\_page\_view\_per\_purchase\_rate

`link_clicks_per_results`

list<AdsInsightsResult>

link\_clicks\_per\_results

`link_url_asset`

AdAssetLinkURL

link\_url\_asset

`location`

string

location

`marketing_messages_click_rate_benchmark`

numeric string

marketing messages click rate benchmark

`marketing_messages_cost_per_delivered`

numeric string

marketing\_messages\_cost\_per\_delivered

`marketing_messages_cost_per_link_btn_click`

numeric string

marketing\_messages\_cost\_per\_link\_btn\_click

`marketing_messages_delivered`

numeric string

The number of messages your business sent to customers that were delivered. Some messages may not be delivered, such as when a customer's device is out of service. This metric doesn’t include messages delivered to Europe and Japan. In some cases, this metric may be estimated and may differ from what’s shown on your invoice due to small variations in data processing.

`marketing_messages_delivery_rate`

numeric string

The number of messages delivered divided by the number of messages sent. Some messages may not be delivered, such as when a customer's device is out of service. This metric doesn't include messages sent to Europe and Japan.

`marketing_messages_link_btn_click`

numeric string

marketing\_messages\_link\_btn\_click

`marketing_messages_link_btn_click_rate`

numeric string

marketing\_messages\_link\_btn\_click\_rate

`marketing_messages_media_view_rate`

numeric string

marketing\_messages\_media\_view\_rate

`marketing_messages_phone_call_btn_click_rate`

numeric string

marketing\_messages\_phone\_call\_btn\_click\_rate

`marketing_messages_quick_reply_btn_click`

numeric string

marketing\_messages\_quick\_reply\_btn\_click

`marketing_messages_quick_reply_btn_click_rate`

numeric string

marketing\_messages\_quick\_reply\_btn\_click\_rate

`marketing_messages_read`

numeric string

marketing\_messages\_read

`marketing_messages_read_rate`

numeric string

marketing\_messages\_read\_rate

`marketing_messages_read_rate_benchmark`

string

marketing messages read rate benchmark

`marketing_messages_sent`

numeric string

marketing\_messages\_sent

`marketing_messages_spend`

numeric string

marketing\_messages\_spend

`marketing_messages_website_add_to_cart`

numeric string

marketing\_messages\_website\_add\_to\_cart

`marketing_messages_website_initiate_checkout`

numeric string

marketing\_messages\_website\_initiate\_checkout

`marketing_messages_website_purchase`

numeric string

marketing\_messages\_website\_purchase

`marketing_messages_website_purchase_values`

numeric string

marketing\_messages\_website\_purchase\_values

`media_asset`

AdAssetMedia

media\_asset

`media_type`

string

media type

`mobile_app_purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

mobile\_app\_purchase\_roas

`multi_event_conversion_attribution_setting`

string

multi event conversion attribution setting

`objective`

string

objective

`objective_result_rate`

list<AdsInsightsResult>

objective\_result\_rate

`objective_results`

list<AdsInsightsResult>

objective\_results

`optimization_goal`

string

optimization\_goal

`outbound_clicks`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

outbound\_clicks

`outbound_clicks_ctr`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

outbound\_clicks\_ctr

`placement`

string

placement

`platform_position`

string

platform\_position

`postback_sequence_index`

string

postback\_sequence\_index

`product_brand_breakdown`

string

product brand breakdown

`product_category_breakdown`

string

product category breakdown

`product_custom_label_0_breakdown`

string

product custom label 0 breakdown

`product_custom_label_1_breakdown`

string

product custom label 1 breakdown

`product_custom_label_2_breakdown`

string

product custom label 2 breakdown

`product_custom_label_3_breakdown`

string

product custom label 3 breakdown

`product_custom_label_4_breakdown`

string

product custom label 4 breakdown

`product_group_content_id_breakdown`

string

product group content id breakdown

`product_group_retailer_id`

string

product group retailer id

`product_id`

string

product\_id

`product_retailer_id`

string

product retailer id

`product_set_id_breakdown`

string

product set id breakdown

`product_vendor_id_breakdown`

string

product vendor id breakdown

`product_views`

string

product views

`publisher_platform`

string

publisher\_platform

`purchase_per_landing_page_view`

numeric string

purchase per landing page view

`purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

purchase\_roas

`purchases_per_link_click`

numeric string

purchases\_per\_link\_click

`qualifying_question_qualify_answer_rate`

numeric string

qualifying\_question\_qualify\_answer\_rate

`quality_ranking`

string

quality\_ranking

`reach`

numeric string

reach

`redownload`

string

redownload

`reels_trending_topic`

string

reels trending topic

`region`

string

region

`result_rate`

list<AdsInsightsResult>

result\_rate

`result_values_performance_indicator`

string

result\_values\_performance\_indicator

`results`

list<AdsInsightsResult>

results

`rta_ugc_topic`

string

rta ugc topic

`rule_asset`

AdAssetRule

rule\_asset

`rule_set_id`

string

rule set id

`rule_set_name`

string

rule set name

`shop_clicks`

string

shop clicks

`shops_assisted_purchases`

string

shops\_assisted\_purchases

`skan_campaign_id`

string

skan\_campaign\_id

`skan_conversion_id`

string

skan\_conversion\_id

`skan_version`

string

skan\_version

`social_spend`

numeric string

social\_spend

`spend`

numeric string

spend

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`title_asset`

AdAssetTitle

title\_asset

`total_card_view`

string

total card view

`total_postbacks`

string

Contains fields associated with SKAN postbacks.

`total_postbacks_detailed`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

Contains fields associated with SKAN postbacks.

`total_postbacks_detailed_v4`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

Contains fields associated with SKAN 4.0 postbacks.  
**Note:** SKAN 4.0 conversions are currently being sent as SKAN 3.0 conversions via `total_postback_detailed`. Ensure these conversions are accounted for if SKAN 4.0 conversions are also being ingested from total\_postback\_detailed\_v4 as well

`unique_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_actions

`unique_clicks`

numeric string

unique\_clicks

`unique_conversions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_conversions

`unique_ctr`

numeric string

unique\_ctr

`unique_inline_link_click_ctr`

numeric string

unique\_inline\_link\_click\_ctr

`unique_inline_link_clicks`

numeric string

unique\_inline\_link\_clicks

`unique_link_clicks_ctr`

numeric string

unique\_link\_clicks\_ctr

`unique_outbound_clicks`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_outbound\_clicks

`unique_outbound_clicks_ctr`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_outbound\_clicks\_ctr

`unique_video_continuous_2_sec_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_video\_continuous\_2\_sec\_watched\_actions

`unique_video_view_15_sec`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

unique\_video\_view\_15\_sec

`updated_time`

string

updated\_time

`user_segment_key`

string

user\_segment\_key

`video_15_sec_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_15\_sec\_watched\_actions

`video_30_sec_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_30\_sec\_watched\_actions

`video_asset`

AdAssetVideo

video\_asset

`video_avg_time_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_avg\_time\_watched\_actions

`video_continuous_2_sec_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_continuous\_2\_sec\_watched\_actions

`video_p100_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_p100\_watched\_actions

`video_p25_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_p25\_watched\_actions

`video_p50_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_p50\_watched\_actions

`video_p75_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_p75\_watched\_actions

`video_p95_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_p95\_watched\_actions

`video_play_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_play\_actions

`video_play_curve_actions`

list<AdsHistogramStats>

video\_play\_curve\_actions

`video_play_retention_0_to_15s_actions`

list<AdsHistogramStats>

video\_play\_retention\_0\_to\_15s\_actions

`video_play_retention_20_to_60s_actions`

list<AdsHistogramStats>

video\_play\_retention\_20\_to\_60s\_actions

`video_play_retention_graph_actions`

list<AdsHistogramStats>

video\_play\_retention\_graph\_actions

`video_thruplay_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_thruplay\_watched\_actions

`video_time_watched_actions`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_time\_watched\_actions

`video_view_per_impression`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

video\_view\_per\_impression

`website_ctr`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

website\_ctr

`website_purchase_roas`

[list<AdsActionStats>](https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/)

website\_purchase\_roas

`wish_bid`

numeric string

wish\_bid

### Error Codes

Erro

Descrição

100

Invalid parameter

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