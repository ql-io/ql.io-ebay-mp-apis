-- Example : select * from ebay.finding.findItemsByImage where itemId = 120896726588
-- for api header detail, see [http://developer.ebay.com/DevZone/finding/CallRef/findItemsByImage.html]

create table ebay.finding.findItemsByImage
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findItemsByImage'
         using defaults format = "JSON"
         using bodyTemplate "findItemsByImage.ejs" type 'application/xml'
         resultset 'findItemsByImageResponse'