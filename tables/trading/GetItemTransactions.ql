-- Retrieves order line item (transaction) information for a specified ItemID.
-- Example : select TransactionArray from ebay.trading.GetItemTransactions where ItemID=330695476860

create table ebay.trading.GetItemTransactions
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetItemTransactions'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetItemTransactions.ejs' type 'application/xml'
      resultset 'GetItemTransactionsResponse'