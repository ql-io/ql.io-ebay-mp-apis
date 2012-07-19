-- Example: select * from ebay.trading.GetOrderTransactions where OrderIDArray.OrderID = 865826
-- Use this call to retrieve information about one or more orders based on OrderIDs, ItemIDs, or SKU values.
create table ebay.trading.GetOrderTransactions
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetOrderTransactions'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetOrderTransactions.ejs' type 'application/xml'
      resultset 'GetOrderTransactionsResponse'