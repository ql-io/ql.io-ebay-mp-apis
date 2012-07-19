-- Allows you to get the status for a group of items. Returns status information such as ListingStatus and End Time for all items that are listed in the request. Duplicated items are returned as a single item.
--Example: select * from ebay.shopping.GetItemStatus where ItemID in (select itemId from ebay.finding.findItemsByKeywords where keywords = 'phone' and paginationInput.entriesPerPage = 2)
create table ebay.shopping.GetItemStatus
  on select get from "http://open.api.ebay.com/shopping?callname=GetItemStatus&appid={^apikey}&responseencoding=JSON&version={version}&siteid={^siteid}&MessageID={MessageID}&ItemID={20|^ItemID}"
  using defaults MaxEntries = "5", siteid = '{config.tables.ebay.shopping.siteid}', apikey = "{config.tables.ebay.shopping.appid}", version = '{config.tables.ebay.shopping.version}';
