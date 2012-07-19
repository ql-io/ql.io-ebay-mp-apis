-- Retrieves a paginated listing of a users Selling Manager inventory.
-- Example: select * from ebay.trading.GetSellingManagerInventory

--select * from ebay.trading.GetSellingManagerInventory

create table ebay.trading.GetSellingManagerInventory
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerInventory'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerInventory.ejs' type 'application/xml'
      resultset 'GetSellingManagerInventoryResponse'