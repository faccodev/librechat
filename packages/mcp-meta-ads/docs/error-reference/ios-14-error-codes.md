---
title: "Códigos de erro do iOS 14 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/error-reference/ios-14-error-codes"
scraped_at: "2026-02-01T14:32:26.963Z"
---

# Referência de códigos de erro do iOS 14

Uma referência para os códigos de erro do Facebook iOS 14 para a API de Marketing.

Código de erro

Mensagem de erro

Pontos de extremidade afetados

`1870125`

Você não pode usar Públicos Personalizados de atividade de app para inclusão na Criação/Edição de Anúncios em uma campanha do iOS 14 devido a alterações no iOS 14 que afetam sua capacidade de detectar ações em dispositivos móveis. [Saiba mais.](https://business.facebook.com/business/help/331612538028890?id=428636648170202)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets#Creating)

[`POST /{adset-id}`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/#Creating)

`1870141`

Você não pode utilizar conexões de apps para campanhas do iOS 14 devido a alterações no iOS 14.5 que afetam sua capacidade de detectar ações em dispositivos móveis. [Saiba mais.](https://business.facebook.com/business/help/331612538028890?id=428636648170202)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets#Creating)

[`POST /{adset-id}`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/#Creating)

`2446632`

As campanhas do iOS 14 só podem promover apps para iOS. Selecione um app para iOS ou escolha um tipo de campanha diferente. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446685`

Você não tem permissão para veicular uma campanha de instalações para esse app. Peça permissão ao proprietário do app ou escolha outro app. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446686`

Para campanhas do iOS14, limitamos o número de contas de anúncios que podem promover um determinado app. Esta mensagem de erro aparecerá quando outra conta de anúncios já estiver promovendo o app. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446692`

Não é possível criar uma nova campanha com este ID de app do iTunes porque ele já está sendo usado. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446693`

Para criar uma campanha do iOS 14, certifique-se de que seu app tenha sido atualizado para a versão 8.0 ou posterior do SDK do Facebook. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446694`

Para criar uma campanha do iOS 14, certifique-se de que seu app tenha sido atualizado para a versão {min\_version} ou posterior do SDK do Parceiro de Métricas para Aplicativos de terceiros. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446695`

Seu app está enviando eventos de servidor para servidor e não envia eventos SKAdNetwork automaticamente. Acesse o Gerenciador de Eventos para confirmar que tem a API SKAdNetwork configurada para seu app. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446697`

A conta de anúncios {ad-account-id} já está promovendo seu app. [Saiba mais.](https://developers.facebook.com/docs/app-ads)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446698`

Depois de publicar uma campanha do iOS 14, não é mais possível alterar o tipo de campanha. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446699`

Para veicular esta campanha do iOS 14, você precisa fornecer uma URL do iTunes. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2446700`

Para veicular esta campanha do iOS 14, você precisa fornecer um ID de app do iTunes. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2490208`

A mesma otimização para a veiculação de anúncios é necessária para todos os conjuntos de anúncios em uma campanha do iOS 14. Certifique-se de que todos os conjuntos de anúncios em uma campanha estejam usando a mesma otimização para a veiculação de anúncios. [Saiba mais.](https://developers.facebook.com/docs/marketing-api/bidding/guides/campaign-budget-optimization)

[`POST /act_{ad-account-id}/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/#Creating)

`2490216`

O custo-alvo não está disponível para campanhas de anúncios do iOS 14. Selecione outra estratégia de lance para otimizar sua campanha. [Saiba mais.](https://developers.facebook.com/docs/marketing-api/bidding/overview/bid-strategy)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets#Creating)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns#Creating)

`2490217`

Não é possível selecionar instalações do app como seu evento de cobrança e otimização de veiculação de anúncios. Escolha outro evento de cobrança ou otimização. [Saiba mais.](https://developers.facebook.com/docs/marketing-api/bidding)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets#Creating)

`2490238`

Você atingiu o limite de 5 conjuntos de anúncios para esta campanha do iOS 14. Se quiser veicular um novo conjunto de anúncios, será necessário excluir um existente. [Saiba mais.](https://www.facebook.com/business/help/651033805513936)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490239`

O app escolhido para promover este conjunto de anúncios não é o mesmo que o app escolhido para promover sua campanha. Certifique-se de promover o mesmo app tanto para a campanha como para todos os seus conjuntos de anúncios. [Saiba mais.](https://www.facebook.com/business/help/651033805513936)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490246`

Todas as campanhas do iOS 14 devem ter como objetivo instalações do app. Selecione instalações do app como o objetivo da sua campanha. [Saiba mais.](https://www.facebook.com/business/help/651033805513936)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490247`

Sua conta de anúncios ainda não tem permissão para criar uma campanha do iOS 14, mas essa permissão será disponibilizada em breve. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490249`

O iOS 14.0 é a versão mais antiga do iOS para uma campanha do iOS 14. Selecione o iOS 14.0 ou versões posteriores para continuar. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490250`

Para veicular esta campanha do iOS 14, você precisa fornecer uma URL e um ID de app do iTunes. [Saiba mais.](https://developers.facebook.com/docs/SKAdNetwork)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490252`

Se quiser usar o limite de custos/ROAS mínimo como estratégia de lance, você precisa agendar uma campanha com pelo menos {duração} dias. [Saiba mais.](https://developers.facebook.com/docs/marketing-api/bidding/overview/bid-strategy)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490253`

O iOS {max-version} é a versão mais recente do iOS para este tipo de campanha. Selecione iOS {max-version} ou uma versão anterior para continuar. [Saiba mais.](https://developers.facebook.com/blog/post/2021/01/14/preparing-our-partners-api-endpoint-changes/)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`2490255`

Com as configurações atuais, sua campanha não alcançará pessoas que usam dispositivos no iOS 14. Para veicular uma campanha de instalações do app para alcançar pessoas que usam dispositivos no iOS 14, altere seu tipo de compra para leilão no nível da campanha. [Saiba mais.](https://developers.facebook.com/blog/post/2021/01/14/preparing-our-partners-api-endpoint-changes/)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`2490256`

Campanhas do iOS 14 não aceitam a otimização de cliques no link. Para veicular esta campanha do iOS 14, altere sua otimização para instalações do app, eventos do app ou valor. [Saiba mais.](https://developers.facebook.com/docs/marketing-api/bidding/overview#opt)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`3285004`

Para escolher o valor como a otimização para a veiculação de anúncios, primeiro é necessário ativar o valor definido no Gerenciador de Eventos. [Saiba mais.](https://developers.facebook.com/docs/app-ads/app-event-setup)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`3285005`

Para escolher eventos do app como a otimização para a veiculação de anúncios, primeiro é preciso configurar os eventos do app no Gerenciador de Eventos. [Saiba mais.](https://developers.facebook.com/docs/app-ads/app-event-setup)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`3285006`

O evento selecionado não está configurado como um dos eventos de conversão disponíveis. Escolha outro evento ou atualize sua seleção no Gerenciador de Eventos. [Saiba mais.](https://developers.facebook.com/docs/app-ads/app-event-setup)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`3285007`

Ainda estamos trabalhando no suporte a campanhas do iOS 14 para apps que usam um Parceiro de Métricas para Aplicativos de terceiros. Verifique se há atualizações no seu app do parceiro. [Saiba mais.](https://developers.facebook.com/blog/post/2020/12/16/preparing-partners-ios-14-mobile-web-advertising)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`3285008`

Como resultado dos novos requisitos da política do iOS 14 da Apple, deep links diferidos não estão disponíveis para este anúncio. [Saiba mais.](https://developers.facebook.com/docs/app-ads/deep-linking)

[`POST /act_{ad-account-id}/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/#Creating)

`3285009`

A mesma otimização de eventos é necessária para todos os conjuntos de anúncios em uma campanha do iOS 14. Certifique-se de que todos os conjuntos de anúncios em uma campanha estejam usando a mesma otimização de eventos. [Saiba mais.](https://developers.facebook.com/docs/app-ads/optimizing-your-app-ad)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#Creating)

`3285010`

Antes de criar uma campanha do iOS 14 com este ID do app, precisamos verificar a propriedade do app. Para solicitar uma análise, entre em contato com a Central de Ajuda para Empresas do Facebook por meio do seguinte link: [https://www.facebook.com/business/help/support](https://www.facebook.com/business/help/support). [Saiba mais.](https://www.facebook.com/business/help/support)

[`POST /act_{ad-account-id}/campaigns`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#Creating)

`3260002`

Todos os domínios precisam estar associados a um par de eventos de pixel e a um anúncio. Para publicar este anúncio, selecione um novo domínio para o anúncio ou configure um par de eventos de pixel para o domínio no Gerenciador de Eventos. [Saiba mais.](https://www.facebook.com/business/help/721422165168355)

[`POST /{adgroup-id}`](https://developers.facebook.com/docs/marketing-api/reference/adgroup#Creating)

[`POST /act_{ad-account-id}/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads#Creating)

`3260007`

Este evento não está configurado em um domínio. Para veicular este conjunto de anúncios, selecione um novo evento. Se o conjunto de anúncios já estiver publicado, é necessário duplicá-lo antes de selecionar um novo evento. Também é possível configurar as definições do evento no Gerenciador de Eventos. [Saiba mais.](https://www.facebook.com/business/help/721422165168355)

[`POST /act_{ad-account-id}/adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets#Creating)

[`POST /adsets`](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/#Creating)

`3260008`

Seu anúncio foi pausado porque você ou alguém que gerencia seus domínios atualizou recentemente os eventos de conversão. Após a atualização, a nova veiculação do anúncio será feita em 72 horas. Você poderá ativar esse anúncio assim que a atualização estiver concluída. [Saiba mais.](https://www.facebook.com/business/help/721422165168355)

[`POST /{adgroup-id}`](https://developers.facebook.com/docs/marketing-api/reference/adgroup#Creating)

[`POST /act_{ad-account-id}/ads`](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads#Creating)

## Saiba mais

-   [Central de Ajuda para Empresas – Sobre como usar anúncios nas tecnologias da Meta para alcançar pessoas que usam dispositivos iOS 14.5 ou posterior](https://business.facebook.com/business/help/331612538028890?id=428636648170202)
    
-   [Central de Ajuda para Empresas – Como preparar a integração do app para a SKAdNetwork da Apple](https://www.facebook.com/business/help/2750680505215705?id=428636648170202)
    

[](#)