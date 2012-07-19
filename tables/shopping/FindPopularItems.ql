-- Searches for popular items based on a category or keyword. Returns WatchCount in addition to item information.
-- Example: select * from ebay.shopping.FindPopularItems where QueryKeywords = 'phone'

create table ebay.shopping.FindPopularItems
  on select get from "http://open.api.ebay.com/shopping?callname=FindPopularItems&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}&CategoryID={20|CategoryID}&CategoryIDExclude={20|CategoryIDExclude}&MaxEntries={MaxEntries}&QueryKeywords={QueryKeywords}"
  using defaults MaxEntries = "5", siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
