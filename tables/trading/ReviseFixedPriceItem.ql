--Enables a seller to change the properties of a currently active fixed-price listing (including multi-variation listings).
-- Example : update ebay.trading.ReviseFixedPriceItem with "{msg}"
create table ebay.trading.ReviseFixedPriceItem
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseFixedPriceItem'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseFixedPriceItem.ejs' type 'application/xml'
    resultset 'ReviseFixedPriceItemResponse'