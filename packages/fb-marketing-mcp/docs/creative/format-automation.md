---
title: "Automação de formatos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/format-automation"
scraped_at: "2026-02-01T13:54:30.679Z"
---

# Introdução à automação de formatos

Este documento mostra como habilitar a automação de formatos para você criar um único anúncio que entregue automaticamente várias versões otimizadas.

## Antes de começar

Explore estes tópicos e prepare suas campanhas de anúncios para a automação de formatos:

-   [Primeiros passos para usar a API de Marketing](/docs/marketing-api/get-started)
    
-   [Introdução aos anúncios de catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads/get-started)
    

### Permissões

-   `page_manage_ads`
    

### Limitações

-   Só é possível usar a automação de formatos em anúncios de catálogo Advantage+ em carrossel.
    

## Criar um anúncio de catálogo Advantage+ usando a transformação de formatos

Você pode usar o parâmetro `format_transformation_spec` para permitir diferentes tipos de fontes de dados e formatos usados no processo de criação.

Omitir `format_transformation_spec` na especificação do criativo resultará no comportamento padrão do sistema.

### Exemplo de solicitação

```
v24.0
```

### Parâmetros

Nome

Descrição

`format`

**Obrigatório.**  
Especifica o tipo de transformação do formato.  
**Valor:**`da_collection`

`data_source`

**Opcional.**  
Especifica os dados usados na composição do formato.  
**Valores:**

-   `none`: desativa todas as fontes de dados.
    
-   `catalog`: ativa a fonte de dados `catalog`.
    

**Importante:** omitir `data_source` ou deixar o campo vazio resultará na ativação de todas as fontes de dados disponíveis.

Para habilitar a automação de formatos, especifique as transformações:

```
"format_transformation_spec": [ { "format": "da_collection", } ]
```

Para desabilitar todas as transformações e fontes de dados, defina o parâmetro `data_source` como `none`:

```
"format_transformation_spec": [ { "format": "da_collection", "data_source": ["none"], } ]
```

Para habilitar a fonte de dados de catálogo, defina o parâmetro `data_source` como `catalog`:

```
"format_transformation_spec": [ { "format": "da_collection", "data_source": ["catalog"] } ]
```

Deixe o campo `data_source` vazio para ativar todas as `data_sources`:

```
"format_transformation_spec": [ { "format": "da_collection", "data_source": [] } ]
```

[](#)

## Recuperar a transformação de formatos

Para verificar seu anúncio, faça uma chamada de API solicitando `format_transformation_spec`:

### Exemplo de solicitação

```
v24.0
```

### Exemplo de resposta

```
{ { "format_transformation_spec": [ { "data_source": ["catalog"] "format": "da_collection" }] }, "id": <AD_CREATIVE_ID> }
```

[](#)

## Veja também

-   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
    
-   [Adgroup](/docs/marketing-api/reference/adgroup/)
    
-   [Anúncios de Catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads)
    
-   [Anúncios de coleção](/docs/marketing-api/guides/collection)
    

[](#)