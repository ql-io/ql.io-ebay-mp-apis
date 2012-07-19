--  Creates a new Second Chance Offer (that is, an offer for an unsold item) for one of that item's non-winning bidders.
create table ebay.trading.AddSecondChanceItem
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddSecondChanceItem'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddSecondChanceItem.ejs' type 'application/xml'
    resultset 'AddSecondChanceItemResponse'