-- Example: select * from ebay.trading.GetSellerList where StartTimeFrom = '2010-02-12T21:59:59.005Z' and StartTimeTo = '2010-02-26T21:59:59.005Z'
-- Returns a list of the items posted by the authenticated user, including the related item data.
create table ebay.trading.GetSellerList
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellerList'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellerList.ejs' type 'application/xml'
      resultset 'GetSellerListResponse'