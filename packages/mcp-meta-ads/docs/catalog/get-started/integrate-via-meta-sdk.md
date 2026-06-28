---
title: "Integração do catálogo usando o SDK de Negócios da Meta - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/get-started/integrate-via-meta-sdk"
scraped_at: "2026-02-01T15:51:13.892Z"
---

# Integração do catálogo usando o SDK de Negócios da Meta

Você pode usar o [SDK de Negócios da Meta](/docs/business-sdk/getting-started) para fazer integrações com a API de Catálogo. É uma maneira fácil, com código padrão, de fazer chamadas às APIs de catálogo disponíveis. Os SDKs da Meta estão disponíveis para as linguagens Java, Python, Node.js, PHP e Ruby.

## Requisitos

-   ID do app – Um identificador único gerado para o app durante o fluxo de criação do app. [Saiba mais](/docs/development/create-an-app/).
    
-   Token de acesso – Uma string que identifica um usuário, um app ou uma Página. Ele pode ser usado pelo app para fazer chamadas da Graph API. [Saiba mais](/docs/facebook-login/guides/access-tokens).
    
-   Identificação do catálogo – O identificador do catálogo.
    

## Etapa 1: instalar o SDK

Siga [estas instruções](/docs/business-sdk/getting-started) para instalar o SDK na linguagem de sua preferência.

[](#)

## Etapa 2: fazer uma chamada de API

É possível fazer chamadas de API usando objetos e funções incluídos no SDK. Veja alguns exemplos de chamadas de API:

### Carregar produtos

PHP SDKNode.js SDK

```
Api::init($app_id, $app_secret, $access_token);


// Create Product Items using Items Batch API
$catalog = new ProductCatalog($catalog_id);
$response = $catalog->createItemsBatch(
 array(),
 array(
 "item_type" => "PRODUCT_ITEM",
   "requests" => array(
     // Item 1 - Create Item
     array(
       "method" => "create",
       "data" => array(
         "id" => "retailer_id_1",
         "title" => "Product Title",
         "description" => "Product Description",
         "brand" => "BrandName",
         "price" => "20.00 USD",
         "image_link" => "image_url",
         "availability" => "in stock",
         "link" => "http://productlink.com/product/retailer_id",
       )
     ),
     // Item 2 - Update item with retailer_id_2
     array(
       "method" => "update",
       "data" => array(
         "id" => "retailer_id_2",
         "title" => "Product Title 2",
       )
     ),
     // Item 3 - Delete item with retailer_id_3
     array(
       "method" => "delete",
       "data" => array(
         "id" => "retailer_id_3",
       )
     )
   )
)
)
```

```
const bizSdk = require('facebook-nodejs-business-sdk');

const access_token = '
```

  

### Buscar produtos

PHP SDKNode.js SDK

```
Api::init($app_id, $app_secret, $access_token);


// Get all products in a catalog
$catalog = new ProductCatalog($catalog_id);
$cursor = $catalog->getProducts();
//$cursor->setUseImplicitFetch(true); Set true for Auto Scroll


while ($cursor->valid()) {
   echo $cursor->current()->{ProductItemFields::NAME}.PHP_EOL;
   echo $cursor->current()->{ProductItemFields::ID}.PHP_EOL;
   $cursor->next();
}


$cursor->end(); // Set cursor to the end of the lst
$cursor->fetchAfter(); // Fetch the next page
$cursor->next(); // Move the cursor to the next item


while ($cursor->valid()) {
   echo $cursor->current()->{ProductItemFields::NAME}.PHP_EOL;
   echo $cursor->current()->{ProductItemFields::ID}.PHP_EOL;
   $cursor->next();
}
```

```
const bizSdk = require('facebook-nodejs-business-sdk');

const access_token = '
```

  

[](#)

## Saiba mais

Veja o código-fonte do SDK de Negócios da Meta no GitHub.

-   [Java Business SDK](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-java-business-sdk&h=AT1Hu6KeJ9zf1zvwdfxYUOIeUDkGXcSdhCthrExaRZ9nFq-R0k9YBDJFmZ0qQnKxsLCq5b2y0CqWnknbnlMJ2pq_E1cx01YJx9_eLCA6u6WtkAFgkUVd8FKqpiVuPxRNpL7erY8FJrdJtdjduRi5eoLOH6xFUBvdtBMSod8QwWM)
    
-   [Node.js Business SDK](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-nodejs-business-sdk&h=AT0RlZOfKGzcyPJULxWwAkhHwd6H-6OviCTc6ca_Ohx4NTrZyL_wFDNmmNZmbCxCRPhcTh4iJvXy9OA91llOUTOsdZV8eEAY8c1WRv1eeMXpoCSeV3bSv8uGGqG5xw1OhLh6n3OfZVLR65s9Lup-Xj-S1Dnrsln2XwE5goOmCdw)
    
-   [PHP Business SDK](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-php-business-sdk&h=AT32oExwkkde0j8LNvK9HsKpEnPyTOPu27eMcCww8FqfXizXwDHUSnYaP73xnxEbrA8DCj-s-0LP90Rcn7PNXWRHLsud-6zVjljWial6ytnPy8MzYbGvvLkTRNBxVh5YdMa-ubpRwuidtbPOX-eNEBxaeCAfURfZkPFzYWIKT3k)
    
-   [Python Business SDK](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-python-business-sdk&h=AT2ZIsOirEFAbkB4hwj7IpsnrTA3Z3t2PasAxHhpF3Vy8duWezhCbHoeEMnuJEW01Zjyx1-NV1iT6jSCJotoUp-_KSndgEHvalRUGuKgUkj9brUWwfvMEMYbt6ufBmiyjVZnRi_8wNu4WEqnE09pqvrJjOKwZO__aQuJFTbULzc)
    
-   [Ruby Business SDK](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-ruby-business-sdk&h=AT1GhXJHUdF52yd8pHvKY3i5SyOwXuuLnt3pqo4LolfAXoR7T2Y2GhicC5XSGJ9BjmYHDhtEc_kIT7F7i5Vzh1m_FuC5ynSFwF47GqUH0YP0YS6jKTasSZo8W0qzXjar3aEQKFCr9N41uJH92KTBHFmW-pCM3afxZLj5VPxMkwc)
    

[](#)