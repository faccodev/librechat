---
title: "Anúncios em vários idiomas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/multi-language-ads"
scraped_at: "2026-02-01T14:22:01.935Z"
---

# Anúncios em vários idiomas

Personalize diferentes partes do criativo do anúncio, como a imagem, o vídeo, o texto e o corpo de um anúncio, para interagir com os falantes de idiomas diferentes. O Facebook otimiza seu anúncio para mostrar a versão correta do idioma às pessoas certas.

Isso ajuda você a configurar facilmente um anúncio em vários idiomas e veicular a versão de idioma mais relevante do seu anúncio para um usuário ao mesmo tempo que mantém um direcionamento amplo do anúncio. Isso permite que você tenha um conteúdo personalizado com base no idioma do usuário e, ao mesmo tempo, mantenha anúncios com melhor custo-benefício.

Para obter informações gerais sobre esse recurso, consulte [Central de Ajuda para Anúncios, Anuncie para um público multilíngue](https://www.facebook.com/help/1852644738394400?locale=en_US). Consulte os [objetivos de campanha de anúncios](/docs/marketing-api/asset-customization-rules#campaign) com suporte.

A opção de anúncios em vários idiomas é uma das nossas três APIs que usam [regras de personalização de ativos](/docs/marketing-api/asset-customization-rules).

## Começar

Antes de começar, confira as [restrições](#limits) para esse produto. Se o seu caso de uso atender às nossas especificações, prossiga para as seguintes etapas:

-   Etapa 1: [Criar uma campanha de anúncios e um conjunto de anúncios](/docs/marketing-api/asset-customization-rules#campaign)
    
-   Etapa 2: [Fornecer o criativo por meio de `asset_feed_spec`](#asset) — consulte também os [Idiomas disponíveis](#lang).
    
-   Etapa 3: [Criar um anúncio com `asset_feed_spec` em `creative_spec`](#ad_asset)
    
-   Etapa 4 (opcional): [Ver prévia do seu anúncio](#preview)
    

Se você não tiver recursos para traduzir seu anúncio manualmente, confira nosso [serviço de tradução automática](#auto).

[](#)

## Etapa 2: Fornecer o criativo por meio de `asset_feed_spec`

Criativos de anúncios em vários idiomas são especificados usando `asset_feed_spec`s. Um feed de ativos é uma coleção de diferentes elementos de criativo, como imagens, títulos, corpos e assim por diante. Crie um `asset_feed_spec` em [`/adcreative`](/docs/marketing-api/reference/ad-creative).

Para criar um `asset_feed_spec`, forneça uma matriz de ativos para cada idioma. Adicione um rótulo para marcar cada ativo para identificar o idioma a que cada um pertence. O Facebook usa os rótulos em `asset_customization_rules` para agrupar ativos por idioma. Forneça **pelo menos um ativo por tipo**.

### Parâmetros disponíveis

Os parâmetros a serem fornecidos no `asset_feed_spec` incluem:

Nome da propriedade

Descrição

`images`

tipo: matriz

**Obrigatório para o formato de anúncio `SINGLE_IMAGE`. Forneça `url` ou `hash`.**

Imagens como `url` ou `hash`. Forneça imagens que estejam na [biblioteca de imagens da conta de anúncios](/docs/marketing-api/reference/ad-image).

  

Forneça esse campo como uma matriz de `{"url": "<IMAGE_URL>", "hash": "<IMAGE_HASH>", "url_tags": "<TAG>", "adlabels": [{name: "<LABEL>"}]}`.

`videos`

tipo: matriz

**Obrigatório para o formato de anúncio `SINGLE_VIDEO`.**

Matriz de `video_ids`. Os vídeos devem estar na [biblioteca de vídeos da conta de anúncios](/docs/marketing-api/advideo).

  

Forneça esse campo como uma matriz de `{"video_id": "<VIDEO_ID>","thumbnail_url": "{<THUMBNAIL_URL>}", "url_tags": "{<TAG>}", "adlabels": [{"name": "<LABEL>"}]}`.

`bodies`

tipo: matriz

**Obrigatório, mas `url_tags` são opcionais.**

Matriz de corpos contendo a mensagem principal do anúncio.

  

Forneça esse campo como uma matriz de `{"text": "<BODY_TEXT>", "url_tags": "<TAG>", "adlabels": [{"name": "<LABEL>"}]}`.

`titles`

tipo: matriz

**Obrigatório, mas `url_tags` são opcionais.**

Matriz de títulos. Um breve cabeçalho no anúncio, geralmente exibido ao lado de um link, uma imagem ou um vídeo.

  

Forneça esse campo como uma matriz de `{"text": "<TITLE>", "url_tags": "<TAG>", "adlabels": [{"name": "<LABEL>"}]}`.

`descriptions`

tipo: matriz

**Obrigatório, mas `url_tags` são opcionais.**

Matriz de texto descritivo secundário, exibido com menos destaque do que os corpos ou os títulos.

  

Forneça esse campo como uma matriz de `{"text": "<DESCRIPTION>", "url_tags": "<TAG>", "adlabels": [{"name": "<LABEL>"}]}`. Use uma string vazia com espaço único para a descrição em branco.

`link_urls`

tipo: matriz

**Obrigatório, mas `display_url` e `deeplink_url` são opcionais.**

Matriz de URLs de links.

  

Forneça esse campo como uma matriz de `{"website_url": "<URL>", "adlabels": [{"name": "<LABEL>"}], "deeplink_url": "<DEEPLINK>", "display_url": "<URL>"}`.

`call_to_action_types`

tipo: matriz

**Obrigatório.**

Matriz de valores call-to-action-type.

  

Forneça esse campo como uma matriz de chamadas para ação aceitas: `["<CALL_TO_ACTION>"]`.

`ad_formats`

**Obrigatório.**

Matriz de formatos de anúncio do Facebook nos quais você quer criar os anúncios. Os formatos aceitos são: `SINGLE_IMAGE`, `SINGLE_VIDEO`.

  

Forneça esse campo como uma matriz de formatos de anúncio aceitos: `["{<AD_FORMAT>}"]`.

`asset_customization_rules`

Tipo: veja a tabela abaixo em [Regras de personalização de ativo](#custom)

**Obrigatório.**

Matriz de regras de personalização de ativo.

### Regras de personalização de ativo

Defina os ativos que aparecem juntos para os visualizadores que falam um determinado idioma. Cada regra tem um `customization_spec`, que define as localidades das pessoas que visualizarem esses ativos durante a veiculação de anúncio.

Forneça exatamente uma _regra padrão_. Essa regra deve incluir os ativos que o Facebook exibe se o idioma preferencial de um usuário não corresponder a nenhuma localidade especificada no feed de ativos. Isso ajuda a evitar a veiculação insuficiente dos seus anúncios.

Nome da propriedade

Descrição

`customization_spec`

Tipo: `{"locales": [<LOCALE1>, <LOCALE2>]}`

**Obrigatório.**

Defina as localidades onde os ativos desta regra devem ser veiculados. Para obter as localidades aceitas, consulte [Idiomas disponíveis](#available).

`image_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório para o formato de anúncio `SINGLE_IMAGE`.**

O rótulo anexado a um dos ativos de imagem no feed de ativos.

`video_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório para o formato de anúncio `SINGLE_VIDEO`.**

O rótulo anexado a um dos ativos de vídeo no feed de ativos.

`body_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório.**

O rótulo anexado a um dos ativos de corpo no feed de ativos.

`title_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório.**

O rótulo anexado a um dos ativos de título no feed de ativos.

`description_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório.**

O rótulo anexado a um dos ativos de descrição no feed de ativos.

`link_url_label`

tipo: `{"name": "<LABEL>"}`

**Obrigatório.**

O rótulo anexado a um dos ativos `link_url` no feed de ativos.

`is_default`

tipo: booliano

**Obrigatório.**

Sinalizador booliano para identificar a regra padrão. Defina exatamente uma regra com a sinalização `is_default` como `true`.

### Idiomas disponíveis

As localidades fornecidas em `customization_spec` devem ser IDs de localização com suporte no direcionamento de anúncios. Consulte [Direcionamento e posicionamento, Localidades](/docs/marketing-api/targeting-specs#additional). Você pode pesquisar um idioma específico usando o ponto de extremidade `/search`. Use o parâmetro `q` para pesquisar o nome de um idioma específico. Deixe esse parâmetro em branco para obter a lista de todos os idiomas compatíveis:

```
v24.0
```

Em caso de sucesso, você terá uma lista de idiomas:

```
{
  "data": [
    {
      "key": 6,
      "name": "English (US)"
    },
    {
      "key": 24,
      "name": "English (UK)"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MAZDZD",
    }
  }
}
```

Você deve usar as chaves nos resultados dessa pesquisa como localidades nas regras de personalização de ativos. Para obter mais informações, consulte [Pesquisa de direcionamento](/docs/marketing-api/targeting-search).

[](#)

## Etapa 3: Criar anúncios usando especificações de feed de ativo

Você pode criar um feed de ativos usando o campo `asset_feed_spec` em `POST ad_account_ID/adcreatives`:

```
v24.0
```

Em caso de sucesso, você recebe o ID do criativo do anúncio:

```
{"id":"238474593777777"}
```

Se o seu `asset_feed_spec` atender às [restrições](#limits) abaixo, você receberá um erro.

Para criar um anúncio com esse ID de criativo do anúncio, chame `POST act_AD_ACCOUNT_ID/ads`. Como alternativa, para exibir idiomas diferentes no seu anúncio, forneça `asset_feed_spec` e `object_story_spec` no parâmetro `creative` do anúncio.

Para verificar o novo `asset_feed_spec`, chame `GET` no ID do anúncio ou no ID do criativo do anúncio:

```
v24.0
```

[](#)

## Etapa 4 (opcional): Ver prévia do seu anúncio

Veja uma prévia das diferentes versões de idiomas do anúncio usando o ponto de extremidade [`generatepreview`](/docs/marketing-api/generatepreview/). Adicione um campo `dynamic_asset_label` com um `adlabel` em uma regra para visualizar uma versão de idioma específico.

Por exemplo, para ver uma prévia da versão em francês do criativo acima:

```
v24.0
```

[](#)

## Traduções automáticas

Você pode usar nosso serviço de tradução automática se não tiver os recursos para traduzir manualmente seu anúncio. Esse recurso traduz sua cópia do anúncio padrão para idiomas adicionais para que você possa alcançar um público multilíngue.

A origem para a tradução automática pode ser encontrada nos ativos de texto especificados pela regra de personalização de ativo padrão. Cópias de anúncios traduzidas automaticamente são rotuladas como "Traduzida automaticamente".

Para criar uma versão traduzida automaticamente da sua cópia do anúncio, adicione `autotranslate` a `asset_feed_spec`. Em seguida, especifique os idiomas para os quais deseja que sua cópia seja traduzida. Veja o exemplo:

```
v24.0
```

É possível revisar os textos traduzidos automaticamente com uma chamada do campo `asset_feed_spec` no criativo.

**Quaisquer edições nas cópias traduzidas automaticamente nas especificações serão descartadas se o mesmo idioma for especificado no campo `autotranslate`. Essas edições serão substituídas por novas traduções da cópia do anúncio padrão. Se você realmente precisar das edições, remova o idioma do campo `autotranslate`.**

#### `link_urls`

Você pode adicionar um URL de link personalizado à versão do anúncio traduzida automaticamente.

**Para fazer isso, adicione um URL `language-specific` ao campo `link_urls` juntamente com um `adlabel` e adicione uma nova regra em `asset_customization_rules` com os códigos de localidade associados e o `link_url_label` para o idioma em questão.**

[](#)

## Restrições

Veja a seguir as restrições e os limites no feed de ativos.

### Formatos de anúncios

-   Somente um formato do anúncio por `asset_feed_spec`
    
-   Para o formato `SINGLE_IMAGE`, você deve fornecer pelo menos uma imagem.
    
-   Para o formato `SINGLE_VIDEO`, você deve fornecer pelo menos um vídeo
    

### Ativos, geral

-   Você pode fornecer no máximo 49 ativos para cada tipo, exceto `call_to_action_types`.
    
-   Você deve fornecer exatamente um ativo `call_to_action_type` para todos os objetivos.
    

### Ativos de texto

-   Você deve fornecer pelo menos um ativo de texto, como `title`s, corpos, `description`s e `link_urls` para cada idioma no feed de ativos.
    
-   Todos os ativos de texto devem ter o campo `adlabels`.
    
-   Tamanho máximo: 255 caracteres para o título, 4.096 caracteres para o corpo e 10.000 caracteres para a descrição.
    

### Ativos de imagem e vídeo

-   Para obter os tamanhos de imagem recomendados por posicionamento e objetivo, consulte o [Guia de anúncios](https://www.facebook.com/business/ads-guide/image/facebook-feed/traffic).
    
-   Você pode usar até um ativo de imagem ou vídeo sem um `adlabel`. Usamos essa imagem ou esse vídeo para todas as versões do idioma.
    
-   Se você fornecer vídeos ou imagens adicionais, deverá incluir `adlabel`s e fornecer esses rótulos na sua regra de personalização de ativos.
    

### Ativos de URL de link

-   Se você fornecer `url_tags`, nós os anexaremos ao `link_url` como parâmetros para cada ativo no anúncio.
    
-   Se você usar o objetivo `APP_INSTALLS`, seu `link_url` deve ser o mesmo que o `promoted_object.object_store_url` do conjunto de anúncios.
    

### Regras de personalização de ativo

-   Você deve fornecer uma regra de personalização de ativos para cada variante de idioma em `asset_feed_spec`.
    
-   Forneça também uma **regra padrão**. Ela é uma regra de personalização de ativo com `is_default` definido como `true`. Ela funciona como uma regra alternativa e permite que os anúncios sejam exibidos mesmo quando a localidade de alguém não corresponde a nenhum dos idiomas em `asset_feed_spec`.
    

### [Posicionamentos](/docs/marketing-api/reference/ad-campaign-group#placement)

-   Anúncios em vários idiomas permitem todos os posicionamentos.
    

### [Objetivos](/docs/marketing-api/reference/ad-campaign-group#placement) e tipos de destinos disponíveis

-   `LINK_CLICKS` - Sites e apps, sem Messenger.
    
-   `APP_INSTALLS` - Apps para desktop e celular.
    
-   `CONVERSIONS` - Sites e apps, sem Messenger.
    
-   `REACH` - Todos os tipos de destino.
    
-   `BRAND_AWARENESS` - Todos os tipos de destino.
    
-   `VIDEO_VIEWS` - Todos os tipos de destino.
    

### Tipos de compras aceitos

-   `REACH` - [Alcance e frequência](/docs/marketing-api/reachandfrequency)
    
-   [`AUCTION`](/docs/marketing-api/cost-per-action-ads)
    

### Direções de tradução aceitas

As direções de tradução a seguir são aceitas. Use o código de dialeto correspondente no campo `autotranslate`:

Idioma de origem

Idioma de destino da tradução

Código do dialeto

Inglês

Espanhol

`es_XX`

Inglês

Francês

`fr_XX`

Inglês

Alemão

`de_DE`

Inglês

Português

`pt_XX`

Inglês

Italiano

`it_IT`

Inglês

Árabe

`ar_AR`

Inglês

Holandês

`nl_XX`

Inglês

Malaio

`ms_MY`

Inglês

Sueco

`sv_SE`

Inglês

Indonésio

`id_ID`

Inglês

Polonês

`pl_PL`

Inglês

Hindi

`hi_IN`

Inglês

Dinamarquês

`da_DK`

Inglês

Turco

`tr_TR`

Inglês

Tagalo

`tl_XX`

Inglês

Romeno

`ro_RO`

Alemão

Inglês

`en_XX`

Árabe

Inglês

`en_XX`

Hebraico

Inglês

`en_XX`

Espanhol

Inglês

`en_XX`

Japonês

Inglês

`en_XX`

Norueguês

Inglês

`en_XX`

Francês

Inglês

`en_XX`

Holandês

Inglês

`en_XX`

Sueco

Inglês

`en_XX`

[](#)