--Ends up to 10 specified item listings before the date and time at which it would normally end per the listing duration. Also for Half.com.
--Example : update ebay.trading.EndItems with "{YOUR JSON HERE}"
create table ebay.trading.EndItems
    on update post to '{config.tables.ebay.trading.gateway}'
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
        'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
        'X-EBAY-API-CALL-NAME'= 'EndItems'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'EndItems.ejs' type 'application/xml'
    resultset 'EndItemsResponse'