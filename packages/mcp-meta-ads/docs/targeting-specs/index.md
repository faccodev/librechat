---
title: "Direcionamento avançado - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/targeting-specs/"
scraped_at: "2026-02-01T14:11:41.243Z"
---

# Direcionamento avançado

O direcionamento avançado abrange:

-   [dispositivos móveis](#mobile) e [posicionamento](/docs/marketing-api/audiences/reference/placement-targeting);
    
-   [direcionamento demográfico avançado](#demographic);
    
    -   [educação e local de trabalho](#education-and-workplace);
        
    
-   [públicos personalizados](#custom_audiences);
    
-   [locais](#locales);
    
-   [alcance de pessoas interessadas em cidades e regiões selecionadas](#reach-people-interested-in-selected-cities-and-regions).
    
-   [direcionamento por categoria ampla](#broadcategories);
    
-   [expansão do direcionamento](/docs/marketing-api/audiences/reference/targeting-expansion);
    
-   [direcionamento flexível](/docs/marketing-api/audiences/reference/flexible-targeting).
    

É possível usar combinações das opções avançadas de direcionamento nos seus [públicos personalizados](/docs/reference/ads-api/custom-audience-targeting/) e semelhantes. Por padrão, o Facebook usa `ORs` para fazer combinações. Saiba mais sobre [direcionamento básico ou principal](/docs/marketing-api/buying-api/targeting).

Caso você use `flexible_spec`, também será preciso fornecer um dos seguintes dados em `targeting`:

-   `geo_locations` (campo de direcionamento geográfico por país, região, cidade, código postal)
    
-   `custom_audiences`
    
-   `product_audience_specs`
    
-   `dynamic_audience_ids`
    

### Limitações

-   Haverá conjuntos distintos de restrições para os anunciantes que veicularem anúncios de moradia, emprego e crédito que estiverem baseados nos Estados Unidos ou que veicularem anúncios direcionados a esse país. Consulte [**Categoria de anúncio especial**](/docs/marketing-api/special-ad-category/).
    
-   Consulte nosso [guia sobre restrições de direcionamento](/docs/marketing-api/audiences/reference/targeting-restrictions) para ver mais limitações.
    

## Dispositivos móveis

Esta seção é útil para [anúncios de instalação de app para celular](/docs/reference/ads-api/mobile-app-ads).

```
v24.0
```

Você pode combinar categorias, como iPod OU iPad OU iPhone.

**Uma categoria não exclui a outra**. Ao selecionar iOS, você direcionará para todos os dispositivos que usam esse sistema operacional, incluindo iPhone e iPod, mesmo se não especificar `user_device`.

**Para anúncios com o objetivo de reconhecimento da marca**, não será possível direcionar com base no tipo de dispositivo móvel, como celulares comuns ou aparelhos Samsung, nem com base no número de versão do iOS. Só é possível escolher Android, iOS ou todos os celulares.

### Campos disponíveis

Campo

Descrição

`user_os`

tipo: matriz

**Obrigatório.**

Um ou mais valores da tabela de opções de sistema operacional abaixo. Os valores possíveis estão na [API de Pesquisa de Direcionamento](/docs/marketing-api/audiences/reference/targeting-search) com `type=adTargetingCategory` e `class=user_os`. Você não pode direcionar anúncios para a versão mínima de uma plataforma na outra plataforma. Contudo, você pode direcionar anúncios às duas plataformas sem especificar as versões mínimas delas.

  

**Valores válidos:**  
\- `['iOS', 'Android']`  
\- `['iOS']`  
\- `['Android_ver_4.2_and_above']`  
\- `['iOS_ver_8.0_to_9.0']`

**Valores inválidos:**  
\- `['Android', 'iOS_ver_8.0_and_above']`  
\- `['iOS', 'Android_ver_4.0_and_above']`

`user_device`

tipo: matriz

**Opcional.**

Os dispositivos devem corresponder ao valor em `user_os`. Veja os valores possíveis na [API de Pesquisa de Direcionamento](/docs/marketing-api/audiences/reference/targeting-search) com `type=adTargetingCategory` e `class=user_device`.

`excluded_user_device`

tipo: matriz

**Opcional.**

Dispositivos que serão excluídos. Os dispositivos devem corresponder ao valor em `user_os`. Veja os valores possíveis na [API de Pesquisa de Direcionamento](/docs/marketing-api/audiences/reference/targeting-search) com `type=adTargetingCategory` e `class=user_device`.

`wireless_carrier`

tipo: matriz

**Opcional.**

O valor permitido é `Wifi`. Direcionado aos usuários de dispositivos móveis que estão conectados a redes Wi-Fi.

### Opções de sistema operacional

Campo

Descrição

`iOS`

tipo: string

Dispositivos com iOS, entre eles iPhone, iPad e iPod.

`iOS_ver_x.x_and_above`

tipo: string

Dispositivos com iOS que executam a versão x.x e superior do sistema operacional.

  

**Opções**: 2.0, 3.0, 4.0, 4.3, 5.0, 6.0, 7.0, 8.0 e 9.0. **Exemplo**: `iOS_ver_4.0_and_above`

  

Para anúncios de apps da Meta:

-   Os conjuntos de anúncios da SKAdNetwork e de Mensuração de Eventos Agregados da Meta são compatíveis somente com versões no intervalo `iOS_ver_14.0_and_above`.
    
-   Os conjuntos de anúncios da SKAdNetwork ou de Mensuração de Eventos Agregados da Meta são compatíveis somente com versões no intervalo `iOS_ver_2.0_to_14.4`.
    

`iOS_ver_x.x_to y.y`

tipo: string

Dispositivos com iOS que executam as versões x.x a y.y do sistema operacional.

  

**Opções**: 2.0, 3.0, 4.0, 4.3, 5.0, 6.0, 7.0, 8.0 e 9.0.

**Exemplo**: `iOS_ver_8.0_to_9.0`, em que x.x deve ser menor que y.y.

`Android`

tipo: string

Dispositivos com Android

`Android_ver_x.x_and_above`

tipo: string

Dispositivos com Android que executam a versão x.x e superior.

  

**Opções**: 2.0, 2.1, 2.2, 2.3, 3.0, 3.1, 3.2, 4.0, 4.1, 4.2, 4.3, 4.4, 5.0, 5.1, 6.0, 7.0, 7.1 e 8.0.

**Exemplo**: `Android_ver_4.0_and_above`

`Android_ver_x.x_to y.y`

tipo: string

Dispositivos com Android que executam as versões x.x a y.y.

  

**Opções**: 2.0, 2.1, 2.2, 2.3, 3.0, 3.1, 3.2, 4.0, 4.1, 4.2, 4.3, 4.4, 5.0, 5.1, 6.0, 7.0, 7.1 e 8.0.

**Exemplo**: `Android_ver_4.2_to_8.0`, em que x.x. deve ser menor que y.y.

[](#)

## Direcionamento demográfico avançado

Direcionamento com base em relacionamentos, educação, finanças e acontecimentos.

### Exemplos

Primeiro, consulte `life_events`:

```
v24.0
```

Adicione os resultados a `targeting_spec`:

```
v24.0
```

Agora direcionamos:

-   Localização – Japão, Estados Unidos (raio de 10 milhas de Menlo Park, Califórnia) ou Estados Unidos (Texas)
    
-   Idade – de 20 a 24 anos
    
-   Gênero – masculino
    
-   Interesses – futebol
    
-   Comportamentos – apenas viajantes frequentes
    
-   Acontecimento – recém-casados (um ano)
    
-   Propriedade da residência – locatários
    

Este é outro exemplo de direcionamento por localização, dados demográficos, status de relacionamento e interesses:

```
v24.0
```

### Opções possíveis

Nome

Descrição

`relationship_statuses`

tipo: matriz

Matriz de números inteiros que representam o status de relacionamento.

`1` – solteiro(a)

`2` – em um relacionamento

`3` – casado(a)

`4` – noivo(a)

`6` – não especificado

  

**Padrão**: `ALL` se você especificar "Null" (Nulo) ou não informar um valor.

**Restrições**: não use `0`.

`life_events`

tipo: matriz

Matriz de objetos com o campo "id" e o campo opcional "name": `[{'id': 123, 'name': 'foo'}, {'id': 456}, 789]`

`industries`

tipo: matriz

Matriz de objetos com o campo "id" e o campo opcional "name".

`income`

tipo: matriz

Matriz de objetos com o campo "id" e o campo opcional "name".

`family_statuses`

tipo: matriz

Matriz de objetos com o campo "id" e o campo opcional "name".

### Trabalho e educação

Use a [API de Pesquisa de Direcionamento](/docs/marketing-api/audiences/reference/targeting-search#demo) para todas as opções.

Nome

Descrição

`education_schools`

tipo: matriz

Escolas, faculdades e instituições.

  

**Limite**: 200 instituições de ensino.

**Exemplo**: `[{id: 105930651606, 'name': 'Harvard University'}, {id: 105930651607}, 105930651608]`

`education_statuses`

tipo: matriz

Matriz de números inteiros para o direcionamento com base no nível de escolaridade.

`1` – HIGH\_SCHOOL (Ensino Médio)

`2` – UNDERGRAD (graduação incompleta)

`3` – ALUM (ex-estudante)

`4` – HIGH\_SCHOOL\_GRAD (Ensino Médio completo)

`5` – SOME\_COLLEGE (faculdade não especificada)

`6` – ASSOCIATE\_DEGREE (diploma de associado)

`7` – IN\_GRAD\_SCHOOL (pós-graduação incompleta)

`8` – SOME\_GRAD\_SCHOOL (pós-graduação não especificada)

`9` – MASTER\_DEGREE (mestrado completo)

`10` – PROFESSIONAL\_DEGREE (diploma profissional)

`11` – DOCTORATE\_DEGREE (doutorado completo)

`12` UNSPECIFIED (não especificado)

`13` – SOME\_HIGH\_SCHOOL (instituição de Ensino Médio não especificada)

`college_years`

tipo: matriz

Matriz de números inteiros. Formatura na faculdade.

  

**Limite**: o primeiro ano permitido é 1980.

`education_majors`

tipo: matriz

Graduações.

  

**Exemplo**: `[{'id': 123, 'name': 'Computer Science'}, {'id': 456}, 789]`

**Limite**: 200

`work_employers`

tipo: matriz

Empresa, organização ou local de trabalho.

  

**Exemplo**: `[{'id':'50431654','name':'Microsoft'}, {'id':50431655}, 50431656]`

**Limite**: 200

`work_positions`

tipo: matriz

Cargo informado pelo usuário.

  

**Exemplo**: `[{'id':105763692790962, 'name':'Contractor'}, {'id':105763692790963}, 105763692790964]`

**Limite**: 200

[](#)

## Públicos personalizados

Crie um [público personalizado](/docs/marketing-api/reference/custom-audience) e adicione usuários. Você pode usar o público para fazer o direcionamento, seja para inclusão ou exclusão. Inclua até 500 públicos personalizados em `custom_audiences` e 500 em `excluded_custom_audiences`.

O campo `excluded_custom_audiences` em targeting\_specs não é o mesmo que `excluded_custom_audiences` no público personalizado APP\_COMBINATION.

Campo

Descrição

`custom_audiences`

tipo: matriz

Matriz de identificações ou objetos de público. Somente no campo `'id'`: `[123, 456]` ou `[{'id': 123}, {'id': 456}]`

`excluded_custom_audiences`

tipo: matriz

Matriz de identificações ou objetos de público. Somente no campo `'id'`: `[123, 456]` ou `[{'id': 123}, {'id': 456}]`

```
targeting:{
     "geo_locations":{
       "countries":["US"],
     },
     "age_min":25,
     "age_max":40,
     "custom_audiences":[{"id":6004192254512}]}
     "excluded_custom_audiences":
       [{"id":6004192252847}],
 }
```

[](#)

## Localidades

Insira um direcionamento detalhado na localidade:

Campo

Descrição

`locales`

tipo: matriz

Consulte a seção [Localidades em Pesquisa de direcionamento](/docs/reference/ads-api/get-autocomplete-data/#locale). Índices na submatriz "locales". Direcione o anúncio a contas da Central de Contas com idioma diferente do idioma comum para a localização. Forneça um ID para o idioma, como 5 para "alemão". Limite: 50. Confira o mapeamento de "localidades" virtuais para conjuntos de idiomas na seção sobre [localidades em Pesquisa de direcionamento](/docs/reference/ads-api/get-autocomplete-data/#locale) com `type=adlocale`.

[](#)

## Como alcançar pessoas interessadas em cidades e regiões selecionadas

Esse recurso expande o direcionamento por localização, permitindo que anunciantes alcancem pessoas que demonstraram interesse ou intenção de viajar e fazer compras nas cidades e regiões que você selecionou, dentro do mesmo país.

-   Para aceitar, defina o parâmetro `geo` dentro de `individual_setting` em `targeting_automation` como `1`.
    
-   Para recusar, defina o parâmetro `geo` dentro de `individual_setting` em `targeting_automation` como `0`.
    

```
"targeting": { "age_range": [25, 35], "geo_locations": { "countries": ["GB"], "cities": [{"key":"2430536", "radius":12, "distance_unit":"mile"}] }, "targeting_automation": { "individual_setting": { "geo": 1 } } }
```

#### Limitações

Esse recurso funciona quando você selecionou cidades ou regiões no seu direcionamento por localização (ou seja, o campo `geo_locations`).

#### Exemplo de solicitação

```
v24.0
```

Para mais informações sobre o recurso, veja [Como alcançar pessoas interessadas nas cidades e regiões selecionadas](https://www.facebook.com/business/help/726389026372510).

[](#)

## Habilitar sugestões de idade e gênero

No momento, este recurso está disponível para anunciantes selecionados. Nos próximos meses, ele será lançado para todos os anunciantes.

Para usar idade ou gênero como sugestões, configure o parâmetro `individual_setting` no campo `targeting_automation`. Essa configuração também será retornada ao recuperar o conjunto de anúncios, se existir no adset.

#### Limitações

-   Esse recurso só está disponível nos objetivos `OUTCOME_SALES` e `APP_INSTALLS`.
    
-   Se você habilitar as sugestões de idade e gênero, os anúncios serão mostrados além dessas configurações quando isso for melhorar o desempenho dos anúncios.
    

### Idade como sugestão

Defina o parâmetro `age` dentro de `individual_setting` em `targeting_automation` como `1`. Depois, inclua o campo `age_range` na especificação do público.

#### Exemplo de solicitação

```
{ "geo_locations": { "countries": [ "US" ] }, "age_min": 18, "age_range": [25, 35], "targeting_automation": { "individual_setting": { "age": 1 } } }
```

### Gênero como sugestão

Defina o parâmetro `gender` dentro de `individual_setting` em `targeting_automation` como `1`.

#### Exemplo de solicitação

```
{ "geo_locations": { "countries": [ "US" ] }, "age_min": 21, "genders":[1], "targeting_automation": { "individual_setting": { "gender": 1 } } }
```

### Criar conjunto de anúncios com sugestões

#### Exemplo de solicitação

```
v24.0
```

#### Exemplo de resposta

```
{ "id": "<AD_SET_ID>", }
```

### Recuperar conjunto de anúncios com sugestões

#### Exemplo de solicitação

```
v24.0
```

#### Exemplo de resposta

```
{ "targeting": { "age_max": 65, "age_min": 19, "age_range": [ 25, 35 ], "genders": [ 1 ], "geo_locations": { "countries": [ "US" ], "location_types": [ "home", "recent" ] }, "targeting_relaxation_types": { "lookalike": 0, "custom_audience": 0 }, "targeting_automation": { "advantage_audience": 0, "individual_setting": { "age": 1, "gender": 1 } } }, "id": "<AD_SET_ID>", }
```

[](#)

## Direcionamento por categoria ampla personalizada

Use categorias amplas para fazer um direcionamento personalizado criado ou permitido especificamente para sua conta. Para incluir as categorias "culinária" e "proprietário de pequena empresa":

```
v24.0
```

Para fazer o direcionamento de acordo com uma categoria ampla, a localização e os dados demográficos:

```
v24.0
```

A seguinte opção está disponível:

Nome

Descrição

`user_adclusters`

tipo: matriz

Matriz de pares de nomes de identificação com **clusters de categorias amplas**. Veja as informações abaixo sobre como recuperar categorias amplas. Limite: 50 pares de nomes e identificações.

Para consultar esse direcionamento por conta de anúncios, faça uma solicitação `HTTP GET`:

```
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/broadtargetingcategories
```

A resposta é uma matriz de pares chave-valor JSON.

Nome

Descrição

`id`

Tipo: longo

O ID da categoria ampla é usado para a especificação de direcionamento do anúncio.

`name`

tipo: string

Nome da categoria ampla.

`parent_category`

tipo: string

Categoria principal da categoria ampla.

`size_lower_bound`

tipo: número inteiro

Tamanho mínimo do público da categoria ampla.

`size_upper_bound`

tipo: número inteiro

Tamanho máximo do público da categoria ampla.

`type`

tipo: número inteiro

6 = categoria ampla.

`type_name`

tipo: string

Categoria ampla.

[](#)

## Recursos

-   [Pesquisa de direcionamento](/docs/reference/ads-api/get-autocomplete-data/)
    
-   [Reach Estimate](/docs/marketing-api/reference/reach-estimate/)
    
-   [Targeting Description](/docs/marketing-api/audiences/reference/targeting-description)
    
-   [Custom Audience](/docs/reference/ads-api/custom-audience-targeting/)
    

[](#)