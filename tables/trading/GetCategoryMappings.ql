-- Example: select * from ebay.trading.GetCategoryMappings
-- Retrieves a map of old category IDs and corresponding active category IDs defined for the site to which the request is sent.
create table ebay.trading.GetCategoryMappings
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCategoryMappings'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCategoryMappings.ejs' type 'application/xml'
      resultset 'GetCategoryMappingsResponse'