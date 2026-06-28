---
title: "Como verificar a configuração - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/verifying-setup"
scraped_at: "2026-02-01T14:07:13.219Z"
---

# Como verificar sua configuração

Esta página descreve formas de verificar se a sua configuração está funcionando corretamente e se ela ajuda a melhorar o desempenho dos anúncios. O processo de verificação da sua configuração consiste em:

-   [Verificar se os eventos são recebidos corretamente](#verifying-that-events-are-received-correctly)
    
-   [Verificar se os eventos estão sendo enviados o mais próximo possível do tempo real](#monitoring-event-freshness)
    
-   [Verificar se os eventos são desduplicados corretamente](#verifying-that-events-are-deduplicated-correctly)
    
-   [Verificar se os eventos são correspondidos a usuários com alta precisão](#verifying-that-events-are-matched-to-users-with-high-accuracy)
    

## Verificar se os eventos são recebidos corretamente

### Como monitorar eventos recebidos

Depois de enviar eventos, confirme se eles foram recebidos no [Gerenciador de Eventos](https://www.facebook.com/events_manager). Será possível verificá-los dentro de 20 minutos após o envio.

Curso do Meta Blueprint: [Como configurar, implementar e verificar a API de Conversões](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219714-set-up-implement-verify-conversions-api%3Fcontent_id%3Ddtl2XpttDSQh8wk&h=AT1kmg8OJb0ghANsELOdX2MxYyetLfAR0c883KXZjbWaTiOlQGsTIcBBB6z499E8doh4g4Vtq177WYVcsF9yqgwRFipHcZsG1prRhxXeyKbJGqnpGCrklDuazP1buzKn3Tyg5DQhrg-wRYk1AcE-knSWb1jy54bHQxp6gAIZTzg)

Para monitorar eventos recebidos no Gerenciador de Eventos, clique no pixel correspondente a `PIXEL_ID` na sua solicitação `POST` na página Fontes de dados. Para obter mais informações, consulte a [Central de Ajuda para Empresas: Navegar no Gerenciador de Eventos](https://www.facebook.com/business/help/898185560232180).

Depois, clique em **Visão geral**. Aqui, você verá o número de eventos que recebemos antes de serem desduplicados, descartados, devido a controles de consentimento e outras políticas, ou processados. Em **Método de conexão**, é possível ver o canal usado para enviar o evento. Clique em cada tipo de evento para obter informações mais específicas.

### Como monitorar a atualização do evento

Para ajudar o Facebook a otimizar seus anúncios, recomendamos que minimize o tempo entre a ocorrência de um evento (representado pelo parâmetro `event_time`) e quando ele é compartilhado com o Facebook para estar o mais próximo possível do tempo real.

É possível usar o Gerenciador de Eventos para monitorar a atualização do evento. Na página **Visão geral** para um determinado pixel, clique no botão Detalhes do evento para um evento para obter informações mais específicas. Nesta página, navegue até a aba **Atualização do evento**. Nessa aba, é possível ver o tempo médio de atraso do evento em uma escala de Tempo real para Semanal.

[](#)

## Verificar se os eventos são desduplicados corretamente

Para otimizar o desempenho dos anúncios, recomendamos que os anunciantes implementem a API de Conversões junto com o Pixel da Meta. Ao seguirem essa recomendação, os anunciantes devem configurar um método de desduplicação para ajudar a garantir que o sistema de veiculação de anúncios seja capaz de diferenciar entre eventos distintos e sobrepostos. Saiba mais sobre [desduplicação](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).

Use o Gerenciador de Eventos para monitorar a porcentagem de eventos que foram desduplicados. Na página **Visão geral** para um determinado pixel, clique no botão **Detalhes do evento** para um tipo de evento para obter informações mais específicas. Nessa página, navegue até a aba **Desduplicação de eventos**.

Essa aba mostra as seguintes informações:

-   **Taxa de eventos desduplicados**: esta é a porcentagem de eventos que foram desduplicados a partir de cada fonte de eventos. É recomendável ter porcentagens maiores, e um aviso aparecerá quando sua taxa de desduplicação for muito baixa. Talvez seja possível melhorar as taxas de desduplicação adicionando mais parâmetros de desduplicação ao evento.
    
-   **Taxa de uso da chave de desduplicação**: esta é a porcentagem de eventos de cada fonte que continha cada chave de desduplicação. Sobreposição é a porcentagem de eventos com uma determinada chave de desduplicação recebida de ambas as fontes (como uma porcentagem da fonte com o menor número de eventos recebidos). Ter baixa sobreposição significa que a implementação está enviando chaves de desduplicação não únicas de uma/qualquer fonte ou enviando eventos com uma chave de desduplicação de apenas uma fonte.
    

[](#)

## Verificar se os eventos são correspondidos a usuários com alta precisão

Quando seus eventos forem correspondidos a pessoas com uma conta do Facebook, seus eventos podem ser melhor utilizados para atribuição e otimização de anúncios. No Gerenciador de Eventos, é possível monitorar a qualidade da correspondência de eventos, uma medida da eficácia dos parâmetros de informações do cliente do seu evento do servidor na correspondência de eventos com uma conta do Facebook.

A pontuação de qualidade da correspondência de eventos varia de 1 a 10. É possível monitorar a qualidade da correspondência de eventos de duas formas:

-   Navegar até a página **Visão geral** em determinado pixel com a API de Conversões
    
-   Usar a [API de Qualidade da Configuração](/docs/marketing-api/conversions-api/setup-quality-api)
    

Ter uma pontuação alta pode ajudar a diminuir o custo por ação. Sempre que possível, recomendamos que sua pontuação de qualidade da correspondência de eventos seja igual ou maior que seis. Clique na pontuação de qualidade da correspondência de eventos para ver detalhes e recomendações adicionais para melhorar a qualidade da correspondência de eventos. Saiba mais sobre [outras boas práticas para a qualidade da correspondência de eventos](https://www.facebook.com/business/help/308855623839366?id=818859032317965).

[](#)

## Veja também

-   [Como configurar a API de Qualidade](/docs/marketing-api/conversions-api/setup-quality-api)
    
-   Meta Blueprint: [Como configurar, implementar e verificar a API de Conversões](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219714-set-up-implement-verify-conversions-api%3Fcontent_id%3Ddtl2XpttDSQh8wk&h=AT39jVkNg_2UA_y-CO6w3iYD91G_KLO-Z1pObl0vZX1oySlniIscHFiiU_LEolN_NbAeT9dRRkDieqdI-ZTR0XBaoN0R8fZyHRbn8nCzc2VVnoHr7avPGtAan1MWqBEijCC9QfM9w-1cb5XlaQ2tlLG1gU72liCxCZKngptG6n8)
    

[](#)