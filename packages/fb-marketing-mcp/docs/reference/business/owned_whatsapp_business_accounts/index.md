---
title: "Graph API Referência v24.0: Business Owned Whatsapp Business Accounts"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/owned_whatsapp_business_accounts/"
scraped_at: "2026-02-01T16:10:01.276Z"
---

Versão Graph API

[v24.0](#)

# Business Owned Whatsapp Business Accounts

[](#)

Represents a collection of [WhatsApp Business Accounts](/docs/graph-api/reference/whats-app-business-account) owned by a business.

To find the ID of a business, go to [**Business Manager**](https://business.facebook.com/) > **Business Settings** > **Business Info**. There, you will see information about the business, including the ID.

[](#)

## Leitura

Get a list of [WhatsApp Business Accounts](/docs/graph-api/reference/whats-app-business-account) owned by this business. Supports [filtering](/docs/whatsapp/embedded-signup/manage-accounts#filter-wabas-by-creation-time) and [sorting](/docs/whatsapp/embedded-signup/manage-accounts#sort-wabas-by-creation-time).

### Example

Requirements

-   whatsapp\_business\_management permission
    
-   business\_management permission
    
-   whatsapp\_business\_messaging permission
    
-   public\_profile permission
    
-   BUSINESS ID (also referred to as BUSINESS MANAGER ID in Business Settings)
    
-   ADMIN SYSTEM USER ACCESS TOKEN for the business
    

Request

cURLAndroid SDKObjective-C

```
curl -i -X GET \
'https://graph.facebook.com/LATEST-VERSION/BUSINESS-ID/owned_whatsapp_business_accounts' \
 -H 'Authorization: Bearer USER-ACCESS-TOKEN'
```

```
GraphRequest request = GraphRequest.newGraphPathRequest(
  accessToken,
  "/BUSINESS-ID/owned_whatsapp_business_accounts",
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
    initWithGraphPath:@"/BUSINESS-ID/owned_whatsapp_business_accounts"
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
    {
      "id": "WHATSAPP-BUSINESS-ACCOUNT-ID",
      "name": "Test WhatsApp Business Account",
      "timezone_id": "1",
      "message_template_namespace": "MESSAGE-TEMPLATE-NAMESPACE"
    }
  ],
  "paging": {
    "cursors": {
      "before": "BEFORE-CURSOR",
      "after": "AFTER-CURSOR"
    }
  }
}
```

Request with Filtering

cURL

```
curl -i -X GET \
"https://graph.facebook.com/LATEST-VERSION/BUSINESS-ID/owned_whatsapp_business_accounts \
?fields=id,name,creation_time \
&filtering=[{'field':'creation_time', 'operator': 'IN_RANGE', 'value': ['1569783261', '1604542049']}]"
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

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

200

Permissions error

190

Invalid OAuth 2.0 Access Token

104

Incorrect signature

80008

There have been too many calls to this WhatsApp Business account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

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