---
title: "Graph API Referência v24.0: Product Catalog Product Sets"
source: "https://developers.facebook.com/docs/marketing-api/reference/product-catalog/product_sets/"
scraped_at: "2026-02-01T16:15:56.735Z"
---

Versão Graph API

[v24.0](#)

# Product Catalog Product Sets

[](#)

## Leitura

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Criando

You can make a POST request to `product_sets` edge from the following paths:

-   [`/{product_catalog_id}/product_sets`](/docs/marketing-api/reference/product-catalog/product_sets/)

When posting to this edge, a [ProductSet](/docs/marketing-api/reference/product-set/) will be created.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDKcURL[Graph API Explorer](/tools/explorer/?method=POST&path=%3CPRODUCT_CATALOG_ID%3E%2Fproduct_sets%3Fname%3DTest%2BSet%26filter%3D%257B%2522product_type%2522%253A%257B%2522i_contains%2522%253A%2522shirt%2522%257D%257D&version=v24.0)

```
POST /v24.0/<PRODUCT_CATALOG_ID>/product_sets HTTP/1.1
Host: graph.facebook.com

name=Test+Set&filter=%7B%22product_type%22%3A%7B%22i_contains%22%3A%22shirt%22%7D%7D
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/<PRODUCT_CATALOG_ID>/product_sets',
    array (
      'name' => 'Test Set',
      'filter' => '{"product_type":{"i_contains":"shirt"}}',
    ),
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/<PRODUCT_CATALOG_ID>/product_sets",
    "POST",
    {
        "name": "Test Set",
        "filter": "{\"product_type\":{\"i_contains\":\"shirt\"}}"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("name", "Test Set");
params.putString("filter", "{\"product_type\":{\"i_contains\":\"shirt\"}}");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/<PRODUCT_CATALOG_ID>/product_sets",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"name": @"Test Set",
  @"filter": @"{\"product_type\":{\"i_contains\":\"shirt\"}}",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/<PRODUCT_CATALOG_ID>/product_sets"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```
```
curl -X POST \
  -F 'name="Test Set"' \
  -F 'filter={
       "product_type": {
         "i_contains": "shirt"
       }
     }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v24.0/<PRODUCT_CATALOG_ID>/product_sets
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`filter`

A JSON-encoded rule

Filter rules to define a product set (max length: 500 KiB)

`metadata`

JSON object

Product set metadata, which can be used for creating product collections

`cover_image_url`

URI

cover\_image\_url

`description`

string

description

`external_url`

URI

external\_url

`external_url_handle`

string

external\_url\_handle

`name`

UTF-8 encoded string

Name of the product set

Obrigatório

`publish_to_shops`

array<JSON object>

Shop ids where this product set should be published as collection.

`shop_id`

numeric string

shop\_id

`ordering_index`

int64

ordering\_index

`retailer_id`

UTF-8 encoded string

External product set retailer id

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

10803

Product set with the same filters already exists

100

Invalid parameter

368

The action attempted has been deemed abusive or is otherwise disallowed

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

190

Invalid OAuth 2.0 Access Token

200

Permissions error

80009

There have been too many calls to this Catalog account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Regras do filtro

Criar um conjunto de produtos com um parâmetro `filter` vazio indica que todos os itens no catálogo de produtos devem estar no conjunto. Cada regra é uma cadeia de caracteres codificada com JSON. Um parâmetro `filter` vazio pode ser especificado usando um valor de parâmetro vazio ou um objeto JSON vazio, `{}`.

**Recomendação:** consulte com o tipo de conteúdo `application/json`.

### Limitações

-   Se as regras do filtro que você definir resultarem em um conjunto de produtos vazio, os anúncios vinculados a esse conjunto não serão veiculados.
    
-   Os operadores `contains` só podem ser usados para correspondência de string ao criar conjuntos de produtos. Para valores `enum`, use os operadores `eq`.
    
-   Os operadores de filtro não diferenciam letras maiúsculas e minúsculas. No entanto, os operadores `i_*` ainda podem ser usados.
    
-   Você não pode usar caracteres Unicode que não estejam em inglês para filtros em rótulos.
    

Para obter uma lista completa de limitações e exemplos, junto com dicas úteis sobre como usar caracteres de pontuação para criar e gerenciar conjuntos de produtos, [veja este artigo da Central de Ajuda para Empresas](https://www.facebook.com/business/help/741923962861190)

  

As regras do filtro são compostas pelos campos e operadores a seguir:

### Campos

Campo

Descrição

`age_group`

As informações demográficas de um item. Há somente 5 valores aceitos: `newborn`, `infant`, `toddler`, `kids` e `adult`.

`agent_fb_page_id`

O ID único do agente.

`availability`

A disponibilidade do item do produto, do classificado de imóveis ou do veículo. Valores predefinidos para **produtos**: `preorder`, `in stock`, `out of stock` e `available for order`. Valores compatíveis para **anúncios dinâmicos**: `for_sale`, `for_rent`, `sale_pending`, `recently_sold`, `off_market`, `available_soon`. Valor compatível para o **Marketplace**: `for_rent`. Valores compatíveis para **veículos**: `available`, `not_available`. Nota: os veículos que estão indisponíveis em um anúncio não são visíveis ao público.

`base_price_amount`

O preço de base por noite em um hotel. Especifique o valor com a moeda. `base_price_amount` é o valor do `base_price`. `base_price_currency` é a moeda para o `base_price`.

`body_style`

O estilo de carroceria do veículo. Valores compatíveis para o Marketplace e anúncios dinâmicos: `CONVERTIBLE`, `COUPE`, `CROSSOVER`, `HATCHBACK`, `MINIVAN`, `TRUCK`, `SEDAN`, `SMALL_CAR`, `SUV`, `VAN`, `WAGON`, `OTHER`.

`brand`

A marca de um item do produto ou hotel.

`category`

A categoria do item.

`city`

A cidade onde fica um hotel, um destino, uma concessionária de automóveis ou um classificado de imóveis.

`city_id`

O ID da cidade do item do produto.

`city_page_id`

O valor a ser usado em um URL de deep link (`template_URL`) no criativo do anúncio.

`color`

Tipo: cadeia de caracteres. A cor do item.

`condition`

A condição de um item do produto ou veículo. Valores compatíveis para produtos: `new`, `refurbished` e `used`. Valores compatíveis para veículos: `Excellent`, `Good`, `Fair`, `Poor`, `Other`.

`country`

O país onde fica um hotel, um classificado de imóveis, uma concessionária de automóveis ou um destino.

`currency`

A abreviação da moeda para o preço de um item, hotel, classificado de imóveis, destino ou uma concessionária de automóveis.

`custom_label_0`

O valor do rótulo personalizado de um item do produto, hotel, destino, veículo ou classificado de imóveis.

`custom_label_1`

O valor de um rótulo personalizado de um item do produto, hotel ou destino.

`custom_label_2`

O valor de um rótulo personalizado de um item do produto, hotel ou destino.

`custom_label_3`

O valor de um rótulo personalizado de um item do produto, hotel ou destino.

`custom_label_4`

O valor de um rótulo personalizado de um item do produto, hotel ou destino.

`date_first_on_lot`

A data em que um veículo chegou à concessionária. Usado para indicar a idade do inventário. Deve estar no formato _aaaa-mm-dd_. Exemplo: `2018-09-05`

`date_first_on_lot_time`

A data e a hora em que um veículo chegou à concessionária.

`days_on_market`

O número de dias que um classificado de imóveis está no mercado.

`dealer_communication_channel`

O método que será usado pelo comprador para entrar em contato com o vendedor de automóveis. Valores compatíveis: `CHAT` e `LEAD_FORM`. `LEAD_FORM` está sujeito à disponibilidade regional: quando essa opção estiver indisponível, todos os classificados serão forçados para `CHAT`, independentemente do valor inserido.

`dealer_id`

O ID alfanumérico de uma concessionária de automóveis.

`dealer_name`

O nome da concessionária de automóveis.

`drivetrain`

O sistema de transmissão do veículo. Valores compatíveis: `4X2`, `4X4`, `AWD`, `FWD`, `RWD`, `Other`.

`description`

A descrição de uma rota de voo, classificado de imóveis ou destino.

`destination_airport`

Código IATA do destino. Compatível com o código IATA do aeroporto e da cidade. Use a pesquisa de código IATA para validar códigos IATA. Para melhorar o desempenho, evite usar espaços neste ID único.

`destination_city`

O nome da cidade de destino. Exemplo: `New York`

`destination_id`

O ID único do destino em um catálogo. Será feita a correspondência do ID com qualquer `content_ids` fornecido nos seus eventos de pixel e do app de `destination`.

`exterior_color`

A cor externa de um veículo

`feed_id`

O ID do feed de produtos a que o item pertence.

`flight_id`

O ID definido para um voo.

`fuel_type`

O tipo de combustível designado para um veículo. Valores compatíveis: `DIESEL`, `ELECTRIC`, `GASOLINE`, `FLEX`, `HYBRID` e `OTHER`.

`furnish_type`

O tipo de mobiliário disponível para um classificado de imóveis: `furnished`, `unfurnished`, `semi-furnished`.

`gender`

O gênero do item do produto. Há somente 3 valores aceitos: `male`, `female` e `unisex`.

`home_listing_id`

O ID único granular de um classificado de imóveis (apartamento, unidade em condomínio, casa).

`hotel_id`

O ID único do hotel em um catálogo. Será feita a correspondência do ID com qualquer `content_ids` fornecido nos seus eventos de pixel e do app de hotel.

`image_tags`

Uma cadeia de caracteres que descreve uma imagem. É possível associar diversas tags a uma imagem. Exemplo: \[para classificados de imóveis\]`Fitness Center`, `Swimming Pool`, \[para veículos\] `Exterior`, `Interior`, `StockImage`. Para veículos, siga esta convenção de nomenclatura: `(image[0].url`, `image[0].tag[0]`, `image[0].tag[1])`. Para anúncios de oferta de veículos, `Lease Offer`, `Financing` e assim por diante. Na estrutura `image[0].tag[m]`, incremente o valor `m` para adicionar outras tags.

Quando um arquivo CSV/TSV é usado, dois formatos diferentes são compatíveis: usar um cabeçalho de imagem semelhante a: `image[0].url`, `image[1].url` e assim por diante. Usar uma cadeia de caracteres JSON simples semelhante a: `"[{url:'https://images.com/1.jpg'},{url:'https://images.com/2.jpg'}]"`

`interior_color`

A cor interna do veículo.

`listing_type`

O tipo do classificado de imóveis. Valores compatíveis para o Marketplace: `for_rent_by_agent`, `for_rent_by_owner`. Valores compatíveis para anúncios dinâmicos: `for_rent_by_agent`, `for_rent_by_owner`, `for_sale_by_agent`, `for_sale_by_owner`, `foreclosed`, `new_construction`, `new_listing`.

`make`

A marca de um veículo. Exemplo: `Ford`

`margin_level`

Um indicador da lucratividade de um hotel, com valor entre `1` e `10`.

`market_id`

O mercado onde uma oferta é qualificada. Escolha essa opção para o caso de uso TWO FEED, para correspondência com o feed de mercado. Para ofertas regionais, este campo é obrigatório e deve corresponder ao `market_id` fornecido no feed de mercado. Para ofertas nacionais (ofertas aplicáveis a todos os EUA), este campo deve ficar vazio.

`material`

O material ou o tecido de que um produto é feito. Exemplo: “Couro”, “Brim”, “Camurça”.

`mileage_unit`

A unidade de milhagem de um veículo em milhas (`MI`) ou quilômetros (`KM`).

`mileage_value`

Para automóveis usados, a milhagem atual de um veículo em milhas (`MI`) ou quilômetros (`KM`). Para veículos novos, use `0`. Os veículos no Marketplace devem ter mais de 500 milhas/quilômetros rodados.

`model`

O nome do produto de um veículo e, às vezes, uma variedade de produtos. Exemplo: `Focus`

`name`

O nome de um item do produto, hotel, classificado de imóveis ou destino.

`neighborhood`

O bairro onde está localizado um hotel ou um classificado de imóveis. Se houver mais de um bairro, inclua colunas adicionais e use a sintaxe de caminho JSON em cada nome de coluna para indicar o número de bairros.

`neighborhood_id`

O ID do bairro de um item do produto.

`num_baths`

O número total de banheiros do classificado de imóveis. Precisa ser pelo menos `1`.

`num_beds`

O número total de quartos do classificado de imóveis. Para um estúdio, o valor pode ser `0`.

`number_of_raters`

O número de pessoas que classificaram um hotel.

`num_of_valid_guest_rating`

O número de estrelas do hotel. Por exemplo, quando você faz a reserva em um hotel que tem uma classificação 9 de 10.

`num_rooms`

O número total de cômodos do classificado de imóveis.

`num_units`

O número total de unidades em um edifício. Use apenas para apartamentos ou unidades em condomínios, disponíveis para aluguel.

`offer_type`

O tipo de oferta: `lease`, `finance`, `cash`.

`one_way_price`

Preço de um voo de ida. Você deve definir o valor com a moeda.

`origin_airport`

O código IATA da origem de um aeroporto. Compatível com códigos IATA do aeroporto e da cidade. Use a pesquisa de código IATA para validar códigos IATA.

`origin_city`

O nome da cidade de origem do voo.

`pattern`

A estampa ou impressão gráfica apresentada em um produto. Exemplo: “Poá”, “Listrado”, “Estampado cashmere”.

`postal_code`

O código postal ou CEP designado para a localização de um hotel, classificado de imóveis ou uma concessionária de automóveis. Opcional para países sem sistema de código postal.

`postal_codes`

Para anúncios de oferta de veículos, a lista de códigos postais para o mercado específico fornecida neste formato: `['94025', '94536']`.

`price`

O preço de um voo, um classificado de imóveis, um veículo ou um destino. Você deve definir o valor com a moeda.

`price_amount`

O preço multiplicado por 100, para todas as moedas. Exemplo: `490`, quando usado com USD, significa US$ 4,90. Já `49000`, quando usado com JPY, significa ¥ 490.

`price_change`

A mudança de preço para um destino. Os valores incluem: `0` (sem mudança de preço), `–10` (queda de 10% do preço), `20` (aumento de 20% do preço).

`priority`

A prioridade de um voo ou hotel. Valores entre `0` (prioridade mais baixa) e `5` (prioridade mais alta). Um voo sem um valor é definido por padrão como `0`.

`product_expiration_time`

A data de validade, quando o produto não está mais disponível. Você pode definir uma data de validade e, se tiver um anúncio em veiculação, ele buscará apenas os produtos não expirados. Por exemplo, se o prazo de validade for hoje, a partir dessa data o produto não aparecerá mais nos anúncios.

`product_feed_id`

O ID do Facebook para o feed de produtos de um item do produto, voo, hotel, classificado de imóveis, veículo, destino ou uma oferta de veículo.

`product_group_id`

O ID do Facebook do grupo de produtos de um item do produto.

`product_item_id`

O ID do Facebook de um item do produto.

`product_type`

A categoria de um item do produto definida pelo varejista.

`property_type`

O tipo de propriedade do classificado de imóveis. Valores compatíveis para o Marketplace: `apartment`, `builder_floor`, `condo`, `house`, `house_in_condominium`, `house_in_villa`, `loft`, `penthouse`, `studio`, `townhouse`, `other`. Valores compatíveis para anúncios dinâmicos: `apartment`, `condo`, `house`, `land`, `manufactured`, `townhouse`, `other`.

`rating_system`

O sistema em que a `guest_rating` está baseada. Exemplos: Expedia, TripAdvisor

`region`

Estado, condado, região ou província de um classificado de imóveis ou uma concessionária de automóveis.

`region_id`

O ID definido pela região de um item do produto ou uma concessionária de automóveis.

`retailer_id`

O ID definido pelo varejista de um item do produto, voo, hotel, classificado de imóveis, veículo, destino ou uma oferta de veículo.

`retailer_product_group_id`

O ID de um grupo de produtos definido pelo varejista.

`review_status`

Isso está relacionado à análise dinâmica. Informa se o produto foi aceito ou rejeitado no processo de análise. Os valores podem ser `rejected`, `pending`, `approved`.

`sale_price`

O valor de venda ou preço especial de um veículo.

`sale_price_amount`

Para produtos: o preço de venda de um item do produto multiplicado por 100, para todas as moedas. Exemplo: `490`, quando usado com USD, significa US$ 4,90. Já `49000`, quando usado com JPY, significa ¥ 490. Para hotéis: custo de venda com desconto e moeda de uma estadia em hotel, com base em `checkin_date` e `length_of_stay`.

`score`

Valor da pontuação de classificação do hotel. Exemplo: `7.8`

`size`

O tamanho de um item de produto. Exemplo: “XG”, “16 34/35”, “33 infantil”

`star_rating_float`

Classificação do hotel por estrelas. Valores válidos: `1` a `5` e deve ser um múltiplo de 0,5. Exemplo: `3`, `4.5`

`state_of_vehicle`

O estado atual de um veículo: `New`, `Used`, `CPO` (usado certificado).

`title`

O nome completo do veículo. Máximo de caracteres: 500. O título é relevante e específico a cada veículo e deve conter o que está definido nos campos `year`, `make`, `model` e `trim`. Exemplo: `SE Ford Certified and 6-Speed Automatic`

`transmission`

O tipo de transmissão do veículo: `Automatic` ou `Manual`.

`trim`

O acabamento do veículo. Máximo de caracteres de `5DR HB SE`: 50.

`url`

O link para um site externo onde você pode visualizar um voo. Se um deep link for especificado no nível do anúncio, ele terá precedência.

`vehicle_ID`

O ID único do veículo. Pode ser a variante de um veículo. Se houver várias instâncias desse ID, todas elas serão ignoradas. Em ofertas de veículos, é o ID que pode ser usado pelos anunciantes para identificar uma oferta. Esse também é o mesmo valor passado sob o parâmetro `content_id` no pixel.

`vehicle_registration_plate`

Uma placa de metal ou plástico fixada a um veículo motorizado ou reboque para fins de identificação oficial. Para o Marketplace, é necessária uma placa de registro do veículo no Reino Unido.

`vehicle_type`

O tipo de veículo: `car_truck` (por padrão, se não fornecido), `boat`, `commercial`, `motorcycle`, `powersport`, `rv_camper`, `trailer` ou `other`.

`vendor_ID`

O ID de um item do produto definido pelo fornecedor.

`vin`

O número de identificação do veículo (VIN). O VIN deve ter exatamente 17 caracteres e não é necessário para veículos anteriores a 1983. O VIN é obrigatório em todos os países onde o Marketplace está disponível. No Reino Unido, na França e no Brasil, é necessária uma placa de registro do veículo em vez de um VIN.

`visibility`

Alterne a visibilidade no item do produto. Valores compatíveis: `published`, `staging`, `hidden`, `whitelist_only`. Os itens no modo `staging` não ficam visíveis para os compradores e não estão disponíveis para a inclusão de rótulos de produto no Instagram nem para anúncios dinâmicos.

`year`

O ano em que um veículo foi lançado no formato `yyyy`.

### Operadores

[Em 3 de março de 2022](/docs/graph-api/changelog/non-versioned-changes/mar-3-2022), alteramos a forma como determinados filtros funcionam para conjuntos de produtos. Isso inclui os filtros `contains`, `not_contains`, `lt`, `gt`, `lte`, `gte` e `starts_with`. Você tem 90 dias para atualizar seus filtros. Se houver conjuntos do seu catálogo usando os filtros afetados após 1º de junho de 2022, os itens desses conjuntos poderão sofrer alterações. Isso significa que itens diferentes podem ser exibidos nos anúncios ou nas lojas que usam esses conjuntos. Consulte o [registro de alterações](/docs/graph-api/changelog/non-versioned-changes/mar-3-2022) para saber mais.

Operador

Tipo de filtro

`and`

Retorna produtos que correspondem a todos os valores da consulta. Por exemplo, `"color": {"red" and "shoe" and "running"}` só devolverá produtos que correspondam aos três valores de consulta, como "sapato vermelho de corrida".

`contains`

Retorna produtos que correspondem a uma cadeia de caracteres de consulta. Por exemplo, `category: {"contains": "running shoe"}` retornará todos os produtos que contenham a cadeia de caracteres de consulta, como "sapato de corrida vermelho", "sapato de corrida azul" e "sapato de corrida para crianças".

`or`

Retorna produtos que correspondem a apenas um valor da consulta. Por exemplo, `category: {"running" or "walking"}` retornará produtos que correspondam a "corrida" ou "caminhada", mas não a ambos.

`not_contains`

Retorna produtos que não correspondem a uma cadeia de caracteres de consulta. Por exemplo, `category: {"not_contains": running shoe"}` retornará todos os produtos que não contenham a cadeia de caracteres de consulta, como "sapato de caminhada vermelho", "sandálias" e "botas".

`is_any`

Retorna produtos que correspondem a qualquer valor de uma lista de valores de consulta. Por exemplo, `"color": {"is_any": "black", "blue", "brown"}` retornará qualquer produto que corresponda a pelo menos uma cadeia de caracteres de consulta, como "botas pretas", "botas azuis", "botas marrom".

`is_not_any`

Retorna produtos que não correspondem a qualquer valor de uma lista de cadeias de caracteres de consulta. Por exemplo, `"color": {"is_not_any": "black", "blue", "brown"}` retornará todos os produtos que não correspondam a nenhum dos valores da consulta, como "botas vermelhas", "botas amarelas" e "botas verdes".

`eq`

Retorna produtos que correspondem exatamente a um valor da consulta. Por exemplo, `"brand": {"eq": "Instagram"}` só fará a correspondência com os produtos da marca "Instagram".

`neq`

Retorna produtos que não correspondem exatamente a um valor da consulta. Por exemplo, `"brand": {"eq": "Instagram"}` só fará a correspondência com os produtos da marca "Instagram".

`lt`

int

Retorna produtos que são menores do que um valor numérico de consulta. Por exemplo, `"priority": {"lt": 3}` só fará a correspondência com produtos que tenham prioridade inferior a 3.

`lte`

int

Retorna produtos que são menores ou iguais a um valor numérico de consulta. Por exemplo, `"priority": {"lte": 3}` só fará a correspondência com produtos que tenham prioridade menor ou igual a 3.

`gt`

int

Retorna produtos que são maiores do que um valor numérico de consulta. Por exemplo, `"priority": {"gt": 3}` só fará a correspondência com produtos que tenham prioridade superior a 3.

`gte`

int

Retorna produtos que são maiores ou iguais a um valor numérico de consulta. Por exemplo, `"priority": {"gte": 3}` só fará a correspondência com produtos que tenham prioridade maior ou igual a 3.

`starts_with`

Retorna produtos que correspondem a qualquer cadeia de caracteres que comece com a cadeia de caracteres de consulta. Por exemplo, `"small"` retornará qualquer produto que comece com a cadeia de caracteres de consulta, como "sandálias pequenas", "camiseta pequena", "botas pequenas e azuis". **Observação:** no momento, essa opção de filtro só está disponível para o campo de categoria do produto. Para outros campos, use o filtro `contains`.

### Exemplos de filtros

_Texto formatado para facilitar a leitura._  
  

Para criar um conjunto de produtos que corresponda a IDs de produtos específicos, envie uma solicitação `POST` para o ponto de extremidade `/PRODUCT-CATALOG-ID/product_sets` e defina o campo de filtro `retailer_id` como o operador `is_any` e uma série de IDs de produtos.

`curl -i -X POST`  
`"https://graph.facebook.com/API-VERSION/PRODUCT-CATALOG-ID/product_sets`  
`?name=Sample Product Set`  
`&filter={`  
`'retailer_id': {`  
`'is_any': ['pid1', 'pid2']`  
`}`  
`}`  
`&access_token=ACCESS-TOKEN"`

  

Para criar um conjunto de produtos que corresponda a todas as camisas, envie uma solicitação `POST` para o ponto de extremidade `/PRODUCT-CATALOG-ID/product_sets` e defina o campo de filtro `i_contains` como o operador `shirt` e a cadeia de caracteres `product_type`.

`curl -i - X POST`  
`"https://graph.facebook.com/API-VERSION/PRODUCT-CATALOG-ID/product_sets`  
`&name=New Product Set Name`  
`&filter={`  
`'product_type': {`  
`'i_contains': 'shirt'`  
`}`  
`}`  
`&access_token=ACCESS-TOKEN"`

Cada regra é uma cadeia de caracteres codificada com JSON.

**Recomendação:** consulte com o tipo de conteúdo `application/json`.

### Exemplos de filtro de regras

Regra

Descrição

```
{"category": {"eq": "Luggage & Bags"}}
```

Faça a correspondência de todos os produtos na categoria "Malas e bolsas".

```
{"retailer_id": {"is_any": ["pid1", "pid2"]}}
```

Faça a correspondência de todos os produtos com o ID do varejista “pid1” ou “pid2”.

```
{ "or": [{"retailer_product_group_id": {"eq": "group_1"}},{"product_type": {"i_contains": "shirt"}}]}
```

Faça a correspondência de todos os produtos com o `retailer_product_group_id` igual a grupo\_1 ou `product_type` contendo “camisa”.

[](#)