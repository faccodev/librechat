---
title: "Anúncios de Catálogo Advantage+ para celular - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/mobile-apps"
scraped_at: "2026-02-01T14:17:05.044Z"
---

# Anúncios de Catálogo Advantage+ de app para celular

É possível configurar Anúncios de Catálogo Advantage+ para celular com SDKs do Facebook. Incorpore o deep linking e o deep linking diferido ao app para proporcionar a melhor experiência possível às pessoas.

## Etapa 1: configurar o SDK do Facebook para Celular (iOS ou Android)

Integre o SDK do Facebook para [iOS](/docs/ios/getting-started) ou [Android](/docs/android/getting-started).

[](#)

## Etapa 2: configurar Eventos do App para celular

Na web, use os eventos de Pixel da Meta, como `ViewContent`, para rastrear as interações de eventos. Em celulares, é possível rastrear os mesmos eventos com Eventos do App.

Envie os mesmos três eventos obrigatórios do app e do Pixel: `ViewContent`, `AddToCart` e `Purchase`. Para funcionar corretamente, os Anúncios de Catálogo Advantage+ precisam desses eventos.

Evento para iOS

Evento para Android

Equivalente para a web

`FBSDKAppEventNameViewedContent`

`AppEventsConstants:: EVENT_NAME_VIEWED_CONTENT`

`ViewContent`

`FBSDKAppEventNameAddedToCart`

`AppEventsConstants:: EVENT_NAME_ADDED_TO_CART`

`AddToCart`

`[[FBSDKAppEvents shared] logPurchase:(double) currency:(NSString *) parameters:(NSDictionary *)];`

`AppEventsConstants:: EVENT_NAME_PURCHASED`

`Purchase`

Por exemplo, um evento `ViewContent` é disparado quando alguém visualiza um produto no app:

Objective-CAndroid SDK

```
[[FBSDKAppEvents shared] logEvent:FBSDKAppEventNameViewedContent
  valueToSum:54.23
  parameters:@{
    FBSDKAppEventParameterNameCurrency    : @"USD",
    FBSDKAppEventParameterNameContentType : @"product",
    FBSDKAppEventParameterNameContentID   : @"123456789"
  }
];
```

```
Bundle parameters = new Bundle();
parameters.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_TYPE, "product");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_ID, "1234");

logger.logEvent(AppEventsConstants.EVENT_NAME_VIEWED_CONTENT,
                120.00,
                parameters);
```

  

Também é possível fornecer uma matriz de valores em JSON de IDs de produto quando ocorrer um evento em diversos produtos. Por exemplo, você pode enviar vários produtos com o evento `Purchase`.

Objective-CAndroid SDK

```
[[FBSDKAppEvents shared] logPurchase:54.23 currency : @"USD" parameters:@{
  FBSDKAppEventParameterNameContentID   : @"['1234','5678']",
  FBSDKAppEventParameterNameContentType : @"product"
  }
];
```

```
Bundle parameters = new Bundle();
parameters.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_TYPE, "product");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_ID, "['1234', '5678']");

logger.logEvent(AppEventsConstants.EVENT_NAME_PURCHASED,
                180.00,
                parameters);
```

### Diversas identificações de conteúdo

Se houver várias identificações de conteúdo, forneça uma matriz JSON com escape, por exemplo:

```
"[\"1234\",\"5678\"]"
```

### Parâmetros opcionais

Para cada evento do app, é possível enviar parâmetros adicionais. Envie-os quando alguém fizer uma compra:

Nome

Descrição

`_valueToSum`

string

**Opcional.**  
Valor do produto ou da compra

`fb_currency`

string

**Opcional.**  
A moeda usada no valor do produto ou da compra

### Como usar um Parceiro de Métricas para Aplicativos

Se você usar um Parceiro de Métricas para Aplicativos (MMP, pelas iniciais em inglês) aprovado para relatar eventos ao Facebook, poderá ajustar sua implementação para enviar também os eventos obrigatórios. O processo varia de acordo com o MMP, mas normalmente é assim:

1.  Ajuste sua integração para relatar os [três eventos obrigatórios ao MMP](#mmprequiredevents), bem como os parâmetros necessários.
2.  Com o MMP, mapeie o nome dos seus eventos em relação aos do Facebook.
3.  [Teste os Eventos do App](#testing-app-events).

### Eventos obrigatórios para o MMP

Os eventos a seguir são **obrigatórios**.

Nome

Descrição

`fb_mobile_content_view`

Quando uma conta da Central de Contas visualizou um produto.

`fb_mobile_add_to_cart`

Quando um item foi adicionado ao carrinho.

`fb_mobile_purchase`

Quando itens foram comprados.

Você também precisa enviar estes dois parâmetros adicionais para que os Anúncios de Catálogo Advantage+ funcionem:

-   A identificação do item visualizado, adicionado ao carrinho ou comprado
    
-   Se a identificação é um `product` ou `product_group`
    

Os parâmetros adicionais disponíveis são os seguintes:

Nome

Descrição

`fb_content_type`

string

`product` ou `product_group`

`fb_content_id`

string

**Obrigatório.**  
Uma string com uma matriz codificada em JSON das identificações de produto ou grupo de produtos do varejista

`_valueToSum`

string

**Opcional.**  
O valor do produto comprado

`fb_currency`

string

**Opcional.**  
A moeda usada no valor do produto ou da compra

**Observação:** quando itens forem comprados, envie também os parâmetros `_valueToSum` e `fb_currency`.

### Como testar Eventos do App

O [Auxiliar para Anúncios no Aplicativo](/tools/app-ads-helper/) é a forma mais fácil de testar se a integração funcionou, para ver os eventos e parâmetros informados ao Facebook em tempo real.

1.  Selecione um app.
2.  Você verá duas ferramentas na parte inferior da página. Selecione **Testar os eventos do app**.
3.  Há duas opções: ver os eventos sendo relatados por você ou por uma identificação do anunciante específica. Na maioria dos casos, basta selecionar **Eu**. Verifique se você tem o Facebook instalado no dispositivo e se fez login.
4.  À medida que você realiza ações no app, os eventos serão exibidos na ferramenta com os respectivos parâmetros.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/12679502_792532450852779_556573488_n.png?_nc_cat=108&ccb=1-7&_nc_sid=34156e&_nc_ohc=xkK65sgL7IcQ7kNvwH3_R45&_nc_oc=AdleNjM36d2UMGWROf-C_mU2vJQBnVAMgPLYJv3vxGjLnt8lYMIzutJhkvsGoRwJcn5aZgP1wD8Jg1YXkD7fj_1b&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=HUkMAS7vEU972hgdvFgBsw&oh=00_AftR16a6Flj7bZpRi9o6j4EPwiER11eUhcqa0SgO0eXuZA&oe=69853E5C)

Você verá estes três nomes de eventos se a integração for concluída:

-   `FB_MOBILE_CONTENT_VIEW`
    
-   `FB_MOBILE_ADD_TO_CART`
    
-   `FB_MOBILE_PURCHASE`
    

Saiba mais sobre os eventos do app para [iOS](getting-started-app-events-ios) e para [Android](getting-started-app-events-android).

Para verificar a função de eventos do app, confira os eventos recentes no

[Gerenciador de Eventos do Facebook](https://www.facebook.com/events_manager2)

.

[](#)

## Etapa 3: configurar deep linking

Ao fornecer deep links no feed de produtos, qualquer pessoa que interagir com o anúncio no Facebook poderá ir diretamente a um local específico no app. Por exemplo, se alguém clicar em um anúncio enquanto usa o Facebook em um dispositivo móvel, essa pessoa verá o produto no seu app para celular. Para ver mais informações, consulte [Deep Linking](/docs/app-ads/deep-linking) e [Verify Deep Linking](https://developers.facebook.com/tools/app-ads-helper).

### Fallback para web em comparação com App Store

Ao usar deep links, você pode especificar o comportamento de fallback se alguém não tiver o app instalado. Ao fornecer deep links no feed de produtos, quem não tiver o app verá a URL da web do produto no anúncio.

Sua meta provavelmente é aumentar as vendas do catálogo. Por isso, talvez você prefira que as pessoas vejam as páginas dos produtos, e não o app para instalação. Portanto, nosso padrão são as URLs da web, embora seja possível especificar um comportamento diferente para ter mais controle. Defina o comportamento de fallback como `applink_treatment` ao criar o Anúncio de Catálogo Advantage+ e use uma destas opções:

Nome

Descrição

`web_only`

Sempre encaminha alguém à URL da web especificada. Substitui todos os deep links do seu feed.

`deeplink_with_web_fallback`

Encaminha alguém ao seu app se ele estiver instalado e houver deep links correspondentes. Caso uma dessas condições não seja atendida, encaminha à URL do site.

`deeplink_with_appstore_fallback`

Encaminha alguém ao app se ele estiver instalado e houver informações de deep link correspondentes. Caso o aplicativo não esteja instalado, encaminha à loja de aplicativos correspondente.

[](#)

## Etapa 4: configurar feed de produtos

Forneça agora deep links para Anúncios de Catálogo Advantage+. Para ver mais informações, consulte [Product Catalog, Deep Linking](/docs/marketing-api/dynamic-product-ads/product-catalog#deep-linking).

[](#)

## Etapa 5: definir especificações de rastreamento

Para mensurar eventos de conversão do site e dos apps para celular, verifique se todos os Anúncios de Catálogo Advantage+ têm as [especificações de rastreamento](/docs/marketing-api/tracking-specs) adequadas definidas para estes eventos:

Evento

Especificação de rastreamento

`offsite_conversion`

`{ 'action.type': 'offsite_conversion', 'fb_pixel': FB_PIXEL_ID }`

`app_custom_event`

`{'action.type':'app_custom_event','application':APP_ID}`

`mobile_app_install`

`{'action.type':'mobile_app_install','application':APP_ID}`

O Facebook pode rastrear todos os eventos com origem em um Anúncio de Catálogo Advantage+ independentemente de alguém visualizar o site ou app. Para definir as especificações de rastreamento:

```
v24.0
```

[](#)