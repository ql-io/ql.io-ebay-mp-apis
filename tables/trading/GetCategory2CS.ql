-- Example: select * from ebay.trading.GetCategory2CS where CategoryID = 237 and DetailLevel = 'ReturnAll'
-- Retrieves mappings between categories and characteristic sets that are available for an eBay site.
create table ebay.trading.GetCategory2CS
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCategory2CS'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCategory2CS.ejs' type 'application/xml'
      resultset 'GetCategory2CSResponse'