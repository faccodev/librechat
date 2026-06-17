---
title: "Graph API Referência v24.0: Business User"
source: "https://developers.facebook.com/docs/marketing-api/reference/business-user"
scraped_at: "2026-02-01T14:04:32.356Z"
---

Versão Graph API

[v24.0](#)

# Business User

[](#)

In Graph API v9.0, [access to this endpoint was restricted](/docs/graph-api/changelog/version9.0#business). In Graph API v10.0, [access has been restored to all apps](/docs/graph-api/changelog/version10.0#business), but apps can now only target businesses (or child businesses of those businesses) that have claimed them.

[](#)

## Leitura

Represents a business user. A business user can be an employee of the business or an admin of the business. An Employee can see all of information in business settings and be assigned roles by business admins. An Admin can control all aspects of the business including modifying or deleting the account and adding or removing people from the employee list

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-user-id%7D&version=v24.0)

```
GET /v24.0/{business-user-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-user-id}',
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
    "/{business-user-id}",
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
    "/{business-user-id}",
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
                               initWithGraphPath:@"/{business-user-id}"
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

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

numeric string

The business user's ID.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`business`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

Business user is associated with this business.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`email`

string

User's email as provided in Business Manager.

`finance_permission`

string

Financial permission role of the user in Business Manager, such as `EDITOR`, `ANALYST`, and so on.

`first_name`

string

User's first name as provided in Business Manager.

`ip_permission`

string

This user's ads right permission role in Business Manager, such as Reviewer and so on.

`last_name`

string

User's last name as provided in Business Manager.

`name`

string

Name of user as provided in Business Manager.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`pending_email`

string

Email for the business user that is still pending verification.

`role`

string

Role of the user in Business Manager, such as Admin, Employee, and so on.

`title`

string

The title of the user in this business.

`two_fac_status`

string

Two-factor authentication status of the business-scoped user.

### Bordas

Borda

Descrição

[`assigned_business_asset_groups`](/docs/marketing-api/reference/business-user/assigned_business_asset_groups/)

Edge<BusinessAssetGroup>

Business asset groups that are assign to this business scoped user

[`assigned_pages`](/docs/marketing-api/reference/business-user/assigned_pages/)

Edge<Page>

Pages that are assigned to this business scoped user

[`assigned_product_catalogs`](/docs/marketing-api/reference/business-user/assigned_product_catalogs/)

Edge<ProductCatalog>

Product catalogs that are assigned to this business scoped user

[`assigned_whatsapp_business_accounts`](/docs/marketing-api/reference/business-user/assigned_whatsapp_business_accounts/)

Edge<WhatsAppBusinessAccount>

WhatsApp business accounts that are assigned to the business user

### Error Codes

Erro

Descrição

100

Invalid parameter

104

Incorrect signature

[](#)

## Criando

You can make a POST request to `business_users` edge from the following paths:

-   [`/{business_id}/business_users`](/docs/marketing-api/reference/business/business_users/)

When posting to this edge, a [BusinessUser](/docs/marketing-api/reference/business-user/) will be created.

### Parâmetros

Parâmetro

Descrição

`email`

string

Email of user to be added to this business.

Obrigatório

`invited_user_type`

array<enum {FB, MWA}>

Not passing a value will default to 'FB'.

Use 'MWA' for inviting a user with their Meta account managed by their organization.

`role`

enum {FINANCE\_EDITOR, FINANCE\_ANALYST, ADS\_RIGHTS\_REVIEWER, ADMIN, EMPLOYEE, DEVELOPER, PARTNER\_CENTER\_ADMIN, PARTNER\_CENTER\_ANALYST, PARTNER\_CENTER\_OPERATIONS, PARTNER\_CENTER\_MARKETING, PARTNER\_CENTER\_EDUCATION, MANAGE, DEFAULT, FINANCE\_EDIT, FINANCE\_VIEW}

Role of user to add to this business.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

613

Calls to this api have exceeded the rate limit.

457

The session has an invalid origin

190

Invalid OAuth 2.0 Access Token

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

200

Permissions error

370

Invalid call to update this page

[](#)

## Atualizando

You can update a [BusinessUser](/docs/marketing-api/reference/business-user/) by making a POST request to [`/{business_user_id}`](/docs/marketing-api/reference/business-user/).

### Parâmetros

Parâmetro

Descrição

`email`

string

The email of the user at this business.

`first_name`

string

First name for this business user.

`last_name`

string

Last name for this business user.

`role`

enum {FINANCE\_EDITOR, FINANCE\_ANALYST, ADS\_RIGHTS\_REVIEWER, ADMIN, EMPLOYEE, DEVELOPER, PARTNER\_CENTER\_ADMIN, PARTNER\_CENTER\_ANALYST, PARTNER\_CENTER\_OPERATIONS, PARTNER\_CENTER\_MARKETING, PARTNER\_CENTER\_EDUCATION, MANAGE, DEFAULT, FINANCE\_EDIT, FINANCE\_VIEW}

The role of the user at this business, such as `ADMIN` and so on.

`skip_verification_email`

boolean

Whether to skip sending the verification email. The business persona email still requires verification - but just won't receive an email.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

3914

It looks like you're trying to remove the last admin from this Business Manager. At least one admin is required in Business Manager.

[](#)

## Excluindo

You can delete a [BusinessUser](/docs/marketing-api/reference/business-user/) by making a DELETE request to [`/{business_user_id}`](/docs/marketing-api/reference/business-user/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

3914

It looks like you're trying to remove the last admin from this Business Manager. At least one admin is required in Business Manager.

100

Invalid parameter

200

Permissions error

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

[](#)