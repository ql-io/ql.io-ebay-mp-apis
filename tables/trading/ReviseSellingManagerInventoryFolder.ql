-- Revises the name of a Selling Manager inventory folder.
--Example : update ebay.trading.ReviseSellingManagerInventoryFolder with "{YOUR JSON HERE}"
create table ebay.trading.ReviseSellingManagerInventoryFolder
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseSellingManagerInventoryFolder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseSellingManagerInventoryFolder.ejs' type 'application/xml'
    resultset 'ReviseSellingManagerInventoryFolderResponse'