-- Example: select * from ebay.trading.GetMyeBaySelling where ActiveList.Sort ='TimeLeft'
-- Returns items from the Selling section of the user's My eBay account, including items that the user is currently selling (the Active list), items that have bids, sold items, and unsold items.
create table ebay.trading.GetMyeBaySelling
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetMyeBaySelling'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetMyeBaySelling.ejs' type 'application/xml'
      resultset 'GetMyeBaySellingResponse'