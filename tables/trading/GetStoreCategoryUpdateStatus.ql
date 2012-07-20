-- Returns the status of the processing for category-structure changes specified with a call to SetStoreCategories.
-- Example: select * from ebay.trading.GetStoreCategoryUpdateStatus
--
create table ebay.trading.GetStoreCategoryUpdateStatus
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetStoreCategoryUpdateStatus'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetStoreCategoryUpdateStatus.xml.mu' type 'application/xml'
      resultset 'GetStoreCategoryUpdateStatusResponse'