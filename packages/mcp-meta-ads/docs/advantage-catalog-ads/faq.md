---
title: "Perguntas frequentes - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/faq"
scraped_at: "2026-02-01T14:17:47.260Z"
---

# Perguntas frequentes sobre Anúncios de Catálogo Advantage+

A solução [Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/) permite que você promova automaticamente produtos relevantes de um catálogo inteiro em todos os dispositivos usando eventos de app e de pixel para criar públicos de pessoas a serem alcançados. Este documento apresenta as perguntas frequentes sobre Anúncios de Catálogo Advantage+.

## Catálogo de produtos e feed de produtos

#### Q: What are the current product limits on catalog size?

**A:** We recommend breaking larger feeds into smaller ones for faster, parallel upload:

-   We currently recommend under 5 million products per feed through the file upload method.
-   Limit of 100 MB per feed file via Business Manager.

#### Q: What file formats do you accept?

-   File formats accepted are XML and tab delimited CSV, TXT or TSV. [Learn more](https://developers.facebook.com/docs/marketing-api/catalog-setup/catalog-feed-setup#feed-format)
-   We also accept files that are compressed: zip, gzip and bz2.

#### Q: My feed is taking too long to upload

-   Ensure that there are no network connectivity issues.
-   Ensure that your product feed follows the restrictions specified above. [Learn more](https://developers.facebook.com/docs/marketing-api/catalog-setup/catalog-feed-setup#da-commerce)
-   To speed up feed upload process, use a compressed feed file. We support zip, gzip and bz2 compression formats.

#### Q: How do I get Google Merchant Center feed to dynamic ads?

-   Google Merchant Center feeds can be uploaded directly for dynamic ads.
-   Go to the "link" column to make sure it doesn't have Google tracking parameters on it. The parameters may look like this: `URL?utm_campaign=GoogleDynRMKT&utm_medium=display`.

**Note**: To reuse a data feed file from another inventory platform, such as Google or Amazon, Facebook's requirements may be different. Check that your data feed is a CSV, TSV, or XML (RSS/ATOM) file, and has the required columns in our specifications. [Learn more](https://developers.facebook.com/docs/marketing-api/catalog-setup/catalog-feed-setup)

#### Q: How do I troubleshoot my feed upload errors?

-   Verify the [upload errors](/docs/marketing-api/reference/product-feed-upload/errors/). Products with fatal errors are not uploaded; the rest are uploaded.
-   Verify the `product_count` in the product catalog after the feed upload has finished. Instructions [here](/docs/marketing-api/reference/product-catalog#Reading)
-   The first line in the field is expected to contain the name of the fields.
-   Use the correct delimiter in your feed file. Supported delimiters are TAB (default), PIPE, or TILDE. Ensure the delimiter you use during the upload is the same delimiter as in the feed file.
-   Check the **Use quoted fields** option if your feed contains quoted fields.

#### Q: How do I stop a product from running when it is out of stock?

**A:** When products go out of stock, you need to mark it as "out of stock" in your product catalog. Products marked "out of stock" automatically stop serving. Scheduling and fetching the product catalog frequently helps you maintain your stock information easily. See the `availability` field in [Supported Fields](https://developers.facebook.com/docs/marketing-api/catalog-setup/catalog-feed-setup#da-commerce).

#### Q: I'm unable to choose or see a product catalog that my team uploaded.

**A:** Go to **Business Manager** and make sure the user/account has **Product Catalog Admin** permissions.

[](#)

[](#)

## Conjunto de produtos e grupo de produtos

#### Q: What's the difference between _product set_ and _product group_?

**A:** A _product set_ is a collection of product items and product groups within a product catalog defined by a name and a filter or rule that's evaluated dynamically. For example, someone can create a product set with "all things where the brand is Nike and the price is greater than USD 50".

A _product group_ describes a collection of variants of a product item. For example, a black iPhone 6 16 GB has the same product group as a white iPhone 6 16 GB, but they have different product items. A product item can have zero (0) or one (1) product group (product groups are optional).

#### Q: Can a product appear in multiple product sets?

**A:** Yes, a product can appear in multiple product sets.

#### Q: Is the exclusion for `Purchase` events done at the product group level or product set level?

**A:** The exclusion for `Purchase` events is done at the product group level if it is available; otherwise, at the product level.

[](#)

[](#)

## Configuração e públicos do Pixel da Meta

#### P: Meu pixel não está configurado corretamente.

**R:** Para usar o Pixel da Meta para rastrear eventos externos nas suas páginas de produto e criar um [público para o produto](/docs/marketing-api/dynamic-product-ads/product-audiences/):

-   Coloque um dos [eventos padrão](/docs/marketing-api/facebook-pixel#standardevents) em páginas selecionadas do seu site com parâmetros padrão.
    
-   Verifique se o pixel está associado corretamente ao seu catálogo de produtos. Veja mais informações [aqui](/docs/marketing-api/dynamic-product-ads/product-audiences/v2.5#associate).
    

#### P: Como posso associar o Pixel da Meta ao meu catálogo de produtos?

**R:** Os Anúncios de Catálogo Advantage+ exigem que o Pixel da Meta ou os Eventos do App informem quais produtos estão sendo visualizados, adicionados ao carrinho e comprados no seu site ou app. O ID do produto informado pelo Pixel da Meta (ou pelos eventos do app) deve coincidir EXATAMENTE com a coluna de ID correspondente no seu feed de produtos.

#### P: Quais são os valores permitidos para `content_type` ao configurar o pixel?

**R:** Os valores válidos para `content_type` são `product` ou `product_group`. É importante que o `content_type` corresponda ao tipo de ID incluído no parâmetro `content_ids`. Por exemplo, se `content_type` for `product_group`, os IDs de grupo de produtos devem ser fornecidos em `content_ids`.

#### P: Por que o tamanho do meu público é zero?

**R:** Pode haver alguns motivos pelos quais o tamanho do seu público é zero (0). Para garantir que o público esteja configurado corretamente, siga [estas instruções](/docs/marketing-api/dynamic-product-ads/product-audiences/) e estas diretrizes:

-   Certifique-se de que as regras de inclusão e exclusão não entrem em conflito.
    
-   Certifique-se de que o ID do conjunto de produtos pertença ao catálogo de produtos para o qual o Pixel da Meta foi criado.
    
-   Sites com pouco tráfego devem tentar manter a retenção alta para captar público. Os anúncios não serão exibidos se o tamanho do público for inferior a 20.
    

[](#)

## Gerenciamento de anúncios

#### P: Qual objetivo preciso configurar para campanhas de Anúncios de Catálogo Advantage+?

**R:** Recomendamos usar o objetivo `PRODUCT_CATALOG_SALES` para campanhas de Anúncios de Catálogo Advantage+.

#### P: Como faço para promover produtos em um determinado conjunto de anúncios?

**R:** Ao criar um conjunto de anúncios, use o campo `promoted_object` para adicionar um ID de conjunto de produtos, que indica que todos os anúncios no conjunto de anúncios promoverão produtos no conjunto de produtos especificado.

#### P: Existe alguma ferramenta que possa ajudar na depuração?

-   Instale a [Ferramenta para Pixel da Meta](/docs/facebook-pixel/pixel-helper). Essa ferramenta pode ajudar você a identificar rapidamente problemas com um pixel que não funciona.
    
-   [Ferramentas de depuração dos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/debugging-tools/) descreve as ferramentas para depurar problemas com Anúncios de Catálogo Advantage+.
    

[](#)

## Saiba mais

-   [Sobre os catálogos – Central de Ajuda da Meta para Empresas](https://www.facebook.com/business/help/890714097648074)
    
-   [Sobre os Anúncios de Catálogo Advantage+ da Meta – Central de Ajuda da Meta para Empresas](https://www.facebook.com/business/help/397103717129942)
    
-   [Criar um anúncio de catálogo Advantage+ – Central de Ajuda da Meta para Empresas](https://www.facebook.com/business/help/1132465490107046)
    
-   [Catálogo – Marketing API](https://developers.facebook.com/docs/marketing-api/catalog-setup)
    

[](#)