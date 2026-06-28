---
title: "Criativo dinâmico - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/asset-feed"
scraped_at: "2026-02-01T14:29:57.740Z"
---

# Criativo dinâmico

O processo de criativo dinâmico permite que você veicule automaticamente diferentes combinações do criativo de um anúncio aos seus usuários. Dessa forma, fica mais fácil encontrar a melhor opção de criativo por impressão e aprender com o desempenho da exibição do ativo a diferentes públicos.

Essa solução também melhora sua capacidade de explorar uma variedade de combinações de ativos de criativo e públicos para que você possa mostrar as melhores opções de imagens, títulos, descrições e outros ativos aos seus usuários.

Finalidades do processo de criativo dinâmico:

-   Automatizar o fluxo de trabalho usado para testar o criativo
    
-   Usar públicos diferentes para escolher a combinação mais eficaz de ativos de criativo
    

Use esta API para campanhas novas e em andamento, bem como para campanhas que duram mais do que cinco dias. Realize testes A/B com campanhas existentes para encontrar a abordagem que melhor atende às suas necessidades.

## Começar

-   Etapa 1: [criar uma campanha e um conjunto de anúncios](#campaign)
    
-   Etapa 2: [fornecer o criativo do anúncio com a `asset_feed_spec`](#creative)
    
-   Etapa 3: [criar o anúncio](#ad)
    
-   Etapa 4 (opcional): [verificar o status da análise do anúncio](#ad_review)
    
-   Obter [insights](/docs/marketing-api/dynamic-creative/insights) e analisar os resultados
    

[](#)

## Etapa 1: criar uma campanha e um conjunto de anúncios

É possível criar uma [campanha de anúncios padrão](/docs/marketing-api/reference/ad-campaign-group) para criativo dinâmico, mas há duas limitações:

-   Seu `objective` precisa ser: `OUTCOME_SALES`, `OUTCOME_ENGAGEMENT`, `OUTCOME_LEADS`, `OUTCOME_AWARENESS`, `OUTCOME_TRAFFIC` ou `OUTCOME_APP_PROMOTION`.
    
-   `buying_type` deve ser o padrão, ou seja, `AUCTION` ou um campo em branco.
    

Por exemplo, para criar uma campanha de anúncios com o `objective` de `CONVERSIONS`:

```
curl \
  -F 'name=Dynamic Creative Sample Campaign'
  -F 'objective=OUTCOME_SALES'
  -F 'status=PAUSED'
  -F 'special_ad_categories=<SPECIAL_AD_CATEGORY>'
  -F access_token=<ACCESS_TOKEN>
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/campaigns
```

Quando a campanha estiver pronta, crie um conjunto de anúncios usando o [ponto de extremidade de conjunto de anúncios padrão](/docs/marketing-api/reference/ad-campaign/).

-   Você poderá usar todas as opções de `billing_event`, `targeting` e `promoted_object`, desde que elas sejam compatíveis com o `objective` da campanha de anúncios principal.
    
-   Você deve definir a `optimization_goal` como `OFFSITE_CONVERSIONS` para os objetivos `OUTCOME_SALES`, `OUTCOME_ENGAGEMENT`, `OUTCOME_LEADS` e `OUTCOME_TRAFFIC`.
    
-   Depois, defina `is_dynamic_creative` como `true`.
    

Para criar um conjunto de anúncios em uma campanha com a `optimization_goal` definida como `conversions`:

```
curl \
  -F 'status=PAUSED'
  -F 'name=Dynamic Creative Ad Set'
  -F 'campaign_id=<CAMPAIGN_ID>'
  -F 'optimization_goal=OFFSITE_CONVERSIONS'
  -F 'is_dynamic_creative=true'
  -F 'lifetime_budget=5000'
  -F 'promoted_object={"pixel_id": "<PIXEL_ID>", "custom_event_type": "PURCHASE"}'
  -F 'billing_event=IMPRESSIONS'
  -F 'bid_strategy=LOWEST_COST_WITHOUT_CAP'
  -F 'targeting={"geo_locations": {"countries": ["US"]}}'
  -F 'start_time=2024-04-09'
  -F 'end_time=2024-04-20'
  -F access_token=<ACCESS_TOKEN>
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/adsets
```

Isso retorna uma nova identificação do conjunto de anúncios:

```
{"id":"23842500259260001"}
```

Se você usar `asset_feed_spec` com um conjunto de anúncios otimizado para `APP_INSTALLS`, será preciso especificar `link_url` (por exemplo, `http://www.abc.com`). A `link_url`**deve ser igual à**`object_store_url` no `promoted_object`. Forneça apenas um parâmetro `link_url` no campo `asset_feed_spec`.

```
curl 
-F "name=Dynamic Creative AdSet"
-F "campaign_id=CAMPAIGN_ID"
-F "optimization_goal=APP_INSTALLS"
-F 'is_dynamic_creative=true'
-F "billing_event=IMPRESSIONS"
-F "is_autobid=true"
-F "promoted_object={'object_store_url':'https://itunes.apple.com/us/app/facebook/id284882215','application_id':ADVERTISED_APP_ID}"  // object_store_url must match what is provided in asset feed's link_urls 
-F "lifetime_budget=20000"
-F "end_time=1461974400"
-F "targeting={
     'geo_locations':{'countries':['US']},
     'age_min':18,
     'age_max':24,
     'publisher_platforms':['facebook', 'audience_network'],
     'user_os':['ios']
   }"
-F "access_token=ACCESS_TOKEN" 
https://graph.facebook.com/<API_VERSION>/act_AD_ACCOUNT_ID/adsets
```

[](#)

## Etapa 2: fornecer o criativo do anúncio com a `asset_feed_spec`

Forneça seu criativo por meio do campo `asset_feed_spec`, também conhecido como feed de ativos. Nesse campo, você pode especificar vários ativos de criativo para cada tipo de ativo. Alguns exemplos de tipos são imagens, vídeos, títulos e descrições de links. Consulte estas páginas:

-   [Especificação do feed de ativos](/docs/marketing-api/dynamic-creative/dynamic-creative-optimization)
    
-   [Opções de especificações do feed de ativos](/docs/marketing-api/dynamic-creative/asset-feed-spec)
    

Talvez seja necessário definir `page_id` e `instagram_user_id`.

`asset_feed_id` só é compatível com a API de Marketing 3.1 e versões anteriores. Como alternativa, use `asset_feed_spec`.

### Corte de imagem

O processo de criativo dinâmico é compatível com o corte de imagem. Informe o parâmetro de corte nas especificações da imagem. Só é possível fornecer um corte por imagem. Aplicaremos os cortes definidos por você a todos os posicionamentos da sua imagem. Consulte [Corte de imagem](/docs/marketing-api/image-crops/).

[](#)

## Etapa 3: criar o anúncio

Neste ponto, seu conjunto de anúncios **precisa estar vazio**. Ao criar o anúncio, forneça uma referência para a identificação do criativo. Só é possível criar um anúncio por conjunto. No entanto, você pode criar anúncios adicionais do processo de criativo dinâmico em novos conjuntos.

```
curl 
  -F 'name=Dynamic Creative Ad' 
  -F 'adset_id=<ADSET_ID>' 
  -F 'access_token=<ACCESS_TOKEN>' 
  -F 'creative={
      "creative_id": <CREATIVE_ID>,
   }' 
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/ads
```

Depois de criar o anúncio:

-   Sua campanha aparecerá no [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage).
    
-   O Facebook [analisará o anúncio](#ad_review) e verificará se ele atende às nossas [Políticas de Publicidade](https://www.facebook.com/policies/ads/).
    

Não será possível [excluir nem arquivar o anúncio](/docs/marketing-api/best-practices/storing_adobjects) depois que ele for criado para o processo de criativo dinâmico. Em vez disso, [exclua ou arquive](/docs/marketing-api/best-practices/storing_adobjects) o conjunto de anúncios principal.

O criativo dinâmico é compatível com todos os posicionamentos, exceto `sponsored_messages` no Messenger.

### Anúncios em carrossel

O processo de criativo dinâmico oferece a melhor combinação de ativos no [formato de anúncio em carrossel](/docs/marketing-api/guides/videoads#carousel). Caso seu feed tenha menos de 10 imagens, o número de cartões do carrossel será igual ao número de imagens. Se você usar mais de 10 imagens, exibiremos um carrossel com 10 cartões. **Recomendamos usar tamanhos quadrados para imagens.**

Se estiver usando um [carrossel](/docs/marketing-api/guides/videoads#carousel) com criativo dinâmico, **não será possível** aplicar estes recursos de anúncios em carrossel:

-   `BODY_LABEL`
    
-   `CALL_TO_ACTION_TYPE_LABEL`
    
-   `LINK_URL_LABEL`
    
-   `CAPTION_LABEL`
    
-   `AD_FORMAT_LABEL`
    

No detalhamento dos insights de ativos, agregamos métricas baseadas em impressões relacionadas aos ativos no cartão de todos os cartões para ativos do primeiro cartão. Os ativos no cartão incluem imagens, título e descrição

Para obter mais informações de contexto, consulte [Anúncios em vídeo e em carrossel](/docs/marketing-api/guides/videoads#carousel).

[](#)

## Etapa 4 (opcional): verificar o status da análise

Depois de criar uma campanha, um conjunto de anúncios e um anúncio, verifique o [status da análise do anúncio](/docs/marketing-api/adgroup/feedback):

```
curl -G 
-d "access_token=<ACCESS_TOKEN>" 
-d 'fields=review_feedback' 
https://graph.facebook.com/<API_VERSION>/<ADSET_ID>
```

O resultado inclui o feedback da análise do anúncio. Uma matriz vazia significa que seu anúncio foi aprovado no processo de análise:

```
{
  "review_feedback":"[]",
  "id":"<ADSET_ID>"
}
```

Caso seu anúncio não seja aprovado na análise, você verá o seguinte:

```
{
  "review_feedback": {
    {"id":23842500258220001,"text":"Body 1","reason":["ALCOHOL"]},
    {"id":23842500258160001,"text":"Title 1","reason":["ALCOHOL"]},
    {"id":23842500258170001,"text":"Title 2","reason":["ALCOHOL"]}
  }",
  "id": "<AD_ID>"  
}
```

[](#)