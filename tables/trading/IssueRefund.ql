--Half.com only. Issues a refund for a specific Half.com order line item.
-- Example: select * from ebay.trading.IssueRefund

create table ebay.trading.IssueRefund
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'IssueRefund'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'IssueRefund.xml.mu' type 'application/xml'
      resultset 'IssueRefundResponse'