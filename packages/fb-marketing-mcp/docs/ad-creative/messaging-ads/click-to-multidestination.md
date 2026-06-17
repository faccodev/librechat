---
title: "Vários destinos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-multidestination"
scraped_at: "2026-02-01T14:13:24.696Z"
---

# Anúncios de clique com vários destinos

Este guia explica como criar e publicar anúncios de clique com vários destinos usando a API de Marketing.

Os anúncios de clique com vários destinos enviam as pessoas que clicam neles diretamente para conversas com sua empresa no app ou nos apps (Messenger, Instagram ou WhatsApp) que elas preferirem. Esses anúncios podem ser usados para alcançar pessoas em grande escala e fornecer serviço individualizado e com destaque.

Os anúncios com vários destinos podem levar uma pessoa a qualquer combinação destes destinos: bate-papo do Messenger, bate-papo do Instagram e bate-papo do WhatsApp.

Se você quiser criar um anúncio que direcione para um único destino, consulte os artigos a seguir:

-   [Anúncios de clique para o Messenger](/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger)
    
-   [Anúncios de clique para o Instagram](/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram)
    
-   [Anúncios de clique para o WhatsApp](/docs/marketing-api/ad-creative/messaging-ads/click-to-whatsapp)
    

### Visão geral da criação de anúncio

Este documento descreve as etapas que você precisa seguir ao configurar sua integração de anúncios de clique com vários destinos. Você precisará:

1.  [Criar uma campanha de anúncios](#step-1)
2.  [Criar um conjunto de anúncios que vincula os anúncios à campanha](#step-2)
3.  [Fornecer um criativo para o tipo de anúncio com vários destinos que será exibido](#step-3)
4.  [Criar um anúncio vinculando o criativo ao conjunto de anúncios](#step-4)

## Antes de começar

Este guia considera que você já tem o seguinte:

-   [Uma conta de anúncios com a Meta](https://adsmanager.facebook.com/adsmanager/)
    
-   [Ativos carregados nos servidores da Meta (como imagens ou vídeos) para usar nos anúncios](/docs/messenger-platform/reference/attachment-upload-api)
    

[](#)

## Etapa 1: criar uma campanha de anúncios

O primeiro passo é criar a campanha de anúncios. Para isso, faça uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/campaigns`, em que `<AD_ACCOUNT_ID>` é a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
Nome da campanha de clique com vários destinos.

`objective`

enumeração

**Obrigatório.**  
Objetivo da campanha.  
Objetivos compatíveis: `OUTCOME_ENGAGEMENT`, `OUTCOME_SALES` e `OUTCOME_TRAFFIC`.

`special_ad_categories`

lista<Object>

**Obrigatório.**  
Categorias de anúncios especiais associadas à campanha de clique com vários destinos. No momento, os anúncios de clique com vários destinos não são compatíveis com categorias especiais. Por isso, é necessário definir este campo como `NONE` ou usar uma matriz vazia. Consulte a [referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group) para saber mais.

`status`

enumeração

**Opcional.**  
Opções válidas: `PAUSED` e `ACTIVE`.  
Se o status for `PAUSED`, todos os respectivos conjuntos de anúncios e anúncios ativos serão pausados e terão status efetivo de `CAMPAIGN_PAUSED`.

#### Solicitação

```
v24.0
```

#### Resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação da campanha recém-criada.

```
{
  "id": "<AD_CAMPAIGN_ID>"
}
```

### Atualização

É possível atualizar uma campanha fazendo uma solicitação `POST` para `/<AD_CAMPAIGN_ID>`.

### Leitura

Para verificar se você criou com sucesso uma campanha de clique com vários destinos, faça uma solicitação `GET` para `/<AD_CAMPAIGN_ID>`. Consulte a [referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group/#Reading) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "Click to Multi Destination Campaign",
  "status": "ACTIVE",
  "objective": "OUTCOME_ENGAGEMENT",
  "id": "<AD_CAMPAIGN_ID>"
}
```

[](#)

## Etapa 2: criar um conjunto de anúncios

Quando você já tiver uma campanha, crie um conjunto de anúncios. Para isso, faça uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/adsets`, sendo `<AD_ACCOUNT_ID>` a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

`bid_amount`

unsigned int32

**Obrigatório** se bid\_strategy for definido como `LOWEST_COST_WITH_BID_CAP` ou `COST_CAP`.  
O valor máximo que você deseja pagar por um resultado com base na sua `optimization_goal`.

`bid_strategy`

enumeração

**Opcional.**  
A estratégia de lance da campanha para atender às suas metas de negócios. Consulte a [referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group) para saber mais.  
**Valores:**`LOWEST_COST_WITHOUT_CAP`, `LOWEST_COST_WITH_BID_CAP`, `COST_CAP`

`billing_event`

enumeração

**Obrigatório.**  
Precisa ser definido como `IMPRESSIONS` em anúncios de clique com vários destinos. A Meta cobra quando seu anúncio é exibido para as pessoas.

`campaign_id`

string numérica ou número inteiro

**Obrigatório.**  
Uma campanha de clique com vários destinos válida à qual você quer adicionar o conjunto de anúncios.

`daily_budget`

int64

**Obrigatório** se `lifetime_budget` não for definido.  
O orçamento diário definido na moeda da sua conta. Permitido apenas em conjuntos de anúncios com duração (diferença entre `end_time` e `start_time`) superior a 24 horas.  
`daily_budget` ou `lifetime_budget` precisa ser maior que `0`.

`destination_type`

string

**Obrigatório.**

  

-   Defina como `MESSAGING_INSTAGRAM_DIRECT_MESSENGER_WHATSAPP` se quiser usar os três destinos (Messenger, WhatsApp e Instagram).
    
-   Defina como `MESSAGING_INSTAGRAM_DIRECT_MESSENGER` se quiser usar o Messenger e o Instagram.
    
-   Defina como `MESSAGING_MESSENGER_WHATSAPP` se quiser usar o Messenger e o WhatsApp.
    
-   Defina como `MESSAGING_INSTAGRAM_DIRECT_WHATSAPP` se quiser usar o WhatsApp e o Instagram.
    

**Observação**: se você incluir o WhatsApp como destino, verifique se há um número de telefone comercial do WhatsApp conectado à sua página. Caso inclua o Instagram como destino, será preciso ter uma conta comercial do Instagram conectada à sua página.

`end_time`

datetime

**Obrigatório** quando `lifetime_budget` é especificado.  
Ao criar um conjunto de anúncios com um `daily_budget`, especifique `end_time=0` ou deixe esse campo vazio para definir que o conjunto está em andamento e não tem data de término.  
**Exemplo:**`2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`. Registro de data e hora UNIX (UTC).

`lifetime_budget`

int64

**Obrigatório** se `daily_budget` não for definido.  
O orçamento total do conjunto de anúncios definido na moeda da sua conta. Se for especificado, será preciso definir também um `end_time`.  
`daily_budget` ou `lifetime_budget` precisa ser maior que `0`.

`name`

string

**Obrigatório.**  
O nome do conjunto de anúncios de clique com vários destinos.

`optimization_goal`

enumeração

**Obrigatório.**  
A meta para qual o conjunto de anúncios está sendo otimizado. Precisa ser definido como `CONVERSATIONS` em anúncios de clique com vários destinos. Dependendo do objetivo da campanha, o conjunto de anúncios pode servir a diferentes metas de otimização.

`promoted_object`

[AdPromotedObject](/docs/marketing-api/reference/ad-promoted-object/)

**Obrigatório.**  
O objeto que o conjunto promove em todos os anúncios. Em anúncios de clique com vários destinos, `promoted_object` inclui as seguintes condições:

-   `page_id`: **Obrigatório.** A identificação da Página do Facebook.
    

Consulte [Ad Set, Promoted Object](/docs/marketing-api/reference/ad-promoted-object/) para saber mais.

`start_time`

datetime

**Opcional.**  
A hora de início do conjunto de anúncios. Se nenhum valor for fornecido, este campo será padronizado como a hora atual.  
**Exemplo:**`2015-03-12 23:59:59-07:00` ou `2015-03-12 23:59:59 PDT`. Registro de data e hora UNIX (UTC).

`status`

enumeração

**Opcional.**  
O status do conjunto de anúncios. Pode ser diferente do status efetivo devido à campanha principal. Se nenhum valor for fornecido, este campo será definido como `ACTIVE` por padrão.  
**Valores:**`ACTIVE`, `PAUSED`, `DELETED`, `ARCHIVED`

`targeting`

Objeto de direcionamento

**Obrigatório.**  
A estrutura de direcionamento de um anúncio de clique para o Instagram. Consulte [Direcionamento básico](/docs/marketing-api/audiences/reference/basic-targeting) para saber mais.

`time_start`

datetime

**Opcional.**  
Intercambiável com `start_time`.

`time_stop`

datetime

**Obrigatório** quando `lifetime_budget` é especificado.  
Intercambiável com `end_time`.

Consulte o artigo [Ad Account Adsets](/docs/marketing-api/reference/ad-account/adsets/) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação do conjunto de anúncios recém-criado.

```
{
  "id": "<AD_SET_ID>"
}
```

### Atualização

É possível atualizar um conjunto de anúncios fazendo uma solicitação `POST` para `/<AD_SET_ID>`.

### Leitura

Para verificar se você criou com sucesso um conjunto de anúncios de clique com vários destinos, faça uma solicitação `GET` para `/<AD_SET_ID>`. Consulte a [referência sobre conjunto de anúncios](/docs/marketing-api/reference/ad-campaign/) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "<AD_SET_NAME>",
  "destination_type": "<DESTINATION_TYPE>",
  "optimization_goal": "CONVERSATIONS",
  "bid_strategy": "LOWEST_COST_WITHOUT_CAP'"
  "id": "<AD_SET_ID>"
}
```

[](#)

## Etapa 3: gerar um criativo do anúncio

Com o criativo, é possível adicionar ativos aos seus anúncios. Para gerar um criativo do anúncio, faça uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/adcreatives`, sendo `<AD_ACCOUNT_ID>` a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

`asset_feed_spec`

**Obrigatório.**  
Especifique os destinos dos anúncios de clique com vários destinos.

Obrigatório:

-   `optimization_type`: precisa ser definido como `DOF_MESSAGING_DESTINATION` em anúncios de clique com vários destinos.
    
-   `call_to_actions`: matriz dos destinos selecionados em anúncios de clique com vários destinos. Precisa corresponder ao `destination_type` especificado no conjunto de anúncios.
    

**Messenger**

```
{
  "type": "MESSAGE_PAGE",
    "value": {
       "app_destination": "MESSENGER",
       "link": "https://fb.com/messenger_doc/"
    }
}
```

**WhatsApp**

```
{
  "type": "WHATSAPP_MESSAGE",
    "value": {
       "app_destination": "WHATSAPP",
       "link": "https://api.whatsapp.com/send"
    }
}
```

**Instagram**

```
{
  "type": "INSTAGRAM_MESSAGE",
    "value": {
       "app_destination": "INSTAGRAM_DIRECT",
       "link": "https://www.instagram.com"
    }
}
```

`name`

string

**Obrigatório.**  
O nome do criativo do anúncio.

`object_story_spec`

[AdCreativeObjectStorySpec](/docs/marketing-api/reference/ad-creative-object-story-spec/)

**Obrigatório.**  
Um objeto que contém informações sobre a mensagem. Consulte [Ad Creative Object Story Spec](/docs/marketing-api/reference/ad-creative-object-story-spec/) para saber mais.

  

Obrigatório:

-   `page_id`: a identificação da Página do Facebook.
    
-   `instagram_user_id`: a identificação da conta do Instagram. Há três formas de [obter a identificação de uma conta do Instagram](/docs/marketing-api/guides/instagramads/get-started): conta do Instagram de propriedade do Gerenciador de Negócios, conta do Instagram conectada à Página e conta do Instagram associada à Página.
    

Opcional:

-   `link_data`: a especificação para um post da Página com link ou um [anúncio em carrossel](/docs/marketing-api/guides/carousel-ads/).
    
-   `photo_data`: a especificação para um post da Página com foto.
    
-   `text_data`: a especificação para um post da Página com texto.
    
-   `video_data`: a especificação para um post da Página com vídeo.
    

`degrees_of_freedom_spec`

**Opcional.**  
Consulte [Aprimoramentos padrão no criativo Advantage+](/docs/marketing-api/advantage-catalog-ads/standard-enhancements/) para saber mais.

Acesse a [referência sobre criativo do anúncio](/docs/marketing-api/reference/ad-creative) para ver uma lista completa dos parâmetros disponíveis.

### Como preencher a mensagem de boas-vindas da Página

A mensagem padrão exibida ao cliente é "Olá! Posso obter mais informações sobre isso?". Você pode criar experiências do usuário mais personalizadas em anúncios de clique com vários destinos ajustando a mensagem de saudação, os quebra-gelos e as mensagens de preenchimento automático dos seus anúncios no campo `page_welcome_message` em `object_story_spec`.

Para mais informações sobre quebra-gelos, veja a [`ice_breakers`referência](/docs/messenger-platform/reference/messenger-profile-api/ice-breakers).

#### Limitações

-   Os títulos de quebra-gelos não devem ter mais de 80 caracteres.
    
-   As respostas de quebra-gelos não devem ter mais de 300 caracteres.
    
-   O texto da mensagem não pode ter mais de 300 caracteres.
    

#### Exemplo

Crie o objeto `page_welcome_message` para adicionar quebra-gelos com uma mensagem de saudação.

```
"page_welcome_message": {
  "type":"VISUAL_EDITOR",
  "version":2,
  "landing_screen_type":"welcome_message",
  "media_type":"text",
  "text_format":{
    "customer_action_type":"ice_breakers",
    "message":{
      "ice_breakers":[
        {"title":"Can I make a purchase?","response":"This is a response 1"},
        {"title":"Can I see a menu?", "response":"This is a response 2"},
        {"title":"Where are you located?", "response":"This is a response 3"}],
      "quick_replies":[],
      "text":"Hi {{user_first_name}}! Please let us know how we can help you."}
  },
  "user_edit":false,
  "surface":"visual_editor_new"
}
```

### Exemplos de como gerar um criativo do anúncio

Adicione o campo `page_welcome_message` ao criativo da seguinte forma.

#### Solicitação

```
v24.0
```

#### Resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação do criativo do anúncio recém-gerado.

```
{
  "id": "<AD_CREATIVE_ID>"
}
```

### Como gerar criativos de anúncio usando conteúdo do Instagram

#### Posts do Instagram

Consulte [Usar posts como anúncios do Instagram](/docs/instagram/ads-api/guides/use-posts-as-ads/) para saber mais.

```
v24.0
```

#### Imagens do Instagram

```
v24.0
```

### Como gerar criativos do anúncio usando conteúdo do Facebook

Consulte [Usar posts como anúncios do Instagram: posts do Facebook](/docs/instagram/ads-api/guides/use-posts-as-ads/#facebook-posts) para saber mais.

```
v24.0
```

`object_story_id` é a identificação do post no formato `postOwnerID_postID`, e `instagram_user_id` é uma identificação da conta do Instagram conectada à Página ou a identificação da conta do Instagram associada à Página. Veja mais detalhes em [Set Up Instagram Accounts With Pages](/docs/instagram/ads-api/guides/pages-ig-account).

### Atualização

É possível atualizar um [criativo do anúncio](/docs/marketing-api/reference/ad-creative) fazendo uma solicitação `POST` para `/<AD_CREATIVE_ID>`.

### Leitura

Para verificar se você criou com sucesso um criativo do anúncio de clique com vários destinos, faça uma solicitação `GET` para `/<AD_CREATIVE_ID>`. Consulte [Criativo do anúncio](/docs/marketing-api/reference/ad-creative) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "<CREATIVE_NAME>",
  "object_story_spec": {
    "page_welcome_message": {
      "type": "VISUAL_EDITOR",
      "version": 2,
      "landing_screen_type": "welcome_message",
      "media_type": "text",
      "text_format": {
        "customer_action_type": "ice_breakers",
        "message": {
          "text": "Sample greeting message",
          "ice_breakers": [
            {
              "title": "Sample icebreaker"
            },
            {
              "title": "Sample icebreaker"
            },
            {
              "title": "Sample icebreaker"
            }
          ]
        }
      }
    }
  },
  "asset_feed_spec": {
    "optimization_type": "DOF_MESSAGING_DESTINATION",
    "call_to_actions": [
      {
        "type": "MESSAGE_PAGE",
        "value": {
          "app_destination": "MESSENGER",
          "link": "https://fb.com/messenger_doc/"
        }
      },
      {
        "type": "WHATSAPP_MESSAGE",
        "value": {
          "app_destination": "WHATSAPP",
          "link": "https://api.whatsapp.com/send"
        }
      },
      {
        "type": "INSTAGRAM_MESSAGE",
        "value": {
          "app_destination": "INSTAGRAM_DIRECT",
          "link": "https://www.instagram.com"
        }
      }
    ]
  },
  "id": "<AD_CREATIVE_ID>"
}
```

[](#)

## Etapa 4: criar um anúncio

Os anúncios permitem que você associe informações do criativo aos seus conjuntos de anúncios. Para criar um anúncio, envie uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/ads`, sendo `<AD_ACCOUNT_ID>` a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
O nome do criativo do anúncio.

`adset_id`

string numérica ou número inteiro

**Obrigatório.**  
A identificação do conjunto de anúncios.

`creative`

[AdCreative](/docs/marketing-api/reference/ad-creative/)

**Obrigatório.**  
O criativo que deve ser usado pelo anúncio. Você pode fornecer o `creative_id` de um criativo existente ou gerar um novo incluindo todos os campos obrigatórios. Consulte [Ad Creative](/docs/marketing-api/reference/ad-creative/) para saber mais.

`status`

enumeração

**Obrigatório.**  
O status do anúncio.  
**Valores:**`ACTIVE`, `PAUSED`, `DELETED`, `ARCHIVED`

#### Solicitação

```
v24.0
```

#### Resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação do anúncio recém-criado.

```
{
  "id": "<AD_ID>"
}
```

### Chamada para ação

Também é possível definir uma chamada para ação ao criar um anúncio.

```
"asset_feed_spec": {
  "optimization_type": "DOF_MESSAGING_DESTINATION",
  "call_to_actions": [
    {
      "type": "MESSAGE_PAGE",
      "value": {
        "app_destination": "MESSENGER",
        "link": "https://fb.com/messenger_doc/"
      }
    },
    {
      "type": "INSTAGRAM_MESSAGE",
      "value": {
        "app_destination": "INSTAGRAM_DIRECT",
        "link": "https://www.instagram.com"
      }
    }
  ]
}
```

Consulte [Especificação do feed de ativos](/docs/marketing-api/ad-creative/asset-feed-spec) para ver mais informações.

### Atualização

É possível atualizar um [anúncio](/docs/marketing-api/reference/adgroup) fazendo uma solicitação `POST` para `/<AD_ID>`.

### Leitura

Para verificar se você criou com sucesso um anúncio de clique com vários destinos, faça uma solicitação `GET` para `/<AD_ID>`. Consulte a [referência sobre anúncio](/docs/marketing-api/reference/adgroup) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "status": "ACTIVE",
  "adset_id": "<AD_SET_ID>",
  "id": "<AD_ID>"
}
```

[](#)