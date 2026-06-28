---
title: "Recursos do SDK de Negócios para a API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/business-sdk-features"
scraped_at: "2026-02-01T15:46:25.121Z"
---

# Recursos do SDK de Negócios da Meta para a API de Conversões

Este guia ajuda você a navegar pelos recursos avançados do SDK de Negócios da Meta que foram criados especialmente para usuários da API de Conversões. [Solicitações assíncronas](#asynchronous-requests), [Lotes simultâneos](#concurrent-batching) e [Interface de serviço HTTP](#http-service-interface) estão disponíveis nos SDKs PHP, NodeJS, Java, Python e Ruby. Para um uso básico da API de Conversões, consulte a principal [documentação sobre a API de Conversões](/docs/marketing-api/conversions-api/using-the-api#send).

Com o [SDK de Negócios da Meta](/docs/business-sdk/), você pode acessar nosso pacote de APIs de negócios e desenvolver soluções únicas e personalizadas para suas empresas e os respectivos clientes. Uma das APIs disponíveis para usuários do SDK é a [API de Conversões](/docs/marketing-api/conversions-api).

## Requisitos

Antes de usar os recursos listados abaixo, é preciso instalar o SDK de Negócios da Meta. Consulte [Introdução ao SDK de Negócios da Meta](/docs/business-sdk/getting-started) ou siga as instruções `README` exibidas aqui:

-   PHP: [`facebook-php-business-sdk`](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-php-business-sdk&h=AT3bCB4beubvrQI_lFbdEBUw3alPsPxIscmsCIuBgbNqArlWx921q97rqT2ezbpzOdSh0zZQTpmlI4DDjC07w0xLXvv5YNpjZFahVC2jBMiO_zInH43U4rLzX86BgnmrZVpSS8myV4tZfw7TOqhZJm9uoP6yyQ6HotrJmDFNf9Q)
    
-   Node.js: [`facebook-nodejs-business-sdk`](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-nodejs-business-sdk&h=AT0RoddDxwBHJ1QfGjYZpFtvSwlJb6GshAROKtwH40hRqHIhTspVs8zG1tNHxxqheIBfLvAxvETdQrGCqT3MaXFXtyQ9v0wI9nuAScZT_1HvQqB7rqpYMRCSkqQ6ae79xSXkBGSLhJkZj-orR_t5ts2jFliBC7ic40iBr00DDcY)
    
-   Java: [`facebook-java-business-sdk`](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-java-business-sdk&h=AT3uccUh7MrF5vtG884eikoQhJUdbWRWPFwJthFGwCEs8fOUYCv-_1T2dQ7tc2Vgo1_Woxfpaq6YaOUM5wiaRYtiJd5b8jn7z92hMSLEBcVVa9hvWd5xFdUFwDbxYD6rsb2nYMWf4jSu7LHrENHJjQsz7q1fa9J-31znhKOmEUM)
    
-   Python: [`facebook-python-business-sdk`](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-python-business-sdk&h=AT3co2D3QuIKsMVkC9v6O92S7RB98sPl4EYRzSrvqlVgry2U_0voQp5Z6ao18IbfZdRegNK8NKtBrnV99PPS3Epmqs-GJJczTA-64QpCxiE2gOdPTWolDui5bRO8FV-0La7Sfq_-aG5BrGotRAA_sNE7C_xaS4yEYLnYuFB67cY)
    
-   Ruby: [`facebook-ruby-business-sdk`](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-ruby-business-sdk&h=AT1oMikqyFJF5xTfZLrRkJFInGXIvgZMc3_l-7Vi0luAdDpk53MvKf_F0CbAATrUzWGgbXE5z6CAF8AdNzulw3cIUVayNzLcfXZIOMjKlc3kMzNlyfhrerxQH6MTiEanfm7e8bQL10XGmu50cfAH5ogE3s6qG-ak9tXEshTY3nw)
    

Estas são as versões mínimas da linguagem para usar esses recursos:

-   PHP >= 7.2
    
-   Node.js >= 7.6.0
    
-   Java >= 8
    
-   Python >= 2.7
    
-   Ruby >= 2
    

[](#)

## Solicitações assíncronas

Use este recurso se você não quiser bloquear a execução do seu programa para aguardar a conclusão de uma solicitação. Com essa abordagem, você faz a solicitação e recebe um sinal do servidor quando ela é concluída. Enquanto você aguarda a resposta, o programa pode continuar em execução.

Com as solicitações assíncronas, você pode utilizar seus recursos de forma mais eficiente, o que leva a uma diminuição no tempo de resposta do servidor. Isso também permite que você tenha mais controle sobre como seu programa lida com os erros vindos do servidor e integre facilmente o SDK em código que já funciona de maneira assíncrona.

Para implementar solicitações assíncronas, veja amostras de código nas seguintes linguagens:

PHP SDKPython SDKNode.js SDKJava SDKRuby SDK

```
use FacebookAds\Api;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequest;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\UserData;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;

$pixel_id = getenv('PIXEL_ID');
$access_token = getenv('ACCESS_TOKEN');

if (empty($pixel_id) || empty($access_token)) {
  throw new Exception('Missing required test config. Got pixel_id: "' . $pixel_id . '", access_token: "' . $access_token . '"');
}

Api::init(null, null, $access_token, false);

function create_events($num) {
  $user_data = (new UserData())
    ->setEmail('joe' . $num . '@eg.com')
    ->setClientIpAddress($_SERVER['REMOTE_ADDR'])
    ->setClientUserAgent($_SERVER['HTTP_USER_AGENT']);

  $custom_data = (new CustomData())
    ->setCurrency('usd')
    ->setValue(123.45);

  $event = (new Event())
    ->setEventName('Purchase')
    ->setEventTime(time())
    ->setEventSourceUrl('http://jaspers-market.com/product/123')
    ->setUserData($user_data)
    ->setCustomData($custom_data)
    ->setActionSource(ActionSource::WEBSITE);

  return array($event);
}

function create_async_request($pixel_id, $num) {
  $async_request = (new EventRequestAsync($pixel_id))
    ->setEvents(create_events($num));
  return $async_request->execute()
    ->then(
      null,
      function (RequestException $e) {
        print(
          "Error!!!\n" .
          $e->getMessage() . "\n" .
          $e->getRequest()->getMethod() . "\n"
        );
      }
    );
}


// Async request:
$promise = create_async_request($pixel_id, 2);

print("Request 1 state: " . $promise->getState() . "\n");
print("Async request - OK.\n");


// Async request with wait:
$promise = create_async_request($pixel_id, 3);

$response2 = $promise->wait();
print("Request 2: " . $response2->getBody() . "\n");
print("Async request with wait - OK.\n");


// Multiple async requests:
$promises = [
  "Request 3" => create_async_request($pixel_id, 4),
  "Request 4" => create_async_request($pixel_id, 5),
];

$response3 = Promise\unwrap($promises);
foreach ($response3 as $request_name => $response) {
  print($request_name . ": " . $response->getBody()."\n");
}
print("Async - Multiple async requests OK.\n");
```

```
import asyncio
import time
import pprint
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request import EventRequest
from facebook_business.adobjects.serverside.event_request_async import EventRequestAsync
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def create_events(num):
    user_data = UserData(
        email="joe%s@eg.com" % num,
        client_ip_address=request.META.get('REMOTE_ADDR'),
        client_user_agent=request.headers['User-Agent']
    )
    custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
    event = Event(
        event_name="Purchase",
        event_time=int(time.time()),
        user_data=user_data,
        custom_data=custom_data,
        data_processing_options=[],
        event_source_url='http://jaspers-market.com/product/123',
        action_source=ActionSource.WEBSITE
    )
    return [event]

async def execute_async_request(pixel_id, num):
    event_request_async = EventRequestAsync(
        events=create_events(num),
        pixel_id=pixel_id
    )
    return await event_request_async.execute()

async def run_tasks(pixel_id):
    tasks = []
    for i in range(1,3):
        tasks.append(execute_async_request(pixel_id, i))

    completed = await asyncio.gather(*tasks)
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(completed)

if __name__ == '__main__':
    pixel_id = os.getenv("PIXEL_ID")
    access_token = os.getenv("ACCESS_TOKEN")
    if not (pixel_id and access_token):
        raise Exception("Missing required test config. Got pixel_id: '{pixel_id}', access_token: '{access_token}'".format(
            pixel_id=pixel_id,
            access_token=access_token
        ))
    FacebookAdsApi.init(access_token=access_token, crash_log=False)

    asyncio.run(run_tasks(pixel_id))
    print("Create EventRequest Async - OK.")
```

```
const bizSdk = require('facebook-nodejs-business-sdk');
const process = require('process');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;
void async function() {
  try {
    if (access_token === undefined || pixel_id === undefined) {
      throw new Error(`"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`)
    }
    const api = bizSdk.FacebookAdsApi.init(access_token);

    let current_timestamp = Math.floor(new Date() / 1000);

    const userData1 = (new UserData())
      .setEmail('joe1@eg.com')
      .setClientIpAddress(request.connection.remoteAddress)
      .setClientUserAgent(request.headers['user-agent']);

    const customData1 = (new CustomData())
      .setCurrency('usd')
      .setCustomProperties({custom1: 'value2'})
      .setValue(123.45);

    const serverEvent1 = (new ServerEvent())
      .setEventName('Purchase')
      .setEventTime(current_timestamp)
      .setUserData(userData1)
      .setCustomData(customData1)
      .setEventSourceUrl('http://jaspers-market.com/product/123')
      .setActionSource('website');

    const eventRequest1 = (new EventRequest(access_token, pixel_id))
      .setEvents([serverEvent1]);

    const userData2 = (new UserData())
      .setEmail('joe2@eg.com')
      .setClientIpAddress(request.connection.remoteAddress)
      .setClientUserAgent(request.headers['user-agent']);

    const customData2 = (new CustomData())
      .setCurrency('usd')
      .setCustomProperties({custom1: 'value2'})
      .setValue(123.45);

    const serverEvent2 = (new ServerEvent())
      .setEventName('Purchase')
      .setEventTime(current_timestamp)
      .setUserData(userData2)
      .setCustomData(customData2)
      .setEventSourceUrl('http://jaspers-market.com/product/123')
      .setActionSource('website');

    const eventRequest2 = (new EventRequest(access_token, pixel_id))
      .setEvents([serverEvent2]);

    Promise.all([
      eventRequest1.execute(),
      eventRequest2.execute()
    ]).then(response => {
      console.log('Execute 2 Requests OK. Response: ', response);
    }, err => {
      console.log('Error: ', err);
    });
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}();
```

```
import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.Event;
import com.facebook.ads.sdk.serverside.EventRequest;
import com.facebook.ads.sdk.serverside.EventResponse;
import com.facebook.ads.sdk.serverside.UserData;
import com.facebook.ads.sdk.serverside.CustomData;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CONVERSIONS_API_EVENT_CREATE_ASYNC {
  public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
  public static final String PIXEL_ID = System.getenv("PIXEL_ID");

  private static EventRequest getEventRequest(APIContext context, int num) {
    UserData userData = new UserData()
      .email(String.format("joe%s@eg.com", num))
      .clientIpAddress(clientIpAddress)
      .clientUserAgent(clientUserAgent);

    HashMap<String,String> customProperties = new HashMap<>();
    customProperties.put("custom1", "value2");

    CustomData customData = new CustomData()
      .currency("usd")
      .customProperties(customProperties)
      .value(123.45F);

    Event pageViewEvent = new Event();
    pageViewEvent.eventName("Purchase")
      .eventTime(System.currentTimeMillis() / 1000L)
      .userData(userData)
      .customData(customData)
      .eventSourceUrl("http://jaspers-market.com/product/123")
      .actionSource(ActionSource.website);

    EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
    eventRequest.addDataItem(pageViewEvent);

    return eventRequest;
  }

  private static void run() throws Exception {
    if (ACCESS_TOKEN == null || PIXEL_ID == null) {
      throw new Exception(String.format("Missing required test config. Got pixel_id: '%s', access_token: '%s'", PIXEL_ID, ACCESS_TOKEN));
    }
    APIContext context = new APIContext(ACCESS_TOKEN);
    context.setLogger(System.out);

    EventRequest asyncRequest = getEventRequest(context, 1);
    final ListenableFuture<EventResponse> requestFuture = asyncRequest.executeAsync();
    EventResponse asyncResponse = requestFuture.get();
    System.out.println(String.format("Async Request - OK: %s", asyncResponse));

    List<ListenableFuture<EventResponse>> eventFutures = new ArrayList<>();
    eventFutures.add(getEventRequest(context, 2).executeAsync());
    eventFutures.add(getEventRequest(context, 3).executeAsync());
    eventFutures.add(getEventRequest(context, 4).executeAsync());
    List<EventResponse>
```

```
require 'concurrent'
require 'facebook_ads'
require 'pp'

ACCESS_TOKEN = ENV['ACCESS_TOKEN']
PIXEL_ID = ENV['PIXEL_ID']
unless ACCESS_TOKEN && PIXEL_ID
    raise Exception.new("Missing required test config. Got pixel_id: '#{PIXEL_ID}', access_token: '#{ACCESS_TOKEN}'")
end

FacebookAds.configure do |config|
    config.access_token = ACCESS_TOKEN
end

def get_events(num)
    user_data = FacebookAds::ServerSide::UserData.new(
        email: 'joe#{num}@eg.com',
        client_ip_address: request.remote_ip,
        client_user_agent: request.user_agent
    )

    custom_data = FacebookAds::ServerSide::CustomData.new(
        currency: 'usd',
        value: 123.45
    )

    event = FacebookAds::ServerSide::Event.new(
        event_name: 'Purchase',
        event_time: Time.now.to_i,
        user_data: user_data,
        custom_data: custom_data,
        event_source_url: 'http://jaspers-market.com/product/123',
        action_source: 'website'
    )

    [event]
end

def get_event_request_async(num)
    FacebookAds::ServerSide::EventRequestAsync.new(
        pixel_id: PIXEL_ID,
        events: get_events(num)
    )
end

def main
    request = get_event_request_async(1)
    response = request.execute.value!
    print "Response: #{response}\n"
    print "EventRequest async single - OK.\n"

    promises = (2..3).map {|num| get_event_request_async(num).execute }
    responses = Concurrent::Promise.zip(*promises)
        .execute
        .value!
    print "Responses:\n"
    pp responses
    print "EventRequest async multi - OK.\n"
end

main
```

[](#)

## Lotes simultâneos

Os lotes simultâneos alavancam solicitações assíncronas para aumentar a taxa de transferência de dados utilizando recursos de forma mais eficiente. Você pode criar solicitações em lote para apoiar casos de uso como solicitação de eventos de funcionários, [trabalhos cron](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCron&h=AT0r4QZfpaTdCJmfo8WhJ3PDNjXCC2QN_nH6vx73qEqe0lOdUI_bP8HZfqRn8uQ1DXsI0vmDs4qZ1BV9IYWAZhLn7G4rIah9nWjLZCBlbIAY7yQGc8hMINk2QxDOm6-Eyx88AwZexQgp95y51V7COjkYCdOzEQzJlcbeo-Go2Es) e muito mais.

Você pode escolher entre os seguintes métodos `BatchProcessor`:

Método

Quando usar

`processEvents`

Use-o para processar eventos que têm os mesmos campos `EventRequest` de nível superior, como `namespace_id` e `upload_tag`.

`processEventsGenerator`

Este é o gerador subjacente de `processEvents`.

  

Também pode ser usado para processar eventos que têm os mesmos campos `EventRequest` de nível superior, como `namespace_id` e `upload_tag`.

`processEventRequests`

Use-o para processar `EventRequests` simultaneamente quando quiser especificar diferentes campos `EventRequest` por solicitação.

`processEventRequestsGenerator`

Este é o gerador subjacente de `processEventRequests`.

  

Ele também pode ser usado para processar `EventRequests` simultaneamente quando você quiser especificar diferentes campos `EventRequest` por solicitação.

Ao utilizar os lotes simultâneos, os eventos devem ser enviados o mais próximo possível do tempo real. Para obter mais informações, consulte [Implementação de ponta a ponta da API de Conversões](/docs/marketing-api/fmp-tpm-guides/conversions-api/#sharing-frequency).

Se estiver utilizando os SDKs PHP, Python ou Ruby, os métodos descritos anteriormente exigirão objeto(s) EventRequestAsync em vez de um EventRequest.

Para implementar os lotes simultâneos, veja abaixo exemplos de código nas seguintes linguagens:

PHP SDKPython SDKNode.js SDKJava SDKRuby SDK

```
use FacebookAds\Api;
use FacebookAds\Object\ServerSide\BatchProcessor;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\UserData;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;

$pixel_id = getenv('PIXEL_ID');
$access_token = getenv('ACCESS_TOKEN');

if (empty($pixel_id) || empty($access_token)) {
  throw new Exception('Missing required test config. Got pixel_id: "' . $pixel_id . '", access_token: "' . $access_token . '"');
}

$api = Api::init(null, null, $access_token, false);

function create_event($i) {
  $user_data = (new UserData())
    ->setEmail('joe' . $i . '@eg.com')
    ->setClientIpAddress($_SERVER['REMOTE_ADDR'])
    ->setClientUserAgent($_SERVER['HTTP_USER_AGENT']);

  $custom_data = (new CustomData())
    ->setCurrency('usd')
    ->setValue(123.45);

  return (new Event())
    ->setEventName('Purchase')
    ->setEventTime(time())
    ->setEventSourceUrl('http://jaspers-market.com/product/' . $i)
    ->setUserData($user_data)
    ->setCustomData($custom_data)
    ->setActionSource(ActionSource::WEBSITE);
}

function create_events($num) {
  $events = [];

  for ($i = 0; $i < $num; $i++) {
    $events[] = create_event($i);
  }

  return $events;
}

function create_async_requests($pixel_id, $num) {
  $requests = [];

  for ($i = 0; $i < $num; $i++) {
    $requests[] = (new EventRequestAsync($pixel_id))
      ->setUploadTag('test-tag-2')
      ->setEvents([create_event($i)]);
  }

  return $requests;
}

function run($pixel_id) {
  print("Started CONVERSIONS_API_EVENT_CREATE_BATCH...\n");
  $batch_processor = new BatchProcessor($pixel_id, 2, 2);

  // processEvents
  $events = create_events(11);
  $batch_processor->processEvents(array('upload_tag' => 'test-tag-1'), $events);

  // processEventRequests
  $requests = create_async_requests($pixel_id, 5);
  $batch_processor->processEventRequests($requests);

  // processEventsGenerator
  $process_events_generator = $batch_processor->processEventsGenerator(array('upload_tag' => 'test-tag-1'), $events);
  foreach ($process_events_generator as $promises) {
    try {
      Promise\unwrap($promises);
    } catch (RequestException $e) {
      print('RequestException: ' . $e->getResponse()->getBody()->getContents() . "\n");
      throw $e;
    } catch (\Exception $e) {
      print("Exception:\n");
      print_r($e);
      throw $e;
    }
  }

  // processEventRequestsGenerator
  $requests = create_async_requests($pixel_id, 5);
  $process_event_requests_generator = $batch_processor->processEventRequestsGenerator($requests);
  foreach ($process_event_requests_generator as $promises) {
    try {
      Promise\unwrap($promises);
    } catch (RequestException $e) {
      print('RequestException: ' . $e->getResponse()->getBody()->getContents() . "\n");
      throw $e;
    } catch (\Exception $e) {
      print("Exception:\n");
      print_r($e);
      throw $e;
    }
  }
  print("Finished CONVERSIONS_API_EVENT_CREATE_BATCH with no errors.\n");
}

run($pixel_id);
```

```
import asyncio
import time
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.batch_processor import BatchProcessor
from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request_async import EventRequestAsync
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def get_event(num):
    user_data = UserData(
        email="joe%s@eg.com" % num,
        client_ip_address=request.META.get('REMOTE_ADDR'),
        client_user_agent=request.headers['User-Agent']
    )
    custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
    event = Event(
        event_name="Purchase",
        event_time=int(time.time()),
        user_data=user_data,
        custom_data=custom_data,
        data_processing_options=[],
        event_source_url='http://jaspers-market.com/product/123',
        action_source=ActionSource.WEBSITE
    )
    return event

def get_events(num):
    events = []
    for i in range(num):
        events.append(get_event(num))
    return events

def get_event_requests_async(num):
    event_requests_async = []
    for i in range(num):
        event_requests_async.append(
            EventRequestAsync(
                events=[get_event(i)],
                pixel_id=pixel_id
            )
        )
    return event_requests_async

def run_process_event_requests():
    batch_processor = BatchProcessor(2, 2)
    event_requests_async = get_event_requests_async(3)
    batch_processor.process_event_requests(event_requests_async)

async def run_process_event_requests_generator():
    batch_processor = BatchProcessor(3, 2)
    event_requests_async = get_event_requests_async(7)
    generator = batch_processor.process_event_requests_generator(event_requests_async)
    async for batch_responses in generator:
        print(batch_responses)

def run_process_events():
    batch_processor = BatchProcessor(2, 2)
    event_request_async_to_clone = EventRequestAsync(pixel_id=pixel_id, events=[])
    events = get_events(3)
    batch_processor.process_events(event_request_async_to_clone, events)

async def run_process_events_generator():
    batch_processor = BatchProcessor(3, 2)
    event_request_async_to_clone = EventRequestAsync(pixel_id=pixel_id, events=[])
    events = get_events(10)
    generator = batch_processor.process_events_generator(event_request_async_to_clone, events)
    async for batch_responses in generator:
        print(batch_responses)

if __name__ == '__main__':
    pixel_id = os.getenv("PIXEL_ID")
    access_token = os.getenv("ACCESS_TOKEN")
    if not (pixel_id and access_token):
        raise Exception("Missing required test config. Got pixel_id: '{pixel_id}', access_token: '{access_token}'".format(
            pixel_id=pixel_id,
            access_token=access_token
        ))
    FacebookAdsApi.init(access_token=access_token, crash_log=False)

    run_process_event_requests()
    print("BatchProcessor process_event_requests - OK.")

    asyncio.run(run_process_event_requests_generator())
    print("BatchProcessor process_event_requests_generator - OK.")

    run_process_events()
    print("BatchProcessor process_events - OK.")

    asyncio.run(run_process_events_generator())
    print("BatchProcessor process_events_generator - OK.")
```

```
const bizSdk = require('facebook-nodejs-business-sdk');
const process = require('process');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;
const BatchProcessor = bizSdk.BatchProcessor;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;

function createEvents(num) {
  let events = [];
  for (let i = 0; i < num; i++) {
    let current_timestamp = Math.floor(new Date() / 1000);

    const user_data = (new UserData())
      .setEmail(`joe${i}@eg.com`)
      .setClientIpAddress(request.connection.remoteAddress)
      .setClientUserAgent(request.headers['user-agent']);

    const custom_data = (new CustomData())
      .setCurrency('usd')
      .setCustomProperties({custom1: 'value2'})
      .setValue(123.45);

    const server_event = (new ServerEvent())
      .setEventName('Purchase')
      .setEventTime(current_timestamp)
      .setUserData(user_data)
      .setCustomData(custom_data)
      .setEventSourceUrl('http://jaspers-market.com/product/123')
      .setActionSource('website');

    events.push(server_event);
  }

  return events;
}

function createEventRequests(num, access_token, pixel_id) {
  let event_requests = [];
  for (let i = 0; i < num; i++) {
    const events = createEvents(2);
    const event_request = (new EventRequest(access_token, pixel_id))
      .setEvents(events);
    event_requests.push(event_request);
  }

  return event_requests;
}

void async function() {
  try {
    if (access_token === undefined || pixel_id === undefined) {
      throw new Error(`"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`)
    }
    const api = bizSdk.FacebookAdsApi.init(access_token);

    const batch_processor = new BatchProcessor(2, 2);

    // processEvents
    const events1 = createEvents(5);
    const event_request = (new EventRequest(access_token, pixel_id));
    batch_processor.processEvents(event_request, events1);
    console.log('BatchProcessor.processEvents - OK.');

    // processEventRequests
    const event_requests1 = createEventRequests(3, access_token, pixel_id);
    batch_processor.processEventRequests(event_requests1);
    console.log('BatchProcessor.processEventRequests - OK.');

    // processEventsGenerator
    const events2 = createEvents(5);
    const eventsGenerator = batch_processor.processEventsGenerator(event_request, events2);
    while (true) {
      const batch = eventsGenerator.next().value;
      if (!batch || batch.length === 0) {
        eventsGenerator.return();
        break;
      }

      await Promise.all(batch).then(response => {
        console.log('processEventsGenerator Events Received: ', response.map(r => r.events_received))
      }).catch(response => {
        console.log('processEventsGenerator Error: ', response);
      });
    }

    // processEventRequestsGenerator
    const event_requests2 = createEventRequests(3, access_token, pixel_id);
    const eventRequestsGenerator = batch_processor.processEventRequestsGenerator(event_requests2);
    while (true) {
      const batch = eventRequestsGenerator.next().value;
      if (!batch || batch.length === 0) {
        eventRequestsGenerator.return();
        break;
      }

      await Promise.all(batch).then(response => {
        console.log('processEventRequestsGenerator Events Received: ', response.map(r => r.events_received))
      }).catch(response => {
        console.log('processEventRequestsGenerator Error: ', response);
      });
    }
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}();
```

```
import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.*;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

class CONVERSIONS_API_EVENT_CREATE_BATCH {
  public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
  public static final String PIXEL_ID = System.getenv("PIXEL_ID");

  public static void run() throws Exception {
    if (ACCESS_TOKEN == null || PIXEL_ID == null) {
      throw new Exception(String.format("Missing required test config. Got pixel_id: '%s', access_token: '%s'", PIXEL_ID, ACCESS_TOKEN));
    }

    APIContext context = new APIContext(ACCESS_TOKEN);
    context.setLogger(System.out);

    BatchProcessor batchProcessor = new BatchProcessor(2, 3);

    List
```

```
require 'concurrent'
require 'facebook_ads'

def get_event(num)
    user_data = FacebookAds::ServerSide::UserData.new(
        email: 'joe#{num}@eg.com',
        client_ip_address: request.remote_ip,
        client_user_agent: request.user_agent
    )

    custom_data = FacebookAds::ServerSide::CustomData.new(
        currency: 'usd',
        value: 123.45
    )

    FacebookAds::ServerSide::Event.new(
        event_name: 'Purchase',
        event_time: Time.now.to_i,
        user_data: user_data,
        custom_data: custom_data,
        event_source_url: 'http://jaspers-market.com/product/123',
        action_source: 'website'
    )
end

def get_events(num)
    num.times.map do |i|
        get_event(i)
    end
end

def get_event_request_async(pixel_id, num)
    FacebookAds::ServerSide::EventRequestAsync.new(
        pixel_id: pixel_id,
        events: [get_event(num)]
    )
end

def get_event_requests_async(pixel_id, num)
    num.times.map do |i|
        get_event_request_async(pixel_id, i)
    end
end

def run_process_event_requests(pixel_id)
    batch_processor = FacebookAds::ServerSide::BatchProcessor.new(2, 2)
    event_requests_async = get_event_requests_async(pixel_id, 3)
    batch_processor.process_event_requests(event_requests_async)
end

def run_process_event_requests_generator(pixel_id)
    batch_processor = FacebookAds::ServerSide::BatchProcessor.new(3, 2)
    event_requests_async = get_event_requests_async(pixel_id, 7)
    generator = batch_processor.process_event_requests_generator(event_requests_async)
    generator.each do |batch|
        responses = Concurrent::Promise.zip(*batch).execute.value!
        print "#{responses}\n"
    end
end

def run_process_events(pixel_id)
    batch_processor = FacebookAds::ServerSide::BatchProcessor.new(2, 2)
    event_request_async_to_clone = FacebookAds::ServerSide::EventRequestAsync.new(pixel_id: pixel_id)
    events = get_events(3)
    batch_processor.process_events(event_request_async_to_clone, events)
end

def run_process_events_generator(pixel_id)
    batch_processor = FacebookAds::ServerSide::BatchProcessor.new(3, 2)
    event_request_async_to_clone = FacebookAds::ServerSide::EventRequestAsync.new(pixel_id: pixel_id)
    events = get_events(10)
    generator = batch_processor.process_events_generator(event_request_async_to_clone, events)
    generator.each do |batch|
        responses = Concurrent::Promise.zip(*batch).execute.value!
        print "#{responses}\n"
    end
end

def main
    access_token = ENV['ACCESS_TOKEN']
    pixel_id = ENV['PIXEL_ID']
    unless access_token && pixel_id
        raise Exception.new("Missing required test config. Got pixel_id: '#{pixel_id}', access_token: '#{access_token}'")
    end

    FacebookAds.configure do |config|
      config.access_token = access_token
    end

    run_process_event_requests(pixel_id)
    print "BatchProcessor process_event_requests - OK.\n"

    run_process_event_requests_generator(pixel_id)
    print "BatchProcessor process_event_requests_generator - OK.\n"

    run_process_events(pixel_id)
    print "BatchProcessor process_events - OK.\n"

    run_process_events_generator(pixel_id)
    print "BatchProcessor process_events_generator - OK.\n"
end

main
```

[](#)

## Interface de serviço HTTP

Use a Interface de serviço HTTP se tiver um conjunto específico de requisitos para a camada de serviço HTTP. Com esse recurso, é possível substituir o serviço HTTP padrão do SDK de Negócios e implementar seu próprio serviço personalizado com o método ou a biblioteca da sua preferência.

Para implementar sua própria Interface de serviço HTTP, veja abaixo exemplos de código nas seguintes linguagens:

PHP SDKPython SDKNode.js SDKJava SDKRuby SDK

```
require __DIR__ . '/../vendor/autoload.php';

use FacebookAds\Api;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequest;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\HttpServiceClientConfig;
use FacebookAds\Object\ServerSide\UserData;

// Imports used by the TestHttpClient class
use FacebookAds\Object\ServerSide\HttpServiceInterface;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\Psr7\MultipartStream;
use GuzzleHttp\Psr7\Request;

$pixel_id = getenv('PIXEL_ID');
$access_token = getenv('ACCESS_TOKEN');

if (empty($pixel_id) || empty($access_token)) {
  throw new Exception('Missing required test config. Got pixel_id: "' . $pixel_id . '", access_token: "' . $access_token . '"');
}

function run($access_token, $pixel_id) {
  Api::init(null, null, $access_token, false);

  $request1 = getEventRequest($pixel_id, 1);
  $request1->setHttpClient(new TestHttpClient());

  $response1 = $request1->execute();

  print("Response: " . $response1->getBody() . "\n");
  print("Custom HTTP Service Request 1 - OK.\n");

  // Alternatively, you can set the access_token and the HTTP Client on the HttpServiceClientConfig
  Api::init(null, null, null, false);
  HttpServiceClientConfig::getInstance()->setClient(new TestHttpClient());
  HttpServiceClientConfig::getInstance()->setAccessToken($access_token);

  $request2 = getEventRequest($pixel_id, 2);

  $response2 = $request2->execute();

  print("Response: " . $response2->getBody() . "\n");
  print("Custom HTTP Service Request 2 - OK.\n");
}

function getEventRequest($pixel_id, $num) {
  $user_data = (new UserData())
    ->setEmail('joe' . $num . '@eg.com')
    ->setClientIpAddress($_SERVER['REMOTE_ADDR'])
    ->setClientUserAgent($_SERVER['HTTP_USER_AGENT']);

  $custom_data = (new CustomData())
    ->setCurrency('usd')
    ->setValue(123.45);

  $event = (new Event())
    ->setEventName('Purchase')
    ->setEventTime(time())
    ->setEventSourceUrl('http://jaspers-market.com/product/123')
    ->setUserData($user_data)
    ->setCustomData($custom_data)
    ->setActionSource(ActionSource::WEBSITE);

  return (new EventRequest($pixel_id))
    ->setEvents(array($event));
}

class TestHttpClient implements HttpServiceInterface {
  public function executeRequest($url, $method, array $curl_options, array $headers, array $params) {
    $multipart_contents = [];

    foreach ($params as $key => $value) {
      if ($key === 'data') {
        $multipart_contents[] = [
          'name' => $key,
          'contents' => \GuzzleHttp\json_encode($value),
          'headers' => array('Content-Type' => 'multipart/form-data'),
        ];
      } else {
        $multipart_contents[] = [
          'name' => $key,
          'contents' => $value,
          'headers' => array('Content-Type' => 'multipart/form-data'),
        ];
      }
    }

    $body = new MultipartStream($multipart_contents);
    $request = new Request($method, $url, $headers, $body);

    $handler_stack = HandlerStack::create(
      new CurlHandler(['options' => $curl_options])
    );

    $client = new Client(['handler' => $handler_stack]);
    return $client->send($request);
  }
}

run($access_token, $pixel_id);
```

```
import time
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request import EventRequest
from facebook_business.adobjects.serverside.http_service_interface import HttpServiceInterface
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def run(pixel_id, access_token):
    user_data = UserData(
        email="joe@eg.com",
        client_ip_address=request.META.get('REMOTE_ADDR'),
        client_user_agent=request.headers['User-Agent']
    )
    custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
    event = Event(
        event_name="Purchase",
        event_time=int(time.time()),
        user_data=user_data,
        custom_data=custom_data,
        data_processing_options=[],
        event_source_url='http://jaspers-market.com/product/123',
        action_source=ActionSource.WEBSITE
    )
    custom_http_client = CustomHttpClient()
    event_request = EventRequest(
        events=[event],
        pixel_id=pixel_id,
        http_client=custom_http_client,
        access_token=access_token
    )

    event_response = event_request.execute()
    print(event_response)
    print("Custom HTTP Service Request - OK.")

class CustomHttpClient(HttpServiceInterface):
    def execute(self, url, method, request_options, headers, params):
        import requests
        from facebook_business.adobjects.serverside.event_response import EventResponse

        response = requests.request(method, url, json=params, headers=headers).json()
        return EventResponse(
            events_received=response['events_received'],
            fbtrace_id=response['fbtrace_id'],
            messages=response['messages']
        )

if __name__ == '__main__':
    pixel_id = os.getenv("PIXEL_ID")
    access_token = os.getenv("ACCESS_TOKEN")
    if not (pixel_id and access_token):
        raise Exception("Missing required test config. Got pixel_id: '{pixel_id}', access_token: '{access_token}'".format(
            pixel_id=pixel_id,
            access_token=access_token
        ))

    run(pixel_id, access_token)
```

```
const bizSdk = require('facebook-nodejs-business-sdk');
const https = require('https');
const process = require('process');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const EventResponse = bizSdk.EventResponse;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;

// Implements the HttpServiceInterface
class E2EHttpService {
  executeRequest(url, method, headers, params) {
    return new Promise((resolve, reject) => {
      const options = {
        port: 443,
        method,
        headers,
      }
      let body = '';
      const request = https.request(url, options, response => {
        response.on('data', chunk => {
          body += chunk.toString();
        });
        response.on('end', () => {
          return resolve(body);
        });
      }).on('error', reject);

      request.write(JSON.stringify(params));
      request.end();
    });
  }
}

void async function() {
  try {
    if (access_token === undefined || pixel_id === undefined) {
      throw new Error(`"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`)
    }
    const userData = (new UserData())
      .setEmail('joe@eg.com')
      .setClientIpAddress(request.connection.remoteAddress)
      .setClientUserAgent(request.headers['user-agent']);

    const customData = (new CustomData())
      .setCurrency('usd')
      .setCustomProperties({custom1: 'value2'})
      .setValue(123.45);

    const serverEvent = (new ServerEvent())
      .setEventName('Purchase')
      .setEventTime(Math.floor(new Date() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl('http://jaspers-market.com/product/123')
      .setActionSource('website');

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setHttpService(new E2EHttpService())
      .setEvents(eventsData);

    eventRequest.execute().then(response => {
      console.log('Custom HTTP Service Request OK. Response: ', response);
    }, err => {
      console.log('Error: ', err);
    });
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}();
```

```
import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class CONVERSIONS_API_EVENT_CREATE_CUSTOM_HTTP_SERVICE {
  public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
  public static final String PIXEL_ID = System.getenv("PIXEL_ID");

  public static void run() throws Exception {
    if (ACCESS_TOKEN == null || PIXEL_ID == null) {
      throw new Exception(String.format("Missing required test config. Got pixel_id: '%s', access_token: '%s'", PIXEL_ID, ACCESS_TOKEN));
    }

    APIContext context = new APIContext(ACCESS_TOKEN).enableDebug(true);
    context.setLogger(System.out);

    UserData userData = new UserData()
        .email("joe@eg.com")
        .clientIpAddress(clientIpAddress)
        .clientUserAgent(clientUserAgent);

    HashMap<String, String> customProperties = new HashMap<>();
    customProperties.put("item_number", "456");

    CustomData customData = new CustomData()
        .currency("usd")
        .customProperties(customProperties)
        .value(123.45F);

    Event pageViewEvent = new Event();
    pageViewEvent.eventName("Purchase")
        .eventTime(System.currentTimeMillis() / 1000L)
        .userData(userData)
        .customData(customData)
        .eventSourceUrl("http://jaspers-market.com/product/123")
        .actionSource(ActionSource.website);

    EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
    eventRequest.addDataItem(pageViewEvent);

    // Set the Custom HTTP Service Client
    HttpServiceInterface httpServiceClient = new E2EHttpServiceClient();
    eventRequest.setHttpServiceClient(httpServiceClient);

    EventResponse eventResponse = eventRequest.execute();
    System.out.println("Request was successful:");
    System.out.println(eventResponse);
  }

  public static void main(String[] args) {
    try {
      run();
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println(e.toString());
      System.exit(1);
    }
    System.exit(0);
  }

  private static class E2EHttpServiceClient implements HttpServiceInterface {
    @Override
    public EventResponse executeRequest(String url, HttpMethodEnum httpMethod, Map<String, String> headers, HttpServiceParams params) {
      EventResponse eventResponse = null;
      try {
        Gson gson = new GsonBuilder()
            .disableHtmlEscaping()
            .create();
        URL requestUrl = new URL(url);

        HttpURLConnection connection = (HttpURLConnection) requestUrl.openConnection();
        connection.setRequestMethod(httpMethod.toString());
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "application/json");

        DataOutputStream out = new DataOutputStream(connection.getOutputStream());
        out.writeBytes(gson.toJson(params));
        out.flush();
        out.close();

        BufferedReader in = new BufferedReader(
            new InputStreamReader(connection.getInputStream())
        );
        String responseLine = in.readLine();
        StringBuffer response = new StringBuffer();
        while (responseLine != null) {
          response.append(responseLine);
          responseLine = in.readLine();
        }
        in.close();
        String responseString = response.toString();

        eventResponse = gson.fromJson(responseString, EventResponse.class);
      } catch (Exception e) {
        e.printStackTrace();
        System.exit(1);
      }
      return eventResponse;
    }
  }
}
```

```
require 'facebook_ads'

class CustomHttpClient < FacebookAds::ServerSide::HttpServiceInterface
    def execute(url, request_method, headers, params)
        require 'faraday'
        require 'json'

        raise Exception.new("Incorrect HTTP method: #{request_method}") if request_method != FacebookAds::ServerSide::HttpMethod::POST

        response = Faraday.post(url) do |request|
            headers.each do |key, value|
                request[key] = value
            end
            request.headers['Content-Type'] = 'application/json'
            request.body = params.to_json
        end

        parsed_response = JSON.load(response.body)

        return FacebookAds::ServerSide::EventResponse.new(
            events_received: parsed_response['events_received'],
            messages: parsed_response['messages'],
            fbtrace_id: parsed_response['fbtrace_id']
        )
    end
end

def main
    access_token = ENV['ACCESS_TOKEN']
    pixel_id = ENV['PIXEL_ID']
    unless access_token && pixel_id
        raise Exception.new("Missing required test config. Got pixel_id: '#{pixel_id}', access_token: '#{access_token}'")
    end

    FacebookAds.configure do |config|
        config.access_token = access_token
    end

    user_data = FacebookAds::ServerSide::UserData.new(
        email: 'joe@eg.com',
        client_ip_address: request.remote_ip,
        client_user_agent: request.user_agent
    )

    custom_data = FacebookAds::ServerSide::CustomData.new(
        currency: 'usd',
        value: 123.45
    )

    event = FacebookAds::ServerSide::Event.new(
        event_name: 'Purchase',
        event_time: Time.now.to_i,
        user_data: user_data,
        custom_data: custom_data,
        event_source_url: 'http://jaspers-market.com/product/123',
        action_source: 'website'
    )

    request = FacebookAds::ServerSide::EventRequest.new(
        pixel_id: pixel_id,
        events: [event],
        http_service_client: CustomHttpClient.new
    )

    response = request.execute
    print "Response: #{response}\n"
    print "Custom HTTP Service Request - OK."
end

main
```

[](#)

## Testar as solicitações de eventos

Você pode testar suas solicitações de eventos usando o parâmetro `test_event_code`. Localize o código de teste acessando a ferramenta Eventos de Teste que pode ser encontrada no **Gerenciador de Eventos** em **Fontes de dados** > **Seu pixel** > aba **Eventos de teste**.

**Nota:** é necessário substituir o valor de exemplo no código abaixo (ou seja, `TEST12345`) pelo código de teste obtido na aba **Eventos de teste**.

PHP SDKPython SDKNode.js SDKJava SDKRuby SDK

```
...
$request = (new EventRequest($pixel_id))
    ->setTestEventCode('TEST12345')
    ->setEvents($events);

$response = $request->execute();
```

```
...
event_request = EventRequest(
    events=[event],
    test_event_code='TEST12345',
    pixel_id=pixel_id
)

result = event_request.execute()
```

```
...
    const eventRequest = (new EventRequest(access_token, pixel_id))
      .setTestEventCode('TEST12345')
      .setEvents(eventsData);

    eventRequest.execute().then(response => {
      console.log('Execute Request OK. Response: ', response);
    }, err => {
      console.log('Error: ', err);
    });
```

```
...
    EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
    eventRequest.addDataItem(purchaseEvent);
    eventRequest.setTestEventCode("TEST12345");

    EventResponse response = eventRequest.execute();
```

```
...
request = FacebookAds::ServerSide::EventRequest.new(
    pixel_id: PIXEL_ID,
    test_event_code: 'TEST12345',
    events: [event]
)

response = request.execute
```

[](#)

## Limitações

No momento, não damos suporte à definição de uma Interface de serviço HTTP personalizada ao fazer solicitações em lotes simultâneos ou solicitações assíncronas.

[](#)