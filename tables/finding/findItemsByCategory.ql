-- Example : select * from ebay.finding.findItemsByCategory where categoryId =139971
-- for api header detail, see [http://developer.ebay.com/DevZone/finding/CallRef/findItemsByCategory.html]

create table ebay.finding.findItemsByCategory
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findItemsByCategory'
         using defaults format = "JSON"
         using bodyTemplate "findItemsAdvanced.ejs" type 'application/xml'
         resultset 'findItemsByCategoryResponse'