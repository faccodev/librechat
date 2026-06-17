---
title: "Ad Videos"
source: "https://developers.facebook.com/docs/marketing-api/advideo"
scraped_at: "2026-02-01T14:12:00.782Z"
---

Versão Graph API

[v24.0](#)

# Ad Videos

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `advideos` edge from the following paths:

-   [`/act_{ad_account_id}/advideos`](/docs/marketing-api/reference/ad-account/advideos/)

When posting to this edge, a [Video](/docs/graph-api/reference/video/) will be created.

### Parâmetros

Parâmetro

Descrição

`audio_story_wave_animation_handle`

string

Everstore handle of wave animation used to burn audio story video

`composer_session_id`

string

SELF\_EXPLANATORY

`description`

UTF-8 string

SELF\_EXPLANATORY

Supports Emoji

`edit_description_spec`

JSON object

This represents the schema that the client should send to WWW for the edit description spec during video upload.

`screen_readers`

array<JSON object>

`end_offset`[](#)

int64

end\_offset

`file_size`[](#)

int64

The size of the video file in bytes. Using during [chunked upload](/docs/marketing-api/advideo/#chunked).

`file_url`

string

SELF\_EXPLANATORY

`fisheye_video_cropped`

boolean

Whether the single fisheye video is cropped or not

`front_z_rotation`

float

The front z rotation in degrees on the single fisheye video

`name`

string

The name of the video in the library.

`og_action_type_id`

numeric string or integer

SELF\_EXPLANATORY

`og_icon_id`

numeric string or integer

SELF\_EXPLANATORY

`og_object_id`

OG object ID or URL string

SELF\_EXPLANATORY

`og_phrase`

string

SELF\_EXPLANATORY

`og_suggestion_mechanism`

string

SELF\_EXPLANATORY

`original_fov`

int64

Original field of view of the source camera

`original_projection_type`[](#)

enum {equirectangular, cubemap, half\_equirectangular}

Original Projection type of the video being uploaded

`prompt_id`[](#)

string

SELF\_EXPLANATORY

`prompt_tracking_string`[](#)

string

SELF\_EXPLANATORY

`referenced_sticker_id`

numeric string or integer

SELF\_EXPLANATORY

`source`

string

The video, encoded as form data. See the [Video Format](/docs/graph-api/reference/video-format) doc for more details on video formats.

`start_offset`[](#)

int64

The start position in byte of the chunk that is being sent, inclusive. Used during [chunked upload](/docs/marketing-api/advideo/#chunked).

`time_since_original_post`

int64

SELF\_EXPLANATORY

`title`

UTF-8 string

The name of the video being uploaded. Must be less than 255 characters. Special characters may count as more than 1 character.

Supports Emoji

`transcode_setting_properties`[](#)

string

Properties used in computing transcode settings for the video

`unpublished_content_type`

enum {SCHEDULED, SCHEDULED\_RECURRING, DRAFT, PUBLISH\_PENDING, ADS\_POST, INLINE\_CREATED, PUBLISHED, REVIEWABLE\_BRANDED\_CONTENT}

SELF\_EXPLANATORY

`upload_phase`[](#)

enum {start, transfer, finish, cancel}

The phase during chunked upload. Using during [chunked upload](/docs/marketing-api/advideo/#chunked).

`upload_session_id`[](#)

numeric string or integer

The session ID of this chunked upload. Using during [chunked upload](/docs/marketing-api/advideo/#chunked).

`video_file_chunk`[](#)

string

The chunk of the video, between `start_offset` and `end_offset`. Using during [chunked upload](/docs/marketing-api/advideo/#chunked).

### Return Type

Struct {

`id`: numeric string,

`upload_session_id`: numeric string,

`video_id`: numeric string,

`start_offset`: numeric string,

`end_offset`: numeric string,

`success`: bool,

`skip_upload`: bool,

`upload_domain`: string,

`region_hint`: string,

`xpv_asset_id`: numeric string,

`is_xpv_single_prod`: bool,

`transcode_bit_rate_bps`: numeric string,

`transcode_dimension`: numeric string,

`should_expand_to_transcode_dimension`: bool,

`action_id`: string,

`gop_size_seconds`: numeric string,

`target_video_codec`: string,

`target_hdr`: string,

`maximum_frame_rate`: numeric string,

}

### Error Codes

Erro

Descrição

200

Permissions error

100

Invalid parameter

222

Video not visible

389

Unable to fetch video file from URL.

190

Invalid OAuth 2.0 Access Token

352

The video file you selected is in a format that we don't support.

6001

There was a problem uploading your video. Please try again.

382

The video file you tried to upload is too small. Please try again with a larger file.

351

There was a problem with your video file. Please try again with another file,

6000

There was a problem uploading your video file. Please try again with another file.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

You can dissociate a [Video](/docs/graph-api/reference/video/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/advideos`](/docs/marketing-api/reference/ad-account/advideos/).

### Parâmetros

Parâmetro

Descrição

`video_id`

video ID

Ad account library video ID

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

613

Calls to this api have exceeded the rate limit.

100

Invalid parameter

[](#)