---
title: "Orientação de integração: otimização para valor - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/guides/value-optimization"
scraped_at: "2026-02-01T15:49:59.211Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/conversions-api/guides/value-optimization/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 30 de jan  
Atualização em Português (Brasil): 30 de jan

# Integration Guidance: Value Optimization

## Overview

Value optimization works for all standard and custom events on the Sales objective.

## Requirements

Value and currency should be added to existing events you want to use value optimization for. If you use the Meta Pixel and the Conversions API, ensure that the parameters are added to both sources and are consistent across both sources.

### Definitions

**Value**: A numerical figure associated with an event. The value should be correlated to your true business goal. Monetary value is often considered a high-quality form of value representation, since most advertisers prioritize revenue-based outcomes. However, this value can also be represented as estimated monetary value, or other metrics that advertisers identify as key performance indicators of business objectives. Our system values conversions proportional to the value that is passed back. Conversions with higher values result in proportionally better business outcomes relative to conversions with lower values.

**Currency**: The unit or standard used to express the value specified. Currency must be a valid [ISO 4217 three-digit currency code](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FISO_4217%3Ffbclid%3DIwZXh0bgNhZW0CMTEAYnJpZBExeHhJMTRGYjFUUmE3aVViSXNydGMGYXBwX2lkATAAAR4ELaZs81nuJYQYO9QJQYBwxvP1N8sEiUrdDuYFB_3Yqmtppqz-LnJBDbp5fg_aem___3fT6InHtjRw8gMI1gSrA&h=AT0l940S6DJGlLSx3u8oDSKCgvR_lZ9cGzQYES-9TaHANPCnSXZqReg8dleXDHgrDF4gPK67FuGHN54fVdBMH6Yu_g92tqFVC3RbR_Ot5FJ1B6hrjvXfmnZ1dxlcw9cRahUhFYTZ96Nz7-Kh5m4srOQ1c0CLKQYkI1GS_s2l4wc).

[](#)

## Meta Pixel

Modify your existing event to include the value and currency parameters.

```
fbq("track", "<EVENT_NAME>", { 
value: 10.00,
currency: "USD" 
});
```

[](#)

## Conversions API

Include the value and currency in the `custom_data` parameter in your Conversions API payload. [Refer to the Payload Helper](/docs/marketing-api/conversions-api/payload-helper) if you need to generate an example payload.

```
{
    "data": [
        {
            "event_name": "<EVENT_NAME>",
            ... // Example does not include all required CAPI parameters
            "custom_data": {
                "currency": "USD",
                "value": "142.52"
            }
        }
    ]
}
```
  

For app integrations, please refer to these SDK integration guides:

-   [Get Started with App Events (Android)](/docs/app-events/getting-started-app-events-android/)
-   [Get Started with App Events (iOS)](/docs/app-events/getting-started-app-events-ios)

Conversions API integration guide:

-   [Conversions API for App Events](/docs/marketing-api/conversions-api/app-events)

If you want to use catalog features with value optimization, please refer to this guide:

-   [Meta Pixel for Advantage+ Catalog Ads](/docs/meta-pixel/get-started/advantage-catalog-ads/)

[](#)