-- Used to reply to feedback that has been left for a user, or to post a follow-up comment to a feedback comment the user has left for someone else.
create table ebay.trading.RespondToFeedback
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'RespondToFeedback'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'RespondToFeedback.ejs' type 'application/xml'
    resultset 'RespondToFeedbackResponse'