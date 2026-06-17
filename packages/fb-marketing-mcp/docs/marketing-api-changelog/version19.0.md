---
title: "v19.0 - API de Marketing"
source: "https://developers.facebook.com/docs/marketing-api/marketing-api-changelog/version19.0"
scraped_at: "2026-02-01T15:42:50.232Z"
---

# Versão 19.0

## API de Marketing

23 de janeiro de 2024 | **Disponível até** 4 de fevereiro de 2025 | [Post de blog](https://developers.facebook.com/blog/post/2024/01/23/introducing-facebook-graph-and-marketing-api-v19/)

### Insights

#### Ads Insights

_Applies to v19.0+._

-   The `age_targeting`, `gender_targeting`, `labels`, and `location` insights metrics will no longer be available.
-   The `estimated_ad_recall_rate_lower_bound`, `estimated_ad_recall_rate_upper_bound`, `estimated_ad_recallers_lower_bound`, and `estimated_ad_recallers_upper_bound` insights metrics will no longer be available.

The following endpoints are affected:

-   [`GET /{ad-set-id}/insights`](/docs/marketing-api/reference/ad-campaign/insights)
-   [`GET /{ad-account-id}/insights`](/docs/marketing-api/reference/ad-account/insights)
-   [`GET /{ad-id}/insights`](/docs/marketing-api/reference/adgroup/insights)
-   [`GET /{campaign-id}/insights`](/docs/marketing-api/reference/ad-campaign-group/insights)
-   [`POST /{ad-set-id}/insights`](/docs/marketing-api/reference/ads-insights)
-   [`POST /{ad-account-id}/insights`](/docs/marketing-api/reference/ad-account/insights)
-   [`POST /{ad-id}/insights`](/docs/marketing-api/reference/adgroup/insights)
-   [`POST /{campaign-id}/insights`](/docs/marketing-api/reference/ad-campaign-group/insights)

### Objectives

#### Ad Copies

_Applies to v19.0+._

When creating a copy of an ad you must only use Outcome-Driven Ad Experience objectives. Attempting to use legacy objectives will result in an error.

The following endpoints are affected:

-   [`POST /{adgroup-id}/copies`](/docs/marketing-api/reference/adgroup/copies)
-   [`POST /{ad-campaign-id}/copies`](/docs/marketing-api/reference/ad-campaign/copies)
-   [`POST /{ad-campaign-group-id}/copies`](/docs/marketing-api/reference/ad-campaign-group/copies)

### Targeting

#### Target Expansion

_Applies to v19.0+. Will apply to all versions on April 22, 2024._

-   The `targeting_optimization` field will not be accepted for campaigns that are optimized for link clicks or landing page views. This also applies to previous optimizations that were included in Advantage Detailed Targeting with no option to opt-out including conversions, value, app installs, app events and conversations.
-   For all optimizations that are opted into Advantage Detailed Targeting with no option to opt-out we will automatically set the `targeting_as_signal` field to either 1 or 3 based on the set of objectives and optimizations.
-   The `targeting_as_signal` field should be either null or 0 for campaigns that are optimized for impressions, video views, reach, engagement, ad recall lift or lead, otherwise an error will be received.

The following endpoints are affected:

-   [`POST /act_{ad-account-id}/adsets`](/docs/marketing-api/reference/ad-account/adsets/)
-   [`POST /{adset-id}`](/docs/marketing-api/reference/ad-campaign)
-   [`GET /{adset-id}/delivery_estimate`](/docs/marketing-api/reference/ad-campaign/delivery_estimate)
-   [`GET /act_{ad-account-id}/delivery_estimate`](/docs/marketing-api/reference/ad-account/delivery_estimate)

[](#)

[](#)

## Alterações da v19.0

File Name

[api\_specs/specs/AdAccount.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-0147706655676208bb6380a8602d50c1d2d1be7e6acf81934076742436e26127&h=AT2yhJwiTxbs0oMyCYzFZpdeiMySSCcZ5d7FUWXnKLA930EkrmqMX3opZs0RvXruJFw50TffD0rGh_jw5RQuMSaQ1e42YG_PT8qtAZKgVIzvXH5KFjNH5kfrMxYHhXrln6hjGT_SKq4VIGKIw1dj8iTe0AIdZtL49-rjPoH9III)

[api\_specs/specs/AdAccountBusinessConstraints.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-945b45dd73c58537cf0818b63762772c5b8567e1b87d01554a878f0542d0af25&h=AT1KIhKAlQHx1nps5N4Pjc1WTiWT3uN9yIAU6ySj170rSdgAkUZF8CJ3kjqVLGzm53ONTY1TNlVykX99LmHtNkX_6U0nht5CAa3QKBPf8s8yKGEkdt1crG_keW1x7sAIzfl1WOnGnDJqzPI2bR5loxrpiSrciMAArbMIO54ZTXA)

[api\_specs/specs/AdCreativeBrandedContentAds.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-9aec2247fb543766327124b5c8657e856f839f7a6d014d1fdbf3bcac4840f7d2&h=AT3JoVMMiWHuzCZ9STjo42unghKgemrCGL2KdWD5DCjtIq2rnDG-aGkm0K-ZKQlfXGbppu-NA4hjX-zLqRK3dWmYsJAqZ6mcN5P4nj1XD30aGwcmDzlSzzbqSJ1hvWrl_B2eJxkcQ5rfvJmca44ERIq0IrjOmCyQEj4-TirZXMI)

[api\_specs/specs/AdPromotedObject.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-f82ac3349d1960cc935fd1880f320a2340473765244cab6ac01dd63abdc06f6f&h=AT0Mv2czDgwPpTaxA5II6WoK1TRQUiHlRiBVaoaYzkqvEEtY-rY-zHD-g2Qc1durhFARyQLNBqUxanTunpTg3OsMKWxQ0iOHk9AQFxqRd7oHCmrLok-Mx8BqPkagqFyJYXhk9Qu_tomgsML9u_BvgfSYGBHw07hB3W2TITRZOfE)

[api\_specs/specs/AdVideo.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-f65d79bcf35928348f6ed965def2f9465b491549ac2899b346795cdae633da84&h=AT2PQdmwW3zYDeOWvuCCYfelTtNi0yDZMfqGGLMGaLfHqwpr-38u5cSLRGQoSD4boxlsvtgs-zYKcRKINpIw1YRDSxPHmAjTP6z0kyTwZ_1pLdLifkMJh9b7_PX4VYSHHVptJIVBok4l-eqlrwstiv732I3XkngI08nqxradOjA)

[api\_specs/specs/AdsActionStats.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-cc81c7140129a61f2819dad4296b735327ce221c7fd97c31c82c58fa158e6157&h=AT33B5ziHZXzqOW2M_YFCyaex_utG0JpP-4TJovmasxKlbPz7FoBPIuNi9cYcKkn-f8rxoeeMKQ40p7-062_NpikyCDazMOsssrsWdZTaeBC5HadkGvIcAQIkjoxA4TQTqCeFwtpIJgTWr8PR7CknT9KzNKGP4naqq0VkJpxLrE)

[api\_specs/specs/AdsHistogramStats.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-9b05edd17ccbfc6421dbc8360eded6e30366bcb087c4766d7601d400271af05a&h=AT0OKT24rBeHQSAc3QWozoOsDpTJAE-mBRkRP_S6tH3wH4x-_saLUPW020wfc6DQm-FxP3Oa_NdUD9DAxqXBDmP4NLQ3fMVTyl7WYgiWIbkchPD0bi1BSSmviCq4B1-c2ApFm2CBdoSzaNJe5lJ3yLV7I-HR9r0i0TfZVgFV_Pc)

[api\_specs/specs/AdsPixel.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-05cb615723bb68b6ef146d7982a102f4d3f65467e77c4d014c37b534c0f52445&h=AT3J_eIXwS2eZARGuaGqgb1vSF7bBUoOwyGo170Ku-b1W0IrRQxg63GDNV1WWRLoOP592k8X_RmJLYs6DuLrlslcuQpYb2IXwsiubLYhO-UnUzbQkp6y7uSIKt2_ix1av2PEsLQ1fU2Q1rtYFv0wxpXWbVFh08Da83AQtI82Ldo)

[api\_specs/specs/Application.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-43ce838f9384be95624a9e8e52c7904ceb37bf44e5b0092c4fd133812669820e&h=AT1s_E-VdSrQ1B-1NoO3z9-WWhMgzHxDBcEzgDbKAUEucF6FdrH4MQeUaN5Rs79QnHgX-5vUfzjLKutOH1-_J6C8BDeLqZIE1xwT1DM4aaahW4a1_1L1kua4YGv4w-pYf1zHcS919hvDfvfTtDZElNO2OdxqbsXxUPoRSrX40C4)

[api\_specs/specs/Business.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-88a7980f61c3c8ad0097f2455fd2fbff9959c5a0ed1fb9ed395ed7dc9bd01207&h=AT1p0FpRkcEAZUb6i0FuN-GK7twTZqF6i6OuhffCmVQaFKTbjOuAMZ66Ixo0fVpfqNnHY3aXe149Ts_DFRfVSw4YiMdrgigEJpmjp4d9txSQXOUFWQpXzcb1SFpnpOEXEh-0nVYOPRFLjrNWEmzMM-jQqL_8pco5g-ozUPmCXeg)

[api\_specs/specs/Canvas.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-6c97b36e0c32d9d4417002097fab01af60ab4de1b035c36bd249bd553a8bb1b3&h=AT0wKangcISmqkqMnyUDArQDfWk2fZUojjJetSH1pmrm59ReyA-5AfbP-UJmEFc9MAq3qobC6QzWdORfD3zv2iCp20syjeORixRQ4OeWIo8AhXHza_XzTHlAlnm5X_u05OtnAuHWo3cEJlNCZErn3JnzKEP6Wx3CsRYHVLnxUG8)

[api\_specs/specs/CanvasPreview.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-a329cea7ef11b125394a83864779c77f4d872c51d992960cafae0122616844cd&h=AT27kqcY8oL646s1etiUXAAvjP71ZNRo7z4iPQfeDF_FeJlz13QsU4DdGJSijqCt7cym0t1VQ9aMk0QZbb7DacQ1VUFtSxI0dg4TuAgMmlKjKacCG7sY6bg-u1hVuFo3d4IV-O0ewReaj7qi0Q1V1j7ptriTL4MyA1K6twCqQGY)

[api\_specs/specs/CustomAudience.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-12d2a0c607fef82b8cdfe70d786994daa1f205e114506461202dc5ec9691eb2b&h=AT0mmfvEt9S97gPXRh3CRTbenzk16F3H_3lSuZLolUJVOhFMZXCOUj09tm7IaBII90zPSXsVqh_1ar_a5zbgMTNDx3VUOYGRi8Nkw_KAimNrE1ZtzOGBpTcIoLGfc_YOnyqrK-dTXDUIpa4E_ygJMNg-R7ERHsF3T9t0loUa2Do)

[api\_specs/specs/CustomAudienceSalts.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-e32901064c74c067d843d6d8ca6e28fda3beed1083de45977f80bd59759715fb&h=AT3KO8p1MruDgPO1m4huxo1N4xfhzMOZ7sChWlGI1XJ8SEyUVCTpQ47P4uuNNBmGNNBKnL3H91pRY_m0hMXWXSrz38byXwH7GET6Jfv2BIqU_oF_NWhSAtG2oVe58no5vzMmH7qkQpySA9M4kpywsT_ssWL5svr_5rWJvp59pyc)

[api\_specs/specs/DestinationCatalogSettings.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-6c3bfaf1f76f97d81d40aabc54b8ef2688f644ee94629ab7ae07dbf58dcbd4a8&h=AT01qhlGKOfMZDBLKsi7Kan4TocdiDB34FuT92vIACiqsv8ufdKL-KrzTBfhX2n96_nEW8wspCbMmEVRc9GSy3U53h99X8SW6NOGk_bbTM6fBRncyd_DZnV0HHl4j9AzDwLIP2i79fbRQTBZrMHw9hifN6JTEbsJ-HhXCnFNJlU)

[api\_specs/specs/GameItem.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-e4eec5f21eefdaed64bf561182d6793c8ca22accf2f8713f3b8479c8ed0041b6&h=AT33QWFnvWY-cdPragm18xlEC4vLbISwHYycSYYj4LrptmgjJJfO-XKLeljaD7mRVb--0qpyIS3Icj7pAheksyjB7-t_ba3FRQlEJkW0UJwA28zRissAcoxcw5yU-ENVACjfYdTlmAhRVRXAfwZIUzUzSXkJUd4gGUAi_dLF-p4)

[api\_specs/specs/Group.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-9877fe9cdc522fe5a06c6a2d60f639ba0ddbc276646ca805eef64e78ee4c68ef&h=AT1YxJbDY6gzYtdb59IYWKdmD8ry_n-oQhjxV8DEfZVnLt8c7ixqmjD0Vgx6PoASNiOgW57k9Abgn8RIhvVEKi-D4_3KNBMWLy_dNohhvpIGhCvUXmq8oQC21aXkQYH8c_oO7pTf66LZGNFhblom_P2QPq7vhwYZG_2ku8L8VSA)

[api\_specs/specs/IGMedia.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-bd0b42a4b333b7a7c5d9fbaf347fcd75c39be78e737a0979998ef125e5490d8e&h=AT3A344PFaCuKQuQ6LR8WGYWdQ4FmyntYfibIPWlnit0sizYc4IJq-xBV8noGKd_r5qbK2Xh3gF6JN74oCzaLzxnQ-vnZDZPoW1fKwFJoFVkW5QLu_xMzcpHnCM-7E-gRfWKIcqJFnNtXpnwLe9ixmr2ymD1Ar887wUrEN3w9TA)

[api\_specs/specs/InstantArticlesStats.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-8b9f7cfcfbbd5445987564ec022684cb3633681939a2068f8c85e45db5ba950e&h=AT0sm7EeBx75AgVzzgE-GQi7DUSks6_XSNKVlq6eOhlHtvqZ32TXrkJo-M6cBewClpS87SPujaFCyWs0b8zBvyLCK3tPmoN7smgEBTwYN5c7Zptu7_MoSOIl7lJs6b6m0GATFHynKP6ppiLmH-9rOfdhbzCNBny-QOpuVQa797M)

[api\_specs/specs/Page.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-ea266241330ac747a0af533798e667728d84d6625ec06c7cf4fde45dd98ecc31&h=AT1QqA16q3KBpCrCU02vKM7cxx4qOEVMkjFDgjKnOEEmDiwtPRaA9KlFacMe1IrwjPiFR1tKoUVSdinbOHaFKNZp4OcWWp0WZRAZkgzs0Jgv7PYh_xdQkvnGusBA7xcOT2SmbrKyFfXWMauk2n-MFCeKzmscgi04jjwLMWqytkQ)

[api\_specs/specs/Profile.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-8de1fe59552f70e67106d4bb3baafc7184939651f18c8dff9bdb108ac7a46403&h=AT1d2QcLJWHGABw4s85tEWisNDAZJs8FgUkPPLhREJLITe7R8qsyI4YDuFNxKqhkRB0id5WqoyNpkxYHWibJvZq6DmLTvQyfFrIAojltiuO5Wx5aIA7uweNE_8l4Xtu-6VjftQGOp_O57LgE4rpIPDCoEc6F59izlUFfCXORoIc)

[api\_specs/specs/User.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-26f490dd93db9164fe8bb14407302717c7dc3a9560dbf6ea52d14f88facbe7a5&h=AT05FQEi9o5eTDaDLFusDLyN9B3faCl8NagDDfjA35j862d4k4l00e3gdEu9Zibz2fYsbJ9yo7j8ZUE771Jydr_HXwr6GrgQ8aTxbs_Z6A9lj9-e9Zy3jQNGJU6Kv5-PyKtioOph_fVNZHiE8IR6qupkBTfT2Zm3X8RCXhX1rQc)

[api\_specs/specs/VideoCopyrightCheckStatus.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-427eab101341982703a967d053e502ab34c69a58a45d566dd18cdf279e2bdc92&h=AT1mfn8kerADJb8OqUE-cxSiE3V_kx-SDZQwc57hUL36xjHTFHFZ-CIrCyXh2LniMMizu28GnNtMo4zueC1_4jgY_rsk_UTQAaSnUWO8jCK9kLJixmjL5UKX43Mlc4abtjWM_ROD0cOJSio2oZINjNRNP3Rz3TF8MtQQov7Hj_g)

[api\_specs/specs/VideoStatus.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-ea266241330ac747a0af533798e667728d84d6625ec06c7cf4fde45dd98ecc31&h=AT3W14CX5Su4UrbZr3pfxf4zziN2HJgEOfY1ho7f-agpjgulaDfHSfZup85oe_ANVWero2_XyZZjIxlLDH91w2PCbXuau9adB1xJdqQYE9CP8ec9hf6h-vpbZIF8SWuLKd2mVBvz45PiLPEv4J5P7F8Fl4PCicXc7HSYll0zjcY)

[api\_specs/specs/Page.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-1d60117a96f694a3e0070c1950deeb9e111feafb2bde6c50ede7d9d19904d4a3&h=AT17bdx_KqfLDJ1irBs3Sqmp30bflvA_Q0ozDsRu5Cnq79r0JEZzR7A_WPaurL0Rahls3YzQRP2H9-L5MjyKPym9X5IAPmYFC_87kRS7cqUtGTDhlgGyDUa7x8NeucZA6EtLMQLkk07KRgWTiQNUhaqUmHb3MKk79gTqSoIFtLc)

[api\_specs/specs/VideoStatusError.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-6eca98fc82d2669ec12e6f91f837cada8b5d48df8b91e774a4adcebaf0015d88&h=AT3V6tOpTD-KgMlqwuMHHT8o4fF5LPrfa2def83m0MJsGTpbZgy_0GrOH4Jx9J9p_CtQv_t3XzWXM30MaLMoci2Ohm-OhB1t54lqYkHPcjzKelt9hxj-iwU4jALfpC_ba7rJ-yTU0t9sO7xN2AUnWd5PwBY7k3kGSCLjqFqdhxg)

[api\_specs/specs/VideoStatusProcessingPhase.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-8ddbebec5bf8e8c94f110c97f1dddaaa0241732055abe6649a91e69e41a11cb0&h=AT2iUmHER8XsR_xQiqKCvBvlOmhuPi1Y1wQ7o1pRIzHyO2g8cegeEkctZuTxm7dZ2-MLSw51d-mdAOHZ58oLjZq_0hvpp8hGyAfWybvXLPe_QK_cSGvLldmqrDuOBhyG3nqaQRiswMKMc_Dkb1ZBc8Q2E97MGg7FUx5mhZct-7c)

[api\_specs/specs/VideoStatusPublishingPhase.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-f170d7a8866836668e710ca575cf0c86496e887117f9f5242e43a528f78dff0a&h=AT2z7JMYy3dL0cd141i8dKwJ-r59fhU6uwrg1TeuHdrenkwDezXhis6ezcR2wwyVpHoIqqLzpz88w4OexDW5XzWwHp1-BGZljPyN3iwfoeCe32-rREW1J-muPZnglKsEC7HCS5PRELWTNl9Fbc7OD6YwB2Ngk7oHLjJnbCwfL-M)

[api\_specs/specs/VideoStatusUploadingPhase.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-8878b34e75899ba1bce908f125ea34eff432182154b7db1aa66b951bbe0036c0&h=AT082BZm5w_Frymmoq5Y4mDL4kf1qBq264BB71Ck15G16duDH3m76mIiwcd_yqtFz2TRZI_mb-0lxPWk4Ju2eXXyHDnzKmVjS2TjscKtqn1ZJF2F_Fc5avSTfX7ag8xzKpT8Y_6hdELEx6cy0jjr7hOmCidcTO0RVvxgVFdhj88)

[api\_specs/specs/WhatsAppBusinessAccount.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-320781cc455139a6a6e78332ea3b0e0b36da9b5bdb0d0b5ddcb4966c6e1a5422&h=AT3XuIfcweYPt8dVCCrGcjustxCUQr8zvgZx9XEIEe55L5jQfTuOuV9h7B-Ju3eivBXLH32tB_WOFsesgj-om8Q85TWJZWrCi5k0WpAj1iPmGfYBksu4otWjWN2AJUZF8m7fXmpEeiPjBJl-Kn89bMGhKlWxFhTMRe7BMbshyXI)

[api\_specs/specs/WhitehatFBDLRun.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-4cb4d339304efec19c79d5882b2b9a9b7dd2e07cc89f0ebd71037454f82d3847&h=AT0G1EbqgBu50Wppt_WcvN0ohUvOFGRUVzOYNGxoOcWEj9Skc9BSgxnDDINUhO72vU2hLxT-vFHrb5V_R1q-G06hfiqjHxUJcKNxVwgpscCqTvvs9zB3ZN8DE3eU9GBLVVaAfNjsxDpEPhOWHw4kCaisuaAri-G8u0SuJ_oktCM)

[api\_specs/specs/enum\_types.json](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffacebook-business-sdk-codegen%2Fcommit%2F1b957607c42fe741c8ab6aba9834a866ef4a5ccd%23diff-d99be84813aa7ac41bf0d0b9c8937a1cebad12ac9e46b8fa497e071109578a17&h=AT0NwWJLL_l9b0pVV2QM-rR4PhwjnipTdmTMaoa4CnG0Xr00NMHIT7TKux7RwWUgl5mOMF740UEU3dCifMkayvMIIuX-o1EO17EQSUzAbUpm6z3qbqguGcGEi6zsFZsJKf_qL-1M85QK_spqwjploJ8dNjtvUefEKyRJuYvCNBM)

[](#)