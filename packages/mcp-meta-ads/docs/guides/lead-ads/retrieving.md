---
title: "Recuperação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving"
scraped_at: "2026-02-01T14:12:15.411Z"
---

# Como recuperar leads

É possível recuperar leads com [Webhooks](#webhooks) ou [leitura em lote](#bulk-read).

## Antes de começar

Para ler campos de anúncios específicos, como `ad_id` ou `campaign_id`, você precisará do seguinte:

-   Um token de acesso do usuário ou da Página solicitado por alguém com permissão para anunciar na conta de anúncios e [na Página](/docs/pages/overview#tasks)
    
-   A [Permissão `ads_management`](/docs/permissions/reference/ads_management)
    
-   A [permissão `pages_read_engagement`](/docs/permissions/reference/pages_read_management)
    
-   A [permissão `pages_show_list`](/docs/permissions/reference/pages_show_list)
    
-   A [permissão `pages_manage_metadata`](/docs/permissions/reference/pages_manage_metadata) (caso você use webhooks)
    

Para recuperar todos os dados de lead e de nível de anúncio, você precisará do seguinte:

-   Um token de acesso do usuário ou da Página solicitado por alguém com permissão para anunciar na conta de anúncios e [na Página](/docs/pages/overview#tasks)
    
-   A [permissão `ads_management`](/docs/permissions/reference/ads_management)
    
-   A [permissão `leads_retrieval`](/docs/permissions/reference/leads_retrieval)
    
-   A [Permissão `pages_show_list`](/docs/permissions/reference/pages_show_list)
    
-   A [Permissão `pages_read_engagement`](/docs/permissions/reference/pages_read_management)
    
-   A [permissão `pages_manage_ads`](/docs/permissions/reference/pages_manage_ads)
    

**Observação:** caso o administrador da Página nunca tenha personalizado leads nem concedido permissão de acesso com o Gerenciador de Acesso a Leads, todos os administradores da Página terão permissão de acesso a leads. Um administrador básico da Página pode ou não ter permissão de acesso a leads. Isso depende dos administradores da empresa, que podem personalizar essa permissão.

## Limites de volume

O limite de volume é 200 x 24 multiplicado pelo número de leads criados nos últimos 90 dias para uma Página do Facebook. Caso você ultrapasse esse limite de chamadas em um período de 24 horas, sua solicitação retornará um erro.

[](#)

## Filtrar por intervalo de datas

Envie uma solicitação `GET` ao ponto de extremidade `/ads/lead_gen/export_csv/` em que os formatos de data sejam registros de data e hora `POSIX` ou `UNIX`.

```
curl -i -X GET "https://www.facebook.com/ads/lead_gen/export_csv/
    ?id=<FORM_ID>
    &type=form
    &from_date=1482698431
    &to_date=1482784831"
```

#### Atenção

-   Caso `from_date` não esteja definido ou seja um valor anterior ao horário de criação do formulário, esse horário será usado.
    
-   Caso `to_date` não esteja definido ou seja posterior ao horário atual, usaremos esse horário.
    
-   Em caso de uma entrada sem identificação do anúncio ou IDs de grupo de anúncio no TSV, as possíveis causas são as seguintes:
    
    -   O lead foi gerado pelo alcance orgânico. Nesse caso, `is_organic` no TSV exibirá `1`. Caso contrário, o valor será `0`.
        
    -   O lead pode ter sido enviado de uma prévia do anúncio.
        
    -   A pessoa que está solicitando leads não tem privilégios de anunciante na conta de anúncios.
        
    

[](#)

## Webhooks

Obtenha atualizações em tempo real sobre anúncios de lead.

### Etapa 1: introdução

Consulte o [guia de introdução a Webhooks](/docs/graph-api/webhooks/getting-started) para configurar seu ponto de extremidade e webhook.

### Etapa 2: obter um token de acesso à Página de longa duração

Gere um único [token de Página de longa duração](https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing/#get-a-long-lived-page-access-token) para continuar a buscar dados sem se preocupar com a expiração.

### Etapa 3: instalar o seu app na Página

Consulte o nosso [guia de Webhooks para Páginas](/docs/graph-api/webhooks/getting-started/webhooks-for-pages#install-app) e saiba como instalar o seu app em uma Página.

### Resposta do webhook

Quando você cria a geração de leads, seu app recebe a seguinte resposta de webhook:

```
array(
  "object" => "page",
  "entry" => array(
    "0" => array(
      "id" => 153125381133,
      "time" => 1438292065,
      "changes" => array(
        "0" => array(
          "field" => "leadgen",
          "value" => array(
            "leadgen_id" => 123123123123,
            "page_id" => 123123123,
            "form_id" => 12312312312,
            "adgroup_id" => 12312312312,
            "ad_id" => 12312312312,
            "created_time" => 1440120384
          )
        ),
        "1" => array(
          "field" => "leadgen",
          "value" => array(
            "leadgen_id" => 123123123124,
            "page_id" => 123123123,
            "form_id" => 12312312312,
            "adgroup_id" => 12312312312,
            "ad_id" => 12312312312,
            "created_time" => 1440120384
          )
        )
      )
    )
  )
)
```

Você pode usar `leadgen_id` para recuperar dados associados ao lead:

```
v24.0
```

Se o processo for bem-sucedido, o app receberá a seguinte resposta:

```
{
  "created_time": "2015-02-28T08:49:14+0000", 
  "id": "<LEAD_ID>", 
  "ad_id": "<AD_ID>",
  "form_id": "<FORM_ID>",
  "field_data": [{
    "name": "car_make",
    "values": [
      "Honda"
    ]
  }, 
  {
    "name": "full_name", 
    "values": [
      "Joe Example"
    ]
  }, 
  {
    "name": "email", 
    "values": [
      "joe@example.com"
    ]
  },
  {
    "name": "selected_dealer", 
    "values": [
      "99213450"
    ]
  }],
	...
}
```

### Saiba mais

-   Para auxiliar a migração dos dados de anúncios de lead para as ferramentas de gestão de relacionamento do cliente (CRM, pelas iniciais em inglês), muitas delas fornecem atualizações em tempo real. Consulte as [integrações de CRM disponíveis](https://www.facebook.com/business/help/908902042493104?__mref=message_bubble).
    
-   O ping para as atualizações em tempo real é estruturado da seguinte forma. Saiba mais sobre [atualizações em tempo real no blog](/ads/blog/post/2014/12/11/real-time-updates-for-page-conversions/).
    
-   Em caso de sucesso, os pings em tempo real ocorrerão nos eventos com um atraso de no máximo alguns minutos. Veja [como solucionar problemas de integrações em tempo real](/docs/marketing-api/guides/lead-ads/testing-troubleshooting/).
    

Veja um exemplo de implementação no nosso [repositório no GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Flead-ads-webhook-sample&h=AT1Hd2p39beGVdDjpL0muFZiZmUcthdwHyMlxgwvOSRg19vYgRHSvL0fMgTjItTuH1QaXj_QpqbSeTeD79ZP_braqjw0SBy-W2oOKfjxtAsRLzeDWgMc6uTe0CC28haaC8A1mvu81WQ9o26cI7TOyUnpy7IYUa4NDf1IlZtbGKk).

[](#)

## Leitura em lote

A permissão `leads_retrieval` é necessária para ler os leads.

Há `leads` no grupo de anúncios e em nós do formulário. Isso retorna todos os dados associados aos respectivos objetos. Como é possível reutilizar um formulário em diversos anúncios, **ele pode conter muito mais leads do que um anúncio**.

Para fazer a leitura em lote por anúncio:

```
v24.0
```

Para fazer a leitura por formulário:

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  -d 'fields=created_time,id,ad_id,form_id,field_data' \
  https://graph.facebook.com/<API_VERSION>/<FORM_ID>/leads
```

A resposta:

```
{
  "data": [
    {
      "created_time": "2018-02-28T08:49:14+0000", 
      "id": "<LEAD_ID>", 
      "ad_id": "<AD_ID>",
      "form_id": "<FORM_ID>",
      "field_data": [
        {
          "name": "car_make",
          "values": [
            "Honda"
          ]
        }, 
        {
          "name": "full_name", 
          "values": [
            "Joe Example"
          ]
        }, 
        {
          "name": "email", 
          "values": [
            "joe@example.com"
          ]
        },
      ], 
      ...
    }
  ],
  "paging": {
    "cursors": {
      "before": "OTc2Nz3M8MTgyMzU1NDMy", 
      "after": "OTcxNjcyOTg8ANTI4NzE4"
    }
  }
}
```

### Como ler um valor de pergunta do localizador de lojas

Uma pergunta do localizador de lojas não é diferente de nenhuma outra. Além disso, esse tipo de pergunta terá o ID do campo que será mapeado durante a criação do formulário. As perguntas do localizador de lojas serão enviadas de modo semelhante a outras perguntas. O valor informado virá do **número da loja** da localização selecionada.

Por exemplo, digamos que você tenha uma pergunta do localizador de lojas em que `selected_dealer` é o ID do campo. Para buscar os leads em lote, faça a seguinte chamada:

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  -d 'fields=created_time,id,ad_id,form_id,field_data' \
  https://graph.facebook.com/<API_VERSION>/<FORM_ID>/leads
```

A resposta:

```
{
  "data": [
    {
      "created_time": "2018-02-28T08:49:14+0000", 
      "id": "<LEAD_ID>", 
      "ad_id": "<AD_ID>",
      "form_id": "<FORM_ID>",
      "field_data": [
        {
          "name": "car_make",
          "values": [
            "Honda"
          ]
        }, 
        {
          "name": "full_name", 
          "values": [
            "Joe Example"
          ]
        }, 
        {
          "name": "email", 
          "values": [
            "joe@example.com"
          ]
        },
        {
          "name": "selected_dealer", 
          "values": [
            "99213450"
          ]
        }
      ], 
      ...
    }
  ],
  "paging": {
    "cursors": {
      "before": "OTc2Nz3M8MTgyMzU1NDMy", 
      "after": "OTcxNjcyOTg8ANTI4NzE4"
    }
  }
}
```

### Como ler respostas de avisos legais personalizados

`field_data` não contém as respostas às caixas de seleção opcionais de avisos legais personalizados que seriam marcadas pelo usuário. Use o campo `custom_disclaimer_responses` para recuperar as respostas.

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<LEADGEN_ID>?
fields=custom_disclaimer_responses"
```

Resposta:

```
{
  "custom_disclaimer_responses": [
    {
      "checkbox_key": "optional_1",
      "is_checked": "1"
    },
    {
      "checkbox_key": "optional_2",
      "is_checked": ""
    }
  ],
  "id": "1231231231"
}
```

### Como filtrar leads

O exemplo a seguir filtra leads com base em registros de data e hora. Os registros de data e hora devem estar no formato Unix.

```
v24.0
```

O `operator` tem um dos valores a seguir.

Operador

Significado

`LESS_THAN`

Filtra valores menores que o registro de data e hora.

`GREATER_THAN`

Filtra valores maiores que o registro de data e hora.

`GREATER_THAN_OR_EQUAL`

Filtra valores maiores ou iguais ao registro de data e hora.

### Geração de tokens

Caso o formulário tenha IDs de campos personalizados, os campos e valores especificados serão retornados.

[](#)

## Recursos

-   Plataforma do Marketplace: [Leads relacionados a veículos](/docs/marketplace/vehicles/retrieving-leads)
    
-   Gerenciador de Acesso a Leads: consulte os artigos [Sobre o Gerenciador de Acesso a Leads](https://www.facebook.com/business/help/1440176552713521?id=735435806665862) e [Atribuir ou remover permissões no Gerenciador de Acesso a Leads](https://www.facebook.com/business/help/540596413257598?id=735435806665862) na Central de Ajuda.
    

[](#)