---
title: "Limitação de volume - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/overview/rate-limiting"
scraped_at: "2026-02-01T13:52:01.263Z"
---

# Limitação de volume da API de Marketing

A API de Marketing tem a própria lógica de limitação de volume e está excluída de todos os limites de volume da Graph API. Assim, se você fizer uma chamada da API de Marketing, ela não será considerada na [limitação da Graph API](/docs/graph-api/advanced/rate-limiting).

O recurso que afeta a cota de limitação de volume da API de Marketing é o [Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access/). Ao adicionar o produto da API de Marketing ao [Painel de Apps](https://developers.facebook.com/apps), você já receberá o **Acesso Padrão** ao Gerenciamento de Anúncios. Com isso, você terá acesso de desenvolvimento à API de Marketing. Se você precisar de mais cota de limitação de volume, atualize para o **acesso avançado** o Acesso Padrão ao Gerenciamento de Anúncios na [análise do app](/docs/marketing-api/overview/authorization/).

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=379348614568391&version=1765810337)

### Cotas

Acesso à API de Marketing

Acesso Padrão ao Gerenciamento de Anúncios

Capacidade

Acesso ao desenvolvimento

Acesso padrão

Cota básica de limitação de volume

Acesso padrão

Acesso avançado

Mais cota de limitação de volume

A maior parte das solicitações da API de Marketing e da API de Páginas está sujeita aos limites de volume de casos de uso de empresas (BUC, pelas iniciais em inglês) e depende dos pontos de extremidade sendo consultados. Você poderá descobrir isso verificando se a sua solicitação `HTTP` contém um cabeçalho `X-Business-Use-Case`. Veja mais detalhes em [Limites de volume de casos de uso de empresas](/docs/graph-api/overview/rate-limiting#buc-rate-limits).

## Limites no nível da API da conta de anúncios

-   A limitação de volume está no nível da conta de anúncios.
    
-   A limitação de volume acontece em tempo real em um determinado intervalo de tempo.
    
-   Cada chamada da API de Marketing recebe uma pontuação. A pontuação representa a soma das chamadas da API.
    
-   Aplicamos uma pontuação máxima. Em geral, uma chamada da API de leitura é igual a 1 ponto, e uma chamada da API de gravação é igual a 3 pontos, e quando a pontuação máxima for atingida, lançaremos um erro de limitação.
    
    -   Se o app estiver no nível de desenvolvimento da API de Marketing:
        
        -   A pontuação máxima é 60.
            
        -   A taxa de decaimento é de 300 segundos.
            
        -   Se atingir a pontuação máxima, você passará por 300 segundos de bloqueio.
            
        
    -   Se o app estiver no nível padrão da API de Marketing:
        
        -   A pontuação máxima é 9.000.
            
        -   A taxa de decaimento é de 300 segundos.
            
        -   Se atingir a pontuação máxima, você passará por 60 segundos de bloqueio.
            
        
    

**Código de erro relacionado:**`17, Error subcode: 2446079, Message: User request limit reached. 613, Error subcode: 1487742, Message: There have been too many calls from this ad-account. Please wait a bit and try again.`

[](#)

## Limitação de volume da plataforma de insights sobre anúncios

-   A limitação de volume está no nível do app.
    
-   A limitação de volume é determinada pela capacidade dos serviços a jusante e de infraestrutura de back-end.
    
-   Quando seu app tiver limitação de volume, todas as chamadas da API de Insights de Anúncios para o app serão limitadas.
    
-   A limitação de volume no nível do app é aplicada.
    

**Código de erro relacionado:**`4, Error subcode: 1504022 or 1504039, Message: There have been too many calls from this app. Wait a bit and try again.`

Quando esse erro for encontrado, reduza suas chamadas novamente.

[](#)

## Limites em nível de app

-   A limitação de volume está no nível do app.
    
-   A limitação de volume é determinada pelo total de usuários de um app.
    
-   Quando seu app tiver limitação de volume, todas as chamadas para o app serão limitadas.
    
-   A limitação de volume no nível do app é aplicada.
    

**Código de erro relacionado:**`4, Message: Application request limit reached`

Quando esse erro for encontrado, reduza suas chamadas novamente.

[](#)

## Limitação de volume de casos de uso de negócios em nível de conta de anúncios

Calculamos a cota de limitação de volume com base no seu nível de acesso à API de Marketing e no seu app.

-   A limitação de volume está no nível da conta de anúncios, e a cota é calculada com base no nível de acesso à API de Anúncios do app.
    
-   `ads_management` – para cada conta de anúncios em um período de uma hora: (100.000 se o seu app estiver no nível Padrão da API de Marketing ou 300 se o seu app estiver no nível de Desenvolvimento) + 40 \* Número de anúncios ativos.
    
-   `custom_audience` – para cada conta de anúncios em um período de uma hora: não deve ser superior a 700.000. Não deve ser inferior a 190.000 se o seu app estiver no nível Padrão da API de Marketing ou 5.000 se o seu app estiver no nível de Desenvolvimento + 40 \* Número de públicos personalizados ativos.
    
-   ads\_insights – para cada conta de anúncios em um período de uma hora: (190.000 se o seu app estiver no nível Padrão da API de Anúncios ou 600 se o seu app estiver no nível de Desenvolvimento) + 400 \* Número de anúncios ativos - 0,001 \* Erros do usuário.
    
-   Gerenciamento de catálogos – para cada conta de anúncios em um período de uma hora: 20.000 + 20.000 \* log2 (usuários únicos).
    
-   Lote de catálogo – para cada conta de anúncios em um período de uma hora: 200 + 200 \* log2 (usuários únicos).
    
-   A limitação de volume da API de Marketing também pode ser determinada pelo tempo total de CPU e pelo tempo total de mural na conta de anúncios. Você terá mais cota se o seu app tiver acesso padrão à API de Marketing; para saber mais, verifique o cabeçalho HTTP `[X-Business-Use-Case](/docs/graph-api/overview/rate-limiting/#headers-2)` e [Limites de volume de casos de uso de empresas](/docs/graph-api/overview/rate-limiting#buc-rate-limits).
    

**Código de erro relacionado:**`80000, 80003, 80004, 80014, Message: There have been too many calls from this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting.`

Verifique o ponto de extremidade da API e o cabeçalho HTTP `X-Business-Use-Case` para confirmar o tipo de limitação. Veja mais detalhes em [Limites de volume de casos de uso de empresas](/docs/graph-api/overview/rate-limiting#buc-rate-limits). Quando esse erro for encontrado, reduza novamente as alterações à conta de anúncios.

[](#)

## Limitação de volume de gastos com anúncios em nível de conta de anúncios

Estabelecemos uma limitação de 10 vezes por dia para fazer alterações nos limites de gastos da sua conta de modo a garantir o desempenho da veiculação de anúncios.

-   O número de alterações nos gastos da conta de anúncios, como os campos spend\_cap, spend\_cap\_action, é limitado
    

**Código de erro relacionado:**`17, Error subcode: 1885172, Message: You can only change your account spending limit 10 times per day. Please wait to make more changes.`

[](#)

## Limites em nível do conjunto de anúncios

O número de alterações nos campos `daily_budget` e `lifetime_budget` do conjunto de anúncios é limitado. Para cada conjunto de anúncios, o orçamento só pode ser alterado 4 vezes por hora; se exceder esse limite, a alteração no orçamento desse conjunto de anúncios será bloqueada por uma hora.

**Código de erro relacionado:**`613, Error subcode: 1487632, Message: You can only change your ad set budget 4 times per hour. Please wait to make more changes.`

Quando esse erro for encontrado, reduza as alterações no conjunto de anúncios.

[](#)

## Limites em nível de anúncio

A criação de anúncios é limitada para uma determinada conta de anúncios com base no limite de gastos diário.

**Código de erro relacionado:**`613, Error subcode: 1487225, Message: User request limit reached`.

Verifique o subcódigo de erro (`1487225`) e o ponto de extremidade da API para confirmar o tipo de limitação. Quando esse erro for encontrado, reduza as alterações. Para aumentar o limite, você também pode aumentar o limite de gastos diário.

[](#)

## Limites de taxa de prevenção contra abusos

Quando nosso sistema detectar que determinadas contas de anúncios geram uma grande quantidade de tráfego anormal, a fim de proteger a estabilidade do sistema e garantir a experiência de outros usuários, reduziremos temporariamente a cota de limitação de volume da API das contas anormais. Tente entrar em contato com o [Suporte da Meta](https://developers.facebook.com/support/) para receber ajuda.

**Código de erro relacionado:**`613, Error subcode: null, Message: (#613) Calls to this api have exceeded the rate limit.`

A diferença entre isso e o limite em nível da API de nível da conta de anúncios é que esse erro não contém subcódigos de erro. Quando encontrar esse erro, investigue se alguma ação está desencadeando solicitações excessivas da API e entre em contato com o [Suporte da Meta](https://developers.facebook.com/support/) para receber ajuda.

[](#)

## Lidar com erros de limitação

### Avaliação inicial

Verifique o nível de acesso à API de Marketing:

Por padrão, os apps têm `development_access` à API de Marketing. Para descobrir em que nível você está, acesse o painel Análise do app. Se tiver Acesso Padrão ao Gerenciamento de Anúncios, isso significará que você está no nível de desenvolvimento do acesso à API de Marketing. Se tiver acesso avançado ao recurso de Acesso Padrão ao Gerenciamento de Anúncios, isso significará que você está no nível padrão de acesso à API de Marketing. Você também pode verificar o cabeçalho `HTTP` e procurar `ads_api_access_tier` no cabeçalho [`X-Ad-Account-Usage`](/docs/graph-api/overview/rate-limiting/#headers), [`X-Business-Use-Case`](/docs/graph-api/overview/rate-limiting/#headers-2) ou [`X-FB-Ads-Insights-Throttle`](/docs/marketing-api/insights/best-practices/#insightscallload).

Se continuar recebendo erros de limitação de volume, considere atualizar para o `standard_access` do Acesso Padrão ao Gerenciamento de Anúncios. Para chegar ao nível padrão e receber uma cota de limitação de volume mais elevada, você pode se inscrever no **acesso avançado** ao recurso de Acesso Padrão ao Gerenciamento de Anúncios no painel Análise do app.

-   **Verifique os códigos de erro:** determine os códigos de erro específicos relacionados com a limitação na resposta da API.
    
-   **Verifique os cabeçalhos HTTP:**
    
    -   [`X-Ad-Account-Usage`](/docs/graph-api/overview/rate-limiting/#headers) contém `acc_id_util_pct`, `reset_time_duration` e `ads_api_access_tier`.
        
    -   [`X-Business-Use-Case`](/docs/graph-api/overview/rate-limiting/#headers-2) contém as informações `call_count`, `total_cputime`, `total_time` e `estimated_time_to_regain_access`, etc. para o ponto de extremidade do caso de uso de negócios.
        
    -   [`X-FB-Ads-Insights-Throttle`](/docs/marketing-api/insights/best-practices/#insightscallload) contém `app_id_util_pct`, `acc_id_util_pct` e `ads_api_access_tier` para os pontos de extremidade da API de Insights de Anúncios.
        
    
-   **Verifique o Painel de Apps:** fornecemos consoles no Painel de Apps que fornecem aos desenvolvedores um insight aprofundado sobre o sistema de limitação de volume e ajuda-os a diagnosticar e prevenir problemas de limitação de volume.
    

### Identifique a causa

-   **Limitação de volume:** entenda as limitações de volume da API de Marketing da Meta para os diferentes pontos de extremidade usados e verifique se o número de solicitações de API está dentro dos limites permitidos para o app.
    
-   **Limites de rajada:** verifique se os limites de rajada estão causando problemas durante os tempos de pico de uso. Normalmente, o tráfego de rajada causará limites no nível da API de nível da conta de anúncios (**Códigos de erro relacionados:**`17`, `613`).
    
-   **Operações incorretas:** investigue se alguma operação incorreta está desencadeando solicitações excessivas de API.
    

### Etapas de mitigação

-   **Prevenir o tráfego de rajada:** distribua solicitações de API uniformemente para evitar limitações causadas por um grande número de acessos em curto período.
    
-   **Otimize solicitações:** combine várias solicitações menores em solicitações em lote, solicitações assíncronas ou em lotes de ID para minimizar o número total de chamadas de API.
    
-   **Estratégia de recuo:** implemente um recuo exponencial ao receber erros de limitação, aumentando gradualmente o tempo entre as tentativas. Você também pode examinar cabeçalhos HTTP para a estimativa de tempo de redefinição.
    

#### Outras dicas de mitigação

-   Verifique se há necessidade de fazer essas chamadas e reduza-as se for desnecessário.
    
-   Para pontos de extremidade que aceitam solicitações assíncronas, como a API de Insights de Anúncios, use [solicitações assíncronas](/docs/marketing-api/asyncrequests) para consultar uma enorme quantidade de dados.
    
-   Você também pode tentar passar uma lista de identificações se precisar consultar vários do mesmo tipo de objetos de anúncio.
    
-   Para a API de Insights, use [Level Parameters](/docs/marketing-api/insights/parameters/v2.7) ou filtre para reduzir o número de chamadas.
    

[](#)