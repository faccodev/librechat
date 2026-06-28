---
title: "Semelhantes com base em valor - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/guides/value-based-lookalike-audiences"
scraped_at: "2026-02-01T13:57:49.566Z"
---

# Semelhantes com base em valor

Os semelhantes com base em valor são um aprimoramento dos [públicos semelhantes](/docs/marketing-api/lookalike-audience-targeting). Com eles, você pode incluir um valor numérico arbitrário para cada conjunto de usuários ao criar um Público Personalizado de origem de dados de CRM. O Facebook usa isso para determinar quais usuários de um público são mais valiosos para você de maneira quantificável.

Para usar esse produto, será necessário aceitar os Termos de Serviço de semelhante com base em valor para todas as contas de anúncios que utilizarem esse recurso. Consulte os [Termos de Serviço](https://www.facebook.com/customaudiences/value_based/tos.php).

## Criar

### Etapa 1: criar um Público Personalizado com base em valor

Um público personalizado especializado de várias chaves que você cria com o parâmetro `is_value_based`.

```
v24.0
```

### Etapa 2: preencher um público de origem

É necessário preencher o novo público com identificadores aceitos e a chave de esquema `LOOKALIKE_VALUE`. Você pode representar valores semelhantes com um número inteiro ou um número não negativo e arbitrário de ponto flutuante.

```
v24.0
```

### Etapa 3: criar um semelhante com base em valor

Quando o público personalizado tiver no mínimo 100 pessoas, você poderá usá-lo como público de origem para um novo semelhante do tipo `custom_ratio`.

```
v24.0
```

É possível ler, atualizar e excluir um semelhante com base em valor ao fazer [públicos semelhantes](/docs/marketing-api/lookalike-audience-targeting/) normais. Veja também as [referências sobre Públicos Personalizados](/docs/marketing-api/reference/custom-audience) e [usuários de Públicos Personalizados](/docs/marketing-api/reference/custom-audience/users).

[](#)

## Direcionamento

Você pode fazer o direcionamento de anúncios com um semelhante com base em valor da mesma forma que faria com qualquer outro Público Personalizado. Veja a [referência sobre conjunto de anúncios](/docs/marketing-api/reference/ad-campaign).

[](#)