-- Retrieves the set of Selling Manager automation rules associated with a Selling Manager template.
-- Example: select * from ebay.trading.GetSellingManagerTemplateAutomationRule
-- select * from ebay.trading.GetSellingManagerTemplateAutomationRule where SaleTemplateID=112048

create table ebay.trading.GetSellingManagerTemplateAutomationRule
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerTemplateAutomationRule'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerTemplateAutomationRule.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerTemplateAutomationRuleResponse'