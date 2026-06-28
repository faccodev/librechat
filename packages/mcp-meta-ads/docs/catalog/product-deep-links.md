---
title: "Deep links de produtos - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/product-deep-links"
scraped_at: "2026-02-01T15:53:29.636Z"
---

# Deep links de produtos

Forneça deep links no seu feed seguindo a especificação do [App Links](https://developers.facebook.com/docs/applinks). As informações de deep links no feed têm prioridade sobre as que o Facebook coleta com metadados do App Links no nosso rastreador da web.

Não será necessário especificar esses dados se você já tiver informações de deep link do App Links. O Facebook usa as informações do App Links para exibir o deep link certo. Para exibir deep links nos seus anúncios, consulte a documentação sobre os [modelos de anúncios de catálogo Advantage+](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/ads-management/#adtemplate).

No iOS, só forneça informações do app para iPad **ou** iPhone se elas forem diferentes das do app para iOS geral.

Use um [grupo de produtos](/docs/marketing-api/reference/product-group) para agrupar todas as [variantes de produto](https://developers.facebook.com/docs/marketing-api/catalog/product-variants). Um grupo de produtos identifica itens quase idênticos, mas que têm variações como cor, material, tamanho ou estampa. Dessa forma, fica mais fácil anunciar cores, estilos ou estampas adicionais para um produto específico. Todos os produtos em um grupo compartilham a mesma `item_group_id`. Em anúncios de catálogo Advantage+, escolhemos apenas um item do grupo com base no sinal que recebemos do pixel ou do app.

Se quiser conhecer os formatos sugeridos para programação do feed de dados, consulte os [arquivos de exemplo em CSV e TSV](/docs/marketing-api/catalog/reference/#feed-format-use-case) na página de referência do catálogo.

Nome

Descrição

Obrigatório

`applink.android_app_name`

O nome do app para Android que será exibido. Por exemplo: `Electronic Android`.

Não

`applink.android_package`

O nome do pacote totalmente qualificado para geração de intenções. Por exemplo: `com.electronic`.

Não

`applink.android_url`

O [esquema de URL personalizado](/docs/android/deep-linking#support-custom-url-schemes-in-your-mobile-app) ou o [App Link](/docs/android/deep-linking#android-app-links) do app para Android. Por exemplo: `android://electronic` ou `https://www.example.com/path/to/component/android`.

Não

`applink.ios_app_name`

O nome do app para iOS que será exibido. Por exemplo: `Electronic iOS`.

Não

`applink.ios_app_store_id`

O ID do app para iOS da App Store. Por exemplo: `1234`.

Não

`applink.ios_url`

O [esquema de URL personalizado](/docs/ios/deep-linking#support-custom-url-schemes-in-your-mobile-app) ou o [link universal](/docs/ios/deep-linking#support-ios-universal-links) do app para iOS. Por exemplo: `ios://electronic` ou `https://www.example.com/path/to/component/ios`.

Não

`applink.ipad_app_name`

O nome do app para iPad que será exibido. Por exemplo: `Electronic iPad`.

Não

`applink.ipad_app_store_id`

O ID do app para iPad da App Store. Por exemplo: `9010`.

Não

`applink.ipad_url`

O [esquema de URL personalizado](/docs/ios/deep-linking#support-custom-url-schemes-in-your-mobile-app) ou o [link universal](/docs/ios/deep-linking#support-ios-universal-links) do app para iPad. Por exemplo: `ipad://electronic` ou `https://www.example.com/path/to/component/ipad`.

Não

`applink.iphone_app_name`

O nome do app para iPhone que será exibido. Por exemplo: `Electronic iPhone`.

Não

`applink.iphone_app_store_id`

O ID do app para iPhone da App Store. Por exemplo: `5678`.

Não

`applink.iphone_url`

O [esquema de URL personalizado](/docs/ios/deep-linking#support-custom-url-schemes-in-your-mobile-app) ou o [link universal](/docs/ios/deep-linking#support-ios-universal-links) do app para iPhone. Por exemplo: `iphone://electronic` ou `https://www.example.com/path/to/component/iphone`.

Não

`applink.windows_phone_app_name`

O nome do app para Windows que será exibido. Por exemplo: `Electronic Windows`.

Não

`applink.windows_phone_app_id`

O ID do app para Windows da loja de apps, como um GUID. Por exemplo: `ee728e01-7727-4168-9c8f-85c7eef40112`.

Não

`applink.windows_phone_url`

O esquema de URL personalizado do app para Windows Phone. Por exemplo: `windows://electronic`.

Não