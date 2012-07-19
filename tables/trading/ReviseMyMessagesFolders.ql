--Renames, removes, or restores the specified My Messages folders for a given user.
--Example : update ebay.trading.ReviseMyMessagesFolders with "{YOUR JSON HERE}"
create table ebay.trading.ReviseMyMessagesFolders
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseMyMessagesFolders',
        'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
        'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
        'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseMyMessagesFolders.ejs' type 'application/xml'
    resultset 'ReviseMyMessagesFoldersResponse'