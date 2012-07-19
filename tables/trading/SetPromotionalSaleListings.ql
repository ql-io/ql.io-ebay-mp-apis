--Changes which item listings are affected by a promotional sale.
create table ebay.trading.SetPromotionalSaleListings
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetPromotionalSaleListings'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetPromotionalSaleListings.ejs' type 'application/xml'
    resultset 'SetPromotionalSaleListingsResponse'