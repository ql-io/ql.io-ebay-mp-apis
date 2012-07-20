-- Defines from one to five items and lists them on a specified eBay site.

create table ebay.trading.AddItems
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddItems'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddItems.ejs' type 'application/xml'
    resultset 'AddItemsResponse'