---
title: "Auxiliar de carga - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper"
scraped_at: "2026-02-01T14:08:14.450Z"
---

# Auxiliar de carga

Preencha os campos de parâmetros de dados obrigatórios e recomendados para ver como estruturar a carga ao enviá-la do seu servidor para o Facebook.

Os eventos de loja física, app e web compartilhados usando a API de Conversões exigem parâmetros específicos. A lista de [parâmetros obrigatórios está disponível aqui](/docs/marketing-api/conversions-api/parameters).

Produto selecionado

selectedProduct

Site

​

Parâmetros do tipo do evento

Os campos [event\_name](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#event-name), [event\_time](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#event-time) e [action\_source](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#action-source)

são obrigatórios para todos os eventos, enquanto event\_id é recomendado para [deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events). Além disso, os campos [client\_user\_agent](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters#client-user-agent) e [event\_source\_url](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#event-source-url) são obrigatórios para eventos do site.

event\_name

Tipo: string

​

event\_time

Tipo: int

action\_source

Tipo: string

website

​

Adicionar parâmetros do tipo do evento

* * *

Parâmetros de informações do cliente

Inclua pelo menos um parâmetro de informações do cliente para cada evento que deseja enviar. O Facebook usará esses dados para as finalidades descritas em sua [Termos das Ferramentas para Empresas](https://www.facebook.com/legal/technology_terms), incluindo a atribuição de anúncios e a otimização de veiculação de anúncios.

Todos os parâmetros de informações do cliente devem ser convertidos em hash como SHA256, exceto o endereço IP do cliente, o agente de usuário do cliente, a identificação do clique e a identificação do navegador. Outros parâmetros de informações do cliente que não forem convertidos em hash serão rejeitados automaticamente pelo Facebook.

Excluir campo

Email (em)∙ Opcional

Tipo: string | Deve ser convertida em hash

Fechar

Normalizar

Hash

[Adicionar outro valor](#)

Excluir campo

Número de telefone (ph)∙ Opcional

Tipo: string | Deve ser convertida em hash

Normalizar

Hash

[Adicionar outro valor](#)

Adicionar parâmetros de informações do cliente

* * *

Parâmetros de dados personalizados

Selecione os parâmetros personalizados que você deseja usar para a atribuição de anúncios ou otimização da veiculação de anúncios ou crie um novo parâmetro personalizado.

Excluir campo

​

currency∙ Opcional

Tipo: string

Fechar

Excluir campo

​

value∙ Opcional

Tipo: float

Adicionar parâmetros de dados personalizados

* * *

Adicionar parâmetros de dados

Selecione os parâmetros de atribuição que você deseja usar para a atribuição de anúncios ou a otimização da veiculação de anúncios.

Excluir campo

​

attribution\_share∙ Opcional

Tipo: float

Adicionar parâmetros de dados de atribuição

* * *

Parâmetros de dados originais para eventos

Selecione os parâmetros originais para eventos que você deseja usar para a atribuição de anúncios ou otimização da veiculação de anúncios.

Excluir campo

​

event\_name∙ Opcional

Tipo: string

Fechar

Excluir campo

​

event\_time∙ Opcional

Tipo: int

Adicionar parâmetros de dados originais para eventos

* * *

Gerar código

Receber código

`   {  "data": [  {  "event_name": "Purchase",  "event_time": 1769954891,  "action_source": "website",  "user_data": {  "em": [  "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"  ],  "ph": [  null  ]  },  "attribution_data": {  "attribution_share": "0.3"  },  "custom_data": {  "currency": "USD",  "value": "142.52"  },  "original_event_data": {  "event_name": "Purchase",  "event_time": 1769954891  }  }  ]  }   `

Você pode adicionar vários valores à maioria dos parâmetros de informações do cliente.

[Saiba mais](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters)

Não foram encontrados erros.

Testar esta carga

Enviar para Eventos de Teste

[Abrir o Graph Explorer](https://developers.facebook.com/tools/explorer/?method=POST&path=%3CDATASET_ID%3E%2Fevents&data=[%7B%22event_name%22%3A%22Purchase%22%2C%22event_time%22%3A1769954891%2C%22action_source%22%3A%22website%22%2C%22user_data%22%3A%7B%22em%22%3A[%227b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068%22]%2C%22ph%22%3A[null]%7D%2C%22attribution_data%22%3A%7B%22attribution_share%22%3A%220.3%22%7D%2C%22custom_data%22%3A%7B%22currency%22%3A%22USD%22%2C%22value%22%3A%22142.52%22%7D%2C%22original_event_data%22%3A%7B%22event_name%22%3A%22Purchase%22%2C%22event_time%22%3A1769954891%7D%7D])

[Dar feedback](#)