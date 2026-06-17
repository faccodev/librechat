---
title: "Parâmetros de URL do tipo de público - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-shopping-campaigns/audience-type-url-parameters"
scraped_at: "2026-02-01T14:15:13.060Z"
---

# Parâmetros de URL do tipo de público

O Módulo de Rastreamento do Urchin﹡ (UTM) é um sistema padronizado para passar informações de cliques no anúncio através de parâmetros de URL de destino para uso em análises. Isso significa que, quando um usuário clicar em um anúncio, o URL de solicitação conterá parâmetros que podem ser extraídos por plugins da web como o Google Analytics.

Na Meta, permitimos que os anunciantes especifiquem parâmetros de UTM no nível do anúncio na seção **Rastreamento** do fluxo de criação de anúncio no Gerenciador de Anúncios. Normalmente, os anúncios podem ter vários conjuntos de anúncios por campanha, o que permite ter diferentes parâmetros de URL para cada tipo de público associado ao conjunto de anúncios. No entanto, as campanhas de compras Advantage+ têm apenas um conjunto de anúncios por campanha, que é usado tanto para redirecionamento como para prospecção de usuários.

Agora, as campanhas de compras Advantage+ dão suporte a tipos de público personalizados — novos (`prospecting`) e existentes (`retargeting`) para parâmetros de URL a fim de fornecer mais contexto às impressões de anúncio. Mais especificamente, permitimos que você configure três (3) valores do campo `custom_audience_info` para ativar os parâmetros de URL do tipo de público: `audience_type_param_name`, `new_cusomter_tag` e `existing_customer_tag`.

Este recurso só está disponível quando o público personalizado existente está configurado. Quando isso for concluído, esses parâmetros podem ser definidos nas **Configurações da conta de anúncios** na seção **Campanhas de compras Advantage+**.

## Parâmetros

O campo `custom_audience_info` estende o nó `/act_AD_ACCOUNT_ID`.

Nome

Descrição

`custom_audience_info`

**Obrigatório.**  
**Valores:**`audience_type_param_name` e `new_customer_tag` ou `existing_customer_tag`  
Para uma chamada POST bem-sucedida, é necessário o parâmetro `audience_type_param_name` e o parâmetro `new_customer_tag` ou o parâmetro`existing_customer_tag`.

### O campo `custom_audience_info`

Nome

Descrição

`audience_type_param_name`

string

**Obrigatório.**  
**Valor:**`audience_type`  
O nome do campo para o URL. Deve ser uma string não vazia que contém letras, números ou sublinhados.

`new_customer_tag`

string

**Opcional.**  
**Valor:**`prospecting`  
O valor do campo para novos clientes. Deve ser uma string não vazia que contém letras, números ou sublinhados.

`existing_customer_tag`

string

**Opcional.**  
**Valor:**`retargeting`  
O valor do campo para clientes existentes. Deve ser uma string não vazia que contém letras, números ou sublinhados.

[](#)

## Exemplos

### Recupere as informações do público personalizado

#### Solicitação

```
v24.0
```

#### Resposta

```
{
  "custom_audience_info": {
    "audience_type_param_name": "audience_type",
    "new_customer_tag": "prospecting",
    "existing_customer_tag": "retargeting"
  },
  "id": "act_AD_ACCOUNT_ID"
}
```

### Criar novas informações de público personalizado

```
v24.0
```

[](#)

﹡ O Urchin foi adquirido pela Google e virou Google Analytics

[](#)