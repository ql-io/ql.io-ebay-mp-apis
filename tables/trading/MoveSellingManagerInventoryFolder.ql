--Moves a Selling Manager inventory folder.
--Example : update ebay.trading.MoveSellingManagerInventoryFolder with "{YOUR JSON HERE}"
create table ebay.trading.MoveSellingManagerInventoryFolder
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'MoveSellingManagerInventoryFolder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'MoveSellingManagerInventoryFolder.ejs' type 'application/xml'
    resultset 'MoveSellingManagerInventoryFolderResponse'