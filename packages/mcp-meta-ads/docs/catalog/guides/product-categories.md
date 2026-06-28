---
title: "Categorias de produto - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/product-categories"
scraped_at: "2026-02-01T15:52:09.531Z"
---

# Categorias de produto

Fornecer informações de alta qualidade sobre seus produtos ajuda os clientes a descobri-los e a tomar decisões de compra conscientes.

## Quando usar as categorias de produto

Uma categoria de produto é uma taxonomia que descreve o tipo específico de itens que você vende. Por exemplo, **Vestuário e acessórios > Roupas > Blusas e camisetas**. Há dois tipos de categorias opcionais que você pode adicionar a itens do catálogo: do Google (GPC) ou do Facebook (FPC).

Recomendamos adicionar uma GPC a cada produto. Ela pode melhorar o desempenho do seu anúncio, além de ser usada para:

-   criar conjuntos de produtos por filtros de categoria;
    
-   determinar se os itens precisam de tamanho (apenas nos EUA);
    
-   personalizar a janela de devolução por categoria (apenas nos EUA).
    

Como alternativa, a FPC pode ser usada para:

-   determinar se os itens precisam de tamanho (apenas nos EUA);
    
-   substituir a [categoria de imposto](https://www.facebook.com/business/help/1768310879858675) atribuída automaticamente ao item pela Meta (apenas nos EUA).
    

Saiba mais em [Como adicionar uma categoria de produto do Google ou do Facebook para itens do catálogo](https://www.facebook.com/business/help/526764014610932).

A categoria do produto só é relevante para produtos (comércio eletrônico), não para outros tipos de inventário de catálogo.

[](#)

## Taxonomias da categoria de produtos

Para melhorar o catálogo e ajudar os clientes a descobrir seus itens online, insira uma [categoria Google do produto (GPC, pelas iniciais em inglês)](#google-prod-cat) ou uma [categoria de produto do Facebook (FPC, pelas iniciais em inglês)](#fb-prod-cat) nos itens e adicione mais informações específicas a cada categoria. FPC e GPC são taxonomias que organizam os itens para venda em categorias e subcategorias. É possível usar a FPC, a GPC ou ambas. Forneça a categoria mais específica possível para cada item.

### Categoria de produto do Google

A categoria Google do produto (`google_product_category`) representa o item de acordo com a [taxonomia de produto do Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT0lCoTAD1BOkZmMpyxi6ELXK-MmwQvlGfgeZjrVMWRhx7ToqxF0dvotfb5UGC1KEkcJZVzWlIEAqT0T6WG4mSOWu37BDyLHm-9G_GK_Tiy9sJCg_cR5sfpqVZrShwi0ozUKj06FSQ4RtesXVw6ZBqFEFKHrju6jggGZCFf8_sE).

Use o caminho da taxonomia ou o número de identificação da categoria listado [aqui](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt%3Ffbclid%3DIwAR0US1k8zZOLliqA-fOM5pMQn3YcVU8-Vog-GpcYqqCqwMXxyiLt31aUYoo&h=AT2c8aiPUgUx9MCasOT7zh-7e2iX_II_VhtXAhgcfW-VlQWlugIF0B2q3SvP1OhjPDamFeIew7FDkuRbrgjvg0MtNRWIzuAsZ-F5zd3IJg9GMZIG7NofGhcV-bt84luHn1kAG-gAwTCPfQe3P_QbgXEfitTyPW32_plMIiwrBCo).

Exemplo: `Apparel & Accessories > Clothing > Shirts & Tops` ou `212`.

* * *

### Categoria de produto do Facebook

A categoria de produto do Facebook representa o item de acordo com a taxonomia de produto do Facebook. Essa taxonomia organiza os produtos para venda em categorias e subcategorias. Por exemplo, **Saúde e beleza** > **Beleza** > **Maquiagem** > **Maquiagem para os olhos** > **Delineadores**.

Para inserir uma categoria de produto do Facebook nos itens faça o seguinte:

1.  Adicione o campo `fb_product_category` ao seu arquivo de feed de dados.
2.  Nesse campo, selecione uma categoria compatível na lista abaixo. As categorias de produto do Facebook estão disponíveis em [diversos idiomas](https://www.facebook.com/business/help/526764014610932).
3.  Baixe a lista de categorias no seu idioma, por exemplo, **inglês dos Estados Unidos ([Texto (.txt)](https://www.facebook.com/products/categories/en_US.txt) | [Planilha (.csv)](https://facebook.com/products/categories/en_US.csv))**.

É possível fornecer o caminho da taxonomia (por exemplo **Saúde e Beleza** > **Beleza** > **Maquiagem** > **Maquiagem para os olhos****Delineadores**) ou o número de identificação da categoria (por exemplo, **281**). Os nomes das categorias não diferenciam maiúsculas de minúsculas.

Quando você fornecer uma categoria de produto do Facebook, também será possível usar [campos adicionais](#additional-attributes) específicos da categoria para inserir informações mais detalhadas sobre os itens.

[](#)

## Cálculos de impostos

Atribuímos automaticamente uma categoria a cada item do catálogo com base no título, na descrição e em outras informações. Se preferir, você pode especificar uma categoria de produto do Facebook para cada item, substituindo a atribuição automática. As alíquotas e a tributação de categorias específicas de produtos variam de acordo com as leis estaduais.

Saiba mais em [Sobre o imposto sobre vendas no Gerenciador de Comércio](https://www.facebook.com/business/help/1768310879858675).

[](#)

## Campos específicos da categoria

Recomendamos que você inclua informações mais detalhadas sobre os produtos para ajudar os clientes a encontrar seus itens e tomar decisões de compra.

Ao usar os campos específicos da categoria, os vendedores precisam fornecer um identificador: uma categoria Google do produto ou uma categoria de produto do Facebook.

Todos os campos de categoria recomendados são opcionais. Também é possível usar [atributos adicionais](#additional-attributes) por categoria.

Recomendado

Adicional

[Roupas e acessórios](https://developers.facebook.com/docs/commerce-platform/catalog/categories/cloth-access#rec-cloth-access)

[Roupas e acessórios](https://developers.facebook.com/docs/commerce-platform/catalog/categories/cloth-access#add-cloth-access)

[Casa](https://developers.facebook.com/docs/commerce-platform/catalog/categories/home#rec-home)

[Casa](https://developers.facebook.com/docs/commerce-platform/catalog/categories/home#add-home)

[Joias e relógios](https://developers.facebook.com/docs/commerce-platform/catalog/categories/jewelry/#rec-jewelry-watches)

[Joias e relógios](https://developers.facebook.com/docs/commerce-platform/catalog/categories/jewelry/#add-jewelry-watches)

[Saúde e beleza](https://developers.facebook.com/docs/commerce-platform/catalog/categories/health-beauty/#rec-health-beauty)

[Saúde e beleza](https://developers.facebook.com/docs/commerce-platform/catalog/categories/health-beauty/#add-health-beauty)

[Eletrônicos](https://developers.facebook.com/docs/commerce-platform/catalog/categories/electronics/#rec-electronics)

[Eletrônicos](https://developers.facebook.com/docs/commerce-platform/catalog/categories/electronics/#add-electronics)

[Produtos para bebês](https://developers.facebook.com/docs/commerce-platform/catalog/categories/baby#rec-baby-products)

[Produtos para bebês](https://developers.facebook.com/docs/commerce-platform/catalog/categories/baby#add-baby-products)

[](#)

## Saiba mais

### Políticas e requisitos

-   [Políticas de Proteção de Compra](https://www.facebook.com/policies/purchase_protection)
    

### Sobre impostos

-   [Cálculos de impostos](#tax-calculations)
    
-   [Sobre o imposto sobre vendas no Gerenciador de Comércio](https://www.facebook.com/business/help/1768310879858675)
    

### Aprimore seu catálogo

-   [Best Practices, Commerce Catalog](https://developers.facebook.com/docs/marketing-api/catalog/best-practices)
    
-   [Como usar os campos de catálogo](https://developers.facebook.com/docs/commerce-platform/catalog/fields#fields)
    
-   [Supported Catalog Fields](https://developers.facebook.com/docs/marketing-api/catalog/reference#supported-fields)
    
-   [Atributos básicos universais](https://developers.facebook.com/docs/commerce-platform/catalog/fields#universal-basic-attributes)
    
-   [Como criar um feed de dados para seu catálogo usando um modelo](https://www.facebook.com/business/help/1898524300466211?id=725943027795860)
    
-   [Campos e especificações do feed de dados para catálogos no Gerenciador de Comércio](https://www.facebook.com/business/help/120325381656392?id=725943027795860)
    
-   [Sobre a finalização da compra no Facebook e no Instagram](https://www.facebook.com/business/help/2509359009104717)
    

### Taxonomias e categorias

-   [Taxonomia de produto do Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fbasepages%2Fproducttype%2Ftaxonomy-with-ids.en-US.txt&h=AT0f-0zarmdD8dg9FWdN1FcFz8CMODKOEcIh1h6tqw5T0Z_qo4aAmxK_YAQU-hIPdRabYoVfpAzVyeq70rpTSerZGXAAWKYxU0-h1aHRf1xu29uy2fne55Uv5XYLWTbIlsv04KShZTTIPdehFrk39IfrR6sKlEz5ngpZtLdbLsU)
    
-   [Como adicionar uma categoria de produto do Google ou do Facebook para itens do catálogo](https://www.facebook.com/business/help/526764014610932)
    
-   [Como fornecer uma categoria de produto do Google ou do Facebook para itens do catálogo](https://www.facebook.com/business/help/526764014610932)
    

### Sobre a finalização da compra

-   [Sobre a finalização da compra no Facebook e no Instagram](https://www.facebook.com/business/help/2509359009104717?id=533228987210412)
    

[](#)