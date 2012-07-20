-- Deletes a Selling Manager product.
-- Example: delete from ebay.trading.DeleteSellingManagerProduct where ProductID = "{prodID}";
create table ebay.trading.DeleteSellingManagerProduct
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteSellingManagerProduct'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteSellingManagerProduct.ejs' type 'application/xml'
    resultset 'DeleteSellingManagerProductResponse'