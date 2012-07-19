-- Example: select * from ebay.trading.GetSellerTransactions
-- Retrieves order line item (transaction) information for the user for which the call is made, and not for any other user. Also for Half.com. (To retrieve order line items for another seller's listings, use GetItemTransactions.)
create table ebay.trading.GetSellerTransactions
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellerTransactions'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellerTransactions.ejs' type 'application/xml'
      resultset 'GetSellerTransactionsResponse'