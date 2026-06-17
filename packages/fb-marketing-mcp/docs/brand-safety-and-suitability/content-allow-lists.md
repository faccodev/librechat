---
title: "API de Listas de Permissão de Conteúdo - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/content-allow-lists"
scraped_at: "2026-02-01T14:02:11.291Z"
---

# API de Listas de Permissão de Conteúdo

As listas de permissão de conteúdo permitem que os anunciantes trabalhem com Parceiros de Negócios da Meta de confiança ​para analisar e personalizar listas de vídeos com adequação para marcas em campanhas in-stream veiculadas no Facebook. Por exemplo, um fabricante de produtos para crianças talvez queira anunciar apenas conteúdo adequado para esse público.

**Observação:** as listas de permissão de conteúdo eram anteriormente conhecidas como conjuntos de conteúdo dinâmico (DCS, pelas iniciais em inglês) e ainda podem aparecer no código como dynamic\_content\_sets e assim por diante.

Confira outras documentações que você pode analisar e/ou compartilhar com anunciantes:

-   [Sobre as listas de publishers parceiros | Central de Ajuda da Meta para Empresas](https://www.facebook.com/business/help/1382467665184382)
    

## Permissões

-   O app exige a concessão do recurso `brand_safety_third_party_partners`.
    

## Criar uma lista de permissão de conteúdo

Faça uma solicitação POST para a borda `dynamic_content_sets`:

```
curl -X POST \
 -F "name=hello_world" \
 -F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/create_dynamic_content_set"
```

A resposta padrão será a seguinte:

```
{"id": "<CONTENT_ALLOW_LIST_ID>"}
```

Quando você atingir o limite máximo no nível da empresa ao criar uma nova lista de permissão de conteúdo, esta resposta será exibida:

```
{
 "success": "false",
 "error_message": "You can only create {max_business_dcs_creation_allowed} content allow lists for each business. To create a new list, try deleting some of your existing lists."
}
```

**Parâmetros:**

Parâmetro

Tipo

Obrigatório

Descrição

name

string

S

O nome da lista de permissão de conteúdo a ser criada.

_Este ponto de extremidade requer permissões de administrador da empresa._

[](#)

## Excluir uma lista de permissão de conteúdo

Faça uma solicitação DELETE para a lista de permissão de conteúdo fornecida:

```
curl -X DELETE \-F "access_token=<ACCESS_TOKEN>" \"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>
```

A resposta padrão será a seguinte:

```
{"success": "true"}
```

Ao tentar excluir uma lista de permissão de conteúdo que está em uso (com contas de anúncios aplicadas), você receberá a resposta:

```
{
 "success": "false",
 "error_message": "Cannot delete a content allow list which is in use."
}
```

_Este ponto de extremidade requer permissões de administrador da empresa._

[](#)

## Obter todas as listas de permissão de conteúdo pertencentes a uma conta do Gerenciador de Negócios

Faça uma solicitação GET para a borda `dynamic_content_sets`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/dynamic_content_sets?access_token=<ACCESS_TOKEN>"
```

A resposta padrão será a seguinte:

```
{
  "data": [
    {
      "id": "<CONTENT_ALLOW_LIST_ID>",
      "name": "CAL example 1",
      "business_id": "<BUSINESS_ID>"
    },
    {
      "id": "<CONTENT_ALLOW_LIST_ID>",
      "name": "CAL example 2",
      "business_id": "<BUSINESS_ID>"
    }
  ]
}
```

**Campos**

Campo

Tipo

Padrão (S/N)

Descrição

id

fbid

S

A identificação de cada lista de permissão de conteúdo.

name

string

S

O nome de cada lista de permissão de conteúdo.

business\_id

fbid

S

A conta do Gerenciador de Negócios que possui a lista de permissão de conteúdo.

[](#)

## Obter metadados para uma lista de permissão de conteúdo específica

Faça uma solicitação GET para a borda `CONTENT_ALLOW_LIST_ID`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>?fields=id,name,business_id&access_token=<ACCESS_TOKEN>"
```

A resposta padrão será a seguinte:

```
{"id":"<CONTENT_ALLOW_LIST_ID>","name":"<CONTENT_ALLOW_LIST_NAME>","business_id":"<BUSINESS_ID>"}
```

**Campos**

Campo

Tipo

Padrão (S/N)

Descrição

id

fbid

S

A identificação de cada lista de permissão de conteúdo.

name

string

S

O nome de cada lista de permissão de conteúdo.

business\_id

fbid

S

A conta do Gerenciador de Negócios que possui a lista de permissão de conteúdo.

[](#)

## Obter video\_ids para uma lista de permissão de conteúdo específica

Faça uma solicitação GET para a borda `CONTENT_ALLOW_LIST_ID/video_ids`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/video_ids?summary=total_count&limit=<9000>&access_token=<ACCESS_TOKEN>"
```

A resposta será uma lista de IDs de vídeo no formato de matriz JSON e um objeto de resumo com o total\_count dos vídeos na lista de permissão de conteúdo quando o parâmetro `summary=total_count` estiver anexado à solicitação:

```
{
 "data": [
   {
     "video_id": "111"
   },
   {
     "video_id": "222"
   },
   {
     "video_id": "333"
   },
   ...
 ],
 "summary": {
   "total_count": 1000
 }
}
```

**Limites de página**

Os seguintes limites de página se aplicam a todas as APIs paginadas para este produto:

Número padrão de itens por página: 25.

Número máximo de itens por página: 9.000.

Observação: é recomendável usar até 9.000 para evitar que os limites sejam atingidos.

**Campos:**

Campo

Tipo

Padrão (S/N)

Descrição

video\_id

fbid

S

A identificação do vídeo.

**Resumo:**

Parâmetro

Tipo

Padrão (S/N)

Descrição

total\_count

número inteiro

N

O número total de vídeos na lista de permissão de conteúdo.

## Atualizar o nome da lista de permissão de conteúdo

Faça uma solicitação POST para a borda `CONTENT_ALLOW_LIST_ID`:

```
curl -X POST \
-F "name=hello_world" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>"
```

A resposta será a seguinte:

```
{"success":true}
```

## Encontrar vídeos para adicionar a uma lista de permissão de conteúdo

1.  Solicite a [permissão Acesso ao Conteúdo Público da Página](https://developers.facebook.com/docs/apps/review/feature#reference-PAGES_ACCESS) para seu app (em Análise do app → Permissões e recursos).
2.  Baixe a lista mais recente de publishers de vídeo in-stream (faça uma chamada GET para a borda `brand_safety_publisher_list`). O elemento _page\_id_ pode ser obtido no campo "url".
3.  Faça uma chamada GET para a borda `PAGE_ID/videos`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<PAGE_ID>/videos?fields=ad_breaks_enabled,published,id&access_token=<ACCESS_TOKEN>"
```

**Campos**

Consulte a [documentação da API de Vídeo](https://developers.facebook.com/docs/graph-api/reference/video/#Reading) para ver uma lista com os campos compatíveis.

Esta borda também é compatível com a [paginação baseada em tempo](https://developers.facebook.com/docs/graph-api/using-graph-api/#paging). Por exemplo:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<PAGE_ID>/videos?fields=ad_breaks_enabled,published,id&since=<UNIX_TIMESTAMP>&access_token=<ACCESS_TOKEN>"
```

Observação: "since" é baseado no horário de criação do vídeo e não leva em consideração atualizações.

Para campos de vídeo padrão, consulte a [documentação da API de Marketing sobre leitura de vídeo](https://developers.facebook.com/docs/graph-api/reference/video/#Reading).

A resposta padrão será uma lista de vídeos no formato de matriz JSON:

```
{
 "data": [
   {
     "ad_breaks_enabled": true,
     "published": true,
     "id": "<VIDEO_ID>"
   },
   {
     "ad_breaks_enabled": false,
     "published": true,
     "id": "<VIDEO_ID>"
   }
 ]
}
```

Observe que apenas vídeos publicados com ad\_breaks\_enabled definido como "true" poderão ser adicionados a uma lista de permissão de conteúdo.

[](#)

## Adicionar vídeos a uma lista de permissão de conteúdo

Faça uma solicitação POST para a borda `add_videos`:

```
curl -X POST \
-F "video_ids=[video_id, video_id, ...]" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/add_videos"
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

video\_ids

list(fbid)

S

Lista de IDs de vídeo (máx. 1.000 por chamada; máx. 2.000.000 por lista de permissão de conteúdo)

A resposta será a seguinte:

```
{"success":true}
```

Caso ocorra um erro ao adicionar os vídeos, você receberá esta resposta:

```
{"error": {
"message": "Some videos failed to add into content allow list",
"type": "OAuthException",
"code": 61000,
"error_data": {
  "failed_video_ids": [
  1234
  ],
  "processed_videos": 1
},
"error_subcode": 2349007,
"is_transient": false,
"error_user_title": "CAL Add Video Failed",
"error_user_msg": "Failed to add videos into Content Allow List.",
  }
}
```

[](#)

## Remover vídeos de uma lista de permissão de conteúdo

Faça uma solicitação DELETE para a borda `videos`:

```
curl -X DELETE \
-F "video_ids=[video_id, video_id, ...]" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/videos"
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

video\_ids

list(fbid)

S

Lista de IDs de vídeo (máx. 1.000 por chamada; máx. 2.000.000 por lista de permissão de conteúdo)

A resposta será a seguinte:

```
{"success":true}
```

Caso ocorra um erro ao excluir os vídeos, você receberá a seguinte resposta:

```
{
  "error": {
    "message": "Some videos failed to remove from content allow list",
    "type": "OAuthException",
    "code": 61002,
    "error_data": {
      "failed_video_ids": [
        123
      ]
    },
    "error_subcode": 2349006,
    "is_transient": false,
    "error_user_title": "CAL Remove Video Failed",
    "error_user_msg": "Failed to remove videos from Content Allow List.",
  }
}
```

[](#)

## Verificar se o vídeo está na lista de permissão de conteúdo

Faça uma solicitação GET para a borda `contains`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>?fields=contains.video_id(<VIDEO_ID>)&access_token=<ACCESS_TOKEN>"
```

A resposta será a seguinte:

```
{"contains": true, "id": "<Content Allow List_ID">}
```

[](#)

## Aplicar uma lista de permissão de conteúdo à conta de anúncios

Faça uma solicitação POST para a borda `apply_to_ad_accounts`:

```
curl -X POST \
-F "ad_account_id=<ACCOUNT_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/apply_to_ad_accounts"
```

A resposta será a seguinte:

```
{"success": true}
```

[](#)

## Remover uma lista de permissão de conteúdo da conta de anúncios

Faça uma solicitação DELETE para a borda `unapply_to_ad_accounts`:

```
curl -X DELETE \
-F "ad_account_id=<ACCOUNT_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/unapply_to_ad_accounts"
```

A resposta será a seguinte:

```
{"success": true}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

ad\_account\_id

fbid

S

A identificação da conta de anúncios.

[](#)

## Obter todas as contas de anúncios às quais uma lista de permissão de conteúdo foi aplicada

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/applied_ad_accounts?access_token=<ACCESS_TOKEN>"
```

A resposta padrão será uma lista das identificações de contas de anúncios no formato de matriz JSON:

```
{
  "data": [
    {
      "id": "act_<ACCOUNT_ID>"
    },
    {
      "id": "act_<ACCOUNT_ID>"
    },
    ...
  ]
}
```

**Campos**

Consulte a [documentação da API de Contas de Anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-account#Reading) para ver uma lista de campos compatíveis.

[](#)

## Compartilhar uma lista de permissão de conteúdo na conta do Gerenciador de Negócios

Faça uma solicitação POST para a borda `agencies`:

```
curl -X POST \
-F "agency_id=<BUSINESS_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/agencies"
```

A resposta será a seguinte:

```
{"success":true}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

business\_id

fbid

S

A identificação da conta do Gerenciador de Negócios.

[](#)

## Cancelar o compartilhamento da lista de permissão de conteúdo na conta do Gerenciador de Negócios

Faça uma solicitação DELETE para a borda `agencies`:

```
curl -X DELETE \
-F "agency_id=<BUSINESS_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/agencies"
```

A resposta será a seguinte:

```
{"success":true}
```

Parâmetros:

Parâmetro

Tipo

Obrigatório

Descrição

business\_id

fbid

S

A identificação da conta do Gerenciador de Negócios.

[](#)

## Obter todas as contas do Gerenciador de Negócios com as quais uma lista de permissão de conteúdo foi compartilhada

Faça uma solicitação GET para a borda `agencies`:

```
curl -X GET \
"https://graph.facebook.com/<API_VERSION>/<CONTENT_ALLOW_LIST_ID>/agencies?access_token=<ACCESS_TOKEN>"
```

A resposta será a seguinte:

```
{
  "data": [
    {
      "id": "<BUSINESS_ID>",
      "name": "business name 1"
    },
    {
      "id": "<BUSINESS_ID>",
      "name": "business name 2"
    },
    ...
  ]
}
```

[](#)

## Códigos de erro

Veja também [API de Marketing | Referência do erro](https://developers.facebook.com/docs/marketing-api/error-reference)

Código

Subcódigo

Descrição

2349013

Não é possível excluir uma lista de permissão de conteúdo que tenha sido aplicada a uma conta de anúncios.

2349055

Só é permitido criar {max\_business\_dcs\_creation\_allowed} listas de permissão de conteúdo para cada empresa. Para criar uma nova lista, tente excluir listas existentes.

2349006

Ocorreu uma falha ao remover vídeos da lista de permissão de conteúdo.

2349007

Ocorreu uma falha ao adicionar vídeos à lista de permissão de conteúdo.

200

Erro de permissões.

80011

Ocorreram chamadas em excesso às APIs de Segurança para Marcas. Espere um pouco e tente de novo.

`fbtrace_id`: identificador de suporte interno. Ao relatar um bug relacionado a uma chamada da Graph API, inclua fbtrace\_id para nos ajudar a encontrar os dados de registro para depuração

[](#)

## Limites

Uma lista de permissão de conteúdo não pode conter mais de 2.000.000 de IDs de vídeo únicos. No caso improvável de ser necessário incluir mais de 2.000.000 de vídeos ativos, será preciso criar várias listas.

Uma empresa pode criar até 2.500 listas de permissão de conteúdo.

[](#)

## Perguntas frequentes

P. Há alguma indicação que você pode extrair para determinar se os metadados de um vídeo (título/descrição) foram alterados?

R. Não há campos para indicar que um vídeo foi alterado. No entanto, você pode baixar os campos de vídeo regularmente e executar um script para ver se há alguma diferença no nome, na descrição e assim por diante.

P. Será possível remover IDs de vídeo de uma lista de permissão de conteúdo quando eles forem excluídos do Facebook?

R. Essa é uma funcionalidade esperada. Por padrão, se um vídeo for excluído, ele também será removido automaticamente da lista. Depois que um vídeo é excluído, ele é removido da lista de permissão de conteúdo quase em tempo real.

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