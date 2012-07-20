-- Example: select * from ebay.trading.GetSellerEvents where StartTimeFrom='2009-10-01T00:00:01.000Z' and DetailLevel = 'ReturnAll'
-- Retrieves price changes, item revisions, description revisions, and other changes that have occurred within the last 48 hours related to a seller's eBay listings.
create table ebay.trading.GetSellerEvents
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellerEvents'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellerEvents.xml.mu' type 'application/xml'
      resultset 'GetSellerEventsResponse'