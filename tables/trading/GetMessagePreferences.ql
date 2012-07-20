-- Example: select * from ebay.trading.GetMessagePreferences
-- Returns a seller's Ask Seller a Question (ASQ) subjects, each in its own Subject node.

--select * from ebay.trading.GetMessagePreferences where SellerID = 'apitest1'


create table ebay.trading.GetMessagePreferences
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMessagePreferences'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMessagePreferences.ejs' type 'application/xml'
      resultset 'GetMessagePreferencesResponse'