-- Enables the seller of a Best Offer item to accept, decline, or counter offers made by bidders.
create table ebay.trading.RespondToBestOffer
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'RespondToBestOffer',
    'X-EBAY-API-APP-NAME' = '{config.tables.ebay.trading.appname}',
    'X-EBAY-API-DEV-NAME' = '{config.tables.ebay.trading.devname}',
    'X-EBAY-API-CERT-NAME' = '{config.tables.ebay.trading.certname}'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'RespondToBestOffer.ejs' type 'application/xml'
    resultset 'RespondToBestOfferResponse'