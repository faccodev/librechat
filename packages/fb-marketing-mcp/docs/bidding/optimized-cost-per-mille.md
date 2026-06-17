---
title: "Anúncios de custo por mil otimizado - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/optimized-cost-per-mille"
scraped_at: "2026-02-01T13:55:38.786Z"
---

# Anúncios de custo por mil otimizado

Com o custo por mil otimizado, você pode priorizar suas metas de marketing e veicular automaticamente os anúncios em direção a essas metas da maneira mais eficaz possível. Especifique metas em valores absolutos, como, por exemplo, quanto vale para você o cumprimento de uma meta específica. Esses valores **não são lances**. Eles devem representar o valor que você dá a um resultado.

Uma alternativa ao oCPM é o [custo por ação](/docs/marketing-api/cost-per-action-ads), que permite que você especifique eventos de conversão e seja cobrado pela quantidade de conversões. Os anúncios de CPM e CPM otimizado são diferentes, já que cobram por impressões exibidas no site.

## Como funciona

Fazemos automaticamente um lance em seu nome, de acordo com o orçamento de campanha definido. Os lances dinâmicos permitem que você capture as impressões mais importantes para suas metas, e é provável que o ROI total de uma campanha ultrapasse o ROI de uma campanha de CPC ou o de uma campanha de CPM tradicional.

Otimize as campanhas definindo a [`optimization_goal`](/docs/marketing-api/adset) do conjunto de anúncios.

**O CPM otimizado para instalações do app para celular só é disponibilizado caso o app tenha relatado um evento de instalação nos últimos 28 dias pelo SDK do Facebook ou por um Parceiro de Métricas para Aplicativos.**

[](#)

## Como criar um anúncio de CPM otimizado

O objeto do [conjunto de anúncios](/docs/reference/ads-api/adset) contém informações de lance. Para criar um anúncio de CPM otimizado:

```
v24.0
```

Estes campos devem cumprir com as seguintes restrições:

Nome

Descrição

`billing_event`

Você deve definir como `IMPRESSIONS`.

`optimization_goal`

Defina a ação para a qual você deseja otimizar.

`bid_amount`

Valor que você dá à meta de otimização, especificado em centavos.

Consulte as [Boas práticas de validação](/docs/reference/ads-api/validation) para ver as unidades de anúncio compatíveis com lances de oCPM.

[](#)

## Orçamento e preços

Uma campanha de CPM otimizado deve conter um orçamento. O sistema de anúncios faz lances em cada impressão em seu nome, dando lances altos quando a impressão pode funcionar para suas metas, e dando lances baixos caso seja improvável que ela funcione para as metas.

Lembre-se de que essa dinâmica permite que você capture as impressões mais importantes para suas metas, e é provável que o ROI total de uma campanha ultrapasse o ROI de uma campanha de CPC ou o de uma campanha de CPM tradicional. Observe que as estatísticas de cada meta são fornecidas no Gerenciador de Anúncios e na API; assim, você pode verificar o desempenho do anúncio e avaliar o sucesso de uma campanha, com base nas suas metas.

[](#)