---
title: "Campanhas de app Advantage+ - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/advantage-catalog-ads/advantage-app-campaigns"
scraped_at: "2026-02-01T14:17:11.900Z"
---

# Campanhas de app Advantage+ e anúncios de catálogo Advantage+

As campanhas de app Advantage+ (anteriormente chamadas de Anúncios Automatizados de Apps, AAA) usam um aprendizado de máquina potente e sistemas automatizados para ajudar os anúncios de instalação do app a gerarem mais resultados interessantes para você, ampliarem campanhas com desempenho contínuo e trabalharem de forma mais eficiente. Estamos incorporando a habilidade de criar anúncios de catálogo Advantage+ com a API de campanhas de app Advantage+ existente. Consulte a documentação sobre a [API de campanhas de app Advantage+](/docs/app-ads/automated-app-ads) para obter mais informações sobre como criar suas campanhas.

Nada mudou na criação de conjunto de anúncios e de campanha de anúncios. O recurso dinâmico foi incluído apenas nos criativos. Esse documento detalha a criação de um criativo de anúncio de catálogo Advantage+ e como usá-lo nos seus anúncios.

## Fornecer um criativo e criar anúncios

Quando o conjunto de anúncios estiver pronto, crie seu anúncio enviando uma solicitação `POST` ao ponto de extremidade `/act_{ad_account_id}/ads`.

### Solicitação

```
v24.0
```

### Parâmetros

Nome

Descrição

`name`

string

**Obrigatório.**  
Nome do anúncio.

`adset_id`

int-64

**Obrigatório.**  
Identificação do conjunto de anúncios, necessária na criação.

`creative`

AdCreative

**Obrigatório.**  
As especificações do criativo que será usado para esse anúncio.  
**Valores:**`object_story_spec`, `product_set_id`, `use_page_actor_override`

Informe uma especificação de criativo:

```
{
  "creative": {
    "name": "NAME", 
    "object_story_spec": SPEC, 
    "product_set_id": PRODUCT_SET_ID
  }
}
```

[Leia mais sobre criativos](/docs/marketing-api/reference/ad-creative).

`status`

enumeração

**Opcional.**  
Apenas os status `ACTIVE` e `PAUSED` são válidos durante a criação. Durante os testes, é recomendável definir um status `PAUSED` para os anúncios a fim de evitar gastos acidentais.

`adlabels`

list<Object>

**Opcional.**  
Rótulos de anúncios associados ao anúncio.

`execution_options`

list<enum>

**Opcional.**  
**Valores:**

-   `set` (padrão)
    
-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `synchronous_ad_review`: esta opção não deve ser usada sozinha. Deve ser sempre especificada com `validate_only`. Quando essas opções forem especificadas, a chamada de API realizará validações de integridade de anúncios, que incluem verificação do idioma da mensagem, regra de texto de 20% de imagem etc., bem como as lógicas de validação.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para recomendações será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

[](#)

## Atualização

Para atualizar um [anúncio](/docs/marketing-api/reference/adgroup/), faça uma solicitação `POST` para o nó `/{ad_id}`.

### Solicitação

```
v24.0
```

### Parâmetros

Nome

Descrição

`name`

string

Novo nome do anúncio.

`adlabels`

list<Object>

Rótulos de anúncios associados ao anúncio.

`execution_options`

list<enum>

**Opcional.**  
**Valores:**

-   `set` (padrão)
    
-   `validate_only`: quando esta opção for especificada, a chamada de API não realizará a mutação, mas executará as regras de validação em relação aos valores de cada campo.
    
-   `synchronous_ad_review`: esta opção não deve ser usada sozinha. Deve ser sempre especificada com `validate_only`. Quando essas opções forem especificadas, a chamada de API realizará validações de integridade de anúncios, que incluem verificação do idioma da mensagem, regra de texto de 20% de imagem etc., bem como as lógicas de validação.
    
-   `include_recommendations`: esta opção não pode ser usada sozinha. Quando ela for utilizada, serão incluídas recomendações para configuração do objeto de anúncio. Uma seção específica para recomendações será incluída na resposta, mas somente se existirem recomendações para tal especificação.
    

Se a chamada passar no processo de validação ou análise, a resposta será `{"success": true}`. Caso a chamada não seja aprovada, um erro será retornado com mais detalhes.

`status`

enumeração

**Valores:**`ACTIVE`, `PAUSED`, `DELETED`, `ARCHIVED`

Durante os testes, é recomendável definir um status `PAUSED` para os anúncios a fim de evitar gastos acidentais.

`creative`

AdCreative

As especificações do criativo que será usado para esse anúncio.  
**Valores:**`object_story_spec`, `product_set_id`, `use_page_actor_override`

Informe uma especificação de criativo:

```
{
  "creative": {
    "name": "<NAME>", 
    "object_story_spec": <SPEC>, 
    "product_set_id": <PRODUCT_SET_ID>
  }
}
```

[Leia mais sobre criativos](/docs/marketing-api/reference/ad-creative).

[](#)