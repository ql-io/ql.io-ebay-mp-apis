-- Example: select * from ebay.trading.GetPromotionRules
-- Retrieves all promotion rules associated with the specified item or store category.
-- unexpected response
create table ebay.trading.GetPromotionRules
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetPromotionRules'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetPromotionRules.xml.mu' type 'application/xml'
      resultset 'GetPromotionRulesResponse'