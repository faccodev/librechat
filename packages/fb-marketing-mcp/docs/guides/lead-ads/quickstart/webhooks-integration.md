---
title: "Integração de CRM - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lead-ads/quickstart/webhooks-integration"
scraped_at: "2026-02-01T14:12:32.599Z"
---

# Webhooks da Meta sobre anúncios de cadastro para a gestão do relacionamento com o cliente

Este guia ensina a implementar os Webhooks da Meta sobre anúncios de cadastro para integrar a gestão do relacionamento com o cliente.

## Visão geral

Um usuário deve entrar no app por meio do Login do Facebook e conceder ao app as permissões necessárias para a respectiva Página do Facebook que assinou os Webhooks da Meta sobre cadastros. O Login do Facebook retornará um token de acesso à Página com as permissões necessárias para permitir que o usuário do app visualize as notificações de cadastro enviadas ao seu servidor pela Meta.

## Antes de começar

Você precisará do seguinte:

-   Um [ID do app da Meta](https://developers.facebook.com/docs/development/create-an-app)
    
-   O token de acesso à Página de um anunciante, cliente ou usuário do app que possa executar a tarefa [`ADVERTISE` na Página](https://developers.facebook.com/docs/pages/overview/permissions-features#tasks)
    
-   Estas permissões:
    
    -   `pages_read_engagement`
        
    -   `pages_manage_metadata`
        
    -   `pages_show_list`
        
    -   `ads_management`
        
    -   `lead_retrieval`
        
    
-   Um [servidor da web com um ponto de extremidade para receber Webhooks da Meta](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
    
-   A [assinatura do webhook de geração de cadastros](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen)
    
-   O [SDK do Facebook para JavaScript](/docs/javascript/quickstart/) adicionado ao app
    
-   O [Login do Facebook](/docs/facebook-login) implementado no app
    

O conteúdo a seguir foi retirado de [https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen).

## Webhooks for Leads

Webhooks for Leads can send you real-time notifications of changes to your [Page's Lead ads](/docs/graph-api/webhooks/reference/page/#leadgen). For example, you can receive real-time updates whenever users click on a lead ad.

First, set up a Page Webhook:

1.  [Set up your endpoint and configure the Webhooks product](#set-up-endpoint-and-product).
2.  [Install your app](#install-app) using your Facebook page.

[](#)

## Setting Up Your Endpoint and Webhook Product

Follow our [Getting Started guide](/docs/graph-api/webhooks/getting-started) to create your endpoint and configure the Webhooks product. During configuration, make sure to choose the **Page** object and subscribe to the **leadgen** field.

[](#)

## Install Your App

Webhook notifications will only be sent if your Page has installed your Webhooks configured-app, and if the Page has not disabled the **App** platform in its [App Settings](https://www.facebook.com/settings?tab=applications). To get your Page to install the app, have your app send a `POST` request to the Page's [subscribed\_apps](/docs/graph-api/reference/page/subscribed_apps) edge using the Page's acccess token.

### Requirements

-   A Page access token requested from a person who can perform the [ADVERTISE task](/docs/pages/overview#tasks) on the Page being queried
-   The following [permissions](/docs/permissions/):
    -   `leads_retrieval`
    -   `pages_manage_metadata`
    -   `pages_show_list`
    -   `pages_read_engagement`
    -   `ads_management`

#### Sample Request

_Formatted for clarity_

```
curl -i -X POST "https://graph.facebook.com/{page-id}/subscribed_apps
  ?subscribed_fields=leadgen
  &access_token={page-access-token}"
```

#### Sample Response

```
{
  "success": "true"
}
```

To see which app's your Page has installed, send a `GET` request instead:

#### Sample Request

_Formatted for clarity_

```
curl -i -X GET "https://graph.facebook.com/{page-id}/subscribed_apps
  ?access_token={page-access-token}
```

#### Sample Response

```
{
  "data": [
    {
      "category": "Business",
      "link": "https://my-clever-domain-name.com/app",
      "name": "My Sample App",
      "id": "{page-id}"
    }
  ]
}
```

If your Page has not installed any apps, the API will return an empty data set.

#### Graph API Explorer

If you don't want to install your app programmatically, you can easily do it with the [Graph API Explorer](/tools/explorer) instead:

1.  Select your app in the **Application** dropdown menu. This will return your app's access token.
2.  Click the **Get Token** dropdown and select **Get User Access Token**, then choose the `pages_manage_metadata` permission. This will exchange your app token for a User access token with the `pages_manage_metadata` permission granted.
3.  Click **Get Token** again and select your Page. This will exchange your User access token for a Page access token.
4.  Change the operation method by clicking the `GET` dropdown menu and selecting `POST`.
5.  Replace the default `me?fields=id,name` query with the Page's **id** followed by `/subscribed_apps?subscribed_fields=leadgen`, then submit the query.

[](#)

## Common Uses

### Getting Page LeadGen Details

Your app can subscribe to a Page's Leads and get notified anytime a change occurs. For example, here's a notification sent when a User clicked on a lead ad.

#### Sample Webhook Response

```
{
   "object": "page",
   "entry": [
       {
           "id": 153125381133,
           "time": 1438292065,
           "changes": [
               {
                   "field": "leadgen",
                   "value": {
                       "leadgen_id": 123123123123,
                       "page_id": 123123123,
                       "form_id": 12312312312,
                       "adgroup_id": 12312312312,
                       "ad_id": 12312312312,
                       "created_time": 1440120384
                   }
               },
               {
                   "field": "leadgen",
                   "value": {
                       "leadgen_id": 123123123124,
                       "page_id": 123123123,
                       "form_id": 12312312312,
                       "adgroup_id": 12312312312,
                       "ad_id": 12312312312,
                       "created_time": 1440120384
                   }
               }
           ]
       }
   ]
}
```

[](#)

## See Also

-   Visit our [Lead Ads Retrieval guide](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving/) to learn how to use the `leadgen_id` from the notification to retrieve data associated with the leads.

[](#)