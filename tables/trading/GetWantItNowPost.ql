-- Retrieves data for a specific, active Want It Now post identified by a post ID.
-- Example: select WantItNowPost as WantItNowPost from ebay.trading.GetWantItNowPost where PostID = 120883968450
create table ebay.trading.GetWantItNowPost
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetWantItNowPost'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetWantItNowPost.xml.mu' type 'application/xml'
      resultset 'GetWantItNowPostResponse'