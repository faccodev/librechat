---
title: "Implementação de ponta a ponta - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation"
scraped_at: "2026-02-01T15:48:01.223Z"
---

# Implementação de ponta a ponta da API de Conversões

A API de Conversões oferece suporte aos esforços dos anunciantes para fornecer aos consumidores transparência e controle de dados apropriados, ao mesmo tempo que os ajuda a continuar proporcionando experiências pessoais. Com a API, você pode compartilhar dados diretamente do seu servidor em vez de usar um navegador.

### Benefícios da integração

-   **Visibilidade de funil profundo:** a API de Conversões permite que você compartilhe uma matriz de dados mais ampla em comparação com o pixel da Meta. Com a API, você pode tomar decisões levando em consideração mais informações, como dados de CRM, eventos de funil inferior (incluindo cadastros qualificados) e caminhos de conversão de vários sites em um site e uma localização física.
    
-   **Controle de dados:** quando usada por meio de uma implementação somente de servidor (por exemplo, sem o pixel da Meta), a API de Conversões oferece controle adicional sobre quais dados você compartilha. É possível optar por acrescentar informações aos seus eventos, fornecendo dados como margens de produtos ou informações de histórico (como pontuações de valor do cliente).
    
-   **Confiabilidade e resiliência do sinal:** o compartilhamento de dados por meio da API de Conversões pode ser mais confiável do que métodos baseados apenas em navegador, como o pixel da Meta. A API foi desenvolvida para ser menos suscetível a problemas como travamento do navegador ou falhas de conectividade. As novas restrições de transmissão de dados do setor podem limitar a eficácia dos cookies e do rastreamento de pixels. Por isso, a API de Conversões ajuda você a ter controle sobre o compartilhamento de sinais que podem não ser mais capturados pelo pixel.
    

**Recursos adicionais**: consulte o documento em PDF [Direct Integration Playbook for Developers](https://www.facebook.com/gms_hub/share/conversions-api-direct-integration-playbook_english.pdf) e o webinar sobre [integração direta para desenvolvedores](https://www.facebook.com/business/m/sessionsforsuccess/conversions-api).

[](#)

## Visão geral

A integração da API de Conversões tem dois estágios principais:

-   [**Preparação**](#preparation): selecione o [tipo de integração](#integration-types) mais adequado para você, [defina os eventos a serem enviados](#define-events) e [analise as opções de otimização disponíveis](#optimization-types).
    
-   [**Execução**](#execution): saiba como [implementar a API](#direct-integration). Para esse estágio, também é possível usar uma [integração de parceiros](https://www.facebook.com/business/help/1179210765468894).
    

Confira a seguir o processo de integração completo:

Requisitos

Integração completa

Otimização

Selecione eventos para enviar à Meta com o consentimento do usuário (se houver).

  

Configure os ativos da empresa: Pixel da Meta, app da Meta, Gerenciador de Negócios, conexão com o servidor e usuário do sistema.

**Etapa 1 – Um evento**: envio de qualquer evento (manual ou automatizado) usando o token do usuário do sistema. Concluir essa etapa significa que você configurou a autenticação corretamente.

  

**Etapa 2 – Totalmente integrado**: você precisa enviar alguns eventos automatizados para ser considerado integrado. Concluir esse marco significa que você pode otimizar para a API de Conversões mesmo em eventos que não usam mais o pixel ou caso ele esteja bloqueado.

Assim que você estiver integrado, envie eventos de funil automatizados suficientes para que a integração seja concluída. Depois, otimize a taxa de correspondência com base na orientação sobre a qualidade da correspondência de eventos.

  

Verifique o seguinte:

-   Os eventos podem ser enviados por meio de qualquer canal (navegador ou servidor) e não estão sendo contabilizados duas vezes.
    
-   Os eventos são enviados o mais próximo possível do tempo real.
    
-   Os parâmetros de informações do cliente a serem usados para correspondência de identidade são disponibilizados.
    

### Usuários do pixel existentes

Se você já usa o pixel da Meta, a integração da API de Conversões deve ser criada como uma extensão da integração de pixel, em vez de uma conexão totalmente diferente.

### Consentimento geral

Se você tiver uma lógica para controle do consentimento em relação ao compartilhamento de dados de pixel, use-a também na API de Conversões.

### Alternativas

-   Caso você queira otimizar os anúncios para eventos do app, use a [API de Eventos do App](/docs/marketing-api/app-event-api).
    

[](#)

## Preparação

### Escolher o tipo de integração

Para começar, selecione a opção de integração a ser implementada:

Configuração

Descrição da abordagem

**Configuração redundante (recomendada)**

Envie todos os eventos por meio do pixel e da API de Conversões. Essa é a configuração recomendada para quem deseja manter o pixel no seu site e pode adotar totalmente a API de Conversões.

  

Para que ela seja bem-sucedida, você precisa poder gerar um `event_id` persistente para eventos de pixel e da API de Conversões. Isso significa enviar o mesmo `event_name` e `event_id` no evento de pixel e na API de Conversões a fim de [desduplicar eventos idênticos](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

  

A configuração fornece desempenho igual ou melhor do que usar apenas o pixel do navegador. O servidor pode capturar eventos que talvez não sejam rastreados pelo navegador, como compras que ocorrem em um site separado, conversões de lead ou chamadas telefônicas.

**Configuração dividida**

Envie diferentes tipos de eventos por meio do pixel e da API de Conversões. Por exemplo, é possível enviar `PageView` e `ViewContent` por meio do pixel, e `Lead` ou `Purchase` por meio da API de Conversões.

  

Embora essa opção não seja a ideal, é possível considerá-la caso você não queira usar a configuração totalmente redundante. Leve em consideração que você pode precisar concluir trabalhos adicionais à medida que as alterações do navegador forem implementadas.

**Implementação somente de servidor**

Envie eventos somente por meio da API de Conversões e não por meio do navegador. Antes de adotar essa abordagem, recomendamos a implementação da **configuração redundante** ou **configuração dividida**.

### Definir eventos para enviar

Depois de escolher a abordagem de integração, é possível definir quais eventos serão enviados. Os sinais serão mais úteis se tiverem correspondência com ID do usuário da Meta. Por isso, é importante refletir sobre os parâmetros a serem enviados com um evento e a frequência de envio.

#### Opções de evento

Envie os eventos que são mais relevantes para sua empresa. Veja uma lista completa de eventos do tipo [padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) e [personalizado](/docs/facebook-pixel/implementation/conversion-tracking#custom-events) que são aceitos pela Meta.

#### Parâmetros dos eventos

É possível enviar diversos parâmetros em cada evento. Consulte os [Parâmetros](/docs/marketing-api/conversions-api/parameters) usados pela API de Conversões para saber mais sobre esses campos.

Diversos tipos de ID podem ser adicionados aos eventos, incluindo `event_id`, `external_id` e `order_id`. Veja a diferença entre esses parâmetros:

Identificação

Descrição

Como é usado

[ID externo](/docs/marketing-api/conversions-api/parameters/external-id)

O ID único de um cliente específico.

Saiba mais sobre o [ID externo](/docs/marketing-api/conversions-api/parameters/external-id).

ID de evento

O ID único de um evento específico.

Usado na desduplicação de eventos. O campo é importante se você estiver enviando eventos por meio do pixel do navegador e da API de Conversões.

Identificação do pedido

A identificação única de um pedido específico. O parâmetro funciona apenas para eventos de compra e precisa de um campo `order_id` em `custom_data`.

**Essa implementação é limitada a parceiros selecionados da Meta. Entre em contato com seu representante da Meta para obter acesso.**

  

Usado na desduplicação de eventos de compra se você envia eventos por meio do pixel do navegador e da API de Conversões.

  

-   Depois de você nos enviar seu primeiro pedido, descartaremos o segundo no seguinte caso:
    
-   Um segundo evento com o mesmo `order_id` é enviado dentro de um intervalo de tempo específico, e concluímos que o mesmo usuário realizou os dois pedidos.
    

É possível desduplicar eventos de compra em duas janelas de tempo: 48 horas (recomendado) ou 28 dias. Esse é o intervalo entre a primeira e a segunda instância do mesmo evento.

#### Nível de atualidade dos dados

Recomendamos que você envie eventos em tempo real ou em [lotes](/docs/graph-api/making-multiple-requests/) com base em uma linha do tempo específica por meio da API de Conversões. Enviar os eventos em tempo real ou na janela de uma hora ajuda a garantir que eles possam ser usados para atribuição e otimizados para veiculação de anúncio.

Se eles forem enviados mais de duas horas após a ocorrência, isso pode reduzir o desempenho de anúncios otimizados para os eventos em questão. Os eventos enviados com um atraso de 24 horas ou mais podem ter problemas significativos na atribuição e na otimização da veiculação de anúncio.

Se você estiver usando janelas de conversão longas, envie o evento o mais próximo possível do tempo real de conclusão da conversão.

_Passe para a próxima etapa depois de definir o seguinte:_

-   _Uma lista de eventos para enviar._
    
-   _Os campos específicos que você quer enviar em cada evento._
    
-   _A frequência de envio dos eventos._
    

### Tipos de otimização disponíveis

A API de Conversões oferece os seguintes tipos de otimização:

Opção de otimização

Descrição

Otimização de conversões

Otimize a veiculação de anúncios para exibi-los às pessoas com maior probabilidade de realizar conversões.

Otimização de valor (também conhecida como retorno sobre a otimização de investimento em publicidade)

Otimize a veiculação de anúncios para exibi-los às pessoas com maior probabilidade de realizar a conversão de um valor específico (como compras acima de US$ 50).

Anúncios de produtos dinâmicos

Otimize a veiculação de anúncio para exibir anúncios de produtos específicos às pessoas com maior probabilidade de comprá-los.

[](#)

## Execução

Há duas maneiras de implementar a integração:

-   [Integração direta](#direct-integration): você, como anunciante, implementa diretamente a API de Conversões.
    
-   [Integração como plataforma](#integration-as-a-platform): você, como parceiro de marketing, oferece a API de Conversões como um serviço para seus clientes.
    

Os anunciantes que usam a API de Conversões por meio de um parceiro de marketing devem seguir nossas diretrizes de implementação para parceiros.

[](#)

## Integração direta

### Etapa 1: configurar requisitos

Antes de usar a API de Conversões, configure os seguintes ativos:

Ativo

Descrição

[Pixel da Meta](/docs/marketing-api/conversions-api/get-started#facebook_pixel)

Quando você envia eventos por meio da API de Conversões, eles são processados e armazenados da mesma forma que os eventos enviados por meio do Pixel. Ao implementar a API de Conversões, você seleciona para qual Pixel quer enviar os eventos.

  

Se você enviar os eventos da API de Conversões para um Pixel, será possível usar os eventos da API de Conversões para mensuração, atribuição e otimização da veiculação de anúncio da mesma forma que você usa os eventos de Pixel baseados em navegador. Recomendamos o envio de eventos do navegador e do servidor para o mesmo ID do Pixel da Meta.

[Gerenciador de Negócios](https://business.facebook.com/)

Para usar a API, você precisa ter um Gerenciador de Negócios. O Gerenciador de Negócios ajuda os anunciantes a integrar as iniciativas de marketing da Meta com a própria empresa e parceiros externos. Se você não tiver esse recurso, consulte o artigo [Criar um Gerenciador de Negócios](https://www.facebook.com/business/help/1710077379203657) na Central de Ajuda.

Token de acesso

Para você usar a API de Conversões, é necessário um [token de acesso](/docs/facebook-login/access-tokens/). Há duas maneiras de obter um token de acesso:

-   [Por meio do Gerenciador de Eventos](/docs/marketing-api/conversions-api/get-started#via-events-manager) (recomendado)
    
-   [Com seu app](/docs/marketing-api/conversions-api/get-started#use-your-own-app)
    

_Quando os ativos estiverem prontos, inicie a etapa [implementar a API](#implement-the-api). Salve os IDs dos ativos, pois eles serão usados nas chamadas de API._

### Etapa 2: implementar a API

Depois de concluir os requisitos, inicie o processo de implementação. Consulte a [documentação para desenvolvedores](/docs/marketing-api/conversions-api) ao criar na API de Conversões.

#### Chamadas de teste (opcional)

Se essa for a primeira vez que você usa a API, comece com uma chamada de teste. Para fazer isso, você precisa de uma carga e um método para fazer chamadas de API. Depois que a chamada for concluída, visite o Gerenciador de Eventos para verificar se a chamada funcionou conforme o esperado.

Carga

Método de chamada de API

Use o [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper) para gerar um exemplo de carga a ser enviado com a chamada. Siga as instruções listadas na ferramenta. A carga será semelhante a esta:

```
{
  "data": [
   {
    "event_name": "Purchase",
    "event_time": 1601673450,
    "user_data": {
      "em": "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068",
      "ph": null
     },
    "custom_data": {
      "currency": "USD",
      "value": "142.52"
    }
   }
  ]
}
```

Se quiser testar sua carga a partir do Auxiliar de carga, adicione a identificação do seu pixel em **Teste esta carga** e clique em **Enviar para eventos de teste**. É possível ver o evento em **Gerenciador de Eventos** > **Seu pixel** > **Eventos de Teste**. Saiba mais sobre a [Ferramenta Eventos de Teste](/docs/marketing-api/conversions-api/using-the-api#testEvents).

Quando a carga estiver satisfatória, decida como quer fazer a chamada. É possível usar o Explorador da Graph API (consulte este [guia](/docs/graph-api/explorer/)) ou os próprios servidores. Se estiver usando os próprios servidores, você poderá usar o CURL ou o SDK de Negócios da Meta. É altamente recomendável [usar o SDK](/docs/business-sdk).

  

Independentemente do método de chamada, você precisará usar o ponto de extremidade `/{pixel_id}events` e anexar os dados JSON gerados pelo Payload Helper. Depois de fazer a chamada, você obterá uma resposta como esta:

```
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": <FB-TRACE-ID>
}
```

Quando tiver concluído sua primeira chamada, verifique os eventos em **Gerenciador de Eventos** > **Seu pixel** > **Visão geral**.

Depois de verificar os eventos de teste no Gerenciador de Eventos, _inicie a etapa [Enviar e verificar eventos](#send-and-verify)_

#### Enviar e verificar eventos

Para enviar eventos, faça uma solicitação `POST` para a borda da API `/events`. Anexe uma carga à sua chamada. Se precisar de ajuda para gerar a carga, acesse o [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper). Consulte os seguintes recursos para ver mais informações e exemplos de código:

-   [Enviar solicitações](/docs/marketing-api/conversions-api/using-the-api#send)
    
-   [Eventos abandonados](/docs/marketing-api/conversions-api/using-the-api#dropped-events)
    
-   [Tempo de carregamento versus tempo de transação do evento](/docs/marketing-api/conversions-api/using-the-api#event-transaction-time)
    
-   [Solicitações em lote](/docs/marketing-api/conversions-api/using-the-api#batch-requests)
    
-   [Uso de hash](/docs/marketing-api/conversions-api/using-the-api#hashing)
    

Depois de começar a enviar eventos, visite o Gerenciador de Eventos para verificar se os recebemos. Saiba como fazer a [Verificação de eventos](/docs/marketing-api/conversions-api/using-the-api#verify).

_Se a implementação estiver complementando um pixel de navegador, acesse as [configurações de desduplicação](#add-parameters-for-dedup). Caso contrário, está tudo pronto. Caso ainda tenha dúvidas, visite [Suporte](#support)._

### Etapa 3: adicionar parâmetros para a desduplicação

Se você estiver enviando eventos idênticos por meio do pixel e da API de Conversões, será necessário configurar a desduplicação deles. Antes, leia a [documentação para desenvolvedores sobre a lógica da desduplicação](/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

#### Desduplicação baseada em eventos

Se encontrarmos a mesma combinação de chave de servidor (`event_id`, `event_name`) e de navegador (`eventID`, `event`) enviadas ao mesmo ID do Pixel dentro de 48 horas, descartaremos o evento duplicado enviado por último.

Veja como ajudar a garantir que os eventos sejam desduplicados:

-   Para os eventos correspondentes, estes parâmetros devem ser definidos com o mesmo valor:
    
    -   `event_id` do evento do servidor e `eventID` do evento do navegador;
        
    -   `event_name` do evento do servidor e do evento do navegador.
        
    
-   Depois de enviar eventos duplicados, visite o Gerenciador de Eventos para verificar se os eventos corretos estão sendo descartados.
    
-   Certifique-se de que cada evento único enviado via Pixel e API de Conversões tem o próprio `event_id`. O ID não deve ser compartilhado com outros eventos.
    

#### Alternativa para desduplicação baseada em eventos

Embora o ID do evento seja sempre a melhor forma de desduplicar eventos, esse é um processo de implementação complexo. É possível aproveitar soluções alternativas usando o parâmetro external\_id ou fbp. Se você configurou os parâmetros external\_id ou fbp para serem passados por meio do navegador e do servidor, desduplicaremos os eventos com os mesmos parâmetros automaticamente em 48 horas.

### Etapa 4 (opcional): explorar os [recursos do SDK de Negócios](/docs/marketing-api/conversions-api/guides/business-sdk-features)

O SDK de Negócios da Meta tem recursos avançados criados especialmente para os usuários da API de Conversões:

-   [Solicitações assíncronas](/docs/marketing-api/conversions-api/guides/business-sdk-features#asynchronous-requests) – Use esse recurso se não quiser bloquear a execução do seu programa para aguardar a conclusão de uma solicitação. Com essa abordagem, você faz a solicitação e recebe um sinal do servidor quando ela é concluída. Enquanto você espera a resposta, o programa pode continuar em execução.
    
-   [Lotes simultâneos](/docs/marketing-api/conversions-api/guides/business-sdk-features#concurrent-batching) – Aproveite as solicitações assíncronas para aumentar a taxa de transferência ao usar os recursos mais eficientes. Crie solicitações em lote para gerenciar casos de uso como solicitação de evento de funcionários, tarefas agendadas e muito mais.
    
-   [Interface de serviço HTTP](/docs/marketing-api/conversions-api/guides/business-sdk-features#http-service-interface) – Substitua o serviço-padrão HTTP do SDK de Negócios e implemente o próprio serviço personalizado com o método ou a biblioteca da sua preferência.
    

[](#)

## Integração como plataforma

As instruções a seguir são para parceiros que oferecem a API de Conversões como um serviço para anunciantes.

### Etapa 1: configurar requisitos

Seu app deve obter os seguintes recursos e permissões:

-   Nível de acesso: [acesso avançado](/docs/marketing-api/overview/authorization#layer-2--access-levels--permissions--and-features)
    
-   Recurso: [acesso padrão ao gerenciamento de anúncios](/docs/marketing-api/overview/authorization)
    
-   Permissões: [`ads_management`](/docs/permissions/reference/ads_management) ou [`business_management`](/docs/permissions#business_management), [`pages_read_engagement`](/docs/permissions/reference/pages_read_engagement) e [`ads_read`](/docs/permissions/reference/ads_read).
    

### Etapa 2: enviar eventos em nome de clientes

#### 1\. Login do Facebook para Empresas (recomendado para parceiros)

O [Login do Facebook para Empresas](/docs/facebook-login/facebook-login-for-business#opt-in-to-facebook-login-for-business) é a solução de autenticação e autorização mais usada entre Provedores de Tecnologia e desenvolvedores de apps de negócios que precisam acessar os ativos dos clientes. Esse recurso permite especificar o tipo de token de acesso, os tipos de ativos, bem como as permissões necessárias ao seu app, e salvar essas escolhas como um conjunto (configuração). Dessa forma, você pode apresentar o conjunto aos clientes empresariais, que poderão concluir o processo e conceder ao seu app acesso aos respectivos ativos de negócios.

#### 2\. Extensão da Meta para Empresas

A [Extensão da Meta para Empresas](/docs/meta-business-extension/) retorna todas as informações necessárias para enviar eventos em nome do cliente por meio do processo a seguir. Ela fornece um ponto de extremidade para recuperar os tokens de acesso do usuário do sistema criados no Gerenciador de Negócios do cliente. O processo inclui as permissões para enviar eventos do servidor, além de ser feito de forma automática e segura.

O ponto de extremidade requer um token de acesso do usuário como parâmetro de entrada. Após configurar a extensão, os novos usuários da Extensão da Meta para Empresas precisam fazer uma chamada ao ponto de extremidade para buscar o token de acesso do usuário do sistema. Os usuários existentes precisarão solicitar outra autenticação antes de fazer chamadas para o novo ponto de extremidade da API.

No momento, a Extensão do Facebook para Empresas só está disponível para parceiros aprovados. Se você tiver interesse em se tornar um parceiro, entre em contato com o seu representante do Facebook para obter acesso.

  

#### 3\. Intermediação de empresas: o cliente compartilha o conjunto de dados com o Gerenciador de Negócios do parceiro

O cliente compartilha o conjunto de dados com o parceiro via configurações do Gerenciador de Negócios (consulte a seção Token de acesso do usuário do sistema do cliente) ou via [API pelo método de intermediação de empresas](/docs/marketing-api/business-manager/guides/on-behalf-of/). É possível atribuir o usuário do sistema do parceiro ao pixel do cliente e gerar um token de acesso para enviar eventos do servidor criando um token de acesso do usuário do sistema. Isso pode ser feito via API de Conversões nas configurações de pixel acima. No lado da API, é necessário solicitar acesso ao gerenciamento do conjunto de dados na [conta de anúncios do cliente](/docs/marketing-api/business-asset-management/guides/business-to-business#managing-your-relationship-as-an-ad-agency-acting-on-behalf-of-another-business) e fazer o [compartilhamento de pixels via API](/docs/marketing-api/business-asset-management/guides/business-pixel-sharing/).

#### 4\. Token de acesso do usuário do sistema do cliente

Este é o fluxo semelhante para integração direta. O cliente precisará [criar manualmente um token de acesso de acesso do usuário do sistema](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#option1) por meio da API de Conversões nas configurações de conjunto de dados. Depois, você poderá enviar eventos ao conjunto de dados do anunciante com esse token. Um usuário do sistema ou um usuário administrador do sistema precisa instalar o app que será usado para gerar o token de acesso. Com essa configuração, o app tem permissão para fazer chamadas de API em nome do usuário do sistema ou do usuário administrador do sistema.

**Observação**: se o sistema do parceiro usar esse método, o token será limitado ao envio de dados à Meta. O token não poderá ser usado para executar solicitações de dados GET na API.

### Etapa 3: atribuir eventos à sua plataforma

Para atribuir eventos da API de Conversões à sua plataforma, use o campo `partner_agent`. Isso permite que você defina seu identificador de plataforma ao enviar eventos em nome de um cliente. Caso você seja um parceiro gerenciado, trabalhe com o representante da Meta para definir o identificador. O valor deve ter menos de 23 caracteres e pelo menos dois caracteres alfabéticos. Depois, envie-o com todos os eventos do servidor.

Sempre forneça um guia de configuração atualizado para os anunciantes que querem ativar a integração na sua plataforma.

[](#)

## Suporte

### Para todos os parceiros

[Consulte as informações sobre depuração e os artigos da Central de Ajuda para Empresas.](/docs/marketing-api/conversions-api/support)

### Para parceiros gerenciados

Para que seu representante da Meta ajude você nos testes de integração e na solução de problemas, forneça a ele estas informações: ID do Gerenciador de Negócios; ID do app e ID do Pixel.

[](#)

## Documentação da API

-   [Primeiros passos](/docs/marketing-api/conversions-api/get-started): teste a API no próprio Gerenciador de Negócios
    
-   [Como usar a API](/docs/marketing-api/conversions-api/using-the-api)
    
-   [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices)
    
-   [Configurar a API de Conversões como uma plataforma](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform)
    
-   [Rastreamento de conversão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events)
    
-   [Eventos personalizados da Meta](/docs/facebook-pixel/implementation/conversion-tracking#custom-events)
    
-   [Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper)
    
-   [Rastreamento de conversão](/docs/marketing-api/conversions-api/using-the-api#data-processing-options-for-conversions-api-and-offline-conversions-api)
    
-   [Se você deseja otimizar para eventos do app, use a API de Eventos do App](/docs/marketing-api/app-event-api)
    

[](#)