---
title: "Anúncios de lead - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lead-ads"
scraped_at: "2026-02-01T13:52:47.405Z"
---

# Anúncios de lead

Obtenha leads em anúncios do Facebook. Os anúncios de lead proporcionam às pessoas uma maneira rápida e confidencial de se cadastrarem para receber informações sobre sua empresa.

## Como funciona

Com os anúncios de lead, os formulários se tornam mais simples para as pessoas e mais valiosos para as empresas. Quando você configura um anúncio de lead, os clientes em potencial se cadastram para receber suas ofertas e você recebe informações de contato precisas para fazer o acompanhamento.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/15516506_571402833064884_4932082469810733056_n.png?_nc_cat=101&ccb=1-7&_nc_sid=34156e&_nc_ohc=ENOzlWQQVicQ7kNvwFWLX7I&_nc_oc=AdmuKwA_b9-0tH_LJmLy0Pd-w7qQVkEzjASY2XfFfd6fjiUozUbbwJ0Dn1C6K6zvaFBa_-xMAUqFM_Q1ekwzYBM6&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=YQeotFHaXPZnM52U-rexyw&oh=00_AfvhKA5YZoxvp-0boHHV5h8M7O9dPv5tI92IoZlf-w4D_w&oe=698523CC)

O formulário é compatível com dispositivos móveis e usa informações já compartilhadas pelas pessoas com o Facebook. Assim, as pessoas alcançam empresas com mais facilidade e rapidez, e os anunciantes obtêm informações precisas e úteis. Saiba mais sobre os [anúncios de lead](https://www.facebook.com/business/ads/lead-ads).

[](#)

## Antes de começar

Para usar anúncios de lead, você precisará do seguinte:

-   Página do Facebook  
    Confere à sua empresa uma presença no Facebook e ajuda você a se conectar com os clientes. Consulte os artigos [O que é uma Página do Facebook?](https://www.facebook.com/business/products/pages) ou [API de Páginas do Facebook: Introdução](/docs/pages/getting-started). Todos os leads gerados por um anúncio desse tipo pertencem à Página do Facebook.
    
-   Conta do Instagram (_opcional_)  
    Esta é uma etapa obrigatória para veicular anúncios de lead no Instagram. Mesmo assim, os leads gerados por um anúncio desse tipo pertencem à Página do Facebook.
    
-   App do Facebook  
    Inclui qualquer app de terceiros, como site, app para celular ou script. O app habilita a [API de Marketing](/docs/marketing-apis) para fazer a integração com o Facebook. Cada app tem um ID que será necessário sempre que você usar um dos nossos [SDKs](/docs#apis-and-sdks) ou [tags do Open Graph para compartilhamento](/docs/sharing/webmasters). Para encontrar o ID do seu app, acesse o [Painel de Apps](https://developers.facebook.com/apps). Saiba mais sobre [como criar um app e um ID correspondente](/docs/development/create-an-app).
    
-   App de teste (_opcional_)  
    Crie rapidamente IDs do app do Facebook para uso durante as fases de desenvolvimento, teste, preparação e controle de qualidade. Os apps de teste têm o próprio ID e configurações independentes, além de serem úteis na pré-produção. Consulte [Aplicativos de teste](/docs/development/build-and-test/test-apps).
    
-   Análise do app  
    Para recuperar dados de lead, seu app precisa passar pelo [processo de análise](/docs/apps/review). É necessário incluir as permissões `leads_retrieval` e `pages_manage_ads` no envio. Saiba mais no guia [Como enviar para análise](/docs/app-review/submission-guide). Após a aprovação, você precisará concluir a [verificação da empresa](/docs/development/release/business-verification).
    
-   Token de acesso  
    Todos os apps que acessam o Facebook precisam de um token de acesso. Também é possível obter um token ao criar um novo app. Há diversas formas de obter tokens de acesso. Consulte a [documentação sobre tokens de acesso](/docs/facebook-login/access-tokens) para ver mais detalhes sobre os diferentes tipos e métodos de obtenção.  
    Os tokens de acesso podem ser de [curta ou longa duração](/docs/facebook-login/guides/access-tokens#termtokens). Não é recomendável depender da estabilidade desses prazos, já que eles podem ser alterados sem aviso prévio ou vencer antes do previsto.
    

Os tokens de acesso têm limite de volume com base nos usuários ativos no app. Para integrações de anúncios de lead, esse limite costuma ser **um**. É altamente recomendável usar tokens de acesso à Página, já que esse tipo tem limitação de volume baseada nos usuários ativos na Página.

[](#)

## Limitações

Não será possível recuperar leads se o app estiver no [modo de desenvolvimento](/docs/development/build-and-test/app-modes#development-mode). Para fins de teste, os usuários do app no modo de desenvolvimento poderão acessar leads enviados por uma pessoa que tenha uma função nesse mesmo app. Consulte [Funções do app](/docs/development/build-and-test/app-roles) para saber mais.

**Observação:** os apps que estiverem no [modo publicado](/docs/development/build-and-test/app-modes#live-mode) manterão o acesso a todos os leads.

[](#)

## Criar um anúncio de lead

1.  [Crie um formulário](/docs/marketing-api/guides/lead-ads/forms-questions) para uso no anúncio de lead.
2.  Crie o anúncio no [Gerenciador de Anúncios](https://www.facebook.com/ads/manage/powereditor/) ou na API de Marketing e associe o ID do formulário. Consulte [Formulários de lead para anúncios](/docs/marketing-api/guides/lead-ads/create).

[](#)

## Como integrar CRMs

Com os anúncios de lead, é possível configurar a atualização instantânea dos leads que você recebe do Facebook no seu sistema de CRM. As opções incluem o seguinte:

-   [Parceiros de CRM](https://www.facebook.com/business/help/908902042493104) compatíveis com anúncios de lead.
    
-   Integração personalizada usando [Webhooks](/docs/graph-api/webhooks) e a [Graph API](/docs/graph-api). Consulte a [documentação sobre webhooks de anúncios de lead](/docs/marketing-api/guides/lead-ads/retrieving#webhooks) para saber mais.
    
-   A [Graph API](/docs/graph-api) é a principal forma de obter dados dentro e fora do Facebook e é uma API de baixo nível baseada em HTTP que pode ser usada para recuperar novos anúncios de lead em tempo real.
    

[](#)

## Integração com a API de Conversões

Para melhorar o desempenho dos seus anúncios e otimizar a qualidade dos leads, compartilhe os dados de lead do CRM com a Meta. Dessa forma, podemos usar os dados dos leads diretamente do seu CRM e, assim, melhorar a otimização de qualidade.

Veja mais informações sobre como conectar seu CRM à API de Conversões no guia [Integração de CRM de leads de conversão](/docs/marketing-api/conversions-api/conversion-leads-integration).

[](#)

## Recuperar leads

Para ler os dados de lead, você precisará ter acesso de administrador da Página ou permissões flexíveis. Com as permissões, você pode recuperar leads sem o acesso de administrador da Página.

### Formas de recuperar leads

-   Leitura em massa com a Graph API: recupere os leads como objetos JSON para facilitar a integração e o mapeamento de dados. Faça isso se quiser buscar novos leads algumas vezes por dia. Para atualizações mais frequentes, use Webhooks. Consulte [Como recuperar leads: Leitura em massa](/docs/marketing-api/guides/lead-ads/retrieving#bulk-read) para saber mais.
    
-   Webhooks: indicados para a integração do CRM com o Facebook, permitindo o recebimento de leads em tempo real. Recupere todos os novos leads em tempo real. Sempre que um novo lead é enviado, seu ponto de extremidade recebe uma atualização correspondente. Você pode buscar as informações do lead ao acessar a API de Marketing. Consulte [Webhooks da Meta sobre anúncios de lead para a gestão do relacionamento com o cliente](/docs/marketing-api/guides/lead-ads/quickstart/webhooks-integration) para ver mais informações.
    
-   Central de Leads: consulte [Gerenciar e baixar leads no Meta Business Suite](https://www.facebook.com/business/help/929596264178167) para saber mais.
    

[](#)

## Saiba mais

-   [Graph API: Visão geral](/docs/graph-api/overview)
    
-   [Graph API: Limites de volume](/docs/graph-api/advanced/rate-limiting)
    
-   [Formulários de lead para anúncios](/docs/marketing-api/guides/lead-ads/create)
    
-   [Como recuperar leads](/docs/marketing-api/guides/lead-ads/retrieving)
    
-   [Como recuperar leads: Webhooks](/docs/marketing-api/guides/lead-ads/retrieving#webhooks)
    
-   [Teste e solução de problemas](/docs/marketing-api/guides/lead-ads/testing-troubleshooting)
    
-   Central de Ajuda para Empresas: [Sobre os anúncios de lead](https://www.facebook.com/business/help/1481110642181372?id=735435806665862)
    
-   Central de Ajuda para Empresas: [Como verificar sua empresa](https://www.facebook.com/business/help/2058515294227817?id=180505742745347)
    

[](#)