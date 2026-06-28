---
title: "Graph API Referência v24.0: Business Role Request"
source: "https://developers.facebook.com/docs/marketing-api/reference/business-role-request"
scraped_at: "2026-02-01T14:04:24.850Z"
---

Versão Graph API

[v24.0](#)

# Business Role Request

[](#)

## Leitura

Represents a business user request. See the requests from an admin of the Business for people to join as member of this business.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-role-request-id%7D&version=v24.0)

```
GET /v24.0/{business-role-request-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-role-request-id}',
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
    "/{business-role-request-id}",
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
    "/{business-role-request-id}",
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
                               initWithGraphPath:@"/{business-role-request-id}"
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

Business role invitation request ID.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`created_by`

BusinessUser|SystemUser

User who sent the invitation to join this business.

`created_time`

datetime

Admin sent this request to someone to join a business at this time.

`email`

string

Email of user invited to join the business.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`expiration_time`

datetime

Invitation to join business expires at this time.

`finance_role`

enum

When you invite someone to join business, pre-assign the Finance role.

`invited_user_type`

list<enum>

Invited user type of this role request

`owner`

[Business](https://developers.facebook.com/docs/marketing-api/reference/business/)

Invite someone to join this business.

`role`

enum

Business role for user invited to the business.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`status`

enum

Status of the invitation, such as accepted, declined, expired and so on.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`updated_by`

BusinessUser|SystemUser

User who updated the invitation.

`updated_time`

datetime

Time invitation updated.

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

You can update a [BusinessRoleRequest](/docs/marketing-api/reference/business-role-request/) by making a POST request to [`/{business_role_request_id}`](/docs/marketing-api/reference/business-role-request/).

### Parâmetros

Parâmetro

Descrição

`role`

enum {FINANCE\_EDITOR, FINANCE\_ANALYST, ADS\_RIGHTS\_REVIEWER, ADMIN, EMPLOYEE, DEVELOPER, PARTNER\_CENTER\_ADMIN, PARTNER\_CENTER\_ANALYST, PARTNER\_CENTER\_OPERATIONS, PARTNER\_CENTER\_MARKETING, PARTNER\_CENTER\_EDUCATION, MANAGE, DEFAULT, FINANCE\_EDIT, FINANCE\_VIEW}

Update invitation to include this role, such as `ADMIN`.

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node to which you POSTed.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

[](#)

## Excluindo

You can delete a [BusinessRoleRequest](/docs/marketing-api/reference/business-role-request/) by making a DELETE request to [`/{business_role_request_id}`](/docs/marketing-api/reference/business-role-request/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

368

The action attempted has been deemed abusive or is otherwise disallowed

190

Invalid OAuth 2.0 Access Token

200

Permissions error

[](#)