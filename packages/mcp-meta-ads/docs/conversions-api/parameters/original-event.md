---
title: "Dados originais para eventos - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event"
scraped_at: "2026-02-01T15:47:18.900Z"
---

# Parâmetros de dados originais para eventos

Use estes parâmetros para compartilhar informações originais do evento que você quer associar à API de Conversões.

Parâmetro

Descrição

[`event_name`](#)

string

**Opcional.**  
O nome de um [evento padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) ou de um [evento personalizado](/docs/facebook-pixel/implementation/conversion-tracking#custom-events).

[`event_time`](#)

número inteiro

**Opcional.**  
Um registro de data e hora do Unix, em segundos, indicando quando o evento real ocorreu. O tempo especificado pode estar adiantado em relação ao momento em que você enviou o evento ao Facebook. A data deve ser enviada no fuso horário GMT.

[`order_id`](#)

string

**Opcional.**  
A identificação do pedido da transação como uma string.

[`event_id`](#)

string

**Opcional.**  
Esta identificação pode ser qualquer string única escolhida pelo anunciante. Os parâmetros `event_id` e `event_name` são usados para desduplicar eventos enviados pela web (por meio do Pixel da Meta) ou pelo app (por meio do SDK ou da API de Eventos do App) e pela API de Conversões. **Apesar de o parâmetro**`event_id`**estar marcado como opcional, ele é recomendado para a desduplicação de eventos**.

Para a desduplicação, o `eventID` de um evento do navegador ou do app precisa coincidir com o `event_id` do evento correspondente do servidor. Saiba mais sobre [Como gerenciar eventos duplicados de Pixel e da API de Conversões](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

O número de um pedido ou a identificação da transação podem ser usados como identificadores em `event_id`. Por exemplo, se um cliente faz duas compras no site cujos números dos pedidos são 123 e 456, cada chamada da API de Conversões incluirá o respectivo número do pedido para `event_id`. Com isso, é possível distinguir os dois eventos de compra como pedidos diferentes. Os dois eventos correspondentes de compra de pixel do navegador também precisariam enviar os mesmos números de encomenda no parâmetro `eventID`. Assim, entenderíamos que ocorreram apenas dois eventos, não quatro compras únicas.

Para eventos sem um número de identificação intrínseco, é possível usar um número aleatório, desde que o mesmo número seja enviado em eventos do navegador e do servidor.