-- Enables a buyer and seller in an order relationship to send messages to each other's My Messages Inboxes.
-- Example : insert into ebay.trading.AddMemberMessageAAQToPartner (ItemID , MemberMessage.Subject, MemberMessage.Body, MemberMessage.QuestionType, MemberMessage.RecipientID) values ("290006652076", "Thank You for your purchase", "We appreciate your business and hope you enjoy your book.", "General", "egw.us.seller51");
create table ebay.trading.AddMemberMessageAAQToPartner
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddMemberMessageAAQToPartner'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddMemberMessageAAQToPartner.ejs' type 'application/xml'
    resultset 'AddMemberMessageAAQToPartnerResponse'