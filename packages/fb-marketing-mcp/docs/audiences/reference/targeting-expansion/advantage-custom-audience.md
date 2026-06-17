---
title: "Público personalizado Advantage - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-expansion/advantage-custom-audience"
scraped_at: "2026-02-01T14:14:39.311Z"
---

# Público personalizado Advantage

Para obter mais informações sobre o público personalizado Advantage, consulte [Central de Ajuda: Sobre o público personalizado Advantage](https://www.facebook.com/business/help/414975413946182).

**Observação:** campanhas com objetivos compatíveis são habilitadas por padrão.

-   Para aceitar, defina o parâmetro `custom_audience` dentro de `targeting_relaxation_types` para `1`.
    
-   Para recusar, defina o `custom_audience parameter` dentro de `targeting_relaxation_types` para `0`.
    

Se usar o parâmetro `custom_audience` dentro de `targeting_relaxation_types` para um objetivo não compatível, será exibida uma mensagem de erro.

### Exemplo

```
v24.0
```