-- Requests current status of user token.
-- Example: select * from ebay.trading.GetTokenStatus
--
create table ebay.trading.GetTokenStatus
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetTokenStatus',
                   'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
                   'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
                   'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetTokenStatus.xml.mu' type 'application/xml'
      resultset 'GetTokenStatusResponse'