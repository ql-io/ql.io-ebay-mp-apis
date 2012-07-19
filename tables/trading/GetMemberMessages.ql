-- Example: select * from ebay.trading.GetMemberMessages where MailMessageType ='AskSellerQuestion' and MessageStatus = 'Unanswered' and StartCreationTime = '2012-02-08T00:00:00.000Z' and EndCreationTime = '2012-02-16T19:23:13.821Z'
-- Retrieves a list of the messages buyers have posted about your active item listings.

--select * from ebay.trading.GetMemberMessages where MailMessageType = 'All'
--select * from ebay.trading.GetMemberMessages where MailMessageType = 'AskSellerQuestion' and ItemID = 290005886956


create table ebay.trading.GetMemberMessages
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMemberMessages'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMemberMessages.ejs' type 'application/xml'
      resultset 'GetMemberMessagesResponse'