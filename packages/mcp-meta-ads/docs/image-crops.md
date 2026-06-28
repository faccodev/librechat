---
title: "Corte de imagem - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/image-crops"
scraped_at: "2026-02-01T14:04:51.022Z"
---

# Cortes de imagem

Forneça taxas de proporção para imagens em diferentes posicionamentos de anúncio. O Facebook corta sua imagem de acordo com as especificações fornecidas. Caso você não disponibilize as proporções de corte, usaremos nossos padrões para exibição. Consulte a [Ad, Image](/docs/reference/ads-api/adimage/). Por exemplo, carregue uma imagem para usar no criativo do anúncio:

```
v24.0
```

Depois, forneça o criativo do anúncio referenciando o hash da imagem retornado na chamada anterior junto com o corte.

```
v24.0
```

Os cortes contêm pares de chaves-valor, sendo a chave uma `crop key` e o valor as dimensões em pixels do corte. Para conferir todas as chaves compatíveis, consulte o artigo de referência [Ads Image Crops](/docs/marketing-api/reference/ads-image-crops).

Forneça um valor como coordenadas `(x, y)` para os cantos superior esquerdo e inferior direito do retângulo de corte. `crop key` descreve uma taxa de proporção. A taxa de proporção da caixa especificada pela largura e altura deve ser o mais próximo possível da proporção em `crop key`.

A origem de uma imagem (`(0, 0)`) fica no canto superior esquerdo. O ponto, `(width - 1, height - 1)`, fica no canto inferior direito.

## Especificação

Quando usado, **esse recurso deve ser aplicado a todos os posicionamentos onde um anúncio pode aparecer**. Por exemplo, se você fornecer informações de proporção para a coluna da direita e quiser usar o mesmo anúncio no Feed de Notícias, será necessário informar o corte para o posicionamento do feed também.

## Limitações

Os cortes de imagem funcionam apenas para criativos de anúncio com `image_file` ou `image_hash`. `Page posts` não são compatíveis. Os valores precisam obedecer a estas restrições:

-   Os pontos especificados por `(x, y)` precisam estar dentro da imagem. Um retângulo que se estende além dos limites da imagem é considerado inválido.
    
-   O retângulo deve ter a mesma proporção especificada pela chave de corte.
    
-   As coordenadas não podem conter valores negativos.
    
-   Os Facebook Stories não são compatíveis com cortes de imagem.
    

Por exemplo:

```
Example:{"100x100": [ [330, 67], [1080, 817] ]}
```

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=352014542184278&version=1763669742)