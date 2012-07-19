-- Example: select * from ebay.trading.GetSellerDashboard
-- Retrieves a brief summary of the requester's status as an eBay seller.
-- account not eligible, but should work. To be eligible to view a Seller Dashboard, the user needs 10 or more Detailed Seller Ratings (across any of the four rating categories) within the last 12 months. If the user is not eligible, the call returns an error. Use GetFeedback to check the user's Detailed Seller Ratings (DSR).

--select * from ebay.trading.GetSellerDashboard where SellerID = 'apitest1'


create table ebay.trading.GetSellerDashboard
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellerDashboard'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellerDashboard.xml.mu' type 'application/xml'
      resultset 'GetSellerDashboardResponse'