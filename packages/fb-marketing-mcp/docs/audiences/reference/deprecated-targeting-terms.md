---
title: "Termos de direcionamento que se tornaram obsoletos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/deprecated-targeting-terms"
scraped_at: "2026-02-01T14:28:41.253Z"
---

# Termos de direcionamento que se tornaram obsoletos

Analisamos continuamente as opções de direcionamento disponíveis para fornecer experiências de anúncio relevantes e de qualidade para anunciantes e desenvolvedores. Desta forma, algumas opções de direcionamento podem se tornar obsoletas e os conjuntos de anúncios direcionados para esses objetos podem pausar a veiculação.

Para identificar os conjuntos de anúncios direcionados a opções de direcionamento que se tornaram obsoletas, use o seguinte ponto de extremidade de API:

```
curl -G \
  -d 'type=<TYPE_VALUE>'
  'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/deprecatedtargetingadsets
```

A resposta:

```
{"data":[{"id":"<ADSET_ID>"},{"id":"<ADSET_ID>"},{"id":"<ADSET_ID>"}]}
```

O parâmetro `type` é opcional. Caso não seja fornecido, o sistema retornará conjuntos de anúncios que se tornaram obsoletos por padrão.

-   `deprecating` – Valor padrão. Esses conjuntos de anúncios continuam veiculando, mas não podem ser duplicados em novos conjuntos de anúncios. Ao serem atualizados, os conjuntos de anúncios com termos que se tornaram obsoletos serão rejeitados a menos que os termos sejam removidos.
    
-   `delivery_paused` – Conjuntos de dados que tenham termos que não são mais válidos para veiculação e que foram pausados pelo Facebook.
    

Para verificar o status dos objetos listados na especificação de direcionamento de conjuntos de dados, use o parâmetro `targeting_option_list` na [Pesquisa de direcionamento](https://developers.facebook.com/docs/marketing-api/targeting-search).

É possível filtrar conjuntos de anúncios de contas de anúncios pelo estado de direcionamento usando o filtro `adset.targeting_state`. Por exemplo:

```
`<act_AD_ACCOUNT_ID>/adsets?filtering=[{"field":"adset.targeting_state","operator":"IN","value":["deprecating"]}]`
```

O filtro é compatível com esses valores: `normal`, `deprecating`, `delivery_affected` e `delivery_paused`.