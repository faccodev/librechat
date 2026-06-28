---
title: "Direcionamento básico - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/buying-api/targeting"
scraped_at: "2026-02-01T13:59:15.715Z"
---

# Direcionamento básico

Confira o que inclui o direcionamento básico:

-   [Dados demográficos e eventos](#demographics)
    
-   [Localização](#location)
    
-   [Interesses](#interests)
    
-   [Comportamentos](#behaviors)
    

Há conjuntos distintos de restrições para os anunciantes que veiculam [anúncios de moradia, emprego, crédito, temas sociais, eleições ou política](/docs/marketing-api/special-ad-category/) e que estão baseados nos Estados Unidos ou que direcionam anúncios para esse país.

## Dados demográficos e eventos

Receba dados básicos de [demografia](/docs/marketing-api/audiences/reference/targeting-search#demo) e localização para definir o direcionamento usando a [pesquisa de direcionamento](/docs/marketing-api/audiences/reference/targeting-search). Depois, especifique as opções no parâmetro `targeting`, que contém atributos do [conjunto de anúncios](/docs/reference/ads-api/adset/) para definir quem deve ver o anúncio.

**Observação**: será preciso especificar pelo menos um país no direcionamento, a menos que você use um [público personalizado](/docs/marketing-api/reference/custom-audience).

### Direcionamento por dados demográficos

```
v24.0
```

#### Campos

Nome

Descrição

`genders`

matriz

Direcionamento baseado em gênero. O padrão é todos. `1` direciona para o gênero masculino, `2` direciona para o gênero feminino.

`age_min`

int

Idade mínima. O padrão é 18 anos. Se usado, deve ser 13 ou mais. Se o app tiver configurações personalizadas de restrições de idade, essas informações serão usadas nos anúncios com objetivos APP\_INSTALL. Por exemplo, se a idade mínima do app for 18 anos, e você configurar `age_min` como 13, o direcionamento de anúncios usará a idade mínima do app.

`age_max`

int

Idade máxima. Se usado, deve ser 65 ou menos.

[](#)

## Localização

Pesquise e recupere valores para fazer o direcionamento por localização usando a [pesquisa de direcionamento](/docs/marketing-api/audiences/reference/targeting-search). Esse direcionamento tem dois parâmetros: `geo_locations` para direcionar por localizações e, opcionalmente, `excluded_geo_locations` para excluir áreas.

Use `country_groups` com `geo_locations` para direcionar para maiores regiões geográficas, como Europa ou América do Norte.

Using `radius` can cause an error, code: 100, subcode 1815946, when targeting multiple locations. We recommend creating an ad for each location or not using `radius` in your call.

### Campos

Nome

Descrição

`countries`

matriz

Direcionamento de país. Exige uma matriz de códigos de países. Consulte [Pesquisa de direcionamento, Países](/docs/reference/ads-api/get-autocomplete-data/#countries).  
**Exemplo**: `'countries': ['US']`

`regions`

matriz

Estado, província ou região. Para ver os valores disponíveis, consulte [Pesquisa de direcionamento, Regiões](/docs/reference/ads-api/get-autocomplete-data/#regions). Limite: 200.  
**Exemplo**: `'regions': [{'key':'3847'}]`

`cities`

matriz

Especifique `key`, `radius` e `distance_unit`. Para `key`, consulte [Pesquisa de direcionamento, Cidades](/docs/reference/ads-api/get-autocomplete-data/#cities). `radius` é a distância em torno das cidades, de 10 a 50 milhas ou de 17 a 80 quilômetros. `distance_unit` é milha ou quilômetro. Limite: 250.  
**Exemplo**: `'cities': [{'key':'2430536', 'radius':12, 'distance_unit':'mile'}]`

`zips`

matriz

Para direcionar por código postal, consulte a [API de pesquisa de direcionamento](/docs/reference/ads-api/get-autocomplete-data/#zipcode). Limite: 50.000 (antes 2.500) Se você fornecer mais de 2.500 valores, criaremos uma matriz conhecida como `location_cluster`, que representa um conjunto de códigos postais.  
**Exemplo**: `'zips':[{'key':'US:94304'},{'key':'US:00501'}]`

Para ler um `location_cluster` e ver as localizações direcionadas: `GET /location_cluster_ID`

`places`

matriz

Forneça um [local](https://developers.facebook.com/docs/graph-api/reference/place) específico. Limite: 200.  
**Exemplo:**`"places":[{"key":129672430416115,"name":"SFO", "radius":10, "distance_unit":"mile"}]`

`custom_locations`

matriz

Disponível para todos os objetivos. Forneça a localização exata em latitude e longitude ou endereço do centro de uma área. Especifique também o raio da sua localização de 0,63 a 50 milhas, ou de 1 a 80 quilômetros. `distance_unit` é milhas ou quilômetros. O padrão é milha. Limite: 200. Não é possível usar somente a caixa postal com `address_string`. É preciso fornecer, no mínimo, um endereço físico (rua).  
**Exemplo:**`'custom_locations':[{'address_string': '1601 Willow Road, Menlo Park, CA', 'radius': 5},{'latitude': 36, 'longitude': -121.0, 'radius': 5, 'distance_unit': 'kilometer'},]`

`custom_locations.latitude`

float

Latitude da localização

`custom_locations.longitude`

float

Longitude da localização

`custom_locations.name`

string

Nome do endereço. Você pode usar com os valores de `latitude` e `longitude` para direcionamento por localização geográfica sem fornecer `address_string`

`custom_locations.radius`

float

O raio em torno da latitude/longitude, em milhas, exceto se especificado o contrário em `distance_unit`. De 0,63 a 50 milhas, ou 1 a 80 quilômetros.

`custom_locations.distance_unit`

string

**Opcional.**

`kilometer` ou `mile`. O padrão é `mile`.

`custom_locations.address_string`

string

Endereço na latitude/longitude, como 1601 Willow Rd, Menlo Park, CA. Formato sugerido: número nome da rua, cidade, estado/província, país. Excluir códigos postais.

`geo_markets`

matriz

Representa códigos geográficos que usam mercados DMA e/ou Comscore. Limite: 2.500.  
**Exemplo:**`'geo_markets':[{'key': 'DMA:501', 'name': 'New York'},{'key': COMSCORE_MARKET:2001', 'name': 'New York, NY'}, {'key': 'DMA:543', 'name': 'Springfield-Holyoke'},]`

`electoral_district`

matriz

Chave para distritos eleitorais. Consulte distritos em [Pesquisa de direcionamento, Eleitoral](/docs/marketing-api/targeting-search#electoral).  
**Exemplo**: `'electoral_districts':[{'key':'US:AK00'},{'key':'US:CA01'},{'key':'US:NY14'}]`

`location_types`

matriz

A matriz `['home', 'recent']` é a única opção disponível. Se nenhuma matriz `location_types` for fornecida, o padrão será `['home', 'recent']`.

-   `recent`: pessoas que têm a área selecionada como localização recente, conforme determinado nos dados do dispositivo móvel. Não disponível para excluir localizações.
    
-   `home`: pessoas que têm a "cidade atual" declarada no perfil do Facebook localizada em uma área. O Facebook valida essa declaração usando o IP e informações das localizações de perfis de amigos.
    

`country_groups`

matriz

Regiões geográficas globais e áreas de comércio livre. Consulte [Pesquisa de direcionamento, Grupos de países](/docs/reference/ads-api/get-autocomplete-data/#country_group).

Forneça a matriz com códigos de grupos de países:

-   `worldwide`: mundial.
    
-   `africa`: África.
    
-   `afta`: Área de Livre Comércio ASEAN.
    
-   `android_app_store`: apps pagos compatíveis com países na loja de apps Android.
    
-   `android_free_store`: apps gratuitos compatíveis com países na Play Store (Android).
    
-   `apec`: Cooperação Econômica Ásia-Pacífico.
    
-   `asia`: Ásia.
    
-   `caribbean`: Caribe.
    
-   `central_america`: América Central.
    
-   `cisfta`: Área de Livre Comércio da Comunidade de Estados Independentes.
    
-   `eea`: Espaço Econômico Europeu.
    
-   `emerging_markets`: países em mercados emergentes.
    
-   `europe`: Europa.
    
-   `gcc`: Conselho de Cooperação do Golfo.
    
-   `itunes_app_store`: países compatíveis com a App Store (Apple).
    
-   `mercosur`: MERCOSUL.
    
-   `nafta`: Acordo de Livre Comércio da América do Norte.
    
-   `north_america`: América do Norte.
    
-   `oceania`: Oceania.
    
-   `south_america`: América do Sul.
    

  

**Exemplo**: `'country_groups': ['asia','mercosur']`

### Exemplos

#### Direcionamento por país

```
curl -X POST \ -F 'name="My Reach Ad Set"' \ -F 'optimization_goal="REACH"' \ -F 'billing_event="IMPRESSIONS"' \ -F 'bid_amount=2' \ -F 'daily_budget=1000' \ -F 'campaign_id="<AD_CAMPAIGN_ID>"' \ -F 'targeting={ "geo_locations": { "countries": [ "US" ] }, "facebook_positions": [ "feed" ] }' \ -F 'status="PAUSED"' \ -F 'promoted_object={ "page_id": "<PAGE_ID>" }' \ -F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/v24.0/act_<AD_ACCOUNT_ID>/adsets
```

#### Direcionamento por localização com exclusões

```
v24.0
```

#### Direcionamento por código postal

```
v24.0
```

#### Direcionamento por localizações personalizadas, mercados geográficos e tipos de localização

O código a seguir configura o direcionamento para:

-   5 milhas em torno de 1601 Willow Road, Menlo Park, CA
    
-   5 quilômetros em torno de latitude: 36, longitude –121,0
    
-   DMAs (501 e 543) e COMSCORE\_MARKETS (2001 e 2054)
    

```
v24.0
```

#### Pesquisa e direcionamento

Para direcionar homens entre 20 e 24 anos em um raio de 10 milhas de Menlo Park (CA) ou que moram no Texas ou no Japão:

##### Etapa 1

Primeiro, receba o código de país do Japão:

```
v24.0
```

##### Etapa 2

Receba o código de região do Texas:

```
v24.0
```

##### Etapa 3

Pesquise o código de cidade de Menlo Park (CA):

```
v24.0
```

##### Etapa 4

Forneça `genders` e idade como `age_min` e `age_max`.

##### Etapa 5

Nossas especificações de direcionamento estão prontas com códigos de país, região e cidade:

```
v24.0
```

#### Direcionamento por várias cidades

Defina `custom_type` como `multi_city` e `country` ou `country_group`, conforme descrito anteriormente.

```
v24.0
```

##### Parâmetros

Nome

Descrição

`min_population`

int

O limite mínimo de população usado na escolha das cidades para direcionamento.

`max_population`

int

O limite máximo de população usado na escolha das cidades para direcionamento.

[](#)

## Direcionamento por interesse

Direcionamento com base em interesses na linha do tempo de alguém, Páginas curtidas ou palavras-chave associadas a Páginas ou apps usados por alguém. Consulte [Pesquisa de direcionamento, Interesses](https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search#interests).

Para direcionar pessoas interessadas em futebol, primeiro consulte:

```
v24.0
```

Adicione o interesse por `name` e `id` para uma especificação de direcionamento em que `path` é o caminho desse interesse nas ferramentas para anúncios.

```
v24.0
```

Este é outro exemplo:

```
v24.0
```

### Campos

Nome

Descrição

`interests`

matriz

Matriz com os campos `id` e `name` (opcional):  
`'interests':[{id: 6003139266461, 'name': 'Movies'}, {id: 6003139266462}, 6003139266463]`

[](#)

## Direcionamento por comportamento

Direcionamento com base em atividades digitais, dispositivos usados pela pessoa, intenção de compra ou compras anteriores e viagem. Visualize as opções em `Browse`, como "viajantes frequentes". Consulte [Pesquisa de direcionamento, Comportamentos](https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search#behaviors).

```
v24.0
```

Adicione o comportamento à especificação `targeting`:

```
v24.0
```

Outro exemplo:

```
v24.0
```

## Campos

Nome

Descrição

`behaviors`

matriz

Matriz com os campos `id` e `name` (opcional):  
`'behaviors':[{id: 6004386044572, 'name': 'Android Owners (All)'}, {id: 6004386044573}, 6004386044574]`

[](#)

## Saiba mais

-   [Pesquisa de direcionamento](https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search): consulte as opções de direcionamento para anúncios nativos do Facebook.
    
-   [Direcionamento por público](/docs/marketing-apis/audiences-api)
    
-   [Categoria de anúncio especial](/docs/marketing-api/special-ad-category/)
    

Outro direcionamento:

-   [Audience Network](/docs/reference/ads-api/audience-network): exibe anúncios no Audience Network e amplia o alcance dos seus anúncios com link ou de app.
    

[](#)