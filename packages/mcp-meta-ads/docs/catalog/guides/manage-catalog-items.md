---
title: "Gerenciar itens do catálogo - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/manage-catalog-items"
scraped_at: "2026-02-01T15:51:51.691Z"
---

# Gerenciar itens do catálogo

Há várias maneiras de gerenciar os itens de um catálogo e manter os produtos atualizados. Para uma visão geral abrangente, incluindo métodos não disponíveis via APIs, consulte este [artigo da Central de Ajuda](https://www.facebook.com/business/help/890714097648074).

As integrações com a API podem ser feitas usando uma das três opções explicadas abaixo. Cada uma dessas opções tem recursos que as tornam mais ou menos apropriadas, dependendo da situação.

## Opção 1. Atualizar um item por vez

Os pontos de extremidade exatos da API a serem usados dependem do tipo de itens armazenados em um catálogo. Por exemplo, para um catálogo de comércio.

-   É possível adicionar novos itens fazendo uma solicitação POST à borda `/{product_catalog_id}/products`
    
-   É possível atualizar ou excluir itens fazendo chamadas ao [nó Item do produto](/docs/marketing-api/reference/product-item/)
    

Há pontos de extremidade semelhantes para outros tipos de itens, como veículos, hotéis, voos, entre outros. Veja mais detalhes [neste link](/docs/marketing-api/catalog/guides/catalog-item-types).

Essa opção deve ser usada quando o volume de atualizações de um catálogo for muito baixo. Se o volume de atualizações for alto, as atualizações de itens individuais devem ser agrupadas e gerenciadas usando a API de Feed ou a API de Lote.

[](#)

## Opção 2. API de Feed

A [API de Feed](/docs/marketing-api/catalog/guides/feed-api/) permite que você atualize um catálogo usando um arquivo ou um URL. É possível carregar dados de forma pontual ou de acordo com uma programação por hora, dia ou semana. A API de Feed permite carregar dados de produtos no modo "substituir", o que pode ser conveniente quando você quiser que produtos não presentes no conjunto de dados do feed mais recente sejam excluídos. Consulte o [artigo da Central de Ajuda](https://www.facebook.com/business/help/2284463181837648) para mais detalhes.

[](#)

## Opção 3. API de Lote

A [API de Lote](/docs/marketing-api/catalog-batch) é outra opção para atualizar vários itens do catálogo usando uma única chamada de API. Ela difere da API de Feed nas seguintes formas:

-   Não é necessário colocar os dados do produto em um arquivo nem configurar um URL. As atualizações são transmitidas diretamente por meio da carga útil da solicitação `POST`
    
-   **Sempre** será necessário fazer uma chamada DELETE à API para excluir produtos.
    

[](#)