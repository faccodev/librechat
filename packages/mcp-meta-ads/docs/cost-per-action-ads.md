---
title: "Anúncios com custo por ação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/cost-per-action-ads"
scraped_at: "2026-02-01T13:55:42.791Z"
---

# Anúncios com custo por ação

O custo por ação (CPA, pelas iniciais em inglês) permite que você especifique eventos de conversão e seja cobrado pela quantidade de conversões. O CPA para visualizações de vídeo é também chamado de CPV.

Uma alternativa para o CPA é o [oCPM](/docs/marketing-api/bidding/optimized-cost-per-mille), que cobra pela quantidade de impressões.

## Como funciona

Seu lance é definido para um [conjunto de anúncios](/docs/marketing-api/adset). Estes campos devem seguir as restrições abaixo:

Nome

Descrição

`billing_event`

Define a ação a ser paga. Defina como `LINK_CLICKS`, `PAGE_LIKES`, `OFFER_CLAIMS` ou `THRUPLAY`.

`optimization_goal`

Define a ação para a qual você otimiza. Defina como o mesmo valor de `billing_event`, `LINK_CLICKS`, `PAGE_LIKES`, `POST_ENGAGEMENT`, `OFFER_CLAIMS` ou `THRUPLAY`.

`bid_amount`

Valor que você atribui ao objetivo, especificado em centavos, mínimo de um centavo. Por exemplo, `bid_amount=150` significa que você quer fazer o lance de US$ 1,50 para esta ação. Ele deve representar o valor máximo que você deseja pagar por esta ação.

`targeting`

Para anúncios que otimizam para conexão, incluindo `page_like`, é necessário usar o campo `excluded_connections` no direcionamento para excluir usuários que já realizaram a conversão única para o objeto de destino. Confira os exemplos na seção abaixo para saber mais sobre como especificar as conexões excluídas apropriadas.

### Limitações

-   A ação de clique no link externo só tem suporte para links de domínios externos e domínios de apps hospedados pelo Facebook.
    
-   A cobrança de CPA para anúncios sem visualização de vídeo é baseada nas conversões de cliques de um dia. Os anúncios de CPV, ou CPA para visualização de vídeo, são cobrados com base nas visualizações de vídeo por 10 segundos.
    
-   A cobrança de cliques em links externos está restrita a cliques no link dentro do anúncio, que são conhecidos como _inline_.
    

A partir da versão [9.0](/docs/graph-api/changelog/version9.0#bidding), a cobrança do CPA para anúncios do app ficou obsoleta. Não será possível definir um evento de cobrança e uma meta de otimização como `APP_INSTALLS`. Como alternativa, recomendamos que você use os eventos de cobrança `impression`. Ainda é possível especificar `APP_INSTALLS` em `billing_event` ou em `optimization_goal`, mas não nos dois ao mesmo tempo.

Consulte o documento [conjunto de anúncios](/docs/marketing-api/adset) sobre atualizações permitidas para conjuntos de anúncios.

### Exemplos

#### Criar

O exemplo abaixo cria um conjunto de anúncios com lances de CPA. Para conjuntos de anúncios com CPA, é preciso definir um `promoted_object`.

```
v24.0
```

Depois disso, você poderá criar anúncios e inseri-los neste conjunto de anúncios seguindo [este](/docs/reference/ads-api/guides/chapter-2-objective-connections) o fluxo de criação.

#### Atualizar

Alterar o lance para um conjunto de anúncios com CPA:

```
v24.0
```

### Exemplo de CPV

Para criar um CPV de lances de anúncio ou um CPA para visualizações de vídeo, comece criando uma campanha de anúncios com `objective=VIDEO_VIEWS`.

```
v24.0
```

Depois, defina o CPA para `bid_info` de visualizações de vídeo no conjunto de anúncios:

```
v24.0
```

[](#)