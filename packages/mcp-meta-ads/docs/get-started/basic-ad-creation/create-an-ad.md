---
title: "Criar um anúncio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad"
scraped_at: "2026-02-01T14:06:20.730Z"
---

# Criar um anúncio

O conjunto de anúncios e o criativo formam o anúncio.

Para criar o anúncio, envie uma solicitação `POST` ao ponto de extremidade `/act_<AD_ACCOUNT_ID>/ads` junto com parâmetros como a `adset_id` e os detalhes do `creative`.

**Exemplo de solicitação da API:**

```
v24.0
```

### Parâmetros necessários

Nome

Descrição

`adset_id`

A identificação do conjunto de anúncios sob a qual o anúncio será veiculado.

`creative`

Contém a identificação do criativo do anúncio.

`status`

Defina como `ACTIVE` para exibir o anúncio imediatamente.

[](#)

## Saiba mais

-   [Referência sobre anúncios da conta de anúncios](/docs/marketing-api/reference/ad-account/ads)
    
-   [Referência sobre anúncios](/docs/marketing-api/reference/adgroup)
    

[](#)

[

←

Voltar

Create an Ad Creative

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative)

[

→

Avançar

Manage Campaigns

](/docs/marketing-api/get-started/manage-campaigns)

[](#)