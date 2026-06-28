---
title: "Públicos Semelhantes - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/guides/lookalike-audiences"
scraped_at: "2026-02-01T13:57:45.046Z"
---

# Públicos semelhantes

Beginning September 2, 2025, we will start to roll out more proactive restrictions on custom audiences that may suggest information not permitted under our terms. For example, any custom audience or lookalike audience suggesting specific health conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit score", "high income") will be flagged and prevented from being used to run ad campaigns.

**What these restrictions mean for your campaigns:**

-   You won't be able to use flagged custom audiences when creating new campaigns.
-   If you have an active campaign using flagged custom audiences, you should edit or pause it and choose a different audience to avoid performance and delivery issues.

**For API developers:**

-   Beginning September 2, 2025, `operation_statu`s will return `471` to signal if your custom audiences have been flagged.

More information on this update and how to resolve flagged custom audiences can be found [here](https://www.facebook.com/business/help/1055828013359808).

Configure o direcionamento de modo a alcançar pessoas mais parecidas com seus clientes estabelecidos. Os públicos ´semelhantes tomam vários conjuntos de pessoas como “sementes”, e depois o Facebook cria um público com pessoas semelhantes. Use semelhantes para qualquer objetivo da empresa: direcionamento para pessoas parecidas com seus clientes para fins de aquisição de fãs, registro no site, compras fora do Facebook, resgates de cupom ou apenas para impulsionar o reconhecimento de uma marca.

Os públicos-semente podem ser:

-   [Públicos personalizados existentes;](#custom-audience)
    
-   [conversões de campanha ou de conjunto de anúncios;](#campaign)
    
-   [fãs da Página.](#page_fan_lookalikes)
    

O Facebook atualizará os membros semelhantes a cada 3 dias se o semelhante pertencer a um grupo de anúncios.

## Criar

**Os públicos semelhantes podem levar de 1 a 6 horas para que sejam totalmente preenchidos.** Enquanto os públicos são preenchidos, você pode criar e executar conjuntos de anúncios direcionados ao público. Quando o público estiver pronto, o Facebook veiculará o anúncio às pessoas que preencheram o público, e a veiculação de anúncios será ajustada e funcionará normalmente. Consulte [Status de veiculação](#delivery-status). Crie um público semelhante em `https://graph.facebook.com/{API_VERSION}/act_{AD_ACCOUNT_ID}/customaudiences`.

Exemplo de chamada para a criação de um público semelhante usando um público personalizado:

```
v24.0
```

Para criar públicos semelhantes com o [SDK de Anúncios para PHP](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-php-ads-sdk&h=AT3t-fzX7g88Eo9GO5M8_RpHiplHrvuGZm8v9m4TKRxDjWgwwO3K3z7js36McBY5onE6upELEMVZN0a6BQLKqawwDbZNRmlzBb_FWxOPndPx5VuzTvZjdgO6rU_8wYp9OejCnxAsSLIOfBm9jFZtmJVWw5gKf7V8BRtDpSuhq5c) ou o [SDK de Anúncios para Python](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-python-ads-sdk&h=AT0lm-N0LINhVyFB6bfZECKIYG27afb5oWJi06NyPKquHK5puWsG1YptmM5BykQFTdMjllypCmVa_L6OGWWjW8wJ_NW6fh0AdnfMAQ620Euv63B3OtuD7ENi3kP_8oCOADQlMkzpbR1xQoqUMRIEoFdk2aCrxRax509JfHCsq2Q), use `CustomAudience`.

A resposta contém o seguinte:

Nome

Descrição

`id`

tipo: número inteiro

ID do público semelhante.

### Semelhante a público personalizado

Se você tiver um público personalizado com pelo menos 100 pessoas, será possível usá-lo como base para criar públicos semelhantes. Isso abrange públicos personalizados para seu site e públicos personalizados do app para celular.

Nome

Descrição

`name`

tipo: cadeia de caracteres

**Obrigatório.**

Nome do público personalizado

`origin_audience_id`

Tipo: longo

**Obrigatório.**

O ID do público personalizado. Públicos de origem devem ter pelo menos 100 membros.

`lookalike_spec`

tipo: matriz

**Obrigatório.**

Consulte a descrição abaixo.

`lookalike_spec.type`

tipo: cadeia de caracteres

**Obrigatório. Defina `type` ou `ratio`.**

`similarity` ou `reach`.

`lookalike_spec.starting_ratio`

tipo: flutuante

**Opcional.**

A porcentagem inicial de um semelhante. Por exemplo, um semelhante criado com `starting_ratio` de 0,01 e `ratio` de 0,02 corresponderá a 1%-2% do segmento semelhante. `starting_ratio` deve ser menor que a proporção.

`lookalike_spec.ratio`

tipo: flutuante

**Obrigatório. Defina `type` ou `ratio`.**

`0.01`\-`0.20` mais 0,01. Primeiros x% do público original em um país selecionado.

`lookalike_spec.allow_international_seeds`

tipo: booliano

**Opcional.**

Pelo menos 100 membros do público de origem de um país. Se `allow_international_seeds` for `true`, o Facebook encontrará esse número mínimo de membros do público em outro país. O padrão é `false`.

`lookalike_spec.country`

tipo: cadeia de caracteres

**Obrigatório. Defina `country` ou `location_spec`.**

Encontre membros de público semelhante nesse país.

`lookalike_spec.location_spec`

tipo: matriz

**Obrigatório. `country` ou `location_spec`.**

Encontre membros do público nessas localizações. Lista ou grupos de países, como `Asia`.

`lookalike_spec.location_spec.geo_locations`

tipo: matriz

**Obrigatório. Pelo menos uma entrada em `countries` ou `country_groups`.**

Inclui essas localizações.

`lookalike_spec.location_spec.geo_locations.countries`

tipo: matriz de cadeias de caracteres

**Opcional.**

Direcione por países. Matriz de códigos de países. Consulte a seção [Países da documentação da API de Pesquisa de Direcionamento](/docs/reference/ads-api/get-autocomplete-data/#countries). **Exemplo**: `'countries': ['US']`

`lookalike_spec.location_spec.geo_locations.country_groups`

tipo: matriz de cadeias de caracteres

**Opcional.**

Direcionamento por países em regiões globais e áreas de livre comércio. Matriz de códigos de grupos de países. Para opções completas, consulte o campo [`country_groups` em Localização da documentação sobre direcionamento](/docs/marketing-api/buying-api/targeting#location) e [`country_groups` em Pesquisa de direcionamento](/docs/marketing-api/targeting-search/v2.8#country_group). **Exemplo**: `'country_groups': ['asia','mercosur']`

`lookalike_spec.location_spec.excluded_geo_locations`

tipo: matriz

**Opcional.**

Localizações a excluir.

`lookalike_spec.location_spec.excluded_geo_locations.countries`

tipo: matriz de cadeias de caracteres

**Opcional.**

Igual a `countries` em `geo_locations`.

`lookalike_spec.location_spec.excluded_geo_locations.country_groups`

tipo: matriz de cadeias de caracteres

**Opcional.**

Igual a `country_groups` em `geo_locations`.

### Tipos

Otimize seu público para “Similaridade” ou “Maior alcance”.

-   Similaridade - O público abrange o primeiro 1% de pessoas em um país selecionado mais semelhantes ao Público de origem personalizado. O alcance do novo público é menor e a correspondência é mais precisa.
    
-   Maior alcance - O público abrange os primeiros 5% de pessoas em um país selecionado mais semelhantes ao Público de origem personalizado, mas como correspondência menos precisa.
    

**Em vez de usar tipos, você pode definir `ratio` manualmente para representar os primeiros x% do público no país selecionado.** A `ratio` deve estar entre 1% e 20% e em intervalos de 1%.

### Semelhantes de conversão de campanha ou conjunto de anúncios

O Facebook tem semelhantes de conversão de campanha e conjunto de anúncios para direcionar por pessoas similares àquelas que fazem conversões de campanhas ou conjuntos de anúncios anteriores ou atuais (por exemplo, campanhas ou anúncios que estão sendo otimizados para conversões). As conversões são mensuradas com base em um tipo de campanha ou de conjunto de anúncios nas [especificações de conversão](https://developers.facebook.com/docs/reference/ads-api/conversion-specs). Por exemplo, o direcionamento por pessoas que realizaram uma ação no seu site ou instalaram seu app dentro de 28 dias após clicar no seu anúncio.

```
v24.0
```

Você precisa de pelo menos 100 conversões únicas de campanhas ou conjuntos de anúncios. Mais conversores resultam em um melhor modelo preditivo e sugerimos 200 ou mais membros que tenham feito uma conversão. Você deve selecionar também campanhas ou conjuntos de anúncios com objetivos semelhantes.

Para criar esse semelhante, especifique um ou mais conjuntos de anúncios ou campanhas. Por exemplo, especifique uma campanha e dois conjuntos de anúncios de outra campanha.

O Facebook usa até 180 dias de dados de conversões anteriores e identifica pessoas que convertem em campanhas e conjuntos de anúncios como exemplos. Treinamos o modelo preditivo e depois criamos um público semelhante. O Facebook atualiza constantemente o modelo de previsão subjacente como campanhas ou conjuntos de anúncios para gerar novas conversões.

Nome

Descrição

`lookalike_spec`

tipo: matriz

**Obrigatório.**

Consulte a descrição abaixo.

`lookalike_spec.origin_ids`

Tipo: matriz de números inteiros

**Obrigatório.**

Matriz de IDs de objetos de anúncio. Pessoas que converteram esses anúncios são usadas para servir de modelo para um semelhante. Uma ou mais **identificações de campanha ou do conjunto de anúncios**, ou então uma combinação destes.

`lookalike_spec.conversion_type`

tipo: cadeia de caracteres

**Obrigatório.**

`campaign_conversions`. Indica que o público é um semelhante de conversão de campanha.

`lookalike_spec.country`

tipo: cadeia de caracteres

**Obrigatório.**

País para encontrar membros semelhantes.

`lookalike_spec.allow_international_seeds`

tipo: booliano

**Opcional.**

Pelo menos 100 membros do público de origem de um país. Se `allow_international_seeds` for `true`, o Facebook encontrará esse número mínimo de membros em outro país. O padrão é `false`.

`lookalike_spec.starting_ratio`

tipo: flutuante

**Opcional.**

A porcentagem inicial de um semelhante. Por exemplo, um semelhante criado com `starting_ratio` de 0,01 e `ratio` de 0,02 corresponderá a 1%-2% do segmento semelhante. `starting_ratio` deve ser menor que `ratio`.

`lookalike_spec.ratio`

tipo: flutuante

**Obrigatório.**

Intervalo de `0.01` a `0.20`. Primeiros x% do público original no país selecionado.

No momento, os seguintes tipos de conversão de campanha estão qualificados para públicos semelhantes:

-   Cliques no link
    
-   Anúncios de oferta
    
-   Curtidas na Página
    
-   Instalações do app Canvas
    
-   Participações no evento
    
-   Engajamento com o post
    
-   Conversões no site
    
-   Instalações do aplicativo para celular
    
-   Engajamento com o app para celular
    
-   Visualizações do vídeo
    
-   Divulgação nas imediações
    

### Semelhantes de fãs da Página

Crie um público semelhante com base nas pessoas que curtem sua Página:

```
v24.0
```

Nome

Descrição

`lookalike_spec`

tipo: matriz

**Obrigatório.**

Consulte a descrição abaixo.

`lookalike_spec.page_id`

tipo: int

**Obrigatório.**

O número de identificação do Facebook da página cujos fãs serão usados para o semelhante.

`lookalike_spec.conversion_type`

tipo: cadeia de caracteres

**Obrigatório.**

`page_like` indica que é um semelhante de fã da Página.

`lookalike_spec.country`

tipo: cadeia de caracteres

**Obrigatório.**

O país no qual encontrar as pessoas semelhantes. O padrão é "US" (EUA).

`lookalike_spec.allow_international_seeds`

tipo: booliano

**Opcional.**

É necessário ter pelo menos 100 membros no público de origem de um país. Se o mínimo não for atingido e `allow_international_seeds` for `true`, o Facebook encontrará esse número mínimo de membros do público de origem em outro país. O padrão é `false`.

`lookalike_spec.starting_ratio`

tipo: flutuante

**Opcional.**

Porcentagem inicial de semelhante. Por exemplo, uma starting\_ratio de 0,01 e uma taxa de 0,02 criariam um semelhante a partir de 1% a 2% de um segmento semelhante. O valor de starting\_ratio deve sempre ser inferior a essa taxa.

`lookalike_spec.ratio`

tipo: flutuante

**Obrigatório.**

Intervalo de 0,01 a 0,20. Indica quanto do país o semelhante deve usar no direcionamento.

### Públicos personalizados e semelhantes sinalizados

Se o público de origem for sinalizado com um `operation_status` de `471`, as tentativas de criar um público semelhante com base no público de origem falharão com um erro.

```
{
  "error": {
    "message": "Invalid parameter",
    "code": 100,
    "error_subcode": 1713232,
    "error_user_title": "Seed audience restricted",
    "error_user_msg": "The seed audience you selected cannot be used to create a lookalike audience because it has integrity restrictions. Please use a different seed audience",
  },
}
```

[](#)

## Direcionamento

O direcionamento por semelhantes é o mesmo que por **públicos personalizados**. Consulte [Custom Audience](/docs/reference/ads-api/custom-audience-targeting/#targeting). Isso também se aplica ao direcionamento por exclusão e pela conjunção `AND`. Para fazer o direcionamento quando você cria um anúncio:

```
v24.0
```

Veja mais exemplos em [Especificações de direcionamento](/docs/reference/ads-api/targeting-specs).

[](#)

## Como gerenciar públicos

Consulte detalhes sobre públicos personalizados usados para criar semelhantes. Retornamos os mesmos campos que nos [públicos personalizados](/docs/reference/ads-api/custom-audience-targeting/#read). Confira abaixo um exemplo de resposta para um público personalizado que foi usado para criar semelhantes. `lookalike_audience_ids` especifica quais semelhantes foram gerados com base nesse público.

```
{
  "id": "6006164557194",
  "account_id": 12345,
  "approximate_count": 816400,
  "lookalike_audience_ids": [
    6006183285954,
    6006183285955
  ],
  "name": "Boys Apparel",
  "parent_audience_id": 0,
  "parent_category": "Custom",
  "status": "ready",
  "subtype": "CUSTOM",
  "type": 4,
  "type_name": "Advertiser Generated",
  "time_updated": 1362439491
},
```

Os públicos semelhantes contêm um `subtype` igual a 2. Também retornamos `lookalike_spec`, uma matriz no seguinte formato:

Nome

Descrição

`type`

tipo: cadeia de caracteres

`similarity`, `reach` ou `custom_ratio` – sempre retornado.

`starting_ratio`

tipo: flutuante

Retornado se `starting_ratio` for especificada.

`ratio`

tipo: flutuante

Múltiplo de `0.01`. Retornado se `type` for `custom_ratio`.

`country`

tipo: cadeia de caracteres

Código do país.

`origin`

tipo: matriz

Consulte a descrição abaixo.

`origin.deleted`

tipo: booliano

`true` – retornado quando a origem for excluída.

`origin.id`

tipo: int

ID de origem.

`origin.name`

tipo: cadeia de caracteres

Nome de origem.

`origin.type`

tipo: cadeia de caracteres

`custom_audience` ou `page`.

`target_countries`

tipo: matriz de cadeias de caracteres

São todos os países usados para criar o público.

Confira abaixo outro público em que `subtype` é `LOOKALIKE`:

```
{
 "id": "6006183285954",
 "account_id": 12345,
 "approximate_count": 1782100,
 "name": "Boys Apparel_lookalike_US_Similarity",
 "origin_audience_id": 6006567610735,
 "parent_audience_id": 0,
 "parent_category": "Custom",
 "status": "ready",
 "subtype": "LOOKALIKE",
 "type": 4,
 "type_name": "Advertiser Generated",
 "time_updated": 1362506552
},
```

### Status de veiculação

Depois que você criar um público semelhante, retornaremos um ID de público personalizado. Pode levar em torno de uma hora para que um público seja totalmente preenchido. O status pode ser recuperado em `/{lookalike_audience_ID}?fields=delivery_status`. Isso retornará uma resposta JSON com `delivery_status` ou com o código 200 se um público for preenchido:

```
"delivery_status": {
  "code": 200, 
  "description": "This audience is ready for use."
},
```

Para fins de teste, verifique o status da lista com o [Gerenciador de Anúncios](https://www.facebook.com/ads/audience_manager/).

Os passos necessários para excluir um público semelhante são os mesmos usados em [públicos personalizados](/docs/reference/ads-api/custom-audience-targeting/).

[](#)

## Públicos inativos

Um público semelhante será considerado inativo se não for usado em anúncios ativos por 90 dias. Os públicos semelhantes inativos têm diferentes `approximate_count`, `operation_status` e `delivery_estimate`.

Campo

Alterações para semelhantes inativos

`approximate_count`

Não é possível recuperar um tamanho. Uma chamada a esse campo retorna `-1` para semelhantes inativos.

`operation_status`

`450`: este público semelhante está inativo. Pode ser usado em anúncios, mas não terá uma estimativa até que a campanha seja publicada.  
`100`: caso um público não seja usado em um conjunto de anúncios ativo por mais de dois anos, o processo de expiração será iniciado. Os públicos expirados que permanecerem sem uso por 90 dias serão excluídos.  
`471`: o público semelhante foi sinalizado por motivos de integridade.

`delivery_estimate`

Não é possível recuperar uma estimativa de veiculação. Uma chamada a esse campo retorna `-1` para semelhantes inativos. O campo está disponível nos nós de conta de anúncios e de conjunto de anúncios. Os dois apresentam o mesmo comportamento com semelhantes inativos.

`delete_time`

Se o `operation_status` de um público estiver marcado como "a expirar" (código `100`), o campo `delete_time` informará quando esse público será excluído em tempo Unix.

Ainda será possível iniciar uma campanha usando um público semelhante inativo. As informações da estimativa de alcance serão disponibilizadas depois que o novo anúncio for publicado.

### Exclusão

Para todos os anunciantes: a partir de 8 de junho de 2021, o status "Público a expirar" será aplicado automaticamente quando um público ficar inativo por mais de dois anos. Em outras palavras, se um público não for usado em um conjunto de anúncios ativo por mais de dois anos, ele será sinalizado automaticamente como um "Público a expirar". Além disso, quando o público for programado para exclusão, o campo `delete_time` será marcado com o tempo estimado para que isso aconteça (ou seja, 90 dias a partir do momento da sinalização).

Depois disso, você poderá excluir proativamente o público ou usá-lo em um conjunto de anúncios ativo para evitar a exclusão. É possível ver quais dos seus públicos estão na fase de expiração a qualquer momento. Para isso, use os filtros nos campos `operation_status` ou `delete_time`.

Para mais informações, consulte a documentação de [visão geral sobre Públicos Personalizados](/docs/marketing-api/audiences/overview#custom-audiences-deletion).

[](#)

## Boas práticas

-   Público de origem personalizado – Faça com que ele seja o maior possível para que tenhamos dados suficientes para encontrar pessoas semelhantes.
    
-   Combine semelhantes – Use outros direcionamentos do Facebook para interesses e dados demográficos adicionais.
    
-   É possível que os semelhantes gerados não reflitam atributos do público de origem, como gênero ou geografia.
    

[](#)

## Próximas alterações nos semelhantes

**ATUALIZAÇÃO DE 28 DE ABRIL DE 2021:** a remoção dos parâmetros `location_spec` e `country` da criação de públicos semelhantes está atrasada. Divulgaremos atualizações em breve sobre o início da implementação dessa mudança.

Removeremos os parâmetros `location_spec` e `country` da criação de públicos semelhantes. A localização dos semelhantes será definida de acordo com o país informado na especificação de direcionamento da campanha. A localização de direcionamento não estará na especificação do público semelhante. A estimativa de alcance da campanha que usar um público semelhante recém-criado será preenchida apenas algumas horas depois da publicação do anúncio.

A alteração não será aplicada a campanhas existentes. Somente campanhas novas e editadas serão afetadas pelo requisito.

Converteremos automaticamente os públicos semelhantes antigos em semelhantes novos sem localizações de direcionamento.

### Alterações na criação de semelhantes

#### Alterações no parâmetro de localização

**Ponto de extremidade:** `act_{AD_ACCOUNT_ID}/customaudiences`

**Exemplo de solicitação**

```
curl POST \
  -F 'name=My lookalike audience' \
  -F 'subtype=LOOKALIKE' \
  -F 'origin_audience_id=<SEED_AUDIENCE_ID>' \
  -F ‘lookalike_spec={
  "is_financial_service":false,
  "allow_international_seeds":true,
  "ratio":0.01,
  "type":"custom_ratio"}
  	’}\
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v2.11/act_<AD_ACCOUNT_ID>/customaudiences
```

Os seguintes parâmetros serão ignorados caso sejam transmitidos durante a criação:

-   `lookalike_spec.country`
    
-   `lookalike_spec.location_spec`
    
-   `lookalike_spec.location_spec.geo_locations`
    
-   `lookalike_spec.location_spec.geo_locations.countries`
    
-   `lookalike_spec.location_spec.geo_locations.country_groups`
    
-   `lookalike_spec.location_spec.excluded_geo_locations`
    
-   `lookalike_spec.location_spec.excluded_geo_locations.countries`
    
-   `lookalike_spec.location_spec.excluded_geo_locations.country_groups`
    

#### Alterações no parâmetro de tamanho

**Ponto de extremidade:** `act_{AD_ACCOUNT_ID}?fields=approximate_count`

Nenhum tamanho será associado aos novos públicos semelhantes, e o campo `approximate_count` retornará `-1` para todos os públicos desse tipo.

**Exemplo de Resposta**

```
{
    "approximate_count": -1,
    "id": "6126486105659",
}
```

#### Status de veiculação e operação

**Pontos de extremidade:**

-   `{AD_ACCOUNT_ID}?fields=delivery_status`
    
-   `{AD_ACCOUNT_ID}?fields=operation_status`
    

No caso de públicos semelhantes antigos com especificações de localização, o campo `delivery_status` retornará um código `400` com a descrição `This audience is disabled.` Para públicos semelhantes novos, será retornado um código `200`.

No caso de públicos semelhantes antigos com especificações de localização, o campo `operation_status` retornará uma notificação sobre a desativação desse recurso. Para públicos semelhantes novos, um código `200` será retornado com a resposta de descrição `Normal`.

Consulte [Custom Audience](/docs/marketing-api/reference/custom-audience/) para saber mais sobre esses campos.

### Alterações nos conjuntos de anúncios

#### Criação e edição de anúncios

Se o direcionamento das campanhas existentes com os semelhantes antigos for editado, atualizaremos automaticamente os anúncios para que usem os novos semelhantes. Não será possível usar o semelhante antigo nas campanhas de anúncios recém-criadas.

Por conta da exclusão das especificações de localização do processo de criação de público semelhante, será necessário definir alvos de localização durante a criação do conjunto de anúncios. A criação de um conjunto de anúncios sem o direcionamento por localização resultará em erro.

Todas as alterações acima também serão aplicáveis quando os públicos forem incluídos em `excluded_custom_audiences`, `flexible_spec` e `exclusions` na campanha.

**Ponto de extremidade:** `act_{AD_ACCOUNT_ID}/adsets`

**Exemplo de solicitação**

```
curl POST \
  -F 'targeting={
        "geo_locations":{
            "countries":["US"],
        },
        "age_min":25,
        "age_max":40,
        "custom_audiences":[{"id": <CUSTOM_AUDIENCE_ID>}]
  ‘}\
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v2.11/act_<AD_ACCOUNT_ID>/adsets
```

A criação de um conjunto de anúncios sem o direcionamento por localização resultará em erro.

```
{
  "error": {
    "message": "Invalid parameter",
    "type": "FacebookApiException",
    "code": 100,
    "error_data": {
      "blame_field_specs": [["targeting" ] ]
    },
    "error_subcode": 192342134,
    "is_transient": false,
    "error_user_title": "Missing Location while using Lookalike",
    "error_user_msg": "You need to use a location with your lookalike    audience.",
    "fbtrace_id": "F78cCCJoZPx"
  },
  "__fb_trace_id__": "F78cCCJoZPx",
  "__www_request_id__": "AcwlIc7_uK5uTXjzjIa38yc"
}
```

Caso você tente editar um conjunto de anúncios que contenha um semelhante antigo compartilhado sem ter um semelhante novo correspondente na conta de anúncios proprietária, essa ação resultará em erro. Para resolver o problema, solicite que a conta de anúncios proprietária compartilhe o novo público semelhante com você.

```
{
  "error": {
    "message": "Invalid parameter",
    "type": "FacebookApiException",
    "code": 100,
    "error_data": {
      "blame_field_specs": [["targeting" ] ]
    },
    "error_subcode": 192342135,
    "is_transient": false,
    "error_user_title": "",
    "error_user_msg": "Please ask the owner of the audience 1234 to share the new lookalike which does not contain location with you. You will be able to use the new audience"
    "fbtrace_id": "F78cCCJoZPx"
  },
  "__fb_trace_id__": "F78cCCJoZPx",
  "__www_request_id__": "AcwlIc7_uK5uTXjzjIa38yc"
}
```

#### Compartilhamento de públicos semelhantes

Durante o período de implantação dessas alterações, não será possível usar a API para compartilhar semelhantes entre contas que estejam dentro e fora do escopo da atualização. Use o Gerenciador de Públicos para os compartilhamentos. Depois de 24 de maio de 2021, você poderá continuar a usar o compartilhamento via API na documentação para desenvolvedores a seguir para compartilhar públicos semelhantes novos entre contas de anúncios.

**Ponto de extremidade:** `{AD_ACCOUNT_ID}/adaccounts?adaccounts={SHARED_TO_AD_ACCOUNT_ID}`

### Alterações nas estimativas de alcance e veiculação

**Pontos de extremidade:**

-   `act_{AD_ACCOUNT_ID}/reachestimate`
    
-   `act_{AD_ACCOUNT_ID}/delivery_estimate`
    

Esses pontos de extremidade retornaram um parâmetro `targeting_status` novo com uma das descrições a seguir:

-   `lookalike_container_without_country` – Um novo semelhante não tem país especificado no direcionamento de campanha. É necessário informar um país para ver o número estimado de usuários.
    
-   `lookalike_container_without_delivery_lookalike` – O semelhante novo não tem um semelhante de back-end correspondente. Para ter alcance de fato, o novo semelhante deve ser usado em um conjunto de anúncios.
    
-   `none` – Não há problemas com o alcance.
    

O ponto de extremidade `reachestimate` retornará `-1` para o parâmetro `users` na primeira vez que um novo público semelhante e direcionamento por país forem usados. Depois disso, o número estimado de usuários será retornado.

Os parâmetros `estimate_dau` e `estimate_mau` retornarão `-1` para o parâmetro `users` na primeira vez que um novo público semelhante e direcionamento por país forem usados. Depois disso, o número estimado de usuários será retornado.

**Exemplo de respostas**

```
// Reach estimate response
{
    "users": -1,
    "estimate_ready": true,
    "targeting_status": "lookalike_container_without_delivery_lookalike"
}

// Delivery estimate response

{
    "data": [{
        "daily_outcomes_curve": [{
            "spend": 0,
            "reach": 0,
            "impressions": 0,
            "actions": 0
        }],
        "estimate_dau": -1,
        "estimate_mau": -1,
        "estimate_ready": true ,
        "targeting_status": "lookalike_container_without_delivery_lookalike"
    }]
}
```

### Perguntas frequentes

[Quando essas alterações entraram em vigor?](#faq_467740007927154)

As alterações entrarão em vigor na data de lançamento da versão 11 da API de Marketing, quando aplicaremos a mudança a todas as versões.

[Link permanente](#faq_467740007927154)

[Durante o lançamento, poderei compartilhar os novos semelhantes que não têm especificações de localização com outras contas de anúncios em semelhantes antigos?](#faq_435528734540615)

Durante o período entre as versões 10 e 11 da API de Marketing, não haverá suporte para o compartilhamento de semelhantes via API entre as contas de anúncios afetadas por essa mudança e as que estão fora do escopo das atualizações. Use o Gerenciador de Públicos para controlar o compartilhamento. Após o lançamento da versão 11 da API de Marketing, você poderá continuar usando o compartilhamento via API para compartilhar novos Públicos Semelhantes entre contas de anúncios.

[Link permanente](#faq_435528734540615)

[](#)