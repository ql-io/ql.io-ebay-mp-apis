--Request type containing the input fields for the ReviseSellingManagerSaleRecord call.
create table ebay.trading.ReviseSellingManagerSaleRecord
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseSellingManagerSaleRecord'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseSellingManagerSaleRecord.ejs' type 'application/xml'
    resultset 'ReviseSellingManagerSaleRecordResponse'