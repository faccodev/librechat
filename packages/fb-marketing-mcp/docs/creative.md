---
title: "Criativo do anúncio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative"
scraped_at: "2026-02-01T13:47:39.108Z"
---

# Criativo do anúncio

Use os anúncios do Facebook com seus clientes existentes e também para alcançar novos clientes. Cada guia descreve produtos de anúncios do Facebook para ajudar a atingir suas metas de publicidade. Há vários tipos de unidades de anúncio com diversas opções de aparência, posicionamento e criativo. Confira as diretrizes sobre unidades de anúncio como conteúdo do criativo no [Guia de anúncios do Facebook](https://www.facebook.com/business/ads-guide/?tab0=Mobile%20News%20Feed).

## Criativo

Um criativo do anúncio é um objeto que contém todos os dados necessários para renderizar visualmente o próprio anúncio. A API inclui diferentes tipos de anúncios que podem ser criados no Facebook. Eles estão listados [aqui](/docs/reference/ads-api/adcreative#overview).

Caso você tenha uma [campanha](/docs/marketing-api/reference/ad-campaign-group) com o objetivo de engajamento com o post da Página, agora será possível criar um anúncio que promove um post feito pela Página. Consideramos isso um anúncio de post da Página. Os anúncios de post da Página exigem um campo `object_story_id`, que é a propriedade `id` de um post desse tipo. Saiba mais na [referência Criativo do anúncio](/docs/reference/ads-api/adcreative#create).

Um criativo do anúncio tem três partes:

-   O criativo do anúncio em si, definido pelos atributos visuais do objeto correspondente
    
-   O [posicionamento](#placements) no qual o anúncio é veiculado
    
-   A [prévia](#previews) da unidade conforme o posicionamento
    

Para criar o objeto do criativo do anúncio, faça a seguinte chamada:

```
v24.0
```

A resposta à chamada de API é o `id` do objeto do criativo. Guarde isso, você precisará dele para o objeto do anúncio:

```
v24.0
```

### Limites

Existem limites sobre texto, tamanho da imagem, taxa de proporção da imagem e outros aspectos do criativo. Consulte o [Guia de anúncios](https://www.facebook.com/business/ads-guide).

### Ler

Na API de Anúncios, é necessário solicitar de forma explícita todos os campos que você quer recuperar, exceto `id`. A [referência](/docs/reference/ads-api/adcreative/#read) de cada objeto tem uma seção sobre a leitura e informa quais campos são legíveis. Para o criativo, são os mesmos campos especificados durante a criação do objeto, além de `id`.

```
v24.0
```

[](#)

## Posicionamentos

Um posicionamento é o local onde o anúncio aparece no Facebook, como o Feed no desktop, Feed em dispositivos móveis ou a coluna da direita. Consulte o [Guia de anúncios do Facebook](https://www.facebook.com/business/ads-guide/).

Recomendamos que você execute anúncios em todos os posicionamentos disponíveis. O leilão de anúncios do Facebook foi desenvolvido para veicular impressões de anúncios no posicionamento que tem mais chances de gerar resultados de campanhas com o menor custo possível.

A maneira mais fácil de obter vantagens dessa otimização é deixar esse campo em branco. Você também pode selecionar posicionamentos específicos em uma target\_spec do conjunto de anúncios.

Este exemplo tem um anúncio de post da Página. Os posicionamentos disponíveis são Feed do celular, Feed do desktop e coluna da direita do Facebook. Na API, consulte as [opções de posicionamento](/docs/reference/ads-api/targeting-specs/#placement). Se você escolher `desktopfeed` e `rightcolumn` como `page_type`, o anúncio será veiculado nos posicionamentos da coluna da direita e do Feed do desktop. Qualquer anúncio criado abaixo deste conjunto de anúncios tem apenas o posicionamento em desktop.

```
v24.0
```

[](#)

## Ver prévia de um anúncio

Você pode fazer a prévia de um anúncio de duas formas: com a [API de Prévia do Anúncio](/docs/reference/ads-api/generatepreview/) ou com o [plugin de prévia do anúncio](/docs/reference/ads-api/ad-preview-plugin).

Há três formas de gerar uma prévia com a API:

1.  Pela identificação do anúncio
2.  Pela identificação do criativo do anúncio
3.  Informando as especificações do criativo

De acordo com os documentos de [referência](/docs/reference/ads-api/generatepreview/#html) da API de Prévia, a chamada mínima obrigatória será a seguinte:

```
v24.0
```

A especificação do criativo é uma matriz de cada campo e valor necessário para elaborar o criativo do anúncio.

No momento, nossa chamada de criativo do anúncio tem a seguinte aparência:

```
v24.0
```

Use `object_story_id` na chamada da API de Prévia:

```
v24.0
```

Os valores disponíveis para `ad_format` diferem um pouco de `page_types`. Mas, neste cenário, o Feed do desktop e a coluna da direita do Facebook são selecionados. Isso exige que você realize duas chamadas da API para gerar as prévias para cada posicionamento:

```
v24.0
```
```
v24.0
```

A resposta será um iFrame válido por 24 horas.

[](#)

## Ver mais

-   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
    
-   [Anúncios de app no Facebook](/docs/app-ads)
    
-   [Guia de anúncios](https://www.facebook.com/business/ads-guide)
    

[](#)