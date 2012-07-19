--Adds a response or comment to a dispute, or closes a dispute.
create table ebay.trading.AddDisputeResponse
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddDisputeResponse'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddDisputeResponse.ejs' type 'application/xml'
    resultset 'AddDisputeResponseResponse'