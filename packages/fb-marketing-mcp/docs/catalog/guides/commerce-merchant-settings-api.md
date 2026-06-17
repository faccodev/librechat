---
title: "API de Configurações do Comerciante - Catálogo"
source: "https://developers.facebook.com/docs/marketing-api/catalog/guides/commerce-merchant-settings-api"
scraped_at: "2026-02-01T15:53:11.147Z"
---

# API de Configurações do Comerciante

Esta API pode ser usada para atualizar detalhes das configurações de comerciante (CMS), como status do comerciante, URLs de política de privacidade/devolução, configuração de finalização da compra e página de classificado da Korea Fair Trade Commission (FTC).

## Pré-requisitos

Para fazer solicitações a essa API, você precisará fornecer a identificação do CMS. Além disso, a configuração de finalização da compra só está disponível para comerciantes que já configuraram a integração de parceiros.

[](#)

## Ponto de extremidade POST

Faça uma solicitação `POST` para:

```
https://graph.facebook.com/{graph_api_version}/{COMMERCE_MERCHANT_SETTINGS_ID}
```

-   {graph\_api\_version}: a versão da Graph API (por exemplo, "v20.0").
    
-   {COMMERCE\_MERCHANT\_SETTINGS\_ID}: a identificação de configurações do comerciante recuperada de `GET fbe_business/fbe_installs?fbe_external_business_id=<external_business_id>`. Para saber mais sobre como recuperar essa identificação, consulte esta [documentação](/docs/facebook-business-extension/fbe/guides/get-features#parsing-webhook-at-uninstall).
    

### Parâmetros

Campo

Descrição

`access_token`

tipo: `string`

**Obrigatório**

Um token de acesso válido da Graph API

`merchant_status`

tipo: `string`

**Opcional.**

Determina o status atual do comerciante. Pode ser definido como `externally_disabled` usando essa API.

`privacy_policy_localized`

tipo: `object`

**Opcional.**

Determina a política de privacidade específica do idioma:

-   `url` (string) **obrigatório**: o URL da política de privacidade
    
-   `locale` (string) **obrigatório**: a localidade da política de privacidade, como: `en` (inglês). Observação: a localidade segue o formato BCP 47.
    

`return_policy_localized`

tipo: `object`

**Opcional.**

Determina a política de devolução específica do idioma:

-   `url` (string) **obrigatório**: o URL da política de devolução
    
-   `locale` (string) **obrigatório**: a localidade da política de devolução, como: `ko` (Coreia). Observação: a localidade segue o formato BCP 47.
    

`korea_ftc_listing`

tipo: `string`

**Opcional.**

O link do URL para a página do classificado do vendedor na Korea Fair Trade Commission (FTC).

`checkout_config`

tipo: `object`

**Opcional.**

Configura a experiência de finalização da compra na web para comerciantes. Esse parâmetro exige que a integração de parceiros já esteja configurada.

-   `checkout_url` (string) **obrigatório**: URL da página de finalização da compra do comerciante.
    
-   `country_code` (string) **obrigatório**: código do país ao qual essa configuração de finalização da compra se aplica.
    

### Exemplo de solicitação de cURL

```
curl -X POST \
  "https://graph.facebook.com/v20.0/{COMMERCE_MERCHANT_SETTINGS_ID}" \
  -F "access_token={YOUR_ACCESS_TOKEN}" \
  -F "merchant_status=enabled" \
  -F "privacy_policy_localized[url]=https://mystore.com/privacy" \
  -F "privacy_policy_localized[locale]=ko" \
  -F "return_policy_localized[url]=https://mystore.com/returns" \
  -F "return_policy_localized[locale]=ko" \
  -F "korea_ftc_listing=https://www.mystore.com/kftc" \
  -F "checkout_config[checkout_url]=https://mystore.com/checkout" \
  -F "checkout_config[country_code]=KR"
```

Substitua:

-   `YOUR_ACCESS_TOKEN` por seu token válido.
    
-   `{COMMERCE_MERCHANT_SETTINGS_ID}` pela identificação do CMS (retornada durante a integração com a Extensão da Meta para Empresas)
    

[](#)

## Ponto de extremidade GET

Faça uma solicitação `GET` para:

```
https://graph.facebook.com/{graph_api_version}/{COMMERCE_MERCHANT_SETTINGS_ID}
```

-   {graph\_api\_version}: a versão da Graph API (por exemplo, "v20.0").
    
-   {COMMERCE\_MERCHANT\_SETTINGS\_ID}: a identificação de configurações do comerciante recuperada de `GET fbe_business/fbe_installs?fbe_external_business_id=<external_business_id>`. Para saber mais sobre como recuperar essa identificação, consulte esta [documentação](/docs/facebook-business-extension/fbe/guides/get-features#parsing-webhook-at-uninstall).
    

### Campos

#### Campos básicos

-   `id`
    
-   `display_name`
    
-   `merchant_status`
    
-   `contact_email`
    
-   `terms`
    

#### Campos de política (requer o parâmetro `locale`)

-   `privacy_policy_localized`
    
-   `return_policy_localized`
    
-   `korea_ftc_listing`
    

#### Campos de configuração (requer o parâmetro `country_code`)

-   `checkout_config`
    
-   `cta`
    
-   `shops_ads_setup`
    

#### Bordas/relações

-   product\_catalogs
    
-   setup\_status
    
-   tax\_settings
    
-   onsite\_commerce\_merchant
    
-   order\_management\_apps
    
-   shipping\_profiles
    
-   shops\_collection\_destinations
    
-   shops (exige permissão de gerenciamento de catálogo)
    

### Exemplo de solicitação de cURL

```
curl -X GET https://graph.facebook.com/v20.0/{COMMERCE_MERCHANT_SETTINGS_ID} \
-G \
 -d 'access_token=<ACCESS_TOKEN>' \
 -d \
'fields=id,display_name,merchant_status,return_policy_localized.locale(ko),shops_ads_setup.country_code(KR),checkout_config.country_code(KR)'
```

Substitua:

-   `YOUR_ACCESS_TOKEN` por seu token válido.
    
-   `{COMMERCE_MERCHANT_SETTINGS_ID}` pela identificação do CMS (retornada durante a integração com a Extensão da Meta para Empresas)
    

[](#)