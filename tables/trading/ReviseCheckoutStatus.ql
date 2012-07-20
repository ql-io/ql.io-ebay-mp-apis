-- A seller can use this call to update the payment details, the shipping details, and the status of an order.
-- Example : update ebay.trading.ReviseCheckoutStatus with "{YOUR JSON HERE}"
create table ebay.trading.ReviseCheckoutStatus
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseCheckoutStatus',
        'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
        'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
        'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseCheckoutStatus.ejs' type 'application/xml'
    resultset 'ReviseCheckoutStatusResponse'