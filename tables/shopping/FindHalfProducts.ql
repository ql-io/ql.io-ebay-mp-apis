-- Searches Half.com for stock product information (stock description and Item Specifics), such as information about a particular kind of DVD or book. Also, retrieves up to 30 Half.com listings associated with a product.
-- Example: select * from ebay.shopping.FindHalfProducts where QueryKeywords = 'wii'
-- Example: select * from ebay.shopping.FindHalfProducts where pidValue = 100252656 and pidtype = 'Reference'
create table ebay.shopping.FindHalfProducts
  on select get from "http://open.api.ebay.com/shopping?callname=FindHalfProducts&appid={^apikey}&responseencoding=JSON&version=765&siteid={^siteid}&MessageID={MessageID}&AvailableItemsOnly={AvailableItemsOnly}&DomainName={20|DomainName}&IncludeSelector={IncludeSelector}&MaxEntries={MaxEntries}&PageNumber={PageNumber}&ProductID.type={pidtype}&ProductID.Value={pidValue}&ProductSort={ProductSort}&QueryKeywords={QueryKeywords}&SellerID={SellerID}&SortOrder={SortOrder}"
  using defaults MaxEntries = "5", siteid = 'EBAY-US', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js'
