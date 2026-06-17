---
title: "Limites e boas práticas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights/best-practices"
scraped_at: "2026-02-01T13:59:39.354Z"
---

# Limites e boas práticas

A partir de 10 de junho de 2025, `reach` não será mais retornado em consultas padrão com `breakdowns` e `start_date` de mais de 13 meses a fim de melhorar o desempenho geral da API. As respostas a essas solicitações omitirão `reach` e os campos relacionados (como `frequency` e `cpp`).

Para aplicar `breakdowns` e recuperar valores de `reach` com mais de 13 meses, é possível usar trabalhos assíncronos e fazer até 10 solicitações diárias por conta de anúncios. Verifique o cabeçalho `x-Fb-Ads-Insights-Reach-Throttle` para monitorar o uso do limite de volume. Quando o limite for atingido, as solicitações omitirão `reach` e os campos relacionados.

Se o limite para detalhamentos relacionados ao alcance for excedido, você verá esta mensagem de erro:

```
Reach-related metric breakdowns are unavailable due to rate limit threshold.
```

A API de Insights fornece os dados de desempenho das campanhas de marketing do Facebook. Para proteger o desempenho e a estabilidade do sistema, temos medidas de proteção para que os recursos do sistema sejam distribuídos adequadamente entre os apps. Todas as políticas descritas abaixo estão sujeitas a alterações.

## Tempos limite

O problema mais comum que causa falha nas chamadas à API de Insights sobre Anúncios é o excesso de solicitações e a ocorrência de tempos limite.

-   Solicitações síncronas ou `/GET` podem retornar erros de falta de memória ou de tempo imite.
    
-   Solicitações `/POST` ou assíncronas podem retornar erros de tempo limite. Para solicitações assíncronas, pode ser que demore até uma hora para concluir uma solicitação, incluindo tentativas de repetição. Por exemplo, se você fizer uma consulta que tentar extrair grandes volumes de dados para muitos objetos de nível de anúncio.
    

### Recomendações

-   Não há um limite explícito que indique quando ocorrerá uma falha na consulta. Quando o tempo limite for atingido, tente detalhar a consulta em consultas menores colocando filtros, como intervalo de datas.
    
-   O cálculo de métricas únicas é demorado. Tente consultar métricas exclusivas em uma chamada separada para melhorar o desempenho de métricas não exclusivas.
    

[](#)

## Limites de dados por chamada

Usamos limites de dados por chamada para impedir que uma consulta retorne dados demais, além do que o sistema é capaz de suportar. Há dois tipos de limites de dados:

1.  Pelo número de linhas na resposta, e
2.  Pelo número de pontos de dados necessários para computar o total, como a linha de resumo.

Esses limites se aplicam tanto às chamadas `/insights` síncronas quanto às assíncronas, e retornamos um erro:

```
error_code = 100,  CodeException (error subcode: 1487534)
```

### Boas práticas, limites de dados por chamada

-   Limite sua consulta restringindo o intervalo de datas ou o número de identificação de anúncios. Você pode também limitar sua consulta às métricas necessárias, ou dividi-la em diversas consultas, cada uma solicitando um subconjunto de métricas.
    
-   Evite consultas no nível da conta que contenham detalhamento de alta cardinalidade, como `action_target_id` ou `product_id`, e intervalos de datas mais amplos, como o vitalício.
    
-   Use a borda `/insights` diretamente com objetos de anúncio de nível mais baixo para consultar dados detalhados sobre esse nível. Por exemplo, use primeiro a consulta no nível da conta para consultar a lista de números de identificação de objetos de nível mais baixo com os parâmetros `level` ou `filtering`. Neste exemplo, buscamos todas as campanhas que registraram algumas impressões:
    

```
curl -G \
-d 'access_token=<ACCESS_TOKEN>' \
-d 'level=campaign' \
-d 'filtering=[{field:"ad.impressions",operator:"GREATER_THAN",value:0}]' \
'https://graph.facebook.com/v2.7/act_<ACCOUNT_ID>/insights'
```

-   Assim, podemos usar `/<campaign_id>/insights` com cada valor retornado para fazer consultas e [solicitar insights em lote](https://developers.facebook.com/docs/marketing-api/batch-requests/v2.6#adinsights) para essas campanhas em uma única chamada:
    

```
v24.0
```

-   Use o parâmetro `filtering` apenas para consultar insights de objetos de anúncios com dados. O valor do campo especificado em `filtering` usa notação de PONTO para representar os campos sob o objeto. Observe que a filtragem com `STARTS_WITH` e `CONTAIN` não altera os dados do resumo. Nesse caso, use o operador `IN`. Veja o exemplo de uma solicitação `filtering`:
    

```
v24.0
```

-   Use `date_preset`, se possível. Os intervalos de datas personalizados são de veiculação menos eficiente no nosso sistema.
    
-   Use [solicitações em lote](/docs/marketing-api/batch-requests/v2.6#adinsights) para múltiplas chamadas síncronas e assíncronas ao consultar grandes volumes de dados e evitar tempo limite.
    
-   Primeiro, experimente as chamadas síncronas e depois use as chamadas assíncronas nos casos em que as chamadas síncronas atingirem o tempo limite.
    
-   As informações são atualizadas a cada 15 minutos e não se alteram depois de 28 dias do seu registro.
    

[](#)

## Limites de carregamento de chamadas de informações

Após 90 dias do lançamento da v3.3 e em vigor para todas as versões públicas, mudamos o limite de classificação no nível da conta de anúncios para refletir melhor o volume de chamadas de API necessárias. Calculamos a cota de limite de volume no seu nível de acesso à API de Marketing e na empresa proprietária do app. Consulte [Acesso e autenticação](/docs/marketing-api/access). Essa alteração se aplica a todos os pontos de extremidade da API de Insights sobre Anúncios: `GET {adaccount_ID}/insights`, `GET {campaign_ID}/insights`, `GET {adset_ID}/insights`, `GET {ad_ID}/insights`, `POST {adaccount_ID}/insights`, `POST {campaign_ID}/insights`, `POST {adset_ID}/insights`, `POST {ad_ID}/insights`.

Usamos os limites de carregamento para permitir uma experiência otimizada de relatórios. Medimos as chamadas de API de acordo com o volume, assim como os recursos exigidos. Permitimos um limite de carga fixo por app, por segundo. Se o limite for excedido, haverá uma falha nas solicitações.

Verifique o cabeçalho HTTP `x-fb-ads-insights-throttle` retornado com cada resposta da API para saber se o app está próximo do limite e ver uma estimativa do peso que uma determinada consulta pode ter. As chamadas de insights também estão sujeitas aos limites da conta de anúncios padrão mostrados no cabeçalho HTTP `x-ad-account-usage`. Veja mais informações em [Boas práticas](/docs/marketing-api/best-practices/#adsoverview).

Quando um app atinge o limite, a chamada recebe uma resposta de erro com `error_code = 4, CodedException`. Você deve se manter abaixo do limite. Caso um app atinja os limites permitidos, somente uma certa porcentagem das solicitações passará, dependendo da consulta e do volume.

Aplicamos a limitação de volume a cada app que envia chamadas `/insights` síncronas e assíncronas combinadas. Os dois principais parâmetros com relação aos quais os limites são contados são por app e por conta de anúncios.

Veja a seguir um exemplo do cabeçalho HTTP informando a pontuação acumulada de um app em porcentagem dos limites:

```
X-FB-Ads-Insights-Throttle: { "app_id_util_pct": 100, "acc_id_util_pct": 10, "ads_api_access_tier": "standard_access" }
```

O cabeçalho "x-fb-ads-insights-throttle" é um valor em JSON contendo estas informações:

-   `app_id_util_pct`: a porcentagem da capacidade alocada que o app\_id associado consumiu.
    
-   `acc_id_util_pct`: a porcentagem da capacidade alocada que o account\_id de anúncios associado consumiu.
    
-   `ads_api_access_tier`: os níveis permitem que o app acesse a API de Marketing. `standard_access` habilita uma limitação de volume menor.
    

### Limites de volume globais

Em períodos com elevada carga global no ponto de extremidade `/insights`, o sistema poderá restringir as solicitações para proteger o back-end. Isso ocorre quando recebemos de forma simultânea um número elevado de consultas com alta complexidade (intervalos de tempo longos, métricas complexas e/ou grande número de IDs de objeto de anúncio). Isso causará um erro semelhante a este:

```
error_code = 4,  CodeException (error subcode: 1504022), error_title: Too many API requests
```

Nesses períodos, recomendamos reduzir as chamadas, esperar alguns minutos e consultar de novo.

### Boas práticas de limites de volume

-   O envio de várias consultas de uma só vez apresenta maior probabilidade de acionar nossa limitação de volume. Procure distribuir suas consultas `/insights` regulando-as com tempos de espera no seu trabalho.
    
-   Use as informações de volume do cabeçalho de resposta HTTP para moderar suas chamadas. Adicione um mecanismo de recuo para reduzir ou pausar suas consultas `/insights` se chegar próximo dos 100% no app ou na conta de anúncios específica.
    
-   Reportamos os dados de insights sobre anúncios no fuso horário da conta de anúncios. Para consultar diariamente os dados de informações da conta de anúncios associada, considere o horário do dia empregando o fuso horário da conta. Isso ajuda na regularidade das consultas durante o dia.
    
-   Verifique o `ads_api_access_tier` que permite o acesso à API de Marketing. Por padrão, os apps têm o nível `development_access`, e `standard_access` habilita uma limitação de volume menor. Para aumentar o limite de volume e chegar ao nível padrão, você pode solicitar "acesso avançado" ao recurso [Acesso Padrão ao Gerenciamento de Anúncios](/docs/marketing-api/overview/authorization#layer-2--access-levels--permissions--and-features).
    

[](#)

## Trabalhos assíncronos da API de Insights

Buscar estatísticas em vários objetos e aplicar filtros e classificação; agora, o fluxo de trabalho foi simplificado:

#### 1\. Envie uma solicitação `POST` ao ponto de extremidade `<AD_OBJECT>/insights`, que retorna um `id` de uma [geração de relatórios de anúncio](/docs/marketing-api/reference/ad-report-run).

```
{
  "report_run_id": 6023920149050,
}
```

Não armazene o `report_run_id` para uso prolongado, já que ele expira após 30 dias.

#### 2\. As gerações de relatórios de anúncio contêm informações sobre trabalhos assíncronos, como `async_status`. Faça uma pesquisa neste campo até `async_status` ser `Job Completed` e `async_percent_completion` ser `100`.

```
{
  "id": "6044775548468",
  "account_id": "1010035716096012",
  "time_ref": 1459788928,
  "time_completed": 1459788990,
  "async_status": "Job Completed",
  "async_percent_completion": 100
}
```

**Observação:** a partir da versão 25.0 da API de Marketing, se o relatório falhar, você verá os campos correspondentes `error_code`, `error_message`, `error_subcode`, `error_user_title`, e `error_user_msg` retornados por padrão. Para saber mais sobre os códigos de erro retornados, consulte [Códigos de erro dos insights sobre anúncios](/docs/marketing-api/insights/error-codes).

#### 3\. Depois, consulte a borda `<AD_REPORT_RUN_ID>/insights` para buscar o resultado final.

```
{
  "data": [
    {
      "impressions": "9708",
      "date_start": "2009-03-28",
      "date_stop": "2016-04-04"
    },
    {
      "impressions": "18841",
      "date_start": "2009-03-28",
      "date_stop": "2016-04-04"
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

Este trabalho consulta todas as estatísticas das contas e retorna um ID de trabalho assíncrono:

```
v24.0
```

### Status de trabalho assíncrono

Status

Descrição

`Job Not Started`

O trabalho ainda não foi iniciado.

`Job Started`

O trabalho foi iniciado, mas ainda não está em veiculação.

`Job Running`

O trabalho começou a ser veiculado.

`Job Completed`

O trabalho foi concluído com sucesso.

`Job Failed`

O trabalho falhou. Revise sua consulta e tente novamente.

`Job Skipped`

O trabalho expirou e foi ignorado. Reenvie seu trabalho e tente novamente.

[](#)

## Exportar relatórios

Fornecemos um ponto de extremidade para você exportar `<AD_REPORT_RUN_ID>` em um formato localizado legível.

Observação: esse ponto de extremidade não faz parte da Graph API com controle de versão e não está em conformidade com a política de alterações disruptivas. Scripts e programas não devem depender do formato do resultado, visto que ele pode mudar inesperadamente.

```
curl -G \
  -d 'report_run_id=<AD_REPORT_RUN_ID>' \
  -d 'name=myreport' \
  -d 'format=xls' \
'https://www.facebook.com/ads/ads_insights/export_report/'
```

Nome

Descrição

`name`

_string_

Nome do arquivo baixado

`format`

_enum{csv,xls}_

Formato do arquivo

`report_run_id`

_integer_

ID do relatório a ser executado

`access_token`

_string_

Permissões concedidas pelo usuário conectado. Forneça essa informação para exportar relatórios para outro usuário.

[](#)

## Discrepância com o Gerenciador de Anúncios

A partir de 10 de junho de 2025, para reduzir discrepâncias com o Gerenciador de Anúncios da Meta, `use_unified_attribution_setting` e `action_report_time parameters` serão desconsiderados e as respostas da API imitarão as configurações do Gerenciador de Anúncios:

-   Os valores atribuídos (`value`) serão baseados nas configurações de atribuição no nível do conjunto de anúncios (semelhante a `use_unified_attribution_setting=true`), e as ações inline/no anúncio serão incluídas nos dados da janela de atribuição de `1d_click` ou `1d_view`. Depois dessa alteração, os dados de janela de atribuição `inline` independentes não serão retornados.
    
-   As ações serão registradas usando `action_report_time=mixed`: as ações na Meta (por exemplo, cliques no link) usarão o tempo de relatórios baseado em impressões. Já as ações fora da Meta (por exemplo, compras na web) aproveitarão o tempo de relatórios baseado em conversões.
    

Os comportamentos padrão da API e do Gerenciador de Anúncios são diferentes. Se você quiser observar o mesmo comportamento do Gerenciador de Anúncios, defina o campo `use_unified_attribution_setting` como `true`.

[](#)