--Enables users to add, replace, and delete My eBay notes for items that are being tracked in the My eBay All Selling and All Buying areas.
--Example :  update ebay.trading.SetUserNotes with "{YOUR JSON HERE}"';
create table ebay.trading.SetUserNotes
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetUserNotes'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetUserNotes.ejs' type 'application/xml'
    resultset 'SetUserNotesResponse'