-- Adds one or more items to the user's My eBay watch list.
-- Example:insert into ebay.trading.AddToWatchList (ItemID) values ("{itemId}") ;

create table ebay.trading.AddToWatchList
    on insert post to "{config.tables.ebay.trading.gateway}"
    using headers 'X-EBAY-API-COMPATIBILITY-LEVEL' = '{config.tables.ebay.trading.version}',
    'X-EBAY-API-SITEID' = '{config.tables.ebay.trading.siteid}',
    'X-EBAY-API-CALL-NAME'= 'AddToWatchList'
    using defaults RequesterCredentials.eBayAuthToken = '{config.tables.ebay.trading.eBayAuthToken}'
    using bodyTemplate 'AddToWatchList.xml.mu' type 'application/xml'
    resultset 'AddToWatchListResponse'