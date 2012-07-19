-- Examines potential item data that a seller has specified and returns recommended changes or opportunities for improvement.
-- Example: select * from ebay.trading.GetItemRecommendations where GetRecommendationsRequestContainer.Item.PrimaryCategory.CategoryID = 20668

create table ebay.trading.GetItemRecommendations
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetItemRecommendations'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetItemRecommendations.ejs' type 'application/xml'
      resultset 'GetItemRecommendationsResponse'