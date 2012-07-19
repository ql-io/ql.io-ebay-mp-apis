-- Requests a list of disputes the requester is involved in as buyer or seller. eBay Buyer Protection Item Not Received and Significantly Not As Described cases are not returned with this call.
-- Example: select * from ebay.trading.GetUserDisputes
--
create table ebay.trading.GetUserDisputes
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetUserDisputes'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetUserDisputes.ejs' type 'application/xml'
      resultset 'GetUserDisputesResponse'