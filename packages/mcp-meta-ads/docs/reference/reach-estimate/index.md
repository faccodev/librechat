---
title: "Graph API Referência v24.0: Reach Estimate"
source: "https://developers.facebook.com/docs/marketing-api/reference/reach-estimate/"
scraped_at: "2026-02-01T14:24:57.094Z"
---

Versão Graph API

[v24.0](#)

# Reach Estimate

[](#)

## Leitura

Potential reach (the number of monthly active people) on Facebook that match the audience you defined through your audience targeting selections.

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`estimate_ready`

bool

Estimate is ready or not. If the [targeting spec](/docs/marketing-api/targeting-specs) is very large, or contains [Custom audiences](/docs/marketing-api/custom-audience-targeting), it may take time to be available. If your targeting is either `Dynamic Product Audiences` or `Product Audiences` or `Incomplete Audiences` the default value is `false`.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`unsupported`

bool

Whether the estimate is unsupported

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`users`

integer

The estimate number of users reached by this targeting

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)