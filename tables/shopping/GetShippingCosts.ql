-- Gets shipping costs for an item.
-- Example: itemid=select itemId from ebay.finding.findItemsByKeywords where keywords = 'phone' and paginationInput.entriesPerPage = 1;return select * from ebay.shopping.GetShippingCosts where ItemID = "{itemid}" and DestinationPostalCode = 95125

create table ebay.shopping.GetShippingCosts
  on select get from "http://open.api.ebay.com/shopping?callname=GetShippingCosts&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}&DestinationCountryCode={DestinationCountryCode}&DestinationPostalCode={DestinationPostalCode}&IncludeDetails={IncludeDetails}&ItemID={^ItemID}&QuantitySold={QuantitySold}"
  using defaults siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
