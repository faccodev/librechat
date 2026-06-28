---
title: "Recursos de IA generativa - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/creative/generative-ai-features"
scraped_at: "2026-02-01T13:54:00.288Z"
---

# Comece a usar os recursos de IA generativa na API de Marketing

**Suporte da API para recursos de IA generativa**

Os anunciantes são responsáveis por pré-visualizar os conteúdos de criativos de anúncio gerados por IA antes de publicarem seus anúncios. Veja as instruções para configurar uma prévia.

A Meta não faz nenhuma garantia quanto a completude, confiabilidade e precisão das gerações de texto sugeridas nem quanto aos planos de fundo gerados ou às imagens expandidas. Se você usa a API de marketing para acessar nossos recursos de IA generativa descritos abaixo, os [Termos de IA generativa de criativo do anúncio](https://www.facebook.com/legal/terms/ad_creative_generative_ai_terms) se aplicam, além dos [Termos da Plataforma Meta](https://developers.facebook.com/terms/dfc_platform_terms/).

Este documento mostra como usar recursos de IA generativa para [geração de texto](#text-generation), [expansão de imagem](image-expansion) e [geração de plano de fundo](background-generation) para anúncios.

## Antes de começar

É necessário executar as etapas a seguir para configurar suas campanhas de anúncios com os recursos de IA generativa da Meta.

1.  [Criar uma campanha](https://developers.facebook.com/docs/marketing-apis/get-started/#campaign)
2.  [Criar um conjunto de anúncios](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-set-budget)
3.  [Criar o anúncio ou um criativo independente](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-creative)
4.  [Ver uma prévia do criativo](https://developers.facebook.com/docs/marketing-api/creative#previews)
5.  [Habilitar o anúncio](https://developers.facebook.com/docs/marketing-apis/get-started/#book-ad)

## Geração de texto

As variações de texto são geradas com IA inspirada no seu texto principal original, nos seus anúncios anteriores ou nos conteúdos da sua Página comercial, para ajudar a fazer sugestões mais relevantes. Adicionar mais opções de texto ao seu anúncio pode ajudar a personalizar seu criativo e a reduzir a fadiga do criativo, o que pode ajudar a aumentar o desempenho. [Saiba mais sobre esse recurso aqui](https://www.facebook.com/business/help/497610041230617).

### Etapa 1: opte por usar a geração de texto ao criar o anúncio

Você pode criar um anúncio através do ponto de extremidade `/ads` ou criar um criativo independente através do ponto de extremidade `/adcreatives`. Optar por usar o recurso aplica-se apenas ao anúncio ou criativo criado na solicitação atual. Em qualquer abordagem, opte por usar o recurso Geração de Texto da seguinte forma:

1.  Fornecendo um texto principal no campo `message` no `object_story_spec`
2.  Optando por usar `text_generation`

Veja exemplos de solicitações abaixo:

#### Aceite através do ponto de extremidade `/adcreatives`

```
v24.0
```

Ou você pode criar um objeto de anúncio com o ponto de extremidade `act_<AD_ACCOUNT_ID>/ads`:

#### Aceite através do ponto de extremidade `/ads`

```
v24.0
```

### Etapa 2: veja uma prévia para Geração de Texto

Quando um anúncio é criado com a opção de usar `text_generation`, o recurso será aplicado apenas ao anúncio atual, e os textos principais gerados serão inseridos na especificação do criativo. Se o recurso tiver sido aceito pelo ponto de extremidade `/ads`, o campo `status` no grupo de anúncios será definido como `PAUSED` por padrão ([consulte a documentação](https://developers.facebook.com/docs/marketing-api/reference/adgroup)). Você pode analisar as sugestões geradas antes, definindo manualmente o status do anúncio como `ACTIVE` para que ele possa ser entregue.

A especificação do criativo contendo sugestões geradas pode ser vista previamente, lendo a `asset_feed_spec` na identificação do criativo ou na identificação do anúncio. Veja o exemplo de solicitação e resposta abaixo:

Comece consultando `asset_feed_spec` do seu criativo do anúncio independente criado na etapa 1.

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "asset_feed_spec": {
    "bodies": [
      {
        "text": "Buy some cool LED TV at cheap price"
      },
      {
        "text": "Get your dream LED TV at an unbeatable price! Buy now and save big!"
      },
      {
        "text": "Get the best LED TV deals! 📺 Save money and upgrade your entertainment."
      },
      {
        "text": "Get an LED TV at a low cost! Cheap, high-quality options are available."
      },
      {
        "text": "Get LED TVs at affordable prices  ✨  !"
      }
    ],
    "optimization_type": "DEGREES_OF_FREEDOM"
  },
  "id": "<CREATIVE_ID>"
}
```

**Depois que as sugestões tiverem sido analisadas e forem aceitáveis para publicação, vá para a etapa 3, para definir o anúncio como `ACTIVE`. Se alguma das sugestões geradas não for aceitável, [crie um novo anúncio ou criativo](https://developers.facebook.com/docs/marketing-apis/get-started/#ad-creative) sem ativar a Geração de Texto.**

#### Crie o criativo sem ativar a geração de texto

```
v24.0
```

### Etapa 3: configure o status do grupo de anúncios como `ACTIVE`

Depois de ter verificado as sugestões de texto gerado, você pode definir o `status` do anúncio como `ACTIVE`. Esta etapa precisa ser realizada em ambos os casos:

1.  Quando um anúncio é ativado para o recurso pelo ponto de extremidade `/ads`
2.  Se o anúncio for o primeiro a usar um criativo existente com ativação da geração de texto.

#### Solicitação

```
v24.0
```

[](#)

## Expansão de imagem

Expanda automaticamente sua imagem para caber em mais posicionamentos.

### Etapa 1: crie um anúncio ou criativo que optou pela expansão de imagem

Você pode criar um anúncio através do ponto de extremidade `/ads` ou criar um criativo independente através do ponto de extremidade `/adcreatives`. Em qualquer das abordagens, opte por usar o recurso Expansão de Imagem na especificação do criativo (veja exemplos abaixo).

#### Solicitação

```
v24.0
```

### Etapa 2: veja uma prévia para Expansão de Imagem

Este recurso é aceito para posicionamentos `INSTAGRAM_STANDARD`, `FACEBOOK_REELS_MOBILE`, `INSTAGRAM_REELS`, `MOBILE_FEED_STANDARD`, `INSTGRAM_STORY`. Para ver uma prévia desses posicionamentos, faça uma solicitação `GET` para o ponto de extremidade `/<AD_ID>/previews`.

**Se alguma das imagens geradas não for aceitável, recrie o anúncio ou criativo sem ativar a Expansão de Imagem:**

-   Defina o `creative_feature` como `image_uncrop`.
    
-   Solicite a prévia novamente se o `status` for exibido como `pending`.
    

**Nota:** se um nó `transformation_spec` não for exibido, significa que o criativo não é qualificado para expansão de imagem.

#### Solicitação

`INSTAGRAM_STANDARD`

```
curl -X GET -G \
  -d 'ad_format=INSTAGRAM_STANDARD' \
  -d 'creative_feature=image_uncrop' \
  -d 'access_token=/<ACCESS_TOKEN>' \
  https://graph.facebook.com/v19.0/<AD_ID>/previews
```

`FACEBOOK_REELS_MOBILE`

```
curl -X GET -G \
  -d 'ad_format=FACEBOOK_REELS_MOBILE' \
  -d 'creative_feature=image_uncrop' \
  -d 'access_token=/<ACCESS_TOKEN>' \
  https://graph.facebook.com/v19.0/<AD_ID>/previews
```

#### Resposta

```
{
  "data": [
    {
      "body": "<iframe src='<PREVIEW_URL>'></iframe>",
      "transformation_spec": {
        "image_uncrop": [
          {
            "body": "<iframe src='<PREVIEW_URL>'></iframe>",
            "status": "eligible"
          }
        ]
      }
    }
  ]
}
```

### (Opcional) Prévia direta sem criação de anúncio

Você também pode solicitar uma prévia usando o ponto de extremidade `act_<AD_ACCOUNT_ID>/generatepreviews` sem, de fato, criar um anúncio.

#### Solicitação

`FACEBOOK_REELS_MOBILE`

```
curl -X GET -G \
  -d 'ad_format=FACEBOOK_REELS_MOBILE' \
  -d 'creative_feature=image_uncrop' \
  -d 'creative={
       "object_story_spec": {
         "page_id": "<PAGE_ID>",
          "link_data": {
            "image_hash": "<IMAGE_HASH>",
            "link": "<WEBSITE_LINK>"
          }
        }
     }'
  -d 'access_token=<ACCESS_TOKEN>'
  https://graph.facebook.com/v19.0/act_<AD_ACCOUNT_ID>/generatepreviews
```

[](#)

## Geração de plano de fundo

Vamos criar planos de fundo diferentes para imagens de produtos qualificados e apresentar a versão à qual seu público tem maior probabilidade de responder. Esses planos foram criados com base no seu ativo original.

### Etapa 1: crie um anúncio ou criativo com geração de plano de fundo

Atualmente, a geração de plano de fundo funciona apenas com anúncios dinâmicos de produtos ou anúncios de catálogo Advantage+ no feed para celular.

Você pode criar um anúncio através do ponto de extremidade `/ads` ou criar um criativo independente através do ponto de extremidade `/adcreatives`. Em qualquer das abordagens, opte por usar o recurso Geração de Plano de Fundo na especificação do criativo (veja exemplos abaixo).

#### Solicitação

```
v24.0
```

### Etapa 2: veja uma prévia para Geração de Plano de Fundo

Ao optar pelo recurso, criaremos diferentes planos de fundo para imagens de produtos qualificadas e veicularemos a versão à qual seu público tem mais probabilidade de responder. Só é possível optar pelo recurso para o anúncio criado na solicitação atual. Estes planos de fundo são criados com base no seu ativo original, apresentando diferentes cores ou padrões para imagens de produtos elegíveis. Você verá uma prévia estática ou ao vivo do seu plano de fundo gerado, dependendo da elegibilidade do catálogo.

**Se algum dos planos de fundo gerados não for aceitável, crie novamente o anúncio ou criativo sem ativar a Geração de Plano de Fundo.**

-   A prévia é atualmente aceita somente no posicionamento `MOBILE_FEED_STANDARD`
    
-   Defina o `creative_feature` como `image_background_gen`
    
-   Se a prévia ao vivo dos produtos do seu catálogo não estiver pronta, uma prévia do estoque será exibida com `status` definido como `PENDING`
    

#### Solicitação

`MOBILE_FEED_STANDARD`

```
curl -X GET -G \
  -d 'ad_format=MOBILE_FEED_STANDARD' \
  -d 'creative_feature=image_background_gen' \
  -d 'access_token=/<ACCESS_TOKEN>' \
  https://graph.facebook.com/v19.0/<AD_ID>/previews
```

#### Resposta

```
{
  "data": [
    {
      "body": "<iframe src='<PREVIEW_URL>'></iframe>",
      "transformation_spec": {
        "image_background_gen": [
          {
            "body": "<iframe src='<PREVIEW_URL>'></iframe>",
            "status": "eligible" // or one of "pending", "ineligible"
          }
        ]
      }
    }
  ]
}
```

### (Opcional) Prévia direta sem criação de anúncio

Você também pode solicitar uma prévia de um criativo usando o ponto de extremidade `/<AD_CREATIVE_ID>/previews` sem, de fato, criar um anúncio.

#### Solicitação

`MOBILE_FEED_STANDARD`

```
curl -X GET -G \
  -d 'ad_format=MOBILE_FEED_STANDARD' \
  -d 'creative_feature=image_background_gen' \
  -d 'access_token=<ACCESS_TOKEN>'
  https://graph.facebook.com/v19.0/<AD_CREATIVE_ID>/generatepreviews
```

#### Resposta

```
{
  "data": [
    {
      "body": "<iframe src='<PREVIEW_URL>'></iframe>",
      "transformation_spec": {
        "image_background_gen": [
          {
            "body": "<iframe src='<PREVIEW_URL>'></iframe>",
            "status": "eligible" // or one of "pending", "ineligible"
          }
        ]
      }
    }
  ]
}
```

[](#)

## Sobre a transparência da IA

Imagens de anúncios criadas ou editadas materialmente com determinados recursos de criativo de IA generativa da Meta disponíveis nas nossas ferramentas de marketing podem incluir informações de IA no menu de três pontos de um anúncio ou ter uma etiqueta de informação de IA ao lado da etiqueta Patrocinado. Consulte [Transparência dos anúncios de IA generativa](https://www.facebook.com/business/help/539137881899016).

[](#)

## Saiba mais

-   [Criativo do anúncio](/docs/marketing-api/reference/ad-creative)
    
-   [Grupo de anúncios](/docs/marketing-api/reference/adgroup/)
    
-   [Especificação para story do objeto de criativo do anúncio](/docs/marketing-api/reference/ad-creative-object-story-spec/)
    
-   [Recursos de IA generativa para anúncios](https://www.facebook.com/business/news/generative-ai-features-for-ads-coming-to-all-advertisers)
    

[](#)