---
title: "Graph API Referência v24.0: Product Catalog Home Listings"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/home_listings/"
scraped_at: "2026-02-01T16:14:48.559Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Home Listings

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `home_listings` edge from the following paths:

-   [`/{product_catalog_id}/home_listings`](/docs/marketing-api/reference/product-catalog/home_listings/)

When posting to this edge, a [HomeListing](/docs/marketing-api/reference/home-listing/) will be created.

### Parâmetros

Parâmetro

Descrição

`address`

Object

The address of the home listing

Obrigatório

`city`

string

Obrigatório

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

`availability`

string

The availability of the home listing

Obrigatório

`currency`

ISO 4217 Currency Code

Currency for the listing

Obrigatório

`description`

string

Description of the home listing

`home_listing_id`

string

ID of the home listing

Obrigatório

`images`

list<Object>

Links to home listing images. Please note that carousel format utilizes a square 1:1 aspect ratio images (recommended size - 600x600px) while single hotel ad uses 1.91:1 aspect ratio image(recommended size - 1200x630px). Please provide at least one image.

Obrigatório

`image_url`

URL

Obrigatório

`tags`

list<string>

`listing_type`

string

Listing type of the property

`name`

string

Name of the home listing

Obrigatório

`num_baths`

float

Number of baths for the home listing

`num_beds`

float

Number of beds for the home listing

`num_units`

float

Number of units for the home listing

`price`

float

The price for this home listing

Obrigatório

`property_type`

string

Property type of the home listing

`url`

URL

Link to the external site where you can view the listing

Obrigatório

`year_built`

int64

Year built

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

10800

Duplicate retailer\_id when attempting to create a store collection

100

Invalid parameter

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)