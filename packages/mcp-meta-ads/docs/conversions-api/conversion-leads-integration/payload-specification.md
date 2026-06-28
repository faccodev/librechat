---
title: "Especificação de carga - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/payload-specification"
scraped_at: "2026-02-01T15:48:57.093Z"
---

# Especificação de carga

Integrar o CRM à API de Conversões da Meta e usar a meta de otimização dos anúncios de lead com os leads de conversão são ações que podem gerar resultados melhores. No momento, a otimização é compatível apenas com anúncios de lead nativos (formulários instantâneos) gerados no Facebook ou no Instagram.

Este guia fornece a especificação de carga para eventos de CRM carregados apenas para a otimização de leads de conversão. Não use esta especificação para eventos não relacionados com essa otimização.

Confira a [documentação da API de Conversões](/docs/marketing-api/conversions-api) para mais informações sobre como começar a usar a API e outros recursos úteis.

## Carga do evento

### Parâmetros necessários

Nome

Descrição

`user_data`

objeto

Um mapa que contém dados de informações do cliente. Consulte [Parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters) para ver as opções. Consulte [Correspondência avançada](/docs/meta-pixel/advanced/advanced-matching) para conferir as opções comparáveis disponíveis para dados enviados por meio do Pixel da Meta.

`event_name`

string

**Obrigatório.**  
Campo de forma livre para capturar os estágios que você usa dentro do seu CRM.  
Certifique-se de enviar _todos os estágios_, incluindo o estágio inicial de lead.  
Por exemplo, seus estágios podem incluir os seguintes tipos. Se um lead chega ao estágio final "Convertido", então todos os estágios anteriores já devem ter sido enviados.

1.  Lead inicial do Facebook
2.  Lead qualificado de marketing
3.  Oportunidade de vendas
4.  Convertido

Use uma variável para passar os estágios do seu CRM. Como alternativa, é possível criar uma chamada de API separada para cada estágio.

`event_time`

número inteiro

**Obrigatório.**  
Um carimbo de data e hora do Unix em segundos indicando quando o evento de atualização do estágio de lead foi atualizado pelo CRM.  
Use uma variável para passar os valores de data e hora do Unix do banco de dados.  
**Nota:** o valor do parâmetro `event_time` pode ser até 7 dias antes de enviar um evento para a Meta. O registro de data e hora também deve ocorrer após o tempo de geração de lead ou, caso contrário, o evento pode ser descartado.

`action_source`

string

**Obrigatório.**  
Defina este parâmetro para o valor `system_generated` para todos os eventos de leads de conversão.  
Para integrações de leads de conversão, isso especifica onde suas conversões são geradas pelo sistema.

`lead_event_source`

string

**Obrigatório.**  
Defina este parâmetro para o nome da ferramenta de onde os leads estão vindo (ex.: Hubspot, SAP, Oracle, Dynamics, CRM interna, etc.), incluído sob o parâmetro `custom_data`.

`event_source`

string

**Obrigatório.**  
Defina este parâmetro como o valor `crm` em todos os eventos de leads de conversão.  
Para integração de leads de conversão, isso especifica a fonte do evento como o CRM sob o parâmetro `custom_data`.

### Parâmetros de informações do cliente

As informações do cliente ajudam a Meta a relacionar os eventos do seu servidor com as contas da plataforma. Envie o máximo possível desses parâmetros para gerar dados de eventos mais precisos e melhorar o desempenho do anúncio.

**Observação:** é preciso enviar pelo menos um parâmetro de informações do cliente. Ao enviar `lead_id`, use uma `lead_id` válida para evitar que o sistema rejeite o evento. Informações como email ou número de telefone precisarão ser criptografadas. No momento, a identificação do clique não inclui erros de rejeição da API, mas um grande volume de `click_id` inválidas causará um alerta no sistema.

Parâmetro

Prioridade

Descrição

ID de lead (recomendado) [Como encontrar o ID de lead](/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id)

Mais alta

O ID gerado pelo Facebook para cada lead. É um número de 15 a 17 dígitos encontrado no campo `leadgen_id` do [webhook de geração de leads](/docs/marketing-api/guides/lead-ads/retrieving/#webhook-response), incluído sob o parâmetro `user_data`.

Consulte [Como encontrar o ID de lead da Meta](/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id) para saber mais.

Identificação do clique

Mais alta

Email com hash

Mais alta

Telefone com hash

Alto

Outras informações de contato com hash

Médio

**Observação:** além de email e número de telefone com hash, você pode enviar outros dados com hash para a Meta, como gênero, data de nascimento, sobrenome, nome, cidade, estado, código postal e muito mais.

### Exemplo

Este exemplo ilustra o formato da carga do evento enviado na chamada de API.

```
{
    "event_name": "my lead stage",
    "event_time": 1617693833,
    "user_data": {
        "lead_id": 1234567890123456
    },
    "action_source": "system_generated",
    "custom_data": {
        "lead_event_source": "Salesforce",
        "event_source": "crm"
    }
}
```

[](#)

## Saiba mais

-   Central de Ajuda para Empresas: [Como configurar o CRM para leads de conversão](https://www.facebook.com/business/help/279369167153556)
    
-   Central de Ajuda para Empresas: [Sobre as metas de desempenho para anúncios de lead](https://www.facebook.com/business/help/782657799338685)
    

[](#)