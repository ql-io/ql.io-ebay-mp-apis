-- Example : select * from ebay.finding.findItemsAdvanced where keywords='ipad2'
-- for api header detail, see [http://developer.ebay.com/DevZone/finding/CallRef/findItemsAdvanced.html]

create table ebay.finding.findItemsAdvanced
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findItemsAdvanced'
         using defaults format = "JSON"
         using bodyTemplate "findItemsAdvanced.ejs" type 'application/xml'
         resultset 'findItemsAdvancedResponse'