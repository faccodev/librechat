---
title: "Personalização de ativo de segmento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/dynamic-creative/segment-asset-customization"
scraped_at: "2026-02-01T14:21:49.536Z"
---

**Aviso sobre a personalização de ativo de segmento na versão 22.0 da API de Marketing**

Em 21 de janeiro de 2025, a API de Personalização de Ativo de Segmento ficou obsoleta, e todas as campanhas ativas foram descontinuadas. Se você busca uma solução alternativa, use o [direcionamento por localização](https://www.facebook.com/business/help/365561350785642?id=176276233019487), que oferece vantagens semelhantes às da personalização de ativo de segmento. Para mais informações, entre em contato com seu gerente de conta.

# Personalização de ativo de segmento

Com esta solução, é possível personalizar ativos de anúncio de acordo com os tipos de direcionamento geográfico. Para personalizar ativos com diferentes posicionamentos, consulte [**Personalização de ativos para posicionamentos**](/docs/marketing-api/dynamic-creative/placement-asset-customization).

A Personalização de Ativo de Segmento é uma das nossas três APIs que usam regras de personalização de ativo. **Consulte [Regras de personalização de ativo](/docs/marketing-api/asset-customization-rules).**

Com o lançamento da [versão 8.0 da API de Marketing](/docs/graph-api/changelog/version8.0), todos os casos de uso não relacionados à geolocalização foram descontinuados na Personalização de Ativo de Segmento. Agora, todas as regras de direcionamento precisam conter informações de geolocalização nas respectivas especificações. Há uma exceção para a regra padrão, que não precisa incluir localização geográfica.

## Começar

Antes de começar, verifique as [restrições](#restrictions) do produto. Se o caso de uso atender às nossas especificações, realize as seguintes etapas:

-   Etapa 1: [criar campanha de anúncios e conjunto de anúncios](/docs/marketing-api/asset-customization-rules#campaign)
    
-   Etapa 2: [fornecer criativo do anúncio](#provide-creative). Verifique as [opções de personalização](#customization-options) disponíveis, [crie regras de personalização](#create-rules) e use suas regras para configurar um [feed de ativos](#asset-feed)
    
-   Etapa 3 (opcional): [ver uma prévia do anúncio](#preview)
    
-   Etapa 4: [criar um anúncio](/docs/marketing-api/asset-customization-rules#ad)
    
-   Etapa 5 (opcional): obter [insights](/docs/marketing-api/dynamic-creative/insights) e analisar os resultados
    

[](#)

## Etapa 2: fornecer criativo do anúncio

### Opções de personalização

O anúncio pode ser personalizado por localização geográfica. É possível fazer isso criando uma regra com especificações de personalização. O tipo de personalização aceito é o seguinte:

-   [Geolocalizações](https://developers.facebook.com/docs/marketing-api/buying-api/targeting#location) – Compatível com `countries`, `regions`, `cities`, `geo_markets`, `zips` e `location_types`.
    

O formato para definir a especificação de personalização é semelhante ao formato de direcionamento principal. Consulte [Direcionamento básico](/docs/marketing-api/audiences/reference/basic-targeting).

### Criar regras de personalização de ativo

Com as regras de personalização de ativo, é possível agrupar ativos que aparecem juntos em determinada localização geográfica. Cada regra tem um `customization_spec` que define as localizações geográficas das pessoas que podem ver os ativos no momento da veiculação de anúncio.

Durante a criação das regras, é possível especificar uma prioridade para cada uma delas. Caso contrário, cada uma recebe um número de prioridade conforme a posição na lista de regras. Por exemplo, a primeira regra na lista recebe a prioridade `1`.

Defina uma regra-padrão a fim de evitar a veiculação de uma combinação aleatória de ativos para pessoas _que não atendam às regras_. Para isso, faça o seguinte:

-   Crie um `customization_spec` vazio. Use chaves de abertura e fechamento ao final da regra, desta forma: `{}`.
    
-   Atribua a prioridade mais baixa à regra. Este é o número total de regras, incluindo a regra-padrão. Se você tiver 10 regras mais a padrão, a prioridade da regra-padrão será 11.
    

A regra-padrão faz a correspondência entre um ativo criativo e pessoas que não atendem às **regras anteriores**.

Na configuração, as regras que não são a padrão devem corresponder a um percentual alto do público-alvo.

### Configurar a especificação do feed de ativos

Crie um `asset_feed_spec` e adicione regras de personalização ao campo `asset_customization_rules`. É possível adicionar até 50 regras de personalização.

Para cada regra, é preciso especificar `customization_spec`, `priority` e as etiquetas do ativo. Seu `customization_spec`**não pode** ter mais de 50 condições em uma única regra.

Exemplo de configuração do feed de ativos:

```
v24.0
```

Veja todas as [opções disponíveis para especificação do feed de ativos](/docs/marketing-api/dynamic-creative/asset-feed-spec). Consulte as próximas etapas em [Regras de personalização de ativo](/docs/marketing-api/asset-customization-rules).

[](#)

## Etapa 3 (opcional): ver uma prévia do anúncio

Veja uma prévia das diferentes versões da regra de direcionamento do anúncio usando o ponto de extremidade [`/generatepreview`](/docs/marketing-api/generatepreview). Também é possível adicionar um campo `dynamic_asset_label` com o número de prioridade da regra para ver a versão em um idioma específico.

Por exemplo, para ver a prévia de uma regra com prioridade 1:

```
v24.0
```

[](#)

## Restrições

[**Categoria de anúncio especial**](/docs/marketing-api/special-ad-category/) – Há conjuntos diferentes de restrições para anunciantes que estejam nos Estados Unidos e tenham anúncios imobiliários, de emprego e crédito em veiculação ou veiculem anúncios direcionados para o país. Esses anunciantes devem seguir as restrições da categoria de anúncio especial em `asset_feed_spec`. Saiba mais sobre [Categorias de anúncio especial](/docs/marketing-api/special-ad-category/).

[**Validação do objetivo da campanha**](/docs/marketing-api/reference/ad-campaign-group#objective-validation) – `APP_ENGAGEMENT` não é compatível.

[**Posicionamentos compatíveis**](/docs/marketing-api/buying-api/ad-units) – Todos os posicionamentos são compatíveis.

**Tipo de compra** – [Alcance e frequência](/docs/marketing-api/reachandfrequency) ou [`AUCTION`](/docs/marketing-api/bidding-and-optimization).

**Personalização de posicionamento** – Se a personalização de posicionamento for usada em alguma das regras, todas as regras devem incluir a personalização de posicionamento.

As **restrições de `asset_feed_spec`** são as mesmas de anúncios baseados em feed sem regras de personalização. Com as seguintes exceções:

-   Cada imagem ou vídeo deve ter uma etiqueta anexada.
    
-   Apenas uma imagem ou vídeo por `asset_customization_rule` é elegível para exibição.
    
-   **Formatos de anúncio** – Dois `ad_formats` são compatíveis: `SINGLE_IMAGE` e `SINGLE_VIDEO`. Apenas um `ad_format` é permitido por feed de ativos.
    
-   É possível fornecer apenas um item em `call_to_actions_types`.
    
-   Para cada configuração de posicionamento em um direcionamento de conjunto de anúncios, é preciso fornecer pelo menos uma `asset_customization_rule`.
    

[](#)