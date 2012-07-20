-- Returns a seller's invoice data for their eBay account, including the account's summary data.
-- Example: select * from ebay.trading.GetAccount where AccountEntrySortType = 'Ascending' and AccountHistorySelection = 'LastInvoice' and ItemID = 290006607384";

create table ebay.trading.GetAccount
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetAccount'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetAccount.ejs' type 'application/xml'
      resultset 'GetAccountResponse'