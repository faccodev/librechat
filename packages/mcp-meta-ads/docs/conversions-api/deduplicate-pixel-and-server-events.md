---
title: "Como gerenciar eventos duplicados - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events"
scraped_at: "2026-02-01T14:08:03.959Z"
---

# Como gerenciar eventos duplicados de Pixel e da API de Conversões

Para otimizar o desempenho do anúncio, recomendamos que os anunciantes implementem a API de Conversões com o Pixel da Meta. Chamamos essa abordagem de "configuração redundante" e fornecemos mais informações sobre ela [aqui](/docs/marketing-api/conversions-api/guides/end-to-end-implementation#pick-your-integration-type).

Ao usar a configuração redundante, os anunciantes precisam configurar um método de desduplicação para garantir que o sistema de veiculação de anúncio diferencie eventos distintos e sobrepostos. Este documento descreve opções de métodos para ajudar o Facebook a desduplicar os eventos.

Os anunciantes que não enviam o mesmo evento duas vezes pela API de Conversões e pelo Pixel da Meta não precisam configurar a desduplicação.

A API de Conversões agora permite que os anunciantes enviem eventos da web, do app e da loja física à Meta por meio de um único ponto de extremidade, e não vários. Saiba mais sobre a [API de Conversões](/docs/marketing-api/conversions-api).

## Opções para a desduplicação de eventos

O Facebook tenta desduplicar eventos idênticos enviados pelo Pixel da Meta e pela API de Conversões. Há duas formas de desduplicar os eventos:

### Número de identificação ou nome do evento (recomendado)

#### Parâmetros obrigatórios

Nessa abordagem, o parâmetro `event_id` é adicionado aos eventos da API de Conversões e do Pixel do navegador. O parâmetro `event_id` é um identificador que distingue eventos semelhantes. Saiba mais sobre [o parâmetro `event_id`](/docs/marketing-api/conversions-api/parameters/server-event#event-id).

#### Descrição da abordagem

Determinamos se os eventos são idênticos comparando a **identificação** e o **nome** deles. Para desduplicar um evento, é preciso que:

1.  o `eventID` do Pixel da Meta coincida com o `event_id` da API de Conversões em eventos correspondentes;
2.  o `event` do Pixel da Meta coincida com o `event_name` da API de Conversões em eventos correspondentes.

Depois que os eventos são recebidos, utilizamos várias estratégias para eliminar a duplicação, o que pode ajudar a melhorar a otimização e a mensuração. Se os eventos do servidor e do navegador não tiverem um conteúdo significativamente diferente, no geral, daremos preferência ao evento que for recebido primeiro.

Observe que o parâmetro `eventID` do Pixel é o quarto argumento no rastreamento de chamada `fbq`.

**Exemplo**

```
fbq('track', 'Purchase', {value: 12, currency: 'USD'}, {eventID: 'EVENT_ID'});
```

### FBP ou identificação externa

#### Parâmetros obrigatórios

Nessa abordagem, é preciso usar `event_name`, `fbp` e/ou `external_id` de forma consistente nos eventos do navegador e do servidor. Consulte [Parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) para saber mais sobre os parâmetros `external_id` e `fbp`.

#### Descrição da abordagem

Se foi feita a configuração para os parâmetros `external_id` e `fbp` serem passados pelo navegador e pelo servidor, removeremos os eventos duplicados de forma automática. O processo funciona da seguinte maneira:

1.  Você envia um evento do navegador com `event_name`, `fbp` e/ou `external_id`.
2.  Depois, você envia um evento do servidor com `event_name`, `fbp` e/ou `external_id`.
3.  Comparamos o evento do servidor com o do navegador. Mais especificamente, comparamos as combinações entre `event_name`, `fbp` e/ou `external_id`.
4.  Utilizamos várias estratégias para eliminar a duplicação de eventos, o que pode ajudar a melhorar a otimização e a mensuração. Se os eventos do servidor e do navegador não tiverem um conteúdo significativamente diferente, no geral, daremos preferência ao evento que for recebido primeiro.

#### Limitações da abordagem

Esse método de desduplicação tem as seguintes características:

-   Em geral, serve apenas para desduplicar eventos que foram enviados primeiro pelo navegador e depois pelo servidor. Se um evento do navegador não tiver sido recebido nas últimas 48 horas, os eventos do servidor não serão descartados mesmo que um evento idêntico do navegador chegue depois de um do servidor.
    
-   Não desduplica eventos de uma mesma fonte, por exemplo, apenas do navegador ou apenas do servidor. Se você enviar dois eventos consecutivos do navegador com as mesmas informações, não descartaremos nenhum deles. Se você enviar dois eventos consecutivos do servidor com as mesmas informações, também não descartaremos nenhum deles.
    

[](#)

## Como configurar a desduplicação no pixel do navegador

Para aprimorar a busca por correspondências, precisamos destas informações exatas sobre os seus eventos enviados pelo Pixel da Meta e pela API de Conversões:

-   O `eventID` no parâmetro opcional `eventData` precisa ser um valor único. Use uma das seguintes opções, dependendo da implementação do Pixel da Meta:
    
    -   `track` para enviar o evento a todos os pixels em uma mesma página.
        ```
        fbq('track', 'Purchase', {value: 12, currency: 'USD'}, {eventID: 'EVENT_ID'});
        ```
        
    -   `trackSingle` para enviar o evento a um pixel.
        ```
        fbq('trackSingle', 'SPECIFIC_PIXEL_ID', 'Purchase', {value: 12, currency: 'USD'}, {eventID: 'EVENT_ID'});
        ```
        
    -   Uma tag de pixel de imagem com o parâmetro `eid`.
        ```
        <img src="https://www.facebook.com/tr?id=PIXEL_ID&ev=Purchase&eid=EVENT_ID"/>
        ```
        
    
    Se o evento compartilhado não tem parâmetros como valor e moeda, use esta configuração:
    ```
    fbq('track', 'Lead', {}, {eventID: 'EVENT_ID'});
    ```
    
-   O `eventID` do Pixel da Meta deve coincidir com o `event_id` do evento equivalente com origem na API de Conversões.
    
-   Se encontrarmos as mesmas combinações de chave de servidor (`event_id` e `event_name`) **e** de chave de navegador (`eventID` e `event`) enviadas à mesma identificação do pixel dentro de 48 horas, descartaremos os eventos subsequentes.
    
-   Se você enviar os eventos por meio do navegador e da API de Conversões com a correspondência `event_ids`, saiba que eles serão desduplicados apenas se forem recebidos dentro de 48 horas após recebermos o primeiro evento com um `event_id`.
    

[](#)

## Como verificar a configuração de desduplicação

Saiba como verificar as configurações de desduplicação e mesclagem de eventos na documentação [Verifying Your Setup](/docs/marketing-api/conversions-api/verifying-setup).

[](#)

## Saiba mais

-   [Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper)
    

[](#)