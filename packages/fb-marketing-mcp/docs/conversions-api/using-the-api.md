---
title: "Como usar a API - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api"
scraped_at: "2026-02-01T14:07:09.452Z"
---

# Como usar a API

Assim que você concluir os pré-requisitos da página [Primeiros passos](/docs/marketing-api/conversions-api/get-started), acesse esta página para aprender a enviar eventos e usar a ferramenta Eventos de Teste. Depois de enviar um evento, [verifique sua configuração](/docs/marketing-api/conversions-api/verifying-setup).

A API de Conversões tem como base a [API de Marketing](/docs/marketing-apis) do Facebook, que foi criada a partir da [Graph API](/docs/graph-api). A Graph API e a API de Marketing têm cronogramas diferentes de descontinuação de versões. Nosso ciclo de lançamentos está alinhado com a [Graph API](/docs/graph-api/changelog) para que todas as versões sejam compatíveis por pelo menos dois anos. Essa exceção só é válida para a API de Conversões.

[API de Conversões: visão geral](/docs/marketing-api/conversions-api)[Parâmetros](/docs/marketing-api/facebook-pixel/server-side-api/parameters)  
  

Os eventos de loja física, app e web compartilhados usando a API de Conversões exigem parâmetros específicos. Ao usar a API de Conversões, você concorda em garantir a precisão do parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) conforme seu conhecimento. A lista de [parâmetros obrigatórios está disponível aqui](/docs/marketing-api/conversions-api/parameters).

## Enviar solicitações

Para enviar novos eventos, faça uma solicitação `POST` para a borda `/events` dessa API por este caminho: `https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}`. Ao postar nessa borda, o Facebook cria novos eventos de servidor.

```
v24.0
```

Anexe o token de acesso seguro gerado usando o parâmetro de consulta `access_token` para a solicitação. Também é possível usar o [Explorador da Graph API](https://developers.facebook.com/tools/explorer/?method=POST&path=%7BPIXEL_ID%7D%2Fevents%2F&version=v3.2) para `POST` no ponto de extremidade `/<pixel_id>/events`.

Veja um exemplo de corpo de solicitação:

```
{
   "data": [
      {
         "event_name": "Purchase",
         "event_time": 1633552688,
         "event_id": "event.id.123",
         "event_source_url": "http:\/\/jaspers-market.com\/product\/123",         
         "action_source": "website",
         "user_data": {
            "client_ip_address": "192.19.9.9",
            "client_user_agent": "test ua",
            "em": [
               "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
            ],
            "ph": [
               "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
               "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
            ],
            "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
            "fbp": "fb.1.1558571054389.1098115397"
         },
         "custom_data": {
            "value": 100.2,
            "currency": "USD",
            "content_ids": [
               "product.id.123"
            ],
            "content_type": "product"
         },
         "opt_out": false
      },
      {
         "event_name": "Purchase",
         "event_time": 1633552688,
         "user_data": {
            "client_ip_address": "192.88.9.9",
            "client_user_agent": "test ua2"
         },
         "custom_data": {
            "value": 50.5,
            "currency": "USD"
         },
         "opt_out": false
      }
   ]
}
```

### Tempo de carregamento versus tempo de transação do evento

O [`event_time`](/docs/marketing-api/server-side-api/parameters/server-event#event-time) é o tempo de transação do evento. Ele é enviado como um registro de data e hora do Unix, em segundos, que indica quando o evento ocorreu. O tempo especificado **pode estar adiantado em relação ao momento em que você enviou o evento ao Facebook**. Isso serve para habilitar o processamento em lote e a otimização de desempenho do servidor.

O [`event_time`](/docs/marketing-api/server-side-api/parameters/server-event#event-time) pode indicar até 7 dias antes de o evento ser enviado à Meta. Se o `event_time` de `data` for maior que 7 dias antes do envio, um erro será retornado para toda a solicitação e nenhum evento será processado. Para eventos de loja física e offline com `physical_store` definido como `action_source`, é preciso carregar transações até 62 dias depois da conversão.

Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) seja preciso conforme o seu conhecimento.

### Solicitações em lote

É possível enviar até mil eventos em `data`. No entanto, para melhor desempenho, recomendamos que você envie os eventos imediatamente após sua ocorrência, preferencialmente até uma hora após a ocorrência. **Se houver um evento inválido no lote enviado, todo o lote será rejeitado.**

### Uso de hash

Verifique a página de [parâmetros de informações do cliente](/docs/marketing-api/server-side-api/parameters/user-data) para ver quais parâmetros precisam ser convertidos em hashes antes de serem enviados ao Facebook. Se você estiver usando um dos nossos [SDKs de Negócios](/docs/business-sdk/), a conversão em hashes será feita para você pelo SDK.

### [Recursos de SDK de Negócios para a API de Conversões](/docs/marketing-api/conversions-api/guides/business-sdk-features)

Saiba mais sobre três recursos de SDK de Negócios elaborados especialmente para usuários da API de Conversões: [Solicitações assíncronas](/docs/marketing-api/conversions-api/guides/business-sdk-features#asynchronous-requests), [Criação de lotes concorrentes](/docs/marketing-api/conversions-api/guides/business-sdk-features#concurrent-batching) e [Interface de serviço HTTP](/docs/marketing-api/conversions-api/guides/business-sdk-features#http-service-interface). Estas são as versões mínimas da linguagem para usar esses recursos:

-   PHP >= 7.2
    
-   Node.js >= 7.6.0
    
-   Java >= 8
    
-   Python >= 2.7
    
-   Ruby >= 2
    

A compatibilidade do SDK de Negócios com o PHP 5 está obsoleta desde janeiro de 2019. Atualize para o PHP 7 para poder usar o SDK de Negócios.

Caso a utilização do PHP 5 seja necessária, considere o uso da [implementação do Swagger](#swagger).

[Parâmetros da API de Conversões](/docs/marketing-api/facebook-pixel/server-side-api/parameters)

[](#)

## Verificação de eventos

Depois de enviar eventos, confirme se eles foram recebidos no [Gerenciador de Eventos](https://www.facebook.com/events_manager2/list):

-   Na página **Fontes de dados**, clique no pixel correspondente ao `PIXEL_ID` na sua solicitação `POST`. Para mais informações, veja [Central de Ajuda da Meta para Empresas: Navegar no Gerenciador de Eventos da Meta para eventos do site](https://www.facebook.com/business/help/898185560232180).
    
-   Depois, clique em **Visão geral**. Você verá o número de eventos brutos, correspondidos e atribuídos que recebemos. Em **Método de conexão**, é possível ver o canal usado para enviar o evento.
    

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=964712870677562&version=1765204036)

-   Clique em cada evento para obter informações específicas.
    

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=2778624632464291&version=1765204036)

-   Depois de enviar eventos, será possível verificá-los em até 20 minutos. Agora, você pode enviar eventos do seu servidor.
    

[](#)

## Ferramenta Eventos de Teste

É possível usar o recurso Eventos de Teste do Gerenciador de Eventos para verificar se os seus eventos de servidor estão sendo recebidos corretamente pelo Facebook. Para obter a ferramenta, acesse `Events Manager > Data Sources > Your Pixel > Test Events`.

A ferramenta Eventos de Teste gera um ID de teste. Envie esse ID como um parâmetro `test_event_code` para ver a atividade do evento na janela dos Eventos de Teste.

**Observação:** o campo `test_event_code` deve ser usado apenas para testes. É necessário removê-lo ao enviar sua carga de produção.

Os eventos enviados com `test_event_code` não são abandonados. Eles vão para o Gerenciador de Eventos e são usados para fazer o direcionamento e a mensuração de anúncios.

Veja aqui um exemplo da estrutura da solicitação:

```
{
   "data": [
      {
         "event_name": "ViewContent",
         "event_time": 1764975551,
         "event_id": "event.id.123",
         "event_source_url": "http:\/\/jaspers-market.com",
         "user_data": {
            "client_ip_address": "1.2.3.4",
            "client_user_agent": "test user agent"
         }
      }
   ],
   "test_event_code": "TEST123"
}
```
  

Veja um exemplo de como a solicitação aparece no Explorador da Graph API:

É possível gerar a carga de teste usando a **[ferramenta Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper)**. O código do evento de teste deve ser usado somente para testar a carga.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=2394879260723648&version=1765204036)

Quando a solicitação é enviada, os eventos do servidor aparecem na janela dos Eventos de Teste.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=361879361147147&version=1765204036)

[](#)

## [Opções de processamento de dados](/docs/marketing-apis/data-processing-options) para usuários nos EUA

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

  

Saiba mais sobre as [opções de processamento de dados](/docs/marketing-apis/data-processing-options).

[](#)

## Limites da API

A API de Marketing tem a própria lógica de limitação de volume e está excluída de todos os [limites de volume da Graph API](/docs/graph-api/overview/rate-limiting). Assim, se você fizer uma chamada da API de Marketing, ela não será considerada na limitação da Graph API.

Não há um limite de volume específico para a API de Conversões. As chamadas da API de Conversões são contadas como chamadas da API de Marketing. A única limitação é o máximo de mil eventos que podem ser enviados por vez. Consulte [Enviar solicitações](/docs/marketing-api/facebook-pixel/server-side-api/using-the-api#send) para mais informações.

[Limitação de volume da API de Marketing](/docs/marketing-apis/rate-limiting)

[](#)

## Uso da API do SDK de Negócios no Conversions API Gateway

Este guia ajuda você a navegar pelos recursos avançados do SDK de Negócios da Meta que foram criados especialmente para usuários do Conversions API Gateway. Para um uso básico, consulte a [documentação sobre o Conversions API Gateway](/docs/marketing-api/conversions-api/guides/gateway).

### Enviar eventos à instância do Conversions API Gateway

#### Requisitos

Antes de usar os recursos listados abaixo, é preciso instalar o SDK de Negócios da Meta. Consulte [Introdução ao SDK de Negócios da Meta](/docs/business-sdk/getting-started) ou siga as instruções README exibidas aqui:

-   PHP: [facebook-php-business-sdk](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-php-business-sdk%3Ffbclid%3DIwAR2vJ-EiBUbw1JPu_5euYtEhYs623NXvB1zAJXmG1hLZ-rWJgsgXYfX9Ifc&h=AT1n_IJkS81QlBnXdBF5t3pWMhIbWxUxg4Sm6PAO9z6XHgux7EJcUGW-6s6J_lsgMoyopMP4hvNckxrfyMwCdQK-ddEO5zXWQDfFpiGOZdd2htUlUe63Kb00CuCgMSYU7d5ZCuRmzP5loNY9GesZIaHa_Kas5kM2ptKLAarSAsA)
    
-   Node.js: [facebook-nodejs-business-sdk](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-nodejs-business-sdk%3Ffbclid%3DIwAR0exwvrLWId4V0vgFk0hy7I1BYVM3848uSu9Zy_yAoM1Gps1wEALEiFwiw&h=AT0LAJVEEAKoX9hrqP0gNt03jzS8IAO1adRqAdZbdJln0ifl0XtmoAir3sBuQFYTAyruCqbLeOxHlVvK3uiUxFqFa0UwfXb15GdpI0-t0lnlXiMrOGOCFWLlTY2Nn5nJJ7XVv87GXXZekQgz4BMSA6Dv3PG8bfQizVTWyXAT3AkI_upYMMX0p4e4ksbaD34)
    
-   Java: [facebook-java-business-sdk](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-java-business-sdk%3Ffbclid%3DIwAR1nvNRCWXQxX4SaVTImz3ymEYKDM6Zppdc_Y5Szp34q_HbkOukhhWHxlSQ&h=AT0Z9VNcdeoUjqrY_oCDwn3bEvzDcXI9JEAqel8e6-4BbDcqu-_22P36fpwXStskIK-YXvI1zaP6imjgmXTAD_pOR4CmwNm5gqfwnu2vMK68EXWkI5CIiPmVefvtKse_Em1BiVEhJw-hO87KhC2RByNoulUNyiWN16uY4O5vc1g)
    
-   Python: [facebook-python-business-sdk](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-python-business-sdk%3Ffbclid%3DIwAR3atWm9H8LVmHlMH-mGyfmwLf6WxkUmeG5Yh-h9l144lgNfGW3sRX2wDEg&h=AT2VXxAN_qInBwxYO6UXPLQQ54rQoi6uG91x9rokZO02Pt8oUJoi77Wy1Ye8PEmAl-8vLJptV-XZ25LMctASBOLHHz4jbDjB27TEHktar874aXyitWkOpxX9_esTEQnJQxpNv67KmqP5Z6lcnMfa4j7W2iBF5k7YTV_AdU4U6to)
    
-   Ruby: [facebook-ruby-business-sdk](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-ruby-business-sdk%3Ffbclid%3DIwAR2SZqM8MOMHQQDaO9Urnn3TAqSH9SQOM3u6r3wHcWO_p81cFNVP-KHElsY&h=AT08TogtRlvsz60cGyf-jy0led8bm9OmaOHpiMB6r0AccHlJZsU2fu7No4DKSux12mYPSDSeu9u50NGPi-uw8PGyqhianBFRwaWYA8nrCbEVe19k-IvRJWJCjDdb6BETGpmYTYdRkfIgsipp1nc2jMoZtm6aWA9EmYTLL1UCOtY)
    

No momento, esses recursos estão disponíveis apenas no SDK de Negócios em PHP e Java. As outras linguagens serão implementadas até o final de 2023.

Estas são as versões mínimas para usar os recursos:

PHP >= 7.2

Java >= 8

**Observação**: para desduplicar eventos no ponto de extremidade da API de Conversões, transmita o `eventId` na sua solicitação. Isso ajuda a evitar a exibição de eventos duplicados quando a publicação da API de Conversões está habilitada.

### Formatar os parâmetros `CAPIGatewayIngressRequest`

Parâmetro

Descrição

[`endpointUrl`](#)

string

O ponto de extremidade do Conversions API Gateway para o qual os eventos são enviados. Não será realizada nenhuma validação prévia no parâmetro, apenas a verificação de que se trata de um URL válido.

  

Exemplo: https://test.example.com

  

[`accessKey`](#)

string

Chave de acesso necessária para enviar eventos ao ponto de extremidade de eventos do Conversions API Gateway. Veja as [instruções](/docs/marketing-api/conversions-api/guides/gateway/non-web-server-events) para gerá-la.

### Os setters `CAPIGatewayIngressRequest`

Parâmetro

Descrição

[`setSendToDestinationOnly`](#)

Booliano

Sinalizador booliano que informa se os eventos foram enviados somente para o ponto de extremidade selecionado.

  

Padrão: `False`

  

[`setFilter`](#)

Função CustomEndpointRequest.Filter()

Função de filtro que processa cada evento. Se a lógica de filtragem retornar "true", o evento será transmitido. Caso contrário, os eventos serão descartados. É preciso implementar a função shouldSendEvent na interface que possui o parâmetro Event.

  

Padrão: `Null`

  
  

#### Exemplo de migração: PHP

Para sistemas que já utilizam o SDK de Negócios, basta referenciar o novo CAPIGatewayIngressRequest e anexá-lo ao objeto customEndpoint de eventRequest.

```
// this is the standard event request that we attach events to
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
// pass the events to this event Request object
$event_request->setEvents($events);
$event_request->execute()
```
  

#### Exemplo de migração: Java

Para sistemas que já utilizam o SDK de Negócios, basta referenciar o novo CAPIGatewayIngressRequest e anexá-lo ao objeto customEndpoint de eventRequest.

```
// this is the standard event request that we attach events to


EventRequest eventRequest = new EventRequest(PIXEL_ID, context);


CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
eventRequest.addDataItem(testEvent);
eventRequest.execute();
```

### Opção síncrona

#### Exemplo de código PHP

```
$api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$user_data = (new UserData())
   ->setEmails(array('joe@eg.com'))
   ->setPhones(array('12345678901', '14251234567'))
   ->setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890')
   ->setFbp('fb.1.1558571054389.1098115397');
$event1 = (new Event())
   ->setEventName('Purchase')
   ->setEventId('125')
   ->setEventTime(time())
   ->setEventSourceUrl('http://jaspers-market.com/product/123')
   ->setUserData($user_data);
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute();
print($response->__toString());
```

#### Exemplo de código Java

```
EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
       .email("abc@eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventId("125").eventName("Purchase")
       .eventTime(System.currentTimeMillis() / 1000L)
       .userData(userData)
       .dataProcessingOptions(new String[]{}).setEventId("134423232");
eventRequest.namespaceId("11")
       .uploadId("22222")
       .uploadTag("upload-tag-4")
       .uploadSource("upload-source-4")
       .testEventCode("test-event-code-5")
       .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.execute();
```

### Opção assíncrona

#### Exemplo de código PHP

```
$api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequestAsync($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$capiIngressRequest->setSendToDestinationOnly(true);
$event_request->setCustomEndpoint($capiIngressRequest);
$event1 = (new Event())
   ->setEventName('test Async Event')
   ->setEventId('134423232')
   ->setEventTime(time())
   ->setEventSourceUrl('http://jaspers-market.com/product/123');
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute()->wait();
```

#### Exemplo de código Java

```
EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
       .email("abc@eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
capiSyncRequest.setSendToDestinationOnly(true);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventName("test Async Event")
       .eventTime(System.currentTimeMillis() / 1000L)
       .userData(userData)
       .dataProcessingOptions(new String[]{}).setEventId("134423232");
eventRequest.namespaceId("11222")
       .uploadId("22222")
       .uploadTag("upload-tag-4")
       .uploadSource("upload-source-4")
       .testEventCode("test-event-code-5")
       .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.executeAsync();
```

### Funcionalidade de filtro

#### Exemplo de código PHP

```
lass APIFilter implements Filter {
   public function shouldSendEvent(Event $event): bool
   {
       if ($event->getEventId() === '125') {
           return false;
       }
       return true;
   }
}
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$capiIngressRequest->setFilter(new APIFilter());
```

#### Exemplo de código Java

```
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);


capiSyncRequest.setFilter(new CustomEndpointRequest.Filter() {
   @Override
   public boolean shouldSendEvent(Event event) {
   if (event.getEventId().equals("125")) {
       return true;
   }
   return false;
}
});
```

[](#)

## Saiba mais

-   [Conversions API Gateway](/docs/marketing-api/conversions-api/guides/gateway)
    
-   [Conversions API Gateway para várias contas](/docs/marketing-api/conversions-api/guides/gateway-multiple-accounts)
    
-   [Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices)
    

[](#)