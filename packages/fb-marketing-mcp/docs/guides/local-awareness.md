---
title: "Anúncios locais e de evento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/local-awareness"
scraped_at: "2026-02-01T14:10:19.326Z"
---

# Anúncios locais e de evento

Os anúncios de evento podem ser usados para promover qualquer evento no Facebook. Existem dois tipos de anúncios de evento que fornecem detalhes relevantes, uma chamada para ação de participação ou de compra de ingressos, aumentam o reconhecimento e as participações no evento, bem como direcionam as pessoas interessadas ao seu site para comprar ingressos.

Os anúncios locais ajudam lojas físicas e empresas de serviços a alcançar clientes locais com eficiência. Eles permitem o direcionamento a partir de um raio relativo a determinada localização. Dessa forma, é possível alcançar pessoas com base no local de residência e na localização mais recente. É possível usar lances de CPM otimizado para maximizar o alcance em relação ao orçamento e controlar a frequência.

## Anúncios de evento

### Criar um anúncio de evento padrão

#### Etapa 1: [Crie uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) com o `objective` definido como `EVENT_RESPONSES`.

```
v24.0
```

#### Etapa 2: [Crie um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com `optimization_goal` definido como `EVENT_RESPONSES`.

Forneça os campos `name`, `campaign_id`, `billing_event`, `targeting`, `lifetime_budget`, `bid_amount` e `end_time`.

```
v24.0
```

#### Etapa 3: [Crie o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative).

Forneça as imagens, vídeos ou texto do anúncio. O parâmetro `object_story_spec` contém o `page_id` e um link para o evento da página, e `object-type` deve ser definido como `EVENT`.

```
v24.0
```

#### Etapa 4: [Crie um anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

Faça uma chamada `POST` ao ponto de extremidade `/{ad-account-id}/ads` com os campos `name`, `creative`, `status` e `adset`.

```
v24.0
```

#### Etapa 5: Verifique o anúncio no Gerenciador de Anúncios.

A campanha terá o nome que você definiu na criação e incluirá o conjunto de anúncios, o criativo e as unidades do anúncio.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13176378_1787880114775119_1179882055_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=bXONnMSRmDEQ7kNvwFYUm64&_nc_oc=AdkCZv1bfynHTMMxOzokCIjiRvUqspW51zuh_hbMcrt-C-3sIz2v4IMWqpIZ5QPHljcOQmv6UqNC90kftc3dQTJY&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ixy2YuDdyxJFQN9i5DVWXA&oh=00_AfuAthcURHlI-47rBqQQQZtTQjwQSWtbDhCdghWsVtXMVA&oe=69853502)

### Criar um anúncio de evento para vender ingressos com cliques para o site

A publicidade de eventos pode incentivar a venda de ingressos. O evento deve ter um URL de ingresso para criar esses anúncios. A chamada para ação deve ser definida como `Get Tickets`, que encaminha as partes interessadas a um site externo no qual os ingressos podem ser comprados.

#### Etapa 1: [Criar uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) com o `objective` para `OUTCOME_TRAFFIC`.

```
v24.0
```

#### Etapa 2: [Criar um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com o `optimization_goal` definido como `LINK_CLINKS`.

```
v24.0
```

#### Etapa 3: [Crie o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative).

Faça um post e um evento da Página com os seguintes parâmetros para o criativo do anúncio. O criativo do anúncio pode ser uma imagem, um vídeo ou várias imagens.

```
"object_story_spec"={
  "page_id":<PAGE_ID>,
  "link_data": {
    "link":"<LINK_URL>",
    "event_id":<EVENT_ID>,
    "call_to_action": {
      "value": {
        "link":"<LINK_URL>"
      },
      "type":"BUY_TICKETS"
    }
  }
}
```

#### Etapa 4: [Crie um anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

Faça uma chamada `POST` ao ponto de extremidade `/{ad-account-id}/ads` com os campos `name`, `creative`, `status` e `adset`.

```
v24.0
```

#### Etapa 5: Verifique o anúncio no Gerenciador de Anúncios.

A campanha terá o nome que você definiu na criação e incluirá o conjunto de anúncios, o criativo e as unidades do anúncio.

### Criar um anúncio de evento para vender ingressos com conversões no site

Em vez de usar cliques no site como o objetivo para a venda de ingressos do evento, é possível rastrear as atividades das pessoas no site, por exemplo, visualizações do carrinho ou finalizações de compra. Posteriormente, esses dados podem ser usados para criar públicos personalizados ou semelhantes.

#### Etapa 1: [Crie uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) com o `objective` definido como `CONVERSIONS`.

```
v24.0
```

#### Etapa 2: [Crie um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com o `optimization_goal` definido como `OFFSITE_CONVERSIONS`.

Faça uma chamada `POST` ao ponto de extremidade `/{ad-account-id}/adsets` com os campos `name`, `campaign_id`, `billing_event`, `targeting`, `lifetime_budget`, `bid_amount`, e `end_time`. Defina `promoted_object` como `{pixel_id, custom_event_type}`.

Se quiser fazer o direcionamento para pessoas conectadas via `pages/apps/events`, especifique o campo `targeting:connections` conforme o exemplo abaixo.

```
{
  "geo_locations": {
    "countries":["US"]
  },
  "connections": [
    {
      "id":<CONNECTIONS_ID>
  }]
}
```

Nesse caso, as pessoas que confirmaram presença no evento com a identificação `1700354713548840` serão direcionadas como público do anúncio.

#### Etapa 3: [Crie o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative).

O criativo do anúncio pode ser uma imagem, um vídeo ou várias imagens.

O parâmetro `object_story_spec` contém `page_id` e `link_data` do evento.

```
"object_story_spec"={
  "page_id":<PAGE_ID>,
  "link_data": {
    "link":"<LINK_URL>",
    "event_id":<EVENT_ID>,
    "call_to_action": {
      "value": {
        "link":"<LINK_URL>"
      },
    "type":"BUY_TICKETS",
    "event_id":<EVENT_ID>
    }
  }
}
```

É possível usar o campo `picture` para indicar um link a ser usado como imagem. Se não houver um link, uma imagem-padrão será extraída do link do evento.

##### Criativos de anúncio em carrossel

Para um criativo do anúncio em carrossel, use o parâmetro `child_attachments` para especificar os detalhes de cada cartão do carrossel:

-   O parâmetro `link_data:link` se refere ao URL do último cartão do carrossel.
    
-   O parâmetro `child_attachments:link` se refere aos links para cartões de imagem no início do carrossel.
    
-   O campo `picture` é o URL de uma foto usada no cartão de imagem do carrossel.
    

```
{
  "page_id": <PAGE_ID>,
  "link_data": {
    "child_attachments": [
      {
        "link": "<LINK_URL>",
        "picture": "<PICTURE_URL>",
        "call_to_action": {
          "value": {
            "event_id": <EVENT_ID>
          },
          "type": "BUY_TICKETS"
        }
      },
      {
        "link": "<LINK_URL>",
        "picture": "<PICTURE_URL>",
        "call_to_action": {
          "value": {
            "event_id": <EVENT_ID>
          },
          "type": "BUY_TICKETS"
        }
      }
    ],
    "link": "<LINK_URL>",
    "event_id": <EVENT_ID>
  }
}
```

##### Criativo do anúncio de vídeo

No caso de um criativo do anúncio de vídeo, use o campo `video_data` para especificar os parâmetros obrigatórios:

-   `object_story_spec` contém `page_id` e `video_data {title, image_url, video_id, call_to_action}`.
    
-   `image_url` é a miniatura de vídeo a ser exibida.
    
-   `title` é o título a ser exibido no anúncio.
    
-   `video_id` é extraído do URL do vídeo da Página (por exemplo, `https://www.facebook.com/<PAGE_NAME>/videos/<VIDEO_ID>/`)
    

#### Etapa 4: [Crie um anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

Faça uma chamada `POST` ao `/{ad-account-id}/ads` com os campos `name`, `creative`, `status` e `adset`.

```
v24.0
```

#### Etapa 5: Verifique o anúncio no Gerenciador de Anúncios.

A campanha terá o nome que você definiu na criação e incluirá o conjunto de anúncios, o criativo e as unidades do anúncio.

### Otimizar vendas de ingressos para eventos no Facebook

A venda de ingressos pode ser impulsionada diretamente da página do seu evento no Facebook. Para criar esses anúncios, é necessário publicar os ingressos no evento do Facebook por meio de um parceiro de venda de ingressos qualificado.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/15140181_1803184849959089_2434511270100074496_n.png?_nc_cat=101&ccb=1-7&_nc_sid=34156e&_nc_ohc=fkx0pZR0gpoQ7kNvwEIJHqb&_nc_oc=AdkNzEbNjfs4NpZvW-AK37USoyEHgshQyK_O6iWEkVVGMjqRDdjJ0E0H0LGJfBrAkmfv7REnLCFugGP4SpENPDdM&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ixy2YuDdyxJFQN9i5DVWXA&oh=00_Aftutr6MhrmlDivDcVWryXur1vVfBBgp5DE_YzdayE842Q&oe=698548B2)

A chamada para ação é um botão **Obter ingressos** que abre o fluxo de finalização da compra no Facebook.

#### Etapa 1: [Crie uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) com o `objective` definido como `CONVERSIONS`.

```
curl -X POST \ -F 'name="Conversions Campaign"' \ -F 'objective="CONVERSIONS"' \ -F 'status="PAUSED"' \ -F 'special_ad_categories=[]' \ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v11.0/act_<AD_ACCOUNT_ID>/campaigns
```

#### Etapa 2: [Crie um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com o `optimization_goal` definido como `OFFSITE_CONVERSIONS`.

Faça uma chamada `POST` ao ponto de extremidade `/{ad-account-id}/adsets` com os campos `name`, `campaign_id`, `billing_event`, `targeting`, `lifetime_budget`, `bid_amount`, e `end_time`. Defina `promoted_object` como `{pixel_id, custom_event_type}`.

```
curl -X POST \ -F 'name=My Ad Set' \ -F 'optimization_goal=OFFSITE_CONVERSIONS' \ -F 'billing_event=IMPRESSIONS' \ -F 'bid_amount=2' \ -F 'daily_budget=1000' \ -F 'campaign_id=<CAMPAIGN_ID>' \ -F 'targeting={ "geo_locations": { "countries": ["US"] } }' \ -F 'promoted_object={ "event_id": <EVENT_ID>, "pixel_id": "<PIXEL_ID>", "application_id": "<APP_ID>", "custom_event_type": "PURCHASE" }' \ -F 'access_token=<ACCESS_TOKEN>' \ 'https://graph.facebook.com/v21.0/act_<AD_ACCOUNT_ID>/adsets'
```

Se quiser fazer o direcionamento para pessoas conectadas via `pages/apps/events`, especifique o campo `targeting:connections` conforme o exemplo abaixo.

```
{
  'geo_locations': {
    'countries':['US']
  },
  'connections': [
    {
      'id':<CONNECTIONS_ID>
  }]
}
```

Nesse caso, as pessoas que confirmaram presença no evento com a identificação `1700354713548840` serão direcionadas como público do anúncio.

#### Etapa 3: [Crie o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative).

O criativo do anúncio pode ser uma imagem, um vídeo ou várias imagens.

O parâmetro `object_story_spec` contém `page_id` e `link_data` do evento.

```
"object_story_spec"={
  "page_id":<PAGE_ID>,
  "link_data": {
    "link":"<LINK_URL>",
    "event_id":<EVENT_ID>,
    "call_to_action": {
      "value": {
        "link":"<LINK_URL>"
      },
      "type":"BUY_TICKETS",
      "event_id":<EVENT_ID>
    }
  }
}
```

É possível usar o campo `picture` para indicar um link a ser usado como imagem. Se não houver um link, uma imagem-padrão será extraída do link do evento.

#### Etapa 4: [Crie um anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

Faça uma chamada `POST` ao `/{ad-account-id}/ads` com os campos `name`, `creative`, `status` e `adset`.

```
v24.0
```

#### Etapa 5: Verifique o anúncio no Gerenciador de Anúncios.

A campanha terá o nome que você definiu na criação e incluirá o conjunto de anúncios, o criativo e as unidades do anúncio.

[](#)

## Anúncios locais

#### Etapa 1: [Crie uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) com o `objective` definido como `OUTCOME_AWARENESS`.

```
v24.0
```

#### Etapa 2: [Crie um conjunto de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set) com o `optimization_goal` definido como `REACH`.

##### Requisitos

-   O `optimization_goal` deve ser `REACH`.
    
-   O `billing_event` deve ser `IMPRESSIONS`.
    
-   O `promoted_object` deve incluir o `page_id` da empresa que está sendo promovida.
    
-   As [`targeting_specs`](/docs/marketing-api/targeting-specs/#location) devem incluir todas as combinações de `geo_locations`, exceto de `countries`. As localizações do conjunto de anúncios devem ser do mesmo país.
    

Para fazer o direcionamento para pessoas que moram ou que estão em um raio de 10 milhas ao redor do endereço 1601 Willow Road Menlo Park CA, com exceção do código postal 94040:

```
v24.0
```

Com o direcionamento por `custom_locations`, é possível buscar um raio sugerido para alcançar um número suficiente de pessoas perto da sua empresa. Use `adradiussuggestion` da [API de Pesquisa de Direcionamento](/docs/marketing-api/targeting-search/#radius).

```
curl -G \ -d 'latitude=37.449478' \ -d 'longitude=-122.173016' \ -d 'distance_unit=kilometer' \ -d 'type=adradiussuggestion' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v2.11/search
```

A resposta:

```
{
  "data": [
    {
      "suggested_radius": 16,
      "distance_unit": "kilometer"
    }
  ]
}
```

Crie um post sem exibição na Página para seu anúncio. Consulte [Feed de Páginas](https://developers.facebook.com/docs/graph-api/reference/v24.0/page/feed) para criar posts da Página via API.

No momento, há compatibilidade com posts da Página vinculadas. Os posts de vídeo da Página somente estarão disponíveis se a chamada para ação `GET_DIRECTIONS` for usada. Só é possível usar posts da Página cuja identificação foi definida como "promoted\_object" no conjunto de anúncios.

A menos que você use a chamada para ação `LEARN_MORE`, `link` deverá corresponder o URL da Página do Facebook da sua empresa.

Como opção, é possível configurar uma das seguintes chamadas para ação:

##### Como chegar

Caso você use a chamada para ação `GET_DIRECTIONS`, também será necessário definir o `link` como as coordenadas da localização da loja.

```
"call_to_action": {
  "type": "GET_DIRECTIONS",
  "value": {
    "link": "fbgeo:<LATITUDE>,<LONGITUDE>,"<ADDRESS>""
  }
}
```

Depois do clique no botão de chamada para ação, a localização da sua loja será apresentada com um mapa e rotas.

##### Ligar agora

Se você usar a chamada para ação `CALL_NOW`, também será necessário definir o número de telefone que será usado.

Sempre use `Call Now` com uma das [opções de direcionamento móvel](/docs/marketing-api/audiences/reference/advanced-targeting#mobile) para garantir que o dispositivo possa fazer ligações.

```
"call_to_action": {
  "type":"CALL_NOW",
  "value": {
    "link": "tel:<TELEPHONE_NUMBER>"
  }
}
```

Ao clicar no botão de chamada para ação, o discador do dispositivo será aberto com o número já preenchido.

Para formatar um número de telefone:

-   O número deve começar com um sinal de adição (+) seguido do código do país: `+{COUNTRY_CODE}`.
    
-   O número não pode conter caracteres não numéricos (exceto o sinal de adição inicial).
    

A chamada para ação `Call Now` está sujeita às seguintes limitações:

-   O direcionamento por idade do seu conjunto de anúncios não pode incluir menores de 18 anos.
    
-   Se o direcionamento geográfico do conjunto de anúncios incluir mais de uma localização, todas elas devem ser do mesmo país.
    
-   Não são aceitos telefones com tarifa premium.
    
-   O número de telefone no anúncio deve ser do mesmo país que as localizações especificadas para o direcionamento do conjunto.
    

##### Enviar mensagem

Caso você defina a chamada para ação `MESSAGE_PAGE`, nenhum valor será necessário.

```
"call_to_action": {
  "type": "MESSAGE_PAGE"
}
```

O botão de chamada para ação abre o compositor do Messenger para que o usuário envie uma mensagem à Página. A mensagem inclui a foto e o título do anúncio como anexo.

Exemplo de criação de um post de link da Página:

```
v24.0
```

Exemplo de criação de um post de vídeo da Página:

```
v24.0
```

#### Etapa 3: [Crie o criativo do anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative) com a identificação do post da Página recuperada acima.

```
v24.0
```

O anúncio terá a seguinte aparência:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/851538_300383716835047_283528554_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=zx0PIEo6D4sQ7kNvwFb-nF1&_nc_oc=AdlVO8T0zl_xFkVM23JEE7E-vBvRTYPEMRJZAvV7-zTI2rJsWbJkoM1ZeVz6ybsaFGRZxShP2VmzIbchTpZM1DkE&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ixy2YuDdyxJFQN9i5DVWXA&oh=00_AftXIQbOZ_oUIAGY9zIwZ64ABWI31WE48NNBwWwEdUC0xg&oe=698535A3)

Neste exemplo, a chamada para ação é `GET_DIRECTIONS`. Ao clicar no botão, será apresentado um mapa com rotas para a empresa conforme indicado na Página do Facebook. Os cliques nas outras partes do anúncio levarão os clientes à Página do Facebook do anunciante.

Como alternativa, é possível combinar todas as etapas acima em uma só ao usar o campo `object_story_spec` no criativo do anúncio.

Exemplo de criativo do vídeo com `object_story_spec`:

```
v24.0
```

#### Etapa 4: [Crie um anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad).

```
v24.0
```

[](#)

## Saiba mais

-   [Campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group)
    
-   [Conjunto de anúncios](/docs/marketing-api/reference/ad-campaign)
    
-   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
    
-   [Anúncio](/docs/marketing-api/reference/adgroup)
    
-   [Especificações de direcionamento](/docs/marketing-api/audiences/reference/advanced-targeting#location)
    
-   [`object_story_spec`](/docs/marketing-api/reference/ad-creative-object-story-spec/)
    
-   [`link_data`](/docs/marketing-api/reference/ad-creative-link-data/)
    
-   [Sobre anúncios de evento no Facebook](https://www.facebook.com/business/help/1155511931224464)
    

[](#)