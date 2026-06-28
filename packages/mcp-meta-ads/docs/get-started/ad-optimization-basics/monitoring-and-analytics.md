---
title: "Monitoramento e análises - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/ad-optimization-basics/monitoring-and-analytics"
scraped_at: "2026-02-01T14:06:51.165Z"
---

# Monitoramento e análises

Monitorar o desempenho da campanha usando a API de Insights permite que você colete dados importantes sobre seus esforços de publicidade e, com isso, avalie o que funciona e o que precisa de melhorias. Com as métricas de desempenho fornecidas pela API de Insights, você pode refinar suas campanhas, melhorar o direcionamento e compreender quais estratégias são bem-sucedidas e como gastar melhor seus recursos nas tecnologias da Meta, como Facebook e Instagram.

## Consulta de dados de análises

Para extrair dados de desempenho, você pode fazer solicitações `GET` ao ponto de extremidade `/act_<AD_ACCOUNT_ID>/insights`. A solicitação pode incluir vários parâmetros como `fields`, `time_range` e `filtering`, permitindo uma resposta personalizada que atenda a necessidades analíticas específicas. Por exemplo, ao especificar campos como `impressions`, `clicks` e `spend`, você pode obter insights sobre o desempenho das suas campanhas em relação a metas.

**Exemplo de solicitação da API:**

```
v24.0
```

[](#)

## Interpretação dos resultados

Os indicadores-chave de desempenho (KPIs), como as taxas de cliques (CTR), o custo por clique (CPC) e o retorno do investimento em publicidade (ROAS), oferecem insights sobre a eficácia das campanhas em gerar conversões e engajamento dos usuários. Por exemplo, uma CTR baixa pode significar que o criativo do anúncio não está repercutindo no público, o que indica a necessidade de ajustes.

[](#)

## Uso de insights para otimização contínua

Ao monitorar continuamente os dados de desempenho, você pode identificar tendências e fazer ajustes com base em dados. Por exemplo, quando determinados anúncios geram altos níveis de engajamento, mas levam a conversões baixas, você pode testar diferentes chamadas para ação ou refinar os parâmetros de direcionamento.

Os insights também podem ajudar a orientar a alocação de orçamento. Se dados demográficos específicos mostrarem taxas de engajamento mais elevadas, realocar orçamentos para esses segmentos pode melhorar a eficácia geral da campanha.

[](#)

## Saiba mais

-   [Referência sobre insights](/docs/marketing-api/reference/ad-account/insights)
    
-   [API de Insights](/docs/marketing-api/insights)
    

[](#)

[

←

Voltar

Ad Optimization Basics

](/docs/marketing-api/get-started/ad-optimization-basics)

[

→

Avançar

Optimization Tips

](/docs/marketing-api/get-started/ad-optimization-basics/optimization-tips)

[](#)