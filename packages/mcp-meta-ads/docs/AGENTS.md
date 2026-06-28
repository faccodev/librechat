# Facebook Marketing API - Documentação

Documentação completa da API de Marketing do Facebook (Meta) para gestão de anúncios.

## Visão Geral

Esta documentação cobre todos os aspectos da API de Marketing, desde autenticação até operações avançadas de campanhas, audiências e conversões.

## Seções Principais

### Primeiros Passos
- [get-started/](./get-started/) - Autenticação, criação básica de anúncios e otimização
- [overview/](./overview/) - Visão geral da API

### Estrutura de Anúncios
- [adcampaign/](./adcampaign/) - Campanhas
- [adset/](./adset/) - Conjuntos de anúncios
- [ad-creative/](./ad-creative/) - Criativos

### Audiências e Targeting
- [audiences/](./audiences/) - Públicos personalizados, semelhantes e targeting
- [targeting-specs/](./targeting-specs/) - Especificações de targeting
- [targeting-search/](./targeting-search/) - Busca de targeting

### Métricas e Insights
- [insights/](./insights/) - API de Insights para métricas e relatórios
- [insights-api/](./insights-api/) - Referência da API de Insights

### Conversões e Tracking
- [conversions-api/](./conversions-api/) - Conversions API (CAPI) para tracking server-side
- [facebook-pixel/](./facebook-pixel/) - Facebook Pixel
- [server-side-api/](./server-side-api/) - API Server-Side

### Catálogo e E-commerce
- [catalog/](./catalog/) - Catálogos de produtos
- [dynamic-product-ads/](./dynamic-product-ads/) - Anúncios dinâmicos de produtos
- [dynamic-ads/](./dynamic-ads/) - Anúncios dinâmicos

### Tipos de Anúncios
- [guides/](./guides/) - Guias de tipos de anúncios (vídeo, carrossel, leads, etc.)
- [creative/](./creative/) - Recursos de criativos

### Recursos Avançados
- [bidding/](./bidding/) - Estratégias de lance
- [bidding-and-optimization/](./bidding-and-optimization/) - Otimização de lance
- [advantage-shopping-campaigns/](./advantage-shopping-campaigns/) - Campanhas Advantage+
- [advantage-catalog-ads/](./advantage-catalog-ads/) - Anúncios de catálogo Advantage+

### Referência Técnica
- [reference/](./reference/) - Referência completa de todos os objetos da API
- [error-reference/](./error-reference/) - Referência de erros

### Administração
- [businessmanager/](./businessmanager/) - Business Manager
- [system-users/](./system-users/) - Usuários de sistema

## Arquivos Úteis

- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Referência rápida com endpoints e exemplos comuns
- [best-practices.md](./best-practices.md) - Boas práticas gerais
- [marketing-api-changelog/](./marketing-api-changelog/) - Changelog de versões

## Hierarquia de Objetos

```
Business Manager
└── Ad Account (Conta de Anúncios)
    ├── Campaign (Campanha)
    │   └── Ad Set (Conjunto de Anúncios)
    │       └── Ad (Anúncio)
    │           └── Creative (Criativo)
    ├── Custom Audience (Público Personalizado)
    ├── Product Catalog (Catálogo de Produtos)
    └── Pixel
```

## Links Externos

- [Documentação Oficial](https://developers.facebook.com/docs/marketing-api/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Marketing API Reference](https://developers.facebook.com/docs/marketing-api/reference/)
