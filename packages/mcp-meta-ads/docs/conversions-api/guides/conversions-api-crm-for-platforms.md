---
title: "API de Conversões para CRM para plataformas"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/conversions-api-crm-for-platforms"
scraped_at: "2026-02-01T15:49:55.189Z"
---

# API de Conversões para CRM: integrar como uma plataforma

Os parceiros podem oferecer eventos da API de Conversões para CRM como um serviço. Isso permite que seus clientes carreguem eventos gerados por meio de anúncios de lead do Facebook/Instagram (formulários instantâneos) usando os respectivos sistemas de CRM. Além disso, podem implementar a meta de desempenho "Leads de conversão" em anúncios, gerando leads de alta qualidade e com maior probabilidade de conversão.

## Pré-requisitos

Para planejar seu projeto, você pode usar o cronograma estimado como diretriz. Observação:

1.  O estágio de integração ou o desenvolvimento do lado do parceiro pode levar de 3 a 7 semanas para ser concluído. Após a integração, pode levar de 3 a 4 semanas para que um anunciante seja integrado e comece a veicular campanhas de anúncios de leads de conversão otimizadas.
2.  O cronograma abaixo é baseado em dados históricos. O tempo real do processo pode variar com base nos recursos disponíveis, na velocidade de resolução de problemas e assim por diante.

Estágio

Etapa

Tempo estimado (duração)

  
  
  
  
  
  
  

[**Integração**](#integration-guide)

Etapa 1. Pré-requisitos para configurar ativos

* * *

Etapa 2. Autenticação

* * *

  

Etapa 3. Integração da API

  
  

* * *

**Total**

Pré-requisito

* * *

1 dia a 3 semanas dependendo da opção de autenticação

* * *

3 a 4 semanas  
O tempo será menor se o parceiro já tiver integrado a API de Conversões para eventos offline, da web, do app ou de mensagens.

* * *

**3 a 7 semanas (aprox.)**

  
  
  
  
  
  
  
  
  

[**Pós-integração**](#post-integ)

  

Etapa 1. Conectar o CRM:  
  
a. Configurar um conjunto de dados  
b. Conectar-se ao sistema parceiro  
c. Enviar um evento de lead

* * *

Etapa 2. Configurar o funil de vendas

* * *

Etapa 3. Fase de aprendizado (nenhuma ação do anunciante necessária)

* * *

Etapa 4. Veicular campanhas de anúncios otimizadas para "Leads de conversão"\*

* * *

**Total**

  

1 a 2 dias

  
  
  
  

* * *

Menos de 1 dia

* * *

2 a 4 semanas

  
  
  

* * *

* * *

**1 a 2 meses (aproximadamente)**

_\*Os anunciantes podem veicular campanhas de desempenho de leads de conversão durante o período de aprendizado, mas não se beneficiarão do aumento total de desempenho até que essa fase tenha sido concluída._

[](#)

## Guia de integração

### Etapa 1. Pré-requisitos

Caso você ainda não ofereça a API de Conversões como um serviço para eventos offline, da web, do app ou de mensagens da empresa, verifique se os ativos abaixo foram configurados:

-   [Gerenciador de Negócios](https://business.facebook.com/)
    
-   Um [app da Meta](https://developers.facebook.com/apps). Lembre-se de que seu app precisa passar pelo [processo de análise](/docs/resp-plat-initiatives/individual-processes/app-review). Durante esse processo, você precisará receber [acesso avançado](/docs/marketing-api/overview/authorization#access-levels) a `ads_management`, `pages_read_engagement`, `ads_read`, `pages_show_list` e `business_management`, além de [Acesso Padrão ao Gerenciamento de Anúncios](/docs/marketing-api/overview/authorization). Veja abaixo mais orientações sobre como fazer isso.
    
-   O [conjunto de dados de CRM da Meta](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration#step-2--create-a-meta-crm-pixel) (conhecido anteriormente como pixel). Esse conjunto de dados é necessário para fazer a integração da API de Conversões para CRM. Ele informará ao sistema que os eventos do CRM serão carregados e adicionará um fluxo de [desempenho "Leads de conversão"](https://www.facebook.com/business/help/782657799338685?id=735435806665862) que otimiza a qualidade do lead.
    

Permissão

Intenção da empresa

O que incluir no envio

  
  
  

`ads_read`

Esta permissão pode ser usada para fornecer à API acesso aos seus dados de desempenho de anúncios para uso em análises e painéis personalizados ou para enviar eventos da web do seu servidor diretamente para a Meta.

**Por escrito**: explique que você usará a permissão para enviar eventos do seu servidor via API de Conversões diretamente para a Meta em nome dos anunciantes.

**Em vídeo**: demonstre como sua plataforma envia um evento por meio da API de Conversões.

  
  
  
  
  

`ads_management`

Esta permissão pode ser usada para habilitar um número ilimitado de contas de anúncios e reduzir a limitação de volume. É preciso ter, pelo menos, a permissão `ads_read` ou `ads_management` para usar o Acesso Padrão ao Gerenciamento de Anúncios.

**Por escrito**: explique que você usará a permissão para enviar eventos do seu servidor via API de Conversões diretamente para o Facebook em nome dos anunciantes ou para criar e gerenciar campanhas programaticamente em nome da empresa como um recurso de valor agregado para sua plataforma.

**Em vídeo**: demonstre como sua plataforma envia um evento por meio da API de Conversões ou mostre um usuário de teste entrando na sua plataforma para criar ou editar campanhas de anúncios.

  
  
  
  

Acesso padrão de gerenciamento de anúncios

Esta permissão pode ser usada para habilitar um número ilimitado de contas de anúncios e reduzir a limitação de volume. É preciso ter, pelo menos, a permissão `ads_read` ou `ads_management` para usar o Acesso Padrão ao Gerenciamento de Anúncios.

Para receber acesso avançado, seu app precisa ter feito com sucesso pelo menos 1.500 chamadas da API de Marketing com taxa de erro inferior a 10% em um período de 15 dias.

É importante evitar o erro comum de chamar a API repetidas vezes após atingir o limite de volume. Depois de receber uma resposta de erro, pause as chamadas imediatamente.

Se o sistema conceder a permissão, não será necessário o envio à análise do app.

  
  
  
  

`pages_read_engagement`

Esta permissão autoriza seu app a ler conteúdo (posts, fotos, vídeos e eventos) postado pela Página, ler dados de seguidores (incluindo nome e PSID) e a foto do perfil, além de ler metadados e outros insights sobre a Página.

**Por escrito**: explique que você precisará da permissão como pré-requisito para `ads_management`, que será usada para enviar eventos do seu servidor por meio da API de Conversões diretamente para a Meta em nome dos anunciantes.

**Em vídeo**: demonstre como sua plataforma envia um evento por meio da API de Conversões.

  
  
  

`pages_show_list` (pré-requisito para `pages_read_engagement`)

Esta permissão pode ser usada para mostrar a uma pessoa a lista de Páginas que ela gerencia ou para verificar se uma pessoa gerencia uma Página.

**Por escrito**: explique que você precisará da permissão como pré-requisito para `pages_read_engagement` e `ads_management`, que serão usadas para enviar eventos do seu servidor por meio da API de Conversões diretamente para a Meta em nome dos anunciantes.

**Em vídeo**: demonstre como sua plataforma envia um evento por meio da API de Conversões.

  
  
  

`business_management` (pré-requisito para todas as permissões para Páginas)

Esta permissão pode ser usada para enviar atividades relacionadas à empresa (por exemplo, comprar, adicionar ao carrinho, gerar leads) em nome de Páginas que pertencem a usuários do seu app.

**Por escrito**: explique que você precisará da permissão como pré-requisito para `pages_show_list`, `pages_read_engagement` e `ads_management`, que serão usadas para enviar eventos do seu servidor por meio da API de Conversões diretamente para o Facebook em nome dos anunciantes.

**Em vídeo**: demonstre como sua plataforma envia um evento por meio da API de Conversões.

  

### Etapa 2. Autenticação

Para os conjuntos de dados não gerenciados por você, os parceiros têm as duas opções de autenticação a seguir:

#### Opção 1 – Extensão da Meta para Empresas (preferencial)

A Extensão da Meta para Empresas (MBE, pelas iniciais em inglês) fornece um ponto de extremidade para recuperar os tokens de acesso de usuário do sistema que foram criados no Gerenciador de Negócios do anunciante. É preciso atender a [todos estes requisitos](/docs/facebook-business-extension/fbe/guides/mbe-conversions-api) para implementar a MBE.

Além disso, você deve:

-   receber `manage_business_extension` para seu app: esta permissão privada é usada para solicitar ao representante da Meta que adicione seu app à lista de permissão;
    
-   definir o valor do parâmetro **channel** no objeto de configuração de instalação como `CONVERSIONS_API`;
    
-   confirmar que pode receber a resposta do webhook após a conclusão da integração;
    
-   usar o token de acesso retornado via MBE e convertê-lo em um token de acesso de usuário do sistema [fazendo uma chamada de API adicional](/docs/facebook-business-extension/fbe/guides/get-features#get-system-user-token-via-api);
    
-   salvar uma cópia de `external_business_id`, `pixel_id` (que é o ID do conjunto de dados), `business_id` e do token de acesso de usuário do sistema;
    
-   [receber aprovação para sua integração da MBE](/docs/facebook-business-extension/fbe/integration-review).
    

#### Opção 2 – Token de acesso de usuário do sistema do cliente

Com esta opção, os parceiros podem permitir que os anunciantes:

-   criem manualmente um token de acesso de usuário do sistema por meio da API de Conversões na opção **Configurações** exibida no Gerenciador de Eventos da Meta;
    
-   compartilhem o `pixel_id` (ou seja, o ID do conjunto de dados), o `business_id` e o token de acesso de usuário do sistema com o parceiro e salvem uma cópia.
    

### Etapa 3. Integração da API

Depois disso, os parceiros poderão [chamar o ponto de extremidade da API de Conversões para enviar a carga do evento](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration). Etapas importantes:

#### Enviar a identificação do lead (preferencial) ou parâmetros personalizados

`lead_id` é uma identificação predefinida associada a leads gerados em campanhas de anúncios veiculadas no Facebook ou Instagram. Há [várias formas](/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id) de encontrar a identificação do lead da Meta. Recomendamos que os parceiros usem a leitura em massa de webhooks ou da Graph API para encontrar a identificação do lead.

**Importante**: é preciso enviar pelo menos um parâmetro personalizado válido. Caso contrário, o sistema rejeitará o evento. Ao enviar `lead_id`, use uma `lead_id` válida. Se quiser enviar `em` (email) e `ph` (número de telefone), o hashing será obrigatório.

  

#### Adicionar a string `partner_agent` para atribuição

Envie uma string única `partner_agent` com a carga. Se aplicável, trabalhe em conjunto com seu representante da Meta para escolher uma string de agente adequada. Use a mesma string de agente caso já esteja enviando uma via API de Conversões para eventos offline, da web, do app ou de mensagens da empresa.

#### Exemplo

Se o identificador da sua plataforma fosse "datapartner", este seria um exemplo de carga de evento enviado em nome do cliente:

```
{
    "event_name": "my lead stage",
    "event_time": 1617693833,
    "user_data": {
        "lead_id": 1234567890123456
    },
    "action_source": "system_generated",
    "custom_data": {
        "lead_event_source": "Salesforce",
        "event_source": "crm"
    },
   "partner_agent": "datapartner"
}
```
  

Como alternativa, caso não consiga encontrar lead\_id, é possível usar os parâmetros do cliente. Esta é uma amostra de carga de evento enviada em nome do seu cliente:

```
{
    "event_name": "my lead stage",
    "event_time": 1617693833,
    "user_data": {
        "em": 62a14e44f765419d10fea99367361a727c12365e2520f32218d505ed9aa0f62f
        "ph": e323ec626319ca94ee8bff2e4c87cf613be6ea19919ed1364124e16807ab3176
        "fbc": fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
    },
    "action_source": "system_generated",
    "custom_data": {
        "lead_event_source": "Salesforce",
        "event_source": "crm"
    },
   "partner_agent": "datapartner"
}
```
  

#### Usar a carga de evento correta

Na integração da API de Conversões para CRM, os parceiros devem usar a estrutura acima na carga para garantir que os eventos sejam recebidos com sucesso. Isso é diferente da API de Conversões para eventos offline, da web, do app ou de mensagens da empresa.

Use o valor correto para action\_source de eventos da API de Conversões para CRM, ou seja, `action_source = system_generated`.

#### Enviar todos os estágios de leads (incluindo o estágio inicial)

Envie **todos os estágios** de leads conforme eles forem atualizados. Isso significa que haverá vários eventos na mesma `lead_id` à medida que o lead avança pelo estágio do funil.

É importante enviar o **primeiro estágio do lead** (ou seja, o evento de lead bruto), já que isso informará ao sistema que o lead foi recebido e processado.

É preciso enviar no mínimo dois estágios para eventos do seu funil de vendas, incluindo o evento de lead bruto. Recomendamos enviar três estágios ou mais, se possível.

#### Mapear estágios de leads do CRM

Caso seus anunciantes estejam usando múltiplos sistemas de CRM, verifique se você é capaz de mapear os parâmetros de diferentes fontes de dados para `lead_id`, `event_name` e `event_time`, respectivamente.

Uma solução possível é incorporar um recurso de interface e experiência do usuário no seu portal para permitir que o anunciante mapeie parâmetros de diferentes CRMs para `lead_id`, `event_name` e `event_time`.

Confira outras boas práticas:

1.  Carregue dados pelo menos uma vez por dia. O ideal é carregar os dados em tempo real, mas você pode empregar métodos de processamento em lote por hora ou por dia se uma integração em tempo real não for viável.
2.  Cada lote pode incluir até mil eventos. Se houver um erro, todo o lote será descartado. Por isso, **recomendamos** o uso de lotes pequenos e a adição de lógica para novas tentativas.
3.  Você pode preencher seus dados por até 7 dias no passado. A diferença de tempo é calculada entre `event_time` e `upload_time`. Preencher alguns dados pode acelerar o processo de treinamento.
4.  Verifique se os valores de `event_time` são posteriores ao registro de data e hora da geração de leads. Caso contrário, seus eventos poderão ser descartados.
5.  Registre mensagens de erro da chamada da API de Conversões e crie alertas se houver problemas. Recomendamos incluir um processo de gerenciamento de exceções para esses erros.
6.  Sempre que possível, armazene o `lead_id` no seu sistema junto com outras informações, como detalhes, estágio, entre outras.

[](#)

## Pós-integração

Após concluir com sucesso a integração da API, recomendamos que você selecione alguns anunciantes adequados para realizar testes antes de abrir sua solução para uso geral.

### Selecionar os anunciantes adequados

É importante que você selecione anunciantes adequados para usar a API de Conversões para CRM. Abaixo estão algumas diretrizes para esses anunciantes:

-   Uso dos anúncios de lead no Facebook/Instagram (formulários instantâneos)
    
-   Geração de pelo menos **200 leads por mês**
    
-   O estágio do lead que o anunciante quer otimizar:
    
    -   ocorre dentro de **28 dias** após a geração do lead
        
    -   tem uma taxa de conversão entre **1% e 40%**
        
    
-   Atenção à **qualidade do lead**
    

### Diretrizes para seus anunciantes

Para fazer uma integração bem-sucedida da API de Conversões para CRM e fornecer atendimento adequado após a integração, recomendamos que você estude a jornada do anunciante para ajudar seus anunciantes no processo.

**Etapa 1.** Conectar o CRM

a) [**Criar um conjunto de dados de CRM**](#prereqs): para verificar se o conjunto de dados de CRM está configurado corretamente, acesse **Gerenciador de Eventos > Fonte de dados > Configurações**. Você verá a seção de leads de conversão se for um conjunto de dados de CRM.

b) Conectar-se ao sistema parceiro: permita que seu anunciante se conecte ao seu sistema e comece a enviar eventos de CRM.

c) Enviar um evento de CRM: o conjunto de dados precisa atender a todos os requisitos para passar na [verificação de dados](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data) antes de o anunciante prosseguir para a próxima etapa. Para verificar se essa etapa foi bem-sucedida, acesse o Gerenciador de Eventos e confira se o status foi alterado para "Configurar funil de vendas".

Se um anunciante não puder avançar além dessa etapa, faça o seguinte:

-   Verifique se há erros na aba Diagnóstico do Gerenciador de Eventos para o conjunto de dados do CRM.
    
-   Verifique se estão sendo carregados eventos suficientes para corresponder aos leads gerados no Facebook. Por exemplo, se o anunciante gerar 100 leads em um dia, o esperado é que todos os 100 leads sejam carregados para a correspondência exata. Você precisa alcançar pelo menos 60% da cobertura de leads, que é definida como a porcentagem de leads que têm eventos com correspondência carregados na Meta.
    
-   Verifique se no mínimo dois estágios estão sendo enviados para eventos do funil de vendas do anunciante, incluindo o primeiro estágio do lead (ou seja, o evento de lead bruto). Recomendamos usar pelo menos três estágios, se possível. Por exemplo, enviar apenas o evento "Venda" não será suficiente. É preciso que o anunciante envie também as etapas anteriores.
    
-   Confira se os dados têm todos os parâmetros necessários no formato correto destacado neste guia. O envio de dados em outros formatos resultará em erro.
    

**Etapa 2**. [**Configurar o funil de vendas**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel)

**Etapa 3**. [**Analisar o funil e passar pela fase de aprendizado**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/6-follow-up-steps): a integração precisará atender aos seguintes critérios:

-   Ter um estágio de otimização com taxa de conversão entre 1% e 40%
    
-   Ter janela de conversão de otimização de 28 dias ou menos
    

Após a conclusão da integração, há uma fase de aprendizado de 3 a 4 semanas, na qual o modelo precisará usar os dados que estão sendo enviados de volta para otimização. Após a integração, um modal de confirmação aparecerá no Gerenciador de Eventos para avisar que o processo foi concluído.

**Etapa 4. Veicular campanhas de anúncios de leads de conversão otimizadas** por meio do Gerenciador de Anúncios usando o conjunto de dados de CRM acima.

_**Observação**: lembre o anunciante de não alterar os conjuntos de dados após a integração. A alteração iniciará uma nova integração e reiniciará o processo de aprendizado._

[](#)