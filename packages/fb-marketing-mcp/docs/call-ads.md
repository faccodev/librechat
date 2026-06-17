---
title: "Anúncios com ligação telefônica - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/call-ads"
scraped_at: "2026-02-01T13:54:22.250Z"
---

# Anúncios com ligação telefônica

Este guia explica como criar e publicar anúncios com ligação telefônica usando a API de Marketing da Meta.

## Antes de começar

Este guia considera que você já tem o seguinte:

-   Uma [conta de anúncios da Meta](https://adsmanager.facebook.com/adsmanager/) com uma forma de pagamento válida
    
-   Ativos carregados nos servidores da Meta (como imagens ou vídeos) para usar nos anúncios
    

Para fazer chamadas a todos os pontos de extremidade deste guia, você precisará do seguinte:

-   Um token de acesso à Página solicitado por uma pessoa que pode executar a tarefa `ADVERTIZE` na Página.
    
-   Estas permissões devem ser concedidas a uma pessoa que usa seu app:
    
    -   `ads_management`
        
    -   `pages_manage_ads`
        
    -   `pages_read_engagement`
        
    -   `pages_show_list`
        
    

### Recomendações

Defina o horário de funcionamento da sua empresa nas [configurações da Página do Facebook. ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](https://www.facebook.com/help/1623755557908631) .

Ao testar uma chamada de API, você pode incluir o parâmetro `access_token` definido como seu token de acesso. No entanto, quando fizer chamadas seguras do seu app, use as [classes de token de acesso](https://developers.facebook.com/docs/facebook-login/guides/access-tokens#portabletokens).

### Limitações

-   O público-alvo precisa ter 18 anos ou mais.
    
-   O número de telefone incluído na chamada para ação deve ser do mesmo país do público-alvo.
    

[](#)

## Etapa 1: criar uma campanha

Para criar uma campanha de anúncios, envie uma solicitação `POST` ao ponto de extremidade `act_**_ad_account_id_**/campaigns`, sendo **_ad\_account\_id_** a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `name`
    
-   `objective` – definido como um dos objetivos compatíveis a seguir:
    
    -   `OUTCOME_AWARENESS`
        
    -   `OUTCOME_ENGAGEMENT`
        
    -   `OUTCOME_LEADS`
        
    -   `OUTCOME_SALES`
        
    -   `OUTCOME_TRAFFIC`
        
    
-   `special_ad_categories`
    

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

-   `bid_amount`
    
-   `billing_event` definido como `IMPRESSIONS`
    
-   `campaign_id`
    
-   `daily_budget`
    
-   `destination_type` definido como `PHONE_CALL`
    
-   `name`
    
-   `optimization_goal` definido como `QUALITY_CALL` para anúncios com ligação telefônica
    
-   `targeting`
    

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

## Etapa 3: gerar criativo do anúncio

Com o criativo, é possível adicionar ativos aos seus anúncios. Há compatibilidade com anúncios do tipo carrossel, imagem, somente texto e vídeo.

Para fornecer um criativo de anúncio, envie uma solicitação `POST` ao ponto de extremidade `/act__**ad_account_id**_/adcreatives`, sendo _**ad\_account\_id**_ a identificação da conta de anúncios da Meta. A solicitação precisa incluir:

-   `name`
    
-   `object_story_spec`
    
-   `object_story_spec` com um objeto `link_data` que define a `call_to_action` com o `type` configurado como `CALL_NOW` e o `value` como o número de telefone da sua empresa
    

#### Exemplo de solicitação de anúncio com imagem

_Texto formatado para facilitar a leitura. Substitua os **valores em negrito e itálico** (como **page\_access\_token**) pelos seus valores._
```
v24.0
```
  

Caso ela seja bem-sucedida, o app receberá a resposta JSON a seguir com a identificação do criativo do anúncio.

```
{
  "id": "ad_creative_id"
}
```

[](#)

## Etapa 4: criar o anúncio

Para criar o anúncio, você precisa associar o criativo ao conjunto de anúncios. Envie uma solicitação `POST` ao ponto de extremidade `/act_**_ad_account_id/ads_**`, sendo **_ad\_account\_id_** a identificação da conta de anúncio da Meta. A solicitação precisa incluir:

-   `adset_id` (da [Etapa 2](#step-2))
    
-   `creative_id` (da [Etapa 3](#step-3))
    
-   `name`
    
-   `status`
    

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

[](#)

## Próximas etapas

Acesse o guia [Primeiros passos](/docs/marketing-apis/get-started#book-ad) para saber como enviar o anúncio para análise.

[](#)

## Saiba mais

Saiba mais sobre a API de Marketing e conheça as opções adicionais para anúncios com ligação telefônica.

#### Central de Ajuda para Empresas

-   [Como visualizar métricas dos anúncios com ligação telefônica no Gerenciador de Anúncios da Meta ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](https://www.facebook.com/business/help/237108475737601) 
    

#### API de Marketing

-   [Referência sobre ações de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/ads-action-stats/) 
    
-   [Referência sobre campanha de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign-group) 
    
-   [Referência sobre insights de campanhas de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign-group/insights) 
    
-   [Referência sobre criativos do anúncio ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/ad-creative) 
    
-   [Referência sobre anúncio![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/adgroup)
    
-   [Referência sobre conjunto de anúncios ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/reference/ad-campaign) 
    
-   [Referência sobre direcionamento de público ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/audiences/reference/advanced-targeting) 
    
-   [Comece a usar a API de Marketing ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-apis/get-started) 
    
-   [Geração de prévia do anúncio ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/generatepreview/v17.0#ad-previews) 
    
-   [Visão geral das metas de otimização e dos eventos de lances ![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/310307727_3347317042262105_1088877051262827250_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=dpWMbs7YsrIQ7kNvwFvziJQ&_nc_oc=AdmF9Umo0zS3CoDWHSaHr81t_CYrfIxmGmqLAe7W3vR18Mc5dpqRVoTCwta3g-tTbASl7Hbj8V1gHnVhVjN3IyWo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=c7FRSoUrpzBZe0B3rAeZPA&oh=00_Afsqk_R5b2P0RJX4qp9XPmQ6iCpeMtjjS-USZa-GvnNX7w&oe=69999BA2)](/docs/marketing-api/bidding/overview/billing-events#opt_bids) 
    

[](#)