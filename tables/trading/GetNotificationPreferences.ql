-- not testable, need to set preference first
-- Example: select * from ebay.trading.GetNotificationPreferences
-- Retrieves the requesting application's notification preferences.
create table ebay.trading.GetNotificationPreferences
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetNotificationPreferences'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetNotificationPreferences.ejs' type 'application/xml'
      resultset 'GetNotificationPreferencesResponse'