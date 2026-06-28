---
title: "Graph API Referência v24.0: Ad Account Reachfrequencypredictions"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/reachfrequencypredictions"
scraped_at: "2026-02-01T15:43:42.515Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Reach and Frequency Prediction

[](#)

Beginning with v23.0, the `instagram_destination_id` field will return the `ig_user_id` rather than the `instagram_actor_id`. The `instagram_actor_id` is also no longer supported in the `destination_ids` parameter; update your API calls to use the `ig_user_id` instead.

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `reachfrequencypredictions` edge from the following paths:

-   [`/act_{ad_account_id}/reachfrequencypredictions`](/docs/marketing-api/reference/ad-account/reachfrequencypredictions/)

When posting to this edge, a [ReachFrequencyPrediction](/docs/marketing-api/reference/reach-frequency-prediction/) will be created.

### Parâmetros

Parâmetro

Descrição

`budget`

int64

Expected lifetime budget in cents in the currency for the ad account. Must be greater than the default budget limit.

`campaign_group_id`

numeric string or integer

The ID of the campaign which this prediction belongs to.

`day_parting_schedule`

list<Object>

Ad set schedule, representing a delivery schedule for a single day  
  
Example:  
`[{"start_minute":360,"end_minute":1440,"days":[0,1,2,3,4,5,6]}]`  
  
The day part should be same for all week days. There needs to be at least 3 hours of delivery each day.  

`start_minute`

int64

A 0 based minute of the day representing when the schedule starts

Obrigatório

`end_minute`

int64

A 0 based minute of the day representing when the schedule ends

Obrigatório

`days`

list<int64>

Array of ints representing which days the schedule is active. Valid values are 0-6 with 0 representing Sunday, 1 representing Monday, ... and 6 representing Saturday.

Obrigatório

`timezone_type`

enum {USER, ADVERTISER}

Valor padrão: `USER`

`deal_id`

numeric string or integer

The ID of the deal which this prediction belongs to.

`destination_id`

int64

The ID of the Page or the ID of the app which the ad promotes.  
  

Using the correct advertiser Page or app ID makes your predictions more accurate. Reach and cost predictions for feed are specific to a given ID. They take into account other ads running from the same Page, as well as the past creative quality of ads from the Page, which impacts cost.  
  

If the ad set has `desktopfeed` or `mobilefeed` placement, specify `destination_id` or pass app or Page ID in `destination_ids` field. We recommend using `destination_ids`.

`destination_ids`

list<numeric string or integer>

Array of ID's of the Facebook Page or App which the ad promotes. Also include the Instagram account ID if `instagramstream` placement is used.  
  

If the `objective` is `MOBILE_APP_INSTALLS`, provide only the app ID. In this case, do not provide Instagram account ID, even with `instagramstream` placement.

`end_time`

int64

Same as `stop_time`.

`frequency_cap`

int64

If `interval_frequency_cap_reset_period` is specified, this field represents the frequency cap to be set for a custom period. For example: show ad 3 times per user every 48 hours.  
  

However when you read the values back, this represents the lifetime frequency cap for the campaign duration. A separate read-only field called `interval_frequency_cap` provides the frequency cap value originally set for the custom period.  
  

If `interval_frequency_cap_reset_period` is not specified, this field represents the lifetime frequency cap set for the campaign duration.

Target Frequency equivalent is `target_frequency`. You must also set `is_balanced_frequency` to `true`.

`instream_packages`

array<enum {NORMAL, PREMIUM, SPORTS, ENTERTAINMENT, BEAUTY, FOOD, SPANISH, REGULAR\_ANIMALS\_PETS, REGULAR\_FOOD, REGULAR\_GAMES, REGULAR\_POLITICS, REGULAR\_SPORTS, REGULAR\_STYLE, REGULAR\_TV\_MOVIES}>

Instream package of the campaign. Reserve buying campaigns and self-serve contextual package campaigns need to set the targeting packages here. Those campaigns will only deliver to pages included in the targeting packages

`interval_frequency_cap_reset_period`

int64

Custom period to reset frequency cap. In hours. Expressed as multiples of 24.  
  

For example, to show ad no more than 3 times every 48 hours, reset period should be set to 48 (hours) and `frequency_cap` should be set to 3. Implemented using a rolling window.

Target Frequency equivalent is `target_frequency_reset_period.` You must also set `is_balanced_frequency` to `true`.

`num_curve_points`

int64

Valor padrão: `400`

How many grid points to return from the curve.  
If the value is not specified, the default value (800) is used.  
If the value is larger than 800 then 800 will be used.

`objective`

string

Valor padrão: `REACH`

Objective of your reach and frequency campaign. Facebook uses this to create an optimized bid based on your objective. This does not modify you objective set at the ad campaign level. Of all possible ad objectives, you can only use these values in Facebook Reach and Frequency campaigns: `BRAND_AWARENESS`, `LINK_CLICKS`, `POST_ENGAGEMENT`, `MOBILE_APP_INSTALLS`, `WEBSITE_CONVERSIONS`, `REACH`, and `VIDEO_VIEWS`.

`optimization_goal`

string

optimization\_goal

`prediction_mode`

int64

Set `0` to create a prediction of budget based on expected reach. `reach` value must be provided.  
  
Set `1` to create a prediction of reach based on expected budget. `budget` value must be provided.

`reach`

int64

The desired reach of the set, must be at least the minimum reach for the target country. This number is 1,000,000, in most cases.

`rf_prediction_id_to_share`

numeric string or integer

ID of a previously created prediction. The new prediction will also use the audience from the given prediction.

`start_time`

int64

Unix timestamp for the set start time.

`stop_time`

int64

Unix timestamp for the set stop time. Must be no greater than 8 weeks ahead of the current time. It should end after 6AM on the last day, in the ad account's timezone.

`story_event_type`

int64

Whether or not to include mobile devices that cannot display different ad formats:  
\- Use `256`, to run canvas ads  
\- Use `128` to run video ads  
\- Use `0` if you do not include video or canvas ads  
\- Use `384` (256 + 128), to include both canvas and video.  
  

You cannot create video ads if you set this flag to `0` during prediction. You can create non-video ads if the flag is set to `128`. This field is required if you target all mobile devices.  
  
You cannot create canvas ads if this flag is set to `0` during prediction. However, you can create non-canvas ads even the flag is set to `256`.

`target_spec`

Targeting object

[Targeting spec](/docs/marketing-api/targeting-specs) for reach and frequency prediction. The length of JSON serialized API targeting spec should not exceed 65000 characters after internal reformatting.  
  

You cannot:  
\- Use `rightcolumn` together with any feed for placement.  
\- Specify more than one country.  
\- Provide minimal iOS version for `user_os`.  
  

Website Custom Audiences and `friends_of_connection` are not supported.

`trending_topics_spec`

JSON object

Describe your Reels Trending Ads configuration.

`is_all_trending`

boolean

Valor padrão: `false`

is\_all\_trending

`is_special_budget_alloc`

boolean

Valor padrão: `false`

is\_special\_budget\_alloc

`trending_topics`

array<enum {TRENDING\_ALL, TRENDING\_FASHION, TRENDING\_BEAUTY, TRENDING\_SPORTS, TRENDING\_FOOD, TRENDING\_CARS, TRENDING\_BEAUTY\_FASHION, TRENDING\_FITNESS, TRENDING\_MOVIES, TRENDING\_PETS\_ANIMALS, TRENDING\_VIDEO\_GAMING, TRENDING\_ALL\_VERIFIED, TRENDING\_MUSIC, TRENDING\_SUPERBOWL, TRENDING\_NBC\_WINTER\_OLYMPICS, TRENDING\_BASKETBALL}>

Valor padrão: `[]`

trending\_topics

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

2625

The request for a reach frequency campaign is invalid.

613

Calls to this api have exceeded the rate limit.

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

2641

Your ad includes or excludes locations that are currently restricted

190

Invalid OAuth 2.0 Access Token

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)