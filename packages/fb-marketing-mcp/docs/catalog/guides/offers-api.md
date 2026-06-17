---
title: "API de Ofertas - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/offers-api"
scraped_at: "2026-02-01T15:52:55.929Z"
---

# API de Ofertas

Use esta API para adicionar informações de ofertas ao seu [catálogo de produtos](/docs/marketing-api/reference/product-catalog/) para comercializar itens promocionais no Facebook e Instagram. Os vendedores que tiverem a finalização da compra do Facebook ou do Instagram habilitada poderão permitir que os compradores resgatem ofertas diretamente nas tecnologias da Meta.

## Criar Ofertas

Você pode criar ofertas usando um feed ou de modo manual por meio do Gerenciador de Comércio da Meta.

### Feed

Para criar um Feed de Ofertas, faça uma solicitação `POST` para a borda [/{product\_catalog\_id}/product\_feeds](/docs/marketing-api/reference/product-feed#Creating) e defina `feed_type` como `OFFER`. Ao postar usando essa borda, um Feed de Produtos do tipo "Ofertas" será criado para o catálogo especificado no campo `product_catalog_id`.

Depois que o Feed de Ofertas for criado, você poderá carregar os dados da oferta ao fazer uma solicitação `POST` para a borda [`/{product_feed_id}/uploads`](/docs/marketing-api/reference/product-feed/uploads#Creating).

#### Colunas do feed

É possível definir a maioria dos [campos disponíveis](#available-fields) listados abaixo como colunas no arquivo do feed. Os campos marcados como "Somente leitura" não poderão ser definidos durante o processo de criação.

[](#)

## Glossário

#### Conjuntos de produtos

Um [conjunto de produtos](docs/marketing-api/reference/product-set/) é um grupo de itens relacionados em um catálogo.

#### Itens em oferta

Estes são os produtos em oferta.

#### Pré-requisitos da oferta

Estes são os pré-requisitos que precisam ser atendidos para que a oferta seja aplicada. Por exemplo, você pode determinar que a oferta só será válida quando as pessoas comprarem uma quantidade mínima de produtos ou atingirem uma quantidade ou um valor subtotal desses produtos. No momento, os produtos de pré-requisito são derivados dos produtos em oferta. Por exemplo, uma oferta de 20% de desconto em todos os sapatos significa que os requisitos mínimos de subtotal/quantidade devem ser atendidos com sapatos no carrinho.

#### Tipo de aplicação da oferta

O tipo de aplicação especifica como uma oferta aparece na finalização da compra, seja no seu site ou no Facebook. Por exemplo, esse campo pode ser usado para determinar se uma oferta é aplicada automaticamente na finalização da compra ou se exige que um código de cupom seja resgatado. Ele também informa quando há uma combinação de ofertas. Para saber mais, consulte a seção [Como combinar ofertas](#combining-offers).

[](#)

## Campos básicos

Os campos abaixo podem ser usados ​​para configurar todos os tipos de oferta.

Campo

Descrição

`id`

Tipo: `numeric string`

**Somente leitura.**

Um identificador único (ID do Facebook) do item.

`offer_id`

tipo: `string`

**Obrigatório.**

Um vendedor fornece o identificador da oferta.

  

Este campo é usado para identificar de modo exclusivo uma oferta em um catálogo.

`title`

tipo: `string`

**Opcional.**

Um título para o item em oferta.

  

No momento, o título é usado apenas para identificar ofertas no Gerenciador de Comércio e não é exibido aos compradores.

`description`

tipo: `string`

**Somente leitura.**

A descrição gerada automaticamente para a oferta.

`application_type`

Tipo: `enum{SALE, AUTOMATIC_AT_CHECKOUT, BUYER_APPLIED}`

**Obrigatório.**

Determina como e quando uma oferta será aplicada. Opções disponíveis:

-   `SALE`: os itens são ofertados a valores reduzidos, que aparecem como preços tachados para os compradores. Estas ofertas não exigem pré-requisitos do comprador e não são afetadas por outros itens na finalização da compra. A oferta que o mostra o item com menor preço é sempre escolhida, já que as promoções nunca são combinadas. As promoções podem ser combinadas com outros tipos de oferta, mas são sempre aplicadas primeiro. Se um produto já tiver o campo `sale_price` definido, o preço final será calculado usando o `sale_price` como valor de base.
    
-   `AUTOMATIC_AT_CHECKOUT`: a oferta é aplicada automaticamente na finalização da compra quando o comprador atende aos critérios de resgate necessários. Esta oferta tem configurações que a impedem de se qualificar como uma promoção. Ela só pode ser combinada com combos promocionais. É possível ter no máximo 25 ofertas desse tipo ativas ao mesmo tempo.
    
-   `BUYER_APPLIED`: esta oferta é aplicada na finalização da compra com base em uma ação realizada pelo comprador, como inserir um código promocional. No momento, não é possível combinar essas ofertas entre si nem com ofertas que aparecem automaticamente na finalização da compra. **É preciso fornecer `public_coupon_code` ou `coupon_codes`.**
    

`coupon_codes`

Tipo: `Array<string>`

Lista de códigos de cupom que não diferenciam maiúsculas de minúsculas e que são usados pelos clientes para resgatar a oferta na finalização da compra. É permitido usar até 100 códigos de cupom. Por exemplo: `["10OFF", "HOLIDAY_SALE"]`

  

Os códigos de cupom só poderão ser especificados quando o `application_type` for `BUYER_APPLIED`.

  

Se este campo for definido, `public_coupon_code` precisará ser nulo.

`public_coupon_code`

tipo: `string`

**Opcional.**

Um código de cupom que não diferencia maiúsculas de minúsculas e que será comercializado com a oferta e preenchido automaticamente na finalização da compra se o comprador atender aos pré-requisitos da promoção.

  

Por padrão, as ofertas com códigos de cupom não são exibidas aos compradores nas plataformas de compras do Facebook ou Instagram, como ocorre com uma página de detalhes do produto. Isso evita que códigos privados ou secretos sejam expostos acidentalmente aos compradores. Você pode alterar essa configuração especificando um código de cupom público para usar na comercialização da sua oferta. As ofertas com códigos públicos serão exibidas da mesma forma que as com `application_type` de `AUTOMATIC_AT_CHECKOUT`, mas incluirão o texto do código.

  

Um código de cupom público não pode exceder 20 caracteres. Além disso, seu catálogo pode conter no máximo 10 ofertas ativas com códigos de cupom públicos por vez.

  

Um código de cupom público só poderá ser definido quando o `application_type` for `BUYER_APPLIED`.

  

Se este campo for definido, `coupon_codes` precisará ser nulo.

`start_date_time`

Tipo: `timestamp`

**Obrigatório.**

É o registro de data e hora UNIX, em segundos, indicando a data de início da oferta.

  

A entrada pode ser um registro de data e hora UNIX, em segundos, ou uma string de data no formato [ISO-8601](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_8601&h=AT3pIPb5V7qR0JT3o5TFKsylrGjypu_lSAjzfndigjd3GK8nBRflSoYW_Hz1PWhRKuU_xwxRXDr8VAkGkh_z93hjbJ83GsqmZ9p0lrehEJEQzqaZdpWVOMM4imRmu0xeLl1FqAMGlUMbKuTZFhQLTOCbM6vlhTuH747_SP4NgBE) (por exemplo, 2021-09-25T12:34:56Z).

`end_date_time`

Tipo: `timestamp`

**Opcional. O padrão é `null`.**

Registro de data e hora Unix, em segundos, indicando a data de término da oferta. Um campo em branco ou `null` significa que a oferta não tem data de expiração.

  

A entrada pode ser um registro de data e hora UNIX, em segundos, ou uma string de data no formato [ISO-8601](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_8601&h=AT26j9CV6GhLoratPcE_OarZ49P0Pw0beedtlfmYRUhDyJnsjwrRV4jrpgvv8A6oi_qP1I60JRItZyDJGIhLXHcZje6gELb5e-gja6df_AvAu2i0NMebxtB1_MpMVtg3R-Rynp1q5DeCcaP7-0tGRJ9STRrJ_lAoA94XyHZpVh4) (por exemplo, 2021-09-25T12:34:56Z).

`min_quantity`

Tipo: `int64`

**Opcional. O padrão é 0.**

  

Use este campo se a oferta for válida somente quando o cliente comprar um número mínimo de produtos.

  

Representa o número de produtos que o cliente precisa comprar para que a oferta seja válida. Por exemplo: "Compre 5 camisas e ganhe 20% de desconto".

  

Só é possível definir `min_quantity` ou `min_subtotal`.

`min_subtotal`

tipo: `string`

**Opcional. O padrão é `null`.**

  

Use este campo se a oferta for válida somente quando o pedido do cliente atingir um valor subtotal específico.

  

O subtotal dos produtos de pré-requisito deverá ser igual a ou maior que esse valor para que a oferta seja aplicada. Se nenhum produto de pré-requisito explícito for definido, os produtos em oferta serão usados ​​como tal.

  

Este campo deve ser formatado como o valor, seguido pelo código de moeda ISO de 3 dígitos, com um espaço entre o valor e a moeda. Por exemplo: a string "30.99 USD" representa um subtotal de pré-requisito de US$ 30,99 para que a oferta seja aplicada.

  

Só é possível definir `min_quantity` ou `min_subtotal`.

`redeem_limit_per_user`

Tipo: `int64`

**Opcional. O padrão é 0 (ilimitado).**

O número máximo de vezes que a oferta pode ser usada por um único usuário.

  

Defina o campo como 1 para criar um código de cupom descartável.

  

Só defina este campo se `application_type` for `BUYER_APPLIED`.

`value_type`

Tipo: `enum {FIXED_AMOUNT, PERCENTAGE}`

**Obrigatório.**

O tipo de desconto fornecido pela oferta.

  

Opções disponíveis:

-   `FIXED_AMOUNT`: aplica um desconto sobre o valor de `fixed_amount_off`.
    
-   `PERCENTAGE`: aplica um desconto percentual sobre o valor de `percent_off`.
    

`fixed_amount_off`

tipo: `string`

**Obrigatório se `value_type` for definido como `FIXED_AMOUNT`.**

É o valor de desconto da oferta. Deve ser formatado como o valor, seguido pelo [código de moeda ISO de 3 dígitos](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217&h=AT3W5y482gWRig0urE1CloHqGghe_zvUzuGg0yCY0PruN44fnAxgOSa9Gf44wY_krQ85SEWpD7bQfyzcUTCb6uaB-nm_fE6-VRBPkiAkg5vfih17hG8PJjqzmMzhc0vwulei7dm6yYHJtoUgIeQyQr3wieihdZpHH4eoZH8Io7c), com um espaço entre o valor e a moeda. Por exemplo, a string "30.99 USD" representa um desconto de US$ 30,99.

  

Este campo só deverá ser definido se `value_type` for `FIXED_AMOUNT`.

`percent_off`

Tipo: `int64`

**Obrigatório se `value_type` for definido como `PERCENTAGE`.**

O desconto percentual da oferta. Deve ser um número inteiro entre 0 e 100. Por exemplo, "30" representa um desconto de 30%.

  

O campo só deverá ser definido se `value_type` for `PERCENTAGE`.

`target_granularity`

Tipo: `enum {ITEM_LEVEL, ORDER_LEVEL}`

**Obrigatório.**

O detalhamento usado para aplicar o desconto da oferta.

  

Opções disponíveis:

-   `ITEM_LEVEL`: representa um desconto aplicado a cada um dos itens em oferta no carrinho.
    
-   `ORDER_LEVEL`: representa um desconto aplicado a todos os itens em oferta no carrinho. Por exemplo, se você tiver uma oferta de "US$ 30 de desconto em sapatos" com 3 pares de sapatos no carrinho, `ITEM_LEVEL` aplicará US$ 30 de desconto para cada par de sapatos (valor de US$ 90), enquanto `ORDER_LEVEL` aplicará US$ 30 de desconto à soma dos 3 pares de sapatos (valor máximo de US$ 30).
    

As ofertas com detalhamento `ORDER_LEVEL` podem resultar em alocações de desconto que não são divididas uniformemente entre os itens de um pedido. Ter alocações de desconto desiguais pode dificultar os processos de atendimento ou reembolso.

`offer_terms`

tipo: `string`

**Opcional.**

Termos e condições adicionais que determinam o uso da oferta pelo comprador. É permitido usar no máximo 2.500 caracteres.

  

O Facebook gerará automaticamente termos com base na configuração da oferta. Além disso, você pode usar `offer_terms` para adicionar os próprios termos para a oferta. Esse texto adicional será exibido abaixo dos termos de oferta do Facebook.

  

É preciso seguir nossas [políticas de conteúdo](https://l.facebook.com/l.php?u=https%3A%2F%2Ftransparency.fb.com%2Fpolicies%2Fcommunity-standards%2F&h=AT2y6ynzLQ8Oc6bReiMBLeOt9kr11i7uAtEHVaD2yQea2vy0AR0PFX_AXw4hFLKk9gAnjnK6EPeQq6xvnhnTn4lvx5KETUF0GmkPY9HRj8JHbVLkVpbo-XSbWrVCGdkbQZHLwlEHV1nke8TvAVpFUIYGLtpjQVrQZsZ7nIOY3Jg).

[](#)

## Como especificar produtos qualificados

Tanto os itens para os quais uma oferta é válida quanto os itens de pré-requisito que um comprador precisa adquirir para resgatar a promoção são definidos por conjuntos de produtos. A API de Ofertas é compatível com diferentes maneiras de especificar esses conjuntos de produtos, mas só é possível usar um método por tipo de conjunto em cada oferta.

Campo

Descrição

`target_selection`

Tipo: `enum{ALL_CATALOG_PRODUCTS, SPECIFIC_PRODUCTS}`

**Obrigatório.**

Este campo é usado para distinguir ofertas que se aplicam a todo um catálogo de produtos e ofertas que são restritas a um subconjunto específico de itens dentro de um catálogo.

  

Opções disponíveis:

-   `ALL_CATALOG_PRODUCTS`: a oferta pode ser aplicada a qualquer produto do catálogo.
    
-   `SPECIFIC_PRODUCTS`: a oferta só pode ser aplicada aos produtos especificados por `target_filter`, `target_product_retailer_ids`, `target_product_group_retailer_ids` ou `target_product_set_retailer_ids`.
    

  

**Se `target_selection` for `SPECIFIC_PRODUCTS`, exatamente um dos seguintes campos será necessário: `target_filter`, `target_product_retailer_ids`, `target_product_group_retailer_ids` ou `target_product_set_retailer_ids`.**

`target_filter`

Tipo: `JSON-encoded string`

**Opcional.**

  

Regra de filtro para identificar produtos aos quais a oferta pode ser aplicada. Usa a mesma [lógica de regra de filtro](/docs/marketing-api/reference/product-set#filterrules) utilizada para adicionar produtos a um conjunto de produtos.

  

Se a regra de filtro especificada corresponder ao filtro de um conjunto de produtos existente, a oferta será destinada ao conjunto em questão; caso contrário, um novo conjunto será criado.

  

Este campo só deverá ser definido se `target_selection` for `SPECIFIC_PRODUCTS`.

`target_product_retailer_ids`

Tipo: `Array<product_retailer_id>`

**Opcional.**

  

Lista com identificações de itens do varejista para produtos aos quais a oferta pode ser aplicada.

  

Este campo só deverá ser definido se `target_selection` for `SPECIFIC_PRODUCTS`.

`target_product_group_retailer_ids`

Tipo: `Array<product_group_retailer_id>`

**Opcional.**

  

Lista com identificações de grupos do varejista para produtos aos quais a oferta pode ser aplicada.

  

Todas as [variantes de produtos](docs/marketing-api/catalog/guides/product-variants) incluídas no grupo estarão qualificadas para a oferta.

  

Este campo só deverá ser definido se `target_selection` for `SPECIFIC_PRODUCTS`.

`target_product_set_retailer_ids`

Tipo: `Array<product_set_retailer_id>`

**Opcional.**

  

Lista com identificações de conjuntos do varejista que contêm produtos aos quais a oferta pode ser aplicada. A oferta será aplicada à combinação de todos os produtos obtidos pela avaliação dos conjuntos especificados.

`prerequisite_filter`

Tipo: `JSON-encoded string`

**Opcional.**

  

Regra de filtro para identificar produtos que devem ser comprados para que o comprador resgate a oferta. Usa a mesma [lógica de regra de filtro](/docs/marketing-api/reference/product-set#filterrules) utilizada para adicionar produtos a um conjunto de produtos. Normalmente usado em ofertas do tipo ["Compre X e leve Y"](#bxgy-offers).

  

Se a regra de filtro especificada corresponder ao filtro de um conjunto de produtos existente, a oferta usará o conjunto em questão para definir os produtos de pré-requisito; caso contrário, um novo conjunto será criado.

  

Se o campo for definido, `prerequisite_product_retailer_ids`, `prerequisite_product_group_retailer_ids` e `prerequisite_product_set_retailer_ids` precisarão ser `null`.

`prerequisite_product_retailer_ids`

Tipo: `Array<product_retailer_id>`

**Opcional.**

  

Identificações do varejista de itens de produtos que o comprador deve adquirir para resgatar a oferta. Todos os itens incluídos na lista podem ser usados ​​pelo comprador como pré-requisito para resgatar a oferta. Normalmente usado em ofertas do tipo ["Compre X e leve Y"](#bxgy-offers).

  

Se o campo for definido, `prerequisite_filter`, `prerequisite_product_group_retailer_ids` e `prerequisite_product_set_retailer_ids` precisarão ser `null`.

`prerequisite_product_group_retailer_ids`

Tipo: `Array<product_group_retailer_id>`

**Opcional.**

  

Identificações do varejista de grupos de produtos que o comprador deve adquirir para resgatar a oferta. Todas as [variantes de produtos](docs/marketing-api/catalog/guides/product-variants) incluídas em cada grupo podem ser usadas pelo comprador como pré-requisito para resgatar a oferta. Normalmente usado em ofertas do tipo ["Compre X e leve Y"](#bxgy-offers).

  

Se o campo for definido, `prerequisite_filter`, `prerequisite_product_retailer_ids` e `prerequisite_product_set_retailer_ids` precisarão ser `null`.

`prerequisite_product_set_retailer_ids`

Tipo: `Array<product_set_retailer_id>`

**Opcional.**

  

Identificações do varejista para conjuntos de produtos contendo itens que o comprador deve adquirir para resgatar a oferta. Todos os itens resultantes da combinação da avaliação dos conjuntos de produtos podem ser usados pelo comprador como pré-requisito para resgatar a oferta. Normalmente usado em ofertas do tipo ["Compre X e leve Y"](#bxgy-offers).

  

Se o campo for definido, `prerequisite_filter`, `prerequisite_product_retailer_ids` e `prerequisite_product_group_retailer_ids` precisarão ser `null`.

`exclude_sale_priced_products`

Tipo: `bool enum {YES, NO}`

**Opcional.**

Indica se a oferta é aplicável a produtos que já tenham um preço reduzido definido no catálogo, conforme especificado pelo campo `sale_price` do [item do produto](/docs/marketing-api/catalog/reference).

  

Defina o campo como `YES` para descontos duplicados. Omita o campo ou defina-o como `NO` para incluir produtos com um `sale_price` mais baixo no seu catálogo.

  

Quando definido, o campo será aplicado tanto aos itens com desconto quanto aos produtos de pré-requisito de uma oferta.

[](#)

## Ofertas de envio

A API de Ofertas é compatível tanto com ofertas que reduzem o preço de itens na finalização da compra quanto com ofertas que oferecem descontos relacionados aos custos de envio dos produtos. Assim como as ofertas de produtos, as ofertas de envio podem ser aplicadas automaticamente ou usando um código de cupom com ou sem pré-requisitos adicionais do comprador.

Para criar uma oferta de envio, o `target_type` precisa ser definido como `SHIPPING`. No momento, só há compatibilidade com ofertas de frete grátis. Por isso, `value_type` deve ser sempre `PERCENTAGE` com `percent_off` definido como 100.

Campo

Descrição

`target_type`

Tipo: `enum{LINE_ITEM, SHIPPING}`

**Obrigatório.**

O tipo de objeto ao qual a oferta se aplica:

-   `LINE_ITEM`: a oferta é aplicada aos itens do produto em si.
    
-   `SHIPPING`: a oferta é aplicada aos custos de frete. Esta opção só será válida quando `target_granularity` for `ITEM_LEVEL`.
    

`target_shipping_option_types`

Tipo: `Array<shipping_service_tier>`

**Obrigatório se o `target_type` for `SHIPPING`.**

Uma lista dos tipos de serviço de envio (por exemplo, `STANDARD`, `RUSH`, `EXPEDITED`) que são válidos para a oferta.

  

Por exemplo, para especificar uma oferta de frete que se aplica a categorias de envio padrão e expresso, mas não a remessas noturnas, use:

-   `target_type` de `SHIPPING`
    
-   `target_shipping_option_types` de `["STANDARD", "RUSH"]`
    

Vendedores que têm a finalização da compra do Facebook ou Instagram habilitada podem usar a [API de Perfis de Envio](/docs/commerce-platform/order-management/shipping-profiles-api/) para gerenciar os perfis de envio na conta comercial.

[](#)

## Ofertas do tipo "Compre X e leve Y"

As ofertas do tipo "Compre X e leve Y" permitem que os compradores adquiram uma quantidade específica de "X produtos" selecionados para ganhar 1 ou mais "Y produtos" com preço reduzido ou de graça. Também são compatíveis ofertas como "Gaste X e leve Y", nas quais o comprador deve atingir um limite mínimo de gastos em um conjunto de "X produtos" para receber um desconto. Para criar uma oferta do tipo "Compre X e leve Y", defina o campo `target_quantity`, bem como os campos `min_quantity` ou `min_subtotal`.

Em alguns casos, como na oferta comum "Compre um e leve outro grátis", X e Y podem se referir ao mesmo conjunto de produtos. No entanto, você também pode usar `prerequisite_filter`, `prerequisite_product_retailer_ids`, `prerequisite_product_group_retailer_ids` e `prerequisite_product_set_retailer_ids` para especificar um conjunto de produtos X que são diferentes dos produtos Y em oferta. Consulte a seção [Como especificar produtos qualificados](#specify-products) para saber como configurar esses campos.

Campo

Descrição

`target_quantity`

Tipo: `int64`

**Opcional. O padrão é 0 (ilimitado).**

O número de produtos que receberão desconto em cada resgate da oferta. Ao definir `target_quantity` > 0, você criará uma oferta do tipo "Compre X e leve Y".

  

Use este campo para controlar quantos produtos receberão desconto quando um comprador atender aos pré-requisitos de resgate. Por exemplo, em uma oferta "Compre 2 e leve 1 com 50% de desconto", a quantidade de itens promocionais é 1. Já na oferta "Compre 5 e leve 2 grátis", a quantidade de itens promocionais é 2.

`redemption_limit_per_order`

Tipo: `int64`

**Opcional. O padrão é 0 (ilimitado).**

O número de vezes que esta oferta pode ser resgatada por pedido.

  

Use este campo para limitar o número de vezes que uma oferta pode ser aplicada aos produtos adquiridos por um comprador. Por exemplo, em uma oferta "Compre uma camisa e leve outra grátis", por padrão, um comprador que comprar 6 camisas receberá 3 pelo preço integral e 3 de graça. Porém, no mesmo exemplo, se `redemption_limit_per_order` for definido como 2, o comprador receberá 2 camisas de graça e 4 pelo preço integral.

  

Se o campo for definido, `target_quantity` precisará ser maior do que 0.

[](#)

## Como combinar ofertas

Os vendedores que têm a finalização da compra no Facebook ou Instagram habilitada podem combinar diferentes ofertas em uma única transação de forma limitada. A capacidade de combinar ofertas é determinada principalmente pelo [tipo de aplicação](#offer-application-type) e promoção. No momento, isso não pode ser configurado pelos vendedores. As regras abaixo resumem o comportamento para combinação de ofertas:

-   Para determinado produto, se houver ofertas que resultem em preço tachado (`application_type` = `SALE`), a oferta com o produto de menor preço será aplicada. Isso se repetirá em todos os itens no carrinho do comprador. O novo preço do item com desconto será usado em todos os cálculos de pré-requisitos de ofertas futuras.
    
-   Em um pedido único, o comprador pode resgatar 1 oferta `BUYER_APPLIED` ou 1 oferta `AUTOMATIC_AT_CHECKOUT` por `target_type` (`LINE_ITEM` ou `SHIPPING`). Por exemplo, um comprador pode aplicar um cupom de frete grátis e outro do tipo "Compre um e leve dois", mas não pode resgatar 2 ofertas que oferecem produtos com preços reduzidos.
    
-   Às vezes, a Meta pode financiar ofertas para atrair clientes novos e recorrentes sem custo para os vendedores. Essas ofertas sempre podem ser combinadas com ofertas financiadas por vendedores.
    

[](#)

## Como restringir a qualificação do usuário para ofertas

Atualmente, ofertas criadas por meio da API de Ofertas não podem ser disponibilizadas apenas para grupos específicos de usuários. No entanto, as ofertas criadas no Gerenciador de Comércio podem ser configuradas com restrições de qualificação do usuário. Uma promoção criada por meio da API de Ofertas será exibida a todos os compradores, e qualquer comprador que atender aos pré-requisitos (incluindo inserir códigos de cupom) na finalização da compra do Facebook ou Instagram poderá resgatar a oferta.

No futuro, a API poderá permitir a limitação de ofertas a países específicos para vendedores internacionais, bem como restringir a qualificação de ofertas a grupos específicos de usuários, como novos compradores ou seguidores da Página de um vendedor no Facebook.

[](#)