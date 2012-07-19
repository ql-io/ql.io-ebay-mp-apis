-- Retrieves Selling Manager templates.
-- Example: select * from ebay.trading.GetSellingManagerTemplates
-- select * from ebay.trading.GetSellingManagerTemplates where SaleTemplateID=112048


create table ebay.trading.GetSellingManagerTemplates
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSellingManagerTemplates'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSellingManagerTemplates.xml.mu' type 'application/xml'
      resultset 'GetSellingManagerTemplatesResponse'