-- Adds a new product folder to a user's Selling Manager account.
-- Example : insert into ebay.trading.AddSellingManagerInventoryFolder (ParentFolderID, FolderName, Comment) values ("6003420018","HarryTrial","for HP");
create table ebay.trading.AddSellingManagerInventoryFolder
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddSellingManagerInventoryFolder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddSellingManagerInventoryFolder.ejs' type 'application/xml'
    resultset 'AddSellingManagerInventoryFolderResponse'