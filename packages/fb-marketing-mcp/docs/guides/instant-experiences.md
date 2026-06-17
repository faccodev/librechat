---
title: "Experiências instantâneas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/instant-experiences"
scraped_at: "2026-02-01T13:52:31.895Z"
---

# Experiências instantâneas

As experiências instantâneas são um destino de anúncios de tela cheia e pós-clique carregado quase instantaneamente em anúncios no Feed.

Se você identificar alguma menção de `canvas` na API, será uma referência às experiências instantâneas. Canvas era o nome anterior desse formato.

## Antes de começar

Para criar e gerenciar experiências instantâneas, você precisa do seguinte:

-   A [permissão `pages_manage_ads`](https://developers.facebook.com/docs/permissions/reference/pages_manage_ads)
    
-   A [permissão `pages_read_engagement`](https://developers.facebook.com/docs/permissions/reference/pages_read_engagement)
    
-   A [permissão `pages_show_list`](https://developers.facebook.com/docs/permissions/reference/pages_show_list)
    
-   Capacidade de executar a [tarefa `ADVERTISE`](https://developers.facebook.com/docs/pages/overview/permissions-features#tasks) na Página
    

### Limitações

-   Só é possível atualizar uma experiência instantânea não publicada.
    
-   A API de Experiências Instantâneas está disponível para o Instagram de forma limitada.
    
-   Os anúncios das experiências instantâneas não são compatíveis com o Facebook Stories.
    

## Criar

Para criar uma experiência instantânea, você precisa da identificação de uma Página do Facebook (`PAGE-ID`) e [elementos](#elements) que queira incluir na experiência, como fotos, botões e texto.

```
v24.0
```

### Elementos

Nome

Descrição

[Botão](https://developers.facebook.com/docs/graph-api/reference/canvas-button/)

Um botão dentro da experiência instantânea. O campo `button_style` é obrigatório.

[Carrossel](https://developers.facebook.com/docs/graph-api/reference/canvas-carousel/)

Um carrossel para a experiência instantânea.

[Rodapé](https://developers.facebook.com/docs/graph-api/reference/canvas-footer/)

Um rodapé para a experiência instantânea.

[Cabeçalho](https://developers.facebook.com/docs/graph-api/reference/canvas-header/)

Um cabeçalho para a experiência instantânea.

[Foto](https://developers.facebook.com/docs/graph-api/reference/canvas-photo/)

Uma foto dentro da experiência instantânea. Forneça a `PHOTO-ID` de uma foto carregada em uma [Página do Facebook](/docs/graph-api/reference/page/photos).

[Lista de produtos](https://developers.facebook.com/docs/graph-api/reference/canvas-product-list/)

Uma lista de produtos para uma experiência instantânea.

[Conjunto de produtos](https://developers.facebook.com/docs/graph-api/reference/canvas-product-set/)

O conjunto de produtos de um catálogo de produtos de anúncios de catálogo Advantage+ exibidos em uma experiência instantânea.

[Localizador de lojas](https://developers.facebook.com/docs/graph-api/reference/canvas-store-locator/)

Um localizador de lojas dentro da experiência instantânea.

[Texto](https://developers.facebook.com/docs/graph-api/reference/canvas-text/)

O texto e o estilo exibidos dentro da experiência instantânea.

[Vídeo](https://developers.facebook.com/docs/graph-api/reference/canvas-video/)

Um vídeo dentro da experiência instantânea. Forneça a `VIDEO-ID` de um vídeo carregado em uma [Página do Facebook](/docs/graph-api/reference/page/videos).

#### Excluir um elemento

Para fazer a exclusão, envie uma solicitação `DELETE` com a identificação do elemento a ser removido.

```
v24.0
```

[](#)

## Obter experiências instantâneas existentes

Para obter informações sobre uma experiência instantânea, você precisa da identificação dela (`CANVAS-ID`).

```
v24.0
```

### Obter todas as experiências instantâneas de uma Página

Para obter informações sobre todas as experiências instantâneas existentes de uma Página do Facebook, você precisa da identificação da Página (`PAGE-ID`).

```
v24.0
```

[](#)

## Atualizar uma experiência instantânea

Não é possível atualizar uma experiência instantânea já publicada. Além disso, você precisa da identificação correspondente (`CANVAS-ID`) e dos IDs dos elementos para atualização.

```
v24.0
```

[](#)

## Usar um modelo

É possível usar um modelo como forma rápida de criar uma experiência instantânea para uma meta de negócios específica. O layout de cada modelo é fixo. No entanto, você pode substituir o conteúdo-padrão por imagens, vídeos, produtos, texto e links próprios.

Nome do modelo da API

ID do modelo

Descrição

Obter novos clientes

`133471657203838`

Gere conversões com uma página de destino para celular que incentiva a ação. [Modelo de aquisição de cliente](https://www.facebook.com/business/help/1454940661230823) no Gerenciador de Anúncios.

Apresentar sua empresa

`1063217037112304`

Ofereça às pessoas uma maneira envolvente de conhecer melhor sua marca, seu produto ou seu serviço. [Modelo de narrativa](https://www.facebook.com/business/help/1454940661230823) no Gerenciador de Anúncios.

Vender produtos (sem catálogo)

`424787857903852`

Crie uma experiência de compras em dispositivos móveis ao carregar as informações de produto em vez de usar um catálogo. [Modelo de venda de produtos (sem catálogo)](https://www.facebook.com/business/help/1454940661230823) no Gerenciador de Anúncios.

Vender produtos: layout de estilo de vida

`1369752616394017`

Destaque seus produtos em fotos para que as pessoas os explorem na prática. [Modelo de lookbook](https://www.facebook.com/business/help/1454940661230823) no Gerenciador de Anúncios.

Vender produtos: layout de grade

`1932289657009030`

Use seu catálogo de produtos para criar uma experiência que permita às pessoas comprarem diretamente no dispositivo móvel. [Modelo de vitrine](https://www.facebook.com/business/help/1454940661230823) no Gerenciador de Anúncios.

Experiência de AR

O [modelo de experiência de AR](https://www.facebook.com/business/help/1454940661230823) está disponível apenas via Gerenciador de Anúncios.

### Obter tipos de elemento de um modelo

#### Etapa 1. obter as informações de documento do modelo

Envie uma solicitação `GET` para identificar os elementos necessários a um modelo específico (no exemplo a seguir, **Obter novos clientes**).

```
curl -i -X GET \
 "https://graph.facebook.com/VERSION/133471657203838?fields=document&access_token=ACCESS-TOKEN"
```

#### Exemplo de resposta

```
{
  "document": {
    "name": "Get New Customers",
    "id": "397246414010297"
  },
  "id": "133471657203838"
}
```

#### Etapa 2. obter os tipos de elemento

Use a identificação do campo `document` para obter os elementos disponíveis a um modelo específico.

```
curl -i -X GET \
 "https://graph.facebook.com/VERSION/397246414010297?fields=body_elements&access_token=ACCESS-TOKEN"
```

A lista retornada exibe tipos de elementos disponíveis para uso no modelo **Obter novos clientes**.

```
{
  "body_elements": [
    {
      "name": "Cover Image or Video",
      "element_type": "PHOTO",
      "id": "397271930674412"
    },
    {
      "name": "Text",
      "element_type": "RICH_TEXT",
      "id": "397271920674413"
    },
    {
      "name": "Text",
      "element_type": "RICH_TEXT",
      "id": "397271910674414"
    },
    {
      "name": "Button",
      "element_type": "BUTTON",
      "id": "397271914007747"
    },
    {
      "name": "Carousel",
      "element_type": "CAROUSEL",
      "id": "397271940674411"
    },
    {
      "name": "Text",
      "element_type": "RICH_TEXT",
      "id": "397271917341080"
    },
    {
      "name": "Button",
      "element_type": "BUTTON",
      "id": "397271924007746"
    }
  ],
  "id": "397246414010297"
}
```

[](#)

## Publicar

Para publicar seu anúncio de experiência instantânea, envie uma solicitação `POST` à identificação da experiência (`CANVAS-ID`) e defina o campo `is_published` como `true`.

```
v24.0
```

[](#)

## Gerar um criativo do anúncio

Use o link de uma experiência instantânea existente (`CANVAS-LINK`) para gerar um criativo do anúncio.

```
v24.0
```

Assim que o criativo do anúncio estiver pronto, você poderá criar o grupo, o conjunto e a campanha de anúncios.

[](#)

## Diálogo de anúncios das experiências instantâneas

Use o _diálogo de anúncios de experiências instantâneas_ para fornecer as interfaces do usuário para a criação de anúncios de experiências instantâneas do Facebook no seu site. Para mais detalhes sobre o componente de interface do usuário, consulte [Diálogos](https://developers.facebook.com/docs/javascript/reference/FB.ui).

Para configurar o SDK do Facebook para JavaScript, consulte:

-   [Guia de início rápido](https://developers.facebook.com/docs/javascript/quickstart)
    
-   [Referência de inicialização](https://developers.facebook.com/docs/javascript/reference/FB.init/)
    

O SDK para JavaScript depende das permissões do usuário conectado para criar uma experiência instantânea. Se o usuário não tiver as permissões necessárias para criar uma experiência instantânea para a página e a empresa fornecidas, o diálogo exibirá um erro. Para garantir que não ocorram erros, o usuário deve estar na empresa e ter permissões de "criar anúncios" para a página.

Em seguida, acione o diálogo:

```
FB.ui({         
  display: 'popup',
  method: 'instant_experiences_builder',
  business_id: '<BUSINESS_ID>',
  page_id: '<PAGE_ID>'
}, function(response) {
  // callback
});
```

É possível fornecer as seguintes configurações para o plugin:

Nome

Obrigatório

Descrição

`display`

Sim

Parâmetro necessário com valor definido de `popup`.

`method`

Sim

Parâmetro necessário com valor definido de `instant_experiences_builder`.

`business_id`

Sim

A identificação da empresa.

`page_id`

Sim

A identificação da página a que você deseja associar a experiência instantânea.

`canvas_id`

Não

ID da experiência instantânea que você deseja editar.

O parâmetro `canvas_id` é opcional e permite que um usuário edite ou visualize uma experiência instantânea existente. **Não** será possível editar experiências instantâneas concluídas. Para visualizar uma experiência instantânea, recomendamos usar o diálogo de experiências instantâneas.

O plugin retorna a seguinte resposta em caso de sucesso:

```
{
  "success": true,
  "id": "CANVAS-ID"
}
```

A identificação retornada é uma experiência instantânea publicada. Você pode usá-la em campanhas de anúncios. Se nenhuma resposta ou uma resposta `undefined` for retornada, isso será uma indicação de que o usuário fechou o diálogo antes de concluir a experiência instantânea. O usuário pode ter salvado a experiência instantânea, mas não a concluiu. Você pode extrair todas as experiências instantâneas pertencentes a uma página por meio da Graph API. Dessa forma, é possível verificar se há experiências inacabadas.

[](#)

## Ver prévia da experiência instantânea

### API de Prévia do Iframe

Você pode gerar a visualização de uma experiência instantânea fazendo uma chamada da API de prévia que retorna um iframe (assim como na API de prévia do anúncio):

```
curl -X GET \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v18.0/<CANVAS_ID>/preview
```

A API retorna algo semelhante a isto, que pode ser visualizado incorporando o elemento iframe retornado em HTML:

```
{
"data": [
    {
      "body": "<iframe src=\"https://www.facebook.com/ads/canvas/preview?d=AQKELApdJxoVp2f3PHl8-pRtYuAh4-_eDupMDbh-pS9zde_EFxckhYQCXu7NYUi4PhhBA7uskIo2Ys3IjIVNGZiS&t=AQKGOPqGI-NWcv1YKbA\" width=\"405\" height=\"720\" scrolling=\"yes\" style=\"border: none;\"></iframe>"
    }
  ],
  "__www_request_id__": "AQnyr47Qp2r5M-ISqSiMgrw"
}
```

### SDK do Facebook

Você pode usar esse diálogo para fornecer a um usuário do Facebook a prévia de uma experiência instantânea no seu site. Para mais detalhes sobre o componente de interface do usuário, consulte [Diálogos](/docs/javascript/reference/FB.ui).

Para configurar o SDK do Facebook para JavaScript, consulte:

-   [Guia de início rápido](https://developers.facebook.com/docs/javascript/quickstart)
    
-   [Referência de inicialização](https://developers.facebook.com/docs/javascript/reference/FB.init/)
    

O SDK para JavaScript depende das permissões do usuário conectado para criar uma Experiência Instantânea. Se o usuário não tiver as permissões necessárias para visualizar a experiência instantânea, o diálogo exibirá um erro.

Depois, acione o diálogo de prévia:

```
FB.ui({         
  display: 'popup',
  method: 'instant_experiences_preview',
  canvas_id: 'CANVAS-ID'
});
```

É possível fornecer as seguintes configurações para o plugin:

Nome

Obrigatório

Descrição

`display`

Sim

Parâmetro necessário com valor definido de `popup`.

`method`

Sim

Parâmetro necessário com valor definido de `instant_experiences_preview`.

`canvas_id`

Sim

ID da experiência instantânea que você deseja visualizar.

[](#)

## Criar públicos para experiências instantâneas

Para criar um público de engajamento, isto é, um público de pessoas que interagiram com uma experiência instantânea, defina o parâmetro `object_id` do campo `rule` como a identificação da experiência instantânea (`CANVAS-ID`) na sua chamada `POST /act_AD-ACCOUNT/customaudiences`.

**Pessoas que abriram a experiência instantânea**

```
curl \
  -F 'name=Instant Experience Engagement Audience' \
  -F 'description=People who opened this Instant Experience' \
  -F 'rule=[{"object_id":"<CANVAS_ID>","event_name":"instant_shopping_document_open"}]' \
  -F 'access_token=<ACCESS_TOKEN>' \  
https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/customaudiences
Open In Graph API Explorer
```

**Pessoas que clicaram em qualquer link na experiência instantânea**

```
curl \
  -F 'name=Instant Experience Engagement Audience' \
  -F 'description=People who clicked any links in this Instant Experience' \
  -F 'rule=[{"object_id":"<CANVAS_ID>","event_name":"instant_shopping_element_click"}]' \
  -F 'access_token=<ACCESS_TOKEN>' \  
https://graph.facebook.com/<VERSION>/act_<AD_ACCOUNT_ID>/customaudiences
Open In Graph API Explorer
```

Para obter mais informações sobre Públicos Personalizados, consulte a [referência Público Personalizado](/docs/marketing-api/reference/custom-audience).

[](#)

## Experiências instantâneas e anúncios do Instagram

A implementação de anúncios de experiências instantâneas com o Instagram usa as mesmas chamadas de API utilizadas para esse tipo de anúncio no Facebook. **Observe que há limitações quando você usa o Instagram e as experiências instantâneas**:

-   **Posicionamento** – disponível para o Feed do Instagram e o Instagram Stories. Se selecionar o Instagram Stories, você deverá escolhê-lo como posicionamento de anúncios exclusivo.
    
-   **Elementos da experiência instantânea** – totalmente compatíveis com cabeçalhos e conjuntos de produtos.
    

Oferecemos suporte **parcial** a estes elementos da experiência instantânea no Instagram:

-   **Rodapé** – sem `swipe to open` em clientes, será renderizado como `Tap to open`.
    
-   **Carrossel** – sem foto que vincule a outra experiência instantânea; no cliente aparece como um link não clicável. Para fotos e vídeos, sem ajustar à altura e à largura nem inclinar para fazer uma panorâmica; será renderizado como ajustar à largura.
    
-   **Botão** – não é possível vincular a outra experiência instantânea ou à App Store.
    
-   **Texto** – sem suporte à linguagem RTL.
    
-   **Vídeo** – sem vídeo 360.
    
-   **Localizador de lojas** – não é compatível.
    

[](#)

## Insights sobre Anúncios

Confira os [Insights sobre Anúncios](/docs/marketing-api/reference/adgroup/insights/) para obter uma visão geral e descrições das métricas disponíveis.

[](#)

## Veja também

-   Guia de anúncios do Facebook: [Especificações de experiências instantâneas](https://www.facebook.com/business/ads-guide/instant-experience)
    
-   Central de Ajuda para Empresas: [Saiba mais sobre as experiências instantâneas](https://www.facebook.com/business/help/183469315334462?id=1633489293397055)
    

[](#)