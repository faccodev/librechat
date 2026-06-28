---
title: "Graph API Referência v24.0: Business Business Invoices"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/business_invoices/"
scraped_at: "2026-02-01T16:07:19.810Z"
---

Versão Graph API

[v24.0](#)

# Business Business Invoices

[](#)

## Leitura

The monthly invoices sent to the bill-to legal entities associated to a business.

Returns https://developers.facebook.com/docs/marketing-api/reference/omega-customer-trx/

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D%2Fbusiness_invoices&version=v24.0)

```
GET /v24.0/{business-id}/business_invoices HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}/business_invoices',
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
    "/{business-id}/business_invoices",
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
    "/{business-id}/business_invoices",
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
                               initWithGraphPath:@"/{business-id}/business_invoices"
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

`end_date`

string

Valor padrão: `"2026-02-01"`

End date for querying invoices by their billing period timestamp.

The billing period timestamp of an invoice is the first day of the month for which we're invoicing (i.e. a June 2021 invoice will have billing period of May 1st, 2021 = 2021-05-01).

Expected date format: YYYY-MM-DD.

Note: end\_date is exclusive.

`invoice_id`

string

Corresponds to the invoice number (i.e. the "invoice\_id" field on the OmegaCustomerTrx node) for a particular invoice/credit memo.

Used to query for a single invoice. If set, all other filter parameters are ignored.

`issue_end_date`

string

Valor padrão: `"2026-02-01"`

End date for querying invoices by the date in which they're issued.

Expected date format: YYYY-MM-DD.

Note: issue\_end\_date is exclusive.

`issue_start_date`

string

Start date for querying invoices by the date in which they're issued.

Expected date format: YYYY-MM-DD.

Note: issue\_start\_date is inclusive. Also, this parameter must be set in order to query by the issue date.

`root_id`

int64

Corresponds to the id (i.e. the "id" field on the OmegaCustomerTrx node) for a particular invoice/credit memo.

Used to query for a single invoice. If set, all other filter parameters are ignored.

`start_date`

string

Valor padrão: `"First day of 6 months ago"`

Start date for querying invoices by their billing period timestamp.

The billing period timestamp of an invoice is the first day of the month for which we're invoicing (i.e. a June 2021 invoice will have billing period of May 1st, 2021 = 2021-05-01).

Expected date format: YYYY-MM-DD.

Note: start\_date is exclusive. Also, start\_date and end\_date have a default value, so if no parameters are set, invoices are queried by the billing period

`type`

enum {INV, CM, DM, PRO\_FORMA}

Used to query invoices by their type, which can be 'INV': Invoice or 'CM': Credit Memo.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós [OmegaCustomerTrx](/docs/marketing-api/reference/omega-customer-trx/).

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

#### `summary`

Informações agregadas sobre a borda, como contagens. Especifique os campos a serem buscados no parâmetro de resumo (como `summary=total_count`).

Campo

Descrição

`total_count`

unsigned int32

Total number of invoices. To have this field returned, you must include the summary=true parameter and value in your request.

### Error Codes

Erro

Descrição

100

Invalid parameter

104

Incorrect signature

200

Permissions error

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