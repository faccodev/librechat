---
title: "Graph API Referência v24.0: Business Extendedcredits"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/extendedcredits/"
scraped_at: "2026-02-01T16:08:50.120Z"
---

Versão Graph API

[v24.0](#)

# Business Extended Credits

[](#)

Represents credit lines that belong to a business.

To find the ID of a business, go to [**Business Manager**](https://business.facebook.com/) > **Business Settings** > **Business Info**. There, you will see information about the business, including the ID.

[](#)

## Leitura

Fetch extended credit available for this business.

### Example

Requirements

-   whatsapp\_business\_management permission
    
-   business\_management permission
    
-   whatsapp\_business\_messaging permission
    
-   public\_profile permission
    
-   BUSINESS ID (also referred to as BUSINESS MANAGER ID in Business Settings)
    
-   USER ACCESS TOKEN
    

Request

cURLAndroid SDKObjective-C

```
curl -i -X GET \
 "https://graph.facebook.com/LATEST-VERSION/BUSINESS-ID/extendedcredits?access_token=USER-ACCESS-TOKEN"
```

```
GraphRequest request = GraphRequest.newGraphPathRequest(
  accessToken,
  "/business-id/extendedcredits",
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
    initWithGraphPath:@"/BUSINESS-ID/extendedcredits"
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
  	"id": "EXTENDED-CREDIT-ID"
   }
  ]
}
```

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [ExtendedCredit](/docs/marketing-api/reference/extended-credit/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

104

Incorrect signature

200

Permissions error

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