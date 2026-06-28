---
title: "Anúncios de coleção - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/collection-ads"
scraped_at: "2026-02-01T13:52:35.712Z"
---

# Anúncios de coleção

O formato de anúncio de coleção inclui uma [experiência instantânea](/docs/marketing-api/guides/instant-experiences) e facilita a descoberta, a navegação e a compra de produtos e serviços em dispositivos móveis, de forma visual e imersiva. Após a interação, o anúncio no feed exibirá três produtos abaixo de uma hero image ou de um vídeo principal, em uma experiência instantânea de tela cheia.

Você pode criar um anúncio no formato de coleção ao criar uma [experiência instantânea](/docs/marketing-api/guides/instant-experiences). Comece com um modelo ou escolha seu próprio layout personalizado.

Também é possível incluir as interfaces para criação de anúncios do Facebook no formato de coleção no seu site. Para isso, crie um [diálogo dos anúncios de coleção](#collection-ads-dialog) usando o SDK para JavaScript.

Para criar coleções usadas nas Lojas ou adicionar metadados a um conjunto de produtos, consulte [API de Coleção do Conjunto de Produtos](/docs/commerce-platform/catalog/collections).

Considere todas as menções a "Canvas" como referências a experiências instantâneas, já que Canvas era o antigo nome desse formato.

## Objetivos e posicionamentos compatíveis

### Objetivos

Você pode usar anúncios de coleção com estes objetivos:

-   Tráfego
    
-   Conversões
    
-   Vendas do catálogo de produtos _(compatível ao usar coleções com um conjunto de produtos)_
    
-   Visitas ao estabelecimento _(compatível ao usar coleções com um conjunto de produtos)_
    
-   Reconhecimento da marca
    
-   Alcance
    

Com os objetivos de tráfego e de conversões, também é possível usar vídeos de apresentação multimídia. Consulte [Como escolher o objetivo do anúncio certo do Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/1438417719786914) para saber mais.

### Posicionamentos

Os seguintes posicionamentos são compatíveis:

-   Feed do Facebook
    
-   Facebook Reels
    
-   [Feed do Instagram](/docs/marketing-api/guides/instant-experiences#instant-experiences-and-instagram-ads)
    
-   [Instagram Stories](/docs/marketing-api/guides/instant-experiences#instant-experiences-and-instagram-ads)
    

Para saber mais, consulte [Sobre os posicionamentos de anúncios nas tecnologias da Meta](https://www.facebook.com/business/help/407108559393196) e [Posicionamentos e formatos de anúncio disponíveis para objetivos de anúncios](https://www.facebook.com/business/help/279271845888065).

[](#)

## Criativos de anúncios de coleção com conteúdo padrão

É possível usar um [modelo](/docs/marketing-api/guides/instant-experiences#templates) e criar rapidamente uma experiência instantânea para uma meta de negócios específica. O layout de cada modelo é fixo. No entanto, você pode substituir o conteúdo padrão por imagens, vídeos, produtos, textos e links.

Existem dois tipos de anúncio de coleção de experiências instantâneas: **baseados em imagens** e **baseados em vídeo**, dependendo do ativo fornecido. Assim que tiver um criativo, você poderá criar um anúncio.

### Gerar um criativo do anúncio baseado em imagem

```
v24.0
```

### Gerar um criativo do anúncio baseado em vídeo

```
v24.0
```

### Parâmetros

Nome

Descrição

`link`

string

**Obrigatório**  
Redireciona o espectador a uma experiência instantânea.

`collection_thumbnails`

matriz

**Obrigatório**  
Uma matriz de miniaturas. São necessárias quatro miniaturas.

#### Campos `collection_thumbnails`

Nome

Descrição

`element_id`

string numérica

**Obrigatório**  
A identificação do elemento de foto do Canvas ou da lista de produtos. É necessário associar a foto do Canvas à experiência instantânea anexada ao anúncio de coleção. Uma imagem associada a essa identificação aparecerá na experiência instantânea quando alguém clicar no anúncio.  
**Observação:** a identificação do elemento da hero image é inválida.

`element_child_index`

número inteiro

**Obrigatório para elemento de foto com e elemento de lista de produtos e etiquetas de produto**  
O índice de produtos de uma matriz de identificações de elemento de foto com etiquetas de produto. Ou um índice de produtos de uma matriz de `product_id_list` que contém os elementos de lista de produtos.  
**Observação:** o valor deve ser um número inteiro positivo.

`element_crops`  
[AdsImageCrops](/docs/marketing-api/image-crops)

**Obrigatório para um elemento de foto**  
O objeto JSON que define as dimensões de corte da imagem especificada.  
**Observação:** só é permitida a chave de corte `100x100`.

[](#)

## Conjuntos de produtos

Antes de criar um anúncio de coleção, é necessário fornecer um criativo e uma experiência instantânea. Você precisa fornecer pelo menos quatro elementos que representem fotos ou produtos com etiquetas de produto para serem exibidos em rotação. Os elementos de foto secundários em um carrossel também são válidos.

O anúncio de coleção aparece no feed, e as pessoas podem ver mais com uma experiência instantânea em tela cheia, que é aberta após a interação.

Para usar um conjunto de produtos, você deve conhecer os [anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads) e já ter um [catálogo de produtos](/docs/marketing-api/catalog) configurado.

### Criar um anúncio de coleção usando um conjunto de produtos

Ao gerar um anúncio de coleção usando um conjunto de produtos, você também deve criar uma experiência instantânea com os elementos corretos. Quando a experiência instantânea for usada em um anúncio de coleção, o anúncio será gerado automaticamente pela Meta.

Sua experiência instantânea precisa conter:

-   uma imagem, seja uma [foto](/docs/graph-api/reference/canvas-photo/), um [vídeo](/docs/graph-api/reference/canvas-video/) ou um [vídeo de modelo do Canvas](/docs/graph-api/reference/canvas-template-video);
    
-   um [conjunto de produtos](/docs/graph-api/reference/canvas-product-set) com `show_in_feed` definido como `true`;
    
-   um [rodapé](/docs/graph-api/reference/canvas-footer).
    

#### Etapa 1: criar a imagem da experiência instantânea

  

##### Exemplos de solicitação

Criar a experiência instantânea com uma imagem

```
v24.0
```

Criar a experiência instantânea com um vídeo

```
v24.0
```

Criar a experiência instantânea com um vídeo de modelo

```
v24.0
```

#### Etapa 2: criar o conjunto de produtos da experiência instantânea

Crie um `canvas_product_set` com uma `product_set_id` do seu catálogo de produtos. É necessário definir `show_in_feed` como `true` para criar um anúncio de coleção.

##### Exemplo de solicitação

```
v24.0
```

**Observação:** os parâmetros `item_headline`, `item_description`, `image_overlay_spec`, `storefront_setting` e `retailer_item_ids` são campos opcionais.

Forneça os [campos obrigatórios](/docs/marketing-api/reference/ad-creative-link-data-image-overlay-spec) no parâmetro `image_overlay_spec`.

O parâmetro `storefront_setting` é compatível com os campos `product_set_layout`, `enable_sections` e `customized_section_titles`.

##### O campo `product_set_layout`

Nome

Descrição

`layout_type`

string

**Obrigatório.**  
Indica como o conjunto de produtos será exibido.  
**Valores:**`GRID_2COL`, `GRID_3COL`, `CAROUSEL`, `HSCROLL_LIST`

##### O campo `customized_section_titles`

Para usar `customized_section_titles`, o parâmetro `enable_sections` precisa ser definido como `true`.

Nome

Descrição

`title_id`

string

**Obrigatório.**  
String de enumeração que representa a string padrão do título da seção que você quer substituir.  
**Valores**: `keep_shopping`, `take_another_look`, `you_may_also_like`, `related_products`, `trending`, `popular`, `top_items`, `favorites`, `most_viewed`, `top_picks_for_you`, `suggested_for_you`, `featured_favorites`, `just_for_you`, `explore_more`, `shop_by_category`

`customized_title`

string

**Obrigatório.**  
String personalizada alternativa que deve ser vista como o título da seção.

#### Etapa 3: criar o rodapé da experiência instantânea

Crie o rodapé da experiência instantânea com um link.

##### Exemplos de solicitação

```
v24.0
```

Você também pode criar um botão para usar no rodapé.

```
v24.0
```

#### Etapa 4: criar a experiência instantânea completa

  

##### Exemplos de solicitação

  

Experiência instantânea básica

```
v24.0
```

Para criar a experiência instantânea com um vídeo de modelo, conjunto de produtos, botão, localização do estabelecimento e rodapé opcional, inclua o parâmetro `source_template_id`.

```
v24.0
```

Para um modelo de vitrine, é preciso especificar `source_template_id = 1932289657009030`. Confira a definição em [Experiências instantâneas, Usar um modelo](/docs/marketing-api/guides/instant-experiences#templates). O layout de cada modelo é fixo. No entanto, você pode substituir o conteúdo padrão por vídeos dinâmicos, produtos, textos e links.

#### Etapa 5: criar o anúncio de coleção com a experiência instantânea

Se o primeiro elemento da experiência instantânea for uma foto, será necessário definir `object_type` como `SHARE`.

```
v24.0
```

Se o primeiro elemento da experiência instantânea for um vídeo, defina `object_type` como `VIDEO`.

```
v24.0
```

Se o primeiro elemento da experiência instantânea for um vídeo de modelo, faça uma solicitação como esta:

```
v24.0
```

### Prévias do anúncio

Você pode fornecer um `ad_format` e um token de acesso do usuário para gerar prévias com base no seu anúncio ou criativo.

```
v24.0
```

**Observação:** os formatos compatíveis com anúncios de experiência instantânea que usam vídeos de modelo são `BIZ_DISCO_FEED_MOBILE`, `GROUPS_MOBILE`, `MOBILE_FEED_STANDARD`, `SUGGESTED_VIDEO_DESKTOP`, `SUGGESTED_VIDEO_MOBILE` e `WATCH_FEED_MOBILE`.

Saiba mais em [Prévias do anúncio](/docs/marketing-api/generatepreview).

[](#)

## Diálogo dos anúncios de coleção

Os anúncios de coleção são baseados em experiências instantâneas com um modelo. Portanto, para criar um anúncio de coleção com um diálogo, será preciso usar o [diálogo de experiências instantâneas](/docs/marketing-api/guides/instant-experiences#canvas-ads-dialog) com parâmetros adicionais. Isso fornecerá o fluxo da interface do usuário para a criação de anúncios de coleção do Facebook no seu site. Para mais detalhes sobre o componente de interface do usuário, consulte [Diálogos](docs/javascript/reference/FB.ui).

Para configurar o SDK do Facebook para JavaScript, consulte:

-   [Guia de início rápido](/docs/javascript/quickstart)
    
-   [Referência de inicialização](/docs/javascript/reference/FB.init)
    

O SDK para JavaScript depende das permissões do usuário conectado para criar experiências instantâneas. Se o usuário não tiver as permissões necessárias para criar uma experiência instantânea para a página e a empresa fornecidas, o diálogo exibirá um erro. O usuário também deve ter acesso aos conjuntos e catálogos de produtos. Para garantir que não ocorram erros, o usuário precisará ter acesso ao Gerenciador de Negócios e permissões para criar anúncios para a página.

Depois disso, será possível acionar o diálogo dos anúncios de coleção.

```
FB.ui({         
  display: 'popup',
  method: 'instant_experiences_builder',
  account_id: 'AD_ACCOUNT_ID'.
  business_id: 'BUSINESS_ID',
  page_id: 'PAGE_ID',
  template_id: 'TEMPLATE_ID'
}, function(response) {
  // callback
});
```

### Configurações

Nome

Descrição

`display`

**Obrigatório.**  
**Valor:**`popup`

`method`

**Obrigatório.**  
**Valor:**`instant_experiences_builder`

`account_id`

**Obrigatório.**  
A identificação da conta de anúncio.

`business_id`

**Obrigatório.**  
A identificação da empresa.

`page_id`

**Obrigatório.**  
A identificação da Página que você quer associar à experiência instantânea.

`template_id`

**Obrigatório.**  
A identificação do modelo que você quer usar.

`product_catalog_id`

**Obrigatório, se `product_set_id` for fornecido.**  
A identificação do catálogo de produtos que será usado na coleção.  
**Observação:** depois de fornecido, não será possível alterar a coleção na interface do usuário. Se o parâmetro não for fornecido, você poderá selecionar o catálogo e o conjunto de produtos na interface.

`product_set_id`

**Opcional.**  
A identificação do conjunto de produtos que será usado na coleção.  
**Observação:** depois de fornecido, não será possível alterar a coleção na interface do usuário. Se o parâmetro não for fornecido, você poderá selecionar o catálogo e o conjunto de produtos na interface.

Confira todos os tipos de modelo válidos e as identificações correspondentes na seção [Usar um modelo da documentação sobre experiências instantâneas](/docs/marketing-api/guides/instant-experiences#templates).

Para ver a prévia de um anúncio de coleção, recomendamos usar o [diálogo de prévia das experiências instantâneas](/docs/marketing-api/guides/instant-experiences#preview-an-instant-experience).

### Exemplo de resposta

```
{
  "success": true,
  "id": "<CANVAS_ID>"
}
```

O `id` retornado será uma experiência instantânea **não publicada**. É preciso [publicar](/docs/marketing-api/guides/instant-experiences#publish) essa experiência para usá-la em campanhas de anúncios.

A ausência de resposta ou o retorno de `undefined` indica que o diálogo foi fechado antes de finalizar a configuração da experiência instantânea ou que o usuário salvou a experiência, mas não a concluiu. Você pode consultar [todas as experiências instantâneas pertencentes a uma Página](/docs/marketing-api/guides/instant-experiences#get-an-existing-instant-experiences) e verificar se há alguma incompleta.

[](#)

## Como incluir catálogos de destino

É possível exibir os criativos do anúncio de um catálogo de destinos na hero image do anúncio de coleção. Você também pode exibir um carrossel de imagens de hotéis do destino em questão. Para isso, forneça uma imagem alternativa que será exibida como hero image caso não haja um destino correspondente para hotéis no carrossel. Consulte [Catálogo de destinos](/docs/marketing-api/destination-ads/catalog) para mais informações.

Observe as seguintes limitações:

-   O criativo do vídeo não é compatível.
    
-   Aceitamos apenas a exibição combinada das imagens de destino e do catálogo de hotéis.
    
-   A exibição de outras combinações de catálogos não é permitida.
    

Para usar o recurso, adicione o parâmetro `destination_set_id` ao criar seu elemento `canvas_photo`. Depois, siga as outras etapas-padrão para criar a experiência instantânea e o anúncio de coleção.

### Exemplo de solicitação

```
v24.0
```

[](#)

## Criar públicos de engajamento

É possível criar automaticamente públicos para pessoas que interagiram com seu anúncio de coleção. Isso é semelhante aos públicos de engajamento para as experiências instantâneas regulares. Consulte [Criar públicos para experiências instantâneas](/docs/marketing-api/guides/instant-experiences#create-audiences-for-instant-experiences) para saber mais.

É possível fazer o direcionamento dos anúncios de experiência instantânea em tela cheia para as pessoas que tocaram no seu anúncio de coleção. Esse tipo de público é chamado de _público de engajamento de experiência em tela cheia_. Gere esse público criando um público personalizado, defina `object_id` como `CANVAS_ID` e configure uma regra para rastrear um dos eventos.

### Criar um público com pessoas que abriram uma experiência instantânea

```
v24.0
```

### Criar um público com pessoas que clicaram em um anúncio de coleção

```
v24.0
```

[](#)

## Ver mais

-   [Sobre a experiência instantânea](https://www.facebook.com/business/help/183469315334462)
    
-   [Como criar um anúncio em coleção no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/1470043529695523)
    
-   [Como escolher o objetivo do anúncio certo do Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/1438417719786914)
    
-   [Sobre os posicionamentos de anúncios nas tecnologias da Meta](https://www.facebook.com/business/help/407108559393196)
    
-   [Posicionamentos e formatos de anúncio disponíveis para objetivos de anúncios](https://www.facebook.com/business/help/279271845888065)
    

[](#)