---
title: "Graph API Referência v24.0: Product Catalog Localized Items Batch"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/localized_items_batch/"
scraped_at: "2026-02-01T16:15:10.743Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Localized Items Batch

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `localized_items_batch` edge from the following paths:

-   [`/{product_catalog_id}/localized_items_batch`](/docs/marketing-api/reference/product-catalog/localized_items_batch/)

When posting to this edge, no Graph object will be created.

The [sample API call](#sample-api-call) provides an example of how this API endpoint works in practice.

### Limitations

-   This endpoint does not create new catalog items. All requests should contain a data JSON object that contains an ID for an existing catalog item.
    
-   The `requests` param can contain up to 5,000 items.
    
-   For each catalog, you can make a number of calls per minute defined by the [Catalog Batch](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/#catalog) business use case rate limit formula. If that's not sufficient, please contact us.
    
-   Error code 1 with message "_Please reduce the amount of data you're asking for, then retry your request_" indicates that the size of the data (in bytes) received in API request is too large. To fix this issue, please reduce the number of items in the batch and try again. This will ensure that the request is within the acceptable size limits and can be processed successfully.
    

### Parâmetros

Parâmetro

Descrição

`item_type`

string

The type of items in the request. Needs to be one of the values listed [here](https://developers.facebook.com/docs/marketing-api/catalog/guides/catalog-item-types). Note that the information specified in this field is NOT a [product category](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-categories/) (a concept used for item\_type=PRODUCT\_ITEM).

Obrigatório

`requests`

JSON object

A JSON array of up to 5000 records, each containing 3 fields:

-   method: one of CREATE/UPDATE/DELETE
-   data: a map containing product field names and the corresponding values. The list of fields supported in product localization is given [here](https://developers.facebook.com/docs/marketing-api/catalog/guides/localized-catalog/supported-fields). The descriptions of the fields can be found on the [/items\_batch](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/) endpoint documentation page.  
    **Note**: `price`, `sale_price`, `unit_price`, `base_price`, `status` (visibility), and `availability` must only be provided in a country feed. These fields cannot be provided in a language feed. This helps ensure customers see the correct localized product data.
    -   When the method is CREATE, this object must contain all the required fields for the specified item\_type.
    -   When the method is UPDATE, it can contain any fields.
    -   A request with method=DELETE is expected to contain only the 'id' field
-   localization: a map containing the following two values:
    -   type: Supported values: `LANGUAGE`, `COUNTRY`, or `LANGUAGE_AND_COUNTRY`
    -   value: Can be any valid language or county code, depending on the selected type. Note that for `LANGUAGE_AND_COUNTRY`, the values should be separated by a '|' character, for example, `en_XX|US`. See a list of language and country codes [here](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).

The [example call](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/localized_items_batch#sample-api-call) below demonstrates how the request parameter can be passed

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`handles`: List \[

string

\],

`validation_status`: List \[

Struct {

`errors`: List \[

Struct {

`message`: string,

}

\],

`retailer_id`: string,

`warnings`: List \[

Struct {

`message`: string,

}

\],

}

\],

}

### Error Codes

Erro

Descrição

80014

There have been too many calls for the batch uploads to this catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#catalog.

200

Permissions error

100

Invalid parameter

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Response Payload Specification

### For a Successful Call

Field

Description

handles

An array of strings, containing either 0 or 1 value. An empty array means that nothing has been ingested. This value can be passed to the [/check\_batch\_request\_status](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/check_batch_request_status/) endpoint to get the status of the request's processing.

validation\_status

An array of `ValidationStatus` objects (see below)

A `ValidationStatus` object has the following fields:

Field

Description

retailer\_id

Row identifier from one of the records in the ‘requests’ parameter

errors

An array of `Error` objects (see below)

warnings

An array of `Error` objects (see below)

An `Error` object has the following structure

Field

Description

message

A human-readable string providing an explanation of what is the issue with provided catalog item data.

### For a Failed Call

Failed calls return the standard [Error Payload](https://developers.facebook.com/docs/graph-api/guides/error-handling/).

[](#)

## Sample API Call

[Try it in Graph Explorer](https://developers.facebook.com/tools/explorer/?method=POST&path=PASTE_CATALOG_ID_HERE%2Flocalized_items_batch&requests=[%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%22method%22%3A%22UPDATE%22%2C%0A%20%20%20%20%20%20%20%20%20%22data%22%3A%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%22wrong_field_name%22%3A%20%22Wrong%20field%20value%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20%22batch_api_product_123%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20%22Produkt%22%2C%0A%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%22localization%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22language%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%22pl_PL%22%0A%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%7D%0A%20]&item_type=PRODUCT_ITEM)

A call that updates the Polish version of the title for the item with id=batch\_api\_product\_123

Request

```
curl -i -X POST \
https://graph.facebook.com/<CATALOG_ID>/localized_items_batch \
 -F access_token=<TOKEN> \
 -F 'requests=[
     {
         "method":"UPDATE",
         "data":{
             "wrong_field_name": "Wrong field value",
             "id": "batch_api_product_123",
             "title": "Produkt",
         },
         "localization": {
           "type": "language",
           "value": "pl_PL"
         }
     }
 ]' \
 -F item_type=PRODUCT_ITEM
```

Response

```
{
 "handles": [
   "AcxH3oMDLrW0p4Q06hQCtQS5rvp-98SMf7urnOw7W53XctPHXB-MqkQKux1HPyzkC-pcvwuQdXswOfABI8GsCDHa"
 ],
 "validation_status": [
   {
     "warnings": [
       {
         "message": "Unrecognised field: A request for item batch_api_product_123 contains unrecognised field: 'wrong_field_name'"
       }
     ],
     "retailer_id": "batch_api_product_123"
   }
 ]
}
```

## Learn More

-   Send Product Updates - `/{catalog_id}/items_batch`
    
    -   [Product Catalog Items Batch, Reference](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch)
        
    -   [Supported fields](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/#supported-fields)
        
    
-   Check Batch Request Status - `/{catalog_id}/check_batch_request_status`
    
    -   [Product Catalog Check Batch Request Status, Reference](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/check_batch_request_status/)
        
    
-   [Catalog](https://developers.facebook.com/docs/marketing-api/catalog)
    
    -   [Product Catalog, Reference](https://developers.facebook.com/docs/marketing-api/reference/product-catalog)
        
    -   [Localized Catalog Setup](https://developers.facebook.com/docs/marketing-api/catalog/localized-catalog/localized-catalog-setup/), [Supported Fields — Localized Catalogs](https://developers.facebook.com/docs/marketing-api/catalog/guides/localized-catalog/supported-fields)
        
    

[](#)