-- Gets publicly visible details about one listing. This gives you most of the data that eBay shows on the View Item page (title, description, price, and other details).
-- itemid=select itemId from ebay.finding.findItemsByKeywords where keywords = "phone" and paginationInput.entriesPerPage = 1;return select * from ebay.shopping.GetSingleItem where ItemID = "{itemid}"
create table ebay.shopping.GetSingleItem
  on select get from "http://open.api.ebay.com/shopping?callname=GetSingleItem&appid={^apikey}&responseencoding=JSON&version=765&siteid={^siteid}&MessageID={MessageID}&IncludeSelector={IncludeSelector}&ItemID={^ItemID}&VariationSKU={VariationSKU}"
  using defaults siteid = 'EBAY-US', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';