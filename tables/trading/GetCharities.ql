-- Searches for nonprofit charity organizations that meet the criteria specified in the request
--Example : select Charity from ebay.trading.GetCharities where Query = 'memory'

create table ebay.trading.GetCharities
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCharities'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCharities.ejs' type 'application/xml'
      resultset 'GetCharitiesResponse'