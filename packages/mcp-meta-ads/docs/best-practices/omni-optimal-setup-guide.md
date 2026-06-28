---
title: "Guia de configuração omni ideal - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/best-practices/omni-optimal-setup-guide"
scraped_at: "2026-02-01T14:02:55.470Z"
---

# Guia de configuração técnica omni: boas práticas e requisitos

## Configuração de eventos

Uma configuração de evento ideal permite a coleta de dados de alta qualidade, o que é essencial para o desempenho do sistema de anúncios. Estes dados de alta qualidade ajudam a definir e apresentar anúncios com precisão, o que pode levar a um melhor engajamento, taxas de conversão mais elevadas e, em última análise, a um melhor retorno sobre o investimento.

## Parâmetros obrigatórios/recomendados

A lista consiste em todos os parâmetros de dados de evento obrigatórios/recomendados e outros parâmetros de dados que os anunciantes precisam passar para a Meta via API de Conversões/Pixel da Meta a fim de usá-los na otimização da veiculação e da atribuição de anúncios.

#### Parâmetros dos eventos

-   Nome do evento
    
-   Hora do evento
    
-   Client\_user\_agent (apenas web)
    
-   Action\_source
    
-   Event\_source\_url (apenas web)
    
-   Dados personalizados (altamente recomendados para anúncios dinâmicos)
    
    -   IDs de conteúdo
        
    -   Tipo de conteúdo
        
    -   Conteúdo
        
    -   Quantidade
        
    -   Moeda (obrigatório para eventos de compra)
        
    -   Valor (obrigatório para eventos de compra)
        
    

#### Parâmetros de informações do cliente

-   Email
    
-   Número de telefone
    
-   Nome
    
-   Sobrenome
    
-   Endereço IP (apenas web)
    
-   Agente do usuário (apenas web)
    
-   Fbc (apenas web)
    
-   Fbp (apenas web)
    

**Nota**: [encontre aqui](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) uma lista completa de parâmetros de informações do cliente e requisitos de hash.

[](#)

## Qualidade da correspondência de eventos e taxas de correspondência

### Pontuações de qualidade da correspondência de eventos (apenas eventos da web)

As pontuações de qualidade da correspondência de eventos (EMQ, pelas iniciais em inglês) são uma métrica usada para avaliar a eficácia da integração da API de Conversões de um anunciante na correspondência de eventos com os usuários da Meta. As pontuações variam de 1 a 10, com pontuações mais altas indicando uma correspondência mais eficaz. Alguns dos parâmetros de informações PII com maior ponderação são:

-   Email
    
-   Número de telefone
    
-   Endereço IP
    
-   Agente do usuário
    
-   FBP
    
-   FBC
    
-   Nome
    
-   Sobrenome
    

### Pontuação de qualidade dos dados offline

A pontuação de qualidade dos dados offline (ODQ, pelas iniciais em inglês) avalia o quanto seus eventos offline estão alinhados com os requisitos de publicidade da Meta, com foco na cobertura dos eventos para melhorar o desempenho e a precisão da mensuração.

#### Como a qualidade dos dados offline é calculada

Para calcular a pontuação de qualidade dos dados offline, consideramos fatores como atualização, frequência e atribuição dos dados:

-   **Frequência:** é o número de dias, nos últimos 14 dias, em que o evento esteve presente nas partições (ou seja, em que eventos offline foram enviados para a Meta).
    
-   **Atualização:** é o tempo médio entre a ocorrência e o envio do evento nos últimos 28 dias.
    
-   **Cobertura das chaves de correspondência**: é o número de eventos que contêm determinadas quantidades de chaves de correspondência fortes (como email, telefone ou ID do dispositivo em anúncios para dispositivos móveis) dividido pelo número total de eventos nos últimos 28 dias.
    
-   **Volume de eventos offline**: é o número de compras de produtos nos últimos 28 dias que tiveram pelo menos um anúncio vinculado ao ID da fonte de dados nesse mesmo período.
    
-   **Comportamento offline semelhante ao online**: é a proporção de compras na loja física que são enviadas logo após a impressão, refletindo um comportamento típico de transações online.
    
-   **Valores de compra válidos**: são os valores de compras válidos (compras com preço superior a zero) em relação ao total de eventos nos últimos 28 dias.
    
-   **Divisão de carrinho**: os eventos de compra não devem ser divididos em vários eventos (a melhor opção é incluir vários itens em um único evento de compra). A mensuração é feita pela relação entre itens e compras nos últimos 2 dias.
    
-   **Atribuição**: indica se os anúncios rastreiam automaticamente eventos offline para a geração de relatórios.
    
-   **Precisão**: indica se você envia dados offline sem erros ou inconsistências (observação: **não envie** [dados do site como um evento offline](https://www.facebook.com/legal/technology_terms)).
    

Esses fatores, ponderados de forma diferente, são combinados em uma pontuação de até 10.

#### O que a pontuação significa

-   **Pontuação alta (8 a 10)**: indica correspondência forte, identificação eficaz do usuário e melhor atribuição de anúncios.
    
-   **Pontuação média (4 a 7)**: indica correspondências parciais, sugerindo que há espaço para melhorias.
    
-   **Pontuação baixa (0 a 3)**: indica correspondência fraca, com a maioria dos eventos offline não enviados para a Meta, o que reduz a qualidade dos dados e a atribuição dos anúncios.
    

### Como verificar as pontuações de EMQ e ODQ:

Acesse **Gerenciador de Eventos** > **Selecione ID do Pixel** > **Selecione o nome do evento** > **Visualizar detalhes** > **Qualidade do evento**

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460620702_3660745924236981_1657918661978493302_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e280be&_nc_ohc=2UCx4KHEF6cQ7kNvwGPsRYx&_nc_oc=AdlbskwF8sdWyfiD0bYXUpAQF0W1SFD3nrIZkUYs89RxdOkCUp4Pyo-auKqMQPfJwYAomuZww9fZMyG0yYADfKC0&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Aft6YzjcU_Ym79SQ3ybt2FcjNWII_lFdTD4VR3pypYgrqw&oe=6999B5A2)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460620702_3660745924236981_1657918661978493302_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e280be&_nc_ohc=2UCx4KHEF6cQ7kNvwGPsRYx&_nc_oc=AdlbskwF8sdWyfiD0bYXUpAQF0W1SFD3nrIZkUYs89RxdOkCUp4Pyo-auKqMQPfJwYAomuZww9fZMyG0yYADfKC0&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Aft6YzjcU_Ym79SQ3ybt2FcjNWII_lFdTD4VR3pypYgrqw&oe=6999B5A2)

  
  

Como alternativa ao Gerenciador de Eventos, você pode utilizar a [Integration Quality API](/docs/marketing-api/conversions-api/integration-quality-api) para verificar as pontuações de EMQ. Para saber mais sobre esta API e como maximizar a EMQ, consulte nossa [documentação aqui](/docs/marketing-api/conversions-api/integration-quality-api).

### Benefícios da qualidade dos dados offline

Melhorar a qualidade dos dados offline é fundamental para aprimorar seus anúncios omnichannel, otimizados para vendas online e na loja.

#### O valor da qualidade dos dados offline na habilitação de anúncios omnichannel

Focar na qualidade dos dados offline é essencial para sua estratégia de publicidade omnichannel:

-   **Desempenho de anúncio aprimorado**: uma pontuação alta garante dados precisos e atualizados para um direcionamento eficaz em todos os canais.
    
-   **Mensuração precisa**: pontuações robustas possibilitam uma atribuição precisa das conversões offline, o que é fundamental para entender o impacto dos anúncios e aprimorar estratégias.
    
-   **Campanhas otimizadas**: uma pontuação igual ou superior a 8,5 permite o uso eficaz de anúncios omnichannel, garantindo o alcance do público adequado no momento certo.
    

#### Exemplo: melhorar a qualidade dos dados offline no varejo

Um varejista com uma pontuação 6 de 10 pode garantir melhorias implementando estas medidas:

-   **Aumentar a frequência do envio de dados**: carregue dados com mais regularidade.
    
-   **Melhorar a precisão dos dados**: reduza erros e inconsistências.
    
-   **Aprimorar a atribuição**: forneça todas as chaves de correspondência recomendadas para maximizar a precisão da mensuração de conversões offline.
    

Trabalhar nessas áreas pode aumentar a pontuação, gerando melhores resultados de publicidade, como mais compras e um direcionamento mais eficiente.

A Meta fornece recomendações personalizadas no Gerenciador de Eventos para ajudar a melhorar a pontuação de qualidade dos seus dados offline.

### Melhorar a qualidade dos dados offline

Para melhorar sua métrica de qualidade dos dados offline:

-   Carregue novos dados regularmente para garantir precisão no direcionamento e na mensuração.
    
    -   Carregue dados diariamente.
        
        -   Confira se os dados de transações offline não estão desatualizados (com mais de 3 dias).
            
        
    
-   Implemente processos robustos de validação de dados para minimizar erros e inconsistências.
    
    -   Envie os preços de compra corretos (por exemplo, sem valores zero ou negativos).
        
    -   Evite vincular identificações de conjuntos de dados incorretas a campanhas omni. Observação: use apenas uma fonte de sinal offline para a otimização de campanhas omni. Para fins de mensuração (nível do rastreamento de anúncios), o anunciante pode vincular várias fontes de sinal offline, mas não para a otimização no nível do conjunto de anúncios.
        
    
-   Habilite o [rastreamento automático de eventos offline](https://www.facebook.com/business/help/1480558938621580) para atribuir com precisão as conversões offline.
    
-   Monitore seus procedimentos de coleta e processamento de dados para manter dados de alta qualidade.
    
-   Analise regularmente a qualidade dos seus dados offline no Gerenciador de Eventos e siga as recomendações personalizadas para melhorar essa pontuação.
    

[](#)

## Nível de atualidade dos dados

Priorize o compartilhamento de eventos em tempo real para uma melhor otimização da campanha. Verifique se há pouco ou nenhum atraso desde a ocorrência dos seus eventos até seu compartilhamento com a Meta. Isto vai ajudar a:

-   Veicular anúncios com otimização superior graças a dados em tempo real para atualizar os seus públicos
    
-   Ver os resultados de uma campanha de anúncios mais perto do tempo real no Gerenciador de Anúncios da Meta.
    

[](#)

## Eventos do site

Para eventos da web, é essencial transmitir dados em tempo real para proporcionar o desempenho ideal. O Pixel da Meta e a API de Conversões são os métodos mais eficazes para enviar dados de eventos em tempo real.

Para avaliar seu status atual, navegue até **Gerenciador de Eventos** > **ID do Pixel** > **Nome do evento** > **Visualizar detalhes** > **Nível de atualidade dos dados** > **Site**

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460232186_1550579765541853_6551391303107813082_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e280be&_nc_ohc=4c7XufgN_GsQ7kNvwEf2yns&_nc_oc=Adlc_rr3iBIAEQ2Wi0oGcYwNo4PHSwAS0VCjT7PHfNw_OpNHAHmWTcEGSPoIV4AC8SbB0ETY4CpD6TLmhUfyEBgI&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Afuu6BO_zR0EsLl0gdtfo4mn233FSoAogyyCU3mWsRfw8w&oe=69998ADA)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460232186_1550579765541853_6551391303107813082_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e280be&_nc_ohc=4c7XufgN_GsQ7kNvwEf2yns&_nc_oc=Adlc_rr3iBIAEQ2Wi0oGcYwNo4PHSwAS0VCjT7PHfNw_OpNHAHmWTcEGSPoIV4AC8SbB0ETY4CpD6TLmhUfyEBgI&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Afuu6BO_zR0EsLl0gdtfo4mn233FSoAogyyCU3mWsRfw8w&oe=69998ADA)

  

[](#)

## Eventos offline

Para eventos offline, recomendamos enviar dados com a maior frequência possível, pois isso ajudaria nossos algoritmos a impulsionar o desempenho em tempo real/quase real. A recomendação é retornar dados offline pelo menos uma vez ao dia e, de preferência, a cada hora. Para avaliar seu status atual, navegue até **Gerenciador de Eventos** > **ID do Pixel** > **Nome do evento** > **Visualizar detalhes** > **Nível de atualidade dos dados** > **Atividade offline**.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460446716_1031163211795503_4411507288336563731_n.png?_nc_cat=102&ccb=1-7&_nc_sid=e280be&_nc_ohc=uPPPKdVtFVYQ7kNvwHT4S3T&_nc_oc=AdmfWtT2_1w9ZgfReHcRjJmGUx1NBugKCmqZZa9HNlSWzh8MUhtVBiqhcvjCT9-pMwjquUfl2mKr42LE4dX11_Gl&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_AfsV-bk0Hsi3-qbOMPK2SkJuXq8FMhbgz07v_8xyUU5tvg&oe=6999A828)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460446716_1031163211795503_4411507288336563731_n.png?_nc_cat=102&ccb=1-7&_nc_sid=e280be&_nc_ohc=uPPPKdVtFVYQ7kNvwHT4S3T&_nc_oc=AdmfWtT2_1w9ZgfReHcRjJmGUx1NBugKCmqZZa9HNlSWzh8MUhtVBiqhcvjCT9-pMwjquUfl2mKr42LE4dX11_Gl&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_AfsV-bk0Hsi3-qbOMPK2SkJuXq8FMhbgz07v_8xyUU5tvg&oe=6999A828)

[](#)

## Desduplicação

O Pixel da Meta e a API de Conversões permitem compartilhar eventos padrão e personalizados conosco para poder medir e otimizar o desempenho dos anúncios. O pixel permite o compartilhamento de eventos da web por meio de um navegador. Já a API de Conversões permite o compartilhamento de eventos da web diretamente do seu servidor.

Se você conectar a atividade do site usando tanto o pixel quanto a API de Conversões, poderemos receber os mesmos eventos do navegador e do servidor. Se identificarmos que os eventos são idênticos e redundantes, poderemos manter um e descartar o resto. Isso se chama desduplicação.

É altamente recomendado incluir parâmetros de desduplicação com seus eventos para garantir que nossos sistemas possam identificar e processar eventos com precisão apenas uma vez. Isto é crucial para fins de atribuição e mensuração precisas.

#### Eventos da web

Ao enviar eventos redundantes usando o Pixel da Meta e a API de Conversões, **assegure-se de que ambos os eventos usem o event\_name idêntico e que event\_id ou uma combinação de external\_id e fbp estejam incluídos**. Recomendamos incluir todos esses parâmetros para ajudar a Meta a desduplicar os eventos apropriadamente e reduzir a incidência de relatórios duplos para eventos idênticos. **A janela máxima de desduplicação é de 48 horas**.

#### Eventos offline

Ao contrário da desduplicação configurada nos eventos da API de Conversões e Pixel da Meta, **os eventos offline só podem ser desduplicados em relação a outros eventos offline**. Damos suporte a dois métodos de desduplicação:

-   Baseado em `order_id`
    
-   baseado no usuário
    

A desduplicação usa a combinação dos campos: `dataset_id`, `event_time`, `event_name`, `item_number` e o campo `order_id` ou informações do usuário como o "campo-chave" baseado no método da carga do evento específico.

A desduplicação padrão usa order\_id com uma combinação dos campos acima. Se order\_id não estiver presente na carga, a lógica de desduplicação baseada no usuário será usada. **A janela de desduplicação máxima é de 7 dias.** Saiba mais sobre a desduplicação de eventos offline no nosso [site de documentação do desenvolvedor](/docs/marketing-api/conversions-api/offline-events).

**Recomendamos não dividir seu pedido em vários eventos em vez de enviar um evento para representar o pedido todo**.

Por exemplo, quando houver dois pedidos com `event_time` idêntico, `event_name` tendo o mesmo `order_id` ou o mesmo conjunto de Parâmetros de Informações do Cliente sem `order_id`, eles serão considerados eventos duplicados e usaremos o primeiro evento. O método de desduplicação baseado no usuário só funciona com os mesmos campos de Parâmetros de Informações do Cliente nas duas cargas.

Outra forma de maximizar a taxa de captura de PII é no seu armazenamento. Ao enviar transações por email que capturam PII (incluindo recibos), você pode aumentar o volume de eventos para impulsionar a otimização do desempenho nas plataformas da Meta.

[](#)

## Qualidade do evento

A qualidade do evento mede a correção dos parâmetros nos eventos recebidos de fontes de eventos ligadas a um catálogo. A baixa qualidade do evento afeta a taxa de correspondência, a disponibilidade e pode resultar em fases de aprendizagem mais longas, além de otimização da campanha abaixo do ideal. Observe que é altamente recomendado que estes parâmetros sejam retornados através de eventos da web e offline.

Alguns dos parâmetros importantes que precisam ser aprovados são:

**1\. Identificações de conteúdo**

Informar à Meta a identificação de conteúdo especifico de um produto ou grupo de produtos. A identificação de conteúdo deve corresponder exatamente à identificação do produto ou do grupo de produtos para esse item do seu catálogo, dependendo de qual content\_type você inseriu. A correspondência indica que se trata do mesmo produto ou grupo do seu catálogo. Exemplo: \['123','456'\]

**2\. Conteúdo (maneira recomendada de enviar detalhes do conteúdo)**

Informar à Meta a identificação do conteúdo específico, que precisa corresponder ao número de identificação do item no seu catálogo. Se você usar conteúdo no seu parâmetro, também deverá incluir o seguinte em um subobjeto: a identificação ou as identificações dos produtos e a quantidade (número de itens adicionados ao carrinho ou comprados).

Exemplo: \[{id: '123', quantity: 2}, {id: '456', quantity: 1}\]. Esta é maneira que recomendamos para repassar as informações.

**3\. Tipo de conteúdo**

Deve ser definido como `product` ou `product_group`:

-   Use `product` se as chaves enviadas por você representarem produtos. As chaves enviadas podem ser `content_ids` ou conteúdo.
    
-   Use `product_group` se as chaves enviadas por você em `content_ids` representarem grupos de produtos. Os grupos de produtos são usados para diferenciar produtos idênticos que apresentam variações, como cor, material, tamanho ou estampa.
    

**4\. Moeda**

Obrigatório para eventos de compra. É a moeda para o valor especificado, se aplicável. A moeda deve ser um código [ISO 4217](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217%3Ffbclid%3DIwZXh0bgNhZW0CMTEAAR0CtnCe-QMMDrf9cqJOE8TBny7cnfG3kcPFkq-uOJTkO2U3W-vEtW84ZFI_aem_bXCd0DS25QdidMvS9zGFdQ&h=AT0WdMPQltD8GeMRTnUFTbZ9uvucJf5DGYOOySe9BzEhng_HN-qZBjIqtnG52FqEz_hW3LNaFwQfEeK5soowoApFANSzO5uoJBOp1YZK4iOU4So43C1x8Cc-93zkfd-eMnOBPCcYw4ywz1KIjHYUqDTIbiKDL8sIPqL8OCrv6Ao) válido de três dígitos.

**5\. Valor**

Obrigatório para eventos de compra. Um valor numérico associado ao evento. Certifique-se de que esse valor seja >= 0.

[](#)

## Configuração do catálogo

Um catálogo é um contêiner com informações sobre os itens que os anunciantes desejam anunciar ou vender no Facebook e no Instagram. Os catálogos são um bloco fundamental de vários dos nossos produtos disponíveis, incluindo (mas não limitado a):

-   Campanhas de compras Advantage+
    
-   Anúncios Colaborativos
    
-   Anúncios de coleção
    
-   Anúncios em carrossel
    
-   Lojas
    

Para garantir uma configuração de qualidade para seu catálogo de anúncios omnichannel, certifique-se de que as seguintes áreas estejam cobertas e sejam ideais:

### Taxas de correspondência do catálogo

Uma correspondência de catálogo ocorre quando um evento é associado a um produto. A taxa de sucesso disso é conhecida como taxa de correspondência do catálogo. As taxas de correspondência ideais do catálogo são > 90%

#### Eventos do site

Para verificar as taxas de correspondência do catálogo para eventos da web, acesse **Gerenciador de Comércio** > **Selecionar Catálogo** > **Eventos** > **Selecionar fonte de dados** (conjunto de dados ou app).

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460201433_1069055187975944_8130500309049057068_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=GISThPBAQhsQ7kNvwH5jlTW&_nc_oc=Adm_j_LbIrHwoAnl9AspBT1_rcyYvbu9CXjK8b2scA7kpcm0K-ClwzF2905tW9URjK6k2AWDo4o5pBEw7ItLMv_Z&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Aftx2VX4_-28z7akxA_9fFpyrQyyJM5vwkwYmXFPlxl-xA&oe=69999700)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460201433_1069055187975944_8130500309049057068_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e280be&_nc_ohc=GISThPBAQhsQ7kNvwH5jlTW&_nc_oc=Adm_j_LbIrHwoAnl9AspBT1_rcyYvbu9CXjK8b2scA7kpcm0K-ClwzF2905tW9URjK6k2AWDo4o5pBEw7ItLMv_Z&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_Aftx2VX4_-28z7akxA_9fFpyrQyyJM5vwkwYmXFPlxl-xA&oe=69999700)

  

#### Eventos offline

Os eventos offline devem ser integrados através da API (o carregamento manual está disponível, mas para usar o Beta de Anúncios Omnichannel, CAPI ou OCAPI é necessária a integração).

-   Frequência de carregamento:
    
    -   Carregue dados diariamente, pelo menos 12 vezes nos últimos 14 dias.
        
        -   Confira se os dados de transações offline não estão desatualizados (com mais de 3 dias).
            
        
    
-   Os dados de eventos offline precisam ser transmitidos nos últimos 14 dias, qualificando a conta para anúncios omnichannel.
    
-   Evite dividir sua integração de eventos offline garantindo que você passe todos os itens da mesma transação que a mesma linha/cesta. Isso garante a precisão da mensuração do valor médio dos pedidos e do custo por compra.
    

### Conectando o catálogo com o conjunto de dados

Verifique se a fonte de dados (conjunto de dados/app) está corretamente vinculada ao catálogo. Se não estiver, siga as etapas abaixo para estabelecer uma conexão entre o conjunto de dados/app e o catálogo.

-   Acessar o Gerenciador de Comércio
    
-   Selecione eventos.
    
-   Clique em **Gerenciar conexões**.
    
-   Selecione a identificação do conjunto de dados/app.
    
-   Clique em **Salvar**.
    

[](#)

## Habilitando o rastreamento automático para o conjunto de dados

O rastreamento automático do conjunto de dados permite que _qualquer campanha futura_ nessa conta de anúncios seja automaticamente rastreada através do conjunto de dados. Isso é importante para a atribuição da campanha. Para habilitar o rastreamento automático, [siga estas etapas](https://www.facebook.com/business/help/1480558938621580).

Para adicionar o rastreamento de conjunto de dados às campanhas existentes, acesse a configuração do anúncio e habilite o rastreamento dentro das especificações de rastreamento.

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460565121_1211024816616249_1907117405742447389_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=SFbJyh8GqT4Q7kNvwEYG4mB&_nc_oc=AdldppAgMzQ8hgo6eRJIbee29clqavbWEMhNmpbnjHDiSXKIolTeDPBbfeVuQBRXGpTJ36hCf17k6c_1cTkLwqZg&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_AfvqzWy9ifZvBMSzORUdGMbHWd_C1MT54mndVDl3STP8LA&oe=6999857A)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/460565121_1211024816616249_1907117405742447389_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=SFbJyh8GqT4Q7kNvwEYG4mB&_nc_oc=AdldppAgMzQ8hgo6eRJIbee29clqavbWEMhNmpbnjHDiSXKIolTeDPBbfeVuQBRXGpTJ36hCf17k6c_1cTkLwqZg&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=KKIGj4caRWNhm7tvqAfv6g&oh=00_AfvqzWy9ifZvBMSzORUdGMbHWd_C1MT54mndVDl3STP8LA&oe=6999857A)

[](#)

## Público omni

Público omni é uma solução de direcionamento especial que permite aos anunciantes criar públicos com base na atividade do usuário em vários canais.

Por exemplo, se um anunciante quiser criar um público de pessoas que visualizaram um produto no site e depois foram à loja comprar, é possível usar este tipo de público.

### Boas práticas e requisitos

[Taxas de correspondência](#match-rates): as taxas de correspondência de evento são cruciais para determinar o tamanho do público. É essencial ter taxas de correspondência altas para eventos offline e pontuações de EMQ ideais para eventos da web a fim de garantir um público com tamanho adequado.

[Atualização dos dados](#data-freshness): como os públicos omni são criados com base nas ações do usuário que acontecem nos canais, receber dados com menos atraso tornaria o público mais recente e preciso.

[](#)

## Saiba mais

-   [Parâmetros de informações do cliente da API de Conversões](/docs/marketing-api/conversions-api/parameters/customer-information-parameters)
    
-   [Como enviar eventos offline usando a API de Conversões](/docs/marketing-api/conversions-api/offline-events)
    
-   [Ativar o rastreamento automático para conjuntos de eventos offline no Gerenciador de Eventos da Meta](https://www.facebook.com/business/help/1480558938621580)
    
-   [Integration Quality API](/docs/marketing-api/conversions-api/integration-quality-api)
    

[](#)