---
title: "Direcionamento detalhado - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/detailed-targeting"
scraped_at: "2026-02-01T14:28:21.018Z"
---

# Direcionamento detalhado

Com a [Pesquisa de direcionamento](/docs/marketing-api/targeting-search), você pode encontrar um tipo de direcionamento em uma única chamada de API. Já com a API de Direcionamento Detalhado, você pode pesquisar **vários tipos de direcionamento ao mesmo tempo fazendo apenas uma solicitação**. Você também pode obter sugestões com base na sua consulta.

A API tem quatro pontos de extremidade: [Pesquisa](#search), [Sugestões](#suggestions), [Navegação](#browse) e [Validação](#validation).

A resposta para estes pontos de extremidade contém o seguinte:

Nome

Descrição

`id`

Tipo: string

Identificação do público-alvo.

`name`

Tipo: string

Nome do público-alvo.

`audience_size_lower_bound`

_número inteiro_

O tamanho mínimo estimado do público-alvo.

`audience_size_upper_bound`

_número inteiro_

O tamanho máximo estimado do público-alvo.

`path`

Tipo: matriz de strings

Inclui a categoria e todas as categorias principais que se enquadram no direcionamento.

`description`

Tipo: string

Uma breve descrição sobre o público-alvo.

Se você não fornecer `limit_type`, filtraremos os resultados com menos de 2.000 pessoas em quatro categorias: `work_employers`, `work_positions`, `education_majors`, `education_schools`. Caso contrário, você obterá resultados menos significativos. Quando você usa `limit_type`, filtramos uma dessas quatro categorias e não retornamos tudo.

## Pesquisa

Recupere públicos-alvo para anúncios que correspondam à sua consulta de pesquisa. Você pode fornecer os seguintes parâmetros neste ponto de extremidade:

```
curl -G \
-d "q=harvard" \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/targetingsearch
```

Nome

Descrição

`q`

Tipo: string

**Obrigatório.**

String de consulta.

`limit`

Tipo: número inteiro

**Opcional.**

Número de resultados.

`limit_type`

Tipo: string

**Opcional.**

Limite o tipo de público que será recuperado. Por padrão, incluímos todos os tipos.

Valores válidos:

-   `interests`
    
-   `education_schools`
    
-   `education_majors`
    
-   `work_positions`
    
-   `work_employers`
    
-   `relationship_statuses`
    
-   `college_years`
    
-   `education_statuses`
    
-   `family_statuses`
    
-   `industries`
    
-   `life_events`
    
-   `behaviors`
    
-   `income`
    

`locale`

Tipo: string

**Opcional.**

A localidade para mostrar nomes e descrições do público, se disponível. Por padrão, usamos a localidade da conta de anúncios.

[](#)

## Sugestões

Veja públicos adicionais para fazer o direcionamento com base em alguns públicos específicos fornecidos por você.

```
curl -G \
-d "targeting_list=[{'type':'interests','id':6003263791114}]" \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/targetingsuggestions
```

Forneça estes parâmetros:

Nome

Descrição

`targeting_list`

Tipo: matriz de `{'type':'{TYPE}', 'id':{ID}}`

**Obrigatório.**

Matriz de pares de `{'type':'{TYPE}', 'id':{ID}}` como público de entrada para sugestões.

`limit`

Tipo: número inteiro

**Opcional.**

Número de resultados. O padrão é 30. O máximo é 45.

`limit_type`

Tipo: string

**Opcional.**

Limite o tipo de público que será recuperado. Por padrão, incluímos todos os tipos.

Valores válidos:

-   `interests`
    
-   `education_schools`
    
-   `education_majors`
    
-   `work_positions`
    
-   `work_employers`
    
-   `relationship_statuses`
    
-   `college_years`
    
-   `education_statuses`
    
-   `family_statuses`
    
-   `industries`
    
-   `life_events`
    
-   `behaviors`
    
-   `income`
    

`locale`

Tipo: string

**Opcional.**

A localidade para mostrar nomes e descrições do público. Por padrão, usamos a localidade da conta de anúncios.

[](#)

## Navegação

Obtenha o direcionamento em uma taxonomia estruturada para categorias do Facebook, provedores de dados de terceiros e alguns interesses. Os resultados deste ponto de extremidade aparecem na funcionalidade de navegação no componente da interface do usuário de direcionamento detalhado no Gerenciador de Anúncios.

```
curl -G \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/targetingbrowse
```

Forneça os seguintes parâmetros opcionais:

Nome

Descrição

`limit_type`

Tipo: string

Limite o tipo de público que será recuperado. Por padrão, incluímos todos os tipos.

`locale`

Tipo: string

A localidade para mostrar nomes e descrições do público. Por padrão, usamos a localidade da conta de anúncios.

[](#)

## Validação

Verifique se um público é válido para fazer o direcionamento ou não. Isso será útil se você já tiver criado um conjunto de anúncios e quiser verificar se as especificações de direcionamento ainda são válidas. Caso o direcionamento não seja válido, exclua-o das especificações.

```
curl -G \
-d "targeting_list=[{'type':'interests','id':6003283735711}, {'type':'relationship_statuses','id':100}]" \
-d "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/targetingvalidation
```

Além dos campos de resposta padrão de direcionamento detalhado, este ponto de extremidade também retorna o seguinte:

Nome

Descrição

`valid`

Tipo: booleano

Indica se o público-alvo é válido ou não.

Veja a seguir a lista de parâmetros de entrada:

Nome

Descrição

`targeting_list`

Tipo: matriz de `{'type':'{TYPE}', 'id':{ID}}`

Matriz de pares de `{'type':'{TYPE}', 'id':{ID}}` para validação. Preferencial.

`id_list`

Tipo: matriz de strings

Matriz de identificações para validação. Só terá sucesso se for uma identificação única no nosso banco de dados de público.

`name_list`

Tipo: matriz de strings

Matriz de strings para validação. Apenas interesses (não diferencia maiúsculas de minúsculas).

`locale`

Tipo: string

Localidade para exibição de nomes e descrições do público. Por padrão, usamos a localidade da conta de anúncios.

Forneça pelo menos umas destas opções: `targeting_list`, `id_list` e `name_list`.

[](#)