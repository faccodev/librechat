---
title: "API em Lote de Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog-batch"
scraped_at: "2026-02-01T14:09:10.171Z"
---

# API em Lote de Catálogo

As APIs em Lote de Catálogo são uma das formas de fazer alterações nos produtos de um catálogo. Consulte este [artigo da Central de Ajuda](https://www.facebook.com/business/help/384041892421495?id=725943027795860) para decidir se essa é a solução adequada para seu caso de uso.

Há pontos de extremidade específicos da API para gerenciar:

-   Itens do catálogo
    
-   Informações de localização para os itens do catálogo
    

Uma chamada de API permite modificar uma ou várias entidades do catálogo (por isso, usamos o termo "em lote"). Em uma única solicitação, é possível combinar três tipos de modificações:

1.  Criar
2.  Atualizar
3.  Excluir

Por exemplo, envie uma única solicitação para realizar as seguintes ações:

-   Criar 7 produtos
    
-   Atualizar descrições de 2 produtos existentes
    
-   Excluir 5 produtos que não são mais oferecidos pela empresa
    

## Como funciona

A API em Lote de Catálogo pode ser usada da seguinte maneira:

1.  Faça uma chamada a um dos pontos de extremidade que permite especificar as atualizações de produto a serem aplicadas.
2.  Chame o ponto de extremidade `/check_batch_request_status` várias vezes até que a resposta indique a conclusão do processo.

[](#)

## Pontos de extremidade da API em Lote de Catálogo

Ponto de extremidade

Descrição

`POST`[/{catalog\_id}/items\_batch](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/)

Envia um lote de solicitações (criar, atualizar e excluir) para um catálogo. É compatível com vários tipos de itens de catálogo. [Veja aqui os tipos de itens](/docs/marketing-api/catalog/guides/catalog-item-types).

`POST`[/{catalog\_id}/localized\_items\_batch](/docs/marketing-api/reference/product-catalog/localized_items_batch/)

Envia solicitações de localização em lote (criar, atualizar, excluir) para itens existentes no seu catálogo. É compatível com vários tipos de itens de catálogo. [Veja aqui os tipos de itens](/docs/marketing-api/catalog/guides/catalog-item-types).

`GET`[/{catalog\_id}/check\_batch\_request\_status](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/check_batch_request_status/)

Verifica o status de uma solicitação em lote. Use um identificador (retornado de uma chamada anterior para um dos outros pontos de extremidade) e faça uma chamada `GET`.

`POST`[/{catalog\_id}/batch](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/items_batch/)

Não faça novas integrações com esse ponto de extremidade. Em vez disso, use `/items_batch`.

Envia um lote de solicitações (criar, atualizar e excluir) para um catálogo. Essa API funciona apenas para catálogos com vertical=COMMERCE. Não há compatibilidade com outros setores e os tipos de itens correspondentes. [Veja aqui os tipos de itens](/docs/marketing-api/catalog/guides/catalog-item-types).

  

[](#)