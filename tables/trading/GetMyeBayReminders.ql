-- Example: select * from ebay.trading.GetMyeBayReminders where BuyingReminders.DurationInDays =45 and SellingReminders.DurationInDays = 45
-- Requests totals for the Buying and Selling reminders from the user's My eBay account.
create table ebay.trading.GetMyeBayReminders
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMyeBayReminders'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMyeBayReminders.ejs' type 'application/xml'
      resultset 'GetMyeBayRemindersResponse'