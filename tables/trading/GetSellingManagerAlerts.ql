-- Retrieves Selling Manager alerts.
-- Example: select * from ebay.trading.GetSellingManagerAlerts
-- To use this call, you must be a Selling Manager Pro subscriber.

--select * from ebay.trading.GetSellingManagerAlerts where SellerID = 'apitest1'

create table ebay.trading.GetSellingManagerAlerts
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerAlerts'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerAlerts.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerAlertsResponse'