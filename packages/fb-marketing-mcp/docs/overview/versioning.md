---
title: "Controle de versões - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/overview/versioning"
scraped_at: "2026-02-01T13:51:57.400Z"
---

# Controle de versões

A versão atual da API de Marketing é `v24.0`.

A plataforma do Facebook tem um modelo de [controle de versões](/docs/apps/versions) principal e um ampliado. Com o controle de versões da API de Marketing, todas as alterações importantes serão lançadas em uma nova versão. As diversas versões das APIs de Marketing ou dos SDKs podem coexistir com funcionalidades diferentes em cada versão.

Os desenvolvedores devem saber com antecedência quando uma API de Marketing ou um SDK sofrerá alterações. Embora haja uma janela de 90 dias para adotar as alterações, a escolha de como e quando passar para a nova versão é sua.

## Cronograma de versões

Quando uma nova versão da API de Marketing é lançada, mantemos a compatibilidade com a versão anterior por pelo menos 90 dias. Isso significa que você terá esse período de carência para atualizar sua versão. Durante esses 90 dias, você poderá fazer chamadas para a versão atual e a obsoleta. Depois desse prazo, será necessário atualizar para a nova versão. Ao término do período de carência, a versão obsoleta deixará de funcionar. Depois que uma versão ficar indisponível, as chamadas feitas para ela poderão falhar ou ser atualizadas para a próxima versão disponível.

Por exemplo, a API de Marketing v17.0 foi lançada em 23 de maio de 2023, e a v16.0 expirou em 6 de fevereiro de 2024, fornecendo ao menos 90 dias para fazer a atualização para a nova versão.

Veja um exemplo de cronograma. Talvez não lancemos uma nova versão no final do período de carência de 90 dias da versão anterior. No exemplo, a v16.0 fica obsoleta um pouco antes do lançamento da v18.0:

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=928315895310370&version=1765853136)

No caso dos SDKs, uma versão está sempre disponível no estado atual como um pacote para download. Depois do fim de vida útil, o SDK continuará se baseando nas APIs de Marketing ou em métodos que não funcionam mais; por isso, presuma que ele não funcionará mais no fim de vida útil.

[](#)

## Como fazer solicitações de controle de versões

Todos os pontos de extremidade da API de Marketing estão disponíveis por meio de um caminho com controle de versões. Pré-anexe o identificador de versão no início do caminho da solicitação. Por exemplo:

```
v24.0
```

Isso funciona para todas as versões, neste formato geral:

```
https://graph.facebook.com/v{n}/{request-path}
```

Nele, `n` é a versão necessária. Confira a lista completa das versões disponíveis no [Registro de alterações](/docs/marketing-api/marketing-api-changelog). Todas as [referências da API de Marketing](/docs/ads-api/) fornecem informações por versão.

[](#)

## Migrações

As migrações são somente para casos especiais, nos quais as alterações que precisam ser feitas não podem entrar no controle de versões. Normalmente, isso ocorrerá se o modelo de dados básicos tiver sido alterado. Migrações aplicam-se a todas as versões.

As migrações que ainda estão em andamento aparecem listadas na nossa [página de migrações](/docs/apps/migrations). As migrações têm uma janela de pelo menos 90 dias, durante a qual você deverá migrar o app. Uma vez iniciada a janela, o comportamento pós-migração se tornará o padrão para os novos apps. Depois, quando a janela de migração tiver sido concluída, o comportamento pré-migração não estará mais disponível.

### Como gerenciar migrações por meio da Graph API

As migrações podem ser gerenciadas por meio do [campo de migrações do nó `/app`](/docs/graph-api/reference/app#migrations):

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/851536_1489594524589968_837178731_n.png?_nc_cat=102&ccb=1-7&_nc_sid=34156e&_nc_ohc=5twdrC4stisQ7kNvwG4Pbm2&_nc_oc=AdkXgZkN51gGf8VRrA7qrLopZJacrq5K-qy17lWYG26mwbPXlJ-By447YJo1RtOJZamFW8ouTwZPydemnO3K1DsO&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=367AAYM5Xx5e1kVz-D6AzQ&oh=00_AftTeiSSy1jRAQ_PjuJWs2O57D5WNCko4HfUAWnWS-VlQQ&oe=698523D6)

É possível [fazer uma chamada de atualização na borda](/docs/graph-api/reference/app#migrations) para ativar e desativar migrações.

### Como gerenciar migrações por meio do Painel de Apps

Você pode ativar e desativar as migrações disponíveis no [Painel de Apps](/apps), em **Configurações** > **Migrações**. Vale ressaltar que a lista de migrações pode não ser a mesma da imagem abaixo, já que as migrações disponíveis são específicas para cada app, em momentos diferentes. Caso você veja uma migração `Use Graph API v2.0 by default`, ela será para Graph API somente, não para a API de Marketing.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/851536_685750501484007_289214519_n.png?_nc_cat=108&ccb=1-7&_nc_sid=34156e&_nc_ohc=2QP0CEhZMIsQ7kNvwFkzmUP&_nc_oc=AdnzD4QAiU6YM3y3QphhlggaaDJ34p1Ph4dSn7OuQPa9sPbZWFJAoRtgrBGWF2-0CftfxifIJ-0GWOqrOD4_xy5W&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=367AAYM5Xx5e1kVz-D6AzQ&oh=00_Aft6Pvo9tir96so7btbe9LwKMerAf5u3h2hruBl01qX1Mw&oe=69852930)

### Ativação temporária de migrações no lado do cliente

Em vez de ativar a migração pelo Painel de Apps ou pela API de Marketing, é possível adicionar uma sinalização especial definindo a migração para chamadas da API de Marketing. A sinalização é chamada de `migrations_override` e exige que você defina um blob JSON que descreva as migrações a serem ativadas ou desativadas. Por exemplo, se fosse fazer uma chamada bruta, você poderia passar:

```
http://graph.facebook.com/path?
  migrations_override={"migration1":true, "migration2":false}
```

Com isso, é possível fazer chamadas à nova API de Marketing por meio de atualizações do cliente, em vez de fazer todos atualizarem para fazer chamadas a ela ao mesmo tempo. Isso também é útil para depuração.

Você pode encontrar os nomes dessas migrações no nó [`/app` mencionado acima](#manage-migrations-via-graph-api).

[](#)

## Atualização automática da versão

Devido à rápida rotatividade das versões da API de Marketing, que mudam aproximadamente a cada quatro meses, estamos simplificando o processo de atualização. A partir de maio de 2024, habilitaremos o recurso de atualização automática da versão para os pontos de extremidade da API de Marketing que não são afetados entre as versões. Isso significa que, entre uma versão prestes a ficar obsoleta e a próxima disponível, se nenhum ponto de extremidade for afetado, a plataforma atualizará a chamada para a versão a ser lançada, em vez de gerar uma falha na solicitação diretamente. Essa mudança foi pensada para garantir uma experiência mais tranquila e eficiente com a API.

Por exemplo, no dia 14 de maio de 2024, a v17.0 ficará obsoleta. De acordo com o [registro de alterações da v18.0](/docs/marketing-api/marketing-api-changelog/version18.0), os seguintes pontos de extremidade serão afetados:

-   `POST /act_{ad-account-id}/reachfrequencypredictions`
    
-   `GET /act_{ad-account-id}/reachestimate`
    
-   `GET /act_{ad-account-id}/delivery_estimate`
    
-   `POST /act_{ad-account-id}/adsets`
    
-   `POST /{adset-id}`
    
-   `POST /act_{ad-account-id}/saved_audiences`
    
-   `POST /{saved-audience-id}`
    
-   `POST /act_{ad-account-id}/credit_cards`
    

Caso seu app faça uma chamada `POST /{adset-id}` com a v17.0 depois que ela ficar obsoleta no dia 14 de maio de 2024, essa solicitação da API falhará, já que a atualização automática não se aplica aos pontos de extremidade afetados pela próxima versão disponível (v18.0).

Se o app fizer uma chamada `GET /{ad-account-id}/insights` com a v17.0 depois que ela ficar obsoleta, a plataforma atualizará sua solicitação para a próxima versão disponível (v18.0).

**Observação**: caso seu app já esteja fazendo chamadas com versões posteriores à v17.0, nada mudará na data em que a versão ficar obsoleta.

Para verificar os pontos de extremidade afetados em cada versão, consulte o [registro de alterações da API de Marketing](/docs/marketing-api/marketing-api-changelog).

[](#)

## Perguntas frequentes

### Cronograma de versões

[What if I don't specify a version for the Marketing API?](#faq_427988163217772)

We refer to this as an **unversioned** call. Unversioned calls are invalid and will fail when made against Marketing API endpoints.

[Link permanente](#faq_427988163217772)

[Can I make calls to versions older than the current version?](#faq_292743143916083)

You can call the version of the Marketing API that was the latest available when the app was created, as long as it has not been deprecated. It can also make calls to any newer, undeprecated versions launched after the app is created.

Starting May 14, 2024, if a deprecated version is provided, the platform may upgrade selected endpoints to the next available version instead of failing the request. To learn more about the behavior, refer to [Marketing API Auto-version upgrade](#version-auto-upgrade).

For example:

-   If your app was created before the launch of v17.0, while v16.0 was available, then it will be able to make calls to v16.0 until the expiration date of that version. After v16.0 has been deprecated, calls to v16.0 will fail.
-   If your app was created after v17.0 was released, it will be able to make calls to v17.0 until the expiration date of that version, and any subsequent versions (v18.0, etc) until their expiration dates. After v17.0 has been deprecated, calls to v17.0 will fail.
-   Your app will not be able to make calls to v16.0, since 1) that was before your app was created and 2) that version is deprecated and calls to v16.0 may fail or be upgraded to the next available version.

If an app was not used - to make any Marketing API calls or requests - after being created, it will not have the ability to use those versions if any newer version is launched. Here's another example to explain this:

-   If your app was created while v16.0 was the latest version available, but not used until after v17.0 had launched, it will only be to use v17.0, and not v16.0.
-   If your app was created while v16.0 was the latest version available, and then used before v17.0 had launched, it will still be able to use v16.0 even after the launch of v17.0.

[Link permanente](#faq_292743143916083)

[How is this different from Platform API versioning?](#faq_1089302298789612)

There are a few differences between how Marketing API and the rest of Graph API. For the details on Platform API versioning, see [Graph API, Versioning](/docs/apps/versions).

1.  Marketing API is versioned on a 90-day deprecation schedule, whereas Platform API has core and extended APIs with a 2 year guarantee for core APIs.
2.  Marketing API does not support unversioned calls. If you do not specify a working version in your call, it fails.

[Link permanente](#faq_1089302298789612)

### Como fazer solicitações de controle de versões

[How is this different than migrations?](#faq_799762958198668)

With migrations, you set migration on or off in App Dashboard, as described in the [Migrations](#migrations) section. With versioning, we are making Marketing API functionality more transparent by moving the setting into the endpoint:

```
https://graph.facebook.com/v{n}/{request-path}
```

You can know what behavior to expect out without having to manually visit your app's migration panel.

[Link permanente](#faq_799762958198668)

### Atualização automática da versão

[Does the upgrade only apply to the version to be deprecated and the next available version?](#faq_3545761025675240)

The upgrade will apply on any deprecated version to the next available version. This means hypothetically if your app is making calls to v15.0 after v16.0 is deprecated, the call will also be upgraded to v17.0 if the endpoint is not listed as affected endpoint on both v16.0 and v17.0.

[Link permanente](#faq_3545761025675240)

[Does this mean developers don't need to do anything during version deprecation?](#faq_2254842978219172)

No. We highly encourage developers to perform version upgrades before a version gets deprecated for the following reasons

-   You may still need to manually upgrade endpoints being impacted by next version.
-   You might want to upgrade to newer versions to benefit from new features instead of the lowest available version.

[Link permanente](#faq_2254842978219172)

[How can I find out which endpoints will not be auto-upgraded?](#faq_968773524857672)

You can look up affected endpoints from [Marketing API Changelog](/docs/marketing-api/marketing-api-changelog).

[Link permanente](#faq_968773524857672)

[How can I opt-out of this behavior?](#faq_2322796654576360)

You can disable the version auto-upgrade via the **Marketing API Version** setting under **Marketing API App Product Page** > **Settings**.

[Link permanente](#faq_2322796654576360)

[Can I check if any specific API call has been auto-upgraded?](#faq_328062030285054)

If an API call targets a version that has been deprecated and has been automatically upgraded, an API response header is included for any call that has been auto-upgraded.

Example notification header

```
X-Ad-Api-Version-Warning: 'X-Ad-Api-Version-Warning: 'The call has been auto-upgraded to vXXX as vXXX has been deprecated''
```

[Link permanente](#faq_328062030285054)

[](#)