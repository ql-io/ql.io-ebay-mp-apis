--Revises a Selling Manager product.
--Example : update ebay.trading.ReviseSellingManagerProduct with "{YOUR JSON HERE}"
create table ebay.trading.ReviseSellingManagerProduct
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseSellingManagerProduct'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseSellingManagerProduct.ejs' type 'application/xml'
    resultset 'ReviseSellingManagerProductResponse'