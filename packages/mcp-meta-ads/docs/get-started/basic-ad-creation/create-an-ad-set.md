---
title: "Criar um conjunto de anúncios - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set"
scraped_at: "2026-02-01T14:06:09.701Z"
---

# Criar um conjunto de anúncios

Depois de criar sua campanha, o próximo passo é criar um conjunto de anúncios para fazer parte dela. O conjunto de anúncios contém as informações de lances, direcionamento e orçamento da sua campanha.

Para criar um conjunto de anúncios dentro da sua campanha, envie uma solicitação `POST` ao ponto de extremidade `/act_<AD_ACCOUNT_ID>/adsets`. Os parâmetros importantes incluem o `name` do conjunto de anúncios, a `campaign_id` associada, as especificações de `targeting` e os detalhes do `daily_budget`.

**Exemplo de solicitação da API:**

```
v24.0
```

### Parâmetros necessários

Nome

Descrição

`campaign_id`

A identificação da campanha à qual o conjunto de anúncios pertence.

`daily_budget`

O orçamento diário especificado em centavos.

`targeting`

O público-alvo baseado em localizações geográficas.

[](#)

## Saiba mais

-   [Referência sobre conjuntos de anúncios da conta de anúncios](/docs/marketing-api/reference/ad-account/adsets)
    
-   [Referência sobre conjunto de anúncios](/docs/marketing-api/reference/ad-campaign)
    

[](#)

[

←

Voltar

Create an Ad Campaign

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign)

[

→

Avançar

Create an Ad Creative

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative)

[](#)