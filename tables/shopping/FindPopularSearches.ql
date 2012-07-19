-- Finds the words more frequently used by eBay users when searching for listings. If you use keywords, this call returns available alternative keywords in addition to popular related keywords.
-- Example: select * from ebay.shopping.FindPopularSearches where QueryKeywords = 'dell' and CategoryID in (58058, 177)
create table ebay.shopping.FindPopularSearches
  on select get from "http://open.api.ebay.com/shopping?callname=FindPopularSearches&appid={^apikey}&responseencoding=JSON&version=765&siteid={^siteid}&MessageID={MessageID}&CategoryID={20|CategoryID}&IncludChildCategories={IncludChildCategories}&MaxKeywords={MaxKeywords}&MaxResultsPerPage={MaxResultsPerPage}&PageNumber={PageNumber}&QueryKeywords={1000|QueryKeywords}"
  using defaults siteid = 'EBAY-US', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
