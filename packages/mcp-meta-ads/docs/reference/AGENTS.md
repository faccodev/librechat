# Referência da API

Documentação técnica de referência para todos os objetos e endpoints da API de Marketing.

## Visão Geral

Esta seção contém a referência completa de todos os objetos, campos e endpoints da Graph API para Marketing.

## Subseções

### Conta e Negócios
- [ad-account/](./ad-account/) - Conta de anúncios (57 arquivos)
- [business/](./business/) - Business Manager (55 arquivos)
- [business-user/](./business-user/) - Usuários de negócio
- [business-role-request/](./business-role-request/) - Solicitações de acesso
- [system-user/](./system-user/) - Usuários de sistema

### Estrutura de Anúncios
- [ad-campaign-group/](./ad-campaign-group/) - Campanhas
- [ad-campaign/](./ad-campaign/) - Ad Sets (Conjuntos de anúncios)
- [adgroup/](./adgroup/) - Anúncios (Ads)

### Criativos
- [ad-creative/](./ad-creative/) - Criativos
- [ad-creative-link-data/](./ad-creative-link-data/) - Dados de link
- [ad-creative-object-story-spec/](./ad-creative-object-story-spec/) - Story spec
- [ad-creative-feature-details/](./ad-creative-feature-details/) - Detalhes de features
- [ad-creative-features-spec/](./ad-creative-features-spec/) - Especificações de features
- [ad-image/](./ad-image/) - Imagens

### Mídia
- [ad-preview/](./ad-preview/) - Preview de anúncios
- [ad-asset-feed-spec/](./ad-asset-feed-spec/) - Feed de assets

### Insights e Relatórios
- [ads-insights/](./ads-insights/) - Métricas e insights
- [ads-action-stats/](./ads-action-stats/) - Estatísticas de ações
- [ads-dataset-data-freshness/](./ads-dataset-data-freshness/) - Freshness de dados
- [ad-report-run/](./ad-report-run/) - Relatórios assíncronos

### Audiências
- [custom-audience/](./custom-audience/) - Públicos personalizados (12 arquivos)
- [custom-audience-session/](./custom-audience-session/) - Sessões de audiência
- [reach-estimate/](./reach-estimate/) - Estimativa de alcance

### Tracking
- [ads-pixel/](./ads-pixel/) - Facebook Pixel
- [custom-conversion/](./custom-conversion/) - Conversões personalizadas
- [conversion-action-query/](./conversion-action-query/) - Queries de conversão

### Catálogo
- [product-catalog/](./product-catalog/) - Catálogo de produtos (32 arquivos)
- [product-feed/](./product-feed/) - Feeds de produtos
- [product-feed-rule/](./product-feed-rule/) - Regras de feed
- [product-feed-rule-suggestion/](./product-feed-rule-suggestion/) - Sugestões de regras
- [product-feed-upload/](./product-feed-upload/) - Upload de feeds
- [product-item/](./product-item/) - Itens de produto

### Instagram
- [instagram-user/](./instagram-user/) - Usuários do Instagram
- [instagram-media/](./instagram-media/) - Mídia do Instagram
- [instagram-carousel/](./instagram-carousel/) - Carrosséis do Instagram
- [instagram-comment/](./instagram-comment/) - Comentários

### Outros
- [ad-label/](./ad-label/) - Labels de anúncios
- [ad-study/](./ad-study/) - Estudos de lift

## Padrões da API

### Endpoints CRUD

```
GET /{object_id}                 # Ler objeto
GET /{object_id}/{edge}          # Ler conexões
POST /{parent_id}/{edge}         # Criar objeto
POST /{object_id}                # Atualizar objeto
DELETE /{object_id}              # Deletar objeto
```

### Campos Comuns

| Campo | Descrição |
|-------|-----------|
| `id` | ID único do objeto |
| `name` | Nome do objeto |
| `status` | Status (ACTIVE, PAUSED, etc.) |
| `created_time` | Data de criação |
| `updated_time` | Data de atualização |

## Links Úteis

- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Marketing API Changelog](../marketing-api-changelog/)
