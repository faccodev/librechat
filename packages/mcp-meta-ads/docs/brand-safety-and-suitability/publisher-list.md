---
title: "API de Listas de Publishers Parceiros - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/publisher-list"
scraped_at: "2026-02-01T14:02:38.317Z"
---

# API de Listas de Publishers Parceiros

As listas de publishers parceiros mostram os publishers que se cadastraram para monetização e que seguem nossas Políticas de Monetização para Parceiros. Elas estão disponíveis para cada um destes tipos de posicionamento: vídeos in-stream do Facebook, Audience Network e Anúncios no Facebook Reels.

Confira a documentação adicional para você consultar e/ou compartilhar com anunciantes na Central de Ajuda para Empresas da Meta:

-   [Sobre as listas de publishers parceiros](https://business.facebook.com/business/help/1382467665184382?id=1769156093197771)
    
-   [Como analisar listas de publishers parceiros](https://business.facebook.com/business/help/449365955591474?id=1769156093197771)
    

## Permissões

-   O app exige a concessão do recurso `brand_safety_third_party_partners`.
    

## Obtenha uma lista de publishers parceiros para um posicionamento específico.

### Parâmetros

Campo

Tipo

Obrigatório?

Padrão

Descrição

plataforma

enumeração

Sim

N/D

O tipo de plataforma de relatórios de anúncios. Valores aceitos: `audience_network` e `facebook`.

position

enumeração

Sim

N/D

O tipo de posição na plataforma de relatórios de anúncios. Valores aceitos: `instream_video` e `facebook_reels_overlay`. **OBSERVAÇÃO:** a partir de 2 de setembro de 2025, não haverá diferença se você usar `instream_video` ou `facebook_reels_overlay`. Isso aconteceu porque os programas individuais de monetização foram substituídos por um programa unificado para essas duas posições.

sort\_by

enumeração

Não

N/D

Classifique o resultado por um campo. Se omitido, classifique os resultados por `page_followers_asc` para um posicionamento que não seja `audience_network` e em qualquer ordem para o posicionamento `audience_network`.

search\_query

enumeração

Não

N/D

Filtre os resultados que contêm a consulta de pesquisa. O filtro será implementado para URL, nome de usuário e content\_creator (se aplicável).

start\_date

datetime

Não

Data mais próxima possível

Filtre os resultados que são adicionados à lista de publishers parceiros após a data de início fornecida. As datas devem ser representadas no formato AAAA-MM-DD. Se `start_date` e `end_date` forem omitidos, consulte todas as datas disponíveis.

end\_date

datetime

Não

Data mais distante possível

Filtre os resultados que são adicionados à lista de publishers parceiros antes da data de término fornecida. As datas devem ser representadas no formato AAAA-MM-DD. Se `start_date` e `end_date` forem omitidos, consulte todas as datas disponíveis.

blue\_verified

enumeração

Não

todos

Filtre os resultados que não sejam audience\_network por verificação. Os valores aceitos são "yes", "no" e "all". Se for omitido, o valor "all" será definido por padrão.

follower\_count

enumeração

Não

todos

Filtre os resultados que não sejam audience\_network por número de seguidores. Valores aceitos: less\_than\_10K, between\_10K\_and\_100K, between\_100K\_and\_1M, between\_1M\_and\_10M, greater\_than\_10M e all. Se for omitido, o valor "all" será definido por padrão.

app\_store\_category\_contains

string

Não

N/D

Filtre os resultados `audience_network` quando `app_store_category` contiver a string de consulta.

include\_summary

booliano

Não

verdadeiro

Inclua todos os campos de resumo na resposta.

### Campos

Confira as combinações válidas de plataforma e posição:

-   platform=audience\_network
    
-   platform=facebook&position=instream\_video
    
-   platform=facebook&position=facebook\_reels\_overlay
    

Campo

Tipo

Plataforma

Padrão

Descrição

ads\_in\_live\_videos

booliano

facebook instream

N/D

Lista se a Página é um parceiro selecionado e aprovado que teve um stream ao vivo nos últimos 90 dias.

age\_rating

número inteiro

audience\_network

N/D

Lista se o app é recomendado para pessoas de uma determinada idade, de acordo com a App Store ou o Google Play. Os valores especiais são: 0 = Sem classificação, 1 = Todos.

app\_store\_category

string

audience\_network

N/D

Lista o tipo de app, de acordo com a App Store ou o Google Play.

blue\_verified\_page

booliano

facebook, instagram

N/D

Lista se a Página ou conta tem um selo de verificada. O selo de verificada ao lado de uma Página do Facebook ou conta do Instagram significa que a Meta confirmou que se trata da presença autêntica da figura pública, celebridade ou marca internacional representada.

content\_creator

string

TODOS

N/D

Lista o nome do criador de conteúdo. No Facebook, isso significa o nome da Página. No Instagram, é o nome da conta. No Audience Network, é o nome exibido na App Store ou no Google Play.

date\_added

string

TODOS

N/D

Lista a data em que o publisher foi adicionado à lista de parceiros.

is\_audience\_network\_classic

booliano

audience\_network

N/D

Lista se o publisher é um "audience network" clássico.

is\_audience\_network\_rewarded

booliano

audience\_network

N/D

Lista se o publisher publicou algum anúncio com este formato de exibição recentemente.

idioma

string

TODOS

N/D

Lista o idioma detectado na Página.

median\_views\_per\_video\_in\_last\_28\_days

número inteiro

facebook instream, facebook reels

N/D

Lista a média de visualizações registradas em vídeos carregados nos últimos 28 dias.

page\_followers

número inteiro

facebook

N/D

Lista o número de seguidores da Página.

url

string

TODOS

N/D

Lista o URL da Página.

nome de usuário

string

facebook, instagram

N/D

Lista o nome de usuário da Página (Padrão)

videos\_uploaded\_last\_week

número inteiro

facebook instream, facebook reels

N/D

Lista o número de vídeos que a Página carregou nos últimos 7 dias após a geração do relatório. Esse número inclui vídeos que podem não estar disponíveis publicamente.

### Resumo

Campo

Tipo

Padrão?

Descrição

publisher\_list\_earliest\_date

datetime

Sim

Data mais antiga adicionada para um publisher na lista.

publisher\_list\_latest\_date

datetime

Sim

Data mais recente adicionada para um publisher na lista.

total\_count

número inteiro

Sim

Total de publishers.

**Exemplo de solicitação**

Obtenha a lista de publishers parceiros para o posicionamento de vídeos in-stream do Facebook com todos os campos relevantes:

```
GET /brand_safety_publisher_list?platform=facebook&position=instream_video&fields=ads_in_live_videos,blue_verified_page,content_creator,date_added,language,median_views_per_video_in_last_28_days,page_followers,url,username,videos_uploaded_last_week
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "ads_in_live_videos": false,
      "blue_verified_page": true,
      "content_creator": "Mr Bean",
      "date_added": "2023-03-09",
      "language": "English",
      "median_views_per_video_in_last_28_days": 269139,
      "page_followers": 137011404,
      "url": "https://www.facebook.com/example1",
      "username": "MrBean",
      "videos_uploaded_last_week": 2
    },
    {
      "ads_in_live_videos": false,
      "blue_verified_page": true,
      "content_creator": "Real Madrid C.F.",
      "date_added": "2023-03-09",
      "language": "Spanish",
      "median_views_per_video_in_last_28_days": 187426,
      "page_followers": 117787531,
      "url": "https://www.facebook.com/example2",
      "username": "RealMadrid",
      "videos_uploaded_last_week": 27
    },
    ...
  ],
  ...
  "summary": {
    "publisher_list_latest_date": "2022-10-02",
    "publisher_list_earliest_date": "2017-10-07",
    "total_count": 201681
  }
}
```

### Códigos de erro

Código

Subcódigo

Descrição

100

Parâmetro inválido. O parâmetro de consulta foi definido, mas o valor não é aceito.

2349019

Combinação inválida de parâmetros de plataforma e posição.

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

**fbtrace\_id:** identificador de suporte interno. Ao relatar um bug relacionado a uma chamada da Graph API, inclua o fbtrace\_id, que nos ajudará a encontrar dados de registro para depuração.

[](#)

## Obtenha metadados adicionais da lista de publishers parceiros para todos os posicionamentos disponíveis.

Campo

Tipo

Padrão?

Descrição

audience\_network\_latest\_date

string

Sim

Data mais recente para audience\_network.

audience\_network\_total\_publishers

número inteiro

Sim

Total de publishers para audience\_network.

facebook\_instream\_video\_latest\_date

string

Sim

Data mais recente para facebook\_instream\_video.

facebook\_instream\_video\_total\_publishers

número inteiro

Sim

Total de publishers para facebook\_instream\_video.

facebook\_reels\_overlay\_latest\_date

string

Sim

Data mais recente para facebook\_reels\_overlay.

facebook\_reels\_overlay\_total\_publishers

número inteiro

Sim

Total de publishers para facebook\_reels\_overlay.

Obtenha os metadados da lista de publishers parceiros para todos os posicionamentos disponíveis:

**Exemplo de solicitação**

```
GET /brand_safety_publisher_list_metadata
?fields=audience_network_latest_date,audience_network_total_publishers,facebook_instream_video_latest_date,facebook_instream_video_total_publishers,facebook_reels_overlay_latest_date,facebook_reels_overlay_total_publishers
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "facebook_instream_video_total_publishers": 201681,
      "facebook_instream_video_latest_date": "2022-10-02",
      "facebook_reels_overlay_total_publishers": 223318,
      "facebook_reels_overlay_latest_date": "2022-10-01",
      "audience_network_total_publishers": 98621,
      "audience_network_latest_date": "2022-10-03"
    }
  ]
}
```

### Códigos de erro

Código

Subcódigo

Descrição

100

Parâmetro inválido.

200

Erro de permissões

80011

Ocorreram chamadas em excesso às APIs de Segurança para Marcas. Espere um pouco e tente de novo.

[](#)

### Limites

#### [Resultados paginados](https://developers.facebook.com/docs/graph-api/results)

Os seguintes limites de página se aplicam a todas as APIs paginadas para este produto:

-   Número padrão de itens por página: 25.
    
-   Número máximo de itens por página: 5.000.
    

#### [Limites de volume](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)

Os limites de volume a seguir se aplicam ao nível do produto, ou seja, todos os pontos de extremidade da lista de publishers parceiros coletivamente. O uso relativo de quota por recurso é retornado no cabeçalho de resposta `x-business-use-case-usage` de cada solicitação.

-   Contagem máxima de chamadas por hora: 2,4 mil chamadas.
    

[](#)

## Saiba mais

-   [Visão geral da Graph API do Facebook da Meta](https://developers.facebook.com/docs/graph-api/overview)
    
-   Para uma interface do usuário simples e interativa, experimente o [Explorador da Graph API da Meta](https://developers.facebook.com/tools/explorer/)
    
-   [API de Marketing | Boas práticas](https://developers.facebook.com/docs/marketing-api/best-practices)
    
-   [API de Marketing | Códigos de erro](https://developers.facebook.com/docs/marketing-api/error-reference)
    
-   [API de Marketing | Autorização](https://developers.facebook.com/docs/marketing-api/overview/authorization)
    
-   [Limites de volume](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)
    
-   [Registro de alterações de API | Documentação para desenvolvedores](https://developers.facebook.com/docs/graph-api/changelog)
    
-   [Usuários do sistema | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/system-users#generate-token)
    
-   [Tokens de acesso | Documentação para desenvolvedores](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)
    

[](#)