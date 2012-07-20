-- Example: select * from ebay.trading.GetMyMessages where DetailLevel = 'ReturnHeaders'
-- select * from ebay.trading.GetMyMessages where DetailLevel = 'ReturnMessages' and MessageIDs.MessageID = 28483
-- Retrieves information about the messages sent to a user.
create table ebay.trading.GetMyMessages
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMyMessages'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMyMessages.ejs' type 'application/xml'
      resultset 'GetMyMessagesResponse'