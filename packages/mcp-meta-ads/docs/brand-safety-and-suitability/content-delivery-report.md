---
title: "API de Relatórios de Veiculação de Conteúdo - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/content-delivery-report"
scraped_at: "2026-02-01T14:02:15.316Z"
---

# API de Relatórios de Veiculação de Conteúdo

Os relatórios de veiculação fornecem informações de impressões aproximadas no nível do conteúdo. Eles fornecem mais transparência sobre a exibição dos anúncios.

Embora a Meta aplique controles de adequação de marca da forma mais eficaz possível, não podemos garantir que todo o conteúdo estará em conformidade ou alinhado com os padrões exclusivos de adequação para marca dos anunciantes.

Para consultar em qual ou perto de qual conteúdo da Meta os anúncios serão exibidos, baixe os relatórios de veiculação de conteúdo de todos os publishers em um posicionamento ou publishers específicos. A Meta oferece relatórios de IDs que podem ser usados para ver o conteúdo.

Confira outras documentações que você pode analisar e/ou compartilhar com anunciantes. Este documento é selecionado para Parceiros de Negócios da Meta, então pode haver diferenças.

-   [Sobre os relatórios de veiculação | Central de Ajuda da Meta para Empresas](https://business.facebook.com/business/help/1547244292106324?id=1769156093197771)
    
-   [Como analisar relatórios de veiculação | Central de Ajuda para Empresas da Meta](https://business.facebook.com/business/help/602174603449509?id=1769156093197771)
    

## Permissões

-   O app exige a concessão do recurso `brand_safety_third_party_partners`.
    

[](#)

## Consultar relatório de veiculação de conteúdo

### **Consultar o intervalo de datas disponível para o relatório**

Não necessariamente haverá dados sobre a campanha de anúncios para cada hora nos datetime retornados. Os intervalos de datas se baseiam na disponibilidade global.

**Exemplo de solicitação**

```
GET /content_delivery_report_date_ranges
?platform=facebook
&position=instream_video
&fields=earliest_datetime,latest_datetime
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "earliest_datetime": "2025-04-07T00:00",
      "latest_datetime": "2025-04-21T23:00"
    }
  ]
}
```

### **Consultar um relatório de veiculação de conteúdo no nível do conjunto de anúncios**

Esta API exige a permissão de leitura (ou seja, "Ver desempenho") na conta de anúncios.

#### Finalidade

Buscar todas as impressões de anúncios no nível do conteúdo para um conjunto de anúncios por hora. O período de lookback é de 15 dias. Cada resultado conterá uma lista de objetos com metadados do conteúdo. Apenas conteúdo público será retornado.

#### Parâmetros

Campos

Tipo

Obrigatório

Padrão

Descrição

platform

`enum`

Sim

O tipo de plataforma de relatórios de anúncios. Os valores aceitos são: facebook.

position

enumeração

Sim

O tipo de posição na plataforma de relatórios de anúncios. Os valores aceitos são: instream\_video, facebook\_reels\_overlay.

datetime

datetime

Não

Data/hora mais recente disponível

Data e hora do relatório no formato: \[YYYY\]-\[MM\]-\[DD\]T\[HH\]:00.

limit

número inteiro

Não

25

Controla o número de resultados retornados. O intervalo é \[25, 5000\].

#### Campos

O corpo de dados retorna `List<ContentDeliveryReportNode>`. As estruturas e os campos do nó são definidos abaixo.

Campo

Tipo

Padrão

Descrição

content\_id

fbid

Sim

A identificação única do conteúdo (por exemplo, vídeo, app, entre outros).

content\_url

string

Sim

O URL do conteúdo, criado com base na identificação única do conteúdo (por exemplo, vídeo, app, entre outros). **Comece a usar content\_id.**

content\_name

string

Sim

O título do vídeo, app ou site. **Comece a usar content\_id.**

creator\_id

fbid

Sim

A identificação única do criador ou da Página do Facebook.

creator\_url

string

Sim

O URL do criador ou da Página do Facebook. **Comece a usar content\_id.**

creator\_name

string

Sim

O nome do criador ou da Página do Facebook. **Comece a usar content\_id.**

estimated\_impressions\*

número inteiro

Sim

A soma das impressões de anúncios veiculados no conteúdo

\*`Estimated_impressions` está listado como uma "estimativa" do número de impressões, pois nosso backend calcula esse número em tempo quase real. Isso corresponde ao que, em última análise, mostramos no nosso próprio relatório e na nossa cobrança de anúncios.

### **Resumo**

Sempre retornado por padrão. Defina o campo de resumo como `false` (por exemplo, summary=false) para não receber o nó de resumo.

Campo

Tipo

Padrão

Descrição

earliest\_datetime

datetime

Sim

Datetime mais antigo com dados disponíveis sobre a campanha solicitada.

latest\_datetime

datetime

Sim

Datetime mais recente com dados disponíveis sobre a campanha solicitada.

total\_count

número inteiro

Sim

O número total de linhas no relatório.

#### Permissões

Exige acesso de "Ver desempenho" à conta de anúncios.

Acesse um relatório de veiculação de conteúdo no nível do conjunto de anúncios para um posicionamento e um datetime específicos. Substitua `ad_set_id` pela identificação do conjunto de anúncios no relatório. Verifique se `datetime` está no intervalo de datas disponível retornado pela API.

**Exemplo de solicitação – Vídeo in-stream do Facebook**

```
GET /{ad_set_id}/content_delivery_report
?platform=facebook
&position=instream_video
&datetime=2025-04-21T23:00
&fields=content_id,content_url,content_name,creator_id,creator_url,creator_name,estimated_impressions
&summary=true
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "content_id": "<CONTENT_ID>",
      "content_url": "www.facebook.com/<CONTENT_ID>",
      "content_name": "Best video ever!",
      "creator_id": "<CREATOR_ID>",
      "creator_url": "www.facebook.com/<CREATOR_ID>",
      "creator_name": "Best creator ever!",
      "estimated_impressions": 13443
    },
    {
      "content_id": "<CONTENT_ID_2>",
      "content_url": "www.facebook.com/<CONTENT_ID_2>",
      "content_name": "Another good video!",
      "creator_id": "<CREATOR_ID>",
      "creator_url": "www.facebook.com/<CREATOR_ID>",
      "creator_name": "Best creator ever!",
      "estimated_impressions": 13391
    }
    ...
  ],
  ...
  "summary": {
    "total_count": 5168,
    "earliest_datetime": "2025-04-07T00:00",
    "latest_datetime": "2025-04-21T23:00"
  }
}
```

**Exemplo de solicitação – Anúncios no Facebook Reels**

```
GET /{ad_set_id}/content_delivery_report
?platform=facebook
&position=facebook_reels_overlay
&datetime=2025-04-21T23:00
&fields=content_id,content_url,content_name,creator_id,creator_url,creator_name,estimated_impressions
&summary=true
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "content_id": "<CONTENT_ID>",
      "content_url": "www.facebook.com/<CONTENT_ID>",
      "content_name": "Best video ever!",
      "creator_id": "<CREATOR_ID>",
      "creator_url": "www.facebook.com/<CREATOR_ID>",
      "creator_name": "Best creator ever!",
      "estimated_impressions": 13443
    },
    {
      "content_id": "<CONTENT_ID_2>",
      "content_url": "www.facebook.com/<CONTENT_ID_2>",
      "content_name": "Another good video, cross recommended from IG!",
      "creator_id": "<FB_CREATOR_ID>",
      "creator_url": "www.instagram.com/uid/<IG_CREATOR_ID>",
      "creator_name": "Best IG creator ever!",
      "estimated_impressions": 13391
    }
    ...
  ],
  ...
  "summary": {
    "total_count": 5168,
    "earliest_datetime": "2025-04-07T00:00",
    "latest_datetime": "2025-04-21T23:00"
  }
}
```

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

2349048

Data fora do intervalo.

2349049

Cursor inválido.

200

Erro de permissões.

80011

Ocorreram chamadas em excesso às APIs de Segurança para Marcas. Espere um pouco e tente de novo.

`fbtrace_id`: identificador de suporte interno. Ao relatar um bug relacionado a uma chamada da Graph API, inclua fbtrace\_id para nos ajudar a encontrar os dados de registro para depuração

[](#)

## Limites

**[Limites de página](https://developers.facebook.com/docs/graph-api/results)**

Posicionamento

Tamanho padrão da página

Tamanho máximo da página

`instream_video``facebook_reels_overlay`

100

Não configurável.

**[Limites de volume](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)**

Os limites de volume a seguir se aplicam ao nível do produto, ou seja, todos os pontos de extremidade da Lista de publishers coletivamente. O uso relativo de quota por recurso retorna no cabeçalho de resposta `x-business-use-case-usage` de cada solicitação.

-   Contagem máxima de chamadas por hora: 144 mil chamadas.
    

[](#)

## APIs de Página e vídeo do Facebook

### API de Vídeo

**Finalidade**

Consulte metadados e arquivos de origem para download de um vídeo individual no Facebook. O content\_id retornado pela API de Relatórios de Veiculação de Conteúdo pode ser usado aqui.

**Exemplo de solicitação**

```
GET /{video_id}
?fields=permalink_url,source,created_time,updated_time,from,description,picture
```

**Exemplo de resposta**

```
{
  "permalink_url": "/brookselitelandscapes/videos/773275220658768/",
  "source": "https://video-sjc3-1.xx.fbcdn.net/v/t39.25447-2/296672208_3302846743372673_5139359605630684497_n.mp4?_nc_cat=102&vs=16d3a1916d225711&_nc_vs=HBksFQAYJEdORGJyaEdCNF9MdTY3c0xBRkhObS1KVXJGSkhibWRqQUFBRhUAAsgBABUAGCRHTWREcWhGdTM0WUhPNkVBQUo2S25RNlNqWlVwYnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAmlqmRwqfdzQMVAigKc2FuZGNhc3RsZRgLdnRzX3ByZXZpZXccF0BdEQYk3S8bGClkYXNoX2k0bGl0ZWJhc2ljXzVzZWNnb3BfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50BDMxOTERb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA83NzMyNzUyMjA2NTg3NjgSb2VtX3ZpZGVvX2Fzc2V0X2lkEDUyMjg2MjA5NTcxNzU0NDEVb2VtX3ZpZGVvX3Jlc291cmNlX2lkEDEwMTUzNTI3NTI0ODI4OTEcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAxMzc4NTMyODI1OTY4OTUxDnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQ3OTA1AmNkCjIwMjItMDctMjgDcmNiBDMxMDADYXBwE0ZhY2Vib29rIGZvciBpUGhvbmUCY3QZQ09OVEFJTkVEX1BPU1RfQVRUQUNITUVOVBNvcmlnaW5hbF9kdXJhdGlvbl9zBzExNi4zMDkCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=41a7d5&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=czalgyZgc1YAX9VjHuC&_nc_ht=video-sjc3-1.xx&oh=00_AT--2EefgQ54VCSNMmiSpC2I3rLV5IWuHQBWZv63sB-qKw&oe=62F039D4&_nc_rid=401297287969366",
  "created_time": "2022-07-28T23:29:13+0000",
  "updated_time": "2022-08-02T22:34:22+0000",
  "from": {
    "name": "Brooks Elite Landscapes",
    "id": "332104164111679"
  },
  "description": "👋 Welcome to our next job site in Mechanicsville!",
  "picture": "https://scontent-sjc3-1.xx.fbcdn.net/v/t15.5256-10/296266458_3171248163095396_202928376065076133_n.jpg?stp=dst-jpg_s160x160&_nc_cat=101&ccb=1-7&_nc_sid=08861d&_nc_ohc=XcFNSij3VIUAX-WxgHV&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-mZFUSES-e5dX0AKzhKZUuebsrTgilMYBWPSubpe_2SQ&oe=62F03711",
  "id": "773275220658768"
}
```

### API de Página

Esta API exige a permissão [Acesso ao Conteúdo Público da Página](https://developers.facebook.com/docs/features-reference/page-public-content-access) da análise do app.

**Finalidade**

Consulte informações detalhadas sobre uma Página no Facebook.

**Exemplo de solicitação**

```
GET /{page_id}
?fields=name,about,business,category,link
```

**Exemplo de resposta**

```
{
  "name": "Capital T Industries",
  "about": "We own the earth.",
  "business": {
    "id": "981914045859716",
    "name": "Capital T Industries"
  },
  "category": "Computer Company",
  "link": "https://www.facebook.com/1955398231373718",
  "id": "1955398231373718"
}
```

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

## Perguntas frequentes

P: Como consultar a lista de conta de anúncios de uma empresa?

R: [Referência a Graph API: empresa | Contas de anúncios](https://developers.facebook.com/docs/marketing-api/reference/business/ad_accounts/)

P: Como consultar a lista de campanhas de uma conta de anúncios?

R: [Referência a Graph API: conta de anúncios | Campanhas](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/)

P: Como consultar a lista de conjuntos de anúncios de uma campanha?

R: [Referência a Graph API: campanha | Conjuntos de anúncio](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/adsets/)

P. A API de Relatório de Veiculação de Conteúdo (CDR, pelas iniciais em inglês) inclui o campo advertiser\_time\_zone como no CDR adjacente?

A. Não, esperamos que os parceiros escolham a data correta conforme o fuso horário do anunciante. As datas inseridas na API de CDR devem estar no horário do Pacífico.

P. Como vincular dados entre diferentes conjuntos de dados (API de Marketing a impressões de anúncios e informações de campanha a conteúdo)?

R. O conteúdo pode ser conectado por content\_id e/ou content\_owner\_id entre a API do Relatório de Veiculação de Conteúdo sobre Segurança para Marcas e as respectivas APIs de Página e vídeo. Também há [APIs de anúncios](https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/feed-verification#ads-apis) conectadas pelo objeto de anúncio (adaccount\_id, adset\_id, etc.).

P. Cada linha representa um item de conteúdo? É necessário desduplicar dados/linhas?

R. Cada linha apresenta um conteúdo único do Facebook representado por unique content\_id.

P. Quais são os parâmetros necessários da API?

R. Os dois parâmetros necessários são plataforma e posição. O campo de data é opcional e usará os dados mais recentes disponíveis se for omitido.

P. Como um anunciante pode conceder acesso de leitura (ou seja, "Ver desempenho") a uma conta de anúncios?

R. O anunciante pode conceder acesso de LEITURA usando o botão "Atribuir parceiros" nas configurações do negócio.

[](#)