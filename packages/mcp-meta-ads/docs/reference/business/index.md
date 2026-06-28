---
title: "Graph API Referência v24.0: Business"
source: "https://developers.facebook.com/docs/marketing-api/reference/business/"
scraped_at: "2026-02-01T14:19:27.791Z"
---

Versão Graph API

[v24.0](#)

# Business

[](#)

Represent a specific business on Facebook. Make the API call to the business ID.

To find the ID of a business, go to [**Business Manager**](https://business.facebook.com/) > **Business Settings** > **Business Info**. There, you will see information about the business, including the ID.

[](#)

## Leitura

Represents a business on Facebook. Includes any specified properties and assets belonging to the business.

### Exemplo

HTTPPHP SDKJavaScript SDKAndroid SDKiOS SDK[Graph API Explorer](/tools/explorer/?method=GET&path=%7Bbusiness-id%7D&version=v24.0)

```
GET /v24.0/{business-id} HTTP/1.1
Host: graph.facebook.com
```
```
/* PHP SDK v5.0.0 */
/* make the API call */
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get(
    '/{business-id}',
    '{access-token}'
  );
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}
$graphNode = $response->getGraphNode();
/* handle the result */
```
```
/* make the API call */
FB.api(
    "/{business-id}",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
```
```
/* make the API call */
new GraphRequest(
    AccessToken.getCurrentAccessToken(),
    "/{business-id}",
    null,
    HttpMethod.GET,
    new GraphRequest.Callback() {
        public void onCompleted(GraphResponse response) {
            /* handle the result */
        }
    }
).executeAsync();
```
```
/* make the API call */
FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                               initWithGraphPath:@"/{business-id}"
                                      parameters:params
                                      HTTPMethod:@"GET"];
[request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                      id result,
                                      NSError *error) {
    // Handle the result
}];
```

Se quiser saber como usar a Graph API, leia nosso [guia sobre Como usar a Graph API](/docs/graph-api/using-graph-api/).

### Parâmetros

Este ponto de extremidade não tem nenhum parâmetro.

### Campos

Campo

Descrição

`id`

numeric string

The business account ID.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`block_offline_analytics`

bool

Specifies whether offline analytics for business is blocked.

`collaborative_ads_managed_partner_business_info`

[ManagedPartnerBusiness](https://developers.facebook.com/docs/graph-api/reference/managed-partner-business/)

collaborative\_ads\_managed\_partner\_business\_info

`collaborative_ads_managed_partner_eligibility`

BusinessManagedPartnerEligibility

collaborative\_ads\_managed\_partner\_eligibility

`created_by`

BusinessUser|SystemUser

The creator of this business.

`created_time`

datetime

The creation time of this business.

`extended_updated_time`

datetime

The update time of the extended credits for this business.

`is_hidden`

bool

If `true`, indicates the business is hidden.

`link`

string

URI for business profile page.

`marketing_messages_onboarding_status`

MarketingMessagesOnboardingStatus

marketing\_messages\_onboarding\_status

`name`

string

The name of the business.

[Padrão](https://developers.facebook.com/docs/graph-api/using-graph-api/#fields)

`payment_account_id`

numeric string

The ID for the payment account of this business.

`primary_page`

[Page](https://developers.facebook.com/docs/graph-api/reference/page/)

The primary Facebook Page for this business.

`profile_picture_uri`

string

The profile picture URI of the business.

`timezone_id`

unsigned int32

This business's timezone.

`two_factor_type`

enum

The two factor type authentication used for this business.

`updated_by`

BusinessUser|SystemUser

The person's name who last updated this business.

`updated_time`

datetime

The time when this business was last updated.

`verification_status`

enum {expired, failed, ineligible, not\_verified, pending, pending\_need\_more\_info, pending\_submission, rejected, revoked, verified}

Verification status for this business.

`vertical`

string

The vertical industry that this business associates with, or belongs to.

`vertical_id`

unsigned int32

The ID for the vertical industry.

`whatsapp_business_manager_messaging_limit`

enum {TIER\_100K, TIER\_10K, TIER\_250, TIER\_2K, TIER\_UNLIMITED, UNTIERED}

Maximum number of unique WhatsApp user phone numbers that your Business Manager account can message, outside of a customer service window, within a moving 24-hour period. This limit is shared across all WhatsApp phone numbers owned by your business.

### Bordas

Borda

Descrição

[`ad_studies`](/docs/marketing-api/reference/business/ad_studies/)

Edge<AdStudy>

The studies this business has access to, such as any advertising lift studies or split testing studies.

[`adnetworkanalytics_results`](/docs/marketing-api/reference/business/adnetworkanalytics_results/)

Edge<AdNetworkAnalyticsAsyncQueryResult>

Obtain the results of an asynchronous Audience Network query for this publisher entity.

[`ads_reporting_mmm_reports`](/docs/marketing-api/reference/business/ads_reporting_mmm_reports/)

Edge<AdsReportBuilderMMMReport>

Marketing mix modeling (MMM) reports generated for this business

[`ads_reporting_mmm_schedulers`](/docs/marketing-api/reference/business/ads_reporting_mmm_schedulers/)

Edge<AdsReportBuilderMMMReportScheduler>

Marketing mix modeling (MMM) reports schedulers for this business

[`adspixels`](/docs/marketing-api/reference/business/adspixels/)

Edge<AdsPixel>

The business has access to these pixels.

[`agencies`](/docs/marketing-api/reference/business/agencies/)

Edge<Business>

Agencies associated with this business.

[`an_placements`](/docs/marketing-api/reference/business/an_placements/)

Edge<AdPlacement>

Placements used by this Audience Network business.

[`business_asset_groups`](/docs/marketing-api/reference/business/business_asset_groups/)

Edge<BusinessAssetGroup>

Business asset groups owned by this business. The business can grant permissions to assets in this group.

[`business_invoices`](/docs/marketing-api/reference/business/business_invoices/)

Edge<OmegaCustomerTrx>

The extended credit invoices of this business.

[`business_users`](/docs/marketing-api/reference/business/business_users/)

Edge<BusinessUser>

Business users associated with this business. Includes employees and admins at the business.

[`client_apps`](/docs/marketing-api/reference/business/client_apps/)

Edge<Application>

This business has access to these client apps.

[`client_instagram_assets`](/docs/marketing-api/reference/business/client_instagram_assets/)

Edge<InstagramBusinessAsset>

This business has access to these client Instagram assets.

[`client_offsite_signal_container_business_objects`](/docs/marketing-api/reference/business/client_offsite_signal_container_business_objects/)

Edge<OffsiteSignalContainerBusinessObject>

The business has access to these client offsite signal container business objects

[`client_pages`](/docs/marketing-api/reference/business/client_pages/)

Edge<Page>

This business has access to these client pages.

[`client_pixels`](/docs/marketing-api/reference/business/client_pixels/)

Edge<AdsPixel>

This business has access to these client pixels.

[`client_product_catalogs`](/docs/marketing-api/reference/business/client_product_catalogs/)

Edge<ProductCatalog>

This business has access to these client product catalogs.

[`client_whatsapp_business_accounts`](/docs/marketing-api/reference/business/client_whatsapp_business_accounts/)

Edge<WhatsAppBusinessAccount>

WhatsApp business accounts that were shared to this business.

[`clients`](/docs/marketing-api/reference/business/clients/)

Edge<Business>

Clients of this business.

[`collaborative_ads_collaboration_requests`](/docs/marketing-api/reference/business/collaborative_ads_collaboration_requests/)

Edge<CPASCollaborationRequest>

All [Collaborative Ads](/docs/marketing-api/collaborative-ads#collaborative-ads). collaboration requests initiated by the business.

[`collaborative_ads_suggested_partners`](/docs/marketing-api/reference/business/collaborative_ads_suggested_partners/)

Edge<CPASAdvertiserPartnershipRecommendation>

[Collaborative Ads](/docs/marketing-api/collaborative-ads#collaborative-ads) suggested partners for a business.

[`commerce_merchant_settings`](/docs/marketing-api/reference/business/commerce_merchant_settings/)

Edge<CommerceMerchantSettings>

Commerce Merchant Settings belonging to this business.

[`event_source_groups`](/docs/marketing-api/reference/business/event_source_groups/)

Edge<EventSourceGroup>

The business owns these event source groups. Includes various signals sources such as pixels.

[`extendedcredits`](/docs/marketing-api/reference/business/extendedcredits/)

Edge<ExtendedCredit>

Extended credits for this business.

[`initiated_audience_sharing_requests`](/docs/marketing-api/reference/business/initiated_audience_sharing_requests/)

Edge<BusinessAssetSharingAgreement>

The audience sharing requests initiated by this business.

[`instagram_accounts`](/docs/marketing-api/reference/business/instagram_accounts/)

Edge<ShadowIGUser>

This business has access to these Instagram accounts.

[`managed_partner_ads_funding_source_details`](/docs/marketing-api/reference/business/managed_partner_ads_funding_source_details/)

Edge<FundingSourceDetailsCoupon>

managed\_partner\_ads\_funding\_source\_details

[`openbridge_configurations`](/docs/marketing-api/reference/business/openbridge_configurations/)

Edge<OpenBridgeConfiguration>

Get all the openbridge configurations associated to this business

[`owned_apps`](/docs/marketing-api/reference/business/owned_apps/)

Edge<Application>

This business owns these apps.

[`owned_businesses`](/docs/marketing-api/reference/business/owned_businesses/)

Edge<Business>

This business aggregates and manages these client businesses.

[`owned_instagram_accounts`](/docs/marketing-api/reference/business/owned_instagram_accounts/)

Edge<ShadowIGUser>

This business owns these Instagram accounts.

[`owned_instagram_assets`](/docs/marketing-api/reference/business/owned_instagram_assets/)

Edge<InstagramBusinessAsset>

This business owns these Instagram Business Assets

[`owned_offsite_signal_container_business_objects`](/docs/marketing-api/reference/business/owned_offsite_signal_container_business_objects/)

Edge<OffsiteSignalContainerBusinessObject>

owned\_offsite\_signal\_container\_business\_objects

[`owned_pages`](/docs/marketing-api/reference/business/owned_pages/)

Edge<Page>

This business owns these pages.

[`owned_pixels`](/docs/marketing-api/reference/business/owned_pixels/)

Edge<AdsPixel>

This business owns these pixels.

[`owned_product_catalogs`](/docs/marketing-api/reference/business/owned_product_catalogs/)

Edge<ProductCatalog>

This business owns these product catalogs.

[`owned_whatsapp_business_accounts`](/docs/marketing-api/reference/business/owned_whatsapp_business_accounts/)

Edge<WhatsAppBusinessAccount>

This business owns these WhatsApp Business Accounts.

[`pending_client_ad_accounts`](/docs/marketing-api/reference/business/pending_client_ad_accounts/)

Edge<BusinessAdAccountRequest>

This business requested access to these client ad accounts and is pending approval.

[`pending_client_apps`](/docs/marketing-api/reference/business/pending_client_apps/)

Edge<BusinessApplicationRequest>

This business requested access to these client apps and is pending approval.

[`pending_client_pages`](/docs/marketing-api/reference/business/pending_client_pages/)

Edge<BusinessPageRequest>

This business requested access to these client pages and is pending approval.

[`pending_owned_ad_accounts`](/docs/marketing-api/reference/business/pending_owned_ad_accounts/)

Edge<BusinessAdAccountRequest>

This business requested ownership of these ad accounts and is pending approval.

[`pending_owned_pages`](/docs/marketing-api/reference/business/pending_owned_pages/)

Edge<BusinessPageRequest>

This business requested ownership of these pages and is pending approval.

[`pending_shared_offsite_signal_container_business_objects`](/docs/marketing-api/reference/business/pending_shared_offsite_signal_container_business_objects/)

Edge<OffsiteSignalContainerBusinessObject>

This business received sharing requests for these offsite signal container business objects and is pending for approval.

[`pending_users`](/docs/marketing-api/reference/business/pending_users/)

Edge<BusinessRoleRequest>

Admin for this business invited this user to the business. Pending user approval.

[`preverified_numbers`](/docs/marketing-api/reference/business/preverified_numbers/)

Edge<WhatsAppBusinessPreVerifiedPhoneNumber>

Edge to get list of all pre-created phone numbers for this business

[`received_audience_sharing_requests`](/docs/marketing-api/reference/business/received_audience_sharing_requests/)

Edge<BusinessAssetSharingAgreement>

The audience sharing requests received by this business.

[`reseller_guidances`](/docs/marketing-api/reference/business/reseller_guidances/)

Edge<ResellerGuidance>

Guidance for a China reseller business.

[`self_certified_whatsapp_business_submissions`](/docs/marketing-api/reference/business/self_certified_whatsapp_business_submissions/)

Edge<WhatsAppBusinessPartnerClientVerificationSubmission>

Business Service Providers can submit their client information for verification on WhatsApp Business Platform. This endpoint returns statuses, submitted info, and rejection reasons for the submissions.

[`system_users`](/docs/marketing-api/reference/business/system_users/)

Edge<SystemUser>

The business's system users.

### Error Codes

Erro

Descrição

104

Incorrect signature

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

200

Permissions error

368

The action attempted has been deemed abusive or is otherwise disallowed

80004

There have been too many calls to this ad-account. Wait a bit and try again. For more info, please refer to https://developers.facebook.com/docs/graph-api/overview/rate-limiting#ads-management.

2500

Error parsing graph query

2616

The reporting data you are trying to fetch has too many rows. Please pull data for shorter time periods or use filters to restrict the number of ad IDs

[](#)

## Criando

To create other Business Managers, your business needs to obtain `BUSINESS_MANAGEMENT` during the [app review process](/docs/apps/review). If your app is in development mode, you can surpass this requirement, but to create only two child businesses.

You can make a POST request to `businesses` edge from the following paths:

-   [`/{user_id}/businesses`](/docs/graph-api/reference/user/businesses/)

When posting to this edge, a [Business](/docs/marketing-api/reference/business/) will be created.

### Parâmetros

Parâmetro

Descrição

`child_business_external_id`

string

child\_business\_external\_id

`email`

string

The business email of the business admin

`name`

string

Username

Obrigatório

`primary_page`

numeric string

Primary Page ID

`sales_rep_email`

string

Sales Rep email address

`survey_business_type`

enum {AGENCY, ADVERTISER, APP\_DEVELOPER, PUBLISHER}

Business Type

`survey_num_assets`

int64

Number of Assets in the business

`survey_num_people`

int64

Number of People that will work on the business

`timezone_id`

enum {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480}

Timezone ID

`vertical`

enum {NOT\_SET, ADVERTISING, AUTOMOTIVE, CONSUMER\_PACKAGED\_GOODS, ECOMMERCE, EDUCATION, ENERGY\_AND\_UTILITIES, ENTERTAINMENT\_AND\_MEDIA, FINANCIAL\_SERVICES, GAMING, GOVERNMENT\_AND\_POLITICS, MARKETING, ORGANIZATIONS\_AND\_ASSOCIATIONS, PROFESSIONAL\_SERVICES, RETAIL, TECHNOLOGY, TELECOM, TRAVEL, NON\_PROFIT, RESTAURANT, HEALTH, LUXURY, OTHER}

Vertical ID

Obrigatório

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`name`: string,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

3912

There was a technical issue and the changes you made to your Business Manager weren't saved. Please try again.

3918

The Facebook Page you've tried to add is already owned by another Business Manager. You can still request access to this Page, but your request will need to be approved by the Business Manager that owns it.

3974

The name you chose for this Business Manager is not valid. Try a different name.

3947

You are trying to create a Business Manager with the same name as one you are already a part of. Please pick a different name.

200

Permissions error

3973

The name you chose for this Business Manager is not valid. Please choose another.

368

The action attempted has been deemed abusive or is otherwise disallowed

You can make a POST request to `owned_businesses` edge from the following paths:

-   [`/{business_id}/owned_businesses`](/docs/marketing-api/reference/business/owned_businesses/)

When posting to this edge, a [Business](/docs/marketing-api/reference/business/) will be created.

### Parâmetros

Parâmetro

Descrição

`child_business_external_id`

string

(Optional) An external id that allows you to specify a key for your app to identify the child business. You should query for child businesses using this id because the list API is indexed on this field.

`name`

string

(Required) Name of entity for displaying. It should match the public name of your business or organization, since it will be visible across Meta. It can't contain special characters.

Obrigatório

`page_permitted_tasks`[](#)

array<enum {MANAGE, CREATE\_CONTENT, MODERATE, MESSAGING, ADVERTISE, ANALYZE, MODERATE\_COMMUNITY, MANAGE\_JOBS, PAGES\_MESSAGING, PAGES\_MESSAGING\_SUBSCRIPTIONS, READ\_PAGE\_MAILBOXES, VIEW\_MONETIZATION\_INSIGHTS, MANAGE\_LEADS, PROFILE\_PLUS\_FULL\_CONTROL, PROFILE\_PLUS\_MANAGE, PROFILE\_PLUS\_FACEBOOK\_ACCESS, PROFILE\_PLUS\_CREATE\_CONTENT, PROFILE\_PLUS\_MODERATE, PROFILE\_PLUS\_MODERATE\_DELEGATE\_COMMUNITY, PROFILE\_PLUS\_MESSAGING, PROFILE\_PLUS\_ADVERTISE, PROFILE\_PLUS\_ANALYZE, PROFILE\_PLUS\_REVENUE, PROFILE\_PLUS\_MANAGE\_LEADS, CASHIER\_ROLE, GLOBAL\_STRUCTURE\_MANAGEMENT, PROFILE\_PLUS\_GLOBAL\_STRUCTURE\_MANAGEMENT}>

(Required) page\_permitted\_tasks

`shared_page_id`

numeric string

(Required) shared\_page\_id

`timezone_id`

enum {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480}

timezone\_id

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`name`: string,

}

### Error Codes

Erro

Descrição

200

Permissions error

3913

It doesn't look like you have permission to create a new Business Manager.

368

The action attempted has been deemed abusive or is otherwise disallowed

100

Invalid parameter

3947

You are trying to create a Business Manager with the same name as one you are already a part of. Please pick a different name.

3974

The name you chose for this Business Manager is not valid. Try a different name.

You can make a POST request to `china_business_onboarding_attributions` edge from the following paths:

-   [`/{business_id}/china_business_onboarding_attributions`](/docs/marketing-api/reference/business/china_business_onboarding_attributions/)

When posting to this edge, a [Business](/docs/marketing-api/reference/business/) will be created.

### Parâmetros

Parâmetro

Descrição

`advertiser_identifier`

string

\[Optional\] Advertiser identifiers used to analyze the customer acquisition lifecycle

`csi`

string

\[Optional\] Meta generated tracking id

`update_token_id`

numeric string

\[Optional\] ID for the OE Token to be updated. Providing this ID value will result in updating the existing OE Token instead of creating a new OE Token

`utm`

string

\[Optional\] Marketing campaign name

### Return Type

Struct {

`id`: numeric string,

`link_with_id`: string,

`utm`: string,

`csi`: string,

`advertiser_identifier`: string,

}

### Error Codes

Erro

Descrição

200

Permissions error

[](#)

## Atualizando

You can update a [Business](/docs/marketing-api/reference/business/) by making a POST request to [`/{business_id}`](/docs/marketing-api/reference/business/).

### Parâmetros

Parâmetro

Descrição

`entry_point`

string

entry point of claiming BusinessClaimAssetEntryPoint

`name`

string

Business's name

`primary_page`

numeric string or integer

Primary page of this business

`timezone_id`

int64

Timezone id of this business

`two_factor_type`

enum{none, admin\_required, all\_required}

Two-factor type of the business

`vertical`

enum {NOT\_SET, ADVERTISING, AUTOMOTIVE, CONSUMER\_PACKAGED\_GOODS, ECOMMERCE, EDUCATION, ENERGY\_AND\_UTILITIES, ENTERTAINMENT\_AND\_MEDIA, FINANCIAL\_SERVICES, GAMING, GOVERNMENT\_AND\_POLITICS, MARKETING, ORGANIZATIONS\_AND\_ASSOCIATIONS, PROFESSIONAL\_SERVICES, RETAIL, TECHNOLOGY, TELECOM, TRAVEL, NON\_PROFIT, RESTAURANT, HEALTH, LUXURY, OTHER}

Vertical type of the business

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

}

### Error Codes

Erro

Descrição

3974

The name you chose for this Business Manager is not valid. Try a different name.

3918

The Facebook Page you've tried to add is already owned by another Business Manager. You can still request access to this Page, but your request will need to be approved by the Business Manager that owns it.

3911

You need permission to set up a new Business Manager.

3910

You need permission to edit the details of your Business Manager. Please talk to one of your Business Manager admins about changing your role or editing the Business Manager details.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

3947

You are trying to create a Business Manager with the same name as one you are already a part of. Please pick a different name.

3973

The name you chose for this Business Manager is not valid. Please choose another.

368

The action attempted has been deemed abusive or is otherwise disallowed

3912

There was a technical issue and the changes you made to your Business Manager weren't saved. Please try again.

100

Invalid parameter

You can update a [Business](/docs/marketing-api/reference/business/) by making a POST request to [`/{business_id}/managed_businesses`](/docs/marketing-api/reference/business/managed_businesses/).

### Parâmetros

Parâmetro

Descrição

`child_business_external_id`

string

child\_business\_external\_id

`existing_client_business_id`

numeric string

Existing client business id provided by the client

`name`

string

Client business name that's managed by the aggregator business

`sales_rep_email`

string

Email of sales representative of the business that's managed by the aggregator business

`survey_business_type`

enum {AGENCY, ADVERTISER, APP\_DEVELOPER, PUBLISHER}

Business type of surveyed business that's managed by the aggregator business

`survey_num_assets`

int64

Number of assets surveyed of business that's managed by the aggregator business

`survey_num_people`

int64

Number of people surveyed of business that's managed by the aggregator business

`timezone_id`

enum {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480}

Timezone id of business that's managed by the aggregator business

`vertical`

enum {NOT\_SET, ADVERTISING, AUTOMOTIVE, CONSUMER\_PACKAGED\_GOODS, ECOMMERCE, EDUCATION, ENERGY\_AND\_UTILITIES, ENTERTAINMENT\_AND\_MEDIA, FINANCIAL\_SERVICES, GAMING, GOVERNMENT\_AND\_POLITICS, MARKETING, ORGANIZATIONS\_AND\_ASSOCIATIONS, PROFESSIONAL\_SERVICES, RETAIL, TECHNOLOGY, TELECOM, TRAVEL, NON\_PROFIT, RESTAURANT, HEALTH, LUXURY, OTHER}

Business vertical of business that's managed by the aggregator business

### Return Type

This endpoint supports [read-after-write](/docs/graph-api/overview/#read-after-write) and will read the node represented by `id` in the return type.

Struct {

`id`: numeric string,

`name`: string,

}

### Error Codes

Erro

Descrição

42004

You couldn't create the client business on behalf your client successfully

200

Permissions error

100

Invalid parameter

[](#)

## Excluindo

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/agencies`](/docs/marketing-api/reference/business/agencies/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string or integer

The agency's business.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/clients`](/docs/marketing-api/reference/business/clients/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string

The client's business.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/pages`](/docs/marketing-api/reference/business/pages/).

### Parâmetros

Parâmetro

Descrição

`page_id`

Page ID

Page ID.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

42001

This Page can't be removed because it's already linked to an Instagram business profile. To remove this Page from Business Manager, go to Instagram and convert to a personal account or change the Page linked to your business profile.

200

Permissions error

3996

The page does not belong to this Business Manager.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

100

Invalid parameter

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/instagram_accounts`](/docs/marketing-api/reference/business/instagram_accounts/).

### Parâmetros

Parâmetro

Descrição

`instagram_account`

numeric string

Instagram account ID.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/ad_accounts`](/docs/marketing-api/reference/business/ad_accounts/).

### Parâmetros

Parâmetro

Descrição

`adaccount_id`

string

Ad account ID.

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

368

The action attempted has been deemed abusive or is otherwise disallowed

You can dissociate a [Business](/docs/marketing-api/reference/business/) from an [AdAccount](/docs/marketing-api/reference/ad-account/) by making a DELETE request to [`/act_{ad_account_id}/agencies`](/docs/marketing-api/reference/ad-account/agencies/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string

SELF\_EXPLANATORY

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

100

Invalid parameter

200

Permissions error

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [User](/docs/graph-api/reference/user/) by making a DELETE request to [`/{user_id}/businesses`](/docs/graph-api/reference/user/businesses/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string or integer

Business ID

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

3914

It looks like you're trying to remove the last admin from this Business Manager. At least one admin is required in Business Manager.

415

Two factor authentication required. User have to enter a code from SMS or TOTP code generator to pass 2fac. This could happen when accessing a 2fac-protected asset like a page that is owned by a 2fac-protected business manager.

100

Invalid parameter

190

Invalid OAuth 2.0 Access Token

368

The action attempted has been deemed abusive or is otherwise disallowed

200

Permissions error

You can dissociate a [Business](/docs/marketing-api/reference/business/) from an [InstagramBusinessAsset](/docs/graph-api/reference/instagram-business-asset/) by making a DELETE request to [`/{instagram_business_asset_id}/agencies`](/docs/graph-api/reference/instagram-business-asset/agencies/).

### Parâmetros

Parâmetro

Descrição

`business`

numeric string

The business ID of the agency that you want to revoke access for the Instagram Business Asset

Obrigatório

### Return Type

Struct {

`success`: bool,

}

You can dissociate a [Business](/docs/marketing-api/reference/business/) from a [Business](/docs/marketing-api/reference/business/) by making a DELETE request to [`/{business_id}/owned_businesses`](/docs/marketing-api/reference/business/owned_businesses/).

### Parâmetros

Parâmetro

Descrição

`client_id`

numeric string

ID of the Child Business you want to delete

Obrigatório

### Return Type

Struct {

`success`: bool,

}

### Error Codes

Erro

Descrição

3912

There was a technical issue and the changes you made to your Business Manager weren't saved. Please try again.

100

Invalid parameter

[](#)