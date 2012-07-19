-- Returns shipping cost estimates for an item for every calculated shipping service that the seller has offered with the listing.
-- Example: select * from ebay.trading.GetItemShipping where ItemID = 330695476860 and QuantitySold = 1 and DestinationPostalCode = 95125

create table ebay.trading.GetItemShipping
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetItemShipping'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetItemShipping.ejs' type 'application/xml'
      resultset 'GetItemShippingResponse'