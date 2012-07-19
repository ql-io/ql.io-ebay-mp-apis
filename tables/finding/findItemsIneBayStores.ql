-- Example : select * from ebay.finding.findItemsIneBayStores where storeName='magic books' and outputSelector = 'StoreInfo'and paginationInput.entriesPerPage = 2
-- for api header detail, see [http://developer.ebay.com/DevZone/finding/CallRef/findItemsIneBayStores.html]

create table ebay.finding.findItemsIneBayStores
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findItemsIneBayStores'
         using defaults format = "JSON"
         using bodyTemplate "findItemsIneBayStores.ejs" type 'application/xml'
         resultset 'findItemsIneBayStoresResponse'