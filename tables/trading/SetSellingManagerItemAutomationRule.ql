-- Revises or adds to the set of Selling Manager automation rules associated with a specific item.
-- Example : insert into ebay.trading.SetSellingManagerItemAutomationRule values (YOUR XML HERE)
create table ebay.trading.SetSellingManagerItemAutomationRule
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'SetSellingManagerItemAutomationRule',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetSellingManagerItemAutomationRule.ejs' type 'application/xml'
    resultset 'SetSellingManagerItemAutomationRuleResponse'