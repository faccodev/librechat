---
title: "Programar feeds - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/scheduled-feeds"
scraped_at: "2026-02-01T15:51:41.974Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/catalog/guides/scheduled-feeds/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 11 de nov de 2025  
Atualização em Português (Brasil): 18 de mar de 2024

# Schedule Data Feed Uploads

Use this guide to upload and schedule your feed.

## Upload Your Feed

To upload a feed, you need `catalog_management` permission. See [Marketing API, Permissions](/docs/marketing-api/access#access_token). After you create a catalog, use `catalog id` to create and schedule a [Product Feed](/docs/marketing-api/reference/product-feed):

```
v24.0
```

The `schedule` parameter enables you to schedule your feed upload. Options include `interval`, `url`, `hour`. It can also include `day_of_week`, `minute`, `username`, and `password`.

**Note**: For `username` and `password`, we support basic auth on HTTP and FTP.

**Example** — Schedule Your Feed Upload

```
schedule: {"day_of_week":"FRIDAY","hour":17,"interval_count":1,"interval":"DAILY","minute":42,"next_scheduled_upload_time":"","password":pwd123,"status":"active","timezone":"Atlantic/Canary","url":"https://www.abc.com","username":aname}
```

[](#)

## Update an Individual Item

Update an individual item's data in real time. Include the updated fields in an `HTTP POST`, where `retailer_id` is the item ID from your feed. It must be base64url-encoded.

```
https://graph.facebook.com/catalog:{CATALOG_ID}:{base64urlencode(retailer_id)}
```

See mutable fields in [Products, Reference](/docs/marketing-api/reference/product-catalog/products/#Creating).

**Do not provide item feeds with individual item updates, creation, or deletion with the API.** This can disrupt any updates or deletes of items you created with the API because we don't track these with the feed.

[](#)

## Schedule Data Feed Fetches

Scheduled feeds don't support uploads more frequently than once per hour. If you need to update inventory faster, we recommend to use the [Direct Upload API](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog/#direct-upload-product-feed).

If you're using our API to create and manage your feeds, you need to send us an API request with details for the update schedule you want to create:

```
curl \
  -F 'name=Test Feed' \
  -F 'update_schedule={ 
    "interval": "HOURLY", 
    "url": "http:\/\/www.example.com\/sample_feed_updates.tsv",
    "hour": 22
  }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/product_feeds
```

We fetch item feeds from your system on a schedule you define. There are two types of schedules you can define:

-   `update_schedule` — The uploads create new items or update existing ones with the information provided in the data feed file.
-   `schedule` — The uploads result in a complete refresh operation on your data feed. We delete items not present in the file, update existing ones, and create new ones. You can use either of the schedules, or both, depending on your needs.

For example: `update_schedule` with frequency `HOURLY` and a replace `schedule` with frequency `DAILY`.

We recommend setting up an `update_schedule` with only changed data in the data feed file for faster processing of feed. This is particularly better for holiday sales and faster price and availability updates. It's also recommended to mark items as "out of stock" rather than deleting from the feed so that we can retarget the user with similar available items.

```
curl \
  -F 'name=Test Feed' \
  -F 'schedule={ 
    "interval": "DAILY", 
    "url": "http:\/\/www.example.com\/sample_feed.tsv"
  }' \
  -F 'update_schedule={ 
    "interval": "HOURLY", 
    "url": "http:\/\/www.example.com\/sample_feed_updates.tsv",
    "hour": 22
  }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/product_feeds
```

Response:

```
{ "id" : {FEED_ID} }
```

See [Data Feed Reference](/docs/marketing-api/reference/product-feed/), [Data Feed Schedule Reference](/docs/marketing-api/reference/product-feed-schedule).

[](#)

## Learn More

-   [Feed API, Commerce](/docs/marketing-api/catalog/guides/feed-api)
-   [Perform One-Time Direct Upload](/docs/marketing-api/catalog/guides/feed-api#direct-upload-feed)
-   [Manual Product Feed Uploads, Reference](/docs/marketing-api/reference/product-feed/uploads/)
-   [Product Feed Upload Errors, Reference](/docs/marketing-api/reference/product-feed-upload/errors/)
-   [Request a Data Feed Upload Error Report](https://developers.internmc.facebook.com/docs/marketing-api/catalog/support#data-feed-upload-report)
-   [Get the Error Report Status](https://developers.internmc.facebook.com/docs/marketing-api/catalog/support#status-error-report)
-   [Fix Feed Upload Errors with Rules](https://developers.internmc.facebook.com/docs/marketing-api/catalog/support#feed-rules)
-   [Troubleshoot Your Data Feed, Support](https://developers.internmc.facebook.com/docs/marketing-api/catalog/support#troubleshoot-your-data-feed)
-   [Prepare and Set Up Catalog for Advantage+ Catalog Ads, Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fcollection%2F240330%2Fpath%2F210141%3Fcontent_id%3DE0G2EVplyh1dDB1&h=AT2pfGEDX4w2nHeNu7laH1XcekDadzjtUZe5IJG-epU5gLvCgMDAFU5sL3RWsAWEbEEW2kordZ_eF4hLsxmweogLBuQegtm9thDMJKmYywupGIZ9HS_x_3IkI8BRuTpTbGTwv5I95XpoMDM0zbq20LZMWOG3pE2whWCHW3twTlM)
-   [Live Training on Catalog, Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fcollection%2F240330%2Fpath%2F210150%3Fcontent_id%3D3AB46yBUG6YtkZC&h=AT3YUpwN-9KI-WnQMn8qLzsU2PChWWqyY-JeqZIRi5ZjJBxJY6z4lr7UOqtAKvsvy2tnl4yetKe1_BX7w2LgcZdj5xCb2A6nIItXuDowgtVXuCZSnU-YBmcF4i54cehiKKuTfhzZaTPt0QIFbmetTAae3orn_kk1qyyF6f80w9A)

-   [Scheduled Feeds Using Google Sheets](https://developers.facebook.com/docs/marketing-api/catalog/reference/#google-sheets)

[](#)