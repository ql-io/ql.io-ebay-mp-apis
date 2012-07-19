-- Retrieves Selling Manager inventory folders.
-- Example: select * from ebay.trading.GetSellingManagerInventoryFolder

--select * from ebay.trading.GetSellingManagerInventoryFolder

create table ebay.trading.GetSellingManagerInventoryFolder
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerInventoryFolder'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerInventoryFolder.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerInventoryFolderResponse'