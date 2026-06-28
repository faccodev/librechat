---
title: "Encontrar o ID de lead - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id"
scraped_at: "2026-02-01T15:49:00.981Z"
---

# Como encontrar o ID de lead da Meta

`lead_id` é um campo obrigatório usado na integração do CRM de leads de conversão, que carrega eventos de volta para a Meta para ajudar a gerar leads de maior qualidade, conforme detalhado em [Especificação de carga](/docs/marketing-api/conversions-api/conversion-leads-integration). É um número único de 15 a 17 dígitos atribuído a leads gerados na Meta e pode aparecer em diferentes campos dependendo da forma como o lead é baixado. Nesta seção, mostraremos alguns exemplos de onde o ID de lead da Meta pode estar localizado ao usar métodos comuns de download de leads. Assim, você poderá armazená-lo no seu CRM e depois usá-lo para carregar eventos de volta para a Meta.

O ID de lead da Meta deve ser associado a um campo no seu CRM antes de poder usá-lo para carregar eventos de volta para a Meta.

## Leitura em massa de Webhook ou da Graph API

O ID de lead da Meta será armazenado no campo `id` do nó de lead se você baixar leads usando um Webhook ou a Graph API.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=523827676169685&version=1743609420)

Você também pode obter o ID de lead da Meta a partir do campo `leadgen_id` na resposta de geração de leads do Webhook.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=384345930569518&version=1743609420)

Consulte [Webhooks da Meta sobre anúncios de cadastro para a gestão do relacionamento com o cliente](/docs/marketing-api/guides/lead-ads/quickstart/webhooks-integration) e o [Guia de desenvolvedores de leitura em massa](/docs/marketing-api/guides/lead-ads/retrieving#bulk-read) para obter mais informações sobre essas integrações.

[](#)

## Integrações de parceiros

### Zapier

O ID de lead da Meta será armazenado no campo **id** ao baixar leads usando o app trigger Facebook Lead Ads do Zapier. Você poderá ver isso primeiro em um disparo de teste em que o Zapier extrai um lead da Meta.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1538853029904381&version=1743609420)

Na app action do Zapier, salve o ID de cadastro da Meta associando-o ao campo de ID de lead padrão no seu CRM ou a um campo personalizado se não existir.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=754611162428384&version=1743609420)

### Leadsbridge

O ID de lead da Meta será armazenado no campo **id** ao baixar leads por meio do app Anúncios de leads do Facebook do Leadbridge. Na seção **Fields Mapping**, salve o ID de lead da Meta associando-o ao campo de ID de lead padrão no seu CRM ou a um campo personalizado se ele não existir.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=408941107995673&version=1743609420)

### Make (Integromat)

O ID de lead da Meta será armazenado no campo **Lead ID** ao baixar leads por meio do cenário Facebook Lead Ads do Make. Na seção **Properties**, salve o ID de lead da Meta associando-o ao campo do ID de lead padrão no seu CRM ou a um campo personalizado se ele não existir.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=3455923841337044&version=1743609420)

## Integrações diretas de CRM

### Salesforce – Captura de leads

Quando você baixar leads usando o [recurso Lead Capture do Salesforce Advertising Studio](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.salesforce.com%2Fs%2FarticleView%3Fid%3Dsf.mc_ads_lead_capture&h=AT316pRue2RR7n3--AKO_G2H6LlyLxyuuIxxxKAxqbfsD3AYKj34xvSzsC4WvzGfoRzbB17wet1xt7DRiA0Vby-whhTWfZU2H3oOe9ldFyguDo6Dwkkh4z9ef4suyg7W7pZH0-lGor41PudP_keT15yZEQBsWdlP1kovao8aKMc), o ID de lead da Meta será armazenado no campo **Lead ID**. Na seção **Configure Fields**, salve o ID de lead da Meta associando-o a um campo personalizado criado para isso.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=769071831030583&version=1743609420)

### Hubspot – Sincronização de leads

A integração com a [sincronização de leads](https://l.facebook.com/l.php?u=https%3A%2F%2Fknowledge.hubspot.com%2Fads%2Fsync-leads-from-your-facebook-page-or-linkedin-ads-account-to-hubspot&h=AT3UTQ8xZ_FUzxAMy25_a2AcMsjDYJ-ckbXMUStfTR_vjmz6DB_Sk37cq8RkQ2I9ARIFmZ1kGNWhN6R38hJQ4iQ6dzK_slHA6kwK2s8Hdr5NuHpj-r1yFJHtoxzqqJmtb0TgpSFFjxeuySzwQOV6JAIXBojchtalSdUYVPUNFeA) do Hubspot não armazena o ID de lead da Meta. Baixe seus leads por meio de um webhook ou de uma integração de parceiros para poder carregar eventos de leads de conversão. Como alternativa, você pode sincronizar os eventos usando a opção [Alteração da fase do ciclo de vida](https://l.facebook.com/l.php?u=https%3A%2F%2Fknowledge.hubspot.com%2Fads%2Fcreate-and-sync-crm-lifecycle-events-with-your-google-ads-or-facebook-ad-accounts&h=AT3j1CXr-aRBPs1g34vk9Q9-wuRTBPHnRu8v3eN9JDjxtlnsCIsd1G_SFVyoA50C33ok3bTz-bRXtx0_0y-74xzV3l-ZyciS87xdNNCxRNsQvn3m6FLjLi9TbTCcqC7qqy0Q-bX1dsm6tDBaEQgove4G_KukRqj8tfBJUv4tsvI) do Hubspot (apenas Professional e Enterprise).

### Zoho CRM – Social

A [integração social](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.zoho.com%2Fsocial%2Ffacebook%2Ffacebook-lead-generation.html&h=AT0SrWG_eUDbig3--ThZ-gz9b2lqU8eXNCiYeH7UFCVZ53xNbqbbcwRdzHsYJWwRRPGlm8W2Nk4-03HLauDdrra7_hJfrnEzLe5WoPn6ng19aD9Yiz-Qh4rJmXYjcl3_sZDYhwSdVL4TChoyjw32ClWbaw_-ZE3_PAH9Nv_VT7A) do CRM do Zoho não armazena o ID de lead da Meta. Baixe seus leads por meio de um webhook ou de uma integração de parceiros para poder carregar eventos de leads de conversão.

### Microsoft Dynamics 365

O Microsoft Dynamics 365 não aceita uma integração de leads. Baixe seus leads por meio de um webhook ou de uma integração de parceiros para poder carregar eventos de leads de conversão.

[](#)

## Download manual de arquivos

O ID de lead da Meta será a primeira coluna com rótulo **id** no arquivo `.csv` ao baixar manualmente seus leads a partir do Gerenciador de Anúncios ou do Business Suite. Talvez seja necessário tirar o rótulo principal antes de usá-lo como chave de correspondência.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=765769594701512&version=1743609420)

**Nota:** esse método de baixar leads não é recomendado para utilização em integrações.

[](#)