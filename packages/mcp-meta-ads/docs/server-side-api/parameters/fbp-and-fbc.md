---
title: "Parâmetros fbp e fbc - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/server-side-api/parameters/fbp-and-fbc"
scraped_at: "2026-02-01T15:47:30.485Z"
---

# ClickID e os parâmetros `fbp` e `fbc`

Este guia explica o ClickID e os parâmetros `_fbc` e `_fbp`. Os parâmetros `_fbc` e `_fbp` representam valores de cookies do navegador e podem ser enviados com seus eventos do servidor. Consulte [Sobre as configurações de cookies para o Pixel da Meta](https://www.facebook.com/business/help/471978536642445).

Recomendamos que você sempre envie os valores de cookie do navegador `_fbc` e `_fbp` nos parâmetros de eventos `fbc` e `fbp`, respectivamente, quando estiverem disponíveis. Esses valores estão sujeitos a alterações quando há várias sessões de navegador. Por isso, recomendamos que você atualize o perfil de um usuário com o valor mais recente sempre que possível.

## O que é o ClickID da Meta

O ClickID é um parâmetro **gerado pela Meta** que é passado com o URL do site de um anunciante quando um usuário clica em um anúncio no Facebook e/ou Instagram. Compartilhar o ClickID pode ajudar você a atribuir mais conversões e alcançar um número maior de pessoas, o que pode melhorar o desempenho do anúncio. A anexação automática do ClickID não afeta outros parâmetros de rastreamento personalizados que você tenha habilitado.

Exemplo de URL com ClickID: `https://example.com/?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk`

### Benefícios do ClickID

-   Aumentar o volume de conversões
    
-   Melhorar a atribuição e a otimização da campanha
    
-   Melhorar o desempenho do anúncio
    

[](#)

## 1\. Recuperar o ClickID da Meta

### Recuperar a partir do parâmetro de consulta de URL `fbclid`

Sempre que estiver presente nos parâmetros de consulta de URL, tente obter o ClickID no lado do servidor fazendo a leitura a partir da string de consulta de URL da solicitação HTTP.

Exemplo:

```
GET /?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk 
HTTP/2.0
Host: www.example.org
```

**Observação**: o valor do ClickID diferencia maiúsculas de minúsculas. Por isso, não faça alterações antes de usá-lo, como incluir letras minúsculas ou maiúsculas.

### Recuperar a partir do cookie `_fbc`

O valor do ClickID fica disponível no cookie `_fbc` em 2 casos:

-   O Pixel da Meta foi instalado no site. Nesse caso, o Pixel da Meta armazena automaticamente o valor do ClickID no cookie do navegador `_fbc` quando ele é disponibilizado.
    
-   Você já o armazena no cookie do servidor ou no armazenamento de back-end, seguindo as boas práticas listadas na seção "Armazenar o ClickID".
    

Em ambos os casos, o ClickID formatado pode ser obtido a partir do cookie `_fbc` lendo os cabeçalhos do cookie da solicitação HTTP. Veja como formatar o ClickID corretamente na seção [Formatar o ClickID](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc#2--format-clickid) abaixo.

[](#)

## 2\. Formatar o ClickID

Se o cookie `_fbc` não estiver disponível porque não há um Pixel da Meta em execução no site, ainda será possível enviar o parâmetro de evento `fbc` com o evento da API de Conversões se um parâmetro de consulta `fbclid` estiver presente no URL da solicitação de página atual.

O valor do ClickID deve estar no formato `version.subdomainIndex.creationTime.<fbclid>`, em que:

-   "version" é sempre este prefixo: **fb**.
    
-   "subdomainIndex" indica em qual domínio o cookie está definido (**"com" = 0**, **"example.com" = 1**, **"www.example.com" = 2**).
    
-   "creationTime" indica a hora, em **milésimos de segundo**, desde o início da era UNIX quando `_fbc` foi armazenado. Caso você não salve o cookie `_fbc`, use o registro de data e hora de quando observou ou recebeu esse valor `fbclid` pela primeira vez.
    
-   **`<fbclid>`** é o valor do parâmetro de consulta `fbclid` no URL da página.
    

_**Observação:** se você usar a biblioteca do configurador de parâmetro para formar o fbc, o formato terá um apêndice no final. Para mais informações, consulte a página da [biblioteca do configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library/)._

Veja um exemplo de como poderia ser o valor do parâmetro `fbc` (note que a porção `<fbclid>` é inválida):

```
fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

[](#)

## 3\. Armazenar o ClickID

**Observação**: antes de armazenar o ClickID é importante formatá-lo conforme descrito na seção ["Formatar o ClickID"](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc#2--format-clickid) acima. Isso garantirá que um valor válido seja enviado à Meta por meio da API de Conversões.

### Definir o ClickID formatado no cookie `_fbc` na resposta HTTP

É recomendado definir `_fbc` como:

-   [cookie HTTP](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FCookies&h=AT0bOSFtZ4Iy6VHTS2MSDvTFYtJxKGT9vc92q0EWezHADeTsEu_i6JCKrK-Z-3gzyuqpfsudUDlbZkIQyt5TXd4g_P3Dn9lSSAXA5jUYdQ1buTzHWTgPH5Mvkf4GQZyjursTOj26UMcH7lwPTX_L8Og60WDopJ9Zu47vBc6HGFM) nos cabeçalhos da resposta HTTP
    
-   com o prazo de validade de 90 dias
    

quando for recuperado a partir do parâmetro de consulta de URL `fbclid` ou do cookie do navegador `_fbc`.

Defina o cookie somente se:

-   o cookie\_fbc não existir e o ClickID tiver sido recuperado a partir do parâmetro de consulta de URL `fbclid`;
    
-   `fbclid` no parâmetro de consulta de URL não for igual ao valor correspondente no valor do cookie `_fbc`. No cookie, `fbclid` corresponde à string após o último "." no valor do cookie.
    

Exemplo:

```
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie:
_fbc=fb.1.1709136167115.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk; Expires=Thu, 21 Oct 2021 07:28:00 GMT;
```

### Armazenar o ClickID formatado no servidor

Como alternativa à opção de cookie acima, você pode armazenar e gerenciar o valor do ClickID formatado no seu armazenamento de back-end. Nesse caso, você precisará armazenar e enviar o valor mais recente obtido do parâmetro de consulta de URL, se ele estiver presente.

[](#)

## 4\. Enviar o parâmetro `fbc` com eventos da API de Conversões

Depois que o valor do ClickID for obtido, será preciso aplicar a formatação correta antes de enviá-lo com um evento via API de Conversões (veja instruções abaixo). Recomendamos enviar o parâmetro `fbc` com cada evento que você encaminha à API de Conversões.

**Nome do parâmetro**: `fbc`

**Valor do parâmetro**: precisa estar no formato `version.subdomainIndex.creationTime.fbclid`, em que:

-   "version" é sempre este prefixo: `fb`.
    
-   "subdomainIndex" indica em qual domínio o cookie está definido ("com" = 0, "example.com" = 1, "www.example.com" = 2). Se estiver gerando este campo em um servidor sem salvar um cookie `_fbc`, use o valor 1.
    
-   "creationTime" é a hora, em milésimos de segundo, desde o início da era Unix quando o cookie `_fbc` foi salvo. Caso você não salve o cookie `_fbc`, use o registro de data e hora de quando observou ou recebeu esse valor `fbclid` pela primeira vez.
    
-   `fbclid` é o valor para o parâmetro de consulta `fbclid` no URL da página.
    

Exemplo de valor:

```
fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk
```

Exemplo de carga da API de Conversões:

```
{
    "data": [
        {
            "event_name": "Purchase",
            "event_time": 1712248396,
            "action_source": "website",
            "user_data": {

                "fbc": "fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk",

                "em": ["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"],
                "ph": ["6069d14bf122fdfd931dc7beb58e5dfbba395b1faf05bdcd42d12358d63d8599"],
            },
            "custom_data": {
                "currency": "USD",
                "value": "142.52"
            }
        }
    ]
}
```

[](#)

## Auxiliares de integração

### Auxiliar de carga

O [Auxiliar de carga](/docs/marketing-api/conversions-api/payload-helper) é uma ferramenta que permite criar a carga útil da solicitação da API de Conversões para garantir o formato correto dos dados enviados à Meta. Ele também oferece o SDK de Negócios em várias linguagens de programação que você pode usar para integração com a API de Conversões. Para acessar essas funcionalidades, clique no botão "Obter código" na seção "Gerar código".

[](#)

## `fbp`

Quando o Pixel da Meta é instalado em um site e usa cookies internos, ele salva automaticamente um identificador único em um cookie `_fbp` para o domínio do site, caso ainda não exista um.

O valor do parâmetro de evento `fbp` deve estar no formato version.subdomainIndex.creationTime.randomnumber, em que:

-   `version` é sempre este prefixo: `fb`.
    
-   `subdomainIndex` indica em qual domínio o cookie está definido ('com' = 0, 'example.com' = 1, 'www.example.com' = 2). Se estiver gerando este campo em um servidor sem salvar um cookie `_fbp`, use o valor 1.
    
-   `creationTime`: a hora, em **milésimos de segundo**, desde o início da era UNIX quando o cookie `_fbp` foi salvo. Caso você não salve o cookie `_fbp`, use o registro de data e hora de quando observou ou recebeu esse valor "fbp" pela primeira vez.
    
-   `Randomnumber` é gerado pelo SDK do Pixel da Meta para garantir que cada cookie `_fbp` seja único.
    

_**Observação:** se você usar a biblioteca do configurador de parâmetro para formar o fbc, o formato terá um apêndice no final. Para mais informações, consulte a página da [biblioteca do configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library/)._

Veja um exemplo de como o valor `fbp` pode parecer:

```
fb.1.1596403881668.1116446470
```

[](#)

## Saiba mais

-   Acesse o guia de suporte do [Pixel](/docs/facebook-pixel/support) para solucionar problemas que envolvam parâmetros de consulta ausentes ou redirecionamentos que não funcionam corretamente.
    

[](#)