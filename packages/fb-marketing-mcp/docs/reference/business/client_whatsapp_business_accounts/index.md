---
title: "Graph API Referência v24.0: Business Client Whatsapp Business Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/client_whatsapp_business_accounts/"
scraped_at: "2026-02-01T16:08:14.487Z"
---

Versão Graph API

[v24.0](#)

# Business Client Whatsapp Business Accounts

[](#)

## Leitura

Get a list of WhatsApp Business Accounts on a Business.

### Example

Requirements

-   whatsapp\_business\_management permission
    
-   whatsapp\_business\_messaging permission
    
-   public\_profile permission
    
-   BUSINESS ID (also referred to as BUSINESS MANAGER ID in Business Settings)
    
-   ADMIN SYSTEM USER ACCESS TOKEN for the business
    

Request

cURLAndroid SDKObjective-C

```
curl -i -X GET \
'https://graph.facebook.com/LATEST-VERSION/BUSINESS-ID/client_whatsapp_business_accounts' \
-H 'Authorization: Bearer USER-ACCESS-TOKEN'
```

```
GraphRequest request = GraphRequest.newGraphPathRequest(
  accessToken,
  "/BUSINESS-ID/client_whatsapp_business_accounts",
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});

request.executeAsync();
```

```
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/BUSINESS-ID/client_whatsapp_business_accounts"
           parameters:nil
           HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
```

Response

```
{
  "data": [
  ]
}
```

Request with Filtering

cURL

```
curl -i -X GET \
"https://graph.facebook.com/LATEST-VERSION/BUSINESS-ID/client_whatsapp_business_accounts \
   ?fields=id,name,ownership_type \
   &filtering=[{'field':'ownership_type', 'operator': 'IN', 'value': ['SELF', 'CLIENT_OWNED']}]" \
-H 'Authorization: Bearer USER-ACCESS-TOKEN'
```

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [WhatsAppBusinessAccount](/docs/graph-api/reference/whats-app-business-account/).

Os seguintes campos serão adicionados a cada nó que for retornado:

Campo

Descrição

`permitted_tasks`

list<string>

Tasks that are assignable to users on this asset

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

80008

There have been too many calls to this WhatsApp Business account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

104

Incorrect signature

100

Invalid parameter

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)