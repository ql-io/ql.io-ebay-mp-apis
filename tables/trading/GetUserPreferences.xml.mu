<?xml version="1.0" encoding="utf-8"?>
<GetUserPreferencesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#ShowBidderNoticePreferences}}<ShowBidderNoticePreferences>{{ShowBidderNoticePreferences}}</ShowBidderNoticePreferences>{{/ShowBidderNoticePreferences}}
    {{#ShowCombinedPaymentPreferences}}<ShowCombinedPaymentPreferences>{{ShowCombinedPaymentPreferences}}</ShowCombinedPaymentPreferences>{{/ShowCombinedPaymentPreferences}}
    {{#ShowCrossPromotionPreferences}}<ShowCrossPromotionPreferences>{{ShowCrossPromotionPreferences}}</ShowCrossPromotionPreferences>{{/ShowCrossPromotionPreferences}}
    {{#ShowEmailShipmentTrackingNumberPreference}}<ShowEmailShipmentTrackingNumberPreference>{{ShowEmailShipmentTrackingNumberPreference}}</ShowEmailShipmentTrackingNumberPreference>{{/ShowEmailShipmentTrackingNumberPreference}}
    {{#ShowEndOfAuctionEmailPreferences}}<ShowEndOfAuctionEmailPreferences>{{ShowEndOfAuctionEmailPreferences}}</ShowEndOfAuctionEmailPreferences>{{/ShowEndOfAuctionEmailPreferences}}
    {{#ShowProStoresPreferences}}<ShowProStoresPreferences>{{ShowProStoresPreferences}}</ShowProStoresPreferences>{{/ShowProStoresPreferences}}
    {{#ShowPurchaseReminderEmailPreferences}}<ShowPurchaseReminderEmailPreferences>{{ShowPurchaseReminderEmailPreferences}}</ShowPurchaseReminderEmailPreferences>{{/ShowPurchaseReminderEmailPreferences}}
    {{#ShowRequiredShipPhoneNumberPreference}}<ShowRequiredShipPhoneNumberPreference>{{ShowRequiredShipPhoneNumberPreference}}</ShowRequiredShipPhoneNumberPreference>{{/ShowRequiredShipPhoneNumberPreference}}
    {{#ShowSellerExcludeShipToLocationPreference}}<ShowSellerExcludeShipToLocationPreference>{{ShowSellerExcludeShipToLocationPreference}}</ShowSellerExcludeShipToLocationPreference>{{/ShowSellerExcludeShipToLocationPreference}}
    {{#ShowSellerFavoriteItemPreferences}}<ShowSellerFavoriteItemPreferences>{{ShowSellerFavoriteItemPreferences}}</ShowSellerFavoriteItemPreferences>{{/ShowSellerFavoriteItemPreferences}}
    {{#ShowSellerPaymentPreferences}}<ShowSellerPaymentPreferences>{{ShowSellerPaymentPreferences}}</ShowSellerPaymentPreferences>{{/ShowSellerPaymentPreferences}}
    {{#ShowSellerProfilePreferences}}<ShowSellerProfilePreferences>{{ShowSellerProfilePreferences}}</ShowSellerProfilePreferences>{{/ShowSellerProfilePreferences}}
    {{#ShowUnpaidItemAssistanceExclusionList}}<ShowUnpaidItemAssistanceExclusionList>{{ShowUnpaidItemAssistanceExclusionList}}</ShowUnpaidItemAssistanceExclusionList>{{/ShowUnpaidItemAssistanceExclusionList}}
    {{#ShowUnpaidItemAssistancePreference}}<ShowUnpaidItemAssistancePreference>{{ShowUnpaidItemAssistancePreference}}</ShowUnpaidItemAssistancePreference>{{/ShowUnpaidItemAssistancePreference}}
{{/params}}
</GetUserPreferencesRequest>