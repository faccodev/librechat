---
title: "Biblioteca do Configurador de Parâmetros - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library"
scraped_at: "2026-02-01T14:07:29.134Z"
---

# Biblioteca do Configurador de Parâmetros

A Meta disponibilizou uma lista de SDKs de biblioteca tanto no lado do cliente (JavaScript) quanto no lado do servidor (PHP, Java, Python, NodeJS, Ruby). Essas bibliotecas ajudam os desenvolvedores a melhorar a qualidade dos [parâmetros](/docs/marketing-api/conversions-api/parameters) de eventos da API de Conversões (por exemplo, [fbc, fbp](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/), `client_ip_address` e outros parâmetros de informações de clientes como `em` e `ph`) e permitem que os anunciantes sigam as boas práticas da Meta em relação à geração desses parâmetros.

Este documento inclui uma visão geral de ambas as bibliotecas, orientações sobre qual biblioteca usar e exemplos de casos de uso.

## Visão geral das bibliotecas

**Lado do cliente**: a biblioteca e os eventos ficam no front-end, no lado do navegador. As bibliotecas são implementadas em JavaScript. Os desenvolvedores podem integrá-las diretamente nas próprias páginas da web.

**Lado do servidor**: as bibliotecas e os eventos ficam no back-end, no lado do servidor. Dependendo do back-end, a Meta fornece bibliotecas em diferentes linguagens (PHP, Java, Python, NodeJS e Ruby).

[](#)

## Como escolher uma biblioteca

Todas as bibliotecas podem funcionar de forma independente. Para maximizar o potencial para você ou seus clientes, leia estas recomendações.

A parambuilder segue as boas práticas descritas na documentação para desenvolvedores da Meta. Ela é implementada no lado do cliente (JavaScript) e no lado do servidor (PHP, Java, Python, NodeJS, Ruby).

-   Para o lado do servidor, consulte [Parameter Builder Library: Server-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding).
    
-   Para o lado do cliente, leia [Parameter Builder Library: Client-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding).
    

[](#)

## Exemplos de casos de uso para referência

Considere os seguintes casos de uso ao projetar sua solução.

### Recomendado: configurador de parâmetros do lado do servidor + configurador de parâmetros do lado do cliente

Combinar o configurador de parâmetros do lado do servidor com o configurador de parâmetros do lado do cliente pode ajudar você a alcançar uma alta cobertura de fbc e IPv6.

Para isso, será necessário integrar duas bibliotecas: configurador de parâmetros do lado do servidor e configurador de parâmetros do lado do cliente.

  

[![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/571352803_2055279945245966_4695373840013913898_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=yhPqkORc_bsQ7kNvwFA0L06&_nc_oc=AdliQyd666TTw3nqmjNy07TqO_dTj2MR_G35sLHIU9_SYwLxjnEVXSkq_zCxKWqTzyMoAiUUY4xzZSs3c0naZWl5&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=QZ5zvQ55qP97lBh7jvX9_g&oh=00_AftHBil6CXAbnIx9ZntuykkQSu6e8waWoC21V9P8Nqa8Cg&oe=699986E0)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2365-6/571352803_2055279945245966_4695373840013913898_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e280be&_nc_ohc=yhPqkORc_bsQ7kNvwFA0L06&_nc_oc=AdliQyd666TTw3nqmjNy07TqO_dTj2MR_G35sLHIU9_SYwLxjnEVXSkq_zCxKWqTzyMoAiUUY4xzZSs3c0naZWl5&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=QZ5zvQ55qP97lBh7jvX9_g&oh=00_AftHBil6CXAbnIx9ZntuykkQSu6e8waWoC21V9P8Nqa8Cg&oe=699986E0)

  
  

#### Exemplo de fluxo de trabalho

-   O app do cliente do anunciante carrega o configurador de parâmetros do lado do cliente e invoca a API processAndCollectAllParams fornecida com um ponteiro de função getIpFn.
    
-   O getIpFn fornecido será invocado e buscará o IPv6 do ponto de extremidade configurado pelo anunciante, dependendo da implementação real da getIpFn.
    
-   O IPv6 será retornado do ponto de extremidade configurado pelo anunciante e transmitido de volta para o configurador de parâmetros do lado do cliente a partir do valor de retorno de getIpFn. O IPv6 recuperado será armazenado no cookie com a chave \_fbi para recuperação posterior.
    
-   No lado do cliente, inicie as comunicações usuais com o servidor back-end usando a API de busca (ou outra comunicação front-end/back-end) com os cookies internos.
    
-   No lado do servidor, integre a biblioteca conforme a linguagem escolhida no ponto de extremidade receptor (por exemplo, ExampleController) e invoque a API processRequest fornecida para processar a solicitação.
    
    -   Para saber mais, consulte os artigos [Parameter Builder Library: Server-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding) e [Parameter Builder Library: Client-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding) ou os arquivos README mencionados nesses documentos.
        
    
-   A API processRequest retornará uma lista de cookies recomendados para serem atualizados no lado do cliente.
    
-   Defina os cookies recomendados nos cabeçalhos de resposta para instruir o navegador do cliente a armazená-los.
    
-   Invoque as diversas APIs fornecidas, como getFbc(), getFbp(), getClientIpAddress() e getNormalizedAndHashedPII().
    
-   O SDK retorna vários valores, como fbc, fbp, client\_ip\_address, email e phone number.
    
-   Envie esses valores recuperados de volta para a Meta usando a API de Conversões.
    

```
// Example Controller which processes all requests to example.com
// Start process
ParamBuilder paramBuilder = new ParamBuilder(Arrays.asList('example.com', 'yourDomain.com'));
// Input the request's full URL, such as: example.com?fbclid=xxxxx
// Process and get recommended updated cookie
List<CookieSetting> updatedCookieList =
        paramBuilder.processRequest(
            request.getHeader("host"),  // example.com
            request.getParameterMap(), // {'fbclid':['xxxxx']}
            cookieMap, 
            request.getHeader("referer"),
request.getHeader("X-Forwarded-For"),
request.getRemoteAddr(),
); // optional: referer full url


// Save cookie from server side
for (CookieSetting updatedCookie : updatedCookieList) {
      Cookie cookie = new Cookie(updatedCookie.getName(), updatedCookie.getValue());
      cookie.setMaxAge(updatedCookie.getMaxAge());
      cookie.setDomain(updatedCookie.getDomain());
      response.addCookie(cookie);
 }

// Get fbc, fbp, client_ip_address
String fbc = paramBuilder.getFbc();
String fbp = paramBuilder.getFbp();
String client_ip_address = paramBuilder.getClientIpAddress();

// Get Normalized and Hashed PII like email and phone number
String normalizedAndHashedEmail = paramBuilder.getNormalizedAndHashedPII(‘John_Smith@gmail.com’,’email’);
String normalizedAndHashedPhone = paramBuilder.getNormalizedAndHashedPII(‘(650)555-1212’,’phone’);

// Call CAPI endpoint
.....
.setFbc(fbc)
.setFbp(fbp)
.setClientIpAddress(client_ip_address)
.setEmail(normalizedAndHashedEmail)
.setPhone(normalizedAndHashedPhone)
....
```

### Somente ParamBuilder do lado do servidor

Leia o artigo [Parameter Builder Library: Server-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding) ou os arquivos README mencionados para ver exemplos detalhados.

#### Exemplo de fluxo de trabalho

-   No ponto de extremidade do servidor, importe a biblioteca ParamBuilder com base na linguagem e na estrutura relevante.
    
-   Chame paramBuilder.processRequest para gerar uma lista de cookies atualizados e recomendados.
    
-   Defina os cookies na sua resposta.
    
-   Defina fbc, fbp, client\_ip\_address e outras PII, como email e número de telefone, para a chamada da API de Conversões usando paramBuilder.getFbc(), paramBuilder.getFbp(), paramBuilder.getClientIpAddress() e paramBuilder.getNormalizedAndHashedPII() , respectivamente.
    

### Somente ParamBuilder do lado do cliente

Leia o artigo [Parameter Builder Library: Client-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding) ou os arquivos README mencionados para ver exemplos detalhados.

#### Exemplo de fluxo de trabalho

-   Ao carregar a página de destino, chame clientParamBuilder.processAndCollectAllParams(url, getIpFnl).
    
-   A solicitação é enviada para o lado do servidor. Depois, o servidor pode ler fbc, fbp e client\_ip\_address do cookie usando a chave \_fbc, \_fbp e \_fbi, respectivamente.
    
    -   **Observação:** se o URL de destino não contiver o parâmetro fbclid, talvez fbc não esteja presente. Esse é o comportamento esperado.
        
    

[](#)

## Links úteis

[Link principal do GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder&h=AT2GvZeVRZUJBqvbwq3P-YqJakeV14JCrfgbCGQkw3llwDkC9-Oj0_uF4CeGQUqbXOEnTiHDtoSh5k-Af7X_TcatbjeiNs1gY_w9GeHKw0FNp4DhxPbWCyixpOxRmyLvDHxpxeBVlgtnoBIDFJ5cOSZ6te92zDPZ9QlLZh3Fqpw)

Verifique se você está usando a versão mais recente.

-   PHP: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fphp%2FREADME.md&h=AT1jjWiYP7Np5rf3Sh3xUGbukqvtYJqbTPGdLcTbNdtosp2bMKFY31YU70gegJ3pXx6cNSr1NoRCKo8FqFkzvd71c8GnJ2KacaRtrbMr9HTH2JSFTS1IQI_3F1WqCB9SM96BNV_MfBAEUmHbWcHhby8N5fftE1EB46o9rdOLfd4)
    
-   NodeJS: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fnodejs%2FREADME.md&h=AT1zvFub4SbZGDjEn96h6JdTE_IJwEJPJ57HUV4fTCbBMBO5s3UX_m13Ya4Bn-7u1MD6QcyANrtdPsOXDHOHC-8r_ZO7CWSphv59yIESlBpGdu2Tw3C15KRK1X0D6r6QACbIEThdfipRjR1iqnx-5GPYHTvJJAWt0vfFylCLSAE)
    
-   Java: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fjava%2FREADME.md&h=AT3glMmZW6b4ekGPWyZ6lEqqqXfojgtrmV_JKPOzD9UtHR0RGAIp_PrR7vtHkdoHimh4JCgjNFP4yewwWPzNKPxQgPYsOJxCmVpOo8ARBp0q0Cz8FX3vC1rsnTI-dqMzL56XO4Hiz8fciAHDFgWGHhspuHkTNMPS8HUkNvxHjt4)
    
-   Python: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fpython%2FREADME.md&h=AT3Y5HIONKFkTqx3KtBVPyTfo2fQoFPZE1Ur1RkpwxaMjV_21V6eHYfJOOODd4FHE5A4AqDQelUhxwf4WDcmpwVW2WhPjqRZaHlAC_MTajIG14PUmMXgOrm1KxY6cAiAaUFjOG6jw4ShznAsvU3bg_N_9MysRMj-y7y5BHDg2AU)
    
-   Ruby: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fruby%2FREADME.md&h=AT0kOQBIqdc4REjAOpQrLlb8wAxUmHu24yutrPqYU-6oyX7Xghk_lPi65NoYdEs3ek0HgKsJ39Dy5SEVkC-zSyYcxK7qZpXcGN3RHTH18Tk14LxcEz-_H8eA9WP4HvYfo81w14pRetmLiC0eXFYMceIAjv6NLKPG_BmSt-VK5s8)
    
-   JavaScript do cliente: [README](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Fblob%2Fmain%2Fclient_js%2FREADME.md&h=AT1pHh-CtcSifcPei9vnWhmZj-RxN93PZAykCbMWS57blmTmsVIU0x8bTdJAo1ZdsH6SQhtvQJZK6Upgd3AvdMRe-IMKLvsLlLehvUDwxChMM6WGiz4AIajxH0o3kFG79xLvvs-u8ivKXpTAWIhSqU0diodBGWiYIpXh_PA4nY0)
    

[](#)

## Boas práticas

-   Garanta que os cookies `_fbp` e `_fbc` sejam salvos o quanto antes durante a jornada do cliente na sua página da web. O ideal é recuperar os cookies `_fbp` e `_fbc` no carregamento da página de destino. Não é recomendado recuperar esses parâmetros apenas em eventos de fim do funil ou quando certos eventos são disparados.
    
-   Não substitua nem ajuste os cookies `_fbc` ou `_fbp`. `_fbc` diferencia maiúsculas de minúsculas; não converta `_fbc` para letras minúsculas.
    
-   Garanta que as bibliotecas estejam implementadas em todas as superfícies, incluindo dispositivos móveis, desktop, navegadores e domínios que você quer monitorar.
    
-   A biblioteca do lado do servidor serve para o back-end, enquanto a biblioteca do lado do cliente funciona para o front-end, ou seja, para o navegador. Os desenvolvedores podem integrar a biblioteca do lado do cliente diretamente na página web, enquanto as bibliotecas do lado do servidor são chamadas no servidor, na parte de back-end. O lado do cliente está disponível apenas em JavaScript, mas a biblioteca do lado do servidor fornece suporte para diferentes linguagens (PHP, Java, Python, NodeJS e Ruby).
    
-   Ao implementar a funcionalidade `getIpFn`, recomendamos que você recupere primeiro o endereço IPv6 e, depois, faça fallback para o endereço IPv4 caso essa capacidade de recuperação não esteja disponível no lado do cliente do usuário.
    
-   Recomendamos integrar o configurador de parâmetros do cliente e do servidor para otimizar o desempenho. Você pode usar o configurador de parâmetros no lado do cliente para recuperar `client_ip_address` e salvar em um cookie. Mais tarde, será possível usar o configurador de parâmetros do lado do servidor para obter o melhor `client_ip_address` disponível de cookies e solicitações para enviar à Meta por meio da API de Conversões.
    
-   Recomendamos aplicar normalização e conversão em hash aos parâmetros de informações do cliente apenas uma vez, seja do lado do cliente ou do servidor, antes de enviá-los para a Meta por meio da API de Conversões.
    
-   Os valores de todos os campos de parâmetros de informações do cliente retornados no configurador de parâmetros diferenciam maiúsculas de minúsculas. É possível enviar esses valores de volta para a Meta pela API de Conversões sem normalização (por exemplo, letras minúsculas), pois isso foi feito automaticamente pelo SDK do parambuilder durante o processo.
    

[](#)

## Veja também

-   [Parameter Builder Library: Server-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding)
    
-   [Parameter Builder Library: Client-Side Onboarding Guide](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding)
    

[](#)