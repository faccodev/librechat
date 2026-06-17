---
title: "Opções Premium do parceiro - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/collaborative-ads/partner-premium-options"
scraped_at: "2026-02-01T14:19:08.338Z"
---

# Opções Premium do parceiro

As Opções Premium criam parcerias mais sólidas entre varejistas e marcas que usam nossa solução de Anúncios Colaborativos com recursos exclusivos de direcionamento e mineração de insights. Com as Opções Premium, varejistas podem oferecer aos parceiros de marca complementos aos Anúncios Colaborativos.

## Configurações disponíveis

### Direcionamento por categoria

O [redirecionamento de público estendido](https://www.facebook.com/business/help/3025590151045930?id=1321866301271922) permite que marcas e anunciantes façam o direcionamento de anúncios para públicos em nível de categoria que visualizaram ou adicionaram ao carrinho produtos da categoria à qual os produtos da marca pertencem.

### Insights sobre o carrinho

Os [insights sobre o carrinho](https://www.facebook.com/business/help/935433177034005?id=1321866301271922) fornecem informações sobre as categorias de outras compras feitas com o produto em destaque no anúncio da marca ou do anunciante.

### Públicos personalizados do varejista

Os [públicos personalizados do varejista](https://www.facebook.com/business/help/541293860470628?id=1321866301271922) permitem aos varejistas compartilhar públicos com proteção de domínio integrada de marcas e anunciantes com os quais colaboram. A proteção de domínio restringe os públicos para uso apenas pelos parceiros de marca e direciona o tráfego das campanhas exclusivamente para o site do varejista.

[](#)

## Recuperar as Opções Premium

Use uma chamada de API `GET` para recuperar as configurações de Opções Premium de um segmento de catálogo. Você pode fornecer o `catalog_segment_id` e o `partner_business_id` ou somente o `vendor_id`. Se usar ambos, certifique-se de que o `catalog_segment_id` seja de propriedade do respectivo fornecedor.

### Solicitação

Para obter as configurações com o `catalog_segment_id` e o `partner_business_id`:

```
v24.0
```

Para obter as configurações somente com o `vendor_id`:

```
v24.0
```

#### Parâmetros

Nome

Descrição

`business_id`

string numérica ou número inteiro

**Obrigatório.**  
Identificação da empresa relacionada ao catálogo ou ao fornecedor.

`catalog_segment_id`

string numérica ou número inteiro

**Opcional.**  
Identificação do segmento de catálogo a ser atualizado. É obrigatório usar este campo ou `vendor_id`.

`vendor_id`

string

**Opcional.**  
Identificação do fornecedor a ser atualizado. É obrigatório usar este campo ou `catalog_segment_id`.

`partner_business_id`

string numérica ou número inteiro

**Obrigatório.**  
Identificação da empresa do parceiro a ser recuperada.

### Resposta

Se a operação for bem-sucedida, você obtém as configurações atuais para as Opções Premium:

```
{
  "collaborative_ads_partner_premium_options": {
    "enable_extended_audience_retargeting": bool,
    "enable_basket_insight": bool,
    "retailer_custom_audience_config": {
      "audience_id": [
        AUDIENCE_ID_1,
        AUDIENCE_ID_2,
        AUDIENCE_ID_3
      ]
    }
  }
}
```

[](#)

## Atualizar as Opções Premium

Faça uma chamada de API `POST` ao ponto de extremidade `/{business_id}/partner_premium_options` para atualizar as informações das Opções Premium.

### Solicitação

Para atualizar as configurações somente com `catalog_segment_id` e `partner_business_id`:

```
v24.0
```

Para atualizar as configurações somente com o `vendor_id`:

```
v24.0
```

#### Parâmetros

Nome

Descrição

`business_id`

string numérica ou número inteiro

**Obrigatório.**  
Identificação da empresa relacionada ao catálogo ou ao fornecedor.

`catalog_segment_id`

string numérica ou número inteiro

**Opcional.**  
Identificação do segmento de catálogo a ser atualizado. É obrigatório usar este campo ou `vendor_id`.

`vendor_id`

string

**Opcional.**  
Identificação do fornecedor a ser atualizado. É obrigatório usar este campo ou `catalog_segment_id`.

`partner_business_id`

string numérica ou número inteiro

**Obrigatório.**  
Identificação da empresa do parceiro a ser recuperada.

`enable_extended_audience_retargeting`

Booliano

**Obrigatório.**  
Habilite ou desabilite o redirecionamento de público estendido.

`enable_basket_insight`

Booliano

**Obrigatório.** Habilite ou desabilite os insights sobre o carrinho.

`retailer_custom_audience_config`

Objeto JSON  
{`audience_id`: matriz de strings}

**Obrigatório.**  
Contém a lista de `audience_ids` com que esse segmento do catálogo deve ser compartilhado. Para desabilitar o compartilhamento, insira uma matriz vazia.

**Exemplo:**`{'audience_id':[AUDIENCE_IDs]}`

### Resposta

```
{
  "status": "success"
}
```

[](#)

## Como obter identificações de público na Central de Colaboração

Você pode obter a identificação do público na ferramenta Públicos na Central de Colaboração. Caso não veja a coluna **Identificação do público**, clique no menu suspenso **Colunas** no canto superior direito da página e marque a caixa de seleção **Identificação do público**.

![](https://scontent.fcpq7-1.fna.fbcdn.net/v/t39.8562-6/296345105_370163088596227_6220020336232250571_n.png?_nc_cat=104&ccb=1-7&_nc_sid=f537c7&_nc_ohc=o7ANFanDLecQ7kNvwH92AV9&_nc_oc=Adm1yEquU11qSs207zinTPTjwvyytFrKsLSB62jfV4k8cr7sbN-WHKmFlUdUbKVAhxYeQZ-pcdgeyYkTK7xqHDXo&_nc_zt=14&_nc_ht=scontent.fcpq7-1.fna&_nc_gid=Na7TKQvpZtV8rwPlNXwy9Q&oh=00_AfuROCkpea3QUQqy8ZMDS9QU7zJFBYeWI63nvmPv194JwQ&oe=698525E2)

[](#)

## Saiba mais

-   [Anúncios Colaborativos](/docs/marketing-api/collaborative-ads)
    

[](#)