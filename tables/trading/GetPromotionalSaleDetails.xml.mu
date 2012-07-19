<?xml version="1.0" encoding="utf-8"?>
<GetPromotionalSaleDetailsRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{RequesterCredentials.eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#PromotionalSaleID}}<PromotionalSaleID>{{PromotionalSaleID}}</PromotionalSaleID>{{/PromotionalSaleID}}
    {{#PromotionalSaleStatus}}<PromotionalSaleStatus>{{PromotionalSaleStatus}}</PromotionalSaleStatus>{{/PromotionalSaleStatus}}
{{/params}}
</GetPromotionalSaleDetailsRequest>