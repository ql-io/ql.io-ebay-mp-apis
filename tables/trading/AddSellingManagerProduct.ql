-- Creates a Selling Manager product, which contains templates for repeat listings.
--  Example : insert into ebay.trading.AddSellingManagerProduct values (YOUR XML HERE )

create table ebay.trading.AddSellingManagerProduct
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddSellingManagerProduct',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddSellingManagerProduct.ejs' type 'application/xml'
    resultset 'AddSellingManagerProductResponse'