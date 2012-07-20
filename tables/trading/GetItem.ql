--Returns item data such as title, description, price information, seller information, and so on, for the specified ItemID.
-- Example : select * from ebay.trading.GetItem where ItemID = 280002695183

create table ebay.trading.GetItem
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetItem'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetItem.ejs' type 'application/xml'
      resultset 'GetItemResponse'