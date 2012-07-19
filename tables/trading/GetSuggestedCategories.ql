-- Returns a list of up to 10 categories that have the highest percentage of listings whose titles or descriptions contain the keywords you specify.
-- Example: select * from ebay.trading.GetSuggestedCategories where Query = 'camera'
--
create table ebay.trading.GetSuggestedCategories
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetSuggestedCategories'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetSuggestedCategories.xml.mu' type 'application/xml'
      resultset 'GetSuggestedCategoriesResponse'