-- This call will give you the ability to retrieve high level Category information, relevant for a buy-side application.
--select * from ebay.shopping.GetCategoryInfo where CategoryID = 279

create table ebay.shopping.GetCategoryInfo
  on select get from "http://open.api.ebay.com/shopping?callname=GetCategoryInfo&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}&CategoryID={^CategoryID}&IncludeSelector={IncludeSelector}"
  using defaults siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
