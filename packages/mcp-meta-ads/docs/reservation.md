---
title: "Reserva - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/reservation"
scraped_at: "2026-02-01T14:24:21.918Z"
---

# Reserva

Com a reserva, você pode planejar e comprar anúncios com um custo fixo, o que oferece uma frequência controlada de anúncios e alcance otimizado, ao mesmo tempo que ajuda a prever o desempenho da sua campanha. Essa opção é semelhante à maneira como as pessoas costumam comprar anúncios de TV. É uma alternativa especializada e avançada, usada pela maioria dos anunciantes apenas quando eles querem uma alta garantia de que os anúncios alcançarão determinado número de contas da Central de Contas.

A reserva funciona em todos os tipos de anúncios e dispositivos. Como a Meta direciona com base em pessoas reais, não em cookies, podemos prever o alcance e controlar a frequência em todos os dispositivos com mais precisão.

## Restrições

-   Disponível somente para algumas contas de anúncios. Verifique o parâmetro `CAN_USE_REACH_AND_FREQUENCY` da [conta de anúncio](/docs/reference/ads-api/adaccount#read).
    
-   O intervalo entre `stop_time` do conjunto de anúncios e uma previsão não pode ser maior que 180 dias.
    
-   As contas também têm limitações relacionadas ao país. Verifique isso com uma chamada de API `GET` para `https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>?fields=rf_spec`.
    
-   Defina um país por vez em `target_spec`.
    
-   Não há versões mínimas do iOS para `user_os`, como `iOS_ver_2.0_and_above`.
    
-   Ao criar ou atualizar uma campanha de reserva, não é possível definir o orçamento diário ou total, o limite de impressões diário ou total, o limite de frequência ou o lance externo nem o campo `PacingType`.
    

Pesquise `rf_spec` para ver os limites aplicáveis:

Nome

Descrição

`countries`

matriz

Países compatíveis com a reserva

`min_campaign_duration`

objeto

Duração mínima da campanha em dias por país compatível

`max_campaign_duration`

objeto

Duração máxima da campanha em dias por país compatível

`max_days_to_finish`

objeto

Uma campanha com dias de antecedência pode terminar dentro da previsão feita por país compatível

`min_reach_limits`

objeto

O alcance mínimo em número de contas da Central de Contas por país compatível

Os resultados ficam assim:

```
{
  "rf_spec": {
    "min_reach_limits": {
      "US": 1000000,
      "CA": 1000000,
    },
    "countries": [
      "US",
      "CA",
    ],
    "min_campaign_duration": {
      "US": 3,
      "CA": 3,
    },
    "max_campaign_duration": {
      "US": 30,
      "CA": 30,
    },
    "max_days_to_finish": {
      "US": 56,
      "CA": 56,
    }
  }
}
```

[](#)

## Criar previsões

As previsões contêm o número de contas da Central de Contas que podem ser alcançadas pelo seu anúncio em um intervalo de datas baseado em determinado alcance, frequência, público e orçamento. As estimativas de reserva podem ajudar você a simular os resultados do período de veiculação da campanha e serão ajustadas com base nas suas configurações, que incluem objetivo, orçamento, público, formatos e posicionamentos, segurança para marca, meta de desempenho e controle de frequência.

Depois que a reserva for concluída, será possível fazer edições nesse tipo de campanha. Porém, uma campanha de reserva em andamento não poderá ser editada nem pausada, exceto quando for preciso trocar os criativos do anúncio. Se você editar apenas um criativo do anúncio, sua previsão não mudará. Você pode excluir a campanha para cancelá-la e interromper a veiculação. No entanto, será preciso fazer uma nova reserva, o que pode resultar em um novo CPM e uma previsão diferente sobre os resultados da campanha. Somente programe as campanhas que você pretende veicular. Para fins de teste, limite suas reservas ao menor tamanho e duração possível; certifique-se de cancelá-las, já que reservamos um inventário real de anúncios para você.

### Limites

Estes são os limites-padrão para previsões:

-   Público-alvo de pelo menos 300 mil contas da Central de Contas
    
-   Alcance mínimo de 200 mil contas da Central de Contas
    
-   Os conjuntos de anúncios devem ser veiculados por no mínimo 1 dia e no máximo 90 dias. _Esse cálculo leva em consideração o tempo de duração da campanha. Por exemplo, se a campanha começar às 12h do dia 1 e terminar às 10h do dia 2, consideraremos que a campanha foi veiculada por 2 dias, embora o tempo total seja inferior a 24 horas_.
    
-   O intervalo entre a hora de parada do conjunto de anúncios e uma previsão não pode ser maior que 180 dias.
    
-   A campanha deve terminar após as 6h do último dia no fuso horário da conta de anúncios.
    

[](#)

## Ler previsões

Para detalhes, especifique [campos](#fields). Para ver todas as `reachfrequencyprediction` de uma conta, faça uma `HTTP GET` a `https://graph.facebook.com/{API_VERSION}/act_{AD_ACCOUNT_ID}/reachfrequencypredictions?fields={COMMA_SEPERATED_FIELD_LIST}`.

Para alcançar todas as `reachfrequencyprediction` baseadas em um ID de `reachfrequencyprediction`, faça uma chamada `HTTP GET` com os [campos](#fields) desejados: `https://graph.facebook.com/{API_VERSION}/{RF_PREDICTION_ID}?fields={COMMA_SEPERATED_FIELD_LIST}`.

Por padrão, a Meta retorna o ID. Para ver os detalhes dos campos, consulte [Reach and Frequency Prediction: Leitura](/docs/marketing-api/reference/reach-frequency-prediction#Reading).

### Códigos de status de resposta

A tabela a seguir mostra os possíveis resultados de `status` em `reachfrequencyprediction`. Limitações iniciais aparecem quando aplicável; entretanto, elas podem variar de acordo com a conta de anúncios ou, no futuro, com o país:

Código

Status

Descrição

1

SUCCESS

Previsão bem-sucedida.

2

PENDING

Previsão em fase de produção.

3

FAIL

O público não pode ser alcançado. Orçamento ou alcance muito alto.

4

FAIL

Configurações de previsão inválidas, por exemplo, duração.

5

FAIL

`targeting_spec` inválida.

6

FAIL

Orçamento ou lance para determinado alcance muito baixo.

7

FAIL

A duração do conjunto de anúncios é curta demais.

8

FAIL

A duração do conjunto de anúncios é longa demais.

9

FAIL

A data de término do conjunto está distante demais.

10

FAIL

Limite de frequência não especificado.

11

FAIL

Posicionamento do anúncio não aceito, como feed e lado direito mistos.

12

FAIL

Há problemas de datas no conjunto de anúncios (hora de início e/ou de término): hora de início no passado, não à meia-noite ou não um dia inteiro. Além disso, uma hora de término no passado, que ultrapasse 90 dias da hora de início ou que não termine após às 6h resultará em erro.

13

FAIL

País direcionado ainda sem compatibilidade.

14

FAIL

As datas do conjunto de anúncios incluem dias de bloqueio.

15

FAIL

Inventário insuficiente, não foi possível reservar. Veja Como reservar uma previsão.

16

FAIL

Alcance mínimo necessário para a conta não atingido. Consulte "Como obter restrições de conta".

17

FAIL

O alcance real disponível para esta previsão é menor do que o alcance mínimo do país desejado, normalmente 200.000 para a maioria dos países.

18

FAIL

Programação de divisão do dia fornecida inválida.

19

FAIL

CPM de destino inatingível.

20

FAIL

O limite de frequência é muito baixo para a veiculação combinada.

21

FAIL

Alteração significativa do inventário de anúncios, gerando previsão imprecisa.

23

FAIL

Intervalo do limite de frequência não aceito no país desejado.

24

FAIL

O conjunto de anúncios do estudo de incrementalidade do grupo de controle da conta ou do grupo de campanhas não está de acordo com a previsão de reserva.

25

FAIL

O limite de frequência não pode exceder o número de dias de veiculação da campanha.

26

FAILURE\_EMPTY\_AUDIENCE

Público selecionado vazio ou inutilizável.

27

FAIL

Não é permitido modificar sua campanha em veiculação.

28

FAIL

Não é possível modificar uma campanha em veiculação criada com um pedido de inserção.

29

FAIL

Não é possível modificar uma campanha em andamento devido a restrições de tempo.

30

FAIL

Para editar um conjunto de anúncios de reserva em andamento, escolha um orçamento maior do que o gasto atual.

31

FAIL

O estudo de incrementalidade do grupo de contas ou de campanhas começa após o início da campanha.

32

FAIL

O estudo de incrementalidade do grupo de contas ou de campanhas termina antes do fim da campanha.

35

FAIL

A hora de início da campanha de reserva não pode estar no passado.

36

FAIL

A duração do conjunto de anúncios de reserva precisa ser maior que um dia, e a hora de início/término da campanha deve ser válida.

37

FAIL

O objetivo não é compatível com o Audience Network usando o tipo de compra de reserva.

39

FAIL

A combinação de posicionamentos selecionados não pode ser usada em compras com reserva.

40

FAIL

Não é possível direcionar versões específicas de sistemas operacionais para dispositivos móveis com o tipo de compra de reserva.

41

FAIL

Não é possível direcionar amigos de conexões com o tipo de compra de reserva.

42

FAIL

Não é possível veicular campanhas de reserva quando o Audience Network é selecionado como o único posicionamento. Selecione o posicionamento Audience Network com Feed do Facebook ou Feed do Instagram como opções adicionais.

44

FAIL

A reserva não é compatível com o Facebook Story.

45

FAIL

Para usar Facebook Stories como posicionamento, selecione também Feeds do Facebook ou Instagram Stories.

50

FAIL

A combinação de posicionamentos selecionados não pode ser usada em compras com reserva. Para compra Pedido de inserção de reserva, o objetivo precisa ser Visualizações do vídeo. Caso contrário, para usar In-stream do Facebook, selecione o posicionamento Feeds do Facebook.

53

FAIL

O posicionamento de vídeo in-stream está disponível apenas para públicos nos seguintes países: Estados Unidos, Reino Unido, Austrália, Nova Zelândia, Irlanda, Tailândia, México, Peru, França, Alemanha, Argentina, Colômbia, Espanha, Chile, Equador, República Dominicana, Guatemala, Bolívia, Honduras, El Salvador, Noruega, Suécia, Holanda, Bélgica, Polônia, Portugal, Dinamarca, Índia, Malásia, Filipinas, Indonésia e Vietnã. Se quiser continuar, edite o público para incluir apenas pessoas dessas localidades.

60

FAIL

Para usar Facebook Marketplace, selecione o posicionamento Feeds do Facebook.

66

FAIL

O posicionamento Coluna direita do Facebook não pode ser combinado com Outros posicionamentos.

69

FAIL

Se quiser que o anúncio seja exibido na seção Explorar do Instagram, você também precisará selecionar Feed do Instagram como posicionamento.

100+

FATAL

Falha do sistema, sem culpa do usuário. Tentar novamente.

[](#)

## Usar previsões

Forneça o ID da previsão e os dados correspondentes como entrada para criar uma identificação que servirá como ID da reserva. Depois, anexe o ID da reserva ao conjunto de anúncios. A criação de uma reserva torna o inventário indisponível a outras pessoas. Por isso, é necessário anexá-lo antes que ele expire.

**Se o processo for bem-sucedido, reservaremos o inventário para você de maneira temporária. Após a reserva, você terá _aproximadamente_ uma hora para atribuir o _anúncio_ a um conjunto.**

Se o limite por hora das solicitações de reserva for ultrapassado, você verá o código e esta mensagem de erro: **613: As chamadas dessa API ultrapassaram o limite de volume.**

### Reservar

Reserve previsões para seus conjuntos de anúncios de modo a fixar o preço e ter um alcance previsível. Faça a reserva de um público identificado por `reachfrequencyprediction` por determinado período com `reserve` para `action`. Você pode usar um único número de identificação de previsão para criar várias reservas. Por exemplo:

```
curl \
-F 'action=reserve' \
-F 'rf_prediction_id=<RF_PREDICTION_ID>' \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/reachfrequencypredictions'
 
// Response 
{"id":9876543210"}
```

Para reservar um inventário com base em uma previsão, faça uma chamada de API `POST` a `https://graph.facebook.com/{API_VERSION}/act_{AD_ACCOUNT_ID}/reachfrequencypredictions`.

Para `reach`, `budget` e `impression`, é possível reservar uma previsão em um ponto específico no `curve_budget_reach` em vez da tupla original de orçamento/alcance de previsão. Use estes campos:

Nome

Descrição

`rf_prediction_id`

int

**Obrigatório.**

O ID de `reachfrequencyprediction`.

`action`

string

**Obrigatório para reserva e cancelamento.**

As opções são as seguintes:

-   `reserve` – reservar inventário com a previsão anterior
    
-   `cancel` – cancelar previsão reservada
    

`rf_prediction_id_to_release`

int

**Opcional.**

O ID de previsão reservada ou de reserva. Uma nova reserva lança um público reservado e usa-o para a nova reserva. Consulte [Como reutilizar públicos reservados](#reusing).

`rf_prediction_id_to_share`

int

**Opcional.**

O ID de uma previsão criada anteriormente. As novas previsões usam o público de determinada previsão.

  

**Observação**: `rf_prediction_id_to_share` precisa ser definido como um ID de previsão válido para usar o objetivo `TRAFFIC` ou `POST_ENGAGEMENT` e as otimizações `LINK_CLICKS`. Consulte o [registro de alterações](/docs/graph-api/changelog/version18.0#reach-and-frequency) para saber mais.

`reach`

int

**Opcional. Se for especificado, forneça `budget` e `impression`.**

Especifique `reach`, `budget` e `impression` para esse ponto em `curve_budget_reach`. Esse valor pode ser substituído.

`budget`

int

**Opcional. Se for especificado, forneça `reach` e `impression`.**

Especifique `reach`, `budget` e `impression` para esse ponto em `curve_budget_reach`. Esse valor pode ser substituído.

`impression`

int

**Opcional. Se for especificado, forneça `reach` e `budget`.**

Esse valor pode ser substituído. Para isso, especifique `reach`, `budget` e `impression` para esse ponto em `curve_budget_reach`.

A Meta reserva previsões de modo assíncrono. Por isso, consulte e verifique o status da previsão. Inicialmente, o status é `2` (PENDENTE). Após a conclusão, o status será `1` (`SUCCESS`) ou `15` (`FAIL`), o que significa que não há inventário suficiente para terminar a reserva.

Como o sistema de reserva é dinâmico, talvez você observe pequenas alterações na disponibilidade do inventário entre o horário da previsão e o da reserva. No entanto, a Meta respeita os valores obtidos no horário da reserva, desde que as alterações estejam dentro de um limite razoável.

### Atribuir a conjuntos de anúncios

Após reservar uma previsão com sucesso, crie um conjunto de anúncios com ela:

```
curl \
-F "rf_prediction_id=<RF_PREDICTION_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>"
```

Para atribuir uma previsão com sucesso, seu conjunto de anúncios deve cumprir os critérios a seguir.

-   Não especificar:
    
-   `start_time` – deriva da previsão
    
-   `end_time` – deriva da previsão
    
-   `targeting` – deriva da previsão
    
-   `bid_amount`
    
-   `optimization_goal`
    
-   `lifetime_budget` ou `daily_budget`
    
-   É possível atribuir reservas a conjuntos sem anúncios ativos. No entanto, é necessário ter pelo menos um anúncio ativo antes do início do conjunto de anúncios.
    
-   Você precisa incluir `rf_prediction_id`, que anexa a previsão ao novo conjunto de anúncios.
    
-   O atributo da campanha de anúncios de `buying_type` é `RESERVED`.
    

Também é possível anexar `reachfrequencyprediction` a conjuntos de anúncios para modificar a previsão. Para isso, faça uma solicitação `POST` a `https://graph.facebook.com/{ad_set_id}` com o `rf_prediction_id` da `reachfrequencyprediction` que você quer usar.

Veja os limites do conjunto de anúncios:

-   Opções de plataforma para publishers: `facebook` e `instagram`.
    
-   Opções de posicionamento do Facebook: `feed` e `rightcolumn`.
    
-   Opções de posicionamento do Instagram: `stream`, `story`, `explore`, `explore_home` e `reels`. Se o posicionamento incluir `instagram`, será necessário usar `destination_ids`, e não `destination_id`. O campo `destination_ids` deve conter a identificação da Página do Facebook usado como `destination_id`, além da identificação da conta do Instagram.
    
-   Público personalizado ou categorias de parceiro, mas não ambos.
    
-   Não são permitidos Públicos Personalizados de site e direcionamento de exclusão de engajamento de fãs ou de vídeo.
    
-   O `promoted_object` do conjunto de anúncios deve corresponder a `destination_id` da previsão. Para publicações da Página, deve corresponder à identificação da Página. Para anúncios de app, deve corresponder ao ID do app especificado.
    
-   Temos compatibilidade com a [regularidade de anúncios-padrão e programados](/docs/marketing-api/adset/pacing), mas não com a veiculação acelerada.
    

Cobramos as campanhas de reserva com base nas impressões reais veiculadas. Se a hora de início da campanha passar e o conjunto não tiver anúncios ativos, a campanha não será veiculada e nenhuma cobrança será feita. A Meta lança o inventário remanescente. No entanto, podemos penalizar a conta de anúncios em caso de reincidência.

Ao criar uma campanha usando o tipo de compra de reserva da Meta, você concorda em pagar os custos propostos pelo inventário de anúncios que reservar. Se você quiser alterar o tamanho do público ou a frequência do anúncio, os custos também mudarão. É possível fazer essas alterações a qualquer momento antes do início da sua campanha. Você pode editar o criativo do anúncio até o início da sua campanha.

### Gerenciar anúncios

Os conjuntos de anúncios de reserva podem conter vários anúncios; você pode adicionar mais anúncios a qualquer momento. Se o conjunto de anúncios for ativado e não houver anúncios ativos nele, você deverá criar seu primeiro anúncio dentro de 24 horas para conjuntos de anúncios com duração entre 3 e 30 dias, ou dentro de 6 horas para conjuntos de anúncios com duração entre 1 e 2 dias. Caso você não faça isso, excluiremos a reserva.

### Separar previsões e modificar conjuntos de anúncios

Você pode fazer edições ou pausar sua campanha de reserva antes que ela comece a ser veiculada. Depois que a campanha for iniciada, só será possível editar o criativo do anúncio, alterar o orçamento ou adiar a data de término. Se você editar apenas um criativo do anúncio, sua previsão não mudará.

Caso você altere o orçamento ou a data de término, uma nova previsão será gerada para a campanha, que aparecerá nas estimativas de reserva.

Não é possível pausar a campanha depois que ela é iniciada, mas você pode excluí-la para cancelar a veiculação a qualquer momento.

Consulte [Como pausar ou reiniciar conjuntos de anúncios em veiculação](#pausing_running_adset) e [Como editar conjuntos de anúncios em veiculação](#editing_running_adset) para saber como realizar esses processos. Para excluir um conjunto ativo, consulte a [referência de conjunto de anúncios](/docs/marketing-api/reference/ad-campaign). Você receberá cobranças pelas impressões veiculadas.

Para evitar possíveis falhas, evite excluir todos os anúncios quando um conjunto de anúncios de reserva estiver ativo.

Se uma reserva for atribuída a um conjunto de anúncios antes que ele se torne ativo, não será possível alterar a maioria dos atributos, a não ser que você separe a reserva. Faça uma solicitação `HTTP POST` ao conjunto e defina `rf_prediction_id` como 0. Somente o atributo `name` poderá ser modificado no objeto do conjunto de anúncios.

Para separar uma reserva:

```
curl \
-F "rf_prediction_id=0" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>"
```

Depois que um conjunto de anúncios for ativado, a reserva não poderá ser separada e não será possível alterar os atributos do conjunto, exceto alguns de **anúncio** que estão listados abaixo e constam na lista de permissão:

-   `name`
    
-   `creative_id`
    
-   `creative_spec`
    
-   `conversion_specs`
    
-   `tracking_specs`
    
-   `view_tags`
    

### Pausar e reiniciar conjuntos de anúncios

É possível pausar um conjunto ativo. Consulte a [referência de conjunto de anúncios](/docs/marketing-api/reference/ad-campaign). Se você pausar um conjunto de anúncios por mais de 30 minutos, não poderemos garantir a previsão para este conjunto.

Para reativar um conjunto pausado por mais de 30 minutos, você precisará de uma nova previsão. Faça uma `POST` a `reachfrequencypredictions`. Consulte [Criar previsões](#create) e [Reservar](#reservation). Inclua um existing\_campaign\_id na solicitação para que o conjunto seja reativado. Depois de criar e reservar uma previsão nova, anexe `reachfrequencyprediction` ao conjunto de anúncios com uma `HTTP POST` a `https://graph.facebook.com/{ad_set_id}` que especifique `rf_prediction_id` da previsão que você deseja usar.

### Editar conjuntos de anúncios em veiculação

Você pode fazer estas atualizações depois do início de um conjunto.

-   Aumentar ou reduzir o orçamento o alcance de um conjunto de anúncios. O orçamento ou alcance devem ser maiores do que o gasto atual ou alcance obtido.
    
-   Ampliar a programação do conjunto de anúncios para 90 dias.
    

**Não será possível editar nem pausar um conjunto ativo se um dos seguintes critérios for atendido:**

-   Veiculação muito abaixo do esperado. Veiculação inferior a 10% da previsão. Conjuntos com gastos superiores ao orçamento.
    
-   Conjuntos de anúncios em veiculação por apenas um dia.
    
-   Conjuntos de anúncios com término dentro das próximas 24 horas.
    

Para editar conjuntos de anúncios em andamento, obtenha uma nova previsão. Consulte [Criar previsões](#create) e [Reservar](#reservation). Inclua um existing\_campaign\_id na solicitação para que o conjunto seja reativado.

Depois que uma nova previsão for criada e reservada, você poderá anexar `reachfrequencyprediction` ao conjunto de anúncios. Para isso, faça uma solicitação HTTP POST a https://graph.facebook.com/{ad\_set\_id} e especifique `rf_prediction_id` como a identificação da reachfrequencyprediction que você quer usar.

[](#)

## Reutilizar públicos reservados

Se você cancelar uma reserva, o inventário reservado será liberado para outros anunciantes. No entanto, você pode reutilizar um público de uma previsão reservada anteriormente, caso já não o esteja usando. Isto permite que consideremos inventários adicionais para criar uma previsão, sem que você tenha que cancelar uma reserva existente.

Inclua `rf_prediction_id_to_share` ao criar uma reserva. Este é o número de identificação de uma previsão anterior. Isso invalida a reserva anterior, portanto, você poderá usar esse inventário para sua reserva criada recentemente.

Para reservar a nova previsão, também será necessário transmitir o parâmetro adicional `rf_prediction_id_to_release`, que é o ID da reserva anterior.

### Rotação e sequenciamento de anúncios

É possível fazer a rotação dos anúncios no conjunto de anúncios que você estiver usando. Não é necessário separar a reserva do conjunto de anúncios para fazer isso. Adicione um ou mais anúncios ao conjunto e aguarde até que ele se torne ativo. Neste ponto, você poderá alterar o status do anúncio inicial para pausado. É necessário ter pelo menos um anúncio ativo no conjunto.

Você pode criar uma sequência de anúncios veiculados em ordem. Primeiro, crie o conjunto de anúncios e os anúncios. Depois, especifique a sequência no nível do conjunto de anúncios em `creative_sequence`. Individualmente, cada anúncio neste conjunto poderá não aparecer, aparecer uma vez ou aparecer diversas vezes na sequência.

Se o comprimento da matriz `creative_sequence` for zero, isso significa que você não está usando sequenciamento. Caso o comprimento não seja zero, recomendamos que ele seja igual a `frequency_cap` em `rf_prediction_id`. Se o comprimento for maior que `frequency_cap`, os últimos anúncios da matriz serão truncados. Caso o comprimento seja menor que `frequency_cap`, preencheremos a matriz de forma automática e recursiva ao repetir a sequência do início. Para que os resultados fiquem claros, defina o comprimento de `creative_sequence` como o mesmo valor de `frequency_cap`.

Cada anúncio na sequência tem o status `ACTIVE`, `PENDING_REVIEW` ou `CREDIT_CARD_NEEDED`. Um determinado anúncio da sequência será veiculado para um usuário somente se todos os anúncios precedentes da sequência tiverem sido veiculados. Os anúncios que não estiverem em `creative_sequence` não serão veiculados.

Nenhum anúncio de um conjunto usando sequenciamento poderá ser pausado, arquivado ou excluído, mesmo que o anúncio em questão não esteja na sequência.

Esse recurso está disponível somente para conjuntos de anúncios de reserva. Em outras palavras, `buying_type` da campanha de anúncios principal é `RESERVED`, e o conjunto de anúncios tem `rf_prediction_id` definido.

É possível encontrar mais detalhes no documento sobre [conjunto de anúncios](/docs/reference/ads-api/adset).

[](#)

## Reserva do Instagram

Para ter alcance previsível no Instagram, você pode criar uma campanha de reserva com `buying_type` definido como `RESERVED`.

Isso ajuda você a planejar e reservar campanhas de reconhecimento e engajamento, otimizando o alcance, a incrementalidade na lembrança do anúncio e o ThruPlay.

As [estimativas de alcance](/docs/marketing-api/reference/reach-estimate/) no [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage) e na API podem oferecer orientações confiáveis sobre o que os parceiros podem esperar no futuro. A comunidade do Instagram vem em primeiro lugar. Tentamos atingir os objetivos de alcance com moderação e esperamos evoluir com o passar do tempo. Todas as políticas que se aplicam ao uso das estimativas de reserva no Facebook também valem para o Instagram.

[](#)

## Códigos de erro

Código

Descrição

1487583

Não é possível atribuir uma previsão de reserva a um conjunto sem anúncios.

1487055

O status do conjunto de anúncios é inválido.

1487600

O conjunto de anúncios já foi atribuído a uma reserva. Se quiser usar outra previsão, desconecte primeiro do conjunto atual usando o valor null e, depois, atribua uma nova previsão.

1487578

O ID de `reachandfrequencyprediction` especificado não existe ou não pertence à conta fornecida.

1487581

Não é possível modificar a previsão de reserva de um conjunto de anúncios ativo.

1487594

Não há anúncios no conjunto de anúncios de reserva.

1487595

Há uma especificação de direcionamento inválida no conjunto de anúncios de reserva.

1487614

A hora de início do conjunto de anúncios não corresponde à previsão original.

1487615

A hora de interrupção do conjunto de anúncios não corresponde à previsão original.

1487616

O conjunto de anúncios não pode ser associado a uma previsão inválida.

1487671

Transição direta de uma previsão para outra de um conjunto de anúncios não permitida.

1487244

Falha na atualização do conjunto de anúncios – o motivo deve ser fornecido na resposta.

1487672

Falha ao atribuir a previsão ao conjunto de anúncios.

1487680

Você não tem permissão para usar conjuntos de anúncios de reserva.

[](#)

## Exemplos

Criar `reachfrequencyprediction` para `destination_id` de um app:

```
curl \
-F 'target_spec={"geo_locations": {"countries":["US"]}, "age_max":35, "age_min":26, "genders":[2], "publisher_platforms":["facebook"], "facebook_positions":["feed"]}' \
-F 'start_time=1388534400' \
-F 'end_time=1389312000' \
-F 'frequency_cap=4' \
-F 'reach=1000000' \
-F 'budget=3000000' \
-F 'destination_id=<APP_ID>' \
-F 'prediction_mode=1' \
-F "objective=MOBILE_APP_INSTALLS" \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/reachfrequencypredictions'

{"id":"67890123456"}
```

Criar `reachfrequencyprediction` para `destination_id` de uma Página:

```
curl \
-F 'target_spec={"geo_locations": {"countries":["US"]}, "age_max":35, "age_min":26, "genders":[2], "publisher_platforms":["facebook"], "facebook_positions":["feed"]}' \
-F 'start_time=1388534400' \
-F 'end_time=1389312000' \
-F 'frequency_cap=4' \
-F 'reach=1000000' \
-F 'budget=3000000' \
-F 'destination_id=<PAGE_ID>' \
-F 'prediction_mode=1' \
-F "objective=POST_ENGAGEMENT" \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/reachfrequencypredictions'

{"id":"67890123456"}
```

Criar `reachfrequencyprediction` para `destination_id` de um app com posicionamento do Instagram:

```
curl \
-F 'target_spec={"geo_locations": {"countries":["US"]}, "age_max":35, "age_min":26, "genders":[2], "publisher_platforms":["facebook","instagram"], "device_platforms":["mobile"]}' \
-F 'start_time=1388534400' \
-F 'end_time=1389312000' \
-F 'frequency_cap=4' \
-F 'reach=1000000' \
-F 'budget=3000000' \
-F 'destination_ids=[<APP_ID>,<INSTAGRAM_ACCOUNT_ID>]' \
-F 'prediction_mode=1' \
-F "objective=MOBILE_APP_INSTALLS" \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/reachfrequencypredictions'

{"id":"67890123456"}
```

Consulte o ponto de extremidade abaixo por meio de solicitações HTTP GET para recuperar o status até obter um resultado diferente de `2`:

```
https://graph.facebook.com/67890123456?fields=status
```

Se o status for `1` (bem-sucedido), isso poderá ser anexado a um conjunto de anúncios ou reservado.

Reservar uma previsão:

```
curl \
-F 'action=reserve' \
-F 'rf_prediction_id=<RF_PREDICTION_ID>' \
-F 'access_token=<ACCESS_TOKEN>' \
'https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/reachfrequencypredictions'
 
{"id":"9876543210"}
```

Consulte o ponto de extremidade abaixo por meio de solicitações HTTP GET para recuperar o status até obter um resultado diferente de `2`:

```
https://graph.facebook.com/<API_VERSION>/<PREDICTION_ID>?fields=status
```

Se o status for `1` (bem-sucedido), isso poderá ser anexado a um conjunto de anúncios. Agora, configuraremos a estrutura da campanha. Para isso, é necessário criar uma campanha, um conjunto de anúncios, um criativo e um anúncio. Além disso, precisamos atribuir a reserva ao conjunto de anúncios.

Criar uma campanha de anúncios:

```
curl \
-F "name=Test" \
-F "buying_type=RESERVED" \
-F "status=ACTIVE" \
-F "objective=POST_ENGAGEMENT" \
-F "access_token=<ACCESS_TOKEN>" \
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/campaigns

{"id":"1122334455"}
```

Criar um conjunto de anúncios:

```
curl  \
-F "name=TestReachSet" \
-F "status=1" \
-F "campaign_id=<CAMPAIGN_ID>" \
-F "rf_prediction_id=<RF_PREDICTION_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/adsets"

{"id":"09876543"}
```

Gerar um criativo do anúncio:

```
curl \
-F "name=sample creative" \
-F "type=1" \
-F "title=hello world" \
-F "body=hi i'm an ad" \
-F "link_url="https://www.facebook.com/" \
-F "image_hash=4aca812b4eadb72818a2c4124abd121a" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/adcreatives"

{"id":"1323123123123"}
```

Criar um anúncio:

```
// Create an ad
curl \
-F "name=my ad" \
-F "adset_id=<AD_SET_ID>" \
-F "creative={'creative_id':<CREATIVE_ID>}" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/ads"

{"id":"3213213123"}
```

Atribuir uma nova previsão ao conjunto de anúncios:

```
curl \
-F "rf_prediction_id=<RF_PREDICTION_ID>" \
-F "access_token=<ACCESS_TOKEN>" \
"https://graph.facebook.com/<API_VERSION>/<AD_SET_ID>"
```

[](#)