-- Searches reviews and guides based on product, category, or user. The response provides information about each user or products reviews and guides.
-- Example: select * from ebay.shopping.FindReviewsAndGuides
create table ebay.shopping.FindReviewsAndGuides
  on select get from "http://open.api.ebay.com/shopping?callname=FindReviewsAndGuides&appid={^apikey}&responseencoding=JSON&version=765&siteid={^siteid}&MessageID={MessageID}&CategoryID={100|CategoryID}&MaxResultsPerPage={MaxResultsPerPage}&PageNumber={PageNumber}&ProductID.type={pidtype}&ProductID.Value={pidValue}&ReviewSort={ReviewSort}&SortOrder={SortOrder}&UserID={UserID}"
  using defaults siteid = 'EBAY-US', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}'
  using patch 'basic.js';
