-- Retrieves the current list of eBay store configuration settings.
-- Example: select * from ebay.trading.GetStoreOptions
--
create table ebay.trading.GetStoreOptions
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetStoreOptions'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetStoreOptions.xml.mu' type 'application/xml'
      resultset 'GetStoreOptionsResponse'