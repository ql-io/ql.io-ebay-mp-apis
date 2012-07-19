--Enables a seller to change the price and quantity of currently active fixed-price items.
--Example : update ebay.trading.ReviseInventoryStatus with "{YOUR JSON HERE}"
create table ebay.trading.ReviseInventoryStatus
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseInventoryStatus'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseInventoryStatus.ejs' type 'application/xml'
    resultset 'ReviseInventoryStatusResponse'