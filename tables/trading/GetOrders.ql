-- select * from ebay.trading.GetOrders where CreateTimeFrom = '2007-12-01T20:34:44.000Z' and CreateTimeTo = '2007-12-10T20:34:44.000Z' and OrderRoll = 'Seller' and OrderStatus = 'Active'
-- Retrieves the orders for which the authenticated user is a participant, either as the buyer or the seller. Also for Half.com.
create table ebay.trading.GetOrders
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetOrders'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetOrders.ejs' type 'application/xml'
      resultset 'GetOrdersResponse'