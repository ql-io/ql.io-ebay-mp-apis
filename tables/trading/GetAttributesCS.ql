-- Retrieves an XML string that describes how to present Item Specifics to a seller who is creating a new listing. Item Specifics are optional when listing in most categories; however, some categories (such as Real Estate, US Tickets, and US eBay Motors) require Item Specifics to be specified using this model. Some categories support this Item Specifics model; other categories support the model returned by GetCategorySpecifics.
-- Example: select * from ebay.trading.GetAttributesCS where AttributeSetID = 2210 and DetailLevel = 'ReturnAll'
create table ebay.trading.GetAttributesCS
  on select post to "{config.tables.ebay.trading.gateway}"
     using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                   'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                   'X-EBAY-API-CALL-NAME'= 'GetAttributesCS'
      using defaults eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
      using bodyTemplate 'GetAttributesCS.ejs' type 'application/xml'
      resultset 'GetAttributesCSResponse'