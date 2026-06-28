---
title: "API de Insights - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights-api/getting-started"
scraped_at: "2026-02-01T14:10:39.951Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/insights/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 27 de mai de 2025  

# API de Insights

Fornece uma interface única e consistente para recuperar estatísticas de anúncios.

-   [Detalhamentos](/docs/marketing-api/insights/breakdowns): resultados de grupo.
    
-   [Detalhamentos de ação](/docs/marketing-api/insights/action-breakdowns): entender a resposta dos detalhamentos de ação.
    
-   [Trabalhos assíncronos](/docs/marketing-api/insights/async): para solicitações com grandes resultados, use trabalhos assíncronos.
    
-   [Limites e melhores práticas](/docs/marketing-api/insights/best-practices/): limites de chamada, filtragem e boas práticas.
    

Para receber dados de desempenho, configure seus anúncios para rastrear as métricas que são importantes para você. Para isso, você pode usar as [tags de URL](/docs/reference/ads-api/adcreative), o [Pixel da Meta](/docs/marketing-api/audiences-api/pixel) e a [API de Conversões](/docs/marketing-api/conversions-api).

## Antes de começar

Você precisará do seguinte:

-   A permissão `ads_read`.
    
-   Um [app](https://developers.facebook.com/apps/). Consulte [Desenvolvimento de apps da Meta](/docs/development) para saber mais.
    

[](#)

## Estatísticas de campanha

Para consultar as estatísticas de desempenho dos últimos 7 dias de uma campanha:

```
curl -G \
  -d "date_preset=last_7d" \
  -d "access_token=ACCESS_TOKEN" \
  "https://graph.facebook.com/API_VERSION/AD_CAMPAIGN_ID/insights"
```

Para saber mais, consulte a [referência de Insights sobre Anúncios](/docs/marketing-api/insights).

[](#)

## Chamadas

A API de Insights está disponível como uma borda em qualquer objeto de anúncios.

Método de API

[`act_<AD_ACCOUNT_ID>/insights`](/docs/marketing-api/reference/ad-account/insights)

[`<CAMPAIGN_ID>/insights`](/docs/marketing-api/reference/ad-campaign-group/insights)

[`<ADSET_ID>/insights`](/docs/marketing-api/reference/ad-campaign/insights)

[`<AD_ID>/insights`](/docs/marketing-api/reference/adgroup/insights)

### Solicitação

Você pode solicitar campos específicos com uma lista separada por vírgulas nos parâmetros `fields`. Por exemplo:

```
v24.0
```

### Resposta

```
{
  "data": [
    {
      "impressions": "2466376",
      "date_start": "2009-03-28",
      "date_stop": "2016-04-01"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MAZDZD"
    }
  }
}
```

[](#)

## Níveis

Agregue os resultados em um nível de objeto definido. Isso elimina a duplicação dos dados automaticamente.

### Solicitação

Por exemplo, consulte os insights de uma campanha no nível do anúncio.

```
v24.0
```

### Resposta

```
{
  "data": [
    {
      "impressions": "9708",
      "ad_id": "6142546123068",
      "date_start": "2009-03-28",
      "date_stop": "2016-04-01"
    },
    {
      "impressions": "18841",
      "ad_id": "6142546117828",
      "date_start": "2009-03-28",
      "date_stop": "2016-04-01"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MQZDZD"
    }
  }
}
```

Se você não tiver acesso a todos os objetos do anúncio no nível solicitado, a chamada de insights não retornará dados. Por exemplo, ao solicitar insights com `level` definido como `ad`, se você não tiver acesso a um ou mais objetos desse tipo na conta de anúncios, a chamada de API retornará um erro de permissão.

[](#)

## Janelas de atribuição

A **janela de atribuição de conversão** oferece períodos de tempo que definem quando atribuímos o evento a um anúncio em um app da Meta. Para saber mais, consulte [Sobre as janelas de atribuição no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/2198119873776795). Mensuramos as ações que ocorrem quando acontece um evento de conversão e voltamos 1 e 7 dias no tempo. Para visualizar as ações designadas a janelas de atribuição diferentes, faça uma solicitação para `/{ad-account-id}/insights`. Se você não fornecer `action_attribution_windows`, usaremos `7d_click` e informaremos em `value`.

Por exemplo, especifique `action_attribution_windows`, e "value" será fixado na janela de atribuição `7d_click`. Faça uma solicitação para `act_10151816772662695/insights?action_attribution_windows=['1d_click','1d_view']` e receba este resultado:

```
"spend": 2352.45,
"actions": [
{
"action_type": "link_click",
"value": 6608,
"1d_view": 86,
"1d_click": 6510
},
"cost_per_action_type": [
{
"action_type": "link_click",
"value": 0.35600030266344,
"1d_view": 27.354069767442,
"1d_click": 0.36135944700461
},

// if attribution window is _not_ specified in query. And note that the number under 'value' key is the same even if attribution window is specified.
// act_10151816772662695/insights
"spend": 2352.45,
"actions": [
{
"action_type": "link_click",
"value": 6608
},
"cost_per_action_type": [
{
"action_type": "link_click",
"value": 0.35600030266344
},
```

[](#)

## Expansão de campo

Solicite campos no nível do nó e por campos especificados na [expansão de campo](/docs/graph-api/using-graph-api/#field-expansion).

### Solicitação

```
v24.0
```

### Resposta

```
{
  "id": "6042542123268",
  "name": "My Website Clicks Ad",
  "insights": {
    "data": [
      {
        "impressions": "9708",
        "date_start": "2016-03-06",
        "date_stop": "2016-04-01"
      }
    ],
    "paging": {
      "cursors": {
        "before": "MAZDZD",
        "after": "MAZDZD"
      }
    }
  }
}
```

[](#)

## Classificação

Classifique os resultados informando o parâmetro `sort` com `{fieldname}_descending` ou `{fieldname}_ascending`:

### Solicitação

```
v24.0
```

### Resposta

```
{
  "data": [
    {
      "reach": 10742,
      "date_start": "2009-03-28",
      "date_stop": "2016-04-01"
    },
    {
      "reach": 5630,
      "date_start": "2009-03-28",
      "date_stop": "2016-04-03"
    },
    {
      "reach": 3231,
      "date_start": "2009-03-28",
      "date_stop": "2016-04-02"
    },
    {
      "reach": 936,
      "date_start": "2009-03-29",
      "date_stop": "2016-04-02"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MQZDZD"
    }
  }
}
```

[](#)

## Rótulos de anúncios

Estatísticas de todos os rótulos cujos nomes são idênticos. Agregados em um único valor em um nível de objeto de anúncio. Consulte a [referência de rótulos de anúncios](/docs/marketing-api/reference/ad-label) para saber mais.

### Solicitação

```
v24.0
```

### Resposta

```
{
  "data": [
    {
      "unique_clicks": 74,
      "cpm": 0.81081081081081,
      "total_actions": 49,
      "date_start": "2015-03-01",
      "date_stop": "2015-03-31",
    },
  ], 
  "paging": {
    "cursors": {
      "before": "MA==",
      "after": "MA==",
    }
  }
}
```

[](#)

## Definição de cliques

Para entender melhor as métricas de cliques oferecidas pela Meta atualmente, leia as definições e o uso de cada uma abaixo:

-   **Cliques no link, `actions:link_click`** – o número de cliques em links do anúncio para selecionar destinos ou experiências dentro ou fora de propriedades da Meta. Consulte [Cliques no link na Central de Ajuda de Anúncios](https://www.facebook.com/business/help/659185130844708).
    
-   **Cliques (todos), `clicks`** – a métrica contabiliza diversos tipos de cliques no anúncio, inclusive determinadas interações com o contêiner de anúncios, links para outros destinos e links para experiências de anúncios expandidas. Consulte [Cliques (todos) na Central de Ajuda de Anúncios](https://www.facebook.com/business/help/787506997938504).
    

[](#)

## Objetos excluídos e arquivados

As unidades de anúncios podem ser `DELETED` ou `ARCHIVED`. As estatísticas de objetos excluídos ou arquivados aparecerão quando você consultar os respectivos objetos principais. Dessa forma, se você consultar `impressions` no nível do conjunto de anúncios, os resultados incluirão `impressions` de todos os anúncios do conjunto independentemente do estado de cada um deles (excluídos ou arquivados). Veja também [Gerenciar o status de seu objeto de anúncio](/docs/marketing-api/best-practices/storing_adobjects).

Porém, se você consultar usando filtros, a filtragem de status será aplicada por padrão para retornar apenas objetos ativos. Por isso, as estatísticas totais do nó principal poderão ser maiores que as estatísticas dos derivados.

No entanto, é possível obter as estatísticas de objetos `ARCHIVED` dos respectivos nós principais ao fornecer um parâmetro `filtering` adicional.

### Solicitação

Para consultar as estatísticas de todos os anúncios `ARCHIVED` em uma conta de anúncios listadas uma a uma:

```
v24.0
```

### Resposta

Observe que apenas os objetos arquivados são retornados nessa resposta.

```
{
  "data": [
    {
      "impressions": "1741",
      "date_start": "2016-03-11",
      "date_stop": "2016-03-12"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MAZDZD"
    }
  }
}
```

### Insights sobre objetos excluídos

Você poderá consultar insights sobre objetos excluídos usando as respectivas identificações ou o filtro `ad.effective_status`.

### Solicitação

Por exemplo, se você tiver a identificação do conjunto de anúncios:

```
v24.0
```

Neste exemplo, consultamos com `ad.effective_status`:

```
POST https://graph.facebook.com/<VERSION>/act_ID/insights?access_token=token&appsecret_proof=proof&fields=ad_id,impressions&date_preset=lifetime&level=ad&filtering=[{"field":"ad.effective_status","operator":"IN","value":["DELETED"]}]
```

### Resposta

```
{
  "id": "6042147342661",
  "name": "My Like Campaign",
  "status": "DELETED",
  "insights": {
    "data": [
      {
        "impressions": "1741",
        "date_start": "2016-03-11",
        "date_stop": "2016-03-12"
      }
    ],
    "paging": {
      "cursors": {
        "before": "MAZDZD",
        "after": "MAZDZD"
      }
    }
  }
}
```

[](#)

## Solução de problemas

### Tempos-limite

Os problemas mais comuns que causam falha nesse ponto de extremidade são o excesso de solicitações e a ocorrência de tempos-limite:

-   Em solicitações `/GET` ou síncronas, é possível consultar erros de falta de memória ou de tempo-limite.
    
-   Em solicitações `/POST` ou assíncronas, é possível consultar erros de tempo-limite. Para solicitações assíncronas, pode ser que demore até uma hora para concluir uma solicitação, incluindo tentativas de repetição. Por exemplo, se você fizer uma consulta que tentar extrair grandes volumes de dados para muitos objetos de nível de anúncio.
    

#### Recomendações

-   Não há um limite explícito que indique quando ocorrerá uma falha na consulta. Quando o tempo limite for atingido, tente detalhar a consulta em consultas menores colocando filtros, como intervalo de datas.
    
-   O cálculo de métricas únicas é demorado. Tente consultar métricas exclusivas em uma chamada separada para melhorar o desempenho de métricas não exclusivas.
    

### Limitação de volume

A API de Insights da Meta utiliza a limitação de volume para garantir uma experiência ideal de geração de relatórios a todos os nossos parceiros. Para mais informações e sugestões, consulte [Limites e boas práticas](/docs/marketing-api/insights/best-practices/) da API de Insights.

### Discrepância com o Gerenciador de Anúncios

A partir de 10 de junho de 2025, para reduzir discrepâncias com o Gerenciador de Anúncios da Meta, `use_unified_attribution_setting` e `action_report_time parameters` serão desconsiderados e as respostas da API imitarão as configurações do Gerenciador de Anúncios:

-   Os valores atribuídos (`value`) serão baseados nas configurações de atribuição no nível do conjunto de anúncios (semelhante a `use_unified_attribution_setting=true`), e as ações inline/no anúncio serão incluídas nos dados da janela de atribuição de `1d_click` ou `1d_view`. Depois dessa alteração, os dados de janela de atribuição `inline` independentes não serão retornados.
    
-   As ações serão registradas usando `action_report_time=mixed`: as ações na Meta (como cliques em links) usarão o tempo de relatórios baseado em impressões. Já as ações fora da Meta (como compras na web) aproveitarão o tempo de relatórios baseado em conversões.
    

Os comportamentos padrão da API e do Gerenciador de Anúncios são diferentes. Se você quiser observar o mesmo comportamento do Gerenciador de Anúncios, defina o campo `use_unified_attribution_setting` como verdadeiro.

[](#)

## Saiba mais

-   [Insights sobre a conta de anúncios](/docs/marketing-api/reference/ad-account/insights)
    
-   [Insights sobre a campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group/insights)
    
-   [Insights sobre o conjunto de anúncios](/docs/marketing-api/reference/ad-campaign/insights)
    
-   [Insights sobre Anúncios](/docs/marketing-api/reference/adgroup/insights/)
    

Essa API cobre apenas os pontos de extremidade da lista acima. Se você pretende incluir relatórios da Meta na sua solução, consulte os [Termos de Serviço](/terms) e as [Políticas do Desenvolvedor relacionadas à API de Marketing](/devpolicy/#marketingapi).

[](#)