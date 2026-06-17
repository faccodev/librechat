---
title: "Tags de metadados - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/metadata-tags"
scraped_at: "2026-02-01T15:52:48.593Z"
---

# Tags de metadados

Opcionalmente, você pode definir tags de metadados nos arquivos do seu feed de produtos. Isso permite que o Facebook atribua catálogos ao seu app usando o feed em questão. Depois que você atribuir um catálogo ao seu app, a metatag não será necessária nos carregamentos de feed subsequentes para esse catálogo.

Inclua os seguintes elementos como comentários delimitados por espaço na parte superior dos feeds TSV/CSV ou dentro de uma tag `metadata` nos seus feeds XML:

-   `ref_application_id`: o ID do seu app do Facebook
    
-   `ref_asset_id`: a identificação única do feed no seu sistema
    

## Formatos de feed

Formato do feed

Descrição

CSV

Exemplo de arquivo de feed CSV com informações de referência na tag de metadados.

[Baixar (clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/48568332_2279458838955160_3512851659749326848_n.csv?_nc_cat=100&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=t5Hg2AlqWkMQ7kNvwGMQqbG&_nc_oc=AdkjaXsWeh0MhtLkJ9pIWlyrtZ5j93v9Eok4YN1OhUHKTkl6VDnir6VMsH1Ldy7suuPou_wNHU4IPF4Z0X0p8hS0&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gCRq5De0wrG3snsZrvyXoA&oh=00_AfujcWSDKAUy7A1a64Dgxjk9rFu7yT841_xUacf8yMlnYg&oe=69855E42)

TSV

Exemplo de arquivo de feed TSV com informações de referência na tag de metadados.

[Baixar (clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/48545963_1001287720060315_4746467383575576576_n.tsv?_nc_cat=107&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=iCtwzxOIti8Q7kNvwEi1SrD&_nc_oc=AdlrV2IHkUiNRp7hlgQ7toaft7h_yaTojEV-3MHrcN9K8cWWYkdeHayvPUuM39MU3QWT-mKasXETscNFkIIqYz2T&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gCRq5De0wrG3snsZrvyXoA&oh=00_AfvPZ3f1DwC_GvJBqyzL27Gq3r1qt5Y5ZO3EGK2EzPHAuA&oe=698557F1)

XML (RSS)

Exemplo de arquivo de feed XML (RSS) com informações de referência na tag de metadados.

[Baixar (clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/48625428_293593984617997_8019480020747550720_n.xml?_nc_cat=106&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=AN4dWZ5xZQwQ7kNvwF21ftE&_nc_oc=Adn_qb2KB0xYJYBNf_WYm1iYHy66WyjAbSaCtteyhmvuzRajXe0_l88OcKVGGXuHFfJGEdlNFs0ykCO_8JXDAJJe&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gCRq5De0wrG3snsZrvyXoA&oh=00_Afvy5Sj4R9_258bOjnms9lJxXHc5z9B1FZojgF4eknKomQ&oe=69855822)

XML (ATOM)

Exemplo de arquivo de feed XML (ATOM) com informações de referência na tag de metadados.

[Baixar (clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/43523807_2159129834409914_8786398993258119168_n.xml?_nc_cat=108&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=UAuvIFbnWMEQ7kNvwGfdUqh&_nc_oc=Adl5LLqktGXIE6_sYF5f1FbkPXvMRInrN8i07W3ANvCn-vJbyt4wcKXSrJwxNKff60oYMvltahMJWJwqVQRgQ2Cs&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gCRq5De0wrG3snsZrvyXoA&oh=00_AfvMsOfZRI7K3yDyrrldKn6tfah9csErUwrfhhVyNenTrA&oe=698545E2)

#### Exemplo – Formato de feed TSV

```
# ref_application_id <YOUR_APP_ID>
# ref_asset_id <YOUR_ASSET_ID>
id  title  ios_url  ios_app_store_id  ios_app_name  android_url  android_package  android_app_name  windows_phone_url  windows_phone_app_id  windows_phone_app_name  description  google_product_category  product_type  link  image_link  condition  availability  price  sale_price  sale_price_effective_date  gtin  brand  mpn  item_group_id  gender  age_group  color  size  shipping  custom_label_0
DB_1  Dog Bowl In Blue  example-ios://electronic/db_1  123  Electronic Example iOS  example-android://electronic/db_1  com.electronic.example  Electronic Example Android  example-windows://electronic/db_1  64ec0d1b-5b3b-4c77-a86b-5e12d465edc0  Electronic Example Windows  Solid plastic Dog Bowl in marine blue color  Animals > Pet Supplies  Bowls & Dining > Food & Water Bowls  http://www.example.com/bowls/db-1.html  https://www.facebook.com/images/product_image_template.png?id=1  new  in stock  9.99 GBP        Example    DB_GROUP_1          UK::Standard:9.95 GBP  "Made in Waterford, IE"
...
```

#### Exemplo – Formato de feed XML (RSS)

```
...
<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <metadata>
      <ref_application_id><YOUR_APP_ID></ref_application_id>
      <ref_asset_id><YOUR_ASSET_ID></ref_asset_id>
    </metadata>
  </channel>
</rss>
...
```

#### Exemplo – Formato de feed XML (ATOM)

```
...
<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <feed>
    <metadata>
      <ref_application_id><YOUR_APP_ID></ref_application_id>
      <ref_asset_id><YOUR_ASSET_ID></ref_asset_id>
    </metadata>
  </feed>
</rss>
...
```