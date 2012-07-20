-- Example: select * from ebay.trading.GetCategorySpecifics  where CategorySpecific.CategoryID = 20668
-- Returns the most popular custom Item Specific names and values for each leaf category you request.
create table ebay.trading.GetCategorySpecifics
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCategorySpecifics'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCategorySpecifics.ejs' type 'application/xml'
      resultset 'GetCategorySpecificsResponse'