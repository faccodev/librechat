---
title: "API de Diagnóstico - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/diagnostics-api"
scraped_at: "2026-02-01T15:52:37.546Z"
---

# API de Diagnóstico

A API de Diagnóstico, por meio do tipo de erro EVENT\_SOURCE\_ISSUES, oferece uma visão abrangente atualizada diariamente dos problemas do app e/ou do Pixel da Meta que podem estar afetando o desempenho do anúncio. Esse recurso permite que os anunciantes identifiquem e resolvam com eficiência problemas significativos de integridade dentro do seu catálogo. Os problemas estão relacionados com requisitos ausentes ou configuração errada para executar [anúncios de catálogo Advantage+](/docs/meta-pixel/get-started/advantage-catalog-ads)

A API fornece insights detalhados e orientações sobre como resolver esses problemas, garantindo que os anunciantes possam manter o desempenho e a integridade ideais para suas campanhas de anúncios.

**Observação**: consulte a [documentação de referência de diagnósticos de catálogo](/docs/marketing-api/reference/product-catalog/diagnostics/) para saber mais sobre os parâmetros e campos que podem ser usados para chamar a API.

## Pré-requisitos

Antes de usar a API de Diagnóstico, você precisará de:

-   Permissões [catalog\_management](/docs/permissions#c)
    
-   O [acesso à visualização do Pixel](https://www.facebook.com/business/help/279059996069252?id=2042840805783715) e o [acesso à visualização do catálogo](https://www.facebook.com/business/help/1953352334878186?id=2042840805783715) devem ser concedidos
    

[](#)

## Como buscar problemas com a origem de eventos

É possível buscar problemas com a origem de eventos fazendo uma solicitação para o seguinte ponto de extremidade:

```
curl -X GET \
https://graph.facebook.com/{product-catalog-id}/diagnostics?types=["EVENT_SOURCE_ISSUES"] \
-F "access_token=&lt;ACCESS_TOKEN&gt;"
```

[](#)

## Tipos de problemas e orientações para resolvê-los

Ao executar a chamada de API, você pode encontrar um ou mais dos seguintes tipos de problemas relacionados com problemas de origem de eventos:

Tipo de problema

Descrição

Ação recomendada

Outras instruções

APP\_HAS\_NO\_AEM\_SETUP

App não configurado para a Mensuração de Eventos Agregados

Verifique se o app é qualificado para Mensuração de Eventos Agregados.

CATALOG\_NOT\_CONNECTED\_TO\_EVENT\_SOURCE

Catálogo não conectado ao Pixel da Meta ou ao SDK do app

Conecte seu catálogo a um Pixel da Meta ou ao SDK do app para usá-lo em anúncios.

[Saiba como conectar](https://www.facebook.com/business/help/1044262445604547) um Pixel da Meta ou o SDK do Facebook a um catálogo no Gerenciador de Comércio.

DELETED\_ITEM

Itens excluídos que ainda interagem com o site

Adicione produtos excluídos de volta para aumentar a taxa de correspondência.

Adicione produtos excluídos de volta ao seu catálogo.

INVALID\_CONTENT\_ID

IDs de conteúdo inválidos

Verifique se os IDs de conteúdo estão formatados corretamente, sem números ou símbolos adicionais.

Verifique seus IDs de conteúdo.

MISSING\_EVENT

Nenhum evento de compra recebido nos últimos 7 dias

Verifique se o pixel está configurado corretamente e enviando eventos a partir do site.

Use o Auxiliar de Pixel da Meta para verificar se você está enviando o evento correto do seu site.

NO\_CONTENT\_ID

IDs de conteúdo ausentes

Inclua um ou mais IDs únicos para o item ou grupo de produtos no código.

Verifique seu código.

  

## Resposta

Depois de executar a chamada da API de Diagnóstico anterior, você deverá receber uma resposta no seguinte formato:

```
{
 type: “EVENT_SOURCE_ISSUES”,
 severity: “MUST_FIX”,
 title: "Your catalog or its products have critical issues affecting your match rate.",
subtitle: "Fix these issues first to increase your match rate.",
 error_code: 3379017,
 number_of_affected_items: 15,
 diagnostics: [
   {
     type: “INVALID_CONTENT_ID”,
     description: “788 items need to be fixed”,
     call_to_action: "For more details please go to Commerce Manager",
     action_uri: "https://business.facebook. com/commerce/catalogs",
     details: "Valid content IDs for interacted products in your website are required to match products to this catalog.",
     instructions: ["Valid content IDs for interacted products in your website are required to match products to this catalog."],
     event_source_id: 532113215325335,
     event_source_type: “Pixel”,
     event_name: “Lead”,
     error_code: 1989420,
     number_of_affected_items: 788,
     sample_affected_items: [
       {
         num_events: 788
     content_id: “49839823”,
       }
     ]
   }
```

### Campos

Nome

Tipo

Descrição

`data`

matriz

Uma matriz contendo um objeto com informações sobre os problemas.

`type`

string

O tipo de problema, que é "EVENT\_SOURCE\_ISSUES".

`severity`

string

A gravidade do problema, que pode ser "MUST\_FIX" ou "WARNING".

`title`

string

Uma breve descrição do problema.

`subtitle`

string

Mais informações sobre o problema.

`error_code`

número inteiro

Um identificador único para o erro.

`number_of_affected_items`

número inteiro

O número de itens afetados pelo problema.

`diagnostics`

matriz

Uma matriz que contém objetos com informações mais detalhadas sobre o problema.

`type`

string

Um dos tipos mais específicos de EVENT\_SOURCE\_ISSUES.

`description`

string

Uma descrição mais detalhada do problema.

`call_to_action`

string

Informações sobre as medidas que devem ser tomadas para resolver o problema.

`details`

string

Detalhes adicionais sobre o problema.

`instructions`

matriz

Uma matriz de instruções sobre como resolver o problema.

`error_code`

número inteiro

Um identificador único para o erro.

`action_url`

string

Um URL que fornece mais informações sobre o problema e como resolvê-lo.

`event_source_id`

número inteiro

O ID da origem do evento que está enfrentando o problema.

`event_source_type`

string

O tipo de origem de eventos que está enfrentando o problema.

`event_name`

string

O nome do evento que está enfrentando o problema.

`sample_affected_items`

matriz

Uma matriz que contém um objeto com exemplos de itens afetados.

`content_id`

string

O ID do item afetado.

`content_url`

string

O URL do item afetado.

`num_events`

número inteiro

O número de eventos associados ao item afetado.

[](#)

## Ações pós-resposta

Depois de receber a resposta da API de Diagnóstico e filtrar por EVENT\_SOURCE\_ISSUES, você deve:

-   Analisar a lista de problemas com o pixel e priorizar aqueles que requerem atenção imediata.
    
-   Seguir as orientações fornecidas na resposta da API para resolver cada problema.
    
-   Verificar se os problemas foram resolvidos e se o pixel está funcionando corretamente.
    

[](#)

## Recursos adicionais

-   [Documentação de referência de diagnóstico de catálogo](/docs/marketing-api/reference/product-catalog/diagnostics/)
    

[](#)