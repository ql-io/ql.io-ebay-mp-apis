-- Retrieves eBay IDs and codes (e.g., site IDs and shipping service codes), enumerated data (e.g., payment methods), and other common eBay meta-data.
-- Example: select * from ebay.trading.GeteBayDetails

create table ebay.trading.GeteBayDetails
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GeteBayDetails'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GeteBayDetails.ejs' type 'application/xml'
      resultset 'GeteBayDetailsResponse'