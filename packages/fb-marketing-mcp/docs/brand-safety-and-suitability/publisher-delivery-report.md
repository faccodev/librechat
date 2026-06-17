---
title: "API de Relatórios de Veiculação de Publishers - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/publisher-delivery-report"
scraped_at: "2026-02-01T14:02:25.793Z"
---

# API de Relatórios de Veiculação de Publishers

Os relatórios de veiculação fornecem informações aproximadas de impressões no nível do publisher e do conteúdo. Eles fornecem mais transparência sobre a exibição dos anúncios.

Usamos controles de adequação para marca da maneira mais eficiente possível. No entanto, não podemos garantir que todo o conteúdo e os publishers estejam em conformidade ou alinhados com os padrões exclusivos de adequação para marca dos anunciantes.

Durante ou após uma campanha, os relatórios de veiculação fornecem informações aproximadas de impressão do publisher para Páginas do Facebook (anúncios em vídeo in-stream, sobreposição e anúncios no Reels), contas do Instagram (anúncios no feed do perfil do Instagram) e apps do Audience Network (vídeos com incentivo e anúncios nativos, de banner e intersticiais).

Confira outras documentações que você pode analisar e/ou compartilhar com anunciantes:

-   [Sobre os relatórios de veiculação | Central de Ajuda da Meta para Empresas](https://business.facebook.com/business/help/1547244292106324?id=1769156093197771)
    
-   [Como analisar relatórios de veiculação | Central de Ajuda para Empresas da Meta](https://business.facebook.com/business/help/602174603449509?id=1769156093197771)
    

## Permissões

-   O app exige a concessão do recurso `brand_safety_third_party_partners`.
    

## Perguntas frequentes

P: Como consultar a lista de conta de anúncios de uma empresa?

R: [Referência a Graph API: empresa | Contas de anúncios](https://developers.facebook.com/docs/marketing-api/reference/business/ad_accounts/)

P: Como consultar a lista de campanhas de uma conta de anúncios?

R: [Referência a Graph API: conta de anúncios | Campanhas](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/)

P: Como consultar a lista de conjuntos de anúncios de uma campanha?

R: [Referência a Graph API: campanha | Conjuntos de anúncio](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/adsets/)

[](#)

## Parâmetros

Todas as APIs de Relatórios de Veiculação de Publishers (PDR, pelas iniciais em inglês) dão suporte a um conjunto de parâmetros comuns.

Campos

Tipo

Obrigatório

Padrão

Descrição

platform

enumeração

Sim

O tipo de plataforma de relatórios de anúncios. Os valores aceitos são: audience\_network, facebook e instagram.

position

enumeração

Sim

O tipo de posição na plataforma de relatórios de anúncios. Os valores aceitos são: instream\_video, facebook\_reels\_overlay, an\_classic e rewarded\_video.

sort\_by

enumeração

Classifique o resultado por um campo. Se for omitido, classifique os resultados por impressions\_descending. Inclui exatamente uma opção.

-   impressions\_desc - classificar por impressões (mais a menos)
    
-   impressions\_asc - classificar por impressões (menos a mais)
    
-   url\_desc - classificar por url em ordem alfabética (A-Z), ignorando maiúsculas e minúsculas
    
-   url\_asc - classificar por url em ordem alfabética (Z-A), ignorando maiúsculas e minúsculas
    
-   name\_desc - classificar por nome em ordem alfabética (A-Z)
    
-   name\_asc - classificar por nome em ordem alfabética (Z-A)
    

Observação: este parâmetro é somente compatível com os posicionamentos `an_classic` e `rewarded_video`.

name\_contains

string

Filtre os resultados que contêm a substring especificada no campo de nome do publisher.

-   inclui exatamente uma opção
    
-   deve ser uma string
    
-   NÃO diferencia maiúsculas de minúsculas
    

publisher\_status

enumeração

all

O status do publisher. Este parâmetro só se aplica ao posicionamento instream\_video. Os valores aceitos são: all, partner, non\_partner. Se for omitido, o valor all será definido como padrão.

start\_date

datetime

Data mais próxima possível

A data de início do relatório de veiculação no formato: AAAA-MM-DD. Se start\_date e end\_date forem omitidos, o valor padrão será usado. Valor padrão = hoje - 29 dias.

end\_date

datetime

Data mais distante possível

A data de término do relatório de veiculação no formato: AAAA-MM-DD. Se start\_date e end\_date forem omitidos, o valor padrão será usado. Valor padrão = data mais recente disponível.

platform

enumeração

Sim

Filtre os resultados que contêm a substring especificada no campo de nome do publisher.

-   inclui exatamente uma opção
    
-   deve ser uma string
    
-   NÃO diferencia maiúsculas de minúsculas
    

### Campos

Todas as APIs de Relatórios de Veiculação de Publisher (PDR) dão suporte a um conjunto de campos comuns.

Campo

Tipo

Padrão

Descrição

url

string

Sim

O URL do publisher onde o anúncio foi exibido.

name

string

Sim

O nome personalizado do publisher onde o anúncio foi exibido.

estimated\_impressions\*

número inteiro

Sim

O número estimado de usuários que interagiram/visualizaram este anúncio.

content\_types

list(enum)

Sim

A lista de tipos de conteúdo. Este campo só se aplica ao posicionamento instream\_video. Os valores possíveis são: vod e live.

status

enumeração

Sim

O status do publisher. Este campo só se aplica ao posicionamento instream\_video. Os valores possíveis são: all, partner, non\_partner.

\*Estimated\_impressions está listado como uma "estimativa" do número de impressões, pois nosso backend calcula esse número em tempo quase real. Isso corresponde ao que, em última análise, mostramos no nosso próprio relatório e na nossa cobrança de anúncios.

[](#)

## Resumo

Todas as APIs de Relatórios de Veiculação de Publisher (PDR) dão suporte a um conjunto de campos de resumo comuns.

Inclui apenas true (por exemplo, summary=true) ou várias das outras opções (por exemplo, summary=start\_date,end\_date) true - retorna todos os campos listados abaixo.

Campo

Tipo

Padrão

Descrição

start\_date

datetime

Sim

A data mais antiga de coleta de dados para esse relatório.

end\_date

datetime

Sim

Data mais recente de coleta de dados para esse relatório.

total\_count

número inteiro

Sim

O número total de linhas no relatório.

non\_partner\_count

número inteiro

Sim

A contagem total de não parceiros. Este campo só se aplica ao posicionamento instream\_video e facebook\_reels\_overlay.

[](#)

## Permissão

O app requer permissões ads\_reads.

Todas as chamadas à API devem ser feitas com um token de acesso associado e um usuário com nível de acesso de administrador da sua conta do Gerenciador de Negócios.

[](#)

## Consultar relatório de veiculação de publisher

### Consulte intervalo de datas disponível para o relatório.

**Exemplo de solicitação**

```
GET /publisher_delivery_report_date_ranges
?platform=facebook
&position=instream_video
&fields=start_date,end_date
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "start_date": "2022-10-01",
      "end_date": "2022-10-28"
    },
    {
      "start_date": "2022-09-28",
      "end_date": "2022-09-30"
    },
  ]
}
```

**Observação:** para posicionamentos instream\_video e facebook\_reels\_overlay, pode haver no máximo dois intervalos de datas disponíveis não sobrepostos. Os intervalos de datas são classificados na ordem cronológica inversa.

### Consultar um relatório de veiculação de publisher no nível do conjunto de anúncios

**Permissões**

Exige o acesso de "Visualização de desempenho" à conta de anúncios que contém o conjunto de anúncios.

Consulte um relatório de veiculação de publisher no nível do conjunto de anúncios para um posicionamento e um intervalo de datas específicos. Substitua `ad_set_id` pela identificação do conjunto de anúncios no relatório. E certifique-se de que `start_date` e `end_date` estejam dentro do intervalo disponível indicado acima:

**Exemplo de solicitação**

```
GET /{ad_set_id}/publisher_delivery_report
?platform=facebook
&position=instream_video
&start_date=2022-07-31
&end_date=2022-08-31
&fields=url,name,status,content_types,estimated_impressions
&summary=true
```

**Exemplo de resposta**

```
{
  "data": [
    {
      "url": "www.facebook.com/example1",
      "name": "Acme",
      "status": "partner",
      "content_types": [
        "vod"
      ],
      "estimated_impressions": 4823
    },
    {
      "url": "www.facebook.com/example2",
      "name": "Widgets",
      "status": "partner",
      "content_types": [
        "vod"
      ],
      "estimated_impressions": 4241
    }
    ...
  ],
  ...
  "summary": {
    "total_count": 5168,
    "non_partner_count": 124,
    "start_date": "2022-07-31",
    "end_date": "2022-08-31"
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

**[Limites de página](https://developers.facebook.com/docs/graph-api/results)**

Posicionamento

Tamanho padrão da página

Tamanho máximo da página

`an_classic`

`rewarded_video`

25

5000

`instream_video`

`facebook_reels_overlay`

100

Não configurável.

**[Limites de volume](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)**

Os limites de volume a seguir se aplicam ao nível do produto, ou seja, todos os pontos de extremidade da Lista de publishers coletivamente. O uso relativo de quota por recurso retorna no cabeçalho de resposta `x-business-use-case-usage` de cada solicitação.

-   Contagem máxima de chamadas por hora: 144 mil chamadas.
    

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