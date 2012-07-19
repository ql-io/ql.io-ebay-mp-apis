-- Retrieves a users Store preferences.
-- Example: select * from ebay.trading.GetStorePreferences
--
create table ebay.trading.GetStorePreferences
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetStorePreferences'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetStorePreferences.xml.mu' type 'application/xml'
      resultset 'GetStorePreferencesResponse'