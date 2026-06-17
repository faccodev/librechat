---
title: "Gerenciar o status do seu objeto de anúncio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/best-practices/storing_adobjects"
scraped_at: "2026-02-01T14:01:38.674Z"
---

# Gerenciar o status do seu objeto de anúncio

A campanha de anúncios, o conjunto de anúncios e os anúncios se enquadram em um dos seguintes tipos de status:

-   Live
    
-   Arquivado
    
-   Excluído
    

Para mais informações, consulte o artigo [Excluído X Arquivado no Blog do desenvolvedor de anúncios](/ads/blog/post/2014/09/24/deleted-vs-archived/).

## Live

Os objetos de anúncios publicados contêm os seguintes status:

-   `ACTIVE`
    
-   `PAUSED`
    
-   `PENDING_REVIEW`
    
-   `CREDIT_CARD_NEEDED`
    
-   `PREAPPROVED`
    
-   `DISABLED`
    
-   `PENDING_PROCESS`
    
-   `WITH_ISSUES`
    

[](#)

## Arquivado

Defina o objeto do anúncio como `ARCHIVED` ao configurar o campo `status` como `ARCHIVED`. Quando um status de objeto for definido como `ARCHIVED`, você poderá continuar a consultar os detalhes e as estatísticas baseadas no ID do objeto. Entretanto, há um máximo de objetos que podem ser arquivados. Então, será necessário respeitar o limite e alterar o status para `DELETED` quando você não precisar mais de um objeto.

Um objeto `ARCHIVED` contém somente dois campos alteráveis: `name` e `status`. Além disso, `status` só pode ser alterado para `DELETED`.

[](#)

## Excluído

Defina o objeto de anúncio como `DELETED`. Isso pode ser feito ao configurar o campo `status` como `DELETED` ou ao enviar um `HTTP DELETE` a esse objeto. Se o status do objeto for definido como `DELETED`, não será possível revertê-lo para `ARCHIVED`.

Se você mantiver o ID do objeto excluído, é possível continuar a recuperar as estatísticas ou os detalhes do objeto consultando o ID do objeto. No entanto, você não pode recuperar os objetos excluídos como um objeto de conexão de um nó ou objeto não excluído. Por exemplo, `<API_VERSION>/<AD_ID>/insights` funciona para um objeto excluído, mas `<API_VERSION>/act_<AD_ACCOUNT_ID>/insights?level=ad` não retorna as estatísticas desse objeto.

Se você excluir um anúncio, ele ainda poderá rastrear impressões, cliques e ações por 28 dias após a data da última veiculação. É possível consultar insights sobre objetos `DELETED` por meio do filtro `ad.effective_status`.

Se você tiver um conjunto com dois anúncios e excluir um deles, as duas consultas a seguir não retornarão os mesmos resultados:

```
v24.0
```

O conjunto de anúncios retorna as estatísticas dos anúncios excluídos e não excluídos. No entanto, ao consultar anúncios no conjunto de anúncios, você visualiza apenas um anúncio:

```
v24.0
```

Para evitar esse cenário, você deve excluir os anúncios 28 dias após a última data de veiculação para garantir que as estatísticas não sofram mais alterações. Além disso, você deve armazenar as estatísticas ou os números de identificação desses objetos no seu próprio sistema antes de excluí-los. Esta recomendação é opcional:

-   Se o app não mostrar os detalhes das estatísticas ou
    
-   Você não se importa se a soma do detalhamento das estatísticas não corresponde ao objeto principal devido a alguns objetos derivados excluídos.
    

Exceto `name`, não é possível alterar os campos de um objeto `DELETED`.

[](#)

## Gerenciar status

Normalmente, o status do objeto é gerenciado desta forma:

-   Você cria objetos de anúncio, eles são publicados e começam a ser veiculados
    
-   Quando você exclui um objeto, nós o excluímos automaticamente
    
-   Quando você atinge o limite para objetos atingidos, não é mais possível arquivar mais objetos.
    
-   Para reduzir o limite, é necessário mover os objetos excluídos que foram arquivados ao estado `deleted`.
    

O status dos objetos de anúncio funciona desta maneira para a respectiva hierarquia:

-   Se o status de uma campanha estiver definido como `with_issues`, `paused`, `archived`, ou `deleted`, todos os objetos abaixo dela herdarão automaticamente esse status.
    
-   Se você definir uma campanha de anúncios como `deleted`, não será possível recuperar os conjuntos ou anúncios contidos nela sem especificar as identificações correspondentes.
    
-   Caso o status de um anúncio esteja definido como `with_issues`, `paused`, `archived` ou `deleted`, o conjunto de anúncios ou a campanha do anúncio em questão manterá o status original e ficará disponível para recuperação.
    

Os seguintes limites se aplicam a objetos `ARCHIVED` de uma determinada conta de anúncios:

-   100.000 para campanhas de anúncios
    
-   100.000 para conjuntos de anúncios
    
-   100.000 para anúncios
    

Se você ler as bordas de `archived`, será necessário filtrar especificamente os objetos arquivados, já que não os retornamos por padrão. Caso leia as estatísticas de um objeto de anúncio, incluiremos as estatísticas correspondentes de todos os objetos subordinados, independentemente de ter o status `active`, `archived` ou `deleted`. Portanto, você não precisa do filtro de insighs sobre objetos derivados.

[](#)

## Comparações de status diferentes

Há diferenças entre os objetos com status `ACTIVE` ou `PAUSED` e aqueles com status `ARCHIVED` ou `DELETED`. Estas são as principais diferenças.

Consulta

Live

Arquivado

Excluído

Existe no banco de dados

Sim

Sim

Sim

Número máximo por conta de anúncio

[Com limites](/docs/reference/ads-api/adaccount#limits)

100.000

Ilimitado

Consulta como bordas sem filtro

Sim

Não

Não

Consulta como bordas com filtro de status

Sim para os objetos de status contidos no filtro

Sim se o filtro de status contiver `ARCHIVED`

Não se o filtro de status não contiver `DELETED` – se contiver, resultará em erro

Consulta pelo próprio número de identificação

Sim

Sim

Sim

Estatísticas agregadas em `/<PARENT_OBJECT_ID>/insights`

Sim

Sim

Sim

Estatísticas incluídas na lista de resultados de `/<PARENT_OBJECT_ID>/insights?level=<OBJECT_LEVEL>`

Sim

Não

Não

As estatísticas incluídas na lista de resultados de `/<PARENT_OBJECT_ID>/insights` com [filtragem de delivery\_info](/docs/marketing-api/insights/#delete_archive)

Sim para os objetos de status contidos no filtro

Sim para os objetos de status contidos no filtro

Não

Insights exibidos com `/<OBJECT_ID>/insights`

Sim

Sim

Sim

O status pode ser alterado para

Qualquer status válido

`DELETED`

Não pode ser alterado

Para definir um anúncio a ser arquivado:

```
v24.0
```

Para excluir um anúncio:

```
v24.0
```

Para recuperar subobjetos de um objeto publicado, por exemplo, todos os anúncios publicados de uma campanha exceto aqueles com status `ARCHIVED` ou `DELETED`:

```
v24.0
```

Para recuperar os subobjetos `ARCHIVED` de um objeto publicado, por exemplo, todos os anúncios `ARCHIVED` de um conjunto, você precisará do filtro de status:

```
v24.0
```

[](#)