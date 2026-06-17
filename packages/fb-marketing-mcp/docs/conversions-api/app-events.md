---
title: "API de Conversões para eventos do app"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/app-events"
scraped_at: "2026-02-01T14:07:35.174Z"
---

# API de Conversões para eventos do app

A API de Conversões permite que os anunciantes enviem eventos da web, do app e da loja física, bem como eventos de mensagens empresariais, à Meta por meio de um único ponto de extremidade em vez de várias fontes. Essa consolidação simplifica o recurso de tecnologia de um anunciante e cria uma visão mais abrangente no Gerenciador de Eventos da Meta usando conjuntos de dados.

Esta documentação fornece orientações para você integrar eventos do app à API de Conversões.

## Pré-requisitos

### 1\. Conjunto de dados

Os eventos do app enviados através da API de Conversões precisam estar associados a um conjunto de dados.

Datasets allow advertisers to connect and manage event data from web, app, store and business messaging event sources to the Conversions API. Datasets may show event data from any of these integrations that you choose to set up:

-   Meta Pixel (website events)
-   App Events API (app events, including Facebook SDK for iOS or Android, mobile measurement partners (MMPs))
-   Offline Conversions API (Meta’s legacy API for offline events)
-   Messaging Events API (messaging events)

Datasets enable you to view all customer activities from a single interface. They also allow you to reduce the effort to build and maintain multiple API integrations.

In Events Manager, advertisers have different [options](https://www.facebook.com/business/help/5270377362999582?id=490360542427371) to create a dataset depending on their starting point. Or you can [create a brand new dataset](https://www.facebook.com/business/help/5818684664831465?id=490360542427371) in Events Manager by linking during offline event set creation or through an existing mobile app or during messaging event set creation information. Note that linking a dataset to an application is required before sending mobile app events to the Conversions API and only one application can be linked to a dataset. See more [details](https://www.facebook.com/business/help/768703235046938?locale=en_US) and instructions [here](https://www.facebook.com/business/help/750785952855662?id=490360542427371).

[](#)

Você pode fazer uma chamada `GET` para [https://graph.facebook.com/v16.0/{ads-pixel-id}/is\_consolidated\_container](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/) a fim de detectar se o conjunto de dados do anunciante está consolidado e qualificado para transmitir eventos do app via API de Conversões.

### 2\. Permissões

-   Para implementar uma integração direta como anunciante, siga [estas instruções](/docs/marketing-api/conversions-api/get-started#integration-methods) relacionadas a pré-requisitos e permissões.
    
-   Para implementar uma integração de plataforma de parceiro, [siga estas instruções](/docs/marketing-api/conversions-api/guides/end-to-end-implementation#integration-as-a-platform) relacionadas a pré-requisitos e permissões.
    

[](#)

## Configuração

### Como enviar eventos do app à API de Conversões

**a. Vinculação da identificação do conjunto de dados e do ID do app**

No Gerenciador de Eventos, há duas formas de associar seu app a um conjunto de dados:

-   Selecione a aba "Data Sources", encontre a opção "Setting" do app e execute a vinculação.
    
-   Selecione a aba "Data Sources" e, na opção "Overview" do app, use o botão "Link to dataset" na seção "All Activity".
    

Depois de concluir a vinculação, o conjunto de dados incluirá o app associado.

  

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/325341809_579175036986617_3350700945589157027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e280be&_nc_ohc=4AlYVMVPer4Q7kNvwG8hvKQ&_nc_oc=AdmU_KO7u-BVlzVwWZlnuj9avrg0uyzyVqE7G0jRe86fRHU7YXBBn4Wtms7P_M8EmIKDMapceywo4hJF6hq5tR2n&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Gzthk5bBjiC8WQVWO52zHg&oh=00_AftZ0DAFFEYRBS9sYpxNvUP1Q5ZzKqqrDk_pLu-8javkAw&oe=69998EB2)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/325341809_579175036986617_3350700945589157027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e280be&_nc_ohc=4AlYVMVPer4Q7kNvwG8hvKQ&_nc_oc=AdmU_KO7u-BVlzVwWZlnuj9avrg0uyzyVqE7G0jRe86fRHU7YXBBn4Wtms7P_M8EmIKDMapceywo4hJF6hq5tR2n&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Gzthk5bBjiC8WQVWO52zHg&oh=00_AftZ0DAFFEYRBS9sYpxNvUP1Q5ZzKqqrDk_pLu-8javkAw&oe=69998EB2)

  

**b. Campos obrigatórios**

[Consulte aqui](/docs/marketing-api/conversions-api/parameters) o conjunto atual de parâmetros que podem ser enviados usando a API de Conversões. Para enviar eventos do app, os seguintes [campos server\_event](/docs/marketing-api/conversions-api/parameters/server-event) podem ser compartilhados na carga:

-   O parâmetro `action_source` precisa conter o valor `app` para eventos do app.
    
-   O `event_id` é obrigatório para o caso da configuração de desduplicação.
    
-   [Campos app\_data](/docs/marketing-api/conversions-api/parameters/app-data)
    
-   [Campos user\_data](/docs/marketing-api/conversions-api/parameters/customer-information-parameters)
    
-   [Campos custom\_data](/docs/marketing-api/conversions-api/parameters/custom-data)
    

### Campos de dados do app

Parameter

Description

[`advertiser_tracking_enabled`](#)

boolean

**Required for app events**

Use this field to specify ATT permission on an iOS 14.5+ device. Set to `0` for disabled or `1` for enabled.

[`application_tracking_enabled`](#)

boolean

**Required for app events**

A person can choose to enable ad tracking on an app level. Your SDK should allow an app developer to put an opt-out setting into their app. Use this field to specify the person's choice. Use `0` for disabled, `1` for enabled. \`

[`extinfo`](#)

object

Please use the down arrow to the right to see the list of `extinfo` values.

**Required for app events**

Extended device information, such as screen width and height. This parameter is an array and values are separated by commas. When using `extinfo`, **all values are required and must be in the order indexed below**. If a value is missing, fill with an empty string as a placeholder.

Note:

  

-   `version` must be `a2` for Android
    
-   `version` must be `i2` for iOS
    

`0`

string

**Required**

extinfo version

  

Example: `i2`

`1`

string

app package name

  

Example: `com.facebook.sdk.samples.hellofacebook`

`2`

string

short version (int or string)

  

Example: `1.0`

`3`

string

long version

  

Example: `1.0 long`

`4`

string

**Required**

OS version

  

Example: `13.4.1`

`5`

string

device model name

  

Example: `iPhone5,1`

`6`

string

locale

  

Example: `En_US`

`7`

string

timezone abbreviation

  

Example: `PDT`

`8`

string

carrier

  

Example: `AT&T`

`9`

string

screen width

  

Example: `320`

`10`

string

screen height

  

Example: `568`

`11`

string

screen density

  

Example: `2`

`12`

string

CPU cores

  

Example: `2`

`13`

string

external storage size in GB

  

Example: `13`

`14`

string

free space on external storage in GB

  

Example: `8`

`15`

string

device timezone

  

Example: `USA/New York`

[`campaign_ids`](#)

string

**Optional**

An encrypted string and non-user metadata appended to the outbound URL (for example, ad\_destination\_url) or deep link (for App Aggregated Event Measurement) when a user clicked on a link from Facebook.

  

Graph API definition: Parameter passed via the deep link for Mobile App Engagement campaigns.

[`install_referrer`](#)

string

**Optional**  
Third party install referrer, currently available for Android only, see [here for more](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Fanalytics%2Fdevguides%2Fcollection%2Fandroid%2Fv4%2Fcampaigns&h=AT1jiXMxDmPJt84TA4P51nsGEDSoJrvWATdZOEBvS0B6GnwJ_IBebagtWsFjv6h1qzUNitraxZcf93UQ61meM-PzFaS2v43AcNKRGWDQG91E1UVZ2lnyRDpgK7tYmloHwR-Ley0VxbDEKRksBt_BqRXnu5rx2WKbpFaY9rGMnI4).

[`installer_package`](#)

string

**Optional**

Used internally by the Android SDKs

[`url_schemes`](#)

array

**Optional**

Used internally by the iOS and Android SDKs.

[`vendor_id`](#)

string

**Optional**

Vendor ID.

[`windows_attribution_id`](#)

string

**Optional**

Attribution token used for Windows 10.

[](#)

### Parâmetros de informações do cliente

Parâmetro

Descrição

`anon_id`

string

**Não converter em hash.**  
Seu ID de instalação. Esse campo representa instâncias únicas de instalação de apps.

`client_ip_address`

string

**Não converter em hash**.  
O endereço IP do navegador correspondente ao evento deve ser um endereço IPV4 ou IPV6 válido. Use o IPV6 no lugar do IPV4 para usuários com essa versão habilitada. O parâmetro de dados do usuário `client_ip_address` não deve ser convertido em hash.  
Não inclua espaços. Sempre forneça o endereço IP correto para garantir relatórios de eventos precisos.  
**Observação**: essa informação é adicionada automaticamente aos eventos enviados pelo navegador. No entanto, ela deve ser configurada de modo manual em eventos enviados pelo servidor.

* * *

**Exemplo**  
_IPV4_: 168.212.226.204  
_IPV6_: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

`madid`

string

**Não converter em hash.**  
A identificação do anunciante do dispositivo móvel, o ID de publicidade de um dispositivo Android ou o Identificador de Anunciante (IDFA, pelas iniciais em inglês) de um dispositivo Apple.

### Dados personalizados

Parâmetro

Descrição

[`description`](#)

string

**Opcional.**  
String, descrição do evento, personalizado.

[`level`](#)

string

**Opcional.**  
String, nível de um jogo, personalizado.

[`max_rating_value`](#)

**Opcional.**  
Longo, limite máximo de uma escala de classificação (por exemplo, 5 em uma escala de 5 estrelas), personalizado.

[`success`](#)

booliano

**Opcional.**  
`1` para sim, `0` para não, personalizado.

  

Em resumo, os eventos do app compartilhados usando a API de Conversões **exigirão** os seguintes parâmetros de dados:

-   [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source): precisa ser definido como "app". Ao usar a API de Conversões, você concorda em garantir a precisão do parâmetro `action_source` conforme seu conhecimento.
    
-   `event_id`: obrigatório para a configuração de desduplicação. Veja detalhes na seção "Configuração da desduplicação para vários canais".
    
-   [`advertiser_tracking_enabled`](/docs/graph-api/reference/application/activities/)
    
-   [`application_tracking_enabled`](/docs/graph-api/reference/application/activities/)
    
-   [`extinfo`](/docs/graph-api/reference/application/activities/)
    

Confira abaixo um exemplo de `extinfo`. Verifique se todos os subparâmetros abaixo estão preenchidos e aparecem em ordem sequencial. Se estiver faltando algum valor, use uma string vazia como um espaço reservado.

Nome do subparâmetro

Obrigatório

Tipo de dados

Exemplo

extinfo version

Sim

string

`i2` (a versão deve ser **a2** para Android e **i2** para iOS)

app package name

Não

string

`com.facebook.sdk.samples.hellofacebook`

short version

Não

string

`1.0`

long version

Não

string

`1.0 long`

os version

Sim

string

`13.4.1`

device model name

Não

string

`iPhone5,1`

locale

Não

string

`En_US`

timezone abbr

Não

string

`PDT`

carrier

Não

string

`AT&T`

screen width

Não

string

`320`

screen height

Não

string

`568`

screen density

Não

string

`2`

cpu core

Não

string

`2`

external storage size

Não

string

`13`

free space in external storage size

Não

string

`8`

device time zone

Não

string

`USA/New York`

  

**c. Configuração da desduplicação para vários canais**

O mecanismo de desduplicação será necessário para remover o tráfego de eventos duplicados entre a integração da API de Conversões e todas as outras integrações que você já tem com eventos do app. Isso inclui SDK, MMPs e API de Eventos do App.

Para eventos do app, [aplicamos a mesma funcionalidade de desduplicação](docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/#event-id-and-event-name--recommended-) que existe para eventos da web. A lógica aproveita o campo `event_id` e a desduplicação baseada em `event_name` (eventos da API de Conversões e do SDK/API de Eventos do App que têm o mesmo `event_id`). O parâmetro event\_id é um identificador que pode diferenciar de modo exclusivo eventos semelhantes. IDs de evento imprecisos podem fazer com que a conversão seja desduplicada incorretamente, afetando os relatórios de conversão e o desempenho da campanha.

Você pode consultar a seguinte documentação para desenvolvedores se quiser implementar a configuração de desduplicação:

-   [Como configurar eventos do app](/docs/app-events/overview)
    
-   [Exemplo de configuração de desduplicação](/docs/app-events/best-practices/ecom-and-retail)
    

Veja um exemplo de como registrar um evento personalizado. Para fazer isso, transmita o nome do evento como um AppEvents.Name no SDK do iOS:

```
AppEvents.shared.logEvent(.achievedLevel, parameters: [AppEvents.ParameterName(rawValue: "event_id"): "123"])
```

Para eventos de instalação do app, já existe um mecanismo de desduplicação que garante que apenas uma instalação seja atribuída no período dos últimos 90 dias. Mantemos o primeiro evento e eliminamos os posteriores, independentemente da fonte de ação. Não há requisitos para implementar a desduplicação de eventos do app relacionados a eventos de instalação.

**d. Envio de eventos**

Para enviar novos eventos, faça uma solicitação `POST` para a API de Conversões usando este caminho: `https://graph.facebook.com/{API_VERSION}/{DATASET_ID}/events?access_token={TOKEN}`

Quando você posta nessa borda, a Meta cria novos eventos de servidor do app. Para saber mais, consulte este [documento para desenvolvedores](/docs/marketing-api/conversions-api/using-the-api/).

Veja um exemplo de como os parâmetros se ajustam ao esquema geral da carga de um evento **Purchase**:

```
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1684389752,
      "action_source": "app",
      "user_data": {
        "client_ip_address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "em": [
          "30a79640dfd8293d4f4965ec11821f640ca77979ca0a6b365f06372f81a3f602"
        ],
        "ph": [
          "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b",
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        ],
        "madid": "38400000-8cf0-11bd-b23e-10b96e40000d",
        "anon_id": "12345340-1234-3456-1234-123456789012"
      },
      "custom_data": {
        "currency": "USD",
        "value": "142.52"
      },
      "app_data": {
        "advertiser_tracking_enabled": 1,
        "application_tracking_enabled": 1,
        "campaign_ids": "abcd1234",
        "extinfo": [
          "a2",
          "com.some.app",
          "771",
          "Version 7.7.1",
          "10.1.1",
          "OnePlus6",
          "en_US",
          "GMT-1",
          "TMobile",
          "1920",
          "1080",
          "2.00",
          "2",
          "128",
          "8",
          "USA/New York"
        ]
      }
    }
  ]
}
```
  

Veja um exemplo de como os parâmetros se ajustam ao esquema geral da carga de um evento **Install**:

```
{
  "data": [
    {
      "event_name": "MobileAppInstall",
      "event_time": 1684389252,
      "action_source": "app",
      "user_data": {
        "client_ip_address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "madid": "38400000-8cf0-11bd-b23e-10b96e40000d",
        "anon_id": "12345340-1234-3456-1234-123456789012"
      },
      "app_data": {
        "advertiser_tracking_enabled": 1,
        "application_tracking_enabled": 1,
        "extinfo": [
          "a2",
          "com.some.app",
          "771",
          "Version 7.7.1",
          "10.1.1",
          "OnePlus6",
          "en_US",
          "GMT-1",
          "TMobile",
          "1920",
          "1080",
          "2.00",
          "2",
          "128",
          "8",
          "USA/New York"
        ]
      }
    }
  ]
}
```

[](#)

## Solução de problemas

Você pode usar a ferramenta [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper/) para gerar dados de carga:

-   Escolha a fonte de ação `app` quando aplicável.
    
-   Preencha as informações dos eventos que serão enviados à Meta.
    
-   Isso gerará uma carga de evento, que pode ser usada como modelo para sua integração com a API de Conversões.
    

Para testar, use a ferramenta [Eventos de Teste](https://www.facebook.com/business/help/2040882565969969?id=1205376682832142) no Gerenciador de Eventos.

[](#)

## Veja também

-   [Visão geral da API de Conversões](/docs/marketing-api/conversions-api)
    
-   [Como usar a API](/docs/marketing-api/conversions-api/using-the-api)
    
-   [API de Conversões: Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices)
    

[](#)