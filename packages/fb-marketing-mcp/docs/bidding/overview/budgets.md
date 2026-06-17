---
title: "Orçamentos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding/overview/budgets"
scraped_at: "2026-02-01T13:55:18.779Z"
---

# Orçamentos

Defina um orçamento diário ou total no nível do conjunto de anúncios. Os valores definidos para lance e orçamento estão no nível mínimo de denominação das moedas da conta de anúncios, como centavos por dólar americano. Os anúncios veiculados nesse conjunto não excederão o limite de gastos:

-   **daily\_budget:** o valor médio que você se dispõe a usar em um conjunto de anúncios ou campanha a cada dia. Com o Gerenciador de Anúncios, você obterá um orçamento diário aproximado dos resultados que você otimizou para cada dia. No entanto, pode ser que, em alguns dias, oportunidades melhores sejam disponibilizadas. Nesses dias, podem ser gastos até 25% acima do orçamento diário. Por exemplo, se o orçamento diário for US$ 10,00, poderemos gastar até US$ 12,50 em um determinado dia.
    
-   **lifetime\_budget:** o valor que você se dispõe a gastar ao longo de todo o tempo de veiculação de um conjunto de anúncios ou de uma campanha. A menos que você altere suas configurações de veiculação, não cobraremos mais do que seu orçamento total para os resultados do seu conjunto de anúncios. Caso seu conjunto de anúncios esteja sendo veiculado por cinco dias e tenha um orçamento vitalício de US$ 250,00, é possível gastar US$ 50 por dia nos dois primeiros dias. No terceiro dia, se houver muitos resultados disponíveis, é possível gastar US$ 75. Então, se não houver muitas oportunidades disponíveis, é possível gastar U$ 25 no quarto dia e U$ 50 no quinto dia.
    

Para definir um orçamento diário de 20 dólares:

```
v24.0
```

Para definir um orçamento total de 200 dólares em uma campanha que será veiculada por 10 dias:

```
v24.0
```

Se você escolher orçamento diário, distribuiremos seus gastos ao longo de cada dia. Já com o orçamento total, os gastos serão distribuídos durante todo o período do conjunto de anúncios.

## Saiba mais

-   [Sobre o orçamento da campanha](https://developers.facebook.com/docs/marketing-api/bidding/guides/advantage-campaign-budget/)
    
-   [Sobre a programação do orçamento](https://developers.facebook.com/docs/marketing-api/reference/high-demand-period)
    

[](#)