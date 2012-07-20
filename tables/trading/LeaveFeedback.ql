-- Enables a buyer and seller to leave feedback for their order partner at the conclusion of a successful order.
--Example: insert into ebay.trading.LeaveFeedback (CommentText, CommentType, TargetUser, ItemID ) values ("Good product","Positive","apitest11", "170004002462")
create table ebay.trading.LeaveFeedback
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'LeaveFeedback'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'LeaveFeedback.ejs' type 'application/xml'
    resultset 'LeaveFeedbackResponse'