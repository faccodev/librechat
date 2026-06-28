---
title: "A API de Conversões como uma plataforma"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform"
scraped_at: "2026-02-01T15:45:54.897Z"
---

# Configurar a API de Conversões como uma plataforma

Caso você ofereça a configuração do Pixel da Meta como parte dos seus serviços de gerenciamento de tags, considere adicionar funcionalidades da API de Conversões. A integração com a API de Conversões permite que seus clientes enviem eventos da web diretamente para a Meta, sem precisar depender dos eventos de pixel do navegador.

## Eventos do servidor e do navegador

Antes de começar, é importante entender a relação entre os eventos do servidor e o [Pixel da Meta](/docs/facebook-pixel). Os eventos do servidor são enviados através da API de Conversões e usados para mensuração, geração de relatórios e otimização da mesma forma que os eventos de pixel do navegador.

Imagine que o envio de eventos de pixel do navegador funciona como um transporte aéreo e que o envio de eventos do servidor parece mais com a entrega por frete. Ambos são mecanismos para transportar o pacote (dados sobre um evento) até um endereço de destino (identificação do pixel). Por isso, recomendamos que você crie a integração da API de Conversões na sua plataforma como uma extensão da oferta atual do Pixel da Meta (em vez de um plugin ou serviço separado) pelos seguintes motivos:

-   Os eventos do servidor usam a identificação do pixel como destino.
    
-   Os eventos do servidor são processados da mesma forma que os eventos de pixel do navegador são enviados ao Facebook.
    
-   Isso simplifica o processo de [desduplicação](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).
    
-   Permite que os clientes usem facilmente o recurso. Por exemplo, os eventos do servidor podem ser enviados com eventos do navegador por padrão.
    

Depois que sua plataforma estiver integrada à API de Conversões, recomendamos que você envie os mesmos eventos da web via navegador e servidor. Essa redundância ajuda a garantir a confiabilidade do sinal. Os eventos que antes poderiam se perder no navegador devido a diversos problemas de rede, agora são capturados por meio da API de Conversões.

Para enviar eventos via navegador e servidor, você precisa definir corretamente o mesmo `event_id` para eventos correspondentes. Isso permite que o Facebook [desduplique](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events) os eventos da forma adequada.

[](#)

## Pré-requisitos

1.  Uma plataforma da web capaz de compartilhar eventos no Facebook. Por exemplo, um criador de sites, um gerenciador de tags ou uma plataforma de tecnologia de anúncios.
2.  Aviso apropriado e consentimento dos seus usuários para o compartilhamento de dados de eventos com o Facebook, conforme exigido pelos Termos das Ferramentas do Facebook para Empresas.
3.  Um representante do Facebook.
4.  Os [pré-requisitos para integração da API de Conversões](/docs/marketing-api/conversions-api/get-started#requirements):
    -   [Gerenciador de Negócios](https://business.facebook.com/)
        
    -   Um [app da Meta](https://developers.facebook.com/apps)
        
    -   [Pixel da Meta](/docs/facebook-pixel)
        
    -   Um [token de acesso](/docs/marketing-api/conversions-api/get-started#access-token)
        

Para começar a oferecer a API de Conversões como uma plataforma, seu app precisa passar pelo [processo de análise](/docs/apps/review). Durante essa etapa, você deve solicitar o nível de acesso, o recurso e as permissões a seguir:

-   Nível de acesso: [Acesso avançado](/docs/marketing-api/overview/authorization#access-levels)
    
-   Recurso: [Acesso Padrão ao Gerenciamento de Anúncios](/docs/marketing-api/access)
    
-   Permissões: `ads_management`, `pages_read_engagement` e `ads_read`
    

[](#)

## Primeiros passos

Caso seja a primeira vez que você usa a API de Conversões, siga estas etapas para criar um negócio, um app da Meta, um Pixel da Meta e um usuário do sistema. Depois, você poderá usar o token de acesso do usuário do sistema para enviar eventos do servidor por meio da API de Conversões.

### Etapa 1: [crie um negócio](https://www.facebook.com/business/help/1710077379203657?id=180505742745347).

### Etapa 2: [crie um app da Meta para seu novo negócio](https://developers.facebook.com/apps).

### Etapa 3: crie um Pixel da Meta para seu novo negócio.

-   Acesse o [Gerenciador de Eventos](https://business.facebook.com/events_manager).
    
-   Selecione **Adicionar nova fonte de dados**.
    

### Etapa 4: [gere um token de acesso de usuário do sistema](/docs/marketing-api/conversions-api/get-started#access-token).

### Etapa 5: [envie um evento do servidor para seu Pixel da Meta](/docs/marketing-api/conversions-api/using-the-api).

[](#)

## Enviar eventos em nome de clientes

Depois de enviar com sucesso um evento do servidor para seu Pixel da Meta, você poderá definir como quer enviar eventos em nome dos clientes.

### Para Pixels da Meta pertencentes ou gerenciados pelo Gerenciador de Negócios do parceiro

1.  No **Gerenciador de Negócios**, navegue até a seção **Usuários** e selecione a aba **Usuário do sistema**. Clique no usuário do sistema específico que você está usando para a API de Conversões.
2.  Acesse o diálogo **Atribuir ativo** e escolha **Pixels**. Depois, selecione os pixels para os quais deseja enviar eventos em nome do cliente.
3.  Para cada pixel, selecione a permissão **Gerenciar pixel** e clique em **Salvar alterações**.
4.  Volte para a página de detalhes do seu usuário do sistema. Verifique se os pixels selecionados aparecem lá.

### Para Pixels da Meta não gerenciados pelo parceiro

O primeiro passo é solicitar uma autorização para enviar eventos em nome dos seus clientes. Existem as seguintes opções de autenticação:

#### Extensão do Facebook para Empresas (recomendado)

A [Extensão do Facebook para Empresas](/docs/facebook-business-extension/) retorna todas as informações necessárias para enviar eventos em nome do cliente através do seguinte processo. Ela fornece um ponto de extremidade para recuperar tokens de acesso do usuário do sistema criados no Gerenciador de Negócios do cliente. O processo inclui as permissões para enviar eventos do servidor, além de ser feito de forma automática e segura.

O ponto de extremidade requer um token de acesso do usuário como parâmetro de entrada. Após configurar a extensão, os novos usuários do recurso precisarão fazer uma chamada ao ponto de extremidade para obter o token de acesso de usuário do sistema. Os usuários existentes precisarão solicitar outra autenticação antes de fazer chamadas para o novo ponto de extremidade da API.

#### Token de acesso do usuário do sistema do cliente

O cliente precisa criar manualmente um token de acesso do usuário do sistema por meio da API de Conversões nas **configurações do Pixel**. Depois, você poderá enviar eventos para o pixel do anunciante com esse token.

Um usuário do sistema ou um usuário administrador do sistema precisa instalar o app que será usado para gerar o token de acesso. Com essa configuração, o app terá permissão para fazer chamadas de API em nome do usuário do sistema ou do usuário do sistema administrador.

Siga as instruções descritas no artigo [Introdução](/docs/marketing-api/conversions-api/get-started#access-token) e solicite o token de usuário do sistema ao seu anunciante. Lembre-se de usar seu próprio Pixel da Meta e token de acesso para fazer testes.

#### Compartilhamento de um Pixel da Meta do cliente com o Gerenciador de Negócios do parceiro

O cliente compartilha o próprio Pixel da Meta com o parceiro através das configurações do Gerenciador de Negócios ou ​ [via API](/docs/marketing-api/reference/ads-pixel/shared_accounts/). Depois, você poderá atribuir o usuário do sistema do parceiro ao pixel do cliente e [gerar um token de acesso para enviar eventos do servidor](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#get-started).

[](#)

## Atribuir eventos à sua plataforma usando o campo `partner_agent`

Para atribuir eventos da API de Conversões à sua plataforma, use o campo `partner_agent`. Isso permite que você defina o identificador da sua plataforma ao enviar eventos em nome de um cliente. Trabalhe com um representante do Facebook para definir esse identificador. Depois, envie-o com cada evento do servidor.

#### Exemplo de carga de evento

Se o identificador da sua plataforma fosse `datapartner`, este seria um exemplo de carga de evento de compra enviado em nome do cliente:

```
{
  "data": [
    {
      "user_data": {
        "em": "8159ea0e33c51a774b83104ee562784f9b1836c852102046e4bd8385706fe7ca"
      },
      "event_name": "PageView",
      "event_time": 1579645238
    },
    {
      "user_data": {
        "em": "8159ea0e33c51a774b83104ee562784f9b1836c852102046e4bd8385706fe7ca"
      },
      "custom_data": {
        "currency": "USD",
        "value": "50"
      },
      "event_name": "Purchase",
      "event_time": 1579645238
    }
  ],
  "partner_agent": "datapartner"
}
```

[](#)

## Perguntas frequentes

[](#)

[Why should we make the effort to integrate with the Conversions API if we already support the Meta Pixel?](#faq_579858209263017)

Sending events sent via the Conversions API is just like sending events via the Meta Pixel. The only difference is that the event is sent via the server, instead of the browser. So, why make an effort to integrate with the Conversions API? Here are some important use cases:

#### Capture offline and down-funnel events

If someone uses an advertisers’ website to sign up for a credit card, they can send events such as ViewContent, Application Start, and Application Submit via the browser to the Meta Pixel. However, the end user still needs to be approved for this credit card. The Approval event happens offline and cannot be sent via browser. To register this final step, the advertiser can send the Approval via the Conversions API.

#### Signal resiliency

Browser side events can be lost for many reasons:

-   The user might navigate away before the page has finished loading.
-   Ad blockers could prevent the event from firing.
-   The changing internet landscape might change the way inter-domain messages are sent.

These examples can all be mitigated by sending events via the Conversions API.

#### Sensitive data

Many advertisers have expressed concerns about sharing data via the browser when that data could be seen or inspected. This can be mitigated by sending data via the Conversions API.

For example, advertisers may want to send data like profit margin or lifetime value (LTV) along with a `purchase` event. This way, ads can be optimized towards a specific type of customer.

[Link permanente](#faq_579858209263017)

[](#)

[As a platform, which of my data sources should support integration with the Conversions API?](#faq_2721848828039105)

Since browser events are always vulnerable to obstacles, we recommend that you only send events collected from the Conversions API sources. For example, if:

-   One of the ways your customer ingests data into your platform is via a browser JavaScript tag, or
-   You send that data to Meta via the Conversions API

the data is open to the browser-side risks.

To take full advantage of the Conversions API, no part of the data flow should be reliant on the browser.

[Link permanente](#faq_2721848828039105)

[](#)

[How can an advertiser tell if the connection to their Meta Pixel was successful?](#faq_186988685729554)

We recommend that you provide advertisers with a way to test this connection on your own platform.

1.  Send a test event via the Conversions API to the advertiser’s pixel. Look for a `200` return code.
2.  Update the status of the connection appropriately.

[Link permanente](#faq_186988685729554)

[](#)

[Will events sent by browser and Conversions API to a Meta Pixel be counted twice?](#faq_206824943808933)

Meta tries to deduplicate identical events sent through the Meta Pixel and the Conversions API. We determine if events are identical based on their `event_id` and `event_name`. For more information, see [Handling Duplicate Pixel and Conversions API Events](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

[Link permanente](#faq_206824943808933)

[](#)

[What is the external\_id parameter and how is it used?](#faq_180605109921970)

The [`external_id` parameter](/docs/marketing-api/server-side-api/parameters/user-data#external-id) is a string that represents a user on an advertiser's system. These IDs help improve ads attribution and create audiences.

You can send `external_id`s via browser or the Conversions API, but you must be consistent across channels. For example, if you send a browser pixel event with `external_id` set to `123`, your server event for that same user should also have `external_id` set to `123`.

[Link permanente](#faq_180605109921970)

[](#)