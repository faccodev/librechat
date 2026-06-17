---
title: "Referência - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/reference"
scraped_at: "2026-02-01T14:08:44.423Z"
---

# Referência – Catálogo

## Formatos de feed compatíveis

É preciso carregar o inventário no Facebook usando um catálogo. Para cada catálogo, deve ser fornecido um feed de produtos em um dos formatos compatíveis: CSV, TSV, XML (RSS), XML (ATOM) ou Planilhas Google. Para obter mais orientações, consulte o [artigo da Central de Ajuda](https://www.facebook.com/business/help/1898524300466211).

Formato

Descrição

CSV

Valor separado por vírgulas. Funciona com a maioria dos programas de planilha. A primeira linha determina o cabeçalho da coluna. As linhas subsequentes informam os valores correspondentes para cada rota.

  

Os campos que contêm espaços em branco ou vírgulas devem estar entre "aspas duplas". Uma aspa dupla dentro de um campo com aspas duplas deve ter escape com duas aspas duplas consecutivas.

Exemplo: `"Join our ""Royal"" membership program"`.

  

Os campos aninhados ou com diversos valores (como imagem) podem ser representados por meio de valores codificados por JSON ou por um conjunto de colunas de texto simples e sem formatação rotuladas com a sintaxe de caminho JSON.

Exemplo: `image[0].url`, `image[0].tag[0]`, `image[0].tag[1])`

  

As duas convenções podem ser usadas alternadamente no mesmo arquivo.

Veja exemplos de [feed CSV para anúncios de catálogo Advantage+](#example-csv-feed-da) e de [feed CSV para comércio](#example-csv-feed-commerce).

  

[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://lookaside.facebook.com/developers/resources/?id=dpa_product_catalog_sample_feed.csv)

**Você pode consultar nossos arquivos de exemplo CSV (.csv) ao criar seu feed, mas recomendamos usar o Gerenciador de Comércio como fonte principal**.

TSV

Valor separado por tabulações. Funciona com a maioria dos programas de planilha. Veja as diretrizes para [CSV](#csv-feed-format).

[Baixar (Clique com o botão direito do mouse > Salvar link como](https://lookaside.facebook.com/developers/resources/?id=dpa_product_catalog_sample_feed.tsv))

XML (RSS)

Rich-Site Summary, Extensible Markup Language. Um nó XML raiz inclui um conjunto de nós, cada um deles representando uma rota. O arquivo deve começar com a tag `declaration`. O formato é normalmente gerado por servidores da web ou sistemas de provedores de feed automatizados. Um conjunto de nós XML do item representa uma lista de produtos e deve começar com a tag de declaração `<?xml`.

Normalmente gerado por sistemas de provedores de feed automatizados ou servidores da web.

[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/329771588_2359116650923501_6795484304089074493_n.xml?_nc_cat=102&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=mpoUh-dHDS4Q7kNvwGrh4sa&_nc_oc=AdkceTwZP9hraoWHfqPa-FL6FJZfV5DGNwJN6KZuZ7mbmK3cYvz-fD0uXRIAPDju6_YuMXDKt_97v1t1QcYnXeyj&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=YkRQ5q7NNE4OusiCKPmJkg&oh=00_Afsm9KrjGZRImq7aFmVhVEqX7BVOuzEDHgjX34faVvO6Yw&oe=69854BAB)

O recebimento de um erro indica que a linha do seu arquivo do feed de dados XML é muito longa e excede nosso limite de tamanho de 5.242.880 bytes ou caracteres. Reformate o XML em várias linhas com um campo por linha e carregue o arquivo novamente. Para mais informações, consulte [Solucionar erros de feed de dados no catálogo](https://www.facebook.com/business/help/2041876302542944?id=725943027795860).

XML (Atom)

O Atom Syndication Format é uma linguagem XML usada para feeds da web, enquanto o Atom Publishing Protocol (AtomPub ou APP) é um protocolo simples baseado em HTTP para criar e atualizar recursos da web. O formato é normalmente gerado por servidores da web ou sistemas de provedores de feed automatizados. Um conjunto de nós XML do item representa uma lista de produtos e deve começar com a tag de declaração `<?xml`. Normalmente gerado por sistemas de provedores de feed automatizados ou servidores da web. Veja um [exemplo de feed XML (Atom) para comércio](#example-atom-xml-feed-commerce).

[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://lookaside.facebook.com/developers/resources/?id=dpa_product_catalog_sample_feed_atom.xml)

### Planilhas Google

Agora, o Gerenciador de Comércio também é compatível com o Planilhas Google para feeds programados:

1.  Crie seu feed de dados como uma planilha no Planilhas Google e obtenha o link compartilhável.
2.  Ao adicionar produtos no Gerenciador de Comércio, selecione a opção Planilhas Google. Copie e cole seu link compartilhável e finalize o carregamento.
3.  Continue gerenciando seu inventário na planilha Google no futuro e faremos buscas em horários programados.

#### Saiba mais

-   [Como criar um feed de dados para seu catálogo usando um modelo](https://www.facebook.com/business/help/1898524300466211)
    
-   [Campos e especificações do feed de dados para catálogos no Gerenciador de Comércio](https://www.facebook.com/business/help/120325381656392?id=725943027795860)
    

### Exemplos de feed

#### Exemplo de feed CSV: anúncios de catálogo Advantage+

```
id,title,description,availability,condition,price,link,image_link,brand,additional_image_link,age_group,color,gender,item_group_id,google_product_category,pattern,product_type,sale_price,sale_price_effective_date,size,FB_product_1234,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,in stock,new,9.99 USD,https://www.facebook.com/facebook_t_shirt,https://www.facebook.com/t_shirt_image_001.jpg,Facebook,https://www.facebook.com/t_shirt_image_002.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts,stripes1,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,small,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300
```

#### Exemplo de feed CSV: comércio

```
id,title,description,rich_text_description,availability,condition,price,link,image_link,brand,additional_image_link,age_group,color,gender,item_group_id,google_product_category,product_type,sale_price,sale_price_effective_date,size,status,inventory
FB_product_1234,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,small,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1235,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,medium,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1236,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,large,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1237,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,small,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1238,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,medium,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1239,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,large,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
```

#### Exemplo de feed XML (Atom): comércio

É preciso incluir o prefixo "g" para atributos no namespace do Google Merchant Center: `xmlns:g="http://base.google.com/ns/1.0"`. Para outros atributos não mencionados [aqui](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Fmerchants%2Fanswer%2F14987622%3Fsjid%3D12472021316023495514-AP&h=AT3LIkYx7mfEM3SWHDblzbXLwFu0JUSsxO-tehJfWQNJyGYZlb7GWjS-yEfjYER4SngDWe_E7pfcgi9F2siFefMcci6FON5GFJFsFKKPR6zyRpF9DdE_NCsgpPE5NwgBjQzVX0tJjpvNWBXfjluJQ8whr-FW72qbQQfhhR9I0tg), não inclua um prefixo, como `video`, `additional_image_link` e assim por diante.

```
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel> 
    <title>My Deal Shop Products</title>
    <description>Product Feed for Facebook</description> 
    <link>https://www.mydealsshop.foo</link>
    <atom:link href="https://www.mydealsshop.foo/pages/test-feed" rel="self" type="application/rss+xml" />
    
     
        <item>
            <g:item_group_id>SKU-123123</g:item_group_id>
            <g:gtin>12345678912345</g:gtin>
            <g:google_product_category>Toys &amp; Games > Toys > Executive Toys > Magnet Toys</g:google_product_category>            
            <g:id>SKU-123123-RED</g:id>
            <g:title>WidgetThing</g:title>            
            <g:description>This product is the product you need to do the thing</g:description>
            <g:link>https://www.mydealsshop.foo/products/widgetthing</g:link>
            <g:image_link>https://cdn.mycdn.foo/files/123123123.jpg</g:image_link>  
            
            <additional_image_link>https://cdn.mycdn.foo/files/123123123_image2.jpg</additional_image_link>            
            <additional_image_link>https://cdn.mycdn.foo/files/123123123_image3.jpg</additional_image_link>
                        
            <color>Red</color>           
                    
            <additional_variant_attribute>
                <label>Style</label>
                <value>Cool</value>
            </additional_variant_attribute>
                    
            <g:brand>AcmeCo</g:brand>
            <g:condition>New</g:condition>  
          
            <g:availability>in stock</g:availability>
            
            <g:price>19.99 USD</g:price>
            <g:sale_price>9.99 USD</g:sale_price>
           
        </item>  

        <item>
            <g:item_group_id>SKU-123123</g:item_group_id>
            <g:gtin>12345678912346</g:gtin>
            <g:google_product_category>Toys &amp; Games > Toys > Executive Toys > Magnet Toys</g:google_product_category>            
            <g:id>SKU-123123-GREEN</g:id>
            <g:title>WidgetThing</g:title>            
            <g:description>This product is the product you need to do the thing</g:description>
            <g:link>https://www.mydealsshop.foo/products/widgetthing</g:link>
            <g:image_link>https://cdn.mycdn.foo/files/123123123.jpg</g:image_link>  
            
            <additional_image_link>https://cdn.mycdn.foo/files/123123123_image2.jpg</additional_image_link>            
            <additional_image_link>https://cdn.mycdn.foo/files/123123123_image3.jpg</additional_image_link>
                        
            <color>Green</color>           
                    
            <additional_variant_attribute>
                <label>Style</label>
                <value>Cool</value>
            </additional_variant_attribute>
                    
            <g:brand>AcmeCo</g:brand>
            <g:condition>New</g:condition>  
          
            <g:availability>in stock</g:availability>
            
            <g:price>19.99 USD</g:price>
            <g:sale_price>9.99 USD</g:sale_price>
            
        </item>   
         

    </channel>
</rss>
```

## Formato do feed: programar buscas no feed de dados

Para programar buscas no feed de dados, veja os formatos sugeridos abaixo.

Formato do feed

Caso de uso

Exemplo de feed

CSV

Atualizar `price` e `availability` para um subconjunto de itens

[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://lookaside.facebook.com/developers/resources/?id=dpa_product_catalog_sample_feed_update.csv)

TSV

Redefinir `sale_price` e atualizar `custom_label_0` para um subconjunto de itens

[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://lookaside.facebook.com/developers/resources/?id=dpa_product_catalog_sample_feed_update.tsv)

[](#)

## Campos de catálogo compatíveis

Os campos de catálogo são fundamentais para garantir a qualidade da experiência dos clientes que compram produtos na sua Loja do Facebook ou do Instagram.

Esses campos são usados para preencher a página **Detalhes do produto** de cada item. Isso inclui informações importantes, como descrição do produto, imagens, variantes de tamanho/cor, preço e disponibilidade. Exibir dados incompletos ou incorretos pode gerar percepções negativas, impactar a conversão em compras, além de criar experiências enganosas ou que abalam a confiança do usuário.

### Campos compatíveis para produtos

A tabela a seguir define os campos usados para criar um catálogo, incluindo o nível de exigência (obrigatório ou opcional). **Como uma boa prática relacionada a convenções de nomenclatura de colunas, use o inglês dos EUA para todos os campos**.

-   [Required Fields (for Ads and Commerce)](#required-fields)
-   [Additional Required Fields for Checkout on Facebook and Instagram (US Only)](#additional-required-fields)
-   [Optional Fields](#optional-fields)
-   [Additional Required Fields for Selling in India](#required-fields-india)

### Required Fields (for Ads and Commerce)

Each field in your data feed represents information about your products. All field names and certain supported values must be in US English. The following fields are required for each product in your catalog. **Note**: If any required fields are missing or formatted incorrectly, products may not upload to your catalog.

Attribute and Type

Description

`id`

Type: string

Max character limit: 100

A unique content ID for the item. Use the item's SKU if possible. Each content ID must appear only once in your catalog. **If there are multiple instances of the same ID, we ignore all instances.**

  

**Note**: For dynamic ads, this ID must exactly match the content ID for the same item in your Meta Pixel.

  

Example: `12345`

This field is required for supplementary feeds. Each item’s content ID must exactly match in the supplementary feed and the main feed it’s linked to. This indicates it’s the same item in both feeds.

`title`

Type: string

Character limit: 200, but we recommend a maximum of 65 to avoid longer titles being cut off.

  

A specific, relevant title for the item. See [product title specifications](https://www.facebook.com/business/help/2104231189874655?id=663946777378466).

Example: `Blue Cotton T-Shirt`

This field is supported by supplementary feeds.

`description`

type: string

Max character limit: 9999

A relevant description of the item. Include specific and unique product features, such as material or color. Use plain text (not HTML) and don't enter text in all capital letters or include any links. The description should be different than the title. See [product description specifications](https://www.facebook.com/business/help/2302017289821154).

  

Example: A comfortable royal blue women's T-shirt in organic cotton. Cap sleeves and relaxed fit. Perfect for warm summer days.

This field is supported by supplementary feeds.

`availability`

Type: string

The current availability of the item. Must be written in U.S. English. Supported values:

  

-   `in stock`
    
-   `out of stock`
    

Items that are out of stock display as "sold out" in your shop. They don't display at all in your ads.

  

Example: `in stock`

`condition`

Type: string

The condition of the item. Supported values: `new`, `refurbished`, `used`.

  

Example: `new`

`price`

type: string

The price of the item. Format the price as a number, followed by a space and then the 3-letter ISO 4217 currency code [(ISO 4217 standards)](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT3Cv6J2lWolOYU0uDyUj-MkUDMQs2rCSbgsIGg6O5FexzwmQqMh0ZzPKxfWGzAYDV5lojCU0Xdm-n3q9Upgfmz25VNoXfGaDaPH1KJ-AeZneHA-Y1eP5CFW18pMUtTdC6OxM-B1RDFp-9VatiyiyNlBOy3wKHYjzHWGYNiJa9g). Always use a period (.) as the decimal point, not a comma (,). Don't include currency symbols such as $, € or £.

To add product information and prices that will display for other countries or languages, [upload a country feed or language feed to your catalog](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).

Example: `9.99 USD`, `7.99 EUR`

`link`

Type: string

The URL to the specific product page for the item on your business's website where people can learn more about or buy that exact item. Links must begin with http:// or https://, be valid and be hosted on your business’s website domain. Don't provide a link to a Facebook domain (such as your business's Facebook Page) or somewhere else.

  

Example: `http://www.jaspersmarket.com/products/shirt`

`image_link`

Type: string

The URL for the main image of your item. Images must be in JPEG or PNG format, at least 500 x 500 pixels and up to 8 MB. See [product image specifications](https://www.facebook.com/business/help/686259348512056).

  

Example: `http://www.jaspersmarket.com/products/shirt.jpg`

  

**Note**: If you change the image later, the new image must use a different URL or the change won't be recognized.

This field is supported by supplementary feeds.

`brand`

Type: string

Max characters: 100

The brand name of the item.

Example: `Jasper's Market`

[](#)

### Additional Required Fields for Checkout on Facebook and Instagram (US Only)

[Checkout on Facebook and Instagram](https://www.facebook.com/business/help/2509359009104717) (US only) allows customers to complete purchases directly on Facebook and Instagram. To sell items with this checkout method, provide the following additional fields for each product in your catalog. If items are missing these fields, people won't be able to buy them or they may not show in your shop at all.

Attribute and Type

Description

`quantity_to_sell_on_facebook`

Type: integer

The quantity of this item that you have available to sell on Facebook and Instagram. Enter a whole number. To prevent overselling, the item's quantity will be automatically reduced each time a purchase order is confirmed through checkout.

  

**Note**: To display as in stock for checkout, an item's `quantity_to_sell_on_facebook` must be `1` or higher and its `availability` must also be set to `in stock`.

  

Example: `150`

This field was previously called `inventory`. While we still support the old field name, we recommend that you use the new name.

`size`

Type: string

Required for items in [specific product categories](https://www.facebook.com/business/help/1027180054842090) including clothing and shoes.

Max character limit: 200

  

The size of the item. Enter the size as a word, abbreviation or number, such as "Small", "XL", "12" or "One Size".

  

Example: `Medium`

This field is supported by supplementary feeds.

[](#)

### Optional Fields

You can also include many optional fields to share more product information with customers or control how items are displayed.

Attribute and Type

Description

`sale_price`

Type: string

If the item is on sale, enter its discounted price. Use the same formatting as the `price` field.

  

Example: `7.99 USD`

`sale_price_effective_date`

Type: two ISO-8601 timestamp

The date, time and time zone when your sale starts and ends. If you don't add this field, any items with a `sale_price` remain on sale until you remove their sale price. Use this format:

  

`YYYY-MM-DDT23:59+00:00/YYYY-MM-DDT23:59+00:00`

  

-   Enter the sale start date as `YYYY-MM-DD` followed by a "T".
-   Enter the start time in 24-hour format (00:00 to 23:59) followed by the UTC time zone (-12:00 to +14:00).
-   Enter a "/". Then, repeat the same format for the date and time when your sale ends.

Example (using PST time zone -08:00):

`2020-04-30T09:30-08:00/2020-05-30T23:59-08:00`

`item_group_id`

Type: string

Max character limit: 100

Allows you to set up variants of the same product, such as different sizes, colors or patterns. Enter the same group ID in this field for all variants of the same product to indicate they're part of a group. Learn more about [product variants](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-variants).

  

Example: `Shirt_1`

`status`

Type: string

Controls whether the item is active or archived in your catalog. Only active items can be seen by people in your ads, shops or any other channels. Supported values: `active`, `archived`. Items are active by default. Learn more about [archiving items](https://www.facebook.com/business/help/543317109402043?id=725943027795860).

  

Example: `active`

  

**Note**: Some partner platforms such as Shopify may sync items to your catalog with a status called **staging**, which behaves the same as `archived`.

This field was previously called `visibility`. While we still support the old field name, we recommend that you use the new name.

`additional_image_link`

Type: string

Maximum character limit: 2000

URLs for up to 20 additional images of your item, separated by a comma (,), semicolon (;), space ( ) or vertical bar (|). Follow the same image specifications as `image_link`.

  

Since this field takes a string, the entire list of URLs must be formatted with double quotes. For example: `"http://www.jaspersmarket.com/products/shirt2.jpg, http://www.jaspersmarket.com/products/shirt3.jpg"`

  

To display additional images in your ads, see [Dynamic Ads, Ad Template](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/ads-management/#adtemplate)

  

This field is supported by supplementary feeds.

`google_product_category`

Type: string

Provide the most specific Google product category possible from this list: [Excel (.xls)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.xls&h=AT0pVwE0PhaWENU-s-r5cY29JqbNI9dmsK84JmKZB7TyudKyKj_M8S55dtWXIrUwqzK58Xak0vrOZZqMFIKSbawWrh1Chxe5kZqX1-uBJWtet_ZgkDFWO3THBmfAdNsrhJQeMXQ6_cEBg4D8P120GYBheqBLkSLYapRvvZIt6mM) or [Plain text (.txt)](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT2TwSIl1KGtuY6ZKBCw1Tww0E01epWT0brwyjF6wxR8RFlID2ht_LYftWNMB6Rt7gbjN_mOWqJk7ZUH9MV8jp-xPBYPFESItMOPsgxpDJjPnKOgrjGJ2UBF8WP2sxusjtS_mceKscktpkKNpZxOs2oEPCJUxASF1LVfY0XVbzc). Enter either the category name (not case sensitive) or its ID number.

  

Example: `Apparel & Accessories > Clothing > Shirts & Tops` or `212`

  

Learn more about [product categories](https://www.facebook.com/business/help/526764014610932) (Business Help Center article).

  

**Note**: The category lists above are in US English. You can download other languages from [Google Merchant Help Center](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Fmerchants%2Fanswer%2F6324436&h=AT2Edd2zIF7uJifSScEr52mdju6p8JFpuz94B8d9t8KCUhnntu9LD6VgYfMmG72ShlvkRdH8TtidftWRISk-E7umWgtKNSwOZXxJwG7MBeQ6N8UV4DnzWLkQfOxwfhbGJIZQQWZ68_9uJy9hqTLuoDDvI_8I3Q7094O-6Yiyoqg).

This field is supported by supplementary feeds.

`fb_product_category`

Type: string

Provide the most specific Facebook product category possible from this list: [Spreadsheet (.csv)](https://www.facebook.com/products/categories/en_US.csv) or [Plain text (.txt)](https://www.facebook.com/products/categories/en_US.txt). Enter either the category name (not case sensitive) or its ID number.

  

Example: `Clothing & Accessories > Clothing > Women's Clothing > Tops & T-Shirts` or `430`

  

Learn more about [product categories](https://www.facebook.com/business/help/526764014610932) (Business Help Center article).

  

**Note**: The category lists above are in US English. You can download other languages [here](https://www.facebook.com/business/help/526764014610932).

This field is supported by supplementary feeds.

Category-specific fields

When you provide a Google or Facebook product category (`google_product_category` or `fb_product_category`), we recommend that you add more fields that are specific to that category. This gives people more information to make a purchase decision. For example, for beauty products, you could provide **ingredients**. [View the list of category-specific fields](/docs/commerce-platform/catalog/categories#cat-spec-fields).

This field is supported by supplementary feeds.

`color`

Type: string

Max character limit: 200

The main color of the item. Describe the color in words, not a hex code.

  

Example: `Royal Blue`

This field is supported by supplementary feeds.

`gender`

Type: string

The gender your item is targeted towards. Supported values: `female`, `male`, `unisex`.

  

Example: `unisex`

This field is supported by supplementary feeds.

`size`

Type: string

Max character limit: 200

The size of the item. Enter the size as a word, abbreviation or number, such as "Small", "XL", "12" or "One Size".

  

Example: `Medium`

This field is supported by supplementary feeds.

`age_group`

Type: string

The age group the item is targeted towards. Accepted values: `adult`, `all ages`, `teen`, `kids`, `toddler`, `infant`, `newborn`.

  

Example: `adult`

This field is supported by supplementary feeds.

`material`

Type: string

Character limit: 200  
The material the item is made from, such as cotton, polyester, denim or leather.

  

Example: `Organic Cotton`

This field is supported by supplementary feeds.

`pattern`

Type: string

Max character limit: 100

The pattern or graphic print on the item.

  

Example: `Flannel`, `Gingham`, `Polka dots`, `stripes`

This field is supported by supplementary feeds.

`shipping`

Type: string

**This allows you to use a shipping-related overlay in your ads**.

Shipping details for the item, formatted as: `Country:Region:Service:Price`

  

-   Enter the country as a 2-letter [ISO 3166 country code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_3166-1_alpha-2%23Officially_assigned_code_elements&h=AT1hmgqdqUYFOcZRyDbaPpRMigsFHnsVjmYiYPQeRqhDfr9kaChzX4zJxO1ZIhpNgStqpjocfgpAKl818J3nebG48uHWL_OVdB8pmwjcEm0UM35txeKVEbrwfW595F7VHmpMUvhvOWZtJrTfNhHV2HP_2O7IhjEMbaEJponbTow).
-   Enter the region, state or province. If shipping information is the same for an entire country, you can leave out the region but keep the :: as shown in the Philippines (PH) example below.
-   Enter a description of the shipping service such as Ground or Air.
-   Enter the price as a number followed by a space and then the 3-letter [ISO 4217 currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217%23Active_codes&h=AT2qokK7UFMkvogV4Cy7kIkX49wJ-TzoDbe_C8ifhVV7qOVuubvGFhl9b4T0CW-cGNMaWvVj4epJZ2Ok8jqkk0u_jiItD4MX4INuDAdkpbadu-bY2e2TBhqg9lVLIiARY1IsPDK8uloZ9WyTT4oQba8zBYwI4Zap54NNhd1_DfI). **Note**: To use the "Free Shipping" overlay for ads, enter the price as 0.0.
-   If you offer different shipping details by region or country, separate them with a comma (,) as shown in the example.

Example: `US:NY:Ground:9.99 USD, PH::Air:300 PHP`

`shipping_weight`

Type: string

Shipping weight of the item in `lb`, `oz`, `g`, or `kg`.

  

Example: `10 kg`

`internal_label`

Type: string

Add internal labels to help filter items when you create [product sets](https://www.facebook.com/business/help/620275848114281?id=725943027795860). For example, you could add a “summer” label to all items that are part of a summer promotion and then filter those items into a set. Labels are only visible to you.

Enclose each label **in single quotes (')** and separate multiple labels with commas (,). Don’t include white spaces at the beginning or end of a label. Character limit: Up to 5,000 labels per product and 110 characters per label.

#### TSV, XLSX, Google Sheets:

Examples:

-   One label: \['summer'\]
-   Multiple labels: \['summer','trending'\]

#### CSV format requires enclosing the list in double quotes.

Examples:

-   One label: “\['summer'\]”
-   Multiple labels: “\['summer','trending'\]”

#### The Atom XML format requires to wrap each label:

`<internal_label>summer</internal_label>` `<internal_label>trending</internal_label>`

Internal labels are case insensitive and will be stored lowercased. For example, providing the internal label ‘Summer’, with capital ‘s’, will result in storing ‘summer’, with lowercase ‘s’. _To reduce confusion, we suggest using only lowercase characters._

When used in product sets, internal labels are made to be matched as a whole, so please refrain from using the “contains” condition on internal labels. Example: Given an item with internal label ‘summer\_clothes”:

Set filter internal\_label is any of ‘‘summer\_clothes’ **will match** the item.

Set filter internal\_label contains ‘clothes’ is **NOT guaranteed** to match the item.

For the best results, we recommend using ASCII lowercase characters and, if needed the following token separators '#' , '\_' , ' : '.

**Note**: If you’re currently using custom labels (`custom_label_0` to `custom_label_4`) for filtering product sets, switching to internal labels (`internal_label`) instead is recommended. Unlike custom labels, you can add or update internal labels as often as needed without sending items through policy review each time, which can impact ad delivery.

This field was previously called `product_tags`. While we still support the old field name, we recommend that you use the new name.

`custom_label_[0-4]`

Type: string

Max character limit: 100

Up to five custom fields for any additional information you want to filter items by when you create sets. For example, you could use a custom field to indicate all items that are part of a summer sale, and then filter those items into a set. This field supports any text value, including numbers.

  

Example: `Summer Sale`

This field is supported by supplementary feeds.

`custom_number_[0-4]`

Type: int

Up to five custom fields for any additional number-related information you want to filter items by when you create sets. This field allows you to filter by number ranges (**is greater than** and **is less than**) when you create a set. For example, you could use this field to indicate the year an item was produced, and then filter a certain year range into a set.

  

These fields support whole numbers between 0 and 4294967295. They don't support decimals or commas, such as 5.5 or 10,000.

  

Example: `2025`

`rich_text_description`

Type: string

Max characters: 9999

The rich text (HTML) description for item. **Note**: If this field is provided, we use it instead of `description`; however, **the `description` field is still required** because it's a fallback.

  

Supported tags include:

-   `<form>`, `<fieldset>`, `<div>`, `<span>`, `<section>`
-   All Header tags: `<header>`, `<h1>` thru `<h6>`
-   Table tags: `<table>`, `<tbody>`, `<tfoot>`, `<thead>`, `<td>`, `<th>`, `<tr>`
-   List tags: `<ul>`, `<li>`, `<ol>`, `<dl>`, `<dd>`, `<dt>`
-   Other formatting tags: `<b>`, `<u>`, `<i>`, `<em>`, `<strong>`, `<title>`, `<small>`, `<br>`, `<p>`, `<div>`, `<sub>`, `<sup>`, `<pre>`, `<q>`, `<s>`

**Note:** Any attributes of the html tags such as `<style>` will be stripped off from the field.

  

Example:

```
<html>
<p>Unisex cotton T-shirt with 3/4 length sleeves in royal blue. Great for everyday casual wear. Features graphic print of logo in white on upper left sleeve.</p>
<ul>
<li>100% Cotton</li>
<li>Relaxed Fit</li>
</ul>
</html>
```

This field is supported by supplementary feeds.

`product_type`

Type: string

Max character limit: 750

Category the item belongs to, according to your business's product categorization system, if you have one. You can also enter a Google product category. For commerce, represents the product category in your internal system. Learn more about [product categories](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-categories) for commerce.

  

Example: `Home & Garden > Kitchen & Dining > Appliances > Refrigerators`

`video[0].url`

`video[1].url`

`video[2].url`

`video[3].url` ... up to

`video[19].url`

Type: string

Up to 20 fields each containing a link to a video of your item. Must be a direct link to download the video file, not a link to a video player such as YouTube.

  

The maximum video file size is 200 MB. Supported formats include: .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv

  

Example:

http://www.jaspersmarket.com/product\_video.avi

This field is supported by supplementary feeds.

`additional_variant_attribute`

Type: string

Additional attributes that are not core attributes (size, color, gender, pattern, and so on). Do not use a core attribute as an additional attribute. Learn more about [Product Variants](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-variants).

  

Example: `Scent:Fruity, Flavor:Strawberry`

This field is supported by supplementary feeds.

`unit_price`

Type: string

Provide this information for any products customarily sold by a unit of measurement (for example "$10 / pound"). To specify this information, provide the following:

**Amount value**: this is a float  
**Currency**: any supported currency  
**Unit type**: any of the following measurements:

  

Centiliters: `cl`  
Centimeters: `cm`  
Count: `ct`  
Cubic Meters: `cbm`  
Feet: `ft`  
Fluid Ounces: `fl oz`  
Gallons: `gal`  
Grams: `g`  
Inches: `in`  
Kilograms: `kg`  
Liters: `l`  
Meters: `m`  
Milligrams: `mg`  
Milliliters: `ml`  
Ounces: `oz`  
Pints: `pt`  
Pounds: `lb`  
Quarts: `qt`  
Square Feet: `sqft`  
Square meters: `sqm`  
Yards: `yd`

  

This information is uploaded via feed uploads in the `unit_price` field in a JSON format as follows:

```
{value: 10.0, currency: "USD", unit: "lb"}
```

It can also be uploaded via XML as follows:

```
<unit_price>
 <value>10</value>
 <currency>USD</currency>
 <unit>lb</unit>
</unit_price>
```

Example: Download a [sample CSV file](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/199984213_513886709803349_7686341417109910400_n.csv?_nc_cat=107&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=lmm84vVZzAoQ7kNvwHuWfpC&_nc_oc=AdmpRBOOd7RNQJNYibWwdV9Wa1uM5fshiUW8so3bfbQ76iMPSxA1FFzbQxjlr2TuRJXCq5eemW4ylTyqyXbQuBBL&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=YkRQ5q7NNE4OusiCKPmJkg&oh=00_AfsEKUhKEvqlE5VCTgh-svSqK9zoEnYJ9PRYyp4ZuRWvXw&oe=69854B93) with an example of adding `unit_price` to products.

`gtin`

Type: string

The item’s Global Trade Item Number (GTIN). Providing a GTIN is recommended to help classify the item. The GTIN may appear on the barcode, packaging or book cover. Not all items have a GTIN. Only provide one if you’re sure it’s correct. Don’t include dashes or spaces.

GTIN types:

-   UPC (North America / GTIN-12): 12-digit number.
-   EAN (Europe / GTIN-13): 13-digit number.
-   JAN (Japan / GTIN-13): 8 or 13-digit number.
-   ISBN (for books / ISBN-13): 13-digit number. Convert any 10-digit ISBN-10 numbers to ISBN-13.
-   ITF-14 (for multipacks / GTIN-14): 14-digit number.

Example: `4011200296908`

This field is supported by supplementary feeds.

`mpn`

Type: string

Max characters: 100.

The item’s manufacturer part number (MPN), a unique alphanumeric code assigned by the manufacturer in some industries to identify a specific item or part. It may appear on the packaging, label or etched directly onto the item. Providing a MPN is recommended to help classify the item if there is no GTIN. Not all items have a MPN. Only provide one if you’re sure it’s correct.

Example: `JAS12345PER`

`expiration_date`

Type: date

Product expiration. If the product is expired, it won't be shown on Facebook. This date should follow the [ISO‑8601](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_8601&h=AT19GlVRbusYbsJZFLlg7jXRE_FJK8spARYN9wrHRd74eCIlLCU-bfW6iynrNFdPTR14QHmfULznCQjHXdytji3gsPr0mRDhFthSqlmjo17IUZ8NDSZs8But1XRmCAJkmyuNmNGnW0G9C9GEaOC515RndZNkdAXILy7dY_xGJEc) (_YYYY‑MM‑DD_) format.

`return_policy_info`

Type: string

Specify a return window for this item, which overrides your shop's default return window. Using this field in your data feed is an alternative to setting up a custom return window manually in Commerce Manager. [Learn more about return windows](https://www.facebook.com/business/help/417898513266638).

  

Indicate whether the item is final sale (true or false) and the number of days of the the return window (for final sale, enter 0 days).

  

Example of an item with a 30 day return window: {is\_final\_sale: "false", return\_policy\_days: "30"}

  

Example of a final sale item:

{is\_final\_sale: "true", return\_policy\_days: "0"}

  

`mobile_link`

Type: string

Link to mobile-optimized page for item on the merchant's website.

`applink`

Type: string

Provide deep links in feed following the [App Links](https://developers.facebook.com/docs/applinks) specification. Deep link information in feed takes precedence over any information we collect with App Links metadata with our web crawler.

  

If you already have deep link information from App Links, you don't need to specify this data. Information from App Links is used to display the correct deep link. To display deep links in your ads, see [Dynamic Ads, Ad Template](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/ads-management/#adtemplate).

  

Supported applinks: `applink.ios_url`, `applink.ios_app_store_id`, `applink.ios_app_name`, `applink.android_url`, `applink.android_package`, `applink.android_app_name`, `applink.windows_phone_url`, `applink.windows_phone_app_id`, `applink.windows_phone_app_name`, `applink.ipad_url`, `applink.ipad_app_store_id`, `applink.ipad_app_name`.

For Android, we require `applink.android_package` and url is optional. For other applinks, a valid url is required.

Learn more about [product deep links](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

  

`disabled_capabilities`

Used to control the channel visibility of each specific product in your catalog. With this feature, you can enable or disable your products from being displayed in Shops, Marketplace Shops, Instagram Product Tagging, Dynamic Ads, and Mini Shops.

Learn more about [`disabled_capabilities`](/docs/commerce-platform/catalog/fields/product-visibility-per-channel).

[](#)

### Additional Required Fields for Selling in India

Attribute and Type

Description

`origin_country`  
Type: ISOCountryCode (2 letter country code)

The item's country of origin. Enter the two-letter ISO country code

  

Example value: `US`

This field is supported by supplementary feeds.

`importer_name`  
Type: string

If the country of origin is not India, provide the legal entity name of the item's importer

  

Example value: `Jasper's Market Inc.`

This field is supported by supplementary feeds.

`importer_address`  
Type: JSON structure

If the country of origin is not India, provide the operational address of the importer. This field uses a JSON structure, which contains the following fields:

  

`street1` - string, required. The first line of the street address  
`street2` - string, optional. The second line of the street address.  
`city` - string, required. The city name.  
`region` - string, optional. The region, state or province. (In the US this is to be used for US State)  
`postal_code` - string, optional (in the US this is to be used for Zip Code)  
`country` - required. Enter the ISO Country code (2-letter country code)

  

The overall address will be displayed to users in the following format: `street1`, `street2` (if present), `city`, `region` (if present) `postal_code` (if present), `country` (full name, localized for the user).

  

This example value: \`

```
{ street1: "1 Hacker Way", street2: "Building 18", city: "Menlo Park", region: "CA", postal_code: "94025", country: "US" }
```

will be rendered as "1 Hacker Way, Building 18, Menlo Park, CA 94025 United States of America"

This field is supported by supplementary feeds.

`manufacturer_info`  
Type: string

**Required for Shops only.**

Information about the product's manufacturer, such as the manufacturer name and address.

  

Example: The Manufacturer Co. - 1 Hacker Way, Menlo Park, CA 94025 USA

This field is supported by supplementary feeds.

`wa_compliance_category`  
Type: string

**Required for selling on WhatsApp only.**

If the item is a non-physical good sold in India, such as a service, use this field to indicate that the item is exempt from providing the country of origin (`origin_country`), importer name (`importer_name`) and importer address (`importer_address`).

  

Supported values (case sensitive):

`COUNTRY_ORIGIN_EXEMPT`: The item is exempt.

`DEFAULT`: The item is not exempt. This is the default value if you leave the field blank.

[](#)

[](#)

## Campos compatíveis – Catálogos localizados

### Requisitos

-   Você deve incluir um campo `id` no seu _arquivo de feed de dados secundário_. Para exibir anúncios de catálogo Advantage+, o número de identificação de cada item deve corresponder ao número de identificação no feed de dados do catálogo original e ao número de identificação do conteúdo do seu pixel.
    
-   Você deve incluir um campo `override`. Neste campo, insira os códigos ISO dos idiomas ou países para os quais deseja fornecer informações localizadas. Neste campo, insira os códigos ISO dos idiomas ou países para os quais deseja fornecer informações localizadas. O valor na coluna `override` deve ser um código ISO compatível de [idiomas](https://www.facebook.com/business/help/2144286692311411) ou [países](https://www.facebook.com/business/help/2144286692311411). Saiba mais sobre os [**códigos de idiomas e países compatíveis**](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).
    
-   `price`, `sale_price`, `unit_price`, `base_price`, `status` (visibilidade) e `availability` só devem ser fornecidos em um feed de país. Esses campos não podem ser fornecidos em um feed de idiomas. Isso ajuda a garantir que os clientes vejam os dados corretos do produto localizado.
    

Saiba mais sobre os campos `id` e `override` em [Criar um feed de país ou idioma para localizar o seu catálogo, etapas 2 e 3](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).

### Produtos

-   `title`
    
-   `description`
    
-   `availability`
    
-   `link`
    
-   `brand`
    
-   `price`
    
-   `sale_price`
    
-   `sale_price_effective_date`
    
-   `color`
    
-   `size`
    
-   `material`
    
-   `pattern`
    
-   `custom_label_[0-4]`
    
-   `short_description`
    
-   `additional_variant_attribute`
    
-   `applink.ios_url`, `applink.ios_app_store_id`, `applink.ios_app_name`, `applink.android_url`, `applink.android_package`, `applink.android_app_name`, `applink.windows_phone_url`, `applink.windows_phone_app_id`, `applink.windows_phone_app_name`, `applink.ipad_url`, `applink.ipad_app_store_id`, `applink.ipad_app_name`
    

Para localizar campos de applink, você deve fornecer todos eles. Saiba mais sobre [deep links de produtos](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

-   `image[0].url`, `image[0].tag[0]`
    

Para localizar uma imagem, você deve usar os campos de imagem `image[0].url`, `image[0].tag[0]` aninhados. O campo `image_link` não é aceito para localização.

Para referência, veja a [lista principal de campos para produtos](#da-commerce).

* * *

### Hotéis

-   `name`
    
-   `description`
    
-   `base_price`
    
-   `sale_price`
    
-   `brand`
    
-   `url`
    
-   `neighborhood`
    
-   `longitude`
    
-   `latitude`
    
-   `image[0].url`, `image[0].tag[0]``internal_label`
    
-   `applink.ios_url`, `applink.ios_app_store_id`, `applink.ios_app_name`, `applink.android_url`, `applink.android_package`, `applink.android_app_name`, `applink.windows_phone_url`, `applink.windows_phone_app_id`, `applink.windows_phone_app_name`, `applink.ipad_url`, `applink.ipad_app_store_id`, `applink.ipad_app_name`
    

Para localizar campos de applink, você deve fornecer todos eles. Saiba mais sobre [deep links de produtos](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

Para referência, veja a [lista principal de campos para hotéis](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#hotel-feed).

* * *

### Voos

-   `description`
    
-   `url`
    
-   `origin_city`
    
-   `destination_city`
    
-   `price`
    
-   `one_way_price`
    
-   `image[0].url`, `image[0].tag[0]`
    
-   `custom_label_[0-4]`
    
-   `custom_number_[0-4]`
    
-   `internal_label`
    
-   `applink.ios_url`, `applink.ios_app_store_id`, `applink.ios_app_name`, `applink.android_url`, `applink.android_package`, `applink.android_app_name`, `applink.windows_phone_url`, `applink.windows_phone_app_id`, `applink.windows_phone_app_name`, `applink.ipad_url`, `applink.ipad_app_store_id`, `applink.ipad_app_name`
    

Para localizar campos de applink, você deve fornecer todos eles. Saiba mais sobre [deep links de produtos](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

Para referência, veja a [lista principal de campos para voos](https://developers.facebook.com/docs/marketing-api/flight-ads/catalog#flight-feed).

* * *

### Destinos

-   `name`
    
-   `description`
    
-   `url`
    
-   `price`
    
-   `neighborhood`
    
-   `longitude`
    
-   `latitude`
    
-   `image[0].url`, `image[0].tag[0]`
    
-   `custom_label_[0-4]`
    
-   `custom_number_[0-4]`
    
-   `internal_label`
    
-   `applink.ios_url`, `applink.ios_app_store_id`, `applink.ios_app_name`, `applink.android_url`, `applink.android_package`, `applink.android_app_name`, `applink.windows_phone_url`, `applink.windows_phone_app_id`, `applink.windows_phone_app_name`, `applink.ipad_url`, `applink.ipad_app_store_id`, `applink.ipad_app_name`
    

Para localizar campos de applink, você deve fornecer todos eles. Saiba mais sobre [deep links de produtos](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links).

Para referência, veja a [lista principal de campos para destinos](https://developers.facebook.com/docs/marketing-api/destination-ads/catalog#destination-feed).

* * *

### Classificados de imóveis

-   `name`
    
-   `description`
    
-   `price`
    
-   `url`
    
-   `image[0].url`, `image[0].tag[0]`
    

Para referência, veja a [lista principal de campos para classificados de imóveis](/docs/marketing-api/reference/product-catalog/home_listings/#Creating).

* * *

### Veículos

-   `title`
    
-   `description`
    
-   `price`
    
-   `sale_price`
    
-   `url`
    
-   `image[0].url`, `image[0].tag[0]`
    

Para referência, veja a [lista principal de campos para veículos](https://developers.facebook.com/docs/marketing-api/dynamic-ads-auto/auto-catalog#vehicle).

[](#)

## Tags do OpenGraph

Cada campo tem um máximo de 500 caracteres.

Nome

Descrição

`og:title`

**Obrigatório.**

Título do item. É compatível com catálogos baseados em pixel.

`og:description`

**Obrigatório.**

Descrição do item. É compatível com catálogos baseados em pixel.

`og:url`

**Obrigatório.**

URL completo para a página do produto. É compatível com catálogos baseados em pixel.

`og:image`

**Obrigatório para o link principal. Opcional para links de imagens adicionais**.

Link para a imagem usada na página do produto. O link da imagem principal é obrigatório. Incluir links de imagens adicionais é opcional. É compatível com catálogos baseados em pixel.

`og:locale`

**Obrigatório para [catálogos em vários idiomas](https://developers.facebook.com/docs/marketing-api/catalog/guides/localized-catalog)**.

Especifica a versão do site do produto. Por exemplo, `en_GB` para o site do Reino Unido. É compatível com catálogos baseados em pixel.

`og:price:amount`

**Obrigatório.**

Preço atual do item. Para o separador, use "." em vez de "," para indicar um ponto decimal. Não inclua símbolos, como "$", no preço. É compatível com catálogos baseados em pixel.

Exemplo: `1500.00`

`og:price:currency`

**Obrigatório.**

Moeda para o preço no formato ISO. É compatível com catálogos baseados em pixel.

Exemplo: `USD`

`product:brand`

**Obrigatório.**

Nome da marca do item. É compatível com catálogos baseados em pixel.

`product:availability`

**Obrigatório.**

Disponibilidade atual do item: `in stock`, `out of stock`, `available for order`, `discontinued`. É compatível com catálogos baseados em pixel.

`product:catalog_id`

**Opcional.**

Identificação única do catálogo para o item. Pode ser a variante de um produto. Isso serve para fazer o mapeamento até `retailer_id` depois da importação do produto. O campo `id` precisa corresponder à identificação do conteúdo para seu pixel. É compatível com catálogos baseados em pixel.

`product:category`

**Opcional.**

Limite máximo de caracteres: 250. É compatível com catálogos baseados em pixel.

**Em anúncios de catálogo Advantage+**, representa valores predefinidos (ID da categoria ou string) da [taxonomia de produtos do Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT3hSw_w7hJz4eZtOuMj93SI1DlYyqrjrGF0_Ru1xr5GBJ_h9_e2GvQ5rZdZG9f_qakL1hAdjBeRqlx4f3mLT4K0A9EQZ_fEMUgljhonQlG3aexYHl9rMP3srEUvjJCGsqDTUYtutIGPvX3MLpysCwSbYwU9MzbSxNYAgLsZkug).

**No comércio**, representa a categoria do seu produto de acordo com a [taxonomia de produtos do Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT3taBtYtJAfABg1K_HpE5iJkA024B8icbLE5dxWljwK0efF8YEQSiaLbf1Aias2tYG-K-KSCK5BchF6y5aPy5CN0hzGvFUFPpiPg5B2s2oD29wFgB99H4YLZ4370XZyYn6B8NjvApuq0EJIcP9UbbJZTsu21suS5oyvp7s_GuI). Saiba mais sobre as [categorias de produtos](https://developers.internmc.facebook.com/docs/marketing-api/catalog/guides/product-categories) para comércio.

Saiba mais sobre [Como adicionar uma categoria de produto do Google ou do Facebook para itens do catálogo](https://www.facebook.com/business/help/526764014610932?id=725943027795860).

`product:condition`

**Obrigatório.**

Condição atual do item: `new`, `refurbished`, `used`. É compatível com catálogos baseados em pixel.

`product:custom_label_[0-4]`

**Opcional.**

Limite máximo de caracteres: 100.

Informações adicionais do item a serem incluídas. É compatível com catálogos baseados em pixel.

`product:gender`

**Opcional.**

Determina o gênero para referência de tamanho: `Female`, `Male`, `Unisex`. É compatível com catálogos baseados em pixel.

`product:item_group_id`

**Opcional.**

**Para anúncios de catálogo Advantage+**: itens que são variantes de um produto. Forneça o mesmo item\_group\_id para todos os itens que sejam variantes. Por exemplo, uma camisa polo vermelha é uma variante da camisa polo. O Facebook mapeia isso para retailer\_product\_group\_id assim que recebemos seu feed. Com os anúncios de catálogo Advantage+, o Facebook escolhe apenas um item do grupo com base no sinal que recebemos do pixel ou do evento do app.

Para comércio: forneça o mesmo product\_group\_id para todos os itens que são variantes. Por exemplo, camisa polo vermelha é uma variante da camisa polo. O Facebook mapeia isso para retailer\_product\_group\_id assim que recebemos seu feed. Saiba mais sobre as variantes de produtos. É compatível com catálogos baseados em pixel.

Exemplo: `FB1234_shirts`

`product:gtin`

**Opcional.**

Número global de item comercial (GTIN, pelas iniciais em inglês) do produto. Exclua traços e espaços. Envie apenas GTINs válidos conforme definido pelo guia de validação correspondente. Os valores compatíveis são `UPC` (América do Norte, 12 dígitos), `EAN` (Europa, 13 dígitos), `JAN` (Japão, 8 ou 13 dígitos), `ISBN` (livros, 13 dígitos). É compatível com catálogos baseados em pixel.

Exemplo: `4011200296908`

`product:isbn`

**Opcional.**

Padrão internacional de numeração de livros (ISBN, pelas iniciais em inglês). Os ISBNs são formados por 13 dígitos. É compatível com catálogos baseados em pixel.

`product:mfr_part_no`

**Opcional.**

Número único da peça do fabricante para o item. Para comércio, o inventário de ofertas diárias também deverá incluir a marca se `mpn` for fornecido. Aceita catálogos baseados em pixel.

Exemplo: `100020003`

`material`

**Opcional.**

Material do qual o item é feito. Valores compatíveis: `cotton`, `denim`, `leather`. É compatível com catálogos baseados em pixel.

Exemplo: `cotton`

`product:locale`

**Obrigatório para [catálogos em vários idiomas](https://developers.facebook.com/docs/marketing-api/catalog/guides/localized-catalog)**.

Especifica a versão do site do produto. Por exemplo, `en_GB` para o site do Reino Unido. É compatível com catálogos baseados em pixel.

`product:price:amount`

**Obrigatório.**

Preço atual do item. Para o separador, use "." em vez de "," para indicar um ponto decimal. Não inclua símbolos, como "$", no preço. É compatível com catálogos baseados em pixel.

Exemplo: `1500.00`

`product:price:currency`

**Obrigatório.**

Moeda para o preço no formato ISO. É compatível com catálogos baseados em pixel.

Exemplo: `USD`

`product:retailer_item_id`

**Obrigatório.**

Identificação do varejista para o item. É compatível com catálogos baseados em pixel.

`product:sale_price:amount`

**Opcional.**

Preço com desconto se o artigo estiver em promoção. Use ". " como o decimal para o preço promocional. O preço promocional será obrigatório caso você queira usar uma sobreposição para preços com desconto. É compatível com catálogos baseados em pixel.

  

**Observação**: em geral, para catálogos baseados em pixel, recomendamos capturar as alterações no preço usando a tag principal og:price:amount. Se você usar a tag de preço promocional, inclua também `product:sale_price_dates:start` e `product:sale_price_dates:end` para indicar o início e o término da promoção. Caso não haja data de término, o preço promocional poderá aparecer por tempo indefinido.

  

Exemplo: `9.99`

`product:sale_price:currency`

**Opcional.**

Moeda do preço com desconto, se o item estiver em oferta, no formato do [código de moeda ISO de 3 dígitos](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT3UrGg8e_TIxHnXqYVzgeT_8AXtd7oGJw89WQQ2WkQ-PfvRWwMypPNyIPxLIpBa0jfLi4Hb6bmocMJ96TxFe_eMJr9zAb85dCHRo0i7Yxf-7-63chda5Uh8bE09bEByDHv6CUXgsKI06CcFUcHLJuKWRKg18tlu0x4WZc-PNoCAaFwK5sGf_JMM). É compatível com catálogos baseados em pixel.

Exemplo: `USD`

`product:sale_price_dates:start`

**Opcional.**

Data e hora de início da promoção no seu fuso horário, escrito como `YYYY-MM-DDT0:00-23:59/YYYY-MM-DDT0:00-23:59`, separado por uma barra. Escreva as datas de início e término como `YYYY-MM-DD`. Escreva a hora em um formato de 24 horas (0h00 a 23h59). Adicione um "T" após cada data. Depois, inclua a hora, em que a hora de término representa o fuso horário. No exemplo, `03:00` indica o fuso horário. É compatível com catálogos baseados em pixel.

Exemplo: `2017-11-01T12:00-03:00/2017-12-01T00:00-03:00`

`product:sale_price_dates:end`

**Opcional.**

Data e hora de término da promoção no seu fuso horário, escrito como `YYYY-MM-DDT0:00-23:59/YYYY-MM-DDT0:00-23:59`, separado por uma barra. Escreva as datas de início e término como `YYYY-MM-DD`. Escreva a hora em um formato de 24 horas (0h00 a 23h59). Adicione um "T" após cada data. Depois, inclua a hora, em que a hora de término representa o fuso horário. No exemplo, `03:00` indica o fuso horário. É compatível com catálogos baseados em pixel.

Exemplo: `2017-11-01T12:00-03:00/2017-12-01T00:00-03:00`

[](#)

## Schema.org: tags obrigatórias

Cada campo tem um máximo de 500 caracteres.

Nome

Descrição

`name`

Título do item.

`brand`

Marca do item.

`description`

Descrição do item.

`productID`

Identificação do varejista para o item.

`url`

URL completo para a página do produto.

`image`

Link para a imagem usada na página do produto.

`price`

Preço atual do item. Não inclua símbolos, como "$", no preço. Inclua esta entrada em "ofertas". Formate o preço como um número seguido pelo código de moeda ISO de 3 dígitos [(padrão ISO 4217)](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT28wI-cd96K7ZL-tqvZbeaytwv31550eDi4sUt848GK21gZyQHveVNKJ98RD5lWt9QR-LpXCzqrnL1Ur_6ktqRAggBm1btCPZC6ZBUBHZVZERlBQ6rwZ3Rssq0NC1MasTccmstzsR2IWgEq2jajojbL9GKMOoE9Cixv2Dbpvgo), com um espaço entre o custo e a moeda. Use um ponto final (".") como o ponto decimal.

Recomendamos que você inclua apenas uma (1) moeda no seu catálogo para que os clientes não vejam moedas diferentes para produtos nos seus anúncios ou canais de comércio. Para adicionar informações de produtos e preços que serão exibidos em outros países ou idiomas, [carregue um feed de país ou de idioma no seu catálogo](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).

`priceCurrency`

Moeda do preço, no formato ISO (por exemplo, `USD`). Inclua esta entrada em "ofertas". Para o separador, use "." em vez de "," para indicar um ponto decimal. Não inclua símbolos, como "$", no preço. Exemplo: 1500.00.

`availability`

Disponibilidade atual do item: `in stock`, `out of stock`, `available for order`, `discontinued`. Inclua esta entrada em "ofertas".

`condition`

Condição atual do item: `new`, `refurbished` ou `used`. Inclua esta entrada em "ofertas".

[](#)

## JSON-LD para Schema.org: tags obrigatórias

Cada campo tem um máximo de 500 caracteres.

### Extraído de [schema.org/Product](https://l.facebook.com/l.php?u=https%3A%2F%2Fschema.org%2FProduct&h=AT3ZPXeBDFtk7d4ytGqKIdgYPtRnxWMi72W6VBZgwiU7oLeEy4MC3H6u0bd0NzPd0mgyVEWDY3yHhns28mazkKIxg6z_2vDGM_AEIAp_QVNBh1eBlqVmWLEoACNrxMDrA_JGSEG4EqiGKLsxqfMSVKUGNNQbIKxN6D46FKNBEa4LgZsrXqDFJP7u)

Nome

Descrição

`name`

Título do item.

`brand`

Marca do item.

`description`

Descrição do item.

`productID`

Identificação do varejista para o item.

`url`

URL completo para a página do produto.

`offers`

Matriz de objetos do tipo `schema.org/Offer`.

`image`

Link para a imagem usada na página do produto.

### Extraído de [schema.org/Offer](https://l.facebook.com/l.php?u=https%3A%2F%2Fschema.org%2FOffer&h=AT2OS7YBFmljkAedJflvAF1wy2A9Qk0qMf5NKMJDfN_E8bNtK4Yte7KDM2pkCvz-gwEaBJ4Zinud0I0bS4MxTyGH5ASJuqM5fOIFusUQaxZ4Q_eLl5meU2VbZEj3n6Cwag0GgcXTX2jnEM-MFRC21l2lASUSKO9A60Qeh8S3aUg) (como parte de ofertas de produto)

Nome

Descrição

`price`

Preço atual do item. Não inclua símbolos, como "$", no preço. Inclua esta entrada em "ofertas".

`priceCurrency`

Moeda do preço, no formato ISO (por exemplo, `USD`). Inclua esta entrada em "ofertas".

`availability`

Disponibilidade atual do item: `in stock`, `out of stock`, `available for order`, `discontinued`. Inclua esta entrada em "ofertas".

`condition`

Condição atual do item: `new`, `refurbished` ou `used`. Inclua esta entrada em "ofertas".

[](#)

## Exportação de esquemas JSON

É possível baixar um esquema JSON de todos os campos principais de catálogo e campos de categoria aqui:

-   [Baixar os campos principais](https://facebook.com/cdn/cacheable/products/schema)
    
-   [Baixar os campos principais e de categoria](https://facebook.com/cdn/cacheable/products/schema?subverticals=true)
    

Esse esquema JSON não é um formato de feed carregável. Ele é fornecido como uma referência alternativa para campos de feed, exemplos e tipos de dados além do que já existe na nossa documentação. O esquema destina-se a desenvolvedores que estão procurando alinhar programaticamente a categoria interna e o mapeamento de campo com o esquema de catálogos da Meta. Consulte a formatação de feed em outra parte desta documentação para conferir os feeds carregáveis.

Todos os campos sob a chave `common` serão campos principais. Caso contrário, o nome da categoria será a chave principal. O formato de cada campo segue este exemplo:

```
"item_group_id": {
          "description": "Use this field to create variants of the same item. Enter the same group ID for all variants within a group. Learn more about variants: https:\/\/www.facebook.com\/business\/help\/2256580051262113 Character limit: 100.",
          "example": "K456653443",
          "type": "String",
          "required": false,
          "recommended": false
      },
```

Note que apenas campos específicos de categoria terão um valor `"recommended": true` (já que todos são opcionais), a fim de indicar melhor a prioridade.

[](#)

## Saiba mais

### Central de Ajuda de Anúncios

-   [Como criar um feed de dados para seu catálogo usando um modelo](https://www.facebook.com/business/help/1898524300466211)
    
-   [Métodos para adicionar itens ao catálogo](https://www.facebook.com/business/help/384041892421495)
    
-   [Como carregar itens para um catálogo com um feed de dados no Gerenciador de Comércio](https://www.facebook.com/business/help/125074381480892)
    
-   [Campos e especificações do feed de dados para catálogos no Gerenciador de Comércio](https://www.facebook.com/business/help/120325381656392)
    
-   [Como criar um feed de dados para seu catálogo usando um modelo](https://www.facebook.com/business/help/142570377032516)
    
-   [Campos e especificações do feed de dados para catálogos no Gerenciador de Comércio](https://www.facebook.com/business/help/120325381656392?id=725943027795860)
    
-   [Criar um feed de país ou idioma para localizar o seu catálogo](https://www.facebook.com/business/help/2144286692311411?id=725943027795860)
    

## Referência da API

-   [Feed de dados](https://developers.facebook.com/docs/marketing-api/reference/product-feed)
    
-   [Feeds de dados no catálogo](https://developers.facebook.com/docs/marketing-api/reference/product-feed)
    
-   [API de Feed](/docs/marketing-api/reference/product-feed)
    
-   [Item](https://developers.facebook.com/docs/marketing-api/reference/product-item)
    
-   [Pesquisa de itens no catálogo](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/products)
    
-   [Conjuntos de produtos](https://developers.facebook.com/docs/marketing-api/reference/product-set/)
    

### API de Marketing

-   [Anúncios de hotel – Catálogos e feed](https://developers.facebook.com/docs/marketing-api/hotel-ads/catalog#feed-fields)
    
-   [Anúncios de voo – Catálogo e feed](https://developers.facebook.com/docs/marketing-api/flight-ads/catalog#flight-feed)
    
-   [Anúncios de destino – Catálogo e feed](https://developers.facebook.com/docs/marketing-api/destination-ads/catalog#destination-feed)
    
-   Anúncios de inventário de automóveis: [veículo](https://developers.facebook.com/docs/marketing-api/dynamic-ads-auto/auto-catalog#vehicle) e [concessionária](https://developers.facebook.com/docs/marketing-api/dynamic-ads-auto/auto-catalog#dealership)
    
-   [Anúncios de imóveis](https://developers.facebook.com/docs/marketing-api/dynamic-ads-for-real-estate#home-listing-fields)
    
-   [Deep links de produtos](https://developers.facebook.com/docs/marketing-api/catalog/guides/product-deep-links)
    

[](#)