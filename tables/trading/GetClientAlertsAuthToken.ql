-- Retrieves a token required for the GetUserAlerts call in the Client Alerts API.
-- Example: select ClientAlertsAuthToken from ebay.trading.GetClientAlertsAuthToken

create table ebay.trading.GetClientAlertsAuthToken
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetClientAlertsAuthToken'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetClientAlertsAuthToken.ejs' type 'application/xml'
      resultset 'GetClientAlertsAuthTokenResponse'