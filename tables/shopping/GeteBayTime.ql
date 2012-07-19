-- Gets the official eBay system time in GMT.
-- Example: select * from ebay.shopping.GeteBayTime
create table ebay.shopping.GeteBayTime
  on select get from "http://open.api.ebay.com/shopping?callname=GeteBayTime&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}"
  using defaults siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}';
