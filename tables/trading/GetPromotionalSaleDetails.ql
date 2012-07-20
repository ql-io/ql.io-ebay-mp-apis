-- select * from ebay.trading.GetPromotionalSaleDetails where PromotionalSaleStatus = 'Active'
-- Obtains information about promotional sales set up by an eBay store owner (the authenticated caller).
--no testing data
create table ebay.trading.GetPromotionalSaleDetails
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetPromotionalSaleDetails'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetPromotionalSaleDetails.xml.mu' type 'application/xml'
      resultset 'GetPromotionalSaleDetailsResponse'