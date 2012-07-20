-- Returns the shipping discount profiles defined by the user, along with other combined payment-related details such as packaging and handling costs.
-- Example: select * from ebay.trading.GetShippingDiscountProfiles
--
create table ebay.trading.GetShippingDiscountProfiles
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetShippingDiscountProfiles'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetShippingDiscountProfiles.xml.mu' type 'application/xml'
      resultset 'GetShippingDiscountProfilesResponse'