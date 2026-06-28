---
title: "Mecanismo de regras de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-rules"
scraped_at: "2026-02-01T13:47:46.976Z"
---

# Mecanismo de regras de anúncios

O mecanismo de regras de anúncios é um serviço central de gerenciamento de regras que ajuda você a gerenciar anúncios de forma fácil, eficiente e inteligente. Sem ele, você precisaria consultar a API de Marketing para monitorar o desempenho de um anúncio e executar ações manualmente em determinadas condições.

Como a maioria das condições pode ser representada por expressões lógicas, conseguimos automatizar o gerenciamento de duas formas: por meio de [regras baseadas em cronograma](/docs/marketing-api/ad-rules/scheduled-based-rules) ou [regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules).

## Objetos das regras de anúncios

As regras de anúncios são objetos independentes criados e armazenados em uma biblioteca e contêm, no mínimo, um `name`, uma [`evaluation_spec`](/docs/marketing-api/ad-rules/evaluation-spec) e uma [`execution_spec`](/docs/marketing-api/ad-rules/execution-spec).

### Estrutura básica

```
v24.0
```

[](#)

## Opções

### [Regras baseadas em gatilho](/docs/marketing-api/ad-rules/trigger-based-rules)

Monitore o estado dos anúncios em tempo real. Uma regra baseada em gatilho é avaliada assim que os metadados dos objetos de anúncio pertinentes ou os dados de [Insights sobre Anúncios](/docs/marketing-api/reference/adgroup/insights) são alterados.

### [Regras baseadas em cronograma](/docs/marketing-api/ad-rules/scheduled-based-rules)

Monitore o status dos seus anúncios verificando-os em intervalos de tempo definidos para ver se atendem aos critérios da `evaluation_spec`.

[](#)

## Componentes

### [Especificação de avaliação](/docs/marketing-api/ad-rules/evaluation-spec)

O objetivo principal da `evaluation_spec` de uma regra é determinar os objetos sobre os quais a regra deve executar a ação.

### [Especificação de execução](\(/docs/marketing-api/ad-rules/execution-spec\))

A `execution_spec` de uma regra determina a ação que se aplica a todos os objetos que passam pela avaliação.

### Status

O `status` de uma regra determina se a regra deve estar em execução.

Para desativar temporariamente uma regra, defina seu status como `DISABLED`. Para reativar, defina o status da regra como `ENABLED`. Se quiser remover uma regra de modo permanente, será preciso excluí-la.

[](#)