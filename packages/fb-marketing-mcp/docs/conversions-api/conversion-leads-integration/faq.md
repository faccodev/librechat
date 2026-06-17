---
title: "Perguntas frequentes - API de Conversões"
source: "https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/faq"
scraped_at: "2026-02-01T15:49:05.143Z"
---

[Voltar para Português (Brasil)](/docs/marketing-api/conversions-api/conversion-leads-integration/faq/?translation)

Este documento foi atualizado.  
A tradução para Português (Brasil) não foi concluída ainda.

Atualização em inglês: 10 de dez de 2025  
Atualização em Português (Brasil): 17 de jun de 2024

# FAQs

[How do I know if my business is a good fit for the Conversion Leads CRM integration for Lead Ads?](#faq_557749458847147)

Below are some guidelines that we look for in integrations.

-   Use native lead ads (Instant Forms)
    
-   Generate at least 250 leads per month on Meta
    
-   Can upload data frequently and regularly; we recommend uploading data at least once per day
    
-   The stage you want to optimize for occurs within 28 days of leads being generated
    
-   The stage you want to optimize for has an approximate conversion rate between 1% and 40%
    

[Link permanente](#faq_557749458847147)

[How do I begin implementing the CRM integration?](#faq_312346877307110)

Follow [Step 2: Getting Started With the CRM Integration](/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration) to begin the CRM integration.

[Link permanente](#faq_312346877307110)

[What are some best practices for completing the direct integration for Conversion Leads?](#faq_1510257382833434)

1.  Send the `lead_id` rather than PII for matching.
2.  Send ALL events as they are updated, including the raw lead event that represents all leads generated on Meta and downloaded into your CRM.
3.  Upload data at least once a day. Ideally the calls to your CRM should be made in real-time, but you may employ hourly or daily batching methods if a real-time integration is not feasible.
4.  Each batch can include up to 1,000 events. If there is an error in the batch, the whole batch will be discarded so we HIGHLY recommend employing small batches and adding logic for retrying attempts.
5.  You can backfill your data for up to 7 days in the past. The time difference is calculated between `event_time` and `upload_time`. Backfilling some data may speed up the training process.
6.  Ensure that your `event_time` values are after the lead generation timestamp, otherwise your events may be discarded.
7.  Do not change Pixels after you complete the integration. Changing Pixels will start a new integration and restart the training process.

[Link permanente](#faq_1510257382833434)

[I’ve started sending data, but cannot proceed past the "Wait for 7 days of CRM events" message in Events Manager.](#faq_658746611750007)

The integration is currently in the data validation phase; it must pass all of the following requirements before proceeding to the next step:

-   Check for errors in Events Manager Diagnostic tab for the CRM Pixel.
    
-   Continually send at least seven days worth of data. This does not have to be seven days in a row because you might not generate leads on the weekends.
    
-   Enough events are being uploaded to match with leads generated on Facebook. For example, if you generate 100 leads in one day we would expect all 100 leads to have uploaded events to match to them.
    
-   Minimum of two stages for events from your sales funnel. However, we recommend at least three stages if possible. For example, only sending in the “Sale” event will not be enough; make sure you send in previous stages as well.
    
-   Data has all the required parameters and in the correct format highlighted in this guide. Sending data in old formats will trigger an error.
    

[Link permanente](#faq_658746611750007)

[My integration is complete and I configured my funnel in Events Manager. How soon will I see the performance gains associated with the optimization?](#faq_512725379801045)

After the funnel configuration is complete the system will analyze your data again to determine if it matches with your indicated funnel.

Once your integration has passed the funnel analysis there is a training period of 1-2 months before your integration is added to the production model. You can enable the optimization in Ads Manager during this period, but you might not see the full performance gains until after the training period.

[Link permanente](#faq_512725379801045)