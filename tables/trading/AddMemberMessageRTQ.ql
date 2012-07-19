-- Enables a seller to reply to a question about an active item listing.
-- Example: insert into ebay.trading.AddMemberMessageRTQ (ItemID, MemberMessage.Body, MemberMessage.RecipientID, MemberMessage.ParentMessageID) values ("290006316857","We appreciate your business and hope you enjoy your book.","apitest20", "{parentmessageid}") ;
create table ebay.trading.AddMemberMessageRTQ
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddMemberMessageRTQ'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddMemberMessageRTQ.ejs' type 'application/xml'
    resultset 'AddMemberMessageRTQResponse'