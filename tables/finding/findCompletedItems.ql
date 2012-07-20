-- Example : select * from ebay.finding.findCompletedItems where keywords='ipad2'
-- for api header detail, see [http://developer.ebay.com/DevZone/finding/CallRef/findCompletedItems.html]
-- This table maps to the eBay findItemsByKeywords Service. See  [developer docs](http://developer.ebay.com/devzone/finding/callref/findItemsByKeywords.html) for more information.

create table ebay.finding.findCompletedItems
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findCompletedItems'
         using defaults format = "JSON", limit = 5, offset = 0
         using bodyTemplate "findCompletedItems.ejs" type 'application/xml'
         resultset 'findCompletedItemsResponse'