---
title: "Estimativa de resultados diários - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/estimated-daily-results"
scraped_at: "2026-02-01T14:28:52.178Z"
---

# Estimativa de resultados diários

Esta API está sendo implementada em fases, o que significa que talvez você não tenha acesso imediato.

Obtenha a estimativa de lance, de pessoas ativas diária e mensalmente, bem como da curva de resultados para uma [meta de otimização](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign), uma especificação de direcionamento, uma [especificação de atribuição](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign) e um [objeto promovido](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign) quando aplicável. Na curva de resultados, cada ponto representa uma estimativa de alcance e um número estimado de resultados (impressões, ações) para um gasto específico.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=869998425536959&version=1765444278)

Pontos de extremidade para obter a estimativa de resultados diários:

-   [`/{AD_ACCOUNT}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate): o ponto de extremidade delivery\_estimate funciona no nível da conta de anúncios, apesar de targeting\_spec estar definido para [conjuntos de anúncios](/docs/marketing-api/reference/ad-campaign).
    
-   [`/{AD_SET}/delivery_estimate`](/docs/marketing-api/reference/ad-campaign/delivery_estimate/): todos os parâmetros são opcionais no nível do conjunto de anúncios, e as configurações atuais do conjunto são aplicadas por padrão.
    

A estimativa de lance pode variar para o mesmo direcionamento quando você a chama de contas de anúncios diferentes. Isso acontece porque são consideradas as informações históricas da conta de anúncios, gerando uma estimativa personalizada.

As estimativas de veiculação aparecem como Alcance diário e Curva de resultados no [Gerenciador de Anúncios](https://www.facebook.com/ads/manager). **Essas informações não são usadas para outras estimativas** no [Gerenciador de Anúncios](https://www.facebook.com/ads/manager).