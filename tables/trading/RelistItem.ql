-- Enables a seller to take a single item (or a single multi-item listing) and re-list it on a specified eBay site.
-- Example : insert into ebay.trading.RelistItem values (YOUR XML HERE)
create table ebay.trading.RelistItem
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'RelistItem'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'RelistItem.ejs' type 'application/xml'
    resultset 'RelistItemResponse'