-- Example: select * from ebay.trading.GetSellerPayments where PaymentTimeFrom = '2010-02-12T21:59:59.005Z' and PaymentTimeTo = '2010-02-26T21:59:59.005Z' and PaymentStatus = 'Paid'
-- Half.com only. Retrieves a summary of pending or paid payments that Half.com created for the seller identified by the authentication token in the request.
create table ebay.trading.GetSellerPayments
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellerPayments'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellerPayments.ejs' type 'application/xml'
      resultset 'GetSellerPaymentsResponse'