-- Retrieves a list of upsell or cross-sell items associated with the specifeid item ID.
-- Example: select * from ebay.trading.GetCrossPromotions  where PromotionMethod = 'CrossSell' and ItemID = 330695476860

create table ebay.trading.GetCrossPromotions
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetCrossPromotions'
      using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetCrossPromotions.ejs' type 'application/xml'
      resultset 'GetCrossPromotionsResponse'