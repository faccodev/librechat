---
title: "Moedas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/currencies"
scraped_at: "2026-02-01T14:04:37.603Z"
---

# Códigos de moeda

A API de Marketing é compatível com as mesmas moedas aceitas nas [contas de anúncios](/docs/reference/ads-api/adaccount/):

Nome

Código

Compensação

Dinar argelino

DZD

100

Peso argentino

ARS

100

Dólar australiano

AUD

100

Dinar bareinita

BHD

100

Taka de Bangladesh

BDT

100

Boliviano da Bolívia

BOB

100

Lev búlgaro

BGN

100

Real brasileiro

BRL

100

Libra esterlina

GBP

100

Dólar canadense

CAD

100

Peso chileno

CLP

1

Yuan chinês

CNY

100

Peso colombiano

COP

1

Colón costa-riquenho

CRC

1

Kuna croata

HRK

100

Coroa tcheca

CZK

100

Coroa dinamarquesa

DKK

100

Libra egípcia

EGP

100

Euro

EUR

100

Quetzal da Guatemala

GTQ

100

Lempira de Honduras

HNL

100

Dólar de Hong Kong

HKD

100

Florim húngaro

HUF

1

Coroa islandesa

ISK

1

Rupia indiana

INR

100

Rupia indonésia

IDR

1

Novo shekel de Israel

ILS

100

Iene japonês

JPY

1

Dinar jordaniano

JOD

100

Xelim queniano

KES

100

Won sul-coreano

KRW

1

Lats letão

LVL

100

Litas lituano

LTL

100

Patacas de Macau

MOP

100

Ringgit malaio

MYR

100

Peso mexicano

MXN

100

Dólar neozelandês

NZD

100

Córdoba da Nicarágua

NIO

100

Naira da Nigéria

NGN

100

Coroa norueguesa

NOK

100

Rupia paquistanesa

PKR

100

Guarani paraguaio

PYG

1

Nuevo Sol peruano

PEN

100

Peso filipino

PHP

100

Zloty polonês

PLN

100

Rial do Qatar

QAR

100

Leu romeno

RON

100

Rublo russo

RUB

100

Rial da Arábia Saudita

SAR

100

Dinar sérvio

RSD

100

Dólar de Singapura

SGD

100

Coroa eslovaca

SKK

100

Rand da África do Sul

ZAR

100

Coroa sueca

SEK

100

Franco suíço

CHF

100

Dólar taiwanês

TWD

1

Baht tailandês

THB

100

Lira turca

TRY

100

Dirham dos Emirados Árabes Unidos

AED

100

Hryvnia ucraniano

UAH

100

Dólares americanos

USD

100

Peso uruguaio

UYU

100

Bolívar venezuelano

VEF

100

Dong vietnamita

VND

1

Créditos

FBZ

100

Bolívar soberano

VES

100

## Compensação

Cada moeda tem um valor de compensação que orienta as subdivisões do Facebook. O objetivo é garantir que o lance mínimo (por exemplo, "1") corresponda a um valor válido na moeda.

### Exemplo de compensação de 100

Com a compensação de 100, o lance mínimo permitido corresponderá a 1/100 da unidade-base da moeda. Por exemplo, se você fizer um lance de "1" com uma conta de anúncios em dólar americano, o valor do lance será de USD 0,01.

### Exemplo de compensação de 1

Com a compensação de 1, o lance mínimo permitido corresponderá à unidade-base da moeda. Por exemplo, se você fizer um lance de "1" com uma conta de anúncios em iene japonês, o valor do lance será de JPY 1,00.