--	Ends the specified fixed-price listing before the date and time at which it would normally end (per the listing duration).
-- Example: update ebay.trading.EndFixedPriceItem with "{YOUR JSON HERE}"
create table ebay.trading.EndFixedPriceItem
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'EndFixedPriceItem'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'EndFixedPriceItem.ejs' type 'application/xml'
    resultset 'EndFixedPriceItemResponse'