---
title: "Recurso de retorno de ligação - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/call-ads/callback-feature"
scraped_at: "2026-02-01T14:20:11.035Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/call-ads/callback-feature/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 8 de dez de 2025  
Atualização em Português (Brasil): 14 de out de 2024

# Callback Feature

The callback feature allows users to submit their contact information (e.g., name, phone number) from your call ad. The callback requests will then be available to download.

## Create a callback ad

To enable the callback feature on a call ad, add `callback_type": "FORM"` in `call_ads_configuration` when creating the ad creative.

```
"asset_feed_spec":
  {
  "call_ads_configuration":
    {
      "callback_type": "FORM"
    } 
  }
```

[](#)

## Download callback requests

Use the [bulk read by leads](/docs/marketing-api/guides/lead-ads/retrieving#bulk-read) endpoint. Note that for callback requests, it can only be read by an ad, not by a form.

```
v24.0
```

[](#)