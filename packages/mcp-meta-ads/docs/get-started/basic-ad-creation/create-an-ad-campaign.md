---
title: "Criar uma campanha de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign"
scraped_at: "2026-02-01T13:52:21.489Z"
---

# Criar uma campanha de anúncios

O primeiro passo para lançar uma campanha de anúncios é criar a campanha usando a API.

Para criar uma campanha de anúncios, envie uma solicitação `POST` ao ponto de extremidade `/act_<AD_ACCOUNT_ID>/campaigns` com os parâmetros-chave, incluindo `name`, `objective` e `status`.

**Exemplo de solicitação da API:**

```
v24.0
```

### Parâmetros necessários

Nome

Descrição

`name`

O nome da campanha.

`objective`

O objetivo da campanha, por exemplo, `LINK_CLICKS`.

`status`

O status inicial da campanha, geralmente definido como `PAUSED` ao ser criado pela primeira vez.

[](#)

## Saiba mais

-   [Referência sobre campanhas da conta de anúncios](/docs/marketing-api/reference/ad-account/campaigns)
    
-   [Referência sobre campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group)
    

[](#)

[

←

Voltar

Basic Ad Creation

](/docs/marketing-api/get-started/basic-ad-creation)

[

→

Avançar

Create an Ad Set

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set)

[](#)