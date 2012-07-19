<?xml version="1.0" encoding="utf-8"?>
<IssueRefundRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#ItemID}}<ItemID>{{ItemID}}</ItemID>{{/ItemID}}
    {{#OrderLineItemID}}<OrderLineItemID>{{OrderLineItemID}}</OrderLineItemID>{{/OrderLineItemID}}
    {{#RefundAmount}}<RefundAmount>{{RefundAmount}}</RefundAmount>{{/RefundAmount}}
    {{#RefundMessage}}<RefundMessage>{{RefundMessage}}</RefundMessage>{{/RefundMessage}}
    {{#RefundReason}}<RefundReason>{{RefundReason}}</RefundReason>{{/RefundReason}}
    {{#RefundType}}<RefundType>{{RefundType}}</RefundType>{{/RefundType}}
    {{#TransactionID}}<TransactionID>{{TransactionID}}</TransactionID>{{/TransactionID}}
{{/params}}
</IssueRefundRequest>