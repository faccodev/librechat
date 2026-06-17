---
title: "Graph API Referência v24.0: Ad Account Targetingsearch"
source: "https://developers.facebook.com/docs/marketing-api/reference/ad-account/targetingsearch/"
scraped_at: "2026-02-01T16:04:35.168Z"
---

Versão Graph API

[v24.0](#)

# Ad Account Targetingsearch

[](#)

## Leitura

Unified search endpoint to get targeting descriptors with query

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bad-account-id%7D%2Ftargetingsearch&version=v24.0)

```
GET /v24.0/{ad-account-id}/targetingsearch HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{ad-account-id}/targetingsearch',
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
    "/{ad-account-id}/targetingsearch",
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
    "/{ad-account-id}/targetingsearch",
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
                               initWithGraphPath:@"/{ad-account-id}/targetingsearch"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Parâmetro

Descrição

`allow_only_fat_head_interests`

boolean

Allow only pre vetted interests

`app_store`

enum {all\_app\_stores\_for\_android\_and\_ios, amazon\_app\_store, google\_play, itunes, itunes\_ipad, fb\_canvas, fb\_gameroom, windows\_store, fb\_android\_store, windows\_10\_store, roku\_channel\_store, instant\_game, oculus\_app\_store, horizon\_world, galaxy\_store, neon\_android\_store, digital\_turbine\_store, apk\_pure, apk\_monk, apk\_mirror, xiaomi, oppo, vivo, bemobi\_mobile\_store, aptoide\_a1\_store, uptodown, does\_not\_exist, none}

The app store for which this ad is being promoted. This is typically only for app install campaign objectives.

`limit_type`

enum {adgroup\_id, genders, age\_min, age\_max, age\_range, country\_groups, countries, country, cities, city\_keys, radius, regions, region\_keys, zips, interests, location\_cluster\_ids, keywords, education\_schools, education\_majors, work\_positions, work\_employers, relationship\_statuses, interested\_in, locales, user\_adclusters, excluded\_user\_adclusters, conjunctive\_user\_adclusters, custom\_audiences, excluded\_custom\_audiences, cafe\_ca\_expansion\_targeting\_signal, cafe\_ca\_contraction\_targeting\_signal, expanded\_implicit\_custom\_audiences, tafe\_ca\_mitigation\_strategy, college\_years, education\_statuses, connections, excluded\_connections, friends\_of\_connections, user\_event, dynamic\_audience\_ids, excluded\_dynamic\_audience\_ids, rtb\_flag, site\_category, geo\_locations, excluded\_geo\_locations, timezones, place\_page\_set\_ids, location\_expansion, page\_types, publisher\_platforms, effective\_publisher\_platforms, facebook\_positions, effective\_facebook\_positions, instagram\_positions, effective\_instagram\_positions, messenger\_positions, effective\_messenger\_positions, device\_platforms, effective\_device\_platforms, audience\_network\_positions, effective\_audience\_network\_positions, whatsapp\_positions, effective\_whatsapp\_positions, oculus\_positions, effective\_oculus\_positions, threads\_positions, effective\_threads\_positions, excluded\_publisher\_categories, excluded\_publisher\_list\_ids, user\_device, mobile\_device\_model, excluded\_user\_device, excluded\_mobile\_device\_model, user\_os, wireless\_carrier, marketing\_message\_channels, subscriber\_universe, user\_age\_unknown, family\_statuses, industries, life\_events, political\_views, politics, behaviors, income, net\_worth, home\_type, home\_ownership, home\_value, ethnic\_affinity, generation, household\_composition, moms, office\_type, household\_income, targeting\_optimization, direct\_install\_devices, targeting\_automation, targeting\_relaxation\_types, engagement\_specs, excluded\_engagement\_specs, product\_audience\_specs, excluded\_product\_audience\_specs, exclusions, flexible\_spec, dt\_consolidation\_state, exclude\_reached\_since, exclude\_previous\_days, app\_install\_state, install\_state\_application, fb\_deal\_id, interest\_defaults\_source, alternate\_auto\_targeting\_option, contextual\_targeting\_categories, topic, format, trending, gatekeepers, follow\_profiles, follow\_profiles\_negative, location\_categories, user\_page\_threads, user\_page\_threads\_excluded, is\_whatsapp\_destination\_ad, marketplace\_product\_categories, instream\_video\_sponsorship\_placements, prospecting\_audience, brand\_safety\_content\_severity\_levels, catalog\_based\_targeting, brand\_safety\_content\_filter\_levels, excluded\_brand\_safety\_content\_types, id, is\_instagram\_destination\_ad, instagram\_hashtags, instream\_video\_skippable\_excluded}

Limit the type of audience to retrieve

`objective`

enum{APP\_INSTALLS, BRAND\_AWARENESS, CONVERSIONS, EVENT\_RESPONSES, LEAD\_GENERATION, LINK\_CLICKS, LOCAL\_AWARENESS, MESSAGES, OFFER\_CLAIMS, OUTCOME\_APP\_PROMOTION, OUTCOME\_AWARENESS, OUTCOME\_ENGAGEMENT, OUTCOME\_LEADS, OUTCOME\_SALES, OUTCOME\_TRAFFIC, PAGE\_LIKES, POST\_ENGAGEMENT, PRODUCT\_CATALOG\_SALES, REACH, STORE\_VISITS, VIDEO\_VIEWS}

The objective of the ad campaign.

`q`

string

Search query

Obrigatório

`regulated_categories`

array<enum {NONE, EMPLOYMENT, HOUSING, CREDIT, ISSUES\_ELECTIONS\_POLITICS, ONLINE\_GAMBLING\_AND\_GAMING, FINANCIAL\_PRODUCTS\_SERVICES}>

The regulated categories of the campaign.

### Campos

A leitura desta borda retornará um resultado formatado em JSON:

```
data
```

#### `data`

Uma lista de nós AdAccountTargetingUnified.

#### `paging`

Para saber mais detalhes sobre paginação, consulte o [Guia da Graph API](/docs/graph-api/using-graph-api/#paging).

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

190

Invalid OAuth 2.0 Access Token

[](#)

## Criando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Atualizando

Não é possível executar esta operação neste ponto de extremidade.

[](#)

## Excluindo

Não é possível executar esta operação neste ponto de extremidade.

[](#)