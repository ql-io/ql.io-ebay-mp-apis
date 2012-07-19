-- Retrieves publicly available data for one or more listings.
-- Example:  select * from ebay.shopping.GetMultipleItems where ItemID in (select itemId from ebay.finding.findItemsByKeywords where keywords = 'phone' and paginationInput.entriesPerPage = 5)

create table ebay.shopping.GetMultipleItems
  on select get from "http://open.api.ebay.com/shopping?callname=GetMultipleItems&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}&IncludeSelector={IncludeSelector}&ItemID={100|^ItemID}"
  using defaults siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
