---
title: "Teste e solução de problemas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/guides/lead-ads/testing-troubleshooting"
scraped_at: "2026-02-01T14:12:21.581Z"
---

# Teste e solução de problemas

Use esta API para criar e excluir leads de teste.

## Como usar a ferramenta de teste

Use [esta ferramenta](/tools/lead-ads-testing) para criar e excluir leads de teste dos seus formulários. **No entanto, não é possível usar a ferramenta no modo de desenvolvimento**.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/12809151_1065557623487088_1026878730_n.png?_nc_cat=106&ccb=1-7&_nc_sid=34156e&_nc_ohc=XpQmFE9JzccQ7kNvwEfMUME&_nc_oc=AdmoBI37Vm9CyNKw1X04Tstzr70eFxMMspD8N_CczJKOuru1TEcICpcSH-FHGbwF8f4jFUc9uMLx9uTP5JiWFT_P&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_AfuKO-_ZwhNbuq4Hs4sxilvAtaly_qaeo-XR13Uu6Qci4Q&oe=69854531)

Você pode criar um lead de teste por formulário. É preciso excluir um lead existente para criar um novo.

[](#)

## Depurar a integração da atualização em tempo real

Use esta ferramenta para testar se a integração com os Webhooks do Facebook foi bem-sucedida. Consulte as etapas a seguir se quiser usar a ferramenta para depurar a integração.

Os leads criados com a ferramenta são orgânicos, sem associação a anúncios. É possível criar somente um lead por formulário. Por isso, se quiser recriar um lead no mesmo formulário, clique em **Excluir lead** primeiro e, depois, crie-o novamente.

1.  Acesse a [**ferramenta de teste**](https://developers.facebook.com/tools/lead-ads-testing).
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13178084_274726416198162_1283779901_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=WNFCn0dkSe4Q7kNvwEvGUjT&_nc_oc=AdlCR8jKAQe2WvQ4ziM7PKNZrwgbgMAoxeNWUJcJHEzpr2VLbtO2UN4RXnLm6o4-2Y385fBscFQ_wTf2Dcv0-5KX&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_Afsnm0BlwpWV6OQ79JQVgLcl7zHJfLvJQXpX-1rj4D00Fw&oe=69853D03) O menu suspenso lista todas as páginas a que você tem acesso de anunciante.  
  
6.  Selecione uma página no menu suspenso.
  
8.  Em **Formulário**, selecione a opção que será usada para criar um lead.
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13178154_1750917341788948_849702040_n.png?_nc_cat=111&ccb=1-7&_nc_sid=34156e&_nc_ohc=miDqfJJcBuEQ7kNvwF0RRa2&_nc_oc=Admx3DzjQukjSd0EDV-KzWqG4lTOon4C1pNDUIsM2V3FRMtFntWTzVM1wb3zKOx9vRW0hc38FssfbAGYHIloqdr6&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_AftAR5P00u5Ja8nbHB6JxAF6IsPY3hVtmu8pRuzjHQAjPw&oe=698516FC)11.  Clique em **Criar lead** para iniciar o processo de criação. Por padrão, o lead criado contém dados fictícios.
  
13.  Clique em **Ver prévia do Formulário** para personalizar os dados enviados.
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13065827_1282098528485992_1296150406_n.png?_nc_cat=111&ccb=1-7&_nc_sid=34156e&_nc_ohc=itX9qJBm4kUQ7kNvwFvTtvI&_nc_oc=Adn7QseEujpgyzlbpx9eHa69OtFxZkIPJiM-izcOqk3oKMlYOfBfDecOKkCAm7r6qSK8mGM-AA4UAURzr5aG8hEd&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_AfvG36lBmzXl3HgqPXjDUVosbnfB33YbHvFBVFbFejQTEw&oe=6985486E)16.  Digite os dados desejados no nível do formulário para criar um lead com o conteúdo personalizado.
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13065894_712305012240818_265737728_n.png?_nc_cat=100&ccb=1-7&_nc_sid=34156e&_nc_ohc=Z-JR84wKSxcQ7kNvwEdptAv&_nc_oc=Adn0KXNsm7JHBYH9Io5FlTpnzI-7gfo3gDH2bNygmsufEKLsEDC7uchmlt8D6R6Vs2i2v4Ga73nAjHt8ztBtkzVh&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_AfvlPqfQK9CFiPsJCtS47IZovrM9SDjD4Lf2Atfa8Ag51Q&oe=698523C1)19.  Depois de criar o lead, você verá o botão **Acompanhar status**.
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13176370_176892369376657_768033325_n.png?_nc_cat=110&ccb=1-7&_nc_sid=34156e&_nc_ohc=zmw58iiLVv8Q7kNvwFf4I6f&_nc_oc=AdkbjCbNIPiBKQlX73UUufeHAqxzFj8pxSs4mexjD9YTgi5ZeEMe0IsElxl1Hy0ypkgTWlM8fBc-jjB8ZyT4lp5e&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_Afsio26rU57xtBWb0tazL3C8MdHrXjJz9_SX7bvx282hAg&oe=69853274)22.  Clique em **Acompanhar status** para ver o status dos leads. Demora alguns segundos para a atualização em tempo real ser disparada no seu ponto de extremidade. Enquanto isso, você verá a atualização com status **pendente**. Clique em **Acompanhar status** até você ver a mudança.
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13178161_1708581306046720_203889188_n.png?_nc_cat=104&ccb=1-7&_nc_sid=34156e&_nc_ohc=PBxETedReA0Q7kNvwFvJalH&_nc_oc=AdnaqlnRSnm5QmgTgFTWnhc6qSpisn2FC90VWwbuGRbF0F8vk28Pqs3isvsnH-aZB1N-7N1TC6LYq5FZsMKIyFjH&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_Afv26x27ZS3e9dbxsdTIrzaNKUUTSgLXHF4KwG5Ub_E9Fg&oe=69854CB6)

Ao enviar o lead para seu ponto de extremidade, o campo de status será alterado. Se a atualização em tempo real for disparada, o status será definido como **sucesso**.  
  
![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.2178-6/13178152_1017179411701324_1932390415_n.png?_nc_cat=108&ccb=1-7&_nc_sid=34156e&_nc_ohc=eL57u-5VRPAQ7kNvwFO57H9&_nc_oc=Adn42_353YYnHdDAHksajVdrUAdcxnNc2D3o1d_CiuAUJ6oivsjB3PqhAPSRr-9C-LvsjxQUnhAar5HvTgqYf3_B&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=ASeOkx1Q4gyRV07Unk0GpA&oh=00_AftD4OjEvy5MVsC6fMnl5sWH2lnCMz4DNjHXb6MskK_FcA&oe=6985339E) Nesse caso, você também verá a carga na tabela. A carga apresentada é uma cópia do que o Facebook envia ao ponto de extremidade; portanto, você deve visualizar o conteúdo e gerenciar o JSON. Se houver problemas durante o envio da atualização, o status será alterado para **falha**. Nesse caso, a coluna error\_code exibirá informações sobre o motivo da falha.

### Teste de lead

Depois de [configurar webhooks para seu app](/docs/graph-api/webhooks/getting-started), é possível testar os leads usando o botão Testar. O botão aparece no painel de webhooks do app.

[](#)

## Criar leads de teste

Para criar leads de teste, envie uma solicitação `POST` a `/{FORM_ID}/test_leads`.

Para que a solicitação seja bem-sucedida, é necessário atender aos seguintes requisitos:

-   Não devem existir outros leads de teste para o formulário de anúncio de lead.
    
-   Você deve ter a [função](/docs/graph-api/reference/page/roles/) de `Advertiser` ou superior na página de criação do formulário.
    
-   Use o token de acesso à Página na chamada de API.
    

```
curl \
  -F "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/API_VERSION/FORM_ID/test_leads"
```

É possível personalizar o conteúdo do lead ao passar os seguintes parâmetros:

-   `field_data`: um parâmetro de vetor com pares de `name` e `values`.
    
-   `custom_disclaimer_responses`: um parâmetro de vetor com pares de `checkbox_key` e `is_checked`.
    

```
curl \
  -F "field_data=[{'name': 'favorite_color?', 'values': ['yellow']}, {'name': 'email', 'values': ['test@test.com']}]" \
  -F "custom_disclaimer_responses=[{'checkbox_key': 'my_checkbox', 'is_checked': true}]" \
  -F "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/API_VERSION/FORM_ID/test_leads"
```

Os leads criados a partir das chamadas acima são fictícios e, portanto, não estão associados a nenhum anúncio.

[](#)

## Ler leads de teste

É possível ler os leads de teste associados ao formulário de anúncios de lead fazendo uma chamada `GET` para o ponto de extremidade `{FORM_ID}/test_leads`.

```
curl \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/API_VERSION/FORM_ID/test_leads"
```

[](#)

## Excluir leads de teste

Se você quiser excluir e reenviar um lead durante o teste da sua integração, faça a seguinte chamada de API:

```
curl -X DELETE \
  -d "access_token=<ACCESS_TOKEN>" \
  "https://graph.facebook.com/<API_VERSION>/<LEAD_ID>"
```

Vale lembrar que apenas o proprietário pode excluir um lead.

[](#)