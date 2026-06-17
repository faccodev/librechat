---
title: "Rastreamento de conversão - Pixel da Meta"
source: "https://developers.facebook.com/docs/marketing-api/facebook-pixel/conversion-tracking"
scraped_at: "2026-02-01T14:30:45.213Z"
---

# Rastreamento de conversão

É possível usar o Pixel da Meta para rastrear as ações dos visitantes do seu site. As conversões rastreadas aparecem no [Gerenciador de Anúncios do Facebook](https://www.facebook.com/adsmanager) e no [Gerenciador de Eventos do Facebook](https://www.facebook.com/events_manager2) e podem ser usadas para analisar a eficiência do funil de conversão, bem como calcular o retorno sobre o investimento em anúncios. Use-as também para definir [Públicos Personalizados](/docs/facebook-pixel/implementation/custom-audiences) para otimização de anúncios e campanhas de [anúncios de catálogo Advantage+](/docs/facebook-pixel/implementation/dynamic-ads). Depois de definir os Públicos Personalizados, podemos usá-los para identificar outros usuários do Facebook propensos à conversão e direcioná-los com seus anúncios.

Há três maneiras de rastrear conversões com o Pixel:

-   [Eventos-padrão](#standard-events): ações de visitantes predefinidas que você relata ao chamar uma função de Pixel
    
-   [Eventos personalizados](#custom-events): ações de visitantes que você definiu e relata ao chamar uma função de Pixel
    
-   [Conversões personalizadas](#custom-conversions): ações de visitantes que são rastreadas automaticamente por meio da análise dos URLs de referência do seu site
    

A partir de 2 de setembro de 2025, serão aplicadas restrições adicionais e proativas a conversões personalizadas que possam sugerir informações não permitidas nos [nossos termos](https://www.facebook.com/legal/terms/businesstools?_rdr). Por exemplo, qualquer conversão personalizada que sugira condições de saúde específicas (como "artrite", "diabetes") ou situação financeira (como "pontuação de crédito", "alta renda") será sinalizada e impedida de ser usada para veicular campanhas publicitárias.

**Como essas restrições afetam suas campanhas:**

-   Não será possível usar conversões personalizadas que foram sinalizadas ao criar novas campanhas.
    
-   Se houver uma campanha ativa com conversões personalizadas que foram sinalizadas, crie uma nova campanha ou duplique a existente usando uma conversão personalizada não afetada pelas restrições para evitar problemas de desempenho e otimização.
    

**Para desenvolvedores da API:**

-   A partir de 2 de setembro de 2025, o campo `is_unavailable` retornará `true` para indicar que uma conversão personalizada foi sinalizada.
    

[Saiba mais](https://www.facebook.com/business/help/2455915321411996) sobre essa atualização e veja como resolver conversões personalizadas que foram sinalizadas.

### Requisitos

O [código de base](/docs/facebook-pixel/implementation#base-code) do Pixel já deve estar instalado nas páginas em que você quer rastrear as conversões.

## Eventos padrão

Os [eventos-padrão](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events) são ações predefinidas de visitantes que correspondem a atividades comuns relacionadas a conversões, como pesquisar, visualizar ou comprar um produto. Os eventos-padrão aceitam [parâmetros](#parameters), permitindo que você inclua um objeto que contém informações adicionais sobre um evento, como identificações de produtos, categorias e o número de itens comprados.

Para ver uma lista completa de [eventos padrão](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events), acesse a [referência do pixel](https://developers.facebook.com/docs/facebook-pixel/reference#standard-events). Saiba mais sobre o rastreamento de conversão e os eventos padrão no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219710-technical-implementation-meta-pixel%3Fcontent_id%3Den4RqCL2PfBZrUU&h=AT08SARaM7m1kLJcAOZwODJKjs-CxnqE0R7jvreArQXIZmRBy15L8ZgAYzV15FuJ4vBYxuMvqF4v93eLkllmoXNzDFX9PEiHZwSbYePHUCHDGxOycwmHyl2ade5x5lrm1JMPg22IqbK2ok4DzCtWvEZ4NqokGNkaujshEJqNLvgkkohEBJWij8dRB08qlFI).

### Como rastrear eventos padrão

Todos os eventos-padrão são rastreados por meio da chamada à função `fbq('track')` do Pixel, com o nome do evento e, opcionalmente, um objeto JSON como parâmetros. Por exemplo, esta é a chamada a uma função para rastrear quando um visitante concluir um evento de compra com a moeda e o valor incluídos como um parâmetro:

```
fbq('track', 'Purchase', {currency: "USD", value: 30.00});
```

Se você chamar essa função, ela será rastreada como um evento de compra no Gerenciador de Eventos:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/39949625_1790839247617931_4027789432194072576_n.png?_nc_cat=110&ccb=1-7&_nc_sid=e280be&_nc_ohc=iu8hjsV3tZoQ7kNvwGSROkO&_nc_oc=AdlZeJvOd3fxJu4pEC39-edVUBsUSAvYQ6V3h5IHWGAgAxbzn4EQKzF2MoCyzZPdMzRQGIzKHchbQhoMEe_ikWdz&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=6vY4ZtmMdwReTBMulKcTvg&oh=00_Afv4UzdYKnrczqmQ3gH8R9nk8drOaxrOsrUOZmmof0ht2Q&oe=6999BCDC)

Você pode chamar a função `fbq('track')` em qualquer lugar entre as tags `<body>` de abertura e fechamento da sua página da web, quando a página é carregada ou quando um visitante conclui uma ação, como clicar em um botão.

Por exemplo, se você quiser rastrear um evento de compra padrão _depois que um visitante conclui a compra_, poderá chamar a função `fbq('track')` na _página de confirmação de compra_ desta maneira:

```
<body>
  ...
  <script>
    fbq('track', 'Purchase', {currency: "USD", value: 30.00});
  </script>
  ...
</body>
```

No entanto, se você quiser rastrear um evento de compra padrão _quando o visitante clica em um botão de compra_, poderá associar a chamada à função `fbq('track')` com o botão de compra _na sua página de finalização da compra_ desta maneira:

```
<button id="addToCartButton">Purchase</button>
<script type="text/javascript">
  $('#addToCartButton').click(function() {
    fbq('track', 'Purchase', {currency: "USD", value: 30.00});
  });
</script>
```

O exemplo anterior usa a jQuery para acionar a chamada à função, mas você pode acionar a chamada usando qualquer método que quiser.

[](#)

## Eventos personalizados

Se os eventos-padrão predefinidos não atenderem às suas necessidades, será possível rastrear os próprios eventos personalizados, que também podem ser usados para definir [públicos personalizados](/docs/facebook-pixel/implementation/custom-audiences) para otimização de anúncios. Além disso, os eventos personalizados aceitam [parâmetros](#parameters), que podem ser incluídos para fornecer informações adicionais sobre cada evento.

Saiba mais sobre o rastreamento de conversão e os eventos personalizados no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219710-technical-implementation-meta-pixel%3Fcontent_id%3Den4RqCL2PfBZrUU&h=AT0r3v030N2l1b5IMID4LfZr8iPr7scTGja1-ei-sJQLV_l9ZvK0DfvKfKMpfL7QRG_7cjGBZ-o1xHmHfgn-w1zCbc5y_qVCO1PRu8WzKRMQpeiwH-TeZOdthcSbOTtDBjZKVv0EJLN0dVtxfbTRaN44N_r97JkI79Z5G3pVZdA).

### Como rastrear eventos personalizados

Você pode rastrear eventos personalizados por meio da chamada à função `fbq('trackCustom')` do Pixel, com o nome do evento personalizado e, opcionalmente, um objeto JSON como parâmetros. Assim como os eventos-padrão, é possível chamar a função `fbq('trackCustom')` em qualquer lugar entre as tags `<body>` de abertura e fechamento da sua página da web, quando a página é carregada ou quando um visitante conclui uma ação, como clicar em um botão.

Por exemplo, vamos supor que você queira rastrear os visitantes que compartilham uma promoção para ganhar desconto. Você pode rastreá-los usando um evento personalizado desta maneira:

```
fbq('trackCustom', 'ShareDiscount', {promotion: 'share_discount_10%'});
```

Os nomes de eventos personalizados devem ser strings e não podem exceder 50 caracteres.

[](#)

## Conversões personalizadas

Sempre que o Pixel é carregado, ele chama automaticamente `fbq('track', 'PageView')` para rastrear um evento-padrão PageView. Os eventos-padrão PageView registram o URL do referenciador da página que acionou a chamada à função. Você pode usar esses URLs registrados no Gerenciador de Eventos para definir as ações dos visitantes que devem ser rastreadas.

Por exemplo, vamos supor que você direcione visitantes que se cadastram na sua lista de correspondência para uma página de agradecimento. Você pode configurar uma conversão personalizada para rastrear os visitantes do site que visualizaram qualquer página com `/thank-you` no URL. Caso sua página de agradecimento seja a única com `/thank-you` no URL, e o Pixel já esteja instalado nessa página, qualquer pessoa que visualizá-la será rastreada usando a conversão personalizada.

Quando forem rastreadas, as conversões personalizadas poderão ser usadas para otimizar suas campanhas de anúncios, definir [públicos personalizados](/docs/facebook-pixel/implementation/custom-audiences) e refinar ainda mais os públicos que dependem de eventos padrão ou personalizados. Saiba mais sobre as conversões personalizadas no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219710-technical-implementation-meta-pixel%3Fcontent_id%3Den4RqCL2PfBZrUU&h=AT2MwzvGZyZ_eCiVcoirZnp4yWBfIlA0M1QNBTNYVp-K1zFhMjo30Ux1e7mxmLKU2Lk6oAcX-ujLlnAMzqOwSkJIYl6l2RdIQfQLNBaTnzSl3ZT-bmfi5hIRKfY_6E2zQruWogIPJabyGrk-X-ZW6XRtngFTevBpX6kjfcTLIM8).

Como as conversões personalizadas dependem de URLs completos ou parciais, você deve garantir que as ações dos visitantes possam ser definidas exclusivamente com base em strings únicas nos URLs do seu site.

### Como criar conversões personalizadas

As conversões personalizadas são criadas totalmente dentro do Gerenciador de Eventos. Consulte nosso [documento da Central de Ajuda para o Anunciante](https://www.facebook.com/business/help/434245993430255) para saber mais.

### Conversões personalizadas com base em regras

Otimize para ações e rastreie as conversões sem adicionar nada ao código de base do Pixel da Meta. Você pode fazer isso além dos 17 eventos-padrão.

1.  Crie uma conversão personalizada em `/{AD_ACCOUNT_ID}/customconversions`.
2.  Especifique um URL, ou um URL parcial, que represente um evento em `pixel_rule`. Por exemplo, `thankyou.html` é uma página exibida após a compra.

É registrada uma conversão de `PURCHASE` quando `'thankyou.html'` é exibido:

Depois disso, você pode criar a campanha usando o objetivo `CONVERSIONS`.

No nível do conjunto de anúncios, especifique a mesma conversão personalizada (`pixel_id`, `pixel_rule`, `custom_event_type`) no `promoted_object`.

### Insights sobre conversões personalizadas

Os [Insights sobre Anúncios](/docs/marketing-api/insights-api) retornam informações sobre conversões personalizadas:

```
curl -i -G \
-d 'fields=actions,action_values' \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/v2.7/<AD_ID>/insights
```

Retorna conversões personalizadas e padrão:

```
{
  "data": [
    {
      "actions": [
        {
          "action_type": "offsite_conversion.custom.17067367629523",
          "value": 1225
        },
        {
          "action_type": "offsite_conversion.fb_pixel_purchase",
          "value": 205
        }
      ],
      "action_values": [
        {
          "action_type": "offsite_conversion.custom.1706736762929507",
          "value": 29390.89
        },
        {
          "action_type": "offsite_conversion.fb_pixel_purchase",
          "value": 29390.89
        }
      ],
      "date_start": "2016-07-28",
      "date_stop": "2016-08-26"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MjQZD"
    },
    "next": "https://graph.facebook.com/v2.7/<AD_ID>/insights?access_token=<ACCESS_TOKEN>&amp;pretty=0&amp;fields=actions%2Caction_values&amp;date_preset=last_30_days&amp;level=adset&amp;limit=25&amp;after=MjQZD"
  }
}
```

As conversões personalizadas têm IDs únicos. Faça uma consulta por uma conversão específica, por exemplo, baseada em regras:

```
curl -i -G \
-d 'fields=name,pixel,pixel_aggregation_rule' \
-d 'access_token=ACCESS-TOKEN' \
https://graph.facebook.com/v2.7/<CUSTOM_CONVERSION_ID>
```

### Limitações da conversão personalizada

O número máximo de conversões personalizadas por conta de anúncios é 100. Se você usar a API de Insights sobre Anúncios para consultar as métricas das conversões personalizadas:

-   Não há compatibilidade com o detalhamento de IDs de produto.
    
-   Não há compatibilidade com contagens de ações únicas.
    

### Conversões personalizadas que foram sinalizadas

Se uma conversão personalizada for sinalizada, o campo `is_unavailable` será definido como `true`.

```
{ "is_unavailable": true, "id": "30141209892193360" }
```

#### Para resolver conversões personalizadas que foram sinalizadas

Se alguma das suas conversões personalizadas for sinalizada por sugerir informações que não são permitidas pelos nossos termos, considere as seguintes opções:

Para resolver uma conversão personalizada sinalizada durante a criação de uma nova campanha:

-   **Crie uma nova conversão personalizada**: use uma nova conversão personalizada e verifique se ela não inclui informações vedadas pelos nossos termos.
    
-   **Escolha uma conversão personalizada diferente**: selecione outra conversão personalizada existente e verifique se ela não contém informações vedadas pelos nossos termos.
    

Para resolver uma conversão personalizada sinalizada em uma campanha existente:

-   **Duplique sua campanha e selecione uma conversão personalizada existente**: se você tiver uma campanha em veiculação que foi sinalizada devido a um problema na conversão personalizada, considere duplicar a campanha e selecionar uma conversão personalizada diferente que não esteja sinalizada antes de publicar a nova campanha duplicada. **Importante**: depois que a campanha for publicada, não será mais possível remover a conversão personalizada nem selecionar uma opção diferente.
    

#### Pedir uma análise

Caso você acredite que sua conversão personalizada tenha sido sinalizada por engano e não inclua informações não permitidas, peça uma análise via Gerenciador de Anúncios usando a tabela de campanhas ou pelo Gerenciador de Eventos acessando a página de conversões personalizadas.

[](#)

## Rastrear conversões fora do site

Rastreie conversões fora do site com seus Pixels. Para fazer isso, inclua o campo `fb_pixel` no parâmetro `tracking_spec` do anúncio. [Saiba mais](https://developers.facebook.com/docs/marketing-api/tracking-specs).

[](#)

## Parâmetros

Os parâmetros são opcionais, objetos formatados por JSON que podem ser incluídos durante o rastreamento de eventos personalizados e padrão. Eles permitem que você forneça informações adicionais sobre as ações dos visitantes do seu site. Quando rastreados, os parâmetros podem ser usados para refinar os públicos personalizados que você criar. Saiba mais sobre os parâmetros no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219710-technical-implementation-meta-pixel%3Fcontent_id%3Den4RqCL2PfBZrUU&h=AT0jjTTQrCQGwkTLMgMa_hzYhyTkT2LOgkveMjZ5WwLzaMyU_4B-UWGibV5tZLYCNBHcAGCNF8ZJLihxsSUu2xDdWSTCW6NRx8roOwvx8Ebr-Bwn6AX_09eycLt_3HjAhT9P2_5T3nlIYKUNMqPSmtEebMt4vIgWGAYcHgAC_9U).

Para incluir um objeto de parâmetro com um evento padrão ou personalizado, formate os dados do parâmetro como um objeto JSON. Depois, inclua-o como o terceiro parâmetro ao chamar as funções `fbq('track')` ou `fbq('trackCustom')`.

Por exemplo, vamos supor que você queira rastrear um visitante que comprou vários produtos devido à sua promoção. Você pode fazer isto:

```
fbq('track', 'Purchase',
  // begin parameter object data
  {
    value: 115.00,
    currency: 'USD',
    contents: [
      {
        id: '301',
        quantity: 1
      },
      {
        id: '401',
        quantity: 2
      }],
    content_type: 'product'
  }
  // end parameter object data
);
```

Se você quiser usar os dados incluídos nos parâmetros de eventos ao definir públicos personalizados, **os valores de chave não deverão conter espaços**.

### Propriedades de objetos

Você pode incluir as seguintes propriedades de objetos predefinidas com eventos personalizados e todos os [eventos-padrão compatíveis](#pixel-standard-events). Formate os dados de objeto de parâmetro usando JSON.

Chave da propriedade

Tipo de valor

Descrição do parâmetro

`content_category`

string

Categoria da página ou do produto.

`content_ids`

matriz de inteiros ou strings

Identificações de produtos associados ao evento, como SKUs. Exemplo: `['ABC123', 'XYZ789']`.

`content_name`

string

Nome da página ou do produto.

`content_type`

string

Pode ser `product` ou `product_group` com base em `content_ids` ou `contents` enviados. Se as identificações enviadas nos parâmetros `content_ids` ou `contents` forem de produtos, o valor deverá ser `product`. No caso do envio de identificações de grupos de produtos, o valor deverá ser `product_group`.

`contents`

matriz de objetos

Uma matriz de objetos JSON que contém o EAN (International Article Number), quando aplicável, ou outro produto ou identificadores de conteúdo associados ao evento, bem como quantidades e preços dos produtos. **Obrigatório**: `id` e `quantity`.

Exemplo: `[{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}]`

`currency`

string

Moeda para o `value` especificado.

`delivery_category`

string

Categoria da entrega. Valores compatíveis:

-   `in_store` – a compra exige que o cliente entre na loja.
    
-   `curbside` – a compra exige a retirada externa.
    
-   `home_delivery` – a compra é entregue ao cliente.
    

`num_items`

número inteiro

O número de itens quando a finalização da compra foi iniciada. Usado com o evento `InitiateCheckout`.

`predicted_ltv`

número inteiro, float

O valor vitalício previsto de um usuário cadastrado conforme definido pelo anunciante e expresso como um valor exato.

`search_string`

string

A string inserida pelo usuário para a pesquisa. Usado com o evento `Search`.

`status`

booliano

Usado com o evento `CompleteRegistration` para mostrar o status do registro.

`value`

número inteiro ou float

Obrigatório para eventos de compra ou quaisquer eventos que utilizem otimização de valor. Um valor numérico associado ao evento. Precisa representar um valor monetário.

### Propriedades personalizadas

Se nossas propriedades predefinidas de objetos não atenderem às suas necessidades, você poderá incluir as próprias propriedades personalizadas. As propriedades personalizadas podem ser usadas com eventos personalizados e padrão e podem ajudar você a definir ainda mais os públicos personalizados.

Por exemplo, vamos supor que você queira rastrear um visitante que comprou vários produtos depois de ter feito primeiro uma comparação com outros produtos. Você pode fazer isto:

```
fbq('track', 'Purchase',
  // begin parameter object data
  {
    value: 115.00,
    currency: 'USD',
    contents: [
      {
        id: '301',
        quantity: 1
      },
      {
        id: '401',
        quantity: 2
      }],
    content_type: 'product',
    compared_product: 'recommended-banner-shoes',  // custom property
    delivery_category: 'in_store'
  }
  // end parameter object data
);
```

[](#)

## Próximas etapas

Agora que você está rastreando conversões, recomendamos que elas sejam usadas para definir [públicos personalizados](/docs/facebook-pixel/implementation/custom-audiences). Assim, será possível otimizar seus anúncios para conversões do site.

[](#)

## Saiba mais

-   Saiba mais sobre o rastreamento de conversão no [Blueprint](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219710-technical-implementation-meta-pixel%3Fcontent_id%3Den4RqCL2PfBZrUU&h=AT0z6f4Wb1f2pG8VXBwxq1mYb85zbzJU4lFEw5dItdtRarqUS5GI_qAEjdpqs-TxFFuUT5IVFxyL-DW6j2WynTX8xyCDYxjV60J7M4TECQXhvA-Of_tqJGBy2sdjgX6WiIrAE97yHFHP23pOzruEyPq_O-bewiPDxqglWvGEpcQ).
    

[](#)