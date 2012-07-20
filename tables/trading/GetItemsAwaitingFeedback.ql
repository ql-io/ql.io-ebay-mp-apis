-- Returns orders in which the user was involved and for which feedback is still needed from either the buyer or seller.
-- Example: select * from ebay.trading.GetItemsAwaitingFeedback

create table ebay.trading.GetItemsAwaitingFeedback
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetItemsAwaitingFeedback'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetItemsAwaitingFeedback.ejs' type 'application/xml'
      resultset 'GetItemsAwaitingFeedbackResponse'