-- Retrieves the custom page or pages for the authenticated users Store.
-- Example: select * from ebay.trading.GetStoreCustomPage
--
create table ebay.trading.GetStoreCustomPage
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetStoreCustomPage'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetStoreCustomPage.xml.mu' type 'application/xml'
      resultset 'GetStoreCustomPageResponse'