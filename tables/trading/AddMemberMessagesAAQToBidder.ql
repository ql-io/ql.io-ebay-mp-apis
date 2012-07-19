-- Enables a seller to send up to 10 messages to bidders, or to users who have made offers via Best Offer, regarding an active item listing.
-- Example: insert into ebay.trading.AddMemberMessageRTQ (AddMemberMessagesAAQToBidderRequestContainer.ItemID, AddMemberMessagesAAQToBidderRequestContainer.MemberMessage.Body, AddMemberMessagesAAQToBidderRequestContainer.MemberMessage.RecipientID) values ("290006708343","Not accepting you offer","apitest20")

create table ebay.trading.AddMemberMessagesAAQToBidder
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddMemberMessagesAAQToBidder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddMemberMessagesAAQToBidder.ejs' type 'application/xml'
    resultset 'AddMemberMessagesAAQToBidderResponse'