-- Retrieves a list of active Want It Now posts that match specified keywords and/or a specific category ID..
-- Example: select * from ebay.trading.GetWantItNowSearchResults
create table ebay.trading.GetWantItNowSearchResults
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetWantItNowSearchResults'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetWantItNowSearchResults.ejs' type 'application/xml'
      resultset 'GetWantItNowSearchResultsResponse'