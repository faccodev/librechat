---
title: "2: Como começar a integração - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration"
scraped_at: "2026-02-01T15:48:26.337Z"
---

# 2: Como começar a integração do CRM

Este guia abrange:

-   [Como criar uma nova campanha de anúncios de lead](#step-1--create-a-lead-ads-campaign--optional-)
    
-   [Como criar um novo Pixel de CRM da Meta ou converter um Pixel existente](#step-2--create-a-meta-crm-pixel)
    
-   [Como escolher um método de integração](#step-3--choose-an-integration-method)
    

## Etapa 1: criar uma campanha de anúncios de lead (opcional)

Esta seção é opcional se já tiver campanhas de anúncios de lead existentes. Observe que a meta de otimização não pode ser alterada em campanhas publicadas, mas você pode duplicar campanhas existentes e, depois, alterar a meta de otimização.

1.  Entre na sua conta empresarial do [Gerenciador de Anúncios](https://www.facebook.com/adsmanager/manage/campaigns). Metas de desempenho dos leads de conversão não estão disponíveis por meio de contas de anúncios pessoais nem por meio de interfaces leves.
  
3.  Clique no botão **\+ Criar** para criar uma campanha. Na janela **Escolha um objetivo da campanha**, escolha **Leads** e clique em **Continuar**.
  
5.  Nas configurações em nível de conjunto de anúncios, na **Localização da conversão**, selecione **Formulários instantâneos**.
  
7.  Em **Otimização e veiculação** para o conjunto de anúncios, clique no botão **Editar** para **Otimização para veiculação de anúncios** e escolha a meta **Leads de conversão** no menu suspenso. A CAPI para integração do CRM não é um requisito para começar a veicular campanhas com a meta de desempenho dos leads de conversão, mas você verá melhores resultados se ela estiver integrada.

[](#)

## Etapa 2: criar um conjunto de dados de CRM da Meta

Esta seção fornecerá orientações sobre como criar um pixel da Meta para seu CRM.

**Nota:** você precisará ter acesso de administrador para criar ou converter um pixel.

1.  Em [Gerenciador de Eventos](https://www.facebook.com/events_manager2/list), clique em **Conectar fontes de dados** para conectar uma nova fonte de dados.
  
3.  Selecione **CRM** e clique em **Conectar**.
  
5.  É possível criar um conjunto de dados novo ou converter um conjunto de dados existente. Você decidirá com base em como deseja organizar seus eventos e gerenciar o acesso da conta de anúncios aos conjuntos de dados. Recomendamos criar um conjunto de dados para que os eventos de CRM não se sobreponham aos eventos de conjuntos de dados existentes no Gerenciador de Eventos, o que tornará a solução de problemas mais fácil.  
      
    Ao converter um conjunto de dados existente, atribua um nome diferente aos eventos de CRM, em vez de reutilizar os nomes existentes, a fim de evitar confusão entre os diferentes tipos de eventos. Converter um conjunto de dados da web existente não afetará outros eventos carregados nele. O conjunto de dados de CRM informa à Meta que os eventos de CRM serão carregados e adiciona o fluxo de trabalho de integração de otimização de leads de conversão ao conjunto de dados.
    1.  **Para criar um conjunto de dados:** clique no link **Criar conjunto de dados** e nomeie o conjunto corretamente.
    2.  **Para converter um conjunto de dados:** selecione o conjunto de dados existente no qual deseja carregar os eventos de CRM. Converter um conjunto de dados da web existente não afetará outros eventos que estiverem sendo carregados nele.
6.  Verifique se o ícone do conjunto de dados de CRM foi atualizado. Caso contrário, repita esta etapa.

**Nota:** a integração é baseada em pixel. Não mude as integrações concluídas para um pixel diferente.

  

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1708166089771302&version=1765862809)

  
  

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=657922046960608&version=1765862809)

  

[](#)

## Etapa 3: escolher um método de integração

Você terá a opção de concluir a configuração usando a integração manual ou uma integração de parceiros. Uma integração manual é uma ótima escolha para empresas que têm recursos para desenvolvedores disponíveis, acesso à base de código do servidor e precisam da capacidade de personalizar sua configuração. Como alternativa, as empresas que precisam de uma integração de CRM mais simples podem usar uma das integrações de parceiros disponíveis.

1.  Insira seu CRM na caixa de pesquisa.
    
    1.  Caso seu CRM seja aceito por uma integração de parceiros, você pode escolher a opção **Usar um parceiro** e seguir as instruções nesse fluxo de trabalho.
        1.  Selecione seu parceiro de preferência.
        2.  Clique em **Abrir instruções** para ver as orientações do fluxo de trabalho.
        3.  Clique em **Ir para o parceiro** para acessar o parceiro e começar a integração.
          
        
        ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=669560759060513&version=1765862809)
        
          
        
    2.  Caso contrário, prossiga escolhendo a opção **Código manual** ou **Convidar um desenvolvedor** e clique em **Continuar**.
    
    **Observação:** o desenvolvedor que realizará a integração precisará de acesso de administrador no Gerenciador de Negócios para concluir o processo.

[](#)

[

←

Voltar

1: Connecting Your CRM With Lead Ads

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads)

[

→

Avançar

3: Developer Implementation

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration/)

[](#)