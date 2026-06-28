---
title: "Multiplicadores de lances - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/bidding-and-optimization/bid-multiplier"
scraped_at: "2026-02-01T13:55:54.464Z"
---

# Multiplicadores de lances

Os multiplicadores de lances serão descontinuados em breve. Agora você pode substituir alguns dos seus multiplicadores de lances existentes por **regras de valor** na API de Marketing para lances aprimorados, adaptados às necessidades da sua empresa. [Sobre as regras de valor](https://www.facebook.com/business/help/535014515741813)

Os multiplicadores de lances permitem que você implemente uma estratégia de lances que leva em conta o público em um único conjunto de anúncios, atribuindo diferentes pesos a diferentes segmentos de público no seu [**conjunto de parâmetros de multiplicador de lances**](#bid_multiplier_parameter_set). Para dar lances de forma diferente para segmentos de público diferentes **sem multiplicadores de lances**, você normalmente criaria vários conjuntos de anúncios, com cada conjunto direcionado a um segmento de público específico. Usando multiplicadores de lances, é possível criar um único conjunto de anúncios com direcionamento amplo e, em seguida, anexar um **conjunto de parâmetros de multiplicador de lances** para especificar os ajustes de lance para cada segmento de público. Os multiplicadores de lances podem reduzir em grande escala o número de conjuntos de anúncios e segmentos de direcionamento necessários para executar sua estratégia de lances.

Os anunciantes que veiculam anúncios de crédito, emprego ou moradia que são sediados nos Estados Unidos ou direcionam anúncios para o país têm restrições diferentes e um subconjunto de categorias de público com o objetivo de ajustar os lances. Não é possível ajustar lances em campanhas de anúncios de crédito, emprego ou moradia nas categorias de público [`age`](#age), [`gender`](#gender), [`locale`](#locale), [`home_location`](#home_location), [`user_bucket`](#user_bucket) e [`custom_audience`](#custom_audience) de público semelhante (um público personalizado com origem em um público semelhante). Consulte [**Categoria de anúncio especial**](/docs/marketing-api/special-ad-category).

Desde 30 de janeiro de 2023, anúncios que usam um multiplicador de lances com categorias de dados de terceiros, como `booking_window`, `custom_audience` (incluindo públicos personalizados semelhantes), `length_of_stay`, `travel_start_date`, `travel_start_day_of_week`, `user_recency` e `user_bucket`, não serão mais veiculados aos usuários que recusaram o recurso.

## Multiplicadores de lances e regras de valor

A API de multiplicadores de lances será descontinuada em 2027. Para se preparar para essa mudança, agora você pode substituir alguns casos de uso de multiplicadores de lances pelas [**regras de valor**](https://www.facebook.com/business/help/535014515741813) seguindo as orientações da próxima seção, [Substituição de multiplicadores de lances por regras de valor](#value_rules).

Nem todos os conjuntos de anúncios que usam multiplicadores de lances podem ser migrados para regras de valor no momento. Consulte a seção [Limitações das regras de valor](#value_rules_limits) para ver a lista completa de casos de uso de multiplicadores de lances que não são compatíveis com as regras de valor no momento e para obter orientações sobre como lidar com esses casos de uso.

As **regras de valor** permitem que você ajuste os lances para determinados públicos, posicionamentos e locais de conversão. O sistema da Meta otimizará para resultados com base nas regras que você aplicar no nível do conjunto de anúncios. Em comparação com os multiplicadores de lances, as regras de valor oferecem ajustes de lance aprimorados e mais flexibilidade, além de facilitar a criação e o gerenciamento.

Assim como os multiplicadores de lances, as regras de valor podem ser gerenciadas usando a API de Marketing da Meta. A [documentação da API de regras de valor](/docs/marketing-api/bidding/value-rules) contém instruções sobre como usar a API. Além disso, as regras de valor podem ser gerenciadas no [**Gerenciador de Anúncios**](https://adsmanager.facebook.com/) usando uma interface simples. Para usuários do **Gerenciador de Anúncios**, as regras de valor também oferecem recursos de relatórios aprimorados, com detalhamentos de desempenho baseados nas regras aplicadas.

[](#)

## Substituição de multiplicadores de lances por regras de valor

As **regras de valor** oferecem suporte a muitas das capacidades de segmentação de público e ajuste de lance fornecidas por multiplicadores de lance. Ao seguir as orientações abaixo, muitos conjuntos de anúncios que usam multiplicadores de lances podem ser migrados facilmente para as regras de valor. As seções a seguir também destacam áreas em que as regras de valor funcionam de maneira diferente dos multiplicadores de lances e oferecem conselhos sobre como fazer a tradução entre os dois produtos.

Esta seção considera que você já tem alguma familiaridade com os conceitos e o uso de multiplicadores de lances. Consulte a seção [**Como usar multiplicadores de lances**](#howto) para saber mais sobre isso.

### Como criar conjuntos de regras de valor

Esta seção demonstra como criar regras de valor do zero. Se você tiver interesse em migrar diretamente seus conjuntos de anúncios existentes que usam multiplicadores de lances para regras de valor, pule para a seção [API de tradução](#value_rules_translate) para ver instruções sobre como usar nossas APIs de migração automatizada.

Diferentemente dos multiplicadores de lances, que exigem que cada conjunto de anúncios seja configurado com sua própria configuração de [**conjunto de parâmetros de multiplicador de lances**](#bid_multiplier_parameter_set), as **regras de valor** permitem criar **conjuntos de regras de valor** na sua conta de anúncios. Depois de criado, cada **conjunto de regras de valor** pode ser anexado a qualquer número de conjuntos de anúncios.

A primeira etapa para usar regras de valor é criar um **conjunto de regras de valor**. Isso pode ser feito usando o Gerenciador de Anúncios ou a API de Marketing.

-   Para criar conjuntos de regras de valor usando o Gerenciador de Anúncios, acesse a [página de configurações de publicidade das regras de valor](https://adsmanager.facebook.com/adsmanager/manage/advertising_settings/value_adjustment_rule)
    
-   Para criar conjuntos de regras de valor usando a API de Marketing, consulte a [documentação da API de regras de valor](/docs/marketing-api/bidding/value-rules)
    

O seguinte exemplo de chamada de API, retirado da [documentação da API de regras de valor](/docs/marketing-api/bidding/value-rules#create-a-value-rule-set), mostra como criar um **conjunto de regras de valor** usando a API de Marketing.

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/value_rule_set \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My Value Rule Set",
    "rules": [
      {
        "name": "High age and gender",
        "adjust_sign": "INCREASE",
        "adjust_value": 20,
        "criterias": [
          {
            "criteria_type": "AGE",
            "operator": "CONTAINS",
            "criteria_values": [
              "18-24"
            ],
            "criteria_value_types": [
              "NONE"
            ]
          },
          {
            "criteria_type": "GENDER",
            "operator": "CONTAINS",
            "criteria_values": [
              "MALE"
            ],
            "criteria_value_types": [
              "NONE"
            ]
          }
        ]
      },
      {
        "name": "High bid for OS",
        "adjust_sign": "INCREASE",
        "adjust_value": 20,
        "criterias": [
          {
            "criteria_type": "OS_TYPE",
            "operator": "CONTAINS",
            "criteria_values": [
              "ANDROID"
            ],
            "criteria_value_types": [
              "NONE"
            ]
          }
        ]
      }
    ]
  }'
```

A resposta a essa chamada de API incluirá a **identificação do conjunto de regras de valor**. Salve essa identificação, pois ela será necessária para a próxima etapa.

### Como atribuir regras de valor a conjuntos de anúncios

Depois que um **conjunto de regras de valor** é criado, ele deve ser anexado a um conjunto de anúncios para ajustar os lances para esse conjunto de anúncios. Para vincular um conjunto de regras de valor a um conjunto de anúncios, use o Gerenciador de Anúncios para editar o conjunto de anúncios. No editor de conjuntos de anúncios, a configuração de regras de valor está localizada na seção **Conversão**. Marque a caixa "Aplicar um conjunto de regras" e selecione o conjunto de regras no menu suspenso abaixo.

Como alternativa, as regras de valor podem ser anexadas a conjuntos de anúncios usando a API de Marketing.

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID> \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "value_rule_set_id": "<VALUE_RULE_SET_ID>",
    "value_rules_applied": true
  }'
```

O `VALUE_RULE_SET_ID` é a identificação retornada pela chamada de API para criar o conjunto de regras de valor.

Um conjunto de anúncios pode usar multiplicadores de lances ou regras de valor, mas não ambos. Se a chamada de API acima for invocada para um conjunto de anúncios que já usa multiplicadores de lances, será retornado um erro. A próxima seção mostra como um conjunto de anúncios que usa multiplicadores de lances pode ser migrado para regras de valor sem interrupção da veiculação de anúncios.

### Como migrar conjuntos de anúncios de multiplicadores de lances para regras de valor

Um conjunto de anúncios não pode usar multiplicadores de lances e regras de valor ao mesmo tempo. Para migrar um conjunto de anúncios de multiplicadores de lances para regras de valor, o **conjunto de parâmetros de multiplicadores de lances** precisará ser excluído no momento da vinculação das regras de valor ao conjunto de anúncios. A chamada de API a seguir mostra como modificar um conjunto de anúncios, anexando simultaneamente um **conjunto de regras de valor** enquanto exclui seu **conjunto de parâmetros de multiplicador de lance**.

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID> \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "bid_adjustments": {},
    "value_rule_set_id": "<VALUE_RULE_SET_ID>",
    "value_rules_applied": true
  }'
```

Observe o objeto vazio `{}` passado como valor para o campo `bid_adjustments`. Esse argumento faz com que o **conjunto de parâmetros de multiplicador de lances** seja excluído. Esse método de exclusão de multiplicadores de lances só é compatível ao anexar regras de valor. A menos que esteja anexando regras de valor, não é possível excluir multiplicadores de lances.

Depois que um conjunto de anúncios tiver sido migrado para as regras de valor, a exclusão do **conjunto de parâmetros de multiplicador de lances** não poderá ser revertida. Portanto, pode ser prudente primeiro [recuperar o parâmetro de multiplicador de lances](#read) no conjunto de anúncios antes de migrá-lo para as regras de valor. Salve esse conjunto de parâmetros de multiplicador de lances **recuperado** nos seus sistemas para migrar o conjunto de anúncios de volta para os multiplicadores de lances, se necessário.

Para migrar um conjunto de anúncios usando regras de valor de volta para multiplicadores de lances, primeiro remova o **conjunto de regras de valor** do conjunto de anúncios (o conjunto de regras de valor permanece na sua conta de anúncios e não é excluído). Isso pode ser feito usando o Gerenciador de Anúncios ou por meio da chamada de API a seguir.

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID> \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "value_rules_applied": false
  }'
```

Em seguida, use a [API de criação/atualização de multiplicadores de lances](#update) para aplicar novamente o **conjunto de parâmetros de multiplicador de lances** ao conjunto de anúncios.

### Conceitos das regras de valor

[A documentação da API de regras de valor](https://developers.facebook.com/docs/marketing-api/bidding/value-rules#create-a-value-rule-set) contém detalhes completos sobre a estrutura e a semântica de avaliação dos **conjuntos de regras de valor**. Esta seção serve como uma breve introdução aos conjuntos de regras de valor para usuários de multiplicadores de lances.

-   Um **conjunto de regras de valor** é uma coleção de segmentos de público e ajustes de lance associados, semelhante a um **conjunto de parâmetros de multiplicador de lances**. Diferentemente dos conjuntos de parâmetros de multiplicador de lances, que devem ser criados para cada conjunto de anúncios, um conjunto de regras de valor é salvo na sua conta de anúncios e pode ser anexado a vários conjuntos de anúncios. Cada conta de anúncios pode ter até 20 conjuntos de regras de valor.
    
-   Um **conjunto de regras de valor** contém de 1 a 10 regras. Cada **regra** contém um conjunto de **critérios**, especificando o segmento de público da regra, bem como um valor de **ajuste de lance** para o segmento de público.
    
-   Os multiplicadores de lances permitem um agrupamento complexo de categorias de público de modo a delimitar o segmento de público para cada ajuste de peso. Os **conjuntos de regras de valor** usam uma estrutura mais simples, sem agrupamentos. Todos os ajustes de lance são especificados em até 10 **regras** do conjunto de regras de valor. Para oferecer suporte à segmentação avançada de público, as **regras** permitem vários **critérios** por regra.
    
-   As **regras** em um conjunto de regras de valor são listadas em ordem de prioridade. As regras que aparecem primeiro na lista têm maior prioridade do que as que vêm depois. Se um usuário corresponder aos critérios de mais de uma regra, o ajuste de lance aplicado para esse usuário virá da regra correspondente mais antiga.
    
-   Cada **regra** em um conjunto de regras de valor contém de 1 a 4 **critérios**. Os critérios das regras de valor se enquadram em vários tipos, de modo semelhante às categorias de público dos multiplicadores de lances. Nem todas as categorias de público de multiplicadores de lances são compatíveis com as regras de valor. Consulte a tabela abaixo para ver uma lista de **tipos de critérios** de regras de valor e as categorias de público do multiplicador de lances correspondentes.
    
-   Dois **critérios** dentro da mesma regra não podem ter o mesmo **tipo de critério**.
    
-   Cada **critério** de regras de valor contém um ou mais **valores de critérios**. Os possíveis **valores de critérios** dependem do **tipo de critério**. Por exemplo, um critério do tipo `AGE` aceita valores de critérios como `18-24` e `65+`. É possível adicionar vários valores de critérios a um critério. Os critérios serão correspondentes se o usuário corresponder a qualquer um dos valores de critérios.
    
-   Ao contrário dos multiplicadores de lances, as regras de valor não permitem personalizar o peso padrão. O ajuste de lance padrão dos conjuntos de regras de valor é sempre **1.0**. Em vez disso, as regras de valor oferecem suporte para aumentar e diminuir o lance. As regras de valor oferecem suporte para diminuir o lance em **até 90%** e aumentar em **até 1000%**.
    
-   É necessário um nome ao criar um **conjunto de regras de valor**. Os nomes também são necessários para cada **regra** no conjunto de regras de valor. Isso permite identificar facilmente os conjuntos de regras de valor ao anexá-los a conjuntos de anúncios, além da segmentação por regras em áreas de relatórios.
    

**Tipos de critérios de regras de valor**

Tipo de critério de regra de valor

Categoria de público de multiplicadores de lances

`AGE`

[`age`](#age)

`DEVICE_PLATFORM`

[`device_platform`](#device_platform)

`GENDER`

[`gender`](#gender)

`LOCATION`

[`home_location`](#home_location)

`OMNI_CHANNEL`

Não está disponível em multiplicadores de lances

`PLACEMENT`

[`position_type`](#position_type), [`publisher_platform`](#publisher_platform)

`OS_TYPE`

[`user_os`](#user_os)

As categorias de público `position_type` e `publisher_platform` dos multiplicadores de lances correspondem ao tipo de critério `PLACEMENT` nas regras de valor. Consulte as seções [publisher\_platform](#publisher_platform) e [position\_type](#position_type) para saber como traduzir essas categorias de público em regras de valor.

Além dos tipos de critérios correspondentes a categorias de público de multiplicadores de lances, as regras de valor oferecem suporte a um novo tipo de critério, `OMNI_CHANNEL`, que pode ser usado para especificar a localização da conversão do anúncio. Os exemplos de **valores de critérios** para o tipo de critério `OMNI_CHANNEL` incluem `WEBSITE` e `APP`.

### Limitações das regras de valor

-   As regras de valor são compatíveis com os seguintes tipos de critérios: idade, plataforma do dispositivo, gênero, localização, omnichannel, posicionamento e tipo de SO. As categorias de público do multiplicador de lances que não correspondem a um dos tipos de critérios mencionados não são compatíveis com as regras de valor.
    
-   Cada conta de anúncios pode ter no máximo 20 conjuntos de regras. Cada conjunto de regras pode ter no máximo 10 regras. Cada regra pode ter no máximo 4 critérios.
    
-   No momento, apenas os conjuntos de anúncios que usam a estratégia de lances `LOWEST_COST_WITHOUT_CAP` (também conhecida como lances automáticos) são compatíveis com as regras de valor. As estratégias de lance manual, como a meta de custo por resultado, a meta de ROAS ou o limite de lance, não são compatíveis com as regras de valor.
    
-   Os conjuntos de anúncios que usam a meta de desempenho `RETURN_ON_AD_SPEND` (também conhecida como a meta de desempenho Maximizar o valor das conversões) não são compatíveis com as regras de valor.
    
-   Em campanhas de moradia, emprego e crédito, não é permitido o uso dos tipos de critérios de regras de valor `AGE` e `GENDER`, bem como de determinados tipos de localização para o tipo de critério `LOCATION`. Consulte [**Categoria de anúncio especial**](/docs/marketing-api/special-ad-category).
    
-   Os conjuntos de anúncios em campanhas que usam a otimização do orçamento da campanha (CBO) não devem migrar de multiplicadores de lances para regras de valor. O suporte aprimorado para campanhas de CBO está chegando em breve para as regras de valor.
    

Se você tiver um conjunto de anúncios que não possa ser migrado para regras de valor devido a uma das limitações acima, consulte orientações específicas para cada cenário abaixo.

#### Uso do multiplicador de lances com a otimização do orçamento da campanha

Em 2026, implementaremos suporte aprimorado para o uso de regras de valor com orçamentos de campanha. Aguarde um anúncio sobre esse recurso antes de migrar conjuntos de anúncios com orçamento de campanha de multiplicadores de lances para regras de valor.

#### Multiplicadores de lances de público personalizado

No início de 2026, as regras de valor oferecerão suporte a um novo tipo de critério chamado rótulos de público. Algumas estratégias de lances atualmente baseadas em públicos personalizados serão compatíveis com os rótulos de público. Esse recurso de regras de valor está atualmente na versão beta fechada e será disponibilizado para todos em breve.

#### Uso do multiplicador de lances com a meta de desempenho Maximizar o valor das conversões

Em breve, as regras de valor serão compatíveis com conjuntos de anúncios com a meta de desempenho Maximizar o valor das conversões (conhecida como `RETURN_ON_AD_SPEND` na API). Aguarde nosso anúncio desse recurso antes de migrar conjuntos de anúncios que usam otimização de valor de multiplicadores de lances para regras de valor.

#### Uso do multiplicador de lances com a estratégia de lances da meta de custo por resultado

Em 2026, as regras de valor serão compatíveis com a estratégia da meta de custo por resultado. Aguarde nosso anúncio desse recurso antes de migrar conjuntos de anúncios que usam a estratégia da meta de custo por resultado de multiplicadores de lances para regras de valor.

#### Uso do multiplicador de lances com a estratégia de lances de limite de lance

Não planejamos tornar as regras de valor compatíveis com a estratégia de limite de lance. Considere migrar seus conjuntos de anúncios de limite de lance para a meta de custo por resultado. Depois de migrar para a meta de custo por resultado, o conjunto de anúncios poderá ser migrado para as regras de valor assim que a estratégia da meta de custo por resultado ficar disponível nas regras de valor, em algum momento de 2026.

#### Multiplicador de lances com categoria de público incompatível

Além dos rótulos de público, que terão algumas das mesmas funções que a categoria de público personalizado nos multiplicadores de lances, não planejamos adicionar mais tipos de critérios às regras de valor. Se o conjunto de parâmetros do multiplicador de lances fizer uso de uma das categorias de público incompatíveis, como grupo de usuários ou idioma, as regras de valor não conseguirão expressar a mesma segmentação de público. Considere se a sua estratégia de lances pode ser simplificada para que a segmentação de público baseada em categorias de público incompatíveis possa ser eliminada. Se isso for possível, as regras de valor podem ser usadas para implementar sua estratégia de lances simplificada.

### Como traduzir multiplicadores de lances em regras de valor

Para ajudar você a migrar dos multiplicadores de lances para as regras de valor, criamos uma API de tradução que produz automaticamente um conjunto de regras de valor com segmentação e ajustes equivalentes ao seu conjunto de parâmetros de multiplicadores de lances existentes. As instruções para usar a API de tradução estão abaixo. Estaremos implementando aos poucos a API de tradução para anunciantes que usam multiplicadores de lances nos próximos dias. Se as instruções abaixo não funcionarem para você, aguarde alguns dias até que o lançamento seja concluído.

Devido às [limitações das regras de valor](#value_rules_limits), nem todos os conjuntos de parâmetros de multiplicadores de lances podem ser traduzidos automaticamente para conjuntos de regras de valor. Se a API de tradução não conseguir fornecer uma tradução automática para seu caso de uso, você ainda poderá criar um conjunto de regras de valor que cubra uma parte da funcionalidade do seu conjunto de parâmetros de multiplicadores de lances. Consulte a seção [Tradução manual](#value_rules_translate_manual) abaixo para ver instruções sobre como realizar o processo de tradução por conta própria.

#### API de tradução

Para traduzir o conjunto de parâmetros de multiplicadores de lances de um conjunto de anúncios existente em um conjunto de regras de valor, faça a seguinte solicitação à API:

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/value_rule_set_translation \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "source": {
      "bid_multiplier_ad_set_id": <AD_SET_ID>
    }
  }'
```

O `AD_SET_ID` é a identificação do conjunto de anúncios que contém seu conjunto de parâmetros de multiplicadores de lances existente, e o `AD_ACCOUNT_ID` é a identificação da conta de anúncios que é dona desse conjunto de anúncios.

Se a solicitação for bem-sucedida, a API de tradução retornará um resultado semelhante ao seguinte:

```
{
  "success": true,
  "value_rule_set": {
    "name": "Migrated from Bid Multiplier specification",
    "rules": [
      {
        "name": "Migrated Rule #1 - Age - 20-40",
        "adjust_sign": "DECREASE",
        "adjust_value": 50,
        "criterias": [
          {
            "criteria_type": "AGE",
            "operator": "CONTAINS",
            "criteria_values": [
              "20-40"
            ],
            "criteria_value_types": [
              "NONE"
            ]
          }
        ]
      }
    ]
  }
}
```

O resultado da tradução está sob a chave `value_rule_set`. O objeto sob essa chave (começando com o símbolo de abertura `{` e terminando com o símbolo de fechamento correspondente `}`) pode ser salvo e reutilizado para a próxima parte do fluxo de migração descrito abaixo. Você também pode modificar a saída da tradução depois de salvá-la para ajustar a criação do seu conjunto de regras de valor.

Como alternativa a fornecer a identificação do conjunto de anúncios para o ponto de extremidade de tradução, você pode fornecer o próprio conjunto de parâmetros do multiplicador de lances. Essa solicitação de API é apresentada da seguinte forma:

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/value_rule_set_translation \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "source": {
      "bid_multiplier_parameter_set": {
        "gender": {
          "male": 0.5,
          "default": 1.0
        }
      }
    }
  }'
```

Isso pode ser útil se você quiser testar diferentes conjuntos de parâmetros de multiplicadores de lances na API de tradução e verificar como eles serão traduzidos em conjuntos de regras de valor.

#### Migrar conjuntos de anúncios usando o conjunto de regras de valor traduzido

A saída da API de tradução pode ser copiada e colada em uma solicitação à API para [criar o conjunto de regras de valor](#value_rules_create). Depois de criar o conjunto de regras de valor, outra solicitação à API pode ser feita para migrar o conjunto de anúncios de multiplicadores de lances para o conjunto de regras de valor recém-criado. Em vez de seguir esse processo de duas etapas, você pode usar o processo alternativo a seguir para concluir a migração em uma etapa.

Para migrar o conjunto de anúncios de multiplicadores de lances para regras de valor em uma única etapa, usando a saída da API de tradução, faça a seguinte solicitação à API:

```
curl -X POST \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID> \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "value_rules_spec": {
      "value_rule_set": <VALUE_RULE_SET_OBJECT>
    },
    "bid_adjustments": {}
  }'
```

O `AD_SET_ID` é a identificação do conjunto de anúncios que está sendo migrado. O `VALUE_RULE_SET_OBJECT` é o objeto sob a chave `value_rule_set` copiado da saída da API de tradução.

Se essa chamada de API for bem-sucedida, duas coisas acontecerão como resultado:

1.  Um novo conjunto de regras de valor será criado na conta de anúncios
2.  O conjunto de anúncios será migrado de multiplicadores de lances para o conjunto de regras de valor recém-criado

#### Como desduplicar conjuntos de regras de valor traduzidos

Uma conta de anúncios é limitada a 20 conjuntos de regras de valor. Portanto, evite criar conjuntos de regras de valor que sejam duplicatas uns dos outros. A criação de conjuntos de regras de valor duplicados pode ocorrer acidentalmente como resultado da migração de conjuntos de anúncios com conjuntos de parâmetros de multiplicadores de lances idênticos. Para ajudar a evitar essa situação, a API de tradução detecta possíveis duplicatas e retorna a identificação do conjunto de regras de valor existente se o resultado da tradução corresponder a um conjunto de regras de valor já existente. Quando isso acontecer, a saída da API de tradução será semelhante à seguinte:

```
{
  "success": true,
  "existing_value_rule_set_id": <VALUE_RULE_SET_ID>,
  "value_rule_set": {
    "name": "Migrated from Bid Multiplier specification",
    "rules": [
      {
        "name": "Migrated Rule #1 - Age - 20-40",
        "adjust_sign": "DECREASE",
        "adjust_value": 50,
        "criterias": [
          {
            "criteria_type": "AGE",
            "operator": "CONTAINS",
            "criteria_values": [
              "20-40"
            ],
            "criteria_value_types": [
              "NONE"
            ]
          }
        ]
      }
    ]
  }
}
```

A saída de tradução completa ainda é retornada para referência. No entanto, essa saída não deve ser usada diretamente. Em vez disso, use o `VALUE_RULE_SET_ID` sob a chave `existing_value_rule_set_id`. Esta é a identificação do conjunto de regras de valor na conta de anúncios que corresponde exatamente à saída da tradução (ignorando os nomes do conjunto de regras e das regras). Nesse caso, em vez de criar um novo conjunto de regras de valor, o conjunto de regras de valor existente pode ser usado e anexado ao conjunto de anúncios. Consulte a seção [API de anexação de regras de valor](#value_rules_migrate) para saber mais sobre como usar a identificação do conjunto de regras de valor existente.

### Como traduzir manualmente multiplicadores de lances em regras de valor

Esta seção contém explorações detalhadas das estruturas JSON das regras de valor para desenvolver algumas heurísticas de tradução de **conjuntos de parâmetros de multiplicador de lances** para **conjuntos de regras de valor**. Consulte a seção [Referência de categoria de público](#categories) para ver uma tabela de categorias de público do multiplicador de lances compatíveis com as regras de valor. Clique no nome de cada categoria de público compatível na tabela para ver exemplos de traduções dela em regras de valor.

#### Critérios

Os critérios são o menor bloco de construção dos conjuntos de regras de valor. Um critério contém um **tipo de critério** e um ou mais **valores de critério**, que devem ser valores válidos para o tipo de critério em questão. Além disso, existe a matriz `criteria_value_types`. Essa matriz deve ter o mesmo tamanho que a matriz `criteria_values`. Cada elemento nela corresponde exatamente a um elemento na matriz `criteria_values` com base na sua posição. Para a maioria dos tipos de critérios, os elementos da matriz `criteria_value_types` são sempre `NONE`. Para o tipo de critério `LOCATION`, os elementos da matriz `criteria_value_types` especificam o tipo de código de localização para cada elemento na matriz `criteria_values`.

**Exemplo de critérios de valor único**

```
{
  "criteria_type": "GENDER",
  "operator": "CONTAINS",
  "criteria_values": [
    "FEMALE"
  ],
  "criteria_value_types": [
    "NONE"
  ]
}
```

**Exemplo de critérios de vários valores**

```
{
  "criteria_type": "AGE",
  "operator": "CONTAINS",
  "criteria_values": [
    "18-24", "35-44"
  ],
  "criteria_value_types": [
    "NONE", "NONE"
  ]
}
```

**Exemplo de critérios de localização**

```
{
  "criteria_type": "LOCATION",
  "operator": "CONTAINS",
  "criteria_values": [
    "BR", "527"
  ],
  "criteria_value_types": [
    "LOCATION_COUNTRY", "LOCATION_REGION"
  ]
}
```

Consulte a [documentação da API de regras de valor](/docs/marketing-api/bidding/value-rules#the-criteria-parameter) para uma tabela completa de **valores de critérios** para cada **tipo de critério**.

#### Regra

As regras são formadas por um ou mais critérios. Além dos critérios, uma regra tem um nome, um **sinal de ajuste** e um **valor de ajuste**. Os valores possíveis para o sinal de ajuste são `INCREASE` e `DECREASE`.

Quando o sinal de ajuste é `INCREASE`, os valores possíveis para o intervalo de ajuste variam de **1** a **1.000**. Isso representa um aumento de 1% a 1.000% no lance.

Quando o sinal de ajuste é `DECREASE`, os valores possíveis para o intervalo de ajuste variam de **1** a **90**. Isso representa uma redução de 1% a 90% no lance.

**Exemplo de regra com 1 critério**

```
{
  "name": "Age rule 1",
  "adjust_sign": "DECREASE",
  "adjust_value": 30,
  "criterias": [
    {
      "criteria_type": "AGE",
      "operator": "CONTAINS",
      "criteria_values": [
        "18-24"
      ],
      "criteria_value_types": [
        "NONE"
      ]
    }
  ]
}
```

#### Conjunto de regras de valor

Os conjuntos de regras de valor são compostos por uma ou mais regras. Além das regras, um conjunto de regras de valor também tem um nome. As regras no conjunto de regras de valor são avaliadas na ordem. Quando um usuário corresponde a uma regra, a avaliação é interrompida nessa regra e ele recebe o ajuste de lance dela. As regras que aparecem mais abaixo na lista são ignoradas assim que uma correspondência é vinculada.

**Exemplo de conjunto de regras de valor com duas regras**

```
{
  "name": "My Value Rule Set",
  "rules": [
    {
      "name": "Age rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "18-24"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Age rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 20,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

#### Traduzir um conjunto simples de parâmetros de multiplicadores de lances

A primeira etapa do processo de tradução é recuperar o **conjunto de parâmetros de multiplicador de lances** existente. Consulte a seção [Como ler multiplicadores de lances de conjuntos de anúncios](#read) para a chamada de API necessária para essa etapa. Depois que o conjunto de parâmetros de multiplicador de lances for recuperado, siga as etapas nesta seção para traduzi-lo para um **conjunto de regras de valor**.

Começamos com o tipo mais simples de conjunto de parâmetros de multiplicador de lances para traduzir: um conjunto de parâmetros contendo uma única categoria de público, com um peso padrão de 1,0. Um exemplo é o conjunto de parâmetros abaixo:

```
{
  "age": {
    "18-24": 0.7,
    "25-34": 0.8,
    "default": 1.0
  }
}
```

O peso `default` também pode ser omitido do conjunto de parâmetros. Um peso padrão omitido é equivalente a um peso padrão de **1,0**.

Cada valor de parâmetro não padrão pode ser traduzido em uma regra com um critério. A categoria de público, juntamente com o valor do parâmetro, determina os critérios da regra de valor, enquanto o valor do peso determina o ajuste da regra de valor. Para o exemplo acima, duas regras são produzidas, cada uma com um critério `AGE`. O resultado traduzido é o seguinte.

```
{
  "name": "My Value Rule Set",
  "rules": [
    {
      "name": "Age rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "18-24"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Age rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 20,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

Haverá uma pequena complicação se o peso padrão no conjunto de parâmetros não for 1,0, como no exemplo a seguir:

```
{
  "age": {
    "18-24": 0.7,
    "25-34": 0.8,
    "default": 0.5
  }
}
```

As regras de valor são compatíveis apenas com o ajuste padrão de 1,0. Para traduzir o conjunto de parâmetros acima em regras de valor, precisamos dimensionar todos os pesos de tal forma que o peso padrão seja 1,0. Isso pode fazer com que alguns pesos excedam 1,0, o que não é um problema, pois as regras de valor são compatíveis com aumentos e diminuições de lances. Depois de ajustar os pesos, chegamos ao seguinte:

```
{
  "age": {
    "18-24": 1.4,
    "25-34": 1.6,
    "default": 1.0
  }
}
```

O conjunto de parâmetros de multiplicador de lances acima não é mais válido porque os pesos excedem 1,0. Ele serve apenas como uma fonte para informar a tradução em regras de valor. O conjunto de regras de valor traduzido fica conforme segue.

```
{
  "name": "My Value Rule Set",
  "rules": [
    {
      "name": "Age rule 1",
      "adjust_sign": "INCREASE",
      "adjust_value": 40,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "18-24"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Age rule 2",
      "adjust_sign": "INCREASE",
      "adjust_value": 60,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

#### Traduza o conjunto de parâmetros de multiplicador de lances aninhados

Em um conjunto de parâmetros de multiplicador de lances, é possível restringir um segmento de público usando várias categorias de público, ao agrupar uma categoria de público sob o parâmetro de outra. No exemplo abaixo, a faixa etária de 25 a 34 anos é refinada em dois segmentos: homens de 25 a 34 anos e mulheres de 25 a 34 anos.

```
{
  "age": {
    "18-24": 0.7,
    "25-34": {
      "gender": {
        "male": 0.9,
        "female": 0.95,
        "default": 1.0
      }
    },
    "default": 1.0
  }
}
```

Não há agrupamento em conjuntos de regras de valor. Em vez disso, cada regra em um conjunto de regras de valor oferece suporte diretamente a vários critérios. Para traduzir exemplos como o acima em regras de valor, comece na parte superior do documento JSON e prossiga para baixo. Sempre que um peso é encontrado, uma nova regra é adicionada ao conjunto de regras de valor traduzidas. Para determinar os critérios a serem incluídos na regra traduzida, examine todas as categorias de público e valores de parâmetros a que um usuário precisa corresponder para chegar a esse peso. Essas categorias de público e valores de parâmetros se tornam os tipos de critérios e os valores de critérios na regra.

Para o exemplo acima, começando de cima, o primeiro peso alcançado é **0,7**. Esse peso se destina a um segmento de público com idade entre 18 e 24 anos. Portanto, a primeira regra no conjunto de regras de valor traduzido é uma regra com um único critério `AGE`, além de um valor de critério de `18-24`.

O segundo peso alcançado é **0,9**. Esse peso se destina a um segmento de público de homens com idade entre 25 e 34 anos. A segunda regra no conjunto de regras de valor traduzido é uma regra com dois critérios: um critério `AGE` com valor `25-34` e um critério `GENDER` com valor de critério de `MALE`.

O terceiro peso alcançado é **0,95**. Esse peso se destina a um segmento de público de mulheres com idade entre 25 e 34 anos. A terceira regra no conjunto de regras de valor traduzido é uma regra com dois critérios: um critério `AGE` com valor `25-34` e um critério `GENDER` com valor de critério de `FEMALE`.

Todos os pesos restantes na especificação do parâmetro são pesos padrão de **1,0**, que não precisam ser traduzidos. Portanto, o conjunto de regras de valor final contém três regras.

```
{
  "name": "My Value Rule Set",
  "rules": [
    {
      "name": "Age rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "18-24"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Age and gender rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 10,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        },
        {
          "criteria_type": "GENDER",
          "operator": "CONTAINS",
          "criteria_values": [
            "MALE"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Age and gender rule 3",
      "adjust_sign": "DECREASE",
      "adjust_value": 5,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        },
        {
          "criteria_type": "GENDER",
          "operator": "CONTAINS",
          "criteria_values": [
            "FEMALE"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

[](#)

## Como usar multiplicadores de lances

-   Os multiplicadores de lances são especificados para cada conjunto de anúncios. Para usar multiplicadores de lances, crie primeiro um conjunto de anúncios usando o **Gerenciador de Anúncios** ou a **API de Marketing**. Depois, use a **API de multiplicadores de lances** descrita neste documento para criar multiplicadores de lances para o conjunto de anúncios.
    
-   Para configurar multiplicadores de lances para um conjunto de anúncios, primeiro crie um **conjunto de parâmetros de multiplicadores de lances**. Um conjunto de parâmetros de multiplicadores de lances é um documento JSON estruturado com uma ou mais **categorias de público**, **valores de parâmetros** e **pesos**.
    
-   Em um **conjunto de parâmetros de multiplicadores de lances**, o **peso** é o multiplicador aplicado ao lance para o valor do parâmetro especificado na categoria de público especificada. O peso pode variar de `0.09` a `1.0`.
    
-   Os multiplicadores de lances fazem parte do campo `bid_adjustments` em um conjunto de anúncios. No campo `bid_adjustments`, o **conjunto de parâmetros de multiplicadores de lances** é especificado sob a chave `user_groups`.
    

### Como criar ou atualizar multiplicadores de lances para um conjunto de anúncios

Para criar ou atualizar multiplicadores de lances para um conjunto de anúncios, faça um pedido **POST** para o ponto de extremidade do conjunto de anúncios, informando o **conjunto de parâmetros de multiplicadores de lances** sob a chave `user_groups` no campo `bid_adjustments`.

```
curl -X POST \
  -F 'bid_adjustments={"user_groups": <BID_MULTIPLIER_PARAMETER_SET>}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

Por exemplo, a chamada de API abaixo configura multiplicadores de lances que aplicam diferentes pesos a diferentes grupos de usuários a partir das fontes de eventos fornecidas.

```
curl -X POST \
  -F 'bid_adjustments={
       "user_groups": {
         "user_bucket": {
           "event_sources": [
             "<PIXEL_ID>",
             "<APP_ID>"
           ],
           "1": 0.1,
           "2": 0.2,
           "3": 0.3,
           "default": 0.4
         }
       }
     }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

### Como ler multiplicadores de lances de conjuntos de anúncios

Para ler os multiplicadores de lances existentes em um conjunto de anúncios, faça um pedido **GET** para o ponto de extremidade do conjunto de anúncios, especificando o campo `bid_adjustments` no parâmetro de consulta `fields`.

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>?fields=bid_adjustments
```

O resultado será semelhante ao seguinte. O conjunto de parâmetros de multiplicadores de lances pode ser devolvido como uma string com aspas duplas, com sequências de escape no interior. Você pode usar um analisador de string para JSON a fim de recuperar o documento JSON estruturado.

```
{
  "bid_adjustments": {
    "user_groups": "{\"age\":{\"default\":0.8,\"18-24\":0.5}}"
  },
  "id": "<BID_ADJUSTMENTS_ID>"
}
```

### Conjunto de parâmetros de multiplicadores de lances

O **conjunto de parâmetros de multiplicadores de lances** é um documento JSON estruturado usado para configurar multiplicadores de lances para um conjunto de anúncios. Um conjunto de parâmetros de multiplicadores de lances contém exatamente uma categoria de público raiz, com um ou mais valores de parâmetro sob a categoria de público raiz. Cada valor de parâmetro é associado a um peso ou a um conjunto de parâmetros de multiplicadores de lances aninhados que contém outra categoria de público. A categoria de público raiz pode especificar opcionalmente um valor de parâmetro `default` que pode ser associado a um peso ou a um conjunto de parâmetros de multiplicadores de lances aninhados. Se um valor de parâmetro `default` não for especificado, será usado um peso padrão de **1,0**.

```
{
  <AUDIENCE_CATEGORY>: {
    <PARAMETER_VALUE_1>: <WEIGHT or NESTED_BID_MULTIPLIER_PARAMETER_SET>,
    <PARAMETER_VALUE_2>: <WEIGHT or NESTED_BID_MULTIPLIER_PARAMETER_SET>,
    <PARAMETER_VALUE_3>: <WEIGHT or NESTED_BID_MULTIPLIER_PARAMETER_SET>,
    ...
    "default": <WEIGHT or NESTED_BID_MULTIPLIER_PARAMETER_SET>, // optional, if not specified, 1.0 will be used
  }
}
```

As categorias de público incluem, entre outras:

-   `age`
    
-   `gender`
    
-   `device_platform`
    
-   `publisher_platform`
    
-   `user_device`
    
-   `user_os`
    

Consulte a seção [Referência da categoria de público](#categories) para ver uma lista completa de categorias de público.

**Exemplo simples**

```
{
  "age": {
    "18-24": 0.7,
    "25-34": 1.0,
    "default": 0.3
  }
}
```

-   Para usuários entre 18 e 24 anos, aplique o peso 0,7
    
-   Para usuários entre 25 e 34 anos, aplique o peso 1,0
    
-   Para todos os outros usuários, aplique o peso 0,3
    

**Exemplo com várias categorias de público**

```
{
  "age": {
    "18-24": 0.7,
    "25-34": {
      "gender": {
        "male": 0.9,
        "female": 1.0
      }
    },
    "default": 0.85
  }
}
```

-   Para usuários entre 18 e 24 anos, aplique o peso 0,7
    
-   Para usuários do sexo masculino entre 25 e 34 anos, aplique o peso 0,9
    
-   Para usuárias do sexo feminino entre 25 e 34 anos, aplique o peso 1,0
    
-   Para todos os outros usuários, aplique o peso 0,85
    

**Exemplo com categoria de público aninhada em posição padrão**

```
{
  "age": {
    "18-24": 0.7,
    "25-34": 0.9,
    "default": {
      "gender": {
        "male": 0.3,
        "female": 0.4
      }
    }
  }
}
```

-   Para usuários entre 18 e 24 anos, aplique o peso 0,7
    
-   Para usuários entre 25 e 34 anos, aplique o peso 0,9
    
-   Para usuários do sexo masculino de qualquer outra idade, aplique o peso 0,3
    
-   Para usuárias do sexo feminino de qualquer outra idade, aplique o peso 0,4
    
-   Para todos os outros usuários, aplique o peso 1,0 (padrão implícito)
    

[](#)

## Referência da categoria de público

A tabela a seguir apresenta as categorias de público que podem ser especificadas em um **conjunto de parâmetros de multiplicadores de lances**. As categorias de público são definidas com base nas informações demográficas e no dispositivo do usuário, bem como nos dados de posicionamento do anúncio e nos dados personalizados do anunciante. Clique em cada nome de categoria de público para navegar até uma lista detalhada de valores de parâmetro possíveis para ela. Não é possível atribuir pesos em campanhas de anúncios de crédito, emprego ou moradia nas categorias de público [`age`](#age), [`gender`](#gender), [`locale`](#locale), [`home_location`](#home_location), [`user_bucket`](#user_bucket) e [`custom_audience`](#custom_audience) de público semelhante (um público personalizado com origem em um público semelhante).

Categoria de público

Descrição

Tipo de critério de regra de valor

[`age`](#age)

Faça lances de maneira diferente com base na idade ou na faixa etária. (Indisponível para campanhas de anúncios de crédito, emprego ou moradia.)

`AGE`

[`booking_window`](#booking_window)

Faça lances de maneira diferente com base no número de dias até o início da viagem.

Não compatível nas regras de valor

[`custom_audience`](#custom_audience)

Faça lances com base no `custom_audience` do qual o usuário faz parte. Públicos semelhantes são compatíveis com essa opção, exceto em campanhas de anúncios de crédito, emprego ou moradia.

Não compatível nas regras de valor

[`device_platform`](#device_platform)

Faça lances de maneira diferente com base na plataforma de dispositivos do usuário, como móvel ou desktop.

`DEVICE_PLATFORM`

[`gender`](#gender)

Faça lances de maneira diferente com base no gênero. (Indisponível para campanhas de anúncios de crédito, emprego ou moradia.)

`GENDER`

[`home_location`](#home_location)

Defina o lance com base nas localizações do usuário, incluindo a localização de casa configurada, assim como quaisquer localizações recentes. Esse multiplicador será aplicado se a localização do usuário ou qualquer uma de suas localizações recentes corresponder ao parâmetro fornecido. O multiplicador `home_location` pode ser dividido em cidades, regiões e países. (Indisponível para campanhas de anúncios de crédito, emprego ou moradia.)

`LOCATION`

[`length_of_stay`](#length_of_stay)

Faça lances com base no número de dias entre o início e o fim da viagem.

Não compatível nas regras de valor

[`locale`](#locale)

Faça lances de maneira diferente com base no idioma da localidade, como inglês ou espanhol. (Indisponível para campanhas de anúncios de crédito, emprego ou moradia.)

Não compatível nas regras de valor

[`position_type`](#position_type)

Faça lances com base no posicionamento de exibição de um anúncio. Por exemplo, `facebook_feed`, `facebook_marketplace` ou `instagram_story`.

`PLACEMENT`

[`publisher_platform`](#publisher_platform)

Faça lances com base na `publisher_platform` (como `facebook`, `instagram`, `audience_network`, `messenger`).

`PLACEMENT`

[`travel_start_date`](#travel_start_date)

Faça lances de maneira diferente com base na data em que a viagem inicia. Por exemplo, `20181231` é 31 de dezembro de 2018.

Não compatível nas regras de valor

[`travel_start_day_of_week`](#travel_start_day_of_week)

Faça lances com base no dia da semana em que a viagem inicia. `0` é segunda-feira e `6` é domingo.

Não compatível nas regras de valor

[`user_bucket`](#user_bucket)

Faça lances com base no valor de `user_bucket` definido no disparo do pixel ou no evento do app do anunciante. O campo `user_bucket` é um parâmetro opcional expresso em um número inteiro entre 0 e 100. (Observações: 1. Indisponível para campanhas de anúncios de crédito, emprego ou moradia. 2. Disponível apenas para hotéis (ou seja, quando `content_type`\="hotel").

Não compatível nas regras de valor

[`user_device`](#user_device)

Faça lances com base no `user_device`, como iPhone.

Não compatível nas regras de valor

[`user_os`](#user_os)

Faça lances com base no `user_os`, como iOS ou Android.

`OS_TYPE`

[`user_recency`](#user_recency)

Faça lances com base em quando o usuário visitou o site ou app pela última vez.

Não compatível nas regras de valor

### `age`

Agrupe os usuários por faixas etárias (como `18-25`, `26-35`). A idade mínima que pode ser especificada é 18 anos. As faixas etárias não devem se sobrepor.

**Exemplo**

```
{
  "age": {
    "18-24": 0.5,
    "25-34": 0.7,
    "default": 1.0
  }
}
```

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
     {"user_groups":{"age":{"18-24":0.5,"25-34":0.7,"default":1.0}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 50,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "18-24"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "AGE",
          "operator": "CONTAINS",
          "criteria_values": [
            "25-34"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `booking_window`

Os possíveis valores de parâmetros incluem qualquer intervalo de números inteiros maior ou igual a 1. Por exemplo, `1-3`, `4-9` e assim por diante.

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
     {"user_groups":{"booking_window":{"event_sources":["123456789"],"1-2":0.1,"3-5":0.2,"default":0.5}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

### `custom_audience`

Desde 30 de janeiro de 2023, anúncios que usam um multiplicador de lances com categorias de dados de terceiros, como `booking_window`, `custom_audience` (incluindo públicos personalizados semelhantes), `lengthofstay`, `travelstartdate`, `travelstartdayofweek`, `user_recency` e `user_bucket`, não serão mais veiculados aos usuários que recusaram o recurso.

Você pode ajustar os lances com base nos seus públicos personalizados.

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
     {"user_groups":{"custom_audience":{"<CUSTOM_AUDIENCE_ID>":0.8, "<CUSTOM_AUDIENCE_ID>":1.0, "default":0.5}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

Se um usuário pertencer a vários públicos personalizados, o ajuste de lance mais relevante será aplicado.

### `device_platform`

Valores de parâmetro possíveis:

Descrição

Valor do parâmetro do multiplicador de lances

Valor de critério de regra de valor

Dispositivos móveis

`mobile`

`MOBILE`

Desktop

`desktop`

`DESKTOP`

**Exemplo**

```
{
  "device_platform": {
    "mobile": 0.7,
    "desktop": 0.9
  }
}
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "DEVICE_PLATFORM",
          "operator": "CONTAINS",
          "criteria_values": [
            "MOBILE"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 10,
      "criterias": [
        {
          "criteria_type": "DEVICE_PLATFORM",
          "operator": "CONTAINS",
          "criteria_values": [
            "DESKTOP"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `gender`

Valores de parâmetro possíveis:

Descrição

Valor do parâmetro do multiplicador de lances

Valor de critério de regra de valor

Feminino

`female`

`FEMALE`

Masculino

`male`

`MALE`

**Exemplo**

```
{
  "gender": {
    "male": 0.5,
    "female": 0.7,
    "default": 1.0
  }
}
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 50,
      "criterias": [
        {
          "criteria_type": "GENDER",
          "operator": "CONTAINS",
          "criteria_values": [
            "MALE"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "GENDER",
          "operator": "CONTAINS",
          "criteria_values": [
            "FEMALE"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `home_location`

Valores de parâmetro possíveis:

-   `city id`
    
-   `region id`
    
-   Código do país com dois dígitos
    

Você pode encontrar `city id` e `region id` na [API de Pesquisa](/docs/marketing-api/targeting-search/). Para fazer consultas, use o [Explorador da Graph API](/tools/explorer/) ou seu terminal.

**Observação:** o `default` pode ser definido apenas em `home_location`, e não em `cities`, `regions` nem `countries`.

**Exemplo**

```
{
  "home_location": {
    "cities": {
      "2420605": 0.2
    },
    "regions": {
      "3847": 0.5
    },
    "countries": {
      "US": 0.2
    },
    "default": 0.8
  }
}
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 75,
      "criterias": [
        {
          "criteria_type": "LOCATION",
          "operator": "CONTAINS",
          "criteria_values": [
            "2420605"
          ],
          "criteria_value_types": [
            "LOCATION_CITY"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 38,
      "criterias": [
        {
          "criteria_type": "LOCATION",
          "operator": "CONTAINS",
          "criteria_values": [
            "3847"
          ],
          "criteria_value_types": [
            "LOCATION_REGION"
          ]
        }
      ]
    },
    {
      "name": "Rule 3",
      "adjust_sign": "DECREASE",
      "adjust_value": 75,
      "criterias": [
        {
          "criteria_type": "LOCATION",
          "operator": "CONTAINS",
          "criteria_values": [
            "US"
          ],
          "criteria_value_types": [
            "LOCATION_COUNTRY"
          ]
        }
      ]
    }
  ]
}
```

### `length_of_stay`

Os possíveis valores de parâmetros incluem qualquer intervalo de números inteiros maior ou igual a 1. Por exemplo, `“1-3”`, `“4-9”` e assim por diante.

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
     {"user_groups":{"length_of_stay":{"event_sources":["123456789"],"1-2":0.1,"3-5":0.2,"default":0.5}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

### `locale`

Você pode usar identificações de localidade ou de grupo de localidades, como `6` para inglês dos EUA ou `5` para alemão.

Encontre os IDs de localidade com a [Pesquisa de direcionamento: Locais](/docs/marketing-api/targeting-search#locale) usando `type=adlocale`.

**Exemplo**

```
{
  "locale": {
    6: 0.8,
    5: 0.3
  }
}
```

### `position_type`

Essa categoria é semelhante às opções de posicionamento na [API de Direcionamento](/docs/marketing-api/targeting-specs/#placement). Valores de parâmetro possíveis:

Descrição

Valor do parâmetro do multiplicador de lances

Valor de critério de regra de valor

Feed do Facebook

`facebook_feed`

`FB_FEED`

Facebook Marketplace

`facebook_marketplace`

`FB_MARKETPLACE`

Feeds de vídeo do Facebook

`facebook_suggested_video`

Não compatível

Coluna da direita do Facebook

`facebook_right_hand_column`

Não compatível

Facebook Business Explore

`facebook_biz_disco_feed`

Não compatível

Feed do Instagram

`instagram_stream`

`IG_FEED`

Feed do perfil do Instagram

`instagram_profile_feed`

Não compatível

Explorar do Instagram

`instagram_explore`

`IG_EXPLORE`

Página inicial do Explorar do Instagram

`instagram_explore_home`

Não compatível

Caixa de entrada do Messenger

`messenger_messenger_home`

Não compatível

Instagram Stories

`instagram_story`

`IG_STORIES`

Facebook Stories

`facebook_story`

`FB_STORIES`

Messenger Stories

`messenger_story`

Não compatível

Instagram Reels

`instagram_reels`

`IG_REELS`

Facebook Reels

`facebook_facebook_reels`

`FB_REELS`

Vídeos in-stream do Facebook

`facebook_instream_video`

`FB_VIDEO`

Anúncios no Facebook Reels

`facebook_facebook_reels_overlay`

Não compatível

Resultados da pesquisa do Facebook

`facebook_search`

`FB_SEARCH`

Resultados da pesquisa do Instagram

`instagram_ig_search`

Não compatível

Mensagens patrocinadas no Messenger

Não compatível

Não compatível

Nativo, banner e intersticial do Audience Network

`audience_network_classic`

Não compatível

Vídeos com incentivo do Audience Network

`audience_network_rewarded_video`

Não compatível

Vídeos in-stream do Audience Network

Não compatível

Não compatível

**Exemplo**

```
{
  "position_type": {
    "facebook_feed": 0.9,
    "messenger_messenger_home": 0.7,
    "instagram_stream": 0.8,
    "audience_network_classic": 0.5,
    "default": 0.4
  }
}
```

**Conjunto de regras de valor (não é equivalente ao exemplo de multiplicadores de lances devido a valores de parâmetros incompatíveis)**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 50,
      "criterias": [
        {
          "criteria_type": "PLACEMENT",
          "operator": "CONTAINS",
          "criteria_values": [
            "FB_FEED"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "PLACEMENT",
          "operator": "CONTAINS",
          "criteria_values": [
            "FB_VIDEO"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `publisher_platform`

Valores de parâmetro possíveis:

Descrição

Valor do parâmetro do multiplicador de lances

Valor de critério de regra de valor

Facebook

`facebook`

`[FB_FEED, FB_STORIES, FB_REELS, FB_MARKETPLACE, FB_SEARCH, FB_VIDEO]`

Instagram

`instagram`

`[IG_FEED, IG_STORIES, IG_REELS, IG_EXPLORE]`

Audience Network

`audience_network`

`AUDIENCE_NETWORK`

Messenger

`messenger`

Não compatível

**Exemplo**

```
{
  "publisher_platform": {
    "facebook": 0.7,
    "instagram": 0.9,
    "default": 1.0
  }
}
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "PLACEMENT",
          "operator": "CONTAINS",
          "criteria_values": [
            "FB_FEED", "FB_STORIES", "FB_REELS", "FB_MARKETPLACE", "FB_SEARCH", "FB_VIDEO"
          ],
          "criteria_value_types": [
            "NONE", "NONE", "NONE", "NONE", "NONE", "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 10,
      "criterias": [
        {
          "criteria_type": "PLACEMENT",
          "operator": "CONTAINS",
          "criteria_values": [
            "IG_FEED", "IG_STORIES", "IG_REELS", "IG_EXPLORE"
          ],
          "criteria_value_types": [
            "NONE", "NONE", "NONE", "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `travel_start_date`

Os valores de parâmetros possíveis incluem qualquer intervalo de datas no formato `yyyymmdd-yyyymmdd`.

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
     {"user_groups":{"travel_start_date":{"event_sources":["123456789"],"20180901-20181001":0.2,"default":0.9}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

### `travel_start_day_of_week`

Os possíveis valores de detalhamento incluem qualquer número inteiro de 0 a 6. `0` é segunda-feira e `6` é domingo.

**Exemplo de chamada de API**

```
curl -X POST \
  -F 'bid_adjustments=
  {"user_groups":{"travel_start_day_of_week":{"event_sources":["123456789"],"0":0.1,"2":0.2,"6":0.3,"default":0.9}}}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>
```

### `user_bucket`

Você pode enviar os resultados do seu próprio classificador de usuários. Depois, envie um parâmetro `user_bucket` adicional em disparos de pixel ou eventos do app. Os grupos de usuários são números inteiros entre 0 e 100.

Especifique a definição do grupo de usuários com o seguinte formato:

-   `event_sources`: fonte do disparo do pixel ou evento do app para rastrear.
    
-   `event_retention`: opcional. Tempo, em segundos, para ignorar os valores `user_bucket` antigos.
    
-   `events_dedup_mode`: opcional. Sinalize para indicar qual valor `user_bucket` será usado quando uma única origem de evento envia valores `user_bucket` diferentes para o mesmo usuário. O valor padrão é `latest`.
    
-   `event_source_preference`: opcional. Sinalize para indicar qual `user_bucket` será usado quando várias origens de evento enviam valores `user_bucket` diferentes para o mesmo usuário. O valor padrão é `latest`.
    

**Exemplo**

```
{
  "user_bucket": {
    "event_sources": [<pixel_id>,<app_id>,...],
    "event_retention": 604800, // optional, exclude old events

    //optional, useful when multiple event sources have user_bucket
    "events_dedup_mode": "max"|"min"|"latest",

    //optional, dedup user_bucket values sent from one single event source
    "event_source_preference": "max"|"min"|"latest",

    "1": 0.7, // these are the bid multipliers
    "2": 1.0,
  }
}
```

### `user_device`

Valores de parâmetro possíveis:

-   `iPad`
    
-   `iPhone`
    

Confira outros valores possíveis na [API de Pesquisa de Direcionamento](/docs/reference/ads-api/get-autocomplete-data/#country_group) com `type=adTargetingCategory` e `class=user_device`.

**Exemplo**

```
{
  "user_device": {
    "iPad": 0.7,
    "iPhone": 0.9,
    "default": 1.0
  }
}
```

### `user_os`

Valores de parâmetro possíveis:

Descrição

Valor do parâmetro do multiplicador de lances

Valor de critério de regra de valor

Android

`Android`

`ANDROID`

Windows

`Windows`

Não compatível

Windows Phone

`Windows Phone`

Não compatível

iOS

`iOS`

`IOS`

Confira outros valores possíveis na [API de Pesquisa de Direcionamento](/docs/reference/ads-api/get-autocomplete-data/#country_group) com `type=adTargetingCategory` e `class=user_os`.

**Exemplo**

```
{
  "user_os": {
    "Android": 0.7,
    "iOS": 0.9,
    "default": 1.0
  }
}
```

**Conjunto de regras de valor equivalentes**

```
{
  "name": "Example",
  "rules": [
    {
      "name": "Rule 1",
      "adjust_sign": "DECREASE",
      "adjust_value": 30,
      "criterias": [
        {
          "criteria_type": "OS_TYPE",
          "operator": "CONTAINS",
          "criteria_values": [
            "ANDROID"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    },
    {
      "name": "Rule 2",
      "adjust_sign": "DECREASE",
      "adjust_value": 10,
      "criterias": [
        {
          "criteria_type": "OS_TYPE",
          "operator": "CONTAINS",
          "criteria_values": [
            "IOS"
          ],
          "criteria_value_types": [
            "NONE"
          ]
        }
      ]
    }
  ]
}
```

### `user_recency`

Agrupe usuários por tempo porque eles têm inicialização por pixel ou eventos do app. Você deve especificar quais origens de evento rastrear e as janelas de tempo.

**Exemplo**

```
{
  "user_recency": {
    "event_sources": [<pixel_id>,<app_id>,...],
    "0-86400": 1.0,
    "86401-172800": 0.7,
    "default": 0.5
  }
}
```

Este exemplo mostra como aplicar o multiplicador de lances `1.0` para usuários que têm um disparo de pixel ou eventos do app em `86400` segundos e assim por diante.

[](#)