<?xml version="1.0" encoding="utf-8"?>
<GetStoreRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#CategoryStructureOnly}}<CategoryStructureOnly>{{CategoryStructureOnly}}</CategoryStructureOnly>{{/CategoryStructureOnly}}
    {{#LevelLimit}}<LevelLimit>{{LevelLimit}}</LevelLimit>{{/LevelLimit}}
    {{#RootCategoryID}}<RootCategoryID>{{RootCategoryID}}</RootCategoryID>{{/RootCategoryID}}
    {{#UserID}}<UserID>{{UserID}}</UserID>{{/UserID}}
{{/params}}
</GetStoreRequest>