-- Enables Selling Manager and Selling Manager Pro subscribers to store feedback comments for buyers and set automated feedback preferences (Selling Manager Pro subscribers only).
-- Example : insert into ebay.trading.SetSellingManagerFeedbackOptions values (YOUR XML HERE)
create table ebay.trading.SetSellingManagerFeedbackOptions
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'SetSellingManagerFeedbackOptions'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetSellingManagerFeedbackOptions.ejs' type 'application/xml'
    resultset 'SetSellingManagerFeedbackOptionsResponse'