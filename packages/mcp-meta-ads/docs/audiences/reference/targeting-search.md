---
title: "Pesquisa de direcionamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search"
scraped_at: "2026-02-01T14:24:30.821Z"
---

# Pesquisa de direcionamento

Direcione [conjuntos de anúncios](/docs/reference/ads-api/adset/) com base em diferentes critérios fornecidos por você nas especificações de direcionamento. A maioria dos direcionamentos consiste em valores predefinidos, como país "Japão" ou cidade "Tóquio".

Encontre os valores válidos com API de Marketing, Pesquisa de direcionamento: `https://graph.facebook.com/{API_VERSION}/search`. Insira a string de consulta no formato `UTF8`.

## Status da opção de direcionamento

Para verificar o status atual e/ou planejado dos objetos de direcionamento, use o parâmetro `targeting_option_list`:

```
curl -G \
  -d 'targeting_option_list=[<TARGETING_OPTION_ ID>,<TARGETING_OPTION_ID>]' 
  -d 'type=targetingoptionstatus'  
  https://graph.facebook.com/<API_VERSION>/search
```

A resposta:

```
{"data":[{"id":"<TARGETING_OPTION_ ID>","current_status":"NON-DELIVERABLE"},{"id":"<TARGETING_OPTION_ID>","current_status":"NON-DELIVERABLE","future_plan":[{"key":"2018-05-10T00:00:00+0000","value":"DEPRECATING"}]}]
```

### Campos de retorno

Campo

Valor

`current_status`

-   `NORMAL`
    
-   `NON-DELIVERABLE`: não veicula, embora o conjunto de anúncios possa continuar a ser veiculado de acordo com regras pré-definidas.
    
-   `DEPRECATING`: os conjuntos de anúncios direcionados a esse objetivo continuam a ser veiculados, mas o objeto não poder ser usado para atualizar nem criar conjuntos. Ao serem atualizados, os conjuntos de anúncios com esse termo serão rejeitados, a menos que ele seja removido.
    
-   `NON-DELIVERABLE-IN-EXCLUSION`: o objeto não pode ser usado em exclusões de direcionamento.
    
-   `UNKNOWN`
    

`future_plan`

Um mapeamento do registro de data e hora e do status. Retorna um mapa das datas e dos status planejados, que são os mesmos valores disponíveis em `current_status`.

[](#)

## Geografia

Pesquise o direcionamento por país, grupo de países, cidade, estado, código postal e outras áreas geográficas em `type=adgeolocation`. Você pode especificar parâmetros opcionais com `type=adgeolocation`. Para encontrar o código do país dos Estados Unidos:

```
curl -G \
  -d 'location_types=["country"]' \
  -d 'type=adgeolocation' \
  -d 'q=un' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "key": "GB", 
      "name": "United Kingdom", 
      "type": "country", 
      "supports_city": false, 
      "supports_region": false
    }, 
    {
      "key": "AE", 
      "name": "United Arab Emirates", 
      "type": "country", 
      "supports_city": false, 
      "supports_region": false
    }, 
    {
      "key": "UM", 
      "name": "United States Minor Outlying Islands", 
      "type": "country", 
      "supports_city": false, 
      "supports_region": false
    }
  ]
}
```

`key` é um número fixo único por categoria, como países ou grupos de países. Outros campos, incluindo `name`, estão sujeitos a alterações. Use `key` para definir as [especificações de direcionamento](/docs/marketing-api/buying-api/targeting).

Na resposta:

-   Se `supports_region` for `true`, o país terá códigos de regiões.
    
-   Se `supports_city` for `true`, o país terá códigos de cidades.
    

Nome

Descrição

`location_types`

Tipo: matriz

`country`, `country_group`, `region`, `city`, `zip`, `geo_market` ou `electoral_district`, este apenas nos EUA.  
`location_types` é preferencial em relação a `type=adcountry` e assim por diante.

`region_id`

Tipo: número inteiro

Região da pesquisa.

`country_code`

Tipo: string

País da pesquisa: `country_code=US`.

### Países

Cada país que pode ser usado no direcionamento apresenta um código do país. Parâmetros opcionais para `type=adgeolocation&location_types=['country']`:

Nome

Descrição

`q`

Tipo: string

String para preencher automaticamente os valores. Para listar todos os países com `location_types=['country']`, deixe `q=` em branco e defina um limite para um número elevado, `limit=1000`.

`match_country_code`

Tipo: booliano

O padrão é `false`.

Encontre o país pelo código do país. Faça a correspondência do país por `country_code` versus `name`.

### Grupo de países

Todos os grupos de países possuem um código para realizar a pesquisa e consultar a lista de países. Para todos os grupos de países denominados `mercosur`:

```
curl -G \
  -d 'location_types=["country_group"]' \
  -d 'type=adgeolocation' \
  -d 'q=mercosur' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "key": "mercosur",
      "name": "Mercosur",
      "type": "country_group",
      "country_codes": [
        "BR",
        "AR",
        "UY",
        "PY",
        "VE"
      ],
      "is_worldwide": false,
      "supports_region": true,
      "supports_city": true
    }
  ]
}
```

Se `is_worldwide` for `true`, o grupo de países será mundial. Se `supports_region` for `true`, o grupo de países terá códigos de regiões. Se `supports_city` for `true`, o grupo terá códigos de cidades.

### Regiões

Para pesquisar todas as regiões que iniciam com o código `al`:

```
curl -G \
  -d 'location_types=["region"]' \
  -d 'type=adgeolocation' \
  -d 'q=al' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "key": "3843",
      "name": "Alabama",
      "type": "region",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "3844",
      "name": "Alaska",
      "type": "region",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "527",
      "name": "Alberta",
      "type": "region",
      "country_code": "CA",
      "country_name": "Canada",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "1089",
      "name": "Alsace",
      "type": "region",
      "country_code": "FR",
      "country_name": "France",
      "supports_region": true,
      "supports_city": true
    }
  ]
}
```

Opções para `type=adgeolocation&location_types=['region']`:

Nome

Descrição

`q`

Tipo: string

String para preencher automaticamente os valores. Para ver todos os países com `location_types=['region']`, não forneça nenhum parâmetro, `q=` e defina um limite para um número elevado, `limit=1000`.

Se o parâmetro `supports_region` for `true`, você poderá fazer o direcionamento para essa região. Se `supports_city` for `true`, a região terá códigos de cidades.

### Cidades

**Desde março de 2019, reclassificamos várias cidades para outras funções, mas você pode continuar usando `city`. A pesquisa retornará resultados que antes eram cidades.**

Para pesquisar os códigos de todas as cidades que começam por `Manhattan`:

```
curl -G \
     -d 'location_types=["city"]' \
     -d 'type=adgeolocation' \
     -d 'q=Manhattan' \
     -d 'access_token=ACCESS_TOKEN' \
     https://graph.facebook.com/VERSION/search
```

A resposta:

```
{
  "data": [
    {
      "key": "2447439",
      "name": "Manhattan",
      "type": "city",
      "country_code": "US",
      "country_name": "United States",
      "region": "Kansas",
      "region_id": 3859,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "2439596",
      "name": "Manhattan",
      "type": "city",
      "country_code": "US",
      "country_name": "United States",
      "region": "Illinois",
      "region_id": 3856,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "2479541",
      "name": "Manhattan",
      "type": "city",
      "country_code": "US",
      "country_name": "United States",
      "region": "Montana",
      "region_id": 3869,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "2428908",
      "name": "Manhattan",
      "type": "city",
      "country_code": "US",
      "country_name": "United States",
      "region": "Florida",
      "region_id": 3852,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "2703980",
      "name": "Manhattan",
      "type": "subcity",
      "country_code": "US",
      "country_name": "United States",
      "region": "New York",
      "region_id": 3875,
      "supports_region": true,
      "supports_city": true,
      "geo_hierarchy_level": "SUBCITY",
      "geo_hierarchy_name": "BOROUGH"
    },
   ...
```

Se `supports_region` for verdadeiro, a região dessa cidade estará disponível para direcionamento. Se o parâmetro `supports_city` for definido como `true`, essa cidade estará disponível para direcionamento.

### Áreas geográficas

É possível usar outras áreas geográficas no direcionamento. Algumas dessas áreas ainda não estão definidas, como observado abaixo.

Área

Descrição

`LARGE_GEO_AREA`

Conhecido como um distrito ou divisão administrativa que abrange centenas de quilômetros quadrados ou mais. Exemplo: `Akkar` em `Lebanon`.

`MEDIUM_GEO_AREA`

Conhecido como um município, abrangendo mais de uma cidade. Exemplo: condado de `Henrico` no estado de `Virginia` em `United States`.

`SMALL_GEO_AREA`

Conhecida como uma área residencial perto de uma cidade ou um município. Exemplo: `El Rosario` próximo de Marbella em `Spain`.

`SUBCITY`

Como um bairro. Exemplo: `Brooklyn` em `New York`.

`NEIGHBORHOOD`

Área em uma cidade. Exemplo: `Barton Estates, Irving` em `Texas`.

`SUBNEIGHBORHOOD`

Ainda não disponível.

`METRO_AREA`

Área densamente povoada em volta de uma cidade maior. Ainda não disponível.

A hierarquia das áreas geográficas é a seguinte, da maior para a menor:

-   `REGION`
    
-   `LARGE_GEO_AREA`
    
-   `MEDIUM_GEO_AREA`
    
-   `SMALL_GEO_AREA`
    
-   `METRO_AREA`
    
-   `CITY`
    
-   `SUBCITY`
    
-   `NEIGHBORHOOD`
    
-   `SUBNEIGHBORHOOD`
    

### Código postal

Também é possível pesquisar códigos postais para direcionamento no Facebook. Para fazer a pesquisa por código postal, recomendamos usar `adgeolocation` com `location_types=['zip']`. Consulte a lista de países com códigos postais compatíveis na [Central de Ajuda da Meta](https://www.facebook.com/business/help/1544670369157045).

Para pesquisar códigos postais que começam por `9`:

```
curl -G \
  -d 'location_types=["zip"]' \
  -d 'type=adgeolocation' \
  -d 'q=9' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/LATEST-API-VERSION/search
```

A resposta:

```
{
  "data": [
    {
      "key": "US:90028",
      "name": "90028",
      "type": "zip",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "primary_city": "Los Angeles",
      "primary_city_id": 2420379,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "US:94110",
      "name": "94110",
      "type": "zip",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "primary_city": "San Francisco",
      "primary_city_id": 2421836,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "US:94501",
      "name": "94501",
      "type": "zip",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "primary_city": "Alameda",
      "primary_city_id": 2417628,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "US:95190",
      "name": "95190",
      "type": "zip",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "primary_city": "San Jose",
      "primary_city_id": 2421846,
      "supports_region": true,
      "supports_city": true
    }
  ]
}
```

### Localidades

Localidades para as quais é possível direcionar anúncios por códigos de localidades. Para pesquisar todas as localidades que começam por `en`:

```
curl -G \
  -d 'type=adlocale' \
  -d 'q=en' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
{
      "data": [
        {
          "key": 51, 
          "name": "English (Upside Down)"
        }, 
        {
          "key": 6, 
          "name": "English (US)"
        }, 
        {
          "key": 24, 
          "name": "English (UK)"
        }
      ]
    }
}
```

Nome

Descrição

`q`

Tipo: string

String para preencher automaticamente os valores. Para ver todas as localidades, deixe este campo em branco (`q=`) e defina um limite alto (`limit=1000`).

### Códigos de mercados geográficos

Para ver esses códigos, especifique `type=adgeolocation` e `location_types=['geo_market']` na sua consulta. Para buscar códigos DMA e Comscore que comecem com "New":

```
v24.0
```

O resultado:

```
{
  "data": [
    {
      "key": "DMA:622",
      "name": "New Orleans",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "DMA:501",
      "name": "New York",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "DMA:533",
      "name": "Hartford & New Haven",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
{
      "key": "COMSCORE_MARKET:2051",
      "name": "New Orleans, LA",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "COMSCORE_MARKET:2001",
      "name": "New York, NY",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "COMSCORE_MARKET:2031",
      "name": "Hartford-New Haven, CT",
      "type": "geo_market",
      "country_code": "US",
      "country_name": "United States",
      "supports_region": true,
      "supports_city": true
    },

    {
....
    }
  ]
}
```

### Distritos eleitorais

Para pesquisar municípios eleitorais para direcionamento, especifique `type=adgeolocation` e `location_types=['electoral_district']`. Para pesquisar distritos eleitorais na Califórnia:

```
curl -G \
  -d 'location_types=["electoral_district"]' \
  -d 'type=adgeolocation' \
  -d 'q=California' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "key": "US:CA14",
      "name": "California's 14th District",
      "type": "electoral_district",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "supports_region": true,
      "supports_city": true
    },
    {
      "key": "US:CA02",
      "name": "California's 2nd District",
      "type": "electoral_district",
      "country_code": "US",
      "country_name": "United States",
      "region": "California",
      "region_id": 3847,
      "supports_region": true,
      "supports_city": true
    },
 ...
}
```

### Metadados de localizações geográficas

Você pode usar outros parâmetros opcionais com `type=adgeolocationmeta`:

```
curl -G \
  -d 'cities=[2418779]' \
  -d 'zips=["US:90210"]' \
  -d 'countries=["US","JP"]' \
  -d 'regions=[10]' \
  -d 'type=adgeolocationmeta' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta é um objeto JSON com metadados das localizações geográficas especificadas:

```
{
  "data": {
    "countries": {
      "US": {
        "key": "US", 
        "type": "country", 
        "name": "United States", 
        "supports_city": true, 
        "supports_region": true
      }, 
      "JP": {
        "key": "JP", 
        "type": "country", 
        "name": "Japan", 
        "supports_city": true, 
        "supports_region": true
      }
    }, 
    "regions": {
      "10": {
        "key": "10", 
        "type": "region", 
        "name": "Dubai", 
        "country_code": "AE", 
        "supports_city": true, 
        "supports_region": false
      }
    }, 
    "cities": {
      "2418779": {
        "key": "2418779", 
        "type": "city", 
        "name": "Danville", 
        "region_id": 3847, 
        "region": "California", 
        "country_code": "US", 
        "supports_city": true, 
        "supports_region": true
      }
    }, 
    "zips": {
      "US:90210": {
        "key": "US:90210", 
        "type": "zip", 
        "name": "90210", 
        "primary_city": "Beverly Hills", 
        "region_id": 3847, 
        "region": "California", 
        "country_code": "US", 
        "supports_city": true, 
        "supports_region": true
      }
    }
  }
}
```

Opções:

Nome

Descrição

`countries`

Tipo: string

Matriz de códigos de países

`regions`

Tipo: número inteiro

Matriz de códigos de regiões

`country_groups`

Tipo: string

Matriz de códigos de grupos de países

`cities`

Tipo: número inteiro

Matriz de chaves de cidades

`zips`

Tipo: string

Matriz de códigos postais completos. Por exemplo, `US:92103`

### Sugestões de raio

Para fazer o direcionamento em torno de uma localização específica, use `suggested_radius` para alcançar pessoas suficientes em um raio sugerido:

```
curl -G \
  -d 'latitude=37.449478' \
  -d 'longitude=-122.173016' \
  -d 'type=adradiussuggestion' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta é um objeto JSON com `suggested_radius` e `distance_unit`.

```
{
  "data": [
    {
      "suggested_radius": 10,
      "distance_unit": "mile"
    }
  ]
}
```

Exemplo de busca por `suggested_radius` com uma `distance_unit` especificada:

```
curl -G \
  -d 'latitude=37.449478' \
  -d 'longitude=-122.173016' \
  -d 'type=adradiussuggestion' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```
```
{
  "data": [
    {
      "suggested_radius": 16,
      "distance_unit": "kilometer"
    }
  ]
}
```

Use estes parâmetros:

Nome

Descrição

`latitude`

tipo: float

**Obrigatório.**

A latitude da localização.

`longitude`

tipo: float

**Obrigatório.**

A longitude da localização.

`distance_unit`

Tipo: string

**Opcional.**

A unidade de medida, `mile` ou `kilometer`.

Além disso, saiba como usar os [anúncios de Divulgação nas Imediações](/docs/reference/ads-api/guides/local-awareness) com sugestões.

[](#)

## Interesses

Envie uma solicitação `GET` ao ponto de extremidade `/search`. Além disso, defina `type` como `adinterest` e `q` como o interesse específico a ser pesquisado:

```
curl -G \
  -d 'type=adinterest' \
  -d 'q=baseball' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta retornará os campos a seguir:

Nome

Descrição

`id`

_número inteiro_

Número de identificação do Facebook do direcionamento por interesse.

`locale`

_string_

Se esse campo estiver disponível, recupere o conteúdo no idioma de uma determinada localidade com o formato `language_TERRITORY`. O padrão é `en_US`.

`name`

_string_

Nome do interesse.

`path`

_matriz de strings_

Inclui a categoria e todas as categorias principais do direcionamento.

### Sugestões de interesses

Envie uma solicitação `GET` ao ponto de extremidade `/search` e configure `type` como `adinterestsuggestion` para consultar a lista de interesses sugeridos relacionados ao seu interesse.

#### Exemplo de consulta

```
curl -G \
  -d 'interest_list=["Basketball"]' \
  -d 'type=adinterestsuggestion' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/search
```

#### Exemplo de resposta

```
{
  "data": [
    {
      "id": "6003598240487",
      "name": "la biblia",
      "audience_size": 7419780,
      "path": [
  ],
      "description": null
   },
   {
      "id": "6003022269556",
      "name": "Rugby football",
      "audience_size": 13214830,
      "path": [
  ],
      "description": null
   },
   {
      "id": "6003146664949",
      "name": "Netball",
      "audience_size": 4333770,
      "path": [
  ],
"description": null
   },
   {
      "id": "6003013291881",
      "name": "Kaizer Chiefs F.C.",
      "audience_size": 1812850,
      "path": [
  ],
      "description": null
  },
  ....
  {
      "id": "6003400886535",
      "name": "espn sportscenter",
      "audience_size": 222960,
      "path": [
  ],
     "description": null
  },
  {
     "id": "6002925969459",
     "name": "watching movies",
     "audience_size": 4630950,
     "path": [
  ],
     "description": null
  },
  {
     "id": "6003214125247",
     "name": "lakers",
     "audience_size": 340360,
     "path": [
  ],
     "description": null
  }
```

As opções incluem:

Nome

Descrição

`interest_list`

Tipo: matriz de strings

**Obrigatório.**

Lista de termos para os quais você quer ver sugestões. Diferencia maiúsculas de minúsculas.

#### Limitações

-   Nem todos os interesses disponíveis serão retornados em uma pesquisa.
    
-   Os interesses podem ser renomeados a qualquer momento. A validação por nome poderá falhar quando isso acontecer. Por isso, recomendamos validar interesses por `interest_fbid_list` em vez de nome. Verifique se os termos são válidos ao fazer a consulta com `type=adinterestvalid` e com o interesse que será validado:
    

```
curl -G \
  -d 'interest_list=["Japan","nonexistantkeyword"]' \
  -d 'type=adinterestvalid' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "name": "Japan",
      "valid": true,
      "id": 6003700426513,
      "audience_size": 68310258
    },
    {
      "name": "nonexistantkeyword",
      "valid": false
    }
  ]
}
```

Opções:

Nome

Descrição

`interest_list`

Tipo: matriz de strings

**Obrigatório, se não houver `interest_fbid_list`**.

Uma lista de termos para validar. Diferencia maiúsculas de minúsculas.

`interest_fbid_list`

Tipo: matriz de identificações

**Obrigatório, se não houver `interest_list`**.

Uma lista de identificações para validar.

### Interesses

Para pesquisar interesses em potencial para o direcionamento, envie uma solicitação `GET` ao ponto de extremidade `/search` com `type` definido como `adTargetingCategory` e `class` como `interests`.

```
curl -G \
  -d 'type=adTargetingCategory' \
  -d 'class=interests' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

#### Limitações

-   Nem todos os interesses disponíveis serão retornados em uma pesquisa.
    

[](#)

## Comportamentos

Direcione anúncios com base nas ações ou no comportamento de compra anterior de um usuário. Recupere todas as opções possíveis de direcionamento por comportamento com `type=adTargetingCategory&class=behaviors`.

```
curl -G \
  -d 'type=adTargetingCategory' \
  -d 'class=behaviors' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta contém o seguinte:

Nome

Descrição

`name`

Tipo: string

Nome do direcionamento por comportamento.

`id`

Tipo: número inteiro

O número de identificação do Facebook do direcionamento por comportamento.

`audience_size_lower_bound`

_número inteiro_

O tamanho mínimo estimado do público-alvo.

`audience_size_upper_bound`

_número inteiro_

O tamanho máximo estimado do público-alvo.

`path`

Tipo: matriz de strings

Categoria e todas as categorias principais deste direcionamento.

`description`

Tipo: string

Descreve o público-alvo.

`type`

Tipo: string

Classe da categoria de direcionamento.

[](#)

## Dados demográficos

Inclui o local de trabalho, educação, tipos de cargo e tipos de status de relacionamento. Você também pode direcionar pela data mais recente de um acontecimento: 3 meses, 6 meses e 1 ano. Pode fazer referência a uma instituição de ensino para direcionar por ID e nome.

Para pesquisar todas as instituições que começam por `ha`:

```
curl -G \
  -d 'type=adeducationschool' \
  -d 'q=ha' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "name": "Harvard University", 
      "id": 105930651606,
      "coverage": 8395398,
      "subtext": "Cambridge, Massachusetts"
    }, 
    {
      "name": "Hajvery University", 
      "id": 148971135122588,
      "coverage": 124162
    }, 
    {
      "name": "Harvard-Westlake School", 
      "id": 107799365910274,
      "coverage": 14106
    }
  ]
}
```

### Cursos de graduação

Faça o direcionamento de cursos de graduação por ID e nome. Para pesquisar todos os cursos de graduação que iniciam por `ph`:

```
curl -G \
  -d 'type=adeducationmajor' \
  -d 'q=ph' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "name": "Photography", 
      "id": 108170975877442,
      "coverage": 613618
    }, 
    {
      "name": "Physics", 
      "id": 109279729089828,
      "coverage": 942491
    }, 
    {
      "name": "Philosophy", 
      "id": 108026662559095,
      "coverage": 701271
    }
  ]
}
```

### Empregador

Faça referência a empregadores que podem ser direcionados de acordo com ID e nome. Para pesquisar todos os empregadores que começam por `mic`:

```
curl -G \
  -d 'type=adworkemployer' \
  -d 'q=mic' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
  "data": [
    {
      "name": "Western Michigan University", 
      "id": 10022826163,
      "coverage": 24366
    }, 
    {
      "name": "University of Michigan", 
      "id": 21105780752,
      "coverage": 17357
    }, 
    {
      "name": "Michigan State University - SPARTANS", 
      "id": 8891783019,
      "coverage": 65853
    }
  ]
}
```

### Cargo

Todo cargo informado pelo usuário disponível para direcionamento tem uma identificação e um nome. Para ver todos os cargos que incluem `Business Analyst`:

```
curl -G \
  -d 'type=adworkposition' \
  -d 'q=Business Analyst' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v<API_VERSION>/search
```

A resposta:

```
{
   "data": [
    {
      "name": "Business Analyst", 
      "id": 105763692790962,
      "coverage": 282124
    }, 
    {
      "name": "Financial Analyst", 
      "id": 112930925387573,
      "coverage": 212889
    }
  ]
}
```

A resposta contém estes campos:

Nome

Descrição

`name`

Tipo: string

Nome do direcionamento demográfico.

`id`

Tipo: número inteiro

Número de identificação do Facebook do direcionamento demográfico.

`coverage`

Tipo: número inteiro

Tamanho estimado do público-alvo.

`subtext`

Tipo: string

Descrição do público-alvo.

* * *

Os parâmetros a seguir são comuns para essa API. Para ver os tipos específicos de parâmetro de entrada, veja os detalhes abaixo.

Nome do parâmetro

Descrição

`q`

**Obrigatório para a maioria dos tipos de pesquisa**.

String para preencher automaticamente os valores.

`type`

**Obrigatório.**

Tipo dos dados com preenchimento automático a serem recuperados. Veja abaixo.

`list`

**Opcional.**

Recupere os números de identificação global do Facebook preferenciais em vez dos códigos FIPS. Compatível para `adzipcode`.

Quando for usado, o valor precisará ser igual a `GLOBAL`.

`limit`

**Opcional.**

Máximo de resultados apresentados. O padrão é 8.

Com base na categoria de dados com preenchimento automático, insira o `type` apropriado. Para recuperar as localidades, especifique `type=adlocale`. As categorias válidas são:

Valor do parâmetro "type"

Descrição

[adeducationschool](#demo)

Direcionamento por faculdade com preenchimento automático.

[adeducationmajor](#demo)

Direcionamento por curso de graduação na faculdade com preenchimento automático.

[adgeolocation](#geo)

Preenchimento automático combinado de país, cidade, estado e código postal.

adgeolocation.adcountry

Preenchimento automático de país.

adgeolocation.adzipcode

Preenchimento automático de código postal.

adgeolocation.[adgeolocationmeta](#geo-meta)

Metadados adicionais para geolocalizações.

adgeolocation.[adradiussuggestion](#radius)

Mostra o raio recomendado em torno da localização.

[adinterest](#interests)

Direcionamento por localidade com preenchimento automático.

adinterest.[adinterestsuggestion](#interest_suggestions)

Sugestões com base no direcionamento por interesse.

adinterest.[adinterestvalid](/docs/marketing-api/audiences/reference/detailed-targeting#validation)

Valida a string como uma opção válida de direcionamento por interesse.

[adlocale](#locale)

Direcionamento por localidade com preenchimento automático.

adTargetingCategory

Parâmetro `q` ignorado. Veja todas as opções de direcionamento possíveis para a classe com o parâmetro `class`.  
Valores possíveis de `class`: `interests`, `behaviors`, `demographics`, `life_events`, `industries`, `income`, `family_statuses`, `user_device`, `user_os`.

[adworkemployer](#workemployer)

Valores com preenchimento automático para empregador.

[adworkposition](#jobtitle)

Valores com preenchimento automático para cargo.

### Navegação por dados demográficos

Recupere todas as opções possíveis de direcionamento demográfico com `type=adTargetingCategory` e uma `class`.

Nome

Descrição

`class`

Tipo: string

Especifique uma destas opções: `life_events`, `industries`, `income`, `family_statuses`, `user_device`. A especificação `demographics` recupera todas as opções.

  

**As opções de direcionamento demográfico não estão disponíveis em todos os países**. O Facebook poderá apresentar resultados diferentes, inclusive resultados em branco, dependendo da configuração do país de origem do usuário cujo token de acesso está sendo usado para fazer esta chamada de API.

A resposta contém estes campos:

Nome

Descrição

`name`

Tipo: string

Nome do direcionamento demográfico.

`id`

Tipo: número inteiro

O número de identificação do Facebook do direcionamento demográfico.

`audience_size_lower_bound`

_número inteiro_

O tamanho mínimo estimado do público-alvo.

`audience_size_upper_bound`

_número inteiro_

O tamanho máximo estimado do público-alvo.

`description`

Tipo: string

Descrição do público-alvo.

`type`

Tipo: string

Tipo de dados demográficos. É útil se você recuperar todos os dados demográficos.

`path`

Tipo: matriz de strings

Inclui a categoria e todas as categorias principais que se enquadram no direcionamento.

[](#)