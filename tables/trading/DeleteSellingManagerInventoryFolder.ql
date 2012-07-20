-- Removes a Selling Manager inventory folder.
-- Example : delete from ebay.trading.DeleteSellingManagerInventoryFolder where FolderID in ("{result.FolderID}");

create table ebay.trading.DeleteSellingManagerInventoryFolder
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteSellingManagerInventoryFolder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteSellingManagerInventoryFolder.ejs' type 'application/xml'
    resultset 'DeleteSellingManagerInventoryFolderResponse'