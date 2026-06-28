---
title: "Boas práticas - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices"
scraped_at: "2026-02-01T14:08:18.793Z"
---

# Boas práticas da API de Conversões

Use as boas práticas como recomendações gerais para uma integração bem-sucedida da API de Conversões. Essas recomendações foram desenvolvidas para ajudar você a usar a API de Conversões com a maior eficiência possível. Siga as recomendações de [implementação](#capi-implement) e de [pós-implementação](#post-implementation) para garantir uma integração sem falhas e resultados otimizados durante o compartilhamento de dados com a Meta.

Além de seguir as boas práticas, recomendamos que você [assista a este vídeo](/docs/marketing-api/conversions-api/using-the-api#video) para ver um tutorial mais prático sobre o uso da API de Conversões. O vídeo aborda os assuntos a seguir:

-   [Enviar solicitações](/docs/marketing-api/conversions-api/using-the-api#send)
    
-   [Eventos abandonados](/docs/marketing-api/conversions-api/using-the-api#dropped-events), [tempo de transação de eventos](/docs/marketing-api/conversions-api/using-the-api#event-transaction-time) e [solicitações em lote](/docs/marketing-api/conversions-api/using-the-api#batch-requests)
    
-   [Verificação de eventos](/docs/marketing-api/conversions-api/using-the-api#verify)
    
-   Uso da [Ferramenta Eventos de Teste](/docs/marketing-api/conversions-api/using-the-api#testEvents)
    

Os eventos de loja física, app e web compartilhados usando a API de Conversões exigem parâmetros específicos. A lista de [parâmetros obrigatórios está disponível aqui](/docs/marketing-api/conversions-api/parameters).

## Implementação

Ao configurar sua campanha, simplifique a estrutura da conta e use as boas práticas consolidadas a seguir:

-   Implemente as [boas práticas da fase de aprendizado](https://www.facebook.com/business/help/112167992830700?id=561906377587030).
    
-   Evite fazer [edições significativas na campanha](https://www.facebook.com/business/help/316478108955072?id=561906377587030).
    
-   [Reduza a sobreposição no leilão](https://www.facebook.com/business/help/537699989762051?id=561906377587030).
    
-   Selecione os [posicionamentos automáticos](https://www.facebook.com/business/help/965529646866485?id=802745156580214) e a [otimização do orçamento da campanha](https://www.facebook.com/business/help/153514848493595?id=629338044106215).
    
-   [Escolha a estratégia de lance adequada](https://www.facebook.com/business/help/1619591734742116?id=2196356200683573) aos seus objetivos de negócios.
    

### Configurar eventos redundantes

Recomendamos que, além do Pixel da Meta, você use a API de Conversões e compartilhe os mesmos eventos com as duas ferramentas. Chamamos isso de _configuração de evento redundante_. Por exemplo, se você costuma compartilhar os eventos `Purchase`, `Initiate Checkout` e `Contact` com o Pixel da Meta, recomendamos que também compartilhe com a API de Conversões esses mesmos eventos do seu servidor.

A API de Conversões permite o compartilhamento de eventos do site que podem ser perdidos pelo Pixel devido a problemas na conectividade da rede ou a erros no carregamento de páginas. A API de Conversões também pode ser usada para compartilhar outros tipos de eventos e dados importantes que aconteceram offline ou após o horário permitido pelo Pixel.

### Garantir que os eventos redundantes possam ser desduplicados

Ao usar o Pixel da Meta e a API de Conversões para enviar eventos redundantes, verifique se ambos os eventos têm o mesmo `event_name`. Além disso, veja se houve a inclusão de `event_id` ou de uma combinação de `external_id` ou `fbp`. Recomendamos incluir todos esses parâmetros para ajudar a Meta a desduplicar os eventos apropriadamente e reduzir a incidência de relatórios duplos para eventos idênticos. [Saiba mais sobre a desduplicação, quando ela é necessária e como configurá-la.](https://www.facebook.com/business/help/823677331451951)

### Enviar parâmetros obrigatórios e recomendados

Os seguintes parâmetros de [evento do servidor](/docs/marketing-api/conversions-api/parameters/server-event) e de [informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) são obrigatórios:

Parâmetro

Tipo

Obrigatoriedade

[`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source)

Evento do servidor

Todos os eventos

[`event_source_url`](/docs/marketing-api/conversions-api/parameters/server-event#event-source-url)

Evento do servidor

Todos os eventos do site

[`client_user_agent`](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#client-user-agent)

Informações do cliente

Todos os eventos do site

Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) seja preciso conforme seu conhecimento. Também recomendamos a inclusão dos parâmetros `external_id` e `event_id` em todos os eventos.

O envio de mais [parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) pode ajudar a aumentar a qualidade da correspondência de eventos. Somente eventos com correspondência podem ser usados para a atribuição e a otimização da veiculação de anúncio. Quanto maior for a qualidade da correspondência, melhor. Os eventos sem correspondência não podem ser usados com essas finalidades, mas podem servir para mensurações básicas. Confira exemplos de parâmetros de informações do cliente de alta qualidade:

-   Endereço de email (`em`)
    
-   Endereço IP (`client_ip_address`)
    
-   Nome (`fn` e `ln`)
    
-   Telefone (`ph`)
    

### Requisitos básicos para a correspondência

Após o lançamento da versão 13.0 da Graph API, atualizaremos os requisitos básicos que determinam quais combinações de parâmetros de informações do cliente são consideradas válidas com um evento da API de Conversões. Essas alterações nos ajudarão a fornecer feedbacks aprimorados quando um evento tiver uma combinação de parâmetros de informações do cliente abrangente demais, em que a eficácia da correspondência passe a ser improvável.

Um evento será considerado inválido se somente incluir parâmetros de informações do cliente que consistem em uma das combinações a seguir (ou um subconjunto delas).

-   `ct` + `country` + `st` + `zp` + `ge` + `client_user_agent`
    
-   `db` + `client_user_agent`
    
-   `fn` + `ge`
    
-   `ln` + `ge`
    

Por exemplo, se um evento tiver somente os parâmetros de informações do cliente `ge`, `ct`, `st` e `country` (correspondendo a um homem em Menlo Park, Califórnia, EUA), ele será rejeitado, porque esses parâmetros são um subconjunto de uma das combinações listadas acima.

### Garantir que os parâmetros `fbp` e `fbc` estejam atualizados

Os parâmetros [`fbp`](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) e [`fbc`](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) são valores de cookie geralmente definidos nos navegadores dos visitantes do seu site em relação à solução de cookie interno da Meta e estão sujeitos a alterações. Se você os enviar como [parâmetros do usuário](/docs/marketing-api/conversions-api/parameters), será necessário atualizar esses valores regularmente.

Quando o Pixel da Meta for implementado no seu site, esses valores serão definidos como cookies próprios. Você poderá recuperá-los para uso em solicitações da API de Conversões.

### Compartilhar eventos mais perto do tempo real

O compartilhamento de eventos em tempo real pode ajudar suas campanhas a atingir melhores resultados. Você pode compartilhar eventos do servidor em tempo real com a API de Conversões ou quase em tempo real com as solicitações em [lote](/docs/graph-api/making-multiple-requests/).

### Usar Eventos de Teste

Recomendamos usar a [ferramenta Eventos de Teste](https://www.facebook.com/business/help/1624255387706033) para validar sua conexão com a API de Conversões. Geralmente, os desenvolvedores precisam usar os próprios parâmetros de informações do cliente (por exemplo, nome, endereço de email e telefone) nos eventos de teste, já que esses eventos poderão ser descartados se não houver correspondência com uma conta do Facebook ou da Meta.

Você pode usar a ferramenta Eventos de Teste para fazer o seguinte:

-   Verificar se os eventos do servidor foram configurados e recebidos corretamente.
    
-   Conferir se você desduplicou os eventos corretamente por meio de uma análise dos eventos processados e desduplicados.
    
-   Depurar atividades incomuns.
    

[Saiba como testar os eventos do seu servidor usando a ferramenta Eventos de Teste.](https://www.facebook.com/business/help/1624255387706033)

### Usar o Auxiliar de carga

Preencha os campos de parâmetros de dados obrigatórios e recomendados na ferramenta [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper) para ver como estruturar sua carga e obter recomendações s quais parâmetros incluir.

### Usar nosso SDK de Negócios

As [amostras de código](/docs/marketing-api/conversions-api/using-the-api) na nossa documentação incluem exemplos do SDK de Negócios em Python, Java, Ruby, PHP e Node. Isso pode reduzir o desenvolvimento necessário. Por exemplo, o hashing de parâmetros é feito automaticamente no SDK de Negócios.

Caso você não queira usar o SDK de Negócios, recomendamos implementar [hashing](/docs/marketing-api/conversions-api/parameters/customer-information-parameters#normalize-and-hash).

### Usar a API de Conversões para eventos offline

A API de Conversões é compatível com [todos os eventos offline](/docs/marketing-api/conversions-api/offline-events) e deve ser usada como um contêiner abrangente para esse tipo de evento. Por exemplo, vendas no local, ligações de telefone, ações realizadas em dispositivos (como smart TVs ou consoles de videogame) e assinaturas offline.

Ao enviar eventos offline, inclua o parâmetro de evento [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) e escolha o valor adequado (que não deve ser `website`). A fonte da ação é necessária para determinar os objetivos da campanha a que o evento se destina.

Ao usar a API de Conversões, você concorda que o parâmetro [`action_source`](/docs/marketing-api/conversions-api/parameters/server-event#action-source) seja preciso conforme seu conhecimento.

[](#)

## Boas práticas adicionais para parceiros

### Agências: enviar a string `partner_agent`

Os parceiros ou as agências que compartilham eventos em nome de anunciantes devem enviar uma string [`partner_agent`](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#attribute-events-to-your-platform-using-partner-agent) única com o nome da plataforma documentado. Se aplicável, trabalhe em conjunto com seu representante da Meta para escolher uma string de agente adequada.

### Plataformas de sites: integrar os anunciantes

Por padrão, os parceiros das plataformas de sites podem escolher entre oferecer a API de Conversões de forma seletiva ou a anunciantes que aderirem ao recurso. O Pixel da Meta e a API de Conversões têm os mesmos Termos para Empresas. Sendo assim, recomendamos que você também obtenha a autorização dos clientes para compartilhar os próprios dados usando a API de Conversões quando eles configurarem o Pixel da Meta. Acreditamos que o uso de ambas as ferramentas fortalecerá e protegerá o compartilhamento de dados no longo prazo. No entanto, sugerimos que você forneça informações sobre a API de Conversões e o Pixel da Meta para a ajudar os clientes a tomar a própria decisão.

[](#)

## Pós-implementação

### Verificar a qualidade da correspondência de eventos

Se você compartilhar eventos do servidor com a API de Conversões, poderá ver a qualidade da correspondência (EMQ, pelas iniciais em inglês) de cada um deles no Gerenciador de Eventos. A pontuação de EMQ (de 1 a 10) indica a eficiência de um evento do servidor no estabelecimento da correspondência entre as informações do cliente e uma conta do Facebook ou da Meta. Saiba mais sobre as boas práticas de EMQ [aqui](https://www.facebook.com/business/help/765081237991954?id=818859032317965).

Atualmente, a qualidade de correspondência está disponível para eventos da web. Para outros tipos (como eventos offline ou em loja física, evento do app, conversões de cadastros ou integrações em etapas alfa ou beta), entre em contato com um representante da Meta para saber como aprimorar a qualidade da correspondência de evento.

### Executar um teste

Ao usar a API de Conversões, recomendamos testar e otimizar sua estratégia de anúncios na Meta. Confira abaixo algumas opções de teste.

-   **[Estudo de incrementalidade de conversões](https://developers.facebook.com/docs/marketing-api/guides/lift-studies)**: entenda o impacto incremental no desempenho do uso de eventos do servidor.
    
-   **[Teste A/B](https://developers.facebook.com/docs/marketing-api/guides/split-testing)**: entenda qual estratégia de campanha obtém os melhores e mais eficientes resultados na otimização do desempenho.
    

[](#)

## Saiba mais

-   [API de Conversões](/docs/marketing-api/conversions-api)
    
-   [Implementação de ponta a ponta da API de Conversões](/docs/marketing-api/conversions-api/guides/end-to-end-implementation)
    
-   [Parâmetros `fbp` e `fbc`](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/)
    
-   [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper/)
    
-   [Parâmetros](/docs/marketing-api/conversions-api/parameters)
    
-   [API de Conversões Offline](/docs/marketing-api/offline-conversions/)
    
-   [String `partner_agent` da API de Conversões](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform#attribute-events-to-your-platform-using-partner-agent)
    
-   [Sobre a desduplicação de eventos do Pixel da Meta e da API de Conversões](https://www.facebook.com/business/help/823677331451951)
    
-   [Solicitações em lote](/docs/graph-api/making-multiple-requests/)
    
-   [Teste os eventos do servidor com a ferramenta Eventos de Teste](https://www.facebook.com/business/help/1624255387706033)
    
-   [SDK de Negócios da Meta](/docs/business-sdk/)
    

[](#)