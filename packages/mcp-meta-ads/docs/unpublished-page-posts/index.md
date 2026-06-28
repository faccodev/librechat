---
title: "Feed"
source: "https://developers.facebook.com/docs/marketing-api/unpublished-page-posts/"
scraped_at: "2026-02-01T14:10:46.724Z"
---

# Feed da Página

Use o ponto de extremidade para acessar e publicar em uma Página. O Feed da Página abrange todas as interações com uma Página do Facebook. Isso inclui conteúdo e links publicados por esta Página, visitantes da Página e posts públicos nas quais a Página foi marcada.

### Veja também

-   O [ponto de extremidade `/{page-post-id}`](https://developers.facebook.com/docs/graph-api/reference/pagepost) permite atualizar um post específico da Página.
    
-   O [ponto de extremidade `/{page-id}/tagged`](https://developers.facebook.com/docs/graph-api/reference/page/tagged) **recupera apenas posts públicos nos quais a Página foi marcada.**
    

[](#)

## Leitura

Os posts de uma Página do Facebook.

### Nova experiência de Página

Esta API é compatível com a nova experiência de Página.

### Requisitos

A pessoa que solicita o token de acesso deve ser capaz de realizar uma das seguintes tarefas na Página:

-   CREATE\_CONTENT – Publicar conteúdo em nome da Página
    
-   MANAGE – Atribuir e gerenciar tarefas na Página
    
-   MODERATE
    
    -   Responder a comentários em posts em nome da Página
        
    -   Exclua comentários em posts da Página
        
    -   Se uma conta do Instagram estiver conectada à Página, será possível publicar conteúdo no Instagram a partir do Facebook, responder e excluir comentários, enviar mensagens diretas, sincronizar dados de contatos comerciais e criar anúncios.
        
    

Também é preciso conceder ao app as seguintes permissões necessárias:

-   A [permissão `pages_read_engagement`](/docs/pages/overview-1#permissions)
    
-   A [permissão `pages_read_user_content`](/docs/pages/overview-1#permissions)
    

Caso você não seja o proprietário nem o gerenciador da Página, será preciso o seguinte:

-   O [recurso Acesso ao Conteúdo Público da Página](https://developers.facebook.com/docs/apps/review/feature/#reference-PAGES_ACCESS)
    

Para evitar problemas de [limitação de volume](/docs/graph-api/overview/rate-limiting#pages) ao utilizar o recurso Acesso ao Conteúdo Público da Página, recomendamos o uso de um [token de acesso do usuário do sistema](https://www.facebook.com/business/help/503306463479099).

#### Exemplo de solicitação

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Explorador da Graph API](/tools/explorer/?method=GET&path=%7Bpage-id%7D%2Ffeed&version=v24.0)

```
GET /v24.0/{page-id}/feed HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{page-id}/feed',
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/{page-id}/feed",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{page-id}/feed",
    null,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{page-id}/feed"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

#### Exemplo de resposta JSON

```
{
  "data": [
    {
      "created_time": "2019-05-17T16:24:04+0000",
      "message": "Become a Facebook developer!",
      "id": "{page-id}_2191966997525824"
    },
    {
      "created_time": "2019-02-26T21:35:42+0000",
      "message": "Hello world!",
      "id": "{page-id}_2072371269485398"
    },
...
    {
      "created_time": "2018-01-26T20:57:22+0000",
      "message": "Friday Funday!",
      "id": "{page-id}_1569752556413941"
    }
  ],
  "paging": {
    "cursors": {
      "before": "Q2c4U1pXNT...",
      "after": "Q2c4U1pXNT..."
    },
    "next": "https://graph.facebook.com/vX.X/{page-id}/feed?access_token={your-page-access-token}&pretty=0&limit=25&after=Q2c4U1pXNT..."
  }
}
```

### Limitações

-   **Posts expirados** – Se um post expirar, não será mais possível ver seu conteúdo usando a Graph API.
    
-   **Máximo de posts**
    
    -   A API retornará aproximadamente 600 posts classificados e publicados por ano.
        
    -   É possível ler no máximo 100 posts do feed com o campo `limit`. Se tentar ler mais do que isso, você receberá uma mensagem de erro dizendo que não é possível exceder o limite de 100.
        
    
-   **CTA de mensagem** – Não é possível acessar os posts com CTAs de mensagem usando o token de acesso de outra Página, já que as Páginas não podem enviar mensagens a outras.
    
-   **Informações identificáveis publicamente** – As informações do usuário não serão incluídas nas respostas, a menos que você faça a solicitação com um token de acesso à Página.
    
-   **Posts feitos** – Os posts feitos e não feitos serão retornados ao consultar o ponto de extremidade "/{page-id}/feed". Use o campo "is\_published" para receber somente os posts feitos.
    
-   **Posts compartilhados** – Um post da Página que compartilha um post de outra Página ou pessoa poderá não ficar visível se o post original não estiver visível com o token de acesso usado.
    
-   **Posts marcados** – Ao usar `/{page-id}/tagged` para exibir posts que marcaram a Página, os resultados incluirão posts de outras Páginas somente se elas forem autênticas.
    
-   **Agentes de usuário** – Os agentes de usuário disponíveis permitidos para essas chamadas da Graph API estão sujeitos a alterações sem aviso. Se estiver enfrentando problemas, você pode optar por mudar para uma versão mais nova do seu usuário de agente específico.
    
-   **Posts de vídeo** – Para obter uma lista de posts de vídeo, a pessoa que faz a solicitação deve ser um administrador da Página.
    
-   **Reels** – Para obter uma lista de reels publicados na sua Página, use a [borda Page VideoReels](/docs/graph-api/reference/page/video_reels).
    

Limitação: todos os posts (feitos ou não) serão extraídos no ponto de extremidade do feed. A única diferença é que o conteúdo não postado não aparecerá no feed físico. No entanto, há um campo "is\_published" que pode ser adicionado ao ponto de extremidade "/feed" para que os desenvolvedores saibam se o post listado foi feito ou não

### Campos

Nome

Tipo

Descrição

`id`

`string`

A identificação do post.

`actions`

`object`

Links de ação no post: Comentar, Curtir, Compartilhar.

`admin_creator`

`object`

O criador e administrador do post da Página. Se a Página tiver somente um administrador, nenhum dado será retornado. É necessário ter um token de acesso à Página e a permissão `business_management`.

`id`

`int`

O ID da pessoa, do aplicativo ou da empresa.

`name`

`string`

O nome da pessoa, do aplicativo ou da empresa.

`allowed_advertising_objects`

`string`

Os únicos objetivos sob os quais o post pode ser anunciado.

`application`

`object`

As informações sobre o aplicativo que fez o post.

`attachments`

`object`

Todos os anexos que estão associados à história. Consulte a referência do nó [Story Attachment](/docs/graph-api/reference/story-attachment) para campos `attachments`.

`backdated_time`

`float`

A hora com data retroativa do post com data retroativa. Em um post normal, esse campo é definido como nulo.

`call_to_action`

`object`

O tipo de chamada para ação usado em qualquer post da Página para [anúncios de engajamento com o aplicativo para celular](/docs/ads-for-apps/mobile-app-ads-engagement).

`context`

`object`

O tipo de chamada para ação usado em qualquer post da Página para [anúncios de engajamento com o aplicativo para celular](/docs/ads-for-apps/mobile-app-ads-engagement).

`can_reply_privately`

`boolean`

Indica se o visualizador da Página pode enviar uma resposta privada ao post. É preciso ter a permissão `read_page_mailboxes`.

`caption`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

`string`

A legenda do link em um post que aparece abaixo do `name`. A `caption` precisa ser um URL real e deve refletir de forma precisa o URL e o anunciante ou a empresa associada que alguém visita quando clica no endereço.

`child_attachments`

`object`

Subcompartilhamentos de um post com vários links.

`created_time`

`float`

O horário em que o post foi feito inicialmente. Em um post sobre um acontecimento, representa a data e o horário do evento em questão.

`description`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes. Em vez disso, use `attachments{description}`.

`string`

A descrição de um link no post (aparece abaixo da `caption`).

`feed_targeting`

`object`

Objeto que controla o [direcionamento do Feed](https://www.facebook.com/help/352402648173466) do post. É mais provável que quem estiver nesses grupos veja o post, mas outros também poderão vê-lo, mesmo com menos probabilidade. Qualquer campo de direcionamento mostrado aqui pode ser usado, nenhum é obrigatório (aplica-se somente a Páginas).

`age_max`

`int`

Idade máxima.

`age_min`

`int`

Deve ser 13 ou mais. O padrão é 0.

`cities`

`int`

Valores de cidades de direcionamento. Use `type` de `adcity` para [encontrar opções de direcionamento](/docs/graph-api/reference/targeting/) e use a `key` retornada para especificar.

`college_years`

`int`

Matriz de números inteiros para ano de formatura da faculdade.

`countries`

`string`

Valores de países de direcionamento. É possível especificar até 25 países. Use [códigos de formato ISO 3166](https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.iso.org%2Fiso%2Fcountry_codes%2Fiso_3166_code_lists%2Fcountry_names_and_code_elements.htm&h=AT11OW3B_8JrNfyvI8f3MXWN4CQmW3LigqmA4jxNgMBvBqIZImgB55R1DG5LWNobSE8m0-_7zVSiyjI37dZNrf-Kkw4YwVMf4BeQ9qA_9BBf5vSTkxpVbFKPY8bC3A66jO7PH2n8cZwXeIMpCIRVHyNsVvejXionXkkq2Dzuxmc).

`education_statuses`

`int`

Matriz de números inteiros para direcionamento com base no nível de escolaridade. Use `1` para ensino médio, `2` para graduação e `3` para pós-graduação (ou equivalentes locais).

`genders`

`int`

Direciona gêneros específicos. `1` direciona todos os visualizadores do gênero masculino, e `2` direciona todos os visualizadores do gênero feminino. O padrão é direcionar todos.

`interested_in`

Obsoleto.

`int`

Indica o direcionamento com base no campo "tem interesse em" do perfil do usuário. Você pode especificar um número inteiro 1 para indicar gênero masculino, e 2 para indicar gênero feminino. O padrão é todos os tipos. Observe que o direcionamento com base no campo "tem interesse em" não está disponível em países europeus nem no Canadá devido à legislação local.

`interests`

`int`

Uma ou mais identificações de páginas para direcionar fãs. Use o tipo de página para obter possíveis identificações como opções de direcionamento e use a identificação retornada para especificar.

`locales`

`int`

Localidades direcionadas. Use `type` de `adlocale` para [encontrar opções de direcionamento](/docs/graph-api/reference/targeting/) e a `key` retornada para especificar.

`regions`

`array`

Valores de regiões de direcionamento. Use `type` de `adregion` para [encontrar opções de direcionamento](/docs/graph-api/reference/targeting/) e use a `key` retornada para especificar.

`relationship_statuses`

`int`

Matriz de números inteiros para direcionamento com base no status de relacionamento. Use `1` para solteiro(a), `2` para "em um relacionamento", `3` para casado(a) e `4` para noivo(a). O padrão é todos os tipos.

`from`

`object`

O `name` e a `id` da Página, do grupo ou do evento que criou o post. Se você ler esse campo com um [token de acesso do usuário](/docs/facebook-login/access-tokens), ele retornará somente o usuário atual.

`full_picture`

`string`

URL para uma versão de tamanho completo da foto postada no post ou extraída de um link no post. Se a maior dimensão da foto exceder 720 pixels, ela será redimensionada com a maior dimensão definida como 720.

`icon`

`string`

Link para um ícone que representa o tipo do post.

`instagram_eligibility`

`enum{}`

Indica se o post pode ser promovido no Instagram. Retornará a enumeração `eligible` se puder ser promovida. Caso contrário, retornará uma enumeração informando o motivo pelo qual não pode ser promovida:

-   `ineligible_caption_mentions_not_allowed`
    
-   `ineligible_caption_too_long`
    
-   `ineligible_media_aspect_ratio`
    
-   `ineligible_media_dimension`
    
-   `ineligible_media_square_aspect_ratio`
    
-   `ineligible_media_square_dimension`
    
-   `ineligible_post_type`
    
-   `ineligible_unknown_error`
    
-   `ineligible_video_length`
    

`is_eligible_for_promotion`

`boolean`

Indica se um post está qualificado para promoção.

`is_expired`

`boolean`

Indica se o post tem um horário de expiração que já passou.

`is_hidden`

`boolean`

Indica se o post está marcado como oculto (aplica-se somente a Páginas). Ocultar um post impedirá que ele seja exibido na linha do tempo da Página. No entanto, ainda será possível visualizá-lo em outros locais do Facebook (por exemplo, um link).

`is_instagram_eligible`

`string`

Indica se o post pode ser promovido no Instagram.

`is_popular`

`boolean`

Indica se o post é popular. Essa classificação é aplicada quando as ações totais como um percentual de alcance excedem um certo limite.

`is_published`

`boolean`

Indica se um post programado foi feito (aplica-se somente ao post da Página programado; para posts de usuários e posts feitos instantaneamente, o valor é sempre `true`). Esse valor é sempre `false` para posts da Página criados como parte do processo de criação de anúncio.

`is_spherical`

`boolean`

Indica se é um post de vídeo esférico.

`link`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

Em vez disso, use `attachments{unshimmed_url}`.

`string`

O link anexado ao post.

`message`

`string`

A mensagem de status no post.

`message_tags`

`array`

Uma matriz de perfis marcados no texto da `message`. Se você ler esse campo com um [token de acesso do usuário](/docs/facebook-login/access-tokens), ele retornará somente o usuário atual.

`length`

`int`

O comprimento do texto da tag, em [pontos de código unicode](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCode_point&h=AT25tpbyC9RAm70S04iQ6K1X8jxEaymEpTHhGg5OedwkqFsFCFBqa_PFeFCuxvWAjJ6poyH-J0OHgGBpOoePmln239zyjbo78KNvuZnHJY1HVU4Vw4hDXqoz3J2UwKdZIyfg9kgHijuhsnASR2NX_rG6QeSxMDHYJ5-JN_YOE70).

`id`

`string`

Identificação do perfil que foi marcado.

`name`

`string`

O texto usado para marcar o perfil.

`offset`

`int`

A localização nos [pontos de código unicode](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCode_point&h=AT1wtMASL88rHBsmeneZOhjBBFOqMci9Vf56BAqT7bU4YUzZB-U5qO3aLltGj6Y9qoeIFEiP6A3RWUwShgwlIfJirVhp1xyWjNGvainMo8qlsEbaWF7v5wfJIPxhsTXAL4DkJyxrdH7nfAX-UGJ_7CfMxA1kRVBcJFQD_bcsb-Q) do primeiro caractere do texto da tag na `message`.

`type`

`enum{}`

O tipo do perfil marcado, `user`, `page` ou `group`.

`name`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

Em vez disso, use `attachments{title}`.

`string`

O nome do `link`.

`object_id`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

Em vez disso, use `attachments{target{id}}`.

`string`

O ID de qualquer foto ou vídeo carregado e anexado ao post.

`parent_id`

`string`

A identificação de um post principal (se existir). Por exemplo, se a história for "Sua página foi mencionada em um post", a `parent_id` é o post original em que a menção aconteceu.

`permalink_url`

`string`

O URL estático permanente do post em www.facebook.com. Exemplo: [https://www.facebook.com/FacebookForDevelopers/posts/10153449196353553](https://www.facebook.com/FacebookForDevelopers/posts/10153449196353553).

`place`

`string`

ID do [local](/docs/graph-api/reference/place) associado ao post.

`privacy`

`object`

As configurações de privacidade do post.

`allow`

`string`

Se `value` for `CUSTOM`, isso representará uma lista separada por vírgulas de IDs de usuários e de listas de amigos (se houver) que podem ver o post.

`deny`

`string`

Se `value` for `CUSTOM`, isso representará uma lista separada por vírgulas de IDs de usuários e de listas de amigos (se houver) que não podem ver o post.

`description`

`string`

Texto que descreve as configurações de privacidade da mesma maneira que apareceriam no Facebook.

`friends`

`enum{}`

Se `value` for `CUSTOM`, isso indicará qual grupo de amigos pode ver o post. Veja os valores aceitos:

-   `ALL_FRIENDS`
    
-   `FRIENDS_OF_FRIENDS`
    
-   `SOME_FRIENDS`
    

`value`

`enum{}`

A real configuração de privacidade. Veja os valores aceitos:

-   `ALL_FRIENDS`
    
-   `CUSTOM`
    
-   `EVERYONE`
    
-   `FRIENDS_OF_FRIENDS`
    
-   `SELF`
    

`promotable_id`

`string`

Identificação do post a ser usado para promoção de histórias que não podem ser promovidas diretamente.

`promotion_eligibility`

Obsoleto. Consulte `is_eligible_for_promotion`.

`boolean`

Indica se um post está qualificado para promoção.

`promotion_status`

Obsoleto. Consulte `is_eligible_for_promotion`.

`string`

Status da promoção. Exige privilégios de administrador da Página. Valores possíveis:

`active`

A promoção está ativa no momento.

`draft`

A promoção ainda está em modo rascunho.

`extendable`

A campanha da promoção foi encerrada, mas pode ser reiniciada.

`finished`

A promoção foi encerrada.

`inactive`

Não há promoção ativa.

`ineligible`

O post não está qualificado para ser turbinado. [Saiba por que o post pode não estar qualificado.](https://www.facebook.com/business/help/1575107409431290)

`paused`

A promoção está pausada.

`pending`

A promoção ainda está em análise.

`rejected`

A promoção foi rejeitada pelo processo de análise.

`properties`

`object`

Uma lista de propriedades para qualquer vídeo anexado, por exemplo, a duração.

`name`

`string`

O nome da propriedade.

`text`

`string`

O valor da propriedade.

`href`

`string`

Qualquer link associado à propriedade.

`sheduled_publish_time`

`float`

Um registro de data e hora do Unix do horário programado para o post.

`shares`

`object`

A contagem de compartilhamentos do post Esse total pode incluir posts excluídos e posts que não podem ser vistos por motivos de privacidade.

`source`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

Em vez disso, use `attachments{media{source}}`.

`string`

Um URL de qualquer arquivo de vídeo ou filme Flash anexado ao post.

`status_type`

`enum{}`

O tipo de atualização de status. Veja os valores aceitos:

-   `added_photos`
    
-   `added_video`
    
-   `app_created_story`
    
-   `approved_friend`
    
-   `created_event`
    
-   `created_group`
    
-   `created_note`
    
-   `mobile_status_update`
    
-   `published_story`
    
-   `shared_story`
    
-   `tagged_in_photo`
    
-   `wall_post`
    

`story`

`string`

Texto das histórias gerado pelos usuários de forma não intencional, como aqueles gerados quando uma foto é adicionada. Para recuperar esse campo, a migração "Incluir histórias de atividade recente" deve estar ativada no seu aplicativo.

`story_tags`

`array`

A lista de tags na descrição do post.

`subscribed`

`boolean`

Indica se um usuário se inscreveu para seguir o post.

`targeting`

`object`

Objeto que limita o público do conteúdo. Somente públicos nos [dados demográficos especificados](https://www.facebook.com/help/352402648173466) podem visualizar o conteúdo. Os dados demográficos são complementares. Cada valor extra acrescenta o público ao público direcionado cumulativo. Esses valores não substituem nenhuma restrição demográfica no nível da Página que possa estar em vigor.

`countries`

`string`

Valores de países de direcionamento como [códigos de formato ISO 3166](https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.iso.org%2Fiso%2Fcountry_codes%2Fiso_3166_code_lists%2Fcountry_names_and_code_elements.htm&h=AT1umFBX1nvIDY_umYF37zzB-nF2C0w9BWpfQeVA5ap0lGFhysJ5XxLMPm7hvqhGeH0l3EY-EVp5eOrjtdsyn28bCrXSvc06azwCJi4orJTAZ6WPRSlNNq-VXQHrF9xmXCdqwAJ9bRqiv8f_W9QDuHVhKlc2wlh8aBvJzJl8ivw).

`locales`

`int`

Localidades direcionadas. Podem ser retornadas [opções de direcionamento](/docs/graph-api/reference/targeting/) do tipo `adlocale`.

`regions`

`list<int>`

Valores de regiões direcionadas. Podem ser retornadas [opções de direcionamento](/docs/graph-api/reference/targeting/) do tipo `adregion`.

`cities`

`list<int>`

Valores de cidades excluídas. Podem ser retornadas [opções de redirecionamento](/docs/marketing-api/targeting-search) do tipo `adcity`.

`to`

`object`

Perfis mencionados ou direcionados no post. Se você ler esse campo com um [token de acesso do usuário](/docs/facebook-login/access-tokens), ele retornará somente o usuário atual.

`type`

Obsoleto para posts da Página na versão 3.3 ou em versões mais recentes.

Em vez disso, use `attachments{media_type}`. Se não houver `attachments` nem `media_type=link`, o valor será o mesmo de `type=status`.

`enum{}`

Uma string indicando o tipo de objeto do post. Veja os valores de `enum` aceitos:

-   `link`
    
-   `offer`
    
-   `photo`
    

-   `status`
    
-   `video`
    

`updated_time`

`float`

O horário em que o post foi atualizado pela última vez, expresso com um registro de data e hora do UNIX. Isso ocorre quando o post é criado ou editado ou quando um usuário comenta em um post.

`video_buying_eligibility`

`array`

Indica se o post pode ser promovido com opções diferentes de compra de vídeo. Retornará uma lista vazia quando o vídeo for qualificado. Caso contrário, retornará uma lista de motivos pelos quais o post não pode ser promovido.

`with_tags`

`object`

Os perfis marcados como sendo "com" o publisher do post. Se você ler esse campo com um [token de acesso do usuário](/docs/facebook-login/access-tokens), ele retornará somente o usuário atual.

  

Esse ponto de extremidade ficará obsoleto em 30 de abril de 2019 para a versão 3.3 e versões mais recentes da Graph API e da API de Marketing. Os aplicativos que usaram esse ponto de extremidade nos últimos 90 dias podem continuar a usá-lo na versão 3.2 e em versões mais recentes da API até 30 de julho de 2019. Os aplicativos que não usaram esse ponto de extremidade nos últimos 90 dias não poderão mais usá-lo a partir de 30 de abril de 2019.

### IDs promovíveis

Ao encontrar posts que podem ser impulsionados, use o `promotable_id` para criar anúncios. Na maioria dos casos, esse ID será idêntico ao `post_id`. No entanto, isso nem sempre acontece. **Observação**: quando o post tiver sido promovido, você terá acesso à conta de anúncios associada para editar o post.

#### Exemplo de solicitação

cURLAndroid SDKObjective-CJava SDKPHP SDK

```
curl -i -X GET \
 "https://graph.facebook.com/{your-page-id}/feed
    ?fields=is_eligible_for_promotion,promotable_id
        &access_token={your-page-access-token}"
```

```
GraphRequest request = GraphRequest.newGraphPathRequest(
  accessToken,
  "/{your-page-id}/feed",
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});

Bundle parameters = new Bundle();
parameters.putString("fields", "is_eligible_for_promotion,promotable_id");
request.setParameters(parameters);
request.executeAsync();
```

```
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/{your-page-id}/feed"
           parameters:@{ @"fields": @"is_eligible_for_promotion,promotable_id",}
           HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
```

```
FB.api(
  '/{your-page-id}/feed',
  'GET',
  {"fields":"is_eligible_for_promotion,promotable_id"},
  function(response) {
      // Insert your code here
  }
);
```

```
try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->get(
    '/{your-page-id}/feed?fields=is_eligible_for_promotion,promotable_id',
    '{access-token}'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
```

#### Exemplo de resposta

```
{
  "data": [
    {
      "is_eligible_for_promotion": true,
      "promotable_id": "1353269864728879_1943344825721377",
      "id": "1353269864728879_1943344825721377"
    },
    {
      "is_eligible_for_promotion": true,
      "promotable_id": "1353269864728879_1943313139057879",
      "id": "1353269864728879_1943378089051384"
    },
    {
      "is_eligible_for_promotion": false,
      "promotable_id": "1353269864728879_1942095249179668",
      "id": "1353269864728879_1942095249179668"
    },
...
```

Acesse nossa [Central de Ajuda](https://www.facebook.com/business/help/1575107409431290/?ref=u2u) para saber por que um post não pode ser impulsionado.

Acesse nosso [documento de referência sobre posts](/docs/graph-api/reference/post) e veja todos os campos disponíveis para posts.

[](#)

[](#)

## Publicação

Você pode publicar nas Páginas usando esta borda. É necessário fornecer o `link` ou a `message`.

### Nova experiência de Página

Esta API é compatível com a nova experiência de Página.

### Requisitos

Se você puder [executar a tarefa `CREATE_CONTENT`](https://developers.facebook.com/docs/pages/overview/permissions-features#tasks), será necessário o seguinte:

-   Um token de acesso à Página
    
-   A [permissão `pages_manage_posts`](https://developers.facebook.com/docs/permissions/reference/pages_manage_posts)
    
-   A [permissão `pages_read_engagement`](https://developers.facebook.com/docs/permissions/reference/pages_read_engagement)
    
-   A [permissão `pages_show_list`](https://developers.facebook.com/docs/permissions/reference/pages_show_list)
    

Os posts serão exibidos com a voz da Página.

### Permissões

-   Um token de acesso à Página solicitado pela pessoa que pode realizar a
    
    [tarefa `CREATE_CONTENT`](#)
    
    na Página consultada.
    
-   [A permissão `pages_manage_posts`](#)
    

**Observação**: se o visualizador ou o app não puderem ver a URL do `link`, não será possível fazer o post.

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK

```
POST /v24.0/{page-id}/feed HTTP/1.1
Host: graph.facebook.com

message=This+is+a+test+message
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/{page-id}/feed',
    array (
      'message' => 'This is a test message',
    ),
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/{page-id}/feed",
    "POST",
    {
        "message": "This is a test message"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("message", "This is a test message");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{page-id}/feed",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"message": @"This is a test message",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{page-id}/feed"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

### Resposta

```
{"id":"post-id"}
```

Esse ponto de extremidade aceita [leitura após gravação](/docs/graph-api/using-graph-api#read-after-write) e pode exibir imediatamente todos os campos retornados por operações de [leitura](/docs/graph-api/reference/page/feed#read).

#### Exemplo da ferramenta Explorador da Graph

Faça um teste na ferramenta Graph Explorer usando `POST {page-id}/feed`:

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/23668642_407398856346304_2504985490084593664_n.png?_nc_cat=103&ccb=1-7&_nc_sid=34156e&_nc_ohc=Dh57itqUi2IQ7kNvwFKjYZa&_nc_oc=Adn00LKs8Z6TXMGZaeCqvDqB_1QMrnT4Wwia-XwAE56RCexU5acVEhR-vbieRUhwfICCXbaVp4LaVHQaXLLfVKGe&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Al49mUWmlUl23rkZh7s3OQ&oh=00_AfthL6FUG-l5k_56aN9QL5Kd22_DC9wdMgXt6xITbSIvYQ&oe=698523E0)

### Campos

Nome

Tipo

Descrição

`actions`

`array`

Os [links de ação](/docs/opengraph/using-actions/#howto-actionlinks) anexados ao post.

`link`

`string`

A URL do próprio link de ação.

`name`

`string`

O nome ou o rótulo do link de ação.

`backdated_time`

`float`

Especifica um horário no passado para usar como data retroativa no post.

`backdated_time_granularity`

`enum{year, month, day, hour, minute}`

Controla como um post com data retroativa é exibido. Por exemplo, se você escolher `month`, os posts serão exibidos como sendo de `2 months ago` em vez de uma data específica.

`child_attachments`

object

Use para especificar vários links no post. No mínimo 2 e no máximo 5 objetos. Se você definir

`multi_share_optimized`

como "true", será possível carregar no máximo 10 objetos, mas o Facebook exibirá apenas os cinco primeiros.

`description`

`string`

Usado para exibir um preço, desconto ou domínio de site. Se não especificado, o conteúdo da página vinculada será extraído e usado. Normalmente, o campo fica truncado depois de 30 caracteres.

`image_hash`

`string`

Hash de uma imagem de prévia associada ao link da sua [biblioteca de imagens de anúncio](/docs/reference/ads-api/adimage) (com proporção 1:1 e mínimo de 458 x 458 pixels para exibição otimizada). É preciso especificar `picture` ou `image_hash`.

`link`

`string`

O URL de um link para anexar ao post. Este é um campo obrigatório.

`name`

`string`

O título da prévia do link. Se não especificado, o título da página vinculada será usado. O campo normalmente ficará truncado depois de 35 caracteres. É recomendável definir um `name` exclusivo, já que as interfaces do Facebook exibem ações registradas no campo `name`.

`picture`

`string`

Uma URL que determina a imagem de prévia associada ao link (com proporção 1:1 e mínimo de 458 x 458 pixels para exibição otimizada). É preciso especificar `picture` ou `image_hash`.

`feed_targeting`

`object`

Objeto que controla o [direcionamento do Feed](https://www.facebook.com/help/352402648173466) do conteúdo. É mais provável que quem estiver nesses grupos veja o conteúdo, mas outros também poderão vê-lo, mesmo com menos probabilidade. Qualquer campo de direcionamento exibido aqui pode ser usado, mas nenhum é obrigatório.

`age_max`

`int`

Idade máxima. Deve ser 65 ou menos.

`age_min`

`int`

Deve ser 13 ou mais. O padrão é 0.

`college_years`

`int[]`

Matriz de números inteiros para ano de formatura da faculdade.

`education_statuses`

`int[]`

Matriz de números inteiros para direcionamento com base no nível de escolaridade. Use `1` para ensino médio, `2` para graduação e `3` para pós-graduação (ou equivalentes locais).

`genders`

`list<unsigned int32>`

Direciona gêneros específicos. `1` direciona todos os visualizadores do gênero masculino, e `2` direciona todos os visualizadores do gênero feminino. O padrão é direcionar todos.

`geo_locations`

`object`

O objeto permite especificar diferentes localizações geográficas. Consulte nosso [guia de direcionamento](/docs/graph-api/reference/targeting) para obter informações sobre esse objeto.

`interests`

`int[]`

Um ou mais IDs para fazer o direcionamento de fãs. Use `type=audienceinterest` para obter possíveis IDs como [opções de direcionamento](/docs/graph-api/reference/targeting/) e use o ID retornado para especificar.

`locales`

`int`

Localidades direcionadas. Use `type` de `adlocale` para [encontrar opções de direcionamento](/docs/graph-api/reference/targeting/) e use a `key` retornada para especificar.

`relationship_statuses`

`list<unsigned int32>`

Matriz de números inteiros para direcionamento com base no status de relacionamento. Use `1` para solteiro(a), `2` para "em um relacionamento", `3` para casado(a) e `4` para noivo(a). O padrão é todos os tipos.

`link`

`string`

O URL de um link para anexar ao post. É necessário fornecer o `link` ou a `message`. Outros campos associados ao `link` são exibidos abaixo. Consulte a [seção sobre links personalizados](#custom-image) para ver as restrições.

`description`

`string`

Substitui a descrição na prévia do link.

`name`

`string`

Substitui o título da prévia do link.

`picture`

`string`

Determina a prévia da imagem associada ao link.

`thumbnail`

`file`

A imagem de prévia associada ao link carregado por você.

`message`

`string`

O corpo principal do post. A mensagem pode conter [menções a Páginas do Facebook](/docs/pages/mentions), `@[page-id]`.

`multi_share_end_card`

`Boolean`

Ao ser definido como `false`, não exibirá o cartão final de um post com link em carrossel quando `child_attachments` for usado. O padrão é `true`.

`multi_share_optimized`

`Boolean`

Se for definido como `true` e somente quando o post for usado no anúncio, o Facebook selecionará automaticamente a ordem dos links em `child_attachments`. Caso contrário, a ordem original de `child_attachments` será preservada. O valor-padrão é true.

`object_attachment`

`string`

O número de identificação do Facebook de uma foto existente nos álbuns de fotos da pessoa para usar como a imagem de miniatura. A pessoa deve ser a proprietária da foto, e a foto não pode fazer parte de um anexo de mensagem.

`place`

`string`

Identificação da página de uma localização associada ao post.

`published`

`Boolean`

Indica se uma história é exibida sobre esse objeto recém-publicado. O padrão é `true`, o que significa que a história é exibida no Feed. Esse campo `not` é compatível quando o parâmetro de ações é especificado. Os posts sem exibição poderão ser usados em anúncios.

`scheduled_publish_time`

`timestamp`

O registro de data e hora UNIX do momento do post. Deve ser uma data definida entre 10 minutos e 75 dias a partir do momento da solicitação à API.

`tags`

`csv[string]`

Lista separada por vírgulas de IDs dos usuários marcados no post. Não é possível especificar este campo sem definir um `place`.

`targeting`

`object`

Objeto que [limita o público](https://www.facebook.com/help/352402648173466) do conteúdo. Quem não estiver incluído nesses dados demográficos não poderá ver o conteúdo. Isso não substituirá nenhuma restrição demográfica em vigor.

`age_min`

`int`

O valor pode ser 13, 15, 18, 21 ou 25.

`geo_locations`

`object`

O objeto permite especificar diferentes localizações geográficas. Consulte nosso [guia de direcionamento para obter informações sobre esse objeto](/docs/graph-api/reference/targeting).

### Adicionar um sentimento ou uma atividade a um post da Página

Adicione um sentimento ou uma atividade e um ícone a um post da Página. `og_action_type_id` e `og_object_id` são necessários ao postar um sentimento ou uma atividade. `og_icon_id` é opcional, mas, se não for usado, um ícone será fornecido automaticamente com base no `og_object_id`.

#### Campos

Nome

Descrição

[`og_action_type_id`](/docs/graph-api/reference/page/feed/feelings#actions)

Uma [ação](/docs/graph-api/reference/page/feed/feelings#actions), ou seja, _sentindo_, _assistindo_ etc.

[`og_icon_id`](/docs/graph-api/reference/page/feed/feelings#icons)

Um [ícone](/docs/graph-api/reference/page/feed/feelings#icons) possivelmente representando o tipo de ação, como um rosto sorridente, uma imagem que representa um filme etc.

[`og_object_id`](/docs/graph-api/reference/page/feed/feelings#objects)

O complemento da ação, por exemplo: _feliz_, _filme_ etc. Pode ser um [objeto pré-definido](/docs/graph-api/reference/page/feed/feelings#objects) ou um `page_id`.

#### Exemplo de post

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK

```
POST /v24.0/page-id/feed HTTP/1.1
Host: graph.facebook.com

message=This+is+a+test+activity&og_action_type_id=383634835006146&og_object_id=136050896551329&og_icon_id=609297155780549
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->post(
    '/page-id/feed',
    array (
      'message' => 'This is a test activity',
      'og_action_type_id' => '383634835006146',
      'og_object_id' => '136050896551329',
      'og_icon_id' => '609297155780549',
    ),
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/page-id/feed",
    "POST",
    {
        "message": "This is a test activity",
        "og_action_type_id": "383634835006146",
        "og_object_id": "136050896551329",
        "og_icon_id": "609297155780549"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
Bundle params = new Bundle();
params.putString("message", "This is a test activity");
params.putString("og_action_type_id", "383634835006146");
params.putString("og_object_id", "136050896551329");
params.putString("og_icon_id", "609297155780549");
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/page-id/feed",
    params,
    HttpMethod.POST,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
NSDictionary *params = @{
  @"message": @"This is a test activity",
  @"og_action_type_id": @"383634835006146",
  @"og_object_id": @"136050896551329",
  @"og_icon_id": @"609297155780549",
};
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/page-id/feed"
                                      parameters:params
                                      HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

A resposta será o `post_id`.

[](#)

[](#)

### Posts sem exibição na Página

Oferecemos suporte aos seguintes tipos de posts sem exibição na Página:

Tipo de post

Descrição

[Link](/docs/graph-api/reference/link)

Um post da Página de link é útil para compartilhar links que levam ao seu site. Permite a substituição opcional da imagem e do texto extra.  
Observação: o link de um vídeo do YouTube será um post da Página de link.

[Foto](/docs/graph-api/reference/photo)

Um post de Página de foto com uma descrição de texto e um link opcional como parte da descrição.

[Post](/docs/graph-api/reference/post)

Um post da Página com uma descrição de texto.

[Vídeo](/docs/graph-api/reference/video)

Um post da Página de vídeo com uma descrição de texto opcional.

Os posts sem exibição na Página são tratados da mesma maneira que os posts exibidos, mas não aparecem no `/feed`.

Para ver uma lista de posts sem exibição na Página, consulte o campo `is_published`.

cURLAndroid SDKObjective-CJava SDKPHP SDK

```
curl -i -X GET \
 "https://graph.facebook.com/{page-id}/feed
 ?fields=is_published
 &access_token={your-page-access-token}"
```

```
GraphRequest request = GraphRequest.newGraphPathRequest(
  accessToken,
  "/{page-id}/feed",
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});

Bundle parameters = new Bundle();
parameters.putString("fields", "is_published");
request.setParameters(parameters);
request.executeAsync();
```

```
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/{page-id}/feed"
           parameters:@{ @"fields": @"is_published",}
           HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
```

```
FB.api(
  '/{page-id}/feed',
  'GET',
  {"fields":"is_published"},
  function(response) {
      // Insert your code here
  }
);
```

```
try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->get(
    '/{page-id}/feed?fields=is_published',
    '{access-token}'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
```

Para ver um post no Facebook.com, acesse https://www.facebook.com/{post-id} para a maioria dos tipos de post. Você também pode recuperar o campo `actions`, que contém o URL a ser usado pelo usuário para curtir ou comentar o post.

[](#)

### call\_to\_action para post da Página

Você pode aprimorar seus posts da Página de link com botões de chamada para ação. O campo `call_to_action` a seguir pode ser adicionado a novos posts de Página de link.

Nome

Tipo

Descrição

`call_to_action`

`object`

Objeto que especifica um botão de chamada para ação. Essa deve ser a ação que você quer que as pessoas realizem ao ver seu post. Clicar nesse botão direcionará os usuários ao link que você especificar.

`type`

`string`

Define o texto do botão de chamada para ação. Um dos valores permitidos:

`BOOK_TRAVEL`. A chamada para ação é exibida como "Reservar agora".

`BUY_NOW`. A chamada para ação é exibida como "Comprar agora". Usada somente para [anúncios de bens virtuais de apps para desktop](/docs/marketing-api/mobile-app-ads).

`CALL_NOW`. A chamada para ação é exibida como "Ligar agora". Usada somente para [anúncios de Divulgação nas Imediações](/docs/marketing-api/guides/local-awareness).

`DOWNLOAD`. A chamada para ação é exibida como "Baixar".

`GET_DIRECTIONS`. A chamada para ação é exibida como "Obter orientações". É necessário especificar as coordenadas no campo `link`. Usada somente para [anúncios de Divulgação nas Imediações](/docs/marketing-api/guides/local-awareness).

`GET_QUOTE`. A chamada para ação é exibida como "Obter cotação" para [geração de cadastros](/docs/marketing-api/guides/lead-ads).

`INSTALL_APP`. A chamada para ação é exibida como "Instalar agora".

`INSTALL_MOBILE_APP`. A chamada para ação é exibida como "Instalar agora". Usada somente para [anúncios de app para celular](/docs/marketing-api/mobile-app-ads).

`LEARN_MORE`. A chamada para ação é exibida como "Saiba mais".

`LIKE_PAGE`. A chamada para ação é exibida como "Curtir página". Usada somente para anúncios no [objetivo](/docs/marketing-api/reference/ad-campaign-group) "curtidas na Página".

`LISTEN_MUSIC`. A chamada para ação é exibida como "Ouvir música".

`MESSAGE_PAGE`. A chamada para ação é exibida como "Enviar mensagem". Usada somente para [anúncios de Divulgação nas Imediações](/docs/marketing-api/guides/local-awareness).

`NO_BUTTON`. Nenhuma chamada para ação é exibida.

`OPEN_LINK`. A chamada para ação é exibida como "Abrir link". Usada somente para anúncios no [objetivo](/docs/marketing-api/reference/ad-campaign-group) "cliques no site".

`PLAY_GAME`. A chamada para ação é exibida como "Jogar". Usada somente para [anúncios de apps para desktop](/docs/marketing-api/mobile-app-ads).

`SHOP_NOW`. A chamada para ação é exibida como "Comprar agora". Usada somente para anúncios no [objetivo](/docs/marketing-api/reference/ad-campaign-group) "conversões no site".

`SIGN_UP`. A chamada para ação é exibida como "Cadastrar-se".

`SUBSCRIBE`. A chamada para ação é exibida como "Assinar" para [geração de cadastros](/docs/marketing-api/guides/lead-ads).

`USE_APP`. A chamada para ação é exibida como "Usar aplicativo".

`USE_MOBILE_APP`. Usada somente para [anúncios de app para celular](/docs/marketing-api/mobile-app-ads).

`WATCH_MORE`. A chamada para ação é exibida como "Assistir mais".

`WATCH_VIDEO`. A chamada para ação é exibida como "Assistir ao vídeo".

[](#)

### Imagem de post da Página de link personalizado

Poste um link para uma Página com uma imagem personalizada. O anexo da história renderiza uma imagem recuperada do link. No momento, é possível substituir essa imagem fornecendo um parâmetro `picture` opcional com a URL de uma nova imagem. O parâmetro `thumbnail` oferece uma funcionalidade semelhante. A principal diferença é que o parâmetro aceita um arquivo de imagem local carregado no Facebook na chamada de API.

#### Permissões

-   Um token de acesso à Página é obrigatório.
    
-   O link deve pertencer à Página que está postando.
    

Para verificar a propriedade do link, confira o campo `ownership_permissions{can_customize_link_posts}` no nó `URL`. É necessário chamar o ponto de extremidade antes de postar novos links. Sem essa etapa, os posts da Página com link personalizado não funcionarão para links não extraídos. Consulte o [guia de propriedade de link](/docs/sharing/domain-verification) para obter mais informações. Para a versão 2.10 e anteriores, `picture`, `name`, `thumbnail` e `description` estão obsoletos. `caption` está obsoleto para todas as versões.

Parâmetros

Tipo

Descrição

`description`

string

A descrição do link (aparece abaixo da legenda do link). Se não estiver especificado, o campo será preenchido automaticamente com as informações extraídas do link, que é normalmente o título da página.

`name`

string

O nome do link anexado. Esse campo é preenchido automaticamente com as informações buscadas no link.

`picture`

string

A URL da imagem. A imagem é obtida da URL informada em `picture`

`thumbnail`

arquivo

O arquivo de imagem que será carregado. Aceita `.jpg``.jpeg``.gif` ou `.png`. A imagem é obtida do arquivo carregado em `thumbnail`

#### Limitações

-   O parâmetro `thumbnail` só está disponível para posts de links em Páginas do Facebook.
    
-   O parâmetro `thumbnail` tem prioridade mais alta em relação a `picture`. Se os dois forem fornecidos, o parâmetro `picture` não será usado.
    
-   O parâmetro `thumbnail` aceita imagens com a extensão `.jpg``.jpeg``.gif` ou `.png`.
    
-   O parâmetro `thumbnail` não é compatível com solicitações em lote.
    

[](#)

### Postar o link para uma Página

Poste um link para uma Página enviando uma solicitação POST à borda `/page/feed`. Para realizar o post imediatamente, defina o parâmetro `publish` como `1`. Defina o parâmetro como `0` se quiser criar um post sem exibição que será mostrado posteriormente.

#### Exemplo de solicitação

cURLAndroid SDKObjective-CJava SDKPHP SDK

```
curl -i -X POST "https://graph.facebook.com/{your-page-id}/feed
  ?message=Become%20a%20Facebook%20developer!
  &link=https%3A%2F%2Fdevelopers.facebook.com
  &published=1
  &access_token={your-page-access-token}"
```

```
GraphRequest request = GraphRequest.newPostRequest(
  accessToken,
  "/{your-page-id}/feed",
  new JSONObject("{\"message\":\"Become a Facebook developer!\",\"link\":\"https://developers.facebook.com\",\"published\":\"1\"}"),
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});
request.executeAsync();
```

```
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/{your-page-id}/feed"
           parameters:@{ @"message": @"Become a Facebook developer!",@"link": @"https://developers.facebook.com",@"published": @"1",}
           HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
```

```
FB.api(
  '/{your-page-id}/feed',
  'POST',
  {"message":"Become a Facebook developer!","link":"https://developers.facebook.com","published":"1"},
  function(response) {
      // Insert your code here
  }
);
```

```
try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->post(
    '/{your-page-id}/feed',
    array (
      'message' => 'Become a Facebook developer!',
      'link' => 'https://developers.facebook.com',
      'published' => '1'
    ),
    '{access-token}'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
```

#### Exemplo de resposta

```
{"id":"{post-id}"}
```

[](#)

### Post da Página de link com chamada para ação

O campo `call_to_action` especifica a ação adequada e o link relevante. O link deve ser o mesmo do parâmetro `link` do post da Página. Nesta chamada, os parâmetros `title`, `description`, `caption` e `picture` são opcionais e, quando não forem informados, o Facebook lerá as propriedades equivalentes a partir dos metadados do Open Graph do link. Se a página da web vinculada não tiver metadados do Open Graph, o Facebook tentará adivinhar as propriedades extraindo o conteúdo da página da web.

#### Exemplo de solicitação

cURLAndroid SDKObjective-CJava SDKPHP SDK

```
curl -i -X POST "https://graph.facebook.com/{your-page-id}/feed
  ?message=Become a Facebook developer!
  &link=https://developers.facebook.com
  &call_to_action={"type":"SIGN_UP","value":{"link":"https://developers.facebook.com"}}
  &published=1
  &access_token={your-page-access-token}"
```

```
GraphRequest request = GraphRequest.newPostRequest(
  accessToken,
  "/{your-page-id}/feed",
  new JSONObject("{\"message\":\"Become a Facebook developer!\",\"link\":\"https://developers.facebook.com\",\"published\":\"1\",\"call_to_action\":\"{\\\"type\\\":\\\"SIGN_UP\\\",\\\"value\\\":{\\\"link\\\":\\\"https://developers.facebook.com\\\"}}\"}"),
  new GraphRequest.Callback() {
    @Override
    public void onCompleted(GraphResponse response) {
      // Insert your code here
    }
});
request.executeAsync();
```

```
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
    initWithGraphPath:@"/{your-page-id}/feed"
           parameters:@{ @"message": @"Become a Facebook developer!",@"link": @"https://developers.facebook.com",@"published": @"1",@"call_to_action": @"{"type":"SIGN_UP","value":{"link":"https://developers.facebook.com"}}",}
           HTTPMethod:@"POST"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
    // Insert your code here
}];
```

```
FB.api(
  '/{your-page-id}/feed',
  'POST',
  {"message":"Become a Facebook developer!","link":"https://developers.facebook.com","published":"1","call_to_action":"{\"type\":\"SIGN_UP\",\"value\":{\"link\":\"https://developers.facebook.com\"}}"},
  function(response) {
      // Insert your code here
  }
);
```

```
try {
  // Returns a `FacebookFacebookResponse` object
  $response = $fb->post(
    '/{your-page-id}/feed',
    array (
      'message' => 'Become a Facebook developer!',
      'link' => 'https://developers.facebook.com',
      'published' => '1',
      'call_to_action' => '{"type":"SIGN_UP","value":{"link":"https://developers.facebook.com"}}'
    ),
    '{access-token}'
  );
} catch(FacebookExceptionsFacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
```

#### Exemplo de resposta

```
{"id":"{post-id}"}
```

[](#)

### Posts de link com imagem personalizada carregada

#### Como usar um arquivo local:

```
curl -F 'link=http://www.example.com' \
     -F 'thumbnail=@/local/path/to/file/on/hard/drive/image.jpg' \
     -F 'access_token=page-access-token'\
  https://graph.facebook.com/v2.11/page-id/feed
```

Valor de retorno

```
{"id":"post-id"}
```

#### Como usar uma imagem via URL:

```
curl -F 'link=http://www.example.com' \
     -F 'picture=https://www.example.com/path/to/image.jpg' \
     -F 'access_token=page-access-token'\
  https://graph.facebook.com/v2.11/page-id/feed
```

Valor de retorno

```
{"id":"post-id>"}
```

[](#)

### Post da Página de foto

Para saber mais, acesse nosso conteúdo de [referência do nó de foto](https://developers.facebook.com/docs/graph-api/reference/photo/#Creating).

[](#)

### Posts da Página de vídeo

Para saber mais, acesse nosso conteúdo de [referência do vídeo da Página](https://developers.facebook.com/docs/graph-api/reference/page/videos/).

[](#)

### Insights sobre o post da Página

Para saber mais, acesse nosso conteúdo de [referência de insights sobre o post da Página](/docs/reference/api/insights/#post_impressions).

[](#)

## Atualização

Não é possível usar esta borda para fazer atualizações, mas você pode [atualizar posts usando o nó `/{post-id}`](/docs/reference/api/post/#updating).

[](#)

## Exclusão

Não é possível usar esta borda para excluir posts, mas você pode [fazer exclusões usando o nó `/{post-id}`](/docs/reference/api/post/).

[](#)