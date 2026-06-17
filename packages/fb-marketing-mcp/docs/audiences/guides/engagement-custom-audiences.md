---
title: "Públicos personalizados de engajamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/guides/engagement-custom-audiences"
scraped_at: "2026-02-01T13:57:53.402Z"
---

# Públicos personalizados de engajamento

Crie públicos personalizados com base nas pessoas que engajaram com seu conteúdo no Facebook ou no Instagram. No momento, os tipos de público compatíveis incluem as seguintes opções: Página, perfil comercial do Instagram, anúncios de cadastro, anúncios de experiência instantânea, compras e realidade aumentada.

Este guia usa como exemplo os públicos de engajamento com a Página para descrever a API. O Facebook atualiza seu público personalizado de acordo com o engajamento com a Página adicionando de maneira contínua as pessoas que interagem com ela. Na primeira vez que criar esse público, o Facebook o preenche automaticamente com uma lista de pessoas que já engajaram com a Página em determinado período de retenção.

-   Desde setembro de 2018, não aceitamos `subtype` de públicos personalizados de sites, de apps e de engajamento nem públicos de dados de conversão offline. A exceção é a compatibilidade de `subtype` com os públicos personalizados de engajamento para vídeos.
    
-   Se estiver criando públicos ou fazendo o direcionamento de pessoas na Europa, veja a [alteração sem controle de versão de 2 de dezembro de 2020](/docs/graph-api/changelog/non-versioned-changes/dec-2-2020).
    

## Criar um público

Para criar um público personalizado de engajamento, sua conta de anúncios deve aceitar os [Termos de Serviço dos Públicos Personalizados](https://www.facebook.com/ads/manage/customaudiences/tos.php) no [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage).

Para criar um público com a lista de pessoas que interagiram com a Página com base no evento `page_engaged`:

```
v24.0
```

### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
O nome do público personalizado.

`rule`

objeto JSON

**Obrigatório.**  
As regras para definir o público. Segue a mesma sintaxe que um [público personalizado do site](/docs/marketing-api/audiences-api/websites).

Os públicos personalizados de engajamento são tipos de públicos personalizados. Para ver todos os campos disponíveis, consulte a [Custom Audience](/docs/marketing-api/reference/custom-audience).

**Observação:** cada conta de anúncios pode criar, no máximo, 500 públicos personalizados de engajamento.

[](#)

## Regras de engajamento

Por meio das [regras do público](/docs/marketing-api/audiences/overview/audience-rules), é possível determinar se o Facebook adicionará ou não alguém ao público personalizado.

Especifique os campos `type` e `id` em `event_sources` na regra para indicar o `type` e o `id` do objeto de engajamento. O campo `id` usa um ID único de objeto ou uma matriz de IDs do mesmo tipo.

Confira a seguir as origens de evento compatíveis e os IDs de objetos de engajamento correspondentes.

-   `page`: identificação da Página do Facebook.
    
-   `lead`: ID do formulário de cadastro.
    
-   `ig_lead_generation`: ID do formulário de cadastro.
    
-   `canvas`: ID do Canvas.
    
-   `ig_business`: identificação do perfil comercial do Instagram.
    
-   `shopping_page`: identificação da Página da Loja do Facebook.
    
-   `shopping_ig`: identificação da Loja do Instagram.
    
-   `ar_experience`: uma experiência instantânea com efeito de AR.
    
-   `ar_effects`: um efeito do Facebook ou do Instagram da sua propriedade. Isso não inclui efeitos usados em anúncios.
    

Cada regra consiste em um `object_id` e um `event_name`.

#### Páginas

Defina `object_id` como a identificação da Página. Em `event_name`, use um dos eventos de engajamento a seguir.

-   `page_engaged`: pessoas que visitaram sua Página ou interagiram com conteúdo ou anúncio relacionado no Facebook/Messenger. Esse é o tipo de engajamento mais inclusivo e abrange todos os outros.
    
-   `page_visited`: pessoas que visitaram sua Página.
    
-   `page_liked`: pessoas que curtem sua Página. [Veja detalhes sobre retenção e regras relacionadas a curtidas na Página.](#page-likes-retention-and-rules)
    
-   `page_messaged`: pessoas que enviaram uma mensagem à sua Página.
    
-   `page_cta_clicked`: pessoas que clicaram em algum botão de chamada para ação na sua Página (por exemplo, "Fale conosco" ou "Comprar agora").
    
-   `page_or_post_save`: pessoas que salvaram sua Página ou alguma publicação dela.
    
-   `page_post_interaction`: pessoas que interagiram com alguma publicação da sua Página. Entre as interações, estão reações (Curtir, Amei, Haha, Uau, Triste, Grr), compartilhamentos, comentários, cliques no link ou ações de deslizar pelo carrossel.
    

#### Anúncios de cadastro

Defina `object_id` como `FORM_ID` e configure `rule` para rastrear um dos eventos de anúncio de cadastro a seguir.

-   `lead_generation_submitted`: todos os usuários que preencheram e enviaram o formulário.
    
-   `lead_generation_dropoff`: todas as pessoas que fecharam o formulário sem enviá-lo. Elas podem ter preenchido algum dos campos ou não.
    
-   `lead_generation_opened`: todas as pessoas que abriram o formulário de geração de cadastro, independentemente de o envio ter sido realizado ou não.
    

#### Experiências instantâneas

Defina `object_id` como `"CANVAS_ID"`. A `rule` deve rastrear um dos eventos a seguir:

-   `instant_shopping_document_open`
    
-   `instant_shopping_document_pause`
    
-   `instant_shopping_document_resume`
    
-   `instant_shopping_document_close`
    
-   `instant_shopping_did_scroll`
    
-   `instant_shopping_element_click`
    
-   `instant_shopping_element_impression`
    

#### Perfil comercial do Instagram

O `object_id` deve ser `"INSTAGRAM_BUSINESS_PROFILE_ID"`, e `rule` precisa rastrear um destes eventos de perfil comercial do Instagram:

-   `ig_business_profile_all`: pessoas que visitaram seu perfil comercial do Instagram ou interagiram com algum conteúdo ou anúncio relacionado. Esse é o tipo de engajamento mais inclusivo e abrange todos os outros. É uma combinação de `ig_business_profile_engaged`, `ig_user_messaged_business` e `ig_user_messaged_business`.
    
-   `ig_business_profile_engaged`: pessoas que interagiram com seu perfil comercial do Instagram ou com algum conteúdo ou anúncio relacionado.
    
-   `ig_user_messaged_business`: pessoas que enviaram mensagens ao seu perfil comercial do Instagram.
    
-   `ig_business_profile_visit`: pessoas que visitaram seu perfil comercial do Instagram.
    
-   `ig_business_profile_ad_saved`: pessoas que salvaram conteúdo orgânico ou anúncios do seu perfil comercial do Instagram.
    
-   `ig_ad_like`
    
-   `ig_ad_comment`
    
-   `ig_ad_share`
    
-   `ig_ad_save`
    
-   `ig_ad_cta_click`
    
-   `ig_ad_carousel_swipe`
    
-   `ig_organic_like`
    
-   `ig_organic_comment`
    
-   `ig_organic_share`
    
-   `ig_organic_save`
    
-   `ig_organic_swipe`
    
-   `ig_organic_carousel_swipe`
    

Atualmente, o tipo "Criador de conteúdo de mídia do Instagram" não é compatível com a criação de públicos personalizados de engajamento com o vídeo.

#### Compras

Uma regra de engajamento de compras deve rastrear um dos eventos a seguir.

-   `VIEW_CONTENT`: pessoas que visualizaram sua página de detalhes do produto. Essa opção está disponível mundialmente.
    
-   `ADD_TO_CART`: pessoas que adicionaram seu produto ao carrinho de compras. Essa opção está disponível apenas a empresas que habilitaram a finalização da compra e a consumidores nos Estados Unidos.
    
-   `PURCHASE`: pessoas que compraram seus produtos. Essa opção está disponível apenas a empresas que habilitaram a finalização da compra e a consumidores nos Estados Unidos.
    

Para criar uma regra que adicione pessoas que visualizaram seu produto:

```
v24.0
```

Devido a novas regras de privacidade, os parâmetros `page_messaged` e `ig_user_messaged_business` podem não estar disponíveis na Europa.

#### Realidade aumentada

Os públicos personalizados de engajamento com realidade aumentada podem conter duas partes: experiência de AR e efeito de AR.

-   Para um público personalizado de engajamento com experiência de AR, defina o `object_id` como o ID do contêiner de dados de anúncios de AR. No `event_name`, use `ar_camera_open` ou `camera_cta_click`.
    
-   Para um público personalizado de engajamento com efeito de AR, defina o `object_id` como a identificação do efeito de AR e use `ar_effect_open` no campo `event_name`.
    

### Máximo de dias de retenção

Conforme requisitos legais e de privacidade, permitimos diferentes quantidades máximas de dias de retenção para cada tipo de origem de evento.

-   Anúncios de geração de cadastros: 90 dias.
    
-   Perfil comercial do Instagram: 730 dias.
    
-   Página: 730 dias.
    
    -   **Nota**: [não há retenção para o público de curtidas na Página.](#page-likes-retention-and-rules)
        
    
-   Experiências instantâneas (antigo Canvas): 730 dias.
    
-   Compras: 365 dias. Os dados estão disponíveis desde abril de 2020.
    
-   Realidade aumentada: 365 dias.
    

### Regras de engajamento com seção de exclusão

As regras de público de engajamento são compatíveis com as de público personalizado do site. Por isso, pode haver várias regras de inclusão e de exclusão. Os usuários que corresponderem a pelo menos uma das regras serão adicionados ao público.

No exemplo a seguir, veja como criar um público que inclui usuários que visitaram sua página ou interagiram com ela, mas exclui pessoas que clicaram na chamada para ação:

```
v24.0
```

Para mais informações, consulte [Públicos Personalizados do seu site](https://developers.facebook.com/docs/marketing-api/audiences-api/websites).

### Várias regras

Os públicos de engajamento podem ter várias regras, e os usuários que corresponderem a **pelo menos uma** delas serão adicionados ao público. No exemplo, veja como criar um público com usuários que enviaram uma mensagem à sua página ou clicaram na chamada para ação:

```
v24.0
```

### Várias páginas

As regras não se limitam a uma página única. É possível ter uma página para cada regra. As pessoas que interagirem com no mínimo uma delas serão incluídas no público.

Veja um exemplo de público que inclui todas as pessoas que visitaram pelo menos uma de três páginas no total:

```
v24.0
```

Para obter detalhes sobre Públicos Personalizados, consulte a [referência Público Personalizado](/docs/marketing-api/reference/custom-audience).

### Retenção e regras de curtidas na Página

Não há retenção para o público de curtidas na Página (`retention_seconds=0`). Além disso, as regras de curtidas não podem ser combinadas com outros eventos da Página.

Veja um exemplo de criação de público de curtidas na Página:

```
v24.0
```

[](#)