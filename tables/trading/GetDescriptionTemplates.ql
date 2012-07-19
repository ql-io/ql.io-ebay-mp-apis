-- Retrieves Theme and Layout specifications for the display of an item's description.
-- Example: select * from ebay.trading.GetDescriptionTemplates

create table ebay.trading.GetDescriptionTemplates
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetDescriptionTemplates'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetDescriptionTemplates.ejs' type 'application/xml'
      resultset 'GetDescriptionTemplatesResponse'