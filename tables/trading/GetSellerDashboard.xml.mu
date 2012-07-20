<?xml version="1.0" encoding="utf-8"?>
<GetSellerDashboardRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
{{/params}}
</GetSellerDashboardRequest>