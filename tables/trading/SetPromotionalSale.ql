--Creates or modifies a promotional sale. Promotional sales enable sellers to apply discounts and/or free shipping across many listings.
create table ebay.trading.SetPromotionalSale
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'SetPromotionalSale'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'SetPromotionalSale.ejs' type 'application/xml'
    resultset 'SetPromotionalSaleResponse'