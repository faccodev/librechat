---
title: "Product Catalog Products Edge"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/products"
scraped_at: "2026-02-01T15:51:07.675Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Products

[](#)

Produtos de um catálogo usado em anúncios dinâmicos. Consulte [Anúncios dinâmicos, Configuração do catálogo](/docs/marketing-api/dynamic-product-ads/product-catalog).

[A partir da versão 12.0](/docs/graph-api/changelog/version12.0/?locale=en_US#catalog-api) de 14/09/2021, o campo `review_status` no nó de item do produto se tornou obsoleto. Para a versão 11.0 e anteriores, `review_status` retornará sempre uma string vazia.

**Não use paginação neste ponto de extremidade. A paginação está incompleta e pode resultar em produtos duplicados ou ausentes. Além disso, não use esse recurso para obter uma representação completa do catálogo de produtos.**

Por exemplo, busque o nome e a categoria de produtos que contenham a palavra `shoe`:

```
curl -G \
-d 'fields=["category","name"]' \
-d 'filter={"name":{"i_contains":"shoe"}}' \
-d 'summary=true' \
-d 'access_token=<ACCESS_TOKEN>'
https://graph.facebook.com/<API_VERSION>/<PRODUCT_CATALOG_ID>/products
```

A resposta será a seguinte:

```
{
  "data": [
    {
      "category": "mens_shoes", 
      "name": "Awesome Mens Shoes in Black", 
      "id": "1234"
    }, 

    ....

    {
      "category": "mens_shoes", 
      "name": "Hipster Mens Shoes in Red", 
      "id": "5678"
    }
  ], 

  ....

  "summary": {
    "total_count": 316
  }
}
```

[](#)

## Leitura

Products that a catalog contains

Também é possível filtrar os resultados:

Nome do campo

Descrição

Tipo

Obrigatório

`filter`

[Especificação de filtros](/docs/marketing-api/reference/product-set#Creating)

`JSON string`

Não

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bproduct-catalog-id%7D%2Fproducts&version=v24.0)

```
GET /v24.0/{product-catalog-id}/products HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{product-catalog-id}/products',
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/{product-catalog-id}/products",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{product-catalog-id}/products",
    null,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{product-catalog-id}/products"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`bulk_pagination`

boolean

Used for iterating over the edge in large chunks

`error_priority`

enum {HIGH, LOW, MEDIUM}

A filter for items having errors with the given priority. We suggest looking at HIGH priority errors first.

Priorities are decided based on both the issue type (how severe this issue is) and the item (how important this item is).

`error_type`

enum {ADDRESS\_BLOCKLISTED\_IN\_MARKET, AGGREGATED\_LOCALIZATION\_ISSUES, APP\_HAS\_NO\_AEM\_SETUP, AR\_DELETED\_DUE\_TO\_UPDATE, AR\_POLICY\_VIOLATED, AVAILABLE, BAD\_QUALITY\_IMAGE, BIG\_CATALOG\_WITH\_ALL\_ITEMS\_IN\_STOCK, BIZ\_MSG\_AI\_AGENT\_DISABLED\_BY\_USER, BIZ\_MSG\_GEN\_AI\_POLICY\_VIOLATED, CANNOT\_EDIT\_SUBSCRIPTION\_PRODUCTS, CATALOG\_NOT\_CONNECTED\_TO\_EVENT\_SOURCE, CHECKOUT\_DISABLED\_BY\_USER, COMMERCE\_ACCOUNT\_LEGAL\_ADDRESS\_INVALID, COMMERCE\_ACCOUNT\_NOT\_LEGALLY\_COMPLIANT, CRAWLED\_AVAILABILITY\_MISMATCH, DA\_DISABLED\_BY\_USER, DA\_POLICY\_VIOLATION, DELETED\_ITEM, DIGITAL\_GOODS\_NOT\_AVAILABLE\_FOR\_CHECKOUT, DUPLICATE\_IMAGES, DUPLICATE\_TITLE\_AND\_DESCRIPTION, EMPTY\_AVAILABILITY, EMPTY\_CONDITION, EMPTY\_DESCRIPTION, EMPTY\_IMAGE\_URL, EMPTY\_PRICE, EMPTY\_PRODUCT\_URL, EMPTY\_SELLER\_DESCRIPTION, EMPTY\_TITLE, EXTERNAL\_MERCHANT\_ID\_MISMATCH, GENERIC\_INVALID\_FIELD, GROUPS\_DISABLED\_BY\_USER, HIDDEN\_UNTIL\_PRODUCT\_LAUNCH, ILLEGAL\_PRODUCT\_CATEGORY, IMAGE\_FETCH\_FAILED, IMAGE\_FETCH\_FAILED\_BAD\_GATEWAY, IMAGE\_FETCH\_FAILED\_FILE\_SIZE\_EXCEEDED, IMAGE\_FETCH\_FAILED\_FORBIDDEN, IMAGE\_FETCH\_FAILED\_LINK\_BROKEN, IMAGE\_FETCH\_FAILED\_TIMED\_OUT, IMAGE\_RESOLUTION\_LOW, IN\_ANOTHER\_PRODUCT\_LAUNCH, INACTIVE\_MAGENTO\_PRODUCT, INACTIVE\_SALESFORCE\_COMMERCE\_CLOUD\_PRODUCT, INACTIVE\_SHOPIFY\_PRODUCT, INACTIVE\_WOOCOMMERCE\_PRODUCT, INVALID\_COMMERCE\_TAX\_CATEGORY, INVALID\_CONSOLIDATED\_LOCALITY\_INFORMATION, INVALID\_CONTENT\_ID, INVALID\_DEALER\_COMMUNICATION\_PARAMETERS, INVALID\_DMA\_CODES, INVALID\_FB\_PAGE\_ID, INVALID\_IMAGES, INVALID\_MONETIZER\_RETURN\_POLICY, INVALID\_OFFER\_DISCLAIMER\_URL, INVALID\_OFFER\_END\_DATE, INVALID\_PRE\_ORDER\_PARAMS, INVALID\_RANGE\_FOR\_AREA\_SIZE, INVALID\_RANGE\_FOR\_BUILT\_UP\_AREA\_SIZE, INVALID\_RANGE\_FOR\_NUM\_OF\_BATHS, INVALID\_RANGE\_FOR\_NUM\_OF\_BEDS, INVALID\_RANGE\_FOR\_NUM\_OF\_ROOMS, INVALID\_RANGE\_FOR\_PARKING\_SPACES, INVALID\_SALE\_PRICE, INVALID\_SHELTER\_PAGE\_ID, INVALID\_SHIPPING\_PROFILE\_PARAMS, INVALID\_SUBSCRIPTION\_DISABLE\_PARAMS, INVALID\_SUBSCRIPTION\_ENABLE\_PARAMS, INVALID\_SUBSCRIPTION\_PARAMS, INVALID\_TAX\_EXTENSION\_STATE, INVALID\_VEHICLE\_STATE, INVALID\_VIRTUAL\_TOUR\_URL\_DOMAIN, INVENTORY\_ZERO\_AVAILABILITY\_IN\_STOCK, ITEM\_GROUP\_NOT\_SPECIFIED, ITEM\_NOT\_SHIPPABLE\_FOR\_SCA\_SHOP, ITEM\_OVERRIDE\_EMPTY\_AVAILABILITY, ITEM\_OVERRIDE\_EMPTY\_PRICE, ITEM\_OVERRIDE\_NOT\_VISIBLE, ITEM\_PRICE\_NOT\_POSITIVE, ITEM\_STALE\_OUT\_OF\_STOCK, MARKETPLACE\_DISABLED\_BY\_USER, MARKETPLACE\_PARTNER\_AUCTION\_NO\_BID\_CLOSE\_TIME, MARKETPLACE\_PARTNER\_CURRENCY\_NOT\_VALID, MARKETPLACE\_PARTNER\_DISTRIBUTION\_DISABLED, MARKETPLACE\_PARTNER\_LISTING\_COUNTRY\_NOT\_MATCH\_CATALOG, MARKETPLACE\_PARTNER\_LISTING\_LIMIT\_EXCEEDED, MARKETPLACE\_PARTNER\_MISSING\_LATLONG, MARKETPLACE\_PARTNER\_MISSING\_SHIPPING\_COST, MARKETPLACE\_PARTNER\_NOT\_LOCAL\_ITEM, MARKETPLACE\_PARTNER\_NOT\_SHIPPED\_ITEM, MARKETPLACE\_PARTNER\_POLICY\_VIOLATION, MARKETPLACE\_PARTNER\_RULE\_LISTING\_LIMIT\_EXCEEDED, MARKETPLACE\_PARTNER\_SELLER\_BANNED, MARKETPLACE\_PARTNER\_SELLER\_NOT\_VALID, MINI\_SHOPS\_DISABLED\_BY\_USER, MISSING\_CHECKOUT, MISSING\_CHECKOUT\_CURRENCY, MISSING\_COLOR, MISSING\_COUNTRY\_OVERRIDE\_IN\_SHIPPING\_PROFILE, MISSING\_EVENT, MISSING\_INDIA\_COMPLIANCE\_FIELDS, MISSING\_SHIPPING\_PROFILE, MISSING\_SIZE, MISSING\_TAX\_CATEGORY, NEGATIVE\_COMMUNITY\_FEEDBACK, NEGATIVE\_PRICE, NO\_CONTENT\_ID, NOT\_ENOUGH\_IMAGES, NOT\_ENOUGH\_UNIQUE\_PRODUCTS, OVERLAY\_DISCLAIMER\_EXCEEDED\_MAX\_LENGTH, PART\_OF\_PRODUCT\_LAUNCH, PASSING\_MULTIPLE\_CONTENT\_IDS, PRODUCT\_DOMINANT\_CURRENCY\_MISMATCH, PRODUCT\_EXPIRED, PRODUCT\_ITEM\_HIDDEN\_FROM\_ALL\_SHOPS, PRODUCT\_ITEM\_INVALID\_PARTNER\_TOKENS, PRODUCT\_ITEM\_NOT\_INCLUDED\_IN\_ANY\_SHOP, PRODUCT\_ITEM\_NOT\_VISIBLE, PRODUCT\_NOT\_APPROVED, PRODUCT\_NOT\_DOMINANT\_CURRENCY, PRODUCT\_OUT\_OF\_STOCK, PRODUCT\_URL\_EQUALS\_DOMAIN, PROPERTY\_PRICE\_CURRENCY\_NOT\_SUPPORTED, PROPERTY\_PRICE\_TOO\_HIGH, PROPERTY\_PRICE\_TOO\_LOW, PROPERTY\_UNIT\_PRICE\_CURRENCY\_MISMATCH\_ITEM\_PRICE\_CURRENCY, PROPERTY\_VALUE\_CONTAINS\_HTML\_TAGS, PROPERTY\_VALUE\_DESCRIPTION\_CONTAINS\_OFF\_PLATFORM\_LINK, PROPERTY\_VALUE\_FORMAT, PROPERTY\_VALUE\_MISSING, PROPERTY\_VALUE\_MISSING\_WARNING, PROPERTY\_VALUE\_NON\_POSITIVE, PROPERTY\_VALUE\_STRING\_EXCEEDS\_LENGTH, PROPERTY\_VALUE\_STRING\_TOO\_SHORT, PROPERTY\_VALUE\_UPPERCASE, PROPERTY\_VALUE\_UPPERCASE\_WARNING, PURCHASE\_RATE\_BELOW\_ADDTOCART, PURCHASE\_RATE\_BELOW\_VIEWCONTENT, QUALITY\_DUPLICATED\_DESCRIPTION, QUALITY\_ITEM\_LINK\_BROKEN, QUALITY\_ITEM\_LINK\_REDIRECTING, RETAILER\_ID\_NOT\_PROVIDED, RETAILER\_ID\_USED\_BY\_GROUP, SHOPIFY\_INVALID\_RETAILER\_ID, SHOPIFY\_ITEM\_MISSING\_SHIPPING\_PROFILE, SHOPS\_POLICY\_VIOLATION, SUBSCRIPTION\_INFO\_NOT\_ENABLED\_FOR\_FEED, TAX\_CATEGORY\_NOT\_SUPPORTED\_IN\_UK, TOP\_PRODUCT\_WITHOUT\_VIDEOS, UNIQUE\_PRODUCT\_IDENTIFIER\_MISSING, UNMATCHED\_EVENTS, UNSUPPORTED\_PRODUCT\_CATEGORY, VARIANT\_ATTRIBUTE\_ISSUE, VIDEO\_FETCH\_FAILED, VIDEO\_FETCH\_FAILED\_BAD\_GATEWAY, VIDEO\_FETCH\_FAILED\_FILE\_SIZE\_EXCEEDED, VIDEO\_FETCH\_FAILED\_FORBIDDEN, VIDEO\_FETCH\_FAILED\_LINK\_BROKEN, VIDEO\_FETCH\_FAILED\_TIMED\_OUT, VIDEO\_ISSUE\_GENERIC, VIDEO\_NOT\_DOWNLOADABLE, WHATSAPP\_DISABLED\_BY\_USER, WHATSAPP\_MARKETING\_MESSAGE\_DISABLED\_BY\_USER, WHATSAPP\_MARKETING\_MESSAGE\_POLICY\_VIOLATION, WHATSAPP\_POLICY\_VIOLATION}

A filter for items affected by a particular issue type.

`filter`

A JSON-encoded rule

JSON-encoded WCA rule expression representing the filter to be applied for the edge

`return_only_approved_products`

boolean

Valor padrão: `false`

Return only approved products, only working for WhatsApp capability for now

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [ProductItem](/docs/marketing-api/reference/product-item/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

unsigned int32

Total number of products returned by the query

### Error Codes

Erro

Descrição

100

Invalid parameter

80009

There have been too many calls to this Catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

200

Permissions error

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

2500

Error parsing graph query

[](#)

## Criando

You can make a POST request to `products` edge from the following paths:

-   [`/{product_catalog_id}/products`](/docs/marketing-api/reference/product-catalog/products/)

When posting to this edge, a [ProductItem](/docs/marketing-api/reference/product-item/) will be created.

### Parâmetros

Parâmetro

Descrição

`additional_image_urls`

list<URL>

Additional product image URLs

`additional_variant_attributes`

JSON object {string : string}

Additional attributes to distinguish the product in its variant group (ex: {"Scent" : "Fruity", "Style" : "Classic"})

`age_group`

enum {adult, all ages, infant, kids, newborn, teen, toddler}

The age group that the item is targeted towards

`allow_upsert`[](#)

boolean

Valor padrão: `true`

If the retailer\_id of the item already exists in the catalog, setting this flag to true allows the request to update the item, otherwise it throws an error.

By default the value is true.

`android_app_name`

string

The name of the app (suitable for display)

`android_class`

string

A fully-qualified Activity class name for intent generation

`android_package`

string

A fully-qualified package name for intent generation

`android_url`

string

A custom scheme for the Android app

`availability`

enum{in stock, out of stock, preorder, available for order, discontinued, pending, mark\_as\_sold}

Valor padrão: `in stock`

Availability of the product item

`brand`

string

Brand of the product item

`category`

string

Google product category for the item. If you need a custom category name instead, use field 'product\_type'

`category_specific_fields`

JSON object

JSON object containing category specific fields

`item_sub_type`

enum {APPLIANCES, BABY\_FEEDING, BABY\_TRANSPORT, BEAUTY, BEDDING, CAMERAS, CELL\_PHONES\_AND\_SMART\_WATCHES, CLEANING\_SUPPLIES, CLOTHING, CLOTHING\_ACCESSORIES, COMPUTERS\_AND\_TABLETS, DIAPERING\_AND\_POTTY\_TRAINING, ELECTRONICS\_ACCESSORIES, FURNITURE, HEALTH, HOME\_GOODS, JEWELRY, NURSERY, PRINTERS\_AND\_SCANNERS, PROJECTORS, SHOES\_AND\_FOOTWEAR, SOFTWARE, TOYS, TVS\_AND\_MONITORS, VIDEO\_GAME\_CONSOLES\_AND\_VIDEO\_GAMES, WATCHES}

Valor padrão: `"EMPTY"`

item\_sub\_type

`checkout_url`

URL

URL to add product item to cart and directly to checkout

`color`

string

Color of the product item

`commerce_tax_category`

enum{FB\_ANIMAL, FB\_ANIMAL\_SUPP, FB\_APRL, FB\_APRL\_ACCESSORIES, FB\_APRL\_ATHL\_UNIF, FB\_APRL\_CASES, FB\_APRL\_CLOTHING, FB\_APRL\_COSTUME, FB\_APRL\_CSTM, FB\_APRL\_FORMAL, FB\_APRL\_HANDBAG, FB\_APRL\_JEWELRY, FB\_APRL\_SHOE, FB\_APRL\_SHOE\_ACC, FB\_APRL\_SWIM, FB\_APRL\_SWIM\_CHIL, FB\_APRL\_SWIM\_CVR, FB\_ARTS, FB\_ARTS\_HOBBY, FB\_ARTS\_PARTY, FB\_ARTS\_PARTY\_GIFT\_CARD, FB\_ARTS\_TICKET, FB\_BABY, FB\_BABY\_BATH, FB\_BABY\_BLANKET, FB\_BABY\_DIAPER, FB\_BABY\_GIFT\_SET, FB\_BABY\_HEALTH, FB\_BABY\_NURSING, FB\_BABY\_POTTY\_TRN, FB\_BABY\_SAFE, FB\_BABY\_TOYS, FB\_BABY\_TRANSPORT, FB\_BABY\_TRANSPORT\_ACC, FB\_BAGS, FB\_BAGS\_BKPK, FB\_BAGS\_BOXES, FB\_BAGS\_BRFCS, FB\_BAGS\_CSMT\_BAG, FB\_BAGS\_DFFL, FB\_BAGS\_DIPR, FB\_BAGS\_FNNY, FB\_BAGS\_GRMT, FB\_BAGS\_LUG\_ACC, FB\_BAGS\_LUGG, FB\_BAGS\_MSGR, FB\_BAGS\_TOTE, FB\_BAGS\_TRN\_CAS, FB\_BLDG, FB\_BLDG\_ACC, FB\_BLDG\_CNSMB, FB\_BLDG\_FENCE, FB\_BLDG\_FUEL\_TNK, FB\_BLDG\_HT\_VNT, FB\_BLDG\_LOCK, FB\_BLDG\_MATRL, FB\_BLDG\_PLMB, FB\_BLDG\_PUMP, FB\_BLDG\_PWRS, FB\_BLDG\_S\_ENG, FB\_BLDG\_STR\_TANK, FB\_BLDG\_TL\_ACC, FB\_BLDG\_TOOL, FB\_BUSIND, FB\_BUSIND\_ADVERTISING, FB\_BUSIND\_AGRICULTURE, FB\_BUSIND\_AUTOMATION, FB\_BUSIND\_HEAVY\_MACH, FB\_BUSIND\_LAB, FB\_BUSIND\_MEDICAL, FB\_BUSIND\_RETAIL, FB\_BUSIND\_SANITARY\_CT, FB\_BUSIND\_SIGN, FB\_BUSIND\_STORAGE, FB\_BUSIND\_STORAGE\_ACC, FB\_BUSIND\_WORK\_GEAR, FB\_CAMERA\_ACC, FB\_CAMERA\_CAMERA, FB\_CAMERA\_OPTIC, FB\_CAMERA\_OPTICS, FB\_CAMERA\_PHOTO, FB\_ELEC, FB\_ELEC\_ACC, FB\_ELEC\_ARCDADE, FB\_ELEC\_AUDIO, FB\_ELEC\_CIRCUIT, FB\_ELEC\_COMM, FB\_ELEC\_COMPUTER, FB\_ELEC\_GPS\_ACC, FB\_ELEC\_GPS\_NAV, FB\_ELEC\_GPS\_TRK, FB\_ELEC\_MARINE, FB\_ELEC\_NETWORK, FB\_ELEC\_PART, FB\_ELEC\_PRINT, FB\_ELEC\_RADAR, FB\_ELEC\_SFTWR, FB\_ELEC\_SPEED\_RDR, FB\_ELEC\_TELEVISION, FB\_ELEC\_TOLL, FB\_ELEC\_VID\_GM\_ACC, FB\_ELEC\_VID\_GM\_CNSL, FB\_ELEC\_VIDEO, FB\_FOOD, FB\_FURN, FB\_FURN\_BABY, FB\_FURN\_BENCH, FB\_FURN\_CART, FB\_FURN\_CHAIR, FB\_FURN\_CHAIR\_ACC, FB\_FURN\_DIVIDE, FB\_FURN\_DIVIDE\_ACC, FB\_FURN\_ENT\_CTR, FB\_FURN\_FUTN, FB\_FURN\_FUTN\_PAD, FB\_FURN\_OFFICE, FB\_FURN\_OFFICE\_ACC, FB\_FURN\_OTTO, FB\_FURN\_OUTDOOR, FB\_FURN\_OUTDOOR\_ACC, FB\_FURN\_SETS, FB\_FURN\_SHELVE\_ACC, FB\_FURN\_SHLF, FB\_FURN\_SOFA, FB\_FURN\_SOFA\_ACC, FB\_FURN\_STORAGE, FB\_FURN\_TABL, FB\_FURN\_TABL\_ACC, FB\_GENERIC\_TAXABLE, FB\_HLTH, FB\_HLTH\_HLTH, FB\_HLTH\_JWL\_CR, FB\_HLTH\_LILP\_BLM, FB\_HLTH\_LTN\_SPF, FB\_HLTH\_PRSL\_CR, FB\_HLTH\_SKN\_CR, FB\_HMGN, FB\_HMGN\_BATH, FB\_HMGN\_DCOR, FB\_HMGN\_EMGY, FB\_HMGN\_FPLC, FB\_HMGN\_FPLC\_ACC, FB\_HMGN\_GS\_SFT, FB\_HMGN\_HS\_ACC, FB\_HMGN\_HS\_APP, FB\_HMGN\_HS\_SPL, FB\_HMGN\_KTCN, FB\_HMGN\_LAWN, FB\_HMGN\_LGHT, FB\_HMGN\_LINN, FB\_HMGN\_LT\_ACC, FB\_HMGN\_OTDR, FB\_HMGN\_POOL, FB\_HMGN\_SCTY, FB\_HMGN\_SMK\_ACC, FB\_HMGN\_UMBR, FB\_HMGN\_UMBR\_ACC, FB\_MDIA, FB\_MDIA\_BOOK, FB\_MDIA\_DVDS, FB\_MDIA\_MAG, FB\_MDIA\_MANL, FB\_MDIA\_MUSC, FB\_MDIA\_PRJ\_PLN, FB\_MDIA\_SHT\_MUS, FB\_OFFC, FB\_OFFC\_BKAC, FB\_OFFC\_CRTS, FB\_OFFC\_DSKP, FB\_OFFC\_EQIP, FB\_OFFC\_FLNG, FB\_OFFC\_GNRL, FB\_OFFC\_INSTM, FB\_OFFC\_LP\_DSK, FB\_OFFC\_MATS, FB\_OFFC\_NM\_PLT, FB\_OFFC\_PPR\_HNDL, FB\_OFFC\_PRSNT\_SPL, FB\_OFFC\_SEALR, FB\_OFFC\_SHIP\_SPL, FB\_RLGN, FB\_RLGN\_CMNY, FB\_RLGN\_ITEM, FB\_RLGN\_WEDD, FB\_SFTWR, FB\_SFWR\_CMPTR, FB\_SFWR\_DGTL\_GD, FB\_SFWR\_GAME, FB\_SHIPPING, FB\_SPOR, FB\_SPORT\_ATHL, FB\_SPORT\_ATHL\_CLTH, FB\_SPORT\_ATHL\_SHOE, FB\_SPORT\_ATHL\_SPRT, FB\_SPORT\_EXRCS, FB\_SPORT\_INDR\_GM, FB\_SPORT\_OTDR\_GM, FB\_TOYS, FB\_TOYS\_EQIP, FB\_TOYS\_GAME, FB\_TOYS\_PZZL, FB\_TOYS\_TMRS, FB\_TOYS\_TOYS, FB\_VEHI, FB\_VEHI\_PART}

Commerce tax category

`condition`

enum{new, refurbished, used, used\_like\_new, used\_good, used\_fair, cpo, open\_box\_new}

Valor padrão: `new`

The condition of the product item

`currency`

ISO 4217 Currency Code

Currency for the product item

Obrigatório

`custom_data`

dictionary { string : <string> }

Field used to specify custom variants for a specific catalog item. In this case, variants can be colors, materials, etc.  
The field must be formatted as key-value pairs, and the keys must be defined in the product group.  
For example: `custom_data: {"color":"red", "size": "L"}`

`custom_label_0`

string

An optional custom label to associate with the product item. Max size: 100

`custom_label_1`

string

An optional custom label to associate with the product item. Max size: 100

`custom_label_2`

string

An optional custom label to associate with the product item. Max size: 100

`custom_label_3`

string

An optional custom label to associate with the product item. Max size: 100

`custom_label_4`

string

An optional custom label to associate with the product item. Max size: 100

`custom_number_0`

int64

custom\_number\_0

`custom_number_1`

int64

custom\_number\_1

`custom_number_2`

int64

custom\_number\_2

`custom_number_3`

int64

custom\_number\_3

`custom_number_4`

int64

custom\_number\_4

`description`

string

Description of the product item. Max size: 5000

Supports Emoji

`expiration_date`

string

Item's expiration date (YYYY-MM-DD)

`fb_product_category`

string

Facebook product category for the item

`gender`

enum{female, male, unisex}

Gender the product item is targeted towards

`gtin`

string

Global trade ID of the product item

`image_url`

URI

Required. URL of the product image.

`importer_address`

JSON object

Address of the product importer

`street1`

string

street1

`street2`

string

street2

`city`

string

city

Obrigatório

`region`

string

region

`postal_code`

string

postal\_code

`country`

enum {AC, AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CN, CO, CR, CU, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IR, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KP, KR, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SY, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW}

country

Obrigatório

`importer_name`

string

Name of the product Importer

`inventory`

int64

Inventory count for the product item

`ios_app_name`

string

The name of the app (suitable for display)

`ios_app_store_id`

int64

The app ID for the App Store

`ios_url`

string

A custom scheme for the iOS app

`ipad_app_name`

string

The name of the app (suitable for display)

`ipad_app_store_id`

int64

The app ID for the App Store

`ipad_url`

string

A custom scheme for the iPhone app

`iphone_app_name`

string

The name of the app (suitable for display)

`iphone_app_store_id`

int64

The app ID for the App Store

`iphone_url`

string

A custom scheme for the iPhone app

`manufacturer_info`

string

The Manufacturer Information such as Name, address, etc...

`manufacturer_part_number`

string

Manufacturer's ID for the product item

`marked_for_product_launch`

enum{default, marked, not\_marked}

Whether this product should be marked for a product launch and hide it from shops until product launch is created with this product.

`material`

string

Material of the product item  
Max size: 200

`mobile_link`

URI

Link to a mobile-optimized external product page

`name`

string

Name/title of the product item

ObrigatórioSupports Emoji

`ordering_index`

int64

Index used for ordering items within a group

`origin_country`

enum {AC, AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CN, CO, CR, CU, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IR, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KP, KR, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SY, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW}

Product Country of Origin

`pattern`

string

Pattern of the product item

`price`

int64

Price of the item with 2 digits added for cents (ex: use "100" for 1 or "599" for 5.99)

Obrigatório

`product_priority_1`

float

product\_priority\_1

`product_priority_2`

float

product\_priority\_2

`product_priority_3`

float

product\_priority\_3

`product_priority_4`

float

product\_priority\_4

`product_type`

string

Retailer defined category of the product item. Max size: 750

`retailer_id`

string

A unique identifier for this item (which can be a variant for a product). This field is required.

`retailer_product_group_id`

string

Item group ID that this product is a variant of

`return_policy_days`

int64

return\_policy\_days

`sale_price`

int64

Sale price of the item with 2 digits added for cents (ex: use "100" for 1 or "599" for 5.99)

`sale_price_end_date`

datetime

Date when the sale price ends

`sale_price_start_date`

datetime

Date when the sale price starts

`short_description`

string

A brief description of the product

`size`

string

Size of the product item

`start_date`

string

Date when the product started to exist

`url`

URI

URL of the product item

`visibility`

enum{staging, published}

Valor padrão: `published`

Visibility of the product item

`wa_compliance_category`

enum {DEFAULT, COUNTRY\_ORIGIN\_EXEMPT}

wa\_compliance\_category

`windows_phone_app_id`

string

The app ID (a GUID) for app store

`windows_phone_app_name`

string

The name of the app (suitable for display)

`windows_phone_url`

string

A custom scheme for the Windows Phone app

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

10801

Either "file" or "url" must be specified

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)