---
title: "Guia de integração no lado do cliente - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding"
scraped_at: "2026-02-01T15:47:45.447Z"
---

# Biblioteca do configurador de parâmetro: guia de integração do lado do cliente

A Meta disponibilizou uma lista de SDKs de biblioteca tanto no lado do cliente (JavaScript) quanto no lado do servidor (PHP, Java, Python, NodeJS, Ruby). Essas bibliotecas ajudam os desenvolvedores a melhorar a qualidade dos [parâmetros](/docs/marketing-api/conversions-api/parameters) de eventos da API de Conversões (por exemplo, [fbc, fbp](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/), `client_ip_address` e outros parâmetros de informações de clientes como `em` e `ph`) e permitem que os anunciantes sigam as boas práticas da Meta em relação à geração desses parâmetros.

Atualmente, o configurador de parâmetro gerencia o armazenamento e a recuperação de:

-   Identificação do clique da Meta (fbc)
    
-   Identificação do navegador da Meta (fbp)
    
-   Endereço IP do cliente (client\_ip\_address)
    

Também fornece a funcionalidade de normalização e conversão em hash dos seguintes [parâmetros de informações do cliente](/docs/marketing-api/conversions-api/parameters/customer-information-parameters):

-   Email (em)
    
-   Número de telefone (ph)
    
-   Nome (fn)
    
-   Sobrenome (ln)
    
-   Data de nascimento (db)
    
-   Gênero (ge)
    
-   Cidade (ct)
    
-   Estado (st)
    
-   Código postal (zp)
    
-   País (country)
    
-   Identificação externa (external\_id)
    

Este documento descreve a biblioteca do configurador de parâmetro do lado do cliente. As bibliotecas aqui descritas são construídas em JavaScript e terão efeito no lado do cliente.

Para informações sobre a biblioteca do lado do servidor, consulte o [Guia de integração do recurso configurador de parâmetro do lado do servidor](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding). Nossa recomendação é implementar as soluções do lado do cliente e do servidor.

## Guia de início rápido/README

Veja nossa página no GitHub para ver exemplos de demonstração e o README: [https://github.com/facebook/capi-param-builder/tree/main/client\_js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder%2Ftree%2Fmain%2Fclient_js&h=AT00JejgmgenzaawZLppQ0uavYmg0LAdJn0YVOnzBQNSMYiYKEXE-KNPhPI9_ZS5p1ck47LU8Di7mLFBihPCAl2UTTIhIU592OGc7XI_ahjfa874Yn6Kp3hUwhrjSsy1GCKuAvgbEAh4z0_mESKSpe793GGVOL7E2q0MygjRHhwiH_TX35FUKxH6)

[](#)

## Visão geral da biblioteca do lado do cliente

clientParamBuilder é a biblioteca básica para recuperar e armazenar o clickID de URL, cookies e navegador no app. Ela ajuda a recuperar os endereços IP do cliente da função de recuperação fornecida. Também fornece APIs para recuperar fbc, fbp e client\_ip\_address. Além disso, a biblioteca também oferece normalização de parâmetros de informações do cliente e a funcionalidade de conversão em hash.

**Observação:** se você já usa a clientParamsHelper v1.1.10 e versões anteriores, consulte as [orientações sobre descontinuação aqui](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding#deprecation-of-clientparamshelper).

[](#)

## Adicione a biblioteca da Meta como uma dependência

### clientParamBuilder.js

Adicione o seguinte script à sua página da web.

```
<script src="https://capi-automation.s3.us-east-2.amazonaws.com/public/client_js/capiParamBuilder/clientParamBuilder.bundle.js"></script>
```

[](#)

## Gerenciar interações com cookies

Esta seção inclui exemplos de como ler e armazenar cookies. Recomendamos que os anunciantes salvem a lista de cookies sugeridos. Verifique abaixo a utilização para cada API. Quanto a cookies e consentimento do usuário, consulte os [termos das ferramentas para empresas da Meta](https://www.facebook.com/legal/technology_terms) para saber mais detalhes.

### Consentimento para integração com cookie

As empresas podem implementar um código que crie um banner e exija consentimento afirmativo (por exemplo, uma caixa de seleção "Eu concordo" na parte superior da página) para permitir ações de salvamento de cookies por meio da clientParamBuilder. Se você já tiver um sistema implementado que atenda a essa necessidade, como um gerenciador de tags, esse código poderá ser opcional.

### clientParamBuilder.js

A biblioteca clientParamBuilder do lado do cliente configurará automaticamente os cookies usando a API fornecida.

```
<script>       
// optional to input your current Url and getIpFn as clientParamBuilder.processAndCollectAllParams(url, getIpFn);
clientParamBuilder.processAndCollectAllParams(url, getIpFn); 
</script>
```

[](#)

## Como usar a API

### ClientParamBuilder

No momento, a biblioteca de configuradores é compatível com cinco APIs:

-   processAndCollectAllParams
    
-   getNormalizedAndHashedPII
    
-   getFbc
    
-   getFbp
    
-   getClientIpAddress.
    

Chame processAndCollectAllParams (URL, getIpFn) primeiro, antes de chamar getFbc(), getFbp() ou getClientIpAddress().

#### processAndCollectAllParams

processAndCollectAllParams cobrirá tudo de processAndCollectParams. Se o fbc não existir ou se o URL não contiver fbclid, tentaremos coletar o clickID em window.location.href. Se a função de recuperação de IP do cliente (getIpFn) for fornecida, usaremos o client\_ip\_address para você e o salvaremos em cookies com a chave \_fbi para recuperação posterior no servidor do anunciante e envio à Meta via CAPI como client\_ip\_address.

```
// @params url: [optional] string. The full URL you want to collect clickID from.
// @params getIpFn: [optional] function. The function you implemented to collect client IPv6 addresses from. If IPv6 is not available for clients, you should fallback to IPv4.
// @return will process and save cookies for fbc (if available), fbp and client_ip_address (if available), and return the updated cookie (fbc if available, fbp, client_ip_address if available).
processAndCollectAllParams(url,getIpFn) 

Usage example:
(async() => {

// Async function to fetch the user's IPv6 address,if not available fallback to IPv4 
 const getIpFn = async function () {
   return await (await fetch('https://api64.getIpExample.org')).text();
 };

const updated_cookie = await clientParamBuilder.processAndCollectAllParams("https://mytest.example.com?balabala=test", getIpFn);
const fbc = updated_cookie['_fbc'];
const fbp = updated_cookie['_fbp'];
const client_ip_address = updated_cookie['_fbi'];
})();

Note: clientParamBuilder.processAndCollectAllParams is an async call to save the fbc, fbp and client_ip_address to cookie using key _fbc, _fbp and _fbi respectively. If your use case doesn't require any complex settings, you don't necessarily need its return value. Call getFbc(), getFbp() and getClientIpAddress when you need them.
```

**Observação:** se você usar processAndCollectParams, essa opção será marcada como obsoleta. Em vez disso, use processAndCollectAllParams.

  

#### getIpFn

getIpFn é uma função que você pode fornecer como o segundo parâmetro (opcional) ao chamar processAndCollectAllParams. getIpFn fornece uma função para recuperar endereços IPv6 do cliente. Vamos invocar essa função para recuperar os endereços IPv6 do cliente e salvar o valor de retorno no cookie como \_fbi. O valor do cookie será recuperado mais tarde no seu servidor antes de ser enviado à API de Conversões como client\_ip\_address.

Caso o cliente não tenha um endereço IPv6, retorne o endereço IPv4 dele. O valor de retorno esperado é uma string IPv6 ou IPv4 de texto sem formatação.

```
// @return clientIpAddress: string, the valid client IPv6 address. If the IPv6 address is not available for the client, then fallback to the valid IPv4 address of the client.
getIpFn()
```

Exemplo de pseudocódigo:

```
// Async function to fetch the user's IPv6 address,if not available fallback to IPv4 
 const getIpFn = async function () {
   return await (await fetch('https://api64.getIpExampleSite.org')).text();
 };
```

Exemplo de valores de retorno:

`2001:0db8:85a3:0000:0000:8a2e:0370:7334` ou `168.212.226.204`

  

#### getNormalizedAndHashedPII

Esta API retorna os parâmetros de informações do cliente (PII) normalizados e convertidos em hash (sha256). Se a entrada for inválida, a API retornará um valor nulo. Esse método recebe dois parâmetros. O primeiro parâmetro é o valor de PII a ser normalizado e convertido em hash. O segundo parâmetro é o tipo de PII que você quer normalizar. As opções disponíveis são: 'phone', 'email', 'first\_name', 'last\_name', 'date\_of\_birth', 'gender', 'city', 'state', 'zip\_code', 'country' e 'external\_id'.

```
// @params piiValue: string. The customer information parameters(PII) value we want to normalize and hash.
// @params dataType: string. The type of PII you want to normalize as. Available options are: 'phone', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'city', 'state', 'zip_code', 'country' and 'external_id'
// @return NormalizedAndHashedPII: string or null, the normalized and hashed PII. We will return null with invalid input.
getNormalizedAndHashedPII(piiValue,dataType)
```

Exemplo de uso:

```
getNormalizedAndHashedPII(‘John_Smith@gmail.com’,’email’);
getNormalizedAndHashedPII(‘+1 (616) 954-78 88’,’phone’);
```
  

#### getFbc

A API getFbc retorna o valor de fbc do cookie. A API retornará uma string vazia se o cookie não existir.

```
// @return fbc string or empty string if none exists
getFbc();
```
  

#### getFbp

A API getFbp retorna o valor de fbp do cookie. A API retornará uma string vazia se o cookie não existir.

```
// @return fbp string or empty string if none exists
getFbp();
```
  

#### getClientIpAddress

A API getClientIpAddress retorna o valor de client\_ip\_address do cookie. A API retornará uma string vazia se o cookie não existir.

```
// @return client_ip_address string or empty string if none exists
getClientIpAddress();
```

[](#)

## Descontinuação da clientParamsHelper

A biblioteca clientParamsHelper foi descontinuada. Todas as funções da clientParamsHelper já devem ter sido movidas para a clientParamBuilder. Para saber mais sobre a substituição, verifique a API clientParamBuilder.

[](#)

## Veja também

-   [Visão geral da biblioteca do configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library)
    
-   [Biblioteca do configurador de parâmetro: guia de integração do lado do servidor](/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding)
    

[](#)