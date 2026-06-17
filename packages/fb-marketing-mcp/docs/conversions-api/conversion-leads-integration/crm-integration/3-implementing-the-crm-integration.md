---
title: "3: Implementação do desenvolvedor - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration"
scraped_at: "2026-02-01T15:48:30.232Z"
---

# 3: Implementação do desenvolvedor

Esta página lida com a integração manual e abrange:

-   [Como construir a carga para integração de CRM](#step-1--build-a-payload)
    
-   [Como gerar um token de acesso e preparar uma chamada de API](#step-2--create-an-access-token-and-an-api-call)
    
-   [Como enviar uma carga de teste](#step-3--test-a-payload--optional-)
    
-   [Como enviar dados de produção](#step-4--send-production-data)
    

Esta seção só é aplicável se decidir concluir essa integração por meio de uma integração manual e de recursos de desenvolvedor. Em vez disso, se você desejar concluir essa integração usando um parceiro, siga as respectivas instruções de parceiro para a integração. Você pode pular para a seção [4: Verifique seus dados](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data) deste guia assim que a integração de parceiros estiver concluída.

Você precisará de acesso de administrador do Gerenciador de Negócios para concluir essas etapas de integração. Você pode receber acesso a partir do email enviado se recebeu um convite como desenvolvedor. Caso contrário, entre em contato com um administrador do Gerenciador de Negócios para pedir acesso.

## Etapa 1: criar uma carga

Esta etapa definirá as especificações de carga para a integração da API de Conversões para CRM e fornecerá algumas recomendações sobre como enviá-la do seu servidor.

1.  Abra o guia de integração de CRM na aba **Configurações** do seu pixel de CRM para começar.
  
3.  Leia o [Guia para desenvolvedores da API de Conversões](/docs/marketing-api/conversions-api/using-the-api) para entender como a API funciona.
  
5.  Recomendamos usar o [Auxiliar de carga](https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper/?data=[%7B%22event_name%22%3A%22Lead%22%2C%22event_time%22%3A1664577963%2C%22action_source%22%3A%22system_generated%22%2C%22user_data%22%3A%7B%22lead_id%22%3A1234567890123456%7D%2C%22custom_data%22%3A%7B%22lead_event_source%22%3A%22Your%20CRM%22%2C%22event_source%22%3A%22crm%22%7D%7D]&selectedProduct=Conversion%20Leads) para construir sua carga. O Auxiliar de carga formatará sua carga e verificará se há erros. Assim que todos os erros de carga forem resolvidos, clique no botão **Receber código** dentro do Auxiliar de carga para gerar um modelo de código para sua linguagem de programação.
  
7.  Veja a seguir a lista de parâmetros obrigatórios. Leia o [Guia Integração de leads de conversão – Especificação de carga](/docs/marketing-api/conversions-api/conversion-leads-integration/payload-specification) para ver a descrição completa de cada parâmetro. **Essa especificação de carga deve ser usada somente para eventos de otimização de leads de conversão.** Isso significa que os eventos devem se referir apenas aos anúncios de leads da Meta. Evite usá-la para outros tipos de eventos, como leads de site.  
      
    **Parâmetros obrigatórios**
    
    Nome
    
    Descrição
    
    `event_name`
    
    string
    
    Campo de formulário livre para capturar os estágios de lead usados no CRM.
    
    O parâmetro `event_name` deve indicar um lead que se move pelo funil de vendas no CRM. **Certifique-se de enviar todos os estágios conforme forem atualizados, incluindo o lead inicial.**
    
    `event_time`
    
    número inteiro
    
    Um registro de data e hora do Unix em segundos indicando quando o evento de atualização do estágio do lead é atualizado pelo CRM.  
    O registro de data e hora deve ocorrer após o horário de geração do lead ou, caso contrário, o evento pode ser descartado.
    
    `action_source`
    
    string
    
    **Valor:**`system_generated`
    
      
    
    Ao usar a API de Conversões, você concorda em garantir a precisão do parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) conforme seu conhecimento.
    
    `user_data`
    
    objeto
    
    Um mapa que contém dados de informações do cliente. Consulte [Parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) para ver as opções. Consulte [Correspondência avançada](/docs/meta-pixel/advanced/advanced-matching) para conferir as opções comparáveis disponíveis para dados enviados por meio do Pixel da Meta.
    
    `lead_event_source`
    
    string
    
    O nome do CRM de onde os eventos são provenientes.
    
    `event_source`
    
    string
    
    **Valor:**`crm`
    
      
      
    **Parâmetros de informações do cliente**  
    As informações do cliente ajudam a Meta a relacionar os eventos do seu servidor com as contas da plataforma. Envie o máximo possível dos parâmetros a seguir para gerar dados de eventos mais precisos e melhorar o desempenho do anúncio.  
      
    **Observação:** é preciso enviar pelo menos um parâmetro de informações do cliente.  
      
    Ao enviar `lead_id`, use um `lead_id` válido para evitar que o sistema rejeite o evento. Informações como email ou número de telefone precisarão ser criptografadas. No momento, a identificação do clique não inclui erros de rejeição da API, mas um grande volume de `click_id` inválidas causará um alerta no sistema.  
      
    
    Parâmetro
    
    Prioridade
    
    Descrição
    
    ID de lead (recomendado) [Como encontrar o ID de lead](/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id)
    
    Mais alta
    
    O ID gerado pelo Facebook para cada lead. É um número de 15 a 17 dígitos encontrado no campo `leadgen_id` do [webhook de geração de leads](/docs/marketing-api/guides/lead-ads/retrieving/#webhook-response), incluído sob o parâmetro `user_data`.
    
    Consulte [Como encontrar o ID de lead da Meta](/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id) para saber mais.
    
    Identificação do clique
    
    Mais alta
    
    Email com hash
    
    Mais alta
    
    Número de telefone com hash
    
    Alta
    
    Outras informações de contato com hash
    
    Média
    
    **Observação:** além de email e número de telefone com hash, você pode enviar outros dados com hash para a Meta, como gênero, data de nascimento, sobrenome, nome, cidade, estado, código postal e muito mais.
    
    **Exemplo**  
    Um exemplo de carga pode ter a seguinte aparência:
    ```
    {
        "data": [
            {
                "event_name": "Lead",
                "event_time": 1664577963,
                "action_source": "system_generated",
                "user_data": {
                    "lead_id": 1234567890123456,
                    "em": [
                        "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b"
                    ],
                    "ph": [
                        "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
                    ]
                },
                "custom_data": {
                    "lead_event_source": "Your CRM",
                    "event_source": "crm"
                }
            }
        ]
    }
    ```
    
  
9.  Se os eventos não seguirem a especificação de carga ou não corresponderem a um anúncio de lead da Meta, eles não serão reconhecidos para a integração nem usados para treinar o modelo.  
    Por exemplo, a carga da web será aceita pela API de Conversões e exibida no Gerenciador de Eventos, mas **não** será reconhecida para essa integração. Você também deverá usar um `lead_id` válido para evitar que o sistema rejeite o evento.  
      
    **Observação:** é preciso enviar pelo menos um parâmetro de informações do cliente. Ao enviar `lead_id`, use uma `lead_id` válida para evitar que o sistema rejeite o evento. Informações como email ou número de telefone precisarão ser criptografadas. No momento, a identificação do clique não inclui erros de rejeição da API, mas um grande volume de `click_id` inválidas causará um alerta no sistema.  
      
    Somente a carga de leads de conversão será reconhecida para a integração e usada para treinamento.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306070973_798763977822397_5594494441058509130_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=Chvak30P97QQ7kNvwHUqt2b&_nc_oc=AdlTpYhYwQ8H6q5pWARrXq4lb_3WaPL9s5v56KHP46VlDa5krbhEdHix26jLlkTpcs8a2WvFRTU_KSZaee4_IcGB&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=5d5GmfJpnoetx7Hmdyq7jw&oh=00_Afsv_uqsj0nXFn06MT61XZTbCcyESLSFQcfMJ_O-caVYYw&oe=6999CA2A)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306070973_798763977822397_5594494441058509130_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=Chvak30P97QQ7kNvwHUqt2b&_nc_oc=AdlTpYhYwQ8H6q5pWARrXq4lb_3WaPL9s5v56KHP46VlDa5krbhEdHix26jLlkTpcs8a2WvFRTU_KSZaee4_IcGB&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=5d5GmfJpnoetx7Hmdyq7jw&oh=00_Afsv_uqsj0nXFn06MT61XZTbCcyESLSFQcfMJ_O-caVYYw&oe=6999CA2A)

[](#)

## Etapa 2: criar um token de acesso e uma chamada de API

Assim que configurar o que você enviará, a próxima etapa é configurar para onde enviará os dados.

Essa etapa ajudará você a gerar um token de acesso para seu Pixel da Meta, que será usado para estabelecer uma conexão entre seu servidor e a API de Conversões.

1.  Você pode voltar ao guia de integração de CRM a partir da aba **Configurações** do pixel de CRM.
  
3.  Role a tela para baixo até a seção **Criar ponto de extremidade** e clique no botão **Gerar token de acesso**. O token de acesso será usado para criar a chamada de API.  
    Você pode gerar um novo token de acesso retornando ao guia de integração ou na aba **Configurações** em [Gerenciador de Eventos](https://www.facebook.com/events_manager2/list) navegando até a seção **API de Conversões** e clicando no link **Gerar token de acesso**.
  
5.  O resto deste guia variará dependendo de você estar utilizando ou não o SDK da Meta. Usar o [SDK de Negócios da Meta](https://developers.facebook.com/docs/business-sdk/overview) é recomendado, porque ele oferece melhores mensagens de erro e diagnóstico. Você precisará do ID do pixel e do token de acesso para fazer a chamada de API por meio do SDK de Negócios da Meta. Clique em **Copiar token de acesso** no guia de integração de CRM e salve-o. Exemplos de chamadas de API do SDK podem ser encontrados em [Como usar a API](/docs/marketing-api/conversions-api/using-the-api#send) ou na funcionalidade **Receber código** no Auxiliar de carga da Meta.
  
7.  Este é o formato do ponto de extremidade para fazer uma solicitação `POST` à API de Conversões sem o SDK. Você pode consultar todo o ponto de extremidade clicando em **Copiar ponto de extremidade** no guia de integração do CRM e salvando-o.
    ```
    https://graph.facebook.com/API_VERSION/PIXEL_ID/events?access_token=ACCESS_TOKEN
    ```
    -   `API_VERSION`: a versão atual da API de Marketing
        
    -   `PIXEL_ID`: o ID do pixel pode ser consultado no Gerenciador de Eventos para cada pixel
        
    -   `ACCESS_TOKEN`: o token de acesso gerado acima
        
8.  Você pode ver as datas de lançamento e de validade da API de Marketing na documentação [Versões](/docs/graph-api/changelog/versions/). Certifique-se de atualizar a versão da API ou o SDK de Negócios da Meta no código antes da data de validade da API de Marketing. Usar uma versão obsoleta no código pode resultar em erros, e seus eventos podem ser descartados pelo sistema.

[](#)

## Etapa 3: Testar uma carga (opcional)

Neste momento, é possível enviar uma carga de teste para o pixel antes de implementar o código no servidor. Você pode fazer isso por meio da aba **Eventos de Teste** no [Gerenciador de Eventos](https://www.facebook.com/events_manager2/list).

1.  Na seção **Testar eventos do servidor**, clique no link **Explorador da Graph API**. Usar este link exclusivo preencherá algumas informações do pixel. (Você também pode acessar diretamente o [Explorador da Graph API](https://developers.facebook.com/tools/explorer) se desejar.) Preste atenção no valor `test_event_code`, que pode mudar ao longo do tempo.
  
3.  Complete o seguinte na ferramenta Explorador da Graph API:
    1.  Certifique-se de que esteja no modo `POST`.
    2.  Verifique se a versão da API e o ID do pixel estão corretos.
    3.  Mude para a visualização JSON.
    4.  Insira sua carga. Ela pode ser criada ou gerada manualmente usando o [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper). Certifique-se de incluir o parâmetro `test_event_code` da etapa anterior e um `lead_id` válido.
4.  Insira seu token de acesso do pixel e clique no botão **Enviar**.
  
6.  Se a sua carga não tiver nenhum erro relacionado à sintaxe ou à API, você deverá receber uma mensagem de sucesso com um `fbtrace_id`.
  
8.  Após alguns momentos, o evento de teste deve aparecer na aba **Eventos de teste** no Gerenciador de Eventos.

[](#)

## Etapa 4: enviar dados de produção

Os dados de produção devem estar no mesmo formato que a carga gerada na Etapa 3, exceto se os dados forem provenientes diretamente do servidor. Esta etapa varia de acordo com a integração. Por isso, você verá diretrizes gerais em vez de um passo a passo.

1.  Envie o `lead_id` (recomendado) e os parâmetros adicionais de informações do cliente mencionados acima para correspondência.
  
3.  Não se esqueça de **enviar todos os estágios dos leads** conforme eles são atualizados, incluindo o evento de lead inicial que representa todos os leads gerados na Meta e baixados para o CRM. Veja a seguir um exemplo de funil. Os nomes e estágios do evento são definidos pelo anunciante, então, não precisam seguir este exemplo.
    
    ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=638668467470338&version=1765556029)
    
      
      
    Se as suas campanhas gerarem 100 leads, esperamos que 100 eventos de "Lead inicial" sejam carregados para representar o primeiro estágio do lead. Enviar o primeiro estágio de lead informará o sistema de que o lead foi recebido e processado. À medida que os leads descem no funil de vendas, esperamos que 70 estágios de "Lead qualificado de marketing", 30 de "Oportunidade de vendas" e 15 de "Convertidos" sejam carregados.  
      
    Para recapitular, 100 leads são gerados a partir das campanhas, mas esperamos que 215 eventos sejam carregados neste cenário de exemplo.
  
5.  Crie uma função que recupere atualizações da API ou do banco de dados do CRM sempre que o status do lead for atualizado. Depois, envie sua carga para a API de Conversões da Meta usando uma função personalizada ou o SDK de Negócios da Meta. O que faz mais sentido para sua integração dependerá do CRM e da configuração de banco de dados.  
      
    Variáveis são recomendadas para:
    
    -   `lead_id`
        
    -   `event_name`
        
    -   `event_time`
        
    
    Por exemplo, uma carga que indica explicitamente os valores dos parâmetros pode parecer com a seguinte:
    ```
    {
      "event_name": "initial_lead",
      "event_time": 1628294742,
      "user_data": {
        "lead_id": 1234567890123456
      },
      "action_source": "system_generated",
      "custom_data:" {
        "lead_event_source": "Salesforce",
        "event_source": "crm"
      }
    }
    ```
    Uma carga que passa em valores a partir do banco de dados usando variáveis pode parecer com a seguinte:
    ```
    {
      "event_name": lead_stage // "initial_lead"
      "event_time": unix_time // 1628294742
      "user_data": {
        "lead_id": fb_lead_id // 1234567890123456
      },
      "action_source": "system_generated",
      "custom_data:" {
        "lead_event_source": "Salesforce",
        "event_source": "crm"
      }
    }
    ```
    
  
7.  Carregue dados pelo menos uma vez por dia. O ideal é que as chamadas para o CRM sejam feitas em tempo real, mas você pode utilizar métodos de lote diários ou de hora se uma integração em tempo real não for viável.  
    Se escolher os métodos de lote, certifique-se de capturar o histórico de alterações no status dos leads em vez de apenas o estado do lead em um momento específico. Por exemplo, se o status de um lead for atualizado 3 vezes entre os lotes, esperaríamos 3 eventos para esse lead em vez de apenas a atualização final.  
    **Observação:** cada lote pode incluir até 1.000 eventos. Se houver um erro no lote, todo o lote será descartado; então, RECOMENDAMOS que utilize lotes menores e adicione lógica para tentar novamente.
  
9.  **Opcional**. Recomendamos registrar mensagens de erro a partir da chamada da CAPI e criar alertas se houver problemas. Também seria recomendável incluir uma manipulação de exceções para esses erros.
  
11.  Você pode preencher seus dados por até 7 dias no passado. A diferença de tempo é calculada entre `event_time` e `upload_time`. Preencher alguns dados pode acelerar o processo de treinamento.
     
     AVISO: não tente preencher mais de 7 dias de dados modificando os valores `event_time`. O modelo depende de um horário preciso para ser otimizado. Ao fazer isso, todos seus dados preenchidos poderão ser descartados.
     
12.  Certifique-se de que os valores `event_time` fiquem após o registro de data e hora da geração de leads; caso contrário, seus eventos podem ser descartados.
  
14.  Você deve começar a ver eventos no Gerenciador de Eventos para seu pixel dentro de uma hora se a integração estiver carregando eventos para a Meta. Lembre-se de usar um `lead_id` válido nas suas cargas para os eventos aparecerem. Abra cada evento enviado para a integração de CRM de leads de conversão no Gerenciador de Eventos e verifique se eles têm os parâmetros personalizados `lead_event_source` e `event_source` preenchidos. Se o evento não tiver esses parâmetros, ele não será registrado como um evento de leads de conversão.
     
     ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=429464615714393&version=1765556029)
     
15.  O sistema verificará se algum dos seus eventos é válido para leads de conversão. Após 1 dia, uma marca de seleção verde aparecerá ao lado da etapa **Enviar um evento de CRM** da integração se for detectado um evento válido.

[](#)

[

←

Voltar

2: Getting Started With the CRM Integration

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration)

[

→

Avançar

4: Verify Your Data

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data)

[](#)