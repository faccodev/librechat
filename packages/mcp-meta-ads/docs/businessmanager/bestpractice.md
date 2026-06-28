---
title: "Boas práticas - Business Management APIs"
source: "https://developers.facebook.com/docs/marketing-api/businessmanager/bestpractice"
scraped_at: "2026-02-01T15:50:43.767Z"
---

# Boas práticas

Siga estas boas práticas se você for um **[Parceiro de Marketing do Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebookmarketingpartners.com%2F&h=AT2OSJjmsPnTxwMf4U6kvVbTCE-Xzb-QttaOSfh79_Jlp0nG4ORfF_c0Yt5AKmrIjPgKjFpX9LQQvh4RXbo2EIj2j3vxn54DrbCrPqyD8MiN9GQGDBXbJv3vcERdTBYsgrYQfVtR8_xmheUVq0jshA6y2mIpZHH4-xEHxcUIve0)** ou um **anunciante** que gerencie contas de anúncios ou Páginas. A forma como você lida com ativos depende da sua função e propriedade. Confira esta lista com diferentes abordagens que podem ser adotadas.

## Solução de 2 níveis do Gerenciador de Negócios

A [solução de 2 níveis do Gerenciador de Negócios](https://developers.facebook.com/docs/marketing-api/2tier-bm-solution) é uma alternativa escalável para que um Gerenciador de Negócios crie e gerencie empresas derivadas. Ela permite que você faça o seguinte:

-   Criar e excluir centenas ou milhares de Gerenciadores de Negócios pequenos (derivados) de um Gerenciador de Negócios principal
    
-   Gerenciar os gastos desses Gerenciadores de negócios derivados por uma linha de crédito única
    
-   Criar uma presença empresarial pequena
    
-   Criar ativos para o usuário
    
-   Oferecer anúncios do Facebook ao usuário final no seu site ou plataforma
    

[](#)

## Como gerenciar anúncios e Páginas

### O Parceiro de Marketing tem contas de anúncios e Páginas

-   O app do Parceiro de Marketing gerencia ativos
    
-   O Parceiro de Marketing gerencia ativos de forma programática
    
-   Os funcionários do Parceiro de Marketing gerenciam ativos
    
-   [Os funcionários do Parceiro de Marketing gerenciam ativos](#bm-best-manages-employees)
    
-   [Como organizar contas de anúncios e Páginas](#bm-best-map-ads-pages)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    

### O Parceiro de Marketing tem contas de anúncios. O cliente é dono de Páginas.

-   [O Parceiro de Marketing tem contas de anúncios e o cliente é dono de Páginas](#bm-best-pmd-owns-ads)
    

### O anunciante possui contas de anúncios e Páginas

-   Os funcionários do anunciante usam o app do Parceiro de Marketing
    
-   [Os funcionários fazem login no app do Parceiro de Marketing](#bm-best-user-token)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    
-   Os funcionários do Parceiro de Marketing gerenciam os ativos dos clientes via autorização de acesso
    
-   [Como organizar contas de anúncios e Páginas](#bm-best-map-ads-pages)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    
-   O Parceiro de Marketing gerencia ativos com nomes de usuário e senhas do anunciante. Existe algum problema?
    
-   O nome de usuário e a senha do cliente podem ser armazenados pelo Parceiro de Marketing?
    
    -   [O Parceiro de Marketing armazena as senhas do cliente](#bm-best-passwords)
        
    
-   Como ajudar clientes a solucionar problemas?
    
    -   [O Parceiro de Marketing ajuda clientes a solucionar problemas](#bm-best-troubleshooting)
        
    

### Sem conta de anúncios

#### O Parceiro de Marketing tem Páginas

-   Os funcionários do Parceiro de Marketing gerenciam Páginas
    
-   [Os funcionários do Parceiro de Marketing gerenciam ativos](#bm-best-manages-employees)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    
-   O app do Parceiro de Marketing gerencia Páginas
    
-   [Utilizar usuário do sistema sem anúncios](#bm-best-no-ads-app)
    

#### O cliente tem Páginas

-   Os funcionários do cliente usam o app do Parceiro de Marketing
    
-   [O cliente faz login no app do Parceiro de Marketing](#bm-best-user-token)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    
-   Os funcionários do Parceiro de Marketing gerenciam Páginas do cliente
    
-   [Como organizar contas de anúncios e Páginas](#bm-best-map-ads-pages)
    
-   [Não quer usar um login pessoal?](#bm-best-personal-login)
    

* * *

[](#)

## O cliente faz login no app do Parceiro de Marketing

**Os ativos pertencem ao cliente, que faz login diretamente no app do Parceiro de Marketing. O app do Parceiro de Marketing utiliza o token do usuário.**

-   Não é necessário alterar o código dos apps que utilizam o token do usuário para realizar uma ação. O cliente se conecta e o app recebe o token que dá acesso aos ativos do usuário assim como acontecia antes.
    
-   Assim como antes, talvez o usuário precise de um token de longa duração para realizar suas ações autônomas.
    
-   Um cliente é mais propenso a ter diversas contas de anúncios e páginas conectadas ao próprio usuário. Recomendamos que seu app permita ao cliente escolher as contas de anúncios e Páginas para uso na plataforma do Parceiro de Marketing.
    

[](#)

## Os funcionários do Parceiro de Marketing gerenciam ativos

**O Parceiro de Marketing tem os ativos e os gerencia por meio de funcionários.**

-   Adicione funcionários ao Gerenciador de Negócios do Parceiro de Marketing e atribua funções a cada funcionário para os ativos necessários. Muitos dos nossos documentos para Agência falam sobre esse método.
    
-   Às vezes o Parceiro de Marketing precisa ter um número muito grande de funcionários (como um call center) operando em contas de anúncios ou páginas do Parceiro de Marketing.
    
-   Quando for possível, recomendamos adicionar todos os funcionários ao Gerenciador de Negócios.
    
-   Se o número de funcionários ficar muito grande, os funcionários do Parceiro de Marketing poderão fazer a autenticação direta e utilizar um usuário do sistema (situação C) para automatizar ações. Para isso, o Parceiro de Marketing precisa relacionar esses funcionários com os ativos corretos nos seus próprios sistemas. Limitamos o número de usuários do sistema que cada Gerenciador de Negócios pode criar, já que eles têm a finalidade única de dar suporte à automação e o mapeamento 1:1 não é compatível. Para fazer esse tipo de mapeamento, adicione os usuários diretamente como funcionários ao Gerenciador de Negócios. Esse estilo de "autenticação independente" só é permitido quando todas as pessoas que utilizam são funcionários do Parceiro de Marketing. Tudo que interage com o cliente final deverá ser autenticado com as credenciais do Facebook do cliente, ou o cliente deverá autorizar o Gerenciador de Negócios do Parceiro de Marketing.
    

[](#)

## O Parceiro de Marketing armazena as senhas do cliente

**O Parceiro de Marketing salva ou armazena as senhas do cliente para gerenciar as contas de anúncios pertencentes.**

-   Esse modelo não é aprovado. Os clientes não podem armazenar as senhas dos clientes finais.
    

[](#)

## O Parceiro de Marketing ajuda clientes a solucionar problemas

**Os ativos e contas de anúncios do cliente são de propriedade dele. No entanto, os funcionários do Parceiro de Marketing precisam de acesso a essas contas para fins de solução de problemas.**

-   Peça ao cliente para autorizar o Gerenciador de Negócios do Parceiro de Marketing na sua página ou conta de anúncios com o nível certo de acesso.
    
-   No Gerenciador de Negócios do Parceiro de Marketing, qualquer funcionário pode ter no máximo o nível de acesso que o cliente concedeu ao Gerenciador de Negócios.
    
-   Se existir uma organização de suporte, configure um ou mais Gerenciadores de Negócios para incluir a equipe certa e manter o nível desejado de isolamento entre os funcionários.
    
-   Após a conclusão da tarefa, o Parceiro de Marketing poderá remover a conta de anúncios ou a página do Gerenciador de Negócios para diminuir a responsabilidade. Como alternativa, o cliente pode revogar o acesso.
    

[](#)

## O Parceiro de Marketing tem contas de anúncios e o cliente é dono de Páginas

**O Parceiro de Marketing é dono das contas de anúncios do cliente, que tem as próprias Páginas.**

-   O cliente não precisará criar seu Gerenciador de Negócios se tiver apenas algumas Páginas.
    
-   O Gerenciador de Negócios do Parceiro de Marketing solicitará acesso a uma Página do cliente. Se o usuário do Parceiro de Marketing for um administrador da Página, ele concederá o acesso imediatamente. Se não for, um administrador da Página deverá conceder acesso.
    
-   Assim que o Gerenciador de Negócios do Parceiro de Marketing conseguir acessar a Página, ele poderá atribuir acesso aos seus próprios usuários e também criar anúncios para ela.
    

[](#)

## Como organizar contas de anúncios e Páginas

**O Parceiro de Marketing tem várias contas de anúncios e Páginas de clientes e quer mapear quais ativos pertencem a quais clientes.**

-   O Parceiro de Marketing conta com um Gerenciador de Negócios que pode ter vários projetos criados e é dono ou tem acesso a todas as contas de anúncios e Páginas. Há um projeto para cada cliente com as contas de anúncios e Páginas correspondentes. Os usuários do Parceiro de Marketing devem criar anúncios no contexto de um projeto para evitar usar a conta de anúncios errada.
    

[](#)

## Não quer usar um login pessoal?

**Os funcionários do Parceiro de Marketing ou do cliente não querem usar os próprios logins pessoais do Facebook para acessar o Gerenciador de Negócios.**

-   Recomendamos que os funcionários do cliente ou do Parceiro de Marketing entrem no Facebook com os logins pessoais e usem os próprios tokens de acesso do usuário para acessar as contas de anúncios ou Páginas. Essa abordagem aumenta a responsabilização pelo trabalho.
    
-   Se o Parceiro de Marketing ou o cliente criar um usuário falso no Facebook e permitir que vários funcionários façam login com essa conta, o Facebook poderá identificar o usuário como spam e suspendê-lo.
    

[](#)

## Utilizar usuário do sistema sem anúncios

**O app do Parceiro de Marketing não tem acesso ao gerenciamento de anúncios, mas é preciso acessar o usuário do sistema do Gerenciador de Negócios para usar APIs de Páginas.**

-   É possível usar apps de gerenciamento de anúncios para criar [usuários do sistema](/docs/marketing-api/businessmanager/systemuser) de um Gerenciador de Negócios. Aqueles sem acesso aos anúncios, como os Parceiros de Marketing de Página, precisarão da ajuda do Facebook para que sejam incluídos em uma lista de permissão. Trabalhe em conjunto com seu gerente de parceiros para fazer isso.
    
-   Após a criação de um usuário do sistema desse tipo, você poderá gerar um token de acesso exclusivo da Página para uso com a API de Páginas.
    

[](#)