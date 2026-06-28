---
title: "Autorização - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/overview/authorization/"
scraped_at: "2026-02-01T14:09:21.140Z"
---

# Autorização

O processo de autorização verifica os usuários e apps que terão acesso à API de Marketing e concede permissões a eles.

## Funções do app

No painel do seu app, é possível definir funções para você ou para os membros da equipe, como Administrador, Desenvolvedor, Testador, conforme necessário.

**Observação:** dependendo do caso de uso pretendido, talvez seja necessário enviar o app para análise a fim de receber permissões específicas relacionadas ao gerenciamento de anúncios.

[](#)

## Níveis de acesso, permissões e recursos

Os apps de empresa estão sujeitos a uma camada adicional de autorização da Graph API chamada [níveis de acesso](/docs/graph-api/overview/access-levels). Durante o processo de [análise](/docs/app-review), seu app também deverá solicitar permissões e recursos específicos.

Todos os desenvolvedores devem seguir os [Termos da Plataforma](/terms) e as [Políticas do Desenvolvedor](/devpolicy) da Meta. **As chamadas em QUALQUER nível de acesso são feitas em relação aos dados de produção.**

### Nível de acesso à API de Marketing e do Acesso Padrão ao Gerenciamento de Anúncios

As permissões e os recursos para apps contam com dois níveis de acesso diferentes: o acesso padrão e o acesso avançado. **Observação:** nesse contexto, o termo "acesso padrão" não está relacionado ao recurso [Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access). O acesso avançado do Acesso Padrão ao Gerenciamento de Anúncios ainda exige que o app seja aprovado no processo de análise.

#### Mapeamento do acesso à API de Marketing e do Acesso Padrão ao Gerenciamento de Anúncios

Acesso à API de Marketing

[Acesso Padrão ao Gerenciamento de Anúncios](/docs/features-reference/ads-management-standard-access)

Ação

Acesso ao desenvolvimento

Acesso padrão

Por padrão

Acesso padrão

Acesso avançado

Solicitar no Painel de Apps

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=379348614568391&version=1765810337)

Para verificar seu nível de acesso atual, navegue até **Painel de Apps** > **Análise do app** > **Permissões e recursos**.

### Permissões e recursos

#### Permissões

As permissões que precisam ser solicitadas mudam de acordo com a API que você quer acessar.

Caso o app gerencie somente sua conta de anúncios, o acesso padrão e as permissões `ads_read` e `ads_management` serão suficientes. Se o app gerenciar contas de anúncios de outras pessoas, será necessário ter acesso avançado e as permissões `ads_read` e/ou `ads_management`. Veja todas as [permissões disponíveis para apps de empresa](/docs/development/create-an-app/app-dashboard/app-types#available-permissions-2).

#### Recursos

Os recursos que devem ser solicitados mudam conforme a maneira como você pretende usar nossas APIs. Se você gerencia anúncios, um recurso comum a ser solicitado é o Acesso Padrão ao Gerenciamento de Anúncios. Veja [todos os recursos disponíveis para apps de empresa](/docs/development/create-an-app/app-dashboard/app-types#available-features-2).

##### Níveis de acesso ao recurso

Nível de acesso ao recurso

Descrição

[Acesso padrão](/docs/graph-api/overview/access-levels/#standard-access)

O acesso padrão será aprovado automaticamente para todas as permissões e todos os recursos disponíveis para os apps de negócios.

Caso você seja iniciante, use essa opção. Você pode criar fluxos de trabalho de ponta a ponta antes de solicitar permissões totais e pode acessar um número ilimitado de contas de anúncios.

Algumas chamadas de API não estão disponíveis com o acesso padrão, porque podem pertencer a várias contas ou porque não é possível identificar a conta afetada de modo programático.

[Acesso avançado](/docs/graph-api/overview/access-levels/#advanced-access)

O acesso avançado deve ser aprovado para cada permissão ou recurso por meio do processo de [análise do app](/docs/app-review).

1.  Para solicitar o acesso avançado, acesse o Painel de Apps e clique em **Análise do app** > **Permissões e recursos**.
2.  Encontre a permissão ou o recurso que você quer acessar e clique em **Solicitar acesso avançado** em **Ação**. É possível selecionar um ou mais recursos. Depois de selecionar suas opções, clique em **Continuar a solicitação**. Então, uma tela que fornece orientações para o processo de envio será exibida.

Após o envio das informações, a Meta responderá com uma mensagem de aprovação ou recusa, com informações adicionais se o app não estiver qualificado para o acesso padrão.

Se você tiver aprovação para o acesso avançado, será preciso realizar as seguintes ações para manter esse status:

-   Ter feito ao menos 1.500 chamadas da API de Marketing com sucesso nos últimos 15 dias.
    
-   Ter feito chamadas da API de Marketing com uma taxa de erro menor do que 15% nos últimos 15 dias.
    

##### Descrição dos níveis de acesso

A tabela abaixo mostra como os níveis de acesso avançado e padrão afetam o recurso Acesso Padrão ao Gerenciamento de Anúncios.

Acesso padrão

Acesso avançado

**Limites de contas**

Gerencie um número ilimitado de contas de anúncios. Administradores ou desenvolvedores de apps podem fazer chamadas de API em nome de administradores de contas de anúncios ou anunciantes.

Gerencie um número ilimitado de contas de anúncios se tiver as permissões `ads_read` ou `ads_management` da conta de anúncios.

**Limites de volume**

Volumes extremamente limitados por conta de anúncio. Somente para desenvolvimento. Não para apps em produção veiculando para anunciantes publicados.

[Volumes ligeiramente limitados](/docs/marketing-apis/rate-limiting) por conta de anúncios.

**Gerenciador de Negócios**

Acesso limitado às APIs do [Gerenciador de Negócios](/docs/business-manager-api) e de [Catálogo](/docs/marketing-api/catalog). Sem acesso do Gerenciador de Negócios para administrar contas de anúncios, permissões de usuários e Páginas.

Acesso a todas as APIs do [Gerenciador de Negócios](/docs/business-manager-api) e de [Catálogo](/docs/marketing-api/catalog).

**Usuário do sistema**

É possível criar um [usuário do sistema](/docs/marketing-api/system-users) e um usuário do sistema administrador.

É possível criar 10 [usuários do sistema](/docs/marketing-api/system-users) e um usuário do sistema administrador.

**Criação da Página**

Não é possível criar Páginas por meio da API.

Não é possível criar Páginas por meio da API.

##### Obter acesso avançado

Para obter o acesso avançado do Acesso Padrão ao Gerenciamento de Anúncios, seu app precisa atender a estes requisitos:

-   Ter feito ao menos 1.500 chamadas da API de Marketing com sucesso nos últimos 15 dias.
    
-   Ter feito chamadas da API de Marketing com uma taxa de erro menor do que 15% nos últimos 15 dias.
    

Se estiver gerenciando os anúncios de outra pessoa, use o parâmetro `scope` para solicitar que ela forneça as permissões `ads_management` ou `ads_read`. Seu app obterá acesso quando ela clicar em **Permitir**.

```
v24.0
```

**Observação:** ao preencher o campo `YOUR_URL`, coloque uma `/` à direita (por exemplo, http://www.facebook.com/).

##### Exemplos de caso de uso

Caso de uso

O que solicitar

Você quer ler e gerenciar anúncios das próprias contas ou de contas de anúncios para as quais tenha recebido acesso.

-   **Permissão:**`ads_management`
    
-   **Recurso:** Acesso Padrão ao Gerenciamento de Anúncios
    

Você quer ler relatórios de anúncios das próprias contas ou de contas de anúncios para as quais tenha recebido acesso.

-   **Permissão:**`ads_read`
    
-   **Recurso:** Acesso Padrão ao Gerenciamento de Anúncios
    

Você quer obter relatórios de anúncios de um conjunto de clientes, bem como ler e gerenciar anúncios de outro conjunto de clientes.

-   **Permissões:**`ads_management` e `ads_read`
    
-   **Recurso:** Acesso Padrão ao Gerenciamento de Anúncios
    

[](#)

## Verificação da empresa

A verificação da empresa é um processo que nos permite verificar sua identidade como entidade corporativa, o que será necessário caso o app acesse dados sensíveis. Saiba mais sobre o processo de [verificação da empresa](/docs/apps/business-verification).

[](#)

## Saiba mais

-   [Permissions Reference for Meta Technologies APIs](/docs/permissions)
    

[](#)