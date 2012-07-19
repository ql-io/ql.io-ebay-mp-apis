-- Combines two or more order line items into a single order, enabling a buyer to pay for all of those order line items with a single payment (and, if so arranged, ship all of the items together).
create table ebay.trading.AddOrder
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddOrder'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddOrder.xml.mu' type 'application/xml'
    resultset 'AddOrderResponse'