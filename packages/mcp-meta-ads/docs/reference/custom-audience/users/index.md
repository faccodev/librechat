---
title: "Graph API Referência v24.0: Custom Audience Users"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-audience/users/"
scraped_at: "2026-02-01T14:26:34.961Z"
---

Versão Graph API

[v24.0](#)

# Custom Audience Users

[](#)

Add people to your ad's audience with a hash of data from your business. See [Custom Audiences from CRM Data](/docs/marketing-api/custom-audience-api).

**You can add an unlimited number of records for an audience, but only a maximum of 10000 at a time. Changes to your Custom Audiences don't happen immediately and usually take up to 24 hours.**

### Flagged custom and lookalike audiences

If the audience is flagged with an `operation_status` of `471`, you must resolve the restrictions on the customer file custom audience before you can update or delete the user memberships. Attempts to edit user memberships without resolving the restrictions will result in an error.

```
{
  "error": {
    "message": "Invalid parameter",
    "code": 100,
    "error_subcode": 1713230,
    "error_user_title": "Audience Upload Blocked",
    "error_user_msg": "Before updating user memberships, you must resolve integrity restrictions on this Data File Custom Audience. Go to Audience Manager to appeal the restrictions or create a new audience with updated data",
  },
}
```

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

You can update a [User](/docs/graph-api/reference/user/) by making a POST request to [`/{custom_audience_id}/users`](/docs/marketing-api/reference/custom-audience/users/).

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=%3CCUSTOM_AUDIENCE_ID%3E%2Fusers%3Fpayload%3D%257B%2522schema%2522%253A%255B%2522EMAIL%2522%252C%2522LOOKALIKE_VALUE%2522%255D%252C%2522data%2522%253A%255B%255B%25229b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254%2522%252C44.5%255D%252C%255B%25228cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee%2522%252C140%255D%252C%255B%25224eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a%2522%252C0%255D%252C%255B%252298df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56%2522%252C0.9%255D%255D%257D&version=v24.0)

```
POST /v24.0/<CUSTOM_AUDIENCE_ID>/users HTTP/1.1
Host: graph.facebook.com

payload=%7B%22schema%22%3A%5B%22EMAIL%22%2C%22LOOKALIKE_VALUE%22%5D%2C%22data%22%3A%5B%5B%229b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254%22%2C44.5%5D%2C%5B%228cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee%22%2C140%5D%2C%5B%224eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a%22%2C0%5D%2C%5B%2298df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56%22%2C0.9%5D%5D%7D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/<CUSTOM_AUDIENCE_ID>/users',
    array (
      'payload' => '{"schema":["EMAIL","LOOKALIKE_VALUE"],"data":[["9b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254",44.5],["8cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee",140],["4eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a",0],["98df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56",0.9]]}',
    ),
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
    "/<CUSTOM_AUDIENCE_ID>/users",
    "POST",
    {
        "payload": "{\"schema\":[\"EMAIL\",\"LOOKALIKE_VALUE\"],\"data\":[[\"9b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254\",44.5],[\"8cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee\",140],[\"4eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a\",0],[\"98df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56\",0.9]]}"
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
params.putString("payload", "{\"schema\":[\"EMAIL\",\"LOOKALIKE_VALUE\"],\"data\":[[\"9b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254\",44.5],[\"8cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee\",140],[\"4eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a\",0],[\"98df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56\",0.9]]}");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<CUSTOM_AUDIENCE_ID>/users",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"payload": @"{\"schema\":[\"EMAIL\",\"LOOKALIKE_VALUE\"],\"data\":[[\"9b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254\",44.5],[\"8cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee\",140],[\"4eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a\",0],[\"98df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56\",0.9]]}",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<CUSTOM_AUDIENCE_ID>/users"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X POST \
  -F 'payload={
       "schema": [
         "EMAIL",
         "LOOKALIKE_VALUE"
       ],
       "data": [
         [
           "9b431636bd164765d63c573c346708846af4f68fe3701a77a3bdd7e7e5166254",
           44.5
         ],
         [
           "8cc62c145cd0c6dc444168eaeb1b61b351f9b1809a579cc9b4c9e9d7213a39ee",
           140
         ],
         [
           "4eaf70b1f7a797962b9d2a533f122c8039012b31e0a52b34a426729319cb792a",
           0
         ],
         [
           "98df8d46f118f8bef552b0ec0a3d729466a912577830212a844b73960777ac56",
           0.9
         ]
       ]
     }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<CUSTOM_AUDIENCE_ID>/users
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`payload`

Object

Payload representing users to add

`schema`

string

`EMAIL_SHA256`, `PHONE_SHA256`, `MOBILE_ADVERTISER_ID`. One can also pass an array of multiple keys for multi-key match. Supported key types includes:  
`EXTERN_ID`  
`EMAIL`  
`PHONE`  
`GEN`  
`DOBY`  
`DOBM`  
`DOBD`  
`LN`  
`FN`  
`FI`  
`CT`  
`ST`  
`ZIP`  
`MADID`  
`COUNTRY`  
The multi-key array is of the form `["EMAIL", "LN", "FN", "ZIP"]`

`is_raw`

boolean

Is the key raw? If the keys are combinational keys like "LN\_FN\_ZIP", set this to `false`, otherwise set this to `true`. Default to false

`data`

list<JSON array>

Array with users data. If the multi-key feature is used, a two-dimensional array of the form `[["<HASHED_EMAIL>", "<HASHED_FN>", "<HASHED_LN>", "<HASHED_ZIP>"], ["", "<HASHED_FN>", "<HASHED_LN>", "<HASHED_ZIP>"]]` should be passed.In case a key is unknown, it should be left blank.

`app_ids`

list<int>

App ids used by the users being uploaded. This field is required when `schema` is a Facebook UID and the IDs were collected by an App integration. e.g. `[1234,5678]`

`page_ids`

list<Page ID>

Page ids used by the users being uploaded. This field is required when `schema` is a Facebook UID and the IDs were collected by a Page webhook integration. e.g. `[1234,5678]`

`ig_account_ids`

list<numeric string or integer>

`data_source`

Object

Indicates by which method the custom audience was created, defined by the `type` and `subtype` of the `data_source`

`type`

enum {UNKNOWN, FILE\_IMPORTED, EVENT\_BASED, SEED\_BASED, THIRD\_PARTY\_IMPORTED, COPY\_PASTE, CONTACT\_IMPORTER, HOUSEHOLD\_AUDIENCE}

Type of the custom audience

`sub_type`

enum {ANYTHING, NOTHING, HASHES, USER\_IDS, HASHES\_OR\_USER\_IDS, MOBILE\_ADVERTISER\_IDS, EXTERNAL\_IDS, MULTI\_HASHES, TOKENS, EXTERNAL\_IDS\_MIX, HOUSEHOLD\_EXPANSION, SUBSCRIBER\_LIST, WEB\_PIXEL\_HITS, MOBILE\_APP\_EVENTS, MOBILE\_APP\_COMBINATION\_EVENTS, VIDEO\_EVENTS, WEB\_PIXEL\_COMBINATION\_EVENTS, PLATFORM, MULTI\_DATA\_EVENTS, IG\_BUSINESS\_EVENTS, STORE\_VISIT\_EVENTS, INSTANT\_ARTICLE\_EVENTS, FB\_EVENT\_SIGNALS, FACEBOOK\_WIFI\_EVENTS, AR\_EXPERIENCE\_EVENTS, AR\_EFFECTS\_EVENTS, MESSENGER\_ONSITE\_SUBSCRIPTION, WHATSAPP\_SUBSCRIBER\_POOL, MARKETPLACE\_LISTINGS, AD\_CAMPAIGN, GROUP\_EVENTS, ENGAGEMENT\_EVENT\_USERS, CUSTOM\_AUDIENCE\_USERS, PAGE\_FANS, CONVERSION\_PIXEL\_HITS, APP\_USERS, S\_EXPR, DYNAMIC\_RULE, CAMPAIGN\_CONVERSIONS, WEB\_PIXEL\_HITS\_CUSTOM\_AUDIENCE\_USERS, MOBILE\_APP\_CUSTOM\_AUDIENCE\_USERS, COMBINATION\_CUSTOM\_AUDIENCE\_USERS, VIDEO\_EVENT\_USERS, FB\_PIXEL\_HITS, IG\_PROMOTED\_POST, PLACE\_VISITS, OFFLINE\_EVENT\_USERS, EXPANDED\_AUDIENCE, SEED\_LIST, PARTNER\_CATEGORY\_USERS, PAGE\_SMART\_AUDIENCE, MULTICOUNTRY\_COMBINATION, PLATFORM\_USERS, MULTI\_EVENT\_SOURCE, SMART\_AUDIENCE, LOOKALIKE\_PLATFORM, SIGNAL\_SOURCE, MAIL\_CHIMP\_EMAIL\_HASHES, CONSTANT\_CONTACTS\_EMAIL\_HASHES, COPY\_PASTE\_EMAIL\_HASHES, CUSTOM\_DATA\_TARGETING, CONTACT\_IMPORTER, DATA\_FILE}

Subtype of the custom audience

`metadata`

Object

`calculated_date`

datetime

`schema_version`

string

`session`

Object

Information about the session. Sessions are used when you have a lot of users to upload. For example, if you have 1 million users to upload, you need to split them into at least 100 requests because each request can only take 10k users. Specify the session info so that you can track if the session has finished or not.

`session_id`

int64

Advertiser generated session identifier, used to track the session. Needs to be unique in the same ad account.

`estimated_num_total`

int64

Estimated total num of users to be uploaded in this session, used by Facebook systems to better process this session.

`batch_seq`

int64

A 1 based sequence number to identify the request in the session.

`last_batch_flag`

boolean

`true` mean this request is the last request in this session. You must mark the last request otherwise Facebook doesn't know the session has ended

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`audience_id`: numeric string,

`session_id`: numeric string,

`num_received`: int32,

`num_invalid_entries`: int32,

`invalid_entry_samples`: Map {

string: string

},

`subscription_info`: Struct {

`whatsapp`: Struct {

`error`: Struct {

`message`: string,

`code`: int32,

},

`num_subscribers_received`: int32,

`num_subscribers_invalid_entries`: int32,

`invalid_subscribers_entry_samples`: Map {

string: string

},

},

},

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

2650

Failed to update the custom audience

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

105

The number of parameters exceeded the maximum for this operation

194

Missing at least one required parameter

[](#)

## Excluindo

You can dissociate a [User](/docs/graph-api/reference/user/) from a [CustomAudience](/docs/marketing-api/reference/custom-audience/) by making a DELETE request to [`/{custom_audience_id}/users`](/docs/marketing-api/reference/custom-audience/users/).

### Parâmetros

Parâmetro

Descrição

`payload`

Object

Payload representing users to delete

`schema`

string

`EMAIL_SHA256`, `PHONE_SHA256`, `MOBILE_ADVERTISER_ID`. One can also pass an array of multiple keys for multi-key match. Supported key types includes:  
`EXTERN_ID`  
`EMAIL`  
`PHONE`  
`GEN`  
`DOBY`  
`DOBM`  
`DOBD`  
`LN`  
`FN`  
`FI`  
`CT`  
`ST`  
`ZIP`  
`MADID`  
`COUNTRY`  
The multi-key array is of the form `["EMAIL", "LN", "FN", "ZIP"]`

`is_raw`

boolean

Is the key raw? If the keys are combinational keys like "LN\_FN\_ZIP", set this to `false`, otherwise set this to `true`. Default to false

`data`

list<JSON array>

Array with users data. If the multi-key feature is used, a two-dimensional array of the form `[["<HASHED_EMAIL>", "<HASHED_FN>", "<HASHED_LN>", "<HASHED_ZIP>"], ["", "<HASHED_FN>", "<HASHED_LN>", "<HASHED_ZIP>"]]` should be passed.In case a key is unknown, it should be left blank.

`app_ids`

list<int>

App ids used by the users being uploaded. This field is required when `schema` is a Facebook UID and the IDs were collected by an App integration. e.g. `[1234,5678]`

`page_ids`

list<Page ID>

Page ids used by the users being uploaded. This field is required when `schema` is a Facebook UID and the IDs were collected by a Page webhook integration. e.g. `[1234,5678]`

`ig_account_ids`

list<numeric string or integer>

`data_source`

Object

Indicates by which method the custom audience was created, defined by the `type` and `subtype` of the `data_source`

`type`

enum {UNKNOWN, FILE\_IMPORTED, EVENT\_BASED, SEED\_BASED, THIRD\_PARTY\_IMPORTED, COPY\_PASTE, CONTACT\_IMPORTER, HOUSEHOLD\_AUDIENCE}

Type of the custom audience

`sub_type`

enum {ANYTHING, NOTHING, HASHES, USER\_IDS, HASHES\_OR\_USER\_IDS, MOBILE\_ADVERTISER\_IDS, EXTERNAL\_IDS, MULTI\_HASHES, TOKENS, EXTERNAL\_IDS\_MIX, HOUSEHOLD\_EXPANSION, SUBSCRIBER\_LIST, WEB\_PIXEL\_HITS, MOBILE\_APP\_EVENTS, MOBILE\_APP\_COMBINATION\_EVENTS, VIDEO\_EVENTS, WEB\_PIXEL\_COMBINATION\_EVENTS, PLATFORM, MULTI\_DATA\_EVENTS, IG\_BUSINESS\_EVENTS, STORE\_VISIT\_EVENTS, INSTANT\_ARTICLE\_EVENTS, FB\_EVENT\_SIGNALS, FACEBOOK\_WIFI\_EVENTS, AR\_EXPERIENCE\_EVENTS, AR\_EFFECTS\_EVENTS, MESSENGER\_ONSITE\_SUBSCRIPTION, WHATSAPP\_SUBSCRIBER\_POOL, MARKETPLACE\_LISTINGS, AD\_CAMPAIGN, GROUP\_EVENTS, ENGAGEMENT\_EVENT\_USERS, CUSTOM\_AUDIENCE\_USERS, PAGE\_FANS, CONVERSION\_PIXEL\_HITS, APP\_USERS, S\_EXPR, DYNAMIC\_RULE, CAMPAIGN\_CONVERSIONS, WEB\_PIXEL\_HITS\_CUSTOM\_AUDIENCE\_USERS, MOBILE\_APP\_CUSTOM\_AUDIENCE\_USERS, COMBINATION\_CUSTOM\_AUDIENCE\_USERS, VIDEO\_EVENT\_USERS, FB\_PIXEL\_HITS, IG\_PROMOTED\_POST, PLACE\_VISITS, OFFLINE\_EVENT\_USERS, EXPANDED\_AUDIENCE, SEED\_LIST, PARTNER\_CATEGORY\_USERS, PAGE\_SMART\_AUDIENCE, MULTICOUNTRY\_COMBINATION, PLATFORM\_USERS, MULTI\_EVENT\_SOURCE, SMART\_AUDIENCE, LOOKALIKE\_PLATFORM, SIGNAL\_SOURCE, MAIL\_CHIMP\_EMAIL\_HASHES, CONSTANT\_CONTACTS\_EMAIL\_HASHES, COPY\_PASTE\_EMAIL\_HASHES, CUSTOM\_DATA\_TARGETING, CONTACT\_IMPORTER, DATA\_FILE}

Subtype of the custom audience

`metadata`

Object

`calculated_date`

datetime

`schema_version`

string

`session`

Object

Information about the session. Sessions are used when you have a lot of users to upload. For example, if you have 1 million users to upload, you need to split them into at least 100 requests because each request can only take 10k users. Specify the session info so that you can track if the session has finished or not.

`session_id`

int64

Advertiser generated session identifier, used to track the session. Needs to be unique in the same ad account.

`estimated_num_total`

int64

Estimated total num of users to be uploaded in this session, used by Facebook systems to better process this session.

`batch_seq`

int64

A 1 based sequence number to identify the request in the session.

`last_batch_flag`

boolean

`true` mean this request is the last request in this session. You must mark the last request otherwise Facebook doesn't know the session has ended

### Return Type

Struct {

`audience_id`: numeric string,

`session_id`: numeric string,

`num_received`: int32,

`num_invalid_entries`: int32,

`invalid_entry_samples`: Map {

string: string

},

`subscription_info`: Struct {

`whatsapp`: Struct {

`error`: Struct {

`message`: string,

`code`: int32,

},

`num_subscribers_received`: int32,

`num_subscribers_invalid_entries`: int32,

`invalid_subscribers_entry_samples`: Map {

string: string

},

},

},

}

### Error Codes

Erro

Descrição

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

100

Invalid parameter

200

Permissions error

2650

Failed to update the custom audience

190

Invalid OAuth 2.0 Access Token

2635

You are calling a deprecated version of the Ads API. Please update to the latest version.

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)