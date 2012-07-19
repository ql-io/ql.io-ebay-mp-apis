-- Example: select * from ebay.trading.GetMyeBayBuying where BuyingSummary.Include = true and DetailLevel = "ReturnAll"
-- select * from ebay.trading.GetMyeBayBuying where UserDefinedLists.Include = true and UserDefinedLists.IncludeListContents = true
-- select * from ebay.trading.GetMyeBayBuying where BuyingSummary.Include = true
-- Returns items from the Buying section of the user's My eBay account, including items that the user is watching, bidding on, has won, has not won, and has made best offers on.
create table ebay.trading.GetMyeBayBuying
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMyeBayBuying'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMyeBayBuying.ejs' type 'application/xml'
      resultset 'GetMyeBayBuyingResponse'