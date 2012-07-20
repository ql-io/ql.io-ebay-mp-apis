-- Retrieves the Item Specifics SYI XSL stylesheet for use with the GetAttributesCS and GetProductSellingPages response. You use the stylesheet to render Item Specifics in a user interface, as applicable within a particular category.
-- Example: select * from ebay.trading.GetAttributesXSL
create table ebay.trading.GetAttributesXSL
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetAttributesXSL'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetAttributesXSL.ejs' type 'application/xml'
      resultset 'GetAttributesXSLResponse'