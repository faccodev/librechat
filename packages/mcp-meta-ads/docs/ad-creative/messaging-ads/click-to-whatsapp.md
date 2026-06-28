---
title: "Clique para o WhatsApp - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-whatsapp"
scraped_at: "2026-02-01T14:13:19.529Z"
---

# Anúncios de clique para o WhatsApp

Este guia explica como criar e publicar anúncios de clique para o WhatsApp usando a API de Marketing.

Os anúncios de clique para o WhatsApp direcionam as pessoas diretamente para conversas com sua empresa no WhatsApp. Esses anúncios podem ser usados para alcançar pessoas em grande escala e fornecer serviço individualizado e com destaque.

Os anúncios de clique para o WhatsApp são compatíveis com anúncios de imagem, vídeo, carrossel ou apresentação multimídia. Também é possível incluir um comando interativo para ligação telefônica nesses anúncios.

Se tiver interesse em criar anúncios que direcionem pessoas para conversas no Messenger ou no Instagram, consulte [Anúncios de clique para o Messenger](/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger) ou [Anúncios de clique para o Instagram](/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram). Também é possível criar anúncios para o destino no qual o usuário tem mais probabilidade de responder. Para mais informações, acesse [Anúncios de clique com vários destinos](/docs/marketing-api/ad-creative/messaging-ads/click-to-multidestination).

### Visão geral da criação de anúncio

Este documento descreve as etapas que você precisa seguir ao configurar sua integração de anúncios de clique para o WhatsApp.

Você precisará:

1.  [Criar uma campanha de anúncios](#step-1)
2.  [Criar um conjunto de anúncios que vincula os anúncios à campanha](#step-2)
3.  [Fornecer um criativo para o tipo de anúncio do WhatsApp a ser exibido](#step-3)
4.  [Criar um anúncio vinculando o criativo ao conjunto de anúncios](#step-4)
5.  [Publicar o anúncio no Facebook, Instagram e Messenger](#step-5)

## Antes de começar

Este guia considera que você já tem o seguinte:

-   [Uma conta de anúncios com a Meta](https://adsmanager.facebook.com/adsmanager/)
    
-   [Ativos carregados nos servidores da Meta (como imagens ou vídeos) para usar nos anúncios](/docs/messenger-platform/reference/attachment-upload-api)
    
-   [Uma Página do Facebook com um número de telefone do WhatsApp vinculado](https://www.facebook.com/business/help/1583303048513172?id=2129163877102343) manualmente ou [via API](/docs/graph-api/reference/page/page_whatsapp_number_verification/)
    

Para fazer chamadas aos pontos de extremidade deste guia, você precisará do seguinte:

-   Um token de acesso à Página solicitado por uma pessoa que pode executar a tarefa ADVERTISE na Página.
    
-   Estas permissões devem ser concedidas a uma pessoa que usa seu app:
    
    -   `ads_management`
        
    -   `pages_manage_ads`
        
    -   `pages_read_engagement`
        
    -   `pages_show_list`
        
    

[](#)

## Etapa 1: criar uma campanha de anúncios

O primeiro passo é criar a campanha de anúncios. Para isso, faça uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/campaigns`, em que `<AD_ACCOUNT_ID>` é a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
Nome da campanha de clique para o WhatsApp.

`objective`

enumeração

**Obrigatório.**  
Objetivo da campanha.  
Os objetivos compatíveis são `OUTCOME_ENGAGEMENT`, `OUTCOME_LEADS`, `OUTCOME_SALES` e `OUTCOME_TRAFFIC`.  
**Observação:** em campanhas com comando para ligação, `objective` deve ser `OUTCOME_ENGAGEMENT`.

`special_ad_categories`

lista<Object>

**Obrigatório.**  
Categorias de anúncios especiais associadas à campanha de clique para o WhatsApp. Consulte a [referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group) para saber mais.

`status`

enumeração

**Opcional.**  
Opções válidas: `PAUSED` e `ACTIVE`.  
Se o status for `PAUSED`, todos os respectivos conjuntos de anúncios e anúncios ativos serão pausados e terão status efetivo de `CAMPAIGN_PAUSED`.

#### Solicitação padrão

```
v24.0
```

#### Solicitação de campanha de chamada

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

Para verificar se você criou com sucesso uma campanha de clique para o WhatsApp, faça uma solicitação `GET` para `/<AD_CAMPAIGN_ID>`. Consulte a [referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group/#Reading) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "Click to WhatsApp Campaign",
  "status": "PAUSED",
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
Precisa ser definido como `IMPRESSIONS` em anúncios de clique para o WhatsApp. A Meta cobra quando seu anúncio é exibido para as pessoas.

`campaign_id`

string numérica ou número inteiro

**Obrigatório.**  
Uma campanha de clique para o WhatsApp válida à qual você quer adicionar o conjunto de anúncios.

`daily_budget`

int64

**Obrigatório** se `lifetime_budget` não for definido.  
O orçamento diário definido na moeda da sua conta. Permitido apenas em conjuntos de anúncios com duração (diferença entre `end_time` e `start_time`) superior a 24 horas.  
`daily_budget` ou `lifetime_budget` precisa ser maior que `0`.

`destination_type`

string

**Obrigatório.**  
Defina como `WHATSAPP` em anúncios de clique para o WhatsApp com um único destino.

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
O nome do conjunto de anúncios de clique para o WhatsApp.

`optimization_goal`

enumeração

**Obrigatório.**  
A meta para qual o conjunto de anúncios está sendo otimizado. Dependendo do objetivo da campanha, o conjunto de anúncios pode servir a diferentes metas de otimização.

-   `OUTCOME_ENGAGEMENT`: o objetivo Engajamento pode otimizar `CONVERSATIONS` e `LINK_CLICKS`.
    
-   `OUTCOME_SALES`: o objetivo Vendas pode otimizar `CONVERSATIONS`, `OFFSITE_CONVERSIONS`, `LINK_CLICKS`, `IMPRESSIONS` e `REACH`.
    
-   `OUTCOME_TRAFFIC`: o objetivo Tráfego pode otimizar `CONVERSATIONS`, `LANDING_PAGE_VIEWS`, `LINK_CLICKS`, `IMPRESSIONS`, `REACH` e `POST_ENGAGEMENT`.
    
-   `OUTCOME_LEADS`: o objetivo Leads pode otimizar `CONVERSATIONS`.
    

`promoted_object`

[AdPromotedObject](/docs/marketing-api/reference/ad-promoted-object/)

**Obrigatório.**  
O objeto que o conjunto promove em todos os anúncios. Para anúncios de clique para o WhatsApp, promoted\_object inclui as seguintes condições:

Obrigatório:

-   `page_id`: **Obrigatório.** A identificação da Página do Facebook.
    

Opcional:

-   `whatsapp_phone_number`: o número de telefone do WhatsApp associado ao conjunto de anúncios de clique para o WhatsApp.
    

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
A estrutura de direcionamento de um anúncio de clique para o WhatsApp. Consulte [Direcionamento básico](/docs/marketing-api/audiences/reference/basic-targeting) para saber mais.

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

```
{
  "id": "<AD_SET_ID>"
}
```

### Atualização

É possível atualizar um conjunto de anúncios fazendo uma solicitação `POST` para `/<AD_SET_ID>`.

### Leitura

Para verificar se você criou com sucesso um conjunto de anúncios de clique para o WhatsApp, faça uma solicitação `GET` para `/<AD_SET_ID>`. Consulte a [referência sobre conjunto de anúncios](/docs/marketing-api/reference/ad-campaign/) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "Click to WhatsApp Campaign",
  "status": "PAUSED",
  "objective": "OUTCOME_ENGAGEMENT",
  "id": "<AD_SET_ID>"
}
```

[](#)

## Etapa 3: gerar um criativo do anúncio

Com o criativo, é possível adicionar ativos aos seus anúncios. Para gerar um criativo do anúncio, faça uma solicitação `POST` para o ponto de extremidade `/act_<AD_ACCOUNT_ID>/adcreatives`, sendo `<AD_ACCOUNT_ID>` a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

### Parâmetros

Nome

Descrição

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

A mensagem padrão exibida ao cliente é "Olá! Posso acessar mais informações sobre isso?". Você pode criar experiências do usuário mais personalizadas em anúncios de clique para o WhatsApp ajustando a mensagem de saudação no campo `page_welcome_message` em `object_story_spec`.

**Observação:** se você estiver usando a mensagem do WhatsApp para disparar WhatsApp Flows, trabalhe com seu provedor de soluções empresariais e as agências ao atualizá-la para garantir que os fluxos não sejam interrompidos.

### Exemplos

#### Adição de uma mensagem de preenchimento automático com uma mensagem de saudação

```
"page_welcome_message": {
  "type": "VISUAL_EDITOR",
  "version": 2,
  "landing_screen_type": "welcome_message",
  "media_type": "text",
  "text_format": {
    "customer_action_type": "autofill_message",
    "message": {
      "autofill_message": {
        "content": "<AUTOFILL_MESSAGE>"
      },
      "text": "<GREETING_MESSAGE>"
    }
  }
}
```

#### Adição de uma mensagem de saudação automática com uma chamada para ação "Ligar agora"

```
"page_welcome_message": {
     "type": "VISUAL_EDITOR",
     "version": 2,
     "landing_screen_type": "welcome_message",
     "media_type": "text",
     "text_format": {
       "customer_action_type": "autofill_message",
       "message": {
         "text": "<AUTOMATED_GREETING_MESSAGE_TEXT>",
         "automated_greeting_message_cta": {
           "type": "call"
         },
         "autofill_message": {
           "content": "<AUTOFILL_MESSAGE_CONTENT>"
         }
       }
     }
 }
```

#### Adição de uma mensagem de saudação automática com uma chamada para ação "Ver site"

```
"page_welcome_message": {
      "type": "VISUAL_EDITOR",
      "version": 2,
      "landing_screen_type": "welcome_message",
      "media_type": "text",
      "text_format": {
        "customer_action_type": "autofill_message",
        "message": {
          "text": "<AUTOMATED_GREETING_MESSAGE_TEXT>",
          "automated_greeting_message_cta": {
            "type": "url",
            "url": "<WEBSITE_URL>"
          },
          "autofill_message": {
           "content": "<AUTOFILL_MESSAGE_CONTENT>"
          }
        }
      }
    }
```

#### Adição de uma mensagem de saudação automática com uma chamada para ação "Ver catálogo"

```
"page_welcome_message": {
  "type": "VISUAL_EDITOR",
  "version": 2,
  "landing_screen_type": "welcome_message",
  "media_type": "text",
  "text_format": {
    "customer_action_type": "autofill_message",
    "message": {
      "text": "<AUTOMATED_GREETING_MESSAGE_TEXT>",
      "automated_greeting_message_cta": {
        "type": "catalog"
      },
      "autofill_message": {
        "content": "<AUTOFILL_MESSAGE_CONTENT>"
      }
    }
  }
}
```

#### Adição de uma mensagem de saudação automática com uma chamada para ação "Fluxos"

Somente fluxos que se encaixem nos seguintes critérios podem ser usados para criar um criativo do anúncio:

-   WhatsApp Flows versão > 5.1
    
-   Sem erros de validação
    
-   Fluxo estático (ou seja, um fluxo sem troca de dados)
    
-   Tela única
    
-   Apenas componentes qualificados:
    
    -   Título do texto
        
    -   Subtítulo do texto
        
    -   Corpo do texto
        
    -   Legenda do texto
        
    -   Entrada de texto
        
    -   Área de texto
        
    -   Seletor de data
        
    -   Grupo de botões de opção
        
    -   Rodapé
        
    -   Grupo da caixa de seleção
        
    
-   Não mais de oito componentes na tela
    
-   Pelo menos um componente de entrada, como:
    
    -   Entrada de texto
        
    -   Área de texto
        
    -   Seletor de data
        
    -   Grupo de botões de opção
        
    -   Grupo da caixa de seleção
        
    

```
"page_welcome_message": {
  "type": "VISUAL_EDITOR",
  "version": 2,
  "landing_screen_type": "ctwa_flows",
  "media_type": "text",
  "text_format": {
    "customer_action_type": "whatsapp_flow",
    "message": {
      "text": "<AUTOMATED_GREETING_MESSAGE_TEXT>",
      "automated_greeting_message_cta": {
        "type": "flow",
        "flow_data":{
          "call_to_action":"Apply now",
          "flow_id":"<FLOW_ID>"
        }
      },
      "autofill_message": {
        "content": "<AUTOFILL_MESSAGE_CONTENT>"
      }
    }
  }
}
```

**Observação:** o `flow_id` passado acima deve pertencer à mesma conta do WhatsApp Business que a do número de telefone promovido no conjunto de anúncios. Ver mais sobre o [WhatsApp Flows](/docs/whatsapp/flows/gettingstarted/).

#### Adição de quebra-gelos com uma mensagem de saudação

```
"page_welcome_message": {
  "type": "VISUAL_EDITOR",
  "version": 2,
  "landing_screen_type": "welcome_message",
    "media_type": "text",
    "text_format": {
      "customer_action_type": "ice_breakers",
      "message": {
        "text": "<GREETING_MESSAGE>",
        "ice_breakers": [
          {
            "title": "<ICEBREAKER>"
          },
          {
            "title": "<ICEBREAKER>"
          },
          {
            "title": "<ICEBREAKER>"
          }
        ]
      }
    }
  }
}
```

#### Como adicionar mensagem com um comando interativo de ligação

```
v24.0
```

#### Resposta

```
{
  "id": "<AD_CREATIVE_ID>"
}
```

### Exemplos de como gerar um criativo do anúncio

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

### Anúncio que usa uma sequência de mensagens configurada em um app parceiro.

```
v24.0
```

Para saber mais sobre sequências de mensagens, consulte [Sequências de mensagem de boas-vindas](/docs/whatsapp/business-management-api/ads/welcome-message-sequences) na documentação da plataforma do WhatsApp Business.

### Como gerar criativos de anúncio usando conteúdo do Instagram

Você também pode usar o conteúdo existente do Instagram para gerar criativos.

```
v24.0
```

### Atualização

É possível atualizar um [criativo do anúncio](/docs/marketing-api/reference/ad-creative) fazendo uma solicitação `POST` para `/<AD_CREATIVE_ID>`.

### Leitura

Para verificar se você criou com sucesso um criativo do anúncio de clique para o WhatsApp, faça uma solicitação `GET` para `/<AD_CREATIVE_ID>`. Consulte [Criativo do anúncio](/docs/marketing-api/reference/ad-creative) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "name": "Sample ad creative",
  "object_story_spec" {
    "page_welcome_message": {
      "type": "VISUAL_EDITOR",
      "version": 2,
      "landing_screen_type": "welcome_message",
      "media_type": "text",
      "text_format": {
        "customer_action_type": "autofill_message",
        "message": {
          "autofill_message": {
            "content": "Sample autofill message"
          },
        "text": "Sample greeting message"
        }
      }
    }
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
O nome do anúncio.

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

```
{
  "id": "<AD_ID>"
}
```

### Atualização

É possível atualizar um [anúncio](/docs/marketing-api/reference/adgroup) fazendo uma solicitação `POST` para `/<AD_ID>`.

### Leitura

Para verificar se você criou com sucesso um anúncio de clique para o WhatsApp, faça uma solicitação `GET` para `/<AD_ID>`. Consulte a [referência sobre anúncio](/docs/marketing-api/reference/adgroup) para ver uma lista completa dos parâmetros disponíveis.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "status": "PAUSED",
  "adset_id": "<AD_SET_ID>",
  "campaign_id": "<AD_CAMPAIGN_ID>",
  "id": "<AD_ID>"
}
```

[](#)

## Etapa 5: publicar o anúncio

Confira se o anúncio aparece no Gerenciador de Anúncios. Quando estiver tudo pronto para publicar suas alterações, selecione a campanha, o conjunto de anúncios da campanha e o anúncio. Depois, clique no botão **Publicar**.

Também é possível publicar o anúncio via API. Para isso, basta enviar uma solicitação `POST` para `/<AD_ID>` com o parâmetro `status` definido como `ACTIVE`, sendo `<AD_ID>` o anúncio que você quer publicar.

O anúncio ficará com o status `PENDING_REVIEW` e será analisado pela Meta. Depois da aprovação, o status será automaticamente atualizado para `ACTIVE`, e o anúncio será veiculado.

[](#)