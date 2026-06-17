---
title: "Formulários - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lead-ads/create"
scraped_at: "2026-02-01T14:10:15.093Z"
---

# Formulários de lead para anúncios

Este documento descreve como criar anúncios para geração de leads pela API de Marketing usando a Graph API.

Siga estas etapas para criar e publicar um anúncio de lead:

1.  Crie uma campanha de anúncios.
2.  Crie um conjunto de anúncios vinculando os anúncios à campanha.
3.  Crie um formulário de lead.
4.  Forneça um criativo do anúncio com o formulário de lead.
5.  Associe a campanha ao criativo para gerar um anúncio.
6.  Publique o anúncio.

## Antes de começar

Este guia considera que você leu a [Visão geral da plataforma do Messenger](/docs/messenger-platform/overview) e implementou os componentes necessários para enviar e receber mensagens e notificações.

[](#)

Você precisará do seguinte:

-   A [permissão `ads_management`](/docs/permissions/reference/ads_management)
    
-   A [permissão `pages_manage_ads`](/docs/permissions/reference/pages_manage_ads)
    
-   A [permissão `pages_read_engagement`](/docs/permissions/reference/pages_read_engagement)
    
-   A [permissão `pages_show_list`](/docs/permissions/reference/pages_show_list)
    
-   O token de acesso à Página de uma pessoa que pode executar a tarefa [`ADVERTISE`](/docs/pages/overview#tasks) na Página
    

## Etapa 1. criar uma campanha

Para criar uma campanha de anúncios com fins de geração de leads, envie uma solicitação `POST` ao ponto de extremidade `/`**_`act_AD_ACCOUNT_ID`_**`/campaigns` com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `buying_type` definido como `AUCTION`
    
-   `name` definido como o nome da campanha
    
-   `objective` definido como `OUTCOME_LEADS`
    
-   `special_ad_categories` definido como `NONE` ou a [categoria de anúncio especial ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](/docs/marketing-api/reference/ad-account/campaigns/#parameters-2) 
    
-   `status` definido como `PAUSED`
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **AD\_ACCOUNT\_ID**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá um objeto JSON com a identificação da campanha. Essa identificação será usada quando você criar um conjunto de anúncios na próxima etapa.

```
{
  "id": "YOUR_CAMPAIGN_ID"
}
```

Consulte a [referência sobre campanhas de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign-group) para saber mais.

[](#)

## Etapa 2. criar um conjunto de anúncios

Para criar um conjunto de anúncios, envie uma solicitação `POST` ao ponto de extremidade `act__**ad_account_id**_/adsets`, sendo _**ad\_account\_id**_ a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token` definido como o token de acesso à Página
    
-   `bid_amount` definido como o valor máximo que você quer pagar
    
-   `billing_event` definido como `IMPRESSIONS`
    
-   `campaign_id` definido como a identificação da campanha de anúncios (da Etapa 1)
    
-   `daily_budget` definido como o valor que você quer gastar por dia
    
-   `name` definido como o nome do conjunto de anúncios
    
-   `optimization_goal` definida como `LEAD_GENERATION` ou `QUALITY_LEAD`
    
-   `destination_type` definido como `ON_AD`
    
-   `promoted_object` definido como a identificação da Página do Facebook da sua empresa
    
-   `status` definido como `PAUSED`
    

**Observação**: se você configurar uma fonte de dados CRM e escolher `QUALITY_LEAD` como meta de otimização, será possível adicionar o `pixel_id` ao `promoted_object` para aprimorar a otimização de qualidade. Observe que não é necessário fornecer uma `pixel_rule` com o `pixel_id`.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **AD\_ACCOUNT\_ID**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com a identificação do conjunto de anúncios.

```
{
  "id": "YOUR_ADSET_ID"
}
```

Consulte a [referência sobre conjuntos de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](/docs/marketing-api/reference/ad-sets) para saber mais.

[](#)

## Etapa 3. criar um formulário de lead

Para criar um formulário, envie uma solicitação `POST` ao ponto de extremidade `/`**_`PAGE_ID`_**`/leadgen_forms` com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `name` definido como o nome do formulário
    
-   `questions` definido como uma matriz de objetos com o tipo das perguntas e a ordem em que elas aparecerão no formulário usando o parâmetro `key`.
    
    -   `label` usado em uma pergunta personalizada
        
    -   `options` usado em uma pergunta personalizada com respostas exibidas em um menu suspenso
        
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

### Formulários para conversas do Messenger

Os formulários que você quer usar em um [anúncio em uma conversa do Messenger![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](/docs/messenger-platform/send-messages/templates/instant-form-template) devem conter o seguinte:

-   O parâmetro `questions.type` só pode ser definido como um dos seguintes valores:
    
    -   `CUSTOM`
        
    -   `EMAIL`
        
    
    -   `FIRST_NAME`
        
    -   `FULL_NAME`
        
    
    -   `LAST_NAME`
        
    -   `PHONE`
        
    
    Se tiver um `questions.type` que esteja definido para um valor diferente dos listados acima, o formulário não será elegível.
    
-   O parâmetro `block_display_for_non_targeted_viewer` deve ser definido como `false`. Isso marca o formulário como **Compartilhamento aberto**.
    

#### Exemplo de solicitação de formulário de lead no Messenger elegível

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

### Outros tipos de pergunta

Além das perguntas usuais mostradas na seção \[Criar um formulário de lead\]{#create-a-lead-form}, é possível adicionar tipos mais específicos para os seguintes casos de uso:

-   [Agendamento de horários](#appointment-scheduling) – Esse tipo de pergunta gera um seletor de data e hora com uma seleção de horário limitada e uma mensagem de confirmação abaixo da pergunta.
    
-   [Identificação nacional ou governamental](#national-id) – A pergunta de identificação nacional gera uma pergunta baseada no país de uma pessoa e valida o formato da identificação inserida.
    
-   [Localizador de lojas](#store-locator) – Uma pergunta de localizador de lojas gera um seletor de localizador de lojas com base na entrada de CEP ou código postal de uma pessoa.
    

#### Agendamento de horários

Esse tipo de pergunta gera um seletor de data e hora com uma seleção de horário limitada e uma mensagem de confirmação abaixo da pergunta.

Para adicionar uma pergunta de agendamento de horários, inclua um objeto de pergunta com o parâmetro `type` definido como `DATE_TIME`. Como alternativa, você pode adicionar uma mensagem de confirmação ao parâmetro `inline_context` que será renderizada diretamente abaixo do campo da pergunta para fornecer mais contexto, se necessário.

```
...
           "questions": "[
               ...
               {"type": "DATE_TIME", 
                "label": "Appointment time", 
                "inline_context": "We will verify and call you to confirm your appointment."
               },
...
```

#### Identificação nacional

A pergunta de identificação nacional gera uma pergunta baseada no país de uma pessoa e valida o formato da identificação inserida. Essa pergunta pode ser gerada para os seguintes países:

-   Argentina – {"type": "`ID_AR_DNI`"}
    
-   Brasil – `ID_CPF`
    
-   Chile – `ID_CL_RUT`
    
-   Colômbia – `ID_CO_CC`
    
-   Equador – `ID_EC_CI`
    
-   Peru – `ID_PE_DNI`
    

Para adicionar uma pergunta de identificação nacional, inclua um objeto de pergunta com o parâmetro `type` definido como o tipo de país da pessoa.

#### Limitações

-   Você pode pedir uma única identificação nacional em qualquer formulário e só pode direcionar pessoas nos seus respectivos países. Por exemplo, se você solicitar o documento de `DNI` no Peru, seu público-alvo precisará ser limitado ao Peru. Somente os anúncios que atendem a esses critérios são aprovados.
    
-   A validação verifica se o formato é válido, mas não confirma se o documento de identificação pertence a uma pessoa real.
    

```
...
           "questions": "[
               ...
               {"type": "ID_AR_DNI"
               },
...
```

#### Localizador de lojas

Uma pergunta de localizador de lojas gera um seletor de localizador de lojas com base na entrada de CEP ou código postal de uma pessoa.

Você precisará configurar uma estrutura de Páginas do estabelecimento para usar essa pergunta. Saiba como em [Configurar estrutura de Páginas do estabelecimento no Facebook – Central de Ajuda da Meta para Empresas ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](https://www.facebook.com/business/help/799893063819520) 

Para adicionar uma pergunta de localizador de lojas, inclua um objeto de pergunta com o parâmetro `type` definido como `STORE_LOOKUP` e `context_provider_type` como `LOCATION_MANAGER`.

```
...
           "questions": "[
               ...
               {"type": "STORE_LOOKUP", 
                "label": "Which store do you want to visit?", 
                "context_provider_type": "LOCATION_MANAGER"
               },
...
```

### Configurações avançadas de formulário

Obtenha leads com mais qualidade adicionando pelo menos uma destas configurações:

-   [Rastreamento de desempenho de formulário](#perf-tracking) para verificar a origem dos leads
    
-   [Formulários de maior intenção](#intent-setting) para incluir uma etapa de confirmação ao fluxo
    
-   [Filtragem de leads orgânicos](#filter-organic-leads) para filtrar leads orgânicos
    
-   [Conteúdo restrito](##gated-content) para recompensar os consumidores com o download de um arquivo depois de enviarem o lead
    

#### Adicionar rastreamento de desempenho

Para rastrear a origem dos leads, inclua no formulário o campo `tracking_parameters` definido como uma lista de pares chave-valor dos parâmetros a serem monitorados. Esses parâmetros não aparecem no anúncio, mas permitem que a Meta forneça a você metadados sobre os leads gerados pelo formulário.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
...
           "name": "YOUR_LEADADS_FORM_NAME",
           "tracking_parameters": {"your_tracking_parameter_name":"your_tracking_parameter_value"},
           "questions": "[
...
```

#### Adicionar configuração de maior intenção

Por padrão, os anúncios de lead são otimizados para volume. Porém, você pode criar formulários que resultem em leads com maior intenção. Eles podem ser voltados a pessoas interessadas em um produto/serviço específico, por exemplo, agendar um test drive em uma concessionária. Essa configuração adiciona ao fluxo de envio uma etapa para a pessoa analisar e confirmar as próprias respostas antes de enviar o formulário.

Para incluir o fluxo de confirmação, adicione o parâmetro `is_optimized_for_quality` definido como `true` ao criar o formulário.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
...
           "name": "YOUR_LEADADS_FORM_NAME",
           "is_optimized_for_quality": "true",
           "questions": "[
...
```

#### Filtrar leads orgânicos

Para filtrar leads orgânicos, adicione o parâmetro `block_display_for_non_targeted_viewer` definido como `true` ao criar o formulário.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
...
           "name": "YOUR_LEADADS_FORM_NAME",
           "block_display_for_non_targeted_viewer": "true",
           "questions": "[
...
```

#### Exemplo de resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação do formulário a ser usada ao criar o anúncio.

```
{
  "id": "leadgen_form_id",
}
```

#### Conteúdo restrito

Recompensa os consumidores com o download de um arquivo depois de enviarem o lead. O download do arquivo aparecerá como um botão de chamada para ação na página de agradecimento.

Para adicionar esse recurso, inclua o parâmetro `upload_gated_file` ao formulário com o arquivo a ser carregado.

Além disso, crie uma página de agradecimento usando o parâmetro `thank_you_page`. No parâmetro `thank_you_page`, defina `button_type` como `VIEW_ON_FACEBOOK`.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
...
      "name": "YOUR_LEADADS_FORM_NAME",
      "upload_gated_file": "YOUR_FILE",
      "thank_you_page": {
         "body": "Feel free to download our brochure here",
         "title": "Thanks, you're all set.",
         "button_type": "VIEW_ON_FACEBOOK",
         "button_text": "Download"
      }
    ...
```

#### Exemplo de resposta

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação do formulário a ser usada ao criar o anúncio.

```
{
  "id": "leadgen_form_id",
}
```

[](#)

## Etapa 4. fornecer o criativo do anúncio

Para fornecer um criativo do anúncio com uma imagem e o formulário, envie uma solicitação `POST` ao ponto de extremidade `/act_AD_ACCOUNT_ID/adcreatives` com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `object_story_spec` que inclua um objeto `link_data` com estes parâmetros:
    
    -   `call_to_action` definido como um objeto contendo `type` e `value` definido como a identificação do formulário de lead
        
    -   `description` definido como a descrição do criativo
        
    -   `image_hash` definido como hash da imagem
        
    -   `message` definido como o texto do criativo
        
    
-   `page_id` definido como a identificação da Página do Facebook
    

**Observação**: ao criar `link_data`, o valor associado ao campo `link` só pode ser `https//fb.me/`.

O parâmetro `link_data.call_to_action` precisa ser definido como um dos seguintes valores:

-   `APPLY_NOW`
    
-   `DOWNLOAD`
    
-   `GET_QUOTE`
    
-   `LEARN_MORE`
    
-   `SIGN_UP`
    
-   `SUBSCRIBE`
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **AD\_ACCOUNT\_ID**) pelos seus valores._
```
curl -X POST "https://graph.facebook.com/LATEST-API-VERSION/act_AD_ACCOUNT_ID/adcreatives" \
     -H "Content-Type: application/json" \
     -d '{
           "access_token":"YOUR_PAGE_ACCESS_TOKEN",
           "object_story_spec":{ 
             "link_data": { 
               "call_to_action": {
                 "type":"SIGN_UP",
                 "value":{
                   "lead_gen_form_id":"YOUR_FORM_ID"
                 }
               }, 
               "description": "YOUR_AD_CREATIVE_DESCRIPTION", 
               "image_hash": "YOUR_IMAGE_HASH", 
               "link": "http:\/\/fb.me\/", 
               "message": "YOUR_AD_CREATIVE_MESSAGE" 
             }, 
           "page_id": "YOUR_PAGE_ID" 
         }'
```

### Com carrossel

É possível criar um anúncio de lead em [carrossel](/docs/marketing-api/guides/carousel-ads) com as mesmas `object_story_spec`, mas com um campo `lead_gen_form_id` adicional definido no parâmetro `child_attachments`.

Só é possível especificar o mesmo `<FORM_ID>` para todos os anexos derivados.

```
curl \
  -F 'object_story_spec={ 
    "page_id": "<PAGE_ID>", 
    "link_data": { 
      "message": "My description", 
      "link": "http:\/\/www.google.com", 
      "caption": "WWW.EXAMPLE.COM", 
      "child_attachments": [ 
        { 
          "link": "http:\/\/www.google.com", 
          "image_hash": "<IMAGE_HASH>", 
          "call_to_action": {"type":"SIGN_UP","value":{"lead_gen_form_id":"<FORM_ID>"}} 
        }, 
        { 
          "link": "http:\/\/www.google.com", 
          "image_hash": "<IMAGE_HASH>", 
          "call_to_action": {"type":"SIGN_UP","value":{"lead_gen_form_id":"<FORM_ID>"}} 
        }, 
        { 
          "link": "http:\/\/www.google.com", 
          "image_hash": "<IMAGE_HASH>", 
          "call_to_action": {"type":"SIGN_UP","value":{"lead_gen_form_id":"<FORM_ID>"}} 
        }, 
        { 
          "link": "http:\/\/www.google.com", 
          "image_hash": "<IMAGE_HASH>", 
          "call_to_action": {"type":"SIGN_UP","value":{"lead_gen_form_id":"<FORM_ID>"}} 
        } 
      ], 
      "multi_share_optimized": true, 
      "call_to_action": {"type":"SIGN_UP","value":{"lead_gen_form_id":"<FORM_ID>"}} 
    } 
  }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/LATEST-API-VERSION/act_<AD_ACCOUNT_ID>/adcreatives
```

### Com vídeo

Também é possível usar um vídeo no criativo do anúncio de lead em vez de uma foto. Primeiro, carregue o vídeo na sua [biblioteca de vídeos de anúncio](/docs/marketing-api/advideo). Depois, use-o no parâmetro `object_story_spec`:

```
v24.0
```

### Exemplo de resposta de criativo do anúncio

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com o ID do criativo do anúncio.

```
{
  "id": "YOUR_AD_CREATIVE_ID"
}
```

[](#)

## Etapa 5. criar o anúncio

Para criar o anúncio, você precisa associar o criativo ao conjunto de anúncios. Para isso, envie uma solicitação `POST` ao ponto de extremidade `/act_AD_ACCOUNT_ID/ads`. A solicitação precisa incluir:

-   `access_token` definido como o token de acesso à Página
    
-   `adset_id` (da Etapa 2)
    
-   `creative_id` (da Etapa 4)
    
-   nome
    
-   status
    

#### Exemplo de solicitação de anúncio com criativo

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **AD\_ACCOUNT\_ID**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com a identificação do anúncio.

```
{
  "id": "YOUR_AD_ID"
}
```

[](#)

## Etapa 6. Publicar o anúncio

Verifique se o anúncio existe no [Gerenciador de Anúncios![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](https://adsmanager.facebook.com/). Clique no botão **Conferir e publicar** no canto superior direito. Selecione a campanha, o conjunto de anúncios e o anúncio.

É possível publicar o anúncio pelo Gerenciador de Anúncios ou pela API. Para publicar pela API, repita a [Etapa 4](#ad-creative) com o parâmetro `status` definido como `ACTIVE`.

O anúncio ficará com o status `PENDING_REVIEW` e será analisado pela Meta. Depois da aprovação, ele terá o status `ACTIVE` e será veiculado.

[](#)

## Gerenciamento de formulários

Obtenha uma lista dos seus formulários ou de perguntas específicas e arquive formulários antigos.

### Obter uma lista de formulários

Para obter uma lista de formulários de geração de leads, envie uma solicitação `GET` para o ponto de extremidade `/`**_`page_id`_**`/leadgen_forms` com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `fields` (opcional) definido como uma lista de campos, separados por vírgulas, para obter informações específicas, como nome e identificação do formulário
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

Em caso de sucesso, o app receberá uma resposta JSON com a lista dos seus formulários. Você pode usar uma identificação de formulário para obter as perguntas incluídas nele ou para arquivá-lo.

### Obter lista de formulários elegíveis para uso no Messenger

Somente formulários que tenham [requisitos específicos](#msgr-form-ads-reqs) podem ser [enviados em uma conversa do Messenger. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=K6TlvzdLuLuhehr8FfO4Nw&oh=00_AfuDo_5fiqKdHblWN2PBgYatwxXSmu70QMulBE4sesbNyw&oe=69999BA2)](/docs/messenger-platform/send-messages/templates/instant-form-template) 

Para obter uma lista de formulários de geração de leads elegíveis, envie uma solicitação `GET` para o ponto de extremidade `/`**_`page_id`_**`/leadgen_forms` com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `fields` definido como `is_eligible_for_in_thread_forms`
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

Em caso de sucesso, o app receberá uma resposta JSON com a lista de identificação dos formulários elegíveis.

```
{
  "data": [
    {
      "id": "eligible_form_1_id"
    },
    {
      "id": "eligible_form_2_id"
    }
  ],
...
}
```

### Obter lista de perguntas

Para obter uma lista de perguntas de um formulário de geração de leads específico, envie uma solicitação `GET` para o ponto de extremidade `/`**_`page_id`_**`/`**_`leadgen_form_id`_** com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `fields` definido como `questions`
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

Em caso de sucesso, o app receberá uma resposta JSON com a lista das perguntas.

### Arquivar formulários

Você só pode arquivar um formulário de lead, já que não há suporte para a exclusão dele. Quando um formulário for arquivado, acontecerá o seguinte:

-   Ele não será exibido (por padrão) na biblioteca de formulários
    
-   Você não pode usar um formulário arquivado em um anúncio. Tentar fazer isso poderá gerar um erro na API.
    
-   Os formulários arquivados não estarão disponíveis durante a criação de anúncios para CF ou PE.
    

Para arquivar um formulário de geração de leads específico, envie uma solicitação `POST` para o ponto de extremidade `/`**_`page_id`_**`/`**_`leadgen_form_id`_** com os seguintes parâmetros:

-   `access_token` definido como o token de acesso à Página
    
-   `status` definido como `ARCHIVED`
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **_valores em negrito e itálico_** pelos seus valores._
```
v24.0
```

Em caso de sucesso, o app receberá uma resposta JSON incluindo um objeto com `success` definido como `true`.

Para reativar um formulário arquivado, envie uma solicitação com o `status` definido como `ACTIVE`.

[](#)

## Veja também

Acesse nossos outros guias para saber mais sobre os componentes deste documento.

#### Documentação para desenvolvedores sobre a API de Marketing

-   [Dialogs — SDK do Facebook para JavaScript](/docs/javascript/reference/FB.ui)
    
-   [Page Leadgen Forms](/docs/graph-api/reference/page/leadgen_forms/)
    
-   [Especificações de rastreamento e de conversão: Especificações personalizadas de rastreamento](/docs/marketing-api/tracking-specs#custom)
    

#### Central de Ajuda da Meta para Empresas

-   [Sobre os leads orgânicos](https://www.facebook.com/business/help/1131888990173231)
    
-   [Sobre os leads orgânicos](https://www.facebook.com/business/help/1581395052150760)
    
-   [Sobre os tipos de formulários instantâneos](https://www.facebook.com/business/help/252352181957512)
    
-   [Sobre os anúncios de lead](https://www.facebook.com/business/help/237121917036106)
    

[](#)