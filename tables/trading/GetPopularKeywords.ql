-- Example: select * from ebay.trading.GetPopularKeywords where CatetoryID = 377
-- Retrieves the words that are most frequently submitted by eBay users when searching for listings.
create table ebay.trading.GetPopularKeywords
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetPopularKeywords'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetPopularKeywords.ejs' type 'application/xml'
      resultset 'GetPopularKeywordsResponse'