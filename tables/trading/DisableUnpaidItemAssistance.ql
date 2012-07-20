--Enables a seller to disable the Unpaid Item Assistant mechanism for a specific order line item.
create table ebay.trading.DisableUnpaidItemAssistance
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'DisableUnpaidItemAssistance'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'DisableUnpaidItemAssistance.ejs' type 'application/xml'
    resultset 'DisableUnpaidItemAssistanceResponse'