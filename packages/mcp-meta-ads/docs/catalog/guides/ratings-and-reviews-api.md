---
title: "API de Avaliações e Classificações - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/ratings-and-reviews-api"
scraped_at: "2026-02-01T15:53:15.166Z"
---

# API de Avaliações e Classificações de Produtos

Usando essa API, você pode permitir que os clientes avaliem os produtos do seu [catálogo](/docs/marketing-api/reference/product-catalog/) para comercializá-los no Facebook e no Instagram. Caso seus produtos sejam exibidos nas tecnologias da Meta, as avaliações enviadas pelos clientes serão exibidas em conjunto, ajudando você a conquistar a confiança dos clientes.

## Etapa 1: criar um feed de avaliações e classificações de produtos

Para criar um novo feed de avaliações e classificações, faça uma solicitação `POST` para a borda [/{product\_catalog\_id}/product\_feeds](/docs/marketing-api/reference/product-feed#Creating) e defina `feed_type` como `PRODUCT_RATINGS_AND_REVIEWS`. Ao postar nessa borda, um feed de produtos do tipo `PRODUCT_RATINGS_AND_REVIEWS` é criado para o catálogo especificado no campo `product_catalog_id`.

### Solicitação:

cURLHTTPPHP SDKJavaScript SDK[Explorador da Graph API](/tools/explorer/?method=POST&path=%7BPRODUCT_CATALOG_ID%7D%2Fproduct_feeds%3Fname%3DNAME_OF_THE_FEED%26feed_type%3Dproduct_ratings_and_reviews)

```
curl -X POST \
  -F 'name="NAME_OF_THE_FEED"' \
  -F 'feed_type="product_ratings_and_reviews"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/{PRODUCT_CATALOG_ID}/product_feeds
```
```
POST /{PRODUCT_CATALOG_ID}/product_feeds HTTP/1.1
Host: graph.facebook.com

name=NAME_OF_THE_FEED&feed_type=product_ratings_and_reviews
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{PRODUCT_CATALOG_ID}/product_feeds',
    array (
      'name' => 'NAME_OF_THE_FEED',
      'feed_type' => 'product_ratings_and_reviews',
    ),
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
    "/{PRODUCT_CATALOG_ID}/product_feeds",
    "POST",
    {
        "name": "NAME_OF_THE_FEED",
        "feed_type": "product_ratings_and_reviews"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```

### Resposta:

```
{
    "id": "{PRODUCT_FEED_ID}",    
}
```

#### Observação:

Lembre-se deste `PRODUCT_FEED_ID`, que será usado na próxima etapa.

[](#)

## Etapa 2: carregar o arquivo de dados de avaliações para o feed de avaliações e classificações

Depois que o feed for criado, você poderá carregar o arquivo de dados das avaliações do seu produto usando uma solicitação `POST` para a borda [`/{product_feed_id}/uploads`](/docs/marketing-api/reference/product-feed/uploads#Creating). O arquivo precisa ter um formato CSV. Clique [aqui](https://developers.facebook.com/docs/commerce-platform/platforms/feed-schema-csv) para seguir a definição do esquema para esse tipo de arquivo.

### Solicitação:

**Exemplo** – o arquivo de dados de avaliações é hospedado em um local público

cURLHTTPPHP SDKJavaScript SDK[Explorador da Graph API](/tools/explorer/?method=POST&path=%7BPRODUCT_FEED_ID%7D%2Fuploads%3Furl%3Dhttp%253A%252F%252Fwww.example.com%252Freviews_of_catalog_123.csv)

```
curl -X POST \
  -F 'url="http://www.example.com/reviews_of_catalog_123.csv"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/{PRODUCT_FEED_ID}/uploads
```
```
POST /{PRODUCT_FEED_ID}/uploads HTTP/1.1
Host: graph.facebook.com

url=http%3A%2F%2Fwww.example.com%2Freviews_of_catalog_123.csv
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{PRODUCT_FEED_ID}/uploads',
    array (
      'url' => 'http://www.example.com/reviews_of_catalog_123.csv',
    ),
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
    "/{PRODUCT_FEED_ID}/uploads",
    "POST",
    {
        "url": "http:\/\/www.example.com\/reviews_of_catalog_123.csv"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```

**Exemplo** – carregamento dos arquivos de dados de avaliações diretamente da máquina local. O caminho do arquivo precisa ser alterado de acordo com o caso de uso.

cURLHTTPPHP SDKJavaScript SDK[Explorador da Graph API](/tools/explorer/?method=POST&path=%7BPRODUCT_FEED_ID%7D%2Fuploads%3Ffile%3D%2540reviews_of_catalog_123.csv%253Btype%253Dtext%252Fcsv)

```
curl -X POST \
  -F 'file=@reviews_of_catalog_123.csv;type=text/csv' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/{PRODUCT_FEED_ID}/uploads
```
```
POST /{PRODUCT_FEED_ID}/uploads HTTP/1.1
Host: graph.facebook.com

file=%40reviews_of_catalog_123.csv%3Btype%3Dtext%2Fcsv
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{PRODUCT_FEED_ID}/uploads',
    array (
      'file' => '@reviews_of_catalog_123.csv;type=text/csv',
    ),
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
    "/{PRODUCT_FEED_ID}/uploads",
    "POST",
    {
        "file": "@reviews_of_catalog_123.csv;type=text\/csv"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```

### Resposta:

```
{
    "id": "{UPLOAD_SESSION_ID}",    
}
```

### Arquivo de dados

1.  O arquivo de dados precisa ter um formato CSV
2.  O arquivo de dados precisa seguir o esquema definido aqui: [Product Review Feed Schema](https://developers.facebook.com/docs/commerce-platform/platforms/feed-schema-csv)
3.  O tamanho do arquivo precisa ser inferior a 100 MB.

### Solução de problemas

Informe o `UPLOAD_SESSION_ID` para o representante da Meta durante a solução de problemas.

[](#)