---
title: "Primeiros passos - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/get-started"
scraped_at: "2026-02-01T14:07:05.199Z"
---

# Primeiros passos

Esta página descreve o processo e os pré-requisitos para a implementação da API de Conversões. Se você é um parceiro de terceiros oferecendo funcionalidades da API de Conversões para anunciantes, há [requisitos diferentes](/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform) para começar.

Caso sua empresa use um firewall para solicitações externas, consulte [IPs do rastreador e agentes de usuário](/docs/sharing/webmasters/crawler#identify) para obter os endereços IP do Facebook. É importante lembrar que a lista de endereços é alterada com frequência.

Os eventos de loja física, app e web compartilhados usando a API de Conversões exigem parâmetros específicos. A lista de [parâmetros obrigatórios está disponível aqui](/docs/marketing-api/conversions-api/parameters).

## Visão geral do processo

Veja as etapas de alto nível para configurar a integração da API de Conversões:

1.  Escolher o método de integração adequado para você.
2.  Concluir os pré-requisitos necessários para o método de implementação específico.
3.  Implementar seguindo o método escolhido.
4.  Verificar a configuração e aderir às boas práticas que ajudam a melhorar o desempenho de anúncios.

[](#)

## Métodos de integração

Existem diferentes métodos de integração com a API de Conversões, que variam de acordo com o nível de esforço, custos e recursos. Veja [este artigo](https://www.facebook.com/business/help/433493041367251?id=818859032317965) para uma visão geral das opções de configuração da API de Conversões.

O principal objetivo desta documentação para desenvolvedores é criar integrações diretas.

[](#)

## Requisitos

### Identificação do pixel

É necessário obter a [identificação do Pixel](https://www.facebook.com/business/help/952192354843755?id=1205376682832142) para usar a API de Conversões. Se você já configurou um pixel para seu site, recomendamos que use a mesma identificação para o navegador e os eventos do servidor.

### Gerenciador de Negócios

Você também precisa ter um [Gerenciador de Negócios](https://business.facebook.com/) para usar a API. O Gerenciador de Negócios ajuda os anunciantes a integrar as iniciativas de marketing do Facebook com a própria empresa e parceiros externos. Se você ainda não tiver esse recurso, consulte o artigo da Central de Ajuda sobre [como criar um Gerenciador de Negócios](https://www.facebook.com/business/help/1710077379203657).

### Token de acesso

Para usar a API de Conversões, é necessário ter um token de acesso. Há duas maneiras de obter um token de acesso:

-   Com o Gerenciador de Eventos (recomendado)
    
-   Com seu app
    

#### Com o Gerenciador de Eventos (recomendado)

Para usar a API de Conversões, é necessário gerar um token de acesso, que é transmitido como um parâmetro em cada chamada de API. No Gerenciador de Eventos, siga estas etapas:

**Etapa 1** – Escolha o pixel que você quer implementar.

**Etapa 2** – Selecione a aba Configurações.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/256580685_927677734830755_2094553860769734043_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=o_XHhj6i6ZcQ7kNvwH5P1jX&_nc_oc=Adn73VMt_6E9012bDyHf0eH2zM5u2gUsg9lu_TkcU_r087YH__yvjvESAHRZT9cIZDUbWDXys-EAAJEq4T9eTMfF&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_AfuIdDyBwnu4itWauIgnnp6Sp3hN3KvGmK1FlxDif_BfKA&oe=6999A9BF)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/256580685_927677734830755_2094553860769734043_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=o_XHhj6i6ZcQ7kNvwH5P1jX&_nc_oc=Adn73VMt_6E9012bDyHf0eH2zM5u2gUsg9lu_TkcU_r087YH__yvjvESAHRZT9cIZDUbWDXys-EAAJEq4T9eTMfF&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_AfuIdDyBwnu4itWauIgnnp6Sp3hN3KvGmK1FlxDif_BfKA&oe=6999A9BF)

  

**Etapa 3**. Encontre a seção API de Conversões e clique no link **Gerar token de acesso** na opção Configurar manualmente. Depois, siga as instruções da mensagem pop-up:

**Observação:** o link Gerar token de acesso só pode ser visto por usuários com privilégios de desenvolvedor na empresa. Ele fica oculto para os outros usuários.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/590086877_1236076635017652_6418235756617021850_n.png?_nc_cat=111&ccb=1-7&_nc_sid=e280be&_nc_ohc=LtVdL2s4if0Q7kNvwFExrIr&_nc_oc=AdkhGudTmGV5VOs8CfecTgh7QJ9967AyBjEjAb3-fWEizlye2lp0ZEVXrraRy2eV8dT51z1E_9IjUskWV2n5rrm1&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_Afs_wZU0Mu3Qh9IAewcWQUo_2_5zgWebHF0ltUcg0HF3RQ&oe=6999B39F)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/590086877_1236076635017652_6418235756617021850_n.png?_nc_cat=111&ccb=1-7&_nc_sid=e280be&_nc_ohc=LtVdL2s4if0Q7kNvwFExrIr&_nc_oc=AdkhGudTmGV5VOs8CfecTgh7QJ9967AyBjEjAb3-fWEizlye2lp0ZEVXrraRy2eV8dT51z1E_9IjUskWV2n5rrm1&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_Afs_wZU0Mu3Qh9IAewcWQUo_2_5zgWebHF0ltUcg0HF3RQ&oe=6999B39F)

  

Depois de obter o token, clique no botão **Gerenciar integrações** na aba Visão geral do Gerenciador de Eventos. Na tela pop-up, clique no botão **Gerenciar** ao lado de API de Conversões. Isso criará automaticamente um app e um usuário do sistema da API de Conversões para você. _Não é necessário passar pela análise do app nem solicitar permissões._

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/256525579_1605874206422638_8242489354165474255_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=nVjkMt2IRDkQ7kNvwEV9-8r&_nc_oc=AdkxQXOcoHKmPUTHdmlhXLRcI7ri6yHWQRjhduZF7wIzkdNgNVQzgG5o2c3EuF6E76T2BOxJnISMmzK3VQwWUS1G&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_AfunoY-HGs45F4GmgboafBfTpYaoZibneVLCIiCjK1wVMA&oe=6999A102)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/256525579_1605874206422638_8242489354165474255_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=nVjkMt2IRDkQ7kNvwEV9-8r&_nc_oc=AdkxQXOcoHKmPUTHdmlhXLRcI7ri6yHWQRjhduZF7wIzkdNgNVQzgG5o2c3EuF6E76T2BOxJnISMmzK3VQwWUS1G&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=GwJFuymqH2i46FeWGzg6Fg&oh=00_AfunoY-HGs45F4GmgboafBfTpYaoZibneVLCIiCjK1wVMA&oe=6999A102)

  
  

#### Com seu app

Se você já tiver um [app](https://developers.facebook.com/docs/apps) e um [usuário do sistema](/docs/marketing-api/system-users/create-retrieve-update), será possível gerar o token no [Gerenciador de Negócios](https://business.facebook.com/). Para fazer isso, siga estas etapas:

**Etapa 1** – Acesse as **Configurações** da empresa.

**Etapa 2** – Atribua um pixel ao usuário do sistema. Outra opção é criar um novo usuário do sistema nesta etapa.

**Etapa 3** – Selecione o usuário do sistema atribuído e clique em **Gerar token**.

_Seu app não precisa passar pelo processo de análise. Não é necessário solicitar nenhuma permissão._

Os tokens gerados na aba de configurações da API de Conversões no Gerenciador de Eventos não estão mais restritos ao uso da versão mais recente da Graph API que estava disponível no momento da geração do token. [A partir da versão 12.0](/docs/graph-api/changelog/version12.0#conversions-api), tokens de acesso recém-criados podem ser usados com todas as versões disponíveis da Graph API.

[](#)

## Recursos

-   Central de Ajuda para Empresas: [Sobre o Gerenciador de Negócios da Meta](https://www.facebook.com/business/help/113163272211510)
    
-   Central de Ajuda para Empresas: [Sobre o Pixel da Meta](https://www.facebook.com/business/help/742478679120153)
    
-   Meta Blueprint: [Começar a usar a API de Conversões](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookblueprint.com%2Fstudent%2Fpath%2F219713-get-started-with-the-conversions-api%3Fcontent_id%3DQxA0x02819tjqUN&h=AT1QYGGC_zja0QOF4kEfjQOe_NJ1P9LaDQFbrSXKjzoRfwZLxTxUndSUkNXrchTxsdVKOP-S5apJQ4ltAAcNvBK8czcO92TDRUKhr3XMiI5W4o7dwqo8Splsk5atl02kh_gN1IoMDiE561RRJ9J5gPGjXR62-SJSv1AraHnr11SDbSpN-CK8elJb)
    

[](#)