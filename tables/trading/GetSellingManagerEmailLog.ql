-- Retrieves a log of emails sent, or scheduled to be sent, to buyers. Includes success or failure status.
-- Example: select * from ebay.trading.GetSellingManagerEmailLog
-- To use this call, you must be a Selling Manager Pro subscriber.

--select * from ebay.trading.GetSellingManagerEmailLog where TransactionID=0 and ItemID=290006607384

create table ebay.trading.GetSellingManagerEmailLog
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerEmailLog'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerEmailLog.ejs' type 'application/xml'
      resultset 'GetSellingManagerEmailLogResponse'