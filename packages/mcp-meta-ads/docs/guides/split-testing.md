---
title: "Teste A/B - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/split-testing"
scraped_at: "2026-02-01T14:00:02.228Z"
---

# Teste A/B

Teste diferentes estratégias publicitárias com públicos mutuamente exclusivos para identificar a que apresenta melhor desempenho. A API automatiza a divisão de públicos, garante que não haja sobreposição entre os grupos e ajuda a testar diferentes variáveis. Teste o impacto dos diversos tipos de público, técnicas de otimização de veiculação, posicionamentos de anúncios, criativos de anúncios, orçamentos e muito mais. Você ou seu parceiro de marketing podem criar, iniciar e analisar os resultados dos testes em um único local. Consulte a [referência Estudo de anúncio](/docs/marketing-api/reference/ad-study/).

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/17626074_747032625468100_4897318699574231040_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=IcCQSsX7MuEQ7kNvwFM0B60&_nc_oc=Admxdn6gPJftejqy3gBJO3PEq3jkjHeddTia8kWPo5zWNEwo7mMH8Xl-1iDiM0HldJhRKwBkVxi-rmFoYQ198OSo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=RfbmaQMATM6SUiQREfox-Q&oh=00_AfumUm1w0gRwz4JIHvsepnNZgvkPzuPiOC-KBZbLXI6IUQ&oe=698529A6)

## Orientações

-   **Defina KPIs** com seu parceiro de marketing ou equipe interna ao criar o teste.
    
-   **Nível de confiança**: determine o nível antes de criar um teste. Os testes com alcance mais abrangente, programações mais longas ou orçamentos mais elevados tendem a produzir resultados estatisticamente mais significativos.
    
-   **Selecione apenas uma variável por teste.** Dessa maneira, é possível determinar a causa mais provável da diferença de desempenho.
    
-   **Tamanhos de teste comparáveis**: ao testar métricas de volume, como o número de conversões, é necessário fazer escala dos resultados e dos tamanhos de público para que ambos os tamanhos de teste sejam comparáveis.
    

## Restrições de testes

-   Máximo de estudos simultâneos por anunciante: 100
    
-   Máximo de células por estudo: 150
    
-   Máximo de entidades de anúncio por célula: 100
    

### Teste de variável

_Recomendamos testar somente uma variável por vez, embora seja possível testar diversos tipos de variável._ Isso preserva a integridade científica do teste e ajuda a identificar a diferença específica que gera um melhor desempenho.

Por exemplo, considere um teste com os conjuntos de anúncios A e B. Se A usar conversões como método de otimização da veiculação _e_ posicionamentos automáticos, e B aplicar cliques no link para a otimização da veiculação _e_ posicionamentos personalizados, não será possível determinar se os métodos de otimização ou os posicionamentos diferentes provocaram um desempenho melhor.

Nesse exemplo, se os dois conjuntos de anúncios usarem conversões para otimização de veiculação, mas tiverem posicionamentos diferentes, você saberá que a estratégia de posicionamento foi responsável pelas diferenças de desempenho.

Para configurar o teste no nível do conjunto de anúncios:

```
curl \
-F 'name="new study"' \
-F 'description="test creative"' \ 
-F 'start_time=1478387569' \
-F 'end_time=1479597169' \
-F 'type=SPLIT_TEST' \
-F 'cells=[{name:"Group A",treatment_percentage:50,adsets:[<AD_SET_ID>]},{name:"Group B",treatment_percentage:50,adsets:[<AD_SET_ID>]}]' \
-F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies
```

### Como testar estratégias

É possível testar duas ou mais estratégias, uma em relação à outra. Por exemplo, os anúncios com o objetivo de conversões têm um impacto maior sobre seu marketing de resposta direta do que o objetivo de visitas ao site? Para configurar o teste no nível da campanha:

```
curl \
-F 'name="new study"' \
-F 'description="test creative"' \ 
-F 'start_time=1478387569' \
-F 'end_time=1479597169' \
-F 'type=SPLIT_TEST' \
-F 'cells=[{name:"Group A",treatment_percentage:50,campaigns:[<CAMPAIGN_ID>]},{name:"Group B",treatment_percentage:50,campaigns:[<CAMPAIGN_ID>]}]' \
-F 'access_token=<ACCESS_TOKEN>' \ https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies
```

### Como avaliar os testes

Para determinar o teste de melhor desempenho, escolha uma estratégia ou variável que alcance a **métrica de eficiência** mais alta com base no seu objetivo da campanha. Por exemplo, para testar o objetivo de conversões, o conjunto de anúncios que alcançar o **menor custo por ação (CPA) terá o melhor desempenho**.

Evite avaliar testes com tamanhos de grupos assimétricos ou tamanhos de público significativamente diferentes. Nesse caso, aumente o tamanho e os resultados de uma das partes, para que ela seja comparável em relação aos outros testes. Caso seu orçamento não seja proporcional ao tamanho do grupo de teste, considere o volume de resultados, além da eficiência.

Você deve também usar um modelo de atribuição que faça sentido para o negócio e estar em conformidade com ele, antes de iniciar um teste A/B. Se for necessário reavaliar seu modelo de atribuição atual, contate seu representante do Facebook e solicite a realização de um estudo de incrementalidade. Isso poderá mostrar o verdadeiro impacto causal dos seus esforços de marketing da marca e de conversão.

### Orçamento

Você pode usar orçamentos personalizados com os testes A/B e optar por testar vários orçamentos, uns em relação aos outros. No entanto, o orçamento afeta diretamente o alcance nos grupos de teste. Se os grupos de teste apresentarem grandes diferenças de alcance ou tamanho de público, aumente o orçamento para melhorar os resultados e tornar o teste comparável.