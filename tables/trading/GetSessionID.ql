-- Retrieves a session ID that identifies a user and your application when you make a FetchToken request.
-- Example: select * from ebay.trading.GetSessionID where RuName = 'YOUR-RU-NAME'
--
create table ebay.trading.GetSessionID
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
                   'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
                   'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}',
                   'X-EBAY-API-CALL-NAME'= 'GetSessionID'
      using bodyTemplate 'GetSessionID.xml.mu' type 'application/xml'
      resultset 'GetSessionIDResponse'