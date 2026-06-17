---
title: "Criar, recuperar e atualizar - Business Management APIs"
source: "https://developers.facebook.com/docs/marketing-api/system-users/create-retrieve-update"
scraped_at: "2026-02-01T15:45:59.142Z"
---

# Criar, recuperar e atualizar um usuário do sistema

Você ainda não tem um token de usuário do sistema administrador quando cria um usuário do sistema pela primeira vez. Para começar, obtenha um token de acesso de usuário administrador real no [Gerenciador de Negócios](https://business.facebook.com/).

## Criar

Use o token de usuário do sistema administrador ou seu token de acesso de usuário administrador para criar um usuário do sistema.

**Observação**: um usuário do sistema só poderá receber uma função em um app se o usuário do sistema e o app pertencerem à mesma empresa. Caso seu app precise acessar dados usando um usuário do sistema e um token de acesso pertencente a outra empresa, use a [API de Empresa em Nome De](/docs/marketing-api/business-manager/guides/on-behalf-of/).

Veja os requisitos necessários para obter um token do usuário do sistema e fazer chamadas de API. As primeiras três etapas são configurações que também podem ser feitas no [Gerenciador de Negócios](https://business.facebook.com/). Ao criar seu primeiro usuário do sistema, você usará o token de acesso de um usuário real, que é um `admin` do Gerenciador de Negócios.

#### Criar um usuário do sistema administrador e gerar um token

1.  Crie um usuário do sistema administrador com seu token de acesso de usuário administrador.
2.  [Instale](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#TOS) o app com o usuário do sistema administrador usando o token de acesso do usuário administrador.
3.  [Gere](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#generate-token) o token de **usuário do sistema administrador** usando o token de acesso do usuário administrador.

#### Criar um usuário do sistema

1.  Crie um usuário do sistema usando o token de acesso do usuário administrador.
2.  Outra opção é criar um usuário do sistema usando o token de acesso de um usuário do sistema administrador do seu Gerenciador de Negócios, caso você tenha um.

#### Gerar um [token de acesso](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#systemusertoken) do usuário do sistema

1.  [Instale](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#TOS) o app com o usuário do sistema usando os seguintes tokens de acesso: usuário administrador, usuário do sistema administrador ou outro usuário do sistema.
2.  [Atribua a permissão](/docs/marketing-api/businessmanager/systemuser/permissions) a ativos (como contas de anúncio, Páginas) pertencentes ao seu Gerenciador de Negócios. As permissões devem ser atribuídas ao novo usuário do sistema usando os seguintes tokens de acesso: usuário administrador ou usuário do sistema administrador.
3.  [Gere](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#generate-token) o token de acesso do usuário do sistema usando o token de acesso do usuário administrador ou do usuário do sistema administrador.
4.  Agora, use o token de acesso do usuário do sistema para [fazer chamadas de API](/docs/marketing-api/businessmanager/systemuser/api-calls) em ativos de negócios.

Para criar um usuário do sistema ou um usuário do sistema administrador via API, você precisará do seguinte:

-   Um token de acesso: de um usuário administrador ou de um usuário do sistema administrador para o Gerenciador de Negócios
    
-   Função: `ADMIN` ou `EMPLOYEE`
    
-   Nome: identificador desse usuário do sistema ou do usuário do sistema administrador
    

Para criar um usuário do sistema, faça uma solicitação `POST`:

```
curl \
-F "name=Ad Server" \
-F "role=EMPLOYEE" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/system_users"
```

Isso retornará o `id` no escopo do app do novo usuário do sistema:

```
{
  "id" : "100000008899900"
}
```

Esse é o [ID no escopo do app](/docs/apps/upgrading#upgrading_v2_0_user_ids) para um usuário do sistema. Use esse identificador para fazer chamadas de API, em vez do ID canônico em [`Business Manager > System Users`](https://business.facebook.com/settings/system-users).

[](#)

## Recuperar

Para obter a lista de usuários do sistema, você precisará de um token de acesso do usuário administrador ou do usuário do sistema administrador. A lista inclui os usuários do sistema administradores e os respectivos [IDs no escopo do app](/docs/apps/upgrading#upgrading_v2_0_user_ids).

Faça uma solicitação `GET`:

```
curl "https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/system_users?access_token=<ACCESS_TOKEN>>"
```

Isso retornará uma lista de todos os usuários do sistema, incluindo usuários do sistema administradores pertencentes a um Gerenciador de Negócios:

```
{
  "data": [
    {
      "id": "1000081799813",
      "name": "Reporting server"
      "role": "ADMIN",
    }, 
  ]
}
```

[](#)

## Atualizar

Você pode alterar o nome de um usuário do sistema ou de um usuário do sistema administrador:

```
curl \
-F "system_user_id=<APP_SCOPED_SYSTEM_USER_ID>" \
-F "name=FBX Server" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/system_users"
```

[](#)

## Invalidar tokens de acesso

Não é possível excluir um usuário do sistema ou um usuário do sistema administrador, mas você pode invalidar todos os respectivos tokens de acesso. Para invalidar um token, envie uma solicitação `DELETE` para:

```
https://graph.facebook.com/<API_VERSION>/<APP_SCOPED_SYSTEM_USER_ID>/access_tokens
```

A resposta retornará `true`, se a chamada for bem-sucedida. Depois disso, você poderá [gerar novos tokens de acesso para o usuário do sistema](/docs/marketing-api/businessmanager/systemuser/install-apps-and-generate-tokens#generate-token), conforme descrito acima.

[](#)