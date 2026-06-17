---
title: "Restrições de direcionamento - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-restrictions"
scraped_at: "2026-02-01T14:28:46.936Z"
---

# Restrições de direcionamento

Haverá conjuntos distintos de restrições para os anunciantes que veicularem anúncios de moradia, emprego e crédito a partir dos Estados Unidos ou direcionados a esse país. Consulte [**Categoria de anúncio especial**](/docs/marketing-api/special-ad-category/).

Limitações do direcionamento de um anúncio:

Área

Limite

Idade mínima do usuário

13 anos

Idade máxima do usuário?

65 anos

Idiomas direcionados por anúncio

90 (recomendado: 50)

Interesses direcionados

Sem limite (recomendado: 100)

Instituições de ensino direcionadas

200 (recomendado: 100)

Espaços de trabalho direcionados

200 (recomendado: 100)

Formações acadêmicas direcionadas

200 (recomendado: 100)

Cidades direcionadas

250

Regiões segmentadas

200

custom\_locations

200

geo\_markets

210

Conexões direcionadas

50

Ano de graduação mais recente segmentado

1980

Direcionamento por código postal

50.000. O limite anterior era de 2.500 códigos postais. Para usar mais do que essa quantidade, criamos um objeto que representa um conjunto de códigos postais. Veja esse objeto em `targeting_spec` do conjunto de anúncios.