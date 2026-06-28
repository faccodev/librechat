---
title: "Públicos personalizados de arquivos de clientes - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/guides/custom-audiences"
scraped_at: "2026-02-01T13:57:36.856Z"
---

# Públicos personalizados de arquivos de clientes

Beginning September 2, 2025, we will start to roll out more proactive restrictions on custom audiences that may suggest information not permitted under our terms. For example, any custom audience or lookalike audience suggesting specific health conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit score", "high income") will be flagged and prevented from being used to run ad campaigns.

**What these restrictions mean for your campaigns:**

-   You won't be able to use flagged custom audiences when creating new campaigns.
-   If you have an active campaign using flagged custom audiences, you should edit or pause it and choose a different audience to avoid performance and delivery issues.

**For API developers:**

-   Beginning September 2, 2025, `operation_statu`s will return `471` to signal if your custom audiences have been flagged.

More information on this update and how to resolve flagged custom audiences can be found [here](https://www.facebook.com/business/help/1055828013359808).

A API de Marketing permite criar públicos personalizados com base em informações do cliente. Isso inclui endereço de email, telefone, nome, data de nascimento, gênero, localização, [IDs dos usuários do app](/docs/graph-api/reference/user), [IDs dos usuários no escopo da Página](/docs/app-events/bots-for-messenger), Identificador de Publicidade da Apple (IDFA) ou [ID de publicidade do Android](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fgoogle%2Fplay-services%2Fid.html&h=AT0FdspcAarh4bTWbpzSlnbDg7GRcdWKSB5oZUTBJCsnFwTUzyV3JIeC9Ek6vnAizvYfsyyJQLmJQbibxnT_fl1eQ_VQ5q20L_nr3ZlW9AG6rBvAOg_KecdjeIjvUv7cHqgjERUdm1CAj5S2iLqRPcUPFfxR0nlsj9tt_aaoVvw).

Como proprietário dos dados da sua empresa, você é responsável pela criação e pelo gerenciamento dessas informações. Isso inclui as informações dos sistemas de gestão do relacionamento com o cliente (CRM). Para criar públicos, é necessário compartilhar seus dados em um formato com hash, de modo a manter a privacidade. Consulte [Como fazer hashing e normalizar dados](#hash). A Meta os compara aos nossos dados com hash para verificar se devemos adicionar alguém que está no Facebook ao público do seu anúncio.

Você pode adicionar um número ilimitado de registros a um público, com o máximo de 10 mil por vez. As alterações nos públicos personalizados não são aplicadas de maneira automática. Geralmente, isso leva até 24 horas. O número de registros cuja remoção for solicitada e/ou o número de públicos personalizados na sua conta aumentará o tempo necessário para processar a solicitação.

Para melhorar a forma como os anunciantes criam e gerenciam públicos, os públicos personalizados de arquivo de cliente que não são usados em nenhum conjunto de anúncios ativo por mais de dois anos são sinalizados para exclusão periodicamente. Forneça instruções para que possamos realizar as ações necessárias. Assim que um público for sinalizado e movido para o estágio "Público prestes a expirar", você poderá usá-lo em um conjunto de anúncios ativos, e isso será entendido como uma instrução para que ele seja retido. Caso você decida não usar o público, isso será considerado uma instrução para que ele seja excluído. Para mais informações, consulte a documentação de [visão geral sobre públicos personalizados](/docs/marketing-api/audiences/overview#custom-audiences-deletion).

Caso você compartilhe eventos de conversão por meio da [**API de Conversões**](/docs/marketing-api/conversions-api), será possível criar um [público personalizado do site](/docs/marketing-api/audiences/guides/website-custom-audiences) sem precisar carregar dados adicionais. No entanto, ainda será possível carregar informações compatíveis para criar um público personalizado de arquivos de clientes.

## Criar um público personalizado

### Etapa 1: criar um [público personalizado](/docs/marketing-api/reference/custom-audience/) vazio

Especifique `subtype=CUSTOM` e `customer_file_source` na sua chamada de API.

```
v24.0
```

#### Parâmetros

Nome

Descrição

`customer_file_source`  
string de enumeração

Descreve como as informações do cliente no seu público personalizado foram coletadas originalmente.  
**Valores:**

-   `USER_PROVIDED_ONLY`  
    Os anunciantes coletaram informações diretamente de clientes.
    
-   `PARTNER_PROVIDED_ONLY`  
    Os anunciantes extraíram informações diretamente de parceiros (por exemplo, agências ou provedores de dados).
    
-   `BOTH_USER_AND_PARTNER_PROVIDED`  
    Os anunciantes coletaram informações diretamente de clientes, além de extraí-las de parceiros (por exemplo, agências).
    

`name`  
string

Nome do público personalizado

`description`  
string

Descrição do público personalizado.

`subtype`  
string

Tipo de público personalizado.

### Etapa 2: especificar uma lista de usuários

Use uma chamada de API `POST` ao ponto de extremidade `/{audience_id}/users` para especificar a lista de usuários que você quer adicionar ao público personalizado.

#### Parâmetros

Nome

Descrição

`session`  
objeto JSON

**Obrigatório.**  
Use o parâmetro `session` para rastrear o carregamento de um lote específico de usuários.  
Caso você tenha um carregamento com mais de 10 mil usuários, será preciso dividi-lo em lotes, já que esse é o máximo por solicitação.

  

**Exemplo**

```
{
  "session_id":9778993, 
  "batch_seq":10, 
  "last_batch_flag":true, 
  "estimated_num_total":99996 
}
```

`payload`  
objeto JSON

**Obrigatório.**  
Inclui `schema` e `data`.

**Exemplo**

```
{ 
  "schema":"EMAIL_SHA256", 
  "data":
    [
      ["<HASHED_DATA>"], 
      ["<HASHED_DATA>"], 
      ["<HASHED_DATA>"] 
    ]
}
```

#### Opções de processamento de dados para usuários nos EUA

Se você quiser habilitar o Uso Limitado de Dados para pessoas na Califórnia por meio de públicos personalizados de lista de clientes a partir de 1º de junho de 2023, carregue novos públicos ou [atualize os existentes](/docs/marketing-api/audiences/guides/custom-audiences) com a sinalização de Uso Limitado de Dados. Atualize e mantenha os status de Uso Limitado de Dados dos seus públicos e das pessoas, conforme necessário.

Uma sinalização de Uso Limitado de Dados aplicada a um usuário em um público não será transferida automaticamente para públicos diferentes. Da mesma forma que os anunciantes devem gerenciar cada um dos públicos personalizados de lista de clientes separadamente pelos critérios selecionados, a sinalização de Uso Limitado de Dados precisa ser aplicada de modo específico a cada público usado para publicidade.

Para NÃO habilitar o `LDU` de forma explícita para o registro, você pode enviar uma matriz de `data_processing_options` vazia ou remover o campo na carga. Exemplo de uma matriz vazia:

```
{
   "payload": {
       "schema": [
           "EMAIL",
                    "DATA_PROCESSING_OPTIONS"
       ],
       "data": [
           [
               "<HASHED_DATA>
",
                           []
           ]
       ]
   }
}
```

Para habilitar o `LDU` de forma explícita e fazer com que a Meta realize a geolocalização (ao não incluir o estado nem o país do registro), especifique uma matriz contendo `LDU` para cada registro:

```
{
   "payload": {
       "schema": [
           "EMAIL",
                    "DATA_PROCESSING_OPTIONS"
       ],
       "data": [
           [
               "<HASHED_DATA>
",
                           ["LDU"]
           ]
       ]
   }
}
```

Para habilitar o Uso Limitado de Dados e especificar manualmente a localização:

```
{
    "customer_consent": true,
    "payload": {
        "schema": [
            "EMAIL",
            "DATA_PROCESSING_OPTIONS",
            "DATA_PROCESSING_OPTIONS_COUNTRY",
            "DATA_PROCESSING_OPTIONS_STATE"
        ],
        "data": [
            [
                "<HASHED_DATA>",
                ["LDU"],
                1,
                1000
            ]
        ]
    }
}
```

[](#)

#### Campos de `session`

Nome

Descrição

`session_id`  
número inteiro positivo de 64 bits

**Obrigatório.**  
Identificador usado para acompanhar a sessão. Esse número **precisa** ser gerado pelo anunciante e exclusivo para determinada conta de anúncios.

`batch_seq`  
número inteiro positivo

**Obrigatório.**  
Número para identificar a solicitação listada na sessão atual. Ele **precisa** ser sequencial e começar com `1`.

`last_batch_flag`  
booliano

**Obrigatório**

Indica aos nossos sistemas que foram fornecidos todos os lotes para a sessão de substituição em andamento. Quando for definido como `true`, isso significa que a solicitação atual é a última, e não serão aceitos mais lotes na sessão. Caso a sinalização não seja definida, encerraremos a sessão automaticamente 90 minutos após o recebimento do primeiro lote. Os lotes recebidos depois disso serão descartados. **É necessário marcar a última solicitação para que a Meta saiba que o lote em questão é o último.**

`estimated_num_total`  
número inteiro

**Opcional.**  
O total estimado de usuários que serão carregados na sessão. Esse campo é usado para melhorar o processamento da sessão.

#### Resposta

Se for bem-sucedida, a resposta incluirá um objeto JSON com os seguintes campos:

Nome

Descrição

`audience_id`  
string numérica

Identificador do público.

`session_id`  
número inteiro

O ID da sessão informado por você.

`num_received`  
número inteiro

Número total de usuários recebidos nesta sessão até o momento

`num_invalid_entries`  
número inteiro

O número de entradas enviadas com hash incorreto. Essas entradas não retornaram uma correspondência nem foram adicionadas ao público personalizado. Não é um número exato, mas representa a faixa de número dos usuários que não tiveram correspondência.

`invalid_entry_samples`  
matriz JSON de string ou mapa {string: string}

Até 100 exemplos de entradas inválidas na solicitação atual.

Saiba mais sobre como [compartilhar o público personalizado com objetos para empresas](/docs/marketing-api/reference/custom-audience/adaccounts).

### Códigos de erro

Veja a seguir os erros que podem ser recebidos quando você criar públicos personalizados.

Código de erro

Subcódigo de erro

Descrição

Resolução

1

Reduza a quantidade de dados que você está solicitando e tente novamente

Isso está relacionado ao limite de dados que são retornados em uma resposta da API. Apesar de não haver limite máximo, uma boa prática é usar o limite de 20 com paginação.

100

1713098

Formato JSON de regra inválido

Verifique se há problemas no formato e nos parâmetros JSON e tente fazer a chamada novamente.

200

1870050

Erro de permissões

Verifique se a conta de anúncios está vinculada à conta do Gerenciador de Negócios.

200

1870090

Termos do público personalizado não aceitos

Siga as diretrizes dos Termos de Serviço para públicos personalizados, especificamente para empresas cuja conta atua em nome de uma conta de anúncios compartilhada. Para assinar os contratos da empresa original, o usuário deve mudar para uma conta de anúncios que não atue "em nome de" ou que seja de propriedade da empresa que precisa aceitar.

[](#)

## Remover membros de um público personalizado

Use uma chamada de API `DELETE` ao ponto de extremidade `/{audience_id}/users` para especificar a lista de usuários que você quer remover do público personalizado.

```
curl -X DELETE \
  --data-urlencode 'payload={ 
    "schema": "EMAIL_SHA256", 
    "data": [ 
      "<HASHED_DATA>", 
      "<HASHED_DATA>", 
      "<HASHED_DATA>" 
    ] 
  }' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

Outra possibilidade é adicionar o parâmetro `method` e defini-lo como `DELETE` na solicitação `POST` usada para adicionar membros do público.

Você pode remover pessoas de uma lista com `EXTERN_ID`, se disponível.

```
curl -X DELETE \
  --data-urlencode 'payload={ 
    "schema": "EXTERN_ID", 
    "data": [ 
      "<ID>", 
      "<ID>", 
      "<ID>" 
    ] 
  }' \
  -d 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

Você pode remover uma lista de pessoas de todos os públicos personalizados na conta de anúncios por meio desse ponto de extremidade.

Pode haver motivos para as informações não serem processadas. Por exemplo, se a conta de anúncios não pertencer a um portfólio empresarial, se você não tiver aceitado os [Termos de Público personalizado](https://www.facebook.com/legal/terms/customaudience) ou se as informações não corresponderem a um usuário.

Para remover uma conta da Central de Contas, inclua os mesmos campos necessários na [atualização de usuário](/docs/marketing-api/reference/custom-audience/users) e faça uma chamada `HTTP DELETE` a:

```
https://graph.facebook.com/<API_VERSION>/act_<AD_ACCOUNT_ID>/usersofanyaudience
```

[](#)

## Correspondência com várias chaves

Para aumentar a taxa de correspondência dos seus registros, forneça diversas chaves em uma matriz de chaves individuais, por exemplo, \[`EXTERN_ID`, `LN`, `FN`, `EMAIL`\]. Embora não seja necessário aplicar hash a `EXTERN_ID`, esse processo deverá ser feito com todas as informações de identificação pessoal, como emails e nomes. Consulte [Hashing e normalização para várias chaves](#hash) para ver mais informações.

Você pode fornecer algumas chaves ou todas elas para um registro. Para mais detalhes, consulte [Correspondência com várias chaves de ID externo](#example_create_extern).

#### Adicionar usuários com correspondências de várias chaves

```
curl \
  -F 'payload={ 
    "schema": [ 
      "FN", 
      "LN", 
      "EMAIL" 
    ], 
    "data": [ 
      [ 
        "<HASH>", 
        "<HASH>", 
        "<HASH>" 
      ], 
      [ 
        "<HASH>", 
        "<HASH>", 
        "<HASH>" 
      ] 
    ] 
  }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

### Uso de `PAGEUID`

Se você usar a chave `PAGEUID`, será necessário incluir uma lista de identificações de Página. Você pode nos enviar somente um `PAGEUID`, que deve ser uma matriz com um elemento.

```
curl -X POST \
  -F 'payload={
       "schema": [
         "PAGEUID"
       ],
       "is_raw": "true",
       "page_ids": [
            "<PAGE_IDs>"
            ],
       "data": [
         [
           "<HASH>",
           "<ID>",
           "<ID>",
           "<VALUE>"
         ],
         [
           "<HASH>",
           "<ID>",
           "<ID>",
           "<VALUE>"
         ],
         [
           "<HASH>",
           "<ID>",
           "<ID>",
           "<VALUE>"
         ]
       ]
     }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

### Hashing e normalização para várias chaves

É necessário aplicar hash aos dados como `SHA256`. Não aceitamos outros mecanismos de hashing. Isso é obrigatório para todos os dados, exceto [Identificadores Externos](#external_identifiers), [IDs dos usuários do app](/docs/graph-api/reference/user), [IDs dos usuários no escopo da Página](/docs/app-events/bots-for-messenger) e identificações dos anunciantes da plataforma móvel.

Antes de aplicar hash, normalize seus dados para que possamos lidar com eles. **Apenas Nome (`FN`) e Sobrenome (`LN`) aceitam caracteres especiais e alfabetos não romanos. Para melhores resultados de correspondência, forneça a transliteração no alfabeto romano sem caracteres especiais.**

[Baixe este arquivo CSV](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=StvMkz_xdCNqdnYkTe7-Pg&oh=00_Aft6TlOvf2-QUqMfdB5Ukk03w6i935ItlAJY7njMpm6fng&oe=698522E4)

para ver exemplos de dados com hash adequadamente normalizados e convertidos para os parâmetros abaixo.

  
  
[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=StvMkz_xdCNqdnYkTe7-Pg&oh=00_Aft6TlOvf2-QUqMfdB5Ukk03w6i935ItlAJY7njMpm6fng&oe=698522E4)

Chave

Diretrizes

`EMAIL`  
critério: endereços de email

**Hashing obrigatório.**  
Recorte os espaços em branco à esquerda e à direita e converta todos os caracteres em letras minúsculas.

`PHONE`  
critério: telefones

**Hashing obrigatório.**  
Remova símbolos, letras e zeros à esquerda. Adicione o código do país como prefixo caso o campo `COUNTRY` não esteja especificado.

`GEN`  
critério: gênero

**Hashing obrigatório.**  
Use os seguintes valores: `m` para masculino e `f` para feminino.

`DOBY`  
critério: ano de nascimento

**Hashing obrigatório.**  
Use o formato _AAAA_ de 1900 até o ano atual.

`DOBM`  
critério: mês de nascimento

**Hashing obrigatório.**  
Use o formato _MM_ de `01` a `12`.

`DOBD`  
critério: aniversário

**Hashing obrigatório.**  
Use o formato _DD_ de `01` a `31`.

`LN` e `FN`  
critério: nome e sobrenome

**Hashing obrigatório**  
Use somente `a` a `z`. Apenas minúsculas, sem pontuação. Caracteres especiais no formato UTF-8.

`FI`  
critério: inicial do nome

**Hashing obrigatório**  
Use somente `a` a `z`. Apenas minúsculas. Caracteres especiais no formato UTF-8.

`ST`  
critérios: estados dos EUA

**Hashing obrigatório**  
Use o [código de abreviação ANSI de dois caracteres](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFederal_Information_Processing_Standard_state_code&h=AT1tCC53NVJ6ayVFdMffGZ1L8vX82DdCc9pTbc6A7k-O8Q69kuk7zBipZubBzb1vv3t2jEcXmBOgXQejrn87k8MWgxBzUvPbiyC7oBiSEqwFfwbLldJ4I2OWKVx47g50nkgJPd1dbsQS081d3JQd11ZFnA1KY0283D4aWQRhwbE), em minúsculas. Padronize os estados fora dos EUA em minúsculas sem pontuação, caracteres especiais nem espaços em branco.

`CT`  
Critério: cidade

**Hashing obrigatório**  
Use somente `a` a `z`. Apenas minúsculas sem pontuação, caracteres especiais nem espaços em branco.

`ZIP`  
critério: código postal

**Hashing obrigatório**  
Use minúsculas sem espaços em branco. Para os EUA, use apenas os 5 primeiros dígitos. Para o Reino Unido, use o formato área/distrito/setor.

`COUNTRY`  
critério: código do país

**Hashing obrigatório**

Use os códigos de país com duas letras minúsculas no padrão [ISO 3166-1 alfa-2](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_3166-1_alpha-2&h=AT2hrK-wylgfHe8FGp-yVx5Uf79wFRr2e0FjldpPV5q0_ByfEchOT2t1_rEowflcLt2sg8TBXCSoxCenjtVPmZlOyhLZcJkl432_lNs4xYDz1_SodQl9-oFcq4Lt00L1dJKQPR57KX5M1f42F3fEz6j25CJWdYkH3LnFvs4xRTs).

`MADID`  
critério: identificação do anunciante da plataforma móvel

**Não converter em hash**

Use apenas letras minúsculas e mantenha os hifens.

[](#)

## Uso de hash

Forneça valores `SHA256` para as chaves normalizadas e representações `HEX` desse valor em letras minúsculas de A a F. A função hash em PHP converte emails e telefones normalizados.

Exemplo

Resultado

`hash("sha256", "mary@example.com")`

f1904cf1a9d73a55fa5de0ac823c4403ded71afd4c3248d00bdcd0866552bb79

`hash("sha256", "15559876543")`

1ef970831d7963307784fa8688e8fce101a15685d62aa765fed23f3a2c576a4e

[](#)

## Identificadores Externos

Você pode fazer a correspondência de pessoas para um público com os próprios identificadores, conhecidos como Identificadores Externos (`EXTERN_ID`). Pode ser qualquer identificação única do anunciante, como IDs de membro de programa de fidelidade, IDs dos usuários e IDs de cookies externos.

Embora não seja necessário aplicar hash à identificação, esse processo deverá ser feito com todas as informações de identificação pessoal (PII) enviadas com os `EXTERN_ID`s.

Para melhorar a correspondência, use exatamente o mesmo formato ao enviar os IDs. Por exemplo, se escolher aplicar hash usando SHA256, use o mesmo valor com hash.

Você pode usar esses IDs como chaves pessoais para [criar](#example_create_extern) públicos personalizados ou [excluir](#example_delete) pessoas deles. Dessa forma, você não precisa carregar novamente nenhuma outra chave correspondente. Se você marcar alguém com informações pessoais convertidas em hash e `EXTERN_ID`, o `EXTERN_ID` terá prioridade menor na correspondência com pessoas no Facebook.

O período de retenção de dados de `EXTERN_ID` é de 90 dias.

É possível reutilizar o mapeamento de `EXTERN_ID` para gerar públicos personalizados a partir de arquivos de clientes em uma mesma conta de anúncios.

Se você tiver um público com campos `EXTERN_ID` na sua conta de anúncios, crie um novo público somente com esses identificadores.

```
curl \
  -F 'payload={"schema":"EXTERN_ID","data":["<ID>","<ID>"]}' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

Você também pode adicionar pessoas com marcações de `EXTERN_ID` e correspondência com várias chaves.

```
curl \
  -F 'payload={ 
    "schema": [ 
      "EXTERN_ID", 
      "FN", 
      "EMAIL", 
      "LN" 
    ], 
    "data": [ 
      [ 
        "<ID>", 
        "<HASH>", 
        "<HASH>", 
        "<HASH>" 
      ], 
      [ 
        "<ID>", 
        "<HASH>", 
        "<HASH>", 
        "<HASH>" 
      ], 
      [ 
        "<ID>", 
        "<HASH>", 
        "<HASH>", 
        "<HASH>" 
      ] 
    ] 
  }' \
  -F 'access_token=<ACCESS_TOKEN>' \
  https://graph.facebook.com/<VERSION>/<CUSTOM_AUDIENCE_ID>/users
```

Aceitamos parâmetros `EXTERN_ID` para [contas de anúncios](https://developers.facebook.com/docs/marketing-api/reference/) individuais. Não é possível usar valores de uma conta de anúncios em outras, mesmo que elas pertençam à mesma entidade.

[](#)

## API de Substituição de Usuários

O ponto de extremidade `/<CUSTOM_AUDIENCE_ID>/usersreplace` permite que você realize duas ações com uma chamada de API:

-   Remover completamente os usuários existentes de um público específico;
    
-   Substituí-los por um novo conjunto de usuários.
    

O ponto de extremidade `/<CUSTOM_AUDIENCE_ID>/usersreplace` permite que você remova automaticamente todos os usuários existentes em vez de carregar uma lista com todos os usuários a serem excluídos. **Ele não redefinirá a [fase de aprendizado](https://www.facebook.com/business/help/112167992830700) do seu conjunto de anúncios quando um público estiver em conjuntos ativos, ao contrário das chamadas de API POST ou DELETE ao [ponto de extremidade `/<CUSTOM_AUDIENCE_ID>/users`](/docs/marketing-api/reference/custom-audience/users/).**

A API de Substituição de Usuários funciona apenas com públicos que atendem aos requisitos a seguir:

-   O número de usuários no local antes da execução do processo de substituição deve ser menor que 100 milhões. Se o público for maior que esse valor, sugerimos usar o [ponto de extremidade `/<CUSTOM_AUDIENCE_ID>/users`](/docs/marketing-api/reference/custom-audience/users/) para adicionar e remover usuários.
    
-   O subtipo deve ser definido como `CUSTOM`.
    
-   Não é possível substituir um público personalizado de arquivo de cliente baseado em valor por outro que não tenha como base um valor e vice-versa.
    

### Primeiros passos

Antes de você começar o processo de substituição, recomendamos o seguinte:

-   Verifique se o `operation_status` do público é `Normal`.
    

Não é possível executar mais de uma operação de substituição ao mesmo tempo.

-   Não adicione nem remova usuários usando `/<CUSTOM_AUDIENCE_ID>/users` durante uma operação de substituição por meio de `/<CUSTOM_AUDIENCE_ID>/usersreplace`. Caso tente fazer uma segunda operação de substituição antes que a primeira seja concluída, você receberá uma mensagem indicando que já existe uma operação em andamento.
    
-   A janela de duração máxima de uma sessão de substituição é de 90 minutos. A API rejeitará os lotes da sessão recebidos após esse período. Se for necessário enviar lotes durante mais de 90 minutos, recomendamos esperar até que a operação de substituição da sessão tenha sido finalizada e, depois, usar a operação de adição do ponto de extremidade `/<CUSTOM_AUDIENCE>/users` para os carregamentos restantes.
    
-   Assim que seu público estiver pronto, especifique a lista de usuários que você quer substituir pelo público personalizado por meio de uma chamada `POST` a `/<CUSTOM_AUDIENCE_ID>/usersreplace`.
    
    -   Após iniciar o processo de substituição, o `operation_status` do seu público mudará para `replace_in_progress`.
        
    -   Caso a operação de substituição não tenha sido concluída, o `operation_status` do público mudará para `replace_error`.
        
    -   Uma resposta 471 para operation\_status indica que o público personalizado foi sinalizado por motivos de integridade.
        
    

### Exemplo de solicitação

```
v24.0
```

### Parâmetros de chamada

Os seguintes parâmetros podem ser incluídos na sua chamada `POST` a `/<CUSTOM_AUDIENCE_ID>/usersreplace`:

Nome

Descrição

`session`

objeto JSON

**Obrigatório.**  
Usado para rastrear o carregamento de um lote específico de usuários. É necessário incluir um ID de sessão e informações do lote. Consulte [Campos de session](#session-fields).  
Você pode adicionar até 10 mil pessoas a um público por vez. Caso queira adicionar mais que isso, divida a sessão em vários lotes com um ID de sessão.

Exemplo:

```
{ 'session_id':9778993, 'batch_seq':10, 'last_batch_flag':true, 'estimated_num_total':99996 }
```

`payload`

objeto JSON

**Obrigatório.**  
Usado para fornecer as informações que você quer carregar no público. Precisa incluir `schema` e `data`. Consulte [Campos de carga](#payload-fields) para saber mais.

Exemplo:

```
{ "schema":"EMAIL", "data":[ ["<HASHED_EMAIL>"], ["<HASHED_EMAIL>"], ["<HASHED_EMAIL>"] ] }
```

#### Campos de objeto de `session`

Nome

Descrição

`session_id`

número inteiro de 64 bits

**Obrigatório.**  
Usado para acompanhar a sessão. Você precisa gerar esse identificador, e o número deve ser único dentro da mesma conta de anúncios.

`batch_seq`

número inteiro

**Obrigatório. Precisa começar com `1`.**  
Uma nova sessão de substituição começa quando recebemos uma `batch_seq` de `1`. Recomendamos não enviar lotes duplicados com uma sequência de `1` para determinado `session_id`.  
É importante identificar o primeiro lote, pois os lotes restantes da sessão podem ser duplicatas ou outro número (com exceção de `1`, usado para marcar o início da sessão). Todos os lotes não iniciais de uma sessão devem ser enviados após o primeiro. Considere o primeiro lote como gatilho/etapa prévia para a operação de substituição.

`last_batch_flag`

Booliano

**Opcional.**  
Indica que foram fornecidos todos os lotes para a sessão de substituição em andamento. Quando for definido como true, não serão aceitos mais lotes na sessão. Caso a sinalização não seja definida, a sessão será encerrada automaticamente 90 minutos após o recebimento do primeiro lote. Os lotes recebidos depois disso serão descartados.

`estimated_num_total`

número inteiro

**Opcional.**  
O total estimado de usuários que serão carregados na sessão. Usado pelo nosso sistema para aprimorar o processamento de uma sessão.

#### Campos de objeto de `payload`

Nome

Descrição

`schema`

string ou matriz de string JSON

**Obrigatório.**  
Especifique o tipo de informação que você fornecerá. Pode ser uma chave única ou várias chaves desta lista:

-   `EMAIL`
    
-   `PHONE`
    
-   `GEN`
    
-   `DOBY`
    
-   `DOBM`
    
-   `DOBD`
    
-   `LN`
    
-   `FN`
    
-   `FI`
    
-   `CT`
    
-   `ST`
    
-   `ZIP`
    
-   `COUNTRY`
    
-   `MADID`
    
-   `["hash1", "hash2", ...]`
    

Exemplo:

```
["PHONE", "LN”, “FN”, “ZIP”, “DOBYM"]
```

`data`

matriz JSON

**Obrigatório.**  
Lista de dados que correspondem ao esquema.

Exemplos:

-   Se o esquema for `"EMAIL"`, os dados deverão ser uma lista de hashes `sha256` de email.
    
-   Se o esquema for uma lista de hashes (como no último exemplo), os dados deverão ser como `"phone_hash_value"` e `"LN_FN_ZIP_DOBYM"`.
    

Ao fazer a solicitação `POST`, você receberá uma resposta com os seguintes campos:

Nome

Descrição

`account_id`

número inteiro

O identificador da conta.

`session_id`

número inteiro

O ID da sessão fornecido anteriormente.

`num_received`

número inteiro

O total de usuários recebidos na sessão até o momento.

`num_invalid_entries`

número inteiro

O total de usuários com formato inválido ou que não puderam ser decodificados. Verifique novamente seus dados se esse número não for zero.

`invalid_entry_samples`

matriz de strings JSON

Até 100 exemplos de entradas inválidas na solicitação atual. Verifique seus dados novamente.

### Erros comuns da API de Substituição de Usuários

Todos os erros retornados do ponto de extremidade `/{custom-sudience-id}/usersreplace` têm o código de erro **2650**. Veja alguns dos subcódigos de erros mais comuns, além de orientações sobre como corrigir cada problema.

Subcódigo de erro

Descrição

O que fazer

1870145

Atualização de público em andamento

Não é possível substituir um público personalizado da lista de clientes que estiver em processo de atualização. Aguarde até que a disponibilidade do público seja "Normal" e tente novamente.

1870158

A sessão de substituição atingiu o tempo-limite

O limite de 90 minutos foi atingido para a sessão de substituição em lote. O público personalizado da lista de clientes será substituído pelo que foi carregado até o momento. Para fazer mais inclusões aos públicos personalizados, aguarde até que o processo de substituição seja finalizado e, depois, use a operação `ADD`.

1870147

Carregamento de lote inválido para substituição

O primeiro `batch_seq` não foi detectado. Você precisa iniciar o `batch_seq` com o número inteiro `1`.

1870159

Sessão de substituição concluída

A operação de substituição foi concluída porque você carregou um lote com `last_batch_flag==true`. Para incluir lotes adicionais aos públicos personalizados, aguarde até que o processo de substituição seja finalizado e, depois, use a operação `ADD`.

1870148

Ocorreu um erro

A lista de clientes não foi completamente atualizada. Se o público tiver tamanho significativamente diferente do esperado, tente novamente.

1870144

Tamanho do público personalizado do arquivo de dados não compatível com substituição

Não é possível substituir o público de um cliente por uma lista com 100 milhões de clientes ou mais.

[](#)

## Perguntas frequentes

[What is the recommended maximum value of "limit" that should be used in the /customaudiences endpoint?](#faq_4122136041349361)

The `limit` field is the maximum number of objects that may be returned in an API call. There is no specific maximum value of the `limit` parameter when querying the custom audience endpoints.

However, the best practice is to use a limit of 20 with pagination. See the [Paginated Results documentation](/docs/graph-api/results) for more information.

[Link permanente](#faq_4122136041349361)

[What are the limits on the number of custom audiences we can have in an account?](#faq_745805084468770)

The limits we have on the number of custom audiences in an account:

-   Standard Data File Custom Audiences: 500
-   Custom Audiences from your website: 10000
-   Mobile App Custom Audiences: 200
-   Lookalike Audiences: 500

[Link permanente](#faq_745805084468770)

[Is hashing required for Mobile Advertiser IDs (MADID)?](#faq_712932687771706)

No.

[Link permanente](#faq_712932687771706)

[Are there any restrictions on an audience based on the Customer File Source (i.e., USER\_PROVIDED\_ONLY, PARTNER\_PROVIDED\_ONLY, BOTH\_USER\_AND\_PARTNER\_PROVIDED)?](#faq_1229608728755431)

Currently, there are no restrictions on the `customer_file_source` field when creating a custom audience using the Marketing API.

[Link permanente](#faq_1229608728755431)

[How do you resolve the "Custom Audience Terms Not Accepted" error?](#faq_1295351912013535)

The "Custom Audience Terms Not Accepted" error typically occurs when attempting to create or use a custom audience on Meta's advertising platform without accepting the necessary terms and conditions or when accepting the terms and conditions for an ad account on behalf of or shared with different businesses.

Please see the [Custom Audiences Terms of Service](/docs/marketing-api/audiences/reference/custom-audience-terms-of-service) document for more information on accepting the terms of service while checking the special use cases of shared ad accounts or on behalf of ad accounts.

[Link permanente](#faq_1295351912013535)

[](#)

## Recursos

Você pode criar e direcionar ou compartilhar outros tipos de público:

-   **[Públicos personalizados do site](/docs/reference/ads-api/custom-audience-website)**: crie um público com base nas pessoas que visitaram uma página específica ou realizaram ações no site. Crie um público com base em dados do [Pixel da Meta](/docs/marketing-api/audiences-api/pixel) no seu site.
    
-   **[Públicos personalizados do app para celular](/docs/marketing-api/audiences-api/mobile-apps)**: crie um público com base nas pessoas que usam seu app para celular. Gere um público com base em dados de [eventos do app](/docs/app-events).
    
-   **[Públicos semelhantes](/docs/reference/ads-api/lookalike-audience-targeting)**: identifique pessoas que você já conhece e anuncie para usuários semelhantes no app do Facebook.
    
-   **[Públicos personalizados offline](/docs/marketing-api/audiences-api/offline)**: crie um público com base nas pessoas que visitaram sua loja, ligaram para o atendimento ao cliente ou fizeram outras ações offline.
    
-   **[Anúncios de coleção](/docs/marketing-api/guides/collection#audience)**: crie um público com todas as pessoas que tiveram engajamento com seu Canvas.
    

[](#)

## Veja também

-   [Público personalizado](/docs/marketing-api/reference/custom-audience)
    
-   [Usuários de público personalizado](/docs/marketing-api/reference/custom-audience/users)
    
-   [Sessões de público personalizado](/docs/marketing-api/reference/custom-audience-session/)
    
-   [Termos de Serviço para público personalizado](/docs/marketing-api/audiences-api/custom-audience-terms-of-service)
    

[](#)