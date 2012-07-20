-- Retrieves the details of a specific eBay dispute corresponding to the supplied dispute ID.
-- Example: select * from ebay.trading.GetDispute where DisputeID = 213833

create table ebay.trading.GetDispute
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetDispute'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetDispute.ejs' type 'application/xml'
      resultset 'GetDisputeResponse'