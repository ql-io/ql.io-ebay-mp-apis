--Retrieves sales lead information for a lead generation listing.
-- select * from ebay.trading.GetAdFormatLeads where ItemID = 290006391760 and DetailLevel = 'ReturnAll'";
create table ebay.trading.GetAdFormatLeads
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetAdFormatLeads'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetAdFormatLeads.ejs' type 'application/xml'
      resultset 'GetAdFormatLeadsResponse'