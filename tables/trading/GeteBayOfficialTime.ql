-- Gets the official eBay system time in GMT.
-- Example: select Timestamp from ebay.trading.GeteBayOfficialTime

create table ebay.trading.GeteBayOfficialTime
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GeteBayOfficialTime'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GeteBayOfficialTime.ejs' type 'application/xml'
      resultset 'GeteBayOfficialTimeResponse'