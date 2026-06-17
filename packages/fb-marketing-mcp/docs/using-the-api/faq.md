---
title: "Perguntas frequentes - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/using-the-api/faq"
scraped_at: "2026-02-01T14:03:27.506Z"
---

# Perguntas frequentes

## Geral

[Can I use the API in a production environment without app review?](#faq_430527150080056)

To use the Marketing API in production, you must submit your app for review and receive approval. This process involves providing detailed information about how your app will use the API, including the specific permissions and features you intend to access. Once your app is approved, you can use the API in a production environment.

[Link permanente](#faq_430527150080056)

[](#)

## Autorização e autenticação

[How do I create an access token for the Marketing API?](#faq_1747439106006703)

Access tokens can be generated through the Meta developer portal. Navigate to **Tools** and select **Access Token Tool**. Choose the necessary permissions based on the actions you plan to perform using the API.

See [Authentication](/docs/marketing-apis/overview/authentication) for more information.

[Link permanente](#faq_1747439106006703)

[](#)

## Campanhas de anúncios

[How do I create a new campaign?](#faq_512620044981978)

To create a campaign, send a `POST` request to the `/act_<AD_ACCOUNT_ID>/campaigns` endpoint with parameters such as `name`, `objective`, and `status`.

See [Create an Ad Campaign](/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) for more information.

[Link permanente](#faq_512620044981978)

[](#)

## Conjuntos de anúncios

[Can I change my ad set's budget after it's created?](#faq_736737251983782)

Yes, you can update an ad set's budget by sending a `POST` request to the `/act_<AD_ACCOUNT_ID>/adsets` endpoint with the new budget parameters.

[Link permanente](#faq_736737251983782)

[](#)

## Insights

[What is the best way to analyze my campaign performance?](#faq_574662585145509)

Use the [Insights API](/docs/marketing-api/insights) to make `GET` requests to the `/act_<AD_ACCOUNT_ID>/insights` endpoint. Specify the fields you want (for example, `impressions`, `clicks`, `spend`) and analyze the returned data to assess performance.

[Link permanente](#faq_574662585145509)

[](#)

## Solução de problemas

[What should I do if my ads are not being approved?](#faq_514342418254333)

Review the ad content against Meta's advertising policies. Ensure compliance with all guidelines, and modify any elements that may violate the rules. You can also appeal the decision if you believe your ad was incorrectly disapproved.

[Link permanente](#faq_514342418254333)

[How can I help improve the performance of my ads?](#faq_1284678836025614)

Regularly monitor performance metrics using the [Insights API](/docs/marketing-api/insights), conduct A/B testing on creatives, and refine your [audience targeting](/docs/marketing-api/audiences) based on data insights. Adjust budgets toward high-performing areas for better results.

[Link permanente](#faq_1284678836025614)

[What should I do if my API call returns an error code?](#faq_535217905781146)

Review the error message returned in the API response. The message will provide context for the error, which can guide your troubleshooting efforts. Check the Meta API [Error Codes](/docs/marketing-api/error-reference) documentation for detailed explanations.

[Link permanente](#faq_535217905781146)

[How can I get developer support?](#faq_356740924842060)

Use the [Platform Bug Reports tool](https://developers.facebook.com/support/bugs/) to file issues and visit the [Meta Developer Community Forum](https://developers.facebook.com/community) to ask questions.

[Link permanente](#faq_356740924842060)

[](#)