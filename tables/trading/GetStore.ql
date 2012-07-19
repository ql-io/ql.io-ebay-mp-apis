-- Retrieves configuration information for the eBay store owned by the specified UserID, or by the caller.
-- Example: select * from ebay.trading.GetStore
--
create table ebay.trading.GetStore
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetStore'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetStore.xml.mu' type 'application/xml'
      resultset 'GetStoreResponse'