-- Example: select FeatureDefinitions from ebay.trading.GetCategoryFeatures
-- Returns information about the features that are applicable to different categories, such as listing durations, shipping term requirements, and Best Offer support.
create table ebay.trading.GetCategoryFeatures
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCategoryFeatures'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCategoryFeatures.ejs' type 'application/xml'
      resultset 'GetCategoryFeaturesResponse'