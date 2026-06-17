---
title: "Pós-processamento para criação de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/using-the-api/post-processing"
scraped_at: "2026-02-01T14:03:12.446Z"
---

# Pós-processamento para edições e criação de anúncios

Nas versões anteriores à 4.0, a compra de anúncios poderia causar tempo limite do sistema, atrasos ou erros de falta de memória. Para dimensionar o sistema, dissociamos a lógica que requer computação significativa e que causa erros passageiros para um fluxo de trabalho separado chamado de _pós-processamento_. Agora, ao criar ou editar anúncios, o sistema ficará mais resistente a erros passageiros. O processo ocorre conforme descrito a seguir:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/68123810_979813689077002_384830195003031552_n.png?_nc_cat=110&ccb=1-7&_nc_sid=f537c7&_nc_ohc=BhHytcwo3_QQ7kNvwESG2S1&_nc_oc=AdnK9Xm7Cltg6C4w8212oQ2vjBF1IjuMJmgLXbb0-Jbhu3lQompHphhFO2NtNOo26VpHrXvnMtXXPrf6HKXazOZU&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=_k1M__8crb9-D3MPtK7-2w&oh=00_AfudVHSSl8kPFVpfn94zp1pzyEhG63AnoR_-1RnfPjC7sA&oe=69852A80)

Para representar uma fase de pós-processamento depois que uma solicitação é recebida, apresentamos o status de execução de anúncios `IN-PROCESS` na Versão 4.0. Esse novo status se aplica a:

-   `{campaign_ID}`,
    
-   `{ad_set_ID}`,
    
-   `{ad_ID}` e
    
-   `{ad_creative_ID}`.
    

Para campanhas, conjuntos de anúncios e anúncios, isso afeta:

Campo

Versão 4.0 e posteriores

Versões anteriores à 4.0

`effective_status (enum {ACTIVE, PAUSED, DELETED, PENDING_REVIEW, DISAPPROVED, PREAPPROVED, PENDING_BILLING_INFO, CAMPAIGN_PAUSED, ARCHIVED, ADSET_PAUSED, WITH_ISSUES, IN_PROCESS})`

`IN_PROCESS`

Para campanhas ou conjuntos de anúncios: `configured_status` ou `status`. Para anúncios: `pending_review`.

`configured_status enum {ACTIVE, PAUSED, DELETED, ARCHIVED}`

Nenhuma alteração

Nenhuma alteração

`status (enum {ACTIVE, PAUSED, DELETED, ARCHIVED})`

Nenhuma alteração

Nenhuma alteração

A fase de pós-processamento aparece em `effective_status` de campanhas, conjuntos de anúncios e anúncios. No caso de criativos do anúncio, ela aparece no campo `status`. Por exemplo, é possível consultar o status do seu objeto em `/creative_id?fields=status`. Na fase de pós-processamento, você verá:

```
{
 "status": "IN-PROCESS", 
 "id": "<creative_id>"
}
```

Se o pós-processamento do seu criativo do anúncio for bem-sucedido, você verá:

```
{ 
"status": "ACTIVE", 
"id": "<creative_id>"
}
```

Caso ocorra uma falha no pós-processamento, definiremos seu objeto para `WITH_ISSUES` e retornaremos um erro em `issues_info`. Por exemplo, em `creative_ID?fields=status, issues_info`:

```
{ 
"status": "WITH_ISSUES", 
"issues_info": [ 
{ 
"level": "CREATIVE", 
"error_code": 1815869, 
"error_summary": "Ad post is not available", 
"error_message": "The Facebook post associated with your ad is not available. It may have been removed, or you may not have permission to view it." } 
], 
"id": "<creative_id>"
}
```

Quando o objeto de anúncio for `IN_PROCESS`, você ainda poderá atualizar o objeto e seus derivados regularmente.