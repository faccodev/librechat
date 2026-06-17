---
title: "Graph API Referência v24.0: Product Catalog Hotels"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/hotels/"
scraped_at: "2026-02-01T16:15:00.771Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Hotels

[](#)

Hotels in a catalog used in Dynamic Ads for Travel. See [Dynamic Ads for Travel, Catalog Setup](/docs/marketing-api/dynamic-ads-for-travel/catalog).

**When you use this, you can provide [Batch Requests](/docs/marketing-api/batch-requests) to combine a number of API calls into one HTTP request.**

For example, to get the total number of hotels in a catalog:

```
curl -G \
-d "summary=total_count" \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/hotels
```

To fetch hotels whose name contains "suites":

```
curl -G \
-d 'fields=["hotel_id","name"]' \
-d 'filter={"name":{"i_contains":"suites"}}' \
-d 'access_token=<ACCESS_TOKEN>'
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/hotels
```

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

### Example

Example to create a hotel:

```
curl \
-X POST \
-F "hotel_id=h_157" \
-F "name=Sample Hotel" \
-F "images= [ \
  {'image_url':'http://www.example.com/pic1.jpg', 'tags':['front view']}, \
  {'image_url':'http://www.example.com/pic2.jpg', 'tags':['lobby view']} \
]" \
-F "url=http://www.example.com/samplehotel" \
-F "address={ \
  street_address:'1 Hacker Way', \
  city:'Menlo Park', \
  region:'California', \
  country:'United States', \
  postal_code:'94025', \
  neighborhoods:['Palo Alto','Menlo Park'], \
  latitude:37.484116, \
  longitude:-122.148244 \
}" \
-F "brand=hotel brand" \
-F "description=hotel description" \
-F "guest_ratings= [ \
  {'score':7.8, 'rating_system':'sample_rating', 'number_of_raters':780} \
]" \
-F "star_rating=4" \
-F "loyalty_program=Sample rewards club" \
-F "phone=+351234123456" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/hotels
```

You can make a POST request to `hotels` edge from the following paths:

-   [`/{product_catalog_id}/hotels`](/docs/marketing-api/reference/product-catalog/hotels/)

When posting to this edge, a [Hotel](/docs/marketing-api/reference/hotel/) will be created.

### Parâmetros

Parâmetro

Descrição

`address`

Object

The address of the hotel

Obrigatório

`city`

string

Obrigatório

`city_id`

string

`country`

string

Obrigatório

`latitude`

float

Obrigatório

`longitude`

float

Obrigatório

`neighborhoods`

list<string>

`postal_code`

string

`region`

string

Obrigatório

`street_address`

string

Obrigatório

`applinks`

Object

App links for native platforms, e.g. Android, IOS and Windows Phone.

`web`

`android`

`ios`

`ipad`

`iphone`

`windows_phone`

`base_price`

int64

The base price of the hotel

`brand`

string

Hotel brand

`currency`

ISO 4217 Currency Code

Valor padrão: `USD`

The currency for base\_price, e.g. USD

`description`

string

Description of the hotel

Obrigatório

`guest_ratings`

list<Object>

Guest ratings for this hotel.

`score`

float

Obrigatório

`max_score`

int64

Obrigatório

`rating_system`

string

Obrigatório

`number_of_raters`

int64

Obrigatório

`hotel_id`

string

A unique identifier for this hotel provided by advertiser. (i.e. from the `id` field in the feed

`images`

list<Object>

Links to hotel images. Please note that carousel format utilizes a square 1:1 aspect ratio images (recommended size - 600x600px) while single hotel ad uses 1.91:1 aspect ratio image(recommended size - 1200x630px). Please provide at least one image.

Obrigatório

`image_url`

URL

Obrigatório

`tags`

list<string>

`name`

string

Name of the hotel

Obrigatório

`phone`

phone number string

Hotel's phone number

`star_rating`

float

The star rating of the hotel

`url`

URL

Link to the external site where you can book a hotel room

Obrigatório

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

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)