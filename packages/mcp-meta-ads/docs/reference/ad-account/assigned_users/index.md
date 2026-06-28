---
title: "Ad Account, Assigned Users"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/assigned_users/"
scraped_at: "2026-02-01T14:32:57.521Z"
---

Versão Graph API

[v24.0](#)

# 

Ad Account, Assigned Users

[](#)

## Leitura

Business and system users assigned to this Ad Account.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Fassigned_users&version=v24.0)

```
GET /v24.0/{ad-account-id}/assigned_users HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/assigned_users',
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
    "/{ad-account-id}/assigned_users",
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
    "/{ad-account-id}/assigned_users",
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
                               initWithGraphPath:@"/{ad-account-id}/assigned_users"
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

`business`

numeric string or integer

The business associated with this Ad Account

Obrigatório

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AssignedUser.

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`permitted_tasks`

list<string>

Tasks that are assignable on this object

`tasks`

list<string>

All unpacked roles/tasks of this particular user on this object

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

unsigned int32

Total number of business and system users assigned to this Ad Account

### Error Codes

Erro

Descrição

200

Permissions error

190

Invalid OAuth 2.0 Access Token

100

Invalid parameter

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

368

The action attempted has been deemed abusive or is otherwise disallowed

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

In v3.1 we introduce the new concept of **task-based permissions** to substitute for the current role-based permission. This affects access to ad accounts managed by Business Manager API and Pages. Role-based access to ad accounts and Pages is still available but will be deprecated in the future. This impacts the following roles and provides the equivalent tasks for ad accounts:

-   Role: `ADMIN`, Tasks: `['MANAGE', 'ADVERTISE', 'ANALYZE'` - Manage all aspects of ad campaigns, reporting, billing and ad account permissions.
    
-   Role: `GENERAL_USER`, Tasks: `['ADVERTISE', 'ANALYZE']` - Create ads using the funding source associated with the ad account. Run reports.
    
-   Role: `GENERAL_USER`, Tasks: `['ANALYZE']` - Run reports.
    

This replaces the following roles in Business Manager API with these tasks:

-   Role: `MANAGER`, Tasks: `['MANAGE', 'CREATE_CONTENT', 'MODERATE', 'ADVERTISE', 'ANALYZE', 'DRAFT']`
    
-   Role: `CONTENT_CREATOR`, Tasks: `['CREATE_CONTENT', 'MODERATE', 'ADVERTISE', 'ANALYZE', 'DRAFT']`
    
-   Role: `MODERATOR`, Tasks: `['MODERATE', 'ADVERTISE', 'ANALYZE', 'DRAFT']`
    
-   Role: `ADVERTISER`, Tasks: `['ADVERTISE', 'ANALYZE', 'DRAFT']`
    
-   Role: `INSIGHTS_ANALYST`, Tasks: `['ANALYZE', 'DRAFT']`
    
-   Role: `CREATIVE_HUB_MOCKUPS_MANAGER`, Tasks: `['DRAFT']`
    

You can update an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a POST request to [`/act_{ad_account_id}/assigned_users`](/docs/marketing-api/reference/ad-account/assigned_users/).

### Parâmetros

Parâmetro

Descrição

`tasks`

array<enum {MANAGE, ADVERTISE, ANALYZE, DRAFT, AA\_ANALYZE}>

AdAccount permission tasks to assign this user

`user`

UID

Business user id or system user id

Obrigatório

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

200

Permissions error

2620

Invalid call to update account permissions

[](#)

## Excluindo

You can dissociate a [User](/docs/graph-api/reference/user/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/assigned_users`](/docs/marketing-api/reference/ad-account/assigned_users/).

### Parâmetros

Parâmetro

Descrição

`user`

UID

Business user id or system user id

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

3919

There was an unexpected technical issue. Please try again.

190

Invalid OAuth 2.0 Access Token

[](#)