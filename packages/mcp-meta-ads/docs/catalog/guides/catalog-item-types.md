---
title: "Tipos de itens de catálogo - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/catalog-item-types"
scraped_at: "2026-02-01T15:51:47.268Z"
---

# Tipos de itens de catálogo

Os itens de catálogo abrangem diferentes tipos de objetos que podem ser anunciados e/ou vendidos nas tecnologias da Meta. Existem restrições quanto aos tipos de itens que podem ou não ser criados, dependendo do valor do [campo "vertical"](/docs/marketing-api/reference/product-catalog/#fields).

Por exemplo, não será possível adicionar um item do tipo "HOTEL" a um catálogo com vertical=’commerce’. A tabela abaixo resume as opções possíveis.

Tipo de item

Setor do catálogo

Pontos de extremidade relevantes da API

DESTINATION

destinations

[destination](/docs/graph-api/reference/destination/)

[catalog/destinations](/docs/marketing-api/reference/product-catalog/destinations/)

[product-set/destinations](/docs/marketing-api/reference/product-set/destinations/)

FLIGHT

flights

[flight](/docs/graph-api/reference/flight/)

[catalog/flights](/docs/marketing-api/reference/product-catalog/flights/)

[product-set/flights](/docs/marketing-api/reference/product-set/flights/)

HOME\_LISTING

home\_listings

[home listing](/docs/graph-api/reference/home-listing/)

[catalog/home\_listings](/docs/marketing-api/reference/product-catalog/home_listings/)

[product-set/home\_listings](/docs/marketing-api/reference/product-set/home_listings/)

HOTEL

hotels

[hotel](/docs/graph-api/reference/hotel/)

[catalog/hotels](/docs/marketing-api/reference/product-catalog/hotels/)

[product-set/hotels](/docs/marketing-api/reference/product-set/hotels/)

HOTEL\_ROOM

hotels

[hotel room](/docs/graph-api/reference/hotel-room/)

[hotel/hotel\_rooms](/docs/marketing-api/reference/hotel/hotel_rooms/)

PRODUCT\_ITEM

commerce

[product item](/docs/marketing-api/reference/product-item/)

[catalog/products](/docs/marketing-api/reference/product-catalog/products/)

[product-set/products](/docs/marketing-api/reference/product-set/products/)

[product\_group/products](/docs/marketing-api/reference/product-group/products/)

STORE\_PRODUCT\_ITEM

commerce

VEHICLE

vehicles

[vehicle](/docs/marketing-api/reference/vehicle/)

[catalog/vehicles](/docs/marketing-api/reference/product-catalog/vehicles/)

[product-set/vehicles](/docs/marketing-api/reference/product-set/vehicles/)

VEHICLE\_OFFER

vehicle\_offers

[catalog/vehicle\_offers](/docs/marketing-api/reference/product-catalog/vehicle_offers/)

[product-set/vehicle\_offers](/docs/marketing-api/reference/product-set/vehicle_offers/)

[](#)