---
title: "API de Eventos do App - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/app-event-api"
scraped_at: "2026-02-01T14:00:19.566Z"
---

# API de Eventos do App

Não recomendamos mais a API de Eventos do App para novas integrações. Agora, a [API de Conversões](/docs/marketing-api/conversions-api) é compatível com eventos offline, da web e do app. Por isso, recomendamos que os anunciantes usem a API de Conversões em vez da API de Eventos do App. Os usuários existentes da API de Eventos do App podem continuar a usá-la, mas não atualizaremos mais essa API. Desenvolveremos inovações para a API de Conversões. Saiba mais em [API de Conversões para Eventos do App](/docs/marketing-api/conversions-api/app-events).

  

Os eventos do app permitem que você rastreie ações que ocorrem no seu app para celular ou página da web, como instalações e eventos de compra. Ao rastrear esses eventos, é possível [mensurar o desempenho de anúncios](/docs/marketing-api/insights) e [criar públicos](/docs/marketing-api/audiences-api) para o direcionamento de anúncios.

Para ver informações sobre o rastreamento de eventos do app para mensagens com empresas, consulte [**Como registrar eventos com a API de Eventos para mensagens com empresas**](https://developers.facebook.com/docs/messenger-platform/analytics/messaging-events-api) na [documentação da plataforma do Messenger](https://developers.facebook.com/docs/messenger-platform).

## Como funciona

Há três tipos de Eventos do App:

-   Eventos registrados automaticamente – o SDK do Facebook registra automaticamente instalações, sessões e compras no app.
    
-   Eventos Padrão – eventos populares que o Facebook criou para você.
    
-   Eventos Personalizados – eventos que você cria que são específicos ao seu app.
    

O evento do app contém três partes:

1.  `name` – uma string obrigatória que descreve o evento. O nome aparece no registro do evento quando o evento do app é enviado ao Analytics.
2.  `valueToSum` – um valor opcional que o Analytics adiciona a outros valores para soma dos eventos do app com o mesmo nome.
3.  `parameters` – valores opcionais incluídos no seu evento do app.

O número máximo de nomes de eventos distintos é mil. Observação: nenhum tipo de evento novo será registrado quando esse limite for atingido e, se for ultrapassado, o erro `100 Invalid parameter` poderá aparecer durante o registro. No entanto, é possível [desativar eventos obsoletos](https://www.facebook.com/help/analytics/966883707418907). Leia mais sobre os limites de eventos nas [perguntas frequentes](/docs/app-events/faq#limits).

### Antes de começar

Requisitos:

-   A identificação do anunciante, o ID de publicidade de um dispositivo Android ou o Identificador de Publicidade (IDFA) de um dispositivo Apple.
    
-   Um token de acesso do app para que o Facebook autentique. **Não** armazene seu token de acesso do app cliente.
    

## Instalações do app

Envie uma solicitação `POST` do seu servidor ao ponto de extremidade `/{app-id}/activities` com os parâmetros `application_tracking_enabled` e `advertiser_tracking_enabled`:

_Texto formatado para facilitar a leitura._

```
curl -i -X POST "https://graph.facebook.com/{app-id}/activities
   ?event=MOBILE_APP_INSTALL
   &application_tracking_enabled=0      
   &advertiser_tracking_enabled=0       
   &advertiser_id={advertiser-tracking-id}
   &{app-access-token}"
```

Se o processo for bem-sucedido, o app receberá a seguinte resposta:

```
{
  "success": true
}
```

#### Atenção

-   Relate somente uma instalação por usuário. Desduplique os IDs nos níveis de usuário e de ID, se possível.
    

Consulte nosso [guia de referência de atividades do app](/docs/graph-api/reference/application/activities/#parameters) para ver uma lista dos parâmetros disponíveis.

[](#)

## Habilitar o rastreamento de anúncios

O campo `advertiser_tracking_enabled` especifica se a pessoa habilitou o rastreamento de anúncios no dispositivo iOS 14.5 ou posterior. Configure 0 para desabilitado ou 1 para habilitado. É preciso buscar os dados e retorná-los ao Facebook para determinar se o rastreamento de anúncio pode ser usado para otimização ou conversões. A Meta usará os dados do evento (de parceiros sobre atividades do usuário fora da Meta) de acordo com a própria Política de Dados, inclusive para geração de relatórios de anúncios, detecção de fraudes, bem como para o desenvolvimento e a melhoria dos nossos produtos (incluindo os produtos de veiculação de anúncios). No entanto, o uso dos dados sobre o usuário será restrito à personalização dos anúncios que são exibidos a ele. Nos dispositivos com versões anteriores ao iOS 6, o parâmetro será 1 por padrão.

Visite a [referência do AdSupport da Apple](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Flibrary%2Fios%2Fdocumentation%2FAdSupport%2FReference%2FASIdentifierManager_Ref&h=AT3-ZGfBJVSIKXRrRUFARPtn2EENye4SemFvSQWsF_FKNuiW6urptzOtZl6gl0TOSKaFU-_7T2hu0cc1KS4IO8kcaFtILcw3STdBXktypPa2ThY01HAwYaXZHpnFTeSwK4Nzxha9mAGOWY4cOjtoc_2ZJdJHfGNc-aXR7PWdA10) para obter o status de rastreamento de um usuário.

O trecho de código a seguir mostra como buscar o valor da sinalização de rastreamento habilitado.

É possível obter a configuração atual da sinalização de rastreamento habilitado pela propriedade `Settings.shared.isAdvertiserTrackingEnabled`.

```
print("isAdvertiserTrackingEnabled: \(Settings.shared.isAdvertiserTrackingEnabled)")
```

### Desabilitar rastreamento de anúncios

Todos os apps podem optar por incluir uma configuração que permite que os usuários desativem o rastreamento de anúncios. O Facebook pede que os parceiros incluam essa opção no SDK e informem sobre a escolha do usuário, assim como sobre o evento de conversão e instalação. O Facebook usa o evento de conversão e instalação para a geração de relatórios de anúncios, mas não autoriza seu uso na otimização de anúncios. A configuração do usuário deve ser a mesma em todas as inicializações do app.

[](#)

## Eventos de conversão

Envie uma solicitação `POST` ao ponto de extremidade `/{app-id}/activities` com `event` definido como `CUSTOM_APP_EVENTS` e defina `advertiser_tracking_enabled` para cada evento. O parâmetro `advertiser_id` ou `attribution` é necessário.

_Texto formatado para facilitar a leitura._

```
curl -i -X POST "https://graph.facebook.com/{app-id}/activities
   ?event=CUSTOM_APP_EVENTS" 
   &advertiser_id={advertiser-tracking-id}
   &advertiser_tracking_enabled=1 
   &application_tracking_enabled=1
   &custom_events=[
      {"_eventName":"fb_mobile_purchase",
       "event_id":"123456",
       "fb_content":"[
            {"id": "1234", "quantity": 2,}, 
            {"id": "5678", "quantity": 1,}
        ]",
       "fb_content_type":"product",
       "_valueToSum":21.97,
       "fb_currency":"GBP",
      }
    ]
   &{app-access-token}"
```

Se o processo for bem-sucedido, o app receberá a seguinte resposta:

```
{
  "success": true
}
```

[](#)

## Atribuição

O ponto de extremidade `attribution` retorna instalações e conversões com base nos cliques em um anúncio no período de 30 dias. O Gerenciador de Anúncios usa uma visualização de 1 dia com um modelo de atribuição de cliques de 28 dias. Além disso, os insights são apresentados com base na impressão ou no tempo de clique, e não no tempo de instalação ou conversão. Isso é importante ao comparar seus relatórios aos do Gerenciador de Anúncios do Facebook. Além das obtenções do evento do app de clique no anúncio, as seguintes situações também são importantes:

-   **Obtenções da atribuição de visualização**: a configuração de `consider_views=TRUE` retornará dados de atribuição para instalações ocorridas dentro de 1 dia de uma impressão de anúncio, desde que a conta da Central de Contas não tenha clicado no anúncio em 30 dias. A resposta retornada será `is_view_through=TRUE`, e `view_time` substituirá `click_time`. Todas as outras atribuições são as mesmas dos dados de atribuição de clique no anúncio.
    
-   **Obtenções entre campanhas**: os anunciantes podem rastrear o desempenho de todos os anúncios que levaram a um evento do app. O Facebook enviará obtenções para eventos de campanhas de anúncios se o objetivo da campanha não estiver definido como engajamento ou instalação do app para celular. Esses dados somente aparecerão se o anunciante tiver adicionado o app ao campo "Rastreamento de eventos de app para celular" no anúncio.
    
-   **Caso do usuário**: se o cliente quiser rastrear as instalações geradas por um anúncio de post da Página ou um anúncio de cliques no site que direciona os usuários a um site para dispositivos móveis, será possível fazer isso no Gerenciador de Anúncios, e o Facebook obterá as instalações de app relevantes.
    
-   **Obtenções entre dispositivos**: os anunciantes que têm apps em diversas plataformas podem ver os dados de instalações impulsionadas por anúncios nessas plataformas.
    
-   **Caso de uso**: um usuário clica em um anúncio de app no iPhone e instala esse app no iPad. Dessa forma, é possível atribuir a instalação do app para iPad ao anúncio do iPhone, independentemente do direcionamento do anúncio.
    

[](#)

## Correspondência avançada

A correspondência avançada permite que você envie dados de clientes para o Facebook, onde usamos esses dados para determinar com mais precisão quais contas da Central de Contas agiram em resposta ao seu anúncio. Com esses dados, o Facebook pode fazer a correspondência de eventos de conversão com seus clientes para otimizar os anúncios e criar públicos de remarketing maiores.

Envie uma solicitação `POST` ao ponto de extremidade `/{app-id}/activities` com o [`ud`](#params) definido como um parâmetro que ajudará a rastrear o cliente, como email ou número de telefone. Todos os dados de clientes precisam estar em hash para que não sejam ignorados pelo Facebook. Lembre-se de definir `advertiser_tracking_enabled` para cada evento.

_Texto formatado para facilitar a leitura._

```
curl -i -X POST "https://graph.facebook.com/{app-id}/activities
   ?event=CUSTOM_APP_EVENTS
   &advertiser_id={advertiser-tracking-id}
   &advertiser_tracking_enabled=1 
   &application_tracking_enabled=1
   &custom_events=[
      {"_eventName":"fb_mobile_purchase",
      "event_id":"123456",
       "fb_content":"[
            {"id": "1234", "quantity": 2,}, 
            {"id": "5678", "quantity": 1,}
        ]",
       "fb_content_type":"product",
       "_valueToSum":21.97,
       "fb_currency":"GBP",
      }
    ]
   &ud[em]={sha256-hashed-email}
   &{app-access-token}"
```

Se o processo for bem-sucedido, o app receberá a seguinte resposta:

```
{
  "success": true
}
```

**É necessário aplicar hash SHA256 a todos os dados de usuário antes que eles sejam enviados ao Facebook. Os dados sem hash serão ignorados pelo Facebook.**

[](#)

## Desduplicação

Para eventos do app, aplicamos a mesma funcionalidade de desduplicação usada com eventos da web. A lógica usa desduplicação baseada no campo `event_id` e no `event_name`. O parâmetro `event_id` é um identificador que distingue eventos semelhantes. IDs de evento imprecisos podem fazer com que a conversão seja desduplicada incorretamente, afetando os relatórios de conversão e o desempenho da campanha.

[](#)

## Informações estendidas sobre dispositivos

Envie informações de dispositivos, como largura e altura de tela, na chamada de evento do app usando `/{app-id}/activities?extinfo`. Os valores são separados por vírgula e precisam estar na ordem exibida no [guia de referência `/application/activites`](/docs/graph-api/reference/application/activities/#parameters). Ao usar `extinfo`, todos os valores são obrigatórios.

-   `version` precisa ser `a2` para Android
    
-   `version` precisa ser `i2` para iOS
    

#### Referência

-   [Parâmetros de atividades do app](/docs/graph-api/reference/application/activities/#parameters)
    
-   [Documentação para desenvolvedores Android – métricas de exibição](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Futil%2FDisplayMetrics.html&h=AT3cJYZnDvxgyrLrBykQNw9Ovty3up_zM98a2Oq9DP21YuXFbU1NVzUpnVGnCju9TY9IE0gRO9YpBtVpq7062t1twIqabXngJXkYEaquzsD8LTU-jzZ7643KE4q9PH9VJb-lVJoDIlnuLvImcRPH8BIMpWz12vdqlX8H0yiLS4gHQldELuZ1UwJ8)
    
-   [Documentação para desenvolvedores do Android – Armazenamento externo](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Fos%2FEnvironment.html%23getExternalStorageDirectory%28%29&h=AT26N-8bRHZHTCVuh9etftT7WGLdFfw7W8GMaSVTiUq7i_237Uie1sYtCFUufJnXBJ7e_L1rRyD-SkXsbAFGoMBJz1-L6jIfRB4TBGT3znaOxcp0HGGdZzuskS7F8xAb_1SNJRToBbsxXvruk5sBQ-iPNLmoPBqXoPneVmhvlCw)
    
-   [Documentação para desenvolvedores Apple – métricas de exibição](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fcoregraphics%2Fcgsize%2F&h=AT385uQv60xRTc3NF5YzrW0eM5HfvGhb2E0WG60S5HMRnZiAJ-j-Z2BPnKJ7iSulEcCL3pj7F9Jp_IP0j-Zois_zkqEe_IYUaGPeYSL-qs7H2xPwmm48fiKvr8pHSkROYpwt3FQX5pmUpEqRMeUXtYf9qCkGNNNzpHwzTrJQiOs)
    
-   [Documentação para desenvolvedores Apple – armazenamento externo](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Ffoundation%2Fnsfilemanager%3Flanguage%3Dobjc&h=AT3STPm5Y_iUwvuF5OLgskZix5noFrGoUvAD1vX_zo0NL3pCWZ6J73mJBxBbzYgVIjv_bBtFbRYNW2mc4bDDNFwW8O1HqwFF5VQcahiXYag7dP50PZyNTepUqGJcYw1sVveIdKzFR45ulcZ4SioPhBsV6VX-AGdArtD-hLo8R0M9SKipCQog02DC)
    
-   [Documentação para desenvolvedores Apple – tamanho da tela](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fuikit%2Fuiscreen%2F1617836-scale%3Flanguage%3Dobjc&h=AT3mFGQ8VFz1YMWHPlgPnRaEOo4FWEwLaj14QipInm5qL7lAowm1RlFfbkzf4YEfjzQLBEVZ1vxyuMt_GlW7Z4FHYixWLP6SmlkaRvGa6ybr5TAbtrl08Uch_GarnFHuv-gYQaqtfzJklUvrskDQWqXGAd17eBSqlURZtIV396E)
    

[](#)

## Obter cookies para dispositivos móveis

Recomendamos que você associe os eventos do app a um `advertiser_id`. No entanto, para dispositivos Android e dispositivos iOS anteriores ao iOS 6, também é possível usar o [parâmetro `attribution`](/docs/graph-api/reference/application/activities/#parameters) definido como o cookie para dispositivos móveis do dispositivo em questão.

Observação: os cookies para dispositivos móveis não são derivados de atributos de usuário ou dispositivo. Esses cookies não são persistentes e foram projetados para atualizações frequentes. Não use cookies para dispositivos móveis para redirecionar anúncios.

### Android

O cookie é uma string aleatória de 22 caracteres alfanuméricos.

Para obter o ID de atribuição do Facebook, use `ContentProvider`:

```
public static final Uri ATTRIBUTION_ID_CONTENT_URI = Uri.parse("content://com.facebook.katana.provider.AttributionIdProvider");

public static final String ATTRIBUTION_ID_COLUMN_NAME = "aid";

public static String getAttributionId(ContentResolver contentResolver) {
        String [] projection = {ATTRIBUTION_ID_COLUMN_NAME};
        Cursor c = contentResolver.query(ATTRIBUTION_ID_CONTENT_URI, projection, null, null, null);
        if (c == null || !c.moveToFirst()) {
            return null;
        }
        String attributionId = c.getString(c.getColumnIndex(ATTRIBUTION_ID_COLUMN_NAME));
        c.close();
        return attributionId;
    }
```

Você também pode [obter o ID de publicidade](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fgoogle%2Fplay-services%2Fid.html&h=AT0X_XOMzfpMDnhS1luQ7M0mEOJwa1dGZybewcpcwDHU1udWvqh-tO6FV6ArTkJ62eXRJ2Hkekxf46JpGfURrVlWmC4SQxZIVa4-YH6nyH9vA23G7zGq24ILnFLnJgeSpMT32GBVnO4C-FBlii1wxkvl8vEfMaST08kk9bT2WZ0) do seu app Android.

### iOS

O cookie para dispositivos móveis é criado pelos apps do Facebook para iOS com `CFUUIDCreateString` e é [uma representação de string do UUID de 128 bits](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FUniversally_unique_identifier&h=AT3L7huU3G-g1ThFuM0diKSnmoKyiKn1SHt4tjD7K0bsKWxGOAo8cEgsqzLeT5-5ZxeTfKRqXKe6aVajgxMyOKWsjHUxhC_04O5V4tuNxu8COIPNTbIaMrlt0mp0hIQ8p0M9F_EwdPimPshCetLh5sXyDSwx-ZpwU59PX1mMED0).

Obtenha a ID do cookie e o IDFA. Depois, envie-os ao Facebook como um identificador:

```
ASIdentifierManager *manager = [ASIdentifierManager sharedManager];
NSString *advertiserID = [[manager advertisingIdentifier] UUIDString];

if (advertiserID) {
  // do stuff
}
```

[](#)

## Cabeçalho HTTP X-Forwarded-For

Se as solicitações `POST` forem feitas de um lugar central, como um servidor/proxy, ou seja, por meio de uma chamada de servidor para servidor, o cabeçalho HTTP X-Forwarded-For será necessário para garantir a precisão da localização e das informações do dispositivo. Envie o endereço IP do dispositivo, nos formatos IPv4 ou IPv6, por meio do parâmetro de cabeçalho HTTP encaminhado, em todas as solicitações enviadas de eventos do app. Com isso, será possível sincronizar o `advertiser_id` com o endereço IP correto que poderá ser usado na nossa plataforma.

#### Exemplo de IPv6

```
curl ...
  -H "X-Forwarded-For: fd45:f238:3b40:23b1:ffff:ffff:ffff:abcd" \
  https://graph.facebook.com/<APP_ID>/activities/
```

#### Exemplo de IPv4

```
curl ...
  -H "X-Forwarded-For: 192.168.0.99" \
  https://graph.facebook.com/<APP_ID>/activities
```

[](#)

## Teste

1.  Acesse o [Gerenciador de Eventos](https://business.facebook.com/events_manager2/list).
2.  Clique no ícone Fontes de dados no lado esquerdo da página.
3.  Selecione o nome e a identificação dos seus dados.
4.  Clique em Eventos de teste e selecione App como canal.
5.  Envie uma solicitação AE-API com a ferramenta [Explorador da Graph API](https://developers.facebook.com/tools/explorer/).
6.  Suas interações serão exibidas na aba Eventos de teste.

[](#)

## Discrepâncias

Caso um cliente compare os relatórios de Parceiros de Métricas para Apps aos relatórios do Facebook e veja discrepâncias, verifique os itens abaixo:

Caso o Facebook relate menos instalações que o MMP:

-   O SDK do Facebook está integrado corretamente?
    
-   O cliente está usando o ID do app errado?
    

Caso o Facebook relate mais instalações que o MMP:

-   As janelas de [atribuição](#attribution) são as mesmas? Normalmente, o Facebook tem uma janela de atribuição maior que a maioria dos Parceiros de Métricas para Apps.
    
-   O SDK do MMP está integrado corretamente?
    
-   O cliente está usando o ID do app errado?
    
-   A discrepância corresponde somente ao iOS 7? O MMP está recebendo o Identificador de Anunciante da Apple (IDFA) do dispositivo e passando-o corretamente para o Facebook?
    

[](#)

## Referência

### Extinfo de atividades de app

Consulte o [guia de referência `/application/activites`](/docs/graph-api/reference/application/activities/#parameters) para saber mais sobre as informações estendidas de app.

### Parâmetros de dados de usuário

[Baixe este arquivo CSV](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=sJH3531AY-cPQI-U_jhyUQ&oh=00_Afumn6-gkTOeIEGrITaRkMSyONyTXRSw_SzmzQg_H2LugA&oe=698522E4)

para ver exemplos de dados com hash adequadamente normalizados e convertidos para os parâmetros abaixo.

  
  
[Baixar (Clique com o botão direito do mouse > Salvar link como)](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/314008612_2367937923355843_814664035015443172_n.csv?_nc_cat=101&ccb=1-7&_nc_sid=b8d81d&_nc_ohc=zs3tu_5vdSYQ7kNvwHD3LFg&_nc_oc=AdkIWpifKCuFVJqe5yFdZfUovb7u19EEYStxqBhreMVZCkJXgJYKIdR-_wKFAzH-dB7Eh8xx6OHFQgAnglCqV3wC&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=sJH3531AY-cPQI-U_jhyUQ&oh=00_Afumn6-gkTOeIEGrITaRkMSyONyTXRSw_SzmzQg_H2LugA&oe=698522E4)

### Parâmetros de dados de informações do cliente

Dados

Parâmetro

Exemplo

Orientação de formato

Cidade

`ct`

menlopark

Cidade em letras minúsculas com espaços removidos

País

`country`

EUA

Código do país com duas letras conforme a norma ISO 3166-1 alpha-2

Data de nascimento

`db`

19911226

Data de nascimento no formato ano, mês e dia (por exemplo, `19971226` para 26 de dezembro de 1997)

Email

`em`

jsmith@exemplo.com

Endereço de email da pessoa em letras minúsculas

Nome

`fn`

john

Nome em letras minúsculas

Gênero

`ge`

m

`f` ou `m`, se desconhecido, deixe em branco

Sobrenome

`ln`

smith

Sobrenome em letras minúsculas

Telefone

`ph`

16505551212

Número de telefone, somente dígitos com código do país, código de área e número

Estado

`st`

ca

Código de estado com duas letras

CEP

`zp`

94035

Código de CEP com cinco dígitos

[](#)

### Nomes de evento padrão

Event Name

Event Parameters

\_valueToSum

`AdClick`

`fb_ad_type`

`AdImpression`

`fb_ad_type`

With App Ads, revenue of ads from a third-party platform appears on-screen within your app.

`Contact`

`CustomizeProduct`

`Donate`

`fb_mobile_achievement_unlocked`

`fb_description`

`fb_mobile_activate_app` \*

`fb_mobile_add_payment_info`

`fb_success`

`fb_mobile_add_to_cart`

`fb_content_type`, `fb_content_id` and `fb_currency`

Price of item added

`fb_mobile_add_to_wishlist`

`fb_content_type`, `fb_content_id` and `fb_currency`

Price of item added

`fb_mobile_complete_registration`

`fb_registration_method`

`fb_mobile_content_view`

`fb_content_type`, `fb_content_id` and `fb_currency`

Price of item viewed (if applicable)

`fb_mobile_initiated_checkout`

`fb_content_type`, `fb_content_id`, `fb_num_items`, `fb_payment_info_available` and `fb_currency`

Total price of items in cart

`fb_mobile_level_achieved`

`fb_level`

`fb_mobile_purchase`

`fb_num_items`, `fb_content_type`, `fb_content_id` and `fb_currency`

Purchase price

`fb_mobile_rate`

`fb_content_type`, `fb_content_id` and `fb_max_rating_value`

Rating given

`fb_mobile_search`

`fb_content_type`, `fb_search_string` and `fb_success`

`fb_mobile_spent_credits`

`fb_content_type` and `fb_content_id`

Total value of credits spent

`fb_mobile_tutorial_completion`

`fb_success` and `fb_content_id`

`FindLocation`

`Schedule`

`StartTrial`

`fb_order_id` and `fb_currency`

Price of subscription

`SubmitApplication`

`Subscribe`

`fb_order_id` and `fb_currency`

Price of subscription

\*Use `fb_mobile_activate_app` event in addition to [install reporting](#installs) to exclude users from seeing ads for this app. **Do not use this event if you have [automatic event logging](/docs/app-events/automatic-event-collection-detail) enabled.**

[](#)

### Parâmetros de evento padrão

Nome do parâmetro de evento

Valor

Descrição

`_logTime`

int

Recomendar parâmetro para especificar o horário do evento, determinado no horário Unix

`_valueToSum`

float

Valor número de evento individual a ser somado nos relatórios, confira abaixo os eventos recomendados que podem ser anexados

`fb_content_id`

string

International Article Number (EAN), quando aplicável, ou outros identificadores de conteúdo ou produto. Para vários números de identificação do produto: por exemplo, "\[\\"1234\\",\\"5678\\"\]"

`fb_content`

string

Uma lista de objetos JSON que contêm o EAN (International Article Number), quando aplicável, ou outro identificador de produto ou conteúdo, assim como as quantidades e os preços dos produtos. **Obrigatório**: `id`, `quantity`. Por exemplo, "\[{\\"id\\": \\"1234\\", \\"quantity\\": 2,}, {\\"id\\": \\"5678\\", \\"quantity\\": 1,}\]".

`fb_content_type`

string

O `product` ou `product_group`

`fb_currency`

string

Código ISO 4217, por exemplo, "EUR", "USD", "JPY". Exigido ao transmitir `_valueToSum` como um preço ou valor de compra.

`fb_description`

string

Uma descrição de string

`fb_level`

string

Nível de um jogo

`fb_max_rating_value`

int

Limite máximo de uma escala de classificação, por exemplo, 5 em uma escala de 5 estrelas

`fb_num_items`

int

Número de itens

`fb_payment_info_available`

booliano

`1` para sim, `0` para não

`fb_registration_method`

string

Facebook, Email, Twitter, entre outros.

`fb_search_string`

string

A string do texto que foi pesquisado

`fb_success`

booliano

`1` para sim, `0` para não

[](#)

## Veja também

-   [Eventos do App](/docs/app-events)
    
-   [Guia de boas práticas para eventos do app](/docs/app-events/best-practices)
    
-   [Como lidar com erros](/docs/graph-api/using-graph-api/error-handling)
    
-   [Conformidade com RGPD](/docs/app-events/gdpr-compliance)
    
-   [Gerenciador de Anúncios do Facebook](https://www.facebook.com/ads/manager/accounts/)
    
-   [Painel de Apps do Facebook](/apps)
    

[](#)