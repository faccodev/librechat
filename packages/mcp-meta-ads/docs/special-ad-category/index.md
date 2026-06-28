---
title: "Categoria de anúncio especial - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/special-ad-category/"
scraped_at: "2026-02-01T14:26:09.883Z"
---

# Categorias de anúncio especial

Como parte dos nossos esforços contínuos para promover a justiça na nossa plataforma de publicidade, a Meta apresentou uma nova categoria de anúncio especial: "Produtos e serviços financeiros". A partir de 14 de janeiro de 2025, o uso dessa categoria será obrigatório em campanhas de produtos e serviços financeiros para anunciantes sediados nos Estados Unidos ou que veiculam anúncios para públicos nos Estados Unidos. Caso não seja escolhida uma categoria adequada, o anúncio poderá ser rejeitado. Saiba mais sobre a atualização [aqui](https://www.facebook.com/business/help/510724041294968).

Para desenvolvedores de API

-   Em outubro de 2024, disponibilizamos uma nova entrada chamada `FINANCIAL_PRODUCTS_SERVICES` no campo de categorias de anúncios especiais. Essa entrada substituirá `CREDIT` a partir de 14 de janeiro de 2025.
    
-   As restrições de produto e público descritas neste documento para as entradas de categorias de anúncios especiais `HOUSING` e `EMPLOYMENT` também serão aplicadas à nova entrada `FINANCIAL_PRODUCTS_SERVICES`.
    
-   A partir de 14 de janeiro de 2025, o uso da designação de categoria de anúncios especiais será obrigatório em campanhas de produtos e serviços financeiros para anunciantes localizados nos Estados Unidos ou com direcionamento para públicos nos Estados Unidos. Os anúncios poderão ser rejeitados se o anunciante não escolher uma categoria de anúncio especial adequada.
    
-   **Nota:** nossa política de anúncios de crédito (um subconjunto de produtos e serviços financeiros) não será alterada e continuará sendo aplicada a anunciantes sediados nos Estados Unidos ou que veiculem anúncios a públicos nos Estados Unidos, Canadá ou determinadas partes da Europa.
    

Todas as empresas que usam a API de Marketing precisam identificar se as campanhas novas e editadas pertencem ou não a uma categoria de anúncio especial. Estas são as categoriais disponíveis atualmente: [**moradia**, **emprego**, **produtos e serviços financeiros**](#context) ou [**temas sociais, eleições e política**](#issues-elections-politics).

### Limitações

-   As empresas com anúncios que não pertencem a uma categoria de anúncio especial devem indicar `NONE` ou enviar uma matriz vazia no campo `special_ad_categories`.
    
-   Ao selecionar qualquer uma das `special_ad_categories`, também é necessário definir um `special_ad_category_country`.
    
-   As empresas que veiculam anúncios de **moradia**, **emprego** ou **produtos e serviços financeiros** devem cumprir as [restrições de público](#hec-restrictions). As opções de público para anúncios sobre temas sociais, eleições ou política não são afetadas pelo rótulo `special_ad_categories`.
    

## Ofertas de campanha de anúncios

Todos os anunciantes precisam especificar as categorias de anúncios especiais ao criar campanhas. O campo de categoria de anúncio especial pode conter pelo menos um dos itens indicados a seguir:

-   `HOUSING`
    
-   `FINANCIAL_PRODUCTS_SERVICES`
    
-   `EMPLOYMENT`
    
-   `ISSUES_ELECTIONS_POLITICS`
    
-   `NONE`
    

Mesmo que a campanha não inclua anúncios sobre moradia, emprego, produtos e serviços financeiros ou temas sociais, eleições e política, os anunciantes ainda precisarão especificar uma categoria ao selecionar `NONE` ou enviar uma matriz vazia.

Ao selecionar moradia, emprego ou produtos e serviços financeiros, as opções de direcionamento disponíveis para os anúncios dessas campanhas serão restritas.

Ao selecionar temas sociais, eleições ou política, será necessário selecionar o país no qual você quer veicular os anúncios. É necessário ter uma autorização para veicular esses anúncios no país especificado.

**O campo `special_ad_categories` é obrigatório em todas as campanhas criadas.** Se a campanha não precisar de uma categoria de anúncio especial, você poderá enviar uma matriz vazia ou usar o valor `NONE`.

#### Exemplo de solicitação

```
v24.0
```

Saiba mais sobre [Categorias de anúncio especial: Central de Ajuda de Anúncios](https://www.facebook.com/business/help/298000447747885?helpref=faq_content).

Para criar uma campanha com várias categorias:

```
v24.0
```

### Transição de campanhas atuais

Em todas as campanha atuais, o valor padrão `NONE` é atribuído ao campo `special_ad_category`. Se você veicular anúncios em uma categoria de anúncio especial, será necessário fazer a atualização a seguir:

1.  Crie a campanha novamente e especifique o campo `special_ad_category`. Consulte [Criar uma nova campanha](#create-campaign) para ver mais informações.
    
2.  Atualize as configurações de público e altere o campo `special_ad_category`:
    

-   É preciso atualizar as configurações de público para cumprir as restrições da [categoria de anúncio especial](#targeting). Para fazer isso manualmente, use nossos [pontos de extremidade habituais de direcionamento](/docs/marketing-api/buying-api/targeting). Você também pode especificar o `tune_for_category` no nível do conjunto de anúncios. Com o `tune_for_category`, a conformidade com as novas restrições ocorre de forma imediata:
    

```
v24.0
```

-   Após a atualização do direcionamento, solicite uma alteração na `special_ad_category` com uma solicitação `POST` para `/<AD_CAMPAIGN_ID>`. Inclua suas informações de categoria:
    

```
v24.0
```

#### Ajustar para a categoria

Ao usar `tune_for_category`, este será o resultado da campanha e conjuntos de anúncios:

#### Para públicos

Recursos compatíveis

Recursos removidos

-   Inclusão de público personalizado
    
-   Exclusão de público personalizado
    

-   Públicos salvos
    
-   Públicos semelhantes
    

-   Idade personalizada: em geral, as opções são fixas para incluir as faixas etárias de 18 até mais de 65 anos para anúncios de moradia, emprego, bem como produtos e serviços financeiros. Porém, os anunciantes que veiculam anúncios de oportunidades de crédito na Europa (usando a categoria de produtos e serviços financeiros) podem selecionar uma faixa etária diferente para atender aos requisitos locais e do setor relacionados a essa categoria de anúncio especial.
    
-   Raio de localização: altera o raio de localização para o mínimo exigido, dependendo da especificação de direcionamento.
    
-   Seleção de gênero: altera para todos os gêneros.
    

-   Seleção de direcionamento detalhado:  
    Inclusões de alguns interesses e seleção de localização
    
-   Exclusão de localização
    
-   Exclusão de direcionamento detalhado
    
-   Expansão de direcionamento detalhado
    
-   Exclusão de interesses
    
-   Inclusões de alguns interesses
    
-   Seleção de localização
    

### Criar uma nova campanha

Para criar uma [Campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group) com uma `special_ad_category`, siga o [fluxo padrão de criação de campanhas](/docs/marketing-api/buying-api#campaign) e adicione a `special_ad_category`. Veja um exemplo:

```
v24.0
```

Para criar uma campanha com `NONE` como `special_ad_category`:

```
v24.0
```
```
Consulte a [referência da campanha](/docs/marketing-api/reference/ad-campaign-group) para mais informações.
```

[](#)

## Temas sociais, eleições e política

**Proibição de anúncios sobre temas sociais, eleições ou política na União Europeia devido ao novo regulamento**

Em resposta ao regulamento de Transparência e Direcionamento dos Anúncios Políticos (TTPA) da União Europeia, a partir de 6 de outubro de 2025, anúncios sobre temas sociais, eleições e política não poderão mais ser veiculados na UE e em territórios associados. [Saiba mais sobre essas atualizações.](https://l.facebook.com/l.php?u=https%3A%2F%2Fabout.fb.com%2Fnews%2F2025%2F07%2Fending-political-electoral-and-social-issue-advertising-in-the-eu%2F&h=AT1E_kRDqy2dSdckOZ1M66mXHmnvtigJNZWFgwocSChHold48G1cRqYwVWohelwv_7WMoZb3feU2THqBn1RdOh-132_hP4zdGACazOa6lxI55z4cv4YUym6ez3hmjbkuhy6Ut-pZFbu9-93oBu1DqR-OxlEH4Y0LwJmJrnkO5psmqcE8ndBPESXV)

Os anunciantes que veiculam anúncios sobre temas sociais, eleições e política devem especificar `special_ad_categories` ao criar uma campanha. Além disso, é necessário definir o sinalizador `authorization_category` no nível do criativo do anúncio como `POLITICAL` em anúncios sobre política e, a partir de 9 de janeiro de 2024, como `POLITICAL_WITH_DIGITALLY_CREATED_MEDIA` em anúncios com mídia criada ou alterada digitalmente.

Você pode criar campanhas inteiras com anúncios sobre temas sociais, eleições e política, em vez de anúncios individuais que mostram esse tipo de conteúdo. Não é mais possível misturar em uma mesma campanha anúncios sobre temas sociais, eleições e política com anúncios não relacionados a esses tópicos. Além disso, não é mais permitido marcar anúncios individuais como sendo de temas sociais, eleições e política.

Para criar uma campanha sobre temas sociais, eleições ou política, envie `ISSUES_ELECTIONS_POLITICS` no campo `special_ad_categories`. Os anunciantes podem combinar essa categoria com outras ao enviar diversos valores no campo.

Ao selecionar qualquer uma das `special_ad_categories`, também é necessário definir um `special_ad_category_country`. Esse é o país no qual você quer veicular anúncios sobre temas sociais, eleições ou política. O campo `special_ads_category_country`:

-   deve ser uma matriz de códigos de países ISO Alpha 2;
    
-   precisa ser um país no qual o usuário e a Página tenham autorização.
    

Veja os requisitos para veicular campanhas sobre temas sociais, eleições ou política:

-   Os anunciantes precisam ter autorização no país no qual querem veicular anúncios.
    
-   A conta de anúncios precisa estar qualificada para veicular anúncios sobre temas sociais, eleições ou política nesta Página.
    

Para criar uma campanha sobre temas sociais, eleições ou política:

```
v24.0
```

[](#)

## Moradia, emprego e produtos e serviços financeiros

Os anunciantes que veiculam anúncios sobre moradia, emprego e produtos e serviços financeiros devem especificar `special_ad_categories` ao criar uma campanha. Ao selecionar `special_ad_categories`, também é necessário definir um `special_ad_category_country`. O `special_ad_category_country` para anúncios de moradia, emprego e produtos e serviços financeiros:

-   será definido por padrão como seu país fiscal, se nenhum valor for inserido;
    
-   não precisa ser um país no qual o usuário e a página tenham autorização.
    

**Empresas fora dos Estados Unidos e que alcançam públicos fora dos Estados Unidos, do Canadá e da Europa**, onde essas restrições se aplicam atualmente, também precisam enviar o campo categoria de anúncio especial, mas podem optar por ativar ou desativar as restrições de público. Independentemente de a campanha oferecer oportunidades de moradia, emprego ou produtos e serviços financeiros, essas empresas podem optar pela desativação ao incluir `NONE` no campo categoria de anúncio especial ou pela ativação da categoria de anúncio especial ao indicar que o anúncio é uma oferta de oportunidade de moradia, emprego ou produtos e serviços financeiros.

Saiba mais sobre [conformidade](https://developers.facebook.com/blog/post/2020/01/06/marketing-api-advertisers-must-comply-special-ad-category-march-31/) e [aplicação](#enforcement).

#### Categorias de anúncios especiais para anúncios de produtos e serviços financeiros, emprego e moradia na Europa

Caso queira fazer o alcance para a Europa e veicular anúncios relacionados a oportunidades de produtos e serviços financeiros, emprego e moradia, você precisará declarar as categorias de anúncio especial relevantes. Os anúncios pertencentes às categorias de anúncio especial têm um [conjunto menor de categorias de público disponíveis](/docs/marketing-api/audiences/special-ad-category/#targeting).

### Alterações de nível do anúncio e conjunto de anúncios

Os anunciantes com sede nos Estados Unidos que veiculam anúncios de moradia, emprego e produtos e serviços financeiros ou com alcance para os Estados Unidos, o Canadá ou a Europa têm as seguintes limitações em relação a níveis do conjunto de anúncios e anúncio:

-   Os [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management) que usam [catálogos de classificados de imóveis](/docs/marketing-api/real-estate-ads) precisam cumprir as [restrições da categoria de anúncio especial](#targeting). Ao criar uma campanha, esses anunciantes devem especificar `HOUSING` em `special_ad_category`.
    

### Alterações no público

Os anunciantes com sede nos Estados Unidos que oferecem oportunidades de moradia, emprego e produtos e serviços financeiros ou com alcance para os Estados Unidos, o Canadá ou a Europa poderão escolher a partir de um conjunto limitado de opções de público. Por exemplo, não estão disponíveis as opções de público que descrevem ou parecem estar relacionadas a classes protegidas, que podem incluir dados demográficos, comportamentos ou interesses.

Estas são as restrições:

#### Faixa etária

Em geral, as opções são fixas para incluir as faixas etárias de 18 até mais de 65 anos para anúncios de moradia, emprego, bem como produtos e serviços financeiros. Porém, os anunciantes que veiculam anúncios de oportunidades de crédito na Europa (usando a categoria de produtos e serviços financeiros) podem selecionar uma faixa etária diferente para atender aos requisitos locais e do setor relacionados a essa categoria de anúncio especial.

#### Gênero

Não é possível fazer o direcionamento por gênero. Você tem duas opções:

1.  **Recomendado**: não especifique os parâmetros `genders`.
2.  Defina os gêneros usando os valores padrão: o padrão de `genders` é todos os gêneros.

#### Localização

-   A exclusão de localização não é compatível.
    
-   A seleção de localização precisa incluir todas as áreas com raio igual a ou maior que 15 milhas ou 25 quilômetros para EUA e Canadá e com raio de 15 quilômetros para Europa de qualquer cidade, endereço ou marcador indicado.
    
-   As seguintes categorias de localização não são compatíveis:
    
    -   `subcity`
        
    -   `neighborhood`
        
    -   `metro_area`
        
    -   `small_geo_area`
        
    -   `subneighborhood`
        
    -   `electoral_district`
        
    -   `zips`
        
    

#### Direcionamento detalhado

-   As opções de direcionamento por interesse descritas a seguir não são permitidas:
    
    -   Direcionamento por dados demográficos e comportamento
        
    -   Exclusão de interesses
        
    -   Exclusão de direcionamento detalhado
        
    
-   Os interesses de direcionamento aceitos devem constar em uma lista pré-aprovada. Você poderá pesquisar essa lista no futuro com nossa [Pesquisa de direcionamento](/docs/marketing-api/targeting-search).
    
-   A [expansão de interesses](/docs/marketing-api/targeting-specs/#expansion_9) está desabilitada.
    

#### Públicos semelhantes

Os públicos semelhantes não estão disponíveis para anúncios de moradia, emprego e produtos e serviços financeiros.

##### Qualificação

É possível verificar se um público personalizado da lista de clientes está qualificado para uso em uma campanha de categoria de anúncio especial com o `is_eligible_for_sac_campaigns` combinado aos parâmetros `special_ad_categories` e `special_ad_category_countries`.

**Exemplo de solicitação**

```
v24.0
```

**Exemplo de resposta**

```
{ “id”: “23850663569120499” “is_eligible_for_sac_campaigns”: false, “__fb_trace_id__”: “B6T80EdcZGN”, “__www_request_id__”: “AcjtQwFivFWy3cTMMlr-DJ3” {
```

### Marcos

Desde **4 de dezembro de 2019**, as empresas localizadas nos EUA ou com alcance para usuários nesse país devem identificar as campanhas **novas e editadas** que oferecem oportunidades de moradia, emprego ou crédito para que os anúncios relacionados possam ser veiculados. Desde essa data, as empresas localizadas nos EUA ou com alcance para usuários desse país devem especificar uma `special_ad_category` em campanhas **novas e editadas**, além de usar os critérios de público limitado disponíveis. Isso se aplica a todas as plataformas de compra de anúncios, incluindo a API de Marketing.

O marco de **anúncios ativos** que oferecem oportunidades de moradia, emprego ou crédito ocorreu em **11 de fevereiro de 2020**.

Desde **31 de março de 2020**, **todos os anúncios novos e editados** que usam a API de Marketing, **incluindo todas as empresas que não oferecem oportunidades de moradia, emprego ou crédito**, devem especificar `NONE` em `special_ad_category`.

A partir de **3 dezembro de 2020**, os anunciantes com alcance no Canadá e que veicularem anúncios relacionados a oportunidades de crédito, emprego ou moradia precisarão declarar as categorias de anúncio especial relevantes.

A partir de **7 de dezembro de 2021**, os anunciantes com alcance na Europa e que veicularem anúncios relacionados a oportunidades de crédito, emprego ou moradia precisarão declarar as categorias de anúncio especial relevantes.

A partir de **21 de janeiro de 2025**, o uso da designação de categoria de anúncios especiais será obrigatório em campanhas de produtos e serviços financeiros para anunciantes localizados nos Estados Unidos ou com direcionamento para públicos nos Estados Unidos. Os anúncios poderão ser rejeitados se o anunciante não escolher uma categoria de anúncio especial adequada. Nossa política de anúncios de crédito (um subconjunto de produtos e serviços financeiros) não será alterada e continuará sendo aplicada a anunciantes sediados nos EUA ou que veiculam anúncios a públicos nos EUA, Canadá ou determinadas partes da Europa.

[](#)

## Solução de problemas

Se a [campanha, conjunto de anúncios ou anúncio não puder ser veiculada por qualquer motivo, é possível defini-la como `WITH_ISSUES`](/ads/blog/post/2018/11/27/with-issues-status-blog/). Ao ler um objeto, você pode analisar `WITH_ISSUES` para solucionar problemas.

Fazer uma chamada para um objeto com `"effective_status": "WITH_ISSUES"` retorna um campo denominado `issues_info`, que mostra informações relacionadas aos problemas encontrados. Ao trabalhar com a categoria de anúncio especial, talvez você encontre os seguintes problemas:

error\_code

error\_message

error\_summary

`2859024`

Certificação exigida

Um administrador da empresa precisa ler e aceitar nossa política de não discriminação para que você possa veicular anúncios. Para fazer isso, é preciso acessar Configurações da empresa e, depois, Usuários do sistema. Link da Central de Ajuda: [https://www.facebook.com/business/help/338925176776440](https://www.facebook.com/business/help/338925176776440)

`2909035`

A seleção de idade personalizada não está disponível

A seleção de idade personalizada não está disponível ao veicular anúncios nesta categoria de anúncio especial. É preciso selecionar a faixa etária de 18 a 65 anos para seu público.

`2909035`

Os públicos salvos não estão disponíveis

O uso de públicos salvos não está disponível ao veicular anúncios nesta categoria de anúncio especial. É necessário remover todos os públicos salvos selecionados.

`2909035`

Os públicos semelhantes não estão disponíveis

O uso de públicos semelhantes não está disponível ao veicular anúncios nesta categoria de anúncio especial. É necessário remover todos os públicos semelhantes selecionados.

`2909035`

A seleção de raio da localização não está disponível

O raio de localização selecionado não está disponível ao veicular anúncios nesta categoria de anúncio especial. É necessário incluir um raio de pelo menos 15 milhas (ou 25 quilômetros) de qualquer cidade, endereço ou marcador selecionados.

`2909035`

A seleção de direcionamento detalhado não está disponível

Algumas das opções de direcionamento detalhado selecionadas não estão disponíveis ao veicular anúncios nesta categoria de anúncio especial. Remova-as do seu público.

`2909035`

A exclusão de localização não está disponível

A exclusão de localizações específicas não está disponível ao veicular anúncios nesta categoria de anúncio especial. Remova todas as exclusões de localização.

`2909035`

A seleção de gênero personalizada não está disponível

A seleção personalizada de gênero não está disponível ao veicular anúncios nesta categoria de anúncio especial. Seu público deve incluir todos os gêneros.

`2909035`

A seleção de localização não está disponível

Algumas das seleções de localização não estão disponíveis ao veicular anúncios nesta categoria de anúncio especial. Atualize suas localizações para incluir um raio de pelo menos 15 milhas (ou 25 quilômetros) de qualquer cidade, endereço ou marcador selecionados.

`2909035`

A exclusão de direcionamento detalhado não está disponível

A exclusão de comportamentos, dados demográficos ou interesses não está disponível ao veicular anúncios nesta categoria de anúncio especial. Remova todas as exclusões de direcionamento detalhado.

`2909035`

A expansão de direcionamento não está disponível

O uso da expansão de direcionamento não está disponível ao veicular anúncios nesta categoria de anúncio especial. Para resolver o problema e concluir a criação da campanha, remova a seleção de expansão de direcionamento.

`2909035`

A seleção de interesse não está disponível

Algumas das opções de direcionamento detalhado selecionadas não estão disponíveis ao veicular anúncios nesta categoria de anúncio especial. Remova-as do seu público.

`2909035`

Não é possível usar multiplicadores de lances

Não é possível usar multiplicadores de lances em uma categoria de anúncio especial.

`2909035`

A exclusão de alguns públicos não está disponível

A exclusão de públicos semelhantes não está disponível ao veicular anúncios nesta categoria de anúncio especial. Remova todas as exclusões de públicos semelhantes.

Se precisar de ajuda com a leitura de avisos e erros, consulte nosso [post de blog do desenvolvedor sobre o assunto](https://developers.facebook.com/ads/blog/post/2018/11/27/with-issues-status-blog/).

[](#)

## Aplicação

Além de exigir que os anunciantes identifiquem a categoria da própria campanha, continuamos trabalhando com análise humana e aprendizado de máquina para identificar esses tipos de anúncio. Caso você envie uma `special_ad_category` incorreta, seus anúncios poderão ser pausados até que a campanha seja ajustada.

Ao selecionar `HOUSING`, `EMPLOYMENT` ou `FINANCIAL_PRODUCTS_SERVICES` como `special_ad_category`, todas as restrições de público serão aplicadas com um erro grave.

[](#)

## Contexto

A Meta tem o compromisso de proteger as pessoas contra discriminação, e temos melhorado nossa capacidade de detectar e impedir possíveis abusos. Consideramos uma violação das [nossas políticas](https://www.facebook.com/policies/ads/prohibited_content/discriminatory_practices) a discriminação ao alcançar injustamente ou excluir grupos específicos de pessoas.

Como parte de um [acordo de reparação histórica](https://www.facebook.com/business/news/helping-prevent-discrimination-in-ads-that-offer-housing-employment-or-credit-opportunities), fizemos alterações na forma como gerenciamos anúncios de moradia, emprego e crédito. As categorias de anúncio especial foram criadas para apoiar esse compromisso.

[](#)

## Veja também

-   [Como escolher uma categoria de anúncio especial: Central de Ajuda de Anúncios](https://www.facebook.com/business/help/298000447747885?helpref=faq_content)
    
-   [Sobre públicos para categorias de anúncio especial: Central de Ajuda de Anúncios](https://www.facebook.com/business/help/2220749868045706)
    
-   Notícias para desenvolvedores: [como solucionar problemas relacionados à veiculação de anúncios com o status WITH\_ISSUES](https://developers.facebook.com/ads/blog/post/2018/11/27/with-issues-status-blog/)
    
-   [Documentação sobre direcionamento](/docs/marketing-api/buying-api/targeting)
    
-   [Posicionamento e direcionamento avançados](/docs/marketing-api/targeting-specs/)
    
-   [Pesquisa de direcionamento](/docs/marketing-api/targeting-search)
    
-   [Políticas de Publicidade do Facebook](https://www.facebook.com/policies/ads)
    
-   Newsroom: [segunda atualização sobre nossa auditoria de direitos civis](https://l.facebook.com/l.php?u=https%3A%2F%2Fnewsroom.fb.com%2Fnews%2F2019%2F06%2Fsecond-update-civil-rights-audit%2F&h=AT3s8_wG28pDcL4FXKW8THmRB5eJwPetpoJblscmVD0oDGJwJQ_Mb8eeL4kehm-5zJc90vMVbE_rbrj3cNSjenI6kau0WoNasD7NAARb5cMzfiS5KWOTPm2WihPBlh9x4Tx5jWQeAOryPYfLmJ_GAHTDZJQn4etyhNr8pQzfHnI)
    

[](#)