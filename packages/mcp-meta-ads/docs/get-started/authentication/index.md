---
title: "Autenticação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/authentication/"
scraped_at: "2026-02-01T14:09:52.539Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/get-started/authentication/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 18 de dez de 2024  

# Autenticação

Na API de Marketing, é preciso enviar um token de acesso como parâmetro em cada chamada de API.

Consulte [Tokens de acesso para tecnologias da Meta](/docs/facebook-login/guides/access-tokens) para obter mais informações sobre os vários tipos de tokens de acesso.

## Obter um token de acesso para seu app

### Tokens de acesso do usuário

#### Explorador da Graph API

Você pode obter um token de acesso do usuário usando o [Explorador da Graph API](https://developers.facebook.com/tools/explorer). Se quiser aprender a usar a ferramenta para fazer chamadas de API, consulte o [Guia do Explorador da Graph API](/docs/graph-api/explorer).

1.  No campo **App da Meta**, selecione um app para obter o token de acesso.
2.  No campo **Usuário ou Página**, selecione **Token do usuário**.
3.  No menu suspenso **Adicionar uma permissão** em **Permissões**, selecione as permissões necessárias (por exemplo, `ads_read` e/ou `ads_management`).
4.  Clique em **Gerar token de acesso**. A caixa na parte superior do botão será preenchida com o token de acesso. [Armazene o token](#storing-the-token) para usar mais tarde.

#### Depurar

Para saber mais sobre o token que você acabou de gerar, clique no ícone de informações (**i**) em frente ao token para abrir a tabela **Informações sobre o token de acesso**, que exibe alguns detalhes básicos. Clique em **Abrir na Ferramenta Token de Acesso** para acessar o [Depurador de Token de Acesso](https://developers.facebook.com/tools/debug/accesstoken).

Durante a depuração, você poderá verificar o seguinte:

-   **ID do app:** o ID do app mencionado na seção de pré-requisitos.
    
-   **Expira:** um carimbo de data e hora. Um token de curta duração expira dentro de uma hora ou duas.
    
-   **Escopos:** contém as permissões adicionadas no Explorador da Graph API.
    

#### Estender token de acesso

1.  Cole seu token na caixa de texto do [Depurador de Token de Acesso](https://developers.facebook.com/tools/debug/accesstoken) e clique em **Depurar**.
2.  Clique em **Estender token de acesso** na parte inferior da tabela **Informações sobre o token de acesso** para obter um token de longa duração e copiá-lo para uso posterior.

Verifique as propriedades do seu novo token usando o Depurador de Token de Acesso. Ele deve ter um tempo de validade mais longo, como 60 dias, ou exibir Nunca no campo **Expira**. Para mais informações, consulte [Tokens de longa duração de acesso](/docs/facebook-login/access-tokens/refreshing).

### Tokens de acesso de usuário do sistema

Um token de acesso de usuário do sistema é um tipo de token de acesso associado a uma conta de usuário do sistema, que é uma conta criada no Gerenciador de Negócios da Meta com o objetivo de gerenciar ativos e fazer chamadas à API de Marketing. Os tokens de acesso de usuário do sistema serão úteis para interações entre servidores onde não houver um usuário presente para autenticar. Eles podem ser usados para realizar ações em nome da empresa, como ler e escrever dados do negócio, além de gerenciar campanhas e outros objetos do anúncio.

Uma vantagem de usar um token de acesso de usuário do sistema é que ele não expira, o que significa que ele pode ser utilizado em scripts ou serviços de longa duração que precisam acessar a API de Marketing. Além disso, como as contas de usuário do sistema não estão vinculadas a um indivíduo específico, elas podem ser usadas para fornecer um nível de separação entre atividades pessoais e comerciais em tecnologias da Meta.

Os tokens de usuário do sistema também são menos propensos a serem invalidados por outros motivos, em comparação aos tokens de acesso de usuário de longa duração.

Consulte [Usuários do sistema](/docs/marketing-api/system-users) para saber mais.

[](#)

## Obter um token de acesso para contas de anúncios que você gerencia

Quando o proprietário de uma conta de anúncios que será gerenciada por você clicar no botão **Permitir** após a solicitação das permissões, ele será redirecionado para um URL que contém o valor do parâmetro `redirect_uri` e um código de autorização.

```
http://SEU_URL?code=<AUTHORIZATION_CODE>
```

Você poderá então criar o URL para uma chamada de API que inclui o ponto de extremidade com o objetivo de obter um token, o ID do app, o URL do site, a chave secreta do app e o código de autorização que acabou de receber:

```
v24.0
```

A resposta da API deve conter o token de acesso gerado:

-   Ao seguir o fluxo de autenticação do servidor, você receberá um token persistente.
    
-   Caso opte pelo fluxo de autenticação do lado do cliente, você receberá um token com um prazo de validade limitado, de uma a duas horas. Ele poderá ser substituído por um token persistente. Basta fazer uma chamada ao [ponto de extremidade da Graph API para tokens estendidos](/docs/facebook-login/access-tokens/expiration-and-extension).
    

Se a API for invocada por um [usuário do sistema](/docs/marketing-api/system-users) de uma empresa, você poderá usar um [token de acesso de usuário do sistema](/docs/marketing-api/system-users/install-apps-and-generate-tokens).

É possível depurar o token, verificar a data de expiração e validar as permissões concedidas no [Depurador de Token de Acesso](/tools/accesstoken) ou usando a [API de Validação Programática](/docs/facebook-login/access-tokens#debug).

[](#)

## Como armazenar o token

O token deve ser armazenado com segurança no seu banco de dados para chamadas de API subsequentes. A movimentação de tokens entre seu cliente e o servidor deve ser feita de forma segura via HTTPS para garantir a segurança da conta. [Leia mais sobre as implicações de mover tokens entre os clientes e seu servidor.](/docs/facebook-login/access-tokens/portability)

Verifique regularmente a validade do token e, se necessário, solicite a renovação das permissões. Os tokens persistentes também podem se tornar inválidos em alguns casos, incluindo os seguintes:

-   Há alterações na senha.
    
-   As permissões são revogadas.
    

Como os tokens de acesso do usuário podem ser invalidados ou revogados a qualquer momento por razões diversas, é esperado que o app tenha um fluxo para poder solicitar novamente as permissões dos usuários. Verifique a validade do token do usuário quando seu app for iniciado. Se necessário, execute novamente o fluxo de autenticação para obter um token atualizado.

Caso isso não seja possível no seu app, talvez você precise solicitar permissões usando outro método. Isso pode ocorrer em casos em que as chamadas de API não são disparadas diretamente por uma interface do usuário ou são feitas periodicamente por meio da execução de scripts. Para solucionar essa questão, você pode enviar um email com instruções.

[](#)

## Boas práticas para o gerenciamento seguro de credenciais

Para garantir a segurança das credenciais do usuário e dos tokens de acesso, siga estas boas práticas:

-   **Use HTTPS:** sempre transmita tokens de acesso por conexões seguras (HTTPS) para evitar interceptação por agentes mal-intencionados.
    
-   **Armazene tokens de forma segura:** utilize soluções de armazenamento seguras, como bancos de dados criptografados para armazenar acessos e atualizar tokens, minimizando o risco de acesso não autorizado.
    
-   **Limite o escopo do token:** solicite apenas as permissões mínimas necessárias, reduzindo o risco de superexposição dos dados do usuário.
    
-   **Implemente a expiração do token:** atualize os tokens regularmente e tenha um mecanismo sólido para lidar com a expiração, garantindo acesso contínuo sem expor tokens de longa duração.
    

[](#)

## Saiba mais

-   [Tokens de acesso](/docs/facebook-login/access-tokens)
    
-   [Tokens de acesso de longa duração](/docs/facebook-login/access-tokens/refreshing)
    
-   [Depuração e erros](/docs/facebook-login/access-tokens/debugging-and-error-handling)
    
-   [Tokens de acesso à informação da sessão](/docs/facebook-login/access-tokens/session-info-access-token)
    
-   [Portabilidade](/docs/facebook-login/access-tokens/portability)
    

[](#)