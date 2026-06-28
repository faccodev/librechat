---
title: "Instalar apps e gerar, atualizar e revogar tokens - Business Management APIs"
source: "https://developers.facebook.com/docs/marketing-api/system-users/install-apps-and-generate-tokens"
scraped_at: "2026-02-01T14:09:56.739Z"
---

# Instalar apps e gerar, atualizar e revogar tokens

Como um usuário do sistema representa as chamadas do servidor, ele não tem um Login do Facebook, não pode instalar um app nem percorrer o fluxo padrão do OAuth do Facebook para gerar um token. Isso precisa ser feito por meio das chamadas de API.

## Tipos de token de acesso ao sistema

Tipos

Tokens de acesso sem validade

Tokens de acesso com validade sugeridos

Permanente?

Nunca expira

Válido por 60 dias

Precisa atualizar?

Não

Sim

Recomendação com base nos casos de uso

Você pode tolerar o risco de vazamento de tokens de acesso e quer que apps de terceiros tenham acesso offline a dados.

Você quer limitar o risco de vazamento dos tokens de acesso.

## Instalar apps

Um usuário do sistema ou usuário administrador do sistema deve instalar o app que será usado para gerar um token de acesso. Ou seja, é necessário permitir que o app faça chamadas de API em nome desse usuário.

O usuário do sistema e o app devem pertencer ao mesmo Gerenciador de Negócios. Somente apps com [acesso padrão](https://developers.facebook.com/docs/marketing-api/access#standard) ou superior à API de Gerenciamento de Anúncios podem ser instalados.

A instalação de um app para um usuário do sistema requer o seguinte:

-   `access_token`: de um usuário administrador, um usuário administrador do sistema ou outro usuário do sistema.
    
-   `business_app`: o ID do app que está sendo instalado.
    

Faça uma solicitação `POST` a fim de instalar um app para o usuário do sistema:

```
curl \
-F "business_app=APP-ID" \
-F "access_token=ACCESS-TOKEN" \
"https://graph.facebook.com/API-VERSION/SYSTEM-USER-ID/applications"
```

Se a instalação for bem-sucedida, a chamada retornará um resultado booliano. Caso uma restrição não seja cumprida, você verá a mensagem de erro correspondente.

[](#)

## Gerar token de acesso

Depois que o usuário do sistema instalar o app, um token de acesso persistente poderá ser gerado. Há algumas restrições:

-   O usuário do sistema precisa ter instalado o app informado no parâmetro, conforme exibido na etapa acima.
    
-   Os apps só poderão fazer o direcionamento das empresas que os obtiverem (ou das suas subordinadas).
    
-   O usuário do sistema e o dono do token de acesso usado na chamada de API para a geração desse token precisam pertencer ao mesmo Gerenciador de Negócios.
    
-   O app pode pertencer ao mesmo Gerenciador de Negócios ou não. Em caso negativo, há algumas restrições. Consulte a [seção abaixo](#app-not-owned).
    

Confira os parâmetros para a chamada de API:

-   `business_app`: o app pertencente ao Gerenciador de Negócios ao qual o usuário do sistema está vinculado.
    
-   `appsecret_proof`: o campo calculado para o app. Ele é necessário para verificar se o servidor certo está fazendo a chamada de API. Para saber mais, acesse [Segurança no login](/docs/facebook-login/security/).
    
-   `scope`: a string separada por vírgulas com as permissões estendidas.
    
-   `access_token`: o token pertencente ao administrador do Gerenciador de Negócios, ao usuário administrador ou ao usuário regular do sistema.
    
-   `set_token_expires_in_60_days`: definido como "true" para gerar um token de acesso do usuário do sistema com validade. Opcional.
    

Para usuários do sistema, os seguintes escopos são compatíveis:

-   `ads_management`
    
-   `ads_read`
    
-   `attribution_read`
    
-   `business_management`
    
-   `catalog_management`
    
-   `commerce_account_manage_orders`
    
-   `commerce_account_read_orders`
    
-   `commerce_account_read_settings`
    
-   `instagram_basic`
    
-   `instagram_branded_content_ads_brand`
    
-   `instagram_branded_content_brand`
    
-   `instagram_content_publish`
    
-   `instagram_manage_comments`
    
-   `instagram_manage_insights`
    
-   `instagram_manage_messages`
    
-   `instagram_shopping_tag_products`
    
-   `leads_retrieval`
    
-   `page_events`
    
-   `pages_manage_ads`
    
-   `pages_manage_cta`
    
-   `pages_manage_engagement`
    
-   `pages_manage_instant_articles`
    
-   `pages_manage_metadata`
    
-   `pages_manage_posts`
    
-   `pages_messaging`
    
-   `pages_read_engagement`
    
-   `pages_read_user_content`
    
-   `pages_show_list`
    
-   `private_computation_access`
    
-   `publish_video`
    
-   `read_audience_network_insights`
    
-   `read_insights`
    
-   `read_page_mailboxes`
    
-   `whatsapp_business_management`
    
-   `whatsapp_business_messaging`
    

**Permissão descontinuada, visível somente para apps criados antes de 24 de abril de 2018**

`publish_actions`

**Permissões restritas por recursos**

Recurso

Permissão

business\_creative\_asset\_management

`business_creative_management``business_creative_insights`  
`business_creative_insights_share``business_data_management`

commerce\_public\_api\_beta\_testing

`commerce_manage_accounts``commerce_account_read_reports`

Para gerar um `appsecret_proof`, é possível usar um código `PHP`:

```
$appsecret_proof = hash_hmac(
  'sha256',
  $access_token_used_in_the_call,
  $app_secret_for_the_app_used_in_the_call,
);
```

No exemplo de código acima, `app_secret_for_the_app_used_in_the_call` se refere à chave secreta do app usada para gerar o token de acesso. Encontre sua chave no Painel de Apps.

`appsecret_proof` com hash deve ser uma string (por exemplo, `"1734d0d1e1ca62c9762c10bbc7321fdf89ecc7d819312b2f3"`).

Faça uma solicitação `POST` para gerar um token de acesso do usuário do sistema permanente:

```
curl \
-F "business_app=<APP_ID>" \
-F "scope=ads_management,pages_read_engagement,pages_show_list" \
-F "appsecret_proof=APPSECRET-PROOF" \
-F "access_token=ACCESS-TOKEN" \
"https://graph.facebook.com/API-VERSION/SYSTEM-USER-ID/access_tokens"
```

Faça uma solicitação POST para gerar um token de acesso do usuário do sistema com validade:

```
curl \
-F "business_app=<APP_ID>" \
-F "scope=ads_management,pages_read_engagement,pages_show_list" \
-F "set_token_expires_in_60_days=true" \
-F "appsecret_proof=APPSECRET-PROOF" \
-F "access_token=ACCESS-TOKEN" \
"https://graph.facebook.com/API-VERSION/SYSTEM-USER-ID/access_tokens"
```

Antes, o ponto de extremidade era `/SYSTEM-USER-ID/ads_access_token`. As chamadas que usarem o nome antigo resultarão em erro.

A resposta retorna a string do token de acesso. Caso as restrições não sejam cumpridas, serão gerados códigos de erro correspondentes. A resposta:

```
{
  "access_token": "CAAB3rQQzTFABANaYYCmOuLhbC]Fu8cAnmkcvT0ZBIDNm1d1fSp4Eg4XA79gmYumZCoSuiMSUILUjzG3y15BJlrYwXdqwd5c7y3lOUzu6aT7MkXL6HpISksSuLP4aFKWPmwb6iOgGeugRSn766xMZCN72vTiGGLUNqC2MKRL"
}
```

Também é possível gerar um token de acesso de usuário do sistema usando a interface do usuário do Gerenciador de Negócios.

[](#)

## Atualizar token de acesso

O token de usuário do sistema com validade é válido por 60 dias depois de ser gerado ou atualizado. A fim de criar continuidade, o desenvolvedor deve atualizar o token de acesso dentro de 60 dias. Caso contrário, o token será perdido, e será preciso criar outro para recuperar o acesso à API.

Para atualizar um token de acesso do usuário do sistema com validade, você precisa do seguinte:

-   `fb_exchange_token`: um token de acesso do usuário do sistema válido
    
-   `client_id`: o ID do app
    
-   `client_secret`: a chave secreta do app
    
-   `set_token_expires_in_60_days`: definido como "true" para atualizar um token de acesso do usuário do sistema com validade
    

Faça uma consulta ao ponto de extremidade GET oauth/access\_token.

**Exemplo de solicitação**

```
curl -i -X GET 
"https://graph.facebook.com/{graph-api-version}/oauth/access_token?  
    grant_type=fb_exchange_token&          
    client_id={app-id}&
    client_secret={app-secret}&
    set_token_expires_in_60_days=true&
    fb_exchange_token={your-access-token}"
```

**Exemplo de resposta**

```
{
  "access_token":"{expiring-system-user-access-token}",
  "token_type": "bearer",
  "expires_in": 5183944    // Time left in seconds until the token expires
}
```

[](#)

## Revogar token de acesso

Este ponto de extremidade tem como objetivo fazer a troca regular de tokens ou cancelar tokens de acesso de usuários do sistema comprometidos, de modo a proteger seu sistema.

Para revogar um token de acesso de usuário do sistema, é preciso ter o seguinte:

-   `revoke_token`: o token de acesso a ser revogado
    
-   `client_id`: o ID do app
    
-   `client_secret`: a chave secreta do app
    
-   `access_token`: o token de acesso para identificar quem ligou
    

Estes são os requisitos:

-   O client\_id deve corresponder ao app real e garantir que o app não seja limitado, desabilitado ou excluído.
    
-   O client\_id, o app instalado do `revoke_token`, o app instalado do `access_token` e o `client_secret` devem ser os mesmos.
    

Faça uma consulta ao ponto de extremidade GET oauth/revoke.

**Exemplo de solicitação**

```
curl -i -X GET "https://graph.facebook.com/{graph-api-version}/oauth/revoke?   
    client_id={app-id}&
    client_secret={app-secret}&
    revoke_token={system-user-access-token-to-revoke}&
    access_token={your-access-token}"
```

**Exemplo de resposta**

```
{
  "success":"true",
}
```

[](#)

## Troca de tokens de acesso

A troca de tokens é uma medida de segurança que pode ajudar a mitigar riscos, por exemplo, limitando o dano de tokens vazados. Ao alterar tokens de acesso regularmente, é possível limitar o dano em potencial causado por um token vazado ou perdido, de modo semelhante à alteração de senhas. No momento, nosso sistema é compatível com a troca de usuários do sistema sem interrupção. Veja as instruções para fazer isso:

1.  Atualize o token de acesso de usuário do sistema por meio da [API de Atualização](#refresh-token), que devolverá um novo token de acesso de usuário do sistema, válido por 60 dias a partir da atualização. O token de acesso antigo ainda funcionará até a validade (ou seja, data de criação mais 60 dias).
    
2.  Implante o novo token de acesso de usuário do sistema.
    
3.  Revogue o antigo token de acesso de usuário do sistema por meio da [API de Revogação](#revoke-token). A invalidação ocorre imediatamente, e o token não poderá ser usado de novo depois disso.
    

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=820312138947446&version=1764308588&transcode_extension=webp)

[](#)