-- Example: select * from ebay.trading.GetCategories where LevelLimit = 1 and DetailLevel = 'ReturnAll'
-- Retrieves the latest eBay category hierarchy for a given eBay site. Information returned for each category includes the category name and the unique ID for the category (unique within the eBay site for which categories are retrieved). A category ID is a required input when you list most items.
create table ebay.trading.GetCategories
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCategories'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCategories.ejs' type 'application/xml'
      resultset 'GetCategoriesResponse'