-- Retrieves the set of Selling Manager automation rules associated with an item.
-- Example: select * from ebay.trading.GetSellingManagerItemAutomationRule

--select * from ebay.trading.GetSellingManagerItemAutomationRule where ItemID=290006621510

create table ebay.trading.GetSellingManagerItemAutomationRule
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerItemAutomationRule'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerItemAutomationRule.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerItemAutomationRuleResponse'