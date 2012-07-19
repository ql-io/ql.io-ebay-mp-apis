--Retrieves best offers.
--Example : select * from ebay.trading.GetBestOffers where ItemID = '290006792403' and Version = '737'

create table ebay.trading.GetBestOffers
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetBestOffers'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetBestOffers.ejs' type 'application/xml'
      resultset ''