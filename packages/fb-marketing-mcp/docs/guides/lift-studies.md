---
title: "Mensuração de Conversion Lift - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lift-studies"
scraped_at: "2026-02-01T13:59:55.106Z"
---

# Estudo de incrementalidade

No momento, a Mensuração de Conversion Lift está limitada. Entre em contato com seu representante da Meta para saber como obter acesso.

Crie e execute um experimento para mensurar a eficiência da sua campanha do Facebook. Determine qual estratégia de anúncios gera o maior impacto comercial. Consulte [Ad Study](/docs/marketing-api/reference/ad-study).

Ao criar um estudo de incrementalidade, um **grupo de teste** aleatório é gerado com contas da Central de Contas que veem seus anúncios, além de um **grupo de controle** com pessoas que não os veem.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/17433022_414854062233610_1617103479556276224_n.png?_nc_cat=104&ccb=1-7&_nc_sid=34156e&_nc_ohc=BVfAas9pyhsQ7kNvwEJgkLG&_nc_oc=Adkplas_SrSfBQ2Xvrk-GqKMl_k0VFsChfVNcAz2Co2j2jXu3zs_zBcX0mihSVGAPlRdqqX39ww9MlDpHboH8ah5&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Uu5SnhpX_hGa-WqBA5EEog&oh=00_AfvgK6e7Dgo6OP2h3qZUt7qS-A4OoCQKwSr8jHpV9aY3pw&oe=69853B6E)

É possível compartilhar com segurança os dados de conversão da sua campanha de anúncio por meio de [pixels do Facebook](/docs/facebook-pixel) ou [eventos do app](/docs/app-events). O Facebook determina o aumento nas conversões geradas com a sua campanha. Comparamos o número de conversões, as contas da Central de Contas que fizeram conversão e a receita de vendas disponível entre os grupos de teste e controle.

## Configurar estudos

Configure um estudo com um ou mais grupos, chamados de _células_. Quando você configura seu estudo, o Facebook torna o público para seus anúncios aleatório e atribui contas da Central de Contas ao grupo de teste ou de controle. Depois que você executa um estudo, o Facebook calcula a diferença entre os grupos de teste e de controle, para que você possa avaliar o impacto dos anúncios do Facebook em relação às suas metas comerciais.

Para configurar um estudo, faça uma chamada `POST`:

```
'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

É possível configurar um estudo com um grupo de teste único para ver como os anúncios do Facebook geram mais negócios. Também é possível configurar um estudo com [diversos grupos de teste](#multi_cell), o que permite identificar a **estratégia de publicidade** que funciona melhor com o público.

**Exemplo**: configurar um estudo de incrementalidade com um grupo de teste

cURL

```
curl \
  -F 'name="new study"' \
  -F 'description="description of my study"' \
  -F 'start_time=1435622400' \
  -F 'end_time=1436918400' \
  -F 'cooldown_start_time=1433116800' \
  -F 'observation_end_time=1438300800' \
  -F 'viewers=[<USER_ID1>, <USER_ID2>]' \
  -F 'type=LIFT' \
  -F 'cells=[{name:"test group",description:"description of my test group",treatment_percentage:90,control_percentage:10,adaccounts:[<ACCOUNT_ID1>,<ACCOUNT_ID2>]}]' \
  -F 'objectives=[{name:"new objective",is_primary:true,type:"CONVERSIONS",applications:[{id:<APP_ID>}]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

  

Para criar um novo estudo, forneça as seguintes informações:

Parâmetro

Descrição

`name`

O nome do estudo.

`description`

Uma breve descrição do objetivo do estudo.

`cooldown_start_time`

**Obsoleto**. O Facebook ainda faz a veiculação no tempo entre `observation_end_time` e `end_time`. Caso você use `cooldown_start_time`, será necessário definir o tempo por meio de `start_time`.

`start_time`

O horário de início do período ativo da campanha. **A hora de início do estudo deve estar no futuro.**

`end_time`

O horário de término do período ativo da campanha.

`observation_end_time`

Fim da _janela de conversão pós-teste_. Durante a janela (que ocorre entre `end_time` e `observation_end_time`), todos os anúncios do Facebook (incluindo aqueles adicionados a este estudo) são veiculados normalmente no grupo de teste e no de controle. No entanto, novos usuários não podem se conectar. Durante esse período, continuaremos fazendo a correspondência de conversões para usuários nos respectivos grupos. Se você não precisar de uma _janela de conversão pós-teste_, defina o recurso como `end_time`.

`cells`

As células no estudo que definem grupos de teste e de controle.

`objectives`

Os objetivos do estudo. Consulte [Definir os objetivos de publicidade](#objective).

`viewers`

Compartilhe este estudo em uma lista de IDs dos usuários do Facebook.

`type`

Para o Conversion Lift, o tipo deverá ser `LIFT`.

**RESTRIÇÕES**: após o início do estudo, não será possível atualizar `start_time` nem `treatment_percentage` das células. Também não será possível remover os objetos associados, como `adaccounts` ou `campaigns`, dos grupos de teste. Você ainda poderá atualizar `end_time` e `observation_end_time` para um horário futuro, se o estudo ainda não tiver terminado, e adicionar novos objetos associados aos grupos de teste.

Para executar Alcance e frequência em conjunto com a mensuração do aumento, configure um estudo de aumento primeiro e garanta que a duração do Alcance e frequência esteja dentro da duração do estudo.

[](#)

## Criar um grupo de teste

Para começar, defina quantas contas da Central de Contas receberão seus anúncios e quantas não receberão. Será necessário criar um grupo de teste ao configurar o estudo. Transmita uma lista de objetos JSON em `cells` sob `ad_studies`. Consulte a [referência Célula de estudo](/docs/marketing-api/reference/ad-study-cell). Um grupo de teste contém as informações a seguir.

Parâmetro

Descrição

`name`

O nome do grupo de teste.

`description`

Uma breve descrição do grupo de teste.

`treatment_percentage`

Define as contas da Central de Contas que receberão os anúncios.

`control_percentage`

Define a _porcentagem do grupo de controle_ correspondente às contas da Central de Contas que não verão os anúncios. A soma das porcentagens de tratamento e de controle deve ser 100.

`ad_studies`

A lista de entidades de anúncio a serem estudadas, como `adaccounts` ou `campaigns`. O Facebook veicula e mensura todos os anúncios em entidades de anúncio ativas durante o período de estudo.

**Exemplo**: ler grupos de teste em um estudo

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_ID>/cells'
```

  

**Exemplo**: atualizar ou modificar as informações e o tratamento da célula, bem como as porcentagens de controle ao fornecer o ID da célula em `cells`

cURL

```
curl \
  -F 'cells=[{id:<CELL_ID>,treatment_percentage:80,control_percentage:20}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_ID>'
```

  

**Exemplo**: ler todos os estudos criados em `ad_studies` para sua empresa

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

Também é possível ver todos os estudos associados à sua conta de anúncios. Para isso, faça uma chamada `GET` em `{ad-account-ID/include_all_studies=true}` com o seu token de acesso.

[](#)

## Configurar vários grupos de teste

Configure um estudo com vários grupos de teste de usuários do Facebook. Isso ajuda a mensurar o impacto incremental das diferentes estratégias do Facebook sobre as metas comerciais, como o uso de diferentes opções de direcionamento de anúncios. Para configurar um estudo com diversos grupos de teste, forneça a lista desses grupos em `cells`.

cURL

```
curl \
  -F 'name="new study"' \
  -F 'description="description of my study"' \
  -F 'start_time=1435622400' \
  -F 'end_time=1436918400' \
  -F 'cooldown_start_time=1433116800' \
  -F 'observation_end_time=1438300800' \
  -F 'viewers=[<USER_ID1>, <USER_ID2>]' \
  -F 'type=LIFT' \
  -F 'cells=[{name:"group A",description:"description of group A",treatment_percentage:50,control_percentage:20,campaigns:[<CAMPAIGN_ID1>]},{name:"group B",description:"description of group B",treatment_percentage:20,control_percentage:10,campaigns:[<CAMPAIGN_ID2>]}]' \
  -F 'objectives=[{name:"new objective",is_primary:true,type:"CONVERSIONS",applications:[{id:<APP_ID>}]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

  

`control_percentage` determina o grupo de controle de cada grupo de teste relativo à população total. Por exemplo, você tem um estudo com dois grupos de teste: o grupo A tem tratamento de 50%, com 20% de controle, e o grupo B tem tratamento de 20%, com 10% de controle. Isso resulta em cerca de 28,6%, ou 20%/70% da população do grupo A, como usuários de controle, e em cerca de 33,3%, ou 10%/30% da população do grupo B, como usuários de controle.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/17365454_785959168240424_3685251067190181888_n.png?_nc_cat=105&ccb=1-7&_nc_sid=34156e&_nc_ohc=j7YJ7kgCd44Q7kNvwGWeEY7&_nc_oc=Adn3LpMmYbhMuFmtvHX8o1wO4WGjypaGoZjsnZZGLcaAll-n2nLaz2VMYJdmG1r9r5NEI53nEgbCo1mskdK3-Sit&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Uu5SnhpX_hGa-WqBA5EEog&oh=00_Afu9BtoTUFpkiyHEqVRCLednwESbXTjTF4W_HaR4O8V4CQ&oe=6985309A)

Normalmente, a soma das porcentagens de tratamento e controle entre os grupos de teste deve ser igual a 100. No entanto, pode ser menos de 100 em alguns casos de uso específicos. Por exemplo, quando você tem três grupos de teste divididos de maneira uniforme em 33%.

É possível atualizar, adicionar e remover grupos de teste em um estudo.

-   Para atualizar um grupo de teste existente, faça referência ao ID dele no grupo de teste.
    
-   Para adicionar um novo grupo de teste, forneça um novo objeto de grupo de teste.
    
-   Para remover um grupo de teste, omita esse grupo de `cells` ao atualizar o estudo:
    

cURL

```
curl \
  -F 'cells=[{id:<CELL_ID1>,treatment_percentage:60,control_percentage:10},{name:"group C",description:"replacing group B",treatment_percentage:25,control_percentage:5,campaigns:[<CAMPAIGN_ID3>]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_ID>'
```

[](#)

## Definir os objetivos de publicidade

Defina os objetivos de publicidade que deseja mensurar e como você transmitirá dados de conversão para o Facebook. **Um estudo de incrementalidade deve ter no mínimo um objetivo. Não será possível modificar os objetivos depois que o estudo entrar em veiculação.** Consulte a [referência Estudo de anúncio](/docs/marketing-api/reference/ad-study-objective).

**Exemplo**: criar e adicionar um objetivo `CONVERSIONS` ao estudo

cURL

```
curl \
  -F 'name="new study"' \
  -F 'description="description of my study"' \
  -F 'start_time=1435622400' \
  -F 'end_time=1436918400' \
  -F 'cooldown_start_time=1433116800' \
  -F 'observation_end_time=1438300800' \
  -F 'viewers=[<USER_ID1>, <USER_ID2>]' \
  -F 'type=LIFT' \
  -F 'cells=[{name:"test group",description:"description of my test group",treatment_percentage:90,control_percentage:10,adaccounts:[<ACCOUNT_ID1>,<ACCOUNT_ID2>]}]' \
  -F 'objectives=[{name:"new objective",is_primary:true,type:"CONVERSIONS",applications:[{id:<APP_ID>}]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

  
  

Nome

Descrição

Fontes de dados

`CONVERSIONS`

Mensura o incremento nas conversões.

Pixels do Facebook baseados na API de Conversões

Caso você use `CONVERSIONS`, além de utilizar o pixel do Facebook ou um app para celular como origens de eventos, será necessário fornecer uma lista dos nomes de evento que você quer capturar para o objetivo. Depois disso, o Facebook poderá gerar relatórios dos resultados com base nesses eventos de conversão específicos.

Fonte de mensuração

Nomes de evento

Pixel do Facebook

`fb_pixel_view_content`, `fb_pixel_search`, `fb_pixel_add_to_cart`, `fb_pixel_add_to_wishlist`, `fb_pixel_initiate_checkout`, `fb_pixel_add_payment_info`, `fb_pixel_purchase`, `fb_pixel_lead`, `fb_pixel_complete_registration`, `custom`

Aplicativo para celular

`fb_mobile_activate_app`, `fb_mobile_complete_registration`, `fb_mobile_content_view`, `fb_mobile_search`, `fb_mobile_rate`, `fb_mobile_tutorial_completion`, `fb_mobile_add_to_cart`, `fb_mobile_add_to_wishlist`, `fb_mobile_initiated_checkout`, `fb_mobile_add_payment_info`, `fb_mobile_purchase`, `fb_mobile_level_achieved`, `fb_mobile_achievement_unlocked`, `fb_mobile_spent_credits`

### Criar um objetivo

Para criar um objetivo, transmita uma lista de `objectives` de objetos JSON ao gerar um novo estudo. Os objetivos contêm as seguintes informações:

Parâmetro

Descrição

`name`

O nome do objetivo.

`is_primary`

Um valor booliano que especifica se esse é o seu principal objetivo de publicidade. Um estudo pode ter apenas um objetivo principal.

`type`

Valor objetivo de `CONVERSIONS`.

`adspixels`

A lista de identificações do pixel do Facebook, além da lista relevante de `event_names` por ID, se aplicável.

`applications`

A lista dos seus apps para celular, além dos `event_names` por ID relevantes.

`offline_conversion_data_sets`

A lista de IDs de conjuntos de eventos offline, se aplicável. **No momento, não aceitamos detalhamentos do evento para conversão offline**.

`customconversions`

Lista de IDs de conversão personalizada, se aplicável.

Você também pode ter vários objetivos por estudo. O resultado será agregado com base nos objetivos. Veja abaixo um exemplo de estudo com vários objetivos.

cURL

```
curl \
  -F 'name="another study"' \
  -F 'description="description of another study"' \
  -F 'start_time=1435622400' \
  -F 'end_time=1436918400' \
  -F 'cooldown_start_time=1433116800' \
  -F 'observation_end_time=1438300800' \
  -F 'viewers=[<USER_ID1>, <USER_ID2>]' \
  -F 'type=LIFT' \
  -F 'cells=[{name:"test group",description:"description of my test group",treatment_percentage:90,control_percentage:10,adaccounts:[<ACCOUNT_ID1>,<ACCOUNT_ID2>]}]' \
  -F 'objectives=[{name:"first objective objective",is_primary:true,type:"CONVERSIONS",applications:[{id:<APP_ID1>},{id:<APP_ID2>}]},{name:"scond  objective",type:"CONVERSIONS",applications:[{id:<APP_ID3>,event_names:["fb_mobile_purchase"]}],adspixels:[{id:<FB_PIXEL_ID>,event_names:["fb_pixel_purchase","fb_pixel_lead"]}]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<BUSINESS_ID>/ad_studies'
```

  

Você pode atualizar, adicionar e remover objetivos em um estudo no nível do estudo, de modo semelhante a modificar grupos de teste. Para atualizar um objetivo existente, indique o ID correspondente no objeto `objectives`. Para adicionar um novo objetivo, forneça um novo objeto de objetivo. Para remover um objetivo, omita-o do parâmetro `objectives` quando atualizá-lo.

**Exemplo**: atualizar as fontes de mensuração `applications` de um objetivo e remover as fontes de mensuração `adspixels`

cURL

```
curl \
  -F 'objectives=[{id:<OBJECTIVE_ID>,name:"new objective name",applications:[{id:<APP_ID>}],adspixels:[]}]' \
  -F 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_ID>'
```

  

**Exemplo**: ler os objetivos de um estudo

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_OBJECTIVE_ID>?fields=results&breakdowns=["cell_id"]'
```

[](#)

## Geração de relatórios

### Recuperar objetivos

Todas as métricas "buyers" serão exibidas para estudos iniciados antes da data de corte em 13 de julho de 2021. Os estudos iniciados após 13 de julho não terão métricas "buyers" nem detalhamento por gênero, idade e país. Essa alteração afetará os campos abaixo que começam com "buyers" (`buyers_test`, `buyers_control_scaled2`, entre outros).

Também é importante lembrar que o detalhamento `cell_id` deve ser usado para obter resultados no nível da célula.

Os objetivos são definidos durante a configuração do estudo. Consulte o [guia de configuração](/docs/marketing-api/guides/lift-studies#objective) para saber como definir os objetivos do seu estudo.

É possível ler os objetivos criados para um estudo. Para isso, faça uma chamada `GET` à borda `objectives` do estudo.

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_OBJECTIVE_ID>?fields=results&breakdowns=["cell_id"]'
```

Para ver mais detalhes sobre os objetivos, consulte a documentação de referência [Objetivo do estudo de anúncio](/docs/marketing-api/reference/ad-study-objective)

### Recuperar resultados

Para recuperar resultados de um objetivo, você pode fazer uma chamada `GET` para o nó do objetivo especificando `results` no parâmetro "fields". O campo `last_updated_results` também informa quando os dados de resultados desse objetivo específico foram atualizados pela última vez.

Exemplo de resposta mostrada como JSON analisado para facilitar a leitura.

Comando:

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_OBJECTIVE_ID>?fields=results&breakdowns=["cell_id"]'
```

  

Os dados resultantes são objetos JSON que contêm nomes de métricas e strings de valores. Consulte o [Glossário de métricas de incremento](https://www.facebook.com/business/help/1092662031214127) do Facebook.

Com "buyers":

```
{
	"results": [
	"{"cell_id":"<cell_id>",
	"population_test":2334212,
	"population_control":123407,
	"population_reached":1862084,
	"impressions":19020874,
	"spend":26059,
	"buyers_control_raw_scaled":37672.615701199,
	"buyers_exposed":30085.482427228,
	"buyers_frequentist_pValue":0.00064950107027983,
	"conversions_control_raw_scaled":110918.27003534,
	"conversions_exposed":86961.044050743,
	"conversions_raw_pValue":0.12863848309723,
	"conversions_test":104412.89695396,
	"conversions_control_scaled":104575.81331581,
	"conversions_incremental":-162.91636184894,
	"conversions_notExposed":87123.960412592,
	"conversions_confidence":0.69291721817069,
	"conversions_multicell_confidence":null,
	"conversions_incremental_lower":-3470.6251396487,
	"conversions_incremental_upper":3235.0644420632,
	"conversions_multicell_rank":null,
	"conversions_incremental_share":-0.001873440730011,
	"conversions_CPiC":-159.95324044961,
	"buyers_test":40732.369934386,
	"buyers_control_scaled":41990.129061459,
	"buyers_incremental":-1257.7591270729,
	"buyers_notExposed":36617.935710157,
	"buyers_confidence":0.19318944031404,
	"buyers_multicell_confidence":null,
	"buyers_incremental_lower":-2905.5296282828,
	"buyers_incremental_upper":426.25813050358,
	"buyers_multicell_rank":null,
	"buyers_incremental_share":-0.041806181107957,
	"buyers_CPiB":-20.718593440578}"
	  ],
	  "id": "<objective_id>"
}
```
  

Sem "buyers":

```
{
	"results": [
	"{"cell_id":"<cell_id>",
	"population_test":2334212,
	"population_control":123407,
	"population_reached":1862084,
	"impressions":19020874,
	"spend":26059,
	"conversions_control_raw_scaled":110918.27003534,
	"conversions_exposed":86961.044050743,
	"conversions_raw_pValue":0.12863848309723,
	"conversions_test":104412.89695396,
	"conversions_control_scaled":104575.81331581,
	"conversions_incremental":-162.91636184894,
	"conversions_notExposed":87123.960412592,
	"conversions_confidence":0.69291721817069,
	"conversions_multicell_confidence":null,
	"conversions_incremental_lower":-3470.6251396487,
	"conversions_incremental_upper":3235.0644420632,
	"conversions_multicell_rank":null,
	"conversions_incremental_share":-0.001873440730011,
	"conversions_CPiC":-159.95324044961}"
	  ],
	  "id": "<objective_id>"
}
```

### Detalhar os resultados

Além de recuperar os resultados por objetivo, você poderá detalhar os resultados ao fornecer o parâmetro `breakdowns`.

cURL

```
curl -G \
  -d 'access_token=<ACCESS_TOKEN>' \
  'https://graph.facebook.com/<API_VERSION>/<STUDY_OBJECTIVE_ID>?fields=results&breakdowns=["cell_id"]'
```

  

Veja a seguir as dimensões de detalhamento disponíveis:

Os estudos iniciados após 13 de julho não terão detalhamentos por gênero, idade e país.

Detalhamento

Valores

`age`

`13-17`, `18-24`, `25-34`, `35-44`, `45-54`, `55-54`, `65+`

`cell_id`

Os IDs das células disponíveis no estudo.

`gender`

`M` ou `F`

`country`

Os códigos do país de duas letras (`ISO 3166-1 alpha-2`). Exemplo: `US`, `GB`, `IN`, `AU`.

Atualmente, só será aceito se consultado em conjunto com `cell_id`.

Exemplo: `breakdowns=['cell_id','country']`

Os resultados retornam vários objetos JSON na matriz com base nos detalhamentos disponíveis. Por exemplo, se você fornecer `cell_id`, os resultados serão detalhados de acordo com o número de células no estudo. Você pode fornecer um ou mais detalhamentos. No entanto, a combinação de detalhamentos deve ter pelo menos 100 conversões dos grupos de teste e controle combinados para que os resultados sejam exibidos.

```
{
  "id": "<STUDY_OBJECTIVE_ID>",
  "results": [
  {
    "cell_id": "<CELL_ID1>",
    ...
    Default fields where the values are specific to the <CELL_ID1> breakdown
    ...
  },
  {
    "cell_id": "<CELL_ID2>",
    ...
    Default fields where the values are specific to the <CELL_ID2> breakdown
    ...
  }],
}
```

[](#)

  

## Resultados para um registro de data específico

É possível especificar um registro de data na sua chamada de API para obter os resultados do estudo relativos a uma data em específico. Observe que a chamada retorna o mesmo resultado que seria apresentado se você fizesse a mesma chamada naquela data sem incluir o campo de registro de data. A data deve corresponder a um dos 30 dias anteriores.

cURL

```
curl -G \
      -d 'access_token=<ACCESS_TOKEN>' \
      'https://graph.facebook.com/<API_VERSION>/<STUDY_OBJECTIVE_ID>?fields=results&ds=2020-03-01'
```

  

[](#)