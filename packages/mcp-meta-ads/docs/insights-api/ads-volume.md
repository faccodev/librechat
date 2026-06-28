---
title: "Volume de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/insights-api/ads-volume"
scraped_at: "2026-02-01T14:00:10.760Z"
---

# Volume de anúncios

Veja o volume de anúncios _em veiculação ou em análise_ das suas contas de anúncios. Esses anúncios são contabilizados no limite de anúncios por página instituído no início de 2021. Consulte o número de anúncios em veiculação ou em análise de determinada conta de anúncios.

## Ver volume da sua conta de anúncios

Para ver o volume de anúncios da sua conta:

```
curl -G \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT_ID>/ads_volume"
```

**Resposta**

```
{"data":[{"ads_running_or_in_review_count":2}]}
```

Consulte [Sobre o gerenciamento do volume de anúncios](https://www.facebook.com/business/help/2720085414702598) para mais informações.

[](#)

## Verificar status em veiculação ou em análise

Para ver se um anúncio está em veiculação ou em análise, verifique `effective_status`, `configured_status` e o status da conta de anúncios:

-   Se o `effective_status` de um anúncio for `1` - `active`, isso significa que o estado dele é _em veiculação ou em análise_.
    
-   Se o `configured_status` de um anúncio for `active` e o `effective_status` for `9` - `pending review` ou `17` - `pending processing`, isso significa que o anúncio está _em veiculação_ ou _em análise_.
    
-   O anúncio só poderá estar _em veiculação_ ou _em análise_ se o status da conta de anúncio for `1` - `active`, `8` - `pending settlement` ou `9` - `in grace period`.
    

Também determinamos se um anúncio está em veiculação ou em análise com base na programação do conjunto de anúncios:

-   Se a hora de início for anterior à atual e a hora atual for anterior à hora de término, isso significa que o anúncio está em veiculação ou em análise.
    
-   Se a hora de início for anterior à atual e o conjunto de anúncios não tiver uma hora de término, isso também significa que o anúncio está em veiculação ou em análise.
    

Por exemplo, se a veiculação do conjunto de anúncios estiver programada para o futuro, isso significa que os anúncios não estão em veiculação ou em análise. No entanto, se a veiculação do conjunto de anúncios estiver programada entre agora e 3 meses no futuro, isso significa que os anúncios estão em veiculação ou em análise.

Se você estiver usando recursos especiais de programação de anúncios (como divisão do dia), consideraremos o anúncio como em veiculação ou em análise durante o _dia todo_, não só na parte do dia em que o anúncio começou a ser veiculado.

[](#)

## Detalhamento por atores

Use o campo `show_breakdown_by_actor` para obter um detalhamento dos limites de anúncios por um `actor_id` específico:

```
curl -G \
  -d "show_breakdown_by_actor=true" \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT_ID>/ads_volume"
```

**Resposta**

```
{
  "data": [
    {
      "ads_running_or_in_review_count": 0,
      "current_account_ads_running_or_in_review_count": 0,
      "actor_id": "<ACTOR_ID_1>",
      "recommendations": [
      ]
    },
    {
      "ads_running_or_in_review_count": 2,
      "current_account_ads_running_or_in_review_count": 2,
      "actor_id": "<ACTOR_ID_2>",
      "recommendations": [
      ]
    }
  ],
}
```

Use `page_id` para obter os limites de anúncios de uma página específica:

```
curl -G \
  -d "page_id=<PAGE_ID>" \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/v<API_VERSION>/act_<AD_ACCOUNT_ID>/ads_volume"
```

**Resposta**

```
{
  "data": [
    {
      "ads_running_or_in_review_count": 2,
      "current_account_ads_running_or_in_review_count": 2,
      "actor_id": "<ACTOR_ID>",
      "recommendations": [
      ]
    }
  ],
}
```

### Campos compatíveis

Campo

Descrição

`actor_id`

Ator ao qual o limite é aplicado. No momento, ele é representado pela identificação da página.

`ads_running_or_in_review_count`

Número de anúncios em veiculação ou em análise de um ator específico.

`current_account_ads_running_or_in_review_count`

Número de anúncios em veiculação ou em análise de um ator específico na conta de anúncios atual.

`actor_name`

Ator ao qual o volume de anúncios foi agregado. No momento, ele é representado pelo nome da página.

`ad_limit_scope_business`

Usado quando uma conta de anúncios pertence a um Gerenciador de Negócios **e** está sujeita aos limites de anúncios no respectivo nível.

  

Esse campo tem a empresa que define os limites de anúncio na conta de anúncios.

`ad_limit_scope_business_manager_id`

Usado quando uma conta de anúncios pertence a um Gerenciador de Negócios **e** está sujeita aos limites de anúncios no respectivo nível.

  

Esse campo tem o ID do Gerenciador de Negócios de uma empresa que define os limites de anúncio na conta.

`ad_limit_set_by_page_admin`

Limite de anúncios definido por um administrador da página da empresa proprietária da conta.

`ads_running_or_in_review_count_subject_to_limit_set_by_page`

Número de anúncios em veiculação ou em análise de um grupo de contas. Nesse caso, o grupo pode conter contas de anúncios pertencentes a uma conta empresarial ou individual.

  

Se o limite de anúncios não for definido pelo proprietário da página, o valor retornado será `null`.

  

Se o limite de anúncios for definido pelo proprietário da página, o valor retornado será o número de anúncios em veiculação ou em análise no grupo de contas.

`future_limit_activation_date`

A data de início do limite de anúncios que entrará em vigor.

`future_limit_on_ads_running_or_in_review`

O limite de anúncios que entrará em vigor. Esse limite é relacionado ao número de anúncios em veiculação ou em análise de determinado ator.

`limit_on_ads_running_or_in_review`

O limite de anúncios atual do ID de determinado ator. Esse limite está relacionado ao número de anúncios em veiculação ou em análise.

`recommendations`

Recomendações para reduzir o volume de anúncios. Atualmente, os seguintes valores são compatíveis:

-   `zero_impression`
    
-   `learning_limited`
    
-   `top_campaigns_with_ads_under_cap`
    
-   `top_adsets_with_ads_under_cap`
    

Para mais informações, acesse a [Central de Ajuda para Empresas](https://www.facebook.com/business/help/2720085414702598).

### Parâmetros

Campo

Descrição

`recommendation_type`

Tipo de recomendação para reduzir o volume de anúncios. Atualmente, os seguintes valores são compatíveis:

-   `zero_impression`
    
-   `learning_limited`
    
-   `top_campaigns_with_ads_under_cap`
    
-   `top_adsets_with_ads_under_cap`
    

Saiba mais [Sobre o gerenciamento do volume de anúncios](https://www.facebook.com/business/help/2720085414702598).

[](#)