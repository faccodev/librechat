---
title: "Anúncios do Reels - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/reels-ads"
scraped_at: "2026-02-01T13:54:18.481Z"
---

# Anúncios do Reels

Crie um anúncio da Meta com foco nos posicionamentos de Reels disponíveis e aprenda as boas práticas para operações de anúncios.

## Pré-requisitos

-   Ter criado anteriormente um app do Facebook
    
-   Ter familiaridade com APIs de Marketing e ter o Login do Facebook habilitado
    

Se você não atende a esses pré-requisitos, consulte nossa [documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-apis/get-started).

### Teste no sandbox

A Meta oferece um ambiente de teste, que não veicula anúncios, mas permite:

-   Adicionar a API de Marketing como um produto no seu app da Meta na seção Ferramentas para criar e editar anúncios usando nossas APIs sem incorrer em custos
    
-   Criar uma conta de anúncios para usar a API de Marketing
    

Leia nossas [boas práticas para testes](https://developers.facebook.com/docs/marketing-api/best-practices/#testing).

[](#)

## Etapa 1: acessar o ativo

Um [token de acesso](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/) é uma string opaca que identifica um usuário, um app ou uma Página. Esse identificador pode ser usado pelo app para fazer chamadas da Graph API. É possível ver quando ele expira e por qual app ele foi gerado. As chamadas da API de Marketing em apps da Meta precisam incluir um token de acesso.

Obtenha um token de acesso com as permissões necessárias:

-   `ads_management`: faz alterações nas contas de anúncios selecionadas
    
-   `ads_read`: lê os dados de anúncios
    
-   `read_insights`: lê insights de desempenho
    

Use tokens de acesso ao sistema pois eles têm prazos de validade mais longos.

### Camada adicional de autorização

É necessário criar um app de empresa para acessar os pontos de extremidade da API de Marketing. Os apps de empresa estão sujeitos a uma camada adicional de autorização da Graph API chamada de níveis de acesso. Durante o processo de análise, seu app também deverá solicitar permissões e recursos específicos. Conclua a verificação da empresa se você pretende disponibilizar o app para usuários que não tenham função no app ou na empresa relacionada.

Se o app estiver gerenciando contas de anúncios de outras pessoas, você precisará de:

-   `ads_read` com acesso avançado
    

e/ou

-   `ads_management` com acesso avançado
    

[](#)

## Etapa 2: obter a conta de anúncios

Obtenha a(s) conta(s) de anúncios dos seus anunciantes e permita que eles selecionem uma para criação de anúncios.

Você pode ver todas as contas de anúncios às quais a empresa tem acesso por meio da API de Gerenciamento de Anúncios, que retorna todas as contas de anúncios de uma empresa. Observe que você precisará da permissão `business_management` no nível de app e usuário. Consulte as [APIs de Gerenciamento de Ativos de Negócios](https://developers.facebook.com/docs/marketing-api/business-asset-management).

#### Exemplo de chamada

```
v24.0
```

[](#)

## Etapa 3: criar uma campanha

A campanha é o nível mais alto da estrutura organizacional da conta de anúncios e deve representar um objetivo único para o anunciante. Estes objetos contêm seu objetivo de publicidade e um ou mais conjuntos de anúncios. Isso ajuda você a otimizar e a medir os resultados para cada objetivo de publicidade. Saiba mais sobre como criar, ler, atualizar e excluir uma campanha [aqui](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group).

#### Exemplo de chamada

```
v24.0
```

[](#)

## Etapa 4: definir o direcionamento

Para permitir que os anunciantes alcancem grupos específicos, especifique estes parâmetros nas suas solicitações de API:

-   Dados demográficos (idade, gênero, localização)
    
-   interesses
    
-   comportamentos
    

Com isso, seu anúncio alcançará clientes em potencial [que tenham maior probabilidade de se interessar](https://developers.facebook.com/docs/marketing-api/audiences/reference/basic-targeting/) pelos seus produtos ou serviços.

#### Exemplo de chamada

```
v24.0
```

[](#)

## Etapa 5: criar um conjunto de anúncios

Conjuntos de anúncios podem conter um ou mais anúncios. Os anúncios contidos em um conjunto devem ter o mesmo direcionamento, orçamento, a mesma cobrança, meta de otimização e duração.

Você pode definir o orçamento, a programação, o direcionamento, a estratégia de lance e as opções de posicionamento. Os conjuntos de anúncios permitem ajustar como e onde os anúncios são veiculados para segmentos de público específicos, otimizando o desempenho e alcançando objetivos de marketing.

Principais parâmetros:

-   Critérios para direcionamento de público
    
-   Orçamentos diários ou vitalícios
    
-   Opções de programação para controlar quando os anúncios serão exibidos
    

Veja mais detalhes [aqui](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign).

Você pode escolher um posicionamento manual que inclua anúncios do Instagram e do Facebook Reels ou usar os posicionamentos automáticos. Se você não especificar um determinado campo de posicionamento, todas as posições-padrão possíveis serão consideradas para esse campo.

#### Exemplo de chamada

```
v24.0
```

### Direcionamento de posicionamentos: posições disponíveis no Reels, objetivos compatíveis e objetivos de otimização

`publisher_platforms`

`facebook_position` ou `instagram position`

Objetivos compatíveis

`optimization_goal`

`instagram`

`reels`, `profile_reels`

`OUTCOME_APP_PROMOTION`

`LINK_CLICKS`

`OFFSITE_CONVERSIONS`

`APP_INSTALLS`

`instagram`

`reels`, `profile_reels`

`OUTCOME_AWARENESS`

`REACH`

`IMPRESSIONS`

`AD_RECALL_LIFT`

`THRUPLAY`

`instagram`

`reels`, `profile_reels`

`OUTCOME_LEADS`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`LINK_CLICKS`

`REACH`

`IMPRESSIONS`

`LEAD_GENERATION`

`QUALITY_LEAD`

`instagram`

`reels`, `profile_reels`

`OUTCOME_TRAFFIC`

`LINK_CLICKS`

`LANDING_PAGE_VIEWS`

`REACH`

`CONVERSATIONS`

`IMPRESSIONS`

`VISIT_INSTAGRAM_PROFILE`

`instagram`

`reels`, `profile_reels`

`OUTCOME_ENGAGEMENT`

`CONVERSATIONS`

`LINK_CLICKS`

`THRUPLAY`

`POST_ENGAGEMENT`

`REACH`

`IMPRESSIONS`

`REMINDERS_SET`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`instagram`

`reels`, `profile_reels`

`OUTCOME_SALES`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`LINK_CLICKS`

`REACH`

`IMPRESSIONS`

`CONVERSATIONS`

`facebook`

`facebook_reels`

`OUTCOME_APP_PROMOTION`

`LINK_CLICKS`

`OFFSITE_CONVERSIONS`

`APP_INSTALLS`

`facebook`

`facebook_reels`

`OUTCOME_AWARENESS`

`REACH`

`IMPRESSIONS`

`AD_RECALL_LIFT`

`THRUPLAY`

`TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

`facebook`

`facebook_reels`

`OUTCOME_LEADS`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`LINK_CLICKS`

`REACH`

`IMPRESSIONS`

`LEAD_GENERATION`

`QUALITY_LEAD`

`facebook`

`facebook_reels`

`OUTCOME_TRAFFIC`

`LINK_CLICKS`

`LANDING_PAGE_VIEWS`

`REACH`

`CONVERSATIONS`

`IMPRESSIONS`

`QUALITY_CALL`

`facebook`

`facebook_reels`

`OUTCOME_ENGAGEMENT`

`CONVERSATIONS`

`LINK_CLICKS`

`THRUPLAY`

`TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

`POST_ENGAGEMENT`

`REACH`

`IMPRESSIONS`

`EVENT_RESPONSES`

`QUALITY_CALL`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`PAGE_LIKES`

`facebook`

`facebook_reels`

`OUTCOME_SALES`

`OFFSITE_CONVERSIONS`

`LANDING_PAGE_VIEWS`

`LINK_CLICKS`

`REACH`

`IMPRESSIONS`

`CONVERSATIONS`

`QUALITY_CALL`

### Limitações

Combinação de objetivo compatível + `optimization_goal`

Qualificado para Reels do Facebook?

Qualificado para Reels do Instagram?

`OUTCOME_AWARENESS` + `TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

✅

❌

`OUTCOME_TRAFFIC` + `VISIT_INSTAGRAM_PROFILE`

❌

✅

`OUTCOME_TRAFFIC` + `QUALITY_CALL`

✅

❌

`OUTCOME_ENGAGEMENT` + `TWO_SECOND_CONTINUOUS_VIDEO_VIEWS`

✅

❌

`OUTCOME_ENGAGEMENT` + `EVENT_RESPONSES`

✅

❌

`OUTCOME_ENGAGEMENT` + `REMINDERS_SET`

❌

✅

`OUTCOME_ENGAGEMENT` + `QUALITY_CALL`

✅

❌

`OUTCOME_ENGAGEMENT` + `PAGE_LIKES`

✅

❌

`OUTCOME_SALES` + `QUALITY_CALL`

✅

❌

[](#)

## Etapa 6: selecionar o criativo

Os criativos são os componentes visuais e textuais do anúncio e são compatíveis com os seguintes formatos de anúncio:

-   Imagens
    
-   Vídeos
    
-   Carrosséis
    
-   Designs de anúncios personalizados
    

Automatize os elementos de design e otimize o desempenho usando nosso [processo criativo](https://developers.facebook.com/docs/marketing-api/reference/ad-creative).

### Reutilize um reel existente como criativo do anúncio

Os usuários podem fornecer um novo ativo ou reaproveitar um reel existente na sua conta do Instagram como criativo do anúncio.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=2965954720222121&version=1766997773)![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1220375362367167&version=1766997773)

Você pode criar anúncios a partir de Reels orgânicos existentes do Instagram ou do Facebook que sejam elegíveis para serem promovidos, desde que preencham estas condições:

-   Tenham menos de 90 segundos
    
-   Tenham uma taxa de proporção vertical em tela cheia (9:16)
    
-   Não tenham música com direitos autorais, GIFs, figurinhas interativas ou filtros de câmera de terceiros
    
-   Não tenham sido compartilhados no Facebook
    

Para reutilizar um reel orgânico do Instagram como criativo do anúncio em uma nova campanha de anúncios:

1.  Obtenha a identificação da conta comercial do Instagram, que precisa estar conectada a uma Página do Facebook
    
    -   `GET/{ad_account_id}/connected_instagram_accounts`**ou**
        
    -   `GET/{business_id}/instagram_business_accounts`
        
2.  Encontre o reel que deseja promover
    
    -   `GET/{ig-business-account-user-id}/media`
        
3.  Forneça o criativo do anúncio
    
    -   Em vez de indicar `instagram_actor_id` na especificação do criativo, defina `instagram_user_id` como a identificação do usuário do Instagram
        
    -   Especifique `source_instagram_media_id` como identificação de mídia
        
    -   Opcionalmente, atualize `call_to_action` para sua promoção
        

[Utilize o campo `boost_eligibility_info`](https://developers.facebook.com/docs/instagram/ads-api/guides/use-posts-as-ads/) como um modo conveniente de verificar se uma mídia pode ser turbinada como anúncio e `boost_ads_list` para acompanhar informações anteriores de anúncios turbinados.

#### Exemplo de chamada

```
v24.0
```

### Caixa de ferramentas criativas de IA generativa

Você pode [automatizar a geração de elementos de anúncios diversos e envolventes](https://developers.facebook.com/docs/marketing-api/creative/generative-ai-features/), como imagens, vídeos e texto. Essas ferramentas baseadas em IA ajudam a otimizar o desempenho dos anúncios, adaptando o conteúdo às preferências do público e aumentando a variedade dos criativos. A criação de anúncios resultará em maior engajamento e campanhas melhores.

[](#)

## Etapa 7: ver uma prévia do anúncio

[Veja uma prévia do anúncio](https://developers.facebook.com/docs/marketing-api/generatepreview/v21.0) nos formatos Facebook Reels e Instagram Reels tabulados abaixo usando:

-   A identificação do anúncio
    
-   A identificação do criativo do anúncio
    
-   A especificação do criativo do anúncio
    

PLATAFORMA DE PUBLICAÇÃO

Formato do anúncio

Facebook

`DESKTOP_FEED_STANDARD`, `FACEBOOK_STORY_MOBILE`, `INSTANT_ARTICLE_STANDARD`, `INSTREAM_VIDEO_DESKTOP`, `INSTREAM_VIDEO_MOBILE`, `MARKETPLACE_DESKTOP`, `MARKETPLACE_MOBILE`, `MOBILE_FEED_BASIC`, `MOBILE_FEED_STANDARD`, `RIGHT_COLUMN_STANDARD`, `SUGGESTED_VIDEO_DESKTOP`, `SUGGESTED_VIDEO_MOBILE`, `WATCH_FEED_MOBILE`, `FACEBOOK_REELS_BANNER`, `FACEBOOK_REELS_BANNER_DESKTOP`, `FACEBOOK_REELS_MOBILE`, `FACEBOOK_REELS_POSTLOOP`, `FACEBOOK_REELS_STICKER`, `FACEBOOK_STORY_STICKER_MOBILE`, `WATCH_FEED_HOME`

Instagram

`INSTAGRAM_STANDARD`, `INSTAGRAM_STORY`, `INSTAGRAM_EXPLORE_CONTEXTUAL`, `INSTAGRAM_EXPLORE_IMMERSIVE`, `INSTAGRAM_EXPLORE_GRID_HOME`, `INSTAGRAM_FEED_WEB`, `INSTAGRAM_FEED_WEB_M_SITE`, `INSTAGRAM_PROFILE_FEED`, `INSTAGRAM_REELS`, `INSTAGRAM_REELS_OVERLAY`, `INSTAGRAM_SEARCH_CHAIN`, `INSTAGRAM_SEARCH_GRID`, `INSTAGRAM_STORY_CAMERA_TRAY`, `INSTAGRAM_STORY_WEB`, `INSTAGRAM_STORY_WEB_M_SITE`

#### Exemplo de chamada

```
v24.0
```

[](#)

## Etapa 8: programar a veiculação dos anúncios

Para [reservar um anúncio](https://developers.facebook.com/docs/marketing-api/reference/adgroup) usando a API de Marketing, crie um objeto de grupo de anúncios e vincule seu objeto do conjunto de anúncios ao criativo do anúncio. Use `/act_{ad_account_id}/ads` para enviar seu objeto de anúncio e valide a resposta para confirmar que a reserva foi bem-sucedida. Essa etapa finaliza a configuração do seu anúncio, deixando-o pronto para veiculação com base nas configurações fornecidas.

#### Exemplo de chamada

```
v24.0
```

[](#)

## Etapa 9: analisar o desempenho

Use a [API de Insights](https://developers.facebook.com/docs/marketing-api/insights/) para obter métricas da conta de anúncios para anúncios:

-   `act_<AD_ACCOUNT_ID>/insights`
    
-   `<CAMPAIGN_ID>/insights`
    
-   `<ADSET_ID>/insights`
    
-   `<AD_ID>/insights`
    

Se você estiver veiculando uma campanha no Instagram e no Facebook, adicione `breakdowns=publisher_platform` para visualizar as estatísticas de posicionamento do Facebook e do Instagram separadamente, conforme o exemplo de chamada abaixo. Ao detalhar insights por nível de posicionamento, será possível ver o desempenho dos anúncios pelos posicionamentos dos Facebook e Instagram Reels.

#### Exemplo de chamada

```
v24.0
```

### Considerações importantes

#### Novos objetivos compatíveis com validação de objetivo de experiências com anúncios orientados para resultados (ODAX, na sigla em inglês)

-   `OUTCOME_APP_PROMOTION`
    
-   `OUTCOME_AWARENESS`
    
-   `OUTCOME_ENGAGEMENT`
    
-   `OUTCOME_LEADS`
    
-   `OUTCOME_SALES`
    
-   `OUTCOME_TRAFFIC`
    

### Limites de volume

A API de Marketing tem a própria [lógica de limitação de volume](https://developers.facebook.com/docs/marketing-apis/rate-limiting/) e está excluída de todos os limites de volume da Graph API. O recurso que afeta a cota de limitação de volume da API de Marketing é o Acesso Padrão ao Gerenciamento de Anúncios. Por padrão, você obtém **Acesso Padrão** quando adiciona o produto da API de Marketing ao seu Painel de Apps, que fornece acesso de desenvolvedor à API de Marketing. Para aumentar a cota de limitação de volume, atualize para **acesso avançado**.

### Noções básicas sobre criativos

Anúncios no Reels transformam a atenção em ação, turbinando resultados. Quando criados da maneira certa, são ainda mais eficazes.

**1\. Crie no formato 9:16 para deixar seu vídeo cativante:** Reels é um formato imersivo em tela cheia. Para ajudar seu criativo a se encaixar aqui, considere começar com um vídeo e redimensioná-lo para 9:16.

**2\. Crie nas zonas de segurança para que sua mensagem fique clara:** trabalhe dentro das zonas de segurança para que suas sobreposições de figurinha de texto, chamadas para ação ou mensagens principais não sejam obscurecidas pela interface do usuário do Reels. Mantenha 35% da parte inferior do criativo em 9:16 sem textos, logotipos e outros elementos importantes.

**3\. Utilize o som para deixar seu vídeo mais divertido:** áudio, seja música, sobreposição de voz ou efeitos sonoros, é um grande impulsionador de engajamento e entretenimento no Reels.

[](#)

## Mídia dinâmica com vídeo de produto do catálogo

Use o vídeo de produto do catálogo nos posicionamentos do Reels para melhorar seu catálogo e a experiência de anúncios. Com a mídia dinâmica, você pode veicular ativos de vídeo do seu catálogo juntamente com as imagens de produtos existentes nas suas campanhas de anúncios de catálogo Advantage+. A mídia dinâmica permite que você estenda seu alcance para o Instagram Reels e Facebook Reels. Além disso, consolida várias campanhas de vídeo em uma única campanha de anúncios dinâmicos. Você pode usar anúncios de mídia dinâmica em diferentes posicionamentos, mas nosso foco é usar anúncios de mídia dinâmica nos posicionamentos do Reels aqui.

Os anúncios de mídia dinâmica mostrarão imagens ou vídeos dos itens do seu catálogo com base no que cada pessoa que visualizar seu anúncio provavelmente achará interessante. A mídia dinâmica usa automação e classificação de produtos para fornecer não apenas os produtos mais relevantes, mas também os ativos com maior desempenho para públicos em todos os posicionamentos.

### Por que usar vídeos de produtos do catálogo?

Os vídeos de produtos do catálogo são aceitos em todos os verticais do catálogo, e os anúncios de mídia dinâmica estão abertos a todos os anunciantes. O vídeo de produtos do catálogo é uma boa opção para anunciantes que gostariam de melhorar as suas [campanhas de anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/get-started) com criativos de vídeo mais inspiradores.

### Requisitos

Para criar anúncios de mídia dinâmica que são veiculados no Reels, você precisará de um catálogo de produtos com produtos existentes e pelo menos um vídeo para cada item do produto em um formato URL de vídeo para download. Para obter mais informações, veja [Mídia dinâmica](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/dynamic-media/).

### Etapa 1: [configure](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/dynamic-media/#add-videos-to-your-catalog) o catálogo de vídeos de produtos do catálogo

-   Certifique-se de que pelo menos um vídeo por produto tenha uma taxa de proporção de 9:16 para ter o melhor desempenho no Reels
    
    -   Os anúncios de mídia dinâmica selecionarão automaticamente um vídeo 9:16 para os posicionamentos do Reels
        
    -   Se um vídeo 9:16 não estiver disponível, o primeiro vídeo será usado
        
    
-   Certifique-se de que os vídeos fornecidos para o seu catálogo estejam hospedados em URLs para download
    
-   O áudio é bem-vindo e pode ter um impacto positivo no seu anúncio, mas não é necessário
    
-   Você pode adicionar tags aos vídeos do seu catálogo para serem usadas `preferred_video_tags` no anúncio
    

### Etapa 2: crie uma campanha de anúncios compatível com posicionamentos do Reels e anúncios de catálogo Advantage+

-   [Criação de campanha do Reels](https://developers.facebook.com/docs/marketing-api/guides/instagramads/get-started/#campaign)
    
-   [Criação de campanha de anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/get-started#step-1--create-an-ad-campaign)
    
    -   Certifique-se de que o objetivo da sua campanha de anúncios seja `OUTCOME_SALES`, `LINK_CLICKS`, `APP_INSTALLS` ou `CONVERSIONS`
        
    

### Etapa 3: crie um conjunto de anúncios direcionando os posicionamentos do Reels com um conjunto de produtos

-   [Criação de conjunto de anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/get-started#adset)
    
-   [Criação de conjunto de anúncios de posicionamento do Reels](https://developers.facebook.com/docs/marketing-api/guides/instagramads/get-started/#adset)
    
-   Defina uma meta de otimização que se alinhe ao seu objetivo no nível da campanha e respeite as nossas [regras de validação](https://developers.facebook.com/docs/marketing-api/bidding/overview#opt-goal-validation)
    
-   Defina as opções adequadas de direcionamento, orçamento, evento de cobrança e programação
    
-   Certifique-se de que `publisher_platforms` esteja definido como `["instagram","facebook"]`, e que `facebook_positions` e `instagram_positions` estejam definidos como reels
    
-   Defina seu `product_set_id` desejado no `promoted_object` para seu conjunto de anúncios a fim de promover produtos a partir desse conjunto de produtos
    

### Etapa 4: [crie um anúncio de mídia dinâmica](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/dynamic-media/#create-ads-with-dynamic-media)

-   Certifique-se de que esteja criando um anúncio em carrossel ou um anúncio em formato de vídeo único. Anúncios de coleção com vídeos de produtos do catálogo ainda não são aceitos nos posicionamentos do Reels. Os anúncios em carrossel contêm uma série de produtos diferentes de um conjunto. O vídeo único mostrará um produto de cada vez do conjunto de produtos especificado
    
-   [Mais informações sobre vídeos de produtos de catálogo](https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/dynamic-media/faq)
    

[](#)