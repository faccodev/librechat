---
title: "Graph API Referência v24.0: Product Catalog Vehicles"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/vehicles/"
scraped_at: "2026-02-01T16:17:00.297Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Vehicles

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `vehicles` edge from the following paths:

-   [`/{product_catalog_id}/vehicles`](/docs/marketing-api/reference/product-catalog/vehicles/)

When posting to this edge, a [ProductCatalog](/docs/marketing-api/reference/product-catalog/) will be created.

### Parâmetros

Parâmetro

Descrição

`address`

JSON object

address

Obrigatório

`city`

string

Valor padrão: `""`

city

`city_id`

string

city\_id

`country`

string

Valor padrão: `""`

country

`latitude`

float

latitude

`longitude`

float

longitude

`neighborhoods`

array<string>

neighborhoods

`postal_code`

string

Valor padrão: `""`

postal\_code

`region`

string

Valor padrão: `""`

region

`street_address`

string

Valor padrão: `""`

street\_address

`applinks`

Object

applinks

`web`

`android`

`ios`

`ipad`

`iphone`

`windows_phone`

`availability`

enum {AVAILABLE, NOT\_AVAILABLE, PENDING, UNKNOWN}

availability

`body_style`

enum {CONVERTIBLE, COUPE, CROSSOVER, ESTATE, GRANDTOURER, HATCHBACK, MINIBUS, MINIVAN, MPV, PICKUP, ROADSTER, SALOON, SEDAN, SMALL\_CAR, SPORTSCAR, SUPERCAR, SUPERMINI, SUV, TRUCK, VAN, WAGON, OTHER, NONE}

body\_style

Obrigatório

`condition`

enum {EXCELLENT, VERY\_GOOD, GOOD, FAIR, POOR, OTHER, NONE}

condition

`currency`

ISO 4217 Currency Code

currency

Obrigatório

`date_first_on_lot`

string

date\_first\_on\_lot

`dealer_id`

string

dealer\_id

`dealer_name`

string

dealer\_name

`dealer_phone`

string

dealer\_phone

`description`

string

description

Obrigatório

`drivetrain`

enum {TWO\_WD, FOUR\_WD, AWD, FWD, RWD, OTHER, NONE}

drivetrain

`exterior_color`

string

exterior\_color

Obrigatório

`fb_page_id`

string

fb\_page\_id

`fuel_type`

enum {DIESEL, ELECTRIC, GASOLINE, FLEX, HYBRID, OTHER, PETROL, PLUGIN\_HYBRID, NONE}

fuel\_type

`images`

list<Object>

images

Obrigatório

`image_url`

URL

Obrigatório

`tags`

list<string>

`interior_color`

string

interior\_color

`make`

string

make

Obrigatório

`mileage`

JSON object

mileage

Obrigatório

`unit`

enum {KILOMETERS, MILES}

Valor padrão: `"MILES"`

unit

`value`

int64

Valor padrão: `0`

value

`model`

string

model

Obrigatório

`price`

int64

price

Obrigatório

`state_of_vehicle`

enum {NEW, USED, CPO}

state\_of\_vehicle

Obrigatório

`title`

string

title

Obrigatório

`transmission`

enum {AUTOMATIC, MANUAL, OTHER, NONE}

transmission

`trim`

string

trim

`url`

URI

url

Obrigatório

`vehicle_id`

string

vehicle\_id

Obrigatório

`vehicle_type`

enum {BOAT, CAR\_TRUCK, COMMERCIAL, MOTORCYCLE, OTHER, POWERSPORT, RV\_CAMPER, TRAILER}

vehicle\_type

`vin`

string

vin

Obrigatório

`year`

int64

year

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

200

Permissions error

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)