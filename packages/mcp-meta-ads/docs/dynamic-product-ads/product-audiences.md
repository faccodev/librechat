---
title: "Públicos dinâmicos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-audiences"
scraped_at: "2026-02-01T13:59:11.704Z"
---

# Públicos de produtos dinâmicos

Com os anúncios de catálogo Advantage+, você mostra anúncios com base na intenção de compra em todos os dispositivos. É possível coletar sinais da intenção do usuário nos apps para celular e em sites a fim de usar esses dados para criar um público de clientes em potencial para direcionamento.

Este documento abrange as seguintes etapas:

-   [Configurar sinais de usuários para eventos](#step-1--set-up-user-signals-for-events)
    
-   [Associar sinais de usuários ao catálogo](#step-2--associate-user-signals-to-product-catalog)
    
-   [Criar públicos de produto](#step-3--create-product-audiences)
    
-   [Recuperar públicos de produto](#retrieve-product-audiences)
    

## Etapa 1: configurar sinais de usuários para eventos

Para coletar sinais de usuário, use os [Eventos](/docs/app-events) para seu app para celular ou o [Pixel da Meta](/docs/meta-pixel) para seu site.

Mesmo que você esteja veiculando anúncios apenas no desktop, é necessário instalar o SDK do Facebook se você tiver um app. Isso ajuda a capturar sinais e ampliar o público-alvo.

### Eventos do App para dispositivos móveis

Adicione os seguintes eventos ao app usando o SDK do Facebook para [iOS](/docs/ios) e [Android](/docs/android):

Evento

Evento para iOS

Evento para Android

Pesquisa

`FBSDKAppEventNameSearched`

`EVENT_NAME_SEARCHED`

View Content

`FBSDKAppEventNameViewedContent`

`EVENT_NAME_VIEWED_CONTENT`

Adição ao carrinho

`FBSDKAppEventNameAddedToCart`

`EVENT_NAME_ADDED_TO_CART`

Compra

// Enviar pelo logPurchase  
`[[FBSDKAppEvents shared] logPurchase:(double) currency:(NSString *) parameters:(NSDictionary *)];`

`EVENT_NAME_PURCHASED`

Todos os eventos precisam incluir um `content_id` (ou uma matriz JSON de `content_id`s).

Diferentemente do Pixel da Meta, os eventos do app não têm o parâmetro `product_catalog_id`. Por isso, você _deve associar_ seu catálogo e o app com o ponto de extremidade `external_event_sources` descrito abaixo.

#### Exemplos

Evento adicionar ao carrinho, no iOS:

```
[[FBSDKAppEvents shared] logEvent:FBSDKAppEventNameAddedToCart
      valueToSum:54.23
      parameters:@{
        FBSDKAppEventParameterNameCurrency    : @"USD",
        FBSDKAppEventParameterNameContentType : @"product",
        FBSDKAppEventParameterNameContentID   : @"123456789"
      }
];
```

Evento comprar, no iOS, com dois itens diferentes comprados com quantidade:

```
[[FBSDKAppEvents shared] logPurchase:21.97
    currency:@"USD"
    parameters:@{
      FBSDKAppEventParameterNameContent   : @"[{\"id\":\"1234\",\"quantity\":2},{\"id\":\"5678\",\"quantity\":1}]",
      FBSDKAppEventParameterNameContentType : @"product"
    }
];
```

Evento comprar, no Android, com dois itens comprados com quantidade:

```
Bundle parameters = new Bundle();
parameters.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_TYPE, "product");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT, "[{\"id\":\"1234\",\"quantity\":2},{\"id\":\"5678\",\"quantity\":1}]");

logger.logEvent(
  AppEventsConstants.EVENT_NAME_PURCHASED,
  21.97,
  parameters
);
```

Evento comprar, no Android, com dois itens comprados:

```
Bundle parameters = new Bundle();
parameters.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_TYPE, "product");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_ID, "[\"1234\",\"5678\"]");

logger.logEvent(
  AppEventsConstants.EVENT_NAME_PURCHASED,
  21.97,
  parameters
);
```

Observe que `CONTENT_ID` e `CONTENT` podem ser usados com os anúncios de catálogo Advantage+ para relatar IDs de produtos. O parâmetro `CONTENT` permitirá que você forneça mais informações sobre os produtos.

#### Como usar um Parceiro de Métricas para Aplicativos

Para usar os anúncios de catálogo Advantage+ com um Parceiro de Métricas para Aplicativos (MMP, pelas iniciais em inglês), é preciso acionar eventos obrigatórios separados quando alguém usa seu app. Os principais pontos de interação que você deve rastrear são quando uma pessoa pesquisa produtos, visualiza um produto, adiciona um item ao carrinho e compra itens. Selecione os eventos no seu MMP que correspondem aos seguintes eventos-padrão de anúncios de catálogo Advantage+:

Nome

Descrição

`fb_mobile_search`

Alguém pesquisa produtos

`fb_mobile_content_view`

Quando uma conta da Central de Contas visualiza um produto

`fb_mobile_add_to_cart`

Alguém adiciona um item ao carrinho

`fb_mobile_purchase`

Uma conta da Central de Contas compra um ou mais itens

Além disso, você precisa de _dois parâmetros adicionais_ para que cada um dos eventos seja registrado como um evento de anúncios de catálogo Advantage+ válido. Esses dois parâmetros representam o ID do item visualizado, adicionado ao carrinho ou comprado e informa se o ID é de um produto ou de um grupo de produtos. Estes são os parâmetros adicionais disponíveis:

Nome

Descrição

`fb_content_id`

string

**É obrigatório usar `fb_content_id` ou `fb_content`.**  
O(s) ID(s) do produto ou do grupo de produtos do varejista. Deve ser uma string que contém uma matriz JSON codificada de IDs. Se possível, use os IDs de produtos para um direcionamento mais preciso.

`fb_content`

string

**É obrigatório usar `fb_content_id` ou `fb_content`.**  
Uma lista de objetos JSON que contém o EAN (International Article Number), quando aplicável, ou outro identificador de produto ou conteúdo, assim como as quantidades e os preços dos produtos.

  

Os campos `id` e `quantity` são **obrigatórios**.  
**Exemplo:**  
`"[{\"id\": \"1234\", \"quantity\": 2}, {\"id\": \"5678\", \"quantity\": 1}]"`

`fb_content_type`

string

**Opcional.**  
`product` ou `product_group`, que precisa sincronizar com o tipo de ID usado como `fb_content_id`.

  

Caso nenhum `fb_content_type` seja fornecido, a Meta fará a correspondência do evento e cada item com o mesmo ID, independentemente do tipo.

  

Saiba mais em [Como escolher o `content_type` certo](#choosing-the-right-content-type).

`_valueToSum`

string

**Opcional.**  
O valor total dos produtos.

`fb_currency`

string

**Opcional.**  
A moeda usada no valor do produto ou da compra.

**Observação:** é recomendado enviar os parâmetros `_valueToSum` e `fb_currency` quando uma compra é efetuada.

### Use o Pixel da Meta para sites

Estes eventos precisam ser adicionados ao seu site, se aplicável:

-   `Search`
    
-   `ViewCategory`
    
-   `ViewContent`
    
-   `AddToCart`
    
-   `Purchase`
    

Os eventos devem ser enviados com os parâmetros de dados a seguir:

Nome

Descrição

`content_ids`

string ou string\[\]

**É obrigatório usar `content_ids` ou `contents`.**  
O(s) ID(s) do produto ou do grupo de produtos do varejista. Se possível, use os IDs de produtos para um direcionamento mais preciso.

`contents`

objeto\[\]

**É obrigatório usar `content_ids` ou `contents`.**  
Uma lista de objetos JSON que contém as identificações do produto ou do grupo de produtos do varejista, bem como informações adicionais sobre os produtos.

  

Os campos `id` e `quantity` são **obrigatórios.**  
**Exemplo:**`[{"id": "1234", "quantity": 2}, {"id": "5678", "quantity": 1}]`

`content_type`

string

**Opcional.**  
`product` ou `product_group`, que precisa sincronizar com o tipo de ID usado como `content_ids`.

  

Caso nenhum `content_type` seja fornecido, a Meta fará a correspondência do evento a cada item com o mesmo ID, independentemente do tipo.

  

Saiba mais em [Como escolher o `content_type` certo](#choosing-the-right-content-type).

`product_catalog_id`

string

**Opcional.**  
O catálogo de produtos que será usado. Se for fornecido, esse será o único catálogo que estará associado à inicialização do pixel. Caso não seja, os catálogos associados ao pixel serão usados.  
Consulte [Associar sinais de usuários ao catálogo de produtos](#step-2--associate-user-signals-to-product-catalog) para saber mais.

#### Exemplos

Abaixo, é apresentado um evento-padrão `Search`. Recomendamos que você forneça de 5 a 10 itens em `content_ids` dos seus principais resultados de pesquisa.

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

fbq('track', 'Search', { 
  search_string: 'leather sandals',
  content_ids: ['1234', '2424', '1318', '6832'], // top 5-10 search results
  content_type: 'product'
});
</script>
<!-- End Facebook Pixel Code -->
```

Abaixo, é apresentado um evento `ViewCategory`. Recomendamos que você forneça de 5 a 10 itens em `content_ids` dos seus principais resultados. Vale lembrar que `ViewCategory` não é um evento-padrão. Por isso, a função `trackCustom` é usada.

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

fbq('trackCustom', 'ViewCategory', {
  content_name: 'Really Fast Running Shoes',
  content_category: 'Apparel &amp; Accessories > Shoes',
  content_ids: ['1234', '2424', '1318', '6832'], // top 5-10 results
  content_type: 'product'
});
</script>
<!-- End Facebook Pixel Code -->
```

Abaixo, é apresentado um evento-padrão `ViewContent`. Para mais informações sobre a configuração do pixel, acesse [Pixel da Meta](/docs/meta-pixel).

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

fbq('track', 'ViewContent', {
  content_ids: ['1234'],
  content_type: 'product',
  value: 0.50,
  currency: 'USD'
});
</script>
<!-- End Facebook Pixel Code -->
```

O evento-padrão `AddToCart` depende de como sua plataforma de comércio eletrônico controla a adição de itens ao carrinho. Se ela for realizada de forma dinâmica, o evento deve ser colocado em um controlador `onclick` para ser acionado com o clique de um botão. Caso uma página separada seja carregada, o evento do pixel poderá ser acionado normalmente.

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

// If you have a separate add to cart page that is loaded.
fbq('track', 'AddToCart', {
  content_ids: ['1234', '1853', '9386'],
  content_type: 'product',
  value: 3.50,
  currency: 'USD'
});
</script>
<!-- End Facebook Pixel Code -->
```

Se o evento precisar ser acionado com o clique de um botão e nenhuma página separada for carregada:

```
<!-- The below method uses jQuery, but that is not required -->

<button id="addToCartButton">Add To Cart</button>
<!-- Add event to the button's click handler -->

<script type="text/javascript">
  $( '#addToCartButton' ).click(function() {
    fbq('track', 'AddToCart', {
      content_ids: ['1234'],
      content_type: 'product',
      value: 2.99,
      currency: 'USD' 
    });  
  });
</script>
```

Um evento-padrão `Purchase` com dois itens com quantidade:

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

fbq('track', 'Purchase', {
  contents: [
    {'id': '1234', 'quantity': 2},
    {'id': '4642', 'quantity': 1}
  ],
  content_type: 'product',
  value: 21.97,
  currency: 'USD'
});
</script>

<!-- End Facebook Pixel Code -->
```

Um evento-padrão `Purchase` com dois itens:

```
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
// Insert Your Facebook Pixel ID below. 
fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');

fbq('track', 'Purchase', {
  content_ids: ['1234', '4642'],
  content_type: 'product',
  value: 21.97,
  currency: 'USD'
});
</script>

<!-- End Facebook Pixel Code -->
```

### Como escolher o `content_type` certo

**Observação:** `fb_content_type` é o tipo de conteúdo para dispositivos móveis.

Se a página for sobre um SKU específico (tamanho, cor etc.), use `product` para `content_type` e passe os IDs de produtos (ou seja, a [coluna `id` no feed de produtos](/docs/marketing-api/dynamic-product-ads/product-catalog#required-fields)) em `content_ids`. Todos os eventos `AddToCart` e `Purchase` devem usar `content_type=product`, porque as pessoas compram produtos específicos. As pessoas não compram uma camisa sem forma, tamanho e cor. Elas compram uma camisa específica, com tamanho e cor específicos.

Se a página for sobre um grupo de produtos relacionados que pertencem ao mesmo grupo e variam de acordo com tamanho, cor etc., use `product_group` e passe os IDs do grupo de produtos (ou seja, a [coluna `item_group_id` no feed de produtos](/docs/marketing-api/dynamic-product-ads/product-catalog#optional-fields)) em `content_ids`. Um caso de uso comum é uma página `ViewContent` na qual o usuário ainda não escolheu um tamanho. **Não use** `product_group` com `AddToCart` nem `Purchase`.

É importante que o `content_type` corresponda ao tipo de ID incluído no parâmetro `content_ids` ou `contents`.

Passar os IDs de produtos específicos (`content_type=product`) permite que a Meta recomende produtos mais relevantes, pois saberá por qual variante específica (tamanho, cor e assim por diante) o usuário se interessou. Sempre mostraremos produtos (e não grupos de produtos), mesmo se `content_type=product_group`.

Caso nenhum `content_type` seja fornecido, a Meta fará a correspondência do evento a cada item com o mesmo ID, independentemente do tipo. O envio de `content_type` é recomendado, pois dará mais controle sobre o ID específico que você quer corresponder ao evento.

[](#)

## Etapa 2: associar sinais do usuário ao catálogo de produtos

É necessário associar as origens do evento com cada um dos catálogos de produtos para que o Facebook obtenha esses dados e mostre o produto correto no anúncio. Para isso, acesse sua [Página do catálogo do Gerenciador de Negócios](https://business.facebook.com/settings/product-catalogs) e clique no botão **Associate Event Source**. Selecione o app e o pixel que vão receber os eventos de anúncios de catálogo Advantage+.

Você também pode fazer uma chamada de API `POST` com uma lista de origens de eventos externas como parâmetros de strings de consulta com codificação UTF-8:

```
v24.0
```

**Observação:** é necessário ter permissões no catálogo, no pixel, no app e na empresa.

#### Parâmetros

Nome

Descrição

`external_event_sources`

**Obrigatório.**  
Uma matriz de IDs do app e do pixel para associar, como parâmetros de strings de consulta com codificação UTF-8

[](#)

## Etapa 3: criar públicos de produto

A próxima etapa consiste em criar públicos de produto com base na atividade no seu app para celular e site. Escolha quais eventos usar e direcione anúncios usando os públicos de produto.

Para eventos do app padrão, o público será agregado nos nomes de anúncios de eventos do Pixel:

-   `Search`
    
-   `ViewContent`
    
-   `AddToCart`
    
-   `Purchase`
    

Use esses nomes nas regras do público, mesmo se incluir usuários do Android e iOS.

Crie um público de produto por meio de uma chamada de API `POST` para o ponto de extremidade `/act_{ad-account-id}/product_audiences`.

```
v24.0
```

#### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
O nome do público.

`description`

string

**Opcional.**  
A descrição do público.

`product_set_id`

string numérica

**Obrigatório.** O conjunto de produtos direcionado a esse público.

`inclusions`

objeto JSON

**Obrigatório.**  
Um conjunto de eventos a ser direcionado. No mínimo uma inclusão é necessária. Cada inclusão deve ter exatamente um evento.

`inclusions.retention_seconds`

int

**Obrigatório.**  
O número de segundos para manter a conta da Central de Contas no público.

`inclusions.rule`

objeto\[\]

**Obrigatório.**  
[A regra de público personalizado do site](/docs/reference/ads-api/custom-audience-website#audiencerules) que faz referência a um `event`.

`exclusions`

objeto JSON

**Opcional.**  
Eventos dos quais uma conta da Central de Contas deve ser excluída do direcionamento.  
No caso de exclusões, a conta com esses eventos será excluída do direcionamento se o evento ocorrer em qualquer produto do mesmo grupo (ou seja, que tem o mesmo `item_group_id in` no feed de produtos).  
Por exemplo, um público de produto definido para incluir `ViewContent` e excluir eventos de compra. Uma conta da Central de Contas visualiza os produtos A e B e compra o produto B. Se A e B pertencerem ao mesmo grupo, a conta será excluída do público de direcionamento, já que A e B são apenas variantes. Se os produtos A e B não estiverem no mesmo grupo, a conta continuará no público, já que ainda possuirá um evento `ViewContent` para o produto A.

`exclusions.retention_seconds`

int

**Obrigatório, se a exclusão estiver especificada.**  
O número de segundos para reter a exclusão.

`exclusions.rule`

objeto\[\]

**Obrigatório, se a exclusão estiver especificada.**  
[A regra de Público Personalizado do site](/docs/reference/ads-api/custom-audience-website#audiencerules) que faz referência a um `event`.

Cada regra precisa incluir o `event` com o operador `eq` como regra de nível superior ou como parte de uma regra `and` de nível superior.

Se o mesmo `event` for usado nas inclusões e exclusões, as verificações de parâmetros adicionais precisarão ser as mesmas.

#### Exemplos

Para criar um público e direcionar para as pessoas que visualizaram ou adicionaram produtos a um carrinho, mas não concluíram a compra:

```
v24.0
```
  

Se você quer direcionar anúncios para pessoas que visualizaram um produto na web com um iPhone, mas não compraram em nenhum dispositivo, crie este público.

Isso pressupõe a inclusão do parâmetro `userAgent` no Pixel da Meta.

```
v24.0
```

[](#)

## Recuperar públicos de produto

Depois de criado, você pode recuperar o público do produto usando a [API de Públicos Personalizados](/docs/marketing-api/reference/custom-audience). É possível obter os parâmetros originais usados para a criação do público com o parâmetro `data_source`.

O público de produto é um tipo específico de público personalizado gerado dinamicamente a partir dos eventos do produto. O `act_{ad-account-id}/product_audiences` é um ponto de extremidade `POST` para criar esses públicos.

#### Exemplos

Para recuperar o público personalizado:

```
v24.0
```

Para recuperar um público de produto específico:

```
v24.0
```

[](#)

## Saiba mais

-   [Referência sobre o catálogo de produtos](/docs/marketing-api/reference/product-catalog)
    
-   [Referência sobre público personalizado](/docs/marketing-api/reference/custom-audience)
    

[](#)