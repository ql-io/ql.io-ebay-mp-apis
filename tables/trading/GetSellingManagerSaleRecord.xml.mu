<?xml version="1.0" encoding="utf-8"?>
<GetSellingManagerSaleRecordRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#ItemID}}<ItemID>{{ItemID}}</ItemID>{{/ItemID}}
    {{#OrderID}}<OrderID>{{OrderID}}</OrderID>{{/OrderID}}
    {{#OrderLineItemID}}<OrderLineItemID>{{OrderLineItemID}}</OrderLineItemID>{{/OrderLineItemID}}
    {{#TransactionID}}<TransactionID>{{TransactionID}}</TransactionID>{{/TransactionID}}
{{/params}}
</GetSellingManagerSaleRecordRequest>