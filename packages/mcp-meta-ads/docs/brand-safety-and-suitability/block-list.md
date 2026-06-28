---
title: "API de Listas de Bloqueio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/block-list"
scraped_at: "2026-02-01T14:02:04.727Z"
---

# API de Listas de Bloqueio

As listas de bloqueio impedem que os anúncios apareçam em locais que os anunciantes não consideram adequados para a própria marca ou campanha. Isso pode incluir apps no Audience Network da Meta, vídeos in-stream do Facebook, anúncios no Facebook Reels e feed do perfil do Instagram.

Confira outras documentações que você pode analisar e/ou compartilhar com anunciantes:

-   [Sobre Listas de Bloqueio | Central de Ajuda para Empresas da Meta](https://www.facebook.com/business/help/255483958155378?id=1769156093197771)
    

## Permissões

-   O app exige a concessão de recurso `block_list_management_v2_api_access`.
    

[](#)

## Criar uma nova lista de bloqueio

### 1\. Crie o rascunho de uma nova lista de bloqueio a partir de um arquivo contendo URLs.

Inicie o processo de criação fazendo uma solicitação POST para a borda `block_list_drafts` de um nó comercial, especificando o arquivo de lista de bloqueio no parâmetro `publisher_urls_file`:

```
CURL POST \
-F "publisher_urls_file=@path/to/local/file.txt" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/block_list_drafts
```

A resposta teria o seguinte formato:

```
{"id":<BLOCK_LIST_DRAFT_ID>}
```

Dependendo do tamanho do arquivo de URLs do publisher, talvez a criação do arquivo demore um pouco mais para ser concluída.

Para fazer essa verificação de status, seu app (não o token de acesso) precisa ter as [permissões “ads\_read”, “ads\_management” e os recursos de “Acesso Padrão ao Gerenciamento de Anúncios”](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types).

Para consultar o status e o progresso do processo de criação do rascunho de lista de bloqueio, consulte o nó `block_list_draft` com os campos `async_job_status` e `async_percent_completion`:

```
CURL -X GET \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_DRAFT_ID>?fields=async_job_status,async_percent_completion&access_token=<ACCESS_TOKEN>"
```

A resposta será a seguinte:

```
{"id":<BLOCK_LIST_DRAFT_ID>,
 "async_job_status":"running",
 "async_percent_completion":80}
```

Os status possíveis são: programado, com falha, em veiculação, sucesso. Você só poderá executar a próxima etapa se o status for "sucesso".

### 2\. Crie uma nova lista de bloqueio a partir do rascunho da lista de bloqueio.

Faça uma solicitação POST para a borda publisher\_block\_lists de um nó comercial:

```
curl \
-F "draft_id=<BLOCK_LIST_DRAFT_ID>" \
-F "name=<BLOCK_LIST_NAME>" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/publisher_block_lists
```

A resposta será uma identificação de lista de bloqueio de publishers recém-criada ou atualizada:

```
{"id":<BLOCK_LIST_ID>}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

name

string

S

Nome da lista de bloqueio.

draft\_id

fbid

S

ID do rascunho de lista de bloqueio.

[](#)

## Atualizar uma lista de bloqueio existente

Primeiro, crie um novo rascunho de lista de bloqueio.

Em seguida, faça uma solicitação POST para a borda `publisher_block_lists` de um nó comercial usando o ID do rascunho da etapa anterior:

```
curl \ POST
-F "block_list_id=<EXISTING_BLOCK_LIST_ID>" \
-F "draft_id=<BLOCK_LIST_DRAFT_ID>" \
-F "name=<BLOCK_LIST_NAME>" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/publisher_block_lists
```

A resposta será uma identificação de lista de bloqueio de publishers recém-criada ou atualizada:

```
{"id":<BLOCK_LIST_ID>}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

name

string

S

Nome da lista de bloqueio.

draft\_id

fbid

S

ID do rascunho de lista de bloqueio.

block\_list\_id

fbid

N

ID da lista de bloqueio a ser atualizada.

[](#)

## Consultar lista de bloqueio

Faça uma solicitação GET para a borda `publisher_block_lists`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>?fields=id,name,last_update_user,last_update_time,business_owner_id,owner_ad_account_id,items_count,web_publishers,app_publishers&access_token=<ACCESS_TOKEN>"
```

A resposta será composta pelas informações solicitadas da lista de bloqueio:

```
{
  "id": "<BLOCK_LIST_ID>",
  "name": "new-bl",
  "last_update_user": "<USER_ID>",
  "last_update_time": "2023-05-24T04:36:05+0000",
  "business_owner_id": "<BUSINESS_ID>",
  "items_count": 9963,
  "web_publishers": [
    {
      "domain_url": "rare.us",
      "publisher_name": "rare.us",
      "id": "<PUBLISHER_ID>"
    },
    {
      "domain_url": "gay.nz",
      "publisher_name": "gay.nz",
      "id": "<PUBLISHER_ID>"
    }
 ]
}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

id

fbid

S

ID da lista de bloqueio.

name

string

S

Nome da lista de bloqueio.

last\_update\_user

fbid

S

ID do usuário que atualizou a lista de bloqueio pela última vez.

last\_update\_time

registro de data e hora

S

Horário da última atualização da lista de bloqueio.

business\_owner\_id

fbid

S

ID do proprietário comercial se a lista de bloqueio for compartilhada com uma empresa.

owner\_ad\_account\_id

fbid

S

ID da conta de anúncio proprietária dessa lista de bloqueio.

items\_count

número inteiro

N

Número de itens na lista de bloqueio.

web\_publishers

lista

N

Lista de domínios da web ou URLs de Página do Facebook bloqueados.

app\_publishers

lista

N

Lista de URLs de App Store bloqueadas.

[](#)

## Excluir uma lista de bloqueio

Antes de poder excluir uma lista de bloqueio, é necessário cancelar o compartilhamento dela com todos os Gerenciadores de Negócios.

Faça uma solicitação DELETE para a borda `publisher_block_lists`:

```
curl -X DELETE \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/?access_token=<ACCESS_TOKEN>"
```

[](#)

## Compartilhar listas de bloqueio com outras empresas

### Compartilhar uma lista de bloqueio

Faça uma solicitação POST para a borda `agencies`:

```
curl \
-F "agency_id=<BUSINESS_ID>" \
-F "permitted_roles=['<ROLE>']" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/agencies/?access_token=<ACCESS_TOKEN>"
```

Opções de função: _APPLY\_BLOCK\_LIST_, _MANAGE\_BLOCK\_LIST_

Com a função _APPLY\_BLOCK\_LIST_, as empresas podem aplicar a lista de bloqueio a tudo a que a empresa tem acesso no momento (campanhas, contas de anúncio e/ou a própria empresa).

A função _MANAGE\_BLOCK\_LIST_ confere a mesma habilidade que a função _APPLY\_BLOCK\_LIST_, além da habilidade de atualizar o conteúdo da lista de bloqueio com um novo rascunho de lista de bloqueio. **\[Isso afetará a lista de bloqueio compartilhada original e quaisquer outras empresas que usam o mesmo ID de lista de bloqueio.\]**

Para alterar a função para _APPLY\_BLOCK\_LIST_ se a lista de bloqueio já tiver sido compartilhada com _MANAGE\_BLOCK\_LIST_, primeiro cancele o compartilhamento da lista de bloqueio e compartilhe novamente com _APPLY\_BLOCK\_LIST_.

### Cancelar o compartilhamento de uma lista de bloqueio

Faça uma solicitação DELETE para a borda `agencies`:

```
curl \
-X DELETE \
-F "agency_id=<BUSINESS_ID>" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/agencies/?access_token=<ACCESS_TOKEN>"
```

### Consultar IDs de empresas com as quais uma lista de bloqueio é compartilhada

Faça uma solicitação GET para a borda `agencies`:

```
curl \
-X GET \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/agencies/?access_token=<ACCESS_TOKEN>"
```

[](#)

## Gerenciamento de funções nas empresas

Depois de compartilhar uma lista de bloqueio com outra empresa, os administradores dessa empresa precisam atribuir às pessoas acesso à lista de bloqueio para aplicá-la e/ou gerenciá-la (o que for aplicável com base na especificação de compartilhamento de lista de bloqueio para empresas acima). Se a outra empresa conferir acesso de administrador para gerenciamento das configurações do Gerenciador de Negócios, as chamadas à API abaixo poderão ser usadas para ajudar nesse processo de gerenciamento de funções no nível do usuário.

Saiba mais sobre o tipo de chamadas à API oferecido por meio da Documentação da [API do Gerenciador de Negócios](https://developers.facebook.com/docs/marketing-api/business-manager-api)

### Atribuir função a um usuário

Faça uma solicitação POST para a borda `assigned_users`:

```
curl \ POST
-F "user=<BUSINESS_SCOPED_USER_ID>" \
-F "permitted_roles=['<ROLE>']" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/assigned_users/?access_token=<ACCESS_TOKEN>"
```

Opções de função (igual ao compartilhamento de lista de bloqueio com empresas): _APPLY\_BLOCK\_LIST_, _MANAGE\_BLOCK\_LIST_

A resposta será a seguinte:

```
{"access_status":"CONFIRMED"}
```

### Remover função atribuída a um usuário

Faça uma solicitação DELETE para a borda `assigned_users`:

```
curl \
-X DELETE \
-F "user=<BUSINESS_SCOPED_USER_ID>" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/assigned_users/?access_token=<ACCESS_TOKEN>"
```

### Consultar a função atribuída a um usuário

Faça uma solicitação GET para a borda `assigned_users`:

```
curl \
-X GET \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/assigned_users/?business_id=<BUSINESS_ID>&access_token=<ACCESS_TOKEN>"
```

[](#)

## Aplicar e remover uma lista de bloqueio diretamente em uma conta de anúncios

Se a outra empresa conceder acesso para _Visualizar desempenho_ a uma das suas contas de anúncio, as chamadas à API abaixo poderão ser usadas para aplicar e remover diretamente uma lista de bloqueio dessa conta de anúncio (sem a necessidade de compartilhamento).

A chamada para aplicar e remover a aplicação contém 3 parâmetros:

-   _account\_id_: identificação da conta de anúncios em que será aplicada/removida a lista de bloqueios.
    
-   _business\_id (opcional)_: o ID da empresa proprietária da lista de bloqueio e que tem acesso à conta de anúncios acima.
    
-   _is\_auto\_blocking\_on_: booliano, verdadeiro/falso.
    

### Aplicar lista de bloqueio à conta de anúncios

Para aplicar uma lista de bloqueio a uma conta de anúncios, especifique _account\_id_ e defina _is\_auto\_blocking\_on_ como verdadeiro:

```
curl -X POST \
-F "account_id=<ACCOUNT_ID>" \
-F "business_id=<BUSINESS_ID>" \
-F "is_auto_blocking_on=*true*" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/auto_applied_ad_accounts"
```

A resposta será o ID da lista de bloqueio usada na chamada:

```
{"id":"<BLOCK_LIST_ID>"}
```

### Remover lista de bloqueio da conta de anúncios

Para remover uma lista de bloqueio de uma conta de anúncios, especifique _account\_id_ e defina _is\_auto\_blocking\_on_ como falso:

```
curl -X POST \
-F "account_id=<ACCOUNT_ID>" \
-F "business_id=<BUSINESS_ID>" \
-F "is_auto_blocking_on=*false*" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/auto_applied_ad_accounts"
```

A resposta será o ID da lista de bloqueio usada na chamada:

```
{"id":"<BLOCK_LIST_ID>"}
```

### Consultar contas de anúncios às quais um ID de lista de bloqueio foi aplicado

Isso apenas retornará as identificações das contas de anúncios que receberam a lista de bloqueio **por meio de Aplicar chamadas à API acima**. Para determinar em quais contas de anúncio uma lista de bloqueio **compartilhada** foi aplicada, veja que tipo de chamadas à API são oferecidas por meio da documentação da [API de Marketing de insights da conta de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights).

Faça uma solicitação GET para a borda `auto_applied_ad_accounts`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<BLOCK_LIST_ID>/auto_applied_ad_accounts/?access_token=<ACCESS_TOKEN>"
```

A resposta padrão será uma lista das identificações das contas de anúncios no formato de matriz JSON:

```
{"data":[{"id":"act_<ACCOUNT_ID>"},{"id":"act_<ACCOUNT_ID>"},...]}
```

Saiba mais sobre os tipos de chamadas à API oferecidos nessa documentação da [API de Marketing de conta de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-account#Reading).

[](#)

## Códigos de erro

Veja também [API de Marketing | Referência do erro](https://developers.facebook.com/docs/marketing-api/error-reference)

Código

Subcódigo

Descrição

100

Parâmetro inválido

2349019

Combinação inválida de parâmetro de plataforma e posição.

2349020

Datas de início e de término obrigatórias.

2349022

Data de início fora do intervalo.

2349023

Data de término fora do intervalo.

2349024

Data de início ou de término fora do intervalo.

2349025

A data de início deve ser anterior à data de término.

200

Erro de permissões.

80011

Ocorreram chamadas em excesso às APIs de Segurança para Marcas. Espere um pouco e tente de novo.

`fbtrace_id`: identificador de suporte interno. Ao relatar um bug relacionado a uma chamada da Graph API, inclua fbtrace\_id para nos ajudar a encontrar os dados de registro para depuração

[](#)

## Limites

Uma lista de bloqueio pode conter no máximo 10 mil URLs exclusivas; se o arquivo carregado tiver mais de 10 mil linhas, será necessário criar várias listas de bloqueio.

Uma empresa pode ter até 200 listas de bloqueio, se esse número for ultrapassado, não será mais possível criar listas de bloqueio.

Se você carregar várias listas de bloqueio com o mesmo nome, a última lista carregada substituirá as anteriores.

[](#)

## Limites

-   In-Stream no Facebook: capaz de bloquear até 401 mil publishers
    
-   Conta comercial | 200 mil publishers
    
-   Conta de anúncios | 200 mil publishers
    
-   Campanha | Mil publishers
    

Audience Network Nativo/Banner/intersticial: capaz de bloquear até 54 mil publishers

-   Conta comercial | 20.750 publishers
    
-   Conta de anúncios | 20.750 publishers
    
-   Campanha | 12.500 publishers
    

Vídeos com incentivo do Audience Network: capaz de bloquear até 26.100 publishers

-   Conta comercial | 11.350 publishers
    
-   Conta de anúncios | 11.350 publishers
    
-   Campanha | 3.400 publishers
    

Facebook Reels: capaz de bloquear até 401 mil publishers

-   Conta comercial | 200 mil publishers
    
-   Conta de anúncios | 200 mil publishers
    
-   Campanha | Mil publishers
    

[](#)

## Documentação adicional útil

[Graph API: visão geral](https://developers.facebook.com/docs/graph-api/overview)

Para uma interface do usuário simples e interativa, experimente o [Explorador da Graph API da Meta](https://developers.facebook.com/tools/explorer/)

[API de Marketing | Boas práticas](https://developers.facebook.com/docs/marketing-api/best-practices)

[API de Marketing | Autorização](https://developers.facebook.com/docs/marketing-api/overview/authorization)

[Registro de alterações de API | Documentação para desenvolvedores](https://developers.facebook.com/docs/graph-api/changelog)

[Usuários do sistema | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/system-users#generate-token)

[Tokens de acesso | Documentação para desenvolvedores](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)

[](#)