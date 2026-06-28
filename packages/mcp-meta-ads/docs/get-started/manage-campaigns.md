---
title: "Gerenciar campanhas - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/manage-campaigns"
scraped_at: "2026-02-01T13:51:20.680Z"
---

# Gerenciamento de campanhas de anúncios

Gerenciar campanhas de anúncios por meio da API de Marketing envolve várias operações importantes: modificar as configurações, bem como pausar, retomar e excluir campanhas.

## Modificar uma campanha de anúncios

Para atualizar uma campanha de anúncios existente, você pode enviar uma solicitação `POST` ao ponto de extremidade `/<CAMPAIGN_ID>`. É possível alterar várias configurações, incluindo o objetivo, o orçamento e os atributos de direcionamento da campanha.

**Exemplo de solicitação da API:**

```
v24.0
```

[](#)

## Pausar uma campanha de anúncios

Interromper temporariamente a veiculação pode ajudar você a reavaliar sua estratégia sem excluir a campanha. Para pausar uma campanha, atualize o status dela para `PAUSED`.

**Exemplo de solicitação da API:**

```
v24.0
```

Para retomar a campanha, você pode definir o status de volta para `ACTIVE`.

[](#)

## Arquivar uma campanha de anúncios

Se quiser interromper temporariamente uma campanha sem excluí-la, use o recurso de arquivamento. Para fazer isso, envie uma solicitação `POST` ao ponto de extremidade `/<CAMPAIGN_ID>` com o parâmetro de status definido como `ARCHIVED`.

**Exemplo de solicitação da API**

```
v24.0
```

Observe que arquivar uma campanha interromperá a veiculação, que poderá ser facilmente restaurada mudando o status de volta para `ACTIVE`.

[](#)

## Excluir uma campanha de anúncios

Quando precisar remover permanentemente uma campanha, envie uma solicitação `DELETE` ao o ponto de extremidade `/<CAMPAIGN_ID>`.

Tenha cuidado ao excluir campanhas, já que essa ação não poderá ser desfeita. Verifique sempre a identificação da campanha antes da exclusão para evitar a perda acidental de dados.

**Exemplo de solicitação da API**

```
v24.0
```

[](#)

## Saiba mais

-   [Referência sobre campanha](/docs/marketing-api/reference/ad-campaign-group)
    
-   [Gerenciar o status do seu objeto de anúncio](/docs/marketing-apis/guides/manage-your-ad-object-status)
    
-   [Solução de problemas](/docs/liz-test/marketing-api/troubleshooting)
    

[](#)

[

←

Voltar

Create an Ad

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad)

[](#)