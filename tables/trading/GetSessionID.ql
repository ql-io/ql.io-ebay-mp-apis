-- Retrieves a session ID that identifies a user and your application when you make a FetchToken request.
-- Example: select * from ebay.trading.GetSessionID
--
create table ebay.trading.GetSessionID
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSessionID'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSessionID.xml.mu' type 'application/xml'
      resultset 'GetSessionIDResponse'