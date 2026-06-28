---
title: "Dataset Quality API para eventos offline - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/dataset-quality-api/offline-events"
scraped_at: "2026-02-01T15:48:17.554Z"
---

# Dataset Quality API para eventos offline

Esta API está em fase de testes beta. Para receber acesso, entre em contato com seu representante da Meta.

A Dataset Quality API para eventos offline oferece um detalhamento da pontuação e recomendações por dimensões de qualidade, incluindo nível de atualidade, frequência e cobertura de chave de correspondência. Uma configuração de evento ideal permite a coleta de dados de alta qualidade, o que é essencial para o desempenho do sistema de anúncios.

A configuração multicanal da API de Conversões com alta qualidade permitirá que os anunciantes usem anúncios omnichannel, solução que permite gerar vendas na loja e no site com apenas uma campanha de vendas.

## Common Use Cases

Partners and agencies may use the Dataset Quality API to provide a quality dashboard and insights, while helping their advertisers to enhance and optimize their integrations. Partners may also use this integration to monitor the stability of their Conversions API integration. Advertisers may use this endpoint to aggregate dataset quality data to incorporate in their monitoring.

## Setup Requirements

### Ownership and Access

#### Advertiser Authentication Using Business Manager

1.  In Business Manager, go to the Users section and select the **System User** tab. Click on the specific system user you are using for the Conversions API.
2.  Go to the Assign Asset dialog and choose **Pixels**. Then, select the pixels you want to send events on behalf of.
3.  For each pixel, select the Manage Pixel permission, and click **Save Changes**.
4.  Go back to your system user's details page. Verify that the selected pixels are visible there.
5.  To generate the access token, follow instructions [here](https://www.facebook.com/business/help/503306463479099?id=2190812977867143).

#### Partner Platform Authentication

You must first request authorization to send events on behalf of your clients. You have the following authentication options:

##### Facebook Login for Business (Recommended)

[Facebook Login for Business](https://developers.facebook.com/docs/facebook-login/facebook-login-for-business/) is the preferred authentication and authorization solution for tech providers and business app developers who need access to their business clients' assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients to complete the flow and grant your app access to their business assets.

##### Meta Business Extension (Recommended)

With this option, [Meta Business Extension](https://developers.facebook.com/docs/facebook-business-extension/) (MBE) returns all the necessary information needed to send events on behalf of the client. MBE provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and securely. MBE is currently under beta. Please contact your Meta representative for access.

The endpoint requires a user access token as an input parameter. If you are a new MBE user, call this endpoint to fetch the system user access token after you have finished setting up MBE. Existing users need to ask for re-authentication before calling the new API endpoint.

##### Client Sharing of a Meta Pixel to Partner’s Business Manager

With this option, the client shares their Meta Pixel to the partner using Business Manager settings or by the [API](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/shared_accounts/). Then, the partner can assign the partner system user to the client pixel and [generate an access token to send server events](https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#get-started).

#### User Permission

-   The user or system user used to make the API call requires (at minimum) the following user permission: **Partial access -> Use events dataset**
-   User access may be granted (in bulk) by using the instructions provided [here](https://www.facebook.com/business/help/279059996069252?id=2042840805783715).

#### App Permission

-   **Basic:** If you manage a small number of Meta datasets and/or wish to test the Dataset Quality API, then the following app permissions are required: **ads\_read** and (**ads\_management** or **business\_management**).
    
-   **Advanced:** If you manage a high number of Meta datasets on behalf of other businesses and/or require higher rate limits, then the **Advanced Level** of the **ads\_management** app permission and app feature **Ads Management Standard Access** is required. Advanced Level app permissions and features require [app review](https://developers.facebook.com/docs/resp-plat-initiatives/individual-processes/app-review).
    

[](#)

## Como recuperar informações sobre qualidade de eventos offline

É possível monitorar a pontuação de qualidade dos dados por evento offline, além das chaves de correspondência enviadas, usando o ponto de extremidade, os parâmetros e os campos da API listados abaixo:

### Chamada de API

Ponto de extremidade: `https://graph.facebook.com/v23.0/dataset_quality`

Para consultar métricas sobre a qualidade de um conjunto de dados, faça uma solicitação `GET` para o ponto de extremidade `dataset_quality` com estes parâmetros:

### Parâmetros

Parâmetro

Descrição

[`dataset_id`](#)

número inteiro

**Obrigatório.**  
A identificação do conjunto de dados (pixel) para recuperar dados de qualidade.

[`access_token`](#)

string

**Obrigatório.**  
Token de acesso válido (não expirado) para a identificação do conjunto de dados (pixel). Recomendamos configurar um token de acesso de usuário do sistema com longa duração. Leia mais sobre diferentes tipos de tokens de acesso no nosso [guia](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/) específico.

[`agent_name`](#)

string

**Opcional.**  
O valor normalizado do campo partner\_agent é usado para filtrar apenas eventos enviados com o parâmetro partner\_agent na solicitação POST [/{pixel\_id}/events](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#send). Veja as boas práticas de atribuição de eventos em [Implementação de ponta a ponta da API de Conversões](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation#step-3--attribute-events-to-your-platform) e [Boas práticas da API de Conversões](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices#bp-agencies).

Por exemplo, se o valor de partner\_agent for `[partner_name]_[majorversion]_[minorVersion]`, o valor da string do agente normalizado será `partner_name` em minúsculas.

O `agent_name` permite que você defina o identificador da sua plataforma ao enviar eventos em nome de um cliente. Caso você seja uma agência ou um parceiro gerenciado, trabalhe com o representante da Meta para definir o identificador.

Se você for um anunciante, provavelmente não será preciso se preocupar com a atribuição de `agent_name`.

Lembre-se de que, se `agent_name` não for fornecido, todos os eventos serão incluídos no cálculo da EMQ, independentemente de terem sido enviados por um agente ou não.

### Campos

Campo

Descrição

[`offline`](#)

matriz

Este campo denota um conjunto estruturado de dados relacionados a eventos offline. O filtro é uma matriz com `event_name` e as respectivas métricas. Ele é obrigatório por padrão nesta API. Veja a [seção de exemplo](#example-below).

[`event_name`](#)

string

Um [evento padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) ou [eventos personalizado](/docs/facebook-pixel/implementation/conversion-tracking#custom-events).

[`composite`](#)

float

A [pontuação composta de qualidade de dados dos eventos offline](https://www.facebook.com/business/help/905457088464077?id=565900110447546). Para calcular a pontuação de qualidade dos dados, consideramos nível de atualidade, frequência e atribuição nos últimos 28 dias. Esses fatores, ponderados de forma diferente, são combinados em uma pontuação de até 10. Observação: uma pontuação composta de 8,5 ou mais permite o uso de anúncios omnichannel, garantindo que eles alcancem o público no momento certo.

[`match_key`](#)

número inteiro

A pontuação de `match_key` fornece recomendações sobre como melhorar a pontuação e a cobertura da chave de correspondência para o email e o telefone. A pontuação máxima é 10.

[`frequency`](#)

número inteiro

A métrica de pontuação de frequência mensura a frequência com que você envia dados e fornece recomendações sobre como melhorar a pontuação. A pontuação máxima é 10.

[`freshness`](#)

número inteiro

O nível de atualidade mostra o quão contínuos são os dados e fornece recomendações sobre como melhorar a pontuação.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET \ https://graph.facebook.com/v23.0/dataset_quality?dataset_id=<DATASET_ID> \ -F 'agent_name="My Agent Name"'\ -F 'fields="offline"'\ -F 'access_token=<ACCESS_TOKEN>'
```

**Exemplo de resposta**

```
{
 "offline": [
    {
      "event_name": "Purchase",
      "composite": {
         "score": 6.6,
         "recommendation": "Your offline data quality score is ok, but could be improved."
      },
      "match_key": {
         "score": 5.6,
         "recommendation": "Sending email and phone number parameters can help improve your match key score."
      },
      "frequency":  {
         "score": 4.6,
         "recommendation": "Sharing your offline data more often can help improve your frequency score and help you get better ad outcomes."
      },
      "freshness":  {
         "score": 2.2,
         "recommendation": "Sending your most recent offline conversion data sooner can help improve your score and help you get better ad outcomes."
      }
    }
  ],
}
```

### Exemplo

Cenário: você quer somente os nomes de evento e as pontuações compostas de cada evento.

**Explorador da Graph API**

```
GET/v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline{event_name, composite}
```

**Exemplo de resposta**

```
{
  "offline": [
    {
      "event_name": "Purchase",
      "composite": {
        "score": 6.6,
        "recommendation": "Your offline data quality score is ok, but could be improved."
      },
    }
  ],
}
```

### Exemplo

Cenário: você quer somente os nomes de evento e as pontuações de chave de correspondência, recomendações e cobertura de cada evento.

**Explorador da Graph API**

```
GET/v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline{event_name, match_key}
```

**Exemplo de resposta**

```
{
   "offline": [
    {
	"event_name": "Purchase",
	 "match_key":  {
             "score": 6.6,
             "recommendation": "Send email and phone parameters to help improve your match key score." },
             "coverage" : {
                     "email": 100.0
                     "phone": 90.0 
              }
        }
    }
  ]
}
```

[](#)

## Códigos de erro

Os códigos de erro a seguir podem ser retornados ao criar um conjunto de dados:

Código de erro

Descrição

`2044055`

O `dataset_id` inserido não existe.

`10`

O app não tem permissão para essa ação.

[](#)

## Outros recursos

-   [Dataset Quality API](/docs/marketing-api/conversions-api/dataset-quality-api)
    
-   [Anúncios omnichannel](/docs/marketing-api/ad-creative/omnichannel-ads/)
    
-   [Omni Optimal Technical Setup Guide: Best Practices and Requirements](/docs/marketing-apis/guides/omni-optimal-setup-guide/)
    
-   [API de Conversões para eventos offline](/docs/marketing-api/conversions-api/offline-events)
    
-   Artigos da Central de Ajuda para Empresas
    
    -   [Sobre conjuntos de dados no Gerenciador de Eventos da Meta](https://www.facebook.com/business/help/750785952855662?id=490360542427371)
        
    -   [Sobre a qualidade dos dados offline](https://www.facebook.com/business/help/905457088464077?id=565900110447546)
        
    -   [Como criar um conjunto de dados no Gerenciador de Eventos da Meta](https://www.facebook.com/business/help/5818684664831465?id=490360542427371)
        
    
-   Outros recursos:
    
    -   Visão geral da [Graph API](/docs/graph-api/overview)
        
    -   [Autorização](/docs/marketing-api/get-started/authorization#permissions-and-features)
        
    

[](#)