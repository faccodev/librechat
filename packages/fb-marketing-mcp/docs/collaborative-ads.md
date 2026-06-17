---
title: "Anúncios Colaborativos - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/collaborative-ads"
scraped_at: "2026-02-01T13:54:04.890Z"
---

# Anúncios Colaborativos

Os Anúncios Colaborativos são uma solução desenvolvida a partir dos [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads). Ela permite que os anunciantes da marca colaborem com um varejista ou parceiro de marketing de forma segura e atinjam metas de publicidade, como direcionar um produto para a venda usando o conteúdo fornecido pelo varejista.

O varejista ou parceiro de marketing deve compartilhar um segmento do catálogo com o anunciante da marca contendo todos os respectivos produtos. Esse segmento é uma parte do catálogo ou um superconjunto de conjuntos de produtos. Depois, o anunciante da marca poderá aceitar o segmento do catálogo e começar a veicular [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads) usando esse segmento do catálogo. Os anunciantes da marca não podem editar o segmento do catálogo, mas podem criar os próprios conjuntos de produtos a partir dele.

Basicamente, um anunciante veicula uma campanha de [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-ads) para vendas do catálogo com um catálogo de produtos. Portanto, é possível usar os relatórios de anúncios padrão do Facebook, que agora incluem métricas relacionadas ao segmento do catálogo.

Além disso, você pode usar relatórios no nível do produto e do varejista para mostrar apenas as compras da marca ao anunciante.

## Etapas gerais

[**Para varejistas e parceiros de marketing:**](#for-retailers)

-   **Etapa 1: fazer a integração com os Anúncios Colaborativos**
    
-   **Etapa 2: criar um segmento do catálogo.** O segmento deve conter produtos que pertencem a um dos parceiros de marca em potencial.
    
-   **Etapa 3: compartilhar o segmento do catálogo com o parceiro de marca**
    
-   (Apenas para parceiros de marketing) **Etapa 4: fornecer ferramentas de descoberta para marcas**
    

[**Para marcas:**](#for-brands)

-   **Etapa 1: aceitar o segmento do catálogo**
    
-   **Etapa 2: criar uma campanha de anúncios com um segmento do catálogo**
    
-   **Etapa 3: ver relatórios.** Veja relatórios relacionados aos produtos no segmento do catálogo.
    
-   **Etapa 4 (opcional): fazer a depuração** – Use as ferramentas para diagnosticar e resolver problemas mencionadas no artigo [Ferramentas de depuração dos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/debugging-tools).
    

[](#)

## Etapas para varejistas e parceiros de marketing

### Etapa 1: fazer a integração com os Anúncios Colaborativos

Para concluir esta etapa, seu app precisará das permissões [`business_management`](/docs/permissions/reference/business_management) e [`catalog_management`](/docs/permissions/reference/catalog_management).

No momento, não é possível executar essa ação via API. Em vez disso, use a interface do usuário. Para iniciar o processo, clique em "Ser um parceiro varejista" no [Diretório do varejista](https://www.facebook.com/collaborative_ads/retailer_directory/).

### Etapa 2: criar um segmento do catálogo

Para concluir esta etapa, seu app precisará das permissões [`business_management`](/docs/permissions/reference/business_management) e [`catalog_management`](/docs/permissions/reference/catalog_management).

Crie um segmento do catálogo usando um dos seus catálogos existentes. O segmento deve conter todos os produtos que você gostaria de compartilhar com seu parceiro de marca.

Para criar um segmento do catálogo via API, faça uma solicitação `POST` para a [borda `owned_product_catalogs`](/docs/marketing-api/reference/business/owned_product_catalogs/#Creating). Estes campos são obrigatórios para a criação de um segmento do catálogo:

-   `parent_catalog_id`: o catálogo principal a partir do qual seu segmento foi criado. Esse catálogo precisa estar em conformidade com os Anúncios Colaborativos. É possível ver o status do seu catálogo no Gerenciador de Comércio.
    
-   `catalog_segment_filter`: uma regra codificada em JSON usada para criar o segmento do catálogo.
    

### Etapa 3: compartilhar segmento do catálogo

Para concluir esta etapa, seu app precisará das permissões [`business_management`](/docs/permissions/reference/business_management) e [`catalog_management`](/docs/permissions/reference/catalog_management).

Compartilhe o segmento do catálogo com seu parceiro de marca. Para fazer isso via API, faça uma solicitação `POST` para `/{catalog_segment_id}/agencies`. Na sua chamada, você pode incluir os seguintes campos:

Campo

Descrição

`business`

tipo: string numérica ou número inteiro

**Obrigatório.**

ID da empresa com a qual o catálogo será compartilhado.

`permitted_tasks`

tipo: matriz < enumeração {MANAGE, ADVERTISE} >

**Obrigatório.**

Tarefas que a empresa poderá executar. Estas são as opções disponíveis: `['ADVERTISE', 'MANAGE']`.

`utm_settings`

tipo: objeto JSON {enum{campaign\_source,campaign\_medium,campaign\_name}: string}

**Opcional.**

Você pode especificar `campaign_source`, `campaign_medium` e `campaign_name`.

  

Por exemplo: `{campaign_source: “fb_campaign_source”}`.

`enabled_collab_terms`

Tipo: array < enum {ENFORCE\_CREATE\_NEW\_AD\_ACCOUNT, ENFORCE\_SHARE\_AD\_PERFORMANCE\_ACCESS} >

**Opcional.**

Os termos de colaboração a serem aplicados em novos parceiros de marca. Opções disponíveis: `['ENFORCE_CREATE_NEW_AD_ACCOUNT', 'ENFORCE_SHARE_AD_PERFORMANCE_ACCESS']`.

### (Apenas para parceiros de marketing) Etapa 4: fornecer ferramentas de descoberta para marcas

Para concluir essa etapa, o app precisa da permissão [`business_management`](/docs/permissions/reference/business_management). A chamada de API deve incluir um token de acesso do usuário, e esse usuário precisa ter permissão na solicitação de sugestão de parceiro, empresa ou colaboração.

Como parceiro de marketing, você deve fornecer uma maneira para as marcas descobrirem possíveis parceiros de Anúncios Colaborativos. Você pode usar estes pontos de extremidade para encontrar varejistas com os quais trabalhar:

-   [`GET {business-id}?fields=collaborative_ads_suggested_partners`](/docs/marketing-api/reference/business/): encontre parceiros para uma empresa específica.
    
-   [`GET collaborative_ads_directory?fields=collaborative_ads_merchants`](/docs/graph-api/reference/collaborative-ads-directory/): confira a lista completa de varejistas de Anúncios Colaborativos.
    
-   [`GET {cpas-advertiser-partnership-recommendation-id}?fields=advertiser_business_id,brand_business_id,brands,countries,merchant_business_id,status,status_reason`](/docs/graph-api/reference/cpas-advertiser-partnership-recommendation/) – Receba uma única recomendação de varejista.
    

Se uma marca encontrar um parceiro, você poderá entrar em contato com o varejista com uma solicitação de colaboração. Para isso, faça a seguinte solicitação `POST` para [`/{cpas-collaboration-request-id}`](/docs/graph-api/reference/cpas-collaboration-request/):

```
{business-id}/collaborative_ads_collaboration_requests?
brands=”[“[BRAND NAME]”, “[BRAND NAME 2]”]”&
contact_email=[CONTACT_EMAIL]&
contact_first_name=[CONTACT_FIRST_NAME]&
contact_last_name=[CONTACT_LAST_NAME]&
phone_number=[PHONE NUMBER]&
receiver_business=[RECEIVING BUSINESS ID]
requester_agency_or_brand=[REQUESTING ENTITY - AGENCY, BRAND or MERCHANT]
```

Monitore os [contatos](/docs/graph-api/reference/cpas-collaboration-request/) com estes pontos de extremidade:

-   [`GET {business-id}/collaborative_ads_collaboration_requests`](/docs/marketing-api/reference/business/)
    
-   [`GET {cpas-collaboration-request-id}?fields=phone_number,receiver_business,request_type,source,status`](/docs/graph-api/reference/cpas-collaboration-request/)
    

[](#)

## Etapas para marcas

### Etapa 1: aceitar o segmento do catálogo

Caso sua marca não tenha aceitado os Termos de Serviço da nova empresa compartilhada, faça isso.

Confira o que o usuário administrador da empresa deve fazer depois de receber o ativo compartilhado:

1.  Acessar a [Central de Colaboração](https://www.facebook.com/collaboration_center)
2.  Selecionar a empresa para a qual você está aceitando os Termos de Serviço.
3.  Selecionar **Parceiros** na navegação do lado esquerdo.
4.  Clicar no botão **Aceitar ativos** para começar o fluxo de trabalho de aceitação

Depois de aceitar os termos, sua marca poderá adicionar pessoas ao segmento do catálogo usando o ponto de extremidade [`/{product-catalog-id}/assigned_users`](/docs/marketing-api/reference/product-catalog/assigned_users/). **Observação**: essa ação exige a permissão [`business_management`](/docs/permissions/reference/business_management).

Além de aceitar os termos de serviço, as marcas podem precisar concordar com termos de colaboração impostos pelo varejista, como criar uma nova conta de anúncios e/ou conceder acesso de visualização para que o varejista possa acompanhar o desempenho da publicidade. É necessário aceitar esses termos para concluir o processo de integração.

### Etapa 2: criar uma campanha

Para concluir esta etapa, o app precisa das permissões [`business_management`](/docs/permissions/reference/business_management) e [`ads_management`](/docs/permissions/reference/ads_management/).

Sua marca pode usar o segmento do catálogo aceito para criar campanhas de anúncios. É preciso usar uma conta de anúncios diferente para cada varejista para o qual você quer veicular Anúncios Colaborativos. Depois que a conta de anúncios dedicada estiver vinculada a um varejista, ela só poderá selecionar segmentos de catálogo pertencentes a esse varejista específico.

Para criar e veicular anúncios, siga o mesmo processo que você usaria no seu catálogo de produtos. Porém, será preciso fornecer a `catalog_segment_ID` em vez da identificação do catálogo:

```
curl \
  -F 'name=Product Catalog Sales Campaign' \
  -F 'objective=PRODUCT_CATALOG_SALES' \
  -F 'promoted_object={"product_catalog_id":"<CATALOG_SEGMENT_ID>"}' \
  -F 'status=PAUSED' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/campaigns
```

Caso a solicitação seja bem-sucedida, você terá uma nova identificação de campanha de anúncios:

```
{
"id": "<CAMPAIGN_ID>"
}
```

Existem quatro campos que você normalmente pode definir com [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/ads-management#adgroup), mas não com um segmento do catálogo:

-   `multi_share_end_card` é definido como `false` por padrão e não pode ser alterado
    
-   Não é possível alterar `description` em `template_data`
    
-   `template_url_spec` que você pode usar para URLs de deep link deve apontar para o site do comerciante
    
-   As [especificações de rastreamento personalizadas](/docs/marketing-api/tracking-specs) estão desabilitadas.
    

### Etapa 3: ver relatórios

Depois que os anúncios estiverem em veiculação, os anunciantes da marca poderão acessar as métricas sobre o desempenho dos anúncios. Temos várias métricas de insights novas em diferentes níveis de objetos de anúncio. Confira `catalog_segment_value` e as métricas relacionadas para:

-   [Conta de anúncios](/docs/marketing-api/reference/ad-account/insights)
    
-   [Campanha de anúncios](/docs/marketing-api/reference/ad-campaign-group/insights/)
    
-   [Conjunto de anúncios](/docs/marketing-api/reference/ad-campaign/insights)
    
-   [Anúncio](/docs/marketing-api/reference/adgroup/insights)
    

`catalog_segment_value` inclui um detalhamento dos eventos de conversão, como compras, adições ao carrinho e visualização de produtos do segmento do catálogo em cada nível de objeto de anúncio. Ele agrega eventos de fontes como sites, dispositivos móveis e omnicanais. Saiba mais sobre as [métricas de insights estimadas e em desenvolvimento](/docs/marketing-api/insights/estimated-in-development#collaborative-ads).

### Etapa 4: fazer a depuração e diagnosticar problemas

Agora, as marcas devem solucionar e depurar problemas ao veicular [anúncios de catálogo Advantage+](/docs/marketing-api/dynamic-product-ads) para o segmento do catálogo.

Consulte [Ferramentas de depuração dos Anúncios de Catálogo Advantage+](/docs/marketing-api/dynamic-product-ads/debugging-tools).

[](#)

## Insights

As seguintes métricas estimadas estão relacionadas aos Anúncios Colaborativos. Consulte [Sobre métricas estimadas, em desenvolvimento e de terceiros](https://www.facebook.com/business/help/metrics-labeling#estimated).

Para consultar qualquer uma das nossas métricas de relatório:

-   Seu app precisa ter as permissões `ads_management` e `business_management`. Consulte [Análise do app](/docs/app-review).
    
-   É preciso ter um token de acesso de usuário, e esse usuário deve ter permissão para ver relatórios da conta de anúncios em questão.
    

É possível fazer consultas nos seguintes objetos: conta de anúncios, campanha de anúncios, conjunto de anúncios e anúncio.

O detalhamento `action_converted_product_id` não é compatível com o nível da conta de anúncios.

Metric

Description

`catalog_segment_value`

Value from conversion events, including a breakdown of purchases, add-to-carts and view products for the catalog segment at each ad object level.

`catalog_segment_value_omni_purchase_roas`

Total return on ad spend (ROAS) from purchases of items shared between Brand and Retailer. This number is based on information received from one or more Retailer' connected Facebook Business Tools. The amount is attributed to your ads.

`catalog_segment_value_website_purchase_roas`

Total return on ad spend (ROAS) from website purchases of items shared between Brand and Retailer. This number is based on information received from one or more Retailers' connected Facebook Business Tools. The amount is attributed to your ads.

`catalog_segment_value_mobile_purchase_roas`

The total return on ad spend (ROAS) from mobile app purchases of items shared between Brand and Retailer. This number is based on information received from one or more Retailers' connected Facebook Business Tools. The amount is attributed to your ads.

`catalog_segment_actions`

Similar to `catalog_segment_value`, when using this metric a breakdown of actions is given for the catalog segment at each ad object level.

`converted_product_value`

Value of conversions driven by your ads for a given product ID. This number is recorded by your Retailer partner's Pixel or App SDK.

  

The API only returns Product IDs —see [`/{product-item-id}`](/docs/marketing-api/reference/product-item/) for information. If you want to get brand names as well, please use Ads Manager.

`converted_product_quantity`

Quantity of conversions driven by your ads for a given product ID. This number is recorded by your Retailer partner's Pixel or App SDK.

  

The API only returns Product IDs —see [`/{product-item-id}`](/docs/marketing-api/reference/product-item/) for information. If you want to get brand names as well, please use Ads Manager.

### Detalhamentos

Os detalhamentos são usados para agrupar os resultados dos insights em diferentes conjuntos. Consulte [Detalhamentos](/docs/marketing-api/insights/breakdowns). Os detalhamentos a seguir podem ser usados com as métricas de Anúncios Colaborativos:

-   **Data:** confira insights para um intervalo de datas específico. Para usar esse detalhamento, adicione `time_range` à sua consulta. Por exemplo: `&time_range[since]=2020-03-01&time_range[until]=2020-04-01`.
    
-   **Nível do produto**: obtenha insights para um produto específico. Use esse detalhamento para `converted_product_value` e `converted_product_quantity metrics` incluindo `&action_breakdowns=action_converted_product_id` na sua consulta.
    

#### Como combinar detalhamentos

Use estes detalhamentos combinados para Anúncios Colaborativos:

O detalhamento `action_converted_product_id` não é compatível com o nível da conta de anúncios.

-   `action_converted_product_id`
    
-   `action_type`, `action_converted_product_id`
    

[](#)