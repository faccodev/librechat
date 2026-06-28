---
title: "Público Advantage+ - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience"
scraped_at: "2026-02-01T14:14:14.138Z"
---

# Público Advantage+

Habilite o público Advantage+ nas suas campanhas para criar o público mais amplo possível para fazer pesquisas. As restrições comerciais não negociáveis NÃO são expandidas, incluindo restrições de localização, idade mínima, idioma e exclusões de público personalizado.

-   Para aceitar, defina o parâmetro `advantage_audience` dentro de `targeting_automation` para `1`.
    
-   Para recusar, defina o parâmetro `advantage_audience` dentro de `targeting_automation` para `0`.
    

Antes da versão 23.0, o parâmetro `advantage_audience` dentro do `targeting_automation` era opcional e não era explicitamente exigido para ser definido na especificação de direcionamento ao criar um novo conjunto de anúncios ou atualizar um existente.

A partir da versão 23.0, o parâmetro `advantage_audience` dentro do `targeting_automation` será automaticamente predefinido para `1` ou exigirá uma configuração explícita para `1` ou `0`. Esse comportamento aplica-se apenas ao criar um novo conjunto de anúncios, enquanto a atualização de um conjunto de anúncios existente não demonstrará esse comportamento em nenhuma versão.

## Habilitar o público Advantage+

Quando o público Advantage+ é habilitado, é possível definir o parâmetro `age_range` dentro de `targeting_spec`.

```
"targeting": { "age_range": [25, 35], "geo_locations": { "countries": ["GB"] }, "targeting_automation": { "advantage_audience": 1 } }
```

-   Quando `age_range` não for enviado, a faixa etária será criada a partir de idade mínima/máxima.
    
-   Quando o público Advantage+ está habilitado, os valores de idade mínima/máxima são redefinidos para valores padrão.
    
-   Quando o público Advantage+ está habilitado, os anunciantes podem enviar valores `age_min` somente entre 18 e 25.
    
-   Quando o público Advantage+ está habilitado, os anunciantes não podem definir valores `age_max`. Ele é definido como apenas 65.
    

### Exemplo de solicitação

```
v24.0
```

[](#)

## Casos aceitos padrão

O parâmetro `advantage_audience` dentro do `targeting_automation` será predefinido para `1` salvo se explicitamente especificado nos seguintes cenários:

-   **Configuração de direcionamento padrão:** ao passar valores padrão para idade, gênero, inclusão de público personalizado e inclusão de direcionamento detalhado, ou omitir esses campos.
    
-   **Configuração de direcionamento flexível:** ao usar uma configuração flexível aplicando configurações de relaxamento individuais para idade, gênero, inclusão de público personalizado e inclusão de direcionamento detalhado.
    

### Exemplos

#### Configuração padrão

```
{ "targeting":{ "geo_locations":{ "countries":[ "US" ] }, "age_max":65, "age_min":18, } }
```

#### Configuração flexível

```
{ "targeting":{ "age_max":65, "age_min":18, "custom_audiences":[ { "id":"<CUSTOM_AUDIENCE_ID>" }, { "id":"<LOOKALIKE_ID>" } ], "flexible_spec":[ { "interests":[ { "id":"<INTEREST_ID>" } ] } ], "geo_locations":{ "countries":[ "US" ], "location_types":[ "home", "recent" ] }, "targeting_relaxation_types":{ "custom_audience":1, "lookalike":1 }, "targeting_optimization":"expansion_all" } }
```

[](#)

## Solução de problemas

Caso sua configuração não seja padrão ou flexível, ao criar um conjunto de anúncios, um erro será retornado, o que significa que você tem:

-   Configurações não padrão usadas para qualquer idade, gênero, inclusão de público personalizado e inclusão de direcionamento detalhado.
    
-   Configurações individuais de flexibilização não usadas para estes parâmetros.
    

### Exemplo

```
{ "targeting":{ "age_max":50, "age_min":30, "custom_audiences":[ { "id":"<CUSTOM_AUDIENCE_ID>" } ], "geo_locations":{ "countries":[ "US" ], "location_types":[ "home", "recent" ] } } }
```

Para resolver isso, será preciso definir explicitamente o parâmetro `advantage_audience` dentro de `targeting_automation` para `1` ou `0`.

[](#)

## Saiba mais

-   [Central de Ajuda: Sobre o público Advantage+](https://www.facebook.com/business/help/273363992030035).
    

[](#)