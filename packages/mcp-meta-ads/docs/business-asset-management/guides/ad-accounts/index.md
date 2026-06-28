---
title: "Contas de anúncios - Business Management APIs"
source: "https://developers.facebook.com/docs/marketing-api/business-asset-management/guides/ad-accounts/"
scraped_at: "2026-02-01T14:18:24.984Z"
---

# Contas de anúncios

Como administrador, você pode reivindicar contas de anúncios que pertencem a uma empresa. Isso permite atribuir facilmente pessoas às contas de anúncios que elas devem acessar. Também é possível atribuir formas de pagamento compartilhadas às suas contas de anúncios.

[Os grupos de contas de anúncios](/docs/reference/ads-api/adaccountgroup) não podem ser reivindicados por uma empresa. Os usuários com acesso a certos grupos de contas de anúncios ainda terão acesso a eles depois que forem adicionados ao Gerenciador de Negócios.

## Reivindicar contas

Caso você gerencie contas de anúncios fora do Gerenciador de Negócios com a função de **administrador**, será possível reivindicá-las para sua empresa. Trata-se de um procedimento único. Depois de reivindicadas, você só poderá gerenciar as contas de anúncios nesse Gerenciador de Negócios.

As contas de criativo não podem ser reivindicadas.

Para reivindicar uma conta de anúncios na sua empresa, insira a identificação da conta no formato `act_###`. Envie uma solicitação `POST`: o solicitante precisa ser um administrador da empresa que está reivindicando a conta de anúncios.

```
curl \
  -F "adaccount_id=act_<AD_ACCOUNT_ID>" \
  -F "access_token=<ACCESS_TOKEN>" \
 "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/owned_ad_accounts"
```

Se você for um administrador da conta de anúncios, aprovaremos imediatamente essa reivindicação. O Facebook retornará o `access_status` definido como `CONFIRMED`.

Caso você **não tenha as permissões necessárias como usuário**, enviaremos uma solicitação de propriedade aos administradores da conta de anúncios. Após o envio da solicitação, a resposta terá o `access_status` definido como `PENDING`.

Para aceitar a solicitação de propriedade, entre e confirme o aceite no Gerenciador de Anúncios. É preciso ser um administrador da conta de anúncios para fazer isso.

[](#)

## Solicitar acesso à conta

A maioria das empresas de marketing não precisará reivindicar contas de anúncios dos clientes. Consulte o documento [Business-to-Business Functions](/docs/marketing-api/businessmanager/business-to-business) para saber como solicitar acesso a ativos pertencentes a outros Gerenciadores de Negócios.

[](#)

## Criar contas de anúncios

É preciso ser administrador de uma empresa para criar novas contas de anúncios. Não é possível usar logins compartilhados de administradores da empresa para criar novas contas de anúncios ou realizar outras ações.

Para usar esta API, você deve ter uma configuração válida da Página e da empresa. Se você tiver contas de anúncios incompletas ou Páginas não publicadas pelo Facebook, não será possível criar uma nova conta de anúncios.

É possível criar até 5 contas de anúncios usando a API. Se quiser criar um número maior de contas, você precisará fazer isso manualmente.

Confira os campos disponíveis:

Nome

Descrição

`name`

Tipo: string

Nome da conta de anúncios.

`timezone_id`

Tipo: número inteiro

ID do fuso horário.

`currency`

Tipo: string

A abreviação da moeda usada para a conta de anúncios.

`partner`

Tipo: longo ou string

Parceiro de Negócios do Facebook (FBP, pelas iniciais em inglês). Deve ser o alias de uma Página do Facebook, a identificação de uma Página do Facebook ou o ID de um app do Facebook. Caso não esteja disponível, use `NONE` ou `UNFOUND`.

`end_advertiser`

Tipo: longo ou string

A entidade para a qual os anúncios serão direcionados. Deve ser a identificação de uma empresa. Caso não esteja disponível, use `NONE` ou `UNFOUND`.

`media_agency`

Tipo: longo ou string

A agência, que pode ser a própria empresa. Deve ser o alias de uma Página do Facebook, a identificação de uma Página do Facebook ou o ID de um app do Facebook. Caso não esteja disponível, use `NONE` ou `UNFOUND`.

`invoice`

Tipo: booliano

Se a empresa tiver uma linha de crédito normal de propriedade do Gerenciador de Negócios com o Facebook, vincularemos a conta de anúncios a essa linha de crédito.

Para criar uma nova conta de anúncios para uma empresa, especifique `name`, `currency`, `timezone_id`, `end_advertiser`, `media_agency` e `partner`. Verifique as condições a seguir:

-   `media_agency` e `partner` devem ser o alias de uma Página do Facebook, a identificação de uma Página do Facebook ou o ID de um app do Facebook.
    
-   `end_advertiser` deve ser a identificação de uma empresa.
    

Caso sua conta de anúncios não tenha um anunciante, uma agência de mídia nem um parceiro, especifique `NONE`. Se a conta de anúncios tiver um anunciante, uma agência de mídia ou um parceiro, mas eles não estiverem no Facebook como uma Página ou um app, especifique `UNFOUND`.

Para criar uma conta de anúncios:

```
curl \
  -F "name=MyAdAccount" \
  -F "currency=USD" \
  -F "timezone_id=1" \
  -F "end_advertiser=<END_ADVERTISER_ID>" \
  -F "media_agency=<MEDIA_AGENCY_ID>" \
  -F "partner=NONE" \
  -F "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/adaccount"
```

Caso você já tenha uma linha de crédito estendido com o Facebook, defina `invoice` como `true`. Depois, associaremos sua nova conta de anúncios à linha de crédito estendido.

A resposta é semelhante a esta:

```
{
  "id": "act_<ADACCOUNT_ID>",
  "account_id": "<ADACCOUNT_ID>",
  "business_id": "<BUSINESS_ID>",
  "end_advertiser_id": "<END_ADVERTISER_ID>",
  "media_agency_id": "<MEDIA_AGENCY_ID>",
  "partner_id": "NONE"
}
```

[](#)

## Visualizar contas próprias

Veja todas as contas de anúncios às quais sua empresa tem acesso com uma chamada `GET`:

```
curl -G \
-d "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/owned_ad_accounts"
```

Retorna todas as contas de anúncios de uma empresa. Alguns campos são específicos para o relacionamento da conta de anúncios e da empresa.

-   `permitted_tasks` é uma matriz das tarefas que você pode atribuir a uma determinada conta de anúncios.
    
-   `access_type` define se a empresa atua como um `OWNER` ou uma `AGENCY` da conta de anúncios.
    

Para ver contas de anúncios com acesso pendente, faça esta chamada `GET`:

```
curl -G \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/pending_owned_ad_accounts"
```

[](#)

## Remover contas

Não será possível remover contas de anúncios da empresa se você for um `OWNER`, e as contas tiverem sido `CONFIRMED`. Caso você tenha uma solicitação de acesso `PENDING` ou acesso de `AGENCY` à conta de anúncios, faça esta chamada `DELETE`:

```
curl \
  -X DELETE \
  -F "adaccount_id=act_<AD_ACCOUNT_ID>" \
  -F "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_accounts"
```

[](#)

## Visualizar o acesso à conta

Veja as contas de anúncios para as quais uma pessoa tem permissão com a seguinte chamada `GET`:

```
curl -G \
  -d "access_token=ACCESS_TOKEN" \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_SCOPED_USER_ID>/assigned_ad_accounts"
```

Para ver as permissões de uma pessoa em uma conta de anúncios, faça esta chamada `GET`:

```
curl -G \
  -d "access_token=ACCESS_TOKEN" \
  "https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/assigned_users"
```

[](#)

## Adicionar pessoas às contas

Depois que o Gerenciador de Negócios for associado a uma conta de anúncios, você poderá atribuir tarefas a outros usuários da empresa. As possíveis tarefas incluem:

Nome

Constante da API

Descrição

Somente relatórios

`['ANALYZE']`

Pode ver dados sobre o desempenho do anúncio.

Usuário geral

`['ADVERTISE', 'ANALYZE']`

Pode ver e editar anúncios, além de criar anúncios usando a forma de pagamento associada à conta de anúncios. Não tem permissão para fazer configurações no nível da conta de anúncios, como definir uma forma de pagamento.

Administrador

`['MANAGE', 'ADVERTISE', 'ANALYZE']`

Pode gerenciar todos os aspectos das campanhas, dos relatórios, da cobrança e das permissões da conta de anúncios.

Você precisará fazer o seguinte:

-   `adaccount_id`: a identificação da conta de anúncios, no formato `act_123`.
    
-   `user_id`: o número de identificação do usuário a ser adicionado.
    
-   Tarefas a serem atribuídas
    

Para adicionar um novo usuário com as tarefas `['MANAGE', 'ADVERTISE', 'ANALYZE']`, faça esta chamada `POST`:

```
curl \
  -F "user=BUSINESS_SCOPED_USER_ID" \
  -F "tasks=['MANAGE', 'ADVERTISE', 'ANALYZE']" \
  -F "access_token=ACCESS_TOKEN" \
  "https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/assigned_users"
```

[](#)

## Alterar permissões nas contas

Para alterar as tarefas de um usuário existente, faça a mesma chamada `POST` que você usaria para adicionar um novo usuário:

```
curl \
  -F "user=BUSINESS_SCOPED_USER_ID" \
  -F "tasks=['ANALYZE']" \
  -F "access_token=ACCESS_TOKEN" \
  "https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/assigned_users"
```

[](#)

## Remover pessoas de contas de anúncios

Para remover uma pessoa de uma conta de anúncios, você precisará do seguinte:

-   `adaccount_id`: a identificação da conta de anúncios, no formato `act_123`.
    
-   `user_id`: o número de identificação do usuário a ser removido.
    

A chamada `DELETE` é:

```
curl \
  -X DELETE \
  -F "user=<BUSINESS_SCOPED_USER_ID>" \
  -F "access_token=ACCESS_TOKEN" \
  "https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/assigned_users"
```

[](#)