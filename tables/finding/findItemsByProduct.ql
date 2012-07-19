--WARNING THIS TABLE IS CURRENTLY HARD CODED
-- Example : select * from ebay.finding.findItemsByProduct where productId = '53039031' and productId.type = ReferenceID
-- select * from ebay.finding.findItemsByProduct where productId = '9780316087384' and productId.type = 'ISBN'

-- for api header detail, see [http://developer.ebay.com/DevZone/finding/Concepts/MakingACall.html]
-- This table maps to the eBay Service. See  [developer docs](http://developer.ebay.com/DevZone/finding/CallRef/findItemsByProduct.html) for more information.

create table ebay.finding.findItemsByProduct
    on select post to '{config.tables.ebay.finding.gateway}'
         using headers 'X-EBAY-SOA-SECURITY-APPNAME'='{config.tables.ebay.finding.appname}',
                       'X-EBAY-SOA-OPERATION-NAME'='findItemsByProduct'
         using defaults format = "JSON"
         using bodyTemplate "findItemsByProduct.ejs" type 'application/xml'
         resultset 'findItemsByProductResponse'