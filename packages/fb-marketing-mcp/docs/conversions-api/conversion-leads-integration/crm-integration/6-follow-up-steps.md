---
title: "6. Acompanhar as etapas - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/6-follow-up-steps"
scraped_at: "2026-02-01T15:48:51.061Z"
---

# 6\. Acompanhar as etapas

Este guia abrange os tópicos a seguir:

-   [Permitir que o sistema gere análises e aprenda com os dados](#funnel-analysis-and-learning-period)
    
-   [Compartilhar o Pixel da Meta com suas contas de anúncios](#share-the-pixel-with-your-ad-accounts)
    

## Análise do funil e período de aprendizado

**Parabéns!** Você concluiu as principais etapas de integração da API de Conversões para CRM. Os próximos passos serão gerenciados pelo sistema. A menos que o sistema encontre algum problema, nenhuma outra ação sua será necessária. A partir de agora, não altere os pixels, já que isso iniciará uma nova integração e reiniciará o processo de treinamento.

### Análise do funil

Depois que a configuração do funil estiver concluída, o sistema analisará seus dados novamente para determinar se eles correspondem ao funil indicado. A duração desse processo dependerá da janela de conversão de leads. Caso leve 14 dias para um lead ser convertido, precisaremos de pelo menos esse número de dias de carregamento de dados. Lembre-se de que o evento de conversão deve ocorrer até 28 dias após a geração do lead e ter uma taxa de conversão entre 1 e 40%.

Confira a aba de diagnósticos no Gerenciador de Eventos para encontrar erros e instruções sobre como corrigi-los. Um ótimo jeito de começar é confirmar que seus dados atendem aos requisitos que acabamos de discutir.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1500660967558746&version=1766414027)

### Fase de aprendizado

Depois que a integração for concluída e aprovada na análise do funil, haverá uma fase de aprendizado de 2 a 4 semanas antes que o modelo conclua o treinamento com seus dados. Durante esse período, você poderá habilitar a otimização dos leads de conversão no menu "Otimização e veiculação" do [Gerenciador de Anúncios](https://www.facebook.com/adsmanager/manage/campaigns). No entanto, não será possível ver todos os ganhos de desempenho até que o treinamento seja concluído. Se você observar que os leads de conversão apresentam um desempenho abaixo da média, recomendamos aguardar o término da fase de aprendizado antes de habilitar a otimização.

Após a integração, um modal de confirmação aparecerá para avisar que o processo foi concluído.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=3967881733452323&version=1766414027)

[](#)

## Compartilhar o Pixel com suas contas de anúncios

1.  Confirme que suas contas de anúncios terão acesso ao Pixel ao veicular uma campanha de leads de conversão. Na aba **Settings** do [Gerenciador de Eventos](https://www.facebook.com/events_manager2), clique no botão **Share With an Ad Account**. Essa ação direcionará você às configurações da empresa. Também é possível acessar diretamente essa opção no [Gerenciador de Negócios](https://business.facebook.com/).
  
3.  Selecione Add Assets na aba Connected Assets para adicionar a conta de anúncios que deve ter acesso ao pixel.

[](#)

[

←

Voltar

5: Configure Your Sales Funnel

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel)

[](#)