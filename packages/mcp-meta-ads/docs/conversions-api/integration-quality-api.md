---
title: "Dataset Quality API - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api"
scraped_at: "2026-02-01T14:32:22.208Z"
---

# Dataset Quality API

Os anunciantes que compartilham eventos do servidor usando a API de Conversões podem conferir a pontuação de qualidade da correspondência de eventos no Gerenciador de Eventos da Meta. No entanto, isso só funciona individualmente e é difícil de escalar nos casos em que um parceiro provedor de tecnologia, parceiro de agência ou anunciante gerencia uma grande quantidade de Pixels da Meta para seus negócios. A Dataset Quality API (anteriormente conhecida como Integration Quality API) pode ajudar a resolver esse problema consolidando métricas de qualidade de conjunto de dados de modo programático em escala.

## Novidades

A partir de 28 de maio de 2025, as seguintes métricas serão adicionadas à API para consulta.

-   [Conversões adicionais relatadas](#acr-main)
    
-   [Conversões adicionais relatadas por parâmetro](#acr-params)
    
-   [Conversões adicionais relatadas por evento](#acr-capi-event)
    
-   [Conversões adicionais relatadas para cobertura de eventos](#acr-event-coverage)
    
-   [Cobertura de eventos](#event-coverage)
    
-   [Desduplicação de eventos](#event-deduplication)
    
-   [Nível de atualização dos dados](#data-freshness)
    
-   [Diagnóstico de qualidade de correspondência de eventos](#emq-diagnostics)
    

Além disso, a [Dataset Quality API para eventos offline](/docs/marketing-api/conversions-api/dataset-quality-api/offline-events) (na versão beta) e novas métricas estão disponíveis.

## Casos de uso comuns

Parceiros e agências podem usar a Dataset Quality API para fornecer um painel de qualidade e insights, ao mesmo tempo que ajudam os anunciantes a aprimorar e otimizar as integrações. Os parceiros também podem usar esse recurso para monitorar a estabilidade da integração da API de Conversões. Com esse ponto de extremidade, os anunciantes podem agregar dados de qualidade de conjunto de dados para incorporar no processo de monitoramento.

[](#)

## Requisitos de configuração

### Propriedade e acesso

#### Autenticação do anunciante usando o Gerenciador de Negócios da Meta

1.  No Gerenciador de Negócios, vá até a seção Usuários e selecione a aba **Usuário do sistema**. Clique no usuário específico do sistema que você está usando para a API de Conversões.
2.  Acesse o diálogo Atribuir ativo e escolha **Pixels**. Depois, selecione os pixels em nome dos quais você quer enviar eventos.
3.  Para cada pixel, selecione a permissão Gerenciar pixel e clique em **Salvar alterações**.
4.  Volte para a página de detalhes do seu usuário do sistema. Verifique se os pixels selecionados aparecem lá.
5.  Para gerar o token de acesso, siga [estas instruções](https://www.facebook.com/business/help/503306463479099?id=2190812977867143).

#### Autenticação da plataforma do parceiro

O primeiro passo é solicitar uma autorização para enviar eventos em nome dos seus clientes. Existem as seguintes opções de autenticação:

##### Login do Facebook para Empresas (recomendado)

O [Login do Facebook para Empresas](https://developers.facebook.com/docs/facebook-login/facebook-login-for-business/) é a solução de autenticação e autorização mais usada entre provedores de tecnologia e desenvolvedores de apps de negócios que precisam acessar os ativos dos clientes. Esse recurso permite especificar o tipo de token de acesso, os tipos de ativos, bem como as permissões necessárias ao seu app, e salvar essas escolhas como um conjunto (configuração). Dessa forma, você pode apresentar o conjunto aos clientes para que eles concluam o fluxo e concedam ao seu app acesso aos respectivos ativos de negócios.

##### Extensão da Meta para Empresas (recomendado)

A [Extensão da Meta para Empresas](https://developers.facebook.com/docs/facebook-business-extension/) (MBE, pelas iniciais em inglês) retorna todas as informações necessárias para enviar eventos em nome do cliente. Ela fornece um ponto de extremidade para recuperar tokens de acesso do usuário do sistema criados no Gerenciador de Negócios do cliente. Esse processo inclui as permissões para enviar eventos do servidor e é feito de forma automática e segura. No momento, a MBE está na versão beta. Para receber acesso, entre em contato com seu representante da Meta.

O ponto de extremidade requer um token de acesso do usuário como parâmetro de entrada. Caso você nunca tenha usado a MBE, faça uma chamada para o ponto de extremidade a fim de buscar o token de acesso do usuário do sistema quando terminar de configurar a extensão. Os usuários existentes precisarão solicitar outra autenticação antes de fazer chamadas para o novo ponto de extremidade da API.

##### O cliente compartilha o Pixel da Meta com o Gerenciador de Negócios do parceiro

Com essa opção, o cliente compartilha o próprio Pixel da Meta com o parceiro usando as configurações do Gerenciador de Negócios ou por meio da [API](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel/shared_accounts/). Depois, o parceiro pode atribuir o usuário do sistema ao pixel do cliente e [gerar um token de acesso para enviar eventos do servidor](https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#get-started).

##### O cliente gera o token manualmente usando o Gerenciador de Eventos

Os anunciantes podem gerar tokens de acesso no Gerenciador de Eventos para configurar a API de Conversões e acessar a Dataset Quality API. Você pode configurar uma integração direta ou compartilhar o token de acesso gerado com seus parceiros para enviar eventos à Meta. Copie e salve o novo token, já que a Meta não armazenará esses códigos. Com o token gerado, será possível buscar dados sobre a qualidade e enviar eventos usando a API de Conversões.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/494210872_24227227940205719_3078708776970798433_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=oDBp4TWnrwAQ7kNvwEwCBwC&_nc_oc=AdnRtrIApKFqdyHfn-qZZ6Fp2Wu9H2KFTO8-DFNJC4MSN8A65vPaw5WQAXY5ODJT5191PzRQna-0cUtiPzHJp4OR&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=SBVPnYMGqwcUYL7UYU1S-A&oh=00_AfuCts6PPbYT190BlfqZq5qWX0VRkfnBO6hFpnfbM2E0PQ&oe=69998EDF)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/494210872_24227227940205719_3078708776970798433_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=oDBp4TWnrwAQ7kNvwEwCBwC&_nc_oc=AdnRtrIApKFqdyHfn-qZZ6Fp2Wu9H2KFTO8-DFNJC4MSN8A65vPaw5WQAXY5ODJT5191PzRQna-0cUtiPzHJp4OR&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=SBVPnYMGqwcUYL7UYU1S-A&oh=00_AfuCts6PPbYT190BlfqZq5qWX0VRkfnBO6hFpnfbM2E0PQ&oe=69998EDF)

  
  

#### Permissão do usuário

-   O usuário ou usuário do sistema usado para fazer a chamada de API requer (no mínimo) a seguinte permissão: **Acesso parcial -> Usar conjunto de dados de eventos**
    
-   O acesso do usuário pode ser concedido (em massa) utilizando as instruções fornecidas [aqui](https://www.facebook.com/business/help/279059996069252?id=2042840805783715).
    

#### Permissão do app

-   **Básico:** se você gerencia um pequeno número de conjuntos de dados da Meta e/ou deseja testar a Dataset Quality API, precisará ter as seguintes permissões do app: **ads\_read** e (**ads\_management** ou **business\_management**).
    
-   **Avançado:** se você gerencia um grande número de conjuntos de dados da Meta em nome de outras empresas e/ou exige limites de taxa mais elevados, precisa ter o **nível avançado** da permissão **ads\_management** do app e o recurso do app **Acesso padrão ao gerenciamento de anúncios**. Permissões e recursos de nível avançado do app exigem a [análise do app](https://developers.facebook.com/docs/resp-plat-initiatives/individual-processes/app-review).
    

[](#)

## Como recuperar informações de qualidade do conjunto de dados

### Ponto de extremidade

```
v24.0
```

### Parâmetros

Parâmetro

Descrição

[`dataset_id`](#)

número inteiro

**Obrigatório.**  
A identificação do conjunto de dados (pixel) para recuperar dados de qualidade.

[`access_token`](#)

string

**Obrigatório.**  
Token de acesso válido (não expirado) para a identificação do conjunto de dados (pixel). Recomendamos configurar um token de acesso de usuário do sistema com longa duração. Leia mais sobre diferentes tipos de tokens de acesso no nosso [guia](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/) específico.

[`agent_name`](#)

string

**Opcional.**  
O valor normalizado do campo partner\_agent é usado para filtrar apenas eventos enviados com o parâmetro partner\_agent na solicitação POST [/{pixel\_id}/events](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#send). Veja as boas práticas de atribuição de eventos em [Implementação de ponta a ponta da API de Conversões](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation#step-3--attribute-events-to-your-platform) e [Boas práticas da API de Conversões](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices#bp-agencies).

Por exemplo, se o valor de partner\_agent for `[partner_name]_[majorversion]_[minorVersion]`, o valor da string do agente normalizado será `partner_name` em minúsculas.

O `agent_name` permite que você defina o identificador da sua plataforma ao enviar eventos em nome de um cliente. Caso você seja uma agência ou um parceiro gerenciado, trabalhe com o representante da Meta para definir o identificador.

Se você for um anunciante, provavelmente não será preciso se preocupar com a atribuição de `agent_name`.

Lembre-se de que, se `agent_name` não for fornecido, todos os eventos serão incluídos no cálculo da EMQ, independentemente de terem sido enviados por um agente ou não.

### Campos

Campo

Descrição

[`web`](#)

matriz

Este campo denota um conjunto estruturado de dados relacionados a eventos do site. O filtro é uma matriz com `event_name` e as respectivas métricas. Ele é obrigatório por padrão nesta API. Veja a [seção de exemplo](#example-section).

[`event_name`](#)

string

O nome de um evento [padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) ou [personalizado](/docs/facebook-pixel/implementation/conversion-tracking#custom-events).

[`event_match_quality`](#)

\[AdsPixelCAPIEMQ(/docs/marketing-api/reference/ads-pixel-capiemq)\]

A qualidade da correspondência de eventos indica o quanto as informações do cliente enviadas pelo seu servidor correspondem com as instâncias de eventos de uma conta do Facebook.

Clique [aqui](#emq-main) para ver mais detalhes.

[`event_potential_aly_acr_increase`](#)

[AdsPixelCAPIEventALYACR](/docs/marketing-api/reference/ads-pixel-capi-event-alyacr)

As conversões adicionais relatadas (ACR, pelas iniciais em inglês) para o evento da API de Conversões correspondem a uma métrica que estima quantas conversões (por exemplo, compras ou cliques no link) são medidas como resultado da configuração da API de Conversões de um anunciante.

Clique [aqui](#acr-capi-event) para ver mais detalhes.

[`acr`](#)

[AdsDatasetCAPIACR](/docs/marketing-api/reference/ads-dataset-capiacr)

A métrica de conversões adicionais relatadas (ACR) permite entender o quanto sua empresa se beneficia com o uso da API de Conversões em conjunto com o Pixel da Meta. Além disso, ela ajuda a determinar se é possível aprimorar a configuração da API de Conversões para mensurar mais conversões relatadas. Mais conversões relatadas podem ajudar você a diminuir o custo por resultado e mostrar os anúncios às pessoas que os consideram relevantes.

Clique [aqui](#acr-main) para ver mais detalhes.

[`event_coverage`](#)

[AdsDatasetEventCoverage](/docs/marketing-api/reference/ads-dataset-event-coverage)

A cobertura do evento é a porcentagem média de 7 dias de eventos do pixel que são cobertos pela API de Conversões e compartilham chaves de desduplicação com eventos da API de Conversões.

Clique [aqui](#acr-event-coverage) para ver mais detalhes.

[`dedup_key_feedback`](#)

[AdsDatasetDedupKeyFeedback](/docs/marketing-api/reference/ads-dataset-dedup-key-feedback)

A desduplicação é um processo usado para impedir que nosso sistema conte o mesmo evento duas vezes. Para que você tenha uma alta cobertura de eventos, os eventos cobertos precisam ter uma configuração adequada de desduplicação.

O feedback da chave de desduplicação ajuda a identificar quaisquer problemas ativos com a desduplicação.

Clique [aqui](#event-deduplication) para ver mais detalhes.

[`data_freshness`](#)

[AdsDatasetDataFreshness](/docs/marketing-api/reference/ads-dataset-data-freshness/)

Esse campo indica se os seus dados estão atualizados. Use essa informação para entender o tempo de atraso entre o momento em que o evento ocorreu e o momento em que o recebemos.

Clique [aqui](#data-freshness) para ver mais detalhes.

**Dica**: verifique dentro do nó (acesse o hiperlink separadamente para a página de desenvolvedores) para descobrir todos os campos e nós derivados dos campos da tabela acima.

[](#)

## EMQ

### Sobre a qualidade da correspondência de eventos

#### Qualidade da correspondência de eventos

A qualidade da correspondência de eventos (EMQ, pelas iniciais em inglês) é uma pontuação de 0 a 10 que indica a eficácia da correspondência das informações do cliente enviadas pelo seu servidor com as instâncias de eventos de uma conta da Meta. Uma correspondência de eventos que possui uma alta qualidade pode melhorar a atribuição e o desempenho dos anúncios.

#### Como o cálculo é feito

A qualidade da correspondência de eventos é calculada com base na observação dos seguintes aspectos: 1) quais parâmetros de informações do cliente são recebidos do seu servidor por meio de uma integração da API de Conversões; 2) a qualidade das informações recebidas; e 3) a porcentagem de instâncias de eventos associadas a uma conta da Meta.

#### Como essa métrica é usada

A qualidade da correspondência de eventos é usada para avaliar se a API de Conversões está enviando as informações corretas do cliente para associar seus eventos a uma conta da Meta e para verificar se você configurou os parâmetros de informações do cliente da forma adequada. Os parâmetros de informações do cliente ajudam a associar os eventos a uma conta da Meta. Assim, você pode atribuir conversões aos seus anúncios e exibi-los às pessoas que têm maior probabilidade de gerar uma conversão. **A qualidade da correspondência de eventos é calculada em tempo real**. Clique [aqui](https://www.facebook.com/business/help/765081237991954?id=818859032317965) para saber mais sobre as boas práticas de EMQ.

No momento, a EMQ está disponível apenas para eventos da web. Para outros tipos de eventos, como de loja física e offline, eventos do app, leads de conversão ou qualquer integração em etapas alfa ou beta, entre em contato com um representante da Meta para saber como aprimorar a qualidade da correspondência.

**Caso de uso**: monitore a pontuação de qualidade da correspondência de eventos por evento, juntamente com as chaves de correspondência sendo enviadas, crie uma linha de tendência de EMQ ou extratos históricos, depois ligue alertas/deletores para pontuação de EMQ e quedas de chaves de correspondência.

**Documentação**: todos os campos disponíveis para diagnósticos de EMQ podem ser encontrados nesta [página de desenvolvedores](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel-capiemq).

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_match_quality,event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'agent_name=<AGENT_NAME>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "event_match_quality": {
        "composite_score": 6.2,
        "match_key_feedback": [
          {
            "identifier": "user_agent",
            "coverage": {
              "percentage": 100
            }
          },
          {
            "identifier": "external_id",
            "coverage": {
              "percentage": 100
            }
          }
        ]      
      },
      "event_name": "pLTVPurchase"
    },
    {
      "event_match_quality": {
        "composite_score": 7.2,
        "match_key_feedback": [
          {
            "identifier": "email",
            "coverage": {
              "percentage": 100
            }
          },
          {
            "identifier": "ip_address",
            "coverage": {
              "percentage": 99.9
            }
          },
        ]
      },
      "event_name": "CompleteRegistration"
    }
   ]
 }
```

[](#)

## Conversões adicionais relatadas (ACR) para parâmetros de qualidade da correspondência de eventos

As conversões adicionais relatadas (ACR) correspondem a uma métrica que estima quantas conversões (por exemplo, compras ou cliques no link) são medidas como resultado da configuração da API de Conversões de um anunciante.

**Para saber mais sobre essa métrica, consulte o artigo [Sobre ACR](https://www.facebook.com/business/help/453888373437795) e a seção [Saiba mais](https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api#learn-more)**.

**Caso de uso**: para eventos conectados à API de Conversões que tenham uma pontuação de EMQ, ao enviar mais conversões e/ou chaves de correspondência de qualidade superior, monitore o aumento em conversões adicionais as quais a API de Conversões tem capacidade de adicionar.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/graph-api/reference/ads-pixel-capi-match-key-alyacr/) para os parâmetros de EMQ da ACR na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_match_quality{match_key_feedback{identifier,potential_aly_acr_increase{percentage,description}}},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'agent_name=<AGENT_NAME>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "event_match_quality":
        "match_key_feedback": [
          {
            "identifier": "email",
            "potential_aly_acr_increase": {
              "percentage": 58.96,
              "description": "Similar advertisers who sent valid Email for Purchase saw a 58.96% median increase in their existing additional conversions reported."
            }
          },
          {
            "identifier": "ip_address",
            "potential_aly_acr_increase": {
              "percentage": 20.65,
              "description": "Similar advertisers who sent valid Ip Address for Purchase saw a 20.65% median increase in their existing additional conversions reported."
            }
          },
        ]
      }
      "event_name": "Purchase"
    },
  ]
}
```

[](#)

## Diagnóstico de EMQ

Os diagnósticos de qualidade da correspondência de eventos são problemas que identificamos com a integração da API de Conversões. Siga nossas recomendações para enviar chaves de correspondência de maior qualidade, otimizar o desempenho do seu anúncio e melhorar a pontuação de EMQ.

**Caso de uso**: extraia e armazene diagnósticos de EMQ no seu ambiente, configure notificações usando canais como email, Messenger ou notificações no app para resolver problemas de forma reativa.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-emq-diagnostics/) para diagnósticos de EMQ na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_match_quality{diagnostics},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'agent_name=<AGENT_NAME>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "event_match_quality": {
        "diagnostics": [
          {
            "name": "Update your IPv4 IP addresses to IPv6 IP addresses",
            "description": "Your server is sending IPV4 IP addresses through the Conversions API. We recommend updating to IPV6 IP addresses because this is the industry standard and offers better durability for this integration.",
            "solution": "You can update your web server and DNS provider configuration to support IPv6. In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it's sent to Meta. If this issue is not applicable or actionable, you can ignore it.",
            "percentage": 59.5,
            "affected_event_count": 18930,
            "total_event_count": 31830
          },
          {
            "name": "Server sending mismatched IP addresses",
            "description": "Your server is sending client IP addresses that do not match those from Meta Pixel. This may impact the attribution and optimization of your ad campaigns.",
            "solution": "In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it's sent to Meta.",
            "percentage": 61.5,
            "affected_event_count": 19567,
            "total_event_count": 31830
          }
        ]
      }
      "event_name": "Purchase"
    },
  ]
}
```

[](#)

## Cobertura de eventos

A cobertura do evento é a percentagem média de 7 dias de eventos do Pixel da Meta que são cobertos pela API de Conversões e compartilham chaves de desduplicação com eventos da API de Conversões.

**Leia este artigo da [Central de Ajuda para Empresas](https://www.facebook.com/business/help/1541268312717919?id=818859032317965) para saber mais sobre as boas práticas de cobertura de eventos**.

**Caso de uso**: avalie os eventos que estão conectados pelo servidor em relação aos que não estão. Por exemplo, se um anunciante tiver três eventos, ViewContent, AddToCart e Purchase, mas apenas Purchase for enviada pelo servidor, a cobertura do evento será de 33%.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-event-coverage/) para cobertura de eventos na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_coverage{percentage,goal_percentage,description},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{  
  "web": [
    {
      "event_coverage": {
        "percentage": 34.1,
        "goal_percentage": 75,
        "description": "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."
      },
      "event_name": "B2B Purchase"
    },
  ]
}
```

[](#)

## Conversões adicionais relatadas (ACR) para cobertura de eventos

A métrica de conversões adicionais relatadas (ACR) para cobertura de eventos permite entender o quanto sua empresa se beneficia com o uso da API de Conversões em conjunto com o Pixel da Meta. Para a cobertura de eventos, você pode ver o potencial de melhoria nas conversões adicionais relatadas se a cobertura e a desduplicação dos eventos atenderem às boas práticas.

**Para saber mais sobre as conversões adicionais relatadas, consulte o artigo [Sobre a ACR](https://www.facebook.com/business/help/453888373437795) e a seção [Saiba mais](https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api#learn-more).**

**Caso de uso**: para eventos conectados à API de Conversões que tenham uma cobertura abaixo do limite de 75%, monitore o aumento em conversões adicionais que a API de Conversões tem capacidade de adicionar ao cobrir mais eventos (aumentando a taxa do navegador em relação ao do servidor).

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-capi-event-coverage-alyacr/) para ACR para cobertura de eventos na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_coverage{potential_aly_acr_increase{percentage,description}},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "event_coverage": {
        "potential_aly_acr_increase": {
          "percentage": 35.8,
          "description": "Similar advertisers who send the same AddToCart pixel events with matching deduplication keys through Conversions API saw a median of 35.8% additional conversions reported versus those that only used Meta Pixel."
        }
      },
      "event_name": "AddToCart"
    },
  ]
}
```

[](#)

## Desduplicação de eventos

O Pixel da Meta e a API de Conversões permitem compartilhar eventos padrão e personalizados com a Meta para poder mensurar e otimizar o desempenho dos anúncios. O Pixel permite o compartilhamento de eventos da web por meio de um navegador. Já a API de Conversões permite o compartilhamento de eventos da web diretamente do seu servidor.

Se você conectar a atividade do site usando tanto o Pixel quanto a API de Conversões, poderemos receber os mesmos eventos do navegador e do servidor. Se identificarmos que os eventos são idênticos e redundantes, poderemos manter um e descartar o resto. Isso se chama desduplicação.

O feedback da chave de desduplicação mostra as porcentagens dos eventos do Pixel e da API de Conversões que foram recebidos com cada chave de desduplicação. Recomendamos compartilhar chaves de desduplicação de todos os seus eventos – quanto maior a percentagem, melhor.

**Para saber mais sobre as boas práticas de desduplicação consulte o artigo da [Central de Ajuda para Empresas](https://www.facebook.com/business/help/823677331451951?id=1205376682832142).**

**Caso de uso**: monitore a taxa de desduplicação entre eventos do navegador e do servidor para ajudar a aumentar a taxa de cobertura para seus eventos conectados à API de Conversões.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-dedup-key-feedback/) para o feedback da chave de desduplicação na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{dedupe_key_feedback{dedupe_key,browser_events_with_dedupe_key{percentage,description},server_events_with_dedupe_key{percentage,description},overall_browser_coverage_from_dedupe_key{percentage,description}},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'agent_name=<AGENT_NAME>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{ 
  "web": [
    {
      "dedupe_key_feedback": [
        {
          "dedupe_key": "event_id",
          "browser_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 14.8,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        },
        {
          "dedupe_key": "external_id",
          "browser_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 15.96,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        },
        {
          "dedupe_key": "fbp",
          "browser_events_with_dedupe_key": {
            "percentage": 0,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 0,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 0,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        }
      ],
      "event_name": "AddToCart"
    },
  ]
}
```

[](#)

## Nível de atualidade dos dados

O nível de atualidade dos dados indica o tempo de atraso entre o momento em que o evento ocorreu e o momento em que o recebemos. A boa prática é compartilhar os eventos em tempo real ou o mais próximo possível dele.

O padrão do Pixel da Meta é enviar eventos do navegador da web em tempo real. Para aproveitar seus eventos ao máximo, recomendamos que você envie-os em tempo real ou o mais próximo possível do tempo real. O atraso no envio de eventos pode afetar a eficiência da veiculação dos seus anúncios para os públicos certos.

**Para saber mais sobre as boas práticas para nível de atualidade dos dados, consulte o artigo da [Central de Ajuda para Empresas](https://www.facebook.com/business/help/379226453470947?id=818859032317965).**

**Caso de uso**: avalie a rapidez com que os eventos são recebidos do servidor em comparação com o navegador. Melhore a frequência para real\_time quando possível para aproveitar os dados dos seus eventos ao máximo.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-data-freshness/) para nível de atualidade dos dados na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{data_freshness{upload_frequency,description},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'agent_name=<AGENT_NAME>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{  
  "web": [
    {
      "data_freshness": {
        "upload_frequency": "real_time",
        "description": "The average frequency with which instances of this event are received through the Conversions API."
      },
      "event_name": "ViewContent"
    },
    {
      "data_freshness": {
        "upload_frequency": "hourly",
        "description": "The average frequency with which instances of this event are received through the Conversions API."
      },
      "event_name": "Lead"
    },
  ]
}
```

[](#)

## Conversões adicionais relatadas (ACR) para evento da API de Conversões

As conversões adicionais relatadas (ACR, pelas iniciais em inglês) para o evento da API de Conversões correspondem a uma métrica que estima quantas conversões (por exemplo, compras ou cliques no link) são medidas como resultado da configuração da API de Conversões de um anunciante.

**Para saber mais sobre as conversões adicionais relatadas, consulte o artigo [Sobre a ACR](https://www.facebook.com/business/help/453888373437795) e a seção [Saiba mais](https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api#learn-more).**

**Caso de uso**: para os Pixels da Meta não conectados à API de Conversões, extraia a métrica de conversões adicionais relatadas para ter uma estimativa do potencial de impacto de uma integração da API de Conversões.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-pixel-capi-event-alyacr/) para ACR para eventos da API de Conversões na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{event_potential_aly_acr_increase{description,percentage},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "event_potential_aly_acr_increase": {
        "description": "Similar advertisers who set up Conversions API for Search events saw a median of 32.9% additional conversions reported versus those that only used Meta Pixel.",
        "percentage": 32.9
      },
      "event_name": "Search"
    },
    {
      "event_potential_aly_acr_increase": {
        "description": "Similar advertisers who set up Conversions API for PageView events saw a median of 30.1% additional conversions reported versus those that only used Meta Pixel.",
        "percentage": 30.1
      },
      "event_name": "PageView"
    }
  ]
}
```

[](#)

## Conversões adicionais relatadas (ACR)

A métrica de conversões adicionais relatadas (ACR) permite entender o quanto sua empresa se beneficia com o uso da API de Conversões em conjunto com o Pixel da Meta. Além disso, ela ajuda a determinar se é possível aprimorar a configuração da API de Conversões para mensurar mais conversões relatadas. Mais conversões relatadas podem ajudar você a diminuir o custo por resultado e mostrar os anúncios às pessoas que os consideram relevantes.

**Para saber mais sobre as conversões adicionais relatadas, consulte o artigo [Sobre a ACR](https://www.facebook.com/business/help/453888373437795) e a seção [Saiba mais](https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api#learn-more).**

**Caso de uso**: para eventos conectados à API de Conversões que tenham uma pontuação de EMQ, monitore o aumento em conversões adicionais as quais a API de Conversões tem capacidade de adicionar.

**Documentação**: consulte os [campos disponíveis](https://developers.facebook.com/docs/marketing-api/reference/ads-dataset-capiacr/) para ACR na documentação para desenvolvedores.

### Exemplo

**Explorador da Graph API**

```
v24.0
```

**cURL**

```
curl -X GET -G \ -d 'fields=web{acr{description,percentage},event_name}' \ -d 'dataset_id=<DATASET_ID>' \ -d 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**Resposta da API**

```
{
  "web": [
    {
      "acr": {
        "description": "In the last 7 days, you saw about 37.9% more conversions reported for Search events by using the Conversions API alongside the Meta Pixel.",
        "percentage": 37.9
      },
      "event_name": "Search"
    },
    {
      "acr": {
        "description": "In the last 7 days, you saw about 45.5% more conversions reported for Page View events by using the Conversions API alongside the Meta Pixel..",
        "percentage": 45.5
      },
      "event_name": "PageView"
    }
  ]
}
```

[](#)

## Perguntas frequentes

[What Is the Dataset Quality API?](#faq_1197862172138454)

Advertisers that share server events using the Conversions API can see the event match quality score in Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a tech provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.

[Link permanente](#faq_1197862172138454)

[What is the access token used for?](#faq_1082332300562954)

The access token is used when partners send signal events or access the Setup Quality API on behalf of advertisers. The [client system user access token](https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#for-facebook-pixels-not-managed-by-the-partner) onboarding method is not compatible with the EMQ API at the moment.

[Link permanente](#faq_1082332300562954)

[How should the partner\_agent field be formatted?](#faq_1046550103640444)

The `partner_agent` value in your API GET request should be a normalized lowercase format. This field is now optional.

[Link permanente](#faq_1046550103640444)

[Can an Access Token Generated Using Events Manager Prior to July 2025 Access the Dataset Quality API Directly?](#faq_581593258034435)

The advertiser will need to go to Events Manager to accept by using the instructions in the [Client Generates Token Manually Using Events Manager](/docs/marketing-api/conversions-api/dataset-quality-api#ownership-and-access) section explained above. Once the advertiser completes the opt-in process, both the new token and existing generated tokens by the same user will be able to send events or access the Dataset Quality API.

[Link permanente](#faq_581593258034435)

[](#)

## Saiba mais

1.  [Boas práticas da API de Conversões](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices)
    
2.  [Driving performance with an optimized Conversions API setup](https://www.facebook.com/business/inspiration/video/drive-performance-optimized-conversions-api)
    
3.  [Otimizar sua configuração pode ajudar a desbloquear o potencial do seu desempenho de marketing](https://www.facebook.com/business/inspiration/video/drive-performance-optimized-conversions-api)
    
4.  [Conversions API Resources](https://www.facebook.com/business/m/conversions-api-resources)
    
5.  Orientações sobre a qualidade de conjunto de dados da API de Conversões na Central de Ajuda para Empresas:
    

-   [Boas práticas para a API de Conversões para ajudar a melhorar o desempenho do anúncio](https://www.facebook.com/business/help/308855623839366?id=818859032317965). As boas práticas da API de Conversões podem ajudar as empresas a melhorar o desempenho dos anúncios reduzindo o custo por ação. Sugerimos que você siga essas boas práticas na configuração inicial, mas também é possível usá-las para atualizar configurações existentes.
    
-   [Como visualizar detalhes de eventos do servidor no Gerenciador de Eventos da Meta](https://www.facebook.com/business/help/1541268312717919?id=818859032317965). Depois de configurar a API de Conversões, as empresas podem usar esse artigo para aprender a monitorar eventos e parâmetros. Isso permitirá que elas verifiquem se a configuração funciona conforme esperado e identifiquem oportunidades de melhoria. As empresas também podem saber mais sobre como usar os detalhes de eventos do servidor, ou seja, Qualidade da correspondência de eventos, Nível de atualidade dos dados, Visão geral de eventos e Desduplicação de eventos, no Gerenciador de Eventos para aprimorar a configuração da API de Conversões.
    

1.  Conversões adicionais relatadas:

-   [Sobre as conversões adicionais reportadas](https://www.facebook.com/business/help/453888373437795)
    
-   [Solucionar problemas relacionados à indisponibilidade das conversões adicionais reportadas](https://www.facebook.com/business/help/478879057492537)
    
-   [Como interpretar conversões adicionais reportadas](https://www.facebook.com/business/help/400970175546156)
    

[](#)