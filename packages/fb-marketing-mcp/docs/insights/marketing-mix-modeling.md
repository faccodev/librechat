---
title: "Marketing mix modeling - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights/marketing-mix-modeling"
scraped_at: "2026-02-01T13:59:47.182Z"
---

# Detalhamento de marketing mix modeling na API de Insights

O detalhamento de marketing mix modeling na API de Insights é uma opção de autoatendimento para extração de dados que pode ser usada para exportar dados de anúncios da Meta de forma rápida e fácil sem passar por um dos nossos Parceiros de Marketing Science nem por agências de terceiros e Parceiros de Métricas para Aplicativos.

As chamadas de API são integradas na API de Insights usando o parâmetro `breakdowns=mmm`. **Observação:** não é possível combinar essa opção com diferentes `breakdowns` nem `action_breakdowns`.

As respostas contêm métricas e detalhamentos semelhantes aos resultados da exportação de dados de marketing mix modeling na interface Relatórios de Anúncios. Os dados de marketing mix modeling estão disponíveis apenas no nível do conjunto de anúncios (equivalente ao parâmetro `level=adset`). No momento, as métricas compatíveis com dados de marketing mix modeling são `impressions` e `spend`. **Observação:**`spend` é uma métrica estimada. Consulte [API de Insights, Métricas obsoletas e estimadas](/docs/marketing-api/insights/estimated-in-development#estimated) para ver mais informações.

### Permissões

Você precisará das seguintes permissões para sua conta de anúncios:

-   `ads_read`
    

## Consultas de exportação assíncronas (preferenciais)

Executar uma consulta de exportação assíncrona usando o parâmetro `export_format=csv` resulta em um arquivo baixado com nomes de colunas que correspondem aos nomes no Gerenciador de Anúncios.

**Observação:** o `time_increment` pode ser definido para 1 dia (ou seja, `1`), Caso contrário, `all_time` será usado por padrão.

### Exemplo de solicitação

```
v24.0
```

[](#)

## Recuperação dos dados de marketing mix modeling

Envie uma chamada de API `GET` para o ponto de extremidade `/insights` com `breakdowns=mmm`.

```
v24.0
```

**Observação:** a API de Insights usa valores-padrão para parâmetros não especificados na chamada. Recomendamos usar os parâmetros `time_range` e `date_preset`. Para ampliar ainda mais o detalhamento da resposta, use `time_increment`.

### Exemplo de solicitação

Recuperação dos dados de modelagem diária de marketing mix da última semana:

```
v24.0
```

Para saber mais sobre a API de Insights e entender como integrar a API de Marketing, consulte [Guia de início rápido da API de Insights](/docs/marketing-api/insights).

[](#)

## Perguntas sobre o Gerenciador de Negócios

Um caso de uso comum é recuperar dados de marketing mix modeling para um único Gerenciador de Negócios. Essa operação não é diretamente compatível porque a API de Insights funciona para contas de anúncios e níveis inferiores.

Para baixar dados de um Gerenciador de Negócios, primeiro você precisa consultar as contas de anúncios disponíveis com os pontos de extremidade `/owned_ad_accounts` e `/client_ad_accounts`. Depois, itere as identificações de contas de anúncios individuais retornadas para consultar os dados de marketing mix modeling de cada conta.

### Exemplos de solicitação

Usar `/owned_ad_accounts`

```
v24.0
```

Usar `/client_ad_accounts`

```
v24.0
```

[](#)

## Limites e boas práticas

O detalhamento dos dados de marketing mix modeling gera uma resposta grande, com um número significativo de registros. Isso pode fazer com que suas solicitações expirem durante o cálculo.​ Para resolver esse problema, diminua o tamanho da solicitação usando os parâmetros `time_range` e `filtering` e consulte o tempo total em seções. Para saber mais, leia [Limites e boas práticas da API de Insights](/docs/marketing-api/insights/best-practices).

Apenas um `filtering` específico compatível para consultar os dados de marketing mix modeling. Somente as combinações de operadores listadas abaixo são permitidas para cada campo. Qualquer outro uso de `filtering` retornará um erro.

Campo

Operadores permitidos

`campaign.id`

`IN`, `NOT_IN`

`campaign.name`

`CONTAIN`, `NOT_CONTAIN`

`adset.id`

`IN`, `NOT_IN`

`adset.name`

`CONTAIN`, `NOT_CONTAIN`

`country`

`IN`

`region`

`IN`

`dma`

`IN`

`device_platform`

`IN`

`publisher_platform`

`IN`

`platform_position`

`IN`

Recomendamos o uso da exportação de dados de marketing mix modeling na interface Relatórios de Anúncios para gerar dados históricos caso a API não seja necessária.

Como alternativa, você pode usar o fluxo de trabalhos assíncronos da API de Insights. Isso cria um trabalho que calcula os dados de forma assíncrona. O ponto de extremidade responderá com o `id` de uma execução de relatório de anúncios, que você poderá usar para consultar o status do trabalho e recuperar os dados computados. **Observação:** algumas solicitações podem expirar, mesmo como um trabalho assíncrono. Para saber mais, consulte [Trabalhos assíncronos da API de Insights](/docs/marketing-api/insights/best-practices#asynchronous).

Você pode encontrar mapeamentos e ordenação de cabeçalhos de coluna um pouco diferentes da exportação de dados de marketing mix modeling na interface Relatórios de Anúncios. Você também tem total flexibilidade para combinar os dados-padrão do detalhamento de marketing mix modeling com outras tabelas consultadas a partir da API.

Índice da coluna

Tipo padrão de cabeçalhos de coluna do detalhamento de marketing mix modeling

0

`account_id`

1

`campaign_id`

2

`adset_id`

3

`date_start`

4

`date_stop`

5

`impressions`

6

`spend`

7

`country`

8

`region`

9

`dma`

10

`device_platform`

11

`platform_position`

12

`publisher_platform`

13

`creative_media_type`

[](#)