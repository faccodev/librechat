---
title: "Funções entre empresas - Business Management APIs"
source: "https://developers.facebook.com/docs/marketing-api/businessmanager/business-to-business"
scraped_at: "2026-02-01T14:25:55.480Z"
---

[Voltar para Português (Brasil)](/docs/business-management-apis/business-asset-management/guides/business-to-business/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 16 de out de 2025  
Atualização em Português (Brasil): 2 de jul de 2024

# Business-to-Business Functions

As of June 8, 2021, access to these endpoints is limited. Apps without access will receive an error.

## Request Access to Assets

A Meta Business Manager may request access to an ad account or Page owned by another Business Manager. They must specify the tasks that they want to assign in the request.

**Note:** Assigning a business to a Page requires a Page token.

To request `AGENCY` access, you must provide `permitted_tasks` in your request.

You can only send a request for access to assets to the Business Manager that you intend to approve and that they must already know your business.

### Examples

```
v24.0
```

If a business needs access to `adaccount_id` and needs to be able to assign its employees with `['ADVERTISE', 'ANALYZE']` tasks:

```
v24.0
```

For a Page, if you want to assign `['ADVERTISE', 'ANALYZE']` tasks for a Page someone does not own:

```
v24.0
```

These calls send out a notification to the admins of the ad account or Page, which asks them to accept the access request. The admins will see the notification in Ads Manager or Pages Manager. They can also accept the request in the user interface.

### Pending requests

If you want to see outstanding requests via the API, make a `GET` request to the `/{business-id}/clients` endpoint to check the `access_status` field for a pending status.

```
v24.0
```

The response will look like this:

```
"data": [
 {
    "name": "Random Page", 
    "page_permissions": [
    {
    "id": "1900952844321", 
    "permitted_tasks": [
        'MANAGE',
        'CREATE_CONTENT', 
        'MODERATE',  
        'ADVERTISE', 
        'ANALYZE',
    ], 
    "access_status": "CLIENT_RESPONSE_PENDING", 
    "access_requested_time": "2014-01-07T23:26:09+0000", 
    "access_updated_time": "2014-01-07T23:26:09+0000"
    }
    ], 
    "id": "190137931178903"
 },
```

[](#)

## Grant Access to Assets for Another Business Manager

This is also known as adding an agency to your object.

To accept an access request of an object you own from another Business Manager, or to give access of one of the objects you own to another Business Manager, you must specify the business and the list of tasks they should have access to.

If the access token used to make the API call belongs to a user or system user who has access to the requested asset via a business, the access to the asset can only be granted if this business is the `OWNER` of the asset. You cannot grant access to assets of which you are just an `AGENCY`.

### Examples

To give someone access to an ad account using the `'ADVERTISE'` and `'ANALYZE'` tasks:

```
v24.0
```

To give a business access to your Page with `ADVERTISE`, `MODERATE` and `ANALYZE` tasks:

```
v24.0
```

In the case of granting access to an ad account, a review from another business admin is sometimes required as a security measure. This review can be approved by navigating to [https://business.facebook.com/settings/requests/admin\_reviews](https://business.facebook.com/settings/requests/admin_reviews). In this case, the response will have an additional field indicating a review is required.

```
{
  "success": true,
  "requires_admin_approval": true
}
```

Page admins can also accept agency access requests in the **Manage Admin Roles** tab in the Page Settings.

[](#)

## Remove Access to Assets

This is also known as removing an agency from your business.

### Examples

To remove a Business Managers's access from your ad account:

```
v24.0
```

To remove a business's access from your Page:

```
v24.0
```

[](#)

## View Agency Access

### Examples

To see all the businesses that have access to your ad account:

```
v24.0
```

To see all the businesses that have access to your Page:

```
v24.0
```

To see all the businesses that have access to your business assets:

```
v24.0
```

[](#)

## View Client Access

### Examples

To see all the businesses that have given you access to one or more of their ad accounts or Pages:

```
v24.0
```

[](#)

## Managing Your Relationship as an Ad Agency Acting on Behalf of Another Business

These APIs allow you to manage the relationship between your ad accounts and the businesses for which you are acting "on behalf of" (OBO). Creating these relationships allows you to access custom audiences for the business and use of the audience overlap tool.

### View OBO request details

#### Example request

```
v24.0
```

#### Example response

The response contains the details of the OBO request.

```
{
  "data": [
    {
      "id": "1111111111",
      "receiving_business": {
        "id": "2222222222",
        "name": "Example Business Name"
      },
      "requesting_business": {
        "id": "3333333333",
        "name": "Example Business Name"
      },
      "status": "IN_PROGRESS",
      "business_owned_object": "1111111111"
    }
  ]
}
```

### Delete OBO requests

#### Example request

To cancel a pending request to act OBO another business:

```
v24.0
```

#### Example response

```
{
  "success": "true" 
}
```

### View the status of an ad account's OBO requests

#### Example request

To view the status of requests to act OBO another business for an ad account:

```
v24.0
```

**Note:** The `<STATUS>` in the request must be `APPROVE`, `DECLINE`, or `IN_PROGRESS`.

#### Example response

The response contains an array with the OBO request objects for an ad account matching the requested status.

```
{
  "data": [
    {
      "id": "1111111111",
      "status": "IN_PROGRESS",
      "receiving_business": {
        "id": "2222222222",
        "name": "Example Business Name"
      },
      "requesting_business": {
        "id": "3333333333",
        "name": "Example Business Name"
      }
    }
  ]
}
```

### View OBO requests received from other businesses

#### Example request

To view requests of `IN_PROGRESS` OBO requests sent to your business:

```
v24.0
```

#### Example response

The response contains the `IN_PROGRESS` OBO request IDs:

```
{
  "data": [
    {"id": "1111111111"},
    {"id": "2222222222"},
    {"id": "3333333333"}
  ]
}
```

### View pending OBO requests sent by your business

#### Example request

To view OBO requests that were sent by your business that are still in the `IN_PROGRESS` state:

```
v24.0
```

#### Example response

The response contains the `IN_PROGRESS` OBO request IDs:

```
{
  "data": [
    {"id": "1111111111"},
    {"id": "2222222222"},
    {"id": "3333333333"}
  ]
}
```

[](#)

## Learn More

-   [Reference: Business](/docs/marketing-api/reference/business)
-   [Business Asset Management](/docs/marketing-api/businessmanager/assets)
-   [Share Custom Audiences between Business Managers](/docs/marketing-api/businessmanager/assets/share-custom-audiences)

[](#)