---
title: "Graph API Referência v24.0: Ad Study"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-study/"
scraped_at: "2026-02-01T14:30:40.144Z"
---

Versão Graph API

[v24.0](#)

# Ad Study

[](#)

Test your ads and choose the strategy that is driving the most conversions. For example, create a split test to find out which ad set performs the best:

cURL

```
curl \
-F 'name="new study"' \
-F 'description="test creative"' \
-F 'start_time=1435622400' \
-F 'end_time=1436918400' \
-F 'type=SPLIT_TEST' \
-F 'cells=[{name:"Group A",treatment_percentage:50,adsets:[<AD_SET_ID>]},{name:"Group B",treatment_percentage:50,adsets:[<AD_SET_ID>]}]' \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies
```

Use ad study for these experiments:

Study Type

Use Case

[Split Testing](/docs/marketing-api/guides/split-testing)

Inform near-term optimization decisions. Example: Is Creative A doing better than Creative B?

[Conversion Lift](/docs/marketing-api/guides/lift-studies)

Measure incremental impact of Facebook ads on business outcomes.

[Multi-Cell Conversion Lift](/docs/marketing-api/guides/lift-studies)

Measure incremental impact of different Facebook ads strategies on business outcomes.

[Brand Lift Results](/docs/marketing-api/guides/brand_lift)

Retrieve and analyze your brand lift study results.

See [Lift Study](/docs/marketing-api/guides/lift-studies) for setting up Conversion Lift and Multi-Cell Conversion Lift.

[](#)

## Leitura

A lift study object

### Examples

To read the details for a study, make a `HTTP GET` to:

```
https://graph.facebook.com/<API_VERSION>/<AD_STUDY_ID>
```

To read about the cells in a study:

cURL

```
curl -G \
-d 'fields="name,treatment_percentage,campaigns,adsets,adaccounts"' \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<API_VERSION>/<AD_STUDY_ID>/cells


// The response
{
  "data": [
    {
      "id": "<CELL_ID>",
      "name": Group A,
      "treatment_percentage": 50,
      "adsets": {
        "data": [
          {
           "id": "<AD_SET_ID>"
          }
        ],
      }
    },
    {
      "id": "<CELL_ID>",
      "name": Group B,
      "treatment_percentage": 50,
      "adsets": {
        "data": [
          {
            "id": "<AD_SET_ID>"
          }
        ],
      }
    }
  ],
}
```

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-study-id%7D&version=v24.0)

```
GET /v24.0/{ad-study-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-study-id}',
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
    "/{ad-study-id}",
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
    "/{ad-study-id}",
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
                               initWithGraphPath:@"/{ad-study-id}"
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

Campo

Descrição

`id`

numeric string

ID of the Lift study

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

The business that owns this study if it exists.

`canceled_time`

datetime

Time stamp when study was canceled

`cooldown_start_time`

datetime

Cooldown start time

`created_by`

[User](https://developers.facebook.com/docs/graph-api/reference/user/)

Who Lift study was created by

`created_time`

datetime

When was the Lift study created

`description`

string

Description

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`end_time`

datetime

End time

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`name`

string

Name of the Lift study

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`observation_end_time`

datetime

Observation end time

`results_first_available_date`

string

When results for at least one objective of the study are available

`start_time`

datetime

Start time

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`type`

string

The type of study, either audience segmentation or lift.

`updated_by`

[User](https://developers.facebook.com/docs/graph-api/reference/user/)

Updated by

`updated_time`

datetime

Updated time

### Bordas

Borda

Descrição

[`cells`](/docs/marketing-api/reference/ad-study/cells/)

Edge<AdStudyCell>

The cells which are part of the objective

[`objectives`](/docs/marketing-api/reference/ad-study/objectives/)

Edge<AdStudyObjective>

The objectives which are part of the objective

### Error Codes

Erro

Descrição

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

[](#)

## Criando

### Requirements

-   `treatment_percentage` for each cell should be at least 10.
    
-   The sum of `treatment_percentage` for all study cells should be less or equal to 100.
    
-   Each cell must have at least one object associated with it. The object can be `adaccounts`, `campaigns`, or `adsets`.
    

You can make a POST request to `ad_studies` edge from the following paths:

-   [`/{business_id}/ad_studies`](/docs/marketing-api/reference/business/ad_studies/)

When posting to this edge, an [AdStudy](/docs/marketing-api/reference/ad-study/) will be created.

### Parâmetros

Parâmetro

Descrição

`cells`

list<Object>

Describes the cells in the study.

Obrigatório

`description`

string

`id`

int64

`name`

string

`creation_template`

enum {AUTOMATIC\_PLACEMENTS, BRAND\_AWARENESS, FACEBOOK, FACEBOOK\_AUDIENCE\_NETWORK, FACEBOOK\_INSTAGRAM, FACEBOOK\_NEWS\_FEED, FACEBOOK\_NEWS\_FEED\_IN\_STREAM\_VIDEO, IN\_STREAM\_VIDEO, INSTAGRAM, MOBILE\_OPTIMIZED\_VIDEO, PAGE\_POST\_ENGAGEMENT, REACH, TV\_COMMERCIAL, TV\_FACEBOOK, VIDEO\_VIEW\_OPTIMIZATION, LOW\_FREQUENCY, MEDIUM\_FREQUENCY, HIGH\_FREQUENCY}

`adaccounts`

list<int64>

`adsets`

list<numeric string or integer>

`campaigns`

list<numeric string or integer>

`control_percentage`

float with at most two digits after decimal point

`treatment_percentage`

float with at most two digits after decimal point

`client_business`

numeric string or integer

Business associated with the study.

`confidence_level`

float

Confidence level used in power calculations and final study report.

`cooldown_start_time`

integer

Start of the pre-measurement cool-down period. This period ends when the study period starts.

`description`

string

The purpose of the study.

`end_time`

integer

Time when the study period ends.

Obrigatório

`name`

string

Name of the study.

Obrigatório

`objectives`

list<Object>

A vector of objects describing the objectives assigned to this study.

`id`

numeric string or integer

`is_primary`

boolean

`name`

string

`type`

enum {SALES, NONSALES, MAE, TELCO, FTL, MAI, PARTNER, BRANDLIFT, BRAND, MPC\_CONVERSION, CONVERSIONS}

`offsite_datasets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`adspixels`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`customconversions`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`applications`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`offline_conversion_data_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_catalogs`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`observation_end_time`

integer

The end of the observation period for this study. This period starts when the study period ends.

`start_time`

integer

The time when the study period starts.

Obrigatório

`type`

enum {LIFT, SPLIT\_TEST, CONTINUOUS\_LIFT\_CONFIG, GEO\_LIFT, BACKEND\_AB\_TESTING, CREATIVE\_SPEND\_ENFORCEMENT}

The type of ad study, such as `SPLIT_TEST` or `LIFT`.

`viewers`

list<int>

This study is shared with these people.

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

200

Permissions error

You can make a POST request to `ad_studies` edge from the following paths:

-   [`/{user_id}/ad_studies`](/docs/graph-api/reference/user/ad_studies/)

When posting to this edge, an [AdStudy](/docs/marketing-api/reference/ad-study/) will be created.

### Parâmetros

Parâmetro

Descrição

`cells`

list<Object>

A shape to describe the cells of the study

`description`

string

`id`

int64

`name`

string

`creation_template`

enum {AUTOMATIC\_PLACEMENTS, BRAND\_AWARENESS, FACEBOOK, FACEBOOK\_AUDIENCE\_NETWORK, FACEBOOK\_INSTAGRAM, FACEBOOK\_NEWS\_FEED, FACEBOOK\_NEWS\_FEED\_IN\_STREAM\_VIDEO, IN\_STREAM\_VIDEO, INSTAGRAM, MOBILE\_OPTIMIZED\_VIDEO, PAGE\_POST\_ENGAGEMENT, REACH, TV\_COMMERCIAL, TV\_FACEBOOK, VIDEO\_VIEW\_OPTIMIZATION, LOW\_FREQUENCY, MEDIUM\_FREQUENCY, HIGH\_FREQUENCY}

`adaccounts`

list<int64>

`adsets`

list<numeric string or integer>

`campaigns`

list<numeric string or integer>

`control_percentage`

float with at most two digits after decimal point

`treatment_percentage`

float with at most two digits after decimal point

`client_business`

numeric string or integer

Business associated with study

`confidence_level`

float

Confidence level used in power calculation and final report

`cooldown_start_time`

integer

The beginning of the pre measurement cooldown period. This period ends when the study period starts.

`description`

string

A brief description about the purpose of the study.

`end_time`

integer

The time when the study period ends.

`name`

string

The name of the study.

`objectives`

list<Object>

A vector of objects describing the objectives assigned to this study

`id`

numeric string or integer

`is_primary`

boolean

`name`

string

`type`

enum {SALES, NONSALES, MAE, TELCO, FTL, MAI, PARTNER, BRANDLIFT, BRAND, MPC\_CONVERSION, CONVERSIONS}

`offsite_datasets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`adspixels`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`customconversions`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`applications`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`offline_conversion_data_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_catalogs`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`observation_end_time`

integer

The end of the observation period for this study, this period starts when the study period ends.

`start_time`

integer

The time when the study period starts.

`type`

enum {LIFT, SPLIT\_TEST, CONTINUOUS\_LIFT\_CONFIG, GEO\_LIFT, BACKEND\_AB\_TESTING, CREATIVE\_SPEND\_ENFORCEMENT}

The type of ad study, either SPLIT\_TEST or LIFT.

`viewers`

list<int>

The list of people who this study has been shared with.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`cell_ids`: List \[

numeric string

\],

`objective_ids`: List \[

numeric string

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Atualizando

To update study fields:

cURL

```
curl \
-F 'name="new name"' \
-F 'end_time=1437004800' \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<API_VERSION>/<AD_STUDY_ID>
```

Add a cell an existing study and change `treatment_percentage` of all the cells:

cURL

```
curl \
-F 'cells=[{id:<CELL_ID>,treatment_percentage:50},{id:<CELL_ID>,treatment_percentage:10},{name:"Group C",treatment_percentage:20,adsets:[<AD_SET_ID>]}]' \
-F 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<API_VERSION>/<AD_STUDY_ID>
```

### Limitations

To update `treatment_percentage` for a cell, do it at the study level along with other cells. You also make updates to a study to add additional cells to it. You must provide the percentage of all existing and new cells in the study update since they are correlated.

Once the study runs, you cannot update `start_time`, `treatment_percentage` for cells. You cannot remove associated objects such as `adsets`, `adaccounts`, `campaigns`. However, you can update `end_time` to the future time if the study is not yet ended and add new associated objects to the cells if needed.  

You can update an [AdStudy](/docs/marketing-api/reference/ad-study/) by making a POST request to [`/{ad_study_id}`](/docs/marketing-api/reference/ad-study/).

### Parâmetros

Parâmetro

Descrição

`cells`

list<Object>

A shape to describe the cells of the study

`description`

string

`id`

int64

`name`

string

`creation_template`

enum {AUTOMATIC\_PLACEMENTS, BRAND\_AWARENESS, FACEBOOK, FACEBOOK\_AUDIENCE\_NETWORK, FACEBOOK\_INSTAGRAM, FACEBOOK\_NEWS\_FEED, FACEBOOK\_NEWS\_FEED\_IN\_STREAM\_VIDEO, IN\_STREAM\_VIDEO, INSTAGRAM, MOBILE\_OPTIMIZED\_VIDEO, PAGE\_POST\_ENGAGEMENT, REACH, TV\_COMMERCIAL, TV\_FACEBOOK, VIDEO\_VIEW\_OPTIMIZATION, LOW\_FREQUENCY, MEDIUM\_FREQUENCY, HIGH\_FREQUENCY}

`adaccounts`

list<int64>

`adsets`

list<numeric string or integer>

`campaigns`

list<numeric string or integer>

`control_percentage`

float with at most two digits after decimal point

`treatment_percentage`

float with at most two digits after decimal point

`client_business`

numeric string or integer

Business associated with study

`confidence_level`

float

Confidence level used in power calculation and final report

`cooldown_start_time`

integer

The beginning of the pre measurement cooldown period. This period ends when the study period starts.

`description`

string

A brief description about the purpose of the study.

`end_time`

integer

The time when the study period ends.

`name`

string

The name of the study.

`objectives`

list<Object>

A vector of objects describing the objectives assigned to this study

`id`

numeric string or integer

`is_primary`

boolean

`name`

string

`type`

enum {SALES, NONSALES, MAE, TELCO, FTL, MAI, PARTNER, BRANDLIFT, BRAND, MPC\_CONVERSION, CONVERSIONS}

`offsite_datasets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`adspixels`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`customconversions`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`applications`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`offline_conversion_data_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_sets`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`product_catalogs`

list<JSON or object-like arrays>

`id`

numeric string or integer

Obrigatório

`event_names`

list<string>

`observation_end_time`

integer

The end of the observation period for this study, this period starts when the study period ends.

`start_time`

integer

The time when the study period starts.

`type`

enum {LIFT, SPLIT\_TEST, CONTINUOUS\_LIFT\_CONFIG, GEO\_LIFT, BACKEND\_AB\_TESTING, CREATIVE\_SPEND\_ENFORCEMENT}

A type of the study.

`viewers`

list<int>

The list of people who this study has been shared with.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

`cell_ids`: List \[

numeric string

\],

`objective_ids`: List \[

numeric string

\],

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

[](#)

## Excluindo

To delete a study:

```
curl -X DELETE
"https://graph.facebook.com/<API_VERSION>/<AD_STUDY_ID>"
```

Não é possível executar esta operação neste ponto de extremidade.

[](#)