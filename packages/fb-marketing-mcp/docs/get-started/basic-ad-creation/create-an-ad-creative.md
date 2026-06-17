---
title: "Gerar um criativo do anúncio - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative"
scraped_at: "2026-02-01T14:06:15.327Z"
---

# Gerar um criativo do anúncio

Gerar um criativo envolve definir os elementos visuais e textuais que serão exibidos no seu anúncio. Essa importante etapa requer especificar o formato do anúncio, que pode incluir opções como imagem, vídeo ou carrossel. Cada formato vem com o próprio conjunto de considerações e requisitos de design. Ao construir cuidadosamente os criativos do anúncio, você pode criar anúncios atraentes que comunicam sua mensagem de forma eficaz e geram engajamento do usuário.

Para isso, envie uma solicitação `POST` ao ponto de extremidade `/act_<AD_ACCOUNT_ID>/adcreatives`. Os parâmetros importantes incluem o `name` do anúncio, a `message`, URLs de imagem ou vídeo, botões de `call_to_action` (CTA) e URLs de destino.

**Exemplo de solicitação da API:**

```
v24.0
```

Nessa carga, `object_story_spec` especifica o formato usado para o story de anúncio e inclui detalhes para um anúncio com link, além dos metadados associados.

### Parâmetros necessários

Nome

Descrição

`name`

O nome do anúncio.

`object_story_spec`

As especificações do criativo do anúncio.

[](#)

## Saiba mais

-   [Referência sobre criativos de anúncios da conta de anúncios](/docs/marketing-api/reference/ad-account/adcreatives)
    
-   [Criativo do anúncio](/docs/marketing-api/creative)
    

[](#)

[

←

Voltar

Create an Ad Set

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-set)

[

→

Avançar

Create an Ad

](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad)

[](#)