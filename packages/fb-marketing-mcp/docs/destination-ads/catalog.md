---
title: "Catálogo de destinos - Criativo do anúncio"
source: "https://developers.facebook.com/docs/marketing-api/destination-ads/catalog"
scraped_at: "2026-02-01T14:11:15.898Z"
---

# Anúncios de destino – Catálogo e feed

Você precisa compartilhar informações sobre destinos para promovê-los no Facebook. Para isso, crie um catálogo e preencha-o com destinos.

[Carregue arquivos CSV ou XML para "feeds de destino" com os destinos que você quer promover](#destination-feed).

Você pode criar e gerenciar seu catálogo de destinos no [Gerenciador de Comércio](https://www.facebook.com/products).

Para usar a API no gerenciamento do seu catálogo:

1.  [Crie um catálogo de destinos](#destination-catalog)
2.  [Carregue seu feed no Facebook](#feed-upload)
3.  [Crie conjuntos de produtos a partir do catálogo de destinos](#destination-catalog)
4.  [Associe o catálogo às suas origens de evento](#event-sources)

## Feed de destino – Carregar os destinos no Facebook

Um feed de destino é um arquivo com os destinos que você quer promover. Cada linha ou item no arquivo representa um destino único. Você pode usar um mais feeds de destino, desde que o conjunto dos feeds reúna todos os destinos que você quer promover.

### Formatos de feed de destino aceitos

#### CSV – Exemplo e descrição

[Exemplo de CSV](https://lookaside.facebook.com/developers/resources/?id=destination_example.csv) | [Exemplo de TSV (simples)](https://lookaside.facebook.com/developers/resources/?id=dat_destinations_flattened.tsv) | [Exemplo de TSV (estilo JSON)](https://lookaside.facebook.com/developers/resources/?id=dat_destinations_json.tsv)

-   A primeira linha deve listar os nomes de campo escolhidos na ordem em que os valores serão fornecidos. As linhas seguintes informam os valores correspondentes para cada destino.
    
-   Os campos com espaços em branco ou vírgulas devem ficar entre `"`aspas duplas`"`.
    
-   Campos aninhados ou com diversos valores (como `address`, `neighborhood` ou `image`) podem ser representados por meio de valores codificados em JSON ou por um conjunto de colunas de texto "simples" rotuladas com a sintaxe de caminho JSON, por exemplo, `address.city`, `neighborhood[0]`, `image[0].url`, `image[0].tag[0]` e `image[0].tag[1]`. As duas convenções podem ser usadas alternadamente no mesmo arquivo.
    

#### XML – Exemplo e descrição

[Exemplo de XML](https://lookaside.facebook.com/developers/resources/?id=dat_destination_feed.xml)

-   Um nó XML raiz `<listings>` inclui um conjunto de nós `<listing>`, cada um representando um destino.
    
-   O arquivo deve iniciar por uma tag de declaração `<?xml` válida.
    

O analisador de feed detecta automaticamente codificações de texto `UTF8`, `UTF16` ou `UTF32` e adota `LATIN1` como padrão caso encontre sequências de byte inesperadas. É possível fornecer texto nos valores de campo em qualquer idioma, **mas os nomes de campo devem ser fornecidos exatamente como mostrado abaixo, em inglês.**

### Campos compatíveis – Destinos

Os campos compatíveis a seguir foram criados para itens que você adiciona ao seu catálogo de produtos.

Para catálogos localizados, consulte os [campos aceitos para destinos](#).

Nome e tipo de campo

Descrição

`destination_id`

tipo: string

**Obrigatório.**

Comprimento máximo: 100

Seu identificador único para o destino no catálogo. Será associado a todos os `content_ids` fornecidos no seu app de `destination` e nos eventos de pixel. **Dica**: para aumentar o desempenho, evite usar espaços nesse campo de identificador único.

`address`

tipo: objeto

**Obrigatório.**

O endereço completo do destino. Deve levar à própria localização.

Consulte [**Parâmetros do objeto Address**](#address-object)

`image`

tipo: objeto

**Obrigatório.**

Máximo de itens: 20

Os dados de imagem desse destino. Você pode fornecer até 20 imagens do destino. Cada uma delas contém dois campos: `url` e `tag`. Você pode ter várias tags associadas a uma imagem. É necessário fornecer pelo menos uma `image`. Cada imagem pode ter até 4 MB.

Consulte [**Parâmetros do objeto Image**](#image-object).

`url`

tipo: string

**Obrigatório.**

O link do site externo em que você pode visualizar a página de destino. Também é possível especificar um URL no [nível do anúncio](/docs/marketing-api/dynamic-ads-for-travel/ads-management#creative) por meio de `template_url_spec`. Os URLs no nível do anúncio têm prioridade sobre os URLs no feed.

`type`

tipo: string

**Obrigatório.**

Máximo de itens: 20

O tipo de destino, por exemplo, praia, cidade, gastronomia, passeios, cultura, história, compras, museus, tranquilidade, paisagens, natureza, arquitetura, empresa, povo simpático, relaxamento, mercado noturno, montanha, templo, trilhas, snorkeling e assim por diante. Diversos tipos podem ser associados a um só destino, como `beach` e `sightseeing`.

`name`

tipo: string

**Obrigatório.**

O nome mais comum do destino.

`neighborhood`

tipo: string

**Opcional.**

Máximo de itens: 20

Um ou mais bairros do destino.

Exemplos: `Soho` e `Las Vegas Strip`

`latitude`

tipo: float

**Opcional.**

A latitude do destino.

Exemplo: `37.484100`

`longitude`

tipo: float

**Opcional.**

A longitude do destino.

Exemplo: `-122.148252`

`description`

tipo: string

**Opcional.**

Tamanho máximo: 5.000

Um parágrafo curto que descreve o destino.

`price`

tipo: string

**Opcional.** O preço mais baixo ou o preço médio do destino. Você deve definir o valor com a moeda.

Exemplo: `99.99 USD`

`price_change`

tipo: int

**Opcional.** Uma alteração no preço:

-   **0** – sem alteração
    
-   **\-10** – redução de 10%
    
-   **20** – aumento de 20%
    

Esse campo pode ser usado no criativo universal ("redução de X no preço médio") e para desenvolver conjuntos de produtos.

`applink`

tipo: elemento

**Opcional.** Um deep link que usa [App Links](/docs/applinks) para encaminhar diretamente à página de detalhes do destino no seu app para celular. Especifique os deep links em ordem de prioridade, da mais alta à mais baixa:

1.  No [nível do anúncio](/docs/marketing-api/dynamic-ads-for-travel/ads-management), usando `template_url_spec`.
2.  Aqui no feed, via [**objeto Applink**](#applink-object).
3.  Ao adicionar [metatags de App Link](/docs/applinks) ao seu site.

`status`

Tipo: string

Controla se um item está ativo ou foi arquivado no seu catálogo. Apenas itens ativos podem ser vistos por pessoas nos seus anúncios, lojas ou outros canais. Valores compatíveis: `active`, `archived`. Os itens estão ativos por padrão. Saiba mais sobre [como arquivar itens](https://www.facebook.com/business/help/543317109402043?id=725943027795860).

  

Exemplo: `active`

  

**Observação**: algumas plataformas parceiras como a Shopify podem sincronizar itens ao seu catálogo com um status chamado **staging**. Ele se comporta da mesma forma que `archived`.

Esse campo era chamado anteriormente de `visibility`. Apesar da compatibilidade do antigo nome desse campo, recomendamos que você use o novo nome.

`custom_label_0`  
`custom_label_1`  
`custom_label_2`  
`custom_label_3`  
`custom_label_4`

Tipo: string

Limite máximo de caracteres: 100

Até cinco campos personalizados para as informações adicionais que deseja usar para filtrar os itens ao criar conjuntos. Por exemplo, você pode usar um campo personalizado para indicar todos os itens que fazem parte de uma liquidação de verão e, em seguida, filtrar esses itens para formar um conjunto. Esse campo é compatível com qualquer valor de texto, incluindo números.

  

Exemplo: `Summer Sale`

Esse campo é compatível com feeds complementares.

`custom_number_0`  
`custom_number_1`  
`custom_number_2`  
`custom_number_3`  
`custom_number_4`

Tipo: int

Até cinco campos personalizados para informações numéricas adicionais que você quer usar para filtrar itens ao criar conjuntos. Esse campo permite que você filtre por intervalos de números (**é maior que** e **é menor que**) ao criar um conjunto. Por exemplo, é possível usar esse campo para indicar o ano de produção de um item e filtrar um intervalo de anos específico no conjunto.

  

Esse campo é compatível com números inteiros entre 0 e 4294967295. Não é possível usar números negativos, vírgulas ou pontos, como -2, 5,5 ou 10.000.

  

Exemplo: `2022`

`internal_label`

Tipo: string

Adicione rótulos internos para ajudar a filtrar itens quando estiver criando [conjuntos de produtos](https://www.facebook.com/business/help/620275848114281?id=725943027795860). Por exemplo, você poderia adicionar um rótulo de "verão" a todos os itens que fazem parte de uma promoção de verão e depois filtrar esses itens para formar um conjunto. Apenas você poderá ver esses rótulos.

Coloque cada rótulo entre aspas simples (') e separe vários rótulos com vírgulas (,). Não inclua espaços em branco no início nem no fim de um rótulo. Limite: 5.000 rótulos por produto e 110 caracteres por rótulo.

Exemplo (TSV, XLSX, Planilhas Google): \['verão','tendência'\]

Exemplo (CSV): “\['verão','tendência'\]”

**Observação**: se você estiver usando rótulos personalizados (`custom_label_0` a `custom_label_4`) para filtrar conjuntos de produtos, recomendamos fazer a troca para os rótulos internos (`internal_label`). Ao contrário dos rótulos personalizados, você pode adicionar ou atualizar rótulos internos sempre que necessário sem enviar itens por meio de uma análise da política, o que pode afetar a veiculação de anúncios.

Antes, esse campo era chamado de `product_tags`. Apesar da compatibilidade do antigo nome desse campo, recomendamos que você use o novo nome.

[](#)

## Deep links de produtos

[Forneça deep links](https://developers.internmc.facebook.com/docs/marketing-api/catalog/guides/product-deep-links/) no feed seguindo a especificação de [App Links](https://developers.facebook.com/docs/applinks). As informações de deep link no feed têm prioridade sobre as que o Facebook coleta com metadados de App Links no nosso rastreador da web.

Não será necessário especificar esses dados se você já tiver informações de deep link do App Links. O Facebook usa as informações do App Links para exibir o deep link certo. Para exibir deep links nos seus anúncios, consulte a documentação sobre os [modelos de anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/ads-management/#adtemplate).

[](#)

## Parâmetros do objeto Image

Nome e tipo de campo

Descrição

`url`

tipo: string

**Obrigatório.**

O URL da imagem do destino. Siga estas especificações de imagem:

-   Todas as imagens precisam estar em formato JPG, GIF ou PNG.
    
-   Para anúncios em carrossel e em coleções: as imagens são exibidas no formato quadrado (1:1). O tamanho mínimo da imagem é 500 x 500 px. Recomendamos 1.024 x 1.024 px para garantir melhor qualidade.
    
-   Para anúncios de imagem única: a imagem é exibida na taxa de proporção 1.91:1. O tamanho mínimo da imagem é 500 x 500 px. Recomendamos 1.200 x 628 px para garantir melhor qualidade.
    

`tag`

tipo: string

**Opcional.**

Uma string que representa o que está na imagem. Pode haver diversas tags associadas a uma imagem.

Exemplos: `Fitness Center` e `Swimming Pool`

`INSTAGRAM_STANDARD_PREFERRED` – permite que os anunciantes marquem uma imagem específica no próprio feed como a imagem-padrão a ser usada no Instagram. A tag diferencia letras maiúsculas de minúsculas.

[](#)

## Parâmetros do objeto Address

Os campos aninhados ou com diversos valores (como `address`) podem ser representados por valores JSON codificados ou por um conjunto de colunas simples, com texto sem formatação, rotuladas usando a sintaxe de caminho JSON (como `address.region`). As duas convenções podem ser usadas alternadamente no mesmo arquivo.

Nome e tipo de campo

Descrição

`addr1` (`address.addr1`)

tipo: string

O endereço do destino.

Exemplo: `675 El Camino Real`

`address.city` (`city`)

tipo: string

**Obrigatório.**

A cidade do destino.

Exemplo: `Palo Alto`

`address.region` (`region`)

tipo: string

**Obrigatório.**

O estado, condado, região ou província do destino.

Exemplo: `California`

`address.postal_code` (`postal_code`)

tipo: string

O CEP ou código postal do destino. **Obrigatório** a não ser que o país não tenha sistema de código postal.

Exemplos:

-   `94125`
    
-   `NW1 3FG`
    

`address.country` (`country`)

tipo: string

**Obrigatório.**

O país do destino.

Exemplo: `United States`

`address.city_id` (`city_id`)

tipo: string

O valor para uso em URL de deep link (`template_url`) no criativo universal.

#### Parâmetros do objeto Applink

Se você tiver aplicativos separados para iPhone e iPad, insira informações específicas do iPhone e iPad. Caso contrário, especifique somente informações do iOS.

Nome e tipo de campo

Descrição

`ios_url`

tipo: cadeia de caracteres

Um esquema personalizado para o aplicativo iOS.

Exemplo: `example-ios://electronic`

`ios_app_store_id`

tipo: cadeia de caracteres

O ID do aplicativo da App Store.

Exemplo: 1234

`ios_app_name`

tipo: cadeia de caracteres

O nome do aplicativo (adequado para exibição).

Exemplo: `Electronic Example iOS`

`iphone_url`

tipo: cadeia de caracteres

Um esquema personalizado para o aplicativo do iPhone.

Exemplo: `example-iphone://electronic`

`iphone_app_store_id`

tipo: cadeia de caracteres

O ID do aplicativo da App Store.

Exemplo: `5678`

`iphone_app_name`

tipo: cadeia de caracteres

O nome do aplicativo (adequado para exibição).

Exemplo: `Electronic Example iPhone`

`ipad_url`

tipo: cadeia de caracteres

Um esquema personalizado para o aplicativo do iPhone.

Exemplo: `example-ipad://electronic`

`ipad_app_store_id`

tipo: cadeia de caracteres

O ID do aplicativo da App Store.

Exemplo: `9010`

`ipad_app_name`

tipo: cadeia de caracteres

O nome do aplicativo (adequado para exibição).

Exemplo: `Electronic Example iPad`

`android_url`

tipo: cadeia de caracteres

Um esquema personalizado para o aplicativo do Android.

Exemplo: `example-android://electronic`

`android_package`

tipo: cadeia de caracteres

Um nome de pacote totalmente qualificado para geração de intenção.

Exemplo: `com.electronic`

`android_class`

tipo: cadeia de caracteres

Um nome de classe de atividade totalmente qualificado para geração de intenção.

Exemplo: `com.electronic.Example`

`android_app_name`

tipo: cadeia de caracteres

O nome do aplicativo (adequado para exibição).

Exemplo: `Electronic Example Android`

[](#)

**As seções a seguir são relevantes apenas para gerenciar seus catálogos com a API.**

## Criar um catálogo de destinos por meio da API

Um catálogo de destinos é um contêiner para os destinos que você quer promover. Para usar a API de catálogo, verifique se você tem o [nível de acesso à API de Marketing](/docs/marketing-api/access#limits) adequado e se aceitou os [Termos de Serviço](https://business.facebook.com/legal/product_catalog_terms/) ao criar seu primeiro catálogo por meio do [Gerenciador de Negócios](https://business.facebook.com/).

Defina `vertical` como `destinations` para criar um catálogo para anúncios de destino.

```
curl -X POST \
  -F 'name="Test Destination Catalog"' \
  -F 'vertical="destinations"' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/v10.0/BUSINESS_ID/owned_product_catalogs
```

[](#)

## Carregar feeds de destino pela API

Depois de criar o catálogo, será necessário carregar seus feeds de destino no Facebook. Use a API para criar um objeto Feed para todo feed que você queira carregar. Aceitamos carregamentos agendados e diretos.

Em caso de carregamentos agendados, especifique uma programação ao criar o feed. Em carregamentos não agendados, não especifique uma programação.

Em qualquer caso, a resposta é:

```
{ "id" : <PRODUCT_FEED_ID> }
```

Depois que você criar o feed (com ou sem programação), poderá fazer um carregamento único do feed usando a `PRODUCT_FEED_ID`:

```
curl \
-F "url=http://www.example.com/sample_feed.xml" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/uploads
```

Em caso de carregamentos programados, especifique uma programação ao criar o feed. Para carregamentos não programados, não especifique uma programação.

```
v24.0
```

Em qualquer caso, a resposta é:

```
{ "id" : <PRODUCT_FEED_ID> }
```

Depois de criar o feed (com ou sem programação), você poderá fazer um carregamento único do feed usando a `PRODUCT_FEED_ID`:

```
curl \
-F "url=http://www.example.com/sample_feed.xml" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<PRODUCT_FEED_ID>/uploads
```

[](#)

## Filtrar catálogo para conjuntos de destinos

Um conjunto de destinos é um subconjunto do seu catálogo. Você precisa de um conjunto desse tipo para configurar anúncios de destino. Portanto, é necessário criar pelo menos um conjunto.

Os conjuntos de destinos são definidos por filtros aplicados ao catálogo correspondente. Por exemplo, você pode criar um conjunto com todos os destinos cujo preço diminuiu consideravelmente. Lembre-se de que também é possível criar um conjunto de destinos sem nenhum filtro. Nesse caso, o conjunto terá todos os destinos do seu catálogo.

```
v24.0
```

O parâmetro `filter` é formado pelos seguintes operadores e dados:

Operadores

Tipo de filtro

`i_contains`

Contém substring. O operador não diferencia letras maiúsculas de minúsculas.

`i_not_contains`

Não contém substring. O operador não diferencia letras maiúsculas de minúsculas.

`contains`

Contém substring. O operador não diferencia letras maiúsculas de minúsculas.

`not_contains`

Não contém substring. O operador não diferencia letras maiúsculas de minúsculas.

`eq`

Igual a. O operador não diferencia letras maiúsculas de minúsculas.

`neq`

Não é igual a. O operador não diferencia letras maiúsculas de minúsculas.

`lt`

Menor que. Somente para campos numéricos.

`lte`

Menor ou igual a. Somente para campos numéricos.

`gt`

Maior que. Somente para campos numéricos.

`gte`

Maior ou igual a. Somente para campos numéricos.

Dados

Dados que estão sendo filtrados

`country`

O país do destino.

`price`

O preço do destino. O valor está em centavos.

`currency`

Moeda.

`price_change`

Uma redução ou aumento no preço.

`city`

A cidade do destino.

`description`

A descrição do destino.

`name`

O nome do destino.

`destination_set_id`

Seu identificador único para o destino no catálogo.

[](#)

## Associe o catálogo às suas origens de eventos

Para mapear os dados das suas origens de evento (pixels e eventos do aplicativo) para seu catálogo, todo catálogo deve ser associado a essas origens de eventos. Para isso, acesse sua [página do catálogo do Gerenciador de negócios](https://business.facebook.com/settings/product-catalogs/) e clique no botão **Associar fonte**. Não se esqueça de selecionar o aplicativo e o pixel que estão recebendo os eventos de viagem. Como alternativa, você pode usar a API.

Ao fazer a chamada à API, especifique os seguintes parâmetros:

Nome e tipo do parâmetro

Descrição

`external_event_sources`

tipo: `int[]`

Uma lista de IDs do pixel e do aplicativo a ser associada ao catálogo.

[](#)