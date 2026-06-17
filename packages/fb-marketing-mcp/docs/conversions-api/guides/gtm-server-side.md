---
title: "API de Conversões para o Gerenciador de tags do Google"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gtm-server-side"
scraped_at: "2026-02-01T15:49:51.175Z"
---

# API de Conversões para o Gerenciador de tags do Google no lado do servidor

A [API de Conversões](https://www.facebook.com/business/help/2041148702652965?id=818859032317965) foi desenvolvida para criar uma conexão direta entre seus dados de marketing e os sistemas que ajudam a otimizar o direcionamento de anúncios, diminuir o custo por ação e mensurar os resultados em tecnologias da Meta. É possível configurar um servidor no Google Cloud Platform (GCP) ou outro provedor de nuvem para enviar dados importantes de eventos offline e da web por meio da API de Conversões. Com esse processo, depois de configurar a tag da web do Google Analytics 4 (GA4), você pode enviar os dados ao seu próprio servidor hospedado no Google Cloud Platform (GCP) e, por fim, à Meta usando a API de Conversões.

A [tag da API de Conversões](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2FConversionsAPI-Tag-for-GoogleTagManager%2Fblob%2Fmain%2Ftemplate.tpl&h=AT3uekXGXg9GmVt4kaK_gkjw-o0vk_z6WUubBOUuPBd4s6dS804Z565MGZtklmi4O533u_TJUiEX55zU0TUZp5S7Unc6Zc2sdsJ4_jqyJXFVzOPBTQZaf2MPdb3unnC_wkfdhV35hp0Ev_a50_zAqTVj7plT6Vtuukxhm5H7mao) é escrita e mantida pela Meta com base no [modelo de tag personalizado](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Ftemplates&h=AT3822FHGBTj5PNIaHsBdKNVQyKdhnimYTcpMPdmDbYLsSjp53JSUPNFApREwmvQhcdHx2V6t8JffwF4limf2YZ79ssdkqCKZj0kYTGh0XguIPAc0l59AEUWmZjbkka2UQqM7Mx3X2KZ1KlYfy8RTvhZvKV6O38SMuQfZzo3d80) do Google. Entre em contato com o Google se tiver dúvidas sobre como configurar os produtos ou acessar a documentação para desenvolvedores da empresa.

Este documento descreve o seguinte:

-   Pré-requisitos, incluindo como criar um contêiner de servidor
    
-   Como configurar o contêiner para oferecer compatibilidade com sua implementação da tag da web do GA4
    
-   Como enviar dados do seu site para o servidor do GCP
    
-   Como compartilhar esses dados com a Meta por meio da API de Conversões
    
-   Perguntas frequentes
    

## Pré-requisitos

Antes de prosseguir com essa integração, recomendamos que você faça o seguinte:

1.  Conheça a [integração da API de Conversões](/docs/marketing-api/conversions-api/) e as [boas práticas](/docs/marketing-api/conversions-api/best-practices) para configuração.
2.  Explore a [marcação no servidor](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fintro&h=AT2yYyIlzk2wE765V6QQsE2FDvkvSgQAsV8cUGkfgo4X4UWKahqE-gEenfeMKZjqin8FjIzBGKKZw8_08EEKe4pCxzxB9YZ_kJ7DI244LoKbyELFn5UQYPglA34g1fGsY4_zjEW7kPG4vkqGCaLJeW-6AP44Jm9HQR7J0iNVy5RTkX_cFjHzSMmV) e o [modelo de tag personalizado](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Ftemplates&h=AT0Hsh2Lf2Gu9Ti-CEI-WyhaK87iJbOTinP5d2hhvUHZkj1tFZdF7p0w9Ed5sePma8oSMwdrOW5IqWte9MMIt1RTs7mGd618lvpcKqmgmPIjWKbYpxMKIfr4oOA8_v8KMWFfbbYAyNvUp6V9WCtzHdcTUk1NHhg7IvZX4m8EOB0).

Caso seu sistema use uma versão anterior ao GA4, atualize a configuração do gerenciador de tags atual para usar o GA4 antes de continuar com essa integração.

[](#)

## Integração

### Criar um contêiner de servidor do Gerenciador de tags do Google

Esse recurso permite gerenciar e armazenar tags de rastreamento e marketing. Ele também ajuda você a monitorar como os usuários interagem com seu site.

Você precisará configurar um contêiner de servidor e um da web:

-   **Contêiner da web**: se for a primeira vez que você usa o Gerenciador de tags do Google (GTM, pelas iniciais em inglês), comece instalando um contêiner da web na sua conta. Saiba mais [aqui](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F6103696%3Fhl%3Den%23install&h=AT0eG1wUzI9uPFB_0fxGNPzxoesn_ipDhFuEI4yUmuKv2N9dPrWDBey52651IGCu0Nl1zO38HG7LNnb63vsZm7KS9Fqc3gRjPnglPeFeEACoI7_b_c5RtFj_WsRd8ZuUxy59-28DpwkKaypLvWgD7zn8OGthRg1dvdcvai3HKK0).
    
-   **Contêiner de servidor**: você terá que criar um contêiner de servidor no seu portal do GTM para configurar uma URL do servidor de marcação. Saiba mais sobre [esta etapa](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side&h=AT13CzFqYB-a9LlxggoK5UV2wTIc18gO9uRZ89CxFhVFBO408tOEtxJupwWw37ZigbMhk2SAyUMKBw17jFFMWQOcarkbCuA47XRtRMfpjKxr1sE4nvaRF8iv4tlSB7mpI88IbjJgCBxhf5zX1qFGGQkJjWNdw8eaxrSeD_Q_kQM).
    

Para acessar o Gerenciador de tags do Google, visite o [site da ferramenta](https://l.facebook.com/l.php?u=https%3A%2F%2Ftagmanager.google.com%2F&h=AT2gCGih2kslTVKZHVhBwe-eQp5WZiKk9cOZTYVpCp8dNqkZj6fUmggSdj9GrNcwCN7sk5Pog-GQ72YULaSdNFVhl5KFT0zPbt2QWGVFaguVJVJzIpgjN7IXp3FWmqbBg6O5JBVgTHiVQisKJBdLUpxPwKlk1dJBlnxZHYnRL4A).

#### Criar um novo contêiner

Se você já tiver uma conta, selecione essa opção. Caso contrário, crie uma nova conta do GTM.

-   Clique em **Criar contêiner**.
    
-   Nomeie seu contêiner e selecione "Servidor" como a plataforma de destino.
    
-   Clique em **Criar**.
    

Para configurar um contêiner de servidor, é preciso definir um servidor de marcação. A implantação padrão do GCP pode ser concluída ao configurar o contêiner do servidor. Consulte [estas orientações](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%23what_is_the_domain_of_my_tagging_server&h=AT0SE0lZw-wC_VDyrXGFqY59RcN_5HxrJ1oUl_jFig2HMxJGUizrCJ5Rda2R6pHFK_GRMoDVcbwI8GFOvD-xDy93i8T5klW0wN-YjfS0XsMib61H1iqPoQDQbBa0-3ahP9MQwrUKbfIEeKecSrIXZa0n_liAdryDTBsDxjYlZns). Para outros provedores de nuvem (como AWS ou Microsoft Azure), consulte o [guia de configuração manual do servidor](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fmanual-setup-guide&h=AT2K9S9xYL3LDbypMRPb9ptUMRero_VoORug8o4aUf2KTsrJ2XvsOYOg4UaAKl8vgzxQWQHUZx6ja_Fbfw-PTWDfZsq8S8MfY3GqsSg4LU9U9RVfuTm1fqUoN1t80kFMrjtcsXrdsGG9WT9ZutgbZYOz8slkGI82_WH3FrF4quk).

**Configurar contêineres de servidor e da web**

1.  No seu contêiner da web, crie os seguintes artefatos:
    -   Configuração do GA4 para definir a URL do servidor de marcação
        
    -   Evento do GA4 para definir o esquema de eventos a ser entregue ao servidor
        
2.  No seu contêiner de servidor, crie os seguintes artefatos:
    -   Cliente do GA4, um ouvinte que dispara o evento para a Meta
        
    -   Tag da API de Conversões da Meta, uma tag do lado do servidor que converte o modelo de evento padrão do cliente do GA4 para o esquema de eventos da API de Conversões e o envia a `graph.facebook.com`
        

[](#)

## Etapa 1 – Configuração do GA4: definir a URL do servidor de marcação

Configure o contêiner da web para enviar os dados do seu site ao servidor de marcação que foi criado. [Saiba mais](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fsend-data%3Fhl%3Den%23google-analytics-4&h=AT3vHF9Dj2E78BrqXyex9VpJIRdiu9QDG6YYl8eHpNTHAAwTr0CpUyT_nk9Tzwqs7uqpaDqjWLUlClEe4rZ4hT21nraL5Llvz9PvSfxyhnkMMmPnH3WkZgExjM0KkNdWf0er3dsP-0R6vhLSZbQM2fbqY7bQS6U3rHa29dFAkvU) sobre como configurar a [tag Google Analytics: configuração do GA4](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F9442095%3Fhl%3Den%23config&h=AT1bexnkaI6QB37Ixa-afc6AyEjSvUa08h0qJ9-NnlMkwryTAUFjRLfiBgGF_YRjwMINYOrLGY3ed_Ob9ld-DMCQWp8uawfRfVcjxG53oBT3d2mVrIwuyj7Ehqfq73MCiTsd_aFbOmIcowpKxhz511GBUToNRnfSbCVkGP5mVcw).

-   Caso selecione **Enviar para contêiner do servidor**, configure a respectiva URL como a URL do servidor de marcação.
    
-   Caso não tenha selecionado **Enviar para contêiner do servidor**, adicione uma linha em **Campos a serem definidos** e configure:
    
    -   Nome do campo: `transport_url`
        
    -   Valor do campo: a URL do servidor de marcação
        
    

É possível configurar campos adicionais como parâmetros a serem enviados para todos os eventos.

-   Defina o sinalizador first\_party\_collection como true. É necessário fazer isso se você quiser passar os parâmetros user\_data para o GTM no lado do servidor. Adicione uma linha em **Campos a serem definidos** e configure:
    
    -   Nome do campo: `first_party_collection`
        
    -   Valor do campo: `true`
        
    

### Como usar uma tag de configuração existente do GA4

Caso você já tenha configurado o GA4, é possível fazer alterações ou criar uma tag de configuração adicional para o GTM do servidor.

Se você estiver configurando o GTM do servidor pela primeira vez, adicionar a URL do contêiner do servidor iniciará o envio de todo seu tráfego para ele. Caso queira continuar enviando dados para o GA4, será preciso adicionar a tag desse servidor no contêiner, garantindo que ele seja acionado em todos os eventos. Talvez seja necessário criar outras tags de evento do GA4 ou modificar as existentes para garantir um mapeamento completo dos eventos de pixel da Meta.

### Como enviar a identificação do navegador e a identificação do clique da Meta

Se você configurou um domínio personalizado e tem um domínio de servidor de marcação primário do GTM, a identificação do navegador e a identificação do clique da Meta são enviadas automaticamente.

Se você usar o domínio padrão ou perceber que os campos de identificação do navegador e identificação do clique não estão sendo enviados no Gerenciador de Eventos, é possível configurar esses campos da seguinte forma:

-   Navegue até a seção de variáveis e crie uma definida pelo usuário como a identificação do navegador e a identificação de clique da Meta. Use o tipo de variável de cookies internos.
    
    -   Para a identificação do navegador da Meta, defina o nome do cookie como `_fbp`.
        
    -   Para a do clique da Meta, defina o nome como `_fbc`.
        
    
-   Salve essas variáveis.
    
-   Na tag de configuração do GA4, adicione uma linha em **Campos a serem definidos** e configure:
    
    -   Nome do campo: x-fb-ck-fbp
        
    -   Valor do campo: a variável de identificação do Navegador da Meta
        
    
-   Adicione outra linha para a identificação de clique:
    
-   Nome do campo: x-fb-ck-fbc
    
-   Valor do campo: a variável de identificação do clique da Meta
    

Crie uma variável de camada de dados para cada parâmetro user\_data do esquema de eventos comum do GTM. [Saiba mais](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F6164391%3Fhl%3Den&h=AT2ayeNyIG1L41x4x1A-G8-8rY3uMWbtjcC5gnI1A6c58_CIGc19nDZDsAeo2X63rTpvax5RzOqg6E8Glrk1vcv65iwFGEhXRvuMiCkAZFzBu7Ja6W2oCGPYOtxjNmh5inLUtup-C5QTB9cfoZaGKvvAvlmrnEaVR9XdZ97fSD0) sobre como configurar variáveis de camada de dados. Por exemplo, para transmitir um endereço de email para o GTM no lado do servidor, crie uma variável (como `user_data_email_address`) que pode ser mapeada até o nome da variável de camada de dados, `eventModel.user_data.email_address`.

Caso você não esteja usando a camada de dados, configure as variáveis de cada parâmetro conforme indicado abaixo. A lista abaixo mostra todos os mapeamentos para parâmetros user\_data da Meta e do GTM e a prioridade geral de cada um deles para ajudar a aumentar a qualidade da correspondência de eventos. Para aproveitar ao máximo os anúncios da Meta, siga as [boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices/) ao configurar uma integração. Caso você já tenha configurado a API de Conversões, considere seguir estas boas práticas para aprimorar sua [configuração](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fads-setup%23configure_google_analytics_ga4_config_web_tag&h=AT3X2uOYweVcrsKmnCD11IfHIklr6o5Av6HD1F-uXglmh1V5fDhhORQ5zGmq-6ghEgt9oXTddNVbScYO5TcDXEP3wFkxepjKjZnTyqWBpzvUKQ5pVn2HCrWl4u1YFIhtBAWBT46BP-MCcWrYAiAA4XRWIh4eyW9zu9JNltVrq7U). As boas práticas da API de Conversões podem ajudar a melhorar o desempenho do seu anúncio reduzindo o custo por ação.

Parâmetro da Meta da API de Conversões

Nome do campo do GA4

Nome da variável de camada de dados do GTM

Prioridade

Email

`email_address`(`em`)

user\_data.email\_address

eventModel.user\_data.email\_address

Alta

Identificação do clique

`fbc`

x-fb-ck-fbc

N/A

Alta

ID de Login do Facebook `fb_login_id`

user\_data.fb\_login\_id

N/A

Média

Data de nascimento

`db`

x-fb-ud-db

N/A

Média

País

`country`(`country`)

user\_data.address.country

eventModel.user\_data.address.country

Média

Número de telefone

`phone_number`(`ph`)

user\_data.phone\_number

eventModel.user\_data.phone\_number

Média

Identificação externa

`external_id`

x-fb-ud-external\_id

N/A

Média

Identificação do navegador

`fbp`

x-fb-ck-fbp

N/A

Média

Estado

`state`(`st`)

user\_data.address.region

eventModel.user\_data.address.region

Média

Gênero

`ge`

x-fb-ud-ge

N/A

Média

Nome

`first_name`(`fn`)

user\_data.address.first\_name

eventModel.user\_data.address.first\_name

Baixa

Sobrenome

`last_name`(`ln`)

user\_data.address.last\_name

eventModel.user\_data.address.last\_name

Baixa

Cidade

`city`(`ct`)

user\_data.address.city

eventModel.user\_data.address.city

Baixa

Código postal `postal_code`(`zip`)

user\_data.address.postal\_code

eventModel.user\_data.address.postal\_code

Baixa

[](#)

  

## Etapa 2 – Evento do GA4: configurar o esquema de eventos a ser entregue ao servidor

-   Configure o contêiner da web para enviar os dados do seu site ao servidor de marcação que foi criado para adicionar o Google Analytics. [Saiba mais](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fsend-data%3Fhl%3Den%23google-analytics-4&h=AT1XSzMYIdo8pNnYu3I0UyZsq3Hb5X9fypZxa_h5fxAQKJMW7-Tq7w995PCEe9b1TLX3Owi7vU0s2SRM-Jy_Rr2l5dhdLWD-7thVCXm-j52sYiynmRWfvCLvX2vGZpOv7CawCvRGe8nV9I7b3LyL8OVOW-M8n4KQOym_gN3Xwq4) sobre como configurar a [tag Google Analytics: configuração do GA4](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F9442095%3Fhl%3Den%23config&h=AT1acHcNsuR-qxS2Tz2zk5dhaHUCVjoRMylL7W7W1B9RKCGEUEAqJBff7GRYL1NKLaLO81vtoVba5eBgTPvV4g65sfBEKwuMiGRUzq3omIRMbT94AsyVKTgaXMPtMaLLx_0phWNYai6Nnh7ntn09UNnyVH4IdxBWwS62AQw4BC0).
    
-   Adicione a tag Google Analytics: evento do GA4 ao Workspace usando a galeria de modelos.
    
    -   Configure um nome de evento para a tag. Isso pode ser definido como um valor estático ou configurado para ler a partir de uma variável. Para determinados eventos padrão, mapearemos os do Google Analytics aos equivalentes da Meta. Nesses eventos, é possível usar o nome do evento do Google Analytics ou o da Meta. Nos outros eventos padrão, use o da Meta. Em eventos personalizados, use o nome do evento personalizado. [Saiba mais](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F7679219%3Fhl%3Den&h=AT28xI1p6KvTfEyyCzLuE_wsXZzwuwkGrnCsnSlH4mdr9ozLnuCeW98ZdTkCHnDFDPFBoMvz4xHy6copZSUgRnA59gxtKE_AMQrm30weIliZjSaH8Sozh9bs5UTUGgWxJ-pksUZwB-7aYcg6VvZk3HvT77ZnM9N-3qHoHc-sO4s).
        
    

Nome do evento-padrão da Meta

Nome do evento padrão do Google Analytics

AddPaymentInfo

add\_payment\_info

AddToCart

add\_to\_cart

AddToWishlist

add\_to\_wishlist

PageView

gtm.dom

PageView

page\_view

Purchase

purchase

Search

search

InitiateCheckout

begin\_checkout

Lead

generate\_lead

ViewContent

view\_item

CompleteRegistration

sign\_up

  

-   Na seção de parâmetros do evento, faça o seguinte:
    
    -   Se você está usando o Pixel da Meta, adicione o parâmetro de ID do evento. Use event\_id como nome do parâmetro e a variável criada para o ID do evento como o valor do parâmetro. Consulte a seção **Desduplicação** para saber como criar a variável de ID do evento e modificar o Pixel da Meta.
        
    -   Mapeie cada um dos parâmetros que você quer configurar. O nome da variável será lido a partir do evento usando um esquema de eventos comum. Por exemplo, para configurar "email" como um parâmetro de evento, defina o nome de parâmetro user\_data.email\_address e o valor como o nome da variável que lê o email\_address (definida na etapa 1).
        
    -   Para ver a lista completa, consulte a seção [Parâmetros de dados personalizados](#custom-data-params-gtm).
        
    

[](#)

## Etapa 3 – Criar um ouvinte para o evento que aciona o evento para a Meta

Cada contêiner no lado do servidor do GTM vem com um cliente do GA4 padrão para ouvir eventos configurados a partir da sua tag da web do GA4. O cliente do GA4 detecta a rota /g/collect na URL do servidor de marcação e envia o _eventModel_ à tag posterior. Se o cliente padrão do GA4 já estiver instalado no seu contêiner de servidor, pule para a etapa 4.

[](#)

## Etapa 4 – Criar a tag da API de Conversões da Meta, uma tag do lado do servidor que converte o modelo de evento padrão do cliente do GA4 para o esquema de eventos da API de Conversões e o envia a graph.facebook.com

Para enviar o evento à API de Conversões, você precisa instalar a tag da API de Conversões da Meta usando a Galeria de modelos. O modelo de marcação se chama **Tag da API de Conversões** pelo **facebookincubator**. É possível configurar essa tag para ser acionada em eventos recebidos pelo cliente do GA4 na etapa anterior e enviada à API de Conversões. Para instalar a tag da API de Conversões da Meta, você precisa ter uma identificação do pixel e um token de acesso, além de especificar a fonte da ação como "site". Ao usar a API de Conversões, você concorda em garantir a precisão do parâmetro `action_source` conforme seu conhecimento.

[](#)

## Como testar a integração

Recomendamos usar o modo de prévia do Gerenciador de tags do Google para testar as integrações antes de publicar as alterações. Os contêineres da web e do servidor possuem modos de prévia e podem ser executados ao mesmo tempo.

Se você alterar a configuração enquanto executa o modo de prévia, reinicie a prévia para garantir que as alterações sejam refletidas no teste.

É possível usar o recurso Eventos de Teste do Gerenciador de Eventos para verificar se os seus eventos de servidor estão sendo recebidos conforme esperado. Para encontrar a ferramenta, vá para **Gerenciador de Eventos** > **Fontes de dados** > **Pixel de \[nome do usuário\]** > **Eventos de Teste**.

A ferramenta Eventos de Teste gera um ID de teste. Envie esse ID de teste como um parâmetro `test_event_code` na tag de API de Conversões para ver a atividade do evento na janela dos Eventos de Teste. Remova-o antes de publicar as alterações.

A ferramenta de eventos de teste permite que você verifique se os eventos estão sendo recebidos e as respectivas duplicações estão sendo eliminadas corretamente. Caso não veja os eventos após um minuto ou dois, consulte o depurador do servidor do GTM para verificar se a solicitação foi realizada corretamente:

1.  No depurador do servidor, escolha o evento a ser verificado no menu à esquerda.
2.  Verifique se a tag está sendo exibida na seção de tags acionadas. Se for o caso, você verá "Conversions API Tag - Succeeded" ou "Conversions API Tag - Failed".
    -   **Tag não acionada**: verifique o gatilho da tag da API de Conversões e o do evento do GA4 relacionado no contêiner da web. Consulte o depurador da web para ver se o evento do GA4 foi acionado.
        
    -   **Tag acionada com sucesso**: clique na tag e verifique se o código do evento de teste está correto. Se necessário, atualize esse código e reinicie o modo de prévia.
        
    -   **Tag acionada com falha**: abra a aba de solicitação e clique na solicitação de saída enviada para `https://graph.facebook.com`. Analise o corpo da resposta nos detalhes na parte inferior da solicitação para ver o tipo de erro e atualize a integração conforme necessário. Não esqueça de reiniciar o modo de prévia depois de fazer alterações.
        

Quando os eventos forem exibidos, verifique se os IDs de evento estão sendo enviados, bem como se todas as chaves de correspondência esperadas e os parâmetros de dados personalizados estão sendo mostrados corretamente. A ferramenta de eventos de teste mostrará se a desduplicação dos eventos está ocorrendo corretamente. Caso os IDs de evento sejam diferentes, garanta que as tags do GA4 e do Pixel da Meta sejam acionadas no mesmo gatilho e revise sua implementação da variável de ID de evento.

[](#)

## Desduplicação

Recomendamos que você use uma configuração de evento redundante e compartilhe os mesmos eventos da API de Conversões e do Pixel da Meta. Verifique se ambos os eventos usam o mesmo `event_name` e se `event_id` ou uma combinação de `external_id` e `fbp` estão incluídos.

Isso permite que a Meta desduplique eventos e diminua os relatórios duplos de eventos idênticos. [Saiba mais sobre a desduplicação, quando ela é necessária e como configurá-la](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/). [external\_id e fbp](/docs/marketing-api/conversions-api/parameters/external-id/) são soluções alternativas para desduplicação e também ajudam a melhorar a qualidade da configuração. Recomendamos incluir os três parâmetros sempre que possível.

O GTM tem diversas maneiras de configurar um parâmetro com o mesmo valor em uma tag de navegador e uma de servidor. Uma delas é usar o mesmo evento do GA4 para acionar a tag do Pixel da Meta e o evento do servidor. Para fazer isso:

-   Use o mesmo gatilho para a tag de HTML personalizada e a tag de evento do GA4 do seu Pixel da Meta. Por exemplo, é possível definir uma condição de gatilho com base na URL da página de confirmação do pedido.
    
-   Use a mesma `event_id` nas duas tags:
    
    1.  Crie uma identificação única do cliente: defina um parâmetro personalizado (`x-fb-event_id`) a partir do evento gtag. Gere uma identificação única (por evento) no site usando um método JavaScript (ou a variável JavaScript personalizada do Gerenciador de tags do Google) e defina o valor no evento como:
    ```
    gtag('event', 'purchase', {
     'x-fb-event_id': generateEventId(),
    ...:...
    
     });
    ```
    É possível criar uma variável que direcione para o JavaScript personalizado mostrado acima. Sempre que a variável for consultada, o JavaScript abaixo será carregado na linha:
    ```
    function() {
    var gtmData = window.google_tag_manager[{{Container ID}}].dataLayer.get('gtm');
    return gtmData.start + '.' + gtmData.uniqueEventId;
    }
    ```
    4.  Crie e preencha uma variável de camada de dados: você pode criar sua própria variável no contêiner da web para ler o valor de `event_id`. Para fazer isso, crie uma nova variável de camada de dados, por exemplo, FBEventIdVar, com o nome definido como `eventModel.event_id`.
    5.  Depois que a variável for definida, conecte-a ao evento da web na sua tag HTML personalizada e no evento do servidor como um parâmetro de evento do GA4 adicional.
    6.  Na web, você pode configurar sua tag da Meta nos contêineres da web do Gerenciador de tags do Google para ler `event_id` a partir da variável.
    ```
    fbq('track', Purchase, {..}, {eventID: FBEventIDVar });
    ```
    Configure o evento do GA4 para enviar um parâmetro extra, chamado `event_id` e definido como a variável `FBEventIdVar`.
    

[](#)

## Parâmetros de dados personalizados

Para enviar dados personalizados, use os mapeamentos abaixo nas suas tags de eventos do GA4:

Nome do parâmetro da Meta

Nome do parâmetro do GA4

value

value

currency

currency

search\_string

search\_term

order\_id

transaction\_id

content\_ids

x-fb-cd-content\_ids

content\_type

x-fb-cd-content\_type

content\_name

x-fb-cd-content\_name

content\_category

x-fb-cd-content\_category

contents\*

items OU x-fb-cd-contents

num\_items

x-fb-cd-num\_items

predicted\_ltv

x-fb-cd-predicted\_ltv

status

x-fb-cd-status

delivery\_category

x-fb-cd-delivery\_category

custom\_properties\*

custom\_properties

Inclua JSON.stringify _x-fb-cd-contents_ e _custom\_properties_ antes de enviar, já que esses são parâmetros JSON definidos pela Meta.

[](#)

## Enviar dados do seu site ao servidor do GCP

Depois de concluir essas configurações, envie um exemplo de evento do seu site para verificar o evento do servidor. Um exemplo de evento com os parâmetros configurados pode ter esta aparência:

```
gtag('event', 'purchase', 
  {
    'event_id': generateEventId(),
    'transaction_id': 't_12345',
    'currency': 'USD',
    'value': 1.23,
    user_data: {
      email_address: '<HASHED_DATA>',
      phone_number: '<HASHED_DATA>',
      address: {
        first_name: '<HASHED_DATA>',
        last_name: '<HASHED_DATA>',
        city: '<HASHED DATA>',
        region: '<HASHED_DATA>',
        postal_code: '<HASHED_DATA>',
        country: '<HASHED_DATA>'     
      },    
    },
    items: [
      {
        item_id: '1',
        item_name: 'foo',
        quantity: 5,
        price: 123.45,
        item_category: 'bar',
        item_brand: 'baz'     
      }
    ], 
  });
```
  

Depois que o evento for acionado, você deverá ver uma solicitação enviada (por exemplo, para um link de amostra: www.analytics.example.com/g/collect), com os parâmetros configurados. Adicione o [código do evento de teste](/docs/marketing-api/conversions-api/payload-helper/) à tag da API de Conversões da Meta para [verificar eventos](/docs/marketing-api/conversions-api/using-the-api#verify) enviados a essa API. O código do evento de teste só deve ser usado em testes. É necessário removê-lo ao enviar sua carga de produção.

Depois de publicar as alterações, consulte [Verifying Your Setup](/docs/marketing-api/conversions-api/verifying-setup) para garantir os eventos sejam enviados corretamente na verificação de configuração da API de Conversões e analise se a integração de qualidade atende às nossas [boas práticas](/docs/marketing-api/conversions-api/best-practices/).

[](#)

## Perguntas frequentes

**Existem planos para adicionar a capacidade de enviar parâmetros personalizados? Se a resposta for afirmativa, quando esse recurso estará disponível?**  
**R**: Adicionamos mapeamento para a maioria dos parâmetros personalizados padrão da API de Conversões que são compatíveis com o esquema do GTM. Também fornecemos mapeamento personalizado. [Clique aqui](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2FConversionsAPI-Tag-for-GoogleTagManager%2Fblob%2Fmain%2Ftemplate.tpl%23L206-L220&h=AT3OEJ7v0ZLbbMWit4LfPAHHUFuS6KRpm-VVA3w5P6xqPrgyrxZkGYFp5h62RL5XZnJ5WKSIIFjceFEIaVFPy7WOVW9_mq7jpcfdbmY7iM6BISpnVTtwetfkf7bdIeeughChAhun21uQlvkCtPrNNIvx5oDZSIt3lgFQwNAObog) para saber mais.

**Um único servidor ou cluster é capaz de executar vários contêineres?**  
**R**: Atualmente, o GTM é compatível apenas com o mapeamento individual. [Leia as recomendações sobre como organizar contêineres](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Ftagmanager%2Fanswer%2F6261285%3Fhl%3Den&h=AT3jrvY0iU4UFLBEgYI-0tMZU98F0R_eJTHFQrJLEG-aQzzDkIezcjTJkzVbzQJN9V2z6NfBDFd8BIWNDik6hyaTqZ6koeHpUd-R5K94zONPJ_B-vxtGufRi4fTa3hHfaicddS086o3UrzH9c2xvCNPKllxnJzA6RU6SHTTOOPs).

**O GTM no servidor requer uma tag baseada em navegador para emitir eventos?**  
**R**: Sim.

**É possível manter a integração do GA4 separada do servidor?**  
**R**: Para manter integrações separadas do GA4 e do GTM do servidor, é possível criar um ID de mensuração adicional no Google Analytics. Crie uma tag de configuração do GA4 separada para o GTM do servidor usando o ID de mensuração e seguindo as etapas acima. Neste cenário, a tag de configuração existente do GA4 continuará a enviar o tráfego do GA pelo contêiner da web. Já a nova tag de configuração enviará dados ao contêiner do servidor. Crie outras tags de evento do GA4 conforme a etapa 2 para enviar eventos do servidor usando a nova tag de Configuração.

**A integração da API de Conversões do GTM funciona com soluções de hospedagem na nuvem que não sejam o GCP?**  
**R**: A integração da API de Conversões do GTM deve funcionar com o GCP ou qualquer outra plataforma da sua escolha. [Leia mais sobre provisionamento manual](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.google.com%2Ftag-platform%2Ftag-manager%2Fserver-side%2Fmanual-setup-guide&h=AT1mYhGRw-s4JDOaXkPLzjXqaur4kV1iPjiJUwfdHFLnL79BiUUNd9q7rdWC3iGOIdUCJONaKzVo6nzjdQwBtztfGvcCulVXm3v4ylyHBnrBm_fsWem-7kBAVXcFYikCgPUHbEG6mVetRR_i0QE0bG3aMjzv37AujAp3U2a5DFo).

[](#)

## Saiba mais

-   [API de Conversões](/docs/marketing-api/conversions-api)
    
-   [Sobre a desduplicação de eventos do Pixel da Meta e da API de Conversões](https://www.facebook.com/business/help/823677331451951?id=1205376682832142)
    

[](#)