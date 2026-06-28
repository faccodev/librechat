---
title: "API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/"
scraped_at: "2026-02-01T15:45:31.955Z"
---

# API de Conversões

A API de Conversões conecta os dados de marketing do anunciante (como eventos do site, evento do app, eventos de mensagens empresariais e conversões offline) de um servidor, site, plataforma, app ou CRM aos sistemas da Meta que otimizam o direcionamento de anúncios, reduzem os custos e mensuram resultados.

Em vez de manter pontos de conexão separados para cada fonte de dados, os anunciantes podem usar a API de Conversões para enviar vários tipos de eventos e simplificar a pilha de tecnologia. No caso de integrações diretas, isso envolve estabelecer uma conexão entre o servidor de um anunciante e o ponto de extremidade da API de Conversões da Meta.

Os eventos do servidor estão vinculados ao ID de um conjunto de dados e são processados como eventos enviados por meio do Pixel da Meta, SDK do Facebook para iOS ou Android, SDK do Parceiro de Métricas para Aplicativos, conjunto de eventos offline ou carregamento de CSV. Isso significa que os eventos do servidor podem ser usados para mensuração, relatórios e otimização de maneira semelhante a outros canais de conexão. Os eventos offline podem ser usados para mensuração de eventos offline atribuídos, além da criação ou mensuração de públicos personalizados offline.

Para otimizar o desempenho e a mensuração do anúncio, recomendamos que os anunciantes sigam as [Boas práticas da API de Conversões](/docs/marketing-api/conversions-api/best-practices).

### Etapas recomendadas

1.  [**Primeiros passos**](/docs/marketing-api/conversions-api/get-started): escolha o método de integração mais adequado para você, veja os pré-requisitos para usar a API e entenda como começar.
2.  [**Implemente a API e comece a enviar solicitações**](/docs/marketing-api/conversions-api/using-the-api): comece a fazer solicitações `POST` e saiba mais sobre eventos descartados, solicitações em lote e o tempo de transação dos eventos.
3.  [**Verifique sua configuração**](/docs/marketing-api/conversions-api/verifying-setup): confirme se recebemos seus eventos e se eles foram desduplicados e correspondidos corretamente.

## Documentação

### [Parâmetros](/docs/marketing-api/conversions-api/parameters)

Conheça os parâmetros obrigatórios e opcionais que podem ser usados para melhorar a atribuição de anúncios e otimizar a veiculação.

### [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper)

Veja como a carga deve ser estruturada quando for enviada do seu servidor ao Facebook.

### [Troubleshooting](/docs/marketing-api/conversions-api/support)

Saiba como gerenciar códigos de erro retornados pela API de Conversões.

[](#)

## Recursos

### Eventos do Pixel da Meta

Saiba mais sobre os [eventos padrão](/docs/facebook-pixel/implementation/conversion-tracking#standard-events) e os [eventos personalizados](/docs/facebook-pixel/implementation/conversion-tracking#custom-events) do Pixel da Meta.

### Central de Ajuda para Empresas

Na nossa Central de Ajuda, leia [Sobre a API de Conversões](https://www.facebook.com/business/help/2041148702652965) e [Testar os eventos do servidor usando a ferramenta Eventos de Teste](https://www.facebook.com/business/help/1624255387706033).

### Manual e webinar

Consulte o documento em PDF [Direct Integration Playbook for Developers](https://www.facebook.com/gms_hub/share/conversions-api-direct-integration-playbook_english.pdf) e o webinar sobre [integração direta para desenvolvedores](https://www.facebook.com/business/m/sessionsforsuccess/conversions-api).

### [Opções de processamento de dados para usuários da Califórnia](/docs/marketing-apis/data-processing-options)

Saiba mais sobre o recurso Uso Limitado de Dados e a implementação para a API de Conversões.

[](#)