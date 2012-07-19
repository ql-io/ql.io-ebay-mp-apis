-- Retrieves the specified user preferences for the authenticated caller.
-- Example: select SellerPaymentPreferences as SellerPaymentPreferences, SellerExcludeShipToLocationPreferences as SellerExcludeShipToLocationPreferences from ebay.trading.GetUserPreferences where ShowSellerPaymentPreferences = true and ShowSellerExcludeShipToLocationPreference = true

create table ebay.trading.GetUserPreferences
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetUserPreferences'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetUserPreferences.xml.mu' type 'application/xml'
      resultset 'GetUserPreferencesResponse'