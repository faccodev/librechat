---
title: "Inventário - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/inventory"
scraped_at: "2026-02-01T15:52:25.775Z"
---

# Inventário (consulte [Quantidade para venda](/docs/commerce-platform/catalog/quantity-to-sell))

O campo `inventory` do catálogo de produtos representa o nível de estoque de cada item disponível para venda na sua conta da Loja do Facebook ou do Compras no Instagram. Esse valor aparece na página de detalhes do produto (PDP) e ajuda os compradores a identificar a quantidade de itens disponíveis. Manter essas informações precisas e atualizadas é fundamental para oferecer uma boa experiência, já que elas determinam quando os seus produtos estão indisponíveis e podem evitar problemas de sobrevenda.

**OBSERVAÇÃO**: `inventory` se tornará obsoleto e será substituído pelo novo campo [`quantity_to_sell_on_facebook`](/docs/commerce-platform/catalog/quantity-to-sell). Manteremos a compatibilidade com o antigo nome do campo a curto prazo. Porém, recomendamos que você use a nova opção. Consulte [Supported Fields for Products - Advantage+ Catalog Ads & Commerce](/docs/marketing-api/catalog/reference/#da-commerce) para saber mais sobre a atualização.

**Observação**: os itens sem configuração de inventário não podem ser marcados nem comprados. No entanto, você ainda pode usá-los em Anúncios de Catálogo Advantage+ sem finalização da compra.

## Flutuação do inventário

O campo `inventory` é dinâmico. Isso significa que o valor dele flutua à medida que as pessoas compram produtos da sua conta da Loja do Facebook ou do Compras no Instagram. Sempre que um usuário faz um pedido, o nível de inventário dos produtos correspondentes é reduzido.

A plataforma de comércio incrementa automaticamente esse valor ou reabastece o estoque de um produto quando os usuários cancelam uma compra. Se o cancelamento for feito pelo vendedor, será possível reabastecer o estoque de um produto e aumentar o nível do inventário correspondente, definindo o campo [`restock_items`](/docs/commerce-platform/order-management/cancellation-refund-api#order_cancel_reason) do [ponto de extremidade da API de Cancelamentos](/docs/commerce-platform/order-management/cancellation-refund-api#cancel_order).

O número fornecido por meio de carregamentos do catálogo de produtos ou outras técnicas (consulte as [estratégias de atualização de inventário](#strategies) para saber mais) é considerado uma informação confiável e sempre será usado para substituir o valor armazenado em cache no nosso back-end.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/78026317_433224150563311_374799844344070144_n.png?_nc_cat=109&ccb=1-7&_nc_sid=f537c7&_nc_ohc=Ie6cCoVxeNIQ7kNvwG755tP&_nc_oc=AdljERwIEx4CI-Nq1IrpkLHn1SVpZMe6HF5qF1TmX3MulU0f9JeeUcFBOv-pRfmVDfDiynT5LujlVQo7m96kOway&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=tfNfYNjo0XKS8zRYzqTDqg&oh=00_Afu_Grn7rk5buNedJnbNstg2uS_u_neDtqoI4gDakTbWZA&oe=69853792)

Mantemos os seguintes tipos de contagem de inventário:

-   O _inventário fornecido_ é o valor informado por meio de carregamentos do catálogo de produtos ou outras técnicas (consulte as [estratégias de atualização de inventário](#strategies) para saber mais).
    
-   O _inventário disponível_ é o valor que os clientes podem comprar, considerando os pedidos não processados.
    

Para saber mais sobre esses tipos de inventário, consulte o [ciclo de vida do produto](#products-life-cycle).

[](#)

## Produtos indisponíveis

À medida que as pessoas compram produtos na sua conta da Loja do Facebook ou do Compras no Instagram, o valor de `inventory` é reduzido. Quando esse valor chega a `0`, marcamos o produto como "Indisponível" e restringimos a compra de mais unidades. É muito importante reabastecer os seus produtos regularmente, já que os itens "Indisponíveis" geram um impacto negativo na experiência do usuário e na percepção sobre a sua marca.

Se um comprador encontrar um item indisponível, faremos o possível para mudar a página de detalhes do produto para uma variante que tenha unidades "Em estoque". Isso é feito com base no valor de `inventory` da variante do item no catálogo de produtos.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/66018740_1122484737949257_3754940583764819968_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e280be&_nc_ohc=Opsbaoono74Q7kNvwF_ZwN-&_nc_oc=Adlx_RJaLgSHuEn1Y293nHWGai2eAJGp3yN7aNyfqjUeGc2sObVKLUdf0LRICOOAXT_oX10fVW2QCcGUSKT_1W6S&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=tfNfYNjo0XKS8zRYzqTDqg&oh=00_AfvyflbODlUSPlgtyD1Dt-vo9it6yoE9cvrqNVm6c0g9yQ&oe=6999CF4C)

[](#)

## Produtos descontinuados

No caso de um produto descontinuado, talvez você pense que o melhor seja excluir ele de vez do catálogo. **Essa ação não é recomendada.**

Excluir itens do seu catálogo pode gerar efeitos indesejáveis, como o desaparecimento de etiquetas e imagens de produtos. **É altamente recomendável que você exclua produtos somente após um período significativo (ou seja, alguns meses).**

Em vez de excluir itens, defina o campo `visibility` de um produto descontinuado como `staging`. Desse modo, a plataforma de comércio pode vincular novamente o seu produto a uma entidade conhecida e gerenciar diferentes situações com facilidade.

[](#)

## Ciclo de vida do produto

Sempre que você altera o inventário, o valor do inventário fornecido é atualizado. Esse número não corresponde ao total de itens disponíveis para compra. Rastreamos os pedidos recebidos (que podem estar em diferentes estados) e subtraímos pedidos não confirmados para calcular o valor final do inventário disponível. Esse número não pode ser exposto fora da nossa plataforma.

**Inventário disponível** = **Inventário fornecido** - **Pedidos não confirmados**.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/78196529_2399429560154508_3213138387884048384_n.png?_nc_cat=105&ccb=1-7&_nc_sid=f537c7&_nc_ohc=DfD13G9Z4lMQ7kNvwG8cUnH&_nc_oc=Adm_gr4wUxi7lzRZxngLeS54loJATyCFT4WFtIoPHYY9DTgvpUAHI9NEtBQf10rUtVponHnIYjPobk3TFL5Bkt7C&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=tfNfYNjo0XKS8zRYzqTDqg&oh=00_AfuxnHkXQIlu4pl898JrJu1cJP6V8Lf8_-tFjHeF-MYHcg&oe=69852E1A)

Após a confirmação dos pedidos, há um período de armazenamento de 30 minutos para permitir que você os processe e atualize os números do inventário (por meio do catálogo) antes que esses pedidos sejam removidos do nosso balcão.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/76233236_551277072082615_1710460091292975104_n.png?_nc_cat=108&ccb=1-7&_nc_sid=f537c7&_nc_ohc=vaYUQzSU9w8Q7kNvwH4Huj-&_nc_oc=AdnOUJnjoFmYfEat-RL1IHgYywkDGzh95Em9bmdov2xaHXFOR_lXL93ZyZ26haOlGhWw2d7DLdXdREpnG4gGxJXs&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=tfNfYNjo0XKS8zRYzqTDqg&oh=00_Aft8txQpTDpJ-47bAAYzl3BoWRIlqb9fqrN2RMibEOTAiw&oe=69853A7E)

[](#)

## Sobrevenda

Para que a plataforma de comércio possa ser usada por milhares de comerciantes, decidimos não incluir a compatibilidade com o gerenciamento de inventário síncrono. Como consequência, não há compatibilidade com a realização de transações atômicas de compra com a redução dos níveis de estoque no **seu depósito**. Caso o seu inventário seja compartilhado em vários canais, você corre o risco de vender inesperadamente produtos em excesso no Facebook ou Instagram. Isso pode acontecer com produtos de venda rápida disponibilizados em quantidade limitada.

Quando não puder atender pedidos devido a situações de sobrevenda, inicie um processo de [cancelamento](https://www.facebook.com/business/help/2184004921867702) e defina o `reason_code` como `OUT_OF_STOCK`.

Se as sobrevendas estiverem ocorrendo com certa regularidade, processe os pedidos de modo mais frequente e ajuste o nível de inventário dos seus produtos.

[](#)

## Estratégia de integração de inventário

Você pode atualizar o inventário de diferentes maneiras, dependendo do tipo de integração que está fazendo:

-   Interface do usuário do Gerenciador de Comércio (pequeno conjunto de produtos, testes e assim por diante)
    
-   Um feed com carregamento programado ou manual
    
-   API de Feed
    
-   API de lote
    

[](#)

## Estratégias de atualização de inventário

Devido à natureza assíncrona dos sistemas distribuídos, o valor de `inventory` no seu catálogo de produtos pode ficar fora de sincronia, independentemente da velocidade com que você atualiza os níveis de inventário. Veja abaixo algumas técnicas para minimizar as condições de corrida.

### Inventário pré-alocado

A forma mais eficaz de evitar sobrevendas é pré-alocar o inventário nos canais Loja do Facebook ou Compras no Instagram. Dedicar inventário para cada um dos seus canais garante que as vendas não interfiram umas nas outras. Essa estratégia pode ser aplicada em todo o catálogo de produtos ou em uma parte dele.

### Produtos de venda lenta

Para produtos que vendem em um ritmo normal ou com grande inventário, o risco de sobrevenda é relativamente baixo. Nesse caso, você pode usar uma estratégia simples de atualização do catálogo de produtos:

-   Configure um feed programado para atualizações diárias ou de hora em hora. Esse feed deve conter todos os campos, incluindo o valor de `inventory` mais atualizado.
    

### Produtos de venda rápida

Para produtos de venda rápida, com inventário pequeno ou muito dinâmico, é importante atualizar campos voláteis, como `inventory` de modo mais frequente. Para fazer isso, você pode usar a API de lote em tempo real. Veja uma possível estratégia geral:

-   Configure um feed programado para atualizações diárias ou de hora em hora. Esse feed deve conter todos os campos obrigatórios do catálogo de produtos e omitir campos voláteis, como `inventory`. Com esse feed, é possível atualizar campos que são mais estáticos por natureza e adiar as atualizações de campos voláteis usando a API em tempo real.
    
-   Use a **API de lote em tempo real** para atualizar campos voláteis, como `inventory`, quando o valor muda no seu back-end ou em uma frequência fixa. Para fins de consistência, é importante que os campos atualizados por meio dessa técnica não sejam incluídos no seu feed.
    

Veja um exemplo de atualizações realizadas com a API de lote em tempo real.

```
curl \
  -d @body.json \
  -H "Content-Type: application/json"
  {
    "access_token": "<ACCESS_TOKEN>",
    "item_type": "PRODUCT_ITEM",
    "requests": [      
      {
        "method": "UPDATE",
        "retailer_id": "SKU1234567",
        "data": {
          "inventory": "1337",
        }
      }
    ]
  } https://graph.facebook.com/<CATALOG_ID/batch
```

As solicitações da API de lote são assíncronas. Verifique o status da solicitação e o respectivo resultado para garantir que todas as atualizações sejam aplicadas. Consulte o artigo [Catalog Batch API - Commerce](/docs/commerce-platform/catalog/batch-api) para saber mais.

Se você estiver gerenciando um pequeno número de produtos, também será possível atualizar cada item individualmente usando a Graph API em vez da API de lote em tempo real. Devido ao limite de volume e à limitação da Graph API, essa abordagem só pode ser aplicada a um pequeno número de produtos. O número exato de itens que podem ser atualizados dessa maneira depende da cota aplicada ao seu app do Facebook. Uma boa regra geral é usar a API de lote em tempo real ao atualizar mais de uma dúzia de produtos por vez.

Para atualizar campos específicos em um produto, faça a seguinte chamada de API:

```
curl -d "inventory=1337" -X POST 
https://graph.facebook.com/<FACEBOOK_PRODUCT_ID>
access_token: PAGE_ACCESS_TOKEN
```

Com a Graph API, use o ID do produto do Facebook. Se optar pela API de lote, use a sua própria identificação, também conhecida como `retailer_id`.

### Limitações de inventário

Outra técnica comum para evitar a sobrevenda é adotar uma abordagem cautelosa na alocação do inventário. Por exemplo, quando um determinado item estiver quase esgotado no depósito, defina o nível de inventário no seu catálogo de produtos como zero. Essa é uma otimização eficaz para uma baixa quantidade de vendas, mas pode ajudar se a sobrevenda for uma preocupação.

Ao entender a velocidade em que cada um dos seus produtos é vendido, você pode separar os itens em diferentes grupos e aplicar limites específicos, dependendo do perfil de vendas. Em geral, os produtos de venda rápida precisam de um valor de limite mais alto. Já os produtos de venda lenta provavelmente podem usar um valor de limite mais baixo por serem marcados com a etiqueta "Indisponível".

[](#)