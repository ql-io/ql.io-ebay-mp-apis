--Sets the read state for messages, sets the flagged state of messages, and moves messages into and out of folders.
--Example: update ebay.trading.ReviseMyMessages with "{YOUR JSON HERE}"
create table ebay.trading.ReviseMyMessages
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseMyMessages'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseMyMessages.ejs' type 'application/xml'
    resultset 'ReviseMyMessagesResponse'