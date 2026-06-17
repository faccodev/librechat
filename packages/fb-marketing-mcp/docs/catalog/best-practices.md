---
title: "Boas práticas - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/best-practices"
scraped_at: "2026-02-01T14:08:50.554Z"
---

# Boas práticas

## Recomendações gerais para um catálogo de comércio

Recomendamos usar esta lista de verificação para melhorar a qualidade do seu **catálogo de comércio**:

-   [Armazenar a identificação do feed de produtos](#product-feed-id)
    
-   [Criar um inventário com o suporte da API de Feed ou da API em lote de catálogo](#catalog-batch-api-support)
    
-   [Programar feeds](#scheduled-feeds)
    
-   [Configurar o catálogo durante a integração do vendedor](#merchant-onboarding)
    
-   [Garantir que os campos estejam visíveis](#visibility)
    
-   [Usar o formato adequado para campos específicos](#format)
    
-   [Verificar a capacidade de resposta oportuna e precisa](#responsiveness)
    

### Identificação do feed de produtos

O feed de produtos é usado como a principal fonte para atualizar catálogos de produtos no Facebook. Também executamos buscas periódicas no feed com base no intervalo configurado. Você deve armazenar a identificação do feed de produtos e usá-la para obter o status do carregamento, identificar erros e alterar a programação de atualização.

### Compatibilidade com a criação de inventário do catálogo

Para criar um inventário, use a [referência da API de Feed para anúncios de catálogo Advantage+](/docs/marketing-api/reference/product-feed), a [referência da API de Feed para a plataforma de comércio](https://developers.facebook.com/docs/commerce-platform/catalog/feed-api) ou a [API em lote](https://developers.facebook.com/docs/marketing-api/catalog-batch).

### Programação de feeds

**Os feeds programados não são compatíveis com carregamentos que ocorram em uma frequência maior do que uma vez por hora**. Se você precisar atualizar o inventário mais rapidamente, use a [API de Carregamento Direto](https://developers.facebook.com/docs/marketing-api/catalog-setup/update-options#direct-upload-feed).

### Integração do vendedor

Configure um catálogo durante a [integração do vendedor](https://developers.facebook.com/docs/commerce-platform/platforms/onboarding/) e carregue ou configure seus produtos usando a [API de Feed de Produtos](/docs/marketing-api/dynamic-product-ads/product-catalog).

### Visibilidade

-   Os campos `id`, `title`, `description`, `price`, `inventory`, `link` e `image_link` devem ser fornecidos.
    
-   Os campos `gtin` ou `mpn` e `brand` devem ser fornecidos.
    
-   Os campos `rich_text_description` (preferencial) ou `description` devem ser fornecidos, não ter erros de formatação (sem espaçamento extra e com a pontuação correta) e ser informativos (com informações sobre tamanho, volume e origem do item, entre outras).
    
-   Verifique se o valor dos campos de variantes (como `size` ou `color`) foi fornecido para **cada variante de produto** compartilhando uma `item_group_id` comum, mesmo para itens que estejam esgotados.
    

### Formatação

-   Verifique se a `description` não contém tags HTML nem entidades de caracteres.
    
-   Confira se o `price` é exibido usando as definições corretas de formato e moeda.
    
-   Confirme que o `sale_price` é fornecido para itens em promoção.
    
-   Verifique se a `google_product_category` tem (no mínimo) 2 níveis de profundidade.
    
-   Confirme que as [variantes de produto](#product-variants) compartilham a mesma `item_group_id`.
    
-   Garanta que os campos `availability` e `inventory` foram preenchidos de acordo com a [estratégia acordada](https://developers.facebook.com/docs/marketing-api/catalog-setup/update-options#strategies).
    
-   Use `additional_image_link` para adicionar mais imagens de produtos (até 10).
    
-   As imagens de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/686259348512056) para catálogos.
    
-   Os títulos de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/2104231189874655?id=663946777378466) para catálogos.
    
-   As descrições de produtos precisam atender aos [requisitos](https://www.facebook.com/business/help/2302017289821154?id=663946777378466) para catálogos.
    

### Capacidade de resposta

-   Confirme que a URL do `link` retorna a resposta HTTP 200 OK.
    
-   Confira a ferramenta de diagnóstico do catálogo de produtos para obter as seguintes informações sempre que você carregar um novo feed de produtos:
    
    -   Corrija todos os erros de carregamento: um produto marcado com um erro será rejeitado no catálogo.
        
    -   Verifique todos os avisos: alguns dos avisos podem afetar o processamento do produto e impedir que ele seja marcado ou fique disponível para compra.
        
    -   Garanta que todos os produtos estejam em conformidade com as [Políticas Comerciais](https://www.facebook.com/policies/commerce) do Facebook: o produto que violar a política será sinalizado como `rejected` e não ficará disponível para marcação ou compra.