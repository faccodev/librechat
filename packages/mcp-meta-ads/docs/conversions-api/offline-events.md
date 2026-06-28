---
title: "API de Conversões para eventos offline"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/offline-events"
scraped_at: "2026-02-01T14:07:44.127Z"
---

# Como enviar eventos offline usando a API de Conversões

A API de Conversões é o método de integração recomendado pela Meta para enviar eventos offline e da loja física para a Meta para utilização na mensuração, na atribuição e no direcionamento de anúncios. Esta página detalha como enviar eventos offline por meio de uma integração de parceiros ou direta da API de Conversões.

## Pré-requisitos

### Conjunto de dados

Os eventos offline enviados por meio da API de Conversões precisam estar associados a um conjunto de dados.

Datasets allow advertisers to connect and manage event data from web, app, store and business messaging event sources to the Conversions API. Datasets may show event data from any of these integrations that you choose to set up:

-   Meta Pixel (website events)
-   App Events API (app events, including Facebook SDK for iOS or Android, mobile measurement partners (MMPs))
-   Offline Conversions API (Meta’s legacy API for offline events)
-   Messaging Events API (messaging events)

Datasets enable you to view all customer activities from a single interface. They also allow you to reduce the effort to build and maintain multiple API integrations.

In Events Manager, advertisers have different [options](https://www.facebook.com/business/help/5270377362999582?id=490360542427371) to create a dataset depending on their starting point. Or you can [create a brand new dataset](https://www.facebook.com/business/help/5818684664831465?id=490360542427371) in Events Manager by linking during offline event set creation or through an existing mobile app or during messaging event set creation information. Note that linking a dataset to an application is required before sending mobile app events to the Conversions API and only one application can be linked to a dataset. See more [details](https://www.facebook.com/business/help/768703235046938?locale=en_US) and instructions [here](https://www.facebook.com/business/help/750785952855662?id=490360542427371).

[](#)

Você pode fazer a chamada `GET` para [https://graph.facebook.com/v16.0/{ads-pixel-id}/?fields=is\_consolidated\_container](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/) para detectar se o conjunto de dados do anunciante está consolidado e, assim, elegível para enviar eventos offline usando a API de Conversões.

### Permissões

-   Para implementar uma integração direta como anunciante, siga [estas instruções](/docs/marketing-api/conversions-api/get-started#integration-methods) relacionadas a pré-requisitos e permissões.
    
-   Para implementar uma integração de plataforma de parceiro, [siga estas instruções](/docs/marketing-api/conversions-api/guides/end-to-end-implementation#integration-as-a-platform) relacionadas a pré-requisitos e permissões.
    

[](#)

## Configuração

### 1\. Configurar parâmetros de evento offline

Os anunciantes podem usar a configuração mencionada [aqui](/docs/marketing-api/conversions-api/guides/end-to-end-implementation) e consultar o [conjunto atual de parâmetros](/docs/marketing-api/conversions-api/parameters) que pode ser enviado por meio da API de Conversões. Para enviar eventos offline e da loja, os seguintes campos podem ser compartilhados na carga:

-   Os anunciantes precisam enviar [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) como `physical_store` para todos os eventos offline e da loja. Note que esse parâmetro é necessário para todos os tipos de eventos do servidor. Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) está correto, conforme seu conhecimento.
    
-   Todos os [campos de eventos do servidor](/docs/marketing-api/conversions-api/parameters/server-event) necessários para a API de Conversões devem ser respeitados.
    
-   [Parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) (consulte abaixo a lista apropriada de parâmetros para eventos offline e da loja).
    
-   [Parâmetros de dados personalizados](/docs/marketing-api/conversions-api/parameters/custom-data) (consulte abaixo a lista apropriada de parâmetros para eventos offline e da loja).
    
-   Parâmetro opcional: o parâmetro `upload_tag` ainda é aceito para carregamentos de eventos offline para anunciantes que usam a API antiga para eventos offline.
    

### Parâmetros de informações do cliente

A lista a seguir contém parâmetros de informações do cliente que são normalmente usados para eventos offline e da loja:

Nomes dos parâmetros

Parâmetro

Hash obrigatório

Endereços de email

`email`

SIM

Números de telefone

`phone`

SIM

Gênero

`gen`

SIM

Data de nascimento

`db`

SIM

Sobrenome

`ln`

SIM

Nome

`fn`

SIM

Cidade

`ct`

SIM

Estados dos EUA

`st`

SIM

Códigos postais

`zip`

SIM

País

`country`

SIM

Identificador de Publicidade da Apple

`madid`

SIM

ID de publicidade do Android

`madid`

SIM

Número de identificação do usuário de terceiros

`external_id`

Altamente recomendado

A identificação do cadastro dos anúncios de cadastro

`lead_id`

NÃO converter em hash

[](#)

### Parâmetros de dados personalizados

A seção a seguir contém parâmetros personalizados comuns usados por eventos offline e da loja. Para mais campos de dados personalizados, consulte a lista completa que aceitamos para a API de Conversões no seguinte [link](/docs/marketing-api/conversions-api/parameters/custom-data).

Parâmetro

Descrição

`event_time`

tipo: número inteiro

**Obrigatório**

O registro de data e hora UNIX do evento de conversão.

* * *

**Exemplo:**`'1456870055'`

  

`event_name`

tipo: cadeia de caracteres

**Obrigatório**

Tipo de evento.

* * *

**Exemplo:**`ViewContent, Search, AddToCart, AddToWishlist, InitiateCheckout, AddPaymentInfo, Purchase, Lead, Other`

  

`store_data`

tipo: dicionário JSON

**Opcional**

Dados de localização da loja sobre o evento de conversão.

* * *

**Exemplo:**

```
"store_data":
    {
        "store_page_id": 8576093908, // FBID
        "brand_page_id": 10236898932// FBID
        "store_code": "64CharacterAlphaNumericString" // String
    }
```
  

`currency`

tipo: cadeia de caracteres

**Obrigatório**

É o [código de moeda ISO](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fiso-4217-currency-codes.html%3Ffbclid%3DIwAR0xKRCr-IrwOUtAz9A8DkpNhv8Fdix5Z8FeofygygO6kBtdu-YLJccUlgk&h=AT0AcBesPvty413kkhhbHFruVqHxX5K0G9KnknnSW7Z2DO36836DvPgJt_NB2WrbNGv_P37Cwfqn_GQQWpBju98w5-3OjEuoR42P5wZ2RDz4kUi-vypcYQjXWWpgmjyhdCgQ-sZ9Liulg1QuTga1NDCFjvJAyWeIm8sB0LIrLL0) de três letras correspondente ao evento de conversão. Obrigatório para eventos `Purchase`.

* * *

**Exemplo:**`USD`

  

`value`

Tipo: duplo

**Obrigatório**

Valor do evento de conversão. Obrigatório para eventos `Purchase`.

* * *

**Exemplo:**`16.00`

  

`content_type`

tipo: cadeia de caracteres

**Opcional**

Qualquer `content_type` de [anúncios de catálogo Advantage+](/docs/meta-pixel/get-started/advantage-catalog-ads) válido.

* * *

**Exemplo:**`product`

  

`contents`

Tipo: matriz JSON

**Opcional**. Obrigatório se você integrar os anúncios ao [catálogo](/docs/marketing-api/dynamic-product-ads/product-catalog).

Obrigatório: `id` e `quantity`.

Recomendado: `price`, `brand` e `category`

Obrigatório: `[ {id: "A", quantity: 1}, {id: "B", quantity: 2}, {id: "C", quantity: 1}]`.

Recomendado: `[ {id: "A", quantity: 1, brand: "Brand_A", category: "", price: 10.0}]`

  

`custom_data`

tipo: dicionário JSON

**Opcional**.

Informações sobre o evento de conversão.

**Exemplo**: `{category: 'ICECREAM'}`

  

`order_id`

tipo: cadeia de caracteres

**Opcional**.

Identificador exclusivo para cada transação ou pedido em um conjunto de eventos offline. Por exemplo, para varejo, isso pode ser o ID de um recibo.

**Exemplo**: `ATN10001`, `123456`

  

`item_number`

tipo: cadeia de caracteres

**Opcional**.

Identificador único para distinguir eventos dentro do mesmo pedido ou transação.

**Exemplo**: `1`, `a`

  

  

### 2\. Como enviar eventos

Para enviar novos eventos, faça uma solicitação `POST` para a API de Conversões a partir deste caminho: `https://graph.facebook.com/{API_VERSION}/{DATASET_ID}/events?access_token={TOKEN}`

Quando você posta nessa borda, a Meta cria novos eventos offline e da loja. Para saber mais, consulte este [documento para desenvolvedores](/docs/marketing-api/conversions-api/using-the-api/).

Confira uma visão geral de como os parâmetros se ajustam ao esquema geral da carga:

```
curl -X POST \
  -F 'data=[
       {
  "event_name": "Purchase",
  "event_time": 1674000041,
  "user_data": {
    "em": [
      "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
    ],
    "ph": [
      "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
      "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
    ]
  },
  "custom_data": {
    "currency": "usd",
    "value": 123.45,
    "contents": [{
      "id": "product123",
      "quantity": 1
    }]
  },
  "action_source": "physical_store"
}
]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v15.0/<DATASET_ID>/events
```
  

Recomendamos carregar em tempo real ou diariamente para ter resultados de otimização ideais. Dessa maneira, os dados offline podem ser efetivamente correspondidos com o desempenho de quaisquer anúncios que você esteja veiculando.

O [`event_time`](/docs/marketing-api/server-side-api/parameters/server-event#event-time) pode indicar até 7 dias antes de o evento ser enviado à Meta. Se o `event_time` de `data` for maior que 7 dias antes do envio, um erro será retornado para toda a solicitação e nenhum evento será processado. Para eventos de loja física e offline com `physical_store` definido como `action_source`, é preciso carregar transações até 62 dias depois da conversão.

Os dados carregados são processados em tempo real. Desse modo, você poderá visualizar resultados assim que os dados forem adicionados. Você pode consultar o documento sobre [Boas práticas para dados de eventos offline](https://www.facebook.com/business/help/1798506233494677?id=565900110447546) na Central de Ajuda.

### 3\. Configurar desduplicação

Diferentemente da [desduplicação configurada em eventos da API de Conversões e do Pixel da Meta](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events), os eventos offline podem ser desduplicados apenas em relação a outros eventos offline. Nós aceitamos dois métodos de desduplicação: baseado em **order\_id** ou baseado em **user**. A desduplicação usa a combinação de campos: `dataset_id`, `event_time`, `event_name`, `item_number`, e o campo de chave baseado no método da carga do evento específico.

A desduplicação padrão usa **order\_id** com uma combinação dos campos acima. Se **order\_id** não estiver presente na carga, será usada a lógica de desduplicação baseada em **user**.

Por exemplo, onde existem dois pedidos com `event_time` idêntico, `event_name` tendo o mesmo **order\_id** ou o mesmo conjunto de [Parâmetros de Informação do Cliente](/docs/marketing-api/conversions-api/offline-events#customer-information-parameters) sem **order\_id**, consideraremos eventos duplicados e usaremos o primeiro evento. O método de desduplicação baseado em **user** só funciona com os mesmos campos de [Parâmetros de informações do cliente](/docs/marketing-api/conversions-api/offline-events#customer-information-parameters) nas duas cargas.

A janela de desduplicação máxima é de 7 dias.

### 4\. Solução de problemas de eventos

Você pode usar a ferramenta [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper/) para gerar dados de carga:

-   Escolha a fonte de ação `physical_store` quando aplicável. Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) está correto, conforme seu conhecimento.
    
-   Preencha as informações dos eventos que serão enviados à Meta.
    
-   Isso gerará uma carga de evento, que pode ser usada como modelo para sua integração com a API de Conversões.
    

Para testar sua carga, use a ferramenta [Eventos de Teste](https://www.facebook.com/business/help/2040882565969969?id=1205376682832142) no Gerenciador de Eventos.

[](#)

## Veja também

-   [Dataset Quality API para eventos offline](/docs/marketing-api/conversions-api/dataset-quality-api/offline-events)
    
-   [Guia de configuração técnica omni: boas práticas e requisitos](/docs/marketing-apis/guides/omni-optimal-setup-guide/)
    
-   [Visão geral da API de Conversões](/docs/marketing-api/conversions-api)
    
-   [Como usar a API](/docs/marketing-api/conversions-api/using-the-api)
    
-   [API de Conversões: Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices)
    

### Artigos da Central de Ajuda para Empresas

-   [Crie um conjunto de dados durante a criação do conjunto de eventos offline](https://www.facebook.com/business/help/5818684664831465?id=490360542427371)
    
-   [Boas práticas para dados de eventos offline](https://www.facebook.com/business/help/1798506233494677?id=565900110447546)
    
-   [Como os anunciantes podem usar conversões offline](https://www.facebook.com/business/help/1142103235885551?id=565900110447546)
    
-   [Como visualizar resultados de eventos offline no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/154283205023788?id=565900110447546&ref=search_new_3)
    
-   [Sobre a deduplicação de dados de eventos offline](https://www.facebook.com/business/help/1772588746090250?id=565900110447546&ref=search_new_9)
    

[](#)