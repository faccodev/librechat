---
title: "Opções de processamento de dados - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/overview/data-processing-options"
scraped_at: "2026-02-01T13:52:05.874Z"
---

# Opções de processamento de dados para usuários nos EUA

O Uso Limitado de Dados permite maior controle sobre como seus dados são usados nos sistemas da Meta e oferece melhor suporte para garantir a conformidade com vários regulamentos de privacidade estaduais nos EUA. Para usar esse recurso, você precisa habilitar o Uso Limitado de Dados. Quando receber dados com Uso Limitado de Dados habilitado de pessoas nos estados onde o recurso está disponível, a Meta fará o processamento de acordo com nossa função de provedor ou operador do serviço, conforme aplicável, e limitará o uso dessas informações com base nos [Termos específicos do estado](https://www.facebook.com/legal/terms/state-specific).

## Produtos da Meta que oferecem o Uso Limitado de Dados

Os produtos da Meta a seguir oferecem o Uso Limitado de Dados. A disponibilidade varia de acordo com o estado. Consulte a tabela abaixo para ver os detalhes:

[Ferramentas da Meta para Empresas](https://www.facebook.com/help/331509497253087)

(Pixel da Meta, Eventos do app via SDK do Facebook, API de Eventos do App, API de Conversões, API de Conversões Offline)

[SDK do Audience Network](/docs/audience-network)

[Públicos personalizados a partir de um arquivo de cliente](/docs/marketing-api/audiences/guides/custom-audiences)

**Califórnia**

  

_Em vigor a partir de 1º de junho de 2023_

**Colorado**

  

_Em vigor a partir de 1º de junho de 2023_

  

_Em vigor a partir de 1º de junho de 2023_

**Connecticut**

  

_Em vigor a partir de 1º de junho de 2023_

  

_Em vigor a partir de 1º de junho de 2023_

**Delaware**

  

_Em vigor a partir de 18 de dezembro de 2024_

  

_Em vigor a partir de 18 de dezembro de 2024_

**Flórida**

  

_Em vigor a partir de 24 de junho de 2024_

  

_Em vigor a partir de 24 de junho de 2024_

**Montana**

  

_Em vigor a partir de 23 de setembro de 2024_

  

_Em vigor a partir de 23 de setembro de 2024_

**Nebraska**

  

_Em vigor a partir de 18 de dezembro de 2024_

  

_Em vigor a partir de 18 de dezembro de 2024_

**New Hampshire**

  

_Em vigor a partir de 18 de dezembro de 2024_

  

_Em vigor a partir de 18 de dezembro de 2024_

**Nova Jersey**

  

_Em vigor a partir de 18 de dezembro de 2024_

  

_Em vigor a partir de 18 de dezembro de 2024_

**Oregon**

  

_Em vigor a partir de 24 de junho de 2024_

  

_Em vigor a partir de 24 de junho de 2024_

**Texas**

  

_Em vigor a partir de 24 de junho de 2024_

  

_Em vigor a partir de 24 de junho de 2024_

**Minnesota**

  

_Em vigor a partir de 2 de junho de 2025_

  

_Em vigor a partir de 2 de junho de 2025_

**Maryland**

  

_Em vigor a partir de 9 de setembro de 2025_

  

_Em vigor a partir de 9 de setembro de 2025_

**Rhode Island**

  

_Em vigor a partir de 17 de novembro de 2025_

  

_Em vigor a partir de 17 de novembro de 2025_

O Uso Limitado de Dados é enviado por meio de um parâmetro chamado Opções de processamento de dados. Ele também pode ser enviado com o país e o estado do usuário. Se um anunciante não tiver certeza do país ou estado, ele poderá solicitar que a Meta determine se o evento ou registro é proveniente de uma localização aceita.

### Ferramentas para Empresas e SDK do Audience Network

No caso das [Ferramentas para Empresas](https://www.facebook.com/help/331509497253087) e do Audience Network, o Uso Limitado de Dados está disponível apenas para pessoas na Califórnia, no Colorado, em Connecticut, em Delaware, na Flórida, em Montana, em Nebraska, em New Hampshire, em Nova Jersey, no Oregon, no Texas, em Minnesota, em Maryland ou em Rhode Island. Se uma empresa habilitar o Uso Limitado de Dados, mas não definir os parâmetros de localização como EUA e Califórnia, Colorado, Connecticut, Delaware, Flórida, Montana, Nebraska, New Hampshire, Nova Jersey, Oregon, Texas, Minnesota, Maryland ou Rhode Island, a Meta determinará se o evento é proveniente de um desses estados. Caso o Uso Limitado de Dados esteja habilitado para um evento na Califórnia, no Colorado, em Connecticut, em Delaware, na Flórida, em Montana, em Nebraska, em New Hampshire, em Nova Jersey, no Oregon, no Texas, em Minnesota, em Maryland ou em Rhode Island, faremos o processamento de acordo com nossa função de provedor ou operador do serviço e limitaremos o uso dessas informações com base nos [Termos específicos do estado](https://www.facebook.com/legal/terms/state-specific).

As empresas talvez notem um impacto no desempenho e na eficácia da campanha, e os recursos de redirecionamento e mensuração ficarão restritos quando o Uso Limitado de Dados estiver habilitado.

### Para públicos personalizados de lista de clientes

No caso de públicos personalizados de lista de clientes, o Uso Limitado de Dados está disponível apenas para pessoas na Califórnia. Se o Uso Limitado de Dados estiver habilitado para registro em uma lista de clientes da Califórnia, faremos o processamento de acordo com nossa função de provedor de serviços e limitaremos o uso dessas informações com base nos [Termos específicos do estado](https://www.facebook.com/legal/terms/state-specific). Se uma empresa habilitar o Uso Limitado de Dados, mas não definir os parâmetros de localização como EUA e Califórnia, a Meta determinará se o registro é proveniente desse estado.

As empresas talvez notem um impacto no tamanho do público quando o Uso Limitado de Dados estiver habilitado.

Veja as APIs compatíveis listadas abaixo.

Saiba mais sobre as opções de processamento de dados:

-   [Central de Ajuda da Meta para Empresas: Sobre Uso Limitado de Dados](https://www.facebook.com/business/help/1151133471911882)
    

## Referência

Campo

Descrição

**Opções de processamento de dados**

matriz

As opções de processamento que você quer habilitar para um evento ou registro específico. O valor aceito atualmente é `LDU` para o Uso Limitado de Dados.

  

Dependendo da API e da implementação sendo usada, o nome desse campo pode ser diferente. Por exemplo, `dataProcessingOptions` para uma chamada do Pixel da Meta em JavaScript, mas `data_processing_options` para uma chamada da API de Conversões. Veja os exemplos de chamada a seguir.

  

Uma matriz vazia pode ser enviada para especificar de modo explícito que esse evento ou registro não deve ser processado com as restrições de Uso Limitado de Dados.

**País para opções de processamento de dados**

número inteiro

**Opcional para a maioria das APIs.** Veja mais detalhes nas observações a seguir.

  

Um país que você quer associar a essa opção de processamento de dados. No momento, os valores aceitos são `1` para Estados Unidos da América ou `0` para solicitar que a Meta realize a geolocalização.

**Estado para opções de processamento de dados**

número inteiro

**Opcional para a maioria das APIs.** Veja mais detalhes nas observações a seguir.

  

Um estado que você deseja associar a essa opção de processamento de dados. No momento, os valores aceitos são `1000` para California, `1001` para Colorado, `1002` para Connecticut, `1003` para Florida, `1004` para Oregon, `1005` para Texas, `1006` para Montana, `1007` para Delaware, `1008` para Nebraska, `1009` para New Hampshire, `1010` para Nova Jersey, `1011` para Minnesota, `1012` para Maryland, `1013` para Rhode Island ou `0` para solicitar que a Meta detecte a geolocalização.

  

**Observação:**

-   Se você definir um país, será preciso escolher um estado também. Caso contrário, a Meta realizará a geolocalização.
    

[](#)

## Ferramentas e APIs compatíveis

### [Pixel da Meta](/docs/facebook-pixel)

Implementação

Inclusão das opções de processamento de dados

Pixel do navegador

Atualize o código de inicialização do Pixel para especificar o método `dataProcessingOptions` antes de fazer a chamada `fbq('init')`.

  

Para não habilitar o Uso Limitado de Dados de modo explícito:

```
fbq('dataProcessingOptions', []);
fbq('init', '{pixel_id}');
fbq('track', 'PageView');
```

Para habilitar o Uso Limitado de Dados e fazer com que a Meta realize a geolocalização:

```
fbq('dataProcessingOptions', ['LDU'], 0, 0);
```

Para habilitar o Uso Limitado de Dados e especificar a localização, por exemplo, para a Califórnia:

```
fbq('dataProcessingOptions', ['LDU'], 1, 1000);
```

Tag de imagem

Adicione o seguinte à tag de imagem do pixel:

-   `dpo`: opções de processamento de dados
    
-   `dpoco`: país para opções de processamento de dados
    
-   `dpost`: estado para opções de processamento de dados
    

Consulte [Referência](/docs/marketing-apis/data-processing-options#reference) para conferir os valores aceitos.

  

Para não habilitar o Uso Limitado de Dados de modo explícito, transmita um valor vazio para o parâmetro `dpo`:

```
<img src="https://www.facebook.com/tr?id={pixel_id}&ev=Purchase&dpo=" />
```

Para habilitar o Uso Limitado de Dados e fazer com que a Meta realize a geolocalização:

```
<img src="https://www.facebook.com/tr?id={pixel_id}&ev=Purchase&vdpo=LDU&dpoco=0&dpost=0" />
```

Para habilitar o Uso Limitado de Dados e especificar manualmente a localização (por exemplo, para a Califórnia):

```
<img src="https://www.facebook.com/tr?id={pixel_id}&ev=Purchase&dpo=LDU&dpoco=1&dpost=1000" />
```

[](#)

### [API de Conversões](/docs/marketing-api/server-side-api) e [API de Conversões Offline](/docs/marketing-api/offline-conversions)

Para estas duas APIs, implemente opções de processamento de dados adicionando `data_processing_options`, `data_processing_options_country` e `data_processing_options_state` a cada evento no [parâmetro de dados](/docs/marketing-api/server-side-api/parameters/main-body#data) dos seus eventos.

**Observação**: as APIs de Eventos do App e Conversões Offline não são mais recomendadas para novas integrações. Em vez dessas opções, use a API de Conversões, que agora é compatível com eventos da web, de apps e offline. Consulte [Conversions API for App Events](/docs/marketing-api/conversions-api/app-events) e [Conversions API for Offline Events](/docs/marketing-api/conversions-api/offline-events) para saber mais.

Para não habilitar o Uso Limitado de Dados de modo explícito, especifique uma matriz vazia para cada evento ou simplesmente remova o campo na carga:

```
{
    "data": [
        {
            "event_name": "Purchase",
            "event_time": <EVENT_TIME>,
            "user_data": {
                "em": "<EMAIL>"
            },
            "custom_data": {
                "currency": "<CURRENCY>",
                "value": "<VALUE>"
            },
            "data_processing_options": []
        }
    ]
}
```

Para habilitar o Uso Limitado de Dados e fazer com que a Meta realize a geolocalização:

```
{
    "data": [
        {
            "event_name": "Purchase",
            "event_time": <EVENT_TIME>,
            "user_data": {
                "em": "<EMAIL>",
                "client_ip_address": "256.256.256.256"
            },
            "custom_data": {
                "currency": "<CURRENCY>",
                "value": "<VALUE>"
            },
            "data_processing_options": ["LDU"],
            "data_processing_options_country": 0,
            "data_processing_options_state": 0
        }
    ]
}
```

Para habilitar o Uso Limitado de Dados e especificar manualmente a localização (por exemplo, para a Califórnia):

```
{
    "data": [
        {
            "event_name": "Purchase",
            "event_time": <EVENT_TIME>,
            "user_data": {
                "em": "<EMAIL>"
            },
            "custom_data": {
                "currency": "<CURRENCY>",
                "value": "<VALUE>"
            },
            "data_processing_options": ["LDU"],
            "data_processing_options_country": 1,
            "data_processing_options_state": 1000
        }
    ]
}
```

#### Interface do usuário para carregamento manual

A API de Conversões Offline oferece a opção de carregar manualmente seus eventos a partir de um arquivo `.csv`. Nesse caso, adicione "Opções de processamento de dados", "País para processamento de dados" e "Estado para processamento de dados" como colunas dentro do seu arquivo. Para saber mais, consulte a interface do usuário para carregamento.

[](#)

### [API de Eventos do App](/docs/app-events)

Se você estiver chamando a API de Eventos do Aplicativo e não estiver enviando dados diretamente de dispositivos do usuário, você deve enviar o endereço IP do cliente usando o cabeçalho X-Forwarded-For `HTTP` ou explicitamente especificar a geografia.

### Graph API

Para implementar as Opções de Processamento de Dados usando a Graph API, adicione `data_processing_options`, `data_processing_options_country` e `data_processing_options_state` à sua chamada de API. Para explicitamente habilitar o modo LDU, envie uma matriz `data_processing_options` vazia:
```
{
  "event": "CUSTOM_APP_EVENTS",
  "application_tracking_enabled": "1",
  "advertiser_tracking_enabled": "1",
  "custom_events": ["fb_mobile_purchase"],
  "data_processing_options": []
}
```
Para habilitar o LDU para os usuários com geolocalização, você pode enviar um evento com o seguinte código:
```
{
  "event": "CUSTOM_APP_EVENTS",
  "application_tracking_enabled": "1",
  "advertiser_tracking_enabled": "1",
  "custom_events": ["fb_mobile_purchase"],
  "data_processing_options": ["LDU"],
  "data_processing_options_country": 0,
  "data_processing_options_state": 0
}
```
Para habilitar o LDU para os usuários e especificar a geografia do usuário, você pode enviar um evento com o seguinte código:
```
{
  "event": "CUSTOM_APP_EVENTS",
  "application_tracking_enabled": "1",
  "advertiser_tracking_enabled": "1",
  "custom_events": ["fb_mobile_purchase"],
  "data_processing_options": ["LDU"],
  "data_processing_options_country": 1,
  "data_processing_options_state": 1000
}
```

### SDKs móveis

Implementação

Adicionar opções de processamento de dados

SDK para iOS (Objective C)

Com Objective C, use `FBSDKSettings setDataProcessingOptions`.

  

Para explicitamente não habilitar o modo de Uso Limitado de dados (LDU), use:

```
[FBSDKSettings setDataProcessingOptions:@[]];
```

Para habilitar o LDU com geolocalização, use:

```
[FBSDKSettings setDataProcessingOptions:@[@"LDU"] country:0 state:0];
```

Para habilitar o LDU para os usuários e especificar a geografia do usuário, use:

```
[FBSDKSettings setDataProcessingOptions:@[@"LDU"] country:1 state:1000];
```

SDK para iOS (Swift)

Com Swift, use `setDataProcessingOptions`.

  

Para explicitamente não habilitar o modo LDU, use:

```
Settings.setDataProcessingOptions(modes: [])
```

Para habilitar o LDU para os usuários com geolocalização, use:

```
Settings.setDataProcessingOptions(modes: ["LDU"], country: 0, state: 0)
```

Para habilitar o LDU para os usuários e especificar a geografia do usuário, use:

```
Settings.setDataProcessingOptions(modes: ["LDU"], country: 1, state: 1000)
```

SDK do Android

Use o método `setDataProcessingOptions`.

  

Para explicitamente não habilitar o modo LDU, use:

```
FacebookSdk.setDataProcessingOptions(new String[] {});
```

Para habilitar o LDU para os usuários com geolocalização, use:

```
FacebookSdk.setDataProcessingOptions(new String[] {"LDU"}, 0, 0);
```

Para habilitar o LDU para os usuários com uma geografia específica, use:

```
FacebookSdk.setDataProcessingOptions(new String[] {"LDU"}, 1, 1000);
```

SDK do Unity

Para explicitamente não habilitar o modo LDU, envie um evento com:

```
FB.Mobile.SetDataProcessingOptions(new string[] {});
```

Para habilitar o LDU para os usuários com geolocalização, envie um evento com:

```
FB.Mobile.SetDataProcessingOptions(new string[] {"LDU"}, 0, 0);
```

Para habilitar o LDU para os usuários e especificar a geografia do usuário, envie um evento com:

```
FB.Mobile.SetDataProcessingOptions(new string[] {"LDU"}, 1, 1000);
```

### [SDK do Audience Network](/docs/audience-network/)

**Os gerenciadores de anúncios que atualizaram o SDK do Audience Network para a versão 5.10 ou superior precisam configurar a sinalização de Uso Limitado de Dados para que o Facebook continue aplicando restrições às informações pessoais que publicam sobre pessoas na Califórnia.**

Implementação

Adicionar opções de processamento de dados

SDK para iOS, v5.10+

Use `FBAdSettings setDataProcessingOptions`.

  

Para explicitamente não ativar o modo LDU (Uso Limitado de Dados), use:

```
[FBAdSettings setDataProcessingOptions:@[]];
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:1 state:1000];
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:0 state:0];
```

Android SDK, v5.10+

Use o método `setDataProcessingOptions`.

  

Para explicitamente não ativar o modo LDU, use:

```
AdSettings.setDataProcessingOptions(new String[] {})
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 1, 1000);
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 0, 0);
```

Unity SDK, v5.10+ (**sem** usar o wrapper para Unity fornecido pelo Audience Network)

Se você **não** estiver usando o wrapper para Unity fornecido pelo Audience Network, insira este código.

  
```
using UnityEngine;
            using System.Runtime.InteropServices;

            namespace AudienceNetwork
            {
            public static class AdSettings
            {

            public static void SetDataProcessingOptions(string[] dataProcessingOptions)
            {
            #if UNITY_ANDROID
            AndroidJavaClass adSettings = new AndroidJavaClass("com.facebook.ads.AdSettings");
            adSettings.CallStatic("setDataProcessingOptions", (object)dataProcessingOptions);
            #endif

            #if UNITY_IOS
            FBAdSettingsBridgeSetDataProcessingOptions(dataProcessingOptions, dataProcessingOptions.Length);
            #endif
            }

            public static void SetDataProcessingOptions(string[] dataProcessingOptions, int country, int state)
            {
            #if UNITY_ANDROID
            AndroidJavaClass adSettings = new AndroidJavaClass("com.facebook.ads.AdSettings");
            adSettings.CallStatic("setDataProcessingOptions", (object)dataProcessingOptions, country, state);
            #endif

            #if UNITY_IOS
            FBAdSettingsBridgeSetDetailedDataProcessingOptions(dataProcessingOptions, dataProcessingOptions.Length, country, state);
            #endif
            }

            #if UNITY_IOS
            [DllImport("__Internal")]
            private static extern void FBAdSettingsBridgeSetDataProcessingOptions(string[] dataProcessingOptions, int length);

            [DllImport("__Internal")]
            private static extern void FBAdSettingsBridgeSetDetailedDataProcessingOptions(string[] dataProcessingOptions, int length, int country, int state);
            #endif
            }
            }
```

Depois de inserir o código, é possível seguir as instruções do SDK do Unity na linha abaixo como se estivesse usando o wrapper para Unity.

Unity SDK, v5.10+ (usando o wrapper para Unity fornecido pelo Audience Network)

Se você estiver usando o wrapper para Unity fornecido pelo Audience Network, utilize estas `SetDataProcessingOptions`.

  

Para explicitamente não ativar o modo LDU, use:

```
AdSettings.SetDataProcessingOptions(new string[]{})
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
AdSettings.SetDataProcessingOptions(new string[] {"LDU"}, 1, 1000);
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
AdSettings.SetDataProcessingOptions(new string[] {"LDU"}, 0, 0);
```

Os publishers que usam um parceiro de mediação precisam configurar a sinalização de opções de processamento de dados (Uso Limitado de Dados) no SDK do Audience Network do Facebook **antes** de inicializar o SDK de Mediação, para que seja recebido na solicitação de lance.

Implementação

Adicionar opções de processamento de dados

Android

Para explicitamente não ativar o modo LDU, use:

```
AdSettings.setDataProcessingOptions(new String[] {})
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 1, 1000);
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 0, 0);
```

Após configurar a sinalização de LDU, inicie o SDK do parceiro de mediação, como de costume.

iOS

Para explicitamente não ativar o modo LDU (Uso Limitado de Dados), use:

```
FBAdSettings setDataProcessingOptions:@[]];
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:1 state:1000];
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:0 state:0];
```

Após configurar a sinalização de LDU, inicie o SDK do parceiro de mediação, como de costume.

Se você for um gerenciador de anúncios que trabalha conosco por kit de lances ou outros lances do lado do servidor, siga os métodos de implementação abaixo.

Implementação

Adicionar opções de processamento de dados

Kit 2.0 para Android/lances

Para explicitamente não ativar o modo LDU, use:

```
AdSettings.setDataProcessingOptions(new String[] {})
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 1, 1000);
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 0, 0);
```

Após configurar a sinalização de LDU, gere o token do licitante:

```
String token = BidderTokenProvider.getBidderToken(Context);
```

Kit 2.0 para iOS/lances

Para explicitamente não ativar o modo LDU (Uso Limitado de Dados), use:

```
[FBAdSettings setDataProcessingOptions:@[]];
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:1 state:1000];
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:0 state:0];
```

Após configurar a sinalização de LDU, gere o token do licitante:

```
NSString *token = [FBAdSettings bidderToken];
```

Outros lances do lado do servidor

Para cada plataforma, siga as instruções abaixo se quiser configurar a sinalização de LDU e recuperar o token do licitante antes de fazer uma solicitação de lance do lado do servidor.

  

**Para o cliente Android:**

Para explicitamente não ativar o modo LDU, use:

```
AdSettings.setDataProcessingOptions(new String[] {})
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 1, 1000);
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
AdSettings.setDataProcessingOptions(new String[] {"LDU"}, 0, 0);
```

Após configurar a sinalização de LDU, gere o token do licitante:

```
String token = BidderTokenProvider.getBidderToken(Context);
```

**Para o cliente iOS:**

Para explicitamente não ativar o modo LDU (Uso Limitado de Dados), use:

```
[FBAdSettings setDataProcessingOptions:@[]];
```

Para ativar o LDU para os usuários e especificar a geografia do usuário, use:

-   **País:**`1` para os EUA.
    
-   **Estado:**`1000` para a Califórnia.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:1 state:1000];
```

Para ativar o LDU para os usuários com geolocalização, use:

-   **País:**`0` para solicitar a geolocalização do evento.
    
-   **Estado:**`0` para solicitar a geolocalização do evento.
    

```
[FBAdSettings setDataProcessingOptions:@[@"LDU"] country:0 state:0];
```

Após configurar a sinalização de LDU, gere o token do licitante:

```
NSString *token = [FBAdSettings bidderToken];
```

Para uma versão de SDK inferior à 5.10, as empresas podem substituir a aplicação automática do período de restrições do Uso Limitado de Dados por meio de uma configuração no Gerenciador de Monetização. A configuração para substituição é aplicável somente quando uma solicitação relacionada a uma pessoa na Califórnia não foi sinalizada como Uso Limitado de Dados (por exemplo, solicitações de um SDK de versão inferior à 5.10).

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/106878819_1496826714037523_5336179980997982437_n.png?_nc_cat=108&ccb=1-7&_nc_sid=f537c7&_nc_ohc=tXWtoXyXmTsQ7kNvwEaTmnT&_nc_oc=AdlbBb1SqKodWhedQTMwwZysxx8YYieX3T35YELs1jUD-DXKvdV-T7UzicRmOP_4Y7AbH8lQZmURuxNmQIeBwcB5&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=nyfUxF4OhVIUAs-RyRhjYg&oh=00_AfuXlOPEZxsFAZVWcgXK0zd0QRvj97_jS1xGOl2HbG_eVw&oe=69852C8A)

### [Públicos personalizados a partir de um arquivo de cliente](/docs/marketing-api/audiences/guides/custom-audiences)

Se você quiser habilitar o Uso Limitado de Dados para pessoas na Califórnia por meio de públicos personalizados de lista de clientes a partir de 1º de junho de 2023, carregue novos públicos ou [atualize os existentes](/docs/marketing-api/audiences/guides/custom-audiences) com a sinalização de Uso Limitado de Dados. Atualize e mantenha os status de Uso Limitado de Dados dos seus públicos e das pessoas, conforme necessário.

Uma sinalização de Uso Limitado de Dados aplicada a um usuário em um público não será transferida automaticamente para públicos diferentes. Da mesma forma que os anunciantes devem gerenciar cada um dos públicos personalizados de lista de clientes separadamente pelos critérios selecionados, a sinalização de Uso Limitado de Dados precisa ser aplicada de modo específico a cada público usado para publicidade.

Para NÃO habilitar o `LDU` de forma explícita para o registro, você pode enviar uma matriz de `data_processing_options` vazia ou remover o campo na carga. Exemplo de uma matriz vazia:

```
{
   "payload": {
       "schema": [
           "EMAIL",
                    "DATA_PROCESSING_OPTIONS"
       ],
       "data": [
           [
               "<HASHED_DATA>
",
                           []
           ]
       ]
   }
}
```

Para habilitar o `LDU` de forma explícita e fazer com que a Meta realize a geolocalização (ao não incluir o estado nem o país do registro), especifique uma matriz contendo `LDU` para cada registro:

```
{
   "payload": {
       "schema": [
           "EMAIL",
                    "DATA_PROCESSING_OPTIONS"
       ],
       "data": [
           [
               "<HASHED_DATA>
",
                           ["LDU"]
           ]
       ]
   }
}
```

Para habilitar o Uso Limitado de Dados e especificar manualmente a localização:

```
{
    "customer_consent": true,
    "payload": {
        "schema": [
            "EMAIL",
            "DATA_PROCESSING_OPTIONS",
            "DATA_PROCESSING_OPTIONS_COUNTRY",
            "DATA_PROCESSING_OPTIONS_STATE"
        ],
        "data": [
            [
                "<HASHED_DATA>",
                ["LDU"],
                1,
                1000
            ]
        ]
    }
}
```

[](#)

[](#)