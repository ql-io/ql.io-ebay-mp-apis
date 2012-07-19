-- Removes the association of Selling Manager automation rules to an item.
-- Example : delete from ebay.trading.DeleteSellingManagerItemAutomationRule where Version = "737" and DeleteAutomatedRelistingRule = "true" and ItemID = "290005886960" ;
create table ebay.trading.DeleteSellingManagerItemAutomationRule
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteSellingManagerItemAutomationRule'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteSellingManagerItemAutomationRule.ejs' type 'application/xml'
    resultset 'DeleteSellingManagerItemAutomationRuleResponse'