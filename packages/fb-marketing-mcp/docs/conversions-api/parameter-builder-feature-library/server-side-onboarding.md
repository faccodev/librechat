---
title: "Guia de integração do lado do servidor - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library/server-side-onboarding"
scraped_at: "2026-02-01T15:47:49.495Z"
---

# Biblioteca do configurador de parâmetro: guia de integração do lado do servidor

A Meta disponibilizou uma lista de SDKs de biblioteca tanto no lado do cliente (JavaScript) quanto no lado do servidor (PHP, Java, Python, NodeJS, Ruby). Essas bibliotecas ajudam os desenvolvedores a melhorar a qualidade dos [parâmetros](/docs/marketing-api/conversions-api/parameters) de eventos da API de Conversões (por exemplo, [fbc e fbp](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/)) e permitem que os anunciantes sigam as boas práticas da Meta em relação à geração desses parâmetros.

## Visão geral da biblioteca do lado do servidor

Confira abaixo os guias passo a passo para integração direta com seu app. Se você tem interesse em executar uma demonstração, consulte os [guias de início rápido](#quick-start-guides).

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
    

Este documento descreve a biblioteca do configurador de parâmetro do lado do servidor.

Para informações sobre a biblioteca do lado do cliente, consulte o [Guia de integração da biblioteca do configurador de parâmetro no lado do cliente](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding). Nossa recomendação é implementar as soluções do lado do cliente e do servidor.

[](#)

## Guias de início rápido

Confira os recursos para código e a demonstração de exemplo no nosso GitHub: [github.com/facebook/capi-param-builder](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcapi-param-builder&h=AT3Gn82ahreh8snlKRRv_lveGSiHJSNFp_IDOAGbU30IbObAuSlw0pUifvJSgXBaRoPDTkYiXIUN4GI1xhNmhTEDORhnnmPYn7j2B8hbdcCZtFlIWDFwMrNB31wqCkXoR3ienLu5tvjk0AZ_EnnYqLNuHeXdlYQ55mpA5Bh-j94)

[](#)

## Adicione a biblioteca da Meta como uma dependência

PHP SDKNode.js SDKJava SDKPython SDKRuby SDK

```
// Check the latest version. Add the dependency in your composer.json.    
{
   "require": {
 	  "php": ">=7.4",
        "facebook/capi-param-builder-php": "{current_version}"
   },
   "minimum-stability": "dev"
}
```

```
// Update the dependencies in your package.json. Run npm install. 
"dependencies": {
      "capi-param-builder-nodejs": {version}
}
```

```
// Example below is in Gradle Groovy. Edit your build.gradle:
dependencies {
    implementation 'com.facebook.capi.sdk:capi-param-builder:{current_version}'
}
```

```
// Install the library using pip. Run the following command lines.
pip install capi_param_builder_python
        
// Verify the installation by `pip list`
```

```
gem install capi_param_builder_ruby
```

  

[](#)

## Como usar as APIs

**Observação**: estamos atualizando a API para que ela tenha mais flexibilidade para se adaptar ao seu caso. Verifique o README de cada linguagem para ver a opção mais específica. Abaixo estão as orientações gerais para todas as linguagens.

A biblioteca do configurador de parâmetro fornece funcionalidade para processar as solicitações HTTP recebidas e extrair os valores de parâmetros como fbc/fbp e endereço IP do cliente. Ela também fornece normalização de parâmetros de informações do cliente (PII) e funcionalidade de conversão em hash. Se você quiser analisar alguns exemplos existentes, consulte os [guias de início rápido](#quick-start-guides) para mais informações.

Estas são as etapas:

1.  Importe a biblioteca
2.  Chame a API
3.  Defina os cookies `_fbc` e `_fbp` retornados pela biblioteca
4.  Chame as APIs get para obter os parâmetros de fbc, fbp, client\_ip\_address e informações do cliente (PII), como email, número de telefone etc.
5.  Envie os parâmetros de informações do cliente à Meta usando a API de Conversões

Exemplo de pseudocódigo de integração do lado do servidor:

```
// Pseudocode on client's server: 

// Call library. Param is list of etld+1 for your websites. 
$param_builder = new ParamBuilder(arrays['example.com', 'test.com']);

// Get fbc, fbp
$cookies = $param_builder->processRequest($host, $url, $cookies, $referer, $x_forwarded_for, $remote_address);

// Save fbc and fbp provided by $cookies
set_cookie($cookies);

// Get fbc
$fbc = $param_builder->getFbc();
// Get fbp
$fbp = $param_build->getFbp();

// Get client ip address
$client_ip_address = $param_builder->getClientIpAddress();

// Get normalized and hashed email 
$email = $param_builder->getNormalizedAndHashedPII(‘John_Smith@gmail.com’,’email’);

// Get normalized and hashed phone 
$phone = $param_builder->getNormalizedAndHashedPII(‘+1 (616) 954-78 88’,’phone’);

// Call Conversion API and pass $fbc, $fbp, $client_ip_address, $email and $phone
```
  

Atualmente, estas cinco APIs principais são compatíveis:

-   processRequest
    
-   getFbc
    
-   getFbp
    
-   getClientIpAddress
    
-   getNormalizedAndHashedPII
    

Diferentes linguagens podem ter convenções de nome diferentes. Os exemplos a seguir são da linguagem Java.

### API processRequest

Essa é a API principal para processar fbc, fbp e client\_ip\_address. Os primeiros três parâmetros da API processRequest são obrigatórios e os demais são opcionais. Porém, recomendamos que você defina todos os parâmetros para otimizar o desempenho.

```
/**
 * @param host: host or domain this request is coming from
 * @param query_params: url query params in Map format. Eg. Example.com?test=123&name=hello, then the pass-in query params will be {“test”:”123”, “name”:”hello”}
 * @param cookies: current cookies in Map format. Eg.{“my_cookie1”:”test”, “_fbc”:”xxxxx”} etc. 
 * @param referer: http referrer request header. Eg.https://example.com/page?q=123 etc.
 * @param x_forwarded_for: http x_forwarded_for request header. Eg.203.0.113.195,2001:db8:85a3:8d3:1319:8a2e:370:7348 etc.
 * @param remote_address: the remote_address variable in http request. Eg.2001:db8:85a3:8d3:1319:8a2e:370:7348 returned from request.getRemoteAddr() etc.
 * @return List of CookieSetting. You could set your user cookies based on the returned value. 
*/
List<CookieSetting> processRequest(String host, Map<String, String> query_params, Map<String, String> cookies, String referer, String x_forwarded_for, String remote_address)
```

`CookieSetting` é um modelo fornecido pela Meta.

```
@Getter
public class CookieSetting {
 public String name;
 public String value;
 public String domain;
 public int maxAge;
}
```
  

Utilização no app:

```
import com.facebook.capi.paramsdk.ParamBuilder;
import com.facebook.capi.paramsdk.model.CookieSetting;

...

// Calling the API
// The list would be a list of preferred domains. We'll match it with your input domain and return in the CookieSetting's domain
ParamBuilder paramBuilder = new ParamBuilder(Arrays.asList("example.com", ..));
..
// Currently only contains _fbc and _fbp
List<CookieSetting> updatedCookieList = paramBuilder.processRequest(domainName, queryParamsMap, cookieMap, referer, x_forwarded_for, remote_address);

// Set cookie based on your language and frameworks
...
```

### API getNormalizedAndHashedPII

Esta API retorna os parâmetros de informações do cliente (PII) normalizados e convertidos em hash (sha256). Se a entrada for inválida, a API retornará um valor nulo. Esse método recebe dois parâmetros. O primeiro parâmetro é o valor de PII a ser normalizado e convertido em hash. O segundo parâmetro é o tipo de PII que você quer normalizar. As opções disponíveis são: 'phone', 'email', 'first\_name', 'last\_name', 'date\_of\_birth', 'gender', 'city', 'state', 'zip\_code', 'country' e 'external\_id'.

```
// @params piiValue: string. The PII value we want to normalize and hash.
// @params dataType: string. The type of PII you want to normalize as. Available options are: 'phone', 'email','first_name','last_name','date_of_birth','gender','city','state', 'zip_code', 'country' and 'external_id'
// @return NormalizedAndHashedPII: string or null, the normalized and hashed PII. We will return null with invalid input.
getNormalizedAndHashedPII(piiValue,dataType) 

Usage example:
getNormalizedAndHashedPII(‘John_Smith@gmail.com’,’email’);
getNormalizedAndHashedPII(‘+1 (616) 954-78 88’,’phone’);
```

### API getFbc

Você precisará primeiro fazer uma chamada para a processRequest mencionada acima para conseguir o fbc correto. Se o fbc não estiver disponível, o valor retornado será nulo.

```
String getFbc();
```

Utilização no app:

```
String fbc = paramBuilder.getFbc();
```

### API getFbp

Você precisará primeiro fazer uma chamada para a processRequest mencionada acima para receber o fbp correto. Se fbp não estiver disponível, o valor retornado será nulo.

```
String getFbp();
```

Utilização no app:

```
String fbp = paramBuilder.getFbp();
```

### API getClientIpAddress

Retorne o valor mais preciso de client\_ip\_address das fontes fornecidas. Você precisará primeiro fazer uma chamada para a processRequest mencionada acima com os parâmetros cookies x\_forwarded\_for e remote\_address para receber o client\_ip\_address correto. Se o client\_ip\_address não estiver disponível, o valor retornado será nulo.

```
String getClientIpAddress();
```

Utilização no app:

```
String client_ip_address = paramBuilder.getClientIpAddress();
```

[](#)

## Gerenciar interações com cookies

Esta seção inclui exemplos de como ler e armazenar cookies. A biblioteca do lado do servidor não salva cookies. Recomendamos que os anunciantes salvem a lista de cookies sugerida. Quanto a cookies e consentimento do usuário, consulte os [termos das ferramentas para empresas da Meta](https://www.facebook.com/legal/technology_terms) para saber mais detalhes.

Esta seção inclui exemplos de como ler e armazenar cookies.

### Consentimento para integração com cookie

As empresas podem implementar um código que crie um banner e exija consentimento afirmativo (por exemplo, uma caixa de seleção "Eu concordo" na parte superior da página) para permitir ações de salvamento de cookies para fbc e fbp. Se você já tiver um sistema implementado que atenda a essa necessidade, como um gerenciador de tags, esse código poderá ser opcional.

Abaixo estão exemplos de como ler e definir os cookies. Se você não tiver certeza sobre algum trecho, consulte nossos [guias de início rápido](#quick-start-guides) para exemplos mais detalhados.

PHP SDKPHP DrupalNode.js SDKJava SDKPython SDKRuby SDK

```
$param_builder = new FacebookAds\ParamBuilder(arrays['example.com', 'test.com']);
$cookies_to_set = $param_builder->processRequest(
   $_SERVER['HTTP_HOST'],
   $_GET,
   $_COOKIE,
   $_SERVER['HTTP_REFERER'] ?? null, // Optional field. If you input, could help improve the quality
   $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
   $_SERVER['REMOTE_ADDR'] ?? null
);


foreach ($cookies_to_set as $cookie) {
   setcookie(
       $cookie->name,
       $cookie->value,
       time() + $cookie->max_age,
       '/',
       $cookie->domain
   );
   
}
```

```
// This PHP example uses drupal/eu_cookie_compliance as third-party cookie consent and may be replaced with whatever the customer uses. For more details, please review the full example at https://www.google.com/url?q=https://capi-automation.s3.us-east-2.amazonaws.com/public/php/example/drupal.zip&sa=D&source=docs&ust=1747687304480502&usg=AOvVaw0z75y_J_zIyHprgIfHq0lt    
/**
   * Fetches cookies from the HTTP request.
   */
  public function onKernelRequest(RequestEvent $event) {
    $request = $event->getRequest();
    $http_host = $request->getHost();
    $get_params = $request->query->all();
    $referer = $request->headers->get('referer');
    $x_forwarded_for = $request->headers->get('X-Forwarded-For');
    $remote_addr = $request->getClientIp();

    // Get COOKIE values equivalent.
    $cookies = $request->cookies->all();
    // if EU Cookie Compliance module is being used
    if (isset($cookies['cookie-agreed'])) {
      // Get the value of the 'cookie-agreed' cookie.
      $this->cookieAgreed =
        $cookies['cookie-agreed'] == self::COOKIE_AGREED_VALUE;
    }
    if($this->cookieAgreed){
        $this->param_builder->processRequest(
          $http_host,
          $get_params,
          $cookies,
	    $referer ?? null,
    $x_forwarded_for ?? null,
    $remote_addr ?? null
      );
    }
  }
  /**
   * Sets a cookie in the HTTP response.
   */
  public function onKernelResponse(ResponseEvent $event) {
    if($this->cookieAgreed){
      // Add the cookie to the response.
      $response = $event->getResponse();
      foreach ($this->param_builder->getCookiesToSet() as $cookie) {
        $response->headers->setCookie(new Cookie(
          $cookie->name,
          $cookie->value,
          time() + $cookie->max_age,
          '/',
          $cookie->domain
        ));       
      }
    }
  }
```

```
const builder = new ParamBuilder([‘example.com’, ‘....’]);


 if (!cookieString) {
   return null;
 }
 const cookies = {};
 const items = cookieString.split('; ');
 for (const item of items) {
     const [name, value] = item.split('=');
     cookies[name] = value;
 }


 const cookiesToSet = builder.processRequest(
   req.headers.host, // host
   params, // query params
   cookies, // current cookie
   req.headers.referer ?? null, // optional, help enhance the accurancy
   req.headers['x-forwarded-for'] ?? null,
   req.socket.remoteAddress ?? null
 );


 const cookies = [];
 for (const cookie of cookiesToSet) {
   cookies.push(cookie.name + '=' + cookie.value + '; Max-Age=' + cookie.maxAge + '; Domain=' + cookie.domain + '; Path=/');
 }
 res.setHeader('Set-Cookie', cookies);

   
}
```

```
ParamBuilder paramBuilder = new ParamBuilder(Arrays.asList("example.com", '....'));
   Map<String, String> cookieMap = getCookiesToMap(request.getCookies());
   List<CookieSetting>
```

```
from capi_param_builder import ParamBuilder


# Main function declaration
# We support DefaultEtldPlusOneResolver() from demo, please
fbcBuilder = ParamBuilder(["example.com", "...."])
# host: str, queries: dict[str, str], cookies: dict[str, str]
updated_cookies = fbcBuilder.process_request(
     domain_only, query_params, cookie_dict
)


# Set cookie
for cookie in updated_cookies:
           self.send_header(
               "Set-Cookie",
  f"{cookie.name}={cookie.value};Max-Age={cookie.max_age};path=/;domain={cookie.domain}",
           )
```

```
for cookie in cookies_to_be_updated do
        response.set_cookie(
            cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            path: "/",
            # for sinatra framework the expires is an absolute ts
            # Check your web framework to have the correct expires.
            expires: Time.now + cookie.max_age)
    end
```

[](#)

## Como passar fbc/fbp, client\_ip\_address e PII para a API de Conversões

Depois que o cookie for atualizado, você precisará enviar o fbc, o fbp e o client\_ip\_address de volta para a API de Conversões usando a API comum. A seguir, veja exemplos de como obter fbc/fbp, client\_ip\_address e PII (email, telefone etc.) em cada linguagem.

PHP SDKNode.js SDKJava SDKPython SDKRuby SDK

```
// Initialize the builder. 
$param_builder = new FacebookAds\ParamBuilder(array('example.com', 'test.com'));

// Process the request
$cookies_to_set = $param_builder->processRequest(
   $_SERVER['HTTP_HOST'],
   $_GET,
   $_COOKIE,
   $_SERVER['HTTP_REFERER'] ?? null,
   $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
   $_SERVER['REMOTE_ADDR'] ?? null
);

// Get fbc
$fbc = builder->getFbc();

// Get fbp
$fbp = builder->getFbc();

// Get client_ip_address
$client_ip_address = builder->getClientIpAddress();

// Get normalized and hashed email (sha256)
$email = builder->getNormalizedAndHashedPII(' John_Smith@gmail.com    ','email');

// Get normalized and hashed phone (sha256)
$phone = builder->getNormalizedAndHashedPII('1(650)123-4567','phone');

// Pass the fbc, fbp, client_ip_address, email and phone number to the Conversions API
```

```
// Get builder 
const builder = new ParamBuilder(["example.com", "your-domain.com"]);

// Get cookies from request
const requestCookies = parseCookie(req.headers.cookie);
builder.processRequest(
    req.headers.host, // host
    params, // query params
    requestCookies, // current cookie
    req.headers.referer ?? null, // optional, help enhance the accurancy
    req.headers['x-forwarded-for'] ?? null,
    req.socket.remoteAddress ?? null
  );

const fbc = builder.getCookiesToSet().getFbc();
const fbq = builder.getCookiesToSet().getFbq();
const clientIpAddress = builder.getClientIpAddress();
const email = builder.getNormalizedAndHashedPII(' John_Smith@gmail.com    ','email');
const phone = builder.getNormalizedAndHashedPII('1(650)123-4567','phone');

// Pass the fbc, fbp, clientIpAddress, email and phone number to the Conversions API
```

```
ParamBuilder paramBuilder = new ParamBuilder(Arrays.asList("example.com", "your-domain.com"));
   Map<String, String> cookieMap = getCookiesToMap(request.getCookies());
   List<CookieSetting>
```

```
fbcBuilder = ParamBuilder(["example.com", "your-domain.com"])
       # host: str, queries: dict[str, str], cookies: dict[str, str]
       updated_cookies = fbcBuilder.process_request(
           domain_only, query_params, cookie_dict
       )
       # after process_request got called, you could call get_fbc() and get_fbp() to get the actual value for fbc and fbp
       fbc = fbcBuilder.get_fbc()


       fbp = fbcBuilder.get_fbp()
        
# Pass the fbc and fbp to the Conversions API
```

```
builder = ParamBuilder.new(["localhost", "example.com"]) 
cookies_to_be_updated = builder.process_request(
        host, # current host name
        query_params, # query params as hash type
        cookie_dict, # current cookies as hash type
        referral_link) # optional current referer
# recommended to save cookies_to_be_updated to your cookies.
 
# after process_request got called, you could use get_fbc and get_fbp to get the actual value
fbc = builder.get_fbc()
fbp = builder.get_fbp()
        
# Pass the fbc and fbp to the Conversions API
```

[](#)

## \[Opcional\] Implementar ETLD+1 Resolver

Você pode considerar essa opção quando estiver construindo a biblioteca do configurador de parâmetro. Recomendamos que você use a opção da lista de domínio mencionada na seção [Como usar as APIs](#using-the-apis-ss) acima.

Para alcançar o melhor resultado, os cookies fbc e fbp devem ser escritos o máximo possível no domínio de nível superior. Internamente, as bibliotecas configuradoras de parâmetros usam uma lista pública de sufixos para determinar em qual domínio definir os cookies. Se você conhece o eTLD+1 do seu domínio web, você pode implementar uma solução mais otimizada por meio da interface `ETLDPlus1Resolver`.

Exemplos de cada linguagem são mostrados abaixo. Você também pode revisar os exemplos de demonstração nos [guias de início rápido](#quick-start-guides) para as soluções existentes.

PHP SDKNode.js SDKJava SDKPython SDKRuby SDK

```
class SimpleETLDPlus1Resolver implements ETLDPlus1Resolver {
   public function resolveETLDPlus1($domain) {
       if (isSubdomain($domain, "example.com")) {
           return "example.com";
       }
       throw new InvalidArgumentException("only example.com is supported");
   }
}
```

```
/*
//Currently we provide 3 options; you may also implement your own resolver.

1. [Recommended] Resolve etld+1 by default
     const etldPlus1Resolver = new DefaultETLDPlus1Resolver();
2. Resolve by half manual input
     const etldPlus1Resolver = new DefaultETLDPlus1Resolver('www.example.com'); // => 'example.com';
3. Manual identify etld+1 (mostly for localhost test).
     const etldPlus1Resolver = new DummyLocalHostTestResolver('localhost');
4. Implement a new resolver by yourself. Example below:

*/
    
class SimpleETLDPlus1Resolver {
   resolveETLDPlus1(domain) {
	if (isSubdomain(domain, "example.com")) {
	return "example.com";
}
      // throw exception or fallback to other functions
   }
```

```
// We provide DefaultETLDPlusOneResolver, which uses Guava InternetDomainName to resolve ETLD+1. If you prefer to do it yourself, follow the example below:

public class SimpleETLDPlusOneresolver implements ETLDPlusOneResolver {
	@Override
	public String resolve(String domain) {
               if (isSubdomain(domain, "example.com")) {
	       return "example.com"
               }
               // throw exception or fallback to other function
        }
}
```

```
# We provide a default_etld_plus_one_resolver.py within the example file. Feel free to implement your own solutions. 
        
from capi_param_builder import EtldPlusOneResolver

        
class DefaultEtldPlusOneResolver(EtldPlusOneResolver):
   """
   Default implementation of EtldPlusOneResolver
   """


   def resolve(self, host_name: str) -> Optional[str]:
        # Start your implementation to get etld+1 from host_name
        etld_plus_one = host_name
        # Return the resolved etld+1
        return etld_plus_one
```

```
# Please check the Ruby example from the README demo for the full context.
        
require 'capi_param_builder/etld_plus_one_resolver'

class DefaultEtldPlusOneResolver < EtldPlusOneResolver
   def resolve(host_name)
        # Your implementation
        return host_name
   
   end

end
```

[](#)

## Veja também

-   [Visão geral da biblioteca do configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library)
    
-   [Biblioteca do configurador de parâmetro: guia de integração do lado do cliente](/docs/marketing-api/conversions-api/parameter-builder-feature-library/client-side-onboarding)
    

[](#)