---
title: "Graph API Referência v24.0: Custom Audience Usersreplace"
source: "https://developers.facebook.com/docs/marketing-api/reference/custom-audience/usersreplace"
scraped_at: "2026-02-01T15:43:05.802Z"
---

Versão Graph API

[v24.0](#)

# Custom Audience Usersreplace

[](#)

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

You can make a POST request to `usersreplace` edge from the following paths:

-   [`/{custom_audience_id}/usersreplace`](/docs/marketing-api/reference/custom-audience/usersreplace/)

When posting to this edge, no Graph object will be created.

### Parâmetros

Parâmetro

Descrição

`namespace`

string

namespace

`payload`

Object

payload

Obrigatório

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

session

Obrigatório

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

2650

Failed to update the custom audience

100

Invalid parameter

200

Permissions error

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

80003

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#custom-audience.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)