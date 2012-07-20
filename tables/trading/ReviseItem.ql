--Enables a seller to change the properties of a currently active listing. Also for Half.com.
-- Example : update ebay.trading.ReviseItem with "{YOUR JSON HERE}"
create table ebay.trading.ReviseItem
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'ReviseItem',
        'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
        'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
        'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'ReviseItem.ejs' type 'application/xml'
    resultset 'ReviseItemResponse'