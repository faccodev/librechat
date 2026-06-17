---
title: "Códigos de erro - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights/error-codes"
scraped_at: "2026-02-01T14:00:23.387Z"
---

# Códigos de erro da API de Insights sobre Anúncios

As informações de códigos de erro para fontes assíncronas estarão disponíveis a partir da versão 25.0 da API de Marketing.

Código de erro

Subcódigo de erro

Fonte

Resumo

Descrição

`-2`

`2490547`

Assíncrona

Falha em relatório

Ocorreu uma falha ao gerar o relatório. Tente novamente mais tarde.

`100`

`1504018`

Síncrona

Tempo limite da solicitação atingido

O tempo limite da solicitação foi atingido. Experimente um intervalo de datas menor, busque menos dados ou use trabalhos assíncronos.

`4`

`1504022`

Assíncrona e síncrona

Número excessivo de solicitações à API

O app excedeu o número permitido de solicitações à API. Aguarde antes de tentar novamente. Para saber mais, consulte [Limites de volume da API](/docs/marketing-api/insights/best-practices/#insightscallload).

`2`

`1504038`

Síncrona

Tempo limite da solicitação atingido

O tempo limite da solicitação foi atingido. Experimente um intervalo de datas menor, busque menos dados ou use trabalhos assíncronos.

`4`

`1504039`

Assíncrona e síncrona

Número excessivo de solicitações à API

O app excedeu o número permitido de solicitações à API. Aguarde antes de tentar novamente. Para saber mais, consulte [Limites de volume da API](/docs/marketing-api/insights/best-practices/#insightscallload).

`2`

`1504041`

Assíncrona e síncrona

Detalhamentos inválidos

Não há dados disponíveis para as métricas e os detalhamentos solicitados. Tente usar outras métricas ou detalhamentos. Consulte a [Documentação sobre detalhamentos](/docs/marketing-api/insights/breakdowns).

`2`

`1504042`

Assíncrona e síncrona

Métricas personalizadas inválidas

Você está consultando métricas personalizadas inválidas. Tente selecionar outras métricas.

`2`

`1504043`

Assíncrona e síncrona

Erro intermitente

Sua solicitação encontrou um erro intermitente. Tente novamente mais tarde.

`2`

`1504044`

Síncrona

Ocorreu um erro desconhecido

Ocorreu um erro inesperado. Atualize a página ou tente novamente. Se o problema persistir, entre em contato com o [Suporte da Meta](https://developers.facebook.com/support/).

`-3`

`1504045`

Assíncrona

Relatório muito grande

O relatório era muito grande. Verifique a documentação para obter orientação e tente novamente. Consulte [Limites de dados por chamada](/docs/marketing-api/insights/best-practices#best-practices--data-per-call-limits).

`100`

`3191001`

Assíncrona e síncrona

Erro de permissão

Permissão da API de Insights sobre Anúncios negada.