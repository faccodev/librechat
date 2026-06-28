---
title: "Graph API Referência v24.0: Business Owned Businesses"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/owned_businesses/"
scraped_at: "2026-02-01T16:09:25.593Z"
---

Versão Graph API

[v24.0](#)

# Business Owned Businesses

[](#)

## Leitura

The client businesses owned.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fowned_businesses&version=v24.0)

```
GET /v24.0/{business-id}/owned_businesses HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/owned_businesses',
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
    "/{business-id}/owned_businesses",
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
    "/{business-id}/owned_businesses",
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
                               initWithGraphPath:@"/{business-id}/owned_businesses"
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

`child_business_external_id`

string

ID defined upon creation by 3P app caller. Used to store custom id as key for lookup using a key defined by the app developer.

`client_user_id`

UID

System User from Login ID or User from Login ID. This is the user that was used to create the child buisness

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [Business](/docs/marketing-api/reference/business/).

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`relationship`

[BusinessAggregatorRelationship](https://developers.facebook.com/docs/graph-api/reference/business-aggregator-relationship/)

relationship

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

104

Incorrect signature

[](#)

## Criando

To create other Business Managers, your business needs to obtain `BUSINESS_MANAGEMENT` during the [app review process](/docs/apps/review). If your app is in development mode, you can surpass this requirement, but to create only two child businesses.

You can make a POST request to `owned_businesses` edge from the following paths:

-   [`/{business_id}/owned_businesses`](/docs/marketing-api/reference/business/owned_businesses/)

When posting to this edge, a [Business](/docs/marketing-api/reference/business/) will be created.

### Parâmetros

Parâmetro

Descrição

`child_business_external_id`

string

(Optional) An external id that allows you to specify a key for your app to identify the child business. You should query for child businesses using this id because the list API is indexed on this field.

`name`

string

(Required) Name of entity for displaying. It should match the public name of your business or organization, since it will be visible across Meta. It can't contain special characters.

Obrigatório

`page_permitted_tasks`[](#)

array<enum {MANAGE, CREATE\_CONTENT, MODERATE, MESSAGING, ADVERTISE, ANALYZE, MODERATE\_COMMUNITY, MANAGE\_JOBS, PAGES\_MESSAGING, PAGES\_MESSAGING\_SUBSCRIPTIONS, READ\_PAGE\_MAILBOXES, VIEW\_MONETIZATION\_INSIGHTS, MANAGE\_LEADS, PROFILE\_PLUS\_FULL\_CONTROL, PROFILE\_PLUS\_MANAGE, PROFILE\_PLUS\_FACEBOOK\_ACCESS, PROFILE\_PLUS\_CREATE\_CONTENT, PROFILE\_PLUS\_MODERATE, PROFILE\_PLUS\_MODERATE\_DELEGATE\_COMMUNITY, PROFILE\_PLUS\_MESSAGING, PROFILE\_PLUS\_ADVERTISE, PROFILE\_PLUS\_ANALYZE, PROFILE\_PLUS\_REVENUE, PROFILE\_PLUS\_MANAGE\_LEADS, CASHIER\_ROLE, GLOBAL\_STRUCTURE\_MANAGEMENT, PROFILE\_PLUS\_GLOBAL\_STRUCTURE\_MANAGEMENT}>

(Required) page\_permitted\_tasks

`shared_page_id`

numeric string

(Required) shared\_page\_id

`timezone_id`

enum {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480}

timezone\_id

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`name`: string,

}

### Error Codes

Erro

Descrição

200

Permissions error

3913

It doesn't look like you have permission to create a new Business Manager.

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

3947

You are trying to create a Business Manager with the same name as one you are already a part of. Please pick a different name.

3974

The name you chose for this Business Manager is not valid. Try a different name.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

In order to delete a child Business Manager that has a line of credit, ensure that all ad accounts on it have been switched over to a different payment method in Business Manager. All prior monthly invoices must be fully paid, and the new payment method must be able to pay existing balances, if any.

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/owned_businesses`](/docs/marketing-api/reference/business/owned_businesses/).

### Parâmetros

Parâmetro

Descrição

`client_id`

numeric string

ID of the Child Business you want to delete

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

3912

There was a technical issue and the changes you made to your Business Manager weren't saved. Please try again.

100

Invalid parameter

[](#)

## Error Codes

Error

Description

1752089

A User Can Only Create One Business Account At One Time

1690091

The name provided is not valid. Consider using {business\_name} instead. [Learn more about choosing a name.](https://www.facebook.com/help/519912414718764)

1690090

The name you chose for this Business Manager is not valid. Please choose another. [Learn more about choosing a name.](https://www.facebook.com/help/519912414718764)

1690062

The name provided is already in use. Please choose a different name. [Learn more about choosing a name.](https://www.facebook.com/help/519912414718764)

1690111

Your payment account is disabled

1690138

To create a business using a primary page, you must be an admin of that page.

1690165

This aggregator business already has an existing client business associated with this user

1690232

Businesses Do Not Have Primary Pages: Please ensure all Business Managers have a unique Primary Page ID and try again.

1404163

Your Advertising Access is Restricted: You're no longer allowed to use Facebook Products to advertise. You can't run ads, manage advertising assets or create new ad or business accounts. [Learn More](https://www.facebook.com/accountquality/advertising_access?enforcement=1)

1404006

Sorry, this feature isn't available right now: An error occurred while processing this request. Please try again later.

1752089

Can Only Create One Business Account At One Time: A User Can Only Create One Business Account At One Time

2859040

Action not allowed: You are attempting to create a new Client Business Manager with a shared\_page\_id owned by a disallowed\_business.

1690192

App is not owned or shared by a business: App must exist and be owned or shared to aggregator business to create client businesses

[](#)