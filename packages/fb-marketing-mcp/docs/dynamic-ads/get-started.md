---
title: "Introdução - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/dynamic-ads/get-started"
scraped_at: "2026-02-01T14:17:51.490Z"
---

# Introdução aos anúncios de catálogo Advantage+

Com os anúncios de catálogo Advantage+, você pode criar anúncios personalizados direcionados ao público certo com base em um conjunto de produtos.

Os anunciantes que veiculam anúncios sobre moradia, emprego, crédito, temas sociais, eleições e política têm conjuntos diferentes de restrições. Saiba mais em [**Categorias de anúncio especial**](/docs/marketing-api/special-ad-category).

## Antes de começar

Para criar uma campanha de anúncios de catálogo Advantage+, você precisará do seguinte:

-   Uma [Página do Facebook](https://www.facebook.com/pages/create) que represente o anunciante e, opcionalmente, uma [conta do Instagram](/docs/marketing-api/guides/instagramads/setup) se quiser veicular a campanha nessa plataforma.
    
-   Uma [conta de anúncios](https://www.facebook.com/ads/manager/accounts) com informações de pagamento registradas.
    
-   Um [catálogo](/docs/marketing-api/dynamic-product-ads/product-catalog), como o catálogo de produtos disponível na sua conta do Gerenciador de Negócios.
    

Como alternativa, você pode configurar um [público dinâmico do produto](/docs/marketing-api/dynamic-product-ads/product-audiences). Porém, não é obrigatório envolver inclusões ou exclusões de conjuntos de produtos nas suas configurações de direcionamento.

[](#)

## Etapa 1: criar uma campanha de anúncios

Consulte o documento [Ad Campaign](/docs/reference/ads-api/adcampaign) para saber mais sobre a criação de uma campanha de anúncios.

Neste nível, você deve definir sua meta de publicidade no campo `objective`. Os objetivos compatíveis com os anúncios de catálogo Advantage+ são `PRODUCT_CATALOG_SALES`, `CONVERSIONS`, `LINK_CLICKS` ou `APP_INSTALLS`. Se o `objective` fornecido for `CONVERSIONS`, `LINK_CLICKS` ou `APP_INSTALLS`, o campo `promoted_object` não será obrigatório.

```
v24.0
```

[](#)

## Etapa 2: criar um conjunto de anúncios

Para os anúncios de catálogo Advantage+, é preciso especificar o `product_set_id` no `promoted_object` do seu nível de conjunto de anúncios para promover os produtos do conjunto.

Além disso, você também pode definir o evento de conversão para esse conjunto de produtos determinando o `custom_event_type` no `promoted_object` quando o `optimization_goal` for `OFFSITE_CONVERSIONS`. Isso direciona os anúncios às pessoas que realizaram esse evento no seu app ou site.

Por exemplo, se você definir isso como `ADD_TO_CART`, "Adicionar ao carrinho" será o evento de conversão. Por padrão, `custom_event_type` é definido como `PURCHASE`. Saiba mais sobre eventos e valores-padrão para `custom_event_type` em [Pixel da Meta, Rastreamento de conversão](/docs/meta-pixel/implementation/conversion-tracking).

Se você quiser otimizar para conversões fora do site (incluindo conversões de eventos do app e do Pixel do Facebook) e pagar por impressão:

-   defina `optimization_goal` como `OFFSITE_CONVERSIONS`;
    
-   defina `billing_event` como `IMPRESSIONS`.
    

Veja mais detalhes sobre as combinações válidas de `optimization_goal` e `billing_event` em [Meta de otimização e eventos de cobrança](/docs/marketing-api/bidding/overview/billing-events#opt_bids).

Este é um exemplo de como criar um conjunto de anúncios cobrado por `IMPRESSIONS` e otimizado para `OFFSITE_CONVERSIONS`:

```
v24.0
```

O `DYNAMIC_AUDIENCE_ID` se refere a um [público do produto](/docs/marketing-api/dynamic-product-ads/product-audiences). Como opção, você pode omitir `dynamic_audience_ids` da chamada.

Para casos de uso de comércio eletrônico, é possível omitir `dynamic_audience_ids` da chamada e enviar as informações de direcionamento por comportamento como parte dos parâmetros `product_audience_specs` ou `excluded_product_audience_specs`. Essas especificações são definidas pelos mesmos parâmetros usados para criar um [público do produto](/docs/marketing-api/dynamic-product-ads/product-audiences):

#### Parâmetros

Nome

Descrição

`product_set_id`

string numérica

**Obrigatório.**  
O conjunto de produtos direcionado a esse público.

`inclusions`

Objeto JSON

**Obrigatório.**  
Um conjunto de eventos a ser direcionado. No mínimo uma inclusão é necessária. Cada inclusão deve ter exatamente um `event`.

`inclusions.retention_seconds`

número inteiro

**Obrigatório.**  
O número de segundos para manter a conta da Central de Contas no público.

`inclusions.rule`

objeto\[\]

**Obrigatório.**  
[A regra de público personalizado do site](/docs/reference/ads-api/custom-audience-website#audiencerules) que faz referência a um `event`.

`exclusions`

Objeto JSON

**Opcional.**  
Um conjunto de eventos que remove uma conta da Central de Contas do direcionamento.

`exclusions.retention_seconds`

número inteiro

**Obrigatório, se a exclusão estiver especificada.**  
O número de segundos para reter a exclusão.

`exclusions.rule`

objeto\[\]

**Obrigatório, se a exclusão estiver especificada.**  
[A regra de Público Personalizado do site](/docs/reference/ads-api/custom-audience-website#audiencerules) que faz referência a um `event`.

Cada regra precisa incluir um `event` com o operador `eq` como regra de nível superior ou como parte de uma regra `and` de nível superior.

### Redirecionamento

Neste exemplo, direcionamos o anúncio às pessoas que visualizaram os produtos nos últimos 3 a 5 dias, mas não realizaram a compra. O posicionamento dos anúncios é no feed do celular e no Audience Network. Para criar o público:

```
v24.0
```

### Venda cruzada ou upsell

Exemplo para anunciar produtos que o usuário não visualizou:

```
curl \ -F 'name=Case 1 Adset' \ -F 'bid_amount=3000' \ -F 'billing_event=IMPRESSIONS' \ -F 'status=ACTIVE' \ -F 'daily_budget=15000' \ -F 'campaign_id=<CAMPAIGN_ID>' \ -F 'targeting= { \ "geo_locations": { \ "countries":["US"], \ }, \ "interests":[ \ {"id":6003397425735,"name":"Tennis"}, \ ], \ }' \ -F 'promoted_object={"product_set_id”:<PRODUCT_SET_ID>}' \ -F 'access_token=<ACCESS_TOKEN>’ \ https://graph.facebook.com/<API_VERSION>/act_<ACCOUNT_ID>/adsets
```

Para fazer uma venda cruzada entre conjuntos de produtos:

-   forneça ao público do produto regras de evento que estejam relacionadas ao conjunto de produtos A;
    
-   mostre produtos do conjunto B no anúncio definindo o `product_set_id` como conjunto de produtos B no nível do criativo do anúncio.
    

Por exemplo, uma empresa quer aumentar as vendas de bolsas do PRODUCT\_SET\_1 direcionando um anúncio para os usuários existentes que demonstraram interesse nos sapatos pertencentes ao PRODUCT\_SET\_2. Defina o `product_set_id` nas `product_audience_specs` como o ID de PRODUCT\_SET\_2 ou sapatos, e o `product_set_id` no `promoted_object` como o ID de PRODUCT\_SET\_1 ou bolsas.

```
v24.0
```

Também defina o `product_set_id` no criativo como o ID de PRODUCT\_SET\_1.

```
v24.0
```

### Direcionamento a um público amplo

Além de redirecionar e fazer a venda cruzada para clientes existentes, os anúncios de catálogo Advantage+ podem ser usados para direcionar produtos relevantes do seu catálogo a públicos amplos, por meio do direcionamento por idade, gênero e outros fatores demográficos. Usando o direcionamento a públicos amplos combinado a lances para efetuar conversões fora do site, os anúncios de catálogo Advantage+ permitem expandir muito o alcance dos seus anúncios de maneira eficaz.

Faça o seguinte se quiser direcionar para públicos amplos:

-   Crie um público usando um direcionamento demográfico básico, como mulheres nos EUA maiores de 18 anos.
    
-   Inclua `customOptimize` para `OFFSITE_CONVERSIONS` com sinais de intenção mais fortes como `Purchase` ou `InitiateCheckout`.
    

Neste exemplo, criamos um conjunto de anúncios direcionados para mulheres, de 30 a 65 anos nos EUA, excluindo os clientes que compraram nos últimos 10 dias. Daremos um lance de US$ 8 usando `OFFSITE_CONVERSIONS` para eventos de `PURCHASE`.

```
v24.0
```

### Categorias de anúncios de catálogo Advantage+

Os anunciantes que veiculam anúncios sobre moradia, emprego, crédito, temas sociais, eleições e política têm conjuntos diferentes de restrições. Saiba mais em [**Categorias de anúncio especial**](/docs/marketing-api/special-ad-category).

As categorias de anúncios de catálogo Advantage+ apresentam duas novas opções de criativos para a plataforma de anúncios de catálogo Advantage+, que podem ser usadas a fim de personalizar criativos para compradores que tomaram a decisão de compra mais cedo. Com esse recurso, você pode criar um segundo e mais eficiente catálogo de criativos de imagens que representem cada uma das categorias (além do catálogo de imagens de produtos que você já tem). A partir dele, combinaremos as categorias de produtos com as pessoas nos seus anúncios da mesma maneira que combinamos produtos a pessoas.

As categorias de anúncios de catálogo Advantage+ podem ser usadas com qualquer opção de direcionamento no objetivo de tráfego, conversão ou vendas do catálogo. Se você não tiver um representante com uma imagem de alta qualidade para cada categoria ou marca, o Facebook poderá gerar automaticamente uma colagem 2x2 dos principais produtos de cada grupo.

Ao mapear essa nova imagem, é possível usar uma destas três colunas do seu feed para agrupar itens: marca, tipo de produto e Categoria Google do produto.

No catálogo de exemplo abaixo, a coluna **Tipo de produto** tem cinco valores únicos. O anunciante pode fornecer até cinco colagens ou imagens de estilo de vida (uma para cada valor único) no `product_type`. O tipo de produto é um conjunto de critérios de categorização, que é o nome do campo do catálogo usado para definir as categorias. O valor do campo do catálogo é o valor do critério de categorização.

Uma categoria pode ser identificada exclusivamente pelo seguinte:

-   ID do catálogo de produtos
    
-   Critérios de categorização (marca, tipo de produto ou categoria de produto do Google)
    
-   Valores dos critérios (extraídos do catálogo)
    

Varejista

Nome do ID

Preço

Tipo de produto

Marca

Categoria

`prod_1`

Camiseta

US$ 25

Roupas

Marca A

Categoria A

`prod_2`

Moletom do FB

US$ 30

Roupas

Marca B

Categoria A

`prod_3`

iPhone 6

US$ 800

Telefone

Marca C

Categoria B

`prod_4`

Samsung Galaxy S5

US$ 750

Telefone

Marca C

Categoria B

`prod_5`

Panela elétrica

US$ 120

Aparelho

Marca C

Categoria C

`prod_6`

Sofá Parker

US$ 500

Aparelho

Marca D

Categoria D

`prod_7`

Filtro solar

US$ 14

Higiene pessoal

Marca E

Categoria E

É possível associar cada categoria (por exemplo, cada grupo de produtos conforme definido por valores exclusivos em uma das colunas especificadas acima) a ativos:

-   **Nome**: um nome curto para a categoria (até 40 caracteres).
    
-   **Descrição**: uma descrição curta para a categoria (até 20 caracteres).
    
-   **`destination_uri`**: o URL da página de destino quando um usuário clica na categoria.
    
-   **`image_url`**_(opcional)_: o URL de uma imagem de estilo de vida que represente a categoria. Se nenhuma `image_url` for fornecida, geraremos automaticamente uma colagem dos principais produtos da categoria.
    

Durante a veiculação dos anúncios, fazemos a correspondência dinâmica entre cada conta da Central de Contas e as categorias às quais é mais provável que ela responda. Fazemos isso usando modelos de machine learning, que potencializam os anúncios de catálogo Advantage+ hoje em dia.

#### API de Gerenciamento de Categorias

As informações das categorias são armazenadas no nível do catálogo. Isso significa que os diferentes anúncios que promovem as categorias do mesmo catálogo compartilhariam ativos, assim como anúncios que promovem produtos compartilhariam os ativos definidos nos catálogos. Oferecemos suporte a diferentes opções de criativos para personalizar os anúncios de categorias.

Veja abaixo as APIs para obter e atualizar as informações das categorias.

##### Leitura

  

**Solicitação**

```
v24.0
```

Consultamos todos os produtos (com suporte para filtro opcional) e encontramos as principais 1.000 categorias (ordenadas de acordo com o número dos produtos).

**Exemplo de resposta**

```
{ "data": [ { "criteria_value": "clothes", "name": "Awesome clothes", "description": "Check out these awesome clothes!", "destination_uri": "http://www.example.com/clothes", "image_url": "http://www.example.com/clothes.jpg" }, ... { "criteria_value": "shoes", "name": "Awesome shoes", "description": "Check out these awesome shoes!", "destination_uri": "http://www.example.com/shoes", "image_url": "http://www.example.com/shoes.jpg" } ] }
```
  

##### Atualização

É possível especificar as informações de várias categorias em dados. Para cada categoria, `categorization_criteria` e `criteria_value` são obrigatórios, mas os campos `name`, `description`, `destination_uri` e `image_url` são opcionais. Ao atualizar as informações de uma categoria pela primeira vez, é preciso especificar o `destination_uri`. Se você quiser pular a veiculação de uma categoria, basta definir o `destination_uri` como vazio.

**Observação:** não há compatibilidade para excluir uma categoria nesse momento.

**Solicitação**

```
v24.0
```

### Criação de anúncios

As categorias para a criação de anúncios de catálogo Advantage+ são semelhantes à criação de outros anúncios de catálogo Advantage +, mas a seleção do criativo é um pouco diferente. Você ainda promoverá um conjunto de produtos com anúncios de categoria dinâmicos, mas mostraremos os criativos da categoria.

```
v24.0
```

Isso cria um criativo do anúncio da categoria renderizado em um formato carrossel:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/32611764_190903421555492_3327346709360541696_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=qtw6cZhmSC4Q7kNvwHjkh_W&_nc_oc=AdllCh_NtSBapqlsehSeQUZnp46Cov_eQ_-y8mfM1TknBm-zZoQb2aOBTau0-bFb73jKqBVWNX585mKtMfx4tBUq&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=7mrDqomTYHdwuO5qITHIUg&oh=00_Afu8XHWjcGpAvmNawIgjFN5OaLwkYnDK2PgEySn16cjeVA&oe=6999B855)

#### Tokens da categoria

Tokens de categoria compatíveis:

-   `category.name`: o nome da categoria dentro do conjunto de produtos promovido.
    
-   `category.description`: a descrição da categoria dentro do conjunto promovido.
    
-   `category.destination_uri`: o URI de destino da categoria.
    
-   `category.min_price`: o preço mínimo dessa categoria dentro do conjunto de produtos promovido. Essas informações são extraídas do catálogo.
    

**Parâmetros**

Nome

Descrição

`categorization_criteria`

Especifica o tipo de categoria a ser usado.  
**Valores:**

-   `brand`
    
-   `product_type`
    
-   `google_product_category`
    

`category_media_source`

Especifica como renderizar o cartão do carrossel da categoria.  
**Valores:**

-   `mixed` (padrão)  
    Usa a imagem da categoria. Se não houver uma, aplica `products_collage`.
    
-   `category`  
    Usa a imagem da categoria. Ignora a categoria se ela não tiver uma imagem.
    
-   `products_collage`  
    Gera uma colagem 2x2 de imagens de produtos desta categoria.
    

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/32599538_174928363210069_7812431166509678592_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e280be&_nc_ohc=EmKzRGLb868Q7kNvwEBqmuC&_nc_oc=AdlB7ShrSOWBT_exK_QceKeyO7iGix-10vEWN-KI-3Yami5DIsJdfA1L4dV48IxcFnbWPHAjfEL5d2yubsbBsu-o&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=7mrDqomTYHdwuO5qITHIUg&oh=00_AftlM0WEclm3AfJDOReI-wxk2UnECEzUqOJ89ToWa10twA&oe=6999A99A)

-   `products_slideshow`  
    Renderiza uma apresentação multimídia de produtos a partir desta categoria.
    

Durante a criação de um criativo do anúncio da categoria, pesquisamos possíveis categorias renderizáveis.

**Nota**: filtramos categorias sem nome ou URL de destino. Também filtraremos categorias sem imagens se `category_media_source = category`.

#### Erros comuns

Haverá uma falha na geração de criativos se houver menos de quatro categorias qualificadas. Por exemplo, para usar categorias de anúncios de catálogo Advantage+ como o criativo de uma determinada campanha, você precisa ter **pelo menos quatro valores únicos** em uma coluna específica no arquivo de feed de dados.

[](#)

## Etapa 3: fornecer um criativo do anúncio

Os modelos de anúncios de catálogo Advantage+ usam [posts da Página inline](/docs/marketing-api/reference/ad-creative#inline_post) para produzir criativos do modelo para Catálogo do Advantage+.

### Criar um modelo de criativo

A criação de um modelo de criativo dos anúncios de catálogo Advantage+ é semelhante à de outros [criativos do anúncio](/docs/marketing-api/reference/ad-creative). A diferença é que você pode adicionar [parâmetros do modelo](#use-product-feed-data-in-your-template) que são renderizados no tempo de execução com base nos dados do seu arquivo de feed de dados.

Crie o modelo com base no objeto `template_data` das `object_story_spec` e use os seguintes campos:

Nome

Descrição

Aceita parâmetros de modelo

`call_to_action`

objeto

[Objeto de chamada para ação](/docs/reference/ads-api/page-posts-with-cta).  
O campo `value` precisa ser omitido.

Não

`message`

string

Mensagem para seu anúncio, visível no Instagram.

Sim

`link`

string

Link para seu site, usado para gerar a legenda do anúncio.  
Este campo sempre será substituído por `link` do arquivo de feed de dados, exceto no cartão final de um [anúncio em carrossel](/docs/marketing-api/guides/multi-product-ads#spec). Nesse caso, ele será vinculado a esse link.  
**Observação:** o URL não pode ser do Facebook.

Não

`name`

string

Nome ou título do anúncio, visível no Instagram.

Sim

`description`

string

Descrição do anúncio, não visível no Instagram.

Sim

`force_single_link`

booliano

**Opcional.**  
Força a renderização de um formato único de link.  
Quando estiver definido como `true`, o criativo será um anúncio do post da Página do link mostrando um só produto. Quando for omitido, o resultado será um anúncio em carrossel. O Facebook escolherá o número de cartões para otimizar o desempenho do seu anúncio.

Não

`show_multiple_images`

booliano

Mostra várias imagens de um único produto no carrossel.  
**Observação:**`force_single_link` e `multi_share_end_card` precisam ser definidos como `true` e `false`, respectivamente.

Não

`multi_share_end_card`

booliano

**Opcional.**  
O padrão é `true`.  
Use no formato de carrossel. Se estiver definido como `false`, ele removerá o cartão final que exibe o ícone da página.

Não

`child_attachments`

matriz

Permite que você forneça um ou mais cartões estáticos nos anúncios de catálogo Advantage+ no formato de carrossel.  
Esses cartões aparecem antes ou depois de todos os anúncios de catálogo Advantage+. Defina o campo `static_card` como `true` para cada cartão estático em `child_attachments`.

Não

`image_layer_specs`

[AdCreativeLinkDataImageLayerSpecs](/docs/graph-api/reference/ad-creative-link-data-image-layer-spec)

Especifica como transformar as imagens quando elas são entregues aos usuários no anúncio.  
É necessário um [`AdCreativeLinkDataImageOverlaySpec`](/docs/marketing-api/reference/ad-creative-link-data-image-overlay-spec) em cada camada para definir como renderizá-la. Vale lembrar que as camadas são renderizadas na ordem em que aparecem na lista.  
**Observação**: [`AdCreativeLinkDataImageLayerSpec`](/docs/graph-api/reference/ad-creative-link-data-image-layer-spec) está disponível de forma limitada. Entre em contato com seu representante do Facebook para saber mais.

Não

`image_overlay_spec`

[AdCreativeLinkDataImageOverlaySpec](/docs/marketing-api/reference/ad-creative-link-data-image-overlay-spec)

Determina como apresentar imagens sobrepostas na ilustração de um item dinâmico.

Não

`preferred_image_tags`

matriz

Seleciona qual imagem deve ser usada caso você tenha adicionado tags às imagens.  
Em todos os itens, a imagem é escolhida desta forma: obtemos em `preferred_image_tags` a primeira tag que tenha pelo menos uma imagem para o item. Depois, renderizamos a primeira imagem para aquela tag. Se nenhuma tag corresponder a uma imagem, exibiremos a primeira imagem.

Não

`preferred_video_tags`

Seleciona qual vídeo deve ser usado caso você tenha adicionado tags aos vídeos.  
Em todos os itens, o vídeo é escolhido desta forma: obtemos em `preferred_video_tags` a primeira tag que tenha pelo menos um vídeo para o item. Depois, renderizamos o vídeo com melhor desempenho para a tag e o posicionamento. Se nenhuma tag corresponder a um vídeo, exibiremos o primeiro vídeo. Se não houver vídeos, recorreremos à renderização de imagem.  
**Observação:**`preferred_video_tags` será aplicado somente se o anúncio tiver [mídia dinâmica](/docs/marketing-api/advantage-catalog-ads/dynamic-media/#dynamic-media).

Não

### Exemplos

#### Criar um modelo em carrossel de anúncios de catálogo Advantage+

```
v24.0
```
  

#### Usar um modelo de anúncios de catálogo Advantage+ com sobreposições de imagem

```
curl \ -F 'name=Advantage+ Catalog Ads Template Creative Sample' \ -F 'object_story_spec={ "page_id": "<PAGE_ID>", "template_data": { "call_to_action": {"type":"SHOP_NOW"}, "description": "Description {{product.description}}", "link": "<LINK>", "message": "Test {{product.name | titleize}}", "name": "Headline {{product.price}}", "image_layer_specs": [ { "layer_type": "image", "image_source": "catalog" }, { "layer_type": "frame_overlay", "blending_mode": "lighten", "frame_image_hash": "<HASH>", "frame_source": "custom", "opacity": 100, "overlay_position": "center", "scale": 100 }, { "layer_type": "text_overlay", "content": { "type": "price", "auto_show_enroll_status": "OPT_IN" }, "opacity": 100, "overlay_position": "top_left", "overlay_shape": "rectangle", "shape_color": "DF0005", "text_color": "FFFFFF", "text_font": "open_sans_bold" } ] } }' \ -F 'product_set_id=<PRODUCT_SET_ID>' \ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/adcreatives
```
  

#### Criar um modelo de anúncios de catálogo Advantage+ para um produto único com uma chamada para ação

```
v24.0
```
  

#### Criar um modelo de anúncios de catálogo Advantage+ em carrossel para um produto único no qual cada imagem venha da matriz de imagens adicionais do catálogo

```
v24.0
```
  

#### Criar um modelo de anúncios de catálogo Advantage+ em carrossel com o primeiro cartão como um cartão estático do cupom

```
v24.0
```
  

#### Criar uma apresentação multimídia em carrossel de um modelo de anúncios de catálogo Advantage+

Renderizamos cada cartão dinâmico no carrossel como uma apresentação multimídia. Cada apresentação multimídia mostrará imagens de um item dinâmico se o item tiver várias imagens. Se o item dinâmico tiver apenas uma imagem, renderizaremos um cartão como imagem estática.

```
v24.0
```

A resposta a essas chamadas é o ID de um novo criativo do modelo de anúncios de catálogo Advantage+.

```
{"id":"creative_id"}
```
  

#### Carregar um catálogo

Ao carregar um catálogo, você pode especificar tags de strings alfanuméricas arbitrárias para cada imagem em cada propriedade.

```
<listing> <hotel_id>hotel_1</hotel_id> ... <image> <url>https://media-cdn.tripadvisor.com/media/photo-o/05/ca/40/af/the-epiphany-a-joie-de.jpg (https://l.facebook.com/l.php?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F05%2Fca%2F40%2Faf%2Fthe-epiphany-a-joie-de.jpg&h=ATPTuLcCa7Vsnmn07cEVa0YseTFl1C2hOax9NezejmXDbR48w3CLdjLlwlpuGCRDQmuafQvk03ybGqfhk-2mBcH7xtuKAsnuuq9xKwBd8DwfuBMZkq3n1qX5MdychRKGy2bo2ax9BZQzgqVDY_AvC1EqE6aAdUEc)</url> <tag>exterior</tag> <tag>first image</tag> <tag>tree</tag> </image> <image> <url>http://www3.hilton.com/resources/media/hi/DFWANHH/en_US/img/shared/full_page_image_gallery/main/HH_exteriorview001_1270x560_FitToBoxSmallDimension_Center.jpg (http://l.facebook.com/l.php?u=http%3A%2F%2Fwww3.hilton.com%2Fresources%2Fmedia%2Fhi%2FDFWANHH%2Fen_US%2Fimg%2Fshared%2Ffull_page_image_gallery%2Fmain%2FHH_exteriorview001_1270x560_FitToBoxSmallDimension_Center.jpg&h=ATPTuLcCa7Vsnmn07cEVa0YseTFl1C2hOax9NezejmXDbR48w3CLdjLlwlpuGCRDQmuafQvk03ybGqfhk-2mBcH7xtuKAsnuuq9xKwBd8DwfuBMZkq3n1qX5MdychRKGy2bo2ax9BZQzgqVDY_AvC1EqE6aAdUEc)</url> <tag>skyline</tag> ... </image> ... </listing>
```
  

#### Gerar um criativo do anúncio

Ao gerar um criativo do anúncio, você poderá passar uma matriz de `preferred_image_tags` nas `object_story_spec`.

```
v24.0
```

### Habilitar vídeo para anúncios de catálogo Advantage+

As principais etapas para criar anúncios de catálogo Advantage+ ainda são as mesmas. Para habilitar um vídeo, você precisa incluir dados do vídeo e fornecer esses dados dentro do catálogo.

#### Etapa 1: configurar um catálogo

Este exemplo usa um arquivo XML, mas outros formatos devem ser semelhantes.

Quando você adiciona um vídeo ao classificado, os campos `url` e `tag` são compatíveis. No momento, **só há suporte para um vídeo por produto**.

```
<?xml version="1.0" encoding="utf-8"?> <listings> <title>Test hotel feed</title> <listing> <hotel_id>hotel_1</hotel_id> <name>Test Hotel 1</name> <description>A very nice hotel</description> <brand>Facebook</brand> <address format="simple"> <component name="addr1">180 Hamilton Ave</component> <component name="city">Palo Alto</component> <component name="city_id">12345</component> <component name="region">California</component> <component name="postal_code">94301</component> <component name="country">United States</component> </address> <latitude>37.4435997</latitude> <longitude>-122.1615219</longitude> <neighborhood>Palo Alto</neighborhood> <neighborhood>Silicon Valley</neighborhood> <margin_level>8</margin_level> <base_price>200.5 USD</base_price> <phone>+1 650 666-3311</phone> <star_rating>2.5</star_rating> <guest_rating> <score>7.8</score> <rating_system>tripAdvisor</rating_system> <number_of_reviewers>300</number_of_reviewers> </guest_rating> <guest_rating> <score>9.8</score> <rating_system>Hotels.com</rating_system> <number_of_reviewers>35000</number_of_reviewers> </guest_rating> <image> <url>https://media-cdn.tripadvisor.com/media/photo-o/05/ca/40/af/the-epiphany-a-joie-de.jpg</url> <tag>front view</tag> <tag>first image</tag> </image> <image> <url>http://www.jdvhotels.com/content/uploads/2014/06/72-1200x800.jpg</url> <tag>room</tag> <tag>bed</tag> </image> <loyalty_program>Starwood</loyalty_program> <url>http://www.jdvhotels.com/hotels/california/silicon-valley-hotels/the-epiphany-hotel/</url> <applink property="ios_url" content="example-ios://electronic"/> <applink property="ios_app_store_id" content="42"/> <applink property="ios_app_name" content="Electronic Example iOS"/> * <video> <url>http://example.com/some_video1.mp4</url> <tag>City</tag> <tag>Package</tag> </video>* </listing> </listings>
```
  

##### Especificações de vídeo

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/37674036_238263450127548_4678499861123825664_n.png?_nc_cat=109&ccb=1-7&_nc_sid=e280be&_nc_ohc=PKi17k4pYCUQ7kNvwFFIPCu&_nc_oc=Adk7Vs0TJfV2F0VG3szNogdA9mp5NrgHU1D6DWl4KMbGcthY8EQHH8-MEtz4qiDk4B7v04uILzgp7bxCN9Qzi-ww&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=7mrDqomTYHdwuO5qITHIUg&oh=00_AfsRKMcB2eeBj7Mlc28zlc-rxjdRjJYXePkbCZAHgKAe7w&oe=6999B420)

#### Etapa 2: usar a API para consultar metadados de vídeo a fim de solucionar problemas

Você pode usar a API para verificar os dados carregados. A partir da versão 23.0 da API de Marketing, use o campo `videos` para acessar metadados de vídeo. Nas versões anteriores, use `videos_metadata`. Recomendamos atualizar para a versão 23.0 ou superiores e usar o campo `videos`.

##### Solicitação

```
v24.0
```
  

##### Exemplo de resposta

  

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/505150319_1420053019196981_3926505714164127074_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=Fq02sG-bXKYQ7kNvwFMmOeh&_nc_oc=AdlU4okHbDbFyfiRAj7eTGqUAyhshjQ7CdSlu7vOlPibfjffYJ88Q3Bg1Z_lM7TMpxegmvObAr9XrE2lXnxGcaTb&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=7mrDqomTYHdwuO5qITHIUg&oh=00_AftQFU_ubgklbnHOS09OYz5f6OGgdn_IiRkBrzXLdsplPQ&oe=6999ACB1)

#### Etapa 3: habilitar o vídeo no criativo ou anúncio

Para habilitar conteúdo em vídeo no nível do produto em anúncios, consulte [Create Ads with Dynamic Media](/docs/marketing-api/advantage-catalog-ads/dynamic-media#create-ads-with-dynamic-media).

### Modelos e rastreamento de cliques

Use o campo `template_url_spec` no criativo do anúncio caso você rastreie cliques em links por meio de um rastreador de terceiros antes de fazer o direcionamento para o URL do produto final. Essa ação permite que você adicione um rastreador de cliques de terceiros no nível do anúncio sem precisar codificá-lo no arquivo de feed de dados. Você também pode usar esse campo para criar modelos de deep links.

Neste campo, você pode usar campos dinâmicos, como URL ou ID do produto, e eles devem ter codificação de URL se os valores puderem conter caracteres que tornam o URL inválido.

#### Exemplo

Para criar um modelo de anúncios de catálogo Advantage+ em carrossel com a configuração `template_url_spec`:

```
v24.0
```

### Usar dados do arquivo de feed de dados no seu modelo

Quando um anúncio é exibido, o Facebook substitui o conteúdo da seção `{{ }}` pelos valores apropriados do arquivo de feed de dados. Os valores de modelos disponíveis são:

Nome

Descrição

`brand`

O valor `brand` do item do arquivo do feed de dados.

`current_price`

O preço de venda formatado se o produto tiver um preço definido. Outra opção é especificar as datas de início e término da promoção de um produto, e `current_price` mostrará o preço de venda enquanto a oferta for válida. Se não houver um preço de venda definido ou se as datas da promoção já tiverem passado, ele mostrará o campo de preço.

`description`

O valor `description` do item do arquivo do feed de dados.

`name`

O valor `title` do item do arquivo do feed de dados.

`price`

A coluna `price` formatada (como `$1,234.56`).

`retailer_id`

O valor `id` do item do arquivo do feed de dados.

`url`

O valor `link` do item do arquivo do feed de dados.

`custom_label_0`

O valor `custom_label_0` do item do seu arquivo do feed de dados.

`custom_label_1`

O valor `custom_label_1` do item do arquivo do feed de dados.

`custom_label_2`

O valor `custom_label_2` do item do arquivo do feed de dados.

`custom_label_3`

O valor `custom_label_3` do item do arquivo do feed de dados.

`custom_label_4`

O valor `custom_label_4` do item do arquivo do feed de dados.

#### Opções

Alguns valores do modelo podem receber opções, em qualquer ordem, no seguinte formato:

```
{{field option1 option2 ...}}
```

Estas opções estão disponíveis:

Opção

Descrição

Compatível com

`raw`

Omite o símbolo de moeda.

`price`  
`current_price`

`strip_zeros`

Omite a parte dos centavos na moeda se os centavos forem zeros.

`price`  
`current_price`

`round`

Omite o valor em centavos da moeda ao arredondar o preço para cima.

Todos os campos de preços

#### Transformações

Você pode usar valores de modelos com **transformações**, que ajustam o valor com base neste formato:

```
{{field | transform}}
```

Use uma destas transformações:

Transformações

Descrição

`number_format`

Coloca o número no formato-padrão, usando vírgula (",") como separador de milhares e arredondando para o próximo número inteiro (por exemplo., 1234.56->"1,235"). O valor a ser formatado deve ser um número sem formatação ("1234", e não "1,234").

`titleize`

Transforma a primeira letra da palavra em maiúscula para o título ter uma aparência melhor (por exemplo, "caixa" -> "Caixa").

`urlencode`

Codifica o valor do URL.

### Determinar o comportamento desejado do clique em anúncios para dispositivos móveis

Ao exibir um criativo dinâmico, você pode especificar o comportamento desejado quando alguém clica no anúncio no app nativo do Facebook. Para usar o deep link, existem dois requisitos:

1.  O app para dispositivos móveis para o qual o usuário será enviado é compatível com deep links ([iOS](/docs/applinks/ios) ou [Android](/docs/applinks/android)).
2.  As informações de deep link serão inseridas no [feed de produtos](/docs/marketing-api/dynamic-product-ads/product-catalog#deep-linking) ou estarão disponíveis nos [App Links](/docs/applinks).

Se esses dois requisitos forem atendidos, você poderá usar o campo `applink_treatment` ao gerar um criativo do anúncio para definir o comportamento desejado quando um usuário clica no anúncio.

Nome

Descrição

`web_only`

Sempre envia o usuário ao URL da web em questão.

`deeplink_with_web_fallback`

Se o app estiver instalado no telefone do usuário e tivermos informações de deep link correspondentes, enviaremos o usuário para o app. Se alguma dessas condições não for atendida, enviará para o site.

`deeplink_with_appstore_fallback`

É o padrão quando App Links são apresentados para o produto. Se o app estiver instalado no telefone do usuário e tivermos informações de deep link correspondentes, enviaremos o usuário para o app. Caso o app não esteja instalado, encaminha à loja de apps correspondente.

#### Exemplos

Criação de um modelo de anúncios de catálogo Advantage+ em carrossel com uma chamada para ação que gera um deep link para um app nativo, caso disponível, ou uma ação de fallback para a web:

```
v24.0
```

Criação de um modelo de anúncios de catálogo Advantage+ em carrossel com tags de URL habilitadas que gera um deep link para um app nativo, caso disponível, ou uma ação de fallback para a app store:

```
v24.0
```

### Criar um catálogo localizado para anúncios de catálogo Advantage+

Veja mais informações em [Localized Catalog for Advantage+ Catalog Ads](/docs/marketing-api/catalog/localized-catalog-da).

### Etiquetas de produto automáticas

As [etiquetas de produto automáticas](https://www.facebook.com/business/help/help.instagram.com/1157716325492082) foram criadas para melhorar o desempenho dos anúncios e ajudar as pessoas a encontrar seus produtos com mais facilidade.

Podemos incluir etiquetas de produto de forma automática em anúncios de catálogo Advantage+. Para aceitar as etiquetas de produto automatizadas, defina `automated_product_tags` como `true` em `template_data` em `object_story_spec`. Também é necessário fornecer um ID de conjunto de produtos.

**Exemplo**

```
v24.0
```

[](#)

## Etapa 4: criar um anúncio

Por fim, você pode criar um [anúncio](/docs/reference/ads-api/adgroup). O anúncio faz referência a um criativo do anúncio.

#### Exemplo

```
v24.0
```

Parabéns! Você criou seu primeiro Anúncio de Catálogo Advantage+. Agora remova o status pausado para começar a veiculação.

Quando publicados como anúncios de Instagram Stories, os anúncios de catálogo Advantage+ são cortados na proporção 1:1, independentemente das dimensões da imagem original.

[](#)

## Próximas etapas

### Ver uma prévia dos anúncios de catálogo Advantage+

Você pode gerar prévias do criativo dinâmico por meio da [API de Prévias de Anúncio](/docs/reference/ads-api/generatepreview). Determine o parâmetro `product_item_ids` ou especifique vários `product_item_ids` para ver a prévia de um anúncio em carrossel.

```
v24.0
```

#### Parâmetros

Nome

Descrição

`product_item_ids`

Matriz\[string\]

Lista de produtos FBIDs ou de tokens de identificação de produto codificados em Base64 URL.  
Cada token está no formato `catalog:{catalog_id}:{base64urlencode(retailer_id)}`.

### Obter estatísticas dos anúncios dos produtos

Você pode obter estatísticas por produto fazendo uma chamada `GET` para o ponto de extremidade [insights](/docs/marketing-api/insights-api/getting-started). Adicione o `product_id` ao parâmetro `fields`.

Isso mostra as estatísticas de todos os produtos dos conjuntos de uma conta que foram exibidos nos anúncios de catálogo Advantage+.

#### Exemplo

O exemplo registra `clicks`, `actions` e `impressions` para cada `product_id`.

##### Solicitação

```
v24.0
```

##### Resposta

```
{ "data": [ { "account_id": "123456", "product_id": "60750", "date_start": "2015-02-03", "date_stop": "2015-02-03", "impressions": 880, "clicks": 8, "actions": [ { "action_type": "link_click", "value": 6 }, { "action_type": "offsite_conversion.other", "value": 5 }, { "action_type": "offsite_conversion", "value": 5 } ], "account_name": "My Account" }, ], ... }
```

### Consultar comentários e curtidas

Você pode recuperar os comentários, as curtidas e o `product_id` de um post de anúncios de catálogo Advantage+. Faça uma chamada `GET` conforme o exemplo abaixo com o `post_id`. O `post_id` é o `effective_object_story_id` de um [criativo do anúncio](/docs/marketing-api/reference/ad-creative), no formato `PageID_PostID`.

**Observação**: não é possível usar este ponto de extremidade para recuperar comentários do Instagram.

```
curl -G \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<API_VERSION>/<POST_ID>/dynamic_posts
```

Esse ponto de extremidade retorna objetos de [post dinâmico](/docs/graph-api/reference/rtb-dynamic-post).

Depois de consultar posts dinâmicos, você poderá buscar `comments`, `likes`, `product_id` e `child_attachments` para o formato carrossel, se aplicável.

Os anúncios de personalização de ativo de posicionamento não serão retornados pela borda `dynamic_posts`.

[](#)

## Saiba mais

-   [Catálogo](/docs/marketing-api/dynamic-product-ads/product-catalog)
    
-   [Públicos de produtos dinâmicos](/docs/marketing-api/dynamic-product-ads/product-audiences)
    
-   [Ad Set](/docs/reference/ads-api/adset/)
    
-   [Referência para criativos de anúncio](/docs/marketing-api/reference/ad-creative)
    
-   Curso do Meta Blueprint: [Preparar e configurar o catálogo para anúncios de catálogo Advantage+](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219712%3Fcontent_id%3DMRY0h11ihTBfj6p&h=AT2LCGnLPjQx-1h10J8rHXdKcKgsAAsFBsrjooZNZ1EdvyaBzbOzQakMOaeETl5xqnJ3J_DNPTsfkHKNd8Q9L66epQ367syk6s9yWuaagPpHPVbi9iSOo3mfvd9WiELMAK0ZfPaBvtY8nCeRzIiILdmoKX-23nZ8DYGu0wyHpus)
    
-   Curso do Meta Blueprint: [Resolver problemas do catálogo para anúncios de catálogo Advantage+](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219711-troubleshoot-meta-advantage-catalog-ads%3Fcontent_id%3DOVVdO3F3aYOmKgT&h=AT18wjOrfXclXBw1PjY-qTgitZ2xWFWSrtMgjWPNVpT_1I7bJTxdhYJN3BfEtIY7tlqmSr2qax1bfpWdLpEU0g1LKl8-a9fAyrDHfudvcR4x5NE969MwPgZfGoUhELWRlOicIGvK4WbSh1Eym4-M9cstxR2rehAOeN_kzJrSZgs)
    
-   Treinamento ao vivo do Meta Blueprint: [Resolver problemas do catálogo para anúncios de catálogo Advantage+](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpage%2F549922-troubleshoot-catalog-for-advantage-catalog-ads%3Fcontent_id%3Dsh69r7qh1rswXYa&h=AT1y-l6RO6T4oRJ_5QMZkTAsRa3zFymM-ycocIFgIragBIFfDKe5qmUIil6Lb6HWE69B3b8bGM6Ndd2FZ1-De7r2VitS9bNr8Z1G7LDNiXWfMd_Q-wxuWdpQQwe-vn8lIs6RhWENkdfLQWtFBJekwlpeCqeUsBZRc7GAm0Oe7lU)
    

[](#)