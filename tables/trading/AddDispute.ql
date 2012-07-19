--insert into ebay.trading.AddDispute (ItemID, TransactionID, DisputeReason, DisputeExplanation) values ("290006727267", "0", "BuyerHasNotPaid", "BuyerHasNotResponded");
--Example: Enables a seller to create a new Unpaid Item dispute or to cancel a single line item order.

    create table ebay.trading.AddDispute
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddDispute',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddDispute.ejs' type 'application/xml'
    resultset 'AddDisputeResponse'