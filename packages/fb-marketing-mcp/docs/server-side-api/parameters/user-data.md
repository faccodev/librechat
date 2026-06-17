---
title: "Parâmetros de informações do cliente - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/server-side-api/parameters/user-data"
scraped_at: "2026-02-01T15:46:20.809Z"
---

# Parâmetros de informações do cliente

Os parâmetros de informações do cliente são um conjunto de identificadores de usuário compartilhados junto com as informações do seu evento. Para saber mais sobre os parâmetros obrigatórios e recomendados, consulte [Boas práticas da API de Conversões: Enviar parâmetros obrigatórios e recomendados](/docs/marketing-api/conversions-api/best-practices/#req-rec-params).

A versão v13.0 da Graph API apresenta novas exigências sobre as combinações de parâmetros de informações de clientes que são consideradas válidas. Analise as [boas práticas](/docs/marketing-api/conversions-api/best-practices#baseline-requirements-for-matching) para garantir que as integrações da API de Conversões não sejam interrompidas.

Consulte a [Central de Transparência](https://www.facebook.com/business/m/privacy-and-data?Data-Use-&-Ads) para saber quais dados são enviados ao usar a API de Conversões.

Nossos sistemas são elaborados para aceitar somente informações de contato do cliente convertidas em hash, com exceção dos casos abaixo. As informações de contato são as informações de identificação pessoal (como nome, endereço de email e número de telefone) que usamos apenas para fins de correspondência. Se você estiver usando o [SDK de Negócios da Meta](/docs/business-sdk), a conversão em hash será feita automaticamente.

## Comparação do Pixel

Envie diversos parâmetros de informações do cliente pelo Pixel da Meta, ainda que alguns deles (por exemplo, `client_user_agent`) sejam enviados automaticamente dentro do funcionamento usual da internet. Por exemplo, para enviar `external_id` pelo Pixel, use este código:

```
fbq('init', 'PIXEL_ID', {'external_id': 12345});
```

Veja mais sobre outros parâmetros que podem ser passados pelo Pixel na [documentação sobre correspondência avançada](/docs/facebook-pixel/advanced/advanced-matching/).

Contudo, verifique se você aplicou o mesmo conjunto de parâmetros de informações do cliente que o sistema está compartilhando do navegador para o servidor.

[](#)

## Formatar os parâmetros `user_data`

É necessário fornecer pelo menos um dos seguintes parâmetros `user_data` com a formatação correta na solicitação.

_**Observação:** se você estiver usando a [biblioteca de configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library/), o formato terá um apêndice adicional no final de cada parâmetro. Para saber mais, consulte a página da biblioteca do configurador de parâmetro._

[Baixe este arquivo CSV](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=WNaPGUAGUVl6ujUlf3fYGg&oh=00_AftJKTMH7OkeroOa0BVscPtnEVl9BF7tvP1a-oIPKsvchQ&oe=69855B24)

para ver exemplos de dados com hash adequadamente normalizados e convertidos para os parâmetros abaixo.

  
  
[Baixar (clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=WNaPGUAGUVl6ujUlf3fYGg&oh=00_AftJKTMH7OkeroOa0BVscPtnEVl9BF7tvP1a-oIPKsvchQ&oe=69855B24)

Parâmetro

Descrição

[`em`](#)

Email

string ou lista<string>

**Hashing obrigatório**.  
Remova os espaços em branco. Converta todos os caracteres para letras minúsculas.

**Exemplo:**

_Entrada_: John\_Smith@gmail.com  
_Formato padronizado_: john\_smith@gmail.com  
_Saída SHA256 esperada_: 62a14e44f765419d10fea99367361a727c12365e2520f32218d505ed9aa0f62f

[`ph`](#)

Número de telefone

string ou lista<string>

**Hashing obrigatório**.  
Remova símbolos, letras e zeros à esquerda. Os números de telefone precisam incluir o código do país para serem usados na correspondência (por exemplo, o número 1 precede um número de telefone dos Estados Unidos). Sempre inclua o código do país nos números de telefone dos clientes, ainda que todos os dados sejam do mesmo país.

**Exemplo:**

_Entrada:_ número de telefone dos EUA (650)555-1212  
_Formato padronizado:_ 16505551212  
_Saída SHA256 esperada:_

e323ec626319ca94ee8bff2e4c87cf613be6ea19919ed1364124e16807ab3176

[`fn`](#)

Nome

string ou lista<string>

**Hashing obrigatório.**  
Recomendamos o uso de caracteres de A a Z do alfabeto romano. Apenas minúsculas, sem pontuação. Caso sejam usados caracteres especiais, será necessário codificar o texto no formato UTF-8.

**Exemplo**:  
_Entrada_: Mary  
_Formato padronizado_: mary  
_Saída SHA256 esperada_: 6915771be1c5aa0c886870b6951b03d7eafc121fea0e80a5ea83beb7c449f4ec

  

_Entrada_: 정  
_Formato padronizado_: caractere UTF-8 "정"  
_Saída SHA256 esperada_: 8fa8cd9c440be61d0151429310034083132b35975c4bea67fdd74158eb51db14

  

_Entrada_: Valéry  
_Formato padronizado_: valéry  
_Saída SHA256 esperada_: 08e1996b5dd49e62a4b4c010d44e4345592a863bb9f8e3976219bac29417149c

[`ln`](#)

Sobrenome

string ou lista<string>

**Hashing obrigatório.**  
Recomendamos o uso de caracteres de A a Z do alfabeto romano. Apenas minúsculas, sem pontuação. Caso sejam usados caracteres especiais, será necessário codificar o texto no formato UTF-8.

  

Consulte Nome (`fn`) para ver exemplos.

[`db`](#)

Data de nascimento

string ou lista<string>

**Hashing obrigatório**.  
Aceitamos o formato de datas AAAAMMDD que acomoda diversas combinações de mês, dia e ano, com ou sem pontuação.

-   **Ano**: use o formato AAAA de 1900 até o ano atual.
    
-   **Mês**: use o formato MM de 01 a 12.
    
-   **Data**: use o formato DD de 01 a 31.
    

**Exemplo:**

_Entrada_: 2/16/1997  
_Formato padronizado_: 19970216  
_Saída SHA256 esperada_: 01acdbf6ec7b4f478a225f1a246e5d6767eeab1a7ffa17f025265b5b94f40f0c

[`ge`](#)

Gênero

string ou lista<string>

**Hashing obrigatório**.  
Aceitamos o gênero no formato de uma inicial em letras minúsculas.

**Exemplo:**

-   f para feminino
    
-   m para masculino
    

[`ct`](#)

Cidade

string ou lista<string>

**Hashing obrigatório.**  
Recomendamos o uso de caracteres de A a Z do alfabeto romano. Apenas minúsculas sem pontuação, caracteres especiais nem espaços. Caso sejam usados caracteres especiais, será necessário codificar o texto no formato UTF-8.

**Exemplo**:  
paris  
london  
newyork

[`st`](#)

Estado

string ou lista<string>

**Hashing obrigatório.**  
Use o [código de abreviação de ANSI de dois caracteres](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFederal_Information_Processing_Standard_state_code&h=AT0l56eV99MeO47fVyEp2chCLwTniwflgDby8GC_i2dqXISQRiniR6uPpC3MHqkMC3D2upU54jlXclPni4qEjFKuu_RKvGXyMPHw-mg0fB8hxMBGbu0Udm-r7xqVsEkcXzWAgPsRI0ckTlKXk4h1r_jiXZenhsbn52I9qCuxRmJny2E69QksiOIO) com letras minúsculas. Padronize os estados não pertencentes aos EUA em letras minúsculas. Não inclua pontuação, caracteres especiais nem espaços.

**Exemplo**:  
az  
ca

[`zp`](#)

Código postal

string ou lista<string>

**Hashing obrigatório**.  
Use letras minúsculas sem espaços ou traços. Use apenas os 5 primeiros dígitos dos códigos postais dos EUA. Use o formato de área, distrito e setor para o Reino Unido.

**Exemplo**:  
Código postal dos EUA: 94035  
Código postal da Austrália 1987  
Código postal da França: 75018  
Código postal do Reino Unido: m11ae

[`country`](#)

País

string ou lista<string>

**Hashing obrigatório.**  
Use os códigos de país com duas letras minúsculas no padrão [ISO 3166-1 alfa-2](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_3166-1_alpha-2&h=AT3-abkPbma9_nz7f8yQ1oUAu7gaVeDICLrdoHaqryzRj9e3UI5QpOyF2R-m0JPwFAnDpO_mPM7yj_2E0C69c0d5ge4FolVac2QBg52PXeB9TXwo5nk_uPOxiPiZcrlk91V3MF-1n14ipEXwp5cqpMq6TXlzGxOZaOn0g3vMVQ8).  
**Observação importante:** inclua sempre os países dos clientes, ainda que todos os códigos pertençam ao mesmo país. Como a correspondência acontece em grande escala, essa etapa simples nos ajuda a encontrar o maior número possível de contas da Central de Contas na sua lista.

**Exemplo**:  
_Entrada_: Estados Unidos  
_Formato padronizado_: us  
_Saída SHA256 esperada_: 79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621

[`external_id`](#)

Identificação externa

string ou lista<string>

**Hashing recomendado**.  
Qualquer identificação única do anunciante. Por exemplo, identificação de membros de programas de fidelidade, IDs dos usuários e IDs de cookies externos. É possível enviar uma ou mais identificações externas em um evento.  
Se uma identificação externa for enviada por outros canais, ela deverá seguir o mesmo formato usado no envio pela [API de Conversões](/docs/marketing-api/conversions-api/parameters/external-id).

[`client_ip_address`](#)

Endereço IP do cliente

string

**Não converter em hash**.  
O endereço IP do navegador correspondente ao evento deve ser um endereço IPV4 ou IPV6 válido. Use o IPV6 no lugar do IPV4 para usuários com essa versão habilitada. O parâmetro de dados do usuário `client_ip_address` não deve ser convertido em hash.  
Não inclua espaços. Sempre forneça o endereço IP correto para garantir relatórios de eventos precisos.  
**Observação**: essa informação é adicionada automaticamente aos eventos enviados pelo navegador. No entanto, ela deve ser configurada de modo manual em eventos enviados pelo servidor.

**Exemplo**:  
_IPV4_: 168.212.226.204  
_IPV6_: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

[`client_user_agent`](#)

Agente do usuário do cliente

string

**Não converter em hash**.  
O agente do usuário do navegador correspondente ao evento. O `client_user_agent` é obrigatório para eventos do site compartilhados por meio da [API de Conversões](/docs/marketing-api/conversions-api).

O uso dos parâmetros `client_ip_address` e `client_user_agent` em todos os eventos enviados pela API de Conversões pode aprimorar a correspondência do evento e a veiculação das campanhas de anúncios, potencializando esses eventos.  
**Observação**: essa informação é adicionada automaticamente aos eventos enviados pelo navegador. No entanto, ela deve ser configurada manualmente em eventos enviados pelo servidor.

**Exemplo**:  
Mozilla/5.0 (Windows NT 10.0; Win64; x64)  
AppleWebKit/537.36 (KHTML, como Gecko)  
Chrome/87.0.4280.141  
Safari/537.36

[`fbc`](#)

Identificação do clique

string

**Não converter em hash**.  
O valor da identificação do clique no Facebook está armazenado no cookie do navegador `_fbc` no seu domínio. Consulte o [guia sobre como gerenciar os parâmetros `fbc` e `fbp`](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) para saber como obter ou gerar esse valor a partir de um parâmetro de consulta `fbclid`.

O formato é: fb.${subdomain\_index}.${creation\_time}.${fbclid}.

_**Observação:** se você estiver usando a [biblioteca de configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library/), o formato terá um apêndice adicional no final de cada parâmetro. Para saber mais, consulte a página da biblioteca do configurador de parâmetro._

**Exemplo:**  
`fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`

[`fbp`](#)

Identificação do navegador

string

**Não converter em hash**.  
O valor da identificação do navegador na Meta está armazenado no cookie do navegador `_fbp` no seu domínio. Consulte o [guia sobre como gerenciar os parâmetros `fbc` e `fbp`](/docs/marketing-api/conversions-api/parameters/fbp-and-fbc) para saber como consultar esse valor.

O formato é `fb.${subdomain_index}.${creation_time}.${random_number}`.

_**Observação:** se você estiver usando a [biblioteca de configurador de parâmetro](/docs/marketing-api/conversions-api/parameter-builder-feature-library/), o formato terá um apêndice adicional no final de cada parâmetro. Para saber mais, consulte a página da biblioteca do configurador de parâmetro._

**Exemplo:**  
fb.1.1596403881668.1116446470

[`subscription_id`](#)

Identificação da assinatura

string

**Não converter em hash**.  
A identificação da assinatura do usuário da transação. É semelhante à identificação do pedido de um produto individual.

[`fb_login_id`](#)

Identificação do Login do Facebook

número inteiro

**Não converter em hash**.  
A identificação emitida pela Meta quando a pessoa faz o primeiro login em uma instância de um app. Esse parâmetro também é conhecido como ID no escopo do app.

[`lead_id`](#)

Identificação do lead

número inteiro

**Não converter em hash**.  
A identificação associada a um lead gerado pelos [anúncios de lead da Meta](/docs/marketing-api/guides/lead-ads).

[`anon_id`](#)

string

**Não converter em hash.**  
Seu ID de instalação. Esse campo representa instâncias únicas de instalação de apps.

  

_**Observação:** esse parâmetro é exclusivo para eventos do app_.

[`madid`](#)

string

A identificação do anunciante da plataforma móvel, o ID de publicidade de um dispositivo Android ou o Identificador de Anunciante (IDFA, pelas iniciais em inglês) de um dispositivo Apple.

[`page_id`](#)

string

**Não converter em hash.**  
A identificação da Página. Especifica a identificação da Página associada ao evento. Use a identificação da Página do Facebook associada ao bot.

[`page_scoped_user_id`](#)

string

**Não converter em hash.**  
Especifica o ID do usuário no escopo da Página associado ao bot do Messenger que registra o evento. Use o ID do usuário no escopo da página fornecido ao seu webhook.

[`ctwa_clid`](#)

string

**Não converter em hash.**  
ID do clique gerado pela Meta para anúncios de clique para o WhatsApp.

[`ig_account_id`](#)

string

**Não converter em hash.**  
[Número de identificação da conta do Instagram](/docs/instagram-api/reference/ig-user/) associada à empresa.

[`ig_sid`](#)

string

**Não converter em hash.**  
Cada usuário que interage com o Instagram é identificado por um ID do usuário no escopo do Instagram (IGSID, pelas iniciais em inglês). O IGSID pode ser recuperado a partir deste [webhook](/docs/messenger-platform/instagram/features/webhook).

[](#)

## Veja também

-   [Parâmetros-padrão](/docs/marketing-api/server-side-api/parameters/custom-data)
    
-   [Central de Transparência](https://www.facebook.com/business/m/privacy-and-data?Data-Use-&-Ads)
    

[](#)