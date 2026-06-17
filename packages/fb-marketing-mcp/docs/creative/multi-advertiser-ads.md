---
title: "Anúncios com vários anunciantes - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/multi-advertiser-ads"
scraped_at: "2026-02-01T13:54:11.813Z"
---

# Anúncios com vários anunciantes

A veiculação de anúncios com vários anunciantes será `OPT-IN` por padrão a partir do dia 19 de agosto de 2024. Os parceiros precisarão implementar a solicitação de vários anunciantes para recusar os anúncios com vários anunciantes. A partir do dia 19 de agosto, os anúncios criados sem especificar o campo `enroll_status` em `contextual_multi_ads field` aceitarão anúncios com vários anunciantes por padrão.

Esses anúncios mostram publicidade de vários anunciantes, ajudando-os a impulsionar o desempenho ao alcançar mais pessoas que desejam aprofundar as próprias jornadas de compras. Os anúncios com vários anunciantes estão disponíveis para posicionamentos selecionados no Facebook e no Instagram. Para mais informações, consulte a [Central de Ajuda para Empresas](https://www.facebook.com/business/help/1024826868233885).

## Compatibilidade da API com anúncios com vários anunciantes

Todas as versões da API de Marketing são compatíveis com anúncios com vários anunciantes. Os anúncios com vários anunciantes são compatíveis com todos os objetivos de campanha e todos os formatos de anúncio, em todos os posicionamentos disponíveis. O campo `enroll_status` precisa ser fornecido com um valor `OPT_IN` ou `OPT_OUT`. A partir do dia 19 de agosto de 2024, os anúncios criados sem especificar o campo `enroll_status` aceitarão anúncios com vários anunciantes por padrão.

[](#)

## Criação do anúncio

### Solicitação

```
v24.0
```

Para saber mais, consulte [Ad Creative](/docs/marketing-api/reference/ad-creative#create_example).

### Parâmetros

Nome

Descrição

`contextual_multi_ads`

O campo `enroll_status` pode ser definido como `OPT_IN` ou `OPT_OUT`. Para mais informações, consulte [Ad Creative Features Details](/docs/marketing-api/reference/ad-creative-feature-details/).

[](#)

## Saiba mais

-   **Central de Ajuda para Empresas**
    
    -   [Sobre os anúncios com vários anunciantes](https://www.facebook.com/business/help/1024826868233885)
        
    
-   **Referência da API de Marketing**
    
    -   [Ad Creative](/docs/marketing-api/reference/ad-creative#fields)
        
    -   [Ad Account Ads](/docs/marketing-api/reference/ad-account/ads/)
        
    

[](#)