---
title: "Solução de problemas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/troubleshooting"
scraped_at: "2026-02-01T13:50:56.805Z"
---

# Solução de problemas

Talvez você enfrente alguns desafios ao trabalhar com a API de Marketing. Veja abaixo os problemas que os usuários podem encontrar e as soluções práticas para ajudar a otimizar sua experiência.

## Solução de erros

Use as técnicas de gerenciamento de erros e as boas práticas abaixo para aumentar a confiabilidade e a eficiência dos seus apps.

### Erros de autorização

Estes erros podem ocorrer devido a [tokens de acesso](/docs/facebook-login/guides/access-tokens) que estão expirados, são inválidos ou não têm as permissões necessárias. Para resolver isso, garanta que os tokens sejam atualizados regularmente e que os escopos corretos sejam solicitados durante a autorização.

### Parâmetros inválidos

O envio de solicitações com parâmetros incorretos ou ausentes pode levar a [erros](/docs/marketing-api/error-reference). Antes de fazer chamadas de API, sempre valide os dados de entrada. Utilizar ferramentas de validação pode reduzir significativamente esses erros.

### Recurso não encontrado

Este erro ocorre quando alguém tenta acessar um recurso que não existe ou foi excluído. Para resolver isso, verifique se os recursos (como campanhas ou conjuntos de anúncios) realmente existem antes de executar operações.

### Limitação de volume

A API de Marketing aplica [limites de volume](/docs/marketing-apis/rate-limiting) para evitar abusos. Quando esses limites forem excedidos, você verá mensagens de erro indicando que muitas solicitações foram feitas em um curto espaço de tempo. Empregar estratégias de recuo exponencial pode ajudar a diminuir as taxas de solicitação após atingir o limite.

Para otimizar o desempenho e evitar atingir limites de volume, crie um sistema de fila para solicitações de API. Isso permite um ritmo controlado de solicitações, garantindo a conformidade com os limites da API sem perder desempenho.

### Estratégias de cache

Implemente o armazenamento em cache para dados acessados ​​com frequência, como insights sobre o público ou métricas de desempenho de publicidade. Isso reduz o número de chamadas de API e acelera a recuperação de dados, resultando em um app mais eficiente.

### Como gerenciar o controle de versões da API

Acompanhe [atualizações e mudanças](/docs/marketing-api/marketing-api-changelog) na API de Marketing verificando regularmente a documentação. Ao incluir chamadas de API em funções específicas, você prepara seu app para alterações da versão, permitindo atualizações independentes.

### Registro e monitoramento de erros

Implemente um registro de erros sólido para rastrear interações da API. Isso ajudará a identificar padrões em erros e permitirá resoluções mais rápidas. Com o uso de ferramentas de monitoramento, é possível alertar os desenvolvedores sobre falhas críticas ou padrões incomuns no uso da API.

### Problemas temporários

Os erros às vezes indicam que o problema é temporário (ou seja, `"is_transient": true`). Isso indica que o problema pode ser corrigido ou resolvido em breve. Por isso, o ideal é aguardar e tentar novamente mais tarde.

[](#)