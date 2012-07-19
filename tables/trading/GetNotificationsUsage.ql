-- Example: select * from ebay.trading.GetNotificationsUsage
-- Retrieves usage information about platform notifications for a given application.
create table ebay.trading.GetNotificationsUsage
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetNotificationsUsage'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetNotificationsUsage.ejs' type 'application/xml'
      resultset 'GetNotificationsUsageResponse'