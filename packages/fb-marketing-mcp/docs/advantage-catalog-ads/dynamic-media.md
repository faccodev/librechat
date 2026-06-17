---
title: "Mídia dinâmica - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/dynamic-media"
scraped_at: "2026-02-01T14:17:15.787Z"
---

# Mídia dinâmica

A partir de setembro de 2025, vamos atualizar a mídia dinâmica para que seja ativada por padrão para os anúncios de catálogo Advantage+. Você poderá notar uma exibição mais frequente de vídeos nos anúncios. Para optar pela exibição de vídeos em anúncios, você pode continuar usando o `media_type_automation` e definir como `OPT_OUT` conforme necessário.

Com a mídia dinâmica, os anunciantes podem usar ativos de vídeo do seu catálogo nos anúncios de catálogo Advantage+.

## Antes de começar

Você precisará do seguinte:

-   Um catálogo de produtos com produtos cadastrados
    
-   Um vídeo para cada produto em formato de URL de vídeo disponível para baixar
    

Consulte a [documentação sobre anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads) para saber mais sobre como isso funciona.

[](#)

## Limitações

-   Recomendamos ter pelo menos 20 produtos, mas não há quantidade mínima obrigatória.
    
-   Cada vídeo não pode exceder 200 MB. Não há restrições de tempo.
    
-   [Os vídeos devem estar em um dos seguintes formatos](/docs/commerce-platform/catalog/fields/): `3g2`, `3gp`, `3gpp`, `asf`, `avi`, `dat`, `divx`, `dv`, `f4v`, `flv`, `gif`, `m2ts`, `m4v`, `mkv`, `mod`, `mov`, `mp4`, `mpe`, `mpeg`, `mpeg4`, `mpg`, `mts`, `nsv`, `ogm`, `ogv`, `qt`, `tod`, `ts`, `vob` ou `wmv`.
    
-   O `video_fetch_status` pode aparecer como `NO_STATUS` até que o vídeo seja usado em um anúncio ou em outro evento que exija seu disparo.
    

[](#)

## Adicionar vídeos ao catálogo

Há 3 formas de adicionar vídeos a produtos em um catálogo: arquivo de feed do catálogo, API em lote do catálogo e carregamento manual pelo Gerenciador de Comércio.

### Adicionar vídeos com o arquivo de feed do catálogo

#### Etapa 1. Preparar o arquivo de feed do catálogo

Você pode usar um dos seguintes processos para implementar o arquivo de feed do catálogo.

-   **Processo 1: alterar o feed principal**
    
    -   Adicione uma coluna **video\[0\].url** ao arquivo de feed de catálogo existente, especifique o URL do vídeo somente para os produtos selecionados e deixe as demais linhas de produto vazias.
        
    -   É possível adicionar mais de um vídeo para o mesmo produto com colunas adicionais: **video\[1\].url**, **video\[2\].url**, **video\[3\].url** e assim por diante.
        
    -   As tags podem ser adicionadas aos vídeos em colunas separadas. Por exemplo: **video\[0\].tag\[0\]**, **video\[0\].tag\[1\]**, **video\[1\].tag\[0\]** e assim por diante.
        
    
-   **Processo 2: incluir feed complementar**  
    prepare outro arquivo de feed de catálogo para complementar o feed atualmente carregado. Este feed complementar só pode adicionar ou substituir vídeos a produtos já existentes. Adicione uma coluna **video\[0\].url** e uma coluna de ID para associar o vídeo ao ID do produto.
    

**Opcional:**  
Em vez de usar a coluna **video\[0\].url**, você pode criar uma coluna chamada `video` e adicionar uma tag ao vídeo. A coluna `video` pode incluir diversos URLs de vídeo por produto e várias tags por URL codificadas em formato JSON. Se optar por usar uma coluna de tag para o filtro de produtos, será necessário adicioná-la ao arquivo de feed também.

**Exemplo de formato de coluna de vídeo:**  
`[{"url": "http://www.jaspersmarket-example1.com/video-file.avi", "tag": ["Optional Tag1", "Optional Tag2"]},{"url": "http://www.jaspersmarket-example2.com/video-file.avi", "tag": ["Optional Tag1", "Optional Tag2"]}]`  
  

Para feeds XML, é possível adicionar URLs de vídeo usando tags `<video>` da seguinte forma:

```
<video><url>https://{URL1}</url><tag>video_product_set1</tag><tag>video_product_set2 </tag></video><video><url>https://{URL2}</url><tag>video_product_set1</tag></video>
```

### Consulte dados de vídeo da API do item do produto

Os campos `videos`, `videos_metadata` e `video_fetch_status` estão disponíveis nas APIs do catálogo para gerar detalhes sobre os vídeos de produtos associados.

```
v24.0
```

Para saber mais sobre os vídeos, consulte os detalhes do [Item de produto](/docs/marketing-api/reference/product-item).

### Adicionar vídeos com a API em lote de catálogo

É possível promover alterações em produtos usando o [ponto de extremidade `/{product_catalog_id}/items_batch`](/docs/marketing-api/reference/product-catalog/items_batch). Você pode fazer uma chamada de API `POST` com o campo `video`, que é uma matriz de URLs.

```
curl \
  -d @body.json \
  -H "Content-Type: application/json"

> cat body.json
{
  "access_token": "<ACCESS_TOKEN>",
  "item_type": "PRODUCT_ITEM",
  "requests": [
    {
      "method": "CREATE",
      "data": {
        "id": "retailer-2",
        "availability": "in stock",
        "brand": "BrandName",
        "google_product_category": "t-shirts",
        "description": "product description",
        "image_link": "http://www.images.example.com/t-shirts/1.png",
        "title": "product name",
        "price": "10.00 USD",
        "shipping": [
          {
            "shipping_country": "US",
            "shipping_region": "CA",
            "shipping_service": "service",
            "shipping_price_value": "10",
            "shipping_price_currency": "USD"
          }
        ],
        "condition": "new",
        "link": "http://www.images.example.com/t-shirts/1.png",
        "item_group_id": "product-group-1",
        "video": [
          {"url": "http://www.jaspersmarket-example1.com/video-file.avi", "tag": ["Optional Tag1", "Optional Tag2"]}, 
          {"url": "http://www.jaspersmarket-example2.com/video-file.avi", "tag": ["Optional Tag1", "Optional Tag2"]}
        ]
      }
    },
    {
      "method": "UPDATE",
      "data": {
        "availability": "out of stock",
        "id": "retailer-3",
        "video": [
          {
            "url": "https://yourvideo.com/demo.mp4?q=1411"
          },
          {
            "url": "https://yourvideo.com/demo.mp4?q=1421"
          }
        ]
      }
    }
  ]
}
```

[Veja este exemplo no Explorador da Graph API](https://developers.facebook.com/tools/explorer/145634995501895/?method=POST&path=%7Bcatalog_id%7D%2Fitems_batch&version=v17.0&item_type=PRODUCT_ITEM&requests=[%0A%20%20%7B%0A%20%20%20%20%22method%22%3A%20%22UPDATE%22%2C%0A%20%20%20%20%22data%22%3A%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22id-3%22%2C%0A%20%20%20%20%20%20%22price%22%3A%20%22250%20USD%22%2C%0A%20%20%20%20%20%20%22title%22%3A%20%22title-3%22%2C%0A%20%20%20%20%20%20%22description%22%3A%20%22description%22%2C%0A%20%20%20%20%20%20%22image_link%22%3A%20%22https%3A%2F%2Fgoogle.com%22%2C%0A%20%20%20%20%20%20%22brand%22%3A%20%22NIKE%22%2C%0A%20%20%20%20%20%20%22availability%22%3A%20%22in%20stock%22%2C%0A%20%20%20%20%20%20%22condition%22%3A%20%22new%22%2C%0A%20%20%20%20%20%20%22link%22%3A%20%22https%3A%2F%2Fgoogle.com%22%2C%0A%20%20%20%20%20%20%22google_product_category%22%3A%20%22Apparel%20%26%20Accessories%20%3E%20Clothing%22%2C%0A%20%20%20%20%20%20%22video%22%3A%20[%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22https%3A%2F%2Ftemplates-lime-nitro.shakr.com%2FV2%2Fbf2f6b1%2Fdemo.mp4%3Fq%3D1141%22%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22url%22%3A%20%22https%3A%2F%2Ftemplates-lime-nitro.shakr.com%2FV2%2Fbf2f6b1%2Fdemo.mp4%3Fq%3D1142%22%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20]%0A%20%20%20%20%7D%0A%20%20%7D%0A]).

[](#)

## Criar anúncios com mídia dinâmica

Na criação de anúncios, há três opções que usam vídeos do catálogo:

-   Mídia dinâmica de coleção/carrossel (recomendada)
    
-   Exibir vídeo quando disponível (apenas para vídeo único)
    
-   Imagem única com mídia dinâmica
    

**Observação:** selecionar "mídia dinâmica" com a API é semelhante a selecionar as opções de **Mídia dinâmica** no Gerenciador de Anúncios. A partir de setembro de 2025, os anúncios de catálogo Advantage+ usarão mídia dinâmica por padrão.

### Anúncios de mídia dinâmica

Ao criar um objeto de criativo de anúncio com o ponto de extremidade `act_<AD_ACCOUNT_ID>/adcreatives`

-   A partir de setembro de 2025, os anúncios de catálogo Advantage+ começarão a veicular vídeos de produtos do catálogo por padrão. É possível definir `media_type_automation` como `OPT_out` para desativar os vídeo de produtos do catálogo em anúncios.
    
-   A chave `media_type_automation` funciona com formatos de carrossel, coleção e imagem única.
    

```
v24.0
```

Da mesma forma, ao criar um objeto de anúncio de catálogo Advantage+ usando o ponto de extremidade `act_<AD_ACCOUNT_ID>/ads`, o anúncio começará a veicular os vídeos de produtos do catálogo disponíveis por padrão. É possível definir `media_type_automation` como `OPT_out` para desativar os vídeo de produtos do catálogo em anúncios.

```
v24.0
```

#### Anúncios de mídia dinâmica (com formato de coleção)

-   Mídia dinâmica substitui apenas conteúdo principal. Miniaturas de produto em experiências pré-clique e instantâneas sempre serão imagens.
    
-   Ao decidir por mídia dinâmica, se o vídeo do produto estiver disponível, substituiremos a mídia principal de vídeo dinâmica por um vídeo do produto. Os anúncios de catálogo Advantage+ no formato de coleção terão mídia dinâmica ativada por padrão e começarão a veicular vídeos de produtos do catálogo a partir de setembro de 2025. É possível definir `media_type_automation` como `OPT_out` para desativar os vídeo de produtos do catálogo em anúncios.
    
-   A mídia dinâmica só substitui a mídia principal de vídeo dinâmica se ativada. No momento, uma imagem ou vídeo principal estáticos não serão substituídos por um vídeo de produto, ou seja, a _experiência de apresentação de imagens_ é substituída por um vídeo de produto.
    

**Exemplo de especificação do criativo para coleção com mídia dinâmica**

```
v24.0
```

#### Anúncios de mídia dinâmica (exibir vídeos quando disponíveis)

Em `object_story_spec`, altere `format_option` para `single_video`. Essa opção só está disponível para formato de imagem/vídeo individual.

```
v24.0
```

#### Anúncios com mídia dinâmica (imagem única com mídia dinâmica)

Em `object_story_spec`, a `format_option` de `single_image` mostrará mídia dinâmica quando `media_type_automation` for selecionado.

A partir de setembro de 2025, os anúncios de catálogo Advantage+ que usarem `format_option` de `single_image` terão mídia dinâmica ativada por padrão e exibirão vídeos de produtos do catálogo disponíveis nos anúncios. É possível definir `media_type_automation` como `OPT_out` para desativar os vídeo de produtos do catálogo em anúncios.

```
v24.0
```

### Opcional: ativar ou desativar o corte automático de vídeo

Use o campo `video_crop_style` para controlar o corte automático de vídeo. Os valores disponíveis são `AUTO` ou `NONE`.

Para desativar o corte automático de vídeo, defina `video_crop_style` como `NONE` ou remova as personalizações nas configurações de `media_type_automation`.

```
v24.0
```

O corte automático se aplica apenas a vídeos que não atendem aos requisitos de tamanho do posicionamento. No momento, esse recurso serve principalmente para ajustar o vídeo à área visível do player.

Quando um vídeo corresponder à taxa de proporção do posicionamento do anúncio, ele será retornado. Se todas as taxas de proporção de um determinado vídeo de produto forem fornecidas, o corte automático não será aplicado. Caso contrário, o anúncio selecionará um vídeo do item e verificará a configuração de corte automático: `AUTO` retorna o vídeo cortado automaticamente e `NONE` mostra o vídeo original.

[](#)

## Insights de mídia dinâmica

As métricas de engajamento de vídeo do Gerenciador de Anúncios também podem ser consultadas na API. Use a tabela a seguir para ver uma comparação.

Métrica do Gerenciador de Anúncios

Campo da API de Insights sobre Anúncios

Impressões

`impressions`

Reproduções contínuas do vídeo por 2 segundos

`video_continuous_2_sec_watched_actions:video_view`

Custo por reprodução contínua de 2 segundos do vídeo (BRL)

`cost_per_2_sec_continuous_video_view:video_view`

Reproduções do vídeo por no mínimo 3 segundos

`actions:video_view`

Custo por reprodução de 3 segundos do vídeo (BRL)

`cost_per_action_type:video_view`

ThruPlays

`video_thruplay_watched_actions:video_view`

Custo por ThruPlay (BRL)

`cost_per_thruplay:video_view`

Alcance

`reach`

Valor gasto (BRL)

`spend`

Reproduções do vídeo até 25%

`video_p25_watched_actions:video_view`

Reproduções do vídeo até 50%

`video_p50_watched_actions:video_view`

Reproduções do vídeo até 75%

`video_p75_watched_actions:video_view`

Reproduções do vídeo até 95%

`video_p95_watched_actions:video_view`

Reproduções do vídeo até 100%

`video_p100_watched_actions:video_view`

Reproduções do vídeo

`video_play_actions:video_view`

### Exemplo de solicitação

```
v24.0
```

Para saber mais, consulte a documentação [API de Insights](/docs/marketing-api/insights).

[](#)