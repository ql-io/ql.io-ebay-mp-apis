-- Retrieves the tax table for a user on a given site or retrieves the valid jurisdictions (if any) for a given site.
-- Example: select * from ebay.trading.GetTaxTable
-- select * from ebay.trading.GetTaxTable

create table ebay.trading.GetTaxTable
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetTaxTable'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetTaxTable.xml.mu' type 'application/xml'
      resultset 'GetTaxTableResponse'