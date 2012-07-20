-- Removes the association of Selling Manager automation rules to a template.
-- Example : delete from ebay.trading.DeleteSellingManagerTemplateAutomationRule where DeleteAutomatedListingRule = "true" and SaleTemplateID = "76155";
create table ebay.trading.DeleteSellingManagerTemplateAutomationRule
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteSellingManagerTemplateAutomationRule'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteSellingManagerTemplateAutomationRule.ejs' type 'application/xml'
    resultset 'DeleteSellingManagerTemplateAutomationRuleResponse'