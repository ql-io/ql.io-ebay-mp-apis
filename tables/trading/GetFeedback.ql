-- Retrieves the accumulated feedback left for a specified user or the summary feedback data for a specific order line item or item listing. Also for Half.com.
-- Example: select * from ebay.trading.GetFeedback

create table ebay.trading.GetFeedback
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetFeedback'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetFeedback.ejs' type 'application/xml'
      resultset 'GetFeedbackResponse'