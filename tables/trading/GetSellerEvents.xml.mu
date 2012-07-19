<?xml version="1.0" encoding="utf-8"?>
<GetSellerEventsRequest xmlns="urn:ebay:apis:eBLBaseComponents">
{{#params}}
    <RequesterCredentials>
        <eBayAuthToken>{{eBayAuthToken}}</eBayAuthToken>
    </RequesterCredentials>
    {{#DetailLevel}}<DetailLevel>{{DetailLevel}}</DetailLevel>{{/DetailLevel}}
    {{#ErrorLanguage}}<ErrorLanguage>{{ErrorLanguage}}</ErrorLanguage>{{/ErrorLanguage}}
    {{#MessageID}}<MessageID>{{MessageID}}</MessageID>{{/MessageID}}
    {{#OutputSelector}}<OutputSelector>{{OutputSelector}}</OutputSelector>{{/OutputSelector}}
    {{#Version}}<Version>{{Version}}</Version>{{/Version}}
    {{#WarningLevel}}<WarningLevel>{{WarningLevel}}</WarningLevel>{{/WarningLevel}}
    {{#EndTimeFrom}}<EndTimeFrom>{{EndTimeFrom}}</EndTimeFrom>{{/EndTimeFrom}}
    {{#EndTimeTo}}<EndTimeTo>{{EndTimeTo}}</EndTimeTo>{{/EndTimeTo}}
    {{#HideVariations}}<HideVariations>{{HideVariations}}</HideVariations>{{/HideVariations}}
    {{#IncludeVariationSpecifics}}<IncludeVariationSpecifics>{{IncludeVariationSpecifics}}</IncludeVariationSpecifics>{{/IncludeVariationSpecifics}}
    {{#IncludeWatchCount}}<IncludeWatchCount>{{IncludeWatchCount}}</IncludeWatchCount>{{/IncludeWatchCount}}
    {{#ModTimeFrom}}<ModTimeFrom>{{ModTimeFrom}}</ModTimeFrom>{{/ModTimeFrom}}
    {{#ModTimeTo}}<ModTimeTo>{{ModTimeTo}}</ModTimeTo>{{/ModTimeTo}}
    {{#NewItemFilter}}<NewItemFilter>{{NewItemFilter}}</NewItemFilter>{{/NewItemFilter}}
    {{#StartTimeFrom}}<StartTimeFrom>{{StartTimeFrom}}</StartTimeFrom>{{/StartTimeFrom}}
    {{#StartTimeTo}}<StartTimeTo>{{StartTimeTo}}</StartTimeTo>{{/StartTimeTo}}
    {{#UserID}}<UserID>{{UserID}}</UserID>{{/UserID}}
{{/params}}
</GetSellerEventsRequest>