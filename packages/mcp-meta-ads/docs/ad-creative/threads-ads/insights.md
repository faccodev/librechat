---
title: "Insights sobre anúncios do Threads - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/ad-creative/threads-ads/insights"
scraped_at: "2026-02-01T14:12:58.685Z"
---

# Gerar insights sobre anúncios do Threads

Para gerar estatísticas sobre seus anúncios do Threads, use a [API de Insights](/docs/marketing-api/insights) da conta de anúncios.

```
v24.0
```

### Limitações

-   Estamos mantendo um volume intencionalmente baixo para anúncios no Threads à medida que fazemos testes e descobertas e, por isso, esperamos que a veiculação de anúncios seja baixa. Caso sua campanha seja veiculada no Threads, você observará isso nos seus relatórios de detalhamento de posicionamento.
    

## Detalhamentos

Se estiver veiculando uma campanha no Instagram, no Facebook e no Threads, adicione `breakdowns=publisher_platform, platform_position` para ver as estatísticas de cada posicionamento separadamente:

```
v24.0
```

O resultado do Threads aparece assim:

```
{
"data": [
  
    {
      "impressions": "168",
      "date_start": "2024-03-26",
      "date_stop": "2024-04-24",
      "publisher_platform": "threads",
      "platform_position": "threads_feed"
    },
      ],
  "paging": {
    ...
  }
}
```

Ao pedir o detalhamento por `publisher_platform, platform_position` em insights sobre uma campanha de anúncios, a única opção para a plataforma do Threads é `threads_feed`.

Existem outras combinações de detalhamento que permitem o uso de `publisher_platform, platform_position`. Para rastrear o desempenho de anúncios com posicionamentos no Threads por meio de ferramentas externas, use a macro `url_tags`[`SITE_SOURCE_NAME`](/docs/marketing-api/guides/instagramads/ad_creative#tag) para diferenciar os posicionamentos.

[](#)

## Tags de rastreamento

As tags de visualização não estão disponíveis publicamente. Se permitirmos tags de visualização de um fornecedor aprovado em campanhas do Facebook para dispositivos móveis, também as permitiremos em anúncios do Threads. Use o campo [criativo do anúncio](/docs/marketing-api/adcreative)`url_tag` com anúncios do Threads.

É possível usar tags de rastreamento de terceiros nos anúncios do Threads, mas a veiculação de anúncios não é otimizada para essas ferramentas. Para garantir que a ferramenta de rastreamento de terceiros possa rastrear os anúncios do Threads da forma correta, use o campo [criativo do anúncio](/docs/marketing-api/adcreative)`url_tag` com `utm_source=threads`.

[](#)