---
title: "Campanhas Advantage+ - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-campaigns/"
scraped_at: "2026-02-01T15:43:00.721Z"
---

# Experiência de campanha Advantage+ para vendas, apps e leads

Estamos lançando um processo novo e simplificado de criação de campanhas, que substitui os fluxos de trabalho específicos em vigor para campanhas manuais de compras e de app Advantage+ (respectivamente, ASC e AAC, pelas iniciais em inglês). No novo fluxo unificado, você não precisa mais especificar o sinalizador `smart_promotion_type` para criar campanhas ASC ou AAC. Agora, é possível criar uma campanha no estado Advantage+ aplicando as configurações de orçamento, público e posicionamento Advantage+.

A partir da versão 25.0, não aceitaremos mais o uso da [API de campanha de compras Advantage+ (ASC)](/docs/marketing-api/advantage-shopping-campaigns) com o campo `smart_promotion_type=AUTOMATED_SHOPPING_ADS` para criar campanhas ASC nem da [API de campanha de app Advantage+ (AAC)](/docs/app-ads/advantage-app-campaigns) com o campo `smart_promotion_type=SMART_APP_PROMOTION` para criar campanhas AAC. Em vez disso, você precisará usar as configurações de [público Advantage+](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience), [orçamento de campanha Advantage+](/docs/marketing-api/bidding/guides/advantage-campaign-budget) e posicionamentos Advantage+ para criar campanhas com um `advantage_state` que reflita o tipo de campanha Advantage+. Para saber mais, leia [este post de blog](/blog/post/2025/06/03/advantage-plus-campaign-experience-for-sales-and-app).

O campo `existing_customer_buget_percentag` ficará obsoleto ao mesmo tempo que a API de ASC na versão 25.0. Para replicar esse campo, consulte a seção [Replicar o comportamento `existing_customer_budget_percentage`](#replicate-existing-customer-budget-percentage-behavior) abaixo.

Este guia mostra como criar campanhas de vendas e de app Advantage+ com o `advantage_state` definido como `advantage_plus_sales` ou `advantage_plus_app`. Essas campanhas serão exibidas no Gerenciador de Anúncios como uma campanha de vendas (ou de app) Advantage+ "ATIVADA", incluindo os benefícios de desempenho associados. As campanhas de vendas e de app Advantage+ são versões atualizadas e simplificadas das [campanhas de compras Advantage+](/docs/marketing-api/advantage-shopping-campaigns) e das [campanhas de app Advantage+](/docs/app-ads/advantage-app-campaigns).

Na nova configuração, todas as campanhas de vendas e de promoção do app podem se beneficiar das otimizações de IA que impulsionam o desempenho das campanhas de compras e de app Advantage+ atualmente. A linha completa de ferramentas para anúncios continuará disponível para atender às necessidades das empresas.

É importante garantir que a campanha inclua as configurações de [público Advantage+](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience), [orçamento de campanha Advantage+](/docs/marketing-api/bidding/guides/advantage-campaign-budget) e posicionamentos Advantage+ para ter o estado "Advantage+" habilitado. Isso aparecerá refletido no campo `advantage_state`, que será definido como um valor diferente de `DISABLED`.

**Observação**: nenhuma ação será necessária para ativar os posicionamentos Advantage+, já que se trata de uma configuração padrão na API.

## Criar uma campanha Advantage+

### Etapa 1: escolher um objetivo para a campanha de anúncios

-   `OUTCOME_SALES`: use essa opção para gerar os mesmos resultados de desempenho de uma campanha de compras Advantage+ quando ativar as configurações de automação a seguir.
    
-   `APP_INSTALLS`: use essa opção para gerar os mesmos resultados de desempenho de uma campanha de app Advantage+ quando ativar as configurações de automação a seguir.
    
-   `OUTCOME_LEADS`: use essa opção para criar uma campanha de leads Advantage+. As campanhas de leads Advantage+ foram desenvolvidas para maximizar o desempenho das campanhas de leads com menos tempo de configuração e maior eficiência. Com o uso de IA, as campanhas de leads Advantage+ podem ajudar você a gerar leads qualificados ao exibir seus anúncios para públicos relevantes em posicionamentos mais eficazes.
    

### Etapa 2: definir os critérios Advantage+ necessários

Você pode [criar uma campanha de anúncios](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) que usa os mesmos mecanismos de automação de uma campanha de compras Advantage+ ou de uma campanha de app Advantage+ aplicando estas configurações:

#### Critérios de automação do estado de posicionamentos Advantage+

-   Não defina exclusões nem [direcionamentos de posicionamento](/docs/marketing-api/audiences/reference/placement-targeting) para que todos os posicionamentos disponíveis estejam qualificados.
    
-   É preciso que todos os conjuntos de anúncios na campanha atendam a esses critérios. Caso contrário, a campanha refletirá `advantage_state: DISABLED` devido a restrições de posicionamento (ou seja, `advantage_placement_state: DISABLED`).
    
-   As exclusões de posicionamento poderão ser definidas no nível da conta de anúncios, e a campanha ainda estará qualificada para um valor `advantage_state` que não seja `DISABLED`.
    

#### Critérios do estado de orçamento Advantage+

-   O orçamento é configurado no nível da campanha de anúncios com base em uma estratégia de lance compatível.
    

#### Critérios do estado de público Advantage+

Qualquer um dos critérios a seguir pode ser usado. **Observação**: é preciso aplicar o comportamento a seguir a **pelo menos um** conjunto de anúncios na campanha.

-   _(Recomendado)_ Ative a opção [público Advantage+](docs/marketing-api/audiences/reference/targeting-expansion/advantage-audience) com `"targeting_automation": {"advantage_audience": 1}`.
    
-   Nenhum parâmetro de direcionamento deve ser definido, exceto [`geo_locations`](/docs/marketing-api/audiences/reference/basic-targeting/#location), que são permitidos.
    
-   _(Configuração avançada)_ É permitido usar opções de direcionamento individuais, mas com flexibilização. Para saber mais sobre como habilitar a flexibilização em opções de direcionamento específicas, consulte a documentação exibida abaixo:
    
    -   [Público semelhante Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-lookalike)
        
    -   [Público personalizado Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-custom-audience)
        
    -   [Direcionamento detalhado Advantage](/docs/marketing-api/audiences/reference/targeting-expansion/advantage-detailed-targeting)
        
    -   [Direcionamento avançado: Habilitar sugestões de idade e gênero](/docs/marketing-api/audiences/reference/advanced-targeting/#enable-age-and-gender-suggestions)
        
    

### Etapa 3: verificar a ativação de `advantage_state_info`

Depois de ativar esses três mecanismos de automação, a campanha de anúncios refletirá o `advantage_state` a seguir no nível da campanha em `advantage_state_info`, dependendo do objetivo.

```
v24.0
```

#### `objective: OUTCOME_SALES`

```
advantage_state_info: { advantage_state: ADVANTAGE_PLUS_SALES advantage_budget_state: ENABLED advantage_audience_state: ENABLED advantage_placement_state: ENABLED }
```

#### `objective: APP_PROMOTION`

```
advantage_state_info: { advantage_state: ADVANTAGE_PLUS_APP advantage_budget_state: ENABLED advantage_audience_state: ENABLED advantage_placement_state: ENABLED }
```

#### `objective: OUTCOME_LEADS`

```
advantage_state_info: { advantage_state: ADVANTAGE_PLUS_LEADS advantage_budget_state: ENABLED advantage_audience_state: ENABLED advantage_placement_state: ENABLED }
```

#### Estado `DISABLED`

Se algum dos mecanismos `advantage_budget_state`, `advantage_audience_state` ou `advantage_placement_state` estiverem definidos como `DISABLED`, o `advantage_state` em `advantage_stage_info` será `DISABLED`.

```
advantage_state_info: { advantage_state: DISABLED advantage_budget_state: DISABLED advantage_audience_state: ENABLED advantage_placement_state: ENABLED }
```

Uma campanha precisa ter `advantage_budget_state`, `advantage_audience_state` e `advantage_placement_state` definidos como `ENABLED` para que o `advantage_state` seja `ADVANTAGE_PLUS_SALES`, `ADVANTAGE_PLUS_APP` ou `ADVANTAGE_PLUS_LEADS`.

Se qualquer um dos mecanismos de automação retornar `DISABLED`, `advantage_state` será `DISABLED`.

O campo `advantage_state` e os respectivos subcampos `advantage_budget_state`, `advantage_audience_state` e `dvantage_placement_state` são sinalizadores das informações de estado somente leitura que podem ser consultados, mas são definidos pela configuração dos mecanismos de automação Advantage+.

**Observação**: as campanhas criadas com um `advantage_state` de `ADVANTAGE_PLUS_SALES`, `ADVANTAGE_PLUS_APP`ou `ADVANTAGE_PLUS_LEADS` terão um `smart_promotion_type` de `GUIDED_CREATION`.

[](#)

## Replicar o desempenho da campanha de compras Advantage+ com campanhas Advantage+

1.  Defina o objetivo da campanha de anúncios como `OUTCOME_SALES`.
2.  Evite definir direcionamentos ou exclusões de posicionamentos.
3.  Configure um orçamento no nível da campanha de anúncios com uma `bid_strategy` que tenha `LOWEST_COST_WITHOUT_CAP` (recomendado), `COST_CAP`, `LOWEST_COST_WITH_BID_CAP` ou `LOWEST_COST_WITH_MIN_ROAS`.
4.  Evite definir qualquer parâmetro de direcionamento além de `geo_locations` ou ative a opção de público Advantage+.

[](#)

## Replicar o comportamento `existing_customer_budget_percentage`

Para replicar o comportamento `existing_customer_budget_percentage` na sua campanha, crie dois conjuntos de anúncios por campanha que separem os clientes novos dos atuais.

1.  Crie um público personalizado que defina seus clientes atuais e tenha a identificação do público correspondente.
2.  Defina um orçamento no nível da campanha de anúncios usando a opção de orçamento de campanha Advantage.
3.  Crie um conjunto de anúncios fazendo uma solicitação `POST` para `/act_<AD_ACCOUNT_ID/adsets`.
    1.  Defina um limite máximo de gastos para o conjunto de anúncios:  
        `"daily_min_spend_target": "X", "daily_spend_cap": "X"`
    2.  Defina as configurações de `custom_audience` para incluir o público personalizado que representa seus clientes atuais. Garanta que isso não seja tratado como uma sugestão ou flexibilização, definindo `targeting_relaxation_types` como `0` para públicos personalizados.
        ```
        { "targeting":{ "geo_locations":{ "countries":["US"] }, "custom_audiences":[{ "id":<CUSTOM_AUDIENCE_ID> }], "targeting_relaxation_types":{ "custom_audience":0 } } }
        ```
        
4.  Use as [mesmas configurações de criativo](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative) nos dois conjuntos de anúncios. Depois, você poderá [criar seu anúncio](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad) com o ponto de extremidade `/act_<AD_ACCOUNT_ID>/ads`.  
      
    A criação de anúncios com um estado Advantage+ segue o mesmo processo das campanhas de vendas manuais. Consulte a documentação a seguir para criar anúncios com um estado Advantage+ habilitado:
    -   [Manual Ads (non-Catalog Ads)](/docs/marketing-api/reference/adgroup)
        
    -   [Anúncios de Catálogo Advantage+](/docs/marketing-api/advantage-catalog-ads)
        
    -   [Anúncios de Lojas](/docs/marketing-api/shops-ads)
        
    -   [Catálogos localizados (ou anúncios de catálogo Advantage+ para vários idiomas ou países)](/docs/marketing-api/catalog/guides/localized-catalog)
        
5.  Duplique o conjunto de anúncios, mas edite-o para que ele inclua uma [exclusão de público personalizado](/docs/marketing-api/audiences/reference/advanced-targeting/#custom_audiences), removendo as pessoas que são seus clientes atuais. Você pode:
    
    -   Incluir um segundo conjunto de anúncios na sua chamada `POST` na etapa 3, com a exclusão do público personalizado que representa seus clientes atuais.
        
    -   Repetir as etapas de 1 a 4 para criar um segundo conjunto de anúncios, mas garanta que o público personalizado de clientes atuais esteja definido como `exclude`.
        
    -   Usar o [ponto de extremidade `/adcopies`](/docs/marketing-api/reference/ad-campaign/copies/) para duplicar o primeiro conjunto de anúncios. Depois, faça uma chamada `POST` para editar o conjunto e excluir a identificação do público personalizado que representa seus clientes atuais.
        
    
    ```
    { "targeting":{ "geo_locations":{ "countries":["US"] }, "age_min":25, "age_max":40, "excluded_custom_audiences":[{ "id":<CUSTOM_AUDIENCE_ID> }], } }
    ```
    

Pronto, você criou uma nova campanha de anúncios com um limite de gastos para clientes atuais. Ela será veiculada após análise.

[](#)

## Migrar campanhas de compras Advantage+ e campanhas de app Advantage+ para campanhas Advantage+

### Limitações

-   As campanhas de app Advantage+ só podem ser migradas, e não copiadas, para o formato Advantage+.
    
-   As campanhas de compras Advantage+ com `existing_customer_budget_percentage` não podem ser migradas para a estrutura Advantage+ usando a API de Marketing. Abra a campanha no Gerenciador de Anúncios para migrar para a estrutura Advantage+.
    
-   As campanhas de compras Advantage+ com mais de 150 anúncios não podem ser migradas para a estrutura Advantage+ usando a API de Marketing. Abra a campanha no Gerenciador de Anúncios para migrar para a estrutura Advantage+.
    

### Copiar e migrar

É possível copiar sua campanha de compras Advantage+ para uma nova campanha na estrutura Advantage+ usando o parâmetro `migrate_to_advantage_plus`.

#### Exemplo de solicitação

```
curl -X POST <AD_CAMPAIGN_ID>/copies?migrate_to_advantage_plus=true
```

#### Exemplo de resposta

```
{
  "copied_campaign_id": "6877326900432",
  "ad_object_ids": [
    {
      "ad_object_type": "campaign",
      "source_id": "6877313029432",
      "copied_id": "6877326900432"
    }
  ]
}
```

Quando a nova campanha (`copied_id`) for consultada, ela refletirá um `smart_promotion_type` de `GUIDED_CREATION` e conterá detalhes de `advantage_state_info`.

### Campanhas que usam `existing_customer_budget_percentage`

As campanhas que usam `existing_customer_budget_percentage` só podem ser migradas para a estrutura Advantage+ duplicando a campanha no Gerenciador de Anúncios. Você pode abrir a campanha no Gerenciador de Anúncios para ver instruções sobre como duplicar na estrutura Advantage+. Para recriar como uma nova campanha, veja a seção [Replicar porcentagem do orçamento para clientes existentes](#replicate-existing-customer-budget-percentage-behavior).

### Somente migração

Se quiser manter as mesmas identificações de campanha, use o campo `migrate_to_advantage_plus` para migrar suas campanhas de compras Advantage+ ou campanhas de app Advantage+ para o formato Advantage+.

#### Exemplo de solicitação

```
curl -X POST <AD_CAMPAIGN_ID>?migrate_to_advantage_plus=true
```

#### Exemplo de resposta

```
{
success: <BOOLEAN>
}
```

Então, a campanha refletirá um `smart_promotion_type` de `GUIDED_CREATION` e conterá detalhes de `advantage_state_info`.

[](#)

## Perguntas frequentes

[When will the phased rollout of the new streamlined Advantage+ campaign experience UI in Ads Manager be complete?](#faq_1000794475557426)

We estimate that this rollout will be completed by mid-June 2025.

[Link permanente](#faq_1000794475557426)

[Why are we updating Advantage+ shopping campaigns to Advantage+ sales campaigns?](#faq_1041918350780656)

Advantage+ sales campaigns use the same automation features as Advantage+ shopping campaigns, and they are both built on the principles of liquidity, including the combination of Advantage+ budget, Advantage+ audience, and Advantage+ placements. The Advantage+ campaign experience for Sales also reflects expanded supported use cases not available with the Advantage+ shopping campaign endpoint. Advertisers can now benefit from similar performance with additional features available for manual campaigns, like additional conversion locations, and may now create more than one adset per campaign.

[Link permanente](#faq_1041918350780656)

[What are the implications of this update to the Advantage+ campaign experience on my campaign performance?](#faq_558036633743455)

If you keep the same settings in the new Advantage+ campaign experience as you used in your previous Advantage+ shopping campaigns, Advantage+ app campaigns or manual campaigns, then nothing will change. Your campaign will perform similarly to the previous set up.

[Link permanente](#faq_558036633743455)

[What happens to my campaign learnings when I use the migrate\_to\_advantage\_plus field to copy or migrate my campaign?](#faq_31588813677431938)

Migrating or migrating and copying an ASC/AAC campaign into Advantage+ format, including using the `migrate_to_advantage_plus` field, will force the campaign into the learning stage. This means that newly copied campaigns will be in the learning stage, as well as campaigns that are migrated only without a copy action. This applies to all campaigns and there is not a workaround for the learnings.

[Link permanente](#faq_31588813677431938)

[Why are my advertisers seeing the new experience in some ad accounts and the original experience in others?](#faq_683088944515824)

We typically roll out products at the ad account level, so there is a chance you could see two different experiences across different ad sets during the rollout period. Once the new experience has fully rolled out, all ad accounts will have the same experience. Aim to maintain your existing strategy, regardless of the experience you have within Ads Manager.

[Link permanente](#faq_683088944515824)

[What happens to my existing Advantage+ shopping campaigns that I created via API when v25.0 rolls out?](#faq_1004007384838968)

-   ASC/AAC campaigns that can be migrated into Advantage+ structure may use the `migrate_to_advantage_plus` field to migrate or copy and migrate their campaigns.
-   With the introduction of v24.0, you will not be able to create ASC campaigns with `smart_promotion_type=AUTOMATED_SHOPPING_ADS`, but may revert to v23.0 to do so. The introduction of v25.0 will give an error for all attempts to create ASC campaigns with `smart_promotion_type=AUTOMATED_SHOPPING_ADS` on any version of the API.
-   If not migrated prior, existing Advantage+ shopping campaigns cannot be edited and will maintain all previous settings with the introduction of v25.0. Un-migrated eligible campaigns may still take migration actions for “Copy and Migrate” or “Migrate Only”, but will be blocked from all other edit activity with v25.0.
-   The v25.0 edit exceptions are for ASC campaigns that use `existing_customer_budget_percentage` and cannot be migrated, or ASC campaigns that have more than 50 ads within the adset and cannot be migrated - these campaigns will be editable after v25.0, but may not be duplicated. We advise you to begin creating Advantage+ sales campaigns with `"advantage_state": "ADVANTAGE_PLUS_SALES"` as soon as possible to avoid any disruption with v25.0.
-   All legacy ASC/AAC campaigns will be blocked from edits with the release of v26.0 and will no longer be able to use the `migrate_to_advantage_plus` field to migrate. This includes campaigns that have more than 50 ads within their adsets, or campaigns that are using `existing_customer_budget_percentage`.

[Link permanente](#faq_1004007384838968)

[What happens if I try to create an ASC/AAC campaign on v24.0?](#faq_1478494046811676)

Using `smart_promotion_type` to create ASC/AAC campaigns on v24.0 will yield an error informing you that you cannot create or edit ASC/AAC on this version. You may revert to v23.0 to create ASC/AAC campaigns with `smart_promotion_type`, but we recommend creating Advantage+ campaigns instead. ASC/AAC will not be able to be created on any API version with the release of v25.0.

[Link permanente](#faq_1478494046811676)

[How can I migrate my Advantage app campaigns into Advantage+?](#faq_1361216238938729)

AAC campaigns cannot be copied and migrated, but may be migrated using the `migrate_to_advantage_plus` field. See the [migration instructions](#migrate-to-advantage-campaigns) above.

[Link permanente](#faq_1361216238938729)

[Will I be able to edit my old Advantage+ shopping campaigns that I created via API without issue in the new Ads Manager UI after the new Advantage+ campaign UI experience is fully rolled out?](#faq_1008107211500869)

Yes. Once the ad account has been upgraded into the new Advantage+ experience on Ads Manager, campaigns that were created as Advantage+ shopping campaigns will show as “Advantage+ On” in the Ads Manager whether they were created via API or UI.

[Link permanente](#faq_1008107211500869)

[Will my ASC campaigns created through the API with automated\_shopping\_ads reflect as "advantage\_state": "ADVANTAGE\_PLUS\_SALES" after this change?](#faq_1011804141131469)

If you edit the ASC campaign within the Ads Manager UI in any way and accept turning on Advantage+ campaign budget when prompted, it will be converted to an `ADVANTAGE_PLUS_SALES` campaign that shows as "Advantage+ On" through the Ads Manager UI, and `"advantage_state": "ADVANTAGE_PLUS_SALES"` when queried on its API settings. The campaign will also change from `smart_promotion_type=AUTOMATED_SHOPPING_ADS` to `smart_promotion_type=GUIDED_CREATION`. However, you must edit something about the ASC campaign in the Ads Manager in order to prompt this change and accept the Advantage+ campaign budget.

If the ASC campaign was created and edited exclusively through the API, it will continue to reflect as `smart_promotion_type=AUTOMATED_SHOPPING_ADS` in the API settings until something is edited about this campaign in the Ads Manager. It will show as "Advantage+ On: through the Ads Manager UI after the ad account has been upgraded into the new Advantage+ experience.

[Link permanente](#faq_1011804141131469)

[If I create an ASC campaign before my ad account is enrolled in the new Advantage+ campaign Ads Manager experience, will that campaign reflect as "Advantage+ On" when it becomes enrolled? Will it show as "advantage\_state": "ADVANTAGE\_PLUS\_SALES" in the API?](#faq_1035912605209414)

ASC campaigns created through the old ASC experience in Ads Manager will show with "Advantage+ On" settings once the ad account has been upgraded into the new Advantage+ campaign Ads Manager experience.

However, ASC campaigns created on the Ads Manager with the old ASC UI before the ad account has been upgraded into the new Advantage+ campaign UI experience will need to be edited in the Ads Manager and accept turning on Advantage+ campaign budget when prompted in order to reflect Advantage+ Sales being on in the new interface and `"advantage_state": "ADVANTAGE_PLUS_SALES"`. This will also then display the budget at the campaign level in reporting and update to `smart_promotion_type=GUIDED_CREATION`. Otherwise, the campaign will continue to reflect `smart_promotion_type=AUTOMATED_SHOPPING_ADS` on the API settings.

[Link permanente](#faq_1035912605209414)

[What’s the impact when I edit an API-created ASC campaign in the new Advantage+ campaign UI experience and leave its settings as "Advantage+ On"?](#faq_1205274874407546)

The campaign converts from Advantage+ shopping campaign (i.e., `smart_promotion_type=AUTOMATED_SHOPPING_ADS`) to an Advantage+ sales campaign (i.e., `"advantage_state": "ADVANTAGE_PLUS_SALES"`) with `smart_promotion_type=GUIDED_CREATION`.

[Link permanente](#faq_1205274874407546)

[What happens to my ASC campaigns with smart\_promotion\_type=AUTOMATED\_SHOPPING\_ADS that were using existing\_customer\_budget\_percentage if it’s not supported with Advantage+ sales campaigns?](#faq_1670098383631152)

ASC campaigns that use `existing_customer_budget_percentage` cannot be migrated to the Advantage+ structure with `"advantage_state": "ADVANTAGE_PLUS_SALES"` using the API, but can be migrated into Advantage+ structure if you open the campaign in Ads Manager. ASC campaigns using `existing_customer_budget_percentage` will still be editable with the release v25.0 but unable to be duplicated. These campaigns will be uneditable with the release of v26.0, so we recommend migrating the campaigns to Advantage+ structure within Ads Manager as soon as possible.

[Link permanente](#faq_1670098383631152)

[The ad set of my ASC campaign contains more than 50 ads. Can I convert this ASC campaign to "advantage\_state": "ADVANTAGE\_PLUS\_SALES"?](#faq_1206254734612577)

ASC campaigns with ad sets containing more than 50 ads cannot be converted, migrated, or duplicated into Advantage+ sales campaigns. However, these campaigns will maintain their ASC settings (`smart_promotion_type=AUTOMATED_SHOPPING_ADS`) and will continue to be editable after v25.0. These campaigns will not be able to be duplicated with the release of v25.0, and will be uneditable with the release of v26.0. If there are any changes to this behavior, Meta will provide advance notice.

[Link permanente](#faq_1206254734612577)

[Can I use the advantage\_state field to make a POST request to create an ADVANTAGE\_PLUS\_SALES campaign?](#faq_1202023457914478)

No. Developers will need to follow the criteria above to make a campaign with Advantage+ audience, Advantage+ placement, and Advantage+ budget criteria.

[Link permanente](#faq_1202023457914478)

[Can I make a POST request to smart\_promotion\_type to set it back to GUIDED\_CREATION instead of AUTOMATED\_SHOPPING\_ADS?](#faq_2192848187853967)

No. Please edit the campaign in Ads Manager once the ad account is enrolled in the new UI to convert the campaign, or use the `migrate_to_advantage_plus` field to migrate the campaign via API.

**Note:** Not all campaigns will be eligible to migrate from ASC to Advantage+ sales. ASC campaigns using `existing_customer_budget_percentage` cannot be migrated via the API, but can be migrated in Ads Manager. ASC campaigns where the count of ads within the ASC adset is greater than 50 cannot be migrated into Advantage+ sales campaigns at all. These campaigns will remain in the ASC structure but will continue to be editable after v25.0. However, all legacy ASC campaigns with `smart_promotion_type` will be uneditable with the release of v26.0.

[Link permanente](#faq_2192848187853967)

[What specific qualifications will make my campaign ENABLED for advantage\_audience\_state?](#faq_729893782783775)

-   If `"targeting_automation": {"advantage_audience": 1}` for at least one ad set in the campaign, OR
-   If `"targeting_automation": {"advantage_audience": 0}` or is not set, and at least one ad set in the campaign has:
    -   Ad set is using default age or age <= 25 or using age as a suggestion
    -   Ad set is using default gender or using gender as a suggestion
    -   Ad set is not using custom audience inclusion or using Advantage custom audience

[Link permanente](#faq_729893782783775)

[How do I disable an Advantage+ sales campaign so that advantage\_state will reflect DISABLED?](#faq_679085288069459)

If you set up your budget, audience, or placement details outside of the criteria listed above, the campaign will reflect `advantage_state:DISABLED`.

[Link permanente](#faq_679085288069459)

[Can I migrate my ad campaign if it is part of a Special Ad Category?](#faq_1319727659693182)

Access to Advantage+ Audience, Advantage Custom Audience, and Advantage Detailed Targeting for Special Ad Category campaigns related to Housing, Employment, and Financial Products and Services is currently being rolled out to advertisers. If your campaign is eligible at the point of migration, it will be recreated in the Advantage+ structure. If not, it will be migrated into a similar structure using broad targeting. For more details, please see this [Help Center article](https://www.facebook.com/business/help/298000447747885).

[Link permanente](#faq_1319727659693182)

[](#)