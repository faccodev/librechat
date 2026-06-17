---
title: "Pixel para a API de Marketing - Pixel da Meta"
source: "https://developers.facebook.com/docs/marketing-api/audiences-api/pixel"
scraped_at: "2026-02-01T14:00:51.029Z"
---

# Pixel para a API de Marketing

O Pixel da Meta é a principal ferramenta para rastrear eventos em um site. Você pode usar os dados do Pixel da Meta com a API de Marketing para:

-   criar públicos personalizados com base na atividade do seu site;
    
-   medir a atividade de conversão e determinar quais anúncios geram resultados relevantes, como compras.
    

## Requisitos

-   O [código de base](/docs/facebook-pixel/implementation) do Pixel da Meta já deve estar instalado nas páginas em que você deseja rastrear eventos.
    

### Atualizações do iOS 14.5

Devido às alterações no iOS 14.5, apresentamos uma nova ferramenta de rastreamento de eventos da web para campanhas de anúncios desse sistema operacional.

#### Mensuração de Eventos Agregados

A Mensuração de Eventos Agregados da Meta é um protocolo que permite a mensuração de eventos da web e do app de pessoas que usam dispositivos iOS 14.5 ou posteriores. A modelagem estatística foi criada para fornecer uma visão mais completa dos resultados quando há dados parciais ou faltantes.

Atualmente, cada domínio e app para celular pode ter até 8 eventos de conversão que podem ser configurados e priorizados para a Mensuração de Eventos Agregados.

Acesse o guia [Verificação de domínio](https://developers.facebook.com/docs/sharing/domain-verification/) e confira sua propriedade de domínio para a Mensuração de Eventos Agregados.

Acesse a Central de Ajuda para Empresas para saber mais.

-   [Sobre a Mensuração de Eventos Agregados da Meta](https://www.facebook.com/business/help/721422165168355)
    
-   [Sobre a prioridade dos eventos](https://www.facebook.com/business/help/193250612476055)
    
-   [Conjuntos de valores](https://www.facebook.com/business/help/378857770047703)
    
-   [Otimização de valor](https://www.facebook.com/business/help/296463804090290?id=561906377587030)
    
-   [Requisitos de qualificação para a otimização de valor](https://www.facebook.com/business/help/571188993373447?id=561906377587030)
    
-   [Configurar a otimização de valor](https://www.facebook.com/business/help/437932930561569?id=561906377587030)
    

Acesse o [registro de alterações](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/jan-19-2021) para obter mais informações sobre as outras mudanças disponíveis.

## Eventos-padrão

Os exemplos a seguir são [eventos-padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) rastreáveis.

### Lead

Rastreie o seguinte evento-padrão `Lead` no seu site.

```
fbq(
  'track', 'Lead', {
    value: 40.00,
    currency: 'USD'
  }
);
```

### ViewContent

Rastreie o seguinte evento-padrão `ViewContent` no seu site.

```
fbq(
  'track', 'ViewContent', { 
    content_type: 'product',
    content_ids: ['1234'],
    value: 0.50,
    currency: 'USD'
  }
);
```

### Search

Rastreie o seguinte evento-padrão `Search` no seu site.

```
fbq(
  'track', 'Search', { 
    search_string: 'leather sandals',
    content_ids: ['1234', '2424', '1318', '6832'],
    value: 0.50,
    currency: 'USD'
  }
);
```

### Purchase

Rastreie o seguinte evento-padrão `Purchase` na página de **confirmação de pagamento** do seu site.

```
fbq(
  'track', 'Purchase', { 
    content_type: 'product',
    contents: [
      { 'id': '1234', 'quantity': 2, },
      { 'id': '4642', 'quantity': 1, }
    ],
    value: 25.00,
    currency: 'USD'
  }
);
```

[](#)

## Eventos personalizados

Rastreie um evento personalizado específico do seu site. Substitua `CUSTOM-EVENT-NAME` pelo nome do evento personalizado e `custom_parameter` pelo nome do parâmetro personalizado.

```
fbq(
  'trackCustom', 'CUSTOM-EVENT-NAME', {
    custom_parameter: 'ABC',
    value: 10.00,
    currency: 'USD'
  }
);
```

[](#)

## Eventos na página

Para rastrear ações na página, vincule eventos-padrão ou personalizados a elementos HTML, como botões.

```
<button onClick="fbq('track', 'Purchase');">Button Text</button>
```

Se houver diversos elementos HTML, crie uma função.

```
<script>
function onClick() {
fbq('track', 'Purchase');
};
</script>
```

Faça chamadas a essa função para rastrear eventos `Purchase` de vários elementos HTML.

```
<button onClick="onClick()">Buy Now</button>

<button onClick="onClick()">Buy as a Gift</button>
```

**Observação**: a Ferramenta para Pixel pode exibir diversos eventos de pixel na mesma página. A Ferramenta para Pixel foi desenvolvida para rastrear somente em eventos de carregamento. Porém, ao vincular eventos a elementos (como um botão), é possível usar a Ferramenta para rastrear outros tipos de evento.

### Rastrear um pixel específico

Rastreie um único evento personalizado de um Pixel da Meta específico. Substitua `PIXEL-ID` pela identificação do pixel a ser rastreado.

```
<script>
  function onClick() {
    fbq(
      'trackSingleCustom', 'PIXEL-ID', 'PageView'
    );
  };
</script>
```

**Observação**: o método `trackSingleCustom` não valida dados personalizados.

[](#)

## Suprimir um pixel

Use `pushState` ou `replaceState` para suprimir pixels.

```
fbq.disablePushState = true;
```

[](#)

## Otimizar a veiculação de anúncio com pixels

Use o campo `promoted_object` do ponto de extremidade `/act_AD-ACCOUNT/adsets` para otimizar a veiculação de anúncio baseada em eventos-padrão rastreados com Pixels da Meta.

No exemplo a seguir, usamos um pixel que rastreia eventos de compra para otimizar a veiculação de anúncio com base no valor de compra.

_Formatado para leitura_
```
curl -i -X POST "https://graph.facebook.com/v2.10/act_AD-ACCOUNT-ID/adsets
    ?name=Ad Set for Value Optimization
    &campaign_id=CAMPAIGN-ID
    &optimization_goal=VALUE
    &promoted_object={"pixel_id":"PIXEL-ID","custom_event_type":"PURCHASE"}
    &billing_event=IMPRESSIONS
    &daily_budget=1000
    &attribution_spec=[{'event_type': 'CLICK_THROUGH', 'window_days':'1'}]
    &access_token=ACCESS-TOKEN"
```

**Observação**: os valores de `conversion_specs` são inferidos automaticamente com base no objetivo e no `promoted_object`. Não é possível definir `conversion_specs` manualmente.

[](#)

### Código do pixel somente de imagem

Recomendamos que você use o código de JavaScript para o Pixel da Meta. No entanto, em alguns casos, é possível usar um HTML ou um pixel de imagem e adicionar outra tag de terceiros do seu site.

#### Eventos-padrão

```
<img src="https://www.facebook.com/tr?id=PIXEL-ID&amp;ev=ViewContent&amp;cd[content_type]=product&amp;cd[content_ids]=1234&amp;cd[value]=0.50&amp;cd[currency]=USD&amp;noscript=1" height="1" width="1" style="display:none"/>
```

#### Eventos personalizados

```
<img src="https://www.facebook.com/tr?id=PIXEL-ID&amp;ev=CustomEventName&amp;cd[custom_param1]=ABC&amp;cd[custom_param2]=123&amp;cd[value]=10.00&amp;cd[currency]=USD&amp;noscript=1" height="1" width="1" style="display:none"/>
```

[](#)

## Veja também

-   [Correspondência avançada](/docs/facebook-pixel/advanced/advanced-matching/): é possível enviar dados adicionais de clientes por meio do Pixel da Meta para fazer a correspondência de mais ações no site com pessoas no Facebook.
    
-   [Rastreamento de conversão](/docs/marketing-api/facebook-pixel/conversion-tracking): rastreie e otimize para conversões.
    
-   Conversões fora do site
    
-   [Públicos Personalizados do site](/docs/marketing-api/facebook-pixel/website-custom-audiences): crie públicos personalizados de site com pessoas que acessaram ou realizaram ações específicas no seu site.
    
-   [Pixel da Meta](/docs/facebook-pixel): confira eventos-padrão rastreados pelo Pixel, além de eventos personalizados que podem ser adicionados.
    

[](#)