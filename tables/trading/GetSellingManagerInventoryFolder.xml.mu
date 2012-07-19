<?xml version="1.0" encoding="utf-8"?>
<GetSellingManagerInventoryFolderRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#FolderID}}<FolderID>{{FolderID}}</FolderID>{{/FolderID}}
    {{#FullRecursion}}<FullRecursion>{{FullRecursion}}</FullRecursion>{{/FullRecursion}}
    {{#MaxDepth}}<MaxDepth>{{MaxDepth}}</MaxDepth>{{/MaxDepth}}
{{/params}}
</GetSellingManagerInventoryFolderRequest>