# Conversions API (CAPI)

Documentação completa da API de Conversões para rastreamento server-side de eventos.

## Visão Geral

A Conversions API permite enviar eventos de conversão diretamente do seu servidor para a Meta, complementando o Pixel do Facebook para melhor atribuição e mensuração.

## Arquivos nesta seção

### Principais
- [index.md](./index.md) - Visão geral da API de Conversões
- [get-started.md](./get-started.md) - Primeiros passos
- [using-the-api.md](./using-the-api.md) - Como usar a API
- [verifying-setup.md](./verifying-setup.md) - Verificar configuração
- [best-practices.md](./best-practices.md) - Boas práticas
- [support.md](./support.md) - Solução de problemas

### Parâmetros
- [parameters.md](./parameters.md) - Visão geral dos parâmetros
- [parameters/server-event.md](./parameters/server-event.md) - Parâmetros de evento
- [parameters/main-body.md](./parameters/main-body.md) - Parâmetros do corpo principal
- [parameters/custom-data.md](./parameters/custom-data.md) - Dados customizados
- [parameters/customer-information-parameters.md](./parameters/customer-information-parameters.md) - Informações do cliente
- [parameters/fbp-and-fbc.md](./parameters/fbp-and-fbc.md) - Parâmetros fbp e fbc

### Integrações por Tipo
- [app-events.md](./app-events.md) - Eventos de aplicativo
- [offline-events.md](./offline-events.md) - Eventos offline
- [business-messaging.md](./business-messaging.md) - Business Messaging

### Leads de Conversão
- [conversion-leads-integration.md](./conversion-leads-integration.md) - Integração de leads
- [conversion-leads-integration/payload-specification.md](./conversion-leads-integration/payload-specification.md) - Especificação de payload
- [conversion-leads-integration/how-to-find-the-lead-id.md](./conversion-leads-integration/how-to-find-the-lead-id.md) - Encontrar ID do lead
- [conversion-leads-integration/faq.md](./conversion-leads-integration/faq.md) - FAQ
- [conversion-leads-integration/zapier.md](./conversion-leads-integration/zapier.md) - Integração Zapier

### Guias de Integração
- [guides/end-to-end-implementation.md](./guides/end-to-end-implementation.md) - Implementação completa
- [guides/business-sdk-features.md](./guides/business-sdk-features.md) - Recursos do SDK
- [guides/gtm-server-side.md](./guides/gtm-server-side.md) - Google Tag Manager Server-Side
- [guides/zapier-integration.md](./guides/zapier-integration.md) - Integração Zapier
- [guides/value-optimization.md](./guides/value-optimization.md) - Otimização para valor

### Gateway
- [guides/gateway.md](./guides/gateway.md) - Conversions API Gateway
- [guides/gateway-multiple-accounts.md](./guides/gateway-multiple-accounts.md) - Gateway para múltiplas contas
- [guides/gateway-aws-app-runner.md](./guides/gateway-aws-app-runner.md) - Gateway AWS App Runner
- [guides/gateway-control-plane-api.md](./guides/gateway-control-plane-api.md) - API do Control Plane

### Qualidade
- [dataset-quality-api.md](./dataset-quality-api.md) - API de Qualidade do Dataset
- [deduplicate-pixel-and-server-events.md](./deduplicate-pixel-and-server-events.md) - Deduplicação de eventos
- [payload-helper.md](./payload-helper.md) - Auxiliar de payload

### Plataformas
- [set-up-conversions-api-as-a-platform.md](./set-up-conversions-api-as-a-platform.md) - CAPI como plataforma
- [guides/conversions-api-crm-for-platforms.md](./guides/conversions-api-crm-for-platforms.md) - CAPI para CRM

## Eventos Principais

- `Purchase` - Compra
- `Lead` - Lead gerado
- `AddToCart` - Adição ao carrinho
- `InitiateCheckout` - Início de checkout
- `ViewContent` - Visualização de conteúdo
- `CompleteRegistration` - Cadastro completo
- `Search` - Busca
- `AddPaymentInfo` - Informação de pagamento
- `AddToWishlist` - Lista de desejos

## Links Relacionados

- [Facebook Pixel](../facebook-pixel/)
- [Server Side API](../server-side-api/)
