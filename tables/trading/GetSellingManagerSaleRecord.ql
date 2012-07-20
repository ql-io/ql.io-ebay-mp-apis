-- Retrieves the data for one or more Selling Manager sale records.
-- Example: select * from ebay.trading.GetSellingManagerSaleRecord

-- select * from ebay.trading.GetSellingManagerSaleRecord where ItemID =290006621238 and TransactionID=788598801

create table ebay.trading.GetSellingManagerSaleRecord
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerSaleRecord'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerSaleRecord.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerSaleRecordResponse'