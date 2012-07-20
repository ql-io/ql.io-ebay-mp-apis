-- Enables a seller to take a single fixed-price item (or a single multi-item listing) that has ended and re-list it on a specified eBay site.
-- Example : insert into ebay.trading.RelistFixedPriceItem values (YOUR XML HERE)
create table ebay.trading.RelistFixedPriceItem
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'RelistFixedPriceItem'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'RelistFixedPriceItem.ejs' type 'application/xml'
    resultset 'RelistFixedPriceItemResponse'