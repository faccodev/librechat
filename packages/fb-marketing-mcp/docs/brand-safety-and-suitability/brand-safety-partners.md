---
title: "Configuração da integração - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/brand-safety-and-suitability/brand-safety-partners"
scraped_at: "2026-02-01T14:01:58.986Z"
---

# Introdução

A finalidade desta página é fornecer uma visão geral das etapas iniciais de configuração necessárias para a participação no programa. Estes serão os principais elementos abordados:

1.  Configurar uma **empresa** e um **Gerenciador de Negócios**
2.  Criar e obter acesso às contas de anúncios
3.  Criar um **app** para acessar a API da Meta
4.  Fornecer a documentação sobre **adequação e segurança para marcas**

**Empresas e Gerenciador de Negócios**

O Gerenciador de Negócios é a principal ferramenta que você usa para coordenar as operações da sua empresa com a Meta. Ele ajuda a gerenciar seu negócio e atua como um contêiner para objetos importantes da Meta, como contas de anúncios, apps e assim por diante.

## Como criar uma empresa

As páginas a seguir contêm informações gerais, etapas para criar uma empresa e um Gerenciador de Negócios, bem como a documentação para desenvolvedores de API:

-   Criar um Gerenciador de Negócios da Meta
    
-   Visão geral sobre empresas
    
-   Sobre o Gerenciador de Negócios da Meta
    
-   Sobre funções e permissões de contas empresariais
    
-   API do Gerenciador de Negócios (documentação para desenvolvedores)
    

[](#)

## Como estender o acesso a colegas de trabalho

Uma empresa pode ser criada por um indivíduo, mas deve ser estendida ao pessoal relevante da empresa. Consulte as páginas sobre [como adicionar pessoas ao seu Gerenciador de Negócios](https://business.facebook.com/business/help/2169003770027706?helpref=faq_content) e sobre [funções e permissões do Gerenciador de Negócios](https://business.facebook.com/business/help/442345745885606) para saber mais.

Os convidados recebem um email contendo um link que os solicita a fazer login nas respectivas contas pessoais do Facebook.

É preciso ter uma conta pessoal do Facebook para usar o Gerenciador de Negócios. Contudo, os colegas de trabalho não veem as contas uns dos outros no Facebook e não precisam ser amigos na plataforma.

Observe também que muitas funções de Parceiro de Negócios da Meta exigem acesso de administrador.

[](#)

## Antes de começar

Para usar a API de Marketing da Meta (necessária para participação no programa), você precisa [configurar uma conta de desenvolvedor](https://developers.facebook.com/docs/development) e [criar um app](https://developers.facebook.com/docs/development/create-an-app) da Meta.

### Criar um app

1.  Acesse [developers.facebook.com](https://developers.facebook.com/).
2.  Entre na sua conta pessoal do Facebook. Esta etapa deve habilitar o acesso de desenvolvedor na sua conta do Facebook.
3.  Depois de fazer login, selecione "Meus apps" e clique em "Criar aplicativo".
4.  Na próxima tela, verifique se o app está vinculado à sua empresa. Depois, escolha um nome relevante, inclua um email para contato e descreva a finalidade do app antes de clicar em "Criar".

### Estender o acesso a colegas de trabalho

1.  Acesse as configurações do negócio.
2.  Clique em "Contas" e em "Apps".
3.  Selecione seu app e clique em "Adicionar pessoas".
4.  Atribua colegas de trabalho relevantes às funções que permitem desenvolver ou gerenciar apps (ou seja, função de administrador).

Observe que é preciso adicionar os colegas de trabalho à sua empresa primeiro para que eles fiquem disponíveis para seleção no fluxo acima.

### Verificação da empresa

A verificação da empresa é um processo que permite confirmar sua identidade como entidade comercial. Os apps que solicitam acesso avançado para permissões e permitem que outras empresas acessem os próprios dados devem estar conectados a uma empresa que tenha passado pelo [processo de verificação](https://developers.facebook.com/docs/development/release/business-verification).

Saia mais sobre a [verificação da empresa](https://developers.facebook.com/docs/development/release/business-verification).

Leia o post de blog – [Agora a Plataforma do Desenvolvedor exigirá a verificação da empresa para acesso avançado](https://developers.facebook.com/blog/post/2023/02/01/developer-platform-requiring-business-verification-for-advanced-access/).

[](#)

## Como enviar o app para análise

Antes de enviar um app para análise, é importante entender o seguinte:

-   Aplicamos [múltiplas camadas de segurança e permissões, bem como processos](https://developers.facebook.com/docs/marketing-api/overview/authorization#standard) para garantir a proteção dos dados da Meta (sejam eles de usuários ou de anunciantes). Tudo isso é gerenciado por diversas equipes de privacidade e segurança que mantêm nossa documentação para desenvolvedores atualizada.
    
-   Algumas dessas medidas são implementadas no âmbito empresarial, como a [avaliação de terceiros](https://about.meta.com/privacy-progress/) e a [verificação da empresa](https://www.facebook.com/business/help/2058515294227817?id=180505742745347). Outros processos ocorrem quando o parceiro começa a tentar acessar dados mais confidenciais (insights sobre anúncios, informações do publisher, entre outros). Isso inclui, mas não está limitado a, concessões da capacidade de adequação e segurança para marcas, [permissões e recursos](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types#available-permissions) para tipos específicos de dados, [análise do app](https://developers.facebook.com/docs/app-review), [Checkup de Uso de Dados](https://developers.facebook.com/docs/development/maintaining-data-access/data-use-checkup), [Avaliação da Proteção dos Dados](https://developers.facebook.com/docs/development/maintaining-data-access/data-protection-assessment) e [perguntas sobre o uso de dados](https://developers.facebook.com/docs/development/release/data-handling-questions). Além disso, para [extrair os dados do anunciante](https://business.facebook.com/business/help/915885887059947?id=420299598837059), você precisará receber consentimento explícito.
    

Todas as permissões e os acessos do app são registrados na documentação para desenvolvedores. À medida que você desenvolve sua integração:

1.  Sempre que um documento mencionar "permissão", "recurso" ou "acesso", siga as instruções na documentação para desenvolvedores antes de solicitar acesso.
    
2.  Se você receber um erro que diz "permissão" ao fazer uma chamada de API, consulte a documentação para desenvolvedores, pesquise por "permissão" e confirme que você tem todas as permissões exigidas pelo produto em questão.
    

Por exemplo, ao consultar o [documento sobre lista de bloqueio](https://developers.facebook.com/docs/marketing-api/brand_safety/block_list), você verá um conteúdo completo sobre os diferentes tipos de permissões (Ver desempenho, [ads\_read](https://developers.facebook.com/docs/permissions), [ads\_management](https://developers.facebook.com/docs/permissions) e [Acesso Padrão ao Gerenciamento de Anúncios](https://developers.facebook.com/docs/marketing-api/overview/authorization#standard)) e links para documentação adicional sobre cada um. As permissões e os recursos são usados ​​para garantir a segurança dos dados em diversas das nossas integrações de API, incluindo programas fora da adequação e segurança para marcas. Além disso, os apps são revisados ​​pelas nossas equipes de segurança e privacidade.

Nossas equipes de segurança e privacidade analisarão seu app. Essas equipes são mantidas propositalmente separadas das equipes de vendas, parcerias e produtos. Isso significa que elas não estão familiarizadas com os produtos de anúncios da Meta nem com cada caso de uso e seu objetivo é proteger os dados do usuário e do anunciante.

Ao enviar o app para análise, você precisará descrever claramente o seguinte:

1.  Qual funcionalidade do app requer essa permissão?
2.  Como a permissão melhorará a funcionalidade do app? Como a permissão melhorará o funcionamento da integração? Envie detalhes específicos sobre o motivo para a solicitação da permissão/do acesso, incluindo:
    
    a. Escreva uma descrição detalhada de como a permissão será aplicada, usando especificamente o texto da permissão descrito na documentação. Por exemplo, usar a permissão ads\_read para criar e aplicar [listas de bloqueio](https://www.facebook.com/business/help/255483958155378?id=1769156093197771), bem como acessar dados de desempenho de anúncios para campanhas dos anunciantes e fornecer a eles um painel sobre [adequação e segurança para marcas](https://www.facebook.com/business/help/1559334364175848?id=1769156093197771) dos anúncios em questão.
    
3.  Deixe claro que seus usuários finais são anunciantes e você, como parceiro, está fornecendo a eles relatórios sobre o desempenho da publicidade. Como a permissão melhorará a experiência do usuário final?
    
    a. Indique qual será o produto final do uso desses dados. Por exemplo, fornecer uma descrição de [listas de bloqueio](https://www.facebook.com/business/help/255483958155378?id=1769156093197771) e [adequação e segurança para marcas](https://www.facebook.com/business/help/1559334364175848?id=1769156093197771) e vincular à documentação de propriedade da Meta para que a equipe de segurança e privacidade possa entender que esse é um caso de uso aprovado.
    

Consulte [Server-to-Server App Sample Submission](https://developers.facebook.com/docs/app-review/resources/sample-submissions/server-to-server).

[](#)

## Como acessar contas de anúncios do cliente

Você precisa obter acesso às contas de anúncios que seu cliente deseja incluir para adequação e segurança para marcas. Para isso, seu cliente e os respectivos parceiros precisam compartilhar todas as contas de anúncios relevantes com seu Gerenciador de Negócios. Peça ao cliente para acessar a conta de anúncios nas configurações do negócio e clicar em "Atribuir parceiro". Forneça a ele a identificação da sua empresa e solicite o acesso "Ver desempenho". Assim, ele poderá concluir o fluxo de atribuição do parceiro. Consulte [Como adicionar contas de anúncios no Gerenciador de Negócios da Meta](https://business.facebook.com/business/help/915885887059947?id=420299598837059). Neste ponto, a conta de anúncios do cliente deve estar visível nas configurações do negócio.

[](#)

## Outras informações

-   [Como verificar sua empresa nas configurações do negócio](https://www.facebook.com/business/help/2058515294227817?id=180505742745347)
    
-   [Adicionar usuários do sistema ao seu portfólio empresarial](https://www.facebook.com/business/help/503306463479099?id=2190812977867143)
    
-   Para se comunicar de modo efetivo com os clientes, acesse [Sobre a estrutura dos anúncios criados no Gerenciador de Anúncios da Meta](https://www.facebook.com/business/help/706063442820839?helpref=page_content) e saiba mais sobre os objetos das contas de anúncios (campanha, conjunto de anúncios e anúncio).
    
-   [Referência da Graph API: Empresa | Contas de anúncios](https://developers.facebook.com/docs/marketing-api/reference/business/ad_accounts/)
    
-   [Conta de anúncios | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/reference/ad-account)
    
-   [Conta de anúncios e insights | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/reference/ad-account/insights)
    
-   [Referência da Graph API: Conta de anúncios | Campanhas](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/)
    
-   [Conjunto de anúncios | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign)
    
-   [Insights sobre o conjunto de anúncios | Documentação para desenvolvedores](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/insights/)
    
-   [Referência da Graph API: Campanha | Conjuntos de anúncios](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/adsets/)
    

[](#)