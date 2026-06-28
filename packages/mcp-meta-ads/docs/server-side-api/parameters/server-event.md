---
title: "Parâmetros de evento do servidor - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/server-side-api/parameters/server-event"
scraped_at: "2026-02-01T15:46:16.206Z"
---

# Parâmetros de evento do servidor

Parâmetro

Descrição

[`event_name`](#)

string

**Obrigatório.**  
O nome de um [evento-padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) ou de um [evento personalizado](/docs/facebook-pixel/implementation/conversion-tracking#custom-events). Esse campo é usado para desduplicar eventos enviados pela web (por meio do Pixel da Meta) ou pelo app (por meio do SDK ou da API de Eventos do App) e pela API de Conversões. O parâmetro [`event_id`](#event-id) também é usado na desduplicação.

Para a mesma ação de cliente, o `event` do navegador ou do app corresponde ao `event_name` do servidor. Se encontrarmos uma correspondência entre os eventos enviados dentro de um período de 48 horas, consideraremos apenas o primeiro deles. Se um evento do servidor e um evento do navegador/app forem recebidos ao mesmo tempo (com até 5 minutos de diferença), o evento favorecido será o do navegador/app. Saiba mais sobre a [Desduplicação de eventos de pixel e do servidor](/docs/marketing-api/server-side-api/using-the-api/deduplicate-pixel-and-server-side-events).

[`event_time`](#)

número inteiro

**Obrigatório.**  
Registro de data e hora do Unix, em segundos, que indica quando o evento real ocorreu. O tempo especificado pode estar adiantado em relação ao momento em que você enviou o evento ao Facebook. Isso serve para habilitar o processamento em lote e a otimização de desempenho do servidor. A data deve ser enviada no fuso horário GMT.

O `event_time` pode indicar até 7 dias antes de o evento ser enviado ao Facebook. Se o `event_time` de `data` for maior que 7 dias antes do envio, um erro será retornado para toda a solicitação, e nenhum evento será processado.

[`user_data`](#)

objeto

**Obrigatório.**  
Um mapa que contém dados de informações do cliente. Consulte as opções em [Parâmetros de informações do cliente](/docs/marketing-api/server-side-api/parameters/user-data). Consulte [Correspondência avançada](/docs/facebook-pixel/advanced/advanced-matching) para conferir as opções comparáveis disponíveis para dados enviados por meio do Pixel da Meta.

[`custom_data`](#)

objeto

**Opcional.**  
Um mapa que contém dados adicionais da empresa sobre o evento. Consulte [Custom data parameters](/docs/marketing-api/server-side-api/parameters/custom-data) para mais informações.

[`event_source_url`](#)

string

**Opcional.**  
O URL do navegador em que o evento ocorreu. O URL deve corresponder ao domínio verificado.

  

**Observação:** o `event_source_url` é obrigatório para eventos do site compartilhados por meio da API de Conversões.

[`opt_out`](#)

booliano

**Opcional.**  
Um sinal indicando que o evento não deve ser usado para a otimização da veiculação de anúncio. Se o evento for definido como `true`, ele será usado apenas para atribuição.

[`event_id`](#)

string

**Opcional.**  
Esta identificação pode ser qualquer string _única_ escolhida pelo anunciante. Os parâmetros `event_id` e `event_name` são usados para desduplicar eventos enviados pela web (por meio do Pixel da Meta) ou pelo app (por meio do SDK ou da API de Eventos do App) e pela API de Conversões. Apesar de o parâmetro `event_id` estar marcado como opcional, ele é recomendado para a desduplicação de eventos.

Para a desduplicação, o `eventID` de um evento do navegador ou do app precisa coincidir com o `event_id` do evento correspondente do servidor. Saiba mais sobre [Como gerenciar eventos duplicados de Pixel e da API de Conversões](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

O número de um pedido ou a identificação da transação podem ser usados como identificadores em `event_id`. Por exemplo, se um cliente faz duas compras no site cujos números dos pedidos são 123 e 456, cada chamada da API de Conversões incluirá o respectivo número do pedido para `event_id`. Com isso, é possível distinguir os dois eventos de compra como pedidos diferentes. Os dois eventos correspondentes de compra de pixel do navegador também precisariam enviar os mesmos números de encomenda no parâmetro `eventID`. Assim, entenderíamos que ocorreram apenas dois eventos, não quatro compras únicas.

Para eventos sem um número de identificação intrínseco, é possível usar um número aleatório, desde que o mesmo número seja enviado em eventos do navegador e do servidor.

[`action_source`](#)

string

**Obrigatório.**  
Este campo permite especificar onde as conversões ocorreram. Saber onde os eventos aconteceram ajuda a garantir que os anúncios sejam exibidos para as pessoas certas. Ao usar a API de Conversões, você concorda em garantir a precisão do parâmetro `action_source` conforme seu conhecimento.

Estes são os valores que você pode enviar no campo `action_source`:

-   `email` – A conversão aconteceu por email.
    
-   `website` – A conversão foi feita pelo seu site.
    
-   `app` – A conversão foi feita pelo app para celular.
    
-   `phone_call` – A conversão foi feita por telefone.
    
-   `chat` – A conversão foi feita por meio de um app de mensagens, SMS ou recurso de mensagens online.
    
-   `physical_store` – A conversão foi feita pessoalmente na sua loja física.
    
-   `system_generated` – A conversão aconteceu de forma automática (por exemplo, uma renovação de assinatura com pagamento automático).
    
-   `business_messaging` – A conversão foi feita a partir de anúncios de clique para o Messenger, Instagram ou WhatsApp.
    
-   `other` – A conversão aconteceu de outra forma.
    

**Observações:** todos os valores de fonte da ação habilitam os recursos de criação de público personalizado e mensuração de anúncios. Todas as fontes da ação habilitam os recursos de otimização de anúncios.

[`data_processing_options`](#)

matriz

**Opcional.**  
As opções de processamento que você gostaria de habilitar para um evento específico. O valor aceito atualmente é `LDU` para o Uso limitado de dados. Uma matriz vazia pode ser enviada para especificar de maneira explícita que esse evento não deve ser processado com as restrições de Uso limitado de dados. Saiba mais sobre as [opções de processamento de dados](/docs/marketing-apis/data-processing-options). Veja [exemplos de implementação da API de Conversões](/docs/marketing-apis/data-processing-options#conversions-api-and-offline-conversions-api).

[`data_processing_options_country`](#)

número inteiro

**Obrigatório** se `LDU` for enviado em `data_processing_options`.  
Um país que você deseja associar a esta opção de processamento de dados. Os valores aceitos atualmente são `1`, para os Estados Unidos da América, ou `0`, para solicitar a geolocalização do evento. Saiba mais sobre as [opções de processamento de dados](/docs/marketing-apis/data-processing-options). Veja [exemplos de implementação da API de Conversões](/docs/marketing-apis/data-processing-options#conversions-api-and-offline-conversions-api).

[`data_processing_options_state`](#)

número inteiro

**Obrigatório** em alguns casos (veja a observação para mais detalhes).  
Um estado que você deseja associar a esta opção de processamento de dados. Os valores aceitos atualmente são `1000`, para a Califórnia, ou `0`, para solicitar a geolocalização do evento.

**Observação:**

-   Se você definir um país, será preciso escolher um estado também. Caso contrário, aplicaremos nossa lógica de geolocalização a todo o evento.
    
-   Esse campo é obrigatório se você enviar `LDU` em `data_processing_options` e não fornecer um endereço IP.
    

Saiba mais sobre as [opções de processamento de dados](/docs/marketing-apis/data-processing-options). Veja [exemplos de implementação da API de Conversões](/docs/marketing-apis/data-processing-options#conversions-api-and-offline-conversions-api).

`app_data`

objeto

**Obrigatório para eventos do app.**

Parâmetros para compartilhar os dados do app e as informações do dispositivo com a API de Conversões.

`extinfo` é um subparâmetro de `app_data`.

`extinfo`

objeto

**Obrigatório para eventos do app.**  
Informações estendidas sobre dispositivos, como a largura e a altura da tela. Esse parâmetro é uma matriz cujos valores são separados por vírgula. Ao usar extinfo, **todos os valores são obrigatórios e devem seguir a ordem indexada abaixo**. Se estiver faltando um valor, preencha-o com uma string vazia como um espaço reservado.

Observação:

-   `version` precisa ser `a2` para Android.
    
-   `version` precisa ser `i2` para iOS.
    

`0`

string

**Obrigatório**

versão extinfo

  

Exemplo: `i2`

`1`

string

nome do pacote do app

  

Exemplo: `com.facebook.sdk.samples.hellofacebook`

`2`

string

versão curta (número inteiro ou string)

  

Exemplo: `1.0`

`3`

string

versão longa

  

Exemplo: `1.0 long`

`4`

string

**Obrigatório**

versão do SO

  

Exemplo: `13.4.1`

`5`

string

nome do modelo do dispositivo

  

Exemplo: `iPhone5,1`

`6`

string

localidade

  

Exemplo: `En_US`

`7`

string

abreviação de fuso horário

  

Exemplo: `PDT`

`8`

string

operadora

  

Exemplo: `AT&T`

`9`

int64

largura da tela

  

Exemplo: `320`

`10`

int64

altura da tela

  

Exemplo: `568`

`11`

string

densidade da tela

  

Exemplo: `2`

`12`

int64

cores da CPU

  

Exemplo: `2`

`13`

int64

tamanho do armazenamento externo em GB

  

Exemplo: `13`

`14`

int64

espaço livre em armazenamento externo em GB

  

Exemplo: `8`

`15`

string

fuso horário do dispositivo

  

Exemplo: `USA/New York`

[`referrer_url`](#)

string

**Opcional.**  
O cabeçalho do referenciador HTTP conforme observado pela página que dispara o evento da API de Conversões ou do Pixel da Meta. Normalmente, essa é a página anterior no navegador.

[`original_event_data`](#)

objeto

**Opcional.**  
Todos os campos de metadados que os anunciantes podem usar para especificar como um evento "atrasado" deve ser associado a um evento de aquisição anterior.

Recomendamos o uso de `original_event_data` quando há um atraso entre o momento em que um evento é enviado e um evento de aquisição anterior ao qual deve estar associado. Para obter mais informações, consulte [Parâmetros de dados originais para eventos](/docs/marketing-api/conversions-api/parameters/original-event).

[`customer_segmentation`](#)

enumeração

**Opcional.**  
Permite aos anunciantes especificar o segmento de usuário ao qual pertence o usuário que está realizando o evento. Pode ser usado para fornecer mais contexto sobre a relação do usuário com a empresa.

Esse campo aceita um dos seguintes valores de enumeração predefinidos:

-   `new_customer_to_business`: o usuário é um novo cliente da empresa.
    
-   `new_customer_to_business_line`: o usuário é um novo cliente de uma linha de negócios específica (por exemplo, produtos ou serviços).
    
-   `new_customer_to_product_area`: o usuário é um novo cliente de uma área de produtos específica (por exemplo, comércio eletrônico, finanças).
    
-   `new_customer_to_medium`: o usuário é um novo cliente de uma mídia de marketing específica (por exemplo, redes sociais, email).
    
-   `existing_customer_to_business`: o usuário é um cliente existente da empresa.
    
-   `existing_customer_to_business_line`: o usuário é um cliente existente de uma linha de negócios específica (por exemplo, produtos ou serviços).
    
-   `existing_customer_to_product_area`: o usuário é um cliente existente de uma área de produtos específica (por exemplo, comércio eletrônico, finanças).
    
-   `existing_customer_to_medium`: o usuário é um cliente existente de uma mídia de marketing específica (por exemplo, redes sociais, email).
    
-   `customer_in_loyalty_program`: o usuário faz parte de um programa de fidelidade.
    

Exemplo de carga JSON:

```
{
 "event_name": "Purchase",
 "event_time": 1643723400,
 "user_data": {
   "em": "user@example.com"
 },
 "custom_data": {
   "currency": "USD",
   "value": 100.00,
   "customer_segmentation": "new_customer_to_business"
 }
}
```