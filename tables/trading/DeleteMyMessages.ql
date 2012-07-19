-- Removes selected messages for a given user.
-- Example: delete from ebay.trading.DeleteMyMessages where MessageIDs.MessageID = "{msgid}";
create table ebay.trading.DeleteMyMessages
    on delete post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
                  'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
                  'X-EBAY-API-CALL-NAME'= 'DeleteMyMessages'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DeleteMyMessages.ejs' type 'application/xml'
    resultset 'DeleteMyMessagesResponse'