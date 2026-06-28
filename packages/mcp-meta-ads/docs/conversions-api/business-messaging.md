---
title: "API de Conversões para Business Messaging"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging"
scraped_at: "2026-02-01T14:07:50.493Z"
---

# API de Conversões para Business Messaging: Guia de integração

A API de Conversões é uma Ferramenta da Meta para Empresas que permite que os Business Messaging Partners compartilhem os dados dos clientes, para os quais têm permissões, diretamente dos próprios servidores. Ela foi desenvolvida para reconhecer automaticamente os controles de privacidade dos usuários da Meta. Isso proporciona segurança para os Business Messaging Partners enviarem dados sobre interações importantes com clientes em chats comerciais para compreender e melhorar o desempenho dos anúncios de clique para o WhatsApp, Messenger ou Instagram dos clientes, aprimorando também a eficiência operacional e expandindo os negócios.

Este guia foi desenvolvido para apoiar Business Messaging Partners na conclusão da integração técnica da API de Conversões para o WhatsApp, Messenger ou Instagram em nome dos clientes. Estes são os tópicos:

1.  Requisitos pré-integração
2.  Etapas de integração
3.  Como enviar eventos por meio da API de Conversões
4.  Como verificar eventos com o Gerenciador de Eventos

**Observação**: a API de Conversões também permite que os anunciantes enviem eventos de [site](/docs/marketing-api/conversions-api/using-the-api), [app](/docs/marketing-api/conversions-api/app-events), [offline](/docs/marketing-api/conversions-api/offline-events) (incluindo loja física) e [CRM](/docs/marketing-api/conversions-api/conversion-leads-integration) para a Meta. Atualmente, os Business Messaging Partners que se integraram à API de Conversões para outros casos de uso precisam executar as etapas a seguir para a integração com a API de Conversões para Business Messaging.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/294976651_611610467207870_1164978025675666563_n.png?stp=dst-webp&_nc_cat=100&ccb=1-7&_nc_sid=e280be&_nc_ohc=kvLBaAvm_aoQ7kNvwFJhBLe&_nc_oc=AdlILVb6NKcSRzIa6kad0gMfDdYhihZUXROUcNp1oMJnGk4jMhLj2Zl5v05t0PMnzDnvIVsLaUx2R68oBrk1xMZN&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gvdaSBMW9Uco6kIRRX9_rA&oh=00_AfuPXC2RTjEHhjWuDjDh8UVv72fmcMMlHn1i78IH97nFrg&oe=69998759)

## Anúncios de clique para o Messenger

### Requisitos pré-integração

Antes de começar a integração, é necessário garantir o estabelecimento das bases técnicas certas e a concessão do acesso relevante a ativos e plataformas específicas.

#### Criar um app de desenvolvedor do Facebook

Caso você não tenha um app de desenvolvedor do Facebook, clique [aqui](/docs/development/create-an-app/) para seguir as instruções e criar um.

#### Integrar com a [Messenger API](/docs/messenger-platform)

  

#### Ter acesso avançado ao seguinte:

-   A permissão [`page_events`](/docs/permissions#p).
    
    -   Você precisará solicitar acesso avançado à permissão `page_events` na seção "Permissões e recursos" do Painel de Apps do desenvolvedor. Caso já tenha acesso avançado à permissão [acesso avançado`pages_messaging`](/docs/permissions#pages_messaging), seu app deve ser automaticamente aprovado para a permissão `page_events` após a solicitação.
        
    
-   O recurso [Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access/). Clique [aqui](/docs/marketing-api/overview/authorization/) para obter mais orientações.
    
    -   Para ser elegível ao recurso Advanced Access, é necessário ter feito 1.500 chamadas da API de Marketing bem-sucedidas com taxa de erro inferior a 10% nos últimos 15 dias. Isso inclui chamadas feitas por meio da API de Conversões por um usuário com uma função no app.
        
    

### Etapas de integração

**1\. Obter token de acesso**

Para chamar a API de Conjunto de Dados e a API de Conversões, você precisa ter um token de acesso com as permissões necessárias:

-   `page_events`
    

Reutilize o token gerado no Login do Facebook para Empresas.

**2\. Obter page\_id**

Você precisa saber a identificação da Página para a qual deseja reportar eventos.

**3\. Configurar o conjunto de dados**

Ao compartilhar dados de eventos por meio da API de Conversões, a Meta precisa saber a origem associada a esses eventos. Os conjuntos de dados permitem que você conecte e gerencie dados de eventos de diferentes origens (como site, app para celular, loja física ou chats comerciais) em um só lugar. Clique [aqui](https://www.facebook.com/business/help/750785952855662?id=490360542427371) para saber mais sobre conjuntos de dados.

Os conjuntos de dados são criados por meio de uma plataforma de parceiro ou no Gerenciador de Eventos. A empresa é proprietária do conjunto de dados; se ela estiver trabalhando com um parceiro, o acesso ao conjunto de dados também será concedido a ele.

Use o `page_id` e o `access_token` para criar um conjunto de dados fazendo uma chamada `POST` para a API de Conjunto de Dados. Se já existir um `dataset_id` associado à página, o ID será retornado. Veja abaixo um exemplo de chamada:

```
https://graph.facebook.com/v16.0/{PAGE_ID}/dataset?access_token={TOKEN}
```

A resposta será um ID, que representa o `dataset_id`. Com esse ID e o token de acesso recebido anteriormente, é possível chamar a API de Conversões para enviar eventos de mensagens à Meta.

**Observação**: se a Página estiver associada a uma conta comercial e a permissão `business_management` tiver sido concedida, o conjunto de dados aparecerá embaixo dessa conta. Caso contrário, ele será ocultado do anunciante.

**4\. Recuperar o ID no escopo da Página (PSID)**

O ID no escopo da Página (`PSID`, pelas iniciais em inglês) é um identificador que representa o usuário em uma conversa entre ele e a empresa. Esse identificador é exposto por meio do webhook de mensagens e usado na API para envio/recebimento. Ele também é usado na API de Conversões ao enviar eventos de conversão associados a um determinado usuário (`PSID`).

Você precisa saber o PSID da Página para a qual deseja reportar sinais.

### Enviar eventos por meio da API de Conversões

Na fase final de integração, é possível enviar eventos por meio da API de Conversões com todas as informações (`access_token`, `page_id`, `dataset_id`, `PSID`) obtidas nas etapas anteriores.

Durante o período da campanha, notifique a Meta em tempo real à medida que os eventos acontecerem por meio da API de Conversões usando o `dataset_id` e o `access_token`. Faça uma solicitação `POST` para essa API:

```
https://graph.facebook.com/v16.0/{DATASET_ID}/events?access_token={TOKEN}
```

Veja a seguir um exemplo de chamada de API para um único evento de compra.

```
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1675999999,
      "action_source": "business_messaging",
      "messaging_channel": "messenger",
      "user_data": {
        "page_id": <PAGE_ID>,
        "page_scoped_user_id": <PSID>
      },
      "custom_data": {
        "currency": "USD",
        "value": 123
      }
    }
  ],
  "partner_agent": "<PARTNER_NAME>"
}
```

### Como verificar eventos com o Gerenciador de Eventos

Depois de enviar um evento para a Meta por meio da API de Conversões, você conseguirá ver esse evento refletido no Gerenciador de Eventos para o conjunto de dados específico. Clique [aqui](https://www.facebook.com/business/help/898185560232180?id=1205376682832142) para saber mais sobre o Gerenciador de Eventos e o respectivo uso.

**Observação**: se você for um parceiro, precisará orientar o anunciante a acessar o respectivo conjunto de dados no Gerenciador de Eventos para verificar se os eventos foram recebidos.

[](#)

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=595945097590761&version=1765810345&transcode_extension=webp)

## Anúncios de clique para o WhatsApp

### Requisitos pré-integração

Antes de começar a integração, é necessário garantir o estabelecimento das bases técnicas certas e a concessão do acesso relevante a ativos e plataformas específicas.

#### Criar um app de desenvolvedor do Facebook

Caso você não tenha um app de desenvolvedor do Facebook, clique [aqui](/docs/development/create-an-app/) para seguir as instruções e criar um.

#### Ter acesso avançado ao seguinte:

-   A permissão [`whatsapp_business_management`](/docs/permissions#whatsapp_business_management).
    
-   A permissão [`whatsapp_business_manage_events`](/docs/permissions#whatsapp_business_manage_events).
    
    -   Você precisará solicitar acesso avançado à permissão `whatsapp_business_manage_events` na seção "Permissões e recursos" do Painel de Apps do desenvolvedor. Caso já tenha acesso avançado à permissão acesso avançado a `whatsapp_business_messaging`, seu app deve ser automaticamente aprovado para a permissão `whatsapp_business_manage_events` após a solicitação.
        
    
-   O recurso [Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access/) para permitir que seu app acesse a API de Marketing. Clique [aqui](/docs/marketing-api/overview/authorization/) para obter mais orientações.
    
    -   Para ser elegível ao recurso Advanced Access, é necessário ter feito 1.500 chamadas da API de Marketing bem-sucedidas com taxa de erro inferior a 10% nos últimos 15 dias. Isso inclui chamadas feitas por meio da API de Conversões por um usuário com uma função no app.
        
    

#### Ter integração com uma das duas opções da [Plataforma do WhatsApp Business](/docs/whatsapp):

-   API de Nuvem hospedada pela Meta (recomendada)
    
-   API Local (\*API do WhatsApp Business versão: 2.45.1): `ctwa_clid`, que é um campo obrigatório para enviar eventos por meio da API de Conversões, está disponível apenas no webhook de mensagens a partir da [versão 2.45.1 da API do WhatsApp Business](/docs/whatsapp/on-premises/changelog/). **Observação**: durante os próximos dois anos, a Plataforma do WhatsApp Business estará em processo de transição para a API de Nuvem de última geração. A última versão compatível do cliente da API Local expirará em 23 de outubro de 2025. [Saiba mais](/docs/whatsapp/on-premises/sunset).
    

#### Ter integração com uma solução de login para autenticação e autorização ([Cadastro Incorporado](/docs/whatsapp/embedded-signup), [Login do Facebook para Empresas](/docs/facebook-login/facebook-login-for-business))

### Etapas de integração

**1\. Obter token de acesso**

Para chamar a API de Conjunto de Dados e a API de Conversões, você precisa ter um token de acesso com a permissão necessária:

-   `whatsapp_business_management`
    
-   `whatsapp_business_manage_events`
    

Caso tenha integração com o [Cadastro Incorporado](/docs/whatsapp/embedded-signup), recomendamos que reutilize o token gerado a partir desse [fluxo](/docs/whatsapp/embedded-signup). Como alternativa, é possível usar um [token de acesso do usuário do sistema de integração comercial](/docs/whatsapp/business-management-api/get-started#business-integration-system-user-access-tokens), [token de acesso do usuário do sistema](/docs/whatsapp/business-management-api/get-started#system-user-access-tokens) ou [token de acesso do usuário](/docs/whatsapp/business-management-api/get-started#user-access-tokens), desde que contenha as permissões necessárias.

**2\. Recuperar a identificação da conta do WhatsApp Business**

A identificação da conta do WhatsApp Business (`waba_id`) pode ser obtido após a conclusão do fluxo de Cadastro Incorporado. [Veja mais informações](/docs/whatsapp/embedded-signup/manage-accounts#get-shared-waba-id-with-accesstoken).

**3\. Configurar a API de Conjunto de Dados**

Ao compartilhar dados de eventos por meio da API de Conversões, a Meta precisa saber a origem associada a esses eventos. Os conjuntos de dados permitem que os Meta Business Solutions Partners conectem e gerenciem dados de eventos de diferentes origens (como site, app para celular, loja física ou chats comerciais do cliente) em um só lugar. Clique [aqui](https://www.facebook.com/business/help/750785952855662?id=490360542427371) para saber mais sobre conjuntos de dados. Os conjuntos de dados são propriedade do cliente e podem ser acessados pelos Meta Business Solutions Partners com as permissões necessárias.

É possível usar o `whatsapp_business_account_id` e o `access_token` para criar um conjunto de dados fazendo uma chamada `POST` para a [API de Conjunto de Dados](/docs/graph-api/reference/whats-app-business-account/dataset/). Se já existir um `dataset_id` associado à conta do WhatsApp Business, o ID será retornado. Veja abaixo um exemplo de chamada:

```
https://graph.facebook.com/v16.0/{WHATSAPP_BUSINESS_ACCOUNT_ID}/dataset?access_token={TOKEN}
```

Para recuperar o dataset\_id, faça uma chamada `GET` à API de Conjunto de Dados com a `whatsapp_business_account_id` e o `access_token`. Veja abaixo um exemplo de chamada:

```
https://graph.facebook.com/v16.0/{WHATSAPP_BUSINESS_ACCOUNT_ID}/dataset?access_token={TOKEN}
```

A resposta será um ID, que representa o `dataset_id`. Agora, o conjunto de dados está configurado e pronto para uso. Depois, você precisará recuperar o `ctwa_clid` necessário para fazer uma chamada da API de Conversões e enviar um evento.

**4\. Recuperar o ID de clique para o WhatsApp**

O ID de clique para o WhatsApp (`ctwa_clid`) é um identificador pessoal, único por clique, que é exposto para a empresa quando o usuário que entra na conversa tiver sido direcionado de um anúncio de clique para o WhatsApp. Esse identificador precisa ser enviado de volta para a Meta por meio da chamada da API de Conversões. Veja a seção abaixo para referência.

O campo `ctwa_cli`d é obtido a partir do [objeto referral](/docs/whatsapp/on-premises/webhooks/inbound/#message-generated-from-ads-that-click-to-whatsapp) no webhook de Mensagens ([API de Nuvem](/docs/whatsapp/cloud-api/webhooks/components#messages-object) | [API Local](/docs/whatsapp/on-premises/webhooks/components#referral)).

Depois de receber o `ctwa_clid`, salve-o com a conversa. Quando uma conversão acontecer na conversa, envie o `ctwa_clid` correspondente por meio da API de Conversões. Veja a seguir um exemplo de mensagem recebida com um objeto de referência contendo um `ctwa_clid`:

```
{
  "data": [
    {
  "contacts": [
    {
      "profile": {
        "name": "Kerry Fisher "
      },
      "wa_id": "16315551234"
    }
  ],
  "messages": [
    {
      "from": "12345678",
      "id": "ABGGFlA5FpafAgo6tHcNmNjXmuSf",
      "referral": {
        "body": "This is a great product",
        "ctwa_clid": "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a", // <CLICK_TO_WHATSAPP_CLICK_ID>
        "headline": "Our new product",
        "image": {
          "id": "e144be57-12b1-4035-a520-703fcc87ef45"
        },
        "source_id": "1234567890",
        "source_type": "ad",
        "source_url": "https://fb.me/AAAAA"
      },
      "text": {
        "body": "Can I learn more about your business?"
      },
      "timestamp": "1678189586",
      "type": "text"
    }
  ]
}
```

### Enviar eventos por meio da API de Conversões

Na fase final de integração, é possível enviar eventos por meio da API de Conversões com todas as informações (`waba_id`, `dataset_id`, `ctwa_clid`) obtidas nas etapas anteriores.

Durante o período de campanha de um anunciante, os eventos acontecem em tempo real. Notifique a Meta sobre esses eventos por meio da API de Conversões usando `dataset_id` e o token de acesso. Faça uma solicitação `POST` para essa API:

```
https://graph.facebook.com/v16.0/{DATASET_ID}/events?access_token={TOKEN}
```

Veja a seguir um exemplo de chamada de API para um único evento de compra.

```
{
  "data": [
    {
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1675999999,
      "action_source": "business_messaging",
      "messaging_channel": "whatsapp",
      "user_data": {
        "whatsapp_business_account_id": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
        "ctwa_clid": "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a", // <CLICK_TO_WHATSAPP_CLICK_ID>
      },
      "custom_data": {
        "currency": "USD",
        "value": 123
      }
    }
  ],
  "partner_agent": "<PARTNER_NAME>"
}
```

### Como verificar eventos com o Gerenciador de Eventos

Depois de enviar um evento para a Meta por meio da API de Conversões, você conseguirá ver esse evento refletido no Gerenciador de Eventos para o conjunto de dados específico. Clique [aqui](https://www.facebook.com/business/help/898185560232180?id=1205376682832142) para saber mais sobre o Gerenciador de Eventos e o respectivo uso.

**Observação**: se você for um parceiro, precisará orientar o anunciante a acessar o respectivo conjunto de dados no Gerenciador de Eventos para verificar se os eventos foram recebidos.

[](#)

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/294212088_1185619815505127_6226283026498321571_n.png?stp=dst-webp&_nc_cat=104&ccb=1-7&_nc_sid=e280be&_nc_ohc=w833MWH93s0Q7kNvwGztdap&_nc_oc=AdkTpokLS1SRXN8ngWJ8rqv5B5Arx7nQJsbr3txhCSnYfbWHP_naWW5Ao4jRJfbWtUfVe92zi9udsONs4s-6CFO8&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=gvdaSBMW9Uco6kIRRX9_rA&oh=00_Afv35HQhYCL7rebajT82_uJ4oKs1TT1gLmfuV1uHxivgmQ&oe=69998714)

## Anúncios de clique para o Instagram Direct

### Requisitos pré-integração

Antes de começar a integração, é necessário garantir o estabelecimento das bases técnicas certas e a concessão do acesso relevante a ativos e plataformas específicas.

#### Criar um app de desenvolvedor do Facebook

Caso você não tenha um app de desenvolvedor do Facebook, clique [aqui](/docs/development/create-an-app/) para seguir as instruções e criar um.

#### Integrar com a [Messenger API](/docs/messenger-platform)

  
  

#### Ter acesso avançado ao seguinte:

-   A permissão [`instagram_manage_events`](/docs/permissions#instagram_manage_events).
    
    -   Você precisará solicitar acesso avançado à permissão `instagram_manage_events` na seção "Permissões e recursos" do Painel de Apps do desenvolvedor. Caso já tenha acesso avançado à permissão `instagram_manage_messages`, seu app deve ser automaticamente aprovado para a permissão `instagram_manage_events`.
        
    
-   O recurso [Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access/). Clique [aqui](/docs/marketing-api/overview/authorization/) para obter mais orientações.
    
    -   Para ser elegível ao recurso Advanced Access, é necessário ter feito 1.500 chamadas da API de Marketing bem-sucedidas com taxa de erro inferior a 10% nos últimos 15 dias. Isso inclui chamadas feitas por meio da API de Conversões por um usuário com uma função no app.
        
    

### Etapas de integração

**1\. Obter token de acesso**

Para chamar a API de Conjunto de Dados e a API de Conversões, você precisa ter um token de acesso com as permissões necessárias:

-   `instagram_manage_events`
    

Reutilize o token gerado no Login do Facebook para Empresas.

**2\. Obter \`instagram\_user\_id\`**

Você precisa saber a `instagram_user_id` da conta do Instagram para a qual deseja reportar eventos.

**3\. Configurar o conjunto de dados**

Ao compartilhar dados de eventos por meio da API de Conversões, a Meta precisa saber a origem associada a esses eventos. Os conjuntos de dados permitem que você conecte e gerencie dados de eventos de diferentes origens (como site, app para celular, loja física ou chats comerciais) em um só lugar. Clique [aqui](https://www.facebook.com/business/help/750785952855662?id=490360542427371) para saber mais sobre conjuntos de dados.

Os conjuntos de dados são criados por meio de uma plataforma de parceiro ou no Gerenciador de Eventos. A empresa é proprietária do conjunto de dados; se ela estiver trabalhando com um parceiro, o acesso ao conjunto de dados também será concedido a ele.

Use o `instagram_user_id` e o `access_token` para criar um conjunto de dados fazendo uma chamada `POST` para a API de Conjunto de Dados. Se já existir um `dataset_id` associado ao usuário do Instagram, o ID será retornado. Veja abaixo um exemplo de chamada:

```
https://graph.facebook.com/v16.0/{IG_USER_ID}/dataset?access_token={TOKEN}
```

A resposta será um ID, que representa o **`dataset_id`**. Com esse ID e o **token de acesso** recebido anteriormente, é possível chamar a API de Conversões para enviar eventos de mensagens à Meta.

**4\. Recuperar o ID no escopo do Instagram**

O ID no escopo do Instagram (`IGSID`, pelas iniciais em inglês) é um identificador que representa o usuário em uma conversa entre ele e a empresa. Esse identificador é exposto por meio do webhook de [mensagens](/docs/messenger-platform/instagram/features/webhook) e usado na API para envio/recebimento. Ele também é usado na API de Conversões ao enviar eventos de conversão mapeados para um determinado usuário (`IGSID`). Veja mais informações na próxima seção.

Você precisa saber o `IGSID` da conta do Instagram para a qual deseja reportar eventos.

### Enviar eventos por meio da API de Conversões

Na fase final de integração, é possível enviar eventos por meio da API de Conversões com todas as informações (`dataset_id`, token de acesso, `instagram_user_id`, `IGSID`) obtidas nas etapas anteriores.

Durante o período da campanha, notifique a Meta em tempo real à medida que os eventos acontecerem por meio da API de Conversões usando o `dataset_id` e o token de acesso. Faça uma solicitação `POST` para essa API:

```
https://graph.facebook.com/v16.0/{DATASET_ID}/events?access_token={TOKEN}
```

Veja a seguir um exemplo de chamada de API para um único evento de compra.

```
{    
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1675999999,
      "action_source": "business_messaging",
      "messaging_channel": "instagram",
      "user_data": {
        "instagram_business_account_id": <instagram_business_account_id>,
        "ig_sid": <IGSID>
      },
      "custom_data": {
        "currency": "USD",
        "value": 123
      }
    }
  ],
  "partner_agent": "<PARTNER_NAME>"
}
```

### Como verificar eventos com o Gerenciador de Eventos

Depois de enviar um evento para a Meta por meio da API de Conversões, você conseguirá ver esse evento refletido no Gerenciador de Eventos para o conjunto de dados específico. Clique [aqui](https://www.facebook.com/business/help/898185560232180?id=1205376682832142) para saber mais sobre o Gerenciador de Eventos e o respectivo uso.

**Observação**: se você for um parceiro, precisará orientar o anunciante a acessar o respectivo conjunto de dados no Gerenciador de Eventos para verificar se os eventos foram recebidos.

[](#)

## Perguntas frequentes

**Quais tipos de eventos de mensagens são compatíveis com a API de Conversões para Business Messaging?**

**R**. A API de Conversões para Business Messaging agora é compatível com os seguintes tipos de eventos de mensagens:

-   Purchase
    
-   LeadSubmitted
    
-   InitiateCheckout
    
-   AddToCart
    
-   ViewContent
    
-   OrderCreated
    
-   OrderShipped
    
-   OrderDelivered
    
-   OrderCanceled
    
-   OrderReturned
    
-   CartAbandoned
    
-   QualifiedLead
    
-   RatingProvided
    
-   ReviewProvided
    

Observe que os eventos de mensagens devem representar apenas interações com os clientes que ocorrem no tópico das mensagens, e não conversões que acontecem em outros canais, como sites. É possível diferenciar seus eventos escolhendo a fonte da ação correspondente durante o processo de integração.

**Há orientação da Meta sobre usar um ou vários apps para diferentes integrações da API de Conversões?**

**R**. Como uma boa prática, o parceiro deve usar um único app para que a Meta possa identificar todos os eventos enviados por ele. Se você for um parceiro que possui vários apps, defina partner\_agent como o nome do agente de parceiro atribuído a você. Em caso de dúvidas, fale com seu representante da Meta.

**Quando uma conversão ocorre fora da conversa (por exemplo, no meu site ou app), como posso enviar os eventos à Meta?**

**R**. Se uma conversão acontecer fora da conversa, você ainda poderá enviar esse evento à Meta usando o produto relevante da API de Conversões. Por exemplo, se acontecer uma conversão no site, use a API de Conversões para a web. Caso a conversão ocorra no app, use a API de Conversões para eventos do app. O evento ainda será atribuído ao ID de clique para a API de Conversões para a web. A lista completa de parâmetros pode ser encontrada aqui.

**A API de Conversões permite a otimização de anúncios de clique para mensagem?**

**R**. A API de Conversões permite o acesso à otimização de compras apenas em anúncios de clique para o Messenger e para o WhatsApp. No momento, ela não está disponível para a otimização de anúncios do Instagram. Nos anúncios de clique para o Instagram, você pode otimizar suas campanhas para gerar mais conversas.

**Posso reutilizar o conjunto de dados existente com a API de Conversões para mensagens da empresa?**

**R**. Sim, aceitamos a vinculação com um conjunto de dados existente. Consulte as opções disponíveis para decidir a opção certa para sua empresa.

**Se eu já estiver usando a API de Conversões para o site, adicionar mensagens da empresa interferirá na minha integração?**

**R**. Não há riscos em adicionar mensagens da empresa à sua integração da CAPI existente. A atribuição é baseada na identificação da página/do conjunto de dados e não está relacionada com o ID do app.

**Quantos conjuntos de dados podem ser vinculados a uma página?**

**R.** Só é possível associar um conjunto de dados a uma página.

**Preciso desduplicar eventos antes de enviá-los usando a API de Conversões para Business Messaging?**

**R**. A Meta não ajuda a desduplicar eventos para a API de Conversões para Business Messaging. Por isso, recomendamos que os anunciantes realizem a desduplicação antes de enviar os eventos usando a API em questão.

[](#)

## Veja também

-   [Visão geral da API de Conversões](/docs/marketing-api/conversions-api)
    
-   [Como usar a API](/docs/marketing-api/conversions-api/using-the-api)
    
-   [API de Conversões: Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices)
    
-   [Plataforma do WhatsApp Business](/docs/whatsapp) ([API Local](/docs/whatsapp/on-premises/webhooks/components#referral) ou [API de Nuvem](/docs/whatsapp/cloud-api/webhooks/components#messages-object)) com a API do WhatsApp Business v2.45.1 e versões posteriores.
    
-   [API de Mensagens do Instagram](/docs/messenger-platform/instagram)
    

[](#)