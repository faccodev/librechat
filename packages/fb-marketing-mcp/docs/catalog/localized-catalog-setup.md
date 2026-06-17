---
title: "Configuração de catálogo localizado - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/localized-catalog-setup"
scraped_at: "2026-02-01T15:51:25.395Z"
---

# Configuração de catálogo localizado

Use este guia para configurar seu catálogo para localização. Veja também como [configurar um catálogo para diferentes idiomas e países](https://www.facebook.com/business/help/2144286692311411?id=725943027795860).

## Requisitos

-   Você deve criar um **feed de dados de substituição** para idioma ou país que conterá apenas os campos (com valores) que você quer alterar.
    
-   Inclua um campo `id` no seu _feed de dados de substituição_. O `id` de cada item precisa corresponder a um `id` em um dos feeds de dados do catálogo principal e/ou ao número de identificação do conteúdo do seu pixel.
    
-   Você deve incluir um campo `override`.
    
    -   Para um feed de substituição de país, insira os códigos ISO dos países para os quais você quer fornecer informações localizadas. O valor na coluna "override" deve ser um [código de país ISO compatível](https://www.facebook.com/business/help/2144286692311411). Consulte também [códigos de país ISO padrão](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%23search&h=AT0jyWy6YMAgtcoUyIWT5IqHdoXQj_kLvx48H9PYylxWEjc-up3ev0jminapPRFL0qq0nKKVLzF4z_zrocn9E7YbifaQbl7oMfSj2-dMeDAJQGwaxJzDfyF9fwyqiEPLf17GHaVOXlcJjmvhmZZRYBabRv-pQ33A7RNRytjWQAvM6kCO6SKHWArF).
        
    -   Para um feed de substituição de idioma, insira os códigos ISO dos idiomas para os quais você quer fornecer informações localizadas. O valor na coluna `override` deve ser um [código de idioma ISO compatível](https://www.facebook.com/business/help/2144286692311411). Consulte também [códigos de idioma ISO padrão](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fiso-639-language-codes.html&h=AT0oQ8Ppm7-Q4Xoxf-FTG-dH4sRnMvZCSErAv7TIKnTSX51MkQPqKQWYfsqiIMLrwd5B7QQvLgGrK2eMdXCJhmbPJFx70PnWu49aIvHOt_JBGz7vGPWDMRqxpIqzwU-exaGg1WygiF0Cofdj7I5sLODQxI8J5ckO7mZkTrd2koySd2I14zdLNiSA).
        
    
-   Você só pode localizar (substituir) campos específicos, não todos. Consulte [Campos compatíveis: Catálogos localizados](https://developers.facebook.com/docs/marketing-api/catalog/reference#loc-cat-fields) para obter uma lista dos campos de catálogo aceitos.
    
-   As imagens de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/686259348512056) para catálogos.
    
-   Os títulos de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/2104231189874655?id=663946777378466) para catálogos.
    
-   As descrições de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/2302017289821154?id=663946777378466) para catálogos.
    

[](#)

## Recomendações

Ao planejar a configuração do seu catálogo, siga estas recomendações:

-   Embora seja possível incluir vários idiomas e países em cada feed, recomendamos criar seus feeds de país e idioma separadamente.
    
-   Se você tiver um catálogo grande (mais de 100 mil itens), crie um feed de dados por idioma ou país.
    
-   Caso você esteja criando um feed de idioma e outro de país, recomendamos que os campos incluídos em cada um deles sejam exclusivos para o tipo de feed especificado. Por exemplo, não inclua o nome do produto no feed de idioma e no de país.
    
-   Para produtos (comércio eletrônico), recomendamos que você inclua `title` e `description` no **feed de idioma** e `price`, `sale_price`, `sale_price_effective_date`, `availability` e `link` no **feed de país**.
    
-   Como exemplo, fornecemos um [modelo de substituição para idioma](https://lookaside.facebook.com/developers/resources/?id=catalog_language_feed_template.csv) e um [modelo de substituição para país](https://lookaside.facebook.com/developers/resources/?id=catalog_country_feed_template.csv).
    

### Veja também

-   [Campos compatíveis – Catálogos localizados](https://developers.facebook.com/docs/marketing-api/catalog/reference#loc-cat-fields)
    
-   [Formatos de feed – País e idioma](#feed-formats)
    
-   [Formatos de feed compatíveis](https://developers.facebook.com/docs/marketing-api/catalog/reference#feed-format)
    

[](#)

## Etapa 1: criar feeds de idioma e país

### Tipos de feed

Você pode fornecer propriedades localizadas para os itens do seu catálogo, usando tipos adicionais de feeds.

Tipo de feed

Descrição

Exemplo

Feed de país

Contém substituições para países específicos. Você pode criar e carregar feeds de país usando o Gerenciador de Comércio ou [via API](#upload-via-api). Consulte o [formato de feed compatível](#feed-format-country).

Um item pode ter preços diferentes para cada país.

Feed de idioma

Contém traduções para campos específicos. Você pode criar e carregar feeds de idioma usando o Gerenciador de Comércio ou [via API](#upload-via-api). Consulte o [formato de feed compatível](#feed-format-lang).

Um item pode ter descrições diferentes dependendo do idioma.

Feed de idioma e país

Criado para casos de uso avançados em que um feed de país ou um feed de idioma não é suficiente para descrever a localização dos seus itens. Um feed de idioma e país só deve ser usado para campos realmente necessários.

  

Só é possível criar um feed de idioma e país por meio da API. No entanto, você pode modificar e carregar o feed usando o Gerenciador de Comércio ou [via API](#upload-via-api). O Gerenciador de Comércio fornece detalhes sobre cada configuração de país e idioma.

  

**Observação**: ao localizar um campo para idioma e país, o valor na coluna `override` deve ser um [código de idioma](https://www.facebook.com/business/help/2144286692311411) e um [código de país](https://www.facebook.com/business/help/2144286692311411) da norma ISO compatíveis, separados por um caractere "|". Por exemplo, `en_XX|US`.

Os URLs dos seus produtos podem depender do idioma e do país da pessoa que visualiza o conteúdo.

Por exemplo: http://www.mysite.com/ca/item12345?lang=fr  
_Ou_  
http://www.mysite.com/ca/fr/item12345

É possível definir campos localizados para até 350 pares de idiomas e países, por item do catálogo.

### Formatos de feed

#### Feed de país

**Exemplo de CSV**: este feed contém localizações de país para o Reino Unido (`GB`) e a Itália (`IT`).

```
id; override; price; link; delete
FB_product_1234; GB; 9.00 GBP; http://www.example.com/en_GB/FB_product_1234; false
FB_product_1234; IT; 10.49 EUR; http://www.example.com/it_IT/FB_product_1234; false
```

`price`, `sale_price`, `unit_price`, `base_price`, `status` (visibilidade) e `availability` só devem ser fornecidos em um feed de país. Esses campos não podem ser fornecidos em um feed de idiomas. Isso ajuda a garantir que os clientes vejam os dados corretos do produto localizado.

  

#### Feed de idioma

**Exemplo de CSV**: este feed contém localizações de idioma para o francês (`fr_XX`) e o inglês (`en_XX`).

```
id; override; description; title; delete
FB_product_1234; fr_XX; Le t-shirt American Apparel préféré de tous. Le t-shirt comporte une encolure ajustée de 3/4 pouce au cou, une bande épaule à épaule et un ourlet de 1 pouce sur les manches.; T-shirt Unisexe d'American Apparel; false
FB_product_1234; en_XX ; Everyone's favorite American Apparel T-shirt. The t-shirt features 3/4 inches set-in neck, shoulder to shoulder tape and 1 inch hem on sleeves.; American Apparel Unisex T-Shirt; false
```

#### Feed de idioma e país

**Exemplo**: este feed contém localizações de idioma e país para falantes de francês nos EUA (`fr_XX|US`) e falantes de francês no Canadá (`fr_XX|CA`).

```
id; override; url; delete
FB_product_1234; fr_XX|US; http://us.example.com/fr/product_1234; false
FB_product_1234; fr_XX|CA; http://ca.example.com/fr/product_1234; false
```

[](#)

## Etapa 2: verificar seu feed (ordem de precedência)

Ao selecionar quais informações localizadas serão mostradas a um usuário, verificamos o conteúdo do feed nesta ordem:

1.  Valores de feed de idioma e país para os idiomas falados e o país de origem do usuário
2.  Valores de feed de idioma para os idiomas falados pelo usuário
3.  Valores de feed de país para o país de origem do usuário

[](#)

## Etapa 3: carregar os feeds de idioma e país

Depois de criar seus feeds, você poderá carregá-los manualmente por meio do Gerenciador de Comércio ou via API, conforme mostrado abaixo.

### Carregar os feeds via API

1.  Disponibilize os feeds no seu servidor.
2.  Vincule os feeds ao seu catálogo usando um parâmetro `override_type` adicional.

#### Feed de idioma

**Exemplo**: carregue um feed de idioma.

```
curl \
  -F 'name=Language feed' \
  -F 'schedule={
    "interval": "DAILY",
    "url": "http:\/\/www.example.com\/sample_language_feed.tsv",
    "hour": 22
  }' \
	-F 'override_type=language'
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/product_feeds
```

#### Feed de país

**Exemplo**: carregue um feed de país.

```
curl \
  -F 'name=Country Feed' \
  -F 'schedule={
    "interval": "DAILY",
    "url": "http:\/\/www.example.com\/sample_country_feed.tsv",
    "hour": 22
  }' \
	-F 'override_type=country'
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/product_feeds
```

#### Feed de idioma e país

**Exemplo**: carregue o feed de idioma e país.

```
curl \
  -F 'name=language and country Feed' \
  -F 'schedule={
        "interval": "DAILY",
        "url": "http:\/\/www.example.com\/sample_language_and_country_feed.tsv",
        "hour": 22
      }' \
  -F 'override_type=language_and_country'
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/product_feeds
```

**Parâmetros**

Parâmetro

Valor

`url`

Localização onde podemos recuperar o arquivo do feed.

`interval`

Frequência na qual buscamos o arquivo do feed.

`hour`

Hora do dia (baseado em um relógio de 24 horas) em que fazemos a busca no feed.

[](#)

## Etapa 4: remover informações de país ou idioma de um produto (opcional)

Para remover informações localizadas de um item:

1.  Especifique uma coluna "delete" no seu feed de país ou idioma.
2.  Defina o valor como `true`.

A localização do produto será removida.

**Observação**: também é possível usar `delete` para itens do seu feed de itens principal. Quando você exclui um item principal, **todas** as substituições são removidas.

[](#)

## Etapa 5: verificar sua configuração no Gerenciador de Comércio

O Gerenciador de Comércio fornece detalhes sobre as informações dos campos de país e idioma para cada produto na página **Itens** > **Detalhes**.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/440808994_1474111726819846_6608779003222951579_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=_L6pRH4JxIUQ7kNvwE35FeX&_nc_oc=AdlyRmTKDodn93H61DsmMR690TI26IrIJrD3a2HFHsRSr3QqC35GArp2Q9kgCEC1-eY62rLh-ZYzrLIl0d24MY5j&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=O-y4aaF1zm5Pl5tAiwws0A&oh=00_AfuCk7WFJgiWCXBnQm3jvSdZgusHqYecd9ppFYswSBrsIw&oe=6999C572)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/440808994_1474111726819846_6608779003222951579_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=_L6pRH4JxIUQ7kNvwE35FeX&_nc_oc=AdlyRmTKDodn93H61DsmMR690TI26IrIJrD3a2HFHsRSr3QqC35GArp2Q9kgCEC1-eY62rLh-ZYzrLIl0d24MY5j&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=O-y4aaF1zm5Pl5tAiwws0A&oh=00_AfuCk7WFJgiWCXBnQm3jvSdZgusHqYecd9ppFYswSBrsIw&oe=6999C572)

  
  

Você também pode acessar a cobertura internacional de todo seu catálogo na aba **Itens** > **Cobertura internacional**.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/439741134_2105350889836616_2548269118797802083_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=4wPUmT6h5IoQ7kNvwGiczYO&_nc_oc=AdmQoiSCsYL1l_bIsWAQ-E8pLW9ir577p9sTxXGaW1_yTj2xhxiIHBqtP-1uw6QPyjb8i6QAzPAQc_tiiBNlVqLr&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=O-y4aaF1zm5Pl5tAiwws0A&oh=00_AftHrk5WhUAW_HYY0XuEh1s0gq2QRj4umDp80PR1TFQ1Bw&oe=6999AC30)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/439741134_2105350889836616_2548269118797802083_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=4wPUmT6h5IoQ7kNvwGiczYO&_nc_oc=AdmQoiSCsYL1l_bIsWAQ-E8pLW9ir577p9sTxXGaW1_yTj2xhxiIHBqtP-1uw6QPyjb8i6QAzPAQc_tiiBNlVqLr&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=O-y4aaF1zm5Pl5tAiwws0A&oh=00_AftHrk5WhUAW_HYY0XuEh1s0gq2QRj4umDp80PR1TFQ1Bw&oe=6999AC30)

  

[](#)

## Saiba mais

### Central de Ajuda de Anúncios

-   [Set Up a Catalog for Multiple Languages and Countries, Ads Help Center](https://www.facebook.com/business/help/2144286692311411)
    
-   [Create a Advantage+ Catalog Ad for Multiple Languages and Countries, Ads Help Center](https://www.facebook.com/business/help/2144286692311411?locale=en_US)
    
-   Lista de [idiomas e países compatíveis](https://www.facebook.com/business/help/2144286692311411)
    
-   Lista de [campos compatíveis para catálogos localizados](https://developers.facebook.com/docs/marketing-api/catalog/reference#loc-cat-fields)
    

### Instagram

-   [Como adicionar etiquetas de compras às publicações no Instagram](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F2022466637835789&h=AT1BTYdRRR60J0YNZDvYe19-VFIMbjI6InrYWSUXv853KxiBRa4rA82zwVHxnV7iSHhEfuKzYdE0vJBXRGMqxqHx5T6BYlsMmxu8nn16lft5Dds48tukoCKYi-TOZSih9kpK9m5T0f3YEabBjouhmC4x_2MZbUOYm8WqD32WejA)
    
-   [Catálogo traduzido para etiquetagem de produtos no Instagram](/docs/marketing-api/catalog/localized-catalog-ig)
    

### API de Marketing – Catálogo

-   [Set Up a Catalog for Multiple Languages and Countries, Ads Help Center](https://www.facebook.com/business/help/2144286692311411?id=725943027795860)
    
-   [Campos compatíveis – Catálogos localizados](https://developers.facebook.com/docs/marketing-api/catalog/reference#loc-cat-fields)
    
-   [Introdução aos anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management#create-template)
    
-   [Catálogo, API de Marketing](https://developers.facebook.com/docs/marketing-api/catalog)
    
-   [Schedule Data Feed Uploads](https://developers.facebook.com/docs/marketing-api/catalog/guides/scheduled-feeds)
    
-   [Introdução aos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management)
    
-   [Campos de catálogo compatíveis](https://developers.facebook.com/docs/marketing-api/catalog/reference#supported-fields)
    

### Padrões ISO

-   [Códigos de país ISO](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%23search&h=AT2ITdEAMXoqC-q0FMmZq7Pbd3cn2ELk5HK11HlWLXiMbcDKVisyl2AfazPerE2NToI9-4ZCpNeOhJKUdeyY25YuIZLuA8at_2pN5yq6i0RTzxX1iJ8aIghIfGgPYHKiGJZG-AQUoPbRMVB9KQ8hGzOv20RWZVGCEB6bems1B7M)
    
-   [Códigos de idioma ISO](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fiso-639-language-codes.html&h=AT34Ma1Up9gQZjtcS37Cl0Etjcqi7f0bsVv-d3vgtQ0TOhqa8qSf0RkX_QVtsONxfcBCx8XivLk-45XUPIiN6Y03hIEJrMdyr_9FvJAfYQc3Be-CwTvPWXu8OqrdYLCDPNN8HlRLpZewBCgXQxDH6ByRZkAHVhcpwYKwuubqfTk)
    

[](#)