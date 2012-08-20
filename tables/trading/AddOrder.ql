-- Combines two or more order line items into a single order, enabling a buyer to pay for all of those order line items with a single payment (and, if so arranged, ship all of the items together).
create table ebay.trading.AddOrder
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddOrder',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
            'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
            'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddOrder.ejs' type 'application/xml'
    resultset 'AddOrderResponse'