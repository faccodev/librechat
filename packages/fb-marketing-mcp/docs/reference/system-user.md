---
title: "Graph API Referência v24.0: System User"
source: "https://developers.facebook.com/docs/marketing-api/reference/system-user"
scraped_at: "2026-02-01T14:05:06.586Z"
---

Versão Graph API

[v24.0](#)

# System User

[](#)

## Leitura

Represents a system user

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bsystem-user-id%7D&version=v24.0)

```
GET /v24.0/{system-user-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{system-user-id}',
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
    "/{system-user-id}",
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
    "/{system-user-id}",
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
                               initWithGraphPath:@"/{system-user-id}"
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

System user ID.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`created_by`

[User](https://developers.facebook.com/docs/graph-api/reference/user/)

The creator of this system user.

`created_time`

datetime

The creation time of this system user.

`finance_permission`

string

Financial permission role of the user in business manager, such as Editor, Analyst, and so on.

`ip_permission`

string

Ads right permission role of the user in business manager, such as Reviewer, and so on.

`name`

string

Name used to identify this system user.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

### Bordas

Borda

Descrição

[`assigned_business_asset_groups`](/docs/marketing-api/reference/system-user/assigned_business_asset_groups/)

Edge<BusinessAssetGroup>

Business asset groups that are assign to this business scoped user

[`assigned_pages`](/docs/marketing-api/reference/system-user/assigned_pages/)

Edge<Page>

Pages that are assigned to this business scoped user

[`assigned_product_catalogs`](/docs/marketing-api/reference/system-user/assigned_product_catalogs/)

Edge<ProductCatalog>

Product catalogs that are assigned to this business scoped user

[`assigned_whatsapp_business_accounts`](/docs/marketing-api/reference/system-user/assigned_whatsapp_business_accounts/)

Edge<WhatsAppBusinessAccount>

WhatsApp business accounts that are assigned to the business user

### Error Codes

Erro

Descrição

100

Invalid parameter

110

Invalid user id

[](#)

## Criando

You can make a POST request to `system_users` edge from the following paths:

-   [`/{business_id}/system_users`](/docs/marketing-api/reference/business/system_users/)

When posting to this edge, a [SystemUser](/docs/marketing-api/reference/system-user/) will be created.

### Parâmetros

Parâmetro

Descrição

`name`

string

Name of system user to be added to this business.

Obrigatório

`role`

enum {FINANCE\_EDITOR, FINANCE\_ANALYST, ADS\_RIGHTS\_REVIEWER, ADMIN, EMPLOYEE, DEVELOPER, PARTNER\_CENTER\_ADMIN, PARTNER\_CENTER\_ANALYST, PARTNER\_CENTER\_OPERATIONS, PARTNER\_CENTER\_MARKETING, PARTNER\_CENTER\_EDUCATION, MANAGE, DEFAULT, FINANCE\_EDIT, FINANCE\_VIEW}

Role of system user to be added to this business.

`system_user_id`

int

ID of system user.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

104001

In order to create a system user, an app must be part of this business. Please add an app and then try again.

100

Invalid parameter

3949

This Business Manager has reached maximum number of system user limit.

3965

This Business Manager has reached maximum number of admin system user limit.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)