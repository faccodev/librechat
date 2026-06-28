---
title: "4. Verificar seus dados - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data"
scraped_at: "2026-02-01T15:48:38.571Z"
---

# 4\. Verificar seus dados

A validação de dados tem duas fases:

1.  **Conectar o CRM**
2.  **Configurar o funil de vendas**

## Conectar o CRM

1.  Após a conexão com a API de Conversões, consulte a aba "Visão geral" do seu conjunto de dados no Gerenciador de Eventos da Meta para ver o status da integração.
    
    ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1085079103200948&version=1766062526)
    
  
3.  O sistema verificará se pelo menos um evento válido foi enviado da sua integração. Um evento válido pode ser um evento com carga adequada enviado pelo CRM usando a CAPI, que pode ser atribuído a um lead.

[](#)

## Configurar o funil de vendas

Ao configurar o funil, você permite que a Meta analise e otimize o desempenho dele, gerando melhores resultados para suas campanhas de lead. Para isso, os dados compartilhados com a Meta devem atender a alguns requisitos.

1.  Após o envio de todos os eventos, consulte a aba "Visão geral" do seu conjunto de dados no Gerenciador de Eventos para ver o status da integração. Você poderá configurar seu funil. Configurar seu funil nos ajudará a entender os dados enviados e realizar análises profundas com base no cumprimento dos requisitos de dados. Consulte o documento [5\. Configurar o funil de vendas](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel) para saber mais.
    
    ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=615752348266830&version=1766062526)
    
  
3.  Os dados enviados para a Meta devem atender a estes requisitos:
    1.  Manter uma campanha de leads em veiculação gerando 200 leads por mês.
    2.  Ter uma cobertura de pelo menos 60% dos leads. Essa cobertura é definida como a porcentagem de leads que possuem eventos correspondentes carregados na Meta. A melhor maneira de aumentar a cobertura é incluir o ID do lead da Meta na sua carga e carregar o evento de lead bruto que representa todos os leads gerados na Meta e baixados no seu CRM. Para visualizar sua cobertura de leads atual, clique no botão **View Reports** na aba **Settings** do seu pixel de CRM.
        
        ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=608027849016091&version=1766062526)
        
    3.  Compartilhar dados com todos os parâmetros obrigatórios e no formato correto. Consulte a seção Especificações de carga para ver mais informações.
**Observação**: caso o sistema detecte erros na integração, informaremos você na aba **Settings** do pixel de CRM. Você também pode encontrar erros listados na aba **Diagnostics** e ver instruções sobre como corrigi-los.

[](#)

[

←

Voltar

3: Implementing the CRM Integration (Developer)

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration)

[

→

Avançar

5: Configure Your Sales Funnel

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel)

[](#)