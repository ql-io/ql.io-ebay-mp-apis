-- Searches for stock product information (stock description and Item Specifics), such as information about a particular kind of DVD or camera. Also, retrieves up to 200 eBay listings associated with a product.
-- Example: select * from  ebay.shopping.FindProducts where QueryKeywords='ipad'
-- Example: select * from  ebay.shopping.FindProducts where pidValue= 61437604 and pidtype='Reference'
-- Example : select * from  ebay.shopping.FindProducts where CategoryID = 279
-- Search with keyword to obtain product ids
create table ebay.shopping.FindProducts
  on select get from "http://open.api.ebay.com/shopping?callname=FindProducts&appid={^apikey}&responseencoding=JSON&version=765&siteid={^siteid}&MessageID={MessageID}&AvailableItemsOnly={AvailableItemsOnly}&CategoryID={CategoryID}&DomainName={20|DomainName}&HideDuplicateItems={HideDuplicateItems}&IncludeSelector={IncludeSelector}&MaxEntries={MaxEntries}&PageNumber={PageNumber}&ProductID.type={pidtype}&ProductID.Value={pidValue}&ProductSort={ProductSort}&QueryKeywords={QueryKeywords}&SortOrder={SortOrder}"
  using defaults MaxEntries = "5", siteid = 'EBAY-US', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
