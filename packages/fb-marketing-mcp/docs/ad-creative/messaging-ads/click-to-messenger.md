---
title: "Clique para o Messenger - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger"
scraped_at: "2026-02-01T14:13:12.156Z"
---

# Anúncios de clique para o Messenger

Este guia explica como criar e publicar anúncios de clique para o Messenger usando a API de Marketing.

Se você tem interesse em usar o Gerenciador de Anúncios para criar uma campanha de anúncios de lead, acesse a [Central de Ajuda da Meta para Empresas](https://www.facebook.com/business/help/2398917563501477).

Os anúncios de clique para o Messenger direcionam as pessoas que clicam neles diretamente para conversas com sua empresa no Messenger. Esses anúncios podem ser usados para alcançar pessoas em grande escala, bem como fornecer serviço individualizado e com destaque.

Os anúncios de clique para o Messenger são compatíveis com anúncios de imagem, vídeo, carrossel ou apresentação multimídia. Também é possível incluir um comando para ligação telefônica nesses anúncios.

Se tiver interesse em criar anúncios que direcionem as pessoas para conversas no Instagram ou WhatsApp, consulte [Anúncios de clique para o Instagram](/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram) e [Anúncios de clique para o WhatsApp](/docs/marketing-api/ad-creative/messaging-ads/click-to-whatsapp). Também é possível criar anúncios para o destino no qual o usuário tem mais probabilidade de responder. Para mais informações, acesse [Anúncios de clique com vários destinos](/docs/marketing-api/ad-creative/messaging-ads/click-to-multidestination).

### Visão geral da criação de anúncio

Para criar e publicar um anúncio:

1.  [Crie uma campanha de anúncios](#campaign).
2.  [Crie um conjunto de anúncios vinculando os anúncios à campanha](#adset)
3.  [Forneça um criativo para o tipo de anúncio do Messenger a ser exibido](#ad-creative)
4.  [Crie um anúncio vinculando o criativo ao conjunto de anúncios](#ad)
5.  [Publique o anúncio no Facebook, Instagram e Messenger](#publish-ad)

## Antes de começar

Este guia considera que você já tem o seguinte:

-   [Uma conta de anúncios da Meta ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://adsmanager.facebook.com/adsmanager/) 
    
-   [A plataforma do Messenger integrada ao seu app ou site ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/messenger-platform) 
    
-   [Ativos carregados (como imagens ou vídeos) nos servidores da Meta para usar nos anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/messenger-platform/reference/attachment-upload-api) 
    

Para fazer chamadas aos pontos de extremidade deste guia, você precisará do seguinte:

-   Um token de acesso à Página solicitado por uma pessoa que pode executar a tarefa `ADVERTIZE` na Página.
    
-   Estas permissões devem ser concedidas pelo usuário do seu app:
    
    -   `ads_management`
        
    -   `pages_manage_ads`
        
    -   `pages_read_engagement`
        
    -   `pages_show_list`
        
    

[](#)

## Etapa 1. criar uma campanha

Para criar uma campanha de anúncios, envie uma solicitação `POST` ao ponto de extremidade `act_**_ad_account_id_**/campaigns`, sendo **_ad\_account\_id_** a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `buying_type`
    
-   `name`
    

-   `objective` definido como `OUTCOME_TRAFFIC` ou `OUTCOME_LEADS` para anúncios de lead
    
-   `special_ad_categories`
    
-   `status`
    

#### Referência rápida sobre campanha de anúncios

Parâmetro

Valor

`access_token`

O token de acesso à Página.

`buying_type`

Definido como `AUCTION` (padrão) em anúncios do Messenger para leads

`name`

_string_

O nome da campanha de anúncios.

`objective`

_enumeração_

Objetivos da campanha.  
`OUTCOME_TRAFFIC` para CTS.  
`OUTCOME_LEADS` para anúncios do Messenger para leads.  
`OUTCOME_ENGAGEMENT`, `OUTCOME_SALES` e `OUTCOME_TRAFFIC` para anúncios gerais de CTM.

`special_ad_categories`

_matriz\[enumeração\]_

`NONE` ou [uma lista separada por vírgula de categorias de anúncios da Meta ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#parameters-2) .

`status`

_matriz\[enumeração\]_

`PAUSED`: a campanha ainda não está pronta.

-   Consulte a [referência sobre o ponto de extremidade da campanha da conta de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating) para ver a lista de parâmetros disponíveis.
    

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá uma resposta JSON com a identificação da campanha.

```
{
  "id": "campaign_id"
}
```

[](#)

## Etapa 2: criar um conjunto de anúncios

Para criar um conjunto de anúncios, envie uma solicitação `POST` ao ponto de extremidade `act__**ad_account_id**_/adsets`, sendo _**ad\_account\_id**_ a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `bid_amount`
    
-   `billing_event` definido como `IMPRESSIONS`
    
-   `campaign_id`
    
-   `daily_budget`
    
-   `destination_type` definido como `MESSENGER`
    
-   `name`
    
-   `optimization_goal` definida como `CONVERSATIONS`, `IMPRESSIONS`, `LEAD_GENERATION` ou `QUALITY_LEAD` para anúncios de lead
    
-   `promoted_object` definido como a identificação da Página do Facebook da sua empresa.
    
-   `status` definido como `PAUSED`
    
-   `targeting`
    

#### Referência rápida sobre conjunto de anúncios

Parâmetro

Valor

`access_token`

O token de acesso à Página.

`bid_amount`

_número inteiro_

O valor máximo que você quer pagar por um resultado com base na optimization\_goal.

`billing_event`

_enumeração_

Definido como `IMPRESSIONS`. A Meta cobra quando seu anúncio é mostrado para as pessoas.

`campaign_id`

_número inteiro_

A identificação da campanha conforme a [Etapa 1](#campaign).

`daily_budget`

_número inteiro_

O valor que você quer gastar por dia.

`destination_type`

_string_

Deve ser `MESSENGER` em anúncios do Messenger para leads **Obrigatório em anúncios do Messenger para leads**

`name`

_string_

O nome do conjunto de anúncios.

`optimization_goal`

_enumeração_

Pode ser `CONVERSATIONS` ou `CONVERSIONS` para CTM ou CTS. Pode ser `LEAD_GENERATION` ou `QUALITY_LEAD` em anúncios do Messenger para leads.

`promoted_object`

_enumeração_

Definido como a identificação da Página do Facebook da sua empresa. **Obrigatório em anúncios de lead para o Messenger**

-   Se você configurar uma [fonte de dados CRM ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/crm-integration) e escolher `QUALITY_LEAD` como uma meta de otimização, será possível adicionar o `pixel_id` ao `promoted_object` para aprimorar a otimização de qualidade. Não é necessário fornecer um `pixel_rule` com o `pixel_id`.
    

`status`

_enumeração_

`PAUSED`

`targeting`

_objeto_

Um [objeto que define o público ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/audiences/reference/advanced-targeting) a quem você quer mostrar os anúncios.

Consulte a [referência sobre o ponto de extremidade do conjunto de anúncios da conta de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating) para ver a lista de parâmetros disponíveis.

#### Exemplo de solicitação

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com a identificação do conjunto de anúncios.

```
{
  "id": "adset_id"
}
```

[](#)

## Etapa 3. fornecer um criativo do anúncio

Com o criativo, é possível adicionar ativos aos seus anúncios.

#### Limitações

-   Anúncios criados com `object_story_id` não são compatíveis.
    
-   A pessoa precisa ter o Messenger instalado no dispositivo para ver seu anúncio.
    
-   Não há compatibilidade com o posicionamento no lado direito.
    

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/347858631_657893412828132_4893960285967998993_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=zA-PpbhWuoMQ7kNvwGCtzgy&_nc_oc=AdlkOPU-N_fbxHZv8Cy9awTKbs4GfhcFVCu_-K2Q8VpLibENGioErnU7A4T-S4Jxicq5H149nN49d_TN46aGVZ5z&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Afu2xBJb1_1BHyANn-s_00woKkACkYqxTioQ0aXGw2b0cg&oe=6999AC6B)

Para fornecer um criativo de anúncio, envie uma solicitação `POST` ao ponto de extremidade `/act__**ad_account_id**_/adcreatives`, sendo _**ad\_account\_id**_ a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `name`
    
-   `object_story_spec` (obrigatório)
    
-   `privacy_url` (obrigatório para anúncios de lead)
    
-   `standard_enhancements.enroll_status` (obrigatório para criativos do anúncio qualificados para [aprimoramentos padrão](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/standard-enhancements#api-support))
    

#### Referência rápida sobre criativo do anúncio

Parâmetro

Valor

`access_token`

O token de acesso à Página. **Obrigatório**

`name`

O nome do criativo do anúncio. Por exemplo, "Clique para o Messenger de setembro", entre outros. **Obrigatório**

[`object_story_spec` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-object-story-spec/) 

Um objeto com informações sobre a mensagem. **Obrigatório para anúncios de clique para o Messenger ou de clique para assinar.**

-   [`link_data` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data/) : um objeto que define a mensagem com um modelo ou carrossel
    
-   [`page_id` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](#) (**obrigatório**): a identificação da Página do Facebook enviando a mensagem
    
-   [`photo_data` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-photo-data/) : um objeto que define a mensagem com uma imagem
    
-   [`text_data` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-text-data/) : um objeto que define a mensagem somente com texto
    
-   [`video_data` ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/reference/ad-creative-video-data/) : um objeto que define a mensagem com um vídeo
    

`privacy_url`

Definido como o URL da sua Política de Privacidade. **Obrigatório em anúncios do Messenger para leads**

### Anúncios de clique para o Messenger

Para fornecer o criativo do anúncio de clique para o Messenger, envie uma solicitação `POST` ao ponto de extremidade `/act_ad_account_id/adcreatives`, sendo **_ad\_account\_id_** a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `name`
    
-   `object_story_spec` com um objeto `*_data` que define o tipo de mídia
    

#### Referência rápida sobre anúncio com imagem

Parâmetros de `link_data`

Valores

`call_to_action`

Objeto que define o botão de chamada para ação no anúncio.

* * *

`type`: o texto do botão (por exemplo, `LEARN_MORE`)

* * *

`value`: o destino do clique no botão

* * *

`{app_destination`: `MESSENGER}` (**obrigatório**)

`image_hash`

O hash da imagem.

`link`

O URL da imagem.

`message`

O texto de boas-vindas a ser enviado depois de a pessoa clicar no botão de chamada para ação. Também é possível enviar um modelo padrão ou até 5 modelos de mensagem. [Saiba mais. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/messenger-platform/send-api-reference) 

#### Exemplo de solicitação de anúncio com imagem

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
v24.0
```
  

#### Referência rápida sobre anúncio em vídeo de clique para o Messenger

Parâmetros de `video_data`

Valores

`call_to_action`

Objeto que define o botão de chamada para ação no anúncio.

* * *

`type`: o texto do botão (por exemplo, `LEARN_MORE`)

* * *

`value`: o destino do clique no botão

* * *

`{app_destination`: `MESSENGER}` (**obrigatório**)

`link_description`

O texto do vídeo.

`image_url`

O URL da miniatura do vídeo.

`page_welcome_message`

O texto de boas-vindas a ser enviado depois de a pessoa clicar no botão de chamada para ação. Também é possível enviar um modelo padrão ou até 5 modelos de mensagem. [Saiba mais. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/messenger-platform/send-api-reference) 

`video_id`

O ID da Meta do vídeo. [Saiba como carregar ativos nos servidores da Meta. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/messenger-platform/reference/attachment-upload-api) 

#### Exemplo de solicitação de anúncio em vídeo

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
v24.0
```

#### Anúncio que usa um fluxo de mensagens configurado em um app parceiro.

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
v24.0
```

Para saber mais sobre fluxos de mensagens em apps, consulte [Welcome message flows](/docs/messenger-platform/ads/ads-welcome-message-flows) na documentação da plataforma do Messenger.

[](#)

### Como preencher a mensagem de boas-vindas da Página

A mensagem padrão exibida ao cliente é "Olá! Posso acessar mais informações sobre isso?". Você pode criar experiências do usuário mais personalizadas em anúncios de clique no Messenger ajustando a mensagem de saudação, os quebra-gelos e as mensagens de preenchimento automático dos seus anúncios no campo `page_welcome_message` em `object_story_spec`.

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

### Clique para assinar

Os anúncios de clique para assinar (CTS, pelas iniciais em inglês) são anúncio de clique para o Messenger que incluem uma matriz de objetos `object_story_spec.page_welcome_message` com um modelo de mensagem de notificação. Ao clicar no botão **Receber mensagens** no anúncio, a pessoa concorda em receber mensagens de marketing da sua empresa.

Para fornecer um criativo do anúncio com clique para assinar, envie uma solicitação `POST` ao ponto de extremidade `/act_ad_account_id/adcreatives`, sendo **_ad\_account\_id_** a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `name`
    
-   `object_story_spec` com
    
    -   um objeto `*_data` que define o tipo de mídia
        
    -   a matriz `page_welcome_message` que define a solicitação de aceitação de mensagens de marketing. Precisa incluir `landing_screen_type` definido como `marketing_messages` e o anexo da mensagem `payload.template_type` definido como `nofitication_messages`
        
    

#### Exemplo de solicitação de anúncio com imagem

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

[](#)

### Anúncios de lead em conversas

A partir da versão 24.0, a capacidade de criar anúncios de lead que geram leads no Messenger com a API está sendo descontinuada. Ainda será possível criar anúncios do Messenger para leads usando o Gerenciador de Anúncios. Para saber mais, veja [Como criar anúncios de lead com clique para o Messenger e o Instagram Direct no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/2398917563501477).

Com os anúncios do Messenger para leads, você pode gerar leads no Messenger usando um modelo de conversa automatizada. É possível fazer perguntas específicas às pessoas que estão interessadas na sua empresa diretamente da sua plataforma de mensagens favorita, além de coletar as preferências dos clientes e fazer perguntas personalizadas para priorizar os leads mais qualificados.

Antes de fornecer criativos do anúncio, você precisa aceitar os [termos e condições dos anúncios do Messenger para leads. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://www.facebook.com/ads/leadgen/tos) 

#### Requisitos do modelo de mensagem

-   Uma **mensagem de boas-vindas** que exibe uma saudação às pessoas após elas tocarem no seu anúncio e informa o que sua empresa tem a oferecer.
    
-   **Perguntas** que coletam as informações necessárias para saber se a pessoa pode ser convertida em um lead. Podem ser perguntas sobre interesses, localização e informações de contato, como email e número de telefone.
    
-   Uma **mensagem de confirmação** em que você agradece às pessoas pelas respostas e informa quais são os próximos passos. Você encontrará os novos leads no seu Gerenciador de Anúncios, na ferramenta de publicação da sua Página ou no CRM.
    
-   Uma **Política de Privacidade**, já que você coletará informações dos clientes.
    

#### Limitações

-   Os modelos de mensagem não podem ser editados nem excluídos depois de criados.
    

#### Criar um modelo de mensagem

Para criar um modelo de mensagem, envie uma solicitação `POST` ao ponto de extremidade `/**_page_id_**/messenger_lead_forms`, sendo **_page\_id_** a identificação da Página do Facebook da sua empresa. A solicitação precisa incluir:

-   `access_token`
    
-   `privacy_url`
    
-   A matriz `step_list` com `message`, `reply_type`, `step_id` e `step_type`
    
-   `template_name`
    
-   `reminder_text`
    

O modelo de mensagem a seguir inclui o `template_name`, o `privacy_url`, a `step_list` com uma mensagem de boas-vindas em `step_id: 0`, perguntas em `step_id: 1` a `4`, uma mensagem de confirmação em `step_id: 5` e uma mensagem de desqualificação em `step_id: 6`.

#### Referência rápida para modelos de mensagem

Parâmetros `step_list`

Descrição

`allow_to_skip`

_booliano_

Definido como `true` ou `false`. Definido como `false` quando a pessoa precisa fornecer uma resposta ou `true` se isso não for necessário.

`answer_validation_enabled`

_booliano_

Definido como `true` ou `false`. Definido como `true` quando a resposta precisa ser validada. Compatível somente com validação de cidade, país, email, identificação nacional, número de telefone e código postal.

`answers`

_matriz de strings_

Uma lista de respostas para uma pergunta. **Obrigatório para `reply_type: QUICK_REPLIES`.**

`message`

_string_

O texto para uma etapa específica. Por exemplo, uma mensagem de boas-vindas, pergunta, orientação, confirmação ou uma mensagem de desqualificação. **Obrigatório**

`next_step_ids`

_matriz de `step_id`s_

A próxima etapa, ou etapas possíveis, na lista de perguntas. Não pode referenciar uma pergunta anterior na lista. Pode depender da resposta fornecida. Por exemplo: se uma pessoa responder a uma pergunta com um desqualificador, a próxima etapa será a etapa desqualificadora. Porém, se a resposta for qualificadora, a etapa seguinte será a próxima pergunta da lista.

`prefill_type`

_enumeração{ `CITY`, `EMAIL`, `PHONE` }_

Se uma resposta for preenchida automaticamente com as informações da pessoa. Isso ocorrerá caso ela já tenha compartilhado o email e o número de telefone com sua empresa.

`reminder_text`

_string_

Texto para a pessoa que responde às perguntas, com um lembrete para preencher o formulário.

`reply_type`

_enumeração{ `NONE`, `PREFILL`, `QUICK_REPLIES` }_

Se `reply_type` estiver definido como "PREFILL", os tamanhos de step\_list\[x\].next\_step\_ids e step\_list\[x\].answers devem corresponder

`step_id`

_string_

A identificação da etapa que permite que você ordene as perguntas e mensagens. Por exemplo, se você tiver uma lista de 6 etapas, `0` é a mensagem de boas-vindas, `1` a `3` são as perguntas, `4` é a confirmação e `5` é a mensagem de desqualificação.

`step_type`

_enumeração{ `CONFIRMATION`, `DISQUALIFY`, `INTRO`, `QUESTION` }_

O tipo da etapa, como pergunta ou mensagem introdutória. As etapas de **INTRO** e **CONFIRMATION** são **obrigatórias**

#### Exemplo de modelo de mensagem para leads

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá um objeto JSON com a identificação do modelo.

```
{
  "id": "your_messenger_lead_gen_template_id"
}
```

Um `fblead_form` também é criado e associado ao modelo de mensagem como parte deste processo.

#### Consultar lista de formulários

Para consultar a lista dos modelos de formulários para geração de leads do Messenger, envie uma solicitação `GET` ao ponto de extremidade `/page_id/messenger_lead_forms`. Também é possível consultar informações sobre um modelo específico enviando uma solicitação `GET` ao ponto de extremidade `/`**_`Your_messenger_lead_gen_template_id`_**.

#### Exemplos de criativo do anúncio

Para fornecer o criativo do anúncio de clique para o Messenger, envie uma solicitação `POST` ao ponto de extremidade `/act_`**_`ad_account_id`_**`/adcreatives`, sendo **_`ad_account_id`_** a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `name`
    
-   `object_story_spec` com um objeto `*_data` que define o tipo de mídia (imagem ou vídeo) e inclui:
    
    -   o parâmetro `*_data.page_welcome_message` definido como o par chave-valor
        
        -   `ctm_lead_gen_template_id:`**_`Your_messenger_lead_gen_template_id`_**
            
        
    

#### Exemplo de criativo com imagem em anúncios do Messenger para leads

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

#### Exemplo de criativo com vídeo em anúncios do Messenger para leads

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

[](#)

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

`object_story_id` é a identificação do post no formato `postOwnerID_postID`, e `instagram_user_id` é uma identificação da conta do Instagram conectada à Página ou a identificação da conta do Instagram associada à Página. Veja mais detalhes em [Configurar contas do Instagram com Páginas](/docs/instagram/ads-api/guides/pages-ig-account).

### Adicionar extensões de produto ao clique para o Messenger

#### O que é o clique para o Messenger com extensões de produto?

As extensões de produto (recurso "Mostrar produto" no Gerenciador de Anúncios da Meta) é uma otimização do criativo Advantage+ que exibe produtos do seu catálogo abaixo de uma mídia única estática quando há probabilidade de melhorar o desempenho. Este documento mostra como usar os recursos de extensões de produto em anúncios de clique para o Messenger. Para saber como adicionar extensões de produto a anúncios que não sejam do tipo clique para o Messenger, consulte esta página.

#### Referência

[Anúncios de clique para o Messenger](https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-messenger)  
[Extensões de produto para criativo Advantage+](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/product-extensions)

#### Critérios de qualificação

-   Ter um catálogo conectado a uma loja no Facebook
    
-   Ter um catálogo com pelo menos um item de produto
    
-   Criar uma campanha com o objetivo `OUTCOME_ENGAGMENET, OUTCOME_LEAD,OUTCOME_SALES` ou `LINK_CLICK`
    
-   Usar o formato do anúncio com uma opção única de imagem ou vídeo ou o conteúdo de um post existente no Facebook
    

#### Criar usando uma imagem única

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

#### Criar usando um vídeo único

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

#### Criar usando um post existente do Facebook com o tipo de mídia "foto/vídeo"

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

#### Criar usando um post existente do Facebook com o tipo de mídia "álbum"

_**Para posts com várias fotos, as extensões de produto serão adicionadas após a conversão das fotos em vídeo.**  
Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

[](#)

## Etapa 4. criar o anúncio

Para criar o anúncio, você precisa associar o criativo ao conjunto de anúncios. Envie uma solicitação `POST` ao ponto de extremidade `/act_**_ad_account_id/ads_**`, sendo **_ad\_account\_id_** a identificação da conta de anúncio da Meta. A solicitação precisa incluir:

-   `access_token`
    
-   `adset_id` (da [Etapa 2](#adset))
    
-   `creative_id` (da [Etapa 3](#creative))
    
-   `name`
    
-   `status`
    

#### Referência rápida sobre anúncios de contas de anúncios

Parâmetro

Valor

`access_token`

O token de acesso à Página.

`adset_id`

O AD-SET-ID da Etapa 2.

`creative_id`

`{"creative_id": "AD-CREATIVE-ID"}`, sendo AD-CREATIVE-ID o ID da Etapa 3.

`name`

O nome do anúncio.

`status`

Definido como `PAUSED`. Quando a campanha estiver pronta para o lançamento, defina como `ACTIVE`

#### Exemplo de solicitação de anúncio com criativo

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **ad\_account\_id**) pelos seus valores._
```
v24.0
```

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com a identificação do anúncio.

```
{
  "id": "ad_id"
}
```

### Chamada para ação

Também é possível definir uma chamada para ação ao criar um anúncio.

```
"call_to_action": {
  "value": {"app_destination":"MESSENGER"},
  "type": "MESSAGE_PAGE"
}
```

[](#)

## Etapa 5. publicar o anúncio

Verifique se o anúncio existe no [Gerenciador de Anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://adsmanager.facebook.com/) . Clique no botão **Conferir e publicar** no canto superior direito. Selecione a campanha, o conjunto de anúncios e o anúncio.

É possível publicar o anúncio pelo Gerenciador de Anúncios ou pela API. Para publicar pela API, repita a [Etapa 4](#ad) com o parâmetro `status` definido como `ACTIVE`.

O anúncio ficará com o status `PENDING_REVIEW` e será analisado pela Meta. Depois da aprovação, ele terá o status `ACTIVE` e será veiculado.

[](#)

## Elementos avançados de clique para o Messenger

É possível criar mensagens que incluam mais do que um elemento de mensagem, como um comando para ligação telefônica ou vários modelos. Você pode adicionar esses elementos ao definir uma matriz de objetos como `*_data.page_welcome_message` em vez de um valor de string.

#### Referência rápida sobre matriz da mensagem de boas-vindas da Página

Parâmetros de `page_welcome_message`

Valores

`landing_screen_type`

_enumeração_

Definido como `call_prompt` (**obrigatório**).

`media_type`

_enumeração_

Definido como `text` em anúncios com comando para ligação telefônica

`message`

_Objeto_

Use para incluir um ou mais modelos de mensagem no anúncio de clique para o Messenger.

`text_format.message`

Objeto para definir as ações do botão de comando para ligação telefônica

-   `text`: o texto da mensagem de boas-vindas
    
-   `call_prompt_data` : o par chave-valor do texto da mensagem de comando para ligação telefônica (**obrigatório**)
    
    Defina `call_prompt_message` como o texto do comando para a pessoa ligar para sua empresa.`}` Por exemplo, _Ligue e agende uma visita_ (**obrigatório**)
    

### Adicionar um comando para ligação telefônica

É possível adicionar um comando para ligação telefônica ao anúncio com clique para o Messenger definindo o valor de `*_data.page_welcome_message` como uma matriz de objetos representando os elementos desse comando. Defina o parâmetro `landing_screen_type` como `call_prompt`, `media_type` como `text`, além do objeto `text_format.message` com `text` de boas-vindas e `call_prompt_data.call_prompt_message` definido como um comando de ligar para sua empresa.

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
... 
      "page_welcome_message": "[
        {
          "landing_screen_type": "call_prompt",
          "media_type": "text",
          "text_format": {
            "message": {
              "text": "Your_welcome_message",
              "call_prompt_data": { 
                "call_prompt_message": "Your_call_prompt_message"
              }
            }
          },
        }
      ]"
...
```

### Adicionar um ou mais modelos

Para criar um anúncio com vários modelos, defina o parâmetro `*_data.page_welcome_message` como uma matriz com um [modelo de mensagem ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/messenger-platform/send-messages/templates) . O exemplo a seguir adiciona um modelo de resposta rápida.

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
... 
      "page_welcome_message": "[{
        'message': {
          'text':'  Your_question_or_directive  ',
          'quick_replies':[
            {
              'content_type':'text',
              'title':'  Option_1  ',
              'payload':'  Option_1_information_for_webhook  '
            },
            {
              'content_type':'text',
              'title':'  Option_2  ',
              'payload':'  Option_2_information_for_webhook  '
            },
            {
              'content_type':'text',
              'title':'  Option_3  ',
              'payload':'  Option_3_information_for_webhook  '
            }
          ]
        }
      }]",
...
```

[](#)

## Próximas etapas

Se ainda não tiver feito isso, [configure webhooks](https://developers.facebook.com/docs/messenger-platform/webhooks) para receber notificações quando uma pessoa clicar no seu anúncio.

[](#)

## Saiba mais

Saiba mais sobre a API de Marketing e outras opções de anúncios de clique para o Messenger.

#### API de Marketing

-   [Campaign ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign-group) 
    
-   [Ad Creative ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/marketing-api/reference/ad-creative) 
    
-   [Ad ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/marketing-api/reference/adgroup) 
    
-   [Ad Set ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign) 
    
-   [Direcionamento avançado ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/audiences/reference/advanced-targeting) 
    
-   [Formulários de lead para anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/create/) 
    
-   [Primeiros passos: API de Marketing ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-apis/get-started) 
    
-   [Como recuperar leads ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving) 
    
-   [Meta de otimização e eventos de cobrança ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](/docs/marketing-api/bidding/overview/billing-events#opt_bids) 
    

#### Plataforma do Messenger

-   [Message Templates ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/messenger-platform/reference/templates) 
    
-   [Page Messenger Lead Forms ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=2CSnbpgYYTrXHioZQxqy0Q&oh=00_Aft1EYKcTjUUEcJnzcQ88UZVSTMKCzUA6osl_DrPbVrpHg&oe=69999BA2)](https://developers.facebook.com/docs/graph-api/reference/page/messenger_lead_forms/) 
    

[](#)