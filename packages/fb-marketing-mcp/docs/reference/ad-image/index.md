---
title: "Graph API Referência v24.0: Ad Image"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-image/"
scraped_at: "2026-02-01T16:06:04.537Z"
---

Versão Graph API

[v24.0](#)

# 

Ad, Image

[](#)

Upload and manage images to later use in [ad creative](/docs/marketing-api/adcreative/). Image formats, sizes and design guidelines depend up on your type of ad, see [Ads Guide](https://www.facebook.com/business/ads-guide/). See [Image Crop](/docs/marketing-api/image-crops/) and [Ads Guide](https://www.facebook.com/business/ads-guide/).

[](#)

## Leitura

Image for use in ad creatives can be uploaded and managed independently of the ad itself. The image used in an ad creative can be specified in the following ways:

-   By image hash value of a previously uploaded image.
-   By uploading the image at ad or ad creative creation time.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

token with structure: ID

The ID of the image.

`account_id`

numeric string

The ad account that owns the image.

`created_time`

datetime

Time the image was created.

`creatives`

list<numeric string>

A list of ad creative IDs that this ad image is being used in. Not applicable for creatives using `object_story_spec` and a URL in the `picture` field.

`hash`

string

The hash which uniquely identifies the image.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`height`

unsigned int32

The height of the image.

`is_associated_creatives_in_adgroups`

bool

SELF\_EXPLANATORY

`name`

string

The filename of the image. The maximum length of this string is 100 characters.

`original_height`

unsigned int32

The height of the image that was originally uploaded.

`original_width`

unsigned int32

The width of the image that was originally uploaded.

`permalink_url`

string

A permanent URL of the image to use in story creatives.

`status`

enum {ACTIVE, INTERNAL, DELETED}

Status of the image.

`updated_time`

datetime

Time the image was updated.

`url`

string

A temporary URL which the image can be retrieved at. **Do not use this URL in ad creative creation**.

`url_128`

string

A temporary URL pointing to a version of the image resized to fit within a 128x128 pixel box

`width`

unsigned int32

The width of the image.

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

Upload an image or zip file, get back a hash, and use the hash in an ad or creative. You must include a filename extension such as `sample.jpg`, not `sample` or `sample.tmp`.

### Examples

#### bytes

```
curl \
  -F 'bytes=iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAOVBMVEX///87WZg7WZg7WZg7WZg7WZg7WZg7WZg7WZg7WZg7WZhMeMJEaa5Xi9tKdb0+Xp5Wi9tXjNxThNH+wk/7AAAACnRSTlMAsHIoaM7g/fx9Zr/g5QAAAGlJREFUeNplkFsOwCAIBPGJrtbX/Q/bqm1qwnxuJrBAE6OVD15pQy/WYePsDiIjp9FGyuC4DK7l6pOrVH4s41D6R4EzpJGXsa0MTQqp/yQo8hhHMuApoB1JQ5COnCN3yT6ys7xL3i7/cwMYsAveYa+MxAAAAABJRU5ErkJggg=='
  -F 'access_token=<ACCESS_TOKEN>' \
"https://graph.facebook.com/<API_VERSION>/act_<ACCOUNT_ID>/adimages"
```

#### Upload an Image on Create

You can upload an image instead of using an image hash when you create an ad or ad creative. Add the image file to the multi-part MIME POST and specify the file name. For example:

```
curl \
  -F 'campaign_id=<AD_SET_ID>' \
  -F 'creative={"title":"test title","body":"test","object_url":"http:\/\/www.test.com","image_file":"test.jpg"}' \
  -F 'test.jpg=@test.jpg'
  -F 'name=My ad' \
  -F 'access_token=<ACCESS_TOKEN>' \
"https://graph.facebook.com/<API_VERSION>/act_<ACCOUNT_ID>/ads"
```

The response contains:

Name

Description

id

ID of the ad

  

#### Copying Images

To copy an ad image from one account to another, make a `POST` request to `/act_{DESTINATION_ACCOUNT_ID}/adimages`. Provide the source account ID without the `act_` prefix and a hash of the image in `copy_from`. This copies the image from the source to the destination account. **Your app's user must have access to read the creatives from the source account** or you cannot copy images from the account.

```
curl \
  -F 'copy_from={"source_account_id":"<SOURCE_ACCOUNT_ID>", "hash":"02bee5277ec507b6fd0f9b9ff2f22d9c"}'
  -F 'access_token=<ACCESS_TOKEN>' 
"https://graph.facebook.com/<API_VERSION>/act_<DESTINATION_ACCOUNT_ID>/adimages"
```

  

You can make a POST request to `adimages` edge from the following paths:

-   [`/act_{ad_account_id}/adimages`](/docs/marketing-api/reference/ad-account/adimages/)

When posting to this edge, an [AdImage](/docs/marketing-api/reference/ad-image/) will be created.

### Parâmetros

Parâmetro

Descrição

`bytes`

Base64 UTF-8 string

Image file. Example: `bytes = <image content in bytes format>`

`copy_from`

JSON or object-like arrays

This copies the Ad Image from the source to the destination account.  
`{"source_account_id":"<SOURCE_ACCOUNT_ID>"`, `"hash":"02bee5277ec507b6fd0f9b9ff2f22d9c"}`

`source_account_id`

numeric string

`hash`

string

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `images` in the return type.

Map {

string: Map {

string: Struct {

`hash`: string,

`url`: string,

`url_128`: string,

`url_256`: string,

`url_256_height`: string,

`url_256_width`: string,

`height`: int32,

`width`: int32,

`name`: string,

}

}

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

613

Calls to this api have exceeded the rate limit.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can only delete ad images **not currently being used** in an ad creative.

You can dissociate an [AdImage](/docs/marketing-api/reference/ad-image/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/adimages`](/docs/marketing-api/reference/ad-account/adimages/).

### Parâmetros

Parâmetro

Descrição

`hash`

string

Hash of the image you wish to delete.

Obrigatório

`image_id`

string

ID of the image you wish to delete.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

[](#)