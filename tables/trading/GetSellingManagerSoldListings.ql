-- Retrieves information about items that a seller has sold.
-- Example: select * from ebay.trading.GetSellingManagerSoldListings

--select * from ebay.trading.GetSellingManagerSoldListings


create table ebay.trading.GetSellingManagerSoldListings
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerSoldListings'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerSoldListings.ejs' type 'application/xml'
      resultset 'GetSellingManagerSoldListingsResponse'