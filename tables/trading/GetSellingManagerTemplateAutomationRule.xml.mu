<?xml version="1.0" encoding="utf-8"?>
<GetSellingManagerTemplateAutomationRuleRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#SaleTemplateID}}<SaleTemplateID>{{SaleTemplateID}}</SaleTemplateID>{{/SaleTemplateID}}
{{/params}}
</GetSellingManagerTemplateAutomationRuleRequest>