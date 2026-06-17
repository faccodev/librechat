---
title: "Integração de leads de conversão - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration"
scraped_at: "2026-02-01T14:07:54.357Z"
---

# Integração da API de Conversões para CRM

Talvez sua empresa já tenha a [API de Conversões](/docs/marketing-api/conversions-api) configurada para carregar eventos do servidor para o tráfego da web. Se você usa o Facebook/Instagram para gerar leads a serem convertidos em vendas, pode usar a API de Conversões para carregar eventos offline a partir do seu sistema de gestão do relacionamento com o cliente (CRM). Em geral, essa integração é separada da configuração atual da API de Conversões porque os parâmetros exigidos são diferentes. Além disso, os dados vêm do sistema de CRM, não de servidores da web.

Se você fizer a integração do CRM e usar a meta de desempenho, isso poderá gerar leads de qualidade mais alta e maior probabilidade de conversão. No momento, a meta de otimização é compatível apenas com anúncios de lead do Facebook e do Instagram (formulários instantâneos).

Você já deve ter uma integração estabelecida para baixar leads da Meta para seu CRM (conforme destacado em verde na figura abaixo). Este guia apresentará o processo de integração do CRM para enviar dados de eventos de funil inferior do CRM para a Meta (conforme destacado em vermelho na figura abaixo).

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306816704_1078315286152910_1043302971112750626_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=a5TEtDqZC_sQ7kNvwFecTmN&_nc_oc=AdnTnvXPiZkuYTSEpBCCkBV-TU9RRue-NWKxxFqdg6MHsn3x_kE7WQ-8FHZSCaIKlnoxxeuavxt_zta24iw-DQms&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=6vSANpf-qdx46jY72SA4Jg&oh=00_AfvzxowxKQp8r1d6y23DQR0LnxtCKCoiMY3d4Dj9DSwYxQ&oe=6999870F)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/306816704_1078315286152910_1043302971112750626_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=a5TEtDqZC_sQ7kNvwFecTmN&_nc_oc=AdnTnvXPiZkuYTSEpBCCkBV-TU9RRue-NWKxxFqdg6MHsn3x_kE7WQ-8FHZSCaIKlnoxxeuavxt_zta24iw-DQms&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=6vSANpf-qdx46jY72SA4Jg&oh=00_AfvzxowxKQp8r1d6y23DQR0LnxtCKCoiMY3d4Dj9DSwYxQ&oe=6999870F)

## Verificar se a empresa está qualificada

Antes de começar a trabalhar na integração da API de Conversões para CRM, verifique se a empresa está qualificada para o modelo de otimização. Veja abaixo algumas diretrizes que procuramos nas integrações.

-   Uso dos anúncios de lead no Facebook/Instagram (formulários instantâneos)
    
-   Para otimizar os resultados, confira se o ID de lead da Meta, de 15 a 17 dígitos, está armazenado no seu CRM. É recomendável enviar os IDs de lead para cada evento. Se você não tiver um, envie parâmetros do cliente, como ID do clique, número de telefone ou email.
    
-   Geração de no mínimo 200 leads por mês
    
-   Capacidade de carregar dados regularmente pelo menos uma vez por dia
    
-   O estágio do lead que você quer otimizar acontece até 28 dias após a geração do lead
    
-   O estágio do lead que você quer otimizar tem uma taxa de conversão entre 1% e 40%
    

[](#)

## Planejar a linha do tempo do projeto

Caso você acredite que uma empresa se qualifica para a otimização, use esta linha do tempo estimada para planejar o projeto. Com base em dados históricos, o tempo estimado para que o projeto gere valor é de um mês. No entanto, o prazo real pode variar para todos os anunciantes. A linha do tempo depende de recursos disponíveis para tomar decisões e solucionar problemas com a integração.

Seção

Descrição

Dono da tarefa

Estimativa de duração

[**1: Conectar o CRM com os anúncios de lead**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads)

Baixar automaticamente os leads do Facebook

Anunciante

Pré-requisito

[**2: Iniciar a integração do CRM**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration)

Criar ou escolher um Pixel da Meta para eventos de CRM

Anunciante

< 1 dia

[**3\. Como implementar a integração do CRM**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration) (desenvolvedor)

Conectar o CRM por meio da API de Conversões

Anunciante

Parceiro de Negócios da Meta < 1 dia

Personalizado (3 a 4 semanas﹡)

[**4\. Verificar seus dados**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data) (sem ações necessárias para o anunciante)

Esperar a validação de dados

Meta

Cerca de 1 a 2 dias

[**5\. Configurar o funil de vendas**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel)

Configurar os eventos do funil de vendas no CRM

Anunciante

< 1 dia

[**6\. Fase de aprendizado**](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/6-follow-up-steps) (sem ações necessárias para o anunciante)

Aguardar a análise do funil e o período de treinamento ﹡﹡

Meta

2 a 4 semanas

—

Veicular campanhas de otimização de leads de conversão otimizadas

Anunciante

**Tempo total considerado**

Cerca de 3 a 4 semanas

﹡ O tempo de duração da etapa pode ser reduzido ao usar a integração de parceiros.  
﹡﹡ Será possível veicular campanhas de desempenho de leads de conversão durante o período de treinamento, mas não aproveitar o total do desempenho antes da conclusão da campanha.

[](#)

## Funções e responsabilidades

As funções que precisam estar envolvidas no projeto estão descritas abaixo. Vale lembrar que algumas funções podem ser consolidadas ou separadas, dependendo da sua organização.

Função

Responsabilidades

Equipe de marketing e vendas

-   Em geral, a função que inicia o projeto e identifica os profissionais da organização necessários para concluir a integração.
    
-   Ter conhecimento aprofundado sobre o processo de marketing e vendas para definir o funil.
    
-   Ter as permissões necessárias para executar tarefas no Gerenciador de Anúncios e no Gerenciador de Eventos da Meta.
    
-   Criar a integração entre o CRM e a Meta, caso a **integração de parceiros** seja usada (como o [Zapier](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/zapier-integration)).
    

Administrador do CRM

-   Ter conhecimento aprofundado sobre os campos e os recursos do CRM.
    
-   Criar novos fluxos e campos personalizados no CRM, se necessário.
    
-   Apoiar os profissionais de marketing e os desenvolvedores durante a integração.
    

Desenvolvedor

-   Criar a integração entre o CRM e a Meta, caso a **integração manual** seja usada.
    
-   Garantir o funcionamento adequado da integração manual.
    

[](#)

[

→

Avançar

1: Connecting Your CRM With Lead Ads

](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads)

[](#)