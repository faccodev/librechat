---
title: "1: Como conectar seu CRM para baixar leads - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads"
scraped_at: "2026-02-01T15:48:22.254Z"
---

# 1: Como conectar seu CRM para baixar leads

Este guia ajudará você a conectar seu sistema de gestão do relacionamento com o cliente (CRM, pelas iniciais em inglês) e garantir que ele esteja baixando seus leads da Meta.

## Conecte seu CRM à Meta

Como mencionado na [introdução](/docs/marketing-api/conversions-api/conversion-leads-integration), este guia pressupõe que você já tenha uma integração para baixar automaticamente seus leads da Meta para seu sistema de CRM (destacado em verde na figura abaixo). Esta seção apresentará uma visão geral dos métodos de integração da Meta com CRM para anúncios de lead. Para cada um desses métodos, confirme que o ID de lead da Meta de 15 a 17 dígitos foi incluída nos dados baixados. Consulte [Sobre integrações de sistemas de CRM para anúncios de lead](https://www.facebook.com/business/help/301355140655035) para obter mais informações.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306883495_3264805617090160_6774984814926353093_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=PQbwe5yW3H0Q7kNvwEIYe8W&_nc_oc=AdlvRST1GdD6wztdeL0opbJ0fhOOibYhvJg4peLBtmtPBAuIG5X0KlKw8iVKjnTzwLhspxwAjkKkmvcP60Olmopf&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=EAoAaJEZ0-kxd6kwxaQ_jg&oh=00_AfsbTLRaX3AL8OWxbuaOMTpHZu7W7kT4kSoisw1gX9kV4A&oe=6999A9CE)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306883495_3264805617090160_6774984814926353093_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=PQbwe5yW3H0Q7kNvwEIYe8W&_nc_oc=AdlvRST1GdD6wztdeL0opbJ0fhOOibYhvJg4peLBtmtPBAuIG5X0KlKw8iVKjnTzwLhspxwAjkKkmvcP60Olmopf&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=EAoAaJEZ0-kxd6kwxaQ_jg&oh=00_AfsbTLRaX3AL8OWxbuaOMTpHZu7W7kT4kSoisw1gX9kV4A&oe=6999A9CE)

### Integrações de parceiros

Saiba como [integrar seu CRM com a Meta](https://www.facebook.com/business/help/908902042493104) para otimizar a qualidade dos seus anúncios de lead. Este será um bom método para baixar os dados dos leads caso seu sistema de CRM ou fornecedor externo seja aceito. Pesquise o artigo [Integrações de sistema de CRM disponíveis para anúncios de lead](https://www.facebook.com/business/help/908902042493104) da Central de Ajuda para verificar se o seu parceiro preferido é aceito.

1.  Siga as instruções no artigo [Integrações de sistema de CRM disponíveis para anúncios de lead](https://www.facebook.com/business/help/908902042493104) da Central de Ajuda ou as instruções gerais no artigo [Como conectar o sistema de CRM ao Meta Business Suite](https://www.facebook.com/business/help/1588743581429919) da Central de Ajuda.
2.  Caso decida remover ou alterar as integrações de parceiros por qualquer motivo, siga as instruções no artigo [Como remover a integração de sistema de CRM da Meta](https://www.facebook.com/business/help/776203092784009) da Central de Ajuda.

### Integração personalizada de Webhooks

Também é possível criar uma integração de Webhooks personalizada para receber automaticamente novos leads se o seu sistema de CRM não for compatível ou se você preferir um maior controle sobre a integração. Os recursos para desenvolvedores serão necessários para esse método.

Por meio desse método, seu desenvolvedor deverá criar um ponto de extremidade de Webhook, um ID de app para desenvolvedor da Meta e uma assinatura para seu app e, depois, vinculá-lo à sua Página.

Consulte o [guia de integração de CRM de Webhooks](/docs/marketing-api/guides/lead-ads/quickstart/webhooks-integration) para obter mais informações sobre a implementação desse método. Você também pode consultar o [exemplo de código de Webhook para anúncios de lead](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Flead-ads-webhook-sample&h=AT2RVmqfvqXKLubigSsv-Iu5tvwiaeBFCqW_lobLGBHP_cPoQqCvroeR5FrzYi5CHwd3LdOYDwM0Ki3iao_bxx9VkmL7riRFoUCucsI9UK3wY6PUFwRwFWrl55Mai67eaqohKU9x9uTBW8kYbt0-C7R4prAh_DxZ52dQS24C4KI) no GitHub para saber como começar.

### Leitura em massa da Graph API

Da mesma forma que para Webhooks, é possível utilizar a Graph API para baixar leads da Meta. Os recursos para desenvolvedores serão necessários para esse método.

A principal diferença entre as duas integrações é que o Webhooks é um método push/pull que pode fornecer leads próximos ao tempo real, enquanto a leitura em massa da Graph API é um método pull que fornecerá dados de leads após uma chamada a partir do seu código. Também há [limites de volume](/docs/graph-api/overview/rate-limiting) para essas chamadas de API.

Consulte a documentação [Como recuperar leads: Leitura em massa](/docs/marketing-api/guides/lead-ads/retrieving#bulk-read) para obter mais informações sobre a implementação desse método.

### Download manual (não recomendado)

Este método não é recomendado, especialmente se você tiver um sistema de CRM e pretende implementar uma integração de CRM para carregar eventos. No entanto, ele pode ser usado como uma solução temporária se algum dos métodos anteriores não funcionar.

[](#)

[

←

Voltar

Introduction

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration)

[

→

Avançar

Getting Started With the CRM

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration)

[](#)