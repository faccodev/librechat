---
title: "Conteúdo de marca - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/branded-content"
scraped_at: "2026-02-01T13:53:37.938Z"
---

# Como criar conteúdo de marca

Criadores de conteúdo, celebridades e empresas de mídia podem compartilhar conteúdo de marca no Facebook. Os _posts de conteúdo de marca_ são conteúdos que apresentam ou que foram influenciados por um anunciante ou um profissional de marketing em troca de determinado valor. Para usá-las, é necessário cumprir as [Políticas de Conteúdo de Marca](https://www.facebook.com/policies/brandedcontent) e a [Política de Anúncios](https://www.facebook.com/policies/ads/restricted_content). Além disso, é preciso marcar o parceiro de negócios nos posts por meio da ferramenta para conteúdo de marca ou da API de Marketing.

A maioria dos criadores de posts de conteúdo de marca já tem acesso a essa ferramenta e tem perfis ou Páginas verificadas. Se a ferramenta para conteúdo de marca não estiver disponível para sua Página, [envie uma solicitação](https://www.facebook.com/help/contact/1865970047013799) de acesso.

Você pode usar a API de Marketing para criar posts desse tipo de conteúdo. Como alternativa, use a ferramenta para conteúdo de marca no [Gerenciador de Anúncios](https://business.facebook.com/adsmanager/manage) e o app Mentions. Consulte [Sobre o conteúdo de marca para marcas, anunciantes, profissionais de marketing ou patrocinadores](https://www.facebook.com/business/help/788160621327601/).

## Visão geral

Crie conteúdo de marca para os diferentes formatos de post listados no artigo [Conteúdo de marca da Central de Ajuda de Anúncios](https://www.facebook.com/business/help/788160621327601).

Dependendo do formato, chame diferentes pontos de extremidade. Além disso, é necessário incluir `sponsor_tags` no post. A tag do patrocinador direciona a uma Página do Facebook.

É possível permitir que parceiros de negócios turbinem diretamente seus [posts](https://www.facebook.com/business/help/2021526178075899) ao adicionar `direct_share_status` a eles. Defina `direct_share_status = 1` para que um parceiro de negócios possa turbinar o seu post. Caso contrário, defina `direct_share_status = 0`.

[](#)

## Criar uma atualização de status

Em primeiro lugar, é necessário postar no ponto de extremidade [`feed`](/docs/graph-api/reference/page/feed) de uma Página para criar uma atualização de status. `POST` deve conter valores para os campos `sponsor_id`, `share_status` e `message`.

```
curl -X POST "https://graph.facebook.com/PAGE_ID/feed" 
  -F "access_token=TOKEN" 
  -F "message=Check out some beautiful products in this grocery store" 
  -F "direct_share_status=1"
  
  {"id":"ID"}
```

[](#)

## Como adicionar fotos

É possível adicionar fotos ao post no ponto de extremidade [`photos`](/docs/graph-api/reference/page/photos) de uma Página. `POST` deve conter valores para os campos `sponsor_id`, `share_status` e `message`.

Especifique um campo `url` para vincular uma foto existente. Você também pode carregar a foto como anexo do post. Confira [Carregamento de fotos](/docs/graph-api/photo-uploads).

```
curl -X POST "https://graph.facebook.com/PAGE_ID/feed" 
  -F "access_token=TOKEN" 
  -F "message=Check out some beautiful products in this grocery store" 
  -F "direct_share_status=1" 
  -F "url=https://xx.cdn.net/v/t31.0-8/13064650_505613696297499_6399089570275517473_o.jpg"
  
 {"id":"372501189608751_701886166670250"}
```

[](#)

## Como postar um vídeo

O post de vídeo com conteúdo de marca requer diversas etapas:

-   Faça uma chamada para especificar que você quer carregar um vídeo. A API retornará uma identificação de objeto de vídeo que poderá ser usada para fazer o carregamento.
    
-   Carregue o vídeo.
    
-   Conclua a transferência do vídeo ao definir o status de compartilhamento. Além disso, forneça a `sponsor_id` do vídeo, o que acrescenta conteúdo de marca à história.
    

Consulte [Como carregar vídeos](/docs/graph-api/video-uploads).

Neste exemplo, iniciamos uma solicitação, carregamos o vídeo e definimos `sponsor_id` e `direct_share_status`.

```
curl -X POST "https://graph-video.facebook.com/VERSION/PAGE_ID/videos" 
  -F "access_token=$at" 
  -F "upload_phase=finish" 
  -F "upload_session_id=SESSION_ID" 
  -F "sponsor_id=ID" 
  -F "direct_share_status=1"
```

Se o processo for bem-sucedido, você verá o seguinte:

```
{"success":true}
```

[](#)

## Vídeo ao vivo

Para criar um vídeo ao vivo de marca, faça o seguinte:

-   Crie um objeto de vídeo ao vivo.
    
-   Atualize esse objeto e acrescente `sponsor_id`.
    
-   Inicie o stream de vídeo.
    

Confira a [API de Vídeo ao vivo](/docs/videos/live-video-api) para saber mais sobre a criação e o gerenciamento de streams de vídeo ao vivo. Você pode consultar a lista de vídeos ao vivo de uma página e usar a identificação de um vídeo para atualizar `sponsor_id`. Também é possível usar a identificação retornada ao criar seu primeiro vídeo ao vivo.

[](#)

## Como atualizar conteúdo de marca

Não aceitamos alterações no conteúdo de post com uma identificação de marca na web ou em dispositivos móveis. No entanto, você pode usar a API de Marketing para incluir ou mudar o patrocinador em um post. Também é possível mudar o patrocinador ao alterar o valor do campo `sponsor_id` em um objeto de post.

Para adicionar um patrocinador, faça `POST` em um post da Página e especifique uma `sponsor_id`. Para alterar o patrocinador em um post, inclua o novo campo `sponsor_id`.

É possível permitir ou proibir que um parceiro de negócios turbine o seu post de modo direto. Forneça a `sponsor_id` e a alteração ao `direct_share_status`.

```
curl -X POST "https://graph.facebook.com/PAGE_POST_ID" 
  -F "access_token=TOKEN" 
  -F "direct_share_status=1"
  
 {"success":true}
```

[](#)