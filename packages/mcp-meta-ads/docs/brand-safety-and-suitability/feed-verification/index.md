---
title: "API de Verificação do Feed - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/feed-verification/"
scraped_at: "2026-02-01T14:32:01.765Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/brand-safety-and-suitability/feed-verification/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 22 de dez de 2025  
Atualização em Português (Brasil): 19 de ago de 2025

# Feed Verification API

Measure, verify and understand the suitability of content.

## Permissions

-   The app requires the `brand_safety_feed_verification` capability grant.

[](#)

## Get an adjacent content delivery report

### Get the available date range for the report

**Example**

First, get the data availability range for a specific placement:

**Sample Request**

```
GET /adjacent_content_delivery_report_date_ranges
?platform=facebook
&position=feed
&fields=earliest_datetime,latest_datetime,missing_datetimes
```

**Sample Response**

```
{
  "data": [
    {
      "earliest_datetime": "2024-02-16T00:00",
      "latest_datetime": "2024-02-31T23:00",
      "missing_datetimes": [
        "2024-02-23T18:00",
        "2024-02-25T05:00"
      ]
    }
  ]
}
```

#### Parameters

Parameter

Type

Required (Y/N)

Default

Description

platform

enum

Y

Ads reporting platform type. Accepted values are: facebook, instagram, threads.

position

enum

Y

Ads reporting platform position type. Accepted values are: feed, reels.

is\_download

boolean

N

false

Indicates whether or not to get the available date range for file-based adjacent content delivery reports.

### Get a business level (file-based) adjacent content delivery report

#### Purpose

Fetch all ad impressions for a business partner per hour. The lookback period is 15 days. Each result will contain a list of objects with metadata for the files that contain metadata about the adjacent (above/below) content. Note that only _public_ content in the _supported languages_ is returned.

#### Parameters

Parameter

Type

Required (Y/N)

Default

Description

platform

enum

Y

Ads reporting platform type. Currently, only facebook is supported.

position

enum

Y

Ads reporting platform position type. Accepted values are: feed, reels.

datetime

datetime

Y

Datetime of the report in format: \[YYYY\]-\[MM\]-\[DD\]T\[HH\]:00.

#### Fields

The data body returns a: `List<AdjacentContentDeliveryReportFile>` nodes. The node structs and fields are defined below.

Field

Type

Default

Description

name

string

X

Globally unique string to identify the impression.

download\_url

string

X

URL to download the compressed JSONL file (GZIP).

index

int

X

Integer that represents the ordering of the files for a given hourly report. 1 represents the first chunk of the report.

When the file is decompressed, each line of the JSONL file will represent a JSON object with the below structure.

Field

Type

Default

Description

time\_key

datetime

X

Datetime of the report in format: \[YYYY\]-\[MM\]-\[DD\]T\[HH\]:00.

ad\_account\_id

fbid

X

ID of the ad account whose ad belongs to.

campaign\_id

fbid

X

ID of the ad campaign whose ad belongs to.

ad\_set\_id

fbid

X

ID of the ad set whose ad belongs to.

ad\_id

fbid

X

ID of the ad which contains information about the display of an ad, including ad creative (image, video, text, etc.).

impression\_id

fbid

X

ID of the impression.

above\_content\_id

fbid

X

ID of the above adjacent post content. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

above\_content\_root\_id

fbid

X

Root ID of the above adjacent post content. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

above\_content\_owner\_id

fbid

X

ID of the above adjacent post owner. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

above\_content\_root\_owner\_id

fbid

X

ID of the above adjacent post's root post's owner. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

above\_content\_language

enum

X

Language of the above adjacent post content in [ISO 639-1](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_639-1&h=AT2QGBfewX54KAXcq9EDq-334kv6vtV6NsSB3o0-ZPogy2WD8daU1wblni-YUi6Gq0F52aVT1HLjv9p6ZfDQ_8RIng9ECTEyjquXM_r3jP75Icn-ITLNv4HUZn3UVHT87sP7tsT4N4lOCpB2HvkVlb-90l6ACtaXObXgMB9iDMw) code format. A value of **null** indicates the language is _undetectable_. Supported languages are: Arabic (ar), English (en), Spanish (es), French (fr), Portuguese (pt), Chinese (zh), German (de), Assamese (as), Bengali (bn), Bhojpuri (bp), Gujarati (gu), Hindi (hi), Italian (it), Japanese (ja), Kannada (kn), Malayalam (ml), Marathi (mr), Malay (ms), Oriya (or), Punjabi (pa), Polish (pl), Swedish (sv), Tamil (ta), Telugu (te), Thai (th), Turkish (tr), Urdu (ur), Vietnamese (vi).

above\_content\_position

enum

X

Position of the above adjacent post content relative to the ad. This is currently always set to _above._

above\_content\_distance

integer

X

Distance of the above adjacent post content from the ad. This is currently always _1._

above\_content\_privacy

enum

X

Privacy of the above adjacent post content. This can be either _public_ or _private._

below\_content\_id

fbid

X

ID of the below adjacent post content. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

below\_content\_root\_id

fbid

X

Root ID of the below adjacent post content. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

below\_content\_owner\_id

fbid

X

ID of the below adjacent post owner. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

below\_content\_root\_owner\_id

fbid

X

ID of the below adjacent post's root post's owner. A value of **null** indicates the content or owner is _private_. This field is ONLY returned for FB placements.

below\_content\_language

enum

X

Language of the below adjacent post content in [ISO 639-1](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_639-1&h=AT3McjPutLVRX0PpSO6NQ0A3BRhVu-Fkvh3HRtb_iW7qml3HLtozcI8uuGxn7FlN1Dw2YB6wb1DrWCvKLmEttOd8C5AiNm2zsNjIHGPtxgObBmg0BVq1dMy6XA6EsVPHB_jjTY0Wzm_W2nTINT3DsX3JGJbASp7ZGllAqlGSekI) code format. A value of **null** indicates the language is _undetectable_. Supported languages are: Arabic (ar), English (en), Spanish (es), French (fr), Portuguese (pt), Chinese (zh), German (de), Assamese (as), Bengali (bn), Bhojpuri (bp), Gujarati (gu), Hindi (hi), Italian (it), Japanese (ja), Kannada (kn), Malayalam (ml), Marathi (mr), Malay (ms), Oriya (or), Punjabi (pa), Polish (pl), Swedish (sv), Tamil (ta), Telugu (te), Thai (th), Turkish (tr), Urdu (ur), Vietnamese (vi).

below\_content\_position

enum

X

Position of the below adjacent post content relative to the ad. This is currently always set to _below._

below\_content\_distance

integer

X

Distance of the below adjacent post content from the ad. This is currently always _1._

below\_content\_privacy

enum

X

Privacy of the below adjacent post content. This can be either _public_ or _private._

#### Example Request for Facebook Feed

```
GET https://api.facebook.com/adjacent_content_delivery_reports/{business_id}/file_download
?platform=facebook
&position=feed
&datetime=2025-11-05T00:00
-H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Sample Response**

```
{
  "data": [
    {
      "name": "brand_suitability_facebook_feed_2025-11-05T00:00_biz_<BUSINESS_ID>_1_of_25.jsonl.gz",
      "download_url": "<DOWNLOAD_URL>",
      "index": 1
    },
    {
      "name": "brand_suitability_facebook_feed_2025-11-05T00:00_biz_<BUSINESS_ID>_2_of_25.jsonl.gz",
      "download_url": "<DOWNLOAD_URL>",
      "index": 2
    },
    {
      "name": "brand_suitability_facebook_feed_2025-11-05T00:00_biz_<BUSINESS_ID>_3_of_25.jsonl.gz",
      "download_url": "<DOWNLOAD_URL>",
      "index": 3
    }
  ]
}
```

### Get an adset level content delivery report

This API requires “read” (i.e. “View Performance”) permission on the ad account.

#### Purpose

Fetch all ad impressions for an ad set per hour. The lookback period is 15 days. Each result will contain a list of objects with metadata for the adjacent (above/below) content. Note that only public content in the supported languages is returned.

#### Parameters

Parameter

Type

Required (Y/N)

Default

Description

platform

enum

Y

Ads reporting platform type. Accepted values are: facebook, instagram, threads.

position

enum

Y

Ads reporting platform position type. Accepted values are: feed, reels.

datetime

datetime

N

Latest available datetime

Datetime of the report in format: \[YYYY\]-\[MM\]-\[DD\]T\[HH\]:00.

advertiser\_time\_zone

boolean

N

false

Indicates whether the provided datetime is in the advertiser's time zone. If omitted or set to false, it defaults to Pacific Time (PT).

limit

integer

N

25

Controls the number of results returned. The range is \[25, 5000\].

#### Fields

The data body returns a: `List<AdjacentContentDeliveryReport>` nodes. The node structs and fields are defined below.

`AdjacentContentDeliveryReport`

Field

Type

Default (Y/N)

Description

impression\_id

string

Y

Globally unique string to identify the impression.

ad\_id

fbid

Y

ID of the ad which contains information about the display of an ad, including ad creative (image, video, text, etc.).

content

List<`AdjacentContentDeliveryReportItem`\>

Y

List of adjacent content items.

`AdjacentContentDeliveryReportItem`

Field

Type

Default (Y/N)

Description

content\_id

fbid

Y

ID of the adjacent post content. A value of null indicates the content or owner is private. This field is ONLY returned for FB placements.

content\_owner\_id

fbid

Y

ID of the adjacent post owner. A value of null indicates the content or owner is private. This field is ONLY returned for FB placements.

content\_root\_id

fbid

Y

Root ID of the adjacent post content. A value of null indicates the content or owner is private. This field is ONLY returned for FB placements.

content\_root\_owner\_id

fbid

Y

ID of the adjacent post’s root post’s owner. A value of null indicates the content or owner is private. This field is ONLY returned for FB placements.

content\_language

enum

Y

Language of the adjacent post content in [ISO 639-1](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_639-1&h=AT2upWD67fASKh2xX2pOIKBH0zPvAw09tYOPJPGChHjuEux261Iab78BO_dXgZ7J8qed5h4ApConrIrLHfhpqiUKY1KjpGiFe4L3EK8q06XxuCRtZqwsbqoOO5qzi0wxJzPoCrU9N9RxRDtIjc5XeiU-SzcU2yU4FTYCA-3SC68) code format. A value of null indicates the language is undetectable. The 34 supported languages are: Arabic (ar), Assamese (as), Bengali (bn), Bhojpuri (bp), Chinese (zh), Dutch (nl), English (en), French (fr), German (de), Gujarati (gu), Hebrew (he), Hindi (hi), Indonesian (id), Italian (it), Japanese (ja), Kannada (kn), Korean (ko), Malay (ms), Malayalam (ml), Marathi (mr), Oriya (or), Polish (pl), Portuguese (pt), Punjabi (pa), Romanian (ro), Spanish (es), Swedish (sv), Tamil (ta), Telugu (te), Thai (th), Turkish (tr), Ukranian (uk), Urdu (ur), Vietnamese (vi).

content\_position

enum

Y

Position of the adjacent post content relative to the ad. This is either above or below.

content\_distance

integer

Y

Distance of the adjacent post content from the ad. This is currently always 1.

content\_privacy

enum

Y

Privacy of the adjacent post content. This can be either public or private.

### Summary

Field

Type

Default

Description

earliest\_datetime

datetime

Y

Earliest datetime available for the report.

latest\_datetime

datetime

Y

Latest datetime available for the report.

total\_count

integer

Y

Total number of rows in the report.

### Example Request for Facebook Feed

```
GET /{ad_set_id}/adjacent_content_delivery_report
?platform=facebook
&position=feed
&datetime=2024-02-31T23:00
&summary=total_count,earliest_datetime,latest_datetime
&limit=1
```

**Sample Response**

```
{
  "data": [
    {
      "impression_id": "db54b9e4c062e27a0d8cbb6289e20a433fab2e1124b01a0547e4...",
      "ad_id": "<AD_ID>",
      "content": [
        {
          "content_id": "<CONTENT_ID>",
          "content_owner_id": "<CONTENT_OWNER_ID>",
          "content_root_id": "<CONTENT_ROOT_ID>",
          "content_root_owner_id": "<CONTENT_ROOT_OWNER_ID>",
          "content_language": "en",
          "content_position": "above",
          "content_distance": 1,
          "content_privacy": "public"
        },
        {
          "content_id": "<CONTENT_ID>",
          "content_owner_id": "<CONTENT_OWNER_ID>",
          "content_language": "en",
          "content_position": "below",
          "content_distance": 1,
          "content_privacy": "public"
        }
      ]
    }
  ],
...
  "summary": {
    "total_count": 8,
    "earliest_datetime": "2024-02-16T00:00",
    "latest_datetime": "2024-02-31T23:00"
  }
}
```

### Example Request for Instagram Feed

```
GET /{ad_set_id}/adjacent_content_delivery_report
?platform=instagram
&position=feed
&datetime=2024-02-31T23:00
&summary=total_count,earliest_datetime,latest_datetime
&limit=1
```

**Sample Response**

```
{
  "data": [
    {
      "impression_id": "db54b9e4c062e27a0d8cbb6289e20a433fab2e1124b01a0547e4...",
      "ad_id": "<AD_ID>",
      "content": [
        {
          "content_id": "<CONTENT_ID>",
          "content_owner_id": "<CONTENT_OWNER_ID>",
          "content_language": "en",
          "content_position": "above",
          "content_distance": 1,
          "content_privacy": "public"
        },
        {
          "content_id": "<CONTENT_ID>",
          "content_owner_id": "<CONTENT_OWNER_ID>",
          "content_language": "es",
          "content_position": "below",
          "content_distance": 1,
          "content_privacy": "public"
        }
      ]
    }
  ],
...
  "summary": {
    "total_count": 10,
    "earliest_datetime": "2024-02-16T00:00",
    "latest_datetime": "2024-02-31T23:00"
  }
}
```

[](#)

## Error Codes

See also [Marketing API | Error Reference](https://developers.facebook.com/docs/marketing-api/error-reference)

Code

Subcode

Description

100

Invalid Parameter.

2349046

Invalid Platform Parameter.

2349047

Invalid Position Parameter.

2349048

Date Out Of Range.

2349049

Invalid Cursor.

200

Permissions error.

80011

There have been too many calls to Brand Safety APIs. Wait a bit and try again.

`fbtrace_id`: Internal support identifier. When reporting a bug related to a Graph API call, include the fbtrace\_id to help us find log data for debugging

[](#)

## Facebook Feed APIs

### Post API

**Purpose**

Fetch metadata and attachments for an individual post in a profile's Facebook feed. The profile could be a user, page, app, or group.

**Note:** This API requires [Page Public Content Access](/docs/features-reference/page-public-content-access) app review permission.

**Sample Request**

```
GET /{owner_id}_{post_id}
?fields=attachments,created_time,updated_time,message,message_tags,from,permalink_url
```

**Sample Response**

```
{
  "attachments": {
    "data": [
      {
        "media": {
          "image": {
            "height": 720,
            "src": "https://scontent-sjc3-1.xx.fbcdn.net/v/t15.5256-10/272984469_5122311034448813_518990337139554929_n.jpg?stp=dst-jpg_s720x720&_nc_cat=110&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=qt2qVTfvjHIAX9f425U&_nc_ht=scontent-sjc3-1.xx&oh=00_AT8YgL5mkADtXc3epplcoaCUoIoaed1Lm8COkOGg7Uy9ug&oe=62EFF2F1",
            "width": 408
          },
          "source": "https://video-sjc3-1.xx.fbcdn.net/v/t42.1790-2/272804096_325253656025909_4477570199643303140_n.mp4?_nc_cat=102&ccb=1-7&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=4aUJY_YNKRoAX9vw-uh&_nc_ht=video-sjc3-1.xx&oh=00_AT-0SqEtLcDdswiJ-bh021rF2_OtN3OUMDkt3TZZhRYuAw&oe=62ECB13C"
        },
        "target": {
          "id": "5122289161117667",
          "url": "https://www.facebook.com/brookselitelandscapes/videos/5122289161117667/"
        },
        "title": "RVA Home Show 2022",
        "type": "video_autoplay",
        "url": "https://www.facebook.com/brookselitelandscapes/videos/5122289161117667/"
      }
    ]
  },
  "created_time": "2022-01-30T20:17:04+0000",
  "updated_time": "2022-02-18T12:11:50+0000",
  "message": "🤩 We are so excited to have finally met so many of our Facebook followers in person￼, current customers and potential customers￼ out here at the RVA Home Show!! THANK YOU ALL so much for coming and checking out our booth at our first show!￼! 🙌  if you did not have a chance to make it out here, we've put together a quick video to share the experience with you 📸 Thank you again for all of the continued support! ￼￼(Techo-Bloc)",
  "message_tags": [
    {
      "id": "216754038360102",
      "name": "Techo-Bloc",
      "type": "page",
      "offset": 416,
      "length": 10
    }
  ],
  "from": {
    "name": "Brooks Elite Landscapes",
    "id": "332104164111679"
  },
  "permalink_url": "https://www.facebook.com/332104164111679/posts/951866525468770/",
  "id": "332104164111679_951866525468770"
}
```

### Video API

**Purpose**

Fetch metadata and downloadable source file for an individual video on Facebook.

**Sample Request**

```
GET /{video_id}
?fields=permalink_url,source,created_time,updated_time,from,description,picture
```

**Sample Response**

```
{
  "permalink_url": "/brookselitelandscapes/videos/773275220658768/",
  "source": "https://video-sjc3-1.xx.fbcdn.net/v/t39.25447-2/296672208_3302846743372673_5139359605630684497_n.mp4?_nc_cat=102&vs=16d3a1916d225711&_nc_vs=HBksFQAYJEdORGJyaEdCNF9MdTY3c0xBRkhObS1KVXJGSkhibWRqQUFBRhUAAsgBABUAGCRHTWREcWhGdTM0WUhPNkVBQUo2S25RNlNqWlVwYnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAmlqmRwqfdzQMVAigKc2FuZGNhc3RsZRgLdnRzX3ByZXZpZXccF0BdEQYk3S8bGClkYXNoX2k0bGl0ZWJhc2ljXzVzZWNnb3BfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50BDMxOTERb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA83NzMyNzUyMjA2NTg3NjgSb2VtX3ZpZGVvX2Fzc2V0X2lkEDUyMjg2MjA5NTcxNzU0NDEVb2VtX3ZpZGVvX3Jlc291cmNlX2lkEDEwMTUzNTI3NTI0ODI4OTEcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAxMzc4NTMyODI1OTY4OTUxDnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQ3OTA1AmNkCjIwMjItMDctMjgDcmNiBDMxMDADYXBwE0ZhY2Vib29rIGZvciBpUGhvbmUCY3QZQ09OVEFJTkVEX1BPU1RfQVRUQUNITUVOVBNvcmlnaW5hbF9kdXJhdGlvbl9zBzExNi4zMDkCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=41a7d5&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=czalgyZgc1YAX9VjHuC&_nc_ht=video-sjc3-1.xx&oh=00_AT--2EefgQ54VCSNMmiSpC2I3rLV5IWuHQBWZv63sB-qKw&oe=62F039D4&_nc_rid=401297287969366",
  "created_time": "2022-07-28T23:29:13+0000",
  "updated_time": "2022-08-02T22:34:22+0000",
  "from": {
    "name": "Brooks Elite Landscapes",
    "id": "332104164111679"
  },
  "description": "👋 Welcome to our next job site in Mechanicsville!",
  "picture": "https://scontent-sjc3-1.xx.fbcdn.net/v/t15.5256-10/296266458_3171248163095396_202928376065076133_n.jpg?stp=dst-jpg_s160x160&_nc_cat=101&ccb=1-7&_nc_sid=08861d&_nc_ohc=XcFNSij3VIUAX-WxgHV&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-mZFUSES-e5dX0AKzhKZUuebsrTgilMYBWPSubpe_2SQ&oe=62F03711",
  "id": "773275220658768"
}
```

### Photo API

**Purpose**

Fetch metadata and downloadable source file for an individual photo on Facebook.

**Sample Request**

```
GET /{photo_id}
?fields=name,created_time,updated_time,alt_text,from,picture
```

**Sample Response**

```
{
  "name": "Imagen: turismosensanluis.com.ar",
  "created_time": "2021-07-21T03:45:08+0000",
  "updated_time": "2021-09-16T18:27:17+0000",
  "alt_text": "No photo description available.",
  "from": {
    "name": "San Luis Obispo",
    "id": "159567030739714"
  },
  "picture": "https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/222344358_4718187764877595_3802832716004072819_n.jpg?stp=dst-jpg_s130x130&_nc_cat=111&ccb=1-7&_nc_sid=caaa8d&_nc_ohc=dqsbq8fkIlcAX_kVvF8&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-vo2xKwJllejk4P6FwvW39QWsff-XjmqTDMscg0pLiwg&oe=62F04213",
  "id": "4718187754877596"
}
```

### Page API

This API requires the [Page Public Content Access](https://developers.facebook.com/docs/features-reference/page-public-content-access) app review permission.

**Purpose**

Fetch detailed information about a page on Facebook.

**Sample Request**

```
GET /{page_id}
?fields=name,about,business,category,link
```

**Sample Response**

```
{
  "name": "Capital T Industries",
  "about": "We own the earth.",
  "business": {
    "id": "981914045859716",
    "name": "Capital T Industries"
  },
  "category": "Computer Company",
  "link": "https://www.facebook.com/1955398231373718",
  "id": "1955398231373718"
}
```

### Instagram Media API

This API requires capability grant to the app.

This is accessed via graph.facebook.com (not graph.instagram.com)

**Purpose**

Fetch metadata for content in a profile's Instagram feed.

**Request Signature:**

GET ig\_3pv\_{content-id}/?fields=caption,permalink,shortcode,thumbnail\_url,timestamp,media\_url ,comments\_count,like\_count,media\_product\_type,child\_media\_ids,child\_media\_fbids,is\_comment\_enabled,username,media\_type,update\_time

**Parameters:**

Field

Type

Description

caption

string

Caption. Excludes album children. The @ symbol is excluded.

child\_media\_ids

array

Array of child media ids. Only available for CAROUSEL\_ALBUM media. Includes cover media as a child media. These are in order in which the media appears on Feed.

child\_media\_fbids

array

Array of child media ids. Only available for CAROUSEL\_ALBUM media. Includes cover media as a child media. These are in order in which the media appears on Feed.

comments\_count

integer

Count of comments on the media. Excludes comments on album child media and the media's caption. Includes replies to comments.

is\_comment\_enabled

boolean

Indicates if comments are enabled or disabled. Excludes album children.

like\_count

integer

Count of likes on the media, including replies to comments. Excludes likes on album child media and likes on promoted posts created from the media.

If queried indirectly through another endpoint or field expansion:

-   v10.0 and older calls: The value is 0 if the media owner has hidden like counts.
    
-   v11.0+ calls: The like\_count field is omitted if the media owner has hidden like counts.
    

media\_product\_type

string

Surface where the media is published. Can be AD, FEED, STORY or REELS.

media\_type

string

Media type. Can be CAROUSEL\_ALBUM, IMAGE, or VIDEO.

media\_url

string

The URL for the media.

permalink

string

Permanent URL to the media.

shortcode

string

Shortcode to the media.

thumbnail\_url

string

Media thumbnail URL. Only available on VIDEO media.

timestamp

string

ISO 8601-formatted creation date in UTC (default is UTC ±00:00).

username

string

Username of user who created the media.

update\_time

string

ISO 8601-formatted timestamp indicating the last time the media object was updated in UTC (default is UTC ±00:00).

The update\_time field is refreshed when the following fields are changed:

-   media\_url
-   is\_comment\_enabled
-   caption
-   thumbnail\_url

Other fields will not affect update\_time.

Note: In some cases, update\_time may change even if none of the above fields have been updated, due to underlying system updates.

**Sample Request**

```
GET 
aWaBc789dfbWVkaWFfM31234B267rSTjE3OEAdDef56zY2?fields=caption,permalink,shortcode,thumbnail_url,timestamp,media_url,comments_count,like_count, media_product_type,child_media_ids,is_comment_enabled,username,media_type,update_time
```

**Sample Response**

```
{
  "caption": "This is test caption 👏",
  "permalink": "https://www.instagram.com/p/abCPermAlinkDEf/",
  "shortcode": "https://www.instagram.com/p/abCPermAlinkDEf/",
  "timestamp": "2023-03-15",
  "media_url": "https://scontent-sjc3-1.cdninstagram.com/v/t51.29350-15/33469898463_551845628803718194_857885682206876323153_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=9pqbSMGxGE4AXU8eXIdX&_nc_oc=AQnEgfjngsKlF12SscbgTCLDxgeHIhJPiZOgFPJ90L0jLpp2_TEjApSfprx-VfW6KSBfWzNmmGlO1aL1OgvmSV01NW&_nc_ht=scontent-sjc3-1.cdninstagram.com&edm=ABWH0kIBBEAAAA&oh=00_AfB9h8KEyB18uVdD0MvkB88Bce4da6b_oSwzKtByK0Bg5Ntew&oe=64397E65",
  "comments_count": 527,
  "like_count": 32385,
  "media_product_type": "FEED",
  "child_media_ids": [
    "aWdfbW123SG45VkaWFfM3B2OjE4M78aBCI1NjY5MzM0MDA0",
    "aWdf28AbWVkaWFfM3B2OjE4MjczMzYyNzg4MTQ45LMyNzE3",
    "aWd7XyZ8fbWVkaWFfM3B2OjE4MjEzNzE0NzMwMTY4NzgHYy",
    "aWd3Mn45fbWVkaWFfM3B2OjE3OTU0MTg0NTM5NDQ0OTE2aZ"
  ],
  "is_comment_enabled": true,
  "username": "test_username",
  "media_type": "CAROUSEL_ALBUM"
  "update_time": "2023-09-15T12:01:09+00:00"
}
```

**Note:** `thumbnail_url` is omitted in the above example response because `thumbnail_url` is only present for video media types. The `thumbnail_url`’s value type is similar to `media_url`.

[](#)

## Ads APIs

This API requires “read” (i.e. “View Performance”) permission on the ad account.

**Purpose**

Fetch details about an ad account, which is a business, person or other entity who creates and manages ads on Facebook.

### Ad Account API

Reference [Ad Account](https://developers.facebook.com/docs/marketing-api/reference/ad-account) for a complete list of ad account fields.

**Sample Request**

```
GET /act_{account_id}
?fields=account_status,name,owner,created_time,timezone_name,currency,amount_spent,spend_cap,business_country_code,brand_safety_content_filter_levels
```

**Sample Response**

```
{
  "account_status": 1,
  "name": "Capital T Industries",
  "owner": "981914045859716",
  "created_time": "2022-04-04T17:41:28-0700",
  "timezone_name": "America/Los_Angeles",
  "currency": "USD",
  "amount_spent": "14255",
  "spend_cap": "25000",
  "business_country_code": "US",
  "brand_safety_content_filter_levels": [
    "AN_STRICT",
    "FACEBOOK_STRICT",
    "FEED_RELAXED"
  ],

  "id": "act_972376150317754"
}
```

### Ad Set API

This API requires “read” (i.e. “View Performance”) permission on the ad account.

**Purpose**

Fetch details about an ad set, which is a group of ads that share the same daily or lifetime budget, schedule, bid type, bid info, and targeting data. The supported ad placement to enum value mapping is below:

-   Facebook Feed: `targeting.facebook_positions.feed`
-   Facebook Reels: `targeting.facebook_positions.facebook_reels`
-   Instagram Feed: `targeting.instagram_positions.stream`
-   Instagram Reels: `targeting.instagram_positions.reels`

**Sample Request**

Reference [Ad Set](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/) for a complete list of ad set fields and [Placement Targeting](https://developers.facebook.com/docs/marketing-api/audiences/reference/placement-targeting/) for a complete list of targeting fields.

```
GET /{ad_set_id}
?fields=name,effective_status,start_time,end_time,daily_budget,daily_spend_cap,targeting
```

**Sample Response**

```
{
  "name": "New Traffic Ad Set",
  "effective_status": "ACTIVE",
  "start_time": "2022-04-04T18:11:53-0700",
  "daily_budget": "400",
  "targeting": {
    "age_max": 65,
    "age_min": 18,
    "geo_locations": {
      "countries": [
        "US",
        "IN"
      ],
      "location_types": [
        "home",
        "recent"
      ]
    },
    "targeting_optimization": "none",
    "brand_safety_content_filter_levels": [
      "AN_STRICT",
      "FACEBOOK_STRICT",
      "FEED_RELAXED"
    ],
    "excluded_brand_safety_content_types": [
      "INSTREAM_LIVE"
    ],
    "publisher_platforms": [
      "facebook"
    ],
    "facebook_positions": [
      "feed",
      "biz_disco_feed",
      "facebook_reels",
      "facebook_reels_overlay",
      "video_feeds",
      "instream_video",
      "marketplace",
      "story",
      "search"
    ],
    "instagram_positions": [
      "stream",
      "ig_search",
      "story",
      "explore",
      "reels",
      "explore_home",
      "profile_feed"
    ],
    "device_platforms": [
      "mobile",
      "desktop"
    ]
  },
  "id": "23850518998920104"
}
```

### Ad Set Insights API

This API requires “read” (i.e. “View Performance”) permission on the ad account.

**Purpose**

Fetch metrics (e.g. impressions) for an ad set, which can include estimated or in-development metrics.

**Sample Request**

```
GET /{ad_set_id}/insights
?fields=impressions,spend
&breakdowns=publisher_platform,platform_position
&time_range={'since': '2022-07-15', 'until': '2022-08-03'}
```

**Sample Response**

```
{
  "data": [
    {
      "impressions": "203407",
      "spend": "60.988484",
      "date_start": "2022-07-15",
      "date_stop": "2022-08-03",
      "publisher_platform": "facebook",
      "platform_position": "feed"
    },
    {
      "impressions": "41134",
      "spend": "7.651064",
      "date_start": "2022-07-15",
      "date_stop": "2022-08-03",
      "publisher_platform": "facebook",
      "platform_position": "facebook_reels_overlay"
    },
    {
      "impressions": "56981",
      "spend": "3.250452",
      "date_start": "2022-07-15",
      "date_stop": "2022-08-03",
      "publisher_platform": "facebook",
      "platform_position": "instream_video"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MgZDZD"
    }
  }
}
```

[](#)

## Embed APIs

This API requires oEmbed Read app review permission.

**Purpose**

Embed HTML and basic metadata for public Facebook and Instagram pages, posts, and videos.

An alternative to the oEmbed API is to [Embed Posts](https://developers.facebook.com/docs/plugins/embedded-posts/) directly into the webpage using the JavaScript SDK or an iFrame. The `permalink_url` for a post can be obtained from the Post API.

### oEmbed API

**Sample Request**

```
GET /oembed_post?url={post_url}
```

**Sample Response**

```
{
  "author_name": "Facebook",
  "author_url": "https://www.facebook.com/20531316728",
  "provider_url": "https://www.facebook.com",
  "provider_name": "Facebook",
  "html": "<div id=\"fb-root\"></div>
<script async=\"1\" defer=\"1\" crossorigin=\"anonymous\" src=\"https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v14.0\" nonce=\"7OdAy1bh\"></script><div class=\"fb-post\" data-href=\"https://www.facebook.com/20531316728/posts/10154009990506729/\" data-width=\"552\"><blockquote cite=\"https://graph.facebook.com/20531316728/posts/10154009990506729/\" class=\"fb-xfbml-parse-ignore\">Posted by <a href=\"https://www.facebook.com/20531316728\">Facebook</a> on&nbsp;<a href=\"https://graph.facebook.com/20531316728/posts/10154009990506729/\">Thursday, August 27, 2015</a></blockquote></div>",
  "type": "rich",
  "version": "1.0",
  "width": 552
}
```

### Additional Useful Documentation

[Graph API - Overview](https://developers.facebook.com/docs/graph-api/overview)

For a user-friendly, interactive UI, try out [Meta’s Graph API Explorer](https://developers.facebook.com/tools/explorer/)

[Marketing API | Best Practices](https://developers.facebook.com/docs/marketing-api/best-practices)

[Marketing API | Authorization](https://developers.facebook.com/docs/marketing-api/overview/authorization)

[API Changelog | Developer Doc](https://developers.facebook.com/docs/graph-api/changelog)

[System Users | Developer Doc](https://developers.facebook.com/docs/marketing-api/system-users#generate-token)

[Access Tokens | Developer Doc](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)

[](#)

## FAQs

Q: How to link the data across various datasets (marketing API, to ad impressions and campaign information, to content)?

A: Content is connected by content\_id and/or content\_owner\_id between the Brand Safety Adjacent Content Delivery Report (ACDR) API and the respective content APIs (e.g. Post, Video, Page, etc.). The various ad APIs are connected by ad object (e.g. ad\_account\_id, adset\_id, etc.). Is each line a unique impression, will we need to deduplicate data/rows? Each row is a unique ad impression containing the adjacent content that appeared above and below the ad. Note that the adjacent content itself can be duplicated, since the same post can appear next to different ad impressions.

Q: How often should we pull data from each API?

A: New data is available from the Brand Safety ACDR API on a daily cadence with an average latency of ~9 hours.

Q: What is the time zone of the data set?

A: The time zone is based on the configured time zone of the ad account that owns the ad set.

Q: What time zone are the public APIs set?

A: Most platform APIs (e.g. Post, Video, etc.) include time zone information, meaning the datetimes are available as a Unix or ISO 8601 timestamp and can be converted to other time zones as needed. Insights APIs (e.g. Ad Account Insights, Ad Set Insights, etc.) and the Brand Safety ACDR API are in the time zone of the owning ad account.

Q: What are the parameters for the API?

A: The two required parameters are platform and position. The date field is optional and will use the most recent data available if omitted.

Q: Do we need some kind of indicator to get the content information from the public API?

A: The Brand Safety ACDR API response will include a content\_id and content\_owner\_id which can be used to fetch a post and attachment metadata from the Post API.

Q: How do we understand linked content, images and videos within posts?

A: The Post API has an attachments field that will return all content (images, videos, etc.) attached to the post. The response will include identifier and type information for each attachment. Additional metadata can be fetched using the identifier and the respective content API for the type (e.g. Video, Photo, etc.).

Q: How do we understand reposted content?

A: Reposted (i.e. shared) posts will have a unique identifier distinct from the original post. If a post is created via a share, then the type value will be “share” in the attachment object of the Post API response.

Q: How can an advertiser grant “read” (i.e. “View Performance”) access to an ad account?

A: An advertiser can grant READ access to a partner for their ad account using the “Assign Partners” button in Business Setting.

[](#)