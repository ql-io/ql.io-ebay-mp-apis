--Retrieves sales lead information for a lead generation listing.
--Example : select BidArray,HighBidder,HighBid from ebay.trading.GetAllBidders where ItemID = 290006607384"

create table ebay.trading.GetAllBidders
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetAllBidders'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetAllBidders.ejs' type 'application/xml'
      resultset 'GetAllBiddersResponse'